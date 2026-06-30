import { site } from "@/lib/site";

/**
 * Plávajúce tlačidlá na pravom boku: zavolať (hore) a napísať e-mail (pod ním).
 * Po najetí myšou sa vysunie štítok s číslom / e-mailom. Na mobile sú menšie.
 */
export function FloatingContact() {
  return (
    <div className="floating-contact" aria-label="Rýchly kontakt">
      <a href={site.mobileHref} className="fc-btn fc-btn--call" aria-label={`Zavolať ${site.mobile}`}>
        <span className="fc-label">{site.mobile}</span>
        <span className="fc-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0E1A2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
          </svg>
        </span>
      </a>
      <a href={`mailto:${site.email}`} className="fc-btn fc-btn--mail" aria-label={`Napísať e-mail na ${site.email}`}>
        <span className="fc-label">{site.email}</span>
        <span className="fc-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="4" width="20" height="16" rx="2.5" />
            <path d="m3 6.5 9 6 9-6" />
          </svg>
        </span>
      </a>
    </div>
  );
}
