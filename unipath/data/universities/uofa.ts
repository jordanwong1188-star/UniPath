import { University } from "@/types/university";

const uofa: University = {
  id:"uofa",
  name:"University of Alberta",
  shortName:"UAlberta",
  logo:"/logos/uofa.png",

  province:"Alberta",
  city:"Edmonton",

  type:"Public",

  website:"https://www.ualberta.ca",
  admissionsWebsite:"https://www.ualberta.ca/admissions",

  admissionAverage:"High 80s",
  tuitionDomestic:"$6,000-$8,000/year",

  applicationDeadline:"March",

  studentPopulation:40000,

  residence:true,
  coop:true,

  faculties:[
    {
      name:"Alberta School of Business",
      programs:[
        {
          name:"Bachelor of Commerce",
          degree:"BCom"
        }
      ]
    }
  ]
};

export default uofa;