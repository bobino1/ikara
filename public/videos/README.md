# Video na pozadí hero sekcie

Sem nahraj svoje video pre úvodnú (hero) sekciu hlavnej stránky.

## Čo treba

Stačí jeden súbor, ideálne oba formáty pre maximálnu kompatibilitu:

- `hero.mp4` — povinné (funguje všade)
- `hero.webm` — voliteľné (menšie, modernejšie prehliadače ho uprednostnia)
- `hero-poster.jpg` — voliteľný náhľadový obrázok (prvý záber videa), zobrazí sa kým sa video načíta

Názvy súborov musia presne sedieť (alebo si uprav cesty v `components/BackgroundVideo.tsx`).

## Odporúčania pre web

- Rozlíšenie 1920×1080 (Full HD) stačí, vyššie zbytočne zväčší súbor
- Dĺžka 8–20 s, plynulá slučka (loop)
- **Bez zvuku** — video je `muted` (inak ho prehliadače neprehrajú automaticky)
- Cieľová veľkosť súboru ideálne do ~5–8 MB (skomprimuj, napr. cez HandBrake alebo `ffmpeg`)

### Príklad kompresie cez ffmpeg

```bash
# MP4 (H.264)
ffmpeg -i original.mov -vf "scale=1920:-2" -an -c:v libx264 -crf 26 -preset slow hero.mp4

# WEBM (VP9) – voliteľné
ffmpeg -i original.mov -vf "scale=1920:-2" -an -c:v libvpx-vp9 -crf 34 -b:v 0 hero.webm

# Poster (prvý snímok)
ffmpeg -i hero.mp4 -frames:v 1 hero-poster.jpg
```

Kým tu žiadne video nie je, hero sekcia zobrazuje pekné tmavé gradientové pozadie — stránka teda funguje aj bez videa.
