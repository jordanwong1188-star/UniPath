import { NextResponse } from "next/server";
import { AI_PAUSED_MESSAGE } from "@/data/aiAvailability";

// No provider import or call exists in this release, even if API keys are configured.
export async function GET() {
  return NextResponse.json({ enabled: false, reason: AI_PAUSED_MESSAGE }, {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST() {
  return NextResponse.json({ error: AI_PAUSED_MESSAGE, code: "AI_DISABLED" }, { status: 503 });
}
