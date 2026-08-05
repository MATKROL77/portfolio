# Portfolio — Matías Colimodio

Portfolio y CV de Matías Colimodio: ingeniería mecánica, diseño técnico, CAD,
prototipado, impresión 3D y productos digitales.

Sitio estático hecho con **Next.js 15 (App Router) + TypeScript + Tailwind v4 +
Framer Motion**, publicado en **Cloudflare Workers**.

---

## Cómo se corre

```bash
npm install
npm run dev
```

Queda en <http://localhost:3000>.

| Comando            | Qué hace                                                        |
| ------------------ | --------------------------------------------------------------- |
| `npm run dev`      | Servidor de desarrollo                                            |
| `npm run build`    | Build de producción y export estático a `out/`                    |
| `npm run lint`     | ESLint                                                            |
| `npm run typecheck`| TypeScript sin emitir                                             |
| `npm run assets`   | Regenera imágenes optimizadas y `src/data/assets.generated.ts`     |
| `npm run cv:pdf`   | Genera `public/cv/matias-colimodio-cv.pdf` desde la ruta `/cv`     |
| `npm run deploy`   | Build + publicación en Cloudflare                                 |

> `npm run cv:pdf` necesita el servidor de desarrollo levantado, porque imprime
> la página `/cv` con Chrome en modo headless.

---

## Cómo está organizado

```
src/
  app/                 rutas: home, /cv, /work/[slug], sitemap, robots
  components/
    hero/              galería circular de proyectos
    work/              índice, vista de caso, galería y visor a pantalla completa
    web/               ventanas de navegador, sitio en vivo y réplica de backoffice
    about/             perfil, proceso y CV
    contact/           tarjeta de cierre con WhatsApp y mail
    site/              nav, footer, fondo, revelados al hacer scroll
  data/
    portfolio.ts       ← manifiesto de proyectos (fuente de verdad)
    cv.ts              ← datos del CV
    contact.ts         ← mail, WhatsApp, LinkedIn
    backoffice-demo.ts ← datos inventados de la réplica de backoffice
    assets.generated.ts ← GENERADO, no editar a mano
  i18n/                idiomas: español (fuente), inglés y portugués
scripts/
  build_assets.py      pipeline de imágenes
  cv-pdf.ps1           generación del PDF del CV
  shot.ps1 / audit.ps1 capturas y chequeos
_source-images/        originales sin tocar (no se publica)
```

---

## Contenido

### Reemplazar una imagen

Dos caminos:

1. **Rápido:** reemplazá el archivo dentro de `public/assets/...` respetando el
   nombre. No hace falta tocar código. Si cambian las proporciones, conviene
   volver a correr `npm run assets` para actualizar el manifiesto.
2. **Completo:** dejá la imagen nueva en `_source-images/originals/`, apuntá a
   ella en el mapa `MAP` de `scripts/build_assets.py` y corré:

   ```bash
   npm run assets
   ```

   El script optimiza a WebP, topea el ancho según el rol (`hero`, `gallery`),
   calcula el color dominante y el blur placeholder, y reescribe
   `src/data/assets.generated.ts`.

Los originales nunca se modifican ni se borran: viven en `_source-images/`.

### Agregar un proyecto

1. Poné las imágenes en `_source-images/originals/` y agregalas al `MAP` con la
   carpeta `projects/<tu-slug>`.
2. `npm run assets`.
3. Agregá una entrada al array `projects` en `src/data/portfolio.ts`. El tipo
   `Project` te va a pedir todo lo necesario; `featured: true` lo suma a la
   galería del hero.
4. Si querés traducirlo, agregá el mismo `slug` en `src/i18n/content.en.ts` y
   `content.pt.ts`. Lo que falte cae automáticamente al español.

La ruta `/work/<slug>` se genera sola.

### Agregar o cambiar un sitio web

En `src/data/portfolio.ts`, array `webProducts`:

```ts
{
  slug: "brote",              // tiene que existir en backoffice-demo.ts
  publicUrl: "https://...",   // se muestra en la barra de direcciones y en el botón
  adminUrl: "https://.../admin",
  cover: "projects/brote/site-public",
  publicEmbeddable: true,     // ver abajo
}
```

Para cambiar una URL pública alcanza con editar `publicUrl` ahí.

---

## Cómo funciona el modo solo lectura

Esta es la parte que más conviene entender antes de tocarla.

**El sitio público** se muestra embebido en vivo cuando el propio sitio lo
permite. Lo decide el sitio, no este portfolio:

- `broteonline.com` no manda cabeceras que lo impidan → se embebe en vivo.
- `messa.matiascolimodio.workers.dev` manda `X-Frame-Options: DENY` y
  `frame-ancestors 'none'` → el navegador bloquea el iframe. Ahí se muestra una
  captura real del sitio y un aviso explicando por qué, más el botón para
  abrirlo en una pestaña.

Si algún día querés que MESSA también se embeba, hay que sacar esas dos
cabeceras **en el Worker de MESSA**, no acá.

El iframe va con `sandbox="allow-scripts allow-same-origin allow-popups"`: se
puede mirar, no operar. El portfolio nunca hace `POST`, `PUT`, `PATCH` ni
`DELETE` contra ningún sitio real.

**El backoffice** tiene dos modos, y el que se muestra depende de
`src/data/demo-access.ts`:

1. **Con credenciales cargadas** — se embebe el panel real y arriba aparece una
   barra con el usuario y la contraseña de la cuenta de invitado, cada uno con
   su botón de copiar. El visitante copia, entra con el formulario del propio
   panel y recorre el sistema. El portfolio nunca completa ni envía el
   formulario: sólo muestra los datos.
2. **Sin credenciales** (por defecto) — se muestra una réplica local: una
   maqueta con datos inventados que vive en `src/data/backoffice-demo.ts`, sin
   conexión con los sistemas reales y sin login.

### Para activar el acceso al panel real

```bash
npm run set-access
```

Pide la contraseña, la carga en `src/data/demo-access.ts` y no la deja en el
historial de la terminal. Después, `npm run deploy`. A partir de ahí queda
visible en el sitio, junto al usuario, con su botón de copiar.

Variantes: `npm run set-access -- brote` para un solo sitio, y
`npm run set-access -- --clear` para borrarla y volver a la réplica local.

> **Leer antes de completarlo.** Lo que se escriba ahí queda público: el sitio
> es estático y cualquiera puede abrir el código de la página y leerlo. Esa es
> la intención — que se pueda entrar a mirar —, pero exige dos cosas del lado
> del servidor:
>
> 1. Que la cuenta sea de **solo lectura de verdad**, verificado en el backend.
>    Si el rol se chequea nada más que en la interfaz, cualquiera puede
>    modificar datos reales llamando a la API a mano.
> 2. Que el panel **no muestre datos personales de clientes** con esa cuenta
>    (nombres, teléfonos, direcciones, correos). Si los muestra, conviene que la
>    cuenta de invitado vea datos de prueba.
>
> Si alguna de las dos no se cumple, dejá `enabled: false` y queda la réplica
> local, que no toca nada. Lo más prolijo a largo plazo es agregar un **modo
> demo** en las apps de BROTE y MESSA: una ruta pública con datos de ejemplo y
> la escritura deshabilitada en el servidor.

Ojo: MESSA sirve todo su dominio con `frame-ancestors 'none'`, así que su panel
no se puede embeber; se ofrece abrirlo en una pestaña con el mismo acceso.

---

## Qué es real y qué no

Todo el contenido está basado en material real. No hay clientes, premios,
métricas ni medidas inventadas.

- **Reales:** el eje lineal en CAD y las láminas de dibujo técnico, el parlante
  caracol con su electrónica, el servicio de impresión 3D, el escritorio
  construido, la señalética de BROTE, los renders, y los sitios BROTE y MESSA.
- **De demostración:** únicamente los datos que se ven dentro de la réplica de
  backoffice, marcados como tales en la propia interfaz.
- **Generado:** las texturas de fondo (madera, sombras de plantas y grano) son
  procedurales, hechas por `scripts/build_assets.py`.

Las capturas de los sitios se toman de las URLs públicas reales. Nunca de las
rutas `/admin`.

---

## Idiomas

Español (fuente), inglés y portugués de Brasil. El selector está al lado del
menú. La preferencia queda guardada en el navegador y, la primera vez, se
detecta desde el idioma del sistema.

- Textos de interfaz: `src/i18n/ui.ts`
- Contenido de proyectos y CV: `src/i18n/content.en.ts` y `content.pt.ts`

Cualquier clave que falte cae al español, así que una traducción incompleta
nunca deja un hueco en la página.

---

## Publicación

- **Repositorio:** <https://github.com/MATKROL77/portfolio>
- **Sitio:** <https://portfolio.matiascolimodio.workers.dev>

```bash
npm run deploy
```

Hace el build estático a `out/` y lo sube al Worker definido en
`wrangler.jsonc`. Requiere estar logueado:

```bash
npx wrangler login
```

---

## Trabajar desde otro dispositivo

El proyecto vive en GitHub, así que no depende de esta computadora. Desde el
celular, una tablet u otra máquina, con la misma cuenta:

1. **Claude Code en la web o en el celular** (<https://claude.ai/code>):
   conectá el repositorio `MATKROL77/portfolio` y pedí los cambios. Claude ya
   encuentra el contexto del proyecto en `CLAUDE.md`.
2. **Otra computadora:**

   ```bash
   git clone https://github.com/MATKROL77/portfolio.git
   cd portfolio
   npm install
   npm run dev
   ```

Para que los cambios queden en el sitio publicado hay que hacer commit, push y
`npm run deploy`. Si en algún momento querés que se publique solo con cada push,
se puede conectar el repositorio directamente desde el panel de Cloudflare
(Workers → el proyecto → Settings → Build).

### Qué hace falta en cada máquina

- **Node 20 o superior** para correr el sitio.
- **Python con Pillow y numpy**, sólo si vas a regenerar imágenes
  (`npm run assets`). Para editar textos no hace falta.
- **Chrome**, sólo si vas a regenerar el PDF del CV o tomar capturas.
- Para publicar: `npx wrangler login` una vez por máquina.

Las imágenes originales de `_source-images/` **no** están en el repositorio (son
pesadas y no se publican). Están sólo en esta computadora. Si vas a regenerar
assets desde otra máquina, copiá esa carpeta antes.

---

## Accesibilidad

Navegación completa por teclado, foco visible, `alt` descriptivo en todas las
imágenes, modales que se cierran con `Escape` y atrapan el foco, y respeto por
`prefers-reduced-motion`. El contenido se renderiza visible en el HTML: si el
JavaScript falla, la página se sigue leyendo.
