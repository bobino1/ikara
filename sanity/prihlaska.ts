import { defineType, defineField } from "sanity";

/** Prihláška žiaka na kurz — automaticky sa vytvorí pri záväznej prihláške z webu. */
export const prihlaska = defineType({
  name: "prihlaska",
  title: "Prihláška",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Meno a priezvisko", type: "string" }),
    defineField({ name: "email", title: "E-mail", type: "string" }),
    defineField({ name: "phone", title: "Telefón", type: "string" }),
    defineField({ name: "courseId", title: "Kurz (číslo)", type: "string" }),
    defineField({ name: "courseLabel", title: "Kurz (popis)", type: "string" }),
    defineField({ name: "course", title: "Kurz (prepojenie)", type: "reference", to: [{ type: "course" }] }),
    defineField({ name: "createdAt", title: "Dátum prihlásenia", type: "datetime" }),
    defineField({
      name: "status",
      title: "Stav",
      type: "string",
      options: { list: ["nová", "kontaktovaný", "zapísaný", "zrušená"], layout: "radio" },
      initialValue: "nová",
    }),
    defineField({ name: "note", title: "Poznámka", type: "text", rows: 2 }),
  ],
  orderings: [{ title: "Najnovšie", name: "createdDesc", by: [{ field: "createdAt", direction: "desc" }] }],
  preview: {
    select: { title: "name", courseId: "courseId", createdAt: "createdAt", status: "status" },
    prepare({ title, courseId, createdAt, status }) {
      const d = createdAt ? new Date(createdAt).toLocaleDateString("sk-SK") : "";
      return { title: title || "(bez mena)", subtitle: `Kurz ${courseId ?? "—"} · ${d}${status ? " · " + status : ""}` };
    },
  },
});
