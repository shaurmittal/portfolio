"use client";

import { useEffect, useRef, useState } from "react";
import { Airliner } from "./Airliner";

const LEAVE_MS = 1100;

// Full-screen "Ready for takeoff?" welcome. Boards on click, Enter/Space, or
// automatically when the progress line fills. Shown once per browser session.
export function Intro() {
  const [state, setState] = useState<"waiting" | "leaving" | "gone">("waiting");
  const boarded = useRef(false);

  const board = () => {
    if (boarded.current) return;
    boarded.current = true;
    setState("leaving");
    document.documentElement.classList.add("boarded");
    try {
      sessionStorage.setItem("boarded", "1");
    } catch {}
    window.setTimeout(() => setState("gone"), LEAVE_MS);
  };

  useEffect(() => {
    if (document.documentElement.classList.contains("skip-intro")) {
      boarded.current = true;
      setState("gone");
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        board();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (state === "gone") return null;

  return (
    <div
      className="intro fixed inset-0 z-[100] flex-col items-center justify-center bg-bg px-6 text-center"
      data-state={state}
      role="dialog"
      aria-label="Welcome"
    >
      <div className="intro-content flex flex-col items-center">
        <p className="intro-line font-mono text-[11px] font-bold tracking-[0.3em] text-route" style={{ ["--d" as string]: 0 }}>
          SM AIRWAYS · FLIGHT SM27
        </p>
        <p className="intro-line mt-5 text-5xl font-bold tracking-tight sm:text-7xl" style={{ ["--d" as string]: 1 }}>
          Ready for takeoff?
        </p>
        <p className="intro-line mt-4 max-w-md text-lg text-muted" style={{ ["--d" as string]: 2 }}>
          Shaurya Mittal · Waterloo CS · AI &amp; software
        </p>
        <button
          type="button"
          onClick={board}
          className="intro-line group mt-10 inline-flex items-center gap-3 rounded-full bg-route px-7 py-3.5 font-mono text-sm font-bold tracking-[0.2em] text-bg shadow-[0_12px_30px_-10px_var(--route)] transition-transform hover:-translate-y-0.5"
          style={{ ["--d" as string]: 3 }}
        >
          BOARD NOW
          <Airliner className="h-5 w-5 rotate-90 transition-transform group-hover:translate-x-1" />
        </button>
        <div className="intro-line mt-8 w-48" style={{ ["--d" as string]: 4 }}>
          <div className="h-0.5 overflow-hidden rounded-full bg-text/10">
            <div className="intro-progress h-full bg-route/70" onAnimationEnd={board} />
          </div>
          <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-muted">BOARDING AUTOMATICALLY</p>
        </div>
      </div>

      {/* Takeoff: flies across as the intro lifts away */}
      <div className="intro-takeoff pointer-events-none absolute left-0 top-0 text-route" aria-hidden="true">
        <Airliner className="h-16 w-16" />
      </div>
    </div>
  );
}
