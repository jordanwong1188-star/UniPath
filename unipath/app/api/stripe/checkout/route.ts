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

    const stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${secretKey}:`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: parameters,
      cache: "no-store",
    });
    const session = await stripeResponse.json();

    if (!stripeResponse.ok || !session?.url) {
      console.error("Stripe Checkout session creation failed", session?.error?.type || stripeResponse.status);
      return NextResponse.json({ error: "Secure checkout could not be opened. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: "Secure checkout could not be opened. Please try again." }, { status: 500 });
  }
}
