import { University } from "@/types/university";

const ucalgary: University = {
  id:"ucalgary",
  name:"University of Calgary",
  shortName:"UCalgary",
  logo:"/logos/ucalgary.png",

  province:"Alberta",
  city:"Calgary",

  type:"Public",

  website:"https://www.ucalgary.ca",
  admissionsWebsite:"https://www.ucalgary.ca/future-students",

  admissionAverage:"High 80s",
  tuitionDomestic:"$6,000-$8,000/year",

  applicationDeadline:"March",

  studentPopulation:36000,

  residence:true,
  coop:true,

  faculties:[
    {
      name:"Haskayne School of Business",
      programs:[
        {
          name:"Bachelor of Commerce",
          degree:"BCom"
        }
      ]
    }
  ]
};

export default ucalgary;