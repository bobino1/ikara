"use client";

import { useTranslations } from "next-intl";
import { useCookieConsent } from "./CookieConsent";

const EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5688.09914092108!2d17.11355547801573!3d48.11611507124103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c89a658ff6e03%3A0x7d0898bf6b9259c6!2sHrob%C3%A1kova%202497%2F34%2C%20851%2001%20Petr%C5%BEalka!5e1!3m2!1ssk!2ssk!4v1782125202770!5m2!1ssk!2ssk";

/**
 * Google mapa sa načíta až po súhlase s marketingovými cookies
 * (Google embed ukladá cookies tretej strany). Kým súhlas nie je,
 * zobrazí sa placeholder s možnosťou jednorazovo mapu povoliť.
 */
export function MapEmbed({ title }: { title: string }) {
  const { consent, update } = useCookieConsent();
  const t = useTranslations("map");

  const wrapStyle: React.CSSProperties = {
    width: "100%",
    height: "clamp(260px,34vw,420px)",
    borderRadius: 22,
    display: "block",
    overflow: "hidden",
  };

  if (consent.marketing) {
    return (
      <iframe
        title={title}
        src={EMBED_SRC}
        style={{ ...wrapStyle, border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div
      style={{
        ...wrapStyle,
        background: "var(--bg-soft)",
        border: "1.5px dashed #CFD4CC",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 24,
        gap: 14,
      }}
    >
      <div style={{ width: 48, height: 48, borderRadius: 14, background: "#E9F0FE", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      </div>
      <p style={{ font: "500 14px/1.55 var(--font-manrope),sans-serif", color: "var(--muted)", margin: 0, maxWidth: 360 }}>
        {t("placeholderText")}
      </p>
      <button onClick={() => update({ marketing: true })} className="btn btn--primary" style={{ padding: "12px 20px", fontSize: 14 }}>
        {t("showMap")}
      </button>
    </div>
  );
}
