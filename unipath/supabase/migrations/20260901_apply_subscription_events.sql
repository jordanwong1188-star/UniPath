create or replace function public.apply_subscription_event(
  p_event_id text,
  p_user_id uuid,
  p_plan text,
  p_status text,
  p_credits integer,
  p_customer_id text,
  p_subscription_id text,
  p_price_id text,
  p_period_end timestamptz
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  inserted_count integer;
begin
  if p_plan not in ('pro', 'max') then raise exception 'Invalid plan'; end if;
  if p_status not in ('inactive', 'trialing', 'active', 'past_due', 'canceled', 'unpaid') then raise exception 'Invalid status'; end if;
  if p_credits is not null and p_credits not in (0, 200, 500) then raise exception 'Invalid credit grant'; end if;

  insert into public.credit_transactions (user_id, amount, action, stripe_event_id)
  values (p_user_id, coalesce(p_credits, 0), 'stripe_subscription_event', p_event_id)
  on conflict (stripe_event_id) where stripe_event_id is not null do nothing;
  get diagnostics inserted_count = row_count;
  if inserted_count = 0 then return false; end if;

  insert into public.subscriptions (
    user_id, plan, status, credits_remaining, credits_reset_at,
    stripe_customer_id, stripe_subscription_id, stripe_price_id,
    current_period_end, updated_at
  ) values (
    p_user_id, p_plan, p_status, coalesce(p_credits, 0),
    case when p_credits is null then null else now() end,
    p_customer_id, p_subscription_id, p_price_id, p_period_end, now()
  )
  on conflict (user_id) do update set
    plan = excluded.plan,
    status = excluded.status,
    credits_remaining = case when p_credits is null then public.subscriptions.credits_remaining else p_credits end,
    credits_reset_at = case when p_credits is null then public.subscriptions.credits_reset_at else now() end,
    stripe_customer_id = coalesce(excluded.stripe_customer_id, public.subscriptions.stripe_customer_id),
    stripe_subscription_id = coalesce(excluded.stripe_subscription_id, public.subscriptions.stripe_subscription_id),
    stripe_price_id = coalesce(excluded.stripe_price_id, public.subscriptions.stripe_price_id),
    current_period_end = coalesce(excluded.current_period_end, public.subscriptions.current_period_end),
    updated_at = now();
  return true;
end;
$$;

revoke all on function public.apply_subscription_event(text, uuid, text, text, integer, text, text, text, timestamptz) from public, anon, authenticated;
grant execute on function public.apply_subscription_event(text, uuid, text, text, integer, text, text, text, timestamptz) to service_role;
