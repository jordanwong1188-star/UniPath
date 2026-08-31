const ubcGeneralDegrees = [
  ["ubc-applied-science", "Applied Science (Engineering) · Vancouver"],
  ["ubc-applied-science-okanagan", "Applied Science (Engineering) · Okanagan"],
  ["ubc-applied-biology", "Applied Biology · Vancouver"],
  ["ubc-arts-vancouver", "Arts · Vancouver"],
  ["ubc-arts-okanagan", "Arts · Okanagan"],
  ["ubc-bie", "Bachelor of International Economics · Vancouver"],
  ["ubc-commerce-okanagan", "Commerce · Okanagan"],
  ["ubc-food-nutrition-health", "Food, Nutrition and Health · Vancouver"],
  ["ubc-global-resource-systems", "Global Resource Systems · Vancouver"],
  ["ubc-human-kinetics-okanagan", "Human Kinetics · Okanagan"],
  ["ubc-indigenous-land-stewardship", "Indigenous Land Stewardship · Vancouver"],
  ["ubc-kinesiology", "Kinesiology · Vancouver"],
  ["ubc-natural-resources", "Natural Resources · Vancouver"],
  ["ubc-nursing-okanagan", "Nursing · Okanagan"],
  ["ubc-science-vancouver", "Science · Vancouver"],
  ["ubc-science-okanagan", "Science · Okanagan"],
  ["ubc-urban-forestry", "Urban Forestry · Vancouver"],
  ["ubc-other-personal-profile", "Another UBC undergraduate degree requiring the Personal Profile"],
] as const;

const ubcGeneralProfiles = ubcGeneralDegrees.map(([id, program]) => ({
  id,
  university: "University of British Columbia",
  program,
  deadline: "Submit with the UBC application · confirm your Applicant Service Centre",
  source: "https://you.ubc.ca/applying-ubc/how-to-apply/personal-profile/",
  note: "High-school applicants to this degree complete UBC's general Personal Profile. The exact selection of prompts and character limits appears in the application.",
  timerAccuracy: "UBC does not publish a timed writing requirement for the Personal Profile, so UniPath intentionally does not add a countdown.",
  practice: {
    written: { seconds: null, limit: null, questions: ["Official prompt focus: introduce who you are through how people close to you would describe you, including something you value about yourself.", "Official prompt focus: explain what matters to you and why.", "Official prompt focus: develop one or two of your most meaningful activities, including your role and what you learned.", "Official prompt focus: add relevant context about your academic choices, circumstances, or preparation for your intended area of study."] },
    video: { prepSeconds: null, responseSeconds: null, questions: ["This UBC degree does not list a general video-interview component. Follow any additional instructions shown in your application."] },
  },
  components: [
    { title: "Personal introduction", format: "Written · official UBC prompt family", help: "Show who you are through a specific detail, value, or experience instead of a list of adjectives." },
    { title: "Activities and deeper reflection", format: "Up to five activities plus a deeper response", help: "Record responsibilities accurately, then explain your contribution and learning for the experiences that matter most." },
    { title: "References and additional context", format: "Two referees plus optional academic context", help: "Choose eligible referees who can verify your experiences and use additional information only when it helps UBC understand your record or plans." },
  ],
}));

const ubcSpecialRequirements = [
  ["ubc-bdes", "Bachelor of Design · Vancouver", "Video interview, three-project creative test, and a 1–2 page résumé", "https://sala.ubc.ca/program/bachelor-of-design-in-architecture-landscape-architecture-and-urbanism/"],
  ["ubc-music", "Bachelor of Music · Vancouver", "Supplemental application, references, and required audition", "https://music.ubc.ca/undergraduate/admissions/"],
  ["ubc-fine-arts-okanagan", "Fine Arts · Okanagan", "Portfolio and additional materials", "https://you.ubc.ca/applying-ubc/how-to-apply/application/"],
  ["ubc-media-studies-okanagan", "Media Studies · Okanagan", "Portfolio and additional materials", "https://you.ubc.ca/applying-ubc/how-to-apply/application/"],
  ["ubc-media-studies-vancouver", "Media Studies · Vancouver", "Supplemental application", "https://you.ubc.ca/applying-ubc/how-to-apply/application/"],
  ["ubc-sustainability", "Sustainability · Okanagan", "Concentration form", "https://you.ubc.ca/applying-ubc/how-to-apply/application/"],
  ["ubc-computer-science-bcs", "Bachelor of Computer Science · Vancouver", "Supplemental application", "https://you.ubc.ca/applying-ubc/how-to-apply/application/"],
  ["ubc-dental-science", "Dental Science · Vancouver", "Supplemental application", "https://you.ubc.ca/applying-ubc/how-to-apply/application/"],
  ["ubc-education", "Bachelor of Education · Vancouver or Okanagan", "Supplemental application and additional materials", "https://you.ubc.ca/applying-ubc/how-to-apply/application/"],
  ["ubc-fine-arts-vancouver", "Fine Arts specializations · Vancouver", "Specialization-dependent supplemental materials", "https://you.ubc.ca/applying-ubc/how-to-apply/application/"],
  ["ubc-food-resource-economics", "Food and Resource Economics · Vancouver", "Letter of academic intent", "https://you.ubc.ca/applying-ubc/how-to-apply/application/"],
  ["ubc-midwifery", "Midwifery · Vancouver", "Supplemental application", "https://you.ubc.ca/applying-ubc/how-to-apply/application/"],
  ["ubc-nursing-vancouver", "Nursing · Vancouver", "Supplemental application and additional materials", "https://you.ubc.ca/applying-ubc/how-to-apply/application/"],
  ["ubc-pharmaceutical-sciences", "Pharmaceutical Sciences · Vancouver", "Application fee and prerecorded virtual interview", "https://you.ubc.ca/applying-ubc/how-to-apply/application/"],
  ["ubc-sciences-po", "Arts Dual Degree with Sciences Po", "Supplemental application", "https://you.ubc.ca/applying-ubc/how-to-apply/application/"],
  ["ubc-bmm", "Bachelor + Master of Management Dual Degree", "Supplemental application", "https://you.ubc.ca/applying-ubc/how-to-apply/application/"],
  ["ubc-social-work", "Bachelor of Social Work · Vancouver", "Supplemental application and additional materials", "https://you.ubc.ca/applying-ubc/how-to-apply/application/"],
  ["ubc-pharmd", "Entry-to-Practice Doctor of Pharmacy", "Application fee and prerecorded interview", "https://you.ubc.ca/applying-ubc/how-to-apply/application/"],
] as const;

const ubcSpecialProfiles = ubcSpecialRequirements.map(([id, program, requirement, source]) => ({
  id,
  university: "University of British Columbia",
  program,
  deadline: "Confirm the program-specific deadline on the official page and in your applicant portal",
  source,
  note: `UBC lists the following additional requirement for this program: ${requirement}.`,
  timerAccuracy: "No countdown is added unless UBC publishes a current, verified time limit for this exact component.",
  practice: {
    written: { seconds: null, limit: null, questions: ["Portal-only prompt: paste the current question or task from your official UBC supplemental application here before drafting.", "Preparation prompt: identify what the assessors ask you to submit, what evidence supports it, and how your response demonstrates fit without exaggeration."] },
    video: { prepSeconds: null, responseSeconds: null, questions: ["Portal-only interview: use the current question displayed by UBC. UniPath will not claim an unverified practice question is official.", "Practice question: explain one experience that demonstrates your preparation for this field and reflect on what it taught you."] },
  },
  components: [
    { title: "Required supplemental package", format: requirement, help: "Open the official source and your applicant portal together. Record every required component, upload rule, fee, and deadline before starting." },
    { title: "Prompt-by-prompt workspace", format: "Current portal wording", help: "Paste each live prompt into the workspace and answer every part using specific, verifiable evidence." },
    { title: "Submission audit", format: "Files, references, technology, and confirmation", help: "Check file types and sizes, confirm referees and technical setup where applicable, and save the submission confirmation." },
  ],
}));


type VerifiedSupplementalSeed = {
  id: string;
  university: string;
  program: string;
  requirement: string;
  deadline: string;
  source: string;
  practiceFocus: string;
};

const verifiedSupplementalSeeds: VerifiedSupplementalSeed[] = [
  { id: "sfu-beedie-bba", university: "Simon Fraser University", program: "Beedie School of Business · BBA", requirement: "Mandatory supplemental application", deadline: "February 7, 2027 for fall entry", source: "https://beedie.sfu.ca/tracs/apply", practiceFocus: "leadership, collaboration, initiative, and reflection" },
  { id: "sfu-contemporary-arts", university: "Simon Fraser University", program: "School for the Contemporary Arts · portfolio/audition programs", requirement: "Program-specific audition, interview, or portfolio", deadline: "February 7, 2027 for fall entry", source: "https://www.sfu.ca/students/admission/apply/dates-deadlines/high-school/fall-term.html", practiceFocus: "artistic intent, process, influences, and portfolio decisions" },

  { id: "waterloo-engineering", university: "University of Waterloo", program: "Engineering · all programs except Architecture", requirement: "Mandatory Admission Information Form and online interview", deadline: "February 1, 2026 historical cycle · confirm current portal", source: "https://uwaterloo.ca/engineering/future-students/applying/admission-requirements", practiceFocus: "technical curiosity, teamwork, initiative, time management, and fit" },
  { id: "waterloo-mathematics", university: "University of Waterloo", program: "Faculty of Mathematics programs", requirement: "Admission Information Form and Supplementary Information Form", deadline: "February 15, 2026 historical cycle · confirm current portal", source: "https://uwaterloo.ca/future-students/admissions/admission-information-form", practiceFocus: "mathematical engagement, contests, activities, goals, and resilience" },
  { id: "waterloo-afm", university: "University of Waterloo", program: "Accounting and Financial Management", requirement: "Program-specific supplementary assessment", deadline: "Confirm in Waterloo applicant portal", source: "https://uwaterloo.ca/future-students/admissions/admission-information-form", practiceFocus: "business awareness, communication, collaboration, and ethical judgment" },
  { id: "waterloo-architecture", university: "University of Waterloo", program: "Architecture", requirement: "Portfolio, précis, and interview process", deadline: "Confirm current Architecture invitation and deadline", source: "https://uwaterloo.ca/architecture/future-undergraduate-students", practiceFocus: "creative process, spatial thinking, observation, and portfolio curation" },

  { id: "uoft-engineering", university: "University of Toronto", program: "Engineering · all programs", requirement: "Mandatory Online Student Profile with written and video components", deadline: "Confirm in Engineering Applicant Portal", source: "https://discover.engineering.utoronto.ca/how-to-apply/student-profile-form/", practiceFocus: "leadership, dedication, problem-solving, activities, and engineering motivation" },
  { id: "uoft-computer-science", university: "University of Toronto", program: "Computer Science · St. George", requirement: "Computer Science Supplemental Application", deadline: "Confirm in Join U of T", source: "https://future.utoronto.ca/supplemental-applications", practiceFocus: "experiences, goals, problem-solving, and interest in computer science" },
  { id: "utm-computer-science", university: "University of Toronto", program: "Computer Science · Mississauga", requirement: "Supplementary Application", deadline: "Confirm in Join U of T", source: "https://future.utoronto.ca/supplemental-applications", practiceFocus: "experiences, goals, problem-solving, and program fit" },
  { id: "utsc-management", university: "University of Toronto", program: "Management and double-degree programs · Scarborough", requirement: "Supplementary Application Form", deadline: "Confirm in Join U of T", source: "https://future.utoronto.ca/supplemental-applications", practiceFocus: "leadership, business interest, teamwork, and community impact" },
  { id: "utsc-special-programs", university: "University of Toronto", program: "UTSC International Development, Music Industry Technology, or Paramedicine", requirement: "Program-specific Supplementary Application Form", deadline: "Confirm in Join U of T", source: "https://future.utoronto.ca/supplemental-applications", practiceFocus: "program motivation, relevant preparation, judgment, and reflection" },
  { id: "uoft-architecture", university: "University of Toronto", program: "Architectural Studies or Visual Studies", requirement: "One Idea Supplementary Application", deadline: "February 1, 2026 historical cycle · confirm current cycle", source: "https://future.utoronto.ca/supplemental-applications", practiceFocus: "one clear creative idea, visual communication, process, and reflection" },
  { id: "uoft-kinesiology", university: "University of Toronto", program: "Kinesiology", requirement: "Statement of Interest", deadline: "Confirm in Join U of T", source: "https://future.utoronto.ca/supplemental-applications", practiceFocus: "motivation, relevant experience, understanding of kinesiology, and goals" },
  { id: "uoft-music", university: "University of Toronto", program: "Faculty of Music · all programs", requirement: "Music Questionnaire, references, audition, and interview", deadline: "Confirm current Music deadlines", source: "https://music.utoronto.ca/admissions/undergraduate/applying", practiceFocus: "repertoire, musical growth, goals, interpretation, and audition readiness" },
  { id: "utm-theatre", university: "University of Toronto", program: "Theatre and Drama Studies · Mississauga", requirement: "Audition", deadline: "Confirm current audition instructions", source: "https://future.utoronto.ca/supplemental-applications", practiceFocus: "performance choices, text interpretation, preparation, and artistic goals" },

  { id: "mcmaster-arts-science", university: "McMaster University", program: "Arts & Science", requirement: "Mandatory written supplementary application", deadline: "February 1, 2026 · historical cycle", source: "https://artsci.mcmaster.ca/future-students/supplementary-application/", practiceFocus: "ideas, intellectual curiosity, interdisciplinary thinking, and reflection" },
  { id: "mcmaster-leadership-civic", university: "McMaster University", program: "Leadership and Civic Studies · Wilson College", requirement: "Mandatory supplementary application", deadline: "February 1, 2026 · historical cycle", source: "https://wilsoncollege.mcmaster.ca/future-students/ready-to-apply/2026-wilson-college-supplementary-application/", practiceFocus: "civic responsibility, leadership, community context, and ethical reasoning" },
  { id: "mcmaster-commerce", university: "McMaster University", program: "Commerce", requirement: "Optional but highly recommended written supplementary application", deadline: "April 17, 2026 · historical cycle", source: "https://ug.degroote.mcmaster.ca/apply/supplemental-application/", practiceFocus: "activities, strengths, business interest, initiative, and reflection" },
  { id: "mcmaster-ibh", university: "McMaster University", program: "Integrated Business and Humanities", requirement: "Mandatory supplementary application", deadline: "February 2, 2026 · historical cycle", source: "https://future.mcmaster.ca/supplementary-applications/", practiceFocus: "business, humanities, social impact, collaboration, and personal fit" },
  { id: "mcmaster-btech", university: "McMaster University", program: "Bachelor of Technology", requirement: "Supplementary application", deadline: "January 29, 2026 · historical cycle", source: "https://future.mcmaster.ca/supplementary-applications/", practiceFocus: "applied problem-solving, technical experience, teamwork, and goals" },
  { id: "mcmaster-computer-science", university: "McMaster University", program: "Computer Science", requirement: "Kira Talent supplementary application", deadline: "January 29, 2026 · historical cycle", source: "https://www.eng.mcmaster.ca/supplementary-application/", practiceFocus: "problem-solving, collaboration, communication, and computing motivation" },
  { id: "mcmaster-engineering", university: "McMaster University", program: "Engineering", requirement: "Kira Talent supplementary application", deadline: "January 29, 2026 · historical cycle", source: "https://www.eng.mcmaster.ca/supplementary-application/", practiceFocus: "problem-solving, collaboration, communication, resilience, and engineering motivation" },
  { id: "mcmaster-ibiomed", university: "McMaster University", program: "Integrated Biomedical Engineering and Health Sciences", requirement: "Kira Talent supplementary application", deadline: "January 29, 2026 · historical cycle", source: "https://www.eng.mcmaster.ca/supplementary-application/", practiceFocus: "health innovation, engineering judgment, teamwork, empathy, and communication" },
  { id: "mcmaster-health-sciences", university: "McMaster University", program: "Honours Health Sciences", requirement: "Mandatory written supplementary application", deadline: "Early/mid-February 2026 · historical cycle", source: "https://hhsp.healthsci.mcmaster.ca/future-students/supplementary-application/", practiceFocus: "critical thinking, creativity, communication, self-awareness, and perspective" },
  { id: "mcmaster-midwifery", university: "McMaster University", program: "Midwifery", requirement: "Identity and Admissions Survey", deadline: "February 1, 2026 · historical cycle", source: "https://future.mcmaster.ca/supplementary-applications/", practiceFocus: "motivation, relevant understanding, identity, service, and reflective judgment" },
  { id: "mcmaster-nursing", university: "McMaster University", program: "Nursing", requirement: "CASPer assessment", deadline: "Book an eligible 2025–26 testing date", source: "https://future.mcmaster.ca/supplementary-applications/", practiceFocus: "ethics, empathy, communication, conflict, professionalism, and judgment" },
  { id: "mcmaster-iarts", university: "McMaster University", program: "Integrated Arts", requirement: "Electronic creative submission", deadline: "February 2, 2026 · historical cycle", source: "https://future.mcmaster.ca/supplementary-applications/", practiceFocus: "creative process, artistic identity, experimentation, and interdisciplinary goals" },
  { id: "mcmaster-isci", university: "McMaster University", program: "Honours Integrated Science", requirement: "Mandatory supplementary application", deadline: "February 2, 2026 at noon ET · historical cycle", source: "https://sis.mcmaster.ca/undergraduate/isci/isci-admission-requirements/", practiceFocus: "scientific curiosity, interdisciplinary thinking, research, collaboration, and reflection" },

  { id: "queens-health-sciences", university: "Queen's University", program: "Bachelor of Health Sciences", requirement: "Mandatory Kira Talent written and video supplementary application", deadline: "February 15, 2027", source: "https://www.queensu.ca/admission/applying/supplementary-application", practiceFocus: "initiative, adaptability, teamwork, impact, perspective, and reflection" },
  { id: "queens-nursing", university: "Queen's University", program: "Nursing", requirement: "Mandatory Kira Talent written and video supplementary application", deadline: "February 15, 2027", source: "https://www.queensu.ca/admission/applying/supplementary-application", practiceFocus: "empathy, teamwork, adaptability, responsibility, communication, and reflection" },

  { id: "western-music", university: "Western University", program: "Music", requirement: "Audition and interview", deadline: "February 1, 2027", source: "https://welcome.uwo.ca/next-steps/apply/submit-forms.html", practiceFocus: "repertoire, interpretation, musical goals, preparation, and performance reflection" },
  { id: "western-visual-arts", university: "Western University", program: "Visual Arts · Studio", requirement: "Online portfolio and personal statement", deadline: "February 15, 2027", source: "https://welcome.uwo.ca/next-steps/apply/submit-forms.html", practiceFocus: "portfolio selection, creative process, influences, experimentation, and artistic goals" },
  { id: "western-sasah", university: "Western University", program: "School for Advanced Studies in Arts and Humanities", requirement: "Statement of Interest", deadline: "February 28, 2027", source: "https://welcome.uwo.ca/next-steps/apply/submit-forms.html", practiceFocus: "intellectual curiosity, interdisciplinary interests, community, and program fit" },
  { id: "western-cam", university: "Western University", program: "Commercial Aviation Management", requirement: "Supplementary Application Form", deadline: "March 1, 2027", source: "https://welcome.uwo.ca/next-steps/apply/submit-forms.html", practiceFocus: "aviation motivation, responsibility, teamwork, safety awareness, and goals" },
  { id: "western-engineering", university: "Western University", program: "Engineering", requirement: "CASPer assessment", deadline: "Eligible test dates run October 2026–March 2027", source: "https://welcome.uwo.ca/next-steps/apply/submit-forms.html", practiceFocus: "ethics, teamwork, communication, professionalism, empathy, and judgment" },
  { id: "western-wisc", university: "Western University", program: "Western Integrated Science", requirement: "Supplemental Application", deadline: "April 2027 · exact date to be confirmed", source: "https://welcome.uwo.ca/next-steps/apply/submit-forms.html", practiceFocus: "scientific curiosity, interdisciplinary thinking, teamwork, and research interest" },

  { id: "uvic-music", university: "University of Victoria", program: "Bachelor of Music", requirement: "Audition", deadline: "February 15 · confirm current cycle", source: "https://www.uvic.ca/finearts/music/undergrad/apply/index.php", practiceFocus: "repertoire, interpretation, technique, preparation, and musical goals" },
  { id: "uvic-music-computer-science", university: "University of Victoria", program: "Music and Computer Science", requirement: "Supplemental application", deadline: "Confirm current program deadline", source: "https://www.uvic.ca/finearts/music/undergrad/apply/index.php", practiceFocus: "music, computing, interdisciplinary goals, projects, and preparation" },
  { id: "ualberta-music", university: "University of Alberta", program: "Music", requirement: "Audition application and audition or portfolio review", deadline: "Confirm current Music deadline", source: "https://www.ualberta.ca/en/music/admissions/undergraduate-admissions/application-process.html", practiceFocus: "repertoire, musical background, interpretation, goals, and readiness" },
  { id: "ualberta-art-design", university: "University of Alberta", program: "BFA or BDes", requirement: "Mandatory portfolio application", deadline: "March 1 · confirm current cycle", source: "https://www.ualberta.ca/en/art-design/admissions/undergraduate-application/index.html", practiceFocus: "portfolio curation, creative process, experimentation, context, and goals" },
  { id: "umanitoba-music", university: "University of Manitoba", program: "Bachelor of Music or Bachelor of Jazz Studies", requirement: "Audition, interview, and musicianship requirements", deadline: "January 15, 2026 · historical cycle", source: "https://umanitoba.ca/explore/undergraduate-admissions/requirements/music", practiceFocus: "repertoire, musicianship, interpretation, goals, and audition readiness" },
  { id: "umanitoba-fine-arts", university: "University of Manitoba", program: "Fine Arts Studio · BFA or diploma", requirement: "Portfolio and supporting written statement", deadline: "March 1, 2026 · historical cycle", source: "https://umanitoba.ca/explore/undergraduate-admissions/requirements/fine-arts", practiceFocus: "portfolio selection, artistic intent, process, experimentation, and reflection" },
  { id: "mcgill-global-engineering", university: "McGill University", program: "Bachelor of Global Engineering", requirement: "Personal statement and possible video interview", deadline: "Confirm in McGill Applicant Portal", source: "https://www.mcgill.ca/undergraduate-admissions/apply/submit-documents", practiceFocus: "global motivation, engineering preparation, cross-cultural goals, and fit" },
  { id: "mcgill-music", university: "McGill University", program: "Schulich School of Music undergraduate programs", requirement: "Program-specific materials and audition requirements", deadline: "Confirm current Music deadline", source: "https://www.mcgill.ca/music/admissions/undergraduate/materials", practiceFocus: "repertoire, interpretation, musical development, goals, and audition preparation" },
];

const exactFormatProfileIds = new Set(["queens-health-sciences", "queens-nursing", "waterloo-engineering"]);

const verifiedSupplementalProfiles = verifiedSupplementalSeeds.filter((item) => !exactFormatProfileIds.has(item.id)).map((item) => ({
  id: item.id,
  university: item.university,
  program: item.program,
  deadline: ["mcmaster-engineering", "mcmaster-computer-science", "mcmaster-ibiomed", "mcmaster-btech"].includes(item.id) ? "January 28, 2027 · confirm in applicant portal" : item.deadline,
  source: item.source,
  note: `${item.university} lists this requirement for ${item.program}: ${item.requirement}. Requirements can change by admission cycle, applicant type, campus, or stream, so the official source and applicant portal control.`,
  timerAccuracy: ["mcmaster-engineering", "mcmaster-computer-science", "mcmaster-ibiomed", "mcmaster-btech"].includes(item.id)
    ? "Three video responses and one 10-minute written response. Video response: 2 minutes. McMaster lists conflicting preparation times (10 seconds and 1 minute); confirm your invitation. No fixed preparation countdown is imposed here."
    : "No timer is claimed unless the university publishes the exact current timing. Use the live portal timing for any assessed response.",
  practice: {
    written: {
      seconds: ["mcmaster-engineering", "mcmaster-computer-science", "mcmaster-ibiomed", "mcmaster-btech"].includes(item.id) ? 600 : null,
      limit: null,
      questions: [
        `Portal prompt workspace: paste the exact current question for ${item.program} before drafting.`,
        `Original practice: Describe one experience that demonstrates ${item.practiceFocus}. Explain your individual actions, evidence of impact, and what you learned.`,
      ],
    },
    video: {
      prepSeconds: null,
      responseSeconds: ["mcmaster-engineering", "mcmaster-computer-science", "mcmaster-ibiomed", "mcmaster-btech"].includes(item.id) ? 120 : null,
      questions: [
        `Original practice: Why does ${item.program} fit your preparation and goals? Use specific evidence rather than general praise.`,
        `Original practice: Describe a difficult decision or setback related to ${item.practiceFocus}. What did you do and what changed afterward?`,
      ],
    },
  },
  components: [
    {
      title: item.requirement,
      format: "Verified program-specific requirement",
      help: "Open the official source and your applicant portal together. Record every prompt, file rule, reference, test, fee, and deadline before beginning.",
    },
    {
      title: "Program-specific evidence bank",
      format: item.practiceFocus,
      help: "Prepare several truthful examples with context, your individual decisions, measurable or observable results, and meaningful reflection.",
    },
    {
      title: "Final submission audit",
      format: "Prompts, files, technology, references, and confirmation",
      help: "Answer every part of each live prompt, follow file and timing rules exactly, verify references, test equipment, and save proof of submission.",
    },
  ],
}));

export const applicationProfiles = [
  {
    id: "ubc-sauder-bcom", university: "University of British Columbia", program: "Sauder Bachelor of Commerce", deadline: "Confirm in the UBC application", source: "https://www.sauder.ubc.ca/programs/bachelors-degrees/bachelor-commerce/program-admission",
    communitySource: "https://www.reddit.com/r/ubcsauder/comments/1h3zii1/sauder_interview_questions/",
    note: "UBC Sauder assesses a Personal Profile containing short written responses and video interview components.",
    timerAccuracy: "No countdown is shown because Sauder's current official page does not publish a reliable universal timer for this cycle. Follow the instructions inside your application.",
    practice: {
      written: { seconds: null, limit: null, questions: ["Official Commerce prompt focus: explain your response to a problem or unfamiliar situation, including the outcome and learning.", "Official Commerce prompt focus: explain your positive community impact and how a Sauder education could strengthen that work.", "Official UBC prompt focus: develop one or two meaningful activities by explaining your role and learning."] },
      video: { prepSeconds: null, responseSeconds: null, questions: ["Applicant-reported past question: Describe a time you helped someone in need. How did you make an impact?", "Applicant-reported past question: What could you talk about for hours?", "Applicant-reported past question: Describe a time you misunderstood a task. What did you do next?", "Official question type: respond to a fictional creative challenge and explain your approach."] },
    },
    components: [
      { title: "Personal Profile responses", format: "Written · prompts and limits appear in the UBC application", help: "Build specific stories showing your role, decisions, impact, and reflection. Paste each current UBC prompt into the workspace before drafting." },
      { title: "Activity and achievement details", format: "Structured application information", help: "Prepare accurate dates, roles, time commitments, responsibilities, and verifiable impact for your strongest experiences." },
      { title: "Video interview preparation", format: "Recorded responses", help: "Practice concise spoken answers using context, action, outcome, and reflection. Use bullet points rather than memorizing a script." },
    ],
  },
  ...ubcGeneralProfiles,
  ...ubcSpecialProfiles,
  ...verifiedSupplementalProfiles,
  {
    id: "queens-commerce", university: "Queen's University", program: "Smith Bachelor of Commerce", deadline: "February 15, 2027", source: "https://smith.queensu.ca/bcom/program-details/supplementary-application.php",
    note: "Queen's Commerce uses Kira Talent. Questions are randomly assigned and are not released in advance.",
    verification: "Official Queen's and Smith format verified August 28, 2026",
    timerAccuracy: "Matches Queen's published format: 10-minute written response (335-word maximum), then 2-minute preparation and 2-minute video response.",
    practice: {
      written: { seconds: 600, limit: 335, questions: ["Describe a significant challenge you faced. How did you respond, and how has the experience shaped what you do now?", "Tell us about a difficult obstacle that required you to adapt. What actions did you take and what did you learn?"] },
      video: { prepSeconds: 120, responseSeconds: 120, questions: ["Describe a time a team faced a setback. How did you respond to others and what was the outcome?", "Tell us about a time you had to reconsider your approach after hearing a different perspective."] },
    },
    components: [
      { title: "Timed written response", format: "10 minutes to write and submit", help: "Practice quickly choosing one relevant example, answering the question directly, explaining your decisions, and ending with meaningful learning." },
      { title: "Timed video response", format: "2 minutes preparation · 2 minutes recording", help: "Practice speaking naturally under time pressure. Show initiative, adaptability, respect for others, ownership, impact, and reflection." },
      { title: "Technical and practice check", format: "Kira Talent practice required", help: "Use the official practice environment, check camera and microphone access, choose a quiet location, and keep your Queen's ID ready." },
    ],
  },
  ...[
    { id: "queens-health-sciences", program: "Bachelor of Health Sciences", focus: "initiative, adaptability, persistence, problem-solving, reflection, teamwork, and respect for others" },
    { id: "queens-nursing", program: "Bachelor of Nursing Science · four-year program", focus: "initiative, adaptability, persistence, problem-solving, reflection, teamwork, and respect for others" },
  ].map((item) => ({
    id: item.id,
    university: "Queen's University",
    program: item.program,
    deadline: "February 15, 2027",
    source: "https://www.queensu.ca/admission/applying/supplementary-application",
    note: "Queen's requires one randomly assigned written response and one randomly assigned video response. The questions are not released in advance.",
    verification: "Official Queen's format verified August 28, 2026",
    timerAccuracy: "Matches Queen's published format: 10-minute written response (335-word maximum), followed by 2 minutes of preparation and a 2-minute video response.",
    practice: {
      written: { seconds: 600, limit: 335, questions: [`Original Queen's-style practice: Describe a significant challenge that required ${item.focus}. Explain what you did, what you learned, and how it changed your approach.`, "Original Queen's-style practice: Tell us about an obstacle that required initiative or adaptability. What decisions did you make and what did you learn?"] },
      video: { prepSeconds: 120, responseSeconds: 120, questions: ["Original Queen's-style practice: Describe a time a team encountered a setback. What was your contribution, how did you consider other perspectives, and what did you learn?", "Original Queen's-style practice: Tell us about a complex situation that required composure and self-direction. What did you do and what changed afterward?"] },
    },
    components: [
      { title: "Timed written response", format: "10 minutes · 335-word maximum", help: "Choose one specific challenge, explain your decisions and problem-solving, then reflect on how the experience shaped you." },
      { title: "Timed video response", format: "2 minutes preparation · 2 minutes recording", help: "Answer the assigned question directly and naturally. Show ownership, awareness of others, impact, and meaningful reflection." },
      { title: "Kira check-in and practice", format: "Official practice is part of check-in", help: "Test your camera and microphone in Kira. Queen's says its practice questions can be completed repeatedly and are not assessed." },
    ],
  })),
  {
    id: "waterloo-engineering", university: "University of Waterloo", program: "Engineering · all programs except Architecture", deadline: "February 1, 2027 · 11:59 p.m. ET", source: "https://uwaterloo.ca/engineering/future-students/applying/online-interviews",
    note: "Waterloo Engineering requires the Admission Information Form and a recorded online interview. The current interview question is published by Waterloo.",
    verification: "Official Waterloo format verified August 28, 2026",
    timerAccuracy: "Waterloo publishes a 90-second response limit for the Engineering motivation video. No preparation countdown is stated on the public page, so practice begins with the response timer.",
    practice: {
      written: { seconds: null, limit: null, questions: ["Portal prompt workspace: paste each current Admission Information Form question here and follow the limit shown in your applicant portal."] },
      video: { prepSeconds: null, responseSeconds: 90, questions: ["Official current question: What experience(s) inside or outside the classroom motivated you to apply to your chosen engineering program?"] },
    },
    components: [
      { title: "Admission Information Form", format: "Required written form", help: "Complete the current AIF questions in your Waterloo applicant portal and follow each published character limit." },
      { title: "Engineering online interview", format: "One published question · 90-second video response", help: "Connect specific experiences to your chosen engineering program. Focus on your own motivation and evidence rather than general praise." },
      { title: "Scholarship questions", format: "Two non-graded yes/no questions", help: "Waterloo also asks about FIRST Robotics and demonstrated interest in entrepreneurship for scholarship purposes." },
    ],
  },
  {
    id: "waterloo-software-engineering", university: "University of Waterloo", program: "Software Engineering", deadline: "February 1, 2027 · 11:59 p.m. ET", source: "https://uwaterloo.ca/engineering/future-students/applying/online-interviews",
    note: "Software Engineering applicants complete the Engineering AIF and video interview plus a separate published written programming-experience response.",
    verification: "Official Waterloo format verified August 28, 2026",
    timerAccuracy: "Matches Waterloo's published Software Engineering response: 5 minutes and a 150-word maximum. The general Engineering video has a 90-second response limit.",
    practice: {
      written: { seconds: 300, limit: 150, questions: ["Official current question: For every programming language in which you have experience, list the language, number of months you have used it, and the capacity in which you used it (for example, courses, work experience, or self-education)."] },
      video: { prepSeconds: null, responseSeconds: 90, questions: ["Official current Engineering question: What experience(s) inside or outside the classroom motivated you to apply to your chosen engineering program?"] },
    },
    components: [
      { title: "Admission Information Form", format: "Required written form", help: "Complete every current AIF question and follow the limits shown in your Waterloo applicant portal." },
      { title: "Engineering video interview", format: "One published question · 90-second response", help: "Explain the experiences that specifically motivated Software Engineering and what you learned from them." },
      { title: "Programming-experience response", format: "5 minutes · 150-word maximum", help: "Prepare an accurate inventory of languages, months of actual use, and context. Waterloo asks for experience using each language, not how long you have known it." },
    ],
  },
  {
    id: "rotman-commerce", university: "University of Toronto", program: "Rotman Commerce", deadline: "Confirm in Join U of T", source: "https://rotmancommerce.utoronto.ca/future-students/our-supplemental-application/",
    note: "Rotman Commerce provides its current written and video instructions through the Join U of T portal and Kira Talent.",
    timerAccuracy: "Practice settings only — use the instructions in Join U of T for the current official timing.",
    practice: {
      written: { seconds: 900, limit: null, questions: ["Describe an issue in business or society that interests you and explain why.", "Tell us about an experience that changed how you approach teamwork or leadership."] },
      video: { prepSeconds: 60, responseSeconds: 90, questions: ["Describe a time you used evidence to make a difficult decision.", "Tell us about a setback and how it changed your next action."] },
    },
    components: [
      { title: "Written response preparation", format: "Kira Talent · current format shown in applicant portal", help: "Paste the live prompt from your portal, identify every part of it, and prepare a direct response supported by one detailed example." },
      { title: "Video response preparation", format: "Recorded interview component", help: "Create a flexible bank of examples covering teamwork, leadership, setbacks, decision-making, and interest in business." },
      { title: "Practice sessions", format: "Unlimited official practice sessions", help: "Use the practice environment to become comfortable with timing and technology without memorizing an answer." },
    ],
  },
  {
    id: "schulich-bba", university: "York University", program: "Schulich BBA", deadline: "February 1, 2027 · 11:59 p.m. ET", source: "https://schulich.yorku.ca/admissions/suppapp/",
    note: "Schulich requires a Leadership Profile before applicants continue to the timed writing and video components.",
    timerAccuracy: "Practice settings only — confirm the current timed-component instructions in your Kira invitation.",
    practice: {
      written: { seconds: 600, limit: null, questions: ["Describe an initiative you took that created a meaningful result for others.", "Tell us about a challenge that tested your resourcefulness and how you handled it."] },
      video: { prepSeconds: 60, responseSeconds: 90, questions: ["Which of your leadership experiences best demonstrates personal growth, and why?", "Tell us about a time collaboration changed the result of a project."] },
    },
    components: [
      { title: "Leadership Profile", format: "3–5 experiences · references required", help: "Record each experience, your role, organization, dates, responsibilities, impact, growth, and a reference who can verify it." },
      { title: "Timed writing exercise", format: "Kira Talent", help: "Practice answering directly with a clear example that demonstrates initiative, collaboration, integrity, resilience, or resourcefulness." },
      { title: "Video interviews", format: "Kira Talent", help: "Prepare a varied story bank and practice concise, natural delivery. Upload the completed Leadership Profile before beginning timed components." },
    ],
  },
  {
    id: "western-ivey-aeo", university: "Western University", program: "Ivey Advanced Entry Opportunity (AEO)", deadline: "2027 deadline not yet published · confirm in the Ivey application portal", source: "https://www.ivey.uwo.ca/hba/admissions/secondary-school-students/",
    note: "Ivey AEO is a separate conditional pre-admission status, not a first-year Western degree. Applicants first choose any Western, Huron, or King's program and submit a separate Ivey AEO application.",
    timerAccuracy: "Ivey confirms that each Kira question has preparation time and a timed response, but does not publish the exact per-question limits on its public page. Use the portal's live timing.",
    practice: {
      written: { seconds: null, limit: 500, questions: ["Official activity-essay focus: choose one significant extracurricular, employment, volunteer, or entrepreneurial experience and demonstrate leadership, initiative, achievement, commitment, integrity, resilience, and reflection.", "Official activity-essay focus: explain a second substantial activity, emphasizing your individual decisions, influence on others, verifiable results, and growth."] },
      video: { prepSeconds: null, responseSeconds: null, questions: ["Original Ivey-style practice: Tell us about a time you led without having formal authority.", "Original Ivey-style practice: Describe a difficult team decision and how you handled competing perspectives.", "Original Ivey-style practice: Which commitment best demonstrates your integrity, and what did it cost you?", "Original Ivey-style practice: Describe a setback that changed how you lead.", "Original Ivey-style practice: What meaningful contribution are you most proud of, and how do you know it mattered?"] },
    },
    components: [
      { title: "Two leadership activity essays", format: "Maximum 500 words each", help: "Select two experiences with sustained responsibility and enough complexity to show decisions, teamwork, initiative, results, integrity, resilience, and reflection." },
      { title: "Activities, awards, and references", format: "Up to five additional activities · non-academic awards · verifier for every activity", help: "Record dates, hours, role, organization, outcomes, and accurate reference contact information. Ivey states that applications without verified references will not be considered." },
      { title: "Kira video assessment", format: "Five questions · timed preparation and response · one sitting", help: "Build a flexible story bank and complete unlimited practice before starting. Once the formal interview begins, all five questions must be completed in one attempt." },
    ],
  },
] as const;
