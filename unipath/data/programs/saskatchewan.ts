import { makeProgramGroups, type ProgramGroup } from "./schema";

const groups: ProgramGroup[] = [
  {
    universityId: "usask",
    school: "College of Arts and Science",
    degree: "BA / BSc / BFA / BMus",
    entryType: "Varies",
    officialUrl: "https://admissions.usask.ca/programs/",
    programs: [
      "Anthropology - USask", "Archaeology - USask", "Art History - USask",
      "Biochemistry, Microbiology and Immunology", "Biology - USask", "Biomedical Neuroscience",
      "Chemistry - USask", "Classical, Medieval and Renaissance Studies", "Computer Science - USask",
      "Economics - USask", "English - USask", "Environment and Society", "French - USask",
      "Geology - USask", "Geophysics - USask", "History - USask", "Indigenous Studies - USask",
      "International Studies - USask", "Linguistics - USask", "Mathematics - USask", "Modern Languages",
      "Music - USask", "Philosophy - USask", "Physics - USask", "Political Studies",
      "Psychology - BA USask", "Psychology - BSc USask", "Regional and Urban Planning",
      "Sociology - USask", "Statistics - USask", "Studio Art - USask", "Women's and Gender Studies - USask"
    ],
  },
  {
    universityId: "usask",
    school: "Edwards School of Business",
    degree: "BCom",
    entryType: "Direct entry",
    officialUrl: "https://admissions.usask.ca/business.php",
    programs: [
      { id: "usask-business", name: "Bachelor of Commerce" },
      "Accounting - Edwards", "Finance - Edwards", "Human Resources - Edwards", "Management - Edwards",
      "Marketing - Edwards", "Operations Management - Edwards", "Supply Chain Management - Edwards"
    ],
  },
  {
    universityId: "usask",
    school: "College of Agriculture and Bioresources",
    degree: "BSA / BSc / BScAgribusiness",
    entryType: "Direct entry",
    officialUrl: "https://admissions.usask.ca/agriculture.php",
    programs: [
      "Agribusiness", "Agronomy", "Animal Bioscience", "Animal Science", "Applied Plant Ecology",
      "Crop Science", "Environmental Science - USask", "Food and Bioproduct Sciences", "Food Science - USask",
      "Horticulture Science", "Renewable Resource Management", "Soil Science"
    ],
  },
  {
    universityId: "usask",
    school: "College of Engineering",
    degree: "BE",
    entryType: "Varies",
    officialUrl: "https://admissions.usask.ca/engineering.php",
    programs: [
      "Engineering - Common First Year USask", "Chemical Engineering - USask", "Civil Engineering - USask",
      "Computer Engineering - USask", "Electrical Engineering - USask", "Engineering Physics - USask",
      "Environmental Engineering - USask", "Geological Engineering - USask", "Mechanical Engineering - USask"
    ],
  },
  {
    universityId: "usask",
    school: "College of Kinesiology / College of Education",
    degree: "BScKin / BEd",
    entryType: "Varies",
    officialUrl: "https://admissions.usask.ca/programs/",
    programs: ["Kinesiology - USask", "Education - Elementary/Middle Years", "Education - Secondary", "Indigenous Teacher Education"],
  },
  {
    universityId: "usask",
    school: "Professional colleges",
    degree: "Professional degree",
    entryType: "Second entry",
    officialUrl: "https://admissions.usask.ca/programs/",
    programs: ["Nursing - USask", "Juris Doctor - USask", "Dentistry - USask", "Medicine - USask", "Pharmacy - USask", "Veterinary Medicine - USask"],
  },

  {
    universityId: "uregina",
    school: "Faculty of Arts",
    degree: "BA / Diploma / Certificate",
    entryType: "Direct entry",
    officialUrl: "https://www.uregina.ca/academics/programs/",
    programs: [
      "Anthropology - Regina", "Economics - Regina", "English - Regina", "Geography and Environmental Studies",
      "History - Regina", "Indigenous Studies - Regina", "International Studies - Regina", "Justice Studies",
      "Philosophy - Regina", "Police Studies", "Political Science - Regina", "Psychology - Regina",
      "Sociology - Regina", "Women's and Gender Studies - Regina", "Justice Studies - Diploma", "Women's and Gender Studies - Diploma"
    ],
  },
  {
    universityId: "uregina",
    school: "Faculty of Science",
    degree: "BSc",
    entryType: "Direct entry",
    officialUrl: "https://www.uregina.ca/academics/programs/",
    programs: ["Actuarial Science - Regina", "Biochemistry - Regina", "Biology - Regina", "Chemistry - Regina", "Computer Science - Regina", "Data Science - Regina", "Environmental Biology", "Geology - Regina", "Mathematics - Regina", "Physics - Regina", "Statistics - Regina"],
  },
  {
    universityId: "uregina",
    school: "Hill and Levene Schools of Business",
    degree: "BBA / Diploma / Certificate",
    entryType: "Direct entry",
    officialUrl: "https://www.uregina.ca/business/",
    programs: [
      { id: "uregina-business", name: "Business Administration", degree: "BBA" },
      "Accounting - Regina", "Entrepreneurship - Regina", "Finance - Regina", "Human Resource Management - Regina",
      "International Business - Regina", "Marketing - Regina", "Business Administration - Diploma Regina", "Administration - Certificate Regina"
    ],
  },
  {
    universityId: "uregina",
    school: "Faculty of Engineering and Applied Science",
    degree: "BASc",
    entryType: "Direct entry",
    officialUrl: "https://www.uregina.ca/engineering/",
    programs: ["Electronic Systems Engineering", "Energy Systems Engineering", "Environmental Systems Engineering", "Industrial Systems Engineering", "Software Systems Engineering"],
  },
  {
    universityId: "uregina",
    school: "Media, Art, Performance, Kinesiology and Health",
    degree: "Bachelor's degree",
    entryType: "Direct entry",
    officialUrl: "https://www.uregina.ca/academics/programs/",
    programs: ["Creative Technologies", "Film Production", "Film Studies", "Music - Regina", "Theatre - Regina", "Visual Arts - Regina", "Health Studies", "Kinesiology - Regina", "Sport and Recreation Management", "Therapeutic Recreation - Regina"],
  },
  {
    universityId: "uregina",
    school: "Faculty of Education",
    degree: "BEd",
    entryType: "Direct entry",
    officialUrl: "https://www.uregina.ca/education/",
    programs: ["Elementary Education - Regina", "Middle Years Education - Regina", "Secondary Education - Regina", "Arts Education - Regina", "Indigenous Education - Regina", "Music Education - Regina", "Physical Education - Regina"],
  },
  {
    universityId: "uregina",
    school: "Faculty of Nursing / Faculty of Social Work",
    degree: "BScN / BSW",
    entryType: "Direct entry",
    officialUrl: "https://www.uregina.ca/academics/programs/",
    programs: ["Saskatchewan Collaborative Bachelor of Science in Nursing", "Social Work - Regina"],
  },
  {
    universityId: "uregina",
    school: "Pre-professional studies",
    degree: "Pre-professional pathway",
    entryType: "Direct entry",
    officialUrl: "https://www.uregina.ca/academics/programs/",
    programs: ["Pre-Dentistry", "Pre-Law", "Pre-Medicine", "Pre-Nutrition", "Pre-Pharmacy", "Pre-Veterinary Medicine"],
  },

  {
    universityId: "saskpoly",
    school: "School of Business and Entrepreneurship",
    degree: "Diploma / Certificate",
    entryType: "Direct entry",
    officialUrl: "https://saskpolytech.ca/programs-and-courses/browse-programs/a-z-listing.aspx",
    programs: ["Business - Certificate Sask Polytech", "Business - Diploma Accountancy", "Business - Diploma Financial Services", "Business - Diploma Human Resources", "Business - Diploma Management", "Business - Diploma Municipal Administration", "Business - Diploma Sport Management", "Business and Insurance", "Office Administration"],
  },
  {
    universityId: "saskpoly",
    school: "School of Information and Communications Technology",
    degree: "Diploma / Certificate",
    entryType: "Direct entry",
    officialUrl: "https://saskpolytech.ca/programs-and-courses/browse-programs/a-z-listing.aspx",
    programs: ["Computer Automated Systems Technician", "Computer Engineering Technology", "Computer Networking Technician", "Computer Systems Technology", "Cyber Security", "Interactive Design and Technology", "Library and Information Technology", "Software Developer"],
  },
  {
    universityId: "saskpoly",
    school: "Engineering, Energy and Natural Resources",
    degree: "Diploma / Certificate",
    entryType: "Direct entry",
    officialUrl: "https://saskpolytech.ca/programs-and-courses/browse-programs/a-z-listing.aspx",
    programs: ["Architectural Technologies", "BioScience Technology", "Civil Engineering Technology", "Design and Manufacturing Engineering Technology", "Electrical Engineering Technology", "Electronic Systems Engineering Technology", "Engineering Design and Drafting Technology", "Environmental Engineering Technology", "Geographic Information Science", "Instrumentation Engineering Technology", "Mining Engineering Technology", "Power Engineering Technology", "Resource and Environmental Law", "Water and Wastewater Technician"],
  },
  {
    universityId: "saskpoly",
    school: "School of Health Sciences / School of Nursing",
    degree: "Bachelor / Diploma / Certificate",
    entryType: "Direct entry",
    officialUrl: "https://saskpolytech.ca/programs-and-courses/browse-programs/a-z-listing.aspx",
    programs: ["Saskatchewan Collaborative Bachelor of Science in Nursing - Sask Polytech", "Continuing Care Assistant", "Cytotechnology", "Dental Assisting", "Dental Hygiene", "Health Information Management", "Medical Laboratory Assistant", "Medical Laboratory Technology", "Medical Radiologic Technology", "Mental Health and Addictions Counselling", "Occupational Health and Safety", "Paramedic", "Pharmacy Technician", "Practical Nursing", "Psychiatric Nursing", "Therapeutic Recreation - Sask Polytech"],
  },
  {
    universityId: "saskpoly",
    school: "Human Services, Hospitality and Trades",
    degree: "Diploma / Certificate",
    entryType: "Direct entry",
    officialUrl: "https://saskpolytech.ca/programs-and-courses/browse-programs/a-z-listing.aspx",
    programs: ["Corrections", "Disability Support Worker", "Early Childhood Education - Sask Polytech", "Funeral Service Education", "Recreation and Community Development", "Culinary Arts - Sask Polytech", "Food and Nutrition Management", "Hotel and Restaurant Management", "Agricultural Equipment Technician", "Applied Industrial Mechanics", "Automotive Service Technician", "Carpentry - Sask Polytech", "Electrician - Sask Polytech", "Heavy Equipment and Truck and Transport Technician", "Machinist - Sask Polytech", "Parts Management Technician", "Plumbing and Pipefitting", "Refrigeration and Air Conditioning", "Welding - Sask Polytech"],
  },
];

export const saskatchewanPrograms = makeProgramGroups(groups);
