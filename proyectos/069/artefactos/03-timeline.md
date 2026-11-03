# 03 · Timeline — proyecto 069 · «Unidos por Botswana» (revisión 9: la serenata de su boda justo tras el primer video de ustedes, del 0:15,9 al 0:21,9; revisión 8: revisión 7: texto final en Montserrat y resumido; revisión 6: «We Are» desde el segundo 2 de su pista, con el piano; hook más corto; el final es el fuego; llamas en el 0:27 en vez de la playa)

> Paso 3 de 3. El frame exacto de cada cosa. [01-plan.md](01-plan.md) · [02-layout.md](02-layout.md).
> De aquí sale, casi copiando: `metraje-069.ts` (los planos) · `audio-069.ts` (lo que suena) · `voz-069.ts` (los huecos de la voz en off) · `cierre-069.ts` (la tarjeta) · `musica-069.ts` (la curva de la canción).
> Las revisiones anteriores están guardadas con su código y su prueba: rev. 1 («We Are» desde 2:04, 31 planos, 20 de la boda) en `rev1-we-are/`, rev. 2 («Children») en `rev2-children/`, rev. 3 («Softly») en `rev3-softly/` y rev. 4 («We Are» desde 2:04 con el final de fuego) en `rev4-we-are-meseta/`; las pruebas, en `pruebas-720p/`.

**fps de la comp:** 30 → `frame = round(segundo × 30)`. Dura **2081 f (69,37 s)**. **QUIÉN MARCA EL TIEMPO: la canción.** «We Are» (Aleksey Chistilin), desde el segundo **2,0 de su pista** en el f0 (su comienzo, con el ostinato de piano): el frame `f` suena en el segundo `2 + f/30` y cada plano entra en un **golpe medido** (`proyectos/069/musica/golpes-musica-we-are.json`; `herramientas/golpes.mjs`). En `metraje-069.ts` lo que se escribe es el segundo de la canción en que acaba cada plano; los frames salen de ahí. Entradas: **corte** seco (lo que duele) · **disolver** (12 f; el plano entra ANTES de su `en` y es opaco en él: la disolvencia ACABA en el golpe; lo que fue).

## Qué cambió respecto a la revisión 8 (y por qué)

| Pedido de ellos | Qué se hizo |
|---|---|
| «Antes del video dejaste una imagen, remuévela y pon el video que agregaste unos segundos antes» | La imagen era la foto de las cabañas (`c07`, 1,2 s entre el primer video de ustedes y la serenata): sale, y **la serenata entra justo tras ellos dos (0:15,9, a corte en el golpe de 11,3 dB de 17,865 s de la pista)** en vez de a 0:17. Sigue desde el segundo 23 del clip y acaba donde acababa (0:21,9, golpe de 4,8 dB): dura **6,1 s** (de 23,0 a 29,1 s del clip, hasta que la cámara llega a los mariachis). Quedan 4 planos de la boda (con la serenata) y 11 del lugar |

## Qué cambió respecto a la revisión 7 (y por qué)

| Pedido de ellos | Qué se hizo |
|---|---|
| «Después de 0:17 cambia las imágenes por el video `/Volumes/SSK SSD/Boda/Videos/Finales/Serenata.mp4` en el 0:23» | Aclarado con ellos: **del 0:17 al 0:22** se sustituyen las imágenes por la serenata de su boda, **desde el segundo 23 del clip** (de noche, la cámara avanza por el patio con las luces y las palapas), **sin su sonido**. Cae en el golpe de 5,4 dB de 0:17,0 y el de 4,8 de 0:21,9 (4,9 s). La foto de las cabañas se queda 1,2 s antes; el salón (`antes-sala`) sale; el muro quemado entra después (1,1 s) y los bomberos siguen entrando en el 0:23 (golpe de 8,4 dB). `Serenata.mp4`: 1080×1920 · 30 fps · 68 s, copia en `original/clips/serenata.mp4` (sha `25360909`) normalizada a 1296×2304 mudo. La serenata cuenta como «boda» (4 planos) y el lugar baja a 12. **Con esto la final exportada de la rev. 7 queda desfasada: hay que re-exportar** (y desde la rev. 9, la serenata entra en el 0:15,9 y no en el 0:17) |

## Qué cambió respecto a la revisión 6 (y por qué)

| Pedido de ellos | Qué se hizo |
|---|---|
| «Utiliza la misma fuente para el texto al final y resúmelo persuasivamente» | **Una sola fuente, Montserrat**, en toda la tarjeta (antes «PERO JAMÁS EL AMOR QUE ALLÍ NACIÓ» iba en Playfair Display cursiva). El párrafo de 16 palabras del guion («Cada aporte, cada gesto y cada vez que compartes esta historia nos ayuda a reconstruir este sueño.») se resume en una orden y su porqué: **«Aporta. Comparte.»** (ámbar, 66 px) + «Ayúdanos a reconstruir este sueño.» (gris, 38 px). Las frases del fuego y del amor y la firma «Unidos por Botswana. Unidos por Nelson.» son del guion y no se tocan. Como hay menos que leer, la orden entra a los 136 f (antes 142) y los datos de aporte a los 166 (antes 178): todo en pantalla a los 180 f y 4,0 s de cuadro completo (antes 3,6) |

## Qué cambió respecto a la revisión 5 (y por qué)

| Pedido de ellos | Qué se hizo |
|---|---|
| «Cambia la imagen de la playa en el 0:27 por `a7c39420-….MP4`» | El 0:27 caía en la foto de la ceremonia en la playa al atardecer (`b01`, `c11`, de 26,6 a 29,7 s). `a7c39420` es `inc03` (el incendio de la palapa, 6,9 s; mismo archivo, sha `a36813e4`): el plano pasa a ser un clip de 3,1 s (`inc03` de **2,0 a 5,1 s**; el tramo de 1,0 a 1,9 s ya es el `c03`) que entra **a corte** en el golpe de 10,9 dB de 28,6 s. La boda queda en 3 planos (beso, abrazo, arena) y el lugar sube a 13. «El amor que nació aquí» ya no lleva imagen de la boda: suena sobre las llamas |

## Qué cambió respecto a la revisión 4 (y por qué)

| Pedido de ellos | Qué se hizo |
|---|---|
| «Empieza la música desde el segundo 2 del video, para que empiece con el piano» | Se confirmó con ellos: **«We Are» desde el segundo 2 de su pista** (su comienzo, con el piano) en vez de desde 2:04 (donde arrancaba su sección orquestal fuerte). Es un ostinato de piano con acentos de 5-15 dB cada 0,4-0,8 s, sin la caída de 11 dB en el corte al incendio ni la meseta de −9 LUFS de la rev. 4: la música ya no cuenta la historia por sí sola y no sube al final (la zona alta de la pista, de 18 a 42 s, cae en la escena del lugar; la baja, de 44 a 70 s, bajo el mensaje final) |
| «…y de ese modo acortemos el hook y las imágenes de nosotros» | **Hook de 8,3 a 7,1 s** y las fotos felices de **3 (5,0 s) a 2 (3,6 s)**: el beso y el abrazo; el corte al incendio cae en el golpe de 11,3 dB de 5,56 s. El fuego dura 3,6 s (0,9 · 1,1 · 1,6 s) en vez de 3,3 |
| (antes) Final = el fuego; menos boda y más lugar; MOV 1 con zoom | Se mantienen: `inc01` (la columna de humo) y `lle01` (el arco «BOTSWANA» ardiendo) como últimos planos; la boda (en la rev. 5 eran 4 planos —beso, abrazo, ceremonia y arena—; en la 6, 3) frente a 13 del lugar; MOV 1 recortado a ellos |

## La forma de la canción y de la pieza

| Segundo de la canción | Frame | Sonoridad | Qué pasa en la pieza |
|---|---|---|---|
| 2 – 5,56 | 0 – 107 | ostinato de piano (−16 LUFS) con golpes de 10-11 dB cada 0,8 s | el beso y el abrazo: las dos fotos felices (golpes de 9,5 y 11,3 dB) |
| **5,56** | **107** | **golpe de 11,3 dB** | **el corte seco al incendio** |
| 5,6 – 9,1 | 107 – 214 | piano con acentos de 7-12 dB cada 0,9-1,1 s | la palapa, la llama del árbol y los tejados |
| 9,145 – 17,865 | 214 – 476 | piano (−15…−9 LUFS), golpes de 13,4 y 11,3 dB en los extremos | el MOV 1: su voz sale por encima (la música baja a −26) |
| 17,9 – 39,4 | 476 – 1123 | la zona alta de la pista (−11 LUFS de media; −8 a los 18 y 26 s) | el lugar como era (cabañas, salón), a corte el lugar quemado en el golpe de **12 dB** de 22,78 s, el amor que nació aquí |
| 39,4 – 48,2 | 1123 – 1386 | −14 LUFS | el MOV 2 |
| 48,2 – 61,4 | 1386 – 1781 | zona baja (−18 LUFS) con golpes de 7-14 dB | el mensaje final: la arena, los costales (golpe de **14,2 dB**), **el fuego** (8,5 dB) y **el arco** (7,8 dB) |
| 61,4 – 71 | 1781 – 2081 | −18 LUFS, sin golpes | la tarjeta: los textos se leen; la música se apaga |

## Mapa maestro

Una fila por plano. «Fuente» es el archivo normalizado de `remotion/public/botswana-069/`; `desde` va en segundos del clip. «Golpe» es el que sostiene la **salida** del plano (segundo de la canción; el siguiente plano entra en él). Cortes y entradas ≥ 4 dB; el corte al incendio y el lugar quemado, ≥ 9; el fuego del final, ≥ 8,5.

### Escena 1 · De la felicidad al dolor (0–214 · 0:00–0:07,1) — voz: John, hueco `john-1` (f6–f208)

| frames | s | plano | fuente | entra | sale en el golpe | dur |
|---|---|---|---|---|---|---|
| 0–60 | 0,00–2,00 | `c01-beso` | `a03` (boda) | corte (f0; el piano ya suena; primer acento de 10 dB en el f13) | 4,000 (9,5) | 60 |
| 60–107 | 2,00–3,57 | `c02-abrazo` | `a06` (boda) | corte | **5,560 (11,3)** | 47 |
| **107–133** | 3,57–4,43 | `c03-incendio-palapa` | `inc03` desde 1,0 s | **corte seco, en el golpe de 11,3 dB** | 6,445 (6,8) | 26 |
| 133–167 | 4,43–5,57 | `c04-incendio-arbol` | `inc02` desde 1,3 s | corte | 7,555 (11,7) | 34 |
| 167–214 | 5,57–7,13 | `c05-incendio-azotea` | `inc01` desde 0,6 s | corte, **sale a negro 8 f** | 9,145 (13,4) | 47 |

La frase de John (≈ 7,5 s a ritmo natural) tiene 6,7 s de hueco: hay que leerla más ágil o recortarla. El corte al incendio cae hacia «…nuestra vida» y «Y hoy» suena ya sobre el fuego.

### Escena 2 · Lo que realmente representa (214–476 · 0:07,1–0:15,9) — voz: la de ellos, en el MOV

| frames | s | plano | fuente | entra | sale en el golpe | dur |
|---|---|---|---|---|---|---|
| 214–476 | 7,13–15,87 | `c06-juntos-caminan` | `mov1` (recortado a ellos) desde **11,74 s**, zoom 1,2 → 1,0 | corte (13,4) | 17,865 (11,3) | 262 |

Recortado a su voz: primera sílaba a los 11,81 s del MOV (f216), última a los 20,41 s (f474); el plano arranca 0,07 s antes («En») y acaba 0,06 s después de «familia» (20,47 s).

### Escena 3 · El lugar: lo que fue, lo que quedó y lo que el fuego no puede destruir (476–1123 · 0:15,9–0:37,4)

Parte A, «el lugar antes y después» — voz: Isabella, hueco `isabella-1` (f491–f716).

| frames | s | plano | fuente | entra | sale en el golpe | dur |
|---|---|---|---|---|---|---|
| **476–658** | 15,87–21,93 | `c08-serenata` | **`serenata`** (la serenata de su boda, de noche) desde **23,0 s del clip** (hasta 29,1 s), sin su sonido | corte en el golpe de 11,3 dB, justo tras el MOV 1 | 23,925 (4,8) | 182 |
| 658–691 | 21,93–23,03 | `c09-despues-muro` | `quemado-muro` (foto de 12 MP) | corte (4,8) | 25,020 (8,4) | 33 |
| 691–798 | 23,03–26,60 | `c10-bomberos` | `bom01` desde 10 s | corte (8,4) | 28,595 (10,9) | 107 |

Parte B, «lo que el fuego no puede destruir» — voz: John, hueco `john-2` (f726–f1071). Ninguna imagen de la boda (rev. 6): las llamas de la palapa bajo «el amor que nació aquí» y tres planos más del lugar quemado.

| frames | s | plano | fuente | entra | sale en el golpe | dur |
|---|---|---|---|---|---|---|
| 798–891 | 26,60–29,70 | `c11-incendio-llamas` | `inc03` desde **2,0 s** (la palapa y el árbol en llamas; antes aquí, la foto de la ceremonia en la playa, `b01`) | **corte en el golpe de 10,9 dB** | 31,700 (7,1) | 93 |
| 891–999 | 29,70–33,30 | `c12-cocina` | `des07` desde 29,5 s | corte (7,1) | 35,285 (10,4) | 108 |
| 999–1123 | 33,30–37,43 | `c13-estructura` | `bomberos-estructura` (foto de 12 MP) | corte (10,4) | 39,435 (7,8) | 124 |

### Escena 4 · La fuerza de estar unidos (1123–1386 · 0:37,4–0:46,2) — voz: la de ellos, en el MOV

| frames | s | plano | fuente | entra | sale en el golpe | dur |
|---|---|---|---|---|---|---|
| 1123–1386 | 37,43–46,20 | `c14-juntos-unirnos` | `mov2` desde **5,91 s**, zoom 1,0 → 1,05 | disolver (acaba en 7,8) | 48,195 (8,4) | 263 |

Recortado a su voz: primera sílaba a los 6,01 s del MOV (f1126), última a los 14,45 s (f1379); arranca 0,10 s antes y acaba 0,23 s después de «construirlo» (14,68 s).

### Escena 5 · El mensaje final (1386–1781 · 0:46,2–0:59,4) — voz: John `john-3` (f1390–f1560) e Isabella `isabella-2` (f1566–f1757)

| frames | s | plano | fuente | entra | sale en el golpe | dur |
|---|---|---|---|---|---|---|
| 1386–1460 | 46,20–48,67 | `c15-arena` | `b11` (**boda**: «unir nuestros corazones») | disolver (acaba en 8,4) | 50,650 (14,2) | 74 |
| 1460–1558 | 48,67–51,93 | `c16-costales` | `des07` desde 45,3 s | **corte en el golpe de 14,2 dB (el más fuerte)** | 53,920 (8,5) | 98 |
| **1558–1673** | 51,93–55,77 | `c17-incendio-final` | **`inc01` desde 6,0 s** (la columna de humo y las llamas) | **corte, en el golpe de 8,5 dB** | 57,770 (7,8) | 115 |
| **1673–1781** | 55,77–59,37 | `c18-arco-botswana` | **`lle01` desde 28,65 s** (el arco «BOTSWANA» ardiendo), **sale a negro 12 f** | corte (7,8) | 61,360 (5,9) | 108 |

### Tarjeta final (1781–2081 · 0:59,4–1:09,4)

| frames | plano | fuente | entra | golpe | dur |
|---|---|---|---|---|---|
| 1781–2081 | `c19-tarjeta` | `tarjeta-oscura.png` | corte (viene de negro) | 61,360 (5,9) | 300 |

Escalera (frames absolutos = 1781 + el de `cierre-069.ts`; rev. 7: texto en una sola fuente y párrafo resumido): fuego **1789** · amor **1833** · corazón **1855** · filete y firma **1893** · «Aporta. Comparte.» + «Ayúdanos a reconstruir este sueño.» **1917** · aportes **1947** · todo en pantalla a **1961** (se queda 4,0 s).

**Cuenta final:** 4 planos de la boda (c01, c02, c08 —la serenata—, c15) · 11 del lugar (incendio: c03, c04, c05, c11, c17, c18; después: c09, c10, c12, c13, c16); falta el id `c07` (la foto de las cabañas, retirada en la rev. 9) · 2 de ellos dos (MOV) · la tarjeta. En tiempo: la boda 12,1 s, el lugar 31,5 s, ellos dos 17,5 s.

## Sonido

| frames | qué suena | cómo |
|---|---|---|
| 0–2081 | **«We Are» desde el segundo 2 de su pista**, entera, sin recortar ni estirar | `musica-1…12` (ffmpeg no admite una envolvente con más de ≈ 80 valores: se parte en trozos consecutivos de la misma canción, sin hueco ni solape); `entra: 1` en el f0 para quitar el clic de entrar a media nota |
| mezcla | **≈ −14,9 LUFS** la música sola en la escena del lugar (la zona alta de la pista) | ganancia base −3,5 dB (la zona alta está a −11,4 LUFS); el resto sale de la propia canción: el arranque con el piano −19, el MOV 2 −17, el mensaje final y la tarjeta −21 |
| mezcla | **−26 LUFS** bajo cada voz | la envolvente baja la música lo que haga falta (bajo los dos MOV baja del orden de 10 dB) con una bajada de coseno de 10 f que ACABA antes de la primera palabra, 6 f de sostenido y una subida de 18 f |
| 216–474 | voz de ellos (`mov1-voz.wav`) | tramo `voz-mov1`; −15,1 LUFS, pico −2,0 dBFS; el WAV es silencio fuera de su frase |
| 1126–1379 | voz de ellos (`mov2-voz.wav`) | tramo `voz-mov2`; ídem |
| 6–208 · 491–716 · 726–1071 · 1390–1560 · 1566–1757 | **huecos** de la voz en off (`john-1`, `isabella-1`, `john-2`, `john-3`, `isabella-2`) | `voz-069.ts` → `audio-069.ts` cuando llegue cada `<id>.wav`; **al llegar, la música se ducka sola bajo ella** |
| 1841–2079 | la música se apaga | 2 s bajo la tarjeta y curva de coseno hasta cero 2 f antes del final |

Los MP4 van MUDOS (R16): el incendio trae gritos y el vídeo de la fiesta, su música. **Sin efectos de sonido**: el corte al incendio lo marca la propia canción (golpe de 11,3 dB).

## Cuando lleguen las voces (receta)

1. Grabar las cinco frases (texto en `voz-069.ts` y en `proyectos/069/voz/LEEME.md`) y dejarlas en `proyectos/069/voz/` como `john-1`, `isabella-1`, `john-2`, `john-3`, `isabella-2` (wav, mp3 o m4a).
2. `node proyectos/069/normalizar.mjs --voz` — a −15 LUFS con limitador, copia a `public/` y mide la duración de cada una.
3. `node proyectos/069/revisar-069.mjs` — dice si cada locución CABE en su hueco y si la música queda a ≤ −24,5 LUFS bajo ella; si no cabe, se mueve el corte (siempre a otro golpe: `pega` en `voz-069.ts` dice cuál), nunca la voz. **`john-1` es la más justa y probablemente no cabrá tal cual**: la escena 1 dura 7,1 s (por pedido de ellos) y la frase entera es ≈ 7,5 s; hay que leerla más ágil o recortarla (p. ej. «En este lugar fuimos muy felices… Y hoy, verlo así, nos parte el corazón.»).
4. Transcribir con `--palabras` y pegar los cortes a sus palabras («…nuestra vida» en el f107 de la escena 1; «el amor que nació aquí» hacia el f830 de la 3, sobre las llamas del `c11`).
5. Subtítulos editoriales para TODA la pieza (las voces en off y los dos MOV): R30.
6. Datos de aporte en `APORTES.lineas` de `cierre-069.ts` (hasta 4 líneas de 30 caracteres).

## Pendientes que bloquean la final (`node proyectos/069/revisar-069.mjs --final` los marca)

- Las 5 locuciones (y decidir cómo queda la frase de John con un hook de 7,1 s).
- La información oficial para realizar aportes.
- Confirmar «Botswana» con *t* (el guion de ellos dice «Boswana» en tres sitios).
- Dos palabras de la voz del MOV 2 sin oír: Whisper oyó «la **vía** golpea aquello que **ama**»; casi seguro es «vida» y «amamos» (R31). No afecta al montaje —no hay subtítulos—, sí cuando los haya.
- **La canción no tiene licencia verificada.** Es de la biblioteca del estudio (`archivos/musica/`, las pistas son comerciales y el registro dice que ninguna tiene licencia comprobada) y las plataformas identifican la música por huella. «We Are» está reservada por la V16 de Luxur (Casa Campestre, 032): se declara aquí y en `registro-de-uso.md` que se usa TAMBIÉN en esta pieza personal. Para publicar, o se comprueba la licencia o se publica con el audio de la plataforma encima (`HAY_MUSICA = false` en `audio-069.ts`: la pieza sale con las voces solas).
- **Los clips del incendio y del lugar son de mensajería (464×832) y se ven blandos a pantalla completa**: no se les pide zoom (≤ 1,04). Los dos planos finales (`inc01` y `lle01`) son precisamente de esos: si ellos o Nelson tienen los originales del incendio, se cambian por los buenos con la misma receta.
- **Del último plano**: la silla del fondo y el cielo anaranjado se ven bien, pero «BOTSWANA» se corta por la derecha en `lle01` (el arco es más ancho que el cuadro de quien grabó).
- **El final no sube de volumen**: desde el segundo 2 de la pista el mensaje final y la tarjeta caen en la zona baja de la canción (−21 LUFS con la ganancia base). Si quieren un cierre con más cuerpo, se puede saltar a la parte fuerte de la pista (a partir de 2:42) al acabar el MOV 2, con un corte de música en un golpe.

## Exportación

`node proyectos/069/herramientas/exportar-final.mjs --sin-voces` → `proyectos/069/finales/botswana-069-final-SIN-VOCES.mp4` (1080×1920 · 30 fps · BT.709 · CRF 16 · AAC 320k, audio alineado). **Sin las 5 locuciones y con el rótulo «[Información oficial para realizar aportes]»: no es para publicar.** Cuando estén las voces y los datos: `node proyectos/069/herramientas/exportar-final.mjs` (la puerta `--final` tiene que pasar) → `botswana-069-final.mp4`. El render va en tramos de 400 f, con `--concurrency=2` y la caché de vídeo acotada, y el script PARA si quedan menos de 1 GiB libres: con la memoria llena el sistema usa swap en el mismo disco y un render a toda marcha lo vació (ver `aprendizajes.md`). Se re-exportó tras la rev. 9 (serenata).
