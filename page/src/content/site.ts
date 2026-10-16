// Contenido del sitio. Sale del "Catálogo de servicios" y del "Plan maestro, propuesta final" de Veraldon.
// Del plan interno solo se publica lo que va dirigido a clientes. Los precios del catálogo no van en el sitio.

export const site = {
  name: "Veraldon",
  legalName: "Veraldon Group",
  motto: "Sistemas, datos e IA que funcionan y lo demuestran.",
  what: "Veraldon construye el software, los datos y la IA con los que su empresa deja de recapturar, confía en sus números, pone IA a trabajar con resultados medidos y responde con evidencia cuando un cliente o un auditor la pide. Precio fijo en pesos. El código es suyo desde el primer día.",
  description:
    "Veraldon: software a la medida, datos, IA y seguridad para empresas medianas en México. Precio fijo en pesos, código suyo. Primera conversación sin costo.",
  email: "hola@veraldon.mx",
  city: "Ciudad de México",
  year: 2026,
  // Pendientes: WhatsApp y LinkedIn. Mientras estén vacíos no se muestran.
  phone: "",
  linkedin: "",
};

export type ServiceLine = {
  slug: string;
  short: string;
  title: string;
  sub: string;
  items: string[];
  out: string;
  norms: string[];
};

export const serviceLines: ServiceLine[] = [
  {
    slug: "sistemas-integracion",
    short: "Sistemas",
    title: "Sistemas a la medida e integración",
    sub: "Deje de recapturar. Conectamos sus sistemas y automatizamos el trabajo manual, todo diseñado sobre cómo opera hoy su empresa.",
    items: [
      "Pedidos, inventarios, CRM, portales de clientes, expedientes y resultados",
      "Conciliación y descarga de CFDI, reportes periódicos, cotizadores y documentos que se generan solos",
      "Integración de ERP, facturación, tienda en línea, GPS y herramientas en la nube, sin recaptura entre sistemas",
      "Tableros de indicadores por sucursal conectados directo a las fuentes, sin armar el reporte a mano",
    ],
    out: "Sistema en producción, código fuente, documentación, capacitación y garantía.",
    norms: ["ISO/IEC 27001"],
  },
  {
    slug: "datos-infraestructura",
    short: "Datos",
    title: "Datos e infraestructura",
    sub: "Sepa de dónde sale cada dato y quién lo cambió. Datos limpios y privados, listos para reportes y para IA, anonimizados antes de salir a terceros.",
    items: [
      "Pipelines que anonimizan datos personales antes de enviarlos a proveedores externos, conforme a la LFPDPPP",
      "Modelos de código abierto en sus servidores o en AWS, para empresas que no pueden enviar datos a la nube pública",
      "Bases de datos analíticas y de búsqueda semántica: PostgreSQL, pgvector y ClickHouse",
      "Contratos de datos, calidad y linaje: saber de dónde viene cada dato y quién lo cambió",
    ],
    out: "Infraestructura documentada, pipelines en operación, arquitectura y manual.",
    norms: ["LFPDPPP", "ISO/IEC 27001"],
  },
  {
    slug: "inteligencia-artificial",
    short: "IA",
    title: "Inteligencia artificial y conocimiento",
    sub: "IA que responde con fuentes, se abstiene cuando no sabe y se mide antes de salir a producción.",
    items: [
      "Asistente de conocimiento sobre sus documentos internos, con fuentes citadas y abstención cuando no hay respuesta",
      "Atención a clientes por chat o WhatsApp y extracción de datos de contratos, facturas y expedientes",
      "Agentes que operan sus sistemas vía API: identidad propia, permisos mínimos, límites de acción y gasto, registro y aprobación humana en lo sensible",
      "Evaluación de modelos y pruebas de seguridad: alucinaciones, precisión, sesgo, inyección de instrucciones y fuga de datos",
    ],
    out: "Aplicación desplegada en su infraestructura, suite de evaluación, reporte de resultados, código y documentación.",
    norms: ["ISO/IEC 42001", "OWASP Top 10 for LLM"],
  },
  {
    slug: "seguridad-gobernanza",
    short: "Seguridad",
    title: "Seguridad, gobernanza de IA e ingeniería de evidencia",
    sub: "Llegue a la auditoría con la evidencia lista. Los controles operan en su infraestructura, no solo en documentos, y la evidencia se genera sola.",
    items: [
      "Brechas de ISO 27001 y 42001 por requisito, evaluación de impacto de la IA sobre las personas, matriz de riesgos y plan priorizado",
      "Accesos, respaldos, cifrado, registros, proveedores y respuesta a incidentes configurados y monitoreados; políticas y procedimientos para auditoría",
      "Evidencia de IA: inventario (AI-BOM), modelos y versiones, registros de operación y pruebas mapeadas a OWASP Top 10 for LLM, NIST AI RMF e ISO 42001",
      "Recolección continua de evidencias desde AWS, GitHub, Google Workspace o Microsoft 365, con tablero de cumplimiento para la dirección",
      "Capacitación a directivos y técnicos, preparación para la auditoría y mantenimiento anual con la evidencia al día",
    ],
    out: "Sistema de gestión documentado, operando y auditable, con el paquete de evidencia listo para el organismo certificador que usted elija.",
    norms: ["ISO/IEC 27001", "ISO/IEC 42001", "ISO/IEC 42005", "NIST AI RMF"],
  },
];

export const starts = [
  {
    title: "Diagnóstico de IA en producción",
    weeks: "2 a 3 semanas",
    text: "Para quien tiene un chatbot, RAG o agente y nadie lo ha medido. Recibe benchmark de calidad (exactitud, fidelidad a fuentes, abstención, errores críticos), pruebas de seguridad (inyección, fuga de datos, permisos), costo y latencia, brechas, arquitectura objetivo y plan de puesta en producción.",
  },
  {
    title: "Diagnóstico técnico ISO 27001 + IA",
    weeks: "3 a 4 semanas",
    text: "Para quien recibe cuestionarios de seguridad, auditorías de clientes o requisitos de la CNBV. Recibe inventario de IA, brechas de 27001 y 42001 por requisito, matriz de riesgos, evaluación de impacto cuando la IA afecta a personas, evidencias disponibles frente a faltantes, plan y cotización.",
  },
  {
    title: "Sprint de automatización",
    weeks: "3 a 4 semanas",
    text: "Para quien tiene un proceso manual caro y repetitivo: conciliaciones, captura, reportes, atención de primer nivel. Recibe un flujo en producción con integración, controles humanos y registro de actividad, medido contra el proceso actual con criterios de aceptación acordados desde el inicio.",
  },
];

export const offers = [
  {
    title: "Arnés de evidencia de IA",
    for: "Para empresas que ya tienen equipo de cumplimiento",
    text: "Su equipo conserva la relación con su auditor; nosotros hacemos la parte pesada de ingeniería: evaluación y red teaming mapeados a OWASP Top 10 for LLM, NIST AI RMF e ISO 42001, AI-BOM, registros de inferencia y monitoreo de deriva. Recibe el arnés en su infraestructura, un primer reporte y, si lo desea, monitoreo mensual.",
  },
  {
    title: "Asistente de conocimiento de alta precisión",
    for: "Para quien consulta contratos y expedientes a mano",
    text: "Una IA sobre los documentos y procesos de su empresa: responde con cita, se abstiene cuando no sabe y mejora con supervisión. Prometemos números verificables, no «cero alucinaciones»: exactitud pactada por contrato y medida con preguntas de su empresa, datos que no salen o salen anonimizados y costo por respuesta útil cada mes.",
  },
];

export const audiences = [
  { title: "Procesos a mano y sucursales sin conectar", text: "Laboratorios, clínicas, distribuidoras, escuelas y despachos que recapturan pedidos o mandan resultados en PDF. Lo resolvemos a precio fijo." },
  { title: "Empresas con IA que nadie ha medido", text: "Compraron un chatbot o un agente y nadie sabe si responde bien ni cuánto cuesta por respuesta útil. Lo medimos y le decimos qué cambiar." },
  { title: "Proveedores de software e IA", text: "Si vende a bancos, aseguradoras o corporativos y un cuestionario de seguridad frena el contrato, le decimos qué falta y lo resolvemos." },
  { title: "Fintech y empresas reguladas por la CNBV", text: "La CNBV y los bancos le piden controles que un tercero revisa, y en papel no resisten. Los dejamos operando, no en PDF." },
  { title: "Centros de contacto y BPO", text: "Sus bots y agentes de voz ya atienden al cliente de Estados Unidos. Le dejamos las pruebas y registros que ese cliente le pide." },
];

export const norms = [
  { code: "ISO/IEC 27001", title: "Seguridad de la información", text: "Sistema de gestión con controles técnicos en accesos, respaldos, cifrado, registros, proveedores e incidentes." },
  { code: "ISO/IEC 42001", title: "Sistemas de gestión de IA", text: "Política de IA, registro de modelos, riesgos y monitoreo del ciclo de vida, con evidencia para el auditor." },
  { code: "ISO/IEC 42005", title: "Evaluación de impacto de IA", text: "Cómo afecta un sistema de IA a personas y organizaciones, documentado antes de ponerlo en producción." },
  { code: "OWASP Top 10 for LLM", title: "Seguridad en aplicaciones con LLM", text: "Pruebas contra inyección de instrucciones, fuga de datos y abuso de agentes, mapeadas en el paquete de evidencia." },
  { code: "NIST AI RMF", title: "Gestión de riesgos de IA", text: "Marco para identificar, medir y gestionar los riesgos de la IA, usado para mapear pruebas y controles." },
  { code: "LFPDPPP", title: "Datos personales en México", text: "Anonimización y enmascaramiento antes de que los datos lleguen a proveedores externos, o modelos dentro de su perímetro." },
  { code: "CNBV", title: "Requisitos para ITF", text: "Controles y evidencia que piden las instituciones de tecnología financiera supervisadas." },
];

export const principles = [
  "Somos ingenieros, no vendedores de software.",
  "Prometemos números que usted puede verificar.",
  "Si el control no opera, no lo damos por cumplido.",
  "El código es suyo desde el primer día.",
];

export const differentiators = [
  { title: "Precio fijo en pesos", text: "Sabe cuánto paga antes de empezar. Sin módulos ocultos ni renovaciones automáticas." },
  { title: "El código y los datos son suyos", text: "Código fuente, documentación y datos, propiedad de su empresa desde el primer día." },
  { title: "Diseñado sobre su proceso real", text: "Antes de escribir código vemos cómo opera hoy su equipo y qué datos salen de la empresa." },
  { title: "Soporte de quien lo construyó", text: "Garantía sobre lo entregado y, si lo desea, soporte directo del equipo que escribió el código." },
  { title: "Evidencia que le vuelve a servir", text: "Cada entrega deja pruebas, registros y documentación para su cliente, su banco o su auditor." },
];

export const steps = [
  { title: "Conversación de 30 minutos", text: "Sin costo. Revisamos qué hace su gente a mano, qué datos salen de la empresa y, si aplica, quién le pide evidencia. Sale con una lista de brechas." },
  { title: "Propuesta por escrito", text: "En cinco días hábiles: alcance, precio fijo en pesos, calendario por hitos y criterios de aceptación. Nadie se lleva sorpresas." },
  { title: "Entrega por hitos", text: "Entorno de pruebas, demostración en cada hito, documentación y capacitación a su equipo. Los cambios de alcance se cotizan aparte." },
  { title: "Garantía y acompañamiento", text: "Garantía sobre lo entregado. Si lo desea, soporte mensual directo de quien construyó el sistema." },
];

export const notDone = [
  "No emitimos certificados ni realizamos auditorías.",
  "No implementamos ISO 9001.",
  "No entregamos «solo documentos» para colgar un certificado.",
];

export const tools = [
  "PostgreSQL",
  "pgvector",
  "ClickHouse",
  "AWS",
  "GitHub",
  "Google Workspace",
  "Microsoft 365",
  "WhatsApp",
  "promptfoo",
  "DeepTeam",
  "cdxgen",
  "CycloneDX",
];

export const faqs = [
  {
    q: "¿Cuánto cuesta?",
    a: "Precio fijo por alcance, en pesos mexicanos. Los diagnósticos y el sprint tienen alcance cerrado; un sistema a la medida se cotiza según giro, tamaño y complejidad. Lo recibe por escrito en cinco días hábiles y el monto no cambia, salvo que usted pida algo fuera del alcance, que se cotiza aparte.",
  },
  {
    q: "¿Cuánto tiempo toma?",
    a: "Los diagnósticos y el sprint de automatización duran de dos a cuatro semanas. Un sistema a la medida o un asistente de conocimiento se entrega por hitos, con calendario acordado en la propuesta y una demostración en cada hito.",
  },
  {
    q: "¿De quién es el código?",
    a: "Suyo desde el primer día, junto con la documentación y los datos. Puede operarlo con su equipo sin depender de nosotros y sin renovaciones automáticas.",
  },
  {
    q: "¿Qué pasa con nuestros datos?",
    a: "Nunca se reutilizan en otros proyectos ni para entrenar modelos de terceros. Si los datos personales deben salir a un proveedor externo, se anonimizan antes, conforme a la LFPDPPP. Si no pueden salir, desplegamos modelos de código abierto en sus servidores o en AWS.",
  },
  {
    q: "¿Ustedes certifican?",
    a: "No. La certificación la emite un organismo independiente que usted elige; nosotros no emitimos certificados ni realizamos auditorías. Lo que sí hacemos es dejar los controles operando y el paquete de evidencia listo para ese organismo.",
  },
  {
    q: "¿Sirve si no tenemos IA?",
    a: "Sí. Pedidos, inventarios, conciliación de CFDI, integración de ERP y facturación, tableros por sucursal: nada de eso necesita IA. Si un proceso le cuesta horas de su gente, es trabajo para nosotros. La evidencia que queda es un beneficio adicional, no un requisito.",
  },
];
