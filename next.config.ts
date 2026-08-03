import type { NextConfig } from "next";

/**
 * El sitio es 100% estático: no hay API routes, ni datos en servidor, ni
 * revalidación. Por eso se exporta con `output: "export"` y se publica como
 * assets en Cloudflare Workers, que es lo más simple y lo más barato de operar.
 *
 * Las cabeceras de seguridad no pueden ir acá (Next no las aplica en export):
 * viven en `public/_headers`, que Cloudflare sí respeta.
 */
const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  // el indicador flotante de dev tapa la esquina inferior izquierda
  devIndicators: false,
  // cada ruta se sirve como carpeta con index.html: evita depender de la
  // reescritura de extensiones del hosting
  trailingSlash: true,
  images: {
    // sin servidor no hay optimizador de imágenes en tiempo real. Las imágenes
    // ya salen optimizadas del pipeline (`npm run assets`): WebP, con el ancho
    // topeado según el rol y con blur placeholder incrustado.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 640, 768, 1024, 1280, 1440, 1920],
  },
};

export default nextConfig;
