# 02 · Layout y capas — proyecto 046

> Paso 2 de 3. Capas, z-order y zonas de pantalla. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

Composición `Recorrido046` (`remotion/src/proyectos/046/`), 1080×1920 a 30 fps, 1291 f (43,03 s). Es el montaje del 043 (V26) con los planos, el audio y el texto de esta pieza: lo propio está en `metraje-046.ts`, `audio-046.ts` y `subtitulos-046.ts`. Lleva además el prop `sinSubtitulos` (la base de la versión «con ficha», `ficha-luxur`), que apaga los subtítulos y su velo y no toca nada más.

## Capas (de atrás a delante)

| # | Capa | Qué es | Notas |
|---|---|---|---|
| 1 | `PistaMetraje` | los 12 cortes (11 de vídeo mudos y la tarjeta `foto`) | look neutro con viñeta suave; **el color va por plano** (`colorCorrection()`, R32) → render con `--gl=angle`; sin sello ni velos superiores; 2 cortes secos (c09, c10) y 7 disolvencias (c03, c04, c05, c06, c07, c08, c11); todo a ×1 |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de la toma del CTA (f1230) | nada se congela |
| 3 | `VeloSubtitulos` | degradado desde abajo, solo mientras hay subtítulos | Luxur va sin sombra: el velo es lo único que sostiene el blanco; con `sinSubtitulos` no se pinta |
| 4 | `SubtitulosEditoriales` | todo lo que dice Isabella, en un grupo al 90 % y con la cursiva 8 px menor (99 → 91 px) | 7 bloques, 6 acentos; con `sinSubtitulos` no se pinta |
| 5 | `LogoCierre` y `WebCierre` | logo (440 px, 60 %) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) sobre la tarjeta | centrados, y≈795-1085 |
| 6 | `PistaAudio` | voz de las 4 tomas (WAV tratado, −15 LUFS) + música («Children», −15 LUFS sola por tramos, −26 bajo la voz) | en la RAÍZ |

## Zonas (px de 1080×1920)

- **Subtítulos:** abajo (borde superior ≈ 74,5 %, nunca por debajo del 88 %). Arriba **no hay nada** en ningún frame. Aquí hay texto desde el f17 (el hook abre la pieza); en la versión con ficha, el bloque de la ficha vive en el tercio bajo del cuadrado 1:1 (y ≈ 1220-1420) y los subtítulos no existen.
- **Isabella:** plano medio-americano en las cuatro tomas (camina hacia cámara en el hook y en MD03); el texto cae por debajo de su cintura, nunca sobre la cara.
- **Recorridos:** cuadro ENTERO de un 9:16 anamórfico (1920×1080 con SAR 81:256 escalado a 1296×2304, sin recorte): el texto de abajo cae sobre el suelo o la mesa en los planos de la unidad (aquí no lleva texto); la ficha de la versión de anuncios, sobre el tercio bajo.
- **Cierre:** tarjeta negra lisa; logo y web centrados, un poco por encima del centro.

## Reglas fijas del canal (comprobadas por `revisar-046.mjs`)

1. **La primera toma lleva voz y texto (EXCEPCIÓN DECLARADA, por encargo; sección 2b de la puerta).** Isabella es el frame 0; su primera palabra, f17; su primer subtítulo, f17. El golpe de la canción suena en el f3 y la música baja antes de que hable (f4-f14).
2. **Nunca el sello «PROPIEDADES LUXUR»**.
3. **El cierre es la tarjeta oscura con el logo y la web** (no `@propiedadesluxur`).
4. **Nada se congela** (la imagen de Isabella funde a negro en el último fotograma de su toma; el CTA usa el clip hasta su último fotograma).
5. **Ninguna cifra** en toda la pieza (ni el canon ni metros), ni en pantalla ni en voz; nada que la ficha no diga.
6. **Transiciones: solo corte y disolvencia.** Los 2 cortes secos caen en golpes medidos (8,3 y 9,2 dB); las disolvencias van libres (piano).

## Lo que decide esta pieza distinto del 043

- **Abre con el hook** (el 043 abría con un dron); el resto de la estructura es la del canal.
- **La mitad son dos tomas** (MD02, MD03), con una disolvencia que cae en el hueco de voz; la música se queda abajo entre ellas.
- **Recorrido anamórfico a cuadro completo** (el 043 usaba drones verticales 4K): algo más blando que Isabella; los planos se eligieron con el mismo sentido de giro (a la derecha) dentro de cada bloque.
- **Una canción de piano sin pulso con una caída natural** que cae donde entra el CTA: la envolvente del CTA solo la ayuda; la música se apaga a los f1190, antes de que entre el pasaje siguiente de la canción (el 216 s, un golpe de 16,6 dB).
- **Dos formatos desde el mismo plan:** orgánico (con subtítulos) y con ficha (`sinSubtitulos` + `ficha.mjs`).
