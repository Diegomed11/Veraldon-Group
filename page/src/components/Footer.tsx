import Link from "next/link";
import { Logo } from "@/components/Logo";
import { MaskLines } from "@/components/motion/primitives";
import { serviceLines, site } from "@/content/site";

const columns = [
  {
    title: "Servicios",
    links: serviceLines.map((s) => ({ href: `/servicios/${s.slug}`, label: s.title })),
  },
  {
    title: "Veraldon",
    links: [
      { href: "/#empezar", label: "Formas de empezar" },
      { href: "/#normas", label: "Normas y marcos" },
      { href: "/#como", label: "Cómo trabajamos" },
      { href: "/#preguntas", label: "Preguntas" },
    ],
  },
];

// Pie blanco: el lema completo en el titular grande y escalonado, como frase de cierre, junto a los enlaces.
export function Footer() {
  return (
    <footer className="border-t border-rule bg-ground">
      <div className="mx-auto max-w-[1440px] px-5 pt-20 pb-16 md:px-10 md:pt-28 md:pb-24">
        <MaskLines as="p" stagger lines={site.mottoLines} className="display text-[clamp(22px,5.8vw,92px)]" />
        <div className="mt-16 grid gap-10 border-t border-rule pt-10 sm:grid-cols-3 md:mt-24 lg:ml-auto lg:max-w-[62%]">
          {columns.map((c) => (
            <div key={c.title}>
              <p className="label text-muted">{c.title}</p>
              <ul className="mt-4 grid gap-2 text-sm">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-soft hover:text-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="label text-muted">Contacto</p>
            {site.email ? (
              <a href={`mailto:${site.email}`} className="mt-4 block text-sm text-soft hover:text-ink">
                {site.email}
              </a>
            ) : (
              <Link href="/#contacto" className="mt-4 block text-sm text-soft hover:text-ink">
                Formulario de contacto
              </Link>
            )}
            <p className="mt-2 text-sm text-muted">{site.city}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-rule">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-x-10 gap-y-4 px-5 py-8 text-xs text-muted md:px-10">
          <Logo className="h-4 w-auto" />
          <span>
            © {site.year} {site.legalName}
          </span>
          <span className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacidad" className="hover:text-ink">
              Aviso de privacidad
            </Link>
            <Link href="/terminos" className="hover:text-ink">
              Términos de uso
            </Link>
            <span>No emitimos certificados ni realizamos auditorías.</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
