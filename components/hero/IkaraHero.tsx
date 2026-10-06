import type { CSSProperties, ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { SignupButton } from "@/components/SignupButton";
import { site } from "@/lib/site";
import { CountUp } from "./CountUp";
import { CourseCountdown } from "./CourseCountdown";
import "./ikara-hero.css";

/** Cena „od" v texte, keď nie je k dispozícii žiadny nadchádzajúci kurz. */
const FALLBACK_PRICE = 1100;

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

export type HeroCourse = { dateFrom: string; price: number };

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
  const price = new Intl.NumberFormat(locale === "sk" ? "sk-SK" : "en-GB").format(nextCourse?.price ?? FALLBACK_PRICE);
  const decimalSeparator = locale === "sk" ? "," : ".";

  return (
    <section className="ih">
      <div className="ih-wrap">
        <div className="ih-top">
          <div className="ih-left">
            <div className="ih-eyebrow ih-rise">
              <span className="ih-ping" />
              <span>{t("eyebrow")}</span>
            </div>
            <h1 className="ih-h1 ih-disp">
              <span className="ih-ln ih-rise ih-d1">{t("title1")}</span>
              <span className="ih-ln ih-rise ih-d2">{t("title2")}</span>
              <span className="ih-ln ih-rise ih-d3">
                <span className="ih-hl">{t("title3")}</span>
              </span>
            </h1>
            <p className="ih-sub ih-rise ih-d4">{t("sub", { price })}</p>
            <div className="ih-ctas ih-rise ih-d5">
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
                <small>{t("phoneNote")}</small>
              </a>
            </div>
            <div className="ih-stats ih-rise ih-d6">
              <div className="ih-stat">
                <b className="ih-disp">
                  <CountUp value={150} suffix="+" />
                </b>
                <span>{t("statGraduates")}</span>
              </div>
              <div className="ih-stat">
                <b className="ih-disp">
                  <CountUp value={20} />
                </b>
                <span>{t("statYears")}</span>
              </div>
              <div className="ih-stat">
                <b className="ih-disp">
                  <span>
                    <CountUp value={4.4} decimals={1} decimalSeparator={decimalSeparator} />
                  </span>
                  <svg width="30" height="30" viewBox="0 0 24 24" style={{ fill: "var(--ih-acc)" }} aria-hidden>
                    <path d={STAR_PATH} stroke="#0E1A2B" strokeWidth="1" strokeLinejoin="round" />
                  </svg>
                </b>
                <span>{t("statRating")}</span>
              </div>
            </div>
          </div>

          <HeroVisual t={t} />
        </div>

        <div className="ih-band ih-rise ih-d7">
          <div className="ih-bandhead">
            <CourseCountdown
              startISO={nextCourse?.dateFrom ?? null}
              kicker={
                <span className="ih-kicker">
                  <i style={{ background: "#EF3B33" }} />
                  <i style={{ background: "#FFB020" }} />
                  <i style={{ background: "#22C55E", marginRight: 4 }} />
                  {t("bandKicker")}
                </span>
              }
              nextLabel={nextCourse ? t("nextCourse", { date: formatCourseDate(nextCourse.dateFrom, locale) }) : ""}
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

/** Pravý stĺpec: vodičák „TY", nálepka 0 € a plávajúce čipy. */
function HeroVisual({ t }: { t: T }) {
  return (
    <div className="ih-right">
      <svg className="ih-bgroad" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <path d="M-60 600 C 140 500, 120 300, 300 250 S 560 140, 680 -40" fill="none" stroke="#F0F3F7" strokeWidth="96" strokeLinecap="round" />
        <path className="ih-lane" d="M-60 600 C 140 500, 120 300, 300 250 S 560 140, 680 -40" fill="none" stroke="#C5CDD8" strokeWidth="4" />
      </svg>
      <div className="ih-cardin">
        <div className="ih-cardwrap">
          <div className="ih-lic">
            <div className="ih-lic-top">
              <div>
                <b>{t("licenseTitle")}</b>
                <small>{t("licenseSub")}</small>
              </div>
              <span className="ih-b ih-disp">B</span>
            </div>
            <div className="ih-lic-mid">
              <div className="ih-photo">
                <svg viewBox="0 0 80 100" width="100%" aria-hidden>
                  <circle cx="40" cy="38" r="17" fill="#34496B" />
                  <path d="M8 100c0-20 14-34 32-34s32 14 32 34z" fill="#34496B" />
                </svg>
              </div>
              <div className="ih-fields">
                <div>
                  <small>{t("licenseNameLabel")}</small>
                  <span className="ih-name ih-disp">{t("licenseName")}</span>
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
          <b className="ih-disp">0 €</b>
          <span>
            {t("stickerLine1")}
            <br />
            {t("stickerLine2")}
          </span>
        </div>
      </div>

      <div className="ih-chip ih-chipA">
        <svg width="22" height="22" viewBox="0 0 24 24" style={{ fill: "#F2A900" }} aria-hidden>
          <path d={STAR_PATH} />
        </svg>
        <div>
          <b>{t("chipRating")}</b>
          <small>{t("chipRatingSub")}</small>
        </div>
      </div>
      <div className="ih-chip ih-chipB">
        <span className="ih-chipico">
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
      <text x="73" y="6.6" textAnchor="middle" fontSize="5.6" fontWeight="800" fill="#0E1A2B">
        {label}
      </text>
      <rect x="69" y="9" width="8" height="3.5" fill="#C9D1DD" />
      <path d="M10 44 L10 34 Q12 27 24 26 L40 25 L54 14 Q58 12 63 12 L92 12 Q99 12 103 16 L114 26 L124 28 Q132 30 132 37 L132 44 Q132 48 128 48 L14 48 Q10 48 10 44 Z" fill="#F4F6FA" />
      <path d="M57 16 L77 16 L77 26 L45 26 Z" fill="#233552" />
      <path d="M81 16 L92 16 Q97 16 100 19 L107 26 L81 26 Z" fill="#233552" />
      <rect x="12" y="34" width="118" height="3" fill="#22C55E" />
      <path d="M79 27 L79 46" stroke="#C9D1DD" strokeWidth="1.2" />
      <rect x="125" y="31" width="6" height="4" rx="1" fill="#FFE9A8" />
      <rect x="10" y="31" width="4" height="5" rx="1" fill="#E5484D" />
      <Wheel x={34} />
      <Wheel x={108} />
    </svg>
  );
}
