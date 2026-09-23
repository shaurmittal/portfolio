// Top-down airliner silhouette in a 64×64 box, nose pointing up.
export const AIRLINER_BODY =
  "M32 2C35 2 36 6 36 10V24L60 36V41L36 35V50L44 56V60L32 57L20 60V56L28 50V35L4 41V36L28 24V10C28 6 29 2 32 2Z";
export const AIRLINER_ENGINES = "M17 29h4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2ZM43 29h4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2Z";

// Plain HTML version (used on the intro screen)
export function Airliner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <path d={AIRLINER_ENGINES} fill="currentColor" opacity="0.75" />
      <path d={AIRLINER_BODY} fill="currentColor" />
      <rect x="31" y="8" width="2" height="40" rx="1" fill="white" opacity="0.35" />
    </svg>
  );
}
