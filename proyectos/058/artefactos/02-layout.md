# 02 · Layout y capas — proyecto 058

> Paso 2 de 3. Capas, z-order y zonas de pantalla. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

Composición `Recorrido058` (`remotion/src/proyectos/058/`), 1080×1920 a 30 fps, 1119 f (37,3 s). Es el montaje del 056 (la puerta, la composición, la rejilla de una canción sin pulso) con el hook a corte del 042: lo propio está en `metraje-058.ts`, `audio-058.ts` y `subtitulos-058.ts`. Acepta `sinSubtitulos` (la base de la versión con ficha, `ficha-luxur`).

## Capas (de atrás a delante)

| # | Capa | Qué es | Notas |
|---|---|---|---|
| 1 | `PistaMetraje` | los 10 cortes de vídeo mudos y la tarjeta (`foto`) | look neutro con viñeta suave; **el color va por plano** (`colorCorrection()`, R32) → render con `--gl=angle`; sin sello ni velos superiores; **7 cortes secos y 2 disolvencias**: el hook (a corte, sin golpe) y seis cortes en un golpe medido de la canción; la mitad y el CTA, por disolvencia y sin golpe (la música ya está abajo) |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de la toma del CTA (f1058) | nada se congela |
| 3 | `VeloSubtitulos` | degradado desde abajo, solo mientras hay subtítulos | Luxur va sin sombra: el velo es lo único que sostiene el blanco (`borde` 0,68 · `medio` 0,44) |
| 4 | `SubtitulosEditoriales` | todo lo que dice Isabella, en un grupo al 90 % y con la cursiva 8 px menor (99 → 91 px) | 7 bloques, 5 acentos |
| 5 | `LogoCierre` y `WebCierre` | logo (440 px, 60 %) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) sobre la tarjeta | centrados, y≈795-1085 |
| 6 | `PistaAudio` | voz de las 3 tomas (WAV tratado, −15,0 LUFS) + música («Ivory Skyline Reverie», −15 LUFS sola por tramos, −26 bajo la voz) | en la RAÍZ |

## Zonas (px de 1080×1920)

- **Subtítulos:** abajo (borde superior ≈ 74,5 %, nunca por debajo del 88 %). Arriba **no hay nada** en ningún frame.
- **Isabella:** de cuerpo entero en el hook (camina hacia cámara por el pasillo) y en la mitad (en la sala, junto al ventanal), sentada en el CTA; el texto cae por debajo de la cintura o sobre las piernas / el suelo, nunca sobre la cara.
- **Recorridos:** MOV verticales de 1080×1920, sin rotación ni recorte: solo se escalan a 1296×2304. **Aéreo:** 4K vertical (3840×2160 con `rotation=90`): solo se rota y se escala.
- **Cierre:** tarjeta negra lisa; logo y web centrados, un poco por encima del centro.

## Reglas fijas del canal (comprobadas por `revisar-058.mjs`)

1. **La primera toma sale sin texto ni voz** (DR04, el edificio): Isabella entra A CORTE en el f84; su primera palabra suena en el f87 y el primer subtítulo entra en el f87. Esta pieza **no** rompe la regla.
2. **Nunca el sello «PROPIEDADES LUXUR»**.
3. **El cierre es la tarjeta oscura con el logo y la web** (no `@propiedadesluxur`).
4. **Nada se congela** (la imagen de Isabella funde a negro en el último fotograma de su toma, el f1058; el CTA usa el clip hasta su f142, 3 f antes de su final).
5. **Cifra dicha = cifra escrita**: la única cifra en pantalla es la que ella dice («60 metros cuadrados», en cifra); ni precio ni resto de la ficha.
6. **Transiciones: corte y disolver.** Los seis cortes secos del paseo y del bloque 5 caen en un golpe MEDIDO (≥ 10,6 dB).
7. **Voz a −15 LUFS** (compresor 3,5:1 + limitador a −2,5 dBFS; pico real −2,5 dBFS) y **música sola a −15 LUFS por tramos**, ≈ −26 LUFS bajo la voz; la música baja con curva de coseno **y acaba de bajar ANTES de la primera palabra** (en el `en` del plano de su toma).

## Lo que decide esta pieza distinto del 056

- **El hook entra a corte** (como el del 042): HK02 no deja aire antes de la primera sílaba (3 f). La apertura dura 84 f (2,8 s): tras el golpe del f66 la música baja con curva en 15 f y acaba justo donde entra Isabella. La mitad (MD07, voz a 0,42 s) y el CTA (CT01, 0,60 s) entran disolviendo y también sin golpe.
- **Una sala, dos tomas de Isabella** (la mitad de pie junto al ventanal, el CTA sentada en el sofá junto al balcón); el hook va en el pasillo. Se declara en la puerta (`2a`).
- **Aérea con DR04 y DR05**: la apertura es la pasada uniforme por la fachada; la vista es el dron que se aleja y abre La Ceja con sus montañas (movimiento 13 y muy uniforme).
- **Texto que marca el ángulo:** el acento cae en «descansar,» (el hook), «60 metros cuadrados» y «apartamento pequeño.» (la mitad: la cifra y la idea) y «Escríbeme» y «diferente» (el CTA). Entre dos acentos hay ≥ 2 s (el validador lo exige: por eso «al caos.» va en base).
- **El paseo no lleva ninguna voz ni dato**: solo música (el 056 tampoco).
