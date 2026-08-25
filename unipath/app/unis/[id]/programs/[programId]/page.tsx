import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, GraduationCap } from "lucide-react";
import schools from "@/data/canadianSchools.json";
import { programDetails } from "@/data/programDetails";
import SiteHeader from "@/app/components/SiteHeader";

const supplementalRoutes: Record<string, string> = {
  "ubc-sauder-bcom": "ubc-sauder-bcom",
  "western-ivey-aeo": "western-ivey-aeo",
  "queens-commerce": "queens-commerce",
  "rotman-commerce": "rotman-commerce",
  "schulich-bba": "schulich-bba",
  "waterloo-engineering": "waterloo-engineering",
  "waterloo-mathematics": "waterloo-mathematics",
  "waterloo-afm": "waterloo-afm",
  "mcmaster-engineering": "mcmaster-engineering",
  "mcmaster-computer-science": "mcmaster-computer-science",
  "sfu-beedie-bba": "sfu-beedie-bba",
  "uoft-engineering": "uoft-engineering",
};

export function generateStaticParams() { return programDetails.map(program => ({ id: program.universityId, programId: program.id })); }

export default async function ProgramDetailPage({ params }: { params: Promise<{ id: string; programId: string }> }) {
  const { id, programId } = await params;
  const program = programDetails.find(item => item.id === programId && item.universityId === id);
  const school = schools.find(item => item.id === id);
  if (!program || !school) notFound();
  const isIvey = program.id === "western-ivey-aeo";
  const supplementalId = supplementalRoutes[program.id];

  return <main className="min-h-screen bg-[#f4f1ea] text-[#172126]">
    <SiteHeader dark /><div className="border-b border-white/10 bg-[#132c29]"><div className="mx-auto max-w-6xl px-6 py-3 lg:px-10"><Link href="/programs" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.1em] text-white/55"><ArrowLeft className="h-3.5 w-3.5" /> Program index</Link></div></div>
    <section className={`${isIvey ? "bg-[#17365d]" : "bg-[#172126]"} text-white`}><div className="mx-auto max-w-6xl px-6 py-14 lg:px-10 lg:py-18"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ffd48a]">{program.school}</p><h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">{program.name}</h1><p className="mt-4 text-lg text-white/65">{school.name} · {program.degree}</p><p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">{program.overview}</p></div></section>
    <section className="mx-auto grid max-w-6xl gap-7 px-6 py-10 lg:grid-cols-[1fr_340px] lg:px-10"><div className="space-y-7"><section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"><h2 className="text-2xl font-semibold">Program structure</h2><div className="mt-6 grid gap-4 sm:grid-cols-2"><div className="rounded-xl bg-[#f6f3ed] p-5"><Clock3 className="h-5 w-5 text-[#8c4964]" /><p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-gray-400">Typical path</p><p className="mt-1 font-semibold">{program.duration}</p></div><div className="rounded-xl bg-[#f6f3ed] p-5"><GraduationCap className="h-5 w-5 text-[#8c4964]" /><p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-gray-400">Entry type</p><p className="mt-1 font-semibold">{program.entryType}</p></div></div></section><section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"><h2 className="text-2xl font-semibold">What you will develop</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{program.whatYouStudy.map(item => <div key={item} className="flex items-center gap-3 rounded-xl border border-black/5 p-4 text-sm"><CheckCircle2 className="h-4 w-4 text-[#2f6d62]" />{item}</div>)}</div></section>{isIvey ? <section className="rounded-2xl bg-[#e7edf5] p-6 sm:p-8"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#17365d]">Important distinction</p><h2 className="mt-3 text-2xl font-semibold">AEO is a status, not your first-year degree</h2><p className="mt-3 text-sm leading-7 text-gray-600">Apply to any Western, Huron, or King's program for years one and two, select your AEO intention on OUAC, and complete the separate Ivey supplemental application. AEO remains conditional on meeting Ivey's progression requirements.</p></section> : null}</div><aside className="h-fit rounded-2xl bg-[#172126] p-6 text-white lg:sticky lg:top-6"><h2 className="text-xl font-semibold">Application support</h2><p className="mt-3 text-sm leading-6 text-white/55">Open the dedicated workspace for verified requirements, activity essays, interview practice, and response feedback.</p>{supplementalId ? <><div className="mt-5 border-l-2 border-[#d4865f] pl-3 text-xs leading-5 text-white/55">This program has a supplemental practice file with a written workspace, program-specific prompts, rubric feedback{supplementalId === "ubc-sauder-bcom" || supplementalId.includes("engineering") ? ", and interview preparation" : ""}.</div><Link href={`/applications/${supplementalId}`} className="mt-5 flex items-center justify-center gap-2 bg-[#d4865f] px-4 py-3 text-sm font-semibold text-[#132c29]">Open written practice <ArrowRight className="h-4 w-4" /></Link></> : <Link href="/applications" className="mt-6 flex items-center justify-center gap-2 border border-white/12 px-4 py-3 text-sm font-semibold">Check supplemental requirements <ArrowRight className="h-4 w-4" /></Link>}</aside></section>
  </main>;
}
