"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export type CookieConsent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "ikara_cookie_consent_v1";
const DEFAULT: CookieConsent = { necessary: true, analytics: false, marketing: false };

type CookieContextValue = {
  consent: CookieConsent;
  /** Používateľ už urobil voľbu (uloženú). */
  decided: boolean;
  /** Otvorí panel s nastaveniami (napr. z pätičky). */
  openSettings: () => void;
  /** Zmení a uloží konkrétne kategórie (napr. povoliť mapu). */
  update: (partial: Partial<Omit<CookieConsent, "necessary">>) => void;
};

const CookieContext = createContext<CookieContextValue | null>(null);

export function useCookieConsent() {
  const ctx = useContext(CookieContext);
  if (!ctx) throw new Error("useCookieConsent musí byť použité vnútri <CookieConsentProvider>");
  return ctx;
}

function persist(c: CookieConsent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ analytics: c.analytics, marketing: c.marketing, ts: Date.now() }));
  } catch {
    /* localStorage nemusí byť dostupné */
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("ikara-cookie-consent", { detail: c }));
  }
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const t = useTranslations("cookies");
  const [consent, setConsent] = useState<CookieConsent>(DEFAULT);
  const [decided, setDecided] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // počiatočné toggly v paneli nastavení
  const [draft, setDraft] = useState({ analytics: false, marketing: false });

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const p = JSON.parse(raw);
        const loaded: CookieConsent = { necessary: true, analytics: !!p.analytics, marketing: !!p.marketing };
        setConsent(loaded);
        setDraft({ analytics: loaded.analytics, marketing: loaded.marketing });
        setDecided(true);
      } else {
        setBannerOpen(true);
      }
    } catch {
      setBannerOpen(true);
    }
  }, []);

  const save = useCallback((c: CookieConsent) => {
    setConsent(c);
    setDraft({ analytics: c.analytics, marketing: c.marketing });
    setDecided(true);
    setBannerOpen(false);
    setSettingsOpen(false);
    persist(c);
  }, []);

  const acceptAll = () => save({ necessary: true, analytics: true, marketing: true });
  const rejectAll = () => save({ necessary: true, analytics: false, marketing: false });
  const saveDraft = () => save({ necessary: true, analytics: draft.analytics, marketing: draft.marketing });

  const openSettings = useCallback(() => {
    setDraft({ analytics: consent.analytics, marketing: consent.marketing });
    setSettingsOpen(true);
  }, [consent]);

  const update = useCallback(
    (partial: Partial<Omit<CookieConsent, "necessary">>) => {
      save({ necessary: true, analytics: consent.analytics, marketing: consent.marketing, ...partial });
    },
    [consent, save]
  );

  return (
    <CookieContext.Provider value={{ consent, decided, openSettings, update }}>
      {children}

      {/* ---- LIŠTA (prvá návšteva) ---- */}
      {mounted && bannerOpen && !settingsOpen && (
        <div
          role="dialog"
          aria-label={t("bannerTitle")}
          style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 300, padding: "0 16px 16px" }}
        >
          <div
            style={{
              maxWidth: 1080,
              margin: "0 auto",
              background: "#fff",
              border: "1px solid #E3E5E0",
              borderRadius: 18,
              boxShadow: "0 24px 60px -24px rgba(14,26,43,.4)",
              padding: "clamp(18px,2.4vw,24px)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 18,
              alignItems: "center",
            }}
          >
            <div>
              <h2 style={{ font: "700 18px/1.2 var(--font-space),sans-serif", margin: 0, color: "var(--ink)" }}>{t("bannerTitle")}</h2>
              <p style={{ font: "400 14px/1.6 var(--font-manrope),sans-serif", color: "var(--muted)", margin: "8px 0 0" }}>
                {t("bannerText")}
                <Link href="/cookies" style={{ color: "var(--blue)", fontWeight: 600 }}>{t("policyLink")}</Link>.
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "flex-end" }}>
              <button onClick={() => setSettingsOpen(true)} className="btn btn--outline" style={{ padding: "12px 18px", fontSize: 14 }}>{t("settings")}</button>
              <button onClick={rejectAll} className="btn btn--outline" style={{ padding: "12px 18px", fontSize: 14 }}>{t("reject")}</button>
              <button onClick={acceptAll} className="btn btn--primary" style={{ padding: "12px 20px", fontSize: 14 }}>{t("acceptAll")}</button>
            </div>
          </div>
        </div>
      )}

      {/* ---- PANEL NASTAVENÍ ---- */}
      {mounted && settingsOpen && (
        <div
          onClick={() => setSettingsOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 310, background: "rgba(15,17,21,.55)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
        >
          <div
            role="dialog"
            aria-label={t("settingsTitle")}
            onClick={(e) => e.stopPropagation()}
            style={{ background: "#fff", width: "100%", maxWidth: 520, maxHeight: "90vh", overflowY: "auto", borderRadius: 22, padding: "clamp(22px,3vw,30px)" }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
              <h2 style={{ font: "700 22px/1.1 var(--font-space),sans-serif", margin: 0 }}>{t("settingsTitle")}</h2>
              <button onClick={() => setSettingsOpen(false)} aria-label={t("close")} style={{ width: 38, height: 38, border: "1px solid #E3E5E0", background: "var(--bg-soft)", borderRadius: 11, cursor: "pointer", fontSize: 17, color: "var(--ink)", flexShrink: 0 }}>✕</button>
            </div>
            <p style={{ font: "400 14px/1.6 var(--font-manrope),sans-serif", color: "var(--muted)", margin: "10px 0 20px" }}>
              {t("settingsIntro")}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <CategoryRow title={t("necessary")} desc={t("necessaryDesc")} checked disabled />
              <CategoryRow
                title={t("analytics")}
                desc={t("analyticsDesc")}
                checked={draft.analytics}
                onChange={(v) => setDraft((d) => ({ ...d, analytics: v }))}
              />
              <CategoryRow
                title={t("marketing")}
                desc={t("marketingDesc")}
                checked={draft.marketing}
                onChange={(v) => setDraft((d) => ({ ...d, marketing: v }))}
              />
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
              <button onClick={rejectAll} className="btn btn--outline" style={{ padding: "13px 18px", fontSize: 14 }}>{t("rejectAll")}</button>
              <button onClick={saveDraft} className="btn btn--outline" style={{ padding: "13px 18px", fontSize: 14 }}>{t("save")}</button>
              <button onClick={acceptAll} className="btn btn--primary" style={{ padding: "13px 20px", fontSize: 14 }}>{t("acceptAll")}</button>
            </div>
          </div>
        </div>
      )}
    </CookieContext.Provider>
  );
}

/** Tlačidlo na otvorenie nastavení cookies (použiteľné na stránke zásad). */
export function CookieSettingsButton({ className = "btn btn--primary", style, children }: { className?: string; style?: React.CSSProperties; children?: ReactNode }) {
  const { openSettings } = useCookieConsent();
  const t = useTranslations("cookies");
  return (
    <button onClick={openSettings} className={className} style={style}>
      {children ?? t("changeSettings")}
    </button>
  );
}

function CategoryRow({
  title,
  desc,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  desc: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 14, background: "var(--bg-soft)", border: "1px solid #ECEEE9", borderRadius: 14, padding: 16 }}>
      <div>
        <div style={{ font: "700 15px/1.2 var(--font-space),sans-serif", color: "var(--ink)" }}>{title}</div>
        <p style={{ font: "400 13px/1.5 var(--font-manrope),sans-serif", color: "var(--muted)", margin: "5px 0 0" }}>{desc}</p>
      </div>
      <Toggle checked={checked} disabled={disabled} onChange={onChange} label={title} />
    </div>
  );
}

function Toggle({ checked, disabled, onChange, label }: { checked: boolean; disabled?: boolean; onChange?: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      style={{
        flexShrink: 0,
        width: 46,
        height: 27,
        borderRadius: 100,
        border: "none",
        position: "relative",
        cursor: disabled ? "not-allowed" : "pointer",
        background: checked ? "var(--blue)" : "#CBD0CC",
        opacity: disabled ? 0.55 : 1,
        transition: "background .2s",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 3,
          left: checked ? 22 : 3,
          width: 21,
          height: 21,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 1px 3px rgba(0,0,0,.25)",
          transition: "left .2s",
        }}
      />
    </button>
  );
}
