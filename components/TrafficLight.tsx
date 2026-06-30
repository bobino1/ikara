/**
 * Dekoračný semafor vpravo dole — len na počítači (na mobile skrytý),
 * jemne sa pohupuje. Neprekáža klikaniu (pointer-events: none).
 */
export function TrafficLight() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/semafor.png" alt="" aria-hidden="true" className="traffic-light" />
  );
}
