# 02 · Layout — proyecto 038 (V21)

> Paso 2 de 3. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

## Cuadro y capas (de atrás a delante, director §3b)

1080×1920 · 30 fps. Todo en frames absolutos.

| z | Capa | Qué es | Dónde vive |
|---|---|---|---|
| 1 | `PistaMetraje` | los 12 planos de vídeo + la tarjeta, MUDOS, con su `color` (`colorCorrection()`) y la viñeta del look | `metraje-038.ts` |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de su toma (f1046) | `Recorrido038.tsx` + `cierre-038.ts` |
| 3 | `VeloSubtitulos` | degradado negro de abajo SOLO mientras hay subtítulos (borde 0,56 · centro 0,34, medido) | `Recorrido038.tsx` |
| 4 | `SubtitulosEditoriales` | las tres frases, abajo; un acento por frase | `subtitulos-038.ts` |
| 5 | `LogoCierre` y `WebCierre` | solo sobre la tarjeta (f1047-1112) | `cierre-038.ts` |
| 6 | `PistaAudio` | voz de las 3 tomas + música, en la raíz | `audio-038.ts` |

**Sin sello, sin `PistaGraficos`** (R14) y sin SFX.

## El encuadre 9:16 del material 16:9

Cada clip se recorta en `normalizar.mjs` con una ventana 9:16 que sale de `encuadre-038.json` (`herramientas/encuadre.py`); la salida es un vertical de 1296×2304. **Antes de fiarse del seguimiento se miró el fotograma COMPLETO** de cada clip con las ventanas candidatas dibujadas encima (`herramientas/ventanas-prueba.py` y `herramientas/hoja-clip.py`), y después el RECORTE real de cada tramo (`herramientas/ver-plano.py`); en cada uno se miró el borde: placas, teles encendidas, inodoros, destellos.

| Clip | Ventana | Qué hay en el borde y cómo se resuelve |
|---|---|---|
| Dron DR73 (4K) | a mano, centro 0,50 | la casa baja en su loma y el cielo; el edificio vecino y su coche (a ≤ 0,15) quedan fuera; los coches del garaje miden 20 px: ninguna placa legible |
| Hook HK03 (1080p) | altura completa, 606×1080; **sigue a Isabella** (Vision: cara en los 33 fotogramas) | borde izquierdo de 0,284 a 0,339; ella camina de 0,44 a 0,54. Nada raro en los bordes: el jardín de papiros y la casa |
| Recorrido RC27 patio (4K) | 0,45 | la casa tras la palmera y las flores; las hojas moradas asoman abajo a la derecha (grano, no un objeto) |
| RC24 comedor (4K) | 0,55 | **la tele ENCENDIDA** está a la izquierda (≈ 0,03-0,28 del ancho): fuera. A 4,6 s asoma una silla aguamarina por la esquina inferior izquierda (tela, inocua) |
| RC22 terraza (4K) | 0,45 | la tele del fondo (≈ 0,83) queda fuera; el jacuzzi y el valle al fondo |
| RC18 palmera (4K) | 0,45 | la palmera llena el cuadro y se aparta; solo se usa el final (de 1,7 s), que ya tiene luz |
| Mitad MD05 (4K) | **cerrada al 60 % del alto**: 728×1296, ×1,78; sigue a Isabella (cara o cuerpo en los 32 fotogramas) | **la tele ENCENDIDA** («Super Mario») está a ≥ 0,61 del ancho y se va a la derecha (0,74 a 5,2 s) mientras la cámara se desliza; el borde izquierdo no pasa de 0,46 (`AJUSTES`: el derecho no pasa de 0,65). Ella sale sentada, de 0,40 a 0,55 |
| RC15 cocina (4K) | 0,45 | el tramo de 4,5 a 5,77 s acaba antes de que un pilar de madera tape el cuadro (desde 5,88 s) |
| RC12 alcoba con escritorio (4K) | 0,50 → 0,60 desde 3,9 hasta 5,83 s | a 5,35 s asoman a la izquierda unos pósters enmarcados: con la ventana en 0,60 quedan fuera |
| RC10 alcoba blanca (4K) | 0,55 | la cortina de gasa y la cama blanca; hacia el final entra una pared y, abajo a la derecha, un sillón gris oscuro (pequeño); el tramo acaba en 7,6 s, antes de la puerta con la ventana verde (8,2 s) |
| Dron DR77 (4K) | a mano, centro 0,62 | a 9,1-9,8 s se ve el SUV blanco del camino a la izquierda de la ventana a 0,50; a 0,58 todavía asomaba por el borde izquierdo a 9,3-9,6 s, con 0,62 queda fuera |
| CTA CT06 (1080p) | altura completa; **sigue a Isabella** (cara en 26 fotogramas); borde izquierdo ≤ 0,45 (`AJUSTES`) | a la derecha, a ≥ 0,78 del ancho, asoma un coche con su placa: el borde derecho no pasa de ≈ 0,77 mientras ella camina de 0,46 a 0,57 |

Los dos 1080p (hook y CTA) suben ×2,13 al cuadro (`unsharp` suave) y su zoom no pasa de 1,06.

## Reparto del espacio

| Zona (px) | Qué |
|---|---|
| y < 240 | nada (arriba no hay texto en ningún frame; regla fija) |
| 240-1380 | la casa o Isabella |
| 1430-1640 | subtítulos editoriales (sobre las piernas de Isabella o la mesa: el velo de abajo los sostiene) |
| 795-1085 | la tarjeta del cierre: logo (440 px, 60 %) y `PropiedadesLuxur.com` (54 px) |

## Texto

Tres frases en seis bloques y cuatro acentos (Playfair itálica): «incómodo?» (lo que se quiere evitar), «total comodidad.» (la respuesta), «privados» y «enlace.» (lo exclusivo y la acción). Cada línea entra 0-3 f antes de su palabra, medida sobre la voz SOLA (`palabras-desde.py` + `onsets-voz.py`). Legibilidad medida con las líneas ya enteras (`herramientas/legibilidad.py`): p90 4,2-4,5 : 1 · p99 2,85-3,09 : 1, como las piezas aprobadas (017: 2,6-3,0 al p99).

## Color (al final, plano a plano)

Primero se iguala la exposición entre planos, con la mirada puesta en los empalmes; después la base del canal (`COLOR_BASE`: contraste con cuerpo, negros hundidos, luces recogidas, un punto cálido y +6 % de saturación). En las tres tomas de Isabella la piel no se mueve: saturación 1,0, vibrance 0, temperatura ≤ 0,02. Se mira el último fotograma de cada recorrido: ninguno entra en algo oscuro (el de la cocina lleva un armario gris en la esquina superior izquierda). El render lleva `--gl=angle`. Las cifras (luma de cada empalme, quemado, saturación) están en [`../combinaciones.md`](../combinaciones.md) §«Color».
