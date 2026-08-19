import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CircleHelp,
  GraduationCap,
  School,
} from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f5f7f8] text-[#172126]">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#172126]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>

          <Link href="/" className="text-lg font-bold tracking-tight">
            UniPath
          </Link>
        </div>
      </header>

      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="max-w-3xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#172126] text-white">
              <CircleHelp className="h-6 w-6" />
            </div>

            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Contact & support
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Need help finding the right information?
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              UniPath is built to make Canadian university and college research
              easier. Start with the resources below, and always confirm final
              admission requirements on the official institution website.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        <div className="grid gap-5 md:grid-cols-3">
          <Link
            href="/universities"
            className="group rounded-2xl border border-black/5 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf1f1]">
              <School className="h-5 w-5" />
            </div>
            <h2 className="mt-5 text-xl font-semibold">Explore schools</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Compare universities and colleges across Canada by location,
              school type and available programs.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
              Browse universities
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            href="/programs"
            className="group rounded-2xl border border-black/5 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf1f1]">
              <GraduationCap className="h-5 w-5" />
            </div>
            <h2 className="mt-5 text-xl font-semibold">Find programs</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Search major undergraduate programs and study areas across the
              schools currently indexed by UniPath.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
              Search programs
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            href="/deadlines"
            className="group rounded-2xl border border-black/5 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf1f1]">
              <BookOpen className="h-5 w-5" />
            </div>
            <h2 className="mt-5 text-xl font-semibold">Check deadlines</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Review application timing and use each school's official website
              as the final source for current dates and requirements.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
              View deadlines
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </Link>
        </div>

        <div className="mt-8 rounded-2xl border border-black/5 bg-[#edf1f1] p-6 text-sm leading-7 text-gray-600">
          <p className="font-semibold text-[#172126]">Found something inaccurate?</p>
          <p className="mt-2">
            Admission requirements, program availability and deadlines can
            change. Every UniPath program page links to an official source so
            you can verify the latest information directly with the school.
          </p>
        </div>
      </section>
    </main>
  );
}
