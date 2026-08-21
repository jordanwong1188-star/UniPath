"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Camera, CircleStop, LoaderCircle, Mic, Play, RefreshCw, ShieldCheck, Sparkles, Video } from "lucide-react";

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

const verifiedFormats: Record<string, InterviewFormat> = {
  "waterloo-engineering": {
    prepSeconds: null,
    responseSeconds: 90,
    formatLabel: "Recorded video · 90-second response",
    evidenceLabel: "Official response limit · Waterloo Engineering",
    context: "Waterloo Engineering publicly specifies a prerecorded online Engineering interview with a 90-second video response. The public page confirms preparation time is provided but does not currently state a universal number of preparation seconds, so UniPath does not invent one.",
  },
  "uoft-engineering": {
    prepSeconds: 120,
    responseSeconds: 120,
    formatLabel: "2 min preparation · 2 min recording",
    evidenceLabel: "Official timing · U of T Engineering",
    context: "U of T Engineering publicly states that the Personal Profile includes a video response with 2 minutes to prepare and 2 minutes to record. Assessment should emphasize reasoning and communication rather than a single correct answer.",
  },
  "queens-commerce": {
    prepSeconds: 120,
    responseSeconds: 120,
    formatLabel: "2 min preparation · 2 min recording",
    evidenceLabel: "Official timing and rubric · Queen's",
    context: "Queen's Commerce uses Kira Talent. The current public format is one timed written response followed by one video response, with 2 minutes to prepare and 2 minutes to record. Queen's publishes a 1–5 video rubric emphasizing a specific authentic example, perspective-taking, ownership and impact, adaptability/composure, and meaningful reflection.",
  },
  "queens-health-sciences": {
    prepSeconds: 120,
    responseSeconds: 120,
    formatLabel: "2 min preparation · 2 min recording",
    evidenceLabel: "Official timing · Queen's",
    context: "Queen's Health Sciences uses the same Kira Talent supplementary-application delivery format published by Queen's: one written response and one video response, with 2 minutes to prepare and 2 minutes to record. Use the program-specific rubric supplied by UniPath for content scoring.",
  },
  "queens-nursing": {
    prepSeconds: 120,
    responseSeconds: 120,
    formatLabel: "2 min preparation · 2 min recording",
    evidenceLabel: "Official timing · Queen's",
    context: "Queen's Nursing uses the same Kira Talent supplementary-application delivery format published by Queen's: one written response and one video response, with 2 minutes to prepare and 2 minutes to record. Use the program-specific rubric supplied by UniPath for content scoring.",
  },
  "rotman-commerce": {
    prepSeconds: 60,
    responseSeconds: 90,
    formatLabel: "Practice simulation · portal timing can change",
    evidenceLabel: "Kira format verified · exact timing portal-only",
    context: "Rotman Commerce publicly confirms a Kira Talent supplemental application with brief written and video questions and unlimited practice sessions. Exact current timed instructions are shown in Join U of T rather than guaranteed on the public page. The 60-second preparation and 90-second response used here are clearly a UniPath practice simulation, not claimed as official timing.",
  },
  "schulich-bba": {
    prepSeconds: 60,
    responseSeconds: 90,
    formatLabel: "Practice simulation · Kira timing portal-only",
    evidenceLabel: "Video component verified · timing simulated",
    context: "Schulich publicly confirms that applicants upload the Leadership Profile before completing video interviews and a timed writing exercise in Kira Talent. Public 2027 instructions do not state universal per-question video timing, so UniPath labels these countdowns as practice settings rather than official limits. Feedback should emphasize initiative, collaboration, impact, resilience, empathy, and personal growth.",
  },
  "western-ivey-aeo": {
    prepSeconds: null,
    responseSeconds: null,
    formatLabel: "Five-question Kira simulation · portal timing",
    evidenceLabel: "Question count verified · timing portal-only",
    context: "Ivey AEO publicly confirms a five-question Kira video assessment completed in one sitting with preparation time and timed responses, while exact per-question public timing is not fixed on the public page. Do not invent exact official seconds. Feedback should prioritize leadership through action, initiative, integrity, resilience, influence, results, and reflection.",
  },
  "ubc-sauder-bcom": {
    prepSeconds: null,
    responseSeconds: null,
    formatLabel: "Recorded-response practice · live portal timing",
    evidenceLabel: "Video component verified · timing portal-only",
    context: "UBC Sauder includes recorded video responses in the Commerce Personal Profile. Current public instructions do not provide one reliable universal countdown for all applicants, so UniPath does not represent a fixed timer as official. Feedback should emphasize specific evidence, individual action, impact, reflection, adaptability, and authentic communication.",
  },
  "ubc-bdes": {
    prepSeconds: null,
    responseSeconds: null,
    formatLabel: "Program interview practice · live instructions",
    evidenceLabel: "Interview requirement verified",
    context: "UBC Bachelor of Design lists a video interview among its supplemental requirements. Follow the applicant portal for current prompt and timing. UniPath should assess the content of the student's response without claiming unpublished timing or questions are official.",
  },
  "ubc-pharmaceutical-sciences": {
    prepSeconds: null,
    responseSeconds: null,
    formatLabel: "Prerecorded virtual interview practice",
    evidenceLabel: "Interview requirement verified",
    context: "UBC Pharmaceutical Sciences lists a prerecorded virtual interview as an additional requirement. Exact live timing and prompts should be taken from the applicant portal; UniPath does not invent them.",
  },
  "ubc-pharmd": {
    prepSeconds: null,
    responseSeconds: null,
    formatLabel: "Prerecorded interview practice",
    evidenceLabel: "Interview requirement verified",
    context: "UBC Entry-to-Practice PharmD lists a prerecorded interview as an application component. Exact live timing and prompts should be taken from current official instructions; UniPath does not invent them.",
  },
};

function formatTime(seconds: number) {
  return `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
}

export function supportsVideoInterview(id: string) {
  return Boolean(verifiedFormats[id]);
}

export default function VideoInterviewSimulator({ profile }: { profile: Profile }) {
  const format = verifiedFormats[profile.id];
  const questions = profile.practice.video.questions;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [phase, setPhase] = useState<"setup" | "prep" | "recording" | "review">("setup");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recordingUrl, setRecordingUrl] = useState("");
  const [transcript, setTranscript] = useState("");
  const [permissionError, setPermissionError] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [feedbackError, setFeedbackError] = useState("");
  const [grading, setGrading] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const previewRef = useRef<HTMLVideoElement>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);

  const prompt = questions[questionIndex] ?? "Practice interview question";
  const hasOfficialOrSimulatedPrep = format?.prepSeconds !== null && format?.prepSeconds !== undefined;
  const hasResponseLimit = format?.responseSeconds !== null && format?.responseSeconds !== undefined;

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
    if ((phase !== "prep" && phase !== "recording") || secondsLeft <= 0) return;
    const timer = window.setTimeout(() => setSecondsLeft(value => Math.max(0, value - 1)), 1000);
    return () => window.clearTimeout(timer);
  }, [phase, secondsLeft]);

  useEffect(() => {
    if (secondsLeft !== 0) return;
    if (phase === "prep") void beginRecording();
    if (phase === "recording" && hasResponseLimit) stopRecording();
    // beginRecording/stopRecording intentionally transition the phase.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft, phase, hasResponseLimit]);

  useEffect(() => () => {
    stream?.getTracks().forEach(track => track.stop());
    if (recordingUrl) URL.revokeObjectURL(recordingUrl);
    try { recognitionRef.current?.stop?.(); } catch {}
  }, [stream, recordingUrl]);

  async function enableCamera() {
    setPermissionError("");
    try {
      const next = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(next);
    } catch {
      setPermissionError("Camera and microphone access is required for realistic interview practice. Check the browser permission for this site and try again.");
    }
  }

  function createRecognition() {
    const browserWindow = window as any;
    const Recognition = browserWindow.SpeechRecognition || browserWindow.webkitSpeechRecognition;
    if (!Recognition) {
      setSpeechSupported(false);
      return null;
    }
    const recognition = new Recognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-CA";
    recognition.onresult = (event: any) => {
      let text = "";
      for (let i = 0; i < event.results.length; i += 1) text += `${event.results[i][0].transcript} `;
      setTranscript(text.trim());
    };
    recognition.onerror = () => {};
    return recognition;
  }

  async function beginRecording() {
    let activeStream = stream;
    if (!activeStream) {
      try {
        activeStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(activeStream);
      } catch {
        setPermissionError("Allow camera and microphone access before starting the interview.");
        setPhase("setup");
        return;
      }
    }

    if (recordingUrl) URL.revokeObjectURL(recordingUrl);
    setRecordingUrl("");
    setTranscript("");
    setFeedback(null);
    setFeedbackError("");
    chunksRef.current = [];

    const recorder = new MediaRecorder(activeStream);
    recorderRef.current = recorder;
    recorder.ondataavailable = event => { if (event.data.size > 0) chunksRef.current.push(event.data); };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "video/webm" });
      setRecordingUrl(URL.createObjectURL(blob));
      setPhase("review");
    };
    recorder.start(250);

    const recognition = createRecognition();
    recognitionRef.current = recognition;
    try { recognition?.start(); } catch {}

    setPhase("recording");
    setSecondsLeft(format.responseSeconds ?? 0);
  }

  function stopRecording() {
    try { recognitionRef.current?.stop?.(); } catch {}
    recognitionRef.current = null;
    const recorder = recorderRef.current;
    if (recorder && recorder.state !== "inactive") recorder.stop();
  }

  function startAttempt() {
    setFeedback(null);
    setFeedbackError("");
    setTranscript("");
    if (hasOfficialOrSimulatedPrep) {
      setPhase("prep");
      setSecondsLeft(format.prepSeconds ?? 0);
    } else {
      void beginRecording();
    }
  }

  function nextQuestion() {
    setQuestionIndex(current => (current + 1) % questions.length);
    setPhase("setup");
    setTranscript("");
    setFeedback(null);
    setFeedbackError("");
    if (recordingUrl) URL.revokeObjectURL(recordingUrl);
    setRecordingUrl("");
  }

  async function gradeAttempt() {
    if (!transcript.trim() || grading) return;
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
          response: transcript,
          context: `${format.context}\nThis is a transcript captured from a recorded practice answer. Grade content and spoken-answer structure. Do not claim to assess eye contact, facial expression, vocal tone, or confidence unless a future multimodal evaluator is explicitly provided.`,
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
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.16em] text-[#9fb2bd]"><Video className="h-4 w-4" /> Realistic video interview simulator</div>
            <h2 className="mt-3 text-2xl font-semibold">{profile.program}</h2>
            <p className="mt-2 text-sm text-white/55">{format.formatLabel}</p>
          </div>
          <div className="rounded-full border border-[#8fa7b6]/20 bg-[#8fa7b6]/10 px-4 py-2 text-xs font-semibold text-[#b6c5ce]">{format.evidenceLabel}</div>
        </div>

        <div className="grid lg:grid-cols-[1.15fr_.85fr]">
          <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
            <div className="flex items-center justify-between gap-4"><span className="text-xs font-semibold uppercase tracking-[.14em] text-white/40">Question {questionIndex + 1} of {questions.length}</span><button type="button" onClick={nextQuestion} className="inline-flex items-center gap-2 text-xs font-semibold text-[#a8bac5]"><RefreshCw className="h-3.5 w-3.5" /> New question</button></div>
            <p className="mt-5 text-xl font-semibold leading-8">{prompt}</p>

            <div className="relative mt-6 aspect-video overflow-hidden rounded-2xl border border-white/10 bg-[#090f16]">
              {stream ? <video ref={previewRef} autoPlay muted playsInline className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center p-6 text-center"><div><Camera className="mx-auto h-8 w-8 text-white/30" /><p className="mt-3 text-sm font-semibold">Camera preview</p><p className="mt-1 text-xs text-white/40">Your browser will ask for camera and microphone permission.</p></div></div>}
              {phase === "recording" ? <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-red-600 px-3 py-1.5 text-xs font-bold"><span className="h-2 w-2 animate-pulse rounded-full bg-white" /> REC</div> : null}
              {(phase === "prep" || (phase === "recording" && hasResponseLimit)) ? <div className="absolute right-4 top-4 rounded-xl bg-black/60 px-3 py-2 font-mono text-lg font-semibold backdrop-blur">{formatTime(secondsLeft)}</div> : null}
            </div>

            {permissionError ? <p className="mt-3 text-sm text-red-300">{permissionError}</p> : null}

            <div className="mt-5 flex flex-wrap gap-3">
              {!stream ? <button type="button" onClick={enableCamera} className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#111c29]"><Camera className="h-4 w-4" /> Enable camera & mic</button> : null}
              {stream && (phase === "setup" || phase === "review") ? <button type="button" onClick={startAttempt} className="inline-flex items-center gap-2 rounded-xl bg-[#9fb2bd] px-5 py-3 text-sm font-semibold text-[#0b121b]"><Mic className="h-4 w-4" /> {phase === "review" ? "Record another attempt" : "Start interview"}</button> : null}
              {phase === "recording" ? <button type="button" onClick={stopRecording} className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold"><CircleStop className="h-4 w-4" /> Stop recording</button> : null}
            </div>

            {phase === "prep" ? <div className="mt-5 rounded-xl border border-[#8fa7b6]/15 bg-[#8fa7b6]/8 p-4"><p className="text-sm font-semibold">Preparation time</p><p className="mt-1 text-xs leading-5 text-white/50">Think in anchors, not a script: situation → your decision/action → result → reflection. Recording begins automatically when the countdown reaches zero.</p></div> : null}
          </div>

          <aside className="p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-white/40"><ShieldCheck className="h-4 w-4" /> Attempt review</div>
            {recordingUrl ? <div className="mt-5"><p className="text-sm font-semibold">Replay your response</p><video src={recordingUrl} controls playsInline className="mt-3 w-full rounded-xl border border-white/10 bg-black" /></div> : <div className="mt-5 rounded-xl bg-white/5 p-5 text-sm leading-6 text-white/50">Your recording, transcript, and program-specific coaching will appear here after the attempt.</div>}

            {phase === "review" ? <div className="mt-5">
              <p className="text-sm font-semibold">Automatic transcript</p>
              {transcript ? <p className="mt-2 max-h-40 overflow-y-auto rounded-xl bg-white/5 p-4 text-sm leading-6 text-white/65">{transcript}</p> : <p className="mt-2 rounded-xl border border-amber-300/15 bg-amber-300/5 p-4 text-sm leading-6 text-amber-100/70">{speechSupported ? "No speech was captured clearly enough to transcribe. You can replay the recording and try another attempt." : "This browser does not provide live speech recognition. Video recording still works, but automatic transcript grading currently needs Chrome/Edge speech recognition support."}</p>}
              <button type="button" disabled={!transcript.trim() || grading} onClick={gradeAttempt} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#9fb2bd] px-5 py-3 text-sm font-semibold text-[#0b121b] disabled:cursor-not-allowed disabled:opacity-40">{grading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}{grading ? "Grading interview…" : "Grade this recorded answer"}</button>
              {feedbackError ? <p className="mt-3 text-sm text-red-300">{feedbackError}</p> : null}
            </div> : null}

            {feedback ? <div className="mt-6 border-t border-white/10 pt-6">
              <div className="flex items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.12em] text-[#a8bac5]">Coaching score</p><h3 className="mt-2 text-xl font-semibold">{feedback.readinessLabel}</h3></div>{score ? <div className="text-4xl font-semibold text-[#b8c7cf]">{score}<span className="text-sm text-white/35">/5</span></div> : null}</div>
              <p className="mt-4 text-sm leading-6 text-white/60">{feedback.overallAssessment}</p>
              <div className="mt-5 space-y-3">{feedback.rubric.slice(0, 5).map(item => <div key={item.criterion} className="rounded-xl bg-white/5 p-4"><div className="flex items-center justify-between gap-3"><p className="text-sm font-semibold">{item.criterion}</p><span className="text-sm font-bold text-[#a8bac5]">{item.rating}/5</span></div><p className="mt-2 text-xs leading-5 text-white/50">{item.nextStep}</p></div>)}</div>
              {feedback.limitations?.length ? <p className="mt-4 text-[11px] leading-5 text-white/35">This score evaluates the captured transcript and program criteria. It does not claim to measure facial expression, accent, attractiveness, or personality, and it is not an admission prediction.</p> : null}
            </div> : null}
          </aside>
        </div>
      </div>
    </section>
  );
}
