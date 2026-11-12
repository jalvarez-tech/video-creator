# Combinaciones — proyecto 090 (V71)

## Versiones

| versión | proyecto | qué | estado |
|---|---|---|---|
| V71 | 090 | guion 03 (HK03 · MD03 · CT03) con «Midnight Library» (jazz, balada lenta (≈ 63 BPM, Sol menor)); versión NORMAL (subtítulos, sin ficha) | prueba 720p 2026-11-11, sin oír; **la final, la portada y la versión con ficha esperan el visto bueno** |

## Cómo cambiar cada pieza

- **Un plano:** en `proyectos/090/pieza.json` el `clip` y el `desde` del plano (y sus `min`/`max`); `node proyectos/088/herramientas/montar-retiro.mjs 090` rehace `metraje-090.ts` y `audio-090.ts` con cada corte en un golpe medido. Si el clip es nuevo, entra en `MATERIAL` de `normalizar.mjs` (con su sha) y se normaliza. Después `node proyectos/088/herramientas/armar-subtitulos.mjs 090` (los frames de los subtítulos dependen de dónde entra cada toma) y `node proyectos/090/revisar-090.mjs`.
- **La música:** `golpeEntrada` (el golpe de la canción que cae en el f3; `--entrada <t> --solo-plan` prueba otras sin escribir) y `musicaOriginal`; la pista se corta del WAV decodificado del mix (nunca con `-ss` sobre el MP3) y se mide con `medir-pista.py --json`.
- **Una frase de Isabella:** su `voz.s0/s1` (`limites-voz.py --margen 40`), el guion marcado `voz/<toma>.txt` y la ganancia de `normalizar.mjs` (`probar-voz.py --proyecto 090`).

## Música

pista 1 «Midnight Library» (2:25) del mix «elegant jazz tones», cortada del archivo del mix en 0-145 s (los límites de las pistas del jazz son las marcas de su lista con ±5 s); las entradas a mitad de pista no dependen de eso. MP3 del mix: `/Volumes/SSK SSD/Work/Propiedades Luxur/Casa - El Retiro - Senderos de Compostela/` (no se versiona). El corte usado está en `proyectos/090/original/musica-midnight-library.wav` (gitignored) y su reserva en `archivos/musica/registro-de-uso.md`. **sha256 del corte (WAV de 48 kHz estéreo):** `f147457ffdc63675bc036260d5ad02f2c8bd0007bef60151de784a7ede34b387`.

## Metraje que comparte con las otras piezas de la casa

- RC38 (c08-jardin, 1,0-4,0 s) comparte 1,6 s con el c04-carrizos de la 089 (0,6-2,6 s): reels de estilos distintos de la misma casa; declarado (se informa en la sección 7b de la puerta).

## Por confirmar

- **Al oído:** «patio» (MD03, ≈ 14,5 s del vídeo final): whisper oyó «paseo» («un jacuzzi con un paseo abierto al cielo»); por la ficha es casi seguro «patio abierto al cielo» y el guion lo escribe así.
- MD03: la imagen no es el jacuzzi que nombra su voz (catálogo §4). Alternativa no hecha: cubrir la mitad con tomas del jacuzzi mientras sigue su voz (pide un tramo de voz propio, fuera del esquema `Corte` con `audio`).
- La música se eligió SIN OÍR (por tono medido): el oído decide; las alternativas libres están en la sección 11 del catálogo.
- La versión con ficha, la portada y el .srt se hacen tras el visto bueno de la normal.
