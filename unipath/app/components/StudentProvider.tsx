"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type SavedAttempt = {
  id: string;
  applicationId: string;
  university: string;
  program: string;
  mode: "written" | "video";
  question: string;
  draft: string;
  updatedAt: string;
  feedback?: unknown;
  score?: number;
};

type Student = { name: string; email: string; plan: "preview" | "premium" };
type StudentState = {
  student: Student | null;
  savedUniversityIds: string[];
  attempts: SavedAttempt[];
};

type StudentContextValue = StudentState & {
  ready: boolean;
  storageError: string;
  isFounder: boolean;
  isPremium: boolean;
  signInPreview: (name: string, email: string) => void;
  signInFounder: (accessKey: string) => Promise<void>;
  signOutFounder: () => Promise<void>;
  signOut: () => void;
  toggleUniversity: (id: string) => void;
  saveAttempt: (attempt: Omit<SavedAttempt, "id" | "updatedAt"> & { id?: string }) => SavedAttempt;
};

const STORAGE_KEY = "unipath-student-workspace-v1";
const initialState: StudentState = { student: null, savedUniversityIds: [], attempts: [] };
const StudentContext = createContext<StudentContextValue | null>(null);

export function StudentProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StudentState>(initialState);
  const [storageError, setStorageError] = useState("");
  const [ready, setReady] = useState(false);
  const [isFounder, setIsFounder] = useState(false);

  useEffect(() => {
    let active = true;

    async function hydrate() {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as StudentState;
          if (active) setState({
            student: parsed.student && typeof parsed.student.name === "string" ? parsed.student : null,
            savedUniversityIds: Array.isArray(parsed.savedUniversityIds) ? parsed.savedUniversityIds.filter(id => typeof id === "string") : [],
            attempts: Array.isArray(parsed.attempts) ? parsed.attempts.filter(item => item && typeof item.id === "string" && typeof item.draft === "string" && typeof item.applicationId === "string").slice(0, 200) : [],
          });
        }
      } catch {
        // Ignore malformed local preview data.
      }

      try {
        const response = await fetch("/api/founder-access", { cache: "no-store" });
        if (response.ok) {
          const data = await response.json();
          if (active) setIsFounder(Boolean(data?.isFounder));
        }
      } catch {
        // Founder access stays false if the entitlement endpoint is unavailable.
      }

      if (active) setReady(true);
    }

    void hydrate();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (ready) {
      // This effect synchronizes storage; the status reports the external write result.
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setStorageError("");
      } catch {
        setStorageError("Browser storage is unavailable or full. Copy your draft before leaving; changes have not been saved persistently.");
      }
    }
  }, [ready, state]);

  const value = useMemo<StudentContextValue>(() => ({
    ...state,
    ready,
    storageError,
    isFounder,
    isPremium: isFounder,
    signInPreview: (name, email) => setState(current => ({ ...current, student: { name, email, plan: "preview" } })),
    signInFounder: async (accessKey) => {
      const response = await fetch("/api/founder-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessKey }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Unable to enable founder access.");
      setIsFounder(true);
    },
    signOutFounder: async () => {
      try { await fetch("/api/founder-access", { method: "DELETE" }); } finally { setIsFounder(false); }
    },
    signOut: () => setState(current => ({ ...current, student: null })),
    toggleUniversity: (id) => setState(current => ({
      ...current,
      savedUniversityIds: current.savedUniversityIds.includes(id)
        ? current.savedUniversityIds.filter(item => item !== id)
        : [...current.savedUniversityIds, id],
    })),
    saveAttempt: (input) => {
      const saved: SavedAttempt = { ...input, id: input.id ?? crypto.randomUUID(), updatedAt: new Date().toISOString() };
      setState(current => ({
        ...current,
        attempts: [saved, ...current.attempts.filter(item => item.id !== saved.id)].slice(0, 200),
      }));
      return saved;
    },
  }), [isFounder, ready, state, storageError]);

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
}

export function useStudent() {
  const value = useContext(StudentContext);
  if (!value) throw new Error("useStudent must be used inside StudentProvider");
  return value;
}
