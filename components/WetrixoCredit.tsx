"use client";

import { useTranslations } from "next-intl";

/** Odkaz s UTM značkami, aby bolo v analytike Wetrixo vidieť, odkiaľ dopyty prišli. */
const WETRIXO_URL = "https://wetrixo.com/?utm_source=autoskola-ikara&utm_medium=referral&utm_campaign=footer-credit";

const TAG_KEYS = ["studioTag1", "studioTag2", "studioTag3", "studioTag4"] as const;

/** Prezentácia autora webu (Wetrixo) v pätičke — výrazná, ale oddelená od obsahu autoškoly. */
export function WetrixoCredit() {
  const t = useTranslations("footer");

  return (
    <a
      href={WETRIXO_URL}
      target="_blank"
      rel="noopener"
      className="wetrixo-credit"
      style={{
        marginTop: 40,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
        gap: "20px 32px",
        alignItems: "center",
        padding: "clamp(22px,3vw,30px) clamp(22px,3.4vw,36px)",
        borderRadius: 22,
        border: "1px solid rgba(122,160,255,.22)",
        background: "radial-gradient(120% 140% at 100% 0%,rgba(43,95,227,.28),transparent 55%),rgba(255,255,255,.03)",
        color: "#fff",
        textDecoration: "none",
      }}
    >
      <div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, font: "700 11px/1 var(--font-manrope),sans-serif", letterSpacing: ".16em", textTransform: "uppercase", color: "#7AA0FF" }}>
          <span aria-hidden style={{ width: 6, height: 6, borderRadius: "50%", background: "#7AA0FF", boxShadow: "0 0 0 4px rgba(122,160,255,.18)" }} />
          {t("studioEyebrow")}
        </span>
        <p style={{ font: "700 clamp(20px,2.4vw,26px)/1.2 var(--font-space),sans-serif", letterSpacing: "-0.015em", margin: "12px 0 0" }}>
          {t("studioTitle")}
        </p>
        <p style={{ font: "400 15px/1.6 var(--font-manrope),sans-serif", color: "#AEB6C4", margin: "10px 0 0", maxWidth: 520 }}>{t("studioText")}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
          {TAG_KEYS.map((k) => (
            <span key={k} style={{ font: "600 12px/1 var(--font-manrope),sans-serif", color: "#CFD9F7", padding: "7px 11px", borderRadius: 100, background: "rgba(122,160,255,.1)", border: "1px solid rgba(122,160,255,.2)" }}>
              {t(k)}
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 14 }}>
        <span style={{ font: "700 clamp(30px,4vw,42px)/1 var(--font-space),sans-serif", letterSpacing: "-0.03em" }}>
          wetrixo<span style={{ color: "#7AA0FF" }}>.com</span>
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 20px", borderRadius: 100, background: "#fff", color: "#0A1322", font: "700 15px/1 var(--font-manrope),sans-serif" }}>
          {t("studioCta")}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </a>
  );
}
