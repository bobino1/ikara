import type { CSSProperties } from "react";
import { SignupButton } from "@/components/SignupButton";
import { Magnetic, Spotlight } from "@/components/motion/PointerEffects";
import { site } from "@/lib/site";
import "./hero/ikara-hero.css";
import "./page-hero.css";

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/**
 * Úvod podstránky v rovnakom štýle ako hero domovskej stránky.
 * `signupLabel` pridá hlavné CTA (prihláška) + telefón; `phoneOnly` len telefón.
 * Sekcia má id="hero", aby sa podľa nej vedela zobraziť sticky výzva.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  signupLabel,
  phoneOnly = false,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  signupLabel?: string;
  phoneOnly?: boolean;
}) {
  const words = title.split(" ");
  const hasCtas = Boolean(signupLabel) || phoneOnly;

  return (
    <section className="ph" id="hero">
      <Spotlight />
      <div className="ph-inner">
        <p className="ph-eyebrow ph-in">{eyebrow}</p>
        <h1 className="ph-title">
          {words.map((w, i) => (
            <span key={i}>
              <span className="ph-word" style={{ "--i": i } as CSSProperties}>
                {w}
              </span>{" "}
            </span>
          ))}
        </h1>
        <p className="ph-intro ph-in" style={delay(0.3)}>
          {intro}
        </p>
        {hasCtas && (
          <div className="ph-ctas ph-in" style={delay(0.4)}>
            {signupLabel && (
              <Magnetic>
                <SignupButton className="ih-btn">
                  {signupLabel}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12h14" />
                    <path d="M13 6l6 6-6 6" />
                  </svg>
                </SignupButton>
              </Magnetic>
            )}
            <a className="ih-btn2" href={site.mobileHref}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
              </svg>
              {site.mobile}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
