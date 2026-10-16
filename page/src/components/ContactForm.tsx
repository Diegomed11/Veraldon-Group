"use client";

import { useState } from "react";
import { serviceLines, site, starts } from "@/content/site";

// Sin servidor de correo todavía: el formulario prepara un correo en el cliente de correo del visitante.
// Cuando haya un proveedor (Resend, Formspree, etc.), sustituir `handleSubmit` por una llamada a la API.
export function ContactForm() {
  const [error, setError] = useState<string | null>(null);
  const [opened, setOpened] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const topic = String(data.get("topic") ?? "");
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email) {
      setError("Escriba su nombre y un correo para que podamos responderle.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("El correo no parece válido. Revise que tenga el formato nombre@empresa.com.");
      return;
    }
    setError(null);

    const subject = `Conversación de 30 minutos para ${company || name}: ${topic}`;
    const body = `Nombre: ${name}\nEmpresa: ${company}\nCorreo: ${email}\nInterés: ${topic}\n\n${message}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  const label = "label text-[11px] text-paper-ink/70";
  const field =
    "mt-2 w-full border-0 border-b border-paper-rule bg-transparent px-0 py-2.5 text-base text-paper-ink normal-case tracking-normal font-[family-name:var(--font-archivo)] placeholder:text-paper-ink/40 focus:border-paper-ink focus:outline-none focus:ring-0 transition-colors";

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-7 sm:grid-cols-2">
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
          className="label h-11 rounded-full bg-paper-ink px-7 text-paper transition-opacity hover:opacity-85"
        >
          Enviar mensaje
        </button>
        <p aria-live="polite" className="text-sm text-paper-ink/70">
          {error ? (
            <span className="text-[#a3271b]">{error}</span>
          ) : opened ? (
            <>Abrimos su programa de correo con el mensaje listo. Si no se abrió, escríbanos a {site.email}.</>
          ) : (
            <>Respondemos el mismo día hábil.</>
          )}
        </p>
      </div>
    </form>
  );
}
