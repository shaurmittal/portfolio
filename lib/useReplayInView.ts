"use client";

import { useEffect, useState, type RefObject } from "react";

// True once the element scrolls into view. Resets to false when the element
// leaves through the bottom of the screen (i.e. the visitor scrolled back up),
// so the animation plays again next time it comes into view.
export function useReplayInView(ref: RefObject<Element | null>, threshold = 0.25) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
        else if (e.boundingClientRect.top > 0) setInView(false);
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return inView;
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
