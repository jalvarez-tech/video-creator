# 03 · Timeline — proyecto 036 (V19, cinematográfica)

> Paso 3 de 3. Anterior: [02-layout.md](02-layout.md). Los números de aquí son los de `metraje-036.ts`, `audio-036.ts` y `subtitulos-036.ts`.

30 fps · 1258 f · 41,9 s. Cada corte cae en el fotograma de un golpe medido de *Begin Again* (`musica/golpes-036.json`): frame = (golpe − 64,739 s) × 30. La rejilla sale de `herramientas/buscar-cortes-lp.py` con la duración real de cada plano (los rangos de cada uno, en 01-plan).

## Planos (la columna «espacio» leída de arriba abajo es el paseo: el lugar → la casa → dentro → la terraza → lo íntimo → fuera → la vista)

| # | Espacio | Función | Clip (tramo de la fuente) | `en` | `dur` | Entra | Golpe del corte (s · dB) | Color (sobre la base) |
|---|---|---|---|---|---|---|---|---|
| c01 | la casa en su cerro | situar (frame 0, sin texto ni voz) | DR75 22,4-26,2 s · pasada lateral (disp. 0,022) | 0 | 114 | corte | 64,769 · 10,9 (f1, la entrada de la canción) | sombras +0,12 |
| c02 | sala abierta | hook: el dolor y la salida | HK11 0-5,53 s · Isabella camina hacia la cámara | 114 | 166 | corte | 68,543 · 9,9 | exp. +0,05, temp. 0,04, sat. 1,0, vib. 0 |
| c03 | la casa desde el aire | revelar («te muestro por qué») | DR81 17,3-20,77 s · órbita: la casa fija, el paisaje gira | 280 | 104 | corte | 74,090 · 9,2 (f280,5) | exp. +0,32, sombras +0,22, luces −0,6, blancos −0,3, sat. 1,0 |
| c04 | sala → terraza | mover hacia dentro y hacia el valle | RC17 6,9-9,9 s | 384 | 90 | corte | 77,552 · 9,9 | exp. −0,2, sombras +0,15 |
| c05 | terraza al atardecer | mitad: lo que cambia aquí | MD08 0,3-4,5 s | 474 | 126 | corte | 80,544 · 13,4 | exp. +0,15, luces −0,55, temp. 0,03, sat. 1,0, vib. 0 |
| c06 | alcoba | intimidad: el descanso | RC11 1,0-4,6 s (las pampas → la cama) | 600 | 108 | disolver | 84,744 · 8,4 (disolvencia) | exp. −0,1, sombras +0,12, temp. −0,01, sat. 0,95 |
| c07 | baño | lo que se toca | RC05 1,5-4,67 s | 708 | 95 | corte | 88,342 · **8,8 (medio, declarado)** | exp. −0,1, sat. 1,12 |
| c08 | fuera: la casa de cerca | volver a casa | DR79 14,8-18,37 s · contrapicado (disp. 0,039) | 803 | 108 | corte | 91,522 · 10,8 | sombras +0,08 |
| c09 | el valle | la vista: la recompensa y el clímax | DR81 8,8-14,17 s · giro con la velocidad compensada | 911 | 161 | disolver | 95,103 · 8,2 (disolvencia) | exp. +0,12, sombras +0,3, negros −0,04, luces −0,55, blancos −0,2 |
| c10 | sala abierta junto al vidrio | CTA: respirar distinto, una acción | CT07 0,43-4,43 s | 1072 | 120 | corte | 100,464 · 10,0 (el último antes de la caída) | exp. −0,22, temp. 0,03, sat. 1,0, vib. 0 |
| c11 | — | la tarjeta oscura: logo y web | negro liso | 1192 | 66 | corte | — (la música ya está apagada) | — |

Los segundos de los drones son de la FUENTE; en el plan van con `dji()` (× 1000/1001), porque `normalizar.mjs` los reproduce un 0,1 % más rápido para no repetir fotogramas.

## Voz

| Toma | Ventana en la fuente | En la composición | LUFS (tratada) | Pico real | Ganancia tras el compresor |
|---|---|---|---|---|---|
| HK11 | 0,43-5,44 s | f127-277 | −15,2 | −2,5 dBTP | +21,0 dB |
| MD08 | 0,72-3,83 s | f487-580 | −15,1 | −2,5 dBTP | +20,9 dB |
| CT07 | 0,765-4,31 s | f1082-1188 | −15,1 | −2,5 dBTP | +20,7 dB |

Cadena (`normalizar.mjs`, `VOZ_TRATADA`): highpass 100 Hz · puerta suave · compresor 3,5:1 desde −30 dBFS · ganancia (`probar-voz.py --umbral 0.0316 --razon 3.5`) · limitador −2,5 dBFS; silencio fuera de la ventana (en CT07 eso corta «Haz clic en el enlace y agendemos», que empieza en 4,44 s).

## Música

*Begin Again* desde 64,739 s (su golpe de 64,769 s cae en f1). Música sola a −15 LUFS por tramo: dron −15,9 → +0,9 dB · recorrido 1 −13,8 → −1,2 dB · recorrido 2 y vista −10,8 → −4,2 dB. Bajo la voz, −26 LUFS: cama del hook −11,8 dB (canción a −14,2 en su ventana), de la mitad −14,0 dB (−12,0) y del CTA −0,4 dB (la canción ya ha caído a −25,6). Bajada de coseno de 10 f que acaba en la primera palabra; subida de 24 f tras la mitad; tras el hook no caben (el clip acaba 5 f después de «por qué»): la música espera abajo y vuelve en UN fotograma, el del corte (f280), con el golpe (f280,5) dentro — con una rampa, `golpes-render.py` veía la rampa o el «qué» de la voz y no el golpe. Bajo el CTA la cama pasa de relativa a la de la canción caída en 14 f y se apaga en 45 f justo en la última palabra (f1188), antes del golpe de 13,9 dB de 105,596 s: la tarjeta, en silencio.

## Texto

| Bloque | Líneas (frame de entrada) | Acento | Sale |
|---|---|---|---|
| h01 | El ruido, (126) · el tráfico, (150) · el afán. (177) | — | 197 |
| h02 | Llegas a tu hogar (197) · donde (218) · todo cambia. (224) | «todo cambia.» | 253 |
| h03 | Ven, (253) · te muestro (260) · por qué. (268) | — | 280 |
| m01 | Jacuzzi, (486) · asado (505) · con tu familia (523) | — | 551 |
| m02 | y la (551) · vista ideal. (555) | «vista ideal.» | 587 |
| c01 | Tu familia merece (1081) · respirar distinto. (1111) | — | 1153 |
| c02 | Agenda tu visita (1153) · ahora. (1175) | «Agenda tu visita» | 1192 |

## Por confirmar al oído (antes de la final)

- «Ven, te muestro» — HK11 4,68-5,10 s · en el vídeo ≈ 8,5-8,9 s (whisper oye «Vente, muestro»).
- «asado» — MD08 1,36-1,86 s · en el vídeo ≈ 16,9-17,4 s (sin vocabulario whisper oye «has dado»; la /s/ está medida).
