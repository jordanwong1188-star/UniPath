-- Test rollout: one persistent checkout attempt per account.
-- Never automatically clear an uncertain attempt: Stripe keys can expire after 24h.
-- Expired/abandoned attempts require reconciliation before a new attempt is allowed.
begin;
create table if not exists public.checkout_attempts (
  user_id uuid primary key references auth.users(id) on delete cascade,
  attempt_id uuid not null default gen_random_uuid(),
  plan text not null check (plan in ('pro','max')),
  parameters text not null,
  created_at timestamptz not null default now()
);
alter table public.checkout_attempts enable row level security;
revoke all on public.checkout_attempts from public, anon, authenticated;

create or replace function public.reserve_checkout(p_user_id uuid, p_plan text, p_parameters text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  membership public.subscriptions%rowtype;
  attempt public.checkout_attempts%rowtype;
begin
  if p_plan is null or p_plan not in ('pro','max') or p_parameters is null then
    raise exception 'Invalid checkout request';
  end if;
  select * into membership from public.subscriptions where user_id=p_user_id for update;
  if not found then raise exception 'Membership missing'; end if;
  if membership.status not in ('inactive','canceled') then
    raise exception 'Subscription already exists';
  end if;
  insert into public.checkout_attempts(user_id,plan,parameters)
    values(p_user_id,p_plan,p_parameters) on conflict(user_id) do nothing;
  select * into attempt from public.checkout_attempts where user_id=p_user_id;
  if attempt.plan <> p_plan then raise exception 'Another plan checkout is already reserved'; end if;
  if attempt.created_at < now()-interval '23 hours' then
    raise exception 'Checkout requires reconciliation';
  end if;
  return jsonb_build_object('id',attempt.attempt_id,'parameters',attempt.parameters);
end;
$$;
revoke all on function public.reserve_checkout(uuid,text,text) from public,anon,authenticated;
grant execute on function public.reserve_checkout(uuid,text,text) to service_role;
commit;
