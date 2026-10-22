# 01 · Plan narrativo — proyecto 061 · Apartaestudio Quadrato (Laureles, Medellín), V43 del registro (segundo reel del apartaestudio: «Pocos permiten rentas cortas»)

> Paso 1 de 3. Escrito con el reparto de la sesión madre (`proyectos/054/reparto-054-062.md`, que manda), el catálogo del rodaje (`proyectos/060/catalogo/catalogo-material.md`), la ficha de la web y lo aprendido en la 056/059 (la estructura de diez planos y su puerta). Siguiente: [02-layout.md](02-layout.md).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Pedido | Encargo del 2026-10-21: **3 reels por propiedad** en tres propiedades nuevas (una sesión por reel, todas sobre el mismo checkout). Este es el **V43 / 061**: Apartaestudio Quadrato (Laureles, Medellín), ángulo **«Pocos permiten rentas cortas»**: la escasez del permiso, lo que hace rara a esta unidad. Más las reglas fijas del canal (estructura AÉREA · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA con tres frases de Isabella, primera toma sin texto ni voz, nunca el sello, cierre en tarjeta oscura con el logo y la web, subtítulos editoriales, voz a −15 LUFS, música con curva, color por plano medido). |
| La propiedad y la ficha | Apartaestudio en Venta en Laureles, Medellín, **para rentas cortas**. Ficha leída por la sesión madre el 2026-10-21: **VENTA · COP 410 M** · **24 m²** · 1 alcoba · 1 baño · piso 4 · año 2024 · zonas comunes: jacuzzi y terraza/rooftop, gimnasio, coworking y sala de reuniones, lavandería, lobby tipo hotel, restaurante y bar, portería 24 h, ascensor, pet friendly. Es la **única de las tres propiedades que se vende como inversión** (ingresos por renta corta). El anuncio advierte que los ingresos varían por temporada: **en pantalla no se promete una rentabilidad ni se escribe nada de permisos, licencias o cifras**; «habilitado para rentas cortas» lo dice la voz de Isabella y sale de la ficha. |
| Material | `Apartaestudio - Quadrato - Laureles/Videos/` del SSD, copiado a `proyectos/061/original/` con el CÓDIGO del catálogo por nombre (sha256 en `normalizar.mjs`). **Todo es 1080×1920 vertical, H.264 SDR BT.709, sin rotación ni SAR raro, a 30 / 29,97 fps** (medido con ffprobe sobre los 67 MOV; no son HLG como el rodaje de La Ceja ni de Los Patios). **No hay dron.** |
| Composición | `Recorrido061` · 1080×1920 · **30 fps** · 1138 f (**37,9 s**). Clips normalizados a 1296×2304 y 30 fps (los de 29,97 fps con `setpts=PTS*1000/1001`, salvo las tomas de Isabella). |
| Formato | 9:16 vertical · `recorrido-luxur` (AÉREA SUSTITUTA · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA) |
| Marca / texto | Luxur, texto **editorial** (abajo, 90 %, cursiva 8 px menor); **sin sello**; cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com` |
| Destino | Reels · Shorts · TikTok · y la versión con ficha para anuncios (1:1) |
| Presentadora | Isabella Cadavid |

## El ángulo: «Pocos permiten rentas cortas» (y en qué se distingue de las otras dos versiones del apartaestudio)

**La idea en una línea:** esta unidad es para quien compra **para rentar por días** y está cansado de proyectos que no lo permiten: lo que la hace rara es el permiso, y lo dice Isabella en el hook («habilitado para rentas cortas en Medellín») y en la mitad («en Medellín hay muchos proyectos inmobiliarios, pero pocos permiten rentas cortas»). La imagen no demuestra el permiso (no se puede): enseña **lo que el huésped encuentra al llegar** —el estudio listo para entrar— y **el edificio** que lo respalda.

| | V42 (060) | **V43 (061)** | V44 (062) |
|---|---|---|---|
| Ángulo | tu plata en el banco pierde valor: rentabilidad | **pocos permiten rentas cortas: la escasez del permiso** | Medellín, tercer mercado de renta corta: barrio y ocupación |
| Hook | HK03 | **HK04** «Te presento este estudio en Laureles, habilitado para rentas cortas en Medellín.» | HK02 |
| Mitad | MD05 | **MD04** «En Medellín hay muchos proyectos inmobiliarios, pero pocos permiten rentas cortas.» | MD02 |
| CTA | CT03 | **CT01** «Haz clic en el botón y agendemos una visita. Puede ser virtual o presencial.» | CT02 |
| Apertura (aérea sustituta) | jacuzzi con la ciudad (ZC07) | **la pérgola de la terraza (ZC22)** | la azotea (ZC29) |
| Canción | *Street Level Sessions on the Green* | ***La Isla Bonita (Saxophone 80 Mix)*** (repetida de la V7/023, autorizada por el usuario) | *In This Together* |
| Hilo de recorridos | lo que se alquila: cocina, baño, escritorio, cama, coworking, jacuzzi | **lo que el huésped encuentra al llegar**: cocina equipada, el estudio que se abre, la cama con la tele, el sofá, el coworking y el jacuzzi | de la azotea al estudio |

### Lo que NO cambia respecto de las demás piezas del canal (y se dice)

- La estructura de diez planos de la 056/059 (apertura · hook · 3 de paseo · mitad · 3 del bloque 5 · CTA), con su puerta adaptada.
- La canción es de la biblioteca del canal y **repite la de la V7/023 (One Living)**: otra propiedad, otra sección de la canción (15,2 s; la V7 entró en 179,4 s) y otra mezcla; autorizado por el usuario porque quedaban 4 libres para 9 reels.

## Promesa y CTA

- **Promesa (primeros 2,8 s):** la pérgola de la terraza, **sin texto ni voz** (regla fija), con el golpe de la canción en el f3. Isabella entra a corte en el golpe del f73 (su toma no deja 12 f de aire para disolver); su primera palabra suena en el f84,4.
- **Acción final:** «agendemos una visita»: UNA acción (hacer clic en el botón y agendar; «virtual o presencial» es el cómo). La tarjeta oscura con **PropiedadesLuxur.com** es justo el enlace del que habla.
- **Lo que NO se cuenta en pantalla:** precio, áreas ni la ficha (van al caption y a la versión con ficha). **No hay ninguna cifra en pantalla porque Isabella no dice ninguna.**
- **Lo de «habilitado para rentas cortas» lo dice la voz de Isabella**, no el canal: ni un rótulo ni el caption hablan de permisos, licencias o rentabilidad como promesa.

## Escenas (los seis bloques)

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | 0,0-2,4 | La pérgola | la terraza del edificio, el rooftop | la terraza | ZC22 3,40-5,83 s: bajo el techo de la pérgola, los jacuzzis, las montañas y el cielo · solo música: golpe de 21,1 dB en el f3 |
| 2 | 2,4-7,6 | Hook | la promesa | Isabella | HK04: camina por el pasillo del estudio hacia la cámara · «Te presento este estudio en Laureles, habilitado para rentas cortas en Medellín.» |
| 3 | 7,6-15,8 | Recorrido | lo que encuentras al llegar | el estudio | la cocina equipada, del cajón de cubiertos al fregadero (RC01) → el estudio que se abre al fondo del pasillo (RC17) → la cama hecha frente a la tele (RC07) · solo música, cortes secos en golpes |
| 4 | 15,8-21,6 | Mitad | lo que lo hace raro, dicho | Isabella | MD04: camina entre el escritorio y la cama · «En Medellín hay muchos proyectos inmobiliarios, pero pocos permiten rentas cortas.» |
| 5 | 21,6-31,0 | Recorrido | el edificio | el coworking y el jacuzzi | el sofá y la estantería con la caja de seguridad (RC10) → el coworking del edificio (ZC05) → LA VISTA: el jacuzzi con el cielo, la ciudad y las montañas (ZC18, el plano más largo) |
| 6 | 31,0-37,9 | CTA | invitar | Isabella | CT01: de pie al fondo del estudio, junto a la cama y el ventanal · «Haz clic en el botón y agendemos una visita. Puede ser virtual o presencial.» → funde a negro → tarjeta con el logo y la web |

## Decisiones tomadas (y las descartadas)

- **Hook = HK04** (`HOOK4`, asignado). La voz habla de 0,58 a 4,86 s (4,3 s, ≈ 7 sílabas por segundo); antes, de 0,14 a 0,31 s, hay un ruido de −45 dB que `limites-voz.py` cuenta como voz (da 0,15 s) y no lo es. **POR CONFIRMAR AL OÍDO: «estudio»** (whisper oye «estudiante»; el catálogo de la sesión madre supone «[apartaestudio]»): el tiempo de la palabra (1,80-2,28 s) es el de tres sílabas, no el de seis, y su distancia DTW sobre MFCC al «estudio» de HK03 (4,28) es la de la misma palabra en dos tomas (4,28-4,86) y no la de palabras distintas (4,93-5,99). Se pinta «estudio» y **se pregunta antes de exportar**: yo no puedo oír, y el encargo pedía oírlo. «Laureles»: whisper oye «Laurelis» (confianza 0,13 en «Lau»): es el barrio y la ficha lo dice.
- **Mitad = MD04** (`MEDIO5`): sin dudas de contenido (confianza ≥ 0,79). La voz habla de 0,88 a 5,76 s.
- **CTA = CT01** (`CTA1`): la voz habla de 0,57 a 4,90 s (`limites-voz.py` dice 0,26: otro ruido de −45 dB que no es voz); **POR CONFIRMAR AL OÍDO: «presencial»** (whisper oye «presenciar»; la frase y la ficha dicen «presencial»). El plano usa el clip de 0,20 a 5,17 s y funde a negro en los últimos 6 f.
- **Entradas.** El hook y el CTA entran **a corte** en un golpe (las tomas no dejan los 12 f de silencio que pide una disolvencia más los 10 f de bajada de la música antes de la primera palabra); solo la mitad disuelve (su toma tiene 26 f de aire). Las palabras caen a 11,4 f (hook), 12,4 f (mitad) y 11,1 f (CTA) del golpe.
- **La apertura = ZC22 3,40-5,83 s** (la pérgola, «sin tarjeta 2X1»): las mesas de las tomas ZC14, ZC15, ZC20, ZC21, ZC22 y ZC24 llevan en cuadro una tarjeta de promoción «2X1» de un restaurante (marca ajena: lo vio la sesión de la 062). ZC21 (la pérgola con la mesa en primer plano, desde el frame 0) es de la 062 y la evito; en ZC22 la mesa está lejos y la tarjeta no se lee. **La vista = ZC18 7,20-10,83 s** (el jacuzzi, el cielo con nubes, la ciudad y las montañas, la cámara rodeándolo bajo el borde de la pérgola): sin personas ni marcas.
- **Recorridos: un hilo propio, «lo que el huésped encuentra al llegar»** (RC01 · RC17 · RC07 · RC10 · ZC05 · ZC18; apertura ZC22). **No comparte ni un segundo con la 060 ni con la 062** (sección 7b de la puerta; coordinado en `side-session-notes/…/06x-tramos-de-recorrido.md`): la 060 tiene RC05 (la cocina desde la puerta; la mía fue RC05 hasta ver su plan y pasé a RC01, que ella ya no usa), RC16 (el baño), RC09, RC13, ZC03, ZC07 y ZC11; la 062, ZC10, ZC21, ZC29, ZC06, RC04, RC12 y RC18.
- **El orden del paseo** sigue el lugar sin volver atrás: terraza (apertura) → pasillo (hook) → cocina → estudio → cama y tele → [Isabella junto al escritorio] → sofá → [sale al edificio] → coworking → jacuzzi → [Isabella al fondo del estudio, el CTA]. Las tres tomas de Isabella están en el estudio de 24 m²: cambia el rincón (pasillo, escritorio y cama, ventanal) y la pose.
- **Canción = *La Isla Bonita (Saxophone 80 Mix)*** (`71321b4f`, reservada para esta V43): pop latino de los 80 en saxofón, sin pulso (406 golpes de ≥ 6 dB, 240 de ≥ 12; la V7 la midió así). El catálogo la marca «arranque flojo» (el nivel tarda 4,5 s en llegar): se entra por la **sección de 15,207 s** (golpe de 21,1 dB tras un respiro de 0,3 s, ya en la meseta de −13,6 LUFS), no por el principio. **Cada cambio de plano cae en un golpe MEDIDO** (`buscar-cortes-061.py`: 26 soluciones con los rangos de este plano; elegida la de golpes de 13,2-31,5 dB que usa una sección que no es la de la V7). **Medida, no oída; licencia sin verificar.**
- **El color:** `COLOR_BASE` del canal + el ajuste de cada plano, medido (`medir-color.py`): σ de luma entre planos 9,2 → 5,8, saturación 0,240 → 0,268, piel de Isabella en el mismo tono (16,5° → 16,3° · 19,8° → 19,2° · 19,0° → 18,6°).
- **Lo que se ve y conviene saber:** (1) el estudio es de 24 m² y **todo cabe en un plano**: los recorridos buscan detalle (el cajón de cubiertos, la colcha, la caja de seguridad) y no repiten el mismo general; (2) el cajón de RC01 lleva un rollo rojo (papel o similar): no se lee marca; (3) la tele del estudio muestra una pantalla de plataforma de series sin logo legible.
- **El disco:** ≈ 45 GB libres compartidos con otras dos sesiones del apartaestudio y las seis de las tandas anteriores; cada still o render deja un bundle de ≈ 2,4 GB en el tmp (`stills-multiples.mjs` borra el suyo).

## Lo que comparte con las otras versiones del apartaestudio (declarado)

| | 060 | 062 | V43 |
|---|---|---|---|
| Clips de recorrido | RC05, RC16, RC09, RC13, ZC03, ZC07, ZC11 | ZC10, ZC21, ZC29, ZC06, RC04, RC12, RC18 | RC01, RC17, RC07, RC10, ZC05, ZC18, ZC22 |
| Tramos en común | — | — | **ninguno** (puerta 7b) |
| HK04 · MD04 · CT01 · *La Isla Bonita* | — | — | exclusivas de esta pieza dentro del apartaestudio |

## Pendiente con el usuario (tras la final, 2026-10-22)

El usuario aprobó la prueba rev. 0 y pidió exportar («ficha, recorrido y portada»). Entregado en `finales/` (ver `combinaciones.md`, «Lo exportado»).

1. **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto): «**estudio**» (HK04, f84-f133 = 2,8-4,4 s del vídeo), «**Laureles**» (f133) y «**presencial**» (CT01, f1023-f1076). Medidas en `proyectos/061/medidas/`.
2. La canción (medida, no oída; repetida de la V7; licencia sin verificar) y el aéreo sustituto (¿la pérgola es la del edificio?).
3. Por dónde se escribe en el CTA (el botón/enlace) y si el caption lleva el WhatsApp.
