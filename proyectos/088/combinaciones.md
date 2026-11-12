# Combinaciones — proyecto 088 (V69)

## Versiones

| versión | proyecto | qué | estado |
|---|---|---|---|
| V69 | 088 | guion 04 (HK04 · MD04 · CT04) con «Six Figures in Airplane Mode» (electrónica instrumental a ≈ 122 BPM, pista 11 de «The life that God has for me»); versión NORMAL (subtítulos, sin ficha) | prueba 720p 2026-11-11, sin oír; **la final, la portada y la versión con ficha esperan el visto bueno** |

## Cómo cambiar cada pieza

- **Un plano:** en `proyectos/088/pieza.json` el `clip` y el `desde` del plano (y sus `min`/`max`); `node proyectos/088/herramientas/montar-retiro.mjs 088` rehace `metraje-088.ts` y `audio-088.ts` con cada corte en un golpe medido. Si el clip es nuevo, entra en `MATERIAL` de `normalizar.mjs` (con su sha) y se normaliza. Después `node proyectos/088/herramientas/armar-subtitulos.mjs 088` (los frames de los subtítulos dependen de dónde entra cada toma) y `node proyectos/088/revisar-088.mjs`.
- **La música:** `golpeEntrada` (el golpe de la canción que cae en el f3; `--entrada <t> --solo-plan` prueba otras sin escribir) y `musicaOriginal`; la pista se corta del WAV decodificado del mix (nunca con `-ss` sobre el MP3) y se mide con `medir-pista.py --json`.
- **Una frase de Isabella:** su `voz.s0/s1` (`limites-voz.py --margen 40`), el guion marcado `voz/<toma>.txt` y la ganancia de `normalizar.mjs` (`probar-voz.py --proyecto 088`).

## Música

pista 11 del mix «The life that God has for me» (3:37, Fa menor, brillante), cortada del archivo del mix en 2144,92-2362,80 s. MP3 del mix: `/Volumes/SSK SSD/Work/Propiedades Luxur/Casa - El Retiro - Senderos de Compostela/` (no se versiona). El corte usado está en `proyectos/088/original/musica-six-figures-in-airplane-mode.wav` (gitignored) y su reserva en `archivos/musica/registro-de-uso.md`. **sha256 del corte (WAV de 48 kHz estéreo):** `f8a8a7a2f0579e26d0d874edcf26ae605346a04fd48e5485e4634ff91e9030c4`.

## Metraje que comparte con las otras piezas de la casa

- Con 089 y 090 (las otras dos de esta tanda): se informa en la sección 7b de la puerta; los clips se repiten entre reels de estilos distintos y es una decisión declarada (cada reel es otra pieza que se publica por separado).

## Por confirmar

- **Al oído:** «empezaran» (HK04, f154 aprox. = 2,0 s del vídeo final): subjuntivo, lo correcto tras «Y si…»; whisper oyó «empezarán» en dos de tres pasadas y las sílabas no distinguen la tónica.
- El nombre de la versión con ficha (`Recorrido088Ficha`), la portada y el .srt se hacen tras el visto bueno de la normal.
- La música se eligió SIN OÍR (por tono medido): el oído decide; las alternativas libres están en la sección 11 del catálogo.
