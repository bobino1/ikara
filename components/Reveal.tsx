"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  style?: CSSProperties;
  className?: string;
};

/**
 * Odhalí obsah pri scrollovaní do viewportu — port `data-reveal` správania
 * z pôvodnej stránky. Pri prefers-reduced-motion sa obsah zobrazí okamžite (CSS).
 */
export function Reveal({ children, as, style, className = "" }: RevealProps) {
  const Tag = (as ?? "section") as ElementType;
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => el.classList.add("is-visible");

    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    // Ak je už vo viewporte pri načítaní, zobraz hneď.
    const vh = window.innerHeight || 800;
    if (el.getBoundingClientRect().top < vh * 0.95) {
      show();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            show();
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()} style={style}>
      {children}
    </Tag>
  );
}
