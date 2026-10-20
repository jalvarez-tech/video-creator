#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# ///
"""poner-color.py — escribe en `metraje-053.ts` el `color:` de cada plano desde un JSON {id: "color({…})"}.

Uso (desde la raíz del repo):  uv run proyectos/053/herramientas/poner-color.py proyectos/053/medidas/color-v1.json
POR QUÉ EXISTE: iterar el color plano a plano (medir → ajustar → medir) pide reescribir ocho líneas cada vez; con un JSON por intento queda el historial de lo probado.
"""
import json
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[3]
p = RAIZ / "remotion" / "src" / "proyectos" / "053" / "metraje-053.ts"
s = p.read_text(encoding="utf8")
for pid, expr in json.loads(Path(sys.argv[1]).read_text(encoding="utf8")).items():
    i = s.index(f'id: "{pid}"')
    m = re.compile(r"color: color\([^\n]*\),\n").search(s, i)
    assert m, pid
    s = s[: m.start()] + f"color: {expr},\n" + s[m.end() :]
p.write_text(s, encoding="utf8")
print("ok", sys.argv[1])
