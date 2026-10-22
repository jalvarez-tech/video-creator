# 02 · Layout y capas — proyecto 057

> Paso 2 de 3. Capas, z-order y zonas de pantalla. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

Composición `Recorrido057` (`remotion/src/proyectos/057/`), 1080×1920 a 30 fps, 1080 f (36,0 s). Es el montaje del 056 (la puerta, la estructura de la composición) con la música de la 042 (*Silver Skies*, piano) y sus reglas: lo propio está en `metraje-057.ts`, `audio-057.ts` y `subtitulos-057.ts`. Acepta `sinSubtitulos` (la base de la versión con ficha, `ficha-luxur`).

## Capas (de atrás a delante)

| # | Capa | Qué es | Notas |
|---|---|---|---|
| 1 | `PistaMetraje` | los 10 cortes de vídeo mudos y la tarjeta (`foto`) | look neutro con viñeta suave; **el color va por plano** (`colorCorrection()`, R32) → render con `--gl=angle`; sin sello ni velos superiores; **3 cortes secos (todos en un golpe medido) y 5 disolvencias libres** (con piano no piden golpe; la de la mitad y la de la alcoba acaban en uno por limpieza) |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de la toma del CTA (f1019) | nada se congela |
| 3 | `VeloSubtitulos` | degradado desde abajo, solo mientras hay subtítulos | Luxur va sin sombra: el velo es lo único que sostiene el blanco (`borde` 0,68 · `medio` 0,44; contraste medido 3,9-5,5 : 1 al p90 y 2,9-4,1 al p99) |
| 4 | `SubtitulosEditoriales` | todo lo que dice Isabella, en un grupo al 90 % y con la cursiva 8 px menor (99 → 91 px) | 6 bloques, 3 acentos |
| 5 | `LogoCierre` y `WebCierre` | logo (440 px, 60 %) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) sobre la tarjeta | centrados, y≈795-1085 |
| 6 | `PistaAudio` | voz de las 3 tomas (WAV tratado, −15,0 LUFS) + música («Silver Skies», −15 LUFS sola por tramos, ≈ −26 LUFS bajo la voz) | en la RAÍZ |

## Zonas (px de 1080×1920)

- **Subtítulos:** abajo (borde superior ≈ 74,5 %, nunca por debajo del 88 %). Arriba **no hay nada** en ningún frame.
- **Isabella:** de pie en el hook (junto a la tele) y en el CTA (en el balcón, apoyada en la baranda); sentada en la mitad. El texto cae por debajo de la cara (a la altura del torso o las piernas), nunca sobre ella.
- **Recorridos:** MOV verticales de 1080×1920, sin rotación ni recorte: solo se escalan a 1296×2304. **Aéreos:** 4K vertical (3840×2160 con `rotation=90`): solo se rota y se escala.
- **Cierre:** tarjeta negra lisa; logo y web centrados, un poco por encima del centro.

## Reglas fijas del canal (comprobadas por `revisar-057.mjs`)

1. **La primera toma sale sin texto ni voz** (DR03, el edificio): Isabella entra DISOLVIENDO y es opaca en el f72; su primera palabra suena en el f85 y el primer subtítulo entra en el f85. Esta pieza **no** rompe la regla.
2. **Nunca el sello «PROPIEDADES LUXUR»**.
3. **El cierre es la tarjeta oscura con el logo y la web** (no `@propiedadesluxur`).
4. **Nada se congela** (la imagen de Isabella funde a negro en el último fotograma de su toma, el f1019; el CTA usa el clip hasta su f127, 139 f antes de su final).
5. **Cifra dicha = cifra escrita**: Isabella no dice ninguna cifra, así que no hay ninguna en pantalla; ni precio ni áreas ni ficha.
6. **Transiciones: corte y disolver.** Los cortes secos caen en un golpe MEDIDO (≥ 8,0 dB: 17,4 · 8,2 · 8,0); las disolvencias van libres con piano.
7. **Voz a −15 LUFS** (compresor 3,5:1 + limitador a −2,5 dBFS; pico real −2,5 dBFS) y **música sola a −15 LUFS por tramos**, ≈ −26 LUFS bajo la voz; la música baja con curva de coseno y **acaba de bajar 2 f antes de su primera palabra**.

## Lo que decide esta pieza distinto del 056 y del 042

- **Planos largos y pocos**: dos en el paseo (3,7 y 4,6 s) y tres en el bloque 5 (3,3 · 3,3 · 3,5 s): paz = sin prisa; 10 planos en 36 s (la 056: 11 en 35 s).
- **Las tres tomas de Isabella entran en tres sitios del mismo apartamento**: de pie en la sala (hook), sentada en el sofá de la sala (mitad) y de pie en el balcón (CTA). Hook y mitad son la misma sala con otra pose y otro encuadre: se declara en la puerta (`2a`).
- **La música sigue la curva de la canción** bajo el hook (su respiro) y bajo el CTA (su caída), en lugar de una ganancia fija: la ganancia que deja la música a −26 LUFS en cada momento (`MOMENTANEA` en `audio-057.ts`).
- **El texto marca la paz y la acción:** el acento cae en «paz?» (el hook), «descansaste?» (la mitad) y «Agenda tu visita» (la acción del CTA, como manda el formato).
