# Sanity Studio — správa kurzov (pre klienta)

Toto je administrácia, v ktorej klient **klikací upravuje termíny kurzov** (pridať / zmeniť / zrušiť, nastaviť počet miest a prihlásených → obsadenosť sa na webe počíta sama).

Studio beží oddelene od webu (vlastný React 18), aby nekolidovalo s appkou. Dáta sú v Sanity cloude — netreba hostovať databázu.

---

## Jednorazové nastavenie (spraví vývojár)

1. **Vytvor Sanity projekt** (zadarmo):
   - Choď na https://www.sanity.io/manage → prihlás sa (Google/GitHub) → **Create new project**.
   - Názov napr. „Autoškola IKARA", dataset nechaj **production** (public).
   - Skopíruj **Project ID**.

2. **Nastav projekt v tomto priečinku:**
   ```bash
   cd studio
   cp .env.example .env          # do .env vlož svoj SANITY_STUDIO_PROJECT_ID
   npm install
   npx sanity login              # prihlásenie do Sanity
   ```

3. **Spusti Studio lokálne** a over, že funguje:
   ```bash
   npm run dev                   # http://localhost:3333
   ```
   Pridaj pár kurzov („Kurz" → New).

4. **Nasaď Studio na free hosting** (klient k nemu dostane URL):
   ```bash
   npm run deploy                # vyberie sa adresa typu nazov.sanity.studio
   ```
   Tú adresu pošli klientovi — tam sa bude prihlasovať a spravovať kurzy.

5. **Prepoj web s dátami** — v koreňovom priečinku projektu:
   ```bash
   cp .env.local.example .env.local   # vlož rovnaký NEXT_PUBLIC_SANITY_PROJECT_ID
   ```
   Na Verceli pridaj tie isté premenné v **Project → Settings → Environment Variables**
   (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`).

> Kým web nemá nastavené tieto premenné, kurzy berie z `data/courses.json`.
> Po nastavení ich automaticky ťahá zo Sanity a obnovuje každých ~60 s
> (po úprave v Studiu sa zmena na webe prejaví do minúty, bez redeployu).

---

## Práca klienta (po nastavení)

1. Otvor adresu Studia (`…​.sanity.studio`) a prihlás sa.
2. Vľavo **Kurz** → existujúci uprav, alebo **+** pridaj nový.
3. Vyplň: číslo kurzu, skupinu, prihlásiť do, začiatok/koniec, počet miest, prihlásení, cenu.
4. Klikni **Publish**. Hotovo — web sa aktualizuje sám.
