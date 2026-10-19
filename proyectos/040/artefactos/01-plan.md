# 01 · Plan narrativo — proyecto 040 · Lote en El Carmen de Viboral (Mia), V23 del registro (quinto reel de la propiedad, «LA VISTA»)

> Paso 1 de 3. Escrito con el encargo de la sesión coordinadora (2026-10-17), la ficha de la web, `archivos/musica/registro-de-uso.md` §6 y lo aprendido en el 030, el 031, el 034 y el 039 (`aprendizajes.md` y `combinaciones.md` de cada uno), y **antes** del primer render. Siguiente: [02-layout.md](02-layout.md).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Pedido | «Monta la V23 / proyecto 040 del Lote El Carmen: un reel 9:16 con Isabella y el ángulo **LA VISTA**: despertar con esta vista al atardecer → el lote para tu casa soñada → escríbeme "lote".» Una de las cuatro versiones (V23-V26) que cuatro sesiones montan a la vez: el reparto de número, tomas, drones y canciones ya estaba decidido. |
| Numeración | **V23 / 040.** Reservada en el registro de esta rama (`archivos/musica/registro-de-uso.md` §1, §2 y §6) el 2026-10-17, **sin publicar** (no se hace commit ni push sin el OK del usuario). Se comprobó que ninguna de las tres sesiones hermanas (041, 042, 043) tiene reservada mi canción, mis tres tomas ni mis cuatro drones. |
| La propiedad y la ficha | Lote Campestre en Venta en El Carmen de Viboral con Vista Panorámica (ficha leída el 2026-10-17): **VENTA · COP 800 millones · 3.428 m² · dos entradas independientes** (una por la parcelación y otra por la vereda) · energía y agua · la tubería de gas pasa cerca (sin distancia) · se permite casa bifamiliar · vista panorámica · entorno natural, tranquilo y privado · árboles frutales · cabaña de madera · asesora Isabella Cadavid (CEO). **No consta**: distancias ni tiempos a ningún sitio, situación jurídica ni fuente del agua. Nada de eso se afirma en el vídeo. |
| Material | `Lote - El Carmen - Mia/Videos/`, copiado a `proyectos/040/original/` con el CÓDIGO del registro por nombre. sha256 (8) en `normalizar.mjs`: HK05 `ab475ace`, MD04 `df371f8f`, CT02 `ef6c7185`, DR202 `ec418535`, DR209 `c829546f`, DR234 `9b617969`, DR236 `c2cc263f`, música `856aff24`. Las tomas de Isabella son de iPhone en HLG 10 bit con `rotation=-90`, rodadas de día (2026-08-26); los drones son **4K verticales a 29,97 fps, SDR, del 2026-10-14 entre las 17:41 y las 17:55** (cielo dorado y rosa). |
| Composición | `Recorrido040` · 1080×1920 · **30 fps** · **1118 f (37,27 s)**. Clips normalizados a 1296×2304 y 30 fps (iPhone: HLG → BT.709 con VideoToolbox; DJI: solo rotado, con `setpts=PTS*1000/1001` antes de `fps=30`: sin eso repiten un fotograma cada ≈ 33 s). |
| Formato | 9:16 vertical · `recorrido-luxur` (DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA), tres frases de Isabella |
| Marca / texto | Luxur, texto **editorial** (abajo, 90 %, cursiva 8 px menor); **sin sello**; cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com` |
| Destino | Reels · Shorts · TikTok |
| Presentadora | Isabella Cadavid (asesora de la ficha) |

## El ángulo: «LA VISTA» (y en qué se distingue de las versiones anteriores)

**La idea en una línea:** este lote es para quien quiere **despertar cada día con esa vista**: el hook la promete, el paseo la enseña al atardecer sobre el propio lote, la mitad la convierte en proyecto («tu casa soñada») y el bloque 5 la sube a su punto más alto (el cielo rosa sobre las palmas y el valle con sus casas).

| | V14 (030) | V15 (031) | V18 (034) | V22 (039) | **V23 (040)** |
|---|---|---|---|---|---|
| Argumento | seguridad sin encierro → dos accesos | construir con agua y energía | la naturaleza como parte de la casa | campo sin desconexión → dos entradas | **despertar con esta vista → la casa soñada → escríbeme «lote»** |
| Hook | HK04 | HK06 | HK03 | HK02 | **HK05** «Imagina despertar todos los días con esta vista y tener más de 3000 metros cuadrados para tu proyecto.» (la única cifra) |
| Mitad | MD02 | MD04 | MD03 | MD05 | **MD04** «Este es el tipo de lote que compras para construir tu casa soñada.» (**repetida** de la V15) |
| CTA | CT01 | CT04 | CT03 recortada | CT02 | **CT02** «Si quieres conocerlo, escríbeme lote y te envío toda la información.» (**repetida**: la frase del CT01 de la V14; la V22 la reservó y no tiene final) |
| Canción | *Becoming* | *Somewhere inside of me* | *Chillin'* | *Light Fills the Room* | ***Overcoming the Impossible*** |
| Drones | DR96-109 (de día) | DR97-109 (de día) | DR96-109 (de día) | DR96-109 (de día) | **DR202 · DR209 · DR236 · DR234, del 2026-10-14 al atardecer: ninguna versión los usó** |
| Ritmo | 10 planos de 2-4 s | 10 planos de 2-4 s | 10 planos de 2-3 s | 14 planos con rampas | **10 planos de 1,4-4,5 s, sin rampas, sin velocidades; la vista, 4,5 s** |

### Lo que NO cambia respecto de las versiones anteriores (y se dice)

- **MD04 la usó la V15** (misma toma, mismo fondo de loma, misma frase) y **CT02 es la frase del CT01 de la V14 y el CTA reservado de la V22**, que está en prueba y sin final. No se cambian sin preguntar al usuario: el reparto de las cuatro versiones los deja a esta pieza. Las dos se repiten a la fuerza y se **declaran** (registro §6, `combinaciones.md`).
- El mismo lote, las mismas terrazas de tierra roja: es la misma propiedad. Pero **ni un segundo de metraje compartido** con la V14, la V18 ni la V22 (la puerta, 7b); con la V15 comparte **el plano de la mitad** (MD04, 4,1 s: la toma entera) y con la V22, **el del CTA** (CT02, 4,1 s).

## Promesa y CTA

- **Promesa (primeros 3,6 s):** el sol bajo sobre el horizonte y las terrazas de tierra roja del propio lote, al atardecer (DR202), **sin texto ni voz** (regla fija), con el golpe de la música (15,0 dB) en el f3. Isabella entra a corte en el f108 y dice «imagina despertar todos los días con esta vista…».
- **Acción final:** «escríbeme lote»: UNA acción, UNA palabra.
- **Lo que NO se cuenta:** el precio (COP 800 millones); el área exacta (3.428 m²: el hook dice «más de 3000», que es verdad y es **la única cifra**, nunca en los bloques 5 y 6); valorización ni rentabilidad; distancias, tiempos ni conexiones (la ficha no los da); la casa bifamiliar, el agua y la energía (caption); la situación jurídica.

## Escenas (los seis bloques)

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | 0,0-3,6 | El dron | la vista, al atardecer | lote | DR202 1,50-5,10 s: el sol bajo, las nubes doradas, el eucalipto y las terrazas rojas · solo música, golpe de entrada de 15,0 dB en el f3 |
| 2 | 3,6-10,2 | Hook | la promesa | Isabella | HK05: en la loma, de día, lejos y pequeña ante el valle · «Imagina despertar todos los días con esta vista y tener más de 3.000 metros cuadrados para tu proyecto.» |
| 3 | 10,2-19,5 | Recorrido | el lote al atardecer | lote | las terrazas bajo el cielo dorado (DR209, 3,4 s) · el sol bajo (DR202, 3,2 s) · la silueta del árbol en contraluz (DR209, 2,8 s) |
| 4 | 19,5-23,6 | Mitad | la razón | Isabella | MD04: en la loma, de día, brazos abiertos · «Este es el tipo de lote que compras para construir tu casa soñada.» |
| 5 | 23,6-31,2 | Recorrido | el cielo rosa y LA VISTA | lote | el cielo rosa sobre las palmas (DR236, 1,4 s + 1,6 s) · **LA VISTA**: nubes rosadas sobre el valle y sus casas (DR234, 4,5 s, el plano más largo) |
| 6 | 31,2-37,3 | CTA | invitar | Isabella | CT02: en la loma con los pinos y el valle · «Si quieres conocerlo, escríbeme lote y te envío toda la información.» → funde a negro → tarjeta con el logo y la web |

## Decisiones tomadas (y las descartadas)

- **Hook = HK05, mitad = MD04, CTA = CT02**: asignadas por la sesión coordinadora; no se cambian sin preguntar al usuario. **Riesgo declarado del hook:** lleva la cifra «3000» y la ficha dice 3.428 m²; «más de 3000» es cierto, pero es la **única cifra** de la pieza y se pinta en base (sin dato grande). **Palabra dudosa:** «3000» (whisper, confianza 0,53) → POR CONFIRMAR AL OÍDO.
- **La voz de HK05 empieza a los 0,305 s y acaba a los 5,72 s**; la toma dura 6,67 s (200 f) y no deja aire antes: entra A CORTE con `desde` 0 y la primera sílaba suena a los 9,15 f del golpe. De 0 a 0,25 s solo hay ruido de sala a −47…−59 dB (el WAV tratado es silencio ahí). **La voz de MD04 empieza a los 0,95 s** (no a los 0,41 s del registro: antes de 0,90 s hay −60…−73 dB) y acaba a los 4,13 s.
- **Canción = *Overcoming the Impossible*** (`856aff24`, Aleksey Chistilin, cinematic épico / híbrido orquestal, 3:40): de las cinco del grupo asignado, la única que da una rejilla de golpes ≥ 9 dB para estos 9 planos **y** una caída donde entra el CTA (`buscar-entrada.py`, `buscar-cortes-039.py` y `rejilla-040.py`; `musica/buscar-cortes-040-pasada1.txt`). *Dreamlife* (la más afín al tema, «dreamlife»/«casa soñada»): entre los 17,9 y los 25,5 s de su ventana solo hay golpes de ≤ 8 dB y sin rejilla ≥ 9 dB; *Softly* y *Cornfield Chase*: 0 rejillas; *Oceans*: lleva voz cantada, que compite con la de Isabella. **Declarado:** la canción es muy alta (−8 a −13 LUFS, picos de 0,0 a +0,1 dBFS): la música sola a −15 es BAJARLA 2,0-6,1 dB. Es épica, no «de amanecer»: la medida no la oye. **Medida, no oída.** Licencia sin verificar (como todas).
- **Entrada de la canción** = 172,715 s (golpe de 15,0 dB en el f3). Cada corte en un golpe de 9,4 a 11,9 dB; la caída (−10,7 → −18,9 LUFS en 5 s, −30,9 en 10) coincide con el CTA (golpe de 11,9 dB en 203,775 s).
- **Los drones, por su movimiento medido:** `perfil-dron.py` (diferencia media entre fotogramas y escala, por tramos de 0,5 s) y `flujo.py` (desplazamiento global: da 0 en estos clips porque **avanzan y bajan**, no se desplazan: la medida válida es la diferencia media y su dispersión). Son vuelos lentos con cielo y poca textura (diferencia media 0,5-1,4) pero **uniformes dentro de cada ventana (σ/μ ≤ 0,07)**; los primeros 1,5-2 s de cada clip están casi quietos y NO se usan. DR234 y DR236 aceleran despacio (0,76 → 2,07 y 0,26 → 1,45): se usan los tramos de aceleración suave.
- **La luz hace de hilo:** del oro del principio (DR202 y DR209, 17:41-17:44) al rosa del final (DR236 y DR234, 17:54), en el mismo orden en que se rodó. Dos planos seguidos del mismo clip (como la V22) obligan al mismo color: se alternan DR209 · DR202 · DR209 y DR236 · DR236 (con dos ventanas distintas del mismo clip y color idéntico).
- **El color:** Isabella está grabada de día y los drones al atardecer; el color casa los planos entre sí **sin vestir de atardecer a Isabella ni de día a los drones**. Base del canal con sombras más abiertas (los drones están expuestos para el cielo y las terrazas caen a casi negro); `vibrance` ≤ 0,05; piel de Isabella con `saturation` ≤ 1,06. Medido plano a plano (`herramientas/medir-color.py`, `combinaciones.md`).
- **Sin rampas ni velocidades** (la V22 las tuvo): esta pieza es contemplativa, y la puerta lo exige.
- **El disco:** 48 GB libres (2026-10-17), compartidos por las cuatro sesiones. Cada still o render usa `herramientas/clonar-al-copiar.cjs` (8 MB por bundle en vez de 2,2 GB) y se borran solo MIS bundles.

## Lo que comparte con las versiones anteriores (declarado)

La puerta (7b) mide **ni un segundo de metraje en común** con la V14 (030) ni con la V18 (034), y solo estas dos coincidencias, **declaradas**:

| Clip | Versión | V23 |
|---|---|---|
| `md04.mp4` (MD04, la toma entera: 0,6-4,8 s) | V15 (031), el mismo tramo | c06-mitad |
| `ct02.mp4` (CT02, 0,1-4,2 s) | V22 (039), el mismo tramo | c10-cta |
| DR202, DR209, DR234, DR236 | ninguna (drones del 2026-10-14) | c01 · c03 · c04 · c05 · c07 · c08 · c09 |

## Pendiente con el usuario

1. El OK a la prueba (`pruebas-720p/040-recorrido.mp4`, 540×960) y a las decisiones declaradas: **la mitad (MD04) y el CTA (CT02) se repiten**; **el hook lleva la cifra «3000»**; y la canción (épica, medida y no oída).
2. **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto): la cifra «**3.000**» (HK05, f217 = 7,2 s del vídeo), «**escríbeme**» (CT02, f980 = 32,7 s) y «**lote**» (CT02, f1002 = 33,4 s).
3. La canción: medida, no oída; licencia no verificada; y por dónde se escribe «lote» (comentario o mensaje directo).
