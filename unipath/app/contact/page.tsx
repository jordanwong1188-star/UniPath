cat > app/ai-assistant/page.tsx <<'EOF'
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Send,
  User,
  Sparkles,
  BookOpen,
  GraduationCap,
  CalendarDays,
} from "lucide-react";

import schools from "@/data/canadianSchools.json";

type School = {
  id: string;
  shortName: string;
  name: string;
  province: string;
  city: string;
  type: string;
  domain: string;
};

type Message = {
  role: "user" | "assistant";
  text: string;
  links?: {
    label: string;
    href: string;
  }[];
};

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[?!.,]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function findSchool(question: string): School | null {
  const q = normalize(question);

  const aliases: Record<string, string[]> = {
    ubc: [
      "ubc",
      "university of british columbia",
      "british columbia university",
      "sauder",
      "sauder school of business",
      "ubc sauder",
    ],
    sfu: [
      "sfu",
      "simon fraser",
      "simon fraser university",
      "beedie",
      "beedie school of business",
    ],
    uoft: [
      "uoft",
      "u of t",
      "university of toronto",
      "toronto university",
      "rotman",
      "rotman commerce",
    ],
    waterloo: [
      "waterloo",
      "university of waterloo",
    ],
    mcmaster: [
      "mcmaster",
      "mac",
      "mcmaster university",
    ],
    queens: [
      "queens",
      "queen's",
      "queens university",
      "smith",
      "smith school of business",
    ],
    alberta: [
      "uofa",
      "u of a",
      "university of alberta",
      "alberta",
    ],
    calgary: [
      "ucalgary",
      "u of c",
      "university of calgary",
      "calgary",
    ],
  };

  for (const school of schools as School[]) {
    const terms = [
      school.id,
      school.shortName,
      school.name,
      school.city,
    ].map(normalize);

    for (const term of terms) {
      if (term && q.includes(term)) {
        return school;
      }
    }
  }

  for (const [schoolId, terms] of Object.entries(aliases)) {
    if (terms.some((term) => q.includes(term))) {
      const school = (schools as School[]).find(
        (s) => normalize(s.id) === normalize(schoolId)
      );

      if (school) return school;
    }
  }

  return null;
}

function detectIntent(question: string) {
  const q = normalize(question);

  if (
    q.includes("need") ||
    q.includes("requirements") ||
    q.includes("requirement") ||
    q.includes("accepted") ||
    q.includes("admission") ||
    q.includes("admitted") ||
    q.includes("grades") ||
    q.includes("average") ||
    q.includes("prerequisite") ||
    q.includes("prerequisites") ||
    q.includes("get in")
  ) {
    return "requirements";
  }

  if (
    q.includes("deadline") ||
    q.includes("deadlines") ||
    q.includes("when do i apply") ||
    q.includes("when should i apply") ||
    q.includes("last day") ||
    q.includes("application date")
  ) {
    return "deadlines";
  }

  if (
    q.includes("tuition") ||
    q.includes("cost") ||
    q.includes("expensive") ||
    q.includes("price") ||
    q.includes("fees")
  ) {
    return "cost";
  }

  if (
    q.includes("program") ||
    q.includes("study") ||
    q.includes("major") ||
    q.includes("degree") ||
    q.includes("what can i study")
  ) {
    return "programs";
  }

  if (
    q.includes("compare") ||
    q.includes("vs") ||
    q.includes("versus") ||
    q.includes("better") ||
    q.includes("difference")
  ) {
    return "comparison";
  }

  if (
    q.includes("business") ||
    q.includes("commerce") ||
    q.includes("marketing") ||
    q.includes("finance") ||
    q.includes("accounting") ||
    q.includes("management")
  ) {
    return "business";
  }

  if (
    q.includes("computer science") ||
    q.includes("computer") ||
    q.includes("software") ||
    q.includes("cs")
  ) {
    return "computer-science";
  }

  if (
    q.includes("engineering") ||
    q.includes("engineer")
  ) {
    return "engineering";
  }

  if (
    q.includes("best university") ||
    q.includes("best school") ||
    q.includes("which university") ||
    q.includes("which school") ||
    q.includes("where should i go")
  ) {
    return "recommendation";
  }

  return "general";
}

function generateResponse(question: string): Message {
  const q = normalize(question);
  const school = findSchool(question);
  const intent = detectIntent(question);

  /*
   * SAUDER / UBC
   */

  if (
    (q.includes("sauder") || q.includes("ubc")) &&
    intent === "requirements"
  ) {
    return {
      role: "assistant",
      text:
        "If you're aiming for UBC Sauder's BCom, there are a few different pieces you should think about rather than just your average. UBC looks at your academic record and required Grade 12 courses, but Sauder also has the personal profile component as part of the application. Your grades matter, but the profile is an important opportunity to show leadership, initiative, experiences, and what you've actually done outside the classroom.\n\nIf you're applying from BC, I'd pay particular attention to your English, Pre-Calculus, and other required courses, then make sure you're prepared for the personal profile well before the application deadline.\n\nIf you tell me your current Grade 11/12 marks and what courses you're taking, I can help you figure out how competitive your application looks and what I'd prioritize improving.",
      links: [
        {
          label: "Open UBC profile",
          href: "/unis/ubc",
        },
        {
          label: "Explore universities",
          href: "/universities",
        },
      ],
    };
  }

  if (
    (q.includes("sauder") || q.includes("ubc")) &&
    intent === "business"
  ) {
    return {
      role: "assistant",
      text:
        "If you're specifically interested in business, UBC Sauder is the UBC option I'd be looking at. The BCom gives you a broad business foundation and then lets you develop areas such as finance, marketing, accounting, operations, and entrepreneurship.\n\nIf you're deciding whether Sauder is actually a good fit for you, I'd compare three things: how competitive the admission process is, whether you like Vancouver/UBC's environment, and what kind of business career you're aiming for. If you tell me what area of business interests you most, I can help you compare Sauder with schools like SFU Beedie, U of T Rotman, or other Canadian options.",
      links: [
        {
          label: "Open UBC profile",
          href: "/unis/ubc",
        },
        {
          label: "Compare universities",
          href: "/universities",
        },
      ],
    };
  }

  /*
   * SCHOOL + DEADLINE
   */

  if (school && intent === "deadlines") {
    return {
      role: "assistant",
      text:
        `For ${school.name}, I would not rely on a generic date because deadlines can differ by applicant type and program. The safest approach is to verify the current deadline through the university's official admissions site.\n\nI can still help you organize what to look for: application opening date, early/priority deadlines if applicable, final application deadline, document deadlines, and any supplemental application deadlines.`,
      links: [
        {
          label: `Open ${school.shortName} profile`,
          href: `/unis/${school.id}`,
        },
        {
          label: "View deadlines",
          href: "/deadlines",
        },
      ],
    };
  }

  /*
   * SCHOOL + PROGRAMS
   */

  if (school && intent === "programs") {
    return {
      role: "assistant",
      text:
        `${school.name} is located in ${school.city}, ${school.province}. If you're deciding what to study there, I'd narrow it down based on the career or subject you're interested in rather than just choosing a university first.\n\nTell me what you want to study — for example business, engineering, computer science, psychology, economics, or something else — and I can help you think through which programs make the most sense.`,
      links: [
        {
          label: `Open ${school.shortName} profile`,
          href: `/unis/${school.id}`,
        },
        {
          label: "Explore programs",
          href: "/programs",
        },
      ],
    };
  }

  /*
   * SCHOOL + COST
   */

  if (school && intent === "cost") {
    return {
      role: "assistant",
      text:
        `${school.shortName}'s total cost depends heavily on your program, whether you're a domestic or international student, and your living situation. I wouldn't compare universities based on tuition alone.\n\nWhen you're comparing costs, look at tuition, student fees, housing, transportation, food, textbooks, and whether the program has co-op or other paid work opportunities.\n\nIf you tell me whether you're a domestic BC student or coming from elsewhere, I can help you build a more realistic university budget.`,
      links: [
        {
          label: `Open ${school.shortName} profile`,
          href: `/unis/${school.id}`,
        },
      ],
    };
  }

  /*
   * BUSINESS
   */

  if (intent === "business") {
    return {
      role: "assistant",
      text:
        "If you're looking at business, don't choose a school purely from a ranking. I'd compare the program itself, admission competitiveness, co-op/internship opportunities, location, tuition, class size, and the areas of business you can specialize in.\n\nFor example, someone interested in finance might prioritize different things than someone interested in entrepreneurship or marketing.\n\nIf you give me your approximate grades and the type of business you want to study, I can help you build a shortlist instead of just giving you a generic list of 'best' schools.",
      links: [
        {
          label: "Explore business programs",
          href: "/programs",
        },
        {
          label: "Browse universities",
          href: "/universities",
        },
      ],
    };
  }

  /*
   * COMPUTER SCIENCE
   */

  if (intent === "computer-science") {
    return {
      role: "assistant",
      text:
        "For computer science, I'd look beyond the university's overall reputation. The things I'd compare are admission competitiveness, co-op, internship access, course structure, class size, location, and the kinds of technical areas you can pursue.\n\nIf you're choosing between a few schools, send me the names and your approximate grades. I can help you think through the trade-offs rather than simply telling you which one is 'better.'",
      links: [
        {
          label: "Explore programs",
          href: "/programs",
        },
        {
          label: "Browse universities",
          href: "/universities",
        },
      ],
    };
  }

  /*
   * ENGINEERING
   */

  if (intent === "engineering") {
    return {
      role: "assistant",
      text:
        "Engineering admissions can be quite different from general university admission, so I'd look at the exact engineering faculty rather than just the university's overall admission average.\n\nI'd compare prerequisites, competitive averages, whether you're admitted directly to a discipline or into a common first year, co-op opportunities, and the type of engineering you actually want to pursue.\n\nIf you tell me the schools you're considering and your current math/physics grades, I can help you narrow them down.",
      links: [
        {
          label: "Explore universities",
          href: "/universities",
        },
        {
          label: "Explore programs",
          href: "/programs",
        },
      ],
    };
  }

  /*
   * COMPARISON
   */

  if (intent === "comparison") {
    return {
      role: "assistant",
      text:
        "I can help with a comparison, but I need the schools you're deciding between. Send me something like 'UBC Sauder vs SFU Beedie' and I'll break down the important differences — admissions, program, co-op, location, cost, and career opportunities — instead of just picking one based on reputation.",
      links: [
        {
          label: "Browse universities",
          href: "/universities",
        },
      ],
    };
  }

  /*
   * RECOMMENDATION
   */

  if (intent === "recommendation") {
    return {
      role: "assistant",
      text:
        "There isn't one Canadian university that's automatically best for everyone. I'd make the decision based on your program, grades, location, budget, career goals, and how competitive you want your application list to be.\n\nA good strategy is to build three groups: a few ambitious choices, several realistic targets, and at least one or two safer options.\n\nIf you tell me your grades, intended program, and whether you want to stay in BC, I can help you build that list.",
      links: [
        {
          label: "Browse universities",
          href: "/universities",
        },
        {
          label: "Explore programs",
          href: "/programs",
        },
      ],
    };
  }

  /*
   * SCHOOL IDENTIFIED
   */

  if (school) {
    return {
      role: "assistant",
      text:
        `You're asking about ${school.name}. It's a ${school.type} in ${school.city}, ${school.province}.\n\nI can help you look at it from a few different angles: admission requirements, programs, deadlines, cost, or how it compares with another university.\n\nWhat are you most interested in?`,
      links: [
        {
          label: `Open ${school.shortName} profile`,
          href: `/unis/${school.id}`,
        },
      ],
    };
  }

  /*
   * GENERAL QUESTIONS
   */

  if (
    q.includes("how do i choose") ||
    q.includes("how should i choose") ||
    q.includes("choosing a university")
  ) {
    return {
      role: "assistant",
      text:
        "I'd start with the program, not the university name. Your program affects admission requirements, career opportunities, co-op options, and often the cost.\n\nThen I'd compare location, admission competitiveness, tuition/living costs, campus environment, and opportunities such as co-op or internships.\n\nOne thing I wouldn't do is build your entire list around rankings. A university that's ranked higher overall isn't necessarily the better choice for your specific program or situation.\n\nIf you tell me what you want to study and your approximate grades, I can help you narrow down some actual schools.",
      links: [
        {
          label: "Explore universities",
          href: "/universities",
        },
      ],
    };
  }

  /*
   * NUMBER OF SCHOOLS
   */

  if (
    q.includes("how many") &&
    (q.includes("school") || q.includes("university"))
  ) {
    return {
      role: "assistant",
      text:
        `UniPath currently has ${(schools as School[]).length} schools in its directory. The database is being expanded, so the number will change as more Canadian institutions and program information are added.`,
      links: [
        {
          label: "Browse all schools",
          href: "/universities",
        },
      ],
    };
  }

  /*
   * FINAL FALLBACK
   */

  return {
    role: "assistant",
    text:
      "I can help with that, but I want to give you a useful answer rather than make something up. Tell me the university, program, or decision you're dealing with and I'll help you work through it.\n\nFor example:\n\n• 'I want to go to Sauder — what do I need?'\n• 'UBC Sauder vs SFU Beedie?'\n• 'What Canadian business schools should I apply to with an 88% average?'\n• 'When should I apply to UBC?'\n• 'Is Waterloo good for computer science?'",
    links: [
      {
        label: "Browse universities",
        href: "/universities",
      },
      {
        label: "Explore programs",
        href: "/programs",
      },
    ],
  };
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text:
        "Hey! I'm the UniPath Assistant. Think of me as a university planning advisor — ask me about schools, programs, admissions, deadlines, or compare options you're considering.",
    },
  ]);

  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const suggestions = useMemo(
    () => [
      "I want to go to Sauder — what do I need?",
      "UBC Sauder vs SFU Beedie?",
      "What should I look for when choosing a university?",
      "What Canadian universities are good for business?",
    ],
    []
  );

  function sendMessage(textOverride?: string) {
    const question = (textOverride ?? input).trim();

    if (!question || isThinking) return;

    setIsThinking(true);

    setMessages((current) => [
      ...current,
      {
        role: "user",
        text: question,
      },
    ]);

    setInput("");

    setTimeout(() => {
      const response = generateResponse(question);

      setMessages((current) => [...current, response]);

      setIsThinking(false);
    }, 350);
  }

  return (
    <main className="min-h-screen bg-[#f5f7f8] text-[#172126]">

      <header className="border-b border-black/5 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">

          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#172126] text-sm font-bold text-white">
              U
            </div>

            <span className="text-xl font-bold tracking-tight">
              UniPath
            </span>
          </Link>

          <Link
            href="/universities"
            className="text-sm font-semibold text-gray-600 transition hover:text-black"
          >
            Universities
          </Link>

        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-12 lg:py-16">

        <div className="mb-8">

          <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            UniPath Assistant
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            Let's figure out your university plan.
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-500">
            Ask me a specific question and I'll help you work through it —
            whether you're choosing a school, figuring out admission
            requirements, or comparing programs.
          </p>

        </div>

        <div className="mb-6 flex flex-wrap gap-2">

          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => sendMessage(suggestion)}
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-left text-xs font-medium text-gray-600 transition hover:border-black/20 hover:bg-gray-50"
            >
              {suggestion}
            </button>
          ))}

        </div>

        <div className="overflow-hidden rounded-[1.75rem] border border-black/10 bg-white shadow-[0_25px_70px_rgba(23,33,38,0.08)]">

          <div className="min-h-[500px] space-y-6 p-6 sm:p-8">

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
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#172126] text-white">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div className="max-w-[85%]">

                  <div
                    className={`rounded-2xl px-5 py-4 text-sm leading-7 ${
                      message.role === "user"
                        ? "bg-[#172126] text-white"
                        : "bg-[#f1f4f4] text-gray-700"
                    }`}
                  >
                    {message.text.split("\n").map((line, i) => (
                      <p key={i} className={i > 0 ? "mt-2" : ""}>
                        {line}
                      </p>
                    ))}
                  </div>

                  {message.role === "assistant" &&
                    message.links &&
                    message.links.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">

                        {message.links.map((link) => (
                          <Link
                            key={link.href + link.label}
                            href={link.href}
                            className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-[#172126] transition hover:bg-gray-50"
                          >
                            {link.label}
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        ))}

                      </div>
                    )}

                </div>

                {message.role === "user" && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-200">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                )}

              </div>

            ))}

            {isThinking && (
              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#172126] text-white">
                  <Bot className="h-4 w-4" />
                </div>

                <div className="rounded-2xl bg-[#f1f4f4] px-5 py-4 text-sm text-gray-500">
                  Thinking through that...
                </div>

              </div>
            )}

          </div>

          <div className="border-t border-black/5 bg-gray-50/70 p-4">

            <div className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 shadow-sm">

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                placeholder="Ask me anything about your university options..."
                className="min-w-0 flex-1 bg-transparent py-4 text-sm outline-none placeholder:text-gray-400"
              />

              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isThinking}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#172126] text-white transition hover:bg-[#29383e] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>

            </div>

          </div>

        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">

          <div className="rounded-2xl border border-black/5 bg-white p-5">
            <GraduationCap className="h-5 w-5 text-gray-500" />
            <p className="mt-4 text-sm font-semibold">
              Admissions
            </p>
            <p className="mt-1 text-xs leading-5 text-gray-500">
              Understand requirements and competitiveness.
            </p>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white p-5">
            <BookOpen className="h-5 w-5 text-gray-500" />
            <p className="mt-4 text-sm font-semibold">
              Programs
            </p>
            <p className="mt-1 text-xs leading-5 text-gray-500">
              Find programs that fit your interests.
            </p>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white p-5">
            <CalendarDays className="h-5 w-5 text-gray-500" />
            <p className="mt-4 text-sm font-semibold">
              Planning
            </p>
            <p className="mt-1 text-xs leading-5 text-gray-500">
              Organize applications and important dates.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}
EOF