# 02 · Layout — proyecto 036 (V19, cinematográfica)

> Paso 2 de 3. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

## Cuadro y capas (de atrás a delante, director §3b)

1080×1920 · 30 fps. Todo en frames absolutos.

| z | Capa | Qué es | Dónde vive |
|---|---|---|---|
| 1 | `PistaMetraje` | los 10 planos de vídeo + la tarjeta, MUDOS, con su `color` (`colorCorrection()`) y la viñeta del look | `metraje-036.ts` |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de su toma (f1191) | `Recorrido036.tsx` + `cierre-036.ts` |
| 3 | `VeloSubtitulos` | degradado negro de abajo SOLO mientras hay subtítulos | `Recorrido036.tsx` |
| 4 | `SubtitulosEditoriales` | las tres frases, abajo, **al 90 %** (`OPACIDAD_SUBTITULOS`) y con la **cursiva 8 px menor** (`ACENTO_MENOS_036`: 99 → 91 px) | `subtitulos-036.ts` |
| 5 | `LogoCierre` y `WebCierre` | solo sobre la tarjeta (f1192-1257) | `cierre-036.ts` |
| 6 | `PistaAudio` | voz de las 3 tomas + música, en la raíz | `audio-036.ts` |

**Sin sello, sin `PistaGraficos`** (R14) y sin SFX.

## El encuadre 9:16 del material 16:9

Cada clip se recorta en `normalizar.mjs` con una ventana 9:16 que sale de `encuadre-036.json` (`herramientas/encuadre.py`); la salida es un vertical de 1296×2304. Antes de fiar una ventana se miró el fotograma COMPLETO de cada clip con varias ventanas de prueba dibujadas encima en el primer, el del medio y el último instante del tramo (`herramientas/ventanas-prueba.py`), mirando el borde: placas, teles encendidas, inodoros, destellos.

| Clip | Ventana | Qué hay en el borde y cómo se resuelve |
|---|---|---|
| Dron DR75 (apertura) | 0,495 → 0,545, en línea recta en el tramo | la casa en su cerro deriva a la derecha y la ventana la acompaña a velocidad constante; los coches del garaje miden pocos píxeles: sin placa legible |
| Hook HK11 (4K) | altura completa | **sigue a Isabella** (Vision: cara en 27 de 28 fotogramas; la cara pasa del 4,6 % al 12 % del alto mientras camina hacia la cámara); borde izquierdo 0,26 → 0,29 |
| Dron DR81 (órbita) | sigue la posición MEDIDA de la casa (0,22 → 0,83) | el dron gira a velocidad constante y la casa acelera en el cuadro al acercarse al borde; la ventana la sigue (plantilla + ajuste cúbico, error ≤ 0,004) y queda quieta (`flujo.py`: 0 ± 1 px). El coche blanco del garaje mide ≈ 75 px en 4K: su placa no se lee |
| RC17 sala | 0,35 | **la tele ENCENDIDA** de la pared está a ≥ 0,66 desde los 7,0 s: fuera; se ven el sofá, las palmas y el valle tras el vidrio |
| Mitad MD08 (1080p) | altura completa, 606×1080, ×2,13 | sigue a Isabella (cara en los 23 fotogramas medidos); el jacuzzi y el cielo del atardecer detrás |
| RC11 alcoba | 0,55 | las pampas, el marco de la puerta y la cama; nada en los bordes |
| RC05 lavamanos (4K) | 0,24 → 0,47 (acompaña) | el lavamanos martillado; la cámara se aleja y la ventana lo acompaña |
| Dron DR79 (llegada) | 0,48 | los volúmenes blanco y de piedra de la casa en contrapicado. **La terraza del garaje con la camioneta, el Mini y sus PLACAS legibles** está a ≥ 0,68 del ancho en todo el tramo: fuera (0,32-0,64) |
| Dron DR81 (vista) | ≈ 0,55 con un contragiro de ≤ 0,04 | el valle con la cordillera; la tierra roja sale por la derecha antes de los 8,8 s y el cerro entra por la izquierda después de los 14,2 s. La ventana compensa la aceleración del giro (velocidad aparente constante) |
| CTA CT07 (4K) | **cerrada al 85 % del alto** | sigue a Isabella (cara en los 35 fotogramas; al 85 % su cara pasa del 7 % al 8,2 % y el valle de detrás sigue entrando) |

El único 1080p (la mitad) sube ×2,13 al cuadro (`unsharp` suave) y su zoom no pasa de 1,04. Los drones van sin `zoom`: el movimiento es el del vuelo.

## Reparto del espacio

| Zona (px) | Qué |
|---|---|
| y < 240 | nada (arriba no hay texto en ningún frame; regla fija) |
| 240-1380 | la casa o Isabella |
| 1430-1640 | subtítulos editoriales (sobre las piernas de Isabella: el velo de abajo los sostiene) |
| 795-1085 | la tarjeta del cierre: logo (440 px, 60 %) y `PropiedadesLuxur.com` (54 px) |

## Texto

Tres frases y tres acentos (Playfair itálica, 8 px menor): «todo cambia.» (la promesa del hook), «vista ideal.» (la mitad) y «Agenda tu visita» (la acción del CTA; «respirar distinto.» va sin cursiva porque quedaba a 1,4 s del otro acento y el validador pide ≥ 2 s). Cada línea entra 0,2-1,6 f antes de su palabra, medida sobre la voz SOLA (`palabras-desde.py` + `onsets-voz.py`, tabla en `herramientas/lineas-vs-onsets.py`).

## Color (al final, plano a plano)

Base de cine (`COLOR_BASE` en `metraje-036.ts`): contraste 1,15 (el tope del canal), negros −0,08, sombras +0,05, luces −0,28, blancos −0,08, temperatura +0,05, saturación 1,06, vibrance 0,03. Encima, el ajuste de cada plano, medido con `stills-antes.mjs` + `stills-multiples.mjs … angle` + `medir-color.py` (28 fotogramas: la mitad de cada plano y los dos lados de cada empalme). En las tres tomas de Isabella: saturación 1,0, vibrance 0, temperatura ≤ 0,04 (la piel se mueve ≤ 1,2° de tono). Los cielos se recogen con luces y blancos, no con `vibrance` (≤ 0,05 en todos). El render lleva `--gl=angle`.
