"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/useReplayInView";
import { PlaneIcon } from "./PlaneIcon";

// A plane that hops between sections. Sections opt in with
// data-plane="STATUS|GATE" (e.g. "REFUELING|A1"). The plane parks beside the
// current section, alternating right/left, and flies across the screen to the
// other side whenever the visitor scrolls into a new section.

const FLIGHT_MS = 1500;
const CONTENT_WIDTH = 1024;

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function FlightPath() {
  const planeRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const gateRef = useRef<HTMLSpanElement>(null);
  const trailRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-plane]"));
    if (!sections.length) return;
    const reduce = prefersReducedMotion();

    let current = -1;
    let pos = { x: 0, y: 0 };
    let raf = 0;
    let frame = 0;

    const geom = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const gutter = (w - CONTENT_WIDTH) / 2;
      const wide = w >= 1260; // matches the label's min-[1260px] breakpoint
      const size = wide ? 44 : 26;
      // Narrow screens have no side margin, so the plane parks just off-screen
      // and only appears while flying edge to edge between sections
      const inset = wide ? gutter / 2 : -size;
      return { w, h, wide, size, left: inset, right: w - inset, y: wide ? h * 0.32 : h * 0.2 };
    };

    // Even sections park on the right, odd ones on the left
    const parkSpot = (i: number) => {
      const g = geom();
      return { x: i % 2 === 0 ? g.right : g.left, y: g.y };
    };

    const draw = (x: number, y: number, angle: number) => {
      const { size } = geom();
      if (planeRef.current) {
        planeRef.current.style.width = planeRef.current.style.height = `${size}px`;
        planeRef.current.style.transform = `translate(${x - size / 2}px, ${y - size / 2}px) rotate(${angle}deg)`;
      }
      if (labelRef.current) labelRef.current.style.transform = `translate(${x - 70}px, ${y + size / 2 + 10}px)`;
    };

    // The icon points up; this turns a travel direction into a CSS rotation
    const heading = (dx: number, dy: number) => (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    // When parked, face the middle of the screen (where it will fly next)
    const parkedAngle = (x: number) => (x > window.innerWidth / 2 ? heading(-1, 0) : heading(1, 0));

    const setLabel = (i: number | null) => {
      const [status, gate] = i === null ? ["EN ROUTE", ""] : (sections[i].dataset.plane ?? "").split("|");
      if (statusRef.current) statusRef.current.textContent = status;
      if (gateRef.current) gateRef.current.textContent = gate ? `GATE ${gate}` : "";
      labelRef.current?.setAttribute("data-flying", i === null ? "true" : "false");
      planeRef.current?.setAttribute("data-parked", i === null ? "false" : "true");
    };

    const land = (i: number) => {
      pos = parkSpot(i);
      draw(pos.x, pos.y, parkedAngle(pos.x));
      setLabel(i);
      trailRef.current?.setAttribute("data-fade", "true");
    };

    const fly = (i: number) => {
      cancelAnimationFrame(raf);
      const from = { ...pos };
      const to = parkSpot(i);
      const { h } = geom();
      const dip = h * 0.28; // how far the flight path swoops down mid-screen
      const t0 = performance.now();
      const pts: string[] = [];
      setLabel(null);
      trailRef.current?.setAttribute("data-fade", "false");

      const at = (t: number) => {
        const e = ease(t);
        return {
          x: from.x + (to.x - from.x) * e,
          y: from.y + (to.y - from.y) * e + Math.sin(Math.PI * e) * dip,
        };
      };

      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / FLIGHT_MS);
        const p = at(t);
        const q = at(Math.min(1, t + 0.01));
        const angle = t < 1 ? heading(q.x - p.x || to.x - from.x, q.y - p.y) : parkedAngle(to.x);
        pos = p;
        draw(p.x, p.y, angle);
        pts.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`);
        trailRef.current?.setAttribute("d", `M${pts.join(" L")}`);
        if (t < 1) raf = requestAnimationFrame(step);
        else land(i);
      };
      raf = requestAnimationFrame(step);
    };

    const sectionIndex = () => {
      const mid = window.innerHeight * 0.5;
      let idx = 0;
      sections.forEach((s, i) => {
        if (s.getBoundingClientRect().top < mid) idx = i;
      });
      return idx;
    };

    const onScroll = () => {
      frame = 0;
      const idx = sectionIndex();
      if (idx === current) return;
      const first = current === -1;
      current = idx;
      if (first || reduce) land(idx);
      else fly(idx);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(onScroll);
    };
    const onResize = () => {
      cancelAnimationFrame(raf);
      if (current >= 0) land(current);
    };

    onScroll();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-30" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full">
        <path
          ref={trailRef}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeDasharray="2 8"
          strokeLinecap="round"
          className="plane-trail text-route/60"
        />
      </svg>
      <div ref={planeRef} className="plane absolute left-0 top-0 text-route will-change-transform">
        <PlaneIcon className="h-full w-full stroke-bg drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)] [paint-order:stroke] [stroke-width:1.5]" />
      </div>
      <div
        ref={labelRef}
        className="plane-label absolute left-0 top-0 hidden w-[140px] flex-col items-center gap-0.5 text-center font-mono text-[10px] font-bold tracking-[0.2em] min-[1260px]:flex"
      >
        <span ref={statusRef} className="rounded-full bg-route px-2.5 py-1 text-bg" />
        <span ref={gateRef} className="text-muted" />
      </div>
    </div>
  );
}
