import { University } from "@/types/university";

const uoft: University = {
  id: "uoft",
  name: "University of Toronto",
  shortName: "UofT",
  logo: "/logos/uoft.png",

  province: "Ontario",
  city: "Toronto",

  type: "Public",

  website: "https://www.utoronto.ca",
  admissionsWebsite: "https://future.utoronto.ca",

  admissionAverage: "High 80s to 90s",
  tuitionDomestic: "$6,000-$8,000/year",

  studentPopulation: 97000,

  residence: true,
  coop: true,

  faculties: [
    {
      name: "Rotman Commerce",
      programs: [
        {
          name: "Bachelor of Commerce",
          degree: "BCom"
        }
      ]
    }
  ]
};

export default uoft;