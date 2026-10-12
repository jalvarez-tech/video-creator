# 02 · Layout y capas — proyecto 039

> Paso 2 de 3. Capas, z-order y zonas de pantalla. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

Composición `Recorrido039` (`remotion/src/proyectos/039/`), 1080×1920 a 30 fps, 1055 f (35,17 s). Es el montaje del 034 (V18) con los planos, el audio y el texto de esta pieza: lo propio está en `metraje-039.ts`, `audio-039.ts` y `subtitulos-039.ts`.

## Capas (de atrás a delante)

| # | Capa | Qué es | Notas |
|---|---|---|---|
| 1 | `PistaMetraje` | los 20 cortes de vídeo mudos (14 planos: dos de ellos son escaleras de velocidad de 4 cortes) y la tarjeta (`foto`) | look neutro con viñeta suave; **el color va por plano** (`colorCorrection()`, R32) → render con `--gl=angle`; sin sello ni velos superiores; los 19 cambios de plano son cortes secos |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de la toma del CTA (f994) | nada se congela |
| 3 | `VeloSubtitulos` | degradado desde abajo, solo mientras hay subtítulos | Luxur va sin sombra: el velo es lo único que sostiene el blanco |
| 4 | `SubtitulosEditoriales` | todo lo que dice Isabella, en un grupo al 90 % y con la cursiva 8 px menor (99 → 91 px) | 6 bloques, 3 acentos |
| 5 | `LogoCierre` y `WebCierre` | logo (440 px, 60 %) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) sobre la tarjeta | centrados, y≈795-1085 |
| 6 | `PistaAudio` | voz de las 3 tomas (WAV tratado, ≈ −15 LUFS) + música («Light Fills the Room», −15 LUFS sola por tramos, −26 bajo la voz) | en la RAÍZ |

## Zonas (px de 1080×1920)

- **Subtítulos:** abajo (borde superior ≈ 74,5 %, nunca por debajo del 88 %). Arriba **no hay nada** en ningún frame.
- **Isabella:** de cuerpo entero en las tres tomas (camina hacia cámara); el texto cae por debajo de sus pies o a la altura de las piernas, nunca sobre la cara.
- **Drones apaisados:** recortados a 9:16 en `normalizar.mjs` (ventana vertical de 1216×2160 en la x de cada clip): DR104 en 0,25 (a 0,5 no sale la cabaña; a 0,75 entra el tejado azul del vecino) y DR101 en 0,35.
- **Cierre:** tarjeta negra lisa; logo y web centrados, un poco por encima del centro.

## Reglas fijas del canal (comprobadas por `revisar-039.mjs`)

1. **La primera toma sale sin texto ni voz** (DR104): Isabella entra A CORTE en el golpe del f54 y su primera palabra suena a los 9 f; el primer subtítulo entra con ella (f62). Esta pieza **no** rompe la regla.
2. **Nunca el sello «PROPIEDADES LUXUR»**.
3. **El cierre es la tarjeta oscura con el logo y la web** (no `@propiedadesluxur`).
4. **Nada se congela** (la imagen de Isabella funde a negro en el último fotograma de su toma; el CTA usa el clip hasta su último fotograma).
5. **Ninguna cifra** en toda la pieza (ni precio ni metros), ni en pantalla ni en voz.
6. **Transiciones: solo corte** (en esta pieza ninguna disolvencia: todos los cambios caen en un golpe).

## Lo que decide esta pieza distinto del 030, el 031 y el 034 (los pedidos del encargo)

- **Frame 0 ya en movimiento:** DR104 empieza en su tramo de velocidad constante (4 px/f) y no hay entrada suave; la bajada dura 1,8 s para no salirse de ese tramo.
- **Ritmo:** el bloque 3 son cinco planos de 1,2-1,5 s (cada uno en un golpe) y una pausa de 4,2 s (DR96, casi quieta) justo antes de la mitad. La vista dura 4,6 s.
- **Rampas de velocidad** solo en el bloque 3 y solo sobre drones: ×1 → ×2,5 (c04) y ×2,5 → ×1 (c06), en escalones de 2 f, cada cambio en un golpe medido.
- **Texto que marca el golpe:** el acento cae en «desconectado?» (lo que contradice), «dos entradas» (el hecho que lo contesta) y «escríbeme lote» (la acción).
- **Color:** contraste 1,20 (la puerta sube su tope a 1,22), luces recogidas; quemado máx. 1,7 %; piel intacta.
- **La música** nunca sube: la canción llega a ≈ 0 dBFS y todos los tramos bajan 1,1-3,1 dB hasta −15 LUFS.
