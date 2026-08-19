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
  "hero.roleLines": "Ingeniería mecánica|Diseño de producto|Fabricación digital",
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
  "index.title": "Todo el trabajo, en orden",
  "index.intro":
    "Cada ficha abre un caso con el problema, el proceso y el resultado. Lo conceptual está marcado como tal.",

  "web.eyebrow": "Web products",
  "web.title": "Dos productos digitales en línea",
  "web.intro":
    "Los sitios se muestran en vivo cuando el propio sitio lo permite, y el backoffice con una réplica de demostración incluida en este portfolio: sin usuario, sin contraseña y sin ninguna conexión con los sistemas en producción.",
  "web.openReal": "Abrir sitio real",
  "web.expand": "Ampliar",
  "web.publicSite": "Public site",
  "web.backoffice": "Backoffice",
  "web.backstage": "Explore backstage",
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
    "Estoy interesado en proyectos donde la ingeniería, el diseño y la tecnología puedan convertirse en soluciones reales.",
  "contact.whatsapp": "WhatsApp",
  "contact.email": "Email",
  "contact.downloadCv": "Descargar CV",
  "contact.whatsappMessage":
    "Hola Matías, vi tu portfolio y me gustaría hablar de un proyecto.",
  "contact.emailSubject": "Proyecto — desde el portfolio",

  "case.allProjects": "Todos los proyectos",
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

  "hero.roleLines": "Mechanical engineering|Product design|Digital fabrication",
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
  "index.title": "All the work, in order",
  "index.intro":
    "Each card opens a case with the problem, the process and the result. Anything conceptual is labelled as such.",

  "web.title": "Two digital products, live",
  "web.intro":
    "Each site is embedded live when the site itself allows it, and the backoffice is a demo replica built into this portfolio: no user, no password and no connection to the production systems.",
  "web.openReal": "Open the real site",
  "web.expand": "Expand",
  "web.live": "Live",
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
    "I am interested in projects where engineering, design and technology can turn into real solutions.",
  "contact.downloadCv": "Download CV",
  "contact.whatsappMessage":
    "Hi Matías, I saw your portfolio and I would like to talk about a project.",
  "contact.emailSubject": "Project — from the portfolio",

  "case.allProjects": "All projects",
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

  "hero.roleLines": "Engenharia mecânica|Design de produto|Fabricação digital",
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
  "index.title": "Todo o trabalho, em ordem",
  "index.intro":
    "Cada cartão abre um caso com o problema, o processo e o resultado. O que é conceitual está marcado como tal.",

  "web.title": "Dois produtos digitais no ar",
  "web.intro":
    "Os sites aparecem ao vivo quando o próprio site permite, e o backoffice é uma réplica de demonstração incluída neste portfólio: sem usuário, sem senha e sem nenhuma conexão com os sistemas em produção.",
  "web.openReal": "Abrir o site real",
  "web.expand": "Ampliar",
  "web.live": "Ao vivo",
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
    "Tenho interesse em projetos onde engenharia, design e tecnologia possam virar soluções reais.",
  "contact.downloadCv": "Baixar CV",
  "contact.whatsappMessage":
    "Olá Matías, vi seu portfólio e gostaria de conversar sobre um projeto.",
  "contact.emailSubject": "Projeto — pelo portfólio",

  "case.allProjects": "Todos os projetos",
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
