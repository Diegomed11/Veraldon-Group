import { site } from "@/content/site";
import { ContactForm } from "@/components/ContactForm";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { Audiences, Differentiators, Faq, Norms, Offers, Principles, Process, Starts, Statement, Tools } from "@/components/home/Sections";
import { MaskLines, Rise } from "@/components/motion/primitives";

export default function Home() {
  return (
    <>
      <Hero />
      <Statement text={site.what} />
      <Services />
      <Starts />
      <Offers />
      <Audiences />
      <Norms />
      <Principles />
      <Differentiators />
      <Tools />
      <Process />
      <Faq />

      <section id="contacto" className="tone-dark py-24 md:py-36">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <p className="label text-muted">Contacto</p>
            <MaskLines stagger lines={["Cuéntenos qué proceso", "le quita más horas"]} className="display mt-6 text-[clamp(26px,3.6vw,54px)]" />
            <p className="mt-8 max-w-[42ch] text-lg text-soft">
              Escríbanos con el nombre de su empresa y el proceso que más tiempo le quita: recaptura entre sucursales, conciliaciones, reportes, un chatbot que nadie ha medido o un cuestionario que no sabe cómo responder. Respondemos el mismo día hábil y la primera conversación no tiene costo.
            </p>
            <dl className="mt-10 grid gap-4 border-t border-rule pt-6">
              {site.email && (
                <div>
                  <dt className="label text-[11px] text-muted">Correo</dt>
                  <dd className="mt-1 text-lg">
                    <a href={`mailto:${site.email}`} className="underline-offset-4 hover:underline">
                      {site.email}
                    </a>
                  </dd>
                </div>
              )}
              <div>
                <dt className="label text-[11px] text-muted">Ubicación</dt>
                <dd className="mt-1 text-lg">{site.city}</dd>
              </div>
            </dl>
          </div>
          <Rise>
            <ContactForm />
          </Rise>
        </div>
      </section>
    </>
  );
}
