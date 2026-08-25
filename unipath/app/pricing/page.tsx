import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import SubscribeButton from "../components/SubscribeButton";

const plans = [
  { id: "free", name: "Free", descriptor: "Build a clear application plan", regular: null, price: "0", allowance: "No AI usage included", accent: false, features: ["Browse all university and program records", "Search deadlines and scholarship directories", "Build a focused university shortlist", "Use transfer course and credit references", "Organize application and supplemental checklists"], excluded: ["AI feedback and interview grading are not included", "No saved feedback history", "Limited workspace storage"], cta: "Create free account" },
  { id: "pro", name: "Pro", descriptor: "For an active application season", regular: "$24", price: "16", allowance: "200 feedback credits / month", accent: true, features: ["Everything in Free", "Full written supplemental feedback", "Recorded interview practice and assessment", "Program-specific rubrics and revision priorities", "Saved drafts, attempts, shortlists, and feedback history", "Transfer readiness and funding tools", "200 monthly credits for feedback actions"], excluded: [], cta: "Choose Pro" },
  { id: "max", name: "Max", descriptor: "For heavy practice across many programs", regular: "$49", price: "34", allowance: "600 feedback credits / month", accent: false, features: ["Everything in Pro", "3× the monthly feedback credits", "Higher interview and written-review capacity", "Larger application and attempt history", "Priority processing during peak application weeks", "Best for students applying across several schools", "600 monthly credits for feedback actions"], excluded: [], cta: "Choose Max" },
] as const;

const creditUses = [["1 credit", "Admissions research question"], ["3 credits", "Written-response feedback"], ["4 credits", "Interview transcript assessment"], ["Monthly reset", "A fresh allowance each billing month"]];

export default function PricingPage() {
  return <main className="min-h-screen bg-[#132c29] text-[#f2ede2]">
    <SiteHeader dark />
    <section className="border-b border-white/12"><div className="mx-auto grid max-w-7xl lg:grid-cols-[310px_1fr]">
      <header className="border-b border-white/12 px-6 py-12 lg:border-b-0 lg:border-r lg:px-10 lg:py-16"><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#e0a17f]">Membership / 2026–27</p><h1 className="mt-5 text-4xl leading-[1.02] sm:text-5xl">Choose the amount of practice you need.</h1><p className="mt-5 text-sm leading-7 text-white/48">University research remains accessible without model usage. Paid plans add written feedback, interview assessment, saved progress, and higher practice capacity.</p></header>
      <div className="bg-[#1d3d38] px-6 py-10 lg:px-10 lg:py-14"><div className="inline-flex border border-[#d4865f]/40 bg-[#d4865f]/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[.16em] text-[#e0a17f]">Back-to-school launch pricing · through October 15, 2026</div><p className="mt-5 max-w-2xl text-sm leading-7 text-white/58">Prices are monthly in CAD. Cancel before the next billing period. Launch prices apply for the displayed promotional period; regular prices are shown for transparency.</p></div>
    </div></section>

    <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16"><div className="grid items-stretch gap-px bg-white/15 lg:grid-cols-3">
      {plans.map(plan => <article key={plan.id} className={`relative flex h-full flex-col bg-[#1d3d38] p-6 sm:p-8 ${plan.accent ? "lg:-mt-3 lg:border-t-4 lg:border-[#d4865f] lg:pb-11" : ""}`}>
        {plan.accent ? <p className="absolute right-5 top-5 text-[10px] font-semibold uppercase tracking-[.16em] text-[#e0a17f]">Most practical</p> : null}
        <p className="text-[10px] uppercase tracking-[.15em] text-white/32">{plan.descriptor}</p><h2 className="mt-4 text-4xl">{plan.name}</h2>
        <div className="mt-7 border-y border-white/12 py-6">
          {plan.regular ? <p className="text-xs text-white/35"><span className="line-through">{plan.regular}</span> regular monthly price</p> : <p className="text-xs text-white/35">No payment required</p>}
          <div className="mt-2 flex items-end gap-2"><span className="font-serif text-6xl leading-none">{"$"}{plan.price}</span><span className="pb-1 text-sm text-white/42">CAD / month</span></div>
          <p className="mt-4 text-sm font-semibold text-[#e0a17f]">{plan.allowance}</p>
        </div>
        <div className="flex-1">
        <p className="mt-6 text-[10px] font-semibold uppercase tracking-[.16em] text-white/30">What is included</p>
        <ul className="mt-4 space-y-3">{plan.features.map(feature => <li key={feature} className="flex gap-3 text-sm leading-6 text-white/65"><Check className="mt-1 h-3.5 w-3.5 shrink-0 text-[#e0a17f]" />{feature}</li>)}</ul>
        {plan.excluded.length ? <ul className="mt-5 border-t border-white/10 pt-4">{plan.excluded.map(feature => <li key={feature} className="py-1 text-xs text-white/28">— {feature}</li>)}</ul> : null}
        </div>
        <div className="mt-auto">
        {plan.id === "free"
          ? <Link href="/login?plan=free" className="mt-8 flex items-center justify-between border border-white/18 px-4 py-3 text-sm font-semibold text-white">{plan.cta}<ArrowRight className="h-4 w-4" /></Link>
          : <SubscribeButton plan={plan.id} label={plan.cta} featured={plan.accent} />}
        {plan.id !== "free" ? <details className="group mt-3 border border-white/12"><summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-xs font-semibold text-white/62"><span>Why choose {plan.name}?</span><span className="text-[#e0a17f] group-open:rotate-45">+</span></summary><div className="border-t border-white/10 px-4 py-4 text-xs leading-6 text-white/48">{plan.id === "pro" ? "Pro is designed for a normal Canadian application season. It unlocks every UniPath practice and organization feature, while 200 credits provide substantial written and interview feedback without making you pay for unlimited usage you may never need." : "Max is worthwhile when you are applying to many supplemental-heavy programs or repeating interviews and written responses frequently. It includes every Pro feature and triples the monthly allowance so intensive practice is less likely to pause near a deadline."}</div></details> : <div className="mt-3 border border-white/8 px-4 py-3 text-xs leading-5 text-white/35">Free is a useful planning toolkit: research programs, compare requirements, find funding, organize deadlines, and build your shortlist without consuming API resources.</div>}
        </div>
      </article>)}
    </div></section>

    <section className="border-y border-white/12 bg-[#102724]"><div className="mx-auto grid max-w-7xl lg:grid-cols-[310px_1fr]">
      <div className="border-b border-white/12 px-6 py-10 lg:border-b-0 lg:border-r lg:px-10"><p className="text-[10px] uppercase tracking-[.18em] text-[#e0a17f]">How credits work</p><h2 className="mt-4 text-3xl">Usage you can predict.</h2><p className="mt-4 text-sm leading-7 text-white/42">Free research, filtering, writing, saving, and checklists never consume credits. Credits are reserved for paid feedback and assessment actions that call a language model.</p></div>
      <div className="grid gap-px bg-white/12 sm:grid-cols-2">{creditUses.map(([cost,use]) => <div key={use} className="bg-[#132c29] p-6"><p className="font-serif text-2xl text-[#e0a17f]">{cost}</p><p className="mt-2 text-xs text-white/45">{use}</p></div>)}</div>
    </div></section>
    <section className="mx-auto max-w-4xl px-6 py-14 text-center"><h2 className="text-3xl">Clear limits, no surprise usage.</h2><p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/45">Pro and Max use secure Stripe Checkout. Credit limits keep subscription costs predictable while preserving free access to UniPath’s core Canadian university research and planning tools.</p></section>
  </main>;
}
