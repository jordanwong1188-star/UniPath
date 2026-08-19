import { makePrograms, type ProgramSeed } from "./schema";

const seeds: ProgramSeed[] = [
  ["mcgill-management","mcgill","Desautels Faculty of Management","Commerce","BCom","3–4 years",["Accounting","Finance","Marketing","Strategy","Analytics","Entrepreneurship"],["Finance","Consulting","Accounting","Marketing","Management","Entrepreneurship"],"https://www.mcgill.ca/desautels/programs/bcom"],
  ["mcgill-engineering","mcgill","Faculty of Engineering","Engineering","BEng","4 years",["Engineering design","Calculus","Physics","Programming","Systems","Technical communication"],["Engineering","Technology","Consulting","Research","Product development","Infrastructure"],"https://www.mcgill.ca/undergraduate-admissions/programs"],

  ["concordia-business","concordia","John Molson School of Business","Commerce","BComm","3–4 years",["Accounting","Finance","Marketing","Management","Business technology","Entrepreneurship"],["Finance","Accounting","Marketing","Management","Consulting","Entrepreneurship"],"https://www.concordia.ca/jmsb/programs/undergraduate.html"],
  ["concordia-engineering","concordia","Gina Cody School of Engineering and Computer Science","Engineering","BEng","4 years",["Engineering design","Calculus","Physics","Programming","Systems","Project work"],["Engineering","Software","Technology","Consulting","Research","Product development"],"https://www.concordia.ca/ginacody/programs/undergraduate.html"],

  ["udem-informatique","udem","Faculté des arts et des sciences","Informatique","Baccalauréat","3 years",["Programmation","Algorithmes","Structures de données","Systèmes","Bases de données","Mathématiques"],["Développement logiciel","Données","IA","Cybersécurité","Technologie","Recherche"],"https://admission.umontreal.ca/programmes-de-1er-cycle/"],
  ["udem-psychologie","udem","Faculté des arts et des sciences","Psychologie","Baccalauréat","3 years",["Psychologie cognitive","Développement","Méthodes de recherche","Statistiques","Neurosciences","Psychologie sociale"],["Recherche","Services sociaux","Ressources humaines","Éducation","Études supérieures","Santé"],"https://admission.umontreal.ca/programmes-de-1er-cycle/"],

  ["laval-business","laval","Faculté des sciences de l'administration","Administration des affaires","BAA","3 years",["Comptabilité","Finance","Marketing","Gestion","Entrepreneuriat","Opérations"],["Finance","Comptabilité","Marketing","Gestion","Conseil","Entrepreneuriat"],"https://www.fsa.ulaval.ca/formation/baccalaureat-en-administration-des-affaires/"],
  ["laval-engineering","laval","Faculté des sciences et de génie","Génie","Baccalauréat","4 years",["Mathématiques","Physique","Conception","Programmation","Systèmes","Projets"],["Ingénierie","Technologie","Conseil","Recherche","Infrastructure","Développement de produits"],"https://www.ulaval.ca/etudes/programmes"],

  ["usherbrooke-business","usherbrooke","École de gestion","Administration des affaires","BAA","3 years",["Comptabilité","Finance","Marketing","Gestion","Entrepreneuriat","Analytique"],["Finance","Comptabilité","Marketing","Gestion","Conseil","Entrepreneuriat"],"https://www.usherbrooke.ca/admission/programme/ba/"],
  ["usherbrooke-engineering","usherbrooke","Faculté de génie","Génie","Baccalauréat","4 years",["Mathématiques","Physique","Conception","Programmation","Systèmes","Projets"],["Ingénierie","Technologie","Conseil","Recherche","Industrie","Développement de produits"],"https://www.usherbrooke.ca/admission/programmes-etudes/baccalaureats"],

  ["uqam-business","uqam","École des sciences de la gestion","Administration des affaires","BAA","3 years",["Comptabilité","Finance","Marketing","Gestion","Entrepreneuriat","Analytique"],["Finance","Comptabilité","Marketing","Gestion","Conseil","Entrepreneuriat"],"https://etudier.uqam.ca/programme?code=7111"],
  ["uqam-informatique","uqam","Faculté des sciences","Informatique","Baccalauréat","3 years",["Programmation","Algorithmes","Bases de données","Systèmes","Logiciel","Mathématiques"],["Développement logiciel","Données","IA","Cybersécurité","Technologie","Recherche"],"https://etudier.uqam.ca/programmes"],

  ["dalhousie-commerce","dalhousie","Faculty of Management","Commerce","BComm","4 years",["Accounting","Finance","Marketing","Management","Economics","Strategy"],["Finance","Accounting","Marketing","Consulting","Management","Entrepreneurship"],"https://www.dal.ca/study/programs/undergraduate/commerce-bcomm.html"],
  ["dalhousie-engineering","dalhousie","Faculty of Engineering","Engineering","BEng","4–5 years",["Engineering design","Calculus","Physics","Programming","Systems","Project work"],["Engineering","Technology","Consulting","Research","Infrastructure","Product development"],"https://www.dal.ca/study/programs.html"],

  ["smu-business","smu","Sobey School of Business","Commerce","BComm","4 years",["Accounting","Finance","Marketing","Management","Economics","Entrepreneurship"],["Finance","Accounting","Marketing","Management","Consulting","Entrepreneurship"],"https://www.smu.ca/academics/sobey/undergraduate-programs.html"],
  ["smu-science","smu","Faculty of Science","Science","BSc","4 years",["Biology","Chemistry","Computer science","Mathematics","Physics","Environmental science"],["Research","Technology","Data","Laboratory work","Environment","Graduate study"],"https://www.smu.ca/academics/undergraduate-programs.html"],

  ["stfx-business","stfx","Gerald Schwartz School of Business","Business Administration","BBA","4 years",["Accounting","Finance","Marketing","Management","Entrepreneurship","Business analytics"],["Finance","Accounting","Marketing","Management","Consulting","Entrepreneurship"],"https://www.stfx.ca/programs"],
  ["stfx-science","stfx","Faculty of Science","Science","BSc","4 years",["Biology","Chemistry","Computer science","Mathematics","Physics","Earth sciences"],["Research","Technology","Data","Laboratory work","Environment","Graduate study"],"https://www.stfx.ca/programs"],

  ["unb-business","unb","Faculty of Management / Faculty of Business","Business Administration","BBA","4 years",["Accounting","Finance","Marketing","Management","Economics","Entrepreneurship"],["Finance","Accounting","Marketing","Management","Consulting","Entrepreneurship"],"https://www.unb.ca/academics/programs/"],
  ["unb-engineering","unb","Faculty of Engineering","Engineering","BScE","4–5 years",["Engineering design","Calculus","Physics","Programming","Systems","Technical communication"],["Engineering","Technology","Consulting","Research","Infrastructure","Product development"],"https://www.unb.ca/academics/programs/"],

  ["moncton-business","moncton","Faculté d'administration","Administration des affaires","BAA","4 years",["Comptabilité","Finance","Marketing","Gestion","Économie","Entrepreneuriat"],["Finance","Comptabilité","Marketing","Gestion","Conseil","Entrepreneuriat"],"https://www.umoncton.ca/repertoire/"],
  ["moncton-engineering","moncton","Faculté d'ingénierie","Génie","BIng","4 years",["Mathématiques","Physique","Conception","Programmation","Systèmes","Projets"],["Ingénierie","Technologie","Conseil","Recherche","Infrastructure","Industrie"],"https://www.umoncton.ca/repertoire/"],

  ["upei-business","upei","Faculty of Business","Business Administration","BBA","4 years",["Accounting","Finance","Marketing","Management","Economics","Entrepreneurship"],["Finance","Accounting","Marketing","Management","Business","Entrepreneurship"],"https://www.upei.ca/programs"],
  ["upei-science","upei","Faculty of Science","Science","BSc","4 years",["Biology","Chemistry","Computer science","Mathematics","Physics","Environmental science"],["Research","Technology","Data","Laboratory work","Environment","Graduate study"],"https://www.upei.ca/programs"],

  ["memorial-business","memorial","Faculty of Business Administration","Commerce","BComm","4 years",["Accounting","Finance","Marketing","Management","Economics","Entrepreneurship"],["Finance","Accounting","Marketing","Management","Consulting","Entrepreneurship"],"https://www.mun.ca/business/undergraduate/"],
  ["memorial-engineering","memorial","Faculty of Engineering and Applied Science","Engineering","BEng","5 years",["Engineering design","Calculus","Physics","Programming","Systems","Co-op work terms"],["Engineering","Technology","Energy","Consulting","Research","Product development"],"https://www.mun.ca/engineering/undergraduate/"],
];

export const quebecAtlanticPrograms = makePrograms(seeds);
