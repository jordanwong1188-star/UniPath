"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useStudent } from "./StudentProvider";

const links = [["Universities", "/universities"], ["Programs", "/programs"], ["Deadlines", "/deadlines"], ["Scholarships", "/scholarships"], ["Applications", "/applications"]];

export default function SiteHeader({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const { student } = useStudent();
  return <header className={`relative z-50 border-b ${dark ? "border-white/10 bg-[#10191d] text-white" : "border-black/5 bg-white/90 text-[#172126]"}`}>
    <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
      <Link href="/" className="flex items-center gap-3 font-semibold"><span className={`grid h-10 w-10 place-items-center rounded-xl ${dark ? "bg-[#d7ff72] text-[#172126]" : "bg-[#172126] text-white"}`}>U</span><span className="text-xl">UniPath</span></Link>
      <nav className="hidden items-center gap-6 text-sm font-semibold lg:flex">{links.map(([label, href]) => <Link key={href} href={href} className="opacity-65 transition hover:opacity-100">{label}</Link>)}</nav>
      <div className="hidden items-center gap-3 lg:flex"><Link href="/pricing" className="px-3 py-2 text-sm font-semibold opacity-70 hover:opacity-100">Pricing</Link><Link href={student ? "/dashboard" : "/login"} className={`rounded-full px-5 py-2.5 text-sm font-semibold ${dark ? "bg-white text-[#172126]" : "bg-[#172126] text-white"}`}>{student ? "My workspace" : "Log in"}</Link></div>
      <button type="button" aria-label="Toggle navigation" onClick={() => setOpen(value => !value)} className="lg:hidden">{open ? <X /> : <Menu />}</button>
    </div>
    {open ? <nav className={`absolute left-0 right-0 top-20 grid gap-1 border-b p-5 shadow-xl lg:hidden ${dark ? "border-white/10 bg-[#10191d]" : "border-black/5 bg-white"}`}>{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 font-semibold hover:bg-black/5">{label}</Link>)}<Link href={student ? "/dashboard" : "/login"} className="mt-2 rounded-xl bg-[#d7ff72] px-4 py-3 font-semibold text-[#172126]">{student ? "My workspace" : "Log in"}</Link></nav> : null}
  </header>;
}
