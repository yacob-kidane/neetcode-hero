"use client";

import { useEffect } from "react";

function animateValue(
  el: HTMLElement,
  start: number,
  end: number,
  duration: number,
  decimals = 0,
) {
  let startTimestamp: number | null = null;
  const step = (timestamp: number) => {
    if (startTimestamp === null) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easeOutProgress =
      progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const currentVal = start + easeOutProgress * (end - start);
    el.textContent =
      decimals > 0 ? currentVal.toFixed(decimals) : String(Math.floor(currentVal));
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = decimals > 0 ? end.toFixed(decimals) : String(end);
  };
  requestAnimationFrame(step);
}

function overlapsViewport(el: Element) {
  const r = (el as HTMLElement).getBoundingClientRect();
  const h = window.innerHeight;
  return r.bottom > 0 && r.top < h;
}

export function ScrollEffects() {
  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px 0px 12% 0px",
      threshold: 0.05,
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const reveal = () => {
      document.querySelectorAll(".reveal-up").forEach((el) => {
        if (el.classList.contains("is-visible")) return;
        if (overlapsViewport(el)) {
          el.classList.add("is-visible");
        } else {
          revealObserver.observe(el);
        }
      });
    };

    // Two rAFs + load: first paint and late layout (fonts, images) can change rects.
    requestAnimationFrame(() => {
      requestAnimationFrame(reveal);
    });
    const onLoad = () => requestAnimationFrame(reveal);
    window.addEventListener("load", onLoad);

    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const targetVal = parseFloat(el.getAttribute("data-target") || "0");
          const decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
          animateValue(el, 0, targetVal, 2500, decimals);
          observer.unobserve(el);
        });
      },
      { threshold: 0.5 },
    );

    document.querySelectorAll(".metric-counter").forEach((c) => counterObserver.observe(c));

    return () => {
      window.removeEventListener("load", onLoad);
      revealObserver.disconnect();
      counterObserver.disconnect();
    };
  }, []);

  return null;
}
