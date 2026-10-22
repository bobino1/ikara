import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "../globals.css";
import { manrope, spaceGrotesk } from "../fonts";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MapBand } from "@/components/MapBand";
import { FloatingContact } from "@/components/FloatingContact";
import { TrafficLight } from "@/components/TrafficLight";
import { SignupProvider } from "@/components/SignupProvider";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { CookieConsentProvider } from "@/components/CookieConsent";
import { getComputedCourses } from "@/lib/courses";
import { routing } from "@/i18n/routing";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { DrivingSchoolJsonLd } from "@/components/StructuredData";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0E1A2B",
  colorScheme: "light",
};

// Obnov stránky každých 30 s, aby sa zmeny v CMS (kurzy) spoľahlivo prejavili.
export const revalidate = 30;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  // Predvolené hodnoty; každá stránka si nastaví vlastný titulok, popis, canonical a hreflang (lib/seo.ts).
  return {
    metadataBase: new URL(SITE_URL),
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
        { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
        { url: "/android-chrome-192x192.png", type: "image/png", sizes: "192x192" },
        { url: "/android-chrome-512x512.png", type: "image/png", sizes: "512x512" },
      ],
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    title: { default: t("homeTitle"), template: `%s · ${SITE_NAME}` },
    description: t("homeDescription"),
    applicationName: SITE_NAME,
    formatDetection: { telephone: true, email: true, address: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const courses = await getComputedCourses();
  const tSeo = await getTranslations({ locale, namespace: "seo" });

  return (
    <html lang={locale} className={`${manrope.variable} ${spaceGrotesk.variable}`}>
      <body>
        <DrivingSchoolJsonLd description={tSeo("homeDescription")} />
        {/* Google tag (gtag.js) — Google Ads AW-760765003 */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-760765003" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-760765003');`}
        </Script>
        <NextIntlClientProvider>
          <CookieConsentProvider>
            <SignupProvider courses={courses}>
              <MotionProvider>
                <div style={{ minHeight: "100vh", background: "#fff", display: "flex", flexDirection: "column" }}>
                  <Header />
                  <div style={{ flex: 1 }}>{children}</div>
                  <MapBand />
                  <Footer />
                </div>
                <FloatingContact />
                <TrafficLight />
              </MotionProvider>
            </SignupProvider>
          </CookieConsentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
