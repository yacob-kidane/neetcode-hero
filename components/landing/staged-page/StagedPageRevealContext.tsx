"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * `splash` — video + center logo; nav and main/footer off-screen.
 * `logo-exit` — logo is fading; still no nav/hero copy (hero coordinates transition end).
 * `ready` — full site: nav, main, full hero.
 */
export type StagedRevealPhase = "splash" | "logo-exit" | "ready";

type StagedPageRevealCtx = {
  /** @deprecated use revealPhase === "ready" */
  pageRevealed: boolean;
  revealPhase: StagedRevealPhase;
  /** Boot: first moment video can play — starts logo fade only */
  startLogoExit: () => void;
  /** Hero: logo layer finished fading */
  completeLogoExit: () => void;
  /** Skip straight to full UI (e.g. prefers-reduced-motion) */
  revealAllNow: () => void;
};

const StagedPageRevealContext = createContext<StagedPageRevealCtx | null>(null);

export function StagedPageRevealProvider({ children }: { children: ReactNode }) {
  const [revealPhase, setRevealPhase] = useState<StagedRevealPhase>("splash");

  const startLogoExit = useCallback(() => {
    setRevealPhase((p) => (p === "splash" ? "logo-exit" : p));
  }, []);

  const completeLogoExit = useCallback(() => {
    setRevealPhase((p) => (p === "logo-exit" ? "ready" : p));
  }, []);

  const revealAllNow = useCallback(() => {
    setRevealPhase("ready");
  }, []);

  const value = useMemo(
    () => ({
      pageRevealed: revealPhase === "ready",
      revealPhase,
      startLogoExit,
      completeLogoExit,
      revealAllNow,
    }),
    [revealPhase, startLogoExit, completeLogoExit, revealAllNow],
  );

  return (
    <StagedPageRevealContext.Provider value={value}>
      {children}
    </StagedPageRevealContext.Provider>
  );
}

export function useStagedPageReveal() {
  const ctx = useContext(StagedPageRevealContext);
  if (!ctx) {
    return {
      pageRevealed: true,
      revealPhase: "ready" as const,
      startLogoExit: () => {},
      completeLogoExit: () => {},
      revealAllNow: () => {},
    };
  }
  return ctx;
}
