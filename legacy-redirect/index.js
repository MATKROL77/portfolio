/**
 * Worker de compatibilidad para la direccion anterior del portfolio.
 *
 * El sitio vivia en portfolio-matias-colimodio.matiascolimodio.workers.dev y se
 * mudo a portfolio.matiascolimodio.workers.dev. Este worker existe solo para
 * que los enlaces viejos (bookmarks, mensajes, un CV impreso) no queden rotos:
 * redirige todo, conservando la ruta y los parametros.
 *
 * Se publica con:  npm run deploy:legacy
 */

const DESTINO = "https://portfolio.matiascolimodio.workers.dev";

const worker = {
  fetch(request) {
    const url = new URL(request.url);
    const destino = new URL(url.pathname + url.search + url.hash, DESTINO);

    // 301: es una mudanza definitiva, conviene que los buscadores la registren
    // y que el navegador no vuelva a pedir esta direccion.
    return Response.redirect(destino.toString(), 301);
  },
};

export default worker;
