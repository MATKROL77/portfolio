# -*- coding: utf-8 -*-
"""
Pipeline de assets del portfolio.

Lee las imagenes originales (nunca las modifica), las clasifica segun el mapa de
abajo, genera versiones optimizadas en public/assets/** y escribe un manifiesto
tipado en src/data/assets.generated.ts con dimensiones reales y blur placeholder.

Uso:  npm run assets
"""

import base64
import io
import json
import math
import os
import random
import shutil

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "_source-images", "originals")
PUB = os.path.join(ROOT, "public", "assets")
DATA = os.path.join(ROOT, "src", "data")
DOCS = os.path.join(ROOT, "docs", "reference")

# Ancho maximo por rol. next/image se encarga del resto de los tamanos.
MAX_W = {"hero": 2400, "gallery": 1600, "thumb": 900}

# ---------------------------------------------------------------------------
# Mapa de clasificacion: archivo original -> (carpeta, nombre, rol, formato)
# formato: "webp" | "png-cutout" (recorta el fondo blanco a transparencia)
# ---------------------------------------------------------------------------
CAPTURES = os.path.join(ROOT, "_source-images", "captures")

SEARCH_DIRS = [SRC, CAPTURES]


def resolve(filename):
    """Ubica un archivo fuente en originals/ o en captures/."""
    for folder in SEARCH_DIRS:
        candidate = os.path.join(folder, filename)
        if os.path.isfile(candidate):
            return candidate
    raise SystemExit("No se encontro el archivo fuente: %s" % filename)


MAP = [
    # --- retrato ---------------------------------------------------------
    # YO.jpg es el retrato principal: mismo clima que el sitio (madera, sombra
    # de plantas, luz calida). El anterior queda como alternativo.
    # Las demas fotos personales del archivo quedan fuera por decision del autor.
    ("YO.jpg", "portrait", "matias-portrait", "hero", "webp"),
    ("matias-portrait-4k.png", "portrait", "matias-portrait-alt", "hero", "webp"),

    # --- Parlante caracol (marca KROL) -----------------------------------
    # KROL es la firma que Matias graba en sus piezas, no el nombre del
    # producto: el proyecto es el parlante con forma de caracol.
    ("b959949a-7741-4abb-94ef-5a099ae8bdda.jpg", "projects/parlante-caracol", "dock-with-phone", "hero", "webp"),
    ("e5984c0c-7433-4314-b53f-0b0bcbab1aed.jpg", "projects/parlante-caracol", "render-branded", "gallery", "webp"),
    ("2263148f-2b44-435a-ae04-7ad244f0361e.jpg", "projects/parlante-caracol", "render-form-01", "gallery", "webp"),
    ("491a7741-32ff-4260-a917-b4c3b23b9258.jpg", "projects/parlante-caracol", "render-form-02", "gallery", "webp"),
    ("82d2fdb1-7379-40cc-a9e8-06ad12f2e4f1.jpg", "projects/parlante-caracol", "render-form-03", "gallery", "webp"),
    ("942143fc-053c-49df-93e5-74918d6ef770.jpg", "projects/parlante-caracol", "render-form-04", "gallery", "webp"),
    ("9b500ba7-8495-42bc-a9aa-2e9ee7cc0b03.jpg", "projects/parlante-caracol", "render-form-05", "gallery", "webp"),
    ("b0a2d950-2b8d-4d18-b7b8-0e5d6d001bd1.jpg", "projects/parlante-caracol", "render-detail", "gallery", "webp"),
    ("f94683a2-0b84-4d5d-8f6a-ceda29e5d6c3.jpg", "projects/parlante-caracol", "render-form-06", "gallery", "webp"),
    ("7c1a3358-1950-42df-8b37-a35917f0762c.jpg", "projects/parlante-caracol", "assembly-full", "gallery", "webp"),
    ("38fead71-3d62-4123-abb3-851c07423552.jpg", "projects/parlante-caracol", "assembly-pcb", "gallery", "webp"),
    ("599d5430-150d-4896-b258-2f82254262b7.jpg", "projects/parlante-caracol", "assembly-speaker", "gallery", "webp"),
    ("80d4e23d-1f3b-41eb-b0fa-8280031b7fd4.jpg", "projects/parlante-caracol", "plate-usb-magnets", "gallery", "webp"),
    ("c6813d7e-86d3-43dd-9249-95afd1ac9a7f.jpg", "projects/parlante-caracol", "plate-switch", "gallery", "webp"),
    ("5c59584a-be83-4732-9574-11c7e1a4c3c9.jpg", "projects/parlante-caracol", "enclosure-frame", "gallery", "webp"),
    ("9d90365a-1a41-434c-af4a-faefcdbae0d6.jpg", "projects/parlante-caracol", "plate-slots", "gallery", "webp"),
    ("033b0e53-f728-426d-96a0-975de35cd3b6.jpg", "projects/parlante-caracol", "board-mounted", "gallery", "webp"),
    ("62371683-12da-41a4-a676-7272effc7957.jpg", "projects/parlante-caracol", "plate-slots-alt", "gallery", "webp"),
    ("71020e41-6e13-4a79-8a81-4618dc044692.jpg", "projects/parlante-caracol", "plate-engraved", "gallery", "webp"),

    # --- Diseno mecanico y CAD -------------------------------------------
    ("1776398171651.jpg", "projects/mechanical-design", "linear-axis-iso", "hero", "png-cutout"),
    ("1776398171836.jpg", "projects/mechanical-design", "linear-axis-iso-alt", "gallery", "png-cutout"),
    ("1776398171475.jpg", "projects/mechanical-design", "linear-axis-top", "gallery", "png-cutout"),
    ("1776398171634.jpg", "projects/mechanical-design", "linear-axis-front", "gallery", "png-cutout"),
    ("1776398171657.jpg", "projects/mechanical-design", "linear-axis-side", "gallery", "png-cutout"),
    ("1776398171666.jpg", "projects/mechanical-design", "linear-axis-section", "gallery", "png-cutout"),
    ("f4432916-8871-419f-919e-3826051eedd0.jpg", "projects/mechanical-design", "drawing-section", "gallery", "webp"),
    ("f0f5c8f8-9a52-4f92-a8e7-8d2328277f01.jpg", "projects/mechanical-design", "drawing-shaft", "gallery", "webp"),
    ("66cdb44e-c7e1-4797-95d8-607658ec4d80.jpg", "projects/mechanical-design", "drawing-joint", "gallery", "webp"),
    ("67f6238c-b4a6-4dd1-b496-058dbd360738.jpg", "projects/mechanical-design", "drawing-assembly", "gallery", "webp"),
    ("4ed18a26-55a6-46e9-b365-a1535837ca4b.jpg", "projects/mechanical-design", "drawing-valve", "gallery", "webp"),
    ("46db10c6-4eb7-444e-959f-6d9bc76a5465.jpg", "projects/mechanical-design", "drawing-views-01", "gallery", "webp"),
    ("4a038ca8-0f88-441d-a08c-a6fc13026bb3.jpg", "projects/mechanical-design", "drawing-views-02", "gallery", "webp"),
    ("17906446-15a4-4f0e-aaf3-aa0f0113d870.jpg", "projects/mechanical-design", "drawing-views-03", "gallery", "webp"),
    ("43314028-2b10-4939-9a76-d16dee267c4d.jpg", "projects/mechanical-design", "drawing-revolution", "gallery", "webp"),

    # --- Impresion 3D y prototipado --------------------------------------
    ("a25eba60-4034-4a0d-95f4-cda7cc18daa3.jpg", "projects/3d-printing", "nike-outdoor", "hero", "webp"),
    ("002f6538-dadc-4878-9a38-26cde3bf4253.jpg", "projects/3d-printing", "nike-outdoor-alt", "gallery", "webp"),
    ("61634a2e-dbd1-4207-adaf-c40995ed287b.jpg", "projects/3d-printing", "nike-red-base", "gallery", "webp"),
    # la foto de la impresora es la replica de la Nike saliendo de la maquina,
    # no la carcasa del parlante: va con el resto de la replica.
    ("d4deeddf-e15a-4172-9743-450a3811e940.jpg", "projects/3d-printing", "nike-printing", "gallery", "webp"),
    ("39ff6257-c83e-4ef5-b0b4-fb20825480c1.jpg", "projects/3d-printing", "shelf-decor", "gallery", "webp"),
    ("6a00a939-5ede-4f03-b12a-bfc468ff1e55.jpg", "projects/3d-printing", "caliper-case-open", "gallery", "webp"),
    # es el mismo estuche cerrado, no una pieza del diseno mecanico
    ("675c35bd-8a70-479e-99f3-cc5261292e9e.jpg", "projects/3d-printing", "caliper-case-closed", "gallery", "webp"),
    ("f619d0e7-a99a-45f8-8c4e-e00f5026d27c.jpg", "projects/3d-printing", "arch-model-01", "gallery", "webp"),
    ("e1e89906-e6a3-4be1-99d0-d8f3cc7f0929.jpg", "projects/3d-printing", "arch-model-02", "gallery", "webp"),
    ("55aba7ba-af84-450b-a278-ed9c1362c165.jpg", "projects/3d-printing", "arch-model-03", "gallery", "webp"),
    ("faa30bf2-dda2-4e58-b1c3-bb059cc50c85.jpg", "projects/3d-printing", "arch-model-04", "gallery", "webp"),

    # --- Objetos y mobiliario --------------------------------------------
    # Incluye la senaletica de BROTE: son objetos fabricados, no parte del
    # producto digital de la marca.
    ("88ba1546-f88c-4e7f-9a0d-efb321f03e97.jpg", "projects/furniture", "desk-render", "hero", "webp"),
    ("2bfcbbb7-a3b1-4b7c-8639-a2bed3503ee2.jpg", "projects/furniture", "desk-render-dark", "gallery", "webp"),
    ("6b3b070a-8f1a-4ac4-83bc-92ffa8f8dda2.jpg", "projects/furniture", "desk-built", "gallery", "webp"),
    ("25091cf8-b40f-4ef2-89ef-1bb625c2336c.jpg", "projects/furniture", "desk-dimensions", "gallery", "webp"),
    ("4dcc9682-6d8a-4151-b298-5b682b7988f9.jpg", "projects/furniture", "desk-dimensions-alt", "gallery", "webp"),
    ("76c83dc1-f4d0-438d-8d2a-bb77e9b85ce5.jpg", "projects/furniture", "drawer-unit-dimensions", "gallery", "webp"),
    ("0ffeb41b-f50b-49f5-a29f-251127a2d8bd.jpg", "projects/furniture", "shelf-dimensions", "gallery", "webp"),
    ("fd4acea0-597d-4587-8429-0ab239b61c8b.jpg", "projects/furniture", "brote-sign-wall", "gallery", "webp"),
    ("10161431-65ff-4f84-a7bc-0382d57534de.jpg", "projects/furniture", "brote-sign-concrete", "gallery", "webp"),
    ("3b0a7594-1a02-43af-b3db-1ab29a72df56.jpg", "projects/furniture", "brote-sign-angle", "gallery", "webp"),
    ("43487957-0495-467e-aad2-665e2a93b6aa.jpg", "projects/furniture", "brote-sign-banner", "gallery", "webp"),
    ("b64bbf5e-de61-4c0d-84b6-53a7a946c097.jpg", "projects/furniture", "brote-sign-grass", "gallery", "webp"),
    ("bf82c7a1-b03a-453d-999f-aa179621af79.jpg", "projects/furniture", "brote-corners", "gallery", "webp"),
    ("799ca26d-c78a-4acb-8749-ce7aee672c3c.jpg", "projects/furniture", "brote-corners-alt", "gallery", "webp"),
    ("212bf4db-1f5c-4d34-9366-2e81d4b46390.jpg", "projects/furniture", "brote-framed-piece", "gallery", "webp"),
    # la mesa de taller con los marcos dorados y la bellota es el proceso de las
    # piezas de BROTE, no del servicio general de impresion 3D.
    ("a989df52-5206-4e23-bdcf-d4a48b5b4001.jpg", "projects/furniture", "brote-workshop", "gallery", "webp"),

    # --- Renders (visualizacion 3D) --------------------------------------
    ("669a8777-c280-49ce-9a1e-1948c8261a14.jpg", "projects/renders", "armchair-lamp", "hero", "webp"),
    ("5d77ea84-0125-49cc-827b-48f5d63fffbf.jpg", "projects/renders", "armchair-detail", "gallery", "webp"),
    ("74e66ecf-0837-4589-9824-1ab503a82ee4.jpg", "projects/renders", "armchair-top", "gallery", "webp"),
    ("c567153a-24f3-4d7d-a5f2-bd75a95de229.jpg", "projects/renders", "armchair-iso", "gallery", "webp"),
    ("bae61e4d-7aab-439a-94db-7d0b01ec151c.jpg", "projects/renders", "lamp-sidetable", "gallery", "webp"),
    ("0228fe39-39cf-404b-8414-31f8ce3d181c.jpg", "projects/renders", "lamp-scene", "gallery", "webp"),
    ("7160a916-397d-46cf-a666-e99e5a53ecc7.jpg", "projects/renders", "lamp-detail", "gallery", "webp"),
    ("e8436bad-ad1e-44f2-808a-ae26848041a7.jpg", "projects/renders", "lounge-scene", "gallery", "webp"),
    ("2fa5fb76-31a1-4e12-a606-0c29fa62030f.jpg", "projects/renders", "anatomical-brain", "gallery", "webp"),
    ("175f8328-eeb5-44e9-9e40-0021d9d2ec05.jpg", "projects/renders", "anatomical-brain-detail", "gallery", "webp"),

    # --- Productos web: capturas de los sitios publicos reales ------------
    # Se capturan solo las URLs publicas, nunca los /admin.
    ("brote-site.png", "projects/brote", "site-public", "hero", "webp"),
    ("messa-site.png", "projects/messa", "site-public", "hero", "webp"),
]

# Imagenes descartadas a proposito (encuadre debil / duplicado / referencia):
#  21, 72  -> selfies informales, no tienen calidad de portfolio
#  64      -> download.png es la referencia de diseno, va a docs/reference
SKIP_NOTE = {
    "3cd380fc-b73a-46f5-bc99-107a9ca869d9.jpg": "selfie informal",
    "fa79373a-a6c1-4a73-82e2-cfeea49fb68d.jpg": "selfie informal",
    "b46924a8-fbad-49f3-923b-648a447bda35.jpg": "foto de traje, descartada por el autor",
    "download.png": "referencia de diseno",
}


# ---------------------------------------------------------------------------
# Utilidades
# ---------------------------------------------------------------------------
def lqip(im, size=16):
    """Genera un data URL diminuto para usar como placeholder blur."""
    tiny = im.copy()
    tiny.thumbnail((size, size))
    if tiny.mode not in ("RGB", "RGBA"):
        tiny = tiny.convert("RGB")
    buf = io.BytesIO()
    tiny.convert("RGB").save(buf, format="WEBP", quality=40)
    return "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode("ascii")


def dominant(im):
    """Color dominante aproximado, para fondos mientras carga."""
    small = im.convert("RGB").resize((1, 1), Image.LANCZOS)
    r, g, b = small.getpixel((0, 0))
    return "#%02x%02x%02x" % (r, g, b)


def _border_connected(mask):
    """True donde `mask` esta conectado al borde de la imagen (4-vecinos)."""
    h, w = mask.shape
    out = np.zeros_like(mask)
    frontier = np.zeros_like(mask)
    frontier[0, :] = mask[0, :]
    frontier[-1, :] = mask[-1, :]
    frontier[:, 0] = mask[:, 0]
    frontier[:, -1] = mask[:, -1]
    out |= frontier
    while frontier.any():
        grown = np.zeros_like(mask)
        grown[1:, :] |= out[:-1, :]
        grown[:-1, :] |= out[1:, :]
        grown[:, 1:] |= out[:, :-1]
        grown[:, :-1] |= out[:, 1:]
        frontier = grown & mask & ~out
        out |= frontier
    return out


def _clean_blobs(fg, min_area=120, thin_px=3, thin_len=60):
    """Descarta componentes espurios del recorte.

    Saca dos cosas que el umbral no distingue de la pieza:
      * motas sueltas del grid, mas chicas que `min_area`,
      * lineas filiformes (los ejes del viewport), que son largas pero de 1-3 px.
    """
    h, w = fg.shape
    labels = np.zeros((h, w), dtype=np.int32)
    parent = [0]

    def find(a):
        while parent[a] != a:
            parent[a] = parent[parent[a]]
            a = parent[a]
        return a

    def union(a, b):
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[max(ra, rb)] = min(ra, rb)

    # pasada 1: etiquetado por scanline con union-find
    for y in range(h):
        row, prev = fg[y], fg[y - 1] if y else None
        lrow, lprev = labels[y], labels[y - 1] if y else None
        for x in range(w):
            if not row[x]:
                continue
            left = lrow[x - 1] if x and row[x - 1] else 0
            up = lprev[x] if y and prev[x] else 0
            if left and up:
                lrow[x] = min(left, up)
                union(left, up)
            elif left or up:
                lrow[x] = left or up
            else:
                parent.append(len(parent))
                lrow[x] = len(parent) - 1

    # pasada 2: resolver raices y medir area + bounding box de cada componente
    flat = labels.ravel()
    roots = np.array([find(i) for i in range(len(parent))], dtype=np.int32)
    resolved = roots[flat]
    n = int(resolved.max()) + 1
    counts = np.bincount(resolved, minlength=n)

    ys, xs = np.divmod(np.arange(h * w), w)
    big = np.iinfo(np.int32).max
    x0 = np.full(n, big, dtype=np.int32)
    x1 = np.full(n, -1, dtype=np.int32)
    y0 = np.full(n, big, dtype=np.int32)
    y1 = np.full(n, -1, dtype=np.int32)
    np.minimum.at(x0, resolved, xs)
    np.maximum.at(x1, resolved, xs)
    np.minimum.at(y0, resolved, ys)
    np.maximum.at(y1, resolved, ys)
    bw, bh = x1 - x0 + 1, y1 - y0 + 1

    thin = (np.minimum(bw, bh) <= thin_px) & (np.maximum(bw, bh) >= thin_len)
    keep = (counts >= min_area) & ~thin
    keep[0] = False
    return keep[resolved].reshape(h, w)


def cutout_white(im, lum_seed=222, lum_grow=207, sat_max=34):
    """Recorta el fondo de un render CAD (viewport de Fusion) a transparencia.

    El fondo no es blanco puro: tiene un grid tenue, ejes de color y una sombra
    de contacto muy clara. El recorte va en tres pasos:
      1. semilla: pixeles claros y poco saturados conectados al borde,
      2. crecimiento: la semilla se expande sobre grises claros vecinos, lo que
         se come la sombra pero se frena en el contorno oscuro de la pieza,
      3. limpieza: se descartan los blobs minusculos que deja el grid.
    """
    im = im.convert("RGB")
    # int32: los coeficientes de luminancia desbordan int16 (255*587 > 32767)
    a = np.asarray(im).astype(np.int32)
    lum = (a[..., 0] * 299 + a[..., 1] * 587 + a[..., 2] * 114) // 1000
    sat = a.max(axis=2) - a.min(axis=2)

    seed = (lum >= lum_seed) & (sat <= sat_max)
    # el crecimiento ignora la saturacion a proposito: asi tambien se come las
    # lineas de eje de color que cruzan el viewport de lado a lado.
    growable = lum >= lum_grow

    # las capturas traen un borde oscuro de 1px, asi que se agrega un marco
    # propio para que el fondo siempre quede conectado al exterior
    seed_p = np.pad(seed, 1, constant_values=True)
    grow_p = np.pad(growable, 1, constant_values=True)
    bg = _border_connected(seed_p)

    # crecimiento restringido: solo avanza sobre pixeles "growable"
    while True:
        grown = np.zeros_like(bg)
        grown[1:, :] |= bg[:-1, :]
        grown[:-1, :] |= bg[1:, :]
        grown[:, 1:] |= bg[:, :-1]
        grown[:, :-1] |= bg[:, 1:]
        nxt = grown & grow_p & ~bg
        if not nxt.any():
            break
        bg |= nxt

    fg = _clean_blobs(~bg[1:-1, 1:-1])

    # rampa final: lo que quedo casi blanco (el plano base del viewport y su
    # sombra) se desvanece; la pieza, que no pasa de ~215 de luminancia, no se toca
    ramp = np.clip((232 - lum) / 20.0, 0.0, 1.0)
    alpha_arr = (fg * ramp * 255).astype(np.uint8)

    out = im.convert("RGBA")
    alpha = Image.fromarray(alpha_arr, mode="L").filter(ImageFilter.GaussianBlur(0.7))
    out.putalpha(alpha)
    box = out.getbbox()
    return out.crop(box) if box else out


def _fbm(shape, octaves=5, seed=3):
    """Ruido fractal simple: varias capas de ruido cada vez mas fino."""
    rng = np.random.default_rng(seed)
    h, w = shape
    total = np.zeros(shape, dtype=np.float32)
    amplitude = 1.0
    norm = 0.0
    for octave in range(octaves):
        size = 2 ** (octave + 2)
        base = rng.random((size, size)).astype(np.float32)
        layer = np.asarray(
            Image.fromarray((base * 255).astype(np.uint8)).resize((w, h), Image.BICUBIC),
            dtype=np.float32,
        ) / 255.0
        total += layer * amplitude
        norm += amplitude
        amplitude *= 0.5
    return total / norm


def make_textures():
    """Genera las texturas de fondo: madera, sombras de plantas y grano.

    Son procedurales a proposito: pesan poco, no dependen de ningun archivo
    externo y se pueden regenerar cambiando estos parametros.
    """
    tex_dir = os.path.join(PUB, "textures")
    os.makedirs(tex_dir, exist_ok=True)
    random.seed(7)

    # --- veta de madera de nogal -------------------------------------------
    w, h = 1200, 1200
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)

    warp = _fbm((h, w), octaves=5, seed=11)
    # las lineas de veta se curvan siguiendo el ruido: sin eso parecen rayas
    rings = np.sin((xx * 0.035) + warp * 26.0 + np.sin(yy * 0.004) * 3.0)
    rings = (rings * 0.5 + 0.5) ** 2.2

    fibre = _fbm((h, w), octaves=6, seed=23)
    grain_fine = np.asarray(
        Image.fromarray(
            (np.random.default_rng(5).random((h, w)) * 255).astype(np.uint8)
        ).filter(ImageFilter.GaussianBlur(0.6)),
        dtype=np.float32,
    ) / 255.0

    value = 0.60 * rings + 0.28 * fibre + 0.12 * grain_fine

    # juntas verticales entre tablas
    plank = ((xx // 300) % 2) * 0.03
    seam = np.exp(-(((xx % 300) - 0) ** 2) / 40.0) * 0.25
    value = np.clip(value + plank - seam, 0.0, 1.0)

    dark = np.array([28, 20, 16], dtype=np.float32)
    light = np.array([104, 70, 46], dtype=np.float32)
    wood_rgb = dark + (light - dark) * value[..., None]
    wood = Image.fromarray(wood_rgb.astype(np.uint8), mode="RGB")
    wood.save(os.path.join(tex_dir, "walnut.webp"), quality=80, method=6)

    # --- sombras de plantas -------------------------------------------------
    # Hojas alargadas colgando desde arriba, difuminadas como una sombra real.
    lw, lh = 1400, 1000
    leaves = Image.new("L", (lw, lh), 0)
    draw = ImageDraw.Draw(leaves)
    rng = random.Random(19)

    def leaf(cx, cy, length, width, angle, value=255):
        """Hoja lanceolada: dos arcos que se encuentran en las puntas."""
        steps = 26
        left, right = [], []
        for i in range(steps + 1):
            t = i / steps
            # ancho maximo cerca del centro, puntas afiladas en los extremos
            spread = math.sin(math.pi * t) ** 0.8 * width / 2
            along = (t - 0.5) * length
            ca, sa = math.cos(angle), math.sin(angle)
            left.append((cx + along * ca - spread * sa, cy + along * sa + spread * ca))
            right.append((cx + along * ca + spread * sa, cy + along * sa - spread * ca))
        draw.polygon(left + right[::-1], fill=value)

    def frond(ox, oy, direction, count, spread, length, width):
        """Racimo de hojas saliendo de un mismo punto, como una rama."""
        for i in range(count):
            t = (i / max(count - 1, 1)) - 0.5
            ang = math.radians(direction + t * spread + rng.uniform(-6, 6))
            ln = int(length * rng.uniform(0.72, 1.15))
            wd = int(width * rng.uniform(0.7, 1.2))
            # la hoja nace en el punto de origen, no lo cruza
            cx = ox + math.cos(ang) * ln / 2
            cy = oy + math.sin(ang) * ln / 2
            leaf(cx, cy, ln, wd, ang)

    # ramas entrando desde arriba, que es de donde caeria la luz
    frond(120, -60, 70, 7, 90, 430, 58)
    frond(-40, 190, 30, 5, 70, 380, 52)
    frond(1330, -40, 115, 7, 95, 440, 60)
    frond(1440, 240, 150, 5, 70, 360, 54)
    # mata baja, mas chica
    frond(1010, 1080, 285, 6, 80, 330, 50)
    frond(320, 1060, 265, 4, 60, 280, 46)

    leaves = leaves.filter(ImageFilter.GaussianBlur(13))
    leaves.save(os.path.join(tex_dir, "leaves.webp"), quality=76, method=6)

    # --- grano monocromo para overlay --------------------------------------
    g = Image.new("L", (256, 256))
    gp = g.load()
    for y in range(256):
        for x in range(256):
            gp[x, y] = random.randint(96, 160)
    g.convert("RGB").save(os.path.join(tex_dir, "grain.webp"), quality=60, method=6)

    return [
        "/assets/textures/walnut.webp",
        "/assets/textures/leaves.webp",
        "/assets/textures/grain.webp",
    ]


def _font(size, bold=False):
    """Busca una tipografia del sistema; cae a la de PIL si no hay ninguna."""
    candidates = ["segoeuib.ttf", "arialbd.ttf"] if bold else ["segoeui.ttf", "arial.ttf"]
    for name in candidates:
        try:
            return ImageFont.truetype(name, size)
        except Exception:
            continue
    return ImageFont.load_default()


def make_og_image():
    """Imagen de Open Graph (1200x630), con el mismo clima que el sitio."""
    w, h = 1200, 630
    og = Image.new("RGB", (w, h), (17, 17, 15))

    # degradado calido desde arriba a la izquierda
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    d = np.sqrt(((xx - w * 0.18) / (w * 0.95)) ** 2 + ((yy + h * 0.25) / (h * 1.5)) ** 2)
    glow = np.clip(1.0 - d, 0.0, 1.0) ** 1.8
    base = np.array([17, 17, 15], dtype=np.float32)
    warm = np.array([58, 41, 30], dtype=np.float32)
    og = Image.fromarray(
        (base + (warm - base) * glow[..., None]).astype(np.uint8), mode="RGB"
    )

    # madera abajo y hojas arriba, en muy baja intensidad
    tex_dir = os.path.join(PUB, "textures")
    wood = Image.open(os.path.join(tex_dir, "walnut.webp")).convert("RGB").resize((w, h))
    og = Image.blend(og, wood, 0.10)

    leaves = Image.open(os.path.join(tex_dir, "leaves.webp")).convert("L").resize((w, h))
    shadow = Image.new("RGB", (w, h), (0, 0, 0))
    og = Image.composite(Image.blend(og, shadow, 0.55), og, leaves.point(lambda v: v // 2))

    draw = ImageDraw.Draw(og)
    draw.text((80, 150), "MATÍAS COLIMODIO", font=_font(30), fill=(203, 187, 165))
    draw.text((80, 210), "ENGINEERING /", font=_font(78, bold=True), fill=(238, 230, 216))
    draw.text((80, 300), "DESIGN /", font=_font(78, bold=True), fill=(238, 230, 216))
    draw.text((80, 390), "FABRICATION", font=_font(78, bold=True), fill=(238, 230, 216))
    draw.line([(80, 505), (150, 505)], fill=(181, 139, 93), width=3)
    draw.text(
        (80, 530),
        "Solving problems. Building things that last.",
        font=_font(26),
        fill=(203, 187, 165),
    )

    out = os.path.join(ROOT, "src", "app", "opengraph-image.png")
    og.save(out, format="PNG", optimize=True)
    return out


# ---------------------------------------------------------------------------
# Proceso principal
# ---------------------------------------------------------------------------
def main():
    if not os.path.isdir(SRC):
        raise SystemExit("No se encontraron originales en %s" % SRC)

    # Se anota lo que este mapa genera para poder borrar despues lo que sobra.
    # Sin esto, reclasificar una imagen deja el archivo viejo dando vueltas en
    # public/assets: no se ve en el sitio pero infla el repo y confunde.
    expected = set()
    for _, folder, name, _, fmt in MAP:
        ext = "png" if fmt == "png-cutout" else "webp"
        expected.add(os.path.join(PUB, folder.replace("/", os.sep), "%s.%s" % (name, ext)))

    manifest = {}
    for src_name, folder, name, role, fmt in MAP:
        src_path = resolve(src_name)
        out_dir = os.path.join(PUB, folder.replace("/", os.sep))
        os.makedirs(out_dir, exist_ok=True)

        im = Image.open(src_path)
        im = im.convert("RGBA") if fmt == "png-cutout" else im.convert("RGB")

        if fmt == "png-cutout":
            im = cutout_white(im)
            ext = "png"
        else:
            ext = "webp"

        max_w = MAX_W[role]
        if im.width > max_w:
            ratio = max_w / float(im.width)
            im = im.resize((max_w, int(im.height * ratio)), Image.LANCZOS)

        out_name = "%s.%s" % (name, ext)
        out_path = os.path.join(out_dir, out_name)
        if ext == "png":
            im.save(out_path, format="PNG", optimize=True)
        else:
            im.save(out_path, format="WEBP", quality=86, method=6)

        key = "%s/%s" % (folder, name)
        manifest[key] = {
            "src": "/assets/%s/%s" % (folder, out_name),
            "width": im.width,
            "height": im.height,
            "blurDataURL": lqip(im),
            "color": dominant(im),
            "origin": src_name,
        }
        print("ok  %-46s %5dx%-5d  <- %s" % (key, im.width, im.height, src_name))

    # limpieza: fuera lo que ya no esta en el mapa (las texturas quedan aparte)
    removed = 0
    for folder in ("portrait", "projects"):
        root = os.path.join(PUB, folder)
        for dirpath, _, filenames in os.walk(root):
            for filename in filenames:
                path = os.path.join(dirpath, filename)
                if path not in expected:
                    os.remove(path)
                    removed += 1
                    print("--  huerfano eliminado: %s" % os.path.relpath(path, PUB))
    # y las carpetas que quedaron vacias
    for dirpath, dirnames, filenames in os.walk(os.path.join(PUB, "projects"), topdown=False):
        if not dirnames and not filenames:
            os.rmdir(dirpath)
    if removed:
        print("--  %d archivos huerfanos borrados" % removed)

    textures = make_textures()
    print("ok  texturas procedurales: %s" % ", ".join(textures))

    og = make_og_image()
    print("ok  imagen de Open Graph: %s" % os.path.relpath(og, ROOT))

    # copia la referencia de diseno a docs (no se publica en public/)
    os.makedirs(DOCS, exist_ok=True)
    for filename, note in SKIP_NOTE.items():
        if note == "referencia de diseno":
            shutil.copyfile(resolve(filename), os.path.join(DOCS, "design-reference.png"))

    # escribe el manifiesto tipado
    os.makedirs(DATA, exist_ok=True)
    header = (
        "// ARCHIVO GENERADO - no editar a mano.\n"
        "// Se regenera con `npm run assets` a partir de _source-images/originals.\n"
        "// Cambiar una imagen = reemplazar el archivo en public/assets/** o el original\n"
        "// y volver a correr el script.\n\n"
        "export type Asset = {\n"
        "  src: string;\n"
        "  width: number;\n"
        "  height: number;\n"
        "  blurDataURL: string;\n"
        "  color: string;\n"
        "  /** archivo original del que salio, para trazabilidad */\n"
        "  origin: string;\n"
        "};\n\n"
        "export const assets = "
    )
    body = json.dumps(manifest, indent=2, ensure_ascii=False)
    footer = (
        " as const satisfies Record<string, Asset>;\n\n"
        "export type AssetKey = keyof typeof assets;\n\n"
        "/** Devuelve el asset o lanza en build si la clave no existe. */\n"
        "export function asset(key: AssetKey): Asset {\n"
        "  return assets[key];\n"
        "}\n"
    )
    with open(os.path.join(DATA, "assets.generated.ts"), "w", encoding="utf-8") as fh:
        fh.write(header + body + footer)

    print("\n%d assets procesados -> src/data/assets.generated.ts" % len(manifest))


if __name__ == "__main__":
    main()
