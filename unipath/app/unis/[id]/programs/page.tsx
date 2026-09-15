import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, GraduationCap } from "lucide-react";
import schools from "@/data/canadianSchools.json";
import { getProgramsForUniversity } from "@/data/programDetails";
import ProgramCatalogClient from "./ProgramCatalogClient";

export default async function UniversityProgramsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const university = schools.find((school) => school.id === id);

  if (!university) {
    notFound();
  }

  const programs = getProgramsForUniversity(university.id);
  const directEntryCount = programs.filter(
    (program) => program.entryType === "Direct entry"
  ).length;
  const laterChoiceCount = programs.filter(
    (program) => program.entryType === "Choose after first year"
  ).length;

  return (
    <main className="min-h-screen bg-[#f5f7f8] text-[#172126]">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link
            href={`/unis/${university.id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#172126]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {university.shortName}
          </Link>

          <Link href="/" className="text-lg font-bold tracking-tight">
            UniPath
          </Link>
        </div>
      </header>

      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-18">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#172126] text-white">
                <GraduationCap className="h-6 w-6" />
              </div>

              <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                {university.shortName} · Undergraduate catalog
              </p>

              <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                Programs at {university.shortName}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
                Explore undergraduate degrees, majors, diplomas, certificates
                and study pathways offered by {university.name}. UniPath
                separates direct high-school admission choices from majors you
                choose later so the application path is clear.
              </p>
            </div>

            <div className="grid min-w-72 grid-cols-3 gap-2 rounded-2xl border border-black/5 bg-[#f7f8f8] p-2">
              <StatCard label="Indexed" value={programs.length} />
              <StatCard label="Direct" value={directEntryCount} />
              <StatCard label="Later" value={laterChoiceCount} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-10">
        <ProgramCatalogClient
          university={{
            id: university.id,
            name: university.name,
            shortName: university.shortName,
          }}
          programs={programs}
        />
      </section>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-white px-4 py-3 text-center shadow-sm">
      <p className="text-xl font-semibold">{value}</p>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">
        {label}
      </p>
    </div>
  );
}
