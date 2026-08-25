"use client";

import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { useState } from "react";
import SiteHeader from "./components/SiteHeader";

const questions = [
  { question: "Which universities fit my goals?", answer: "Start with the kind of program you want, where you could realistically live, your preferred learning environment, and the opportunities you care about—such as co-op, research, campus size, or professional pathways. A strong list usually includes ambitious, realistic, and safer choices rather than one ranking.", next: "Compare schools by location, institution type, and program pathway.", href: "/universities", label: "Explore schools" },
  { question: "What does this program require?", answer: "Separate the requirements into four parts: prerequisite courses, academic range, application deadline, and any supplemental component. Also check whether you apply directly to the program or choose the specialization after first year.", next: "Open the program catalogue to keep those details together.", href: "/programs", label: "Check programs" },
  { question: "When is everything due?", answer: "The main application deadline is only one date. Scholarships, transcripts, supplemental forms, portfolios, references, and document uploads can all have separate deadlines. Build the timeline backward so nothing depends on a last-minute submission.", next: "Review official dates in one deadline view.", href: "/deadlines", label: "View deadlines" },
  { question: "How do I improve my supplemental?", answer: "Answer the exact prompt, use one specific experience, explain what you personally decided or did, show the result, and reflect on what changed afterward. Strong responses sound like the applicant—not a collection of impressive phrases.", next: "Practise with the format and feedback criteria used for your program.", href: "/applications", label: "Open practice" },
  { question: "Where did I save my last draft?", answer: "A draft is most useful when it stays connected to its exact prompt, program, previous feedback, and revision history. That makes it easier to see what improved instead of searching through differently named documents.", next: "Your saved application work is organized in your personal file.", href: "/dashboard", label: "Open my file" },
] as const;

const desk = [
  { index: "01", title: "Research", text: "Schools, programs and pathways across Canada.", href: "/programs", action: "Open the catalogue" },
  { index: "02", title: "Plan", text: "Deadlines, scholarships and transfer requirements.", href: "/deadlines", action: "Build the timeline" },
  { index: "03", title: "Practise", text: "Written supplementals and recorded interviews.", href: "/applications", action: "Enter the studio" },
];

const proof = [
  ["55", "Canadian institutions indexed"],
  ["39", "Funding starting points"],
  ["2", "Practice formats: written + video"],
];

export default function Home() {
  const [activeQuestion, setActiveQuestion] = useState<(typeof questions)[number] | null>(null);

  return <main className="min-h-screen bg-[#132c29] text-[#f2ede2]">
    <SiteHeader dark />

    <section className="border-b border-white/12">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-[72px_minmax(0,1fr)_390px]">
        <div className="hidden border-r border-white/12 px-4 py-16 lg:block">
          <p className="[writing-mode:vertical-rl] rotate-180 text-[10px] font-semibold uppercase tracking-[.24em] text-white/35">Canadian undergraduate admissions · 2026–27</p>
        </div>

        <div className="px-6 py-16 sm:py-20 lg:px-12 lg:py-24">
          <p className="border-l-2 border-[#d4865f] pl-3 text-[10px] font-semibold uppercase tracking-[.22em] text-[#e0a17f]">Independent student reference</p>
          <h1 className="mt-9 max-w-4xl text-[3.65rem] leading-[.92] tracking-[-.055em] sm:text-[5rem] lg:text-[6.3rem]">
            Make the application<br />make sense.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-[#b9c3bb] sm:text-lg">A working guide for researching Canadian programs, protecting deadlines, planning transfers, and preparing the parts of an application that grades cannot explain.</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/programs" className="inline-flex items-center gap-3 bg-[#d4865f] px-5 py-3.5 text-sm font-semibold text-[#132c29]">Start with a program <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/universities" className="border-b border-white/40 py-2 text-sm font-medium text-white/75 hover:border-white hover:text-white">Browse all schools</Link>
          </div>
        </div>

        <aside className="border-t border-white/12 bg-[#1d3d38] p-6 lg:border-l lg:border-t-0 lg:p-8">
          <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#e0a17f]">Reference desk</p>
          <h2 className="mt-4 text-3xl leading-tight">Three places to begin.</h2>
          <div className="mt-8 border-t border-white/12">
            {desk.map(item => <Link key={item.index} href={item.href} className="group grid grid-cols-[38px_1fr] gap-3 border-b border-white/12 py-5">
              <span className="font-mono text-[10px] text-[#e0a17f]">{item.index}</span>
              <span><strong className="block font-serif text-xl font-medium text-white">{item.title}</strong><span className="mt-1 block text-xs leading-5 text-white/45">{item.text}</span><span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-white/70 group-hover:text-white">{item.action}<ArrowRight className="h-3 w-3" /></span></span>
            </Link>)}
          </div>
        </aside>
      </div>
    </section>

    <section className="border-b border-white/12 bg-[#102724]">
      <div className="mx-auto grid max-w-7xl gap-px bg-white/12 md:grid-cols-5">
        {questions.map((item, index) => <button type="button" onClick={() => setActiveQuestion(item)} key={item.question} className="group min-h-32 bg-[#132c29] p-5 text-left hover:bg-[#1d3d38]">
          <span className="font-mono text-[9px] text-[#e0a17f]">Q{String(index + 1).padStart(2, "0")}</span>
          <span className="mt-3 block text-sm font-medium leading-5 text-white/72 group-hover:text-white">{item.question}</span>
        </button>)}
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
        <header>
          <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#e0a17f]">The working index</p>
          <h2 className="mt-4 text-4xl leading-[1.04] sm:text-5xl">One application.<br />Fewer loose ends.</h2>
          <p className="mt-5 text-sm leading-7 text-white/48">UniPath is organized around decisions students actually make, not around a collection of disconnected features.</p>
        </header>

        <div className="border-t border-white/15">
          {desk.map(item => <Link key={item.index} href={item.href} className="group grid gap-3 border-b border-white/15 py-7 sm:grid-cols-[72px_190px_1fr_auto] sm:items-center">
            <span className="font-mono text-xs text-[#e0a17f]">{item.index}</span>
            <strong className="font-serif text-2xl font-medium">{item.title}</strong>
            <span className="text-sm text-white/45">{item.text}</span>
            <ArrowRight className="hidden h-4 w-4 text-white/35 transition-transform group-hover:translate-x-1 group-hover:text-white sm:block" />
          </Link>)}
        </div>
      </div>
    </section>

    <section className="border-y border-white/12 bg-[#f2ede2] text-[#132c29]">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-[1fr_420px]">
        <div className="px-6 py-16 lg:px-10 lg:py-20">
          <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#9b5637]">Application practice file</p>
          <h2 className="mt-5 max-w-2xl text-4xl leading-[1.03] sm:text-5xl">Write it. Say it. Understand why it works.</h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#465651]">Practise the written and interview portions required by your program. Feedback is tied to the prompt, your actual evidence, reflection, structure, and the published priorities that can be verified.</p>
          <Link href="/applications" className="mt-8 inline-flex items-center gap-2 border-b-2 border-[#132c29] pb-1 text-sm font-semibold">Find your application format <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="border-t border-[#132c29]/15 bg-[#e4dccd] p-6 lg:border-l lg:border-t-0 lg:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[.15em] text-[#9b5637]">Revision note / 03</p>
          <blockquote className="mt-8 font-serif text-3xl leading-[1.18]">“You explain how the experience changed your approach—not only what happened.”</blockquote>
          <div className="mt-10 grid grid-cols-3 gap-px bg-[#132c29]/15">
            {[["01","Draft"],["02","Feedback"],["03","Revision"]].map(([n,label]) => <div key={n} className="bg-[#f2ede2] p-3"><span className="font-mono text-[9px] text-[#9b5637]">{n}</span><p className="mt-2 text-xs font-semibold">{label}</p></div>)}
          </div>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="grid gap-px border border-white/12 bg-white/12 sm:grid-cols-3">
        {proof.map(([value, label]) => <div key={label} className="bg-[#132c29] p-6"><p className="font-serif text-4xl text-[#e0a17f]">{value}</p><p className="mt-2 text-xs leading-5 text-white/45">{label}</p></div>)}
      </div>
    </section>

    {activeQuestion ? <div className="fixed inset-0 z-[100] grid place-items-center bg-[#0a1917]/80 p-4" role="presentation" onMouseDown={() => setActiveQuestion(null)}>
      <section role="dialog" aria-modal="true" aria-labelledby="question-title" onMouseDown={event => event.stopPropagation()} className="relative w-full max-w-2xl border border-[#d4865f]/35 bg-[#f2ede2] p-6 text-[#132c29] sm:p-9">
        <button type="button" aria-label="Close answer" onClick={() => setActiveQuestion(null)} className="absolute right-4 top-4 grid h-9 w-9 place-items-center border border-[#132c29]/15 hover:bg-[#132c29]/5"><X className="h-4 w-4" /></button>
        <p className="font-mono text-[9px] font-semibold uppercase tracking-[.2em] text-[#9b5637]">Reference note</p>
        <h2 id="question-title" className="mt-5 max-w-xl pr-10 text-3xl leading-tight sm:text-4xl">{activeQuestion.question}</h2>
        <p className="mt-6 text-base leading-8 text-[#394b47]">{activeQuestion.answer}</p>
        <div className="mt-7 border-l-2 border-[#d4865f] bg-[#e4dccd]/55 px-4 py-3"><p className="text-sm leading-6 text-[#394b47]">{activeQuestion.next}</p></div>
        <Link href={activeQuestion.href} onClick={() => setActiveQuestion(null)} className="mt-6 inline-flex items-center gap-2 bg-[#132c29] px-5 py-3 text-sm font-semibold text-[#f2ede2]">{activeQuestion.label}<ArrowRight className="h-4 w-4" /></Link>
      </section>
    </div> : null}

    <footer className="border-t border-white/12 px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-xs text-white/38 sm:flex-row"><p>© 2026 UniPath · Canadian undergraduate admissions reference</p><div className="flex gap-5"><Link href="/transfers" className="hover:text-white">Transfer</Link><Link href="/scholarships" className="hover:text-white">Funding</Link><Link href="/dashboard" className="hover:text-white">My file</Link></div></div>
    </footer>
  </main>;
}
