import { skills } from "@/content/data";
import { SectionHeader } from "./SectionHeader";

export function BaggageClaim() {
  return (
    <>
      <SectionHeader gate="C1" label="Baggage claim" title="What I pack" />
      <div className="space-y-6">
        {skills.map((b, i) => (
          <div key={b.belt} data-reveal>
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted">
              Belt {i + 1} · {b.belt}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-3 border-b-4 border-dashed border-text/15 pb-4">
              {b.items.map((s, j) => (
                <li
                  key={s}
                  data-reveal="left"
                  style={{ ["--i" as string]: j }}
                  className={`relative flex items-center gap-2 rounded-md rounded-l-2xl bg-paper py-2 pl-3 pr-4 font-mono text-sm font-bold text-paper-ink shadow-sm ring-1 ring-paper-line transition-transform hover:-translate-y-1 ${j % 2 ? "rotate-1" : "-rotate-1"}`}
                >
                  <span className="h-2.5 w-2.5 rounded-full border-2 border-paper-line bg-bg" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
