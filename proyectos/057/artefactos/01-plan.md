# 01 · Plan narrativo — proyecto 057 · Apartamento en Palmazera (La Ceja), V39 del registro (primer reel del apartamento: «Que se respire paz»)

> Paso 1 de 3. Escrito con el reparto de la sesión madre (`proyectos/054/reparto-054-062.md`, que manda), el catálogo del rodaje (`proyectos/057/catalogo/catalogo-material.md`), la ficha de la web, lo aprendido en el 056 (la estructura y la puerta de la tanda anterior) y en el 042 (la misma canción, *Silver Skies*, y la regla «con piano las disolvencias van libres»). Siguiente: [02-layout.md](02-layout.md).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Pedido | Encargo del 2026-10-21: **3 reels por propiedad** en tres propiedades nuevas (una sesión por reel, todas sobre el mismo checkout). Este es el **V39 / 057**: Apartamento en Palmazera (La Ceja), ángulo **«Que se respire paz: llegar y descansar de verdad»**. Más las reglas fijas del canal (estructura DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA con tres frases de Isabella, primera toma sin texto ni voz, nunca el sello, cierre en tarjeta oscura con el logo y la web, subtítulos editoriales, voz a −15 LUFS, música con curva, color por plano medido). |
| La propiedad y la ficha | Apartamento en Venta en Palmazera, La Ceja, con balcón y garaje. Ficha leída por la sesión madre el 2026-10-21: **VENTA · COP 429 M** · **60 m²** · 2 alcobas · 2 baños · 1 parqueadero cubierto · balcón, zona de trabajo, cocina integral equipada, alcoba principal con baño y vestier, condominio cerrado con gimnasio, salón social y portería 24 h, a ~5 min del parque principal. **No se afirma** nada que la ficha no dé: ni administración, ni estrato, ni valorización. |
| Material | `Apto Ninson /Videos/` del SSD (OJO: el nombre de la carpeta lleva un espacio al final), copiado a `proyectos/057/original/` con el CÓDIGO del catálogo por nombre (sha256 en `normalizar.mjs`): HK01 `83bb42b3`, MD06 `4ae191df`, CT02 `88d468c7`, DR01 `d9012919`, DR02 `e2856a8e`, DR03 `445da7cb`, RC01-RC28 (RC11, RC12, RC04 y RC02 los que usa el plan; el resto, normalizados para mirarlos), música *Silver Skies Cinematic Piano* `9c3a3dc3`. |
| Composición | `Recorrido057` · 1080×1920 · **30 fps** · 1080 f (**36,0 s**). Clips normalizados a 1296×2304 y 30 fps: los MOV de este rodaje son **1080×1920 SDR BT.709 verticales, sin rotación** (VFR a 60/59,94 fps: `-fps_mode cfr -r 30`); los drones son 4K vertical SDR con `rotation=90` y 29,97 fps (`setpts=PTS*1000/1001` antes de `-r 30`). |
| Formato | 9:16 vertical · `recorrido-luxur` (DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA) |
| Marca / texto | Luxur, texto **editorial** (abajo, 90 %, cursiva 8 px menor); **sin sello**; cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com` |
| Destino | Reels · Shorts · TikTok · y la versión con ficha para anuncios (1:1) |
| Presentadora | Isabella Cadavid |

## El ángulo: «Que se respire paz» (y en qué se distingue de las otras dos versiones del apartamento)

**La idea en una línea:** este apartamento es para quien quiere **llegar a casa y descansar de verdad** y está cansado de vivir sin pausa. No se vende un listado de espacios sino una sensación: la luz que entra, el sofá con su manta, la cama hecha, la ventana con la montaña, el silencio del conjunto visto desde arriba.

| | **V39 (057)** | V40 (058) | V41 (059) |
|---|---|---|---|
| Ángulo | **que se respire paz: llegar y descansar de verdad** | 60 m² que rinden: pequeño no es poco | el estrés no viene solo del trabajo: vivir y trabajar bien |
| Hook | **HK01** «¿Buscas un lugar donde realmente se respire paz? Este apartamento es eso.» | HK02 | HK04 |
| Mitad | **MD06** «¿Cuándo fue la última vez que llegaste a casa y sentiste que de verdad descansaste?» | MD07 | MD09 |
| CTA | **CT02** «Agenda tu visita y vive la experiencia de la tranquilidad en persona.» | CT01 | CT03 |
| Aéreo | **DR01 · DR03** (DR02 sin usar) | DR04-DR06 | DR07-DR10 |
| Canción | ***Silver Skies Cinematic Piano*** | *Ivory Skyline Reverie* | *Light Fills the Room* |
| Hilo de recorridos | **la calma**: el pasillo hasta el gato · la sala con su manta, su taza y su luz · la cama · la ventana | la cocina, los dos baños, el clóset y el pasillo que reparte (cada metro resuelto) | la alcoba 2 con el escritorio, la sala y el balcón (la zona de trabajo) |

### Lo que NO cambia respecto de las demás piezas del canal (y se dice)

- La estructura de la 056 y la 042 (DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA); **la 056 resolvió su rejilla con una canción sin pulso y cada plano en un golpe; aquí, con piano, solo los cortes SECOS piden golpe y las disolvencias van libres** (memoria `musica-sin-pulso-rejilla-por-golpes`, 037).
- La canción es de la biblioteca del canal y **repite la de la V25/042 (Lote en El Carmen)**: otra propiedad, otra mezcla; el reparto de la sesión madre la reservó para este reel (`archivos/musica/registro-de-uso.md`, fila V39) y una canción ya usada SÍ se repite en OTRA propiedad si se declara (memoria `musica-repetir-entre-propiedades`).

## Promesa y CTA

- **Promesa (primeros 2,4 s):** el edificio de ladrillo entre el verde, **sin texto ni voz** (regla fija), con el golpe de la canción en el f3. Isabella entra disolviendo y es opaca en el f72; su primera palabra suena en el f85.
- **Acción final:** «agenda tu visita»: UNA acción (el acento del CTA va en ella: «Agenda tu visita»).
- **Lo que NO se cuenta en pantalla:** precio, áreas ni la ficha (van al caption y a la versión con ficha). **Ninguna cifra en pantalla**: ella no dice ninguna.
- **El hilo de las palabras acentuadas:** «paz?» (el hook) · «descansaste?» (la mitad) · «Agenda tu visita» (el CTA, la acción). «Tranquilidad» queda en la línea base.

## Escenas (los seis bloques)

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | 0,0-2,4 | El edificio | el silencio del conjunto | el conjunto | DR03 4,0-6,4 s: el dron avanza a lo largo del edificio de ladrillo entre el prado, las montañas y el cielo azul · solo música: golpe de 9,8 dB en el f3 |
| 2 | 2,4-7,1 | Hook | la promesa | Isabella | HK01: entra por la izquierda de la sala y se queda junto a la tele · «¿Buscas un lugar donde realmente se respire paz? Este apartamento es eso.» · **«paz?»** |
| 3 | 7,1-15,3 | Recorrido | la luz y la calma | la casa | el pasillo despejado hasta el rincón del gato (RC11) → las flores, la taza, el sofá con su manta y el ventanal (RC12) · solo música: el acorde de 17,4 dB abre el paseo; corte seco en un golpe de 8,2 dB |
| 4 | 15,3-20,1 | Mitad | la pregunta | Isabella | MD06: sentada en ese mismo sofá · «¿Cuándo fue la última vez que llegaste a casa y sentiste que de verdad descansaste?» · **«descansaste?»** |
| 5 | 20,1-30,2 | Recorrido | el descanso y la vista | la casa y el pueblo | la cama con la luz de la ventana (RC04) → la cámara se acerca a la ventana y aparece la montaña (RC02) → LA VISTA: el dron sobre los techos de La Ceja y las montañas (DR01, el plano más largo) |
| 6 | 30,2-36,0 | CTA | invitar | Isabella | CT02: en el balcón con el prado y las montañas detrás · «Agenda tu visita y vive la experiencia de la tranquilidad en persona.» · **«Agenda tu visita»** → funde a negro → tarjeta con el logo y la web |

## Decisiones tomadas (y las descartadas)

- **Terna del reparto, sin tocarla** (HK01 · MD06 · CT02): exclusiva de esta pieza dentro del apartamento. Los tres CTA del rodaje son uno por versión y sin repuesto.
- **Voces medidas por energía** (20 ms, banda de voz), no por whisper: HK01 habla de 0,92 a 4,22 s (3,3 s: 23 sílabas, muy rápido), MD06 de 0,72 a 4,22 s y CT02 de 0,76 a 3,76 s. **Whisper small se equivoca en las tres** (el catálogo ya lo avisaba): se come «de» en «de verdad» (MD06), oye «ve» donde el encargo dice «vive» (CT02) y pone la primera palabra de cada toma en 0,00 s.
- **Dos palabras POR CONFIRMAR AL OÍDO**, que yo no puedo cerrar: **«de verdad»** (MD06) y **«vive»** (CT02). Medidas con la energía a 10 ms y los formantes (`envolvente-voz.py`, `formantes.py`; ver `subtitulos-057.ts`): ninguna medida las cierra. Se pintan como las da el encargo y se dicen en la entrega con el segundo exacto.
- **El aéreo: DR03 abre y DR01 es la vista; DR02 queda sin usar.** DR03 (4,0-6,4 s) es el edificio visto de lado, con una pasada uniforme (movimiento 2,8 → 2,3); DR01 (2,4-5,9 s) sube sobre los árboles y abre el pueblo y las montañas, y frena solo (2,9 → 1,3: se posa; con un empuje 1,00 → 1,06). DR02 (21 s) es la continuación de DR01 y lleva más movimiento (7-13): sin uso, queda libre.
- **Recorridos: un hilo propio, «la calma»** (RC11 · RC12 · RC04 · RC02), elegidos por LENTOS (movimiento medido con `perfil-mov.py`: RC11 1,4-4,5, RC12 5-11, RC04 2-6; los de las otras habitaciones llegaban a 15-30) y por lo que significan: el pasillo despejado con el gato quieto (el umbral de la calma), la taza y el sofá (el descanso a la vista), la cama hecha con la luz de la ventana (la intimidad), la ventana con la montaña (de lo cerrado a lo abierto). **Dos planos largos en el paseo (3,7 s y 4,6 s) y tres de 3,3-3,5 s en el bloque 5**: con paz no se corta a cada golpe.
- **Con las otras dos sesiones** (notas en la carpeta de la sesión): la 058 se quedó la cocina (RC01, RC06, RC07, RC14), los baños (RC19-RC23) y el clóset (RC26); la 059, la alcoba 2 con el escritorio (RC24 y RC28), RC09 (0,30-3,23 s), RC10 (1,60-4,50 s) y RC13 (0,00-2,57 s). **Ni un segundo de metraje en común con ninguna de las dos** (la puerta, sección 7b, lo comprueba).
- **El orden del paseo** sigue la casa sin volver atrás: [aéreo del edificio] → sala (hook) → pasillo → sala (la taza y el sofá) → [Isabella en el sofá] → alcoba (la cama) → alcoba (la ventana) → [el pueblo desde arriba] → [Isabella en el balcón]. La sala es el punto de encuentro de las dos primeras tomas de Isabella (las dos tomas del rodaje están ahí); la mitad la deja SENTADA en el sofá que el plano anterior presenta.
- **Canción = *Silver Skies Cinematic Piano*** (`9c3a3dc3`, piano sereno en La# mayor): se entra en su golpe de 48,816 s (9,8 dB). Su **respiro** (de los 51,5 a los 55 s, hasta −40 dB) cae bajo el hook; su **acorde de 17,4 dB** (55,772 s) abre el paseo; su **caída natural** (desde los 79,5 s, de −16,9 a −27,2 LUFS) cae sobre el CTA, y hay un acorde de 19,5 dB a los 82,727 s (f1020) que se deja fuera: la música se apaga antes. **Medida, no oída; licencia sin verificar.**
- **El color:** `COLOR_BASE` del canal + el ajuste de cada plano, medido (`medir-color.py`): σ de luma entre planos 11,6 → 9,8, quemado máx 3,1 → 1,6 %, piel de Isabella en el mismo tono (15,1° → 14,7° · 357,8° → 356,0° · 9,1° → 8,7°).
- **Lo que se ve y conviene saber:** (1) en el hook, Isabella entra por la izquierda y su voz empieza cuando ya está en cuadro; (2) en la mitad la toma empieza con la cámara en el ventanal y **ella entra por la derecha a sentarse mientras dice «¿Cuándo fue la…»**: su cara no se ve hasta ≈ f485 (la toma es así); (3) en el CTA ella entra al encuadre mientras dice «Agenda tu visita» y, tras «de la tranquilidad en persona», la cámara gira al prado y ella sale: lo último que se ve de la toma es el paisaje (el edificio de la urbanización al fondo).
- **El disco:** 48 GB libres (compartidos con otras dos sesiones de la propiedad); el material normalizado de la pieza ocupa ≈ 560 MB (el dron más grande, DR02, 106 MB).

## Lo que comparte con las otras versiones del apartamento (declarado)

| Clip | Otra versión | V39 |
|---|---|---|
| RC09, RC10, RC13 | V41 (059): 0,30-3,23 · 1,60-4,50 · 0,00-2,57 s | **no se usan** |
| RC01, RC06, RC07, RC14, RC19-RC23, RC26 | V40 (058) | **no se usan** |
| RC24, RC25, RC27, RC28 | V41 (059) | **no se usan** |
| DR04-DR10 | V40 (058) y V41 (059) | **no se usan** (esta pieza: DR01 y DR03) |
| HK01 · MD06 · CT02 · *Silver Skies* | exclusivas de esta pieza dentro del apartamento | — |

## Pendiente con el usuario

1. **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto): «**de verdad**» (MD06, f545 = 18,2 s del vídeo) y «**vive**» (CT02, f943 = 31,4 s del vídeo).
2. La canción (medida, no oída; repetida de la V25; licencia sin verificar).
3. Por dónde se escribe («agenda tu visita»: mensaje directo, WhatsApp o enlace de agenda) y si el caption lleva el número de WhatsApp.
