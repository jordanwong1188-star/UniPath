import { currentUser, reserveCredits, restoreCredits } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function outputText(data: { output?: Array<{ content?: Array<{ type?: string; text?: string }> }> }) {
  return data.output?.flatMap(item => item.content ?? []).find(item => item.type === "output_text")?.text;
}

export async function POST(request: Request) {
  const account = await currentUser();
  if (!account) return NextResponse.json({ error: "Sign in to use the UniPath assistant." }, { status: 401 });
  const key = process.env.OPENAI_API_KEY;
  if (!key) return NextResponse.json({ error: "The assistant is temporarily unavailable." }, { status: 503 });
  const body = await request.json().catch(() => null) as { messages?: Array<{ role?: string; content?: string }> } | null;
  const messages = body?.messages?.filter(item => (item.role === "user" || item.role === "assistant") && typeof item.content === "string").slice(-8);
  if (!messages?.length) return NextResponse.json({ error: "Enter a university admissions question." }, { status: 400 });
  try { await reserveCredits(account.user.id, 1, "admissions_chat"); }
  catch { return NextResponse.json({ error: "An active subscription with at least 1 credit is required." }, { status: 402 }); }
  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5.4-mini",
        instructions: "You are UniPath, a careful Canadian undergraduate admissions planning assistant. Be concise and practical. Never guarantee admission. Be transparent about uncertainty and tell users to verify changing requirements and deadlines on the university's official website.",
        input: messages, max_output_tokens: 700, store: false,
      }), cache: "no-store",
    });
    const data = await response.json();
    const message = response.ok ? outputText(data) : null;
    if (!message) throw new Error("No response");
    return NextResponse.json({ message });
  } catch {
    await restoreCredits(account.user.id, 1, "admissions_chat_refund").catch(() => null);
    return NextResponse.json({ error: "The assistant could not respond. Your credit was restored." }, { status: 502 });
  }
}
