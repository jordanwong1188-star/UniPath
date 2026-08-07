import { University } from "@/types/university";

const sfu: University = {
  id: "sfu",
  name: "Simon Fraser University",
  shortName: "SFU",
  logo: "/logos/sfu.png",

  province: "British Columbia",
  city: "Burnaby",

  type: "Public",

  website: "https://www.sfu.ca",
  admissionsWebsite: "https://www.sfu.ca/admission",

  admissionAverage: "Mid to high 80s",
  tuitionDomestic: "$6,000-$8,000/year",

  studentPopulation: 35000,

  residence: true,
  coop: true,

  faculties: []
};

export default sfu;