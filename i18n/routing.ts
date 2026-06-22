import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["sk", "en"],
  defaultLocale: "sk",
  // Vždy začni slovenčinou — žiadna automatická detekcia podľa prehliadača/cookie.
  // Návštevník si EN prepne ručne prepínačom.
  localeDetection: false,
});
