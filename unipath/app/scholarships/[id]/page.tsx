import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, ExternalLink, Flag, Target } from "lucide-react";
import { scholarships } from "@/data/scholarships";
import SiteHeader from "@/app/components/SiteHeader";

export function generateStaticParams() { return scholarships.map(item => ({ id: item.id })); }

export default async function ScholarshipDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = scholarships.find(entry => entry.id === id);
  if (!item) notFound();

  return <main className="min-h-screen bg-[#101923] text-[#e8edf3]">
    <SiteHeader dark />
    <section className="border-b border-white/10 bg-[#0d1620]"><div className="mx-auto max-w-6xl px-6 py-14 lg:px-10"><Link href="/scholarships" className="inline-flex items-center gap-2 text-sm font-semibold text-[#9fb2bd]"><ArrowLeft className="h-4 w-4" /> All scholarships</Link><div className="mt-7 flex flex-wrap gap-2"><span className="rounded-full border border-[#7891a3]/20 bg-[#7891a3]/10 px-3 py-1 text-xs font-semibold text-[#a8bac5]">{item.scope}</span><span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-xs font-semibold text-white/55">{item.fundingType}</span>{item.applicantTypes.map(type => <span key={type} className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-xs font-semibold text-white/55">{type}</span>)}</div><h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">{item.name}</h1><p className="mt-4 text-lg text-white/55">{item.provider} · {item.cycle}</p><div className="mt-8 grid gap-4 sm:grid-cols-3"><div className="rounded-2xl border border-white/10 bg-[#172536] p-5"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/35">Potential value</p><p className="mt-2 text-xl font-semibold text-[#a8bac5]">{item.value}</p></div><div className="rounded-2xl border border-white/10 bg-[#172536] p-5"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/35">Deadline</p><p className="mt-2 text-lg font-semibold">{item.deadline}</p></div><div className="rounded-2xl border border-white/10 bg-[#172536] p-5"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/35">Application</p><p className="mt-2 text-lg font-semibold">{item.application}</p></div></div></div></section>
    <section className="mx-auto grid max-w-6xl gap-7 px-6 py-10 lg:grid-cols-[1fr_340px] lg:px-10">
      <div className="space-y-7"><section className="rounded-2xl border border-white/10 bg-[#172536] p-6 sm:p-8"><div className="flex items-center gap-3"><Target className="h-5 w-5 text-[#8fa7b6]" /><h2 className="text-2xl font-semibold">What selectors are looking for</h2></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{item.criteria.map(value => <div key={value} className="flex items-start gap-3 rounded-xl bg-[#111c29] p-4 text-sm leading-6 text-white/65"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#7891a3]" />{value}</div>)}</div></section>
        <section className="rounded-2xl border border-white/10 bg-[#172536] p-6 sm:p-8"><div className="flex items-center gap-3"><Flag className="h-5 w-5 text-[#8fa7b6]" /><h2 className="text-2xl font-semibold">Your application game plan</h2></div><div className="mt-6 space-y-5">{item.steps.map((step, index) => <div key={step} className="flex gap-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#7891a3]/15 text-sm font-bold text-[#a8bac5]">{index + 1}</span><div className="border-b border-white/10 pb-5 text-sm leading-6 text-white/55">{step}</div></div>)}</div></section>
      </div>
      <aside className="h-fit rounded-2xl border border-white/10 bg-[#111c29] p-6 text-white lg:sticky lg:top-6"><h2 className="text-xl font-semibold">Eligibility check</h2><div className="mt-5 space-y-3">{item.eligibility.map(value => <div key={value} className="flex items-start gap-3 text-sm leading-6 text-white/60"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#8fa7b6]" />{value}</div>)}</div><div className="mt-6 border-t border-white/10 pt-5"><p className="text-xs leading-5 text-white/40">Eligibility and deadlines can change. Transfer students should pay particular attention to year-of-study and prior post-secondary restrictions. Treat the provider as the final authority before applying.</p><a href={item.url} target="_blank" rel="noreferrer" className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#9fb2bd] px-4 py-3 text-sm font-semibold text-[#0b121b]">Open official source <ExternalLink className="h-4 w-4" /></a></div></aside>
    </section>
  </main>;
}
