"use client";

import { useEffect } from "react";

// Fades/slides in every [data-reveal] element as it scrolls into view, and
// resets it when it leaves through the bottom so it replays on the way back down.
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.setAttribute("data-in", "");
          else if (e.boundingClientRect.top > 0) e.target.removeAttribute("data-in");
        }
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
