"use client";

import type { MotionValue } from "framer-motion";
import { motion, useScroll, useTransform } from "motion/react";
import ReactLenis from "lenis/react";
import Image from "next/image";
import { useRef } from "react";

const projects = [
  { title: "Array", src: "/images/hero-stack/01.jpg" },
  { title: "Linked list", src: "/images/hero-stack/02.jpg" },
  { title: "Stack", src: "/images/hero-stack/03.jpg" },
  { title: "Binary search", src: "/images/hero-stack/04.jpg" },
  { title: "Binary tree", src: "/images/hero-stack/05.jpg" },
  { title: "Binary search tree", src: "/images/hero-stack/06.jpg" },
  { title: "Heaps", src: "/images/hero-stack/07.jpg" },
  { title: "Graphs", src: "/images/hero-stack/08.jpg" },
] as const;

/** Raw `scrollYProgress` 0→1 is remapped so motion finishes by this fraction; beyond it scales stay “locked”. Lower = lock earlier. */
const STACK_PROGRESS_END = 0.9;

const lenisOptions = {
  lerp: 0.1,
  smoothWheel: true,
  syncTouch: true,
  touchMultiplier: 1.2,
  wheelMultiplier: 0.9,
  autoRaf: true,
} as const;

const StickyCard = ({
  i,
  title,
  src,
  progress,
  range,
  targetScale,
}: {
  i: number;
  title: string;
  src: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) => {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky top-0 flex w-full items-center justify-center [contain:layout]">
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 20 + 180}px)`,
        }}
        className="relative -top-1/4 flex h-[min(18.75rem,50vw)] w-full max-w-[min(100%,31.25rem)] min-h-[12rem] origin-top flex-col overflow-hidden rounded-4xl ring-1 ring-white/10"
      >
        <Image
          src={src}
          alt={title}
          fill
          priority={i === 0}
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 31.25rem"
        />
      </motion.div>
    </div>
  );
};

/**
 * Sticky card stack (Skiper 16 StickyCard_001) — Framer / Motion + Lenis
 * We respect the original creators. This is an inspired rebuild with our own taste
 * and does not claim any ownership.
 *
 * License & Usage (Skiper UI):
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 */
export function HeroCardStack() {
  const container = useRef<HTMLDivElement>(null);
  const n = projects.length;
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  const stackProgress = useTransform(
    scrollYProgress,
    [0, STACK_PROGRESS_END],
    [0, 1],
    { clamp: true },
  );

  return (
    <ReactLenis root options={lenisOptions}>
      <div
        ref={container}
        className="relative flex w-full flex-col items-center justify-center pb-80 pt-[12vh] md:pb-28 lg:pb-28 lg:pt-[8vh]"
      >
        <p className="pointer-events-none absolute top-[2%] left-1/2 w-full max-w-[12ch] -translate-x-1/2 text-center text-[0.65rem] uppercase leading-tight tracking-wider text-white/40">
          <span className="relative after:absolute after:top-full after:left-1/2 after:mt-4 after:h-16 after:w-px after:-translate-x-1/2 after:bg-gradient-to-b after:from-white/30 after:via-white/10 after:to-transparent after:content-['']">
            scroll the roadmap stack
          </span>
        </p>
        {projects.map((project, i) => {
          const targetScale = Math.max(0.5, 1 - (n - i - 1) * 0.065);
          const span = 1 / Math.max(1, n - 1);
          const start = i * span * 0.92;
          return (
            <StickyCard
              key={project.src}
              i={i}
              title={project.title}
              src={project.src}
              progress={stackProgress}
              range={[start, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </ReactLenis>
  );
}
