import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/Reveal";
import { Container, Eyebrow, ImageSlot } from "@/components/ui";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("metaTitle") };
}

const bullet: React.CSSProperties = { width: 8, height: 8, background: "var(--blue)", borderRadius: "50%", marginTop: 7 };

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const services = [t("service1"), t("service2"), t("service3")];
  const carChips = [t("carChip1"), t("carChip2"), t("carChip3")];

  return (
    <main>
      <Reveal style={{ padding: "clamp(48px,7vw,88px) 22px 0" }}>
        <Container>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1 style={{ font: "700 clamp(34px,5vw,58px)/1.05 var(--font-space),sans-serif", letterSpacing: "-0.025em", margin: "14px 0 0", maxWidth: 820 }}>
            {t("title")}
          </h1>
          <p style={{ font: "400 clamp(16px,2vw,19px)/1.65 var(--font-manrope),sans-serif", color: "var(--muted)", maxWidth: 640, margin: "20px 0 0" }}>
            {t("intro")}
          </p>
        </Container>
      </Reveal>

      <Reveal style={{ padding: "clamp(40px,5vw,64px) 22px" }}>
        <Container>
          <div style={{ position: "relative", width: "100%", height: "clamp(240px,40vw,460px)", borderRadius: 22, overflow: "hidden" }}>
            <Image src="/auta/budova.jpg" alt={t("heroPhoto")} fill priority sizes="(max-width:1240px) 100vw, 1200px" style={{ objectFit: "cover" }} />
          </div>
        </Container>
      </Reveal>

      <Reveal style={{ padding: "0 22px clamp(40px,5vw,64px)" }}>
        <Container style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "clamp(24px,4vw,48px)" }}>
          <div>
            <p style={{ font: "400 16px/1.7 var(--font-manrope),sans-serif", color: "#3A4048", margin: 0 }}>{t("p1")}</p>
            <p style={{ font: "400 16px/1.7 var(--font-manrope),sans-serif", color: "#3A4048", margin: "18px 0 0" }}>{t("p2")}</p>
          </div>
          <div style={{ background: "var(--bg-soft)", borderRadius: 22, padding: 30 }}>
            <h2 style={{ font: "700 22px/1.1 var(--font-space),sans-serif", margin: "0 0 18px" }}>{t("servicesTitle")}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {services.map((s) => (
                <div key={s} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={bullet} />
                  <span style={{ font: "400 15px/1.55 var(--font-manrope),sans-serif", color: "#3A4048" }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Reveal>

      <Reveal style={{ padding: "0 22px clamp(40px,5vw,60px)" }}>
        <Container>
          <h2 style={{ font: "700 clamp(24px,3.4vw,36px)/1.1 var(--font-space),sans-serif", letterSpacing: "-0.02em" }}>{t("carsTitle")}</h2>
          <p style={{ font: "400 16px/1.6 var(--font-manrope),sans-serif", color: "var(--muted)", margin: "12px 0 0", maxWidth: 560 }}>
            {t("carsIntro")}
          </p>
          <div style={{ marginTop: 26, background: "#fff", border: "1px solid #ECEEE9", borderRadius: 22, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 2, background: "#ECEEE9" }}>
              <div style={{ position: "relative", height: "clamp(220px,28vw,330px)", background: "#fff" }}>
                <Image src="/auta/i30-bok.jpg" alt={t("carPhoto1")} fill sizes="(max-width:900px) 100vw, 50vw" style={{ objectFit: "cover" }} />
              </div>
              <div style={{ position: "relative", height: "clamp(220px,28vw,330px)", background: "#fff" }}>
                <Image src="/auta/i30-zadok.jpg" alt={t("carPhoto2")} fill sizes="(max-width:900px) 100vw, 50vw" style={{ objectFit: "cover" }} />
              </div>
            </div>
            <div style={{ padding: "clamp(22px,3vw,32px)" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                <h3 style={{ font: "700 clamp(22px,3vw,28px)/1.1 var(--font-space),sans-serif", margin: 0 }}>{t("carName")}</h3>
                <span style={{ font: "600 14px/1.3 var(--font-manrope),sans-serif", color: "var(--blue)" }}>{t("carNote")}</span>
              </div>
              <p style={{ font: "400 15px/1.65 var(--font-manrope),sans-serif", color: "var(--muted)", margin: "12px 0 0", maxWidth: 640 }}>{t("carDesc")}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 18 }}>
                {carChips.map((c) => (
                  <span key={c} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 13px", background: "var(--bg-soft)", border: "1px solid #ECEEE9", borderRadius: 100, font: "600 13px/1 var(--font-manrope),sans-serif", color: "#5C636B" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)" }} />
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Reveal>

      <Reveal style={{ padding: "0 22px clamp(40px,5vw,60px)" }}>
        <Container style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "clamp(20px,3vw,36px)", alignItems: "center" }}>
          <div>
            <h2 style={{ font: "700 clamp(24px,3.4vw,36px)/1.1 var(--font-space),sans-serif", letterSpacing: "-0.02em" }}>{t("simTitle")}</h2>
            <p style={{ font: "400 16px/1.65 var(--font-manrope),sans-serif", color: "var(--muted)", margin: "12px 0 0", maxWidth: 460 }}>
              {t("simDesc")}
            </p>
          </div>
          <div style={{ position: "relative", width: "100%", height: "clamp(240px,30vw,340px)", borderRadius: 18, overflow: "hidden" }}>
            <Image src="/auta/trenazer.jpg" alt={t("simPhoto")} fill sizes="(max-width:900px) 100vw, 50vw" style={{ objectFit: "cover" }} />
          </div>
        </Container>
      </Reveal>

      <Reveal style={{ padding: "0 22px clamp(48px,6vw,80px)" }}>
        <Container>
          <h2 style={{ font: "700 clamp(24px,3.4vw,36px)/1.1 var(--font-space),sans-serif", letterSpacing: "-0.02em" }}>{t("rangeTitle")}</h2>
          <p style={{ font: "400 16px/1.6 var(--font-manrope),sans-serif", color: "var(--muted)", margin: "12px 0 0", maxWidth: 580 }}>
            {t("rangeDesc")}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 18, marginTop: 26 }}>
            <ImageSlot label={t("rangePhoto")} height={260} radius={18} style={{ gridColumn: "span 2", minWidth: 0 }} />
            <ImageSlot label={t("rangePhoto")} height={260} radius={18} />
            <ImageSlot label={t("rangePhoto")} height={200} radius={18} />
            <ImageSlot label={t("rangePhoto")} height={200} radius={18} />
            <ImageSlot label={t("rangePhoto")} height={200} radius={18} />
          </div>
        </Container>
      </Reveal>
    </main>
  );
}
