# 077 · Suite Go Living (El Poblado) — «Antes de invertir en Airbnb» · registro de versiones y «cómo cambiar cada pieza»

> Primer reel del segundo lote de la suite hotelera en venta (V58 del registro de uso, `archivos/musica/registro-de-uso.md`; el lote lo forman 076-078 y pidió incluir las ZONAS SOCIALES). Reparto del primer lote: `proyectos/070/reparto-070-075.md`. Catálogo de las 61 tomas: `proyectos/070/catalogo/catalogo-material.md`. Plan, layout y timeline: `artefactos/`.

## Versiones

| Rev. | Fecha | Estado | Qué es |
|---|---|---|---|
| 0 | 2026-11-08 | **prueba** (`pruebas-720p/077-recorrido.mp4`, 540×960) | HK03 · HK05 (como mitad) · CT04 · DR04 · *Light Fills the Room* (entrada 178,118 s) · 936 f · 31,2 s |

## La terna y el exterior (exclusivos de esta pieza dentro de la suite)

| Parte | Código | Archivo del disco | Dice / qué es | Voz |
|---|---|---|---|---|
| Exterior | DR04 | `3 Dron/IMG_5019 2.MOV` | las hojas blancas de un árbol delante de los voladizos, con el sol de frente (iPhone desde el suelo) | — |
| Hook | HK03 | `1 Hooks/IMG_4949 2.mov` | «Antes de invertir en Airbnb, hay algo que debes saber.» | 0,75-3,88 s |
| Mitad | **HK05** | `1 Hooks/IMG_4956 2.mov` | «Descubre una suite en un edificio con operación hotelera establecida.» (un hook usado como mitad) | 0,39-4,10 s |
| CTA | CT04 | `5 Cta/IMG_4952 2.mov` | «Si quieres más información, contáctame.» | 0,31-2,14 s |

Recorridos (cada plano, en `artefactos/03-timeline.md`): RC11 0,45-2,52 s · RC08 0-2,03 s · **ZS01 3,43-6,16 s** · **ZS02 5,40-7,80 s** · **ZS05 4,10-6,17 s** · DR05 3,30-6,83 s. Repuesto sin usar y ya normalizado: DR01, DR03, DR06-DR10, RC01, RC03, RC05, RC09, RC12, RC13, ZS03, ZS04.

## Las zonas sociales de esta pieza (carpeta `6 Zonas Sociales`)

- **ZS01** (gimnasio, las máquinas) 3,43-6,16 s y **ZS02** (las pesas) 5,40-7,80 s: la 074 usó ZS01 0,30-3,43 y ZS02 2,00-5,40; aquí empiezan donde acaban esos.
- **ZS05** (el interior de la tienda del edificio) solo desde el 4,10 s: del 0 al 3 s se ve el **toldo con la marca WEGO** (marca de terceros). **ZS04** no se usa (el toldo está en cuadro casi todo el clip). La puerta (2f) falla si la tienda se usa antes del 4,0 s o si aparece ZS04.

## Cómo cambiar cada pieza

- **El hook (otro HK):** copiar el clip a `original/` con su código, añadirlo a `MATERIAL` de `normalizar.mjs` (sha) y a `VENTANA_VOZ` / `GANANCIA_VOZ_DB` (perfil de energía a 40 ms —`limites-voz.py` dio 0,77-3,86 s y no ve las colas débiles— y `probar-voz.py --umbral 0.0316 --razon 3.5`), cambiar `src`, `audio`, `voz` y `desde` de `c02-hook`, rehacer `voz/<toma>.txt` y llevar cada línea a su sílaba (`onsets-voz.py`, `palabras-desde.py`). La duración del plano (hasta el golpe del f214) tiene que dejar ≥ 8 f tras la última palabra y no pasar del clip: si el hook es más largo, se cambia de rejilla (`buscar-cortes-lp.py`).
- **La mitad o el CTA:** igual. Con menos de 12 f de aire antes de la primera palabra, o con el clip entero ocupado (HK05: 134 f de 137; CT04: 83 de 83), la toma entra **a corte** en el golpe.
- **El exterior:** `c01-edificio` (`src`, `desde`); dura hasta el f90 (el golpe del hook); DR04 tiene 5,27 s, así que `desde` ≤ 2,27.
- **La canción:** es la que decide los frames de todos los planos (`GOLPE` e `INICIO_MUSICA` de `metraje-077.ts`) y el nivel de cada tramo (`LUFS_*` de `audio-077.ts`): se vuelve a medir (`medir-pista.py --json`, `lufs-rangos.py`, `buscar-cortes-lp.py` con `TIPOS=dccccccccc`) y los frames salen solos de `golpe(...)`. *Light Fills the Room* no cae sola: se apaga con curva bajo la tarjeta, así que su CTA tiene que entrar a ≥ 5 s del final de la pista (214,0 s).
- **Los recorridos:** `src` y `desde` de c03-c05 y c07-c09; la duración de cada uno la fija la rejilla, no el clip. El paseo va de la suite (RC11 → RC08) al gimnasio (ZS01) y, tras la mitad, de las pesas (ZS02) y la tienda (ZS05) a la fachada (DR05); la puerta lo comprueba en 2f.
- **El color:** `color({...})` por plano; la base está en `COLOR_BASE`. Luma medida en los stills (`pruebas-720p/stills1/`): 84-126 antes del ajuste del gimnasio (+0,10) y las pesas (+0,06).
- **La versión con ficha:** se renderiza con `--props={"sinSubtitulos":true}` y lleva tipo, lugar y precio durante todo el vídeo (`ficha-luxur`); **falta el precio** (el anuncio no lo trae).

## Metraje que comparte con las otras versiones de la suite

**Ni un segundo** con 070-075 (la puerta, 7b, lo comprueba: RC11 0,45-2,52 frente al 3,0-6,8 de la 073; RC08 0-2,03 frente al 2,1-5,03 de la 071 y el 2,2-4,83 de la 075; DR05 3,30-6,83 frente al 0,6-3,27 de la 072; ZS01 3,43+ y ZS02 5,40+ frente a la 074). Con las otras dos piezas del lote (076, 078) se compara al juntarlas.

## Por confirmar al oído (R31)

1. **«Descubre una suite»** (HK05, ≈ 14,3-15,2 s del vídeo): whisper oye «Descubro en EZID» (confianzas 0,31-0,58); «una suite» va tan rápido que suena «nezit». Con cortes aislados el resto de la frase («en un edificio con operación hotelera establecida») sale entera.
2. **«hotelera»** (HK05, ≈ 16,7 s): whisper la oye con confianza 0,51.
3. **«contáctame»** (CT04, ≈ 27,9 s): whisper oye «contacta a mí» (0,42-0,50); la V8 de One Living también la tuvo en duda.
