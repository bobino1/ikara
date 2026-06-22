import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/Reveal";
import { Container, Eyebrow } from "@/components/ui";
import { SignupButton } from "@/components/SignupButton";
import { BackgroundVideo } from "@/components/BackgroundVideo";
import { FeaturedCourse } from "@/components/CourseCard";
import { IndividualCourse } from "@/components/IndividualCourse";
import { getComputedCourses } from "@/lib/courses";
import { reviews, stars } from "@/lib/reviews";

const sectionPad = (v: string) => ({ padding: v });

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tc = await getTranslations("course");
  const courses = await getComputedCourses();

  return (
    <main>
      {/* HERO */}
      <Reveal style={{ ...sectionPad("clamp(80px,12vw,150px) 22px"), position: "relative", display: "flex", alignItems: "center", minHeight: "clamp(480px,76vh,760px)", background: "linear-gradient(155deg,#16294A 0%,#0E1A2B 55%,#0B1626 100%)", color: "#fff" }}>
        <BackgroundVideo />
        <Container style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <div style={{ maxWidth: 760 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", background: "rgba(122,160,255,.14)", border: "1px solid rgba(122,160,255,.24)", color: "#CFD9F7", borderRadius: 100, font: "600 13px/1 var(--font-manrope),sans-serif" }}>
              <span style={{ width: 7, height: 7, background: "#7AA0FF", borderRadius: "50%" }} /> {t("heroBadge")}
            </span>
            <h1 style={{ font: "700 clamp(34px,7vw,70px)/1.04 var(--font-space),sans-serif", letterSpacing: "-0.025em", margin: "20px 0 0", color: "#fff" }}>
              {t("heroTitle1")}<br />{t("heroTitle2")}
            </h1>
            <p style={{ font: "400 clamp(16px,2vw,19px)/1.6 var(--font-manrope),sans-serif", color: "rgba(255,255,255,.82)", maxWidth: 600, margin: "22px 0 0" }}>
              {t("heroText")}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 34 }}>
              <SignupButton style={{ padding: "16px 28px", fontSize: 17 }}>{t("heroSignup")}</SignupButton>
              <Link href="/o-kurze" className="btn btn--ghost-light" style={{ padding: "16px 26px", fontSize: 17 }}>{t("heroMore")}</Link>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 28, marginTop: 42 }}>
              <Stat value="20" valueColor="#fff" labelColor="#A6B4C8" label={t("statYears")} />
              <Divider color="rgba(255,255,255,.15)" />
              <Stat value="150+" valueColor="#fff" labelColor="#A6B4C8" label={t("statGraduates")} />
              <Divider color="rgba(255,255,255,.15)" />
              <Stat value="0 €" valueColor="#7AA0FF" labelColor="#A6B4C8" label={t("statFee")} />
            </div>
          </div>
        </Container>
      </Reveal>

      {/* VÝHODY */}
      <Reveal style={{ ...sectionPad("clamp(48px,6vw,80px) 22px"), background: "var(--bg-soft)" }}>
        <Container>
          <div style={{ maxWidth: 560 }}>
            <Eyebrow>{t("whyEyebrow")}</Eyebrow>
            <h2 style={{ font: "700 clamp(28px,4vw,44px)/1.08 var(--font-space),sans-serif", letterSpacing: "-0.02em", margin: "14px 0 0" }}>{t("whyTitle")}</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 18, marginTop: 40 }}>
            <Benefit icon={<IconMonitor color="var(--blue)" />} iconBg="#E9F0FE" title={t("benefit1Title")} text={t("benefit1Text")} />
            <Benefit icon={<IconHeart color="var(--green)" />} iconBg="#E9F7EF" title={t("benefit2Title")} text={t("benefit2Text")} />
            <Benefit icon={<IconCar color="var(--blue)" />} iconBg="#E9F0FE" title={t("benefit3Title")} text={t("benefit3Text")} />
            <Benefit icon={<IconCard color="var(--green)" />} iconBg="#E9F7EF" title={t("benefit4Title")} text={t("benefit4Text")} />
          </div>
        </Container>
      </Reveal>

      {/* NAJBLIŽŠIE KURZY */}
      <Reveal style={sectionPad("clamp(48px,6vw,80px) 22px")}>
        <Container>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <Eyebrow>{t("coursesEyebrow")}</Eyebrow>
              <h2 style={{ font: "700 clamp(28px,4vw,44px)/1.08 var(--font-space),sans-serif", letterSpacing: "-0.02em", margin: "14px 0 0" }}>{t("coursesTitle")}</h2>
            </div>
            <Link href="/kurzy" className="nav-link" style={{ padding: 0 }}>{tc("allTerms")}</Link>
          </div>
          <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 18 }}>
            <FeaturedCourse courses={courses} />
            <div style={{ height: 1, width: 90, background: "#E3E5E0", borderRadius: 2, margin: "10px auto" }} />
            <IndividualCourse />
          </div>
        </Container>
      </Reveal>

      {/* AKO PREBIEHA */}
      <Reveal style={{ ...sectionPad("clamp(48px,6vw,80px) 22px"), background: "var(--ink)", color: "#fff" }}>
        <Container>
          <div style={{ maxWidth: 560 }}>
            <Eyebrow color="#7AA0FF">{t("howEyebrow")}</Eyebrow>
            <h2 style={{ font: "700 clamp(28px,4vw,44px)/1.08 var(--font-space),sans-serif", letterSpacing: "-0.02em", margin: "14px 0 0" }}>{t("howTitle")}</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 18, marginTop: 40 }}>
            <Step n="01" title={t("step1Title")} text={t("step1Text")} />
            <Step n="02" title={t("step2Title")} text={t("step2Text")} />
            <Step n="03" title={t("step3Title")} text={t("step3Text")} />
            <Step n="04" title={t("step4Title")} text={t("step4Text")} />
          </div>
        </Container>
      </Reveal>

      {/* RECENZIE */}
      <Reveal style={{ ...sectionPad("clamp(48px,6vw,80px) 22px"), background: "var(--bg-soft)" }}>
        <Container>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <Eyebrow>{t("reviewsEyebrow")}</Eyebrow>
              <h2 style={{ font: "700 clamp(28px,4vw,44px)/1.08 var(--font-space),sans-serif", letterSpacing: "-0.02em", margin: "14px 0 0" }}>{t("reviewsTitle")}</h2>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, background: "#fff", border: "1px solid #ECEEE9", borderRadius: 16, padding: "16px 22px" }}>
              <span style={{ font: "700 40px/1 var(--font-space),sans-serif", color: "var(--ink)" }}>4,4</span>
              <div>
                <div style={{ font: "600 18px/1 var(--font-manrope),sans-serif", letterSpacing: ".05em" }}>
                  <span style={{ color: "var(--amber)" }}>★★★★</span>
                  <span style={{ color: "#D8DAD4" }}>★</span>
                </div>
                <div style={{ font: "500 13px/1.3 var(--font-manrope),sans-serif", color: "#8A9088", marginTop: 6 }}>{t("reviewsRatingLabel")}</div>
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 18, marginTop: 36 }}>
            {reviews.map((r) => (
              <div key={r.name} className="card-hover card-hover--soft" style={{ background: "#fff", border: "1px solid #ECEEE9", borderRadius: 20, padding: 24, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
                  <span style={{ width: 44, height: 44, borderRadius: "50%", background: "#E9F0FE", color: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center", font: "700 18px/1 var(--font-space),sans-serif" }}>{r.name.charAt(0)}</span>
                  <div>
                    <div style={{ font: "700 15px/1.2 var(--font-manrope),sans-serif", color: "var(--ink)" }}>{r.name}</div>
                    <div style={{ font: "500 12px/1.2 var(--font-manrope),sans-serif", color: "#9AA0A8", marginTop: 4 }}>{r.when}</div>
                  </div>
                </div>
                <div style={{ font: "600 16px/1 var(--font-manrope),sans-serif", color: "var(--amber)", letterSpacing: ".06em", marginTop: 16 }}>{stars(r.rating)}</div>
                <p style={{ font: "400 15px/1.6 var(--font-manrope),sans-serif", color: "#3A4048", margin: "12px 0 0" }}>{r.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Reveal>
    </main>
  );
}

function Stat({ value, label, valueColor = "var(--ink)", labelColor = "#8A9088" }: { value: string; label: React.ReactNode; valueColor?: string; labelColor?: string }) {
  return (
    <div>
      <div style={{ font: "700 30px/1 var(--font-space),sans-serif", color: valueColor }}>{value}</div>
      <div style={{ font: "500 13px/1.3 var(--font-manrope),sans-serif", color: labelColor, marginTop: 6, maxWidth: 110 }}>{label}</div>
    </div>
  );
}

function Divider({ color = "#ECEEE9" }: { color?: string }) {
  return <div style={{ width: 1, background: color }} />;
}

function Benefit({ icon, iconBg, title, text }: { icon: React.ReactNode; iconBg: string; title: string; text: string }) {
  return (
    <div className="card-hover card-hover--soft" style={{ background: "#fff", border: "1px solid #ECEEE9", borderRadius: 20, padding: 26 }}>
      <div style={{ width: 48, height: 48, borderRadius: 14, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
      <h3 style={{ font: "700 19px/1.2 var(--font-space),sans-serif", margin: "18px 0 0" }}>{title}</h3>
      <p style={{ font: "400 15px/1.6 var(--font-manrope),sans-serif", color: "var(--muted)", margin: "10px 0 0" }}>{text}</p>
    </div>
  );
}

function Step({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <div style={{ borderTop: "2px solid rgba(255,255,255,.14)", paddingTop: 20 }}>
      <span style={{ font: "700 15px/1 var(--font-space),sans-serif", color: "#7AA0FF" }}>{n}</span>
      <h3 style={{ font: "700 21px/1.2 var(--font-space),sans-serif", margin: "14px 0 0" }}>{title}</h3>
      <p style={{ font: "400 15px/1.6 var(--font-manrope),sans-serif", color: "#A8AEB6", margin: "10px 0 0" }}>{text}</p>
    </div>
  );
}

const svgBase = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function IconMonitor({ color }: { color: string }) {
  return (
    <svg {...svgBase} stroke={color}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  );
}
function IconHeart({ color }: { color: string }) {
  return (
    <svg {...svgBase} stroke={color}>
      <path d="M12 20s-7-4.6-7-9.6A3.4 3.4 0 0 1 12 7.4 3.4 3.4 0 0 1 19 10.4c0 5-7 9.6-7 9.6Z" />
    </svg>
  );
}
function IconCar({ color }: { color: string }) {
  return (
    <svg {...svgBase} stroke={color}>
      <path d="M3 13l1.8-5.1A2 2 0 0 1 6.7 6.5h10.6a2 2 0 0 1 1.9 1.4L21 13v4h-2.5M3 17v-4m0 4h2.5M5.5 17h13" />
      <circle cx="7.5" cy="17" r="1.7" />
      <circle cx="16.5" cy="17" r="1.7" />
    </svg>
  );
}
function IconCard({ color }: { color: string }) {
  return (
    <svg {...svgBase} stroke={color}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3 9.5h18M7 14.5h4" />
    </svg>
  );
}
