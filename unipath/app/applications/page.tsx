"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, FilePenLine, GraduationCap, Search } from "lucide-react";
import { applicationProfiles } from "../application-hub/page";

export default function ApplicationsPage() {
  const universities = useMemo(() => Array.from(new Set(applicationProfiles.map(item => item.university))).sort(), []);
  const [university, setUniversity] = useState("");
  const [programId, setProgramId] = useState("");
  const programs = applicationProfiles.filter(item => item.university === university);
  const selected = applicationProfiles.find(item => item.id === programId);

  return <main className="min-h-screen bg-[#f4f1ea] text-[#172126]">
    <header className="border-b border-black/5 bg-white"><div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10"><Link href="/" className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#172126] font-bold text-white">U</span><span className="text-xl font-bold">UniPath</span></Link><nav className="flex items-center gap-5 text-sm font-semibold"><Link href="/scholarships">Scholarships</Link><Link href="/deadlines">Deadlines</Link></nav></div></header>
    <section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 px-6 py-14 lg:grid-cols-[0.85fr_1.15fr] lg:px-10">
      <div><div className="inline-flex items-center gap-2 rounded-full bg-[#eadde2] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#692f46]"><FilePenLine className="h-4 w-4" /> Supplemental applications</div><h1 className="mt-7 text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">What are you<br /><span className="text-[#8c4964]">applying to?</span></h1><p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">Choose your university and program. UniPath will open a separate practice workspace built around that program’s verified supplemental requirements.</p><div className="mt-8 flex items-center gap-3 text-sm text-gray-500"><Search className="h-5 w-5 text-[#8c4964]" /><span>Only programs with a required or formally assessed supplemental component are listed.</span></div></div>
      <section className="rounded-3xl bg-[#172126] p-6 text-white shadow-xl sm:p-9"><p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#ffd48a]">Find your application</p><div className="mt-7 space-y-6">
        <label className="block"><span className="text-sm font-semibold">1. Choose a university</span><select value={university} onChange={event => { setUniversity(event.target.value); setProgramId(""); }} className="mt-2 w-full cursor-pointer rounded-xl border border-white/10 bg-white px-4 py-4 text-[#172126] outline-none focus:ring-2 focus:ring-[#ffd48a]"><option value="">Select a school…</option>{universities.map(item => <option key={item} value={item}>{item}</option>)}</select></label>
        <label className="block"><span className="text-sm font-semibold">2. Choose a program</span><select value={programId} disabled={!university} onChange={event => setProgramId(event.target.value)} className="mt-2 w-full cursor-pointer rounded-xl border border-white/10 bg-white px-4 py-4 text-[#172126] outline-none disabled:cursor-not-allowed disabled:opacity-45 focus:ring-2 focus:ring-[#ffd48a]"><option value="">{university ? "Select a program…" : "Choose a university first"}</option>{programs.map(item => <option key={item.id} value={item.id}>{item.program}</option>)}</select></label>
      </div>{selected ? <div className="mt-7 rounded-2xl bg-white/8 p-5"><div className="flex items-start gap-3"><GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-[#ffd48a]" /><div><p className="font-semibold">{selected.program}</p><p className="mt-1 text-sm leading-6 text-white/55">{selected.note}</p><p className="mt-3 text-sm font-semibold text-[#ffd48a]">{selected.deadline}</p></div></div></div> : null}
      {selected ? <Link href={`/applications/${selected.id}`} className="mt-6 flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#ffd48a] px-5 py-4 font-semibold text-[#172126] transition hover:-translate-y-0.5">Open my application workspace <ArrowRight className="h-5 w-5" /></Link> : <button type="button" disabled className="mt-6 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-4 font-semibold text-white/35">Select a school and program <ArrowRight className="h-5 w-5" /></button>}</section>
    </section>
  </main>;
}
