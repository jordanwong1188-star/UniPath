import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from "next/server";

const REVIEW_INSTRUCTIONS = `
You are UniPath's supplemental-application reviewer. Provide rigorous, constructive
coaching for a Canadian undergraduate applicant.

Accuracy rules:
- Assess only the prompt, response, program context, and format provided.
- Never predict admission, invent a university criterion, or claim to represent the admissions committee.
- Distinguish an explicit official criterion supplied in the context from a general writing recommendation.
- Do not reward keywords. A criterion is demonstrated only when the response contains meaningful evidence.
- Quote or closely identify the student's actual evidence for every strength.
- If the prompt is missing, say prompt coverage cannot be fully assessed.
- If an outcome is asserted without support, flag it as unverified rather than assuming it is true.
- Do not rewrite the response or manufacture experiences. Give revision instructions and short illustrative fragments only.
- Respect authenticity: discourage exaggerated claims, prestige-dropping, clichés, and over-polished generic language.
- For video transcripts, assess spoken clarity and natural delivery as far as text permits, but state that eye contact, pace, tone, and presence cannot be assessed from a transcript.
- For portfolios, auditions, CASPer, and creative submissions, evaluate only the written practice material provided and explicitly state what cannot be assessed.
- Ratings use 0–4: 0 absent, 1 weak, 2 developing, 3 strong, 4 exceptional. Use 4 rarely.
- Keep feedback specific, concise, and actionable for a Grade 11 or 12 student.
`;

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    overallAssessment: { type: Type.STRING },
    readinessLabel: { type: Type.STRING },
    promptCoverage: { type: Type.STRING },
    strongestEvidence: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    revisionPriorities: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          priority: { type: Type.STRING },
          why: { type: Type.STRING },
          how: { type: Type.STRING },
        },
        required: ["priority", "why", "how"],
      },
    },
    rubric: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          criterion: { type: Type.STRING },
          rating: { type: Type.NUMBER },
          evidence: { type: Type.STRING },
          nextStep: { type: Type.STRING },
        },
        required: ["criterion", "rating", "evidence", "nextStep"],
      },
    },
    authenticityCautions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    limitations: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
  },
  required: [
    "overallAssessment",
    "readinessLabel",
    "promptCoverage",
    "strongestEvidence",
    "revisionPriorities",
    "rubric",
    "authenticityCautions",
    "limitations",
  ],
};

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Feedback is temporarily unavailable because GEMINI_API_KEY is not configured." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const response = typeof body?.response === "string" ? body.response.trim() : "";
    const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
    const program = typeof body?.program === "string" ? body.program.trim() : "";
    const university = typeof body?.university === "string" ? body.university.trim() : "";
    const mode = body?.mode === "video" ? "video transcript" : "written response";
    const context = typeof body?.context === "string" ? body.context.trim() : "";

    if (!response) {
      return NextResponse.json({ error: "Enter a response before requesting feedback." }, { status: 400 });
    }
    if (response.length > 12000 || prompt.length > 4000 || context.length > 5000) {
      return NextResponse.json({ error: "The submitted material is too long for this review." }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const reviewRequest = `
UNIVERSITY: ${university || "Not supplied"}
PROGRAM: ${program || "Not supplied"}
FORMAT: ${mode}
VERIFIED CONTEXT:
${context || "No program-specific public rubric was supplied."}

EXACT OR PRACTICE PROMPT:
${prompt || "The student did not paste the exact prompt."}

STUDENT RESPONSE:
${response}

Evaluate these core dimensions:
1. Prompt coverage and directness
2. Specificity and credibility of evidence
3. Individual contribution and decision-making
4. Outcomes or observable impact
5. Reflection, self-awareness, and growth
6. Structure, clarity, and concision
7. Program-relevant qualities supported by the verified context
8. Authenticity and natural voice
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: "user", parts: [{ text: REVIEW_INSTRUCTIONS }] },
        { role: "user", parts: [{ text: reviewRequest }] },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema,
        temperature: 0.2,
      },
    });

    const text = result.text?.trim();
    if (!text) throw new Error("The reviewer returned an empty response.");
    const feedback = JSON.parse(text);
    return NextResponse.json({ feedback });
  } catch (error: unknown) {
    console.error("=== UNIPATH APPLICATION FEEDBACK ERROR ===", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to generate feedback." },
      { status: 500 }
    );
  }
}

