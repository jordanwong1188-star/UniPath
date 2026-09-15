-- Additive migration. Run after the three existing subscription migrations.
-- Existing subscribers and balances are retained; no tables or users are deleted.
begin;
alter table public.subscriptions add column if not exists last_stripe_event_at bigint not null default 0;
alter table public.subscriptions add column if not exists stripe_subscription_created bigint not null default 0;
alter table public.subscriptions add column if not exists credit_period_end timestamptz;
update public.subscriptions set credit_period_end = current_period_end
where credit_period_end is null and credits_reset_at is not null;

create table if not exists public.billing_events (
  event_id text primary key,
  invoice_id text unique,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.billing_events enable row level security;
revoke all on public.billing_events from anon, authenticated;

-- Backfill accounts created before the original trigger was installed.
insert into public.profiles (id, email, full_name)
select id, coalesce(email, ''), raw_user_meta_data ->> 'full_name' from auth.users
on conflict (id) do nothing;
insert into public.subscriptions (user_id)
select id from auth.users on conflict (user_id) do nothing;

create or replace function public.apply_subscription_event_v2(
  p_event_id text, p_event_created bigint, p_invoice_id text,
  p_subscription_created bigint, p_user_id uuid, p_plan text,
  p_status text, p_credits integer, p_customer_id text,
  p_subscription_id text, p_price_id text, p_period_end timestamptz
) returns boolean language plpgsql security definer set search_path = '' as $$
declare
  current_row public.subscriptions%rowtype;
  inserted_count integer;
  new_balance integer;
  should_grant boolean;
begin
  if p_plan is null or p_plan not in ('pro', 'max') then raise exception 'Invalid plan'; end if;
  if p_status is null or p_status not in ('inactive', 'trialing', 'active', 'past_due', 'canceled', 'unpaid') then raise exception 'Invalid status'; end if;
  if p_event_id is null or p_subscription_id is null or p_subscription_created is null or p_event_created is null then raise exception 'Missing event identity'; end if;
  if p_credits is not null and (p_credits <> case when p_plan = 'max' then 500 else 200 end
    or p_invoice_id is null or p_period_end is null or p_status <> 'active') then raise exception 'Invalid paid credit grant'; end if;

  insert into public.subscriptions(user_id) values (p_user_id) on conflict do nothing;
  select * into current_row from public.subscriptions where user_id = p_user_id for update;
  -- Reject older subscriptions, including a late cancellation of a replaced plan.
  if current_row.stripe_subscription_id is distinct from p_subscription_id
    and current_row.stripe_subscription_created >= p_subscription_created then return false; end if;
  -- Honor event IDs processed by the previous implementation too.
  if exists (select 1 from public.credit_transactions where stripe_event_id = p_event_id) then return false; end if;
  insert into public.billing_events(event_id, invoice_id, user_id)
  values (p_event_id, p_invoice_id, p_user_id) on conflict do nothing;
  get diagnostics inserted_count = row_count;
  if inserted_count = 0 then return false; end if;

  should_grant := p_credits is not null and p_period_end > now()
    and (current_row.credit_period_end is null or p_period_end > current_row.credit_period_end);
  new_balance := case when should_grant then p_credits else current_row.credits_remaining end;
  if p_event_created >= current_row.last_stripe_event_at then
    if p_status in ('canceled', 'unpaid', 'inactive') then new_balance := 0; end if;
    update public.subscriptions set plan = p_plan, status = p_status,
      stripe_customer_id = p_customer_id, stripe_subscription_id = p_subscription_id,
      stripe_price_id = p_price_id, stripe_subscription_created = p_subscription_created,
      last_stripe_event_at = p_event_created,
      current_period_end = p_period_end
    where user_id = p_user_id;
  elsif current_row.status not in ('active', 'trialing') then
    should_grant := false;
    new_balance := current_row.credits_remaining;
  end if;
  update public.subscriptions set credits_remaining = new_balance,
    credit_period_end = case when should_grant then p_period_end else credit_period_end end,
    credits_reset_at = case when should_grant then now() else credits_reset_at end,
    updated_at = now() where user_id = p_user_id;
  insert into public.credit_transactions(user_id, amount, action, stripe_event_id)
  values (p_user_id, new_balance - current_row.credits_remaining,
    case when should_grant then 'paid_invoice_credit_reset' else 'subscription_state_update' end, p_event_id);
  return true;
end;
$$;
revoke all on function public.apply_subscription_event_v2(text,bigint,text,bigint,uuid,text,text,integer,text,text,text,timestamptz) from public, anon, authenticated;
grant execute on function public.apply_subscription_event_v2(text,bigint,text,bigint,uuid,text,text,integer,text,text,text,timestamptz) to service_role;

-- Credit spending fails closed when the paid period has expired.
create or replace function public.reserve_credits(p_user_id uuid, p_amount integer, p_action text)
returns integer language plpgsql security definer set search_path = '' as $$
declare remaining integer;
begin
  if p_amount is null or p_amount <= 0 then raise exception 'Invalid credit amount'; end if;
  update public.subscriptions set credits_remaining = credits_remaining - p_amount, updated_at = now()
  where user_id = p_user_id and plan in ('pro', 'max') and status in ('active', 'trialing')
    and current_period_end > now() and credits_remaining >= p_amount
  returning credits_remaining into remaining;
  if remaining is null then raise exception 'Active subscription and sufficient credits required'; end if;
  insert into public.credit_transactions(user_id, amount, action) values(p_user_id, -p_amount, p_action);
  return remaining;
end;
$$;
revoke all on function public.reserve_credits(uuid,integer,text) from public, anon, authenticated;
grant execute on function public.reserve_credits(uuid,integer,text) to service_role;
commit;
