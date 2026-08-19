import { britishColumbiaPrograms } from "./programs/britishColumbia";
import { ontarioPrograms } from "./programs/ontario";
import { prairiePrograms } from "./programs/prairies";
import { quebecAtlanticPrograms } from "./programs/quebecAtlantic";
import type { ProgramDetail } from "./programs/schema";

export type { ProgramDetail } from "./programs/schema";

export const programDetails: ProgramDetail[] = [
  ...britishColumbiaPrograms,
  ...prairiePrograms,
  ...ontarioPrograms,
  ...quebecAtlanticPrograms,
];

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
