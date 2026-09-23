"use client";

import { Fragment, useState } from "react";
import { flights, profile, type Flight } from "@/content/data";
import { FlapText } from "./FlapText";
import { PlaneIcon } from "./PlaneIcon";

const STATUS = {
  landed: { label: "LANDED", className: "text-board-landed", blink: false },
  "in-air": { label: "IN AIR", className: "text-board-accent", blink: false },
  boarding: { label: "BOARDING", className: "text-board-boarding", blink: true },
} as const;

// The last row on the board: the open seat for the next team.
const nextFlight = {
  code: "SM27",
  destination: "YOUR COMPANY",
  year: "2027",
  status: "boarding" as const,
};

function StatusCell({ status }: { status: keyof typeof STATUS }) {
  const s = STATUS[status];
  return (
    <span className={`inline-flex items-center gap-2 font-bold ${s.className}`}>
      <span className={`h-2 w-2 rounded-full bg-current ${s.blink ? "blink" : ""}`} aria-hidden="true" />
      {s.label}
    </span>
  );
}

function FlightDetails({ f }: { f: Flight }) {
  return (
    <div className="grid gap-5 px-4 py-5 sm:px-6 md:grid-cols-[1fr_14rem]">
      <div>
        <p className="font-sans text-lg font-semibold text-board-strong">{f.title}</p>
        <p className="mt-0.5 font-sans text-sm text-board-muted">
          {f.org ? `${f.org} · ` : ""}
          {f.when}
        </p>
        <ul className="mt-4 space-y-2 font-sans text-sm leading-relaxed text-board-ink">
          {f.points.map((p) => (
            <li key={p} className="flex gap-3">
              <PlaneIcon className="mt-1 h-3 w-3 shrink-0 rotate-90 text-board-accent" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-[10px] tracking-[0.2em] text-board-muted">CARGO</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {f.stack.map((t) => (
              <li key={t} className="rounded border border-board-line px-2 py-0.5 font-sans text-xs text-board-ink">
                {t}
              </li>
            ))}
          </ul>
        </div>
        {f.links && (
          <ul className="flex flex-wrap gap-2">
            {f.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block rounded border border-board-accent px-3 py-1.5 text-xs font-bold tracking-widest text-board-accent hover:bg-board-accent hover:text-board-bg"
                >
                  {l.label.toUpperCase()} ↗
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function DeparturesBoard() {
  const [open, setOpen] = useState<string | null>(null);
  const toggle = (code: string) => setOpen((o) => (o === code ? null : code));

  return (
    <div className="overflow-hidden rounded-2xl bg-board-bg font-mono text-board-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)] ring-1 ring-board-line">
      <div className="flex items-center justify-between border-b border-board-line px-4 py-4 sm:px-6">
        <h2 className="flex items-center gap-3 text-xl font-bold tracking-[0.3em] text-board-strong sm:text-2xl">
          <PlaneIcon className="h-6 w-6 -rotate-45 text-board-accent" />
          DEPARTURES
        </h2>
        <p className="hidden text-xs tracking-[0.2em] text-board-muted sm:block">SELECT A FLIGHT FOR DETAILS</p>
      </div>

      <table className="w-full border-collapse text-left text-[11px] sm:text-[15px]">
        <caption className="sr-only">Experience and projects. Select a flight to see details.</caption>
        <thead>
          <tr className="text-[10px] tracking-[0.2em] text-board-muted">
            <th scope="col" className="hidden px-4 py-3 font-normal sm:table-cell sm:px-6">FLIGHT</th>
            <th scope="col" className="py-3 pl-4 font-normal sm:pl-0">DESTINATION</th>
            <th scope="col" className="hidden py-3 font-normal md:table-cell">TYPE</th>
            <th scope="col" className="hidden py-3 font-normal sm:table-cell">YEAR</th>
            <th scope="col" className="px-4 py-3 font-normal sm:px-6">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((f, i) => {
            const isOpen = open === f.code;
            const panelId = `flight-${f.code}`;
            return (
              <Fragment key={f.code}>
                <tr
                  onClick={() => toggle(f.code)}
                  className={`cursor-pointer border-t border-board-line transition-colors hover:bg-board-hover ${isOpen ? "bg-board-hover" : ""}`}
                >
                  <td className="hidden px-4 py-3 text-board-strong sm:table-cell sm:px-6">{f.code}</td>
                  <td className="py-3 pl-4 sm:pl-0">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggle(f.code);
                      }}
                      className="text-left"
                    >
                      <FlapText text={f.destination} delay={i * 120} />
                    </button>
                  </td>
                  <td className="hidden py-3 text-board-muted md:table-cell">
                    {f.kind === "experience" ? "WORK" : "PROJECT"}
                  </td>
                  <td className="hidden py-3 text-board-strong sm:table-cell">{f.year}</td>
                  <td className="px-4 py-3 sm:px-6">
                    <StatusCell status={f.status} />
                  </td>
                </tr>
                <tr id={panelId} hidden={!isOpen} className="bg-board-hover">
                  <td colSpan={5}>{isOpen && <FlightDetails f={f} />}</td>
                </tr>
              </Fragment>
            );
          })}

          <tr className="border-t border-board-line">
            <td className="hidden px-4 py-3 text-board-strong sm:table-cell sm:px-6">{nextFlight.code}</td>
            <td className="py-3 pl-4 sm:pl-0">
              <a href={profile.links.email} title="Hiring for 2027 co-op? Email me" aria-label="Your company: hiring for 2027 co-op? Email me" className="hover:underline">
                <FlapText text={nextFlight.destination} delay={flights.length * 120} />
              </a>
            </td>
            <td className="hidden py-3 text-board-muted md:table-cell">CO-OP</td>
            <td className="hidden py-3 text-board-strong sm:table-cell">{nextFlight.year}</td>
            <td className="px-4 py-3 sm:px-6">
              <StatusCell status={nextFlight.status} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
