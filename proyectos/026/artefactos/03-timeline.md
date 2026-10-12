# 03 · Timeline — proyecto 026

> Paso 3 de 3. Todo en frames absolutos de la composición, a 30 fps (1234 f = 41,13 s). Los planos son contiguos. Anterior: [02-layout.md](02-layout.md). La fuente de verdad es `remotion/src/proyectos/026/metraje-026.ts`. **Rev. 0** (primera prueba): los planos y la rejilla de cortes salen de `herramientas/buscar-cortes.py` sobre los golpes medidos de *desolate (Slowed)* (1.139 soluciones con estos rangos de plano; se eligió la de golpes más fuertes y primer golpe más contundente: 86,626 s, 14,3 dB); el color por plano y las entradas (corte o disolvencia) se fijaron al medir los saltos de luma (`herramientas/saltos-luma.py`).

## Los planos

Orden físico, **sentido I**: la entrada, la cocina, la sala y el balcón (zona social, en el centro de la planta) y, al fondo, una alcoba con su baño y su vestier y, al otro extremo, la alcoba del CTA. `desde` en la fuente; `entra`: corte o disolvencia (de 12 f, que acaba en un golpe de la canción). Golpe: dB en la fuente · dB medidos en el render (R33, `golpes-render.py`).

| Plano | Bloque | Espacio · función | Clip · `desde` | `en` | `dur` | Entra | Golpe (fuente · render) | Salto de luma a corte |
|---|---|---|---|---|---|---|---|---|
| c02-hook | 2 | Entrada · el hook (Isabella), **abre la pieza** | RC14 · 48 f (1,60 s) | 0 | 168 | corte | — (la música suena desde el f0, baja; su golpe cae en el f168) | — |
| c03-cocina | 3 | Cocina · la isla y la estufa | RC05 · 12 f (0,40 s) | 168 | 108 | disolver | 14,3 · 14,5 | +15,6 |
| c04-cocina-atras | 3 | Cocina · desde el otro lado | RC09 · 1470 f (49,0 s) | 276 | 107 | **corte** | 10,8 · 10,7 | +4,5 |
| c05-corredera | 3 | Sala · hacia la corredera | RC05 · 227 f (7,57 s) | 383 | 78 | disolver | 14,4 · 14,3 | −10,7 |
| c06-balcon | 3 | Balcón · el destino del paseo | RC01 · 138 f (4,6 s) | 461 | 72 | **corte** | 10,0 · 9,7 | −1,4 |
| c07-mitad | 4 | Balcón · la mitad (Isabella) | MD2 · 12 f (0,40 s) | 533 | 141 | disolver | 15,1 · 15,3 | −13,6 |
| c08-puertas | 5 | Puertas del baño y del vestier | RC11 · 363 f (12,1 s) | 674 | 74 | disolver | 10,1 · 8,2 | +20,1 |
| c09-bano | 5 | Baño · cómo se vive | RC04 · 15 f (0,5 s) | 748 | 86 | disolver | 13,6 · 13,8 | +7,9 |
| c10-alcoba | 5 | Alcoba · el descanso | RC13 · 12 f (0,4 s) | 834 | 75 | disolver | 13,2 · 13,1 | −19,3 |
| c11-vista | 5 | Ventanal · la vista (la más larga) | RC12 · 12 f (0,4 s) | 909 | 114 | **corte** | 15,9 · 15,8 | −5,4 |
| c12-cta | 6 | Alcoba · el CTA (Isabella) | RC14 · 1344 f (44,8 s) | 1023 | 151 | disolver | 9,5 · 9,3 | +1,2 |
| c13-cierre | 6 | Tarjeta oscura (logo + web) | `cierre-oscuro.png` | 1174 | 60 | corte | — | — |

Los saltos de luma son los de la columna, medidos SIN graduar sobre los fotogramas extremos del empalme; los cinco que pasan de ±8 entran disolviendo (el baño, +7,9, también: queda en el límite). Los tres cortes secos caen en golpes de 10,0-15,9 dB (mínimo R33: 7,4).

## La voz

**Rev. 1 (2026-10-08): suena la voz TRATADA a −15 LUFS** (ver `combinaciones.md`); la tabla da las ganancias de la rev. 0 (−21 LUFS, WAV crudo); en la rev. 1, `lufs` de cada toma es el del WAV tratado (−15,1 · −14,6 · −14,4) y la ganancia, de ±0,6 dB.

| Toma | Voz (s de la fuente) | LUFS (crudo) | Ganancia a −21 (rev. 0) | Primera palabra | Última palabra |
|---|---|---|---|---|---|
| HK5 (RC14, hook) | 1,82 → 6,31 | −22,3 | +1,3 dB | f6,5 (entra a corte con `desde` 48 f) | f141,3 |
| MD2 | 0,65 → 4,34 | −24,61 | +3,6 dB | f540,5 (7,5 f tras el golpe del f533) | f651,2 |
| CT4 (RC14, CTA) | 45,22 → 49,35 | −22,7 | +1,7 dB | f1035,5 (el soplo; la primera sílaba, f1050) | f1159,5 |

(Entre las dos tomas de RC14 hay 38 s de ambiente a −50 dB; whisper no oye nada ahí.)

## La música («ByErik – desolate (Slowed)», sha 8 `74195082`)

Lo-fi «slowed + reverb», sin pulso. **Suena desde el f0** (se usa desde 81,07 s, `INICIO_MUSICA` 2432/30; baja bajo el hook, 3 f de entrada) y su golpe de 86,626 s (14,3 dB) suena entero en el f168, donde empieza el paseo. Meseta de **−10,8 LUFS** (−9,8 / −10,8 / −13,1 en las ventanas de voz del hook, la mitad y el CTA) hasta 117 s; **caída** desde 118,0 s (f1110, dentro de la toma del CTA, que va de f1023 a f1174): −11,6 → −20,8 → −31,8 LUFS en tramos de 5 s; sus últimas notas siguen hasta los 126 s y se cortan en el f1188, 2 f antes de la nota fuerte de 120,691 s. Cada corte cae en un golpe medido (`musica/golpes-026.json`), comprobado sobre el audio del render (`golpes-render.py`, R33). Envolvente: música sola a −15 LUFS y −16,5 dB más abajo mientras habla ella (≥ 9,5 LU bajo su voz); en la mitad y el CTA la bajada acaba antes de la primera palabra, y la subida empieza al callar.

Mezcla medida en la prueba: pieza entera −16,1 LUFS · ventana del hook −21,0 · mitad −20,2 · CTA −21,2 · paseo −14,6 · bloque 5 −15,4 · pico real −1,0 dBFS.

## El color (R32)

La base de Luxur y, encima, el ajuste de cada toma (`herramientas/medir-color.py`, `pruebas-720p/color-rev0.txt`, panel `pruebas-720p/panel-color.png`):

| Plano | Ajuste sobre la base | Luma (antes → después) | Nota |
|---|---|---|---|
| c02-hook | `saturation` 1,02 | 137 → 139 | piel: tono 18,0° → 17,8°, saturación 0,50 → 0,54 |
| c03-cocina | — | 141 → 143 | |
| c04-cocina-atras | `shadows` 0,14 · `blacks` −0,04 | 156 → 158 | |
| c05-corredera | `highlights` −0,3 · `whites` −0,1 | 136 → 134 | el cielo del balcón quemaba el 7,6 % del cuadro: ahora 0 % |
| c06-balcon | `saturation` 1,0 · `shadows` 0,16 · `blacks` −0,02 | 111 → 112 | |
| c07-mitad | `saturation` 0,98 | 115 → 115 | piel 0,38 → 0,39 |
| c08-puertas | `saturation` 0,95 | 127 → 127 | la madera mide 0,40 de saturación sin graduar |
| c09-bano | — | 151 → 153 | |
| c10-alcoba | — | 129 → 130 | |
| c11-vista | `shadows` 0,2 · `blacks` −0,02 | 128 → 129 | |
| c12-cta | `saturation` 1,02 · `exposure` 0,08 · `shadows` 0,18 | 109 → 112 | ella a contraluz; piel: 18,5° → 18,4°, 0,50 → 0,54 |

Entre planos: luma media 131,0 → 131,9 (σ 14,6 → 15,0) · saturación 0,232 → 0,266 (σ 0,074 → 0,073) · quemado máx 7,6 % → 3,9 % · aplastado máx 4,0 % → 5,9 % (el balcón: la baranda negra). Legibilidad del texto (R25): contraste 3,2-4,3 : 1 al p90 y 2,4-3,5 al p99 (017: 2,9-3,7 / 2,6-3,0; 018: 2,8-4,1 / 2,3-3,5).

## Lo que comparte con la V6, la V7 y la V8 (la puerta, 7b)

| Plano | Comparte | Con |
|---|---|---|
| c07-mitad | el clip MD2 y su voz (4,5 s) | la V8 (declarado: no queda ninguna mitad libre) |
| c09-bano | RC04 0,5-3,4 s (2,9 s) | la V7 (RC04 0,4-3,8 s; el registro la daba «sin usar») |
| c06-balcon | RC01 4,6-7,0 s (1,0 s) | la V8 (RC01 6,0-8,4 s) |
| c05-corredera | RC05 7,6-10,2 s (0,4 s) | la V6 (RC05 4,5-7,9 s) |
| el resto | ni un fotograma | — |
