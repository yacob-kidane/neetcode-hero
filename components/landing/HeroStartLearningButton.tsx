"use client";

import { usePreloader } from "@/components/landing/PreloaderContext";
import { cn } from "@/lib/utils";
import "./start-learning-nav-button.css";

type Props = {
  className?: string;
  variant?: "bar" | "menu";
  tone?: "lime" | "gray";
  onMenuSelect?: () => void;
  label?: string;
};

export function HeroStartLearningButton({
  className,
  variant = "bar",
  tone = "lime",
  onMenuSelect,
  label = "Start Free",
}: Props) {
  const { openStartLearning } = usePreloader();

  function handleClick() {
    openStartLearning();
    onMenuSelect?.();
  }

  return (
    <div
      className={cn(
        "nc-slb-wrap",
        variant === "menu" && "nc-slb-wrap--menu",
        tone === "gray" && "nc-slb-wrap--gray",
        className,
      )}
    >
      <div className="nc-slb-line nc-slb-line--horizontal nc-slb-line--top" />
      <div className="nc-slb-line nc-slb-line--vertical nc-slb-line--right" />
      <div className="nc-slb-line nc-slb-line--horizontal nc-slb-line--bottom" />
      <div className="nc-slb-line nc-slb-line--vertical nc-slb-line--left" />

      <div className="nc-slb-dot nc-slb-dot--top nc-slb-dot--left" />
      <div className="nc-slb-dot nc-slb-dot--top nc-slb-dot--right" />
      <div className="nc-slb-dot nc-slb-dot--bottom nc-slb-dot--right" />
      <div className="nc-slb-dot nc-slb-dot--bottom nc-slb-dot--left" />

      <button
        type="button"
        className="nc-slb-btn font-kairos"
        onClick={handleClick}
        aria-label={`${label} — open experience`}
      >
        <span className="nc-slb-text">{label}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className="nc-slb-svg"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09" />
          <path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05" />
        </svg>
      </button>
    </div>
  );
}
