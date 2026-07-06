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
import { Link } from "@/i18n/navigation";
import type { ComputedCourse } from "@/lib/courses";
import { site } from "@/lib/site";

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
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeConsent, setAgreeConsent] = useState(false);
  const [confirmErr, setConfirmErr] = useState(false);
  // Úvodný krok: potvrdenie, že žiadateľ vie o lekárskej prehliadke a tlačive.
  const [ackDone, setAckDone] = useState(false);
  const [ackCheck, setAckCheck] = useState(false);
  const [ackErr, setAckErr] = useState(false);
  // Anti-spam: honeypot (skryté pole, ktoré vyplnia len boti) + čas otvorenia (proti okamžitým odoslaniam).
  const [hp, setHp] = useState("");
  const [openedAt, setOpenedAt] = useState(0);

  // Kurzy rozlišujeme podľa unikátneho _id (funguje aj pri dvoch kurzoch s rovnakým číslom).
  const keyOf = (c: ComputedCourse) => c._id ?? c.id;

  const hot = useMemo(() => courses.find((c) => c.free > 0) ?? courses[0], [courses]);
  const openCourses = courses.filter((c) => c.free > 0);

  const activeKey = courseId ?? (hot ? keyOf(hot) : "");
  const current = courses.find((c) => keyOf(c) === activeKey) ?? hot;

  const open = useCallback(
    (key?: string) => {
      // plný termín predvyplníme najbližším voľným, aby sa dalo prihlásiť
      const wanted = key ? courses.find((c) => (c._id ?? c.id) === key) : undefined;
      const preselect = wanted && wanted.free > 0 ? wanted._id ?? wanted.id : hot ? hot._id ?? hot.id : null;
      setCourseId(preselect);
      setSubmitted(false);
      setErrors({});
      setAgreeTerms(false);
      setAgreeConsent(false);
      setConfirmErr(false);
      setAckDone(false);
      setAckCheck(false);
      setAckErr(false);
      setHp("");
      setOpenedAt(Date.now());
      setIsOpen(true);
    },
    [courses, hot]
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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) errs.email = true;
    if (form.phone.trim().replace(/[^\d+]/g, "").length < 9) errs.phone = true;
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    if (!agreeTerms || !agreeConsent) {
      setConfirmErr(true);
      return;
    }

    // Anti-spam: honeypot vyplnený (bot), alebo odoslané podozrivo rýchlo → tichý "úspech", nič neposielame.
    const looksLikeBot = hp.trim().length > 0 || (openedAt > 0 && Date.now() - openedAt < 2500);
    if (looksLikeBot) {
      setSubmitted(true);
      return;
    }

    setSending(true);
    const kurzLabel = current ? `Kurz ${current.id} — začiatok ${current.start} · ${current.priceLabel} €` : activeKey;
    try {
      await Promise.allSettled([
        // Server: uloží žiaka do systému (Prihláška) + navýši počet (potrebuje token).
        fetch("/api/prihlaska", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, website: hp, courseId: current?.id ?? activeKey, courseDocId: current?._id, type: "kurz" }),
        }),
        // E-mail inštruktorovi cez Formsubmit — POSIELA SA Z PREHLIADAČA (Referer pošle prehliadač sám).
        fetch(`https://formsubmit.co/ajax/${encodeURIComponent(site.email)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone,
            kurz: kurzLabel,
            _subject: `Nová prihláška na kurz ${current?.id ?? ""}`.trim(),
            _template: "table",
            _captcha: "false",
            _honey: hp, // Formsubmit sám zahodí, ak je honeypot vyplnený
          }),
        }),
      ]);
    } catch {
      /* prihlášku evidujeme aj tak */
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
            ) : !ackDone ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 22 }}>
                <div style={{ background: "#FFF7E8", border: "1px solid #F3D89B", borderRadius: 14, padding: 18 }}>
                  <h4 style={{ font: "700 17px/1.2 var(--font-space),sans-serif", margin: 0, color: "var(--ink)" }}>{t("reqTitle")}</h4>
                  <p style={{ font: "400 14px/1.6 var(--font-manrope),sans-serif", color: "#5C4A1E", margin: "8px 0 0" }}>{t("reqText")}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
                    {[t("reqPoint1"), t("reqPoint2")].map((p) => (
                      <div key={p} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{ width: 7, height: 7, background: "#E0A22B", borderRadius: "50%", marginTop: 6, flexShrink: 0 }} />
                        <span style={{ font: "400 14px/1.5 var(--font-manrope),sans-serif", color: "#3A4048" }}>{p}</span>
                      </div>
                    ))}
                  </div>
                  <a href="/ziadost-o-vodicske-opravnenie.pdf" target="_blank" rel="noopener noreferrer" className="btn btn--outline" style={{ marginTop: 14, padding: "12px 18px", fontSize: 14 }}>
                    {t("reqDownload")}
                  </a>
                </div>
                <label style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer", background: ackErr && !ackCheck ? "#FDECEC" : "var(--bg-soft)", border: `1px solid ${ackErr && !ackCheck ? "#E5484D" : "#ECEEE9"}`, borderRadius: 12, padding: "12px 14px" }}>
                  <input
                    type="checkbox"
                    checked={ackCheck}
                    onChange={(e) => { setAckCheck(e.target.checked); if (e.target.checked) setAckErr(false); }}
                    style={{ width: 18, height: 18, marginTop: 1, accentColor: "var(--blue)", flexShrink: 0, cursor: "pointer" }}
                  />
                  <span style={{ font: "500 13px/1.5 var(--font-manrope),sans-serif", color: "#3A4048" }}>{t("reqCheck")}</span>
                </label>
                {ackErr && <span style={{ font: "500 12px/1 var(--font-manrope),sans-serif", color: "#E5484D" }}>{t("reqErr")}</span>}
                <button
                  type="button"
                  onClick={() => { if (!ackCheck) { setAckErr(true); return; } setAckDone(true); }}
                  style={{ marginTop: 4, padding: 16, background: "var(--blue)", color: "#fff", border: "none", borderRadius: 12, font: "600 17px/1 var(--font-manrope),sans-serif", cursor: "pointer" }}
                >
                  {t("reqContinue")}
                </button>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 22 }}>
                {/* honeypot — skryté pole proti botom; človek ho nevidí */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
                />
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
                      value={activeKey}
                      onChange={(e) => setCourseId(e.target.value)}
                      style={{ ...inputStyle(), cursor: "pointer" }}
                    >
                      {openCourses.map((c) => (
                        <option key={keyOf(c)} value={keyOf(c)}>
                          {t("termOption", { id: c.id, start: c.start, label: statusLabel(c) })} · {c.priceLabel} €
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

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <label style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer", background: confirmErr && !agreeTerms ? "#FDECEC" : "var(--bg-soft)", border: `1px solid ${confirmErr && !agreeTerms ? "#E5484D" : "#ECEEE9"}`, borderRadius: 12, padding: "12px 14px" }}>
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => { setAgreeTerms(e.target.checked); if (e.target.checked) setConfirmErr(false); }}
                      style={{ width: 18, height: 18, marginTop: 1, accentColor: "var(--blue)", flexShrink: 0, cursor: "pointer" }}
                    />
                    <span style={{ font: "500 13px/1.5 var(--font-manrope),sans-serif", color: "#3A4048" }}>
                      {t.rich("terms", {
                        link: (chunks) => (
                          <Link href="/o-kurze" target="_blank" style={{ color: "var(--blue)", fontWeight: 600 }} onClick={(e) => e.stopPropagation()}>
                            {chunks}
                          </Link>
                        ),
                      })}
                    </span>
                  </label>

                  <label style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer", background: confirmErr && !agreeConsent ? "#FDECEC" : "var(--bg-soft)", border: `1px solid ${confirmErr && !agreeConsent ? "#E5484D" : "#ECEEE9"}`, borderRadius: 12, padding: "12px 14px" }}>
                    <input
                      type="checkbox"
                      checked={agreeConsent}
                      onChange={(e) => { setAgreeConsent(e.target.checked); if (e.target.checked) setConfirmErr(false); }}
                      style={{ width: 18, height: 18, marginTop: 1, accentColor: "var(--blue)", flexShrink: 0, cursor: "pointer" }}
                    />
                    <span style={{ font: "500 13px/1.5 var(--font-manrope),sans-serif", color: "#3A4048" }}>{t("agree", { id: current?.id ?? "—" })}</span>
                  </label>
                </div>
                {confirmErr && <span style={{ font: "500 12px/1 var(--font-manrope),sans-serif", color: "#E5484D", display: "block" }}>{t("confirmErr")}</span>}

                <button type="submit" disabled={sending} style={{ marginTop: 4, padding: 16, background: "var(--blue)", color: "#fff", border: "none", borderRadius: 12, font: "600 17px/1 var(--font-manrope),sans-serif", cursor: sending ? "wait" : "pointer", opacity: sending ? 0.75 : 1 }}>
                  {sending ? t("sending") : t("submit")}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </SignupContext.Provider>
  );
}
