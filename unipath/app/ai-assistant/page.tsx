"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Send,
  User,
  Sparkles,
  Trash2,
  GraduationCap,
  BookOpen,
  CalendarDays,
} from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const starterQuestions = [
  {
    icon: GraduationCap,
    text: "I want to study business at UBC. What should I know?",
  },
  {
    icon: BookOpen,
    text: "What Canadian universities are strong for computer science?",
  },
  {
    icon: CalendarDays,
    text: "When should I start applying to university?",
  },
  {
    icon: Sparkles,
    text: "I'm not sure what university is right for me. Can you help?",
  },
];

const initialMessage: Message = {
  role: "assistant",
  content:
    "Hey! I'm the UniPath Assistant. Tell me what you're trying to figure out and I'll help you work through it. You can ask me about universities, programs, admissions, requirements, deadlines, costs, co-op, or comparing schools.",
};

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  function clearConversation() {
    setMessages([initialMessage]);
    setInput("");
  }

  async function sendMessage(messageOverride?: string) {
    const question = (messageOverride ?? input).trim();

    if (!question || loading) return;

    const userMessage: Message = {
      role: "user",
      content: question,
    };

    const conversation = [...messages, userMessage];

    setMessages(conversation);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: conversation,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Something went wrong.");
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.message,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "I couldn't connect to the assistant right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage();
  }

  return (
    <main className="min-h-screen bg-[#f5f7f8] text-[#172126]">
      <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f5f7f8]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#172126] text-white">
              <span className="text-lg font-bold">U</span>
            </div>

            <div>
              <div className="text-xl font-bold tracking-tight">
                UniPath
              </div>

              <div className="hidden text-[10px] uppercase tracking-[0.18em] text-gray-500 sm:block">
                Your university journey
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            <Link
              href="/universities"
              className="text-sm font-medium text-gray-600 transition hover:text-black"
            >
              Universities
            </Link>

            <Link
              href="/programs"
              className="text-sm font-medium text-gray-600 transition hover:text-black"
            >
              Programs
            </Link>

            <Link
              href="/deadlines"
              className="text-sm font-medium text-gray-600 transition hover:text-black"
            >
              Deadlines
            </Link>

            <Link
              href="/ai-assistant"
              className="rounded-full bg-[#172126] px-4 py-2 text-sm font-semibold text-white"
            >
              Assistant
            </Link>
          </nav>

          <Link
            href="/universities"
            className="hidden rounded-full bg-[#172126] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#29383e] sm:block"
          >
            Explore schools
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-48 -top-48 h-[600px] w-[600px] rounded-full bg-[#dfe8e8] blur-3xl" />
        <div className="pointer-events-none absolute -left-48 top-[500px] h-[500px] w-[500px] rounded-full bg-[#e9e3d8] blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-12 lg:px-10 lg:py-16">
          <div className="mb-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#172126] text-white shadow-lg">
              <Bot className="h-7 w-7" />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              UniPath Assistant
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Your university questions,
              <span className="block text-[#65777c]">
                answered properly.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-500">
              Ask questions the way you would ask a university advisor.
              You don't need to know the terminology or phrase your question
              perfectly.
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_25px_80px_rgba(23,33,38,0.10)]">
              <div className="flex items-center justify-between border-b border-black/5 px-5 py-4 sm:px-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#172126] text-white">
                    <Bot className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      UniPath Advisor
                    </p>

                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Ready to help
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={clearConversation}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">
                    New conversation
                  </span>
                </button>
              </div>

              <div className="min-h-[480px] max-h-[620px] overflow-y-auto px-5 py-7 sm:px-8">
                <div className="space-y-7">
                  {messages.map((message, index) => {
                    const isUser = message.role === "user";

                    return (
                      <div
                        key={`${message.role}-${index}`}
                        className={`flex gap-3 ${
                          isUser ? "justify-end" : "justify-start"
                        }`}
                      >
                        {!isUser && (
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#172126] text-white">
                            <Bot className="h-4 w-4" />
                          </div>
                        )}

                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3.5 text-sm leading-7 ${
                            isUser
                              ? "rounded-br-md bg-[#172126] text-white"
                              : "rounded-bl-md bg-[#f1f4f4] text-[#344247]"
                          }`}
                        >
                          <div className="whitespace-pre-wrap">
                            {message.content}
                          </div>
                        </div>

                        {isUser && (
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e3e7e8] text-[#536267]">
                            <User className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {loading && (
                    <div className="flex gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#172126] text-white">
                        <Bot className="h-4 w-4" />
                      </div>

                      <div className="rounded-2xl rounded-bl-md bg-[#f1f4f4] px-5 py-4">
                        <div className="flex gap-1.5">
                          <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>

              {messages.length === 1 && !loading && (
                <div className="border-t border-black/5 bg-[#fafbfb] px-5 py-5 sm:px-7">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
                    Try asking
                  </p>

                  <div className="grid gap-2 sm:grid-cols-2">
                    {starterQuestions.map((question) => {
                      const Icon = question.icon;

                      return (
                        <button
                          key={question.text}
                          type="button"
                          onClick={() => sendMessage(question.text)}
                          className="group flex items-start gap-3 rounded-xl border border-black/5 bg-white p-3 text-left transition hover:-translate-y-0.5 hover:border-black/10 hover:shadow-sm"
                        >
                          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#edf1f1] text-[#42545a]">
                            <Icon className="h-4 w-4" />
                          </div>

                          <span className="text-xs leading-5 text-gray-600 group-hover:text-gray-900">
                            {question.text}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="border-t border-black/5 bg-white p-4 sm:p-5">
                <form onSubmit={handleSubmit}>
                  <div className="flex items-end gap-3 rounded-2xl border border-black/10 bg-[#fafbfb] p-2 pl-4 transition focus-within:border-black/20 focus-within:bg-white focus-within:shadow-sm">
                    <textarea
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                      onKeyDown={(event) => {
                        if (
                          event.key === "Enter" &&
                          !event.shiftKey
                        ) {
                          event.preventDefault();
                          sendMessage();
                        }
                      }}
                      rows={1}
                      placeholder="Ask anything about university..."
                      className="max-h-32 min-h-11 flex-1 resize-none bg-transparent py-3 text-sm outline-none placeholder:text-gray-400"
                    />

                    <button
                      type="submit"
                      disabled={!input.trim() || loading}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#172126] text-white transition hover:bg-[#29383e] disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="mt-2 text-center text-[11px] text-gray-400">
                    UniPath provides guidance, but always verify admissions
                    details with the university.
                  </p>
                </form>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-400">
              <span>Universities</span>
              <span>•</span>
              <span>Programs</span>
              <span>•</span>
              <span>Admissions</span>
              <span>•</span>
              <span>Deadlines</span>
              <span>•</span>
              <span>Costs</span>
              <span>•</span>
              <span>Comparisons</span>
            </div>

            <Link
              href="/universities"
              className="mx-auto mt-8 flex w-fit items-center gap-2 text-sm font-semibold text-[#172126] transition hover:gap-3"
            >
              Browse universities
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
