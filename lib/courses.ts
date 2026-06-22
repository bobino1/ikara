import "server-only";
import coursesData from "@/data/courses.json";
import { sanityClient } from "./sanity";

/**
 * Vstupný tvar kurzu tak, ako ho zadáva klient v `data/courses.json`.
 * Dátumy sú v ISO formáte RRRR-MM-DD.
 */
export type Course = {
  /** Číslo / označenie kurzu, napr. "4/2026" */
  id: string;
  /** Skupina / popis, napr. "Skupina B1, B" */
  category: string;
  /** Prihlásiť sa je možné do tohto dátumu (ISO) */
  signupBy: string;
  /** Začiatok kurzu (ISO) */
  dateFrom: string;
  /** Koniec kurzu (ISO) */
  dateTo: string;
  /** Počet miest v kurze */
  capacity: number;
  /** Počet už prihlásených žiakov */
  enrolled: number;
  /** Cena kompletného kurzu v € */
  price: number;
};

export type ComputedCourse = Course & {
  cat: string;
  /** Naformátované dátumy (DD.MM.RRRR) */
  signup: string;
  start: string;
  end: string;
  /** Rozsah "DD.MM.RRRR – DD.MM.RRRR" */
  term: string;
  /** Počet obsadených a voľných miest */
  taken: number;
  free: number;
  /** Cena ako reťazec pre zobrazenie */
  priceLabel: string;
  color: string;
  label: string;
  tag: string;
  segs: { bg: string }[];
  full: boolean;
};

const courses = coursesData as Course[];

/** ISO dátum (RRRR-MM-DD) → DD.MM.RRRR. */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}.${m}.${y}`;
}

/** Odvodí stav obsadenosti, farby a segmenty kapacitného pruhu pre kurz. */
export function computeCourse(c: Course): ComputedCourse {
  const cap = Math.max(0, c.capacity);
  const taken = Math.min(Math.max(0, c.enrolled), cap);
  const free = cap - taken;

  let color: string;
  let label: string;
  let tag: string;

  if (free <= 0) {
    color = "#E5484D";
    label = "Obsadený";
    tag = "Plný";
  } else if (free <= 2) {
    color = "#F5A623";
    label = free === 1 ? "Posledné voľné miesto" : `${free} posledné miesta`;
    tag = "Takmer plný";
  } else {
    color = "#15B66B";
    label = `${free} voľných miest`;
    tag = "Voľné";
  }

  const segs: { bg: string }[] = [];
  for (let i = 0; i < cap; i++) {
    segs.push({ bg: i < taken ? "#E4E6E1" : color });
  }

  const start = formatDate(c.dateFrom);
  const end = formatDate(c.dateTo);

  return {
    ...c,
    cat: c.category,
    signup: formatDate(c.signupBy),
    start,
    end,
    term: `${start} – ${end}`,
    taken,
    free,
    priceLabel: String(c.price),
    color,
    label,
    tag,
    segs,
    full: free <= 0,
  };
}

/** GROQ dotaz na kurzy zo Sanity, namapovaný presne na typ Course. */
const COURSES_QUERY = `*[_type == "course"] | order(dateFrom asc){
  "id": id,
  "category": category,
  "signupBy": signupBy,
  "dateFrom": dateFrom,
  "dateTo": dateTo,
  "capacity": capacity,
  "enrolled": enrolled,
  "price": price
}`;

/**
 * Načíta kurzy zo Sanity (ak je zapojené), inak z lokálneho data/courses.json.
 * Dáta sa obnovujú každých 60 s, takže zmeny v CMS sa prejavia bez redeployu.
 */
export async function getCourses(): Promise<Course[]> {
  if (sanityClient) {
    try {
      const data = await sanityClient.fetch<Course[]>(COURSES_QUERY, {}, { next: { revalidate: 60 } });
      if (Array.isArray(data) && data.length > 0) return data;
    } catch (err) {
      console.error("[courses] Sanity fetch zlyhal, použijem lokálne dáta:", err);
    }
  }
  return courses;
}

export async function getComputedCourses(): Promise<ComputedCourse[]> {
  return (await getCourses()).map(computeCourse);
}

/** Najbližší kurz s voľným miestom (fallback na prvý). */
export async function getHotCourse(): Promise<ComputedCourse> {
  const all = await getComputedCourses();
  return all.find((c) => c.free > 0) ?? all[0];
}
