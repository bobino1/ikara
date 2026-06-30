import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/Reveal";
import { Container, Eyebrow } from "@/components/ui";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "kontakt" });
  return { title: t("metaTitle") };
}

const fieldLabel: React.CSSProperties = {
  font: "500 12px/1 var(--font-manrope),sans-serif",
  color: "#9AA0A8",
  letterSpacing: ".06em",
  textTransform: "uppercase",
};

export default async function KontaktPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("kontakt");

  const days = [
    { key: "mon", value: "15:00 – 18:30", open: true },
    { key: "tue", value: t("closed"), open: false },
    { key: "wed", value: "15:00 – 18:30", open: true },
    { key: "thu", value: t("closed"), open: false },
    { key: "fri", value: t("closed"), open: false },
  ] as const;

  return (
    <main>
      <Reveal style={{ padding: "clamp(48px,7vw,88px) 22px clamp(48px,6vw,80px)" }}>
        <Container style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(32px,5vw,56px)" }}>
          <div>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h1 style={{ font: "700 clamp(32px,4.6vw,52px)/1.05 var(--font-space),sans-serif", letterSpacing: "-0.025em", margin: "14px 0 0" }}>{t("title")}</h1>
            <p style={{ font: "400 17px/1.6 var(--font-manrope),sans-serif", color: "var(--muted)", margin: "18px 0 0", maxWidth: 420 }}>
              {t("intro")}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 34 }}>
              <div>
                <div style={fieldLabel}>{t("phone")}</div>
                <div style={{ font: "600 20px/1 var(--font-space),sans-serif", marginTop: 8 }}>{site.phone}</div>
                <div style={{ font: "400 13px/1 var(--font-manrope),sans-serif", color: "#8A9088", marginTop: 6 }}>{t("phoneNote")}</div>
              </div>
              <div>
                <div style={fieldLabel}>{t("mobile")}</div>
                <a href={site.mobileHref} style={{ font: "600 20px/1 var(--font-space),sans-serif", marginTop: 8, display: "inline-block" }}>{site.mobile}</a>
                <div style={{ font: "400 13px/1 var(--font-manrope),sans-serif", color: "var(--green)", marginTop: 6 }}>NONSTOP</div>
              </div>
              <div>
                <div style={fieldLabel}>{t("email")}</div>
                <a href={`mailto:${site.email}`} style={{ font: "600 18px/1.3 var(--font-space),sans-serif", marginTop: 8, display: "inline-block", wordBreak: "break-all" }}>{site.email}</a>
              </div>
              <div>
                <div style={fieldLabel}>{t("address")}</div>
                <div style={{ font: "600 18px/1.4 var(--font-space),sans-serif", marginTop: 8 }}>
                  {site.name}<br />{site.address.full}
                </div>
              </div>
              <div>
                <div style={{ ...fieldLabel, marginBottom: 10 }}>{t("hours")}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 7, maxWidth: 300 }}>
                  {days.map((h) => (
                    <div key={h.key} style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ font: `500 15px/1.4 var(--font-manrope),sans-serif`, color: h.open ? "#3A4048" : "#9AA0A8" }}>{t(h.key)}</span>
                      <span style={{ font: h.open ? "600 15px/1.4 var(--font-space),sans-serif" : "500 15px/1.4 var(--font-manrope),sans-serif", color: h.open ? undefined : "#9AA0A8" }}>{h.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: "var(--bg-soft)", borderRadius: 24, padding: "clamp(24px,3.4vw,40px)", display: "flex", flexDirection: "column", gap: 16, alignSelf: "start" }}>
            <h2 style={{ font: "700 22px/1.2 var(--font-space),sans-serif", margin: 0 }}>{t("ctaTitle")}</h2>
            <p style={{ font: "400 15px/1.6 var(--font-manrope),sans-serif", color: "var(--muted)", margin: 0 }}>{t("ctaText")}</p>
            <a href={site.mobileHref} className="btn btn--primary" style={{ padding: 16, fontSize: 16 }}>
              {t("call")} · {site.mobile}
            </a>
            <a href={`mailto:${site.email}`} className="btn btn--outline" style={{ padding: 16, fontSize: 16 }}>
              {t("write")}
            </a>
          </div>
        </Container>
      </Reveal>
    </main>
  );
}
