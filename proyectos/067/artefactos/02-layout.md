# 02 · Layout y capas — proyecto 067

> Paso 2 de 3. Capas, z-order y zonas de pantalla. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

Composición `Recorrido067` (`remotion/src/proyectos/067/`), 1080×1920 a 30 fps, 1148 f (38,3 s). Es el montaje del 057 (la puerta y la estructura de la composición) con la música de la 018 (*Return to Oasis*, pulso constante) y sus reglas: lo propio está en `metraje-067.ts`, `audio-067.ts` y `subtitulos-067.ts`. Acepta `sinSubtitulos` (la base de la versión con ficha, `ficha-luxur`).

## Capas (de atrás a delante)

| # | Capa | Qué es | Notas |
|---|---|---|---|
| 1 | `PistaMetraje` | los 10 cortes de vídeo mudos y la tarjeta (`foto`) | look neutro con viñeta suave; **el color va por plano** (`colorCorrection()`, R32) → render con `--gl=angle`; sin sello ni velos superiores; **6 cortes secos (todos en un golpe medido) y 3 disolvencias libres** (hook, mitad y CTA: la música baja bajo ellas) |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de la toma del CTA (f1087) | nada se congela |
| 3 | `VeloSubtitulos` | degradado desde abajo, solo mientras hay subtítulos | Luxur va sin sombra: el velo es lo único que sostiene el blanco (`borde` 0,68 · `medio` 0,44) |
| 4 | `SubtitulosEditoriales` | todo lo que dice Isabella, en un grupo al 90 % y con la cursiva 8 px menor (99 → 91 px) | 6 bloques, 6 acentos |
| 5 | `LogoCierre` y `WebCierre` | logo (440 px, 60 %) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) sobre la tarjeta | centrados, y≈795-1085 |
| 6 | `PistaAudio` | voz de las 3 tomas (WAV tratado, −15,0 LUFS) + música («Return to Oasis», −15 LUFS sola por tramos, ≈ −26 LUFS bajo la voz) | en la RAÍZ |

## Zonas (px de 1080×1920)

- **Subtítulos:** abajo (borde superior ≈ 74,5 %, nunca por debajo del 88 %). Arriba **no hay nada** en ningún frame.
- **Isabella:** de pie y caminando hacia la cámara en el hook y el CTA (que sube una loma), de pie en la mitad. El texto cae por debajo de la cara (a la altura del torso o las piernas), nunca sobre ella.
- **Paneos:** MOV verticales de 1080×1920, sin rotación ni recorte: solo se escalan a 1296×2304. **Aéreos:** 4K vertical (3840×2160 con `rotation=90`): solo se rota y se escala.
- **Cierre:** tarjeta negra lisa; logo y web centrados, un poco por encima del centro.

## Reglas fijas del canal (comprobadas por `revisar-067.mjs`)

1. **La primera toma sale sin texto ni voz** (DR06): Isabella entra DISOLVIENDO y es opaca en el f96; su primera palabra suena en el f99 y el primer subtítulo entra en el f99. Esta pieza **no** rompe la regla.
2. **Nunca el sello «PROPIEDADES LUXUR»**.
3. **El cierre es la tarjeta oscura con el logo y la web** (no `@propiedadesluxur`).
4. **Nada se congela** (la imagen de Isabella funde a negro en el último fotograma de su toma, el f1087; el CTA usa el clip hasta su f150, 4 f antes de su final).
5. **Cifra dicha = cifra escrita**: Isabella dice UNA cifra («5.000 metros», en el CTA) y es la única en pantalla, tal cual la dice; ni precio ni áreas ni ficha.
6. **Transiciones: corte y disolver.** Los cortes secos caen en un golpe MEDIDO (≥ 8,0 dB: 9,2 · 9,1 · 9,6 · 9,7 · 8,2 · 11,8); las disolvencias van libres.
7. **Voz a −15 LUFS** (compresor 3,5:1 + limitador a −2,5 dBFS; pico real −2,5 dBFS) y **música sola a −15 LUFS por tramos**, ≈ −26 LUFS bajo la voz; la música baja con curva de coseno y **acaba de bajar 2 f antes de su primera palabra**.

## Lo que decide esta pieza distinto del 057 y de la 018

- **El paseo va de lo bajo a lo alto**: a ras de suelo (paneo y cielo), el lote en picado, y luego el dron sube hasta el valle: la vista llega tras la mitad.
- **Planos de 2,2-3,8 s**: pulso constante de 110 BPM = más ritmo que el piano del 057; 10 planos en 38 s.
- **La música sigue la curva de la canción** bajo el CTA (su caída a un piano) en lugar de una ganancia fija: la ganancia que deja la música a −26 LUFS en cada momento (`MOMENTANEA.cta` en `audio-067.ts`), con una puerta que mide el nivel EFECTIVO (momentánea + ganancia) y no la ganancia lineal.
- **El texto marca lo que selecciona y la acción:** seis acentos, dos por toma de Isabella.
