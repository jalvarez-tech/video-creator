# 02 · Layout — proyecto 037 (V20)

> Paso 2 de 3. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

## Cuadro y capas (de atrás a delante, director §3b)

1080×1920 · 30 fps. Todo en frames absolutos.

| z | Capa | Qué es | Dónde vive |
|---|---|---|---|
| 1 | `PistaMetraje` | los 8 planos de vídeo + la tarjeta, MUDOS, con su `color` (`colorCorrection()`) y la viñeta del look | `metraje-037.ts` |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de su toma (f937) | `Recorrido037.tsx` + `cierre-037.ts` |
| 3 | `VeloSubtitulos` | degradado negro de abajo SOLO mientras hay subtítulos | `Recorrido037.tsx` |
| 4 | `SubtitulosEditoriales` | las tres frases, abajo; un acento por frase | `subtitulos-037.ts` |
| 5 | `LogoCierre` y `WebCierre` | solo sobre la tarjeta (f938-1003) | `cierre-037.ts` |
| 6 | `PistaAudio` | voz de las 3 tomas + música, en la raíz | `audio-037.ts` |

**Sin sello, sin `PistaGraficos`** (R14) y sin SFX.

## El encuadre 9:16 del material 16:9

Cada clip se recorta en `normalizar.mjs` con una ventana 9:16 que sale de `encuadre-037.json` (`herramientas/encuadre.py`); la salida es un vertical de 1296×2304. **Antes de fiarse del seguimiento se miró el fotograma COMPLETO** de cada clip con ventanas de prueba dibujadas encima en tres o cuatro instantes del tramo (`herramientas/ventanas-prueba.py`), y en cada uno se miró el borde: placas, teles encendidas, inodoros, destellos de lente.

| Clip | Ventana | Qué hay en el borde y cómo se resuelve |
|---|---|---|
| Dron DR71 (4K) | a mano, centro 0,30 → borde izquierdo 0,14 | el ala izquierda de la casa y la ladera; **a x ≥ 0,50 entran la camioneta y el coche blanco con sus placas amarillas**: la ventana no pasa de 0,46 por la derecha. En el tramo usado (3,0-6,9 s) los coches están a ≥ 0,50 (la camioneta, de 0,52 a 0,57 hacia los 4,5 s) y la ventana acaba en 0,46 |
| Hook HK08 (4K) | **cerrada al 60 % del alto** (728×1296, ×1,78), sigue a Isabella (Vision: el cuerpo en los 22 fotogramas medidos) | **dos placas legibles pegadas a ella** («1GR-336» del Mini a ≈ 0,05 a su izquierda y «NGX-490» de la camioneta, que entra por el borde izquierdo): difuminadas con un recuadro que las sigue (`TAPAR`, 2 sitios). **Destello** del sol sobre el cristal del balcón: el borde superior baja de 0,335 a 0,372 entre 2,4 y 3,6 s (`arriba_min`) y lo deja fuera. La camioneta blanca y el SUV del fondo no llevan placa a la vista dentro de la ventana (`placas-amarillas.py`: 0 fotogramas con amarillo de placa) |
| RC01 (4K) | a mano, 0,47 | la puerta de vidrio a la izquierda (se aleja) y la sala con el valle; **la tele del muro (apagada, a x ≈ 0,88) queda fuera**. Isabella camina hacia la cámara y acaba ocupando el cuadro (última medio segundo) |
| RC28 (4K) | a mano, 0,42 → 0,58 (acompaña el giro) | del jardín con el ciprés (0,42) a la alcoba (0,58); a partir de 3,2 s hay una persona sentada a la izquierda (x ≈ 0,28-0,33): fuera de la ventana y, además, el tramo acaba en 3,3 s |
| MD10 (4K) | altura completa, sigue a Isabella (cara y cuerpo en los 34 fotogramas) | borde izquierdo 0,27 → 0,33; **la tele (apagada)** asoma por la izquierda y **el espejo de pie**, con su reflejo, entra por el borde izquierdo después de los 5,5 s: el espejo está a x ≤ 0,17 y la ventana no baja de 0,27 |
| RC13 (4K) | a mano, 0,55 (borde izquierdo 0,39) | el armario y el espejo redondo con el lavamanos; **a partir de ≈ 2,5 s asoma el inodoro** por el borde izquierdo (a 2,9 s ocupa x 0,30-0,435 y entra un 14 % en la ventana): el plano acaba en 2,5 s de su clip y disuelve al valle. Mover la ventana a 0,61 lo sacaba del todo pero dejaba el plano en el armario |
| DR82 (4K) | a mano, 0,62 (tramo 6,0-10,3 s) | la casa pequeña a la derecha, la carretera y el valle; sin placas legibles (los coches miden ≈ 12 px en el 4K) |
| CTA CT08 (4K) | altura completa, sigue a Isabella con el borde izquierdo en ≥ 0,33 (`izq_min`) | a su izquierda hay una pared de lamas negras y blancas (un patrón de alta frecuencia hasta x ≈ 0,38): con el borde en 0,33 solo asoma un 15 % de la ventana y ella queda en el tercio izquierdo con el valle a la derecha. Sin tele encendida ni placas |

Nada es un 1080p ampliado: las siete fuentes son 4K (la 1080p del CTA, `IMG_9419`, quedó descartada).

## Reparto del espacio

| Zona (px) | Qué |
|---|---|
| y < 240 | nada (arriba no hay texto en ningún frame; regla fija) |
| 240-1380 | la casa o Isabella |
| 1430-1640 | subtítulos editoriales (sobre las piernas de Isabella: el velo de abajo los sostiene) |
| 795-1085 | la tarjeta del cierre: logo (440 px, 60 %) y `PropiedadesLuxur.com` (54 px) |

## Texto

Tres frases y cinco acentos (Playfair itálica), uno por frase de las que llevan: «El error» (el hilo), «lejos,» y «dos veces» (las dos formas de pagar el error, a 3,5 s una de otra), «el mismo error.» (la orden) y «conocerla.» (la acción). Cada línea entra −0,5 a +2,1 f antes de su palabra, medida sobre la voz SOLA (`palabras-desde.py` + `onsets-voz.py`, `lineas-vs-onsets.py`: 0 líneas fuera de [−0,5, +3,0] f).

## Color (al final, plano a plano)

Primero se iguala la exposición entre planos, con la mirada puesta en los empalmes; después la base del canal (`COLOR_BASE`). En las tres tomas de Isabella la piel no se mueve (saturación 1,0, vibrance 0, temperatura ≤ 0,02). RC28 y RC13, interiores cálidos grabados con otro balance de blancos que MD10, se enfrían un poco. Se miran los empalmes y el último fotograma de cada recorrido. El render lleva `--gl=angle`.
