# 082 — combinaciones y cómo cambiar cada parte

**V63 · variante B de la 073.** Misma terna (HK10 · MD01 · CT10), mismo exterior (DR09), misma canción («Chillin' (Chillstep Mix)») y misma entrada. Cambia el ORDEN (estructura del 2026-11-10: `artefactos/01-plan.md`) y entra la ficha en pantalla. **Repite canción a propósito** (el usuario lo pidió: es la variante B de su original, no una versión nueva): declarado aquí y en `archivos/musica/registro-de-uso.md`.

| Qué | Dónde |
|---|---|
| El orden y la duración de los planos | `proyectos/082/pieza.json` (los anclajes: T1 205 · T2 253 · T3 315 · B 486; el CTA, en su golpe de la 073) y `node proyectos/080/herramientas/montar-pieza.mjs 082`, que reescribe `metraje-082.ts`, `audio-082.ts`, `subtitulos-082.ts` y la puerta |
| Los dos planos rápidos | `pieza.json` → `rapidos` (DR02 1,00-2,60 s · RC10 0,00-2,07 s) |
| El recorrido | `pieza.json` → `recorrido` (RC12 1,00-4,53 s → RC02 0,60-3,20 s → RC03 0,60-3,53 s → RC11 3,00-4,83 s → RC06 4,50-6,47 s → RC07 1,50-6,23 s); el generador reparte los cortes sobre los golpes medidos |
| El texto de la ficha | `ficha-082.ts` (`FICHA_082`) Y `.claude/skills/ficha-luxur/propiedades/suite-go-living.json`: la puerta (2g) exige que coincidan |
| Las dos versiones | `composiciones.tsx`: `Recorrido082` (normal: subtítulos en una fuente, sin ficha) y `Recorrido082Ficha` (prop `ficha`: ficha abajo, sin subtítulos). Nunca juntas |
| La música bajo la voz | `audio-082.ts` (niveles medidos el 2026-11-10 sobre las ventanas nuevas: `medidas/ventanas-musica.json`, `node proyectos/080/herramientas/montar-pieza.mjs 082 --medir`) |

**Para comprobar:** `node proyectos/082/revisar-082.mjs` · prueba: `bash proyectos/080/herramientas/render-prueba.sh 082` (la normal) y `… 082 ficha`.

## Metraje compartido con otras piezas (informa; repetirlo es una decisión)

- **070**: DR02 1,6 s, RC12 3,5 s, RC02 2,6 s, RC07 3,6 s
- **071**: RC10 2,1 s, RC03 1,3 s
- **072**: RC03 2,0 s, RC07 3,8 s
- **073**: DR09 3,1 s, RC03 2,9 s, RC11 1,8 s, RC06 1,6 s, RC07 4,7 s
- **075**: RC02 0,6 s, RC06 2,0 s, RC07 4,7 s
- **076**: RC07 3,5 s
- **078**: RC07 3,4 s
- **079**: DR02 1,6 s, RC12 3,5 s, RC02 2,6 s, RC07 3,6 s
- **080**: RC02 2,0 s, RC06 1,0 s, RC07 3,0 s
- **081**: RC03 2,6 s, RC07 3,8 s
- **084**: RC12 3,1 s, RC02 0,6 s, RC06 1,7 s, RC07 4,7 s
- **085**: RC07 3,5 s
- **087**: RC07 3,4 s

Los dos planos rápidos de esta pieza no se solapan con los de ninguna otra de la tanda (`node proyectos/080/herramientas/comparar-piezas.mjs`). La vista (RC07 o su equivalente) acaba cada recorrido: es el único plano de la ciudad con esa amplitud y se declara.

## Por confirmar al oído

1. «vives» (HK10, f110 = 3,7 s del vídeo): whisper oye «Vivo» en la toma entera (confianza 0,16-0,14); «¿Vives fuera de Colombia…?» es la lectura por gramática y por la pregunta que sigue. Y «Medellín» (0,36).
2. «en edificios con reconocimiento» (MD01, f405 = 13,5 s del vídeo): una afirmación de Isabella que el anuncio no recoge; hay que confirmarla con el usuario además de oírla. Y «matrícula independiente» (consta en el anuncio).
3. «Haz» (CT10, f1026 = 34,2 s del vídeo): whisper la oye con confianza 0,14 (es la sílaba suelta de 0,62-0,74 s, antes del cierre de la «c»).
4. «Go Living Suites» (CT10, f1108 = 36,9 s del vídeo): whisper oye «StatSuite» (0,04); el anuncio dice «Go Living Suites».

## Dónde está lo demás

Los `voz/*.txt` y `voz/*.json` son los de la 073 (las mismas tomas); `normalizar.mjs` es su receta con el número cambiado y no se ha vuelto a ejecutar: el material de `remotion/public/recorrido-082/` es un clon del normalizado de la 073. La final, la ficha y la portada se hacen con el sí del usuario (`render-final.sh`, `render-ficha-comp.sh`, `portada-luxur`, `mover-al-ssd.sh`).

## Entrega (2026-11-10, tras el «Sí, exporta»)

Exportada con las palabras «POR CONFIRMAR AL OÍDO» SIN OÍR (la orden de exportar no las quita; la nota se queda y `revisar-082.mjs --final` sigue fallando SOLO por ellas). Receta: `bash proyectos/080/herramientas/render-final.sh 082` (máster CRF 12 `slower` + ligera CRF 16 `slow`, etiquetas BT.709 arregladas sin pérdida con md5 de imagen y audio, `.srt`), `bash proyectos/080/herramientas/render-ficha-comp.sh 082` (la ficha es parte de la composición: se renderiza muda y se le copia el audio de la final) y `portada-luxur`.

- **Final:** 1229 fotogramas a 1080×1920 y 30 fps, BT.709; -15,4 LUFS, pico real -1,1 dBFS. Máster 100 MB · ligera 52 MB · con ficha 100 MB. La ficha y la ligera tienen el mismo audio que el máster (md5 del PCM idéntico) y los mismos fotogramas; el máster contra su prueba de 540×960 da ≥ 43,8 dB de PSNR.
- **Portada** (`EL POBLADO` · `VENTA`, receta en `portada.json`): RC11, el televisor con la cama en primer plano (26,2 s); contraste del texto · del isotipo 15,5 · 11,3. Un plano distinto a las diez que ya había de la suite.
- **Caption:** el de su original con la PRIMERA línea cambiada (`caption.md`).
- **Dónde está:** `/Volumes/SSK SSD/Work/Propiedades Luxur/Suite Go Living/Videos Social Media/082-recorrido.mp4`, `-recorrido-crf16.mp4`, `-recorrido-ficha.mp4`, `-portada.png`, `082.srt` y `082-caption.md` (sha256 comprobado al copiar; los mp4 y la portada ya no están en `proyectos/082/finales/`; el `.srt` y el caption se quedan).
