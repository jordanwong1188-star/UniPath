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
  if (payload && typeof payload === "object" && "code" in payload) {
    if (payload.code === "email_not_confirmed") return "Please confirm your email first. You can resend the confirmation below.";
    if (payload.code === "over_email_send_rate_limit") return "Too many email requests. Please wait before resending.";
    if (payload.code === "email_address_not_authorized" || payload.code === "unexpected_failure") return "Confirmation email could not be delivered. Please contact unipath.guidance@gmail.com.";
  }
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
  if (request.headers.get("origin") && request.headers.get("origin") !== new URL(request.url).origin) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }
  try {
  const config = supabasePublicConfiguration();
  if (!config) return NextResponse.json({ error: "Account service is not configured." }, { status: 503 });

  const body = await request.json().catch(() => ({}));
  const action = typeof body?.action === "string" ? body.action : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  const fullName = typeof body?.fullName === "string" ? body.fullName.trim() : "";
  if (!["signup", "login", "resend"].includes(action)) {
    return NextResponse.json({ error: "Unknown account action." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || (action !== "resend" && (password.length < 8 || password.length > 1024))) {
    return NextResponse.json({ error: "Enter a valid email and a password with at least 8 characters." }, { status: 400 });
  }

  const isSignup = action === "signup";
  const origin = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
  if ((isSignup || action === "resend") && !origin) return NextResponse.json({ error: "Email confirmation is temporarily unavailable. Please contact support." }, { status: 503 });
  const redirect = encodeURIComponent(`${origin}/login?confirmed=1`);
  const endpoint = action === "resend" ? `/auth/v1/resend?redirect_to=${redirect}` : isSignup ? `/auth/v1/signup?redirect_to=${redirect}` : "/auth/v1/token?grant_type=password";
  const payload = action === "resend" ? { type: "signup", email } : isSignup
    ? { email, password, data: { full_name: fullName.slice(0, 150) || "Student" } }
    : { email, password };
  const authResponse = await fetch(`${config.url}${endpoint}`, {
    method: "POST",
    headers: { apikey: config.publishableKey, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });
  const data = await authResponse.json().catch(() => ({}));
  if (!authResponse.ok) {
    return NextResponse.json({ error: safeMessage(data, "Unable to access this account.") }, { status: authResponse.status });
  }

  if (action === "resend") return NextResponse.json({ message: "If this account needs confirmation, a new email has been requested. Check spam too, and use the newest link." });

  if (!data.access_token || !data.refresh_token) {
    return NextResponse.json({ requiresConfirmation: true });
  }
  const response = NextResponse.json({ authenticated: true });
  setAuthCookies(response, data as TokenSession);
  return response;
  } catch {
    return NextResponse.json({ error: "Account service is temporarily unavailable. Please try again shortly." }, { status: 503 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  clearAuthCookies(response);
  return response;
}
