import type { CSSProperties, ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { SignupButton } from "@/components/SignupButton";
import { GoogleG } from "@/components/GoogleG";
import { site } from "@/lib/site";
import { CountUp } from "./CountUp";
import { CourseCountdown } from "./CourseCountdown";
import "./ikara-hero.css";

/** Cena „od" zobrazená v hero (vodičák B). */
const PRICE_FROM_EUR = 1100;
const GOOGLE_RATING = 4.4;
const STAR_COUNT = 5;

const STEPS = [
  { key: "step1", left: "22%", on: "ih-on1" },
  { key: "step2", left: "40%", on: "ih-on2" },
  { key: "step3", left: "58%", on: "ih-on3" },
  { key: "step4", left: "76%", on: "ih-on4" },
] as const;

const icon = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const STAR_PATH = "M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z";

export type HeroCourse = { dateFrom: string };

type T = Awaited<ReturnType<typeof getTranslations<"hero">>>;

function formatCourseDate(iso: string, locale: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (locale === "sk") return `${d}. ${m}. ${y}`;
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(y, m - 1, d)),
  );
}

export async function IkaraHero({ locale, nextCourse }: { locale: string; nextCourse: HeroCourse | null }) {
  const t = await getTranslations("hero");
  const price = new Intl.NumberFormat(locale === "sk" ? "sk-SK" : "en-GB").format(PRICE_FROM_EUR);
  const decimalSeparator = locale === "sk" ? "," : ".";
  const courseDate = nextCourse ? formatCourseDate(nextCourse.dateFrom, locale) : null;

  return (
    <section className="ih">
      <div className="ih-wrap">
        <div className="ih-top">
          <div className="ih-left">
            <div className="ih-label ih-rise">
              <span className="ih-ping" />
              <span>{t("label")}</span>
            </div>
            <h1 className="ih-h1 ih-gro ih-rise ih-d1">
              {t("titleLead")}{" "}
              <span className="ih-hl">
                {t("titleAccent")}
                <svg className="ih-swoosh" viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden>
                  <path d="M4 14 C 80 4, 200 2, 296 9" pathLength={1} fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="ih-sub ih-rise ih-d2">{t("sub", { price })}</p>
            <div className="ih-ctas ih-rise ih-d3">
              <SignupButton className="ih-btn">
                {t("cta")}
                <span className="ih-arr">
                  <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="2.4" {...icon}>
                    <path d="M5 12h14" />
                    <path d="M13 6l6 6-6 6" />
                  </svg>
                </span>
              </SignupButton>
              <a className="ih-btn2" href={site.mobileHref}>
                <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" {...icon}>
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
                </svg>
                <span>{site.mobile}</span>
              </a>
            </div>

            <div className="ih-trust ih-rise ih-d4">
              <div className="ih-gcard">
                <div className="ih-gslot">
                  <GoogleG size={24} />
                </div>
                <div>
                  <div className="ih-grow">
                    <span className="ih-gnum ih-gro">
                      <CountUp value={GOOGLE_RATING} decimals={1} decimalSeparator={decimalSeparator} />
                    </span>
                    <Stars label={t("ratingAria")} />
                  </div>
                  <span className="ih-gsrc">
                    <b>Google</b> · {t("googleReviews")}
                  </span>
                </div>
              </div>
              <div className="ih-mini-stats">
                <div>
                  <b className="ih-gro">
                    <CountUp value={150} suffix="+" />
                  </b>
                  <span>{t("statGraduates")}</span>
                </div>
                <div className="ih-vsep" />
                <div>
                  <b className="ih-gro">
                    <CountUp value={20} />
                  </b>
                  <span>{t("statYears")}</span>
                </div>
              </div>
            </div>
          </div>

          <HeroVisual t={t} courseDate={courseDate} />
        </div>

        <div className="ih-band ih-rise ih-d5">
          <div className="ih-bandhead">
            <CourseCountdown
              startISO={nextCourse?.dateFrom ?? null}
              title={t("bandTitle")}
              noCourseLabel={t("noCourse")}
              ariaLabel={t("countdownLabel")}
              units={{ d: t("days"), h: t("hours"), m: t("minutes"), s: t("seconds") }}
            />
          </div>
          <JourneyRoad t={t} />
        </div>
      </div>
    </section>
  );
}

/** Päť sivých hviezdičiek a nad nimi zlaté, orezané na hodnotenie (šírka sa animuje v CSS). */
function Stars({ label }: { label: string }) {
  const row = (fill: string) =>
    Array.from({ length: STAR_COUNT }, (_, i) => (
      <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill={fill}>
        <path d={STAR_PATH} />
      </svg>
    ));
  return (
    <span className="ih-stars" role="img" aria-label={label}>
      <span>{row("#E3E6EB")}</span>
      <span className="ih-fg" style={{ width: `${(GOOGLE_RATING / STAR_COUNT) * 100}%` }}>
        {row("#FBBC04")}
      </span>
    </span>
  );
}

/** Pravý stĺpec: vodičák „Ty", nálepka 0 € a plávajúce čipy. */
function HeroVisual({ t, courseDate }: { t: T; courseDate: string | null }) {
  return (
    <div className="ih-right">
      <svg className="ih-bgroad" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <path d="M-60 600 C 140 500, 120 300, 300 250 S 560 140, 680 -40" fill="none" stroke="#F3F5F8" strokeWidth="96" strokeLinecap="round" />
        <path className="ih-lane" d="M-60 600 C 140 500, 120 300, 300 250 S 560 140, 680 -40" fill="none" stroke="#D3D9E2" strokeWidth="4" />
      </svg>
      <div className="ih-cardin">
        <div className="ih-cardwrap">
          <div className="ih-lic">
            <div className="ih-lic-top">
              <div>
                <b>{t("licenseTitle")}</b>
                <small>{t("licenseSub")}</small>
              </div>
              <span className="ih-b ih-gro">B</span>
            </div>
            <div className="ih-lic-mid">
              <div className="ih-photo">
                <svg viewBox="0 0 80 100" width="100%" aria-hidden>
                  <circle cx="40" cy="38" r="17" fill="#33466A" />
                  <path d="M8 100c0-20 14-34 32-34s32 14 32 34z" fill="#33466A" />
                </svg>
              </div>
              <div className="ih-fields">
                <div>
                  <small>{t("licenseNameLabel")}</small>
                  <span className="ih-name ih-gro">{t("licenseName")}</span>
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
        </div>
      </div>

      <div className="ih-sticker">
        <div className="ih-wob">
          <b className="ih-gro">0 €</b>
          <span>
            {t("stickerLine1")}
            <br />
            {t("stickerLine2")}
          </span>
        </div>
      </div>

      <div className="ih-chip ih-chipB">
        <span className="ih-chipico" style={{ background: "#EAEEFF", color: "#2F4FD0" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" {...icon}>
            <path d="M5 17h14v-5l-2-5H7l-2 5z" />
            <circle cx="8" cy="17" r="2" />
            <circle cx="16" cy="17" r="2" />
            <path d="M5 12h14" />
          </svg>
        </span>
        <div>
          <b>{t("chipCar")}</b>
          <small>{t("chipCarSub")}</small>
        </div>
      </div>
      <div className="ih-chip ih-chipA">
        <span className="ih-chipico" style={{ background: "#FFF4DE", color: "#B45309" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" {...icon}>
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M3 10h18" />
            <path d="M8 3v4" />
            <path d="M16 3v4" />
          </svg>
        </span>
        <div>
          <b>{courseDate ? t("chipCourse", { date: courseDate }) : t("chipNoCourse")}</b>
          <small>{courseDate ? t("chipCourseSub") : t("chipNoCourseSub")}</small>
        </div>
      </div>
    </div>
  );
}

const flagIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" strokeWidth="2.2" {...icon}>
    <path d="M5 21V4" />
    <path d="M5 4h12l-2 4 2 4H5" />
  </svg>
);

/** Cesta od prihlášky k vodičáku — semafor, stanice a idúce auto autoškoly. */
function JourneyRoad({ t }: { t: T }) {
  return (
    <div>
      <div className="ih-stations">
        <div className="ih-mini">
          <div className="ih-minih">
            <span className="ih-md ih-mr" />
            <span className="ih-md ih-ma" />
            <span className="ih-md ih-mg" />
          </div>
          <span className="ih-minip" />
        </div>
        {STEPS.map((s, i) => (
          <Station key={s.key} left={s.left}>
            <div className="ih-lay ih-off">
              <span className="ih-lbl">{t(s.key)}</span>
              <span className="ih-dot">{i + 1}</span>
            </div>
            <div className={`ih-lay ih-on ${s.on}`}>
              <span className="ih-lbl">{t(s.key)}</span>
              <span className="ih-dot">{i + 1}</span>
            </div>
          </Station>
        ))}
        <Station left="93%">
          <div className="ih-lay ih-off">
            <span className="ih-lbl">{t("step5")}</span>
            <span className="ih-dot">{flagIcon}</span>
          </div>
          <div className="ih-lay ih-on ih-on5">
            <span className="ih-pill">
              <svg width="16" height="16" viewBox="0 0 24 24" strokeWidth="3" {...icon}>
                <path d="M5 12l5 5L20 7" />
              </svg>
              {t("licensePill")}
            </span>
            <span className="ih-dot">{flagIcon}</span>
          </div>
        </Station>
      </div>
      <div className="ih-road">
        <div className="ih-trail" />
        <div className="ih-car">
          <DrivingSchoolCar label={t("carSign")} />
        </div>
      </div>
    </div>
  );
}

function Station({ left, children }: { left: CSSProperties["left"]; children: ReactNode }) {
  return (
    <div className="ih-st" style={{ left }}>
      <div className="ih-stk">{children}</div>
      <span className="ih-post" />
    </div>
  );
}

function Wheel({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 48)`}>
      <circle r="10" fill="#0B1422" />
      <circle r="6" fill="#C9D1DD" />
      <g className="ih-spin">
        <path d="M0 -4.5 L0 4.5 M-4.5 0 L4.5 0" stroke="#0B1422" strokeWidth="1.8" strokeLinecap="round" />
      </g>
    </g>
  );
}

function DrivingSchoolCar({ label }: { label: string }) {
  return (
    <svg className="ih-carbody" viewBox="0 0 140 62" width="100%" aria-hidden>
      <ellipse cx="70" cy="58" rx="60" ry="3.5" fill="rgba(0,0,0,0.35)" />
      <rect x="54" y="0" width="38" height="9" rx="2" fill="#22C55E" />
      <text x="73" y="6.6" textAnchor="middle" fontSize="5.6" fontWeight="800" fill="#0F1A2E">
        {label}
      </text>
      <rect x="69" y="9" width="8" height="3.5" fill="#C9D1DD" />
      <path d="M10 44 L10 34 Q12 27 24 26 L40 25 L54 14 Q58 12 63 12 L92 12 Q99 12 103 16 L114 26 L124 28 Q132 30 132 37 L132 44 Q132 48 128 48 L14 48 Q10 48 10 44 Z" fill="#F4F6FA" />
      <path d="M57 16 L77 16 L77 26 L45 26 Z" fill="#233552" />
      <path d="M81 16 L92 16 Q97 16 100 19 L107 26 L81 26 Z" fill="#233552" />
      <rect x="12" y="34" width="118" height="3" fill="#2B5FE3" />
      <path d="M79 27 L79 46" stroke="#C9D1DD" strokeWidth="1.2" />
      <rect x="125" y="31" width="6" height="4" rx="1" fill="#FFE9A8" />
      <rect x="10" y="31" width="4" height="5" rx="1" fill="#E5484D" />
      <Wheel x={34} />
      <Wheel x={108} />
    </svg>
  );
}
