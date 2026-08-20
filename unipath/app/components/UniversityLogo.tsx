"use client";

import { useState } from "react";

type UniversityLogoProps = {
  domain: string;
  name: string;
  shortName: string;
  size?: "card" | "hero";
};

export default function UniversityLogo({
  domain,
  name,
  shortName,
  size = "card",
}: UniversityLogoProps) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const sources = [
    `https://logo.clearbit.com/${domain}?size=256`,
    `https://www.google.com/s2/favicons?domain_url=https://${domain}&sz=256`,
  ];
  const dimensions =
    size === "hero"
      ? "h-24 w-24 rounded-2xl p-3 sm:h-28 sm:w-28"
      : "h-20 w-20 rounded-2xl p-2.5";
  const imageDimensions =
    size === "hero" ? "h-full w-full" : "h-full w-full";

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden border border-black/[0.06] bg-white shadow-sm ${dimensions}`}
      aria-label={`${name} logo`}
    >
      {sourceIndex < sources.length ? (
        <img
          src={sources[sourceIndex]}
          alt={`${name} logo`}
          className={`${imageDimensions} object-contain`}
          loading="lazy"
          onError={() => setSourceIndex((current) => current + 1)}
        />
      ) : (
        <span
          className={`text-center font-bold tracking-tight text-[#26383d] ${
            size === "hero" ? "text-2xl" : "text-lg"
          }`}
          aria-hidden="true"
        >
          {shortName}
        </span>
      )}
    </div>
  );
}
