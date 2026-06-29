"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";
import { useSignup } from "./SignupProvider";
import { useCookieConsent } from "./CookieConsent";
import { Logo } from "./Logo";

const colHead: React.CSSProperties = {
  font: "700 12px/1 var(--font-manrope),sans-serif",
  color: "#A6B4C8",
  letterSpacing: ".12em",
  textTransform: "uppercase",
  marginBottom: 18,
};
const contactLine: React.CSSProperties = {
  font: "500 15px/1.4 var(--font-manrope),sans-serif",
  color: "#C2C8D2",
};

export function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const { open: openSignup } = useSignup();
  const { openSettings } = useCookieConsent();

  return (
    <footer style={{ background: "#0A1322", color: "#fff", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -140, right: -80, width: 380, height: 380, background: "radial-gradient(circle,rgba(43,95,227,.35),transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(44px,6vw,72px) 22px 34px", position: "relative" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: 28,
            alignItems: "center",
            background: "linear-gradient(120deg,rgba(43,95,227,.18),rgba(122,160,255,.06))",
            border: "1px solid rgba(122,160,255,.18)",
            borderRadius: 24,
            padding: "clamp(26px,4vw,40px)",
            marginBottom: "clamp(40px,5vw,60px)",
          }}
        >
          <div>
            <h2 style={{ font: "700 clamp(24px,3.2vw,34px)/1.12 var(--font-space),sans-serif", letterSpacing: "-0.02em", margin: 0 }}>{t("ctaTitle")}</h2>
            <p style={{ font: "400 16px/1.6 var(--font-manrope),sans-serif", color: "#AEB6C4", margin: "12px 0 0", maxWidth: 420 }}>{t("ctaText")}</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "flex-start" }}>
            <button onClick={() => openSignup()} className="btn btn--primary" style={{ padding: "16px 26px", fontSize: 16 }}>
              {t("signup")}
            </button>
            <a href={site.mobileHref} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 24px", background: "rgba(255,255,255,.06)", border: "1.5px solid rgba(255,255,255,.16)", borderRadius: 13, font: "600 16px/1 var(--font-manrope),sans-serif", color: "#fff" }}>
              {site.mobile}
            </a>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 36 }}>
          <div style={{ gridColumn: "1 / -1", maxWidth: 340 }}>
            <Logo height={52} dark />
            <p style={{ font: "400 14px/1.65 var(--font-manrope),sans-serif", color: "#8A9098", margin: "18px 0 0" }}>{t("about")}</p>
          </div>

          <div>
            <div style={colHead}>{t("colWeb")}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 13, alignItems: "flex-start" }}>
              <Link href="/" className="footer-link">{tn("home")}</Link>
              <Link href="/o-nas" className="footer-link">{tn("about")}</Link>
              <Link href="/o-kurze" className="footer-link">{tn("course")}</Link>
            </div>
          </div>

          <div>
            <div style={colHead}>{t("colOffer")}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 13, alignItems: "flex-start" }}>
              <Link href="/kondicne-jazdy" className="footer-link">{tn("kondicne")}</Link>
              <Link href="/kurzy" className="footer-link">{t("nearestCourses")}</Link>
              <Link href="/kontakt" className="footer-link">{tn("kontakt")}</Link>
            </div>
          </div>

          <div>
            <div style={colHead}>{t("colContact")}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              <span style={contactLine}>{site.phone}</span>
              <span style={contactLine}>{site.mobile} · {t("nonstop")}</span>
              <span style={{ ...contactLine, wordBreak: "break-all" }}>{site.email}</span>
              <span style={contactLine}>{site.address.line1}, Bratislava</span>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,.08)", marginTop: 44, paddingTop: 24, display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 18px" }}>
            <span style={{ font: "400 13px/1 var(--font-manrope),sans-serif", color: "#6B717A" }}>{t("rights")}</span>
            <Link href="/cookies" className="footer-link" style={{ fontSize: 13 }}>{t("cookiePolicy")}</Link>
            <button onClick={openSettings} className="footer-link" style={{ fontSize: 13, cursor: "pointer" }}>{t("cookieSettings")}</button>
          </div>
          <a
            href="https://wetrixo.com"
            target="_blank"
            rel="noopener noreferrer"
            title="IT a tvorba webových stránok — wetrixo.com"
            className="footer-link"
            style={{ display: "inline-flex", alignItems: "baseline", gap: 8, font: "500 13px/1.4 var(--font-manrope),sans-serif" }}
          >
            <span style={{ color: "#6B717A" }}>{t("madeBy")} ·</span>
            <span style={{ font: "700 14px/1 var(--font-space),sans-serif", color: "#fff" }}>
              wetrixo<span style={{ color: "#7AA0FF" }}>.com</span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
