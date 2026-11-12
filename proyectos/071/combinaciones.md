# 071 · Suite Go Living (El Poblado) — registro de versiones y «cómo cambiar cada pieza»

> Segundo reel de la suite hotelera en venta (V52 del registro de uso, `archivos/musica/registro-de-uso.md`). Reparto de los seis reels: `proyectos/070/reparto-070-075.md`. Catálogo de las 61 tomas: `proyectos/070/catalogo/catalogo-material.md`. Plan, layout y timeline: `artefactos/`. Andamio copiado de la 070 (`proyectos/070/combinaciones.md` y `aprendizajes.md`).

## Versiones

| Rev. | Fecha | Estado | Qué es |
|---|---|---|---|
| 0 | 2026-11-08 | **prueba** (`pruebas-720p/071-recorrido.mp4`, 540×960) | HK08 · MD06 · CT09 · DR08 · *Heaven on Earth* (entrada 178,043 s) · 950 f · 31,7 s |

## La terna y el exterior (exclusivos de esta pieza dentro de la suite)

| Parte | Código | Archivo del disco | Dice / qué es | Voz |
|---|---|---|---|---|
| Exterior | DR08 | `3 Dron/IMG_5056 2.MOV` | la torre entre monstera y follaje (iPhone desde el suelo) | — |
| Hook | HK08 | `1 Hooks/IMG_4978 2.mov` | «Tu inversión no debería convertirse en otro trabajo.» | 0,90-4,26 s |
| Mitad | MD06 | `2 Mitad/IMG_4980 2.mov` | «Una suite hotelera con operadores turísticos listos para ti.» | 0,53-4,10 s |
| CTA | CT09 | `5 Cta/IMG_4981 2.mov` | «Hablemos y conoce tus opciones de inversión.» | 0,58-2,96 s |

Recorridos (cada plano, en `artefactos/03-timeline.md`): RC09 2,80-5,10 s · RC03 2,20-5,30 s · RC08 2,10-5,03 s · RC05 5,00-7,00 s · RC10 0,00-2,17 s · RC13 2,00-4,43 s. Normalizados y sin usar: RC11, RC06, RC07.

## Cómo cambiar cada pieza

- **El hook (otro HK):** copiar el clip a `original/` con su código, añadirlo a `MATERIAL` de `normalizar.mjs` (sha) y a `VENTANA_VOZ` / `GANANCIA_VOZ_DB` (`limites-voz.py --margen 40` Y el perfil de energía de la cola con `perfil.py`: `limites-voz` cortó 0,3 s antes la mitad de la 070 y 0,08 s el hook de esta; `probar-voz.py --umbral 0.0316 --razon 3.5`), cambiar `src`, `audio`, `voz` y `desde` de `c02-hook`, rehacer `voz/<toma>.txt` y `trozos-editoriales.mjs` (`--en`/`--desde`/`--s0`) y llevar cada línea a su sílaba (`onsets-voz.py`, `palabras-desde.py`). **Cuidado con el final del clip:** HK08 acaba 6 f tras su última palabra y eso fija la duración del plano (121 f) y el golpe del paseo; otro hook con más cola admite otras rejillas.
- **La mitad o el CTA:** igual. Con menos de 12 f de aire antes de la primera palabra, o con el clip entero ocupado (MD06: 135 f de 135), la toma entra **a corte** en el golpe. MD06 deja 12 f de cola: el bloque 5 entra a corte porque una disolvencia habría invadido su última palabra.
- **El exterior:** `c01-edificio` (`src`, `desde`); dura hasta el f86 (el golpe del hook); DR03, DR05… son otros exteriores.
- **La canción:** decide los frames de todos los planos (`GOLPE` y `INICIO_MUSICA` de `metraje-071.ts`) y el nivel de cada tramo (`LUFS_*` de `audio-071.ts`): se vuelve a medir (`medir-pista.py --json`, `lufs-rangos.py`, `buscar-cortes-lp.py` con R y TIPOS a medida: hook 117-122 f, mitad 128-135 f) y los frames salen solos de `golpe(...)`. Con *Heaven on Earth* solo la entrada de 178,043 s dio rejilla; su alternativa asignada era *desolate (Slowed)* (sha `74195082`), sin probar.
- **Los recorridos:** `src` y `desde` de c03-c05 y c07-c09; la duración de cada uno la fija la rejilla (RC10 solo dura 2,3 s: su plano no puede pasar de 69 f). El hilo es «lo que ya está puesto» → «cómo se vive» → la ciudad; la puerta lo comprueba en 2f.
- **El color:** `color({...})` por plano; la base está en `COLOR_BASE`. Luma medida en los stills (`pruebas-720p/stills1/`); se bajó la exposición de RC09 (−0,06), RC05 (−0,10) y RC10 (−0,08).
- **La versión con ficha:** se renderiza con `--props={"sinSubtitulos":true}` y lleva tipo, lugar y precio durante todo el vídeo (`ficha-luxur`); **falta el precio** (el anuncio no lo trae).

## Metraje que comparte con las otras versiones de la suite

Con la 070: **ninguno** (la 070 usa RC12 · RC02 · RC01 · RC06 · RC04 · RC07 · DR02). Con 072-075: lo declara cada una al montarse (la puerta informa).

## Excepciones declaradas de la puerta

1. **2a — hook y mitad en el mismo sitio:** ambas «de pie frente al ventanal» (el reparto aprobado las junta); cambia el encuadre. El CTA, sentada en el escritorio.
2. **4b — el hook deja 6 f (no 8) para que suba la música:** el clip de HK08 acaba 6,2 f tras su última palabra y el plano no puede durar más; la música sube con curva en los 4 f que caben antes del golpe del paseo.
3. **El golpe de entrada de la canción mide 10,2 dB** (el mínimo de la puerta, 12 en la 070, baja a 10): es el único de *Heaven on Earth* que da rejilla con estas voces.

## Por confirmar al oído (R31)

1. **«Una suite hotelera»** (MD06, ≈ 15,8-17,2 s del vídeo): whisper oyó «Un asfito atelera» (confianza baja); de «con operadores…» en adelante lo entiende con confianza alta.
2. **«todo» en el hook** (HK08, ≈ 5,5 s): el corte final de whisper oye «en todo otro trabajo» y los parciales «en otro trabajo»; se pintó «en otro trabajo».
