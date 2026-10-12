# 01 · Plan narrativo — proyecto 036 · Casa Campestre Guarne (V19, cinematográfica)

> Paso 1 de 3. Siguiente: [02-layout.md](02-layout.md) · [03-timeline.md](03-timeline.md).
> El código sale de aquí: `remotion/src/proyectos/036/` · puerta `node proyectos/036/revisar-036.mjs`.

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Encargo (2026-10-09) | Reel V19 de la Casa Campestre de Guarne con Isabella Cadavid, en estilo **CINEMATOGRÁFICO**: ritmo pausado, drones largos a velocidad constante, luz cálida, color de cine y una música orquestal, de piano o ambient que crezca hasta la vista. Distinto de las versiones anteriores de la casa (otro ángulo, otro hook, otra mitad, otro CTA, otra canción y otros planos). Estructura **Dron · Hook · Recorrido · Mitad · Recorrido · CTA · tarjeta**, sin cifras, voz a −15 LUFS, música a −15 sola y −26 bajo la voz. Sin commit ni publicación; la final, solo con el sí del usuario |
| Ficha | [propiedadesluxur.com · Casa Campestre en Venta con Vista Panorámica a las Montañas](https://propiedadesluxur.com/es/propiedades/guarne/casa-campestre-en-venta-con-vista-panoramica-las-montanas), leída el 2026-10-09: Guarne · 5 habitaciones · 6 baños (el texto dice «cinco baños»: la ficha se contradice) · 2 parqueaderos · 2.413 m² · 2025 · a 300 m de la autopista Medellín-Bogotá · **Características: Jacuzzi, Zona BBQ, Portería 24h, Terraza / rooftop** · «vista panorámica privilegiada hacia las montañas». Lo que dice Isabella (el jacuzzi, el asado, la vista) está en la ficha; **ninguna cifra sale en el vídeo**: la ficha va al caption |
| Material | Los cinco grupos de `Casa Campestre - Duglas Yovana/Videos/` (SSD), todo 16:9 sin rotación y SDR BT.709. Se trabaja con COPIAS en `proyectos/036/original/` verificadas por sha256 (`normalizar.mjs`) |
| Composición | `Recorrido036` · 1080×1920 · **30 fps** · 1258 f (41,9 s) |
| Texto | **editorial**, solo mientras habla Isabella, abajo, al 90 %, la cursiva 8 px menor |
| Marca | Luxur. Reglas fijas: primera toma sin texto ni voz · nunca el sello · cierre en tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com` · nada se congela |
| Número | **V19 / 036**. V19 estaba libre en todos los registros (main y los 17 worktrees), pero `proyectos/035` lo ocupa el libreto PRE-rodaje de San Nicolás (worktree `hooks-dialogos-cta-video-ccd3e5`). A la vez trabajan la V20/037 («el error», `reel-037-el-error`) y la V21/038 (`reel-038-escapar-del-ruido`) de la misma casa: el reparto de clips se acordó por mensaje y está en el registro de uso |

## El ángulo: el refugio

Las versiones anteriores de la casa: la V13 (029) fue la **familia y los recuerdos de infancia**, la V16 (032) la **familia de tres generaciones** y la V17 (033) la **diáspora** (volver a Colombia). Ninguna usó el ángulo del **refugio**: salir del ruido de la ciudad. Es el que pide un estilo de cine (el contraste ruido → calma lo cuenta la imagen: la ciudad no sale, la casa sí, en silencio y desde el aire).

**Idea en una línea.** Esta casa es para quien quiere salir del ruido de la ciudad y está cansado del tráfico y del afán: el ruido (hook), lo que cambia aquí —el jacuzzi, el asado, la vista— (mitad) y respirar distinto (CTA).

## Las tres tomas de Isabella (transcritas por palabra antes de elegir)

Whisper small, dos pasadas (con el vocabulario de la casa y sin él); la confianza de una palabra es la menor de sus tokens. Las dudas se cerraron cortando la voz desde varios instantes (`palabras-desde.py`) y midiendo (`sibilantes.py`); lo que solo cierra una medida queda **POR CONFIRMAR AL OÍDO**.

| Pieza | Candidatas libres | Elegida | Por qué |
|---|---|---|---|
| Hook | HK11/HK12 «El ruido, el tráfico, el afán…» · HK05 «Diseño moderno, naturaleza y privacidad» (descriptivo; «Diseño» 0,09-0,19) · HK01 «La ciudad cansa, esta casa te cura» (whisper oye «la ciudad de Kansas»: audio malo) · HK03 (familia otra vez) · HK08 («el error», lo toma la V20) | **HK11** (`IMG_9433`, 4K) | Dolor → salida, la fórmula de hook que pide la skill. La doble HK12 está más lejos y whisper oye «llegas a tocarlo». «afán»: sin vocabulario oye «avan»; cortando desde 2,10 s, «el afán». **«Ven, te muestro» POR CONFIRMAR**: whisper oye «Vente, muestro» (la «te» va pegada a «ven»; HK11 4,68-5,10 s, en el vídeo ≈ 8,5-8,9 s) |
| Mitad | MD08/MD09 «Jacuzzi, asado con tu familia y la vista ideal» · MD07 «Sin escaleras, cinco alcobas…» (cifra) · MD10 («el error») · MD05 (familia otra vez) · MD03 (la doble de la mitad de la V13) | **MD08** (`IMG_9514`, 1080p) | Terraza al atardecer, la luz más cálida del material; ella más grande que en la doble MD09 (detrás del jacuzzi). **«asado» POR CONFIRMAR**: sin vocabulario whisper oye «has dado»; entre «Jacuzzi» y la vocal siguiente hay una /s/ (1,44-1,54 s) al nivel de la /s/ de «vista» → «asado» (MD08 1,36-1,86 s, en el vídeo ≈ 16,9-17,4 s) |
| CTA | CT07 «Tu familia merece respirar distinto. Agenda tu visita ahora. Haz clic…» · CT06/CT05 «Recorridos privados disponibles…» · CT02 «Agenda tu visita y trae a tu familia» | **CT07** (`IMG_9436`, 4K), recortada en «…ahora.» | «Respirar distinto» cierra el arco del ruido; una sola acción. Todas sus palabras se leen en las dos pasadas. Se corta en el valle de −44 dB entre «ahora» (acaba en 4,31 s) y «haz» (4,44 s) |

## La música

*Begin Again* (catálogo: cinematic emocional, «renacer, esperanza tras la tristeza»), desde **64,769 s**. Se midieron con `herramientas/buscar-cortes-lp.py` las **25 canciones libres** del registro con la duración REAL de cada plano (el hook necesita 161-168 f, la mitad 111-135, los drones 3-4 s…):

- con la caída estricta (≥ 9 dB en 5 s y ≥ 20 en 10) solo salían rejillas en *The Sky is Crying* (blues), *La Isla Bonita* (el usuario la quitó por «muy playera») y *Familiar* (su final está a −39 dB);
- con una caída tras el clímax (≥ 6 / ≥ 12 dB): *Begin Again*, *Spring is Coming* (plana, sin crescendo), *Familiar* (baja a −28 dB antes de la vista), *Oceans* (con letra), *Luxury, Elegance* (lounge) y *Strobe* (club);
- de las cinematográficas, **solo *Begin Again* crece hasta la vista**: de 64,8 a 100,5 s sube de −21,5 a −10 dB RMS (−19,1 → −10,2 LUFS por tramos de 5 s; pico −0,9 dBFS: ningún tramo llega a 0 dBFS) y a los 100,5-101,0 s **cae en seco** (−13 → −35 dB). La vista se monta sobre lo más alto (95,1-100,5 s) y el CTA entra en el último golpe fuerte antes de la caída (100,464 s, 10,0 dB): Isabella habla con la música ya caída.

Es otra zona de la pista que la que midieron la V3/V5 (145-183 s, descartada por volver a subir bajo el CTA). Tras la última palabra del CTA vuelve una frase de piano (golpe de 13,9 dB en 105,596 s): la música se apaga antes, en la última palabra. **Medida, no oída; licencia sin verificar.**

## Lo cinematográfico, medido

- **Drones de 3-4 s a velocidad constante.** Cada tramo es el de movimiento más uniforme de su vuelo, medido sobre el 16:9 entero (dispersión 0,022-0,039) y comprobado sobre el 9:16 (`movimiento.py`, `flujo.py`). La apertura (DR75) y la llegada (DR79) llevan la ventana quieta o acompañando la deriva; en la **órbita** (DR81 17,3-20,73 s) la ventana sigue la posición MEDIDA de la casa (la casa acelera en el cuadro al acercarse al borde) y queda fija (0 ± 1 px); en la **vista** (DR81 8,8-14,17 s) el giro del dron acelera de 13 a 17 px por fotograma y la ventana lo compensa: velocidad aparente 17,0 ± 0,7 todo el plano.
- **Sin fotogramas repetidos.** Los DJI van a 29,97 fps y `fps=30` repetía uno cada ≈ 33 s (en el DR79 caía en 16,667 s, dentro del tramo): `normalizar.mjs` los reproduce un 0,1 % más rápido.
- **La vista es el clímax**: el plano más largo del bloque 5 (5,4 s; los otros drones, 3,4-3,8 s) y el punto más alto de la canción. La rejilla de golpes no deja una vista de menos de 4 s (con el CTA en la caída, los planos del bloque 5 tendrían que durar más que ella).
- **Color de cine** (`colorCorrection`, R32): contraste 1,15, negros −0,08, luces −0,28, un punto cálido; y por plano, medido. Ver [03-timeline.md](03-timeline.md).

## Qué cambia respecto a las versiones anteriores

Otro ángulo (refugio), otro hook, otra mitad, otro CTA, otra canción y **ni un clip** de la V13, la V16 ni la V17 (la puerta, 7b, falla si se repite uno, aunque sea otro tramo). Y por estilo: es la primera de esta casa con cuatro planos de dron (las otras usaban uno) y la primera en que el clímax es un dron.

## Promesa y CTA

- Promesa (hook): «Llegas a tu hogar donde **todo cambia**.»
- CTA: «Tu familia merece respirar distinto. **Agenda tu visita** ahora.» (Una acción; el canal del enlace o del DM lo pone el caption.)

## Caption (propuesta; la ficha va aquí, no en el vídeo)

> El ruido, el tráfico, el afán. Llegas a tu hogar donde todo cambia. 🌿
>
> Para quien quiere salir de la ciudad sin alejarse de ella: una casa campestre nueva en Guarne, con jacuzzi, zona BBQ y una vista abierta a las montañas del Oriente Antioqueño.
>
> 🏡 Casa campestre · Guarne, Antioquia · lote de 2.413 m² · 5 habitaciones · 6 baños · 2 parqueaderos · construida en 2025
> 💰 Precio por DM (o la cifra de la ficha, si se prefiere)
> 📍 A 300 m de la autopista Medellín-Bogotá · 15 km del aeropuerto José María Córdova
>
> Tu familia merece respirar distinto. Agenda tu visita en el enlace.
>
> #CasaCampestre #Guarne #Antioquia #OrienteAntioqueño #CasaConVista #PropiedadesLuxur

(Ojo: la ficha dice «6 Baños» en la cabecera y «cinco baños» en el texto; conviene confirmarlo antes de publicar el caption.)
