# 03 · Timeline — proyecto 032 (V16)

> Paso 3 de 3. Anterior: [02-layout.md](02-layout.md). De aquí salen `metraje-032.ts`, `audio-032.ts` y `subtitulos-032.ts`.

1140 f · 30 fps · 38,0 s. Cada toma de Isabella entra con su imagen opaca UN frame antes de su primera sílaba (`desde` = ese frame de la fuente, con ≥ 12 f de clip antes para la disolvencia) y se queda 14 f tras su última palabra (2 de margen + 12 de disolvencia al plano siguiente; R29); el CTA, hasta el final de su clip. Entre dos recorridos el corte es SECO y cae sobre un golpe fuerte de *We Are* (R33, golpes de `musica/golpes-032.json`), salvo la entrada al mirador, que disuelve hasta su golpe para no saltar en luma. Medido sobre el audio del render (WAV, sin el retardo del AAC): los cuatro cortes secos y el final de esa disolvencia caen a +0,2 · −0,1 · +0,2 · −0,4 · −0,5 f de su golpe. Las voces salen de `limites-voz.py` y de la envolvente (`herramientas/envolvente-voz.py`), no de whisper.

| Plano | Bloque · espacio | Función | Clip (`desde` en s de la fuente) | `en` | `dur` | Voz en la comp (primera → última palabra) | Entra | Zoom |
|---|---|---|---|---|---|---|---|---|
| c01-dron | 1 · la fachada desde el aire | situar | DR78 (7,80; movimiento uniforme, sin placas) | 0 | 109 | — | corte (frame 0 = miniatura) | 1,00→1,04 |
| c02-hook | 2 · jardín lateral | emocionar (la promesa) | HK02 (0,767) | 109 | 106 | f110 → f201 | disolver | 1,00→1,06 |
| c03-jardin | 3 · jardín con la palmera | revelar dónde se crece | RC27 (2,50) | 215 | 106 | — | disolver | 1,00 |
| c04-comedor | 3 · comedor | cómo se vive (la mesa de todos) | RC24 (0,30) | 321 | 100 | — | **corte sobre el golpe de f321,4** (12,6 dB) | 1,00 |
| c05-terraza | 3 · sala de la terraza con el valle | las montañas del hook; acaba el paseo social | RC18 (3,00) | 421 | 109 | — | **corte sobre f421,0** (10,8 dB) | 1,00 |
| c06-mitad | 4 · sendero de la fachada | valor: la abuela también | MD01 (1,300) | 530 | 75 | f531 → f591 | disolver (su golpe de f519,7 suena entero antes de la bajada) | 1,00→1,06 |
| c07-sillon | 5 · alcoba principal, rincón del ventanal | lo de la abuela: un sillón con vista | RC08 (0,60) | 605 | 95 | — | disolver | 1,00 |
| c08-cama | 5 · alcoba principal | el descanso | RC09 (0,50) | 700 | 92 | — | **corte sobre f700,3** (12,0 dB) | 1,00 |
| c09-lavamanos | 5 · baño | lo íntimo | RC14 (0,10) | 792 | 72 | — | **corte sobre f791,8** (10,9 dB) | 1,00 |
| c10-mirador | 5 · mirador con el telescopio, al atardecer | la vista (el plano más largo del bloque: 4,2 s) | RC23 (0,50) | 864 | 126 | — | **disolver, acabando en el golpe de f863,6** (12,6 dB): a corte saltaba −23 de luma (lavamanos cálido → parrilla negra a contraluz) | 1,00 |
| c11-cta | 6 · entrada, junto a los papiros | la acción | CT04 (0,833) | 990 | 84 | f991 → f1059 | disolver | 1,00→1,06 |
| c12-cierre | 6 · tarjeta oscura | cerrar (nada se congela) | negro liso (foto) | 1074 | 66 | — | corte | 1,00 |

El espacio, leído de arriba abajo: fachada → jardín → (Isabella) → jardín → comedor → terraza → (Isabella, sendero) → alcoba → alcoba → baño → mirador → (Isabella, entrada). Va del exterior a lo social, de lo social a lo íntimo y acaba en la vista; el CTA vuelve a la entrada, donde empieza una visita.

## Sonido

| Qué | Cómo |
|---|---|
| Voz | el WAV TRATADO de cada toma (`<toma>-voz.wav`: highpass 100 Hz → puerta suave → compresor 3,5:1 desde −30 dBFS → ganancia → limitador a −2,5 dBFS), **a −15,0 LUFS en su frase** (hook +22,4 dB, mitad +21,2, CTA +19,3; las crudas llegaban a −33,0 / −29,1 / −25,8 LUFS), con el pico real a −2,5 dBTP y el limitador quitando ≤ 1,2 dB. Fuera de su frase, silencio (compuerta de ventana: quita una respiración del hook y un soplido del CTA) |
| Música | *We Are* desde 95,218 s (`INICIO_MUSICA`): golpe de 13,9 dB en f1; a −15 LUFS sola (+0,8 dB en el dron, cuyo tramo de la canción mide −11,0 LUFS frente a −10,3/−10,4 de los recorridos); baja con curva de coseno y acaba de bajar en la primera sílaba de cada frase (f100 → f110, f521 → f531, f981 → f991) a ≈ −11 dB; sube en los 24 f siguientes a la última palabra; bajo el CTA la canción ya cayó sola a su lecho (−19,9 LUFS) y la cama queda a −27 LUFS, 12 LU bajo la voz; se apaga en 18 f desde la última palabra (f1059 → f1077), antes del siguiente golpe fuerte (f1088); la tarjeta, en silencio |

## Texto (frame en que entra cada línea)

| Bloque | Líneas |
|---|---|
| h01 | f110 «Tus hijos merecen» · f139 «crecer con» · f151 **«montañas,»** |
| h02 | f175 «no con tráfico.» |
| m01 | f531 «La abuela también puede» · f558 **«disfrutar»** · f567 «de esta casa.» |
| c01 | f991 «Solicita tu recorrido» · f1016 **«virtual o presencial.»** |

## Cierre

La imagen de Isabella funde a negro entre f1068 y f1073 (6 f, negro exacto en su último fotograma); la tarjeta (f1074-1140, 2,2 s) lleva el logo a 440 px y 60 % de opacidad y `PropiedadesLuxur.com`.

## Color medido (al final, plano a plano)

Primero la exposición de cada plano hacia una luma media común (≈ 118) y después la base del canal (`COLOR_BASE`). Sobre stills a 540×960 con el mismo backend (`angle`), `herramientas/medir-color.py`:

| | Sin graduar | Graduado |
|---|---|---|
| Dispersión de luma entre planos | σ 15,3 | **σ 7,5** |
| Saturación media | 0,283 | 0,347 |
| Quemado máximo (≥ 250) | 0,2 % | 0,8 % |
| Corte seco más grande | +24,5 (jardín → comedor) | **+15,2** (jardín → comedor); los otros tres: +6,7 · +13,5 · −0,4 |
| Disolvencia más grande | +38,0 (hook → jardín) | +21,8 (hook → jardín, mezclada en 12 f); terraza → mitad de −30,4 a −7,4; mirador ← lavamanos −12,2 |
| Piel de Isabella (tono) | 348,6° · 8,2° · 14,6° | 348,9° · 8,9° · 15,1° (< 0,8° de cambio; saturación ≤ 1,04 y temperatura 0,02 en sus tres tomas) |

El último fotograma de cada recorrido se miró: ninguno entra en algo oscuro (el jardín acaba en papiros a contraluz, el sillón en el ventanal, la cama en la cortina, el lavamanos en la pared). Lo aplastado del sillón (13,6 % ≤ 8) son los marcos negros del ventanal y el sillón gris oscuro: con negros 0 y sombras +0,2 conserva el detalle del tapizado.

## Sonido medido (sobre el WAV del render)

Música sola −15,4 (dron) · −15,2 · −15,1 LUFS (recorridos); voz con su cama −14,5 · −15,0 · −14,8 LUFS (hook, mitad, CTA); tarjeta en silencio (−70); pieza −15,2 LUFS, pico −4,0 dBTP.
