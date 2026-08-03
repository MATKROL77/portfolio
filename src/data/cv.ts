/**
 * Datos del CV. Todo lo que hay acá está tomado del CV de Matías: no se agregan
 * clientes, métricas, premios ni fechas que no estén confirmados.
 */

export const profile = {
  name: "Matías Colimodio",
  tagline: "Engineering / Design / Fabrication",
  claim: "Solving problems. Building things that last.",
  headline: "Ingeniería, diseño y fabricación de ideas que se pueden tocar.",
  summary:
    "Estudiante de Ingeniería Mecánica en UTN, Facultad Regional General Pacheco, con formación secundaria bilingüe e inglés C1. Tiene facilidad para aprender rápido, trabajar con autonomía y adaptarse a distintos entornos, combinando tareas técnicas, diseño, análisis de datos, comunicación con proveedores, coordinación y soporte de proyectos.",
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
    note: "Estudiante activo",
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
    note: "Participación en Olimpíadas de Matemática y debates tipo Model United Nations.",
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
    body: "Diseño y fabricación de piezas, carteles y maquetas para clientes de arquitectura, negocios y uso general.",
    bullets: [
      "Presupuesto",
      "Diseño CAD",
      "Producción",
      "Comunicación con el cliente",
      "Planificación de fabricación",
      "Resolución de problemas técnicos",
    ],
    outcome: "Modelos a escala real de hasta 1,20 m.",
  },
  {
    title: "Competencia de robótica",
    org: "Universidad Austral",
    body: "Proyecto en equipo: presentación de un carro que sigue líneas, coordinación de tareas y adaptación bajo plazos ajustados.",
    outcome: "Segundo puesto.",
  },
  {
    title: "Proyectos técnicos personales en CAD",
    org: "Trabajo propio",
    body: "Diseño de piezas mecánicas funcionales considerando fabricación, normas y criterios de ensamblaje.",
    outcome: "Iteración de diseños para optimizar funcionalidad y reducir complejidad.",
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
    body: "Entender el problema y el contexto.",
  },
  {
    number: "02",
    title: "Define",
    body: "Convertir necesidades en criterios concretos.",
  },
  {
    number: "03",
    title: "Design",
    body: "Desarrollar ideas, planos y alternativas.",
  },
  {
    number: "04",
    title: "Build",
    body: "Prototipar, fabricar y probar.",
  },
  {
    number: "05",
    title: "Refine",
    body: "Iterar hasta lograr una solución más clara y funcional.",
  },
];
