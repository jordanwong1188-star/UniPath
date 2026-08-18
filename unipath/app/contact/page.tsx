cat > app/unis/[id]/page.tsx <<'EOF'
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  MapPin,
} from "lucide-react";
import schools from "@/data/canadianSchools.json";

type Program = {
  name: string;
  description: string;
  admissionAverage: string;
};

const programData: Record<string, Program[]> = {
  ubc: [
    {
      name: "Sauder School of Business",
      description:
        "Business, commerce, finance, accounting, marketing, entrepreneurship and management.",
      admissionAverage: "Highly competitive; admission is typically in the low-to-mid 90s.",
    },
    {
      name: "Computer Science",
      description:
        "Programming, software development, artificial intelligence, data science and computing.",
      admissionAverage: "Highly competitive; typically requires a very strong high-school average.",
    },
    {
      name: "Engineering",
      description:
        "Engineering fundamentals followed by specialized study in areas such as mechanical, electrical and civil engineering.",
      admissionAverage: "Highly competitive; typically requires a low-to-mid 90s admission profile.",
    },
    {
      name: "Arts",
      description:
        "Humanities, social sciences, psychology, economics, political science, languages and related disciplines.",
      admissionAverage: "Competitive; requirements vary significantly by program.",
    },
    {
      name: "Science",
      description:
        "Biology, chemistry, physics, mathematics, earth sciences and other scientific disciplines.",
      admissionAverage: "Competitive; stronger averages are generally needed for popular majors.",
    },
  ],

  sfu: [
    {
      name: "Beedie School of Business",
      description:
        "Business, finance, accounting, marketing, entrepreneurship and management.",
      admissionAverage: "Competitive; admission averages vary by applicant category and program.",
    },
    {
      name: "Computing Science",
      description:
        "Computer science, software, artificial intelligence, algorithms and data.",
      admissionAverage: "Competitive; a strong high-school average is recommended.",
    },
    {
      name: "Engineering Science",
      description:
        "Engineering, technology, mathematics and applied science.",
      admissionAverage: "Competitive; strong results in mathematics and sciences are important.",
    },
    {
      name: "Health Sciences",
      description:
        "Health, population health, biology and preparation for health-related careers.",
      admissionAverage: "Competitive; requirements vary by admission category.",
    },
    {
      name: "Arts & Social Sciences",
      description:
        "Psychology, economics, political science, sociology, communications and humanities.",
      admissionAverage: "Requirements vary by program and applicant category.",
    },
  ],

  uvic: [
    {
      name: "Gustavson School of Business",
      description:
        "Commerce, entrepreneurship, accounting, finance, marketing and management.",
      admissionAverage: "Competitive; requirements vary by admission category.",
    },
    {
      name: "Computer Science",
      description:
        "Programming, software engineering, algorithms, data and computing.",
      admissionAverage: "Competitive; strong mathematics preparation is recommended.",
    },
    {
      name: "Engineering",
      description:
        "Engineering fundamentals and specialized engineering disciplines.",
      admissionAverage: "Competitive; strong mathematics and science preparation is important.",
    },
    {
      name: "Science",
      description:
        "Biology, chemistry, physics, mathematics and other scientific fields.",
      admissionAverage: "Competitive; varies by program.",
    },
    {
      name: "Humanities & Social Sciences",
      description:
        "History, economics, psychology, political science, languages and related subjects.",
      admissionAverage: "Requirements vary by program.",
    },
  ],

  uoft: [
    {
      name: "Rotman Commerce",
      description:
        "Business, commerce, finance, accounting, management and economics.",
      admissionAverage: "Highly competitive; applicants generally need an excellent academic profile.",
    },
    {
      name: "Computer Science",
      description:
        "Computer science, software, algorithms, artificial intelligence and data.",
      admissionAverage: "Highly competitive; typically requires a very strong academic profile.",
    },
    {
      name: "Engineering",
      description:
        "Engineering, technology, mathematics and applied sciences.",
      admissionAverage: "Highly competitive; strong mathematics and science results are important.",
    },
    {
      name: "Life Sciences",
      description:
        "Biology, health, biomedical sciences, neuroscience and related disciplines.",
      admissionAverage: "Highly competitive at many campuses and programs.",
    },
    {
      name: "Arts & Science",
      description:
        "A broad range of humanities, social sciences, sciences and interdisciplinary programs.",
      admissionAverage: "Competitive; varies considerably by program.",
    },
  ],

  waterloo: [
    {
      name: "Computer Science",
      description:
        "Software development, algorithms, artificial intelligence, data and computing.",
      admissionAverage: "Extremely competitive; applicants typically need a very strong academic profile.",
    },
    {
      name: "Software Engineering",
      description:
        "Software development combined with engineering, mathematics and computer science.",
      admissionAverage: "Extremely competitive; among the most selective programs.",
    },
    {
      name: "Engineering",
      description:
        "Engineering disciplines including mechanical, electrical, civil and systems design.",
      admissionAverage: "Highly competitive; strong mathematics and science grades are important.",
    },
    {
      name: "Mathematics",
      description:
        "Pure and applied mathematics, statistics, computing and related quantitative fields.",
      admissionAverage: "Highly competitive for popular programs.",
    },
    {
      name: "AFM / Accounting & Finance",
      description:
        "Accounting, finance, business analytics and financial management.",
      admissionAverage: "Competitive; admission requirements vary by program.",
    },
  ],
};

const generalPrograms: Program[] = [
  {
    name: "Business",
    description:
      "Business, commerce, finance, accounting, marketing, entrepreneurship and management.",
    admissionAverage: "Admission requirements vary by university and program.",
  },
  {
    name: "Computer Science",
    description:
      "Programming, software development, artificial intelligence, data and computing.",
    admissionAverage: "Admission requirements vary; popular programs can be highly competitive.",
  },
  {
    name: "Engineering",
    description:
      "Engineering, mathematics, technology and applied sciences.",
    admissionAverage: "Admission requirements vary by university and discipline.",
  },
  {
    name: "Health Sciences",
    description:
      "Health, biology, nursing, kinesiology and related fields.",
    admissionAverage: "Admission requirements vary significantly by program.",
  },
  {
    name: "Arts & Humanities",
    description:
      "History, languages, communications, philosophy, literature and humanities.",
    admissionAverage: "Admission requirements vary by program.",
  },
  {
    name: "Social Sciences",
    description:
      "Psychology, economics, political science, sociology, criminology and related fields.",
    admissionAverage: "Admission requirements vary by program.",
  },
];

export default async function UniversityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const school = schools.find((item) => item.id === id);

  if (!school) {
    notFound();
  }

  const programs = programData[school.id] ?? generalPrograms;

  return (
    <main className="min-h-screen bg-[#f5f7f8] text-[#172126]">

      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">

          <Link
            href="/universities"
            className="inline-flex items-center gap-2 text-sm font-semibold"
          >
            <ArrowLeft className="h-4 w-4" />
            All universities
          </Link>

          <Link href="/" className="text-xl font-bold">
            UniPath
          </Link>

        </div>
      </header>

      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">

          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <span>{school.province}</span>
            <span>•</span>
            <span>{school.type}</span>
          </div>

          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
            {school.name}
          </h1>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {school.city}, {school.province}
            </span>

            <span className="inline-flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              {school.type}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">

            <a
              href={`https://${school.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#172126] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#29383e]"
            >
              Official website
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <Link
              href="/deadlines"
              className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold transition hover:bg-gray-50"
            >
              Application deadlines
            </Link>

          </div>

        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[1fr_320px] lg:px-10">

        <div>

          <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf1f1]">
                <BookOpen className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                  University overview
                </p>

                <h2 className="mt-1 text-2xl font-semibold">
                  About {school.shortName}
                </h2>
              </div>
            </div>

            <p className="mt-6 leading-8 text-gray-600">
              {school.name} is a {school.type.toLowerCase()} located in{" "}
              {school.city}, {school.province}. Use UniPath to get a quick
              overview of the school, explore major areas of study, understand
              admission competitiveness, and find the official university
              resources when you need more detailed information.
            </p>

          </div>

          <div className="mt-8">

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
              Programs
            </p>

            <h2 className="mt-2 text-3xl font-semibold">
              Explore programs
            </h2>

            <p className="mt-3 max-w-2xl text-gray-500">
              Get a quick overview of popular areas of study and the type of
              academic profile students should expect.
            </p>

            <div className="mt-8 space-y-4">

              {programs.map((program) => (
                <div
                  key={program.name}
                  className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
                >

                  <div className="flex items-start justify-between gap-5">

                    <div>
                      <h3 className="text-xl font-semibold">
                        {program.name}
                      </h3>

                      <p className="mt-3 leading-7 text-gray-600">
                        {program.description}
                      </p>
                    </div>

                  </div>

                  <div className="mt-5 rounded-xl bg-[#f5f7f8] px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">
                      Admission profile
                    </p>

                    <p className="mt-1 text-sm text-gray-600">
                      {program.admissionAverage}
                    </p>
                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">

          <div className="rounded-3xl bg-[#172126] p-7 text-white">

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Quick facts
            </p>

            <div className="mt-6 space-y-5">

              <div>
                <p className="text-xs text-white/40">School</p>
                <p className="mt-1 font-medium">{school.shortName}</p>
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

              <div>
                <p className="text-xs text-white/40">Programs shown</p>
                <p className="mt-1 font-medium">{programs.length}</p>
              </div>

            </div>

            <a
              href={`https://${school.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#172126]"
            >
              Visit official site
              <ArrowUpRight className="h-4 w-4" />
            </a>

          </div>

        </aside>

      </section>

    </main>
  );
}
EOF