"use client";

import React from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  gap?: string;
  fade?: boolean;
};

export function Marquee({
  children,
  className,
  speed = 25,
  gap = "80px",
  fade = true,
}: MarqueeProps) {
  const items = React.Children.toArray(children);

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      style={
        {
          "--marquee-speed": `${speed}s`,
          "--marquee-gap": gap,
        } as React.CSSProperties
      }
    >
      {fade ? (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-black/90 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-black/90 to-transparent" />
        </>
      ) : null}
      <div className="marquee-track flex min-w-max items-center [gap:var(--marquee-gap)]">
        {items.map((child, i) => (
          <div key={`a-${i}`} className="shrink-0">
            {child}
          </div>
        ))}
        {items.map((child, i) => (
          <div key={`b-${i}`} className="shrink-0" aria-hidden>
            {child}
          </div>
        ))}
      </div>
      <style>{`
        .marquee-track {
          animation: marquee-scroll var(--marquee-speed) linear infinite;
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-50% - (var(--marquee-gap) / 2))); }
        }
      `}</style>
    </div>
  );
}

