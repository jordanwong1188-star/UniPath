"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ExternalLink,
  Search,
  SlidersHorizontal,
  Star,
} from "lucide-react";
import schools from "@/data/canadianSchools.json";

type Deadline = {
  id: string;
  schoolId: string;
  university: string;
  shortName: string;
  province: string;
  title: string;
  date: string | null;
  category: "Application" | "Scholarship" | "Documents" | "To confirm";
  audience: string;
  detail: string;
  source: string;
  confirmed: boolean;
};

const deadlines: Deadline[] = [
  {
    id: "ubc-international-scholars",
    schoolId: "ubc",
    university: "University of British Columbia",
    shortName: "UBC",
    province: "British Columbia",
    title: "International Scholars Program",
    date: "2026-11-15T23:59:00-08:00",
    category: "Scholarship",
    audience: "International students · Fall 2027",
    detail: "Submit the award application and complete the required UBC application steps by 11:59 p.m. Pacific time.",
    source: "https://you.ubc.ca/applying-ubc/dates-deadlines/",
    confirmed: true,
  },
  {
    id: "ubc-canadian-awards",
    schoolId: "ubc",
    university: "University of British Columbia",
    shortName: "UBC",
    province: "British Columbia",
    title: "Entrance award consideration",
    date: "2026-12-01T23:59:00-08:00",
    category: "Scholarship",
    audience: "Canadian citizens and permanent residents · Fall 2027",
    detail: "Apply to UBC by this date to be considered for major entrance awards, including Presidential Scholars and Centennial Scholars.",
    source: "https://you.ubc.ca/applying-ubc/dates-deadlines/",
    confirmed: true,
  },
  {
    id: "waterloo-engineering",
    schoolId: "waterloo",
    university: "University of Waterloo",
    shortName: "Waterloo",
    province: "Ontario",
    title: "Engineering application",
    date: "2027-01-15T23:59:00-05:00",
    category: "Application",
    audience: "Engineering applicants, excluding Architecture · Fall 2027",
    detail: "The undergraduate application must be submitted by this date. Required documents follow on February 1.",
    source: "https://uwaterloo.ca/future-students/admissions/deadlines",
    confirmed: true,
  },
  {
    id: "ubc-general-application",
    schoolId: "ubc",
    university: "University of British Columbia",
    shortName: "UBC",
    province: "British Columbia",
    title: "Undergraduate application",
    date: "2027-01-15T23:59:00-08:00",
    category: "Application",
    audience: "Winter and Summer Session applicants · 2027 entry",
    detail: "The general application deadline for Winter Session 2027–28 and Summer Session 2027 is 11:59 p.m. Pacific time.",
    source: "https://you.ubc.ca/applying-ubc/dates-deadlines/",
    confirmed: true,
  },
  {
    id: "waterloo-engineering-documents",
    schoolId: "waterloo",
    university: "University of Waterloo",
    shortName: "Waterloo",
    province: "Ontario",
    title: "Engineering documents",
    date: "2027-02-01T23:59:00-05:00",
    category: "Documents",
    audience: "Engineering applicants, excluding Architecture · Fall 2027",
    detail: "Submit all required documents, which can include transcripts, the AIF, English-language results, and the video interview.",
    source: "https://uwaterloo.ca/future-students/admissions/deadlines",
    confirmed: true,
  },
  {
    id: "sfu-fall-high-school",
    schoolId: "sfu",
    university: "Simon Fraser University",
    shortName: "SFU",
    province: "British Columbia",
    title: "Fall undergraduate application",
    date: "2027-01-31T23:59:00-08:00",
    category: "Application",
    audience: "High school applicants · Fall 2027",
    detail: "SFU’s Fall 2027 high school application period runs from October 1, 2026 through January 31, 2027.",
    source: "https://www.sfu.ca/students/admission/apply.html",
    confirmed: true,
  },
  {
    id: "waterloo-general",
    schoolId: "waterloo",
    university: "University of Waterloo",
    shortName: "Waterloo",
    province: "Ontario",
    title: "General undergraduate application",
    date: "2027-02-01T23:59:00-05:00",
    category: "Application",
    audience: "Most non-Engineering programs · Fall 2027",
    detail: "This applies to most undergraduate programs other than Engineering. Program-specific exceptions may use another date.",
    source: "https://uwaterloo.ca/future-students/admissions/deadlines",
    confirmed: true,
  },
  {
    id: "waterloo-general-documents",
    schoolId: "waterloo",
    university: "University of Waterloo",
    shortName: "Waterloo",
    province: "Ontario",
    title: "General documents deadline",
    date: "2027-02-15T23:59:00-05:00",
    category: "Documents",
    audience: "Most non-Engineering programs · Fall 2027",
    detail: "Submit the documents listed in your applicant portal by this date. Faculty and program requirements can differ.",
    source: "https://uwaterloo.ca/future-students/admissions/deadlines",
    confirmed: true,
  },
];

const coveredSchoolIds = new Set(deadlines.map((deadline) => deadline.schoolId));
const officialDeadlinePages: Record<string, string> = {
  ubc: "https://you.ubc.ca/applying-ubc/dates-deadlines/",
  sfu: "https://www.sfu.ca/students/admission/apply.html",
  uvic: "https://www.uvic.ca/undergraduate/admissions/application-deadlines/index.php",
  bcit: "https://www.bcit.ca/admission/program-availability/when-to-apply/",
  kpu: "https://www.kpu.ca/admission/deadlines",
  capu: "https://www.capilanou.ca/admissions/apply-to-capu/",
  ufv: "https://www.ufv.ca/admissions/dates-deadlines/",
  tru: "https://www.tru.ca/future/admissions/undergrad.html",
  viu: "https://connect.viu.ca/how-become-viu-student",
  ecu: "https://ecuad.ca/degree-programs/undergraduate/apply/",
  langara: "https://langara.ca/apply/apply-regular-studies",
  douglas: "https://www.douglascollege.ca/admissions/when-apply",
  ualberta: "https://www.ualberta.ca/en/admissions/how-to-apply/dates-deadlines/index.html",
  ucalgary: "https://www.ucalgary.ca/future-students/undergraduate/admissions/dates",
  ulethbridge: "https://www.ulethbridge.ca/future-student/application-dates-and-deadlines",
  athabasca: "https://www.athabascau.ca/applications-admissions/apply-au/undergraduate-students.html",
  mru: "https://www.mtroyal.ca/Admission/DatesDeadlines/index.htm",
  macewan: "https://www.macewan.ca/apply-enrol/admissions/dates-deadlines/",
  nait: "https://www.nait.ca/nait/admissions/academic-schedule/application-deadlines",
  sait: "https://www.sait.ca/admissions/apply",
  usask: "https://admissions.usask.ca/requirements/deadlines.php",
  uregina: "https://www.uregina.ca/admissions/undergraduate/deadlines.html",
  saskpoly: "https://saskpolytech.ca/admissions/apply-and-register/admission-processes.aspx",
  umanitoba: "https://umanitoba.ca/explore/undergraduate-admissions/requirements",
  uwinnipeg: "https://www.uwinnipeg.ca/future-student/applications-deadlines.html",
  brandon: "https://www.brandonu.ca/future-students/apply/application-deadlines/",
  uoft: "https://future.utoronto.ca/deadlines",
  waterloo: "https://uwaterloo.ca/future-students/admissions/deadlines",
  mcmaster: "https://future.mcmaster.ca/apply/deadlines/",
  queens: "https://www.queensu.ca/admission/applying/dates-deadlines",
  western: "https://welcome.uwo.ca/next-steps/apply/admission-deadlines.html",
  york: "https://futurestudents.yorku.ca/requirements/deadlines",
  tmu: "https://www.torontomu.ca/admissions/undergraduate/apply/application-dates/",
  uottawa: "https://www.uottawa.ca/study/undergraduate-studies/application-deadlines",
  carleton: "https://admissions.carleton.ca/deadlines/",
  guelph: "https://www.uoguelph.ca/admission/undergraduate/apply/deadlines/",
  laurier: "https://www.wlu.ca/future-students/undergraduate/admissions/dates.html",
  brock: "https://brocku.ca/admissions/deadlines/",
  windsor: "https://ask.uwindsor.ca/app/answers/detail/a_id/773/~/what-are-the-deadlines-to-apply-for-an-undergraduate-program%3F",
  ontariotech: "https://admissions.ontariotechu.ca/applicant-information/ontario-secondary-school-graduates.php",
  lakehead: "https://www.lakeheadu.ca/studentcentral/applying/application-deadlines",
  nipissing: "https://future.nipissingu.ca/requirements/deadlines/",
  mcgill: "https://www.mcgill.ca/undergraduate-admissions/apply/requirements",
  concordia: "https://www.concordia.ca/admissions/undergraduate/apply.html",
  udem: "https://admission.umontreal.ca/admission/preparation-de-la-demande/respecter-les-dates-limites-de-depot/",
  laval: "https://www.ulaval.ca/admission/deposez-votre-demande-dadmission/dates-limites-de-depot",
  usherbrooke: "https://www.usherbrooke.ca/admission/da/planifier-demande/dates-limites/1er-cycle",
  uqam: "https://etudier.uqam.ca/dates",
  dalhousie: "https://www.dal.ca/admissions/dates-and-deadlines.html",
  smu: "https://www.smu.ca/future-students/admissions/importantdates/",
  stfx: "https://www.stfx.ca/applications-admissions/admissions-information/key-dates-deadlines",
  unb: "https://www.unb.ca/admissions/important-dates.html",
  moncton: "https://www.umoncton.ca/admission/dates-importantes",
  upei: "https://calendar.upei.ca/current/chapter/how-to-apply/",
  memorial: "https://www.mun.ca/undergrad/admissions/admission-deadlines/",
};

const allDeadlines: Deadline[] = [
  ...deadlines,
  ...schools
    .filter((school) => !coveredSchoolIds.has(school.id))
    .map((school) => ({
      id: `${school.id}-pending-2027`,
      schoolId: school.id,
      university: school.name,
      shortName: school.shortName,
      province: school.province,
      title: "2027 undergraduate deadline",
      date: null,
      category: "To confirm" as const,
      audience: "Undergraduate applicants · 2027 entry",
      detail:
        "This school is included in UniPath, but its 2027 date has not yet been verified. Use the official school website for the latest program-specific information.",
      source: officialDeadlinePages[school.id],
      confirmed: false,
    })),
];

const categories = ["All", "Application", "Scholarship", "Documents", "To confirm"] as const;
const provinces = Array.from(
  new Set(schools.map((school) => school.province))
).sort();

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Vancouver",
  }).format(new Date(value));
}

function dateParts(value: string) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Vancouver",
  }).formatToParts(new Date(value));

  return {
    month: parts.find((part) => part.type === "month")?.value ?? "",
    day: parts.find((part) => part.type === "day")?.value ?? "",
    year: parts.find((part) => part.type === "year")?.value ?? "",
  };
}

function daysUntil(value: string, now: number) {
  return Math.ceil((new Date(value).getTime() - now) / 86_400_000);
}

export default function DeadlinesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [province, setProvince] = useState("All");
  const [saved, setSaved] = useState<string[]>([]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("unipath-deadlines");
    if (stored) setSaved(JSON.parse(stored));
    setNow(Date.now());
  }, []);

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return allDeadlines.filter((deadline) => {
      const matchesQuery =
        !normalizedQuery ||
        [deadline.university, deadline.shortName, deadline.title, deadline.audience]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesCategory = category === "All" || deadline.category === category;
      const matchesProvince = province === "All" || deadline.province === province;
      const matchesSaved = !showSavedOnly || saved.includes(deadline.id);
      return matchesQuery && matchesCategory && matchesProvince && matchesSaved;
    });
  }, [category, province, query, saved, showSavedOnly]);

  function toggleSaved(id: string) {
    const next = saved.includes(id) ? saved.filter((item) => item !== id) : [...saved, id];
    setSaved(next);
    window.localStorage.setItem("unipath-deadlines", JSON.stringify(next));
  }

  return (
    <main className="min-h-screen bg-[#f5f7f8] text-[#172126]">
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#172126] text-lg font-bold text-white">U</span>
            <span className="text-xl font-bold tracking-tight">UniPath</span>
          </Link>
          <nav className="flex items-center gap-5 text-sm font-semibold sm:gap-7">
            <Link href="/universities" className="hidden transition hover:text-gray-500 sm:block">Universities</Link>
            <Link href="/programs" className="transition hover:text-gray-500">Programs</Link>
            <span className="rounded-full bg-[#edf1f1] px-4 py-2">Deadlines</span>
            <Link href="/application-hub" className="hidden transition hover:text-gray-500 lg:block">Applications</Link>
          </nav>
        </div>
      </header>

      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1fr_330px] lg:px-10 lg:py-20">
          <div className="max-w-3xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#172126] text-white"><CalendarDays className="h-6 w-6" /></div>
            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">2027 admission cycle</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">Every important date,<br /><span className="text-[#65777c]">one clear timeline.</span></h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">Search verified university dates, filter by what is due, and save the deadlines that belong in your application plan.</p>
          </div>

          <div className="rounded-[1.75rem] bg-[#172126] p-7 text-white shadow-[0_20px_60px_rgba(23,33,38,0.18)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Your deadline plan</p>
            <p className="mt-4 text-5xl font-semibold">{saved.length}</p>
            <p className="mt-2 text-sm leading-6 text-white/60">saved {saved.length === 1 ? "date" : "dates"} on this device</p>
            <button onClick={() => setShowSavedOnly(!showSavedOnly)} className="mt-7 flex w-full items-center justify-between rounded-xl bg-white px-4 py-3 text-left text-sm font-semibold text-[#172126]">
              {showSavedOnly ? "Show all deadlines" : "View saved deadlines"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[270px_1fr]">
          <aside className="flex h-fit max-h-[70vh] flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm lg:sticky lg:top-24 lg:max-h-[calc(100dvh-7rem)]">
            <div className="flex shrink-0 items-center gap-2 border-b border-black/5 bg-white px-5 py-4">
              <SlidersHorizontal className="h-4 w-4" />
              <h2 className="text-sm font-semibold">Filter deadlines</h2>
            </div>
            <div className="min-h-0 overflow-y-auto overscroll-contain px-5 pb-5 [scrollbar-gutter:stable]">
              <label className="mt-5 block text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">Search</label>
              <div className="mt-2 flex items-center gap-2 rounded-xl border border-black/10 bg-[#f7f8f8] px-3">
                <Search className="h-4 w-4 text-gray-400" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="School or deadline..." className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-gray-400" />
              </div>
              <label className="mt-6 block text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">Type</label>
              <div className="mt-2 space-y-1">
                {categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm ${category === item ? "bg-[#172126] font-semibold text-white" : "text-gray-600 hover:bg-[#f5f7f8]"}`}><span>{item}</span>{category === item && <Check className="h-4 w-4" />}</button>)}
              </div>
              <label className="mt-6 block text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">Province</label>
              <div className="relative mt-2">
                <select value={province} onChange={(event) => setProvince(event.target.value)} className="w-full appearance-none rounded-xl border border-black/10 bg-[#f7f8f8] px-3 py-3 pr-9 text-sm outline-none">
                  <option value="All">All provinces</option>
                  {provinces.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-5 flex items-end justify-between gap-4">
              <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">Upcoming</p><h2 className="mt-1 text-2xl font-semibold">{showSavedOnly ? "Your saved dates" : "Application timeline"}</h2></div>
              <p className="text-sm text-gray-500">{results.length} {results.length === 1 ? "deadline" : "deadlines"}</p>
            </div>

            {results.length === 0 ? (
              <div className="rounded-2xl border border-black/5 bg-white p-10 text-center shadow-sm"><CalendarDays className="mx-auto h-7 w-7 text-gray-300" /><h3 className="mt-4 text-xl font-semibold">No deadlines found</h3><p className="mt-2 text-sm text-gray-500">Try another filter or save a deadline first.</p></div>
            ) : (
              <div className="space-y-4">
                {results.map((deadline) => {
                  const remaining = deadline.date && now !== null ? daysUntil(deadline.date, now) : null;
                  const displayedDate = deadline.date ? dateParts(deadline.date) : null;
                  const isSaved = saved.includes(deadline.id);
                  return <article key={deadline.id} className="group rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6">
                    <div className="grid gap-5 sm:grid-cols-[100px_1fr_auto] sm:items-start">
                      <div className="rounded-xl bg-[#edf1f1] px-3 py-4 text-center">{displayedDate ? <><p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">{displayedDate.month}</p><p className="mt-1 text-3xl font-semibold">{displayedDate.day}</p><p className="text-xs text-gray-500">{displayedDate.year}</p></> : <><p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">Date</p><p className="mt-2 text-sm font-semibold leading-5">Not yet<br />confirmed</p></>}</div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-[#172126] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-white">{deadline.category}</span><span className="text-xs font-semibold text-gray-400">{deadline.shortName}</span></div>
                        <h3 className="mt-3 text-xl font-semibold tracking-tight">{deadline.title}</h3>
                        <p className="mt-1 text-sm font-medium text-gray-600">{deadline.university}</p>
                        <p className="mt-3 text-sm leading-6 text-gray-500">{deadline.detail}</p>
                        <p className="mt-3 text-xs text-gray-400">{deadline.audience}</p>
                      </div>
                      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                        <div className="text-left sm:text-right"><p className="text-sm font-semibold">{deadline.date ? formatDate(deadline.date) : "Check official site"}</p><p className="mt-1 text-xs text-gray-400">{!deadline.date ? "Awaiting verification" : remaining === null ? "Calculating countdown…" : remaining > 0 ? `${remaining} days away` : remaining === 0 ? "Due today" : "Passed"}</p></div>
                        <button onClick={() => toggleSaved(deadline.id)} aria-label={isSaved ? `Remove ${deadline.title} from saved deadlines` : `Save ${deadline.title}`} className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${isSaved ? "border-[#172126] bg-[#172126] text-white" : "border-black/10 text-gray-400 hover:text-[#172126]"}`}><Star className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} /></button>
                      </div>
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-4 sm:ml-[120px]"><span className="text-xs text-gray-400">Always confirm program-specific requirements.</span><a href={deadline.source} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline">Official source <ExternalLink className="h-3.5 w-3.5" /></a></div>
                  </article>;
                })}
              </div>
            )}

            <div className="mt-8 rounded-2xl border border-amber-900/10 bg-[#f3eee4] p-5 text-sm leading-6 text-[#5a5142]">
              <strong className="font-semibold text-[#3c372f]">All {schools.length} UniPath schools are included.</strong> Confirmed dates appear in the timeline; schools awaiting published or verified 2027 information are marked “To confirm.” Universities can change dates and individual programs may have earlier supplemental deadlines, so always open the official source before submitting anything.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
