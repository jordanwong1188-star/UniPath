"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { applicationProfiles } from "../application-hub/page";
import SiteHeader from "@/app/components/SiteHeader";

export default function ApplicationsPage() {
  const universities = useMemo(() => Array.from(new Set(applicationProfiles.map(item => item.university))).sort(), []);
  const [university, setUniversity] = useState("");
  const [programId, setProgramId] = useState("");
  const programs = applicationProfiles.filter(item => item.university === university);
  const selected = applicationProfiles.find(item => item.id === programId);

  return <main className="min-h-screen bg-[#132c29] text-[#f2ede2]">
    <SiteHeader dark />

    <section className="border-b border-white/12">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-[310px_1fr]">
        <header className="border-b border-white/12 px-6 py-12 lg:border-b-0 lg:border-r lg:px-10 lg:py-16">
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[.2em] text-[#e0a17f]">Application practice / index</p>
          <h1 className="mt-5 text-4xl leading-[1.02] sm:text-5xl">Find the format your program actually uses.</h1>
          <p className="mt-5 text-sm leading-7 text-white/48">Only programs with a verified supplemental component are listed. Choose one to open its written and interview workspace.</p>
        </header>

        <div className="p-6 lg:p-10">
          <div className="grid gap-px border border-white/12 bg-white/12 md:grid-cols-2">
            <label className="bg-[#1d3d38] p-5">
              <span className="font-mono text-[9px] uppercase tracking-[.17em] text-[#e0a17f]">01 / University</span>
              <select value={university} onChange={event => { setUniversity(event.target.value); setProgramId(""); }} className="mt-4 w-full border-0 border-b border-white/20 bg-transparent py-3 text-sm text-white outline-none">
                <option value="">Choose a university</option>
                {universities.map(item => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
            <label className="bg-[#1d3d38] p-5">
              <span className="font-mono text-[9px] uppercase tracking-[.17em] text-[#e0a17f]">02 / Program</span>
              <select value={programId} disabled={!university} onChange={event => setProgramId(event.target.value)} className="mt-4 w-full border-0 border-b border-white/20 bg-transparent py-3 text-sm text-white outline-none disabled:opacity-35">
                <option value="">{university ? "Choose a program" : "Choose a university first"}</option>
                {programs.map(item => <option key={item.id} value={item.id}>{item.program}</option>)}
              </select>
            </label>
          </div>

          <div className="mt-px min-h-56 border border-white/12 bg-[#102724] p-6">
            {selected ? <>
              <div className="grid gap-6 md:grid-cols-[1fr_210px]">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[.17em] text-[#e0a17f]">{selected.university}</p>
                  <h2 className="mt-3 text-3xl leading-tight">{selected.program}</h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-white/48">{selected.note}</p>
                </div>
                <div className="border-l border-white/12 pl-5">
                  <p className="text-[9px] font-semibold uppercase tracking-[.16em] text-white/30">Available practice</p>
                  <p className="mt-4 text-sm text-white/72">Written response + feedback</p>
                  <p className="mt-2 text-sm text-white/72">Interview preparation where required</p>
                </div>
              </div>
              <Link href={`/applications/${selected.id}`} className="mt-7 inline-flex items-center gap-2 bg-[#d4865f] px-5 py-3 text-sm font-semibold text-[#132c29]">Open this practice file <ArrowRight className="h-4 w-4" /></Link>
            </> : <div className="flex min-h-40 items-center"><div><p className="font-serif text-2xl text-white/72">Choose a school and program above.</p><p className="mt-2 text-sm text-white/38">The relevant prompts, timing notes, rubric, and feedback workspace will appear here.</p></div></div>}
          </div>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
      <div className="grid gap-8 lg:grid-cols-[310px_1fr]">
        <div><p className="font-mono text-[9px] uppercase tracking-[.2em] text-[#e0a17f]">How the file works</p><h2 className="mt-4 text-3xl">Prepare evidence before polish.</h2></div>
        <div className="grid gap-px bg-white/12 sm:grid-cols-3">
          {[["01","Understand","Paste the exact portal prompt and identify every part."],["02","Respond","Use specific actions, outcomes, and honest reflection."],["03","Revise","Use feedback to strengthen evidence without losing your voice."]].map(([n,title,text]) => <div key={n} className="bg-[#1d3d38] p-5"><span className="font-mono text-[9px] text-[#e0a17f]">{n}</span><h3 className="mt-4 text-xl">{title}</h3><p className="mt-2 text-xs leading-6 text-white/42">{text}</p></div>)}
        </div>
      </div>
    </section>
  </main>;
}
