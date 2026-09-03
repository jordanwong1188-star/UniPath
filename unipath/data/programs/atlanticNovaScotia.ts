import { makeProgramGroups, type ProgramGroup } from "./schema";

const groups: ProgramGroup[] = [
  // Dalhousie University — direct degree choices and later majors/options.
  {
    universityId: "dalhousie",
    school: "Faculty of Arts and Social Sciences",
    degree: "BA",
    entryType: "Direct entry",
    officialUrl: "https://www.dal.ca/study/programs/undergraduate/arts-ba.html",
    programs: ["Bachelor of Arts - Dalhousie"],
  },
  {
    universityId: "dalhousie",
    school: "Faculty of Arts and Social Sciences",
    degree: "BA",
    entryType: "Choose after first year",
    officialUrl: "https://www.dal.ca/faculty/arts/programs/study-areas-chart.html",
    programs: [
      "Black and African Diaspora Studies", "Cinema and Media Studies - Dalhousie", "Classics - Dalhousie",
      "Creative Writing - Dalhousie", "Early Modern Studies", "Economics - Arts Dalhousie", "English - Dalhousie",
      "European Studies - Dalhousie", "French - Dalhousie", "Gender and Women's Studies - Dalhousie",
      "German - Dalhousie", "History - Dalhousie", "International Development Studies - Dalhousie",
      "Law, Justice and Society", "Music - BA Dalhousie", "Philosophy - Dalhousie", "Political Science - Dalhousie",
      "Religious Studies - Dalhousie", "Russian Studies - Dalhousie", "Sociology and Social Anthropology",
      "Spanish and Latin American Studies - Dalhousie", "Theatre - Acting Dalhousie", "Theatre - Costume Studies Dalhousie",
      "Theatre - Technical Theatre Dalhousie", "Theatre Studies - Dalhousie"
    ],
  },
  {
    universityId: "dalhousie",
    school: "Faculty of Science",
    degree: "BSc",
    entryType: "Direct entry",
    officialUrl: "https://www.dal.ca/study/programs/undergraduate/science-bsc.html",
    programs: ["Bachelor of Science - Dalhousie", "Medical Sciences - Dalhousie"],
  },
  {
    universityId: "dalhousie",
    school: "Faculty of Science",
    degree: "BSc / BA",
    entryType: "Choose after first year",
    officialUrl: "https://www.dal.ca/study/programs/undergraduate/science-bsc.html",
    programs: [
      "Actuarial Science - Dalhousie", "Biochemistry and Molecular Biology - Dalhousie", "Biology - Dalhousie",
      "Chemistry - Dalhousie", "Earth Sciences - Dalhousie", "Economics - Science Dalhousie",
      "Environmental Sciences - Dalhousie", "Marine Biology - Dalhousie", "Mathematics - Dalhousie",
      "Microbiology and Immunology - Dalhousie", "Neuroscience - Dalhousie", "Ocean Sciences - Dalhousie",
      "Physics and Atmospheric Science - Dalhousie", "Psychology - Dalhousie"
    ],
  },
  {
    universityId: "dalhousie",
    school: "Faculty of Computer Science",
    degree: "BCS / BACS",
    entryType: "Direct entry",
    officialUrl: "https://www.dal.ca/study/programs/undergraduate/computer-science-bcs.html",
    programs: ["Computer Science - Dalhousie", "Applied Computer Science - Dalhousie"],
  },
  {
    universityId: "dalhousie",
    school: "Faculty of Management",
    degree: "BComm / BMgmt",
    entryType: "Direct entry",
    officialUrl: "https://www.dal.ca/study/programs/undergraduate/commerce-bcomm.html",
    programs: [
      "Commerce - Dalhousie", "Management - Dalhousie"
    ],
  },
  {
    universityId: "dalhousie",
    school: "Faculty of Management",
    degree: "BComm / BMgmt",
    entryType: "Choose after first year",
    officialUrl: "https://www.dal.ca/study/programs/undergraduate/commerce-bcomm.html",
    programs: [
      "Accounting - Dalhousie Commerce", "Entrepreneurship - Dalhousie Commerce", "Finance - Dalhousie Commerce",
      "International Business - Dalhousie Commerce", "Managing People and Organizations - Dalhousie Commerce",
      "Marketing - Dalhousie Commerce", "Supply Chain and Logistics Management - Dalhousie Commerce",
      "Entrepreneurship and Innovation - Dalhousie Management", "Leadership and Organization - Dalhousie Management",
      "Managing Data and Information - Dalhousie Management", "Public Sector Management - Dalhousie Management"
    ],
  },
  {
    universityId: "dalhousie",
    school: "Faculty of Engineering",
    degree: "BEng",
    entryType: "Direct entry",
    officialUrl: "https://www.dal.ca/study/programs/undergraduate/engineering-beng.html",
    programs: ["Engineering - Dalhousie"],
  },
  {
    universityId: "dalhousie",
    school: "Faculty of Engineering",
    degree: "BEng",
    entryType: "Choose after first year",
    officialUrl: "https://www.dal.ca/study/programs/undergraduate/engineering-beng.html",
    programs: [
      "Chemical Engineering - Dalhousie", "Civil Engineering - Dalhousie", "Computer Engineering - Dalhousie",
      "Electrical Engineering - Dalhousie", "Environmental Engineering - Dalhousie", "Industrial Engineering - Dalhousie",
      "Mechanical Engineering - Dalhousie"
    ],
  },
  {
    universityId: "dalhousie",
    school: "Faculty of Agriculture",
    degree: "Bachelor / Diploma",
    entryType: "Varies",
    officialUrl: "https://www.dal.ca/study/faculties/agriculture/programs/undergraduate-programs.html",
    programs: [
      "Agriculture - Dalhousie", "Agricultural Business - Dalhousie", "Agricultural Economics - Dalhousie",
      "Animal Science - Dalhousie", "Aquaculture - Dalhousie", "Bioveterinary Science - Dalhousie",
      "Environmental Sciences - Agriculture Dalhousie", "International Food Business - Dalhousie", "Plant Science - Dalhousie",
      "Landscape Architecture - Dalhousie", "Diploma in Engineering - Dalhousie Truro", "Business Management - Agriculture Diploma",
      "Landscape Horticulture - Diploma", "Plant Science - Diploma Dalhousie", "Veterinary Technology - Diploma Dalhousie"
    ],
  },
  {
    universityId: "dalhousie",
    school: "Faculty of Health",
    degree: "Bachelor's degree",
    entryType: "Direct entry",
    officialUrl: "https://www.dal.ca/study/faculties/health/programs/undergraduate-programs.html",
    programs: [
      "Health Promotion - Dalhousie", "Kinesiology - Dalhousie", "Recreation - Dalhousie", "Therapeutic Recreation - Dalhousie",
      "Diagnostic Medical Ultrasound Technology", "Nuclear Medicine Technology - Dalhousie", "Radiological Technology - Dalhousie",
      "Respiratory Therapy - Dalhousie", "Nursing - Halifax Dalhousie", "Nursing - Yarmouth Dalhousie"
    ],
  },
  {
    universityId: "dalhousie",
    school: "Faculty of Architecture and Planning",
    degree: "BCD / BEDS",
    entryType: "Varies",
    officialUrl: "https://www.dal.ca/study/faculties/architecture-planning-school.html",
    programs: [
      { name: "Community Design", degree: "BCD", entryType: "Direct entry" },
      { name: "Environmental Design Studies / Architecture", degree: "BEDS", entryType: "Second entry" }
    ],
  },
  {
    universityId: "dalhousie",
    school: "Professional programs",
    degree: "Professional undergraduate degree",
    entryType: "Second entry",
    officialUrl: "https://www.dal.ca/study/programs.html",
    programs: ["Dentistry - Dalhousie", "Dental Hygiene - Dalhousie", "Law - Dalhousie", "Medicine - Dalhousie", "Pharmacy - Dalhousie", "Social Work - Dalhousie"],
  },

  // Saint Mary's University — current Arts, Commerce, Science, Environmental Studies and Engineering offerings.
  {
    universityId: "smu",
    school: "Faculty of Arts",
    degree: "BA",
    entryType: "Direct entry",
    officialUrl: "https://www.smu.ca/future-students/ba-programs/",
    programs: [
      "Ancient Studies - SMU", "Anthropology - SMU", "Asian Studies - SMU", "Atlantic Canada Studies - SMU",
      "Criminology - SMU", "Economics - SMU", "English - SMU", "Entrepreneurship - Arts SMU",
      "Environmental Studies - Arts SMU", "French - SMU", "Geography - Arts SMU", "Global Development Studies - SMU",
      "Health, Wellness and Sport in Society", "History - SMU", "Intercultural Studies - SMU", "Irish Studies - SMU",
      "Law and Ethics - SMU", "Linguistics - SMU", "Mathematics - Arts SMU", "Philosophy - SMU",
      "Political Science - SMU", "Psychology - Arts SMU", "Public Humanities and Heritage", "Social Justice and Community Studies",
      "Sociology - SMU", "Spanish and Latin American Studies - SMU", "Study of Religion - SMU", "Women, Gender and Sexuality Studies - SMU"
    ],
  },
  {
    universityId: "smu",
    school: "Sobey School of Business",
    degree: "BComm",
    entryType: "Direct entry",
    officialUrl: "https://www.smu.ca/future-students/bcomm-programs/",
    programs: [
      "Accounting - Sobey", "Economics - Sobey", "Entrepreneurship - Sobey", "Finance - Sobey", "General Business Studies - Sobey",
      "Global Business Management - Sobey", "Human Resource Management - Sobey", "Management - Sobey",
      "Management Information Systems and Analytics - Sobey", "Marketing - Sobey", "Sports Business - Sobey", "Sustainability Management - Sobey"
    ],
  },
  {
    universityId: "smu",
    school: "Faculty of Science",
    degree: "BSc",
    entryType: "Direct entry",
    officialUrl: "https://www.smu.ca/future-students/bsc-programs/",
    programs: [
      "Astrophysics - SMU", "Biology - SMU", "Chemistry - SMU", "Computing Science - SMU",
      "Computing Science and Business Administration - SMU", "Earth Science / Geology - SMU", "Engineering - SMU",
      "Environmental Science - SMU", "Geography - Science SMU", "Mathematics - Science SMU", "Physics - SMU",
      "Psychology - Science SMU", "Pre-Health Sciences Pathway - SMU"
    ],
  },
  {
    universityId: "smu",
    school: "School of the Environment",
    degree: "BES",
    entryType: "Direct entry",
    officialUrl: "https://www.smu.ca/future-students/environmental-and-sustainability-programs/",
    programs: ["Environmental Studies - SMU"],
  },
  {
    universityId: "smu",
    school: "Engineering pathway",
    degree: "Diploma in Engineering",
    entryType: "Direct entry",
    officialUrl: "https://www.smu.ca/future-students/bsc-programs/",
    programs: ["Engineering Diploma - Saint Mary's"],
  },

  // St. Francis Xavier University — current Arts, Science, Business, Nursing and Engineering paths.
  {
    universityId: "stfx",
    school: "Faculty of Arts",
    degree: "BA / BASc",
    entryType: "Varies",
    officialUrl: "https://www.stfx.ca/programs-courses/arts",
    programs: [
      "Bachelor of Arts - StFX", "Anthropology - StFX", "Catholic Studies - StFX", "Celtic Studies - StFX",
      "Classical Studies - StFX", "Climate and Environment - StFX", "Development Studies - StFX", "Economics - StFX",
      "English - StFX", "French - StFX", "History - StFX", "Human Kinetics - BA StFX", "Humanities Colloquium",
      "Mi'kmaq Studies", "Music - StFX", "Philosophy - StFX", "Political Science - StFX", "Psychology - BA StFX",
      "Public Policy and Governance - StFX", "Religious Studies - StFX", "Sociology - StFX", "Women's and Gender Studies - StFX",
      "Bachelor of Arts and Science in Health - StFX"
    ],
  },
  {
    universityId: "stfx",
    school: "Faculty of Science",
    degree: "BSc / BASc",
    entryType: "Varies",
    officialUrl: "https://www.stfx.ca/programs-courses/science",
    programs: [
      "Actuarial Science - StFX", "Applied Forensic Psychology", "Aquatic Resources - StFX", "Biochemistry - StFX",
      "Biology - StFX", "Chemistry - StFX", "Climate and Environment - Science StFX", "Computer Science - StFX",
      "Data Science - StFX", "Earth and Environmental Sciences - StFX", "Health - StFX", "Human Kinetics - BSc StFX",
      "Human Nutrition - StFX", "Mathematics and Statistics - StFX", "Physics - StFX", "Psychology - BSc StFX"
    ],
  },
  {
    universityId: "stfx",
    school: "Gerald Schwartz School of Business",
    degree: "BBA",
    entryType: "Direct entry",
    officialUrl: "https://www.stfx.ca/business/programs/undergraduate-bba",
    programs: [
      "Business Administration - StFX", "Accounting - StFX", "Entrepreneurship - StFX", "Enterprise Systems - StFX",
      "Finance - StFX", "International Business - StFX", "Management and Leadership - StFX", "Marketing - StFX"
    ],
  },
  {
    universityId: "stfx",
    school: "Elizabeth and Thomas Rankin School of Nursing",
    degree: "BScN",
    entryType: "Varies",
    officialUrl: "https://www.stfx.ca/programs-courses/programs/nursing",
    programs: ["Nursing - StFX", "Accelerated Nursing - StFX"],
  },
  {
    universityId: "stfx",
    school: "Engineering Department",
    degree: "Diploma / BSc combination",
    entryType: "Direct entry",
    officialUrl: "https://www.stfx.ca/programs-courses/programs/engineering",
    programs: ["Diploma in Engineering - StFX", "Engineering Diploma with Bachelor of Science - 3 year", "Engineering Diploma with Bachelor of Science Major - 4 year"],
  },
  {
    universityId: "stfx",
    school: "Faculty of Education",
    degree: "BEd",
    entryType: "Second entry",
    officialUrl: "https://www.stfx.ca/education/education-programs",
    programs: ["Bachelor of Education - StFX"],
  },
];

export const atlanticNovaScotiaPrograms = makeProgramGroups(groups);
