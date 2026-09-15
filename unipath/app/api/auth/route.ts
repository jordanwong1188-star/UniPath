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
    if (payload.code === "invalid_credentials") return "That email and password do not match. Try resetting your password below.";
    if (payload.code === "over_email_send_rate_limit") return "Too many email requests. Please wait before resending.";
    if (payload.code === "email_address_not_authorized" || payload.code === "unexpected_failure") {
      return "Confirmation email could not be delivered right now. Please try again shortly or contact unipath.guidance@gmail.com.";
    }
  }
  const rawMessage =
    payload && typeof payload === "object" && "msg" in payload && typeof payload.msg === "string"
      ? payload.msg
      : payload && typeof payload === "object" && "message" in payload && typeof payload.message === "string"
      ? payload.message
      : "";
  if (/unexpected failure|confirmation email|sending.*email|smtp/i.test(rawMessage)) {
    return "Confirmation email could not be delivered right now. Please try again shortly or contact unipath.guidance@gmail.com.";
  }
  return rawMessage || fallback;
}

async function fetchAuthService(url: string, init: RequestInit) {
  const maxAttempts = 2;
  let lastError: unknown = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        ...init,
        cache: "no-store",
        signal: AbortSignal.timeout(12000),
      });

      // Supabase has occasionally returned transient gateway errors. Retry once
      // so a short provider/network interruption does not make signup fail.
      if (![502, 503, 504].includes(response.status) || attempt === maxAttempts) {
        return response;
      }

      await response.body?.cancel();
      lastError = new Error(`Auth provider returned ${response.status}`);
    } catch (error) {
      lastError = error;
      if (attempt === maxAttempts) throw error;
    }

    await new Promise((resolve) => setTimeout(resolve, 400));
  }

  throw lastError instanceof Error ? lastError : new Error("Auth provider unavailable");
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
  // Behind Netlify's proxy, request.url can have an internal origin.
  // Trust deployment configuration, never Host/X-Forwarded-Host supplied by a request.
  let expectedOrigin: string;
  try {
    const configured = process.env.NEXT_PUBLIC_APP_URL;
    if (!configured && process.env.NODE_ENV === "production") throw new Error("Missing app URL");
    const appUrl = new URL(configured || request.url);
    if (!["http:", "https:"].includes(appUrl.protocol) || appUrl.username || appUrl.password) throw new Error("Invalid app URL");
    expectedOrigin = appUrl.origin;
  } catch {
    return NextResponse.json({ error: "Account service URL is not configured." }, { status: 503 });
  }
  if (request.headers.get("origin") && request.headers.get("origin") !== expectedOrigin) {
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
  const accessToken = typeof body?.accessToken === "string" ? body.accessToken : "";
  const refreshToken = typeof body?.refreshToken === "string" ? body.refreshToken : "";
  if (!["signup", "login", "resend", "recover", "update-password", "adopt-session"].includes(action)) {
    return NextResponse.json({ error: "Unknown account action." }, { status: 400 });
  }

  const needsEmail = !["update-password", "adopt-session"].includes(action);
  const needsPassword = ["signup", "login", "update-password"].includes(action);
  if (
    (needsEmail && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)) ||
    (needsPassword && (password.length < 8 || password.length > 1024)) ||
    (["update-password", "adopt-session"].includes(action) && !accessToken) ||
    (action === "adopt-session" && !refreshToken)
  ) {
    return NextResponse.json({ error: "Enter valid account details and a password with at least 8 characters." }, { status: 400 });
  }

  const origin = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
  if (["signup", "resend", "recover"].includes(action) && !origin) {
    return NextResponse.json({ error: "Account email service is temporarily unavailable. Please contact support." }, { status: 503 });
  }

  if (action === "update-password") {
    const updateResponse = await fetchAuthService(`${config.url}/auth/v1/user`, {
      method: "PUT",
      headers: {
        apikey: config.publishableKey,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });
    const updateData = await updateResponse.json().catch(() => ({}));
    if (!updateResponse.ok) {
      return NextResponse.json({ error: safeMessage(updateData, "Unable to update your password.") }, { status: updateResponse.status });
    }
    return NextResponse.json({ passwordUpdated: true });
  }

  if (action === "adopt-session") {
    const userResponse = await fetchAuthService(`${config.url}/auth/v1/user`, {
      method: "GET",
      headers: {
        apikey: config.publishableKey,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const user = await userResponse.json().catch(() => null);
    if (!userResponse.ok || !user?.id) {
      return NextResponse.json({ error: "This confirmation session is invalid or expired." }, { status: 401 });
    }
    const response = NextResponse.json({ authenticated: true });
    setAuthCookies(response, {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: 3600,
      user,
    } as TokenSession);
    return response;
  }

  const isSignup = action === "signup";
  const confirmationRedirect = encodeURIComponent(`${origin}/login?confirmed=1`);
  const recoveryRedirect = encodeURIComponent(`${origin}/login?recovery=1`);
  const endpoint =
    action === "resend"
      ? `/auth/v1/resend?redirect_to=${confirmationRedirect}`
      : action === "recover"
      ? `/auth/v1/recover?redirect_to=${recoveryRedirect}`
      : isSignup
      ? `/auth/v1/signup?redirect_to=${confirmationRedirect}`
      : "/auth/v1/token?grant_type=password";
  const payload =
    action === "resend"
      ? { type: "signup", email }
      : action === "recover"
      ? { email }
      : isSignup
      ? { email, password, data: { full_name: fullName.slice(0, 150) || "Student" } }
      : { email, password };

  const authResponse = await fetchAuthService(`${config.url}${endpoint}`, {
    method: "POST",
    headers: { apikey: config.publishableKey, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await authResponse.json().catch(() => ({}));
  if (!authResponse.ok) {
    return NextResponse.json({ error: safeMessage(data, "Unable to access this account.") }, { status: authResponse.status });
  }

  if (action === "resend") {
    return NextResponse.json({ message: "If this account needs confirmation, a new email has been requested. Check spam too, and use the newest link." });
  }
  if (action === "recover") {
    return NextResponse.json({ message: "If an account exists for that email, a password-reset link has been sent. Check spam too." });
  }

  if (!data.access_token || !data.refresh_token) {
    return NextResponse.json({ requiresConfirmation: true });
  }
  const response = NextResponse.json({ authenticated: true });
  setAuthCookies(response, data as TokenSession);
  return response;
  } catch (error) {
    console.error(
      "UniPath auth provider request failed",
      error instanceof Error ? { name: error.name, message: error.message } : { errorType: typeof error },
    );
    return NextResponse.json({ error: "Account service is temporarily unavailable. Please try again shortly." }, { status: 503 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  clearAuthCookies(response);
  return response;
}
