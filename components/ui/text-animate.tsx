"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type TextAnimateProps = {
  text: string;
  className?: string;
  /** Milliseconds before the first character animates (e.g. after splash / hero fade). */
  startDelayMs?: number;
};

export function TextAnimate({ text, className, startDelayMs = 0 }: TextAnimateProps) {
  const baseDelayS = startDelayMs / 1000;
  return (
    <span className={cn("inline-flex flex-wrap", className)} aria-label={text}>
      {Array.from(text).map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
            delay: baseDelayS + index * 0.035,
          }}
          className="inline-block"
          aria-hidden
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}
