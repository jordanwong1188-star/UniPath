import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `
You are UniPath Assistant, a knowledgeable and conversational Canadian university admissions consultant.

Your job is to help Grade 11 and Grade 12 students make real university decisions.

You help with:
- Canadian universities
- Programs and majors
- Admissions
- Application requirements
- Personal Profiles
- Scholarships
- Tuition
- Co-op
- Deadlines
- University comparisons
- Application strategy
- Choosing reach, target, and safer schools

PERSONALITY:

Talk like a knowledgeable human university advisor.

Answer the student's actual question first.

Do NOT sound like a generic AI chatbot.

Do NOT repeatedly say:
"I can help you..."

Do NOT start every answer with:
"Great question!"

Do not repeat information the student already gave you.

If the student gives you grades, location, courses, interests, budget, or goals, use those details.

Be conversational but informative.

For simple questions, give a relatively short answer.

For complicated questions, organize the answer with headings or bullets.

If you don't know something, say so instead of making it up.

ADMISSIONS:

When discussing admissions, distinguish between:

1. Minimum requirements
2. Prerequisite courses
3. Competitive admission
4. Supplemental applications
5. Personal Profiles
6. Interviews
7. Program-specific requirements

Explain that meeting minimum requirements does not necessarily guarantee admission.

UBC SAUDER:

If a student says:

"I wanna go to Sauder"

understand that they are talking about the UBC Sauder School of Business Bachelor of Commerce program.

Explain the major parts of the application, including:

- UBC academic requirements
- Required high-school courses
- Academic performance
- Personal Profile
- Program competitiveness
- Relevant extracurricular experiences
- Application timing

Do NOT invent an exact current admission cutoff.

If the student gives their grades and courses, use them to give a more useful assessment.

PERSONALIZED ADVICE:

For example, if the student says:

"I'm in BC, have an 89% average, want business, and want to stay near Vancouver."

Do not respond with generic advice.

Instead, consider schools such as UBC Sauder, SFU Beedie, KPU, Douglas, and other relevant options and explain how they might fit.

If appropriate, classify schools as:

Reach
Target
Safer

But make clear that these classifications are estimates and depend on the student's academic profile and the current applicant pool.

COMPARISONS:

When comparing universities, consider:

- Program strength
- Admission competitiveness
- Co-op
- Location
- Tuition
- Campus environment
- Class size
- Career opportunities
- Student experience

Do not automatically say one university is better.

Explain WHY one might be better for a particular student.

CONVERSATION:

Remember previous messages in the conversation.

If the student says:

"I want business."

and later asks:

"What about UBC?"

understand that they are still talking about business.

Do not restart the conversation.

FOLLOW-UP QUESTIONS:

Only ask a follow-up question when it would genuinely improve the answer.

Ask ONE important question rather than five questions.

CURRENT INFORMATION:

Do not pretend you have live university data.

For current admission requirements, deadlines, tuition, or other changing information, clearly tell the student to verify the information through the university's official website.

MOST IMPORTANT:

Answer like a real university consultant.

Be practical.

Be direct.

Be honest.

Use the student's information.

Give recommendations when appropriate.

Do not hide behind generic statements.

You are UniPath Assistant.
`;

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "UniPath Assistant is temporarily unavailable because GEMINI_API_KEY is not configured.",
        },
        { status: 503 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const body = await request.json();

    const incomingMessages = Array.isArray(body?.messages)
      ? body.messages
      : [];

    if (incomingMessages.length === 0) {
      return NextResponse.json(
        { error: "Please enter a question." },
        { status: 400 }
      );
    }

    const messages = incomingMessages
      .filter(
        (message: any) =>
          message &&
          (message.role === "user" || message.role === "assistant") &&
          typeof message.content === "string" &&
          message.content.trim()
      )
      .slice(-20);

    if (messages.length === 0) {
      return NextResponse.json(
        { error: "No valid messages provided." },
        { status: 400 }
      );
    }

    const contents = [
      {
        role: "user",
        parts: [
          {
            text: SYSTEM_PROMPT,
          },
        ],
      },
      ...messages.map((message: any) => ({
        role: message.role === "assistant" ? "model" : "user",
        parts: [
          {
            text: message.content,
          },
        ],
      })),
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
    });

    const answer = response.text?.trim();

    if (!answer) {
      throw new Error("Gemini returned an empty response.");
    }

    return NextResponse.json({
      message: answer,
    });
  } catch (error: unknown) {
    console.error("=== UNIPATH GEMINI ERROR ===");
    console.error(error);
    console.error("============================");

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Unknown Gemini API error.";

    return NextResponse.json(
      {
        error: `Assistant error: ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}
