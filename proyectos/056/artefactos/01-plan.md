# 01 · Plan narrativo — proyecto 056 · Casa en Condominio Los Bravos (La Ceja), V38 del registro (tercer reel de la casa: «Solo 6 casas»)

> Paso 1 de 3. Escrito con el reparto de la sesión madre (`proyectos/054/reparto-054-062.md`, que manda), el catálogo del rodaje (`proyectos/054/catalogo/catalogo-material.md`), la ficha de la web, lo aprendido en el 025 (la misma canción y la misma estructura de nueve planos) y en el 042 (la estructura y la puerta). Siguiente: [02-layout.md](02-layout.md).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Pedido | Encargo del 2026-10-21: **3 reels por propiedad** en tres propiedades nuevas (una sesión por reel, todas sobre el mismo checkout). Este es el **V38 / 056**: Casa en Condominio Los Bravos (La Ceja), ángulo **«Solo 6 casas: la exclusividad que se valoriza»**, el más racional de los tres, para el comprador que piensa en inversión. Más las reglas fijas del canal (estructura DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA con tres frases de Isabella, primera toma sin texto ni voz, nunca el sello, cierre en tarjeta oscura con el logo y la web, subtítulos editoriales, voz a −15 LUFS, música con curva, color por plano medido). |
| La propiedad y la ficha | Casa en Venta en Condominio Los Bravos, La Ceja, con lote de 500 m². Ficha leída por la sesión madre el 2026-10-21: **VENTA · COP 1.380 M** · **220 m² construidos** · **500 m² de lote** · 4 alcobas (una en el primer piso) · 4 baños · 2 parqueaderos + visitantes · 2016 · condominio de **solo 6 casas**. La web se contradice («500 m² construidos» en otra sección): **vale la ficha**. **No se afirma**: administración (la voz de MD04 dice 120.000 y es de otra versión), distancias, estrato ni nada que la ficha no dé. |
| Material | `Casa - La Ceja/Videos/` del SSD, copiado a `proyectos/056/original/` con el CÓDIGO del catálogo por nombre (sha256 en `normalizar.mjs`): HK04 `88b9a9ab`, MD02 `5e8723b9`, CT01 `561170fc`, DR02 (`varias_tomas.MP4`) `3b6c54e3`, RC01-RC28 elegidos (RC28, RC05, RC20, RC12, RC16 los que usa el plan; RC01, RC02, RC03, RC06, RC08, RC10, RC15, RC17, RC22, RC24, RC26 normalizados de repuesto), música *Heaven on Earth* `acd99178`. |
| Composición | `Recorrido056` · 1080×1920 · **30 fps** · 1056 f (**35,2 s**). Clips normalizados a 1296×2304 y 30 fps: los MOV de este rodaje son **1080×1920 SDR BT.709 verticales, sin rotación** (no son HLG como los de otras propiedades); el dron es 4K vertical SDR con `rotation=90` y 29,97 fps (`setpts=PTS*1000/1001` antes de `-r 30`). |
| Formato | 9:16 vertical · `recorrido-luxur` (DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA) |
| Marca / texto | Luxur, texto **editorial** (abajo, 90 %, cursiva 8 px menor); **sin sello**; cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com` |
| Destino | Reels · Shorts · TikTok · y la versión con ficha para anuncios (1:1) |
| Presentadora | Isabella Cadavid |

## El ángulo: «Solo 6 casas» (y en qué se distingue de las otras dos versiones de la casa)

**La idea en una línea:** esta casa es para quien compra **con cabeza de inversión** y está cansado de pagar por ser un número más en una torre o en un condominio gigante: lo que ofrece es **exclusividad medible** (seis casas, menos de diez unidades privadas). El hook lo enuncia, el aéreo lo enseña, el paseo lo construye (la casa por fuera, por dentro y al detalle) y la mitad lo pone en cifras dichas por ella.

| | V36 (054) | V37 (055) | **V38 (056)** |
|---|---|---|---|
| Ángulo | privacidad: no tener a nadie encima | las mañanas: aire puro del oriente | **solo 6 casas: la exclusividad que se valoriza** |
| Hook | HK01 | HK02 | **HK04** «Descubre la privacidad de vivir en un condominio de solo seis casas.» |
| Mitad | MD04 | MD03 | **MD02** «Los condominios de menos de 10 unidades privadas se valorizan diferente.» |
| CTA | CT06 | CT03 | **CT01** «Si realmente buscas tranquilidad, esta casa es para ti. Escríbeme.» |
| Aéreo | `DJI…0070_D`, primer tercio | `DJI…0070_D`, último tercio | **`varias_tomas.MP4`, tras el corte de escena (86-120 s)** |
| Canción | *Luxury, Elegance, Refined* | *Spring is Coming* | ***Heaven on Earth*** (repetida de la V9/025, autorizada por el usuario el 2026-10-21) |
| Hilo de recorridos | (ver su plan) | (ver su plan) | **lo construido**: fachada · interior social · cocina y acabados · alcoba principal · alcoba con balcón |

### Lo que NO cambia respecto de las demás piezas del canal (y se dice)

- La estructura de nueve planos de la V9 (025): apertura · hook · 3 de paseo · mitad · 3 del bloque 5 (la vista, el más largo) · CTA. Es la que `buscar-cortes-lp.py` resolvió sobre los golpes de *Heaven on Earth*.
- La canción es de la biblioteca del canal y **repite la de la V9 (Los Patios)**: otra propiedad, otra mezcla; autorizado por el usuario porque quedaban 4 libres para 9 reels.

## Promesa y CTA

- **Promesa (primeros 2,4 s):** el conjunto desde arriba, **sin texto ni voz** (regla fija), con el golpe de la canción en el f3. Isabella entra disolviendo y es opaca en el f73; su primera palabra suena en el f85.
- **Acción final:** «escríbeme»: UNA acción.
- **Lo que NO se cuenta en pantalla:** precio, áreas ni la ficha (van al caption y a la versión con ficha). **Las únicas cifras en pantalla son las que ella dice**: «seis» (escrito con letras, como lo dice) y «10» (en cifra, «menos de 10 unidades»).
- **La valorización la dice la voz de Isabella (MD02), no el canal:** ni un rótulo ni el caption la prometen; el acento de la mitad va en «menos de 10», el dato, no en «se valorizan».

## Escenas (los seis bloques)

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | 0,0-2,4 | El conjunto | la exclusividad, vista | el conjunto | DR02 97,0-99,9 s: cenital sobre la vía nueva y las casas con sus jardines · solo música: golpe de 10,2 dB en el f3 |
| 2 | 2,4-6,4 | Hook | la promesa | Isabella | HK04: camina hacia cámara por el jardín (césped, seto, el ladrillo de las casas vecinas); la cámara gira a la pérgola y al perro · «Descubre la privacidad de vivir en un condominio de solo seis casas.» |
| 3 | 6,4-15,2 | Recorrido | lo construido | la casa | la fachada que aparece al bajar la cámara del cielo (RC28) → el interior social, de la tele al comedor (RC05) → la cocina y sus acabados (RC20) · solo música, cortes secos en golpes |
| 4 | 15,2-19,7 | Mitad | la cifra, dicha | Isabella | MD02: camina por la sala de doble altura · «Los condominios de menos de 10 unidades privadas se valorizan diferente.» |
| 5 | 19,7-29,2 | Recorrido | el descanso y la vista | la casa y el valle | la alcoba principal con vigas y el muro de piedra del baño (RC12) → la alcoba con balcón y la vista del entorno (RC16) → LA VISTA: el dron levanta la mirada del conjunto al horizonte y se posa sobre el valle (DR02 106,0 s, el plano más largo) |
| 6 | 29,2-35,2 | CTA | invitar | Isabella | CT01: sentada en el sofá gris de la sala · «Si realmente buscas tranquilidad, esta casa es para ti. Escríbeme.» → funde a negro → tarjeta con el logo y la web |

## Decisiones tomadas (y las descartadas)

- **Hook = HK04** (`IMG_8825`, asignado). La voz habla de 0,80 a 3,82 s (3,0 s: 23 sílabas, ≈ 7,7 sílabas por segundo, muy rápida); el resto de la toma es ella caminando sin hablar. **POR CONFIRMAR AL OÍDO: «privacidad»**: whisper oye «prioridad» (confianza 0,23 en «prior»). Medido: en la banda de las /s/ (4-9 kHz) hay un resalte de fricativa a los 1,60-1,66 s de la toma, donde cae la «ci» de «privacidad», y «prioridad» no lo tendría; el sentido de la frase («descubre la prioridad de vivir en un condominio…» no lo tiene) y el ángulo dicen «privacidad». Se pinta «privacidad» y **se pregunta antes de exportar**: yo no puedo oír, y el encargo pedía oírlo.
- **Mitad = MD02** (`IMG_8818`): «condominios» sin la «d» marcada (whisper oye «conominos»); «10» es «diez» dicho. Es el único dato del ángulo y lo dice ella.
- **CTA = CT01** (`IMG_8911`): su voz empieza a los 1,86 s (hay 1,1 s de silencio antes, con un golpecito del micro a los 0,7 s que queda fuera de la ventana tratada) y acaba a los 5,04 s; el plano usa el clip de 1,47 a 5,50 s y funde a negro en los últimos 6 f.
- **El aéreo = DR02, SOLO tras el corte de escena** (85,967 s del archivo normalizado = 86,05 s de la fuente): lo anterior queda libre para otras versiones. Dos ventanas: la **apertura** (97,0-99,9 s: la pasada cenital uniforme, movimiento 8,6 y dispersión 0,014) y **la vista** (106,0-109,7 s: la inclinación frena sola, de 9,7 a 0,4 de movimiento, y el dron se posa sobre el valle; con un empuje 1,00 → 1,06 para que no quede una foto). No se usa ningún segundo anterior al corte.
- **Recorridos: un hilo propio, «lo construido»** (RC28 fachada · RC05 interior social · RC20 cocina · RC12 alcoba principal · RC16 alcoba con balcón). La 054 usa RC01-03, RC06, RC07, RC13, RC22, RC24 y RC25; la 055 usa otros: con la 055 solo había un cruce posible (el clip de la cocina, RC20), resuelto: la 055 usa 3,03-5,66 s y esta pieza 0,1-3,03 s.
- **El orden del paseo** sigue la casa sin volver atrás: jardín (hook) → fachada → interior social → cocina → [Isabella en la sala] → alcoba principal → alcoba con balcón → vista del valle → [Isabella en la sala, el CTA]. La sala es el punto de encuentro de las dos tomas de Isabella (las dos tomas del rodaje están ahí).
- **Canción = *Heaven on Earth*** (`acd99178`, lounge/chill sin pulso, «sereno, cálido, celestial»): se entra en su golpe de 178,043 s y la **caída de la canción desde los 209,5 s cae dentro de la toma del CTA** (el f947, 72 f tras su entrada). **Cada cambio de plano cae en un golpe MEDIDO** (`buscar-cortes-lp.py`, 16 soluciones con estos planos; elegida la de golpes de 9,2-15,5 dB y el hook de 4,0 s para que la música suba antes del corte). **Medida, no oída; licencia sin verificar.**
- **El color:** `COLOR_BASE` del canal + el ajuste de cada plano, medido (`medir-color.py`): σ de luma entre planos 11,4 → 9,9, saturación 0,208 → 0,232, piel de Isabella en el mismo tono (12,0° → 11,5° · 12,0° → 11,8° · 13,4° → 13,3°).
- **Lo que se ve y conviene saber:** (1) el aéreo enseña una excavadora amarilla pequeña en el patio de una de las casas y calles sin terminar: es la realidad de ese tramo del condominio; (2) el balcón de RC16 enseña una casa amarilla y otra de ladrillo del vecindario: no se dice que sean del condominio.
- **El disco:** 75 GB libres (compartidos con otras dos sesiones de la casa y las otras seis); el dron normalizado pesa 764 MB.

## Lo que comparte con las otras versiones de la casa (declarado)

| Clip | Otra versión | V38 |
|---|---|---|
| RC20 (`rc20.mp4`, la cocina) | V37 (055), movido a 3,03-5,66 s | 0,1-3,03 s (**0 s en común**, acordado con la 055) |
| Aéreo | V36 y V37 usan `DJI…0070_D`; el tramo de `varias_tomas.MP4` anterior a 86 s queda libre | solo el posterior a 86 s |
| HK04 · MD02 · CT01 · *Heaven on Earth* | exclusivas de esta pieza dentro de la casa | — |

## Pendiente con el usuario (tras la final, 2026-10-22)

El usuario aprobó la prueba rev. 0 y pidió exportar: «exporta los 3 para ficha y recorrido con portada». Entregado en `finales/` (ver `combinaciones.md`, «Lo exportado»).

1. **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto): «**privacidad**» (HK04, f104 = 3,5 s del vídeo). Medido con `formantes.py`: la vocal tras «pri-» es una /a/ abierta (F1 ≈ 730-790 Hz, la de «casas»), no la /o/ de «solo» (F1 ≈ 520-590) y hay un resalte de fricativa a 1,60-1,66 s; cierra la vocal, no la palabra.
2. La canción (medida, no oída; repetida de la V9; licencia sin verificar), el aéreo (¿es el condominio?) y el salto de luz del corte hook → fachada.
3. Por dónde se escribe («escríbeme») y si el caption lleva el WhatsApp.
