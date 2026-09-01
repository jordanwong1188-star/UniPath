import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHmac } from "node:crypto";
import vm from "node:vm";
import { createRequire } from "node:module";
import ts from "typescript";
import { PGlite } from "@electric-sql/pglite";

const require = createRequire(import.meta.url);
function loadRoute(path, { env = {}, fetch, imports = {} } = {}) {
  const source = readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const exports = {};
  vm.runInNewContext(code, { exports, process: { env }, Buffer, URL, URLSearchParams, Request, Response, AbortSignal,
    console: { error() {} }, fetch, require: name => imports[name] ?? (name === "next/server" ? { NextResponse: Response } : require(name)) });
  return exports;
}

test("webhook grants only verified paid recurring invoices; retries stay identifiable", async () => {
  const env = { STRIPE_WEBHOOK_SECRET: "test-only-signing-secret", STRIPE_SECRET_KEY: "test-only-key",
    STRIPE_PRO_PRICE_ID: "price_pro", STRIPE_MAX_PRICE_ID: "price_max",
    NEXT_PUBLIC_SUPABASE_URL: "https://database.invalid", SUPABASE_SECRET_KEY: "test-only-database-key" };
  const end = Math.floor(Date.now() / 1000) + 86400;
  const subscription = { id: "sub_1", created: 10, customer: "cus_1", status: "active", latest_invoice: "in_1",
    metadata: { user_id: "00000000-0000-0000-0000-000000000001", plan: "pro" },
    items: { data: [{ quantity: 1, price: { id: "price_max" }, current_period_end: end }] } };
  const applied = [];
  const route = loadRoute("app/api/stripe/webhook/route.ts", { env, fetch: async (url, options) => {
    if (url.startsWith("https://api.stripe.com/v1/subscriptions/")) return Response.json(subscription);
    assert.equal(url, "https://database.invalid/rest/v1/rpc/apply_subscription_event_v2");
    applied.push(JSON.parse(options.body)); return Response.json(true);
  } });
  async function send(type, object, signatureOverride) {
    const payload = JSON.stringify({ id: `evt_${applied.length}`, type, created: 100, data: { object } });
    const time = Math.floor(Date.now() / 1000);
    const signature = createHmac("sha256", env.STRIPE_WEBHOOK_SECRET).update(`${time}.${payload}`).digest("hex");
    return route.POST(new Request("https://unipath.invalid/api/stripe/webhook", { method: "POST", body: payload,
      headers: { "stripe-signature": signatureOverride ?? `t=${time},v1=${signature}` } }));
  }
  assert.equal((await send("checkout.session.completed", { mode: "subscription", subscription: "sub_1" })).status, 200);
  assert.equal(applied.at(-1).p_credits, null);
  const invoice = { id: "in_1", status: "paid", billing_reason: "subscription_create",
    parent: { subscription_details: { subscription: "sub_1" } },
    lines: { data: [{ pricing: { price_details: { price: "price_max" } }, period: { end } }] } };
  assert.equal((await send("invoice.paid", invoice)).status, 200);
  assert.equal(applied.at(-1).p_credits, 500);
  assert.equal(applied.at(-1).p_invoice_id, "in_1");
  assert.equal(applied.at(-1).p_plan, "max", "Price ID, not stale metadata, selects plan");
  const count = applied.length;
  await send("invoice.paid", { ...invoice, billing_reason: "subscription_update" });
  await send("invoice.paid", { ...invoice, status: "open" });
  assert.equal(applied.length, count);
  await send("invoice.paid", { ...invoice, id: "in_old" });
  assert.equal(applied.at(-1).p_credits, null);
  subscription.status = "incomplete";
  await send("checkout.session.completed", { mode: "subscription", subscription: "sub_1" });
  assert.equal(applied.at(-1).p_status, "inactive");
  assert.equal(applied.at(-1).p_credits, null);
  assert.equal((await send("invoice.paid", invoice, "t=NaN,v1=invalid")).status, 400);
  assert.equal((await send("invoice.paid", invoice, "t=1,v1=invalid")).status, 400);
});

test("checkout is paused server-side before any network or authentication call", async () => {
  const route = loadRoute("app/api/stripe/checkout/route.ts", { imports: {
    "@/data/billingAvailability": { CHECKOUT_AVAILABLE: false, CHECKOUT_PAUSED_MESSAGE: "Paused" },
    "@/lib/supabase-server": { currentUser: () => { throw new Error("Should not run"); } },
  } });
  assert.equal((await route.POST(new Request("https://unipath.invalid", { method: "POST" }))).status, 503);
});

test("resend uses signup email endpoint, no password, and trusted redirect", async () => {
  let sent;
  const route = loadRoute("app/api/auth/route.ts", { env: { NEXT_PUBLIC_APP_URL: "https://unipath.invalid" },
    imports: { "@/lib/supabase-server": { supabasePublicConfiguration: () => ({ url: "https://database.invalid", publishableKey: "public-key" }) } },
    fetch: async (url, options) => { sent = { url, payload: JSON.parse(options.body) }; return Response.json({}); } });
  const send = body => route.POST(new Request("https://unipath.invalid/api/auth", { method: "POST", body: JSON.stringify(body) }));
  assert.equal((await send({ action: "resend", email: "Student@Example.com" })).status, 200);
  assert.equal(sent.payload.type, "signup");
  assert.equal(sent.payload.email, "student@example.com");
  assert.equal(new URL(sent.url).searchParams.get("redirect_to"), "https://unipath.invalid/login?confirmed=1");
  assert.equal((await send({ action: "delete", email: "student@example.com", password: "anything" })).status, 400);
  assert.equal((await send({ action: "resend", email: "invalid" })).status, 400);
});

test("Postgres migration prevents duplicate grants, overspending, stale state and unauthorized writes", async () => {
  const db = new PGlite();
  try {
    await db.exec(`create schema auth; create role anon; create role authenticated; create role service_role;
      create table auth.users(id uuid primary key, email text, raw_user_meta_data jsonb);
      create function auth.uid() returns uuid language sql as 'select null::uuid';`);
    const migration = name => readFileSync(new URL(`../supabase/migrations/${name}.sql`, import.meta.url), "utf8");
    await db.exec(migration("20260831_subscription_foundation").replace("create extension if not exists pgcrypto;", ""));
    await db.exec(migration("20260901_apply_subscription_events"));
    await db.exec(migration("20260901_credit_reservations"));
    await db.exec(migration("20260902_billing_safety"));
    await db.exec(migration("20260902_billing_safety")); // safe re-run
    const user = "00000000-0000-0000-0000-000000000001";
    await db.query("insert into auth.users(id,email) values($1,'student@example.com')", [user]);
    const end = new Date(Date.now() + 86400000).toISOString();
    const later = new Date(Date.now() + 86400000 * 31).toISOString();
    const apply = (event, created, credits = null, invoice = null, status = "active", period = end, sub = "sub_1", subCreated = 10) =>
      db.query("select public.apply_subscription_event_v2($1,$2,$3,$4,$5,'max',$6,$7,'cus_1',$8,'price_max',$9)",
        [event, created, invoice, subCreated, user, status, credits, sub, period]);
    const balance = async () => (await db.query("select credits_remaining from public.subscriptions where user_id=$1", [user])).rows[0].credits_remaining;
    const spend = amount => db.query("select public.reserve_credits($1,$2,'test')", [user, amount]);
    await apply("evt_invoice", 100, 500, "in_1"); assert.equal(await balance(), 500);
    await spend(4); assert.equal(await balance(), 496);
    await apply("evt_checkout", 101); assert.equal(await balance(), 496);
    await apply("evt_invoice", 100, 500, "in_1"); assert.equal(await balance(), 496);
    await apply("evt_invoice_duplicate", 102, 500, "in_1"); assert.equal(await balance(), 496);
    await apply("evt_same_period", 103, 500, "in_other"); assert.equal(await balance(), 496);
    await apply("evt_renewal", 200, 500, "in_2", "active", later); assert.equal(await balance(), 500);
    await apply("evt_stale_cancel", 99, null, null, "canceled"); assert.equal(await balance(), 500);
    await apply("evt_cancel", 201, null, null, "canceled", later); assert.equal(await balance(), 0);
    await assert.rejects(spend(1), /Active subscription/);
    await apply("evt_old_paid", 90, 500, "in_old", "active", later); assert.equal(await balance(), 0);
    await db.query("update public.subscriptions set status='active', credits_remaining=1, current_period_end=$2 where user_id=$1", [user, later]);
    const races = await Promise.allSettled([spend(1), spend(1)]);
    assert.equal(races.filter(r => r.status === "fulfilled").length, 1); assert.equal(await balance(), 0);
    await db.query("update public.subscriptions set credits_remaining=500,current_period_end=now()-interval '1 day' where user_id=$1", [user]);
    await assert.rejects(spend(1), /Active subscription/);
    await db.exec("set role authenticated");
    await assert.rejects(spend(1), /permission denied/);
    await assert.rejects(apply("evt_attacker", 999, 500, "in_attacker"), /permission denied/);
    await db.exec("reset role");
  } finally { await db.close(); }
});
