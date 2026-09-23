import type { Destination } from "@/content/data";

// 24×24 icon paths, usable inside any <svg viewBox="0 0 24 24">
export const ICON_PATHS: Record<Destination["icon"], string> = {
  home: "M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  school: "M12 3 1 9l11 6 9-4.91V17h2V9L12 3zm-6.82 9.2v3.8L12 20l6.82-4v-3.8L12 16l-6.82-3.8z",
  work: "M10 3h4a2 2 0 0 1 2 2v2h4a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h4V5a2 2 0 0 1 2-2zm0 2v2h4V5h-4z",
  event: "M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01z",
  pin: "M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z",
};

export function DestIcon({ icon, className = "" }: { icon: Destination["icon"]; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d={ICON_PATHS[icon]} />
    </svg>
  );
}
