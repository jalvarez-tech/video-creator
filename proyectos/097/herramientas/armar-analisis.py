"""Arma `analisis-videos.md`: el análisis escrito a mano arriba y, debajo de la marca,
la cronología de todos los vídeos y todas sus transcripciones.

Uso (desde la raíz):
  uv run proyectos/097/herramientas/armar-analisis.py proyectos/097/material/analisis-videos.md

Por qué un solo archivo: para retomar el proyecto (otra sesión, otra persona) sin releer
69 mapas ni 138 JSON de Whisper. Solo se reescribe lo que va DEBAJO de la marca; lo de
arriba es el análisis, escrito a mano, y se conserva tal cual.

Por vídeo se vuelca: la lectura del mapa (lo que se decidió que se dice, con sus ⚠), la
voz medida por energía y las dos pasadas de Whisper en bruto. Las pasadas se dejan porque
son la única pista de por qué una frase lleva ⚠; las repeticiones en serie (alucinación
típica de Whisper) se juntan en una línea con «×N», y se marca la frase que cae donde no
se midió voz, que es la otra señal de alucinación.
"""
import json
import re
import sys
from pathlib import Path

RAIZ = Path("proyectos/097/material")
MARCA = "<!-- GENERADO por proyectos/097/herramientas/armar-analisis.py: no edites debajo de esta línea -->"
CARPETAS = [("HZ", "horizontal", "16:9"), ("VT", "vertical", "9:16"), ("DR", "dron", "16:9 dron")]


def coma(x, d=1):
    return f"{x:.{d}f}".replace(".", ",")


def dbfs(x):
    return f"{x:.1f}".replace(".", ",").replace("-", "−") if x is not None else "?"


def segmentos(ruta: Path):
    if not ruta.exists():
        return None
    out = []
    for s in json.loads(ruta.read_text()).get("transcription", []):
        t = s["text"].strip()
        if not t:
            continue
        a, b = s["offsets"]["from"] / 1000, s["offsets"]["to"] / 1000
        if out and out[-1][2] == t and a - out[-1][1] < 1.0:
            out[-1][1] = b
            out[-1][3] += 1
        else:
            out.append([a, b, t, 1])
    return out


def con_voz(a, b, tramos):
    return any(x < b and y > a for x, y in tramos)


def pasada(titulo, segs, tramos):
    if segs is None:
        return [f"**{titulo}:** _(no hay transcripción)_", ""]
    if not segs:
        return [f"**{titulo}:** _(vacía)_", ""]
    lineas = [f"**{titulo}:**", ""]
    for a, b, t, n in segs:
        extra = f" ×{n}" if n > 1 else ""
        sin = "" if con_voz(a, b, tramos) else " · _sin voz medida_"
        lineas.append(f"- {coma(a)}–{coma(b)} · «{t}»{extra}{sin}")
    return lineas + [""]


def lectura(mapa: Path):
    m = re.search(r"### Diálogos\n(.*?)\n### ", mapa.read_text(), re.S)
    if not m:
        return "_(el mapa no trae diálogos)_"
    cuerpo = [l for l in m.group(1).strip().splitlines() if not l.startswith("Voz por energía")]
    return "\n".join(cuerpo).strip()


salida = Path(sys.argv[1])
if not salida.exists() or MARCA not in salida.read_text():
    sys.exit(f"{salida}: falta la marca de lo generado; escribe antes el análisis y la marca")
cabeza = salida.read_text().split(MARCA)[0].rstrip()

videos = []
for pref, carpeta, formato in CARPETAS:
    resumen = {}
    for l in (RAIZ / "mapas" / carpeta / "resumen.tsv").read_text().splitlines():
        p = [x.strip() for x in l.split("|")]
        if len(p) >= 6:
            resumen[p[1]] = p
    mapas = {m.stem.split("-", 1)[1]: m for m in (RAIZ / "mapas" / carpeta).glob(f"{pref}[0-9][0-9]-*.md")}
    for m in json.loads((RAIZ / f"medidas-{carpeta}.json").read_text()):
        img = Path(m["archivo"]).stem
        mapa = mapas[img]
        videos.append(dict(cod=mapa.stem.split("-")[0], img=img, carpeta=carpeta, formato=formato,
                           m=m, r=resumen.get(img, ["", "", "", "", "", ""]), mapa=mapa))
videos.sort(key=lambda v: v["m"]["creado"])
total = sum(v["m"]["duracion"] for v in videos)

# Las fotos no tienen un mapa por archivo: se toman de las filas del índice de
# `mapa-fotos.md` (código con su ancla, archivo, hora, orientación, qué es, para qué
# sirve y avisos), para que la cronología enseñe el día entero, fotos incluidas.
fotos = []
mapa_fotos = RAIZ / "mapa-fotos.md"
if mapa_fotos.exists():
    for l in mapa_fotos.read_text().splitlines():
        if l.startswith("| [FT"):
            c = [x.strip() for x in l.strip("|").split("|")]
            cod = re.sub(r"\]\(#", "](mapa-fotos.md#", c[0])
            tipo = "vídeo" if "vídeo" in c[4].lower() else "foto"
            fotos.append(dict(hora=c[2][:8], fila=f"| {c[2]} | {cod} | {c[1]} | {tipo} {c[3]} | — | {c[4]} | {c[5]} | {c[6]} |"))

filas = [(v["m"]["creado"][11:19],
          f"| {v['m']['creado'][11:19]} | [{v['cod']}]({v['mapa'].relative_to(RAIZ).as_posix()}) | {v['img']} | "
          f"{v['formato']} | {coma(v['m']['duracion'])} s | {v['r'][3]} | {v['r'][4]} | {v['r'][5]} |")
         for v in videos] + [(f["hora"], f["fila"]) for f in fotos]
filas.sort(key=lambda x: x[0])

out = [cabeza, "", MARCA, "",
       f"## 9. Cronología completa ({len(videos)} vídeos, {coma(total / 60)} min"
       + (f", y {len(fotos)} filas de fotos" if fotos else "") + ")", "",
       "Por hora de creación del archivo: el dron (DR) primero, luego horizontales (HZ, 16:9), verticales (VT, 9:16) "
       "y fotos (FT) intercalados, como se grabaron. El código enlaza a su mapa. En los vídeos, «⚠» es el número de "
       "dudas; en las fotos, el aviso (por ejemplo «caras»: salen menores identificables). Las ráfagas de fotos van en "
       "una fila.", "",
       "| Hora | Código | Archivo | Formato | Duración | Qué es | Lo mejor | ⚠ |",
       "|---|---|---|---|---|---|---|---|"]
out += [f for _, f in filas]

out += ["", "## 10. Transcripciones, vídeo a vídeo", "",
        "En el mismo orden que la cronología. Para cada vídeo:", "",
        "- **Lectura del mapa:** lo que se decidió que se dice, quién lo dice y por qué lleva ⚠. Es la versión buena.",
        "- **Voz por energía:** dónde suena algo, en ventanas de 50 ms, con el suelo de ruido. También cuentan las risas, "
        "los aplausos y la música.",
        "- **Whisper en bruto:** la pasada 1, sin contexto, y la pasada 2, con el vocabulario del encuentro en el "
        "prompt (que a veces mete esas palabras donde no las hay). «×N» marca una frase repetida en serie, y "
        "«_sin voz medida_» una frase que cae donde no se midió voz. Las dos cosas suelen ser alucinaciones.",
        "",
        "Las tomas sin audio (las del dron) no salen aquí: su mapa es solo de imagen. El vídeo suelto de la carpeta de "
        "fotos (FT48) tiene su transcripción en `mapa-fotos.md`.",
        ""]
for v in videos:
    if not v["m"]["audio"]:
        continue
    img, carpeta, m = v["img"], v["carpeta"], v["m"]
    voz_p = RAIZ / "transcripciones" / f"{carpeta}-vocabulario" / f"{img}.voz.json"
    voz = json.loads(voz_p.read_text()) if voz_p.exists() else {"tramos": [], "suelo_dbfs": None}
    tramos = voz["tramos"]
    rel = v["mapa"].relative_to(RAIZ).as_posix()
    voz_txt = " · ".join(f"{coma(a)}–{coma(b)}" for a, b in tramos) or "ninguna"
    out += [f"### {m['creado'][11:19]} · {v['cod']} · {img} · {coma(m['duracion'])} s · {carpeta}", "",
            f"[Mapa]({rel}) · {v['r'][3]}", "",
            f"Voz por energía: {voz_txt} (suelo {dbfs(voz.get('suelo_dbfs'))} dBFS)", "",
            "**Lectura del mapa:**", "", lectura(v["mapa"]), ""]
    out += pasada("Whisper, pasada 1 (sin contexto)",
                  segmentos(RAIZ / "transcripciones" / carpeta / f"{img}.json"), tramos)
    out += pasada("Whisper, pasada 2 (con vocabulario)",
                  segmentos(RAIZ / "transcripciones" / f"{carpeta}-vocabulario" / f"{img}.json"), tramos)

salida.write_text("\n".join(out).rstrip() + "\n")
print(f"{salida}: {len(videos)} vídeos, {coma(total / 60)} min")
