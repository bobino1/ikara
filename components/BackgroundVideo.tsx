import type { CSSProperties } from "react";

type BackgroundVideoProps = {
  /** Zdroje videa (poradie = priorita). Default: /videos/hero.(webm|mp4) */
  sources?: { src: string; type: string }[];
  /** Náhľadový obrázok, kým sa video načíta / na mobile s šetrením dát. */
  poster?: string;
  /** Prekryv nad videom kvôli čitateľnosti textu. */
  overlay?: string;
  style?: CSSProperties;
};

/**
 * Video na pozadí sekcie. Renderuje sa za obsahom (zIndex 0).
 * Ak video súbor zatiaľ neexistuje, ostane viditeľný tmavý gradient
 * nastavený na rodičovskej sekcii — stránka teda vyzerá dobre aj bez videa.
 */
export function BackgroundVideo({
  sources = [
    { src: "/videos/hero.mp4", type: "video/mp4" },
    { src: "/videos/hero.mov", type: "video/quicktime" },
  ],
  poster,
  overlay = "linear-gradient(180deg, rgba(8,16,28,.72) 0%, rgba(8,16,28,.62) 45%, rgba(8,16,28,.82) 100%)",
  style,
}: BackgroundVideoProps) {
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, ...style }}>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      >
        {sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>
      <div style={{ position: "absolute", inset: 0, background: overlay }} />
    </div>
  );
}
