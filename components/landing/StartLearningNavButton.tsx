"use client";

import { cn } from "@/lib/utils";
import { usePreloader } from "@/components/landing/PreloaderContext";
import { Button } from "@/components/ui/button";

type Props = {
  className?: string;
  variant?: "bar" | "menu";
  onMenuSelect?: () => void;
};

export function StartLearningNavButton({ className, onMenuSelect }: Props) {
  const { openStartLearning } = usePreloader();

  function handleClick() {
    openStartLearning();
    onMenuSelect?.();
  }

  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      aria-label="Start learning — open experience"
      className={cn(
        "h-9 cursor-pointer rounded-full px-5 text-sm font-medium text-white/90 transition-all hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black",
        "shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)]",
        "dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]",
        className,
      )}
    >
      Log In
    </Button>
  );
}
