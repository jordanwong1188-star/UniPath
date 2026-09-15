"use client";

import { useState } from "react";
import schools from "@/data/canadianSchools.json";

type UniversityLogoProps = {
  domain?: string;
  name: string;
  shortName?: string;
  universityId?: string;
  size?: "card" | "hero" | number;
};

export default function UniversityLogo({
  domain,
  name,
  shortName,
  universityId,
  size = "card",
}: UniversityLogoProps) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const matchedSchool = universityId ? schools.find(school => school.id === universityId) : undefined;
  const resolvedDomain = domain ?? matchedSchool?.domain ?? "";
  const resolvedShortName = shortName ?? matchedSchool?.shortName ?? name.split(/\s+/).map(part => part[0]).join("").slice(0, 4).toUpperCase();
  const sources = resolvedDomain ? [
    `https://logo.clearbit.com/${resolvedDomain}?size=256`,
    `https://www.google.com/s2/favicons?domain_url=https://${resolvedDomain}&sz=256`,
  ] : [];

  const numericSize = typeof size === "number" ? size : null;
  const dimensions = numericSize
    ? "rounded-2xl p-2.5"
    : size === "hero"
      ? "h-24 w-24 rounded-2xl p-3 sm:h-28 sm:w-28"
      : "h-20 w-20 rounded-2xl p-2.5";
  const inlineStyle = numericSize ? { width: numericSize, height: numericSize } : undefined;

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden border border-black/[0.06] bg-white shadow-sm ${dimensions}`}
      style={inlineStyle}
      aria-label={`${name} logo`}
    >
      {sourceIndex < sources.length ? (
        <img
          src={sources[sourceIndex]}
          alt={`${name} logo`}
          className="h-full w-full object-contain"
          loading="lazy"
          onError={() => setSourceIndex((current) => current + 1)}
        />
      ) : (
        <span
          className={`text-center font-bold tracking-tight text-[#26383d] ${numericSize ? "text-sm" : size === "hero" ? "text-2xl" : "text-lg"}`}
          aria-hidden="true"
        >
          {resolvedShortName}
        </span>
      )}
    </div>
  );
}
