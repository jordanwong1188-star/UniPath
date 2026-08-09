"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Search,
  ChevronDown,
  MapPin,
  GraduationCap,
  CalendarDays,
  Sparkles,
} from "lucide-react";

const questions = [
  {
    question: "Which university is right for me?",
    answer:
      "Explore Canadian universities by province, location, school type, and programs. Compare schools side by side to find the options that fit what you are looking for.",
    link: "/universities",
    linkText: "Explore universities",
  },
  {
    question: "What can I study?",
    answer:
      "Browse programs across Canadian universities and discover options in business, engineering, computer science, arts, health sciences, and many other fields.",
    link: "/programs",
    linkText: "Explore programs",
  },
  {
    question: "What do I need to get accepted?",
    answer:
      "Admission requirements vary by university and program. UniPath brings the important requirements together so you can understand what each school expects.",
    link: "/universities",
    linkText: "View admission information",
  },
  {
    question: "When do I need to apply?",
    answer:
      "Keep track of important application deadlines and organize your university applications so you know what needs to be done and when.",
    link: "/deadlines",
    linkText: "View deadlines",
  },
  {
    question: "How much does university cost?",
    answer:
      "Compare tuition, estimated costs, and other financial information when researching your university options.",
    link: "/universities",
    linkText: "Compare universities",
  },
  {
    question: "Can I compare different universities?",
    answer:
      "Yes. UniPath is designed to help you research multiple schools and compare the factors that matter most when making your decision.",
    link: "/universities",
    linkText: "Start comparing",
  },
];

const features = [
  {
    icon: GraduationCap,
    title: "Universities",
    text: "Explore Canadian universities and colleges in one place.",
    href: "/universities",
  },
  {
    icon: CalendarDays,
    title: "Deadlines",
    text: "Keep track of important application dates.",
    href: "/deadlines",
  },
  {
    icon: Sparkles,
    title: "Guidance",
    text: "Get help making sense of your university options.",
    href: "/ai-assistant",
  },
];

export default function Home() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  return (
    <main className="min-h-screen bg-[#f5f7f8] text-[#172126]">

      {/* HEADER */}
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

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/universities"
              className="text-sm font-medium text-gray-700 transition hover:text-black"
            >
              Universities
            </Link>

            <Link
              href="/programs"
              className="text-sm font-medium text-gray-700 transition hover:text-black"
            >
              Programs
            </Link>

            <Link
              href="/deadlines"
              className="text-sm font-medium text-gray-700 transition hover:text-black"
            >
              Deadlines
            </Link>

            <Link
              href="/ai-assistant"
              className="text-sm font-medium text-gray-700 transition hover:text-black"
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


      {/* HERO */}
      <section className="relative overflow-hidden">

        {/* subtle background shapes */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#dfe8e8] blur-3xl" />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-[350px] w-[350px] rounded-full bg-[#e9e3d8] blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 pb-24 pt-20 lg:grid-cols-[1.1fr_.9fr] lg:px-10 lg:pb-32 lg:pt-28">

          <div className="max-w-3xl">

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-gray-600 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Canadian university guide
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Find the university
              <span className="block text-[#65777c]">
                that fits your path.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-gray-600">
              Research universities, discover programs, understand
              requirements, and keep your application journey organized —
              all in one place.
            </p>

            {/* SEARCH */}
            <div className="mt-9 max-w-2xl">
              <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white p-2 shadow-[0_15px_45px_rgba(23,33,38,0.08)]">
                <Search className="ml-3 h-5 w-5 text-gray-400" />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search universities, programs, or questions..."
                  className="min-w-0 flex-1 bg-transparent px-1 py-3 text-sm outline-none placeholder:text-gray-400"
                />

                <Link
                  href={
                    search
                      ? `/universities?search=${encodeURIComponent(search)}`
                      : "/universities"
                  }
                  className="rounded-xl bg-[#172126] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#29383e]"
                >
                  Search
                </Link>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-xs text-gray-500">
              <span className="rounded-full bg-white px-3 py-2">
                55+ schools
              </span>
              <span className="rounded-full bg-white px-3 py-2">
                Canada-wide
              </span>
              <span className="rounded-full bg-white px-3 py-2">
                Programs & admissions
              </span>
            </div>
          </div>


          {/* HERO SIDE PANEL */}
          <div className="relative flex items-end">

            <div className="w-full rounded-[2rem] border border-black/10 bg-[#172126] p-7 text-white shadow-[0_25px_70px_rgba(23,33,38,0.18)] lg:p-9">

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                    Start here
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold">
                    What are you looking for?
                  </h2>
                </div>

                <div className="rounded-full bg-white/10 p-3">
                  <Search className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-7 space-y-3">

                {[
                  "Find universities",
                  "Explore programs",
                  "Check requirements",
                  "Track deadlines",
                ].map((item, index) => (
                  <Link
                    key={item}
                    href={
                      index === 0
                        ? "/universities"
                        : index === 1
                        ? "/programs"
                        : index === 2
                        ? "/universities"
                        : "/deadlines"
                    }
                    className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.06] px-5 py-4 transition hover:bg-white/[0.12]"
                  >
                    <span className="text-sm font-medium">
                      {item}
                    </span>

                    <ArrowRight className="h-4 w-4 text-white/40 transition group-hover:translate-x-1 group-hover:text-white" />
                  </Link>
                ))}

              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <div className="flex items-center gap-3 text-sm text-white/60">
                  <MapPin className="h-4 w-4" />
                  Built for students across Canada
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* FEATURE STRIP */}
      <section className="border-y border-black/5 bg-white">
        <div className="mx-auto grid max-w-7xl md:grid-cols-3">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <Link
                key={feature.title}
                href={feature.href}
                className={`group p-8 transition hover:bg-[#f5f7f8] lg:p-10 ${
                  index !== 2 ? "border-b md:border-b-0 md:border-r" : ""
                } border-black/5`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf1f1]">
                    <Icon className="h-5 w-5 text-[#42545a]" />
                  </div>

                  <ArrowRight className="h-5 w-5 text-gray-300 transition group-hover:translate-x-1 group-hover:text-gray-700" />
                </div>

                <h3 className="mt-7 text-lg font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-2 max-w-xs text-sm leading-6 text-gray-500">
                  {feature.text}
                </p>
              </Link>
            );
          })}

        </div>
      </section>


      {/* QUESTIONS */}
      <section className="mx-auto max-w-5xl px-6 py-24 lg:py-32">

        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Questions students ask
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
            Not sure where to start?
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-500">
            Start with a question. UniPath will help you find the
            information you need to make your next decision.
          </p>
        </div>


        <div className="mt-12 border-t border-black/10">

          {questions.map((item, index) => {
            const isOpen = openQuestion === index;

            return (
              <div
                key={item.question}
                className="border-b border-black/10"
              >

                <button
                  onClick={() =>
                    setOpenQuestion(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between gap-6 py-7 text-left"
                >

                  <span className="text-lg font-medium tracking-tight sm:text-xl">
                    {item.question}
                  </span>

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 transition ${
                      isOpen ? "rotate-180 bg-[#172126] text-white" : ""
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </span>

                </button>


                {isOpen && (
                  <div className="pb-8 pr-12 sm:pr-20">

                    <p className="max-w-2xl text-sm leading-7 text-gray-600">
                      {item.answer}
                    </p>

                    <Link
                      href={item.link}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#172126] hover:underline"
                    >
                      {item.linkText}
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                  </div>
                )}

              </div>
            );
          })}

        </div>

      </section>


      {/* FINAL CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">

        <div className="relative overflow-hidden rounded-[2rem] bg-[#172126] px-8 py-14 text-white sm:px-12 lg:px-16 lg:py-16">

          <div className="relative z-10 max-w-2xl">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Your next step
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Start exploring Canadian universities.
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-white/60">
              Research your options, find programs that interest you,
              and start building your university plan.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">

              <Link
                href="/universities"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#172126] transition hover:bg-gray-100"
              >
                Explore universities
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/deadlines"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View deadlines
              </Link>

            </div>

          </div>

          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/10" />
          <div className="absolute -bottom-48 -right-10 h-96 w-96 rounded-full border border-white/5" />

        </div>

      </section>


      {/* FOOTER */}
      <footer className="border-t border-black/5 bg-white">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center lg:px-10">

          <div>
            <div className="font-semibold">UniPath</div>
            <p className="mt-1 text-xs text-gray-500">
              Your university journey, organized.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-gray-500">

            <Link
              href="/universities"
              className="hover:text-black"
            >
              Universities
            </Link>

            <Link
              href="/programs"
              className="hover:text-black"
            >
              Programs
            </Link>

            <Link
              href="/deadlines"
              className="hover:text-black"
            >
              Deadlines
            </Link>

            <Link
              href="/contact"
              className="hover:text-black"
            >
              Contact
            </Link>

          </div>

        </div>

      </footer>

    </main>
  );
}