// Textos legales del sitio. Borrador preparado para Veraldon Group; conviene que lo revise un abogado.
// Pendiente: domicilio completo para notificaciones (la LFPDPPP pide incluirlo en el aviso integral).
import { site } from "@/content/site";

export const legalUpdated = "17 de octubre de 2026";

export const responsable = {
  name: "Diego Medina",
  brand: site.legalName,
  city: site.city,
  email: site.email,
};

export type LegalSection = { title: string; paragraphs?: string[]; items?: string[] };

export const privacySummary = `${responsable.brand} usará sus datos solo para responder su mensaje y preparar, si la pide, una propuesta. No los vendemos ni los usamos para publicidad.`;

export const privacy: LegalSection[] = [
  {
    title: "Quién es responsable de sus datos",
    paragraphs: [
      `${responsable.name}, quien opera la marca ${responsable.brand}, con domicilio en ${responsable.city}, es responsable del tratamiento de los datos personales que usted nos proporcione por este sitio, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.`,
      `Para cualquier asunto relacionado con sus datos, escríbanos a ${responsable.email}.`,
    ],
  },
  {
    title: "Qué datos recabamos",
    paragraphs: [
      "Por el formulario de contacto recabamos su nombre, su correo electrónico, el nombre de su empresa, el servicio que le interesa y el mensaje que usted escriba. No pedimos datos personales sensibles; le pedimos no incluirlos en su mensaje.",
      "Para proteger el formulario contra abusos, nuestro proveedor de infraestructura procesa de forma automática la dirección IP desde la que se envía. No la guardamos junto con su mensaje.",
    ],
  },
  {
    title: "Para qué usamos sus datos",
    paragraphs: ["Sus datos se usan únicamente para las siguientes finalidades, necesarias para atender su solicitud:"],
    items: [
      "Responder su mensaje y agendar la conversación inicial.",
      "Preparar y enviarle una propuesta por escrito, cuando usted la solicite.",
      "Darle seguimiento a esa solicitud.",
    ],
  },
  {
    title: "Finalidades secundarias",
    paragraphs: [
      "No usamos sus datos para publicidad, boletines ni perfiles de comportamiento. Si en el futuro quisiéramos hacerlo, le pediríamos antes su consentimiento expreso y usted podría negarse sin que eso afecte la atención de su solicitud.",
    ],
  },
  {
    title: "Con quién compartimos sus datos",
    paragraphs: [
      "No vendemos, rentamos ni transferimos sus datos a terceros. Para operar el sitio usamos proveedores que los tratan por cuenta nuestra y solo para prestarnos su servicio: Cloudflare, que aloja el sitio y entrega los mensajes del formulario, y el proveedor del buzón de correo donde los recibimos. Ninguno puede usarlos para fines propios.",
      "Solo entregaríamos sus datos a una autoridad cuando una ley o una orden fundada y motivada nos obligue.",
    ],
  },
  {
    title: "Cuánto tiempo los conservamos",
    paragraphs: [
      "Conservamos sus datos mientras atendemos su solicitud y, si llegamos a trabajar juntos, durante la relación comercial y los plazos que exijan las leyes aplicables. Después los eliminamos.",
    ],
  },
  {
    title: "Sus derechos ARCO y cómo ejercerlos",
    paragraphs: [
      `Usted puede acceder a sus datos, pedir que los corrijamos, solicitar que los eliminemos u oponerse a su uso (derechos ARCO), así como revocar su consentimiento o limitar el uso de sus datos. Para hacerlo, escriba a ${responsable.email} con el asunto «Derechos ARCO» e indique:`,
    ],
    items: [
      "Su nombre y un medio para responderle.",
      "Un documento que acredite su identidad o, en su caso, la de su representante.",
      "Qué derecho quiere ejercer y sobre qué datos.",
      "Cualquier información que nos ayude a localizar sus datos.",
    ],
  },
  {
    title: "Respuesta a su solicitud",
    paragraphs: [
      "Le responderemos al mismo correo dentro de los plazos que establece la ley y, si su solicitud procede, la haremos efectiva en esos mismos plazos. Si considera que no atendimos su solicitud conforme a la ley, puede acudir a la autoridad en materia de protección de datos personales.",
    ],
  },
  {
    title: "Cookies y tecnologías de rastreo",
    paragraphs: [
      "Este sitio no usa cookies ni guarda información en su navegador. Para conocer cuántas visitas recibe usamos Cloudflare Web Analytics, que mide de forma agregada y sin cookies, sin identificarlo a usted ni seguirlo en otros sitios.",
    ],
  },
  {
    title: "Cambios a este aviso",
    paragraphs: [
      "Cualquier cambio a este aviso de privacidad se publicará en esta misma página, con la fecha de la última actualización.",
    ],
  },
];

export const terms: LegalSection[] = [
  {
    title: "Uso del sitio",
    paragraphs: [
      `Este sitio presenta los servicios de ${responsable.brand}. Al usarlo, usted acepta estos términos. Si no está de acuerdo con ellos, le pedimos no usar el sitio.`,
    ],
  },
  {
    title: "El contenido es informativo",
    paragraphs: [
      "La información sobre servicios, alcances, entregables y tiempos es general y no constituye una oferta vinculante. Cada proyecto se define en una propuesta por escrito, con su alcance, precio y condiciones; solo esa propuesta, una vez aceptada, obliga a las partes.",
      `${responsable.brand} no emite certificados ni realiza auditorías de certificación. Las menciones a normas como ISO/IEC 27001, ISO/IEC 42001 o ISO/IEC 42005 describen el trabajo de preparación que ofrecemos; la certificación la otorga un organismo independiente que elige el cliente.`,
    ],
  },
  {
    title: "Propiedad intelectual",
    paragraphs: [
      `La marca ${responsable.brand}, el logotipo, los textos, los diseños y el código de este sitio son de su titular. Puede citar o compartir el contenido mencionando la fuente; para cualquier otro uso, pídanos autorización. Las marcas de terceros que aparecen en el sitio, como nombres de herramientas o normas, pertenecen a sus respectivos titulares y se mencionan solo como referencia.`,
    ],
  },
  {
    title: "Uso adecuado",
    paragraphs: ["Al usar el sitio y su formulario, usted se compromete a no:"],
    items: [
      "Enviar información falsa, ofensiva o que no le pertenezca.",
      "Intentar acceder a partes del sitio o de su infraestructura que no son públicas.",
      "Enviar mensajes automatizados, publicidad no solicitada o código malicioso.",
    ],
  },
  {
    title: "Disponibilidad y responsabilidad",
    paragraphs: [
      "Procuramos que el sitio esté disponible y que su información sea correcta y actual, pero no garantizamos que funcione sin interrupciones ni que el contenido esté libre de errores. No somos responsables de decisiones que se tomen solo con base en la información general del sitio, sin una propuesta o asesoría específica.",
    ],
  },
  {
    title: "Privacidad",
    paragraphs: ["El tratamiento de los datos que nos envíe por el formulario se rige por nuestro aviso de privacidad."],
  },
  {
    title: "Ley aplicable",
    paragraphs: [
      `Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier controversia se resolverá ante los tribunales competentes de la ${responsable.city}.`,
    ],
  },
  {
    title: "Cambios y contacto",
    paragraphs: [
      `Podemos actualizar estos términos; la versión vigente es la publicada en esta página. Para cualquier duda, escríbanos a ${responsable.email}.`,
    ],
  },
];
