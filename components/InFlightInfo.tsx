import { about } from "@/content/data";
import { SectionHeader } from "./SectionHeader";

export function InFlightInfo() {
  return (
    <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
      <div>
        <SectionHeader gate="A1" label="In-flight info" title="About me" />
        <div className="space-y-4 text-lg leading-relaxed text-text/85">
          {about.bio.map((p, i) => (
            <p key={p} data-reveal style={{ ["--i" as string]: i + 1 }}>
              {p}
            </p>
          ))}
        </div>
      </div>
      <div data-reveal="scale" style={{ ["--i" as string]: 2 }} className="self-end rounded-2xl border border-text/10 bg-surface p-6 transition-shadow hover:shadow-[0_20px_50px_-25px_rgba(0,0,0,0.5)]">
        <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-muted">Flight stats</p>
        <dl>
        {about.stats.map((s) => (
          <div key={s.label} className="group flex items-baseline justify-between gap-4 border-t border-text/10 py-3">
            <dt className="font-mono text-xs uppercase tracking-[0.15em] text-muted">{s.label}</dt>
            <dd className="text-right text-sm font-semibold transition-colors group-hover:text-route">{s.value}</dd>
          </div>
        ))}
        </dl>
      </div>
    </div>
  );
}
