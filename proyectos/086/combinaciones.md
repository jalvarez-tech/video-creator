# 086 — combinaciones y cómo cambiar cada parte

**V67 · variante B de la 077.** Misma terna (HK03 · HK05 · CT04), mismo exterior (DR04), misma canción («Light Fills the Room») y misma entrada. Cambia el ORDEN (estructura del 2026-11-10: `artefactos/01-plan.md`) y entra la ficha en pantalla. **Repite canción a propósito** (el usuario lo pidió: es la variante B de su original, no una versión nueva): declarado aquí y en `archivos/musica/registro-de-uso.md`.

| Qué | Dónde |
|---|---|
| El orden y la duración de los planos | `proyectos/086/pieza.json` (los anclajes: T1 214 · T2 255 · T3 301 · B 430; el CTA, en su golpe de la 077) y `node proyectos/080/herramientas/montar-pieza.mjs 086`, que reescribe `metraje-086.ts`, `audio-086.ts`, `subtitulos-086.ts` y la puerta |
| Los dos planos rápidos | `pieza.json` → `rapidos` (ZS02 5,40-6,77 s · RC08 3,20-4,73 s) |
| El recorrido | `pieza.json` → `recorrido` (RC11 0,45-3,18 s → ZS01 2,00-5,07 s → ZS05 4,30-7,07 s → DR05 3,30-6,83 s); el generador reparte los cortes sobre los golpes medidos |
| El texto de la ficha | `ficha-086.ts` (`FICHA_086`) Y `.claude/skills/ficha-luxur/propiedades/suite-go-living.json`: la puerta (2g) exige que coincidan |
| Las dos versiones | `composiciones.tsx`: `Recorrido086` (normal: subtítulos en una fuente, sin ficha) y `Recorrido086Ficha` (prop `ficha`: ficha abajo, sin subtítulos). Nunca juntas |
| La música bajo la voz | `audio-086.ts` (niveles medidos el 2026-11-10 sobre las ventanas nuevas: `medidas/ventanas-musica.json`, `node proyectos/080/herramientas/montar-pieza.mjs 086 --medir`) |

**Para comprobar:** `node proyectos/086/revisar-086.mjs` · prueba: `bash proyectos/080/herramientas/render-prueba.sh 086` (la normal) y `… 086 ficha`.

## Metraje compartido con otras piezas (informa; repetirlo es una decisión)

- **071**: RC08 1,5 s
- **074**: ZS01 1,4 s
- **075**: RC08 1,5 s
- **076**: ZS02 1,3 s, RC08 0,4 s, RC11 2,3 s, ZS01 1,6 s, ZS05 2,1 s
- **077**: DR04 3,0 s, ZS02 1,4 s, RC11 2,1 s, ZS01 1,6 s, ZS05 1,9 s, DR05 3,5 s
- **084**: RC08 1,5 s
- **085**: ZS02 1,3 s, RC08 0,4 s, RC11 1,9 s, ZS01 1,6 s, ZS05 2,3 s

Los dos planos rápidos de esta pieza no se solapan con los de ninguna otra de la tanda (`node proyectos/080/herramientas/comparar-piezas.mjs`). La vista (RC07 o su equivalente) acaba cada recorrido: es el único plano de la ciudad con esa amplitud y se declara.

## Por confirmar al oído

1. «Descubre una suite» (HK05 como mitad, f310 = 10,3 s del vídeo): whisper oye «Descubro en EZID» (confianzas 0,31-0,58); «una suite» va tan rápido que se oye «nezit».
2. «hotelera» (HK05 como mitad, f381 = 12,7 s del vídeo): whisper la oye con confianza 0,51.
3. «contáctame» (CT04, f837 = 27,9 s del vídeo): whisper oye «contacta a mí» (0,42-0,50).

## Dónde está lo demás

Los `voz/*.txt` y `voz/*.json` son los de la 077 (las mismas tomas); `normalizar.mjs` es su receta con el número cambiado y no se ha vuelto a ejecutar: el material de `remotion/public/recorrido-086/` es un clon del normalizado de la 077. La final, la ficha y la portada se hacen con el sí del usuario (`render-final.sh`, `render-ficha-comp.sh`, `portada-luxur`, `mover-al-ssd.sh`).

## Entrega (2026-11-10, tras el «Sí, exporta»)

Exportada con las palabras «POR CONFIRMAR AL OÍDO» SIN OÍR (la orden de exportar no las quita; la nota se queda y `revisar-086.mjs --final` sigue fallando SOLO por ellas). Receta: `bash proyectos/080/herramientas/render-final.sh 086` (máster CRF 12 `slower` + ligera CRF 16 `slow`, etiquetas BT.709 arregladas sin pérdida con md5 de imagen y audio, `.srt`), `bash proyectos/080/herramientas/render-ficha-comp.sh 086` (la ficha es parte de la composición: se renderiza muda y se le copia el audio de la final) y `portada-luxur`.

- **Final:** 936 fotogramas a 1080×1920 y 30 fps, BT.709; -15,1 LUFS, pico real -3,2 dBFS. Máster 72 MB · ligera 37 MB · con ficha 74 MB. La ficha y la ligera tienen el mismo audio que el máster (md5 del PCM idéntico) y los mismos fotogramas; el máster contra su prueba de 540×960 da ≥ 43,8 dB de PSNR.
- **Portada** (`EL POBLADO` · `VENTA`, receta en `portada.json`): DR04, las hojas blancas sobre la fachada (1,5 s); contraste del texto · del isotipo 13,3 · 5,1. Un plano distinto a las diez que ya había de la suite.
- **Caption:** el de su original con la PRIMERA línea cambiada (`caption.md`).
- **Dónde está:** `/Volumes/SSK SSD/Work/Propiedades Luxur/Suite Go Living/Videos Social Media/086-recorrido.mp4`, `-recorrido-crf16.mp4`, `-recorrido-ficha.mp4`, `-portada.png`, `086.srt` y `086-caption.md` (sha256 comprobado al copiar; los mp4 y la portada ya no están en `proyectos/086/finales/`; el `.srt` y el caption se quedan).
