"use client";

import { CardNavComponent } from "@/components/landing/CardNavComponent";
import { useStagedPageReveal } from "@/components/landing/staged-page/StagedPageRevealContext";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const { pageRevealed } = useStagedPageReveal();

  return (
    <header
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-[var(--nav-header-pt)] sm:px-6 sm:pt-[var(--nav-header-pt-sm)]",
        "transition-[opacity,visibility] duration-700 ease-out motion-reduce:transition-none",
        pageRevealed ? "visible opacity-100" : "invisible pointer-events-none opacity-0",
      )}
    >
      <div className="pointer-events-auto w-full sm:w-[min(680px,calc(100vw-2rem))]">
        <CardNavComponent />
      </div>
    </header>
  );
}
