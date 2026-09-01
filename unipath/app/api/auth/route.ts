import { NextResponse } from "next/server";
import {
  clearAuthCookies,
  currentUser,
  refreshSession,
  setAuthCookies,
  subscriptionFor,
  supabasePublicConfiguration,
  type TokenSession,
} from "@/lib/supabase-server";

function safeMessage(payload: unknown, fallback: string) {
  if (payload && typeof payload === "object" && "msg" in payload && typeof payload.msg === "string") return payload.msg;
  if (payload && typeof payload === "object" && "message" in payload && typeof payload.message === "string") return payload.message;
  return fallback;
}

export async function GET() {
  let session = await currentUser();
  let refreshed: TokenSession | null = null;
  if (!session) {
    refreshed = await refreshSession();
    if (refreshed) session = { user: refreshed.user, accessToken: refreshed.access_token };
  }
  if (!session) {
    const response = NextResponse.json({ user: null });
    clearAuthCookies(response);
    return response;
  }

  const subscription = await subscriptionFor(session.accessToken, session.user.id);
  const response = NextResponse.json({
    user: {
      id: session.user.id,
      email: session.user.email ?? "",
      name: session.user.user_metadata?.full_name || "Student",
    },
    subscription: subscription ?? { plan: "free", status: "inactive", credits_remaining: 0 },
  });
  if (refreshed) setAuthCookies(response, refreshed);
  return response;
}

export async function POST(request: Request) {
  const config = supabasePublicConfiguration();
  if (!config) return NextResponse.json({ error: "Account service is not configured." }, { status: 503 });

  const body = await request.json().catch(() => ({}));
  const action = typeof body?.action === "string" ? body.action : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  const fullName = typeof body?.fullName === "string" ? body.fullName.trim() : "";
  if (!email || password.length < 8) {
    return NextResponse.json({ error: "Enter a valid email and a password with at least 8 characters." }, { status: 400 });
  }

  const isSignup = action === "signup";
  const endpoint = isSignup ? "/auth/v1/signup" : "/auth/v1/token?grant_type=password";
  const payload = isSignup
    ? { email, password, data: { full_name: fullName || "Student" } }
    : { email, password };
  const authResponse = await fetch(`${config.url}${endpoint}`, {
    method: "POST",
    headers: { apikey: config.publishableKey, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  const data = await authResponse.json().catch(() => ({}));
  if (!authResponse.ok) {
    return NextResponse.json({ error: safeMessage(data, "Unable to access this account.") }, { status: authResponse.status });
  }

  if (!data.access_token || !data.refresh_token) {
    return NextResponse.json({ requiresConfirmation: true });
  }
  const response = NextResponse.json({ authenticated: true });
  setAuthCookies(response, data as TokenSession);
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  clearAuthCookies(response);
  return response;
}
