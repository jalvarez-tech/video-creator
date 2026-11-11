# 085 — combinaciones y cómo cambiar cada parte

**V66 · variante B de la 076.** Misma terna (HK02 · MD04 · CT06), mismo exterior (DR10), misma canción («Luxury, Elegance, Refined») y misma entrada. Cambia el ORDEN (estructura del 2026-11-10: `artefactos/01-plan.md`) y entra la ficha en pantalla. **Repite canción a propósito** (el usuario lo pidió: es la variante B de su original, no una versión nueva): declarado aquí y en `archivos/musica/registro-de-uso.md`.

| Qué | Dónde |
|---|---|
| El orden y la duración de los planos | `proyectos/085/pieza.json` (los anclajes: T1 188 · T2 254 · T3 317 · B 463; el CTA, en su golpe de la 076) y `node proyectos/080/herramientas/montar-pieza.mjs 085`, que reescribe `metraje-085.ts`, `audio-085.ts`, `subtitulos-085.ts` y la puerta |
| Los dos planos rápidos | `pieza.json` → `rapidos` (ZS01 3,50-5,70 s · RC11 0,20-2,30 s) |
| El recorrido | `pieza.json` → `recorrido` (ZS05 4,30-6,63 s → ZS02 5,50-8,07 s → RC08 4,30-6,50 s → RC07 2,70-6,23 s); el generador reparte los cortes sobre los golpes medidos |
| El texto de la ficha | `ficha-085.ts` (`FICHA_085`) Y `.claude/skills/ficha-luxur/propiedades/suite-go-living.json`: la puerta (2g) exige que coincidan |
| Las dos versiones | `composiciones.tsx`: `Recorrido085` (normal: subtítulos en una fuente, sin ficha) y `Recorrido085Ficha` (prop `ficha`: ficha abajo, sin subtítulos). Nunca juntas |
| La música bajo la voz | `audio-085.ts` (niveles medidos el 2026-11-10 sobre las ventanas nuevas: `medidas/ventanas-musica.json`, `node proyectos/080/herramientas/montar-pieza.mjs 085 --medir`) |

**Para comprobar:** `node proyectos/085/revisar-085.mjs` · prueba: `bash proyectos/080/herramientas/render-prueba.sh 085` (la normal) y `… 085 ficha`.

## Metraje compartido con otras piezas (informa; repetirlo es una decisión)

- **070**: RC07 3,4 s
- **071**: RC08 0,7 s
- **072**: RC07 3,5 s
- **073**: RC07 3,5 s
- **075**: RC08 0,5 s, RC07 3,5 s
- **076**: DR10 2,9 s, ZS01 2,2 s, RC11 2,1 s, ZS05 2,1 s, ZS02 2,5 s, RC08 2,2 s, RC07 3,5 s
- **077**: ZS01 2,2 s, RC11 1,9 s, ZS05 1,9 s, ZS02 2,3 s
- **078**: RC07 3,4 s
- **079**: RC07 3,4 s
- **080**: RC07 3,0 s
- **081**: RC07 3,5 s
- **082**: RC07 3,5 s
- **084**: RC08 0,8 s, RC07 3,5 s
- **086**: ZS01 1,6 s, RC11 1,9 s, ZS05 2,3 s, ZS02 1,3 s, RC08 0,4 s
- **087**: RC07 3,4 s

Los dos planos rápidos de esta pieza no se solapan con los de ninguna otra de la tanda (`node proyectos/080/herramientas/comparar-piezas.mjs`). La vista (RC07 o su equivalente) acaba cada recorrido: es el único plano de la ciudad con esa amplitud y se declara.

## Por confirmar al oído

1. La interjección RECORTADA al principio de HK02 (1,22-1,53 s de la toma, antes del primer plano de esta pieza): whisper la oye «Hoy,» (0,81) y, cortando desde 1,215 s, «Hoy, una buena inversión…». Se quita porque el catálogo da la frase sin ella y el hueco de −60 dB que la separa de «una» (1,57-1,61 s) permite un corte limpio; si Isabella dijo otra cosa y se la quiere oír, hay que cambiar `VENTANA_VOZ` de `normalizar.mjs`.
2. «ubicación» y «estratégica» (MD04, f411 = 13,7 s del vídeo): whisper las oye «y ubicaciones estratégicas» (plural) y «en la educación estratégica» en cortes distintos; la lectura es «ubicación estratégica» (el anuncio la usa: «a unos metros de la Avenida El Poblado»).
3. «Agenda» y «una» (CT06, f794 = 26,5 s del vídeo): whisper oye «Ag» (0,36) y «una» (0,56); la «A» es muy suave (−57 → −40 dB en 20 ms). Sin ella sería «genda una visita».

## Dónde está lo demás

Los `voz/*.txt` y `voz/*.json` son los de la 076 (las mismas tomas); `normalizar.mjs` es su receta con el número cambiado y no se ha vuelto a ejecutar: el material de `remotion/public/recorrido-085/` es un clon del normalizado de la 076. La final, la ficha y la portada se hacen con el sí del usuario (`render-final.sh`, `render-ficha-comp.sh`, `portada-luxur`, `mover-al-ssd.sh`).

## Entrega (2026-11-10, tras el «Sí, exporta»)

Exportada con las palabras «POR CONFIRMAR AL OÍDO» SIN OÍR (la orden de exportar no las quita; la nota se queda y `revisar-085.mjs --final` sigue fallando SOLO por ellas). Receta: `bash proyectos/080/herramientas/render-final.sh 085` (máster CRF 12 `slower` + ligera CRF 16 `slow`, etiquetas BT.709 arregladas sin pérdida con md5 de imagen y audio, `.srt`), `bash proyectos/080/herramientas/render-ficha-comp.sh 085` (la ficha es parte de la composición: se renderiza muda y se le copia el audio de la final) y `portada-luxur`.

- **Final:** 958 fotogramas a 1080×1920 y 30 fps, BT.709; -15,3 LUFS, pico real -1,1 dBFS. Máster 76 MB · ligera 40 MB · con ficha 78 MB. La ficha y la ligera tienen el mismo audio que el máster (md5 del PCM idéntico) y los mismos fotogramas; el máster contra su prueba de 540×960 da ≥ 43,8 dB de PSNR.
- **Portada** (`EL POBLADO` · `VENTA`, receta en `portada.json`): RC07, la vista desde el ventanal (24,6 s); contraste del texto · del isotipo 8,1 · 7,3. Un plano distinto a las diez que ya había de la suite.
- **Caption:** el de su original con la PRIMERA línea cambiada (`caption.md`).
- **Dónde está:** `/Volumes/SSK SSD/Work/Propiedades Luxur/Suite Go Living/Videos Social Media/085-recorrido.mp4`, `-recorrido-crf16.mp4`, `-recorrido-ficha.mp4`, `-portada.png`, `085.srt` y `085-caption.md` (sha256 comprobado al copiar; los mp4 y la portada ya no están en `proyectos/085/finales/`; el `.srt` y el caption se quedan).
