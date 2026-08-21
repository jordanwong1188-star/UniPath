"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, FilePenLine, GraduationCap, Search, ShieldCheck } from "lucide-react";
import { applicationProfiles } from "../application-hub/page";
import SiteHeader from "@/app/components/SiteHeader";

export default function ApplicationsPage() {
  const universities = useMemo(() => Array.from(new Set(applicationProfiles.map(item => item.university))).sort(), []);
  const [university, setUniversity] = useState("");
  const [programId, setProgramId] = useState("");
  const programs = applicationProfiles.filter(item => item.university === university);
  const selected = applicationProfiles.find(item => item.id === programId);

  return <main className="min-h-screen bg-[#101923] text-[#e8edf3]">
    <SiteHeader dark />
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-40 top-16 h-[460px] w-[460px] rounded-full bg-[#405f69]/14 blur-3xl" />
      <div className="pointer-events-none absolute -right-56 top-[-80px] h-[600px] w-[600px] rounded-full bg-[#7891a3]/9 blur-3xl" />
      <div className="relative mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-[.85fr_1.15fr] lg:px-10 lg:py-20">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-xs font-semibold uppercase tracking-[.18em] text-[#a8bac5]"><FilePenLine className="h-4 w-4" /> Supplemental studio</div>
          <h1 className="mt-7 text-5xl font-semibold leading-[.98] tracking-[-.055em] sm:text-6xl lg:text-7xl">Prepare the parts<br /><span className="text-[#92aebb]">grades can’t show.</span></h1>
          <p className="mt-7 text-lg leading-8 text-[#9ba9b8]">Choose the school and program you are applying to. UniPath opens a dedicated practice environment around that program’s supplemental requirements.</p>
          <div className="mt-9 space-y-3">
            <div className="flex items-start gap-3 text-sm text-white/55"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#7891a3]/12 text-[#9fb6c2]"><Search className="h-3.5 w-3.5" /></span><span>Only programs with a required or formally assessed supplemental component appear here.</span></div>
            <div className="flex items-start gap-3 text-sm text-white/55"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#7891a3]/12 text-[#9fb6c2]"><ShieldCheck className="h-3.5 w-3.5" /></span><span>Requirements are organized by program so practice stays relevant to the actual application.</span></div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 rounded-[2.25rem] bg-gradient-to-br from-[#7891a3]/12 via-transparent to-[#405f69]/10 blur-xl" />
          <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#172536] shadow-2xl shadow-black/25">
            <div className="flex items-center justify-between border-b border-white/8 px-6 py-5 sm:px-8"><div><p className="text-[11px] font-semibold uppercase tracking-[.17em] text-[#8fa7b6]">Application launcher</p><h2 className="mt-1 text-xl font-semibold">Build your practice workspace</h2></div><div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#7891a3]/12 text-[#9fb6c2]"><GraduationCap className="h-5 w-5" /></div></div>
            <div className="p-6 sm:p-8">
              <div className="grid gap-6">
                <label className="block"><span className="flex items-center gap-2 text-sm font-semibold"><span className="grid h-6 w-6 place-items-center rounded-full border border-white/12 text-[11px] text-[#a8bac5]">1</span>Choose a university</span><select value={university} onChange={event => { setUniversity(event.target.value); setProgramId(""); }} className="mt-3 w-full rounded-xl border border-white/10 bg-[#0f1823] px-4 py-4 text-sm text-white outline-none"><option value="">Select a school…</option>{universities.map(item => <option key={item} value={item}>{item}</option>)}</select></label>
                <label className="block"><span className="flex items-center gap-2 text-sm font-semibold"><span className="grid h-6 w-6 place-items-center rounded-full border border-white/12 text-[11px] text-[#a8bac5]">2</span>Choose a program</span><select value={programId} disabled={!university} onChange={event => setProgramId(event.target.value)} className="mt-3 w-full rounded-xl border border-white/10 bg-[#0f1823] px-4 py-4 text-sm text-white outline-none disabled:cursor-not-allowed disabled:opacity-35"><option value="">{university ? "Select a program…" : "Choose a university first"}</option>{programs.map(item => <option key={item.id} value={item.id}>{item.program}</option>)}</select></label>
              </div>

              <div className="mt-7 min-h-[126px] rounded-2xl border border-white/8 bg-[#111c29] p-5">
                {selected ? <div className="flex items-start gap-4"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#7891a3]/12 text-[#9fb6c2]"><CheckCircle2 className="h-5 w-5" /></div><div><p className="font-semibold text-white">{selected.program}</p><p className="mt-1 text-sm leading-6 text-white/48">{selected.note}</p><div className="mt-3 inline-flex rounded-full border border-[#7891a3]/15 bg-[#7891a3]/8 px-3 py-1 text-xs font-semibold text-[#a8bac5]">{selected.deadline}</div></div></div> : <div className="flex h-full min-h-[84px] items-center justify-center text-center"><div><p className="text-sm font-semibold text-white/50">Your program summary will appear here</p><p className="mt-1 text-xs text-white/28">Select both fields to unlock the workspace.</p></div></div>}
              </div>

              {selected ? <Link href={`/applications/${selected.id}`} className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#9fb2bd] px-5 py-4 font-semibold text-[#0b121b] shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#b0c0c9]">Open application workspace <ArrowRight className="h-5 w-5" /></Link> : <button type="button" disabled className="mt-6 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-white/8 bg-white/[.04] px-5 py-4 font-semibold text-white/25">Select a school and program <ArrowRight className="h-5 w-5" /></button>}
            </div>
          </section>
        </div>
      </div>
    </section>
  </main>;
}
