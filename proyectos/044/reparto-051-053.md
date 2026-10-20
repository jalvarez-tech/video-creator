# Reparto de las tres réplicas de Tierra Grata (arriendo) — proyectos 051-053 · V33-V35

> Escrito el 2026-10-20 por la sesión coordinadora (rama `claude/tierra-grata-promo-videos-0ead0e`). Encargo del usuario: *«Analiza los vídeos que hay en `videos editados` y replícalos con las mismas tomas, pero con los 2 formatos. Selecciona música diferente a los 6 pasados»*, cada vídeo en su sesión (Sonnet 5.5), como las piezas 045-050.
> El material está en [`catalogo-material.md`](catalogo-material.md) (códigos; **los clips del 2-sep son anamórficos: §7**). Las reglas, los dos formatos y el protocolo de sesión son los de [`reparto-045-050.md`](reparto-045-050.md) §1, §4 y §5: aquí solo va lo que cambia.

## 1. Lo que hay que replicar: tres vídeos del 15-sep-2026

`/Volumes/SSK SSD/Work/Propiedades Luxur/Apartamento - Tierra Grata - Las Palmas/videos editados/01.mp4 · 02.mp4 · 03.mp4` (1080×1920, HEVC, 30 fps, AAC estéreo 44,1 kHz; 64,0 · 77,6 · 56,4 s). Los hizo otro editor con el material del **2-sep** (Isabella con la chaqueta de flores, dentro del apartamento; recorrido anamórfico) y una **locución en off** continua, con subtítulos automáticos en minúscula sobre el recorrido. No son del sistema. **Replicar = las mismas tomas en el mismo orden, con el mismo texto, en el formato del canal** (subtítulos editoriales, cierre con la tarjeta oscura, sin sello) **y en los dos formatos** (reel + versión con ficha).

**Lo que se hereda de los originales y se declara:** duran 56-78 s (el formato pide ≤ 55 s: aquí manda la réplica), llevan voz en off larga (el formato la limita al bloque 5: aquí manda la réplica), y la voz dice datos que la ficha de la web no da pero el usuario ya publicó (lavadora y secadora, seguridad 24/7, cancha de squash, «completamente amoblado», «cocina totalmente equipada»): se repiten tal cual, porque son suyos.

### 1a. De dónde sale cada voz (medido el 2026-10-20)

| Voz | Está en | Cómo se usa |
|---|---|---|
| Hook del 01 «¿Deseas arrendar amoblado en Medellín? Ven, te muestro» | **HK05 `Img 9508.mp4`, ≈ 22,5-29,5 s** (Isabella camina hacia cámara en el balcón; whisper a +12 dB: «desearas arrendar a mogulado me yin, ven te muestro»). Los 0-9 s del clip no tienen esa frase | toma a cámara, voz en directo (medir la ventana con `onsets-voz.py`) |
| Hook del 02 «Antes de arrendar amoblado, pregúntate esto» | **HK04 `Img 9496.mp4`, 2-7 s** (sentada en el sofá). El resto del clip (8-52 s) es un paseo MUDO con el móvil: puerta de entrada (≈ 12-18 s), cocina (≈ 20-25 s), balcón (≈ 28-34 s), pelo y chaqueta | toma a cámara, voz en directo |
| Hook del 03 «¿Pagarías 14 millones al mes por vivir aquí?» | **no localizada como voz en directo**: la imagen es Isabella caminando en el balcón (HK05, otro tramo). En 9508 solo hay voz clara en 22,5-29,5 s (el hook del 01); en 5-7 s hay algo a −33 dB que whisper no descifra: **comprobarlo**; si no es la frase, es locución en off sobre su imagen | comprobar; probablemente off |
| CTA del 02 y del 03 «Si buscas más que un apartamento para vivir, escríbenos» | **CT05 `Img 9501.mp4`** (sentada en la silla de la sala, 7,2 s) | toma a cámara, voz en directo (la misma toma en las dos piezas: declarado) |
| CTA del 01 «Escríbeme, agenda tu visita y descubre lo que es vivir con tu propio jacuzzi privado» | la imagen es Isabella de pie junto a la puerta con la pared de listones (tramo mudo de 9496, ≈ 12-18 s); la voz es **locución en off** | off sobre su imagen |
| **La locución larga de los tres** («Este espectacular apartamento de 113 metros…», «¿Estás buscando simplemente un lugar donde dormir…?», «Imagina terminar tu día relajándote…») | **NO existe como archivo en el SSD** (la carpeta de la propiedad no tiene `Audios/`, a diferencia de otras, p. ej. `Apto Siempre Verde/Audios/*.wav`). Solo está mezclada con la música dentro de los MP4 editados | **ver §3: es la decisión que falta** |

### 1b. Los textos (transcripción whisper de los MP4 editados, corregida a mano donde era obvio; lo dudoso entre corchetes)

**01 · «Ven, te muestro» (64,0 s) → proyecto 051 / V33**

| s | Quién | Texto | Imagen del original (lectura por fotogramas; comprobar) |
|---|---|---|---|
| 0,0-3,5 | Isabella (HK05, 22,5-29,5 s) | ¿Deseas arrendar amoblado en Medellín? Ven, te muestro. | balcón con la vista, camina hacia cámara |
| 4,9-14,2 | off | Este espectacular apartamento de 113 metros, ubicado en Las Palmas, combina amplitud, comodidad y naturaleza en un solo lugar. | RC01 (cocina → sala) · terraza y cielo (RC10 / RC02) |
| 15,2-22,7 | off | Cuenta con dos habitaciones, dos baños, una amplia sala comedor, cocina integral y zona de ropas con lavadora y secadora. | ciudad desde el balcón (RC02/RC03) · jacuzzi privado con las torres (RC10 8-10,7 s o RC21) |
| 22,7-35,0 | off | Y uno de sus mayores diferenciales está aquí: un balcón con jacuzzi privado, perfecto para relajarte, disfrutar una copa de vino o simplemente regalarte un momento de tranquilidad. | jacuzzi (RC21 final) · alcoba (RC05, RC06) · alcoba con el televisor (RC08) |
| 39,7-50,4 | off | Además, el proyecto cuenta con piscina, gimnasio, zonas húmedas, coworking, cancha de squash, Spa Romano, zona de barbecue y muchos espacios de bienestar. | bar (RC22) · sala a la hora azul (RC20) · piscina (RC16, RC17) |
| 52,4-57,4 | off | Todo esto en Las Palmas, uno de los sectores más privilegiados de Medellín. | Social Kitchen (RC11, RC12) |
| 59,4-63,9 | off sobre Isabella | Escríbeme, agenda tu visita y descubre lo que es vivir con tu propio jacuzzi privado. | Isabella junto a la puerta (9496, tramo mudo ≈ 12-18 s) |

**02 · «Pregúntate esto» (77,6 s) → proyecto 052 / V34**

| s | Quién | Texto | Imagen del original |
|---|---|---|---|
| 0,0-2,6 | Isabella (HK04, 2-7 s) | Antes de arrendar amoblado, pregúntate esto. | sofá de la sala |
| 3,6-24,6 | off | ¿Estás buscando simplemente un lugar donde dormir, o un lugar donde realmente disfrutes vivir? Porque cuando eliges un apartamento amoblado, no estás pagando solamente por una cama, una sala y una cocina. Estás pagando por la comodidad de llegar a casa y sentir que todo tiene sentido. Y si vas a invertir en un arriendo premium, los detalles deben estar a la altura. | atardecer con las torres (RC21) · árboles (RC21 / RC10) · alcoba (RC05, RC06, RC08) · cocina (RC01) |
| 24,6-35,2 | off | Imagina terminar el día, salir al balcón, desconectarte en tu jacuzzi privado y disfrutar de un entorno rodeado de naturaleza, sin dejar de estar conectado con Medellín. | sala con la palma (RC02 inicio) · puerta del balcón (RC02) · balcón con las camas (RC02 final / RC03) |
| 35,2-41,6 | off | Aquí tienes dos habitaciones, dos baños y espacios pensados para vivir con amplitud y comodidad. | cielo y torres (RC03 / RC10) |
| 41,6-48,8 | off | Cuando quieres salir de casa, el proyecto te ofrece gimnasio, zonas húmedas, coworking, Spa Romano y espacios para compartir. | sauna (RC15) · **Isabella en la cocina** (9496, tramo mudo ≈ 20-25 s) · piscina (RC16) |
| 49,8-53,2 | off | ¿Para qué pagar un arriendo premium [si no lo puedes disfrutar]? | **bosque con hierba** (clip NO catalogado: buscarlo en los tramos mudos de 9496/9508; si no está, piscina RC17) · gimnasio (RC13) |
| 54,2-71,0 | off | Este apartamento en Las Palmas es para quienes quieren que su hogar sea mucho más que un lugar de paso: un espacio para descansar, trabajar, recibir invitados y disfrutar de una calidad de vida diferente. Un lugar donde vivir bien no sea un plan para después, sino parte de tu día a día. | gimnasio (RC13, RC14) · Social Kitchen (RC11, RC12) |
| 73,6-77,0 | Isabella (CT05) | Si buscas más que un apartamento para vivir, escríbenos. | sentada en la silla de la sala |

**03 · «¿Pagarías 14 millones?» (56,4 s) → proyecto 053 / V35**

| s | Quién | Texto | Imagen del original |
|---|---|---|---|
| 0,0-3,0 | Isabella (HK05, otro tramo) u off | ¿Pagarías 14 millones al mes por vivir aquí? | balcón con la vista, camina hacia cámara (ella más lejos que en el 01) |
| 3,0-13,5 | off | Imagina terminar tu día relajándote en tu jacuzzi privado, preparando un trago en tu propio hogar y disfrutando de la mejor vista de la ciudad de Medellín. | cielo y ciudad (RC10) · jacuzzi con las torres (RC10 8-10,7 s) · cocina (RC01) |
| 13,5-24,1 | off | Viene completamente amoblado: dos habitaciones, dos baños, cocina integral totalmente equipada y zona de lavandería con lavadora y secadora. Listo para mudarte. | sala con la palma (RC02) · puerta del balcón (RC02) · bar (RC22) · balcón con las camas (RC02 final) |
| 24,1-35,9 | off | Además, puedes disfrutar de excelentes amenidades: piscina, gimnasio, zonas húmedas, coworking, cancha de squash, zona de barbecue, salón social y zonas de bienestar. | torres (RC03) · cielo (RC10) · alcoba (RC05, RC06) |
| 35,9-47,4 | off | Y lo mejor es que cuentas con seguridad 24/7, la mejor ubicación en el sector de Las Palmas y la privacidad que buscas en un entorno natural. | alcoba con el televisor (RC08) · sala (RC04) · sala con el sofá (RC20 o RC04) |
| 47,4-53,3 | off | Todo en este apartamento está pensado para tu tranquilidad y comodidad. | piscina (RC16, RC17) |
| 53,3-56,3 | Isabella (CT05) | Si buscas más que un apartamento para vivir, escríbenos. | sentada en la silla de la sala |

(El 03 lleva un rótulo automático «ah pero los aviones están feos» sobre el bar, a los ≈ 20 s: es un error del subtitulado automático del original, no se replica.)

## 2. Las tres piezas (FIJO; la imagen la decide la réplica, la música la reserva este reparto)

| Proyecto · V | Nombre | Réplica de | Isabella a cámara | Canción (reservada; **distinta de las seis anteriores**) | Alternativa si no sirve |
|---|---|---|---|---|---|
| **051 · V33** | «Ven, te muestro» | `01.mp4` (64 s) | HK05 (22,5-29,5 s) · CTA en off sobre 9496 (puerta) | *Ludovico Einaudi - Einaudi Fly* (piano) | *Aleksey Chistilin - Deep Breath* |
| **052 · V34** | «Pregúntate esto» | `02.mp4` (78 s) | HK04 (2-7 s) · CT05 | *Armin van Buuren - Here For You (Piano)* | *Ludovico Einaudi - Experience (Live)* (tramo útil desde ≈ 250 s) |
| **053 · V35** | «¿Pagarías 14 millones?» | `03.mp4` (56 s) | HK05 (otro tramo, comprobar) u off · CT05 | *Softly (Judah Earl & Brandon Black)* (orquestal) | *Cornfield Chase* |

- La cifra «14 millones» del 03 va en pantalla como `$14.000.000`? **No**: Isabella dice «14 millones» y el canon es 14,8: el subtítulo pinta lo que dice («14 millones»), y la ficha de la versión con ficha pone el canon exacto ($ 14,8 M COP / MES). Se declara.
- El recorrido se repite entre las tres y con las seis anteriores (el original ya lo hacía): se declara cada tramo en `combinaciones.md`; aquí no hay aperturas ni clímax exclusivos.
- Los hooks a cámara abren la pieza (como en los originales): excepción a la regla fija 1, por réplica; **frame 0 = Isabella** en las tres.
- Subtítulos editoriales de TODO lo que suena (hook, locución, CTA), trozos de 1-4 palabras, como en 045-050; la única cifra en pantalla es la del hook del 03.
- Portada: `--locacion "EL POBLADO" --negocio renta`. Ficha: `tierra-grata` (sin cambios).

## 3. La locución: la decisión que falta (NO se resuelve sin el usuario)

La voz en off de los tres originales no existe como archivo. Tres caminos; **los dos primeros los decide el usuario** y el tercero no sirve:

1. **El usuario entrega los audios** de la locución (los del editor del 15-sep, o unos nuevos de Isabella con el micro de solapa): se copian a `proyectos/NNN/voz/` como WAV y entran como `audio` en `normalizar.mjs`, sin tratar (luego a −15 LUFS como las voces, `VOZ_TRATADA`).
2. **Se genera con la voz clonada de Isabella** (`node manuales/video-noticias/scripts/generar-vo.mjs proyectos/NNN/voz/off.txt --motor elevenlabs`; el `.env` del checkout principal tiene `ELEVENLABS_API_KEY`; hace falta su `voice_id`): **cuesta dinero y se confirma antes** (regla 6 de `AGENTS.md`): entre 600 y 1.000 caracteres por pieza. El texto es el de §1b, frase a frase, con una pausa clara entre frases.
3. Sacarla de los MP4 editados **no vale**: lleva la música antigua debajo, y el encargo es cambiar la música.

**Cada sesión hace TODO lo demás** (artefactos, material, planes, los planos de la réplica, la canción medida, los hooks y CTA a cámara con su voz, los subtítulos del hook y del CTA) y, al llegar a la locución, **pregunta al usuario cuál de los dos caminos** si él no lo ha dicho ya; mientras tanto deja el tramo de la locución con la música sola y los subtítulos previstos, y no exporta.

## 4. Diferencias de protocolo respecto de `reparto-045-050.md` §5

- `nuevo-recorrido.mjs NNN --herramientas-de 047` (la pieza más reciente con los recorridos anamórficos bien normalizados): su `normalizar.mjs` ya lleva la rama SDR correcta (`scale=1296:2304:flags=lanczos,setsar=1`, sin crop).
- Los tramos mudos de 9496 (puerta, cocina, balcón) y 9508 entran como `recorrido` (sin voz) aunque sean tomas de Isabella: en la receta, clase `recorrido` con su tramo.
- La locución entra como clase `audio` (`off`) con sus ventanas por frase; los subtítulos del off salen de `transcribir.mjs --palabras` sobre el WAV de la locución, nunca del MP4 editado.
- TMPDIR propio: `/private/tmp/remotion-NNN`. Enlaces a `node_modules` y `archivos/whisper` del checkout principal, como siempre. `.env` NO se copia ni se lee: `generar-vo.mjs` lo lee solo desde el checkout principal (`ln -sfn /Users/nicecode/Work/jalvarez/video-creator/.env .env` en tu worktree es lo único que hace falta, y solo si el usuario elige el camino 2).
- Registro: tu fila V33/V34/V35 y la canción (ya reservadas aquí). `combinaciones.md` dice qué tramo de qué clip repite cada pieza.
