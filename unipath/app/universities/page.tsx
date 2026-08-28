"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Building2, ChevronDown, GraduationCap, MapPin, Search, SlidersHorizontal } from "lucide-react";
import schools from "@/data/canadianSchools.json";
import UniversityLogo from "@/app/components/UniversityLogo";
import SiteHeader from "@/app/components/SiteHeader";

export default function UniversitiesPage() {
  const [search, setSearch] = useState("");
  const [province, setProvince] = useState("All");
  const [type, setType] = useState("All");

  const provinces = ["All", ...Array.from(new Set(schools.map((school) => school.province))).sort()];
  const filteredSchools = useMemo(() => schools.filter((school) => {
    const term = search.trim().toLowerCase();
    const matchesSearch = !term || [school.name, school.shortName, school.city, school.province].join(" ").toLowerCase().includes(term);
    return matchesSearch && (province === "All" || school.province === province) && (type === "All" || school.type === type);
  }), [search, province, type]);

  return <main className="min-h-screen bg-[#111a25] text-[#e8edf3]">
    <SiteHeader dark />

    <section className="relative overflow-hidden border-b border-white/8">
      <div className="pointer-events-none absolute -right-44 -top-36 h-[520px] w-[520px] rounded-full bg-[#557b80]/16 blur-3xl" />
      <div className="pointer-events-none absolute left-[42%] top-24 h-72 w-72 rounded-full bg-[#7891a3]/8 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1fr_340px] lg:px-10 lg:py-24">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-xs font-semibold uppercase tracking-[.18em] text-[#a8bac5]">
            <Building2 className="h-4 w-4" /> Canadian university directory
          </div>
          <h1 className="mt-7 text-5xl font-semibold leading-[.98] tracking-[-.055em] sm:text-6xl lg:text-7xl">Compare the place.<br /><span className="text-[#e3a63a]">Then compare the program.</span></h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#b9c3bb]">Search Canadian institutions by location and type, then examine the programs, entry paths, and requirements behind each school name.</p>
        </div>
        <div className="self-end rounded-[1.75rem] border border-white/10 bg-white/[.045] p-6 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-white/45">Directory coverage</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-[#172536] p-4"><p className="text-3xl font-semibold">{schools.length}</p><p className="mt-1 text-xs text-white/45">Institutions</p></div>
            <div className="rounded-2xl bg-[#172536] p-4"><p className="text-3xl font-semibold">{new Set(schools.map(s => s.province)).size}</p><p className="mt-1 text-xs text-white/45">Provinces</p></div>
          </div>
          <p className="mt-4 text-sm leading-6 text-white/50">Built for exploration first—not rankings. Start with fit, then compare the details that matter.</p>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
      <div className="rounded-[1.75rem] border border-white/10 bg-[#172536]/75 p-4 shadow-2xl shadow-black/10 backdrop-blur-xl sm:p-5">
        <div className="grid gap-3 lg:grid-cols-[1fr_240px_190px]">
          <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0f1823] px-4 focus-within:border-[#7891a3]/60">
            <Search className="h-4 w-4 shrink-0 text-[#7891a3]" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search school, city, or province…" className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-white/30" />
          </label>
          <label className="relative">
            <select value={province} onChange={(e) => setProvince(e.target.value)} className="w-full appearance-none rounded-xl border border-white/10 bg-[#0f1823] px-4 py-4 pr-10 text-sm text-white outline-none">
              {provinces.map((item) => <option key={item} value={item}>{item === "All" ? "All provinces" : item}</option>)}
            </select><ChevronDown className="pointer-events-none absolute right-4 top-4 h-4 w-4 text-white/35" />
          </label>
          <label className="relative">
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full appearance-none rounded-xl border border-white/10 bg-[#0f1823] px-4 py-4 pr-10 text-sm text-white outline-none">
              <option value="All">All institutions</option><option>University</option><option>College</option>
            </select><ChevronDown className="pointer-events-none absolute right-4 top-4 h-4 w-4 text-white/35" />
          </label>
        </div>
      </div>

      <div className="mb-6 mt-10 flex items-end justify-between gap-4">
        <div><p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.16em] text-[#7891a3]"><SlidersHorizontal className="h-3.5 w-3.5" /> Explore institutions</p><h2 className="mt-2 text-2xl font-semibold tracking-tight">{filteredSchools.length} matching schools</h2></div>
        <p className="hidden text-sm text-white/35 sm:block">Open a card to view its UniPath profile</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSchools.map((school) => <Link key={school.id} href={`/unis/${school.id}`} className="group relative overflow-hidden rounded-[1.5rem] border border-white/9 bg-[#172536] p-6 shadow-xl shadow-black/5 transition hover:-translate-y-1 hover:border-[#7891a3]/35 hover:bg-[#1a2a3b] hover:shadow-2xl hover:shadow-black/15">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#8fa7b6]/50 to-transparent opacity-0 transition group-hover:opacity-100" />
          <div className="flex items-start justify-between gap-4">
            <div className="rounded-2xl bg-white p-2 shadow-sm"><UniversityLogo domain={school.domain} name={school.name} shortName={school.shortName} /></div>
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/35 transition group-hover:border-[#7891a3]/35 group-hover:bg-[#7891a3] group-hover:text-[#0f1823]"><ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></span>
          </div>
          <div className="mt-7">
            <p className="text-[11px] font-semibold uppercase tracking-[.17em] text-[#7891a3]">{school.shortName}</p>
            <h3 className="mt-2 min-h-[3.5rem] text-xl font-semibold leading-7 tracking-tight text-white">{school.name}</h3>
            <div className="mt-5 flex items-center gap-2 border-t border-white/8 pt-4 text-sm text-white/50"><MapPin className="h-4 w-4 text-[#7891a3]" />{school.city}, {school.province}</div>
            <div className="mt-2 flex items-center gap-2 text-xs text-white/35">{school.type === "College" ? <Building2 className="h-3.5 w-3.5" /> : <GraduationCap className="h-3.5 w-3.5" />}{school.type}</div>
          </div>
        </Link>)}
      </div>

      {filteredSchools.length === 0 && <div className="rounded-[1.75rem] border border-white/10 bg-[#172536] p-14 text-center"><Search className="mx-auto h-7 w-7 text-white/25" /><h2 className="mt-4 text-xl font-semibold">No schools found</h2><p className="mt-2 text-sm text-white/45">Try clearing a filter or searching another location.</p></div>}
    </section>
  </main>;
}
