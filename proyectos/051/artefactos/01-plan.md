# 01 · Plan narrativo — proyecto 051 · Tierra Grata Bosque Santo (El Poblado), apartamento en ARRIENDO, V33 del registro («VEN, TE MUESTRO»; réplica de `videos editados/01.mp4`, SIN locución y con el guion nuevo en pantalla)

> Paso 1 de 3. Escrito con el reparto de las réplicas (`proyectos/044/reparto-051-053.md`, §1b, §2, **§5 y §5a**), el catálogo del material (`proyectos/044/catalogo-material.md`), las skills `recorrido-luxur`, `ficha-luxur` y `portada-luxur` y la pieza más reciente con los recorridos anamórficos bien normalizados (047, 050), y **antes** del primer render. Siguiente: [02-layout.md](02-layout.md).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Pedido | «Monta el proyecto 051 (V33, «Ven, te muestro»): la RÉPLICA de `videos editados/01.mp4` (64,0 s) con las mismas tomas y el mismo texto, en el formato del canal y en sus DOS formatos (orgánico y con ficha).» Una de las tres sesiones (051-053) que replican los tres vídeos que otro editor hizo el 15-sep con el material del 2-sep (encargo del usuario, 2026-10-20: *«Analiza los vídeos que hay en `videos editados` y replícalos con las mismas tomas, pero con los 2 formatos. Selecciona música diferente a los 6 pasados»*). |
| **Cambio de encargo (2026-10-20, después del primer montaje)** | El usuario decidió: *«crea el vídeo sin la voz en off; cuando esté listo me dices para subirlo; y aprovechando esto cambiamos el guion a algo más impactante que resalte las plusvalías del apartamento: aseo semanal incluido, acompañamiento personalizado, acceso a chef privado, alquiler de transporte y la mejor asesoría de la ciudad»* (reparto §5). Por eso: **SIN locución** (la del original no existía como archivo: ya no hay nada que resolver) y **un rótulo EN PANTALLA por tramo** con el guion de §5a, en las letras del texto editorial del canal y sincronizado a los planos y a los golpes de la música. Se conserva el hook a cámara con su voz en directo. El primer montaje (con una voz guía de macOS y la locución subtitulada) está en el commit `3763e9d`. |
| Numeración | **V33 / 051.** La V34 (052) y la V35 (053) son las otras dos réplicas, en worktrees hermanos. Las V27-V32 (045-050) son los seis reels de arriendo ya en main. |
| La propiedad y la ficha | Apartamento amoblado de 113 m² en Tierra Grata Bosque Santo, El Poblado (Medellín), a pocos metros de la Av. Las Palmas. Ficha de la web (leída el 2026-10-19): **ARRIENDO** · COP 14.800.000 al mes · 2 habitaciones · 2 baños · balcón con **jacuzzi privado** · la unidad: carril de nado, zonas húmedas, gimnasio, Social Kitchen, coworking… Lo que prometen los rótulos (aseo semanal, acompañamiento, chef, transporte, asesoría) lo dio el usuario (y Isabella dijo el aseo, el acompañamiento, el chef y el transporte el 17-oct); la ficha no lo dice. **Ninguno dice que el chef o el transporte vayan incluidos en el canon**: el rótulo «Aseo semanal incluido» es el único «incluido». |
| El original | `videos editados/01.mp4`: 1080×1920, HEVC, 30 fps, 64,0 s, AAC estéreo; subtítulos automáticos en minúscula sobre el recorrido y una locución en off continua con música antigua debajo. Hecho el 15-sep con el material del 2-sep. **No es del sistema.** |
| Material | TODO del 2-sep (`…/Apartamento - Tierra Grata - Las Palmas/Videos/`): `1 Hooks/Img 9508.mp4` (HK05, el hook), `4 Recorrido/` (RC01, RC05, RC10, RC11, RC12, RC13, RC16, RC20, RC21, RC22) y `5 Cta/Img 9492.mp4` (CT04, el último plano), copiados a `proyectos/051/original/` con el CÓDIGO del catálogo. sha256 en `normalizar.mjs`. **ANAMÓRFICO** (1920×1080, SAR 81:256, DAR 9:16 = verticales de 608×1080 comprimidos a lo ancho): se escalan ENTEROS a 1296×2304 con `setsar=1`, sin recorte (catálogo §7). Isabella lleva la chaqueta de flores del 2-sep. |
| Composición | `Recorrido051` · 1080×1920 · **30 fps** · **1437 f (47,9 s)**: 4,2 s de hook, 36,7 s de recorrido con rótulos, 7,1 s de CTA (4,6 s de imagen + la tarjeta de 2,5 s). Dentro de los 55 s del formato (el original dura 64 s: los planos se RECORTAN al ritmo de lectura, no se quitan). |
| Formato | 9:16 vertical · `recorrido-luxur` adaptado a una réplica sin locución: **hook (HK05) · recorrido con un rótulo por tramo · CTA (Isabella muda, con su rótulo) · tarjeta oscura**. Dos entregas: **orgánico** (`051-recorrido.mp4` CRF 12 + CRF 16 + `.srt` + portada + caption) y **funnel** (la versión con ficha, `051-recorrido-ficha.mp4`, **SIN rótulos ni subtítulos**: solo la ficha y la tarjeta, como manda `ficha-luxur`). |
| Marca / texto | Luxur, texto **editorial** (abajo, 90 %, cursiva 8 px menor): el hook dicho (3 bloques) y los 10 rótulos del usuario TAL CUAL, uno a la vez, de 3-4 s, una palabra acentuada por rótulo; **la única cifra es «113 m²»**; **sin sello**; cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com`. Sin SFX. |
| Música | ***Ludovico Einaudi - Einaudi Fly*** (`archivos/musica/`, sha `a7e0695e`; reservada para esta pieza; la alternativa del reparto, *Deep Breath*, no hizo falta). Piano en Do# menor, 4:41, 112 BPM, **sin pulso** (golpes de 6-13 dB); final natural de −14 a −30 LUFS entre el 261,0 y el 265 s. **Pesa más: solo baja bajo el hook.** Entrada en 213,23 s para que casi todos los cambios caigan en un golpe y la caída natural caiga sobre la tarjeta. Medida, no oída; licencia sin verificar. Ver `audio-051.ts`. |
| Destino | Reels · Shorts · TikTok (orgánico) · Meta Ads / feed 1:1 (funnel). |
| Presentadora | Isabella Cadavid. |

## Qué es una réplica y qué hereda (y qué no)

**Replicar = las mismas tomas en el mismo orden** (reparto §1) **con el guion nuevo del usuario en pantalla**. Del original se hereda: el orden de los planos, el hook a cámara abriendo la pieza y los datos del apartamento que enseñan los planos. Del canal se pone: los rótulos editoriales, el color por plano, la música de la reserva, la voz del hook tratada a −15 LUFS, el cierre con la tarjeta oscura (sin sello) y las dos versiones.

Las **excepciones al formato** que esto obliga (declaradas en `revisar-051.mjs`): (1) abre con Isabella hablando (excepción a la regla fija 1, como el 021, el 023 y los 046/048/050); (2) no hay los seis bloques sino tres (2 · 3 · 6); (3) el texto del recorrido son **rótulos sin voz debajo** (`SIN_VOZ`, con su propia comprobación: uno a la vez, 2,4-4,4 s, en un golpe y con el texto del usuario tal cual); (4) el recorrido admite `velocidad` ×1,5 en RC01 (el original la acelera ×1,9); (5) los cambios caen en golpes de la canción, que no tiene pulso (golpes de 6,1-9,1 dB, no de ≥ 10).

## Los planos del original, comprobados contra los clips (hojas de contactos a su 9:16 real + correlación de fotogramas)

El reparto da una lectura aproximada (§1b); esta es la medida (cada plano del original cotejado fotograma a fotograma con todos los clips del 2-sep; la tabla de `combinaciones.md` la recoge):

| s (original) | Qué enseña | Clip y tramo del original | Cómo lo usa el original | Qué hace la réplica (rótulo) |
|---|---|---|---|---|
| 0,0-4,9 | Isabella camina hacia cámara por el balcón con la vista | HK05 26,2-30,2 s | empieza en la SEGUNDA vez que ella dice «Deseas…» (26,4 s): la primera tentativa (24,7 s) fue un error y el original no la usa | **UN plano de HK05**, 26,1-31,07 s, imagen y voz a la vez, desde el segundo «Deseas» (hook dicho, con su subtítulo) |
| 4,9-10,4 | de la isla de la cocina a la sala con la palma | RC01 0-8,4 s | acelerado ×1,9 | RC01 0-7,35 s a ×1,5 — «113 m² **amoblados**, listos para ti» |
| 10,4-21,6 | el cielo, las torres y la ciudad hasta el jacuzzi | RC10 0-10,8 s | 1:1 | RC10 2,8-6,53 s — «En Las Palmas, con la **ciudad** a tus pies» |
| 21,6-26,6 | el jacuzzi privado de cerca, que se aleja hacia la ciudad | RC21 11,1 → 7,6 s **AL REVÉS** y ampliado ×1,35 | reproducido hacia atrás | RC21 6,3-11,0 s **hacia delante** — «Tu **jacuzzi** privado en el balcón» |
| 26,6-34,2 | la alcoba: la cama → la pared del televisor | RC05 0,4-7,6 s | 1:1 | RC05 0,4-5,87 s — «Y lo que viene con él:» → «**Aseo** semanal incluido» |
| 34,2-37,6 | el bar con el neón, de noche | RC22 0-3,2 s | el clip entero | RC22 0,4-3,0 s — sigue «**Aseo** semanal incluido» |
| 37,6-45,0 | la sala a la hora azul | RC20 3,8-11,0 s | 1:1 | RC20 3,8-7,93 s — «**Acompañamiento** personalizado desde el día uno» |
| 45,0-50,0 | la piscina con los pinos | RC16 0-4,5 s y RC17 0-6 s | acelerado ×2 | RC16 0,4-3,9 s a ×1 (RC17 sale: bañistas) — «**Chef** privado cuando quieras» |
| 50,0-52,8 | el gimnasio (la pared a rayas) | RC13 0,2-2,6 s | 1:1 | RC13 0,4-2,47 s — «**Conductor** y transporte a tu medida» |
| 52,8-59,4 | la Social Kitchen con las lámparas verdes y el mural | RC11 0,2-6,8 s | 1:1 (sale gente al fondo) | RC11 0,4-2,5 s + RC12 0,6-4,07 s — sigue «Conductor…» y «La mejor **asesoría** de la ciudad» |
| 59,4-64,0 | **Isabella de pie, junto a la pared de listones y los armarios de madera, camina hacia cámara** | **NO ESTÁ EN EL MATERIAL** (el clip que lo tenga no está en `Videos/`) | — | **CT04** (`Img 9492`, la sala con la palma, camina hacia cámara) 3,0-7,57 s, MUDO — «**Escríbeme** y agenda tu visita» |

## El ángulo y el texto

**La idea en una línea:** este apartamento es para quien busca arrendar amoblado en Medellín: la pregunta que abre, el apartamento con su balcón y su jacuzzi privado y, escrito en pantalla, lo que viene con él.

**El texto** (reparto §5a, TAL CUAL, tuteo, sin exclamaciones):

| Cuándo | Qué | Texto |
|---|---|---|
| 0,0-4,2 s | Isabella (HK05, voz en directo, desde el segundo «Deseas») | ¿Deseas arrendar amoblado en Medellín? Ven, te muestro. |
| 1 · 4,2-8,2 s | rótulo sobre la cocina → sala | 113 m² **amoblados**, listos para ti |
| 2 · 9,1-13,2 s | rótulo sobre el cielo y la ciudad | En Las Palmas, con la **ciudad** a tus pies |
| 3 · 15,0-17,4 s | rótulo sobre el jacuzzi | Tu **jacuzzi** privado en el balcón |
| 4 · 17,5-20,5 s | rótulo sobre la alcoba | Y lo que viene con él: |
| 5 · 21,2-24,9 s | rótulo sobre la alcoba y el bar | **Aseo** semanal incluido |
| 6 · 25,6-29,4 s | rótulo sobre la sala azul | **Acompañamiento** personalizado desde el día uno |
| 7 · 29,7-32,9 s | rótulo sobre la piscina | **Chef** privado cuando quieras |
| 8 · 33,2-37,0 s | rótulo sobre el gimnasio y la Social Kitchen | **Conductor** y transporte a tu medida |
| 9 · 37,4-40,5 s | rótulo sobre la Social Kitchen | La mejor **asesoría** de la ciudad |
| 10 · 41,3-45,2 s | rótulo sobre Isabella (muda) | **Escríbeme** y agenda tu visita |

El precio de la propiedad (COP 14,8 M al mes) va en la versión con ficha y en el caption, no en el vídeo orgánico.

## Decisiones tomadas (y las descartadas)

- **El hook empieza en la SEGUNDA vez que Isabella dice «Deseas».** En HK05 ella se equivoca al empezar («Deseas», 24,74-25,30 s), para 1,1 s y dice la frase entera desde el 26,38 s («Deseas arrendar amoblado en Medellín? Ven, te muestro»). El original empieza ahí (su imagen es la del 26,2 s) y el usuario lo pidió expresamente (2026-10-20: «Isabella se equivoca al principio, empieza el video desde donde ella dice la segunda vez “deseas”»): un solo plano de HK05 del 26,1 al 31,07 s, imagen y voz a la vez, y la tentativa fallida no suena ni se ve. (La primera versión de la pieza dejaba «Deseas» como un plano de 1 s y saltaba 0,6 s: era una lectura equivocada del original, que no pega el audio sobre otro vídeo, sino que empieza después del fallo.) La primera palabra suena en el f8 y el primer subtítulo entra en el f7.
- **Los rótulos entran en un golpe de la música** (`musica/golpes-051.json`): el primer renglón de cada rótulo, y los cambios de plano, caen a ≤ 1 f de un golpe medido de 6,1-9,1 dB (la canción no tiene golpes de ≥ 10 en esa zona). **Se declaran dos sin golpe** (la entrada de la imagen de Isabella en el CTA y su rótulo): la canción no suena ni uno entre los 251,9 y los 258,6 s.
- **El jacuzzi y su rótulo van juntos**: RC21 llega 2 s antes con las luces de la ciudad; el rótulo «Tu jacuzzi privado en el balcón» entra en el golpe del f473, cuando la tina entra en cuadro (f468; entera hacia el f504).
- **Sin cifras salvo «113 m²»** (reparto §5): el hook no lleva ninguna. La puerta lo comprueba.
- **Disolvencias entre todos los planos del recorrido** (12 f), salvo el paso del hook a la cocina (a corte, como en el original): cada una ACABA en un golpe.
- **RC21 va hacia delante**, no al revés como en el original: el jacuzzi se descubre al girar (así se grabó).
- **RC17 no entra** (tres bañistas reconocibles a la izquierda); la Social Kitchen sale de RC11 hasta los 4,0 s (después, un hombre con gorra y portátil) y RC12 (una figura de ≈ 20 px). RC13 (gimnasio) lleva figuras diminutas al fondo.
- **El último plano**: ver arriba. Se eligió CT04 y no HK05 5-9 s (otro paseo hacia cámara, en el balcón) porque la 053 puede usar ese tramo y porque CT04 es otra sala, la de la entrada, como el original; no se eligió HK04 (`Img 9496`) porque en su tramo «puerta de entrada» (12-18 s) no sale Isabella: es el móvil en primera persona (el catálogo y el reparto lo decían de otra manera).
- **El orden del original manda sobre la sincronía texto-imagen**: «Y lo que viene con él:» cae sobre la cama y «Aseo semanal incluido» sobre la pared del televisor y el bar; «Chef privado» sobre la piscina y «Conductor y transporte» sobre el gimnasio, como pide el reparto §5a.

## Lo que NO se cuenta

Administración, contrato, qué se paga aparte, tiempos a ningún sitio y el precio dentro del vídeo orgánico: la ficha no lo dice y el original tampoco. Los rótulos no dicen que el chef o el transporte vayan incluidos en el canon.

## Estado y pendiente con el usuario

**Exportada el 2026-10-20** con el OK del usuario a la prueba (CRF 12 + CRF 16 + `.srt` + portada + versión con ficha + caption, copiados al SSD: `combinaciones.md`, «La final»). Queda:

1. **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto): «arrendar **amoblado** en Medellín» (HK05, 1,0-1,5 s del vídeo): la «a» se pega a «arrendar»; whisper la oye de cinco maneras y las vocales medidas con `formantes.py` dicen a-mo-bla-do. Si no es «amoblado», se cambia `h02` y se reexportan las tres piezas.
2. Lo declarado (ver arriba): **el último plano del original no está en el material** y lo sustituye CT04; RC21 hacia delante, RC01 a ×1,5, RC17 fuera; planos recortados (47,9 s en vez de 64); tramos repetidos con las seis piezas anteriores; la entrada del CTA sin golpe; imagen más blanda (todo anamórfico ×2,13, también Isabella); y que los rótulos prometen lo que la ficha no dice (lo dio el usuario).
3. La canción (medida, no oída; licencia sin verificar).
