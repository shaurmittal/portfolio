import { profile } from "@/content/data";
import { PlaneIcon } from "./PlaneIcon";

const links = [
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "GitHub", href: profile.links.github },
  { label: "Resume", href: profile.links.resume },
];

export function Arrivals() {
  const email = profile.links.email.replace("mailto:", "");
  return (
    <div className="overflow-hidden rounded-2xl bg-board-bg font-mono text-board-ink ring-1 ring-board-line">
      <div className="flex items-center gap-3 border-b border-board-line px-6 py-4">
        <PlaneIcon className="h-6 w-6 rotate-[135deg] text-board-accent" />
        <p className="text-xl font-bold tracking-[0.3em] text-board-strong sm:text-2xl">ARRIVALS</p>
      </div>

      <div className="px-6 py-10 sm:px-10 sm:py-14">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-board-accent">Gate D1 · Contact</p>
        <h2 className="mt-3 font-sans text-4xl font-bold tracking-tight text-board-strong sm:text-5xl">You&apos;ve arrived.</h2>
        <p className="mt-4 max-w-xl font-sans text-lg leading-relaxed text-board-ink">
          Thanks for flying with me. If you&apos;re hiring for AI or software roles, my seat is open for 2027 co-op.
          Next destination: your team.
        </p>

        <a
          href={profile.links.email}
          className="mt-8 inline-flex items-center gap-3 rounded-xl bg-board-accent px-5 py-3 text-sm font-bold text-board-bg transition-transform hover:-translate-y-0.5 sm:text-base"
        >
          <PlaneIcon className="h-4 w-4 rotate-90" />
          {email}
        </a>

        <ul className="mt-5 flex flex-wrap gap-3">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                className="inline-block rounded-lg border border-board-line px-4 py-2 text-xs font-bold uppercase tracking-widest text-board-strong hover:border-board-accent hover:text-board-accent"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
