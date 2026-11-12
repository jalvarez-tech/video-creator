# 072 · Suite Go Living (El Poblado) — registro de versiones y «cómo cambiar cada pieza»

> Tercer reel de la suite hotelera en venta (V53 del registro de uso, `archivos/musica/registro-de-uso.md`). Reparto de los seis reels: `proyectos/070/reparto-070-075.md`. Catálogo de las 61 tomas: `proyectos/070/catalogo/catalogo-material.md`. Plan, layout y timeline: `artefactos/`.

## Versiones

| Rev. | Fecha | Estado | Qué es |
|---|---|---|---|
| 0 | 2026-11-08 | **prueba** (`pruebas-720p/072-recorrido.mp4`, 540×960) | HK11 · MD08 · CT11 · DR05 · *I Feel It Coming* (entrada 227,745 s) · 1071 f · 35,7 s |

## La terna y el exterior (exclusivos de esta pieza dentro de la suite)

| Parte | Código | Archivo del disco | Dice / qué es | Voz |
|---|---|---|---|---|
| Exterior | DR05 | `3 Dron/IMG_5022 2.MOV` | los voladizos de la fachada contra el cielo con nubes (iPhone desde el suelo) | — |
| Hook | HK11 | `1 Hooks/IMG_5031 2.mov` | «En inversión inmobiliaria, la ubicación lo cambia todo.» (terraza alta) | 0,47-3,58 s |
| Mitad | MD08 | `2 Mitad/IMG_5032 2.mov` | «A minutos de Oviedo, Santa Fe, EAFIT y la estación Aguacatala.» (terraza, tras el cristal) | 0,47-4,32 s |
| CTA | CT11 | `5 Cta/IMG_5034 2.mov` | «Descubre esta suite en El Poblado y déjate asombrar por la ubicación.» (lobby con ventanales) | 0,76-4,38 s |

Recorridos (cada plano, en `artefactos/03-timeline.md`): DR03 0,70-4,13 s · DR01 0,40-3,63 s · RC03 0,00-2,57 s · RC13 1,90-4,47 s · RC05 0,00-2,60 s · RC07 2,45-6,22 s. Repuesto normalizado sin usar: DR04 y RC10.

## Cómo cambiar cada pieza

- **El hook (otro HK):** copiar el clip a `original/` con su código, añadirlo a `MATERIAL` de `normalizar.mjs` (sha) y a `VENTANA_VOZ` / `GANANCIA_VOZ_DB` (`limites-voz.py --margen 40` Y el perfil de energía de la cola: aquí cortó 0,4 s del hook y 1 s del CTA), cambiar `src`, `audio`, `voz` y `desde` de `c02-hook`, rehacer `voz/<toma>.txt` y `trozos-editoriales.mjs` con su `--en`/`--desde`/`--s0`, y llevar cada línea a su sílaba (`onsets-voz.py`, `palabras-desde.py`). OJO: HK11 dura 110 f y el plano del hook es el clip ENTERO; con un hook más largo la rejilla cambia (`rejilla-libre.py --hook N`).
- **La mitad o el CTA:** igual. MD08 se usa entero (136 f de 149) y a corte; el CTA entra disolviendo porque su primera palabra deja 12 f de aire.
- **El exterior:** `c01-edificio` (`src`, `desde`); dura hasta el f80 (el golpe del hook).
- **La canción:** decide los frames de todos los planos (`GOLPE` e `INICIO_MUSICA` de `metraje-072.ts`) y el nivel de cada tramo (`LUFS_*` de `audio-072.ts`): se vuelve a medir (`medir-pista.py --json`, `lufs-rangos.py`, `rejilla-libre.py`) y los frames salen de `golpe(...)`. La alternativa asignada en el reparto es *La Isla Bonita (Saxophone 80 Mix)* (sha8 `71321b4f`; la V7 de One Living la quitó por «muy playera»): NO se probó, porque la primera sirvió.
- **Los recorridos:** `src` y `desde` de c03-c05 y c07-c09; la duración de cada uno la fija la rejilla, no el clip. La puerta comprueba el hilo (2f).
- **El color:** `color({...})` por plano; la base está en `COLOR_BASE`. Luma medida en los stills (`pruebas-720p/stills1/`): 90-142 antes del ajuste de RC13 y RC03.
- **La versión con ficha:** se renderiza con `--props={"sinSubtitulos":true}` y lleva tipo, lugar y precio durante todo el vídeo (`ficha-luxur`); **falta el precio**.

## Metraje que comparte con las otras versiones de la suite

- **Con la 070:** RC07, 3,1 s (2,45-6,22 s frente a 2,5-6,07 s de la 070): es la vista del ventanal, el único plano que la enseña con esa amplitud. Declarado.
- Con las demás (071, 073-075): lo informa la sección 7b de la puerta de cada una cuando se consolide el reparto.

## Por confirmar al oído (R31)

1. **«Oviedo»** (MD08, ≈ 16,7 s): whisper oyó «odio» (0,02).
2. **«EAFIT»** (MD08, ≈ 18,1 s): whisper oyó «Eafid» (0,34); **no está en el anuncio**.
3. **«Aguacatala»** (MD08, ≈ 18,7 s): whisper oyó «Acuacatala» (0,42).
4. **«déjate»** (CT11, ≈ 31,2 s): whisper la oyó con 0,05.
