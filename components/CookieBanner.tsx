"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const LIGHTS = ["#E5484D", "#F5A623", "#15B66B"] as const;

/** Malý semafor namiesto generického 🍪 — zelená jemne pulzuje. */
function TrafficDots() {
  return (
    <span aria-hidden className="ik-cookie__lights">
      {LIGHTS.map((c, i) => (
        <span key={c} className={i === 2 ? "ik-cookie__go" : undefined} style={{ background: c, opacity: i === 2 ? 1 : 0.35 }} />
      ))}
    </span>
  );
}

/** Kompaktná lišta súhlasu s cookies (prvá návšteva) — vľavo dole, nevtieravá. */
export function CookieBanner({
  onReject,
  onAccept,
  onSettings,
}: {
  onReject: () => void;
  onAccept: () => void;
  onSettings: () => void;
}) {
  const t = useTranslations("cookies");

  return (
    <div role="dialog" aria-label={t("bannerTitle")} className="ik-cookie ik-pop">
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <TrafficDots />
        <h2 style={{ font: "700 15px/1.2 var(--font-space),sans-serif", margin: 0, color: "var(--ink)" }}>{t("bannerTitle")}</h2>
      </div>
      <p style={{ font: "400 13px/1.55 var(--font-manrope),sans-serif", color: "var(--muted)", margin: "8px 0 0" }}>
        {t("bannerText")}{" "}
        <Link href="/cookies" style={{ color: "var(--blue)", fontWeight: 600 }}>
          {t("policyLink")}
        </Link>
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginTop: 12 }}>
        <button onClick={onReject} className="btn btn--outline" style={{ padding: "9px 14px", fontSize: 13 }}>
          {t("bannerReject")}
        </button>
        <button onClick={onAccept} className="btn btn--primary" style={{ padding: "9px 14px", fontSize: 13, boxShadow: "none" }}>
          {t("bannerAccept")}
        </button>
        <button onClick={onSettings} className="ik-cookie__link">
          {t("settings")}
        </button>
      </div>
    </div>
  );
}
