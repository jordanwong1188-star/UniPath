import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  GraduationCap,
  MapPin,
  CalendarDays,
  FileText,
} from "lucide-react";
import schools from "@/data/canadianSchools.json";

export default async function UniversityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const school = schools.find((school) => school.id === id);

  if (!school) {
    return (
      <main className="min-h-screen bg-[#f5f7f8] p-10 text-[#172126]">
        <h1 className="text-3xl font-bold">University not found</h1>

        <Link
          href="/universities"
          className="mt-5 inline-flex items-center gap-2 underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to universities
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7f8] text-[#172126]">

      {/* HEADER */}
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">

          <Link href="/" className="text-2xl font-bold">
            UniPath
          </Link>

          <Link
            href="/universities"
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <ArrowLeft className="h-4 w-4" />
            All universities
          </Link>

        </div>
      </header>


      {/* HERO */}
      <section className="border-b border-black/5 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">

          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">

            <div className="max-w-3xl">

              <div className="flex items-center gap-5">

                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#f1f4f4] p-4">

                  <img
                    src={`https://www.google.com/s2/favicons?domain=${school.domain}&sz=128`}
                    alt={`${school.name} logo`}
                    className="h-12 w-12 object-contain"
                  />

                </div>

                <div>

                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                    {school.shortName}
                  </p>

                  <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
                    {school.name}
                  </h1>

                </div>

              </div>

              <div className="mt-6 flex items-center gap-2 text-gray-500">
                <MapPin className="h-4 w-4" />
                {school.city}, {school.province}
              </div>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                Explore {school.name}, its programs, admission information,
                application deadlines, and other important information for
                prospective students.
              </p>

            </div>


            <a
              href={`https://${school.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#172126] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#29383e]"
            >
              Official website
              <ExternalLink className="h-4 w-4" />
            </a>

          </div>

        </div>

      </section>


      {/* QUICK LINKS */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <Link
            href={`/unis/${school.id}/programs`}
            className="group rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf1f1]">
              <GraduationCap className="h-5 w-5" />
            </div>

            <h2 className="mt-5 font-semibold">
              Explore Programs
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Browse faculties, degrees, and programs offered by this school.
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm font-semibold">
              View programs
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>

          </Link>


          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf1f1]">
              <FileText className="h-5 w-5" />
            </div>

            <h2 className="mt-5 font-semibold">
              Admissions
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Learn about admission requirements and typical competitive
              averages.
            </p>

            <span className="mt-5 block text-sm font-semibold text-gray-400">
              Coming soon
            </span>

          </div>


          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf1f1]">
              <CalendarDays className="h-5 w-5" />
            </div>

            <h2 className="mt-5 font-semibold">
              Deadlines
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Find important application and document deadlines.
            </p>

            <span className="mt-5 block text-sm font-semibold text-gray-400">
              Coming soon
            </span>

          </div>


          <a
            href={`https://${school.domain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf1f1]">
              <ExternalLink className="h-5 w-5" />
            </div>

            <h2 className="mt-5 font-semibold">
              Official Website
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Go directly to {school.shortName}'s official website.
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm font-semibold">
              Visit website
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>

          </a>

        </div>

      </section>


      {/* OVERVIEW */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">

        <div className="grid gap-6 lg:grid-cols-[1.4fr_.6fr]">

          <div className="rounded-2xl border border-black/5 bg-white p-8 lg:p-10">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              University overview
            </p>

            <h2 className="mt-4 text-3xl font-semibold">
              About {school.shortName}
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              {school.name} is a {school.type.toLowerCase()} located in{" "}
              {school.city}, {school.province}. Use UniPath to explore the
              programs, admission information, deadlines, and other factors
              that can help you decide whether this school is right for you.
            </p>

          </div>


          <div className="rounded-2xl bg-[#172126] p-8 text-white">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              At a glance
            </p>

            <div className="mt-7 space-y-6">

              <div>
                <p className="text-xs text-white/40">School</p>
                <p className="mt-1 font-medium">{school.name}</p>
              </div>

              <div>
                <p className="text-xs text-white/40">Location</p>
                <p className="mt-1 font-medium">
                  {school.city}, {school.province}
                </p>
              </div>

              <div>
                <p className="text-xs text-white/40">Type</p>
                <p className="mt-1 font-medium">{school.type}</p>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="border-t border-black/5 bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8 lg:px-10">

          <div>
            <div className="font-semibold">UniPath</div>
            <p className="mt-1 text-xs text-gray-500">
              Your university journey, organized.
            </p>
          </div>

          <Link
            href="/universities"
            className="text-sm font-semibold hover:underline"
          >
            Browse universities
          </Link>

        </div>

      </footer>

    </main>
  );
}