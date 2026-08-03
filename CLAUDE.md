# Contexto del proyecto

Portfolio y CV de **Matías Colimodio** (matiascolimodio@gmail.com).
Next.js 15 App Router + TypeScript + Tailwind v4 + Framer Motion, exportado
como sitio estático y publicado en Cloudflare Workers.

Leé también `README.md`: ahí está el detalle de comandos y de cómo agregar
contenido.

## Reglas de este repositorio

- **El contenido no se inventa.** No agregar clientes, premios, métricas, años
  ni medidas que no estén respaldados por el CV (`src/data/cv.ts`) o por el
  material de `_source-images/`. Si algo es conceptual, marcarlo con
  `status: "concept"` y explicarlo en `disclaimer`.
- **Nunca poner credenciales en el frontend.** Todo lo que esté en el código de
  la página es público. El backoffice del sitio es una réplica local con datos
  inventados (`src/data/backoffice-demo.ts`), a propósito. Ver la sección "Cómo
  funciona el modo solo lectura" del README.
- **Nunca hacer escrituras contra los sitios reales** de BROTE o MESSA. Sólo
  `GET` a las URLs públicas, nunca a `/admin`.
- **No borrar ni modificar `_source-images/`.** Son los originales; el pipeline
  sólo lee de ahí.
- `src/data/assets.generated.ts` es generado: se regenera con `npm run assets`,
  no se edita a mano.
- El español es el idioma fuente. Al cambiar un texto en `src/data/`, revisar si
  corresponde actualizar `src/i18n/content.en.ts` y `content.pt.ts`.

## Dónde tocar cada cosa

| Quiero cambiar…                | Archivo                              |
| ------------------------------ | ------------------------------------ |
| Un proyecto, su texto o su ficha | `src/data/portfolio.ts`            |
| El CV (educación, experiencia)  | `src/data/cv.ts`                    |
| Mail, WhatsApp, LinkedIn        | `src/data/contact.ts`               |
| Textos de botones y secciones   | `src/i18n/ui.ts`                    |
| Traducciones de contenido       | `src/i18n/content.{en,pt}.ts`       |
| Paleta, tipografía, radios      | `src/app/globals.css`               |
| El fondo con texturas           | `src/components/site/AmbientBackdrop.tsx` |
| Qué imagen va en qué proyecto   | `MAP` en `scripts/build_assets.py`  |

## Antes de dar algo por terminado

```bash
npm run typecheck
npm run lint
npm run build
```

Si tocaste algo visual, verificalo en el navegador antes de cerrar. Hay un
script de capturas: `powershell -File scripts/shot.ps1 -Url http://localhost:3000 -Out out.png -Width 1440 -Height 900`.

## Entorno

- Windows. La shell por defecto es PowerShell.
- El pipeline de imágenes usa Python con Pillow y numpy.
- El PDF del CV y las capturas usan Chrome en modo headless.
