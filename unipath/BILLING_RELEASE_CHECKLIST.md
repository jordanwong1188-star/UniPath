# Billing and confirmation release checklist

New Checkout sessions are intentionally disabled in `data/billingAvailability.ts`.
Existing billing management remains available. This switch does not cancel subscriptions,
stop Stripe renewals, or expire previously created Checkout sessions.

## Required deployment step

Run `supabase/migrations/20260902_billing_safety.sql` in the project's Supabase SQL Editor,
after the three earlier migrations. It is additive and retains accounts and balances.
The webhook now uses `apply_subscription_event_v2`; until the migration is applied,
processing fails closed and Stripe must retry deliveries. After applying it, check failed
deliveries in Stripe and resend them if necessary. A successful web build does not apply SQL.

## Confirmation email

- Keep Confirm email enabled in Supabase Authentication.
- Set Site URL to `https://unipath-preview.netlify.app`.
- Allow the redirect `https://unipath-preview.netlify.app/login?confirmed=1`.
- Configure and verify a production SMTP sender under Authentication / Emails.
  Supabase's default sender is not a production customer-email service.
- Keep `{{ .ConfirmationURL }}` in the signup confirmation template.
- Test signup, delivery to a non-team mailbox, newest-link confirmation, sign-in,
  expired-link handling, and resend. Do not paste passwords or SMTP secrets in chat.

## Before re-enabling purchases

Use a separate Stripe sandbox and Supabase test project/deploy, not live card charges.
The isolated preview can set CHECKOUT_AVAILABLE to true; production stays false.

- Verify test price IDs and keys belong to the same mode/account and have the advertised
  CAD price and monthly interval. Verify the live configuration separately before release.
- Test Pro (200) and Max (500), including a genuine 50% promotion code at Checkout.
  `allow_promotion_codes` is enabled, but the coupon/code must exist in Stripe.
- Confirm `invoice.paid` delivers HTTP 200 and grants exactly once. Replay the same event,
  resend a second event for the same invoice, and reverse delivery order.
- Spend credits and confirm the dashboard balance changes. Run out of credits and check
  that the server blocks further paid work. Renew and confirm exactly one new allowance.
- Test cancellation, failed payment, and the customer billing portal. Configure the portal
  to disallow plan switching until proration/upgrade behavior has its own acceptance tests.
- Test repeated/concurrent Checkout clicks and prevent overlapping subscriptions before
  release; the current existing-membership check alone does not serialize new sessions.
- Verify OpenAI billing/quota, successful feedback, invalid output handling, and failed-call
  credit restoration. These live service paths were not exercised by the local billing tests.
- Inspect the actual files flagged by any Netlify secret-scan failure. Do not assume broad
  secret-scan omissions prove that client bundles are safe.
- Re-enable production Checkout only after these checks and confirm the production deploy.

## Local regression tests

`npm run test:billing` tests handlers with stubbed providers and the real migration with
an isolated in-memory PostgreSQL engine. No customer accounts, real email or payments
are used. `npm run build` and targeted ESLint checks cover compilation and changed code.

These tests do not establish live SMTP delivery, Stripe configuration, Netlify environment
scope, OpenAI quota, or end-to-end fulfillment. Monthly subscription credits are an
allowance, not an automatically charged top-up when a customer runs out.
