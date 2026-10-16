/**
 * Trabajos web que no son un sitio embebible.
 *
 * `webProducts` (en `portfolio.ts`) asume un sitio con URL publica y un panel
 * detras, y se muestra con el navegador en vivo. Estos dos no entran ahi:
 *
 *  - INELEC es un sitio real, pero todavia no tengo su direccion publica, y un
 *    marco vacio es peor que ningun marco. Se muestra con su ficha: lo que
 *    tiene el sitio, en que idiomas y de donde es.
 *  - La farmacia no tiene sitio: es una linea de WhatsApp que contesta sola.
 *    Mostrarla dentro de un navegador seria mentir sobre que es. Se muestra
 *    como una conversacion.
 *
 * Todo lo que hay aca sale del anuncio del propio Matias: los titulares, los
 * apartados del sitio de INELEC, su ciudad y el mensaje con el que arranca la
 * conversacion de la farmacia. No se declara estado ("en produccion") de
 * ninguno de los dos, porque eso no esta confirmado.
 *
 * El telefono de la farmacia se ve en el anuncio y NO se publica aca: es una
 * linea de un cliente, no un dato del portfolio.
 */

export type WebWork = {
  slug: string;
  name: string;
  /** que fue lo que hizo */
  role: string;
  /** el titular, tal como lo dice el anuncio */
  claim: string;
  blurb: string;
  /** lo que el trabajo incluye */
  highlights: string[];
  theme: { wash: string; accent: string; mood: string };
  /** la conversacion, para los trabajos que son una automatizacion */
  chat?: { from: "client" | "bot"; text: string }[];
  /** pie de la seccion: una aclaracion honesta sobre lo que se esta viendo */
  note?: string;
};

export const webWorks: WebWork[] = [
  {
    slug: "inelec",
    name: "INELEC",
    role: "Diseño y desarrollo",
    claim: "Un taller industrial, con la cara que su trabajo merece.",
    blurb:
      "Reparación integral de transformadores rurales y de distribución, en Mercedes, provincia de Buenos Aires. Un sitio sobrio y técnico, donde cada sección responde una pregunta que el cliente industrial hace antes de llamar.",
    highlights: [
      "Servicios",
      "Proceso",
      "El equipo",
      "Ensayos",
      "Presupuesto",
      "Contacto",
      "Español e inglés",
    ],
    // Un gris frio contra el marron de la pagina: el tramo cambia de clima sin
    // meter un color que la marca no tiene.
    theme: { wash: "#121820", accent: "#c87f4a", mood: "Industrial, preciso" },
  },
  {
    slug: "farmacia-gualtieri",
    name: "Farmacia Gualtieri",
    role: "Automatización con IA",
    claim: "WhatsApp con IA que responde por vos.",
    blurb:
      "Una farmacia recibe la misma pregunta cien veces por día: si tienen un medicamento. La línea de WhatsApp contesta sola, a cualquier hora, y sólo escala a una persona cuando hace falta.",
    highlights: [
      "Responde sin horario",
      "Consultas de disponibilidad",
      "Deriva a una persona",
    ],
    theme: { wash: "#16271b", accent: "#5fc37f", mood: "Atiende a toda hora" },
    chat: [
      {
        from: "client",
        text: "Hola, quería consultar si tienen disponible el siguiente medicamento:",
      },
    ],
    note: "La conversación es la del anuncio: el mensaje con el que un cliente abre el chat, y la línea respondiendo.",
  },
];
