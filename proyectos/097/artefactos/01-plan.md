# 01 · Plan narrativo — proyecto 097 · «Lo más bonito de un regalo»

> Paso 1 de 3. Se escribe **antes** de tocar Remotion.
> Siguiente: [02-layout.md](02-layout.md). El guion legible, escena a escena (con el guion de la voz en off), está en [../guion-estrellitas.md](../guion-estrellitas.md).
> Estado: **rev. 1 (2026-11-22)**, con las respuestas del usuario: autorización de los padres, las niñas reciben regalos de Estrellitas, va voz en off, meta de más de 3.000 regalos, donación desde lejos en la página de MAS y publicación en iglesias y redes. El material sigue **sin oír**: lo que depende de una frase con ⚠ lleva **[OÍR ANTES DE LA FINAL]** y lo que falta de la fundación, **[POR CONFIRMAR CON MAS]**.

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Pieza | **Montaje** (sin avatar) para la campaña «MAS Estrellitas 2026» de la Fundación MAS (Misericordia, Amor y Servicio · Casa Sobre la Roca) |
| Material | El encuentro de Navidad del 2026-11-20 en «la Nuestra»: 32 HZ (16:9) y 37 VT (9:16) del iPhone, 4K HDR HLG · 13 DR de DJI, 4K SDR a 29,97 fps · 49 FT (fotos). Análisis: [`material/analisis-videos.md`](../material/analisis-videos.md) |
| Composición | **1920×1080 · 30 fps · 3483 f (116,1 s ≈ 1:56)**. En una pieza de montaje la duración sale del plan, no de un clip |
| Destino | **Pantallas de las iglesias** (16:9, esta pieza) y **redes**: YouTube y Facebook con esta pieza; Reels, Shorts, TikTok y Estados con el derivado vertical |
| Estilo | **Documental cálido, orgánico** (papel y tinta). Cámara = el montaje (cortes y algún acercamiento lento), gráficos de papel recortado y trazo a mano, sonido orgánico (papel, trazo, destello, campanilla, viento). Uno solo en las tres capas |
| Texto | **Citas en tira de papel**: lo que dicen las niñas y lo que dice la voz en off, en índigo sobre una tira amarilla, frase a frase y con una sola palabra acentuada. No es el módulo `editorial` de Luxur (blanco con sombra, sin caja): ver [02-layout.md](02-layout.md) §4 |
| Voz | **Las niñas cuentan la historia.** Una **voz en off breve** (seis frases) solo donde ellas callan: tras la pregunta, en el puente y en el CTA. **La graba el usuario** (decidido el 2026-11-22; ver §Voz) |
| Marca | Fundación MAS: papel `#FFE400`, tinta índigo `#382A74`, acento azul `#419AFF` solo en display grande, trío verde · lavanda · rojo solo en dibujo y lockup, Dosis ExtraBold `ss03` ([`identidad-mas.md`](../identidad-mas.md)). Falta escribir `remotion/src/marcas/mas.ts` (fase de código) |
| Objetivo | Que quien lo ve **sienta lo que vale un regalo dado con cariño y vaya a tomar una estrellita**, o **done desde la página** si está lejos, o lo comparta |

## La idea en una frase

Una niña pregunta **«¿Qué es lo más bonito de recibir un regalo?»** en el segundo 1, y la respuesta no llega hasta el final, cuando ya conocemos a las niñas: **«Saber que la persona me lo dio con mucho cariño y amor.»** Entonces la voz revela que **ellas reciben su regalo gracias a Estrellitas** y le dice a quien mira: **«Esta Navidad, esa persona puedes ser tú.»**

## Público

1. **Las iglesias** (Casa Sobre la Roca y su red): el vídeo se proyecta en el culto, con sonido y en pantalla grande. Con este público conectan la fe, el perdón y la misericordia. Puede **escanear un QR** para donar desde el asiento.
2. **Redes**, en el móvil y a menudo **sin sonido** (Facebook e Instagram reproducen en silencio). Por eso todo lo que se dice, de las niñas o de la voz, también se lee.
3. **Quien está lejos de la oficina**: no puede llevar un regalo, pero puede **donar desde la página de MAS** (PayU) o compartir el vídeo.

## Promesa y CTA

- **Promesa (primeros 3 s):** una pregunta que todos sabemos contestar y una ronda de caras de niñas que miran al cielo (al dron) y saludan. «¿Qué es lo más bonito de recibir un regalo?» ya está en pantalla en el frame 0.
- **Acción que se pide al final:**
  1. **La principal**, la del cartel: **toma una estrellita** en las oficinas del M.A.S. → **compra tu regalo** y entrégalo sin envolver, con la estrellita → **entrega el regalo** únicamente en las oficinas del M.A.S., Calle 103 No. 14-63, del 15 de noviembre al 20 de diciembre.
  2. **Desde lejos:** «dona desde la página de MAS», con la dirección escrita y un **QR** en pantalla **[POR CONFIRMAR CON MAS: la dirección exacta de la página de donación]**.
  3. **Para todos:** compartirlo.
- **La meta:** «Este año queremos entregar más de 3.000 regalos. Uno puede ser el tuyo.»
- **La cuenta bancaria no sale en el vídeo.** Vive en la página, junto a PayU, y el vídeo lleva a la página. Tres razones:
  - Un número en un vídeo no se puede corregir una vez compartido.
  - Es lo más fácil de falsificar en una copia que circule por WhatsApp.
  - Nadie apunta once dígitos de una pantalla.
- **Lo que NO se cuenta** (para no meterlo luego «porque cabe»):
  - Nada de la historia personal de ninguna niña: ni familia, ni por qué vive en la casa, ni carencias.
  - Ninguna cifra que no venga del cartel o de MAS (el cartel y la meta, «más de 3.000»).
  - Que los regalos que sobran van a otras fundaciones. Es verdad y da confianza, pero en el vídeo le quita urgencia a la petición («si sobran, no hace falta el mío»). **Va en la descripción y en el texto de la publicación**, no en el vídeo.
  - La palabra «pobres» del cartel: el dato se dice sin ella («las zonas más apartadas del país»). Dignidad, no lástima.

## El arco emocional

```
intensidad
  ▲                                                     ★ «¡Gracias a Dios por la Navidad!»
  │                                              ╱‾‾‾‾‾╲
  │                    «a Cristo en mi vida»   ╱  alegría ╲          «ellas reciben…
  │          deseos   ╱‾‾╲      cualidades   ╱             ╲ respuesta  esa persona puedes ser tú»  CTA
  │ pregunta ╱‾‾‾‾‾‾‾╱    ╲___╱‾‾‾‾‾‾‾╲     ╱               ╲___╱‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾╲_______╱‾‾‾‾‾‾‾╲
  │ ╱                                 ╲___╱ testimonio (VT07): silencio
  └──────────────────────────────────────────────────────────────────────────────────────▶ tiempo
   0:00   0:10        0:17      0:33     0:41      0:56          1:14   1:18     1:22     1:30    1:56
   curiosidad → bienvenida → sonrisa → sorpresa → esperanza → fe → intimidad → liberación → verdad → revelación → acción
```

El orden sale del cine de no ficción. Primero se gana la atención con una pregunta abierta, y antes de pedir nada se acompaña al espectador por lo que reconoce (deseos de niño). Después se le lleva a lo hondo: la fe y un testimonio dicho en voz baja. Tras la intimidad estalla la alegría, se cierra la pregunta del principio y **solo entonces** la voz revela que estas niñas son las que reciben los regalos y pide. **El vídeo pide justo después de cerrar la pregunta, nunca en mitad de la emoción.**

## Escenas (por actos)

`hero` = quién manda en pantalla en ese tramo, uno solo por fila. Los tiempos exactos, en [03-timeline.md](03-timeline.md).

| # | Tramo (s) | Narrativa | Idea (una frase) | Hero | Frase clave (real) · **voz en off** |
|---|---|---|---|---|---|
| 1 | 0,0–6,0 | hook | Caras que miran al dron, una pregunta que todos sabemos contestar y la promesa de la respuesta | texto (la pregunta) | «¿Qué es lo más bonito de recibir un regalo?» (VT06) · **VO1** «Esa tarde, la respuesta nos la dieron ellas.» |
| 2 | 6,0–10,5 | contexto | Te abren la puerta de su casa | metraje | «¡Bienvenidos a la Nuestra!» (HZ20) |
| 3 | 10,5–17,6 | contexto | Lo que piden: lo que pediríamos todos de niños | gráfico (pegatinas de deseos) | «una radio» · «un conejito» · «¡Yo quiero un bafle!» (HZ14–HZ16) |
| 4 | 17,6–24,8 | revelación | La lista de cosas se rompe: una niña pide a Cristo | gráfico («a Cristo en mi vida») | «Yo lo que quiero en Navidad es a Cristo en mi vida… y también quiero una Biblia muy grande.» (HZ17) |
| 5 | 24,8–27,8 | contexto | Tienen sueños, no solo deseos | metraje | «¿Cuáles son tus sueños?» → «Ser policía.» (VT13) |
| 6 | 27,8–33,0 | explicación | Lo que aprendieron este año | metraje | «Es saber a perdonar a las demás personas.» (VT10) |
| 7 | 33,0–41,8 | demostración | Ellas mismas preguntan, y cada una da una palabra para Dios | gráfico (la columna de palabras) | «¿Cuál es la cualidad más bonita de Dios?» → amoroso · bondadoso · misericordioso · compasivo · fiel (HZ01, HZ05, HZ06) |
| 8 | 41,8–56,2 | revelación | El testimonio: la fe dicha sin adornos | metraje (VT07) | «Mi relación con Cristo es un proceso… trato de aferrarme a la verdad de Cristo.» |
| 9 | 56,2–74,7 | conclusión | Estalla la alegría y acaba en gratitud | metraje → texto al final | «¡Misericordia, Amor y Servicio!» (HZ08) … «¡Gracias a Dios por la Navidad!» (HZ32) |
| 10 | 74,7–82,2 | revelación | Se cierra la pregunta del principio | texto (la respuesta) | «Saber que la persona me lo dio con mucho cariño y amor.» (VT06) |
| 11 | 82,2–90,6 | cta | Desde el cielo, el círculo de niñas; la revelación y una estrella que cae en el centro | gráfico (la estrella) | **VO2** «Ellas reciben su regalo gracias a MAS Estrellitas. Esta Navidad, esa persona puedes ser tú.» |
| 12 | 90,6–110,6 | cta | La meta, los tres pasos del cartel y la vía desde lejos | gráfico | **VO3** la meta · **VO4** los pasos · **VO5** desde lejos |
| 13 | 110,6–116,1 | cta | Cierre: la foto del grupo, la firma y las gracias de una niña | gráfico | «Gracias por acompañarme en este viaje.» (VT33) |

`narrativa` ∈ hook · contexto · explicación · demostración · comparación · revelación · conclusión · cta.

## Ranuras opcionales

| Ranura | Qué entra | Estado | Efecto en el timeline |
|---|---|---|---|
| **Sueños** (escena 5) | VT19 20,7–25,7: «¿Qué quieres ser cuando seas grande?» → «Cantante.»; y, si al oírlo se entiende, la cola «…es mi mayor sueño» **[OÍR ANTES DE LA FINAL]** | **Fuera por defecto**, por duración. Con la autorización de los padres puede entrar si la queréis | +5,0 s (+150 f) desde f834, o +8 s con «mi mayor sueño» |
| **«Un Dios de oportunidades»** (escena 7) | HZ07 ≈1,0–3,3: «Para mí es un Dios de oportunidades», cortada **antes** de «porque me dio oportunidad en la pobreza / probabilidad» **[OÍR ANTES DE LA FINAL]** | Fuera por defecto | +2,4 s (+72 f) desde f1254 |
| **Voz del cierre** (escena 13) | VT33 64,9–67,4: «Gracias por acompañarme en este viaje.» | **Sube al timeline principal** (rev. 1): con la autorización de los padres, y es la única frase del material dicha a quien mira. Solo su voz, nada de su imagen | — · alternativa en el mismo hueco: VT06 8,5–9,2 «Muchísimas gracias.» |

- **De VT19 no entran «poder estar en una familia» ni «puedo vivir con mi mamá»**, aunque haya autorización: cuentan la historia de una menor y piden lástima, justo lo que esta pieza no hace.
- **De VT33 solo entra la voz final.** El selfi está cortado por la nariz, en 4,8–6,4 se lee una matrícula y en el espejo y la cama salen otras caras.

## B-roll

**No hay b-roll ni banco ni IA.** Todo plano es material real del encuentro (HZ, VT, DR, FT). Ningún plano se genera ni se trae de un banco: la regla de honestidad (AGENTS.md §5.7) aquí es absoluta, porque son niñas reales en un lugar real.

- Lo que no se filmó (la oficina, la estrellita en la mano de alguien, un regalo envuelto) **no se ilustra con metraje**. Se cuenta con **gráficos**: la estrella, el regalo en línea y el camino punteado del cartel.
- **Descartado:** un plano de banco de «persona comprando un regalo» para el paso 2. Sería metraje de otro lugar presentado junto a una campaña real; el gráfico dice lo mismo sin fingir nada.

## Simbología de color

El color es información. La misma en todas las capas:

| Color | Significa | Se usa en |
|---|---|---|
| amarillo `#FFE400` (papel) | la campaña: lo que habla MAS | tiras de las citas, pegatinas, fondo del CTA |
| índigo `#382A74` (tinta) | todo lo que se lee | texto de citas, titulares, pasos, fechas, la dirección web |
| azul `#419AFF` | **la estrellita**: el ancla de toda la pieza | la estrella, el camino punteado, la cifra «3.000», la palabra que se lleva el acento en un display ≥ 90 px («Cristo», «estrellita») |
| verde · lavanda · rojo | Misericordia · Amor · Servicio (las letras M-A-S del lockup) | **solo dibujo**: los tres subrayados del grito de HZ08 y el lockup. Nunca texto (1,57 · 1,78 · 3,13 : 1 sobre amarillo) |
| blanco | el borde de pegatina y el corazón | borde de fotos-pegatina, número dentro de la estrella, corazones de HZ19, el marco del QR |

## Música (carácter y opciones)

**Carácter:** alabanza instrumental de Navidad, esperanzada y tierna. Re mayor, ≈ 75 BPM, con rubato permitido. Manda el piano, con celesta (el «brillo» de la estrella), pizzicato de cuerdas en los deseos, cuerdas cálidas desde el acto de la fe y un coro sin letra («aah») en el estallido. **Sin letra**: competiría con las voces de las niñas y con la voz en off. Siete tramos que siguen los actos; el detalle en frames está en [03-timeline.md](03-timeline.md) §Música.

**Lo que hay en `archivos/musica/`:** nada sirve para publicar.

| Pista | Por qué no |
|---|---|
| *Yeshua (Versión Piano)* · *Oceans (Where Feet May Fail)* | Alabanza comercial: es justo el carácter que pide el encargo, pero la composición tiene dueño y Content ID la reconoce. Bloqueo o desmonetización en redes |
| *Silver Skies Cinematic Piano* · *Softly* · *Fortitude (Light Version)* · *Becoming* | El color encaja (piano o cuerdas, esperanza), pero el registro dice «licencia no verificada» en todas. **Solo como pista guía** de un primer montaje interno, nunca en lo que se publica |

**Tres vías limpias** (no se baja ni se compra nada hasta que se elija):

1. **Generada a medida con ElevenLabs Music** (la skill `music`), con un plan de composición de siete tramos con la duración exacta de cada acto (en el timeline). Encaja al frame y no depende de nadie. **Cuesta créditos de ElevenLabs**: antes de generar se dice cuánto y se espera el sí. La clave está (`ELEVENLABS_API_KEY`), pero hay que comprobar que el plan de la cuenta da licencia comercial.
2. **Una canción propia de Casa Sobre la Roca** en versión instrumental, si MAS o la iglesia tienen los derechos de la composición **y** de la grabación, por escrito **[POR CONFIRMAR CON MAS]**. Es la más auténtica: «la pista de Jesús» de su propia casa.
3. **«Noche de paz»** (Franz Xaver Gruber, 1818: la composición es de dominio público) **tocada al piano por un músico de la iglesia** y grabada por ellos. Es gratis, todo el mundo la reconoce y habla de Jesús sin decir nada. Ojo: cualquier grabación comercial de «Noche de paz» sí tiene dueño. Solo es limpia si la grabación es propia.

**Recomendación:** la **1** para no frenar el proyecto, porque se puede generar en cuanto se apruebe este timeline. Si MAS tiene la **2**, gana la 2. La **3** es la más emotiva si alguien de la iglesia puede grabarla esta semana. **Sigue pendiente de elegir.**

## Voz

- **Las niñas cuentan la historia; la voz en off solo pone el marco.** Seis frases, todas donde ninguna niña habla. Ninguna repite lo que una niña acaba de decir. El texto exacto y sus frames están en el [guion](../guion-estrellitas.md) §Voz en off y en [03-timeline.md](03-timeline.md):

  | # | Dónde | Frase |
  |---|---|---|
  | VO1 | sobre el dron, tras la pregunta | «Esa tarde, la respuesta nos la dieron ellas.» |
  | VO2a | sobre el círculo de DR07 | «Ellas reciben su regalo gracias a MAS Estrellitas.» |
  | VO2b | ídem | «Esta Navidad, esa persona puedes ser tú.» |
  | VO3 | la meta | «Este año queremos entregar más de tres mil regalos. Uno puede ser el tuyo.» |
  | VO4 | los pasos | «Toma una estrellita del árbol en la entrada de la iglesia, haz tu donación y envía el comprobante. Hasta el 20 de diciembre.» |
  | VO5 | desde lejos | «Y si estás lejos, puedes donar desde la página de MAS.» |

- **Habla MAS, en primera persona del plural** («nos dieron», «queremos»), y le habla de tú a quien mira. Tono cálido y tranquilo, a unas 5 sílabas por segundo: es una invitación, no una cuña de radio. **≈ 390 caracteres** en total.
- **La graba el usuario con su voz** (decidido el 2026-11-22): sin generación ni coste. WAV mono, tres tomas por frase; las indicaciones de grabación están en el [guion](../guion-estrellitas.md) §Voz en off. Al llegar, se mide cada frase con `limites-voz.py` y se ajustan los huecos del timeline.
- Las voces de las niñas **no se inventan ni se recolocan para decir otra cosa**. Hay un solo cambio de contexto, y está declarado: la pregunta de VT06 suena sobre el dron del principio (es la misma pregunta, del mismo día).

## Técnicas de PNL (aplicadas con ética)

Cada técnica conecta y guía hacia la acción. **Ninguna exagera, culpa ni promete lo que no es verdad.** El detalle, momento a momento, está en el [guion](../guion-estrellitas.md).

| Técnica | Dónde | Para qué |
|---|---|---|
| **Bucle abierto** (pregunta sin respuesta) | 0:01 → 1:18 | Una pregunta abierta se queda trabajando por dentro hasta que se cierra. La atención aguanta |
| **Refuerzo del bucle** | VO1 «la respuesta nos la dieron ellas» | Promete que la respuesta existe y que la tienen ellas: el espectador sigue mirando para oírla |
| **Búsqueda interna** | 0:01 | «¿Qué es lo más bonito de recibir un regalo?»: quien mira contesta con un recuerdo propio |
| **Ritmo y guía** (acompasar → guiar) | deseos → «a Cristo en mi vida» | Primero lo que todos reconocemos (una radio, un conejito, un bafle): tres síes callados. Después, lo hondo |
| **Interrupción de patrón** | HZ17 · el corte seco del silencio al grito | La lista de cosas se rompe con algo que no es una cosa; el silencio tras el testimonio se rompe con el nombre de la fundación gritado |
| **Acompasar valores** | lo aprendido, las cualidades de Dios | Perdón, misericordia, compasión: el idioma del público creyente, dicho por niñas |
| **Anclaje** (la estrellita) | 6 momentos con el mismo destello | La estrella azul aparece en los seis momentos de más emoción, siempre con el mismo sonido. En el CTA, «toma una estrellita» llega cargada con todo eso |
| **Cambio de estado** | testimonio → alegría | Intimidad, silencio y estallido. La emoción sube cuando sube el cuerpo |
| **Revelación** | VO2a «Ellas reciben su regalo gracias a MAS Estrellitas» | Las niñas con las que el espectador acaba de pasar la tarde son las que reciben. La campaña deja de ser abstracta |
| **Niveles lógicos** (identidad, no conducta) | VO2b «Esta Navidad, esa persona puedes ser tú.» | No pide «compra un regalo»: invita a **ser** la persona que se acordó de alguien |
| **Prueba social y meta compartida** | VO3 «más de tres mil… Uno puede ser el tuyo» | Mucha gente ya está en esto; la meta es de todos y la parte de cada uno, concreta: **uno** |
| **Presuposición de facilidad** | VO4 y los pasos 1-2-3 | Tres verbos y una fecha. Sin fricción, sin «no sé cómo» |
| **Alternativa sin culpa** | VO5 «Y si estás lejos…» | Quien no puede ir también tiene su manera; nadie se queda fuera |
| **Reciprocidad** | las gracias del cierre (VT33) | Una niña da las gracias a quien la acompañó. Es verdad: ella grabó su recorrido para quien lo viera |
| **Futuro compartido** | la foto final del grupo al atardecer | Termina en lo que sale bien, no en lo que falta |

**Límites que no se cruzan:** nada de música triste, cámara lenta sobre caras o primeros planos de una niña sola en silencio. Nada de «sin ti no tendrán Navidad», de cifras de necesidad ni de historias personales. Si una técnica solo funciona escondiendo algo, no se usa.

## Duración (recomendación) y derivados

- **Recomendada: ≈ 1:56 (3483 f).** Con la voz en off, el CTA pasa a 25 s: la meta, los pasos y la vía desde lejos se oyen y se leen, y queda un QR quieto para escanear. Para las iglesias es la duración buena: se proyecta con sonido y la gente lo ve entero.
- **Derivados:** con «redes» confirmado, el **vertical de 30 s pasa a ser el segundo entregable**. Apuntados, sin desarrollar:
  - **30 s · 9:16** (Reels, Shorts, TikTok y Estados), y la misma pieza en **1:1 o 4:5** para el muro de Facebook e Instagram: pregunta → HZ17 → respuesta → VO2 (revelación y «esa persona puedes ser tú») → los tres pasos y la página.
  - **60 s · 16:9**, para anuncios y el inicio de YouTube: pregunta → deseos → HZ17 → VT07 corto → alegría → respuesta → CTA. Sin «lo aprendido» ni la cadena de cualidades.
  - **15 s · bumper**: «¡Gracias a Dios por la Navidad!» (HZ32) → «Toma una estrellita», con fechas, dirección y página.

## Técnica (lo que el montaje no puede saltarse)

- **R21:** todo el iPhone es **HDR HLG**: se pasa a BT.709 antes de montar. Cuidado con los cielos claros de HZ17, HZ19 y HZ32, que se queman.
- **R19:** se quema la rotación: 7 HZ vienen girados 180° y todos los VT llevan −90°.
- **DJI a 29,97:** `setpts=PTS*1000/1001` antes de `fps=30`, y el `desde` del plan × 1000/1001. Si no, se repite un fotograma cada ≈ 33 s.
- **Audio:** 37 vídeos llevan una pista espacial APAC: se extrae con `-map 0:a:0`. Las preguntas llegan casi a 0 dBFS y las respuestas a −20/−30, así que se iguala por tramo, con una ganancia por voz. VT06 (la respuesta) y VT07 llegan bajas: **[OÍR ANTES DE LA FINAL]** si con ganancia bastan. Si no, la skill `voice-isolator` (ElevenLabs) cuesta créditos y se pregunta antes.
- **Voz en off:** en WAV (el AAC desplaza la voz), y se mide con `limites-voz.py` antes de colocarla. Los frames del timeline son una estimación a 5 sílabas por segundo y se ajustan a la locución real.
- **Nombres de menores:** ningún tramo elegido los contiene (cada corte empieza después del nombre: VT07 desde 3,8, VT10 desde 4,3, VT11 desde 4,8). HZ18, VT04, VT16, VT18 y las polaroids (HZ26, VT26) no se usan. **VT32 no se usa nunca.**
- **Fps variable:** ninguno de los planos elegidos lo tiene (VT27 y VT32 se quedan fuera).

## Decisiones tomadas (y las descartadas)

- **Un solo acto de fe antes de pedir, la pregunta cerrada justo antes del CTA, y la revelación («ellas reciben su regalo») después.** Así la petición llega con la emoción arriba, y el espectador descubre que ya conoce a quienes reciben.
- **La voz en off nunca pisa a una niña** y no tiene más de seis frases. Si una frase de la voz no cabe en su hueco, se acorta la frase, no la niña.
- **Los verticales entran recortados a 16:9 a pantalla completa** (los mapas confirman que cabe la franja de la cabeza a la cintura). El papel amarillo queda para los gráficos y el CTA, sin pantallas partidas ni fondos difuminados ([02-layout.md](02-layout.md) §3).
- **Texto en tira amarilla con tinta índigo**, no blanco con sombra: es el papel del cartel y se lee sobre cualquier plano (9,33 : 1).
- **Un QR a la página de donación** en el CTA y en el último frame, pensado para las pantallas de las iglesias. Se genera a partir de la dirección: no es metraje ni IA.
- **Descartado: la cuenta bancaria en pantalla** (ver §Promesa y CTA).
- **Descartado: decir en el vídeo que los regalos que sobran van a otras fundaciones** (resta urgencia; va en la descripción).
- **Descartado: abrir con el dron de la finca** (DR06 o DR11). Es bonito y no dice nada; el dron entra donde hay caras (DR05) y donde hay sentido (el círculo de DR07).
- **Descartado: el ritual «pin, pon, con…».** Detrás viene el nombre de una niña en casi todas las tomas. La agencia de las niñas la cuenta el kicker «Ellas mismas hacían las preguntas».
- **Descartado: HZ21** (el audio del móvil no sirve) y **los selfis** como planos de vídeo.

## Lo que ya está respondido (2026-11-22)

- ✅ **Autorización de imagen:** la tienen, firmada por los padres.
- ✅ **Las niñas reciben regalos de Estrellitas.** Lo dice la voz (VO2a). Los que sobran van a otras fundaciones: va en la descripción, no en el vídeo.
- ✅ **Voz en off:** sí, sobre el guion (seis frases), **grabada por el usuario**.
- ✅ **Desde lejos:** donación en la página de MAS (PayU y cuenta). El vídeo lleva a la página; la cuenta no sale en pantalla.
- ✅ **Meta:** más de 3.000 regalos este año.
- ✅ **Publicación:** iglesias y redes.

## Lo que falta confirmar con MAS

1. **La dirección exacta de la página de donación** (para escribirla y para el QR).
2. **La música:** generarla (con el sí del gasto), una canción propia de la iglesia con derechos, o «Noche de paz» grabada por alguien de la iglesia.
3. **La ciudad y el horario** de la oficina de la Calle 103 No. 14-63.
4. Si se puede **nombrar «la Nuestra»** y fechar el encuentro en pantalla. Ojo: si «la Nuestra» es un hogar de protección, la autorización la firma también el hogar o el defensor de familia, no solo los padres, y conviene no dar pistas de dónde está la finca. En ese caso, fuera el nombre de la casa y el plano del valle.
5. **Qué lleva la estrellita** (¿edad, talla o nombre de un niño o una niña?), por si conviene contarlo.
6. **Los archivos de marca:** logos CSR y MAS, y el lockup «MAS estrellitas 2026» en vectorial o en PNG grande. El JPG del cartel (2000 px) se queda corto a 1080p.
7. Si quieren **VT19** («Cantante») dentro (+5 s).
