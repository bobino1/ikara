import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { CourseJsonLd } from "@/components/StructuredData";
import { Reveal } from "@/components/Reveal";
import { StickyCta } from "@/components/home/StickyCta";
import { site } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";
import { CoursesShowcase } from "@/components/CourseCard";
import { CourseRequirementsNote } from "@/components/CourseRequirementsNote";
import { IndividualCourse } from "@/components/IndividualCourse";
import { getComputedCourses } from "@/lib/courses";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return buildMetadata({ locale, path: "/kurzy", title: t("coursesTitle"), description: t("coursesDescription") });
}

export default async function KurzyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("kurzy");
  const th = await getTranslations("hero");
  const tSeo = await getTranslations("seo");
  const courses = await getComputedCourses();

  return (
    <main>
      <CourseJsonLd courses={courses} name={tSeo("courseName")} description={tSeo("courseSchemaDescription")} />
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

      <Reveal style={{ padding: "clamp(36px,5vw,56px) 22px clamp(48px,6vw,80px)" }}>
        <Container className="stagger" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <CourseRequirementsNote />
          <CoursesShowcase courses={courses} limit={Infinity} />
          <div style={{ height: 1, width: 90, background: "#E3E5E0", borderRadius: 2, margin: "10px auto" }} />
          <IndividualCourse />
        </Container>
      </Reveal>
      <StickyCta text={th("stickyText", { price: new Intl.NumberFormat(locale === "sk" ? "sk-SK" : "en-GB").format(site.priceFromEur) })} cta={th("stickyCta")} />
    </main>
  );
}
