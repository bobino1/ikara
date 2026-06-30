const EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5688.09914092108!2d17.11355547801573!3d48.11611507124103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c89a658ff6e03%3A0x7d0898bf6b9259c6!2sHrob%C3%A1kova%202497%2F34%2C%20851%2001%20Petr%C5%BEalka!5e1!3m2!1ssk!2ssk!4v1782125202770!5m2!1ssk!2ssk";

/** Google mapa — zobrazuje sa automaticky. */
export function MapEmbed({ title }: { title: string }) {
  return (
    <iframe
      title={title}
      src={EMBED_SRC}
      style={{ width: "100%", height: "clamp(260px,34vw,420px)", borderRadius: 22, display: "block", overflow: "hidden", border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
