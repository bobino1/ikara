import type { MetadataRoute } from "next";
import { SITE_URL, languageAlternates, localizedPath } from "@/lib/seo";

const PATHS = ["/", "/o-nas", "/o-kurze", "/kondicne-jazdy", "/kurzy", "/kontakt", "/cookies"];

/** Každá stránka v oboch jazykoch, s hreflang odkazmi na jazykovú verziu. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const abs = (p: string) => `${SITE_URL}${p === "/" ? "" : p}`;
  return PATHS.flatMap((path) => {
    const languages = Object.fromEntries(Object.entries(languageAlternates(path)).map(([k, v]) => [k, abs(v)]));
    const isHome = path === "/";
    return (["sk", "en"] as const).map((locale) => ({
      url: abs(localizedPath(locale, path)),
      lastModified,
      changeFrequency: path === "/kurzy" || isHome ? ("daily" as const) : ("monthly" as const),
      priority: locale === "sk" ? (isHome ? 1 : 0.8) : isHome ? 0.7 : 0.5,
      alternates: { languages },
    }));
  });
}
