"use client";

import { useParams } from "next/navigation";
import VideoInterviewSimulator, { supportsVideoInterview } from "../../components/VideoInterviewSimulator";
import { ApplicationHub, applicationProfiles } from "../../application-hub/page";

export default function ProgramApplicationPage() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const selected = applicationProfiles.find(item => item.id === id) ?? applicationProfiles[0];
  const hasVideo = supportsVideoInterview(selected.id);

  return <main className="min-h-screen bg-[#132c29]">
    <nav className="sticky top-0 z-[60] border-b border-white/10 bg-[#132c29]/95 px-5 py-3 text-[#f2ede2]" aria-label="Practice format">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div><p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#e0a17f]">Practice file</p><p className="mt-1 truncate text-sm font-semibold">{selected.program}</p></div>
        <div className="flex gap-px border border-white/12 bg-white/10 text-xs font-bold">
          <a href="#written-practice" className="bg-[#d4865f] px-4 py-2.5 text-[#132c29]">Written + feedback</a>
          {hasVideo ? <a href="#interview-practice" className="bg-[#1d3d38] px-4 py-2.5 text-white/75 hover:text-white">Interview</a> : null}
        </div>
      </div>
    </nav>
    <section id="written-practice">
      <ApplicationHub mode="applications" initialApplicationId={selected.id} showChooser={false} />
    </section>
    {hasVideo ? <section id="interview-practice" className="scroll-mt-24"><VideoInterviewSimulator profile={selected} /></section> : null}
  </main>;
}
