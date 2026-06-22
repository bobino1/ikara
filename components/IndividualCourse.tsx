import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";

/**
 * Individuálny kurz — cena 1500 €, termín a tempo po dohode telefonicky.
 * Tmavá karta na odlíšenie od skupinového kurzu.
 */
export async function IndividualCourse() {
  const t = await getTranslations("individual");

  return (
    <div
      style={{
        background: "linear-gradient(135deg,#16294A 0%,#0E1A2B 60%,#0B1626 100%)",
        color: "#fff",
        border: "1px solid rgba(122,160,255,.16)",
        borderRadius: 22,
        padding: "clamp(24px,3.5vw,40px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: -90, right: -70, width: 260, height: 260, background: "radial-gradient(circle,rgba(43,95,227,.45),transparent 70%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "clamp(22px,4vw,48px)", alignItems: "center" }}>
        <div>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 13px", background: "rgba(122,160,255,.12)", border: "1px solid rgba(122,160,255,.22)", borderRadius: 100, font: "600 12px/1 var(--font-manrope),sans-serif", letterSpacing: ".08em", textTransform: "uppercase", color: "#AFC4FF" }}>
            {t("badge")}
          </span>
          <h3 style={{ font: "700 clamp(24px,3.2vw,32px)/1.12 var(--font-space),sans-serif", letterSpacing: "-0.02em", margin: "16px 0 0" }}>
            {t("title")}
          </h3>
          <p style={{ font: "400 15px/1.65 var(--font-manrope),sans-serif", color: "#AEB6C4", margin: "12px 0 0", maxWidth: 460 }}>
            {t("desc")}
          </p>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 20 }}>
            <span style={{ font: "700 34px/1 var(--font-space),sans-serif", letterSpacing: "-0.02em" }}>1500</span>
            <span style={{ font: "600 18px/1 var(--font-space),sans-serif", color: "#BFD0F5" }}>€</span>
            <span style={{ font: "500 13px/1 var(--font-manrope),sans-serif", color: "#A6B4C8" }}>{t("conditions")}</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <a href={site.mobileHref} className="btn btn--primary" style={{ padding: "16px 24px", fontSize: 16, justifyContent: "center" }}>
            {t("call", { phone: site.mobile })}
          </a>
          <Link href="/kontakt" className="btn btn--ghost-light" style={{ padding: "16px 24px", fontSize: 16, justifyContent: "center" }}>
            {t("write")}
          </Link>
          <p style={{ font: "400 12px/1.5 var(--font-manrope),sans-serif", color: "#8A9098", textAlign: "center", margin: "4px 0 0" }}>
            {t("note", { phone: site.mobile })}
          </p>
        </div>
      </div>
    </div>
  );
}
