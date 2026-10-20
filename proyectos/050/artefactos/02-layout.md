# 02 · Layout y capas — proyecto 050

> Paso 2 de 3. Capas, z-order y zonas de pantalla. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

Composición `Recorrido050` (`remotion/src/proyectos/050/`), 1080×1920 a 30 fps, 1062 f (35,4 s). Es el montaje del 043 (V26) con el hook al principio y los planos, el audio y el texto de esta pieza: lo propio está en `metraje-050.ts`, `audio-050.ts` y `subtitulos-050.ts`; la composición acepta `sinSubtitulos` (la base de la versión con ficha).

## Capas (de atrás a delante)

| # | Capa | Qué es | Notas |
|---|---|---|---|
| 1 | `PistaMetraje` | los 10 cortes (9 de vídeo mudos y la tarjeta `foto`) | look neutro con viñeta suave; **el color va por plano** (`colorCorrection()`, R32) → render con `--gl=angle`; sin sello ni velos superiores; los 9 cambios de plano son cortes secos; todo a ×1 |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de la toma del CTA (f1001) | nada se congela |
| 3 | `VeloSubtitulos` | degradado desde abajo, solo mientras hay subtítulos | Luxur va sin sombra: el velo es lo único que sostiene el blanco. Con `sinSubtitulos` no se pinta |
| 4 | `SubtitulosEditoriales` | todo lo que dice Isabella, en un grupo al 90 % y con la cursiva 8 px menor (99 → 91 px) | 5 bloques, 5 acentos (`más valioso` · `aseo semanal.` · `$14.800.000` · `experiencias` · `escríbeme.`). Con `sinSubtitulos` no se pinta |
| 5 | `LogoCierre` y `WebCierre` | logo (440 px, 60 %) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) sobre la tarjeta | centrados, y≈795-1085 |
| 6 | `PistaAudio` | voz de las 3 tomas (WAV tratado, −15 LUFS) + música («Spring is Coming», −15 LUFS sola, −31 bajo la voz) | en la RAÍZ |

## Zonas (px de 1080×1920)

- **Subtítulos:** abajo (borde superior ≈ 74,5 %, nunca por debajo del 88 %). Arriba **no hay nada** en ningún frame.
- **Isabella:** HK02 sentada en el sillón (plano medio-largo: de la cintura a la cabeza, las piernas ocupan el tercio bajo, donde cae el texto: nunca sobre la cara); MD04 sentada en una silla en la Social Kitchen (cuerpo entero, la cara a ≈ 40 % del alto); CT02 de pie en el jardín, de la cintura a la cabeza.
- **Recorridos:** horizontales 1920×1080 recortados al centro (608×1080 → 1296×2304); **no llevan texto** (los bloques 3 y 5 van solo con música). El tercio bajo de la versión del funnel (1:1: y 420-1500; ficha de y≈1220 a 1420) cae sobre suelo y baldosa en los recorridos.
- **Cierre:** tarjeta negra lisa; logo y web centrados, un poco por encima del centro.

## Reglas fijas del canal (comprobadas por `revisar-050.mjs`)

1. ~~**La primera toma sale sin texto ni voz**~~ — **EXCEPCIÓN DECLARADA por encargo del usuario (2026-10-19):** la pieza abre con el hook; el frame 0 es Isabella, su primera palabra suena en el f5, su primer subtítulo entra en el f4 y la música ya suena, baja. La puerta lo dice y lo comprueba (`ABRE_CON_EL_HOOK`).
2. **Nunca el sello «PROPIEDADES LUXUR»**.
3. **El cierre es la tarjeta oscura con el logo y la web** (no `@propiedadesluxur`).
4. **Nada se congela** (la imagen de Isabella funde a negro en el último fotograma de su toma; el CTA usa el clip hasta su último fotograma).
5. **Una sola cifra en toda la serie, `$14.800.000`, en la mitad** (bloque 4), y ninguna otra en pantalla ni en voz.
6. **Transiciones: solo corte** (ninguna disolvencia: los 8 cambios de plano caen en un golpe medido de ≥ 11,7 dB).

## Lo que decide esta pieza distinto del 043

- **Abre con el hook y no con un dron**, con la música ya bajo su voz y un «drop» de 16,5 dB que entra cuando acaba (el f204).
- **Recorrido horizontal recortado:** 608 px de ancho reales escalados ×2,13; planos de 2,5-3,4 s, sin rampas de velocidad, y el color del plano medido para que piscina, gimnasio, Social Kitchen, alcoba, baño y balcón se parezcan entre sí (luma σ 24 → 18).
- **Texto que marca lo práctico:** los cinco acentos caen en «más valioso» (el tiempo), «aseo semanal» (lo incluido), `$14.800.000` (el precio), «experiencias» (lo que incluye) y «escríbeme» (la acción).
- **Dos formatos:** la composición acepta `sinSubtitulos` y la versión del funnel es el mismo montaje sin texto y con la ficha (`ficha-luxur`).
