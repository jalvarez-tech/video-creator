# 02 · Layout y capas — proyecto 062

> Paso 2 de 3. Capas, z-order y zonas de pantalla. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

Composición `Recorrido062` (`remotion/src/proyectos/062/`), 1080×1920 a 30 fps, 1139 f (38,0 s). Es el montaje de la 059 (la puerta, la estructura de la composición) con otra canción y otra rejilla (*In This Together*, cortes en golpes medidos de una intro con pulso): lo propio está en `metraje-062.ts`, `audio-062.ts` y `subtitulos-062.ts`. Acepta `sinSubtitulos` (la base de la versión con ficha, `ficha-luxur`).

## Capas (de atrás a delante)

| # | Capa | Qué es | Notas |
|---|---|---|---|
| 1 | `PistaMetraje` | los 10 cortes de vídeo mudos y la tarjeta (`foto`) | look neutro con viñeta suave; **el color va por plano** (`colorCorrection()`, R32) → render con `--gl=angle`; sin sello ni velos superiores; **5 cortes secos y 4 disolvencias**, cada cambio en un golpe medido de la canción (las disolvencias ACABAN en él) |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de la toma del CTA (f1078) | nada se congela |
| 3 | `VeloSubtitulos` | degradado desde abajo (borde 0,72 · medio 0,52), solo mientras hay subtítulos | Luxur va sin sombra: el velo es lo único que sostiene el blanco; se subió algo sobre la plantilla porque el estudio tiene una cama blanca bajo el texto |
| 4 | `SubtitulosEditoriales` | todo lo que dice Isabella, en un grupo al 90 % y con la cursiva 8 px menor (99 → 91 px) | 6 bloques, 3 acentos |
| 5 | `LogoCierre` y `WebCierre` | logo (440 px, 60 %) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) sobre la tarjeta | centrados, y≈795-1085 |
| 6 | `PistaAudio` | voz de las 3 tomas (WAV tratado, −15,0 LUFS) + música («In This Together», −17,2 · −16,4 · −15,0 LUFS sola por tramos, −26 bajo la voz) | en la RAÍZ |

## Zonas (px de 1080×1920)

- **Subtítulos:** abajo (borde superior ≈ 74,5 %, nunca por debajo del 88 %). Arriba **no hay nada** en ningún frame.
- **Isabella:** de cuerpo entero en el hook (sale del ascensor y camina hacia cámara: acaba a media distancia, de cintura para arriba), pequeña y lejos en la mitad (al fondo del estudio, con la cama en primer plano) y sentada de cuerpo entero en el CTA; el texto cae sobre su torso, la cama o el suelo, nunca sobre la cara.
- **Recorridos:** MOV verticales de 1080×1920, sin rotación ni recorte: solo se escalan a 1296×2304. **No hay aéreo**: la azotea hace de aéreo (tomas de «TERRAZA Y JACUZZI»).
- **Cierre:** tarjeta negra lisa; logo y web centrados, un poco por encima del centro.

## Reglas fijas del canal (comprobadas por `revisar-062.mjs`)

1. **La primera toma sale sin texto ni voz** (ZC29, la azotea): Isabella entra A CORTE en un golpe y es opaca desde el f95; su primera palabra suena en el f110,6 y el primer subtítulo entra en el f110. Esta pieza **no** rompe la regla.
2. **Nunca el sello «PROPIEDADES LUXUR»**.
3. **El cierre es la tarjeta oscura con el logo y la web** (no `@propiedadesluxur`).
4. **Nada se congela** (la imagen de Isabella funde a negro en el último fotograma de su toma, el f1078; el CTA usa el clip del f24 al f169 de 181).
5. **Cifra dicha = cifra escrita**: ella no dice ninguna cifra; ninguna en pantalla (ni precio ni áreas ni ficha). **Las afirmaciones de mercado solo en su voz**: los subtítulos son su transcripción, en base y sin acento, y la puerta comprueba que cada palabra escrita es una palabra que ella dice.
6. **Transiciones: corte y disolver.** Cada cambio de plano cae en un golpe MEDIDO: los cortes secos en golpes de 8,1-13,5 dB (los de 7-9 dB son los que tiene la canción después de su intro).
7. **Voz a −15 LUFS** (compresor 3,5:1 + limitador a −2,5 dBFS; pico real −2,5 a −3,1 dBFS) y **música sola entre −17,2 y −15,0 LUFS por tramos** (la intro no admite más sin pasar de 0 dBFS), −26 LUFS bajo la voz; la música baja con curva de coseno tras el golpe de cada entrada de Isabella y **acaba de bajar antes de su primera palabra**.

## Lo que decide esta pieza distinto de la 059

- **El hook entra a corte** (su primera sílaba cae a los 15,6 f del clip: no cabe una disolvencia con la música bajando a tiempo) **y dura TODO su clip** (145 f; rev. 2); la mitad y el CTA, **disolviendo** (la mitad deja 26 f de silencio; el CTA, 37 f).
- **Cuatro disolvencias, cinco cortes secos**: el jacuzzi (salida del hook), la mitad, la entrada al estudio y el CTA disuelven (las disolvencias «de Isabella a un recorrido» son las del formato desde el 017); los demás son cortes en golpe.
- **Texto que marca el ángulo:** el acento cae en «renta corta» (el tema), «Laureles» (el sitio) y «y agendemos» (la acción); las cifras de mercado van en base.
- **Canción con intro de pulso y meseta:** el golpe de entrada es de 21,1 dB y los cortes del paseo siguen el pulso de 1 s; después de los 24 s la canción tiene golpes flojos y no resuelve sola: se apaga con curva bajo la tarjeta.
- **Un solo clip de azotea para la apertura y otros dos para el paseo**, y el bloque 5 es solo del estudio.
