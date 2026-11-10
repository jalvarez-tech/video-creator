# Combinaciones — proyecto 065 · Lote en San Vicente Ferrer (vereda La Porquera), V47 («15 minutos: la decisión»), rev. 2

Registro de esta versión y mapa de «cómo cambiar cada pieza». Es la tercera de las tres versiones de este lote que se montan a la vez en sesiones distintas (reparto **rev. 2** en `proyectos/063/reparto-063-065.md`, que manda): la V45 (063, «el error: comprar barato sin papeles») y la V46 (064, «no hace falta irse lejos»). La canción está reservada en `archivos/musica/registro-de-uso.md` (fila V47).

## Versiones de este lote

| V | Proyecto | Estado | Fecha | Qué es |
|---|---|---|---|---|
| V45 | 063 | en montaje (otra sesión) | 2026-10-22 | «El error»: Hook1 · Medio3 · CT02 · DR02 + DR01 0-24 s · *Oceans (Where Feet May Fail)* |
| V46 | 064 | en montaje (otra sesión) | 2026-10-22 | «No hace falta irse lejos»: Hook2 · Hook5 · CT03 · DR03 + DR01 24-48 s · *Cornfield Chase* |
| **V47** | **065** | **FINAL exportada el 2026-11-03** (OK del usuario a la prueba `pruebas-720p/065-recorrido.mp4`, rev. 2 de la narrativa; máster CRF 12 + CRF 16 + `.srt` + portada + versión con ficha en `finales/`) | 2026-10-22 | **«15 minutos: la decisión»**: DR04 · **HK03 (A)** · **HK03 (B, a corte)** · DR04 + **LA FICHA** · **CT05 (la pregunta, de mitad)** · DR01 · DR01 · **CT01** · *deadmau5 - Strobe* · 1209 f · 40,3 s |

*(La rev. 0/1 —HK04 de mitad, DR05/DR08/DR09, sin infografía— se descartó el 2026-10-22: el usuario cambió el material y el planteamiento; `hook4.mp4` era copia exacta de `Hook1.mp4`.)*

## Repeticiones y excepciones declaradas (reparto rev. 2)

- **CT05 es un CTA en posición de mitad**: no queda ninguna frase de hook ni de mitad libre. Es una **pregunta**, no una llamada a la acción: funciona de bisagra y deja el cierre a CT01 (dos frases distintas, ninguna repetida). Solo se usa la pregunta (3,13-5,40 s): «te leo en los comentarios» sería un segundo CTA.
- **HK03 va en dos planos de la MISMA toma**: la parte A (la afirmación) y la parte B («ven, te muestro») a corte y con empuje. No repite metraje (la B empieza después de donde acaba la A).
- **La infografía** es un encargo del usuario (2026-10-22): LA FICHA, solo con lo que dice la web. Excepción declarada a «el dato grande solo va en el recorrido»: en un lote no hay recorrido y el dron lo hace de fondo.

## Lo que lleva (rev. 2)

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Apertura (aéreo) | DR04 12,60-16,40 s | el vuelo sobre la hierba, la cerca viva y los arbustos de flor blanca: «el plano más bonito del material» |
| Hook (parte A) | HK03 `Hook3.mp4` (voz 8,18-16,2 s; el plano usa 7,73-16,40 s) | las dos cifras y la distancia, dichas mientras camina hacia cámara; entra DISOLVIENDO y la disolvencia ACABA en un golpe; la primera palabra suena a los 13,4 f |
| Invitación (parte B) | HK03 (voz 16,72-17,55 s; el plano usa 16,60-18,70 s) | «ven, te muestro» a corte y con un empuje del 8 al 14 %: es lo que lleva al dron |
| Dron con LA FICHA | DR04 22,00-30,47 s + infografía (f451-f675) | ÁREA 3.244 m² → PRECIO NEGOCIABLE $ 350 M → DERECHO DE ACUEDUCTO Incluido → Escrituras 100 %; cifras sin animar, una cada 1,4 s, en golpes (13,3 · 15,6 · 18,9 · 22,1 dB); velo negro 60 % |
| Mitad | CT05 `cta5.mp4` (voz 3,13-5,40 s; el plano usa 2,70-5,97 s) | la pregunta que abre la decisión: «¿lo comprarías para construir o para invertir?» |
| Dron | DR01 50,00-53,27 · 59,00-63,23 s | el panorama de la loma y LA VISTA (la ladera con la cerca curva y las lomas; el plano más largo) |
| CTA | CT01 `cta1.mp4` (voz 3,41-7,2 s; el plano usa 2,97-7,47 s) | una acción: «comenta “lote” y te envío toda la información»; entra DISOLVIENDO |
| Canción | *deadmau5 - Strobe* (`de6df12a`) desde 554,867 s (`INICIO_MUSICA` = 16646/30) | pulso de 128 BPM medido (0,4687 s, desvío medio 13 ms); cada plano y cada cifra en un pulso con golpe medido de 12,8-22,1 dB; se apaga sola desde ≈ 592 s y con curva bajo la tarjeta; **medida, no oída; licencia sin verificar; género de club** |
| Voz | −15,0 LUFS tratada (+19,7 · +18,7 · +18,3 dB tras el compresor 3,5:1; limitador −2,5 dBFS) | pedido permanente del canal |
| Música | −15 LUFS sola (−5,9 · −5,5 · −5,6 dB sobre el archivo); −26 LUFS bajo la voz | la canción es una meseta de −9,1 a −9,5 LUFS |
| Color | `COLOR_BASE` + el ajuste de cada plano (medido) | σ de luma entre planos 10,2 · quemado máx. 0,2 % · aplastado máx. 4,8 % |

## Cómo cambiar cada pieza

- **El hook, la pregunta o el CTA**: la toma nueva entra en `normalizar.mjs` (con su sha) y en `metraje-065.ts` (`desde` = el frame en que su primera palabra suena 13 f tras el `en`; `voz.s0/s1` con `limites-voz.py` y la envolvente de 20 ms), `GANANCIA_VOZ_DB` y `VENTANA_VOZ` (`probar-voz.py`), `subtitulos-065.ts` (`trozos-editoriales.mjs` + onsets) y la puerta (`LUGAR`, `TERNA`, los acentos esperados).
- **La ficha**: los textos y los tiempos son de `infografia-065.ts` (los golpes salen de `GOLPE.info1-4` de `metraje-065.ts`); la puerta (2g) exige lo que dice la web, una cifra cada ≥ 1,2 s, la zona segura y el centrado en y 960. La versión con ficha 1:1 se hace con `herramientas/ficha-oculta.mjs`.
- **Un plano de dron**: cambia `desde`; el de DR01 tiene que caer en 48-73,5 s (los otros tramos son de la 063 y la 064).
- **La música**: otra canción = otro `INICIO_MUSICA` y otros golpes (`medir-pista.py --json`, `rejilla-fit.py`).
- **La versión con ficha**: `--props={"sinSubtitulos":true}` (`ficha-luxur`), con la banda fuera mientras hay infografía.

## Lo por confirmar

La puerta con `--final` pasa (ningún «POR CONFIRMAR» en el plan): la duda de la rev. 0 («lote barato» / «lote de barato») cayó con la toma (HK04 ya no se usa). **Exportada el 2026-11-03 sin oír**, es decir, sin un oído delante (instantes del vídeo final; el caption no las repite):

| Palabra | Instante | Qué pasa | Qué se midió |
|---|---|---|---|
| «Comenta **lote**» | 34,2-34,9 s | whisper oye «elote» sobre la toma entera y «Comenta a Lote» cortada | sílaba a sílaba en `ct01.wav`: co 3,445 · men 3,555 (/e/ muy corta) · **ta 3,75** (cierre de /t/ a −56 dB y una /a/ larga, F1 ≈ 820, F2 ≈ 1.900) · **lo** (/l/ débil a 3,835, F2 ≈ 1.600-1.770; /o/ a 3,915, F1 ≈ 650, F2 ≈ 1.000) · **te** 4,135 (F2 ≈ 2.290): cinco sílabas, sin una «e» extra; la vocal de más que oye whisper es la /a/ larga de «-ta». Es «lote» (medido, no oído) |
| «**Ven, te muestro**» | 12,6-14,1 s | whisper oye «20 muestros» y, cortada, «21 estrofos»; la última sílaba («-tro») cae a −40 dB | cuatro onsets de la envolvente a 16,72 · 16,905 · 17,27 · 17,47 s de `hk03.wav`: ven·te·mues·tro (`onsets-voz.py`, sesión del montaje); la ventana de voz llega a 17,55 s |
| «**3.244** metros cuadrados» | 4,2-6,8 s | confianza 0,13 de whisper (una cifra) | cortada sola, whisper oye «3.244 metros cuadrados»; coincide con la ficha y con lo escrito |
| «350 millones» | 10,9-12,5 s | confianza 0,34 en la toma entera | cortada sola, «y por solo 350 millones»; coincide con lo escrito |
| «¿**Lo** comprarías para construir o para invertir?» | 23,5-25,9 s | confianza 0,17 en «lo» (primera sílaba tras 3 s de silencio) y 0,21 en «invertir» | lo demás ≥ 0,95; whisper oye la frase entera sin variantes |

Para cambiar cualquiera: el texto del trozo y su frame (`subtitulos-065.ts`), `voz/<toma>.txt`, el `.srt` (`exportar-srt.mjs`) y la etiqueta de la puerta; ≈ 6 min. **Las notas se quedan: una medida no es un oído.**

## Entregado (2026-11-03) — `proyectos/065/finales/` (ignorada por git; la mueve la sesión madre al SSD)

| Archivo | Qué es |
|---|---|
| `065-recorrido.mp4` | máster CRF 12 slower · 1080×1920 · 1209 f · 40,30 s · 215 MB · −15,1 LUFS, pico −3,2 dBFS · BT.709 en VUI y `colr` |
| `065-recorrido-crf16.mp4` | versión ligera CRF 16 slow · 120 MB · el MISMO audio (md5 del PCM idéntico) y la misma imagen (PSNR 43,6 dB contra el máster) |
| `065.srt` | 17 cues (4,2 → 38,2 s) |
| `065-portada.png` | 9:16, fotograma 29,9 s (la vista del DR01, el más nítido de 29,6-31,4 s) · SAN VICENTE FERRER (72 px, ajustada sola) · VENTA · contraste 11,8:1 el texto y 5,9:1 el isotipo · receta en `portada.json` |
| `065-recorrido-ficha.mp4` | sin subtítulos, LOTE EN VENTA · San Vicente Ferrer · La Porquera · $ 350 M COP en Montserrat abajo del 1:1; la banda SE VA en f433-445 (acaba antes del velo y de la primera cifra) y VUELVE en f695-707 (tras la disolvencia a la pregunta); se va en f1136-1148 antes de la tarjeta · mismos 1209 f y el audio del máster copiado tal cual (md5 del flujo AAC idéntico) |

Para volver a renderizar: `node proyectos/065/herramientas/exportar-final.mjs` (≈ 15-40 min según la carga del Mac) y `ficha-oculta.mjs` con su base. El material normalizado vive en `remotion/public/recorrido-065/` (con `node proyectos/065/normalizar.mjs` y los originales de `proyectos/065/original/` se repone).
