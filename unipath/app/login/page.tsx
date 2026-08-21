"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import { useStudent } from "../components/StudentProvider";

export default function LoginPage() {
  const { signInPreview } = useStudent();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const submit = (event: FormEvent) => { event.preventDefault(); signInPreview(name.trim() || "Student", email.trim()); router.push("/dashboard"); };

  return <main className="min-h-screen bg-[#101923] text-[#e8edf3]">
    <SiteHeader dark />
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-40 top-24 h-[480px] w-[480px] rounded-full bg-[#557b80]/12 blur-3xl" />
      <div className="relative mx-auto grid min-h-[calc(100vh-81px)] max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1fr_470px] lg:px-10 lg:py-20">
        <section className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-xs font-semibold uppercase tracking-[.16em] text-[#a8bac5]"><ShieldCheck className="h-4 w-4" /> Student workspace</span>
          <h1 className="mt-7 text-5xl font-semibold leading-[1.02] tracking-[-.055em] sm:text-6xl">One place for every<br /><span className="text-[#92aebb]">version of your plan.</span></h1>
          <p className="mt-6 text-lg leading-8 text-[#9ba9b8]">Keep schools, supplemental drafts, practice attempts, feedback, and saved dates together—then see how your application evolves.</p>
          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            {["Saved programs and schools", "Draft and attempt history", "Feedback in one timeline", "Private preview on this browser"].map(item => <div key={item} className="flex items-center gap-2 text-sm text-white/50"><CheckCircle2 className="h-4 w-4 text-[#7891a3]" />{item}</div>)}
          </div>
        </section>

        <form onSubmit={submit} className="rounded-[2rem] border border-white/10 bg-[#172536] p-7 shadow-2xl shadow-black/25 sm:p-9">
          <p className="text-[11px] font-semibold uppercase tracking-[.17em] text-[#8fa7b6]">Workspace preview</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Create your profile</h2>
          <p className="mt-3 text-sm leading-6 text-white/45">Try the saved-work experience. No payment is collected in preview mode.</p>
          <label className="mt-8 block text-sm font-semibold">Your name<input required value={name} onChange={e => setName(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0f1823] px-4 py-3.5 text-white outline-none placeholder:text-white/25" placeholder="Alex Chen" /></label>
          <label className="mt-5 block text-sm font-semibold">Email address<input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0f1823] px-4 py-3.5 text-white outline-none placeholder:text-white/25" placeholder="alex@example.com" /></label>
          <button className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#9fb2bd] px-5 py-4 font-semibold text-[#0b121b] shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#b0c0c9]">Enter preview workspace <ArrowRight className="h-4 w-4" /></button>
          <p className="mt-5 text-center text-xs leading-5 text-white/30">Production login, account recovery, verification, and billing will be connected before public launch.</p>
          <Link href="/pricing" className="mt-5 block text-center text-sm font-semibold text-[#a8bac5] hover:text-white">View membership details</Link>
        </form>
      </div>
    </div>
  </main>;
}
