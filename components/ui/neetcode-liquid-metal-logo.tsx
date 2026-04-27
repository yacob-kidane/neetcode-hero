"use client";

import { LiquidMetal } from "@paper-design/shaders-react";
import { cn } from "@/lib/utils";

const liquidMetalClassName =
  "pointer-events-none block h-full w-full min-h-[1px] min-w-[1px] [&_canvas]:h-full [&_canvas]:w-full";

export function NeetcodeLiquidMetalLogo({
  className,
  /** Fully transparent: `#00000000` / `rgba(0,0,0,0)` — see LiquidMetal `u_colorBack` compositing. */
  colorBack = "#000000",
}: {
  className?: string;
  colorBack?: string;
}) {
  return (
    <LiquidMetal
      width="100%"
      height="100%"
      image="/NeetcodeLogo.png"
      colorBack={colorBack}
      colorTint="#ffffff"
      shape="none"
      repetition={2}
      softness={0.1}
      shiftRed={0.3}
      shiftBlue={0.3}
      distortion={0.07}
      contour={0.4}
      angle={70}
      speed={1}
      scale={0.6}
      fit="contain"
      className={cn(liquidMetalClassName, className)}
    />
  );
}
