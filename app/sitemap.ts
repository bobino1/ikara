import type { MetadataRoute } from "next";

const BASE = "https://www.autoskola-ikara.sk";
const PATHS = ["", "/o-nas", "/o-kurze", "/kondicne-jazdy", "/kurzy", "/kontakt", "/cookies"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PATHS.flatMap((p) => [
    { url: `${BASE}${p}`, lastModified, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 },
    { url: `${BASE}/en${p}`, lastModified, changeFrequency: "weekly" as const, priority: p === "" ? 0.8 : 0.5 },
  ]);
}
