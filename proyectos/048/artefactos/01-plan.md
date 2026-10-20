# 01 · Plan narrativo — proyecto 048 · Tierra Grata Bosque Santo (El Poblado, ARRIENDO), V30 del registro («Chef y experiencias», cuarta de las seis piezas del arriendo)

> Paso 1 de 3. Escrito con el reparto de la sesión coordinadora (`proyectos/044/reparto-045-050.md`), el catálogo del material (`proyectos/044/catalogo-material.md`), la ficha de la web, lo aprendido en el 021 (la excepción de abrir con el hook) y en el 043 (la última pieza del formato), y **antes** del primer render. Siguiente: [02-layout.md](02-layout.md).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Pedido | «Monta el proyecto 048 (V30, "Chef y experiencias") del arriendo de Tierra Grata: un reel 9:16 del formato `recorrido-luxur` en sus DOS formatos (orgánico y con ficha).» Una de las seis sesiones del encargo del 2026-10-19 («6 videos para redes sociales, cada video en 2 formatos: uno para el funnel y el otro para post orgánicos. No tengo videos de dron: haz una combinación de empezar con una toma del apartamento y otros directamente con el hook»). Tomas, apertura, clímax y canción FIJADAS por la coordinadora: no se cambian sin un motivo técnico declarado. |
| Numeración | **V30 / 048.** Las V27/045, V28/046 y V29/047 y las V31/049 y V32/050 son de las sesiones hermanas (cada una en su worktree). Mi fila del registro (`archivos/musica/registro-de-uso.md` §1) estaba reservada desde la coordinadora. |
| La propiedad y la ficha | **Tierra Grata Bosque Santo**, El Poblado, Medellín, a pocos metros de la Av. Las Palmas. **ARRIENDO: COP 14,8 millones al mes** (JSON-LD `offer-rent` 14800000). 113 m² · 2 habitaciones · 2 baños · 2 parqueaderos · piso 9 · 2023 · **balcón con jacuzzi privado** · la unidad: piscina y carril de nado, zonas húmedas, gimnasio, Social Kitchen, coworking, BBQ, salón social, portería 24 h, pet friendly. La misma unidad está en venta (1.500 M): **la pieza no la nombra** (encargo: promocionar el arriendo). Dicho por Isabella el 17-oct: aseo semanal incluido · apartamento amoblado · chef privado, tours, masajes y transporte · acompañamiento personalizado. **No consta** (no se afirma): administración, condiciones del contrato, minutos a ningún sitio, qué incluye el «acompañamiento», si las experiencias se pagan aparte. |
| Material | `Apartamento - Tierra Grata - Las Palmas/Videos/`, copiado a `proyectos/048/original/` con el CÓDIGO del catálogo por nombre. sha256 (8) en `normalizar.mjs`: HK01 `6222883e`, MD03 `6fdf774f`, CT03 `a978434e`, RC05 `931b51dd`, RC09 `8b1031a3`, RC10 `e7e4ee8b`, RC11 `38a59f31`, RC14 `59647a5b`, RC16 `7cdf817e`, RC22 `33ac8ce2` (copiado, no usado), música `951c5de2` (*L' Amour Toujours on SAXOPHONE*; la rev. 0 llevaba *Einaudi Fly*, `a7e0695e`). **No hay dron.** |
| Tres sorpresas del material (catálogo §0) | (1) El rodaje del 17-oct no siguió el libreto 044: las once frases de Isabella son del ángulo «acompañamiento personalizado», todas en zonas comunes. (2) **El recorrido es HORIZONTAL (1920×1080)**: se recorta al centro (`crop=608:1080:X:0`) y se escala ×2,13; sale más BLANDO que Isabella en 4K. Es el material: no se filtra ni se afila. (3) No hay dron. |
| Composición | `Recorrido048` · 1080×1920 · **30 fps** · **1364 f (45,5 s)**. Clips normalizados a 1296×2304 y 30 fps (iPhone: HLG → BT.709 con VideoToolbox; recorrido SDR: recortado y escalado). CT03 va a 29,97 fps: `-r 30` tras el tone-map. |
| Formato | 9:16 vertical · `recorrido-luxur` con **apertura por el hook** (HOOK · RECORRIDO · MITAD · RECORRIDO · CTA) · tres frases de Isabella · DOS entregas: orgánico (`048-recorrido.mp4`, con subtítulos editoriales) y funnel (`048-recorrido-ficha.mp4`, sin subtítulos y con la ficha fija `APARTAMENTO EN RENTA · El Poblado · Tierra Grata · $ 14,8 M COP / MES`) |
| Marca / texto | Luxur, texto **editorial** (abajo, 90 %, cursiva 8 px menor); **sin sello**; cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com` |
| Destino | Reels · Shorts · TikTok (orgánico) y Meta Ads / feed 1:1 (con ficha) |
| Presentadora | Isabella Cadavid (asesora de la ficha) |

## Lo que esta pieza declara (excepciones y repeticiones)

1. **ABRE CON EL HOOK: rompe la regla fija 1** («la primera toma sale sin texto ni voz»). Es una excepción POR ENCARGO del usuario (como el 021): el frame 0 es Isabella, no la casa, y la miniatura (el frame 0) es ella. Está declarada en esta cabecera, en `metraje-048.ts`, en `subtitulos-048.ts`, en `Recorrido048.tsx` y en la puerta (`ABRE_CON_EL_HOOK` en `revisar-048.mjs`). Las demás reglas fijas se cumplen: nunca el sello, cierre = tarjeta oscura con el logo y la web, nada se congela, ninguna cifra.
2. **El hook, la mitad y el CTA se repiten en otras piezas** (solo hay 3 hooks, 5 mitades y 3 CTA del 17-oct para seis piezas): HK01 la repite la V27; MD03, la V28; CT03, la V29. Ninguna pareja hook·CTA se repite y HK03/CT03 (la misma idea) nunca van juntas.
3. **El hook y la mitad están en la misma terraza común** (HK01 y MD03 son los dos de la pérgola); el rodaje del 17-oct no tiene otro sitio para ellas. La tercera, el CTA, en las escaleras.
4. **El recorrido, horizontal recortado, es más blando que Isabella.** Siete planos; RC10 con X=1100 (los demás, X=656, el centro).
5. **No hay sala.** En el 9:16 recortado al centro, la sala de RC02 es techo y suelo; RC01, RC04 y RC20 son aperturas de otras piezas. Se salta el espacio: no se inventa un orden.
6. **El jacuzzi PRIVADO del balcón SÍ está en un clip: RC10** (que el catálogo describía como «el deck de madera con la banca y la pérgola, terraza común»). Es la tina cuadrada con listones de madera, el escalón de madera, la baldosa negra, la baranda de vidrio y la losa del balcón de la foto `3-Jacuzzi.png`. Por eso el clímax asignado (RC10) es exactamente el plano que pedía el aviso de §6 del catálogo: no hay que sustituirlo. Se anota en el catálogo y en el registro §7.
7. **Gente en el gimnasio.** El tramo de RC14 con el rótulo «GIMNASIO» (5-6 s) trae usuarios a tamaño reconocible; el recorte los agranda ×1,78. Se usa el inicio del clip (0,0-2,6 s: estantería con las pelotas, luces, máquinas; sin usuarios a la vista).
8. **La canción la cambió el usuario** (rev. 1, 2026-10-19: «cambia la canción a una más alegre» tras ver la prueba con *Einaudi Fly*, la del reparto). Es una excepción a «no cambies tu canción salvo a tu alternativa» (*Einaudi Experience*, que tampoco es alegre): decisión del usuario, declarada aquí y en el registro de uso. De las libres, la única alegre y apta es ***L' Amour Toujours on SAXOPHONE*** (sax, 126 BPM; *La Isla Bonita* la quitó el usuario en la V7 por «muy playera»; las demás libres son blues, worship o house de 10 min). Se suelta *Einaudi Fly* (y su alternativa), que quedan medidas en el registro (tiene final natural, contra lo que decía).

## El ángulo: «CHEF Y EXPERIENCIAS» (y en qué se distingue de las otras cinco)

**La idea en una línea:** esta unidad es para quien llega a una ciudad que no es la suya y no quiere perder su tiempo: el hook promete que el tiempo es lo más valioso y que se le quita el aseo; la mitad lista lo que hay detrás del servicio (chef privado, tours, masajes, transporte, experiencias); el CTA cierra con la idea («el acompañamiento personalizado es una plusvalía que vale la pena conocer»).

| | V27 · 045 | V28 · 046 | V29 · 047 | **V30 · 048** | V31 · 049 | V32 · 050 |
|---|---|---|---|---|---|---|
| Apertura | APTO RC01 | HOOK | APTO RC20 | **HOOK** | APTO RC04 | HOOK |
| Hook | HK01 | HK03 | HK02 | **HK01** | HK03 | HK02 |
| Mitad | MD01 | MD02+MD03 | MD04+MD05 | **MD03** | MD05 | MD04 |
| CTA | CT01 | CT02 | CT03 | **CT03** | CT01 | CT02 |
| Clímax | RC21 | RC18 | RC03 | **RC10** | RC19 | RC02 (final) |
| Canción | *Fortitude* | *Children* | *Dreamlife* | ***L' Amour Toujours*** (sax; la pidió el usuario más alegre que *Einaudi Fly*) | *In This Together* | *Spring is Coming* |

## Promesa y CTA

- **Promesa (primeros 7 s):** Isabella camina hacia cámara por la terraza común, bajo la pérgola y con la ciudad detrás, y dice «el tiempo es el activo más valioso de los seres humanos y te ayudamos a optimizarlo incluyendo un aseo semanal». Su voz empieza en el f30 (1,00 s; hay 1 s de aire), con su subtítulo desde el f29; la música abre con una nota en el f3 que suena entera y baja con curva antes de su primera palabra.
- **Acción final:** **no es una acción** (CT03 dice «el acompañamiento personalizado es una plusvalía que vale la pena conocer»): la tarjeta con el logo y la web hace de CTA. El caption lleva el canal.
- **Lo que NO se cuenta:** ninguna cifra (el canon, 113 m², 2 habitaciones van al caption y a la ficha); administración, contrato, qué se paga aparte, distancias: la ficha no los da. «Amoblado» no se dice en esta pieza (lo dice CT02, de otra).

## Escenas (los bloques; la pieza no tiene bloque 1: abre el hook)

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | 0,0-7,1 | 2 · hook | el tiempo es lo más valioso | Isabella | HK01: camina hacia cámara en la terraza común · «El tiempo es el activo más valioso de los seres humanos y te ayudamos a optimizarlo incluyendo un aseo semanal.» |
| 2 | 7,1-17,2 | 3 · la unidad | lo que hay en el edificio | recorrido | la Social Kitchen (RC11, 3,0 s) · el gimnasio (RC14, 2,6 s) · el carril de nado (RC16, 4,5 s) · solo música |
| 3 | 17,2-24,0 | 4 · mitad | el servicio | Isabella | MD03: camina bajo la pérgola · «Contamos con chef privado, tours, masajes y transporte y las mejores experiencias de la ciudad de Medellín.» |
| 4 | 24,0-37,3 | 5 · el apartamento | la alcoba, el baño y el balcón con el jacuzzi | recorrido | la alcoba (RC05, 3,9 s) · el baño (RC09, 4,0 s) · EL BALCÓN, del cielo y la ciudad al jacuzzi privado (RC10, 5,3 s, el más largo y el clímax) |
| 5 | 37,3-43,5 | 6 · CTA | la idea | Isabella | CT03: baja las escaleras con césped, el edificio detrás · «Cuando llegas a una ciudad que no es la tuya, el acompañamiento personalizado es una plusvalía que vale la pena conocer.» → funde a negro |
| 6 | 43,5-45,5 | 6 · cierre | la marca | logo | tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com`; la canción se apaga |

## Decisiones tomadas (y las descartadas)

- **Hook = HK01 (asignado).** Whisper la ponía en 0,0 s; medida, la voz empieza a los **1,00 s** (f30) y acaba a los **6,60 s** (f198): hay 1 s de aire, de modo que la nota de apertura de la música suena entera antes de que hable. **POR CONFIRMAR AL OÍDO: «aseo»** (whisper oye «asedio», «aseo», «hace dos», «deseo»; en la HK02, «asesor»).
- **Mitad = MD03 (asignada).** Voz 0,68-6,65 s. `desde` 10 f: entra A CORTE en un golpe y su primera palabra suena 10 f después.
- **CTA = CT03 (asignada).** Voz 0,62-6,04 s; 29,97 fps (`-r 30` tras el tone-map). Entra a corte en el golpe más fuerte de la pieza (11,9 dB).
- **El paseo** (declarado): Social Kitchen → gimnasio → carril de nado (el orden en que se rodó y el que desemboca en la terraza de la mitad) y, en el apartamento, alcoba → baño → balcón. El balcón es donde se acaba una vez dentro: se sale de la sala, que no entra. **La ciudad entera no aparece antes del bloque 5** salvo donde habla Isabella (la terraza común: no hay otro sitio) y, en el hook y la mitad, siempre tras ella.
- **Recorridos descartados:** RC22 (el bar con el neón, 3,2 s): precioso, pero en una pieza de 46 s el clímax pide ≥ 5 s y el bar come el sitio; queda para otra. RC02 (sala): techo en el recorte. RC06-RC08 (otros tres ángulos de la alcoba): redundantes con RC05.
- **Cortes y disolvencias.** Isabella sale y entra con disolvencia (hook → cocina, mitad → alcoba) y el baño cede al balcón con otra (el hueco entre el golpe del baño y el del CTA no tiene golpes de ≥ 8 dB a una distancia útil). Los cinco cortes secos (gimnasio, piscina, mitad, baño, CTA) caen en golpes MEDIDOS de 8,2 a 12,0 dB de la canción, todos a ≤ 1 f del pulso de 126 BPM (la rev. 0, con un piano de arpegios sin pulso, tenía golpes de 6,5 a 11,9 dB).
- **La música** *(L' Amour Toujours on SAXOPHONE, `951c5de2`)*: entrada en el 164,967 s de la canción (una nota de 10,5 dB en el 165,017 s, el f3). La canción es plana y muy alta (−9,5 LUFS, picos de hasta +0,1 dBFS en el archivo): se baja ≈ 5 dB a −15 LUFS y bajo la voz queda a −26. A los 39 s tiene su final natural (un fundido de −13 a −47 dB entre el 205,9 y el 208,5 s, f1233-1323) que cae bajo la voz del CTA y la tarjeta. Medida (`medir-pista.py`, `rejilla.py`, `buscar-entrada.py`), no oída. Licencia sin verificar (`HAY_MUSICA = false` es la salida).
- **El color** se casa plano a plano: las tomas de Isabella son HLG de la tarde, el recorrido SDR del 31-ago/2-sep (la Social Kitchen, el gimnasio y el carril de nado se suben a exposición +0,3-0,4; el baño, blanquísimo, se baja a −0,3). Medido sobre stills a escala 1 (luma 84-155; la de Isabella, 100-132).
- **Los tres sitios de Isabella:** la terraza común (dos veces) y las escaleras con césped.

## Lo que comparte con otras versiones del arriendo (declarado)

| Clip | Otras piezas | V30 |
|---|---|---|
| HK01 | V27 (045) | la toma entera (0-7,07 s) |
| MD03 | V28 (046), seguida de MD02 | desde 0,33 s hasta 7,0 s |
| CT03 | V29 (047) | 0,30-6,50 s |
| RC11, RC14, RC16, RC05, RC09 | libres: otras piezas los pueden usar (en otros tramos) | tramos declarados en `03-timeline.md` |
| RC10 | exclusivo de esta pieza (clímax) | 5,00-10,63 s |

## Pendiente con el usuario (tras la final)

1. **Oír «aseo»** (HK01, ≈ f177 = 5,9 s; la puerta con `--final` falla solo por esto): la final se exportó con la duda abierta por orden del usuario (`recorrido-luxur` §7c); la nota se queda. Si no es «aseo», ver `combinaciones.md` («Cerrar aseo»).
2. La canción (la pidió el usuario más alegre; medida, no oída; su fundido final cae bajo el CTA; licencia sin verificar).
3. Que el hook, la mitad y el CTA se repiten en otras piezas (V27, V28 y V29) y que el recorrido horizontal recortado es más blando que Isabella: declarado, no se corrige.
