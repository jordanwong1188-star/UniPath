import { currentUser, reserveCredits, restoreCredits } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function outputText(data: { output?: Array<{ content?: Array<{ type?: string; text?: string }> }> }) {
  return data.output?.flatMap(item => item.content ?? []).find(item => item.type === "output_text")?.text;
}

export async function GET() {
  return NextResponse.json({ enabled: Boolean(process.env.OPENAI_API_KEY) }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const account = await currentUser();
  if (!account) return NextResponse.json({ error: "Sign in to request feedback." }, { status: 401 });
  const key = process.env.OPENAI_API_KEY;
  if (!key) return NextResponse.json({ error: "Feedback is temporarily unavailable." }, { status: 503 });
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  const mode = body?.mode === "video" ? "video" : "written";
  const answer = typeof body?.response === "string" ? body.response.trim().slice(0, 12000) : "";
  if (!answer) return NextResponse.json({ error: "Write or record a response first." }, { status: 400 });
  const cost = mode === "video" ? 4 : 3;
  try { await reserveCredits(account.user.id, cost, `${mode}_application_feedback`); }
  catch { return NextResponse.json({ error: `An active subscription with at least ${cost} credits is required.` }, { status: 402 }); }
  try {
    const input = JSON.stringify({ university: body?.university, program: body?.program, mode, question: body?.prompt, applicantResponse: answer, evaluationContext: body?.context });
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5.4-mini",
        instructions: "Evaluate this Canadian undergraduate supplemental-application practice response. Be constructive, specific, and evidence-based. Do not predict admission. Return only valid JSON with: overallAssessment string, readinessLabel string, promptCoverage string, strongestEvidence string[], revisionPriorities array of {priority,why,how}, rubric array of {criterion,rating integer 1-5,evidence,nextStep}, authenticityCautions string[], limitations string[]. For transcript-only video responses, never claim to assess appearance, accent, eye contact, tone, or personality.",
        input, max_output_tokens: 1600, store: false,
      }), cache: "no-store",
    });
    const data = await response.json();
    const text = response.ok ? outputText(data) : null;
    if (!text) throw new Error("No response");
    const feedback = JSON.parse(text.replace(/^```json\s*|\s*```$/g, ""));
    return NextResponse.json({ feedback });
  } catch {
    await restoreCredits(account.user.id, cost, `${mode}_application_feedback_refund`).catch(() => null);
    return NextResponse.json({ error: "Feedback could not be generated. Your credits were restored." }, { status: 502 });
  }
}
