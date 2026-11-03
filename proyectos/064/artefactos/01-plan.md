# 01 · Plan narrativo — proyecto 064 · Lote en San Vicente Ferrer (vereda La Porquera), V46 del registro (segundo reel del lote: «No hace falta irse lejos») · REV. 1

> Paso 1 de 3. **Rev. 1 (2026-10-22):** el usuario cambió el planteamiento y la rev. 0 (aérea · hook · 3 drones · mitad · 2 drones · CTA, con MD02 recortada) **se descartó**. Escrito con el reparto rev. 2 de la sesión madre (`proyectos/063/reparto-063-065.md`, que manda), el catálogo reescrito (`proyectos/063/catalogo/catalogo-material.md`), la ficha de la web y lo aprendido en la 060 (la infografía sin animar los números), la 043 (lote con dron) y la 062 (la puerta y las herramientas). Siguiente: [02-layout.md](02-layout.md).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Pedido | Encargo del 2026-10-22: 3 reels del lote (063 · 064 · 065), una sesión por reel sobre el mismo checkout. Este es el **V46 / 064**, ángulo **«No hace falta irse lejos: 3.244 m² cerca de Medellín»**: el hilo es la DISTANCIA. **Cambio del usuario (rev. 1):** «como el lote no tiene tomas de recorrido, solo de dron, y de mitad solo hay un video, sé bastante creativo: analiza todos los hooks y mira si hay manera de cortar el "ven, te muestro" para complementarlo con otro y ponerlo como toma de la mitad. Cuando empieces con la toma del dron, pases al hook, vuelves al dron. O si dice "ven, te muestro cómo", puedes crear unos infográficos y resaltar las amenidades.» Más las reglas fijas del canal (primera toma sin texto ni voz, nunca el sello, cierre en tarjeta oscura con el logo y la web, subtítulos editoriales, voz a −15 LUFS, música con curva, color por plano medido). |
| La propiedad y la ficha | Lote en **venta** en la vereda **La Porquera**, San Vicente Ferrer, Antioquia: **COP 350 M** (negociable) · **3.244 m²** · derecho de acueducto incluido · escrituras al 100 % · topografía mixta · parcelación abierta, sin portería · ≈ **1 hora de Medellín** y **15 min de la autopista Medellín-Bogotá**. **La web NO da energía, uso del suelo ni tipo de vía de acceso, y dice que el uso depende de la normativa: nada de eso ni «apto para construir» en pantalla ni en voz.** |
| Material | `proyectos/064/original/` con el CÓDIGO del catálogo (sha256 en `normalizar.mjs`): voces HK02 `Hook2.mp4` `a62ba436`, HK05 `Hook5.mp4` (el antiguo `medio2`) `23a38af8`, CT03 `cta3.mp4` `ea5cd78e`; drones **DR03** `3ffeb500` (entero) y **DR01** `8d2f7656` (tramo 24-48 s); música *Cornfield Chase* `e28cd1ab`. |
| Composición | `Recorrido064` · 1080×1920 · **30 fps** · 1296 f (**43,2 s**). Entrada propia `entrada-064.tsx` (el checkout compartido puede tener planos ajenos a medias). |
| Formato | 9:16 vertical · `recorrido-luxur`, con las adaptaciones de un LOTE |
| Marca / texto | Luxur, texto **editorial** (abajo, 90 %, cursiva 8 px menor); **sin sello**; cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com` |
| Presentadora | Isabella Cadavid |

## Dos trampas de esta propiedad, y cómo se resolvieron

1. **Las tomas de Isabella son ANAMÓRFICAS** (`1920×1080`, SAR 81:256, DAR 9:16): se escalan ENTERAS a 1296×2304 con `setsar=1` tras el `scale`; **nunca se recortan**. La receta se niega a seguir si una toma no es SAR 81:256 / DAR 9:16 y la puerta (2a) lo vuelve a comprobar sobre el MP4 normalizado.
2. **No hay recorrido a pie**: el metraje de la propiedad es el dron (DR03 y DR01, los dos verticales con `rotation=90` y a 29,97 fps: `setpts=PTS*1000/1001` antes de `fps=30`). Ya no hay ningún apaisado que encuadrar (el usuario los quitó).

## La idea en una línea

Este lote es **para quien cree que, para tener tierra, hay que irse muy lejos**. El hook pone las dos cifras («¿un lote cerca de Medellín por 350 millones? Sí, y tiene 3.244 metros cuadrados») y **«Ven, te muestro» se corta aparte, a corte y con un empuje, como puente al dron**; la **infografía de DISTANCIAS** responde con los números que ella NO dice (**1 hora de Medellín · 15 minutos de la autopista Medellín-Bogotá**); la mitad le quita el miedo a la distancia («no necesitas estar a **tres horas** de Medellín para tener 3.244 metros cuadrados») y el CTA es una sola acción desde el teléfono. Hook y mitad juegan con la misma cifra desde dos lados (350 millones y 3.244 m² / «no tienes que irte a tres horas») y la infografía es la bisagra: **la pantalla añade, no repite**.

## Escenas (los seis bloques)

| # | Tramo (s) | Bloque | Hero | Lo que se ve / se oye |
|---|---|---|---|---|
| 1 | 0,0-3,9 | Apertura | el lote | DR03 0,30-4,20 s: la ladera con el cultivo en hilera y la cerca viva en V, bajando hacia la hierba (la topografía mixta) · solo música: golpe de 9,9 dB en el f3 · **sin texto ni voz** |
| 2 | 3,9-12,6 | Hook | Isabella | HK02: camina hacia cámara por la ladera · «¿Un lote cerca de Medellín por 350 millones? Sí, y tiene 3.244 metros cuadrados.» y, **a corte sobre su propia imagen y con un empuje (1,11→1,15), en el arpegio de 8,8 dB**, «Ven, te muestro.» |
| 3 | 12,6-19,1 | Dron + infografía | las distancias | DR03 18,0 s (la parte plana en cenital) → DR03 33,0 s (la cerca viva con las flores) bajo la INFOGRAFÍA: **«De Medellín · 1 hora»** y **«De la autopista Medellín-Bogotá · 15 minutos»** (+ «Tiempos aproximados») |
| 4 | 19,1-25,5 | Mitad | Isabella | HK05 (solo su primera frase): en la ladera, las casas al fondo · «No necesitas estar a tres horas de Medellín para tener 3.244 metros cuadrados.» |
| 5 | 25,5-33,6 | Dron | la vista | DR01 24,5 s (el horizonte: los cultivos en terrazas, el pueblo de tejados rojos y la cordillera) → **LA VISTA, 4,6 s**, DR01 43,0-47,6 s: la tierra roja con el cultivo y la cordillera (el plano más largo) |
| 6 | 33,6-43,2 | CTA | Isabella | CT03: «Si estás buscando tierra cerca de Medellín, escríbeme y te envío todos los detalles para que conozcas este asombroso lote.» → funde a negro → tarjeta con el logo y la web |

## Decisiones tomadas (y las descartadas)

- **El corte «Ven, te muestro»** (la idea del usuario): es la parte B de la MISMA toma `Hook2` (13,92-14,55 s); la afirmación acaba a los 13,38 s (con la /s/ de «cuadrados») y entre las dos hay una pausa de 0,54 s con un soplo de −50…−40 dB. En el montaje se salta parte de la pausa (la de la toma son 0,54 s; la del plano, 0,32 s) y la imagen salta 0,23 s del clip: **un salto de cuadro y de tiempo pequeño, a corte, con un empuje claro (1,11→1,15) para que se lea como una decisión**. Cae en un arpegio de 8,8 dB. La puerta (2f) exige el empuje.
- **La mitad es `Hook5` (el antiguo `medio2`), solo su primera frase** (7,28-12,45 s). Se descarta la parte B de esa toma («Ven, te muestro, este es un [precio] de lote»): la 064 ya usa el «ven, te muestro» de Hook2 y lo que sigue es una frase sin cerrar (la «palabra dudosa» de la rev. 0 era un balbuceo: «este es un pre-», pausa de 1,8 s y un bloque de voz que no se lee). **No hay palabra dudosa en pantalla.**
- **La infografía de DISTANCIAS** (encargo del usuario, en el estilo aprobado en la 060: cifras SIN animar, una a una, completas y quietas): fila «De Medellín · 1 hora» (f390) y héroe «De la autopista Medellín-Bogotá · 15 minutos» (f434) con el filete dorado, más el pie «Tiempos aproximados» (la ficha dice «~1 hora»). Va sobre el dron bajo un **velo en franja central** (0,68; el dron se sigue viendo arriba y abajo), centrada en y 960 y dentro de y 570-1350 (el cuadrado 1:1 del feed). Se lee entera 5,1 y 3,6 s. **Solo números de la ficha que la voz no dice** (la puerta 2g comprueba que ni «1» ni «15» ni «tres horas» se repiten). La banda de la ficha SE VA mientras dura (`ficha-oculta.mjs`).
- **Los drones**: DR03 entero (la apertura y el fondo de la infografía: cenital de la parte plana y cerca viva con flores) y **DR01 en 24,5-47,6 s** (el reparto da 24-48 s; 0-24 es de la 063 y 48-73,5 de la 065). El horizonte con las casas y la cordillera son «la distancia» hecha imagen. La puerta (2f) comprueba que ningún plano sale del tramo.
- **La canción: *Cornfield Chase*.** Crescendo de 127 s con 42 s de intro casi muda, SIN pulso (sus golpes son arpegios de 6-10 dB) y **cae sola a silencio entre 120 y 125 s**. La pieza entra a los **86,533 s**: el golpe de 9,9 dB (el más fuerte de la sección) abre la pieza en el f3, la caída natural cae donde entra el CTA (f1007) y el clímax (−9,6 LUFS, 112-120 s) cae sobre el bloque 5. Medida (`medir-pista.py`, `curva.py`, `lufs-rangos.py`: `proyectos/064/medidas/`), no oída; licencia sin verificar (es de *Interstellar*).
- **Cortes**: un solo corte seco («Ven, te muestro», golpe de 8,8 dB); el resto son disolvencias (la canción no tiene pulso). Isabella es opaca en un golpe (6,7 dB en la mitad) o antes de hablar; el dron bajo la infografía y la vista también acaban en arpegios medidos (7,9 y 7,0 dB).
- **Tres frases de Isabella y ni una más** (hook —en dos cortes—, mitad, CTA): cada toma trae unos 7 s de silencio y ruido de sala al principio y la voz tratada es SILENCIO fuera de sus ventanas.

## Lo que queda por confirmar al oído

- **«asombroso»** (CT03, f1181 = 39,4 s del vídeo): whisper-small oye «asombroso» en la toma entera y «sombroso» cortando desde 11,955 s. Es la palabra del catálogo. La puerta con `--final` falla por esta nota.
