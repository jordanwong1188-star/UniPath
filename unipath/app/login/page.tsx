"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import { useStudent } from "../components/StudentProvider";

export default function LoginPage() {
  const { signInPreview } = useStudent();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const submit = (event: FormEvent) => { event.preventDefault(); signInPreview(name.trim() || "Student", email.trim()); router.push("/dashboard"); };
  return <main className="min-h-screen bg-[#f1f4ed] text-[#172126]"><SiteHeader /><div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1fr_480px] lg:px-10 lg:py-24"><section className="pt-6"><span className="rounded-full bg-[#d7ff72] px-4 py-2 text-xs font-bold uppercase tracking-[.14em]">Student workspace</span><h1 className="mt-7 max-w-xl text-5xl font-semibold tracking-[-.055em] sm:text-6xl">Your applications deserve a place to grow.</h1><p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">Keep every school, supplemental draft, practice attempt, and feedback report together—then compare versions as your writing improves.</p><div className="mt-10 flex items-center gap-3 text-sm text-gray-500"><ShieldCheck className="h-5 w-5 text-emerald-700" /> Preview accounts stay on this browser until the secure account backend is connected.</div></section><form onSubmit={submit} className="rounded-[2rem] bg-white p-7 shadow-xl shadow-black/5 sm:p-9"><p className="text-xs font-bold uppercase tracking-[.15em] text-[#6e5268]">Workspace preview</p><h2 className="mt-3 text-3xl font-semibold">Create your profile</h2><p className="mt-3 text-sm leading-6 text-gray-500">Try the complete saved-work experience. No payment is collected in preview mode.</p><label className="mt-8 block text-sm font-semibold">Your name<input required value={name} onChange={e => setName(e.target.value)} className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3.5 outline-none focus:border-[#6e5268]" placeholder="Alex Chen" /></label><label className="mt-5 block text-sm font-semibold">Email address<input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3.5 outline-none focus:border-[#6e5268]" placeholder="alex@example.com" /></label><button className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#172126] px-5 py-4 font-semibold text-white transition hover:bg-[#26353b]">Enter preview workspace <ArrowRight className="h-4 w-4" /></button><p className="mt-5 text-center text-xs leading-5 text-gray-400">Production login, password recovery, email verification, and billing will be connected before public launch.</p><Link href="/pricing" className="mt-5 block text-center text-sm font-semibold underline underline-offset-4">View membership details</Link></form></div></main>;
}
