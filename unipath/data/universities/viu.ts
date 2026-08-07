import { University } from "@/types/university";

const viu: University = {
  id: "viu",
  name: "Vancouver Island University",
  shortName: "VIU",
  logo: "/logos/viu.png",

  province: "British Columbia",
  city: "Nanaimo",

  type: "Public",

  website: "https://www.viu.ca",
  admissionsWebsite: "https://www.viu.ca/admissions",

  admissionAverage: "Program dependent",
  tuitionDomestic: "Program dependent",

  applicationDeadline: "Varies",

  studentPopulation: 15000,

  residence: true,
  coop: true,

  faculties: [
    {
      name: "Faculty of Management",
      programs: [
        {
          name: "Bachelor of Business Administration",
          degree: "BBA"
        }
      ]
    }
  ]
};

export default viu;