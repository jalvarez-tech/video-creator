# 01 · Plan narrativo — proyecto 058 · Apartamento en Palmazera (La Ceja), V40 del registro (segundo reel del apartamento: «60 m² que rinden»)

> Paso 1 de 3. Escrito con el reparto de la sesión madre (`proyectos/054/reparto-054-062.md`, que manda), el catálogo del rodaje (`proyectos/057/catalogo/catalogo-material.md`), la ficha de la web, y lo aprendido en el 042 (el hook que entra a corte y la música que baja antes) y en el 056 (la composición, la puerta y la rejilla de una canción sin pulso). Siguiente: [02-layout.md](02-layout.md).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Pedido | Encargo del 2026-10-21: **3 reels por propiedad** en tres propiedades nuevas (una sesión por reel, todas sobre el mismo checkout). Este es el **V40 / 058**: Apartamento en Palmazera (La Ceja), ángulo **«60 m² que rinden: pequeño no es poco»**. Más las reglas fijas del canal (estructura DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA con tres frases de Isabella, primera toma sin texto ni voz, nunca el sello, cierre en tarjeta oscura con el logo y la web, subtítulos editoriales, voz a −15 LUFS). |
| La propiedad y la ficha | Apartamento en Venta en Palmazera, La Ceja, con balcón y garaje. Ficha leída por la sesión madre el 2026-10-21: **VENTA · COP 429 M** · **60 m²** · 2 alcobas · 2 baños · 1 parqueadero cubierto · balcón, zona de trabajo, cocina integral equipada, alcoba principal con baño y vestier, conjunto cerrado con gimnasio, salón social y portería 24 h, a ≈ 5 min del parque principal. **No se afirma** nada que la ficha no dé (administración, estrato, distancias). |
| Material | `Apto Ninson /Videos/` del SSD (la carpeta lleva un ESPACIO al final), copiado a `proyectos/058/original/` con el CÓDIGO del catálogo por nombre (sha256 en `normalizar.mjs`): HK02 `01c65454`, MD07 `75e54b7d`, CT01 `18780860`, DR04 `ff9063af`, DR05 `455e1e06`, DR06 `e7a3ea7a`, los 28 recorridos RC01-RC28 (el plan usa RC14, RC01, RC07, RC19 y RC23; el resto se normalizó para medirlo), música *Ivory Skyline Reverie* `80bf4f33`. Repuestos de las tomas: HK03 (`IMG_8714`, la gemela del hook) y MD07b (`IMG_8732`, la otra toma de MD07). |
| Composición | `Recorrido058` · 1080×1920 · **30 fps** · 1119 f (**37,3 s**). Clips normalizados a 1296×2304 y 30 fps: los MOV de este rodaje son **1080×1920 SDR BT.709 verticales, sin rotación**, a 60 / 59,94 fps; los drones son 4K vertical SDR con `rotation=90` y 29,97 fps (`setpts=PTS*1000/1001` antes de `-r 30`). |
| Formato | 9:16 vertical · `recorrido-luxur` (DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA) |
| Marca / texto | Luxur, texto **editorial** (abajo, 90 %, cursiva 8 px menor); **sin sello**; cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com` |
| Destino | Reels · Shorts · TikTok · y la versión con ficha para anuncios (1:1) |
| Presentadora | Isabella Cadavid |

## El ángulo: «60 m² que rinden» (y en qué se distingue de las otras dos versiones del apartamento)

**La idea en una línea:** este apartamento es para quien quiere su casa propia y teme que 60 m² se queden cortos: lo que enseña es que **cada metro está resuelto**: una cocina corredor completa, una barra, un solo ambiente cocina-comedor-sala que se siente amplio, dos baños y un vestier. El hook (dado) habla de descansar y no de tamaño; el **paseo** responde con orden («no para sobrevivir al caos»: todo en su sitio); la **mitad** pone el ángulo en palabras y cifra (ella dice «60 metros cuadrados» y lo escribe en cifra); el bloque 5 sigue por lo privado (los **dos** baños) y la vista deja la sensación de lugar grande.

| | V39 (057) | **V40 (058)** | V41 (059) |
|---|---|---|---|
| Ángulo | que se respire paz | **60 m² que rinden: pequeño no es poco** | el estrés no viene solo del trabajo |
| Hook | HK01 | **HK02** «Este es un apartamento pensado para descansar, no para sobrevivir al caos.» | HK04 |
| Mitad | MD06 | **MD07** «Lo que cabe en 60 metros cuadrados en Palmazera te va a cambiar la idea del apartamento pequeño.» | MD09 |
| CTA | CT02 | **CT01** «Escríbeme y te cuento por qué este lugar se siente diferente desde que entras.» | CT03 |
| Aéreo | DR01-DR03 | **DR04** (el edificio) y **DR05** (La Ceja con sus montañas); DR06 sin usar | DR07-DR10 |
| Canción | *Silver Skies Cinematic Piano* | ***Ivory Skyline Reverie*** (repetida de la V11/027, One Living: otra propiedad, autorizada por el usuario) | *Light Fills the Room* |
| Hilo de recorridos | sala y ventanal, balcón, alcoba principal | **cada metro resuelto**: cocina · barra · comedor-sala · dos baños con vestier | alcoba 2 con el escritorio, sala, balcón |

## Promesa y CTA

- **Promesa (primeros 2,8 s):** el edificio de ladrillo desde arriba, **sin texto ni voz** (regla fija), con el golpe de 18,2 dB de la canción en el f3. Isabella entra **a corte** en el f84; su primera sílaba suena en el f87.
- **Acción final:** «escríbeme»: UNA acción.
- **Lo que NO se cuenta en pantalla:** precio ni ficha (van al caption y a la versión con ficha). **La única cifra en pantalla es la que ella dice:** «60 metros cuadrados» (en cifra).

## Escenas (los seis bloques)

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | 0,0-2,8 | El edificio | la promesa, vista | el edificio | DR04 2,1-4,9 s: el dron pasa en paralelo a la fachada de ladrillo con el jardín y la loma · solo música: golpe de 18,2 dB en el f3 |
| 2 | 2,8-7,2 | Hook | descansar, no el caos | Isabella | HK02: camina hacia cámara por el pasillo largo con la luz cálida · «Este es un apartamento pensado para descansar, no para sobrevivir al caos.» |
| 3 | 7,2-16,4 | Recorrido | cómo cabe todo | la cocina y la sala | la cocina corredor (RC14) → la barra con la estufa y el microondas (RC01) → de la cocina al comedor y la sala (RC07) · solo música, cortes secos en golpes |
| 4 | 16,4-21,4 | Mitad | la cifra, dicha | Isabella | MD07: en la sala del ventanal, señala el espacio · «Lo que cabe en 60 metros cuadrados en Palmazera te va a cambiar la idea del apartamento pequeño.» |
| 5 | 21,4-31,1 | Recorrido | lo privado y la vista | los baños y La Ceja | el baño del pasillo (RC19) → el vestier y el baño principal (RC23) → LA VISTA: el dron se aleja del edificio y abre La Ceja con sus montañas (DR05, el plano más largo) |
| 6 | 31,1-37,3 | CTA | invitar | Isabella | CT01: sentada en el sofá junto al balcón · «Escríbeme y te cuento por qué este lugar se siente diferente desde que entras.» → funde a negro → tarjeta con el logo y la web |

## Decisiones tomadas (y las descartadas)

- **Hook = HK02** (`IMG_8713`, asignado). La voz habla de 0,10 a 3,72 s (3,6 s: 27 sílabas, ≈ 7,6 por segundo, muy rápida) y la toma **no deja aire antes** de la primera sílaba (3 f): por eso entra **a corte** y la música tiene que haber acabado de bajar *antes del corte* (precedente del 042). HK03 (la gemela) tiene el mismo problema (0,10 s) y no se usa.
- **Mitad = MD07** (`IMG_8729`, asignada, no la alternativa `IMG_8732`): voz de 0,42 a 4,86 s, con 0,58 s de cola. **Lleva la cifra 60 m²**: se escribe en cifra («60 metros cuadrados», acento). **«Palmazera»**: whisper oye «Palmacera» (confianza 0,29); es el nombre de la ficha de la web y del reparto y se pinta así; POR CONFIRMAR AL OÍDO cómo lo dice ella.
- **CTA = CT01** (`IMG_8723`): voz de 0,60 a 4,24 s; el plano usa el clip de 0,57 a 4,73 s (de 4,84) y funde a negro en los últimos 6 f. Es el CTA que el reparto da a esta versión; no hay repuesto (solo hay 3 CTA en el rodaje).
- **Aéreo = DR04 + DR05** (DR06, también de esta versión por reparto, no se usa). DR04 2,1-4,9 s: movimiento uniforme (4,0; dispersión 0,06, `ventana-fina.py`; arranca desde parado: se salta el primer segundo). DR05 3,5-7,37 s: el dron se aleja del edificio y abre el pueblo (movimiento 13, dispersión 0,03). DR06 (un ascenso lento por la fachada hasta el tejado y una pose final casi quieta sobre el horizonte con tejas y estación de servicio en primer plano) enseña menos.
- **Recorridos: un hilo propio, «cada metro resuelto»**: RC14 (cocina corredor) · RC01 (barra con mesón) · RC07 (de la cocina a la sala-comedor) · RC19 (baño del pasillo) · RC23 (vestier y baño principal). Acordado con las sesiones 057 y 059 en las notas compartidas: **ni un segundo de metraje en común** con sus planos actuales (la puerta lo mide, §7b). RC26 (el clóset de la alcoba 2) lo cedió la 059 y esta pieza no lo usa; el «clóset» de la ficha es el vestier de RC23.
- **El orden del paseo** sigue el apartamento sin volver atrás: pasillo (hook) → cocina corredor → barra → sala-comedor → [Isabella en la sala] → baño del pasillo → vestier y baño principal → La Ceja desde arriba → [Isabella en el sofá, el CTA]. Raccord de dos baños: RC19 acaba mirando el vidrio de la ducha y RC23 empieza mirándolo.
- **Canción = *Ivory Skyline Reverie*** (`80bf4f33`, lounge/downtempo sin pulso, plana: sin caída hasta los 194,5 s, ya fuera de la pieza): se entra en su golpe de **158,112 s (18,2 dB)** y los **seis cortes secos** caen en golpes MEDIDOS de ≥ 10,6 dB (`musica/golpes-058.json`). **Repetida de la V11 (027, One Living), autorizada por el usuario** (quedaban 4 libres de 43 para 9 reels). **Medida, no oída; licencia sin verificar.**
- **El hook, la mitad y el CTA NO entran en un golpe**: ella habla a los 0,1 / 0,4 / 0,6 s de su toma y la música ya está abajo (−26 LUFS, curva de coseno que acaba en el `en` del plano), así que un golpe ahí quedaría bajo su voz. Declarado, como en el 042.
- **El color:** `COLOR_BASE` del canal + el ajuste de cada plano: los baños con la temperatura bajada (el tungsteno amarillea), el CTA con la exposición subida (a contraluz del balcón, luma 85 → ≈ 100-120) y la mitad con un punto de sombras. Luma media entre planos σ ≈ 8 (110-136 en los stills a escala 1).
- **Lo que se ve y conviene saber:** (1) el aéreo enseña el edificio por su lado de los garajes y la loma sin construir; al final de DR05 aparece, abajo a la izquierda, **otro edificio** del pueblo: no se afirma nada de él; (2) Isabella dice «60 metros cuadrados» y el catálogo da 60 m²: coherentes.
- **El disco:** 54 GB libres; cada still o render deja un bundle de ≈ 2,4 GB en el temporal (`stills-multiples.mjs` borra el suyo; el render lo dejo borrar al acabar).

## Lo que comparte con las otras versiones del apartamento (declarado)

| Clip | Otra versión | V40 |
|---|---|---|
| (ninguno) | — | **ni un segundo** de metraje en común con la 057 ni con la 059 (puerta, §7b, 2026-10-22) |
| El comedor redondo con la sala | la 059 usa RC10 1,6-4,5 s (del TV al comedor con la cocina al fondo) | esta pieza usa RC07 2,6-6,2 s (de la barra al comedor y la sala): **otro clip, el mismo espacio** |
| HK02 · MD07 · CT01 · *Ivory Skyline Reverie* · DR04/DR05 | exclusivas de esta pieza dentro del apartamento (reparto) | — |
| *Ivory Skyline Reverie* | V11 (027, One Living) | repetida en OTRA propiedad, autorizado |

## Pendiente con el usuario

1. ~~Ver los frames y la prueba y dar el OK~~ — dado el 2026-10-22; final exportada (`finales/`, ver `combinaciones.md`, «Lo exportado»).
2. **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto): «**Palmazera**» (MD07, f547 = 18,2 s del vídeo): whisper oye «Palmacera»; medida con `formantes.py` (a-a-e-a, la secuencia de «Pal-ma-ze-ra»); exportada así.
3. La canción (medida, no oída; repetida de la V11; licencia sin verificar), el salto de luz entre el aéreo y el pasillo del hook, y el orden de la mitad (¿se oye bien «cabe en»?).
4. Por dónde se escribe («escríbeme»: mensaje directo o WhatsApp) y si el caption lleva el WhatsApp.
