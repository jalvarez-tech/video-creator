#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["pillow>=11", "numpy>=2"]
# ///
"""
portada.py — la PORTADA 9:16 de un reel de propiedad de Propiedades Luxur.

Uso (desde la raíz del repo):
  uv run .claude/skills/portada-luxur/scripts/portada.py hoja <video> [--paso 1] [--desde 0] [--hasta 60] [--salida hoja.jpg]
  uv run .claude/skills/portada-luxur/scripts/portada.py nitidez <video> <desde> <hasta> [--paso 0.2]
  uv run .claude/skills/portada-luxur/scripts/portada.py portada --proyecto 017 --t 0 --locacion "EL POBLADO" --negocio venta
  uv run .claude/skills/portada-luxur/scripts/portada.py portada --video <mp4> --t 9.4 --locacion "EL POBLADO" --negocio venta --salida <png>

  · `hoja`     una hoja de contactos con el segundo de cada miniatura: para ELEGIR el plano.
  · `nitidez`  la varianza del laplaciano de cada fotograma de un tramo: dentro del plano
               elegido, el más nítido (un dron que se acerca pierde detalle según avanza).
  · `portada`  la imagen. Con `--proyecto NNN` lee la final de `proyectos/NNN/finales/`,
               escribe `proyectos/NNN/finales/NNN-portada.png` y guarda la receta
               (`proyectos/NNN/portada.json`): repetirla es `portada --proyecto NNN` a secas.

EL DISEÑO es el que el usuario aprobó el 2026-10-11 sobre el 017 (cinco revisiones), y por eso
sus números son constantes y no opciones: un fotograma de la final, oscurecido para que se lea el
blanco; en la mitad vertical, la locación (Safira March Medium), una línea de SU MISMO ANCHO y el
tipo de negocio (Montserrat 500, más pequeño y espaciado); el isotipo «PL» abajo, blanco y opaco.
Todo dentro del recorte 3:4 de la cuadrícula del perfil de Instagram (y 240-1680): la portada se
ve entera en 9:16 al abrir el reel, pero en el perfil solo esa franja.

Mide el CONTRASTE del blanco contra lo que queda detrás de cada elemento (WCAG, percentil 90 del
fondo ya oscurecido) y avisa por debajo de 4,5:1 en el texto y de 3:1 en el isotipo: un cielo o un ventanal quemado detrás del texto
se cambia de plano, no se tapa con más velo.
"""
import argparse
import datetime
import json
import os
import subprocess
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

# Lo común a los scripts de Python vive en edicion-video/scripts/_comun.py: dónde
# buscar ffmpeg aunque no esté en el PATH, la consola en UTF-8 y las rutas desde la raíz.
AQUI = os.path.dirname(os.path.realpath(__file__))
RAIZ = os.path.normpath(os.path.join(AQUI, "..", "..", "..", ".."))
sys.path.insert(0, os.path.join(RAIZ, "manuales", "edicion-video", "scripts"))
from _comun import desde_raiz, herramienta, numero_proyecto, ruta_visible  # noqa: E402

ANCHO, ALTO = 1080, 1920
# El recorte 3:4 que hace la cuadrícula del perfil: 1080×1440 centrado.
SEGURA_ARRIBA, SEGURA_ABAJO = 240, 1680
# Ni la locación ni el negocio pasan de este ancho de tinta: 120 px de aire a cada lado.
ANCHO_MAX_TEXTO = 840

ISOTIPO = "remotion/public/marcas/luxur/Propiedades-Luxur-Isotipo.png"
MONTSERRAT = "remotion/public/fuentes/montserrat/Montserrat-Variable.ttf"
# Safira March (Din Studio) es comercial y va versionada con la licencia del dueño (ver
# fuentes/README.md). Vive con la skill y no en remotion/public/fuentes/, que viaja al producto.
SAFIRA = os.path.join(AQUI, "..", "fuentes", "Safira-March-Medium.otf")

NEGOCIOS = {"venta": "VENTA", "renta": "RENTA", "ambos": "VENTA & RENTA"}

# Los números del diseño aprobado (017, rev. 5).
LOCACION_PX, LOCACION_TRACKING = 84, 0.10      # tracking en em
NEGOCIO_PX, NEGOCIO_TRACKING = 56, 0.30
HUECO_LINEA, GROSOR_LINEA = 44, 2              # de la versal a la línea y de la línea a la versal
ISOTIPO_ANCHO, ISOTIPO_MARGEN = 150, 40        # su borde inferior, a 40 px del límite del 3:4
# WCAG: 4,5:1 para el texto (el negocio es fino y es el mensaje); 3:1 para un gráfico (el isotipo).
CONTRASTE_MIN = {"texto": 4.5, "isotipo": 3.0}


def fuente_safira():
    ruta = os.path.normpath(SAFIRA)
    if not os.path.isfile(ruta):
        sys.exit(f"ERROR: falta la letra de la locación, {ruta_visible(ruta)}.\n"
                 f"  Va en git: `git checkout -- .claude/skills/portada-luxur/fuentes/` la repone.")
    return ruta


def fotograma(ffmpeg, video, t):
    # La final va etiquetada BT.709 de rango limitado; se fuerza la matriz para que el RGB no
    # dependa de lo que ffmpeg suponga, y se saca en crudo: un PNG intermedio de ffmpeg ≥ 8
    # arrastra cICP/cHRM/gAMA y cada visor lo interpreta a su manera.
    vf = (f"scale={ANCHO}:{ALTO}:force_original_aspect_ratio=increase:flags=lanczos"
          f":in_color_matrix=bt709:in_range=tv,crop={ANCHO}:{ALTO},format=rgb24")
    crudo = subprocess.run(
        [ffmpeg, "-v", "error", "-ss", f"{t:.3f}", "-i", video, "-frames:v", "1",
         "-vf", vf, "-f", "rawvideo", "-"], check=True, capture_output=True).stdout
    if len(crudo) != ANCHO * ALTO * 3:
        sys.exit(f"ERROR: no hay fotograma en {t:.2f} s de {ruta_visible(video)} (¿pasa del final?)")
    return Image.frombytes("RGB", (ANCHO, ALTO), crudo)


def duracion(video):
    ffprobe = herramienta("ffprobe")
    salida = subprocess.run([ffprobe, "-v", "error", "-show_entries", "format=duration",
                             "-of", "default=nw=1:nk=1", video], capture_output=True, text=True, check=True)
    return float(salida.stdout.strip())


def nitidez(img):
    g = np.asarray(img.convert("L"), dtype=np.float32)
    lap = g[1:-1, 1:-1] * 4 - g[:-2, 1:-1] - g[2:, 1:-1] - g[1:-1, :-2] - g[1:-1, 2:]
    return float(lap.var())


def oscurecer(img):
    # Un velo parejo para todo el plano, una franja más oscura en la mitad (el texto) y algo de
    # peso abajo (el isotipo): entre medias la propiedad se sigue viendo.
    a = np.asarray(img, dtype=np.float32) / 255
    y = np.linspace(0, 1, ALTO, dtype=np.float32)[:, None]
    franja = np.exp(-(((y - 0.5) / 0.17) ** 2)) * 0.30
    abajo = np.clip((y - 0.70) / 0.25, 0, 1) ** 1.3 * 0.28
    yy, xx = np.mgrid[0:ALTO, 0:ANCHO].astype(np.float32)
    r = np.sqrt(((xx - ANCHO / 2) / (ANCHO / 2)) ** 2 + ((yy - ALTO / 2) / (ALTO / 2)) ** 2)
    viñeta = np.clip(r - 0.75, 0, 1) * 0.25
    factor = (1 - 0.38) * (1 - franja) * (1 - abajo) * (1 - viñeta)
    return Image.fromarray((a * factor[..., None] * 255 + 0.5).clip(0, 255).astype(np.uint8))


def alto_versal(fuente):
    # 'H' da la altura de versal: alinear por ahí y no por la caja del glifo hace que dos letras
    # distintas queden a la misma distancia de la línea (y las tildes suben, no empujan).
    return -fuente.getbbox("H", anchor="ls")[1]


def medir(texto, fuente, tracking):
    """(avances, tinta izquierda relativa, tinta derecha relativa) de un texto con interletrado."""
    avances = [fuente.getlength(c) for c in texto]
    x, izq, der = 0.0, None, 0.0
    for c, av in zip(texto, avances):
        caja = fuente.getbbox(c, anchor="ls")
        if caja[2] > caja[0]:  # el espacio no tiene tinta
            izq = x + caja[0] if izq is None else izq
            der = x + caja[2]
        x += av + tracking
    return avances, izq or 0.0, der


def a_medida(ruta, px, tracking_em, texto, variacion=None):
    """La fuente a su tamaño de diseño o, si el texto no cabe en ANCHO_MAX_TEXTO, la que cabe."""
    while True:
        fuente = ImageFont.truetype(ruta, px)
        if variacion:
            fuente.set_variation_by_axes(variacion)
        _, izq, der = medir(texto, fuente, px * tracking_em)
        if der - izq <= ANCHO_MAX_TEXTO or px <= 24:
            return fuente, px * tracking_em
        px -= 2


def texto_espaciado(capa, y_versal, texto, fuente, tracking):
    """Centra en X por la TINTA y escribe con la versal en `y_versal`. Devuelve (izq, der) de la tinta."""
    avances, izq, der = medir(texto, fuente, tracking)
    x = ANCHO / 2 - (izq + der) / 2
    origen = x
    draw = ImageDraw.Draw(capa)
    for c, av in zip(texto, avances):
        draw.text((x, y_versal + alto_versal(fuente)), c, font=fuente, fill=(255, 255, 255, 255), anchor="ls")
        x += av + tracking
    return origen + izq, origen + der


def luminancia(rgb):
    c = rgb / 255
    c = np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)
    return c[..., 0] * 0.2126 + c[..., 1] * 0.7152 + c[..., 2] * 0.0722


def contraste(fondo, mascara):
    """Contraste del blanco contra el percentil 90 del fondo bajo la máscara (dilatada: el halo cuenta)."""
    zona = np.asarray(mascara.filter(ImageFilter.MaxFilter(9))) > 0
    lum = luminancia(np.asarray(fondo, dtype=np.float32))[zona]
    return 1.05 / (float(np.percentile(lum, 90)) + 0.05)


def componer(fondo, locacion, negocio, safira):
    velado = oscurecer(fondo)
    base = velado.convert("RGBA")
    texto = Image.new("RGBA", (ANCHO, ALTO), (0, 0, 0, 0))

    f_loc, tr_loc = a_medida(safira, LOCACION_PX, LOCACION_TRACKING, locacion)
    f_neg, tr_neg = a_medida(desde_raiz(MONTSERRAT), NEGOCIO_PX, NEGOCIO_TRACKING, NEGOCIOS[negocio], [500])

    # El texto (locación → línea → negocio) se mide entero y se centra en la vertical.
    alto_bloque = alto_versal(f_loc) + HUECO_LINEA + GROSOR_LINEA + HUECO_LINEA + alto_versal(f_neg)
    y = ALTO / 2 - alto_bloque / 2
    # La línea mide lo mismo que la locación, de la primera a la última letra.
    izq, der = texto_espaciado(texto, y, locacion, f_loc, tr_loc)
    y += alto_versal(f_loc) + HUECO_LINEA
    ImageDraw.Draw(texto).rectangle((izq, y, der, y + GROSOR_LINEA), fill=(255, 255, 255, 230))
    y += GROSOR_LINEA + HUECO_LINEA
    texto_espaciado(texto, y, NEGOCIOS[negocio], f_neg, tr_neg)

    # El isotipo firma abajo, solo. A 150 px se REDUCE desde los 224 del original: nítido.
    iso = Image.open(desde_raiz(ISOTIPO)).convert("RGBA")
    iso = iso.resize((ISOTIPO_ANCHO, round(iso.height * ISOTIPO_ANCHO / iso.width)), Image.LANCZOS)
    pos_iso = (round(ANCHO / 2 - iso.width / 2), SEGURA_ABAJO - ISOTIPO_MARGEN - iso.height)
    capa_iso = Image.new("RGBA", (ANCHO, ALTO), (0, 0, 0, 0))
    capa_iso.alpha_composite(iso, pos_iso)

    medidas = {"texto": contraste(velado, texto.getchannel("A")),
               "isotipo": contraste(velado, capa_iso.getchannel("A"))}

    # Una sombra muy suave bajo el texto: el velo hace casi todo el trabajo, esto solo despega
    # las letras cuando el plano trae blancos detrás.
    sombra = texto.getchannel("A").filter(ImageFilter.GaussianBlur(10)).point(lambda v: v * 0.45)
    negro = Image.new("L", (ANCHO, ALTO), 0)
    base.alpha_composite(Image.merge("RGBA", (negro, negro, negro, sombra)))
    base.alpha_composite(texto)
    base.alpha_composite(capa_iso)
    return base.convert("RGB"), medidas, (f_loc.size, f_neg.size)


def cmd_hoja(a):
    ffmpeg = herramienta("ffmpeg")
    fin = a.hasta if a.hasta is not None else duracion(a.video)
    mini_w, mini_h, columnas = 180, 320, 10
    crudo = subprocess.run(
        [ffmpeg, "-v", "error", "-ss", f"{a.desde:.3f}", "-to", f"{fin:.3f}", "-i", a.video,
         "-vf", f"fps=1/{a.paso},scale={mini_w}:{mini_h}:in_color_matrix=bt709:in_range=tv,format=rgb24",
         "-f", "rawvideo", "-"], check=True, capture_output=True).stdout
    tam = mini_w * mini_h * 3
    n = len(crudo) // tam
    filas = -(-n // columnas)
    hoja = Image.new("RGB", (mini_w * columnas, mini_h * filas), (0, 0, 0))
    etiqueta = ImageFont.truetype(desde_raiz(MONTSERRAT), 18)
    etiqueta.set_variation_by_axes([600])
    draw = ImageDraw.Draw(hoja)
    for i in range(n):
        x, y = (i % columnas) * mini_w, (i // columnas) * mini_h
        hoja.paste(Image.frombytes("RGB", (mini_w, mini_h), crudo[i * tam:(i + 1) * tam]), (x, y))
        rotulo = f"{a.desde + i * a.paso:.1f} s"
        caja = draw.textbbox((x + 6, y + 6), rotulo, font=etiqueta)
        draw.rectangle((caja[0] - 4, caja[1] - 3, caja[2] + 4, caja[3] + 3), fill=(0, 0, 0))
        draw.text((x + 6, y + 6), rotulo, font=etiqueta, fill=(255, 220, 0))
    salida = a.salida or os.path.splitext(a.video)[0] + "-hoja.jpg"
    hoja.save(salida, quality=88)
    print(f"{ruta_visible(salida)}  ({n} miniaturas, una cada {a.paso:g} s desde {a.desde:g} s)")


def cmd_nitidez(a):
    ffmpeg = herramienta("ffmpeg")
    valores = []
    t = a.desde
    while t <= a.hasta + 1e-6:
        valores.append((t, nitidez(fotograma(ffmpeg, a.video, t))))
        t += a.paso
    mejor = max(valores, key=lambda v: v[1])
    for t, v in valores:
        print(f"{t:7.2f} s  {v:9.1f}{'   ← el más nítido' if (t, v) == mejor else ''}")


def cmd_portada(a):
    receta = {}
    if a.proyecto:
        nnn = numero_proyecto(a.proyecto)
        ruta_receta = desde_raiz(f"proyectos/{nnn}/portada.json")
        if os.path.isfile(ruta_receta):
            with open(ruta_receta, encoding="utf-8") as f:
                receta = json.load(f)
        video = a.video or receta.get("video") or f"proyectos/{nnn}/finales/{nnn}-recorrido.mp4"
        salida = a.salida or f"proyectos/{nnn}/finales/{nnn}-portada.png"
    else:
        video, salida = a.video, a.salida
        if not video or not salida:
            sys.exit("ERROR: sin --proyecto hacen falta --video y --salida")
    t = a.t if a.t is not None else receta.get("t")
    locacion = a.locacion or receta.get("locacion")
    negocio = a.negocio or receta.get("negocio")
    faltan = [n for n, v in (("--t", t), ("--locacion", locacion), ("--negocio", negocio)) if v is None]
    if faltan:
        sys.exit(f"ERROR: falta {', '.join(faltan)} (y no hay receta guardada que lo diga)")

    ruta_video = video if os.path.isabs(video) else desde_raiz(video)
    if not os.path.isfile(ruta_video):
        sys.exit(f"ERROR: no encuentro el vídeo {video}")
    ruta_salida = salida if os.path.isabs(salida) else desde_raiz(salida)
    os.makedirs(os.path.dirname(ruta_salida) or ".", exist_ok=True)

    img, medidas, tamanos = componer(fotograma(herramienta("ffmpeg"), ruta_video, float(t)),
                                     locacion.upper(), negocio, fuente_safira())
    img.save(ruta_salida, optimize=True)

    print(f"{ruta_visible(ruta_salida)}  ({ANCHO}×{ALTO}, fotograma {float(t):.2f} s de {ruta_visible(ruta_video)})")
    if tamanos != (LOCACION_PX, NEGOCIO_PX):
        print(f"  la locación o el negocio no cabían a su tamaño: locación {tamanos[0]} px, negocio {tamanos[1]} px")
    for elemento, c in medidas.items():
        minimo = CONTRASTE_MIN[elemento]
        aviso = "" if c >= minimo else f"   ⚠ por debajo de {minimo:g}:1: busca otro plano o tramo"
        print(f"  contraste del {elemento}: {c:.1f}:1{aviso}")

    if a.proyecto:
        with open(ruta_receta, "w", encoding="utf-8") as f:
            json.dump({"video": video, "t": float(t), "locacion": locacion.upper(), "negocio": negocio,
                       "fecha": datetime.date.today().isoformat()}, f, ensure_ascii=False, indent=2)
            f.write("\n")
        print(f"  receta: {ruta_visible(ruta_receta)}")


def main():
    p = argparse.ArgumentParser(description="Portada 9:16 de un reel de propiedad de Luxur.")
    sub = p.add_subparsers(dest="cmd", required=True)

    h = sub.add_parser("hoja", help="hoja de contactos con el segundo de cada miniatura")
    h.add_argument("video")
    h.add_argument("--paso", type=float, default=1.0)
    h.add_argument("--desde", type=float, default=0.0)
    h.add_argument("--hasta", type=float)
    h.add_argument("--salida")

    n = sub.add_parser("nitidez", help="el fotograma más nítido de un tramo")
    n.add_argument("video")
    n.add_argument("desde", type=float)
    n.add_argument("hasta", type=float)
    n.add_argument("--paso", type=float, default=0.2)

    o = sub.add_parser("portada", help="la imagen")
    o.add_argument("--proyecto")
    o.add_argument("--video")
    o.add_argument("--t", type=float)
    o.add_argument("--locacion")
    o.add_argument("--negocio", choices=NEGOCIOS)
    o.add_argument("--salida")

    a = p.parse_args()
    {"hoja": cmd_hoja, "nitidez": cmd_nitidez, "portada": cmd_portada}[a.cmd](a)


if __name__ == "__main__":
    main()
