"use client";

import { useEffect, useRef, useState } from "react";
import { destinations, type Destination } from "@/content/data";
import { prefersReducedMotion, useReplayInView } from "@/lib/useReplayInView";
import { DestIcon, ICON_PATHS } from "./Icons";
import { SectionHeader } from "./SectionHeader";

const W = 1000;
const H = 560;
const HUB = { x: 500, y: 290 };
const RX = 380;
const RY = 200;
const PLANE_PATH =
  "M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z";

const hub = destinations.find((d) => d.hub) ?? destinations[0];
const spokes = destinations.filter((d) => d !== hub);

// Spread destinations evenly around the hub unless they set their own angle/distance
const placed = spokes.map((d, i) => {
  const angle = ((d.angle ?? 160 - (i * 360) / spokes.length) * Math.PI) / 180;
  const r = d.distance ?? (i % 2 ? 0.85 : 1);
  const x = HUB.x + Math.cos(angle) * RX * r;
  const y = HUB.y - Math.sin(angle) * RY * r;
  // Curved route: bend the midpoint sideways by 20% of the route length
  const mx = (HUB.x + x) / 2;
  const my = (HUB.y + y) / 2;
  const dx = x - HUB.x;
  const dy = y - HUB.y;
  const route = `M${HUB.x},${HUB.y} Q${(mx - dy * 0.2).toFixed(1)},${(my + dx * 0.2).toFixed(1)} ${x.toFixed(1)},${y.toFixed(1)}`;
  return { d, x, y, route };
});

function Marker({
  d,
  x,
  y,
  big,
  selected,
  onSelect,
}: {
  d: Destination;
  x: number;
  y: number;
  big?: boolean;
  selected: boolean;
  onSelect: () => void;
}) {
  const r = big ? 38 : 26;
  const iconScale = big ? 2 : 1.35;
  return (
    <g transform={`translate(${x},${y})`} onClick={onSelect} className="cursor-pointer" aria-hidden="true">
      {selected && <circle r={r + 12} className="map-pulse fill-paper-route/15" />}
      <circle r={r} className={`fill-paper-route stroke-paper transition-transform ${selected ? "" : "hover:scale-110"}`} strokeWidth="4" />
      <path d={ICON_PATHS[d.icon]} transform={`scale(${iconScale}) translate(-12,-12)`} className="pointer-events-none fill-paper" />
      <text y={r + 30} textAnchor="middle" className="map-label pointer-events-none fill-paper-ink font-mono text-[20px] font-bold tracking-[0.1em] max-sm:text-[34px]">
        {d.city.toUpperCase()}
      </text>
      {big && (
        <text y={r + 56} textAnchor="middle" className="map-label pointer-events-none fill-paper-muted font-mono text-[14px] tracking-[0.25em] max-sm:hidden">
          HOME BASE
        </text>
      )}
    </g>
  );
}

function Postcard({ d }: { d: Destination }) {
  return (
    <article key={d.city} className="postcard-in flex h-full flex-col overflow-hidden rounded-2xl bg-paper text-paper-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)]">
      {d.image ? (
        <img src={d.image} alt={d.imageAlt ?? `${d.city}, ${d.country}`} className="aspect-[16/7] w-full object-cover sm:aspect-[16/10]" />
      ) : (
        <div className="relative flex aspect-[16/7] items-center sm:aspect-[16/10] justify-center bg-paper-route text-paper" aria-hidden="true">
          <DestIcon icon={d.icon} className="h-16 w-16 opacity-90" />
          <span className="absolute bottom-3 right-4 font-mono text-4xl font-bold tracking-widest opacity-30">{d.code}</span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-paper-muted">
              {d.code} · {d.when}
            </p>
            <h3 className="mt-1 text-2xl font-bold">
              {d.city}, {d.country}
            </h3>
          </div>
          {/* Passport-style stamp */}
          <span className="shrink-0 -rotate-12 rounded-md border-2 border-paper-route px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-paper-route">
            {d.hub ? "Home base" : "Visited"}
          </span>
        </div>
        <p className="mt-3 leading-relaxed">{d.story}</p>
      </div>
    </article>
  );
}

export function FlightsMap() {
  const [selected, setSelected] = useState<Destination>(hub);
  const mapRef = useRef<HTMLDivElement>(null);
  const motionRefs = useRef<(SVGAnimateMotionElement | null)[]>([]);
  const inView = useReplayInView(mapRef, 0.35);

  // Each time the map comes into view, planes take off from the hub one after another
  useEffect(() => {
    if (!inView || prefersReducedMotion()) return;
    const timers = motionRefs.current.map((m, i) => window.setTimeout(() => m?.beginElement(), 500 + i * 350));
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <>
      <SectionHeader gate="B2" label="Route map" title="Flights I've taken" />

      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <div data-reveal>
        <div
          ref={mapRef}
          data-in={inView ? "" : undefined}
          className="flights-map overflow-hidden rounded-2xl bg-paper text-paper-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)]"
        >
          <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-labelledby="flights-title">
            <title id="flights-title">
              {`Flight map: routes from ${hub.city} to ${spokes.map((s) => s.city).join(", ")}`}
            </title>
            <defs>
              <pattern id="map-dots" width="18" height="18" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.3" className="fill-paper-line" />
              </pattern>
            </defs>
            <rect width={W} height={H} fill="url(#map-dots)" />

            {placed.map((p) => (
              <g key={p.d.city}>
                <path d={p.route} fill="none" strokeWidth="2" strokeDasharray="6 7" className="stroke-paper-line" />
                <path d={p.route} fill="none" strokeWidth="3" pathLength={1} className="route-draw stroke-paper-route" />
              </g>
            ))}

            {placed.map((p, i) => (
              <g key={`plane-${p.d.city}`} className="route-plane" style={{ transitionDelay: `${0.5 + i * 0.35}s` }}>
                <path d={PLANE_PATH} transform="rotate(90) scale(1.4) translate(-12,-12)" className="fill-paper-route stroke-paper" strokeWidth="1">
                  <animateMotion
                    ref={(el) => {
                      motionRefs.current[i] = el as SVGAnimateMotionElement | null;
                    }}
                    dur="1.6s"
                    begin="indefinite"
                    fill="freeze"
                    rotate="auto"
                    keyPoints="0;0.68"
                    keyTimes="0;1"
                    calcMode="spline"
                    keySplines="0.4 0 0.2 1"
                    path={p.route}
                  />
                </path>
              </g>
            ))}

            {placed.map((p) => (
              <Marker key={p.d.city} d={p.d} x={p.x} y={p.y} selected={selected === p.d} onSelect={() => setSelected(p.d)} />
            ))}
            <Marker d={hub} x={HUB.x} y={HUB.y} big selected={selected === hub} onSelect={() => setSelected(hub)} />
          </svg>

          <div className="flex flex-wrap gap-2 border-t border-paper-line p-4" role="group" aria-label="Destinations">
            {[hub, ...spokes].map((d) => (
              <button
                key={d.city}
                type="button"
                aria-pressed={selected === d}
                onClick={() => setSelected(d)}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors ${
                  selected === d
                    ? "border-paper-route bg-paper-route text-paper"
                    : "border-paper-line text-paper-ink hover:border-paper-route"
                }`}
              >
                <DestIcon icon={d.icon} className="h-4 w-4" />
                {d.city}
              </button>
            ))}
          </div>
        </div>
        </div>

        <div aria-live="polite" data-reveal style={{ ["--i" as string]: 2 }}>
          <Postcard key={selected.city} d={selected} />
        </div>
      </div>
    </>
  );
}
