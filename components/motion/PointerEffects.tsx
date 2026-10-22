"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";
import { m, useMotionTemplate, useMotionValue, useSpring } from "motion/react";

const SPRING = { stiffness: 220, damping: 20, mass: 0.5 };
const MAGNET_STRENGTH = 0.22;
const MAX_TILT_DEG = 7;

/** Efekty len pre myš — na dotykových zariadeniach nič nerobia. */
const isMouse = (e: PointerEvent) => e.pointerType === "mouse";

/** Prvok sa jemne „prilepí" ku kurzoru (CTA tlačidlá). */
export function Magnetic({ children }: { children: ReactNode }) {
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isMouse(e)) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * MAGNET_STRENGTH);
    y.set((e.clientY - (r.top + r.height / 2)) * MAGNET_STRENGTH);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.div style={{ x, y, display: "inline-flex" }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </m.div>
  );
}

/** Karta sa nakláňa podľa polohy kurzora (3D náklon s perspektívou). */
export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const rotateX = useSpring(0, SPRING);
  const rotateY = useSpring(0, SPRING);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isMouse(e)) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rotateY.set(px * MAX_TILT_DEG * 2);
    rotateX.set(-py * MAX_TILT_DEG * 2);
  };
  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div className={className} style={{ perspective: 1000 }} onPointerMove={onMove} onPointerLeave={reset}>
      <m.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>{children}</m.div>
    </div>
  );
}

/**
 * Mäkké brandové svetlo, ktoré pomaly sleduje kurzor v rámci rodičovskej sekcie.
 * Rodič musí mať position: relative; svetlo neprekáža klikaniu.
 */
export function Spotlight({ color = "rgba(43,95,227,.16)", size = 560 }: { color?: string; size?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const background = useMotionTemplate`radial-gradient(${size}px circle at ${sx}px ${sy}px, ${color}, transparent 70%)`;

  useEffect(() => {
    const host = ref.current?.parentElement;
    if (!host) return;
    const place = (x: number, y: number) => {
      mx.set(x);
      my.set(y);
    };
    const r0 = host.getBoundingClientRect();
    place(r0.width * 0.72, r0.height * 0.35);
    const onMove = (e: globalThis.PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = host.getBoundingClientRect();
      place(e.clientX - r.left, e.clientY - r.top);
    };
    host.addEventListener("pointermove", onMove);
    return () => host.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return <m.div ref={ref} aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, background }} />;
}
