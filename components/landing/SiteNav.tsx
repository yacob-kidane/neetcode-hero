"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CardNavComponent } from "@/components/landing/CardNavComponent";
import { useStagedPageReveal } from "@/components/landing/staged-page/StagedPageRevealContext";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const { pageRevealed } = useStagedPageReveal();
  const pathname = usePathname();
  const v2Active = pathname === "/v2";

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
      <Link
        href={v2Active ? "/" : "/v2"}
        className="pointer-events-auto absolute right-4 top-0 inline-flex h-9 items-center rounded-md border border-white/20 bg-black/70 px-3 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-white/85 transition-colors hover:border-[#c6f91f]/60 hover:text-[#c6f91f] sm:right-6"
      >
        {v2Active ? "V1 Dev" : "V2 Dev"}
      </Link>
    </header>
  );
}
