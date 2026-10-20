# 02 · Layout y capas — proyecto 045

> Paso 2 de 3. Capas, z-order y zonas de pantalla. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

Composición `Recorrido045` (`remotion/src/proyectos/045/`), 1080×1920 a 30 fps, 1318 f (43,93 s). Es el montaje del 043 (V26) con los planos, el audio y el texto de esta pieza, y con un añadido: la prop `sinSubtitulos` (la base de la versión con ficha de `ficha-luxur`, que apaga los subtítulos y su velo y no toca nada más). Lo propio está en `metraje-045.ts`, `audio-045.ts` y `subtitulos-045.ts`.

## Capas (de atrás a delante)

| # | Capa | Qué es | Notas |
|---|---|---|---|
| 1 | `PistaMetraje` | los 11 cortes (10 de vídeo mudos y la tarjeta `foto`) | look neutro con viñeta suave; **el color va por plano** (`colorCorrection()`, R32) → render con `--gl=angle`; sin sello ni velos superiores; todo a ×1; 2 entradas con disolvencia (el hook y la Social Kitchen) y 8 cortes secos |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de la toma del CTA (f1257) | nada se congela |
| 3 | `VeloSubtitulos` | degradado desde abajo, solo mientras hay subtítulos | Luxur va sin sombra: el velo es lo único que sostiene el blanco. Con `sinSubtitulos` no se monta |
| 4 | `SubtitulosEditoriales` | todo lo que dice Isabella, en un grupo al 90 % y con la cursiva 8 px menor (99 → 91 px) | 7 bloques, 5 acentos. Con `sinSubtitulos` no se monta |
| 5 | `LogoCierre` y `WebCierre` | logo (440 px, 60 %) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) sobre la tarjeta | centrados, y≈795-1085 |
| 6 | `PistaAudio` | voz de las 3 tomas (WAV tratado, −15 LUFS) + música («Fortitude (Light Version)», ≈ −15 LUFS sola por tramos, −26 bajo la voz) | en la RAÍZ |

## Zonas (px de 1080×1920)

- **Subtítulos:** abajo (borde superior ≈ 74,5 %, nunca por debajo del 88 %). Arriba **no hay nada** en ningún frame.
- **Isabella:** de cuerpo entero (HK01, MD01: camina hacia cámara desde lejos) o de cintura para arriba apoyada en la baranda (CT01); el texto cae por debajo de su cintura, a la altura de las piernas o del jacuzzi, nunca sobre la cara. En CT01 la franja de los subtítulos (y ≈ 1430-1640) cae sobre la baranda y el jacuzzi comunal: el velo la sostiene.
- **Recorridos:** horizontales 1920×1080 recortados a una ventana vertical de 608×1080 (x = 656; RC21, x = 950) y escalados ×2,13 a 1296×2304. El texto no aparece sobre los planos del paseo ni del bloque 5 (no hay voz en off): solo sobre Isabella.
- **Versión con ficha (funnel):** sin subtítulos, con `APARTAMENTO EN RENTA · El Poblado · Tierra Grata · $ 14,8 M COP / MES` fijo en el tercio bajo del cuadrado 1:1 (y ≈ 1220-1420) desde el f0 hasta la tarjeta; se hace aparte (`ficha-luxur` §3).
- **Cierre:** tarjeta negra lisa; logo y web centrados, un poco por encima del centro.

## Reglas fijas del canal (comprobadas por `revisar-045.mjs`)

1. **La primera toma sale sin texto ni voz** (RC01): Isabella entra con una disolvencia que acaba en el golpe del f111 y su primera palabra suena a los 10 f (f121); el primer subtítulo entra con ella (f120).
2. **Nunca el sello «PROPIEDADES LUXUR»**.
3. **El cierre es la tarjeta oscura con el logo y la web** (no `@propiedadesluxur`).
4. **Nada se congela** (la imagen de Isabella funde a negro en el último fotograma de su toma; el CTA usa el clip hasta su último fotograma y RC21 llega al suyo).
5. **Ninguna cifra** en toda la pieza (ni precio ni metros), ni en pantalla ni en voz.
6. **Transiciones: corte y disolvencia**, nada más. Los cortes secos caen en golpes MEDIDOS de ≥ 8,3 dB; las dos disolvencias acaban en golpes de 8,0 y 6,1 dB.

## Lo que decide esta pieza distinto del 043

- **Abre con el apartamento (RC01), no con un dron:** no hay dron en este rodaje. El recorrido es horizontal: se recorta y sale más blando; no se filtra.
- **Canción suave:** las ganancias de la música SUBEN (+2,8 a +5,5 dB) para llegar a ≈ −15 LUFS, con un techo de pico de −0,5 dBFS (en el 043 la canción ya estaba a −15).
- **Dos entradas con disolvencia** (el hook, donde HK01 trae 0,82 s de aire; y la Social Kitchen), porque la canción no tiene golpes fuertes en todos los cortes.
- **Texto que marca lo que el tiempo gana:** los cinco acentos caen en «más valioso», «aseo semanal», «todo ordenado», «eres mejor» y «contáctanos».
- **Clímax con el jacuzzi privado** (RC21 con la ventana a x = 950), que es el argumento de la ficha.
