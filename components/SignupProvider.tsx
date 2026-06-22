"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useTranslations } from "next-intl";
import type { ComputedCourse } from "@/lib/courses";

type SignupContextValue = {
  /** Otvorí modal s prihláškou. Voliteľne predvyplní konkrétny kurz. */
  open: (courseId?: string) => void;
};

const SignupContext = createContext<SignupContextValue | null>(null);

export function useSignup() {
  const ctx = useContext(SignupContext);
  if (!ctx) throw new Error("useSignup musí byť použité vnútri <SignupProvider>");
  return ctx;
}

type FormState = { name: string; email: string; phone: string };
type Errors = { name?: boolean; email?: boolean; phone?: boolean };

export function SignupProvider({ children, courses }: { children: ReactNode; courses: ComputedCourse[] }) {
  const t = useTranslations("signup");
  const tf = useTranslations("form");
  const tc = useTranslations("course");
  const statusLabel = (c: ComputedCourse) =>
    c.free <= 0 ? tc("full") : c.free === 1 ? tc("lastSpot") : c.free === 2 ? tc("lastSpots", { count: c.free }) : tc("freeSpots", { count: c.free });
  const [isOpen, setIsOpen] = useState(false);
  const [courseId, setCourseId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const hot = useMemo(() => courses.find((c) => c.free > 0) ?? courses[0], [courses]);
  const openCourses = courses.filter((c) => c.free > 0);

  const activeId = courseId ?? hot?.id ?? "";
  const current = courses.find((c) => c.id === activeId) ?? hot;

  const open = useCallback(
    (id?: string) => {
      setCourseId(id ?? hot?.id ?? null);
      setSubmitted(false);
      setErrors({});
      setIsOpen(true);
    },
    [hot?.id]
  );

  const close = () => setIsOpen(false);

  const setField = (k: keyof FormState, v: string) => {
    setForm((s) => ({ ...s, [k]: v }));
    setErrors((e) => ({ ...e, [k]: false }));
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const errs: Errors = {};
    if (!form.name.trim()) errs.name = true;
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = true;
    if (form.phone.trim().length < 6) errs.phone = true;
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSending(true);
    try {
      await fetch("/api/prihlaska", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, courseId: activeId, type: "kurz" }),
      });
    } catch {
      /* prihlášku evidujeme aj tak — neskôr napojiť na e-mail/CRM */
    } finally {
      setSending(false);
      setSubmitted(true);
    }
  };

  const labelMuted = "font:500 11px/1 var(--font-manrope),sans-serif";
  const inputStyle = (err?: boolean): React.CSSProperties => ({
    width: "100%",
    padding: "14px 16px",
    border: `1.5px solid ${err ? "#E5484D" : "#E3E5E0"}`,
    borderRadius: 12,
    font: "400 16px/1 var(--font-manrope),sans-serif",
    background: "#fff",
    outline: "none",
  });

  return (
    <SignupContext.Provider value={{ open }}>
      {children}

      {isOpen && (
        <div
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "rgba(15,17,21,.55)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              width: "100%",
              maxWidth: 520,
              maxHeight: "92vh",
              overflowY: "auto",
              borderRadius: "24px 24px 0 0",
              padding: 28,
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
              <div>
                <span style={{ font: "600 12px/1 var(--font-manrope),sans-serif", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--blue)" }}>
                  {t("eyebrow")}
                </span>
                <h3 style={{ font: "700 26px/1.1 var(--font-space),sans-serif", margin: "10px 0 0" }}>{t("title")}</h3>
              </div>
              <button
                onClick={close}
                aria-label={t("close")}
                style={{ width: 40, height: 40, border: "1px solid #E3E5E0", background: "var(--bg-soft)", borderRadius: 12, cursor: "pointer", fontSize: 18, color: "var(--ink)", flexShrink: 0 }}
              >
                ✕
              </button>
            </div>

            {submitted ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "30px 0" }}>
                <div style={{ width: 64, height: 64, background: "#E9F7EF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ width: 22, height: 11, borderLeft: "4px solid #15B66B", borderBottom: "4px solid #15B66B", transform: "rotate(-45deg)", marginTop: -6 }} />
                </div>
                <h3 style={{ font: "700 24px/1.1 var(--font-space),sans-serif", margin: "22px 0 0" }}>{t("sentTitle")}</h3>
                <p style={{ font: "400 16px/1.6 var(--font-manrope),sans-serif", color: "var(--muted)", margin: "12px 0 0", maxWidth: 340 }}>
                  {t("sentText", { id: current?.id ?? "—" })}
                </p>
                <button onClick={close} style={{ marginTop: 24, padding: "14px 28px", background: "var(--blue)", color: "#fff", border: "none", borderRadius: 12, font: "600 16px/1 var(--font-manrope),sans-serif", cursor: "pointer" }}>
                  {t("done")}
                </button>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 22 }}>
                <div style={{ background: "var(--bg-soft)", borderRadius: 14, padding: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <div>
                    <div style={{ font: labelMuted, color: "#9AA0A8", letterSpacing: ".06em", textTransform: "uppercase" }}>{t("selectedCourse")}</div>
                    <div style={{ font: "700 22px/1 var(--font-space),sans-serif", marginTop: 7 }}>{current?.id ?? "—"}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ font: labelMuted, color: "#9AA0A8", letterSpacing: ".06em", textTransform: "uppercase" }}>{t("start")}</div>
                    <div style={{ font: "600 16px/1 var(--font-space),sans-serif", marginTop: 7 }}>{current?.start ?? "—"}</div>
                  </div>
                </div>

                {openCourses.length > 0 && (
                  <div>
                    <label style={{ font: "600 13px/1 var(--font-manrope),sans-serif", color: "#3A4048", display: "block", marginBottom: 8 }}>{t("changeTerm")}</label>
                    <select
                      value={activeId}
                      onChange={(e) => setCourseId(e.target.value)}
                      style={{ ...inputStyle(), cursor: "pointer" }}
                    >
                      {openCourses.map((c) => (
                        <option key={c.id} value={c.id}>
                          {t("termOption", { id: c.id, start: c.start, label: statusLabel(c) })}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label style={{ font: "600 13px/1 var(--font-manrope),sans-serif", color: "#3A4048", display: "block", marginBottom: 8 }}>{tf("name")}</label>
                  <input value={form.name} onChange={(e) => setField("name", e.target.value)} placeholder={tf("namePh")} style={inputStyle(errors.name)} />
                  {errors.name && <span style={{ font: "500 12px/1 var(--font-manrope),sans-serif", color: "#E5484D", display: "block", marginTop: 6 }}>{tf("nameErr")}</span>}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 16 }}>
                  <div>
                    <label style={{ font: "600 13px/1 var(--font-manrope),sans-serif", color: "#3A4048", display: "block", marginBottom: 8 }}>{tf("email")}</label>
                    <input value={form.email} onChange={(e) => setField("email", e.target.value)} placeholder={tf("emailPh")} style={inputStyle(errors.email)} />
                    {errors.email && <span style={{ font: "500 12px/1 var(--font-manrope),sans-serif", color: "#E5484D", display: "block", marginTop: 6 }}>{tf("emailErr")}</span>}
                  </div>
                  <div>
                    <label style={{ font: "600 13px/1 var(--font-manrope),sans-serif", color: "#3A4048", display: "block", marginBottom: 8 }}>{tf("phone")}</label>
                    <input value={form.phone} onChange={(e) => setField("phone", e.target.value)} placeholder={tf("phonePh")} style={inputStyle(errors.phone)} />
                    {errors.phone && <span style={{ font: "500 12px/1 var(--font-manrope),sans-serif", color: "#E5484D", display: "block", marginTop: 6 }}>{tf("phoneErr")}</span>}
                  </div>
                </div>

                <button type="submit" disabled={sending} style={{ marginTop: 4, padding: 16, background: "var(--blue)", color: "#fff", border: "none", borderRadius: 12, font: "600 17px/1 var(--font-manrope),sans-serif", cursor: sending ? "wait" : "pointer", opacity: sending ? 0.75 : 1 }}>
                  {sending ? t("sending") : t("submit")}
                </button>
                <p style={{ font: "400 12px/1.5 var(--font-manrope),sans-serif", color: "#9AA0A8", textAlign: "center", margin: 0 }}>
                  {t("consent")}
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </SignupContext.Provider>
  );
}
