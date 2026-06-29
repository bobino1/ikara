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
  if (c.free <= 2) return t("lastSpots", { count: c.free });
  return t("freeSpots", { count: c.free });
}

function OccupancyBar({ c, label }: { c: ComputedCourse; label: string }) {
  const pct = c.capacity > 0 ? Math.round((c.taken / c.capacity) * 100) : 0;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 7, font: "600 13px/1 var(--font-manrope),sans-serif", color: c.color }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: c.color }} />
          {label}
        </span>
        <span style={{ font: "500 12px/1 var(--font-manrope),sans-serif", color: "#9AA0A8" }}>{c.taken}/{c.capacity}</span>
      </div>
      <div style={{ height: 6, borderRadius: 5, background: "#EDEFEA", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: c.color, borderRadius: 5 }} />
      </div>
    </div>
  );
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

      <div style={{ marginTop: 16 }}>
        <OccupancyBar c={c} label={statusLabel(t, c)} />
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 22, borderTop: "1px solid #ECEEE9" }}>
        <span style={{ font: "700 22px/1 var(--font-space),sans-serif" }}>{c.priceLabel} €</span>
        <button className="btn btn--primary" onClick={() => open(c.id)} style={{ padding: "12px 20px", borderRadius: 11, fontSize: 15 }}>
          {t("interest")}
        </button>
      </div>
    </div>
  );
}

function Fact({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div>
      <div style={cellLabel}>{label}</div>
      <div style={{ font: "700 18px/1.2 var(--font-space),sans-serif", color: color ?? "var(--ink)", marginTop: 6 }}>{value}</div>
    </div>
  );
}

export function FeaturedCourseCard({ c }: { c: ComputedCourse }) {
  const { open } = useSignup();
  const t = useTranslations("course");

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #ECEEE9",
        borderTop: `4px solid ${c.color}`,
        borderRadius: 24,
        padding: "clamp(24px,3.4vw,40px)",
        boxShadow: "0 26px 52px -32px rgba(14,26,43,.28)",
      }}
    >
      {/* hlavička */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 13px", background: "#E9F0FE", color: "#1C46C0", borderRadius: 100, font: "600 12px/1 var(--font-manrope),sans-serif", letterSpacing: ".04em" }}>
          <span style={{ width: 7, height: 7, background: "var(--green)", borderRadius: "50%", boxShadow: "0 0 0 4px rgba(21,182,107,.16)" }} />
          {t("nearest")}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 13px", borderRadius: 100, font: "700 12px/1 var(--font-manrope),sans-serif", background: c.color, color: "#fff" }}>{statusTag(t, c)}</span>
      </div>

      {/* hlavný údaj — začiatok */}
      <div style={{ marginTop: 22 }}>
        <div style={{ font: "600 15px/1 var(--font-manrope),sans-serif", color: "#8A9088" }}>{t("courseNo", { id: c.id })} · {c.cat}</div>
        <div style={{ ...cellLabel, marginTop: 14 }}>{t("start")}</div>
        <div style={{ font: "700 clamp(32px,4.6vw,46px)/1.04 var(--font-space),sans-serif", color: "var(--ink)", letterSpacing: "-0.02em", marginTop: 8 }}>{c.start}</div>
      </div>

      {/* fakty */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "18px 40px", marginTop: 24 }}>
        <Fact label={t("signupBy")} value={c.signup} />
        <Fact label={t("price")} value={`${c.priceLabel} €`} />
      </div>

      {/* obsadenosť */}
      <div style={{ marginTop: 22 }}>
        <OccupancyBar c={c} label={statusLabel(t, c)} />
      </div>

      <div style={{ height: 1, background: "#ECEEE9", margin: "24px 0" }} />

      {/* pätička — 0 € + CTA */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 13px", background: "#E9F7EF", border: "1px solid rgba(21,182,107,.25)", borderRadius: 100, font: "600 13px/1 var(--font-manrope),sans-serif", color: "#0F9B5A" }}>
          ✓ {t("noExamFee")}
        </span>
        <button className="btn btn--primary" onClick={() => open(c.id)} style={{ padding: "15px 28px", fontSize: 16 }}>
          {t("interestArrow")}
        </button>
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
  // Pod hlavným kurzom zobrazíme najviac 2 ďalšie termíny.
  const rest = courses.filter((c) => c.id !== featured.id).slice(0, 2);

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
