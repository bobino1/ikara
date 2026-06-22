import type { Metadata } from "next";
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

  const cars = [
    { title: t("car1Title"), note: t("car1Note"), photo: t("car1Photo"), desc: t("car1Desc") },
    { title: t("car2Title"), note: t("car2Note"), photo: t("car2Photo"), desc: t("car2Desc") },
  ];
  const services = [t("service1"), t("service2"), t("service3")];

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
          <ImageSlot label={t("heroPhoto")} height="clamp(240px,38vw,420px)" radius={22} />
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 18, marginTop: 26 }}>
            {cars.map((car) => (
              <div key={car.title} style={{ background: "#fff", border: "1px solid #ECEEE9", borderRadius: 20, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <ImageSlot label={car.photo} height={240} radius={0} />
                <div style={{ padding: 24 }}>
                  <h3 style={{ font: "700 21px/1.2 var(--font-space),sans-serif", margin: 0 }}>{car.title}</h3>
                  <p style={{ font: "500 14px/1.4 var(--font-manrope),sans-serif", color: "var(--blue)", margin: "6px 0 0" }}>{car.note}</p>
                  <p style={{ font: "400 15px/1.6 var(--font-manrope),sans-serif", color: "var(--muted)", margin: "12px 0 0" }}>{car.desc}</p>
                </div>
              </div>
            ))}
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
          <ImageSlot label={t("simPhoto")} height={300} radius={18} />
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
