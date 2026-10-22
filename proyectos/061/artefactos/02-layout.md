# 02 · Layout y capas — proyecto 061

> Paso 2 de 3. Capas, z-order y zonas de pantalla. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

Composición `Recorrido061` (`remotion/src/proyectos/061/`), 1080×1920 a 30 fps, 1138 f (37,9 s). Es el montaje de la 059 (la puerta, la estructura de la composición) con otra canción y otra rejilla (*La Isla Bonita*, sin pulso: cortes en golpes medidos): lo propio está en `metraje-061.ts`, `audio-061.ts` y `subtitulos-061.ts`. Acepta `sinSubtitulos` (la base de la versión con ficha, `ficha-luxur`).

## Capas (de atrás a delante)

| # | Capa | Qué es | Notas |
|---|---|---|---|
| 1 | `PistaMetraje` | los 10 cortes de vídeo mudos y la tarjeta (`foto`) | look neutro con viñeta suave; **el color va por plano** (`colorCorrection()`, R32) → render con `--gl=angle`; sin sello ni velos superiores; **8 cortes secos y 1 disolvencia, todos en un golpe medido de la canción** (la disolvencia ACABA en él) |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de la toma del CTA (f1077) | nada se congela |
| 3 | `VeloSubtitulos` | degradado desde abajo, solo mientras hay subtítulos | Luxur va sin sombra: el velo es lo único que sostiene el blanco |
| 4 | `SubtitulosEditoriales` | todo lo que dice Isabella, en un grupo al 90 % y con la cursiva 8 px menor (99 → 91 px) | 6 bloques, 3 acentos |
| 5 | `LogoCierre` y `WebCierre` | logo (440 px, 60 %) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) sobre la tarjeta | centrados, y≈795-1085 |
| 6 | `PistaAudio` | voz de las 3 tomas (WAV tratado, −15,0 LUFS) + música («La Isla Bonita», −15 LUFS sola por tramos, −26 bajo la voz) | en la RAÍZ |

## Zonas (px de 1080×1920)

- **Subtítulos:** abajo (borde superior ≈ 74,5 %, nunca por debajo del 88 %). Arriba **no hay nada** en ningún frame.
- **Isabella:** de cuerpo entero y lejos en el hook (camina por el pasillo del estudio hacia la cámara) y en la CTA (de pie al fondo, junto a la cama), más cerca en la mitad (camina entre el escritorio y la cama); el texto cae sobre la cama, el suelo o sus piernas, nunca sobre su cara.
- **Recorridos:** MOV verticales de 1080×1920, sin rotación ni recorte: solo se escalan a 1296×2304. **No hay dron.**
- **Cierre:** tarjeta negra lisa; logo y web centrados, un poco por encima del centro.

## Reglas fijas del canal (comprobadas por `revisar-061.mjs`)

1. **La primera toma sale sin texto ni voz** (ZC22, la pérgola): Isabella entra A CORTE en el f73 (opaca desde ese frame); su primera palabra suena en el f84,4 y el primer subtítulo entra en el f84. Esta pieza **no** rompe la regla.
2. **Nunca el sello «PROPIEDADES LUXUR»**.
3. **El cierre es la tarjeta oscura con el logo y la web** (no `@propiedadesluxur`).
4. **Nada se congela** (la imagen de Isabella funde a negro en el último fotograma de su toma, el f1077; el CTA usa el clip hasta su f154, 1 f antes de su final).
5. **Cifra dicha = cifra escrita**: ella no dice ninguna cifra; ninguna en pantalla (ni precio ni áreas ni ficha).
6. **Transiciones: corte y disolver.** Cada cambio de plano cae en un golpe MEDIDO (≥ 13 dB: el plan usa 13,2-31,5).
7. **Voz a −15 LUFS** (compresor 3,5:1 + limitador a −2,5 dBFS; pico real −2,5 dBFS) y **música sola a −15 LUFS por tramos**, ≈ −26 LUFS bajo la voz; la música baja con curva de coseno tras el golpe de cada entrada de Isabella y **acaba de bajar antes de su primera palabra**.
8. **Nada de permisos, licencias ni rentabilidad escritos**: «habilitado para rentas cortas» lo dice la voz de Isabella (de la ficha de la web); la puerta (`2a`) lo comprueba.

## Lo que decide esta pieza distinto de la 059

- **No hay dron:** la apertura aérea del formato es la pérgola de la terraza (ZC22) y la vista del bloque 5 es el jacuzzi con la ciudad (ZC18).
- **El hook y el CTA entran a corte**, no disolviendo: sus tomas no dejan los 12 f de aire que pide una disolvencia más los 10 f de bajada de la música antes de la primera palabra. El golpe suena entero; las palabras caen a 11,4 f (hook) y 11,1 f (CTA) del golpe. Solo la mitad disuelve (la voz a los 12,4 f).
- **Las tres tomas están en el estudio de 24 m²:** el hook en el pasillo, la mitad entre el escritorio y la cama, el CTA de pie al fondo junto al ventanal. Se declara en la puerta (`2a`).
- **Texto que marca el ángulo:** el acento cae en «rentas cortas» (de qué va el estudio), «pero pocos permiten» (lo que lo hace raro) y «una visita.» (la acción).
- **Canción sin pulso, sin caída propia en esta sección:** la música no resuelve sola; se apaga con curva bajo la tarjeta tras la última palabra del CTA.
