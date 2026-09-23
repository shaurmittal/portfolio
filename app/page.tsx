import { Arrivals } from "@/components/Arrivals";
import { BaggageClaim } from "@/components/BaggageClaim";
import { BoardingPass } from "@/components/BoardingPass";
import { DeparturesBoard } from "@/components/DeparturesBoard";
import { FlightPath } from "@/components/FlightPath";
import { FlightsMap } from "@/components/FlightsMap";
import { InFlightInfo } from "@/components/InFlightInfo";
import { Nav } from "@/components/Nav";
import { RevealObserver } from "@/components/RevealObserver";

const section = "mx-auto max-w-5xl scroll-mt-20 px-4 py-10 sm:py-14";

// Hero clouds: [top, width, height, duration, start offset]
const clouds = [
  ["12%", 260, 70, 70, -10],
  ["58%", 340, 90, 95, -55],
  ["80%", 200, 60, 60, -30],
] as const;

export default function Home() {
  return (
    <>
      <Nav />
      <FlightPath />
      <RevealObserver />
      <main id="main">
        <section
          id="boarding"
          data-plane="NOW BOARDING|SM27"
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
            className="relative font-mono text-xs uppercase tracking-[0.25em] text-muted hover:text-text"
          >
            ↓ Scroll to take off
          </a>
        </section>
        <section id="info" data-plane="REFUELING|A1" aria-label="About me" className={section}>
          <InFlightInfo />
        </section>
        <section id="departures" data-plane="REFUELING|A2" aria-label="Departures: experience and projects" className={section}>
          <div data-reveal>
            <DeparturesBoard />
          </div>
        </section>
        <section id="flights" data-plane="REFUELING|B2" aria-label="Flights I've taken" className={section}>
          <FlightsMap />
        </section>
        <section id="baggage" data-plane="REFUELING|C1" aria-label="Skills" className={section}>
          <BaggageClaim />
        </section>
        <section id="arrivals" data-plane="LANDED|D1" aria-label="Contact" className={section}>
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
