# 01 · Plan narrativo — proyecto 051 · Tierra Grata Bosque Santo (El Poblado), apartamento en ARRIENDO, V33 del registro («VEN, TE MUESTRO»; réplica de `videos editados/01.mp4`)

> Paso 1 de 3. Escrito con el reparto de las réplicas (`proyectos/044/reparto-051-053.md`, §1b y §2), el catálogo del material (`proyectos/044/catalogo-material.md`), las skills `recorrido-luxur`, `ficha-luxur` y `portada-luxur` y la pieza más reciente con los recorridos anamórficos bien normalizados (047, 050), y **antes** del primer render. Siguiente: [02-layout.md](02-layout.md).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Pedido | «Monta el proyecto 051 (V33, «Ven, te muestro»): la RÉPLICA de `videos editados/01.mp4` (64,0 s) con las mismas tomas y el mismo texto, en el formato del canal y en sus DOS formatos (orgánico y con ficha).» Una de las tres sesiones (051-053) que replican los tres vídeos que otro editor hizo el 15-sep con el material del 2-sep (encargo del usuario, 2026-10-20: *«Analiza los vídeos que hay en `videos editados` y replícalos con las mismas tomas, pero con los 2 formatos. Selecciona música diferente a los 6 pasados»*). |
| Numeración | **V33 / 051.** La V34 (052) y la V35 (053) son las otras dos réplicas, en worktrees hermanos. Las V27-V32 (045-050) son los seis reels de arriendo ya en main. |
| La propiedad y la ficha | Apartamento amoblado de 113 m² en Tierra Grata Bosque Santo, El Poblado (Medellín), a pocos metros de la Av. Las Palmas. Ficha de la web (leída el 2026-10-19): **ARRIENDO** · COP 14.800.000 al mes · 2 habitaciones · 2 baños · balcón con **jacuzzi privado** · la unidad: carril de nado, zonas húmedas, gimnasio, Social Kitchen, coworking… El usuario ya publicó (y la locución del original repite) lo que la ficha no da: lavadora y secadora, cancha de squash, Spa Romano, zona de barbecue. Se repite tal cual: **son suyos** (reparto §1). |
| El original | `videos editados/01.mp4`: 1080×1920, HEVC, 30 fps, 64,0 s, AAC estéreo; subtítulos automáticos en minúscula sobre el recorrido y una **locución en off** continua con música antigua debajo. Hecho el 15-sep con el material del 2-sep. **No es del sistema.** |
| Material | TODO del 2-sep (`…/Apartamento - Tierra Grata - Las Palmas/Videos/`): `1 Hooks/Img 9508.mp4` (HK05, el hook), `4 Recorrido/` (RC01, RC05, RC10, RC11, RC12, RC13, RC16, RC20, RC21, RC22) y `5 Cta/Img 9492.mp4` (CT04, el último plano), copiados a `proyectos/051/original/` con el CÓDIGO del catálogo. sha256 en `normalizar.mjs`. **ANAMÓRFICO** (1920×1080, SAR 81:256, DAR 9:16 = verticales de 608×1080 comprimidos a lo ancho): se escalan ENTEROS a 1296×2304 con `setsar=1`, sin recorte (catálogo §7). Isabella lleva la chaqueta de flores del 2-sep. |
| Composición | `Recorrido051` · 1080×1920 · **30 fps** · **1978 f (65,9 s)**: 4,9 s de hook, 54,5 s de recorrido con locución, 6,5 s de CTA (4,5 s de imagen + la tarjeta de 2,0 s). |
| Formato | 9:16 vertical · `recorrido-luxur` adaptado a una réplica: **hook (HK05) · recorrido con la locución en off · CTA en off sobre Isabella · tarjeta oscura**. Dos entregas: **orgánico** (`051-recorrido.mp4` CRF 12 + CRF 16 + `.srt` + portada + caption) y **funnel** (la versión con ficha, `051-recorrido-ficha.mp4`, sin subtítulos). |
| Marca / texto | Luxur, texto **editorial** (abajo, 90 %, cursiva 8 px menor) de TODO lo que suena, en trozos de 1-4 palabras; **sin cifras en pantalla** («113 metros» se pinta «ciento trece metros»); **sin sello**; cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com`. Sin SFX. |
| Música | ***Ludovico Einaudi - Einaudi Fly*** (`archivos/musica/`, sha `a7e0695e`; reservada para esta pieza; la alternativa del reparto, *Deep Breath*, no hizo falta). Piano en Do# menor, 4:41, 112 BPM, **sin pulso**; final natural de −14 a −30 LUFS entre el 261,0 y el 265 s. Medida con `medir-pista.py`, no oída; licencia sin verificar. Ver `audio-051.ts`. |
| Destino | Reels · Shorts · TikTok (orgánico) · Meta Ads / feed 1:1 (funnel). |
| Presentadora | Isabella Cadavid. |

## Qué es una réplica y qué hereda (y qué no)

**Replicar = las mismas tomas en el mismo orden, con el mismo texto, en el formato del canal** (reparto §1). Del original se hereda: el orden de los planos, el texto de la locución, el hook a cámara abriendo la pieza, la duración (~64 s) y los datos que dice la voz. Del canal se pone: los subtítulos editoriales (en vez de los automáticos), el color por plano, la música de la reserva, la voz tratada a −15 LUFS, el cierre con la tarjeta oscura (sin sello) y las dos versiones.

Las **excepciones al formato** que esto obliga (declaradas en `revisar-051.mjs`): (1) abre con Isabella hablando (excepción a la regla fija 1, como el 021, el 023 y los 046/048/050); (2) dura 65,9 s (el formato pide ≤ 55); (3) la locución cubre todo el recorrido (el formato la limita al bloque 5); (4) no hay los seis bloques sino tres (2 · 3 · 6); (5) el recorrido admite `velocidad` ×1,5 en dos planos (el original acelera ×1,9 y ×2).

## Los planos del original, comprobados contra los clips (hojas de contactos a su 9:16 real + correlación de fotogramas)

El reparto da una lectura aproximada (§1b); esta es la medida (cada plano del original cotejado fotograma a fotograma con todos los clips del 2-sep; la tabla de `combinaciones.md` la recoge):

| s (original) | Qué enseña | Clip y tramo | Cómo lo usa el original | Qué hace la réplica |
|---|---|---|---|---|
| 0,0-4,9 | Isabella camina hacia cámara por el balcón con la vista | HK05 (`Img 9508`) 26,2-30,2 s | la voz de «Deseas» (24,7 s) pegada sobre el vídeo de 26,2 s, sin la pausa de 1,1 s | **DOS planos de HK05**: 24,5-25,5 s («¿Deseas») y 26,1-30,0 s («arrendar amoblado en Medellín? Ven, te muestro»), imagen y voz a la vez |
| 4,9-10,4 | de la isla de la cocina a la sala con la palma y las correderas | RC01 (`Img 9461`) 0-8,4 s | acelerado ×1,9 | RC01 0-8,25 s a ×1,5 |
| 10,4-21,6 | el cielo, las torres y la ciudad hasta el jacuzzi | RC10 (`Img 9509`) 0-10,8 s | 1:1 | RC10 0,4-10,7 s |
| 21,6-26,6 | el jacuzzi privado de cerca, que se aleja hacia la ciudad | RC21 (`Img 9537 (1)`) 11,1 → 7,6 s **AL REVÉS** y ampliado ×1,35 | reproducido hacia atrás | RC21 5,2-10,9 s **hacia delante**: de la ciudad al jacuzzi, que queda entero en «está aquí» |
| 26,6-34,2 | la alcoba: la cama → la pared del televisor | RC05 (`Img 9477`) 0,4-7,6 s | 1:1 | RC05 0,4-8,2 s |
| 34,2-37,6 | el bar con el neón, de noche | RC22 (`Img 9538`) 0-3,2 s | el clip entero | RC22 0,4-3,1 s |
| 37,6-45,0 | la sala a la hora azul: el panel curvo → el sofá → el ventanal | RC20 (`Img 9536`) 3,8-11,0 s | 1:1 | RC20 3,8-11,5 s |
| 45,0-50,0 | la piscina con los pinos | RC16 (`Img 9525`) 0-4,5 s y RC17 (`Img 9527`) 0-6 s | acelerado ×2 | RC16 0,6-8,6 s a ×1,5 (RC17 sale: bañistas) |
| 50,0-52,8 | el gimnasio (la pared a rayas) | RC13 (`Img 9516`) 0,2-2,6 s | 1:1 | RC13 0,4-3,2 s |
| 52,8-59,4 | la Social Kitchen con las lámparas verdes y el mural | RC11 (`Img 9513`) 0,2-6,8 s | 1:1 (sale gente al fondo) | RC11 0,4-4,0 s + RC12 (`Img 9514`) 0,6-3,6 s |
| 59,4-64,0 | **Isabella de pie, junto a la pared de listones y los armarios de madera, camina hacia cámara** | **NO ESTÁ EN EL MATERIAL** (el clip que lo tenga no está en `Videos/`) | — | **CT04** (`Img 9492`, la sala con la palma, camina hacia cámara) 3,0-7,5 s, MUDO |

## El ángulo y el texto

**La idea en una línea (la del original):** este apartamento es para quien busca arrendar amoblado en Medellín: la pregunta que abre, el apartamento recorrido con la voz de quien lo presenta, el balcón con el jacuzzi privado como «diferencial», las amenidades de la unidad y la invitación a escribir.

**El texto** (reparto §1b; whisper sobre el MP4 editado, corregido a mano donde era obvio):

| s (original) | Quién | Texto |
|---|---|---|
| 0,0-3,5 | Isabella (HK05, voz en directo) | ¿Deseas arrendar amoblado en Medellín? Ven, te muestro. |
| 4,9-14,2 | locución | Este espectacular apartamento de 113 metros, ubicado en Las Palmas, combina amplitud, comodidad y naturaleza en un solo lugar. |
| 15,2-22,7 | locución | Cuenta con dos habitaciones, dos baños, una amplia sala comedor, cocina integral y zona de ropas con lavadora y secadora. |
| 22,7-35,0 | locución | Y uno de sus mayores diferenciales está aquí: un balcón con jacuzzi privado, perfecto para relajarte, disfrutar una copa de vino o simplemente regalarte un momento de tranquilidad. |
| 39,7-50,4 | locución | Además, el proyecto cuenta con piscina, gimnasio, zonas húmedas, coworking, cancha de squash, Spa Romano, zona de barbecue y muchos espacios de bienestar. |
| 52,4-57,4 | locución | Todo esto en Las Palmas, uno de los sectores más privilegiados de Medellín. |
| 59,4-63,9 | locución (sobre Isabella, muda) | Escríbeme, agenda tu visita y descubre lo que es vivir con tu propio jacuzzi privado. |

El único precio de la propiedad (COP 14,8 M al mes) va en la versión con ficha y en el caption, no en el vídeo orgánico (el original tampoco lo dice).

## Decisiones tomadas (y las descartadas)

- **El hook, en dos planos del mismo clip.** El original quitó la pausa de 1,1 s entre «Deseas» (24,74-25,30 s de HK05) y «arrendar» (26,38 s) y pegó el audio sobre un vídeo que ya iba por el 26,2 s. Aquí son dos planos de HK05, imagen y voz a la vez, con un salto de 0,6 s en el vídeo (Isabella es pequeña al fondo del cuadro: apenas se nota). La voz de «Deseas» suena 2 dB más fuerte que el resto aun tras el compresor (−13,1 contra −15,1 LUFS): el plan se lo resta (`lufs`). La primera palabra suena en el f7.
- **«Ven, te muestro» → «Ven,» / «te muestro.»** con el acento en «te muestro»: la invitación, como el original (que lo subtitula en dos partes).
- **Los datos de la locución se repiten tal cual** (113 metros, lavadora y secadora, cancha de squash, Spa Romano, barbecue…): son del usuario (reparto §1).
- **Sin cifras en pantalla.** «113 metros» se pinta «ciento trece metros» (y la puerta lo comprueba: ni un dígito en ningún subtítulo). Lo que suena se alinea con `{de 113 metros,}`. (El original pinta «113m».)
- **Disolvencias entre todos los planos del recorrido** (12 f), salvo el paso del hook a la cocina (a corte, como en el original): *Einaudi Fly* no tiene pulso (golpes ≤ 9 dB), así que los cortes caen donde los pide la voz y el paseo, no en un golpe (R33).
- **RC21 va hacia delante**, no al revés como en el original: el jacuzzi se descubre al girar (así se grabó) y queda entero en «está aquí».
- **RC17 no entra** (tres bañistas reconocibles a la izquierda); la Social Kitchen sale de RC11 hasta los 4,0 s (después, un hombre con gorra y portátil) y RC12 (una figura de ≈ 20 px).
- **El último plano**: ver arriba. Se eligió CT04 y no HK05 5-9 s (otro paseo hacia cámara, en el balcón) porque la 053 puede usar ese tramo (el hook del 03 es «ella más lejos que en el 01») y porque CT04 es otra sala, la de la entrada, como el original; no se eligió HK04 (`Img 9496`) porque en su tramo «puerta de entrada» (12-18 s) no sale Isabella: es el móvil en primera persona (el catálogo y el reparto lo decían de otra manera).
- **La locución del original no existe como archivo** (reparto §3): hoy es una **voz guía** de macOS (`herramientas/voz-guia.py`, gratis y local, colocada en los segundos del original) para montar y enseñar la prueba. **El usuario decide** cómo se consigue la de verdad: (1) entrega los audios (van a `proyectos/051/voz/` y entran como clase `audio` en `normalizar.mjs`) o (2) se genera con la voz clonada de Isabella en ElevenLabs (**741 caracteres**, de pago: se confirma antes). Nunca se saca del MP4 editado (lleva la música vieja).

## Lo que NO se cuenta

Administración, contrato, qué se paga aparte, tiempos a ningún sitio y el precio dentro del vídeo orgánico: la ficha no lo dice y el original tampoco.

## Pendiente con el usuario

1. **Cómo se consigue la locución** (ver arriba): hasta entonces, la pieza lleva la voz guía de macOS, la puerta con `--final` falla y no se exporta nada.
2. El OK a la prueba (`pruebas-720p/051-recorrido.mp4`, 540×960) y a lo declarado: **la réplica dura 65,9 s** (el formato pide ≤ 55); **el recorrido, escalado ×2,13, algo más blando que Isabella (4K)**; **el último plano del original no está en el material** y lo sustituye CT04; **RC21 hacia delante** y RC01 y la piscina a ×1,5; **RC17 fuera**; tramos que se repiten con las seis piezas anteriores (la puerta 7b los lista).
3. **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto): «arrendar **amoblado** en Medellín» (HK05, ≈ 26,9-27,3 s de la fuente = 1,5 s del vídeo): la «a» se pega a «arrendar»; whisper la oye de cuatro maneras.
4. La canción (medida, no oída; licencia sin verificar).
