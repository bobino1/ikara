"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type FormState = { name: string; email: string; phone: string; message: string };
type Errors = { name?: boolean; email?: boolean; phone?: boolean };

const inputStyle = (err?: boolean): React.CSSProperties => ({
  width: "100%",
  padding: "14px 16px",
  border: `1.5px solid ${err ? "#E5484D" : "#E3E5E0"}`,
  borderRadius: 12,
  font: "400 16px/1 var(--font-manrope),sans-serif",
  background: "#fff",
  outline: "none",
});
const labelStyle: React.CSSProperties = { font: "600 13px/1 var(--font-manrope),sans-serif", color: "#3A4048", display: "block", marginBottom: 8 };
const errStyle: React.CSSProperties = { font: "500 12px/1 var(--font-manrope),sans-serif", color: "#E5484D", display: "block", marginTop: 6 };

export function ContactForm() {
  const t = useTranslations("form");
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const setField = (k: keyof FormState, v: string) => {
    setForm((s) => ({ ...s, [k]: v }));
    if (k in errors) setErrors((e) => ({ ...e, [k]: false }));
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
        body: JSON.stringify({ ...form, type: "kontakt" }),
      });
    } catch {
      /* ignore — správu zaevidujeme aj tak */
    } finally {
      setSending(false);
      setSubmitted(true);
    }
  };

  const reset = () => {
    setSubmitted(false);
    setForm({ name: "", email: "", phone: "", message: "" });
    setErrors({});
  };

  return (
    <div style={{ background: "var(--bg-soft)", borderRadius: 24, padding: "clamp(24px,3vw,36px)" }}>
      {submitted ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "40px 0" }}>
          <div style={{ width: 64, height: 64, background: "#E9F7EF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ width: 22, height: 11, borderLeft: "4px solid #15B66B", borderBottom: "4px solid #15B66B", transform: "rotate(-45deg)", marginTop: -6 }} />
          </div>
          <h3 style={{ font: "700 24px/1.1 var(--font-space),sans-serif", margin: "22px 0 0" }}>{t("thanksTitle")}</h3>
          <p style={{ font: "400 16px/1.6 var(--font-manrope),sans-serif", color: "var(--muted)", margin: "12px 0 0", maxWidth: 320 }}>
            {t("thanksText")}
          </p>
          <button onClick={reset} style={{ marginTop: 24, padding: "13px 24px", background: "var(--ink)", color: "#fff", border: "none", borderRadius: 11, font: "600 15px/1 var(--font-manrope),sans-serif", cursor: "pointer" }}>
            {t("sendAnother")}
          </button>
        </div>
      ) : (
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={labelStyle}>{t("name")}</label>
            <input value={form.name} onChange={(e) => setField("name", e.target.value)} placeholder={t("namePh")} style={inputStyle(errors.name)} />
            {errors.name && <span style={errStyle}>{t("nameErr")}</span>}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 16 }}>
            <div>
              <label style={labelStyle}>{t("email")}</label>
              <input value={form.email} onChange={(e) => setField("email", e.target.value)} placeholder={t("emailPh")} style={inputStyle(errors.email)} />
              {errors.email && <span style={errStyle}>{t("emailErr")}</span>}
            </div>
            <div>
              <label style={labelStyle}>{t("phone")}</label>
              <input value={form.phone} onChange={(e) => setField("phone", e.target.value)} placeholder={t("phonePh")} style={inputStyle(errors.phone)} />
              {errors.phone && <span style={errStyle}>{t("phoneErr")}</span>}
            </div>
          </div>
          <div>
            <label style={labelStyle}>{t("message")}</label>
            <textarea
              value={form.message}
              onChange={(e) => setField("message", e.target.value)}
              placeholder={t("messagePh")}
              rows={4}
              style={{ ...inputStyle(), lineHeight: 1.5, resize: "vertical" }}
            />
          </div>
          <button type="submit" disabled={sending} className="btn btn--primary" style={{ padding: 16, fontSize: 17, cursor: sending ? "wait" : "pointer", opacity: sending ? 0.75 : 1 }}>
            {sending ? t("sending") : t("send")}
          </button>
        </form>
      )}
    </div>
  );
}
