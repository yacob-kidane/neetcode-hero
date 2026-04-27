"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TypewriterProps {
  words: string[];
  speed?: number;
  deleteSpeed?: number;
  waitTime?: number;
  startDelay?: number;
  /** Shown in full first; after {@link holdBeforeCycleMs} the normal delete/type cycle begins. */
  initialWord?: string;
  /**
   * Delay after the last character of {@link initialWord} is shown before deleting and cycling {@link words}.
   * (Defer path only: `initialWord` + `startDelay` > 0.)
   */
  holdBeforeCycleMs?: number;
  className?: string;
}

export function Typewriter({
  words,
  speed = 80,
  deleteSpeed = 40,
  waitTime = 2200,
  startDelay = 0,
  initialWord = "",
  holdBeforeCycleMs = 200,
  className,
}: TypewriterProps) {
  const waitBeforeDeleteRef = useRef<number | null>(null);
  const deferInitialUntilStart = Boolean(initialWord && startDelay > 0);
  const [displayText, setDisplayText] = useState(() =>
    initialWord && !deferInitialUntilStart ? initialWord : "",
  );
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(() =>
    initialWord && !deferInitialUntilStart ? initialWord.length : 0,
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasStarted, setHasStarted] = useState(startDelay === 0);
  const [cycleStarted, setCycleStarted] = useState(() => !initialWord);
  const [deletingInitial, setDeletingInitial] = useState(false);

  useEffect(() => {
    if (startDelay === 0) {
      setHasStarted(true);
      return;
    }
    setHasStarted(false);
    const timeout = window.setTimeout(() => setHasStarted(true), startDelay);
    return () => window.clearTimeout(timeout);
  }, [startDelay]);

  useEffect(() => {
    if (!hasStarted || !initialWord || !deferInitialUntilStart) return;
    setDisplayText("");
    setCharIndex(0);
    setIsDeleting(false);
    setDeletingInitial(false);
    setCycleStarted(false);
  }, [hasStarted, initialWord, deferInitialUntilStart]);

  useEffect(() => {
    if (!hasStarted || !initialWord || deferInitialUntilStart || cycleStarted) return;
    const timeout = window.setTimeout(() => {
      setCycleStarted(true);
      setDeletingInitial(true);
      setIsDeleting(true);
    }, holdBeforeCycleMs);
    return () => window.clearTimeout(timeout);
  }, [hasStarted, initialWord, deferInitialUntilStart, cycleStarted, holdBeforeCycleMs]);

  useEffect(() => {
    if (!hasStarted || !initialWord || !deferInitialUntilStart || cycleStarted) return;
    if (charIndex !== initialWord.length) return;
    if (isDeleting) return;
    const timeout = window.setTimeout(() => {
      setCycleStarted(true);
      setDeletingInitial(true);
      setIsDeleting(true);
    }, holdBeforeCycleMs);
    return () => window.clearTimeout(timeout);
  }, [
    hasStarted,
    initialWord,
    deferInitialUntilStart,
    cycleStarted,
    charIndex,
    isDeleting,
    holdBeforeCycleMs,
    initialWord.length,
  ]);

  useEffect(() => {
    return () => {
      if (waitBeforeDeleteRef.current !== null) {
        clearTimeout(waitBeforeDeleteRef.current);
        waitBeforeDeleteRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) {
      return;
    }
    if (initialWord && !cycleStarted) {
      if (deferInitialUntilStart) {
        if (charIndex >= initialWord.length) {
          return;
        }
      } else {
        return;
      }
    }

    if (!deletingInitial && words.length === 0) {
      return;
    }

    const typingInitialPhrase =
      Boolean(initialWord) &&
      !cycleStarted &&
      deferInitialUntilStart &&
      charIndex < initialWord.length;

    const activeWord = typingInitialPhrase
      ? initialWord
      : deletingInitial
        ? initialWord
        : (words[wordIndex] ?? "");
    if (!activeWord) {
      return;
    }

    const tick = () => {
      if (!isDeleting) {
        if (charIndex < activeWord.length) {
          setDisplayText(activeWord.slice(0, charIndex + 1));
          setCharIndex((i) => i + 1);
        } else {
          if (
            initialWord &&
            !cycleStarted &&
            deferInitialUntilStart &&
            activeWord === initialWord
          ) {
            return;
          }
          if (waitBeforeDeleteRef.current !== null) {
            clearTimeout(waitBeforeDeleteRef.current);
          }
          waitBeforeDeleteRef.current = window.setTimeout(() => {
            waitBeforeDeleteRef.current = null;
            setIsDeleting(true);
          }, waitTime);
          return;
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(activeWord.slice(0, charIndex - 1));
          setCharIndex((i) => i - 1);
        } else if (deletingInitial) {
          setDeletingInitial(false);
          setIsDeleting(false);
        } else {
          setIsDeleting(false);
          setWordIndex((i) => (i + 1) % words.length);
        }
      }
    };

    const delay = isDeleting ? deleteSpeed : speed;
    const timeout = window.setTimeout(tick, delay);
    return () => {
      clearTimeout(timeout);
      if (waitBeforeDeleteRef.current !== null) {
        clearTimeout(waitBeforeDeleteRef.current);
        waitBeforeDeleteRef.current = null;
      }
    };
  }, [
    charIndex,
    hasStarted,
    isDeleting,
    wordIndex,
    words,
    speed,
    deleteSpeed,
    waitTime,
    cycleStarted,
    deletingInitial,
    initialWord,
    deferInitialUntilStart,
  ]);

  const showCaret = hasStarted || !initialWord;

  return (
    <span className={cn("inline", className)}>
      {displayText.split("\n").map((line, i, arr) => (
        <span key={i}>
          {line}
          {i < arr.length - 1 && <br />}
        </span>
      ))}
      {showCaret ? (
        <span className="animate-[blink_1s_step-end_infinite] ml-0.5 inline-block w-[2px] h-[0.85em] align-middle bg-current opacity-75" />
      ) : null}
    </span>
  );
}
