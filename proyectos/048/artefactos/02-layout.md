# 02 · Layout y capas — proyecto 048

> Paso 2 de 3. Capas, z-order y zonas de pantalla. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

Composición `Recorrido048` (`remotion/src/proyectos/048/`), 1080×1920 a 30 fps, 1387 f (46,23 s). Es el montaje del 043 con los planos, el audio y el texto de esta pieza y con **la excepción de abrir con el hook**: lo propio está en `metraje-048.ts`, `audio-048.ts` y `subtitulos-048.ts`. Acepta `sinSubtitulos` (la base de la versión con ficha).

## Capas (de atrás a delante)

| # | Capa | Qué es | Notas |
|---|---|---|---|
| 1 | `PistaMetraje` | los 10 cortes (9 de vídeo mudos y la tarjeta `foto`) | look neutro con viñeta suave; **el color va por plano** (`colorCorrection()`, R32) → render con `--gl=angle`; sin sello ni velos superiores; 5 cortes secos y 4 disolvencias de 12 f; todo a ×1 |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de la toma del CTA (f1326) | nada se congela |
| 3 | `VeloSubtitulos` | degradado desde abajo (borde 0,68 · medio 0,38), solo mientras hay subtítulos | Luxur va sin sombra: el velo es lo único que sostiene el blanco; **no se pinta con `sinSubtitulos`** |
| 4 | `SubtitulosEditoriales` | todo lo que dice Isabella, en un grupo al 90 % y con la cursiva 8 px menor (99 → 91 px) | 9 bloques, 6 acentos; **no se pinta con `sinSubtitulos`** |
| 5 | `LogoCierre` y `WebCierre` | logo (440 px, 60 %) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) sobre la tarjeta | centrados, y≈795-1085 |
| 6 | `PistaAudio` | voz de las 3 tomas (WAV tratado, −15 LUFS) + música («Einaudi Fly», −15 LUFS sola por tramos, −26 bajo la voz) | en la RAÍZ |

## Zonas (px de 1080×1920)

- **Subtítulos:** abajo (borde superior ≈ 74,5 %, nunca por debajo del 88 %). Arriba **no hay nada** en ningún frame.
- **Isabella:** de cuerpo entero en las tres tomas (camina hacia cámara, o queda en las escaleras); el texto cae a la altura de su falda o de sus piernas, nunca sobre la cara.
- **Recorrido:** 1920×1080 recortado a una ventana de 608×1080 y escalado ×2,13 (1296×2304): X=656 (el centro) salvo RC10, X=1100 (para que el jacuzzi quede dentro). Sin texto sobre el recorrido: el texto solo acompaña a la voz.
- **Cierre:** tarjeta negra lisa; logo y web centrados, un poco por encima del centro.

## Reglas fijas del canal (comprobadas por `revisar-048.mjs`)

1. **La primera toma sale sin texto ni voz — NO SE CUMPLE: EXCEPCIÓN DECLARADA** (por encargo del usuario, como el 021): el frame 0 es Isabella (HK01), su primer subtítulo entra en el f29 y su voz en el f30 (hay 1 s de aire); la música abre con una nota en el f3 que suena entera y baja con curva antes de su primera palabra. La miniatura (frame 0) es ella.
2. **Nunca el sello «PROPIEDADES LUXUR»**.
3. **El cierre es la tarjeta oscura con el logo y la web** (no `@propiedadesluxur`).
4. **Nada se congela** (la imagen de Isabella funde a negro en el último fotograma útil de su toma; el plano del CTA acaba 14 f tras su última palabra y la tarjeta sigue).
5. **Ninguna cifra** en toda la pieza (ni precio ni metros), ni en pantalla ni en voz. La ficha de la versión para anuncios pone el canon fuera del vídeo orgánico.
6. **Transiciones: solo corte y disolvencia.**

## Lo que decide esta pieza distinto del 043 y del 021

- **Abre con el hook**, como el 021, pero con 1 s de aire antes de su primera palabra (en el 021, 0,6 s): la nota de apertura de la música suena entera y baja con una curva de 18 f.
- **Cortes en notas, no en golpes:** *Einaudi Fly* es un piano de arpegios sin pulso; los cinco cortes secos caen en golpes MEDIDOS de 6,5 a 11,9 dB (el 043 pedía ≥ 12; con piano no se llega) y las disolvencias van libres.
- **El final de la canción es la resolución:** el piano decae bajo la voz del CTA (f1170-1255) y la tarjeta queda en silencio.
- **El recorrido es horizontal**: el material más blando de la pieza; sin velocidad, sin zoom (QUIETO) y sin filtros.
- **Ninguna palabra de acción**: CT03 no pide nada; la tarjeta (logo + web) es la acción.
