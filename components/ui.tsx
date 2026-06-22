import type { CSSProperties, ReactNode } from "react";

export function Container({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <div style={{ maxWidth: 1200, margin: "0 auto", ...style }}>{children}</div>;
}

export function Eyebrow({ children, color = "var(--blue)" }: { children: ReactNode; color?: string }) {
  return (
    <span style={{ font: "600 13px/1 var(--font-manrope),sans-serif", letterSpacing: ".14em", textTransform: "uppercase", color }}>
      {children}
    </span>
  );
}

/**
 * Miesto pre fotku, ktorú zákazník doplní neskôr.
 * Zachováva rozmery a popis z pôvodných `<image-slot>` placeholderov.
 */
export function ImageSlot({
  label,
  height = 220,
  radius = 18,
  style,
}: {
  label: string;
  height?: number | string;
  radius?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        width: "100%",
        height,
        borderRadius: radius,
        background: "repeating-linear-gradient(45deg,#F1F3EF,#F1F3EF 12px,#EAEDE8 12px,#EAEDE8 24px)",
        border: "1.5px dashed #CFD4CC",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 20,
        ...style,
      }}
    >
      <span style={{ font: "500 14px/1.4 var(--font-manrope),sans-serif", color: "#9AA0A8", maxWidth: 280 }}>{label}</span>
    </div>
  );
}
