# 02 · Layout y capas — proyecto 060

> Paso 2 de 3. Capas, z-order y zonas de pantalla. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

Composición `Recorrido060` (`remotion/src/proyectos/060/`), 1080×1920 a 30 fps, 1642 f (54,7 s; rev. 2). Es el montaje de la 059 (la puerta, la estructura de la composición) con la música y la rejilla de una canción **sin pulso estable** (*Street Level Sessions on the Green*, cortes en golpes medidos): lo propio está en `metraje-060.ts`, `audio-060.ts` y `subtitulos-060.ts`. Acepta `sinSubtitulos` (la base de la versión con ficha, `ficha-luxur`).

## Capas (de atrás a delante)

| # | Capa | Qué es | Notas |
|---|---|---|---|
| 1 | `PistaMetraje` | los 12 cortes de vídeo mudos y la tarjeta (`foto`) | look neutro con viñeta suave; **el color va por plano** (`colorCorrection()`, R32) → render con `--gl=angle`; sin sello ni velos superiores; **5 cortes secos en un golpe medido y 6 disolvencias** (el hook, la mitad y el CTA, más los tres planos de fondo de la infografía, que se funden bajo el velo a un frame libre) |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de la toma del CTA (f1581) | nada se congela |
| 2b | `Infografia060` (rev. 1-2) | la rentabilidad estimada: tres paneles con velo negro del 80 % (1 y 2) o degradado desde abajo (3, sobre la vista), f876-f1406 (14 s + 3,7 s con la utilidad sobre la vista); **sin animar las cifras** (rev. 2) | encargo del usuario; sobre los planos del bloque 5; cada elemento entra en un golpe medido; cada panel centrado en y 960 (zona y 570-1350, rev. 2026-10-22) |
| 3 | `VeloSubtitulos` | degradado desde abajo, solo mientras hay subtítulos | Luxur va sin sombra: el velo es lo único que sostiene el blanco |
| 4 | `SubtitulosEditoriales` | todo lo que dice Isabella, en un grupo al 90 % y con la cursiva 8 px menor (99 → 91 px) | 8 bloques, 3 acentos |
| 5 | `LogoCierre` y `WebCierre` | logo (440 px, 60 %) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) sobre la tarjeta | centrados, y≈795-1085 |
| 6 | `PistaAudio` | voz de las 3 tomas (WAV tratado, −15,0 LUFS) + música («Street Level Sessions on the Green», −15 LUFS sola por tramos, −26 bajo la voz) | en la RAÍZ |

## Zonas (px de 1080×1920)

- **Subtítulos:** abajo (borde superior ≈ 74,5 %, nunca por debajo del 88 %). Arriba **no hay nada** en ningún frame.
- **Isabella:** de cuerpo entero en el hook (de pie, al fondo del estudio) y en la mitad (de pie, caminando hacia la cámara con la cama delante), y sentada en el escritorio en el CTA (cuerpo entero); el texto cae sobre la cama, el suelo o sus piernas, nunca sobre la cara.
- **Recorridos:** MOV verticales de 1080×1920, sin rotación ni recorte: solo se escalan a 1296×2304.
- **Infografía:** columna de 880 px (margen 100) y cada panel CENTRADO en vertical sobre y 960, dentro de la zona y 570-1350 (el cuadrado 1:1 del feed es y 420-1500; rev. 2026-10-22: antes la zona era y 440-1200 y los paneles 1 y 2 quedaban pegados arriba). La ficha de la versión 1:1 (y 1220-1420) sale mientras salen las cifras y no se pisa; la interfaz de las plataformas, por debajo.
- **Cierre:** tarjeta negra lisa; logo y web centrados, un poco por encima del centro.

## Reglas fijas del canal (comprobadas por `revisar-060.mjs`)

1. **La primera toma sale sin texto ni voz** (ZC07, el rooftop): Isabella entra DISOLVIENDO y es opaca en el f92; su primera palabra suena en el f99 y el primer subtítulo entra en el f99. Esta pieza **no** rompe la regla.
2. **Nunca el sello «PROPIEDADES LUXUR»**.
3. **El cierre es la tarjeta oscura con el logo y la web** (no `@propiedadesluxur`).
4. **Nada se congela** (la imagen de Isabella funde a negro en el último fotograma de su toma, el f1360; el CTA usa el clip hasta su f176, 12 f antes de su final).
5. **Cifra dicha = cifra escrita**: Isabella dice «24», «0,5 %» y «1 %» y están en sus subtítulos. La infografía (encargo del usuario) lleva además las cifras de su tabla, rotuladas como estimadas. Sin precio ni áreas ni ficha.
6. **Transiciones: corte y disolver.** Cada corte seco y la entrada del hook y de la mitad caen en un golpe MEDIDO (≥ 13,5 dB; la vista, 10,7: el más fuerte que tiene la canción en 195-205 s); las disolvencias de los fondos de la infografía y la del CTA van a un frame libre (la canción es un lo-fi con golpes de 10-25 dB y en 197,7-204,8 s no tiene ninguno).
7. **Voz a −15 LUFS** (compresor 3,5:1 + limitador a −2,5 dBFS; pico real −2,5 dBFS) y **música sola a −15 LUFS por tramos**, ≈ −26 LUFS bajo la voz; la música baja con curva de coseno tras el golpe de cada entrada de Isabella y **acaba de bajar antes de su primera palabra**.

## Lo que decide esta pieza distinto de la 059

- **No hay dron:** la apertura y la vista son del rooftop (ZC07 y ZC11), con clips y encuadres distintos.
- **Las tres tomas de Isabella entran disolviendo** (la 059 entraba a corte en el CTA): la toma de CTA3 deja 0,96 s de silencio previo.
- **El hook cruza el golpe:** la disolvencia al hook termina 4 f DESPUÉS del golpe (la imagen de Isabella al 67 % en el golpe) para que la bajada de la música acabe antes de su primera sílaba (declarado en `metraje-060.ts` y en la puerta: `DESFASE_GOLPE`).
- **La mitad tiene solo 6 f de aire** antes del golpe del plano siguiente: la música sube en 8 f ya cruzando el golpe (a −1,4 dB de su nivel).
- **Texto que marca el ángulo:** el acento cae en «dólares.» (lo que el estudio ya hace), «te muestro cómo.» (la invitación) y «y escríbeme» (la acción). **El 0,5 % y el 1 % van en la línea base, sin acento.**
- **Tres tomas en el mismo estudio** (24 m²): lo que las distingue es la pose y el fondo (de pie con el balcón · de pie caminando con la cama delante · sentada en el escritorio). Se declara en la puerta (2a).
- **Canción sin pulso:** la rejilla son golpes medidos (`musica/rejilla-060.txt`), la música no resuelve sola y se apaga con curva bajo la tarjeta.

## La infografía (rev. 1-2, encargo del usuario del 2026-10-22)

- **Excepción declarada** a «el dato grande solo va en el bloque 3 y en los bloques 5 y 6 la recompensa se mira»: va en el bloque 5 por encargo. La vista sigue siendo el clímax (el velo negro desaparece con el corte a la vista y el panel 3 cae sobre ella con un degradado ligero).
- **Rev. 2 (el usuario: «pasan muy rápido, no hagas animación en los números para que puedan estar más tiempo, solo ponlos uno a uno con el valor completo»):** sin recuentos, subidas ni latidos: cada cifra entra COMPLETA con un fundido de 8 f y se queda; la infografía dura 14 s más 3,7 s de la utilidad sobre la vista (antes, 10,3 s). El tiempo se saca alargando el bloque 5: cuatro planos de fondo de 3,5 s (la cama, la tele, el sofá y el coworking) que se funden bajo el velo —no necesitan golpe— y la vista (4,2 s, A CORTE en un golpe de 10,7 dB). La pieza pasa de 47,4 a 54,7 s.
- **Tiempos** (f de la composición; `infografia-060.ts`): panel 1 «la cuenta» f876-f1094 (tarifa f887, ocupación f930 con su barra al 85 %, noches f968, ingresos f1006) · panel 2 «los gastos» f1094-f1296 (administración f1094, servicios f1138, total f1201) · panel 3 «la utilidad» f1296-f1406 (cifra f1296, unidad f1310, pie f1336). Cada entrada cae en un golpe medido de la canción (25,3 · 17,4 · 23,6 · 13,3 · 13,9 · 11,0 · 18,4 · 10,7 dB); sin sonidos añadidos.
- **Un solo héroe a la vez:** ingresos (2,5 s enteros), total de gastos (2,7 s) y utilidad (3,2 s); cada cifra se queda en pantalla ≥ 2 s y entre dos cifras de un panel pasan ≥ 1,3 s.
- **Legibilidad (R25)** con el velo mezclado en sRGB sobre los planos sin texto (`medidas/legibilidad-infografia.txt`): blanco a 14-15 : 1 en los paneles 1 y 2 (oro a 6,3-6,6 : 1) y a ≥ 5,4 : 1 en el panel 3.
