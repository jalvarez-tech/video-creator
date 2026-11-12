# Combinaciones — proyecto 089 (V70)

## Versiones

| versión | proyecto | qué | estado |
|---|---|---|---|
| V70 | 089 | guion 01 (HK01 · MD01 · CT01) con «Pieza 2 (adagio)» (piano, adagio sin pulso (Sol menor)); versión NORMAL (subtítulos, sin ficha) | prueba 720p 2026-11-11, sin oír; **la final, la portada y la versión con ficha esperan el visto bueno** |

## Cómo cambiar cada pieza

- **Un plano:** en `proyectos/089/pieza.json` el `clip` y el `desde` del plano (y sus `min`/`max`); `node proyectos/088/herramientas/montar-retiro.mjs 089` rehace `metraje-089.ts` y `audio-089.ts` con cada corte en un golpe medido. Si el clip es nuevo, entra en `MATERIAL` de `normalizar.mjs` (con su sha) y se normaliza. Después `node proyectos/088/herramientas/armar-subtitulos.mjs 089` (los frames de los subtítulos dependen de dónde entra cada toma) y `node proyectos/089/revisar-089.mjs`.
- **La música:** `golpeEntrada` (el golpe de la canción que cae en el f3; `--entrada <t> --solo-plan` prueba otras sin escribir) y `musicaOriginal`; la pista se corta del WAV decodificado del mix (nunca con `-ss` sobre el MP3) y se mide con `medir-pista.py --json`.
- **Una frase de Isabella:** su `voz.s0/s1` (`limites-voz.py --margen 40`), el guion marcado `voz/<toma>.txt` y la ganancia de `normalizar.mjs` (`probar-voz.py --proyecto 089`).

## Música

Pieza 2 del mix «The Most Beautiful 12 Adagios in Rachmaninoff Style» (3:26), cortada de la COPIA 1 del archivo del mix en 199,10-405,79 s (206,69 s); sin pulso: los «golpes» son los ataques de las notas del piano medidos con `medir-pista.py`. MP3 del mix: `/Volumes/SSK SSD/Work/Propiedades Luxur/Casa - El Retiro - Senderos de Compostela/` (no se versiona). El corte usado está en `proyectos/089/original/musica-adagio-pieza-2.wav` (gitignored) y su reserva en `archivos/musica/registro-de-uso.md`. **sha256 del corte (WAV de 48 kHz estéreo):** `053b907ba1fdab635a009688df20994bcfc3b8756f71adeba7fcfe0711a48c1b`.

## Metraje que comparte con las otras piezas de la casa

- RC29 (c07-sala, 1,0-4,5 s) comparte 2,9 s con el c08-sala de la 088 (1,0-3,9 s): reels de estilos distintos de la misma casa; declarado (se informa en la sección 7b de la puerta).

## Por confirmar

- **Al oído:** «ayudara» (HK01, 2,1 s del vídeo final aprox.): subjuntivo, lo correcto tras «Y si…»; whisper oyó «ayudará» en las tres pasadas y las sílabas no distinguen la tónica.
- Los adagios terminan en decaimiento: aquí la música se apaga con curva bajo la tarjeta (no hay cola natural).
- La música se eligió SIN OÍR: el oído decide; alternativa del catálogo, entrar desde 0:00 (abre a −3 dB).
- La versión con ficha, la portada y el .srt se hacen tras el visto bueno de la normal.
