import { makeProgramGroups, type ProgramGroup } from "./schema";

const groups: ProgramGroup[] = [
  // University of Prince Edward Island — current undergraduate program directory.
  {
    universityId: "upei",
    school: "Faculty of Arts",
    degree: "BA / BMus / BACL",
    entryType: "Direct entry",
    officialUrl: "https://www.upei.ca/programs",
    programs: [
      "Bachelor of Arts - UPEI", "Acadian Studies", "Anthropology - UPEI", "Applied Communication, Leadership, and Culture",
      "Asian Studies - UPEI", "Canadian Studies - UPEI", "Catholic Studies - UPEI", "Christian Studies - UPEI",
      "Classics - UPEI", "Diversity and Social Justice Studies", "Economics - UPEI", "English - UPEI",
      "Fine Arts - UPEI", "French - UPEI", "History - UPEI", "Indigenous Studies - UPEI",
      "International Studies - UPEI", "Island Studies - UPEI", "Korean Studies - UPEI", "Medieval and Renaissance Studies - UPEI",
      "Modern Languages - UPEI", "Music - BA UPEI", "Music - BMus UPEI", "Philosophy - UPEI",
      "Political Science - UPEI", "Psychology - BA UPEI", "Religious Studies - UPEI", "Sociology - UPEI",
      "Sociology / Anthropology - UPEI", "Spanish - UPEI", "Theatre Studies - UPEI", "University Writing - UPEI"
    ],
  },
  {
    universityId: "upei",
    school: "Faculty of Science",
    degree: "BSc / BSc Biotechnology / BWildCon",
    entryType: "Direct entry",
    officialUrl: "https://www.upei.ca/programs",
    programs: [
      "Bachelor of Science - UPEI", "Actuarial Science - UPEI", "Analytics - UPEI", "Biology - UPEI",
      "Biotechnology - UPEI", "Chemistry - UPEI", "Computer Science - UPEI", "Financial Mathematics - UPEI",
      "Foods and Nutrition - UPEI", "Mathematics - UPEI", "Medical and Biological Physics", "Physics - UPEI",
      "Psychology - BSc UPEI", "Statistics - UPEI", "Wildlife Conservation - UPEI"
    ],
  },
  {
    universityId: "upei",
    school: "Faculty of Business",
    degree: "BBA / Bachelor of Business",
    entryType: "Direct entry",
    officialUrl: "https://www.upei.ca/programs",
    programs: ["Business Administration - UPEI", "Accelerated Business Administration - UPEI", "Business Studies - UPEI", "Tourism and Hospitality - UPEI"],
  },
  {
    universityId: "upei",
    school: "Faculty of Sustainable Design Engineering / School of Climate Change and Adaptation",
    degree: "BScSDE / BSc / BES",
    entryType: "Direct entry",
    officialUrl: "https://www.upei.ca/programs",
    programs: ["Sustainable Design Engineering - UPEI", "Applied Climate Change and Adaptation", "Environmental Studies - UPEI"]
  },
  {
    universityId: "upei",
    school: "Faculty of Nursing / Applied Health Sciences",
    degree: "BScN / BAHS / BASR",
    entryType: "Varies",
    officialUrl: "https://www.upei.ca/programs",
    programs: [
      { name: "Nursing - UPEI", degree: "BScN", entryType: "Direct entry" },
      { name: "Accelerated Nursing - UPEI", degree: "BScN", entryType: "Second entry" },
      { name: "Paramedicine - UPEI", degree: "BAHS", entryType: "Varies" },
      { name: "Radiography - UPEI", degree: "BASR", entryType: "Varies" }
    ],
  },
  {
    universityId: "upei",
    school: "Faculty of Education",
    degree: "BEd",
    entryType: "Second entry",
    officialUrl: "https://www.upei.ca/programs",
    programs: ["Bachelor of Education - UPEI", "Baccalauréat en éducation - français langue seconde UPEI"]
  },
  {
    universityId: "upei",
    school: "Atlantic Veterinary College",
    degree: "DVM",
    entryType: "Second entry",
    officialUrl: "https://www.upei.ca/programs/doctor-veterinary-medicine",
    programs: ["Doctor of Veterinary Medicine - UPEI"]
  },
  {
    universityId: "upei",
    school: "Applied and collaborative programs",
    degree: "Bachelor / Certificate",
    entryType: "Varies",
    officialUrl: "https://www.upei.ca/programs",
    programs: ["Applied Arts in Journalism - UPEI", "Integrated Studies - UPEI", "Music Education - UPEI", "Pre-Veterinary Medicine Stream - UPEI", "Accounting - Certificate UPEI", "Business - Certificate UPEI", "Public Administration - Certificate UPEI"]
  },

  // Memorial University — St. John's direct degree choices.
  {
    universityId: "memorial",
    school: "Faculty of Humanities and Social Sciences — St. John's",
    degree: "BA / International BA",
    entryType: "Direct entry",
    officialUrl: "https://www.mun.ca/undergrad/programs/",
    programs: ["Bachelor of Arts - Memorial", "International Bachelor of Arts - Memorial", "Joint Bachelor of Arts and Bachelor of Science - Memorial"]
  },
  {
    universityId: "memorial",
    school: "Faculty of Humanities and Social Sciences — St. John's",
    degree: "BA",
    entryType: "Choose after first year",
    officialUrl: "https://www.mun.ca/hss/programs/undergraduate/",
    programs: [
      "Anthropology - Memorial", "Archaeology - Memorial", "Classics - Memorial", "Communication Studies - Memorial",
      "Criminology - Memorial", "Economics - Arts Memorial", "English - Memorial", "Folklore - Memorial",
      "French - Memorial", "Gender Studies - Memorial", "Geography - Arts Memorial", "German - Memorial",
      "History - Memorial", "Indigenous Studies - Memorial", "Linguistics - Memorial", "Medieval and Early Modern Studies - Memorial",
      "Philosophy - Memorial", "Political Science - Memorial", "Psychology - Arts Memorial", "Religious Studies - Memorial",
      "Sociology - Memorial", "Spanish - Memorial"
    ],
  },
  {
    universityId: "memorial",
    school: "Faculty of Science — St. John's",
    degree: "BSc",
    entryType: "Direct entry",
    officialUrl: "https://www.mun.ca/undergrad/programs/",
    programs: ["Bachelor of Science - Memorial", "Joint Bachelor of Science and Bachelor of Arts - Memorial"]
  },
  {
    universityId: "memorial",
    school: "Faculty of Science — St. John's",
    degree: "BSc",
    entryType: "Choose after first year",
    officialUrl: "https://www.mun.ca/science/undergraduates/programs/",
    programs: [
      "Biochemistry - Memorial", "Biology - Memorial", "Chemistry - Memorial", "Computer Science - Memorial",
      "Earth Sciences - Memorial", "Economics - Science Memorial", "Geography - Science Memorial", "Mathematics and Statistics - Memorial",
      "Ocean Sciences - Memorial", "Physics and Physical Oceanography - Memorial", "Psychology - Science Memorial"
    ],
  },
  {
    universityId: "memorial",
    school: "Faculty of Business Administration",
    degree: "BComm / Joint degree",
    entryType: "Direct entry",
    officialUrl: "https://www.mun.ca/undergrad/programs/",
    programs: ["Bachelor of Commerce - Memorial", "Bachelor of Commerce Co-operative - Memorial", "Joint Bachelor of Commerce and Bachelor of Music - Memorial", "Joint Bachelor of Commerce Co-operative and Bachelor of Arts - Memorial"]
  },
  {
    universityId: "memorial",
    school: "Faculty of Engineering and Applied Science",
    degree: "BEng",
    entryType: "Direct entry",
    officialUrl: "https://www.mun.ca/engineering/undergraduate/",
    programs: ["Engineering One - Memorial"]
  },
  {
    universityId: "memorial",
    school: "Faculty of Engineering and Applied Science",
    degree: "BEng",
    entryType: "Choose after first year",
    officialUrl: "https://www.mun.ca/engineering/undergraduate/",
    programs: ["Civil Engineering - Memorial", "Computer Engineering - Memorial", "Electrical Engineering - Memorial", "Mechanical Engineering - Memorial", "Ocean and Naval Architectural Engineering - Memorial", "Process Engineering - Memorial"]
  },
  {
    universityId: "memorial",
    school: "School of Human Kinetics and Recreation",
    degree: "BHKR / BKin / BPE / BRec",
    entryType: "Direct entry",
    officialUrl: "https://www.mun.ca/undergrad/programs/",
    programs: ["Human Kinetics and Recreation Co-operative - Memorial", "Kinesiology - Memorial", "Physical Education - Memorial", "Recreation - Memorial"]
  },
  {
    universityId: "memorial",
    school: "School of Music",
    degree: "BMus",
    entryType: "Direct entry",
    officialUrl: "https://www.mun.ca/undergrad/programs/",
    programs: ["Music - Memorial", "Joint Bachelor of Music and Bachelor of Commerce - Memorial"]
  },
  {
    universityId: "memorial",
    school: "Faculty of Nursing",
    degree: "BScN",
    entryType: "Varies",
    officialUrl: "https://www.mun.ca/undergrad/programs/",
    programs: ["Nursing - Four-Year Memorial", "Nursing - Accelerated Memorial"]
  },
  {
    universityId: "memorial",
    school: "Faculty of Education",
    degree: "BEd / Diploma",
    entryType: "Varies",
    officialUrl: "https://www.mun.ca/undergrad/programs/",
    programs: [
      { name: "Education - Primary/Elementary First Degree Memorial", degree: "BEd", entryType: "Direct entry" },
      { name: "Education - Post-secondary First Degree Memorial", degree: "BEd", entryType: "Direct entry" },
      { name: "Education - Primary/Elementary Second Degree Memorial", degree: "BEd", entryType: "Second entry" },
      { name: "Education - Primary/Elementary French Second Degree Memorial", degree: "BEd", entryType: "Second entry" },
      { name: "Education - Intermediate/Secondary Memorial", degree: "BEd", entryType: "Second entry" },
      { name: "Education - Intermediate/Secondary with Technology Education Memorial", degree: "BEd", entryType: "Second entry" },
      { name: "Education - Post-secondary Second Degree Memorial", degree: "BEd", entryType: "Second entry" },
      { name: "Music Education - Memorial", degree: "BMusEd", entryType: "Second entry" },
      { name: "Adult Learning and Post-secondary Education - Memorial", degree: "Diploma", entryType: "Varies" }
    ],
  },
  {
    universityId: "memorial",
    school: "School of Social Work",
    degree: "BSW",
    entryType: "Varies",
    officialUrl: "https://www.mun.ca/undergrad/programs/",
    programs: ["Social Work - First Degree Memorial", "Social Work - Second Degree Memorial"]
  },
  {
    universityId: "memorial",
    school: "Professional health programs",
    degree: "MD / PharmD",
    entryType: "Second entry",
    officialUrl: "https://www.mun.ca/undergrad/programs/",
    programs: ["Medicine - Memorial", "Pharmacy - Memorial"]
  },

  // Grenfell Campus.
  {
    universityId: "memorial",
    school: "Grenfell Campus",
    degree: "BA / BBA / BES / BFA / BSc / BScN",
    entryType: "Direct entry",
    officialUrl: "https://www.mun.ca/grenfellcampus/programs/undergraduate/",
    programs: [
      "English - Grenfell", "Historical Studies - Grenfell", "Psychology - Arts Grenfell", "Social and Cultural Studies - Grenfell",
      "Business Administration - Grenfell", "Environment and Sustainability - Grenfell", "Theatre - Grenfell", "Visual Arts - Grenfell",
      "Nursing - Grenfell", "Environmental Science - Grenfell", "General Science - Grenfell", "Mathematics - Grenfell",
      "Mathematics and Physics - Grenfell", "Physics - Grenfell", "Psychology - Science Grenfell"
    ],
  },

  // Labrador Campus.
  {
    universityId: "memorial",
    school: "Labrador Campus",
    degree: "Bachelor / Diploma / first-year pathway",
    entryType: "Direct entry",
    officialUrl: "https://www.mun.ca/labradorcampus/programs/",
    programs: ["Arctic and Subarctic Interdisciplinary Studies", "Engineering One - Labrador", "Nursing - Labrador", "Northern Peoples, Lands and Resources - Diploma"]
  },

  // Fisheries and Marine Institute.
  {
    universityId: "memorial",
    school: "Marine Institute",
    degree: "Bachelor / Diploma / Certificate",
    entryType: "Varies",
    officialUrl: "https://www.mi.mun.ca/programsandcourses/programs/",
    programs: [
      "Maritime Studies - Maritime Management", "Maritime Studies - Safety Management",
      "Technology - Engineering Technology and Applied Science", "Technology - Health Science",
      "Marine Engineering Systems Design", "Marine Engineering Technology", "Naval Architecture", "Ocean Mapping",
      "Nautical Science", "Marine Environmental Technology", "Remotely Operated Vehicles", "Marine Diesel Mechanics",
      "Marine Engineering Management", "Aquaculture - Marine Institute", "Food Technology - Marine Institute"
    ],
  },
];

export const atlanticPeiNewfoundlandPrograms = makeProgramGroups(groups);
