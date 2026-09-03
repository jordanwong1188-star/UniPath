import { makeProgramGroups, type ProgramGroup } from "./schema";

const groups: ProgramGroup[] = [
  // Université de Montréal — current bachelor/major-level first-cycle choices. Minor-only and microprogram entries are intentionally excluded.
  {
    universityId: "udem",
    school: "Faculté des arts et des sciences",
    degree: "Baccalauréat",
    entryType: "Direct entry",
    officialUrl: "https://admission.umontreal.ca/programmes-de-1er-cycle/",
    programs: [
      "Baccalauréat en anthropologie", "Baccalauréat en bio-informatique", "Baccalauréat en chimie",
      "Baccalauréat en communication et politique", "Baccalauréat en criminologie", "Baccalauréat en démographie et anthropologie",
      "Baccalauréat en démographie et géographie", "Baccalauréat en démographie et statistique", "Baccalauréat en économie et politique",
      "Baccalauréat en études allemandes", "Baccalauréat en études anglaises", "Baccalauréat en études asiatiques",
      "Baccalauréat en études classiques", "Baccalauréat en études hispaniques", "Baccalauréat en géographie environnementale",
      "Baccalauréat en histoire", "Baccalauréat en histoire de l'art", "Baccalauréat en informatique",
      "Baccalauréat en linguistique", "Baccalauréat en littératures de langue française", "Baccalauréat en mathématiques",
      "Baccalauréat en neuroscience cognitive", "Baccalauréat en philosophie", "Baccalauréat en physique",
      "Baccalauréat en psychologie", "Baccalauréat en science politique", "Baccalauréat en sciences biologiques",
      "Baccalauréat en sciences économiques", "Baccalauréat en sociologie", "Baccalauréat en traduction",
      "Baccalauréat bidisciplinaire en études allemandes et histoire", "Baccalauréat bidisciplinaire en études classiques et anthropologie",
      "Baccalauréat bidisciplinaire en histoire et études classiques", "Baccalauréat bidisciplinaire en linguistique et psychologie",
      "Baccalauréat bidisciplinaire en littératures de langues anglaise et française", "Baccalauréat bidisciplinaire en littératures de langue française et linguistique",
      "Baccalauréat bidisciplinaire en littératures de langue française et philosophie", "Baccalauréat bidisciplinaire en mathématiques et économie",
      "Baccalauréat bidisciplinaire en mathématiques et informatique", "Baccalauréat bidisciplinaire en mathématiques et physique",
      "Baccalauréat bidisciplinaire en mathématiques et statistique", "Baccalauréat bidisciplinaire en philosophie et études classiques",
      "Baccalauréat bidisciplinaire en physique et informatique", "Baccalauréat bidisciplinaire en psychologie et sociologie",
      "Baccalauréat bidisciplinaire en science politique et philosophie", "Baccalauréat bidisciplinaire en science et philosophie"
    ],
  },
  {
    universityId: "udem",
    school: "Faculté de l'aménagement",
    degree: "Baccalauréat",
    entryType: "Direct entry",
    officialUrl: "https://admission.umontreal.ca/programmes-de-1er-cycle/",
    programs: [
      "Baccalauréat en architecture - UdeM", "Baccalauréat en architecture de paysage - UdeM",
      "Baccalauréat en design industriel - UdeM", "Baccalauréat en design intérieur - UdeM",
      "Baccalauréat en urbanisme - UdeM"
    ],
  },
  {
    universityId: "udem",
    school: "Faculté de droit",
    degree: "LLB",
    entryType: "Direct entry",
    officialUrl: "https://admission.umontreal.ca/programmes-de-1er-cycle/",
    programs: ["Baccalauréat en droit - UdeM"],
  },
  {
    universityId: "udem",
    school: "Faculté des sciences de l'éducation",
    degree: "BEd / Baccalauréat",
    entryType: "Direct entry",
    officialUrl: "https://admission.umontreal.ca/programmes-de-1er-cycle/",
    programs: [
      "Baccalauréat en éducation préscolaire et enseignement primaire - UdeM",
      "Baccalauréat en enseignement de l'éducation physique et à la santé - UdeM",
      "Baccalauréat en enseignement de l'anglais langue seconde - UdeM",
      "Baccalauréat en enseignement du français au secondaire - UdeM",
      "Baccalauréat en enseignement des mathématiques au secondaire - UdeM",
      "Baccalauréat en enseignement des sciences et technologies au secondaire - UdeM",
      "Baccalauréat en enseignement de l'univers social au secondaire - UdeM",
      "Baccalauréat en enseignement en adaptation scolaire - UdeM"
    ],
  },
  {
    universityId: "udem",
    school: "Facultés et écoles de santé",
    degree: "Baccalauréat / Doctorat de 1er cycle",
    entryType: "Varies",
    officialUrl: "https://admission.umontreal.ca/programmes-de-1er-cycle/",
    programs: [
      { name: "Baccalauréat en sciences biomédicales", entryType: "Direct entry" },
      { name: "Baccalauréat en sciences biopharmaceutiques", entryType: "Direct entry" },
      { name: "Baccalauréat en sciences infirmières - formation initiale", entryType: "Direct entry" },
      { name: "Baccalauréat en kinésiologie - UdeM", entryType: "Direct entry" },
      { name: "Baccalauréat en psychoéducation - UdeM", entryType: "Direct entry" },
      { name: "Baccalauréat en relations industrielles - UdeM", entryType: "Direct entry" },
      { name: "Baccalauréat en sécurité et études policières", entryType: "Direct entry" },
      { name: "Baccalauréat en travail social - UdeM", entryType: "Direct entry" },
      { name: "Baccalauréat en santé publique environnementale et sécurité du travail", entryType: "Direct entry" },
      { name: "Doctorat de premier cycle en médecine", degree: "MD", entryType: "Varies" },
      { name: "Doctorat de premier cycle en médecine dentaire", degree: "DMD", entryType: "Varies" },
      { name: "Doctorat de premier cycle en médecine vétérinaire", degree: "DMV", entryType: "Varies" },
      { name: "Doctorat de premier cycle en optométrie", degree: "OD", entryType: "Varies" },
      { name: "Doctorat de premier cycle en pharmacie", degree: "PharmD", entryType: "Varies" },
      { name: "Baccalauréat en ergothérapie - UdeM", entryType: "Varies" },
      { name: "Baccalauréat en physiothérapie - UdeM", entryType: "Varies" }
    ],
  },
  {
    universityId: "udem",
    school: "Faculté de musique",
    degree: "Baccalauréat",
    entryType: "Direct entry",
    officialUrl: "https://admission.umontreal.ca/programmes-de-1er-cycle/",
    programs: [
      "Baccalauréat en composition musicale - UdeM", "Baccalauréat en interprétation - chant classique UdeM",
      "Baccalauréat en interprétation - instruments classiques UdeM", "Baccalauréat en interprétation jazz UdeM",
      "Baccalauréat en musicologie - UdeM", "Baccalauréat en musiques numériques - UdeM"
    ],
  },

  // UQAM — current bachelor-level programs across its six faculties/school.
  {
    universityId: "uqam",
    school: "École des sciences de la gestion",
    degree: "BAA / BA / BScA",
    entryType: "Direct entry",
    officialUrl: "https://etudier.uqam.ca/",
    programs: [
      "Baccalauréat en administration - UQAM", "Baccalauréat en économique - UQAM",
      "Baccalauréat en gestion des ressources humaines - UQAM", "Baccalauréat en gestion publique - UQAM",
      "Baccalauréat en sciences comptables - UQAM", "Baccalauréat en informatique de gestion - UQAM",
      "Baccalauréat en gestion du tourisme et de l'hôtellerie - UQAM"
    ],
  },
  {
    universityId: "uqam",
    school: "Faculté de science politique et de droit",
    degree: "LLB / BA",
    entryType: "Direct entry",
    officialUrl: "https://etudier.uqam.ca/",
    programs: [
      "Baccalauréat en droit - UQAM", "Baccalauréat en science politique - UQAM",
      "Baccalauréat en relations internationales et droit international - UQAM"
    ],
  },
  {
    universityId: "uqam",
    school: "Faculté des sciences",
    degree: "BSc / BScA",
    entryType: "Direct entry",
    officialUrl: "https://etudier.uqam.ca/",
    programs: [
      "Baccalauréat en biochimie - UQAM", "Baccalauréat en biologie en apprentissage par problèmes",
      "Baccalauréat en chimie - UQAM", "Baccalauréat en informatique et génie logiciel",
      "Baccalauréat en mathématiques - UQAM", "Baccalauréat en sciences naturelles appliquées à l'environnement",
      "Baccalauréat en sciences de la Terre et de l'atmosphère"
    ],
  },
  {
    universityId: "uqam",
    school: "Faculté des sciences humaines",
    degree: "BA / BSc",
    entryType: "Direct entry",
    officialUrl: "https://etudier.uqam.ca/",
    programs: [
      "Baccalauréat en géographie - UQAM", "Baccalauréat en histoire - UQAM", "Baccalauréat en linguistique - UQAM",
      "Baccalauréat en philosophie - UQAM", "Baccalauréat en psychologie - UQAM", "Baccalauréat en sexologie - UQAM",
      "Baccalauréat en sociologie - UQAM", "Baccalauréat en travail social - UQAM"
    ],
  },
  {
    universityId: "uqam",
    school: "Faculté de communication",
    degree: "BA",
    entryType: "Direct entry",
    officialUrl: "https://etudier.uqam.ca/",
    programs: [
      "Baccalauréat en communication - création médias - cinéma", "Baccalauréat en communication - création médias - médias interactifs",
      "Baccalauréat en communication - création médias - télévision", "Baccalauréat en communication humaine et organisationnelle",
      "Baccalauréat en communication marketing - UQAM", "Baccalauréat en communication - médias numériques",
      "Baccalauréat en journalisme - UQAM", "Baccalauréat en relations publiques - UQAM"
    ],
  },
  {
    universityId: "uqam",
    school: "Faculté des arts",
    degree: "BA / BFA",
    entryType: "Direct entry",
    officialUrl: "https://etudier.uqam.ca/",
    programs: [
      "Baccalauréat en arts visuels et médiatiques", "Baccalauréat en danse - UQAM",
      "Baccalauréat en design de l'environnement", "Baccalauréat en design graphique et expériences visuelles",
      "Baccalauréat en études littéraires - UQAM", "Baccalauréat en histoire de l'art - UQAM",
      "Baccalauréat en musique - UQAM", "Baccalauréat en théâtre - UQAM"
    ],
  },
  {
    universityId: "uqam",
    school: "Faculté des sciences de l'éducation",
    degree: "BEd / BA",
    entryType: "Direct entry",
    officialUrl: "https://etudier.uqam.ca/",
    programs: [
      "Baccalauréat en développement de carrière", "Baccalauréat en éducation préscolaire et enseignement primaire - UQAM",
      "Baccalauréat en enseignement en adaptation scolaire et sociale - UQAM", "Baccalauréat en enseignement de l'anglais langue seconde - UQAM",
      "Baccalauréat en enseignement du français langue seconde - UQAM", "Baccalauréat en enseignement secondaire - français UQAM",
      "Baccalauréat en enseignement secondaire - mathématiques UQAM", "Baccalauréat en enseignement secondaire - sciences et technologies UQAM",
      "Baccalauréat en enseignement secondaire - univers social UQAM", "Baccalauréat en enseignement en formation professionnelle et technique"
    ],
  },
];

export const quebecMontrealFrenchPrograms = makeProgramGroups(groups);
