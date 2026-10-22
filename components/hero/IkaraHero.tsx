import type { CSSProperties } from "react";
import { getTranslations } from "next-intl/server";
import { SignupButton } from "@/components/SignupButton";
import { Magnetic, Spotlight, TiltCard } from "@/components/motion/PointerEffects";
import { site } from "@/lib/site";
import "./ikara-hero.css";

const DAY_MS = 86_400_000;
const CET_OFFSET_MS = 3_600_000;

export type HeroCourse = { dateFrom: string };

function formatCourseDate(iso: string, locale: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (locale === "sk") return `${d}.\u00a0${m}.`;
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "UTC" })
    .format(new Date(Date.UTC(y, m - 1, d)))
    .replace(" ", "\u00a0");
}

/** Počet dní do začiatku kurzu (polnoc SEČ). Stránka sa regeneruje každých 30 s, takže číslo je aktuálne. */
function daysUntil(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Math.max(0, Math.ceil((Date.UTC(y, m - 1, d) - CET_OFFSET_MS - Date.now()) / DAY_MS));
}

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

const arrow = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

const check = (
  <span className="ih-check" aria-hidden>
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l5 5L20 7" />
    </svg>
  </span>
);

/** Nadpis rozdelený na slová — každé slovo sa vynorí s malým oneskorením (čisté CSS). */
function Headline({ lead, accent }: { lead: string; accent: string }) {
  const words = lead.split(" ");
  return (
    <h1 className="ih-h1">
      {words.map((w, i) => (
        <span key={i}>
          <span className="ih-word" style={{ "--i": i } as CSSProperties}>
            {w}
          </span>{" "}
        </span>
      ))}
      <span className="ih-accent">
        <span className="ih-word" style={{ "--i": words.length } as CSSProperties}>
          {accent}
        </span>
        <svg className="ih-swoosh" viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden>
          <path d="M4 14 C 80 4, 200 2, 296 9" pathLength={1} fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        </svg>
      </span>
    </h1>
  );
}

export async function IkaraHero({ locale, nextCourse }: { locale: string; nextCourse: HeroCourse | null }) {
  const t = await getTranslations("hero");
  const price = new Intl.NumberFormat(locale === "sk" ? "sk-SK" : "en-GB").format(site.priceFromEur);
  const date = nextCourse ? formatCourseDate(nextCourse.dateFrom, locale) : null;

  return (
    <section className="ih" id="hero">
      <Spotlight />
      <div className="ih-wrap">
        <div>
          <p className="ih-label ih-in">
            <span className="ih-ping" />
            {t("label")}
          </p>
          <Headline lead={t("titleLead")} accent={t("titleAccent")} />
          <p className="ih-sub ih-in" style={delay(0.35)}>
            {t("sub")}
          </p>

          <div className="ih-ctas ih-in" style={delay(0.45)}>
            <Magnetic>
              <SignupButton className="ih-btn">
                {date ? t("ctaDate", { date }) : t("cta")}
                {arrow}
              </SignupButton>
            </Magnetic>
            <a className="ih-btn2" href={site.mobileHref}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
              </svg>
              {site.mobile}
            </a>
          </div>

          <ul className="ih-proof ih-in" style={delay(0.55)}>
            <li>
              {check}
              <span>{t.rich("proofPrice", { price, b: (c) => <b>{c}</b> })}</span>
            </li>
            <li>
              {check}
              <span>{t.rich("proofExam", { b: (c) => <b>{c}</b> })}</span>
            </li>
            <li>
              <span className="ih-star" aria-hidden>
                ★★★★★
              </span>
              <span>{t.rich("proofRating", { b: (c) => <b>{c}</b> })}</span>
            </li>
          </ul>

          {nextCourse && (
            <p className="ih-next ih-in" style={delay(0.65)}>
              <span className="ih-ping" />
              <span>{t.rich("nextIn", { days: daysUntil(nextCourse.dateFrom), date: date ?? "", b: (c) => <b>{c}</b> })}</span>
            </p>
          )}
        </div>

        <TiltCard className="ih-cardin">
          <LicenceCard t={t} />
        </TiltCard>
      </div>
    </section>
  );
}

type T = Awaited<ReturnType<typeof getTranslations<"hero">>>;

/** Vodičák „Ty" — jediný vizuál hero, bez plávajúcich doplnkov. */
function LicenceCard({ t }: { t: T }) {
  return (
    <div className="ih-lic" aria-hidden>
      <div className="ih-lic-top">
        <div>
          <b>{t("licenseTitle")}</b>
          <small>{t("licenseSub")}</small>
        </div>
        <span className="ih-b">B</span>
      </div>
      <div className="ih-lic-mid">
        <div className="ih-photo">
          <svg viewBox="0 0 80 100" width="100%">
            <circle cx="40" cy="38" r="17" fill="#33466A" />
            <path d="M8 100c0-20 14-34 32-34s32 14 32 34z" fill="#33466A" />
          </svg>
        </div>
        <div className="ih-fields">
          <div>
            <small>{t("licenseNameLabel")}</small>
            <span className="ih-name">{t("licenseName")}</span>
          </div>
          <div>
            <small>{t("licenseGroupLabel")}</small>
            <span>{t("licenseGroup")}</span>
          </div>
          <div>
            <small>{t("licenseSchoolLabel")}</small>
            <span>{t("licenseSchool")}</span>
          </div>
        </div>
      </div>
      <div className="ih-lic-bot">
        <div />
      </div>
    </div>
  );
}
