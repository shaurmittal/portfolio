import { PlaneIcon } from "./PlaneIcon";

export function SectionHeader({ gate, label, title }: { gate: string; label: string; title: string }) {
  return (
    <div className="mb-8" data-reveal>
      <p className="inline-flex items-center gap-2 rounded-full border border-route/30 bg-route/10 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-route">
        <PlaneIcon className="h-3 w-3 rotate-90" />
        Gate {gate} · {label}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
    </div>
  );
}
