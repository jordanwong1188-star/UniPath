import { CHECKOUT_AVAILABLE, CHECKOUT_PAUSED_MESSAGE } from "@/data/billingAvailability";
import { currentUser, subscriptionFor } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const priceEnvironmentKeys = {
  pro: "STRIPE_PRO_PRICE_ID",
  max: "STRIPE_MAX_PRICE_ID",
} as const;

type PaidPlan = keyof typeof priceEnvironmentKeys;

function isPaidPlan(value: unknown): value is PaidPlan {
  return value === "pro" || value === "max";
}

export async function POST(request: NextRequest) {
  if (!CHECKOUT_AVAILABLE) return NextResponse.json({ error: CHECKOUT_PAUSED_MESSAGE }, { status: 503 });
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) return NextResponse.json({ error: "Subscriptions are temporarily unavailable." }, { status: 503 });
    const sandbox = process.env.NEXT_PUBLIC_APP_URL === "https://unipath-billing-test.netlify.app";
    const expectedUrl = sandbox ? "https://unipath-billing-test.netlify.app" : "https://unipath-preview.netlify.app";
    const expectedDatabase = sandbox ? "https://zarawaytmqjvkrrushey.supabase.co" : "https://iyjckopkgaeclxloiwtm.supabase.co";
    if (!secretKey.startsWith(sandbox ? "sk_test_" : "sk_live_") ||
      process.env.NEXT_PUBLIC_APP_URL !== expectedUrl ||
      process.env.NEXT_PUBLIC_SUPABASE_URL !== expectedDatabase) {
      return NextResponse.json({ error: "Billing configuration needs attention. Please contact support." }, { status: 503 });
    }
    if (request.headers.get("origin") && request.headers.get("origin") !== expectedUrl)
      return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });

    const body: unknown = await request.json();
    const requestedPlan =
      typeof body === "object" && body !== null && "plan" in body
        ? (body as { plan?: unknown }).plan
        : undefined;
    if (!isPaidPlan(requestedPlan)) return NextResponse.json({ error: "Choose either Pro or Max." }, { status: 400 });

    const account = await currentUser();
    if (!account?.user.email) return NextResponse.json({ error: "Sign in before choosing a paid plan." }, { status: 401 });
    if (!account.user.email_confirmed_at) return NextResponse.json({ error: "Confirm your email before choosing a paid plan." }, { status: 403 });
    const existing = await subscriptionFor(account.accessToken, account.user.id);
    if (!existing) return NextResponse.json({ error: "Unable to verify your membership. Please contact support." }, { status: 503 });
    if (!["inactive", "canceled"].includes(existing.status)) {
      return NextResponse.json({ error: "You already have a subscription. Use Manage subscription to change it." }, { status: 409 });
    }

    const priceId = process.env[priceEnvironmentKeys[requestedPlan]];
    if (!priceId) return NextResponse.json({ error: "This plan is temporarily unavailable." }, { status: 503 });

    const origin = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || request.nextUrl.origin;
    const parameters = new URLSearchParams({
      mode: "subscription",
      "line_items[0][price]": priceId,
      "line_items[0][quantity]": "1",
      success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
      allow_promotion_codes: "true",
      billing_address_collection: "auto",
      "metadata[plan]": requestedPlan,
      "metadata[user_id]": account.user.id,
      "subscription_data[metadata][plan]": requestedPlan,
      "subscription_data[metadata][user_id]": account.user.id,
      customer_email: account.user.email,
      client_reference_id: account.user.id,
    });

    const databaseSecret = process.env.SUPABASE_SECRET_KEY;
    if (!databaseSecret) return NextResponse.json({ error: "Database configuration is missing." }, { status: 503 });
    const rpc = async (name: string, body: object) => {
      const response = await fetch(`${expectedDatabase}/rest/v1/rpc/${name}`, {
        method: "POST", headers: { apikey: databaseSecret, Authorization: `Bearer ${databaseSecret}`, "Content-Type": "application/json" },
        body: JSON.stringify(body), cache: "no-store", signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error("Checkout database operation failed");
      return response.json();
    };
    const stripe = async (path: string) => {
      const response = await fetch(`https://api.stripe.com/v1/${path}`, {
        headers: { Authorization: `Bearer ${secretKey}` }, cache: "no-store", signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error("Unable to verify Stripe state");
      return response.json();
    };
    const reservationBody = { p_user_id: account.user.id, p_plan: requestedPlan, p_parameters: parameters.toString() };
    let attempt = await rpc("reserve_checkout_v2", reservationBody);
    for (let retry = 0; retry < 2 && attempt.session_id; retry++) {
      const saved = await stripe(`checkout/sessions/${encodeURIComponent(attempt.session_id)}`);
      if (saved.client_reference_id !== account.user.id) throw new Error("Checkout ownership mismatch");
      if (saved.status === "open") {
        if (attempt.plan !== requestedPlan) return NextResponse.json({ error: "Finish your existing checkout first, or retry after it expires." }, { status: 409 });
        return NextResponse.json({ url: saved.url });
      }
      let replaceable = saved.status === "expired";
      if (saved.status === "complete" && typeof saved.subscription === "string") {
        const subscription = await stripe(`subscriptions/${encodeURIComponent(saved.subscription)}`);
        replaceable = ["canceled", "incomplete_expired"].includes(subscription.status);
      }
      if (!replaceable) return NextResponse.json({ error: "Your payment is already being processed. Check your dashboard or manage your subscription." }, { status: 409 });
      attempt = await rpc("reserve_checkout_v2", { ...reservationBody, p_replace_attempt: attempt.id });
    }
    if (attempt.session_id || attempt.plan !== requestedPlan) return NextResponse.json({ error: "Another checkout is in progress. Please retry shortly." }, { status: 409 });
    // Never replay an uncertain creation after Stripe may have discarded its idempotency key.
    const age = Date.now() - Date.parse(attempt.created_at);
    if (!Number.isFinite(age) || age > 23 * 60 * 60 * 1000) return NextResponse.json({ error: "Your previous checkout needs review. Contact unipath.guidance@gmail.com before retrying." }, { status: 409 });
    if (typeof attempt.id !== "string" || typeof attempt.parameters !== "string") throw new Error("Invalid checkout reservation");
    // Stable database-owned key and parameters survive concurrent clicks and timeouts.
    const stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${secretKey}:`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "Idempotency-Key": `unipath-checkout-${attempt.id}`,
      },
      body: attempt.parameters,
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    const session = await stripeResponse.json();

    if (!stripeResponse.ok || !session?.url || !session?.id) {
      console.error("Stripe Checkout session creation failed", session?.error?.type || stripeResponse.status);
      return NextResponse.json({ error: "Secure checkout could not be opened. Please try again." }, { status: 502 });
    }
    const attached = await rpc("attach_checkout_session", { p_user_id: account.user.id, p_attempt: attempt.id, p_session: session.id });
    if (!attached) throw new Error("Checkout changed during creation");
    if (session.status !== "open") return NextResponse.json({ error: "This checkout has finished. Please refresh your dashboard or retry." }, { status: 409 });
    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: "Secure checkout could not be opened. Please try again." }, { status: 500 });
  }
}
