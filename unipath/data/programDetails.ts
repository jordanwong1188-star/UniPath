export type ProgramDetail = {
  id: string;
  universityId: string;
  school: string;
  name: string;
  degree: string;
  duration: string;
  entryType:
    | "Direct entry"
    | "Choose after first year"
    | "Second entry"
    | "Varies";
  overview: string;
  whatYouStudy: string[];
  careers: string[];
  officialUrl: string;
};

export const programDetails: ProgramDetail[] = [
  {
    id: "ubc-computer-science",
    universityId: "ubc",
    school: "Faculty of Science",
    name: "Computer Science",
    degree: "BSc",
    duration: "4 years (typical)",
    entryType: "Choose after first year",
    overview:
      "Study programming, algorithms, software systems and computational problem-solving.",
    whatYouStudy: ["Programming", "Algorithms", "Software development"],
    careers: ["Software development", "Data science", "Product engineering"],
    officialUrl: "https://you.ubc.ca/ubc_programs/computer-science/",
  },
  {
    id: "sfu-business",
    universityId: "sfu",
    school: "Beedie School of Business",
    name: "Business Administration",
    degree: "BBA",
    duration: "4 years (typical)",
    entryType: "Direct entry",
    overview:
      "Build foundations in accounting, finance, marketing, strategy and management.",
    whatYouStudy: ["Finance", "Marketing", "Management"],
    careers: ["Consulting", "Finance", "Marketing"],
    officialUrl: "https://www.sfu.ca/students/admission/programs/a-z/b/business-administration.html",
  },
  {
    id: "waterloo-engineering",
    universityId: "waterloo",
    school: "Faculty of Engineering",
    name: "Engineering",
    degree: "BASc",
    duration: "5 years with co-op",
    entryType: "Direct entry",
    overview:
      "Combine technical coursework, design projects and extensive co-op experience.",
    whatYouStudy: ["Engineering design", "Mathematics", "Co-op"],
    careers: ["Engineering", "Technology", "Product development"],
    officialUrl: "https://uwaterloo.ca/future-students/programs/engineering",
  },
  {
    id: "mcgill-psychology",
    universityId: "mcgill",
    school: "Faculty of Science",
    name: "Psychology",
    degree: "BSc",
    duration: "3–4 years",
    entryType: "Choose after first year",
    overview:
      "Explore cognition, behaviour, research methods and biological psychology.",
    whatYouStudy: ["Cognition", "Research methods", "Behaviour"],
    careers: ["Research", "Mental health services", "Human resources"],
    officialUrl: "https://www.mcgill.ca/undergraduate-admissions/program/psychology",
  },
  {
    id: "western-ivey-aeo",
    universityId: "western",
    school: "Ivey Business School",
    name: "Ivey Advanced Entry Opportunity (AEO)",
    degree: "Conditional pre-admission to HBA",
    duration: "2 + 2 pathway",
    entryType: "Second entry",
    overview:
      "Earn conditional pre-admission status to Ivey HBA while completing your first two years in any Western, Huron, or King's program.",
    whatYouStudy: [
      "Case-method business",
      "Leadership",
      "Strategy",
      "Finance",
      "Consulting",
    ],
    careers: ["Consulting", "Finance", "Entrepreneurship", "Management"],
    officialUrl: "https://www.ivey.uwo.ca/hba/admissions/high-school-students/",
  },
];

export function getProgramsForUniversity(
  universityId: string
): ProgramDetail[] {
  return programDetails.filter(
    (program) => program.universityId === universityId
  );
}
