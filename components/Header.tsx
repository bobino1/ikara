"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useSignup } from "./SignupProvider";
import { Logo } from "./Logo";

const navKeys = [
  { href: "/", key: "home" },
  { href: "/o-nas", key: "about" },
  { href: "/o-kurze", key: "course" },
  { href: "/kondicne-jazdy", key: "kondicne" },
  { href: "/kurzy", key: "kurzy" },
  { href: "/kontakt", key: "kontakt" },
] as const;

function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const switchTo = (next: string) => {
    if (next !== locale) router.replace(pathname, { locale: next });
  };

  const btn = (active: boolean): React.CSSProperties => ({
    padding: "5px 10px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    font: "700 12px/1 var(--font-manrope),sans-serif",
    background: active ? "var(--blue)" : "transparent",
    color: active ? "#fff" : "#5C636B",
  });

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 2, padding: 3, background: "var(--bg-soft)", border: "1px solid #ECEEE9", borderRadius: 10 }}>
      <button onClick={() => switchTo("sk")} style={btn(locale === "sk")} aria-label="Slovensky">SK</button>
      <button onClick={() => switchTo("en")} style={btn(locale === "en")} aria-label="English">EN</button>
    </div>
  );
}

export function Header() {
  const t = useTranslations("nav");
  const th = useTranslations("header");
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { open: openSignup } = useSignup();

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 880);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 60,
          background: "rgba(255,255,255,.82)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid #ECEEE9",
        }}
      >
        <nav style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <Link href="/" aria-label="Autoškola IKARA">
            <Logo height={54} />
          </Link>

          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {navKeys.map((item) => (
                <Link key={item.href} href={item.href} className={`nav-link ${isActive(item.href) ? "is-active" : ""}`}>
                  {t(item.key)}
                  {isActive(item.href) && <span className="nav-underline" />}
                </Link>
              ))}
              <span style={{ marginLeft: 8 }}>
                <LanguageSwitcher />
              </span>
            </div>
          )}

          {isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <LanguageSwitcher />
              <button
                onClick={() => setMenuOpen(true)}
                aria-label={th("menu")}
                style={{ display: "flex", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 10 }}
              >
                <span style={{ width: 24, height: 2, background: "var(--ink)", borderRadius: 2 }} />
                <span style={{ width: 24, height: 2, background: "var(--ink)", borderRadius: 2 }} />
                <span style={{ width: 24, height: 2, background: "var(--ink)", borderRadius: 2 }} />
              </button>
            </div>
          )}
        </nav>
      </header>

      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "#fff", display: "flex", flexDirection: "column", padding: 22 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Logo height={46} />
            <button onClick={() => setMenuOpen(false)} aria-label={th("close")} style={{ width: 42, height: 42, border: "1px solid #E3E5E0", background: "var(--bg-soft)", borderRadius: 12, cursor: "pointer", fontSize: 20, color: "var(--ink)" }}>
              ✕
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 32 }}>
            {navKeys.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{ textAlign: "left", borderBottom: "1px solid #F0F1ED", padding: "18px 4px", font: "700 26px/1 var(--font-space),sans-serif", color: "var(--ink)" }}
              >
                {t(item.key)}
              </Link>
            ))}
          </div>
          <button
            onClick={() => {
              setMenuOpen(false);
              openSignup();
            }}
            style={{ marginTop: "auto", padding: 18, background: "var(--blue)", color: "#fff", border: "none", borderRadius: 14, font: "600 18px/1 var(--font-manrope),sans-serif", cursor: "pointer" }}
          >
            {th("signup")}
          </button>
        </div>
      )}
    </>
  );
}
