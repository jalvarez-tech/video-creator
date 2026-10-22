#!/bin/bash
# espejo-054.sh — un remotion/ PRIVADO con SOLO el proyecto 054, para renderizar sin depender de las otras sesiones del checkout.
#
#   bash proyectos/054/herramientas/espejo-054.sh            (crea o actualiza el espejo y dice dónde está)
#
# POR QUÉ EXISTE. El checkout lo comparten tres sesiones (054, 055, 056) y `src/estudio.tsx` descubre TODAS las `composiciones.tsx` de `src/proyectos/`: un módulo roto a medio escribir en la de
# otra (el 2026-10-22, `audio-056.ts` lanzaba «faltan planos» al importarse) tumba el bundle entero y con él cada still y cada render, también el mío («Cannot access 'Composiciones' before
# initialization»). Además cada bundle empaqueta `remotion/public/` ENTERO (2,6 GB con el material de las tres) y el tmp está justo de disco. El espejo:
#   · `src/` es una copia del de remotion/ SIN los demás proyectos (solo `proyectos/054/`), que se vuelve a sincronizar cada vez que se ejecuta este script;
#   · `public/` lleva enlaces solo a lo que el 054 usa (`fuentes`, `marcas`, `recorrido-054`): el bundle pesa ≈ 1,2 GB en vez de 2,6;
#   · `node_modules` y la configuración se enlazan o copian de remotion/.
# Todo lo que se renderiza desde aquí sale de los mismos archivos que se versionan: no cambia ni un píxel respecto del render del checkout.
set -e
RAIZ="$(cd "$(dirname "$0")/../../.." && pwd)"
ESPEJO="${ESPEJO:-${TMPDIR:-/tmp}/espejo-054}"
mkdir -p "$ESPEJO/public" "$ESPEJO/src"
rsync -a --delete --exclude 'proyectos/*/' "$RAIZ/remotion/src/" "$ESPEJO/src/"
mkdir -p "$ESPEJO/src/proyectos/054"
rsync -a --delete "$RAIZ/remotion/src/proyectos/054/" "$ESPEJO/src/proyectos/054/"
for f in remotion.config.ts tsconfig.json package.json; do cp "$RAIZ/remotion/$f" "$ESPEJO/$f"; done
[ -e "$ESPEJO/node_modules" ] || ln -s "$RAIZ/remotion/node_modules" "$ESPEJO/node_modules"
for d in fuentes marcas recorrido-054; do
  [ -e "$ESPEJO/public/$d" ] || ln -s "$RAIZ/remotion/public/$d" "$ESPEJO/public/$d"
done
echo "$ESPEJO"
