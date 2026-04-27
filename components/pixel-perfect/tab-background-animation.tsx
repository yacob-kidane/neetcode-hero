"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

/** Multiplier for the white pill vs the tab hit target (`1` = full width/height). Lower = smaller bubble (try 0.88–0.98). */
const NAV_BUBBLE_SCALE = 0.82;

export interface TabNavItem {
  href: string;
  label: string;
}

interface TabBackgroundAnimationProps {
  items: readonly TabNavItem[] | TabNavItem[];
  className?: string;
}

export default function TabBackgroundAnimation({
  items,
  className,
}: TabBackgroundAnimationProps) {
  const [active, setActive] = useState(0);

  return (
    <div className={cn("flex items-center overflow-visible gap-0.5 sm:gap-1", className)}>
      {items.map((item, i) => (
        <Link
          key={item.href}
          href={item.href}
          onMouseEnter={() => setActive(i)}
          className="relative inline-flex h-[var(--nav-cta-height)] min-h-0 max-h-[var(--nav-cta-height)] cursor-pointer items-center rounded-full px-2 sm:px-2.5"
        >
          {active === i ? (
            <motion.div
              style={{
                background: "#F4F4F4",
                boxShadow:
                  "0.222px 0.222px 0.314px -0.5px rgba(0, 0, 0, 0.2), 0.605px 0.605px 0.856px -1px rgba(0, 0, 0, 0.18), 1.329px 1.329px 1.88px -1.5px rgba(0, 0, 0, 0.25), 2.95px 2.95px 4.172px -2px rgba(0, 0, 0, 0.1), 2.5px 2.5px 3px -2.5px rgba(0, 0, 0, 0.15), -0.5px -0.5px 0px rgba(0, 0, 0, 0.1), inset 0.5px 0.5px 1px #FFFFFF, inset -0.5px -0.5px 1px rgba(0, 0, 0, 0.15)",
              }}
              layoutId="nav-tab-highlight"
              className="absolute inset-0 rounded-full"
              initial={{ scale: NAV_BUBBLE_SCALE }}
              animate={{ scale: NAV_BUBBLE_SCALE }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 40,
              }}
            />
          ) : null}

          <span
            className={cn(
              "relative z-10 text-[15px] font-medium leading-tight transition-colors",
              active === i ? "text-black" : "text-zinc-400",
            )}
          >
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
