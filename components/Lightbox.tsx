"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export type Photo = { src: string; alt: string };

/** Celoobrazovkový prezerač fotky — klik na fotku ju priblíži, šípky prepínajú. */
function LightboxOverlay({
  images,
  index,
  onIndex,
  onClose,
}: {
  images: Photo[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const [zoom, setZoom] = useState(false);
  const n = images.length;
  const go = (d: number) => {
    setZoom(false);
    onIndex((index + d + n) % n);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, n]);

  const img = images[index];
  const navBtn: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: 48,
    height: 48,
    borderRadius: "50%",
    border: "none",
    background: "rgba(255,255,255,.12)",
    color: "#fff",
    fontSize: 22,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 400, background: "rgba(8,12,20,.94)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
    >
      <button onClick={onClose} aria-label="Zavrieť" style={{ position: "absolute", top: 16, right: 16, width: 44, height: 44, borderRadius: 12, border: "none", background: "rgba(255,255,255,.12)", color: "#fff", fontSize: 20, cursor: "pointer" }}>✕</button>

      {n > 1 && <button onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Predošlá" style={{ ...navBtn, left: 14 }}>‹</button>}
      {n > 1 && <button onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Ďalšia" style={{ ...navBtn, right: 14 }}>›</button>}

      <div
        onClick={(e) => { e.stopPropagation(); setZoom((z) => !z); }}
        style={{ maxWidth: "94vw", maxHeight: "88vh", overflow: zoom ? "auto" : "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img.src}
          alt={img.alt}
          style={zoom ? { width: "auto", maxWidth: "none", height: "auto", cursor: "zoom-out", borderRadius: 8 } : { maxWidth: "94vw", maxHeight: "88vh", objectFit: "contain", cursor: "zoom-in", borderRadius: 10 }}
        />
      </div>

      {n > 1 && (
        <span style={{ position: "absolute", bottom: 18, left: "50%", transform: "translateX(-50%)", font: "600 13px/1 var(--font-manrope),sans-serif", color: "#fff", background: "rgba(255,255,255,.12)", padding: "6px 12px", borderRadius: 100 }}>
          {index + 1} / {n}
        </span>
      )}
    </div>
  );
}

/** Mriežka fotiek — každá sa dá otvoriť a priblížiť. */
export function ImageGallery({ images, tiles }: { images: Photo[]; tiles?: { span2?: boolean; h: number }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14 }}>
        {images.map((im, i) => {
          const tile = tiles?.[i];
          return (
            <button
              key={im.src}
              onClick={() => setOpen(i)}
              style={{ position: "relative", height: tile?.h ?? 240, borderRadius: 18, overflow: "hidden", minWidth: 0, padding: 0, border: "none", cursor: "zoom-in", gridColumn: tile?.span2 ? "span 2" : undefined }}
            >
              <Image src={im.src} alt={im.alt} fill sizes="(max-width:900px) 100vw, 33vw" style={{ objectFit: "cover" }} />
            </button>
          );
        })}
      </div>
      {open !== null && <LightboxOverlay images={images} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </>
  );
}

/** Fotky jedného auta — celé (neorezané), na celú šírku; klik každú zväčší. */
export function CarPhotos({ images }: { images: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {images.map((im, i) => (
          <button
            key={im.src}
            onClick={() => setOpen(i)}
            aria-label="Zväčšiť fotku"
            style={{ display: "block", width: "100%", padding: 0, border: "none", background: "none", cursor: "zoom-in" }}
          >
            <Image src={im.src} alt={im.alt} width={1920} height={1280} sizes="(max-width:900px) 100vw, 50vw" style={{ width: "100%", height: "auto", display: "block" }} />
          </button>
        ))}
      </div>
      {open !== null && <LightboxOverlay images={images} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </>
  );
}

/** Jedna fotka v pevnom ráme (orezaná na výplň); klik ju zväčší naplno. */
export function ZoomTile({ src, alt, height = 320, radius = 18 }: { src: string; alt: string; height?: number | string; radius?: number }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Zväčšiť fotku"
        style={{ position: "relative", width: "100%", height, borderRadius: radius, overflow: "hidden", padding: 0, border: "none", cursor: "zoom-in", display: "block" }}
      >
        <Image src={src} alt={alt} fill sizes="(max-width:900px) 100vw, 50vw" style={{ objectFit: "cover" }} />
      </button>
      {open && <LightboxOverlay images={[{ src, alt }]} index={0} onIndex={() => {}} onClose={() => setOpen(false)} />}
    </>
  );
}
