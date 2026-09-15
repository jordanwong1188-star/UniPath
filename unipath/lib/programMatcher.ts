import type { ProgramDetail } from "../data/programs/schema";
import { admissionsEvidence, type AdmissionsEvidence } from "../data/admissionsEvidence";

export const fields = ["Business", "Engineering", "Computer Science", "Health & Life Sciences", "Math & Data", "Social Sciences", "Humanities", "Arts & Design", "Education", "Undecided"] as const;
export type Field = typeof fields[number];
export type Profile = { field: Field; average: number; program: string; school: string; province: string; activities: string };
type School = { id: string; name: string; province: string };
export type Match = { program: ProgramDetail; school: School; evidence?: AdmissionsEvidence; label: string; rank: number; reasons: string[] };
const keywords: Record<Field, string[]> = {
  Business: ["business", "commerce", "accounting", "finance", "management", "marketing", "economics", "administration", "comptabilite"],
  Engineering: ["engineering", "genie", "mechatronic"],
  "Computer Science": ["computer science", "computing", "software", "informatique", "cybersecurity"],
  "Health & Life Sciences": ["health", "biology", "nursing", "biomedical", "biochemistry", "kinesiology", "neuroscience", "sante"],
  "Math & Data": ["math", "mathematics", "statistics", "data science", "actuarial", "mathematiques"],
  "Social Sciences": ["psychology", "sociology", "political", "economics", "criminology", "anthropology", "international relations"],
  Humanities: ["english", "history", "philosophy", "literature", "language", "linguistics", "classics", "religion"],
  "Arts & Design": ["art", "arts", "design", "music", "film", "theatre", "architecture", "animation"],
  Education: ["education", "teaching", "child studies"], Undecided: [],
};
export function normalize(text: string) { return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(); }
function has(text: string, phrase: string) { return (` ${normalize(text)} `).includes(` ${normalize(phrase)} `); }
function queryText(text: string) { const n = normalize(text).replace(/\bcomputing science\b/g, "computer science"); return ({ cs: "computer science", bcom: "commerce", bba: "business administration" } as Record<string,string>)[n] || n; }
export function academicLabel(average: number, evidence?: AdmissionsEvidence) {
  if (!evidence) return "Admission range not verified";
  const reference = evidence.kind === "research-estimate" ? "estimated range" : "published range";
  if (average < evidence.range[0]) return `Below ${reference}`;
  if (average > evidence.range[1]) return `Above ${reference}`;
  return `Within ${reference}`;
}
const activitySignals: { pattern: RegExp; fields: Field[]; label: string }[] = [
  { pattern: /\b(coding|programming|robotics|hackathons?|software)\b/i, fields: ["Computer Science", "Engineering"], label: "technical projects" },
  { pattern: /\b(finance|investing|entrepreneurship|business|startup)\b/i, fields: ["Business"], label: "business interests" },
  { pattern: /\b(orchestra|cello|violin|music|painting|theatre|design)\b/i, fields: ["Arts & Design"], label: "creative interests" },
  { pattern: /\b(hospital|biology|clinic|health|lab)\b/i, fields: ["Health & Life Sciences"], label: "health or science interests" },
  { pattern: /\b(tutor|tutoring|teaching|mentoring)\b/i, fields: ["Education"], label: "teaching interests" },
  { pattern: /\b(debate|politics|advocacy|model un)\b/i, fields: ["Social Sciences", "Humanities"], label: "public affairs interests" },
];
export function matchPrograms(profile: Profile, programs: ProgramDetail[], schools: School[], evidence = admissionsEvidence) {
  if (!Number.isFinite(profile.average) || profile.average < 0 || profile.average > 100) throw new Error("Enter an average between 0 and 100.");
  const schoolMap = new Map(schools.map(s => [s.id, s]));
  const query = queryText(profile.program);
  const tokens = query.split(" ").filter(t => !["bachelor", "of", "honours", "degree", "program", "and"].includes(t) && t.length > 1);
  const ranked: Match[] = [];
  for (const program of programs) {
    const school = schoolMap.get(program.universityId);
    if (!school || (profile.province && school.province !== profile.province) || program.entryType === "Second entry") continue;
    // Titles, not generated career/skills paragraphs, establish subject relevance.
    const title = normalize(program.name);
    const matchedFields = fields.filter(f => f !== "Undecided" && keywords[f].some(k => has(title, k)));
    if (profile.field !== "Undecided" && !matchedFields.includes(profile.field)) continue;
    const comparableTitle = queryText(title);
    const exactQuery = query && has(comparableTitle, query);
    if (tokens.length && !exactQuery && !tokens.every(t => has(comparableTitle, t))) continue;
    const sources = evidence.filter(e => e.universityId === program.universityId && normalize(e.programName) === title);
    // Official program-specific evidence always takes precedence over community estimates.
    const source = sources.find(e => e.kind !== "research-estimate") || sources[0];
    const signals = activitySignals.filter(s => s.pattern.test(profile.activities) && s.fields.some(f => matchedFields.includes(f)));
    const reasons = [query ? `Matches your requested program: ${profile.program}.` : profile.field === "Undecided" ? "Explore this subject area." : `Matches your ${profile.field.toLowerCase()} interest.`];
    if (profile.school === school.id) reasons.push("Your preferred university.");
    if (signals.length) reasons.push(`Your activities suggest ${signals.map(s => s.label).join(" and ")}. This indicates interest, not an admissions bonus.`);
    if (program.entryType === "Choose after first year") reasons.push("Apply to the entry faculty first; this specialization is selected later.");
    const mid = source ? (source.range[0] + source.range[1]) / 2 : 0;
    // Prefer a useful academic comparison, not whichever cutoff is easiest to exceed.
    // Grades never fabricate an academic rank for an unsourced program.
    const academic = source ? Math.max(0, 40 - Math.abs(profile.average - (mid + 2)) * 2 - Math.max(0, source.range[0] - profile.average) * 2) : 0;
    const rank = academic + (exactQuery ? 15 : 0) + (profile.school === school.id ? 15 : 0) + Math.min(6, signals.length * 3);
    ranked.push({ program, school, evidence: source, label: academicLabel(profile.average, source), rank, reasons });
  }
  ranked.sort((a,b) => b.rank - a.rank || a.school.name.localeCompare(b.school.name) || a.program.name.localeCompare(b.program.name));
  function diverse(items: Match[], limit: number) {
    const counts = new Map<string,number>();
    return items.filter(item => { const count = counts.get(item.school.id) || 0; if (count >= 2) return false; counts.set(item.school.id, count + 1); return true; }).slice(0,limit);
  }
  return { academic: diverse(ranked.filter(r => r.evidence), 12), explore: diverse(ranked.filter(r => !r.evidence), 8), total: ranked.length };
}
