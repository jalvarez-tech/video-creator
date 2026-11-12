# 074 · Suite Go Living (El Poblado) — «Las zonas sociales» · registro de versiones y «cómo cambiar cada pieza»

> Quinto reel de la suite hotelera en venta (V55 del registro de uso, `archivos/musica/registro-de-uso.md`). Reparto de los seis reels: `proyectos/070/reparto-070-075.md`. Catálogo de las 61 tomas: `proyectos/070/catalogo/catalogo-material.md`. Plan, layout y timeline: `artefactos/`. Método y lo aprendido: `proyectos/070/aprendizajes.md` y `aprendizajes.md`.

## Versiones

| Rev. | Fecha | Estado | Qué es |
|---|---|---|---|
| 0 | 2026-11-08 | **prueba** (`pruebas-720p/074-recorrido.mp4`, 540×960) | HK09 · MD09 · CT12 · DR06 · *Some Say* (entrada 140,733 s) · 1094 f · 36,5 s |

## La terna y el exterior (exclusivos de esta pieza dentro de la suite)

| Parte | Código | Archivo del disco | Dice / qué es | Voz |
|---|---|---|---|---|
| Exterior | DR06 | `3 Dron/IMG_5050 2.MOV` | el muro vegetal con el logotipo «GO» del edificio (iPhone desde el suelo) | — |
| Hook | HK09 | `1 Hooks/IMG_5006 2.mov` | «Las buenas inversiones empiezan con buenas decisiones.» | 1,04-4,03 s |
| Mitad | MD09 | `2 Mitad/IMG_5038 2.mov` | «Una ubicación estratégica, amenidades y cercanía a los principales destinos turísticos.» | 0,60-5,48 s |
| CTA | CT12 | `5 Cta/IMG_5040 2.mov` | «Conoce esto y mucho más en Go Living Suites.» | 0,68-3,16 s |

Recorridos (cada plano, en `artefactos/03-timeline.md`): DR01 1,00-3,30 s · DR07 1,50-3,80 s · ZS01 0,30-3,43 s · ZS02 2,00-5,40 s · ZS03 0,30-3,20 s · DR03 0,50-4,47 s. Repuesto sin usar y ya normalizado: DR04, RC07, RC10.

## Cómo cambiar cada pieza

- **El hook (otro HK):** copiar el clip a `original/` con su código, añadirlo a `MATERIAL` de `normalizar.mjs` (sha) y a `VENTANA_VOZ` / `GANANCIA_VOZ_DB` (`limites-voz.py --margen 40` Y el perfil de energía de la cola con `scratchpad/perfil.py`: aquí `limites-voz` cortó 0,2-0,65 s las tres tomas; `probar-voz.py --umbral 0.0316 --razon 3.5`), cambiar `src`, `audio`, `voz` y `desde` de `c02-hook`, rehacer `voz/<toma>.txt` y llevar cada línea a su sílaba (`onsets-voz.py`, `palabras-desde.py`). **El plano del hook no puede durar más que el clip menos `desde`** (HK09: 132 f): si el hook es más largo que el espacio hasta el golpe del paseo (f208), se cambia de rejilla (`buscar-cortes-lp.py`).
- **La mitad o el CTA:** igual. Con menos de 12 f de aire antes de la primera palabra, o con el clip entero ocupado (MD09: 181 de 184 f), la toma entra **a corte** en el golpe.
- **El exterior:** `c01-edificio` (`src`, `desde`); dura hasta el f90 (el golpe del hook). DR06 trae el «GO» entre las hojas; DR01/DR03/DR04/DR07 son del mismo edificio.
- **La canción:** es la que decide los frames de todos los planos (`GOLPE` e `INICIO_MUSICA` de `metraje-074.ts`) y el nivel de cada tramo (`LUFS_*` de `audio-074.ts`): se vuelve a medir (`medir-pista.py --json`, `lufs-rangos.py`, `buscar-cortes-lp.py` con `TIPOS=ddcccccccc`) y los frames salen solos de `golpe(...)`.
- **Los recorridos:** `src` y `desde` de c03-c05 y c07-c09; la duración de cada uno la fija la rejilla, no el clip. El paseo es del edificio (DR01 → DR07) al gimnasio (ZS01) y, tras la mitad, del gimnasio (ZS02 → ZS03) a la fachada (DR03); la puerta lo comprueba en 2f.
- **El color:** `color({...})` por plano; la base está en `COLOR_BASE`. Luma medida en los stills (`pruebas-720p/stills1/`): 84-121 antes del ajuste de DR07 (−0,10) y de Isabella en el gimnasio (+0,10).
- **La versión con ficha:** se renderiza con `--props={"sinSubtitulos":true}` y lleva tipo, lugar y precio durante todo el vídeo (`ficha-luxur`); **falta el precio** (el anuncio no lo trae).

## Metraje que comparte con las otras versiones de la suite

Con la 070 (V51): ninguno. La 074 no usa ningún plano de la suite (RC##); DR02 (070) y DR03 (074) son gemelos del mismo edificio pero clips distintos. Las otras tres piezas del reparto (071-073, 075) usan otros planos y lo declaran en su `combinaciones.md`; DR01, DR03, DR04 y DR07 se reservaron a esta pieza en el reparto de sesiones.

## Por confirmar al oído (R31)

1. **«estratégica»** (MD09, ≈ 15,3-16,4 s del vídeo): whisper la oye con confianza 0,24.
2. **«esto»** (CT12, ≈ 31,3-31,9 s): whisper oye «eso».
3. **«Go Living Suites»** (CT12, ≈ 32,9 s): el nombre del edificio; whisper oye «Goblin en Suiz».
