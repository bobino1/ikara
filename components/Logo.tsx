/** Logo Autoškoly IKARA ako inline SVG. `dark` = svetlý variant pre tmavé pozadie. */
export function Logo({ height = 56, dark = false }: { height?: number; dark?: boolean }) {
  const box = dark ? "#ffffff" : "#10243f";
  const sub = dark ? "#A6B4C8" : "#7e93ab";
  const word = dark ? "#ffffff" : "#10243f";

  return (
    <svg
      viewBox="0 0 300 120"
      height={height}
      width={height * 2.5}
      role="img"
      aria-label="Autoškola IKARA"
      style={{ display: "block" }}
    >
      <rect fill={box} height="96" rx="16" width="48" x="14" y="12" />
      <circle cx="38" cy="36" fill="#e8462f" r="12" />
      <circle cx="38" cy="60" fill="#ffc400" r="12" />
      <circle cx="38" cy="84" fill="#3ed17e" r="12" />
      <text fill={sub} fontFamily="var(--font-space), Arial, sans-serif" fontSize="11" fontWeight="500" letterSpacing="3.6" x="82" y="52">
        AUTOŠKOLA
      </text>
      <text fill={word} fontFamily="var(--font-space), Arial, sans-serif" fontSize="42" fontWeight="800" letterSpacing="2" x="80" y="92">
        IKARA
      </text>
    </svg>
  );
}
