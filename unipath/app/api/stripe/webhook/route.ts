import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Stripe webhook payloads vary by event and API version; nested fields are
// narrowed at each use below.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StripeObject = Record<string, any>;

function validSignature(payload: string, header: string, secret: string) {
  const values = header.split(",").map(part => part.split("="));
  const timestamp = values.find(([key]) => key === "t")?.[1];
  const signatures = values.filter(([key]) => key === "v1").map(([, value]) => value);
  if (!timestamp || !signatures.length || Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false;
  const expected = createHmac("sha256", secret).update(`${timestamp}.${payload}`).digest("hex");
  return signatures.some(signature => {
    const a = Buffer.from(signature); const b = Buffer.from(expected);
    return a.length === b.length && timingSafeEqual(a, b);
  });
}

async function stripeSubscription(id: string, secretKey: string) {
  const response = await fetch(`https://api.stripe.com/v1/subscriptions/${encodeURIComponent(id)}`, {
    headers: { Authorization: `Basic ${Buffer.from(`${secretKey}:`).toString("base64")}` },
    cache: "no-store",
  });
  return response.ok ? response.json() : null;
}

async function applyEvent(input: Record<string, unknown>) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const secret = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secret) throw new Error("Supabase server configuration is missing.");
  const response = await fetch(`${url}/rest/v1/rpc/apply_subscription_event`, {
    method: "POST",
    headers: { apikey: secret, Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
    body: JSON.stringify(input),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Subscription update failed (${response.status}).`);
}

function subscriptionId(invoice: StripeObject) {
  const value = invoice.subscription ?? invoice.parent?.subscription_details?.subscription;
  return typeof value === "string" ? value : value?.id;
}

function periodEnd(subscription: StripeObject) {
  const value = subscription.current_period_end ?? subscription.items?.data?.[0]?.current_period_end;
  return typeof value === "number" ? new Date(value * 1000).toISOString() : null;
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const signature = request.headers.get("stripe-signature") ?? "";
  const payload = await request.text();
  if (!webhookSecret || !stripeSecret || !validSignature(payload, signature, webhookSecret)) {
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });
  }

  try {
    const event = JSON.parse(payload) as { id: string; type: string; data: { object: StripeObject } };
    let object = event.data.object;
    let credits: number | null = null;

    if (event.type === "invoice.paid") {
      const id = subscriptionId(object);
      if (!id) return NextResponse.json({ received: true });
      object = await stripeSubscription(id, stripeSecret);
      if (!object) throw new Error("Unable to retrieve subscription.");
      credits = object.metadata?.plan === "max" ? 500 : 200;
    } else if (event.type === "checkout.session.completed") {
      credits = object.metadata?.plan === "max" ? 500 : 200;
    } else if (event.type === "customer.subscription.deleted") {
      credits = 0;
    } else if (event.type !== "customer.subscription.updated") {
      return NextResponse.json({ received: true });
    }

    const userId = object.metadata?.user_id;
    const plan = object.metadata?.plan;
    if (typeof userId !== "string" || (plan !== "pro" && plan !== "max")) throw new Error("Subscription metadata is incomplete.");
    const customer = typeof object.customer === "string" ? object.customer : object.customer?.id;
    const subscription = event.type === "checkout.session.completed"
      ? (typeof object.subscription === "string" ? object.subscription : object.subscription?.id)
      : object.id;
    const status = event.type === "checkout.session.completed" ? "active" : event.type === "customer.subscription.deleted" ? "canceled" : object.status;
    const priceId = object.items?.data?.[0]?.price?.id ?? null;

    await applyEvent({
      p_event_id: event.id,
      p_user_id: userId,
      p_plan: plan,
      p_status: status,
      p_credits: credits,
      p_customer_id: customer ?? null,
      p_subscription_id: subscription ?? null,
      p_price_id: priceId,
      p_period_end: periodEnd(object),
    });
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook processing failed", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ error: "Webhook processing failed." }, { status: 500 });
  }
}
