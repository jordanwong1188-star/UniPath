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
import UniversityLogo from "@/app/components/UniversityLogo";
import SaveUniversityButton from "@/app/components/SaveUniversityButton";

const admissionsPages: Record<string, string> = {
  ubc: "https://you.ubc.ca/applying-ubc/requirements/",
  sfu: "https://www.sfu.ca/students/admission/admission-requirements.html",
  uvic: "https://www.uvic.ca/undergraduate/admissions/how-to-apply/index.php",
  bcit: "https://www.bcit.ca/admission/entrance-requirements/",
  kpu: "https://www.kpu.ca/admission/requirements",
  capu: "https://www.capilanou.ca/admissions/apply-to-capu/admission-requirements/",
  ufv: "https://www.ufv.ca/admissions/admission-requirements/",
  tru: "https://www.tru.ca/future/admissions/undergrad/requirements.html",
  viu: "https://connect.viu.ca/how-become-viu-student",
  ecu: "https://ecuad.ca/degree-programs/undergraduate/apply/",
  langara: "https://langara.ca/apply/admission-requirements",
  douglas: "https://www.douglascollege.ca/admissions/admission-requirements",
  ualberta: "https://www.ualberta.ca/en/admissions/how-to-apply/admission-requirements/index.html",
  ucalgary: "https://www.ucalgary.ca/future-students/undergraduate/requirements",
  ulethbridge: "https://www.ulethbridge.ca/future-student/admission-requirements",
  athabasca: "https://www.athabascau.ca/applications-admissions/apply-au/undergraduate-students.html",
  mru: "https://www.mtroyal.ca/Admission/AdmissionRequirements/index.htm",
  macewan: "https://www.macewan.ca/apply-enrol/admissions/requirements/",
  nait: "https://www.nait.ca/nait/admissions/applying-to-nait/entrance-requirements",
  sait: "https://www.sait.ca/admissions/admission-requirements",
  usask: "https://admissions.usask.ca/requirements/",
  uregina: "https://www.uregina.ca/admissions/undergraduate/requirements.html",
  saskpoly: "https://saskpolytech.ca/admissions/admission-requirements.aspx",
  umanitoba: "https://umanitoba.ca/explore/undergraduate-admissions/requirements",
  uwinnipeg: "https://www.uwinnipeg.ca/future-student/requirements.html",
  brandon: "https://www.brandonu.ca/future-students/apply/admission-requirements/",
  uoft: "https://future.utoronto.ca/apply/requirements/",
  waterloo: "https://uwaterloo.ca/future-students/admissions/admission-requirements",
  mcmaster: "https://future.mcmaster.ca/admission/requirements/",
  queens: "https://www.queensu.ca/admission/applying/requirements",
  western: "https://welcome.uwo.ca/next-steps/requirements/index.html",
  york: "https://futurestudents.yorku.ca/requirements",
  tmu: "https://www.torontomu.ca/admissions/undergraduate/requirements/",
  uottawa: "https://www.uottawa.ca/study/undergraduate-studies/admission-requirements",
  carleton: "https://admissions.carleton.ca/apply/requirements/",
  guelph: "https://www.uoguelph.ca/admission/undergraduate/requirements/",
  laurier: "https://www.wlu.ca/future-students/undergraduate/admissions/requirements/index.html",
  brock: "https://brocku.ca/admissions/undergraduate/requirements/",
  windsor: "https://future.uwindsor.ca/admission-requirements",
  ontariotech: "https://admissions.ontariotechu.ca/applicant-information/",
  lakehead: "https://www.lakeheadu.ca/studentcentral/applying/general-admission-requirements",
  nipissing: "https://future.nipissingu.ca/requirements/",
  mcgill: "https://www.mcgill.ca/undergraduate-admissions/apply/requirements",
  concordia: "https://www.concordia.ca/admissions/undergraduate/requirements.html",
  udem: "https://admission.umontreal.ca/admission/preparation-de-la-demande/verifier-les-conditions-dadmissibilite/",
  laval: "https://www.ulaval.ca/admission/preparez-votre-dossier/conditions-dadmission",
  usherbrooke: "https://www.usherbrooke.ca/admission/1er-cycle/",
  uqam: "https://etudier.uqam.ca/admission",
  dalhousie: "https://www.dal.ca/admissions/undergraduate/admission-requirements.html",
  smu: "https://www.smu.ca/future-students/admission-requirements/",
  stfx: "https://www.stfx.ca/applications-admissions/admissions-information/admission-requirements",
  unb: "https://www.unb.ca/admissions/requirements/",
  moncton: "https://www.umoncton.ca/admission/conditions-admission",
  upei: "https://www.upei.ca/apply/undergraduate-admissions",
  memorial: "https://www.mun.ca/undergrad/admissions/admission-requirements/",
};

const deadlinePages: Record<string, string> = {
  ubc: "https://you.ubc.ca/applying-ubc/dates-deadlines/", sfu: "https://www.sfu.ca/students/admission/apply.html", uvic: "https://www.uvic.ca/undergraduate/admissions/application-deadlines/index.php", bcit: "https://www.bcit.ca/admission/program-availability/when-to-apply/",
  kpu: "https://www.kpu.ca/admission/deadlines", capu: "https://www.capilanou.ca/admissions/apply-to-capu/", ufv: "https://www.ufv.ca/admissions/dates-deadlines/", tru: "https://www.tru.ca/future/admissions/undergrad.html", viu: "https://connect.viu.ca/how-become-viu-student", ecu: "https://ecuad.ca/degree-programs/undergraduate/apply/", langara: "https://langara.ca/apply/apply-regular-studies", douglas: "https://www.douglascollege.ca/admissions/when-apply",
  ualberta: "https://www.ualberta.ca/en/admissions/how-to-apply/dates-deadlines/index.html", ucalgary: "https://www.ucalgary.ca/future-students/undergraduate/admissions/dates", ulethbridge: "https://www.ulethbridge.ca/future-student/application-dates-and-deadlines", athabasca: "https://www.athabascau.ca/applications-admissions/apply-au/undergraduate-students.html", mru: "https://www.mtroyal.ca/Admission/DatesDeadlines/index.htm", macewan: "https://www.macewan.ca/apply-enrol/admissions/dates-deadlines/", nait: "https://www.nait.ca/nait/admissions/academic-schedule/application-deadlines", sait: "https://www.sait.ca/admissions/apply",
  usask: "https://admissions.usask.ca/requirements/deadlines.php", uregina: "https://www.uregina.ca/admissions/undergraduate/deadlines.html", saskpoly: "https://saskpolytech.ca/admissions/apply-and-register/admission-processes.aspx", umanitoba: "https://umanitoba.ca/explore/undergraduate-admissions/requirements", uwinnipeg: "https://www.uwinnipeg.ca/future-student/applications-deadlines.html", brandon: "https://www.brandonu.ca/future-students/apply/application-deadlines/",
  uoft: "https://future.utoronto.ca/deadlines", waterloo: "https://uwaterloo.ca/future-students/admissions/deadlines", mcmaster: "https://future.mcmaster.ca/apply/deadlines/", queens: "https://www.queensu.ca/admission/applying/dates-deadlines", western: "https://welcome.uwo.ca/next-steps/apply/admission-deadlines.html", york: "https://futurestudents.yorku.ca/requirements/deadlines", tmu: "https://www.torontomu.ca/admissions/undergraduate/apply/application-dates/", uottawa: "https://www.uottawa.ca/study/undergraduate-studies/application-deadlines", carleton: "https://admissions.carleton.ca/deadlines/", guelph: "https://www.uoguelph.ca/admission/undergraduate/apply/deadlines/", laurier: "https://www.wlu.ca/future-students/undergraduate/admissions/dates.html", brock: "https://brocku.ca/admissions/deadlines/", windsor: "https://ask.uwindsor.ca/app/answers/detail/a_id/773/~/what-are-the-deadlines-to-apply-for-an-undergraduate-program%3F", ontariotech: "https://admissions.ontariotechu.ca/applicant-information/ontario-secondary-school-graduates.php", lakehead: "https://www.lakeheadu.ca/studentcentral/applying/application-deadlines", nipissing: "https://future.nipissingu.ca/requirements/deadlines/",
  mcgill: "https://www.mcgill.ca/undergraduate-admissions/apply/requirements", concordia: "https://www.concordia.ca/admissions/undergraduate/apply.html", udem: "https://admission.umontreal.ca/admission/preparation-de-la-demande/respecter-les-dates-limites-de-depot/", laval: "https://www.ulaval.ca/admission/deposez-votre-demande-dadmission/dates-limites-de-depot", usherbrooke: "https://www.usherbrooke.ca/admission/da/planifier-demande/dates-limites/1er-cycle", uqam: "https://etudier.uqam.ca/dates", dalhousie: "https://www.dal.ca/admissions/dates-and-deadlines.html", smu: "https://www.smu.ca/future-students/admissions/importantdates/", stfx: "https://www.stfx.ca/applications-admissions/admissions-information/key-dates-deadlines", unb: "https://www.unb.ca/admissions/important-dates.html", moncton: "https://www.umoncton.ca/admission/dates-importantes", upei: "https://calendar.upei.ca/current/chapter/how-to-apply/", memorial: "https://www.mun.ca/undergrad/admissions/admission-deadlines/",
};

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

  const admissionsUrl = admissionsPages[school.id] ?? `https://${school.domain}`;
  const deadlinesUrl = deadlinePages[school.id] ?? `https://${school.domain}`;

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

                <UniversityLogo
                  domain={school.domain}
                  name={school.name}
                  shortName={school.shortName}
                  size="hero"
                />

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


            <div className="flex shrink-0 flex-col gap-3"><SaveUniversityButton id={school.id} /><a
              href={`https://${school.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#172126] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#29383e]"
            >
              Official website
              <ExternalLink className="h-4 w-4" />
            </a></div>

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


          <a href={admissionsUrl} target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf1f1]">
              <FileText className="h-5 w-5" />
            </div>

            <h2 className="mt-5 font-semibold">
              Admissions
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Review official undergraduate requirements, prerequisites, and application instructions.
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm font-semibold">View admissions <ExternalLink className="h-4 w-4 transition group-hover:translate-x-1" /></div>

          </a>


          <a href={deadlinesUrl} target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf1f1]">
              <CalendarDays className="h-5 w-5" />
            </div>

            <h2 className="mt-5 font-semibold">
              Deadlines
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Check official application, document, and program-specific dates.
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm font-semibold">View deadlines <ExternalLink className="h-4 w-4 transition group-hover:translate-x-1" /></div>

          </a>


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
