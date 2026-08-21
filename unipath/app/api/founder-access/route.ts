import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const COOKIE_NAME = "unipath-founder-access";

function digest(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

async function hasFounderAccess() {
  const accessKey = process.env.UNIPATH_FOUNDER_ACCESS_KEY;
  if (!accessKey) return false;

  const cookieStore = await cookies();
  const stored = cookieStore.get(COOKIE_NAME)?.value;
  if (!stored) return false;

  const expected = digest(accessKey);
  const a = Buffer.from(stored);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function GET() {
  return NextResponse.json({ isFounder: await hasFounderAccess() });
}

export async function POST(request: Request) {
  const accessKey = process.env.UNIPATH_FOUNDER_ACCESS_KEY;
  if (!accessKey) {
    return NextResponse.json(
      { error: "Founder access is not configured on this deployment." },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => ({}));
  const submitted = typeof body?.accessKey === "string" ? body.accessKey : "";

  const submittedBuffer = Buffer.from(digest(submitted));
  const expectedBuffer = Buffer.from(digest(accessKey));
  const valid =
    submittedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(submittedBuffer, expectedBuffer);

  if (!valid) {
    return NextResponse.json({ error: "Invalid founder access key." }, { status: 401 });
  }

  const response = NextResponse.json({ isFounder: true });
  response.cookies.set(COOKIE_NAME, digest(accessKey), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ isFounder: false });
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
