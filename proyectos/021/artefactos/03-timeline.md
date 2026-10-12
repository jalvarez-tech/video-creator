# 03 · Timeline — proyecto 021

> Paso 3 de 3. Anterior: [02-layout.md](02-layout.md). Los números salen de `remotion/src/proyectos/021/` y `node proyectos/021/revisar-021.mjs` los comprueba.
> 30 fps · 1289 f (42,97 s) · una sola música (*Amélie*, piano, entrada en 134,967 s) de principio a fin.
> **Revisión 2: el reel empieza con el hook** (el plano `c01-deck` de la rev. 1 se quitó y los ids no se renumeraron). Es la única pieza del canal que abre con Isabella hablando: excepción declarada en la puerta (`ABRE_CON_EL_HOOK`).

## Los diez planos

La columna **espacio** leída de arriba abajo es el paseo (sentido II: terraza → ventanal, primero fuera y luego dentro, sin un solo retroceso). **Golpe** = el golpe MEDIDO de la canción en que entra el plano (segundo de la canción · fuerza en dB por 15 ms · frame en que SUENA, con el retardo del render).

| # | `id` | Bloque | Espacio | Función | Clip · tramo (s) | `en` | `dur` | Entra | Golpe | Encuadre |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `c02-hook` | 2 | terraza | emocionar (la promesa) | HK06 · 0,00–5,53 (voz 0,59–5,01) | 0 | 166 | corte (frame 0) | 135,009 s · 25,5 dB · f2,9 (apertura de la canción) | 1,00 → 1,04 |
| 2 | `c03-piscina` | 3 | piscina y columna | llevar (el exterior) | RC11 · 2,70–6,97 | 166 | 128 | disolver (f154–166) | — (la disolvencia no lo pide) | quieto |
| 3 | `c04-dron` | 3 | el edificio desde el aire | revelar (la mirada de afuera) | DR154 · 2,00–7,23 | 294 | 157 | corte | 144,702 s · 7,7 dB · f293,7 | quieto |
| 4 | `c05-baranda` | 3 | barandilla y skyline | llevar (al borde) | RC10 · 8,40–11,83 | 451 | 103 | corte | 149,960 s · 8,3 dB · f451,4 | quieto |
| 5 | `c06-mitad` | 4 | barandilla | emocionar (la tesis) | MD01 · 1,17–7,70 (voz 1,25–7,15) | 554 | 196 | disolver (f542–554) | 153,394 s · 11,0 dB · f554,4 | 1,00 → 1,04 |
| 6 | `c07-corredera` | 5 | la corredera hacia dentro | llevar a otro espacio | RC11 · 9,67–13,23 | 750 | 107 | disolver (f738–750) | — (la disolvencia no lo pide) | quieto |
| 7 | `c08-alcoba` | 5 | alcoba | cómo se vive (el lienzo) | RC12 · 0,40–4,53 | 857 | 124 | disolver (f845–857) | 163,493 s · 9,0 dB · f857,4 | quieto |
| 8 | `c09-vista` | 5 | alcoba → ventanal | señalar valor (la vista) | RC12 · 4,53–10,57 | 981 | 181 | corte | 167,600 s · 12,7 dB · f980,6 | quieto |
| 9 | `c10-cta` | 6 | balcón | invitar | CT02 · 5,73–7,97 (voz 5,82–7,49) | 1162 | 67 | disolver (f1150–1162) | 173,630 s · 9,5 dB · f1161,5 | 1,00 → 1,03 |
| 10 | `c11-cierre` | 6 | tarjeta oscura | cierre (el logo y la web) | negro liso | 1229 | 60 | corte | — (nada que cortar: el decaimiento del piano empieza en f1203) | quieto |

- **Los cortes secos** (3: f294 · f451 · f981) caen en golpes de 7,7-12,7 dB **medidos sobre el audio del render** (`golpes-render.py`, R33): a −0,3 · +0,4 · −0,4 f. El de f294 (piscina → dron, 7,3 dB en el render) es el más flojo de la pieza. Los tres finales de disolvencia con golpe (f554 · f857 · f1162) también suenan donde se prevé (+0,4 · +0,3 · −0,5 f) y el de apertura en f1,8 (subida desde el silencio, −0,9 f).
- **La vista, el plano más largo de su bloque:** la segunda mitad de la alcoba (181 f) frente a la primera (124 f) y la corredera (107 f).
- **Una toma partida:** RC12 en dos planos (`c08` y `c09`, en el golpe del f981) con el MISMO `color`: el salto de luma entre ellos es de +1,3 niveles.
- **Metraje compartido con las versiones anteriores:** ninguno (9b de la puerta).

## La voz (frames de la composición)

| Toma | Dice | Primera palabra | Última palabra | LUFS en la toma | Ganancia a −21 |
|---|---|---|---|---|---|
| HK06 | «Mira lo que ocurre cuando arquitectura y naturaleza dejan de estar separadas.» | f18 (el golpe de apertura suena en f3: 15 f antes) | f150 (la disolvencia a la piscina empieza en f154) | −22,26 | +1,3 dB |
| MD01 | «Los patios y vacíos hacen desaparecer esa frontera entre interior, paisaje y arquitectura.» | f556 (imagen opaca en f554) | f733 (la disolvencia a la corredera empieza en f738) | −24,86 | +3,9 dB |
| CT02 (2.ª mitad) | «Escríbeme y ven a conocerlo.» | f1165 (imagen opaca en f1162) | f1215 (el fundido a negro empieza en f1222) | −22,0 | +1,0 dB |

Entre la última palabra del CTA y el final de la pieza quedan **74 f** (la puerta pide 45-90): la cara de Isabella 13 f (el fundido a negro, en los 6 últimos) y la tarjeta oscura 60 f.

## Los subtítulos

13 líneas en 5 bloques y 4 acentos, todos abajo y a 90 %. Cada una entra **1,0-2,5 f antes de su palabra** (medido sobre la voz sola, `lineas-vs-onsets.py`).

| Bloque | Línea (frame de entrada) |
|---|---|
| h01 (f16–111) | Mira lo que ocurre (16) · cuando arquitectura (37) · y naturaleza (83) |
| h02 (f113–154) | dejan de estar (113) · **separadas.** (129) |
| m01 (f555–645) | Los patios y vacíos (555) · hacen desaparecer esa (593) · **frontera** (625) |
| m02 (f649–737) | entre interior, (649) · paisaje y (688) · **arquitectura.** (718) |
| c01 (f1162–1220) | **escríbeme** (1162) · y ven a conocerlo. (1181) |

**El primer subtítulo entra en el f16, antes de que Isabella diga «Mira» (f18): el hook abre la pieza y su texto sale con su voz (rev. 2).** **La toma del CTA entra a media frase:** su primera línea y su voz coinciden con la imagen opaca (f1162, voz en f1164,5: 2,5 f de aire).

### Legibilidad (texto blanco sin sombra al 90 % sobre el metraje, `legibilidad.py`)

Medido igual que las piezas aprobadas, sobre 10 fotogramas con texto de las tres tomas (franja y 1380-1640, sin los píxeles de texto): contraste **4,1-10,6 : 1 al p90 y 2,3-5,8 : 1 al p99** (017: 2,9-3,7 / 2,6-3,0 · 018: 2,8-4,1 / 2,3-3,5 · 019: 3,2-4,3 / 2,1-3,0 · 020: 3,2-4,0 / 2,5-3,3). El peor, f640 (2,27 al p99): «hacen desaparecer esa / frontera» sobre el tronco claro del fondo. Los alfas del velo (0,62 / 0,34) no se tocaron.

## La música y la mezcla (medida sobre la prueba)

| Qué | Nivel |
|---|---|
| Voz de Isabella (hook · mitad · CTA) | **−14,8 · −14,9 · −14,9 LUFS** con la música debajo (objetivo −15; voz TRATADA, rev. 3 de la final; antes −20,7 · −19,9 · −20,3) |
| Música sola | −15,3 (bloque 3) · −14,8 (bloque 5) LUFS: plana, como la canción (el golpe de apertura, 0,6 s, suena solo antes del «Mira») |
| Música bajo la voz | hook, mitad y CTA: −16 dB (≈ −30,9 LUFS: **15,9 LU bajo ella**, en la cuenta del plan) |
| Música bajo la tarjeta | la cola del piano y la envolvente a cero en f1287: −30,8 LUFS en los 1,9 s de tarjeta |
| Pieza entera | **−15,2 LUFS** integrados · pico real −1,8 dBFS · LRA 2,4 LU (rev. 3 de la final; antes −16,2 y LRA 7,0) |

**La resolución.** La canción decae sola desde los 175 s (f1203): −26,5 LUFS a los 5 s y −40,4 a los 10. La voz del CTA va de f1165 a f1215, así que el piano empieza a caer a mitad de su frase; tras la última palabra la música sube a su nivel «solo» en 12 f (lo que queda de la cola suena a su ganancia) y se apaga en línea recta bajo la tarjeta hasta f1287. Tiene el mismo papel que la caída a un lecho del 018 y el 019 y que el acorde final del 020.

**MD01 es la toma más baja** (−24,9 LUFS en su ventana; la hizo Isabella lejos del micro, al aire libre): la ganancia de +3,9 dB deja su pico en −0,1 dBTP; el pico de la pieza entera (−1,8 dBFS) viene de la música sola del bloque 3.

**Lo que no se puede medir:** si un piano plano a −31 LUFS compite con la voz y si el decaimiento resuelve bien bajo el CTA. **La prueba no está oída por quien la montó.**

## El color

`colorCorrection()` con la base del 017-020 y un ajuste por toma, medido con `herramientas/medir-color.py` (dos tandas de stills a mitad de escala con el mismo backend de GL, `angle`: una sin graduar —`stills-antes.mjs`— y otra con color). **Cuatro iteraciones** (la rev. 2 repitió la medida con los nuevos fotogramas y no tocó nada). Los topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `saturation` 0,95-1,12 y ≤ 1,06 en las tomas de Isabella.

| Plano | Ajuste sobre la base | Qué se corrigió | luma | saturación | quemado | aplastado |
|---|---|---|---|---|---|---|
| c02 hook · Isabella | exposición +0,12 · sombras +0,28 · luces −0,30 · negros 0 · saturación 1,03 · temperatura −0,01 | la entrada en sombra (4,5 % aplastado con sombras +0,10) | 88,2 → 90,9 | 0,226 → 0,251 | 0,0 → 0,0 % | 2,8 → 3,9 % |
| c03 piscina | exposición +0,14 · sombras +0,32 · luces −0,40 · blancos −0,12 · negros −0,02 · saturación 1,06 | el cielo y el interior de la columna | 107,2 → 110,4 | 0,357 → 0,406 | 0,4 → 1,4 % | 2,2 → 3,8 % |
| c04 dron | exposición −0,10 · sombras +0,42 · luces −0,30 · blancos −0,10 · negros 0 · contraste 1,04 | los jardines en sombra y el cielo quemado | 121,4 → 117,9 | 0,352 → 0,379 | 3,7 → 0,0 % | 2,7 → 2,9 % |
| c05 barandilla | exposición +0,03 · sombras +0,38 · luces −0,45 · blancos −0,20 · negros +0,04 · contraste 1,04 | los árboles a contraluz (7,1 % aplastado en la 1.ª tanda) | 117,8 → 117,3 | 0,342 → 0,369 | 0,8 → 0,0 % | 4,2 → 3,8 % |
| c06 mitad · Isabella | exposición +0,10 · sombras +0,12 · luces −0,30 · saturación 1,03 | Isabella a contraluz, sin tirar de cálido | 115,1 → 117,1 | 0,235 → 0,268 | 0,0 → 0,0 % | 0,2 → 1,9 % |
| c07 corredera | exposición +0,22 · sombras +0,38 · luces −0,40 · blancos −0,12 · negros 0 · contraste 1,04 · saturación 1,06 | el interior oscuro tras la corredera | 98,8 → 105,3 | 0,395 → 0,411 | 0,0 → 0,0 % | 5,8 → 5,3 % |
| c08 alcoba (1.ª mitad) | exposición −0,05 · sombras +0,38 · luces −0,40 · blancos −0,10 · negros 0 · contraste 1,04 · saturación 1,08 | la puerta de vidrio a pleno sol sobre el deck | 97,5 → 92,1 | 0,298 → 0,348 | 0,3 → 0,0 % | 2,5 → 2,5 % |
| c09 vista (2.ª mitad) | **el mismo** | (la misma toma) | 124,2 → 123,2 | 0,273 → 0,284 | 0,0 → 0,0 % | 0,8 → 1,0 % |
| c10 CTA · Isabella | exposición +0,05 · luces −0,35 · saturación 1,03 | el ladrillo y el cielo del fondo | 124,9 → 125,7 | 0,249 → 0,278 | 0,2 → 0,2 % | 0,6 → 1,1 % |
| **entre planos** | | | media 110,2 → 111,1 · **σ 13,3 → 11,9** | media 0,303 → 0,333 | máx 3,7 → 1,4 % | máx 5,8 → 5,3 % |

- **La piel de Isabella se queda donde estaba** (tono de los píxeles de piel, caja a mano por toma): hook 9,5° → 8,9° (fotograma f90) · CTA 359,8° → 359,8°; saturación +0,03. **La mitad (c06) no se pudo medir:** Isabella está a contraluz (el cielo detrás) y la máscara solo recoge 20 píxeles de piel; el ajuste es el más suave (saturación 1,03, sin balance de blancos).
- **Los empalmes** (salto de luma, sin graduar → graduado; medidos con los fotogramas de la rev. 2): c03→c04 +8,3 → +0,8 · c04→c05 +2,0 → +4,7 · c07→c08 +1,5 → +0,7 (**en la rev. 1 el corte seco daba +22,8 → +12,7**: por eso entra disolviendo) · c08→c09 (la misma toma) +1,3 → +1,3. La corredera acababa en un interior oscuro (luma 105) y la alcoba abre sobre el deck a pleno sol (121): un corte seco daba **+12,7** aun graduado, así que `c08` entra con una **disolvencia que acaba en el golpe**.
- **La dispersión de luma entre planos no baja más** (13,3 → 11,9) porque el paseo sale del deck al sol (133) y entra en la alcoba (92): lo que cambia es el espacio, no una exposición mal puesta.

## Estado de las puertas

- `node proyectos/021/revisar-021.mjs`: **verde**, con un aviso «por confirmar al oído» a propósito («Mira»/«Mirá»; `--final` falla hasta que se cierre).
- `npm --prefix remotion run lint`: limpio.
- `node proyectos/021/revisar-021.mjs`: avisa en cada pasada de la **excepción declarada** (la primera toma lleva voz y texto).
- Prueba: `pruebas-720p/021-recorrido-720p.mp4` (540×960, BT.709 en las dos capas, 21 MB), hoja de contactos `hoja.png` y panel de color `panel-color.png`. La rev. 1 (con el deck) queda como `…-rev1.*`.

## La final

`finales/021-recorrido.mp4` (CRF 12, 160 MB), `finales/021-recorrido-crf16.mp4` (88 MB) y `finales/021.srt` (13 cues, 0,53-40,67 s), exportados el 2026-10-04. 1289 f · 30 fps · BT.709 · −16,2 LUFS · pico −1,8 dBFS. Color de la final contra stills a escala 1: Δ medio ≤ 0,35 (master) y ≤ 0,43 (CRF 16) niveles. Ver `combinaciones.md` §2.7.

**Rev. 3 de la final (2026-10-08):** la voz suena a −15 LUFS (tratada, `<toma>-voz.wav`): la columna «LUFS en la toma» de la tabla de voz de arriba es la de la voz CRUDA con la que se midió `s0`/`s1`; el plan lleva ahora −15,0 · −15,1 · −14,7 (la del WAV tratado) y ganancias de 0,0 · +0,1 · −0,3 dB. Ver `combinaciones.md` §2.8.
