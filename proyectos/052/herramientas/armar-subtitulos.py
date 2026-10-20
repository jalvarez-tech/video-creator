#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
"""
armar-subtitulos.py — arma `subtitulos-052.ts` con los bloques de la locución que imprime `trozos-editoriales.mjs` y los del hook y el CTA (que son de las tomas y no cambian).

Uso (desde la raíz del repo):
  node manuales/edicion-video/scripts/trozos-editoriales.mjs proyectos/052/voz/off-marcado.txt proyectos/052/voz/off-provisional.json --en 164 --desde 3.73 --s0 3.73 --prefijo o --tabla > /tmp/off.txt
  uv run proyectos/052/herramientas/armar-subtitulos.py /tmp/off.txt

Cuando exista la locución real: `transcribir.mjs --palabras` sobre ella, `trozos-editoriales.mjs` con su `--s0`, `--audio` y `--en`/`--desde`, y esto otra vez (la cabecera de abajo dice «provisional» hasta que se cambie).
"""
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[3]
lineas = Path(sys.argv[1]).read_text(encoding="utf8").split("\n")
fin = next(i for i, l in enumerate(lineas) if l.startswith("o01  sale en"))
inicio = next(i for i, l in enumerate(lineas) if l == "  {")
codigo = "\n".join(lineas[inicio:fin])
PROVISIONAL = "--provisional" in sys.argv

cabecera = (RAIZ / "proyectos/052/herramientas/subtitulos-cabecera.txt").read_text(encoding="utf8")
cuerpo = f"""{cabecera}
export const subtitulos052: readonly BloqueEditorial[] = [
  // ── Bloque 2 · el hook dicho: la imagen de Isabella ya está en el f0, su primera sílaba suena en el f5 y el primer texto entra con ella ──
  {{ id: "h01", hasta: 64, trozos: [{{ desde: 5, texto: "Antes de arrendar" }}] }},
  {{
    id: "h02",
    hasta: 142,
    trozos: [
      {{ desde: 64, texto: "amoblado," }}, // POR CONFIRMAR AL OÍDO: «amoblado» (HK04, 4,92 s)
      {{ desde: 113, texto: "pregúntate esto.", estilo: "acento" }},
    ],
  }},
  // ── Bloque 5 · la locución en off{" (PROVISIONAL: tiempos del audio de `02.mp4`)" if PROVISIONAL else ""} ──
{codigo}
  // ── Bloque 6 · el CTA (el cierre es el logo, no un bloque de texto) ──
  {{
    id: "z01",
    hasta: 2340,
    trozos: [
      {{ desde: 2248, texto: "Si buscas más que un" }},
      {{ desde: 2281, texto: "apartamento para vivir," }},
      {{ desde: 2312, texto: "escríbenos.", estilo: "acento" }},
    ],
  }},
];

/** El mismo plan en segundos, para `exportar-srt.mjs`: la pista de captions de la plataforma (R14). */
export const subtitulos052Srt = segmentosDe(subtitulos052, FPS_052);
"""
(RAIZ / "remotion/src/proyectos/052/subtitulos-052.ts").write_text(cuerpo, encoding="utf8")
print("escrito remotion/src/proyectos/052/subtitulos-052.ts")
