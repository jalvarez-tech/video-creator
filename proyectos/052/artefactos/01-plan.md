# 01 · Plan narrativo — proyecto 052 · Tierra Grata Bosque Santo (El Poblado), ARRIENDO, V34 del registro («PREGÚNTATE ESTO»)

> Paso 1 de 3. Escrito con el reparto de la sesión coordinadora (`proyectos/044/reparto-051-053.md`), el catálogo del material (`proyectos/044/catalogo-material.md`), el análisis fotograma a fotograma del original (`videos editados/02.mp4`, 2026-10-20) y lo aprendido en la 047 (`proyectos/047/aprendizajes.md`), y **antes** del primer render. Siguiente: [02-layout.md](02-layout.md).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Pedido | «Analiza los vídeos de `videos editados` y replícalos con las mismas tomas, pero con los 2 formatos. Selecciona música diferente a los 6 pasados» (2026-10-20). Esta sesión es la **V34 / 052**, réplica de `02.mp4` (15-sep-2026, 77,6 s, hecho por otro editor con el material del 2-sep). **Replicar = las mismas tomas, en el mismo orden, con el mismo texto, en el formato del canal** (subtítulos editoriales, cierre con la tarjeta oscura, sin sello) **y en los dos formatos** (orgánico y con ficha). |
| Numeración | V34 / 052. La V33/051 (`01.mp4`) y la V35/053 (`03.mp4`) son de las sesiones hermanas. La reserva de la V34 y de *Here For You* ya estaba en `archivos/musica/registro-de-uso.md`. |
| La propiedad y la ficha | Tierra Grata Bosque Santo, El Poblado, Medellín: **ARRIENDO, COP 14.800.000 al mes**, 113 m², 2 habitaciones, 2 baños, balcón con jacuzzi privado. Lo que dice la voz y la ficha de la web no da (amoblado, Spa Romano, coworking…) lo dice el original: se repite tal cual. **Ninguna cifra en pantalla** (el 02 no dice ninguna: no hay «113 m», ni precio); la versión con ficha lleva el canon exacto (`$ 14,8 M COP / MES`). |
| Material | `Apartamento - Tierra Grata - Las Palmas/Videos/` copiado a `proyectos/052/original/` con el código como nombre (sha256 en `normalizar.mjs`): HK04 `1e5a0db5`, CT05 `5bc7d1a0`, RC21 `7ca598cd`, RC22 `33ac8ce2`, RC06 `556bee38`, RC01 `9f23d5be`, RC03 `e5dd0f12`, RC15 `14db00b3`, CT04 `6765b9fd`, RC16 `7cdf817e`, RC17 `c99bc2f1`, RC13 `e977e148`, RC12 `7bc5ad03`, música `6fbbe88d`. **TODO es anamórfico** (1920×1080, SAR 81:256, DAR 9:16 = verticales de 608×1080): se escala ENTERO a 1296×2304 con `setsar=1`, sin recorte (×2,13: más blando que Isabella en 4K; se dice). No hay dron. |
| Composición | `Recorrido052` · 1080×1920 · **30 fps** · 2532 f (84,4 s). Todos los clips a 30 fps constantes (HK04 declara 29,995 sobre 51,7 s). |
| Formato | 9:16 · `recorrido-luxur` adaptado a la réplica: **hook (HK04) · recorrido con LOCUCIÓN EN OFF · CTA (CT05)**; sin «casa» delante, sin objeciones ni mitad (el original no los tiene). |
| Marca / texto | Luxur, texto **editorial** (abajo, 90 %, cursiva 8 px menor) de TODO lo que suena en trozos de 1-4 palabras; **sin sello**; cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com`. La versión con ficha va SIN subtítulos y con tipo, lugar y precio fijos en el tercio bajo del 1:1. |
| Destino | Reels · TikTok · Shorts (orgánico) y Meta Ads / feed 1:1 (funnel) |
| Presentadora | Isabella Cadavid (2-sep: chaqueta de flores, dentro del apartamento) |

## Lo que dice el original, y de dónde sale cada plano (medido el 2026-10-20)

Se emparejó cada fotograma de `02.mp4` contra todos los clips (MAE de grises 27×48; ≤ 0,1 = el mismo fotograma) y se transcribió su audio por palabra (`proyectos/052/medidas/orig02.json`). El original **cruza todos sus planos** (no hay un solo corte seco), **acelera** RC21 (×1,6, y AL REVÉS), RC01 (×1,1) y RC03 (×1,5) y **no usa dos tomas que no están en las carpetas** del material.

| Original (s) | Plano | Clip | Lo que se oye (locución, salvo hook y CTA) |
|---|---|---|---|
| 0,0-2,6 | Isabella en el sofá | HK04 desde 4,83 s (su audio en directo) | «…moblado, pregúntate esto» (el original recorta «Antes de arrendar») |
| 3,0-9,9 | balcón al atardecer: del jacuzzi a la ciudad | **RC21 AL REVÉS** | «¿Estás buscando simplemente un lugar donde dormir, o un lugar donde realmente disfrutes vivir?» |
| 10,0-13,1 | el bar | RC22 | «Porque cuando eliges un apartamento amoblado, no estás pagando solamente por…» |
| 13,2-21,7 | alcoba | RC06 | «…una cama, una sala y una cocina. Estás pagando por la comodidad de llegar a casa y sentir que todo tiene sentido. Y si vas a invertir en un arriendo…» |
| 22,0-33,6 | la isla de la cocina, la sala con la palma, el ventanal | RC01 | «…premium, los detalles deben estar a la altura. Imagina terminar el día, salir al balcón, desconectarte en tu jacuzzi privado y disfrutar de un entorno rodeado de naturaleza, sin dejar de estar conectado…» |
| 33,8-45,2 | el balcón con las camas → las torres → el cielo | RC03 | «…con Medellín. Aquí tienes dos habitaciones, dos baños y espacios pensados para vivir con amplitud y comodidad. Cuando quieres salir de casa, el proyecto te ofrece gimnasio, zonas húmedas,» |
| 45,3-49,8 | sauna | RC15 | «coworking, Spa Romano y espacios para compartir.» |
| 49,9-53,0 | **Isabella en la cocina, de pie** | **NO ESTÁ EN EL MATERIAL** | «¿Para qué pagar un arriendo premium si [no] puedes disfrutarlo?» |
| 53,1-59,1 | piscina | RC16 (3,0-9,0 s) | «Este apartamento en Las Palmas es para quienes quieren que su hogar sea mucho más que un lugar de paso:» |
| 59,1-63,0 | **bosque con hierba** | **NO ESTÁ EN EL MATERIAL** | «un espacio para descansar, trabajar, recibir invitados» |
| 63,0-66,3 | gimnasio | RC13 (0-3,3 s) | «y disfrutar de una calidad de vida diferente.» |
| 66,3-73,6 | Social Kitchen | RC12 (entero) | «Un lugar donde vivir bien no sea un plan para después, sino parte de tu día a día.» |
| 73,6-77,5 | Isabella en la silla | CT05 (su audio en directo) | «Si buscas más que un apartamento para vivir, escríbenos.» |

**Dos correcciones al reparto** (que decía «Isabella en la cocina = tramo mudo de `Img 9496`, ≈ 20-25 s»): en HK04 esos segundos son una cocina **vacía**, con un portátil en la encimera (comprobado a 1 s); y el paseo mudo de HK04 (8-52 s) y de HK05 (7-32 s) no trae ni a Isabella de pie en una cocina ni un bosque. Esos dos planos del original salen de clips del 2-sep que **no están en las carpetas** (`Videos/` solo tiene los clips elegidos); no hay otra copia en el SSD ni en el Mac (búsqueda hecha). **Sustitutos declarados:**

- **«Isabella en la cocina» → CT04 (`Img 9492`, 2,5-5,8 s)**: Isabella con la misma chaqueta, de cuerpo entero, caminando hacia cámara en la sala con la palma (la sala de la que sale la cocina). Va SIN voz (CT04 dice «Antes de arrendar en Las Palmas, piensa en esto»).
- **«El bosque con hierba» → RC17 (el carril de nado entre árboles y cielo, 3,2-7,2 s)**, como dice el reparto. Pega con RC16 (la misma piscina desde el otro extremo): el sustituto es mucho menos distinto del plano anterior que el original.

## El hook: la frase entera, con sus pausas

HK04 trae la frase ENTERA con dos pausas (onsets medidos): «Antes de arrendar» (2,90-3,9 s) · [1,0 s] · «amoblado,» (4,92-5,9 s) · [0,6 s] · «pregúntate esto.» (6,50-7,17 s). **El original recorta «Antes de arrendar» y empieza el audio en «amoblado»**, a 4,83 s de HK04 (se comprobó: los arranques de sílaba del audio del original son los de HK04, desplazados 4,83 s con ±10 ms). El reparto fija la frase completa («Antes de arrendar amoblado, pregúntate esto»): así se hace, con `desde` = 2,733 s (frame 82 de la toma), de modo que su primera sílaba suena en el f5 y su imagen es el f0. Dura 4,9 s (el original, 2,6): la pausa de 1 s no se recorta (no hay salto de imagen limpio). **«amoblado» queda POR CONFIRMAR AL OÍDO** (whisper oye «a mi lado»; 4 sílabas «a-mo-bla-do»).

## La locución (decidida con el usuario el 2026-10-20)

**No existía como archivo.** El original la lleva mezclada con la música vieja; sacarla de ahí NO vale (el encargo es cambiar la música). El reparto proponía (1) que el usuario entregara los audios o (2) generarla con la voz clonada de Isabella. Se le preguntó y eligió (2); **entonces se vio que la cuenta de ElevenLabs NO tiene un clon de Isabella** (solo 21 voces de stock y «John Stevans v 0.1», masculina), y se le volvió a preguntar: eligió **una voz de stock femenina**. Se generó con **«Bella»** (`hpp4J3VqNfWAUOO0d1Us`, «Professional, Bright, Warm»), `eleven_multilingual_v2`, preset `narracion`, request stitching, **1.101 caracteres** (de los 89.834 de la cuota), las 10 frases de `proyectos/052/voz/off-guion.txt`. No suena a Isabella (ella habla en el hook y el CTA con su voz); la voz del original también es femenina (F0 ≈ 225 Hz; Isabella ≈ 212).

Las 10 frases se montan con `herramientas/montar-locucion.py` (recorta el silencio de cola de cada una y pone las pausas del original: 0,15-1,7 s) en `original/off.wav` (71,1 s de voz: **un 5 % más lenta** que la del original, que son 67,4 s). La tratada (`off-voz.wav`): graves fuera, puerta suave, compresor 3,5:1 **con ataque de 1 ms** (la cresta de 17 dB de una voz de TTS está en ráfagas de pocos ms: con 4 ms el limitador tenía que quitar 5,3 dB), +18 dB y limitador a −2,5 dBFS: −15,1 LUFS, pico −1,8 dBTP. Whisper la transcribe palabra por palabra igual que el guion (187 palabras; «jacuzzi» como «yacusi», como el original).

Cada plano entra donde manda la palabra de la locución (`ancla()` y `PALABRAS_OFF` en `metraje-052.ts`: sus arranques de sílaba por energía), los subtítulos salen de la locución frase a frase (`herramientas/alinear-locucion.py`) y la música baja bajo ella.

**Palabras dudosas (POR CONFIRMAR AL OÍDO):** «amoblado» (hook, 4,92 s de HK04: whisper oye «a mi lado»; 4 sílabas «a-mo-bla-do») y «**¿Para qué pagar un arriendo premium si no puedes disfrutarlo?**» (original 49,9-52,5 s): whisper oye «si lo puedes disfrutarlo» y los rótulos del original ponen «para qué · pagar un · premium si · no puedes · disfrutarlo»; la locución nueva dice lo del texto («si no puedes disfrutarlo»): hay que oír el original para ver si coincide.

## Música

*Armin van Buuren - Here For You (from 'Piano' album)* (`archivos/musica/`, sha `6fbbe88d`, 3:55; reservada para la V34, distinta de las seis anteriores): piano **sin caída ni pulso** (el registro: caída de 8 dB a +40,3 s). Se usa desde su segundo 20,733: 5 s de piano casi mudo bajo el hook (−35,8 LUFS), el golpe de 32,8 dB del segundo 25,7 de la canción cae en el f150, entre el último «esto» del hook y la locución, y de ahí −15 LUFS planos hasta los 70 s y −17 hasta el final (medida con `medir-pista.py`; **no oída**; licencia sin verificar: `HAY_MUSICA = false` es la salida). Sin pulso no hay cortes secos que medir: **todos los planos se disuelven** (12 f), como en el original. Alternativa reservada si no sirve: *Einaudi - Experience (Live)* (tramo útil desde ≈ 250 s).

## Promesa y CTA

- **Promesa (primer segundo):** Isabella en el sofá, hablando desde el f5, con su primer subtítulo. **Es la excepción declarada a la regla fija 1** (primera toma sin texto ni voz): el original abre con ella y el reparto fija «frame 0 = Isabella» en las tres réplicas (como la 046, 048 y 050).
- **Acción final:** CT05, «si buscas más que un apartamento para vivir, escríbenos» (la misma toma cierra la 053: declarado). Tras su última palabra funde a negro y entra la tarjeta (logo y web); el caption lleva la acción (WhatsApp).
- **Lo que NO se cuenta:** administración, contrato, minutos a ningún sitio, qué incluye exactamente el acompañamiento, la venta de la unidad, valorización ni rentabilidad.

## Lo que la réplica declara (y por qué)

1. **84,4 s** (el formato pide ≤ 55): manda la réplica, como el original (77,6 s); son 6,8 s más por el hook entero (+2,3 s), la voz generada (≈ 5 % más lenta, +3,7 s) y la tarjeta. La puerta tiene el tope declarado a 86 s.
2. **Locución larga** (71 s de voz en off, de stock y no de Isabella): el formato la limita al bloque 5; aquí manda la réplica.
3. **Sin clímax final distinto**: el último plano de la casa es la Social Kitchen, como en el original (la «vista» no cierra el bloque 5).
4. **Recorrido anamórfico** (608×1080 efectivos escalados ×2,13): más blando que Isabella en 4K; sin filtros.
5. **RC21 al revés** (el original lo pasa del jacuzzi a la ciudad) y **sin aceleraciones**: cada plano a su tiempo (el original acelera RC21 ×1,6, RC01 ×1,1 y RC03 ×1,5); donde el original pasaba el clip entero, aquí hay que elegir un tramo (RC03 0,6-12,7 s de 17,3; RC21 al revés 0,4-7,6 s de 11,1).
6. **Planos más cortos por la disolvencia**: un plano que disuelve necesita 12 f de clip antes de su `desde`; RC22, RC06, RC01, RC15 y RC12 tienen justo el clip que hace falta y duran 0-1,5 s menos que en el original.
7. **Dos planos sustituidos** (CT04 y RC17), arriba.
8. **Metraje compartido**: la puerta (7b) informa de cuánto comparte esta pieza con las otras (045-050 y, sin fusionar, 051 y 053: RC03 10,7 s con la 053, RC01 6,5 s…). Es estructural (22 clips) y el original ya lo hacía.
9. **Gente en cuadro, pequeña**: RC13 (gimnasio) y RC12 (Social Kitchen) enseñan personas al fondo (≈ 100 px); RC11, el único clip con un hombre reconocible, no se usa. El original sí enseña esos planos.
10. **Tomas repetidas entre piezas**: CT05 cierra también la 053.
