// Contenido del sitio. Sale del "Catálogo de servicios" y del "Plan maestro, propuesta final" de Veraldon.
// Del plan interno solo se publica lo que va dirigido a clientes. Los precios del catálogo no van en el sitio.

export const site = {
  name: "Veraldon",
  legalName: "Veraldon Group",
  motto: "IA que funciona, es segura y cumple, y se puede demostrar.",
  what: "Veraldon construye sistemas de IA, datos y software a la medida que funcionan, son seguros y pueden demostrarlo: cada entrega deja la evidencia que piden sus clientes, un banco o un auditor de ISO/IEC 27001 y 42001.",
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
    sub: "El software que genera, ordena y conecta los datos de su operación, diseñado sobre su proceso real.",
    items: [
      "Pedidos, inventarios, CRM, portales de clientes, expedientes y resultados",
      "Conciliación y descarga de CFDI, reportes periódicos, cotizadores y documentos automáticos",
      "Integración de ERP, facturación, tienda en línea, GPS y herramientas en la nube, sin recaptura",
      "Tableros de indicadores por sucursal conectados directo a las fuentes",
    ],
    out: "Sistema en producción, código fuente, documentación, capacitación y garantía.",
    norms: ["ISO/IEC 27001"],
  },
  {
    slug: "datos-infraestructura",
    short: "Datos",
    title: "Datos e infraestructura",
    sub: "La base que toda solución de IA necesita: datos limpios, privados y a escala.",
    items: [
      "Pipelines que anonimizan datos personales antes de enviarlos a proveedores externos, conforme a la LFPDPPP",
      "Modelos de código abierto en servidores propios o en AWS, para empresas que no pueden enviar datos a la nube pública",
      "Bases de datos analíticas y de búsqueda semántica (PostgreSQL, pgvector, ClickHouse)",
      "Contratos de datos, calidad y linaje: saber de dónde viene cada dato y quién lo cambió",
    ],
    out: "Infraestructura documentada, pipelines en operación, arquitectura y manual.",
    norms: ["LFPDPPP", "ISO/IEC 27001"],
  },
  {
    slug: "inteligencia-artificial",
    short: "IA",
    title: "Inteligencia artificial y conocimiento",
    sub: "Modelos de lenguaje sobre los datos de su empresa, medidos antes de salir a producción.",
    items: [
      "Asistente de conocimiento de alta precisión sobre documentos internos, con fuentes citadas",
      "Asistentes de atención a clientes por chat o WhatsApp y extracción de datos de contratos, facturas y expedientes",
      "Agentes que operan sus sistemas vía API, con identidad propia, permisos mínimos, límites de acción y gasto, registro de actividad y aprobación humana para acciones sensibles",
      "Evaluación de modelos y pruebas de seguridad: alucinaciones, precisión, sesgo, inyección de instrucciones y fuga de datos",
    ],
    out: "Aplicación desplegada en su infraestructura, suite de evaluación, reporte de resultados, código y documentación.",
    norms: ["ISO/IEC 42001", "OWASP Top 10 for LLM"],
  },
  {
    slug: "seguridad-gobernanza",
    short: "Seguridad",
    title: "Seguridad, gobernanza de IA e ingeniería de evidencia",
    sub: "Preparación técnica para ISO/IEC 27001 y 42001: los controles viven en su infraestructura, no solo en documentos, y la evidencia se genera sola.",
    items: [
      "Análisis de brechas por requisito, matriz de riesgos y plan priorizado",
      "Implementación técnica de accesos, respaldos, cifrado, registros, proveedores e incidentes, con políticas listas para auditoría",
      "Paquete de evidencia de IA: AI-BOM, registro de modelos, pruebas mapeadas a OWASP, NIST y 42001, y evaluación de impacto ISO/IEC 42005",
      "Recolección continua de evidencias desde AWS, GitHub, Google Workspace o Microsoft 365, con tablero de cumplimiento para la dirección",
      "Capacitación, preparación y acompañamiento en la auditoría de certificación, y mantenimiento anual",
    ],
    out: "Sistema de gestión documentado, operando y auditable, con el paquete de evidencia listo para el organismo certificador que usted elija.",
    norms: ["ISO/IEC 27001", "ISO/IEC 42001", "ISO/IEC 42005", "NIST AI RMF"],
  },
];

export const starts = [
  {
    title: "Diagnóstico de IA en producción",
    weeks: "2 a 3 semanas",
    text: "Para quien ya tiene un chatbot, un RAG o un agente y no sabe si es confiable ni cuánto cuesta por respuesta útil. Recibe un benchmark de calidad, pruebas de seguridad, costo y latencia, brechas, arquitectura objetivo y plan de puesta en producción.",
  },
  {
    title: "Diagnóstico técnico ISO 27001 + IA",
    weeks: "3 a 4 semanas",
    text: "Para quien recibe cuestionarios de seguridad, auditorías de clientes o requisitos de la CNBV. Recibe inventario de sus sistemas de IA, brechas de ISO 27001 y 42001 por requisito, matriz de riesgos, evidencias disponibles frente a faltantes y plan de implementación.",
  },
  {
    title: "Sprint de automatización",
    weeks: "3 a 4 semanas",
    text: "Para conciliaciones, captura, reportes o atención de primer nivel. Recibe un flujo en producción con integración, controles humanos y registro de actividad, comparado contra la línea base con criterios de aceptación acordados desde el inicio.",
  },
];

export const offers = [
  {
    title: "Arnés de evidencia de IA",
    for: "Para empresas que ya tienen equipo de cumplimiento",
    text: "Si ya cuenta con CISO u oficial de cumplimiento, resolvemos la parte pesada de ingeniería y usted conserva la relación con su auditor. Suites de evaluación y red teaming, AI-BOM, logs de inferencia y monitoreo de deriva, integrados a su pipeline: ningún cambio de modelo o prompt llega a producción sin pasar las pruebas.",
  },
  {
    title: "Asistente de conocimiento de alta precisión",
    for: "Prometemos números que usted puede verificar",
    text: "Una IA sobre los documentos, datos y procesos de su empresa: responde con cita, se abstiene cuando no sabe y mejora con supervisión. Exactitud acordada por contrato, con un umbral típico de 95 % y cero errores críticos. Sus datos no salen de la empresa y el costo por respuesta útil se reporta cada mes.",
  },
];

export const audiences = [
  { title: "Proveedores de software e IA", text: "Venden a bancos, aseguradoras y corporativos, y reciben cuestionarios de seguridad o auditorías de terceros." },
  { title: "Fintech y empresas reguladas", text: "Deben demostrar controles ante la CNBV y sus socios." },
  { title: "Centros de contacto y BPO", text: "Con clientes en Estados Unidos y que ya usan bots y agentes de voz." },
  { title: "Empresas medianas de cualquier giro", text: "Con procesos manuales caros, o con IA en producción que nadie ha medido." },
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
  "Prometemos números que usted puede verificar, no «cero alucinaciones».",
  "Si el control no opera, no lo damos por cumplido.",
  "El código es suyo desde el primer día.",
];

export const differentiators = [
  { title: "Ingeniería y cumplimiento en la misma casa", text: "Quien construye el sistema es quien diseña sus controles." },
  { title: "Evidencia técnica de IA lista para auditoría", text: "Pruebas, registros y reportes que un auditor puede revisar." },
  { title: "Precio fijo en pesos", text: "Sin módulos ocultos ni renovaciones automáticas." },
  { title: "El código es del cliente", text: "Código, documentación y datos son suyos desde el primer día." },
  { title: "Sus datos son suyos", text: "Nunca se reutilizan ni se usan para entrenar modelos de terceros." },
];

export const steps = [
  { title: "Conversación de 30 minutos", text: "Sin costo. Revisamos qué hace su gente a mano, qué datos salen de la empresa y quién le pide evidencia. Sale con una lista de brechas." },
  { title: "Propuesta por escrito", text: "En cinco días hábiles: alcance, precio fijo, calendario por hitos y criterios de aceptación, para que nadie se lleve sorpresas." },
  { title: "Entrega por hitos", text: "Entorno de pruebas, demostraciones en cada hito, documentación y capacitación. Los cambios de alcance se cotizan aparte." },
  { title: "Garantía y acompañamiento", text: "Garantía sobre lo entregado y, si lo desea, soporte y mejoras mensuales para que lo construido siga funcionando y evolucione con su negocio." },
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
    q: "¿Qué pasa en la conversación de 30 minutos?",
    a: "Revisamos qué hace su gente a mano, qué datos salen de la empresa y quién le pide evidencia. No tiene costo y sale con una lista de brechas. Si conviene seguir, en cinco días hábiles recibe una propuesta por escrito.",
  },
  {
    q: "¿Ustedes emiten el certificado?",
    a: "No. No emitimos certificados ni realizamos auditorías: la certificación la emite un organismo independiente que usted elige, y la auditoría interna que pide la norma la realiza un auditor independiente. Nosotros dejamos el sistema de gestión operando y el paquete de evidencia listo.",
  },
  {
    q: "¿Podemos usar modelos externos con datos de clientes?",
    a: "Sí, si los datos personales se anonimizan o enmascaran antes de salir de su empresa, conforme a la LFPDPPP. Cuando no pueden salir, desplegamos modelos de código abierto en sus servidores o en AWS.",
  },
  {
    q: "¿Cómo se cobra?",
    a: "Precio fijo por alcance, cotizado después de la conversación según giro, tamaño y complejidad, sin módulos ocultos ni renovaciones automáticas. La auditoría de certificación la cobra aparte el organismo certificador que usted elija.",
  },
  {
    q: "¿De quién es el código y qué pasa con nuestros datos?",
    a: "El código fuente, la documentación y los datos son suyos desde el primer día. Sus datos nunca se reutilizan en otros proyectos ni para entrenar modelos de terceros.",
  },
];
