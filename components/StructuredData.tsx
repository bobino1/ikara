import type { ComputedCourse } from "@/lib/courses";
import { site } from "@/lib/site";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const SCHOOL_ID = `${SITE_URL}/#autoskola`;
const PHONE_INTL = "+421908723348";

const DAY_EN: Record<string, string> = {
  Pondelok: "Monday",
  Utorok: "Tuesday",
  Streda: "Wednesday",
  Štvrtok: "Thursday",
  Piatok: "Friday",
};

const address = {
  "@type": "PostalAddress",
  streetAddress: site.address.line1,
  postalCode: "851 01",
  addressLocality: "Bratislava",
  addressRegion: "Bratislavský kraj",
  addressCountry: "SK",
};

/** Vloží JSON-LD; „<" je escapované, aby text nemohol ukončiť <script>. */
function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

/** Autoškola ako miestna firma — pre Google (mapy, znalostný panel). Vkladá sa na každú stránku. */
export function DrivingSchoolJsonLd({ description }: { description: string }) {
  const openDays = site.hours.filter((h) => h.open);
  const hours = openDays.map((h) => {
    const [opens, closes] = h.value.split("–").map((s) => s.trim());
    return { "@type": "OpeningHoursSpecification", dayOfWeek: DAY_EN[h.day], opens, closes };
  });

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": ["DrivingSchool", "LocalBusiness"],
        "@id": SCHOOL_ID,
        name: SITE_NAME,
        description,
        url: SITE_URL,
        logo: `${SITE_URL}/ikara-logo.svg`,
        image: `${SITE_URL}/og.png`,
        telephone: PHONE_INTL,
        email: site.email,
        address,
        areaServed: { "@type": "City", name: "Bratislava" },
        priceRange: "€€",
        openingHoursSpecification: hours,
        employee: { "@type": "Person", name: "Jozef Danadai", jobTitle: "Inštruktor autoškoly" },
      }}
    />
  );
}

/** Kurz na vodičák s reálnymi termínmi a cenami z CMS (stránky Kurzy a O kurze). */
export function CourseJsonLd({ courses, name, description }: { courses: ComputedCourse[]; name: string; description: string }) {
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = courses.filter((c) => c.dateFrom >= today);
  const prices = upcoming.map((c) => c.price).filter((p) => p > 0);

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Course",
        name,
        description,
        inLanguage: "sk",
        provider: { "@id": SCHOOL_ID, "@type": "DrivingSchool", name: SITE_NAME, url: SITE_URL },
        ...(prices.length > 0 && {
          offers: {
            "@type": "Offer",
            category: "Paid",
            price: Math.min(...prices),
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}/kurzy`,
          },
        }),
        hasCourseInstance: upcoming.map((c) => ({
          "@type": "CourseInstance",
          name: `${name} ${c.id}`,
          courseMode: "Onsite",
          startDate: c.dateFrom,
          endDate: c.dateTo,
          location: { "@type": "Place", name: SITE_NAME, address },
          offers: { "@type": "Offer", price: c.price, priceCurrency: "EUR", availability: "https://schema.org/InStock" },
        })),
      }}
    />
  );
}
