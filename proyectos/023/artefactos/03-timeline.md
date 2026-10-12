# 03 · Timeline — proyecto 023

> Paso 3 de 3. Todo en frames absolutos de la composición, a 30 fps (1189 f = 39,63 s). Los planos son contiguos. Anterior: [02-layout.md](02-layout.md). La fuente de verdad es `remotion/src/proyectos/023/metraje-023.ts`. **Rev. 1** (prueba): pedido del usuario «empieza la canción 6 segundos después y el vídeo del hook empiézalo justo antes de que Isabella empiece a hablar» → el hook entra con `desde` 15 f (0,5 s); el golpe de entrada de la canción cae en el paseo (f166 = 5,5 s: el clip del hook no da para los 6 s exactos). **Rev. 2** («no lo dejes mudo al principio… corriendo el audio para que suene desde el principio»); **Rev. 3** («cambia de canción, esta es muy playera»: *Yeshua (Versión Piano)*, cortes recalculados, sin el plano de la sala): la música suena desde el f0, baja bajo la voz del hook y sube 24 f antes del golpe. La rev. 0 queda en `pruebas-720p/023-recorrido-rev0.mp4`.

## Los planos

Orden físico: la sala en el centro y una alcoba en cada extremo (la ficha). `desde` en la fuente; `entra`: corte o disolvencia (de 12 f, que acaba en un golpe de la canción).

| Plano | Bloque | Espacio · función | Clip · `desde` | `en` | `dur` | Entra | Golpe (dB) |
|---|---|---|---|---|---|---|---|
| c02-hook | 2 | Cocina → sala · el hook (Isabella), **abre la pieza** | HK3 · 0,50 s (f15) | 0 | 166 | corte | — (la música suena desde el f0, baja; su golpe cae en el f166) |
| c03-alcoba | 3 | Alcoba secundaria · el extremo | RC15 · 5,00 s | 166 | 103 | disolver | f166: 11,9 |
| c04-puertas | 3 | Puertas del baño y del vestier | RC11 · 8,30 s | 269 | 88 | corte | 13,6 |
| c05-vestier | 3 | Vestier · cómo se vive | RC15 · 14,30 s | 357 | 63 | disolver | 14,8 |
| c06-bano | 3 | Baño · lo privado | RC04 · 0,40 s | 420 | 103 | disolver | 21,0 |
| c07-mitad | 4 | Sala · la mitad (Isabella) | MD3 · 0,50 s (f15) | 523 | 165 | disolver | 16,8 |
| c08-principal | 5 | Alcoba principal · el otro extremo | RC08 · 4,20 s | 688 | 78 | disolver | 11,9 |
| c09-cocina | 5 | Cocina de isla | RC09 · 20,40 s | 766 | 62 | disolver | 25,3 |
| c11-balcon | 5 | Balcón y cielo, sin Isabella | RC14 · 13,67 s | 828 | 68 | disolver | 22,0 |
| c12-vista | 5 | Ventanal · la vista (la más larga) · **repite** el cierre de la V6 | RC12 · 7,97 s | 896 | 100 | disolver | 8,8 |
| c13-cta | 6 | Balcón · el CTA (Isabella) | CT2 · 0,40 s (f12) | 996 | 133 | disolver | 15,5 |
| c14-cierre | 6 | Tarjeta oscura (logo + web) | `cierre-oscuro.png` | 1129 | 60 | corte | — |

(No hay c10: la sala hacia el balcón se quitó al cambiar de canción.)

## La voz

**Rev. 4** (pedido: «necesito que la voz cuando habla Isabella tenga más decibeles sin saturar»): cada toma suena desde `<toma>-voz.wav`, tratada con la cadena de las V9 y V12 (`normalizar.mjs`, `VOZ_TRATADA`: graves 100 Hz · puerta suave · compresor 3:1 · **+15 dB** · limitador a −2,5 dBFS, sin desfase: 1-2 muestras). Excepción declarada a R29. El WAV crudo sigue ahí para medir.

| Toma | Voz (s de la fuente) | LUFS crudo → tratado | Ganancia restante (objetivo −15) | Primera palabra | Última palabra |
|---|---|---|---|---|---|
| HK3 | 0,72 → 5,19 | −22,0 → −15,3 | +0,3 dB | f6,6 (entra a corte con `desde` 15 f) | f141 |
| MD3 | 1,09 → 5,38 | −21,6 → −14,9 | −0,1 dB | f541 (17,7 f tras el golpe del f523) | f669 |
| CT2 | 0,95 → 4,26 | −19,7 → −14,9 | −0,1 dB | f1013 (16,5 f tras el golpe del f996) | f1112 |

En el render (ebur128 sobre la mezcla, en las tres ventanas de voz): −20,8 · −19,8 · −20,8 LUFS en la rev. 3 → **−15,0 · −15,0 · −14,8** en la rev. 4; pico de la mezcla −1,9 dBFS (sin saturar); la música, intacta (≈ 16 LU bajo la voz). El limitador recorta como mucho 2,3 dB de pico (CT2). Tras la última palabra la compresión sube el ruido del micro (−35 dB de media, 21 dB bajo la voz).

## La música («Yeshua (Versión Piano)», sha 8 `7bd0eb6f`)

Piano solo, sin pulso. **Suena desde el f0** (se usa desde 419,37 s, `INICIO_MUSICA` 12581/30; baja bajo el hook, 3 f de entrada) y su golpe de 424,837 s (11,9 dB) suena entero en el f166, donde empieza el paseo. Meseta de **−14,8 LUFS** sin crescendo hasta 452,5 s; **caída final** en 452,9 s (f1010, dentro de la toma del CTA, que va de f996 a f1129): −14,5 → −25,2 → −37,4 LUFS en tramos de 5 s (−10,7 y −22,9 a los 10 s; con `t` 452,6 s el primer tramo caía solo 8,5: se declara el instante de la caída), y silencio digital hacia los 460 s. Cada corte cae en un golpe medido (`musica/golpes-023.json`), comprobado sobre el audio del render (`golpes-render.py`, R33; el más débil, 8,1 dB). Envolvente: música sola a −15 LUFS y ≈ −16 dB más abajo mientras habla ella; en la mitad y el CTA la bajada de 7-10 f acaba antes de la primera palabra, y la subida de 24 f (16 f en la mitad, 14 en el CTA, que no tienen más sitio) empieza al callar. *La Isla Bonita* (rev. 0-2) se quitó: «es muy playera».

## El color (R32)

Cada plano de vídeo lleva `color: color({…})`: la base de Luxur (`COLOR_BASE`) más un ajuste, medido con `herramientas/medir-color.py` sobre stills a escala 0,5 con y sin graduar (`pruebas-720p/color-rev1.txt`, `panel-color.png`). Dos fuentes (Isabella y RC14 en HLG tone-mapeado; el resto, SDR). Ajustes: Isabella `saturation` 1,02 (≤ 1,06); las puertas (RC11) a 1,0; el vestier a 0,95 (el mínimo que admite la puerta: la madera mide 0,45-0,51 de saturación, frente a 0,2-0,3 del resto: **la madera de un vestier es así**); los dos planos de RC09 (cocina y sala, una toma partida) con `shadows` 0,14 y `blacks` −0,04 (el marco negro de la corredera aplasta el 8 % de la sala: sigue siendo el marco, no detalle); el CTA con `exposure` 0,10 y `shadows` 0,18 (Isabella a contraluz: luma de cara 83 → 87; sigue siendo la toma más oscura).

**Saltos de luma** entre el último fotograma de un plano y el primero del siguiente, a corte: hasta +26 (hook → alcoba), −14 (puertas → vestier), +15 (vestier → baño), −28 (baño → sala de Isabella), +14 (mitad → alcoba principal), +18 (alcoba principal → cocina), +42 (sala → balcón, en la rev. 0-2) y **−20 (balcón → vista)**. **Se arreglaron entrando con disolvencia** (`desde` ≥ 12 f, 8 planos), no graduando más; la de la vista usa un golpe de 8,8 dB y por eso esta pieza baja a 8,5 dB el mínimo de golpe de una disolvencia. Queda a corte un salto de +4,7 (alcoba → puertas).

**Piel de Isabella** (tono, sat): hook 28,7°, 0,31 · mitad 13,9°, 0,51 · CTA 356,5° (su cara en sombra, rojiza), 0,19. El tono no se movió con la graduación.

## Metraje compartido con la V6

**UN plano: la vista (RC12, c12-vista, 8,2-11,3 s), que cierra también la V6 (7,87-11,3 s): 3,1 s solapados.** Se repite a propósito: es el único plano de vista abierta que dura lo bastante para ser el más largo del bloque 5 (RC14 y RC01 solo tienen 2,7 s limpios) y la puerta (sección 7b) lo informa. RC15, además, se usa en otro tramo. Ningún otro clip de recorrido es de la V6.
