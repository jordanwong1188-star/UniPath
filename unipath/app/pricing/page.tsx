import Link from "next/link";
import { ArrowRight, Check, LockKeyhole } from "lucide-react";
import SiteHeader from "../components/SiteHeader";

const features = ["Program-specific supplemental practice", "Detailed rubric feedback and revision priorities", "Unlimited saved drafts and attempt history", "Saved universities, programs, and application plans", "Deadline and scholarship organization", "Interview practice with accurate format guidance"];

export default function PricingPage() {
  return <main className="min-h-screen bg-[#0f1823] text-white">
    <SiteHeader dark />
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-[#557b80]/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-6 py-20 text-center lg:px-10 lg:py-24">
        <span className="inline-flex rounded-full border border-[#7891a3]/25 bg-[#7891a3]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[.16em] text-[#a8bac5]">UniPath membership</span>
        <h1 className="mx-auto mt-7 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-.055em] sm:text-7xl">One organized path through every application.</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/50">Explore university information publicly. Unlock the personal workspace, saved progress, supplemental coaching, and feedback history with membership.</p>

        <div className="mx-auto mt-14 max-w-xl rounded-[2rem] border border-white/10 bg-[#172536] p-2 text-left shadow-2xl shadow-black/25">
          <div className="rounded-[1.55rem] border border-white/7 bg-[#111c29] p-7 sm:p-9">
            <div className="flex items-start justify-between gap-5"><div><p className="text-[11px] font-semibold uppercase tracking-[.17em] text-[#8fa7b6]">Student membership</p><h2 className="mt-2 text-3xl font-semibold">UniPath Complete</h2></div><div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#7891a3]/12 text-[#a8bac5]"><LockKeyhole className="h-5 w-5" /></div></div>
            <div className="mt-6 border-y border-white/8 py-6"><p className="text-xs font-semibold uppercase tracking-[.14em] text-white/30">Launch pricing</p><p className="mt-2 text-2xl font-semibold">To be finalized</p><p className="mt-1 text-sm text-white/35">before checkout integration</p></div>
            <ul className="mt-6 space-y-3">{features.map(item => <li key={item} className="flex gap-3 text-sm leading-6 text-white/60"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#7891a3]/12 text-[#a8bac5]"><Check className="h-3 w-3" /></span>{item}</li>)}</ul>
            <Link href="/login" className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-[#9fb2bd] px-5 py-4 font-semibold text-[#0b121b] shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#b0c0c9]">Try the workspace preview <ArrowRight className="h-4 w-4" /></Link>
            <p className="mt-4 text-center text-xs text-white/30">Preview only—no card or payment is collected.</p>
          </div>
        </div>
      </div>
    </section>
  </main>;
}
