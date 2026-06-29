import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/Reveal";
import { Container, Eyebrow } from "@/components/ui";
import { ImageGallery } from "@/components/Lightbox";

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
  const cars = [
    {
      name: t("car1Name"),
      note: t("car1Note"),
      desc: t("car1Desc"),
      images: [
        { src: "/auta/i30-bok.jpg", alt: t("car1Photo") },
        { src: "/auta/i30-zadok.jpg", alt: t("car1Photo") },
      ],
    },
    {
      name: t("car2Name"),
      note: t("car2Note"),
      desc: t("car2Desc"),
      images: [
        { src: "/auta/i30kombi-bok.jpg", alt: t("car2Photo") },
        { src: "/auta/i30kombi-predok.jpg", alt: t("car2Photo") },
        { src: "/auta/i30kombi-zadok.jpg", alt: t("car2Photo") },
      ],
    },
  ];
  const cvicisko = [
    { src: "/cvicisko/c1.jpg", alt: t("rangePhoto") },
    { src: "/cvicisko/c2.jpg", alt: t("rangePhoto") },
    { src: "/cvicisko/c3.jpg", alt: t("rangePhoto") },
    { src: "/cvicisko/c4.jpg", alt: t("rangePhoto") },
    { src: "/cvicisko/c5.jpg", alt: t("rangePhoto") },
  ];
  const cvicTiles = [
    { span2: true, h: 300 },
    { span2: false, h: 300 },
    { span2: false, h: 220 },
    { span2: false, h: 220 },
    { span2: false, h: 220 },
  ];

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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 18, marginTop: 26 }}>
            {cars.map((car) => (
              <div key={car.name} style={{ background: "#fff", border: "1px solid #ECEEE9", borderRadius: 20, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{ position: "relative", width: "100%", height: "clamp(200px,26vw,260px)" }}>
                  <Image src={car.images[0].src} alt={car.images[0].alt} fill sizes="(max-width:900px) 100vw, 50vw" style={{ objectFit: "cover" }} />
                </div>
                {car.images.length > 1 && (
                  <div style={{ display: "grid", gridTemplateColumns: `repeat(${car.images.length - 1},1fr)`, gap: 4, marginTop: 4 }}>
                    {car.images.slice(1).map((im) => (
                      <div key={im.src} style={{ position: "relative", width: "100%", height: "clamp(90px,13vw,130px)" }}>
                        <Image src={im.src} alt={im.alt} fill sizes="(max-width:900px) 50vw, 25vw" style={{ objectFit: "cover" }} />
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ padding: 24 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                    <h3 style={{ font: "700 21px/1.2 var(--font-space),sans-serif", margin: 0 }}>{car.name}</h3>
                    <span style={{ font: "600 13px/1.3 var(--font-manrope),sans-serif", color: "var(--blue)" }}>{car.note}</span>
                  </div>
                  <p style={{ font: "400 15px/1.6 var(--font-manrope),sans-serif", color: "var(--muted)", margin: "10px 0 0" }}>{car.desc}</p>
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
          <div style={{ marginTop: 26 }}>
            <ImageGallery images={cvicisko} tiles={cvicTiles} />
          </div>
        </Container>
      </Reveal>
    </main>
  );
}
