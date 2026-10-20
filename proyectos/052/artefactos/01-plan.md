# 01 · Plan narrativo — proyecto 052 · Tierra Grata Bosque Santo (El Poblado), ARRIENDO, V34 del registro («PREGÚNTATE ESTO»)

> **CAMBIO DE ENCARGO (2026-10-20, a media sesión): SIN voz en off y con un guion nuevo EN PANTALLA** (`proyectos/044/reparto-051-053.md` §5 y §5b): *«crea el vídeo sin la voz en off; … cambiamos el guion a algo más impactante que resalte las plusvalías del apartamento: aseo semanal incluido, acompañamiento personalizado, acceso a chef privado, alquiler de transporte y la mejor asesoría de la ciudad»*. Lo que cambia: la locución desaparece, los planos del original se RECORTAN (no se quitan: 77,6 s → 46,6 s) y los textos son nueve rótulos que caen en golpes del piano; el hook y el CTA conservan la voz de Isabella. Las secciones de abajo marcan lo que era de la primera versión (con locución) y está superado.

> Paso 1 de 3. Escrito con el reparto de la sesión coordinadora (`proyectos/044/reparto-051-053.md`), el catálogo del material (`proyectos/044/catalogo-material.md`), el análisis fotograma a fotograma del original (`videos editados/02.mp4`, 2026-10-20) y lo aprendido en la 047 (`proyectos/047/aprendizajes.md`), y **antes** del primer render. Siguiente: [02-layout.md](02-layout.md).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Pedido | «Analiza los vídeos de `videos editados` y replícalos con las mismas tomas, pero con los 2 formatos. Selecciona música diferente a los 6 pasados» (2026-10-20). Esta sesión es la **V34 / 052**, réplica de `02.mp4` (15-sep-2026, 77,6 s, hecho por otro editor con el material del 2-sep). **Replicar = las mismas tomas, en el mismo orden, con el mismo texto, en el formato del canal** (subtítulos editoriales, cierre con la tarjeta oscura, sin sello) **y en los dos formatos** (orgánico y con ficha). |
| Numeración | V34 / 052. La V33/051 (`01.mp4`) y la V35/053 (`03.mp4`) son de las sesiones hermanas. La reserva de la V34 y de *Here For You* ya estaba en `archivos/musica/registro-de-uso.md`. |
| La propiedad y la ficha | Tierra Grata Bosque Santo, El Poblado, Medellín: **ARRIENDO, COP 14.800.000 al mes**, 113 m², 2 habitaciones, 2 baños, balcón con jacuzzi privado. Lo que dice la voz y la ficha de la web no da (amoblado, Spa Romano, coworking…) lo dice el original: se repite tal cual. **Ninguna cifra en pantalla** (el 02 no dice ninguna: no hay «113 m», ni precio); la versión con ficha lleva el canon exacto (`$ 14,8 M COP / MES`). |
| Material | `Apartamento - Tierra Grata - Las Palmas/Videos/` copiado a `proyectos/052/original/` con el código como nombre (sha256 en `normalizar.mjs`): HK04 `1e5a0db5`, CT05 `5bc7d1a0`, RC21 `7ca598cd`, RC22 `33ac8ce2`, RC06 `556bee38`, RC01 `9f23d5be`, RC03 `e5dd0f12`, RC15 `14db00b3`, CT04 `6765b9fd`, RC16 `7cdf817e`, RC17 `c99bc2f1`, RC13 `e977e148`, RC12 `7bc5ad03`, música `6fbbe88d`. **TODO es anamórfico** (1920×1080, SAR 81:256, DAR 9:16 = verticales de 608×1080): se escala ENTERO a 1296×2304 con `setsar=1`, sin recorte (×2,13: más blando que Isabella en 4K; se dice). No hay dron. |
| Composición | `Recorrido052` · 1080×1920 · **30 fps** · 1398 f (46,6 s). Todos los clips a 30 fps constantes (HK04 declara 29,995 sobre 51,7 s). |
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

## Sin locución: los rótulos (cambio de encargo del 2026-10-20)

La primera versión llevaba una locución (el original la lleva mezclada con la música vieja y sacarla de ahí no vale). Se le preguntó al usuario el camino: eligió generarla con la voz clonada de Isabella; se vio que la cuenta de ElevenLabs **no tiene un clon de Isabella** (solo 21 voces de stock y «John Stevans v 0.1»), eligió **una voz de stock femenina** y se generó con «Bella» (**1.101 caracteres** de los 89.834 de la cuota; el coste ya está hecho y es pequeño). **Después, el encargo cambió: sin voz en off.** Esa locución NO se usa; sus textos y notas quedan en `proyectos/052/voz/descartada/` y los audios no están en git.

El guion nuevo (reparto §5b; el usuario puede cambiar los textos, que se escriben tal cual, de tú, sin exclamaciones y sin cifras), uno por tramo, con una palabra acentuada (Playfair itálica, la letra del canal) y entrando **en un golpe medido del piano**:

| Rótulo | Entra (f · s · golpe) | Sobre (plano del original) |
|---|---|---|
| R1 «¿Un lugar donde **dormir**…» | 148 · 4,95 · 32,8 dB | RC21 al revés: el jacuzzi y las torres |
| R2 «…o un lugar donde **disfrutes** vivir?» | 237 · 7,91 · 8,7 | el mismo plano: la ciudad y las nubes |
| R3 «Aquí no pagas solo un apartamento» | 336 · 11,20 · 10,3 | el bar (RC22) y, en un golpe de 11,3 dB (f413), la alcoba (RC06) |
| R4 «Pagas llegar y tener todo **resuelto**:» | 472 · 15,73 · 8,2 | la sala con la palma y el ventanal (RC01, 6-10 s) |
| R5 «**Aseo** semanal incluido» | 612 · 20,39 · 10,1 | el balcón con las camas (RC03) |
| R6 «Alguien que te **acompaña** desde el día uno» | 745 · 24,83 · 9,2 | el sauna (RC15) y, en un golpe (f814), Isabella caminando (CT04) |
| R7 «**Chef** privado y transporte cuando los pidas» | 881 · 29,36 · 15,9 | la piscina (RC16); el «bosque con hierba» no existe y no se sustituye |
| R8 «Planes y reservas en **Medellín**» | 1014 · 33,79 · 11,4 | el gimnasio (RC13) |
| R9 «Y la mejor **asesoría** de la ciudad» | 1101 · 36,69 · 10,3 | la Social Kitchen (RC12) |

Lo que prometen lo dio el usuario (aseo semanal incluido, acompañamiento personalizado, chef privado, transporte, asesoría): ninguno dice que el chef o el transporte vayan incluidos en el canon («cuando los pidas»). El caption nombra las cinco plusvalías.

**Palabra dudosa (POR CONFIRMAR AL OÍDO):** «amoblado» (hook, 4,92 s de HK04, **2,2 s del vídeo**: whisper oye «a mi lado»; 4 sílabas «a-mo-bla-do»). La frase dudosa «¿para qué pagar un arriendo premium…?» ya no está (era de la locución).

## Música

*Armin van Buuren - Here For You (from 'Piano' album)* (`archivos/musica/`, sha `6fbbe88d`, 3:55; reservada para la V34, distinta de las seis anteriores): piano **sin caída ni pulso** (el registro: caída de 8 dB a +40,3 s) pero **con golpes** (notas de 7 a 33 dB). **Sin locución la música pesa**: suena a su nivel (−15 LUFS) de principio a fin y solo baja bajo el hook y el CTA. Se usa desde su segundo 20,8: 5 s de piano casi mudo (−36 LUFS) bajo el hook y, en el f148, el golpe de 32,8 dB (el segundo 25,692 de la canción) justo cuando acaba el hook y entra el primer rótulo. **Cada rótulo y cada cambio de plano caen en un golpe medido** (`herramientas/buscar-entrada-rotulos.py` buscó la entrada que casa las diez entradas con los golpes más fuertes; la puerta los comprueba a ≤ 2 f y ≥ 7 dB). Sin pulso no hay cortes secos: **todos los planos se disuelven** (12 f) y la disolvencia ACABA en el golpe, como en el original. Medida, **no oída**; licencia sin verificar (`HAY_MUSICA = false` es la salida). Alternativa reservada si no sirve: *Einaudi - Experience (Live)* (tramo útil desde ≈ 250 s).

## Promesa y CTA

- **Promesa (primer segundo):** Isabella en el sofá, hablando desde el f5, con su primer subtítulo. **Es la excepción declarada a la regla fija 1** (primera toma sin texto ni voz): el original abre con ella y el reparto fija «frame 0 = Isabella» en las tres réplicas (como la 046, 048 y 050).
- **Acción final:** CT05, «si buscas más que un apartamento para vivir, escríbenos» (la misma toma cierra la 053: declarado). Tras su última palabra funde a negro y entra la tarjeta (logo y web); el caption lleva la acción (WhatsApp).
- **Lo que NO se cuenta:** administración, contrato, minutos a ningún sitio, qué incluye exactamente el acompañamiento, la venta de la unidad, valorización ni rentabilidad.

## Lo que la réplica declara (y por qué)

1. **46,6 s** (dentro de los 55 del formato; el original dura 77,6): sin voz, la lectura manda el ritmo y los planos del original se **recortan**, no se quitan (4,4 s de rótulo como mucho, 2-4 s de plano).
2. **Abre con Isabella** (hook en directo, frame 0): excepción declarada a la regla fija 1, como la 046, 048 y 050 (el original abre con ella y el reparto lo fija para las tres réplicas).
3. **Hook entero** («Antes de arrendar amoblado, pregúntate esto», 4,9 s con dos pausas de 1 s y 0,6 s): el original recorta «Antes de arrendar» y empieza en «…moblado».
4. **Dos planos del original no están en el material**: «Isabella de pie en la cocina» → sustituido por CT04 (Isabella caminando hacia cámara en la sala con la palma, sin voz); «el bosque con hierba» → NO se sustituye. El reparto decía que la primera era un tramo mudo de `Img 9496` (≈ 20-25 s): ahí HK04 enseña una cocina vacía.
5. **Recorrido anamórfico** (608×1080 efectivos escalados ×2,13): más blando que Isabella en 4K; sin filtros.
6. **RC21 al revés** (como el original) y **sin aceleraciones** (el original acelera RC21 ×1,6, RC01 ×1,1 y RC03 ×1,5): cada plano a su tiempo, tramos elegidos de cada clip.
7. **Planos cortos por la disolvencia**: un plano que disuelve necesita 12 f de clip antes de su `desde`; el bar (RC22) dura 2,6 s y la alcoba (RC06), 2,0 s.
8. **Sin clímax final distinto**: el último plano de la casa es la Social Kitchen, como en el original.
9. **Metraje compartido** con las otras piezas (la puerta, 7b, informa de cuánto): es estructural (22 clips) y el original ya lo hacía.
10. **Gente en cuadro, pequeña**: RC13 (gimnasio, 0,4-3,3 s: como el original) y RC12 (Social Kitchen, 0,4-4,8 s) enseñan personas al fondo (≈ 100 px); RC11, el único clip con un hombre reconocible, no se usa.
11. **La misma toma de CT05 cierra la 053**: declarado.
12. **La versión con ficha CONSERVA los rótulos** (aquí el texto es el mensaje): la ficha va en y ≈ 1220-1420 y el rótulo, en la banda de abajo (1430-1640); se comprueba en la hoja que no se toquen.
13. **Ya se gastaron 1.101 caracteres de ElevenLabs** (voz de stock «Bella») en una locución que el cambio de encargo dejó sin uso.
