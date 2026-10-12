# 02 · Layout — proyecto 033 (V17)

> Paso 2 de 3. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

## Cuadro y capas (de atrás a delante, director §3b)

1080×1920 · 30 fps. Todo en frames absolutos.

| z | Capa | Qué es | Dónde vive |
|---|---|---|---|
| 1 | `PistaMetraje` | los 11 planos de vídeo + la tarjeta, MUDOS, con su `color` (`colorCorrection()`) y la viñeta del look | `metraje-033.ts` |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de su toma (f1122) | `Recorrido033.tsx` + `cierre-033.ts` |
| 3 | `VeloSubtitulos` | degradado negro de abajo SOLO mientras hay subtítulos | `Recorrido033.tsx` |
| 4 | `SubtitulosEditoriales` | las tres frases, abajo; un acento por frase | `subtitulos-033.ts` |
| 5 | `LogoCierre` y `WebCierre` | solo sobre la tarjeta (f1123-1189) | `cierre-033.ts` |
| 6 | `PistaAudio` | voz de las 3 tomas + música, en la raíz | `audio-033.ts` |

**Sin sello, sin `PistaGraficos`** (R14) y sin SFX.

## El encuadre 9:16 del material 16:9

Cada clip se recorta en `normalizar.mjs` con una ventana 9:16 que sale de `encuadre-033.json` (`herramientas/encuadre.py`); la salida es un vertical de 1296×2304. **Antes de fiarse del seguimiento se miró el fotograma COMPLETO** de cada clip con cinco ventanas de prueba dibujadas encima en el primer, el del medio y el último instante del tramo (`herramientas/ventanas-prueba.py`, nuevo en esta pieza), y en cada uno se miró el borde: placas, teles encendidas, inodoros, destellos.

| Clip | Ventana | Qué hay en el borde y cómo se resuelve |
|---|---|---|
| Hook (CT21, 1080p) | altura completa, 606×1080 | **sigue a Isabella** (Vision: cara en los 17 fotogramas medidos); el borde izquierdo va de 0,27 a 0,32. Fuera queda un panel solar del vecino (abajo a la derecha, ≈ 0,78) |
| Mitad (MD06, 4K) | **cerrada al 60 % del alto**: 728×1296, ×1,78 | ella sale sentada y pequeña; Vision la ve en 38 de 40 fotogramas (cara o cuerpo). **La tele ENCENDIDA del fondo** está a ≥ 0,66 del ancho y se va a la derecha: con el borde izquierdo ≤ 0,46 (`AJUSTES`) el derecho no pasa de 0,65 |
| CTA (CT18, 1080p) | altura completa | sigue a Isabella (cara en los 49 fotogramas); camina hacia la cámara y algo a la izquierda (borde 0,39 → 0,36 en el tramo usado) |
| Dron DR76 (4K) | a mano, centro 0,42 | la casa entera y el arranque del camino; los dos coches blancos aparcados frente a la casa miden pocos píxeles: ninguna placa legible |
| RC26 sendero | 0,52 | el sendero y la casa al fondo |
| RC20 jacuzzi | 0,45 | **la tele encendida** («Sonic 3») está a ≥ 0,87: fuera |
| RC22 sala terraza | 0,45 | la tele del fondo (≈ 0,83) queda fuera |
| RC07 alcoba | 0,50 | la tele de la pared, APAGADA, asoma por la izquierda al principio |
| RC06 claraboya | 0,52 | el cielo por la claraboya y el vestier |
| RC04 bañera | 0,38 → 0,52 (acompaña) | la bañera; el inodoro de este baño no sale en el clip |
| RC21 valle | 0,45 | el valle; el tejado azul de un vecino entra por abajo a la izquierda solo después de los 4,5 s (el tramo usado acaba en 3,9 s) |

Los dos 1080p (hook y CTA) suben ×2,13 al cuadro (`unsharp` suave) y su zoom no pasa de 1,06.

## Reparto del espacio

| Zona (px) | Qué |
|---|---|
| y < 240 | nada (arriba no hay texto en ningún frame; regla fija) |
| 240-1380 | la casa o Isabella |
| 1430-1640 | subtítulos editoriales (sobre las piernas de Isabella: el velo de abajo los sostiene) |
| 795-1085 | la tarjeta del cierre: logo (440 px, 60 %) y `PropiedadesLuxur.com` (54 px) |

## Texto

Tres frases y cuatro acentos (Playfair itálica), uno por frase: «dónde llegar?» (el anhelo), «extrañas» (lo que pesa), «dirección.» y «agendemos su visita.» (las dos frases del CTA). Cada línea entra 0-3 f antes de su palabra, medida sobre la voz SOLA (`palabras-desde.py` + `onsets-voz.py`).

## Color (al final, plano a plano)

Primero se iguala la exposición entre planos, con la mirada puesta en los empalmes; después la base del canal (`COLOR_BASE`). En las tres tomas de Isabella la piel no se mueve: saturación 1,0, vibrance 0, temperatura ≤ 0,02 (la piel la sube solo el contraste base: +0,04 de saturación HSV, tono < 0,8°). Se mira el último fotograma de cada recorrido: ninguno entra en algo oscuro. El render lleva `--gl=angle`.
