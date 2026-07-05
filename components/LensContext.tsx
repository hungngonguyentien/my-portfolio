"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lens = "work" | "projects";

interface LensContextValue {
  selected: Lens | null;
  setSelected: (lens: Lens | null) => void;
}

const LensContext = createContext<LensContextValue | null>(null);

export function LensProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<Lens | null>("work");
  const value = useMemo(() => ({ selected, setSelected }), [selected]);

  return (
    <LensContext.Provider value={value}>{children}</LensContext.Provider>
  );
}

export function useLens() {
  const ctx = useContext(LensContext);
  if (!ctx) {
    throw new Error("useLens must be used within LensProvider");
  }
  return ctx;
}
