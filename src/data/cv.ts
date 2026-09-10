/**
 * Datos del CV. Todo lo que hay acá está tomado del CV real: no se agregan
 * clientes, métricas, premios ni fechas que no estén confirmados.
 *
 * El sitio está escrito en primera persona: lo hizo Matías y habla de él.
 * Al agregar o editar texto, mantener esa voz ("diseño", "fabrico", "aprendí"),
 * nunca tercera persona.
 */

export const profile = {
  name: "Matías Colimodio",
  tagline: "Engineering / Design / Fabrication",
  claim: "Solving problems. Building things that last.",
  headline: "Diseño en CAD, fabrico y trato con el cliente de punta a punta.",
  summary:
    "Diseño mecánico y CAD en Fusion 360 y Solid Edge, con experiencia comercial propia: desde 2024 llevo mi servicio de impresión 3D y diseño personalizado, donde relevo el pedido, lo cotizo, lo diseño, lo produzco y lo entrego. Estudio Ingeniería Mecánica en la UTN, Facultad Regional General Pacheco, tengo inglés C1 y hoy hago una pasantía de proyectos en OPmobility, donde valido piezas en 3D, sigo el avance del proyecto y trabajo entre planta, ingeniería y finanzas. Me manejo igual de cómodo frente al modelo 3D que frente a la persona que lo pidió.",
  email: "matiascolimodio@gmail.com",
  phone: "2324582614",
  location: "Pilar, Buenos Aires",
  linkedin: "https://linkedin.com/in/matias-colimodio",
  linkedinLabel: "linkedin.com/in/matias-colimodio",
} as const;

export type EducationItem = {
  institution: string;
  detail: string;
  period?: string;
  note?: string;
  highlights?: string[];
};

export const education: EducationItem[] = [
  {
    institution: "UTN, Facultad Regional General Pacheco",
    detail: "Ingeniería Mecánica",
    period: "2025 — presente",
    note: "Cursando",
  },
  {
    institution: "Brick Towers College",
    detail: "Secundario bilingüe con orientación en Economía",
  },
  {
    institution: "Cambridge IGCSE",
    detail: "With Merit",
    highlights: [
      "Math Advanced",
      "Biology Advanced",
      "English as First Language",
      "ICT: Excel, Word y Access",
    ],
    note: "Participé en Olimpíadas de Matemática y en debates tipo Model United Nations.",
  },
];

export type ExperienceItem = {
  title: string;
  org: string;
  period?: string;
  body: string;
  bullets?: string[];
  outcome?: string;
  /** en curso: se destaca con una marca en la ficha */
  current?: boolean;
  /**
   * Para separar el trabajo en una empresa de lo propio y lo academico.
   * El orden del array ya es el orden en que se muestra.
   */
  kind?: "empresa" | "propio" | "academico";
};

export const experience: ExperienceItem[] = [
  {
    title: "Pasante de proyectos",
    org: "OPmobility",
    period: "2026 — presente",
    body: "Pasantía en el área de proyectos de una multinacional francesa de autopartes. Le sigo el pulso al proyecto: en las reuniones soy el que pregunta en qué estado está cada cosa, verifica que se esté haciendo y reprograma lo que no llega a fecha. Reviso las piezas en 3D para validarlas, hago cortes y capturas para los instructivos de trabajo (SWI), voy a planta a medir con calibre y muevo la documentación en SAP y KEOPS: remitos, órdenes de factura y su pase a finanzas.",
    bullets: [
      "Seguimiento de proyectos",
      "Validación de piezas en 3D",
      "Cortes y capturas para SWI",
      "Medición con calibre",
      "Remitos y órdenes de factura",
      "Interlocución entre áreas",
      "SAP",
      "KEOPS",
    ],
    current: true,
    kind: "empresa",
  },
  {
    title: "Servicio de impresión 3D y diseño personalizado",
    org: "Emprendimiento propio",
    period: "2024 — presente",
    current: true,
    kind: "propio",
    body: "Mi propio negocio: diseño y fabrico piezas, carteles y maquetas para clientes de arquitectura, comercios y uso general. Manejo el ciclo completo y soy la única cara visible frente al cliente: relevo qué necesita, lo cotizo con su plazo, lo diseño en Fusion 360, planifico la producción y lo entrego.",
    bullets: [
      "Relevamiento con el cliente",
      "Cotización y presupuesto",
      "Diseño CAD (Fusion 360)",
      "Planificación de fabricación",
      "Producción",
      "Entrega y seguimiento",
      "Resolución de problemas técnicos",
    ],
    outcome:
      "Llegué a hacer modelos a escala real de hasta 1,20 m, y series cortas de 20 a 30 piezas iguales para una fecha comercial.",
  },
  {
    title: "Competencia de robótica",
    org: "Universidad Austral",
    kind: "academico",
    body: "Presenté con mi equipo un carro seguidor de líneas. Coordiné tareas y adaptamos el diseño sobre la marcha, con plazos ajustados.",
    outcome: "Salimos segundos.",
  },
  {
    title: "Proyectos técnicos personales en CAD",
    org: "Trabajo propio",
    kind: "propio",
    body: "Diseño piezas mecánicas funcionales pensando desde el principio en cómo se fabrican, qué normas aplican y cómo se ensamblan.",
    outcome: "Itero cada diseño para que funcione mejor y sea más simple de hacer.",
  },
];

export type SkillGroup = {
  area: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    area: "CAD y diseño técnico",
    items: [
      "Fusion 360",
      "Solid Edge",
      "Shapr3D",
      "Planos normalizados 2D",
      "Modelado 3D",
      "Ensamblajes",
      "Blender",
      "Nomad Sculpt",
      "Prototipado con impresión 3D",
    ],
  },
  {
    area: "Cliente y comercial",
    items: [
      "Relevamiento de necesidades",
      "Cotización y presupuesto",
      "Comunicación con el cliente",
      "Planificación de fabricación",
      "Seguimiento de proyectos",
      "Resolución de problemas técnicos",
    ],
  },
  {
    area: "Análisis y datos",
    items: [
      "Excel intermedio/avanzado",
      "Organización",
      "Tablas",
      "Análisis básico de datos",
    ],
  },
  {
    area: "Programación",
    items: ["HTML", "CSS", "JavaScript", "Digital House"],
  },
  {
    area: "Diseño web e integraciones",
    items: [
      "Diseño de interfaces",
      "Sitios responsive",
      "Backoffices",
      "Integración de APIs",
      "Pasarelas de pago",
      "Bases de datos",
    ],
  },
  {
    area: "Automatizaciones básicas",
    items: [
      "Scripts de tareas repetitivas",
      "Automatización de planillas",
      "Flujos entre herramientas",
      "Generación de reportes",
    ],
  },
  {
    area: "Electrónica",
    items: ["Arduino", "Nociones de electrónica"],
  },
  {
    area: "Oficina técnica",
    items: [
      "Interpretación de planos 2D/3D",
      "Validación de piezas en 3D",
      "Cortes y capturas para SWI",
      "Metrología básica y calibre",
      "Seguimiento de trabajos y proveedores",
      "SAP",
      "KEOPS",
    ],
  },
  {
    area: "Idiomas",
    items: ["Español nativo", "Inglés C1 avanzado"],
  },
];

export type ProcessStep = {
  number: string;
  title: string;
  body: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Observe",
    body: "Entiendo el problema y el contexto.",
  },
  {
    number: "02",
    title: "Define",
    body: "Convierto las necesidades en criterios concretos.",
  },
  {
    number: "03",
    title: "Design",
    body: "Desarrollo ideas, planos y alternativas.",
  },
  {
    number: "04",
    title: "Build",
    body: "Prototipo, fabrico y pruebo.",
  },
  {
    number: "05",
    title: "Refine",
    body: "Itero hasta llegar a una solución más clara y funcional.",
  },
];
