import { PlaneIcon } from "./PlaneIcon";

const items = [
  { href: "#info", label: "About" },
  { href: "#departures", label: "Work" },
  { href: "#flights", label: "Map" },
  { href: "#arrivals", label: "Contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-text/10 bg-bg/85 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4"
      >
        <a href="#boarding" className="flex items-center gap-2 font-mono text-sm font-bold tracking-widest">
          <PlaneIcon className="h-4 w-4 rotate-90 text-route" />
          SM AIRWAYS
        </a>
        <ul className="flex gap-3 font-mono text-[10px] sm:gap-5 sm:text-xs uppercase tracking-widest text-muted">
          {items.map((i) => (
            <li key={i.href}>
              <a href={i.href} className="hover:text-text">
                {i.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
