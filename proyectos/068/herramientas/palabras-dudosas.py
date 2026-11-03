# /// script
# requires-python = ">=3.10"
# ///
"""Lista, palabra a palabra, lo que oye whisper en una toma y con qué confianza.

La confianza de una palabra es la MENOR `p` de sus tokens (una palabra es tan
fiable como su trozo más dudoso). El segundo de cada palabra sale del DTW: una
palabra empieza donde acaba el token anterior y acaba en su propio `t_dtw`
(whisper.cpp marca el FINAL del token). Es aproximado (±3 f); el segundo exacto
de una palabra suelta se cierra después con onsets-voz.py / palabras-desde.py.

Uso: uv run palabras-dudosas.py <json> [--umbral 0.55]
"""
import json, sys

def palabras(ruta):
    d = json.load(open(ruta))
    out, fin_ant = [], 0.0
    for seg in d["transcription"]:
        toks = [t for t in seg.get("tokens", []) if not t["text"].startswith("[_")]
        if not toks or not seg["text"].strip():
            for t in seg.get("tokens", []):
                if t.get("t_dtw", -1) >= 0: fin_ant = t["t_dtw"] / 100
            continue
        p = min(t["p"] for t in toks)
        ini = fin_ant
        fin = toks[-1]["t_dtw"] / 100 if toks[-1]["t_dtw"] >= 0 else seg["offsets"]["to"] / 1000
        out.append(dict(texto=seg["text"].strip(), p=p, ini=ini, fin=fin, off=seg["offsets"]["from"] / 1000))
        fin_ant = fin
    return out

if __name__ == "__main__":
    umbral = 0.55
    if "--umbral" in sys.argv:
        umbral = float(sys.argv[sys.argv.index("--umbral") + 1])
    for ruta in [a for a in sys.argv[1:] if a.endswith(".json")]:
        ws = palabras(ruta)
        print(f"\n{ruta.split('/')[-1]}: «{' '.join(w['texto'] for w in ws)}»")
        for w in ws:
            marca = "  <-- DUDOSA" if w["p"] < umbral else ""
            print(f"   {w['ini']:6.2f}-{w['fin']:5.2f} s  p={w['p']:.2f}  {w['texto']}{marca}")
