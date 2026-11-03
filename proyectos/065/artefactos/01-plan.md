# 01 · Plan narrativo — proyecto 065 · Lote en San Vicente Ferrer (vereda La Porquera), V47 del registro (tercer reel del lote: «15 minutos: la decisión»), REV. 2

> Paso 1 de 3. Escrito con el reparto **rev. 2** de la sesión madre (`proyectos/063/reparto-063-065.md`, que manda), el catálogo del rodaje (`proyectos/063/catalogo/catalogo-material.md`), la ficha de la web y lo aprendido en 043 (un lote), 060 (la infografía de cifras sin animar) y 054-062 (la puerta, las herramientas, la voz a −15 LUFS). Siguiente: [02-layout.md](02-layout.md).
>
> **La rev. 0/1 se descartó** (2026-10-22): el usuario cambió el material —dejó solo los cuatro mejores drones, todos verticales— y pidió otro planteamiento: «partir las tomas por el *ven, te muestro* y tapar los huecos con infografía». `hook4.mp4` resultó ser copia exacta de `Hook1.mp4`. Aquella versión (HK04 de mitad, tres drones, sin infografía) no se exporta.

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Pedido | Encargo del 2026-10-22: **3 reels del Lote en San Vicente Ferrer** (063, 064, 065; una sesión por reel, mismo checkout). Este es el **V47 / 065**, ángulo **«15 minutos: la decisión»**: dato, ficha, pregunta y conversación. Más las reglas fijas del canal (primera toma sin texto ni voz, nunca el sello, cierre en tarjeta oscura con el logo y la web, subtítulos editoriales, voz a −15 LUFS, música con curva, color por plano medido). |
| La propiedad y la ficha | **Lote en venta** en la vereda La Porquera, San Vicente Ferrer (Antioquia): **COP 350 M** (negociable) · **3.244 m²** · derecho de acueducto incluido · escrituras al 100 % · topografía mixta · parcelación abierta, sin portería · ~1 h de Medellín y **15 minutos de la autopista Medellín-Bogotá**. **Lo que la web NO dice, no se dice**: energía, uso del suelo, tipo de vía de acceso y «apto para construir». |
| Material | `Lote San Vicente Ferrer/Videos/` del SSD, copiado a `proyectos/065/original/` con el CÓDIGO del catálogo (sha256 en `normalizar.mjs`): HK03 `c6825c20`, CT05 `48d9c0cc`, CT01 `d8c0a599`; drones DR04 `ad2fe52e` y DR01 `8d2f7656` (los dos VERTICALES); música *deadmau5 - Strobe* `de6df12a`. |
| Composición | `Recorrido065` · 1080×1920 · **30 fps** · 1209 f (**40,3 s**). Clips normalizados a 1296×2304 y 30 fps. **Las tomas de Isabella son ANAMÓRFICAS** (`1920×1080`, SAR 81:256, DAR 9:16): se escalan ENTERAS con `setsar=1`, jamás se recortan. Los drones, 4K a 29,97 fps, `rotation=90`, sin audio (`setpts=PTS*1000/1001`). **No hay recorrido a pie.** |
| Formato | 9:16 vertical · `recorrido-luxur` adaptado a un lote (DRON · HOOK · INVITACIÓN · DRON + INFOGRAFÍA · MITAD · DRON · CTA) |
| Marca / texto | Luxur, texto **editorial** (abajo, 90 %, cursiva 8 px menor); **sin sello**; cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com` |
| Destino | Reels · Shorts · TikTok · y la versión con ficha para anuncios (1:1), **con la banda oculta mientras hay infografía** |
| Presentadora | Isabella Cadavid |

## El ángulo: «15 minutos: la decisión» (y en qué se distingue de los otros dos reels del lote)

**La idea en una línea:** este lote es para quien **decide con datos**: la pieza da las dos cifras que cuentan (3.244 m² y 15 minutos de la autopista, por 350 millones), dice «ven, te muestro» y lo **muestra** (la ficha encima del dron), hace la **pregunta** que separa al comprador (¿construir o invertir?) y cierra pidiendo **conversación** («comenta lote»). **El dato manda, la ficha lo prueba y la pregunta abre la conversación.**

| | V45 (063) | V46 (064) | **V47 (065)** |
|---|---|---|---|
| Ángulo | el error: comprar barato sin papeles | no hace falta irse lejos | **15 minutos: la decisión** |
| Hook (parte A) | `Hook1` | `Hook2` | **`Hook3` 8,18-16,2 s** «3.244 metros cuadrados a solo 15 minutos de la autopista Medellín-Bogotá y por solo 350 millones.» |
| Invitación (parte B) | `Hook1` 7,74-9,60 | `Hook2` 13,84-14,58 | **`Hook3` 16,72-17,55 s** «Ven, te muestro.» |
| Infografía | lo que sí tiene | distancias | **LA FICHA**: 3.244 m² · $ 350 M negociable · derecho de acueducto · escrituras 100 % |
| Mitad | `Medio3` | `Hook5` | **`cta5`** (solo la pregunta: «¿lo comprarías para construir o para invertir?») |
| CTA | CT02 | CT03 | **CT01** «Comenta “lote” y te envío toda la información para que vengas y lo conozcas.» |
| Drones | DR02 + DR01 0-24 s | DR03 + DR01 24-48 s | **DR04 + DR01 48-73,5 s** |
| Canción | *Oceans (Where Feet May Fail)* | *Cornfield Chase* | ***deadmau5 - Strobe*** |

### Lo que NO cambia respecto de las demás piezas del canal (y se dice)

- La puerta de diez planos de la 059/062, adaptada a un lote con infografía: 2a (cifras: dicha = escrita, y nada que la ficha no diga), 2e/2f (el ángulo, todo dron, la terna del reparto), **2g (la infografía)** y 4 (una canción de pulso constante).
- La voz de Isabella tratada a −15 LUFS, la música con curva de coseno que acaba de bajar antes de la primera palabra y un cierre de tarjeta oscura, sin congelar.

## Promesa y CTA

- **Promesa (primeros 3,8 s):** el vuelo de DR04 sobre la hierba, la cerca viva y los arbustos de flor blanca («el plano más bonito del material»), **sin texto ni voz** (regla fija), con el golpe de la canción en el f3. Isabella entra disolviendo, caminando por el campo hacia cámara, y habla desde el f127.
- **Acción final:** «comenta lote» (CT01): UNA acción. La pregunta del medio (¿construir o invertir?) la hace **ella** y se queda en su voz (los subtítulos la transcriben); **en pantalla no se promete nada**.
- **Lo que NO se cuenta:** energía, uso del suelo, tipo de vía, «apto para construir», rentabilidad ni valorización. Las cifras salen **escritas** porque ella las dice (3.244 · 15 · 350) y la infografía repite SOLO lo que dice la ficha.

## Escenas

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | 0,0-3,8 | Aéreo | el campo abierto | el vuelo | DR04 12,60-16,40 s · solo música: golpe de 17,5 dB en el f3 |
| 2 | 3,8-12,5 | Hook (A) | el dato | Isabella | HK03: camina por la loma hacia cámara · «3.244 metros cuadrados a solo 15 minutos de la autopista Medellín-Bogotá y por solo 350 millones.» |
| 2 | 12,5-14,6 | Invitación (B) | «ven, te muestro» | Isabella | HK03 B, **a corte** sobre su propia imagen y con un empuje del 8 al 14 % · «Ven, te muestro.» |
| 3 | 14,6-23,0 | Dron + ficha | lo que tiene | la ficha | DR04 22,0-30,5 s con LA FICHA: ÁREA 3.244 m² → PRECIO NEGOCIABLE $ 350 M → DERECHO DE ACUEDUCTO Incluido → Escrituras 100 % (cifras sin animar, una cada 1,4 s, en golpes) |
| 4 | 23,0-26,3 | Mitad | la pregunta | Isabella | CT05 (3,13-5,40 s): «¿Lo comprarías para construir o para invertir?» |
| 5 | 26,3-33,8 | Dron | el panorama y la vista | el dron | DR01 50,00-53,27 s (el panorama de la loma) → DR01 59,00-63,23 s (LA VISTA, el plano más largo) |
| 6 | 33,8-38,3 | CTA | conversación | Isabella | CT01 (3,41-7,2 s): «Comenta “lote” y te envío toda la información para que vengas y lo conozcas.» → funde a negro → tarjeta con el logo y la web |

## Decisiones tomadas (y las descartadas)

- **«Ven, te muestro» como invitación a corte.** `Hook3` dice la afirmación (8,18-16,2 s) y, tras 0,5 s de pausa, «ven, te muestro» (16,72-17,55 s). El plan los parte en dos planos de la MISMA toma: la parte B entra **a corte** (se quitan 6 f del paseo y la pausa) y con un **empuje del 8 al 14 %** que convierte el salto en un énfasis; después, el dron con la ficha encima: la frase promete algo y lo siguiente lo enseña.
- **Hook = la parte A de HK03 recortada al aire.** El clip dura 20,8 s pero Isabella no habla hasta los 8,18 s (camina por el campo): el plano entra con `desde` 232 f, 13,4 f antes de su primera palabra. La voz de A acaba en 16,2 s (la /s/ de «millones» cae a −57 dB).
- **La infografía es LA FICHA** (4 datos, los del reparto) con el modelo de la 060: **cifras sin animar**, cada una entra completa con un fundido de 8 f y se queda; **una cifra cada 1,4 s** (tres pulsos) en golpes MEDIDOS de la canción (13,3 · 15,6 · 18,9 · 22,1 dB); el héroe («Escrituras 100 %», la última) se queda 2,7 s. Panel centrado en y 960 (el centro del cuadrado 1:1) y dentro de y 570-1350; un velo negro del 60 % sube sobre el vuelo en los 14 f anteriores a la primera cifra (el dron se ve limpio durante el primer segundo). La banda de la versión con ficha SALE mientras hay cifras y vuelve después (`herramientas/ficha-oculta.mjs`). **«Amenidades» se traduce en lo que el lote sí tiene**: solo lo que la web dice.
- **Mitad = CT05, solo la pregunta.** No queda ninguna frase de mitad libre; la pregunta funciona de bisagra. **Se corta tras «invertir»** (5,40 s): «te leo en los comentarios» sería un segundo CTA y, además, Isabella vuelve a hablar a los 5,9 s: el plano acaba antes de que se vea hablar sin voz. **Un CTA en posición de mitad, declarado** (también en `combinaciones.md`).
- **CTA = CT01** (la voz habla de 3,41 a 7,2 s): una sola acción, comentar «lote».
- **Drones: DR04 (apertura y ficha) y DR01 48-73,5 s (el panorama y la vista).** Los dos tramos de DR01 vuelan hacia el mismo lado que DR04. La vista, el último plano antes del CTA y el más largo de su bloque (4,2 s), es la ladera con la cerca viva curva y el panorama de lomas.
- **Canción = *Strobe*** (`de6df12a`, progressive house, 128 BPM de PULSO CONSTANTE): se entra en el golpe de **554,937 s** (17,5 dB) y la pieza dura 40,3 s (hasta 595,2 s); se va apagando sola desde ≈ 592 s, bajo el CTA, y se apaga con curva bajo la tarjeta. Cada plano y cada cifra entran en un pulso con golpe medido de 12,8-22,1 dB (`musica/rejilla-554.txt`), evitando los pulsos en que el detector se retrasa 55 ms o no ve el bombo. **Medida, no oída; licencia sin verificar; el género (club) no es el de la propiedad.**
- **El color:** `COLOR_BASE` del canal + el ajuste de cada plano, medido (`medir-color.py`): σ de luma entre planos 10,2; quemado máx. 0,2 %; aplastado máx. 4,8 %. Los verdes del dron se bajan a saturación 0,95 (el suelo del canal) y se les sube un punto de exposición.

## Pendiente con el usuario

1. Ver la prueba (sin final hasta su OK). La canción (medida, no oída; licencia sin verificar; género de club).
2. Si quiere el subtítulo de la pregunta de la mitad (menciona «construir»): la hace ella y se transcribe; no hay rótulo propio que lo prometa.
