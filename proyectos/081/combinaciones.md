# 081 — combinaciones y cómo cambiar cada parte

**V62 · variante B de la 072.** Misma terna (HK11 · MD08 · CT11), mismo exterior (DR05), misma canción («I Feel It Coming») y misma entrada. Cambia el ORDEN (estructura del 2026-11-10: `artefactos/01-plan.md`) y entra la ficha en pantalla. **Repite canción a propósito** (el usuario lo pidió: es la variante B de su original, no una versión nueva): declarado aquí y en `archivos/musica/registro-de-uso.md`.

| Qué | Dónde |
|---|---|
| El orden y la duración de los planos | `proyectos/081/pieza.json` (los anclajes: T1 190 · T2 235 · T3 293 · B 429; el CTA, en su golpe de la 072) y `node proyectos/080/herramientas/montar-pieza.mjs 081`, que reescribe `metraje-081.ts`, `audio-081.ts`, `subtitulos-081.ts` y la puerta |
| Los dos planos rápidos | `pieza.json` → `rapidos` (DR03 0,70-2,20 s · RC13 2,00-3,93 s) |
| El recorrido | `pieza.json` → `recorrido` (DR01 0,40-2,33 s → RC03 0,00-3,23 s → RC05 0,00-3,20 s → RC04 2,80-5,40 s → RC07 2,40-6,17 s); el generador reparte los cortes sobre los golpes medidos |
| El texto de la ficha | `ficha-081.ts` (`FICHA_081`) Y `.claude/skills/ficha-luxur/propiedades/suite-go-living.json`: la puerta (2g) exige que coincidan |
| Las dos versiones | `composiciones.tsx`: `Recorrido081` (normal: subtítulos en una fuente, sin ficha) y `Recorrido081Ficha` (prop `ficha`: ficha abajo, sin subtítulos). Nunca juntas |
| La música bajo la voz | `audio-081.ts` (niveles medidos el 2026-11-10 sobre las ventanas nuevas: `medidas/ventanas-musica.json`, `node proyectos/080/herramientas/montar-pieza.mjs 081 --medir`) |

**Para comprobar:** `node proyectos/081/revisar-081.mjs` · prueba: `bash proyectos/080/herramientas/render-prueba.sh 081` (la normal) y `… 081 ficha`.

## Metraje compartido con otras piezas (informa; repetirlo es una decisión)

- **070**: RC04 0,8 s, RC07 3,6 s
- **071**: RC13 1,9 s, RC03 1,0 s
- **072**: DR05 2,7 s, DR03 1,5 s, RC13 1,9 s, DR01 1,9 s, RC03 2,6 s, RC05 2,6 s, RC07 3,7 s
- **073**: RC03 2,6 s, RC04 1,6 s, RC07 3,8 s
- **074**: DR03 1,5 s, DR01 1,3 s
- **075**: RC07 3,8 s
- **076**: RC07 3,5 s
- **078**: RC07 3,3 s
- **079**: RC05 2,1 s, RC07 3,6 s
- **080**: RC07 3,0 s
- **082**: RC03 2,6 s, RC07 3,8 s
- **083**: DR03 1,5 s, DR01 1,3 s
- **084**: RC07 3,8 s
- **085**: RC07 3,5 s
- **087**: RC07 3,3 s

Los dos planos rápidos de esta pieza no se solapan con los de ninguna otra de la tanda (`node proyectos/080/herramientas/comparar-piezas.mjs`). La vista (RC07 o su equivalente) acaba cada recorrido: es el único plano de la ciudad con esa amplitud y se declara.

## Por confirmar al oído

1. «Oviedo» (MD08, f324 = 10,8 s del vídeo): whisper oyó «odio» (0,02) y «abierto» en un corte aislado; por el contexto —y el anuncio, que cita el C.C. Oviedo— se lee «Oviedo».
2. «EAFIT» (MD08, f366 = 12,2 s del vídeo): whisper oyó «Eafid» y «Eafit» (0,34). **No está en el anuncio** (cita Oviedo, Santa Fe, la estación Aguacatala y la Milla de Oro): es una frase suya y se confirma con el usuario.
3. «Aguacatala» (MD08, f386 = 12,9 s del vídeo): whisper oyó «Acuacatala» (0,42); el anuncio escribe «Aguacatala» y su inicio exacto es ambiguo entre «estación» y «Aguacatala».
4. «déjate» (CT11, f935 = 31,2 s del vídeo): whisper oyó «déjate» con 0,05 y «hasta» en cortes aislados.

## Dónde está lo demás

Los `voz/*.txt` y `voz/*.json` son los de la 072 (las mismas tomas); `normalizar.mjs` es su receta con el número cambiado y no se ha vuelto a ejecutar: el material de `remotion/public/recorrido-081/` es un clon del normalizado de la 072. La final, la ficha y la portada se hacen con el sí del usuario (`render-final.sh`, `render-ficha-comp.sh`, `portada-luxur`, `mover-al-ssd.sh`).

## Entrega (2026-11-10, tras el «Sí, exporta»)

Exportada con las palabras «POR CONFIRMAR AL OÍDO» SIN OÍR (la orden de exportar no las quita; la nota se queda y `revisar-081.mjs --final` sigue fallando SOLO por ellas). Receta: `bash proyectos/080/herramientas/render-final.sh 081` (máster CRF 12 `slower` + ligera CRF 16 `slow`, etiquetas BT.709 arregladas sin pérdida con md5 de imagen y audio, `.srt`), `bash proyectos/080/herramientas/render-ficha-comp.sh 081` (la ficha es parte de la composición: se renderiza muda y se le copia el audio de la final) y `portada-luxur`.

- **Final:** 1071 fotogramas a 1080×1920 y 30 fps, BT.709; -15,1 LUFS, pico real -3,5 dBFS. Máster 90 MB · ligera 46 MB · con ficha 90 MB. La ficha y la ligera tienen el mismo audio que el máster (md5 del PCM idéntico) y los mismos fotogramas; el máster contra su prueba de 540×960 da ≥ 43,8 dB de PSNR.
- **Portada** (`EL POBLADO` · `VENTA`, receta en `portada.json`): RC04, el sofá, la mesa y la cama (24,0 s); contraste del texto · del isotipo 6,7 · 10,6. Un plano distinto a las diez que ya había de la suite.
- **Caption:** el de su original con la PRIMERA línea cambiada (`caption.md`).
- **Dónde está:** `/Volumes/SSK SSD/Work/Propiedades Luxur/Suite Go Living/Videos Social Media/081-recorrido.mp4`, `-recorrido-crf16.mp4`, `-recorrido-ficha.mp4`, `-portada.png`, `081.srt` y `081-caption.md` (sha256 comprobado al copiar; los mp4 y la portada ya no están en `proyectos/081/finales/`; el `.srt` y el caption se quedan).
