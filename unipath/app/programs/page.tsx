"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Clock,
  Compass,
  GraduationCap,
  Layers3,
  MapPin,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import schools from "@/data/canadianSchools.json";
import { programDetails } from "@/data/programDetails";

const provinces = Array.from(
  new Set(schools.map((school) => school.province))
).sort();

const entryTypes = ["All", "Direct entry", "Choose after first year", "Second entry", "Varies"] as const;
const fields = ["All fields", "Business", "Computing", "Engineering", "Health", "Sciences", "Social sciences", "Arts & humanities", "Creative arts", "Education", "Trades & applied"] as const;

function getProgramField(program: (typeof programDetails)[number]) {
  const text = [program.name, program.school, ...program.whatYouStudy].join(" ").toLowerCase();
  if (/business|commerce|account|finance|marketing|management|economics/.test(text)) return "Business";
  if (/computer|computing|software|data science|artificial intelligence|cyber/.test(text)) return "Computing";
  if (/engineering|génie|mechatronic/.test(text)) return "Engineering";
  if (/health|nurs|kines|medical|pharmacy|nutrition|midwif/.test(text)) return "Health";
  if (/biology|chemistry|physics|science|mathematics|statistics|environment|geology/.test(text)) return "Sciences";
  if (/psychology|politic|sociology|anthropology|criminology|law|social work|international/.test(text)) return "Social sciences";
  if (/music|design|film|theatre|theater|visual art|fine art|architecture|dance/.test(text)) return "Creative arts";
  if (/education|teaching|teacher/.test(text)) return "Education";
  if (/trade|apprentice|technology|technician|culinary|hospitality|aviation/.test(text)) return "Trades & applied";
  return "Arts & humanities";
}

function ProgramsContent() {
  const searchParams = useSearchParams();
  const schoolFilter = searchParams.get("school")?.trim().toLowerCase() ?? "";
  const [query, setQuery] = useState("");
  const [province, setProvince] = useState("All");
  const [institution, setInstitution] = useState("All");
  const [entryType, setEntryType] = useState<(typeof entryTypes)[number]>("All");
  const [field, setField] = useState<(typeof fields)[number]>("All fields");
  const [sortBy, setSortBy] = useState("program");

  const availableSchools = useMemo(
    () =>
      schools
        .filter(
          (school) =>
            (province === "All" || school.province === province) &&
            programDetails.some((program) => program.universityId === school.id)
        )
        .sort((a, b) => a.name.localeCompare(b.name)),
    [province]
  );

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return programDetails.filter((program) => {
      const school = schools.find((item) => item.id === program.universityId);
      if (!school) return false;

      const matchesSchoolFilter =
        !schoolFilter ||
        school.id.toLowerCase() === schoolFilter ||
        school.name.toLowerCase().includes(schoolFilter) ||
        school.shortName.toLowerCase().includes(schoolFilter);

      const matchesProvince =
        province === "All" || school.province === province;
      const matchesInstitution =
        institution === "All" || school.id === institution;
      const matchesEntryType =
        entryType === "All" || program.entryType === entryType;
      const matchesField = field === "All fields" || getProgramField(program) === field;

      const haystack = [
        program.name,
        program.school,
        program.degree,
        school.name,
        school.shortName,
        ...program.whatYouStudy,
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery =
        !normalizedQuery || haystack.includes(normalizedQuery);

      return matchesSchoolFilter && matchesProvince && matchesInstitution && matchesEntryType && matchesField && matchesQuery;
    }).sort((a, b) => {
      const schoolA = schools.find((school) => school.id === a.universityId)?.name ?? "";
      const schoolB = schools.find((school) => school.id === b.universityId)?.name ?? "";
      return sortBy === "school"
        ? schoolA.localeCompare(schoolB) || a.name.localeCompare(b.name)
        : a.name.localeCompare(b.name) || schoolA.localeCompare(schoolB);
    });
  }, [entryType, field, institution, province, query, schoolFilter, sortBy]);

  const selectedSchool = schoolFilter
    ? schools.find(
        (school) =>
          school.id.toLowerCase() === schoolFilter ||
          school.name.toLowerCase().includes(schoolFilter) ||
          school.shortName.toLowerCase().includes(schoolFilter)
      )
    : undefined;

  const hasActiveFilters =
    query !== "" || province !== "All" || institution !== "All" || entryType !== "All" || field !== "All fields";

  function clearFilters() {
    setQuery("");
    setProvince("All");
    setInstitution("All");
    setEntryType("All");
    setField("All fields");
  }

  return (
    <main className="min-h-screen bg-[#f2efe8] text-[#172126]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#172126]/95 text-white backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c8f169] text-lg font-bold text-[#172126]">U</span>
            <span className="text-xl font-bold tracking-tight">UniPath</span>
          </Link>

          <nav className="flex items-center gap-5 text-sm font-semibold sm:gap-7">
            <Link href="/universities" className="hidden text-white/70 transition hover:text-white sm:block">Universities</Link>
            <span className="rounded-full bg-white/10 px-4 py-2">Programs</span>
            <Link href="/deadlines" className="text-white/70 transition hover:text-white">Deadlines</Link>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#172126] text-white">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#c8f169]/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-56 w-56 rounded-full bg-[#6cc5b4]/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1fr_360px] lg:px-10 lg:py-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#c8f169]">
              <Compass className="h-4 w-4" /> Canadian program explorer
            </div>
            <h1 className="mt-7 text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Don&apos;t just pick a school.<br /><span className="text-[#c8f169]">Find your direction.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
              Explore what you will study, how you enter, and where each path can take you—across Canadian universities and colleges.
            </p>
          </div>

          <div className="flex flex-col justify-end">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10">
              <div className="bg-[#172126]/80 p-6"><p className="text-4xl font-semibold text-[#c8f169]">{programDetails.length}</p><p className="mt-2 text-xs uppercase tracking-[0.14em] text-white/45">Programs</p></div>
              <div className="bg-[#172126]/80 p-6"><p className="text-4xl font-semibold">{new Set(programDetails.map((program) => program.universityId)).size}</p><p className="mt-2 text-xs uppercase tracking-[0.14em] text-white/45">Schools</p></div>
              <div className="col-span-2 flex items-center gap-3 bg-[#c8f169] p-5 text-sm font-semibold text-[#172126]"><Layers3 className="h-5 w-5" /> One catalog. Many possible paths.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        {selectedSchool && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-black/5 bg-[#edf1f1] px-5 py-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                School filter
              </p>
              <p className="mt-1 text-sm font-semibold">
                {selectedSchool.name}
              </p>
            </div>
            <Link
              href="/programs"
              className="text-sm font-semibold underline-offset-4 hover:underline"
            >
              Clear school filter
            </Link>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="flex h-fit max-h-[75vh] flex-col overflow-hidden rounded-[1.5rem] border border-[#172126]/10 bg-[#dfe9e5] shadow-sm lg:sticky lg:top-24 lg:max-h-[calc(100dvh-7rem)]">
            <div className="flex shrink-0 items-center justify-between gap-2 border-b border-[#172126]/10 bg-[#dfe9e5] px-5 py-4">
              <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              <h2 className="text-sm font-semibold">Filter programs</h2>
              </div>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-[#172126]">
                  <X className="h-3.5 w-3.5" /> Clear
                </button>
              )}
            </div>

            <div className="min-h-0 overflow-y-auto overscroll-contain px-5 pb-5 [scrollbar-gutter:stable]">
            <label className="mt-5 block text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
              Search
            </label>
            <div className="mt-2 flex items-center gap-2 rounded-xl border border-[#172126]/10 bg-white/70 px-3 focus-within:bg-white">
              <Search className="h-4 w-4 shrink-0 text-gray-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Business, CS, engineering..."
                className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-gray-400"
              />
            </div>

            <label className="mt-6 block text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">Field of study</label>
            <div className="mt-2 space-y-1">
              {fields.map((item) => (
                <button key={item} onClick={() => setField(item)} className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${field === item ? "bg-[#172126] font-semibold text-white" : "text-[#344247] hover:bg-white/60"}`}>
                  <span>{item}</span>{field === item && <span className="h-2 w-2 rounded-full bg-[#c8f169]" />}
                </button>
              ))}
            </div>

            <label className="mt-6 block text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
              Province
            </label>
            <div className="relative mt-2">
              <select
                value={province}
                onChange={(event) => { setProvince(event.target.value); setInstitution("All"); }}
                className="w-full appearance-none rounded-xl border border-[#172126]/10 bg-white/70 px-3 py-3 pr-9 text-sm outline-none"
              >
                <option value="All">All provinces</option>
                {provinces.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-gray-400" />
            </div>

            <label className="mt-6 block text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">School</label>
            <div className="relative mt-2">
              <select value={institution} onChange={(event) => setInstitution(event.target.value)} className="w-full appearance-none rounded-xl border border-[#172126]/10 bg-white/70 px-3 py-3 pr-9 text-sm outline-none disabled:opacity-60" disabled={Boolean(selectedSchool)}>
                <option value="All">{selectedSchool ? selectedSchool.shortName : "All schools"}</option>
                {!selectedSchool && availableSchools.map((school) => <option key={school.id} value={school.id}>{school.name}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-gray-400" />
            </div>

            <label className="mt-6 block text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">Entry pathway</label>
            <div className="relative mt-2">
              <select value={entryType} onChange={(event) => setEntryType(event.target.value as (typeof entryTypes)[number])} className="w-full appearance-none rounded-xl border border-[#172126]/10 bg-white/70 px-3 py-3 pr-9 text-sm outline-none">
                {entryTypes.map((item) => <option key={item} value={item}>{item === "All" ? "All pathways" : item}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-gray-400" />
            </div>

            <div className="mt-6 rounded-xl bg-white/60 p-4">
              <p className="text-3xl font-semibold">{results.length}</p>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                matching programs and study areas
              </p>
            </div>
            </div>
          </aside>

          <div>
            <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">Explore</p>
                <h2 className="mt-1 text-2xl font-semibold">Programs and study areas</h2>
              </div>
              <div className="relative">
                <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Sort programs" className="appearance-none rounded-xl border border-black/10 bg-white py-2.5 pl-3 pr-9 text-sm font-medium outline-none">
                  <option value="program">Program A–Z</option>
                  <option value="school">School A–Z</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-gray-400" />
              </div>
            </div>
            {results.length === 0 ? (
              <div className="rounded-2xl border border-black/5 bg-white p-10 text-center shadow-sm">
                <h2 className="text-xl font-semibold">No programs found</h2>
                <p className="mt-2 text-sm text-gray-500">
                  Try a broader search term or another province.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {results.map((program, index) => {
                  const school = schools.find(
                    (item) => item.id === program.universityId
                  );
                  if (!school) return null;

                  return (
                    <Link
                      key={`${program.universityId}-${program.id}`}
                      href={`/unis/${program.universityId}/programs/${program.id}`}
                      className="group relative grid overflow-hidden rounded-2xl border border-black/7 bg-white shadow-sm transition hover:border-[#172126]/20 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#172126] sm:grid-cols-[64px_1fr] lg:grid-cols-[64px_minmax(0,1fr)_230px_44px]"
                    >
                      <div className="flex items-start justify-center bg-[#172126] px-3 py-6 text-sm font-semibold text-[#c8f169] sm:items-center">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div className="min-w-0 p-5 sm:p-6">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-[#dfe9e5] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em]">{getProgramField(program)}</span>
                          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">{program.degree}</span>
                        </div>
                        <h2 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">{program.name}</h2>
                        <p className="mt-2 text-sm font-medium text-gray-600">{school.shortName} · {program.school}</p>
                        <p className="mt-4 line-clamp-2 max-w-2xl text-sm leading-6 text-gray-500">{program.overview}</p>
                      </div>
                      <div className="col-start-2 border-t border-black/5 px-5 py-5 text-xs text-gray-500 sm:px-6 lg:col-start-auto lg:border-l lg:border-t-0">
                        <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-gray-400" />{school.city}, {school.province}</div>
                        <div className="mt-3 flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-gray-400" />{program.duration}</div>
                        <div className="mt-3 flex items-center gap-2"><GraduationCap className="h-3.5 w-3.5 text-gray-400" />{program.entryType}</div>
                      </div>
                      <div className="hidden items-center justify-center bg-[#c8f169] lg:flex">
                        <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            <div className="mt-8 rounded-2xl border border-black/5 bg-[#edf1f1] p-5 text-sm leading-6 text-gray-600">
              UniPath currently indexes major programs and study areas rather
              than every credential at every institution. Program requirements,
              deadlines and selection criteria can change, so official sources
              remain the final authority.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ProgramsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#f5f7f8] p-10 text-[#172126]">
          Loading program finder...
        </main>
      }
    >
      <ProgramsContent />
    </Suspense>
  );
}
