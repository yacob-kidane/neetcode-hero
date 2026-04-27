"use client";

import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { usePreloader } from "@/components/landing/PreloaderContext";
import { ScrollEffects } from "@/components/landing/ScrollEffects";
import "./preloader.css";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");
CustomEase.create("glide", "0.8, 0, 0.2, 1");

type Props = {
  nav: ReactNode;
  hero: ReactNode;
  children: ReactNode;
};

function clearPreloaderHeroHeadingTransforms(root: HTMLElement | null) {
  if (!root) return;
  root.querySelectorAll<HTMLElement>(".preloader-hero h1").forEach((el) => {
    gsap.killTweensOf(el);
    gsap.set(el, { clearProps: "transform,y,yPercent,x,xPercent" });
  });
}

export function PreloaderGate({ nav, hero, children }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { overlayOpen, setOverlayOpen } = usePreloader();

  useEffect(() => {
    if (overlayOpen) return;
    clearPreloaderHeroHeadingTransforms(rootRef.current);
  }, [overlayOpen]);

  useLayoutEffect(() => {
    if (!overlayOpen) return;

    const root = rootRef.current;
    if (!root) return;

    gsap.set(".nc-preloader-root .preloader", {
      clearProps: "display,clipPath,scale",
    });
    gsap.set(".nc-preloader-root .preloader-backdrop", { clearProps: "display" });
    gsap.set(".nc-preloader-root .preloader-revealer", { clearProps: "clipPath" });
    gsap.set(".nc-preloader-root .preloader-hero", { clearProps: "scale" });

    let preloaderComplete = false;

    const preloaderTexts = root.querySelectorAll<HTMLElement>(".preloader p");
    const preloaderBtn = root.querySelector<HTMLElement>(".preloader-btn-container");
    const btnOutlineTrack = root.querySelector<SVGGeometryElement>(".stroke-track");
    const btnOutlineProgress = root.querySelector<SVGGeometryElement>(".stroke-progress");
    const heroHeading = root.querySelector<HTMLElement>(".preloader-hero h1");
    const centerLogo = root.querySelector<HTMLElement>("#pbc-logo");
    const centerLabel = root.querySelector<HTMLElement>("#pbc-label");

    if (!preloaderBtn || !btnOutlineTrack || !btnOutlineProgress || !heroHeading || !centerLogo || !centerLabel) {
      clearPreloaderHeroHeadingTransforms(root);
      setOverlayOpen(false);
      return;
    }

    const svgPathLength = btnOutlineTrack.getTotalLength();

    gsap.set([btnOutlineTrack, btnOutlineProgress], {
      strokeDasharray: svgPathLength,
      strokeDashoffset: svgPathLength,
    });

    gsap.set(preloaderTexts, { yPercent: 100 });
    gsap.set("#pbc-label", { yPercent: 100 });
    gsap.set("#pbc-outro-label", { yPercent: 100, autoAlpha: 0 });
    gsap.set(heroHeading, { yPercent: 100 });
    gsap.set(centerLogo, { autoAlpha: 1 });
    centerLabel.textContent = "Loading";
    centerLabel.style.top = "calc(50% + 3.6rem)";
    centerLabel.style.transform = "translateX(-50%)";

    const introTl = gsap.timeline({ delay: 1 });

    introTl
      .to(preloaderTexts, {
        y: "0%",
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.1,
      })
      .to(
        btnOutlineTrack,
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: "hop",
        },
        "<",
      )
      .to(
        ".nc-preloader-root .pbc-svg-strokes svg",
        {
          rotation: 270,
          duration: 2,
          ease: "hop",
        },
        "<",
      );

    const progressStops = [0.2, 0.25, 0.85, 1].map((base, i) => {
      if (i === 3) return 1;
      return base + (Math.random() - 0.5) * 0.1;
    });

    progressStops.forEach((stop, i) => {
      introTl.to(btnOutlineProgress, {
        strokeDashoffset: svgPathLength - svgPathLength * stop,
        duration: 0.75,
        ease: "glide",
        delay: i === 0 ? 0.3 : 0.3 + Math.random() * 0.2,
      });
    });

    introTl
      .to(
        preloaderBtn,
        {
          scale: 0.9,
          duration: 1.5,
          ease: "hop",
        },
        "-=0.5",
      )
      .to(
        ".nc-preloader-root #pbc-label",
        {
          yPercent: 0,
          duration: 0.75,
          ease: "power3.out",
          onComplete: () => {
            preloaderComplete = true;
            centerLabel.textContent = "ENTER";
            centerLabel.style.top = "50%";
            centerLabel.style.transform = "translate(-50%, -50%)";
            gsap.to(centerLogo, {
              autoAlpha: 0,
              duration: 0.25,
              ease: "power1.out",
            });
          },
        },
        "-=0.75",
      );

    let exitTl: gsap.core.Timeline | null = null;

    const onClick = () => {
      if (!preloaderComplete) return;
      preloaderComplete = false;

      exitTl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          clearPreloaderHeroHeadingTransforms(root);
          setOverlayOpen(false);
          requestAnimationFrame(() => {
            document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
          });
        },
      });

      exitTl
        .to(".nc-preloader-root .preloader", {
          scale: 0.75,
          duration: 1.25,
          ease: "hop",
        })
        .to(
          [btnOutlineTrack, btnOutlineProgress],
          {
            strokeDashoffset: -svgPathLength,
            duration: 1.25,
            ease: "hop",
          },
          "<",
        )
        .to(
          ".nc-preloader-root #pbc-label",
          {
            yPercent: -100,
            duration: 0.75,
            ease: "power3.out",
          },
          "-=1.25",
        )
        .to(
          ".nc-preloader-root #pbc-outro-label",
          {
            y: "0%",
            autoAlpha: 1,
            duration: 0.75,
            ease: "power3.out",
          },
          "-=0.05",
        )
        .to(".nc-preloader-root .preloader", {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          duration: 1.5,
          ease: "hop",
        })
        .to(
          ".nc-preloader-root .preloader-revealer",
          {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            duration: 1.5,
            ease: "hop",
            onComplete: () => {
              gsap.set(".nc-preloader-root .preloader", { display: "none" });
              gsap.set(".nc-preloader-root .preloader-backdrop", { display: "none" });
            },
          },
          "-=1.45",
        )
        .to(".nc-preloader-root .preloader-hero", {
          scale: 1,
          duration: 1.25,
          ease: "hop",
        })
        .to(
          ".nc-preloader-root .preloader-hero h1",
          {
            y: "0%",
            duration: 1,
            ease: "glide",
          },
          "-=1.75",
        );
    };

    document.body.style.overflow = "hidden";

    preloaderBtn.addEventListener("click", onClick);

    return () => {
      preloaderBtn.removeEventListener("click", onClick);
      introTl.kill();
      exitTl?.kill();
      clearPreloaderHeroHeadingTransforms(root);
      document.body.style.overflow = "";
    };
  }, [overlayOpen, setOverlayOpen]);

  return (
    <>
      <div
        ref={rootRef}
        className="nc-preloader-root"
        data-overlay={overlayOpen ? "open" : "closed"}
      >
        <div className="preloader-backdrop">
          <div className="pb-row">
            <div className="pb-col">
              <p>Neetcode Session Handshake</p>
              <p>Neetcode Session Handshake</p>
              <p>Neetcode Session Handshake</p>
              <p>Neetcode Session Handshake</p>
              <p>Neetcode Session Handshake</p>
            </div>
            <div className="pb-col">
              <p>Route / Login Pipeline</p>
              <p>Request ID / NC-2026-0424</p>
            </div>
            <div className="pb-col">
              <p>Client / Web App</p>
              <p>Status / Identity Check</p>
            </div>
            <div className="pb-col">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img id="pb-logo" src="/NeetLogo.png" alt="Neetcode logo" />
            </div>
            <div className="pb-col">
              <p>AUTH // TOKEN // VERIFIED</p>
            </div>
          </div>

          <div className="pb-row">
            <div className="pb-col">
              <p>Interview Workspace</p>
            </div>
            <div className="pb-col">
              <p>Queues • Arrays • Graphs • DP</p>
            </div>
            <div className="pb-col">
              <p>MFA Confidence &gt; 99%</p>
            </div>
            <div className="pb-col">
              <p>Profile Synced</p>
              <p>Progress Loaded</p>
            </div>
            <div className="pb-col">
              <p>Challenge Set Ready</p>
              <p>Opening Dashboard</p>
            </div>
            <div className="pb-col">
              <p>NC</p>
            </div>
          </div>
        </div>

        {nav}

        <div className="preloader-hero">
          <div className="relative z-10 min-h-0">{hero}</div>
          <div className="preloader-revealer" aria-hidden />
        </div>

        <div className="preloader">
          <div className="p-row">
            <p>Authenticating</p>
          </div>
          <div className="p-row">
            <div className="p-col">
              <div className="p-sub-col">
                <p>Login Step 01</p>
                <p>Credentials</p>
              </div>
              <div className="p-sub-col">
                <p>Session Sync</p>
                <p>Skill Graph</p>
              </div>
            </div>
            <div className="p-col">
              <p>NC-LOGIN</p>
            </div>
          </div>

          <div className="preloader-btn-container">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img id="pbc-logo" src="/NeetLogo.png" alt="Neetcode logo" />
            <p id="pbc-label">Loading</p>
            <p id="pbc-outro-label">Signed In</p>

            <div className="pbc-svg-strokes">
              <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle
                  className="stroke-track"
                  cx="160"
                  cy="160"
                  r="155"
                  stroke="#2b2b2b"
                  strokeWidth="2"
                  strokeDasharray="974"
                  strokeDashoffset="974"
                />
                <circle
                  className="stroke-progress"
                  cx="160"
                  cy="160"
                  r="155"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeDasharray="974"
                  strokeDashoffset="974"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {children}

      <ScrollEffects />
    </>
  );
}
