"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Award, Building2, Search, SlidersHorizontal } from "lucide-react";
import { scholarshipFields, scholarshipSchools, scholarships } from "@/data/scholarships";

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

  return <main className="min-h-screen bg-[#f4f1ea] text-[#172126]">
    <header className="border-b border-black/5 bg-white"><div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10"><Link href="/" className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#172126] font-bold text-white">U</span><span className="text-xl font-bold">UniPath</span></Link><nav className="flex items-center gap-5 text-sm font-semibold"><Link href="/applications">Applications</Link><Link href="/deadlines">Deadlines</Link></nav></div></header>
    <section className="border-b border-black/5 bg-[#1e3b37] text-white"><div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-18"><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#b9dfd4]"><Award className="h-4 w-4" /> Scholarship counsellor</div><h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">Find funding that fits<br /><span className="text-[#ffd48a]">your actual path.</span></h1><p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">Choose where and what you want to study. UniPath combines matching university awards with external opportunities and shows exactly how each one is earned.</p></div></section>

    <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
      <div className="grid gap-7 lg:grid-cols-[290px_1fr]">
        <aside className="h-fit rounded-2xl bg-white p-5 shadow-sm lg:sticky lg:top-6"><div className="flex items-center gap-2"><SlidersHorizontal className="h-4 w-4 text-[#2f6d62]" /><h2 className="font-semibold">Your scholarship profile</h2></div><div className="mt-6 space-y-5">
          <label className="block"><span className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">Desired school</span><select value={school} onChange={event => setSchool(event.target.value)} className="mt-2 w-full cursor-pointer rounded-xl border border-black/10 bg-[#faf9f6] px-3 py-3 text-sm outline-none focus:border-[#2f6d62]"><option value="">All schools</option>{scholarshipSchools.map(item => <option key={item}>{item}</option>)}</select></label>
          <label className="block"><span className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">Program area</span><select value={field} onChange={event => setField(event.target.value)} className="mt-2 w-full cursor-pointer rounded-xl border border-black/10 bg-[#faf9f6] px-3 py-3 text-sm outline-none focus:border-[#2f6d62]">{scholarshipFields.map(item => <option key={item}>{item}</option>)}</select></label>
          <div><span className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">Award source</span><div className="mt-2 grid grid-cols-3 gap-1 rounded-xl bg-[#edf1ee] p-1">{["All", "University", "External"].map(item => <button type="button" key={item} onClick={() => setScope(item)} className={`cursor-pointer rounded-lg px-2 py-2 text-xs font-semibold ${scope === item ? "bg-white shadow-sm" : "text-gray-500"}`}>{item}</button>)}</div></div>
          <label className="block"><span className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">Keyword</span><div className="mt-2 flex items-center gap-2 rounded-xl border border-black/10 bg-[#faf9f6] px-3"><Search className="h-4 w-4 text-gray-400" /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Leadership, need, STEM…" className="w-full bg-transparent py-3 text-sm outline-none" /></div></label>
        </div><div className="mt-6 rounded-xl bg-[#e6f0ec] p-4 text-sm leading-6 text-[#315c54]"><strong>{results.length} matches.</strong> External awards appear when they can be used at your selected university.</div></aside>

        <div><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2f6d62]">Matched opportunities</p><h2 className="mt-2 text-3xl font-semibold">Your funding shortlist</h2></div><p className="max-w-sm text-right text-xs leading-5 text-gray-400">Verified starting catalog—not a guarantee of every award. Always confirm the current cycle with the official provider.</p></div>
          <div className="mt-6 space-y-4">{results.map(item => <article key={item.id} className="group rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start"><div><div className="flex flex-wrap gap-2"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.scope === "External" ? "bg-[#f1e6d2] text-[#765928]" : "bg-[#e6f0ec] text-[#2f6d62]"}`}>{item.scope}</span><span className="rounded-full bg-[#f4f4f4] px-3 py-1 text-xs font-semibold text-gray-500">{item.application}</span></div><h3 className="mt-4 text-2xl font-semibold">{item.name}</h3><p className="mt-1 flex items-center gap-2 text-sm text-gray-500"><Building2 className="h-4 w-4" /> {item.provider}</p></div><Link href={`/scholarships/${item.id}`} className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#172126] px-4 py-3 text-sm font-semibold text-white">View award plan <ArrowRight className="h-4 w-4" /></Link></div><div className="mt-6 grid gap-5 border-t border-black/5 pt-5 sm:grid-cols-3"><div><p className="text-xs font-semibold uppercase tracking-[0.1em] text-gray-400">Potential value</p><p className="mt-2 text-sm font-semibold">{item.value}</p></div><div><p className="text-xs font-semibold uppercase tracking-[0.1em] text-gray-400">Deadline</p><p className="mt-2 text-sm font-semibold">{item.deadline}</p></div><div><p className="text-xs font-semibold uppercase tracking-[0.1em] text-gray-400">Best fit</p><p className="mt-2 text-sm text-gray-600">{item.criteria.slice(0, 2).join(" · ")}</p></div></div></article>)}</div>
        </div>
      </div>
    </section>
  </main>;
}
