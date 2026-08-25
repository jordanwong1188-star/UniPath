"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, BookOpenCheck, CalendarCheck, Check, FilePenLine, GraduationCap, Search, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import SiteHeader from "./components/SiteHeader";

const tools = [
  { icon: GraduationCap, title: "Find the right programs", text: "Compare thousands of Canadian programs without losing the details that matter.", href: "/programs", tone: "bg-[#24384b] text-[#b8c7d2]" },
  { icon: CalendarCheck, title: "Never miss a deadline", text: "Turn scattered university dates into one clear application timeline.", href: "/deadlines", tone: "bg-[#274047] text-[#b8ced0]" },
  { icon: FilePenLine, title: "Practise every supplemental", text: "Use program-specific formats, rubrics, interview preparation, and actionable feedback.", href: "/applications", tone: "bg-[#303b49] text-[#c4ccd5]" },
];
const questions = [
  {
    question: "Which universities fit my goals?",
    answer: "Start with the kind of program you want, where you could realistically live, your preferred learning environment, and the opportunities you care about—such as co-op, research, campus size, or professional pathways. A strong list usually includes ambitious, realistic, and safer choices rather than one ranking.",
    next: "Compare schools by location, institution type, and program pathway.",
    href: "/universities",
    label: "Explore schools",
  },
  {
    question: "What does this program require?",
    answer: "Separate the requirements into four parts: prerequisite courses, academic range, application deadline, and any supplemental component. Also check whether you apply directly to the program or choose the specialization after first year.",
    next: "Open the program catalogue to keep those details together.",
    href: "/programs",
    label: "Check programs",
  },
  {
    question: "When is everything due?",
    answer: "The main application deadline is only one date. Scholarships, transcripts, supplemental forms, portfolios, references, and document uploads can all have separate deadlines. Build the timeline backward so nothing depends on a last-minute submission.",
    next: "Review official dates in one deadline view.",
    href: "/deadlines",
    label: "View deadlines",
  },
  {
    question: "How do I improve my supplemental?",
    answer: "Answer the exact prompt, use one specific experience, explain what you personally decided or did, show the result, and reflect on what changed afterward. Strong responses sound like the applicant—not a collection of impressive phrases.",
    next: "Practise with the format and feedback criteria used for your program.",
    href: "/applications",
    label: "Open practice",
  },
  {
    question: "Where did I save my last draft?",
    answer: "A draft is most useful when it stays connected to its exact prompt, program, previous feedback, and revision history. That makes it easier to see what improved instead of searching through differently named documents.",
    next: "Your saved application work is organized in your personal file.",
    href: "/dashboard",
    label: "Open my file",
  },
] as const;
const reveal = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: .65 } };

function FeatureCard({ tool, index }: { tool: (typeof tools)[number]; index: number }) {
  const Icon = tool.icon;
  return <motion.article {...reveal} transition={{ duration: .6, delay: index * .1 }} whileHover={{ y: -6 }} className="group rounded-[2rem] border border-white/8 bg-[#172536] p-7 shadow-[0_18px_50px_rgba(0,0,0,.16)]">
    <div className={`grid h-14 w-14 place-items-center rounded-2xl border border-white/8 ${tool.tone}`}><Icon className="h-6 w-6" /></div>
    <h3 className="mt-8 text-2xl font-semibold tracking-[-.025em] text-white">{tool.title}</h3>
    <p className="mt-3 leading-7 text-[#9ba9b8]">{tool.text}</p>
    <Link href={tool.href} className="mt-8 inline-flex items-center gap-2 font-semibold text-[#b8c7d2]">Open tool <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></Link>
  </motion.article>;
}

export default function Home() {
  const [activeQuestion, setActiveQuestion] = useState<(typeof questions)[number] | null>(null);
  return <main className="overflow-hidden bg-[#111b27] text-[#e8edf3]">
    <div className="bg-[#0f1823]">
      <SiteHeader dark />
      <section className="relative mx-auto min-h-[760px] max-w-7xl px-6 pb-20 pt-16 text-white lg:px-10 lg:pt-24">
        <div className="pointer-events-none absolute -right-40 top-6 h-[520px] w-[520px] rounded-full bg-[#557b80]/12 blur-3xl" />
        <div className="pointer-events-none absolute -left-52 bottom-0 h-96 w-96 rounded-full bg-[#7891a3]/8 blur-3xl" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="relative max-w-4xl">
          <span className="inline-flex border-l-2 border-[#d4865f] pl-3 text-[11px] font-bold uppercase tracking-[.2em] text-[#e0a17f]">Edition 2026–27 · Canada</span>
          <h1 className="mt-8 text-6xl font-semibold tracking-[-.065em] sm:text-7xl lg:text-[92px] lg:leading-[.95]">Your Canadian university<br /><span className="font-serif italic font-normal text-[#e0a17f]">field guide.</span></h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#9ba9b8] sm:text-xl">Research programs, protect every deadline, practise written supplementals and interviews, and keep one clear record of what comes next.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Link href="/programs" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8fa7b6] px-6 py-4 font-semibold text-[#0b121b] shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#a1b5c1]">Explore your options <ArrowRight className="h-4 w-4" /></Link><Link href="/pricing" className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.025] px-6 py-4 font-semibold text-white/85 transition hover:bg-white/[0.07]">See membership</Link></div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3, duration: .8 }} className="relative mt-16 grid gap-px border-y border-white/14 bg-white/10 sm:grid-cols-[1fr_auto]">
          <div className="flex items-center gap-3 bg-[#172536] px-5 text-white"><Search className="h-5 w-5 text-[#7891a3]" /><span className="py-5 text-sm text-[#9ba9b8]">Search a university, program, scholarship, or question…</span></div>
          <Link href="/programs" className="grid place-items-center bg-[#d4865f] px-7 py-5 text-[#132c29] font-semibold text-white transition hover:bg-[#4d7079]">Start exploring</Link>
        </motion.div>
      </section>
    </div>

    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <motion.div {...reveal} className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><p className="text-xs font-bold uppercase tracking-[.17em] text-[#7891a3]">From question to next step</p><h2 className="mt-4 text-5xl font-semibold tracking-[-.05em] text-white">Stop searching in circles.</h2></div><div className="flex flex-wrap gap-2">{questions.map((item, index) => <motion.button type="button" whileHover={{ y: -2 }} onClick={() => setActiveQuestion(item)} key={item.question} className={`border px-4 py-3 text-left text-sm font-semibold ${index === 3 ? "border-[#d4865f]/45 bg-[#24384b] text-white" : "border-white/10 bg-[#172536] text-[#b7c2cd]"}`}>{item.question}</motion.button>)}</div></motion.div>
      <div className="mt-14 grid gap-5 lg:grid-cols-3">{tools.map((tool, index) => <FeatureCard key={tool.href} tool={tool} index={index} />)}</div>
    </section>

    <section className="border-y border-white/8 bg-[#152331] text-white"><div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:px-10"><motion.div {...reveal}><p className="text-xs font-bold uppercase tracking-[.17em] text-[#7891a3]">A workspace that remembers</p><h2 className="mt-4 max-w-xl text-5xl font-semibold tracking-[-.05em]">See your application get stronger.</h2><p className="mt-6 max-w-xl text-lg leading-8 text-[#9ba9b8]">Save each draft with its feedback, return to your shortlist, and compare practice scores across every program—not scattered across tabs and documents.</p><Link href="/login" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#8fa7b6] px-6 py-4 font-semibold text-[#0b121b] transition hover:-translate-y-0.5 hover:bg-[#a1b5c1]">Preview the workspace <ArrowRight className="h-4 w-4" /></Link></motion.div><motion.div {...reveal} className="rounded-[2rem] border border-white/8 bg-[#0f1823] p-6 shadow-2xl shadow-black/25"><div className="flex items-center justify-between border-b border-white/10 pb-5"><div><p className="text-xs font-bold uppercase tracking-wider text-[#a8bac5]">UBC Personal Profile</p><p className="mt-2 font-semibold">Draft improvement</p></div><BarChart3 className="text-white/35" /></div><div className="mt-6 grid grid-cols-3 gap-3">{[["Attempt 1", "2.8"], ["Attempt 2", "3.7"], ["Current", "4.4"]].map(([label, score], index) => <div key={label} className={`rounded-2xl p-4 ${index === 2 ? "bg-[#8fa7b6] text-[#0b121b]" : "bg-white/[0.055] text-white"}`}><p className="text-xs opacity-60">{label}</p><p className="mt-2 text-2xl font-semibold">{score}<span className="text-xs opacity-50">/5</span></p></div>)}</div><div className="mt-4 rounded-2xl border border-white/8 bg-[#172536] p-5 text-white"><div className="flex items-center gap-2"><Check className="h-4 w-4 text-[#7fa49d]" /><p className="text-sm font-semibold">Reflection is now specific</p></div><p className="mt-2 text-sm leading-6 text-[#9ba9b8]">You explain how the experience changed your approach, not only what happened.</p></div></motion.div></div></section>

    <section className="mx-auto max-w-5xl px-6 py-24 text-center lg:px-10"><motion.div {...reveal}><BookOpenCheck className="mx-auto h-10 w-10 text-[#7891a3]" /><h2 className="mt-6 text-5xl font-semibold tracking-[-.05em] text-white">Ready to make a clearer plan?</h2><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#9ba9b8]">Start with university research, then build a workspace around the schools and applications that matter to you.</p><Link href="/universities" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#8fa7b6] px-7 py-4 font-semibold text-[#0b121b] transition hover:-translate-y-0.5 hover:bg-[#a1b5c1]">Find your universities <ArrowRight className="h-4 w-4" /></Link></motion.div></section>
    {activeQuestion ? <div className="fixed inset-0 z-[100] grid place-items-center bg-[#0a1917]/75 p-4" role="presentation" onMouseDown={() => setActiveQuestion(null)}>
      <section role="dialog" aria-modal="true" aria-labelledby="question-title" onMouseDown={event => event.stopPropagation()} className="relative w-full max-w-2xl border border-[#d4865f]/35 bg-[#f2ede2] p-6 text-[#132c29] shadow-2xl sm:p-9">
        <button type="button" aria-label="Close answer" onClick={() => setActiveQuestion(null)} className="absolute right-4 top-4 grid h-9 w-9 place-items-center border border-[#132c29]/15 hover:bg-[#132c29]/5"><X className="h-4 w-4" /></button>
        <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#9b5637]">A clearer starting point</p>
        <h2 id="question-title" className="mt-4 max-w-xl pr-10 text-3xl leading-tight sm:text-4xl">{activeQuestion.question}</h2>
        <p className="mt-6 text-base leading-8 text-[#394b47]">{activeQuestion.answer}</p>
        <div className="mt-7 border-l-2 border-[#d4865f] bg-[#e4dccd]/55 px-4 py-3">
          <p className="text-sm leading-6 text-[#394b47]">{activeQuestion.next}</p>
        </div>
        <Link href={activeQuestion.href} onClick={() => setActiveQuestion(null)} className="mt-6 inline-flex items-center gap-2 bg-[#132c29] px-5 py-3 text-sm font-semibold text-[#f2ede2]">{activeQuestion.label}<ArrowRight className="h-4 w-4" /></Link>
      </section>
    </div> : null}
    <footer className="border-t border-white/8 px-6 py-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-[#7f8e9d] sm:flex-row"><p>© 2026 UniPath. Built to support—not replace—official admissions guidance.</p><div className="flex gap-5"><Link href="/pricing" className="hover:text-white">Pricing</Link><Link href="/dashboard" className="hover:text-white">Workspace</Link></div></div></footer>
  </main>;
}
