"use client";

import { useEffect, useState, type ReactNode } from "react";

const HOUR_MS = 3_600_000;
const DAY_MS = 24 * HOUR_MS;
const MINUTE_MS = 60_000;

type Remaining = { d: string; h: string; m: string; s: string };

const pad = (n: number) => String(n).padStart(2, "0");

/** ISO dátum (RRRR-MM-DD) → polnoc stredoeurópskeho času v ms. */
function startOfCourse(iso: string): number | null {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return null;
  return Date.UTC(y, m - 1, d) - HOUR_MS;
}

function remainingUntil(target: number): Remaining | null {
  const diff = target - Date.now();
  if (diff <= 0) return null;
  return {
    d: String(Math.floor(diff / DAY_MS)),
    h: pad(Math.floor((diff % DAY_MS) / HOUR_MS)),
    m: pad(Math.floor((diff % HOUR_MS) / MINUTE_MS)),
    s: pad(Math.floor((diff % MINUTE_MS) / 1000)),
  };
}

const PLACEHOLDER: Remaining = { d: "--", h: "--", m: "--", s: "--" };

/** Titulok „Ďalší kurz …" + dlaždice s odpočtom do začiatku kurzu. */
export function CourseCountdown({
  startISO,
  kicker,
  nextLabel,
  noCourseLabel,
  ariaLabel,
  units,
}: {
  startISO: string | null;
  kicker: ReactNode;
  nextLabel: string;
  noCourseLabel: string;
  ariaLabel: string;
  units: Remaining;
}) {
  const target = startISO ? startOfCourse(startISO) : null;
  const [left, setLeft] = useState<Remaining | null>(target ? PLACEHOLDER : null);

  useEffect(() => {
    if (!target) return;
    const tick = () => setLeft(remainingUntil(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <>
      <div className="ih-bandtitle">
        {kicker}
        <span className="ih-next ih-disp">{left ? nextLabel : noCourseLabel}</span>
      </div>
      {left && (
        <div className="ih-tiles" aria-label={ariaLabel}>
          {(["d", "h", "m", "s"] as const).map((k) => (
            <div className="ih-tile" key={k}>
              <span className="ih-tnum">{left[k]}</span>
              <span className="ih-tlab">{units[k]}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
