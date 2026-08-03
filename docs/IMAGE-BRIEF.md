# Brief de imágenes

Guía para reemplazar las imágenes del portfolio por versiones generadas o
fotografiadas específicamente para la estética del sitio.

La arquitectura está desacoplada a propósito: **cambiar una imagen no toca una
sola línea de código**. Alcanza con dejar el archivo nuevo en la misma ruta.

---

## Cómo reemplazar

**Opción rápida.** Sobrescribí el archivo dentro de `public/assets/…`
manteniendo el nombre y la extensión. Listo.

**Opción completa** (recalcula tamaño, color dominante y blur placeholder):

1. Dejá la imagen nueva en `_source-images/originals/`.
2. En `scripts/build_assets.py`, cambiá el nombre de archivo en la fila
   correspondiente del `MAP`.
3. `npm run assets`

---

## Dirección visual común

Todo lo que se genere debería compartir estos parámetros, para que el conjunto
se lea como un mismo archivo y no como imágenes sueltas:

- **Paleta:** espresso casi negro, marrón nogal, beige cálido, marfil, verde
  musgo, oliva oscuro, detalles cobre.
- **Luz:** una sola fuente cálida, lateral y suave. Sombras largas y limpias.
- **Fondo:** neutro y oscuro, o superficie de madera. Nunca blanco puro.
- **Encuadre:** objeto centrado, con aire. Nada de recortes ajustados.
- **Nada de:** colores neón, degradados saturados, texto sobreimpreso,
  marcas de agua, interfaces genéricas de stock.

Formato de salida: **WebP** para fotos y renders opacos, **PNG** cuando haga
falta transparencia, **SVG** para planos y gráficos geométricos.

---

## Prompts por imagen

Cada bloque indica la ruta destino, la proporción y un prompt listo para pegar
en un generador de imágenes.

### Retrato

`public/assets/portrait/matias-portrait.webp` — 4:5 vertical

> Retrato editorial de un joven ingeniero, plano medio, mirando a cámara con
> gesto sereno. Luz cálida lateral que entra por una ventana, sombra de hojas
> de planta proyectada sobre una pared de textura clara. Fondo con madera
> oscura a un lado. Paleta espresso, nogal y beige. Fotografía real, lente 85 mm,
> profundidad de campo suave, sin filtros de color.

### Diseño mecánico y CAD

`public/assets/projects/mechanical-design/linear-axis-iso.png` — 16:10, **fondo transparente**

> Render técnico de un eje lineal motorizado: guía de aluminio perfilado,
> husillo trapezoidal, carro con patrón de agujeros y motor paso a paso NEMA en
> un extremo. Vista isométrica tres cuartos. Acabado aluminio anodizado mate y
> acero oscuro. Fondo completamente transparente, sin sombra de contacto, sin
> plano de apoyo. Iluminación de estudio neutra.

`public/assets/projects/mechanical-design/drawing-*.webp` — 3:4 vertical

> Lámina de dibujo técnico sobre papel color hueso, con vistas ortogonales y un
> corte, líneas finas en tinta oscura, acotación normalizada y cajetín en la
> esquina inferior derecha. Fotografiada de frente con luz cálida rasante que
> deja ver la textura del papel.

### Parlante caracol

`public/assets/projects/parlante-caracol/dock-with-phone.webp` — 16:9

> Objeto escultórico con forma de caracol impreso en 3D, superficie con la
> textura fina de las capas de impresión, en color arena. Una cavidad lateral
> sostiene un teléfono. Apoyado sobre una mesa de madera de nogal, luz cálida
> lateral, fondo oscuro desenfocado. Fotografía de producto.

`public/assets/projects/parlante-caracol/assembly-*.webp` — 4:3

> Detalle macro del interior de un objeto impreso en 3D: placa electrónica
> pequeña, batería plana y un altavoz montados sobre una base impresa de color
> grafito con ranuras de ventilación. Luz cálida rasante, fondo texturado
> oscuro. Fotografía técnica real, nítida.

### Impresión 3D y prototipado

`public/assets/projects/3d-printing/nike-outdoor.webp` — 3:4 vertical

> Réplica impresa en 3D de una escultura clásica, en blanco mate, sobre una
> columna baja, en un parque al atardecer. Luz cálida de hora dorada, fondo de
> césped y árboles desenfocados. Fotografía real.

`public/assets/projects/3d-printing/arch-model-*.webp` — 4:3

> Maqueta de arquitectura impresa en 3D en blanco mate: losas, columnas y
> escaleras de varios niveles, sobre una mesa de taller clara. Luz natural
> suave y lateral. Fotografía cenital en ángulo.

### Objetos y mobiliario

`public/assets/projects/furniture/desk-render.webp` — 3:2

> Render de un escritorio de 2400 mm: tablero de madera de nogal macizo y
> estructura de hierro negro de sección fina, con un módulo de cajones a un
> lado. Ambiente oscuro y cálido, una sola luz lateral, fondo neutro. Estilo de
> render de producto, materiales realistas.

`public/assets/projects/furniture/brote-sign-wall.webp` — 4:3

> Letras corpóreas de una marca de alimentos naturales montadas en una pared
> clara, con separación de la pared que genera sombra propia. Verde musgo y
> madera. Luz lateral cálida. Fotografía de señalética instalada.

### Renders

`public/assets/projects/renders/armchair-lamp.webp` — 16:9

> Render de interior: sillón de estructura tubular metálica con tapizado en
> tono borgoña apagado, mesa auxiliar oscura y lámpara de anillos apilados
> encendida. Ambiente nocturno, la lámpara como única fuente de luz, fondo en
> penumbra. Materiales realistas, sin saturación.

### Texturas de fondo

Las tres texturas del fondo (`walnut.webp`, `leaves.webp`, `grain.webp`) son
**procedurales**: las genera `scripts/build_assets.py`. Para cambiarlas conviene
ajustar los parámetros en la función `make_textures()` en vez de reemplazar los
archivos, así se mantienen consistentes entre sí.

---

## Reglas que conviene no romper

- **Proporciones.** Respetá la proporción indicada. Si cambia, corré
  `npm run assets` para que el manifiesto se actualice y no salte el layout.
- **Transparencias.** Los renders CAD del hero van en PNG con fondo realmente
  transparente. Un PNG con fondo blanco se va a ver como un rectángulo claro
  sobre las tarjetas oscuras.
- **Peso.** Nada por encima de ~2400 px de lado largo. El pipeline lo topea
  igual, pero mejor no cargar archivos enormes al repositorio.
- **Honestidad.** Si una imagen es generada y representa algo que no se
  fabricó, el proyecto tiene que quedar marcado como `status: "concept"` en
  `src/data/portfolio.ts`, con su `disclaimer`. No mezclar piezas reales con
  piezas ilustrativas sin aclararlo.
- **Alt text.** Cada imagen tiene su `alt` en `src/data/portfolio.ts`. Si
  cambiás lo que la imagen muestra, actualizá también el `alt` y su traducción
  en `src/i18n/content.en.ts` y `content.pt.ts`.
