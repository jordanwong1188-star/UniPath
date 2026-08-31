import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Mail,
  MessageCircleQuestion,
} from "lucide-react";

const supportEmail = "unipath.guidance@gmail.com";
const emailHref =
  "mailto:unipath.guidance@gmail.com?subject=UniPath%20Support%20Request&body=Hi%20UniPath%2C%0A%0AI%20need%20help%20with%3A%20%0A%0A";

const helpTopics = [
  "Using UniPath or finding a feature",
  "Reporting incorrect university information",
  "Questions about your account or subscription",
  "Sharing feedback or suggesting an improvement",
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f5f7f8] text-[#172126]">
      <header className="border-b border-black/5 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 lg:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-[#172126]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to UniPath
          </Link>

          <Link href="/" className="text-xl font-bold tracking-tight">
            UniPath
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
          <div className="rounded-[2rem] bg-[#172126] p-8 text-white sm:p-12">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <MessageCircleQuestion className="h-6 w-6" />
            </div>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Contact &amp; Help
            </p>

            <h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
              How can we help?
            </h1>

            <p className="mt-5 max-w-xl leading-7 text-white/65">
              If you have a question, found information that needs correcting,
              or want to share feedback, email the UniPath team directly.
            </p>

            <a
              href={emailHref}
              className="mt-9 inline-flex items-center gap-3 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-[#172126] transition hover:bg-gray-100"
            >
              <Mail className="h-5 w-5" />
              Email UniPath support
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <p className="mt-4 text-sm text-white/55">{supportEmail}</p>
          </div>

          <div className="rounded-[2rem] border border-black/5 bg-white p-8 shadow-sm sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
              What we can help with
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Send us a clear description
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              Include the page you were using and what happened. Screenshots are
              helpful when you are reporting a problem.
            </p>

            <div className="mt-8 space-y-4">
              {helpTopics.map((topic) => (
                <div key={topic} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#60787c]" />
                  <span className="text-sm leading-6 text-gray-700">{topic}</span>
                </div>
              ))}
            </div>

            <div className="mt-9 rounded-2xl bg-[#f5f7f8] p-5">
              <p className="text-sm font-semibold">Before relying on a deadline</p>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                University requirements can change. Always confirm important
                admissions details on the university&apos;s official website.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
