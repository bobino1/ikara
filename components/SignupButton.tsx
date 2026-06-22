"use client";

import type { CSSProperties, ReactNode } from "react";
import { useSignup } from "./SignupProvider";

/** Tlačidlo, ktoré otvorí globálny modal s prihláškou (voliteľne predvyplní kurz). */
export function SignupButton({
  children,
  courseId,
  className = "btn btn--primary",
  style,
}: {
  children: ReactNode;
  courseId?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const { open } = useSignup();
  return (
    <button className={className} style={style} onClick={() => open(courseId)}>
      {children}
    </button>
  );
}
