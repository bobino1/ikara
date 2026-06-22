import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/Reveal";
import { Container, Eyebrow } from "@/components/ui";
import { SignupButton } from "@/components/SignupButton";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "okurze" });
  return { title: t("metaTitle") };
}

export default async function CoursePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("okurze");

  const steps = [
    { n: "01", title: t("step1Title"), text: t("step1Text") },
    { n: "02", title: t("step2Title"), text: t("step2Text") },
    { n: "03", title: t("step3Title"), text: t("step3Text") },
    { n: "04", title: t("step4Title"), text: t("step4Text") },
  ];
  const conditions = [t("cond1"), t("cond2"), t("cond3"), t("cond4")];
  const priceList = [
    { label: t("price1"), value: "1050 €" },
    { label: t("price2"), value: "1500 €" },
    { label: t("price3"), value: t("price3Val") },
  ];
  const cdContent = [
    { title: t("cd1Title"), text: t("cd1Text") },
    { title: t("cd2Title"), text: t("cd2Text") },
    { title: t("cd3Title"), text: t("cd3Text") },
  ];

  return (
    <main>
      <Reveal style={{ padding: "clamp(48px,7vw,88px) 22px 0" }}>
        <Container>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1 style={{ font: "700 clamp(34px,5vw,58px)/1.05 var(--font-space),sans-serif", letterSpacing: "-0.025em", margin: "14px 0 0", maxWidth: 760 }}>
            {t("title")}
          </h1>
          <p style={{ font: "400 clamp(16px,2vw,19px)/1.65 var(--font-manrope),sans-serif", color: "var(--muted)", maxWidth: 620, margin: "20px 0 0" }}>
            {t("intro")}
          </p>
        </Container>
      </Reveal>

      <Reveal style={{ padding: "clamp(40px,5vw,60px) 22px" }}>
        <Container style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {steps.map((s) => (
            <div key={s.n} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 22, alignItems: "start", background: "#fff", border: "1px solid #ECEEE9", borderRadius: 18, padding: 24 }}>
              <span style={{ font: "700 22px/1 var(--font-space),sans-serif", color: "var(--blue)", minWidth: 42 }}>{s.n}</span>
              <div>
                <h3 style={{ font: "700 20px/1.2 var(--font-space),sans-serif", margin: 0 }}>{s.title}</h3>
                <p style={{ font: "400 15px/1.6 var(--font-manrope),sans-serif", color: "var(--muted)", margin: "8px 0 0" }}>{s.text}</p>
              </div>
            </div>
          ))}
        </Container>
      </Reveal>

      <Reveal style={{ padding: "clamp(20px,3vw,40px) 22px clamp(48px,6vw,80px)" }}>
        <Container style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
          <div style={{ background: "var(--bg-soft)", borderRadius: 22, padding: 30 }}>
            <h2 style={{ font: "700 24px/1.1 var(--font-space),sans-serif", margin: "0 0 18px" }}>{t("conditionsTitle")}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {conditions.map((c) => (
                <div key={c} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ width: 8, height: 8, background: "var(--green)", borderRadius: "50%", marginTop: 7 }} />
                  <span style={{ font: "400 15px/1.5 var(--font-manrope),sans-serif", color: "#3A4048" }}>{c}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "var(--ink)", color: "#fff", borderRadius: 22, padding: 30 }}>
            <h2 style={{ font: "700 24px/1.1 var(--font-space),sans-serif", margin: "0 0 18px" }}>{t("priceTitle")}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {priceList.map((p, i) => (
                <div key={p.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "14px 0", borderBottom: i < priceList.length - 1 ? "1px solid rgba(255,255,255,.1)" : "none" }}>
                  <span style={{ font: "500 15px/1.4 var(--font-manrope),sans-serif" }}>{p.label}</span>
                  <span style={{ font: "700 20px/1 var(--font-space),sans-serif" }}>{p.value}</span>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(43,95,227,.18)", border: "1px solid rgba(122,160,255,.35)", borderRadius: 12, padding: "13px 15px", marginTop: 16, font: "600 14px/1.4 var(--font-manrope),sans-serif", color: "#7AA0FF" }}>
              {t("noFee")}
            </div>
            <SignupButton style={{ width: "100%", marginTop: 16, padding: 16, fontSize: 16 }}>{t("signupBtn")}</SignupButton>
          </div>
        </Container>
      </Reveal>

      <Reveal style={{ padding: "0 22px clamp(48px,6vw,80px)" }}>
        <Container style={{ background: "#E9F0FE", borderRadius: 22, padding: "clamp(28px,4vw,48px)" }}>
          <h2 style={{ font: "700 clamp(24px,3.4vw,34px)/1.1 var(--font-space),sans-serif", letterSpacing: "-0.02em", margin: 0 }}>{t("includedTitle")}</h2>
          <p style={{ font: "400 16px/1.6 var(--font-manrope),sans-serif", color: "#3A4048", margin: "14px 0 0", maxWidth: 620 }}>
            {t("includedText")}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16, marginTop: 26 }}>
            {cdContent.map((c) => (
              <div key={c.title} style={{ background: "#fff", borderRadius: 16, padding: 22 }}>
                <h3 style={{ font: "700 17px/1.2 var(--font-space),sans-serif", margin: 0 }}>{c.title}</h3>
                <p style={{ font: "400 14px/1.55 var(--font-manrope),sans-serif", color: "var(--muted)", margin: "9px 0 0" }}>{c.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Reveal>
    </main>
  );
}
