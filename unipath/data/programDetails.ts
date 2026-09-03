import { britishColumbiaPrograms } from "./programs/britishColumbia";
import { getMissingProgramSchoolIds } from "./programs/coverage";
import { ontarioPrograms } from "./programs/ontario";
import { prairiePrograms } from "./programs/prairies";
import { getProgramDataIssues } from "./programs/quality";
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

const legacyProgramAliases: Record<
  string,
  { universityId: string; targetName: string }
> = {
  "uvic-arts": { universityId: "uvic", targetName: "English" },
  "mcgill-management": {
    universityId: "mcgill",
    targetName: "Bachelor of Commerce",
  },
  "mcgill-engineering": {
    universityId: "mcgill",
    targetName: "Chemical Engineering - McGill",
  },
  "concordia-engineering": {
    universityId: "concordia",
    targetName: "Aerospace Engineering - Concordia",
  },
  "udem-informatique": {
    universityId: "udem",
    targetName: "Baccalauréat en informatique",
  },
  "udem-psychologie": {
    universityId: "udem",
    targetName: "Baccalauréat en psychologie",
  },
  "laval-business": {
    universityId: "laval",
    targetName: "Baccalauréat en administration des affaires - Laval",
  },
  "laval-engineering": {
    universityId: "laval",
    targetName: "Baccalauréat en génie civil - Laval",
  },
  "usherbrooke-business": {
    universityId: "usherbrooke",
    targetName: "Baccalauréat en administration des affaires - Sherbrooke",
  },
  "usherbrooke-engineering": {
    universityId: "usherbrooke",
    targetName: "Baccalauréat en génie civil - Sherbrooke",
  },
  "uqam-business": {
    universityId: "uqam",
    targetName: "Baccalauréat en administration - UQAM",
  },
  "uqam-informatique": {
    universityId: "uqam",
    targetName: "Baccalauréat en informatique et génie logiciel",
  },
  "dalhousie-commerce": {
    universityId: "dalhousie",
    targetName: "Commerce - Dalhousie",
  },
  "dalhousie-engineering": {
    universityId: "dalhousie",
    targetName: "Engineering - Dalhousie",
  },
  "smu-business": {
    universityId: "smu",
    targetName: "Accounting - Sobey",
  },
  "smu-science": {
    universityId: "smu",
    targetName: "Biology - SMU",
  },
  "stfx-business": {
    universityId: "stfx",
    targetName: "Business Administration - StFX",
  },
  "stfx-science": {
    universityId: "stfx",
    targetName: "Biology - StFX",
  },
  "unb-business": {
    universityId: "unb",
    targetName: "Accounting - UNB Fredericton",
  },
  "unb-engineering": {
    universityId: "unb",
    targetName: "Civil Engineering - UNB",
  },
  "moncton-business": {
    universityId: "moncton",
    targetName: "Baccalauréat en administration des affaires - général UMoncton",
  },
  "moncton-engineering": {
    universityId: "moncton",
    targetName: "Génie civil - UMoncton",
  },
  "upei-business": {
    universityId: "upei",
    targetName: "Business Administration - UPEI",
  },
  "upei-science": {
    universityId: "upei",
    targetName: "Bachelor of Science - UPEI",
  },
  "memorial-business": {
    universityId: "memorial",
    targetName: "Bachelor of Commerce - Memorial",
  },
  "memorial-science": {
    universityId: "memorial",
    targetName: "Bachelor of Science - Memorial",
  },
};

function makeRouteIdsUnique(programs: ProgramDetail[]): ProgramDetail[] {
  const seen = new Map<string, number>();

  return programs.map((program) => {
    const key = `${program.universityId}:${program.id}`;
    const occurrence = (seen.get(key) ?? 0) + 1;
    seen.set(key, occurrence);

    if (occurrence === 1) {
      return program;
    }

    return {
      ...program,
      id: `${program.id}-${occurrence}`,
    };
  });
}

const rawProgramDetails: ProgramDetail[] = [
  ...britishColumbiaPrograms,
  ...prairiePrograms,
  ...ontarioPrograms,
  ...quebecAtlanticPrograms,
].map((program) => ({
  ...program,
  officialUrl: verifiedOfficialUrls[program.id] ?? program.officialUrl,
}));

export const programDetails = makeRouteIdsUnique(rawProgramDetails);

export const missingProgramSchoolIds =
  getMissingProgramSchoolIds(programDetails);
export const programDataIssues = getProgramDataIssues(programDetails);

if (missingProgramSchoolIds.length > 0) {
  throw new Error(
    `Program data is missing for: ${missingProgramSchoolIds.join(", ")}`
  );
}

if (programDataIssues.length > 0) {
  throw new Error(`Program data issues: ${programDataIssues.join("; ")}`);
}

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
  const exact = programDetails.find(
    (program) =>
      program.universityId === universityId && program.id === programId
  );

  if (exact) {
    return exact;
  }

  const alias = legacyProgramAliases[programId];
  if (!alias || alias.universityId !== universityId) {
    return undefined;
  }

  return programDetails.find(
    (program) =>
      program.universityId === universityId &&
      program.name === alias.targetName
  );
}

export function hasPrograms(universityId: string): boolean {
  return programDetails.some(
    (program) => program.universityId === universityId
  );
}
