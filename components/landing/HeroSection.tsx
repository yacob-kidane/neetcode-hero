"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDialKit } from "dialkit";
import { Typewriter } from "@/registry/aliimam/components/typewriter";
import { HeroStartLearningButton } from "@/components/landing/HeroStartLearningButton";
import { useStagedPageReveal } from "@/components/landing/staged-page/StagedPageRevealContext";
import { WebGLHeroCanvas } from "@/components/landing/WebGLHeroCanvas";
import SimpleLogoBlock from "@/components/creative-tim/blocks/simple-logo-block";
import { FlipTextReveal } from "@/components/pixel-perfect/flip-text-reveal";
import { CpuArchitecture } from "@/components/ui/cpu-architecture";
import { TextAnimate } from "@/components/ui/text-animate";
import StarBorders from "@/components/pixel-perfect/star-border";
import { cn } from "@/lib/utils";

/** Pre-rendered liquid-metal look — instant first paint (no WebGL on splash). */
const SPLASH_LOGO_SRC = "/neetcode-new-logo.png";

const HERO_TYPEWRITER_INITIAL = "learn DSA";
const HERO_TYPEWRITER_WORDS = ["learn patterns,\nnot problems", "master DSA", "leetcode"];
/** Must match `Typewriter` `speed` (ms per character) for flip / CTA alignment. */
const HERO_TYPEWRITER_SPEED_MS = 80;
/** Time for the initial phrase to finish typing (aligned with `Typewriter` tick cadence). */
const HERO_INITIAL_WORD_TYPE_MS =
  HERO_TYPEWRITER_INITIAL.length * HERO_TYPEWRITER_SPEED_MS;
/**
 * After flip words finish their staggered reveal (`FlipTextReveal`: delay 0.2 + (n−1)×0.03 + duration 0.42),
 * wait this long before the headline typewriter deletes “learn DSA” and cycles.
 */
const HERO_PAUSE_AFTER_FLIP_BEFORE_CYCLE_MS = 1500;
/** Pause (ms) on each full phrase before delete → next word (`Typewriter` `waitTime`). Not the post-flip hold. */
const HERO_TYPEWRITER_WORD_PAUSE_MS = 5200;
const HERO_CARD_COPY =
  "The definitive platform for developers who want to simplifiy the technical interview prep by with structured, pattern-based roadmap trusted by over a million engineers. Master the patterns, not just the problems.";
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

/** Matches `duration-700` on the hero body opacity shell. */
const HERO_BODY_FADE_MS = 700;
/** Extra pause after that fade so headline / typewriter feel like they follow the logo beat. */
const HERO_POST_LOGO_EXTRA_MS = 500;
/** When `uiReady`, choreography starts only after fade + pause (logo sequence has landed). */
const HERO_H1_CHOREOGRAPHY_BASE_MS = HERO_BODY_FADE_MS + HERO_POST_LOGO_EXTRA_MS;
/** Must match `TextAnimate` on the main title (stagger 35ms/char, duration 0.35s). */
const HERO_TITLE_MAIN = "Neetcode.io";
const HERO_TITLE_ANIM_MS =
  (HERO_TITLE_MAIN.length - 1) * 35 + 350 + 200;
/** Subtitle line + typewriter: only after the main title has popped in. */
const HERO_SUBTITLE_START_MS = HERO_H1_CHOREOGRAPHY_BASE_MS + HERO_TITLE_ANIM_MS;
/**
 * Sequence (from hero mount):
 * 1. Title → 2. Subtitle + type “learn DSA” → 3. Tagline hold → 4. FlipTextReveal starts →
 * 5. Flip reveal runs → 6. {@link HERO_PAUSE_AFTER_FLIP_BEFORE_CYCLE_MS} → 7. Typewriter deletes / cycles.
 * `holdBeforeCycleMs` is measured from when “learn DSA” finishes typing until step 7.
 */
/** Pause after “learn DSA” completes, before flip `startDelayMs` fires. */
const HERO_TAGLINE_HOLD_BEFORE_FLIP_MS = 750;
/** When FlipTextReveal begins (no extra pre-flip stillness — that pause is after flip). */
const HERO_FLIP_TEXT_START_MS =
  HERO_SUBTITLE_START_MS +
  HERO_INITIAL_WORD_TYPE_MS +
  HERO_TAGLINE_HOLD_BEFORE_FLIP_MS;
/** Must match `FlipTextReveal`: orb transition 0.5s vs word stagger end — use the longer. */
const HERO_FLIP_CARD_WORD_COUNT = HERO_CARD_COPY.trim().split(/\s+/).filter(Boolean).length;
const HERO_FLIP_WORDS_SETTLE_MS = Math.round(
  (0.2 + Math.max(0, HERO_FLIP_CARD_WORD_COUNT - 1) * 0.03 + 0.42) * 1000,
);
const HERO_FLIP_REVEAL_TOTAL_MS = Math.max(500, HERO_FLIP_WORDS_SETTLE_MS);
/**
 * From last character of “learn DSA” until first delete: tagline gap + flip reveal + post-flip pause.
 * Keeps cycling in sync with flip without delaying flip start.
 */
const HERO_TYPEWRITER_HOLD_BEFORE_CYCLE_MS =
  HERO_TAGLINE_HOLD_BEFORE_FLIP_MS +
  HERO_FLIP_REVEAL_TOTAL_MS +
  HERO_PAUSE_AFTER_FLIP_BEFORE_CYCLE_MS;
/** CTAs after flip block has had time to appear. */
const HERO_CTA_APPEAR_MS = HERO_FLIP_TEXT_START_MS + 900;

/** Remount `Typewriter` when hero timing constants change so hold/wait timers pick up new values (dev/HMR). */
const HERO_TYPEWRITER_TIMING_KEY = `${HERO_SUBTITLE_START_MS}-${HERO_TYPEWRITER_HOLD_BEFORE_CYCLE_MS}-${HERO_TYPEWRITER_WORD_PAUSE_MS}-${HERO_PAUSE_AFTER_FLIP_BEFORE_CYCLE_MS}`;

/** MacBook column — layout only (no DialKit). */
const HERO_MACBOOK = { x: 65, y: -42, scale: 1.01 } as const;
/** Diagram inset inside the mock screen — layout only (no DialKit). */
const HERO_DIAGRAM = { top: 18.5, left: 12.5, right: 13, bottom: 9, scale: 1.07 } as const;

export function HeroSection() {
  const { revealPhase, completeLogoExit } = useStagedPageReveal();
  const [heroBodyShown, setHeroBodyShown] = useState(false);

  const uiReady = revealPhase === "ready";

  const HERO_TITLE = { x: -14, y: -15 };

  const heroCopyCard = useDialKit("Hero copy card", {
    x: [-46, -120, 120, 1],
    y: [-53, -120, 120, 1],
    fontSize: [1.05, 0.85, 1.35, 0.01],
  });

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
    <section
      className="hero-surface relative flex min-h-[100dvh] flex-col pt-[var(--nav-hero-pt)]"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-x-clip">
        <div className="absolute inset-0 bg-neutral-950" aria-hidden />
        {uiReady ? <WebGLHeroCanvas /> : null}
      </div>

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
            <div className="mx-auto flex w-full max-w-[100rem] flex-1 flex-col px-6 pb-4 pt-2 sm:pb-5 md:pt-3 lg:px-12 lg:pb-6">
              <div className="flex w-full flex-col items-start gap-y-6 overflow-x-visible pt-10 sm:gap-y-8 sm:pt-12 md:pt-14 lg:flex-row lg:items-start lg:justify-between lg:gap-x-8 lg:overflow-visible lg:pt-16 xl:gap-x-12 xl:pt-[4.5rem]">
            <div className="flex w-full max-w-[470px] flex-col items-start gap-y-6 sm:gap-y-8 lg:max-w-[470px] lg:flex-none lg:min-w-0">
              <h1
                className="text-h1 relative z-10 mt-1 min-h-[100px] max-w-2xl pl-1 font-normal tracking-[-0.02em] text-white sm:mt-2 sm:min-h-[110px] sm:pl-2 sm:translate-x-2 md:mt-3 md:pl-3 md:translate-x-4 lg:ml-1 lg:mt-3 lg:translate-x-5 lg:pl-4"
                style={{ translate: `${HERO_TITLE.x}px ${HERO_TITLE.y}px`, fontFamily: '"Kairos Pro", sans-serif', fontWeight: 400 }}
              >
                <TextAnimate text={HERO_TITLE_MAIN} startDelayMs={HERO_H1_CHOREOGRAPHY_BASE_MS} />
                <motion.span
                  className="mt-1 block min-h-[calc(2*1.25*clamp(1.75rem,3.2vw,2.75rem))] text-[clamp(1rem,2.15vw,2rem)] font-normal leading-tight tracking-normal text-textsec"
                  style={{ fontFamily: '"Kairos Pro", sans-serif', fontWeight: 700, width: "clamp(456px, 58vw, 760px)" }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: HERO_SUBTITLE_START_MS / 1000,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  a better way to{" "}
                  <Typewriter
                    key={HERO_TYPEWRITER_TIMING_KEY}
                    words={HERO_TYPEWRITER_WORDS}
                    initialWord={HERO_TYPEWRITER_INITIAL}
                    holdBeforeCycleMs={HERO_TYPEWRITER_HOLD_BEFORE_CYCLE_MS}
                    waitTime={HERO_TYPEWRITER_WORD_PAUSE_MS}
                    speed={HERO_TYPEWRITER_SPEED_MS}
                    startDelay={HERO_SUBTITLE_START_MS}
                  />
                </motion.span>
              </h1>

              <div className="relative z-10 mt-5 w-full pl-[50px] sm:mt-6 sm:pl-[25px] md:mt-8 md:pl-[25px] lg:ml-1 lg:mt-10 lg:pl-[25px] xl:mt-12">
                <div
                  className="relative w-[500px] rounded-none bg-transparent px-5 pt-5 pb-4"
                  style={{
                    transform: `translate(${heroCopyCard.x}px, ${heroCopyCard.y}px)`,
                    fontFamily: '"Delight", serif',
                    fontSize: `${heroCopyCard.fontSize}rem`,
                  }}
                >
                  <FlipTextReveal
                    text={HERO_CARD_COPY}
                    className="text-balance"
                    startDelayMs={HERO_FLIP_TEXT_START_MS}
                  />
                  <div className="mt-5 flex flex-wrap justify-center gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98, filter: "blur(14px)" }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                      transition={{
                        duration: 1.05,
                        ease: [0.22, 1, 0.36, 1],
                        delay: HERO_CTA_APPEAR_MS / 1000,
                      }}
                    >
                      <HeroStartLearningButton label="Start Free" tone="gray" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98, filter: "blur(14px)" }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                      transition={{
                        duration: 1.05,
                        ease: [0.22, 1, 0.36, 1],
                        delay: HERO_CTA_APPEAR_MS / 1000 + 0.22,
                      }}
                    >
                      <HeroStartLearningButton label="Get Pro" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 w-full shrink-0 overflow-x-visible sm:mt-6 lg:mt-0 lg:flex lg:max-w-[min(99rem,92vw)] lg:min-w-0 lg:flex-1 lg:justify-end xl:max-w-[min(108rem,90vw)]">
              <div className="w-full max-w-[min(90rem,100%)] overflow-x-visible lg:max-w-none">
                <div className="rounded-xl bg-transparent p-2 pt-0 sm:p-3 sm:pt-0 lg:px-4 lg:pb-3 lg:pt-0">
                  {/*
                    1.2× via scale: the SVG is already w-full of this column, so a larger max-w
                    did not change the drawn size. Padding leaves room for the scaled overflow.
                  */}
                  <div className="mx-auto w-full max-w-[1200px] overflow-visible pb-4 sm:pb-5 lg:pb-6">
                    {/* aspect ratio matches the PNG (1200×750 = 8:5) */}
                    <div
                      className="relative w-full origin-top max-lg:origin-top lg:origin-top-right"
                      style={{
                        aspectRatio: "8/5",
                        transform: `translate(${HERO_MACBOOK.x}px, ${HERO_MACBOOK.y}px) scale(${HERO_MACBOOK.scale})`,
                      }}
                    >
                      {/* MacBook frame — behind everything */}
                      <Image
                        src="/Mockscreen.png"
                        alt=""
                        width={1200}
                        height={750}
                        className="absolute inset-0 z-0 h-full w-full pointer-events-none select-none"
                        aria-hidden
                      />
                      {/* Diagram inside the screen */}
                      <div
                        className="absolute z-10"
                        style={{
                          top: `${HERO_DIAGRAM.top}%`,
                          left: `${HERO_DIAGRAM.left}%`,
                          right: `${HERO_DIAGRAM.right}%`,
                          bottom: `${HERO_DIAGRAM.bottom}%`,
                          transform: `scale(${HERO_DIAGRAM.scale})`,
                          transformOrigin: "center center",
                        }}
                      >
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
              </div>
            </div>

            <div className="relative mt-auto w-full shrink-0 bg-transparent py-1 backdrop-blur-xl sm:py-1.5">
              <SimpleLogoBlock />
            </div>

          </>
        ) : null}
      </div>
    </section>
  );
}
