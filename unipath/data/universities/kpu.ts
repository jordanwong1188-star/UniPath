import { University } from "@/types/university";

const kpu: University = {
  id: "kpu",

  name: "Kwantlen Polytechnic University",

  shortName: "KPU",

  logo: "/logos/kpu.png",

  province: "British Columbia",

  city: "Surrey",

  type: "Public",

  website: "https://www.kpu.ca",

  admissionsWebsite: "https://www.kpu.ca/admission",

  admissionAverage: "Program dependent",

  tuitionDomestic: "Program dependent",

  applicationDeadline: "Varies by program",

  studentPopulation: 20000,

  residence: true,

  coop: true,

  faculties: [
    {
      name: "Kwantlen School of Business",

      programs: [
        {
          name: "Bachelor of Business Administration",
          degree: "BBA"
        }
      ]
    }
  ]
};

export default kpu;