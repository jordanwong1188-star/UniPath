-- Additive live checkout support. Run after 20260902_billing_safety.sql.
begin;
create table if not exists public.checkout_attempts (
  user_id uuid primary key references auth.users(id) on delete cascade,
  attempt_id uuid not null default gen_random_uuid(),
  plan text not null check (plan in ('pro','max')),
  parameters text not null,
  created_at timestamptz not null default now()
);
alter table public.checkout_attempts add column if not exists session_id text;
alter table public.checkout_attempts enable row level security;
revoke all on public.checkout_attempts from public, anon, authenticated;

create or replace function public.reserve_checkout_v2(p_user_id uuid, p_plan text, p_parameters text,
  p_replace_attempt uuid default null)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare membership public.subscriptions%rowtype; attempt public.checkout_attempts%rowtype;
begin
  if p_plan is null or p_plan not in ('pro','max') or p_parameters is null then
    raise exception 'Invalid checkout request';
  end if;
  select * into membership from public.subscriptions where user_id=p_user_id for update;
  if not found then raise exception 'Membership missing'; end if;
  if membership.status not in ('inactive','canceled') then raise exception 'Subscription already exists'; end if;
  -- Only the trusted server may replace an attempt, after checking its Stripe session.
  update public.checkout_attempts set attempt_id=gen_random_uuid(), plan=p_plan,
    parameters=p_parameters, created_at=now(), session_id=null
    where user_id=p_user_id and attempt_id=p_replace_attempt and session_id is not null;
  insert into public.checkout_attempts(user_id,plan,parameters)
    values(p_user_id,p_plan,p_parameters) on conflict(user_id) do nothing;
  select * into attempt from public.checkout_attempts where user_id=p_user_id;
  return jsonb_build_object('id',attempt.attempt_id,'plan',attempt.plan,'parameters',attempt.parameters,
    'session_id',attempt.session_id,'created_at',attempt.created_at);
end;
$$;
create or replace function public.attach_checkout_session(p_user_id uuid,p_attempt uuid,p_session text)
returns boolean language plpgsql security definer set search_path = '' as $$
begin
  if p_session is null or p_session not like 'cs_%' then raise exception 'Invalid session'; end if;
  update public.checkout_attempts set session_id=p_session
    where user_id=p_user_id and attempt_id=p_attempt and (session_id is null or session_id=p_session);
  return found;
end;
$$;
revoke all on function public.reserve_checkout_v2(uuid,text,text,uuid) from public,anon,authenticated;
revoke all on function public.attach_checkout_session(uuid,uuid,text) from public,anon,authenticated;
grant execute on function public.reserve_checkout_v2(uuid,text,text,uuid) to service_role;
grant execute on function public.attach_checkout_session(uuid,uuid,text) to service_role;
commit;
