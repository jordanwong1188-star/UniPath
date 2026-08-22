"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useStudent } from "./StudentProvider";

const links = [["Universities", "/universities"], ["Programs", "/programs"], ["Deadlines", "/deadlines"], ["Scholarships", "/scholarships"], ["Applications", "/applications"], ["Match", "/match"]];

export default function SiteHeader({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const { student } = useStudent();
  return <header className={`relative z-50 border-b backdrop-blur-xl ${dark ? "border-white/10 bg-[#0f1823]/90 text-white" : "border-black/10 bg-[#d8dde0]/90 text-[#182431]"}`}>
    <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
      <Link href="/" className="group flex items-center gap-3 font-semibold">
        <span className={`grid h-10 w-10 place-items-center rounded-xl border text-sm font-bold tracking-tight shadow-sm transition group-hover:-translate-y-0.5 ${dark ? "border-white/10 bg-[#8fa7b6] text-[#0b121b]" : "border-[#182431]/10 bg-[#182431] text-white"}`}>U</span>
        <span className="text-xl tracking-[-0.025em]">UniPath</span>
      </Link>
      <nav className="hidden items-center gap-1 rounded-full border border-current/10 bg-current/[0.035] p-1 text-sm font-semibold lg:flex">{links.map(([label, href]) => <Link key={href} href={href} className="rounded-full px-3.5 py-2 opacity-65 transition hover:bg-current/[0.06] hover:opacity-100">{label}</Link>)}</nav>
      <div className="hidden items-center gap-2 lg:flex"><Link href="/pricing" className="rounded-full px-4 py-2.5 text-sm font-semibold opacity-65 hover:bg-current/[0.06] hover:opacity-100">Pricing</Link><Link href={student ? "/dashboard" : "/login"} className={`rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 ${dark ? "bg-white text-[#182431] hover:bg-[#e8edf3]" : "bg-[#182431] text-white hover:bg-[#233448]"}`}>{student ? "My workspace" : "Log in"}</Link></div>
      <button type="button" aria-label="Toggle navigation" onClick={() => setOpen(value => !value)} className="grid h-10 w-10 place-items-center rounded-xl border border-current/10 lg:hidden">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
    </div>
    {open ? <nav className={`absolute left-0 right-0 top-20 grid gap-1 border-b p-5 shadow-2xl lg:hidden ${dark ? "border-white/10 bg-[#111c29]" : "border-black/10 bg-[#d8dde0]"}`}>{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 font-semibold hover:bg-current/[0.06]">{label}</Link>)}<Link href={student ? "/dashboard" : "/login"} className={`mt-2 rounded-xl px-4 py-3 font-semibold ${dark ? "bg-[#8fa7b6] text-[#0b121b]" : "bg-[#182431] text-white"}`}>{student ? "My workspace" : "Log in"}</Link></nav> : null}
  </header>;
}
