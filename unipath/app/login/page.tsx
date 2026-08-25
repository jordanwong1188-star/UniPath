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

  const submit = (event: FormEvent) => {
    event.preventDefault();
    signInPreview(name.trim() || "Student", email.trim());
    router.push("/dashboard");
  };

  return <main className="min-h-screen bg-[#132c29] text-[#f2ede2]">
    <SiteHeader dark />
    <div className="mx-auto grid min-h-[calc(100vh-81px)] max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1fr_470px] lg:px-10 lg:py-20">
      <section className="max-w-xl">
        <span className="inline-flex items-center gap-2 border border-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[.14em] text-[#d7cdbd]"><ShieldCheck className="h-4 w-4" /> Student workspace</span>
        <h1 className="mt-7 text-5xl leading-[1.02] sm:text-6xl">One place for every version of your plan.</h1>
        <p className="mt-6 text-lg leading-8 text-white/55">Keep schools, supplemental drafts, practice attempts, feedback, and saved dates together—then see how your application evolves.</p>
        <div className="mt-9 grid gap-3 sm:grid-cols-2">
          {["Saved programs and schools", "Draft and attempt history", "Feedback in one timeline", "Private student workspace"].map(item => <div key={item} className="flex items-center gap-2 text-sm text-white/50"><CheckCircle2 className="h-4 w-4 text-[#d4865f]" />{item}</div>)}
        </div>
      </section>

      <form onSubmit={submit} className="border border-white/12 bg-[#1d3d38] p-7 sm:p-9">
        <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#e0a17f]">Your account</p>
        <h2 className="mt-3 text-3xl">Create your profile</h2>
        <p className="mt-3 text-sm leading-6 text-white/45">Start with UniPath’s free research and planning workspace. You can choose a feedback plan whenever you need application practice.</p>
        <label className="mt-8 block text-sm font-semibold">Your name<input required value={name} onChange={e => setName(e.target.value)} className="mt-2 w-full border border-white/12 bg-[#102724] px-4 py-3.5 text-white outline-none placeholder:text-white/25 focus:border-[#d4865f]" placeholder="Your full name" /></label>
        <label className="mt-5 block text-sm font-semibold">Email address<input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full border border-white/12 bg-[#102724] px-4 py-3.5 text-white outline-none placeholder:text-white/25 focus:border-[#d4865f]" placeholder="you@email.com" /></label>
        <button className="mt-7 flex w-full items-center justify-center gap-2 bg-[#d4865f] px-5 py-4 font-semibold text-[#132c29] transition hover:bg-[#e0a17f]">Enter your workspace <ArrowRight className="h-4 w-4" /></button>
        <p className="mt-5 text-center text-xs leading-5 text-white/30">Your selected schools, drafts, and planning progress stay together in your workspace.</p>
        <Link href="/pricing" className="mt-5 block text-center text-sm font-semibold text-[#e0a17f] hover:text-white">Compare membership plans</Link>
      </form>
    </div>
  </main>;
}
