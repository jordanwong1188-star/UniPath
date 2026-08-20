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
  isPremium: boolean;
  signInPreview: (name: string, email: string) => void;
  signOut: () => void;
  toggleUniversity: (id: string) => void;
  saveAttempt: (attempt: Omit<SavedAttempt, "id" | "updatedAt"> & { id?: string }) => SavedAttempt;
};

const STORAGE_KEY = "unipath-student-workspace-v1";
const initialState: StudentState = { student: null, savedUniversityIds: [], attempts: [] };
const StudentContext = createContext<StudentContextValue | null>(null);

export function StudentProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StudentState>(initialState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setState(JSON.parse(stored) as StudentState);
    } catch { /* Ignore malformed preview data. */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [ready, state]);

  const value = useMemo<StudentContextValue>(() => ({
    ...state,
    ready,
    isPremium: state.student?.plan === "premium" || state.student?.plan === "preview",
    signInPreview: (name, email) => setState(current => ({ ...current, student: { name, email, plan: "preview" } })),
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
  }), [ready, state]);

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
}

export function useStudent() {
  const value = useContext(StudentContext);
  if (!value) throw new Error("useStudent must be used inside StudentProvider");
  return value;
}
