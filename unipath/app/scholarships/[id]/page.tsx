import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, ExternalLink, Flag, Target } from "lucide-react";
import { scholarships } from "@/data/scholarships";

export function generateStaticParams() { return scholarships.map(item => ({ id: item.id })); }

export default async function ScholarshipDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = scholarships.find(entry => entry.id === id);
  if (!item) notFound();

  return <main className="min-h-screen bg-[#f4f1ea] text-[#172126]">
    <header className="border-b border-black/5 bg-white"><div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 lg:px-10"><Link href="/" className="text-xl font-bold">UniPath</Link><Link href="/scholarships" className="inline-flex items-center gap-2 text-sm font-semibold"><ArrowLeft className="h-4 w-4" /> All scholarships</Link></div></header>
    <section className="bg-[#1e3b37] text-white"><div className="mx-auto max-w-6xl px-6 py-14 lg:px-10"><div className="flex flex-wrap gap-2"><span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">{item.scope}</span><span className="rounded-full bg-[#ffd48a] px-3 py-1 text-xs font-semibold text-[#172126]">{item.application}</span></div><h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">{item.name}</h1><p className="mt-4 text-lg text-white/65">{item.provider} · {item.cycle}</p><div className="mt-8 grid gap-4 sm:grid-cols-2"><div className="rounded-2xl bg-white/8 p-5"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40">Potential value</p><p className="mt-2 text-xl font-semibold text-[#ffd48a]">{item.value}</p></div><div className="rounded-2xl bg-white/8 p-5"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40">Deadline</p><p className="mt-2 text-xl font-semibold">{item.deadline}</p></div></div></div></section>
    <section className="mx-auto grid max-w-6xl gap-7 px-6 py-10 lg:grid-cols-[1fr_340px] lg:px-10">
      <div className="space-y-7"><section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"><div className="flex items-center gap-3"><Target className="h-5 w-5 text-[#2f6d62]" /><h2 className="text-2xl font-semibold">What selectors are looking for</h2></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{item.criteria.map(value => <div key={value} className="flex items-start gap-3 rounded-xl bg-[#f5f7f5] p-4 text-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2f6d62]" />{value}</div>)}</div></section>
        <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"><div className="flex items-center gap-3"><Flag className="h-5 w-5 text-[#8c4964]" /><h2 className="text-2xl font-semibold">Your application game plan</h2></div><div className="mt-6 space-y-5">{item.steps.map((step, index) => <div key={step} className="flex gap-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eadde2] text-sm font-bold text-[#692f46]">{index + 1}</span><div className="border-b border-black/5 pb-5 text-sm leading-6 text-gray-600">{step}</div></div>)}</div></section>
      </div>
      <aside className="h-fit rounded-2xl bg-[#172126] p-6 text-white lg:sticky lg:top-6"><h2 className="text-xl font-semibold">Eligibility check</h2><div className="mt-5 space-y-3">{item.eligibility.map(value => <div key={value} className="flex items-start gap-3 text-sm leading-6 text-white/65"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#ffd48a]" />{value}</div>)}</div><div className="mt-6 border-t border-white/10 pt-5"><p className="text-xs leading-5 text-white/45">Eligibility and deadlines can change. Treat the provider as the final authority before applying.</p><a href={item.url} target="_blank" rel="noreferrer" className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#ffd48a] px-4 py-3 text-sm font-semibold text-[#172126]">Open official application <ExternalLink className="h-4 w-4" /></a></div></aside>
    </section>
  </main>;
}
