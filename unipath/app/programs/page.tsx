"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Clock,
  GraduationCap,
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

function ProgramsContent() {
  const searchParams = useSearchParams();
  const schoolFilter = searchParams.get("school")?.trim().toLowerCase() ?? "";
  const [query, setQuery] = useState("");
  const [province, setProvince] = useState("All");
  const [institution, setInstitution] = useState("All");
  const [entryType, setEntryType] = useState<(typeof entryTypes)[number]>("All");
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

      return matchesSchoolFilter && matchesProvince && matchesInstitution && matchesEntryType && matchesQuery;
    }).sort((a, b) => {
      const schoolA = schools.find((school) => school.id === a.universityId)?.name ?? "";
      const schoolB = schools.find((school) => school.id === b.universityId)?.name ?? "";
      return sortBy === "school"
        ? schoolA.localeCompare(schoolB) || a.name.localeCompare(b.name)
        : a.name.localeCompare(b.name) || schoolA.localeCompare(schoolB);
    });
  }, [entryType, institution, province, query, schoolFilter, sortBy]);

  const selectedSchool = schoolFilter
    ? schools.find(
        (school) =>
          school.id.toLowerCase() === schoolFilter ||
          school.name.toLowerCase().includes(schoolFilter) ||
          school.shortName.toLowerCase().includes(schoolFilter)
      )
    : undefined;

  const hasActiveFilters =
    query !== "" || province !== "All" || institution !== "All" || entryType !== "All";

  function clearFilters() {
    setQuery("");
    setProvince("All");
    setInstitution("All");
    setEntryType("All");
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
            <span className="rounded-full bg-[#edf1f1] px-4 py-2">Programs</span>
            <Link href="/deadlines" className="transition hover:text-gray-500">Deadlines</Link>
          </nav>
        </div>
      </header>

      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1fr_330px] lg:px-10 lg:py-20">
          <div className="max-w-3xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#172126] text-white">
              <GraduationCap className="h-6 w-6" />
            </div>

            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Canadian program finder
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Find a program worth exploring.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              Search by subject, school, province, degree or entry pathway. Each result leads to a student-friendly research page and the university&apos;s official source.
            </p>
          </div>

          <div className="rounded-[1.75rem] bg-[#172126] p-7 text-white shadow-[0_20px_60px_rgba(23,33,38,0.18)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Program catalog</p>
            <p className="mt-4 text-5xl font-semibold">{programDetails.length}</p>
            <p className="mt-2 text-sm leading-6 text-white/60">programs and study areas across {new Set(programDetails.map((program) => program.universityId)).size} Canadian schools</p>
            <div className="mt-7 flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold">
              <BookOpen className="h-4 w-4" />
              Explore and compare your options
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
          <aside className="flex h-fit max-h-[70vh] flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm lg:sticky lg:top-24 lg:max-h-[calc(100dvh-7rem)]">
            <div className="flex shrink-0 items-center justify-between gap-2 border-b border-black/5 bg-white px-5 py-4">
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
            <div className="mt-2 flex items-center gap-2 rounded-xl border border-black/10 bg-[#f7f8f8] px-3">
              <Search className="h-4 w-4 shrink-0 text-gray-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Business, CS, engineering..."
                className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-gray-400"
              />
            </div>

            <label className="mt-6 block text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
              Province
            </label>
            <div className="relative mt-2">
              <select
                value={province}
                onChange={(event) => { setProvince(event.target.value); setInstitution("All"); }}
                className="w-full appearance-none rounded-xl border border-black/10 bg-[#f7f8f8] px-3 py-3 pr-9 text-sm outline-none"
              >
                <option value="All">All provinces</option>
                {provinces.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-gray-400" />
            </div>

            <label className="mt-6 block text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">School</label>
            <div className="relative mt-2">
              <select value={institution} onChange={(event) => setInstitution(event.target.value)} className="w-full appearance-none rounded-xl border border-black/10 bg-[#f7f8f8] px-3 py-3 pr-9 text-sm outline-none" disabled={Boolean(selectedSchool)}>
                <option value="All">{selectedSchool ? selectedSchool.shortName : "All schools"}</option>
                {!selectedSchool && availableSchools.map((school) => <option key={school.id} value={school.id}>{school.name}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-gray-400" />
            </div>

            <label className="mt-6 block text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">Entry pathway</label>
            <div className="relative mt-2">
              <select value={entryType} onChange={(event) => setEntryType(event.target.value as (typeof entryTypes)[number])} className="w-full appearance-none rounded-xl border border-black/10 bg-[#f7f8f8] px-3 py-3 pr-9 text-sm outline-none">
                {entryTypes.map((item) => <option key={item} value={item}>{item === "All" ? "All pathways" : item}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-gray-400" />
            </div>

            <div className="mt-6 border-t border-black/5 pt-5">
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
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {results.map((program) => {
                  const school = schools.find(
                    (item) => item.id === program.universityId
                  );
                  if (!school) return null;

                  return (
                    <Link
                      key={`${program.universityId}-${program.id}`}
                      href={`/unis/${program.universityId}/programs/${program.id}`}
                      className="group flex min-h-80 flex-col rounded-2xl border border-black/7 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#172126]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                            {program.degree}
                          </p>
                          <h2 className="mt-2 text-xl font-semibold tracking-tight">
                            {program.name}
                          </h2>
                        </div>
                        <ArrowRight className="h-5 w-5 shrink-0 text-gray-300 transition group-hover:translate-x-1 group-hover:text-[#172126]" />
                      </div>

                      <p className="mt-3 text-sm font-medium text-gray-600">
                        {school.shortName} · {program.school}
                      </p>

                      <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                        <MapPin className="h-3.5 w-3.5" />
                        {school.city}, {school.province}
                      </div>

                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500">
                        <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{program.duration}</span>
                        <span className="inline-flex items-center gap-1.5"><GraduationCap className="h-3.5 w-3.5" />{program.entryType}</span>
                      </div>

                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                        {program.overview}
                      </p>

                      <div className="mt-auto flex flex-wrap gap-2 border-t border-black/5 pt-5">
                        {program.whatYouStudy.slice(0, 2).map((area) => (
                          <span
                            key={area}
                            className="rounded-full bg-[#f1f3f3] px-3 py-1 text-xs text-gray-600"
                          >
                            {area}
                          </span>
                        ))}
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
