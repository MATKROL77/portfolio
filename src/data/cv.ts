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
  headline: "Diseño, calculo y fabrico ideas que se pueden tocar.",
  summary:
    "Soy estudiante de Ingeniería Mecánica en la UTN, Facultad Regional General Pacheco, con secundario bilingüe e inglés C1. Aprendo rápido, trabajo con autonomía y me adapto bien a entornos distintos: combino tareas técnicas, diseño, análisis de datos, comunicación con proveedores, coordinación y soporte de proyectos.",
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
};

export const experience: ExperienceItem[] = [
  {
    title: "Servicio de impresión 3D y diseño personalizado",
    org: "Emprendimiento propio",
    period: "2024 — presente",
    body: "Diseño y fabrico piezas, carteles y maquetas para clientes de arquitectura, negocios y uso general. Manejo el proceso completo, de la primera charla a la entrega.",
    bullets: [
      "Presupuesto",
      "Diseño CAD",
      "Producción",
      "Comunicación con el cliente",
      "Planificación de fabricación",
      "Resolución de problemas técnicos",
    ],
    outcome: "Llegué a hacer modelos a escala real de hasta 1,20 m.",
  },
  {
    title: "Competencia de robótica",
    org: "Universidad Austral",
    body: "Presenté con mi equipo un carro seguidor de líneas. Coordiné tareas y adaptamos el diseño sobre la marcha, con plazos ajustados.",
    outcome: "Salimos segundos.",
  },
  {
    title: "Proyectos técnicos personales en CAD",
    org: "Trabajo propio",
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
    area: "Diseño técnico",
    items: [
      "Fusion 360",
      "Solid Edge",
      "Blender",
      "Modelado 3D",
      "Ensamblajes",
      "Prototipado con impresión 3D",
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
      "Metrología básica",
      "Seguimiento de trabajos y proveedores",
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
