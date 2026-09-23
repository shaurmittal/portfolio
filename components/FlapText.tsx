"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, useReplayInView } from "@/lib/useReplayInView";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// Split-flap text. Server-renders the final text (works without JS). Each time
// the board scrolls into view, the tiles cycle through random letters and settle.
export function FlapText({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const [chars, setChars] = useState(() => text.split(""));
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useReplayInView(ref, 0.3);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const final = text.split("");
    if (!inView) {
      setChars(final.map(() => " "));
      return;
    }
    const start = performance.now() + delay;
    const timer = window.setInterval(() => {
      const t = performance.now() - start;
      if (t < 0) return;
      let done = true;
      setChars(
        final.map((c, i) => {
          // Tiles settle left to right, ~40ms apart, after ~300ms of flipping
          if (c === " " || t > 300 + i * 40) return c;
          done = false;
          return CHARSET[Math.floor(Math.random() * CHARSET.length)];
        }),
      );
      if (done) window.clearInterval(timer);
    }, 60);
    return () => window.clearInterval(timer);
  }, [inView, text, delay]);

  return (
    <span ref={ref} className={`inline-flex gap-px sm:gap-[2px] ${className}`}>
      <span className="sr-only">{text}</span>
      {chars.map((c, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="relative inline-flex h-[1.6em] w-[1.05em] items-center justify-center rounded-[3px] bg-board-tile font-bold text-board-strong after:absolute after:inset-x-0 after:top-1/2 after:h-px after:bg-board-bg/60 sm:w-[1.15em]"
        >
          {c}
        </span>
      ))}
    </span>
  );
}
