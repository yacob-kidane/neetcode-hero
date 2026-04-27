"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type FlipTextRevealProps = {
  text: string;
  className?: string;
  startDelayMs?: number;
};

export function FlipTextReveal({
  text,
  className,
  startDelayMs = 550,
}: FlipTextRevealProps) {
  const words = text.split(" ");
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setAnimateIn(true), startDelayMs);
    return () => window.clearTimeout(timeoutId);
  }, [startDelayMs]);

  return (
    <div className={cn("flex w-full flex-col gap-3", className)}>
      <div className="flex h-11 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.4, filter: "blur(10px)" }}
          animate={
            animateIn
              ? { opacity: 1, scale: 1, filter: "blur(0px)" }
              : { opacity: 0, scale: 0.4, filter: "blur(10px)" }
          }
          transition={{ ease: [0.34, 1.56, 0.64, 1], duration: 0.5 }}
          className="h-10 w-10 rounded-full"
          style={{
            background:
              "radial-gradient(45.33% 46.43% at 41.69% 50%, #0140FF 0%, rgba(1, 64, 255, 0) 100%), radial-gradient(28.41% 117.96% at 7.72% 28.75%, #A6FDFF 0%, rgba(255, 255, 255, 0) 100%), radial-gradient(37.39% 69.19% at 107.79% 0%, #0075FF 0%, rgba(0, 66, 255, 0) 100%), radial-gradient(54.38% 89.75% at 83.46% 89.75%, #26F9FF 0%, rgba(0, 69, 255, 0.6) 100%), #0140FF",
          }}
        />
      </div>
      <div className="flex w-[471px] flex-wrap gap-x-2 gap-y-1 text-[17.5px] font-extrabold leading-snug text-white/90">
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={
              animateIn
                ? { opacity: 1, filter: "blur(0px)" }
                : { opacity: 0, filter: "blur(8px)" }
            }
            transition={{
              duration: 0.42,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.2 + index * 0.03,
            }}
          >
              {word}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export default FlipTextReveal;
