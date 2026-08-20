"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Award, Check, CheckCircle2, Clock3, Copy, ExternalLink, FilePenLine, RefreshCw, Search, Sparkles } from "lucide-react";

const scholarships = [
  { name: "Loran Award", value: "Major renewable award", focus: "Character, service & leadership", eligibility: "Canadian citizens or permanent residents entering university", deadline: "October 15, 2026 · noon ET", url: "https://loranscholar.ca/the-program/how-to-apply/", tag: "Leadership" },
  { name: "Schulich Leader Scholarships", value: "$100,000–$120,000", focus: "STEM leadership & entrepreneurship", eligibility: "School-nominated Canadian graduating students entering eligible STEM programs", deadline: "School nomination required", url: "https://schulichleaders.com/apply/", tag: "STEM" },
  { name: "TD Scholarships for Community Leadership", value: "Up to $70,000", focus: "Sustained community leadership", eligibility: "Students completing high school or CEGEP in Canada", deadline: "Check current application cycle", url: "https://www.td.com/ca/en/about-td/ready-commitment/community-leadership-scholarship-for-canadians", tag: "Leadership" },
  { name: "Terry Fox Humanitarian Award", value: "Renewable national award", focus: "Humanitarian service, courage & determination", eligibility: "Canadian citizens, permanent residents, or landed immigrants pursuing a first degree or diploma", deadline: "Check current application cycle", url: "https://terryfoxawards.ca/applicant-information/", tag: "Service" },
] as const;

const reviewItems = ["I answered every part of the prompt", "I used a specific example", "I explained my personal contribution", "I showed impact with evidence", "I included reflection or growth", "My writing sounds like me", "I stayed within the word limit"];

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
  {
    id: "queens-commerce", university: "Queen's University", program: "Smith Bachelor of Commerce", deadline: "February 15, 2027", source: "https://smith.queensu.ca/bcom/program-details/supplementary-application.php",
    note: "Queen's Commerce uses Kira Talent. Questions are randomly assigned and are not released in advance.",
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
] as const;

export function ApplicationHub({ mode, initialApplicationId, showChooser = true }: { mode: "scholarships" | "applications"; initialApplicationId?: string; showChooser?: boolean }) {
  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState("All");
  const [prompt, setPrompt] = useState("");
  const [draft, setDraft] = useState("");
  const [limit, setLimit] = useState(500);
  const [checked, setChecked] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [applicationId, setApplicationId] = useState(initialApplicationId && applicationProfiles.some(item => item.id === initialApplicationId) ? initialApplicationId : applicationProfiles[0].id as string);
  const [practiceMode, setPracticeMode] = useState<"written" | "video">("written");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timerPhase, setTimerPhase] = useState<"prep" | "response">("response");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const results = useMemo(() => scholarships.filter((item) => {
    const text = `${item.name} ${item.focus} ${item.eligibility} ${item.tag}`.toLowerCase();
    return (!query.trim() || text.includes(query.toLowerCase())) && (focus === "All" || item.tag === focus);
  }), [focus, query]);

  const wordCount = draft.trim() ? draft.trim().split(/\s+/).length : 0;
  const selectedApplication = applicationProfiles.find(item => item.id === applicationId) ?? applicationProfiles[0];
  const practice = selectedApplication.practice[practiceMode];
  const questions = practice.questions;
  const configuredSeconds = practiceMode === "video" ? selectedApplication.practice.video.prepSeconds : selectedApplication.practice.written.seconds;
  const hasTimer = configuredSeconds !== null;
  const responseFeedback = useMemo(() => {
    const text = draft.trim();
    const lower = text.toLowerCase();
    const checks = [
      { label: "Specific example", pass: /\b(when|during|after|before|at my|in grade|last year)\b/i.test(text), advice: "Anchor the response in one identifiable moment instead of speaking generally." },
      { label: "Personal action", pass: /\b(i (created|organized|decided|asked|built|changed|led|helped|learned|responded|worked|proposed|started|improved))\b/i.test(text), advice: "State what you personally decided and did—not only what the team accomplished." },
      { label: "Evidence of impact", pass: /\b(\d+|result|increased|reduced|improved|raised|reached|because of this|as a result)\b/i.test(text), advice: "Show what changed using a result, observable outcome, or credible evidence." },
      { label: "Reflection and growth", pass: /\b(learned|realized|understood|now i|since then|changed my|taught me|going forward)\b/i.test(text), advice: "Explain how the experience changed your thinking or future behaviour." },
      { label: "Enough development", pass: wordCount >= (practiceMode === "video" ? 75 : 120), advice: practiceMode === "video" ? "Add enough detail for a developed spoken response while keeping it natural." : "Develop the example further; strong written responses usually need context, action, impact, and reflection." },
      { label: "Clear, readable sentences", pass: text.length > 0 && text.split(/[.!?]+/).filter(Boolean).length >= 3 && !/\b(very very|things and stuff|etc\.)\b/i.test(lower), advice: "Use complete, direct sentences and replace vague filler with precise wording." },
    ];
    const passed = checks.filter(item => item.pass).length;
    return { checks, score: Math.round((passed / checks.length) * 100), passed };
  }, [draft, practiceMode, wordCount]);

  useEffect(() => {
    setTimerRunning(false);
    setShowFeedback(false);
    setQuestionIndex(0);
    const firstPhase = practiceMode === "video" ? "prep" : "response";
    setTimerPhase(firstPhase);
    setSecondsLeft((practiceMode === "video" ? selectedApplication.practice.video.prepSeconds : selectedApplication.practice.written.seconds) ?? 0);
  }, [applicationId, practiceMode, selectedApplication]);

  useEffect(() => {
    if (!timerRunning) return;
    const timer = window.setInterval(() => setSecondsLeft(current => {
      if (current > 1) return current - 1;
      if (practiceMode === "video" && timerPhase === "prep") {
        setTimerPhase("response");
        return selectedApplication.practice.video.responseSeconds ?? 0;
      }
      setTimerRunning(false);
      return 0;
    }), 1000);
    return () => window.clearInterval(timer);
  }, [practiceMode, selectedApplication, timerPhase, timerRunning]);

  const resetTimer = () => {
    setTimerRunning(false);
    setShowFeedback(false);
    const firstPhase = practiceMode === "video" ? "prep" : "response";
    setTimerPhase(firstPhase);
    setSecondsLeft((practiceMode === "video" ? selectedApplication.practice.video.prepSeconds : selectedApplication.practice.written.seconds) ?? 0);
  };

  const timerText = `${Math.floor(secondsLeft / 60).toString().padStart(2, "0")}:${(secondsLeft % 60).toString().padStart(2, "0")}`;

  return <main className="min-h-screen bg-[#f4f1ea] text-[#172126]">
    <header className="border-b border-black/5 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#172126] font-bold text-white">U</span><span className="text-xl font-bold">UniPath</span></Link>
        <nav className="flex items-center gap-5 text-sm font-semibold"><Link href="/universities">Universities</Link><Link href="/programs">Programs</Link><Link href="/deadlines" className="hidden sm:block">Deadlines</Link></nav>
      </div>
    </header>

    <section className="bg-[#692f46] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]"><Sparkles className="h-4 w-4" /> Application Hub</div>
        <h1 className="mt-7 max-w-4xl text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">Funding and applications,<br /><span className="text-[#ffd48a]">organized around you.</span></h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">Find credible scholarships and turn supplemental prompts into an honest, specific application plan.</p>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
      <div className="grid grid-cols-2 rounded-2xl bg-[#e7dfd2] p-1.5 sm:max-w-xl">
        <Link href="/scholarships" className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${mode === "scholarships" ? "bg-white shadow-sm" : "text-gray-500"}`}><Award className="h-4 w-4" /> Scholarships</Link>
        <Link href="/applications" className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${mode === "applications" ? "bg-white shadow-sm" : "text-gray-500"}`}><FilePenLine className="h-4 w-4" /> Applications</Link>
      </div>

      {mode === "scholarships" ? <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-2xl bg-[#172126] p-5 text-white lg:sticky lg:top-6">
          <label className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">Search awards</label>
          <div className="mt-2 flex items-center gap-2 rounded-xl bg-white/10 px-3"><Search className="h-4 w-4 text-white/40" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Name or eligibility..." className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-white/35" /></div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-white/45">Focus</p>
          <div className="mt-2 space-y-1">{["All", "Leadership", "STEM", "Service"].map(item => <button type="button" key={item} onClick={() => setFocus(item)} className={`w-full cursor-pointer rounded-lg px-3 py-2.5 text-left text-sm ${focus === item ? "bg-[#ffd48a] font-semibold text-[#172126]" : "text-white/65 hover:bg-white/10"}`}>{item}</button>)}</div>
          <p className="mt-6 border-t border-white/10 pt-5 text-sm text-white/55">{results.length} matching opportunities</p>
        </aside>
        <div className="space-y-4">{results.map(item => <article key={item.name} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start"><div><span className="rounded-full bg-[#f1e6d2] px-3 py-1 text-xs font-semibold">{item.tag}</span><h2 className="mt-4 text-2xl font-semibold">{item.name}</h2><p className="mt-2 text-sm font-semibold text-[#8c4964]">{item.value}</p></div><a href={item.url} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#172126] px-4 py-3 text-sm font-semibold text-white">Official source <ExternalLink className="h-4 w-4" /></a></div>
          <div className="mt-6 grid gap-5 border-t border-black/5 pt-5 sm:grid-cols-3"><div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">Recognizes</p><p className="mt-2 text-sm leading-6 text-gray-600">{item.focus}</p></div><div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">Eligibility</p><p className="mt-2 text-sm leading-6 text-gray-600">{item.eligibility}</p></div><div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">Timing</p><p className="mt-2 text-sm leading-6 text-gray-600">{item.deadline}</p></div></div>
        </article>)}</div>
      </div> : <div className="mt-8">
        <section className="overflow-hidden rounded-3xl bg-[#172126] text-white shadow-sm">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ffd48a]">Your application path</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">{selectedApplication.program}</h2>
              <p className="mt-2 text-sm font-semibold text-white/75">{selectedApplication.university}</p>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">This workspace is built specifically around this program’s supplemental application.</p>
              {showChooser ? <><label htmlFor="application-profile" className="mt-6 block text-sm font-semibold">University and program</label><select id="application-profile" value={applicationId} onChange={e => setApplicationId(e.target.value)} className="mt-2 w-full cursor-pointer rounded-xl border border-white/15 bg-white px-4 py-3.5 text-sm font-semibold text-[#172126] outline-none focus:ring-2 focus:ring-[#ffd48a]">{applicationProfiles.map(item => <option key={item.id} value={item.id}>{item.university} — {item.program}</option>)}</select></> : <Link href="/applications" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/15">← Choose a different program</Link>}
              <div className="mt-5 rounded-2xl bg-white/8 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40">Deadline</p>
                <p className="mt-1 font-semibold text-[#ffd48a]">{selectedApplication.deadline}</p>
                <p className="mt-3 text-sm leading-6 text-white/65">{selectedApplication.note}</p>
                <a href={selectedApplication.source} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">View official requirements <ExternalLink className="h-4 w-4" /></a>
                {"communitySource" in selectedApplication ? <a href={selectedApplication.communitySource} target="_blank" rel="noreferrer" className="mt-3 flex items-center gap-2 text-xs font-semibold text-white/60 underline decoration-white/20 underline-offset-4">View applicant-reported question source <ExternalLink className="h-3.5 w-3.5" /></a> : null}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">What you will complete</p>
              <div className="mt-4 space-y-3">{selectedApplication.components.map((component, index) => <article key={component.title} className="rounded-2xl bg-white p-5 text-[#172126]">
                <div className="flex items-start gap-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f1e6d2] text-sm font-bold text-[#692f46]">{index + 1}</span><div><h3 className="font-semibold">{component.title}</h3><p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-[#8c4964]">{component.format}</p><p className="mt-3 text-sm leading-6 text-gray-600">{component.help}</p></div></div>
              </article>)}</div>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-[#692f46]/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
            <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8c4964]">Application practice room</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">Practice the real format</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">Prompts are labelled by evidence: official prompt focus, official question type, applicant-reported past question, or original practice question. Past questions are not guaranteed to repeat.</p></div>
            <div className="grid grid-cols-2 rounded-xl bg-[#f1e6d2] p-1">
              {(["written", "video"] as const).map(item => <button type="button" key={item} onClick={() => setPracticeMode(item)} className={`cursor-pointer rounded-lg px-5 py-2.5 text-sm font-semibold capitalize ${practiceMode === item ? "bg-white text-[#692f46] shadow-sm" : "text-gray-500"}`}>{item}</button>)}
            </div>
          </div>

          <div className="mt-7 grid gap-5 lg:grid-cols-[1fr_310px]">
            <div className="rounded-2xl bg-[#f7f4ee] p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3"><span className="rounded-full bg-[#692f46] px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-white">Practice question {questionIndex + 1}</span><button type="button" onClick={() => { setQuestionIndex(current => (current + 1) % questions.length); setDraft(""); setPrompt(""); resetTimer(); }} className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#692f46]"><RefreshCw className="h-4 w-4" /> New question</button></div>
              <p className="mt-6 text-xl font-semibold leading-8">{questions[questionIndex]}</p>
              {practiceMode === "written" ? <textarea value={draft} onChange={e => { setDraft(e.target.value); setShowFeedback(false); }} placeholder="Start writing when you start the timer..." className="mt-6 min-h-64 w-full resize-y rounded-xl border border-black/10 bg-white p-5 leading-7 outline-none focus:border-[#8c4964]" /> : <div className="mt-6 rounded-xl border border-dashed border-[#692f46]/25 bg-white p-5"><p className="font-semibold">Video response plan</p><p className="mt-2 text-sm leading-6 text-gray-500">During preparation, write only a few anchors: situation, your action, result, and reflection. When responding, look at the camera and speak naturally.</p><textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Short preparation notes..." className="mt-4 min-h-24 w-full resize-y rounded-lg border border-black/10 p-3 text-sm outline-none focus:border-[#8c4964]" /><label className="mt-4 block text-sm font-semibold">Response transcript <span className="font-normal text-gray-400">(for feedback)</span><textarea value={draft} onChange={e => { setDraft(e.target.value); setShowFeedback(false); }} placeholder="After practising aloud, type or paste what you said so UniPath can review its structure..." className="mt-2 min-h-36 w-full resize-y rounded-lg border border-black/10 p-3 font-normal leading-6 outline-none focus:border-[#8c4964]" /></label></div>}
              {practiceMode === "written" && <div className="mt-3 flex justify-between text-sm font-semibold"><span className="text-gray-500">{wordCount} words{selectedApplication.practice.written.limit ? ` / ${selectedApplication.practice.written.limit} maximum` : ""}</span>{selectedApplication.practice.written.limit && wordCount > selectedApplication.practice.written.limit ? <span className="text-red-600">Over the practice limit</span> : null}</div>}
            </div>

            <aside className="rounded-2xl bg-[#172126] p-6 text-white">
              {hasTimer ? <>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/45"><Clock3 className="h-4 w-4" /> {practiceMode === "video" ? timerPhase : "Writing time"}</div>
              <p aria-live="polite" className={`mt-5 font-mono text-6xl font-semibold tracking-tight ${secondsLeft === 0 ? "text-red-300" : "text-[#ffd48a]"}`}>{timerText}</p>
              {practiceMode === "video" && <p className="mt-3 text-sm text-white/55">The timer automatically moves from preparation to the recorded-response phase.</p>}
              <div className="mt-6 grid grid-cols-2 gap-2"><button type="button" onClick={() => secondsLeft > 0 && setTimerRunning(current => !current)} className="cursor-pointer rounded-xl bg-[#ffd48a] px-4 py-3 text-sm font-semibold text-[#172126]">{timerRunning ? "Pause" : secondsLeft === 0 ? "Finished" : "Start"}</button><button type="button" onClick={resetTimer} className="cursor-pointer rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/15">Reset</button></div>
              </> : <div className="rounded-xl bg-white/8 p-5"><Clock3 className="h-6 w-6 text-[#ffd48a]" /><p className="mt-4 text-xl font-semibold">No timer added</p><p className="mt-2 text-sm leading-6 text-white/60">This application does not publish a verified countdown for this component. Practice thoughtfully, then follow the live portal instructions.</p></div>}
              <div className="mt-6 border-t border-white/10 pt-5"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40">Accuracy note</p><p className="mt-2 text-sm leading-6 text-white/65">{selectedApplication.timerAccuracy}</p></div>
            </aside>
          </div>
          <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-[#692f46]/10 bg-[#fffaf5] p-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold">Finished this attempt?</p><p className="mt-1 text-sm text-gray-500">Get transparent rubric feedback before trying the next question.</p></div><button type="button" disabled={!draft.trim()} onClick={() => setShowFeedback(true)} className="cursor-pointer rounded-xl bg-[#692f46] px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">Finish practice & get feedback</button></div>
          {showFeedback ? <section className="mt-5 rounded-2xl bg-[#172126] p-6 text-white sm:p-8"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ffd48a]">Counsellor feedback</p><h3 className="mt-2 text-2xl font-semibold">{responseFeedback.score >= 84 ? "Strong foundation" : responseFeedback.score >= 60 ? "Promising—revise once more" : "Build more evidence before submitting"}</h3></div><div className="text-left sm:text-right"><p className="text-4xl font-semibold text-[#ffd48a]">{responseFeedback.score}%</p><p className="text-xs text-white/40">structure readiness · not an admission prediction</p></div></div><div className="mt-6 grid gap-3 sm:grid-cols-2">{responseFeedback.checks.map(item => <div key={item.label} className={`rounded-xl p-4 ${item.pass ? "bg-emerald-400/10" : "bg-white/7"}`}><div className="flex items-center gap-2"><CheckCircle2 className={`h-4 w-4 ${item.pass ? "text-emerald-300" : "text-white/25"}`} /><p className="text-sm font-semibold">{item.label}</p></div><p className="mt-2 text-sm leading-6 text-white/55">{item.pass ? "Present in this response. Keep it specific and authentic." : item.advice}</p></div>)}</div><div className="mt-6 rounded-xl bg-white/7 p-4 text-sm leading-6 text-white/60"><strong className="text-white">Next revision:</strong> Fix the first unmet criterion, then read the answer aloud. Do not add accomplishments just to impress—add detail that proves what you actually did, why it mattered, and what changed.</div></section> : null}
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1.35fr]">
        <div className="space-y-6">
          <section className="rounded-2xl bg-white p-6 shadow-sm"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8c4964]">Step 1 · Understand it</p><h2 className="mt-3 text-2xl font-semibold">Paste the exact prompt</h2><p className="mt-2 text-sm text-gray-500">Working on: {selectedApplication.university} · {selectedApplication.program}</p><textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder={`Paste the current ${selectedApplication.program} prompt from your applicant portal here...`} className="mt-5 min-h-36 w-full resize-y rounded-xl border border-black/10 bg-[#faf9f6] p-4 text-sm leading-6 outline-none focus:border-[#8c4964]" /><div className="mt-4 rounded-xl bg-[#f1e6d2] p-4 text-sm leading-6 text-gray-600">Look for four things: the action word, the experience requested, the qualities being assessed, and the evidence you need to provide.</div></section>
          <section className="rounded-2xl bg-[#172126] p-6 text-white"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ffd48a]">Story framework</p><div className="mt-5 space-y-4">{[["Context","What was happening?"],["Action","What did you personally do?"],["Impact","What changed, and how do you know?"],["Reflection","What did you learn or carry forward?"]].map(([title, help]) => <div key={title} className="border-b border-white/10 pb-4"><p className="font-semibold">{title}</p><p className="mt-1 text-sm text-white/50">{help}</p></div>)}</div></section>
        </div>
        <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8c4964]">Step 2 · Build your response</p><h2 className="mt-3 text-2xl font-semibold">Draft workspace</h2></div><label className="text-xs font-semibold text-gray-500">Word limit <input type="number" min="50" value={limit} onChange={e => setLimit(Number(e.target.value))} className="ml-2 w-20 rounded-lg border border-black/10 px-2 py-1.5" /></label></div>
          <textarea value={draft} onChange={e => setDraft(e.target.value)} placeholder="Write your own draft here. Focus on specific actions, evidence, and reflection..." className="mt-6 min-h-80 w-full resize-y rounded-xl border border-black/10 bg-[#faf9f6] p-5 leading-7 outline-none focus:border-[#8c4964]" />
          <div className="mt-3 flex items-center justify-between gap-4"><button type="button" disabled={!draft.trim()} onClick={async () => { await navigator.clipboard.writeText(draft); setCopied(true); window.setTimeout(() => setCopied(false), 1800); }} className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#172126] px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied ? "Copied" : "Copy final draft"}</button><span className={`text-sm font-semibold ${wordCount > limit ? "text-red-600" : "text-gray-500"}`}>{wordCount} / {limit} words</span></div>
          <div className="mt-7 border-t border-black/5 pt-6"><h3 className="font-semibold">Final review</h3><div className="mt-4 grid gap-2 sm:grid-cols-2">{reviewItems.map(item => <button type="button" key={item} onClick={() => setChecked(current => current.includes(item) ? current.filter(x => x !== item) : [...current, item])} className={`flex cursor-pointer items-start gap-2 rounded-xl border p-3 text-left text-sm ${checked.includes(item) ? "border-[#8c4964]/20 bg-[#f7edf1]" : "border-black/5"}`}><CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${checked.includes(item) ? "text-[#8c4964]" : "text-gray-300"}`} />{item}</button>)}</div></div>
        </section>
        </div>
      </div>}
      <div className="mt-10 flex items-center justify-between rounded-2xl bg-[#e7dfd2] p-5 text-sm text-gray-600"><span>Always confirm eligibility, prompts, and deadlines with the official source.</span><Link href="/deadlines" className="inline-flex items-center gap-1 font-semibold text-[#172126]">Deadline planner <ArrowRight className="h-4 w-4" /></Link></div>
    </section>
  </main>;
}

export default function ApplicationHubPage() {
  return <ApplicationHub mode="scholarships" />;
}
