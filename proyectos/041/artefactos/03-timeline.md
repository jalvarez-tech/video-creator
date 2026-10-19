# 03 · Timeline — proyecto 041

> Paso 3 de 3. El frame exacto de cada cosa, con la transcripción real delante (`proyectos/041/voz/*.json`). De aquí salen `metraje-041.ts`, `audio-041.ts` y `subtitulos-041.ts`.

**fps de la comp:** 30 → `frame = round(segundo × 30)`. Todos los números son frames absolutos a ese fps. La canción: *Epic Inspirational and Cinematic Motivational*, desde el 47,100 s de la fuente (`INICIO_MUSICA` = 1413/30); un golpe medido en el que entra cada plano (`golpe(...)`, ver `musica/golpes-041.json`).

## Los planos (una tabla; la columna «espacio» leída de arriba abajo es el paseo)

| # | id | bloque | espacio | función | clip | `desde` (s) | `en` (f) | `dur` (f) | golpe (dB) | voz en la comp |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `c01-lote` | 1 | el lote entero desde arriba | situar / promesa | DR233 | 7,30 | 0 | 115 | 9,1 (f3) | — (sin voz ni texto) |
| 2 | `c02-hook` | 2 | la loma de césped | decir lo que se paga | HK07 | 0,133 (4 f) | 115 | 192 | 8,7 | 123,5-290,7 · −15,1 LUFS |
| 3 | `c03-cabana` | 3 | la cabaña entre las palmas | enseñar lo que hay dentro | DR96 | 15,60 | 307 | 56 | 9,1 | — |
| 4 | `c04-alta` | 3 | vista alta: eucaliptos, terrazas, cancha redonda | situar cada cosa | DR210 | 6,10 | 363 | 70 | 10,3 | — |
| 5 | `c05-terrazas` | 3 | las terrazas con la luz dorada | medir el terreno | DR201 | 2,00 | 433 | 86 | 8,8 | — |
| 6 | `c06-mitad` | 4 | el talud de tierra roja, el portón al fondo | nombrar los dos accesos | MD01 | 0,133 (4 f) | 519 | 168 | 9,0 | 527,3-670,1 · −15,1 LUFS |
| 7 | `c07-porton` | 5 | el portón de la vereda | enseñar un acceso | RC04 | 0,90 | 687 | 96 | 8,7 | — |
| 8 | `c08-via` | 5 | la vía vista desde arriba | enseñar el otro acceso | DR233 | 14,20 | 783 | 65 | 8,8 | — |
| 9 | `c09-vista` | 5 | el atardecer sobre el lote | recompensa (la vista) | DR201 | 18,40 | 848 | 138 | 9,7 | — |
| 10 | `c10-cta` | 6 | los cipreses y el valle | invitar | CT01 | 0,40 (12 f) | 986 | 120 | 8,7 | 994,25-1094 · −15,0 LUFS |
| 11 | `c11-cierre` | 6 | la tarjeta oscura | marca | negro liso | — | 1106 | 60 | — | — |

El paseo, leído: el lote desde arriba → (Isabella dice lo que cuesta) → la cabaña → el lote en su sitio (vista alta) → las terrazas → (Isabella nombra los dos accesos) → el portón → la vía → la vista → (Isabella invita). La vista, el plano más largo de su bloque (138 f), es la última imagen antes del CTA.

## Mapa maestro del sonido y el texto

| frames | s | narrativa | voz (frase real) | música | subtítulo |
|---|---|---|---|---|---|
| 0-115 | 0,0-3,8 | el lote | — | golpe de 9,1 dB en el f3, sola (−15 LUFS) | — |
| 115-307 | 3,8-10,2 | hook | «3.428 metros cuadrados por 800 millones. Vente, te muestro todo lo que estás comprando.» (f123,5-290,7) | baja con curva en f115-121 (acaba 2,3 f antes de la primera sílaba) y sube en 14 f al acabar | `h01` f122 «3.428 metros cuadrados», f177 «por 800 millones.» · `h02` f235 «Vente, te muestro», f251 «todo lo que», f270 «**estás comprando.**» |
| 307-519 | 10,2-17,3 | paseo | — | arriba (−15 LUFS) | — |
| 519-687 | 17,3-22,9 | mitad | «Dos accesos para un mismo lote, una por la parcelación y otra por la vía veredal.» (f527,3-670,1) | baja en f519-525 y sube en 15 f al acabar | `m01` f526 «**Dos accesos**», f556 «para un mismo lote,» · `m02` f592 «una por la parcelación,», f635 «y otra por», f647 «la vía veredal.» |
| 687-986 | 22,9-32,9 | recorrido | — | arriba (−15 LUFS) | — |
| 986-1106 | 32,9-36,9 | CTA | «Si quieres conocerlo, escríbeme lote y te envío toda la información.» (f994,25-1094) | baja en f986-992; al acabar la voz se apaga con curva hasta cero en f1164 | `c01` f993 «Si quieres conocerlo,», f1025 «**escríbeme lote**» · `c02` f1049 «y te envío», f1069 «toda la información.» |
| 1100-1105 | 36,7-36,8 | fundido a negro | — | apagándose | — |
| 1106-1166 | 36,9-38,9 | cierre | — | silencio | logo (f1108) y web (f1114): sin texto de subtítulo |

## Lo que sigue pendiente (se cierra con la prueba oída y el OK)

- Oír la canción (medida, no oída) y los cortes sobre sus golpes (`golpes-render.py` sobre el render).
- Las tres palabras dudosas (ver `01-plan.md`) con `formantes.py` y al oído.
- Que el usuario elija sobre la cifra: las dos escritas (lo que hay) o solo una.
