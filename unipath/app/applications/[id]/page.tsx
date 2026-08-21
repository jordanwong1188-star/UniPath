"use client";

import { useParams } from "next/navigation";
import VideoInterviewSimulator, { supportsVideoInterview } from "../../components/VideoInterviewSimulator";
import { ApplicationHub, applicationProfiles } from "../../application-hub/page";

export default function ProgramApplicationPage() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const selected = applicationProfiles.find(item => item.id === id) ?? applicationProfiles[0];

  return <>
    {supportsVideoInterview(selected.id) ? <VideoInterviewSimulator profile={selected} /> : null}
    <ApplicationHub mode="applications" initialApplicationId={selected.id} showChooser={false} />
  </>;
}
