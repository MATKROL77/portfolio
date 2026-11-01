import type { Locale } from "./config";

/**
 * Cadenas de interfaz. El español es la referencia; `en` y `pt` la traducen
 * completa. Si faltara una clave, `useT` cae al español.
 */

const es = {
  "nav.selectedWork": "Selected work",
  "nav.webProducts": "Web products",
  "nav.process": "Proceso",
  "nav.about": "Sobre mí",
  "nav.contact": "Contacto",
  "nav.menu": "Menú",
  "nav.close": "Cerrar",
  "nav.language": "Idioma",
  "nav.skipToContent": "Saltar al contenido",

  "hero.claim": "Solving problems. Building things that last.",
  "hero.role": "Engineer & Designer",
  "hero.roleLines": "Fusion 360 · Solid Edge|Diseño mecánico y de producto|Del relevamiento a la entrega",
  "hero.viewProfile": "Ver perfil completo",
  "hero.openCase": "Abrir caso",
  "hero.swipeHint": "Deslizá para ver los proyectos",
  "hero.deckHelp":
    "Usá las flechas del teclado o arrastrá para recorrer los proyectos. La galería es circular: después de la última ficha vuelve a la primera.",
  "hero.prev": "Proyecto anterior",
  "hero.next": "Proyecto siguiente",

  "spec.year": "Año",
  "spec.type": "Tipo",
  "spec.tools": "Tools",
  "spec.materials": "Materiales",
  "spec.role": "Rol",

  "profile.eyebrow": "El perfil",
  "profile.education": "Formación",
  "profile.since": "Desde",
  "profile.venture": "Emprendimiento",
  "profile.award": "Distinción",
  "profile.now": "Ahora",
  "profile.viewCv": "Ver CV completo",
  "profile.directContact": "Contacto directo",

  "index.eyebrow": "Archivo",
  "index.filterLegend": "Filtrar por herramienta",
  "index.filterClear": "Ver todos",
  "index.title": "Todo el trabajo, en orden",
  "index.intro":
    "Cada ficha abre un caso con el problema, el proceso y el resultado. Lo conceptual está marcado como tal.",

  "web.eyebrow": "Web products",
  "web.title": "Diseño y desarrollo de webs que venden",
  "web.intro":
    "Tiendas en línea, sitios institucionales y automatizaciones. Abajo está cada trabajo con su pantalla; los sitios se abren en una pestaña para recorrerlos enteros.",
  "web.demoNote":
    "Los sitios se muestran en vivo cuando el propio sitio lo permite, y el backoffice con una réplica de demostración incluida en este portfolio: sin usuario, sin contraseña y sin ninguna conexión con los sistemas en producción.",
  "web.stackEyebrow": "Integraciones",
  "web.stackTitle": "Cobrás y facturás desde tu sitio",
  "web.mpBody":
    "Cobros en línea, suscripciones y conciliación de caja contra lo que entra por el sitio.",
  "web.arcaBody":
    "Factura electrónica, con entorno de homologación para probar y de producción para emitir de verdad.",
  "web.stackNote":
    "Las dos están funcionando hoy en la tienda de BROTE, no son una promesa.",
  "web.offerTitle": "¿Necesitás algo así para tu negocio?",
  "web.offerBody":
    "Diseño y desarrollo el sitio, el panel para que lo manejes sin depender de nadie, y las integraciones que haga falta.",
  "web.openReal": "Abrir sitio real",
  "web.expand": "Ampliar",
  "web.publicSite": "Public site",
  "web.backoffice": "Backoffice",
  "web.backstage": "Explore backstage",
  "web.typing": "Escribiendo…",
  "web.live": "En vivo",
  "web.capture": "Captura",
  "web.readOnly": "Read-only demo",
  "web.readOnlyShort": "Sólo lectura",
  "web.blockedNotice":
    "Este sitio prohíbe mostrarse dentro de otra página, así que acá se ve una captura real. El sitio en vivo se abre en una pestaña nueva.",
  "web.slowNotice":
    "El sitio está tardando en cargar dentro del marco. Mientras tanto se muestra una captura real.",
  "web.replicaNote":
    "Réplica de demostración con datos inventados, incluida en el portfolio para mostrar la interfaz. No está conectada al sistema real y no necesita usuario ni contraseña.",
  "web.accessTitle": "Acceso de invitado",
  "web.accessEmail": "Usuario",
  "web.accessPassword": "Contraseña",
  "web.accessNote":
    "Cuenta de solo lectura, para que puedas recorrer el panel. Copiá los datos y entrá con el formulario de abajo.",
  "web.copy": "Copiar",
  "web.copied": "Copiado",
  // Estado transitorio: sólo se ve si todavía no se cargó la contraseña con
  // `npm run set-access`. Una vez cargada, esta línea no aparece nunca más.
  "web.accessPending": "Acceso de invitado en preparación.",
  "web.autoAccess": "Sesión de invitado abierta",
  "web.autoAccessNote":
    "Estás viendo el panel real, ya logueado y en modo solo lectura. No hace falta usuario ni contraseña.",
  "web.openAdmin": "Abrir el panel",
  "web.adminBlocked":
    "El panel no se deja mostrar dentro de otra página, así que se abre en una pestaña nueva con el acceso de invitado.",

  "process.eyebrow": "Proceso",
  "process.title": "Cómo trabajo un proyecto",
  "process.intro":
    "Cinco etapas que se repiten igual en una pieza mecánica, en un mueble o en una interfaz. La diferencia está en el material, no en el método.",

  "cv.eyebrow": "Sobre mí",
  "cv.title": "Currículum",
  "cv.experience": "Experiencia y proyectos",
  "cv.current": "En curso",
  "cv.education": "Educación",
  "cv.skills": "Habilidades",
  "cv.profile": "Perfil",
  "cv.viewPage": "Ver el CV en una página",
  "cv.downloadPdf": "Descargar PDF",
  "cv.back": "Volver al portfolio",

  "contact.eyebrow": "Contacto",
  "contact.title": "LET’S BUILD SOMETHING USEFUL.",
  "contact.intro":
    "Busco un puesto donde el criterio técnico y el trato con el cliente vayan juntos: preventa técnica y application engineering sobre CAD, o diseño mecánico y desarrollo de producto. Trabajo en Fusion 360 y Solid Edge, tengo inglés C1 y estoy en Buenos Aires. Me interesa remoto o híbrido, y arranco presencial si el puesto lo pide.",
  "contact.whatsapp": "WhatsApp",
  "contact.email": "Email",
  "contact.downloadCv": "Descargar CV",
  "contact.whatsappMessage":
    "Hola Matías, vi tu portfolio y me gustaría hablar de un proyecto.",
  "contact.emailSubject": "Proyecto — desde el portfolio",

  "case.allProjects": "Todos los proyectos",
  "case.progress": "Avance de lectura",
  "case.problem": "El problema",
  "case.process": "El proceso",
  "case.result": "El resultado",
  "case.record": "Registro",
  "case.recordIntro":
    "Planos, renders y fotos del proceso. Tocá cualquier imagen para verla a pantalla completa.",
  "case.takeaway": "Lo que dejó",
  "case.sheet": "Ficha",
  "case.next": "Siguiente",
  "case.workTogether": "Trabajemos juntos",
  "case.onScreen": "El producto en pantalla",

  "gallery.prev": "Imagen anterior",
  "gallery.next": "Imagen siguiente",
  "gallery.close": "Cerrar",

  "footer.tagline": "Engineering / Design / Fabrication",
} as const;

export type UiKey = keyof typeof es;

const en: Partial<Record<UiKey, string>> = {
  "nav.process": "Process",
  "nav.about": "About",
  "nav.contact": "Contact",
  "nav.menu": "Menu",
  "nav.close": "Close",
  "nav.language": "Language",
  "nav.skipToContent": "Skip to content",

  "hero.roleLines": "Fusion 360 · Solid Edge|Mechanical & product design|From brief to delivery",
  "hero.viewProfile": "See full profile",
  "hero.openCase": "Open case",
  "hero.swipeHint": "Swipe to browse the projects",
  "hero.deckHelp":
    "Use the arrow keys or drag to browse the projects. The gallery loops: after the last card it returns to the first.",
  "hero.prev": "Previous project",
  "hero.next": "Next project",

  "spec.year": "Year",
  "spec.type": "Type",
  "spec.materials": "Materials",
  "spec.role": "Role",

  "profile.eyebrow": "The profile",
  "profile.education": "Education",
  "profile.since": "Since",
  "profile.venture": "Own venture",
  "profile.award": "Distinction",
  "profile.now": "Now",
  "profile.viewCv": "See full CV",
  "profile.directContact": "Direct contact",

  "index.eyebrow": "Archive",
  "index.filterLegend": "Filter by tool",
  "index.filterClear": "Show all",
  "index.title": "All the work, in order",
  "index.intro":
    "Each card opens a case with the problem, the process and the result. Anything conceptual is labelled as such.",

  "web.title": "Design and development — websites that sell",
  "web.intro":
    "Online shops, company sites and automations. Below is each piece of work with its screen; the sites open in a tab so you can walk through them.",
  "web.demoNote":
    "Each site is embedded live when the site itself allows it, and the backoffice is a demo replica built into this portfolio: no user, no password and no connection to the production systems.",
  "web.stackEyebrow": "Integrations",
  "web.stackTitle": "Charge and invoice from your own site",
  "web.mpBody":
    "Online payments, subscriptions and till reconciliation against what comes in through the site.",
  "web.arcaBody":
    "Electronic invoicing, with a sandbox environment to test and a production one to issue for real.",
  "web.stackNote":
    "Both are running today in BROTE's shop — they are not a promise.",
  "web.offerTitle": "Do you need something like this for your business?",
  "web.offerBody":
    "I design and build the site, the panel so you can run it without depending on anyone, and whatever integrations it needs.",
  "web.openReal": "Open the real site",
  "web.expand": "Expand",
  "web.live": "Live",
  "web.typing": "Typing…",
  "web.capture": "Screenshot",
  "web.readOnlyShort": "Read only",
  "web.blockedNotice":
    "This site refuses to be displayed inside another page, so what you see here is a real screenshot. The live site opens in a new tab.",
  "web.slowNotice":
    "The site is taking a while to load inside the frame. A real screenshot is shown in the meantime.",
  "web.replicaNote":
    "Demo replica with made-up data, included in the portfolio to show the interface. It is not connected to the real system and needs no login.",
  "web.accessTitle": "Guest access",
  "web.accessEmail": "User",
  "web.accessPassword": "Password",
  "web.accessNote":
    "Read-only account, so you can walk through the panel. Copy the details and sign in with the form below.",
  "web.copy": "Copy",
  "web.copied": "Copied",
  "web.accessPending": "Guest access being set up.",
  "web.autoAccess": "Guest session open",
  "web.autoAccessNote":
    "You are looking at the real panel, already signed in and read-only. No user or password needed.",
  "web.openAdmin": "Open the panel",
  "web.adminBlocked":
    "The panel refuses to be shown inside another page, so it opens in a new tab with the guest access.",

  "process.eyebrow": "Process",
  "process.title": "How I work on a project",
  "process.intro":
    "Five stages that repeat the same way in a mechanical part, a piece of furniture or an interface. What changes is the material, not the method.",

  "cv.eyebrow": "About",
  "cv.title": "Résumé",
  "cv.experience": "Experience and projects",
  "cv.current": "Ongoing",
  "cv.education": "Education",
  "cv.skills": "Skills",
  "cv.profile": "Profile",
  "cv.viewPage": "See the CV on one page",
  "cv.downloadPdf": "Download PDF",
  "cv.back": "Back to the portfolio",

  "contact.eyebrow": "Contact",
  "contact.intro":
    "I am looking for a role where technical judgement and client-facing work go together: technical presales and application engineering around CAD, or mechanical design and product development. I work in Fusion 360 and Solid Edge, I have C1 English and I am based in Buenos Aires. I am after remote or hybrid, and I am happy to start on site if the role needs it.",
  "contact.downloadCv": "Download CV",
  "contact.whatsappMessage":
    "Hi Matías, I saw your portfolio and I would like to talk about a project.",
  "contact.emailSubject": "Project — from the portfolio",

  "case.allProjects": "All projects",
  "case.progress": "Reading progress",
  "case.problem": "The problem",
  "case.process": "The process",
  "case.result": "The result",
  "case.record": "Record",
  "case.recordIntro":
    "Drawings, renders and process photos. Tap any image to see it full screen.",
  "case.takeaway": "What it left",
  "case.sheet": "Sheet",
  "case.next": "Next",
  "case.workTogether": "Let’s work together",
  "case.onScreen": "The product on screen",

  "gallery.prev": "Previous image",
  "gallery.next": "Next image",
  "gallery.close": "Close",
};

const pt: Partial<Record<UiKey, string>> = {
  "nav.process": "Processo",
  "nav.about": "Sobre mim",
  "nav.contact": "Contato",
  "nav.menu": "Menu",
  "nav.close": "Fechar",
  "nav.language": "Idioma",
  "nav.skipToContent": "Ir para o conteúdo",

  "hero.roleLines": "Fusion 360 · Solid Edge|Projeto mecânico e de produto|Do briefing à entrega",
  "hero.viewProfile": "Ver perfil completo",
  "hero.openCase": "Abrir caso",
  "hero.swipeHint": "Deslize para ver os projetos",
  "hero.deckHelp":
    "Use as setas do teclado ou arraste para percorrer os projetos. A galeria é circular: depois do último cartão volta ao primeiro.",
  "hero.prev": "Projeto anterior",
  "hero.next": "Próximo projeto",

  "spec.year": "Ano",
  "spec.type": "Tipo",
  "spec.materials": "Materiais",
  "spec.role": "Função",

  "profile.eyebrow": "O perfil",
  "profile.education": "Formação",
  "profile.since": "Desde",
  "profile.venture": "Negócio próprio",
  "profile.award": "Distinção",
  "profile.now": "Agora",
  "profile.viewCv": "Ver CV completo",
  "profile.directContact": "Contato direto",

  "index.eyebrow": "Arquivo",
  "index.filterLegend": "Filtrar por ferramenta",
  "index.filterClear": "Ver todos",
  "index.title": "Todo o trabalho, em ordem",
  "index.intro":
    "Cada cartão abre um caso com o problema, o processo e o resultado. O que é conceitual está marcado como tal.",

  "web.title": "Design e desenvolvimento — sites que vendem",
  "web.intro":
    "Lojas on-line, sites institucionais e automações. Abaixo está cada trabalho com sua tela; os sites abrem em uma aba para percorrê-los inteiros.",
  "web.demoNote":
    "Os sites aparecem ao vivo quando o próprio site permite, e o backoffice é uma réplica de demonstração incluída neste portfólio: sem usuário, sem senha e sem nenhuma conexão com os sistemas em produção.",
  "web.stackEyebrow": "Integrações",
  "web.stackTitle": "Cobre e fature a partir do seu site",
  "web.mpBody":
    "Cobranças on-line, assinaturas e conciliação de caixa com o que entra pelo site.",
  "web.arcaBody":
    "Nota fiscal eletrônica, com ambiente de homologação para testar e de produção para emitir de verdade.",
  "web.stackNote":
    "As duas estão funcionando hoje na loja da BROTE — não são uma promessa.",
  "web.offerTitle": "Precisa de algo assim para o seu negócio?",
  "web.offerBody":
    "Projeto e desenvolvo o site, o painel para você tocá-lo sem depender de ninguém, e as integrações que forem necessárias.",
  "web.openReal": "Abrir o site real",
  "web.expand": "Ampliar",
  "web.live": "Ao vivo",
  "web.typing": "Digitando…",
  "web.capture": "Captura",
  "web.readOnlyShort": "Somente leitura",
  "web.blockedNotice":
    "Este site não permite ser exibido dentro de outra página, então aqui aparece uma captura real. O site ao vivo abre em uma nova aba.",
  "web.slowNotice":
    "O site está demorando para carregar dentro do quadro. Enquanto isso, mostramos uma captura real.",
  "web.replicaNote":
    "Réplica de demonstração com dados inventados, incluída no portfólio para mostrar a interface. Não está conectada ao sistema real e não pede login.",
  "web.accessTitle": "Acesso de convidado",
  "web.accessEmail": "Usuário",
  "web.accessPassword": "Senha",
  "web.accessNote":
    "Conta somente leitura, para você percorrer o painel. Copie os dados e entre pelo formulário abaixo.",
  "web.copy": "Copiar",
  "web.copied": "Copiado",
  "web.accessPending": "Acesso de convidado em preparação.",
  "web.autoAccess": "Sessão de convidado aberta",
  "web.autoAccessNote":
    "Você está vendo o painel real, já logado e em modo somente leitura. Não precisa de usuário nem senha.",
  "web.openAdmin": "Abrir o painel",
  "web.adminBlocked":
    "O painel não permite ser exibido dentro de outra página, então abre em uma nova aba com o acesso de convidado.",

  "process.eyebrow": "Processo",
  "process.title": "Como trabalho um projeto",
  "process.intro":
    "Cinco etapas que se repetem igual em uma peça mecânica, em um móvel ou em uma interface. O que muda é o material, não o método.",

  "cv.eyebrow": "Sobre mim",
  "cv.title": "Currículo",
  "cv.experience": "Experiência e projetos",
  "cv.current": "Em curso",
  "cv.education": "Formação",
  "cv.skills": "Habilidades",
  "cv.profile": "Perfil",
  "cv.viewPage": "Ver o CV em uma página",
  "cv.downloadPdf": "Baixar PDF",
  "cv.back": "Voltar ao portfólio",

  "contact.eyebrow": "Contato",
  "contact.intro":
    "Procuro uma posição onde o critério técnico e o contato com o cliente andem juntos: pré-venda técnica e application engineering sobre CAD, ou projeto mecânico e desenvolvimento de produto. Trabalho em Fusion 360 e Solid Edge, tenho inglês C1 e moro em Buenos Aires. Tenho interesse em remoto ou híbrido, e começo presencial se a vaga precisar.",
  "contact.downloadCv": "Baixar CV",
  "contact.whatsappMessage":
    "Olá Matías, vi seu portfólio e gostaria de conversar sobre um projeto.",
  "contact.emailSubject": "Projeto — pelo portfólio",

  "case.allProjects": "Todos os projetos",
  "case.progress": "Progresso de leitura",
  "case.problem": "O problema",
  "case.process": "O processo",
  "case.result": "O resultado",
  "case.record": "Registro",
  "case.recordIntro":
    "Desenhos, renders e fotos do processo. Toque em qualquer imagem para vê-la em tela cheia.",
  "case.takeaway": "O que ficou",
  "case.sheet": "Ficha",
  "case.next": "Próximo",
  "case.workTogether": "Vamos trabalhar juntos",
  "case.onScreen": "O produto na tela",

  "gallery.prev": "Imagem anterior",
  "gallery.next": "Próxima imagem",
  "gallery.close": "Fechar",
};

export const dictionaries: Record<Locale, Partial<Record<UiKey, string>>> = {
  es,
  en,
  pt,
};

export function translate(locale: Locale, key: UiKey): string {
  return dictionaries[locale][key] ?? es[key];
}
