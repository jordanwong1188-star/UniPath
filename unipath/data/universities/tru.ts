import { University } from "@/types/university";

const tru: University = {
  id: "tru",
  name: "Thompson Rivers University",
  shortName: "TRU",
  logo: "/logos/tru.png",

  province: "British Columbia",
  city: "Kamloops",

  type: "Public",

  website: "https://www.tru.ca",
  admissionsWebsite: "https://www.tru.ca/admissions/",

  admissionAverage: "Program dependent",
  tuitionDomestic: "Program dependent",

  applicationDeadline: "Varies",

  studentPopulation: 25000,

  residence: true,
  coop: true,

  faculties: [
    {
      name: "School of Business and Economics",
      programs: [
        {
          name: "Bachelor of Business Administration",
          degree: "BBA"
        }
      ]
    }
  ]
};

export default tru;