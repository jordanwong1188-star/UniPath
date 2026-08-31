"use client";

import Link from "next/link";
import { applicationProfiles } from "@/data/applicationProfiles";
import { AI_AVAILABLE, AI_PAUSED_MESSAGE } from "@/data/aiAvailability";
import { supportsVideoInterview } from "@/app/components/VideoInterviewSimulator";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Award, Check, CheckCircle2, Clock3, Copy, ExternalLink, FilePenLine, LoaderCircle, RefreshCw, Save, Search, Sparkles } from "lucide-react";
import { getApplicationRubric, getRubricScale } from "@/data/applicationRubrics";
import { useStudent } from "@/app/components/StudentProvider";

type ApplicationFeedback = {
  overallAssessment: string;
  readinessLabel: string;
  promptCoverage: string;
  strongestEvidence: string[];
  revisionPriorities: Array<{ priority: string; why: string; how: string }>;
  rubric: Array<{ criterion: string; rating: number; evidence: string; nextStep: string }>;
  authenticityCautions: string[];
  limitations: string[];
};

const scholarships = [
  { name: "Loran Award", value: "Major renewable award", focus: "Character, service & leadership", eligibility: "Canadian citizens or permanent residents entering university", deadline: "October 15, 2026 · noon ET", url: "https://loranscholar.ca/the-program/how-to-apply/", tag: "Leadership" },
  { name: "Schulich Leader Scholarships", value: "$100,000–$120,000", focus: "STEM leadership & entrepreneurship", eligibility: "School-nominated Canadian graduating students entering eligible STEM programs", deadline: "School nomination required", url: "https://schulichleaders.com/apply/", tag: "STEM" },
  { name: "TD Scholarships for Community Leadership", value: "Up to $70,000", focus: "Sustained community leadership", eligibility: "Students completing high school or CEGEP in Canada", deadline: "Check current application cycle", url: "https://www.td.com/ca/en/about-td/ready-commitment/community-leadership-scholarship-for-canadians", tag: "Leadership" },
  { name: "Terry Fox Humanitarian Award", value: "Renewable national award", focus: "Humanitarian service, courage & determination", eligibility: "Canadian citizens, permanent residents, or landed immigrants pursuing a first degree or diploma", deadline: "Check current application cycle", url: "https://terryfoxawards.ca/applicant-information/", tag: "Service" },
] as const;

const reviewItems = ["I answered every part of the prompt", "I used a specific example", "I explained my personal contribution", "I showed impact with evidence", "I included reflection or growth", "My writing sounds like me", "I stayed within the word limit"];

export function ApplicationHub({ mode, initialApplicationId, showChooser = true }: { mode: "scholarships" | "applications"; initialApplicationId?: string; showChooser?: boolean }) {
  const { ready, isPremium, saveAttempt, attempts, storageError } = useStudent();
  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState("All");
  const [prompt, setPrompt] = useState("");
  const [draft, setDraft] = useState("");
  const [prepNotes, setPrepNotes] = useState("");
  const [checked, setChecked] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [applicationId, setApplicationId] = useState(initialApplicationId && applicationProfiles.some(item => item.id === initialApplicationId) ? initialApplicationId : applicationProfiles[0].id as string);
  const [practiceMode, setPracticeMode] = useState<"written" | "video">("written");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timerPhase, setTimerPhase] = useState<"prep" | "response">("response");
  const [secondsLeft, setSecondsLeft] = useState(() => applicationProfiles.find(item => item.id === applicationId)?.practice.written.seconds ?? 0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState<ApplicationFeedback | null>(null);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackError, setFeedbackError] = useState("");
  const [attemptId, setAttemptId] = useState<string | undefined>();
  const [savedAt, setSavedAt] = useState("");

  const results = useMemo(() => scholarships.filter((item) => {
    const text = `${item.name} ${item.focus} ${item.eligibility} ${item.tag}`.toLowerCase();
    return (!query.trim() || text.includes(query.toLowerCase())) && (focus === "All" || item.tag === focus);
  }), [focus, query]);

  const wordCount = draft.trim() ? draft.trim().split(/\s+/).length : 0;
  const selectedApplication = applicationProfiles.find(item => item.id === applicationId) ?? applicationProfiles[0];
  const selectedRubric = getApplicationRubric(selectedApplication, practiceMode);
  const limit = practiceMode === "written" ? selectedApplication.practice.written.limit : null;
  const practice = selectedApplication.practice[practiceMode];
  const questions = practice.questions;
  const configuredSeconds = practiceMode === "video" ? (selectedApplication.practice.video.prepSeconds ?? selectedApplication.practice.video.responseSeconds) : selectedApplication.practice.written.seconds;
  const hasTimer = configuredSeconds !== null;
  const requestFeedback = async () => {
    if (!AI_AVAILABLE || !draft.trim() || feedbackLoading) return;
    setFeedbackLoading(true);
    setFeedbackError("");
    setFeedback(null);
    setShowFeedback(true);

    const activeQuestion = questions[questionIndex] ?? "";
    const exactOrPracticePrompt = prompt.trim() || activeQuestion;
    const context = [
      selectedApplication.note,
      ...selectedApplication.components.map(
        (component) => `${component.title}: ${component.format}. ${component.help}`
      ),
      `RUBRIC EVIDENCE STATUS: ${selectedRubric.evidence}`,
      `RUBRIC NOTE: ${selectedRubric.note}`,
      ...selectedRubric.criteria.map(
        (criterion) =>
          `${criterion.name}: ${criterion.description}. A 5 requires: ${criterion.five}`
      ),
    ].join("\n");

    try {
      const response = await fetch("/api/application-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          university: selectedApplication.university,
          program: selectedApplication.program,
          mode: practiceMode,
          prompt: exactOrPracticePrompt,
          response: draft,
          context,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data?.feedback) {
        throw new Error(data?.error || "Feedback could not be generated.");
      }
      setFeedback(data.feedback as ApplicationFeedback);
      const ratings = (data.feedback as ApplicationFeedback).rubric.map(item => item.rating);
      const averageScore = ratings.length ? ratings.reduce((sum, value) => sum + value, 0) / ratings.length : undefined;
      if (isPremium) {
        const saved = saveAttempt({ id: attemptId, applicationId, university: selectedApplication.university, program: selectedApplication.program, mode: practiceMode, question: exactOrPracticePrompt, draft, feedback: data.feedback, score: averageScore ? Number(averageScore.toFixed(1)) : undefined });
        setAttemptId(saved.id);
        setSavedAt("Saved with feedback");
      }
    } catch (error) {
      setFeedbackError(
        error instanceof Error ? error.message : "Feedback could not be generated."
      );
    } finally {
      setFeedbackLoading(false);
    }
  };

  const saveCurrentDraft = () => {
    if (!ready || !draft.trim()) return;
    const activeQuestion = prompt.trim() || questions[questionIndex] || "Draft response";
    const saved = saveAttempt({ id: attemptId, applicationId, university: selectedApplication.university, program: selectedApplication.program, mode: practiceMode, question: activeQuestion, draft, feedback: feedback ?? undefined });
    setAttemptId(saved.id);
    setSavedAt("Saved on this browser");
  };


  function changePractice(nextId: string, nextMode: "written" | "video") {
    const next = applicationProfiles.find(item => item.id === nextId) ?? applicationProfiles[0];
    const format = nextMode === "video" && supportsVideoInterview(next.id) ? "video" : "written";
    setApplicationId(next.id); setPracticeMode(format);
    setTimerRunning(false); setShowFeedback(false); setQuestionIndex(0);
    setDraft(""); setPrompt(""); setPrepNotes(""); setFeedback(null);
    setFeedbackError(""); setChecked([]); setAttemptId(undefined); setSavedAt("");
    setTimerPhase(format === "video" && next.practice.video.prepSeconds !== null ? "prep" : "response");
    setSecondsLeft((format === "video" ? next.practice.video.prepSeconds ?? next.practice.video.responseSeconds : next.practice.written.seconds) ?? 0);
  }

  useEffect(() => {
    if (!timerRunning) return;
    const timer = window.setInterval(() => setSecondsLeft(current => {
      if (current > 1) return current - 1;
      if (practiceMode === "video" && timerPhase === "prep" && selectedApplication.practice.video.prepSeconds !== null) {
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
    const firstPhase = practiceMode === "video" && selectedApplication.practice.video.prepSeconds !== null ? "prep" : "response";
    setTimerPhase(firstPhase);
    setSecondsLeft((practiceMode === "video" ? (selectedApplication.practice.video.prepSeconds ?? selectedApplication.practice.video.responseSeconds) : selectedApplication.practice.written.seconds) ?? 0);
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
              {showChooser ? <><label htmlFor="application-profile" className="mt-6 block text-sm font-semibold">University and program</label><select id="application-profile" value={applicationId} onChange={e => changePractice(e.target.value, "written")} className="mt-2 w-full cursor-pointer rounded-xl border border-white/15 bg-white px-4 py-3.5 text-sm font-semibold text-[#172126] outline-none focus:ring-2 focus:ring-[#ffd48a]">{applicationProfiles.map(item => <option key={item.id} value={item.id}>{item.university} — {item.program}</option>)}</select></> : <Link href="/applications" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/15">← Choose a different program</Link>}
              <div className="mt-5 rounded-2xl bg-white/8 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40">Deadline</p>
                <p className="mt-1 font-semibold text-[#ffd48a]">{selectedApplication.deadline}</p>
                <p className="mt-3 text-sm leading-6 text-white/65">{selectedApplication.note}</p>
                {"verification" in selectedApplication ? <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-300/10 px-3 py-1.5 text-xs font-semibold text-emerald-200"><CheckCircle2 className="h-3.5 w-3.5" />{selectedApplication.verification}</p> : <p className="mt-3 rounded-lg border border-amber-200/15 bg-amber-200/5 px-3 py-2 text-xs leading-5 text-amber-100/75">Program requirement verified; exact prompts or timing may only be available in the applicant portal.</p>}
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
            <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8c4964]">Application practice room</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">Practice the published format</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">Prompts are labelled by evidence: official prompt focus, official question type, applicant-reported past question, or original practice question. Past questions are not guaranteed to repeat.</p></div>
            <div className="grid grid-cols-2 rounded-xl bg-[#f1e6d2] p-1">
              {(["written", "video"] as const).filter(item => item === "written" || (showChooser && supportsVideoInterview(selectedApplication.id))).map(item => <button type="button" key={item} onClick={() => changePractice(applicationId, item)} className={`cursor-pointer rounded-lg px-5 py-2.5 text-sm font-semibold capitalize ${practiceMode === item ? "bg-white text-[#692f46] shadow-sm" : "text-gray-500"}`}>{item}</button>)}
            </div>
          </div>

          <div className="mt-7 grid gap-5 lg:grid-cols-[1fr_310px]">
            <div className="min-w-0 rounded-2xl bg-[#f7f4ee] p-5 sm:p-6">
              {storageError ? <p role="alert" className="mb-4 text-sm text-red-700">{storageError}</p> : null}
              {attempts.some(item => item.applicationId === applicationId && item.mode === practiceMode) ? <label className="mb-4 block text-sm font-semibold">Restore a saved browser-local draft
                <select value="" onChange={e => {
                  const saved = attempts.find(item => item.id === e.target.value);
                  if (!saved) return;
                  setDraft(saved.draft); setPrompt(saved.question); setAttemptId(saved.id);
                  setSavedAt("Restored from this browser"); setFeedback(null); setShowFeedback(false);
                  setTimerRunning(false); setPrepNotes(""); setChecked([]);
                }} className="mt-2 block w-full rounded-lg border border-black/15 bg-white p-2 font-normal">
                  <option value="">Choose a saved attempt</option>
                  {attempts.filter(item => item.applicationId === applicationId && item.mode === practiceMode).map(item => <option key={item.id} value={item.id}>{new Date(item.updatedAt).toLocaleString()} · {item.question.slice(0, 70)}</option>)}
                </select>
              </label> : null}
              <div className="flex flex-wrap items-center justify-between gap-3"><span className="rounded-full bg-[#692f46] px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-white">{practiceMode === "written" ? "Written" : "Video"} practice · question {questionIndex + 1}</span><div className="flex items-center gap-4">{<button type="button" disabled={!ready || !draft.trim()} onClick={saveCurrentDraft} className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#692f46] disabled:opacity-40"><Save className="h-4 w-4" /> {savedAt || "Save draft"}</button>}<button type="button" onClick={() => { setQuestionIndex(current => (current + 1) % questions.length); setDraft(""); setPrompt(""); setPrepNotes(""); setFeedback(null); setFeedbackError(""); setChecked([]); setAttemptId(undefined); setSavedAt(""); resetTimer(); }} className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#692f46]"><RefreshCw className="h-4 w-4" /> New question</button></div></div>
              <p className="mt-6 text-xl font-semibold leading-8">{prompt.trim() || questions[questionIndex]}</p>
              {practiceMode === "written" ? <textarea value={draft} onChange={e => { setDraft(e.target.value); setShowFeedback(false); setFeedback(null); }} placeholder="Start writing when you start the timer..." className="mt-6 min-h-64 w-full resize-y rounded-xl border border-black/10 bg-white p-5 leading-7 outline-none focus:border-[#8c4964]" /> : <div className="mt-6 rounded-xl border border-dashed border-[#692f46]/25 bg-white p-5"><p className="font-semibold">Video response plan</p><p className="mt-2 text-sm leading-6 text-gray-500">During preparation, write only a few anchors: situation, your action, result, and reflection. When responding, look at the camera and speak naturally.</p><textarea value={prepNotes} onChange={e => setPrepNotes(e.target.value)} placeholder="Short preparation notes..." className="mt-4 min-h-24 w-full resize-y rounded-lg border border-black/10 p-3 text-sm outline-none focus:border-[#8c4964]" /><label className="mt-4 block text-sm font-semibold">Response transcript <span className="font-normal text-gray-400">(for feedback)</span><textarea value={draft} onChange={e => { setDraft(e.target.value); setShowFeedback(false); setFeedback(null); }} placeholder="After practicing aloud, type or paste what you said so UniPath can review its structure..." className="mt-2 min-h-36 w-full resize-y rounded-lg border border-black/10 p-3 font-normal leading-6 outline-none focus:border-[#8c4964]" /></label></div>}
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
          <div className="mt-5 rounded-2xl border border-[#692f46]/10 bg-[#fffaf5] p-5"><p className="font-semibold">Self-review your attempt</p><p className="mt-2 text-sm leading-6 text-gray-600">{AI_PAUSED_MESSAGE} Use the rubric and checklist below. Drafts saved here stay on this browser; they are not synced to an account.</p><button type="button" disabled={!AI_AVAILABLE || !draft.trim() || feedbackLoading} onClick={requestFeedback} className="mt-3 rounded-lg bg-[#692f46] px-5 py-3 text-sm text-white disabled:opacity-50">AI feedback paused</button></div>
          {showFeedback ? <section className="mt-5 rounded-2xl bg-[#172126] p-6 text-white sm:p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ffd48a]">Evidence-based coaching review</p>
              <h3 className="mt-2 text-2xl font-semibold">{feedback?.readinessLabel ?? (feedbackLoading ? "Reviewing your evidence…" : "Feedback unavailable")}</h3>
              <p className="mt-2 text-xs text-white/40">Coaching assessment · not an admission score or prediction</p>
            </div>
            {feedbackLoading ? <div className="mt-6 flex items-center gap-3 rounded-xl bg-white/7 p-5 text-sm text-white/65"><LoaderCircle className="h-5 w-5 animate-spin text-[#ffd48a]" />Checking prompt coverage, evidence, reflection, clarity, and authenticity…</div> : null}
            {feedbackError ? <div className="mt-6 rounded-xl bg-red-400/10 p-4 text-sm leading-6 text-red-100">{feedbackError} Check that the site feedback service is configured, then try again.</div> : null}
            {feedback ? <>
              <p className="mt-6 leading-7 text-white/75">{feedback.overallAssessment}</p>
              <div className="mt-5 rounded-xl bg-white/7 p-4"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40">Prompt coverage</p><p className="mt-2 text-sm leading-6 text-white/70">{feedback.promptCoverage}</p></div>
              <div className="mt-6 grid gap-3 lg:grid-cols-2">{feedback.rubric.map(item => <div key={item.criterion} className="rounded-xl bg-white/7 p-4"><div className="flex items-center justify-between gap-3"><p className="text-sm font-semibold">{item.criterion}</p><span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-[#ffd48a]">{Math.max(1, Math.min(5, Math.round(item.rating)))}/5</span></div><p className="mt-3 text-sm leading-6 text-white/60"><strong className="text-white/80">Evidence:</strong> {item.evidence}</p><p className="mt-2 text-sm leading-6 text-white/60"><strong className="text-white/80">Improve:</strong> {item.nextStep}</p></div>)}</div>
              {feedback.strongestEvidence.length > 0 ? <div className="mt-6"><h4 className="font-semibold">Strongest evidence already present</h4><ul className="mt-3 space-y-2 text-sm leading-6 text-white/65">{feedback.strongestEvidence.map(item => <li key={item} className="rounded-lg bg-emerald-400/10 px-4 py-3">✓ {item}</li>)}</ul></div> : null}
              <div className="mt-6"><h4 className="font-semibold">Revision priorities</h4><div className="mt-3 space-y-3">{feedback.revisionPriorities.map((item, index) => <div key={`${item.priority}-${index}`} className="rounded-xl border border-[#ffd48a]/15 bg-[#ffd48a]/5 p-4"><p className="text-sm font-semibold text-[#ffd48a]">{index + 1}. {item.priority}</p><p className="mt-2 text-sm leading-6 text-white/60">{item.why}</p><p className="mt-2 text-sm leading-6 text-white/75"><strong>How:</strong> {item.how}</p></div>)}</div></div>
              {feedback.authenticityCautions.length > 0 ? <div className="mt-6 rounded-xl bg-amber-300/10 p-4"><p className="text-sm font-semibold text-amber-100">Authenticity check</p><ul className="mt-2 space-y-1 text-sm leading-6 text-amber-50/65">{feedback.authenticityCautions.map(item => <li key={item}>• {item}</li>)}</ul></div> : null}
              <div className="mt-6 border-t border-white/10 pt-5"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40">Limits of this review</p><ul className="mt-2 space-y-1 text-xs leading-5 text-white/45">{feedback.limitations.map(item => <li key={item}>• {item}</li>)}</ul></div>
            </> : null}
          </section> : null}

          <section className="mt-6 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
            <div className="border-b border-black/5 bg-[#f7f3ec] p-6 sm:p-8">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8c4964]">What reviewers are looking for</p>
                  <h3 className="mt-2 text-2xl font-semibold">{selectedRubric.title}</h3>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600">{selectedRubric.note}</p>
                </div>
                <span className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${
                  selectedRubric.evidence === "Official published rubric"
                    ? "bg-emerald-100 text-emerald-800"
                    : selectedRubric.evidence === "Official criteria converted to practice scale"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-amber-100 text-amber-800"
                }`}>{selectedRubric.evidence}</span>
              </div>
              <a href={selectedRubric.source} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline">View evidence source <ExternalLink className="h-4 w-4" /></a>
            </div>

            <div className="p-6 sm:p-8">
              <h4 className="font-semibold">Practice level guide</h4>
              <div className="mt-4 grid gap-2 md:grid-cols-5">{getRubricScale(selectedApplication).map(level => <div key={level.score} className={`rounded-xl border p-3 ${level.score === 5 ? "border-[#8c4964]/20 bg-[#f7edf1]" : "border-black/5 bg-[#fafafa]"}`}><div className="flex items-center gap-2"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#172126] text-xs font-bold text-white">{level.score}</span><p className="text-sm font-semibold">{level.label}</p></div><p className="mt-2 text-xs leading-5 text-gray-500">{level.description}</p></div>)}</div>

              <div className="mt-8 grid gap-4 lg:grid-cols-2">{selectedRubric.criteria.map(item => <article key={item.name} className="rounded-2xl border border-black/5 p-5"><div className="flex items-start justify-between gap-4"><h4 className="font-semibold">{item.name}</h4><span className="shrink-0 rounded-full bg-[#172126] px-2.5 py-1 text-xs font-semibold text-white">Target 5</span></div><p className="mt-3 text-sm leading-6 text-gray-500">{item.description}</p><div className="mt-4 rounded-xl bg-[#eef2f1] p-4"><p className="text-xs font-semibold uppercase tracking-[0.11em] text-[#365d55]">Strong-response coaching target</p><p className="mt-2 text-sm leading-6 text-gray-700">{item.five}</p></div></article>)}</div>

              <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900"><strong>Important:</strong> A 5 is an exceptional practice target, not a guarantee of admission. The feedback reviewer must justify each rating from evidence in the student’s response and should not award a 5 merely for polished wording.</div>
            </div>
          </section>
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1.35fr]">
        <div className="space-y-6">
          <section className="rounded-2xl bg-white p-6 shadow-sm"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8c4964]">Step 1 · Understand it</p><h2 className="mt-3 text-2xl font-semibold">Paste the exact prompt</h2><p className="mt-2 text-sm text-gray-500">Working on: {selectedApplication.university} · {selectedApplication.program}</p><textarea value={prompt} onChange={e => { setPrompt(e.target.value); setFeedback(null); setShowFeedback(false); }} placeholder={`Paste the current ${selectedApplication.program} prompt from your applicant portal here...`} className="mt-5 min-h-36 w-full resize-y rounded-xl border border-black/10 bg-[#faf9f6] p-4 text-sm leading-6 outline-none focus:border-[#8c4964]" /><div className="mt-4 rounded-xl bg-[#f1e6d2] p-4 text-sm leading-6 text-gray-600">Look for four things: the action word, the experience requested, the qualities being assessed, and the evidence you need to provide.</div></section>
          <section className="rounded-2xl bg-[#172126] p-6 text-white"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ffd48a]">Story framework</p><div className="mt-5 space-y-4">{[["Context","What was happening?"],["Action","What did you personally do?"],["Impact","What changed, and how do you know?"],["Reflection","What did you learn or carry forward?"]].map(([title, help]) => <div key={title} className="border-b border-white/10 pb-4"><p className="font-semibold">{title}</p><p className="mt-1 text-sm text-white/50">{help}</p></div>)}</div></section>
        </div>
        <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"><h2 className="text-2xl font-semibold">Review your response</h2><p className="mt-3 text-sm text-gray-500">Your response is in the practice editor above. Copy it before leaving this page, or save a browser-local attempt.</p>
          <div className="mt-3 flex items-center justify-between gap-4"><button type="button" disabled={!draft.trim()} onClick={async () => { try { await navigator.clipboard.writeText(draft); } catch { setFeedbackError("Copy was blocked. Select and copy your response manually."); setShowFeedback(true); return; } setCopied(true); window.setTimeout(() => setCopied(false), 1800); }} className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#172126] px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied ? "Copied" : "Copy final draft"}</button><span className={`text-sm font-semibold ${limit !== null && wordCount > limit ? "text-red-600" : "text-gray-500"}`}>{wordCount}{limit !== null ? ` / ${limit}` : ""} words</span></div>
          <div className="mt-7 border-t border-black/5 pt-6"><h3 className="font-semibold">Final review</h3><div className="mt-4 grid gap-2 sm:grid-cols-2">{reviewItems.map(item => <button type="button" key={item} onClick={() => setChecked(current => current.includes(item) ? current.filter(x => x !== item) : [...current, item])} className={`flex cursor-pointer items-start gap-2 rounded-xl border p-3 text-left text-sm ${checked.includes(item) ? "border-[#8c4964]/20 bg-[#f7edf1]" : "border-black/5"}`}><CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${checked.includes(item) ? "text-[#8c4964]" : "text-gray-300"}`} />{item}</button>)}</div></div>
        </section>
        </div>
      </div>}
      <div className="mt-10 flex items-center justify-between rounded-2xl bg-[#e7dfd2] p-5 text-sm text-gray-600"><span>Always confirm eligibility, prompts, and deadlines with the official source.</span><Link href="/deadlines" className="inline-flex items-center gap-1 font-semibold text-[#172126]">Deadline planner <ArrowRight className="h-4 w-4" /></Link></div>
    </section>
  </main>;
}
