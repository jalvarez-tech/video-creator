# 03 · Timeline — proyecto 033 (V17)

> Paso 3 de 3. Anterior: [02-layout.md](02-layout.md). De aquí salen `metraje-033.ts`, `audio-033.ts` y `subtitulos-033.ts`.

1189 f · 30 fps · 39,6 s. Las tres tomas de Isabella entran **A CORTE sobre un golpe** de *Utopia*, con `desde` 8 f antes de su primera sílaba: el golpe suena entero, la música baja en esos 8 f con curva y la primera palabra llega con la música ya abajo. El hook y la mitad se quedan 14 f tras su última palabra (2 de margen + 12 de disolvencia al recorrido). Entre dos recorridos el corte es SECO sobre un golpe ≥ 9 dB (R33, `musica/golpes-033.json`), salvo alcoba → claraboya, que corta sobre un golpe MEDIO (8,2 dB, el único entre f602 y f746; declarado en la puerta): a disolver, en la primera prueba, el cuadrado azul de la claraboya se montaba sobre la cama como una doble exposición. Las voces salen de `limites-voz.py` y de los arranques de sílaba, no de whisper.

| Plano | Bloque · espacio | Función | Clip (`desde` en s de la fuente) | `en` | `dur` | Voz en la comp (primera → última palabra) | Entra | Zoom |
|---|---|---|---|---|---|---|---|---|
| c01-dron | 1 · la casa en su cerro, desde el aire | situar: a dónde se llega | DR76 (10,90; movimiento uniforme, dispersión 0,013) | 0 | 67 | — | corte (frame 0 = miniatura) | 1,00→1,04 |
| c02-hook | 2 · mirador | emocionar: la pregunta que selecciona | CT21 (0,133) | 67 | 82 | f76 → f135 | **corte sobre el golpe de f66,8** (11,5 dB) | 1,00→1,06 |
| c03-sendero | 3 · sendero del jardín | la llegada a pie (umbral) | RC26 (0,50) | 149 | 121 | — | disolver | 1,00 |
| c04-jacuzzi | 3 · terraza del jacuzzi | lo que no se tiene fuera | RC20 (0,05) | 270 | 67 | — | **corte sobre f270,1** (13,2 dB) | 1,00 |
| c05-sala-terraza | 3 · sala de la terraza con el valle | acaba el paseo social donde se sienta ella | RC22 (2,40) | 337 | 85 | — | **corte sobre f336,7** (9,2 dB) | 1,00 |
| c06-mitad | 4 · sala de la terraza | conexión: la vida de fuera y lo que se extraña | MD06 (0,600) | 422 | 193 | f430 → f601 | **corte sobre f422,2** (9,1 dB) | 1,00→1,06 |
| c07-alcoba | 5 · alcoba principal | el descanso propio | RC07 (1,00) | 615 | 73 | — | disolver | 1,00 |
| c08-claraboya | 5 · claraboya y vestier | la luz de casa, lo íntimo | RC06 (0,50) | 688 | 58 | — | **corte sobre el golpe MEDIO de f688,2** (8,2 dB; declarado) | 1,00 |
| c09-banera | 5 · baño | lo más íntimo | RC04 (0,30) | 746 | 102 | — | **corte sobre f746,0** (9,1 dB) | 1,00 |
| c10-valle | 5 · el valle desde la terraza | la vista: lo que se extrañaba (el plano más largo del bloque, 3,6 s) | RC21 (0,30) | 848 | 107 | — | **corte sobre f847,9** (9,1 dB) | 1,00 |
| c11-cta | 6 · jardín al atardecer | la acción | CT18 (0,233; se corta en la pausa de 5,65-5,84 s) | 955 | 168 | f963 → f1117 | **corte sobre f955,3** (10,5 dB) | 1,00→1,06 |
| c12-cierre | 6 · tarjeta oscura | cerrar (nada se congela) | negro liso (foto) | 1123 | 66 | — | corte | 1,00 |

El espacio, leído de arriba abajo: la casa desde el aire → (Isabella, mirador) → sendero → terraza del jacuzzi → sala de la terraza → (Isabella, en esa sala) → alcoba → claraboya / vestier → baño → el valle → (Isabella, jardín). Del exterior a lo social, de lo social a lo íntimo y, al final, la vista; el CTA, fuera, al caer la tarde.

## Sonido

| Qué | Cómo |
|---|---|
| Voz | el WAV TRATADO de cada toma (`<toma>-voz.wav`: highpass 100 Hz → puerta suave → compresor 3,5:1 desde −30 dBFS → ganancia → limitador a −2,5 dBFS), **a −15,0 LUFS en su frase** (hook +20,7 dB, mitad +19,2, CTA +20,5; las crudas llegaban a −30,1 / −24,3 / −29,0 LUFS), pico real −2,5 dBTP, el limitador quita ≤ 1,0 dB. Fuera de su frase, silencio (compuerta de ventana: quita el golpe y la respiración de MD06 antes de 0,79 s y «Puede ser…» de CT18) |
| Música | *Utopia* desde 141,778 s (`INICIO_MUSICA`): golpe de 9,8 dB en f1. Sola a −15 LUFS en cada tramo (dron −12,1 → +2,9 dB; recorrido 1 −10,3 → +4,7; recorrido 2 −8,2 → +6,8 dB de bajada respecto a la canción). Baja con coseno en los 8 f que siguen al golpe de cada toma de Isabella y acaba de bajar en su primera sílaba (f67 → f75, f422 → f430, f955 → f963), a −11 dB; sube en los 24 f siguientes a la última palabra del hook y de la mitad. Bajo el CTA la canción ya cae sola: la cama la deja a −26,5 LUFS en la primera palabra y sigue su caída; en los últimos 45 f de la frase baja a cero (no se oye: la canción ya está a −31/−34 LUFS). Tras la última palabra, ningún golpe suena; la tarjeta, en silencio |

## Texto (frame en que entra cada línea)

| Bloque | Líneas |
|---|---|
| h01 | f76 «Colombia te llama,» · f105 «¿ya tienes» · f116 **«dónde llegar?»** |
| m01 | f430 «Llevas años» · f442 «en el exterior,» |
| m02 | f479 «trabajaste duro» · f501 «y ahorraste,» |
| m03 | f538 «pero todos los diciembres» · f562 **«extrañas»** · f583 «lo mismo.» |
| c01 | f963 «Volver no es una idea,» · f1010 «es una» · f1019 **«dirección.»** |
| c02 | f1044 «Haz clic» · f1052 «en el enlace y» · f1084 **«agendemos su visita.»** |

## Cierre

La imagen de Isabella funde a negro entre f1117 y f1122 (6 f, negro exacto en su último fotograma); la tarjeta (f1123-1189, 2,2 s) lleva el logo a 440 px y 60 % y `PropiedadesLuxur.com`.

## Color medido (al final, plano a plano)

Stills a 540×960 con el mismo backend (`angle`), `herramientas/medir-color.py`:

| | Sin graduar | Graduado |
|---|---|---|
| Dispersión de luma entre planos | σ 10,4 | **σ 4,9** |
| Saturación media | 0,248 | 0,296 |
| Quemado máximo (≥ 250) | 3,7 % (jacuzzi, cielo) | 2,4 % (mitad, cielo tras el vidrio); la claraboya, que la base quemaba al 7,1 %, a 0 con contraste 1,08 y luces −0,55 |
| Corte seco más grande | −29,9 (dron → hook) · −26,8 (sala → mitad) | **−9,8** (sala → mitad); dron → hook −3,3 · sendero → jacuzzi −5,4 · jacuzzi → sala −2,3 · alcoba → claraboya +3,1 · claraboya → bañera +1,1 · bañera → valle −7,1 · valle → CTA +1,2 |
| Disolvencias | mitad → alcoba +31,7 · hook → sendero −5,2 | +6,1 · −8,8 |
| Piel de Isabella (tono · saturación) | 9,0° · 0,39 / 10,7° · 0,41 / 5,7° · 0,50 | 8,2° · 0,43 / 10,4° · 0,45 / 4,9° · 0,55 (tono < 0,8°; saturación +0,04 por el contraste base) |

Ajuste por plano (sobre `COLOR_BASE`): dron exposición −0,2 con sombras +0,12 · hook +0,25 · sendero +0,2 · jacuzzi −0,15 y luces −0,35 · sala −0,1 · mitad +0,35 con sombras +0,1 y luces −0,3 · alcoba −0,3 · claraboya contraste 1,08, luces −0,55 y blancos −0,2 · bañera −0,2 · valle, la base · CTA luces −0,35 y temperatura 0.

**El último fotograma de cada recorrido** (luma media del fotograma): sendero 119,5 (las pampas) · jacuzzi 135,5 · sala de la terraza 139,5 (el valle) · alcoba 117,9 · claraboya 112,9 (el vestier: ropa oscura, el 10 % ≤ 20, pero el plano no acaba en negro) · bañera 121,1 · valle 126,3. Ninguno entra en algo oscuro.

**Legibilidad del texto** (blanco sin sombra, velo de abajo con el centro a 0,42; `herramientas/legibilidad.py` a 1080×1920): contraste 3,4-4,9 : 1 al p90 del fondo y 2,6-3,3 : 1 al p99, igual o mejor que la V1 aprobada (2,9-3,7 / 2,6-3,0). El punto más justo, «¿ya tienes» sobre el pantalón blanco del hook (2,8 al p99); con el velo de la V16 (centro a 0,36) bajaba a 2,3-2,5 en la mitad.
