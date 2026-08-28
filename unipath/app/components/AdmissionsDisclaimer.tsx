"use client";

import Link from "next/link";
import { AlertTriangle, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

const DISCLAIMER_KEY = "unipath-admissions-disclaimer-v1";

export default function AdmissionsDisclaimer() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(window.localStorage.getItem(DISCLAIMER_KEY) !== "accepted");
  }, []);

  function acceptDisclaimer() {
    window.localStorage.setItem(DISCLAIMER_KEY, "accepted");
    setOpen(false);
  }

  if (!open) return null;

  return <div className="fixed inset-0 z-[200] grid place-items-center overflow-y-auto bg-[#091815]/88 p-4 backdrop-blur-sm" role="presentation">
    <section role="dialog" aria-modal="true" aria-labelledby="admissions-disclaimer-title" aria-describedby="admissions-disclaimer-description" className="my-auto w-full max-w-xl border border-[#d4865f]/40 bg-[#f5f1e8] p-6 text-[#17352f] shadow-2xl sm:p-9">
      <div className="flex items-center gap-3 text-[#a94b36]"><AlertTriangle className="h-5 w-5" aria-hidden="true" /><p className="text-[10px] font-bold uppercase tracking-[.2em]">Important admissions notice</p></div>
      <h2 id="admissions-disclaimer-title" className="mt-5 text-3xl leading-tight sm:text-4xl">Use UniPath as a planning guide—not as the final authority.</h2>
      <div id="admissions-disclaimer-description" className="mt-5 space-y-3 text-sm leading-7 text-[#465651]">
        <p>University requirements, deadlines, fees, supplemental formats, scholarships, and transfer rules can change without notice and may differ by applicant type.</p>
        <p>Always confirm important information directly with the university, its official applicant portal, and any instructions sent to you. Those official sources control if they differ from UniPath.</p>
        <p>UniPath is an independent planning and practice service. It is not affiliated with, endorsed by, or acting for any university, and it does not guarantee admission, scholarships, transfer credit, or application outcomes.</p>
      </div>
      <div className="mt-6 border-l-2 border-[#d4865f] bg-[#e8e0d2]/70 px-4 py-3 text-xs leading-6 text-[#394b47]">By continuing, you acknowledge that you remain responsible for verifying and submitting your own application accurately and on time.</div>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="button" onClick={acceptDisclaimer} className="button-primary inline-flex min-h-12 cursor-pointer items-center justify-center px-5 py-3 text-sm font-semibold">I understand—continue</button>
        <Link href="/disclaimer" className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#17352f]/20 px-5 py-3 text-sm font-semibold hover:bg-[#17352f]/5">Read the full disclaimer <ExternalLink className="h-4 w-4" /></Link>
      </div>
    </section>
  </div>;
}
