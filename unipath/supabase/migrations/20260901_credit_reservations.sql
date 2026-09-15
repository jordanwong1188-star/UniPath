-- Atomic server-only credit reservation and restoration for AI actions.
create or replace function public.reserve_credits(p_user_id uuid, p_amount integer, p_action text)
returns integer language plpgsql security definer set search_path = '' as $$
declare remaining integer;
begin
  if p_amount <= 0 then raise exception 'Invalid credit amount'; end if;
  update public.subscriptions set credits_remaining = credits_remaining - p_amount, updated_at = now()
   where user_id = p_user_id and status in ('active','trialing') and credits_remaining >= p_amount
   returning credits_remaining into remaining;
  if remaining is null then raise exception 'Insufficient credits or inactive subscription'; end if;
  insert into public.credit_transactions(user_id, amount, action) values (p_user_id, -p_amount, p_action);
  return remaining;
end; $$;

create or replace function public.restore_credits(p_user_id uuid, p_amount integer, p_action text)
returns integer language plpgsql security definer set search_path = '' as $$
declare remaining integer;
begin
  if p_amount <= 0 then raise exception 'Invalid credit amount'; end if;
  update public.subscriptions set credits_remaining = credits_remaining + p_amount, updated_at = now()
   where user_id = p_user_id returning credits_remaining into remaining;
  if remaining is null then raise exception 'Subscription not found'; end if;
  insert into public.credit_transactions(user_id, amount, action) values (p_user_id, p_amount, p_action);
  return remaining;
end; $$;

revoke all on function public.reserve_credits(uuid, integer, text) from public, anon, authenticated;
revoke all on function public.restore_credits(uuid, integer, text) from public, anon, authenticated;
grant execute on function public.reserve_credits(uuid, integer, text) to service_role;
grant execute on function public.restore_credits(uuid, integer, text) to service_role;
