# 02 · Layout y capas — proyecto 063 (rev. 1)

> Paso 2 de 3. Capas, z-order y zonas de pantalla. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

Composición `Recorrido063` (`remotion/src/proyectos/063/`), 1080×1920 a 30 fps, 1347 f (44,9 s). Es el montaje de la 056 (la puerta, la estructura de la composición) con **un lote** de por medio —no hay recorrido a pie, los bloques 3 y 5 son dron— y con **una infografía** al estilo de la 060. Las tres tomas de Isabella son anamórficas. Lo propio está en `metraje-063.ts`, `audio-063.ts`, `subtitulos-063.ts` e `infografia-063.ts` (+ `Infografia063.tsx`). Acepta `sinSubtitulos` (la base de la versión con ficha, `ficha-luxur`). `entrada-063.tsx` es una entrada que registra solo esta composición (los tres reels del lote comparten checkout y un plano ajeno a medias tumba el estudio entero).

## Capas (de atrás a delante)

| # | Capa | Qué es | Notas |
|---|---|---|---|
| 1 | `PistaMetraje` | los 8 cortes de vídeo mudos y la tarjeta (`foto`) | look neutro con viñeta suave; **el color va por plano** (`colorCorrection()`, R32) → render con `--gl=angle`; sin sello ni velos superiores; **3 cortes secos y 4 disolvencias**, cada cambio en un golpe medido de la canción (las disolvencias ACABAN en él) |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de la toma del CTA (f1286) | nada se congela |
| 3 | `VeloSubtitulos` | degradado desde abajo (borde 0,68 · medio 0,44), solo mientras hay subtítulos | Luxur va sin sombra: el velo es lo único que sostiene el blanco |
| 4 | `Infografia063` | **«Lo que sí tiene»** (f323-f539, sobre el dron) y los rótulos **UBICACIÓN · AGUA · ESCRITURAS** (f661-f813, sobre Isabella) | encargo del usuario; cifras SIN animar, una a una, cada elemento en un golpe medido; va DESPUÉS del velo de los subtítulos (debajo de él, el blanco de los rótulos se veía al 76 %) |
| 5 | `SubtitulosEditoriales` | todo lo que dice Isabella, en un grupo al 90 % y con la cursiva 8 px menor (99 → 91 px) | 9 bloques, 2 acentos |
| 6 | `LogoCierre` y `WebCierre` | logo (440 px, 60 %) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) sobre la tarjeta | centrados, y≈795-1085 |
| 7 | `PistaAudio` | voz de las 3 tomas (WAV tratado, −15,0 LUFS) + música («Oceans», −15 LUFS sola por tramos, −26 bajo la voz) | en la RAÍZ |

## Zonas (px de 1080×1920)

- **Subtítulos:** abajo (borde superior ≈ 74,5 %, nunca por debajo del 88 %). Arriba **no hay nada** en ningún frame.
- **Lista «Lo que sí tiene»:** columna de x 100-980, **centrada en vertical sobre y 960** (la mitad del fotograma y del cuadrado 1:1, y 420-1500) y toda dentro de y 570-1350: título y 673-774 · filete y 800 · tres filas y 842-1247. Nunca coincide con un subtítulo (Isabella no habla en ese tramo).
- **Rótulos de la mitad:** una fila centrada, y 1340-1392: **por debajo de las manos de Isabella** (llegan a y ≈ 1300 cuando abre los brazos) **y encima de los subtítulos** (empiezan en y ≈ 1430). Con un velo local oscuro y la sombra de texto de la marca. Cuando abre los brazos del todo, una mano llega a rozar la fila 2-3 frames.
- **Isabella:** de cuerpo entero en un prado, a unos metros de la cámara (cabeza hacia el 20-25 % del alto); en la mitad camina hacia la cámara. Los subtítulos caen sobre sus piernas, debajo de su cara y de sus manos.
- **Dron:** DR01 y DR02 verticales (2160×3840 al rotar → 1296×2304). El usuario quitó los apaisados: ya no se encuadra nada desde 16:9.
- **Tomas de Isabella:** 1920×1080 con SAR 81:256 → 1296×2304 con `setsar=1`; **sin recorte**.
- **Cierre:** tarjeta negra lisa; logo y web centrados, un poco por encima del centro.
- **Versión con ficha:** la banda (tipo · lugar · precio, y 1220-1420) **se va mientras haya infografía** (f305-f317 sale; f832-f844 vuelve; sale otra vez antes de la tarjeta, f1274-f1286): `herramientas/ficha-oculta.mjs`.

## Reglas fijas del canal (comprobadas por `revisar-063.mjs`)

1. **La primera toma sale sin texto ni voz** (DR02): Isabella entra DISOLVIENDO en un golpe y es opaca desde el f91; su primera palabra suena en el f103 y el primer subtítulo entra en el f102. Esta pieza **no** rompe la regla.
2. **Nunca el sello «PROPIEDADES LUXUR»**.
3. **El cierre es la tarjeta oscura con el logo y la web** (no `@propiedadesluxur`).
4. **Nada se congela** (la imagen de Isabella funde a negro en el último fotograma de su toma, el f1286; el CTA usa el clip del f109 al f279 de 335).
5. **Cifra dicha = cifra escrita**: Isabella no dice ninguna cifra en estas tres frases; los subtítulos no escriben ninguna. La infografía escribe dos de la ficha (3.244 m² y 100 %) y es un encargo del usuario (excepción declarada). El precio no va en el reel.
6. **Lo que la web no dice, no se dice**: nada de energía, uso del suelo, tipo de vía ni «apto para construir» en voz, subtítulos, infografía ni plan (la puerta lo comprueba).
7. **Transiciones: corte y disolver.** Cada cambio de plano cae en un golpe MEDIDO (≥ 9,4 dB); cada elemento de la infografía, también (≥ 9,0 dB).
8. **Voz a −15 LUFS** (compresor 3,5:1 + limitador a −2,5 dBFS) y **música sola a −15 LUFS por tramos** (baja 2-3 dB: la canción mide −11 a −13 LUFS y toca 0 dBFS), −26 LUFS bajo la voz; la música baja con curva de coseno tras el golpe de cada entrada de Isabella y **acaba de bajar antes de su primera palabra**.

## Lo que decide esta pieza distinto de la 056 y de la 060

- **Sin recorrido a pie**: los bloques 3 y 5 son dron (DR02 y el tramo 0-24 s de DR01); el dron **vuelve** tras el hook, con la infografía.
- **El hook entero, con su invitación**, sin cortar la toma; la infografía entra justo después de «esto».
- **Hook, mitad y CTA entran disolviendo** (las tres tomas traen 2,9-4,0 s de aire antes de hablar: sobra clip para los 12 f de la disolvencia y para que la música baje a tiempo); el primer plano del bloque 5 también disuelve (desde la mitad).
- **Infografía sobre el dron con un velo en degradado** (42 % en los bordes, 68 % detrás de la lista), no uno negro del 80 % como la 060: «dron + infografía» pide que el dron se vea. Medido: blanco 10-11 : 1 y oro 4,4-5,0 : 1 sobre el peor fondo.
- **Canción de pulso con caída**: *Oceans* mantiene −11…−13 LUFS hasta los 182,3 s y cae a un lecho suave con golpes aislados de 20-25 dB: el CTA entra en el último golpe fuerte antes de la caída y la música se apaga a cero en el f1320, antes del golpe de 23,6 dB que cae en el último fotograma.
- **Texto que marca el ángulo:** el acento cae en «acometidas legales.» y «Escríbeme»; en la mitad el énfasis lo llevan los rótulos.
