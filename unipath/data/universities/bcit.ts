import { University } from "@/types/university";

const bcit: University = {
  id: "bcit",

  name: "British Columbia Institute of Technology",

  shortName: "BCIT",

  logo: "/logos/bcit.png",

  province: "British Columbia",

  city: "Burnaby",

  type: "Polytechnic",

  website: "https://www.bcit.ca",

  admissionsWebsite: "https://www.bcit.ca/admission/",

  admissionAverage: "Program dependent",

  tuitionDomestic: "Program dependent",

  applicationDeadline: "Varies by program",

  studentPopulation: 50000,

  residence: true,

  coop: true,

  faculties: [
    {
      name: "Business + Media",

      programs: [
        {
          name: "Business Administration",
          degree: "BBA"
        }
      ]
    }
  ]
};

export default bcit;