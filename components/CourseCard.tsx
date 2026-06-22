"use client";

import { useTranslations } from "next-intl";
import type { ComputedCourse } from "@/lib/courses";
import { useSignup } from "./SignupProvider";

const cellLabel: React.CSSProperties = {
  font: "500 10px/1 var(--font-manrope),sans-serif",
  color: "#9AA0A8",
  letterSpacing: ".06em",
  textTransform: "uppercase",
};

type T = ReturnType<typeof useTranslations>;

function statusTag(t: T, c: ComputedCourse) {
  if (c.free <= 0) return t("tagFull");
  if (c.free <= 2) return t("tagAlmost");
  return t("tagFree");
}

function statusLabel(t: T, c: ComputedCourse) {
  if (c.free <= 0) return t("full");
  if (c.free === 1) return t("lastSpot");
  if (c.free === 2) return t("lastSpots", { count: c.free });
  return t("freeSpots", { count: c.free });
}

function EmptyState() {
  const t = useTranslations("course");
  return (
    <div style={{ background: "var(--bg-soft)", border: "1px solid #ECEEE9", borderRadius: 20, padding: 32, textAlign: "center" }}>
      <p style={{ font: "500 16px/1.5 var(--font-manrope),sans-serif", color: "var(--muted)", margin: 0 }}>{t("empty")}</p>
    </div>
  );
}

export function CourseCard({ c }: { c: ComputedCourse }) {
  const { open } = useSignup();
  const t = useTranslations("course");

  return (
    <div
      className="card-hover"
      style={{ background: "#fff", border: "1px solid #ECEEE9", borderRadius: 20, padding: 26, display: "flex", flexDirection: "column", borderTop: `4px solid ${c.color}` }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ font: "700 22px/1 var(--font-space),sans-serif", letterSpacing: "-0.01em" }}>{c.id}</span>
        <span style={{ padding: "5px 11px", borderRadius: 100, font: "700 11px/1 var(--font-manrope),sans-serif", color: "#fff", background: c.color }}>{statusTag(t, c)}</span>
      </div>

      <div style={{ marginTop: 20 }}>
        <div style={cellLabel}>{t("start")}</div>
        <div style={{ font: "700 26px/1.2 var(--font-space),sans-serif", color: "var(--ink)", letterSpacing: "-0.01em", marginTop: 8 }}>{c.start}</div>
      </div>

      <div style={{ font: "500 14px/1.4 var(--font-manrope),sans-serif", color: "var(--muted)", marginTop: 14 }}>
        {t("signupBy")} <strong style={{ color: "var(--ink)", fontWeight: 600 }}>{c.signup}</strong>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 22, borderTop: "1px solid #ECEEE9" }}>
        <span style={{ font: "700 22px/1 var(--font-space),sans-serif" }}>{c.priceLabel} €</span>
        <button className="btn btn--card" disabled={c.full} onClick={() => !c.full && open(c.id)} style={{ padding: "12px 20px", borderRadius: 11, fontSize: 15 }}>
          {c.full ? t("soldOut") : t("interest")}
        </button>
      </div>
    </div>
  );
}

export function FeaturedCourseCard({ c }: { c: ComputedCourse }) {
  const { open } = useSignup();
  const t = useTranslations("course");

  const infoChip: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    padding: "7px 13px",
    background: "var(--bg-soft)",
    border: "1px solid #ECEEE9",
    borderRadius: 100,
    font: "600 13px/1 var(--font-manrope),sans-serif",
    color: "#5C636B",
  };

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #ECEEE9",
        borderTop: `4px solid ${c.color}`,
        borderRadius: 24,
        padding: "clamp(22px,3vw,36px)",
        boxShadow: "0 26px 52px -32px rgba(14,26,43,.28)",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: "clamp(22px,3.5vw,40px)", alignItems: "stretch" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 13px", background: "#E9F0FE", color: "#1C46C0", borderRadius: 100, font: "600 12px/1 var(--font-manrope),sans-serif", letterSpacing: ".04em" }}>
              <span style={{ width: 7, height: 7, background: "var(--green)", borderRadius: "50%", boxShadow: "0 0 0 4px rgba(21,182,107,.16)" }} />
              {t("nearest")}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 13px", borderRadius: 100, font: "700 12px/1 var(--font-manrope),sans-serif", background: c.color, color: "#fff" }}>{statusTag(t, c)}</span>
          </div>

          <div style={{ marginTop: 22 }}>
            <div style={cellLabel}>{t("start")}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 12 }}>
              <span style={{ width: 52, height: 52, borderRadius: 14, background: "#E9F0FE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
                  <path d="M3 9h18M8 2.5v4M16 2.5v4" />
                </svg>
              </span>
              <span style={{ font: "700 clamp(30px,4vw,44px)/1 var(--font-space),sans-serif", color: "var(--ink)", letterSpacing: "-0.02em" }}>{c.start}</span>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 22 }}>
            <span style={infoChip}>{t("courseNo", { id: c.id })}</span>
            <span style={infoChip}>{c.cat}</span>
            <span style={infoChip}>{t("maxStudents", { count: c.capacity })}</span>
          </div>

          <div style={{ font: "500 14px/1.4 var(--font-manrope),sans-serif", color: "var(--muted)", marginTop: "auto", paddingTop: 18 }}>
            {t("signupBy")} <strong style={{ color: "var(--ink)", fontWeight: 600 }}>{c.signup}</strong>
          </div>
        </div>

        <div style={{ background: "var(--bg-soft)", border: "1px solid #ECEEE9", borderRadius: 18, padding: "clamp(20px,2.5vw,28px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 9, font: "600 15px/1 var(--font-manrope),sans-serif", color: c.color }}>
            <span style={{ width: 9, height: 9, background: c.color, borderRadius: "50%" }} />{statusLabel(t, c)}
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: 7, marginTop: 16 }}>
            <span style={{ font: "700 38px/1 var(--font-space),sans-serif", letterSpacing: "-0.02em" }}>{c.priceLabel}</span>
            <span style={{ font: "600 20px/1 var(--font-space),sans-serif", color: "#5C636B" }}>€</span>
            <span style={{ font: "500 13px/1 var(--font-manrope),sans-serif", color: "#9AA0A8" }}>{t("fullPrice")}</span>
          </div>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, marginTop: 12, padding: "6px 12px", background: "#E9F7EF", border: "1px solid rgba(21,182,107,.25)", borderRadius: 100, alignSelf: "flex-start" }}>
            <span style={{ font: "600 12px/1 var(--font-manrope),sans-serif", color: "#0F9B5A" }}>✓ {t("noExamFee")}</span>
          </span>

          <button className="btn btn--primary" disabled={c.full} onClick={() => !c.full && open(c.id)} style={{ width: "100%", marginTop: 22, padding: "16px 26px", fontSize: 16 }}>
            {c.full ? t("courseFull") : t("interestArrow")}
          </button>
        </div>
      </div>
    </div>
  );
}

export function FeaturedCourse({ courses }: { courses: ComputedCourse[] }) {
  const featured = courses.find((c) => c.free > 0) ?? courses[0];
  if (!featured) return <EmptyState />;
  return <FeaturedCourseCard c={featured} />;
}

export function CoursesShowcase({ courses }: { courses: ComputedCourse[] }) {
  if (courses.length === 0) return <EmptyState />;

  const featured = courses.find((c) => c.free > 0) ?? courses[0];
  const rest = courses.filter((c) => c.id !== featured.id);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <FeaturedCourseCard c={featured} />
      {rest.length > 0 && <CoursesGrid courses={rest} />}
    </div>
  );
}

export function CoursesGrid({ courses, minCol = 300 }: { courses: ComputedCourse[]; minCol?: number }) {
  if (courses.length === 0) return <EmptyState />;
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit,minmax(${minCol}px,1fr))`, gap: 18 }}>
      {courses.map((c) => (
        <CourseCard key={c.id} c={c} />
      ))}
    </div>
  );
}
