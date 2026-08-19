import { britishColumbiaPrograms } from "./programs/britishColumbia";
import { ontarioPrograms } from "./programs/ontario";
import { prairiePrograms } from "./programs/prairies";
import { quebecAtlanticPrograms } from "./programs/quebecAtlantic";
import type { ProgramDetail } from "./programs/schema";

export type { ProgramDetail } from "./programs/schema";

const verifiedOfficialUrls: Record<string, string> = {
  "ubc-sauder-bcom":
    "https://org-www.sauder.ubc.ca/programs/bachelors-degrees/bachelor-commerce",
  "uoft-rotman-commerce": "https://rotmancommerce.utoronto.ca/",
  "waterloo-afm":
    "https://uwaterloo.ca/future-students/programs/accounting-and-financial-management",
  "mcmaster-commerce": "https://ug.degroote.mcmaster.ca/programs/commerce/",
  "queens-commerce": "https://smith.queensu.ca/bcom/",
  "western-ivey": "https://www.ivey.uwo.ca/hba/",
};

export const programDetails: ProgramDetail[] = [
  ...britishColumbiaPrograms,
  ...prairiePrograms,
  ...ontarioPrograms,
  ...quebecAtlanticPrograms,
].map((program) => ({
  ...program,
  officialUrl: verifiedOfficialUrls[program.id] ?? program.officialUrl,
}));

export function getProgramsForUniversity(
  universityId: string
): ProgramDetail[] {
  return programDetails.filter(
    (program) => program.universityId === universityId
  );
}

export function getProgramById(
  universityId: string,
  programId: string
): ProgramDetail | undefined {
  return programDetails.find(
    (program) =>
      program.universityId === universityId && program.id === programId
  );
}

export function hasPrograms(universityId: string): boolean {
  return programDetails.some(
    (program) => program.universityId === universityId
  );
}
