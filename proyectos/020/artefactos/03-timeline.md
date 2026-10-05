# 03 · Timeline — proyecto 020

> Paso 3 de 3. Anterior: [02-layout.md](02-layout.md). Los números salen de `remotion/src/proyectos/020/` y `node proyectos/020/revisar-020.mjs` los comprueba.
> 30 fps · 1253 f (41,77 s) · una sola música (*Sax for the Last Customer*, jazz, entrada en 137,6 s) de principio a fin.

## Los once planos

La columna **espacio** leída de arriba abajo es el paseo (sentido I: entrada → terraza, con el retroceso patio → espacio abierto declarado en `01-plan.md`). **Golpe** = el golpe MEDIDO de la canción en que entra el plano (segundo de la canción · fuerza en dB por 15 ms · frame en que SUENA, con el retardo del render).

| # | `id` | Bloque | Espacio | Función | Clip · tramo (s) | `en` | `dur` | Entra | Golpe | Encuadre |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `c01-calle` | 1 | calle y entrada | situar (llegar) | RC22 · 3,90–6,43 | 0 | 76 | corte | 137,645 s · 33,7 dB · f3,0 (apertura) | 1,00 → 1,04 |
| 2 | `c02-hook` | 2 | sala de bloques | emocionar (el filtro) | HK03 · 0,70–6,23 (voz 0,81–6,04) | 76 | 166 | disolver (f64–76) | 140,067 s · 18,0 dB · f75,6 | 1,00 → 1,04 |
| 3 | `c03-pasillo` | 3 | pasillo | llevar (el umbral) | RC02 · 0,00–4,47 | 242 | 134 | corte | 145,629 s · 18,1 dB · f242,5 | quieto |
| 4 | `c04-abierto` | 3 | espacio abierto | revelar (la medida) | RC05 · 0,00–2,77 | 376 | 83 | corte | 150,087 s · 18,9 dB · f376,2 | quieto |
| 5 | `c05-patio` | 3 | deck y patio | llevar a otro espacio | RC09 · 0,00–3,53 | 459 | 106 | corte | 152,859 s · 23,9 dB · f459,4 | quieto |
| 6 | `c06-mitad` | 4 | patio | emocionar (el reencuadre) | MD14 · 0,50–6,27 (voz 0,57–5,77) | 565 | 173 | disolver (f553–565) | 156,384 s · 23,0 dB · f565,1 | 1,00 → 1,04 |
| 7 | `c07-alcoba` | 5 | alcoba | cómo se vive (el lienzo) | RC13 · 10,93–15,37 | 738 | 133 | disolver (f726–738) | 162,142 s · 25,7 dB · f737,9 | quieto |
| 8 | `c08-cielo` | 5 | ventanal | revelar (la vista) | RC04 · 0,00–2,23 | 871 | 67 | corte | 166,587 s · 21,1 dB · f871,2 | quieto |
| 9 | `c09-dron` | 5 | el edificio desde el aire | señalar valor (la recompensa) | DR156 · 0,50–5,53 | 938 | 151 | corte | 168,822 s · 14,7 dB · f938,3 | 1,00 → 1,04 |
| 10 | `c10-cta` | 6 | espacio abierto → deck | invitar | CT06 · 0,77–4,23 (voz 0,86–3,70) | 1089 | 104 | disolver (f1077–1089) | 173,838 s · 15,9 dB · f1088,8 | 1,00 → 1,03 |
| 11 | `c11-cierre` | 6 | tarjeta oscura | cierre (el logo y la web) | negro liso | 1193 | 60 | corte | — (nada que cortar: el **acorde final** cae en f1183,2) | quieto |

- **Los cortes secos** (5: f242 · f376 · f459 · f871 · f938) caen en golpes de 13,9-24,3 dB **medidos sobre el audio del render** (`golpes-render.py`, R33): a +0,5 · +0,2 · +0,4 · +0,4 · +0,3 f. Los cuatro finales de disolvencia (f76 · f565 · f738 · f1089) y el golpe de apertura (f3) también suenan donde se prevé (−0,4 · +0,1 · −0,2 · −0,2 · −0,9 f), y el **acorde final** en f1182,9 (previsto 1183,2).
- **La vista, el plano más largo de su bloque:** el dron (151 f) frente a la alcoba (133 f) y el cielo (67 f).
- **Dos mitades de una toma partida:** ninguna (no hay planos seguidos del mismo clip).
- **Metraje compartido con las versiones anteriores:** ninguno (9b de la puerta).

## La voz (frames de la composición)

| Toma | Dice | Primera palabra | Última palabra | LUFS en la toma | Ganancia a −21 |
|---|---|---|---|---|---|
| HK03 | «Si estás buscando un apartamento totalmente terminado, este probablemente no es para ti.» | f79 (imagen opaca en f76) | f236 (el corte, en f242) | −24,15 | +3,1 dB |
| MD14 | «No estás viendo un apartamento sin terminar, estás viendo uno que todavía puedes definir.» | f567 (imagen opaca en f565) | f723 (la disolvencia a la alcoba empieza en f726) | −18,51 | −2,5 dB |
| CT06 | «Si es el reto, escríbeme y agendamos una visita.» | f1092 (imagen opaca en f1089) | f1177 (el acorde final, en f1183; el fundido a negro, en f1186) | −16,03 | −5,0 dB |

Entre la última palabra del CTA y el final de la pieza quedan **76 f** (la puerta pide 45-90): la cara de Isabella 16 f, el fundido a negro y la tarjeta oscura 60 f.

## Los subtítulos

15 líneas en 6 bloques y 4 acentos, todos abajo y a 90 %. Cada una entra **0,8-2,5 f antes de su palabra** (medido sobre la voz sola, `lineas-vs-onsets.py`).

| Bloque | Línea (frame de entrada) |
|---|---|
| h01 (f78–160) | Si estás buscando (78) · un apartamento totalmente (95) · **terminado,** (128) |
| h02 (f164–240) | este probablemente (164) · no es (210) · **para ti.** (221) |
| m01 (f566–636) | No estás viendo (566) · un apartamento (581) · sin terminar, (613) |
| m02 (f641–727) | estás viendo uno (641) · que todavía puedes (674) · **definir.** (708) |
| c01 (f1091–1115) | Si es el reto, (1091) |
| c02 (f1118–1182) | **escríbeme** (1118) · y agendamos una visita. (1124) |

**El DTW de whisper iba de 3 a 11 f pronto o tarde** (hay que llevarlas a la palabra con la voz sola, R31): «y agendamos una visita.» salía en 1137 y su «y» arranca en 1126; «sin terminar,» salía en 607 y su «sin» en 615; «definir.» salía en 708 y su «de-» en 710; «un apartamento» (MD14) salía en 582 y «un» pega con «viendo» sin onset propio (1,10 s por `palabras-desde.py`).

### Legibilidad (texto blanco sin sombra al 90 % sobre el metraje, `legibilidad.py`)

Medido igual que las piezas aprobadas, sobre 10 fotogramas con texto de las tres tomas (franja y 1380-1640, sin los píxeles de texto): contraste **3,2-4,0 : 1 al p90 y 2,5-3,3 : 1 al p99** (017: 2,9-3,7 / 2,6-3,0 · 018: 2,8-4,1 / 2,3-3,5 · 019: 3,2-4,3 / 2,1-3,0). El peor, f710 (2,5 al p99): el último trozo de la mitad sobre el deck claro del patio, cuando ya empieza la disolvencia a la alcoba. Los alfas del velo (0,62 / 0,34) no se tocaron.

## La música y la mezcla (medida sobre la prueba)

| Qué | Nivel |
|---|---|
| Voz de Isabella (hook · mitad · CTA) | −20,0 · −20,9 · −20,3 LUFS con la música debajo (objetivo −21; una ganancia por toma: +3,1 · −2,5 · −5,0 dB) |
| Música sola | −15,1 (la apertura) · −14,8 (bloque 3) · −15,0 (bloque 5) LUFS: plana, como la canción |
| Música bajo la voz | hook, mitad y CTA: −16 dB (≈ −30,9 LUFS: **9,9 LU bajo ella**, en la cuenta del plan) |
| Música bajo la tarjeta | la cola del acorde y la envolvente a cero en f1251: −38,8 LUFS en la tarjeta |
| Pieza entera | **−16,0 LUFS** integrados · pico real −3,6 dBFS · LRA 6,8 LU |

**El acorde final.** La canción acaba en seco (acorde de 20,9 dB en 176,986 s de la canción, f1183,2): la voz del CTA acaba en f1177 y la música sube de su nivel bajo al «solo» en esos 5 f (`SUBIDA_ACORDE`), así que el acorde suena entero sobre la imagen que funde a negro (f1186–1192), y su cola de 2 s se apaga bajo el logo y la web. Tiene el mismo papel que la caída del piano en el 017 y el 018: resolver bajo el CTA y dejar la tarjeta en silencio.

**Lo que no se puede medir:** si un saxo continuo a −31 LUFS compite con la voz (es una pista densa; las otras eran un piano) y si el acorde suena bien como cierre. **La prueba no está oída por quien la montó.**

## Estado de las puertas

- `node proyectos/020/revisar-020.mjs`: **verde**, con cuatro avisos «por confirmar al oído» a propósito («terminado» y «reto»; `--final` falla hasta que se oigan).
- `npm --prefix remotion run lint`: limpio.
- Final: `finales/020-recorrido.mp4` (CRF 12 `slower`, 173,2 MB), `finales/020-recorrido-crf16.mp4` (CRF 16 `slow`, 96,7 MB) y `finales/020.srt`: las dos con las etiquetas BT.709 completas y medidas contra stills; `--final` falla por las cinco notas «por confirmar al oído» (a propósito).
- Prueba: `pruebas-720p/020-recorrido-720p.mp4` (540×960, BT.709 en las dos capas, 22 MB), hoja de contactos `hoja.png` y panel de color `panel-color.png`.
