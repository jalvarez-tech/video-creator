#!/usr/bin/env python3
"""
Iguala en SONORIDAD los efectos generados de la cama de sabor del 009.

POR QUÉ HACE FALTA. ElevenLabs devuelve cada efecto al nivel que le da la gana:
medido en los seis de este proyecto, el spread era de 20,5 LUFS (plancha −12,23
contra bandeja −32,73) y tres pasaban de 0 dBTP, o sea que ya venían clipeando.
Montar una cama con eso es lo mismo que montar cinco clips de vídeo sin igualar:
el que viene fuerte se come a los demás y no hay `ganancia` en el plan que lo
arregle sin volverse un número mágico.

EL ORDEN ES EL MISMO QUE EN EL METRAJE: primero se CORRIGE cada elemento hasta un
suelo común (esto), y solo después el plan aplica su nivel ARTÍSTICO (`ganancia`
en sabor-009.ts). Así `ganancia: 0.8` quiere decir «este va un poco por debajo»
y no «este venía 9 dB más fuerte que el resto».

LUFS y no pico: el pico dice lo alto que llega una transiente, no lo fuerte que
SUENA. Dos camas con el mismo pico pero 10 LUFS de diferencia se oyen distinto.

Dos objetivos Y DOS MODOS, porque son dos funciones distintas — y el modo es la
parte que se aprendió midiendo, no planificando:

  · camas continuas (fritura/brasa/plancha) → −20 LUFS, techo −6 dBTP, DINÁMICO.
  · golpes puntuales (bandeja/salsa/crujido) → −21 LUFS, techo −3 dBTP, LINEAL.

POR QUÉ EL MODO CAMBIA. El primer pase normalizó las tres camas igual que los
golpes: −27 LUFS con `linear=true`. Correcto de pico y sin embargo inservible,
porque un chisporroteo es TODO transientes: a −27 LUFS de media sus picos ya
estaban en −3 dBTP, o sea que la cama no admitía ni 3 dB de ganancia sin
clipear. La mezcla se quedaba en −23 LUFS y no había forma de subirla desde el
plan — cada intento reventaba el techo.

Una cama continua es justo el sitio donde el control dinámico NO se oye: nadie
echa de menos la transiente individual de una burbuja de aceite. Así que las
camas van en modo dinámico (`linear=false`, que activa el limitador interno de
loudnorm) y suben a −20 LUFS con el pico sujeto en −6: fuertes de media,
mansas de pico, y por debajo de los golpes con 4 dB de sobra.

Los golpes siguen en `linear=true` y ahí sí importa: comprimir el crujido le
quitaría el ataque, que es literalmente lo que provoca el antojo.

    python3 proyectos/009/sabor/normalizar.py

Lee de `proyectos/009/sabor/crudo/` (los originales de la API, intactos) y
escribe en `remotion/public/sabor-009/`. Es idempotente: siempre parte del crudo.
"""
import json
import pathlib
import re
import subprocess
import sys

RAIZ = pathlib.Path(__file__).resolve().parents[3]
CRUDO = RAIZ / "proyectos/009/sabor/crudo"
DESTINO = RAIZ / "remotion/public/sabor-009"

# id → (objetivo LUFS, techo dBTP, lineal). Ver cabecera para por qué el MODO
# cambia entre camas y golpes: es lo único que se aprendió midiendo la mezcla.
OBJETIVO = {
    # camas continuas: fuertes de media, sujetas de pico, con limitador
    "fritura": (-20.0, -6.0, False),
    "brasa":   (-20.0, -6.0, False),
    "plancha": (-20.0, -6.0, False),
    # golpes: lineal, para no comerse el ataque
    "bandeja": (-21.0, -3.0, True),
    "salsa":   (-21.0, -3.0, True),
    "crujido": (-21.0, -3.0, True),
}


def mide(ruta: pathlib.Path) -> dict:
    """Pasada 1 de loudnorm: devuelve las medidas reales del archivo."""
    p = subprocess.run(
        ["ffmpeg", "-i", str(ruta), "-af", "loudnorm=print_format=json", "-f", "null", "-"],
        capture_output=True, text=True,
    )
    m = re.search(r"\{[^{]*?input_i.*?\}", p.stderr, re.S)
    if not m:
        sys.exit(f"ERROR: ffmpeg no devolvió medidas para {ruta.name}")
    return json.loads(m.group(0))


def main() -> None:
    if not CRUDO.is_dir():
        sys.exit(f"ERROR: no existe {CRUDO} (los crudos de la API)")
    DESTINO.mkdir(parents=True, exist_ok=True)

    print(f"{'id':<10} {'antes':>9}  {'→':^3} {'después':>9}   {'TP':>8}  modo")
    print("-" * 56)
    for ident, (objetivo, techo, lineal) in OBJETIVO.items():
        src = CRUDO / f"{ident}.mp3"
        if not src.exists():
            sys.exit(f"ERROR: falta el crudo {src}")
        d = mide(src)
        # Pasada 2: la misma corrección, ya con las medidas puestas.
        filtro = (
            f"loudnorm=I={objetivo}:TP={techo}:LRA=11"
            f":measured_I={d['input_i']}:measured_TP={d['input_tp']}"
            f":measured_LRA={d['input_lra']}:measured_thresh={d['input_thresh']}"
            f":linear={'true' if lineal else 'false'}"
        )
        out = DESTINO / f"{ident}.mp3"
        p = subprocess.run(
            ["ffmpeg", "-v", "error", "-i", str(src), "-af", filtro,
             "-ar", "44100", "-b:a", "192k", "-y", str(out)],
            capture_output=True, text=True,
        )
        if p.returncode != 0:
            sys.exit(f"ERROR normalizando {ident}:\n{p.stderr}")
        v = mide(out)
        modo = "lineal" if lineal else "dinámico"
        print(f"{ident:<10} {d['input_i']:>9} {'→':^3} {v['input_i']:>9}   {v['input_tp']:>8}  {modo}")


if __name__ == "__main__":
    main()
