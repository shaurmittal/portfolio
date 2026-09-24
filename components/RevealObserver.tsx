"use client";

import { useEffect } from "react";

// Fades/slides in every [data-reveal] element as it scrolls into view, and
// resets it when it leaves through the bottom so it replays on the way back down.
export function RevealObserver() {
  useEffect(() => {
    // One observer per threshold; elements can set data-threshold to trigger later
    // (e.g. the suitcase waits until most of it is on screen before opening)
    const observers = new Map<number, IntersectionObserver>();
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      const threshold = Number(el.dataset.threshold ?? 0.12);
      let io = observers.get(threshold);
      if (!io) {
        io = new IntersectionObserver(
          (entries) => {
            for (const e of entries) {
              if (e.isIntersecting) e.target.setAttribute("data-in", "");
              else if (e.boundingClientRect.top > 0) e.target.removeAttribute("data-in");
            }
          },
          { threshold },
        );
        observers.set(threshold, io);
      }
      io.observe(el);
    });
    return () => observers.forEach((io) => io.disconnect());
  }, []);
  return null;
}
