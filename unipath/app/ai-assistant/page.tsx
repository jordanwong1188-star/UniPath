"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Send,
  User,
} from "lucide-react";
import schools from "@/data/canadianSchools.json";

type Message = {
  role: "user" | "assistant";
  text: string;
};

function generateResponse(question: string) {
  const q = question.toLowerCase();

  if (
    q.includes("university") &&
    (q.includes("best") || q.includes("good"))
  ) {
    return "There isn't one best university for everyone. The right choice depends on your program, location, admission requirements, cost, and personal priorities. Try searching UniPath's university directory to compare your options.";
  }

  if (
    q.includes("business") ||
    q.includes("commerce") ||
    q.includes("marketing")
  ) {
    return "Business is offered at many Canadian universities. Some major areas include finance, accounting, marketing, management, economics, and entrepreneurship. Start by exploring the universities directory and then check each school's official program information.";
  }

  if (
    q.includes("computer science") ||
    q.includes("cs") ||
    q.includes("computer")
  ) {
    return "Computer Science programs are available at many Canadian universities. When comparing them, look at admission requirements, co-op opportunities, curriculum, location, tuition, and career opportunities.";
  }

  if (
    q.includes("engineering") ||
    q.includes("engineer")
  ) {
    return "Engineering programs vary considerably between universities. Compare the engineering disciplines offered, admission requirements, co-op options, tuition, and location before deciding.";
  }

  if (
    q.includes("deadline") ||
    q.includes("application date") ||
    q.includes("when should i apply")
  ) {
    return "Application deadlines vary by university and program. UniPath's deadline section is being built, but you should always verify the current deadline directly on the university's official admissions website.";
  }

  if (
    q.includes("how many") &&
    (q.includes("school") || q.includes("university"))
  ) {
    return `UniPath currently has ${schools.length} Canadian schools in its directory. You can browse them all through the Universities page.`;
  }

  const matchingSchools = schools.filter(
    (school) =>
      school.name.toLowerCase().includes(q) ||
      school.shortName.toLowerCase().includes(q) ||
      school.city.toLowerCase().includes(q)
  );

  if (matchingSchools.length > 0) {
    const names = matchingSchools
      .slice(0, 5)
      .map((school) => school.name)
      .join(", ");

    return `I found these schools matching your question: ${names}. You can open their individual UniPath profiles from the Universities page.`;
  }

  if (
    q.includes("ubc") ||
    q.includes("sfu") ||
    q.includes("waterloo") ||
    q.includes("toronto") ||
    q.includes("mcmaster")
  ) {
    return "I can help you research that university. Try asking about its programs, location, admission requirements, application deadlines, or how it compares with another school.";
  }

  return "I can help you explore Canadian universities, programs, admissions, application deadlines, and school comparisons. Try asking something like “What should I look for when choosing a university?” or “What Canadian universities offer business?”";
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi! I'm the UniPath Assistant. Ask me about Canadian universities, programs, applications, or choosing a school.",
    },
  ]);

  const [input, setInput] = useState("");

  function sendMessage() {
    const question = input.trim();

    if (!question) return;

    const answer = generateResponse(question);

    setMessages((current) => [
      ...current,
      {
        role: "user",
        text: question,
      },
      {
        role: "assistant",
        text: answer,
      },
    ]);

    setInput("");
  }

  return (
    <main className="min-h-screen bg-[#f5f7f8] text-[#172126]">

      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">

          <Link href="/" className="text-2xl font-bold">
            UniPath
          </Link>

          <Link
            href="/universities"
            className="text-sm font-semibold"
          >
            Universities
          </Link>

        </div>
      </header>


      <section className="mx-auto flex max-w-4xl flex-col px-6 py-12">

        <div className="mb-8">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#172126] text-white">
            <Bot className="h-6 w-6" />
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            UniPath Assistant
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Questions about university?
          </h1>

          <p className="mt-4 max-w-2xl text-gray-500">
            Get quick guidance while researching Canadian universities
            and planning your applications.
          </p>

        </div>


        <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">

          <div className="min-h-[420px] space-y-5 p-6 sm:p-8">

            {messages.map((message, index) => (

              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                {message.role === "assistant" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#172126] text-white">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.role === "user"
                      ? "bg-[#172126] text-white"
                      : "bg-[#f1f4f4] text-gray-700"
                  }`}
                >
                  {message.text}
                </div>

                {message.role === "user" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200">
                    <User className="h-4 w-4" />
                  </div>
                )}

              </div>

            ))}

          </div>


          <div className="border-t border-black/5 p-4">

            <div className="flex items-center gap-3 rounded-xl border border-black/10 px-4">

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                placeholder="Ask about universities, programs, or admissions..."
                className="min-w-0 flex-1 bg-transparent py-4 text-sm outline-none"
              />

              <button
                onClick={sendMessage}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#172126] text-white transition hover:bg-[#29383e]"
              >
                <Send className="h-4 w-4" />
              </button>

            </div>

          </div>

        </div>


        <Link
          href="/universities"
          className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold"
        >
          Browse universities
          <ArrowRight className="h-4 w-4" />
        </Link>

      </section>

    </main>
  );
}