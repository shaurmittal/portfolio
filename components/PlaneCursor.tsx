"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/useReplayInView";
import { AIRLINER_BODY } from "./Airliner";

const SIZE = 26;

// A plane that replaces the mouse cursor, turns to face the direction it's
// moving. CSS cursors can't rotate, so the system
// cursor is hidden and the plane is drawn in its place (mouse/trackpad only).
// With reduced motion or without JS, visitors simply get their normal cursor.
export function PlaneCursor() {
  const planeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = planeRef.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches || prefersReducedMotion()) return;
    const html = document.documentElement;
    html.classList.add("plane-cursor");

    let x = -100;
    let y = -100;
    let lastX = 0;
    let lastY = 0;
    let angle = -45; // degrees; 0 = nose up, -45 = up-left like a normal arrow
    let target = -45;
    let raf = 0;

    const frame = () => {
      raf = 0;
      // Turn toward the heading the shortest way round, easing a little
      const diff = ((target - angle + 540) % 360) - 180;
      angle += diff * 0.3;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${angle}deg)`;
      if (Math.abs(diff) > 0.5) raf = requestAnimationFrame(frame);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const dx = x - lastX;
      const dy = y - lastY;
      // Ignore tiny jitters so the plane doesn't spin in place
      if (dx * dx + dy * dy > 16) {
        target = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
        lastX = x;
        lastY = y;
      }
      const t = e.target as Element | null;
      el.dataset.hover = t?.closest?.('a, button, [role="button"], label, summary, .cursor-pointer') ? "true" : "false";
      el.style.opacity = "1";
      schedule();
    };
    const hide = () => (el.style.opacity = "0");
    const down = () => (el.dataset.down = "true");
    const up = () => (el.dataset.down = "false");

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", hide);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      html.classList.remove("plane-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", hide);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={planeRef}
      aria-hidden="true"
      className="plane-cursor-el pointer-events-none fixed left-0 top-0 z-[1000] opacity-0"
      // Nose of the plane sits exactly on the pointer, and it turns around its nose
      style={{ width: SIZE, height: SIZE, marginLeft: -SIZE / 2, marginTop: -1, transformOrigin: `${SIZE / 2}px 1px` }}
    >
      <svg viewBox="0 0 64 64" width={SIZE} height={SIZE}>
        <path d={AIRLINER_BODY} strokeWidth="5" strokeLinejoin="round" paintOrder="stroke" />
      </svg>
    </div>
  );
}
