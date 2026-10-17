import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { privacy, responsable } from "@/content/legal";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description: `Cómo ${responsable.brand} trata los datos personales que recibe por su sitio web.`,
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Aviso de privacidad"
      intro={`Cómo tratamos los datos que nos envía por este sitio y cómo puede ejercer sus derechos sobre ellos.`}
      sections={privacy}
    />
  );
}
