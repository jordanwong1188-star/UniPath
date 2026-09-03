"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import { useStudent } from "../components/StudentProvider";

export default function LoginPage() {
  const router = useRouter();
  const { refreshAccount } = useStudent();
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendAfter, setResendAfter] = useState(0);

  /* eslint-disable react-hooks/set-state-in-effect -- Read the one-time auth redirect from browser history after hydration. */
  useEffect(() => {
    const url = new URL(window.location.href);
    const fragment = new URLSearchParams(url.hash.slice(1));
    if (fragment.has("error")) {
      setMode("login");
      setError("This confirmation link is invalid or expired. Request a new link below.");
    } else if (url.searchParams.get("confirmed") === "1") {
      setMode("login");
      setNotice("After confirming your email, sign in below to continue. If the link expired, request another.");
    }
    // Never retain Supabase tokens in browser history or local storage.
    if (url.hash) window.history.replaceState(null, "", `${url.pathname}${url.search}`);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  async function resendConfirmation() {
    if (Date.now() < resendAfter) { setError("Please wait one minute before requesting another email."); return; }
    setLoading(true); setError(""); setNotice("");
    try {
      const response = await fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "resend", email }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Unable to request confirmation.");
      setNotice(data.message); setResendAfter(Date.now() + 60000);
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to request confirmation."); }
    finally { setLoading(false); }
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true); setError(""); setNotice("");
    try {
      const response = await fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: mode, fullName: name, email, password }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Unable to access your account.");
      if (data?.requiresConfirmation) { setNotice("Check your email and confirm your UniPath account, then return here to sign in."); setMode("login"); return; }
      await refreshAccount();
      router.push("/dashboard"); router.refresh();
    } catch (submitError) { setError(submitError instanceof Error ? submitError.message : "Unable to access your account."); }
    finally { setLoading(false); }
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
        <h2 className="mt-3 text-3xl">{mode === "signup" ? "Create your account" : "Welcome back"}</h2>
        <p className="mt-3 text-sm leading-6 text-white/45">{mode === "signup" ? "Start with UniPath’s free research and planning workspace. You can choose a feedback plan whenever you need application practice." : "Sign in to open your saved account and membership."}</p>
        {mode === "signup" ? <label className="mt-8 block text-sm font-semibold">Your name<input required value={name} onChange={e => setName(e.target.value)} className="mt-2 w-full border border-white/12 bg-[#102724] px-4 py-3.5 text-white outline-none placeholder:text-white/25 focus:border-[#d4865f]" placeholder="Your full name" /></label> : null}
        <label className="mt-5 block text-sm font-semibold">Email address<input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full border border-white/12 bg-[#102724] px-4 py-3.5 text-white outline-none placeholder:text-white/25 focus:border-[#d4865f]" placeholder="you@email.com" /></label>
        <label className="mt-5 block text-sm font-semibold">Password<input required minLength={8} type="password" autoComplete={mode === "signup" ? "new-password" : "current-password"} value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full border border-white/12 bg-[#102724] px-4 py-3.5 text-white outline-none placeholder:text-white/25 focus:border-[#d4865f]" placeholder="At least 8 characters" /></label>
        {error ? <p role="alert" className="mt-4 text-sm text-[#f0aa88]">{error}</p> : null}
        {notice ? <p role="status" className="mt-4 border border-[#e0a17f]/30 bg-[#e0a17f]/10 p-3 text-sm leading-6 text-[#f2d3bf]">{notice}</p> : null}
        <button disabled={loading} className="mt-7 flex w-full items-center justify-center gap-2 bg-[#d4865f] px-5 py-4 font-semibold text-[#132c29] transition hover:bg-[#e0a17f] disabled:opacity-60">{loading ? "Please wait…" : mode === "signup" ? "Create free account" : "Sign in"} <ArrowRight className="h-4 w-4" /></button>
        <button type="button" onClick={() => { setMode(mode === "signup" ? "login" : "signup"); setError(""); setNotice(""); }} className="mt-5 w-full text-center text-sm font-semibold text-[#e0a17f] hover:text-white">{mode === "signup" ? "Already have an account? Sign in" : "New to UniPath? Create an account"}</button>
        <button type="button" disabled={loading || !email.trim()} onClick={resendConfirmation} className="mt-5 w-full text-center text-sm text-[#e0a17f] disabled:opacity-50">Resend confirmation email</button>
        <p className="mt-3 text-center text-xs leading-5 text-white/50">Enter your email above to resend. Check spam and use the newest link. Still stuck? <a className="underline" href="mailto:unipath.guidance@gmail.com">Contact support</a>.</p>
        <p className="mt-5 text-center text-xs leading-5 text-white/30">Your membership is secured through your verified UniPath account.</p>
        <Link href="/pricing" className="mt-5 block text-center text-sm font-semibold text-[#e0a17f] hover:text-white">Compare membership plans</Link>
      </form>
    </div>
  </main>;
}
