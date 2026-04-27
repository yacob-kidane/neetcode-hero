"use client";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "motion/react";
import React from "react";
/** Wire geometry (same `d` as the visible traces) for traveling glow dots. */
const TRACE_PATHS = [
  "M 10 20 h 79.5 q 5 0 5 5 v 30",
  "M 180 10 h -69.7 q -5 0 -5 5 v 30",
  "M 130 20 v 21.8 q 0 5 -5 5 h -10",
  "M 170 80 v -21.8 q 0 -5 -5 -5 h -50",
  "M 135 65 h 15 q 5 0 5 5 v 10 q 0 5 -5 5 h -39.8 q -5 0 -5 -5 v -20",
  "M 94.8 95 v -36",
  "M 88 88 v -15 q 0 -5 -5 -5 h -10 q -5 0 -5 -5 v -5 q 0 -5 5 -5 h 14",
  "M 30 30 h 25 q 5 0 5 5 v 6.5 q 0 5 5 5 h 20",
] as const;

const TRACE_TIMING: { dur: string; begin: string }[] = [
  { dur: "2.9s", begin: "0s" },
  { dur: "3.4s", begin: "0.15s" },
  { dur: "2.6s", begin: "0.4s" },
  { dur: "3.1s", begin: "0.25s" },
  { dur: "3.6s", begin: "0.05s" },
  { dur: "2.4s", begin: "0.5s" },
  { dur: "3.2s", begin: "0.35s" },
  { dur: "2.8s", begin: "0.2s" },
];

const TRACE_FILLS = [
  "url(#cpu-blue-grad)",
  "url(#cpu-yellow-grad)",
  "url(#cpu-pinkish-grad)",
  "url(#cpu-white-grad)",
  "url(#cpu-green-grad)",
  "url(#cpu-orange-grad)",
  "url(#cpu-cyan-grad)",
  "url(#cpu-rose-grad)",
] as const;

/** Outer endpoints of each trace (same order as `TRACE_PATHS` — matches `markerStart` nodes). */
const TERMINAL_CENTERS: { x: number; y: number }[] = [
  { x: 10, y: 20 },
  { x: 180, y: 10 },
  { x: 130, y: 20 },
  { x: 170, y: 80 },
  { x: 135, y: 65 },
  { x: 94.8, y: 95 },
  { x: 88, y: 88 },
  { x: 30, y: 30 },
];

export interface CpuArchitectureSvgProps {
  className?: string;
  width?: string;
  height?: string;
  /** When set, shows this image centered in the CPU box instead of `text` (path under `public/`, e.g. `/neetcode-cpu-logo.svg`). */
  centerImageHref?: string;
  /** Same logo repeated at all 8 outer path terminals. Ignored if `terminalLogoHrefs` has 8 entries. */
  terminalLogoHref?: string;
  /** One image URL per trace (exactly 8), outer terminals; overrides `terminalLogoHref`. */
  terminalLogoHrefs?: string[];
  /** Width/height in SVG units for each terminal logo (viewBox 200×100). Default 11. */
  terminalLogoSize?: number;
  /** One preview image URL per terminal node (exactly 8). Shown only while hovering the node. */
  terminalPreviewHrefs?: string[];
  text?: string;
  showCpuConnections?: boolean;
  lineMarkerSize?: number;
  animateText?: boolean;
  animateLines?: boolean;
  animateMarkers?: boolean;
  /** Traveling lights along traces (SMIL). Off when `prefers-reduced-motion` is set. */
  animateTravelingLights?: boolean;
}

const CpuArchitecture = ({
  className,
  width = "100%",
  height = "100%",
  centerImageHref,
  terminalLogoHref,
  terminalLogoHrefs,
  terminalLogoSize = 11,
  terminalPreviewHrefs,
  text = "CPU",
  showCpuConnections = true,
  animateText = true,
  lineMarkerSize = 18,
  animateLines = true,
  animateMarkers = true,
  animateTravelingLights = true,
}: CpuArchitectureSvgProps) => {
  const reduceMotion = useReducedMotion();
  const showTravelingLights =
    animateTravelingLights && !reduceMotion;

  const terminalHrefs: string[] | null =
    terminalLogoHrefs?.length === 8
      ? [...terminalLogoHrefs]
      : terminalLogoHref
        ? Array.from({ length: 8 }, () => terminalLogoHref)
        : null;
  const terminalPreviewImages =
    terminalPreviewHrefs?.length === 8 ? [...terminalPreviewHrefs] : null;

  const PREVIEW_W = 56;
  const PREVIEW_H = 24;
  const PREVIEW_OFFSETS: { dx: number; dy: number }[] = [
    { dx: -2, dy: -20 },
    { dx: -54, dy: 2 },
    { dx: -40, dy: -22 },
    { dx: -62, dy: -24 },
    { dx: -24, dy: -30 },
    { dx: -38, dy: -32 },
    { dx: -58, dy: -30 },
    { dx: -10, dy: -24 },
  ];

  return (
    <svg
      className={cn("text-muted", className)}
      width={width}
      height={height}
      viewBox="0 0 200 100"
      preserveAspectRatio="xMidYMin meet"
      style={{ overflow: "visible" }}
    >
      {/* Paths */}
      <g
        stroke="currentColor"
        fill="none"
        strokeWidth="0.3"
        strokeDasharray="100 100"
        pathLength="100"
        markerStart="url(#cpu-circle-marker)"
      >
        {/* 1st */}
        <path
          strokeDasharray="100 100"
          pathLength="100"
          d="M 10 20 h 79.5 q 5 0 5 5 v 30"
        />
        {/* 2nd */}
        <path
          strokeDasharray="100 100"
          pathLength="100"
          d="M 180 10 h -69.7 q -5 0 -5 5 v 30"
        />
        {/* 3rd */}
        <path d="M 130 20 v 21.8 q 0 5 -5 5 h -10" />
        {/* 4th */}
        <path d="M 170 80 v -21.8 q 0 -5 -5 -5 h -50" />
        {/* 5th */}
        <path
          strokeDasharray="100 100"
          pathLength="100"
          d="M 135 65 h 15 q 5 0 5 5 v 10 q 0 5 -5 5 h -39.8 q -5 0 -5 -5 v -20"
        />
        {/* 6th */}
        <path d="M 94.8 95 v -36" />
        {/* 7th */}
        <path d="M 88 88 v -15 q 0 -5 -5 -5 h -10 q -5 0 -5 -5 v -5 q 0 -5 5 -5 h 14" />
        {/* 8th */}
        <path d="M 30 30 h 25 q 5 0 5 5 v 6.5 q 0 5 5 5 h 20" />
        {/* Animation For Path Starting */}
        {animateLines && (
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="0"
            dur="1s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.25,0.1,0.5,1"
            keyTimes="0; 1"
          />
        )}
      </g>

      {showTravelingLights &&
        TRACE_PATHS.map((pathD, i) => (
          <g key={i} mask={`url(#cpu-mask-${i + 1})`}>
            <circle cx="0" cy="0" r="8" fill={TRACE_FILLS[i]}>
              <animateMotion
                repeatCount="indefinite"
                dur={TRACE_TIMING[i].dur}
                begin={TRACE_TIMING[i].begin}
                path={pathD}
                rotate="0deg"
                calcMode="linear"
              />
            </circle>
          </g>
        ))}
      {terminalHrefs && (
        <g aria-hidden>
          {TERMINAL_CENTERS.map(({ x, y }, i) => {
            const half = terminalLogoSize / 2;
            return (
              <image
                key={i}
                href={terminalHrefs[i]}
                x={x - half}
                y={y - half}
                width={terminalLogoSize}
                height={terminalLogoSize}
                preserveAspectRatio="xMidYMid meet"
              />
            );
          })}
        </g>
      )}
      {terminalPreviewImages && (
        <g aria-hidden>
          {TERMINAL_CENTERS.map(({ x, y }, i) => {
            const { dx, dy } = PREVIEW_OFFSETS[i];
            return (
              <g key={`preview-${i}`} className="cpu-preview-node">
                <circle
                  cx={x}
                  cy={y}
                  r="4.2"
                  fill="transparent"
                  pointerEvents="all"
                />
                <image
                  className="cpu-preview-image"
                  href={terminalPreviewImages[i]}
                  x={x + dx}
                  y={y + dy}
                  width={PREVIEW_W}
                  height={PREVIEW_H}
                  preserveAspectRatio="xMidYMid meet"
                />
              </g>
            );
          })}
        </g>
      )}
      {/* CPU Box */}
      <g>
        {/* Cpu connections */}
        {showCpuConnections && (
          <g fill="url(#cpu-connection-gradient)">
            <rect x="93" y="37" width="2.5" height="5" rx="0.7" />
            <rect x="104" y="37" width="2.5" height="5" rx="0.7" />
            <rect
              x="116.3"
              y="44"
              width="2.5"
              height="5"
              rx="0.7"
              transform="rotate(90 116.25 45.5)"
            />
            <rect
              x="122.8"
              y="44"
              width="2.5"
              height="5"
              rx="0.7"
              transform="rotate(90 116.25 45.5)"
            />
            <rect
              x="104"
              y="16"
              width="2.5"
              height="5"
              rx="0.7"
              transform="rotate(180 105.25 39.5)"
            />
            <rect
              x="114.5"
              y="16"
              width="2.5"
              height="5"
              rx="0.7"
              transform="rotate(180 105.25 39.5)"
            />
            <rect
              x="80"
              y="-13.6"
              width="2.5"
              height="5"
              rx="0.7"
              transform="rotate(270 115.25 19.5)"
            />
            <rect
              x="87"
              y="-13.6"
              width="2.5"
              height="5"
              rx="0.7"
              transform="rotate(270 115.25 19.5)"
            />
          </g>
        )}
        {/* Main CPU Rectangle */}
        <rect
          x="85"
          y="40"
          width="30"
          height="20"
          rx="2"
          fill="#000000"
          filter="url(#cpu-light-shadow)"
        />
        {centerImageHref ? (
          <image
            href={centerImageHref}
            x="91"
            y="41"
            width="18"
            height="18"
            preserveAspectRatio="xMidYMid meet"
          />
        ) : (
          <text
            x="92"
            y="52.5"
            fontSize="7"
            fill={animateText ? "url(#cpu-text-gradient)" : "white"}
            fontWeight="600"
            letterSpacing="0.05em"
          >
            {text}
          </text>
        )}
      </g>
      {/* Masks */}
      <defs>
        <style>{`
          .cpu-preview-node { cursor: pointer; }
          .cpu-preview-image { opacity: 0; transition: opacity 180ms ease; pointer-events: none; }
          .cpu-preview-node:hover .cpu-preview-image { opacity: 1; }
        `}</style>
        <mask id="cpu-mask-1">
          <path
            d="M 10 20 h 79.5 q 5 0 5 5 v 24"
            strokeWidth="0.5"
            stroke="white"
          />
        </mask>
        <mask id="cpu-mask-2">
          <path
            d="M 180 10 h -69.7 q -5 0 -5 5 v 24"
            strokeWidth="0.5"
            stroke="white"
          />
        </mask>
        <mask id="cpu-mask-3">
          <path
            d="M 130 20 v 21.8 q 0 5 -5 5 h -10"
            strokeWidth="0.5"
            stroke="white"
          />
        </mask>
        <mask id="cpu-mask-4">
          <path
            d="M 170 80 v -21.8 q 0 -5 -5 -5 h -50"
            strokeWidth="0.5"
            stroke="white"
          />
        </mask>
        <mask id="cpu-mask-5">
          <path
            d="M 135 65 h 15 q 5 0 5 5 v 10 q 0 5 -5 5 h -39.8 q -5 0 -5 -5 v -20"
            strokeWidth="0.5"
            stroke="white"
          />
        </mask>
        <mask id="cpu-mask-6">
          <path d="M 94.8 95 v -36" strokeWidth="0.5" stroke="white" />
        </mask>
        <mask id="cpu-mask-7">
          <path
            d="M 88 88 v -15 q 0 -5 -5 -5 h -10 q -5 0 -5 -5 v -5 q 0 -5 5 -5 h 14"
            strokeWidth="0.5"
            stroke="white"
          />
        </mask>
        <mask id="cpu-mask-8">
          <path
            d="M 30 30 h 25 q 5 0 5 5 v 6.5 q 0 5 5 5 h 20"
            strokeWidth="0.5"
            stroke="white"
          />
        </mask>
        {/* Gradients */}
        <radialGradient id="cpu-blue-grad" fx="1">
          <stop offset="0%" stopColor="#00E8ED" />
          <stop offset="50%" stopColor="#08F" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-yellow-grad" fx="1">
          <stop offset="0%" stopColor="#FFD800" />
          <stop offset="50%" stopColor="#FFD800" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-pinkish-grad" fx="1">
          <stop offset="0%" stopColor="#830CD1" />
          <stop offset="50%" stopColor="#FF008B" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-white-grad" fx="1">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-green-grad" fx="1">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-orange-grad" fx="1">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-cyan-grad" fx="1">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-rose-grad" fx="1">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter
          id="cpu-light-shadow"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feDropShadow
            dx="1.5"
            dy="1.5"
            stdDeviation="1"
            floodColor="black"
            floodOpacity="0.1"
          />
        </filter>
        <marker
          id="cpu-circle-marker"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth={lineMarkerSize}
          markerHeight={lineMarkerSize}
        >
          <circle
            id="innerMarkerCircle"
            cx="5"
            cy="5"
            r="2"
            fill="black"
            stroke="#232323"
            strokeWidth="0.5"
          >
            {animateMarkers && (
              <animate attributeName="r" values="0; 3; 2" dur="0.5s" />
            )}
          </circle>
        </marker>
        {/* Cpu connection gradient */}
        <linearGradient
          id="cpu-connection-gradient"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#4F4F4F" />
          <stop offset="60%" stopColor="#121214" />
        </linearGradient>
        {/* Add CPU Text Gradient */}
        <linearGradient id="cpu-text-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#666666">
            <animate
              attributeName="offset"
              values="-2; -1; 0"
              dur="5s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
          </stop>
          <stop offset="25%" stopColor="white">
            <animate
              attributeName="offset"
              values="-1; 0; 1"
              dur="5s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
          </stop>
          <stop offset="50%" stopColor="#666666">
            <animate
              attributeName="offset"
              values="0; 1; 2;"
              dur="5s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
          </stop>
        </linearGradient>
      </defs>
    </svg>
  );
};

export { CpuArchitecture };
