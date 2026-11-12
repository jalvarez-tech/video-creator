# 073 · Suite Go Living (El Poblado) — registro de versiones y «cómo cambiar cada pieza»

> Cuarto reel de la suite hotelera en venta (V54 del registro de uso, `archivos/musica/registro-de-uso.md`). Reparto de los seis reels: `proyectos/070/reparto-070-075.md`. Catálogo de las 61 tomas: `proyectos/070/catalogo/catalogo-material.md`. Plan, layout y timeline: `artefactos/`. Hereda el andamio de la 070 (`proyectos/070/aprendizajes.md`).

## Versiones

| Rev. | Fecha | Estado | Qué es |
|---|---|---|---|
| 0 | 2026-11-08 | **prueba** (`pruebas-720p/073-recorrido.mp4`, 540×960) | HK10 · MD01 · CT10 · DR09 · *Chillin'* (entrada 259,21 s) · 1229 f · 41,0 s |

## La terna y el exterior (exclusivos de esta pieza dentro de la suite)

| Parte | Código | Archivo del disco | Dice / qué es | Voz |
|---|---|---|---|---|
| Exterior | DR09 | `3 Dron/IMG_5057 2.MOV` | la torre desde abajo entre palmas (iPhone desde el suelo) | — |
| Hook | HK10 | `1 Hooks/IMG_5011 2.mov` | «¿Vives fuera de Colombia y quieres invertir en Medellín?» | 0,57-3,31 s |
| Mitad | MD01 | `2 Mitad/IMG_4945 2.mov` | «Una suite hotelera, con matrícula independiente, en edificios con reconocimiento.» | 0,88-5,40 s |
| CTA | CT10 | `5 Cta/IMG_5010 2.mov` | «Haz clic en el enlace y recibe más información sobre Go Living Suites en Medellín.» | 0,62-4,85 s |

Recorridos: RC03 0,60-4,27 s · RC11 3,00-6,80 s · RC04 3,80-6,07 s · RC06 4,50-7,43 s · RC05 3,60-7,40 s · RC07 1,50-6,23 s. Repuesto sin usar: RC02 y RC10 (normalizados).

## Cómo cambiar cada pieza

- **El hook (otro HK):** copiar el clip a `original/` con su código, añadirlo a `MATERIAL` de `normalizar.mjs` (sha) y a `VENTANA_VOZ` / `GANANCIA_VOZ_DB` (mide el arranque y la cola por ENERGÍA con `onsets-voz.py` y `scratchpad/perfil.py`: `limites-voz.py` se come la primera y la última palabra), cambiar `src`, `audio`, `voz` y `desde` de `c02-hook`, rehacer `voz/<toma>.txt` y `trozos-editoriales.mjs`, y llevar cada línea a su sílaba. La duración del plano (hasta el golpe del f205) tiene que dejar ≥ 8 f tras la última palabra: el HK10 solo dura 114 f y entra a corte con el clip entero.
- **La mitad o el CTA:** igual. Con menos de 12 f de aire antes de la primera palabra la toma entra **a corte** en el golpe (el CTA); con ≥ 12 f y el clip entero ocupado (la mitad: 187 de 191 f), disolviendo.
- **El exterior:** `c01-edificio` (`src`, `desde`); dura hasta el f93 (el golpe del hook).
- **La canción:** decide los frames de todos los planos (`GOLPE` y `INICIO_MUSICA` de `metraje-073.ts`) y el nivel de cada tramo (`LUFS_*` de `audio-073.ts`): se vuelve a medir (`medir-pista.py --json`, `lufs-rangos.py`, `buscar-cortes-lp.py` con `MINC`) y los frames salen solos de `golpe(...)`. **Ninguna ganancia puede pasar de +6 dB** (`GANANCIA_MAXIMA` del motor): una canción con 20 dB de dinámica dentro de la ventana (*Familiar*) no sirve.
- **Los recorridos:** `src` y `desde` de c03-c05 y c07-c09; la duración de cada uno la fija la rejilla, no el clip (RC04 solo da 2,3 s desde el 3,8: por eso es el plano de 68 f). El paseo es del pasillo a la vista; la puerta lo comprueba en 2f.
- **El color:** `color({...})` por plano; luma medida en los stills (`pruebas-720p/stills1/`): 99-137 antes del ajuste de exposición.
- **La versión con ficha:** se renderiza con `--props={"sinSubtitulos":true}`; **falta el precio** (el anuncio no lo trae).

## Metraje que comparte con las otras versiones de la suite

- **Con la 070:** la VISTA (RC07): 1,50-6,23 s aquí y 2,50-6,07 s allí → **3,6 s en común** (declarado: es el único plano del cuarto en que la cámara sube de la cama al ventanal). RC04 (3,8-6,07 / 0,6-3,57) y RC06 (4,5-7,43 / 1,2-4,17) son del mismo clip pero NO se solapan.
- Con 071, 072, 074 y 075: lo declaran ellas (la puerta de cada una informa del metraje compartido).

## Por confirmar al oído (R31)

1. **«vives»** (HK10, ≈ 3,7-4,7 s del vídeo): whisper oye «Vivo» (0,14-0,16); y «Medellín» (0,36).
2. **«en edificios con reconocimiento»** (MD01, ≈ 19,6-21,6 s): afirmación suya que el anuncio no recoge; confirmar con el usuario además de oírla.
3. **«Haz»** (CT10, ≈ 34,2 s) y **«Go Living Suites»** (≈ 36,9 s; whisper oyó «StatSuite», 0,04).
