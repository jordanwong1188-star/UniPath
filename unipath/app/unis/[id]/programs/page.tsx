import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  GraduationCap,
} from "lucide-react";
import schools from "@/data/canadianSchools.json";
import { getProgramsForUniversity } from "@/data/programDetails";

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

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-18">
        <div className="flex flex-col gap-8 border-b border-black/5 pb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#172126] text-white">
              <GraduationCap className="h-6 w-6" />
            </div>

            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              {university.shortName} · Program guide
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Explore programs at {university.shortName}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              Start with these major undergraduate programs and study areas.
              Open a program for what you study, student experience, career
              paths and official admission information.
            </p>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white px-5 py-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
              Currently indexed
            </p>
            <p className="mt-1 text-2xl font-semibold">{programs.length}</p>
            <p className="mt-1 text-xs text-gray-500">
              Featured programs / study areas
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {programs.map((program) => (
            <article
              key={program.id}
              className="flex flex-col rounded-2xl border border-black/8 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                    {program.degree}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight">
                    {program.name}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {program.school}
                  </p>
                </div>

                <span className="shrink-0 rounded-full bg-[#f2f4f4] px-3 py-1 text-xs font-medium text-gray-600">
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
                  Official page
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-black/5 bg-[#edf1f1] p-5 text-sm leading-6 text-gray-600">
          UniPath is building toward full program coverage. These cards focus on
          major programs and study areas rather than claiming to list every
          credential offered by {university.name}. Always verify current
          requirements and offerings on the official school website.
        </div>
      </section>
    </main>
  );
}
