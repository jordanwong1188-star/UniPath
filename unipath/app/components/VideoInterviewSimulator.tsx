"use client";

import { AI_AVAILABLE, AI_PAUSED_MESSAGE } from "@/data/aiAvailability";
import { getApplicationRubric, getRubricScale } from "@/data/applicationRubrics";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Camera,
  CirclePause,
  CirclePlay,
  CircleStop,
  ExternalLink,
  LoaderCircle,
  Mic,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Timer,
  Video,
} from "lucide-react";


type SpeechResultEvent = { resultIndex: number; results: { length: number; [index: number]: { isFinal: boolean; [index: number]: { transcript: string } } } };
type BrowserRecognition = {
  continuous: boolean; interimResults: boolean; lang: string;
  onresult: ((event: SpeechResultEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void; stop(): void; abort(): void;
};
type RecognitionConstructor = new () => BrowserRecognition;

type Feedback = {
  overallAssessment: string;
  readinessLabel: string;
  rubric: Array<{ criterion: string; rating: number; evidence: string; nextStep: string }>;
  revisionPriorities: Array<{ priority: string; why: string; how: string }>;
  limitations: string[];
};

type Profile = {
  id: string;
  university: string;
  program: string;
  timerAccuracy: string;
  source: string;
  practice: {
    video: {
      prepSeconds: number | null;
      responseSeconds: number | null;
      questions: readonly string[];
    };
  };
};

type InterviewFormat = {
  prepSeconds: number | null;
  responseSeconds: number | null;
  formatLabel: string;
  evidenceLabel: string;
  context: string;
};

type InterviewQuestion = {
  prompt: string;
  evidence: string;
  source?: string;
};

const verifiedFormats: Record<string, InterviewFormat> = {
  "waterloo-engineering": {
    prepSeconds: null,
    responseSeconds: 90,
    formatLabel: "Recorded video · 90-second response",
    evidenceLabel: "Official response limit · Waterloo Engineering",
    context: "Waterloo Engineering publicly specifies a prerecorded online Engineering interview with a 90-second recorded response. Public materials confirm preparation is provided but do not consistently publish one universal preparation countdown, so UniPath does not claim one as official.",
  },
  "uoft-engineering": {
    prepSeconds: 120,
    responseSeconds: 120,
    formatLabel: "2 min preparation · 2 min recording",
    evidenceLabel: "Official timing · U of T Engineering",
    context: "U of T Engineering publicly states that the Personal Profile includes a video response with 2 minutes to prepare and 2 minutes to record. Assessment should emphasize reasoning, communication, problem-solving and self-awareness rather than a single correct answer.",
  },
  "queens-commerce": {
    prepSeconds: 120,
    responseSeconds: 120,
    formatLabel: "2 min preparation · 2 min recording",
    evidenceLabel: "Official timing and rubric · Queen's",
    context: "Queen's Commerce uses Kira Talent. The public format is one timed written response and one video response, with 2 minutes to prepare and 2 minutes to record. Queen's publishes a 1–5 video rubric emphasizing authentic examples, perspective-taking, ownership and impact, adaptability/composure and meaningful reflection.",
  },
  "queens-health-sciences": {
    prepSeconds: 120,
    responseSeconds: 120,
    formatLabel: "2 min preparation · 2 min recording",
    evidenceLabel: "Official timing · Queen's",
    context: "Queen's Health Sciences uses Kira Talent with a timed written and recorded video response. UniPath practice emphasizes initiative, adaptability, teamwork, impact, perspective and reflection while following the current published timing.",
  },
  "queens-nursing": {
    prepSeconds: 120,
    responseSeconds: 120,
    formatLabel: "2 min preparation · 2 min recording",
    evidenceLabel: "Official timing · Queen's",
    context: "Queen's Nursing uses the Queen's Kira supplementary-application format. Practice should emphasize empathy, responsibility, teamwork, adaptability, communication and reflection.",
  },
  "rotman-commerce": {
    prepSeconds: 60,
    responseSeconds: 90,
    formatLabel: "Practice simulation · current Kira timing may vary",
    evidenceLabel: "Kira format verified · practice timing",
    context: "Rotman Commerce publicly confirms a Kira Talent supplemental application with brief written and video questions and practice opportunities. Applicant reports consistently describe business/current-issue, judgment, problem-solving and reflection-style prompts. UniPath labels these questions as practice or applicant-reported themes rather than official future questions.",
  },
  "schulich-bba": {
    prepSeconds: 60,
    responseSeconds: 90,
    formatLabel: "Practice simulation · current Kira timing may vary",
    evidenceLabel: "Video component verified · practice timing",
    context: "Schulich requires a Leadership Profile followed by Kira video interviews and a timed written exercise. Recent applicant reports describe ethical judgment, collaboration, academic problem-solving and leadership scenarios. UniPath uses those themes without claiming reported questions will repeat.",
  },
  "western-ivey-aeo": {
    prepSeconds: 60,
    responseSeconds: 90,
    formatLabel: "Five-question Kira practice · applicant-reported timing",
    evidenceLabel: "Five-question format verified · timing reported",
    context: "Ivey AEO publicly confirms a five-question Kira video assessment completed in one sitting. Recent applicants commonly report leadership, development, resilience, difficult-situation and reflection themes. UniPath uses 60 seconds preparation and 90 seconds response as an applicant-reported practice setting, not a guaranteed official future timer.",
  },
  "ubc-sauder-bcom": {
    prepSeconds: 30,
    responseSeconds: 90,
    formatLabel: "30 sec preparation · 90 sec response practice",
    evidenceLabel: "Recent applicant-reported timing",
    context: "UBC Sauder includes recorded video responses in the Commerce Personal Profile. Recent applicants report approximately 30 seconds of preparation and up to 90 seconds to answer, with questions drawn from a broad bank involving teamwork, leadership, values, communication, judgment and personal interests. UniPath marks these as applicant-reported practice settings rather than guaranteed future instructions.",
  },
  "ubc-bdes": {
    prepSeconds: 60,
    responseSeconds: 120,
    formatLabel: "Design interview practice · simulated timing",
    evidenceLabel: "Interview requirement verified · timing simulated",
    context: "UBC Bachelor of Design lists a video interview among its supplemental requirements. Practice questions focus on creative process, observation, collaboration, design decisions and reflection. Exact live timing and prompts must still be confirmed in the applicant portal.",
  },
  "ubc-pharmaceutical-sciences": {
    prepSeconds: 60,
    responseSeconds: 120,
    formatLabel: "Prerecorded virtual interview practice",
    evidenceLabel: "Interview requirement verified · timing simulated",
    context: "UBC Pharmaceutical Sciences lists a prerecorded virtual interview. UniPath practice focuses on communication, ethical judgment, health/science motivation, teamwork and reflection. Exact portal timing and questions can change.",
  },
  "ubc-pharmd": {
    prepSeconds: 60,
    responseSeconds: 120,
    formatLabel: "Prerecorded interview practice",
    evidenceLabel: "Interview requirement verified · timing simulated",
    context: "UBC Entry-to-Practice PharmD lists a prerecorded interview as an application component. Practice focuses on professionalism, ethics, patient-centred thinking, teamwork, communication and resilience. Exact portal timing and questions remain authoritative.",
  },
};


const mcmasterFormat: InterviewFormat = {
  prepSeconds: null, responseSeconds: 120,
  formatLabel: "Three video responses · 2 minutes each · preparation timing needs portal confirmation",
  evidenceLabel: "Official page conflicts: 10 sec vs 1 min preparation",
  context: "McMaster confirms three videos and one 10-minute written response. Its overview lists 10 seconds of video preparation, while its FAQ lists 1 minute. No preparation countdown is imposed here; confirm your Kira invitation.",
};
verifiedFormats["waterloo-software-engineering"] = verifiedFormats["waterloo-engineering"];
for (const id of ["mcmaster-engineering", "mcmaster-computer-science", "mcmaster-ibiomed", "mcmaster-btech"]) {
  verifiedFormats[id] = mcmasterFormat;
}

const researchedQuestionBanks: Record<string, InterviewQuestion[]> = {
  "ubc-sauder-bcom": [
    { prompt: "Describe a time you helped someone who needed support. What did you do, and what impact did you have?", evidence: "Applicant-reported past Sauder theme", source: "https://www.reddit.com/r/ubcsauder/comments/1h3zii1/sauder_interview_questions/" },
    { prompt: "Describe a time you misunderstood a task or project. How did you recognize the problem and what did you do next?", evidence: "Applicant-reported past Sauder theme", source: "https://www.reddit.com/r/ubcsauder/comments/1h3zii1/sauder_interview_questions/" },
    { prompt: "What makes someone an effective team leader, and how is that different from being an effective team member?", evidence: "Applicant-reported past Sauder theme", source: "https://www.reddit.com/r/ubcsauder/comments/1h3zii1/sauder_interview_questions/" },
    { prompt: "Tell us about an experience or topic you could talk about for hours. Why does it matter to you?", evidence: "Applicant-reported past Sauder theme", source: "https://www.reddit.com/r/ubcsauder/comments/1h3zii1/sauder_interview_questions/" },
    { prompt: "Tell us about a time your actions unintentionally hurt someone. How did you respond and what did you learn?", evidence: "Applicant-reported past Sauder theme", source: "https://www.reddit.com/r/ubcsauder/comments/1h3zii1/sauder_interview_questions/" },
    { prompt: "Which matters more: completing acceptable work on time or taking extra time to produce stronger work? Explain how you would decide.", evidence: "Applicant-reported judgment theme", source: "https://www.reddit.com/r/ubcsauder/comments/1h3zii1/sauder_interview_questions/" },
  ],
  "rotman-commerce": [
    { prompt: "Tell us about a deadline you were at risk of missing. What did you do, and what would you change next time?", evidence: "Recent applicant-reported practice theme", source: "https://www.reddit.com/r/RotmanCommerce/comments/1ovbdi8/rotman_commerce_supplemental_application_question/" },
    { prompt: "Choose a current business or social issue that interests you. What trade-offs should decision-makers consider?", evidence: "Rotman-style current-issue practice based on applicant reports", source: "https://www.reddit.com/r/RotmanCommerce/comments/zn4zne/questions_asked_on_supplemental_application/" },
    { prompt: "Describe a time you used evidence rather than instinct to make a difficult decision.", evidence: "UniPath Rotman-style practice · decision-making theme" },
    { prompt: "Tell us about a setback that forced you to change your approach. What did you learn?", evidence: "UniPath Rotman-style practice · problem-solving theme" },
    { prompt: "What perspective or experience would you bring to a collaborative business classroom?", evidence: "Applicant-reported Rotman theme", source: "https://www.reddit.com/r/RotmanCommerce/comments/kspnz3/hey_everyone/" },
  ],
  "schulich-bba": [
    { prompt: "You discover that a friend cheated on an exam they might otherwise have failed. What would you do, and why?", evidence: "Recent applicant-reported Schulich scenario", source: "https://www.reddit.com/r/Schulich/comments/1pqfnkf/how_important_is_kira_assessment_in_admissions/" },
    { prompt: "You are struggling in a required class close to final evaluations and have received very little feedback. How would you determine your next steps?", evidence: "Recent applicant-reported Schulich scenario", source: "https://www.reddit.com/r/Schulich/comments/1pqfnkf/how_important_is_kira_assessment_in_admissions/" },
    { prompt: "Describe a time collaboration changed the outcome of a project. What did you personally contribute?", evidence: "UniPath Schulich-style practice · collaboration theme" },
    { prompt: "Tell us about a leadership experience that changed how you work with other people.", evidence: "UniPath Schulich-style practice · Leadership Profile theme" },
    { prompt: "A teammate is not contributing and a deadline is approaching. How would you address the situation while still protecting the team's result?", evidence: "Applicant-reported Schulich collaboration theme", source: "https://www.reddit.com/r/Schulich/comments/1pqfnkf/how_important_is_kira_assessment_in_admissions/" },
  ],
  "western-ivey-aeo": [
    { prompt: "Tell us about a time you led without formal authority. How did you influence the outcome?", evidence: "Ivey-style practice · leadership theme" },
    { prompt: "Describe a difficult situation where you had to pivot after realizing your first approach was not working.", evidence: "Recent applicant-reported Ivey theme", source: "https://www.reddit.com/r/OntarioGrade12s/comments/1q3gwo0/ivey_aeo_video_interview_2026/" },
    { prompt: "Tell us about a commitment that tested your integrity. What decision did you make?", evidence: "Ivey-style practice · integrity theme" },
    { prompt: "Describe a setback that changed how you lead or work with others.", evidence: "Recent applicant-reported Ivey development theme", source: "https://www.reddit.com/r/OntarioGrade12s/comments/1q3gwo0/ivey_aeo_video_interview_2026/" },
    { prompt: "What contribution are you most proud of, and how do you know it mattered?", evidence: "Ivey-style practice · impact/reflection theme" },
  ],
  "queens-commerce": [
    { prompt: "Describe a time a team faced a setback. How did you respond to the people around you and what was the outcome?", evidence: "Queen's-style practice based on published rubric and applicant-reported themes", source: "https://www.reddit.com/r/OntarioGrade12s/comments/1r41mi3/smith_commerce/" },
    { prompt: "Tell us about a time you changed your approach after hearing a perspective different from your own.", evidence: "Queen's-style practice · perspective/adaptability rubric" },
    { prompt: "Describe a situation where you took responsibility for an outcome that did not go as planned.", evidence: "Queen's-style practice · ownership/reflection rubric" },
    { prompt: "Tell us about a time you had to remain composed while adapting quickly to a change.", evidence: "Queen's-style practice · adaptability/composure rubric" },
  ],
  "queens-health-sciences": [
    { prompt: "Describe a time you had to understand a perspective very different from your own before deciding how to act.", evidence: "Queen's Health Sciences-style practice · perspective/reflection" },
    { prompt: "Tell us about a time you took initiative to improve something for a group or community. What changed?", evidence: "Queen's Health Sciences-style practice · initiative/impact" },
    { prompt: "Describe a setback that required you to adapt while working with others.", evidence: "Queen's Health Sciences-style practice · teamwork/adaptability" },
    { prompt: "Tell us about a time new evidence caused you to reconsider an assumption.", evidence: "Queen's Health Sciences-style practice · evidence/reflection" },
  ],
  "queens-nursing": [
    { prompt: "Describe a time someone was relying on you during a stressful situation. How did you respond?", evidence: "Queen's Nursing-style practice · responsibility/empathy" },
    { prompt: "Tell us about a conflict in a team. How did you listen to the other person and move the group forward?", evidence: "Queen's Nursing-style practice · communication/teamwork" },
    { prompt: "Describe a time you made a mistake that affected someone else. How did you take responsibility?", evidence: "Queen's Nursing-style practice · accountability/reflection" },
    { prompt: "Tell us about a situation where you had to stay calm while priorities changed quickly.", evidence: "Queen's Nursing-style practice · adaptability/composure" },
  ],
  "waterloo-engineering": [
    { prompt: "Describe a technical or practical problem that genuinely interested you. How did you investigate or solve it?", evidence: "Waterloo Engineering-style practice · technical curiosity/problem-solving" },
    { prompt: "Tell us about a time a team project was not progressing as planned. What did you personally do?", evidence: "Waterloo Engineering-style practice · teamwork/initiative" },
    { prompt: "Describe a situation where you had too many priorities at once. How did you decide what to do first?", evidence: "Waterloo Engineering-style practice · time management" },
    { prompt: "What attracts you to engineering beyond being good at math and science?", evidence: "Waterloo Engineering-style practice · motivation/fit" },
    { prompt: "Tell us about a failure or design setback that improved your next attempt.", evidence: "Waterloo Engineering-style practice · iteration/resilience" },
  ],
  "uoft-engineering": [
    { prompt: "Describe a problem you faced where there was no obvious correct answer. How did you reason through it?", evidence: "U of T Engineering-style practice · reasoning/problem-solving" },
    { prompt: "Tell us about a time you had to work with someone whose approach differed strongly from yours.", evidence: "U of T Engineering-style practice · collaboration" },
    { prompt: "Describe a project or activity that strengthened your interest in engineering. What specifically did you learn?", evidence: "U of T Engineering-style practice · motivation/preparation" },
    { prompt: "Tell us about a decision you made under time pressure. What information did you prioritize?", evidence: "U of T Engineering-style practice · judgment/communication" },
    { prompt: "Describe a time feedback caused you to redesign or rethink something you had built or proposed.", evidence: "U of T Engineering-style practice · iteration/self-awareness" },
  ],
  "ubc-bdes": [
    { prompt: "Choose one project from your creative work and explain the most important design decision you made.", evidence: "UBC BDes-style practice · creative process" },
    { prompt: "Describe something in the built environment you think could work better. How would you begin investigating it?", evidence: "UBC BDes-style practice · observation/design thinking" },
    { prompt: "Tell us about a time critique changed the direction of something you were making.", evidence: "UBC BDes-style practice · critique/reflection" },
    { prompt: "Describe a collaborative creative project where your first idea was not the idea the group ultimately used.", evidence: "UBC BDes-style practice · collaboration/adaptability" },
  ],
  "ubc-pharmaceutical-sciences": [
    { prompt: "Why are pharmaceutical sciences interesting to you beyond a general interest in health or science?", evidence: "UBC Pharmaceutical Sciences-style practice · motivation" },
    { prompt: "Describe a time you had to communicate a technical idea to someone without your background.", evidence: "UBC Pharmaceutical Sciences-style practice · communication" },
    { prompt: "You notice a teammate has made an error that could affect the quality of a shared result. What do you do?", evidence: "UBC Pharmaceutical Sciences-style practice · ethics/teamwork" },
    { prompt: "Tell us about a scientific or health-related question that made you curious enough to investigate further.", evidence: "UBC Pharmaceutical Sciences-style practice · curiosity/reflection" },
  ],
  "ubc-pharmd": [
    { prompt: "Describe a time you had to earn someone's trust before you could help them.", evidence: "UBC PharmD-style practice · communication/empathy" },
    { prompt: "You realize you made an error while working on something that affects another person. What do you do next?", evidence: "UBC PharmD-style practice · professionalism/accountability" },
    { prompt: "Tell us about a conflict where listening carefully changed how you responded.", evidence: "UBC PharmD-style practice · patient-centred communication" },
    { prompt: "Describe a stressful situation where you had to remain accurate and responsible despite pressure.", evidence: "UBC PharmD-style practice · resilience/professionalism" },
  ],
};


researchedQuestionBanks["waterloo-software-engineering"] = researchedQuestionBanks["waterloo-engineering"];
for (const id of ["mcmaster-engineering", "mcmaster-computer-science", "mcmaster-ibiomed", "mcmaster-btech"]) {
  researchedQuestionBanks[id] = [
    { prompt: "Describe a commitment outside school and explain your contribution and learning.", evidence: "Original practice · engagement", source: "https://www.eng.mcmaster.ca/supplementary-application/" },
    { prompt: "Describe a team setback. What did you do to help the group move forward?", evidence: "Original practice · collaboration and resilience", source: "https://www.eng.mcmaster.ca/supplementary-application/" },
    { prompt: "Describe an idea you tested. How did you choose your approach and learn from the result?", evidence: "Original practice · innovation and creativity", source: "https://www.eng.mcmaster.ca/supplementary-application/" },
  ];
}

function formatTime(seconds: number) {
  return `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
}

export function supportsVideoInterview(id: string) {
  return Boolean(verifiedFormats[id]);
}

export default function VideoInterviewSimulator({ profile }: { profile: Profile }) {
  const format = verifiedFormats[profile.id];
  const rubric = getApplicationRubric(profile, "video");
  const questions = researchedQuestionBanks[profile.id] ?? profile.practice.video.questions.map(prompt => ({ prompt, evidence: "UniPath practice question" }));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [phase, setPhase] = useState<"setup" | "prep" | "ready" | "recording" | "review">("setup");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recordingUrl, setRecordingUrl] = useState("");
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [permissionError, setPermissionError] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [feedbackError, setFeedbackError] = useState("");
  const [grading, setGrading] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [captionsEnabled, setCaptionsEnabled] = useState(false);
  const sessionRef = useRef(0);
  const previewRef = useRef<HTMLVideoElement>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<BrowserRecognition | null>(null);
  const finalTranscriptRef = useRef("");

  const activeQuestion = questions[questionIndex] ?? { prompt: "Practice interview question", evidence: "UniPath practice question" };
  const prompt = activeQuestion.prompt;
  const hasPrep = format?.prepSeconds !== null && format?.prepSeconds !== undefined;
  const hasResponseLimit = format?.responseSeconds !== null && format?.responseSeconds !== undefined;
  const liveTranscript = [transcript, interimTranscript].filter(Boolean).join(" ").trim();

  const score = useMemo(() => {
    if (!feedback?.rubric?.length) return null;
    const values = feedback.rubric.map(item => item.rating).filter(value => Number.isFinite(value));
    if (!values.length) return null;
    return (values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1);
  }, [feedback]);

  useEffect(() => {
    if (previewRef.current && stream) previewRef.current.srcObject = stream;
  }, [stream]);

  useEffect(() => {
    if (!timerRunning || secondsLeft <= 0) return;
    const timer = window.setTimeout(() => {
      setSecondsLeft(value => Math.max(0, value - 1));
      if (secondsLeft === 1) {
        setTimerRunning(false);
        if (phase === "prep") setPhase("ready");
        if (phase === "recording" && hasResponseLimit) {
          const recorder = recorderRef.current;
          if (recorder && recorder.state !== "inactive") recorder.stop();
          try { recognitionRef.current?.stop(); } catch {}
        }
      }
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [timerRunning, secondsLeft, phase, hasResponseLimit]);

  useEffect(() => () => {
    stream?.getTracks().forEach(track => track.stop());
  }, [stream]);

  useEffect(() => () => {
    if (recordingUrl) URL.revokeObjectURL(recordingUrl);
  }, [recordingUrl]);

  useEffect(() => () => {
    sessionRef.current += 1;
    try { recognitionRef.current?.abort?.(); } catch {}
    const recorder = recorderRef.current;
    if (recorder?.state === "recording") recorder.stop();
  }, []);

  async function enableCamera() {
    setPermissionError("");
    try {
      const next = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(next);
    } catch {
      setPermissionError("Camera and microphone access is required. Check the browser permission for this site and try again.");
    }
  }

  function createRecognition() {
    if (!captionsEnabled) return null;
    const session = sessionRef.current;
    const browserWindow = window as typeof window & { SpeechRecognition?: RecognitionConstructor; webkitSpeechRecognition?: RecognitionConstructor };
    const Recognition = browserWindow.SpeechRecognition || browserWindow.webkitSpeechRecognition;
    if (!Recognition) {
      setSpeechSupported(false);
      return null;
    }

    const recognition = new Recognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-CA";

    recognition.onresult = (event: SpeechResultEvent) => {
      if (session !== sessionRef.current) return;
      let finalText = finalTranscriptRef.current;
      let interimText = "";

      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const phrase = event.results[i][0]?.transcript?.trim();
        if (!phrase) continue;
        if (event.results[i].isFinal) {
          finalText = `${finalText} ${phrase}`.trim();
        } else {
          interimText = `${interimText} ${phrase}`.trim();
        }
      }

      finalTranscriptRef.current = finalText;
      setTranscript(finalText);
      setInterimTranscript(interimText);
    };

    recognition.onerror = (event: { error: string }) => {
      if (event?.error !== "aborted") setSpeechSupported(false);
    };

    recognition.onend = () => {
      if (session === sessionRef.current && recorderRef.current?.state === "recording") {
        try { recognition.start(); } catch {}
      }
    };

    return recognition;
  }

  function resetResponseState() {
    sessionRef.current += 1;
    try { recognitionRef.current?.abort?.(); } catch {}
    recognitionRef.current = null;
    setRecordingUrl("");
    setTranscript("");
    setInterimTranscript("");
    finalTranscriptRef.current = "";
    setFeedback(null);
    setFeedbackError("");
  }

  async function beginRecording() {
    let activeStream = stream;
    if (!activeStream || activeStream.getTracks().some(track => track.readyState === "ended")) {
      try {
        activeStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(activeStream);
      } catch {
        setPermissionError("Allow camera and microphone access before starting the interview.");
        setPhase("setup");
        return;
      }
    }

    resetResponseState();
    chunksRef.current = [];
    const session = sessionRef.current;

    let recorder: MediaRecorder;
    try {
      recorder = new MediaRecorder(activeStream);
    } catch {
      setPermissionError("This browser could not start video recording. Try the latest Chrome or Edge.");
      return;
    }

    recorderRef.current = recorder;
    recorder.ondataavailable = event => { if (event.data.size > 0) chunksRef.current.push(event.data); };
    recorder.onstop = () => {
      if (session !== sessionRef.current) return;
      const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "video/webm" });
      setRecordingUrl(URL.createObjectURL(blob));
      setTimerRunning(false);
      // Preserve interim text until the final speech result or a manual correction.
      setPhase("review");
    };
    recorder.start(250);

    const recognition = createRecognition();
    recognitionRef.current = recognition;
    try { recognition?.start(); } catch {}

    setPhase("recording");
    if (hasResponseLimit) {
      setSecondsLeft(format.responseSeconds ?? 0);
      setTimerRunning(true);
    } else {
      setSecondsLeft(0);
      setTimerRunning(false);
    }
  }

  function stopRecording() {
    setTimerRunning(false);
    const recorder = recorderRef.current;
    if (recorder && recorder.state !== "inactive") recorder.stop();
    try { recognitionRef.current?.stop?.(); } catch {}
  }

  function startPrep() {
    resetResponseState();
    if (hasPrep) {
      setPhase("prep");
      setSecondsLeft(format.prepSeconds ?? 0);
      setTimerRunning(true);
    } else {
      setPhase("ready");
      setSecondsLeft(0);
    }
  }

  function toggleTimer() {
    if (secondsLeft <= 0) return;
    setTimerRunning(value => !value);
  }

  function resetTimer() {
    setTimerRunning(false);
    if (phase === "prep") setSecondsLeft(format.prepSeconds ?? 0);
    if (phase === "recording") setSecondsLeft(format.responseSeconds ?? 0);
  }

  function nextQuestion() {
    if (phase === "recording") stopRecording();
    setQuestionIndex(current => (current + 1) % questions.length);
    setPhase("setup");
    setTimerRunning(false);
    setSecondsLeft(0);
    resetResponseState();
  }

  async function gradeAttempt() {
    const responseText = liveTranscript || transcript;
    if (!AI_AVAILABLE || !responseText.trim() || grading) return;
    setGrading(true);
    setFeedbackError("");
    try {
      const response = await fetch("/api/application-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          university: profile.university,
          program: profile.program,
          mode: "video",
          prompt,
          response: responseText,
          context: `${format.context}\nQUESTION EVIDENCE: ${activeQuestion.evidence}.\nThis is a transcript captured from a recorded practice answer. Grade content and spoken-answer structure. Do not claim to assess eye contact, facial expression, vocal tone, attractiveness, accent or personality from text alone.`,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Unable to grade this attempt.");
      setFeedback(data.feedback as Feedback);
    } catch (error) {
      setFeedbackError(error instanceof Error ? error.message : "Unable to grade this attempt.");
    } finally {
      setGrading(false);
    }
  }

  if (!format) return null;

  return (
    <section className="mx-auto mt-8 max-w-7xl px-6 lg:px-10">
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#111c29] text-white shadow-[0_24px_80px_rgba(0,0,0,.24)]">
        <div className="flex flex-col justify-between gap-5 border-b border-white/10 px-6 py-6 sm:px-8 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.16em] text-[#9fb2bd]"><Video className="h-4 w-4" /> Program-specific video interview simulator</div>
            <h2 className="mt-3 text-2xl font-semibold">{profile.program}</h2>
            <p className="mt-2 text-sm text-white/55">{format.formatLabel}</p><p className="mt-2 max-w-2xl text-xs leading-5 text-white/60">{format.context}</p>
          </div>
          <div className="rounded-full border border-[#8fa7b6]/20 bg-[#8fa7b6]/10 px-4 py-2 text-xs font-semibold text-[#b6c5ce]">{format.evidenceLabel}</div>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_.9fr]">
          <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:border-white/10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-[.14em] text-white/40">Question {questionIndex + 1} of {questions.length}</span>
              <button type="button" onClick={nextQuestion} className="inline-flex items-center gap-2 text-xs font-semibold text-[#a8bac5]"><RefreshCw className="h-3.5 w-3.5" /> New question</button>
            </div>

            <p className="mt-5 text-xl font-semibold leading-8">{prompt}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/45">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">{activeQuestion.evidence}</span>
              {activeQuestion.source ? <a href={activeQuestion.source} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[#a8bac5] hover:underline">Question source <ExternalLink className="h-3 w-3" /></a> : null}
            </div>

            <div className="relative mt-6 aspect-video overflow-hidden rounded-2xl border border-white/10 bg-[#090f16]">
              {stream ? <video ref={previewRef} autoPlay muted playsInline className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center p-6 text-center"><div><Camera className="mx-auto h-8 w-8 text-white/30" /><p className="mt-3 text-sm font-semibold">Camera preview</p><p className="mt-1 text-xs text-white/40">Enable your camera and microphone before beginning.</p></div></div>}
              {phase === "recording" ? <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-red-600 px-3 py-1.5 text-xs font-bold"><span className="h-2 w-2 animate-pulse rounded-full bg-white" /> REC</div> : null}
              {(phase === "prep" || (phase === "recording" && hasResponseLimit)) ? <div className="absolute right-4 top-4 rounded-xl bg-black/65 px-3 py-2 font-mono text-lg font-semibold backdrop-blur">{formatTime(secondsLeft)}</div> : null}
            </div>

            <label className="mt-4 flex items-start gap-2 text-xs leading-5 text-white/65"><input type="checkbox" checked={captionsEnabled} disabled={phase === "recording"} onChange={e => setCaptionsEnabled(e.target.checked)} />Enable optional browser captions. Your browser may send audio to its speech service. Leave off to record locally and type a transcript; no UniPath AI credits are used.</label>
            {permissionError ? <p className="mt-3 text-sm text-red-300">{permissionError}</p> : null}

            <div className="mt-5 rounded-2xl border border-white/10 bg-[#0d1722] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div><p className="text-sm font-semibold">Practice controls</p><p className="mt-1 text-xs text-white/40">Real application platforms may not allow pausing. These controls are for practice.</p></div>
                {(phase === "prep" || phase === "recording") && secondsLeft > 0 ? <div className="flex items-center gap-2 text-xs font-semibold text-white/55"><Timer className="h-4 w-4" /> {timerRunning ? "Timer running" : "Timer paused"}</div> : null}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {!stream ? <button type="button" onClick={enableCamera} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#111c29]"><Camera className="h-4 w-4" /> Enable camera & mic</button> : null}
                {stream && (phase === "setup" || phase === "review") ? <button type="button" onClick={startPrep} className="inline-flex items-center gap-2 rounded-xl bg-[#9fb2bd] px-4 py-2.5 text-sm font-semibold text-[#0b121b]"><CirclePlay className="h-4 w-4" /> {hasPrep ? "Start prep timer" : "Prepare response"}</button> : null}
                {phase === "prep" && secondsLeft > 0 ? <button type="button" onClick={toggleTimer} className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold">{timerRunning ? <CirclePause className="h-4 w-4" /> : <CirclePlay className="h-4 w-4" />}{timerRunning ? "Pause timer" : "Resume timer"}</button> : null}
                {phase === "prep" ? <button type="button" onClick={resetTimer} className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold">Reset timer</button> : null}
                {stream && (phase === "ready" || phase === "prep") ? <button type="button" onClick={() => void beginRecording()} className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold"><Mic className="h-4 w-4" /> Start video response</button> : null}
                {phase === "recording" ? <button type="button" onClick={stopRecording} className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold"><CircleStop className="h-4 w-4" /> Stop video response</button> : null}
                {phase === "recording" && hasResponseLimit && secondsLeft > 0 ? <button type="button" onClick={toggleTimer} className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold">{timerRunning ? <CirclePause className="h-4 w-4" /> : <CirclePlay className="h-4 w-4" />}{timerRunning ? "Pause timer" : "Resume timer"}</button> : null}
              </div>
            </div>

            {phase === "prep" || phase === "ready" ? <div className="mt-4 rounded-xl border border-[#8fa7b6]/15 bg-[#8fa7b6]/8 p-4"><p className="text-sm font-semibold">Preparation</p><p className="mt-1 text-xs leading-5 text-white/50">Build only a few anchors: context → your action/decision → result → reflection. Start the recording when you are ready; if this program has a verified or simulated response limit, the response timer begins with the video.</p></div> : null}
          </div>

          <aside className="p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-white/40"><ShieldCheck className="h-4 w-4" /> Live transcript & review</div>

            <div className="mt-5">
              <div className="flex items-center justify-between gap-3"><p className="text-sm font-semibold">Live transcription</p>{phase === "recording" ? <span className="flex items-center gap-1.5 text-xs font-semibold text-red-300"><span className="h-2 w-2 animate-pulse rounded-full bg-red-400" /> listening</span> : null}</div>
              <div aria-live="polite" className="mt-3 min-h-20 max-h-64 overflow-y-auto rounded-xl border border-slate-300 bg-white p-4 text-sm leading-6 text-[#111827] shadow-inner">
                {liveTranscript ? <>{transcript}{interimTranscript ? <span className="text-slate-400"> {interimTranscript}</span> : null}</> : <span className="text-slate-400">{speechSupported ? (phase === "recording" ? "Listening… your words will appear here as you speak." : "Your live transcript will appear here once recording begins.") : "Live browser transcription is not available here. Type or paste a transcript below instead."}</span>}
              </div>
              <label className="mt-4 block text-sm font-semibold">Editable response transcript
                <textarea aria-label="Editable response transcript" disabled={phase === "recording"} value={liveTranscript} onChange={e => {
                  if (recognitionRef.current) recognitionRef.current.onresult = null;
                  finalTranscriptRef.current = e.target.value;
                  setTranscript(e.target.value); setInterimTranscript(""); setFeedback(null);
                }} placeholder="Type or paste your answer here. No camera or speech recognition required." className="mt-2 min-h-40 w-full rounded-lg bg-white p-3 font-normal text-[#111827] disabled:opacity-60" />
              </label>
              <p className="mt-2 text-xs leading-5 text-white/60">Correct any caption errors before reviewing. Video and transcript are not uploaded or synced. Copy your transcript and download the recording before leaving.</p>
              <button type="button" disabled={!liveTranscript.trim() || phase === "recording"} onClick={async () => { try { await navigator.clipboard.writeText(liveTranscript); } catch { setPermissionError("Select and copy the transcript manually; clipboard access was blocked."); } }} className="mt-3 rounded-lg border border-white/20 px-3 py-2 text-sm disabled:opacity-40">Copy transcript</button>
              <p className="mt-4 text-sm leading-6 text-white/70">{AI_AVAILABLE ? "Your transcript is sent to OpenAI for processing when you request feedback. Avoid highly sensitive personal information." : AI_PAUSED_MESSAGE}</p>
              <div className="mt-5 border-t border-white/15 pt-4"><h3 className="font-semibold">{rubric.title}</h3><p className="mt-2 text-xs leading-5 text-white/60">{rubric.note}</p><ul className="mt-3 space-y-3">{rubric.criteria.map(item => <li key={item.name}><p className="text-sm font-semibold">{item.name}</p><p className="text-xs leading-5 text-white/65">{item.description}</p></li>)}</ul><p className="mt-3 text-xs text-white/60">{getRubricScale(profile).map(level => level.score + " " + level.label).join(" · ")}</p><a className="mt-3 inline-block text-sm underline" href={rubric.source} target="_blank" rel="noreferrer">Read the official source</a></div>
            </div>

            {recordingUrl ? <div className="mt-6"><p className="text-sm font-semibold">Replay your response</p><a href={recordingUrl} download="unipath-practice.webm" className="mt-2 inline-block text-sm underline">Download recording</a><video src={recordingUrl} controls playsInline className="mt-3 w-full rounded-xl border border-white/10 bg-black" /></div> : null}

            {phase === "review" ? <div className="mt-5">
              <button type="button" disabled={!AI_AVAILABLE || !transcript.trim() || grading} onClick={gradeAttempt} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#9fb2bd] px-5 py-3 text-sm font-semibold text-[#0b121b] disabled:cursor-not-allowed disabled:opacity-40">{grading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}{grading ? "Grading interview…" : AI_AVAILABLE ? "Request transcript feedback" : "AI feedback paused"}</button>
              {feedbackError ? <p className="mt-3 text-sm text-red-300">{feedbackError}</p> : null}
            </div> : null}

            {feedback ? <div className="mt-6 border-t border-white/10 pt-6">
              <div className="flex items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.12em] text-[#a8bac5]">Coaching score</p><h3 className="mt-2 text-xl font-semibold">{feedback.readinessLabel}</h3></div>{score ? <div className="text-4xl font-semibold text-[#b8c7cf]">{score}<span className="text-sm text-white/35">/5</span></div> : null}</div>
              <p className="mt-4 text-sm leading-6 text-white/60">{feedback.overallAssessment}</p>
              <div className="mt-5 space-y-3">{feedback.rubric.slice(0, 5).map(item => <div key={item.criterion} className="rounded-xl bg-white/5 p-4"><div className="flex items-center justify-between gap-3"><p className="text-sm font-semibold">{item.criterion}</p><span className="text-sm font-bold text-[#a8bac5]">{item.rating}/5</span></div><p className="mt-2 text-xs leading-5 text-white/50">{item.nextStep}</p></div>)}</div>
              <p className="mt-4 text-[11px] leading-5 text-white/35">This coaching score evaluates the captured transcript and program criteria. It is not an admission prediction and does not score accent, attractiveness or personality.</p>
            </div> : null}
          </aside>
        </div>
      </div>
    </section>
  );
}
