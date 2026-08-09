cat > app/ai-assistant/page.tsx <<'EOF'
"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CalendarDays,
  ChevronRight,
  GraduationCap,
  MapPin,
  RotateCcw,
  Search,
  Send,
  Sparkles,
  User,
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
  id: number;
  role: "user" | "assistant";
  text: string;
  schools?: School[];
};

const typedSchools = schools as School[];

const quickQuestions = [
  {
    icon: GraduationCap,
    label: "Find universities",
    question: "Which Canadian universities should I consider?",
  },
  {
    icon: Sparkles,
    label: "Business",
    question: "What are some good Canadian universities for business?",
  },
  {
    icon: Search,
    label: "Compare schools",
    question: "Compare UBC and SFU.",
  },
  {
    icon: CalendarDays,
    label: "Applications",
    question: "When should I start applying to university?",
  },
];

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function findSchools(question: string) {
  const q = normalize(question);

  return typedSchools.filter((school) => {
    const name = normalize(school.name);
    const shortName = normalize(school.shortName);
    const city = normalize(school.city);
    const province = normalize(school.province);

    return (
      q.includes(name) ||
      q.includes(shortName) ||
      q.includes(city) ||
      q.includes(province)
    );
  });
}

function findSchoolByName(term: string) {
  const q = normalize(term);

  return typedSchools.find((school) => {
    const name = normalize(school.name);
    const shortName = normalize(school.shortName);

    return (
      q.includes(name) ||
      q.includes(shortName) ||
      name.includes(q) ||
      shortName.includes(q)
    );
  });
}

function schoolLink(school: School) {
  return `/unis/${school.id}`;
}

function generateResponse(question: string) {
  const q = normalize(question);
  const mentionedSchools = findSchools(question);

  const compareMatch =
    q.includes("compare") ||
    q.includes("versus") ||
    q.includes(" vs ") ||
    q.includes("better than");

  /*
   * UNIVERSITY COMPARISON
   */
  if (compareMatch) {
    const possibleSchools = typedSchools.filter((school) => {
      const name = normalize(school.name);
      const shortName = normalize(school.shortName);

      return (
        q.includes(name) ||
        q.includes(shortName)
      );
    });

    if (possibleSchools.length >= 2) {
      const first = possibleSchools[0];
      const second = possibleSchools[1];

      return {
        text:
          `Here’s a useful starting comparison between ${first.name} and ${second.name}.\n\n` +
          `${first.shortName} is located in ${first.city}, ${first.province}, while ${second.shortName} is located in ${second.city}, ${second.province}.\n\n` +
          `The better choice depends heavily on your program, admission profile, location preference, budget, campus environment, and whether factors such as co-op or internships matter to you.\n\n` +
          `I’d recommend comparing the specific program rather than choosing based only on the university's overall reputation.`,
        schools: [first, second],
      };
    }

    return {
      text:
        "I can compare Canadian universities, but I need to know which schools you want to compare. For example, try “Compare UBC and SFU” or “Compare Waterloo and UofT.”",
      schools: [],
    };
  }

  /*
   * SPECIFIC UNIVERSITY QUESTIONS
   */
  if (mentionedSchools.length > 0) {
    const school = mentionedSchools[0];

    if (
      q.includes("where") ||
      q.includes("location") ||
      q.includes("located") ||
      q.includes("city")
    ) {
      return {
        text:
          `${school.name} is located in ${school.city}, ${school.province}.\n\n` +
          `You can open its UniPath profile below to explore the information currently available for this school.`,
        schools: [school],
      };
    }

    if (
      q.includes("program") ||
      q.includes("major") ||
      q.includes("study") ||
      q.includes("degree")
    ) {
      return {
        text:
          `${school.name} offers a range of programs across different areas of study. The best next step is to open the school's UniPath profile and review the programs available there.\n\n` +
          `If you tell me what you want to study — such as business, engineering, computer science, psychology, or health sciences — I can also help you narrow down Canadian universities to research.`,
        schools: [school],
      };
    }

    if (
      q.includes("admission") ||
      q.includes("requirement") ||
      q.includes("accept") ||
      q.includes("grade")
    ) {
      return {
        text:
          `Admission requirements for ${school.name} depend on the specific program and applicant category. There isn't one universal admission requirement for the entire university.\n\n` +
          `When researching your application, check the exact program requirements, prerequisite courses, grade expectations, and application deadlines. UniPath can help you organize that research, but official university admissions pages should be used to verify current requirements.`,
        schools: [school],
      };
    }

    if (
      q.includes("deadline") ||
      q.includes("apply") ||
      q.includes("application")
    ) {
      return {
        text:
          `Application dates for ${school.name} can vary by program and applicant type. I recommend checking the specific program rather than relying on one university-wide date.\n\n` +
          `UniPath's deadline tools are designed to help organize this information, while the university's official admissions website should be treated as the final source for current dates.`,
        schools: [school],
      };
    }

    return {
      text:
        `${school.name} is a ${school.type.toLowerCase()} located in ${school.city}, ${school.province}.\n\n` +
        `I can help you research its programs, admissions, deadlines, location, or compare it with another Canadian university.\n\n` +
        `What would you like to know about ${school.shortName}?`,
      schools: [school],
    };
  }

  /*
   * BUSINESS
   */
  if (
    q.includes("business") ||
    q.includes("commerce") ||
    q.includes("marketing") ||
    q.includes("finance") ||
    q.includes("accounting") ||
    q.includes("entrepreneur")
  ) {
    return {
      text:
        "If you're interested in business, don't choose a university based only on its overall ranking. Look at the specific business school, specialization options, co-op or internship opportunities, admission requirements, tuition, location, and career outcomes.\n\n" +
        "Some Canadian schools worth researching include UBC, Waterloo, Toronto, McMaster, Western, Queen's, SFU, Calgary, Alberta, and Laurier. Your ideal choice depends on your grades, preferred location, budget, and the type of business career you're considering.",
      schools: typedSchools.filter((school) =>
        [
          "ubc",
          "waterloo",
          "uoft",
          "mcmaster",
          "western",
          "queens",
          "sfu",
          "ucalgary",
          "uofa",
          "laurier",
        ].includes(school.id)
      ),
    };
  }

  /*
   * COMPUTER SCIENCE
   */
  if (
    q.includes("computer science") ||
    q.includes("software engineering") ||
    q.includes("computer") ||
    q.includes("programming")
  ) {
    return {
      text:
        "For computer science, I would compare the actual program rather than relying on a single ranking. Important factors include admission requirements, co-op, curriculum, class size, location, tuition, research opportunities, and the type of career you want after graduation.\n\n" +
        "Waterloo, Toronto, UBC, Alberta, SFU, McGill, and several other Canadian universities are worth researching.",
      schools: typedSchools.filter((school) =>
        [
          "waterloo",
          "uoft",
          "ubc",
          "uofa",
          "sfu",
          "mcgill",
        ].includes(school.id)
      ),
    };
  }

  /*
   * ENGINEERING
   */
  if (
    q.includes("engineering") ||
    q.includes("engineer")
  ) {
    return {
      text:
        "Engineering is especially important to compare at the program level because different universities have different strengths and admission structures.\n\n" +
        "When comparing engineering programs, look at the discipline you want, prerequisite courses, admission averages, co-op, professional accreditation, tuition, and internship opportunities.\n\n" +
        "UBC, Waterloo, Toronto, Alberta, McMaster, Calgary, and several other Canadian universities are worth researching.",
      schools: typedSchools.filter((school) =>
        [
          "ubc",
          "waterloo",
          "uoft",
          "uofa",
          "mcmaster",
          "ucalgary",
        ].includes(school.id)
      ),
    };
  }

  /*
   * DEADLINES
   */
  if (
    q.includes("deadline") ||
    q.includes("when should i apply") ||
    q.includes("when do i apply") ||
    q.includes("application date")
  ) {
    return {
      text:
        "University deadlines vary by school, program, applicant type, and sometimes the admission term.\n\n" +
        "A good strategy is to start researching in Grade 11, build your university list before Grade 12, and keep a separate deadline for each application rather than assuming every program has the same date.\n\n" +
        "Always verify the final deadline through the university's official admissions website.",
      schools: [],
    };
  }

  /*
   * HOW MANY SCHOOLS
   */
  if (
    q.includes("how many") &&
    (q.includes("school") || q.includes("university"))
  ) {
    return {
      text:
        `UniPath currently has ${typedSchools.length} Canadian schools in its directory.\n\n` +
        "You can browse the full directory and filter your options from the Universities page.",
      schools: [],
    };
  }

  /*
   * PROVINCE SEARCH
   */
  const provinceMatches = typedSchools.filter((school) =>
    q.includes(normalize(school.province))
  );

  if (provinceMatches.length > 0) {
    const province = provinceMatches[0].province;

    return {
      text:
        `There are ${provinceMatches.length} schools in the current UniPath directory for ${province}.\n\n` +
        "You can browse the schools below and open individual profiles to research them further.",
      schools: provinceMatches.slice(0, 8),
    };
  }

  /*
   * GENERAL UNIVERSITY QUESTION
   */
  if (
    q.includes("best university") ||
    q.includes("best school") ||
    q.includes("good university") ||
    q.includes("which university")
  ) {
    return {
      text:
        "There isn't one university that is objectively best for every student.\n\n" +
        "A better approach is to start with your intended program, then compare admission requirements, co-op opportunities, tuition, location, campus environment, and career opportunities.\n\n" +
        "If you tell me your intended program and your preferred province or city, I can help you build a much more targeted shortlist.",
      schools: [],
    };
  }

  /*
   * HELP
   */
  if (
    q.includes("help") ||
    q.includes("what can you do") ||
    q.includes("what do you do")
  ) {
    return {
      text:
        "I can help you research Canadian universities and make your search more organized.\n\n" +
        "Try asking me:\n\n" +
        "• Which universities should I consider for business?\n" +
        "• Compare UBC and SFU.\n" +
        "• What should I look for in a university?\n" +
        "• When should I start applying?\n" +
        "• What should I consider when choosing engineering?\n" +
        "• Where is McGill located?",
      schools: [],
    };
  }

  /*
   * FALLBACK
   */
  return {
    text:
      "I can help with Canadian universities, programs, admissions, deadlines, and comparing schools.\n\n" +
      "For example, try asking “Compare UBC and SFU,” “What universities should I consider for business?” or “When should I start applying to university?”",
    schools: [],
  };
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      text:
        "Hi! I'm the UniPath Assistant. I can help you research Canadian universities, programs, admissions, deadlines, and compare schools.\n\nWhat are you looking for?",
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const nextId = useRef(2);

  const suggestedQuestions = useMemo(
    () => quickQuestions,
    []
  );

  function sendMessage(questionOverride?: string) {
    const question = (questionOverride ?? input).trim();

    if (!question || isTyping) return;

    const result = generateResponse(question);

    const userMessage: Message = {
      id: nextId.current++,
      role: "user",
      text: question,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsTyping(true);

    window.setTimeout(() => {
      const assistantMessage: Message = {
        id: nextId.current++,
        role: "assistant",
        text: result.text,
        schools: result.schools,
      };

      setMessages((current) => [
        ...current,
        assistantMessage,
      ]);

      setIsTyping(false);
    }, 450);
  }

  function clearChat() {
    setMessages([
      {
        id: nextId.current++,
        role: "assistant",
        text:
          "Chat cleared. What would you like to research?",
      },
    ]);
    setInput("");
  }

  return (
    <main className="min-h-screen bg-[#f4f6f5] text-[#172126]">

      {/* HEADER */}

      <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-[#f4f6f5]/90 backdrop-blur-xl">

        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 lg:px-10">

          <Link
            href="/"
            className="flex items-center gap-3"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#172126] text-white">
              <span className="font-semibold">U</span>
            </div>

            <div>
              <div className="text-lg font-semibold tracking-tight">
                UniPath
              </div>

              <div className="hidden text-[9px] uppercase tracking-[0.18em] text-gray-500 sm:block">
                University guide
              </div>
            </div>

          </Link>

          <div className="flex items-center gap-5">

            <Link
              href="/universities"
              className="hidden text-sm font-medium text-gray-600 transition hover:text-[#172126] sm:block"
            >
              Universities
            </Link>

            <Link
              href="/programs"
              className="hidden text-sm font-medium text-gray-600 transition hover:text-[#172126] sm:block"
            >
              Programs
            </Link>

            <Link
              href="/deadlines"
              className="hidden text-sm font-medium text-gray-600 transition hover:text-[#172126] sm:block"
            >
              Deadlines
            </Link>

            <Link
              href="/"
              className="flex items-center gap-2 rounded-full bg-[#172126] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2a3b41]"
            >
              Home
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

          </div>

        </div>

      </header>


      {/* PAGE */}

      <section className="mx-auto max-w-6xl px-6 py-10 lg:px-10 lg:py-14">

        {/* TOP */}

        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.07] bg-white/70 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">

              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

              UniPath Assistant

            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">

              Your university questions,
              <span className="block text-[#68797d]">
                answered in one place.
              </span>

            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-gray-500">
              Research Canadian universities, compare your options,
              and get guidance while planning your application.
            </p>

          </div>

          <button
            onClick={clearChat}
            className="inline-flex items-center gap-2 self-start rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 md:self-auto"
          >
            <RotateCcw className="h-4 w-4" />
            New chat
          </button>

        </div>


        {/* CHAT */}

        <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-black/[0.07] bg-white shadow-[0_25px_80px_rgba(23,33,38,0.07)]">

          {/* CHAT HEADER */}

          <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-4 sm:px-7">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#172126] text-white">
                <Bot className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  UniPath Assistant
                </p>

                <div className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Ready to help
                </div>
              </div>

            </div>

            <div className="hidden text-xs text-gray-400 sm:block">
              Canadian university guidance
            </div>

          </div>


          {/* MESSAGES */}

          <div className="min-h-[460px] space-y-7 overflow-y-auto p-5 sm:p-8">

            {messages.map((message) => (

              <div
                key={message.id}
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

                <div className="max-w-[85%]">

                  <div
                    className={`rounded-2xl px-4 py-3.5 text-sm leading-7 ${
                      message.role === "user"
                        ? "rounded-br-md bg-[#172126] text-white"
                        : "rounded-bl-md bg-[#f0f3f2] text-[#344247]"
                    }`}
                  >
                    {message.text.split("\n").map((line, index) => (
                      <span key={index}>
                        {line}
                        {index <
                          message.text.split("\n").length - 1 && (
                          <br />
                        )}
                      </span>
                    ))}
                  </div>


                  {message.role === "assistant" &&
                    message.schools &&
                    message.schools.length > 0 && (

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">

                      {message.schools.map((school) => (

                        <Link
                          key={school.id}
                          href={schoolLink(school)}
                          className="group flex items-center justify-between rounded-xl border border-black/[0.07] bg-white p-4 transition hover:-translate-y-0.5 hover:border-black/15 hover:shadow-md"
                        >

                          <div className="flex min-w-0 items-center gap-3">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#edf1f0] text-xs font-bold text-[#42545a]">
                              {school.shortName.slice(0, 3)}
                            </div>

                            <div className="min-w-0">

                              <p className="truncate text-sm font-semibold">
                                {school.shortName}
                              </p>

                              <p className="mt-0.5 truncate text-xs text-gray-500">
                                {school.city}, {school.province}
                              </p>

                            </div>

                          </div>

                          <ChevronRight className="h-4 w-4 shrink-0 text-gray-300 transition group-hover:translate-x-1 group-hover:text-gray-700" />

                        </Link>

                      ))}

                    </div>

                  )}

                {message.role === "user" && (
                  <div className="mt-1 flex justify-end">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200">
                      <User className="h-3.5 w-3.5 text-gray-600" />
                    </div>
                  </div>
                )}

                </div>

              </div>

            ))}


            {isTyping && (

              <div className="flex gap-3">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#172126] text-white">
                  <Bot className="h-4 w-4" />
                </div>

                <div className="rounded-2xl rounded-bl-md bg-[#f0f3f2] px-5 py-4">

                  <div className="flex gap-1.5">

                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />

                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:120ms]" />

                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:240ms]" />

                  </div>

                </div>

              </div>

            )}

          </div>


          {/* SUGGESTIONS */}

          <div className="border-t border-black/[0.06] bg-[#fafbfa] px-5 py-4 sm:px-7">

            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400">
              Try asking
            </p>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">

              {suggestedQuestions.map((item) => {

                const Icon = item.icon;

                return (
                  <button
                    key={item.label}
                    onClick={() =>
                      sendMessage(item.question)
                    }
                    className="group flex items-center gap-2 rounded-xl border border-black/[0.06] bg-white px-3 py-3 text-left text-xs font-medium text-gray-600 transition hover:border-black/15 hover:bg-gray-50"
                  >

                    <Icon className="h-4 w-4 shrink-0 text-gray-400 transition group-hover:text-[#172126]" />

                    <span>{item.label}</span>

                  </button>
                );

              })}

            </div>

          </div>


          {/* INPUT */}

          <div className="border-t border-black/[0.06] bg-white p-4 sm:p-5">

            <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-[#fafbfa] px-3 py-2 transition focus-within:border-[#172126]/30 focus-within:bg-white focus-within:shadow-sm">

              <Search className="ml-2 h-4 w-4 shrink-0 text-gray-400" />

              <input
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                placeholder="Ask about a university, program, admission, or deadline..."
                className="min-w-0 flex-1 bg-transparent px-1 py-3 text-sm outline-none placeholder:text-gray-400"
              />

              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isTyping}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#172126] text-white transition hover:bg-[#2a3b41] disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Send className="h-4 w-4" />
              </button>

            </div>

          </div>

        </div>


        {/* BELOW CHAT */}

        <div className="mt-10 grid gap-4 sm:grid-cols-3">

          <Link
            href="/universities"
            className="group rounded-2xl border border-black/[0.07] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md"
          >

            <MapPin className="h-5 w-5 text-gray-400" />

            <h3 className="mt-5 text-sm font-semibold">
              Explore universities
            </h3>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              Browse Canadian schools and open individual profiles.
            </p>

            <div className="mt-4 flex items-center gap-1 text-xs font-semibold">
              Browse
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
            </div>

          </Link>


          <Link
            href="/programs"
            className="group rounded-2xl border border-black/[0.07] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md"
          >

            <GraduationCap className="h-5 w-5 text-gray-400" />

            <h3 className="mt-5 text-sm font-semibold">
              Explore programs
            </h3>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              Find programs and understand your study options.
            </p>

            <div className="mt-4 flex items-center gap-1 text-xs font-semibold">
              Explore
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
            </div>

          </Link>


          <Link
            href="/deadlines"
            className="group rounded-2xl border border-black/[0.07] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md"
          >

            <CalendarDays className="h-5 w-5 text-gray-400" />

            <h3 className="mt-5 text-sm font-semibold">
              Application deadlines
            </h3>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              Keep track of important application dates.
            </p>

            <div className="mt-4 flex items-center gap-1 text-xs font-semibold">
              View deadlines
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
            </div>

          </Link>

        </div>

      </section>

    </main>
  );
}
EOF