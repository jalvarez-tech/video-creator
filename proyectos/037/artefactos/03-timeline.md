# 03 · Timeline — proyecto 037 (V20)

> Paso 3 de 3. Anterior: [02-layout.md](02-layout.md). De aquí salen `metraje-037.ts`, `audio-037.ts` y `subtitulos-037.ts`.

1004 f · 30 fps · 33,5 s. Las tres tomas de Isabella entran **A CORTE sobre un golpe** de *Familiar*, con `desde` 8 f antes de su primera sílaba: el golpe suena entero, la música baja en esos 8 f con curva y la primera palabra llega con la música ya abajo. El hook y la mitad se quedan 4-14 f tras su última palabra (2 de margen + 12 de disolvencia al recorrido siguiente). Los **cuatro cortes secos** (hook, alcoba, mitad y CTA) caen sobre golpes MEDIDOS de 9,1 a 14,5 dB (R33, `musica/golpes-037.json`; la puerta lo comprueba a ≤ 1 f y `golpes-render.py` lo confirma sobre el audio del render); las tres disolvencias (hook → llegada, mitad → vestier y vestier → valle) van donde acaba la voz o el plano y no piden golpe. Las voces salen de `limites-voz.py` y de los arranques de sílaba, no de whisper.

| Plano | Bloque · espacio | Función | Clip (`desde` en s de la fuente) | `en` | `dur` | Voz en la comp (primera → última palabra) | Entra | Zoom |
|---|---|---|---|---|---|---|---|---|
| c01-dron | 1 · la casa en su ladera, desde el aire | situar: la casa entera, a la vista | DR71 (3,00; mov 1,6, dispersión 0,082) | 0 | 117 | — | corte (frame 0 = miniatura) | **1,08→1,00** (hacia fuera: suma al alejamiento del dron) |
| c02-hook | 2 · frente al garaje | emocionar: abre el hilo (el error) | HK08 (0,567) | 117 | 106 | f125 → f204 | **corte sobre el golpe de f116,7** (11,0 dB) | 1,00→1,06 |
| c03-llegada | 3 · la sala, de la puerta de vidrio al ventanal | revelar: la casa hecha, ella llega | RC01 (0,40) | 223 | 129 | — | disolver | 1,00 |
| c04-pasillo | 3 · jardín → pasillo → alcoba principal | mover: del paseo social a lo íntimo | RC28 (0,733) | 352 | 77 | — | **corte sobre f351,9** (9,1 dB) | 1,00 |
| c05-mitad | 4 · alcoba principal | conexión: el error, con sus dos formas | MD10 (0,700) | 429 | 182 | f437 → f596 | **corte sobre f428,5** (9,4 dB) | 1,00→1,06 |
| c06-vestier | 5 · vestier y baño | cómo se vive: nada que remodelar | RC13 (0,40; hasta 2,5 s: antes del inodoro) | 611 | 64 | — | disolver | 1,00 |
| c07-vista | 5 · el valle y la carretera, desde el aire | la vista: lo que contesta a «lejos» (el plano más largo del bloque, 4,3 s) | DR82 (6,00; dispersión 0,069) | 675 | 130 | — | disolver (el vestier acaba en f675) | 1,00 |
| c08-cta | 6 · terraza del telescopio | la acción | CT08 (1,533) | 805 | 133 | f813 → f927 | **corte sobre f805,4** (14,5 dB) | 1,00→1,06 |
| c09-cierre | 6 · tarjeta oscura | cerrar (nada se congela) | negro liso (foto) | 938 | 66 | — | corte | 1,00 |

El espacio, leído de arriba abajo: la casa desde el aire → (Isabella, frente a la casa) → la sala → el pasillo y la alcoba → (Isabella, en esa alcoba) → el vestier y el baño → el valle y la carretera → (Isabella, en la terraza). Del exterior a lo social, de lo social a lo íntimo, y, al final, la vista; el CTA, fuera otra vez, con la misma vista detrás.

## Sonido

| Qué | Cómo |
|---|---|
| Voz | el WAV TRATADO de cada toma (`<toma>-voz.wav`: highpass 100 Hz → puerta suave → compresor 3,5:1 desde −30 dBFS → ganancia → limitador a −2,5 dBFS), **a −15,0 LUFS en su frase** (hook +19,7 dB, mitad +20,9, CTA +19,3; las crudas llegaban a −26,0 / −29,2 / −26,8 LUFS), pico real −2,5 dBTP, el limitador quita 1,4-2,5 dB. Fuera de su frase, silencio (compuerta de ventana: quita el soplido de MD10 antes de 0,9 s y la respiración de las demás) |
| Música | *Familiar* desde 142,096 s (`INICIO_MUSICA`): golpe de 10,2 dB en f1. **+4 dB fijos al decodificarla** (es una pista quieta: −21,5 / −20,5 / −24,0 LUFS en los tres tramos en que suena sola y el motor no deja más de +6 dB por tramo); sola a −15 LUFS en cada tramo (dron −17,5 → +2,5 dB; recorrido 1 −16,5 → +1,5; recorrido 2 −20,0 → +5,0). Baja con coseno en los 8 f que siguen al golpe de cada toma de Isabella y acaba de bajar en su primera sílaba (f117 → f125, f429 → f437, f805 → f813), a −11 dB; sube en los 24 f siguientes a la última palabra del hook y de la mitad. Bajo el CTA la canción empieza a caer sola (f805 + 3,6 s): la cama la deja a −26,5 LUFS en la primera palabra y sigue su caída; en los últimos 45 f de la frase baja a cero. Tras la última palabra, ningún golpe suena; la tarjeta, en silencio |

## Texto (frame en que entra cada línea)

| Bloque | Líneas |
|---|---|
| h01 | f125 **«El error»** · f137 «que cometen» · f147 «las familias» |
| h02 | f172 «al buscar campestre.» |
| m01 | f437 «Compran» · f448 **«lejos,»** · f464 «se cansan del viaje,» |
| m02 | f507 «compran viejo» · f531 «y tienen que pagar» |
| m03 | f553 **«dos veces»** · f569 «en remodelación.» |
| c01 | f813 «No cometas» · f829 **«el mismo error.»** |
| c02 | f862 «Haz clic en el enlace» · f892 «y ven a» · f908 **«conocerla.»** |

## Cierre

La imagen de Isabella funde a negro entre f931 y f937 (6 f, negro exacto en su último fotograma); la tarjeta (f938-1003, 2,2 s) lleva el logo a 440 px y 60 % y `PropiedadesLuxur.com`. Desde la última palabra (f927) hasta el final hay 77 f.

## Color medido (al final, plano a plano)

Stills a 1080×1920 con el mismo backend (`angle`), `herramientas/medir-color.py`:

| | Sin graduar | Graduado |
|---|---|---|
| Dispersión de luma entre planos | σ 21,7 | **σ 11,8** |
| Saturación media | 0,241 | 0,276 |
| Quemado máximo (≥ 250) | 7,7 % (RC01: los ventanales) | 1,0 % (MD10, la ventana) |
| Corte seco más grande | −50,3 (dron → hook) · −23,0 (valle → CTA) | **−21,3** (dron → hook, de una ladera a un garaje); llegada → pasillo +5,8 · pasillo → mitad +6,4 · valle → CTA +5,9 |
| Disolvencias | hook → llegada +63,5 · mitad → vestier −2,3 | +30,6 · −11,1 (vestier → valle: ver abajo) |
| Piel de Isabella (tono · saturación) | 6,2° · 0,35 / 24,3° · 0,58 / 7,8° · 0,43 | 6,1° · 0,35 / 24,0° · 0,64 / 7,2° · 0,47 (tono < 0,8°) |

Ajuste por plano (sobre `COLOR_BASE`): dron exposición −0,25, luces −0,35 y saturación 1,0 · hook exposición +0,4, sombras +0,7, negros 0, contraste 1,0 y luces −0,3 (la sombra del garaje, que estaba al 9,2 % aplastada) · llegada exposición −0,4, luces −0,5 y blancos −0,2 (los ventanales, que quemaban al 7,7 %) · pasillo temperatura −0,12 y saturación 0,97 (el interior más cálido de la pieza) · mitad luces −0,35 · vestier exposición −0,15, sombras +0,15 y temperatura −0,06 · vista exposición −0,35, luces −0,45 y blancos −0,2 · CTA exposición +0,3, sombras +0,25 y luces −0,3.

**Lo que no se pudo igualar:** el hook queda como el plano más oscuro (luma media 96 frente a 123-134 de los demás) porque su fondo es el interior sombrío de un garaje; Isabella, en cambio, queda a luma 124. Por eso la disolvencia hook → llegada salta +30 niveles (es una disolvencia de 12 f, no un corte) y el corte dron → hook, −21 (se probó levantar más el hook —sombras +0,9, contraste 0,92—: ganaba 3,6 niveles y dejaba el plano lavado, sin un solo píxel aplastado y con la saturación a 0,18; no se quedó). **La disolvencia vestier → valle** mezcla en su fotograma central (f669) la jamba de la puerta y el espejo con la carretera: dura 0,4 s y se ve como una revelación, no como una doble exposición limpia; se prefirió a un corte seco porque el vestier no puede durar más sin que asome el inodoro.

**Legibilidad del texto** (blanco sin sombra, velo de abajo con el centro a 0,42; `herramientas/legibilidad.py` a 1080×1920, siete bloques): contraste 3,7-4,4 : 1 al p90 del fondo y 2,5-3,1 : 1 al p99, dentro de lo aprobado en la V1 y la V2 (2,6-3,0 / 2,3-3,5). El punto más justo, «Haz clic en el enlace» sobre el cielo de la terraza (2,5 al p99).
