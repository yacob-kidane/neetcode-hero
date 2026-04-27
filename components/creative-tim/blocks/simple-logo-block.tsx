"use client";

import { cn } from "@/lib/utils";
import Intersection2 from "@/components/pixel-perfect/intersection2";
import {
  ClaudeAIWordmark,
  CursorWordmark,
  GithubWordmark,
  GoogleWordmark,
  GrokWordmark,
  OpenAIWordmark,
  ReplicateWordmark,
} from "@aliimam/logos";
import { Marquee } from "@/registry/aliimam/components/marquee";

type SimpleLogoBlockProps = {
  className?: string;
};

export default function SimpleLogoBlock({ className }: SimpleLogoBlockProps) {
  return (
    <Intersection2
      className={cn("min-h-[52px]", className)}
      centerClassName="w-full max-w-none"
      horizontalOnly
    >
      <div
        className="flex w-full items-center gap-3 overflow-hidden px-[18px] py-1.5 md:gap-4 md:px-[24px] md:pt-[7px] md:pb-2"
        role="region"
        aria-label="Prepared engineers at"
      >
        <div className="flex shrink-0 items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500" aria-hidden />
          <span className="whitespace-nowrap font-mono text-[8px] font-medium uppercase tracking-[0.12em] text-white/55 md:text-[9px]">
            Prepared engineers at
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <Marquee speed={25} gap="36px" fade className="py-0.5">
            <OpenAIWordmark size={62} />
            <ClaudeAIWordmark size={62} />
            <ReplicateWordmark size={62} />
            <CursorWordmark size={62} />
            <GithubWordmark size={62} />
            <GrokWordmark size={62} />
            <GoogleWordmark size={62} className="mr-3" />
          </Marquee>
        </div>
      </div>
    </Intersection2>
  );
}
