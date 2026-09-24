import { Arrivals } from "@/components/Arrivals";
import { BaggageClaim } from "@/components/BaggageClaim";
import { BoardingPass } from "@/components/BoardingPass";
import { DeparturesBoard } from "@/components/DeparturesBoard";
import { FlightLeg } from "@/components/FlightLeg";
import { FlightsMap } from "@/components/FlightsMap";
import { InFlightInfo } from "@/components/InFlightInfo";
import { Intro } from "@/components/Intro";
import { Nav } from "@/components/Nav";
import { PlaneIcon } from "@/components/PlaneIcon";
import { RevealObserver } from "@/components/RevealObserver";

const section = "mx-auto max-w-5xl scroll-mt-20 px-4 py-6 sm:py-8";

// Hero clouds: [top, width, height, duration, start offset]
const clouds = [
  ["12%", 260, 70, 70, -10],
  ["58%", 340, 90, 95, -55],
  ["80%", 200, 60, 60, -30],
] as const;

export default function Home() {
  return (
    <>
      <Intro />
      <Nav />
      <RevealObserver />
      <main id="main">
        <section
          id="boarding"
          aria-label="Boarding pass"
          className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center gap-8 overflow-hidden px-4 py-10"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            {clouds.map(([top, w, h, dur, delay]) => (
              <span
                key={top}
                className="cloud"
                style={{ top, width: w, height: h, animationDuration: `${dur}s`, animationDelay: `${delay}s` }}
              />
            ))}
          </div>
          <BoardingPass />
          <a
            href="#info"
            className="pass-hint relative flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-muted hover:text-text"
          >
            <PlaneIcon className="h-4 w-4 rotate-180 text-route" />
            Take off
          </a>
        </section>
        <FlightLeg reverse to={{ code: "A1", label: "About" }} />
        <section id="info" aria-label="About me" className={section}>
          <InFlightInfo />
        </section>
        <FlightLeg to={{ code: "A2", label: "Work" }} />
        <section id="departures" aria-label="Departures: experience and projects" className={section}>
          <div data-reveal>
            <DeparturesBoard />
          </div>
        </section>
        <FlightLeg reverse to={{ code: "B2", label: "Map" }} />
        <section id="flights" aria-label="Flights I've taken" className={section}>
          <FlightsMap />
        </section>
        <FlightLeg to={{ code: "C1", label: "Skills" }} />
        <section id="baggage" aria-label="Skills" className={section}>
          <BaggageClaim />
        </section>
        <FlightLeg reverse to={{ code: "D1", label: "Contact" }} />
        <section id="arrivals" aria-label="Contact" className={section}>
          <div data-reveal="scale">
            <Arrivals />
          </div>
        </section>
      </main>
      <footer className="mx-auto max-w-5xl px-4 pb-10 pt-4 font-mono text-xs tracking-[0.15em] text-muted">
        THANKS FOR FLYING SM AIRWAYS · © {new Date().getFullYear()} SHAURYA MITTAL
      </footer>
    </>
  );
}
