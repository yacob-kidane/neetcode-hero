"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HeroStartLearningButton } from "@/components/landing/HeroStartLearningButton";
import { Typewriter } from "@/registry/aliimam/components/typewriter";
import { useStagedPageReveal } from "@/components/landing/staged-page/StagedPageRevealContext";
import { CpuArchitecture } from "@/components/ui/cpu-architecture";
import { cn } from "@/lib/utils";

const SPLASH_LOGO_SRC = "/neetcode-new-logo.png";
const HERO_TYPEWRITER_WORDS = ["master DSA", "learn patterns", "crack interviews"];
const HERO_CARD_COPY =
  "The definitive platform for developers who want to simplify interview prep with a structured, pattern-based roadmap trusted by over a million engineers.";
const CPU_NODE_PREVIEW_HREFS = [
  "/images/cpu-node-previews/node-01.png",
  "/images/cpu-node-previews/node-02.png",
  "/images/cpu-node-previews/node-03.png",
  "/images/cpu-node-previews/node-04.png",
  "/images/cpu-node-previews/node-05.png",
  "/images/cpu-node-previews/node-06.png",
  "/images/cpu-node-previews/node-07.png",
  "/images/cpu-node-previews/node-08.png",
] as const;

const LOGO_FADE_MS = 700;

export function HeroSectionV2() {
  const { revealPhase, completeLogoExit } = useStagedPageReveal();
  const [heroBodyShown, setHeroBodyShown] = useState(false);
  const uiReady = revealPhase === "ready";

  useEffect(() => {
    if (!uiReady) {
      setHeroBodyShown(false);
      return;
    }
    const id = requestAnimationFrame(() => {
      setHeroBodyShown(true);
    });
    return () => cancelAnimationFrame(id);
  }, [uiReady]);

  useEffect(() => {
    if (revealPhase !== "logo-exit") return;
    const t = window.setTimeout(() => completeLogoExit(), LOGO_FADE_MS);
    return () => clearTimeout(t);
  }, [revealPhase, completeLogoExit]);

  return (
    <section className="hero-surface relative flex min-h-[100dvh] flex-col pt-[var(--nav-hero-pt)]">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[#05080A]" aria-hidden />

      {revealPhase !== "ready" ? (
        <div
          className={cn(
            "pointer-events-none fixed inset-0 z-[15] flex items-center justify-center motion-reduce:transition-none",
            "transition-opacity duration-[700ms] ease-out",
            revealPhase === "splash" ? "opacity-100" : "opacity-0",
          )}
          aria-hidden={revealPhase !== "splash" && revealPhase !== "logo-exit"}
        >
          <div className="relative w-[min(12rem,42vw)] max-w-xs drop-shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <Image
              src={SPLASH_LOGO_SRC}
              alt=""
              width={640}
              height={640}
              className="h-auto w-full object-contain"
              priority
              sizes="(max-width: 640px) 42vw, 12rem"
            />
          </div>
        </div>
      ) : null}

      <div
        className={cn(
          "relative z-10 flex w-full flex-1 flex-col transition-opacity duration-700 ease-out motion-reduce:transition-none",
          uiReady && heroBodyShown ? "opacity-100" : "opacity-0",
        )}
        aria-hidden={!uiReady}
      >
        {uiReady ? (
          <>
            <div className="mx-auto flex w-full max-w-[100rem] flex-1 px-4 pb-6 pt-5 sm:px-6 lg:px-12">
              <div className="grid w-full grid-cols-1 overflow-hidden border border-white/10 bg-black/40 lg:grid-cols-2">
                <div className="relative flex min-h-[32rem] flex-col justify-center border-b border-white/10 bg-[#07090C] px-8 py-10 lg:border-b-0 lg:border-r lg:px-12">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-40"
                    style={{
                      backgroundImage: "radial-gradient(rgba(255,255,255,0.13) 1px, transparent 1px)",
                      backgroundSize: "8px 8px",
                    }}
                  />
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-[12%] h-[42%] overflow-hidden opacity-70"
                    style={{
                      maskImage:
                        "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to top, transparent 0%, black 28%, black 100%)",
                      WebkitMaskImage:
                        "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to top, transparent 0%, black 28%, black 100%)",
                    }}
                  >
                    <video
                      className="h-full w-full object-cover mix-blend-screen"
                      src="/huly_laser_remix.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70" />
                  </div>

                  <div className="relative z-10 max-w-[32rem]">
                    <h1
                      className="text-white tracking-[-0.03em] [font-family:'Kairos_Pro',sans-serif]"
                      style={{ fontSize: "clamp(2.4rem,6vw,4.8rem)", lineHeight: 1.02, fontWeight: 400 }}
                    >
                      Neetcode.io
                    </h1>
                    <p className="mt-2 text-[clamp(1.25rem,2.5vw,2.05rem)] leading-tight text-white/75 [font-family:'Kairos_Pro',sans-serif]">
                      a better way to{" "}
                      <Typewriter words={HERO_TYPEWRITER_WORDS} speed={80} startDelay={900} />
                    </p>

                    <div className="mt-10 max-w-[30rem] border border-white/10 bg-black/25 p-5 backdrop-blur-[1px]">
                      <div className="mb-5 flex items-start gap-3">
                        <span className="mt-1 inline-flex h-5 w-5 rounded-full bg-gradient-to-br from-[#4ca2ff] via-[#2f7fff] to-[#1463ff] shadow-[0_0_18px_rgba(60,128,255,0.45)]" />
                        <p className="text-[17px] font-extrabold leading-relaxed text-white/90">
                          {HERO_CARD_COPY}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-4">
                        <HeroStartLearningButton label="Start Free" tone="gray" />
                        <HeroStartLearningButton label="Get Pro" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative min-h-[32rem] overflow-hidden bg-gradient-to-r from-[#b8ea19] via-[#8bb60d] to-[#05080A]">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/35 to-black/50" />

                  <div className="relative z-10 flex h-full items-center justify-center p-6 lg:p-10">
                    <div className="relative w-full max-w-[48rem]">
                      <Image
                        src="/Mockscreen.png"
                        alt=""
                        width={1200}
                        height={750}
                        className="h-auto w-full select-none object-contain"
                        priority
                      />
                      <div className="absolute left-[13%] top-[19%] right-[13%] bottom-[9.5%]">
                        <CpuArchitecture
                          centerImageHref={SPLASH_LOGO_SRC}
                          terminalPreviewHrefs={[...CPU_NODE_PREVIEW_HREFS]}
                          className="h-full w-full text-white/40"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}

