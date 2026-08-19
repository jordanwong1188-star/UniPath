"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Award, Check, CheckCircle2, Copy, ExternalLink, FilePenLine, Search, Sparkles } from "lucide-react";

const scholarships = [
  { name: "Loran Award", value: "Major renewable award", focus: "Character, service & leadership", eligibility: "Canadian citizens or permanent residents entering university", deadline: "October 15, 2026 · noon ET", url: "https://loranscholar.ca/the-program/how-to-apply/", tag: "Leadership" },
  { name: "Schulich Leader Scholarships", value: "$100,000–$120,000", focus: "STEM leadership & entrepreneurship", eligibility: "School-nominated Canadian graduating students entering eligible STEM programs", deadline: "School nomination required", url: "https://schulichleaders.com/apply/", tag: "STEM" },
  { name: "TD Scholarships for Community Leadership", value: "Up to $70,000", focus: "Sustained community leadership", eligibility: "Students completing high school or CEGEP in Canada", deadline: "Check current application cycle", url: "https://www.td.com/ca/en/about-td/ready-commitment/community-leadership-scholarship-for-canadians", tag: "Leadership" },
  { name: "Terry Fox Humanitarian Award", value: "Renewable national award", focus: "Humanitarian service, courage & determination", eligibility: "Canadian citizens, permanent residents, or landed immigrants pursuing a first degree or diploma", deadline: "Check current application cycle", url: "https://terryfoxawards.ca/applicant-information/", tag: "Service" },
] as const;

const reviewItems = ["I answered every part of the prompt", "I used a specific example", "I explained my personal contribution", "I showed impact with evidence", "I included reflection or growth", "My writing sounds like me", "I stayed within the word limit"];

const applicationProfiles = [
  {
    id: "ubc-sauder-bcom", university: "University of British Columbia", program: "Sauder Bachelor of Commerce", deadline: "Confirm in the UBC application", source: "https://www.sauder.ubc.ca/programs/bachelors-degrees/bachelor-commerce/program-admission",
    note: "UBC Sauder assesses a Personal Profile containing short written responses and video interview components.",
    components: [
      { title: "Personal Profile responses", format: "Written · prompts and limits appear in the UBC application", help: "Build specific stories showing your role, decisions, impact, and reflection. Paste each current UBC prompt into the workspace before drafting." },
      { title: "Activity and achievement details", format: "Structured application information", help: "Prepare accurate dates, roles, time commitments, responsibilities, and verifiable impact for your strongest experiences." },
      { title: "Video interview preparation", format: "Recorded responses", help: "Practice concise spoken answers using context, action, outcome, and reflection. Use bullet points rather than memorizing a script." },
    ],
  },
  {
    id: "queens-commerce", university: "Queen's University", program: "Smith Bachelor of Commerce", deadline: "February 15, 2027", source: "https://smith.queensu.ca/bcom/program-details/supplementary-application.php",
    note: "Queen's Commerce uses Kira Talent. Questions are randomly assigned and are not released in advance.",
    components: [
      { title: "Timed written response", format: "10 minutes to write and submit", help: "Practice quickly choosing one relevant example, answering the question directly, explaining your decisions, and ending with meaningful learning." },
      { title: "Timed video response", format: "2 minutes preparation · 2 minutes recording", help: "Practice speaking naturally under time pressure. Show initiative, adaptability, respect for others, ownership, impact, and reflection." },
      { title: "Technical and practice check", format: "Kira Talent practice required", help: "Use the official practice environment, check camera and microphone access, choose a quiet location, and keep your Queen's ID ready." },
    ],
  },
  {
    id: "rotman-commerce", university: "University of Toronto", program: "Rotman Commerce", deadline: "Confirm in Join U of T", source: "https://rotmancommerce.utoronto.ca/future-students/our-supplemental-application/",
    note: "Rotman Commerce provides its current written and video instructions through the Join U of T portal and Kira Talent.",
    components: [
      { title: "Written response preparation", format: "Kira Talent · current format shown in applicant portal", help: "Paste the live prompt from your portal, identify every part of it, and prepare a direct response supported by one detailed example." },
      { title: "Video response preparation", format: "Recorded interview component", help: "Create a flexible bank of examples covering teamwork, leadership, setbacks, decision-making, and interest in business." },
      { title: "Practice sessions", format: "Unlimited official practice sessions", help: "Use the practice environment to become comfortable with timing and technology without memorizing an answer." },
    ],
  },
  {
    id: "schulich-bba", university: "York University", program: "Schulich BBA", deadline: "February 1, 2027 · 11:59 p.m. ET", source: "https://schulich.yorku.ca/admissions/suppapp/",
    note: "Schulich requires a Leadership Profile before applicants continue to the timed writing and video components.",
    components: [
      { title: "Leadership Profile", format: "3–5 experiences · references required", help: "Record each experience, your role, organization, dates, responsibilities, impact, growth, and a reference who can verify it." },
      { title: "Timed writing exercise", format: "Kira Talent", help: "Practice answering directly with a clear example that demonstrates initiative, collaboration, integrity, resilience, or resourcefulness." },
      { title: "Video interviews", format: "Kira Talent", help: "Prepare a varied story bank and practice concise, natural delivery. Upload the completed Leadership Profile before beginning timed components." },
    ],
  },
] as const;

export function ApplicationHub({ mode }: { mode: "scholarships" | "applications" }) {
  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState("All");
  const [prompt, setPrompt] = useState("");
  const [draft, setDraft] = useState("");
  const [limit, setLimit] = useState(500);
  const [checked, setChecked] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [applicationId, setApplicationId] = useState(applicationProfiles[0].id as string);

  const results = useMemo(() => scholarships.filter((item) => {
    const text = `${item.name} ${item.focus} ${item.eligibility} ${item.tag}`.toLowerCase();
    return (!query.trim() || text.includes(query.toLowerCase())) && (focus === "All" || item.tag === focus);
  }), [focus, query]);

  const wordCount = draft.trim() ? draft.trim().split(/\s+/).length : 0;
  const selectedApplication = applicationProfiles.find(item => item.id === applicationId) ?? applicationProfiles[0];

  return <main className="min-h-screen bg-[#f4f1ea] text-[#172126]">
    <header className="border-b border-black/5 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#172126] font-bold text-white">U</span><span className="text-xl font-bold">UniPath</span></Link>
        <nav className="flex items-center gap-5 text-sm font-semibold"><Link href="/universities">Universities</Link><Link href="/programs">Programs</Link><Link href="/deadlines" className="hidden sm:block">Deadlines</Link></nav>
      </div>
    </header>

    <section className="bg-[#692f46] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]"><Sparkles className="h-4 w-4" /> Application Hub</div>
        <h1 className="mt-7 max-w-4xl text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">Funding and applications,<br /><span className="text-[#ffd48a]">organized around you.</span></h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">Find credible scholarships and turn supplemental prompts into an honest, specific application plan.</p>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
      <div className="grid grid-cols-2 rounded-2xl bg-[#e7dfd2] p-1.5 sm:max-w-xl">
        <Link href="/scholarships" className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${mode === "scholarships" ? "bg-white shadow-sm" : "text-gray-500"}`}><Award className="h-4 w-4" /> Scholarships</Link>
        <Link href="/applications" className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${mode === "applications" ? "bg-white shadow-sm" : "text-gray-500"}`}><FilePenLine className="h-4 w-4" /> Applications</Link>
      </div>

      {mode === "scholarships" ? <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-2xl bg-[#172126] p-5 text-white lg:sticky lg:top-6">
          <label className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">Search awards</label>
          <div className="mt-2 flex items-center gap-2 rounded-xl bg-white/10 px-3"><Search className="h-4 w-4 text-white/40" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Name or eligibility..." className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-white/35" /></div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-white/45">Focus</p>
          <div className="mt-2 space-y-1">{["All", "Leadership", "STEM", "Service"].map(item => <button type="button" key={item} onClick={() => setFocus(item)} className={`w-full cursor-pointer rounded-lg px-3 py-2.5 text-left text-sm ${focus === item ? "bg-[#ffd48a] font-semibold text-[#172126]" : "text-white/65 hover:bg-white/10"}`}>{item}</button>)}</div>
          <p className="mt-6 border-t border-white/10 pt-5 text-sm text-white/55">{results.length} matching opportunities</p>
        </aside>
        <div className="space-y-4">{results.map(item => <article key={item.name} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start"><div><span className="rounded-full bg-[#f1e6d2] px-3 py-1 text-xs font-semibold">{item.tag}</span><h2 className="mt-4 text-2xl font-semibold">{item.name}</h2><p className="mt-2 text-sm font-semibold text-[#8c4964]">{item.value}</p></div><a href={item.url} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#172126] px-4 py-3 text-sm font-semibold text-white">Official source <ExternalLink className="h-4 w-4" /></a></div>
          <div className="mt-6 grid gap-5 border-t border-black/5 pt-5 sm:grid-cols-3"><div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">Recognizes</p><p className="mt-2 text-sm leading-6 text-gray-600">{item.focus}</p></div><div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">Eligibility</p><p className="mt-2 text-sm leading-6 text-gray-600">{item.eligibility}</p></div><div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">Timing</p><p className="mt-2 text-sm leading-6 text-gray-600">{item.deadline}</p></div></div>
        </article>)}</div>
      </div> : <div className="mt-8">
        <section className="overflow-hidden rounded-3xl bg-[#172126] text-white shadow-sm">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ffd48a]">Your application path</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Choose a school and program</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">The preparation steps, timing, and writing guidance below change to match the selected supplemental application.</p>
              <label htmlFor="application-profile" className="mt-6 block text-sm font-semibold">University and program</label>
              <select id="application-profile" value={applicationId} onChange={e => setApplicationId(e.target.value)} className="mt-2 w-full cursor-pointer rounded-xl border border-white/15 bg-white px-4 py-3.5 text-sm font-semibold text-[#172126] outline-none focus:ring-2 focus:ring-[#ffd48a]">
                {applicationProfiles.map(item => <option key={item.id} value={item.id}>{item.university} — {item.program}</option>)}
              </select>
              <div className="mt-5 rounded-2xl bg-white/8 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40">Deadline</p>
                <p className="mt-1 font-semibold text-[#ffd48a]">{selectedApplication.deadline}</p>
                <p className="mt-3 text-sm leading-6 text-white/65">{selectedApplication.note}</p>
                <a href={selectedApplication.source} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">View official requirements <ExternalLink className="h-4 w-4" /></a>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">What you will complete</p>
              <div className="mt-4 space-y-3">{selectedApplication.components.map((component, index) => <article key={component.title} className="rounded-2xl bg-white p-5 text-[#172126]">
                <div className="flex items-start gap-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f1e6d2] text-sm font-bold text-[#692f46]">{index + 1}</span><div><h3 className="font-semibold">{component.title}</h3><p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-[#8c4964]">{component.format}</p><p className="mt-3 text-sm leading-6 text-gray-600">{component.help}</p></div></div>
              </article>)}</div>
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1.35fr]">
        <div className="space-y-6">
          <section className="rounded-2xl bg-white p-6 shadow-sm"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8c4964]">Step 1 · Understand it</p><h2 className="mt-3 text-2xl font-semibold">Paste the exact prompt</h2><p className="mt-2 text-sm text-gray-500">Working on: {selectedApplication.university} · {selectedApplication.program}</p><textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder={`Paste the current ${selectedApplication.program} prompt from your applicant portal here...`} className="mt-5 min-h-36 w-full resize-y rounded-xl border border-black/10 bg-[#faf9f6] p-4 text-sm leading-6 outline-none focus:border-[#8c4964]" /><div className="mt-4 rounded-xl bg-[#f1e6d2] p-4 text-sm leading-6 text-gray-600">Look for four things: the action word, the experience requested, the qualities being assessed, and the evidence you need to provide.</div></section>
          <section className="rounded-2xl bg-[#172126] p-6 text-white"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ffd48a]">Story framework</p><div className="mt-5 space-y-4">{[["Context","What was happening?"],["Action","What did you personally do?"],["Impact","What changed, and how do you know?"],["Reflection","What did you learn or carry forward?"]].map(([title, help]) => <div key={title} className="border-b border-white/10 pb-4"><p className="font-semibold">{title}</p><p className="mt-1 text-sm text-white/50">{help}</p></div>)}</div></section>
        </div>
        <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8c4964]">Step 2 · Build your response</p><h2 className="mt-3 text-2xl font-semibold">Draft workspace</h2></div><label className="text-xs font-semibold text-gray-500">Word limit <input type="number" min="50" value={limit} onChange={e => setLimit(Number(e.target.value))} className="ml-2 w-20 rounded-lg border border-black/10 px-2 py-1.5" /></label></div>
          <textarea value={draft} onChange={e => setDraft(e.target.value)} placeholder="Write your own draft here. Focus on specific actions, evidence, and reflection..." className="mt-6 min-h-80 w-full resize-y rounded-xl border border-black/10 bg-[#faf9f6] p-5 leading-7 outline-none focus:border-[#8c4964]" />
          <div className="mt-3 flex items-center justify-between gap-4"><button type="button" disabled={!draft.trim()} onClick={async () => { await navigator.clipboard.writeText(draft); setCopied(true); window.setTimeout(() => setCopied(false), 1800); }} className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#172126] px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied ? "Copied" : "Copy final draft"}</button><span className={`text-sm font-semibold ${wordCount > limit ? "text-red-600" : "text-gray-500"}`}>{wordCount} / {limit} words</span></div>
          <div className="mt-7 border-t border-black/5 pt-6"><h3 className="font-semibold">Final review</h3><div className="mt-4 grid gap-2 sm:grid-cols-2">{reviewItems.map(item => <button type="button" key={item} onClick={() => setChecked(current => current.includes(item) ? current.filter(x => x !== item) : [...current, item])} className={`flex cursor-pointer items-start gap-2 rounded-xl border p-3 text-left text-sm ${checked.includes(item) ? "border-[#8c4964]/20 bg-[#f7edf1]" : "border-black/5"}`}><CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${checked.includes(item) ? "text-[#8c4964]" : "text-gray-300"}`} />{item}</button>)}</div></div>
        </section>
        </div>
      </div>}
      <div className="mt-10 flex items-center justify-between rounded-2xl bg-[#e7dfd2] p-5 text-sm text-gray-600"><span>Always confirm eligibility, prompts, and deadlines with the official source.</span><Link href="/deadlines" className="inline-flex items-center gap-1 font-semibold text-[#172126]">Deadline planner <ArrowRight className="h-4 w-4" /></Link></div>
    </section>
  </main>;
}

export default function ApplicationHubPage() {
  return <ApplicationHub mode="scholarships" />;
}
