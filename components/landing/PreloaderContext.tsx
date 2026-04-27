"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type PreloaderCtx = {
  overlayOpen: boolean;
  openStartLearning: () => void;
  setOverlayOpen: (value: boolean) => void;
};

const PreloaderContext = createContext<PreloaderCtx | null>(null);

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const openStartLearning = useCallback(() => setOverlayOpen(true), []);

  const value = useMemo(
    () => ({ overlayOpen, openStartLearning, setOverlayOpen }),
    [overlayOpen, openStartLearning],
  );

  return <PreloaderContext.Provider value={value}>{children}</PreloaderContext.Provider>;
}

export function usePreloader() {
  const ctx = useContext(PreloaderContext);
  if (!ctx) {
    return {
      overlayOpen: false,
      openStartLearning: () => {},
      setOverlayOpen: () => {},
    };
  }
  return ctx;
}
