# 083 — combinaciones y cómo cambiar cada parte

**V64 · variante B de la 074.** Misma terna (HK09 · MD09 · CT12), mismo exterior (DR06), misma canción («Some Say») y misma entrada. Cambia el ORDEN (estructura del 2026-11-10: `artefactos/01-plan.md`) y entra la ficha en pantalla. **Repite canción a propósito** (el usuario lo pidió: es la variante B de su original, no una versión nueva): declarado aquí y en `archivos/musica/registro-de-uso.md`.

| Qué | Dónde |
|---|---|
| El orden y la duración de los planos | `proyectos/083/pieza.json` (los anclajes: T1 208 · T2 261 · T3 303 · B 486; el CTA, en su golpe de la 074) y `node proyectos/080/herramientas/montar-pieza.mjs 083`, que reescribe `metraje-083.ts`, `audio-083.ts`, `subtitulos-083.ts` y la puerta |
| Los dos planos rápidos | `pieza.json` → `rapidos` (ZS01 0,30-2,07 s · DR01 1,00-2,40 s) |
| El recorrido | `pieza.json` → `recorrido` (ZS02 2,00-5,30 s → ZS03 0,30-3,73 s → DR07 1,50-4,93 s → DR03 0,50-5,10 s); el generador reparte los cortes sobre los golpes medidos |
| El texto de la ficha | `ficha-083.ts` (`FICHA_083`) Y `.claude/skills/ficha-luxur/propiedades/suite-go-living.json`: la puerta (2g) exige que coincidan |
| Las dos versiones | `composiciones.tsx`: `Recorrido083` (normal: subtítulos en una fuente, sin ficha) y `Recorrido083Ficha` (prop `ficha`: ficha abajo, sin subtítulos). Nunca juntas |
| La música bajo la voz | `audio-083.ts` (niveles medidos el 2026-11-10 sobre las ventanas nuevas: `medidas/ventanas-musica.json`, `node proyectos/080/herramientas/montar-pieza.mjs 083 --medir`) |

**Para comprobar:** `node proyectos/083/revisar-083.mjs` · prueba: `bash proyectos/080/herramientas/render-prueba.sh 083` (la normal) y `… 083 ficha`.

## Metraje compartido con otras piezas (informa; repetirlo es una decisión)

- **072**: DR01 1,4 s, DR03 3,4 s
- **074**: DR06 3,0 s, ZS01 1,8 s, DR01 1,4 s, ZS02 3,3 s, ZS03 2,9 s, DR07 2,3 s, DR03 4,0 s
- **078**: ZS02 0,5 s, ZS03 0,9 s
- **081**: DR01 1,3 s, DR03 1,5 s
- **087**: ZS02 0,7 s, ZS03 0,9 s

Los dos planos rápidos de esta pieza no se solapan con los de ninguna otra de la tanda (`node proyectos/080/herramientas/comparar-piezas.mjs`). La vista (RC07 o su equivalente) acaba cada recorrido: es el único plano de la ciudad con esa amplitud y se declara.

## Por confirmar al oído

1. «estratégica» (MD09, f339 = 11,3 s del vídeo, dentro de «Una ubicación estratégica», que entra en el f321): whisper la oye con confianza 0,24 («estrategica», «técnica» según el corte).
2. «esto» (CT12, f940 = 31,3 s del vídeo): whisper oye «eso» (0,03-0,34); el guion dice «esto».
3. «Go Living Suites» (CT12, f988 = 32,9 s del vídeo): whisper oye «Goblin en Suiz», «Governing suits»…; el anuncio dice «Go Living Suites». Es el nombre propio del edificio.

## Dónde está lo demás

Los `voz/*.txt` y `voz/*.json` son los de la 074 (las mismas tomas); `normalizar.mjs` es su receta con el número cambiado y no se ha vuelto a ejecutar: el material de `remotion/public/recorrido-083/` es un clon del normalizado de la 074. La final, la ficha y la portada se hacen con el sí del usuario (`render-final.sh`, `render-ficha-comp.sh`, `portada-luxur`, `mover-al-ssd.sh`).

## Entrega (2026-11-10, tras el «Sí, exporta»)

Exportada con las palabras «POR CONFIRMAR AL OÍDO» SIN OÍR (la orden de exportar no las quita; la nota se queda y `revisar-083.mjs --final` sigue fallando SOLO por ellas). Receta: `bash proyectos/080/herramientas/render-final.sh 083` (máster CRF 12 `slower` + ligera CRF 16 `slow`, etiquetas BT.709 arregladas sin pérdida con md5 de imagen y audio, `.srt`), `bash proyectos/080/herramientas/render-ficha-comp.sh 083` (la ficha es parte de la composición: se renderiza muda y se le copia el audio de la final) y `portada-luxur`.

- **Final:** 1094 fotogramas a 1080×1920 y 30 fps, BT.709; -15,2 LUFS, pico real -1,4 dBFS. Máster 102 MB · ligera 57 MB · con ficha 102 MB. La ficha y la ligera tienen el mismo audio que el máster (md5 del PCM idéntico) y los mismos fotogramas; el máster contra su prueba de 540×960 da ≥ 43,8 dB de PSNR.
- **Portada** (`EL POBLADO` · `VENTA`, receta en `portada.json`): DR06, el muro vegetal con el «GO» del edificio (1,4 s); contraste del texto · del isotipo 6,3 · 5,1. Un plano distinto a las diez que ya había de la suite.
- **Caption:** el de su original con la PRIMERA línea cambiada (`caption.md`).
- **Dónde está:** `/Volumes/SSK SSD/Work/Propiedades Luxur/Suite Go Living/Videos Social Media/083-recorrido.mp4`, `-recorrido-crf16.mp4`, `-recorrido-ficha.mp4`, `-portada.png`, `083.srt` y `083-caption.md` (sha256 comprobado al copiar; los mp4 y la portada ya no están en `proyectos/083/finales/`; el `.srt` y el caption se quedan).
