import type { Metadata } from "next";

export const SITE_URL = "https://www.autoskola-ikara.sk";
export const SITE_NAME = "Autoškola IKARA";
const OG_IMAGE = { url: "/og.png", width: 1200, height: 630, alt: SITE_NAME };

/** Cesta stránky v danom jazyku (slovenčina je bez prefixu, angličtina pod /en). */
export function localizedPath(locale: string, path: string): string {
  if (locale === "en") return path === "/" ? "/en" : `/en${path}`;
  return path;
}

/** hreflang odkazy pre obe jazykové verzie + x-default (slovenčina). */
export function languageAlternates(path: string): Record<string, string> {
  return {
    sk: localizedPath("sk", path),
    en: localizedPath("en", path),
    "x-default": localizedPath("sk", path),
  };
}

/**
 * Kompletné metadáta stránky: titulok, popis, canonical, hreflang, Open Graph a Twitter karta.
 * `absoluteTitle` obíde šablónu „%s · Autoškola IKARA" (domovská stránka).
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  absoluteTitle = false,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
  absoluteTitle?: boolean;
}): Metadata {
  const url = localizedPath(locale, path);
  const ogTitle = absoluteTitle ? title : `${title} · ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: locale === "en" ? "en_US" : "sk_SK",
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title: ogTitle, description, images: [OG_IMAGE.url] },
  };
}
