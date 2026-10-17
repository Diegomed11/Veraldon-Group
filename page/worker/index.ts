// Worker del sitio. Sirve los archivos estáticos de `out/` y atiende un solo endpoint:
// POST /api/contacto, que envía el formulario por correo con Cloudflare Email Routing.
//
// El correo sale de una dirección del dominio (FROM) hacia el buzón verificado que recibe los
// mensajes (secreto CONTACT_TO). Con Email Routing, enviar a destinos verificados es gratis.
import { EmailMessage } from "cloudflare:email";
import { PAGE_HEADERS } from "./security.generated";

const FROM = "formulario@veraldon.com";
const FROM_NAME = "Formulario veraldon.com";

// Orígenes desde los que se acepta el formulario.
const ALLOWED_HOSTS = ["veraldon.com", "www.veraldon.com", "veraldon-group.diegomad473.workers.dev", "localhost", "127.0.0.1"];

const LIMITS = { name: 120, email: 254, company: 160, topic: 160, message: 5000 } as const;
const MAX_BODY_BYTES = 16 * 1024;
// Una persona tarda más que esto en llenar el formulario; un bot no.
const MIN_FILL_MS = 2500;

// Encabezados de las respuestas del endpoint: no es una página, así que no carga nada.
const API_HEADERS: Record<string, string> = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'",
  "Strict-Transport-Security": PAGE_HEADERS["Strict-Transport-Security"],
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
  "Cross-Origin-Resource-Policy": "same-origin",
};

type Fields = { name: string; email: string; company: string; topic: string; message: string };

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/contacto") {
      if (request.method !== "POST") return json({ ok: false, error: "Método no permitido." }, 405);
      return handleContact(request, env);
    }
    if (url.pathname.startsWith("/api/")) return json({ ok: false, error: "No encontrado." }, 404);
    // Rutas que no son archivos (por ejemplo la página 404): se sirven con los mismos encabezados.
    return withPageHeaders(await env.ASSETS.fetch(request));
  },
} satisfies ExportedHandler<Env>;

async function handleContact(request: Request, env: Env): Promise<Response> {
  // Los navegadores siempre mandan Origin al enviar el formulario; sin él, no viene del sitio.
  const origin = request.headers.get("Origin");
  let originHost = "";
  try {
    originHost = origin ? new URL(origin).hostname : "";
  } catch {}
  if (!ALLOWED_HOSTS.includes(originHost)) return json({ ok: false, error: "Origen no permitido." }, 403);

  if (!(request.headers.get("Content-Type") ?? "").includes("application/json")) {
    return json({ ok: false, error: "Formato no admitido." }, 415);
  }
  if (Number(request.headers.get("Content-Length") ?? 0) > MAX_BODY_BYTES) {
    return json({ ok: false, error: "El mensaje es demasiado largo." }, 413);
  }

  // Límite de envíos: por persona (su IP) y uno general que protege el buzón de un ataque repartido.
  const ip = request.headers.get("CF-Connecting-IP") ?? "local";
  const [perVisitor, overall] = await Promise.all([
    env.CONTACT_PER_VISITOR.limit({ key: `ip:${ip}` }),
    env.CONTACT_OVERALL.limit({ key: "contacto" }),
  ]);
  if (!perVisitor.success || !overall.success) {
    return json({ ok: false, error: "Recibimos varios mensajes seguidos. Espere un minuto e intente de nuevo." }, 429, {
      "Retry-After": "60",
    });
  }

  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) {
      return json({ ok: false, error: "El mensaje es demasiado largo." }, 413);
    }
    body = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "No pudimos leer el formulario." }, 400);
  }

  // Campo trampa y tiempo de llenado: las personas no ven el campo y tardan unos segundos;
  // los bots lo llenan al instante. A ellos se les responde como si todo saliera bien.
  const elapsed = typeof body.elapsed === "number" ? body.elapsed : 0;
  if ((typeof body.website === "string" && body.website.trim() !== "") || elapsed < MIN_FILL_MS) {
    return json({ ok: true });
  }

  const fields = {} as Fields;
  for (const key of Object.keys(LIMITS) as (keyof Fields)[]) {
    const value = typeof body[key] === "string" ? (body[key] as string).trim() : "";
    if (value.length > LIMITS[key]) return json({ ok: false, error: "Uno de los campos es demasiado largo." }, 400);
    fields[key] = value;
  }
  if (!fields.name || !fields.email) {
    return json({ ok: false, error: "Escriba su nombre y un correo para que podamos responderle." }, 400);
  }
  if (!/^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(fields.email)) {
    return json({ ok: false, error: "El correo no parece válido. Revise que tenga el formato nombre@empresa.com." }, 400);
  }
  if (!env.CONTACT_TO) {
    console.error("Falta el secreto CONTACT_TO: no hay a dónde enviar el formulario.");
    return json({ ok: false, error: "El formulario no está disponible en este momento." }, 503);
  }

  const subject = `Contacto web: ${fields.company || fields.name} (${fields.topic || "sin tema"})`;
  const text = [
    `Nombre: ${fields.name}`,
    `Empresa: ${fields.company || "No indicada"}`,
    `Correo: ${fields.email}`,
    `Interés: ${fields.topic || "No indicado"}`,
    "",
    fields.message || "(Sin mensaje)",
    "",
    "Responda a este correo para contestarle directamente.",
  ].join("\n");

  try {
    const raw = buildMessage({ to: env.CONTACT_TO, replyTo: fields.email, subject, text });
    await env.CONTACTO.send(new EmailMessage(FROM, env.CONTACT_TO, raw));
  } catch (err) {
    console.error("No se pudo enviar el formulario", err);
    return json({ ok: false, error: "No pudimos enviar su mensaje. Intente de nuevo en unos minutos." }, 502);
  }
  return json({ ok: true });
}

// Correo de texto plano en UTF-8 (RFC 5322), con asunto codificado y cuerpo en base64.
function buildMessage({ to, replyTo, subject, text }: { to: string; replyTo: string; subject: string; text: string }) {
  const headers = [
    `From: ${encodeWord(FROM_NAME)} <${FROM}>`,
    `To: <${to}>`,
    `Reply-To: <${replyTo}>`,
    `Subject: ${encodeWord(subject)}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@veraldon.com>`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
  ];
  const body = base64(text).replace(/.{1,76}/g, "$&\r\n");
  return `${headers.join("\r\n")}\r\n\r\n${body}`;
}

function encodeWord(value: string) {
  return `=?UTF-8?B?${base64(value)}?=`;
}

function base64(value: string) {
  let binary = "";
  for (const byte of new TextEncoder().encode(value)) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function json(data: unknown, status = 200, extra: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), { status, headers: { ...API_HEADERS, ...extra } });
}

function withPageHeaders(response: Response) {
  const res = new Response(response.body, response);
  for (const [name, value] of Object.entries(PAGE_HEADERS)) res.headers.set(name, value);
  return res;
}
