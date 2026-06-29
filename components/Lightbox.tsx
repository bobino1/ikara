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

export type Car = { name: string; note: string; desc: string; images: Photo[] };

/** Karty áut — každá s galériou fotiek (klik otvorí prezerač s priblížením). */
export function CarGallery({ cars, morePhotos }: { cars: Car[]; morePhotos: string }) {
  const [lb, setLb] = useState<{ images: Photo[]; index: number } | null>(null);
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 18 }}>
        {cars.map((car) => (
          <div key={car.name} style={{ background: "#fff", border: "1px solid #ECEEE9", borderRadius: 20, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <button
              onClick={() => setLb({ images: car.images, index: 0 })}
              style={{ position: "relative", width: "100%", height: "clamp(200px,26vw,270px)", padding: 0, border: "none", cursor: "zoom-in", display: "block" }}
            >
              <Image src={car.images[0].src} alt={car.images[0].alt} fill sizes="(max-width:900px) 100vw, 50vw" style={{ objectFit: "cover" }} />
              <span style={{ position: "absolute", bottom: 12, right: 12, display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 11px", borderRadius: 100, background: "rgba(8,12,20,.62)", color: "#fff", font: "600 12px/1 var(--font-manrope),sans-serif", backdropFilter: "blur(4px)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="6" width="18" height="14" rx="2" /><circle cx="12" cy="13" r="3.2" /><path d="M8 6l1.5-2h5L16 6" /></svg>
                {car.images.length} {morePhotos}
              </span>
            </button>
            <div style={{ padding: 24 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                <h3 style={{ font: "700 21px/1.2 var(--font-space),sans-serif", margin: 0 }}>{car.name}</h3>
                <span style={{ font: "600 13px/1.3 var(--font-manrope),sans-serif", color: "var(--blue)" }}>{car.note}</span>
              </div>
              <p style={{ font: "400 15px/1.6 var(--font-manrope),sans-serif", color: "var(--muted)", margin: "10px 0 0" }}>{car.desc}</p>
            </div>
          </div>
        ))}
      </div>
      {lb && <LightboxOverlay images={lb.images} index={lb.index} onIndex={(i) => setLb((s) => (s ? { ...s, index: i } : s))} onClose={() => setLb(null)} />}
    </>
  );
}
