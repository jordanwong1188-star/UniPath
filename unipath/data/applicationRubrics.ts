export type RubricEvidence =
  | "Official published rubric"
  | "Official criteria converted to practice scale"
  | "UniPath coaching framework aligned to official requirements";

export type RubricCriterion = {
  name: string;
  description: string;
  five: string;
};

export type ApplicationRubric = {
  title: string;
  evidence: RubricEvidence;
  source: string;
  note: string;
  criteria: RubricCriterion[];
};

type ProfileSummary = {
  id: string;
  university: string;
  program: string;
  source: string;
};

const criterion = (
  name: string,
  description: string,
  five: string
): RubricCriterion => ({ name, description, five });

const officialRubrics: Record<string, Omit<ApplicationRubric, "source">> = {
  ubc: {
    title: "UBC Personal Profile assessment framework",
    evidence: "Official criteria converted to practice scale",
    note: "UBC publishes four assessment criteria but does not publish its internal numeric reader scorecard. UniPath’s 1–5 levels are a transparent practice conversion.",
    criteria: [
      criterion("Engagement and accomplishment", "How meaningfully the applicant pursues interests, manages responsibilities, contributes, and learns from experience.", "Uses specific, credible evidence to show sustained engagement or responsibility, meaningful contribution, and clear learning—not merely prestigious titles."),
      criterion("Leadership", "Responsibility or initiative that benefits others, including informal leadership.", "Shows a real need or goal, the applicant’s decisions and initiative, how others were considered, an observable result, and honest reflection."),
      criterion("Substance", "Depth, specificity, relevance, and meaningful reflection.", "Answers every part of the prompt with well-chosen details, clear personal contribution, supported impact, and insight that goes beyond a lesson slogan."),
      criterion("Voice", "Authenticity, individuality, clarity, and ownership of the response.", "Sounds recognizably personal and natural, uses precise language, avoids clichés or résumé repetition, and communicates mature self-awareness."),
    ],
  },
  queens: {
    title: "Queen’s Supplementary Application rubric",
    evidence: "Official published rubric",
    note: "Queen’s publishes its 1–5 criteria. The exact emphasis differs between the written and video prompt, so students must still answer the live question directly.",
    criteria: [
      criterion("Specific and relevant example", "How clearly the response addresses the assigned question through a thoughtful example.", "Shares a thoughtful, specific example that directly answers every part of the prompt."),
      criterion("Initiative and adaptability", "Evidence of initiative, persistence, adaptability, and meaningful problem-solving.", "Shows strong initiative and adaptability through clear decisions, obstacles, adjustments, and reasoning."),
      criterion("Perspective and teamwork", "Appreciation of other perspectives, responsibility, and awareness of team impact.", "Genuinely considers others’ perspectives, owns personal actions, and understands how those actions affected the team."),
      criterion("Reflection and growth", "What the applicant learned and how it shaped later perspective or behaviour.", "Provides specific, convincing reflection showing how learning changed later thinking, behaviour, or choices."),
    ],
  },
  ivey: {
    title: "Ivey AEO activity assessment framework",
    evidence: "Official criteria converted to practice scale",
    note: "Ivey publishes the qualities it expects activities to demonstrate, but not its internal numerical weighting. UniPath’s 1–5 scale converts those official qualities into practice targets.",
    criteria: [
      criterion("Leadership and initiative", "Whether the applicant recognized a need, took ownership, made decisions, and moved people or work forward.", "Demonstrates repeated initiative through consequential personal decisions—not merely holding a title or completing assigned tasks."),
      criterion("Teamwork and influence", "How the applicant worked with, supported, persuaded, or developed others.", "Shows specific interpersonal choices, respect for others, constructive influence, and a result the applicant could not have achieved alone."),
      criterion("Achievement and impact", "The significance and credibility of what was accomplished.", "Provides verifiable outcomes and explains why they mattered to the organization, people served, or project—not just the applicant."),
      criterion("Commitment and resilience", "Sustained effort, responsibility, response to setbacks, and follow-through.", "Shows sustained commitment through difficulty, concrete adaptation, and follow-through, with no exaggeration of hardship."),
      criterion("Integrity", "Honest judgment, accountability, and ethical behaviour.", "Explains a real tension or responsibility, owns trade-offs or mistakes, and shows principled action rather than simply claiming strong values."),
      criterion("Breadth and reflection", "Range of involvement and depth of learning across experiences.", "Connects detailed reflection to future leadership behaviour while the overall application shows meaningful breadth without résumé dumping."),
    ],
  },
  waterlooEngineering: {
    title: "Waterloo Engineering AIF and interview practice rubric",
    evidence: "Official criteria converted to practice scale",
    note: "Waterloo publishes sought qualities and current question formats, not its internal reader scorecard. The 1–5 levels are UniPath’s practice conversion.",
    criteria: [
      criterion("Engineering motivation", "Specific experiences that explain why this engineering program is the right academic direction.", "Connects concrete experiences to the chosen discipline and Waterloo opportunities without generic reputation-based praise."),
      criterion("Time management and responsibility", "Evidence of balancing meaningful commitments and following through.", "Shows realistic priorities, decisions under pressure, sustained responsibility, and what the applicant learned about managing competing demands."),
      criterion("Interpersonal and leadership skills", "How the applicant contributes, communicates, collaborates, and leads.", "Uses a specific example to demonstrate communication and influence while accurately separating individual and team contributions."),
      criterion("Range of interests and work readiness", "Breadth of interests and experience in work-like environments, including paid work or volunteering.", "Explains what varied experiences reveal about dependability, initiative, adaptability, and readiness for co-op rather than merely listing them."),
      criterion("Authenticity and clarity", "A truthful, individual response in the applicant’s own voice.", "Is concise, specific, candid, and clearly self-written, with no inflated technical claims or attempt to guess a ‘perfect’ applicant."),
    ],
  },
  mcmasterEngineering: {
    title: "McMaster Engineering supplementary practice rubric",
    evidence: "Official criteria converted to practice scale",
    note: "McMaster explicitly does not release its internal rubric. These 1–5 criteria convert the qualities McMaster publicly says trained reviewers assess.",
    criteria: [
      criterion("Thoughtful self-reflection", "Depth of understanding about the applicant’s decisions, assumptions, learning, and growth.", "Moves beyond describing events to examine reasoning, limitations, learning, and how later behaviour changed."),
      criterion("Problem-solving and critical thinking", "How the applicant defines a challenge, considers information or constraints, and selects an approach.", "Explains a credible decision process, alternatives or constraints, adaptation, and what the result reveals about the approach."),
      criterion("Collaboration", "How the applicant communicates and works with people whose needs or views may differ.", "Shows listening, constructive contribution, conflict navigation, shared ownership, and awareness of personal impact on others."),
      criterion("Communication", "Directness, organization, relevance, and clarity under the assessment format.", "Answers the prompt immediately, develops one coherent example, uses precise language, and finishes within the verified limit."),
      criterion("Personal growth", "Evidence that reflection resulted in a meaningful change.", "Identifies a non-obvious lesson and demonstrates a concrete later change in behaviour, judgment, or approach."),
    ],
  },
  rotman: {
    title: "Rotman Commerce selection-criteria practice rubric",
    evidence: "Official criteria converted to practice scale",
    note: "Rotman publishes the qualities it seeks but not a numeric internal rubric. UniPath converts those official qualities into a 1–5 practice scale.",
    criteria: [
      criterion("Communication", "Clear, direct and well-organized written or spoken expression.", "Answers every part of the prompt with concise structure, precise evidence, natural delivery, and no memorized-sounding filler."),
      criterion("Teamwork", "Understanding of collaboration, roles, perspectives, and shared outcomes.", "Shows specific choices that improved collaboration, gives fair credit, handles tension maturely, and explains the applicant’s effect on the team."),
      criterion("Leadership and community", "Initiative, responsibility, influence, and contribution to others.", "Demonstrates meaningful initiative and responsible influence through a specific example with credible community impact."),
      criterion("Business curiosity", "A grounded passion for business and awareness of why it matters.", "Connects a specific business issue, experience, or question to genuine curiosity and future learning—not prestige, salary, or generic ambition."),
      criterion("Reflection", "Self-awareness and learning demonstrated through the example.", "Explains how the experience challenged an assumption or changed a later decision, with specific rather than rehearsed insight."),
    ],
  },
};

function categoryRubric(profile: ProfileSummary): ApplicationRubric {
  const text = `${profile.id} ${profile.program}`.toLowerCase();
  const base = {
    source: profile.source,
    evidence: "UniPath coaching framework aligned to official requirements" as RubricEvidence,
  };

  if (/music|audition|theatre|drama/.test(text)) {
    return {
      ...base,
      title: `${profile.program} audition and interview practice rubric`,
      note: "The institution publishes the required audition or interview, but not a complete 1–5 admissions scorecard. This framework helps students prepare without claiming to reproduce adjudicator scoring.",
      criteria: [
        criterion("Technical preparation", "Readiness, accuracy, control, and command of required material.", "Demonstrates secure preparation and recovery under pressure; exact artistic performance still requires a qualified teacher or adjudicator."),
        criterion("Interpretation and artistic intention", "Clarity and individuality of musical or dramatic choices.", "Makes coherent, convincing choices supported by understanding of style, text, context, or repertoire."),
        criterion("Program motivation", "Why this discipline and program fit the applicant’s development.", "Uses specific training, experiences, questions, and goals to explain fit without relying on reputation."),
        criterion("Reflection and coachability", "Ability to evaluate preparation, respond to feedback, and identify next steps.", "Names strengths and limitations honestly, explains how feedback changed the work, and identifies precise next steps."),
        criterion("Communication and presence", "Clarity, professionalism, and natural interaction in the interview.", "Responds directly and naturally with specific evidence; live presence cannot be fully assessed from a written transcript."),
      ],
    };
  }

  if (/art|design|architecture|portfolio|media/.test(text)) {
    return {
      ...base,
      title: `${profile.program} portfolio practice rubric`,
      note: "The school publishes portfolio or creative-submission requirements but may not publish internal weights. This scale is an evidence-based coaching framework, not an official jury score.",
      criteria: [
        criterion("Idea and intention", "Strength and clarity of the underlying question, concept, or purpose.", "Presents a distinctive, well-developed idea and explains why it matters without overexplaining the work."),
        criterion("Process and experimentation", "Evidence of exploration, iteration, risk-taking, and learning.", "Shows meaningful alternatives, revisions, failures, and decisions rather than only polished final products."),
        criterion("Craft and communication", "How effectively form, material, technique, or medium communicates the intention.", "Demonstrates controlled execution appropriate to the idea while making deliberate, explainable choices."),
        criterion("Curation and range", "Selection, sequencing, coherence, and breadth of submitted work.", "Creates a coherent portfolio with purposeful variety; every included work adds evidence rather than filling space."),
        criterion("Reflection and authorship", "The applicant’s role, judgment, influences, and critical self-awareness.", "Clearly distinguishes personal work, cites collaboration or influences honestly, and offers specific critical reflection."),
      ],
    };
  }

  if (/nurs|health|midwi|paramedic|casper|pharm/.test(text)) {
    return {
      ...base,
      title: `${profile.program} judgment and reflection practice rubric`,
      note: "This framework aligns with the published assessment format and professional qualities commonly required by the program. It is not presented as a confidential institutional rubric.",
      criteria: [
        criterion("Ethical judgment", "Recognition of responsibilities, competing considerations, and defensible action.", "Identifies key stakeholders and tensions, avoids unsupported assumptions, chooses a proportionate action, and explains its limits."),
        criterion("Empathy and perspective", "Understanding of how a situation may affect people differently.", "Considers multiple perspectives respectfully without speaking for others or reducing empathy to a slogan."),
        criterion("Communication", "Clarity, listening, professionalism, and appropriate response.", "Explains what would be said or done, why that approach fits the person and context, and how understanding would be checked."),
        criterion("Teamwork and accountability", "Responsible collaboration, boundaries, and ownership.", "Balances initiative with consultation, owns personal responsibility, and escalates or seeks support appropriately."),
        criterion("Reflection and growth", "Ability to learn from uncertainty, feedback, or mistakes.", "Acknowledges limitations and describes a concrete change in future behaviour or decision-making."),
      ],
    };
  }

  if (/engineer|computer|technology|science|math/.test(text)) {
    return {
      ...base,
      title: `${profile.program} analytical application practice rubric`,
      note: "The program publishes a supplemental requirement but not a complete numeric admissions rubric. This framework converts relevant published expectations into transparent practice targets.",
      criteria: [
        criterion("Program motivation", "Specific understanding of the field and reasons for pursuing it.", "Connects concrete experiences and questions to the exact program, showing informed curiosity rather than generic enthusiasm."),
        criterion("Problem-solving", "Definition of the challenge, reasoning, constraints, decisions, and adaptation.", "Explains a credible reasoning process and how evidence or feedback changed the approach."),
        criterion("Initiative and execution", "Personal ownership in moving an idea or task forward.", "Shows specific decisions and sustained follow-through with an observable result, while accurately representing the applicant’s role."),
        criterion("Collaboration and communication", "Contribution to collective work and explanation of complex ideas.", "Shows listening, clear communication, fair credit, and effective adjustment to others’ needs or expertise."),
        criterion("Reflection and intellectual growth", "Learning about the field, self, or approach.", "Identifies a specific change in understanding and demonstrates how it influenced later work or goals."),
      ],
    };
  }

  if (/business|commerce|management|beedie|afm|aviation/.test(text)) {
    return {
      ...base,
      title: `${profile.program} business application practice rubric`,
      note: "The program publishes supplemental requirements but not a full internal 1–5 rubric. This framework emphasizes qualities supported by its public admissions information.",
      criteria: [
        criterion("Initiative and ownership", "Recognition of an opportunity or problem and personal responsibility for action.", "Shows consequential decisions, proactive action, and follow-through beyond an assigned role."),
        criterion("Leadership and collaboration", "Influence, teamwork, communication, and consideration of others.", "Explains how the applicant worked through people—not around them—to improve a shared outcome."),
        criterion("Impact and evidence", "Credibility and significance of the result.", "Uses verifiable quantitative or qualitative evidence and explains why the result mattered."),
        criterion("Judgment and integrity", "Quality of decisions, trade-offs, accountability, and honesty.", "Addresses a genuine tension or constraint, owns mistakes or limits, and explains a responsible decision."),
        criterion("Reflection and fit", "Learning and its connection to future study.", "Provides specific personal learning and an informed connection to the program without generic prestige claims."),
      ],
    };
  }

  return {
    ...base,
    title: `${profile.program} supplemental practice rubric`,
    note: "The university has not published a complete numeric reader rubric for this requirement. UniPath’s scale is a transparent coaching framework based on the official component and prompt.",
    criteria: [
      criterion("Prompt coverage", "How completely and directly the response answers the live question.", "Answers every explicit and implied part of the exact prompt with a coherent central response."),
      criterion("Specific evidence", "Quality, relevance, and credibility of examples.", "Uses precise, verifiable details that prove claims without exaggeration or résumé dumping."),
      criterion("Personal contribution", "Clarity about the applicant’s decisions, actions, and responsibility.", "Distinguishes individual contribution from group work and explains the reasoning behind key actions."),
      criterion("Impact", "What changed and why it mattered.", "Provides credible outcomes and explains their significance to people, work, or understanding."),
      criterion("Reflection and voice", "Depth of learning, self-awareness, authenticity, and clarity.", "Offers non-obvious reflection connected to later behaviour in a natural, recognizably personal voice."),
    ],
  };
}

export function getApplicationRubric(profile: ProfileSummary): ApplicationRubric {
  const id = profile.id.toLowerCase();

  if (id.startsWith("ubc-")) {
    return { ...officialRubrics.ubc, source: profile.source };
  }
  if (id.startsWith("queens-")) {
    return {
      ...officialRubrics.queens,
      source: "https://www.queensu.ca/admission/applying/supplementary-application-rubric",
    };
  }
  if (id === "western-ivey-aeo") {
    return { ...officialRubrics.ivey, source: profile.source };
  }
  if (id === "waterloo-engineering") {
    return { ...officialRubrics.waterlooEngineering, source: profile.source };
  }
  if (id === "rotman-commerce") {
    return { ...officialRubrics.rotman, source: profile.source };
  }
  if (
    id === "mcmaster-engineering" ||
    id === "mcmaster-computer-science" ||
    id === "mcmaster-btech" ||
    id === "mcmaster-ibiomed"
  ) {
    return { ...officialRubrics.mcmasterEngineering, source: profile.source };
  }

  return categoryRubric(profile);
}

export const rubricScale = [
  { score: 1, label: "Weak", description: "Mostly absent, vague, unsupported, or off-prompt." },
  { score: 2, label: "Developing", description: "Some relevant material, but limited evidence, depth, or ownership." },
  { score: 3, label: "Competent", description: "Clear and relevant with reasonable evidence and reflection." },
  { score: 4, label: "Strong", description: "Specific, credible, thoughtful, well-structured, and clearly personal." },
  { score: 5, label: "Exceptional target", description: "Compelling and unusually insightful evidence that fully meets the criterion without exaggeration." },
] as const;
