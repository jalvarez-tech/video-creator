# 01 · Plan narrativo — proyecto 042 · Lote en El Carmen de Viboral (Mia), V25 del registro (sexto reel de la propiedad, el del HALLAZGO)

> Paso 1 de 3. Escrito con el material del rodaje (`archivos/musica/registro-de-uso.md` §6), la ficha de la web, lo aprendido en el 030, el 031, el 034 y el 039 (`aprendizajes.md` y `combinaciones.md` de cada uno) y **antes** del primer render. Siguiente: [02-layout.md](02-layout.md).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Pedido | Una de las cuatro sesiones V23-V26 del Lote El Carmen, lanzadas a la vez el 2026-10-17 («Haz 4 videos en sesiones diferentes con modelo Sonnet para el lote»; el reparto de tomas, drones y canciones venía decidido): un reel 9:16 con Isabella y el ángulo **«ENCONTRÉ»**, el hallazgo. «Encontré un lote…» → el recorrido lo descubre (de las palmas y la cabaña a las terrazas con el cielo rosa) → «acabas de encontrarlo» → «si tienes un proyecto en mente, escríbeme». Más las reglas fijas del canal (estructura DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA con tres frases de Isabella, primera toma sin texto ni voz, nunca el sello, cierre en tarjeta oscura con el logo y la web, subtítulos editoriales, voz a −15 LUFS, música con curva, color por plano medido). |
| Numeración | **V25 / 042.** Reservada en mi registro (`archivos/musica/registro-de-uso.md`): la V23/040, la V24/041 y la V26/043 son de las otras tres sesiones de la tanda (sus reservas viven en SUS worktrees; no hay commit ni push: el usuario no lo ha pedido). |
| La propiedad y la ficha | Lote en El Carmen de Viboral (Mia). Ficha leída el 2026-10-17 (`propiedadesluxur.com/es/propiedades/el-carmen-de-viboral/lote-campestre-en-venta-en-el-carmen-de-viboral-con-vista-panoramica`): VENTA · COP 800 millones · 3.428 m² · **dos entradas independientes** (una por la parcelación y otra por la vereda) · energía y agua disponibles · la tubería de gas pasa cerca (sin distancia) · se permite construir casa bifamiliar · vista panorámica · entorno natural, tranquilo y privado · árboles frutales · cabaña de madera · asesora Isabella Cadavid. **No consta**: distancias ni tiempos a ningún sitio, situación jurídica ni fuente del agua: **no se afirma nada de eso**. |
| Material | `Lote - El Carmen - Mia/Videos/`, copiado a `proyectos/042/original/` con el CÓDIGO del registro por nombre. sha256 en `normalizar.mjs`: HK01 `19bd249c`, MD03 `d876098f` (la misma de la V18), CT04 `aff9cdd3` (la misma de la V15), RC01-RC05 (normalizados, no se usan), DR206 `b4280d2c`, DR221 `796043e9`, DR228 `d740f417`, música `9c3a3dc3`. |
| Composición | `Recorrido042` · 1080×1920 · **30 fps** · 1081 f (36,03 s). Clips normalizados a 1296×2304 y 30 fps (iPhone: HLG → BT.709 con VideoToolbox; DJI 4K vertical SDR: solo rotado). Los DJI son de 29,97 fps: `setpts=PTS*1000/1001` antes de `-r 30` para que no repitan un fotograma cada ≈ 33 s. |
| Formato | 9:16 vertical · `recorrido-luxur` (DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA) |
| Marca / texto | Luxur, texto **editorial** (abajo, 90 %, cursiva 8 px menor); **sin sello**; cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com` |
| Destino | Reels · Shorts · TikTok |
| Presentadora | Isabella Cadavid (asesora de la ficha) |

## El ángulo: «Encontré» (y en qué se distingue de las versiones anteriores)

**La idea en una línea:** este lote es para quien lleva tiempo buscando su lugar en el campo **y está cansado de no encontrarlo**: el hook lo dice en primera persona («encontré»), el recorrido aéreo lo va descubriendo y la mitad lo confirma («acabas de encontrarlo»).

| | V14 (030) | V15 (031) | V18 (034) | V22 (039) | **V25 (042)** |
|---|---|---|---|---|---|
| Argumento | seguridad sin encierro | construir con agua y energía | la naturaleza como parte de la casa | campo sin desconexión | **el hallazgo: encontré / acabas de encontrarlo** |
| Hook | HK04 | HK06 | HK03 | HK02 | **HK01** «Encontré un lote donde puedes tener privacidad, naturaleza y dos accesos, y está en El Carmen de Viboral.» |
| Mitad | MD02 | MD04 | MD03 | MD05 | **MD03** (repite la V18) |
| CTA | CT01 | CT04 | CT03 recortada | CT02 | **CT04** (repite la V15) |
| Canción | *Becoming* | *Somewhere inside of me* | *Chillin'* | *Light Fills the Room* | ***Silver Skies Cinematic Piano*** |
| Metraje | drones del 2026-08-26 | ídem | ídem | ídem | **drones del 2026-10-14 al atardecer (DR206, DR221, DR228)** |
| Ritmo | 10 planos de 2-4 s, cortes en golpes | ídem | ídem | 14 planos de 1-4 s, cortes en golpes | **10 planos de 2,5-3,5 s con piano: 2 cortes secos y el resto disolvencias** |

### Lo que NO cambia respecto de las versiones anteriores (y se dice)

- **La mitad es la MD03 de la V18** y **el CTA es la CT04 de la V15**: las mismas tomas con las mismas frases (en la V18 «acabas de encontrarlo» cerraba la búsqueda; aquí es el centro del ángulo, y no quedaba ninguna otra mitad que hablara de encontrar). Repetirlas lo decidió el reparto del encargo: no queda ningún CTA limpio.
- **El hook (HK01) es nuevo**, pero dice «dos accesos» (el argumento de la V14); va en una enumeración, no como argumento.
- El mismo lote, la misma cabaña y las mismas terrazas (es la misma propiedad), pero **ni un segundo de metraje de recorrido en común** con ninguna versión anterior: los tres drones son del 2026-10-14 y ninguna los usó.

## Promesa y CTA

- **Promesa (primeros 2,5 s):** el lote a la hora dorada, lateral y a velocidad constante desde el primer fotograma, **sin texto ni voz** (regla fija), con el golpe de la canción en el f3. Isabella entra A CORTE en el f75 caminando hacia cámara y ya dice «Encontré».
- **Acción final:** «escríbeme»: UNA acción.
- **Lo que NO se cuenta:** precio (COP 800 millones), área (3.428 m²) ni ninguna cifra (van al caption); valorización ni rentabilidad; distancias ni tiempos (la ficha no los da); la casa bifamiliar, el agua y la energía (caption). **Ninguna cifra en toda la pieza**, ni en pantalla ni en voz.

## Escenas (los seis bloques)

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | 0,0-2,5 | La apertura | el lote entero a la hora dorada | lote | DR206 3,00-5,50 s: terrazas, tierra roja, árbol grande y cabaña bajo un cielo de nubes lilas · solo música: golpe de 12,3 dB en el f3 |
| 2 | 2,5-8,9 | Hook | el hallazgo | Isabella | HK01: camina hacia cámara en la loma, cielo azul y colinas · «Encontré un lote donde puedes tener privacidad, naturaleza y dos accesos, y está en El Carmen de Viboral.» |
| 3 | 8,9-17,0 | Recorrido | el descubrimiento | lote | tres ventanas del MISMO vuelo (DR221): las palmas, la cerca y la cabaña (4,5 s) → las terrazas con la tierra roja y el cielo rosa (12,0 s) → la pared de terrazas con las nubes rosadas (19,5 s) · solo música: el retorno del piano abre el paseo en el f266 |
| 4 | 17,0-21,6 | Mitad | el hallazgo, dicho | Isabella | MD03: camina hacia cámara en la ladera con el valle · «Si llevas meses buscando tu lugar para tu casa campestre, acabas de encontrarlo.» |
| 5 | 21,6-30,0 | Recorrido | la cabaña, el vuelo y la vista | lote | la cabaña y el árbol grande de lado (DR206 7,8 s) → el vuelo bajo sobre las terrazas (DR228 7,5 s) → LA VISTA: el cielo rosa con los árboles en silueta (DR228 14,5 s, 3,5 s, el plano más largo) |
| 6 | 30,0-36,0 | CTA | invitar | Isabella | CT04: camina hacia cámara frente a la cabaña y los pinos · «Si tienes un proyecto en mente, escríbeme y hablamos más sobre este lote.» → funde a negro → tarjeta con el logo y la web |

## Decisiones tomadas (y las descartadas)

- **Hook = HK01** (`IMG_1587`, asignada): «Encontré un lote donde puedes tener privacidad, naturaleza y dos accesos, y está en El Carmen de Viboral». La ficha respalda «privacidad» («entorno natural, tranquilo y privado») y «dos accesos»; «está en El Carmen de Viboral» es la ubicación. **No da ni una distancia.** HK01 no deja aire: su primera sílaba suena a los 0,075 s, 2,25 f después de entrar. **POR CONFIRMAR AL OÍDO: «Encontré»**: whisper oye «Encontro»; el vocal final medido por formantes (F1 ≈ 565 Hz, F2 ≈ 1.630 Hz en cuatro ventanas seguidas) cae entre su /e/ («lote», «tener»: F1 600-650, F2 2.020-2.400) y su /o/ («con»: F1 560-590, F2 1.450-1.650), con la /r/ delante bajando la F2: **no cierra**. Se pinta «Encontré» (el sentido de la frase y lo que dice el registro) y se pregunta antes de exportar.
- **Mitad = MD03** (`IMG_1600`, asignada): «acabas de encontrarlo» es el centro del ángulo. **POR CONFIRMAR AL OÍDO: «acabas»** (la misma duda de la V18: en la banda de las /s/ casi no hay fricativa; suena casi «acaba de»). Es la misma toma: se hereda el número de voz y los tiempos medidos por el 034.
- **CTA = CT04** (`IMG_1612`, asignada): una acción, «escríbeme». Todas sus palabras con confianza ≥ 0,6 en whisper (es la del 031). **La toma NO acaba con la última sílaba, como decía el encargo**: su voz acaba a 3,98 s y el clip dura 5,10 s; se usa hasta el f133 del clip (4,43 s), 13,6 f después de la última palabra, y en ellos funde a negro (como el 031).
- **Los tres sitios de Isabella** son la misma loma con otros fondos (HK01: loma abierta con el cielo azul, el perro y las colinas; MD03: ladera con un pino a la izquierda y el valle; CT04: la loma de la cabaña con los pinos y el cielo cubierto). En las tres camina hacia cámara: empuje 1,00 → 1,04.
- **Todo el recorrido es dron**: los tres drones (DR206 de 15 s, DR221 de 27 s, DR228 de 23 s) dan ventanas de sobra y comparten look (atardecer); los recorridos a pie (RC01-RC05) están grabados de día y meterían un tercer look. No se usan (el reparto permitía sumarlos, declarado).
- **El orden del paseo** sigue el vuelo de cada dron: DR221 sube desde las palmas y la cerca hasta el cielo rosa (bloque 3: tres ventanas sin segundos en común, 4,5 · 12,0 · 19,5 s); DR206 rodea el árbol grande y la cabaña (la apertura y el plano de la cabaña del bloque 5, a 4,8 s de distancia en el clip); DR228 vuela bajo sobre las terrazas y sube al cielo rosa (el vuelo, 7,5 s, y la vista, 14,5 s).
- **Los drones, elegidos por su movimiento** (`perfil_mov`, diferencia entre fotogramas): son vuelos suaves y constantes (dispersión 0,02-0,05 en cada segundo; velocidades de 0,7 a 1,8): ninguna ventana acelera, se queda quieta ni da tirones.
- **Canción = *Silver Skies Cinematic Piano*** (`9c3a3dc3`, piano sereno en La# mayor, «sereno, esperanzador, íntimo»): del grupo de la V25, la de mejor ajuste medido con la estructura (`buscar-entrada.py --cta 31 35`: golpe de entrada de 12,3 dB, **un respiro del piano de +4,5 a +9 s que cae justo bajo el hook y el golpe de 17,4 dB del retorno en +9,12 s que abre el paseo**, y una caída natural en +33,5 s que cae tras el CTA). Las otras (*Children*, *Spring is Coming*, *Einaudi Fly*, *Experience*, *Says*): *Children* (caída de 17 dB a +35 s, la segunda opción), *Spring is Coming* y *Einaudi Fly* sin caída, *Experience* y *Says* con introducciones de 108 y 275 s. **Medida, no oída; licencia sin verificar.** Con piano, las disolvencias van libres: **hay DOS cortes secos** (la entrada del hook, que no cae en golpe, y la del paseo, que sí).
- **El corte del hook no cae en un golpe** (declarado): HK01 empieza a hablar 2,25 f después de entrar, así que ningún golpe puede sonar entero con ella encima. La música baja con curva de coseno desde el golpe de 9,8 dB del f57 y ACABA en el corte (f75); el respiro del piano hace el resto.
- **El color:** los drones son del atardecer y Isabella de día: el color se casa plano a plano y medido (`COLOR_BASE` del canal + el ajuste de cada toma). Ver `combinaciones.md`.
- **El disco:** 57 GB libres (compartidos con otras tres sesiones); `herramientas/clonar-al-copiar.cjs` hace que cada still o render clone `public/` en vez de copiarlo.

## Lo que comparte con las versiones anteriores (declarado)

| Clip | Versiones anteriores | V25 |
|---|---|---|
| MD03 (`md03.mp4`) | V18 (0,2-5,0 s) | 0,5-5,1 s (la toma entera: la misma voz y los mismos tiempos; **declarado**) |
| CT04 (`ct04.mp4`) | V15 (0,2-4,4 s) | 0,4-4,4 s (ídem; **declarado**) |
| DR206, DR221, DR228 | ninguna (drones del 2026-10-14) | exclusivos de esta pieza |

## Pendiente con el usuario

1. El OK a la prueba (`pruebas-720p/042-recorrido.mp4`, 540×960) y a las decisiones declaradas: **la mitad y el CTA repiten las tomas de la V18 y la V15**, **el corte del hook sin golpe**, **solo drones (sin recorridos a pie)** y **la canción** (medida, no oída; piano; licencia no verificada).
2. **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto): «**Encontré**» (HK01, f77 = 2,6 s del vídeo), «y dos accesos» (HK01, f184 = 6,1 s: la «y» pegada a «naturaleza») y «**acabas** de encontrarlo» (MD03, f600 = 20,0 s).
3. Por dónde se escribe («escríbeme»: comentario o mensaje directo; el caption propone mensaje directo).
