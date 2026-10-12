# 03 · Timeline — proyecto 029 (rev. 1)

> Paso 3 de 3. Anterior: [02-layout.md](02-layout.md). De aquí salen `metraje-029.ts`, `audio-029.ts` y `subtitulos-029.ts`.

1137 f · 30 fps · 37,9 s. Cada toma de Isabella entra con su imagen opaca UN frame antes de su primera sílaba (`desde` = ese frame de la fuente, con ≥ 12 f de clip antes para la disolvencia) y se queda tras su última palabra lo que el clip aguanta (≥ 10 f; R29). Entre dos recorridos el corte es SECO y cae sobre un golpe fuerte de la canción (R33); el de la ventana a la alcoba principal disuelve porque a corte saltaba 34 niveles de luma (cortina blanca → colcha oscura). Las voces salen de `limites-voz.py` y de la envolvente de la voz (`herramientas/envolvente-voz.py`).

| Plano | Bloque · sitio | Función | Clip (`desde` en f de la fuente) | `en` | `dur` | Voz en la comp (primera → última palabra) | Entra | Zoom |
|---|---|---|---|---|---|---|---|---|
| c01-dron | 1 · la casa desde el aire, acercándose | situar | DR72 (274: sus últimos 3,3 s) | 0 | 100 | — | corte | 1,00→1,04 |
| c02-hook | 2 · jardín | emocionar | HK04 (35) | 100 | 82 | f101 → f168 | disolver | 1,00→1,06 |
| c03-sala | 3 · sala | revelar el espacio social | RC25 (15) | 182 | 100 | — | disolver | 1,00 |
| c04-comedor | 3 · comedor | dónde se reúne la familia | RC16 (15) | 282 | 99 | — | **corte sobre el golpe de f282** (10,6 dB) | 1,00 |
| c05-cocina | 3 · cocina | acaba el paseo por dentro | RC15 (15) | 381 | 97 | — | **corte sobre f381** (11,1 dB) | 1,00 |
| c06-mitad | 4 · terraza (sentada) | la pregunta | MD04 (16) | 478 | 118 | f479 → f576 | disolver | 1,00→1,06 |
| c07-terraza | 5 · terraza (jacuzzi) | seguir donde estaba ella | RC19 (15) | 596 | 68 | — | disolver | 1,00 |
| c08-bano | 5 · baño | lo íntimo | RC03 (15) | 664 | 83 | — | **corte sobre f664** (11,3 dB: ataque lento que arranca en f664,3 y sigue hasta f670) | 1,00 |
| c09-ventana | 5 · alcoba de invitados: ventana y cortina | del paisaje a la habitación | RC10 (15) | 747 | 70 | — | **corte sobre f747** (9,2 dB) | 1,00 |
| c10-alcoba | 5 · alcoba principal y ventanal | la vista (el plano más largo del bloque) | RC12 (15) | 817 | 99 | — | disolver (acaba en el golpe de f817, 12,4 dB) | 1,00 |
| c11-cta | 6 · alcoba (la misma) | cerrar con lo que vale y la acción | CT15 (19) | 916 | 155 | f917 → f1060 | disolver | 1,00→1,10 |
| c12-cierre | 6 · tarjeta oscura | cerrar (nada se congela) | negro liso (foto) | 1071 | 66 | — | corte | 1,00 |

## Sonido

| Qué | Cómo |
|---|---|
| Voz | el WAV TRATADO de cada toma (`<toma>-voz.wav`: highpass 100 Hz → puerta suave → compresor 3,5:1 desde −30 dBFS → ganancia → limitador a −2,5 dBFS), **a −15,0 LUFS en su frase**; las crudas llegaban a −29/−32 LUFS. Fuera de su frase, silencio (compuerta de ventana) |
| Música | *Pictures from the Past* desde 45,30 s (`INICIO_MUSICA`): golpe de 11,7 dB en f1; a −15 LUFS en el dron y, compensando el arco de la canción, +0,7 dB en el recorrido 1 y −1,5 dB en el 2 (la música sola medía −15,8 y −13,4 LUFS); baja con curva de coseno y acaba de bajar en la primera sílaba de cada frase (f91 → f101, f469 → f479, f907 → f917) a ≈ −11 dB; sube en los 24 f siguientes a la última palabra; bajo el CTA la canción cae de −12 a −22 dB (f900-f990) y se compensa a medias (+6 dB); se apaga en 18 f desde la última palabra (f1060), antes del siguiente golpe de la canción (f1082); la tarjeta, en silencio |

## Texto (frame en que entra cada línea)

| Bloque | Líneas |
|---|---|
| h01 | f101 «La casa que» · f114 «tu familia va a» · f140 **«recordar siempre.»** |
| m01 | f479 «Pregúntate algo.» |
| m02 | f511 «¿Qué recuerdos» · f527 **«de infancia»** · f544 «les estamos dando?» |
| c01 | f917 «Esta no es solo» · f936 «una casa,» · f959 **«es patrimonio.»** (⚠ «solo»: por confirmar al oído) |
| c02 | f987 «Haz clic en el enlace» · f1029 «y agendemos» · f1041 **«tu visita.»** |

## Cierre

La imagen de Isabella funde a negro entre f1064 y f1070 (6 f, negro exacto en su último fotograma); la tarjeta (f1071-1137, 2,2 s) lleva el logo a 440 px y 60 % de opacidad y `PropiedadesLuxur.com`.
