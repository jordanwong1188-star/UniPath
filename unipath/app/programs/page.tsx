"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  GraduationCap,
  MapPin,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import schools from "@/data/canadianSchools.json";
import { programDetails } from "@/data/programDetails";

const provinces = Array.from(
  new Set(schools.map((school) => school.province))
).sort();

function ProgramsContent() {
  const searchParams = useSearchParams();
  const schoolFilter = searchParams.get("school")?.trim().toLowerCase() ?? "";
  const [query, setQuery] = useState("");
  const [province, setProvince] = useState("All");

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

      return matchesSchoolFilter && matchesProvince && matchesQuery;
    });
  }, [province, query, schoolFilter]);

  const selectedSchool = schoolFilter
    ? schools.find(
        (school) =>
          school.id.toLowerCase() === schoolFilter ||
          school.name.toLowerCase().includes(schoolFilter) ||
          school.shortName.toLowerCase().includes(schoolFilter)
      )
    : undefined;

  return (
    <main className="min-h-screen bg-[#f5f7f8] text-[#172126]">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            UniPath
          </Link>

          <nav className="flex items-center gap-5 text-sm font-semibold">
            <Link href="/universities" className="transition hover:text-gray-500">
              Universities
            </Link>
            <Link href="/deadlines" className="hidden transition hover:text-gray-500 sm:block">
              Deadlines
            </Link>
          </nav>
        </div>
      </header>

      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-18">
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
              Search UniPath&apos;s growing program catalog by field, faculty,
              degree or school. Each result leads to a student-friendly research
              page and the official source.
            </p>
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
          <aside className="h-fit rounded-2xl border border-black/5 bg-white p-5 shadow-sm lg:sticky lg:top-6">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              <h2 className="text-sm font-semibold">Filter programs</h2>
            </div>

            <label className="mt-6 block text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
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
            <select
              value={province}
              onChange={(event) => setProvince(event.target.value)}
              className="mt-2 w-full rounded-xl border border-black/10 bg-[#f7f8f8] px-3 py-3 text-sm outline-none"
            >
              <option value="All">All provinces</option>
              {provinces.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <div className="mt-6 border-t border-black/5 pt-5">
              <p className="text-3xl font-semibold">{results.length}</p>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                matching featured programs and study areas
              </p>
            </div>
          </aside>

          <div>
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
                      className="group flex min-h-72 flex-col rounded-2xl border border-black/7 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
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

                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                        {program.overview}
                      </p>

                      <div className="mt-auto flex flex-wrap gap-2 pt-5">
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
