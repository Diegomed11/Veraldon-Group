"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { serviceLines, site, starts } from "@/content/site";
import { privacySummary } from "@/content/legal";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string };

// El formulario se envía al Worker del sitio (POST /api/contacto), que lo reenvía por correo al equipo.
export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  // Momento en que el formulario quedó listo; el servidor descarta envíos hechos en menos de unos segundos.
  const shownAt = useRef(0);
  useEffect(() => {
    shownAt.current = Date.now();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      topic: String(data.get("topic") ?? ""),
      message: String(data.get("message") ?? "").trim(),
      website: String(data.get("website") ?? ""),
      elapsed: Date.now() - shownAt.current,
    };

    if (!payload.name || !payload.email) {
      setStatus({ kind: "error", message: "Escriba su nombre y un correo para que podamos responderle." });
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(payload.email)) {
      setStatus({ kind: "error", message: "El correo no parece válido. Revise que tenga el formato nombre@empresa.com." });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !result?.ok) throw new Error(result?.error ?? "");
      form.reset();
      shownAt.current = Date.now();
      setStatus({ kind: "sent" });
    } catch (err) {
      const detail = err instanceof Error && err.message ? err.message : "No pudimos enviar su mensaje.";
      setStatus({ kind: "error", message: `${detail} También puede escribirnos a ${site.email}.` });
    }
  }

  const label = "label text-[11px] text-paper-ink/70";
  const field =
    "mt-2 w-full border-0 border-b border-paper-rule bg-transparent px-0 py-2.5 text-base text-paper-ink normal-case tracking-normal font-[family-name:var(--font-archivo)] placeholder:text-paper-ink/40 focus:border-paper-ink focus:outline-none focus:ring-0 transition-colors";

  return (
    <form onSubmit={handleSubmit} noValidate className="relative grid gap-7 sm:grid-cols-2">
      {/* Campo trampa para bots: oculto a las personas y a los lectores de pantalla. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          No llene este campo
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className={label}>
        Nombre
        <input name="name" autoComplete="name" className={field} />
      </label>
      <label className={label}>
        Correo de trabajo
        <input name="email" type="email" autoComplete="email" className={field} />
      </label>
      <label className={label}>
        Empresa
        <input name="company" autoComplete="organization" className={field} />
      </label>
      <label className={label}>
        Qué le interesa
        <select name="topic" className={field} defaultValue={serviceLines[0].title}>
          {serviceLines.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
          {starts.map((s) => (
            <option key={s.title} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="Aún no lo sé">Aún no lo sé</option>
        </select>
      </label>
      <label className={`${label} sm:col-span-2`}>
        Qué necesita
        <textarea
          name="message"
          rows={3}
          placeholder="Ej. Recapturamos pedidos de cinco sucursales a mano, o un banco nos mandó un cuestionario de seguridad"
          className={field}
        />
      </label>

      <div className="flex flex-wrap items-center gap-5 sm:col-span-2">
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className="label h-11 rounded-full bg-paper-ink px-7 text-paper transition-opacity hover:opacity-85 disabled:cursor-wait disabled:opacity-60"
        >
          {status.kind === "sending" ? "Enviando…" : "Enviar mensaje"}
        </button>
        <p role="status" aria-live="polite" className="text-sm text-paper-ink/70">
          {status.kind === "error" ? (
            <span className="text-[#a3271b]">{status.message}</span>
          ) : status.kind === "sent" ? (
            <>Recibimos su mensaje. Le respondemos el mismo día hábil.</>
          ) : (
            <>Respondemos el mismo día hábil.</>
          )}
        </p>
      </div>
      <p className="text-xs leading-relaxed text-paper-ink/60 sm:col-span-2">
        {privacySummary} Consulte el{" "}
        <Link href="/privacidad" className="underline underline-offset-2 hover:text-paper-ink">
          aviso de privacidad
        </Link>
        .
      </p>
    </form>
  );
}
