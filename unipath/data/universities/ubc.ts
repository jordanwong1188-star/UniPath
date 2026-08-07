import { University } from "@/types/university";

const ubc: University = {
  id: "ubc",
  name: "University of British Columbia",
  shortName: "UBC",
  logo: "/logos/ubc.png",

  province: "British Columbia",
  city: "Vancouver",

  type: "Public",

  website: "https://www.ubc.ca",
  admissionsWebsite: "https://you.ubc.ca",

  admissionAverage: "High 80s",
  tuitionDomestic: "$6,000-$8,000/year",
  applicationDeadline: "January 15",

  studentPopulation: 70000,

  residence: true,
  coop: true,

  faculties: [
    {
      name: "Sauder School of Business",
      programs: [
        {
          name: "Bachelor of Commerce",
          degree: "BCom",
          deadline: "January 15"
        }
      ]
    }
  ]
};

export default ubc;