# 087 — combinaciones y cómo cambiar cada parte

**V68 · variante B de la 078.** Misma terna (HK07 · MD02 · CT03), mismo exterior (DR09), misma canción («Ivory Skyline Reverie») y misma entrada. Cambia el ORDEN (estructura del 2026-11-10: `artefactos/01-plan.md`) y entra la ficha en pantalla. **Repite canción a propósito** (el usuario lo pidió: es la variante B de su original, no una versión nueva): declarado aquí y en `archivos/musica/registro-de-uso.md`.

| Qué | Dónde |
|---|---|
| El orden y la duración de los planos | `proyectos/087/pieza.json` (los anclajes: T1 179 · T2 247 · T3 321 · B 480; el CTA, en su golpe de la 078) y `node proyectos/080/herramientas/montar-pieza.mjs 087`, que reescribe `metraje-087.ts`, `audio-087.ts`, `subtitulos-087.ts` y la puerta |
| Los dos planos rápidos | `pieza.json` → `rapidos` (ZS03 2,80-5,07 s · RC11 5,55-8,02 s) |
| El recorrido | `pieza.json` → `recorrido` (ZS02 0,00-2,73 s → RC03 3,80-7,00 s → RC05 6,35-8,85 s → RC07 2,85-6,22 s); el generador reparte los cortes sobre los golpes medidos |
| El texto de la ficha | `ficha-087.ts` (`FICHA_087`) Y `.claude/skills/ficha-luxur/propiedades/suite-go-living.json`: la puerta (2g) exige que coincidan |
| Las dos versiones | `composiciones.tsx`: `Recorrido087` (normal: subtítulos en una fuente, sin ficha) y `Recorrido087Ficha` (prop `ficha`: ficha abajo, sin subtítulos). Nunca juntas |
| La música bajo la voz | `audio-087.ts` (niveles medidos el 2026-11-10 sobre las ventanas nuevas: `medidas/ventanas-musica.json`, `node proyectos/080/herramientas/montar-pieza.mjs 087 --medir`) |

**Para comprobar:** `node proyectos/087/revisar-087.mjs` · prueba: `bash proyectos/080/herramientas/render-prueba.sh 087` (la normal) y `… 087 ficha`.

## Metraje compartido con otras piezas (informa; repetirlo es una decisión)

- **070**: RC07 3,2 s
- **071**: RC03 1,5 s, RC05 0,7 s
- **072**: RC07 3,4 s
- **073**: RC11 1,3 s, RC03 0,5 s, RC05 1,1 s, RC07 3,4 s
- **074**: ZS03 0,4 s, ZS02 0,7 s
- **075**: RC07 3,3 s
- **076**: RC07 3,4 s
- **078**: DR09 2,7 s, ZS03 2,3 s, RC11 2,5 s, ZS02 2,5 s, RC03 3,2 s, RC05 2,5 s, RC07 3,4 s
- **079**: RC07 3,2 s
- **080**: RC03 1,8 s, RC05 0,5 s, RC07 3,0 s
- **081**: RC07 3,3 s
- **082**: RC07 3,4 s
- **083**: ZS03 0,9 s, ZS02 0,7 s
- **084**: RC07 3,3 s
- **085**: RC07 3,4 s

Los dos planos rápidos de esta pieza no se solapan con los de ninguna otra de la tanda (`node proyectos/080/herramientas/comparar-piezas.mjs`). La vista (RC07 o su equivalente) acaba cada recorrido: es el único plano de la ciudad con esa amplitud y se declara.

## Por confirmar al oído

1. «solo de» (HK07, f104 = 3,5 s del vídeo): whisper oye «sólo hay que» (confianza 0,27 / 0,45) y, en un corte desde 1,585 s, también «sólo hay que»; el catálogo lo lee «solo de». Las dos lecturas tienen 2-3 sílabas en los 0,3 s que hay entre «solo» y «comprar»: la energía no las distingue (`onsets-voz.py`). Si dice «solo hay que comprar una propiedad» el trozo cambia a «solo hay que».
2. «Conoce» (CT03, f845 = 28,2 s del vídeo): whisper oye «Conocer» (0,24) y en un corte aislado «Conocí»; por el contexto («esta oportunidad») es el imperativo «Conoce».

## Dónde está lo demás

Los `voz/*.txt` y `voz/*.json` son los de la 078 (las mismas tomas); `normalizar.mjs` es su receta con el número cambiado y no se ha vuelto a ejecutar: el material de `remotion/public/recorrido-087/` es un clon del normalizado de la 078. La final, la ficha y la portada se hacen con el sí del usuario (`render-final.sh`, `render-ficha-comp.sh`, `portada-luxur`, `mover-al-ssd.sh`).

## Entrega (2026-11-10, tras el «Sí, exporta»)

Exportada con las palabras «POR CONFIRMAR AL OÍDO» SIN OÍR (la orden de exportar no las quita; la nota se queda y `revisar-087.mjs --final` sigue fallando SOLO por ellas). Receta: `bash proyectos/080/herramientas/render-final.sh 087` (máster CRF 12 `slower` + ligera CRF 16 `slow`, etiquetas BT.709 arregladas sin pérdida con md5 de imagen y audio, `.srt`), `bash proyectos/080/herramientas/render-ficha-comp.sh 087` (la ficha es parte de la composición: se renderiza muda y se le copia el audio de la final) y `portada-luxur`.

- **Final:** 991 fotogramas a 1080×1920 y 30 fps, BT.709; -15,1 LUFS, pico real -1,8 dBFS. Máster 72 MB · ligera 37 MB · con ficha 72 MB. La ficha y la ligera tienen el mismo audio que el máster (md5 del PCM idéntico) y los mismos fotogramas; el máster contra su prueba de 540×960 da ≥ 43,8 dB de PSNR.
- **Portada** (`EL POBLADO` · `VENTA`, receta en `portada.json`): ZS02, los discos de pesas (17,2 s); contraste del texto · del isotipo 8,5 · 7,9. Un plano distinto a las diez que ya había de la suite.
- **Caption:** el de su original con la PRIMERA línea cambiada (`caption.md`).
- **Dónde está:** `/Volumes/SSK SSD/Work/Propiedades Luxur/Suite Go Living/Videos Social Media/087-recorrido.mp4`, `-recorrido-crf16.mp4`, `-recorrido-ficha.mp4`, `-portada.png`, `087.srt` y `087-caption.md` (sha256 comprobado al copiar; los mp4 y la portada ya no están en `proyectos/087/finales/`; el `.srt` y el caption se quedan).
