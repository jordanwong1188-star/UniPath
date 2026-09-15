import { currentUser } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
  const account = await currentUser();
  if (!account) return NextResponse.json({ error: "Sign in to manage your subscription." }, { status: 401 });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const secret = process.env.SUPABASE_SECRET_KEY;
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!url || !secret || !stripeKey) return NextResponse.json({ error: "Billing management is temporarily unavailable." }, { status: 503 });
  const query = new URLSearchParams({ user_id: `eq.${account.user.id}`, select: "stripe_customer_id", limit: "1" });
  const subscription = await fetch(`${url}/rest/v1/subscriptions?${query}`, { headers: { apikey: secret, Authorization: `Bearer ${secret}` }, cache: "no-store" });
  if (!subscription.ok) return NextResponse.json({ error: "Unable to verify your billing account. Please try again." }, { status: 503 });
  const rows = await subscription.json() as Array<{ stripe_customer_id?: string }>;
  const customer = rows[0]?.stripe_customer_id;
  if (!customer) return NextResponse.json({ error: "No paid subscription was found." }, { status: 404 });
  const origin = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || request.nextUrl.origin;
  const parameters = new URLSearchParams({ customer, return_url: `${origin}/dashboard` });
  const stripe = await fetch("https://api.stripe.com/v1/billing_portal/sessions", { method: "POST", headers: { Authorization: `Basic ${Buffer.from(`${stripeKey}:`).toString("base64")}`, "Content-Type": "application/x-www-form-urlencoded" }, body: parameters, cache: "no-store" });
  const session = await stripe.json();
  if (!stripe.ok || !session?.url) return NextResponse.json({ error: "Billing management could not be opened." }, { status: 502 });
  return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: "Billing management is temporarily unavailable. Please try again." }, { status: 503 });
  }
}
