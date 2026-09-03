import { makeProgramGroups, type ProgramGroup } from "./schema";

const groups: ProgramGroup[] = [
  // Université Laval — current first-cycle bachelor/doctorate-level program finder.
  {
    universityId: "laval",
    school: "Université Laval",
    degree: "Baccalauréat",
    entryType: "Direct entry",
    officialUrl: "https://www.ulaval.ca/etudes/programmes",
    programs: [
      "Baccalauréat en actuariat - Laval", "Baccalauréat en administration des affaires - Laval",
      "Baccalauréat en administration des affaires - expertise comptable", "Baccalauréat en agroéconomie",
      "Baccalauréat en agronomie", "Baccalauréat en anthropologie - Laval", "Baccalauréat en architecture - Laval",
      "Baccalauréat en art et science de l'animation", "Baccalauréat en arts visuels et médiatiques - Laval",
      "Baccalauréat en bio-informatique - Laval", "Baccalauréat en biochimie de la santé - Laval",
      "Baccalauréat en biologie - Laval", "Baccalauréat en chimie - Laval", "Baccalauréat en communication publique",
      "Baccalauréat en criminologie - Laval", "Baccalauréat en design de produits", "Baccalauréat en design graphique - Laval",
      "Baccalauréat en droit - Laval", "Baccalauréat en économique - Laval", "Baccalauréat en enseignement de l'anglais langue seconde - Laval",
      "Baccalauréat en enseignement de l'éducation physique et à la santé - Laval", "Baccalauréat en enseignement préscolaire et primaire - Laval",
      "Baccalauréat en enseignement secondaire - français Laval", "Baccalauréat en enseignement secondaire - mathématiques Laval",
      "Baccalauréat en enseignement secondaire - sciences et technologie Laval", "Baccalauréat en enseignement secondaire - univers social Laval",
      "Baccalauréat en enseignement professionnel et technique - Laval", "Baccalauréat en finance quantitative",
      "Baccalauréat en génie agroenvironnemental", "Baccalauréat en génie chimique - Laval", "Baccalauréat en génie civil - Laval",
      "Baccalauréat en génie des eaux", "Baccalauréat en génie électrique - Laval", "Baccalauréat en génie géologique - Laval",
      "Baccalauréat en génie informatique - Laval", "Baccalauréat en génie logiciel - Laval", "Baccalauréat en génie des matériaux et de la métallurgie",
      "Baccalauréat en génie mécanique - Laval", "Baccalauréat en génie des mines et de la minéralurgie", "Baccalauréat en géographie - Laval",
      "Baccalauréat en informatique - Laval", "Baccalauréat en kinésiologie - Laval", "Baccalauréat en littératures et linguistique anglaises",
      "Baccalauréat en mathématiques - Laval", "Baccalauréat en microbiologie - Laval", "Baccalauréat en musique - Laval",
      "Baccalauréat en musique-composition", "Baccalauréat en musique-interprétation classique", "Baccalauréat en musique-interprétation jazz et musique populaire",
      "Baccalauréat en musique-musicologie", "Baccalauréat en orientation - Laval", "Baccalauréat en philosophie - Laval",
      "Baccalauréat en physique - Laval", "Baccalauréat en psychologie - Laval", "Baccalauréat en relations industrielles - Laval",
      "Baccalauréat en science politique - Laval", "Baccalauréat en sciences de la consommation", "Baccalauréat en sciences du langage",
      "Baccalauréat en sciences et technologie des aliments", "Baccalauréat en sciences géomatiques", "Baccalauréat en sciences infirmières - Laval",
      "Baccalauréat en service social - Laval", "Baccalauréat en sociologie - Laval", "Baccalauréat en statistique - Laval",
      "Baccalauréat en théâtre et arts vivants", "Baccalauréat en théologie - Laval", "Baccalauréat intégré en affaires publiques et relations internationales",
      "Baccalauréat intégré en économie et mathématiques", "Baccalauréat intégré en économie et politique", "Baccalauréat intégré en environnements naturels et aménagés",
      "Baccalauréat intégré en études internationales et langues modernes", "Baccalauréat intégré en informatique et gestion",
      "Baccalauréat intégré en mathématiques et informatique", "Baccalauréat intégré en philosophie et science politique",
      "Baccalauréat intégré en sciences des religions", "Baccalauréat intégré en sciences historiques et études patrimoniales"
    ],
  },
  {
    universityId: "laval",
    school: "Programmes professionnels de premier cycle",
    degree: "Doctorat de premier cycle / Baccalauréat",
    entryType: "Varies",
    officialUrl: "https://www.ulaval.ca/etudes/programmes",
    programs: [
      "Doctorat de premier cycle en médecine - Laval", "Doctorat de premier cycle en médecine dentaire - Laval",
      "Doctorat de premier cycle en pharmacie - Laval", "Baccalauréat en ergothérapie - Laval",
      "Baccalauréat en physiothérapie - Laval", "Baccalauréat en nutrition - Laval"
    ],
  },

  // Université de Sherbrooke — current first-cycle bachelor programs.
  {
    universityId: "usherbrooke",
    school: "Université de Sherbrooke",
    degree: "Baccalauréat",
    entryType: "Direct entry",
    officialUrl: "https://www.usherbrooke.ca/admission/programmes",
    programs: [
      "Baccalauréat 4 ans en sciences", "Baccalauréat 4 ans en sciences humaines",
      "Baccalauréat en adaptation scolaire et sociale", "Baccalauréat en administration des affaires - Sherbrooke",
      "Baccalauréat en biochimie de la santé - Sherbrooke", "Baccalauréat en biologie - Sherbrooke",
      "Baccalauréat en biologie moléculaire et cellulaire", "Baccalauréat en chimie - Sherbrooke",
      "Baccalauréat en chimie pharmaceutique", "Baccalauréat en communication appliquée",
      "Baccalauréat en droit - Sherbrooke", "Baccalauréat en écologie - Sherbrooke", "Baccalauréat en économique - Sherbrooke",
      "Baccalauréat en enseignement au préscolaire et au primaire", "Baccalauréat en enseignement au secondaire",
      "Baccalauréat en enseignement de l'anglais langue seconde - Sherbrooke", "Baccalauréat en études de l'environnement",
      "Baccalauréat en génie biotechnologique", "Baccalauréat en génie chimique - Sherbrooke", "Baccalauréat en génie civil - Sherbrooke",
      "Baccalauréat en génie du bâtiment", "Baccalauréat en génie électrique - Sherbrooke", "Baccalauréat en génie informatique - Sherbrooke",
      "Baccalauréat en génie mécanique - Sherbrooke", "Baccalauréat en génie robotique", "Baccalauréat en informatique - Sherbrooke",
      "Baccalauréat en informatique de gestion - Sherbrooke", "Baccalauréat en mathématiques - Sherbrooke",
      "Baccalauréat en microbiologie - Sherbrooke", "Baccalauréat en musique - Sherbrooke", "Baccalauréat en orientation - Sherbrooke",
      "Baccalauréat en pharmacologie - Sherbrooke", "Baccalauréat en physique - Sherbrooke", "Baccalauréat en psychologie - Sherbrooke",
      "Baccalauréat en psychoéducation - Sherbrooke", "Baccalauréat en relations industrielles - Sherbrooke",
      "Baccalauréat en sciences infirmières - Sherbrooke", "Baccalauréat en service social - Sherbrooke",
      "Baccalauréat en études politiques appliquées", "Baccalauréat en études françaises et québécoises",
      "Baccalauréat en histoire - Sherbrooke", "Baccalauréat en philosophie - Sherbrooke",
      "Baccalauréat en traduction professionnelle", "Baccalauréat en sciences de l'activité physique",
      "Baccalauréat en kinésiologie - Sherbrooke"
    ],
  },
  {
    universityId: "usherbrooke",
    school: "Programmes professionnels de santé",
    degree: "Doctorat de premier cycle",
    entryType: "Varies",
    officialUrl: "https://www.usherbrooke.ca/admission/programmes",
    programs: ["Doctorat en médecine - Sherbrooke", "Doctorat de premier cycle en pharmacie - Sherbrooke"],
  },
];

export const quebecLavalSherbrookePrograms = makeProgramGroups(groups);
