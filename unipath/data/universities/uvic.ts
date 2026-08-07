import { University } from "@/types/university";

const uvic: University = {
  id: "uvic",

  name: "University of Victoria",

  shortName: "UVic",

  logo: "/logos/uvic.png",

  province: "British Columbia",

  city: "Victoria",

  type: "Public",

  website: "https://www.uvic.ca",

  admissionsWebsite: "https://www.uvic.ca/undergraduate/",

  admissionAverage: "Mid to high 80s",

  tuitionDomestic: "$6,000-$8,000/year",

  applicationDeadline: "January",

  studentPopulation: 22000,

  residence: true,

  coop: true,

  faculties: [
    {
      name: "Peter B. Gustavson School of Business",

      programs: [
        {
          name: "Bachelor of Commerce",

          degree: "BCom"
        }
      ]
    }
  ]
};

export default uvic;