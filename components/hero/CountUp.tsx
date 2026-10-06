"use client";

import { useEffect, useState } from "react";

const START_DELAY_MS = 300;
const DURATION_MS = 900;

/** Číslo, ktoré sa pri načítaní „napočíta" od nuly (rešpektuje prefers-reduced-motion). */
export function CountUp({
  value,
  decimals = 0,
  decimalSeparator = ",",
  suffix = "",
}: {
  value: number;
  decimals?: number;
  decimalSeparator?: string;
  suffix?: string;
}) {
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t0 = performance.now() + START_DELAY_MS;
    let frame = 0;
    const step = (t: number) => {
      const k = Math.max(0, Math.min(1, (t - t0) / DURATION_MS));
      setCurrent(value * (1 - Math.pow(1 - k, 3)));
      if (k < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  const text = decimals ? current.toFixed(decimals).replace(".", decimalSeparator) : String(Math.round(current));
  return (
    <>
      {text}
      {suffix}
    </>
  );
}
