"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Award, Building2, Search, SlidersHorizontal, Sparkles, WalletCards } from "lucide-react";
import { scholarshipFields, scholarshipSchools, scholarships } from "@/data/scholarships";
import SiteHeader from "@/app/components/SiteHeader";

export default function ScholarshipsPage() {
  const [school, setSchool] = useState("");
  const [field, setField] = useState("All programs");
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState("All");

  const results = useMemo(() => scholarships.filter(item => {
    const schoolMatch = !school || item.schools.includes(school) || item.schools.some(value => value.startsWith("Any "));
    const fieldMatch = field === "All programs" || item.fields.includes("All programs") || item.fields.includes(field);
    const scopeMatch = scope === "All" || item.scope === scope;
    const text = `${item.name} ${item.provider} ${item.criteria.join(" ")} ${item.fields.join(" ")}`.toLowerCase();
    return schoolMatch && fieldMatch && scopeMatch && (!query.trim() || text.includes(query.toLowerCase()));
  }), [field, query, school, scope]);

  return <main className="min-h-screen bg-[#101923] text-[#e8edf3]">
    <SiteHeader dark />
    <section className="relative overflow-hidden border-b border-white/8 bg-[#0d1620]">
      <div className="pointer-events-none absolute -right-36 -top-40 h-[560px] w-[560px] rounded-full bg-[#557b80]/14 blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_360px] lg:px-10 lg:py-22">
        <div className="relative max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-xs font-semibold uppercase tracking-[.18em] text-[#9fb6c2]"><Award className="h-4 w-4" /> Funding intelligence</div>
          <h1 className="mt-7 text-5xl font-semibold leading-[.98] tracking-[-.055em] sm:text-6xl lg:text-7xl">Funding opportunities,<br /><span className="text-[#92aebb]">matched to your path.</span></h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#99a8b7]">Build a scholarship profile around where and what you want to study. UniPath narrows university and external awards into a cleaner, more actionable shortlist.</p>
        </div>
        <div className="relative self-end rounded-[1.75rem] border border-white/10 bg-[#172536] p-6 shadow-2xl shadow-black/20">
          <div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-white/40">Current match set</p><p className="mt-3 text-5xl font-semibold">{results.length}</p></div><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#7891a3]/15 text-[#9fb6c2]"><WalletCards className="h-6 w-6" /></div></div>
          <div className="mt-6 h-px bg-white/8" />
          <p className="mt-5 text-sm leading-6 text-white/50">Refine your school, program area, source, and keywords below. Always verify the current award cycle with the provider.</p>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-12">
      <div className="grid gap-7 lg:grid-cols-[300px_1fr]">
        <aside className="h-fit rounded-[1.5rem] border border-white/9 bg-[#172536] p-5 shadow-xl shadow-black/10 lg:sticky lg:top-24">
          <div className="flex items-center gap-2 border-b border-white/8 pb-4"><SlidersHorizontal className="h-4 w-4 text-[#8fa7b6]" /><h2 className="font-semibold">Scholarship profile</h2></div>
          <div className="mt-5 space-y-5">
            <label className="block"><span className="text-[11px] font-semibold uppercase tracking-[.15em] text-white/35">Desired school</span><select value={school} onChange={event => setSchool(event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0f1823] px-3 py-3 text-sm text-white outline-none"><option value="">All schools</option>{scholarshipSchools.map(item => <option key={item}>{item}</option>)}</select></label>
            <label className="block"><span className="text-[11px] font-semibold uppercase tracking-[.15em] text-white/35">Program area</span><select value={field} onChange={event => setField(event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0f1823] px-3 py-3 text-sm text-white outline-none">{scholarshipFields.map(item => <option key={item}>{item}</option>)}</select></label>
            <div><span className="text-[11px] font-semibold uppercase tracking-[.15em] text-white/35">Award source</span><div className="mt-2 grid grid-cols-3 gap-1 rounded-xl bg-[#0f1823] p-1">{["All", "University", "External"].map(item => <button type="button" key={item} onClick={() => setScope(item)} className={`rounded-lg px-2 py-2.5 text-xs font-semibold ${scope === item ? "bg-[#7891a3] text-[#0b121b] shadow-sm" : "text-white/45 hover:text-white"}`}>{item}</button>)}</div></div>
            <label className="block"><span className="text-[11px] font-semibold uppercase tracking-[.15em] text-white/35">Keyword</span><div className="mt-2 flex items-center gap-2 rounded-xl border border-white/10 bg-[#0f1823] px-3"><Search className="h-4 w-4 text-[#7891a3]" /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Leadership, need, STEM…" className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/25" /></div></label>
          </div>
          <div className="mt-6 rounded-xl border border-[#7891a3]/15 bg-[#7891a3]/8 p-4 text-sm leading-6 text-[#a9bac5]"><strong className="text-white">{results.length} matches.</strong> External awards remain visible when they can be used at your selected university.</div>
        </aside>

        <div>
          <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.16em] text-[#7891a3]"><Sparkles className="h-3.5 w-3.5" /> Matched opportunities</p><h2 className="mt-2 text-3xl font-semibold tracking-tight">Your funding shortlist</h2></div><p className="max-w-sm text-right text-xs leading-5 text-white/35">A focused starting catalog, not a guarantee of every available award.</p></div>
          <div className="mt-6 space-y-4">{results.map(item => <article key={item.id} className="group overflow-hidden rounded-[1.5rem] border border-white/9 bg-[#172536] p-6 shadow-xl shadow-black/5 hover:border-[#7891a3]/30 hover:bg-[#1a2a3b]">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start"><div><div className="flex flex-wrap gap-2"><span className="rounded-full border border-[#7891a3]/20 bg-[#7891a3]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[.1em] text-[#a8bac5]">{item.scope}</span><span className="rounded-full border border-white/8 bg-white/[.04] px-3 py-1 text-[11px] font-semibold text-white/45">{item.application}</span></div><h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">{item.name}</h3><p className="mt-2 flex items-center gap-2 text-sm text-white/45"><Building2 className="h-4 w-4 text-[#7891a3]" /> {item.provider}</p></div><Link href={`/scholarships/${item.id}`} className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white px-4 py-3 text-sm font-semibold text-[#111c29] shadow-sm transition hover:-translate-y-0.5">View award plan <ArrowRight className="h-4 w-4" /></Link></div>
            <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-white/8 bg-white/8 sm:grid-cols-3"><div className="bg-[#111c29] p-4"><p className="text-[10px] font-semibold uppercase tracking-[.14em] text-white/30">Potential value</p><p className="mt-2 text-sm font-semibold text-white">{item.value}</p></div><div className="bg-[#111c29] p-4"><p className="text-[10px] font-semibold uppercase tracking-[.14em] text-white/30">Deadline</p><p className="mt-2 text-sm font-semibold text-white">{item.deadline}</p></div><div className="bg-[#111c29] p-4"><p className="text-[10px] font-semibold uppercase tracking-[.14em] text-white/30">Best fit</p><p className="mt-2 text-sm leading-5 text-white/55">{item.criteria.slice(0, 2).join(" · ")}</p></div></div>
          </article>)}</div>
        </div>
      </div>
    </section>
  </main>;
}
