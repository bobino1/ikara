"use client";

import { useEffect, useState } from "react";
import { m } from "motion/react";
import { SignupButton } from "@/components/SignupButton";
import { site } from "@/lib/site";
import "./sticky-cta.css";

const BODY_CLASS = "sticky-cta-on";

/**
 * Pevná výzva „Prihlásiť sa" — objaví sa, keď návštevník odscrolluje z hero,
 * a schová sa pri pätičke (tá má vlastnú výzvu). Na mobile nahrádza plávajúce kontakty.
 */
export function StickyCta({ text, cta }: { text: string; cta: string }) {
  const [heroGone, setHeroGone] = useState(false);
  const [footerIn, setFooterIn] = useState(false);
  const visible = heroGone && !footerIn;

  useEffect(() => {
    const hero = document.getElementById("hero");
    const footer = document.querySelector("footer");
    if (!hero || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.target === hero) setHeroGone(!e.isIntersecting);
        else setFooterIn(e.isIntersecting);
      });
    });
    io.observe(hero);
    if (footer) io.observe(footer);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle(BODY_CLASS, visible);
    return () => document.body.classList.remove(BODY_CLASS);
  }, [visible]);

  return (
    <m.div
      className="scta"
      initial={false}
      animate={visible ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      inert={!visible}
    >
      <span className="scta-text">{text}</span>
      <a href={site.mobileHref} className="scta-call" aria-label={site.mobile}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
        </svg>
      </a>
      <SignupButton className="scta-btn">{cta}</SignupButton>
    </m.div>
  );
}
