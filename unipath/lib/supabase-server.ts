import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const ACCESS_COOKIE = "unipath-access-token";
const REFRESH_COOKIE = "unipath-refresh-token";

type SupabaseUser = {
  id: string;
  email?: string;
  email_confirmed_at?: string;
  user_metadata?: { full_name?: string };
};

type TokenSession = {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
  user: SupabaseUser;
};

function configuration() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !publishableKey) return null;
  return { url, publishableKey };
}

export function supabasePublicConfiguration() {
  return configuration();
}

export function setAuthCookies(response: NextResponse, session: TokenSession) {
  const secure = process.env.NODE_ENV === "production";
  response.cookies.set(ACCESS_COOKIE, session.access_token, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: session.expires_in ?? 3600,
  });
  response.cookies.set(REFRESH_COOKIE, session.refresh_token, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export function clearAuthCookies(response: NextResponse) {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };
  response.cookies.set(ACCESS_COOKIE, "", options);
  response.cookies.set(REFRESH_COOKIE, "", options);
}

async function fetchUser(accessToken: string) {
  const config = configuration();
  if (!config) return null;
  const response = await fetch(`${config.url}/auth/v1/user`, {
    headers: {
      apikey: config.publishableKey,
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });
  if (!response.ok) return null;
  return (await response.json()) as SupabaseUser;
}

export async function currentUser() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_COOKIE)?.value;
  if (!accessToken) return null;
  const user = await fetchUser(accessToken);
  return user ? { user, accessToken } : null;
}

export async function refreshSession() {
  const config = configuration();
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_COOKIE)?.value;
  if (!config || !refreshToken) return null;
  const response = await fetch(`${config.url}/auth/v1/token?grant_type=refresh_token`, {
    method: "POST",
    headers: {
      apikey: config.publishableKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
    cache: "no-store",
  });
  if (!response.ok) return null;
  return (await response.json()) as TokenSession;
}

export async function subscriptionFor(accessToken: string, userId: string) {
  const config = configuration();
  if (!config) return null;
  const query = new URLSearchParams({
    user_id: `eq.${userId}`,
    select: "plan,status,credits_remaining,current_period_end",
    limit: "1",
  });
  const response = await fetch(`${config.url}/rest/v1/subscriptions?${query}`, {
    headers: {
      apikey: config.publishableKey,
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });
  if (!response.ok) return null;
  const rows = (await response.json()) as Array<{
    plan: "free" | "pro" | "max";
    status: string;
    credits_remaining: number;
    current_period_end: string | null;
  }>;
  return rows[0] ?? null;
}

async function serviceRpc(name: string, body: Record<string, unknown>) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const secret = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secret) throw new Error("Server database configuration is missing.");
  const response = await fetch(`${url}/rest/v1/rpc/${name}`, {
    method: "POST",
    headers: { apikey: secret, Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
    body: JSON.stringify(body), cache: "no-store",
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.message || `Database operation failed (${response.status}).`);
  return data;
}

export async function reserveCredits(userId: string, amount: number, action: string) {
  return serviceRpc("reserve_credits", { p_user_id: userId, p_amount: amount, p_action: action });
}

export async function restoreCredits(userId: string, amount: number, action: string) {
  return serviceRpc("restore_credits", { p_user_id: userId, p_amount: amount, p_action: action });
}

export type { SupabaseUser, TokenSession };
