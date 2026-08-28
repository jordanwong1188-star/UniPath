import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import SiteHeader from "@/app/components/SiteHeader";

const sections = [
  {
    title: "Educational information only",
    body: "UniPath provides general educational information, organizational tools, and application-practice materials. It is not professional, legal, financial, or official admissions advice. Using UniPath does not create an adviser-client or other professional relationship.",
  },
  {
    title: "Official sources control",
    body: "Universities and other organizations may change requirements, prerequisites, deadlines, fees, assessment formats, scholarship criteria, transfer-credit rules, and policies at any time. Requirements may also vary by campus, program, applicant category, curriculum, residency, or admission cycle. Users must confirm all important information through the institution's official website, applicant portal, and direct communications.",
  },
  {
    title: "No outcome guarantee",
    body: "UniPath does not guarantee admission, an offer, a scholarship, transfer credit, eligibility, a particular assessment result, or any other outcome. Admission decisions are made solely by the relevant institution. Practice scores and AI-generated feedback are coaching tools, not predictions or official evaluations.",
  },
  {
    title: "Independent service",
    body: "UniPath is independent and is not affiliated with, endorsed by, sponsored by, or acting on behalf of any university, application platform, scholarship provider, or admissions office unless expressly stated otherwise.",
  },
  {
    title: "Accuracy and availability",
    body: "UniPath aims to use credible and current sources, but it cannot promise that every item is complete, current, error-free, or continuously available. If UniPath conflicts with an official source, the official source controls. Users should report suspected errors so they can be reviewed.",
  },
  {
    title: "Your responsibility",
    body: "You are responsible for the accuracy, originality, completeness, and timely submission of your application. Review every response and document before submission, protect your applicant credentials, follow academic-integrity and acceptable-use rules, and keep your own copies and submission confirmations.",
  },
] as const;

export default function DisclaimerPage() {
  return <main className="min-h-screen bg-[#f5f1e8] text-[#17352f]">
    <SiteHeader />
    <section className="border-b border-[#17352f]/12">
      <div className="mx-auto grid max-w-5xl gap-8 px-6 py-14 lg:grid-cols-[220px_1fr] lg:px-10 lg:py-20">
        <div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#a94b36]">Legal notice</p><p className="mt-4 text-xs leading-6 text-[#66716c]">Last updated August 28, 2026</p></div>
        <div><h1 className="max-w-3xl text-5xl leading-[.98] sm:text-6xl">Admissions information disclaimer</h1><p className="mt-6 max-w-2xl text-base leading-8 text-[#465651]">Please read this notice before relying on UniPath to plan an application.</p></div>
      </div>
    </section>
    <section className="mx-auto max-w-5xl px-6 py-12 lg:px-10 lg:py-16">
      <div className="grid gap-px border border-[#17352f]/12 bg-[#17352f]/12 sm:grid-cols-2">
        {sections.map((section, index) => <article key={section.title} className="bg-[#fffcf7] p-6 sm:p-8"><p className="font-mono text-[10px] text-[#a94b36]">{String(index + 1).padStart(2, "0")}</p><h2 className="mt-4 text-2xl">{section.title}</h2><p className="mt-4 text-sm leading-7 text-[#56625e]">{section.body}</p></article>)}
      </div>
      <div className="mt-8 border-l-2 border-[#d4865f] bg-[#e8e0d2]/65 p-5 text-sm leading-7 text-[#465651]"><strong className="text-[#17352f]">Questions or corrections?</strong> Use the contact page to identify the university, program, page, and official source that needs review. This disclaimer is general information and should be reviewed by a qualified Canadian lawyer before commercial launch.</div>
      <div className="mt-8 flex flex-wrap gap-3"><Link href="/" className="inline-flex items-center gap-2 border border-[#17352f]/18 px-5 py-3 text-sm font-semibold"><ArrowLeft className="h-4 w-4" />Back to UniPath</Link><Link href="/contact" className="button-primary inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold">Report incorrect information <ExternalLink className="h-4 w-4" /></Link></div>
    </section>
  </main>;
}
