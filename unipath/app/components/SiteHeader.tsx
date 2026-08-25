"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useStudent } from "./StudentProvider";

const primary = [
  ["Schools", "/universities"],
  ["Programs", "/programs"],
  ["Transfer", "/transfers"],
  ["Practice", "/applications"],
] as const;

const planning = [
  ["Deadlines", "/deadlines", "Dates and documents"],
  ["Scholarships", "/scholarships", "Entrance, transfer and in-course funding"],
  ["Admissions fit", "/admissions-fit", "Build a realistic shortlist"],
] as const;

export default function SiteHeader({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const [planOpen, setPlanOpen] = useState(false);
  const { student } = useStudent();

  return <header className="relative z-50 border-b border-white/10 bg-[#132c29] text-[#f2ede2]">
    <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-10">
      <Link href="/" className="group flex items-center gap-3" aria-label="UniPath home">
        <span className="border-r border-[#d4865f]/55 pr-3 font-mono text-[10px] font-bold tracking-[.18em] text-[#e0a17f]">UP<br />01</span>
        <span><strong className="block font-serif text-[21px] font-medium leading-none tracking-[-.025em]">UniPath</strong><span className="mt-1 block text-[9px] font-bold uppercase tracking-[.19em] text-white/42">Canadian admissions field guide</span></span>
      </Link>

      <nav className="hidden items-center gap-1 text-[13px] font-semibold lg:flex" aria-label="Primary navigation">
        {primary.map(([label, href]) => <Link key={href} href={href} className="border-b border-transparent px-3 py-2 text-white/68 hover:border-[#d4865f] hover:text-white">{label}</Link>)}
        <div className="relative">
          <button type="button" onClick={() => setPlanOpen(value => !value)} aria-expanded={planOpen} className="border-b border-transparent px-3 py-2 text-white/68 hover:border-[#d4865f] hover:text-white">Plan + funding</button>
          {planOpen ? <div className="absolute right-0 top-12 w-72 border border-white/12 bg-[#1d3d38] p-2 shadow-xl">
            {planning.map(([label, href, note]) => <Link key={href} href={href} onClick={() => setPlanOpen(false)} className="block border-b border-white/8 px-4 py-3 last:border-0 hover:bg-white/[.045]"><span className="block font-serif text-base text-white">{label}</span><span className="mt-1 block text-[11px] font-normal text-white/42">{note}</span></Link>)}
          </div> : null}
        </div>
      </nav>

      <div className="hidden items-center gap-3 lg:flex">
        <Link href={student ? "/dashboard" : "/login"} className="border border-[#d4865f]/45 px-4 py-2.5 text-xs font-bold uppercase tracking-[.08em] text-[#f2ede2] hover:bg-[#d4865f] hover:text-[#132c29]">{student ? "My file" : "Log in"}</Link>
      </div>

      <button type="button" aria-label="Toggle navigation" onClick={() => setOpen(value => !value)} className="grid h-10 w-10 place-items-center border border-white/12 lg:hidden">{open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}</button>
    </div>

    {open ? <nav className="absolute left-0 right-0 top-[76px] border-b border-white/10 bg-[#132c29] p-4 shadow-xl lg:hidden" aria-label="Mobile navigation">
      <div className="grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10">
        {primary.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="bg-[#1d3d38] px-4 py-4 font-serif text-lg hover:bg-[#264942]">{label}</Link>)}
      </div>
      <p className="mb-2 mt-5 text-[9px] font-bold uppercase tracking-[.18em] text-[#e0a17f]">Plan and funding</p>
      {planning.map(([label, href, note]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="flex items-center justify-between border-t border-white/8 py-3"><span className="font-semibold">{label}</span><span className="text-[10px] text-white/35">{note}</span></Link>)}
      <Link href={student ? "/dashboard" : "/login"} onClick={() => setOpen(false)} className="mt-4 block bg-[#d4865f] px-4 py-3 text-center text-sm font-bold text-[#132c29]">{student ? "Open my file" : "Log in"}</Link>
    </nav> : null}
  </header>;
}
