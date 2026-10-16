import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { serviceLines } from "@/content/site";
import { LineVisual } from "@/components/home/LineVisual";
import { MaskLines, PillLink, Rise } from "@/components/motion/primitives";

// Las cuatro páginas se generan en el build.
export function generateStaticParams() {
  return serviceLines.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/servicios/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const line = serviceLines.find((s) => s.slug === slug);
  if (!line) return {};
  return { title: line.title, description: line.sub };
}

const wrap = "mx-auto max-w-[1440px] px-5 md:px-10";

export default async function ServicePage(props: PageProps<"/servicios/[slug]">) {
  const { slug } = await props.params;
  const line = serviceLines.find((s) => s.slug === slug);
  if (!line) notFound();
  const others = serviceLines.filter((s) => s.slug !== slug);

  return (
    <article>
      <header className="relative min-h-[88svh] overflow-hidden border-b border-rule pt-[72px]">
        <div className="absolute inset-y-0 right-0 hidden w-[55%] opacity-70 lg:block">
          <LineVisual slug={line.slug} />
        </div>
        <div className={`${wrap} relative flex min-h-[calc(88svh-72px)] flex-col justify-end pb-16`}>
          <Link href="/#servicios" className="label text-fog hover:text-platinum">
            Todas las líneas
          </Link>
          <MaskLines as="h1" lines={[line.title]} className="display mt-8 max-w-[18ch] text-[clamp(34px,5.6vw,84px)]" />
          <Rise delay={0.3}>
            <p className="mt-6 max-w-[54ch] text-lg text-mist">{line.sub}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {line.norms.map((n) => (
                <span key={n} className="label rounded-full border border-rule px-3 py-1 text-[11px] text-fog">
                  {n}
                </span>
              ))}
            </div>
          </Rise>
        </div>
      </header>

      <div className={`${wrap} grid gap-14 py-24 md:py-32 lg:grid-cols-[1.6fr_1fr]`}>
        <section>
          <p className="label text-fog">Qué incluye</p>
          <ul className="mt-6 border-t border-rule">
            {line.items.map((item, i) => (
              <Rise key={item} delay={i * 0.06}>
                <li className="border-b border-rule py-6 text-[clamp(18px,1.7vw,24px)] leading-snug">{item}</li>
              </Rise>
            ))}
          </ul>
        </section>
        <aside className="flex flex-col gap-10 lg:pt-12">
          <div className="rounded-[24px] bg-panel p-7">
            <p className="label text-fog">Entrega</p>
            <p className="mt-4 text-lg">{line.out}</p>
          </div>
          <div>
            <PillLink href="/#contacto">Hablemos 30 minutos de su operación</PillLink>
            <p className="mt-3 text-sm text-fog">Sin costo. Respondemos el mismo día hábil.</p>
          </div>
        </aside>
      </div>

      <nav aria-label="Otras líneas" className={`${wrap} pb-24 md:pb-32`}>
        <p className="label text-fog">Otras líneas</p>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {others.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/servicios/${s.slug}`}
                className="group flex h-full min-h-[200px] flex-col justify-between rounded-[24px] border border-rule bg-panel p-7 transition-colors duration-500 hover:border-fog"
              >
                <span className="label text-fog">{s.short}</span>
                <span className="display text-[22px] leading-tight transition-transform duration-500 group-hover:-translate-y-1">
                  {s.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  );
}
