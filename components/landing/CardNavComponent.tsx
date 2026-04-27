"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { StartLearningNavButton } from "@/components/landing/StartLearningNavButton";
import { ImagesBadge } from "@/components/ui/images-badge";
import { useStagedPageReveal } from "@/components/landing/staged-page/StagedPageRevealContext";
import { cn } from "@/lib/utils";
import "./CardNav.css";

const NAV_CARDS = [
  {
    label: "Platform",
    bgColor: "#131316",
    links: [
      { label: "Courses", href: "/courses" },
      { label: "Roadmap", href: "/platform" },
      { label: "Practice", href: "/Practice" },
    ],
  },
  {
    label: "Pricing",
    bgColor: "#0f1113",
    links: [
      { label: "Pro Plan", href: "/pricing" },
      { label: "Free Plan", href: "/pricing" },
    ],
  },
  {
    label: "Contact",
    bgColor: "#121214",
    links: [
      { label: "Support", href: "/contact" },
      { label: "Discord", href: "/contact" },
    ],
  },
] as const;

const EASE = "power3.out";
const EXPANDED_H = 190;

const NAV_ROUNDNESS = 31;
const NAV_THICKNESS = 46;
const NAV_CARD_FLUSH = 22;

const SCRAMBLE_CHARS = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "-",
  "_",
  "+",
  "=",
  ";",
  ":",
  "<",
  ">",
  ",",
] as const;

function getRandomScrambleChar() {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

function SimpleScrambleText({ text, className }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState(text);
  const frameRef = useRef<number | null>(null);

  const stop = () => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    setDisplayText(text);
  };

  const start = () => {
    if (prefersReducedMotion()) return;
    stop();
    const startedAt = performance.now();
    const totalMs = 400;

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / totalMs, 1);
      const revealCount = Math.floor(progress * text.length);
      const next = Array.from(text)
        .map((ch, idx) => {
          if (ch === " ") return " ";
          if (idx < revealCount) return ch;
          return getRandomScrambleChar();
        })
        .join("");
      setDisplayText(next);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        frameRef.current = null;
        setDisplayText(text);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
  };

  return (
    <span
      className={className}
      onMouseEnter={start}
      onFocus={start}
      onMouseLeave={stop}
      onBlur={stop}
    >
      {displayText}
    </span>
  );
}

export function CardNavComponent() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const createTimeline = (collapsedH: number) => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: collapsedH, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 40, opacity: 0 });

    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, { height: EXPANDED_H, duration: 0.38, ease: EASE });
    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.32, ease: EASE, stagger: 0.07 }, "-=0.12");
    return tl;
  };

  useLayoutEffect(() => {
    if (open) return;
    const tl = createTimeline(NAV_THICKNESS);
    tlRef.current = tl;
    return () => { tl?.kill(); tlRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!open) {
      setOpen(true);
      tl.play(0);
    } else {
      tl.eventCallback("onReverseComplete", () => setOpen(false));
      tl.reverse();
    }
  };

  return (
    <div className="card-nav-container">
      <nav
        ref={navRef}
        className={cn("card-nav", open && "open")}
        aria-label="Primary"
        style={{ borderRadius: `${NAV_ROUNDNESS}px` }}
      >
        <div className="card-nav-top" style={{ height: `${NAV_THICKNESS}px` }}>
          {/* Hamburger */}
          <button
            type="button"
            className={cn("cn-hamburger", open && "open")}
            onClick={toggle}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <div className="cn-hamburger-line" />
            <div className="cn-hamburger-line" />
          </button>

          {/* Logo + wordmark — centered */}
          <Link href="/" className="cn-logo-wrap" aria-label="Neetcode home">
            <Image
              src="/NeetLogo.png"
              alt="Neetcode logo"
              width={36}
              height={36}
              className="h-9 w-9 flex-shrink-0 object-contain"
              priority
            />
            <span
              className="cn-wordmark"
              style={{ fontFamily: "var(--font-nav-pixel), var(--font-geist-pixel-square), ui-monospace, monospace" }}
            >
              Neetcode
            </span>
          </Link>

          {/* Start learning CTA */}
          <div className="cn-cta-slot">
            <StartLearningNavButton />
          </div>
        </div>

        {/* Expanded nav cards */}
        <div className="card-nav-content" aria-hidden={!open}>
          {NAV_CARDS.map((card, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === NAV_CARDS.length - 1;
            const flushRadius = `${NAV_CARD_FLUSH}px`;
            const cardRadius = isFirst
              ? `0 0 0 ${flushRadius}`
              : isLast
              ? `0 0 ${flushRadius} 0`
              : undefined;
            return (
            <div
              key={card.label}
              className="cn-card"
              ref={(el) => { if (el) cardsRef.current[idx] = el; }}
              style={{ backgroundColor: card.bgColor, borderRadius: cardRadius }}
            >
              <div className="cn-card-label">{card.label}</div>
              <div className="cn-card-links">
                {card.links.map((lnk) => (
                  <Link key={lnk.label} href={lnk.href} className="cn-card-link" onClick={() => { toggle(); }}>
                    <Icon icon="solar:arrow-right-up-linear" className="text-[12px] opacity-50" aria-hidden />
                    <SimpleScrambleText text={lnk.label} className="cn-card-link-text" />
                    {lnk.label === "Courses" ? (
                      <ImagesBadge
                        text=""
                        images={[
                            "/screenshot-studio-1776889294021.jpg",
                            "/screenshot-studio-1776889283252.jpg",
                            "/screenshot-studio-1776889273835.jpg",
                        ]}
                        className="ml-1"
                        folderSize={{ width: 18, height: 13 }}
                        teaserImageSize={{ width: 11, height: 8 }}
                        hoverImageSize={{ width: 22, height: 15 }}
                        hoverTranslateY={-16}
                        hoverSpread={10}
                        hoverRotation={10}
                      />
                    ) : null}
                  </Link>
                ))}
              </div>
            </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
