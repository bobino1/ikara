import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "../globals.css";
import { manrope, spaceGrotesk } from "../fonts";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MapBand } from "@/components/MapBand";
import { SignupProvider } from "@/components/SignupProvider";
import { CookieConsentProvider } from "@/components/CookieConsent";
import { getComputedCourses } from "@/lib/courses";
import { routing } from "@/i18n/routing";

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
  const t = await getTranslations({ locale, namespace: "home" });
  const isEn = locale === "en";
  return {
    metadataBase: new URL("https://www.autoskola-ikara.sk"),
    title: {
      default: isEn
        ? "Autoškola IKARA — category B1, B driving school in Petržalka, Bratislava"
        : "Autoškola IKARA — vodičák B1, B v bratislavskej Petržalke",
      template: "%s · Autoškola IKARA",
    },
    description: t("heroText"),
    alternates: {
      languages: { sk: "/", en: "/en" },
    },
    openGraph: {
      title: "Autoškola IKARA",
      description: t("heroText"),
      url: isEn ? "/en" : "/",
      siteName: "Autoškola IKARA",
      locale: isEn ? "en_US" : "sk_SK",
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Autoškola IKARA" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Autoškola IKARA",
      description: t("heroText"),
      images: ["/og.png"],
    },
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

  return (
    <html lang={locale} className={`${manrope.variable} ${spaceGrotesk.variable}`}>
      <body>
        <NextIntlClientProvider>
          <CookieConsentProvider>
            <SignupProvider courses={courses}>
              <div style={{ minHeight: "100vh", background: "#fff", display: "flex", flexDirection: "column" }}>
                <Header />
                <div style={{ flex: 1 }}>{children}</div>
                <MapBand />
                <Footer />
              </div>
            </SignupProvider>
          </CookieConsentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
