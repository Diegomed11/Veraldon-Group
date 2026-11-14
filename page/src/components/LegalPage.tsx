import Link from "next/link";
import type { LegalSection } from "@/content/legal";
import { legalUpdated } from "@/content/legal";
import { MaskLines } from "@/components/motion/primitives";

const wrap = "mx-auto max-w-[1440px] px-5 md:px-10";

// Página de texto legal: titular grande como el resto del sitio y una columna de lectura cómoda.
export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: LegalSection[] }) {
  return (
    <article>
      <header className="border-b border-rule pt-[72px]">
        <div className={`${wrap} pt-20 pb-14 md:pt-28`}>
          <Link href="/" className="label text-muted hover:text-ink">
            Inicio
          </Link>
          <MaskLines as="h1" lines={[title]} className="display mt-8 max-w-[15em] text-[clamp(30px,4.8vw,68px)]" />
          <p className="mt-6 max-w-[60ch] text-lg text-soft">{intro}</p>
          <p className="label mt-8 text-muted">Última actualización: {legalUpdated}</p>
        </div>
      </header>

      <div className={`${wrap} grid gap-12 py-20 md:py-28 lg:grid-cols-[1fr_2fr]`}>
        <nav aria-label="Contenido" className="hidden lg:block">
          <ul className="sticky top-28 grid gap-2.5 text-sm text-muted">
            {sections.map((s, i) => (
              <li key={s.title}>
                <a href={`#s${i + 1}`} className="hover:text-ink">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="max-w-[68ch]">
          {sections.map((s, i) => (
            <section key={s.title} id={`s${i + 1}`} className="scroll-mt-28 border-t border-rule py-10 first:border-t-0 first:pt-0">
              <h2 className="title text-[clamp(20px,2vw,28px)]">{s.title}</h2>
              {s.paragraphs?.map((p) => (
                <p key={p} className="mt-4 leading-relaxed text-soft">
                  {p}
                </p>
              ))}
              {s.items && (
                <ul className="mt-4 grid gap-2 text-soft">
                  {s.items.map((item) => (
                    <li key={item} className="relative pl-5 leading-relaxed before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-2.5 before:bg-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
