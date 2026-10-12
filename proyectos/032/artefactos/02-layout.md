# 02 · Layout — proyecto 032 (V16)

> Paso 2 de 3. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

## Cuadro y capas (de atrás a delante, director §3b)

1080×1920 · 30 fps. Todo en frames absolutos.

| z | Capa | Qué es | Dónde vive |
|---|---|---|---|
| 1 | `PistaMetraje` | los 11 planos de vídeo + la tarjeta, MUDOS, con su `color` (`colorCorrection()`) y la viñeta del look (0,2) | `metraje-032.ts` |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de su toma | `Recorrido032.tsx` + `cierre-032.ts` |
| 3 | `VeloSubtitulos` | degradado negro de abajo SOLO mientras hay subtítulos | `Recorrido032.tsx` |
| 4 | `SubtitulosEditoriales` | las tres frases, abajo; un acento por frase | `subtitulos-032.ts` |
| 5 | `LogoCierre` y `WebCierre` | solo sobre la tarjeta (f1074-1140) | `cierre-032.ts` |
| 6 | `PistaAudio` | voz de las 3 tomas + música, en la raíz | `audio-032.ts` |

**Sin sello, sin `PistaGraficos`** (R14: el texto editorial vive en la banda de abajo) y sin SFX (el canal no usa whooshes ni impactos).

## El encuadre 9:16 del material 16:9

Cada clip se recorta en `normalizar.mjs` con una ventana 9:16 que sale de `encuadre-032.json` (la calcula `herramientas/encuadre.py`); la salida es un vertical de 1296×2304 (1080 × 1,2, el techo del punch-in). Antes de fiarse del seguimiento se miró el fotograma COMPLETO de cada clip con siete ventanas de prueba (centros 0,20 … 0,80) en tres instantes.

| Clip | Ventana | Cómo se decide |
|---|---|---|
| Hook (HK02, 1080p) | altura completa, 606×1080 | **sigue a Isabella** (Vision de Apple, 5 f/s; aquí solo ve su cuerpo: es pequeña y la cabeza se toma al 10 % de su alto) con zona muerta ±12 %; **el borde izquierdo no baja de 0,46**: a la izquierda de ella el sol deja un destello vertical de lente (0,40-0,44) |
| Mitad (MD01, 4K) | **cerrada al 64 % del alto**: 776×1382, que sube ×1,67 al cuadro | ella sale de cuerpo entero al 40 % del alto del original; cerrada, la cara se ve. La ventana la sigue en horizontal y en vertical (su cara a ≈ 36 % del alto de la ventana) |
| CTA (CT04, 1080p) | altura completa | sigue a Isabella (cara en los 18 fotogramas medidos). El borde izquierdo va de 0,28 a 0,33: **el Mini azul y su placa (0-0,20) quedan fuera** |
| Dron y recorridos (4K) | altura completa, a mano (`MANUAL`) | DR78 0,62 (la fachada y la terraza) · RC27 0,53 (jardín y palmera) · RC24 0,50 (la mesa; la tele queda fuera a la izquierda) · RC18 0,60 (la sala de la terraza y el valle) · RC08 0,47 (el sillón y el ventanal) · RC09 0,52 (la cama) · RC14 0,66 (el lavamanos de cobre; a 0,62 entraba el inodoro) · RC23 0,45 (el telescopio y el valle) |

Los dos 1080p (hook y CTA) suben ×2,13 al cuadro (`unsharp` suave) y su zoom no pasa de 1,06; los 4K aguantan 1,10.

## Reparto del espacio

| Zona (px) | Qué |
|---|---|
| y < 240 | nada (arriba no hay texto en ningún frame; regla fija) |
| 240-1380 | la casa o Isabella. El texto va abajo y nunca le tapa la cara |
| 1430-1640 | subtítulos editoriales (borde superior al 74,5 % del alto; nunca por debajo de 1690) |
| 795-1085 | la tarjeta del cierre: logo (440 px, 60 % de opacidad) y `PropiedadesLuxur.com` (54 px) |

## Texto

Tres frases, un acento (Playfair itálica) por frase: «montañas» (el anhelo del hook), «abuela» (la que la frase incluye) y «virtual o presencial» (la acción fácil). Cada línea entra 0-3 f antes de su palabra, medida sobre la voz SOLA (`herramientas/lineas-vs-onsets.py`). El dron y los recorridos van sin texto.

## Color (al final, plano a plano)

Dos pasos y en este orden: **primero se iguala la exposición entre planos** (que ningún corte salte en luma; `medir-color.py` mide el salto en cada empalme) y **luego se embellece** con la base del canal (`COLOR_BASE`: contraste, negros hundidos, luces recogidas, un punto cálido, saturación). En las tres tomas de Isabella la piel no se mueve: saturación ≤ 1,06, temperatura ≤ 0,06 y el tono medido antes/después. Se mira también el ÚLTIMO fotograma de cada recorrido: que no entre en algo oscuro. El render lleva `--gl=angle`.
