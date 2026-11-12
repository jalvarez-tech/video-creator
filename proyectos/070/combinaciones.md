# 070 · Suite Go Living (El Poblado) — registro de versiones y «cómo cambiar cada pieza»

> Primer reel de la suite hotelera en venta (V51 del registro de uso, `archivos/musica/registro-de-uso.md`). Reparto de los seis reels: `reparto-070-075.md`. Catálogo de las 61 tomas: `catalogo/catalogo-material.md`. Plan, layout y timeline: `artefactos/`.

## Versiones

| Rev. | Fecha | Estado | Qué es |
|---|---|---|---|
| 0 | 2026-11-07 | **prueba** (`pruebas-720p/070-recorrido.mp4`, 540×960) | HK01 · MD02 · CT01 · DR02 · *Somewhere inside of me* (entrada 298,394 s) · 1164 f · 38,8 s |

## La terna y el exterior (exclusivos de esta pieza dentro de la suite)

| Parte | Código | Archivo del disco | Dice / qué es | Voz |
|---|---|---|---|---|
| Exterior | DR02 | `3 Dron/IMG_5016 2.MOV` | la fachada con el sol de frente (iPhone desde el suelo) | — |
| Hook | HK01 | `1 Hooks/IMG_4937 2.MOV` | «¿Te preocupa invertir en el Airbnb con los cambios del POT?» | 1,17-4,10 s |
| Mitad | MD02 | `2 Mitad/IMG_4951 2.mov` | «No todas las propiedades tienen las mismas condiciones para operar turísticamente.» | 0,65-4,78 s |
| CTA | CT01 | `5 Cta/IMG_4940 2.MOV` | «Conoce Go Living, un edificio con operación hotelera activa.» | 0,50-4,10 s |

Recorridos (cada plano, en `artefactos/03-timeline.md`): RC12 1,00-4,57 s · RC02 0,60-3,43 s · RC01 0,80-4,37 s · RC06 1,20-4,17 s · RC04 0,60-3,57 s · RC07 2,50-6,07 s. Repuesto sin usar: DR03 y RC03, RC05 (normalizados).

## Cómo cambiar cada pieza

- **El hook (otro HK):** copiar el clip a `original/` con su código, añadirlo a `MATERIAL` de `normalizar.mjs` (sha) y a `VENTANA_VOZ` / `GANANCIA_VOZ_DB` (`limites-voz.py --margen 40` y `probar-voz.py --umbral 0.0316 --razon 3.5`; mirar el perfil de energía de la cola: `limites-voz.py` cortó 0,3 s antes la mitad), cambiar `src`, `audio`, `voz` y `desde` de `c02-hook`, rehacer `voz/<toma>.txt` y `trozos-editoriales.mjs` con su `--en`/`--desde`/`--s0`, y llevar cada línea a su sílaba (`onsets-voz.py`, `palabras-desde.py`). La duración del plano (hasta el golpe del f217) tiene que dejar ≥ 26 f tras la última palabra: si el hook es más largo, se cambia de rejilla (`buscar-cortes-lp.py`).
- **La mitad o el CTA:** igual. Con menos de 12 f de aire antes de la primera palabra, o con el clip entero ocupado (MD02: 166 f de 166), la toma entra **a corte** en el golpe.
- **El exterior:** `c01-edificio` (`src`, `desde`); dura hasta el f88 (el golpe del hook); DR03 es su gemelo.
- **La canción:** es la que decide los frames de todos los planos (`GOLPE` y `INICIO_MUSICA` de `metraje-070.ts`) y el nivel de cada tramo (`LUFS_*` de `audio-070.ts`): se vuelve a medir (`medir-pista.py --json`, `lufs-rangos.py`, `buscar-cortes-lp.py`) y los frames salen solos de `golpe(...)`. Una canción con una meseta MÁS BAJA que −15 LUFS pide subirla: ojo con el pico (`PICO_TRAMO`).
- **Los recorridos:** `src` y `desde` de c03-c05 y c07-c09; la duración de cada uno la fija la rejilla, no el clip. El paseo es de la puerta al ventanal (RC12 → RC02 → RC01 · RC06 → RC04 → RC07); la puerta lo comprueba en 2f.
- **El color:** `color({...})` por plano; la base está en `COLOR_BASE`. Luma medida en los stills (`pruebas-720p/stills1/`): 99-139 antes del ajuste de RC06/RC04.
- **La versión con ficha:** se renderiza con `--props={"sinSubtitulos":true}` y lleva tipo, lugar y precio durante todo el vídeo (`ficha-luxur`); **falta el precio** (el anuncio no lo trae).

## Metraje que comparte con las otras versiones de la suite

Ninguno todavía (es la primera). Las otras cinco del reparto usan otros planos o otros tramos de los mismos clips y lo declaran en su `combinaciones.md` (la puerta de cada una informa del metraje compartido).

## Por confirmar al oído (R31)

1. **«el» de «en el Airbnb»** (HK01, ≈ 3,8-4,7 s del vídeo): whisper la oye con confianza 0,36; sin ella sería «invertir en Airbnb».
2. **«POT»** (HK01, ≈ 5,5 s): se deletrea («pe-o-te»).
3. **«Go Living»** (CT01, ≈ 33,2 s): el nombre del edificio; el anuncio dice «Go Living Suites».
