"use client";

import { Bookmark, Check } from "lucide-react";
import { useStudent } from "./StudentProvider";

export default function SaveUniversityButton({ id }: { id: string }) {
  const { isPremium, savedUniversityIds, toggleUniversity } = useStudent();
  const saved = savedUniversityIds.includes(id);
  return <button type="button" onClick={() => isPremium ? toggleUniversity(id) : window.location.assign("/pricing")} className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">{saved ? <Check className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}{saved ? "Saved to workspace" : "Save university"}</button>;
}
