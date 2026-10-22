import { GoogleG } from "@/components/GoogleG";
import { reviews, stars, type Review } from "@/lib/reviews";

/**
 * Nekonečný pás recenzií (čisté CSS, bez JS). Zoznam je v DOM dvakrát, aby slučka nadväzovala;
 * druhá kópia je pre čítačky obrazovky skrytá. Pri prejdení myšou sa pás zastaví.
 */
export function ReviewsMarquee() {
  return (
    <div className="rv-marquee">
      <div className="rv-track">
        <ReviewList items={reviews} />
        <ReviewList items={reviews} hidden />
      </div>
    </div>
  );
}

function ReviewList({ items, hidden = false }: { items: Review[]; hidden?: boolean }) {
  return (
    <ul className="rv-list" aria-hidden={hidden || undefined}>
      {items.map((r) => (
        <li key={r.name} className="rv-card">
          <div className="rv-head">
            <span className="rv-stars">{stars(r.rating)}</span>
            <GoogleG />
          </div>
          <p>{r.text}</p>
          <div className="rv-who">
            <span className="rv-avatar">{r.name.charAt(0)}</span>
            <div>
              <b>{r.name}</b>
              <small>{r.when}</small>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
