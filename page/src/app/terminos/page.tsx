import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { responsable, terms } from "@/content/legal";

export const metadata: Metadata = {
  title: "Términos de uso",
  description: `Condiciones de uso del sitio web de ${responsable.brand}.`,
};

export default function TermsPage() {
  return <LegalPage title="Términos de uso" intro="Las condiciones para usar este sitio y su contenido." sections={terms} />;
}
