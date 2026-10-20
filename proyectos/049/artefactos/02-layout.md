# 02 · Layout y capas — proyecto 049

> Paso 2 de 3. Capas, z-order y zonas de pantalla. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

Composición `Recorrido049` (`remotion/src/proyectos/049/`), 1080×1920 a 30 fps, 1401 f (46,70 s). Es el montaje del 043 (V26) con los planos, el audio y el texto de esta pieza: lo propio está en `metraje-049.ts`, `audio-049.ts` y `subtitulos-049.ts`. Acepta `sinSubtitulos` (la base de la versión con ficha, skill `ficha-luxur`).

## Capas (de atrás a delante)

| # | Capa | Qué es | Notas |
|---|---|---|---|
| 1 | `PistaMetraje` | los 13 cortes (12 de vídeo mudos y la tarjeta `foto`) | look neutro con viñeta suave; **el color va por plano** (`colorCorrection()`, R32) → render con `--gl=angle`; sin sello ni velos superiores; los 12 cambios de plano son cortes secos; todo a ×1 |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de la toma (f1340) | nada se congela |
| 3 | `VeloSubtitulos` | degradado desde abajo, solo mientras hay subtítulos | Luxur va sin sombra: el velo es lo único que sostiene el blanco. No existe en la versión con ficha |
| 4 | `SubtitulosEditoriales` | todo lo que dice Isabella, en un grupo al 90 % y con la cursiva 8 px menor (99 → 91 px) | 8 bloques, 4 acentos. No existe en la versión con ficha |
| 5 | `LogoCierre` y `WebCierre` | logo (440 px, 60 %) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) sobre la tarjeta | centrados, y≈795-1085 |
| 6 | `PistaAudio` | voz de las 3 tomas (WAV tratado, −15 LUFS) + música («In This Together», −15 LUFS sola por tramos, −26 bajo la voz) | en la RAÍZ |

## Zonas (px de 1080×1920)

- **Subtítulos:** abajo (borde superior ≈ 74,5 %, nunca por debajo del 88 %). Arriba **no hay nada** en ningún frame.
- **Isabella:** de cuerpo entero en las tres tomas (camina hacia cámara en las escaleras y el gimnasio; apoyada en la baranda junto al jacuzzi); el texto cae por debajo de su cintura o a la altura de las piernas, nunca sobre la cara.
- **Recorridos:** 16:9 recortados a 608×1080 y escalados a 1296×2304 (×2,13): más blandos que Isabella en 4K. Sin zoom (un punch-in los ablandaría más). No llevan texto.
- **Versión con ficha (anuncios, 1:1):** el vídeo SIN subtítulos y, durante todo el vídeo, la ficha en el tercio bajo del cuadrado 1:1 (`APARTAMENTO EN RENTA · El Poblado · Tierra Grata · $ 14,8 M COP / MES`), hasta la tarjeta oscura.
- **Cierre:** tarjeta negra lisa; logo y web centrados, un poco por encima del centro.

## Reglas fijas del canal (comprobadas por `revisar-049.mjs`)

1. **La primera toma sale sin texto ni voz** (RC04): Isabella entra A CORTE en el golpe del f71 y su primera palabra suena a los 12,4 f; el primer subtítulo entra con ella (f82).
2. **Nunca el sello «PROPIEDADES LUXUR»**.
3. **El cierre es la tarjeta oscura con el logo y la web** (no `@propiedadesluxur`).
4. **Nada se congela** (la imagen de Isabella funde a negro en el último fotograma de su toma; el CTA usa el clip hasta su último fotograma).
5. **Ninguna cifra** en toda la pieza (ni precio ni metros), ni en pantalla ni en voz. (La versión con ficha lleva el precio en su ficha, que es otro formato.)
6. **Transiciones: solo corte** (ninguna disolvencia: todos los cambios caen en un golpe medido de ≥ 7,5 dB).

## Lo que decide esta pieza distinto del 043

- **Es de arriendo, sin dron:** abre con el apartamento (RC04) y el clímax es el deck de la terraza común (RC19), no una vista de dron.
- **Ritmo:** cuatro planos de 3,1-3,7 s por la unidad, tres de 2,8-3,5 s por el apartamento y la vista de 4,2 s (el más largo del bloque). Sin rampas de velocidad.
- **Texto que marca lo que se promete:** los cuatro acentos caen en «la tuya,», «indispensable.», «amenidades.» y «contáctanos.».
- **La música** baja −5 dB (la canción es MUY fuerte) y su caída natural cae bajo el CTA.
