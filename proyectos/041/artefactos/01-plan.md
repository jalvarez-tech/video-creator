# 01 · Plan narrativo — proyecto 041 · Lote en El Carmen de Viboral (Mia), V24 del registro (quinto reel de la propiedad, «todo lo que estás comprando»)

> Paso 1 de 3. Escrito con el material del rodaje (`archivos/musica/registro-de-uso.md` §6), la ficha de la web (leída el 2026-10-17), lo aprendido en el 030, el 031, el 034 y el 039 (`aprendizajes.md` y `combinaciones.md` de cada uno) y **antes** del primer render. Siguiente: [02-layout.md](02-layout.md).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Pedido | Lote de cuatro reels (V23-V26) lanzados a la vez desde otra sesión el 2026-10-17: «Haz 4 videos en sesiones diferentes con modelo Sonnet para el lote». Esta sesión hace **uno**: V24/041, ángulo **«TODO LO QUE ESTÁS COMPRANDO»**. Abre con el dato (área y precio), el recorrido ENSEÑA lo que se compra (el lote entero desde arriba, sus dos accesos, la cabaña, la vista) y cierra con «escríbeme lote». El reparto de tomas, drones y canciones ya venía decidido: no se cambia sin preguntar al usuario. |
| Numeración | **V24 / 041.** Las otras tres sesiones llevan la V23/040 («La vista»), la V25/042 («Encontré») y la V26/043 («Todo resuelto»). La reserva (V24, las tres tomas, los tres drones nuevos, el tramo de DR96 y la canción) está en MI copia de `archivos/musica/registro-de-uso.md`, sin commit ni push (el usuario no ha dado el OK). Se leyeron los registros de todos los worktrees: ninguna hermana había reservado nada mío. |
| La propiedad y la ficha | Lote en El Carmen de Viboral. Ficha leída el 2026-10-17 (`propiedadesluxur.com/es/propiedades/el-carmen-de-viboral/lote-campestre-en-venta-en-el-carmen-de-viboral-con-vista-panoramica`): **VENTA · COP 800 millones · 3.428 m² · dos entradas independientes** (una por la parcelación y otra por la vereda) · energía y agua disponibles · la tubería de gas pasa cerca (sin distancia) · se permite construir casa bifamiliar · vista panorámica · entorno natural, tranquilo y privado · árboles frutales · cabaña de madera · asesora Isabella Cadavid (CEO). **No consta**: distancias ni tiempos a ningún sitio, situación jurídica ni fuente del agua: nada de eso se afirma. |
| Material | `Lote - El Carmen - Mia/Videos/`, copiado a `proyectos/041/original/` con el CÓDIGO del registro (HK07, MD01, CT01, RC01-RC05, DR96, DR201, DR210, DR233 y la canción). sha256 en `normalizar.mjs`. Los iPhone, HEVC 10 bit HLG con `rotation=-90`, 1920×1080 → 1080×1920 vertical a 30 o 29,97 fps (R19, R21: tone-map con VideoToolbox); los DJI, 4K verticales (3840×2160, `rotation=90`), SDR, **29,97 fps**, sin audio: solo se rotan. |
| Composición | `Recorrido041` · 1080×1920 · **30 fps** · 1166 f (38,87 s). Clips normalizados a 1296×2304 y 30 fps. |
| Formato | 9:16 vertical · `recorrido-luxur` (DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA) |
| Marca / texto | Luxur, texto **editorial** (abajo, 90 %, cursiva 8 px menor); **sin sello**; cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com` |
| Destino | Reels · Shorts · TikTok |
| Presentadora | Isabella Cadavid (asesora de la ficha) |

## El ángulo: «todo lo que estás comprando» (y en qué se distingue de las versiones anteriores)

**La idea en una línea:** este lote es para quien quiere saber **qué se lleva por su dinero**: el hook pone sobre la mesa lo que se paga (3.428 m² por COP 800 millones) y promete enseñarlo «todo»; el paseo lo cumple y el CTA pide una palabra.

| | V14 (030) | V15 (031) | V18 (034) | V22 (039) | **V24 (041)** |
|---|---|---|---|---|---|
| Argumento | seguridad sin encierro → dos accesos | construir con agua y energía | la naturaleza como parte de la casa | el campo sin desconexión (disruptivo) | **qué se compra: el lote entero, los dos accesos, la cabaña, la vista** |
| Hook | HK04 | HK06 | HK03 | HK02 | **HK07** «3.428 metros cuadrados por 800 millones. Vente, te muestro todo lo que estás comprando.» (el único con área y precio) |
| Mitad | MD02 | MD04 | MD03 | MD05 | **MD01** «Dos accesos para un mismo lote, una por la parcelación y otra por la vía veredal.» |
| CTA | CT01 | CT04 | CT03 recortado | CT02 | **CT01** «Si quieres conocerlo, escríbeme lote y te envío toda la información.» (REPETIDA de la V14) |
| Canción | *Becoming* | *Somewhere inside of me* | *Chillin'* | *Light Fills the Room* | ***Epic Inspirational and Cinematic Motivational*** (épico/motivacional) |
| Drones | DR97 | DR107 | DR98 | DR104 (y 6 más) | **DR233 · DR96 · DR210 · DR201 (los tres últimos, del atardecer del 2026-10-14)** |
| Ritmo | 10 planos de 2-4 s | 10 de 2-4 s | 10 de 2-3 s | 14 de 1-1,5 s + una pausa | **9 planos de 1,9-4,6 s + las tres tomas de Isabella** |

### Lo que NO cambia respecto de las versiones anteriores (y se dice)

- **El CTA es CT01 entero, la misma toma de la V14** (los otros tres CTA —CT02, CT03, CT04— ya se usaron en la V22, la V18 y la V15): **repetido a la fuerza**, declarado. La puerta (7b) mide 4,0 s en común con la V14. Es otra pieza a su alrededor (otro hook, otra mitad, otra canción y otros planos), pero esa toma ya se vio.
- **RC04, el portón de madera**, repite metraje de la V14 (0,0-2,33 s; aquí 0,90-4,10 s: 1,4 s en común) y de la V22 (2,40-3,93 s: 1,5 s en común): es el único plano que enseña el acceso por la vereda. Los recorridos se pueden repetir; se declara.
- **DR96** (de día) ya lo usaron la V14, la V18 y la V22; aquí en 15,60-17,47 s, que nadie usó (empieza 0,13 s después del tramo de la V22).
- Isabella sigue en la misma loma en las tres tomas, pero con tres fondos distintos: la loma de césped (HK07, cielo nublado y un árbol grande), el talud de tierra roja con el perro y el portón (MD01, cielo azul) y los cipreses con el valle (CT01, plano medio).

## Promesa y CTA

- **Promesa (primeros 3,8 s):** el lote entero visto desde arriba —el árbol grande, la vía que lo bordea, la explanada de tierra roja— a velocidad constante desde el primer fotograma, **sin texto ni voz** (regla fija), con el golpe de la música en el f3. Isabella entra a corte en el f115 subiendo la loma y dice lo que cuesta.
- **Acción final:** «escríbeme lote»: UNA acción, UNA palabra. No repite ninguna cifra.
- **Lo que NO se cuenta:** distancias, tiempos ni conexiones; la situación jurídica; la fuente del agua; valorización ni rentabilidad; la casa bifamiliar, el agua y la energía (caption).

### LA CIFRA: el choque con la regla «una sola cifra como mucho» (declarado)

HK07 es la toma asignada y **dice el área y el precio en la misma frase** («3.428 metros cuadrados por 800 millones»). Las dos cifras están verificadas en la ficha del 2026-10-17. La regla del canal (una cifra como mucho, nunca en los bloques 5 y 6) y la de los subtítulos (el texto sigue a lo que se oye) chocan aquí. **Decisión:** el texto sigue a lo que se oye, así que las dos van escritas, en el bloque 2, **como UNA sola afirmación** (lo que mide el lote y lo que cuesta), y en ningún otro sitio de la pieza hay una cifra: ni dato en el centro, ni en la mitad, ni en el CTA (que no las repite), y los bloques 5 y 6 no llevan ninguna (la puerta, 2a, falla si aparece otra). **La alternativa** —pintar solo una y dejar la otra dicha sin escribir— deja un número que se oye y no se lee: es un cambio de 2 minutos (quitar el trozo `h01` correspondiente de `subtitulos-041.ts`). Queda para que el usuario elija viendo la prueba.

## Escenas (los seis bloques)

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | 0,0-3,8 | El lote | el lote entero, de golpe | lote | DR233 7,30-11,13 s: cenital, el árbol grande, la vía y la explanada roja · solo música, golpe de entrada de 9,1 dB en el f3 |
| 2 | 3,8-10,2 | Hook | lo que se paga | Isabella | HK07: sube la loma de césped hacia cámara, pequeña en el cuadro, con un árbol grande y el cielo nublado · «3.428 metros cuadrados por 800 millones. Vente, te muestro todo lo que estás comprando.» |
| 3 | 10,2-17,3 | Recorrido | lo que hay dentro | lote | la cabaña entre las palmas (DR96, 1,9 s) · la vista alta con los eucaliptos y la cancha redonda (DR210, 2,3 s) · las terrazas con la luz dorada (DR201, 2,9 s) (solo música) |
| 4 | 17,3-22,9 | Mitad | los accesos, nombrados | Isabella | MD01: junto al talud de tierra roja, con el perro y el portón, señala a un lado y a otro · «Dos accesos para un mismo lote, una por la parcelación y otra por la vía veredal.» |
| 5 | 22,9-32,9 | Recorrido | los accesos, enseñados, y la vista | lote | el portón de madera de la vereda (RC04, 3,2 s) · la vía vista desde arriba (DR233, 2,2 s) · LA VISTA del atardecer (DR201, 4,6 s, el plano más largo) |
| 6 | 32,9-38,9 | CTA | invitar | Isabella | CT01: plano medio, los cipreses y el valle · «Si quieres conocerlo, escríbeme lote y te envío toda la información.» → funde a negro → tarjeta con el logo y la web |

## Decisiones tomadas (y las descartadas)

- **Tomas = las asignadas** (HK07, MD01, CT01). No se cambia ninguna.
- **Canción = *Epic Inspirational and Cinematic Motivational* (AShamaluevMusic, 3:11)**, del grupo asignado (*Fortitude*, *In This Together*, *Epic Inspirational*, *Deep Breath*; *Strobe* solo como último recurso). `buscar-cortes-039.py` con los 9 planos de esta pieza (`musica/buscar-cortes-grupo-pasada1…4.txt`, `…epic-pasada5/6.txt`):
  - *Fortitude*, *In This Together* y *Epic*, 0 rejillas a ≥ 9 dB; *Deep Breath* tampoco.
  - A 7,4-8 dB hay rejillas en *In This Together* (su cola, a −26 LUFS: un final ya apagado, no una pieza con arco), *Deep Breath* (ambient sin golpes que corten) y *Epic*: la que sube de −12 a −10 LUFS (un crescendo que acompaña el paseo) y cuyos golpes son los más claros. **Elegida *Epic***: golpes de 8,7 a 10,3 dB (el más débil, el fin del hook y la entrada del CTA, 8,7; el canal exige 7,4).
  - ***Strobe*** (club) pasaría a ≥ 14 dB con 1.833 soluciones, pero es progressive house: no se toca (último recurso del reparto).
  - **Riesgo declarado:** es una pared de percusión (golpes de 7-9 dB casi cada medio segundo): un corte seco «cae en un golpe» sin que se sienta una frase. Medida, **no oída**; licencia sin verificar (`HAY_MUSICA = false` es la salida).
- **Los drones, elegidos por su movimiento** (`ventana-fina.py`, `flujo.py`, `perfil-mov.py`): DR233 es un cenital a velocidad constante (dispersión 0,02); DR210, 0,05; DR201 (terrazas), 0,03. Dos excepciones declaradas: c03 (DR96: el descenso gana velocidad, 0,14) y c09 (DR201: el ascenso frena al acabar, 0,09). **DR96 se usa en su único tramo sin uso que enseña la cabaña** (15,60-17,47 s): el resto del clip, o ya lo usaron otras versiones, o no la enseña.
- **Los DJI a 29,97 fps** se normalizan a 30 (`-r 30`): se comprobó que ninguno de los cinco clips tiene dos fotogramas iguales (el fotograma repetido de los ≈ 33 s no cae en ningún tramo).
- **Las palabras dudosas** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto): «te muestro» (HK07, whisper: «20 muestros», confianza 0,3), «vía veredal» (MD01, whisper: «vida verdad», 0,12) y «escríbeme» (CT01, whisper: «escríbeme elote»). Las tres cifras del hook («3.428», «800») las oye whisper con confianza 0,93-0,96 salvo el primer token de «3.428» (0,37).
- **Las voces:** tratadas a −15 LUFS sin saturar (compresor 3,5:1, +19,4 · +18,0 · +17,6 dB tras él, limitador a −2,5 dBFS; pico real −2,5 dBFS). La música baja con curva de coseno y acaba de bajar ANTES de la primera palabra de cada toma (a 2,3 · 2,7 · 2,4 f), y se apaga bajo la tarjeta.
- **El color:** la base del canal más un ajuste medido por plano; σ de luma entre planos 10,3 → 7,7 · quemado máx. 4,3 → 0,1 % · aplastado máx. 3,8 % (la vista, de noche casi); saturación media 0,28 → 0,32. Piel de Isabella: sin tocar (`saturation` ≤ 1,06).
