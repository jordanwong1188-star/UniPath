import Link from "next/link";
import { CalendarDays, ExternalLink } from "lucide-react";

export default function DeadlinesPage() {
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


      <section className="mx-auto max-w-5xl px-6 py-16">

        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-sm">
          <CalendarDays className="h-6 w-6" />
        </div>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
          Stay organized
        </p>

        <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">
          Application Deadlines
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-500">
          Keep track of important university application dates and
          make sure you know when applications need to be submitted.
        </p>


        <div className="mt-12 rounded-2xl border border-black/5 bg-white p-8 shadow-sm">

          <h2 className="text-xl font-semibold">
            Deadline information is being built
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500">
            UniPath is being built to bring Canadian university
            deadlines together in one place. Until deadline data is
            available here, always verify dates directly with the
            university before submitting an application.
          </p>

          <Link
            href="/universities"
            className="mt-7 inline-flex rounded-xl bg-[#172126] px-5 py-3 text-sm font-semibold text-white"
          >
            Browse universities
          </Link>

        </div>

      </section>

    </main>
  );
}