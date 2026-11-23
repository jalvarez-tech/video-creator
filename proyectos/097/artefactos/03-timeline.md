# 03 · Timeline — proyecto 097 · «Lo más bonito de un regalo»

> Paso 3 de 3. El frame exacto de cada cosa. **Rev. 1 (2026-11-22):** entra la voz en off (seis frases), la revelación de que las niñas reciben regalos de Estrellitas, la meta, la vía desde lejos (página de MAS y QR) y la voz de VT33 en el cierre.
> Está escrito con los mapas y la doble transcripción delante ([`material/analisis-videos.md`](../material/analisis-videos.md) §10), **pero sin oír el material**. Los instantes dentro de una frase (la palabra «Cristo», «Amor», el corte de «Lo primero,») son estimaciones: se fijan con la transcripción **por palabra** (`transcribir.mjs --palabras`, con `-map 0:a:0`) antes de escribir los planes. Donde dice ≈, es eso. **La voz en off** está estimada a 5 sílabas por segundo; se ajusta a la locución real.
> De aquí salen, casi copiando: `metraje-097.ts` · `graficos-097.ts` · `cues-097.ts` · `audio-097.ts` (y `normalizar.mjs` + `revisar-097.mjs`).

> **Rev. 4 (2026-11-22) · MONTADO SOBRE LA PISTA ENTERA.** El usuario pidió que la música no se cortara: «Yeshua (Versión Piano)» suena de corrido desde su primera nota y el montaje se ordena por las partes de la pieza. **La alegría (HZ08 → HZ32) va ahora ANTES del testimonio**, con DR02 y DR03 nuevos antes de DR04; el vídeo dura 3790 f (126,3 s). Los frames de esta tabla son los de la rev. 1: **los vigentes están en `remotion/src/proyectos/097/metraje-097.ts` (con `GOLPES_097`) y `textos-097.ts`**, y el porqué de la música, en la cabecera de `audio-097.ts`.

> **Rev. 5 (2026-11-22).** El vídeo **empieza en la puerta** («¡Bienvenidos a la Nuestra!»): fuera el dron del hook, la pregunta sobre él y **VO1** (la voz en off queda en cinco frases). DR05 pasa al sitio de DR03. **Sin QR**: los pasos son «Toma una estrellita del árbol · Haz tu donación (cuenta Bancolombia) · Envía el comprobante». La pista arranca en su golpe de 6,51 s para que cada escena siga sobre la misma parte de la pieza. 3636 f (121,2 s).

**fps de la comp:** 30 → `frame = round(segundo × 30)`. Todos los números de este archivo son frames absolutos a ese fps. **Duración: 3483 f (116,1 s).**

**Fuentes:** el `desde`/`hasta` de cada plano va en **segundos de la fuente**. Los DR son de 29,97 fps: en el plan, `desde × 1000/1001`, y en el normalizado, `setpts=PTS*1000/1001` antes de `fps=30`.

**Dos tiras, dos voces:** lo que dicen **las niñas**, en la **tira amarilla** con «comillas»; lo que dice **la voz en off (MAS)**, en una **tira índigo** con letra blanca y sin comillas (11,99 : 1). Así, sin sonido, se sabe quién habla. Ver [02-layout.md](02-layout.md) §4.2.

## Mapa maestro

Una fila por plano. Una celda vacía (—) significa que esa capa **no hace nada** ahí, y eso es una decisión, no un olvido.

### Acto 1 · La pregunta (f0–f315)

| frames | s | narrativa | plano (fuente, s) | voz (frase real) · **VO** | texto en pantalla · animación | música | SFX |
|---|---|---|---|---|---|---|---|
| **0–180** | 0,00–6,00 | hook | **P01 · DR05 0,70–6,70.** Cenital pegado a las caras que miran al dron y saludan; sube | **en off, f30–f75:** VT06 2,80–4,30 «¿Qué es lo más bonito de recibir un regalo?» · **VO1, f90–≈f171:** «Esa tarde, la respuesta nos la dieron ellas.» | **f0:** la tira amarilla con la pregunta **ya puesta** (el frame 0 es la miniatura). **f30→f75:** un subrayado azul avanza bajo cada palabra mientras ella la dice. **f75:** la estrella se pega junto a «regalo» (**ancla 1**). f80–f86: la tira se funde. **f90:** tira índigo con VO1. f171–f177: se funde | silencio hasta f75; **f75:** entra el piano solo (tramo 1, «Intro»), justo cuando ella termina, y queda bajo bajo VO1 | `ambient-wind` f0–f180, muy bajo (el dron llega mudo, y el silencio digital suena a fallo) · `sparkle` f75 (ancla) |
| **180–315** | 6,00–10,50 | contexto | **P02 · HZ20 0,00–4,50.** Dos niñas ante la puerta con guirnalda; la abren | f246–f306: «¡Bienvenidos a la Nuestra!» | f186: kicker «20 de noviembre de 2026» arriba a la izquierda **[POR CONFIRMAR CON MAS: fecha y nombre de la casa]** · f246: tira «¡Bienvenidos a la Nuestra!» · f309: salen las dos | **f180: primer golpe** (tramo 2, «Verso 1»): el corte cae en él · bajada en coseno f236–f244 · subida f306–f330 | — |

### Acto 2 · Lo que piden (f315–f744)

| frames | s | narrativa | plano (fuente, s) | voz | texto · animación | música | SFX |
|---|---|---|---|---|---|---|---|
| **315–381** | 10,50–12,70 | contexto | **P03 · HZ14 0,50–2,70.** La niña del centro de la escalera, con el perro delante | f321–f375: «Yo quiero de Navidad una radio.» (⚠ el «de»: no se pinta la frase) | ≈f351 (en «radio»): **pegatina «una radio»** arriba a la izquierda, con un regalo dibujado | verso 1, bajo la voz | `pop` ≈f351 (vi 0) |
| **381–468** | 12,70–15,60 | contexto | **P04 · HZ15 0,40–3,30.** Niña de pelo rizado entre los postes de la baranda | f387–f462: «Yo lo que quiero pedir de Navidad es un conejito.» | ≈f447: **pegatina «un conejito»**, a la derecha de la anterior | — | `pop` ≈f447 (vi 1) |
| **468–528** | 15,60–17,60 | contexto | **P05 · HZ16 0,50–2,50.** Tres niñas en la escalera; habla la de la derecha | f474–f519: «¡Yo quiero un bafle!» | ≈f501: **pegatina «un bafle»**, tercera de la fila | — | `pop` ≈f501 (vi 2) |
| **528–744** | 17,60–24,80 | revelación | **P06 · HZ17 0,50–7,70.** Cinco niñas en la escalera de madera, con el acercamiento lento que ya trae el plano | f537–f642: «Yo lo que quiero en Navidad es a Cristo en mi vida…» · f663–f735: «…y también quiero una Biblia muy grande.» | ≈f585: las tres pegatinas se apagan y salen hasta f600 · **≈f603 (en «Cristo»):** hero de papel **«a Cristo en mi vida»**, con «Cristo» en azul (110 px) · ≈f609: óvalo de rotulador alrededor de «Cristo» · ≈f611: **ancla 2** · f666: segunda línea «y una Biblia muy grande» · ≈f723: «grande» crece 1,00→1,30 en 12 f · f738: sale todo | verso 1; la voz manda | `scribble` ≈f609 (el óvalo, bajo) · `sparkle` ≈f611 (ancla) |

### Acto 3 · Lo que sueñan y lo que saben (f744–f1254)

| frames | s | narrativa | plano (fuente, s) | voz | texto · animación | música | SFX |
|---|---|---|---|---|---|---|---|
| **744–834** | 24,80–27,80 | contexto | **P07 · VT13 0,60–3,60**, recortado a 16:9 (las dos niñas, el micro y el árbol) | f750–f774: «¿Cuáles son tus sueños?» · f801–f819: «Ser policía.» | f750: tira «¿Cuáles son tus sueños?» → f801: «Ser **policía**.» | **f744:** entra el tramo 3, «Verso 2»: suben las cuerdas, **sin golpe** (la voz entra a 6 f del corte) | — |
| ⟨opc.⟩ | +5,0 s | contexto | **Ranura VT19 20,70–25,70** (fuera por defecto): «¿Qué quieres ser cuando seas grande?» → «Cantante.» | — | tira con la pregunta → «**Cantante**.» | — | — |
| **834–897** | 27,80–29,90 | explicación | **P08 · VT11 4,80–6,90**, recortado (adulto y niña de perfil, el árbol entre ellos) | f837–f897: «Lo primero, ¿qué aprendiste de Dios este año?» | ≈f855 (al empezar «¿qué…»): tira «¿Qué aprendiste de Dios este año?» (el «Lo primero,» no se pinta) | verso 2 | — |
| **897–990** | 29,90–33,00 | explicación | **P09 · VT10 4,30–7,40**, recortado (de la cabeza a la cadera) | f903–f984: «Es saber a perdonar a las demás personas.» | f903: tira «Es saber a **perdonar** a las demás personas.» · ≈f935: subrayado azul bajo «perdonar» | — | `scribble` ≈f935 (muy bajo) |
| **990–1062** | 33,00–35,40 | demostración | **P10 · HZ01 0,00–2,40.** La entrevistadora (niña de moño alto) junto al árbol | f990–f1056: «¿Cuál es la cualidad más bonita de Dios?» | f990: kicker **«Ellas mismas hacían las preguntas.»** · f993: tira con la pregunta · f1059: sale la tira | — | — |
| **1062–1107** | 35,40–36,90 | demostración | **P11 · HZ05 26,80–28,30** | f1071–f1101: «Amoroso.» | f1071: **«Amoroso»** grande, en el hueco del plano | — | — |
| **1107–1146** | 36,90–38,20 | demostración | **P12 · HZ05 11,90–13,20** | f1116–f1143: «Bondadoso.» | f1116: **«Bondadoso»**; «Amoroso» se encoge y pasa a la columna de la derecha (8 f) | — | — |
| **1146–1194** | 38,20–39,80 | demostración | **P13 · HZ05 17,90–19,50** | f1152–f1191: «Misericordioso.» | f1152: **«Misericordioso»** (la columna crece) | — | — |
| **1194–1227** | 39,80–40,90 | demostración | **P14 · HZ05 31,00–32,10** | f1203–f1221: «Compasivo.» | f1203: **«Compasivo»** | — | — |
| **1227–1254** | 40,90–41,80 | demostración | **P15 · HZ06 20,30–21,20** | f1233–f1245: «¡Fiel!» | f1233: **«¡Fiel!»** · f1245: la columna completa (cinco palabras) · f1248–f1254: sale todo | **la retirada:** bajada en coseno f1227–f1251 | — |
| ⟨opc.⟩ | +2,4 s | demostración | **Ranura HZ07 ≈0,90–3,30** **[OÍR ANTES DE LA FINAL]**: «Para mí es un Dios de oportunidades», cortado **antes** de «porque…» | — | tira «Para mí es un Dios de **oportunidades**.» | — | — |

### Acto 4 · El corazón (f1254–f1686)

| frames | s | narrativa | plano (fuente, s) | voz | texto · animación | música | SFX |
|---|---|---|---|---|---|---|---|
| **1254–1290** | 41,80–43,00 | revelación | **P16 · VT07 3,80–5,00**, recortado. La de moño alto pregunta, micro en la boca | f1257–f1296: «¿Cómo va tu relación con Cristo?» **[OÍR ANTES DE LA FINAL: «va» o «está»]**. La cola (5,0–5,2) suena 6 f sobre P17 (corte en L) para saltar el barrido de 5,0–5,3 | f1257: tira con la pregunta (el verbo, por confirmar al oído) | tramo 4, «Retirada»: un pad sostenido, muy bajo | — |
| **1290–1686** | 43,00–56,20 | revelación | **P17 · VT07 5,30–18,50**, recortado (de la cabeza a la cintura, de tres cuartos ante el árbol y los regalos, mano en el pecho). **Acercamiento lento 1,00→1,06**, lineal | f1317–f1395: «Mi relación con Cristo es un proceso.» · f1410–f1542: «Hay veces siento que estamos cerquitas, pero hay veces siento que me alejo,» · f1548–f1656: «entonces trato de aferrarme a la verdad de Cristo.» | **Solo la tira, trozo a trozo, sin prisa:** f1317 «Mi relación con Cristo es un proceso.» → f1410 «Hay veces siento que estamos cerquitas,» → ≈f1473 «pero hay veces siento que me alejo,» → f1548 «entonces trato de aferrarme» → ≈f1605 «a la verdad de Cristo.» · ≈f1615: subrayado azul bajo «la verdad de Cristo» · f1665–f1677: la tira se funde despacio | pad muy bajo, casi nada · **f1656–f1686: silencio total** (el segundo de después) | **ninguno, a propósito** |

### Acto 5 · La alegría (f1686–f2241)

| frames | s | narrativa | plano (fuente, s) | voz | texto · animación | música | SFX |
|---|---|---|---|---|---|---|---|
| **1686–1752** | 56,20–58,40 | conclusión | **P18 · HZ08 0,70–2,90.** Dos niñas llegan al pie del tobogán azul gritando | f1686–f1752: «¡Misericordia, Amor y Servicio!» (medir que el corte no se coma el «Mi-») | hero: **«¡Misericordia,»** f1686 con subrayado verde → **«Amor»** ≈f1713, lavanda → **«y Servicio!»** ≈f1731, rojo · f1750: sale | **f1686: CORTE SECO.** Del silencio al grito: el tramo 5, «Coro», entra de golpe con el grito, en el mismo frame | `scribble` ≈f1715 (los tres trazos, uno solo, −30 dBFS) |
| **1752–1830** | 58,40–61,00 | conclusión | **P19 · HZ10 1,00–3,60.** Bajada por el tobogán rojo con la V; acaba riendo cerca de cámara | f1752–f1824: «¡Feliz Navidad para todos!» (límites por medir: la energía va de 0,7 a 3,4) | f1755: tira «¡Feliz Navidad para todos!» · f1824: sale | coro, bajo los gritos solo −6 dB | — |
| **1830–1944** | 61,00–64,80 | conclusión | **P20 · HZ19 0,50–4,30.** Siete niñas en la baranda, en contrapicado entre hojas | f1833–f1911: «¡Dios es bueno!» · **3,6–4,3 de la fuente (f1923–f1944) sin su audio:** la 2.ª frase («¡A la lucha!» o «¡Aleluya!») está sin oír | f1833: tira «¡Dios es bueno!» · f1914: sale · **f1935, f1939, f1943:** tres corazones de contorno blanco junto a las manos | coro | `sparkle` f1935 (vi 1, **no** el del ancla; −28) |
| **1944–1980** | 64,80–66,00 | conclusión | **P21 · HZ28 1,20–2,40.** Tres niñas ríen con los regalos en alto, ante el árbol y la chimenea | risas (bajo la música) | — | coro | — |
| **1980–2079** | 66,00–69,30 | conclusión | **P22 · DR04 1,20–4,50.** Vuelo rasante por el pasillo de niñas que saludan | — (el dron no trae audio) | — | el coro crece | `wind` (whoosh) con el pico en f2049, el paso más rápido (−30) |
| **2079–2241** | 69,30–74,70 | conclusión | **P23 · HZ32 0,70–6,10.** Foto de grupo en la terraza al atardecer; más de treinta personas, brazos arriba | f2088–f2235: «¡Gracias a Dios por la Navidad!» (crece en f2187–f2220, cuando suben los brazos) | f2091: hero de papel centrado **«¡Gracias a Dios por la Navidad!»** · **f2187: la estrella sube con los brazos**, de la línea del texto a arriba a la derecha (**ancla 3**) · f2229: sale | **PICO del coro en f2187**; resuelve con el final del grito, cola hasta f2241 | `sparkle` f2187 (ancla; bajo el grito, −24) |

### Acto 6 · La respuesta y la revelación (f2241–f2718)

| frames | s | narrativa | plano (fuente, s) | voz · **VO** | texto · animación | música | SFX |
|---|---|---|---|---|---|---|---|
| **2241–2307** | 74,70–76,90 | (respiro) | **P24 · VT36 0,40–2,60**, recortado (franja dorada: montañas y palmeras), con un **fundido cruzado de 10 f** desde HZ32 | — (su audio no se usa: alguien pregunta por la música) | — | **f2241:** tramo 6, «Caída»: piano solo, tierno · bajada en coseno f2298–f2308 | — |
| **2307–2358** | 76,90–78,60 | revelación | **P25 · VT06 2,70–4,40**, recortado: la niña del recogido, micro en la boca | f2310–f2355: «¿Qué es lo más bonito de recibir un regalo?» | f2310: **la misma tira del hook**, en el mismo sitio y con el mismo estilo (se reconoce la pregunta) | piano, bajo la voz | — |
| **2358–2466** | 78,60–82,20 | revelación | **P26 · VT06 4,70–8,30**, recortado: la niña de trenzas, de perfil ante el árbol iluminado, manos juntas | f2358–f2463: «Saber que la persona me lo dio con mucho cariño y amor.» (**llega baja: [OÍR ANTES DE LA FINAL] si la ganancia basta**) | f2361: tira «Saber que la persona me lo dio con mucho **cariño y amor**.» · ≈f2440: subrayado azul bajo «cariño y amor» · ≈f2455: destello (**ancla 4**) · la tira sigue después del corte, hasta f2481 | piano | `sparkle` ≈f2455 (ancla, −26) |
| **2466–2718** | 82,20–90,60 | cta | **P27 · DR07 1,50–9,90.** Cenital: el grupo sentado en círculo en la terraza, que mira arriba; el dron sube despacio y el centro del círculo queda vacío | **VO2a, f2496–≈f2595:** «Ellas reciben su regalo gracias a MAS Estrellitas.» · **VO2b, f2607–≈f2688:** «Esta Navidad, esa persona puedes ser tú.» | f2481: sale la tira de la respuesta · **f2496: tira índigo** «Ellas reciben su regalo gracias a MAS Estrellitas.» (sale f2600) · **f2607: hero** «Esta Navidad, esa persona puedes ser **tú**.» (abajo, centrado) · f2616: la estrella aparece arriba y baja · **f2694: aterriza en el centro del círculo** (**ancla 5**) · f2712: sale el hero | **f2466:** tramo 7, «Final»: vuelven las cuerdas, cálidas, sin percusión; bajada antes de f2496 | `sparkle` f2616 (ancla, bajo VO2b) · `chime` f2694 (aterriza, ya sin voz) |

### Acto 7 · La estrellita (f2718–f3483)

| frames | s | narrativa | toma | **VO** | texto · animación | música | SFX |
|---|---|---|---|---|---|---|---|
| **2718–2898** | 90,60–96,60 | cta | **P28 · PAPEL** (molde `pantalla`). La hoja amarilla entra de derecha a izquierda en 10 f; la estrella del círculo crece y se queda a la izquierda | **VO3, f2730–≈f2886:** «Este año queremos entregar más de tres mil regalos. Uno puede ser el tuyo.» | f2730: «Este año queremos entregar más de» · **f2736–f2784: contador 0 → 3.000** (azul, 220 px; aterriza con «tres mil») · f2787: «regalos a niños de las zonas más apartadas del país.» · **≈f2832: «+1»** en azul junto a la cifra, con la estrella, y «**Uno puede ser el tuyo.**» | final, bajo la voz | `paper` f2718 · `chime` f2784 (bajo la voz) |
| **2898–3318** | 96,60–110,60 | cta | **P29 · PAPEL.** El dato se encoge a la columna de la izquierda (f2898–f2910). A la derecha, los tres pasos del cartel, al ritmo de VO4 | **VO4, f2910–≈f3165:** «Toma una estrellita del árbol en la entrada de la iglesia, haz tu donación y envía el comprobante. Hasta el 20 de diciembre.» · **VO5, f3180–≈f3279:** «Y si estás lejos, puedes donar desde la página de MAS.» | **f2910: ★1** + «Toma una estrellita» · «en las oficinas del M.A.S.» → f2988–f3003: camino punteado → **f3003: ★2** + «Compra tu regalo» · «y entrégalo sin envolver, con la estrellita.» → f3036–f3051: camino → **f3051: ★3** + «Entrega el regalo» · «únicamente en las oficinas del M.A.S. · Calle 103 No. 14-63» **[ciudad POR CONFIRMAR CON MAS]** · **f3114: «Del 15 de noviembre al 20 de diciembre»** (abajo a la izquierda, 64 px) · **f3180: «¿Estás lejos? Dona en [página de MAS]»** **[dirección POR CONFIRMAR CON MAS]** + **QR** (240 px, marco blanco) abajo a la derecha · **f3180–f3318: todo quieto** (4,6 s para leer, escanear o hacer captura) | final, estable, bajo la voz | `sparkle` f2910, f3003, f3051 (el mismo destello: el ancla se repite a propósito, cada vez −2 dB y bajo la voz) · `scribble` f2988 y f3036 (el camino) |
| **3318–3483** | 110,60–116,10 | cta | **P30 · PAPEL.** Los pasos se apartan (fundido f3318–f3328); el QR se queda, pequeño, abajo a la derecha. Entra la foto-pegatina **FT35** (el grupo al atardecer) a la izquierda | **f3345–f3420:** VT33 64,90–67,40 «Gracias por acompañarme en este viaje.» · alternativa: f3345–f3366 VT06 8,50–9,20 «Muchísimas gracias.» | f3324: la foto-pegatina se asienta (giro −3°) · **f3336: «Toma una estrellita.»** (Dosis 800, «estrellita» en azul ≥ 90 px) con la estrella (**ancla 6**) · f3345: pie de foto pequeño con la frase que suena (Dosis 500, 34 px) · f3360: firma CSR \| MAS y lockup «MAS estrellitas 2026» **[archivos POR CONFIRMAR CON MAS]** · f3375: «Compártelo con quien pueda llevar un regalo.» · **f3483: el último frame, quieto, con el QR** | **acorde final en f3318**; su cola baja en coseno f3333–f3343 bajo la voz de la niña; se apaga a 0 en f3480 | `paper` f3324 · `sparkle` f3336 (ancla) · la firma, **sin sonido** (caería sobre la voz) |

## Las anclas (la estrellita)

Las seis veces que la estrella azul aparece con **el mismo destello** (`sparkle`, `variantIndex` fijo). La regla anti-repetición de `diseno-sonoro` §12 se rompe aquí **a propósito y declarado**: un ancla es la repetición.

| # | frame | momento | qué carga |
|---|---|---|---|
| 1 | f75 | «…de recibir un regalo?» | la curiosidad |
| 2 | ≈f611 | «a Cristo en mi vida» | la sorpresa y la ternura |
| 3 | f2187 | los brazos arriba en «¡Gracias a Dios por la Navidad!» | la alegría, el grupo |
| 4 | ≈f2455 | «…con mucho cariño y amor.» | la verdad del vídeo |
| 5 | f2616 → f2694 | baja al centro del círculo mientras suena «esa persona puedes ser tú» | el sitio que se le hace a quien mira |
| 6 | f2910 · f3003 · f3051 · f3336 | los tres pasos y «Toma una estrellita» | la acción, con todo lo anterior encima |

## Tomas de gráficos (borrador de `graficos-097.ts`)

Una fila por **toma**: `gfx(id, molde, beat, ventana, jerarquía, reason, hijos)`. El árbol de hijos lo describe [02-layout.md](02-layout.md) §4.2.
**Ojo con los moldes:** los del catálogo (`sello`, `franja`, `cta`…) están medidos para 9:16 (caja de 844 px de ancho sobre una base de 1080). En la fase de código, `revisaPlan` dirá si sirven a 1920×1080 o si las piezas del proyecto declaran su propio molde (`tira`, abajo; `alto`, arriba).

| id | molde | beat | ventana | jerarquía | hijos (árbol) | reason |
|---|---|---|---|---|---|---|
| `g00-papel` | `capa` | — | 2718–3483 | ambiente | textura de papel con deriva de ±4 px | Que el amarillo no se lea como imagen congelada |
| `g01-pregunta` | tira | gancho | 0–86 | hero | `CitaPapel` + `subrayado` por palabra + `Estrellita` (f75) | La pregunta abre el bucle: tiene que estar en el frame 0 y leerse sin sonido |
| `g01b-vo1` | tira | gancho | 90–177 | hero | `CitaPapel` (piel índigo) | Promete que la respuesta existe y que la tienen ellas |
| `g02-fecha` | alto | gancho | 186–309 | apoyo | `kicker` | Dice que esto pasó de verdad, un día concreto |
| `g03-bienvenida` | tira | gancho | 246–309 | hero | `CitaPapel` | La invitación a entrar, en su voz |
| `g04-deseos` | alto | problema | 351–600 | hero | `fila([PegatinaDeseo ×3])`, con entrada escalonada por voz y `atenua` al final | Lo que todos reconocemos: tres síes callados antes de llevar a lo hondo |
| `g05-cristo` | alto | giro | 603–738 | hero | `col([titular «a Cristo en mi vida» con tinta azul en «Cristo», rodea, Estrellita, titular «y una Biblia muy grande» con escala en «grande»])` | La lista de cosas se rompe con algo que no es una cosa |
| `g06-suenos` | tira | prueba | 750–831 | hero | `CitaPapel` (conmuta en f801) | Tienen futuro, no solo deseos |
| `g07-aprendido` | tira | prueba | 855–987 | hero | `CitaPapel` + `subrayado` en «perdonar» | El valor dicho por una niña pesa más que dicho por un adulto |
| `g08-kicker` | alto | mecanismo | 990–1059 | apoyo | `kicker` «Ellas mismas hacían las preguntas.» | Agencia: ellas son las protagonistas, no el objeto |
| `g09-pregunta-dios` | tira | mecanismo | 993–1059 | hero | `CitaPapel` | Prepara la cadena de palabras |
| `g10-cualidades` | centro → alto | mecanismo | 1071–1254 | hero | `ranura` de cinco `titular` + `lista` que se llena con `atenua` | Una palabra por niña; la columna deja el inventario a la vista |
| `g11-testimonio` | tira | giro | 1257–1677 | hero | `CitaPapel` en `ranura` (cinco trozos) + `subrayado` | El corazón del vídeo: solo texto, lento, sin adornos |
| `g12-mas` | centro | remate | 1686–1750 | hero | `fila([titular ×3 con subrayado verde · lavanda · rojo])` | Las niñas gritan el nombre de la fundación |
| `g13-alegria` | tira | remate | 1755–1914 | hero | `CitaPapel` ×2 | Que se entienda sin sonido |
| `g14-corazones` | — | remate | 1935–1965 | apoyo | `Corazon ×3` | Subraya el gesto de las manos |
| `g15-gracias` | centro | remate | 2091–2229 | hero | `titular` en `piel` de papel + `Estrellita` que sube | El clímax: la gratitud a coro |
| `g16-respuesta` | tira | giro | 2310–2481 | hero | `CitaPapel` (igual que `g01`) + `subrayado` + destello | Se cierra el bucle del segundo 1 |
| `g17a-revelacion` | tira | giro | 2496–2600 | hero | `CitaPapel` (piel índigo) | Las niñas que acabas de ver son las que reciben |
| `g17b-puente` | tira (centrada) | cta | 2607–2712 | hero | `titular` + `Estrellita` que baja al círculo | De la respuesta a quien mira: la identidad |
| `g18-meta` | `pantalla` | cta | 2730–2910 | hero | `col([kicker, fila([contador 3.000, «+1» + Estrellita]), etiqueta, titular «Uno puede ser el tuyo.»])` | La meta es de todos y la parte de cada uno es concreta: uno |
| `g19-pasos` | `pantalla` | cta | 2910–3318 | hero | `fila([Estrellita n, col([titular, etiqueta])]) ×3` + `enlace` ×2 + `titular` fechas + `fila([etiqueta «¿Estás lejos? Dona en…», QR])` | El cartel en movimiento: tres pasos fáciles y la salida para quien está lejos |
| `g20-cierre` | `pantalla` | cta | 3318–3483 | hero | `FotoPegatina` + `titular` «Toma una estrellita.» + imagen de la firma + `etiqueta` + QR pequeño | Una sola acción, la firma de quien la pide y el QR quieto para las iglesias |

Comprueba el plan antes de renderizar: `revisaPlan(graficos097)` (dos heroes solapados, ventanas de menos de medio segundo, `reason` vacíos, lo que no cabe: R08 y R09).

## Cues de sonido (borrador de `cues-097.ts`)

Familia **orgánica**: papel, trazo, destello, campanilla, viento. **Antes de escribir los cues, se mide el golpe real de cada archivo** (`node manuales/diseno-sonoro/scripts/sfx.mjs medir remotion/public/sfx/<archivo>`): en un banco real el golpe puede caer hasta 1 s dentro del archivo, y `cue()` lo recortaría (R26).

| id | type | variant | targetFrame | dur | reason |
|---|---|---|---|---|---|
| `amb-montana` | texture | ambient-wind | 0 | 180 | El dron llega mudo: un aire de montaña muy bajo bajo la pregunta |
| `ancla-1` | impact | sparkle | 75 | 24 | La estrella se pega a «regalo»: primera vez que suena el ancla |
| `deseo-1` / `-2` / `-3` | impact | pop (vi 0 · 1 · 2) | ≈351 · ≈447 · ≈501 | 10 | Cada pegatina de deseo |
| `ovalo-cristo` | whoosh | scribble | ≈609 | 16 | El óvalo de rotulador alrededor de «Cristo» |
| `ancla-2` | impact | sparkle | ≈611 | 24 | «a Cristo en mi vida» |
| `trazo-perdonar` | whoosh | scribble | ≈935 | 14 | Subrayado bajo «perdonar» (muy bajo) |
| `trazo-mas` | whoosh | scribble | ≈1715 | 20 | Los tres subrayados del grito (uno solo, bajo el grito) |
| `corazones` | impact | sparkle (vi 1) | 1935 | 20 | Los corazones de HZ19; **no** es el ancla |
| `dron-pasillo` | whoosh | wind | 2049 | 40 | El paso más rápido del dron por el pasillo |
| `ancla-3` | impact | sparkle | 2187 | 24 | Los brazos arriba en «¡Gracias a Dios por la Navidad!» |
| `ancla-4` | impact | sparkle | ≈2455 | 24 | «…cariño y amor» |
| `ancla-5` | impact | sparkle | 2616 | 24 | La estrella aparece sobre el círculo (bajo VO2b: `underDialogue`) |
| `estrella-aterriza` | impact | chime | 2694 | 30 | Aterriza en el centro del círculo, ya sin voz |
| `hoja` | click | paper | 2718 | 10 | Entra la hoja amarilla del CTA |
| `contador` | impact | chime | 2784 | 30 | El 3.000 aterriza (bajo VO3: `underDialogue`) |
| `paso-1` / `-2` / `-3` | impact | sparkle | 2910 · 3003 · 3051 | 24 | Las estrellas de los pasos (ancla; cada vez −2 dB, `underDialogue`) |
| `camino-1` / `-2` | whoosh | scribble | 2988 · 3036 | 15 | Se dibuja el camino punteado (bajo VO4) |
| `pegatina-foto` | click | paper | 3324 | 10 | La foto-pegatina se asienta |
| `ancla-6` | impact | sparkle | 3336 | 24 | «Toma una estrellita.», antes de la voz de la niña |

- **Mezcla:** `<PistaSonido cues={cues097} duckDb={-4.5} />`. Los SFX van siempre bajo las voces; **ninguno en el testimonio** (f1254–f1686). Bajo la voz en off van marcados `underDialogue`.
- Sin `whoosh` en los cortes: el ritmo lo ponen la música y las voces. El único corte con sonido propio es el seco de f1686, y el sonido es el grito.

## Voces (borrador de las voces de `audio-097.ts`)

- **Las de las niñas salen de los cortes** (`vocesDeCortes(metraje097, { fps: 30, objetivoLufs })`): cada plano con voz lleva `audio` (el WAV del plano, extraído con `-map 0:a:0`) y `voz: { s0, s1, lufs, dice }` medida con `limites-voz.py` (R29).
- **Tramos sueltos**, porque su voz no es la de su imagen:

  | id | fuente | frames | frase |
  |---|---|---|---|
  | `vo-pregunta` | VT06 2,80–4,30 | f30–f75 | «¿Qué es lo más bonito de recibir un regalo?» |
  | `vo1` | voz en off | f90–≈f171 | «Esa tarde, la respuesta nos la dieron ellas.» |
  | `vo2a` | voz en off | f2496–≈f2595 | «Ellas reciben su regalo gracias a MAS Estrellitas.» |
  | `vo2b` | voz en off | f2607–≈f2688 | «Esta Navidad, esa persona puedes ser tú.» |
  | `vo3` | voz en off | f2730–≈f2886 | «Este año queremos entregar más de tres mil regalos. Uno puede ser el tuyo.» |
  | `vo4` | voz en off | f2910–≈f3165 | «Toma una estrellita del árbol en la entrada de la iglesia, haz tu donación y envía el comprobante. Hasta el 20 de diciembre.» |
  | `vo5` | voz en off | f3180–≈f3279 | «Y si estás lejos, puedes donar desde la página de MAS.» |
  | `vo-gracias` | VT33 64,90–67,40 | f3345–f3420 | «Gracias por acompañarme en este viaje.» (alternativa: VT06 8,50–9,20, f3345–f3366) |

- **La voz en off se graba o se genera en WAV, frase a frase** (seis archivos o uno con pausas), y se mide con `limites-voz.py` antes de colocarla. Si una frase sale más larga que su hueco, se acorta la frase, nunca un plano con una niña.
- **Nivel:** las preguntas de las niñas llegan casi a 0 dBFS y las respuestas a −20/−30 dBFS. **Una ganancia por tramo hasta una mediana común** (propuesta: −18 LUFS por tramo) con un limitador a −2 dBTP para los gritos (HZ08, HZ19, HZ32). La voz en off, a la misma mediana: no debe sonar «encima» de las niñas. Nada más (R29). Si VT06 o VT07 no llegan limpias con ganancia, se propone `voice-isolator` (ElevenLabs, **cuesta: se pregunta antes**).
- **Muteados a propósito:** HZ19 3,6–4,3 (la 2.ª frase sin oír), todo VT36 y el ruido de HZ28 por debajo de la música.

## Música por tramos (borrador de la música de `audio-097.ts` y del plan de composición)

La música se genera (o se elige) **después** de aprobar este timeline y **antes** del montaje fino. Luego se miden sus golpes, y los cortes grandes se mueven ≤ 2 f para caer en ellos (R33). Siete tramos, que son también los `chunks` del plan de composición de ElevenLabs (cada uno de 3 a 120 s):

| # | frames | dur (s) | tramo | carácter |
|---|---|---|---|---|
| 1 | 75–180 | 3,5 | Intro | piano solo, delicado, bajo bajo VO1; **acaba en un golpe en f180** (el corte a HZ20) |
| 2 | 180–744 | 18,8 | Verso 1 | piano + celesta + pizzicato de cuerdas; ligero, sonriente; ≈ 75 BPM |
| 3 | 744–1254 | 17,0 | Verso 2 | entran las cuerdas cálidas **sin golpe**; más hondo, mismo tempo |
| 4 | 1254–1686 | 14,4 | Retirada | un pad sostenido casi inaudible; **el último segundo (f1656–f1686), silencio** |
| 5 | 1686–2241 | 18,5 | Coro | **entra de golpe en el primer frame**: piano, cuerdas, percusión suave, palmas, coro sin letra («aah»); crece hasta el **pico en f2187** (+16,7 s) y resuelve en f2241 |
| 6 | 2241–2466 | 7,5 | Caída | piano solo, tierno, el tema desnudo |
| 7 | 2466–3483 | 33,9 | Final | el tema con cuerdas, cálido, sin percusión, **pensado para ir bajo la voz en off** (sin melodía en el registro de la voz); **acorde final en f3318** (+28,4 s); la cola muere en f3480 |

**Prompt de partida (vía 1, ElevenLabs Music, sin nombres de artistas):** *Instrumental Christmas worship, hopeful and tender, D major, around 75 BPM, piano-led with celesta, pizzicato strings in the first verse, warm legato strings from the second verse, a wordless choir ("aah") only in the chorus, soft percussion and claps only in the chorus. The final section sits under a spoken voice-over: sustained strings and sparse piano, no busy melody. No lyrics, no vocals with words. Cinematic but intimate, never sad.* Con `music_v2` y un `composition_plan` de siete `chunks` con la duración de la tabla. **Generar cuesta créditos: se confirma antes.**

**Mezcla de la música:** normalizada a −16 LUFS. Bajo las voces, `envolventeBajoVoz` con `alto 0,5` y `bajo 0,16`. Las bajadas, en coseno de 8–10 f, **acaban al menos 2 f antes de la primera palabra**; las subidas duran ~24 f. Bajo los gritos (coro), solo −6 dB. En la retirada, la caída y bajo la voz en off del final, la música va baja: ≈ 10 LU por debajo de la voz, medido.

## Ranuras y su efecto en los frames

| Ranura | Entra en | Desplaza | Nota |
|---|---|---|---|
| VT19 «Cantante» (fuera por defecto) | tras P07 (f834) | +150 f a todo lo que sigue (+240 f con «…mi mayor sueño» [OÍR]) | El tramo 3 de la música se alarga lo mismo |
| HZ07 «un Dios de oportunidades» (fuera por defecto) | tras P15 (f1254) | +72 f a todo lo que sigue | Solo si al oírla el corte antes de «porque…» es limpio |

## Lo que hay que oír o medir antes de la final (R31)

| Qué | Dónde (comp) | Por qué |
|---|---|---|
| «¿Cómo **va** / **está** tu relación con Cristo?» | f1257–f1296 | Las dos pasadas no coinciden; se pinta en la tira |
| La respuesta de VT06, «…cariño y amor» | f2358–f2463 | Llega muy baja; ¿basta con ganancia? |
| El testimonio de VT07 | f1317–f1656 | Voz a −20/−30 dBFS; posible saturación hacia 20,4 s (fuera del tramo) |
| El arranque de «¡Misericordia…» (HZ08) | f1686 | Que el corte no se coma el «Mi-» |
| Los límites de «¡Feliz Navidad para todos!» (HZ10) | f1752–f1824 | Whisper la sitúa en 0–2 s y la energía en 0,7–3,4 |
| «Lo primero,» de VT11 | f837–f855 | Dónde empieza «¿qué…» (lo pinta la tira) |
| La duración real de cada frase de la voz en off | f90 · f2496 · f2607 · f2730 · f2910 · f3180 | El timeline la estima a 5 sílabas por segundo |
| HZ07 / VT19 (si entran) | ranuras | «pobreza» o «probabilidad»; el trozo central de «…es mi mayor sueño» |
| Los instantes marcados con ≈ | todo el timeline | Salen de la transcripción por palabra |

## Puertas de control

- [ ] **Artefactos acordados con el usuario** (este paso).
- [ ] Lo que falta de MAS ([01-plan.md](01-plan.md) §Lo que falta confirmar): la **dirección de la página de donación** (para el QR).
- [ ] Música elegida (y generada, con el sí del gasto).
- [ ] Voz en off **grabada por el usuario** (WAV mono, tres tomas por frase), elegida la toma y medida con `limites-voz.py`.
- [ ] `normalizar.mjs` (HLG → BT.709, rotación, 30 fps, DJI ×1000/1001, sin audio en el vídeo, WAV por plano con `-map 0:a:0`).
- [ ] Transcripción por palabra de los planos con voz → instantes ≈ resueltos.
- [ ] `marcas/mas.ts` + Dosis en el motor (`revisar-marca.mjs` en 0).
- [ ] `revisar-097.mjs` (sobre `abrePuerta()` de `revisar-metraje.mjs`) en 0, con lo que pide el encargo: ningún nombre de menor en los tramos, VT32 fuera, la voz en off nunca solapada con una niña, el QR legible y ningún «POR CONFIRMAR» con `--final`.
- [ ] `revisar-audio.mjs audio-097.ts --fps 30 --duracion 3483` en 0 · `revisaPlan(graficos097)` limpio.
- [ ] **El QR se escanea** desde un móvil, en la pantalla y a 3 m (lo que tendrá la iglesia).
- [ ] **Frames clave** enseñados (R05): f0 · f75 · f90 · f351 · f603 · f1071 · f1317 · f1686 · f2187 · f2361 · f2496 · f2694 · f2784 · f2910 · f3180 · f3483.
- [ ] Hoja de contactos del render (no stills sueltos).
- [ ] Prueba a 720p aprobada (R06).
- [ ] Palabras dudosas oídas (R31); la final (R22).
