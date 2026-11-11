# 084 — combinaciones y cómo cambiar cada parte

**V65 · variante B de la 075.** Misma terna (HK06 · MD03 · CT08), mismo exterior (DR10), misma canción («Street Level Sessions on the Green») y misma entrada. Cambia el ORDEN (estructura del 2026-11-10: `artefactos/01-plan.md`) y entra la ficha en pantalla. **Repite canción a propósito** (el usuario lo pidió: es la variante B de su original, no una versión nueva): declarado aquí y en `archivos/musica/registro-de-uso.md`.

| Qué | Dónde |
|---|---|
| El orden y la duración de los planos | `proyectos/084/pieza.json` (los anclajes: T1 220 · T2 273 · T3 322 · B 449; el CTA, en su golpe de la 075) y `node proyectos/080/herramientas/montar-pieza.mjs 084`, que reescribe `metraje-084.ts`, `audio-084.ts`, `subtitulos-084.ts` y la puerta |
| Los dos planos rápidos | `pieza.json` → `rapidos` (RC06 4,40-6,17 s · RC09 1,80-3,43 s) |
| El recorrido | `pieza.json` → `recorrido` (RC12 1,00-4,10 s → RC08 2,20-5,10 s → RC02 2,60-5,17 s → RC01 4,40-7,97 s → RC07 1,10-6,20 s); el generador reparte los cortes sobre los golpes medidos |
| El texto de la ficha | `ficha-084.ts` (`FICHA_084`) Y `.claude/skills/ficha-luxur/propiedades/suite-go-living.json`: la puerta (2g) exige que coincidan |
| Las dos versiones | `composiciones.tsx`: `Recorrido084` (normal: subtítulos en una fuente, sin ficha) y `Recorrido084Ficha` (prop `ficha`: ficha abajo, sin subtítulos). Nunca juntas |
| La música bajo la voz | `audio-084.ts` (niveles medidos el 2026-11-10 sobre las ventanas nuevas: `medidas/ventanas-musica.json`, `node proyectos/080/herramientas/montar-pieza.mjs 084 --medir`) |

**Para comprobar:** `node proyectos/084/revisar-084.mjs` · prueba: `bash proyectos/080/herramientas/render-prueba.sh 084` (la normal) y `… 084 ficha`.

## Metraje compartido con otras piezas (informa; repetirlo es una decisión)

- **070**: RC12 3,1 s, RC02 0,8 s, RC07 3,6 s
- **071**: RC09 0,6 s, RC08 2,8 s
- **072**: RC07 3,7 s
- **073**: RC06 1,3 s, RC07 4,7 s
- **075**: DR10 3,4 s, RC06 1,8 s, RC09 1,6 s, RC08 2,6 s, RC02 2,6 s, RC01 3,6 s, RC07 5,1 s
- **076**: RC08 0,8 s, RC07 3,5 s
- **078**: RC07 3,3 s
- **079**: RC12 3,1 s, RC02 1,1 s, RC07 3,6 s
- **080**: RC06 0,7 s, RC09 0,6 s, RC07 3,0 s
- **081**: RC07 3,8 s
- **082**: RC06 1,7 s, RC12 3,1 s, RC02 0,6 s, RC07 4,7 s
- **085**: RC08 0,8 s, RC07 3,5 s
- **086**: RC08 1,5 s
- **087**: RC07 3,3 s

Los dos planos rápidos de esta pieza no se solapan con los de ninguna otra de la tanda (`node proyectos/080/herramientas/comparar-piezas.mjs`). La vista (RC07 o su equivalente) acaba cada recorrido: es el único plano de la ciudad con esa amplitud y se declara.

## Por confirmar al oído

1. «Y» inicial del hook (HK06, f113 = 3,8 s del vídeo): whisper la oye con confianza 0,37; sin ella sería «Si tu próxima propiedad…».
2. «hotelera» (MD03, f342 = 11,4 s del vídeo): whisper la oye con confianza 0,13 («hotelera» sale «hotelera» en la toma entera).
3. «Poblado» (MD03, f404 = 13,5 s del vídeo): whisper la oye con confianza 0,20 («Poblado», «polado» o «poblado» según el corte).
4. «Agendemos» (CT08, f977 = 32,6 s del vídeo): whisper oye «Ajenlemos» (0,14).
5. «Go Living Suites» (CT08, f1038 = 34,6 s del vídeo): whisper oye «Go Living Sweets» (Go 0,37, Sweets 0,24); el anuncio dice «Go Living Suites».

## Dónde está lo demás

Los `voz/*.txt` y `voz/*.json` son los de la 075 (las mismas tomas); `normalizar.mjs` es su receta con el número cambiado y no se ha vuelto a ejecutar: el material de `remotion/public/recorrido-084/` es un clon del normalizado de la 075. La final, la ficha y la portada se hacen con el sí del usuario (`render-final.sh`, `render-ficha-comp.sh`, `portada-luxur`, `mover-al-ssd.sh`).

## Entrega (2026-11-10, tras el «Sí, exporta»)

Exportada con las palabras «POR CONFIRMAR AL OÍDO» SIN OÍR (la orden de exportar no las quita; la nota se queda y `revisar-084.mjs --final` sigue fallando SOLO por ellas). Receta: `bash proyectos/080/herramientas/render-final.sh 084` (máster CRF 12 `slower` + ligera CRF 16 `slow`, etiquetas BT.709 arregladas sin pérdida con md5 de imagen y audio, `.srt`), `bash proyectos/080/herramientas/render-ficha-comp.sh 084` (la ficha es parte de la composición: se renderiza muda y se le copia el audio de la final) y `portada-luxur`.

- **Final:** 1140 fotogramas a 1080×1920 y 30 fps, BT.709; -15,0 LUFS, pico real -3,4 dBFS. Máster 93 MB · ligera 47 MB · con ficha 93 MB. La ficha y la ligera tienen el mismo audio que el máster (md5 del PCM idéntico) y los mismos fotogramas; el máster contra su prueba de 540×960 da ≥ 43,8 dB de PSNR.
- **Portada** (`EL POBLADO` · `VENTA`, receta en `portada.json`): DR10, la entrada del edificio y la calle (1,4 s); contraste del texto · del isotipo 9,1 · 4,5. Un plano distinto a las diez que ya había de la suite.
- **Caption:** el de su original con la PRIMERA línea cambiada (`caption.md`).
- **Dónde está:** `/Volumes/SSK SSD/Work/Propiedades Luxur/Suite Go Living/Videos Social Media/084-recorrido.mp4`, `-recorrido-crf16.mp4`, `-recorrido-ficha.mp4`, `-portada.png`, `084.srt` y `084-caption.md` (sha256 comprobado al copiar; los mp4 y la portada ya no están en `proyectos/084/finales/`; el `.srt` y el caption se quedan).
