"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, BarChart3, BookOpen, CheckCircle2, Compass, GraduationCap, Info, Search, Sparkles, Target, TrendingUp } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import UniversityLogo from "../components/UniversityLogo";
import schools from "@/data/canadianSchools.json";
import { programDetails, type ProgramDetail } from "@/data/programDetails";

type Field = "Business" | "Engineering" | "Computer Science" | "Health & Life Sciences" | "Math & Data" | "Social Sciences" | "Humanities" | "Arts & Design" | "Education" | "Undecided";
type Grades = { math: number; english: number; social: number; science: number; elective: number };
type MatchResult = { program: ProgramDetail; schoolName: string; score: number; label: "Strong fit" | "Competitive" | "Reach" | "Safer option"; academicScore: number; fieldScore: number; activityScore: number; reasons: string[]; cautions: string[]; estimatedTarget: number | null };

const fieldOptions: Field[] = ["Business", "Engineering", "Computer Science", "Health & Life Sciences", "Math & Data", "Social Sciences", "Humanities", "Arts & Design", "Education", "Undecided"];

const fieldKeywords: Record<Field, string[]> = {
  Business: ["business", "commerce", "management", "finance", "accounting", "marketing", "economics", "entrepreneur", "administration"],
  Engineering: ["engineering", "engineer", "mechatronic", "civil", "mechanical", "electrical", "chemical", "biomedical engineering"],
  "Computer Science": ["computer science", "computing", "software", "data science", "artificial intelligence", "cyber", "informatics"],
  "Health & Life Sciences": ["health", "nursing", "biology", "biomedical", "biochemistry", "life science", "neuroscience", "kinesiology", "pharmacy", "midwifery"],
  "Math & Data": ["mathematics", "math", "statistics", "actuarial", "data", "quantitative"],
  "Social Sciences": ["political", "psychology", "sociology", "economics", "international", "criminology", "law", "policy", "anthropology"],
  Humanities: ["english", "history", "philosophy", "literature", "language", "linguistics", "classics", "religion"],
  "Arts & Design": ["design", "visual", "fine arts", "music", "media", "film", "architecture", "creative", "theatre", "art"],
  Education: ["education", "teaching", "teacher", "child studies"],
  Undecided: [],
};

const activityThemes = [
  { words: ["leader", "leadership", "president", "captain", "founder", "executive", "organized", "organised"], signal: "leadership and initiative" },
  { words: ["volunteer", "community", "charity", "service", "nonprofit", "non-profit", "fundrais"], signal: "community contribution" },
  { words: ["business", "startup", "entrepreneur", "finance", "investment", "marketing", "case competition"], signal: "business exposure" },
  { words: ["coding", "programming", "robot", "software", "hackathon", "computer", "ai", "data"], signal: "technical experience" },
  { words: ["research", "lab", "science fair", "biology", "chemistry", "physics", "medical", "hospital", "clinic"], signal: "science or health exposure" },
  { words: ["music", "orchestra", "art", "design", "film", "theatre", "portfolio", "creative"], signal: "creative practice" },
  { words: ["debate", "model un", "student council", "politic", "advocacy", "policy", "law"], signal: "communication and public affairs" },
  { words: ["tutor", "mentor", "coach", "teach"], signal: "mentoring and teaching" },
  { words: ["job", "work", "employment", "intern", "part-time", "part time"], signal: "work responsibility" },
];

function normalize(value: string) { return value.toLowerCase().replace(/[^a-z0-9]+/g, " "); }

function estimateAdmissionTarget(text: string): number | null {
  const t = text.toLowerCase();
  const numbers = [...t.matchAll(/\b(\d{2,3})(?:\.\d+)?\s*%?/g)].map(match => Number(match[1])).filter(value => value >= 50 && value <= 100);
  if (numbers.length >= 2) return Math.round((numbers[0] + numbers[1]) / 2);
  if (numbers.length === 1) return numbers[0];
  const band = (base: number) => t.includes("high") ? base + 3 : t.includes("low") ? base - 3 : base;
  if (t.includes("90")) return band(95);
  if (t.includes("80")) return band(85);
  if (t.includes("70")) return band(75);
  return null;
}

function weightedAverage(grades: Grades, field: Field) {
  const weights: Record<Field, Grades> = {
    Business: { math: 1.35, english: 1.2, social: 1, science: .8, elective: .8 },
    Engineering: { math: 1.7, english: .9, social: .45, science: 1.65, elective: .6 },
    "Computer Science": { math: 1.75, english: .85, social: .45, science: 1.25, elective: .7 },
    "Health & Life Sciences": { math: 1.2, english: 1, social: .55, science: 1.7, elective: .65 },
    "Math & Data": { math: 1.9, english: .8, social: .45, science: 1.1, elective: .75 },
    "Social Sciences": { math: .75, english: 1.45, social: 1.5, science: .55, elective: .9 },
    Humanities: { math: .45, english: 1.7, social: 1.35, science: .45, elective: 1.05 },
    "Arts & Design": { math: .45, english: 1.2, social: 1, science: .45, elective: 1.6 },
    Education: { math: .65, english: 1.45, social: 1.25, science: .65, elective: 1.1 },
    Undecided: { math: 1, english: 1, social: 1, science: 1, elective: 1 },
  };
  const w = weights[field];
  const total = Object.keys(grades).reduce((sum, key) => sum + grades[key as keyof Grades] * w[key as keyof Grades], 0);
  const divisor = Object.values(w).reduce((sum, value) => sum + value, 0);
  return total / divisor;
}

function classify(score: number, academicDelta: number | null): MatchResult["label"] {
  if (academicDelta !== null && academicDelta >= 5 && score >= 69) return "Safer option";
  if (score >= 77) return "Strong fit";
  if (score >= 63) return "Competitive";
  return "Reach";
}

export default function MatchPage() {
  const [field, setField] = useState<Field>("Business");
  const [preferredSchool, setPreferredSchool] = useState("");
  const [preferredProgram, setPreferredProgram] = useState("");
  const [grades, setGrades] = useState<Grades>({ math: 90, english: 90, social: 90, science: 90, elective: 90 });
  const [activities, setActivities] = useState(["", "", ""]);
  const [submitted, setSubmitted] = useState(false);

  const schoolMap = useMemo(() => new Map(schools.map(school => [school.id, school])), []);
  const schoolPrograms = useMemo(() => preferredSchool ? programDetails.filter(program => program.universityId === preferredSchool) : programDetails, [preferredSchool]);

  const results = useMemo<MatchResult[]>(() => {
    if (!submitted) return [];
    const academicAverage = weightedAverage(grades, field);
    const activityText = normalize(activities.join(" "));
    const activitySignals = activityThemes.filter(theme => theme.words.some(word => activityText.includes(word))).map(theme => theme.signal);
    const desiredProgramText = normalize(preferredProgram);
    const keywords = fieldKeywords[field];

    return programDetails.map(program => {
      const school = schoolMap.get(program.universityId);
      const haystack = normalize([program.name, program.degree, program.school, program.overview, program.whatYouStudy.join(" "), program.skills.join(" "), program.careers.join(" ")].join(" "));
      const keywordHits = keywords.filter(keyword => haystack.includes(normalize(keyword))).length;
      const programPreferenceHit = desiredProgramText ? haystack.includes(desiredProgramText) || desiredProgramText.split(" ").filter(Boolean).some(word => word.length > 3 && haystack.includes(word)) : false;
      const target = estimateAdmissionTarget(program.admissionAverage);
      const delta = target === null ? null : academicAverage - target;

      let fieldScore = field === "Undecided" ? 22 : Math.min(35, keywordHits * 8 + (programPreferenceHit ? 12 : 0));
      if (field !== "Undecided" && fieldScore === 0) fieldScore = 3;

      let academicScore = 27;
      if (delta !== null) academicScore = Math.max(5, Math.min(45, 28 + delta * 2.3));

      const relevantSkillText = normalize(program.skills.join(" ") + " " + program.experience);
      const matchedSignals = activityThemes.filter(theme => theme.words.some(word => activityText.includes(word)) && theme.words.some(word => relevantSkillText.includes(word) || haystack.includes(word))).length;
      const activityScore = Math.min(15, activitySignals.length * 2 + matchedSignals * 2.5);

      const schoolPreference = preferredSchool && program.universityId === preferredSchool ? 5 : 0;
      const score = Math.round(Math.min(100, fieldScore + academicScore + activityScore + schoolPreference));
      const label = classify(score, delta);
      const reasons: string[] = [];
      const cautions: string[] = [];

      if (keywordHits > 0 || programPreferenceHit) reasons.push(`Strong alignment with your ${field === "Undecided" ? "stated program" : field.toLowerCase()} interests.`);
      if (delta !== null) reasons.push(delta >= 0 ? `Your weighted academic profile is about ${Math.abs(delta).toFixed(1)} points above the program estimate used by the matcher.` : `Your weighted academic profile is about ${Math.abs(delta).toFixed(1)} points below the program estimate used by the matcher.`);
      else reasons.push("No numeric admissions target could be reliably extracted, so academics are scored more cautiously.");
      if (activitySignals.length) reasons.push(`Your extracurriculars show ${activitySignals.slice(0, 2).join(" and ")}.`);
      if (programPreferenceHit) reasons.push("The program directly overlaps with the program description you entered.");
      if (preferredSchool && program.universityId === preferredSchool) reasons.push("This is one of your preferred universities.");

      if (delta !== null && delta < -3) cautions.push("Current grades appear below the stored admissions range/estimate; treat this as a reach unless your marks improve or the current cycle differs.");
      if (program.admissionAverage.toLowerCase().includes("var") || program.admissionAverage.toLowerCase().includes("competitive")) cautions.push("The published admissions information is variable or competitive, so a single mark cannot represent the full decision.");
      if (/portfolio|audition|supplement|interview/i.test(program.admissionInfo + " " + program.overview)) cautions.push("This program appears to involve additional selection factors beyond grades; review the official requirements carefully.");

      return { program, schoolName: school?.name ?? program.universityId, score, label, academicScore, fieldScore, activityScore, reasons, cautions, estimatedTarget: target };
    }).filter(result => {
      if (field === "Undecided" && !preferredProgram) return true;
      return result.fieldScore >= 10 || result.program.universityId === preferredSchool;
    }).sort((a, b) => b.score - a.score).slice(0, 12);
  }, [submitted, grades, field, activities, preferredProgram, preferredSchool, schoolMap]);

  const top = results[0];

  return <main className="min-h-screen bg-[#0f1722] text-[#e8edf3]">
    <SiteHeader dark />

    <section className="relative overflow-hidden border-b border-white/10">
      <div className="pointer-events-none absolute -right-32 -top-36 h-[500px] w-[500px] rounded-full bg-[#557b80]/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-xs font-semibold uppercase tracking-[.16em] text-[#9fb2bd]"><Compass className="h-4 w-4" /> Admissions Match</div>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-.055em] sm:text-6xl">Turn your profile into a smarter application list.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#9ba9b8]">Enter your grades, academic direction, preferred schools and a few extracurricular highlights. UniPath ranks programs by academic fit, field alignment and profile relevance.</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[["Catalogue", `${programDetails.length}+`, "programs"], ["Signals", "3", "fit dimensions"], ["Cost", "$0", "AI calls"]].map(([label, value, note]) => <div key={label} className="rounded-2xl border border-white/10 bg-[#172536] p-4"><p className="text-xs uppercase tracking-[.12em] text-white/35">{label}</p><p className="mt-2 text-2xl font-semibold">{value}</p><p className="mt-1 text-xs text-[#8fa7b6]">{note}</p></div>)}
          </div>
        </div>
      </div>
    </section>

    <div className="mx-auto grid max-w-7xl gap-7 px-6 py-10 lg:grid-cols-[390px_1fr] lg:px-10">
      <aside className="h-fit rounded-[1.75rem] border border-white/10 bg-[#111c29] p-6 lg:sticky lg:top-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-[#9fb2bd]"><Target className="h-4 w-4" /> Your profile</div>
        <h2 className="mt-3 text-2xl font-semibold">Build your match</h2>
        <p className="mt-2 text-sm leading-6 text-white/45">Use current or predicted Grade 12 marks. You can update these anytime.</p>

        <label className="mt-6 block text-sm font-semibold">Field you want to pursue<select value={field} onChange={event => setField(event.target.value as Field)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b121b] px-4 py-3 text-sm text-white outline-none">{fieldOptions.map(item => <option key={item}>{item}</option>)}</select></label>
        <label className="mt-5 block text-sm font-semibold">Preferred university <span className="font-normal text-white/35">optional</span><select value={preferredSchool} onChange={event => { setPreferredSchool(event.target.value); setPreferredProgram(""); }} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b121b] px-4 py-3 text-sm text-white outline-none"><option value="">Any Canadian school</option>{schools.filter(school => school.type === "University").map(school => <option key={school.id} value={school.id}>{school.name}</option>)}</select></label>
        <label className="mt-5 block text-sm font-semibold">Desired program <span className="font-normal text-white/35">optional</span><input list="program-match-options" value={preferredProgram} onChange={event => setPreferredProgram(event.target.value)} placeholder="e.g. Commerce, Engineering, Psychology" className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b121b] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25" /><datalist id="program-match-options">{schoolPrograms.slice(0, 500).map(program => <option key={`${program.universityId}-${program.id}`} value={program.name} />)}</datalist></label>

        <div className="mt-6 border-t border-white/10 pt-6"><p className="text-sm font-semibold">Grades</p><div className="mt-3 grid grid-cols-2 gap-3">{([['math','Math'],['english','English'],['social','Social Studies'],['science','Science'],['elective','Electives avg.']] as const).map(([key, label]) => <label key={key} className="text-xs font-semibold text-white/55">{label}<div className="mt-1 flex items-center rounded-xl border border-white/10 bg-[#0b121b] px-3"><input type="number" min="50" max="100" value={grades[key]} onChange={event => setGrades(current => ({ ...current, [key]: Math.max(0, Math.min(100, Number(event.target.value))) }))} className="w-full bg-transparent py-2.5 text-sm text-white outline-none" /><span className="text-xs text-white/30">%</span></div></label>)}</div></div>

        <div className="mt-6 border-t border-white/10 pt-6"><p className="text-sm font-semibold">Extracurricular snapshots</p><p className="mt-1 text-xs leading-5 text-white/35">One short line each is enough. Focus on what you actually did.</p><div className="mt-3 space-y-2">{activities.map((activity, index) => <input key={index} value={activity} maxLength={150} onChange={event => setActivities(current => current.map((item, itemIndex) => itemIndex === index ? event.target.value : item))} placeholder={index === 0 ? "e.g. Led school finance club, organized investing workshops" : index === 1 ? "e.g. Volunteer tutor for younger students" : "e.g. Part-time job, 8 hours/week"} className="w-full rounded-xl border border-white/10 bg-[#0b121b] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25" />)}</div></div>

        <button type="button" onClick={() => setSubmitted(true)} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#9fb2bd] px-5 py-3.5 text-sm font-semibold text-[#0b121b] hover:bg-[#b0c0c9]"><Sparkles className="h-4 w-4" /> Find my best matches</button>
      </aside>

      <section>
        {!submitted ? <div className="rounded-[1.75rem] border border-white/10 bg-[#111c29] p-8 sm:p-10"><Search className="h-8 w-8 text-[#7891a3]" /><h2 className="mt-5 text-3xl font-semibold">Your ranked list will appear here.</h2><p className="mt-3 max-w-xl leading-7 text-[#9ba9b8]">UniPath compares your profile against the program catalogue and shows where your academics and interests appear strongest.</p><div className="mt-8 grid gap-3 md:grid-cols-3">{[[BarChart3,"Academic fit","Subject-weighted grades"],[BookOpen,"Program fit","Field and study alignment"],[TrendingUp,"Profile fit","Extracurricular signals"]].map(([Icon, title, note]) => { const C = Icon as typeof BarChart3; return <div key={title as string} className="rounded-2xl border border-white/10 bg-[#172536] p-5"><C className="h-5 w-5 text-[#8fa7b6]" /><p className="mt-4 font-semibold">{title as string}</p><p className="mt-1 text-sm text-white/40">{note as string}</p></div>; })}</div></div> : <>
          {top ? <div className="rounded-[1.75rem] border border-[#8fa7b6]/20 bg-[#172536] p-7 sm:p-8"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-start"><div><p className="text-xs font-semibold uppercase tracking-[.15em] text-[#9fb2bd]">Top profile match</p><h2 className="mt-3 text-3xl font-semibold">{top.program.name}</h2><p className="mt-2 text-[#9ba9b8]">{top.schoolName} · {top.program.degree}</p></div><div className="rounded-2xl border border-white/10 bg-[#0f1823] px-5 py-4 text-center"><p className="text-3xl font-semibold">{top.score}</p><p className="text-xs uppercase tracking-[.12em] text-white/35">fit score</p></div></div><div className="mt-6 flex flex-wrap gap-2">{top.reasons.slice(0,3).map(reason => <span key={reason} className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 text-xs text-white/65">{reason}</span>)}</div></div> : null}

          <div className="mt-6 flex items-center justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.14em] text-[#8fa7b6]">Ranked recommendations</p><h2 className="mt-2 text-2xl font-semibold">Programs worth considering</h2></div><span className="text-sm text-white/40">Top {results.length}</span></div>

          <div className="mt-4 space-y-4">{results.map((result, index) => <article key={`${result.program.universityId}-${result.program.id}`} className="rounded-[1.5rem] border border-white/10 bg-[#111c29] p-6 hover:border-[#8fa7b6]/25">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"><div className="flex gap-4"><UniversityLogo universityId={result.program.universityId} name={result.schoolName} size={48} /><div><div className="flex flex-wrap items-center gap-2"><span className="text-xs font-semibold text-white/30">#{index + 1}</span><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${result.label === "Strong fit" ? "bg-[#557b80]/20 text-[#a9c4c6]" : result.label === "Safer option" ? "bg-[#7891a3]/15 text-[#b7c6cf]" : result.label === "Competitive" ? "bg-white/8 text-white/70" : "bg-amber-300/10 text-amber-100/75"}`}>{result.label}</span></div><h3 className="mt-2 text-xl font-semibold">{result.program.name}</h3><p className="mt-1 text-sm text-white/45">{result.schoolName} · {result.program.degree}</p></div></div><div className="shrink-0 text-right"><p className="text-2xl font-semibold text-[#b8c7cf]">{result.score}<span className="text-sm text-white/30">/100</span></p><p className="mt-1 text-xs text-white/30">profile fit</p></div></div>
            <div className="mt-5 grid gap-2 sm:grid-cols-3"><div className="rounded-xl bg-white/[.04] p-3"><p className="text-xs text-white/35">Academic</p><p className="mt-1 font-semibold">{Math.round(result.academicScore)}/45</p></div><div className="rounded-xl bg-white/[.04] p-3"><p className="text-xs text-white/35">Field alignment</p><p className="mt-1 font-semibold">{Math.round(result.fieldScore)}/35</p></div><div className="rounded-xl bg-white/[.04] p-3"><p className="text-xs text-white/35">Activities</p><p className="mt-1 font-semibold">{Math.round(result.activityScore)}/15</p></div></div>
            <div className="mt-5 grid gap-5 md:grid-cols-[1fr_auto]"><div><ul className="space-y-2 text-sm leading-6 text-white/60">{result.reasons.slice(0,3).map(reason => <li key={reason} className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#7891a3]" />{reason}</li>)}</ul>{result.cautions.length ? <div className="mt-3 rounded-xl border border-amber-200/10 bg-amber-100/[.04] p-3 text-xs leading-5 text-amber-50/60">{result.cautions[0]}</div> : null}</div><div className="flex flex-col gap-2 md:items-end"><Link href={`/unis/${result.program.universityId}/programs/${result.program.id}`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#9fb2bd] px-4 py-2.5 text-sm font-semibold text-[#0b121b]">View program <ArrowRight className="h-4 w-4" /></Link><a href={result.program.officialUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-[#8fa7b6] hover:text-white">Official source</a></div></div>
            <div className="mt-5 border-t border-white/10 pt-4 text-xs leading-5 text-white/35"><strong className="text-white/50">Admissions data:</strong> {result.program.admissionAverage || "No stored numeric range"}{result.estimatedTarget !== null ? ` · matcher estimate ≈ ${result.estimatedTarget}%` : ""}</div>
          </article>)}</div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-[#0f1823] p-5 text-sm leading-6 text-white/45"><div className="flex gap-3"><Info className="mt-0.5 h-5 w-5 shrink-0 text-[#7891a3]" /><p><strong className="text-white/70">How to use this:</strong> Match scores are planning estimates, not admission probabilities. Universities change requirements and many selective programs consider supplemental applications, portfolios, interviews, prerequisite courses or context that this first matcher cannot fully measure. Always verify the current official requirements before applying.</p></div></div>
        </>}
      </section>
    </div>
  </main>;
}
