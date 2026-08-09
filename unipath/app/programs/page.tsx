"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  Cog,
  HeartPulse,
  Palette,
  Scale,
} from "lucide-react";

const programs = [
  {
    name: "Business",
    description:
      "Explore business, commerce, finance, marketing, accounting, and management.",
    icon: BriefcaseBusiness,
  },
  {
    name: "Computer Science",
    description:
      "Explore computing, software development, data, AI, and technology.",
    icon: Code2,
  },
  {
    name: "Engineering",
    description:
      "Explore engineering disciplines and technical programs across Canada.",
    icon: Cog,
  },
  {
    name: "Health Sciences",
    description:
      "Explore health, science, nursing, kinesiology, and related programs.",
    icon: HeartPulse,
  },
  {
    name: "Arts & Humanities",
    description:
      "Explore history, languages, communications, psychology, and the humanities.",
    icon: Palette,
  },
  {
    name: "Law & Social Sciences",
    description:
      "Explore political science, sociology, criminology, economics, and related fields.",
    icon: Scale,
  },
];

export default function ProgramsPage() {
  const searchParams = useSearchParams();
  const school = searchParams.get("school");

  return (
    <main className="min-h-screen bg-[#f5f7f8] text-[#172126]">

      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">

          <Link href="/" className="text-2xl font-bold">
            UniPath
          </Link>

          <Link
            href="/universities"
            className="text-sm font-semibold"
          >
            Universities
          </Link>

        </div>
      </header>


      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
          Find your field
        </p>

        <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">
          Explore Programs
        </h1>

        <p className="mt-4 max-w-2xl text-gray-500">
          Explore major areas of study and find universities offering
          programs that match your interests.
        </p>

        {school && (
          <div className="mt-6 rounded-xl border border-black/5 bg-white px-5 py-4 text-sm">
            Showing programs for selected university.
          </div>
        )}


        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {programs.map((program) => {

            const Icon = program.icon;

            return (
              <div
                key={program.name}
                className="rounded-2xl border border-black/5 bg-white p-7 shadow-sm"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf1f1]">
                  <Icon className="h-5 w-5" />
                </div>

                <h2 className="mt-6 text-xl font-semibold">
                  {program.name}
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {program.description}
                </p>

                <Link
                  href={
                    school
                      ? `/universities?search=${encodeURIComponent(school)}`
                      : "/universities"
                  }
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold"
                >
                  Find universities
                  <ArrowRight className="h-4 w-4" />
                </Link>

              </div>
            );
          })}

        </div>

      </section>

    </main>
  );
}