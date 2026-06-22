import { getTranslations } from "next-intl/server";
import { site } from "@/lib/site";
import { MapEmbed } from "./MapEmbed";

/**
 * Pruh s mapou a adresou nad pätičkou (na všetkých stránkach).
 * Mapa sa načíta až po súhlase s cookies (MapEmbed), adresa je vždy viditeľná.
 */
export async function MapBand() {
  const t = await getTranslations("map");
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.address.full)}`;

  return (
    <section style={{ background: "var(--bg-soft)", borderTop: "1px solid #ECEEE9", padding: "clamp(44px,6vw,76px) 22px" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "clamp(24px,4vw,48px)",
          alignItems: "center",
        }}
      >
        <div>
          <span style={{ font: "600 13px/1 var(--font-manrope),sans-serif", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--blue)" }}>
            {t("eyebrow")}
          </span>
          <h2 style={{ font: "700 clamp(26px,3.6vw,40px)/1.1 var(--font-space),sans-serif", letterSpacing: "-0.02em", margin: "14px 0 0" }}>
            {site.name}
          </h2>
          <p style={{ font: "600 18px/1.4 var(--font-space),sans-serif", color: "var(--ink)", margin: "10px 0 0" }}>{site.address.full}</p>
          <p style={{ font: "400 15px/1.65 var(--font-manrope),sans-serif", color: "var(--muted)", margin: "14px 0 0", maxWidth: 460 }}>
            {t("desc", { stop: "Hrobákova" })}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 24 }}>
            <a href={directions} target="_blank" rel="noopener noreferrer" className="btn btn--primary" style={{ padding: "14px 24px", fontSize: 15 }}>
              {t("navigate")}
            </a>
            <a href={site.mobileHref} className="btn btn--outline" style={{ padding: "14px 24px", fontSize: 15 }}>
              {site.mobile}
            </a>
          </div>
        </div>

        <div style={{ boxShadow: "0 24px 50px -30px rgba(14,26,43,.3)", borderRadius: 22 }}>
          <MapEmbed title={`${t("eyebrow")} — ${site.name}, ${site.address.full}`} />
        </div>
      </div>
    </section>
  );
}
