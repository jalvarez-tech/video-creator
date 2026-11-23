"""Junta los mapas por vídeo en un solo documento con su índice.

Uso (desde la raíz):
  uv run proyectos/097/herramientas/armar-mapa.py <medidas.json> <dir_mapas> <resumen.tsv> <salida.md> [HZ|VT|DR]

`resumen.tsv`: una línea por vídeo, `HZNN | IMG_XXXX | duración | en una frase | lo mejor | dudas`
(lo que devuelve cada descripción). Los mapas se ordenan por código (HZ01…, VT01…), que es
el orden de grabación. El prefijo (HZ por defecto) dice qué carpeta es: horizontales, verticales o dron.
"""
import json
import sys
from pathlib import Path


def coma(x, d=1):
    return f"{x:.{d}f}".replace(".", ",")


def coma_(x):
    return f"{x:.2f}".replace(".", ",")


medidas_p, dir_mapas, resumen_p, salida = (Path(a) for a in sys.argv[1:5])
PREFIJO = sys.argv[5] if len(sys.argv) > 5 else "HZ"
CARPETA = {"HZ": ("horizontales", "Horizontal", "horizontal"), "VT": ("verticales", "Vertical", "vertical"),
           "DR": ("del dron", "Dron", "dron")}[PREFIJO]
medidas = {Path(m["archivo"]).stem: m for m in json.loads(medidas_p.read_text())}
resumen = {}
for linea in resumen_p.read_text().splitlines():
    partes = [p.strip() for p in linea.split("|")]
    if len(partes) >= 6 and partes[0].startswith(PREFIJO):
        resumen[partes[1]] = partes

mapas = sorted(dir_mapas.glob(f"{PREFIJO}[0-9][0-9]-*.md"))
total = sum(m["duracion"] for m in medidas.values())
# El iPhone en vertical guarda −90° como metadato: es lo normal, no un error. Lo que
# hay que avisar es lo que se sale de lo normal de cada carpeta.
rot_normal = -90 if PREFIJO == "VT" else 0
girados = [k for k, m in medidas.items() if m["rotacion"] != rot_normal]
resoluciones = sorted({f"{m['ancho']}×{m['alto']}" for m in medidas.values()})
# fps variable: el iPhone baja el fps con poca luz; esos clips hay que llevarlos a 30 constantes.
fps_raros = [f"{k} ({coma_(m['fps'])})" for k, m in medidas.items() if m["fps"] and abs(m["fps"] - 30) > 0.5]
mono = [k for k, m in medidas.items() if m["audio_canales"] == 1]
espacial = [k for k, m in medidas.items() if m.get("audio_espacial")]
hdr = [k for k, m in medidas.items() if m["hdr"]]
con_audio = [k for k, m in medidas.items() if m["audio"]]
# Los DJI graban a 29,97 (30000/1001): pasarlos a 30 con `fps=30` a secas repite un
# fotograma cada ≈ 33 s, y en un dron se ve como una micro-parada.
ntsc = [k for k, m in medidas.items() if m["fps"] and abs(m["fps"] - 29.97) < 0.005]
horas = sorted(m["creado"][11:16] for m in medidas.values() if m["creado"])
dudas = 0
for p in resumen.values():
    try:
        dudas += int("".join(c for c in p[5] if c.isdigit()) or 0)
    except ValueError:
        pass


out = [
    f"# 097 · Fundación MAS — mapa de los vídeos {CARPETA[0]}",
    "",
    f"> Origen: `Downloads/MAS/Videos/{CARPETA[1]}` ({len(medidas)} vídeos, {coma(total / 60)} min), copiados a "
    f"`proyectos/097/original/{CARPETA[2]}/` (no se versionan). Grabados el 2026-11-20 entre las "
    f"{horas[0]} y las {horas[-1]} (hora de creación de los archivos).",
    ("> Estado: **borrador sin oír.** Lo que se dice sale de Whisper local `small` en dos pasadas (sin contexto y con "
     "vocabulario del encuentro), contrastadas con dónde suena la voz medida por energía. Lo dudoso lleva ⚠ con la otra "
     f"lectura al lado ({dudas} en total). " if con_audio else
     "> Estado: **borrador.** Estas tomas no tienen audio: el mapa es solo de imagen. ")
    + "Lo que se ve sale de una hoja de fotogramas por vídeo "
    f"(`proyectos/097/vistas-previas/hojas-{CARPETA[2]}/`, uno por segundo hasta 24).",
    "",
    "## Cómo leerlo",
    "",
    f"- Cada vídeo tiene un **código** `{PREFIJO}NN` en orden de grabación, para pedir tramos sin ambigüedad («{PREFIJO}05 de 12,0 a 18,5»).",
    f"- **Técnica:** {', '.join(resoluciones)}, "
    + ("**HDR HLG** (hay que pasarlo a BT.709 antes de montar, R21). " if hdr else "SDR BT.709 (no hace falta convertir el color). ")
    + (f"**{len(girados)} vienen girados 180°** en el metadato ({', '.join(girados)}); "
       "ffmpeg y Remotion la corrigen al leer, pero la receta de normalizado debe quemarla (R19). " if PREFIJO == "HZ" and girados else
       "Todos llevan la rotación de −90° del iPhone en vertical; ffmpeg y Remotion la corrigen al leer, pero la receta "
       "de normalizado debe quemarla (R19). " if PREFIJO == "VT" and not girados else
       f"Rotación fuera de lo normal en {', '.join(girados)}: quemarla al normalizar (R19). " if girados else "Sin rotación. ")
    + (f"**fps variable** en {', '.join(fps_raros)}: normalizar a 30 constantes antes de contar frames. " if fps_raros else "")
    + ("**29,97 fps** (30000/1001): al normalizar a 30, `setpts=PTS*1000/1001` antes de `fps=30`, o se repite un "
       "fotograma cada ≈ 33 s; en el plan, el `desde` × 1000/1001. " if len(ntsc) == len(medidas) else
       "30 fps. " if not fps_raros else "")
    + (f"{len(mono)} tienen audio mono." if con_audio else "**Sin audio.**")
    + (f" {len(espacial)} llevan además una pista de audio espacial del iPhone (APAC) que ffmpeg no decodifica: "
       "al extraer o normalizar el audio, `-map 0:a:0` (la pista AAC)." if espacial else ""),
    ("- **Salen menores** en casi todos los vídeos: confirmar con MAS la autorización de imagen antes de publicar."
     if con_audio else "- Si se ve gente, el mapa dice si es identificable."),
    "",
    "## Índice",
    "",
    "| Código | Archivo | Duración | Grabado | Qué es | Lo mejor | ⚠ |",
    "|---|---|---|---|---|---|---|",
]
for p in mapas:
    cod, img = p.stem.split("-", 1)
    m = medidas[img]
    r = resumen.get(img, [cod, img, "", "", "", ""])
    ext = Path(m["archivo"]).suffix.lower().lstrip(".")
    out.append(f"| [{cod}](#{cod.lower()}--{img.lower()}{ext}) | {m['archivo']} | {coma(m['duracion'])} s | "
               f"{m['creado'][11:19] if m['creado'] else ''} | {r[3]} | {r[4]} | {r[5]} |")
out.append("")
# El resumen por bloques y lo que hay que oír se escriben a mano (`_bloques.md`): no salen de ningún dato.
bloques = dir_mapas / "_bloques.md"
if bloques.exists():
    out.append(bloques.read_text().strip())
    out.append("")
out.append("# Mapas por vídeo")
out.append("")
for p in mapas:
    out.append(p.read_text().strip())
    out.append("")
salida.write_text("\n".join(out) + "\n")
print(f"{salida}: {len(mapas)} mapas, {len(resumen)} líneas de resumen")
