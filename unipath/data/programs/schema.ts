export type ProgramEntryType =
  | "Direct entry"
  | "Choose after first year"
  | "Second entry"
  | "Varies";

export type ProgramDetail = {
  id: string;
  universityId: string;
  school: string;
  name: string;
  degree: string;
  duration: string;
  entryType: ProgramEntryType;
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

export type LegacyProgramSeed = [
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

export type ProgramSeedObject = {
  id?: string;
  universityId: string;
  school: string;
  name: string;
  degree: string;
  duration?: string;
  entryType?: ProgramEntryType;
  officialUrl: string;
  overview?: string;
  whatYouStudy?: string[];
  experience?: string;
  specializations?: string[];
  skills?: string[];
  careers?: string[];
  admissionInfo?: string;
  admissionAverage?: string;
  applicationDeadline?: string;
};

export type ProgramSeed = LegacyProgramSeed | ProgramSeedObject;

export type ProgramGroupItem =
  | string
  | (Partial<Omit<ProgramSeedObject, "universityId" | "school" | "degree" | "officialUrl">> & {
      name: string;
      degree?: string;
      school?: string;
      officialUrl?: string;
    });

export type ProgramGroup = {
  universityId: string;
  school: string;
  degree: string;
  duration?: string;
  entryType?: ProgramEntryType;
  officialUrl: string;
  programs: ProgramGroupItem[];
};

type DisciplineProfile = {
  keywords: string[];
  study: string[];
  careers: string[];
  skills: string[];
  experience: string;
};

const profiles: DisciplineProfile[] = [
  {
    keywords: ["accounting", "accountancy", "comptabilité"],
    study: ["Financial accounting", "Managerial accounting", "Audit and assurance", "Taxation", "Business law", "Data and reporting"],
    careers: ["Accounting", "Audit", "Tax", "Financial analysis", "Controllership", "Consulting"],
    skills: ["Financial analysis", "Accuracy", "Business judgment", "Data interpretation", "Professional communication", "Problem-solving"],
    experience: "Expect quantitative business courses, case work, reporting assignments and applied accounting problems. Some programs align coursework with professional accounting pathways."
  },
  {
    keywords: ["finance", "financial", "financière", "financier"],
    study: ["Corporate finance", "Investments", "Financial markets", "Valuation", "Risk management", "Economics"],
    careers: ["Corporate finance", "Banking", "Investment analysis", "Wealth management", "Risk", "Consulting"],
    skills: ["Quantitative analysis", "Valuation", "Decision-making", "Spreadsheet modelling", "Communication", "Risk analysis"],
    experience: "Expect quantitative coursework, financial modelling, cases and projects that connect economic ideas with real financial decisions."
  },
  {
    keywords: ["business", "commerce", "management", "administration", "marketing", "entrepreneur", "supply chain", "human resource", "ressources humaines"],
    study: ["Accounting", "Finance", "Marketing", "Management", "Strategy", "Business analytics"],
    careers: ["Business", "Consulting", "Marketing", "Finance", "Management", "Entrepreneurship"],
    skills: ["Analysis", "Communication", "Teamwork", "Decision-making", "Presentation", "Professional problem-solving"],
    experience: "Expect lectures, case discussions, presentations, group projects and quantitative business courses. Many programs also offer co-op, internships, competitions or other experiential opportunities."
  },
  {
    keywords: ["computer science", "computing", "informatique", "software", "cybersecurity", "information technology", "data science", "artificial intelligence", "machine learning"],
    study: ["Programming", "Algorithms", "Data structures", "Software development", "Computer systems", "Data and artificial intelligence"],
    careers: ["Software development", "Software engineering", "Data science", "AI", "Cybersecurity", "Technology"],
    skills: ["Programming", "Logical reasoning", "Technical problem-solving", "Systems thinking", "Project work", "Collaboration"],
    experience: "Expect substantial coding, technical labs, mathematical problem-solving and project work. Co-op or work-integrated learning may be available depending on the program."
  },
  {
    keywords: ["engineering", "génie", "mechatronic", "mechatronics"],
    study: ["Engineering design", "Calculus", "Physics", "Programming", "Technical systems", "Project work"],
    careers: ["Engineering", "Technology", "Product development", "Consulting", "Research", "Project management"],
    skills: ["Quantitative analysis", "Design", "Technical problem-solving", "Teamwork", "Project work", "Technical communication"],
    experience: "Expect technical lectures plus substantial problem sets, labs, design projects and team-based work. Many engineering programs include co-op, internships or capstone design experiences."
  },
  {
    keywords: ["nursing", "infirm", "midwifery", "paramedic", "radiography", "respiratory therapy", "medical laboratory", "health sciences", "health science", "health studies", "public health"],
    study: ["Human health", "Biology and physiology", "Evidence-based practice", "Health systems", "Research methods", "Professional practice"],
    careers: ["Healthcare", "Clinical practice", "Public health", "Health administration", "Research", "Further professional study"],
    skills: ["Clinical reasoning", "Communication", "Evidence appraisal", "Teamwork", "Professional judgment", "Health research"],
    experience: "Expect science-based coursework with applied health learning. Professionally oriented programs may include laboratories, simulations, clinical placements or community-based experiences."
  },
  {
    keywords: ["kinesiology", "kinésiologie", "human kinetics", "recreation", "sport", "physical education"],
    study: ["Human anatomy", "Physiology", "Biomechanics", "Exercise science", "Health promotion", "Research methods"],
    careers: ["Kinesiology", "Rehabilitation", "Fitness and performance", "Health promotion", "Sport management", "Further professional study"],
    skills: ["Movement analysis", "Scientific reasoning", "Communication", "Program design", "Data interpretation", "Teamwork"],
    experience: "Expect a mix of life-science courses, movement labs, research methods and applied work related to physical activity, health and performance."
  },
  {
    keywords: ["biology", "biological", "biochemistry", "biomedical", "biotechnology", "microbiology", "neuroscience", "life science", "life sciences", "zoology", "genetics", "molecular"],
    study: ["Cell biology", "Genetics", "Biochemistry", "Physiology", "Laboratory methods", "Research"],
    careers: ["Research", "Biotechnology", "Healthcare", "Laboratory science", "Environmental science", "Graduate or professional study"],
    skills: ["Scientific reasoning", "Laboratory methods", "Data analysis", "Research", "Quantitative thinking", "Communication"],
    experience: "Expect lectures and laboratory courses with progressively more specialized study in living systems, experimental methods and scientific research."
  },
  {
    keywords: ["chemistry", "chimie", "chemical physics"],
    study: ["Organic chemistry", "Inorganic chemistry", "Physical chemistry", "Analytical chemistry", "Laboratory methods", "Quantitative analysis"],
    careers: ["Chemistry", "Laboratory science", "Pharmaceuticals", "Materials", "Environmental testing", "Research"],
    skills: ["Laboratory technique", "Quantitative analysis", "Scientific reasoning", "Safety", "Data interpretation", "Research"],
    experience: "Expect a laboratory-intensive science program with quantitative coursework, experimental design and progressively advanced chemistry."
  },
  {
    keywords: ["physics", "physique", "astronomy", "astrophysics"],
    study: ["Mechanics", "Electricity and magnetism", "Quantum physics", "Thermodynamics", "Mathematics", "Computational methods"],
    careers: ["Research", "Data and analytics", "Engineering", "Technology", "Education", "Scientific computing"],
    skills: ["Mathematical modelling", "Quantitative reasoning", "Experimental analysis", "Programming", "Problem-solving", "Research"],
    experience: "Expect mathematically rigorous coursework, laboratories and computational problem-solving focused on modelling physical systems."
  },
  {
    keywords: ["mathematics", "mathématiques", "statistics", "statistique", "actuarial"],
    study: ["Calculus", "Linear algebra", "Probability", "Statistics", "Mathematical modelling", "Proof and reasoning"],
    careers: ["Data analysis", "Actuarial work", "Finance", "Research", "Technology", "Education"],
    skills: ["Quantitative reasoning", "Modelling", "Proof", "Data analysis", "Programming", "Problem-solving"],
    experience: "Expect proof-based and computational mathematics, frequent problem sets and increasingly specialized quantitative work."
  },
  {
    keywords: ["economics", "économie", "economy"],
    study: ["Microeconomics", "Macroeconomics", "Statistics", "Econometrics", "Public policy", "Economic theory"],
    careers: ["Economic analysis", "Public policy", "Finance", "Consulting", "Government", "Research"],
    skills: ["Economic modelling", "Data analysis", "Critical reasoning", "Policy analysis", "Quantitative methods", "Communication"],
    experience: "Expect a mix of economic theory, mathematics, statistics and applied analysis of markets, policy and social outcomes."
  },
  {
    keywords: ["psychology", "psychologie", "behaviour", "behavior"],
    study: ["Cognitive psychology", "Social psychology", "Development", "Research methods", "Statistics", "Biological psychology"],
    careers: ["Research", "Human resources", "Community services", "Marketing and UX research", "Education", "Graduate or professional study"],
    skills: ["Research design", "Statistical analysis", "Critical thinking", "Scientific writing", "Observation", "Communication"],
    experience: "Expect lectures, research methods and statistics alongside study of cognition, behaviour, development and social processes. Advanced research opportunities vary by program."
  },
  {
    keywords: ["social work", "travail social", "child and youth", "child studies", "family studies", "community studies"],
    study: ["Human development", "Social policy", "Community practice", "Counselling foundations", "Equity and inclusion", "Applied research"],
    careers: ["Social services", "Community programs", "Child and youth services", "Policy", "Non-profit organizations", "Further professional study"],
    skills: ["Communication", "Case analysis", "Community engagement", "Ethical reasoning", "Advocacy", "Applied research"],
    experience: "Expect applied social-science learning, community-focused projects and, in professional programs, supervised field placements or practicums."
  },
  {
    keywords: ["education", "teaching", "teacher", "éducation", "enseignement"],
    study: ["Learning theory", "Curriculum", "Assessment", "Inclusive education", "Classroom practice", "Educational psychology"],
    careers: ["Teaching", "Education administration", "Learning design", "Community education", "Training", "Education policy"],
    skills: ["Instructional planning", "Communication", "Assessment", "Classroom leadership", "Reflection", "Collaboration"],
    experience: "Expect coursework in learning and teaching alongside classroom observation, practica or other field experiences where the credential is professionally oriented."
  },
  {
    keywords: ["law", "legal", "droit", "justice", "criminology", "criminal justice", "policing"],
    study: ["Law and institutions", "Public policy", "Legal reasoning", "Research methods", "Justice systems", "Ethics"],
    careers: ["Public service", "Legal services", "Policy", "Justice and corrections", "Advocacy", "Further legal study"],
    skills: ["Critical reasoning", "Research", "Argumentation", "Writing", "Policy analysis", "Ethical judgment"],
    experience: "Expect extensive reading, writing, case analysis and discussion focused on institutions, law, justice and public policy."
  },
  {
    keywords: ["political", "politique", "public policy", "international relations", "global studies", "international studies"],
    study: ["Political institutions", "Public policy", "International relations", "Political theory", "Research methods", "Comparative politics"],
    careers: ["Government", "Policy analysis", "International organizations", "Advocacy", "Communications", "Research"],
    skills: ["Policy analysis", "Research", "Writing", "Argumentation", "Communication", "Critical thinking"],
    experience: "Expect reading- and writing-intensive courses, seminar discussion, policy analysis and research on political institutions and global issues."
  },
  {
    keywords: ["sociology", "sociologie", "anthropology", "anthropologie", "gender studies", "indigenous studies", "native studies"],
    study: ["Social theory", "Culture and society", "Research methods", "Social inequality", "Institutions", "Community and identity"],
    careers: ["Public service", "Community organizations", "Research", "Policy", "Communications", "Further study"],
    skills: ["Qualitative research", "Critical analysis", "Writing", "Interviewing", "Data interpretation", "Communication"],
    experience: "Expect reading, discussion and research methods focused on people, cultures, institutions and social change."
  },
  {
    keywords: ["history", "histoire", "classics", "classical", "archaeology", "religion", "religious"],
    study: ["Historical analysis", "Primary sources", "Research methods", "Writing", "Culture and society", "Interpretation"],
    careers: ["Education", "Public history", "Government", "Museums and heritage", "Communications", "Further study"],
    skills: ["Research", "Source analysis", "Writing", "Argumentation", "Critical reading", "Communication"],
    experience: "Expect substantial reading and writing, source analysis and research projects that develop historical interpretation and argument."
  },
  {
    keywords: ["philosophy", "philosophie", "ethics"],
    study: ["Logic", "Ethics", "Epistemology", "Political philosophy", "History of philosophy", "Argumentation"],
    careers: ["Law", "Policy", "Public service", "Business", "Writing and communications", "Further study"],
    skills: ["Logical reasoning", "Argumentation", "Critical reading", "Writing", "Ethical analysis", "Problem-solving"],
    experience: "Expect close reading, structured argument, seminar discussion and analytical writing about foundational questions and contemporary issues."
  },
  {
    keywords: ["english", "literature", "creative writing", "writing", "french", "français", "language", "linguistics", "linguistique", "spanish", "german", "italian", "japanese", "chinese"],
    study: ["Language and texts", "Writing", "Critical analysis", "Culture", "Research", "Communication"],
    careers: ["Communications", "Publishing", "Education", "Public service", "Content and media", "Further study"],
    skills: ["Writing", "Close reading", "Research", "Editing", "Communication", "Cultural analysis"],
    experience: "Expect reading- and writing-intensive courses, discussion and research focused on language, literature, culture or communication."
  },
  {
    keywords: ["communication", "journalism", "media", "film", "cinema", "broadcast", "public relations"],
    study: ["Media analysis", "Digital communication", "Writing", "Production", "Audience research", "Communication theory"],
    careers: ["Media", "Journalism", "Communications", "Public relations", "Content strategy", "Production"],
    skills: ["Writing", "Storytelling", "Media production", "Research", "Presentation", "Digital communication"],
    experience: "Expect a mix of critical media study and applied projects such as writing, production, presentations or portfolio work."
  },
  {
    keywords: ["music", "musique", "theatre", "theater", "drama", "dance", "fine art", "visual art", "studio art", "arts visuels"],
    study: ["Performance or studio practice", "Theory", "History", "Creative development", "Critique", "Production"],
    careers: ["Creative practice", "Arts organizations", "Production", "Education", "Arts administration", "Further professional study"],
    skills: ["Creative development", "Performance or studio technique", "Critique", "Collaboration", "Portfolio development", "Communication"],
    experience: "Expect intensive studio, rehearsal or production work alongside theory, history and critique. Auditions or portfolios may be part of admission for some programs."
  },
  {
    keywords: ["design", "architecture", "architectural", "landscape architecture", "urban design"],
    study: ["Design studio", "Visual communication", "Design history and theory", "Digital tools", "Materials and making", "Human-centred design"],
    careers: ["Design", "Architecture-related practice", "UX and product design", "Creative industries", "Planning", "Further professional study"],
    skills: ["Design thinking", "Visual communication", "Prototyping", "Critique", "Digital tools", "Portfolio development"],
    experience: "Expect studio-based project work, critiques and portfolio development. Programs may combine creative practice with technical, historical and professional study."
  },
  {
    keywords: ["geography", "géographie", "environment", "environmental", "sustainability", "climate", "earth science", "geology"],
    study: ["Earth and environmental systems", "Climate", "GIS and spatial analysis", "Field methods", "Sustainability", "Data analysis"],
    careers: ["Environmental consulting", "Government", "GIS", "Sustainability", "Resource management", "Research"],
    skills: ["Spatial analysis", "Field methods", "Data analysis", "Systems thinking", "Research", "Communication"],
    experience: "Expect interdisciplinary science and policy coursework with labs, field work, mapping or data analysis depending on the program."
  },
  {
    keywords: ["agriculture", "agricultural", "agribusiness", "animal science", "food", "horticulture", "plant science", "forestry", "forest", "natural resources"],
    study: ["Biological systems", "Resource management", "Applied science", "Sustainability", "Economics or production systems", "Field and laboratory methods"],
    careers: ["Agriculture and food", "Natural resources", "Environmental management", "Government", "Industry", "Research"],
    skills: ["Applied science", "Field methods", "Data analysis", "Resource planning", "Problem-solving", "Communication"],
    experience: "Expect applied science learning with field, laboratory or industry-focused projects connected to food, land, animals, forests or natural resources."
  },
  {
    keywords: ["aviation", "aircraft", "aerospace"],
    study: ["Aviation systems", "Safety", "Technical operations", "Regulation", "Navigation or aircraft systems", "Applied mathematics"],
    careers: ["Aviation", "Aerospace", "Operations", "Maintenance", "Safety", "Transportation"],
    skills: ["Technical problem-solving", "Safety awareness", "Systems thinking", "Precision", "Communication", "Applied analysis"],
    experience: "Expect applied technical training, simulation or laboratory work and a strong focus on safety, systems and professional standards."
  },
  {
    keywords: ["hospitality", "tourism", "culinary", "hotel", "event management"],
    study: ["Operations", "Customer experience", "Marketing", "Finance", "Service management", "Industry practice"],
    careers: ["Hospitality", "Tourism", "Events", "Operations", "Marketing", "Entrepreneurship"],
    skills: ["Service operations", "Communication", "Team leadership", "Planning", "Customer experience", "Business analysis"],
    experience: "Expect applied business coursework, team projects and industry-focused learning; some programs include placements, co-op or practical labs."
  },
  {
    keywords: ["trades", "apprentice", "carpentry", "electrician", "welding", "machinist", "plumbing", "automotive", "heavy duty", "millwright", "sheet metal", "cabinet"],
    study: ["Trade theory", "Safety", "Tools and equipment", "Technical drawings", "Codes and standards", "Hands-on shop practice"],
    careers: ["Skilled trades", "Construction", "Industrial maintenance", "Manufacturing", "Service and repair", "Apprenticeship progression"],
    skills: ["Hands-on technical work", "Safety", "Precision", "Troubleshooting", "Tool use", "Teamwork"],
    experience: "Expect intensive hands-on shop or lab training supported by technical theory and safety instruction. Apprenticeship and certification requirements vary by trade."
  },
];

const defaultProfile: DisciplineProfile = {
  keywords: [],
  study: ["Core disciplinary concepts", "Research methods", "Critical analysis", "Communication", "Applied learning", "Elective specialization"],
  careers: ["Public and private sector roles", "Research", "Communications", "Project work", "Further study", "Related professional fields"],
  skills: ["Research", "Critical thinking", "Writing", "Communication", "Analysis", "Independent learning"],
  experience: "Expect a mix of lectures, smaller classes, reading, writing, projects and independent study. The exact balance depends on the program and year of study."
};

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function inferDuration(degree: string) {
  const text = degree.toLowerCase();
  if (text.includes("certificate")) return "1 year (typical; varies)";
  if (text.includes("diploma")) return "2 years (typical; varies)";
  if (text.includes("associate")) return "2 years";
  if (text.includes("apprent")) return "Varies by apprenticeship";
  if (text.includes("foundation")) return "About 1 year";
  if (
    text.includes("bachelor") ||
    /\bba\b|\bbsc\b|\bbcom\b|\bbba\b|\bbeng\b|\bbasc\b|\bbfa\b|\bbmus\b|\bbkin\b|\bbn\b|\bbscn\b/i.test(
      degree
    )
  ) {
    return "4 years (typical)";
  }
  return "Varies";
}

function getProfile(value: string) {
  const text = value.toLowerCase();
  return (
    profiles.find((profile) =>
      profile.keywords.some((keyword) => text.includes(keyword))
    ) ?? defaultProfile
  );
}

function joinNatural(items: string[]) {
  if (items.length <= 1) return items[0] ?? "the field";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items.at(-1)}`;
}

function defaultAdmissionInfo(entryType: ProgramEntryType) {
  if (entryType === "Choose after first year") {
    return "This field is usually selected after entering a broader first-year degree or faculty. Review the official program page for first-year progression rules, prerequisite courses, capacity limits and any internal application requirements.";
  }
  if (entryType === "Second entry") {
    return "This is not normally a direct high-school entry program. Applicants generally need prior post-secondary study or another credential before applying. Check the official program page for the exact entry pathway.";
  }
  if (entryType === "Direct entry") {
    return "High-school applicants can apply through this program or admission category. Requirements depend on your province, curriculum and applicant category. Check the official page for required Grade 11/12 courses, supplemental applications and the current selection process.";
  }
  return "Admission pathway and requirements vary by applicant category. Check the official program page for prerequisite courses, supplemental applications and the current selection process.";
}

function fromLegacy(seed: LegacyProgramSeed): ProgramSeedObject {
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
    overview,
  ] = seed;

  return {
    id,
    universityId,
    school,
    name,
    degree,
    duration,
    entryType: "Direct entry",
    whatYouStudy,
    careers,
    officialUrl,
    overview,
  };
}

export function makeProgram(seed: ProgramSeed): ProgramDetail {
  const data = Array.isArray(seed) ? fromLegacy(seed) : seed;
  const profile = getProfile(`${data.name} ${data.school} ${data.degree}`);
  const whatYouStudy = data.whatYouStudy ?? profile.study;
  const careers = data.careers ?? profile.careers;
  const entryType = data.entryType ?? "Direct entry";
  const overview =
    data.overview ??
    `${data.name} at ${data.school} focuses on ${joinNatural(
      whatYouStudy.slice(0, 4)
    )}. The program develops practical and academic skills that can support pathways such as ${joinNatural(
      careers.slice(0, 3)
    )}.`;

  return {
    id: data.id ?? `${data.universityId}-${slugify(data.name)}`,
    universityId: data.universityId,
    school: data.school,
    name: data.name,
    degree: data.degree,
    duration: data.duration ?? inferDuration(data.degree),
    entryType,
    overview,
    whatYouStudy,
    experience: data.experience ?? profile.experience,
    specializations: data.specializations ?? whatYouStudy.slice(0, 4),
    skills: data.skills ?? profile.skills,
    careers,
    admissionInfo: data.admissionInfo ?? defaultAdmissionInfo(entryType),
    admissionAverage:
      data.admissionAverage ?? "Varies — check official requirements",
    applicationDeadline:
      data.applicationDeadline ?? "Check official requirements",
    officialUrl: data.officialUrl,
  };
}

export function makePrograms(seeds: ProgramSeed[]) {
  return seeds.map(makeProgram);
}

export function makeProgramGroups(groups: ProgramGroup[]) {
  return groups.flatMap((group) =>
    group.programs.map((item): ProgramDetail => {
      const overrides = typeof item === "string" ? { name: item } : item;

      return makeProgram({
        universityId: group.universityId,
        school: overrides.school ?? group.school,
        name: overrides.name,
        degree: overrides.degree ?? group.degree,
        duration: overrides.duration ?? group.duration,
        entryType: overrides.entryType ?? group.entryType,
        officialUrl: overrides.officialUrl ?? group.officialUrl,
        id: overrides.id,
        overview: overrides.overview,
        whatYouStudy: overrides.whatYouStudy,
        experience: overrides.experience,
        specializations: overrides.specializations,
        skills: overrides.skills,
        careers: overrides.careers,
        admissionInfo: overrides.admissionInfo,
        admissionAverage: overrides.admissionAverage,
        applicationDeadline: overrides.applicationDeadline,
      });
    })
  );
}
