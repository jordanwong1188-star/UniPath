import { bcCollegePrograms } from "./bcColleges";
import { bcPolytechnicPrograms } from "./bcPolytechnic";
import { bcResearchPrograms } from "./bcResearch";

export const britishColumbiaPrograms = [
  ...bcResearchPrograms,
  ...bcPolytechnicPrograms,
  ...bcCollegePrograms,
];
