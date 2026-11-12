# 080 — combinaciones y cómo cambiar cada parte

**V61 · variante B de la 071.** Misma terna (HK08 · MD06 · CT09), mismo exterior (DR08), misma canción («Heaven on Earth») y misma entrada. Cambia el ORDEN (estructura del 2026-11-10: `artefactos/01-plan.md`) y entra la ficha en pantalla. **Repite canción a propósito** (el usuario lo pidió: es la variante B de su original, no una versión nueva): declarado aquí y en `archivos/musica/registro-de-uso.md`.

| Qué | Dónde |
|---|---|
| El orden y la duración de los planos | `proyectos/080/pieza.json` (los anclajes: T1 207 · T2 263 · T3 328 · B 457; el CTA, en su golpe de la 071) y `node proyectos/080/herramientas/montar-pieza.mjs 080`, que reescribe `metraje-080.ts`, `audio-080.ts`, `subtitulos-080.ts` y la puerta |
| Los dos planos rápidos | `pieza.json` → `rapidos` (RC08 0,20-2,07 s · RC03 3,40-5,57 s) |
| El recorrido | `pieza.json` → `recorrido` (RC09 2,80-4,83 s → RC02 0,60-2,60 s → RC05 5,00-6,87 s → RC06 5,50-7,67 s → RC07 3,20-6,23 s); el generador reparte los cortes sobre los golpes medidos |
| El texto de la ficha | `ficha-080.ts` (`FICHA_080`) Y `.claude/skills/ficha-luxur/propiedades/suite-go-living.json`: la puerta (2g) exige que coincidan |
| Las dos versiones | `composiciones.tsx`: `Recorrido080` (normal: subtítulos en una fuente, sin ficha) y `Recorrido080Ficha` (prop `ficha`: ficha abajo, sin subtítulos). Nunca juntas |
| La música bajo la voz | `audio-080.ts` (niveles medidos el 2026-11-10 sobre las ventanas nuevas: `medidas/ventanas-musica.json`, `node proyectos/080/herramientas/montar-pieza.mjs 080 --medir`) |

**Para comprobar:** `node proyectos/080/revisar-080.mjs` · prueba: `bash proyectos/080/herramientas/render-prueba.sh 080` (la normal) y `… 080 ficha`.

## Metraje compartido con otras piezas (informa; repetirlo es una decisión)

- **070**: RC02 2,0 s, RC07 2,9 s
- **071**: DR08 2,9 s, RC03 1,9 s, RC09 2,0 s, RC05 1,9 s
- **072**: RC07 3,0 s
- **073**: RC03 0,9 s, RC05 1,9 s, RC06 2,2 s, RC07 3,0 s
- **075**: RC09 2,0 s, RC06 1,9 s, RC07 3,0 s
- **076**: RC07 3,0 s
- **077**: RC08 1,8 s
- **078**: RC03 1,8 s, RC05 0,5 s, RC07 3,0 s
- **079**: RC02 2,0 s, RC07 2,9 s
- **081**: RC07 3,0 s
- **082**: RC02 2,0 s, RC06 1,0 s, RC07 3,0 s
- **084**: RC09 0,6 s, RC06 0,7 s, RC07 3,0 s
- **085**: RC07 3,0 s
- **087**: RC03 1,8 s, RC05 0,5 s, RC07 3,0 s

Los dos planos rápidos de esta pieza no se solapan con los de ninguna otra de la tanda (`node proyectos/080/herramientas/comparar-piezas.mjs`). La vista (RC07 o su equivalente) acaba cada recorrido: es el único plano de la ciudad con esa amplitud y se declara.

## Por confirmar al oído

1. «Una suite hotelera» (MD06, f342 = 11,4 s del vídeo): whisper oye «Un asfito atelera» (confianza baja) y solo desde «con» en adelante entiende la frase; la lectura sale del contexto (el anuncio, el CTA de esta suite y la métrica de sílabas: «u-na sui-te ho-te-le-ra» son 7 entre 0,53 y 1,52 s).
2. «todo» en el hook (HK08, f157 = 5,2 s del vídeo): el corte final de whisper oye «en todo otro trabajo»; los cortes parciales oyen «en otro trabajo». Se pintó «convertirse en otro trabajo».

## Dónde está lo demás

Los `voz/*.txt` y `voz/*.json` son los de la 071 (las mismas tomas); `normalizar.mjs` es su receta con el número cambiado y no se ha vuelto a ejecutar: el material de `remotion/public/recorrido-080/` es un clon del normalizado de la 071. La final, la ficha y la portada se hacen con el sí del usuario (`render-final.sh`, `render-ficha-comp.sh`, `portada-luxur`, `mover-al-ssd.sh`).

## Entrega (2026-11-10, tras el «Sí, exporta»)

Exportada con las palabras «POR CONFIRMAR AL OÍDO» SIN OÍR (la orden de exportar no las quita; la nota se queda y `revisar-080.mjs --final` sigue fallando SOLO por ellas). Receta: `bash proyectos/080/herramientas/render-final.sh 080` (máster CRF 12 `slower` + ligera CRF 16 `slow`, etiquetas BT.709 arregladas sin pérdida con md5 de imagen y audio, `.srt`), `bash proyectos/080/herramientas/render-ficha-comp.sh 080` (la ficha es parte de la composición: se renderiza muda y se le copia el audio de la final) y `portada-luxur`.

- **Final:** 950 fotogramas a 1080×1920 y 30 fps, BT.709; -15,1 LUFS, pico real -2,8 dBFS. Máster 72 MB · ligera 38 MB · con ficha 72 MB. La ficha y la ligera tienen el mismo audio que el máster (md5 del PCM idéntico) y los mismos fotogramas; el máster contra su prueba de 540×960 da ≥ 43,8 dB de PSNR.
- **Portada** (`EL POBLADO` · `VENTA`, receta en `portada.json`): RC09, de la cama al escritorio (16,2 s); contraste del texto · del isotipo 11,5 · 5,0. Un plano distinto a las diez que ya había de la suite.
- **Caption:** el de su original con la PRIMERA línea cambiada (`caption.md`).
- **Dónde está:** `/Volumes/SSK SSD/Work/Propiedades Luxur/Suite Go Living/Videos Social Media/080-recorrido.mp4`, `-recorrido-crf16.mp4`, `-recorrido-ficha.mp4`, `-portada.png`, `080.srt` y `080-caption.md` (sha256 comprobado al copiar; los mp4 y la portada ya no están en `proyectos/080/finales/`; el `.srt` y el caption se quedan).
