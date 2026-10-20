# 01 · Plan narrativo — proyecto 053 · Tierra Grata Bosque Santo (El Poblado), ARRIENDO, V35 («¿PAGARÍAS $14.800.000?»), réplica de `03.mp4` sin voz en off

> Paso 1 de 3. Escrito con el reparto de la sesión coordinadora (`proyectos/044/reparto-051-053.md`: tabla «03» de §1b, fila 053 de §2 y, desde el cambio de encargo del 2026-10-20, **§5 y §5c**), el catálogo del material (`proyectos/044/catalogo-material.md`, sobre todo §7: anamórfico), `reparto-045-050.md` (formatos, reglas, protocolo) y la pieza de referencia 047 (`normalizar.mjs`, `combinaciones.md`, `aprendizajes.md`). Escrito **antes** del primer render. Siguiente: [02-layout.md](02-layout.md).

## Historia del encargo (para quien retome)

1. **Encargo original** (2026-10-20): replicar `videos editados/03.mp4` (56,43 s) con las mismas tomas y el mismo texto, en el formato del canal y en dos formatos. El original lleva una locución larga en off que NO existe como archivo.
2. **Primera versión del 053** (commits `9840fe0`…`c8bd11c`): montada entera con la locución como PISTA GUÍA (voz de sistema `Paulina`, `say`) mientras se decidía cómo resolverla (el usuario eligió ElevenLabs; el enlace del `.env` fue denegado dos veces por el entorno y luego la coordinadora comunicó que el usuario entregaría los audios).
3. **Cambio de encargo** (2026-10-20, antes de generar nada): *«crea el vídeo sin la voz en off… y cambiamos el guion a algo más impactante que resalte las plusvalías del apartamento: aseo semanal incluido, acompañamiento personalizado, acceso a chef privado, alquiler de transporte y la mejor asesoría de la ciudad»*. **La locución desaparece**: ya no hay nada que resolver con ElevenLabs ni con audios del usuario (nunca se llamó a la API ni se enlazó el `.env`). Lo que decía la locución lo dicen **nueve rótulos** más el del gancho. La pieza vigente es esta; la versión con pista guía queda en el historial de git.
4. **Cambio del usuario sobre la marcha** (2026-10-20, al ver la prueba): *«el video del hook déjalo con sonido para que se escuche la voz de Isabella»*. En el tramo de HK05 que usaba el gancho (4,3-7,9 s) NO hay voz suya (silencio digital y un chasquido de 0,75 s a −33 dB); la única voz en ese clip es la de **24,65-29,4 s** («¿Deseas arrendar amoblado en Medellín? Ven, te muestro.», el gancho que usa la 051), con un falso arranque al principio. El usuario eligió usarla: el gancho pasa a ser su voz en directo, subtitulada con lo que dice, y **el rótulo mudo «¿Pagarías $14.800.000 al mes por vivir aquí?» desaparece** (el canon queda en la ficha de la versión con ficha y en el caption). **Y, al oír la prueba, el usuario precisó:** *«Isabella se equivoca al principio: empieza el vídeo desde donde ella dice “deseas…” la segunda vez»*. En el clip, 24,65-25,25 s es un falso arranque («¿Desea-») y, tras 1,0 s de pausa, lo repite entero a los **26,36 s**: el gancho empieza ahí (`desde` 26,13 s, la primera sílaba en el f7) y el WAV de la voz tratada es silencio antes de los 26,29 s. La pieza dura **46,5 s**.

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Pedido | La réplica de `03.mp4` con las mismas tomas en el mismo orden, **sin voz en off y con un guion nuevo en pantalla** (reparto §5c), en el formato del canal y en sus DOS formatos (orgánico con rótulos y funnel con ficha). «Cuando esté listo me dices para subirlo.» |
| Numeración | **V35 / 053.** Las V33/051 y V34/052 son las otras dos réplicas (sesiones hermanas). La reserva de la V35 y de *Softly* ya estaba en `archivos/musica/registro-de-uso.md` (alternativa: *Cornfield Chase*; ninguna otra). |
| La propiedad y la ficha | **Tierra Grata Bosque Santo**, El Poblado, Medellín, «a pocos metros de la Avenida Las Palmas». **ARRIENDO tradicional: COP 14.800.000 al mes.** 113 m² · 2 habitaciones · 2 baños · 2 parqueaderos · piso 9 · amoblado · balcón con **jacuzzi privado**. La unidad: carril de nado, zonas húmedas, gimnasio, Spa Romano, squash, coworking, BBQ, Social Kitchen, salón social. Lo que prometen los rótulos lo dio el usuario (aseo semanal incluido, acompañamiento personalizado, chef privado, transporte/conductor, «la mejor asesoría de la ciudad»); **ninguno dice que el chef o el transporte vayan incluidos en el canon**. La misma unidad está en venta: **la pieza no la nombra**. |
| Material | `Apartamento - Tierra Grata - Las Palmas/Videos/` (`1 Hooks`, `4 Recorrido`, `5 Cta`), copiado a `proyectos/053/original/` con el CÓDIGO como nombre. sha256 en `normalizar.mjs`: HK05 `3bbed39e`, CT05 `5bc7d1a0`, RC10 `e7e4ee8b`, RC01 `9f23d5be`, RC22 `33ac8ce2`, RC03 `e5dd0f12`, RC05 `931b51dd`, RC04 `c6cd691d`, RC16 `7cdf817e`, música `87d78dc2` (*Softly*, el mismo archivo que reserva el registro). |
| **TODO el material es ANAMÓRFICO** | HK05, CT05 y los siete recorridos: 1920×1080 SDR con **SAR 81:256 y DAR 9:16** = verticales de 608×1080 efectivos comprimidos a lo ancho (comprobado con `ffprobe` el 2026-10-20). Se escalan ENTEROS a 1296×2304 con `setsar=1`, **sin recorte** (`normalizar.mjs`, la receta del 047). Salen **más blandos que Isabella en 4K** (×2,13): se dice, no se filtra. No hay dron. |
| Composición | `Recorrido053` · 1080×1920 · **30 fps** · **1394 f (46,47 s)**. Clips a 1296×2304 y 30 fps constantes. |
| Formato | 9:16 · `recorrido-luxur` **adaptado a la réplica**: bloques 2 (gancho) · 5 (recorrido con un rótulo por tramo) · 6 (CTA a cámara + tarjeta oscura); sin los bloques 1, 3 ni 4 (el original no los tiene) |
| Marca / texto | Luxur, texto **editorial** (abajo, 90 %, cursiva 8 px menor); **sin sello**; cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com`. La versión con ficha (`ficha-luxur`) va **SIN rótulos ni subtítulos** (corrección del usuario, 2026-10-20, que anula la primera indicación de conservarlos): solo la ficha fija y la tarjeta del cierre; la base se renderiza con `--props={"sinSubtitulos":true}`, que apaga el velo y TODO el texto editorial (el gancho, los nueve rótulos y el CTA). |
| Destino | Reels · TikTok · Shorts (orgánico) y Meta Ads / feed 1:1 (funnel) |
| Presentadora | Isabella Cadavid (HK05 caminando y hablando, 24,65-29,4 s del clip; CT05 sentada, con voz en directo) |

## Lo que dice el original, analizado (whisper local sobre su audio, el 2026-10-20) y qué se hace con ello

| s (original) | Quién | Imagen (identificada por búsqueda de fotogramas, `medidas/`) | Qué pasa en esta pieza |
|---|---|---|---|
| 0,1-3,0 | **off** («¿Pagarías 14 millones al mes por vivir aquí?») | HK05 (`Img 9508`) ≈ 5,2-7,8 s: Isabella camina hacia cámara | HK05 de **26,13 a 30,33 s con SU VOZ EN DIRECTO** (la segunda toma: la primera, de 24,65 a 25,25 s, es un falso arranque y se corta) («¿Deseas arrendar **amoblado** en Medellín? Ven, te muestro.») y su subtítulo: la pregunta de los $14.800.000 ya no está |
| 3,0-13,6 | off | RC10 (`Img 9509`) 0,4-10,2 s a ×1,4: cielo → torres → **jacuzzi privado** | RC10 de 2,5 a 10,67 s a ×1, dos rótulos: «Mira lo que **incluye**:» y «**Jacuzzi** privado con vista a Medellín» |
| 13,6-24,0 | off | RC01 (`Img 9461`) 0,2-11,1 s a ×1,45 · RC22 (`Img 9538`, el bar) 0,3-2,8 s · RC03 desde 3,1 s | RC01 de 2,4 a 6,53 s «113 m² **amoblados** y equipados»; RC22 «Piscina, gimnasio, spa y **coworking**» |
| 24,0-36,0 | off | RC03 (`Img 9464`) 3,6-13,6 s a ×1 · alcoba | RC03 de 2,0 a 8,13 s: camas y torres, «Y lo que no esperabas:» |
| 36,0-47,4 | off | alcoba (RC05, la más parecida) · sala con el sofá (RC04 `Img 9469`) | RC05 de 0,4 a 6,87 s «**Aseo** semanal incluido» y «**Acompañamiento** personalizado»; RC04 «**Chef** privado y conductor a tu medida» |
| 47,4-53,2 | off | RC16 (`Img 9525`) 4,1-9,1 s: el carril de nado | RC16 de 4,3 a 9,17 s «Con la mejor **asesoría** de la ciudad» |
| 53,2-56,3 | Isabella (CT05 `Img 9501`, voz en directo) | CT05 1,5-4,0 s | CT05 con su voz (1,31-4,07 s) y su subtítulo, igual |

(Lo que el reparto decía y se corrige tras mirar los fotogramas: la cocina, la sala con la palma y la puerta del balcón son **RC01**, no RC02; la «sala con el sofá» es RC04; el «cielo» del 10-12 s y el jacuzzi son **RC10**.)

**Dos hechos del material que se mantienen:**

1. **La frase del gancho del original NO está como voz en directo.** HK05 es un clip de 32,5 s. Mirado a fondo (perfil de energía en banda de voz a 0,25 s y whisper a +22 y +25 dB): de 3,25 a 5,5 s el audio es **silencio digital exacto** (−140 dB, un tramo editado) y en 5,75-6,5 s hay **un chasquido de 0,75 s a −33 dB** (whisper lo transcribe «gracias a todos»: es una alucinación sobre un ruido). La frase del original era locución en off sobre su imagen. Su única voz está en 24,65-29,4 s (otra frase; se usa la segunda toma, desde los 26,36 s), y es la que se usa por decisión del usuario.
2. **La alcoba del original no coincide con ninguno de los 22 clips del SSD** (la búsqueda de fotogramas da error 0,3 frente a ≈ 0 en los demás): el editor tuvo otro clip; se usa **RC05, el más parecido**, y se declara.

## Promesa y CTA

- **Promesa (primeros 4,2 s):** Isabella caminando hacia cámara en el balcón con la vista detrás y **diciendo** «¿Deseas arrendar amoblado en Medellín? Ven, te muestro.» (**el frame 0 es ella**: excepción declarada a la regla fija 1, porque la réplica abre así; f0 limpio, primera sílaba en el f7 con su subtítulo). Es el mismo tramo y la misma frase que usa el gancho del 051: se declara.
- **Acción final:** «Si buscas más que un apartamento para vivir, escríbenos.» (CT05, voz en directo; la misma toma cierra la 052: declarado). Sin sello ni cuenta; cierra la tarjeta oscura con el logo y la web.
- **Lo que NO se cuenta:** administración, condiciones del contrato, minutos a ningún sitio, la venta de la unidad, valorización ni rentabilidad, y que el chef o el transporte vayan incluidos en el canon.

## Escenas (los rótulos del reparto §5c, tal cual)

| # | Tramo (s) | Hero | Texto | Cae en (golpe de *Softly*) |
|---|---|---|---|---|
| 0 | 0,2-4,2 | Isabella | **dice**: ¿Deseas arrendar **amoblado** en Medellín? Ven, te muestro. | entra con el f0 (la canción en su calma, bajo su voz) |
| 1 | 4,2-8,4 | el cielo | Mira lo que **incluye**: | 50,93 s · 12,2 dB (el golpe que sale del respiro) |
| 2 | 8,4-12,3 | el jacuzzi privado | **Jacuzzi** privado con vista a Medellín | 55,18 s · 10,2 dB |
| 3 | 12,3-16,5 | cocina y sala | 113 m² **amoblados** y equipados | 59,08 s · 6,9 dB |
| 4 | 16,5-21,2 | bar y balcón | Piscina, gimnasio, spa y **coworking** | 63,22 s · 15,7 dB (y el plano de las camas, 65,67 s · 9,5 dB) |
| 5 | 21,2-25,0 | las torres | Y lo que no esperabas: | 67,91 s · 6,6 dB |
| 6 | 25,0-28,5 | la alcoba | **Aseo** semanal incluido | 71,77 s · 6,7 dB |
| 7 | 28,5-31,5 | la pared del televisor | **Acompañamiento** personalizado | 75,26 s · 14,4 dB |
| 8 | 31,5-35,7 | la sala | **Chef** privado y conductor a tu medida | 78,25 s · 6,5 dB |
| 9 | 35,7-40,5 | el carril de nado | Con la mejor **asesoría** de la ciudad | 82,42 s · 6,7 dB |
| 10 | 40,5-44,4 | Isabella | CT05 a cámara (voz) | 87,30 s · 10,5 dB (la toma entra en él; la música baja después) |
| 11 | 44,5-46,5 | marca | tarjeta oscura: logo y web | — |

## Decisiones tomadas (y las descartadas)

- **Réplica = mismo orden y mismas tomas.** Cada plano del original se identificó contra los clips del material (búsqueda de fotogramas a 54×96 sobre todos los recorridos): RC10, RC01, RC22, RC03, RC04 y RC16 coinciden exactamente (error ≈ 0); el gancho (HK05), en la escena y el vestuario, no al fotograma (ella se mueve). La puerta comprueba el orden (`ORDEN_DEL_ORIGINAL`) y el texto de cada rótulo tal cual el reparto.
- **«113 m²» es la única cifra en pantalla** (el rótulo 3, texto del usuario, escrito tal cual). El reparto decía que la cifra del gancho sería «la ÚNICA de la pieza» y a la vez daba ese rótulo «tal cual»: al cambiar el gancho a su voz, la cifra de $14.800.000 desaparece y queda esta. La puerta la exige exacta y no admite otra. Si el usuario prefiere quitarla, es una línea en `subtitulos-053.ts` y `ROTULOS` de la puerta.
- **El gancho repite el del 051** (mismo tramo, misma voz, misma frase): por decisión del usuario; el reparto pedía otro tramo de HK05. La 052 usa HK04 y no se ve afectada. La coordinadora tiene que saberlo para decidir si el 051 cambia de gancho.
- **Palabras POR CONFIRMAR AL OÍDO: «amoblado» y «Medellín» del gancho** (whisper small, sobre una toma a −26 dBFS con eco, oye «a moblado en» y «de la media»): el texto es el del reparto y el del vídeo editado; el usuario las oirá en la prueba y la puerta con `--final` falla mientras la nota esté.
- **Los cambios de plano y de rótulo caen en golpes medidos de *Softly*.** Entra a los 47,367 s: su calma (−24 LUFS) bajo el gancho, y el golpe de entrada al tramo fuerte (50,93 s, 12,2 dB, tras un respiro de −28 LUFS) en el cambio del gancho al cielo. Una canción sin pulso no da una rejilla densa: la mejor combinación de duraciones de rótulo (2,8-5,0 s) se buscó con un DP sobre sus golpes y queda en **seis golpes de ≥ 9,5 dB y cinco de 6,5-6,9 dB** (se declara en la puerta). La música pesa más: solo baja bajo la voz del CTA.
- **El original acelera RC10 ×1,4 y RC01 ×1,45**: aquí van a ×1 (`velocidad` solo se admite en el bloque 3) y los tramos se recortan a lo que dura cada rótulo.
- **El rótulo «ah pero los aviones están feos»** del original (≈ 20 s, sobre el bar) es un error de su subtitulado automático: no se replica.
- **Todo con disolvencias de 12 f** (opacas en el golpe): *Softly* no tiene golpes seguidos donde cortar en seco (R33).
- **Descartado:** abrir con la casa sin voz (regla fija 1: el original abre con Isabella y se replica; declarado), la locución (ver «Historia del encargo»), y `velocidad` ×1,4 (regla del bloque 5).
