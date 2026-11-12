# 075 · Suite Go Living (El Poblado) — registro de versiones y «cómo cambiar cada pieza»

> Sexto reel de la suite hotelera en venta (V56 del registro de uso, `archivos/musica/registro-de-uso.md`). Reparto de los seis reels: `proyectos/070/reparto-070-075.md`. Catálogo de las 61 tomas: `proyectos/070/catalogo/catalogo-material.md`. Plan, layout y timeline: `artefactos/`. Andamio clonado de la 070.

## Versiones

| Rev. | Fecha | Estado | Qué es |
|---|---|---|---|
| 0 | 2026-11-08 | **prueba** (`pruebas-720p/075-recorrido.mp4`, 540×960) | HK06 · MD03 · CT08 · DR10 · *Street Level Sessions on the Green* (entrada 167,542 s) · 1140 f · 38,0 s |

## La terna y el exterior (exclusivos de esta pieza dentro de la suite)

| Parte | Código | Archivo del disco | Dice / qué es | Voz |
|---|---|---|---|---|
| Exterior | DR10 | `3 Dron/IMG_5058 2.MOV` | la entrada del edificio y la torre desde abajo (iPhone desde el suelo, NO dron) | — |
| Hook | HK06 | `1 Hooks/IMG_4960 2.mov` | «¿Y si tu próxima propiedad también pudiera generar ingresos?» | 0,62-3,56 s |
| Mitad | MD03 | `2 Mitad/IMG_4961 2.mov` | «Una suite hotelera, totalmente equipada en El Poblado.» | 0,75-4,02 s |
| CTA | CT08 | `5 Cta/IMG_4976 2.mov` | «Agendemos una visita y descubre Go Living Suites.» | 0,75-3,60 s |

Recorridos (cada plano, en `artefactos/03-timeline.md`): RC08 2,20-4,83 s · RC06 4,40-7,43 s · RC09 1,80-5,07 s · RC02 2,60-5,17 s · RC01 4,40-7,97 s · RC07 1,10-6,20 s. Repuesto sin usar (normalizados): RC10, RC13.

## Cómo cambiar cada pieza

- **El hook / la mitad / el CTA (otra toma):** copiar el clip a `original/`, añadirlo a `MATERIAL` de `normalizar.mjs` (sha), medir la voz POR ENERGÍA (`limites-voz.py --margen 40` y el perfil de la cola: no fiarse de whisper para el principio) y poner `VENTANA_VOZ` y `GANANCIA_VOZ_DB` (`probar-voz.py --umbral 0.0316 --razon 3.5`); cambiar `src`, `audio`, `voz` y `desde` del plano; rehacer `voz/<toma>.txt` y `trozos-editoriales.mjs` y llevar cada línea a su sílaba (`onsets-voz.py`, `palabras-desde.py`). **El hook** pide ≥ 26 f entre su última palabra y el golpe del f231; **la mitad**, ≥ 8 f entre la suya y el golpe del f629 y un clip que dé 129-132 f; **el CTA**, ≥ 16 f tras la suya (el fundido).
- **Una toma con aire antes de su primera palabra (≥ 24 f)** podría entrar disolviendo (la puerta de la 070 lo hace con HK01): aquí ninguna lo tiene, por eso los nueve planos son cortes secos.
- **El exterior:** `c01-entrada` (`src`, `desde`); dura hasta el f103 (el golpe del hook).
- **La canción:** decide los frames de todos los planos (`GOLPE` e `INICIO_MUSICA` de `metraje-075.ts`) y el nivel de cada tramo (`LUFS_*` de `audio-075.ts`): se vuelve a medir (`medir-pista.py --json`, `lufs-rangos.py`, `buscar-cortes-lp.py` con `TIPOS=dccccccccc`) y los frames salen solos de `golpe(...)`.
- **Los recorridos:** `src` y `desde` de c03-c05 y c07-c08; la duración la fija la rejilla. La vista (c09) tiene que ser el plano más largo del bloque 5.
- **El color:** `color({...})` por plano; la base en `COLOR_BASE`. Bajados de exposición: RC06 −0,12, RC09 −0,10 y el baño −0,08 (25-30 niveles más claros que el resto).
- **Renders mientras se montan otras piezas:** `ENTRADA=src/proyectos/075/entrada-solo.tsx` (stills) y `bash proyectos/075/herramientas/render-prueba-solo.sh` (prueba): el bundle solo lleva la 075 y no cae si una pieza hermana está a medias.
- **La versión con ficha:** `--props={"sinSubtitulos":true}`; **falta el precio** (el anuncio no lo trae).

## Metraje que comparte con las otras versiones de la suite

- **Con la 070:** RC07 (la vista), 3,6 s del tramo 2,5-6,07 s (el único clip de la suite con una ciudad de ≥ 5 s); RC02, 0,8 s (la 075: 2,60-5,17 s; la 070: 0,60-3,43 s). RC06 y RC01 usan tramos distintos (4,40-7,43 s y 4,40-7,97 s frente a 1,20-4,17 s y 0,80-4,37 s).
- Con las demás piezas (071-074): se declara en la suya.

## Por confirmar al oído (R31)

1. **La «Y» inicial** del hook (≈ 3,8 s): whisper 0,37.
2. **«hotelera» y «Poblado»** (MD03, ≈ 17,4-19,4 s): whisper 0,13 y 0,20.
3. **«Agendemos» y «Go Living Suites»** (CT08, ≈ 32,6 y 34,6 s): whisper oye «Ajenlemos» (0,14) y «Go Living Sweets» (Go 0,37, Sweets 0,24); el anuncio dice «Go Living Suites».
