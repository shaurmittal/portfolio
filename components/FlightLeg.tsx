"use client";

import { useEffect, useId, useRef } from "react";
import { prefersReducedMotion } from "@/lib/useReplayInView";
import { AIRLINER_BODY, AIRLINER_ENGINES } from "./Airliner";

type Stop = { code: string; label: string };

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

// A big banner-towing plane that crosses the whole screen between two
// sections. Its position is tied to scroll, so it flies exactly as fast as the
// visitor scrolls (and turns around when they scroll back up).
export function FlightLeg({ to, reverse = false }: { to: Stop; reverse?: boolean }) {
  const bandRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<SVGGElement>(null);
  const shadowRef = useRef<SVGPathElement>(null);
  const bannerRef = useRef<SVGGElement>(null);
  const ropeRef = useRef<SVGLineElement>(null);
  const ids = useId();
  const blurId = `${ids}-blur`;
  const bannerText = `NEXT STOP · ${to.code} ${to.label.toUpperCase()}`;

  useEffect(() => {
    const band = bandRef.current;
    if (!band) return;
    const reduce = prefersReducedMotion();
    let lastY = window.scrollY;
    let up = false;
    let frame = 0;
    let shown = -1; // eased progress that glides toward the scroll position

    const render = () => {
      frame = 0;
      const W = band.clientWidth;
      const H = band.clientHeight;
      const vh = window.innerHeight;
      const small = W < 640;
      const size = small ? 64 : 112;
      // Size the banner to the rendered text (letter-spacing included)
      const text = bannerRef.current?.querySelector("text");
      const bannerW = (text?.getComputedTextLength() ?? bannerText.length * 8) + 32;

      // 0 as the band enters at the bottom of the screen, 1 as it leaves the top
      const center = band.getBoundingClientRect().top + H / 2;
      const target = reduce ? 0.5 : clamp01((vh * 1.02 - center) / (vh * 1.1));
      // Glide toward the target instead of snapping to it
      shown = shown < 0 || reduce ? target : shown + (target - shown) * 0.08;
      if (Math.abs(target - shown) > 0.0005) schedule();
      else shown = target;
      const p = shown;

      if (window.scrollY !== lastY) up = window.scrollY < lastY;
      lastY = window.scrollY;

      // Start/finish fully off-screen, banner included
      const margin = size + bannerW + 60;
      const [xs, xe] = reverse ? [W + margin, -margin] : [-margin, W + margin];
      const x = xs + (xe - xs) * p;
      const Y = (px: number) => H * 0.64 - Math.sin(Math.PI * clamp01(px / W)) * H * 0.3;
      const y = Y(x);

      // Screen direction of travel (+1 = right); flips while scrolling back up
      const dir = (reverse ? -1 : 1) * (up && !reduce ? -1 : 1);
      const dy = Y(x + dir * 2) - y;
      const slope = (Math.atan2(dy, dir * 2) * 180) / Math.PI;
      const tilt = (Math.atan2(dy, 2) * 180) / Math.PI;

      planeRef.current?.setAttribute(
        "transform",
        `translate(${x},${y}) rotate(${slope + 90}) translate(${-size / 2},${-size / 2}) scale(${size / 64})`,
      );
      shadowRef.current?.setAttribute(
        "transform",
        `translate(${x + size * 0.1},${y + size * 0.42}) rotate(${slope + 90}) translate(${-size / 2},${-size / 2}) scale(${size / 64})`,
      );

      const tailX = x - dir * size * 0.42;

      // Banner towed on a line behind the tail
      const bx = tailX - dir * (46 + bannerW / 2);
      const by = Y(bx) + size * 0.05;
      bannerRef.current?.setAttribute("transform", `translate(${bx},${by}) rotate(${tilt}) translate(${-bannerW / 2},-14)`);
      bannerRef.current?.querySelector("rect")?.setAttribute("width", `${bannerW}`);
      bannerRef.current?.querySelector("text")?.setAttribute("x", `${bannerW / 2}`);
      if (ropeRef.current) {
        ropeRef.current.setAttribute("x1", `${tailX}`);
        ropeRef.current.setAttribute("y1", `${y}`);
        ropeRef.current.setAttribute("x2", `${bx + dir * (bannerW / 2)}`);
        ropeRef.current.setAttribute("y2", `${by}`);
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [reverse, bannerText]);

  return (
    <div ref={bandRef} aria-hidden="true" className="relative h-[130px] w-full overflow-x-clip sm:h-[190px]">
      <svg className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <filter id={blurId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        <line ref={ropeRef} strokeWidth="1.2" className="stroke-text/40" />
        <g ref={bannerRef}>
          <rect height="28" rx="6" className="fill-paper stroke-paper-route" strokeWidth="1.5" />
          <text y="18.5" textAnchor="middle" className="fill-paper-route font-mono text-[11px] font-bold tracking-[0.18em] sm:text-[12px]">
            {bannerText}
          </text>
        </g>

        <path ref={shadowRef} d={AIRLINER_BODY} filter={`url(#${blurId})`} className="fill-black/25" />
        <g ref={planeRef}>
          <path d={AIRLINER_ENGINES} className="fill-route" opacity="0.8" />
          <path d={AIRLINER_BODY} className="fill-route" />
          <rect x="31" y="8" width="2" height="40" rx="1" fill="white" opacity="0.45" />
        </g>
      </svg>
    </div>
  );
}
