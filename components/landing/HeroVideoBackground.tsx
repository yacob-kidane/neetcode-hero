"use client";

import { memo, useEffect, useRef } from "react";

type Props = {
  className: string;
  src: string;
};

/**
 * Native `autoPlay` + `muted` + `playsInline` starts playback as soon as the
 * element exists—no `useLayoutEffect` wait. `fetchPriority` nudges LCP on
 * supporting browsers. Imperative `play()` is only a fallback if autoplay is blocked.
 */
export const HeroVideoBackground = memo(function HeroVideoBackground({ className, src }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (!v.paused) return;
    void v.play().catch(() => {
      const resume = () => {
        void v.play().catch(() => {});
      };
      document.addEventListener("touchstart", resume, { once: true, passive: true });
      document.addEventListener("click", resume, { once: true, passive: true });
    });
  }, [src]);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      autoPlay
      muted
      playsInline
      preload="auto"
      aria-hidden
    />
  );
});
