import { makeProgramGroups, type ProgramGroup } from "./schema";

const groups: ProgramGroup[] = [
  // University of New Brunswick — official current Academic Programs Search.
  {
    universityId: "unb",
    school: "Faculty of Arts — Fredericton",
    degree: "BA",
    entryType: "Direct entry",
    officialUrl: "https://www.unb.ca/academics/programs/index.html",
    programs: [
      "Applied Arts - UNB", "Anthropology - UNB Fredericton", "Classical Studies - UNB", "Classics - UNB",
      "Comparative Cultural Studies - UNB", "Creative Writing - UNB", "Criminology and Criminal Justice - UNB",
      "Drama - UNB", "Economic Studies - UNB", "Economics - UNB Fredericton", "English - UNB Fredericton",
      "French - UNB Fredericton", "Gender and Women's Studies - UNB", "History - UNB Fredericton",
      "International Development Studies - UNB", "Law in Society - UNB", "Media Arts and Cultures - UNB",
      "Music - UNB", "Neuroscience - BA UNB", "Philosophy - UNB Fredericton", "Political Science - UNB",
      "Psychology - BA UNB Fredericton", "Sociology - UNB Fredericton"
    ],
  },
  {
    universityId: "unb",
    school: "Faculty of Arts — Saint John",
    degree: "BA",
    entryType: "Direct entry",
    officialUrl: "https://www.unb.ca/academics/programs/index.html",
    programs: [
      "Biology - BA UNB Saint John", "Comparative Literature - UNB", "Criminal Justice Studies - UNB",
      "Economics - UNB Saint John", "English - UNB Saint John", "French - UNB Saint John",
      "Gender Studies - UNB Saint John", "History - UNB Saint John", "Communication Studies - UNB",
      "Linguistics - UNB", "Mathematics - BA UNB Saint John", "Philosophy - UNB Saint John",
      "Politics - UNB Saint John", "Psychology - BA UNB Saint John", "Sociology - UNB Saint John",
      "Statistics - BA UNB Saint John"
    ],
  },
  {
    universityId: "unb",
    school: "Faculty of Management — Fredericton",
    degree: "BBA",
    entryType: "Direct entry",
    officialUrl: "https://www.unb.ca/academics/programs/index.html",
    programs: [
      "Accounting - UNB Fredericton", "Economics - BBA UNB Fredericton", "Economics and Finance - UNB",
      "Entrepreneurship - UNB", "Finance - UNB Fredericton", "Human Resources Management - UNB Fredericton",
      "International Business - UNB", "Logistics - UNB", "Marketing - UNB Fredericton"
    ],
  },
  {
    universityId: "unb",
    school: "Faculty of Business — Saint John",
    degree: "BBA",
    entryType: "Direct entry",
    officialUrl: "https://www.unb.ca/academics/programs/index.html",
    programs: [
      "Accounting - UNB Saint John", "Digital Business Design - UNB", "Economics - BBA UNB Saint John",
      "Finance - UNB Saint John", "French Communication and Culture - UNB", "Human Resources Management - UNB Saint John",
      "Marketing - UNB Saint John"
    ],
  },
  {
    universityId: "unb",
    school: "Faculty of Business — Saint John",
    degree: "Bachelor of Applied Management",
    entryType: "Second entry",
    officialUrl: "https://www.unb.ca/academics/programs/index.html",
    programs: ["Applied Management - Accounting", "Applied Management - General Business", "Applied Management - Hospitality and Tourism"],
  },
  {
    universityId: "unb",
    school: "Computer Science",
    degree: "BCS / BScCS",
    entryType: "Direct entry",
    officialUrl: "https://www.unb.ca/academics/programs/index.html",
    programs: ["Computer Science - UNB Fredericton", "Computer Science - UNB Saint John", "Software Engineering - UNB"],
  },
  {
    universityId: "unb",
    school: "Faculty of Education",
    degree: "BEd / BA-BEd / Certificate / Diploma",
    entryType: "Varies",
    officialUrl: "https://www.unb.ca/academics/programs/index.html",
    programs: [
      "Adult Education - UNB", "Early Childhood Education - UNB", "Education - UNB Fredericton",
      "Arts and Education - UNB Saint John", "Wabanaki Governance - Certificate", "Wabanaki Governance - Diploma"
    ],
  },
  {
    universityId: "unb",
    school: "Faculty of Engineering",
    degree: "BScE",
    entryType: "Direct entry",
    officialUrl: "https://www.unb.ca/academics/programs/index.html",
    programs: [
      "Chemical Engineering - UNB", "Civil Engineering - UNB", "Electrical Engineering - UNB",
      "Environmental Engineering - UNB", "Geological Engineering - UNB", "Geomatics Engineering - UNB",
      "Mechanical Engineering - UNB"
    ],
  },
  {
    universityId: "unb",
    school: "Faculty of Science, Applied Science and Engineering — Saint John",
    degree: "BScE pathway / BTech",
    entryType: "Varies",
    officialUrl: "https://www.unb.ca/academics/programs/index.html",
    programs: [
      "Chemical Engineering - First Two Years UNB Saint John", "Civil Engineering - First Two Years UNB Saint John",
      "Electrical Engineering - First Two Years UNB Saint John", "Geological Engineering - First Year UNB Saint John",
      "Geomatics Engineering - First Year UNB Saint John", "Mechanical Engineering - First Two Years UNB Saint John",
      { name: "Environmental Engineering Technology", degree: "BTech", entryType: "Second entry" },
      { name: "Industrial Engineering Technology", degree: "BTech", entryType: "Second entry" }
    ],
  },
  {
    universityId: "unb",
    school: "Forestry and Environmental Management",
    degree: "BScEM / BScF",
    entryType: "Direct entry",
    officialUrl: "https://www.unb.ca/academics/programs/index.html",
    programs: ["Environmental Management - UNB", "Forestry - UNB"],
  },
  {
    universityId: "unb",
    school: "Health — Saint John",
    degree: "BHealth / BHSc",
    entryType: "Direct entry",
    officialUrl: "https://www.unb.ca/academics/programs/index.html",
    programs: ["Biomedical Sciences and Health - UNB", "Management in Health - UNB", "Society and Health - UNB", "Radiography - UNB", "Respiratory Therapy - UNB"],
  },
  {
    universityId: "unb",
    school: "Faculty of Kinesiology",
    degree: "BScKin / BRSS",
    entryType: "Direct entry",
    officialUrl: "https://www.unb.ca/academics/programs/index.html",
    programs: ["Kinesiology - UNB", "Recreation and Sport Studies - UNB"],
  },
  {
    universityId: "unb",
    school: "Faculty of Science — Fredericton",
    degree: "BSc",
    entryType: "Direct entry",
    officialUrl: "https://www.unb.ca/academics/programs/index.html",
    programs: [
      "Applied Physics - UNB", "Biology - UNB Fredericton", "Biology-Chemistry - UNB",
      "Biology-Psychology - UNB Fredericton", "Biology-Mathematics and Statistics - UNB", "Biology-Physics - UNB",
      "Chemistry - UNB Fredericton", "Chemistry-Physics - UNB", "Earth Sciences - UNB", "Earth Sciences-Physics - UNB",
      "Economics - BSc UNB", "Engineering Physics - BSc UNB", "Environmental Geosciences - UNB",
      "Environmental Sciences - UNB", "General Science - UNB", "Mathematics - BSc UNB", "Mathematics-Physics - UNB",
      "Mathematics/Statistics-Economics - UNB", "Medicinal Chemistry - UNB", "Neuroscience - BSc UNB",
      "Physics - UNB Fredericton", "Psychology - BSc UNB Fredericton"
    ],
  },
  {
    universityId: "unb",
    school: "Science, Applied Science and Engineering — Saint John",
    degree: "BSc",
    entryType: "Direct entry",
    officialUrl: "https://www.unb.ca/academics/programs/index.html",
    programs: [
      "Applied Coastal Ecology - UNB", "Biology - UNB Saint John", "Biology-Psychology - UNB Saint John",
      "Chemistry - UNB Saint John", "Environmental Biology - UNB", "Marine Biology - UNB",
      "Mathematics - BSc UNB Saint John", "Physics - UNB Saint John", "Psychology - BSc UNB Saint John",
      "Statistics - BSc UNB Saint John"
    ],
  },
  {
    universityId: "unb",
    school: "Nursing / Leadership / Medical Laboratory Science",
    degree: "Bachelor's degree",
    entryType: "Varies",
    officialUrl: "https://www.unb.ca/academics/programs/index.html",
    programs: [
      "Nursing - UNB Fredericton", "Nursing - UNB Saint John", "Nursing Accelerated - UNB Moncton",
      "Integrated Studies - UNB", "Leadership Studies - UNB", "Medical Laboratory Science - UNB"
    ],
  },
  {
    universityId: "unb",
    school: "Faculty of Law / Faculty of Arts",
    degree: "JD / BSW",
    entryType: "Second entry",
    officialUrl: "https://www.unb.ca/academics/programs/index.html",
    programs: ["Law - UNB", "Social Work - UNB"],
  },

  // Université de Moncton — 2026-27 first-cycle baccalaureate programs across its three-campus system.
  {
    universityId: "moncton",
    school: "Faculté d'administration",
    degree: "BAA / Baccalauréat appliqué",
    entryType: "Direct entry",
    officialUrl: "https://www.umoncton.ca/repertoire/programmes",
    programs: [
      "Baccalauréat en administration des affaires - général UMoncton", "Baccalauréat en administration des affaires - comptabilité UMoncton",
      "Baccalauréat en administration des affaires - finance UMoncton", "Baccalauréat en administration des affaires - gestion des opérations UMoncton",
      "Baccalauréat en administration des affaires - marketing UMoncton", "Baccalauréat en administration des affaires - systèmes d'information organisationnels",
      "Baccalauréat en administration des affaires multidisciplinaire", "Baccalauréat appliqué en gestion des réseaux de distribution",
      "Baccalauréat appliqué en gestion des services financiers", "Baccalauréat appliqué en marketing",
      "Baccalauréat appliqué en technologie, information et leadership", "Baccalauréat en gestion de l'information"
    ],
  },
  {
    universityId: "moncton",
    school: "Faculté des arts et des sciences sociales",
    degree: "BA / BScS / Baccalauréat",
    entryType: "Direct entry",
    officialUrl: "https://www.umoncton.ca/repertoire/programmes",
    programs: [
      "Baccalauréat ès arts - majeure en anglais", "Baccalauréat ès arts - majeure en environnement et géographie",
      "Baccalauréat ès arts - majeure en études françaises", "Baccalauréat ès arts - majeure en histoire",
      "Baccalauréat ès arts - majeure en information-communication", "Baccalauréat ès arts - spécialisation en psychologie",
      "Baccalauréat ès arts multidisciplinaire", "Baccalauréat ès sciences sociales - majeure en science politique",
      "Baccalauréat ès sciences sociales - majeure en sociologie", "Baccalauréat en art dramatique",
      "Baccalauréat en arts visuels", "Baccalauréat d'études individualisées"
    ],
  },
  {
    universityId: "moncton",
    school: "Faculté des sciences",
    degree: "BSc / Baccalauréat",
    entryType: "Direct entry",
    officialUrl: "https://www.umoncton.ca/repertoire/programmes",
    programs: [
      "Baccalauréat ès sciences - majeure en biologie", "Baccalauréat ès sciences - majeure en chimie",
      "Baccalauréat ès sciences - majeure en informatique", "Baccalauréat ès sciences - majeure en mathématiques",
      "Baccalauréat ès sciences - majeure en physique", "Baccalauréat ès sciences multidisciplinaire",
      "Baccalauréat appliqué en biotechnologies", "Baccalauréat en informatique appliquée",
      "Baccalauréat ès sciences - nutrition avec internat"
    ],
  },
  {
    universityId: "moncton",
    school: "Faculté d'ingénierie",
    degree: "BIng",
    entryType: "Direct entry",
    officialUrl: "https://www.umoncton.ca/umcm-ingenierie/",
    programs: ["Génie civil - UMoncton", "Génie électrique - UMoncton", "Génie mécanique - UMoncton", "Génie de l'environnement - UMoncton"],
  },
  {
    universityId: "moncton",
    school: "Faculté des sciences de l'éducation",
    degree: "BEd / Combined degree",
    entryType: "Direct entry",
    officialUrl: "https://www.umoncton.ca/repertoire/programmes",
    programs: [
      "B.A.-B.Éd. - primaire", "B.A.-B.Éd. - majeure en anglais", "B.A.-B.Éd. - majeure en environnement et géographie",
      "B.A.-B.Éd. - majeure en études françaises", "B.A.-B.Éd. - majeure en histoire", "B.E.P.-B.Éd. - éducation physique",
      "B.Sc.-B.Éd. - biologie", "B.Sc.-B.Éd. - chimie", "B.Sc.-B.Éd. - mathématiques", "B.Sc.-B.Éd. - physique"
    ],
  },
  {
    universityId: "moncton",
    school: "Santé, kinésiologie et travail social",
    degree: "Bachelor's degree",
    entryType: "Varies",
    officialUrl: "https://www.umoncton.ca/repertoire/programmes",
    programs: ["Baccalauréat en science infirmière - UMoncton", "Baccalauréat en sciences de kinésiologie - UMoncton", "Baccalauréat en gestion du loisir, sport et tourisme", "Baccalauréat en travail social - UMoncton"]
  },
  {
    universityId: "moncton",
    school: "Faculté de droit / Faculté des arts",
    degree: "JD / BMus",
    entryType: "Varies",
    officialUrl: "https://www.umoncton.ca/repertoire/programmes",
    programs: ["Juris Doctor - UMoncton", "Baccalauréat en musique - général UMoncton", "Baccalauréat en musique - interprétation UMoncton"]
  },
  {
    universityId: "moncton",
    school: "Campus Edmundston / Shippagan partnerships",
    degree: "Bachelor's degree",
    entryType: "Direct entry",
    officialUrl: "https://www.umoncton.ca/repertoire/programmes",
    programs: ["Baccalauréat en aménagement des forêts", "Baccalauréat appliqué en design d'intérieur"]
  },
];

export const atlanticNewBrunswickPrograms = makeProgramGroups(groups);
