# 02 · Layout y capas — proyecto 066

> Paso 2 de 3. Capas, z-order y zonas de pantalla. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

Composición `Recorrido066` (`remotion/src/proyectos/066/`), 1080×1920 a 30 fps, 1218 f (40,6 s). Es el montaje de la 057 (la puerta, la estructura de la composición) con una canción SIN pulso (*Flying Into the Sun*, medida por golpes) y las reglas de siempre: lo propio está en `metraje-066.ts`, `audio-066.ts` y `subtitulos-066.ts`. Acepta `sinSubtitulos` (la base de la versión con ficha, `ficha-luxur`).

## Capas (de atrás a delante)

| # | Capa | Qué es | Notas |
|---|---|---|---|
| 1 | `PistaMetraje` | los 9 cortes de vídeo mudos y la tarjeta (`foto`) | look neutro con viñeta suave; **el color va por plano** (`colorCorrection()`, R32) → render con `--gl=angle`; sin sello ni velos superiores; **5 cortes secos (todos en un golpe medido) y 3 disolvencias libres** (hook, mitad y CTA) |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de la toma del CTA (f1157) | nada se congela |
| 3 | `VeloSubtitulos` | degradado desde abajo, solo mientras hay subtítulos | Luxur va sin sombra: el velo es lo único que sostiene el blanco |
| 4 | `SubtitulosEditoriales` | todo lo que dice Isabella, en un grupo al 90 % y con la cursiva 8 px menor (99 → 91 px) | 6 bloques, 4 acentos |
| 5 | `LogoCierre` y `WebCierre` | logo (440 px, 60 %) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) sobre la tarjeta | centrados, y≈795-1085 |
| 6 | `PistaAudio` | voz de las 3 tomas (WAV tratado, −15,0 LUFS) + música («Flying Into the Sun», −15 LUFS sola por tramos, ≈ −26 LUFS bajo la voz) | en la RAÍZ |

## Zonas (px de 1080×1920)

- **Subtítulos:** abajo (borde superior ≈ 74,5 %, nunca por debajo del 88 %). Arriba **no hay nada** en ningún frame.
- **Isabella:** de pie, caminando hacia la cámara, en las tres tomas (el prado en el hook, la loma en la mitad, el camino en el CTA); es una figura de cuerpo entero y el texto cae a la altura de sus piernas, nunca sobre su cara.
- **Paneos:** MOV verticales de 1080×1920, sin rotación ni recorte: solo se escalan a 1296×2304. **Aéreos:** 4K vertical (3840×2160 con `rotation=90`): solo se rota y se escala.
- **Cierre:** tarjeta negra lisa; logo y web centrados, un poco por encima del centro.

## Reglas fijas del canal (comprobadas por `revisar-066.mjs`)

1. **La primera toma sale sin texto ni voz** (DR01, el camino y los cipreses): Isabella entra DISOLVIENDO y es opaca en el f72; su primera palabra suena en el f94 y el primer subtítulo entra en el f94.
2. **Nunca el sello «PROPIEDADES LUXUR»**.
3. **El cierre es la tarjeta oscura con el logo y la web** (no `@propiedadesluxur`).
4. **Nada se congela** (la imagen de Isabella funde a negro en el último fotograma de su toma, el f1157; el CTA usa el clip hasta su f108 de 113).
5. **Cifra dicha = cifra escrita**: la única cifra que ella dice es «5.000 metros» (hook) y se escribe tal cual; la ficha dice 5.170 m² y eso no va en pantalla (va al caption).
6. **Transiciones: corte y disolver.** Los cortes secos caen en un golpe MEDIDO (≥ 8,0 dB: 10,8 · 12,3 · 9,8 · 9,3 · 12,5); las disolvencias van libres.
7. **Voz a −15 LUFS** (compresor 3,5:1 + limitador a −2,5 dBFS) y **música sola a −15 LUFS por tramos**, ≈ −26 LUFS bajo la voz; la música baja con curva de coseno y **acaba de bajar 2 f antes de su primera palabra**.

## Lo que decide esta pieza distinto de la 057

- **La mitad es un clip corto** (6,63 s, ella acaba a los 6,24): entra disolviendo y sale a corte en un golpe; no se puede alargar ni disolver a la salida.
- **Los paneos y los aéreos son paisaje, no habitaciones**: el «paseo» va del suelo al aire (cielo y valle a ras de suelo → el lote desde arriba → un rincón bajo un árbol → el vuelo que baja → la ciudad al horizonte) y la vista es el último plano antes del CTA.
- **La música no tiene pulso ni respiro**: bajo el hook y bajo la mitad va con una ganancia fija (−15,2 y −17,4 dB); bajo el CTA sigue la caída natural de la canción (de −16,6 a −26,6 LUFS en 2 s).
- **El texto marca la escasez, la paz y la acción:** el acento cae en «muy pocos.» (el hook), «paz» y «dentro de ella.» (la mitad) y «haz clic» (la acción del CTA).
