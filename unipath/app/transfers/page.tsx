"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, BookOpenCheck, Building2, CheckCircle2, ExternalLink, GraduationCap, Info, Route, Search, ShieldCheck } from "lucide-react";
import SiteHeader from "@/app/components/SiteHeader";
import schools from "@/data/canadianSchools.json";
import { programDetails } from "@/data/programDetails";
import { scholarships } from "@/data/scholarships";

const transferTools = [
  { name: "BC Transfer Guide", region: "British Columbia", url: "https://www.bctransferguide.ca/", note: "Search course equivalencies, block transfers and pathways." },
  { name: "ONTransfer", region: "Ontario", url: "https://ontransfer.ca/", note: "Explore Ontario college and university transfer pathways." },
  { name: "Transfer Alberta", region: "Alberta", url: "https://transferalberta.alberta.ca/", note: "Search Alberta admission pathways and transfer agreements." },
  { name: "Canada transfer practices", region: "Across Canada", url: "https://www.cicic.ca/1376/Detailed_Information_on_pan-Canadian%2C_provincial%2C_and_territorial_transfer_practices.canada", note: "Find provincial and territorial transfer resources." },
];

type TransferRequirement = {
  minimumCredits: number | null;
  creditLabel: string;
  minimumGpa: number | null;
  gpaScale: number;
  gpaLabel: string;
  courseRequirements: string[];
  creditPolicy: string;
  source: string;
};

const transferRequirements: Record<string, TransferRequirement> = {
  "University of British Columbia": { minimumCredits: 24, creditLabel: "24 transferable credits for assessment primarily on post-secondary GPA; 7–23 uses both high-school and post-secondary results", minimumGpa: null, gpaScale: 4, gpaLabel: "No single university-wide competitive GPA; it changes by degree and year", courseRequirements: ["Degree-specific prerequisites", "English-language competency", "Transferable coursework relevant to the intended degree"], creditPolicy: "At 24–30 transferable credits, UBC generally calculates admission from the post-secondary GPA. Final credit is assessed by UBC.", source: "https://you.ubc.ca/applying-ubc/requirements/university-college-transfer/" },
  "Simon Fraser University": { minimumCredits: 24, creditLabel: "24 attempted transferable units for the standard transfer route", minimumGpa: 2, gpaScale: 4.33, gpaLabel: "2.00 is the general minimum; most programs require a higher admission average", courseRequirements: ["English-language requirement", "Quantitative/analytical requirement where applicable", "Faculty-specific transferable prerequisites"], creditPolicy: "SFU may award up to 60 transfer units toward a degree. Program requirements still control how those units apply.", source: "https://www.sfu.ca/students/admission/admission-requirements/canadian-transfer/college-university.html" },
  "University of Victoria": { minimumCredits: 12, creditLabel: "At least 12 transferable UVic units for transfer-only assessment", minimumGpa: 2, gpaScale: 4, gpaLabel: "2.00 (C) general baseline; programs can require more", courseRequirements: ["Program prerequisites", "Most recent transferable coursework", "English-language requirement if applicable"], creditPolicy: "The general admission average is based on the most recent 12 units of university-level courses attempted, including repeats and failures.", source: "https://www.uvic.ca/undergraduate/admissions/how-to-apply/transfer/" },
  "University of Toronto": { minimumCredits: null, creditLabel: "No single university-wide credit threshold published; assessment depends on campus and program", minimumGpa: null, gpaScale: 4, gpaLabel: "No universal transfer GPA; competitive standing and program restrictions apply", courseRequirements: ["Required secondary or post-secondary prerequisites", "Good standing at the previous institution", "Confirm the target program accepts transfers"], creditPolicy: "Transfer credit is assessed after admission. Admission to a program area does not guarantee entry to a specific specialist or major.", source: "https://future.utoronto.ca/requirements-canadian-university-or-college" },
  "University of Waterloo": { minimumCredits: null, creditLabel: "Program-specific; transfer spaces and required courses vary substantially", minimumGpa: null, gpaScale: 100, gpaLabel: "Program-specific; Computer Science lists an 85% minimum for university transfers", courseRequirements: ["Program admission prerequisites", "Detailed course outlines for credit review", "Competitive program average"], creditPolicy: "A university course normally needs at least 60%, and a college course at least 70%, to be considered for transfer credit. This does not guarantee equivalency.", source: "https://uwaterloo.ca/future-students/transfer-students" },
  "Queen's University": { minimumCredits: null, creditLabel: "Program-specific; upper-year space is limited", minimumGpa: 2.6, gpaScale: 4.3, gpaLabel: "Arts and Science lists 2.6; college applicants generally need 2.9/4.3; Commerce requires 3.3 and successful applicants are often 3.7+", courseRequirements: ["Program prerequisites", "Supplemental application where required", "Confirm that the intended degree plan is open to transfers"], creditPolicy: "Transfer-credit awards and maximums depend on faculty. Queen's states a general maximum of 18.0 units for some transfer-credit categories.", source: "https://www.queensu.ca/admission/applying/admission-requirements/admission-requirement.university-transfer" },
  "Western University": { minimumCredits: null, creditLabel: "Assessment differs for university and college applicants", minimumGpa: 2.7, gpaScale: 4, gpaLabel: "University transfers generally need at least 70% (about 2.7); college diploma applicants generally need 78%", courseRequirements: ["Program-specific prerequisites", "Last 10 full university courses where applicable", "College diploma/pathway conditions where applicable"], creditPolicy: "Western generally requires at least 60% in an individual course to grant transfer credit, followed by course-by-course assessment.", source: "https://welcome.uwo.ca/next-steps/requirements/transfer-student.html" },
  "McMaster University": { minimumCredits: null, creditLabel: "Applicant and program-specific; select prior-study type on the official requirements page", minimumGpa: null, gpaScale: 4, gpaLabel: "No single university-wide transfer GPA; competitive programs and prerequisites vary", courseRequirements: ["Program prerequisites", "Official transcripts", "Supplemental application where required"], creditPolicy: "Transfer credit and year placement are assessed by the receiving faculty after review of prior coursework.", source: "https://future.mcmaster.ca/apply/requirements/" },
  "University of Alberta": { minimumCredits: 24, creditLabel: "24 transferable units commonly separates transfer-only assessment from combined high-school/post-secondary review", minimumGpa: null, gpaScale: 4, gpaLabel: "Faculty-specific and competitive; Engineering lists 3.0 over at least 8 recent Fall/Winter courses", courseRequirements: ["Faculty prerequisites", "Transferable university-level coursework", "Good standing"], creditPolicy: "Use the U of A Transfer Credit Search, then confirm how awarded credit applies to the chosen degree.", source: "https://www.ualberta.ca/en/admissions/how-to-apply/transfer-students/index.html" },
  "University of Calgary": { minimumCredits: null, creditLabel: "The number of courses used and admission average are program-specific", minimumGpa: null, gpaScale: 4, gpaLabel: "Competitive transfer GPA changes by program and cycle", courseRequirements: ["Program prerequisites", "Transferable post-secondary coursework", "English-language requirement if applicable"], creditPolicy: "UCalgary determines transfer credit after reviewing institution, course content, grades and program applicability.", source: "https://www.ucalgary.ca/future-students/undergraduate/requirements" },
};

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
  const [completedCredits, setCompletedCredits] = useState("");
  const [checkedSteps, setCheckedSteps] = useState<string[]>([]);
  const [targetSchool, setTargetSchool] = useState("");
  const [targetProgram, setTargetProgram] = useState("");
  const [courses, setCourses] = useState("");

  const institutionNames = useMemo(() => schools.map(school => school.name).sort(), []);
  const universityNames = useMemo(() => schools.filter(school => school.type === "University").map(school => school.name).sort(), []);
  const targetSchoolObject = useMemo(() => schools.find(school => school.name === targetSchool), [targetSchool]);
  const targetPrograms = useMemo(() => targetSchoolObject ? programDetails.filter(program => program.universityId === targetSchoolObject.id) : [], [targetSchoolObject]);
  const hub = transferHubs.find(item => item.school === targetSchool);
  const selectedProgram = targetPrograms.find(program => program.name === targetProgram);
  const hasProfile = Boolean(targetSchool || targetProgram || gpa || courses.trim());
  const fundingMatches = useMemo(() => targetSchool ? scholarships.filter(item => item.applicantTypes.includes("Transfer student") && (item.schools.includes(targetSchool) || item.schools.some(value => value.startsWith("Any ")))) : scholarships.filter(item => item.applicantTypes.includes("Transfer student")), [targetSchool]);
  const requirement = transferRequirements[targetSchool];
  const numericGpa = Number.parseFloat(gpa.replace(/[^0-9.]/g, ""));
  const numericCredits = Number.parseFloat(completedCredits.replace(/[^0-9.]/g, ""));
  const gpaRatio = requirement && Number.isFinite(numericGpa) ? numericGpa / requirement.gpaScale : null;
  const normalizedMinimum = requirement?.minimumGpa ? requirement.minimumGpa / requirement.gpaScale : null;
  const readiness = !requirement || !Number.isFinite(numericGpa)
    ? { label: "Build your evidence", note: "Add your GPA and completed credits to see how your record compares with the published baseline.", tone: "border-[#b7a98d]/30 bg-[#b7a98d]/10" }
    : normalizedMinimum && gpaRatio !== null && gpaRatio < normalizedMinimum
      ? { label: "A pathway may still exist", note: "Your entered GPA is below this published general baseline. Check a pathway agreement, another entry term, additional transferable coursework, or speak with admissions before ruling the school out.", tone: "border-[#d4865f]/35 bg-[#d4865f]/10" }
      : { label: "Baseline looks possible", note: "Your entered GPA is at or above the published general baseline. This is not a prediction—program competitiveness, prerequisites, course history and available space still matter.", tone: "border-emerald-300/25 bg-emerald-300/10" };
  const planningSteps = ["Confirmed program accepts transfers", "Checked required courses", "Checked course equivalencies", "Reviewed official GPA calculation", "Requested transcripts / outlines"];

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

    <section className="mx-auto max-w-7xl px-6 pt-8 lg:px-10"><div className="grid gap-3 md:grid-cols-4">{[["1","Choose a destination","Confirm the program accepts transfers."],["2","Protect your credits","Check equivalencies and residency rules."],["3","Build the application","Track prerequisites, transcripts and dates."],["4","Fund the move","Search transfer, bursary and in-course awards."]].map(([step,title,body]) => <div key={step} className="rounded-2xl border border-white/10 bg-[#111c29] p-5"><span className="text-xs font-bold text-[#9fb2bd]">STEP {step}</span><h2 className="mt-2 font-semibold">{title}</h2><p className="mt-1 text-xs leading-5 text-white/45">{body}</p></div>)}</div></section>

    <section className="mx-auto grid max-w-7xl gap-7 px-6 py-8 lg:grid-cols-[390px_1fr] lg:px-10">
      <aside className="h-fit rounded-[1.75rem] border border-white/10 bg-[#111c29] p-6 lg:sticky lg:top-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-[#9fb2bd]"><GraduationCap className="h-4 w-4" /> Transfer profile</div>
        <h2 className="mt-3 text-2xl font-semibold">Where are you moving from and to?</h2>

        <label className="mt-6 block text-sm font-semibold">Current university<input list="transfer-school-list" value={currentSchool} onChange={e => setCurrentSchool(e.target.value)} placeholder="e.g. Simon Fraser University" className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b121b] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25" /></label>
        <label className="mt-4 block text-sm font-semibold">Current program<input value={currentProgram} onChange={e => setCurrentProgram(e.target.value)} placeholder="e.g. Economics" className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b121b] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25" /></label>
        <div className="mt-4 grid grid-cols-3 gap-3"><label className="text-sm font-semibold">Year<select value={year} onChange={e => setYear(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b121b] px-3 py-3 text-sm text-white"><option value="1">1</option><option value="2">2</option><option value="3">3+</option></select></label><label className="text-sm font-semibold">GPA<input value={gpa} onChange={e => setGpa(e.target.value)} placeholder="3.6" inputMode="decimal" className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b121b] px-3 py-3 text-sm text-white outline-none placeholder:text-white/25" /></label><label className="text-sm font-semibold">Credits<input value={completedCredits} onChange={e => setCompletedCredits(e.target.value)} placeholder="24" inputMode="numeric" className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b121b] px-3 py-3 text-sm text-white outline-none placeholder:text-white/25" /></label></div>

        <div className="mt-6 border-t border-white/10 pt-6">
          <label className="block text-sm font-semibold">Target university<select value={targetSchool} onChange={e => { setTargetSchool(e.target.value); setTargetProgram(""); }} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b121b] px-4 py-3 text-sm text-white"><option value="">Choose a school</option>{universityNames.map(name => <option key={name}>{name}</option>)}</select></label>
          <label className="mt-4 block text-sm font-semibold">Target program<input list="target-transfer-programs" value={targetProgram} onChange={e => setTargetProgram(e.target.value)} placeholder="e.g. Commerce" className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b121b] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25" /></label>
          <datalist id="target-transfer-programs">{targetPrograms.map(program => <option key={program.id} value={program.name} />)}</datalist>
        </div>

        <label className="mt-6 block text-sm font-semibold">Completed / in-progress courses<textarea value={courses} onChange={e => setCourses(e.target.value)} placeholder="One line is enough: ECON 201, MATH 157, ENGL 112..." className="mt-2 min-h-28 w-full resize-y rounded-xl border border-white/10 bg-white p-4 text-sm leading-6 text-[#111827] outline-none placeholder:text-gray-400" /></label>
        <datalist id="transfer-school-list">{institutionNames.map(name => <option key={name} value={name} />)}</datalist>
      </aside>

      <div className="space-y-6">
        {!hasProfile ? <section className="rounded-[1.75rem] border border-white/10 bg-[#111c29] p-8"><Search className="h-8 w-8 text-[#7891a3]" /><h2 className="mt-5 text-3xl font-semibold">Build your transfer plan.</h2><p className="mt-3 max-w-2xl leading-7 text-[#9ba9b8]">Start with your current institution and the school you want to enter. UniPath will organize the questions that matter before you submit a transfer application.</p></section> : <>
          <section className="rounded-[1.75rem] border border-[#8fa7b6]/20 bg-[#172536] p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[.15em] text-[#9fb2bd]">Transfer snapshot</p>
            <h2 className="mt-3 text-3xl font-semibold">{currentSchool || "Current university"} → {targetSchool || "Target university"}</h2>
            <p className="mt-2 text-[#9ba9b8]">{currentProgram || "Current program"} → {targetProgram || "Target program"} · currently Year {year}{gpa ? ` · GPA ${gpa}` : ""}</p>
            <div className="mt-6 grid gap-3 md:grid-cols-3">{[["Admission", "Check transfer GPA + prerequisites"], ["Credits", "Assess course-by-course transferability"], ["Graduation", "Confirm residency / minimum credits at new school"]].map(([title, body]) => <div key={title} className="rounded-xl border border-white/10 bg-[#111c29] p-4"><p className="text-xs uppercase tracking-[.12em] text-white/35">{title}</p><p className="mt-2 text-sm font-semibold leading-6">{body}</p></div>)}</div>
          </section>

          {requirement ? <section className="rounded-[1.75rem] border border-white/10 bg-[#111c29] p-7">
            <p className="text-xs font-semibold uppercase tracking-[.14em] text-[#e0a17f]">Official baseline · general transfer route</p>
            <div className="mt-4 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
              <div className="bg-[#1d3d38] p-4"><p className="text-[10px] font-bold uppercase tracking-[.12em] text-white/35">Credits</p><p className="mt-2 text-sm leading-6">{requirement.creditLabel}</p></div>
              <div className="bg-[#1d3d38] p-4"><p className="text-[10px] font-bold uppercase tracking-[.12em] text-white/35">GPA</p><p className="mt-2 text-sm leading-6">{requirement.gpaLabel}</p></div>
              <div className="bg-[#1d3d38] p-4"><p className="text-[10px] font-bold uppercase tracking-[.12em] text-white/35">Credit assessment</p><p className="mt-2 text-sm leading-6">{requirement.creditPolicy}</p></div>
            </div>
            <div className={`mt-4 border p-4 ${readiness.tone}`}><p className="font-serif text-xl">{readiness.label}</p><p className="mt-2 text-sm leading-6 text-white/62">{readiness.note}</p>{requirement.minimumCredits && Number.isFinite(numericCredits) && numericCredits < requirement.minimumCredits ? <p className="mt-2 text-xs text-[#e0a17f]">You entered {numericCredits} credits. The standard transfer route lists {requirement.minimumCredits}; the school may combine high-school and post-secondary results below that level.</p> : null}</div>
            <div className="mt-5"><p className="text-xs font-bold uppercase tracking-[.12em] text-white/35">Courses and conditions to verify</p><ul className="mt-3 space-y-2">{requirement.courseRequirements.map(item => <li key={item} className="flex gap-3 text-sm text-white/62"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#e0a17f]" />{item}</li>)}</ul></div>
            <a href={requirement.source} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#e0a17f]">Open official transfer requirements <ExternalLink className="h-4 w-4" /></a>
          </section> : targetSchool ? <section className="border border-white/10 bg-[#111c29] p-6"><h3 className="font-serif text-xl">School-specific requirements need confirmation.</h3><p className="mt-2 text-sm leading-6 text-white/50">UniPath does not have a verified general transfer baseline for this institution yet. Use its official admissions page before interpreting your GPA or credits.</p></section> : null}

          {targetSchool ? <section className="rounded-[1.75rem] border border-white/10 bg-[#111c29] p-7"><p className="text-xs font-semibold uppercase tracking-[.14em] text-[#8fa7b6]">Your transfer file</p><h3 className="mt-3 text-2xl font-semibold">Complete the evidence, one item at a time.</h3><div className="mt-5 grid gap-2 sm:grid-cols-2">{planningSteps.map(item => <button type="button" key={item} onClick={() => setCheckedSteps(current => current.includes(item) ? current.filter(value => value !== item) : [...current, item])} className={`flex items-start gap-3 border p-4 text-left text-sm ${checkedSteps.includes(item) ? "border-[#d4865f]/40 bg-[#d4865f]/10" : "border-white/10 bg-white/[.025]"}`}><span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center border text-[10px] ${checkedSteps.includes(item) ? "border-[#d4865f] bg-[#d4865f] text-[#132c29]" : "border-white/25"}`}>{checkedSteps.includes(item) ? "✓" : ""}</span>{item}</button>)}</div><p className="mt-4 text-xs text-white/40">{checkedSteps.length} of {planningSteps.length} planning checks complete. This checklist helps you find missing evidence; it never blocks you from exploring or applying.</p></section> : null}

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

        <section className="rounded-[1.75rem] border border-white/10 bg-[#111c29] p-7"><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-[#8fa7b6]"><ShieldCheck className="h-4 w-4" /> Funding after transfer</div><div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h3 className="text-2xl font-semibold">{fundingMatches.length} transfer-friendly funding starting points{targetSchool ? ` for ${targetSchool}` : ""}.</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">Check funding before admission, after accepting, and again after your first year at the receiving school. Many transfer students become eligible for in-course awards only after completing credits there.</p></div><Link href="/scholarships" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#9fb2bd] px-4 py-3 text-sm font-semibold text-[#0b121b]">View transfer funding <ArrowRight className="h-4 w-4" /></Link></div></section>

        <section className="rounded-[1.75rem] border border-white/10 bg-[#111c29] p-7"><p className="text-xs font-semibold uppercase tracking-[.14em] text-[#8fa7b6]">Official credit-transfer tools</p><h3 className="mt-3 text-2xl font-semibold">Check agreements before guessing course equivalencies.</h3><div className="mt-5 grid gap-3 sm:grid-cols-2">{transferTools.map(tool => <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/10 bg-white/[.04] p-4 transition hover:border-[#9fb2bd]/35"><div className="flex items-center justify-between gap-3"><p className="font-semibold">{tool.name}</p><ExternalLink className="h-4 w-4 text-[#9fb2bd]" /></div><p className="mt-1 text-xs text-[#8fa7b6]">{tool.region}</p><p className="mt-3 text-sm leading-6 text-white/45">{tool.note}</p></a>)}</div></section>
      </div>
    </section>
  </main>;
}
