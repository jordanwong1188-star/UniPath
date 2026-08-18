"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, GraduationCap } from "lucide-react";
import schools from "@/data/canadianSchools.json";
import { getProgramsForUniversity } from "@/data/programDetails";

export default function UniversityProgramsPage() {
  const params = useParams();
  const universityId = String(params.id);

  const university = schools.find(
    (school) => school.id === universityId
  );

  if (!university) {
    return (
      <main className="min-h-screen bg-[#f5f7f8] px-6 py-20">
        <Link href="/universities">
          <ArrowLeft className="inline h-4 w-4" />
          Back to universities
        </Link>

        <h1 className="mt-10 text-4xl font-bold">
          University not found
        </h1>
      </main>
    );
  }

  const programs = getProgramsForUniversity(university.id);

  return (
    <main className="min-h-screen bg-[#f5f7f8] text-[#172126]">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <Link
            href={`/unis/${university.id}`}
            className="inline-flex items-center gap-2 text-sm text-gray-500"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {university.shortName}
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#172126] text-white">
          <GraduationCap className="h-6 w-6" />
        </div>

        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
          Programs
        </p>

        <h1 className="mt-3 text-5xl font-semibold">
          {university.name}
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600">
          Explore programs and learn what each one focuses on,
          what you can study, and potential career paths.
        </p>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <Link
              key={program.id}
              href={`/unis/${university.id}/programs/${program.id}`}
              className="group rounded-2xl border border-black/10 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-400">
                    {program.degree}
                  </p>

                  <h2 className="mt-2 text-xl font-semibold">
                    {program.name}
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    {program.school}
                  </p>
                </div>

                <ArrowRight className="h-5 w-5 text-gray-300 group-hover:translate-x-1" />
              </div>

              <p className="mt-5 text-sm leading-6 text-gray-600">
                {program.overview}
              </p>

              <p className="mt-5 text-xs text-gray-400">
                {program.duration}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
