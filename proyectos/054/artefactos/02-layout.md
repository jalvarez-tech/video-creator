# 02 · Layout — proyecto 054 (V36)

> Paso 2 de 3. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

## Cuadro y capas (de atrás a delante, director §3b)

1080×1920 · 30 fps. Todo en frames absolutos.

| z | Capa | Qué es | Dónde vive |
|---|---|---|---|
| 1 | `PistaMetraje` | los 13 planos de vídeo + la tarjeta, MUDOS, con su `color` (`colorCorrection()`) y la viñeta del look | `metraje-054.ts` |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de su toma (f1092) | `Recorrido054.tsx` + `cierre-054.ts` |
| 3 | `VeloSubtitulos` | degradado negro de abajo SOLO mientras hay subtítulos (borde 0,62 · centro 0,34, el del canal) | `Recorrido054.tsx` |
| 4 | `SubtitulosEditoriales` | las tres frases, abajo; un acento por frase | `subtitulos-054.ts` |
| 5 | `LogoCierre` y `WebCierre` | solo sobre la tarjeta (f1093-1152) | `cierre-054.ts` |
| 6 | `PistaAudio` | voz de las 3 tomas + música, en la raíz | `audio-054.ts` |

**Sin sello, sin `PistaGraficos`** (R14) y sin SFX. `sinSubtitulos` apaga las capas 3 y 4 (base de la versión con ficha).

## El material: nada que recortar

Todo el material de Isabella y los 28 recorridos es **vertical nativo 1080×1920** (iPhone, SDR BT.709, sin rotación): `normalizar.mjs` solo lo lleva a 30 fps y a 1296×2304 (×1,2, el techo del punch-in). El dron es 4K vertical con `rotation=90`: se rota y se escala. **No hay encuadre que decidir** (a diferencia de la Casa Campestre de Guarne, que era 16:9): lo que hay que mirar es el contenido de cada borde.

| Clip | Qué hay en el borde y cómo se resuelve (mirado en los stills del plan y en la hoja de contactos de la prueba) |
|---|---|
| Dron DR01 (57,0-59,77 s) | la casa vista desde arriba: el tejado de teja, la fachada blanca con su pérgola de cristal, el seto y el césped; **al fondo, arriba, se ve una casa vecina del condominio con su pérgola y un patio de ladrillo con dos motos** (a ≤ 0,15 del alto; sin placas legibles) |
| Hook HK01 | la puerta de la casa y la pared blanca; a la izquierda el seto y la grava; sin placas ni pantallas encendidas |
| RC02 jardín, RC25 ventanal | bajo la pérgola de lamas: el césped, el seto, los árboles y el cielo; en RC25, por el ventanal abierto, la sala con el sillón naranja y la hamaca |
| RC01, RC03 sala | **el televisor está apagado** (reflejo negro); en RC01 la butaca gris y el comedor. Nada encendido |
| Mitad MD04 | **el televisor está apagado** detrás de ella (en su reflejo se adivina la sala); a la derecha el ventanal al jardín. Nada encendido |
| RC06 cocina | la isla con taburetes y el comedor; los electrodomésticos negros al fondo; sin placas |
| RC07 / RC13 | la puerta de madera, la cama, el ventanal al balcón y el jacuzzi tras el vidrio y el muro de piedra |
| RC22 sendero (0,0-2,6 s) | el muro blanco, la grava, el césped, el seto y los árboles; al fondo la terraza bajo la pérgola |
| RC24 vista | la fachada blanca, el árbol y las nubes sobre el césped |
| CTA CT06 | un perro pequeño camina con ella; ningún coche ni placa |

## Reparto del espacio

| Zona (px) | Qué |
|---|---|
| y < 240 | nada (arriba no hay texto en ningún frame; regla fija) |
| 240-1380 | la casa o Isabella |
| 1430-1640 | subtítulos editoriales (sobre el césped, el sofá o las baldosas: el velo de abajo los sostiene) |
| 795-1085 | la tarjeta del cierre: logo (440 px, 60 %) y `PropiedadesLuxur.com` (54 px) |

## Texto

Tres frases en ocho bloques y tres acentos (Playfair itálica): «vecinos encima.» (la idea del ángulo), «50 minutos» (la privacidad no está lejos) y «Escríbeme» (la acción). Cada línea entra 0-3 f antes de su palabra, medida sobre la voz SOLA (`palabras-desde.py` + `onsets-voz.py`). **Las dos cifras de la mitad van dentro de su frase** («50 minutos», «120.000»), no como un dato aparte. Legibilidad medida con las líneas ya enteras (`herramientas/legibilidad.py`): p90 2,8-6,5 : 1 · p99 2,1-4,1 : 1, dentro del rango de las piezas aprobadas (017: 2,6-3,0 al p99; 018: 2,3-3,5).

## Color (al final, plano a plano)

Primero se iguala la exposición entre planos, con la mirada puesta en los empalmes; después la base del canal (`COLOR_BASE`: contraste con cuerpo, negros hundidos, luces recogidas, un punto cálido y +6 % de saturación). En las tres tomas de Isabella la piel no se mueve: saturación 1,0, vibrance 0, temperatura ≤ 0,02. Los planos más oscuros (el jardín y el ventanal, bajo la pérgola de lamas negras) se levantan con exposición +0,2 y sombras +0,3 / +0,35. El render lleva `--gl=angle`. Las cifras (luma de cada empalme, quemado, saturación) están en [`../combinaciones.md`](../combinaciones.md) §«Color».
