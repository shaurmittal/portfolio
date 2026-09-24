import type { CSSProperties, ReactNode } from "react";
import { profile } from "@/content/data";
import { EmailLink } from "./EmailLink";
import { PlaneIcon } from "./PlaneIcon";

// The contact section is an open passport: the left page says you've arrived
// and leaves an empty stamp for the next destination; the right page is the
// visa page, where every contact link is an ink stamp. The stamps thud in one
// after another when the passport scrolls into view (globals.css).

type Stamp = {
  label: string;
  href: string;
  top: string;
  bottom: string;
  color: string;
  shape: "round" | "oval" | "box";
  tilt: number;
};

const stamps: Stamp[] = [
  { label: "LinkedIn", href: profile.links.linkedin, top: "Admitted", bottom: "Connect", color: "#0a4fb5", shape: "round", tilt: -9 },
  { label: "GitHub", href: profile.links.github, top: "Entry", bottom: "Source code", color: "#2e7d32", shape: "oval", tilt: 6 },
  { label: "Devpost", href: profile.links.devpost, top: "Hackathon visa", bottom: "Builds", color: "#6a1b9a", shape: "box", tilt: -4 },
  { label: "Resume", href: profile.links.resume, top: "Documents", bottom: "PDF", color: "#1a1a1a", shape: "round", tilt: 11 },
];

const shapes: Record<Stamp["shape"], string> = {
  round: "h-28 w-28 rounded-full",
  oval: "h-24 w-36 rounded-[50%]",
  box: "h-24 w-32 rounded-lg",
};

function StampFace({ top, label, bottom }: { top: string; label: ReactNode; bottom: string }) {
  return (
    <>
      <span className="text-[8px] tracking-[0.2em]">{top}</span>
      <span className="text-sm tracking-[0.12em]">{label}</span>
      <span className="text-[8px] tracking-[0.2em]">{bottom}</span>
    </>
  );
}

function PageHeader({ left, right }: { left: ReactNode; right: string }) {
  return (
    <div className="flex items-center justify-between border-b border-paper-line pb-3 font-mono text-[10px] font-bold tracking-[0.25em]">
      {left}
      <span className="text-paper-muted">{right}</span>
    </div>
  );
}

export function Arrivals() {
  const email = profile.links.email.replace("mailto:", "");
  const stampStyle = (color: string, tilt: number, i: number) =>
    ({ color, rotate: `${tilt}deg`, ["--i" as string]: i }) as CSSProperties;

  return (
    <div className="passport rounded-3xl bg-board-bg p-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] sm:p-3">
      <div className="grid md:grid-cols-2">
        {/* Left page: the message, and a stamp still waiting to be filled */}
        <div className="passport-page passport-left relative flex flex-col overflow-hidden rounded-t-2xl bg-paper p-6 text-paper-ink sm:p-8 md:rounded-l-2xl md:rounded-tr-none">
          <PageHeader
            left={
              <span className="flex items-center gap-2">
                <PlaneIcon className="h-3.5 w-3.5 rotate-90 text-paper-route" />
                SM AIRWAYS
              </span>
            }
            right="PASSPORT · GATE D1"
          />

          <h2 className="mt-8 text-4xl font-bold tracking-tight sm:text-5xl">You&apos;ve arrived.</h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-paper-muted">
            Thanks for flying with me. If you&apos;re hiring for AI or software roles, my seat is open for Winter 2027
            co-op. Pick a stamp to get in touch.
          </p>

          <div className="mt-10 flex flex-1 flex-col items-center justify-center gap-4 pb-2 md:mt-12">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-paper-muted">Next destination</p>
            {/* Empty stamp: dashed outline, nothing inked yet */}
            <div className="flex h-36 w-36 -rotate-6 flex-col items-center justify-center gap-1 rounded-full border-[3px] border-dashed border-paper-muted/70 font-mono font-bold uppercase leading-tight text-paper-muted">
              <span className="text-[9px] tracking-[0.2em]">Stamp pending</span>
              <span className="text-lg tracking-[0.12em] text-paper-ink">Your team</span>
              <span className="text-[9px] tracking-[0.2em]">Winter 2027</span>
            </div>
          </div>
        </div>

        {/* Right page: the visa page, one stamp per contact link */}
        <div className="passport-page passport-right relative flex flex-col overflow-hidden rounded-b-2xl bg-paper p-6 text-paper-ink sm:p-8 md:rounded-r-2xl md:rounded-bl-none">
          <PageHeader left={<span className="text-paper-muted">VISAS · ENTRIES</span>} right="CONTACT" />

          <ul className="flex flex-1 flex-wrap content-center items-center justify-center gap-x-6 gap-y-8 py-8">
            <li className="flex w-full justify-center">
              <EmailLink
                ariaLabel={`Email ${email}`}
                style={stampStyle("var(--stamp)", -3, 0)}
                className="visa-stamp visa-ring flex w-full max-w-sm flex-col items-center rounded-xl border-[3px] border-current px-4 py-3 font-mono font-bold uppercase leading-snug"
              >
                <StampFace top="Entry permit · Email" label={<span className="normal-case">{email}</span>} bottom="Click to copy · SM Airways" />
              </EmailLink>
            </li>
            {stamps.map((s, i) => (
              <li key={s.label} className="flex w-[calc(50%-12px)] justify-center">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${s.label} (opens in a new tab)`}
                  style={stampStyle(s.color, s.tilt, i + 1)}
                  className={`visa-stamp visa-ring flex flex-col items-center justify-center gap-0.5 border-[3px] border-current font-mono font-bold uppercase leading-tight ${shapes[s.shape]}`}
                >
                  <StampFace top={s.top} label={s.label} bottom={s.bottom} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
