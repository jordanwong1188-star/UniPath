import { University } from "@/types/university";

const capilano: University = {
  id: "capilano",

  name: "Capilano University",

  shortName: "CapU",

  logo: "/logos/capilano.png",

  province: "British Columbia",

  city: "North Vancouver",

  type: "Public",

  website: "https://www.capilanou.ca",

  admissionsWebsite: "https://www.capilanou.ca/admission/",

  admissionAverage: "Program dependent",

  tuitionDomestic: "Program dependent",

  applicationDeadline: "Varies by program",

  studentPopulation: 12000,

  residence: true,

  coop: true,

  faculties: [
    {
      name: "School of Business",

      programs: [
        {
          name: "Bachelor of Business Administration",
          degree: "BBA"
        }
      ]
    }
  ]
};

export default capilano;