import { getTranslations } from "next-intl/server";

/** Upozornenie nad kurzami: pred prihlásením treba lekársku prehliadku + tlačivo (na stiahnutie). */
export async function CourseRequirementsNote() {
  const t = await getTranslations("course");
  return (
    <div
      style={{
        background: "#FFF7E8",
        border: "1px solid #F3D89B",
        borderRadius: 18,
        padding: "clamp(18px,2.4vw,24px)",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
        gap: "clamp(14px,2vw,28px)",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <span aria-hidden style={{ width: 40, height: 40, borderRadius: 12, background: "#F6E2B4", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B5791B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6M12 11v6M9 14h6" />
          </svg>
        </span>
        <div>
          <h3 style={{ font: "700 17px/1.2 var(--font-space),sans-serif", margin: 0, color: "var(--ink)" }}>{t("reqBannerTitle")}</h3>
          <p style={{ font: "400 14px/1.6 var(--font-manrope),sans-serif", color: "#5C4A1E", margin: "6px 0 0", maxWidth: 560 }}>{t("reqBannerText")}</p>
        </div>
      </div>
      <div style={{ justifySelf: "start" }}>
        <a href="/ziadost-o-vodicske-opravnenie.pdf" target="_blank" rel="noopener noreferrer" className="btn btn--outline" style={{ padding: "13px 20px", fontSize: 15 }}>
          {t("reqBannerDownload")}
        </a>
      </div>
    </div>
  );
}
