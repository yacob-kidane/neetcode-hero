"use client";

import { useEffect, useRef } from "react";
import { useStagedPageReveal } from "./StagedPageRevealContext";

const LOGO_EXIT_START_MAX_MS = 4_000;

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Kicks off the **logo exit** (not full page) as soon as the hero video can play.
 * Does **not** wait for `window` `load` — that avoids a second “ready” jolt and
 * keeps the first paint to video + logo. Optional font wait is best-effort only.
 */
export function StagedPageBoot() {
  const { revealPhase, startLogoExit, revealAllNow } = useStagedPageReveal();
  const settledRef = useRef(false);

  useEffect(() => {
    if (revealPhase !== "splash") return;
    if (settledRef.current) return;
    if (typeof window === "undefined") return;

    if (prefersReducedMotion()) {
      settledRef.current = true;
      revealAllNow();
      return;
    }

    let cancelled = false;
    const go = () => {
      if (cancelled || settledRef.current) return;
      settledRef.current = true;
      startLogoExit();
    };

    const run = async () => {
      await new Promise<void>((r) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => r());
        });
      });
      if (cancelled) return;

      try {
        await Promise.race([
          document.fonts.ready,
          new Promise((r) => setTimeout(r, 80)),
        ]);
      } catch {
        /* ignore */
      }
      if (cancelled) return;

      const video = document.querySelector("video.hero-bg-video") as HTMLVideoElement | null;
      if (video) {
        if (video.readyState >= 2) {
          go();
          return;
        }
        await new Promise<void>((resolve) => {
          const done = () => {
            clearTimeout(t);
            video.removeEventListener("canplay", onCanPlay);
            video.removeEventListener("loadeddata", onLoadData);
            video.removeEventListener("error", onErr);
            resolve();
          };
          const onCanPlay = () => done();
          const onLoadData = () => done();
          const onErr = () => done();
          const t = setTimeout(done, 2_200);
          video.addEventListener("canplay", onCanPlay, { once: true });
          video.addEventListener("loadeddata", onLoadData, { once: true });
          video.addEventListener("error", onErr, { once: true });
        });
        if (cancelled) return;
        go();
        return;
      }
      go();
    };

    const maxTimer = setTimeout(go, LOGO_EXIT_START_MAX_MS);
    void run().catch(() => go());

    return () => {
      cancelled = true;
      clearTimeout(maxTimer);
    };
  }, [revealPhase, startLogoExit, revealAllNow]);

  return null;
}
