import { defineType, defineField } from "sanity";

/**
 * Kurz autoškoly. Klient ho upravuje cez Sanity Studio.
 * Obsadenosť sa na webe počíta automaticky z polí "Počet miest" a "Prihlásení".
 */
export const course = defineType({
  name: "course",
  title: "Kurz",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "Číslo / označenie kurzu",
      description: 'Napr. "4/2026". Zobrazí sa veľké na karte kurzu.',
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Skupina / popis",
      type: "string",
      initialValue: "Skupina B1, B",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "signupBy",
      title: "Prihlásiť sa do",
      description: "Posledný deň, kedy sa dá prihlásiť.",
      type: "date",
      options: { dateFormat: "DD.MM.YYYY" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "dateFrom",
      title: "Začiatok kurzu",
      type: "date",
      options: { dateFormat: "DD.MM.YYYY" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "dateTo",
      title: "Koniec kurzu",
      type: "date",
      options: { dateFormat: "DD.MM.YYYY" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "capacity",
      title: "Počet miest (kapacita)",
      type: "number",
      initialValue: 6,
      validation: (r) => r.required().min(1).integer(),
    }),
    defineField({
      name: "enrolled",
      title: "Prihlásení (počet žiakov)",
      description: "Koľko žiakov je už prihlásených. Z toho sa počíta obsadenosť.",
      type: "number",
      initialValue: 0,
      validation: (r) => r.required().min(0).integer(),
    }),
    defineField({
      name: "price",
      title: "Cena (€)",
      type: "number",
      initialValue: 1050,
      validation: (r) => r.required().min(0),
    }),
  ],
  orderings: [
    {
      title: "Podľa začiatku (najbližšie najprv)",
      name: "dateFromAsc",
      by: [{ field: "dateFrom", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "id", subtitle: "dateFrom", capacity: "capacity", enrolled: "enrolled" },
    prepare({ title, subtitle, capacity, enrolled }) {
      const free = Math.max(0, (capacity ?? 0) - (enrolled ?? 0));
      return {
        title: `Kurz ${title ?? "?"}`,
        subtitle: `Začiatok ${subtitle ?? "—"} · voľných ${free}/${capacity ?? 0}`,
      };
    },
  },
});
