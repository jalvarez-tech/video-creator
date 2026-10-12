# 03 · Timeline — proyecto 038 (V21)

> Paso 3 de 3. Anterior: [02-layout.md](02-layout.md). De aquí sale, casi copiado: `metraje-038.ts` · `audio-038.ts` · `subtitulos-038.ts`.
> Todos los números de este archivo son frames absolutos a **30 fps** (`frame = round(segundo × 30)`); la unidad de `desde` es el segundo de la FUENTE.

## El pulso de la canción y dónde caen los cortes

*I Feel It Coming* (sax) entra en 223,196 s (30 ms antes de su golpe de 223,226 s: el golpe cae en el **frame 1** y el frame 0 no lleva clic). Tiene un pulso de **0,645 s = 19,35 f** (93 BPM) con golpes de 9-25 dB (`proyectos/038/musica/golpes-038.json`, `medir-pista.py`), salvo dos o tres huecos de la recta (p. ej. en f233) donde el golpe no suena: los cortes se llevan a golpes MEDIDOS, no a la recta. **Los once cortes del reel son secos y caen sobre un golpe de ≥ 9 dB a ≤ 0,5 f** (la puerta lo comprueba y `golpes-render.py` lo confirma sobre el WAV del render).

| corte (frame) | golpe medido | dB | qué entra |
|---|---|---|---|
| 98 | 226,451 s | 12,2 | el hook (Isabella) |
| 272 | 232,266 s | 21,8 | el patio |
| 330 | 234,203 s | 10,3 | el comedor |
| 369 | 235,486 s | 11,0 | la terraza |
| 427 | 237,428 s | 24,4 | la palmera |
| 465 | 238,710 s | 13,7 | la mitad (Isabella) |
| 640 | 244,523 s | 9,0 | la cocina |
| 678 | 245,810 s | 11,2 | la alcoba con escritorio |
| 737 | 247,748 s | 18,3 | la alcoba blanca |
| 833 | 250,968 s | 14,9 | el valle |
| 930 | 254,197 s | 14,3 | el CTA (Isabella) |

El hook dura 9 pulsos (174 f: de 98 a 272) porque la toma solo trae 0,46 s de aire tras su última palabra (13,8 f): se corta a corte seco 3,7 f después de ella, que es lo máximo que cabe; la mitad dura 9 pulsos (175 f) y deja 28 f tras su última palabra. Los planos de recorrido duran 2-5 pulsos (38-97 f).

## Mapa maestro

| frames | s | narrativa | clip y tramo | entrada | voz | texto | música |
|---|---|---|---|---|---|---|---|
| 0–97 | 0,0–3,3 | dron | DR73 9,6-12,87 s (98 f, dispersión 0,030) | corte (frame 0 = miniatura) | — | — | entra en f1, arriba |
| 98–271 | 3,3–9,1 | hook | HK03 `IMG_9406`, desde 0,5 s | **corte en el golpe de f98** | «Domingo en familia: abuelos, tíos, primos. ¿Cuántas veces alguien queda incómodo?» f106-268 | h01 (f105) · h02 (f220; acento «incómodo?» f249) | baja en f98-106 (8 f, coseno) y sube en f268-289 (21 f) |
| 272–329 | 9,1–11,0 | recorrido | RC27 0,0-1,93 s | corte (golpe 21,8 dB) | — | — | arriba |
| 330–368 | 11,0–12,3 | recorrido | RC24 3,65-4,95 s | corte | — | — | arriba |
| 369–426 | 12,3–14,2 | recorrido | RC22 0,1-2,03 s | corte | — | — | arriba |
| 427–464 | 14,2–15,5 | recorrido | RC18 1,7-2,97 s | corte (golpe 24,4 dB) | — | — | arriba |
| 465–639 | 15,5–21,3 | mitad | MD05 `IMG_9445`, desde 0,4 s, 4K al 60 % | **corte en el golpe de f465** | «Hijos, abuelos, amigos que vienen de visita, todos pueden estar aquí con total comodidad.» f473-612 | m01 (f471) · m02 (f554; acento «total comodidad.» f585) | baja en f465-473 y sube en f612-636 (24 f) |
| 640–677 | 21,3–22,6 | recorrido | RC15 4,5-5,77 s | corte (golpe 9,0 dB: el más débil) | — | — | arriba |
| 678–736 | 22,6–24,6 | recorrido | RC12 3,9-5,87 s | corte | — | — | arriba |
| 737–832 | 24,6–27,7 | recorrido | RC10 4,4-7,6 s | corte | — | — | arriba |
| 833–929 | 27,8–31,0 | recorrido (la vista) | DR77 9,3-12,53 s (97 f, dispersión 0,088) | corte | — | — | arriba (el plano más largo del bloque) |
| 930–1046 | 31,0–34,9 | CTA | CT06 `IMG_9427`, desde 0,867 s | **corte en el golpe de f930** | «Recorridos privados disponibles, reserva el tuyo en el enlace.» f938-1035 | c01 (f937; acento «privados» f955) · c02 (f996; acento «enlace.» f1020) | baja en f930-938, se funde con la canción y se apaga en f990-1035 |
| 1047–1112 | 34,9–37,1 | cierre | tarjeta oscura (66 f) con el logo (440 px, 60 %) y `PropiedadesLuxur.com` | corte | — | — | silencio |

## Cómo cae la voz

| Toma | Entra (`en`) | `desde` | Primera sílaba | Última palabra | Corte siguiente | Margen |
|---|---|---|---|---|---|---|
| HK03 | f98 | 0,5 s | f106 (0,77 s) | f268 (6,18 s) | f272 (corte) | 3,7 f |
| MD05 | f465 | 0,4 s | f473 (0,67 s) | f612 (5,30 s) | f640 (corte) | 27,6 f |
| CT06 | f930 | 0,867 s | f938 (1,13 s) | f1035 (4,37 s) | f1047 (tarjeta) | 12 f |

Voz tratada (`normalizar.mjs`): −15,1 / −15,1 / −15,0 LUFS y picos reales de −2,5 / −2,5 / −3,0 dBTP en la ventana de cada frase (ganancia tras el compresor 3,5:1: +19,4 / +21,4 / +20,2 dB; el limitador quita 2,0 / 3,2 / 0,0 dB).

## Música: la envolvente

Arriba en el dron y en los dos recorridos (la música sola a −15 LUFS: ganancias de −5,1 / −4,1 / −4,1 dB sobre la canción sin normalizar, −9,9 / −10,9 / −10,9 LUFS); abajo (−11 dB) mientras habla Isabella; bajo el CTA, la cama sigue el fundido de la propia canción (−26,5 LUFS en la primera palabra, 11,5 LU bajo la voz) y una curva de coseno de 45 f la lleva a CERO en la última palabra (f1035): ningún golpe suena tras ella y la tarjeta queda en silencio.

## Puertas de control

- [x] `node proyectos/038/revisar-038.mjs` en verde (13 planos, 6 bloques de texto, 4 tramos de audio) y `npm --prefix remotion run lint` limpio
- [x] Frames clave revisados (R05): el 0, la mitad de cada plano, los dos lados de cada corte, el bloque de subtítulos con más líneas, la tarjeta
- [x] Prueba a 540×960 enseñada; el usuario pidió exportar («Renderiza en buena calidad», 2026-10-11) con las palabras dudosas sin oír (R06)
- [x] Final exportado 2026-10-11 (CRF 12 + CRF 16 + `.srt` + portada); POR CONFIRMAR AL OÍDO: «incómodo», «visita», «comodidad», «Recorridos», «disponibles» (medidas, no oídas; «Hijos» y «tuyo» medidas con resultado)
