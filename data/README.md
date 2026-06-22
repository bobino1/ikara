# Kurzy — `courses.json` (záložné dáta)

> **Hlavná správa kurzov je cez Sanity Studio** (klikací editor pre klienta) —
> postup nájdeš v `studio/README.md`. Keď je Sanity zapojené (premenná
> `NEXT_PUBLIC_SANITY_PROJECT_ID`), web ťahá kurzy odtiaľ a tento súbor sa
> nepoužíva.
>
> Tento `courses.json` slúži ako **záloha / počiatočné dáta** — web ich zobrazí,
> kým Sanity nie je nastavené (napr. pri lokálnom vývoji). Štruktúra polí je
> rovnaká ako v CMS, takže sa dá použiť aj na prvotné naplnenie.

## Ako pridať kurz

Skopírujte jeden blok `{ … }` a upravte hodnoty. Bloky sú oddelené čiarkou.

```json
{
  "id": "7/2026",
  "category": "Skupina B1, B",
  "signupBy": "2026-08-01",
  "dateFrom": "2026-08-05",
  "dateTo": "2026-09-15",
  "capacity": 8,
  "enrolled": 0,
  "price": 1050
}
```

## Čo ktoré pole znamená

| Pole         | Význam                                              | Formát                |
| ------------ | --------------------------------------------------- | --------------------- |
| `id`         | Číslo / označenie kurzu (zobrazí sa veľké na karte) | text, napr. `"7/2026"`|
| `category`   | Skupina / popis                                     | text                  |
| `signupBy`   | Prihlásiť sa je možné **do** tohto dátumu           | `RRRR-MM-DD`          |
| `dateFrom`   | Dátum **začiatku** kurzu                            | `RRRR-MM-DD`          |
| `dateTo`     | Dátum **konca** kurzu                               | `RRRR-MM-DD`          |
| `capacity`   | **Počet miest** v kurze (max. žiakov)               | číslo                 |
| `enrolled`   | Koľko žiakov je **už prihlásených**                 | číslo                 |
| `price`      | Cena kurzu v € (bez symbolu)                        | číslo                 |

> Dátumy píšte vždy ako **RRRR-MM-DD** (rok-mesiac-deň), napr. `2026-09-15`.
> Na stránke sa zobrazia pekne ako `15.09.2026`.

## Obsadenosť sa počíta sama

Z `capacity` a `enrolled` sa automaticky vypočíta a farebne zobrazí stav:

- **Zelená „voľné miesta"** — voľných je viac ako 2
- **Oranžová „takmer plný"** — voľné sú už len 1–2 miesta
- **Červená „obsadený"** — `enrolled` = `capacity` (tlačidlo prihlásenia sa vypne)

Príklad: `capacity: 8`, `enrolled: 6` → zobrazí sa „2 posledné miesta" (oranžová) a pruh ukáže 6/8 obsadené.

## Pozor

- Nezabudnite za každým blokom `{ … }` **čiarku**, okrem posledného.
- Nemeňte názvy polí (`id`, `capacity`, …), len ich hodnoty.
- Po uložení súboru treba zmeny **nasadiť (deploy)**, aby sa prejavili na živom webe.
