"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  ExternalLink,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import type { ProgramDetail } from "@/data/programDetails";

type SchoolSummary = {
  id: string;
  name: string;
  shortName: string;
};

const entryOptions: Array<ProgramDetail["entryType"] | "All"> = [
  "All",
  "Direct entry",
  "Choose after first year",
  "Second entry",
  "Varies",
];

export default function ProgramCatalogClient({
  university,
  programs,
}: {
  university: SchoolSummary;
  programs: ProgramDetail[];
}) {
  const [query, setQuery] = useState("");
  const [schoolFilter, setSchoolFilter] = useState("All");
  const [entryFilter, setEntryFilter] = useState<
    ProgramDetail["entryType"] | "All"
  >("All");
  const [sort, setSort] = useState<"name" | "school">("name");

  const schools = useMemo(
    () => Array.from(new Set(programs.map((program) => program.school))).sort(),
    [programs]
  );

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return programs
      .filter((program) => {
        const matchesSchool =
          schoolFilter === "All" || program.school === schoolFilter;
        const matchesEntry =
          entryFilter === "All" || program.entryType === entryFilter;
        const haystack = [
          program.name,
          program.school,
          program.degree,
          program.entryType,
          ...program.whatYouStudy,
          ...program.careers,
        ]
          .join(" ")
          .toLowerCase();
        const matchesQuery =
          !normalizedQuery || haystack.includes(normalizedQuery);

        return matchesSchool && matchesEntry && matchesQuery;
      })
      .sort((a, b) => {
        if (sort === "school") {
          const schoolCompare = a.school.localeCompare(b.school);
          return schoolCompare || a.name.localeCompare(b.name);
        }
        return a.name.localeCompare(b.name);
      });
  }, [entryFilter, programs, query, schoolFilter, sort]);

  const clearFilters = () => {
    setQuery("");
    setSchoolFilter("All");
    setEntryFilter("All");
  };

  const hasFilters =
    query.length > 0 || schoolFilter !== "All" || entryFilter !== "All";

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
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
            placeholder="Psychology, engineering..."
            className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-gray-400"
          />
        </div>

        <label className="mt-6 block text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
          Faculty / school
        </label>
        <select
          value={schoolFilter}
          onChange={(event) => setSchoolFilter(event.target.value)}
          className="mt-2 w-full rounded-xl border border-black/10 bg-[#f7f8f8] px-3 py-3 text-sm outline-none"
        >
          <option value="All">All faculties / schools</option>
          {schools.map((school) => (
            <option key={school} value={school}>
              {school}
            </option>
          ))}
        </select>

        <label className="mt-6 block text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
          Admission path
        </label>
        <select
          value={entryFilter}
          onChange={(event) =>
            setEntryFilter(
              event.target.value as ProgramDetail["entryType"] | "All"
            )
          }
          className="mt-2 w-full rounded-xl border border-black/10 bg-[#f7f8f8] px-3 py-3 text-sm outline-none"
        >
          {entryOptions.map((option) => (
            <option key={option} value={option}>
              {option === "All" ? "All admission paths" : option}
            </option>
          ))}
        </select>

        <label className="mt-6 block text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
          Sort by
        </label>
        <select
          value={sort}
          onChange={(event) =>
            setSort(event.target.value as "name" | "school")
          }
          className="mt-2 w-full rounded-xl border border-black/10 bg-[#f7f8f8] px-3 py-3 text-sm outline-none"
        >
          <option value="name">Program name</option>
          <option value="school">Faculty / school</option>
        </select>

        <div className="mt-6 border-t border-black/5 pt-5">
          <p className="text-3xl font-semibold">{results.length}</p>
          <p className="mt-1 text-xs leading-5 text-gray-500">
            of {programs.length} indexed undergraduate programs and study paths
          </p>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 text-sm font-semibold underline-offset-4 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </aside>

      <div>
        {results.length === 0 ? (
          <div className="rounded-2xl border border-black/5 bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold">No programs found</h2>
            <p className="mt-2 text-sm text-gray-500">
              Try a broader search term or remove one of the filters.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 text-sm font-semibold underline-offset-4 hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid gap-5 xl:grid-cols-2">
            {results.map((program) => (
              <article
                key={program.id}
                className="flex flex-col rounded-2xl border border-black/8 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                        {program.degree}
                      </p>
                      <span className="rounded-full bg-[#edf1f1] px-2.5 py-1 text-[11px] font-semibold text-gray-600">
                        {program.entryType}
                      </span>
                    </div>

                    <h2 className="mt-3 text-xl font-semibold tracking-tight">
                      {program.name}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      {program.school}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-[#f7f8f8] px-3 py-1 text-xs font-medium text-gray-500">
                    {program.duration}
                  </span>
                </div>

                <p className="mt-5 line-clamp-4 text-sm leading-6 text-gray-600">
                  {program.overview}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {program.whatYouStudy.slice(0, 3).map((area) => (
                    <span
                      key={area}
                      className="rounded-full border border-black/5 bg-[#f7f8f8] px-3 py-1 text-xs text-gray-600"
                    >
                      {area}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
                  <Link
                    href={`/unis/${university.id}/programs/${program.id}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#172126] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#29383e]"
                  >
                    View program
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <a
                    href={program.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-black/10 px-4 py-2.5 text-sm font-semibold transition hover:bg-[#f5f7f8]"
                  >
                    Official source
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-black/5 bg-[#edf1f1] p-5 text-sm leading-6 text-gray-600">
          Some universities admit students directly to a specific program,
          while others admit to a broader faculty or first-year pathway before
          students declare a major. UniPath labels those routes separately so
          the catalog does not imply that every major is a direct Grade 12
          application choice. Current requirements and availability should
          always be confirmed with {university.name}.
        </div>
      </div>
    </div>
  );
}
