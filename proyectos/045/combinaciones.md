# Combinaciones — proyecto 045 · Tierra Grata Bosque Santo (ARRIENDO), V27 «El tiempo»

Registro de esta versión y mapa de «cómo cambiar cada pieza». Es la PRIMERA de los seis reels de esta propiedad (V27-V32, proyectos 045-050); las otras cinco se montan a la vez en sus worktrees (reparto en [`../044/reparto-045-050.md`](../044/reparto-045-050.md), catálogo en [`../044/catalogo-material.md`](../044/catalogo-material.md)). Lo que usó cada versión está también en `archivos/musica/registro-de-uso.md` (§1, §2 y §7), el tablero de coordinación entre sesiones.

## Versiones de esta propiedad

| V | Proyecto | Estado | Fecha | Qué es |
|---|---|---|---|---|
| **V27** | **045** | **en prueba (pendiente del OK del usuario)** | 2026-10-19 | **«El tiempo»**: **RC01** (apertura) · **HK01** · RC11 · RC14 · RC16 · **MD01** · RC05 · RC09 · **RC21** (la vista, con el jacuzzi privado) · **CT01** · *Fortitude (Light Version)* · 1318 f · 43,9 s |
| V28-V32 | 046-050 | sesiones hermanas | 2026-10-19 | «Ciudad nueva», «Lo que incluye», «Chef y experiencias», «Amenidades», «14,8» |

## Lo que lleva (rev. 0 = la prueba)

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Apertura | RC01 `Img 9461` 0,00-3,70 s | asignada (apartamento, sin dron): la isla de la cocina y sus taburetes, limpia desde el f0; el clip sigue hasta el balcón y la vista (≈ 8 s en adelante), que no entra. Exclusiva de esta pieza |
| Hook | HK01 `IMG_4269` (voz 0,82-6,62 s; `desde` 15 f) | asignada. **Repetida en la V30 (048)**, declarado. El catálogo decía «la voz empieza casi en el f0»: es el DTW de whisper (R29); la energía dice 0,82 s |
| Paseo (bloque 3) | RC11 Social Kitchen 0,80-4,17 · RC14 gimnasio 0,00-3,57 · RC16 piscina 2,00-5,40 | los tres usos del tiempo ganado (trabajar, cuidarse, descansar), todos girando a la derecha. RC11 se acaba antes de que entre un hombre de amarillo (≈ 6 s); RC14, antes de las caminadoras con un hombre en primer plano (≈ 4 s); la sauna (RC15) queda fuera (oscura) |
| Mitad | MD01 `IMG_4274` (voz 0,62-4,73 s; `desde` 9 f) | asignada; continúa a HK01 («de esta manera») |
| Bloque 5 | RC05 alcoba 0,30-3,43 · RC09 baño 2,50-5,23 · **RC21** balcón 5,43-11,07 | «todo ordenado» enseñado justo después de decirlo; el clímax es RC21 con el **jacuzzi privado** entero en el cuadro desde los 9,5 s |
| CTA | CT01 `IMG_4277` (voz 0,70-4,52 s; `desde` 11 f, la toma entera) | asignada. **Repetida en la V31 (049)**, declarado |
| Canción | *Fortitude (Light Version)* (`493eeec6`) | asignada. La única rejilla de la canción en los 10-50 s con los cortes secos a ≥ 8,3 dB: entrada **9,834 s** (golpe de 11,3 dB) |
| Entrada de la canción | 9,8 s (`INICIO_MUSICA` = 294/30) | golpe de 11,3 dB en el f3 |
| Voz | −15 LUFS tratada (+18,0 · +18,0 · +17,8 dB tras el compresor 3,5:1; limitador −2,5 dBFS) | pedido permanente: «a −15 LUFS sin saturar». Los chasquidos de labios de antes de la primera palabra (MD01 0,55 s, CT01 0,63 s) quedan fuera (`VENTANA_VOZ`) |
| Música sola | −15,0 (apertura) · −15,5 (paseo) · −15,2 (bloque 5) LUFS; −26 bajo la voz; el golpe del CTA, ≈ 1,2 dB más bajo | la canción es SUAVE (−20…−18 LUFS): sube de +2,8 a +5,5 dB y el techo de pico de −0,5 dBFS manda en el paseo y el bloque 5 |
| Color | `COLOR_BASE` (la del 017) + el ajuste de cada plano (medido) | ver abajo |

## Lo medido en la prueba (rev. 0)

| Qué | Medida |
|---|---|
| Cortes secos sobre golpes | los 5 cortes secos medibles (f414, f521, f769, f863, f945) a −0,4…+0,3 f del golpe, de 8,3 a 13,5 dB (`golpes-render.py` sobre el AAC de la prueba); los tres en que entra Isabella (f111, f623, f1114) a −0,3…0,0 f; sobre el WAV del render el golpe llega ≈ 1,3 f antes (el AAC de Remotion llega tarde: `final-remotion-audio-43ms-tarde`) |
| Subtítulos | 15 líneas a +0,3…+1,5 f de su palabra sobre la voz sola (`lineas-vs-onsets.py`); el DTW de whisper iba hasta 0,5 s tarde en MD01 y CT01 (R31) |
| Legibilidad (texto blanco sin sombra) | contraste 3,2-11,6 : 1 al p90 y 2,7-5,7 al p99 (017: 2,9-3,7 / 2,6-3,0; 018: 2,8-4,1 / 2,3-3,5); lo más bajo, el CTA sobre el jacuzzi comunal |
| Color (`medir-color.py`, antes → después) | σ de luma entre planos 20,2 → 13,6 · quemado máx. 0,8 % · aplastado máx. 6,7 % (el vestido negro de Isabella en MD01) · saturación media 0,215 → 0,234; saltos de luma en los cortes secos: de −8,5 a +15,5 (el mayor, la Social Kitchen → el gimnasio) |
| Pieza (prueba) | ≈ −15,2 LUFS integrado |

## Cómo cambiar cada pieza

- **Otro hook / mitad / CTA:** añade su fila a `MATERIAL` de `normalizar.mjs` (con su sha) y su ventana a `VENTANA_VOZ` (mide el perfil de energía: ¡no te fíes de whisper para el arranque!), la ganancia con `herramientas/probar-voz.py --umbral 0.0316 --razon 3.5` (editar su `TOMAS`) → `GANANCIA_VOZ_DB`. Luego `voz.s0/s1/lufs/dice` del corte, el guion marcado `voz/<toma>.txt`, cada línea llevada a su palabra con `perfil-voz.py`/`onsets-voz.py` + `palabras-desde.py` (tabla de `lineas-vs-onsets.py`). Si cambia la duración del plano cambia la rejilla (abajo).
- **Otro recorrido:** añade su fila a `MATERIAL` (sin recorte: son verticales anamórficos) y cambia el `src`, `desde` y `color` del plano. Duración = la del plano (la rejilla no se toca). Mira el plano ENTERO a 0,5 s antes de elegir tramo: en las zonas comunes (gimnasio, Social Kitchen) entra gente.
- **Otra canción:** reservarla en el registro; `herramientas/buscar-cortes-043.py` con `R='[[75,110],[188,210],[60,110],[60,110],[60,110],[138,149],[60,100],[60,100],[110,170]]' TIPOS=cddccccccc MINC=8 MIND=6 DROP=0 START_MIN=9 FIN=todas ORDEN=golpe`; `medir-pista.py … --json musica/golpes-045.json`; los `GOLPE` de `metraje-045.ts`, `INICIO_MUSICA` y los niveles de `audio-045.ts` (`LUFS_TRAMO`, `PICO_TRAMO`, `LUFS_CANCION_EN_VOZ`; `lufs-rangos.py`). La alternativa reservada era *Cornfield Chase*; no se midió (sin necesidad).
- **Otro color:** `color({…})` de cada plano (topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `contrast` ≤ 1,22, `saturation` 0,95-1,12 y ≤ 1,06 en Isabella). Stills antes/después: `stills-multiples.mjs` y `stills-antes.mjs`; `medir-color.py`.
- **Sin música** (publicar con un audio de la plataforma): `HAY_MUSICA = false` en `audio-045.ts`; las voces siguen a −15 LUFS.
- **La versión con ficha** (funnel): `Recorrido045` acepta `sinSubtitulos` (apaga los subtítulos y su velo); ver `ficha-luxur` §3.

## Lo por confirmar

- **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto, y las notas SE QUEDAN): «**aseo semanal**» (HK01, «aseo» hacia el f272 = 9,07 s del vídeo), «**todo ordenado**» (MD01, «todo» hacia el f673 = 22,4 s), «**toda tu estancia**» (CT01, «tu» hacia el f1188 = 39,6 s) y «**contáctanos**» (CT01, f1212 = 40,4 s).
- **Lo declarado:** el recorrido (verticales anamórficos escalados ×2,13 en vertical) algo más blando que Isabella (4K); el hook (V30) y el CTA (V31) repetidos en otras piezas; dos de las tres tomas de Isabella en la terraza común; la canción suave con cortes en golpes de 8,3-15,5 dB; la música a −15,5/−15,2 LUFS por el techo de pico.
- La canción (medida, no oída; licencia sin verificar).
