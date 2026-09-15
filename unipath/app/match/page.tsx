"use client";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import SiteHeader from "../components/SiteHeader";
import UniversityLogo from "../components/UniversityLogo";
import schools from "@/data/canadianSchools.json";
import { programDetails } from "@/data/programDetails";
import { admissionsEvidence } from "@/data/admissionsEvidence";
import { fields, matchPrograms, type Profile, type Match, type Field } from "@/lib/programMatcher";

const inputStyle = "mt-2 w-full rounded-xl border border-white/20 bg-[#0b121b] px-4 py-3 text-base text-white outline-none focus:border-[#9fb2bd]";
const initialProfile: Profile = { field: "Business", average: 0, school: "", program: "", province: "", activities: "" };

function ResultCard({ result, average }: { result: Match; average: number }) {
  const e = result.evidence;
  return <article className="rounded-2xl border border-white/15 bg-[#111c29] p-6">
    <div className="flex items-start gap-4"><UniversityLogo universityId={result.school.id} name={result.school.name} size={48} /><div><p className="text-sm text-[#aabac6]">{result.school.name} · {result.school.province}</p><h3 className="mt-1 text-xl font-semibold">{result.program.name}</h3><p className="mt-1 text-sm text-[#aabac6]">{result.program.degree} · {result.program.entryType}</p></div></div>
    <p className="mt-5 inline-block rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold text-[#d2e0e9]">{result.label}</p>
    {e ? <div className="mt-4 text-sm leading-6 text-[#b5c3ce]"><p><strong className="text-white">Your average: {average}%</strong> · {e.kind === "research-estimate" ? "Research estimate" : "Published reference"}: {e.publishedRange}</p><p className="mt-2">{e.note}</p><p className="mt-2">Applies to: {e.scope}.</p><a href={e.source} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-[#c4dfed] underline">Check admission source</a> · Checked {e.checked}{e.additionalSources?.map(source => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="mt-2 block text-[#c4dfed] underline">{source.label}</a>)}</div> : <p className="mt-4 text-sm leading-6 text-[#b5c3ce]">No program-specific admission range has been verified here. Your grades were not used to rate this option. It is not labelled safe or competitive.</p>}
    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-[#c1ced7]">{result.reasons.map(reason => <li key={reason}>{reason}</li>)}</ul>
    <details className="mt-5 border-t border-white/10 pt-4 text-sm leading-6 text-[#b5c3ce]"><summary className="cursor-pointer font-semibold text-white">Before adding this to your application list</summary><ul className="mt-3 list-disc space-y-2 pl-5"><li>Check prerequisite courses and minimum course grades for your curriculum.</li><li>Recalculate your average using this university’s required courses.</li><li>Confirm the entry route, deadline, campus, tuition and any supplemental application, portfolio or interview.</li><li>Being above a published or estimated range does not guarantee admission.</li></ul></details>
    <div className="mt-5 flex flex-wrap gap-4"><Link href={`/unis/${result.school.id}/programs/${result.program.id}`} className="rounded-lg bg-[#9fb2bd] px-4 py-2.5 text-sm font-semibold text-[#0b121b]">Explore program</Link><a href={result.program.officialUrl} target="_blank" rel="noopener noreferrer" className="py-2.5 text-sm text-[#c4dfed] underline">Official program page</a></div>
  </article>;
}

export default function MatchPage() {
  const [profile, setProfile] = useState(initialProfile);
  const [average, setAverage] = useState("");
  const [submitted, setSubmitted] = useState<Profile | null>(null);
  const [error, setError] = useState("");
  const results = useMemo(() => submitted ? matchPrograms(submitted, programDetails, schools) : null, [submitted]);
  const provinces = [...new Set(schools.map(s => s.province))].sort();
  const dirty = submitted && JSON.stringify({ ...profile, average: Number(average) }) !== JSON.stringify(submitted);
  function submit(event: FormEvent) {
    event.preventDefault();
    if (!average.trim() || !Number.isFinite(Number(average)) || Number(average) < 0 || Number(average) > 100) { setError("Enter a percentage average between 0 and 100."); return; }
    setError(""); setSubmitted({ ...profile, average: Number(average) });
  }
  return <main className="min-h-screen bg-[#0f1722] text-[#e8edf3]">
    <SiteHeader dark />
    <header className="mx-auto max-w-7xl px-6 pb-4 pt-10 lg:px-10"><p className="text-sm uppercase tracking-widest text-[#aabac6]">Admissions Match</p><h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Build a shortlist you can explain.</h1><p className="mt-4 max-w-3xl text-base leading-7 text-[#b5c3ce]">Compare your interests and grades with programs across Canada. Published ranges and labelled research estimates are references, not admission probabilities. Free to use; no AI calls.</p></header>
    <div className="mx-auto grid max-w-7xl gap-8 px-6 py-6 lg:grid-cols-[360px_1fr] lg:px-10">
      <form onSubmit={submit} className="h-fit rounded-2xl border border-white/15 bg-[#111c29] p-6">
        <h2 className="text-xl font-semibold">Your profile</h2><p className="mt-2 text-sm leading-6 text-[#aabac6]">For high-school applicants using percentage grades. For transfer, IB points or other grading systems, use official requirements rather than converting them here.</p>
        <label className="mt-5 block text-sm font-semibold">Field of interest<select className={inputStyle} value={profile.field} onChange={e => setProfile({ ...profile, field: e.target.value as Field })}>{fields.map(f => <option key={f}>{f}</option>)}</select></label>
        <label className="mt-5 block text-sm font-semibold">Current or predicted admission average (%)<input className={inputStyle} required type="number" step="0.1" min="0" max="100" placeholder="e.g. 86.5" value={average} onChange={e => setAverage(e.target.value)} /></label>
        <p className="mt-2 text-sm leading-6 text-[#aabac6]">Include required courses. We do not invent subject weights. Each university may calculate a different average.</p>
        <label className="mt-5 block text-sm font-semibold">Desired subject or program (optional)<input className={inputStyle} maxLength={100} placeholder="e.g. Computer Science or Finance" value={profile.program} onChange={e => setProfile({ ...profile, program: e.target.value })} /></label>
        <label className="mt-5 block text-sm font-semibold">Where you want to study<select className={inputStyle} value={profile.province} onChange={e => setProfile({ ...profile, province: e.target.value, school: "" })}><option value="">Any province</option>{provinces.map(p => <option key={p}>{p}</option>)}</select></label>
        <label className="mt-5 block text-sm font-semibold">Preferred university (optional)<select className={inputStyle} value={profile.school} onChange={e => setProfile({ ...profile, school: e.target.value })}><option value="">No preference</option>{schools.filter(s => !profile.province || s.province === profile.province).map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></label>
        <p className="mt-2 text-sm leading-6 text-[#aabac6]">Preference boosts relevant programs; it does not override your subject or province filter.</p>
        <label className="mt-5 block text-sm font-semibold">Activities and interests (optional)<textarea className={inputStyle} rows={4} maxLength={1000} placeholder="Projects, work, volunteering, music, sport…" value={profile.activities} onChange={e => setProfile({ ...profile, activities: e.target.value })} /></label>
        <p className="mt-2 text-sm leading-6 text-[#aabac6]">Used to suggest related interests—not judge activity quality or predict admission. Avoid private information.</p>
        {error && <p role="alert" className="mt-4 text-amber-100">{error}</p>}
        <button className="mt-6 w-full rounded-xl bg-[#9fb2bd] px-4 py-3 font-semibold text-[#0b121b]">{submitted ? "Update my shortlist" : "Find programs"}</button>
      </form>
      <section aria-live="polite">
        {dirty && <p role="status" className="mb-5 rounded-xl border border-amber-100/20 p-4 text-sm text-amber-100">Profile changed. Select “Update my shortlist” to refresh these results.</p>}
        {!results || !submitted ? <div className="rounded-2xl border border-white/15 p-7"><h2 className="text-2xl font-semibold">Start with your interests and average.</h2><p className="mt-3 leading-7 text-[#b5c3ce]">Your list separates programs with published grade references or labelled research estimates from options needing more research. Aim for a mix, and discuss your final list with a school counsellor.</p></div> : <>
          <div className="rounded-2xl border border-white/15 bg-[#172536] p-6"><h2 className="text-xl font-semibold">Your shortlist · {submitted.average}% entered average</h2><p className="mt-3 text-sm leading-6 text-[#b5c3ce]">{results.total} relevant catalogue programs. Up to two programs per university in each section. Grade-reference coverage currently includes {admissionsEvidence.filter(e => e.kind !== "research-estimate").length} published references and {admissionsEvidence.filter(e => e.kind === "research-estimate").length} low-confidence research estimates. Coverage is limited; other programs still need research.</p><p className="mt-3 text-sm leading-6 text-[#b5c3ce]">We interpret low/mid/high bands as 0–3/4–6/7–9 within each decade for comparison—not exact university cutoffs. Grades prioritize nearby reference ranges, not university quality. Community estimates are not official cutoffs, representative samples or predictions. Check each source and applicant group.</p></div>
          <h2 className="mb-4 mt-8 text-2xl font-semibold">Compare your grades</h2>
          {!results.academic.length && <p className="rounded-xl border border-white/15 p-5 leading-7 text-[#b5c3ce]">No published ranges or researched estimates match these filters yet. We cannot responsibly rate academic fit here. Explore below and check official requirements.</p>}
          <div className="space-y-4">{results.academic.map(r => <ResultCard key={r.program.id} result={r} average={submitted.average} />)}</div>
          <h2 className="mb-2 mt-8 text-2xl font-semibold">Other programs to research</h2><p className="mb-4 text-sm leading-6 text-[#b5c3ce]">Interest matches only. Grades will not reorder this section without a sourced grade reference.</p>
          {!results.explore.length && <p className="rounded-xl border border-white/15 p-5 text-[#b5c3ce]">No additional matches. Try a broader subject or another province; we won’t substitute unrelated programs.</p>}
          <div className="space-y-4">{results.explore.map(r => <ResultCard key={r.program.id} result={r} average={submitted.average} />)}</div>
        </>}
      </section>
    </div>
  </main>;
}
