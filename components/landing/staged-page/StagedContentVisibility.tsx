"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useStagedPageReveal } from "./StagedPageRevealContext";

type Props = { children: ReactNode; className?: string };

/**
 * Hides the rest of the page until `pageRevealed` — content stays in the DOM
 * (good for SEO). One `requestAnimationFrame` after reveal so opacity can transition in.
 */
export function StagedContentVisibility({ children, className }: Props) {
  const { pageRevealed } = useStagedPageReveal();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!pageRevealed) {
      setVisible(false);
      return;
    }
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [pageRevealed]);

  return (
    <div
      className={cn(
        "transition-[opacity,visibility] duration-700 ease-out motion-reduce:transition-none",
        pageRevealed && visible
          ? "visible opacity-100"
          : "invisible select-none opacity-0 pointer-events-none",
        className,
      )}
      aria-hidden={!pageRevealed || !visible}
    >
      {children}
    </div>
  );
}
