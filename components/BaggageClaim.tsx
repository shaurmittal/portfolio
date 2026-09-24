"use client";

import { useRef, useState } from "react";
import { skills } from "@/content/data";
import { PlaneIcon } from "./PlaneIcon";
import { SectionHeader } from "./SectionHeader";

// Split the categories across the two halves of the case so each holds about
// the same number of items.
const total = skills.reduce((n, s) => n + s.items.length, 0);
let running = 0;
const halves: (typeof skills)[] = [[], []];
for (const cube of skills) {
  halves[running < total / 2 ? 0 : 1].push(cube);
  running += cube.items.length;
}

// Global drop order, so items fall in one after another across both halves
let order = 0;
const dropOrder = new Map(skills.flatMap((c) => c.items.map((item) => [`${c.belt}:${item}`, order++] as const)));

function Cube({ cube }: { cube: (typeof skills)[number] }) {
  return (
    <div className="flex-1 rounded-xl border-2 border-dashed border-text/15 bg-bg/40 p-3 sm:p-4">
      <h3 className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-muted">{cube.belt}</h3>
      <ul className="flex flex-wrap gap-2.5">
        {cube.items.map((s, j) => (
          <li
            key={s}
            style={{ ["--n" as string]: dropOrder.get(`${cube.belt}:${s}`) }}
            className={`case-item relative flex items-center gap-2 rounded-md rounded-l-2xl bg-paper py-1.5 pl-3 pr-3.5 font-mono text-sm font-bold text-paper-ink shadow-sm ring-1 ring-paper-line transition-transform hover:-translate-y-1 ${j % 2 ? "rotate-1" : "-rotate-1"}`}
          >
            <span className="h-2.5 w-2.5 rounded-full border-2 border-paper-line bg-bg" aria-hidden="true" />
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Strap() {
  return (
    <div className="relative my-1 h-4 rounded-sm bg-case/80 shadow-inner" aria-hidden="true">
      <span className="absolute left-1/2 top-1/2 h-6 w-9 -translate-x-1/2 -translate-y-1/2 rounded-md border-[3px] border-[#c9ced6] bg-case" />
    </div>
  );
}

function Interior({ cubes }: { cubes: typeof skills }) {
  return (
    <div className="case-lining flex h-full flex-col gap-3 rounded-2xl p-3 sm:p-4">
      {cubes.map((cube, i) => (
        // Cubes stretch so both halves of the case end evenly
        <div key={cube.belt} className="flex flex-1 flex-col">
          {i > 0 && <Strap />}
          <Cube cube={cube} />
        </div>
      ))}
    </div>
  );
}

export function BaggageClaim() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLDivElement>(null);

  const toggle = (next: boolean) => {
    setOpen(next);
    // Keep keyboard focus on whichever control is visible now
    window.setTimeout(() => (next ? closeRef : openRef).current?.focus({ preventScroll: true }), 50);
  };

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <SectionHeader gate="C1" label="Baggage claim" title="What I pack" />
        <button
          ref={closeRef}
          type="button"
          onClick={() => toggle(false)}
          aria-controls="suitcase"
          className={`mb-8 shrink-0 rounded-full border border-text/15 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted transition-opacity hover:border-route hover:text-route ${open ? "" : "pointer-events-none invisible opacity-0"}`}
        >
          Close suitcase
        </button>
      </div>

      {/* Closed until clicked; data-open drives the lid, the slide, and the items dropping in */}
      <div id="suitcase" className="suitcase" data-open={open ? "" : undefined}>
        <div className="case grid md:grid-cols-2">
          {/* While closed, this half (which the folded lid sits exactly on top of) is the
              "open" button. The lid itself can't take clicks: Chrome hit-tests a folded
              3D lid as if it covered the whole screen. */}
          <div
            ref={openRef}
            {...(open
              ? {}
              : {
                  role: "button",
                  tabIndex: 0,
                  "aria-expanded": false,
                  "aria-controls": "suitcase",
                  "aria-label": "Open the suitcase to see my skills",
                  onClick: () => toggle(true),
                  onKeyDown: (e: React.KeyboardEvent) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggle(true);
                    }
                  },
                })}
            className="case-shell rounded-3xl p-2.5 max-md:rounded-b-none md:rounded-r-none"
          >
            <Interior cubes={halves[0]} />
          </div>

          <div className="case-lid">
            {/* Inside of the lid */}
            <div className="case-face case-shell h-full rounded-3xl p-2.5 max-md:rounded-t-none md:rounded-l-none">
              <Interior cubes={halves[1]} />
            </div>
            {/* Outside of the lid: what you see while the case is closed (decorative) */}
            <div
              aria-hidden="true"
              className="case-face case-outside case-shell absolute inset-0 flex items-center justify-center rounded-3xl"
            >
              <span className="case-ridges absolute inset-0 rounded-3xl" aria-hidden="true" />
              <span className="case-handle absolute left-1/2 top-0 h-5 w-28 -translate-x-1/2 -translate-y-3 rounded-t-2xl border-[5px] border-b-0 border-[#c9ced6]" aria-hidden="true" />
              <span className="relative flex flex-col items-center gap-2 text-white/90" aria-hidden="true">
                <PlaneIcon className="h-9 w-9 rotate-90" />
                <span className="font-mono text-sm font-bold tracking-[0.3em]">SM AIRWAYS</span>
                <span className="case-hint mt-5 flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 font-mono text-[11px] font-bold tracking-[0.2em] text-white ring-1 ring-white/30">
                  <span className="h-2 w-2 rounded-full bg-white" />
                  <span className="[@media(hover:none)]:hidden">CLICK TO OPEN</span>
                  <span className="hidden [@media(hover:none)]:inline">TAP TO OPEN</span>
                </span>
              </span>
              {/* Luggage tag */}
              <span className="absolute bottom-8 right-8 rotate-6 rounded-md bg-paper px-3 py-2 text-left font-mono text-[10px] font-bold uppercase leading-tight tracking-[0.15em] text-paper-ink shadow-md" aria-hidden="true">
                <span className="text-paper-muted">Contents</span>
                <br />
                {total} skills
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
