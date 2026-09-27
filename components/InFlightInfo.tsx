import { about } from "@/content/data";
import { InterestIcon } from "./Icons";
import { SectionHeader } from "./SectionHeader";

export function InFlightInfo() {
  return (
    <div>
      <SectionHeader gate="A1" label="In-flight info" title="About me" />
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4 text-lg leading-relaxed text-text/85">
          {about.bio.map((p, i) => (
            <p key={p} data-reveal style={{ ["--i" as string]: i + 1 }}>
              {p}
            </p>
          ))}
        </div>
        <div
          data-reveal="scale"
          style={{ ["--i" as string]: 2 }}
          className="self-start rounded-[1.75rem] md:mt-1.5 bg-text/10 p-2.5 transition-shadow hover:shadow-[0_20px_50px_-25px_rgba(0,0,0,0.5)]"
        >
          <div className="ife-screen overflow-hidden rounded-2xl bg-board-bg text-board-ink">
            <div className="flex items-center justify-between border-b border-board-line px-5 py-3">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-board-accent">
                In-flight entertainment
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-board-muted">
                SM Airways
              </p>
            </div>
            <ul>
              {about.entertainment.map((e, i) => (
                <li
                  key={e.category}
                  className="group flex items-center gap-4 border-b border-board-line px-5 py-3 transition-colors last:border-b-0 hover:bg-board-hover"
                >
                  <span className="w-6 font-mono text-[10px] text-board-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-board-tile text-board-accent">
                    <InterestIcon icon={e.icon} className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-board-muted">
                      {e.category}
                    </p>
                    <p className="truncate text-sm font-semibold text-board-strong">
                      {e.title}
                    </p>
                    <p className="truncate text-xs text-board-muted">
                      {e.note}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="ife-eq opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <i />
                    <i />
                    <i />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
