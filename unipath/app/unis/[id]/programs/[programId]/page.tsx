import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Lightbulb,
  Target,
} from "lucide-react";
import schools from "@/data/canadianSchools.json";
import { getProgramById } from "@/data/programDetails";

export default async function ProgramPage({
  params,
}: {
  params: Promise<{
    id: string;
    programId: string;
  }>;
}) {
  const { id, programId } = await params;
  const university = schools.find((school) => school.id === id);
  const program = getProgramById(id, programId);

  if (!university || !program) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f5f7f8] text-[#172126]">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link
            href={`/unis/${id}/programs`}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#172126]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {university.shortName} programs
          </Link>

          <Link href="/" className="text-lg font-bold tracking-tight">
            UniPath
          </Link>
        </div>
      </header>

      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-18">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-end">
            <div className="max-w-4xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#172126] text-white">
                <GraduationCap className="h-7 w-7" />
              </div>

              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                {university.shortName} · {program.school}
              </p>

              <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                {program.name}
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
                {program.overview}
              </p>
            </div>

            <div className="rounded-2xl border border-black/8 bg-[#f7f8f8] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
                Official information
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Use UniPath to understand the program, then verify current
                requirements directly with the school.
              </p>
              <a
                href={program.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#172126] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#29383e]"
              >
                View official program page
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <InfoCard label="Degree" value={program.degree} />
          <InfoCard label="Typical duration" value={program.duration} />
          <InfoCard label="Admission average" value={program.admissionAverage} />
          <InfoCard label="Application deadline" value={program.applicationDeadline} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_.65fr]">
          <div className="space-y-6">
            <SectionCard
              icon={<BookOpen className="h-5 w-5" />}
              eyebrow="Academics"
              title="What you'll study"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {program.whatYouStudy.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl bg-[#f7f8f8] px-4 py-3 text-sm text-gray-700"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                    {item}
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard
              icon={<Lightbulb className="h-5 w-5" />}
              eyebrow="Student experience"
              title="What the program is like"
            >
              <p className="text-base leading-8 text-gray-600">
                {program.experience}
              </p>
            </SectionCard>

            <SectionCard
              icon={<Target className="h-5 w-5" />}
              eyebrow="Options"
              title="Areas you may explore"
            >
              <div className="flex flex-wrap gap-2">
                {program.specializations.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-black/8 bg-white px-4 py-2 text-sm text-gray-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </SectionCard>

            <SectionCard
              icon={<Briefcase className="h-5 w-5" />}
              eyebrow="Outcomes"
              title="Typical career directions"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {program.careers.map((career) => (
                  <div
                    key={career}
                    className="rounded-xl border border-black/5 bg-[#f7f8f8] px-4 py-3 text-sm font-medium"
                  >
                    {career}
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs leading-5 text-gray-400">
                Career examples are possible directions, not guaranteed
                outcomes. Many graduates work outside the most obvious roles
                associated with their degree.
              </p>
            </SectionCard>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl bg-[#172126] p-7 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                Skills you can build
              </p>
              <div className="mt-5 space-y-4">
                {program.skills.map((skill) => (
                  <div key={skill} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white/50" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-black/8 bg-white p-7">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Admissions</h2>
              </div>

              <p className="mt-5 text-sm leading-7 text-gray-600">
                {program.admissionInfo}
              </p>

              <div className="mt-6 border-t border-black/5 pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                  Competitive average
                </p>
                <p className="mt-2 text-sm font-semibold">
                  {program.admissionAverage}
                </p>
              </div>

              <div className="mt-5 border-t border-black/5 pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                  Deadline
                </p>
                <p className="mt-2 text-sm font-semibold">
                  {program.applicationDeadline}
                </p>
              </div>

              <a
                href={program.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold"
              >
                Check official requirements
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <div className="rounded-2xl border border-black/5 bg-[#edf1f1] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
                Faculty / school
              </p>
              <p className="mt-2 font-semibold">{program.school}</p>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {university.name}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold leading-6">{value}</p>
    </div>
  );
}

function SectionCard({
  icon,
  eyebrow,
  title,
  children,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-black/5 bg-white p-7 shadow-sm sm:p-8">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#edf1f1]">
          {icon}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
            {eyebrow}
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">
            {title}
          </h2>
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}
