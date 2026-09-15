export type AdmissionsEvidence = {
  kind?: "official" | "research-estimate";
  additionalSources?: { label: string; url: string }[];
  universityId: string;
  programName: string;
  range: [number, number];
  publishedRange: string;
  source: string;
  scope: string;
  checked: string;
  note: string;
};

// Explicit program-level sources only. Never infer a cutoff from generic catalogue text.
// Word bands are approximate display/comparison conventions: low x0–x3,
// mid x4–x6, high x7–x9, not university-defined numeric cutoffs.
export const admissionsEvidence: AdmissionsEvidence[] = [
  { universityId: "queens", programName: "Commerce", kind: "research-estimate", range: [90, 98], publishedRange: "90–98% planning estimate · low confidence", source: "https://uniscope.ca/queens-university/smith-commerce", scope: "High-school percentage applicants; community reports mix applicant groups and cycles", checked: "2026-09-01", note: "UniPath estimate, not an official cutoff or admission probability. Rounded planning band informed by community-reported accepted grades, mostly in the 90–98 bands, and Reddit reports around 95.5–95.6%. Reports also include offers below this band. Self-selection, unverifiable grades and mixed cycles limit reliability. The mandatory supplemental application matters; being above this band does not make this a safe choice.", additionalSources: [{ label: "Reddit: self-reported 95.5% offer", url: "https://www.reddit.com/r/OntarioGrade12s/comments/1tut6sc/what_a_955_average_got_me_commerce_admissions/" }, { label: "Reddit: self-reported 95.6% offer (Group B)", url: "https://www.reddit.com/r/OntarioGrade12s/comments/1t5klzw/queens_commerce_acceptance_today/" }, { label: "Official selection process and requirements", url: "https://smith.queensu.ca/bcom/program-details/admission.php" }] },
  { universityId: "tmu", programName: "Business Management", range: [77, 79], publishedRange: "High 70s", source: "https://www.torontomu.ca/programs/undergraduate/business-management/", scope: "Ontario high-school reference; other curricula require equivalency checks", checked: "2026-09-01", note: "Historical range, not a guaranteed cutoff. Grades-only selection; check required English and math courses." },
  { universityId: "tmu", programName: "Computer Science", range: [80, 83], publishedRange: "Low 80s", source: "https://www.torontomu.ca/programs/undergraduate/computer-science/", scope: "Ontario high-school reference; other curricula require equivalency checks", checked: "2026-09-01", note: "Historical range, not a guaranteed cutoff. Grades-only selection; check all required courses." },
  { universityId: "laurier", programName: "Business Administration", range: [87, 89], publishedRange: "High 80s", source: "https://www.wlu.ca/programs/business-and-economics/undergraduate/business-administration-bba/index.html", scope: "Ontario high school; other Canadian applicants must check course equivalents", checked: "2026-09-01", note: "Published admission range. Prerequisites count in the admission average; double degrees have different requirements." },
  { universityId: "laurier", programName: "Computer Science", range: [77, 79], publishedRange: "High 70s", source: "https://www.wlu.ca/programs/science/undergraduate/computer-science-ba-or-bsc-waterloo/index.html", scope: "Waterloo campus, Ontario high-school reference; check provincial equivalents", checked: "2026-09-01", note: "Published admission range. BSc requires English, Advanced Functions and one of Calculus, Chemistry or Physics; verify equivalents." },
  ...["Computing Science", "Software Systems"].map(programName => ({ universityId: "sfu", programName, range: [87, 93] as [number, number], publishedRange: "High 80s to low 90s", source: "https://www.sfu.ca/students/admission/admission-requirements/historical-admission-grade-ranges.html", scope: "Canadian/permanent-resident and student-visa high-school applicants; not IB points", checked: "2026-09-01", note: "Historical acceptance range over three years. SFU's faculty-specific course calculation and prerequisites still apply." })),
  ...["Engineering Science", "Mechatronic Systems Engineering"].map(programName => ({ universityId: "sfu", programName, range: [84, 86] as [number, number], publishedRange: "Mid 80s", source: "https://www.sfu.ca/students/admission/admission-requirements/historical-admission-grade-ranges.html", scope: "Canadian/permanent-resident and student-visa high-school applicants; not IB points", checked: "2026-09-01", note: "Historical acceptance range over three years. Verify faculty-specific prerequisites and admission-average calculation." })),
];
