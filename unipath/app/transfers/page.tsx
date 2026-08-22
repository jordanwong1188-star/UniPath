"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, BookOpenCheck, Building2, CheckCircle2, ExternalLink, GraduationCap, Info, Route, Search, ShieldCheck } from "lucide-react";
import SiteHeader from "@/app/components/SiteHeader";
import schools from "@/data/canadianSchools.json";
import { programDetails } from "@/data/programDetails";

const transferHubs = [
  { school: "University of British Columbia", key: "ubc", url: "https://you.ubc.ca/applying-ubc/requirements/university-college-transfer/", note: "Transfer admission requirements, transferable credit and applicant guidance." },
  { school: "Simon Fraser University", key: "sfu", url: "https://www.sfu.ca/students/admission/admission-requirements/transfer.html", note: "University/college transfer requirements and admission information." },
  { school: "University of Victoria", key: "uvic", url: "https://www.uvic.ca/undergraduate/admissions/how-to-apply/transfer/", note: "Transfer admission, credit and application guidance." },
  { school: "University of Toronto", key: "uoft", url: "https://future.utoronto.ca/apply/requirements/canadian-high-school-canadian-university-and-college/", note: "University and college applicant requirements; faculty restrictions may apply." },
  { school: "University of Waterloo", key: "waterloo", url: "https://uwaterloo.ca/future-students/transfer-students", note: "Transfer student requirements, credit assessment and faculty-specific rules." },
  { school: "Queen's University", key: "queens", url: "https://www.queensu.ca/admission/applying/transfer-credits", note: "Transfer-credit and admission information for students with post-secondary study." },
  { school: "Western University", key: "western", url: "https://welcome.uwo.ca/next-steps/requirements/transfer-student.html", note: "Transfer applicant requirements and next steps." },
  { school: "McMaster University", key: "mcmaster", url: "https://future.mcmaster.ca/apply/requirements/", note: "Applicant requirements with transfer-specific selection by prior study." },
  { school: "University of Alberta", key: "ualberta", url: "https://www.ualberta.ca/en/admissions/how-to-apply/transfer-students.html", note: "Transfer admission, minimum credit/GPA information and program requirements." },
  { school: "University of Calgary", key: "ucalgary", url: "https://www.ucalgary.ca/future-students/undergraduate/requirements", note: "Transfer applicant admission requirements and program-specific criteria." },
];

export default function TransfersPage() {
  const [currentSchool, setCurrentSchool] = useState("");
  const [currentProgram, setCurrentProgram] = useState("");
  const [year, setYear] = useState("2");
  const [gpa, setGpa] = useState("");
  const [targetSchool, setTargetSchool] = useState("");
  const [targetProgram, setTargetProgram] = useState("");
  const [courses, setCourses] = useState("");

  const universityNames = useMemo(() => schools.filter(school => school.type === "University").map(school => school.name).sort(), []);
  const targetSchoolObject = useMemo(() => schools.find(school => school.name === targetSchool), [targetSchool]);
  const targetPrograms = useMemo(() => targetSchoolObject ? programDetails.filter(program => program.universityId === targetSchoolObject.id) : [], [targetSchoolObject]);
  const hub = transferHubs.find(item => item.school === targetSchool);
  const selectedProgram = targetPrograms.find(program => program.name === targetProgram);
  const hasProfile = Boolean(targetSchool || targetProgram || gpa || courses.trim());

  return <main className="min-h-screen bg-[#0f1722] text-[#e8edf3]">
    <SiteHeader dark />

    <section className="relative overflow-hidden border-b border-white/10 bg-[#0d1620]">
      <div className="pointer-events-none absolute -right-32 -top-36 h-[520px] w-[520px] rounded-full bg-[#557b80]/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-xs font-semibold uppercase tracking-[.16em] text-[#9fb2bd]"><Route className="h-4 w-4" /> Transfer pathway</div>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-.055em] sm:text-6xl">Plan the move before you lose time or credits.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#9ba9b8]">Build a university-to-university transfer plan around your current studies, target school, intended program, GPA and completed courses. UniPath separates what can be planned now from what still requires an official transfer-credit assessment.</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[["Pathway", "Year 2→3", "supported"], ["Priority", "Credits", "protect progress"], ["Sources", "Official", "verify decisions"]].map(([label, value, note]) => <div key={label} className="rounded-2xl border border-white/10 bg-[#172536] p-4"><p className="text-xs uppercase tracking-[.12em] text-white/35">{label}</p><p className="mt-2 text-xl font-semibold">{value}</p><p className="mt-1 text-xs text-[#8fa7b6]">{note}</p></div>)}
          </div>
        </div>
      </div>
    </section>

    <section className="mx-auto grid max-w-7xl gap-7 px-6 py-10 lg:grid-cols-[390px_1fr] lg:px-10">
      <aside className="h-fit rounded-[1.75rem] border border-white/10 bg-[#111c29] p-6 lg:sticky lg:top-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-[#9fb2bd]"><GraduationCap className="h-4 w-4" /> Transfer profile</div>
        <h2 className="mt-3 text-2xl font-semibold">Where are you moving from and to?</h2>

        <label className="mt-6 block text-sm font-semibold">Current university<input list="transfer-school-list" value={currentSchool} onChange={e => setCurrentSchool(e.target.value)} placeholder="e.g. Simon Fraser University" className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b121b] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25" /></label>
        <label className="mt-4 block text-sm font-semibold">Current program<input value={currentProgram} onChange={e => setCurrentProgram(e.target.value)} placeholder="e.g. Economics" className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b121b] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25" /></label>
        <div className="mt-4 grid grid-cols-2 gap-3"><label className="text-sm font-semibold">Current year<select value={year} onChange={e => setYear(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b121b] px-3 py-3 text-sm text-white"><option value="1">Year 1</option><option value="2">Year 2</option><option value="3">Year 3+</option></select></label><label className="text-sm font-semibold">Current GPA<input value={gpa} onChange={e => setGpa(e.target.value)} placeholder="e.g. 3.6 / 4.0" className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b121b] px-3 py-3 text-sm text-white outline-none placeholder:text-white/25" /></label></div>

        <div className="mt-6 border-t border-white/10 pt-6">
          <label className="block text-sm font-semibold">Target university<select value={targetSchool} onChange={e => { setTargetSchool(e.target.value); setTargetProgram(""); }} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b121b] px-4 py-3 text-sm text-white"><option value="">Choose a school</option>{universityNames.map(name => <option key={name}>{name}</option>)}</select></label>
          <label className="mt-4 block text-sm font-semibold">Target program<input list="target-transfer-programs" value={targetProgram} onChange={e => setTargetProgram(e.target.value)} placeholder="e.g. Commerce" className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b121b] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25" /></label>
          <datalist id="target-transfer-programs">{targetPrograms.map(program => <option key={program.id} value={program.name} />)}</datalist>
        </div>

        <label className="mt-6 block text-sm font-semibold">Completed / in-progress courses<textarea value={courses} onChange={e => setCourses(e.target.value)} placeholder="One line is enough: ECON 201, MATH 157, ENGL 112..." className="mt-2 min-h-28 w-full resize-y rounded-xl border border-white/10 bg-white p-4 text-sm leading-6 text-[#111827] outline-none placeholder:text-gray-400" /></label>
        <datalist id="transfer-school-list">{universityNames.map(name => <option key={name} value={name} />)}</datalist>
      </aside>

      <div className="space-y-6">
        {!hasProfile ? <section className="rounded-[1.75rem] border border-white/10 bg-[#111c29] p-8"><Search className="h-8 w-8 text-[#7891a3]" /><h2 className="mt-5 text-3xl font-semibold">Build your transfer plan.</h2><p className="mt-3 max-w-2xl leading-7 text-[#9ba9b8]">Start with your current institution and the school you want to enter. UniPath will organize the questions that matter before you submit a transfer application.</p></section> : <>
          <section className="rounded-[1.75rem] border border-[#8fa7b6]/20 bg-[#172536] p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[.15em] text-[#9fb2bd]">Transfer snapshot</p>
            <h2 className="mt-3 text-3xl font-semibold">{currentSchool || "Current university"} → {targetSchool || "Target university"}</h2>
            <p className="mt-2 text-[#9ba9b8]">{currentProgram || "Current program"} → {targetProgram || "Target program"} · currently Year {year}{gpa ? ` · GPA ${gpa}` : ""}</p>
            <div className="mt-6 grid gap-3 md:grid-cols-3">{[["Admission", "Check transfer GPA + prerequisites"], ["Credits", "Assess course-by-course transferability"], ["Graduation", "Confirm residency / minimum credits at new school"]].map(([title, body]) => <div key={title} className="rounded-xl border border-white/10 bg-[#111c29] p-4"><p className="text-xs uppercase tracking-[.12em] text-white/35">{title}</p><p className="mt-2 text-sm font-semibold leading-6">{body}</p></div>)}</div>
          </section>

          <section className="rounded-[1.75rem] border border-white/10 bg-[#111c29] p-7">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-[#8fa7b6]"><BookOpenCheck className="h-4 w-4" /> Before you apply</div>
            <div className="mt-5 space-y-3">{[
              "Confirm the target faculty/program actually accepts external transfer applicants for your intended entry year.",
              "Check the minimum transferable credits and the GPA calculation method used by the receiving university.",
              "Match every required prerequisite against courses you have completed or will finish before transfer.",
              "Request or review a formal transfer-credit assessment; do not assume similarly named courses are equivalent.",
              "Check residency rules: many degrees require a minimum number of credits to be completed at the new university.",
              "Compare the likely graduation date before and after transferring so you understand any extra terms required.",
              "Check whether scholarships, housing, co-op, direct-entry specializations or professional programs have separate transfer rules."
            ].map(item => <div key={item} className="flex gap-3 rounded-xl bg-white/[.04] p-4 text-sm leading-6 text-white/65"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#7891a3]" />{item}</div>)}</div>
          </section>

          {selectedProgram ? <section className="rounded-[1.75rem] border border-white/10 bg-[#111c29] p-7"><p className="text-xs font-semibold uppercase tracking-[.14em] text-[#8fa7b6]">Target program context</p><h3 className="mt-3 text-2xl font-semibold">{selectedProgram.name}</h3><p className="mt-2 text-sm leading-6 text-white/50">Stored general admission information: {selectedProgram.admissionAverage || "No numeric range stored"}. Transfer admission may use a different GPA, prerequisite set, faculty capacity and credit rules than first-year admission.</p><div className="mt-5 flex flex-wrap gap-3"><Link href={`/unis/${selectedProgram.universityId}/programs/${selectedProgram.id}`} className="inline-flex items-center gap-2 rounded-xl bg-[#9fb2bd] px-4 py-3 text-sm font-semibold text-[#0b121b]">View program <ArrowRight className="h-4 w-4" /></Link><a href={selectedProgram.officialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-[#a8bac5]">Official program source <ExternalLink className="h-4 w-4" /></a></div></section> : null}

          {hub ? <section className="rounded-[1.75rem] border border-white/10 bg-[#172536] p-7"><div className="flex items-start gap-4"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#7891a3]/15"><Building2 className="h-5 w-5 text-[#9fb2bd]" /></div><div><p className="text-xs font-semibold uppercase tracking-[.14em] text-[#8fa7b6]">Official transfer source</p><h3 className="mt-2 text-xl font-semibold">{hub.school}</h3><p className="mt-2 text-sm leading-6 text-white/50">{hub.note}</p><a href={hub.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#a8bac5] hover:text-white">Open transfer requirements <ExternalLink className="h-4 w-4" /></a></div></div></section> : null}

          <section className="rounded-2xl border border-white/10 bg-[#0f1823] p-5 text-sm leading-6 text-white/45"><div className="flex gap-3"><Info className="mt-0.5 h-5 w-5 shrink-0 text-[#7891a3]" /><p><strong className="text-white/70">Important:</strong> UniPath can organize transfer planning, but only the receiving university can make the final admission and transfer-credit decision. Course equivalency, year standing and graduation timing must be confirmed through official assessment.</p></div></section>
        </>}

        <section className="rounded-[1.75rem] border border-white/10 bg-[#111c29] p-7"><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-[#8fa7b6]"><ShieldCheck className="h-4 w-4" /> Funding after transfer</div><h3 className="mt-3 text-2xl font-semibold">Transfer students often miss scholarships built for them.</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">The Scholarship Explorer now includes transfer, continuing-student and external funding filters instead of assuming every user is entering directly from high school.</p><Link href="/scholarships" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#9fb2bd] px-4 py-3 text-sm font-semibold text-[#0b121b]">Explore transfer scholarships <ArrowRight className="h-4 w-4" /></Link></section>
      </div>
    </section>
  </main>;
}
