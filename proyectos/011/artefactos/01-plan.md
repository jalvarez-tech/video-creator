# 011 · Boda — plan

Montaje de dos minutos con **todo** el material de la carpeta `~/Downloads/Boda`.
El encargo, literal: el primer minuto, la boda, con «Turning Page»; el segundo,
la rumba, con «El Preso» (Fruko y sus Tesos). De cada vídeo, **la mejor parte**.
Todo **en mute** con la música de fondo.

> La música del primer minuto iba a ser «Mariage d'Amour» y el encargo la cambió
> a «Turning Page» a mitad de trabajo, antes de que se tocara la música: no hubo
> que rehacer nada.
>
> **v2 — corrección sobre la primera prueba:** «cambia la música en el min 1:18»
> y «agrega al inicio un texto con Boda María & Daniel». El relevo pasa del 1:00
> al **1:18** —el brindis, el champán y el pastel suenan ya con la balada, y El
> Preso entra cuando la novia levanta el cuchillo— y el vídeo abre con el título.
>
> **v3 — segunda corrección:** «hazle un fade out a la música de la primera
> canción cuando cambia a la otra y agrega un texto como y ahora… La fiesta».
> Turning Page se funde en 2,8 s antes del relevo y, encima del pastel, aparece
> «Y ahora…» mientras baja el piano y «¡LA FIESTA!» con el golpe de El Preso.

## Cabecera

| | |
|---|---|
| Material | 27 MOV de iPhone 16 Pro (HEVC 10 bit **HLG**) + 1 MP4 de mensajería + 1 foto HEIC |
| Composición | `Boda011` · 1080×1920 · **30 fps** · 3600 f (**120,00 s**) |
| Formato | 9:16 vertical: el material ya lo es (tras quemar la rotación) |
| Estilo | **cinematográfico** en la boda (disolvencias, punch-in lento) · **redes** en la rumba (corte seco al golpe) |
| Marca | **ninguna** — es una pieza personal: sin sello ni subtítulos |
| Texto | **dos momentos**: el título «BODA · María & Daniel» sobre el primer plano (v2) y «Y ahora… ¡LA FIESTA!» en el relevo (v3) |
| Voz | ninguna · clips en mute (`-an` en la normalización + `muted` en la comp) |
| Objetivo | que la familia reviva el día en 2 minutos: el «sí» y la fiesta |

## §material — medido antes de planificar (R01, R19)

Tres trampas, y ninguna se ve en un frame:

1. **HDR.** Los 27 MOV son HLG BT.2020. Pasados a H.264 sin tone-mapping salen
   lavados: en el mismo fotograma de `IMG_2230`, luma **155** y saturación **8,7**
   contra **126 / 11,6** con tone-map. Este `ffmpeg` no trae `zscale`, así que el
   tone-map lo hace **VideoToolbox** (`scale_vt` → bt709). Se comparó con
   `avconvert` (AVFoundation) y dan lo mismo (126 / 11,5).
2. **Rotación.** Todos declaran 1920×1080; 25 llevan `rotation=-90` y dos
   (`IMG_2209`, `IMG_2291`) `rotation=90`. Se quema en la normalización.
3. **La foto también miente.** `anillos.HEIC` → `sips` da 4032×3024 apaisado con
   `EXIF Orientation=6`. Solo sale derecha si quien la abre lee la etiqueta.
   Se quema con `ffmpeg` (1728×2304, sin EXIF).

Y dos rarezas del lote:

- **`IMG_2270` dura 5 fotogramas (0,17 s)** — un toque sin querer, pero es el novio
  sirviendo champán y está nítido. No es un clip: es una **foto** (fotograma central).
- **`E56C…MP4`** es el único de mensajería: 720×1280 SDR. Se escala ×1,8; en
  pantalla va en un plano ancho de pista, donde la falta de detalle no se mira.

Normalización: `proyectos/011/normalizar.sh` → `remotion/public/boda-011/`
(1296×2304 · 30 fps · sin audio · x264 crf 17). **1,0 GB, fuera de git.**

## §narrativa — tres tramos y dos fronteras (v2)

| | 0:00–1:00 · LA GLORIETA | 1:00–1:18 · EL SALÓN | 1:18–2:00 · LA RUMBA |
|---|---|---|---|
| lugar | exterior junto al lago (13:54–16:31) + decoración del salón | salón, rituales (19:04–19:34) | salón, pista (19:34–21:10) |
| arco | título → el sitio → la llegada → **el beso** → los que hablan → los dos → las velas | ¡salud! → champán → brindis → risas → beso entre copas → el pastel | **el cuchillo arriba** → la pista → el trencito |
| música | Turning Page desde 1,40 s | sigue Turning Page | El Preso desde 0,25 s |
| corte | 19 planos · 7 disolvencias | 6 planos en seco sobre notas de piano | 9 planos en seco sobre golpes |

**Dos fronteras distintas.** La de la **imagen** (`CAPITULO`, 1:00) separa la
glorieta del salón con un paso por negro; la de la **música** (`RELEVO`, 1:18)
cae dentro del plano del pastel, cuando la novia levanta el cuchillo. En la
primera prueba coincidían en el 1:00 y el brindis ya sonaba a salsa; el cliente
lo movió al 1:18 y la lectura mejora: los rituales del salón siguen siendo boda,
y la rumba empieza con un gesto de fiesta en vez de con un corte.

La frontera de la imagen se sigue apoyando en el **lugar**: con el criterio
«rumba = solo baile» desde el 1:00, el primer minuto tendría 24 planos a 2,5 s y
la rumba 5 clips a 12 s.

## §música — dónde entra cada canción, y por qué ahí

**Turning Page** (256 s, balada de piano ≈57 BPM), **78 s** desde **1,40 s**.
Medida con energía por bandas: intro suave → verso → **subida fuerte en 34,7 s**
→ valle → **respiro en 61,4 s** → … → **respiro en 79,25–79,55 s**. Esa entrada:
- pone el primer respiro en el **f1800** (el paso por negro glorieta → salón);
- pone el segundo en el **f2340** (el relevo del 1:18): ahí termina el fundido
  de 2,8 s que pidió el cliente en la v3 (en la v2 bastaba un fader de 6 f
  dentro del respiro, y sonaba a corte);
- pone la subida en el **f1002**, donde se ancla el inicio del beso (`c11`).
- Coste: se pierde la primera nota (0,45 s), una nota repetida del ostinato.

**El Preso** (291 s, ≈104,5 BPM con deriva de banda en vivo), **42 s** desde
**0,25 s**. La energía es **plana** toda la canción (master muy comprimido), así
que no hay «mejor tramo» medible: se usa **el arranque**, la intro reconocible.
Su final es un fade del vídeo subido, no un cierre musical: la pieza cierra con
un fader de 3 s (curva de coseno).

**Sonoridad.** Turning Page a **−16,49 LUFS** (el techo de −1,5 dBTP no deja
subirla sin comprimir un piano) y El Preso a **−14,00 LUFS** (venía a −9,5 y con
picos de +0,4 dBTP). Los ~2,5 LU de salto son a propósito: se nota que empieza la
fiesta. Receta en `musica/README.md`.

⚠ **Derechos.** Las dos son canciones comerciales. Para verlo en familia no hay
problema; si se sube a Instagram/TikTok/YouTube, la huella acústica las detecta
(silencio en algunos países, anuncios del titular o bloqueo).

## §la mejor parte — cómo se eligió cada tramo

1. Hoja de contactos del clip entero (0,5–1 s por foto).
2. Métricas a 10 fps sobre el fotograma ya tone-mapeado: **nitidez**
   (`blurdetect`), **movimiento** (`YDIF`), **luz** (`YAVG`).
3. Hoja densa (0,25 s) de la ventana candidata → `desde` al segundo.
4. Stills del render (R05): uno falló (`r11`, medio plano de pared) y se movió.

Los criterios, en orden: **qué pasa** (un gesto, una risa, un beso) > **si se ve**
(nitidez y encuadre) > **si se mueve la cámara**. Donde chocan, gana el momento:
el trencito (`IMG_2290`) es el clip más borroso del lote y aun así es lo mejor de
la fiesta. De él se usa la ventana que las métricas daban como la menos mala
(blur 5,2–5,5 frente a 6–8,6 del resto).

## Decisiones tomadas (y las descartadas)

| decisión | por qué | descartado |
|---|---|---|
| **sin marca; solo los textos pedidos** | una boda no es un canal; los dos textos (título y «Y ahora… ¡LA FIESTA!») los pidió el cliente | la fecha bajo los nombres: no se pidió (el material dice 12-09-2026, pero se deja fuera) |
| **título visible desde el f0** | el f0 es la miniatura de WhatsApp y del feed (lección del 010) | entrada con fundido: la portada saldría sin nombres |
| **Didot itálica** | se compararon 4 fuentes sobre el fotograma real | Snell Roundhand (se sale de la zona segura) · Savoye (trazo fino para móvil) · Bodoni en 2 líneas (separa a la pareja) |
| **relevo dentro de un plano** (`r06`) | el cambio de canción lo lleva un gesto (el cuchillo), no un corte | cortar en el 1:18: habría partido el momento del pastel |
| **fundido de 2,8 s + 0,2 s de silencio** (v3) | el cliente oyó el cambio como un corte; el silencio corto antes del golpe es la pausa de «Y ahora…» | crossfade (las dos canciones a la vez): tonalidades y tempos distintos se ensucian |
| **«¡LA FIESTA!» con signos de apertura** | el cliente escribió «La fiesta»; en español una exclamación lleva ¡! y en versales se lee como grito de fiesta | sin signos: se lee como un subtítulo |
| **rótulo arriba**, no centrado | el plano del pastel tiene caras arriba, pastel abajo y vestido blanco en el centro | centrado como el título: blanco sobre el vestido, ilegible |
| **dos tramos de 4 clips** (`2230`, `2290`, `2291`, `2293`) | 2230 tiene dos momentos distintos (abrazo y velo) y los tres de pista son lo único con ritmo para 60 s de salsa | un tramo por clip: la rumba saldría a 6 s por plano |
| cortes sobre **golpes medidos** | sin voz, la música es la retícula | cortar «a oído» o a una rejilla fija: El Preso va de 104,1 a 105,0 BPM según el tramo, y una rejilla única se desplaza más de 0,1 s en 20 s |
| disolvencias solo en la boda | la balada las pide en los cambios de tono; la salsa, no | disolver todo: queda de plantilla |
| relevo **sin fundido cruzado** | cada canción ya trae su relevo (respiro / golpe) | crossfade de 1 s: ensucia los dos |
| exposición **solo hacia arriba** | los tramos claros son vestido blanco y cielo | bajar los claros a 118: apaga a la novia |
| sin estabilizar | `deshake` deja bordes y la pista movida es parte de la fiesta | vidstab: no está en este ffmpeg |
| sin cámara lenta | a 30 fps se ve a saltos | beso a 0,8×: `c11` ya dura 8,4 s |
