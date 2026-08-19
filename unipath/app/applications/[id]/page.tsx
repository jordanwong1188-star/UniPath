"use client";

import { useParams } from "next/navigation";
import { ApplicationHub, applicationProfiles } from "../../application-hub/page";

export default function ProgramApplicationPage() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const exists = applicationProfiles.some(item => item.id === id);

  return <ApplicationHub mode="applications" initialApplicationId={exists ? id : applicationProfiles[0].id} showChooser={false} />;
}
