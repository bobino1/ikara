"use client";

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

/**
 * Jeden spoločný Motion kontext pre celý web:
 * - LazyMotion + domAnimation = najmenší balík (komponenty používajú `m.*`, nie `motion.*`),
 * - reducedMotion="user" = kto má v systéme vypnuté animácie, dostane statický web.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
