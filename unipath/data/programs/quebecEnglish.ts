import { makeProgramGroups, type ProgramGroup } from "./schema";

const groups: ProgramGroup[] = [
  // McGill — application-level faculties/program groups plus the major programs students choose within them.
  {
    universityId: "mcgill",
    school: "Faculty of Arts",
    degree: "BA",
    entryType: "Direct entry",
    officialUrl: "https://www.mcgill.ca/undergraduate-admissions/programs",
    programs: ["Bachelor of Arts - McGill", "Population and Global Health"],
  },
  {
    universityId: "mcgill",
    school: "Faculty of Arts",
    degree: "BA",
    entryType: "Choose after first year",
    officialUrl: "https://www.mcgill.ca/arts/undergraduate/programs",
    programs: [
      "African Studies - McGill", "Anthropology - McGill", "Art History - McGill", "Canadian Studies - McGill",
      "Classics - McGill", "Computer Science - Arts McGill", "Economics - McGill", "English - Cultural Studies McGill",
      "English - Drama and Theatre McGill", "English - Literature McGill", "East Asian Studies - McGill",
      "Environment - Arts McGill", "French Language and Literature - McGill", "German Studies - McGill",
      "Hispanic Studies - McGill", "History - McGill", "International Development Studies - McGill",
      "Italian Studies - McGill", "Jewish Studies - McGill", "Latin American and Caribbean Studies - McGill",
      "Linguistics - McGill", "Mathematics - Arts McGill", "Music - Arts McGill", "Philosophy - McGill",
      "Political Science - McGill", "Psychology - Arts McGill", "Religious Studies - McGill", "Russian Studies - McGill",
      "Sociology - McGill", "Statistics - Arts McGill", "World Islamic and Middle East Studies - McGill"
    ],
  },
  {
    universityId: "mcgill",
    school: "Faculty of Arts and Faculty of Science",
    degree: "BA&Sc",
    entryType: "Direct entry",
    officialUrl: "https://www.mcgill.ca/basc/",
    programs: ["Bachelor of Arts and Science"],
  },
  {
    universityId: "mcgill",
    school: "Faculty of Arts and Faculty of Science",
    degree: "BA&Sc",
    entryType: "Choose after first year",
    officialUrl: "https://www.mcgill.ca/basc/",
    programs: ["Cognitive Science - BA&Sc", "Environment - BA&Sc", "Sustainability, Science and Society"],
  },
  {
    universityId: "mcgill",
    school: "Faculty of Science",
    degree: "BSc",
    entryType: "Direct entry",
    officialUrl: "https://www.mcgill.ca/science/undergraduate/programs",
    programs: [
      "Biological, Biomedical and Life Sciences Group",
      "Bio-Physical-Computational Sciences Group",
      "Physical, Earth, Math and Computer Sciences Group"
    ],
  },
  {
    universityId: "mcgill",
    school: "Faculty of Science",
    degree: "BSc",
    entryType: "Choose after first year",
    officialUrl: "https://www.mcgill.ca/science/undergraduate/programs",
    programs: [
      "Anatomy and Cell Biology", "Atmospheric Science", "Biochemistry - McGill", "Biology - McGill",
      "Biology and Mathematics - McGill", "Chemistry - McGill", "Computer Science - Science McGill",
      "Computer Science and Biology - McGill", "Computer Science and Mathematics - McGill",
      "Earth and Planetary Sciences", "Earth System Science", "Environment - Science McGill",
      "Geology - McGill", "Mathematics - Science McGill", "Mathematics and Computer Science - McGill",
      "Microbiology and Immunology - McGill", "Neuroscience - McGill", "Pharmacology - McGill",
      "Physics - McGill", "Physics and Chemistry - McGill", "Physics and Computer Science - McGill",
      "Physiology - McGill", "Physiology and Mathematics - McGill", "Physiology and Physics - McGill",
      "Psychology - Science McGill", "Software Engineering - Science McGill", "Statistics - Science McGill",
      "Statistics and Computer Science - McGill"
    ],
  },
  {
    universityId: "mcgill",
    school: "Desautels Faculty of Management",
    degree: "BCom",
    entryType: "Direct entry",
    officialUrl: "https://www.mcgill.ca/desautels/programs/bcom",
    programs: [
      { id: "mcgill-commerce", name: "Bachelor of Commerce" },
      "Accounting - Desautels", "Business Analytics - Desautels", "Economics - Desautels",
      "Entrepreneurship - Desautels", "Finance - Desautels", "International Management - Desautels",
      "Labour-Management Relations - Desautels", "Managing for Sustainability - Desautels",
      "Marketing - Desautels", "Mathematics - Desautels", "Operations Management - Desautels",
      "Organizational Behaviour - Desautels", "Retail Management - Desautels", "Statistics - Desautels",
      "Strategic Management - Desautels"
    ],
  },
  {
    universityId: "mcgill",
    school: "Faculty of Engineering",
    degree: "BEng / BSc(Arch)",
    entryType: "Direct entry",
    officialUrl: "https://www.mcgill.ca/engineering/undergraduate/programs",
    programs: [
      "Architecture - McGill", "Bioengineering - McGill", "Chemical Engineering - McGill",
      "Civil Engineering - McGill", "Computer Engineering - McGill", "Electrical Engineering - McGill",
      "Global Engineering", "Materials Engineering - McGill", "Mechanical Engineering - McGill",
      "Mining Engineering - McGill", "Software Engineering - Engineering McGill"
    ],
  },
  {
    universityId: "mcgill",
    school: "Faculty of Agricultural and Environmental Sciences",
    degree: "BSc(AgrEnvSc) / BEng / BSc(FSc) / BSc(NutrSc)",
    entryType: "Direct entry",
    officialUrl: "https://www.mcgill.ca/macdonald/prospective/degrees",
    programs: [
      "Agro-Environmental Sciences", "Ecological Agriculture", "Environment - Macdonald Campus",
      "Global Food Security", "Life Sciences - Macdonald Campus", "Professional Agrology",
      "Bioresource Engineering", "Food Science - McGill", "Food Science and Nutritional Science",
      "Dietetics - McGill", "Human Nutrition - McGill"
    ],
  },
  {
    universityId: "mcgill",
    school: "Faculty of Education",
    degree: "BA(Education) / BEd / BSc(Kinesiology)",
    entryType: "Direct entry",
    officialUrl: "https://www.mcgill.ca/education/programs/bachelors-minors",
    programs: [
      "Education in Global Contexts", "Kindergarten and Elementary Education", "Kindergarten and Elementary Education - First Nations and Inuit Studies",
      "Kindergarten and Elementary Jewish Studies", "Kindergarten and Elementary Pédagogie de l'Immersion Française",
      "Physical and Health Education", "Secondary English Education", "Secondary Mathematics Education",
      "Secondary Science and Technology Education", "Secondary Social Sciences Education",
      "Teaching English as a Second Language", "Kinesiology - McGill"
    ],
  },
  {
    universityId: "mcgill",
    school: "Schulich School of Music",
    degree: "BMus",
    entryType: "Direct entry",
    officialUrl: "https://www.mcgill.ca/music/programs/bmus",
    programs: [
      "Music Composition - McGill", "Jazz Performance - McGill", "Music Performance - Orchestral Instruments",
      "Music Performance - Organ and Guitar", "Music Performance - Piano", "Music Performance - Voice",
      "Music History and Literature - McGill", "Music Theory - McGill", "Music Education - McGill"
    ],
  },
  {
    universityId: "mcgill",
    school: "Ingram School of Nursing",
    degree: "BSc(N)",
    entryType: "Direct entry",
    officialUrl: "https://www.mcgill.ca/nursing/programs/bscn",
    programs: ["Nursing - McGill"],
  },
  {
    universityId: "mcgill",
    school: "Professional health and law programs",
    degree: "Professional undergraduate degree",
    entryType: "Second entry",
    officialUrl: "https://www.mcgill.ca/undergraduate-admissions/programs",
    programs: [
      "Dentistry - McGill", "Law - McGill", "Medicine - McGill", "Occupational Therapy - McGill",
      "Physical Therapy - McGill", "Pharmacy - McGill"
    ],
  },
  {
    universityId: "mcgill",
    school: "School of Religious Studies",
    degree: "BTh",
    entryType: "Varies",
    officialUrl: "https://www.mcgill.ca/religiousstudies/undergraduate",
    programs: ["Theology - McGill"],
  },

  // Concordia — current 2026-27 undergraduate calendar/program finder.
  {
    universityId: "concordia",
    school: "John Molson School of Business",
    degree: "BComm / BAdmin",
    entryType: "Direct entry",
    officialUrl: "https://www.concordia.ca/academics/undergraduate.html",
    programs: [
      { id: "concordia-business", name: "Business Administration", degree: "BAdmin" },
      "Accountancy - Concordia", "Business Technology Management - Concordia", "Finance - Concordia",
      "Human Resource Management - Concordia", "International Business - Concordia", "Management - Concordia",
      "Marketing - Concordia", "Supply Chain Operations Management - Concordia"
    ],
  },
  {
    universityId: "concordia",
    school: "Gina Cody School of Engineering and Computer Science",
    degree: "BEng / BCompSc",
    entryType: "Direct entry",
    officialUrl: "https://www.concordia.ca/academics/undergraduate.html",
    programs: [
      "Aerospace Engineering - Concordia", "Building Engineering", "Civil Engineering - Concordia",
      "Computer Engineering - Concordia", "Electrical Engineering - Concordia", "Industrial Engineering - Concordia",
      "Mechanical Engineering - Concordia", "Software Engineering - Concordia", "Computer Science - Concordia",
      "Computer Science and Computation Arts", "Data Science - Concordia"
    ],
  },
  {
    universityId: "concordia",
    school: "Faculty of Arts and Science",
    degree: "BA / BSc / BEd",
    entryType: "Direct entry",
    officialUrl: "https://www.concordia.ca/academics/undergraduate.html",
    programs: [
      "Actuarial Mathematics - Concordia", "Anthropology - Concordia", "Applied Mathematics - Concordia",
      "Behavioural Neuroscience - Concordia", "Biochemistry - Concordia", "Biology - Concordia",
      "Cell and Molecular Biology - Concordia", "Chemistry - Concordia", "Communication and Cultural Studies",
      "Community, Public Affairs and Policy Studies", "Early Childhood and Elementary Education - Concordia",
      "Economics - Concordia", "English and Creative Writing - Concordia", "English Literature - Concordia",
      "Environmental and Sustainability Science", "Environmental Geography - Concordia", "Environmental Science - Concordia",
      "Études françaises - Concordia", "Geography - Concordia", "History - Concordia", "Human Environment",
      "Human Relations", "Interdisciplinary Studies in Sexuality", "Journalism - Concordia", "Linguistics - Concordia",
      "Mathematics and Statistics - Concordia", "Philosophy - Concordia", "Political Science - Concordia",
      "Psychology - Concordia", "Pure and Applied Mathematics - Concordia", "Sociology - Concordia",
      "Teaching English as a Second Language - Concordia", "Therapeutic Recreation - Concordia",
      "Urban Planning and Urban Studies - Concordia", "Women’s Studies - Concordia"
    ],
  },
  {
    universityId: "concordia",
    school: "Faculty of Fine Arts",
    degree: "BFA",
    entryType: "Direct entry",
    officialUrl: "https://www.concordia.ca/academics/undergraduate.html",
    programs: [
      "Art Education - Concordia", "Art History - Concordia", "Ceramics - Concordia", "Computation Arts - Concordia",
      "Contemporary Dance - Concordia", "Design - Concordia", "Electroacoustic Studies - Concordia",
      "Fibres and Material Practices", "Film Animation - Concordia", "Film Production - Concordia",
      "Film Studies - Concordia", "Intermedia - Concordia", "Jazz Studies - Concordia", "Music - Concordia",
      "Painting and Drawing - Concordia", "Photography - Concordia", "Print Media - Concordia",
      "Sculpture - Concordia", "Studio Art - Concordia", "Theatre - Concordia", "Theatre and Development - Concordia"
    ],
  },
];

export const quebecEnglishPrograms = makeProgramGroups(groups);
