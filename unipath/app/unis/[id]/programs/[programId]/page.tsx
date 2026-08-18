import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Briefcase, GraduationCap } from "lucide-react";
import schools from "@/data/canadianSchools.json";
import { programDetails } from "@/data/programDetails";

export default async function ProgramPage({
  params,
}: {
  params: Promise<{
    id: string;
    programId: string;
  }>;
}) {
  const { id, programId } = await params;

  const university = schools.find(
    (school) => school.id === id
  );

  const program = programDetails.find(
    (item) =>
      item.id === programId &&
      item.universityId === id
  );

  if (!university || !program) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f5f7f8] text-[#172126]">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <Link
            href={`/unis/${id}/programs`}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to programs
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#172126] text-white">
          <GraduationCap className="h-7 w-7" />
        </div>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
          {program.school}
        </p>

        <h1 className="mt-3 text-5xl font-semibold tracking-tight">
          {program.name}
        </h1>

        <p className="mt-4 text-lg text-gray-500">
          {university.name} · {program.degree} · {program.duration}
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6">
            <p className="text-xs uppercase tracking-wider text-gray-400">
              Degree
            </p>
            <p className="mt-2 font-semibold">
              {program.degree}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6">
            <p className="text-xs uppercase tracking-wider text-gray-400">
              Duration
            </p>
            <p className="mt-2 font-semibold">
              {program.duration}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6">
            <p className="text-xs uppercase tracking-wider text-gray-400">
              School
            </p>
            <p className="mt-2 font-semibold">
              {program.school}
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-white p-8 md:p-10">
          <h2 className="text-2xl font-semibold">
            What is this program?
          </h2>

          <p className="mt-5 text-base leading-8 text-gray-600">
            {program.overview}
          </p>

          <p className="mt-5 text-base leading-8 text-gray-600">
            {program.description}
          </p>
        </div>

        <div className="mt-8 rounded-3xl bg-[#172126] p-8 text-white md:p-10">
          <div className="flex items-center gap-3">
            <Briefcase className="h-5 w-5" />

            <h2 className="text-2xl font-semibold">
              Potential career paths
            </h2>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {program.careers.map((career) => (
              <span
                key={career}
                className="rounded-full bg-white/10 px-4 py-2 text-sm"
              >
                {career}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
