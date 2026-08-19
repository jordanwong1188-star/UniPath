import { makePrograms, type ProgramSeed } from "./schema";

const seeds: ProgramSeed[] = [
  ["ualberta-business","ualberta","Alberta School of Business","Bachelor of Commerce","BCom","4 years",["Accounting","Finance","Marketing","Operations","Strategy","Business economics"],["Finance","Accounting","Consulting","Marketing","Management","Entrepreneurship"],"https://www.ualberta.ca/en/business/programs/bachelor-of-commerce.html"],
  ["ualberta-engineering","ualberta","Faculty of Engineering","Engineering","BSc in Engineering","4–5 years",["Engineering design","Calculus","Physics","Programming","Technical communication","Discipline-specific engineering"],["Engineering","Technology","Energy","Infrastructure","Consulting","Research"],"https://www.ualberta.ca/en/engineering/programs/undergraduate-programs/index.html"],

  ["ucalgary-business","ucalgary","Haskayne School of Business","Bachelor of Commerce","BComm","4 years",["Accounting","Finance","Marketing","Business technology","Strategy","Entrepreneurship"],["Finance","Accounting","Marketing","Consulting","Management","Entrepreneurship"],"https://haskayne.ucalgary.ca/future-students/bcomm"],
  ["ucalgary-engineering","ucalgary","Schulich School of Engineering","Engineering","BSc in Engineering","4–5 years",["Engineering design","Calculus","Physics","Programming","Systems","Technical communication"],["Engineering","Software","Energy","Technology","Consulting","Research"],"https://schulich.ucalgary.ca/future-students/undergraduate/programs"],

  ["ulethbridge-business","ulethbridge","Dhillon School of Business","Management","BMgt","4 years",["Accounting","Finance","Marketing","Human resources","Management","Business analytics"],["Management","Finance","Marketing","Human resources","Consulting","Entrepreneurship"],"https://www.ulethbridge.ca/future-student/programs"],
  ["ulethbridge-arts-science","ulethbridge","Faculty of Arts and Science","Arts & Science","BA / BSc","4 years",["Psychology","Biology","Economics","Computer science","History","Mathematics"],["Research","Public service","Technology","Education","Business","Graduate study"],"https://www.ulethbridge.ca/future-student/programs"],

  ["athabasca-commerce","athabasca","Faculty of Business","Commerce","BComm","4 years equivalent",["Accounting","Finance","Marketing","Management","Economics","Business law"],["Accounting","Finance","Management","Marketing","Business","Entrepreneurship"],"https://www.athabascau.ca/programs/index.html"],
  ["athabasca-arts","athabasca","Faculty of Humanities and Social Sciences","Arts","BA","3–4 years equivalent",["Psychology","English","History","Sociology","Political studies","Communication"],["Public service","Communications","Business","Education","Research","Further study"],"https://www.athabascau.ca/programs/index.html"],

  ["mru-business","mru","Bissett School of Business","Business Administration","BBA","4 years",["Accounting","Finance","Marketing","Human resources","Management","Innovation"],["Accounting","Finance","Marketing","Management","Human resources","Entrepreneurship"],"https://www.mtroyal.ca/ProgramsCourses/FacultiesSchoolsCentres/Bissett/"],
  ["mru-science","mru","Faculty of Science and Technology","Science","BSc","4 years",["Biology","Chemistry","Computer science","Environmental science","Mathematics","Data"],["Research","Technology","Environment","Data","Laboratory work","Graduate study"],"https://www.mtroyal.ca/ProgramsCourses/"],

  ["macewan-business","macewan","School of Business","Commerce","BCom","4 years",["Accounting","Finance","Marketing","Human resources","International business","Decision sciences"],["Accounting","Finance","Marketing","Management","Human resources","Business analysis"],"https://www.macewan.ca/academics/faculties-schools/triffo/programs/"],
  ["macewan-science","macewan","Faculty of Arts and Science","Science","BSc","4 years",["Biology","Chemistry","Computer science","Data science","Statistics","Environmental science"],["Research","Data","Technology","Laboratory work","Environment","Graduate study"],"https://www.macewan.ca/academics/faculties-schools/faculty-of-arts-science/programs/"],

  ["nait-business","nait","JR Shaw School of Business","Business Administration","BBA / Diploma","2–4 years",["Accounting","Finance","Marketing","Management","Entrepreneurship","Business technology"],["Accounting","Finance","Marketing","Management","Sales","Entrepreneurship"],"https://www.nait.ca/programs"],
  ["nait-dmit","nait","School of Media and Information Technology","Digital Media and IT","Diploma","2 years",["Programming","Web development","Systems","Digital media","User experience","Project work"],["Software development","Web development","IT","Digital media","UX","Technology support"],"https://www.nait.ca/programs"],

  ["sait-business","sait","School of Business","Business Administration","BBA / Diploma","2–4 years",["Accounting","Finance","Marketing","Management","Supply chain","Entrepreneurship"],["Accounting","Finance","Marketing","Management","Supply chain","Business operations"],"https://www.sait.ca/programs-and-courses"],
  ["sait-software","sait","School for Advanced Digital Technology","Software & Technology","Diploma","2 years",["Programming","Software development","Web","Databases","Cloud","Project work"],["Software development","Web development","IT","Cloud","Data","Technology operations"],"https://www.sait.ca/programs-and-courses"],

  ["usask-business","usask","Edwards School of Business","Bachelor of Commerce","BComm","4 years",["Accounting","Finance","Marketing","Management","Operations","Entrepreneurship"],["Finance","Accounting","Marketing","Consulting","Management","Entrepreneurship"],"https://admissions.usask.ca/programs/business.php"],
  ["usask-engineering","usask","College of Engineering","Engineering","Engineering degree","4–5 years",["Engineering design","Calculus","Physics","Programming","Systems","Technical communication"],["Engineering","Technology","Energy","Infrastructure","Consulting","Research"],"https://admissions.usask.ca/programs/engineering.php"],

  ["uregina-business","uregina","Hill and Levene Schools of Business","Business Administration","BBA","4 years",["Accounting","Finance","Marketing","Human resources","Management","Entrepreneurship"],["Accounting","Finance","Marketing","Management","Human resources","Entrepreneurship"],"https://www.uregina.ca/business/"],
  ["uregina-engineering","uregina","Faculty of Engineering and Applied Science","Engineering","BASc","4–5 years",["Engineering design","Calculus","Physics","Programming","Systems","Technical communication"],["Engineering","Technology","Energy","Software","Consulting","Research"],"https://www.uregina.ca/engineering/"],

  ["saskpoly-business","saskpoly","School of Business","Business","Diploma","2 years",["Accounting","Management","Marketing","Finance","Business communication","Operations"],["Accounting","Management","Marketing","Finance","Sales","Business operations"],"https://saskpolytech.ca/programs-and-courses/"],
  ["saskpoly-computing","saskpoly","School of Information and Communications Technology","Computer Systems Technology","Diploma","2 years",["Programming","Networks","Databases","Systems","Web development","Security"],["Software development","IT","Networking","Systems","Web development","Technical support"],"https://saskpolytech.ca/programs-and-courses/"],

  ["umanitoba-business","umanitoba","Asper School of Business","Bachelor of Commerce","BComm (Hons)","4 years",["Accounting","Finance","Marketing","Supply chain","Human resources","Entrepreneurship"],["Finance","Accounting","Marketing","Consulting","Management","Supply chain"],"https://umanitoba.ca/explore/programs-of-study"],
  ["umanitoba-engineering","umanitoba","Price Faculty of Engineering","Engineering","BSc in Engineering","4–5 years",["Engineering design","Calculus","Physics","Programming","Systems","Technical communication"],["Engineering","Technology","Infrastructure","Energy","Consulting","Research"],"https://umanitoba.ca/explore/programs-of-study"],

  ["uwinnipeg-business","uwinnipeg","Faculty of Business and Economics","Business Administration","BBA","4 years",["Accounting","Finance","Marketing","Management","Economics","Human resources"],["Management","Finance","Accounting","Marketing","Human resources","Business"],"https://www.uwinnipeg.ca/programs/"],
  ["uwinnipeg-science","uwinnipeg","Faculty of Science","Science","BSc","3–4 years",["Biology","Chemistry","Computer science","Mathematics","Physics","Environmental science"],["Research","Technology","Data","Laboratory work","Environment","Graduate study"],"https://www.uwinnipeg.ca/programs/"],

  ["brandon-arts","brandon","Faculty of Arts","Arts","BA","3–4 years",["English","History","Psychology","Sociology","Political science","Economics"],["Public service","Communications","Education","Business","Research","Further study"],"https://www.brandonu.ca/future-students/programs/"],
  ["brandon-science","brandon","Faculty of Science","Science","BSc","3–4 years",["Biology","Chemistry","Computer science","Mathematics","Physics","Geography"],["Research","Technology","Data","Laboratory work","Environment","Graduate study"],"https://www.brandonu.ca/future-students/programs/"],
];

export const prairiePrograms = makePrograms(seeds);
