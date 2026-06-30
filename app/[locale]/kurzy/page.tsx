import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/Reveal";
import { Container, Eyebrow } from "@/components/ui";
import { CoursesShowcase } from "@/components/CourseCard";
import { IndividualCourse } from "@/components/IndividualCourse";
import { getComputedCourses } from "@/lib/courses";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "kurzy" });
  return { title: t("metaTitle") };
}

export default async function KurzyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("kurzy");
  const courses = await getComputedCourses();

  const legend = [
    { color: "var(--green)", label: t("legendFree") },
    { color: "var(--amber)", label: t("legendAlmost") },
    { color: "var(--red)", label: t("legendFull") },
  ];

  return (
    <main>
      <Reveal style={{ padding: "clamp(48px,7vw,88px) 22px 0" }}>
        <Container>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1 style={{ font: "700 clamp(34px,5vw,58px)/1.05 var(--font-space),sans-serif", letterSpacing: "-0.025em", margin: "14px 0 0" }}>{t("title")}</h1>
          <p style={{ font: "400 clamp(16px,2vw,19px)/1.65 var(--font-manrope),sans-serif", color: "var(--muted)", maxWidth: 620, margin: "20px 0 0" }}>
            {t("intro")}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 18, marginTop: 24, alignItems: "center" }}>
            {legend.map((l) => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 11, height: 11, background: l.color, borderRadius: "50%" }} />
                <span style={{ font: "500 13px/1 var(--font-manrope),sans-serif", color: "var(--muted)" }}>{l.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </Reveal>

      <Reveal style={{ padding: "clamp(36px,5vw,56px) 22px clamp(48px,6vw,80px)" }}>
        <Container style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <CoursesShowcase courses={courses} limit={Infinity} />
          <div style={{ height: 1, width: 90, background: "#E3E5E0", borderRadius: 2, margin: "10px auto" }} />
          <IndividualCourse />
        </Container>
      </Reveal>
    </main>
  );
}
