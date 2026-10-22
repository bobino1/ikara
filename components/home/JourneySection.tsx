"use client";

import { useRef, useState } from "react";
import { m, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { SignupButton } from "@/components/SignupButton";

export type JourneyStep = { title: string; text: string };

/** Výška sekcie na jeden krok — čím viac, tým pomalšie auto ide pri scrollovaní. */
const VH_PER_STEP = 55;
const TRACK_START = 0.06;
const TRACK_END = 0.92;

/**
 * „Od prihlášky po vodičák" — sekcia sa pri scrollovaní zamkne (sticky),
 * auto ide po ceste podľa scrollu a postupne rozsvieti jednotlivé kroky.
 */
export function JourneySection({
  eyebrow,
  title,
  steps,
  cta,
}: {
  eyebrow: string;
  title: string;
  steps: JourneyStep[];
  cta: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  const carLeft = useTransform(progress, [TRACK_START, TRACK_END], ["0%", "100%"], { clamp: true });
  const trail = useTransform(progress, [TRACK_START, TRACK_END], [0, 1], { clamp: true });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const span = (p - TRACK_START) / (TRACK_END - TRACK_START);
    setActive(Math.min(steps.length - 1, Math.max(0, Math.round(span * (steps.length - 1)))));
  });

  return (
    <section ref={ref} className="jr" style={{ height: `${100 + steps.length * VH_PER_STEP}vh` }}>
      <div className="jr-sticky">
        <div className="jr-inner">
          <span className="jr-eyebrow">{eyebrow}</span>
          <h2 className="jr-title">{title}</h2>

          <div className="jr-road" aria-hidden>
            <m.div className="jr-trail" style={{ scaleX: trail }} />
            <div className="jr-track">
              {steps.map((_, i) => (
                <span
                  key={i}
                  className={`jr-node${i <= active ? " is-on" : ""}`}
                  style={{ left: `${(i / (steps.length - 1)) * 100}%` }}
                >
                  {i === steps.length - 1 ? "✓" : i + 1}
                </span>
              ))}
              <m.div className="jr-car" style={{ left: carLeft }}>
                <Car />
              </m.div>
            </div>
          </div>

          <ol className="jr-steps">
            {steps.map((s, i) => (
              <li key={s.title} className={`jr-step${i === active ? " is-active" : ""}${i < active ? " is-done" : ""}`}>
                <span className="jr-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>

          <div className="jr-cta">
            <SignupButton className="ih-btn">{cta}</SignupButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function Car() {
  return (
    <svg viewBox="0 0 140 62" width="100%" aria-hidden>
      <ellipse cx="70" cy="58" rx="60" ry="3.5" fill="rgba(0,0,0,0.4)" />
      <rect x="54" y="0" width="38" height="9" rx="2" fill="#15B66B" />
      <rect x="69" y="9" width="8" height="3.5" fill="#C9D1DD" />
      <path d="M10 44 L10 34 Q12 27 24 26 L40 25 L54 14 Q58 12 63 12 L92 12 Q99 12 103 16 L114 26 L124 28 Q132 30 132 37 L132 44 Q132 48 128 48 L14 48 Q10 48 10 44 Z" fill="#F4F6FA" />
      <path d="M57 16 L77 16 L77 26 L45 26 Z" fill="#233552" />
      <path d="M81 16 L92 16 Q97 16 100 19 L107 26 L81 26 Z" fill="#233552" />
      <rect x="12" y="34" width="118" height="3" fill="#2B5FE3" />
      <rect x="125" y="31" width="6" height="4" rx="1" fill="#FFE9A8" />
      <rect x="10" y="31" width="4" height="5" rx="1" fill="#E5484D" />
      <circle cx="34" cy="48" r="10" fill="#0B1422" />
      <circle cx="34" cy="48" r="5.5" fill="#C9D1DD" />
      <circle cx="108" cy="48" r="10" fill="#0B1422" />
      <circle cx="108" cy="48" r="5.5" fill="#C9D1DD" />
    </svg>
  );
}
