import { NextResponse } from "next/server";
import { AI_PAUSED_MESSAGE } from "@/data/aiAvailability";

export async function POST() {
  return NextResponse.json({ error: AI_PAUSED_MESSAGE, code: "AI_DISABLED" }, { status: 503 });
}
