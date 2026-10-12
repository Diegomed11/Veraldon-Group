import { site } from "@/content/site";
import { ContactForm } from "@/components/ContactForm";
import { Hero } from "@/components/home/Hero";
import { ServiceStack } from "@/components/home/ServiceStack";
import { Audiences, Differentiators, Faq, Norms, Offers, Principles, Process, Starts, Statement, Tools } from "@/components/home/Sections";
import { MaskLines, Rise } from "@/components/motion/primitives";

export default function Home() {
  return (
    <>
      <Hero />
      <Statement text={site.what} />
      <ServiceStack />
      <Starts />
      <Offers />
      <Audiences />
      <Norms />
      <Principles />
      <Differentiators />
      <Tools />
      <Process />
      <Faq />

      <section id="contacto" className="px-3 pb-24 md:px-6 md:pb-28">
        <div className="mx-auto grid max-w-[1440px] gap-12 rounded-[28px] bg-paper px-6 py-12 text-paper-ink md:px-14 md:py-20 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="label text-paper-ink/60">Contacto</p>
            <MaskLines lines={["Empecemos con", "30 minutos"]} className="display mt-5 text-[clamp(30px,4.4vw,64px)]" />
            <p className="mt-6 max-w-[42ch] text-lg text-paper-ink/75">
              La primera conversación no tiene costo. Sale con una lista de brechas y, si conviene seguir, una propuesta por
              escrito en cinco días hábiles.
            </p>
            <dl className="mt-10 grid gap-4 border-t border-paper-rule pt-6">
              <div>
                <dt className="label text-[11px] text-paper-ink/60">Correo</dt>
                <dd className="mt-1 text-lg">
                  <a href={`mailto:${site.email}`} className="underline-offset-4 hover:underline">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label text-[11px] text-paper-ink/60">Ubicación</dt>
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
