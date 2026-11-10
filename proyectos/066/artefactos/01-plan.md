# 01 · Plan narrativo — proyecto 066 · Lote en San Cristóbal (EOLIA Condominio), V48 del registro (primer reel del lote: «Con esta vista, muy pocos»)

> Paso 1 de 3. Escrito con el reparto fijo (`proyectos/066/reparto-066-068.md`, que manda), el catálogo del rodaje (`proyectos/066/catalogo/catalogo-material.md`), la ficha de la web (leída el 2026-10-24) y lo aprendido en la 057 (la estructura, la puerta y la música sin pulso por golpes medidos). Siguiente: [02-layout.md](02-layout.md).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Pedido | Encargo del 2026-10-24: «Haz 3 videos» del lote de 5.170 m² en San Cristóbal con los clips de `Lote - San Cristobal/Videos/videos`. Este es el **V48 / 066**, ángulo **«Con esta vista, muy pocos»**. Más las reglas fijas del canal (estructura DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA con tres frases de Isabella, primera toma sin texto ni voz, nunca el sello, cierre en tarjeta oscura con el logo y la web, subtítulos editoriales, voz a −15 LUFS, música con curva, color por plano medido). |
| La propiedad y la ficha | **Lote en venta en San Cristóbal, Medellín, de 5.170 m²** (EOLIA Condominio, vereda La Ilusión): **VENTA · COP 797 M** · más de 5.170 m² para construir · 1 nivel · acueducto veredal · lotes con matrícula independiente y financiación directa · vistas abiertas a Medellín y al Valle de Aburrá. **No se afirma** nada que la ficha no dé: ni energía, ni uso del suelo, ni vías, ni «apto para construir», ni valorización. La dirección exacta solo se da al agendar la visita. |
| Material | `Lote - San Cristobal/Videos/videos/` del SSD, copiado a `proyectos/066/original/` con el CÓDIGO del catálogo (sha256 en `normalizar.mjs`): HK05 `8cfe392e`, MD03 `a93b5ec4`, CT04 `8fc411b5`, RC01 `a7518276`, RC04 `e2b7c4ed`, DR01 `8be2c043`, DR02 `a615812a`, DR05 `518ca0ac` (solo se codifican sus primeros 62 s), música *Flying Into the Sun* `ca1f1cbf`. |
| Composición | `Recorrido066` · 1080×1920 · **30 fps** · 1218 f (**40,6 s**). Clips normalizados a 1296×2304 y 30 fps: los MOV de este rodaje son **1080×1920 SDR BT.709 verticales, sin rotación y sin SAR anamórfico**; los drones son 4K vertical SDR con `rotation=90` y 29,97 fps (`setpts=PTS*1000/1001` antes de `-r 30`). |
| Formato | 9:16 vertical · `recorrido-luxur` (DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA) |
| Marca / texto | Luxur, texto **editorial** (abajo, 90 %, cursiva 8 px menor); **sin sello**; cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com` |
| Destino | Reels · Shorts · TikTok · y la versión con ficha para anuncios (1:1) |
| Presentadora | Isabella Cadavid |

## El ángulo: «Con esta vista, muy pocos» (y en qué se distingue de las otras dos versiones del lote)

**La idea en una línea:** este lote es para quien quiere **tener un terreno grande con la ciudad a la vista** y sabe que eso no se consigue fácil. No se vende un listado sino una escasez: un lote de más de 5.000 m² con Medellín al fondo.

| | **V48 (066)** | V49 (067) | V50 (068) |
|---|---|---|---|
| Ángulo | **con esta vista, muy pocos** (escasez) | este no es para ti (el filtro del comprador serio) | el verdadero estatus es la privacidad |
| Hook | **HK05** «…lotes de 5.000 metros, con esta vista, muy pocos.» | HK02 | HK04 |
| Mitad | **MD03** «Hay una versión de tu vida donde ya no tienes que salir a buscar paz…» | MD01 | MD02 |
| CTA | **CT04** «Si deseas más información, haz clic en el enlace.» | CT05 | CT01 |
| Aéreo | **DR01 · DR02 · DR05 (0-60 s)** | DR03 · DR06 · DR04 | DR04 · DR05 · DR06 |
| Canción | ***Flying Into the Sun*** | *Return to Oasis* | *Heaven on Earth* |

### Lo que NO cambia respecto de las demás piezas del canal (y se dice)

- La estructura de la 057 y la 056. La canción **no tiene pulso** (golpes cada ≈ 0,5 s): la rejilla son los golpes MEDIDOS y solo los cortes SECOS piden golpe; las disolvencias van libres (memoria `musica-sin-pulso-rejilla-por-golpes`).
- La canción es de la biblioteca del canal y **repite la de la V3 (Los Patios)**: otra propiedad; el reparto la reservó para este reel (`archivos/musica/registro-de-uso.md`, fila V48) y una canción ya usada SÍ se repite en OTRA propiedad si se declara (memoria `musica-repetir-entre-propiedades`).

## Promesa y CTA

- **Promesa (primeros 2,4 s):** el camino en curva y los cipreses del lote desde el aire, **sin texto ni voz** (regla fija), con el golpe de la canción en el f3. Isabella entra disolviendo y es opaca en el f72; su primera palabra suena en el f94.
- **Acción final:** «haz clic en el enlace»: UNA acción (el acento del CTA va en «haz clic»).
- **Lo que NO se cuenta en pantalla:** precio ni los 5.170 m² de la ficha (van al caption y a la versión con ficha). **La única cifra en pantalla es la que ella dice: «5.000 metros»**, tal cual.
- **El hilo de las palabras acentuadas:** «muy pocos.» (el hook, la escasez) · «paz» y «dentro de ella.» (la mitad) · «haz clic» (el CTA, la acción).

## Escenas (los seis bloques)

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | 0,0-2,4 | El lote | la promesa | el lote | DR01 0,5-2,9 s: el dron avanza sobre el camino en curva, los cipreses y la loma, con las montañas al fondo · solo música: golpe de 10,1 dB en el f3 |
| 2 | 2,4-11,0 | Hook | la escasez | Isabella | HK05: camina por el prado con la loma y la cordillera detrás · «En Medellín se construyen miles de apartamentos cada año, lotes de 5.000 metros, con esta vista, muy pocos.» · **«muy pocos.»** |
| 3 | 11,0-20,4 | Recorrido | el lote: el aire y la extensión | el lote | el cielo y el valle a ras de suelo (RC01) → el lote desde arriba, de la senda al horizonte (DR05) · solo música: cortes secos en golpes de 10,8 y 12,3 dB |
| 4 | 20,4-26,6 | Mitad | la paz | Isabella | MD03: en la loma con los pinos · «Hay una versión de tu vida donde ya no tienes que salir a buscar paz los fines de semana porque ya vives dentro de ella.» · **«paz»** y **«dentro de ella.»** |
| 5 | 26,6-35,4 | Recorrido | el rincón y la vista | el lote y la ciudad | el rincón del árbol que abre al valle (RC04) → el vuelo que baja al lote (DR02) → LA VISTA: Medellín al horizonte sobre el bosque (DR01 18,0-21,8 s, el plano más largo) |
| 6 | 35,4-40,6 | CTA | invitar | Isabella | CT04: en el camino con las cercas y el prado · «Si deseas más información, haz clic en el enlace.» · **«haz clic»** → funde a negro → tarjeta con el logo y la web |

## Decisiones tomadas (y las descartadas)

- **Terna del reparto, sin tocarla** (HK05 · MD03 · CT04). HK06 (`IMG_0961`) es otra toma de la misma frase del hook: se eligió HK05 por su fondo (la cordillera detrás de ella, que es lo que dice «con esta vista»).
- **Voces medidas por energía EN BANDA DE VOZ** (150-4000 Hz, 33 ms), no por whisper ni en banda ancha: el viento del prado sube el suelo de ruido a −42 dBFS en 20-100 Hz y `limites-voz.py` pone el arranque en 0,60 s en el hook cuando ella habla de verdad desde 1,33 s. Whisper small pone la primera palabra de las tres tomas en 0,00 s (falso) y reparte la frase desde ahí.
- **La mitad dura lo que dura su clip.** MD03 mide 6,63 s y ella acaba a los 6,24: tras su última palabra quedan 12 f. No hay disolvencia de salida posible ni se puede alargar sin congelar el último fotograma: entra DISOLVIENDO (f611) y sale a CORTE sobre el golpe de 9,8 dB del f797.
- **Dos palabras POR CONFIRMAR AL OÍDO** de la mitad («de tu vida» y «paz»; ver `subtitulos-066.ts`) que whisper oye mal («Siente tu vida», «Car-paz») y que yo no puedo cerrar sin oírlas.
- **«5.000 metros» ≠ 5.170 m².** Los subtítulos son lo que ella dice; la ficha, el caption y la portada llevan 5.170 m². Decisión del usuario: si quiere que diga «más de 5.000», hay que regrabar el hook.
- **El aéreo: DR01 abre y cierra con la vista (tramos distintos), DR05 es el lote desde arriba y DR02 el vuelo que baja.** DR01 0,5-2,9 s es el camino y los cipreses; DR01 18,0-21,8 s es Medellín entera sobre el bosque. Los apaisados (`Dron/Horizontales`) no se usan.
