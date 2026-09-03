import schools from "../canadianSchools.json";
import type { ProgramDetail } from "./schema";

export function getMissingProgramSchoolIds(programs: ProgramDetail[]) {
  const covered = new Set(programs.map((program) => program.universityId));
  return schools
    .filter((school) => !covered.has(school.id))
    .map((school) => school.id);
}
