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
  if (!timestamp || !/^\d+$/.test(timestamp) || !signatures.length || Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false;
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
    signal: AbortSignal.timeout(15000),
  });
  return response.ok ? response.json() : null;
}

async function applyEvent(input: Record<string, unknown>) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const secret = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secret) throw new Error("Supabase server configuration is missing.");
  const response = await fetch(`${url}/rest/v1/rpc/apply_subscription_event_v2`, {
    method: "POST",
    headers: { apikey: secret, Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
    body: JSON.stringify(input),
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
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
    const event = JSON.parse(payload) as { id: string; type: string; created: number; data: { object: StripeObject } };
    if (!event.id || !Number.isInteger(event.created)) throw new Error("Invalid event envelope.");
    const source = event.data.object;
    let id: string | undefined;
    let credits: number | null = null;
    if (event.type === "invoice.paid") {
      id = subscriptionId(source);
      if (!id || source.status !== "paid" || !["subscription_create", "subscription_cycle"].includes(source.billing_reason)) {
        return NextResponse.json({ received: true });
      }
    } else if (event.type === "checkout.session.completed") {
      if (source.mode !== "subscription") return NextResponse.json({ received: true });
      id = typeof source.subscription === "string" ? source.subscription : source.subscription?.id;
    } else if (["customer.subscription.deleted", "customer.subscription.updated"].includes(event.type)) {
      id = source.id;
    } else {
      return NextResponse.json({ received: true });
    }
    if (!id) throw new Error("Subscription ID is missing.");
    // Read current Stripe state, never trust a delayed event's status snapshot.
    const object = await stripeSubscription(id, stripeSecret);
    if (!object) throw new Error("Unable to retrieve subscription.");
    const userId = object.metadata?.user_id;
    const priceId = object.items?.data?.[0]?.price?.id;
    const plan = priceId && priceId === process.env.STRIPE_MAX_PRICE_ID ? "max"
      : priceId && priceId === process.env.STRIPE_PRO_PRICE_ID ? "pro" : null;
    if (typeof userId !== "string" || (plan !== "pro" && plan !== "max")) throw new Error("Subscription metadata is incomplete.");
    if (object.items?.data?.length !== 1 || object.items.data[0].quantity !== 1) throw new Error("Unsupported subscription items.");
    const customer = typeof object.customer === "string" ? object.customer : object.customer?.id;
    // Map non-entitled Stripe states to the existing database's inactive status.
    const status = ["active", "trialing", "past_due", "canceled", "unpaid"].includes(object.status) ? object.status : "inactive";
    const latestInvoice = typeof object.latest_invoice === "string" ? object.latest_invoice : object.latest_invoice?.id;
    if (event.type === "invoice.paid" && source.id === latestInvoice && object.status === "active") {
      // Old invoices and proration invoices must never refill a newer allowance.
      const lines = source.lines?.data;
      const recurring = Array.isArray(lines) ? lines.find((line: StripeObject) =>
        (line.price?.id ?? line.pricing?.price_details?.price) === priceId &&
        !line.proration && !line.parent?.subscription_item_details?.proration
      ) : null;
      if (!recurring || new Date(recurring.period?.end * 1000).toISOString() !== periodEnd(object)) {
        throw new Error("Invoice period or price could not be verified.");
      }
      credits = plan === "max" ? 500 : 200;
    }

    await applyEvent({
      p_event_id: event.id,
      p_event_created: event.created,
      p_invoice_id: credits === null ? null : source.id,
      p_subscription_created: object.created,
      p_user_id: userId,
      p_plan: plan,
      p_status: status,
      p_credits: credits,
      p_customer_id: customer ?? null,
      p_subscription_id: id,
      p_price_id: priceId,
      p_period_end: periodEnd(object),
    });
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook processing failed", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ error: "Webhook processing failed." }, { status: 500 });
  }
}
