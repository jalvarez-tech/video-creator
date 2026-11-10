# Aprendizajes — proyecto 066 (V48 · Lote en San Cristóbal)

Lo que esta pieza enseñó y no está en el código. Ordenado por lo que más cuesta si se olvida.

## 1. En un rodaje al aire libre, `limites-voz.py` y whisper mienten sobre dónde empieza la voz

Las tomas del prado llevan un retumbo de viento a 20-100 Hz y −42 dBFS (en banda de voz, 150-4000 Hz, el ruido está a −62…−75 dB). `limites-voz.py` mide en banda ancha: con su margen por defecto puso el arranque del hook en 0,60 s y con `--margen 40` en 1,36 s; la voz real, en banda de voz y a 33 ms, sube en el f40 = **1,33 s**, tras una inhalación a −50 dB. Whisper pone la primera palabra de las tres tomas en **0,00 s** y reparte la frase desde ahí (el DTW no existía en el JSON). Lo que vale: la energía **en banda de voz** (`herramientas/voz-banda.py`) y, para cada línea, `onsets-voz.py` + `palabras-desde.py`. El paso alto a 100 Hz de la cadena de voz limpia el viento; lo que importa es medir DESPUÉS del filtro.

## 2. La música: una canción fuerte y que crece se mide por tramos, no con una sola ganancia

*Flying Into the Sun* mide −13,4 LUFS en la apertura, −10,7 en el paseo y −8,0 en el bloque 5 (picos a 0 dBFS) y cae a −22/−26 en el CTA. «Música sola a −15 LUFS» son tres ganancias distintas (−1,6 · −4,3 · −7,0 dB) y «≈ −26 LUFS bajo la voz» otras dos fijas (−15,2 dB bajo el hook, −17,4 dB bajo la mitad) más una que sigue la caída natural bajo el CTA (de −9,6 a 0 dB: `MOMENTANEA`). La entrada que da `buscar-entrada.py` (178,095 s) pone la caída de 17 dB a +35,6 s: ahí hay que colocar la primera palabra del CTA, y manda sobre el resto de la duración.

## 3. Una toma corta manda sobre la rejilla: la mitad no se puede alargar

MD03 dura 6,63 s y ella acaba de hablar a los 6,24: tras su última palabra quedan **12 f de clip**. No hay disolvencia de salida posible (la puerta exige 12 f + 2 de margen) ni se puede alargar sin congelar el último fotograma. La salida: entra DISOLVIENDO en un sitio libre y sale a CORTE en el primer golpe que cae en esos 12 f; el sitio libre se calcula hacia atrás (`en` = golpe − 186). Comprobar el recuento exacto de fotogramas (`ffprobe -count_frames`: 199) y dejar 1 f de margen: ffprobe redondea la duración a 6 decimales y la puerta compara contra eso.

## 4. En un worktree, los scripts de Remotion lanzados desde la raíz descargan Chrome otra vez

`stills-multiples.mjs` y `npx remotion` desde la raíz del repo buscan Chrome en `<raíz>/.remotion`; el clonado de `node_modules` trae uno en `remotion/node_modules/.remotion`. Con tres sesiones a la vez, los tres procesos se quedaron 11 min en una descarga con un lock compartido y a 90 KB/s. Arreglo: `ln -s remotion/node_modules/.remotion .remotion` en la raíz del worktree (ya está). Y cada bundle de Remotion ocupa ≈ 4 GB con los medios de las tres piezas en `remotion/public/`: se borran con nada renderizando.

## 5. Lo que sigue pendiente de decidir con el usuario

- «5.000 metros» (ella) frente a 5.170 m² (ficha): subtítulo literal; si se quiere «más de 5.000», hay que regrabar.
- «de tu vida» y «paz» de la mitad: sin oír.
- La canción, medida pero no oída; su licencia, sin verificar.

## 6. La entrega (2026-10-24)

- Tres renders de 1218 f a escala 1 con `--gl=angle` (máster CRF 12 `slower`, ligera CRF 16 `slow` y la base muda CRF 6 `fast`) caben en un solo script (`herramientas/exportar-066.sh`): ≈ 4 min cada uno con otras dos piezas renderizando. El intermedio de la ficha pesa 446 MB: se borra.
- Las etiquetas de color se arreglan también en la VERSIÓN CON FICHA: `ficha.mjs` la deja con la transferencia sin etiquetar (`color_transfer=unknown`) y el mismo `arreglar-etiquetas.sh` la deja en BT.709 sin tocar imagen ni audio.
- La portada sale del mejor fotograma del lote, y el rodaje deja personas y coches pequeños en el camino: se declara en `combinaciones.md`; no se retoca.

