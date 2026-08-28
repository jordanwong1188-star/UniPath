import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft, ArrowRight, BookOpen, BriefcaseBusiness, CheckCircle2,
  Clock3, Compass, ExternalLink, GraduationCap, Lightbulb, MapPin,
  Route, ShieldCheck, Sparkles, Target, TriangleAlert,
} from "lucide-react";
import schools from "@/data/canadianSchools.json";
import { getProgramById, programDetails } from "@/data/programDetails";
import SiteHeader from "@/app/components/SiteHeader";

const supplementalRoutes: Record<string, string> = {
  "ubc-sauder-bcom": "ubc-sauder-bcom",
  "western-ivey-aeo": "western-ivey-aeo",
  "western-ivey": "western-ivey-aeo",
  "queens-commerce": "queens-commerce",
  "rotman-commerce": "rotman-commerce",
  "uoft-rotman-commerce": "rotman-commerce",
  "schulich-bba": "schulich-bba",
  "waterloo-engineering": "waterloo-engineering",
  "waterloo-mathematics": "waterloo-mathematics",
  "waterloo-afm": "waterloo-afm",
  "mcmaster-commerce": "mcmaster-commerce",
  "mcmaster-engineering": "mcmaster-engineering",
  "mcmaster-computer-science": "mcmaster-computer-science",
  "sfu-beedie-bba": "sfu-beedie-bba",
  "uoft-engineering": "uoft-engineering",
};

export function generateStaticParams() {
  return programDetails.map((program) => ({
    id: program.universityId,
    programId: program.id,
  }));
}

function buildFitGuidance(program: (typeof programDetails)[number]) {
  const subjects = program.whatYouStudy.slice(0, 3);
  const skills = program.skills.slice(0, 3);
  const careers = program.careers.slice(0, 3);

  return {
    goodFit: [
      `You are curious about ${subjects.join(", ").toLowerCase()}.`,
      `You want to strengthen ${skills.join(", ").toLowerCase()}.`,
      `Paths such as ${careers.join(", ").toLowerCase()} sound worth exploring.`,
    ],
    thinkTwice: [
      "The learning style described below does not match how you prefer to work.",
      "Most core subjects feel like requirements to tolerate rather than topics to explore.",
      "You are choosing mainly for the title without checking courses, entry path, and likely next steps.",
    ],
  };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ id: string; programId: string }>;
}) {
  const { id, programId } = await params;
  const program = getProgramById(id, programId);
  const school = schools.find((item) => item.id === id);
  if (!program || !school) notFound();

  const isIvey = program.id === "western-ivey-aeo" || program.id === "western-ivey";
  const supplementalId = supplementalRoutes[program.id];
  const guidance = buildFitGuidance(program);
  const relatedPrograms = programDetails
    .filter(
      (item) =>
        item.universityId === program.universityId &&
        item.id !== program.id &&
        (item.school === program.school ||
          item.whatYouStudy.some((subject) => program.whatYouStudy.includes(subject)))
    )
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#f2efe8] text-[#172126]">
      <SiteHeader dark />
      <div className="border-b border-white/10 bg-[#132c29]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-3 lg:px-10">
          <Link href={`/unis/${school.id}/programs`} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.1em] text-white/55">
            <ArrowLeft className="h-3.5 w-3.5" /> Programs at {school.shortName}
          </Link>
          <Link href="/programs" className="text-xs font-semibold uppercase tracking-[.1em] text-white/55">All programs</Link>
        </div>
      </div>

      <section className={`${isIvey ? "bg-[#17365d]" : "bg-[#172126]"} text-white`}>
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em]">
            <span className="rounded-full bg-white/10 px-3 py-1.5 text-[#c8f169]">{program.degree}</span>
            <span className="text-white/45">{program.school}</span>
          </div>
          <h1 className="mt-6 max-w-5xl text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">{program.name}</h1>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/55">
            <span className="inline-flex items-center gap-2"><GraduationCap className="h-4 w-4" /> {school.name}</span>
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> {school.city}, {school.province}</span>
          </div>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/72">{program.overview}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[minmax(0,1fr)_350px] lg:px-10">
        <div className="space-y-7">
          <section className="grid gap-4 sm:grid-cols-3">
            <SnapshotCard icon={Clock3} label="Typical length" value={program.duration} />
            <SnapshotCard icon={Route} label="Entry pathway" value={program.entryType} />
            <SnapshotCard icon={GraduationCap} label="Credential" value={program.degree} />
          </section>

          <section className="rounded-[1.75rem] bg-white p-6 shadow-sm sm:p-8">
            <SectionHeading
              icon={Compass}
              eyebrow="Interest and learning fit"
              title="Could this fit you?"
              description="Use these prompts to judge the match between the program and how you actually want to spend the next several years."
            />
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              <FitPanel title="Worth a closer look if..." items={guidance.goodFit} positive />
              <FitPanel title="Think carefully if..." items={guidance.thinkTwice} />
            </div>
          </section>

          <section className="rounded-[1.75rem] bg-white p-6 shadow-sm sm:p-8">
            <SectionHeading
              icon={BookOpen}
              eyebrow="Academic direction"
              title="What you are likely to study"
              description="These subject areas summarize the academic direction. Course names and required credits vary by calendar year and specialization."
            />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {program.whatYouStudy.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-black/6 bg-[#faf9f6] p-4 text-sm font-medium">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#2f6d62]" />{item}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[1.75rem] bg-[#dfe9e5] p-6 sm:p-8">
            <SectionHeading icon={Lightbulb} eyebrow="Day-to-day learning" title="What the program may feel like" description={program.experience} />
          </section>

          <div className="grid gap-7 xl:grid-cols-2">
            <InfoList icon={Sparkles} eyebrow="Areas to explore" title="Specializations and themes" items={program.specializations} />
            <InfoList icon={Target} eyebrow="What you build" title="Skills you can develop" items={program.skills} />
          </div>

          <section className="rounded-[1.75rem] bg-white p-6 shadow-sm sm:p-8">
            <SectionHeading
              icon={BriefcaseBusiness}
              eyebrow="After graduation"
              title="Where this path can lead"
              description="A degree does not lock you into one job. These are broad directions to research alongside internships, professional requirements, and further study."
            />
            <div className="mt-6 flex flex-wrap gap-3">
              {program.careers.map((career) => (
                <span key={career} className="rounded-full border border-black/8 bg-[#f6f3ed] px-4 py-2 text-sm font-medium">{career}</span>
              ))}
            </div>
          </section>

          {isIvey ? (
            <section className="rounded-[1.75rem] bg-[#e7edf5] p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#17365d]">Important distinction</p>
              <h2 className="mt-3 text-2xl font-semibold">AEO is a status, not your first-year degree</h2>
              <p className="mt-3 text-sm leading-7 text-gray-600">
                Apply to any Western, Huron, or King&apos;s program for years one and two, select your AEO intention on OUAC, and complete the separate Ivey supplemental application. AEO remains conditional on meeting Ivey&apos;s progression requirements.
              </p>
            </section>
          ) : null}

          {relatedPrograms.length > 0 ? (
            <section className="rounded-[1.75rem] border border-black/7 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">Keep comparing</p>
              <h2 className="mt-2 text-2xl font-semibold">Related paths at {school.shortName}</h2>
              <div className="mt-6 grid gap-3">
                {relatedPrograms.map((item) => (
                  <Link key={item.id} href={`/unis/${school.id}/programs/${item.id}`} className="group flex items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="mt-1 text-xs text-gray-500">{item.degree} · {item.entryType}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <aside className="h-fit space-y-5 lg:sticky lg:top-6">
          <section className="rounded-[1.75rem] bg-[#172126] p-6 text-white">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-[#c8f169]" />
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">Admission snapshot</p>
            </div>
            <dl className="mt-6 space-y-5">
              <Fact label="Admission path" value={program.admissionInfo} />
              <Fact label="Published average" value={program.admissionAverage} />
              <Fact label="Application deadline" value={program.applicationDeadline} />
            </dl>
            <div className="mt-6 rounded-xl border border-amber-200/15 bg-amber-100/[0.06] p-4">
              <div className="flex gap-3">
                <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-[#ffd48a]" />
                <p className="text-xs leading-5 text-white/55">Requirements can change by applicant type, province, campus, and year. Verify prerequisites and dates before applying.</p>
              </div>
            </div>
            <a href={program.officialUrl} target="_blank" rel="noopener noreferrer" className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-[#c8f169] px-4 py-3 text-sm font-semibold text-[#172126]">
              Verify on official page <ExternalLink className="h-4 w-4" />
            </a>
          </section>

          <section className="rounded-[1.75rem] bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">Next step</p>
            <h2 className="mt-2 text-xl font-semibold">Compare it with your profile</h2>
            <p className="mt-3 text-sm leading-6 text-gray-500">Use your grades, preferred subjects, and activities to see how this path compares with other Canadian programs.</p>
            <Link href="/match" className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-[#172126] px-4 py-3 text-sm font-semibold text-white">
              Open program match <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={`/unis/${school.id}`} className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-black/10 px-4 py-3 text-sm font-semibold">
              View {school.shortName} profile
            </Link>
            {supplementalId ? (
              <Link href={`/applications/${supplementalId}`} className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-[#17365d]/20 bg-[#e7edf5] px-4 py-3 text-sm font-semibold text-[#17365d]">
                Open supplemental practice <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link href="/applications" className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-black/10 px-4 py-3 text-sm font-semibold">Check application practice</Link>
            )}
          </section>
        </aside>
      </section>
    </main>
  );
}

function SnapshotCard({ icon: Icon, label, value }: { icon: typeof Clock3; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <Icon className="h-5 w-5 text-[#2f6d62]" />
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">{label}</p>
      <p className="mt-1 text-sm font-semibold leading-6">{value}</p>
    </div>
  );
}

function FitPanel({ title, items, positive = false }: { title: string; items: string[]; positive?: boolean }) {
  return (
    <div className={`rounded-2xl p-5 ${positive ? "bg-[#edf5e2]" : "bg-[#f6f3ed]"}`}>
      <h3 className="font-semibold">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-600">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            {positive ? <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#2f6d62]" /> : <TriangleAlert className="mt-1 h-4 w-4 shrink-0 text-[#9a7041]" />}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionHeading({ icon: Icon, eyebrow, title, description }: { icon: typeof BookOpen; eyebrow: string; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="rounded-xl bg-[#f2efe8] p-3"><Icon className="h-5 w-5" /></div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-semibold">{title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function InfoList({ icon: Icon, eyebrow, title, items }: { icon: typeof Sparkles; eyebrow: string; title: string; items: string[] }) {
  return (
    <section className="rounded-[1.75rem] bg-white p-6 shadow-sm sm:p-8">
      <Icon className="h-5 w-5 text-[#2f6d62]" />
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">{eyebrow}</p>
      <h2 className="mt-2 text-xl font-semibold">{title}</h2>
      <ul className="mt-5 space-y-3 text-sm text-gray-600">
        {items.map((item) => (
          <li key={item} className="flex gap-3 border-t border-black/5 pt-3 first:border-0 first:pt-0">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2f6d62]" />{item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium text-white/40">{label}</dt>
      <dd className="mt-1 text-sm font-medium leading-6 text-white/85">{value}</dd>
    </div>
  );
}
