import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getCourses, computeCourse } from "@/lib/courses";
import { site } from "@/lib/site";

/** Kam majú chodiť notifikácie (default: e-mail autoškoly). */
const TO_EMAIL = process.env.CONTACT_EMAIL || site.email;
/** Odosielateľ. Bez vlastnej overenej domény funguje onboarding@resend.dev. */
const FROM_EMAIL = process.env.RESEND_FROM || "Autoškola IKARA <onboarding@resend.dev>";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Neplatné dáta" }, { status: 400 });
  }

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const phone = String(data.phone ?? "").trim();
  const message = String(data.message ?? "").trim();
  const courseId = data.courseId ? String(data.courseId) : "";
  const type = data.type === "kurz" ? "kurz" : "kontakt";

  if (!name || !/^\S+@\S+\.\S+$/.test(email) || phone.length < 6) {
    return NextResponse.json({ ok: false, error: "Chýbajúce alebo neplatné polia" }, { status: 422 });
  }

  // Doplň detaily kurzu (dátumy) podľa ID, ak ide o prihlášku.
  let courseLine = "";
  if (type === "kurz" && courseId) {
    try {
      const course = (await getCourses()).find((c) => c.id === courseId);
      if (course) {
        const cc = computeCourse(course);
        courseLine = `Kurz ${cc.id} — začiatok ${cc.start}, prihlásenie do ${cc.signup} (${cc.label})`;
      } else {
        courseLine = `Kurz ${courseId}`;
      }
    } catch {
      courseLine = `Kurz ${courseId}`;
    }
  }

  const subject = type === "kurz" ? `Nová prihláška na kurz ${courseId || ""}`.trim() : "Nová správa z webu";

  const rows: [string, string][] = [
    ["Meno", name],
    ["E-mail", email],
    ["Telefón", phone],
  ];
  if (courseLine) rows.push(["Kurz", courseLine]);
  if (message) rows.push(["Správa", message]);

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#0E1A2B">
      <h2 style="margin:0 0 4px">${type === "kurz" ? "Nová prihláška na kurz" : "Nová správa z webu"}</h2>
      <p style="color:#5C636B;margin:0 0 18px">Autoškola IKARA — ${new Date().toLocaleString("sk-SK")}</p>
      <table style="width:100%;border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:8px 12px;background:#F6F7F4;border:1px solid #ECEEE9;font-weight:600;width:120px;vertical-align:top">${k}</td><td style="padding:8px 12px;border:1px solid #ECEEE9">${esc(v)}</td></tr>`
          )
          .join("")}
      </table>
    </div>`;

  // Zaloguj vždy (záloha, keď e-mail nie je nastavený / zlyhá).
  console.log("[prihlaska]", { type, courseId, name, email, phone, message, at: new Date().toISOString() });

  if (resend) {
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        replyTo: email,
        subject,
        html,
      });
    } catch (err) {
      console.error("[prihlaska] odoslanie e-mailu zlyhalo:", err);
      // Nezhadzujeme požiadavku — záujem máme zalogovaný.
    }
  }

  return NextResponse.json({ ok: true });
}
