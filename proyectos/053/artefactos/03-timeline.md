# 03 · Timeline — proyecto 053 (V35 «¿Pagarías $14.800.000?», réplica de `03.mp4` sin voz en off)

> Paso 3 de 3. La línea de tiempo con lo medido. Anterior: [02-layout.md](02-layout.md). De aquí salen `metraje-053.ts`, `audio-053.ts` y `subtitulos-053.ts`, no al revés. **1376 f a 30 fps (45,87 s).** Sin locución (cambio de encargo del 2026-10-20): los tiempos los marcan los golpes de *Softly* (`musica/golpes-softly-*.json`, `medir-pista.py --json`).

## Los planos (`metraje-053.ts`)

`desde` = segundo de la fuente NORMALIZADA (anamórfica 81:256 escalada entera a 1296×2304, sin recorte). `en`/`dur` en frames de la composición. Todos los planos, salvo c01, entran con una **disolvencia de 12 f** (el plano empieza 12 f antes de su `en` y es opaco en él: `en` = el frame en que suena su golpe). El original (`03.mp4`) se identificó plano a plano (`medidas/busqueda-fotogramas.txt`).

| # | Plano | Bloque | Espacio | Función | Clip y tramo | `desde` (s) | `en` | `dur` | Golpe (s de la canción · dB) | Original (s) |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | c01-hook | 2 | Balcón (Isabella) | la promesa: la pregunta | HK05 `Img 9508` 4,3-7,9 s | 4,3 (129 f) | 0 | 108 | — (la canción en su calma) | 0,0-3,3 |
| 2 | c02-cielo | 5 | Balcón: cielo, torres, jacuzzi privado | mira lo que incluye · el jacuzzi | RC10 `Img 9509` 2,5-10,67 s | 2,5 | 108 | 245 | 50,93 · 12,2 | 3,3-12,0 (×1,4) |
| 3 | c03-cocina | 5 | Cocina → sala con la palma | lo amoblado | RC01 `Img 9461` 2,4-6,53 s | 2,4 | 353 | 124 | 59,08 · 6,9 | 12,0-19,0 (×1,45) |
| 4 | c04-bar | 5 | Bar | lo que trae la unidad | RC22 `Img 9538` 0,4-2,83 s | 0,4 (12 f) | 477 | 73 | 63,22 · 15,7 | 19,0-22,9 |
| 5 | c05-balcon | 5 | Balcón: camas, torres | lo que no esperabas | RC03 `Img 9464` 2,0-8,13 s | 2,0 | 550 | 184 | 65,67 · 9,5 | 22,9-33,0 |
| 6 | c06-alcoba | 5 | Alcoba principal | lo privado, lo que viene con el arriendo | RC05 `Img 9477` 0,4-6,87 s (el más parecido) | 0,4 | 734 | 194 | 71,77 · 6,7 | 33,0-41,7 |
| 7 | c07-sala | 5 | Sala (sofá gris, listones) | quien te atiende | RC04 `Img 9469` 0,5-4,67 s | 0,5 | 928 | 125 | 78,25 · 6,5 | 41,7-47,4 |
| 8 | c08-piscina | 5 | Carril de nado | la asesoría, la unidad | RC16 `Img 9525` 4,3-9,17 s | 4,3 | 1053 | 146 | 82,42 · 6,7 | 47,4-53,3 |
| 9 | c09-cta | 6 | Sala (silla) | la invitación | CT05 `Img 9501` 0,8-4,7 s | 0,8 (24 f) | 1199 | 117 | 87,30 · 10,5 | 53,3-56,4 |
| 10 | c10-cierre | 6 | Tarjeta oscura | la marca (logo y web) | `cierre-oscuro.png` | — | 1316 | 60 | — | — |

Paseo (de arriba abajo): **balcón (Isabella)** → cielo y jacuzzi → cocina → bar → balcón y torres → alcoba → sala → piscina → **sala (Isabella)**. Es el del original: no sigue el orden físico de la casa (`viaje-emocional.md` §2: el original abre por el balcón, vuelve a él y acaba en la piscina), y la réplica manda.

## Los rótulos (`subtitulos-053.ts`; el texto, tal cual el reparto §5c; la puerta lo comprueba)

Cada rótulo empieza (su primera línea) en el frame en que suena su golpe −1 f, y la línea del acento entra 7-10 f después. UNO a la vez; cada uno se lee de 3,0 a 4,8 s.

| Bloque | Frame (primera línea) | Golpe (s · dB) | Rótulo | Sobre |
|---|---|---|---|---|
| r00 | 6 | — | ¿Pagarías **$14.800.000** al mes por vivir aquí? | HK05 |
| r01 | 107 | 50,93 · 12,2 | Mira lo que **incluye**: | cielo y ciudad (RC10) |
| r02 | 235 | 55,18 · 10,2 | **Jacuzzi** privado con vista a Medellín | el jacuzzi (RC10, la tina entra en cuadro) |
| r03 | 352 | 59,08 · 6,9 | 113 m² **amoblados** y equipados | cocina y sala (RC01) |
| r04 | 476 | 63,22 · 15,7 | Piscina, gimnasio, spa y **coworking** | el bar (RC22) y las camas (RC03) |
| r05 | 617 | 67,91 · 6,6 | Y lo que no esperabas: | las torres (RC03) |
| r06 | 733 | 71,77 · 6,7 | **Aseo** semanal incluido | la alcoba (RC05) |
| r07 | 837 | 75,26 · 14,4 | **Acompañamiento** personalizado | la pared del televisor (RC05) |
| r08 | 927 | 78,25 · 6,5 | **Chef** privado y conductor a tu medida | la sala (RC04) |
| r09 | 1052 | 82,42 · 6,7 | Con la mejor **asesoría** de la ciudad | el carril de nado (RC16) |
| z01-z02 | 1214 / 1237 / 1285 | — (siguen a su voz) | Si buscas más que un apartamento para vivir, **escríbenos.** | CT05 (voz en directo, 1,31-4,07 s) |

## La voz (solo CT05; medida por energía, `limites-voz.py`/perfil de 20 ms; R29: whisper pone la primera palabra de una toma en 0,00 s)

| Toma | Voz (s de la fuente) | `desde` | Primera sílaba (frame de la comp) | Última palabra | Aire hasta el final | Ganancia (tras el compresor) |
|---|---|---|---|---|---|---|
| CT05 | 1,31 → 4,07 | 24 f | f1214 | f1297 | 79 f (la toma 19 f + la tarjeta 60 f) | +20,4 dB (cruda −28,6 LUFS → −15,0, pico −2,5 dBFS; el limitador quita 0,5 dB) |

## La música (*Softly*, `musica/`, medida con `medir-pista.py` y ebur128)

| Tramo de la canción | LUFS | Aquí |
|---|---|---|
| 47,4-50,3 s | −23,9 (calma) | el gancho (f0-108) |
| 50,1 s | −28 (respiro) | justo antes del cambio al cielo |
| 50,93 s | golpe de 12,2 dB (−16,5 LUFS a los 51,1 s) | f108: el cielo |
| 51,5-87,3 s | −14,4 (tramo fuerte, pico −0,4 dBFS) | el recorrido entero |
| 87,3 s | golpe de 10,5 dB | f1199: entra la toma del CTA |

Entra a los 47,367 s (frame 1421 de la canción). Ganancia: **`ALTO` −2,1 dB** (el pico real de la música sola queda en −2,5 dBFS, el techo; el tramo fuerte, a −16,5 LUFS), **baja con curva de coseno DESPUÉS del golpe del CTA** (empieza 4 f tras él, f1203) y acaba 4 f antes de la primera palabra (a −26 LUFS: 11 LU bajo la voz; con la sonoridad momentánea a 1 s, como mucho −25,7 LUFS en toda la voz), sube con 24 f de coseno tras la última palabra y se apaga con curva de coseno bajo la tarjeta, a cero 2 f antes del final.
