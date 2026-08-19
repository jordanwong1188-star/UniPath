export type ProgramDetail = {
  id: string;
  universityId: string;
  school: string;
  name: string;
  degree: string;
  duration: string;
  overview: string;
  whatYouStudy: string[];
  experience: string;
  specializations: string[];
  skills: string[];
  careers: string[];
  admissionInfo: string;
  admissionAverage: string;
  applicationDeadline: string;
  officialUrl: string;
};

export type ProgramSeed = [
  id: string,
  universityId: string,
  school: string,
  name: string,
  degree: string,
  duration: string,
  whatYouStudy: string[],
  careers: string[],
  officialUrl: string,
  overview?: string,
];

function joinNatural(items: string[]) {
  if (items.length <= 1) return items[0] ?? "the field";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items.at(-1)}`;
}

function inferSkills(value: string): string[] {
  const text = value.toLowerCase();

  if (
    text.includes("business") ||
    text.includes("commerce") ||
    text.includes("management") ||
    text.includes("administration")
  ) {
    return [
      "Analysis",
      "Communication",
      "Teamwork",
      "Decision-making",
      "Presentation",
      "Professional problem-solving",
    ];
  }

  if (text.includes("engineering") || text.includes("génie")) {
    return [
      "Quantitative analysis",
      "Design",
      "Technical problem-solving",
      "Teamwork",
      "Project work",
      "Technical communication",
    ];
  }

  if (
    text.includes("computer") ||
    text.includes("computing") ||
    text.includes("informatique") ||
    text.includes("software") ||
    text.includes("technology") ||
    text.includes(" it")
  ) {
    return [
      "Programming",
      "Logical reasoning",
      "Technical problem-solving",
      "Systems thinking",
      "Project work",
      "Collaboration",
    ];
  }

  if (text.includes("science")) {
    return [
      "Scientific reasoning",
      "Data analysis",
      "Research",
      "Laboratory or field methods",
      "Quantitative thinking",
      "Communication",
    ];
  }

  if (
    text.includes("art") ||
    text.includes("design") ||
    text.includes("motion picture") ||
    text.includes("fine arts")
  ) {
    return [
      "Creative development",
      "Visual communication",
      "Critique",
      "Project development",
      "Research",
      "Portfolio building",
    ];
  }

  return [
    "Research",
    "Critical thinking",
    "Writing",
    "Communication",
    "Analysis",
    "Independent learning",
  ];
}

function inferExperience(value: string, degree: string) {
  const text = `${value} ${degree}`.toLowerCase();

  if (text.includes("design") || text.includes("fine arts") || text.includes("motion picture")) {
    return "Expect studio or production work, critique, independent projects and portfolio development alongside academic courses. The exact balance depends on the specialization.";
  }

  if (text.includes("engineering") || text.includes("computer") || text.includes("computing") || text.includes("software") || text.includes("technology") || text.includes("informatique") || text.includes("génie")) {
    return "Expect technical lectures plus substantial problem sets, labs, coding or design projects and team-based work. Co-op or work-integrated learning may be available depending on the program.";
  }

  if (text.includes("science")) {
    return "Expect a combination of lectures, quantitative coursework, labs or field work and increasingly specialized study as you progress through the degree.";
  }

  if (text.includes("business") || text.includes("commerce") || text.includes("management") || text.includes("administration")) {
    return "Expect lectures, case discussions, presentations, group projects and quantitative business courses. Many programs also offer co-op, internships, competitions or other experiential opportunities.";
  }

  if (text.includes("diploma")) {
    return "Expect career-focused classes with applied assignments, projects and practical skill development. Some programs include co-op, placements or industry projects.";
  }

  return "Expect a mix of lectures, smaller classes, reading, writing, projects and independent study. The exact balance depends on the major and year of study.";
}

export function makeProgram(seed: ProgramSeed): ProgramDetail {
  const [
    id,
    universityId,
    school,
    name,
    degree,
    duration,
    whatYouStudy,
    careers,
    officialUrl,
    customOverview,
  ] = seed;

  const context = `${name} ${school}`;
  const overview =
    customOverview ??
    `${name} at ${school} gives students a focused path through ${joinNatural(
      whatYouStudy.slice(0, 4)
    )}. It builds subject knowledge while preparing students for pathways such as ${joinNatural(
      careers.slice(0, 3)
    )}.`;

  return {
    id,
    universityId,
    school,
    name,
    degree,
    duration,
    overview,
    whatYouStudy,
    experience: inferExperience(context, degree),
    specializations: whatYouStudy.slice(0, 4),
    skills: inferSkills(context),
    careers,
    admissionInfo:
      "Admission requirements depend on your province, curriculum and applicant category. Check the official program page for required Grade 11/12 courses, supplemental applications and the current selection process.",
    admissionAverage: "Varies — check official requirements",
    applicationDeadline: "Check official requirements",
    officialUrl,
  };
}

export function makePrograms(seeds: ProgramSeed[]) {
  return seeds.map(makeProgram);
}
