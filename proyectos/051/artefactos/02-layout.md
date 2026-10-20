# 02 · Layout y capas — proyecto 051 (réplica de `videos editados/01.mp4`)

> Paso 2 de 3. Capas, z-order y zonas de pantalla. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

Composición `Recorrido051` (`remotion/src/proyectos/051/`), 1080×1920 a 30 fps, 1978 f (65,93 s). Es el montaje de las piezas 045-050 (la composición del 050, con el cierre y la opacidad de los subtítulos del canal) con los planos, el audio y el texto de esta pieza: lo propio está en `metraje-051.ts`, `audio-051.ts` y `subtitulos-051.ts`. Admite la propiedad `sinSubtitulos` (la base de la versión con ficha, `ficha-luxur`): apaga los subtítulos y su velo y no toca nada más.

## Capas (de atrás a delante)

| # | Capa | Qué es | Notas |
|---|---|---|---|
| 1 | `PistaMetraje` | los 14 cortes (13 de vídeo mudos y la tarjeta `foto`) | look neutro con viñeta suave; **el color va por plano** (`colorCorrection()`, R32) → render con `--gl=angle`; sin sello ni velos superiores; **todas las entradas son disolvencias de 12 f, salvo el frame 0 y el paso del hook a la cocina (a corte, como el original)**; `velocidad` ×1,5 en RC01 y RC16 |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de su plano (f1917) | nada se congela |
| 3 | `VeloSubtitulos` | degradado desde abajo, solo mientras hay subtítulos | Luxur va sin sombra: el velo es lo único que sostiene el blanco |
| 4 | `SubtitulosEditoriales` | TODO lo que suena (el hook y la locución), en un grupo al 90 % y con la cursiva 8 px menor (99 → 91 px) | 25 bloques, 12 acentos, sin cifras |
| 5 | `LogoCierre` y `WebCierre` | logo (440 px, 60 %) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) sobre la tarjeta | centrados, y≈795-1085 |
| 6 | `PistaAudio` | la voz del hook (dos planos de HK05, WAV tratado, −15 LUFS) + la locución en off (`off-voz.wav`, −15 LUFS) + la música (*Einaudi Fly*, −15 LUFS sola, −31 bajo la voz) | en la RAÍZ |

## Zonas (px de 1080×1920)

- **Subtítulos:** abajo (borde superior ≈ 74,5 %, nunca por debajo del 88 %). Arriba **no hay nada** en ningún frame. Con la locución casi continua, hay texto en pantalla casi todo el vídeo (los únicos huecos son los de la locución: 34,6-39,6 · 50,4-52,4 · 57,5-59,5 s).
- **Isabella:** en el hook, de cuerpo entero y pequeña (al fondo del balcón) y luego cada vez más cerca; en el CTA, de cuerpo entero acercándose. El texto cae a la altura de las piernas o la cintura, nunca sobre la cara (en el último plano, sobre el torso).
- **Recorridos:** TODOS son ANAMÓRFICOS (1920×1080 con SAR 81:256 / DAR 9:16 = verticales de 608×1080 comprimidos a lo ancho) y se escalan ENTEROS a 1296×2304 con `setsar=1`, SIN recorte. Sin texto en el recorrido más que los subtítulos de la locución (nunca un dato grande).
- **Cierre:** tarjeta negra lisa; logo y web centrados, un poco por encima del centro.

## Reglas fijas del canal (comprobadas por `revisar-051.mjs`)

1. **La primera toma sale sin texto ni voz**: **EXCEPCIÓN DECLARADA** (`ABRE_CON_EL_HOOK`): la pieza es la réplica de un original que abre con Isabella hablando. El frame 0 es ella, a corte; su primera palabra suena en el f7 y su primer subtítulo entra en el f6.
2. **Nunca el sello «PROPIEDADES LUXUR»**.
3. **El cierre es la tarjeta oscura con el logo y la web** (no `@propiedadesluxur`).
4. **Nada se congela** (la imagen de Isabella funde a negro en el último fotograma de su plano; el CTA usa el clip hasta donde llega y no lo repite).
5. **Sin cifras en pantalla** (reparto §2): «113 metros» se pinta «ciento trece metros»; ningún dígito en ningún subtítulo. El precio no está en el vídeo orgánico.
6. **Transiciones: disolvencias** (salvo el frame 0 y el paso del hook a la cocina): *Einaudi Fly* no tiene golpes de ≥ 12 dB donde cortar en seco (R33).

## Lo que decide esta pieza distinto del formato y de las otras seis de arriendo

- **Es una réplica**: manda el orden y el texto del original, no el viaje emocional del formato. El recorrido va con **locución en off** de principio a fin (el formato la limita al bloque 5), el CTA es locución sobre la imagen muda de Isabella y no una toma a cámara, y hay **tres bloques** (2 · 3 · 6) en vez de seis.
- **Dura 65,9 s** (el original, 64,0): la puerta lo declara (`TOPE_SEGUNDOS = 70`).
- **El recorrido no acaba en una «vista»**: el original cierra la unidad con la Social Kitchen; aquí también. No hay clímax más largo que los demás.
- **La música es una curva, no una rejilla:** entra en el f0 bajo la voz, baja ANTES de cada frase y sube en sus huecos (el de los 34,6-39,6 s, con el momento más alto de la canción), y su caída natural (261 s) cae bajo la tarjeta.
- **Imagen algo blanda:** el recorrido son 608×1080 efectivos ×2,13: más blando que Isabella en 4K (se dice, no se filtra: R22), pero con la geometría y el campo correctos. Aquí además TODO el material es de ese tipo, también Isabella (HK05 y CT04): no hay ninguna toma en 4K.
