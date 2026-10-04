# Los Patios · Apto 501 (El Poblado) — catálogo de material para mezclar vídeos

> Propiedades Luxur · rodaje del 2026-10-01 (10:11–11:49) · catálogo del 2026-10-03
> Origen: `/Volumes/SSK SSD/Work/Propiedades Luxur/Apartamento - Los Patios - El Poblado/Videos` (5 carpetas)
> Estado: **borrador para aprobar.** Lo que dicen las tomas está transcrito de forma automática (Whisper local con vocabulario de la propiedad); lo dudoso está marcado «por confirmar al oído». Los datos de la propiedad que nadie ha dado están en §2 como «no consta».

## 0. Cómo usar este archivo

Cada toma tiene un **código** para pedir mezclas sin ambigüedad: *«monta P1 con HK03 en lugar de HK02 y CT04 al final»*.

| Prefijo | Qué es | Carpeta | Tomas |
|---|---|---|---|
| `HK` | Hook: Isabella hablando (abre la pieza) | 1 Hooks | 12 · 75,3 s |
| `MD` | Mitad: Isabella hablando (cuerpo / objeción / valor) | 2 Mitad | 15 · 96,5 s |
| `CT` | CTA: Isabella hablando (cierre) | 5 Cta | 7 · 40,8 s |
| `RC` | Recorrido del apartamento y del edificio, sin voz (dos con voz suelta, ver §9: RC06 y RC16) | 4 Recorrido | 26 · 282,1 s |
| `DR` | Dron DJI, sin audio | 3 Dron | 11 · 171,4 s |

- §1-§4: qué se vende y a quién. §5: datos técnicos. §6-§9: el catálogo toma por toma. §10: cómo encadenar. §11: piezas propuestas y plan de pruebas. §12: dudas y lo que falta.
- Los **subtítulos** están marcados como pide el motor (`texto.modo: "editorial"` de Luxur): ` / ` separa líneas, `**así**` es el acento (una línea entera, máx. 3 palabras), un bloque por línea. Se pueden pegar tal cual en `proyectos/NNN/voz/*.txt` y pasarlos por `trozos-editoriales.mjs` (ver `subtitulos-editoriales.md` de `recorrido-luxur`).
- Los **«cortes sugeridos»** dejan 0,4 s antes de la primera palabra y 0,4 s después de la última (los 12 fotogramas que necesita una disolvencia). Salen de medir la energía del audio, no de la transcripción.

> ⚠️ **Dos clips de dron ya no están en la carpeta.** Al empezar existían `DJI_20261001104125_0161_D.MP4` (25,2 s, 294 MB) y `DJI_20261001104210_0162_D.MP4` (29,2 s, 340 MB): los listé y medí con `ffprobe`; minutos después ya no aparecían. No los he tocado. Quedan 11 de 13 (171,4 s). Revisa si los moviste o si el SSD tiene un problema antes de copiar nada.

---

## 1. Resumen: qué tienes y qué vende

**Qué dice el material (lo dice Isabella, no yo).** Es un apartamento **sin terminar a propósito**: 317 m² en **obra gris**, diseñado por **ALH**, con **doble altura**, **patios y vacíos** que borran la frontera entre interior y paisaje, a **3.550 millones**. El mensaje de las 34 tomas habladas se repite en cinco ideas:

1. **«Sin terminar» no es un defecto, es la oportunidad** (HK02, MD02, MD13, MD14).
2. **Este apartamento no es para todos** — filtra al comprador (HK03, HK09, MD11, CT07).
3. **La arquitectura es lo que no se puede cambiar, y es lo excepcional** (MD01, MD04, MD06, MD07, MD08).
4. **Dentro y fuera dejan de estar separados** (HK01, HK06, HK07, MD01).
5. **Los números** (HK04, HK08, MD09, MD10, CT02, CT03).

**Qué lo hace ganable.** La terraza-patio (techo de madera, ladrillo, palma, agua), la fachada de jardines colgantes vista desde el dron y el muro de bloques de vidrio frente al ventanal tienen carácter propio y se distinguen a primera vista de un reel de listado. Isabella tiene 34 tomas habladas con buena calidad de audio (suelo de ruido de −47 a −61 dB) y siempre con la misma ropa, así que las combinaciones casan en vestuario (la luz cambia con las nubes: comprobarlo en el corte).

**Qué lo frena.** (a) La ficha de la propiedad está incompleta (§2): faltan alcobas, baños, parqueaderos, administración y, sobre todo, **cuánto cuesta y cuánto tarda terminarlo**, que es la primera objeción de cualquier obra gris. Ninguna toma la responde. (b) No hay voz en off limpia: para el bloque 5 hay que usar el audio de una toma de Isabella sobre otras imágenes. (c) Ninguna toma tiene un puente humano que no sea Isabella (una mano, una taza): el apartamento está vacío.

---

## 2. La propiedad (ficha)

Cada dato dice de dónde sale: **dicho** (Isabella lo pronuncia), **visto** (aparece en pantalla) o **carpeta** (nombre de la ruta). Lo que no consta no se puede afirmar en un vídeo.

| Dato | Valor | Fuente |
|---|---|---|
| Edificio | Los Patios | dicho (CT04) · visto (rótulo en la fachada, RC22) |
| Unidad | Apartamento 501 | visto (número en la puerta, RC01); el «5» sobre el ascensor (MD10) |
| Zona | El Poblado, Medellín | carpeta; las vistas (valle, montañas, ladrillo) encajan |
| Área | 317 m² | dicho (HK04, MD09, MD10, CT02). **No dice si es construida o privada** |
| Estado | Obra gris, sin acabados | dicho (HK02, MD10, CT02) · visto |
| Precio | 3.550 millones | dicho (HK08, CT02, CT03). **Moneda sin decir** (se asume COP) |
| Operación | Venta | deducido de «disponible por» (CT03): confirmar |
| Diseño | ALH | dicho (MD04, MD10, CT04). **Nombre completo sin decir; confirmar que se puede citar** |
| Rasgos dichos | Doble altura; patios y vacíos; agua y vegetación; ladrillo, concreto, madera, vidrio | MD01, MD04, MD06, MD08, RC06 |
| Rasgos vistos | Terraza-deck con techo de madera; patio con muro de listones, palma y una piscina/espejo de agua pequeño con escalones (**sin agua en las tomas**); muro de bloques de vidrio; ventanales con vista al valle y las montañas; tubería amarilla vista; fachada con terrazas vegetales colgantes | imágenes |
| Zonas comunes vistas | Lobby, sala de juntas, gimnasio | RC17–RC21 |
| **No consta** | Alcobas, baños, parqueaderos, administración, piso exacto, año de entrega, **costo y plazo de terminarlo**, si hay diseño o planos, permisos para modificar, a qué canal debe escribir el cliente | — |

**Cliente ideal.** `recorrido-luxur/cliente-ideal.md` sigue marcado como borrador y ninguno de sus tres perfiles encaja (el B quiere «acabados listos para entrar a vivir»). La propia Isabella dibuja uno, que propongo como **perfil D (por confirmar)**: *el comprador que valora la arquitectura y prefiere crear sus propios acabados* (MD11), *«muy específico»* (HK09), que busca *«algo diferente a un apartamento convencional»* (CT01). Su dolor no está dicho en ninguna toma; la hipótesis es «apartamentos terminados que se parecen todos».

**Idea en una línea (propuesta):** *este apartamento es para quien quiere diseñar su propio interior dentro de una arquitectura que ya está resuelta.*

---

## 3. Ángulos: qué se puede contar con este material

Cada ángulo es una historia completa; se elige **uno por pieza**. Las tomas de la derecha son las que lo sostienen.

| Ángulo | Qué promete | Hooks | Mitad | CTA | Qué mide |
|---|---|---|---|---|---|
| **A · La oportunidad** | Sin terminar = tuyo para definir | HK02 | MD02, MD12, MD13, MD14 | CT06, CT07 | Mensajes de compradores del perfil D |
| **B · La arquitectura se siente** | El lujo no es el acabado: es la relación con el exterior | HK06, HK07 | MD01, MD01a, MD04, MD05, MD06 | CT04, CT01 | Guardados y compartidos |
| **C · Los números** | Un precio, unos metros, qué estás comprando | HK08, HK04 | MD09, MD10 | CT02, CT03 | Mensajes (más calificados) |
| **D · Filtro** | Si no es para ti, mejor que lo sepas ya | HK03, HK09, HK10 | MD11 | CT07, CT05 | Calidad de los mensajes (menos volumen) |
| **E · Altura sin torre** | Vivir arriba sin sentirse en una torre | HK05 | MD07, MD08 | CT01 | Retención a 3 s (lo prueba el dron) |

Los hooks **HK01, HK01a y HK01b** (misma frase en interior, terraza y patio) no pertenecen a ningún ángulo: son curiosidad pura y sirven para medir qué fondo engancha.

---

## 4. Reglas para que una pieza gane

Salen del formato de Luxur (`recorrido-luxur`, `guion-luxur`) aplicadas a este material. Si alguna choca con lo que se prefiera para una pieza, manda lo que decida el usuario.

1. **El frame 0 es la miniatura**: el mejor espacio y el hook escrito (4-6 palabras), enteros, sin logo y sin Isabella. Los mejores fotogramas de portada de este material, por orden: **el patio** (HK01b, RC08, RC09, RC10), **el revelado del edificio** (DR147, DR152, DR155), **la vista** (RC04, 0-3 s) y **el «501» de la puerta** (RC01). Cada hook trae su texto de portada propuesto: el escrito y el dicho dicen lo mismo.
2. **Una idea, una pieza.** Un hook, uno o dos «mitad», un CTA, un ángulo de §3. Mezclar ángulos diluye el mensaje.
3. **Isabella aparece tres veces, en tres sitios distintos** y en cada uno hace algo propio del espacio (cruzar un umbral, apoyarse en la barandilla). Entre dos tomas suyas va siempre un plano de recorrido o de dron con **disolvencia**; dos Isabella seguidas a corte son un salto de decorado.
4. **El paseo no vuelve atrás** y lleva un sentido. Este material permite dos (§10): *entrada → terraza* o *terraza → ventanal*. No se mezclan en una pieza.
5. **La ficha no se recita.** Los números (317 m², 3.550 millones) pueden estar en la voz porque ES el argumento; áreas, alcobas y administración van en el caption. No repetir el mismo número en más de dos tomas de una pieza.
6. **La obra gris necesita respuesta.** Una pieza que dice «sin terminar» y no responde «¿cuánto cuesta terminarlo?» vende curiosidad, no visitas. Hasta que exista esa toma (§12), se puede decir *qué* se puede cambiar (MD13) pero no *cuánto*.
7. **Honestidad.** La obra gris se ve y se dice. Un interior terminado generado con IA solo si va rotulado («imagen ilustrativa generada con IA»); nada de valorización ni rentabilidad; en lo jurídico, qué exige la norma, nunca qué debe hacer alguien.
8. **Texto en pantalla: editorial, siempre** (se ve sin sonido). El modo `banda` solo si el usuario lo pide.
9. **Duración:** 28-30 s la versión corta (bloques 1-2-3-6), 45-50 s la estándar; la puerta del proyecto exige ≤ 55 s.
10. **Una sola acción en el CTA** y que diga **dónde**: Isabella dice «escríbeme» sin canal, así que el rótulo de cierre tiene que nombrarlo (DM, WhatsApp) o pedir una palabra clave (`banco-cta.md` C01).

---

## 5. Datos técnicos y antes de montar

| | Móvil (HK, MD, CT, RC) | Dron (DR) |
|---|---|---|
| Archivo | MOV, HEVC 10 bit (el formato de un iPhone reciente) | MP4, HEVC |
| Resolución | 3840×2160 con rotación −90° → **vertical 2160×3840** | 3840×2160 con rotación 90° → vertical |
| fps | 29,97 · 29,98 · 30 (mezclados) | 29,97 |
| Color | **HDR HLG** (`arib-std-b67`, BT.2020) | SDR BT.709 |
| Audio | Sí (micro de solapa visible en Isabella) | No |

Antes de contar un fotograma (reglas R19, R21 y R29 del repo):

- **Copiar al disco local** (el SSD es exFAT y externo) a `proyectos/NNN/`, y a `remotion/public/` solo lo que Remotion tenga que ver, **con nombre sin espacios** que lleve el número del proyecto. Dos archivos piden renombrado por su nombre: `Vista  Cocina y Comedor.MOV` (doble espacio) y `Exterior edidficio3.MOV` (errata).
- **Normalizar el HDR (R21):** pasarlo a BT.709 *antes* de meterlo en Remotion o sale gris y lavado. En macOS, la receta es la de `proyectos/016/normalizar.mjs` (`scale_vt` de VideoToolbox; en este ffmpeg hace falta `hwdownload,format=p010le`). Comprobar con un still el cielo de RC04 y los ventanales.
- **30 fps constantes** para todo (las fuentes traen 29,97/29,98/30): una sola composición a 30 fps.
- **De 4K a 1080×1920** sobran píxeles: se puede reencuadrar hasta ≈1,5× (un zoom suave sobre Isabella en los planos generales) sin perder nitidez.
- **Audio de Isabella:** sin tratar, una ganancia por toma hasta la mediana (R29). Los picos van de −6 dB (CT06) a −18 dB (HK01), así que **hay que igualarlos**; el suelo de ruido es limpio en todas (−47 a −61 dB).
- **Colchones:** las tomas empiezan hablando entre 0,2 y 2,3 s después del inicio y acaban entre 0,0 y 2,2 s después de la última palabra (HK02 aparte, que sigue con la sala vacía). Las marcadas «⚠» no admiten disolvencia (entran o salen a corte).

---

## 6. Catálogo · Isabella · HOOKS (carpeta `1 Hooks`)

Doce tomas; por las horas de los archivos, la numeración no sigue el orden de grabación (se grabaron mezcladas con las de Mitad y CTA). Misma ropa en todas: blusa blanca sin mangas con micro de solapa, pantalón negro, tenis blancos.

#### HK01 · `Hook1.MOV` · 7,2 s · voz 0,9–5,0 s

- **Dice:** «Lo más especial de este apartamento está adentro y fuera… ven, te enseño.»
- **Dónde:** `INT-ABIERTO` — Plano general con paneo leve. Isabella al fondo de la sala en obra gris (muro gris con salidas de agua, columna de ladrillo a la derecha, ventanal) camina hacia la cámara gesticulando.
- **Corte sugerido:** 0,54–5,36 s (0,4 s de colchón a cada lado)
- **Tipo de hook:** Curiosidad genérica, sin dolor ni anhelo (no es promesa: el formato pide «promesa o tensión, nunca descripción»). Es el hook más débil del lote; sirve como control.
- **Texto del frame 0 (propuesta):** Dentro y fuera: **Los Patios**
- **Por confirmar al oído:** Las últimas palabras (Whisper: «veinte enseño», confianza 0,12). Por contexto, casi seguro «ven, te enseño»: confirmar al oído.
- **Ojo:** Misma frase en tres lugares (HK01 interior, HK01a terraza, HK01b patio): la única variable es el decorado, ideal para medir qué fondo engancha más.

Subtítulos editoriales (un bloque por línea):

```text
Lo más especial / de este apartamento está / **adentro y fuera.**
ven, te enseño.
```

#### HK01a · `Hook1.1.MOV` · 4,8 s · voz 0,2–4,5 s

- **Dice:** «Lo más especial de este apartamento, está dentro y fuera… ¡ven, te enseño!»
- **Dónde:** `TERRAZA` — Plano general en la esquina de la terraza: columna de concreto, piscina pequeña a la izquierda, rascacielos de Medellín al fondo. Ella viene del fondo hacia la cámara.
- **Corte sugerido:** 0,00–4,77 s (0,4 s de colchón a cada lado) · ⚠ sin colchón al inicio (0,24 s) · ⚠ sin cola (0,31 s)
- **Tipo de hook:** Igual que HK01.
- **Texto del frame 0 (propuesta):** Dentro y fuera: **Los Patios**
- **Por confirmar al oído:** Igual que HK01 (Whisper: «¡Vente enseños!»).
- **Ojo:** Arranca hablando casi de inmediato (0,24 s): no hay colchón para una disolvencia.

Subtítulos editoriales (un bloque por línea):

```text
Lo más especial / de este apartamento está / **dentro y fuera.**
ven, te enseño.
```

#### HK01b · `Hook1.2.MOV` · 4,8 s · voz 0,6–4,4 s

- **Dice:** «Lo más especial de este apartamento está dentro y fuera… ven, te enseño.»
- **Dónde:** `PATIO` — Plano medio-largo en el patio: ladrillo a la izquierda, muro de listones con palma al fondo, piscina pequeña al frente. Camina hacia la cámara hasta plano medio. Luz cálida.
- **Corte sugerido:** 0,16–4,80 s (0,4 s de colchón a cada lado)
- **Tipo de hook:** Igual que HK01.
- **Texto del frame 0 (propuesta):** Dentro y fuera: **Los Patios**
- **Por confirmar al oído:** Igual que HK01.
- **Ojo:** El mejor fondo de los tres para miniatura: techo de madera, ladrillo, palma y agua en un solo cuadro.

Subtítulos editoriales (un bloque por línea):

```text
Lo más especial / de este apartamento está / **dentro y fuera.**
ven, te enseño.
```

#### HK02 · `Hook2+IA.MOV` · 13,2 s · voz 0,5–5,3 s

- **Dice:** «Este apartamento aún no está terminado… y ahí está, precisamente, la oportunidad.»
- **Dónde:** `INT-ABIERTO` — Cámara fija sobre trípode, plano general de la sala vacía (muro gris con salidas de agua, dos varillas en el piso). Habla ≈5 s con gestos; hacia los 5,5 s echa a caminar hacia la cámara, sale de cuadro por la derecha hacia los 9 s y deja ≈3,7 s de la sala VACÍA con la cámara inmóvil.
- **Corte sugerido:** 0,12–5,70 s (0,4 s de colchón a cada lado)
- **Tipo de hook:** Reencuadre de la objeción («sin terminar» → «oportunidad»), cerca de H06 (creencia rota). Es la frase central del ángulo «oportunidad».
- **Texto del frame 0 (propuesta):** Aún sin terminar: **la oportunidad**
- **Ojo:** El sufijo «+IA» del nombre y el plano vacío final sugieren que se pensó para completarlo con una imagen generada. Si se hace, va rotulada («imagen ilustrativa generada con IA»): un interior terminado generado como si fuera el real sería prueba fabricada (regla 7 del repo). Además, el b-roll generativo está caído (xAI sin créditos): comprobar con `grok.py modelos` antes de planificarlo. Plano limpio utilizable: 9,6–13,2 s. El audio después de los 5,3 s son pasos, no palabras.

Subtítulos editoriales (un bloque por línea):

```text
Este apartamento / aún no está / **terminado**
y ahí está, / precisamente, / **la oportunidad.**
```

#### HK03 · `Hook3.MOV` · 6,4 s · voz 0,8–6,0 s

- **Dice:** «Si estás buscando un apartamento totalmente terminado, este probablemente no es para ti.»
- **Dónde:** `INT-BLOQUES` — Plano entero en la sala del muro de bloques de vidrio (ladrillo a la izquierda, ventana al valle a la derecha). Se acerca caminando y al final extiende el brazo hacia la ventana.
- **Corte sugerido:** 0,40–6,40 s (0,4 s de colchón a cada lado)
- **Tipo de hook:** Descarte que selecciona (cerca de H07/H17). Baja el volumen a propósito y sube la calidad de los mensajes; se cierra bien con CT07.
- **Texto del frame 0 (propuesta):** Si buscas terminado, **no es este**
- **Ojo:** Es una frase de filtro: en frío puede espantar a quien no es el comprador, que es justo su función. Whisper dudó entre «terminado»/«determinado» en la pasada sin vocabulario; con vocabulario sale «terminado», que es lo coherente.

Subtítulos editoriales (un bloque por línea):

```text
Si estás buscando / un apartamento / **totalmente terminado,**
este probablemente / no es / **para ti.**
```

#### HK04 · `Hook4.MOV` · 6,0 s · voz 0,7–6,0 s

- **Dice:** «Si quieres diseñar 317 metros alrededor de tu forma de vivir, mira esto.»
- **Dónde:** `INT-ABIERTO` — Plano general muy profundo: camina desde el fondo del espacio abierto hacia la cámara; vigas de concreto, columna de ladrillo en primer plano y ventanales al fondo. La profundidad da la escala de los 317 m².
- **Corte sugerido:** 0,28–5,97 s (0,4 s de colchón a cada lado) · ⚠ sin cola (0,01 s)
- **Tipo de hook:** Anhelo de diseño + cifra (H03/H11). Hay que comprobar que los 317 m² sean el dato que sostiene la pieza (qué área es: construida o privada).
- **Texto del frame 0 (propuesta):** **317 m²** a tu medida
- **Ojo:** Habla hasta el último fotograma: sin cola. Vale como corte a seco, no como disolvencia.

Subtítulos editoriales (un bloque por línea):

```text
Si quieres diseñar / **317 metros**
alrededor de tu / **forma de vivir,** / mira esto.
```

#### HK05 · `Hook5.MOV` · 4,3 s · voz 0,3–3,7 s

- **Dice:** «¿Y si pudieras vivir en altura sin sentir que vives dentro de una torre?»
- **Dónde:** `BARANDA` — Plano medio junto a la barandilla de la terraza (plantas, vista a la ciudad y las montañas). Gesticula y se va alejando hacia la abertura corrediza del fondo.
- **Corte sugerido:** 0,00–4,08 s (0,4 s de colchón a cada lado) · ⚠ sin colchón al inicio (0,26 s)
- **Tipo de hook:** Pregunta de posibilidad con contraste (H06/H15). Se prueba visualmente con los planos de dron de la fachada llena de terrazas verdes (DR147, DR152, DR155).
- **Texto del frame 0 (propuesta):** Vivir en altura, **sin torre**
- **Ojo:** Entra a los 0,26 s: sin colchón. La «y» inicial tiene confianza 0,50: puede que la frase sea «¿Y si…?» (probable) o «Y si…».

Subtítulos editoriales (un bloque por línea):

```text
¿Y si pudieras / vivir en altura
sin sentir que vives / dentro de una / **torre?**
```

#### HK06 · `Hook6.MOV` · 5,5 s · voz 0,6–4,8 s

- **Dice:** «Mira lo que ocurre cuando arquitectura y naturaleza dejan de estar separadas.»
- **Dónde:** `TERRAZA` — La cámara, en la terraza, mira hacia el interior por la corrediza abierta. Isabella empieza al fondo, junto a la ventana del otro extremo, camina hacia la cámara y cruza el umbral hasta plano medio-corto. Ilustra literalmente la frase: interior y exterior sin frontera.
- **Corte sugerido:** 0,20–5,18 s (0,4 s de colchón a cada lado)
- **Tipo de hook:** Curiosidad con prueba visual (cerca de H13). Funciona porque el gesto (cruzar el umbral) ES el argumento.
- **Texto del frame 0 (propuesta):** Arquitectura y **naturaleza**, sin frontera
- **Por confirmar al oído:** «Mira» sale como «Mirá» (voseo paisa, confianza 0,28); subtitular «Mira» salvo que ella lo diga con voseo a propósito.
- **Ojo:** Se encadena con RC06 y RC11 (ambos cruzan ese mismo umbral).

Subtítulos editoriales (un bloque por línea):

```text
Mira lo que ocurre / cuando arquitectura / y naturaleza
dejan de estar / **separadas.**
```

#### HK07 · `Hook7.MOV` · 6,1 s · voz 0,9–5,1 s

- **Dice:** «El verdadero lujo puede ser simplemente tener espacio para respirar.»
- **Dónde:** `PATIO` — Plano entero, simétrico y fijo, en el patio: muro de listones con palma, plantas y la piscina pequeña al frente. Casi quieta, manos juntas; da un paso a un lado en la cola.
- **Corte sugerido:** 0,54–5,48 s (0,4 s de colchón a cada lado)
- **Tipo de hook:** Valor/identidad (cerca de H04). Frase de marca: sirve para cualquier propiedad, no ata la pieza a esta.
- **Texto del frame 0 (propuesta):** El lujo es **respirar**
- **Ojo:** Composición perfecta para texto arriba (cielo de listones) y para velo suave.

Subtítulos editoriales (un bloque por línea):

```text
El verdadero lujo / puede ser simplemente
tener espacio para / **respirar.**
```

#### HK08 · `Hook8.MOV` · 6,6 s · voz 1,5–6,4 s

- **Dice:** «3.550 millones. Ahora veamos realmente qué estás comprando.»
- **Dónde:** `ENTRADA` — Dentro del apartamento, la puerta negra (la del 501) se abre y Isabella entra caminando hacia la cámara hasta un plano medio corto, con ventana a contraluz. Los primeros 1,5 s son solo la puerta.
- **Corte sugerido:** 1,10–6,63 s (0,4 s de colchón a cada lado) · ⚠ sin cola (0,21 s)
- **Tipo de hook:** Precio desnudo + giro (H09 + H07). El precio abre y la pregunta lo justifica.
- **Texto del frame 0 (propuesta):** **3.550 millones.** ¿Qué compras?
- **Por confirmar al oído:** La cifra (Whisper: «3550 millones», confianza 0,36–0,44); coincide con CT02/CT03.
- **Ojo:** Si el hook ya dice el precio, el CTA no debería repetirlo (CT02 y CT03 sí): usar CT05, CT06 o CT07. Moneda no dicha (se asume COP).

Subtítulos editoriales (un bloque por línea):

```text
**3.550 millones.**
Ahora veamos realmente / qué estás / **comprando.**
```

#### HK09 · `Hook9.MOV` · 4,6 s · voz 0,9–4,1 s

- **Dice:** «Esta propiedad tiene sentido para un comprador muy específico.»
- **Dónde:** `INT-VENTANAL` — Plano entero junto al ventanal (columna de ladrillo, varilla verde en el piso). Quieta, manos juntas, gestos abiertos.
- **Corte sugerido:** 0,54–4,50 s (0,4 s de colchón a cada lado)
- **Tipo de hook:** Selección de comprador (H17/H18). Pareja natural de HK03 y de CT07.
- **Texto del frame 0 (propuesta):** Para un comprador **muy específico**
- **Ojo:** Tranquila y estática: poca energía para los 3 primeros segundos. Mejor con un plano de apertura potente antes.

Subtítulos editoriales (un bloque por línea):

```text
Esta propiedad tiene sentido / para un comprador / **muy específico.**
```

#### HK10 · `Hook10.MOV` · 5,7 s · voz 0,8–4,1 s

- **Dice:** «No necesito convencerte de los patios si llegaste hasta aquí.»
- **Dónde:** `TERRAZA` — Terraza, esquina con columna de concreto: piscina pequeña con escalones a la izquierda y el skyline de Medellín. Camina hacia la cámara en plano entero.
- **Corte sugerido:** 0,42–4,54 s (0,4 s de colchón a cada lado)
- **Tipo de hook:** Autoridad tranquila. Presupone que el espectador «ya llegó hasta aquí»: en frío suena raro; funciona mejor como hook de parte 2, de serie o para quien ya vio un recorrido.
- **Texto del frame 0 (propuesta):** No hace falta **convencerte**
- **Ojo:** La voz acaba a los 4,1 s y quedan 1,6 s de cola (hay un ruido breve a los 5,5 s: recortar).

Subtítulos editoriales (un bloque por línea):

```text
No necesito convencerte de / **los patios**
si llegaste hasta aquí.
```

---

## 7. Catálogo · Isabella · MITAD (carpeta `2 Mitad`)

Quince tomas. **Ninguna es una objeción al uso** («sé lo que estás pensando…»): son tesis, valor y respuesta a la objeción de la obra gris. Casi todas están en la terraza: sirven de bloque 4 para una pieza cuyo paseo acaba en la terraza, o como **voz en off** sobre otras imágenes (bloque 5).

#### MD01 · `Medio1.MOV` · 7,9 s · voz 1,2–7,1 s

- **Dice:** «Los patios y vacíos hacen desaparecer esa frontera entre interior, paisaje y arquitectura.»
- **Dónde:** `BARANDA` — Plano entero en el borde de la terraza, vegetación y cielo con nubes detrás. Extiende el brazo hacia el paisaje al decir «frontera».
- **Corte sugerido:** 0,84–7,52 s (0,4 s de colchón a cada lado)
- **Papel en la pieza:** Tesis de diseño: la arquitectura borra el límite entre dentro y fuera (acompaña a HK06).
- **Por confirmar al oído:** «patios y vacíos» (Whisper: «partidos ibasíos» en la primera pasada); «entre interior» (confianza 0,25).
- **Ojo:** Las dos versiones (MD01 y MD01a) dicen casi lo mismo con un final distinto: elegir una por pieza.

Subtítulos editoriales (un bloque por línea):

```text
Los patios y vacíos / hacen desaparecer esa / **frontera**
entre interior, / paisaje y / **arquitectura.**
```

#### MD01a · `Medio1.1.MOV` · 8,0 s · voz 1,4–7,0 s

- **Dice:** «Los patios y vacíos hacen desaparecer esa frontera entre paisaje, vegetación y espacio.»
- **Dónde:** `TERRAZA` — Terraza con la piscina pequeña en primer plano (abajo a la izquierda), muro de ladrillo y techo de madera. Ella, al fondo, camina hacia la cámara.
- **Corte sugerido:** 0,96–7,42 s (0,4 s de colchón a cada lado)
- **Papel en la pieza:** Igual que MD01, con la piscina como protagonista visual.
- **Por confirmar al oído:** Igual que MD01.
- **Ojo:** Termina con una pausa de 0,4 s a los 4 s (respiración): buen punto para un corte interno.

Subtítulos editoriales (un bloque por línea):

```text
Los patios y vacíos / hacen desaparecer esa / **frontera**
entre paisaje, / vegetación y / **espacio.**
```

#### MD02 · `Medio2.MOV` · 6,9 s · voz 0,3–5,8 s

- **Dice:** «La arquitectura ya está resuelta. El interior puede reflejar completamente tu personalidad.»
- **Dónde:** `TERRAZA` — Desde la terraza, frente al muro de ladrillo con la abertura corrediza: ella sale del interior y llega al umbral con las manos juntas.
- **Corte sugerido:** 0,00–6,18 s (0,4 s de colchón a cada lado) · ⚠ sin colchón al inicio (0,34 s)
- **Papel en la pieza:** Núcleo del ángulo «oportunidad»: la parte difícil ya está hecha; lo que falta es tuyo.
- **Ojo:** Entra a los 0,34 s: sin colchón para disolvencia. La segunda frase se repite casi igual en MD12 (otro lugar, otra toma).

Subtítulos editoriales (un bloque por línea):

```text
La arquitectura / ya está / **resuelta.**
El interior puede reflejar / completamente tu / **personalidad.**
```

#### MD03 · `Medio3.MOV` · 5,5 s · voz 0,4–4,4 s

- **Dice:** «Una piscina privada en altura es interesante, pero no es lo mejor de este proyecto.»
- **Dónde:** `PATIO` — Patio: piscina pequeña al frente, muro de listones con palma al fondo. Ella, detrás del agua, habla gesticulando y avanza un poco.
- **Corte sugerido:** 0,00–4,82 s (0,4 s de colchón a cada lado)
- **Papel en la pieza:** Giro contraintuitivo: resta valor a lo obvio (la piscina) para subir lo importante (MD04). Pareja de MD04.
- **Por confirmar al oído:** Whisper escribe «cocina» (confianza 0,20) en las dos pasadas. En pantalla Isabella está junto a la piscina pequeña y «una cocina privada en altura» no tendría sentido: casi seguro es «piscina». CONFIRMAR AL OÍDO antes de subtitular.
- **Ojo:** Lenguaje: no llamar «piscina/jacuzzi» a ese elemento en un rótulo hasta confirmar qué es (en varias tomas se ve el fondo de baldosa y el desagüe).

Subtítulos editoriales (un bloque por línea):

```text
Una piscina privada / en altura es interesante,
pero no es / **lo mejor** / de este proyecto.
```

#### MD04 · `Medio4.MOV` · 6,5 s · voz 0,6–5,9 s

- **Dice:** «Lo excepcional es cómo ALH integró agua, vegetación, patios y arquitectura.»
- **Dónde:** `TERRAZA` — Plano general desde la esquina de la terraza: la piscina con escalones en primer plano; ella aparece pequeña junto a la corrediza y casi no se mueve.
- **Corte sugerido:** 0,22–6,34 s (0,4 s de colchón a cada lado)
- **Papel en la pieza:** Credibilidad de autor (ALH) y definición de lo excepcional. Sigue a MD03.
- **Por confirmar al oído:** «integró» (confianza 0,30); «ALH» (nombre del estudio de arquitectura: confirmar nombre completo y que se pueda mencionar).
- **Ojo:** Ella queda muy pequeña en cuadro: funciona mejor como voz sobre otra imagen (plano de patio o dron) que con ella a la vista.

Subtítulos editoriales (un bloque por línea):

```text
Lo excepcional es / cómo ALH integró / **agua, vegetación,**
patios y arquitectura.
```

#### MD05 · `Medio5.MOV` · 5,2 s · voz 1,1–5,2 s

- **Dice:** «Hay lujo que se muestra y hay otro que simplemente se siente.»
- **Dónde:** `BARANDA` — Pasarela de la terraza junto a la barandilla con plantas, ladrillo y corrediza abierta al fondo. Camina hacia la cámara con gesto abierto.
- **Corte sugerido:** 0,74–5,23 s (0,4 s de colchón a cada lado) · ⚠ sin cola (0,03 s)
- **Papel en la pieza:** Cierre emocional/sensorial. Pareja de HK07 («el verdadero lujo»).
- **Por confirmar al oído:** Whisper: «Hay luego que se muestra…» (confianza 0,46/0,55). Por el contexto (HK07 habla de «lujo») es «lujo»: confirmar al oído.
- **Ojo:** La voz llega hasta el último fotograma (0,03 s de cola): corte a seco.

Subtítulos editoriales (un bloque por línea):

```text
Hay lujo que se muestra
y hay otro que / simplemente / **se siente.**
```

#### MD06 · `Medio6.MOV` · 7,9 s · voz 1,3–7,3 s

- **Dice:** «Diferentes materiales, combinados con vegetación y agua, construyen una experiencia, no solamente decoración.»
- **Dónde:** `TERRAZA` — Terraza amplia con techo de madera y muro de ladrillo. Sale de la corrediza del fondo y camina hasta plano general.
- **Corte sugerido:** 0,94–7,74 s (0,4 s de colchón a cada lado)
- **Papel en la pieza:** Materiales como experiencia. Su audio (y el de RC06) cuadra bajo planos de ladrillo, madera, vidrio y vegetación.
- **Por confirmar al oído:** «Diferentes materiales» (confianza 0,11–0,30).
- **Ojo:** Hay un chasquido de arranque a los 0,2 s y la voz real empieza a 1,34 s: recortar el inicio.

Subtítulos editoriales (un bloque por línea):

```text
Diferentes materiales, / combinados con / vegetación y agua,
construyen / una experiencia, / **no solamente decoración.**
```

#### MD07 · `Medio7.MOV` · 6,1 s · voz 0,7–5,5 s

- **Dice:** «La respuesta no siempre está en los metros, a veces está en cómo entra el exterior.»
- **Dónde:** `TERRAZA` — Esquina de la terraza: columna de concreto, muro de listones y vegetación. Camina hacia la cámara con los brazos abiertos.
- **Corte sugerido:** 0,30–5,92 s (0,4 s de colchón a cada lado)
- **Papel en la pieza:** Responde a la objeción «¿y los metros?»: el argumento es la relación con el exterior.
- **Ojo:** Frase de 16 palabras en 4,8 s: ritmo alto (≈3,3 palabras/s). Los subtítulos tienen que ir rápidos; revisar el tope de 2,5 palabras/s del formato.

Subtítulos editoriales (un bloque por línea):

```text
La respuesta no siempre / está en los metros,
a veces está en / cómo entra / **el exterior.**
```

#### MD08 · `Medio8.MOV` · 5,2 s · voz 0,8–4,8 s

- **Dice:** «La doble altura permite que la luz y ventilación ingresen a la vivienda.»
- **Dónde:** `TERRAZA` — La misma terraza de MD06, más cerca de la abertura; el techo de madera muestra la doble altura. Camina hacia la cámara.
- **Corte sugerido:** 0,38–5,20 s (0,4 s de colchón a cada lado)
- **Papel en la pieza:** Dato técnico convertido en beneficio (luz y aire).
- **Por confirmar al oído:** Whisper omite el segundo «la» (¿«la luz y la ventilación»?).
- **Ojo:** Combina con planos donde se vea el techo de madera alto (RC08, RC10, DR163).

Subtítulos editoriales (un bloque por línea):

```text
La doble altura / permite que / **la luz**
y ventilación ingresen / a la vivienda.
```

#### MD09 · `Medio9.MOV` · 5,3 s · voz 0,6–4,7 s

- **Dice:** «Tienes 317 metros para desarrollar completamente el interior.»
- **Dónde:** `INT-ABIERTO` — Interior junto al ventanal de la terraza: tubería amarilla en el techo y columna de ladrillo. Camina hacia la cámara.
- **Corte sugerido:** 0,16–5,08 s (0,4 s de colchón a cada lado)
- **Papel en la pieza:** La promesa de lienzo: el espacio ES la oferta. Pareja de HK04 (317 m).
- **Ojo:** Repite el «317» de HK04, MD10 y CT02: no encadenar más de dos en la misma pieza.

Subtítulos editoriales (un bloque por línea):

```text
Tienes / **317 metros**
para desarrollar / completamente / **el interior.**
```

#### MD10 · `Medio10.MOV` · 9,0 s · voz 2,3–8,2 s

- **Dice:** «317 metros cuadrados diseñados por ALH y entregados en obra gris.»
- **Dónde:** `ENTRADA` — Puerta roja de ascensor con el «5» encima, muros de ladrillo y piso de baldosa oscura. Se abre y ella sale hacia la cámara hasta un plano medio. La puerta se abre mientras empieza a hablar (voz a los 2,3 s).
- **Corte sugerido:** 1,88–8,58 s (0,4 s de colchón a cada lado)
- **Papel en la pieza:** La ficha hablada: metros, autor y estado. Es el único clip con el ascensor.
- **Por confirmar al oído:** Whisper sin vocabulario: «Noura Gris» (confianza 0,11); con vocabulario, «obra gris».
- **Ojo:** Es la entrada física al apartamento: si se usa después del recorrido interior, la pieza «vuelve atrás». Mejor al principio del paseo o aislado. Sin confirmar que sea ascensor privado ni a qué piso corresponde el «5».

Subtítulos editoriales (un bloque por línea):

```text
**317 metros cuadrados,**
diseñados por ALH y / entregados en / **obra gris.**
```

#### MD11 · `Medio11.MOV` · 5,3 s · voz 1,0–5,2 s

- **Dice:** «¿(Eres) alguien que valora la arquitectura y prefiere crear sus propios acabados?»
- **Dónde:** `INT-ABIERTO` — Hall interior (columna de ladrillo, vigas) con la terraza al fondo. Camina hacia la cámara.
- **Corte sugerido:** 0,60–5,27 s (0,4 s de colchón a cada lado) · ⚠ sin cola (0,11 s)
- **Papel en la pieza:** Pregunta que selecciona al comprador (perfil: el que valora arquitectura y quiere definir sus acabados). Pareja de HK03/HK09 y de CT07.
- **Por confirmar al oído:** El arranque: Whisper escribe «¿Alguien que valora el arquitectura…» (confianza 0,31). Puede faltar «eres» o ser «Ideal para alguien…». Confirmar al oído.
- **Ojo:** Hay un chasquido a los 0,06 s y la voz empieza a 1,0 s. Termina casi sin cola (0,11 s).

Subtítulos editoriales (un bloque por línea):

```text
¿Alguien que valora / **la arquitectura**
y prefiere crear / sus propios / **acabados?**
```

#### MD12 · `Medio12.MOV` · 4,4 s · voz 0,7–3,9 s

- **Dice:** «El interior puede llevar completamente tu personalidad.»
- **Dónde:** `TERRAZA` — Terraza: camina desde la abertura corrediza hacia la cámara y acaba en plano medio sonriendo.
- **Corte sugerido:** 0,26–4,28 s (0,4 s de colchón a cada lado)
- **Papel en la pieza:** Frase corta de personalización con buena energía de cierre. Repite la segunda mitad de MD02.
- **Ojo:** Whisper oyó «llevar» con buena confianza (en MD02 la misma idea sale como «reflejar»): son dos frases distintas, no un error. Con 3,2 s de voz es la más corta de la mitad: vale como remate dentro de otro bloque.

Subtítulos editoriales (un bloque por línea):

```text
El interior puede llevar / completamente / **tu personalidad.**
```

#### MD13 · `Medio13.MOV` · 6,6 s · voz 0,6–5,7 s

- **Dice:** «(Los) materiales se pueden cambiar, pero proporciones, altura y arquitectura, no.»
- **Dónde:** `TERRAZA` — Terraza frente al muro de ladrillo y la ventana: cruza el cuadro de izquierda a derecha con la piscina detrás.
- **Corte sugerido:** 0,24–6,06 s (0,4 s de colchón a cada lado)
- **Papel en la pieza:** Cierra la objeción de la obra gris con un criterio: lo que no se puede cambiar ya es excelente. La frase más persuasiva del lote.
- **Por confirmar al oído:** El arranque (¿«Los materiales…»?): primera palabra con confianza 0,41.
- **Ojo:** Pausa de 0,4 s a los 2,3 s: corte interno limpio.

Subtítulos editoriales (un bloque por línea):

```text
Materiales / se pueden cambiar,
pero proporciones, / altura y arquitectura, / **no.**
```

#### MD14 · `Medio14.MOV` · 6,5 s · voz 0,6–5,7 s

- **Dice:** «No estás viendo un apartamento sin terminar, estás viendo uno que todavía puedes definir.»
- **Dónde:** `PATIO` — Patio/terraza con muro de listones y palma; camina hacia la cámara. A partir de ≈5 s la cámara retrocede hacia el interior (aparece el techo de concreto): sirve de salida hacia dentro.
- **Corte sugerido:** 0,16–6,14 s (0,4 s de colchón a cada lado)
- **Papel en la pieza:** Reencuadre final y la mejor frase de cierre de la objeción (pareja de HK02).
- **Ojo:** Las dos mitades (negar / afirmar) piden dos bloques de subtítulos bien separados.

Subtítulos editoriales (un bloque por línea):

```text
No estás viendo / un apartamento / sin terminar,
estás viendo uno / que todavía puedes / **definir.**
```

---

## 8. Catálogo · Isabella · CTA (carpeta `5 Cta`)

Siete tomas. Todas piden **escribir** (ninguna dice dónde): cambia el matiz (dato, autor, visita, filtro). Dan el precio CT02 y CT03; el resto, no.

#### CT01 · `CTA1.MOV` · 6,1 s · voz 0,6–5,3 s

- **Dice:** «Si buscas algo diferente (a) un apartamento convencional, escríbeme y conoce Los Patios.»
- **Dónde:** `BALCON` — Balcón en esquina del ventanal con barandilla y valle verde detrás. Entra por la izquierda y queda en plano medio con las manos juntas.
- **Corte sugerido:** 0,22–5,74 s (0,4 s de colchón a cada lado)
- **Acción que pide:** Escribir (canal sin concretar) + nombra el edificio. · mide: Mensajes
- **Por confirmar al oído:** «a»/«en» (Whisper: «en»). La grabación empieza con un chasquido a los 0,1 s; la voz real, a los 0,62 s.
- **Ojo:** «Escríbeme» no dice dónde: el rótulo en pantalla tiene que decir el canal (DM, WhatsApp).

Subtítulos editoriales (un bloque por línea):

```text
Si buscas algo diferente / a un apartamento / convencional,
**escríbeme** / y conoce Los Patios.
```

#### CT02 · `CTA2.MOV` · 8,0 s · voz 0,6–7,5 s

- **Dice:** «317 metros cuadrados en obra gris por 3.550 millones, escríbeme y ven a conocerlo.»
- **Dónde:** `BALCON` — Apoyada con una mano en la barandilla del ventanal; montañas y edificios de ladrillo detrás. Plano medio-americano, relajada.
- **Corte sugerido:** 0,24–7,90 s (0,4 s de colchón a cada lado)
- **Acción que pide:** Escribir + datos clave (área, estado, precio). · mide: Mensajes (calificados por el precio)
- **Por confirmar al oído:** Cifra y «obra» (Whisper: confianza 0,41–0,49).
- **Ojo:** La mejor toma de «recompensa» del material: lleva la acción propia del espacio que pide el formato (apoyarse en la barandilla) y la vista. Da el precio: no usar con HK08.

Subtítulos editoriales (un bloque por línea):

```text
317 metros cuadrados / en obra gris / por 3.550 millones.
**escríbeme** / y ven a conocerlo.
```

#### CT03 · `CTA3.MOV` · 6,0 s · voz 0,6–5,7 s

- **Dice:** «Está disponible por 3.550 millones, escríbeme y ven a conocerlo.»
- **Dónde:** `PATIO` — Patio, plano medio frontal y estático; muro de listones y palma detrás. Hablando, manos juntas.
- **Corte sugerido:** 0,20–6,00 s (0,4 s de colchón a cada lado) · ⚠ sin cola (0,32 s)
- **Acción que pide:** Escribir + precio. · mide: Mensajes
- **Por confirmar al oído:** Cifra (confianza 0,12–0,43).
- **Ojo:** Cola de 0,32 s (corta). Para el mismo mensaje con más energía de imagen, CT02 (barandilla).

Subtítulos editoriales (un bloque por línea):

```text
Está disponible / por 3.550 millones.
**escríbeme** / y ven a conocerlo.
```

#### CT04 · `CTA4.MOV` · 5,5 s · voz 0,4–4,9 s

- **Dice:** «Los Patios, arquitectura de ALH, escríbeme para conocer esta unidad.»
- **Dónde:** `PATIO` — Junto a la piscina pequeña: arranca con un helecho en primer plano (foco en la planta) y ella entra en foco caminando hacia la cámara en plano entero.
- **Corte sugerido:** 0,04–5,26 s (0,4 s de colchón a cada lado)
- **Acción que pide:** Escribir (sin precio) + autor. · mide: Mensajes
- **Ojo:** El helecho del arranque hace de cortinilla natural: no necesita disolvencia. Voz con pico alto (−8 dB): igualar en la mezcla.

Subtítulos editoriales (un bloque por línea):

```text
Los Patios, / arquitectura de ALH.
**escríbeme** / para conocer esta unidad.
```

#### CT05 · `CTA5.MOV` · 3,6 s · voz 0,7–3,1 s

- **Dice:** «Si encaja con lo que estás buscando, escríbeme.»
- **Dónde:** `INT-BLOQUES` — Primer plano medio-corto contra ladrillo y bloques de vidrio; la toma más íntima del lote. Sonríe al final.
- **Corte sugerido:** 0,30–3,50 s (0,4 s de colchón a cada lado)
- **Acción que pide:** Escribir. Una acción, sin dato. · mide: Mensajes
- **Por confirmar al oído:** «escríbeme» (Whisper: «escribe a mí», confianza 0,30).
- **Ojo:** Es la más corta (3,6 s). Solo 8 palabras: el CTA más limpio.

Subtítulos editoriales (un bloque por línea):

```text
Si encaja con / lo que estás buscando,
**escríbeme.**
```

#### CT06 · `CTA6.MOV` · 4,5 s · voz 0,9–3,7 s

- **Dice:** «Si es el reto, escríbeme y agendamos una visita.»
- **Dónde:** `INT-ABIERTO` — Camina hacia la cámara desde el fondo del espacio abierto, y la cámara retrocede cruzando el umbral hasta dejarla en el deck de la terraza (los últimos fotogramas muestran el dintel de ladrillo).
- **Corte sugerido:** 0,46–4,08 s (0,4 s de colchón a cada lado)
- **Acción que pide:** Escribir + agendar visita (dos pasos). · mide: Mensajes / visitas
- **Por confirmar al oído:** «Si es el reto»: Whisper escribe «Si es el resto» (confianza 0,16–0,37) y «agendamos» (0,04). Por contexto «reto» es lo más probable. CONFIRMAR AL OÍDO.
- **Ojo:** Pide «agendar una visita»: asegurarse de que Luxur puede agendar. Pico de audio −6 dB, el más alto: bajar ganancia.

Subtítulos editoriales (un bloque por línea):

```text
Si es el reto,
**escríbeme** / y agendamos una visita.
```

#### CT07 · `CTA7.MOV` · 7,1 s · voz 0,7–7,0 s

- **Dice:** «Necesitas saber si esta unidad en específico funciona para ti. Si es así, escríbeme y la recorremos juntos.»
- **Dónde:** `TERRAZA` — Terraza frente al muro de ladrillo y la corrediza: viene del fondo y termina en plano medio con gesto.
- **Corte sugerido:** 0,26–7,11 s (0,4 s de colchón a cada lado) · ⚠ sin cola (0,11 s)
- **Acción que pide:** Escribir + visita guiada. · mide: Mensajes de calidad
- **Confirmado (rev. 8, 2026-10-03):** la palabra es «unidad», no «línea»: whisper la oía «línea» con confianza 0,06 (y «noidad» en otro corte).
- **Ojo:** Con 18 palabras en 6,3 s (≈2,8 pal/s) es la más densa. Cierra con coherencia piezas de filtro (HK03, HK09, MD11). Cola de 0,11 s: sin disolvencia.

Subtítulos editoriales (un bloque por línea):

```text
Necesitas saber / si esta unidad en específico / funciona para ti.
Si es así, / **escríbeme** / y la recorremos juntos.
```

---

## 9. Catálogo · Recorrido y dron (sin voz de Isabella)

Valoración: ★★★ imprescindible · ★★ útil · ★ relleno. Los «segundos» son aproximados (salen de tiras de 8-12 fotogramas): confirmar en el montaje.

### 9.1 Recorrido del apartamento (en el orden del paseo desde la puerta)

#### RC01 · `Recorrido Abre puerta.MOV` · 17,9 s · ★★★

- **Qué se ve:** 0–3 s: puerta negra de madera con el «501» en metal sobre ladrillo. 3–9 s: primerísimos planos de la hoja y la manija mientras se abre (no se ve ninguna mano). 10–13 s: pasillo de ladrillo con el borde de la hoja a la derecha y, al fondo, el muro de bloques de vidrio. 14–17,9 s: se abre la sala hasta el ventanal.
- **Movimiento:** Cámara pegada a la puerta; entra y avanza recto. Lento.
- **Uso:** Bloque 3, umbral («llegar a casa»). Recortar a ≈7 s (p. ej. 0–2 s + 10–15 s). El «501» es el único dato que ubica la unidad.
- **Ojo:** Golpes de puerta en el audio (6,4–10,5 s): silenciar bajo la música.

#### RC02 · `Entrada apto y Sala.MOV` · 14,2 s · ★★★

- **Qué se ve:** 0–7 s: pasillo estrecho de ladrillo avanzando hacia el muro de bloques de vidrio que se agranda. 7–14 s: giro suave a la derecha y se abre la sala: ladrillo, vigas, bloques de vidrio y ventanal con tubería amarilla en el techo.
- **Movimiento:** Avance recto y giro suave a la derecha.
- **Uso:** Bloque 3: umbral → sala. Alternativa limpia (sin la puerta) a RC01.

#### RC03 · `Sala.MOV` · 9,0 s · ★★☆

- **Qué se ve:** 0–4,5 s: de pie frente al ventanal (tubería amarilla en el techo, ladrillo, luz en el piso). 4,5–9 s: giro a la izquierda hacia el muro de bloques de vidrio, con la luz atravesándolo.
- **Movimiento:** Giro a la izquierda de ≈90°; cámara casi fija.
- **Uso:** Detalle de la sala. El muro de bloques de vidrio es la firma visual del interior.
- **Ojo:** Giro a la izquierda: encadenar con planos que también giren a la izquierda.

#### RC04 · `Vista ventana y Sala.MOV` · 9,5 s · ★★★

- **Qué se ve:** 0–3 s: la vista desde el ventanal: valle, montañas, cielo con nubes, edificios de ladrillo y copas de árboles. 3–6 s: baja por el marco hasta la esquina interior. 6–9,5 s: se aleja de la ventana y recorre la sala con ladrillo y bloques de vidrio al fondo.
- **Movimiento:** Inclinación de la vista hacia el interior y avance.
- **Uso:** El mejor cielo del material. Para respetar «la vista al final», usar solo 0–3 s cerca del cierre o invertir el orden en el montaje.
- **Ojo:** Vigilar el cielo (HDR HLG): comprobar con un still que no quede quemado tras el tone-map.

#### RC05 · `Cocina.MOV` · 7,5 s · ★★☆

- **Qué se ve:** Espacio largo y abierto: muro de ladrillo a la izquierda, vigas de concreto y ventanales al fondo. Últimos 3 s: columnas y la corrediza hacia la terraza a la izquierda.
- **Movimiento:** Avance recto lento con leve cabeceo.
- **Uso:** Bloque 3: espacio social. El nombre del archivo es la zona prevista; en obra gris no hay cocina construida.
- **Ojo:** No rotular «cocina» en pantalla.

#### RC06 · `Cocina y Comedor.MOV` · 9,2 s · ★★★

- **Qué se ve:** Desde la terraza, mirando el muro de ladrillo y su abertura con la corrediza: la cámara cruza el umbral (del deck de madera al concreto) y entra al espacio abierto, con vigas, columnas y ventanal al fondo.
- **Movimiento:** Avance recto con leve inclinación hacia arriba; sentido terraza → interior.
- **Uso:** Transición exterior → interior (la «frontera que desaparece» de HK06/MD01). Su sentido es el inverso al paseo desde la puerta.
- **Ojo:** TRAE VOZ DE ISABELLA FUERA DE CUADRO (continua, 0–9,2 s): «…vegetación y agua, construyendo una experiencia, no solamente una decoración. Ladrillo, concreto, madera, vidrio, vegetación.» Empieza a media frase. O se silencia o se aprovecha la enumeración «ladrillo, concreto, madera, vidrio, vegetación» (6,1–9,2 s) como voz bajo planos de esos materiales.

#### RC07 · `Vista  Cocina y Comedor.MOV` · 11,4 s · ★★☆

- **Qué se ve:** 0–5 s: junto al ventanal de esquina, vista al valle (edificios de ladrillo, uno con detalles magenta) y la barandilla. 5–11,4 s: se desliza a la derecha y entra al espacio abierto: dos varillas (verde y amarilla) en el piso, muro de ladrillo y concreto al fondo, puertas.
- **Movimiento:** Desplazamiento lateral a la derecha y avance.
- **Uso:** Puente de la vista a la zona social (entre RC04 y RC05).
- **Ojo:** El archivo se llama con DOS espacios («Vista  Cocina…»): renombrar al copiar.

#### RC08 · `Patio y Naturaleza.MOV` · 10,2 s · ★★★

- **Qué se ve:** 0–4 s: tapiz de hojas y barandilla negra, edificios al fondo. 4–6 s: se abre la pasarela del deck con la columna y el muro de listones. 6–10 s: llega al patio: ladrillo, techo de madera, palma, piscina pequeña y la corrediza.
- **Movimiento:** Avance por la pasarela que se abre a plano amplio.
- **Uso:** Bloque 5: de «naturaleza» al patio. Mismo patio de HK07, HK01b, MD03, CT03 y CT04.

#### RC09 · `Patio y Naturaleza 2.MOV` · 13,5 s · ★★★

- **Qué se ve:** Inverso del anterior. 0–6 s: patio con muro de ladrillo, corrediza y piscina pequeña. 6–8 s: pasa la columna. 8–13,5 s: se hunde en las plantas de la barandilla y acaba entre hojas.
- **Movimiento:** Avance del patio hacia la barandilla; termina tapado por hojas.
- **Uso:** Cierre o cambio de escena: las hojas finales sirven de cortinilla natural.

#### RC10 · `Patio y Piscina.MOV` · 11,9 s · ★★★

- **Qué se ve:** 0–4 s: deck frente al muro de ladrillo con la corrediza abierta. 4–8 s: giro a la derecha: la piscina pequeña con escalones y el muro de listones con palma. 8–11,9 s: columna de concreto, barandilla con jardín y skyline.
- **Movimiento:** Paneo/avance hacia la derecha.
- **Uso:** Plano de «recompensa» del bloque 5 (patio + vista).
- **Ojo:** La piscina se ve sin agua.

#### RC11 · `Piscina y Patio.MOV` · 14,7 s · ★★★

- **Qué se ve:** 0–5 s: la piscina pequeña (fondo de baldosa, escalones, desagüe) con el muro de listones y la vegetación. 5–9 s: la columna y el cielo con edificios. 9–14,7 s: gira hacia el muro de ladrillo y entra por la corrediza al interior.
- **Movimiento:** Paneo a la izquierda y avance hacia la corrediza.
- **Uso:** Puente terraza → interior (contrapunto de RC06). Cierra bien un bloque exterior.
- **Ojo:** La piscina se ve sin agua.

#### RC12 · `Habitacion Principal.MOV` · 10,7 s · ★☆☆

- **Qué se ve:** 0–3 s: ventana con el deck y la piscina al otro lado. 3–7 s: muro de ladrillo con tomas eléctricas y salidas. 7–10,7 s: esquina con ventanal grande hacia jardineras.
- **Movimiento:** Avance lento con paneo a la derecha.
- **Uso:** Alcoba: luz y verde, pero obra gris cruda. Solo en piezas que cuenten «tu lienzo».
- **Ojo:** Sin confirmar qué alcoba es cuál: nombre de archivo.

#### RC13 · `Habitacion Principal 2.MOV` · 15,4 s · ★★☆

- **Qué se ve:** 0–4 s: desde los escalones del deck mira una puerta de vidrio hacia la alcoba. 4–9 s: cruza la puerta y recorre un espacio de concreto con ventana al fondo. 9–15,4 s: se acerca al ventanal esquinero con jardineras al otro lado.
- **Movimiento:** Avance recto, cruza el umbral.
- **Uso:** Sugiere que la alcoba principal abre a la terraza (verificar con la planta).

#### RC14 · `Habitacion Secundaria.MOV` · 19,1 s · ★☆☆

- **Qué se ve:** Cuarto de concreto y ladrillo con puerta-ventana a un balcón con barandilla (0–9 s); gira hacia un muro con salidas de agua en cobre (probable baño) y una ventana alta con tubería amarilla (9–19 s).
- **Movimiento:** Avance lento con paneos.
- **Uso:** Relleno. Solo para piezas que enseñen la obra gris sin filtro.

#### RC15 · `Estudio y Baño.MOV` · 16,2 s · ★☆☆

- **Qué se ve:** Circulaciones estrechas entre muros de concreto y ladrillo con una ventana con persiana al fondo (0–9 s); esquina con ventana alta y tubería amarilla (9–16 s).
- **Movimiento:** Avance lento con giros.
- **Uso:** Relleno; confirmar que hay estudio y baño.
- **Ojo:** No confirmo qué espacio es cuál: es el nombre del archivo.

#### RC16 · `Recorrido Caminando.MOV` · 30,1 s · ★★★

- **Qué se ve:** Plano continuo siguiéndola, CON ISABELLA EN CUADRO. 0–4 s: en el deck de la terraza (techo de madera, ladrillo, vegetación), hablando y girando. 4–9 s: entra por la abertura al espacio abierto. 9–17 s: lo cruza de espaldas (columna de ladrillo, vigas). 17–20 s: pasa por el pasillo de ladrillo junto al muro de bloques de vidrio. 20–24 s: llega a la esquina del ventanal. 24–30 s: se asoma y se apoya en la barandilla mirando el valle.
- **Movimiento:** Seguimiento continuo desde atrás, sentido terraza → ventanal.
- **Uso:** Un recorrido ya hecho con la persona de la pieza: bloque 3 o 5 en un solo plano. El final (24–30 s) es un cierre de «vista» ejemplar. Su sentido es terraza → ventanal, el inverso al de la puerta 501.
- **Ojo:** VOZ de 0,4 a 3,9 s: «Hay una razón por la que este edificio no se siente como los demás.» (transcripción automática: confirmar). Lo demás son pasos. Esa frase es un hook adicional.

### 9.2 Zonas comunes y exterior del edificio

#### RC17 · `Sala Lobby.MOV` · 5,3 s · ★★☆

- **Qué se ve:** Lobby: sofá modular gris, alfombra roja, ventanales con palmas y muro de ladrillo; leve desplazamiento a la derecha.
- **Movimiento:** Desplazamiento lateral lento.
- **Uso:** Amenidad del edificio (zona común).
- **Ojo:** Voz ajena breve a 3,7–4,5 s: silenciar.

#### RC18 · `Sala de Juntas.MOV` · 4,7 s · ★☆☆

- **Qué se ve:** Sala de juntas: mesa larga, sillas ergonómicas, ventana con verdor.
- **Movimiento:** Leve desplazamiento.
- **Uso:** Amenidad genérica; solo si se enumeran las zonas comunes.

#### RC19 · `Gimnasio.MOV` · 5,9 s · ★★☆

- **Qué se ve:** Gimnasio acristalado con techo de madera a doble altura, banco y polea; avance y paneo.
- **Movimiento:** Avance y paneo.
- **Uso:** Amenidad del edificio.

#### RC20 · `Gimnasio2.MOV` · 5,5 s · ★☆☆

- **Qué se ve:** Bicicletas fijas contra un muro de concreto; luego una máquina de piernas y el ventanal con palmas.
- **Movimiento:** Paneo a la derecha.
- **Uso:** Amenidad del edificio.

#### RC21 · `Gimnasio3.MOV` · 4,7 s · ★☆☆

- **Qué se ve:** Equipos frente al ventanal con verdor y edificios de ladrillo detrás.
- **Movimiento:** Casi fijo (mano).
- **Uso:** Amenidad del edificio.

#### RC22 · `Exterior edificio.MOV` · 6,7 s · ★★★

- **Qué se ve:** Entrada del edificio: plantas en primer plano, camino de deck, fachada de ladrillo con puertas de vidrio y jardinera arriba. El rótulo «LOS PATIOS», en letras negras sobre el ladrillo, aparece hacia la segunda mitad (≈3–6,6 s).
- **Movimiento:** Avance hacia la entrada.
- **Uso:** Plano de contexto con el nombre del edificio.
- **Ojo:** Comprobar la legibilidad del rótulo en un still antes de apoyarse en él.

#### RC23 · `Exterior edificio2.MOV` · 10,3 s · ★★☆

- **Qué se ve:** Contrapicado de la fachada: jardinera con plantas y helechos colgando, ladrillo, ventanales negros y torre rojiza vecina.
- **Movimiento:** Sube mirando hacia arriba.
- **Uso:** Contexto verde del edificio.

#### RC24 · `Exterior edidficio3.MOV` · 5,9 s · ★★☆

- **Qué se ve:** Camino de grava junto a un pilar de ladrillo (inclinado por la perspectiva) con helecho arbóreo arriba; sube a ver la torre y el cielo.
- **Movimiento:** Avance y contrapicado.
- **Uso:** Contexto del edificio.
- **Ojo:** El nombre del archivo tiene una errata («edidficio»): renombrar al copiar.

#### RC25 · `Exterior edificio4.MOV` · 7,7 s · ★★★

- **Qué se ve:** Contrapicado extremo de la fachada con terrazas vegetales, nubes y palmeras; avanza por el camino.
- **Movimiento:** Avance por el camino, mirada hacia arriba.
- **Uso:** Pareja de los dron: la fachada «llena de verde» vista desde el suelo (prueba del hook HK05).

#### RC26 · `Exterior edificio5.MOV` · 5,0 s · ★★☆

- **Qué se ve:** Mirada vertical: hojas de palma arriba, cielo con nubes y una jardinera con enredaderas colgantes sobre vidrio reflectante.
- **Movimiento:** Casi fijo.
- **Uso:** Plano de detalle de la vegetación vertical.

### 9.3 Dron (carpeta `3 Dron`, 11 tomas disponibles)

Todas en SDR y sin audio. En varias aparece, arriba, una **torre vecina en obra con malla negra** (DR148-DR152): se tapa con el texto de portada o con un reencuadre del 10-15 %. En DR147 y DR163 no.

#### DR147 · `DJI_20261001103120_0147_D.MP4` · 22,9 s · ★★★

- **Qué se ve:** 0–6 s: copa de un árbol en primer plano y, tras ella, las terrazas de plantas. ≈6–17 s: el edificio va apareciendo con el rótulo «LOS PATIOS» en la base de ladrillo. 17–22,9 s: la corona del edificio completa, con una torre vecina a la izquierda y cielo.
- **Movimiento:** Ascenso con ligero retroceso (revelado).
- **Uso:** La mejor apertura de edificio: revela de abajo arriba. Tramo útil para el frame 0: ≈8–12 s.

#### DR148 · `DJI_20261001103201_0148_D.MP4` · 11,1 s · ★★☆

- **Qué se ve:** Corona del edificio desde un poco por encima: terrazas con plantas y techo oscuro; torre vecina en construcción al fondo.
- **Movimiento:** Deriva lateral lenta.
- **Uso:** Plano de situación tranquilo (4–6 s).
- **Ojo:** Torre vecina en obra con malla negra arriba a la derecha.

#### DR149 · `DJI_20261001103219_0149_D.MP4` · 18,6 s · ★★☆

- **Qué se ve:** Corona del edificio con 3–4 niveles de jardineras y la torre gris vecina a la izquierda; nubes arriba al principio.
- **Movimiento:** Ascenso lento con ligera deriva.
- **Uso:** Establishing para cuerpo de pieza.
- **Ojo:** Torre vecina en obra con malla negra.

#### DR150 · `DJI_20261001103247_0150_D.MP4` · 11,1 s · ★★☆

- **Qué se ve:** Corona del edificio con una torre de ladrillo vecina a la izquierda llena de ventanas.
- **Movimiento:** Ascenso con acercamiento lento.
- **Uso:** Contexto urbano de la fachada.
- **Ojo:** Torre vecina en obra con malla negra.

#### DR151 · `DJI_20261001103323_0151_D.MP4` · 5,2 s · ★☆☆

- **Qué se ve:** Niveles de terrazas con plantas entre dos pilares de ladrillo; torre vecina en obra arriba.
- **Movimiento:** Casi fijo con deriva lateral.
- **Uso:** Relleno corto (5,2 s).
- **Ojo:** Torre vecina en obra con malla negra.

#### DR152 · `DJI_20261001103352_0152_D.MP4` · 22,2 s · ★★★

- **Qué se ve:** 0–7 s: plano cerrado de terrazas con jardineras y pilares de ladrillo. 7–15 s: asciende hasta la corona. 15–22,2 s: retrocede y deja ver toda la parte alta con columnas blancas y la torre gris a la izquierda.
- **Movimiento:** Ascenso y retroceso: revela la cubierta.
- **Uso:** Segundo revelado del edificio; 12–16 s es el tramo más limpio.
- **Ojo:** Torre vecina en obra con malla negra arriba, en la primera mitad.

#### DR153 · `DJI_20261001103446_0153_D.MP4` · 7,9 s · ★★☆

- **Qué se ve:** Corona del edificio vista desde arriba; al girar aparecen torres de ladrillo vecinas a la derecha y palmeras abajo.
- **Movimiento:** Órbita suave a la derecha.
- **Uso:** Contexto de entorno (7,9 s).

#### DR154 · `DJI_20261001103456_0154_D.MP4` · 16,7 s · ★★☆

- **Qué se ve:** Vuelo junto a la fachada: terrazas verdes a la izquierda, torre de ladrillo vecina, calle con carros abajo y montañas al fondo.
- **Movimiento:** Vuelo lateral descendente.
- **Uso:** Muestra el entorno y la calle (ubicación).
- **Ojo:** Aparecen carros y la calle: cuidar placas si se hace zoom.

#### DR155 · `DJI_20261001103603_0155_D.MP4` · 10,9 s · ★★★

- **Qué se ve:** Primer plano de los jardines colgantes, el techo de madera y, abajo, una terraza con mesa y sillas.
- **Movimiento:** Acercamiento y ascenso lentos.
- **Uso:** Plano de detalle más «de revista» del dron: verde, madera y vida en la terraza.

#### DR156 · `DJI_20261001103635_0156_D.MP4` · 25,8 s · ★★☆

- **Qué se ve:** 0–17 s: ascenso lento por los jardines colgantes. 17–25,8 s: sigue subiendo y se desliza a la derecha hacia otra fachada de ventanales; una persona aparece en una terraza baja al final (≈24 s).
- **Movimiento:** Ascenso y deslizamiento lateral.
- **Uso:** Detalle de la fachada; cortar antes de los 22 s.
- **Ojo:** Persona en cuadro al final: no usar los últimos 3 s.

#### DR163 · `DJI_20261001104246_0163_D.MP4` · 19,1 s · ★★★

- **Qué se ve:** 0–6 s: desde el borde de la terraza (columna de concreto, techo de madera y skyline de Medellín). 6–14 s: se desliza a la derecha sobre el deck con vegetación y edificios. 14–19,1 s: baja casi a ras del suelo hacia el muro de ladrillo y la corrediza.
- **Movimiento:** Vuelo de la terraza hacia el interior, último tramo rasante.
- **Uso:** Transición dron → terraza → interior: lo más cercano a un plano de recompensa. Une el mundo del dron con el de Isabella.

**Ausentes:** `DJI_20261001104125_0161_D.MP4` (25,2 s, 294,1 MB) y `DJI_20261001104210_0162_D.MP4` (29,2 s, 340,0 MB). Existían al empezar este catálogo y no aparecen ya en la carpeta; sin ellos, no puedo describirlos.

---

## 10. Cómo encadenar: lugares y dirección del paseo

### 10.1 Las etiquetas de lugar

Cada toma de Isabella lleva una. Dos tomas del mismo `LUGAR` se pueden unir con una disolvencia corta; dos de lugares distintos piden un plano de recorrido en medio.

| Etiqueta | Dónde es |
|---|---|
| `ENTRADA` | Ascensor, puerta negra del 501 y pasillo de ladrillo |
| `INT-BLOQUES` | Sala del muro de bloques de vidrio y la ventana al valle |
| `INT-VENTANAL` | Interior junto al ventanal (columna de ladrillo, tubería amarilla) |
| `INT-ABIERTO` | Espacio abierto en obra gris: vigas, columnas de ladrillo, ventanales y salida a la terraza. En el piso, dos varillas (verde y amarilla); muro gris con salidas de agua. Es la zona que el archivo llama «cocina y comedor» |
| `TERRAZA` | Deck de madera con techo de madera y muro de ladrillo; abertura corrediza hacia el interior |
| `BARANDA` | Pasarela del deck junto a la barandilla negra con jardinera |
| `PATIO` | Patio: muro de listones oscuros con palma, plantas y piscina/espejo de agua pequeño con escalones |
| `BALCON` | Esquina del ventanal con barandilla; vista al valle, las montañas y los edificios de ladrillo |

### 10.2 Quién está dónde

| Lugar | Hooks | Mitad | CTA |
|---|---|---|---|
| `ENTRADA` | HK08 | MD10 | — |
| `INT-BLOQUES` | HK03 | — | CT05 |
| `INT-VENTANAL` | HK09 | — | — |
| `INT-ABIERTO` | HK01, HK02, HK04 | MD09, MD11 | CT06 |
| `TERRAZA` | HK01a, HK06, HK10 | MD01a, MD02, MD04, MD06, MD07, MD08, MD12, MD13 | CT07 |
| `BARANDA` | HK05 | MD01, MD05 | — |
| `PATIO` | HK01b, HK07 | MD03, MD14 | CT03, CT04 |
| `BALCON` | — | — | CT01, CT02 |

### 10.3 Dos sentidos de paseo

El apartamento es lineal: la **entrada** (ascensor, puerta 501, pasillo, muro de bloques de vidrio, ventanal con vista) está en un extremo y la **terraza y el patio** en el otro. Esto es lo que se deduce de `RC16` (terraza → ventanal) y de `RC01`-`RC02` (puerta → sala); conviene verificarlo con la planta, sobre todo la posición de las alcobas (no la sé).

| | **Sentido I · entrada → terraza** | **Sentido II · terraza → ventanal** |
|---|---|---|
| Hook (promesa, puede estar fuera del paseo) | HK01, HK02, HK03, HK04, HK08, HK09 (interior) | HK06, HK07, HK10, HK05, HK01a, HK01b (terraza y patio) |
| Recorrido (bloque 3) | RC01 → RC02 → RC03 → RC07 | RC10 → RC11 → RC05 (y RC16 de apoyo) |
| Isabella a mitad (bloque 4) | MD09, MD11 (`INT-ABIERTO`) | MD09, MD11 (`INT-ABIERTO`) |
| Recorrido (bloque 5) | RC08, RC10, RC09, DR163 (patio y terraza) | RC16 (24-30 s: asomarse a la barandilla), RC04 (la vista) |
| CTA (bloque 6) | CT04, CT03, CT07 (patio y terraza), CT06 (sale al deck) | CT02, CT01 (balcón), CT05 (muro de bloques) |

Las demás tomas «mitad», que están en la terraza (MD01-MD08, MD12-MD14), no caben como segunda parada de Isabella sin saltar de sitio: úsense como **voz en off** (su audio sobre otras imágenes), o como bloque 4 de una pieza que acabe el paseo en la terraza (sentido I con el puente de HK06/CT06, que cruzan el umbral interior → terraza).

Planos-bisagra que conectan zonas: **RC06** y **RC11** (terraza ↔ interior), **DR163** (dron ↔ terraza), **HK06** y **CT06** (Isabella cruzando el umbral), **RC09** (acaba entre hojas: cortinilla natural) y **CT04** (arranca con un helecho en primer plano: otra cortinilla).

---

## 11. Piezas propuestas y plan de pruebas

### 11.1 Seis piezas de arranque

Propuestas para elegir; ninguna está montada. Cada una cambia **un ángulo** y comparte tomas con las demás, de modo que lo que se aprende de una sirve a las otras. Para montar una: aprobar la pieza y sus tomas y seguir el flujo de `director-video` (artefactos → planes → puertas → frames → prueba a 720p → final); el combo del registro se resuelve en §11.3.

| # | Nombre | Ángulo | Hook → mitad → CTA | Recorrido y dron | Dura (estimada) |
|---|---|---|---|---|---|
| **P1** | La oportunidad | A | HK02 → MD11 + MD09 (+ voz de MD13) → CT07 | DR147, RC01, RC02, RC07, RC10, RC08, DR163 | 47 s |
| **P2** | Dentro y fuera | B | HK06 → MD11 + MD09 (+ voz de MD01) → CT02 | RC10, RC11, RC05, RC16, RC03 | 48 s |
| **P3** | El precio | C | HK08 → MD09 (+ voz de MD04) → CT07 | RC02, RC07, RC08, RC10, DR155 | 42 s |
| **P4** | Filtro | D | HK03 → MD11 (+ voz de MD05) → CT07 | RC03, RC02, RC05, RC10, DR152 | 42 s |
| **P5** | Altura sin torre | E | HK05 → (voz de MD08) → CT01 | DR147, DR152, DR155, RC25, RC22, RC04 | 40 s |
| **P6** | Versión corta «lujo» | B | HK07 → (voz de MD05) → CT04 | DR152, RC08, RC10, RC09 | 28-30 s |

### 11.2 Dos piezas escritas al detalle

Los tramos de recorrido y dron son orientativos (§9). Los de Isabella son los «cortes sugeridos» de la tarjeta.

**P1 · La oportunidad (sentido I, ≈47 s).** Cuenta que «sin terminar» es la oportunidad, y la deja con un CTA de filtro.

| Bloque | Toma | Tramo (s) | Dur. | Notas |
|---|---|---|---|---|
| 1 Casa | DR147 | ≈8–10 | 2,0 | Portada: «Aún sin terminar: **la oportunidad**». Sin logo ni Isabella |
| 2 Hook | HK02 | 0,12–5,70 | 5,6 | Disolvencia desde DR147. Dos acentos: «terminado» y «la oportunidad» |
| 3 Recorrido | RC01 | ≈10–14 | 4,0 | El umbral: la puerta del 501 y el pasillo |
| | RC02 | ≈5–9 | 4,0 | Pasillo → sala (muro de bloques de vidrio) |
| | RC07 | ≈5,5–9,5 | 4,0 | Acaba en el espacio abierto, donde está Isabella en el bloque 4 |
| 4 Objeción | MD11 | 0,60–5,60 | 5,0 | La pregunta que selecciona al comprador (confirmar el arranque) |
| | MD09 | 0,16–5,08 | 4,9 | La respuesta: 317 m² para desarrollar |
| 5 Off | MD13 (solo audio) | 0,24–6,06 | 6,0 | Voz de Isabella sobre RC10 (3 s) y RC08 (3 s): «materiales se pueden cambiar, pero proporciones, altura y arquitectura, no» |
| | DR163 | ≈14–19 | 5,0 | El dron entra en la terraza: clímax y puente al CTA |
| 6 CTA | CT07 | 0,26–7,12 | 6,9 | Isabella en la terraza. Rótulo final con el canal |
| | | **Total** | **≈47,4** | |

*Ojo:* Isabella está dos veces en `INT-ABIERTO` (hook y mitad). Si molesta, cambiar HK02 por HK03 (`INT-BLOQUES`), que convierte la pieza en P4.

**P2 · Dentro y fuera (sentido II, ≈48 s).** Cuenta que arquitectura y naturaleza no están separadas, y acaba donde acaba el paseo de RC16.

| Bloque | Toma | Tramo (s) | Dur. | Notas |
|---|---|---|---|---|
| 1 Casa | RC10 | 0–2 | 2,0 | Deck frente al muro de ladrillo y la corrediza abierta. Portada: «Arquitectura y **naturaleza**, sin frontera» |
| 2 Hook | HK06 | 0,20–5,18 | 5,0 | Isabella cruza el umbral hacia la cámara |
| 3 Recorrido | RC11 | ≈9–13 | 4,0 | Patio → entra por la corrediza |
| | RC05 | ≈1,5–5,5 | 4,0 | El espacio abierto |
| | RC16 | ≈9–13 | 4,0 | Isabella cruza el espacio de espaldas |
| 4 Objeción | MD11 + MD09 | ver P1 | 9,9 | En `INT-ABIERTO` |
| 5 Off | MD01 (solo audio) | 0,84–7,52 | 6,6 | Sobre RC16 (≈17–21 s, pasillo y bloques de vidrio) y RC03 (≈4,5–7,5 s). La vista queda para el clímax, sin repetirla |
| | RC16 | ≈24–29 | 5,0 | Isabella se asoma a la barandilla: clímax |
| 6 CTA | CT02 | 0,24–7,90 | 7,7 | El balcón donde acaba RC16 (continuidad de lugar). Da el precio |
| | | **Total** | **≈48** | |

### 11.3 Plan de pruebas

`guion-luxur/pruebas.md` manda: **una variable a la vez**, la métrica de cada eje (hook → retención a 3 s; CTA → mensajes) y, con una sola propiedad, los resultados **orientan pero no concluyen** (una pieza no dice nada, dos tampoco; hacen falta ≥ 3 por variante).

1. **Ronda 1 — hook.** Mismo cuerpo (el de P1), cuatro hooks: **HK02**, **HK03**, **HK05**, **HK08**. Ganador por retención a 3 s. Una familia por hook: reencuadre, filtro, pregunta de anhelo, precio.
2. **Ronda 2 — CTA.** Con el hook ganador, cuerpo fijo: **CT07** (filtro) vs **CT02** (precio) vs **CT05** (limpio). Ganador por mensajes.
3. **Ronda 3 — mitad.** Con las dos anteriores fijas: MD13 + MD14 (tesis A) vs MD04 + MD05 (tesis B).
4. **Control.** HK01 / HK01a / HK01b (misma frase, tres fondos) como medición de decorado.

*Sobre el registro:* `registro.mjs` solo acepta combinaciones del banco (`H03-T02-C05-V01`). Para comparar estos hooks, hay que darlos de alta como `H21+` en `banco-hooks.md` y los CTA como `C11+` en `banco-cta.md` (los IDs nuevos van al final y no se reutilizan nunca). No lo he hecho; hasta entonces, se anota la combinación en la columna `nota`. Candidatos más cercanos del banco: HK03 ≈ H07/H17, HK04 ≈ H03/H11, HK05 ≈ H06/H15, HK06 ≈ H13, HK07 ≈ H04, HK08 ≈ H09+H07, HK09 ≈ H17/H18, HK02 ≈ H06.

### 11.4 Música y sonido

No he localizado el catálogo de música del estudio en este checkout (`catalogo-musica.md`), así que no propongo pista. *(Actualización del 2026-10-03: el catálogo existe, en `archivos/musica/catalogo-musica.md` (el audio vive en la biblioteca de música del estudio, fuera del repo); la V1 de este material usa «Time», de Hans Zimmer, desde 175,63 s, y el registro de la música y de las combinaciones está en `combinaciones.md`.)* El criterio del formato: instrumental inmersiva que suba en los bloques 1 y 3, baje bajo la voz, con el clímax en la vista, y sin transiciones sonoras (nada de whooshes). La voz de Isabella no se trata.

---

## 12. Por confirmar y lo que falta

### 12.1 Palabras dudosas (confirmar escuchando)

El vocabulario que se le dio a Whisper (nombre del edificio, «obra gris», «ALH», las cifras) mejora esos términos pero también puede empujar la transcripción hacia ellos: por eso se confirman al oído.

| Toma | Whisper oyó | Lo probable | Por qué |
|---|---|---|---|
| MD03 | «una **cocina** privada en altura» (conf. 0,20) | **piscina** | Está junto a la piscina; una «cocina privada en altura» no tiene sentido |
| CT06 | «Si es el **resto**» (conf. 0,16) | **reto** | Por contexto |
| HK01, HK01a, HK01b | «veinte enseño», «¡Vente enseños!» | **ven, te enseño** | Coincide en las tres con confianza ≤ 0,40 |
| MD05 | «Hay **luego** que se muestra» | **lujo** | HK07 habla de «lujo» |
| MD11 | «¿**Alguien** que valora el arquitectura…?» | quizá «¿Eres alguien…?» | El arranque tiene conf. 0,31 |
| MD13 | «Materiales se pueden cambiar» | quizá «Los materiales…» | Primera palabra conf. 0,41 |
| CT01 | «diferente **en** un apartamento convencional» | quizá «diferente **a**…» | — |
| CT07 | «esta **linea** en específico» | **unidad** — CONFIRMADO por el usuario (rev. 8 del 017, 2026-10-03) | conf. 0,06; en otro corte Whisper oyó «noidad» |
| HK08, CT02, CT03 | «3550 millones» | 3.550 millones | Cifra con conf. 0,12–0,49 |
| RC16 | «Hay una razón por la que este edificio no se siente como los demás» | — | Primera frase del recorrido caminando |
| RC06 | «…vegetación y agua, construyendo una experiencia, no solamente una decoración. Ladrillo, concreto, madera, vidrio, vegetación.» | — | Voz fuera de cuadro, empieza a media frase |

### 12.2 Datos que debe dar el usuario

1. **Área de los 317 m²:** ¿construida, privada, incluye terrazas? ¿Y moneda y precio exacto?
2. **Cuánto cuesta y cuánto tarda terminarlo** (o al menos un rango que se pueda decir). Sin esto, el ángulo A queda cojo.
3. **Alcobas, baños, parqueaderos, administración, piso y año de entrega del edificio.**
4. **ALH:** nombre completo y si se puede citar en publicidad.
5. **El elemento de agua:** ¿piscina, jacuzzi o espejo de agua? ¿Se llena? Hasta saberlo, no rotularlo.
6. **Perfil del cliente:** ¿confirmas el perfil D de §2?
7. **Canal del CTA:** DM, WhatsApp, enlace o palabra clave (el «escríbeme» de las siete tomas no lo dice).
8. **Los dos clips de dron ausentes** y qué se pretendía con `Hook2+IA`.

### 12.3 Lo que falta grabar (por orden de impacto)

1. **Una toma que responda «¿cuánto cuesta terminarlo y quién lo diseña?»** (Isabella, en `INT-ABIERTO`). Es la objeción número uno de una obra gris y hoy no hay respuesta.
2. **Voz en off limpia en la propia casa**, tres frases con silencio antes y después, para el bloque 5 (hoy se reutiliza el audio de las tomas «mitad»).
3. **Dos o tres planos de manos mudos:** abriendo la corrediza, sobre el ladrillo, en la barandilla.
4. **Luz distinta:** un atardecer en la terraza, que es el clímax natural del formato.
5. **Un plano limpio del espacio abierto desde la entrada** si algún día se quiere el «+IA» de `Hook2+IA` (el que existe, de los 9,6 a los 13,2 s, ya sirve).

---

*Generado con ffprobe (formatos), Whisper local con vocabulario de la propiedad (voz), análisis de energía del audio (inicio y fin de cada frase) y tiras de fotogramas con tone-map HLG→BT.709 (imagen). Los segundos de las descripciones de recorrido y dron son aproximados.*
