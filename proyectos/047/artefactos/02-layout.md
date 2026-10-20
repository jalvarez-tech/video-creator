# 02 · Layout y capas — proyecto 047 (rev. 1: sin recorridos)

> Paso 2 de 3. Capas, z-order y zonas de pantalla. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

Composición `Recorrido047` (`remotion/src/proyectos/047/`), 1080×1920 a 30 fps, **702 f (23,40 s)**. Es el montaje del 043 con los planos, el audio y el texto de esta pieza: lo propio está en `metraje-047.ts`, `audio-047.ts` y `subtitulos-047.ts`. Admite la propiedad `sinSubtitulos` (la base de la versión con ficha, `ficha-luxur`): apaga los subtítulos y su velo y no toca nada más.

## Capas (de atrás a delante)

| # | Capa | Qué es | Notas |
|---|---|---|---|
| 1 | `PistaMetraje` | los 5 cortes (4 de vídeo mudos —las cuatro tomas de Isabella, 4K vertical— y la tarjeta `foto`) | look neutro con viñeta suave; **el color va por plano** (`colorCorrection()`, R32) → render con `--gl=angle`; sin sello ni velos superiores; **el primero entra a corte en el f0 y los demás con una disolvencia de 12 f** (la canción no da golpes en que cortar); todo a ×1 con un empuje lento (1,0 → 1,04) |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de la toma del CTA (f641) | nada se congela |
| 3 | `VeloSubtitulos` | degradado desde abajo, solo mientras hay subtítulos | Luxur va sin sombra: el velo es lo único que sostiene el blanco |
| 4 | `SubtitulosEditoriales` | todo lo que dice Isabella, en un grupo al 90 % y con la cursiva 8 px menor (99 → 91 px) | 8 bloques, 6 acentos |
| 5 | `LogoCierre` y `WebCierre` | logo (440 px, 60 %) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) sobre la tarjeta | centrados, y≈795-1085 |
| 6 | `PistaAudio` | voz de las 4 tomas (WAV tratado, −15 LUFS) + música (*Dreamlife*, lecho a −26 LUFS y su caída bajo el CTA) | en la RAÍZ |

## Zonas (px de 1080×1920)

- **Subtítulos:** abajo (borde superior ≈ 74,5 %, nunca por debajo del 88 %). Arriba **no hay nada** en ningún frame.
- **Isabella:** HK02 sentada (plano medio-general), MD04 sentada con el cuerpo entero, MD05 y CT03 de pie con el cuerpo entero; el texto cae a la altura de las piernas o de las rodillas, nunca sobre la cara ni las manos.
- **Cierre:** tarjeta negra lisa; logo y web centrados, un poco por encima del centro.

## Reglas fijas del canal (comprobadas por `revisar-047.mjs`)

1. **La pieza ABRE con Isabella, a corte, en el f0** (excepción declarada, como el 021 y el 022, pedida por falta de material: sin recorrido no hay otra primera toma). Los 13 primeros fotogramas salen sin texto ni voz y el primer subtítulo entra con su primera sílaba (f13).
2. **Nunca el sello «PROPIEDADES LUXUR»**.
3. **El cierre es la tarjeta oscura con el logo y la web** (no `@propiedadesluxur`).
4. **Nada se congela** (la imagen de Isabella funde a negro en el último fotograma de su toma; el CTA usa el clip hasta su último fotograma).
5. **Una sola cifra** en toda la pieza: `$14.800.000`, en el subtítulo de MD04, como acento y con la voz de MD04 (el canon de la ficha). Ninguna más, ni en pantalla ni en voz.
6. **Transiciones: solo disolvencias** (salvo el frame 0): *Dreamlife* no tiene golpes de ≥ 12 dB donde cortar en seco. Las disolvencias no piden golpe (R33).

## Lo que decide esta pieza distinto del 043

- **Sin recorridos** (decisión del usuario, 2026-10-19: «no pongas recorridos horizontales»): los 22 recorridos del material son horizontales y, recortados, salían pixelados. No hay bloques 1, 3 ni 5; la pieza es 2-4-6.
- **La mitad son DOS tomas** (MD04 y MD05) unidas con una disolvencia; Isabella sale cuatro veces a cámara (hook, MD04, MD05, CTA) en cuatro fondos distintos.
- **La música es un lecho:** entra en el f0 con un fundido de 8 f, va a −26 LUFS debajo de las cuatro voces, cae en el f457 donde entra el CTA y se apaga bajo la tarjeta.
- **Duración corta (23,4 s):** por debajo de los 28-30 s de la versión corta del formato. Entre una frase y la siguiente quedan 0,7-0,8 s.
