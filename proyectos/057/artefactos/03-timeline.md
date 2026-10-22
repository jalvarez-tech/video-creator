# 03 · Timeline — proyecto 057

> Paso 3 de 3. Anterior: [02-layout.md](02-layout.md). De aquí salen `metraje-057.ts`, `audio-057.ts` y `subtitulos-057.ts` (y no al revés). 30 fps; `en` y `dur` en frames de la composición; `desde` en segundos del clip normalizado.

## Planos (la columna «espacio» leída de arriba abajo es un paseo sin volver atrás, y la vista, la última antes del CTA)

| # | Plano | Bloque | Espacio | Función | Clip | `desde` (s) | `en` | `dur` | Entra | Golpe (s de la canción · dB) |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | c01-conjunto | 1 | el edificio entre el verde | situar / prometer | DR03 | 4,00 | 0 | 72 | corte | 48,816 · 9,8 (suena en f3) |
| 2 | c02-hook | 2 | sala (de pie, junto a la tele) | emocionar (la promesa) | HK01 | 0,500 (15 f) | 72 | 140 | disolver (libre) | — |
| 3 | c03-pasillo | 3 | el pasillo hasta el rincón del gato | revelar (el umbral de la calma) | RC11 | 0,30 | 212 | 111 | corte | 55,772 · 17,4 |
| 4 | c04-sala | 3 | la sala: taza, sofá, ventanal | cómo se vive (el descanso a la vista) | RC12 | 3,40 | 323 | 137 | corte | 59,467 · 8,2 |
| 5 | c06-mitad | 4 | sala (sentada en el sofá) | emocionar (la pregunta) | MD06 | 0,400 (12 f) | 460 | 143 | disolver | 64,033 · 9,1 (por limpieza) |
| 6 | c07-alcoba | 5 | alcoba: la cama con la luz | cómo se vive (la intimidad) | RC04 | 0,50 | 603 | 98 | disolver | 68,817 · 7,2 (por limpieza) |
| 7 | c08-ventana | 5 | alcoba: la ventana con la montaña | llevar a otro espacio, hacia la vista | RC02 | 7,00 | 701 | 98 | disolver (libre) | — |
| 8 | c09-vista | 5 | La Ceja desde arriba | emocionar (el clímax, el plano más largo) | DR01 | 2,40 | 799 | 106 | corte | 75,333 · 8,0 |
| 9 | c10-cta | 6 | balcón | invitar | CT02 | 0,400 (12 f) | 905 | 115 | disolver (libre) | — |
| 10 | c11-cierre | 6 | — | tarjeta oscura (logo y web) | foto | — | 1020 | 60 | corte | — (la música ya está apagada: el acorde de 19,5 dB suena en f1020) |

Total: **1080 f = 36,0 s**. Planos mudos (el sonido va en `audio-057.ts`), salvo las tomas de Isabella (`audio` + `voz`).

## La voz (frames de la composición; s0/s1 medidos por energía, 20 ms, banda de voz)

| Toma | Su voz en el clip (s) | Primera palabra | Última palabra | Música: fin de la bajada (curva) | Música: sube |
|---|---|---|---|---|---|
| c02-hook (HK01) | 0,92 – 4,22 | f85 | f184 | f73 → f83 (10 f) | f184 → f206 (22 f; el acorde de 17,4 dB cae en el f212) |
| c06-mitad (MD06) | 0,72 – 4,22 | f470 | f575 | f460 → f468 (8 f; el golpe de 9,1 dB suena entero) | f575 → f597 (22 f; golpe del f603) |
| c10-cta (CT02) | 0,76 – 3,76 | f916 | f1006 | f904 → f914 (10 f) | no sube: la canción cae sola (desde el f924) y se apaga en línea recta hasta el f1018 |

## El texto (subtítulos editoriales; ver `subtitulos-057.ts`)

| Bloque | Frames | Texto | Acento |
|---|---|---|---|
| h01 | 85-154 | ¿Buscas un lugar / donde realmente se respire / **paz?** | paz? |
| h02 | 154-196 | Este apartamento / es eso. | — |
| m01 | 470-528 | ¿Cuándo fue la / última vez que / llegaste a casa | — |
| m02 | 528-584 | y sentiste que / de verdad / **descansaste?** | descansaste? |
| c01 | 916-969 | **Agenda tu visita** / y vive la experiencia | Agenda tu visita |
| c02 | 969-1008 | de la tranquilidad / en persona. | — |

POR CONFIRMAR AL OÍDO: «de verdad» (f545) y «vive» (f943).

## La música

«Silver Skies Cinematic Piano» desde los 48,767 s (`INICIO_MUSICA` = 1463/30): su golpe de 9,8 dB (48,816 s) abre la pieza en el f3. Sola a −15 LUFS por tramos (apertura +1,7 dB, paseo −0,9 dB, bloque 5 −1,2 dB sobre el archivo), ≈ −26 LUFS bajo la voz (−5,6 → −0,9 dB bajo el hook, −10,7 dB bajo la mitad, −9,7 → 0 dB bajo el CTA). **La canción cae desde los 79,5 s (f924), dentro de la toma del CTA**, y se apaga en el f1018, antes del acorde de 19,5 dB (82,727 s, f1020).
