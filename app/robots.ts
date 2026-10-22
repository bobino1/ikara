import type { MetadataRoute } from "next";
import { SITE_URL as BASE } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/api"],
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
