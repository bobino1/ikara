import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/Reveal";
import { Container, Eyebrow } from "@/components/ui";
import { CookieSettingsButton } from "@/components/CookieConsent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cookies" });
  return { title: t("pageTitle") };
}

export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("cookies");

  const categories = [
    { title: t("necessary"), always: true, desc: t("necessaryDesc"), items: ["ikara_cookie_consent_v1"] },
    { title: t("analytics"), always: false, desc: t("analyticsDesc"), items: ["—"] },
    { title: t("marketing"), always: false, desc: t("marketingDesc"), items: ["Google Maps"] },
  ];

  return (
    <main>
      <Reveal style={{ padding: "clamp(48px,7vw,88px) 22px 0" }}>
        <Container style={{ maxWidth: 820 }}>
          <Eyebrow>Cookies</Eyebrow>
          <h1 style={{ font: "700 clamp(32px,4.6vw,52px)/1.05 var(--font-space),sans-serif", letterSpacing: "-0.025em", margin: "14px 0 0" }}>
            {t("pageTitle")}
          </h1>
          <p style={{ font: "400 clamp(16px,2vw,18px)/1.65 var(--font-manrope),sans-serif", color: "var(--muted)", margin: "18px 0 0" }}>
            {t("pageIntro")}
          </p>
        </Container>
      </Reveal>

      <Reveal style={{ padding: "clamp(32px,4vw,48px) 22px clamp(48px,6vw,80px)" }}>
        <Container style={{ maxWidth: 820, display: "flex", flexDirection: "column", gap: 16 }}>
          {categories.map((c) => (
            <div key={c.title} style={{ background: "var(--bg-soft)", border: "1px solid #ECEEE9", borderRadius: 18, padding: "clamp(20px,2.6vw,28px)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <h2 style={{ font: "700 20px/1.1 var(--font-space),sans-serif", margin: 0 }}>{c.title}</h2>
                <span style={{ padding: "5px 11px", borderRadius: 100, font: "600 11px/1 var(--font-manrope),sans-serif", letterSpacing: ".04em", background: c.always ? "#E9F7EF" : "#E9F0FE", color: c.always ? "#0F9B5A" : "#1C46C0" }}>
                  {c.always ? t("always") : t("optional")}
                </span>
              </div>
              <p style={{ font: "400 15px/1.6 var(--font-manrope),sans-serif", color: "#3A4048", margin: "10px 0 0" }}>{c.desc}</p>
              <ul style={{ margin: "12px 0 0", paddingLeft: 18 }}>
                {c.items.map((it) => (
                  <li key={it} style={{ font: "400 14px/1.6 var(--font-manrope),sans-serif", color: "var(--muted)", marginTop: 4 }}>{it}</li>
                ))}
              </ul>
            </div>
          ))}

          <div style={{ background: "#0E1A2B", color: "#fff", borderRadius: 18, padding: "clamp(22px,3vw,30px)", display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h2 style={{ font: "700 20px/1.1 var(--font-space),sans-serif", margin: 0 }}>{t("consentTitle")}</h2>
              <p style={{ font: "400 14px/1.6 var(--font-manrope),sans-serif", color: "#A8AEB6", margin: "8px 0 0", maxWidth: 460 }}>
                {t("consentText")}
              </p>
            </div>
            <CookieSettingsButton style={{ padding: "13px 22px", fontSize: 15 }} />
          </div>
        </Container>
      </Reveal>
    </main>
  );
}
