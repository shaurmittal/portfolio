import { profile } from "@/content/data";
import { Barcode } from "./Barcode";
import { EmailLink } from "./EmailLink";
import { InterestIcon } from "./Icons";
import { PlaneIcon } from "./PlaneIcon";

function Field({ label, value, big = false }: { label: string; value: string; big?: boolean }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-muted">{label}</dt>
      <dd className={`font-mono font-bold text-paper-ink ${big ? "text-3xl sm:text-4xl" : "text-sm sm:text-base"}`}>
        {value}
      </dd>
    </div>
  );
}

const stubLinks = [
  { label: "Resume", href: profile.links.resume },
  { label: "GitHub", href: profile.links.github },
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "Email", href: profile.links.email },
];

// Entrance order for each piece of the pass (see .pass-item in globals.css)
const step = (n: number) => ({ ["--d" as string]: n });

export function BoardingPass() {
  const [first, last] = profile.name.split(" ");

  return (
    // Rises into place after the intro, then its contents fill in (see globals.css)
    <div className="pass-print relative w-full max-w-4xl">
      <article
        className="pass-hover relative flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-paper text-paper-ink shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)] md:flex-row"
      >
        {/* Main section */}
        <div className="relative flex-1 p-6 sm:p-8">
          <div style={step(0)} className="pass-item flex items-center justify-between border-b border-paper-line pb-3 font-mono text-xs font-bold tracking-[0.25em]">
            <span className="flex items-center gap-2">
              <PlaneIcon className="h-4 w-4 rotate-90 text-paper-route" />
              SM AIRWAYS
            </span>
            <span className="text-paper-muted">BOARDING PASS</span>
          </div>

          <div className="mt-6 flex items-center gap-5">
            <img
              src={profile.photo}
              alt={`Photo of ${profile.name}`}
              width={112}
              height={112}
              style={step(1)}
              className="pass-photo h-20 w-20 shrink-0 rounded-xl object-cover ring-1 ring-paper-line sm:h-28 sm:w-28"
            />
            <div style={step(2)} className="pass-item">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-muted">Passenger</p>
              <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl">{profile.name}</h1>
              <p className="mt-1 text-sm text-paper-muted sm:text-base">{profile.tagline}</p>
            </div>
          </div>

          <div style={step(3)} className="pass-item mt-7 flex items-center gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-muted">From</p>
              <p className="font-mono text-3xl font-bold sm:text-4xl">IXC</p>
              <p className="text-xs text-paper-muted">Chandigarh, IN</p>
            </div>
            <div className="relative flex h-6 flex-1 items-center" aria-hidden="true">
              <span className="h-px w-full border-t-2 border-dashed border-paper-line" />
              {/* Flies from IXC to the middle of the route */}
              <span className="pass-route-plane absolute top-0 -ml-3 text-paper-route">
                <PlaneIcon className="h-6 w-6 rotate-90" />
              </span>
            </div>
            <div className="text-right">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-muted">To</p>
              <p className="font-mono text-3xl font-bold sm:text-4xl">YKF</p>
              <p className="text-xs text-paper-muted">Waterloo, ON</p>
            </div>
          </div>

          <dl style={step(4)} className="pass-item mt-7 grid grid-cols-2 gap-4 border-t border-paper-line pt-5 sm:grid-cols-4">
            <Field label="Flight" value="SM27" />
            <Field label="Seat" value={profile.role} />
            <Field label="Class" value="CS Co-op" />
            <Field label="Arrival" value={`Grad ${profile.gradYear}`} />
          </dl>

          <div style={step(5)} className="pass-item mt-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-muted">In-flight entertainment</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {profile.interests.map((i) => (
                <li
                  key={i.label}
                  className="flex items-center gap-1.5 rounded-full border border-paper-line bg-white/60 py-1 pl-2.5 pr-3 text-sm"
                >
                  <InterestIcon icon={i.icon} className="h-4 w-4 text-paper-route" />
                  {i.label}
                </li>
              ))}
            </ul>
          </div>

          <p style={step(6)} className="pass-item mt-5 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.15em]">
            <span className="blink h-2.5 w-2.5 rounded-full bg-[#1e9e57]" aria-hidden="true" />
            Status: Now boarding · {profile.status}
          </p>

          {/* Passport-style stamp that lands at the end (only where there's room for it) */}
          <span
            aria-hidden="true"
            className="pass-stamp absolute bottom-[4.4rem] right-7 hidden rounded-lg border-[3px] border-stamp px-4 py-2 text-center font-mono text-sm font-extrabold uppercase leading-tight tracking-[0.2em] text-stamp shadow-[inset_0_0_0_2px_var(--paper),inset_0_0_0_4px_var(--stamp)] lg:block"
          >
            Cleared for
            <br />
            takeoff
          </span>
        </div>

        {/* Perforation */}
        <div aria-hidden="true" className="relative">
          <div className="mx-6 border-t-2 border-dashed border-paper-line md:mx-0 md:my-6 md:h-[calc(100%-3rem)] md:border-t-0 md:border-l-2" />
          <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-bg md:-left-3 md:-top-3" />
          <span className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-bg md:-bottom-3 md:-left-3 md:right-auto md:top-auto" />
        </div>

        {/* Stub */}
        <aside className="flex flex-col gap-5 p-6 sm:p-8 md:w-64" aria-label="Links">
          <dl style={step(2)} className="pass-item grid grid-cols-2 gap-4 md:grid-cols-1">
            <Field label="Passenger" value={`${last.toUpperCase()} / ${first.toUpperCase()}`} />
            <Field label="Flight" value="SM27" />
          </dl>
          <ul className="grid grid-cols-2 gap-2 md:grid-cols-1">
            {stubLinks.map((l, i) => (
              <li key={l.label} style={step(3 + i * 0.6)} className="pass-item">
                {l.href.startsWith("mailto:") ? (
                  <EmailLink className="block rounded-lg border border-paper-ink/80 px-3 py-2 text-center font-mono text-xs font-bold uppercase tracking-widest transition-colors hover:bg-paper-ink hover:text-paper">{l.label}</EmailLink>
                ) : (
                  <a href={l.href} target="_blank" rel="noreferrer" className="block rounded-lg border border-paper-ink/80 px-3 py-2 text-center font-mono text-xs font-bold uppercase tracking-widest transition-colors hover:bg-paper-ink hover:text-paper">
                    {l.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <a href={profile.links.resume} target="_blank" rel="noreferrer" aria-label="Open resume in a new tab" className="mt-auto block text-paper-ink">
            <Barcode value="SHAURYAMITTAL" className="pass-barcode h-12 w-full" />
          </a>
        </aside>
      </article>
    </div>
  );
}
