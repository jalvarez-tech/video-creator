# 076 · Suite Go Living (El Poblado) — «Una buena inversión empieza por la tranquilidad» · registro de versiones y «cómo cambiar cada pieza»

> Séptimo reel de la suite hotelera en venta (V57 del registro de uso, `archivos/musica/registro-de-uso.md`) y primero del lote 076-078 (los que llevan ZONAS SOCIALES del edificio). Reparto de los seis primeros: `proyectos/070/reparto-070-075.md`. Catálogo de las 61 tomas: `proyectos/070/catalogo/catalogo-material.md`. Plan, layout y timeline: `artefactos/`. Andamio clonado de la 070.

## Versiones

| Rev. | Fecha | Estado | Qué es |
|---|---|---|---|
| 0 | 2026-11-08 | **prueba** (`pruebas-720p/076-recorrido.mp4`, 540×960) | HK02 · MD04 · CT06 · DR10 (4,07-6,97 s) · *Luxury, Elegance, Refined* (entrada 147,778 s) · 958 f · 31,9 s |

## La terna y el exterior (exclusivos de esta pieza dentro de la suite)

| Parte | Código | Archivo del disco | Dice / qué es | Voz |
|---|---|---|---|---|
| Exterior | DR10 | `3 Dron/IMG_5058 2.MOV` (4,07-6,97 s) | la torre beige con su voladizo y la entrada de vidrio con el jardín vertical, desde la acera entre plantas (iPhone desde el suelo, NO dron). Cambiado de DR04 (rev. 0): la 077 abre también con DR04 (2,20-5,20 s) | — |
| Hook | HK02 | `1 Hooks/IMG_4944 2.MOV` | «Una buena inversión empieza por la tranquilidad.» | 1,62-3,97 s (se recorta la interjección de 1,22-1,53 s) |
| Mitad | MD04 | `2 Mitad/IMG_4967 2.mov` | «Invierte en una suite con vocación turística y ubicación estratégica.» | 0,58-4,28 s |
| CTA | CT06 | `5 Cta/IMG_4962 2.mov` | «Agenda una visita y descubre su potencial de inversión.» | 0,45-3,22 s |

Recorridos (cada plano, en `artefactos/03-timeline.md`): **zonas sociales** ZS01 3,50-5,70 s · ZS05 4,30-6,40 s · ZS02 5,50-7,97 s; **suite** RC11 0,20-2,77 s · RC08 4,30-6,50 s · RC07 2,70-6,23 s. Repuesto normalizado y sin usar: DR01, DR03, DR05, DR07, ZS03, ZS04, RC01-RC06, RC09, RC10, RC12.

## Cómo cambiar cada pieza

- **El hook / la mitad / el CTA (otra toma):** copiar el clip a `original/`, añadirlo a `MATERIAL` de `normalizar.mjs` (sha), medir la voz POR ENERGÍA (`limites-voz.py --margen 40` y el perfil de la banda de voz a 10-20 ms: no fiarse de whisper para el principio; en HK02 puso un «Hoy,» y la «una» 0,8 s antes de su sitio) y poner `VENTANA_VOZ` y `GANANCIA_VOZ_DB` (`probar-voz.py --umbral 0.0316 --razon 3.5`, con las ventanas de `TOMAS`), cambiar `src`, `audio`, `voz` y `desde` del plano, rehacer `voz/<toma>.txt` y llevar cada línea a su sílaba (`onsets-voz.py`, `palabras-desde.py`).
- **La interjección de HK02:** está en el crudo (`hk02.wav`, 1,22-1,53 s) y NO en la voz tratada (`VENTANA_VOZ.hk02 = [1.62, 3.97]`). Si Isabella dijo «Hoy,» y se quiere conservar, `VENTANA_VOZ.hk02 = [1.22, 3.97]`, `s0` = 1,22 en `metraje-076.ts` (el hook entraría 12 f después por la primera palabra, hay que recalcular `desde`: el clip empieza a hablar a los 1,22 s = f36,6, así que con `desde` ≥ 12 f solo caben 24 f de aire) y rehacer los subtítulos.
- **El exterior:** `c01-edificio` (`src`, `desde`); dura hasta el f87 (el golpe del hook). DR10 4,07-6,97 s es el tramo que no usa ninguna otra pieza de la suite (la 075 abre con DR10 0,30-3,73 s: la calle con los coches y el paso de cebra); la inclinación se va frenando (movimiento ≈ 8 → ≈ 3 en el clip; ≈ 8 → ≈ 4 en los 75 f opacos). Tramos libres medidos el 2026-11-08 con `herramientas/ventanas-dr.mjs`: DR06 3,4-8,7 s (con el logotipo «GO» a la vista y frenándose de 10,9 a 2,4), DR08 3,37-6,4 s (continúa la apertura de la 071: casi el mismo cuadro). DR01, DR03, DR04, DR05, DR06, DR07, DR08 y DR10 están normalizados.
- **La canción:** es la que decide los frames de todos los planos (`GOLPE` e `INICIO_MUSICA` de `metraje-076.ts`) y el nivel de cada tramo (`LUFS_*` de `audio-076.ts`): se vuelve a medir (`medir-pista.py --json`, `lufs-rangos.py`, `buscar-cortes-lp.py` con `TIPOS=ddcccccccc` y `T_F=176`) y los frames salen solos de `golpe(...)`. Es PLANA: no hay caída que caiga bajo el CTA y la envolvente la apaga bajo la tarjeta.
- **Los recorridos:** `src` y `desde` de c03-c05 y c07-c09; la duración de cada uno la fija la rejilla, no el clip. La vista (c09) tiene que ser el plano más largo del bloque 5. La tienda (ZS05) solo desde los 4,2 s (antes se ve el toldo de una marca de terceros y, hasta ≈ 4,2 s, el cartel con su logotipo): la puerta lo exige.
- **El color:** `color({...})` por plano; la base está en `COLOR_BASE`. Luma medida en los stills (`pruebas-720p/stills1/`): 96-122 con la base y los tres ajustes de exposición de la cama (−0,08), la repisa (−0,05) y la vista (−0,05).
- **Renders mientras se montan otras piezas:** `ENTRADA=src/proyectos/076/entrada-solo.tsx` (stills, `herramientas/en-turno.sh`) y `bash proyectos/076/herramientas/render-prueba-solo.sh` (prueba): el bundle solo lleva la 076 y no cae si una pieza hermana está a medias. La composición ya está registrada en `composiciones.tsx` (la descubre `estudio.tsx`), así que la FINAL se exporta con `bash proyectos/070/herramientas/render-final.sh 076`; `composiciones-076.tsx` ya no existe (mientras se montaba la pieza se llamó así para sacarla del estudio).
- **La versión con ficha:** `--props={"sinSubtitulos":true}`; **falta el precio** (el anuncio no lo trae).

## Metraje que comparte con las otras versiones de la suite

- Con la 070, la 072, la 073 y la 075: **RC07 (la vista)**, 3,4-3,5 s del tramo 2,7-6,2 s (el único clip de la suite con una ciudad de ≥ 3,5 s; la puerta, 7b).
- Con la 071 y la 075: **RC08**, 0,7 y 0,5 s (la 076 usa 4,30-6,50 s; la 071, 2,1-5,0 s; la 075, 2,2-4,8 s).
- Con cualquier apertura: **ni un segundo** (DR10 4,07-6,97 s; la 075 abre con DR10 0,30-3,73 s y la 077 con DR04 2,20-5,20 s).
- Con la 074: **ni un segundo**, aunque comparten clips de zonas sociales: la 074 usó ZS01 0,30-3,43, ZS02 2,00-5,40 y ZS03 0,30-3,20; la 076, ZS01 3,50-5,70 y ZS02 5,50-7,97, además de ZS05 (la tienda), que ninguna otra pieza ha usado.
- Con la 077 y la 078 (el resto del lote), medido con la puerta (7b) el 2026-11-08: **ZS01** (3,5-5,7 s) con el c05-gimnasio de la 077 (3,4-6,2 s): 2,2 s · **ZS05** (4,3-6,4 s) con su c08-tienda (4,1-6,2 s): 1,9 s · **ZS02** (5,5-8,0 s) con su c07-pesas (5,4-7,8 s): 2,3 s · **RC11** (0,2-2,8 s) con su c03-cama (0,5-2,5 s): 2,1 s; y **RC07** (2,7-6,2 s) con el c09-vista de la 078 (2,9-6,2 s): 3,4 s. Las zonas sociales y la cama de la 076 y la 077 son prácticamente los mismos planos: hay que cambiar los de una de las dos.

## Por confirmar al oído (R31)

1. **La interjección recortada de HK02** (1,22-1,53 s de la toma; ¿«Hoy,»?): no suena en la pieza.
2. **«ubicación» y «estratégica»** (MD04, ≈ 16,2-16,8 s): whisper «ubicaciones estratégicas» / «educación estratégica».
3. **«Agenda» y «una»** (CT06, ≈ 26,5-26,8 s): la «A» inicial es muy suave (−57 → −40 dB en 20 ms); whisper «Ag» (0,36) y «una» (0,56).

## Otras decisiones declaradas

- **Música sola por tramos a −15,2 / −15,9 / −16,1 LUFS** (no −15 en los tres): la canción llega a −0,1 dBFS de pico real en el paseo y la puerta exige ≤ −1 dBFS con la ganancia del tramo; la primera prueba (−15,0 / −15,7 / −15,9) medía −1,1 dBFS en el render y se bajó 0,2 dB más.
- **El plano de ZS02 (c05) usa 5,50-7,97 s de un clip de 8,1 s**; ZS01 3,50-5,70 de 6,4 s; ZS05 4,30-6,40 de 7,7 s.
