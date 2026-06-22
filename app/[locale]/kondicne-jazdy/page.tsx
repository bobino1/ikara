import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/Reveal";
import { Container, Eyebrow } from "@/components/ui";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "kondicne" });
  return { title: t("metaTitle") };
}

export default async function KondicnePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("kondicne");

  const prices = [
    { kicker: t("to30"), price: "45 €", note: t("single"), dark: false },
    { kicker: t("to40"), price: "50 €", note: t("single"), dark: false },
    { kicker: t("pack51"), price: "od 270 €", note: t("pack51Note"), dark: true, badge: t("pack") },
    { kicker: t("pack102"), price: "od 530 €", note: t("pack102Note"), dark: true, badge: t("pack") },
  ];

  return (
    <main>
      <Reveal style={{ padding: "clamp(48px,7vw,88px) 22px 0" }}>
        <Container>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1 style={{ font: "700 clamp(34px,5vw,58px)/1.05 var(--font-space),sans-serif", letterSpacing: "-0.025em", margin: "14px 0 0", maxWidth: 760 }}>
            {t("title")}
          </h1>
          <p style={{ font: "400 clamp(16px,2vw,19px)/1.65 var(--font-manrope),sans-serif", color: "var(--muted)", maxWidth: 640, margin: "20px 0 0" }}>
            {t("intro")}
          </p>
        </Container>
      </Reveal>

      <Reveal style={{ padding: "clamp(40px,5vw,64px) 22px" }}>
        <Container>
          <h2 style={{ font: "700 clamp(22px,3vw,30px)/1.1 var(--font-space),sans-serif", letterSpacing: "-0.02em", margin: "0 0 26px" }}>{t("priceTitle")}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 18 }}>
            {prices.map((p) => (
              <div
                key={p.kicker}
                style={{
                  background: p.dark ? "var(--ink)" : "#fff",
                  color: p.dark ? "#fff" : undefined,
                  border: p.dark ? "none" : "1px solid #ECEEE9",
                  borderRadius: 20,
                  padding: 26,
                  position: "relative",
                }}
              >
                {p.badge && (
                  <span style={{ position: "absolute", top: 18, right: 18, padding: "5px 11px", background: "var(--blue)", borderRadius: 100, font: "700 11px/1 var(--font-manrope),sans-serif", color: "#fff" }}>{p.badge}</span>
                )}
                <span style={{ font: "600 12px/1 var(--font-manrope),sans-serif", letterSpacing: ".1em", textTransform: "uppercase", color: p.dark ? "#9AA0A8" : "#8A9088" }}>{p.kicker}</span>
                <div style={{ font: "700 36px/1 var(--font-space),sans-serif", margin: "16px 0 4px" }}>{p.price}</div>
                <p style={{ font: "400 14px/1.5 var(--font-manrope),sans-serif", color: p.dark ? "#A8AEB6" : "var(--muted)", margin: 0 }}>{p.note}</p>
              </div>
            ))}
          </div>

          <div style={{ background: "#E9F0FE", borderRadius: 18, padding: 24, marginTop: 18, display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ font: "700 18px/1.2 var(--font-space),sans-serif", margin: 0 }}>{t("rangeTitle")}</h3>
              <p style={{ font: "400 14px/1.5 var(--font-manrope),sans-serif", color: "#3A4048", margin: "7px 0 0" }}>{t("rangeDesc")}</p>
            </div>
            <span style={{ font: "700 32px/1 var(--font-space),sans-serif", color: "var(--blue-dark)" }}>50 €</span>
          </div>
        </Container>
      </Reveal>

      <Reveal style={{ padding: "0 22px clamp(48px,6vw,80px)" }}>
        <Container style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 18 }}>
          <div style={{ background: "var(--bg-soft)", borderRadius: 20, padding: 28 }}>
            <h3 style={{ font: "700 19px/1.2 var(--font-space),sans-serif", margin: 0 }}>{t("prepaidTitle")}</h3>
            <p style={{ font: "400 15px/1.6 var(--font-manrope),sans-serif", color: "var(--muted)", margin: "12px 0 0" }}>
              {t("prepaidDesc")}
            </p>
          </div>
          <div style={{ background: "var(--bg-soft)", borderRadius: 20, padding: 28 }}>
            <h3 style={{ font: "700 19px/1.2 var(--font-space),sans-serif", margin: 0 }}>{t("intervalsTitle")}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ font: "500 15px/1.4 var(--font-manrope),sans-serif", color: "#3A4048" }}>{t("weekdays")}</span>
                <span style={{ font: "600 15px/1.4 var(--font-space),sans-serif" }}>6:00 – 21:00</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ font: "500 15px/1.4 var(--font-manrope),sans-serif", color: "#3A4048" }}>{t("weekend")}</span>
                <span style={{ font: "600 15px/1.4 var(--font-space),sans-serif" }}>6:00 – 22:00</span>
              </div>
            </div>
            <Link href="/kontakt" className="btn btn--primary" style={{ width: "100%", marginTop: 20, padding: 14, fontSize: 15 }}>
              {t("orderBtn")}
            </Link>
          </div>
        </Container>
      </Reveal>
    </main>
  );
}
