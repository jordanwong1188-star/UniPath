import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import SiteHeader from "../components/SiteHeader";

const plans = [
  { id: "free", name: "Free", descriptor: "Research before you commit", regular: null, price: "0", credits: "5 AI credits / month", accent: false, features: ["Browse all universities and program pages", "Use public deadline and scholarship directories", "Build one basic shortlist", "Try written supplemental feedback", "5 monthly credits for AI-assisted actions"], excluded: ["No saved feedback history", "No full interview review", "Limited workspace storage"], cta: "Start free", href: "/login?plan=free" },
  { id: "pro", name: "Pro", descriptor: "For an active application season", regular: "$24", price: "16", credits: "200 AI credits / month", accent: true, features: ["Everything in Free", "Full written supplemental practice", "Recorded interview practice and feedback", "Program-specific rubrics and revision priorities", "Saved drafts, attempts, shortlists, and feedback history", "Transfer readiness and funding tools", "200 monthly credits for AI-assisted actions"], excluded: [], cta: "Choose Pro", href: "/login?plan=pro" },
  { id: "max", name: "Max", descriptor: "For heavy practice across many programs", regular: "$49", price: "34", credits: "600 AI credits / month", accent: false, features: ["Everything in Pro", "3× the monthly AI credits", "Higher interview and feedback capacity", "Larger application and attempt history", "Priority processing during peak application weeks", "Best for students applying across several schools", "600 monthly credits for AI-assisted actions"], excluded: [], cta: "Choose Max", href: "/login?plan=max" },
] as const;

const creditUses = [["1 credit", "AI admissions question"], ["3 credits", "Written-response feedback"], ["4 credits", "Interview transcript feedback"], ["Credits reset", "At the start of each billing month"]];

export default function PricingPage() {
  return <main className="min-h-screen bg-[#132c29] text-[#f2ede2]">
    <SiteHeader dark />
    <section className="border-b border-white/12"><div className="mx-auto grid max-w-7xl lg:grid-cols-[310px_1fr]">
      <header className="border-b border-white/12 px-6 py-12 lg:border-b-0 lg:border-r lg:px-10 lg:py-16"><p className="font-mono text-[9px] font-semibold uppercase tracking-[.2em] text-[#e0a17f]">Membership / 2026–27</p><h1 className="mt-5 text-4xl leading-[1.02] sm:text-5xl">Choose the amount of practice you need.</h1><p className="mt-5 text-sm leading-7 text-white/48">Research stays accessible. Paid plans cover the feedback, interview review, saved progress, and heavier application work that uses AI processing.</p></header>
      <div className="bg-[#1d3d38] px-6 py-10 lg:px-10 lg:py-14"><div className="inline-flex border border-[#d4865f]/40 bg-[#d4865f]/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[.16em] text-[#e0a17f]">Back-to-school launch pricing · through October 15, 2026</div><p className="mt-5 max-w-2xl text-sm leading-7 text-white/58">Prices are monthly in CAD. Cancel before the next billing period. Launch prices apply for the displayed promotional period; regular prices are shown for transparency.</p></div>
    </div></section>

    <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16"><div className="grid items-start gap-px bg-white/15 lg:grid-cols-3">
      {plans.map(plan => <article key={plan.id} className={`relative bg-[#1d3d38] p-6 sm:p-8 ${plan.accent ? "lg:-mt-3 lg:border-t-4 lg:border-[#d4865f] lg:pb-11" : ""}`}>
        {plan.accent ? <p className="absolute right-5 top-5 font-mono text-[9px] font-semibold uppercase tracking-[.16em] text-[#e0a17f]">Most practical</p> : null}
        <p className="font-mono text-[9px] uppercase tracking-[.17em] text-white/32">{plan.descriptor}</p><h2 className="mt-4 text-4xl">{plan.name}</h2>
        <div className="mt-7 border-y border-white/12 py-6">
          {plan.regular ? <p className="text-xs text-white/35"><span className="line-through">{plan.regular}</span> regular monthly price</p> : <p className="text-xs text-white/35">No payment required</p>}
          <div className="mt-2 flex items-end gap-2"><span className="font-serif text-6xl leading-none">$${plan.price}</span><span className="pb-1 text-sm text-white/42">CAD / month</span></div>
          <p className="mt-4 text-sm font-semibold text-[#e0a17f]">{plan.credits}</p>
        </div>
        <p className="mt-6 text-[10px] font-semibold uppercase tracking-[.16em] text-white/30">What is included</p>
        <ul className="mt-4 space-y-3">{plan.features.map(feature => <li key={feature} className="flex gap-3 text-sm leading-6 text-white/65"><Check className="mt-1 h-3.5 w-3.5 shrink-0 text-[#e0a17f]" />{feature}</li>)}</ul>
        {plan.excluded.length ? <ul className="mt-5 border-t border-white/10 pt-4">{plan.excluded.map(feature => <li key={feature} className="py-1 text-xs text-white/28">— {feature}</li>)}</ul> : null}
        <Link href={plan.href} className={`mt-8 flex items-center justify-between px-4 py-3 text-sm font-semibold ${plan.accent ? "bg-[#d4865f] text-[#132c29]" : "border border-white/18 text-white"}`}>{plan.cta}<ArrowRight className="h-4 w-4" /></Link>
        {plan.id !== "free" ? <details className="group mt-3 border border-white/12"><summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-xs font-semibold text-white/62"><span>Why choose {plan.name}?</span><span className="text-[#e0a17f] group-open:rotate-45">+</span></summary><div className="border-t border-white/10 px-4 py-4 text-xs leading-6 text-white/48">{plan.id === "pro" ? "Pro is designed for the normal Canadian application season. It unlocks every UniPath practice and organization feature, while 200 credits allow substantial written and interview feedback without charging you for unlimited usage you may never need." : "Max is worthwhile when you are applying to many supplemental-heavy programs or repeating interviews and written responses frequently. It includes every Pro feature, but triples the monthly credit allowance so intensive practice is less likely to pause near a deadline."}</div></details> : <div className="mt-3 border border-white/8 px-4 py-3 text-xs leading-5 text-white/35">Use Free to research and test the workflow before deciding whether feedback tools are useful for your applications.</div>}
      </article>)}
    </div></section>

    <section className="border-y border-white/12 bg-[#102724]"><div className="mx-auto grid max-w-7xl lg:grid-cols-[310px_1fr]">
      <div className="border-b border-white/12 px-6 py-10 lg:border-b-0 lg:border-r lg:px-10"><p className="font-mono text-[9px] uppercase tracking-[.2em] text-[#e0a17f]">How credits work</p><h2 className="mt-4 text-3xl">Usage you can predict.</h2><p className="mt-4 text-sm leading-7 text-white/42">Browsing, filtering, writing, saving, and using checklists do not consume credits. Credits apply only when UniPath asks an AI model to generate a new analysis.</p></div>
      <div className="grid gap-px bg-white/12 sm:grid-cols-2">{creditUses.map(([cost,use]) => <div key={use} className="bg-[#132c29] p-6"><p className="font-serif text-2xl text-[#e0a17f]">{cost}</p><p className="mt-2 text-xs text-white/45">{use}</p></div>)}</div>
    </div></section>
    <section className="mx-auto max-w-4xl px-6 py-14 text-center"><h2 className="text-3xl">No unlimited-AI promise hidden in the fine print.</h2><p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/45">Credit limits keep pricing sustainable and help UniPath continue offering accurate program research and useful feedback. Billing is not yet active in this testing version; selecting a plan opens the current account preview.</p></section>
  </main>;
}
