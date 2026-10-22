# 02 · Layout y capas — proyecto 059

> Paso 2 de 3. Capas, z-order y zonas de pantalla. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

Composición `Recorrido059` (`remotion/src/proyectos/059/`), 1080×1920 a 30 fps, 1115 f (37,2 s). Es el montaje de la 056 (la puerta, la estructura de la composición) con la música y la rejilla de la V22/039 (*Light Fills the Room*, cortes en golpes medidos de una canción de pulso): lo propio está en `metraje-059.ts`, `audio-059.ts` y `subtitulos-059.ts`. Acepta `sinSubtitulos` (la base de la versión con ficha, `ficha-luxur`).

## Capas (de atrás a delante)

| # | Capa | Qué es | Notas |
|---|---|---|---|
| 1 | `PistaMetraje` | los 10 cortes de vídeo mudos y la tarjeta (`foto`) | look neutro con viñeta suave; **el color va por plano** (`colorCorrection()`, R32) → render con `--gl=angle`; sin sello ni velos superiores; **7 cortes secos y 2 disolvencias, todos en un golpe medido de la canción** (las disolvencias ACABAN en él) |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de la toma del CTA (f1054) | nada se congela |
| 3 | `VeloSubtitulos` | degradado desde abajo, solo mientras hay subtítulos | Luxur va sin sombra: el velo es lo único que sostiene el blanco |
| 4 | `SubtitulosEditoriales` | todo lo que dice Isabella, en un grupo al 90 % y con la cursiva 8 px menor (99 → 91 px) | 6 bloques, 3 acentos |
| 5 | `LogoCierre` y `WebCierre` | logo (440 px, 60 %) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) sobre la tarjeta | centrados, y≈795-1085 |
| 6 | `PistaAudio` | voz de las 3 tomas (WAV tratado, −15,0 LUFS) + música («Light Fills the Room», −15 LUFS sola por tramos, −26 bajo la voz) | en la RAÍZ |

## Zonas (px de 1080×1920)

- **Subtítulos:** abajo (borde superior ≈ 74,5 %, nunca por debajo del 88 %). Arriba **no hay nada** en ningún frame.
- **Isabella:** de cuerpo entero en el hook (de pie, lejos, en la alcoba) y en la mitad (sentada), de pie y cada vez más cerca en el CTA (acaba en primer plano); el texto cae sobre la cama, el suelo o sus piernas, nunca sobre la cara salvo en los últimos fotogramas del CTA, donde su cara llega al 40 % del alto: ahí el texto va en los dos tercios inferiores del cuadro, por debajo de la barbilla.
- **Recorridos:** MOV verticales de 1080×1920, sin rotación ni recorte: solo se escalan a 1296×2304. **Aéreo:** 4K vertical (3840×2160 con `rotation=90`): solo se rota y se escala.
- **Cierre:** tarjeta negra lisa; logo y web centrados, un poco por encima del centro.

## Reglas fijas del canal (comprobadas por `revisar-059.mjs`)

1. **La primera toma sale sin texto ni voz** (DR09, el edificio): Isabella entra DISOLVIENDO y es opaca en el f86; su primera palabra suena en el f97 y el primer subtítulo entra en el f97. Esta pieza **no** rompe la regla.
2. **Nunca el sello «PROPIEDADES LUXUR»**.
3. **El cierre es la tarjeta oscura con el logo y la web** (no `@propiedadesluxur`).
4. **Nada se congela** (la imagen de Isabella funde a negro en el último fotograma de su toma, el f1054; el CTA usa el clip hasta su f134, 2,6 f antes de su final).
5. **Cifra dicha = cifra escrita**: ella no dice ninguna cifra; ninguna en pantalla (ni precio ni áreas ni ficha).
6. **Transiciones: corte y disolver.** Cada cambio de plano cae en un golpe MEDIDO (≥ 15 dB: el plan usa 16,0-33,6).
7. **Voz a −15 LUFS** (compresor 3,5:1 + limitador a −2,5 dBFS; pico real −2,5 a −3,1 dBFS) y **música sola a −15 LUFS por tramos**, ≈ −26 LUFS bajo la voz; la música baja con curva de coseno tras el golpe de cada entrada de Isabella y **acaba de bajar antes de su primera palabra**.

## Lo que decide esta pieza distinto de la 056

- **El CTA entra a corte**, no disolviendo: la toma no tiene 12 f de silencio previo (su primera sílaba cae a los 13,8 f). El golpe del corte suena entero, la música baja en 10 f y la primera palabra suena a los 10,8 f.
- **Mitad y CTA en el mismo pasillo** (el rodaje); el hook, en la alcoba principal. Se declara en la puerta (`2a`).
- **Texto que marca el ángulo:** el acento cae en «de donde vives.» (el giro del hook), «Zona de trabajo» (lo que la casa resuelve) y «Escríbeme» (la acción).
- **Canción de pulso, plana, sin caída:** la música no resuelve sola; se apaga con curva bajo la tarjeta (la 039 hizo igual).
- **Dos aéreos:** DR09 abre (el edificio), DR10 cierra el bloque 5 (la vista, el plano más largo).
