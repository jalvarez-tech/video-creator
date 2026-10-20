# 01 · Plan narrativo — proyecto 053 · Tierra Grata Bosque Santo (El Poblado), ARRIENDO, V35 («¿PAGARÍAS 14 MILLONES?»), réplica de `03.mp4`

> Paso 1 de 3. Escrito con el reparto de la sesión coordinadora (`proyectos/044/reparto-051-053.md`, tabla «03» de §1b y fila 053 de §2), el catálogo del material (`proyectos/044/catalogo-material.md`, sobre todo §7: anamórfico), `reparto-045-050.md` (formatos, reglas, protocolo) y la pieza de referencia 047 (`normalizar.mjs`, `combinaciones.md`, `aprendizajes.md`). Escrito **antes** del primer render. Siguiente: [02-layout.md](02-layout.md).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Pedido | «Analiza los vídeos que hay en `videos editados` y replícalos con las mismas tomas, pero con los 2 formatos. Selecciona música diferente a los 6 pasados» (2026-10-20). Esta sesión es la **V35 / 053**: la réplica de `videos editados/03.mp4` (1080×1920, HEVC, 30 fps, **56,43 s**), con las mismas tomas, en el mismo orden y con el mismo texto, en el formato del canal (`recorrido-luxur`) y en sus DOS formatos (orgánico con subtítulos editoriales y funnel con ficha). |
| Numeración | **V35 / 053.** Las V33/051 y V34/052 son las otras dos réplicas (sesiones hermanas, mismo reparto). La reserva de la V35 y de *Softly* ya estaba en `archivos/musica/registro-de-uso.md` (alternativa: *Cornfield Chase*; ninguna otra). |
| La propiedad y la ficha | **Tierra Grata Bosque Santo**, El Poblado, Medellín, «a pocos metros de la Avenida Las Palmas». **ARRIENDO tradicional: COP 14.800.000 al mes.** 113 m² · 2 habitaciones · 2 baños · 2 parqueaderos · piso 9 · amoblado · balcón con **jacuzzi privado**. La unidad: carril de nado, zonas húmedas, gimnasio, Spa Romano, squash, coworking, BBQ, Social Kitchen, salón social. **La voz del original dice datos que la ficha de la web no da** (lavadora y secadora, seguridad 24/7, cancha de squash, «completamente amoblado», «cocina totalmente equipada»): se repiten tal cual porque son del usuario (reparto §1, «lo que se hereda de los originales y se declara»). La misma unidad está en venta: **la pieza no la nombra**. |
| Material | `Apartamento - Tierra Grata - Las Palmas/Videos/` (`1 Hooks`, `4 Recorrido`, `5 Cta`), copiado a `proyectos/053/original/` con el CÓDIGO como nombre. sha256 en `normalizar.mjs`: HK05 `3bbed39e`, CT05 `5bc7d1a0`, RC10 `e7e4ee8b`, RC01 `9f23d5be`, RC22 `33ac8ce2`, RC03 `e5dd0f12`, RC05 `931b51dd`, RC04 `c6cd691d`, RC16 `7cdf817e`, música `87d78dc2` (*Softly*, el mismo archivo que reserva el registro). |
| **TODO el material es ANAMÓRFICO** | HK05, CT05 y los siete recorridos: 1920×1080 SDR con **SAR 81:256 y DAR 9:16** = verticales de 608×1080 efectivos comprimidos a lo ancho (comprobado con `ffprobe` el 2026-10-20). Se escalan ENTEROS a 1296×2304 con `setsar=1`, **sin recorte** (`normalizar.mjs`, la receta del 047). Salen **más blandos que Isabella en 4K** (×2,13): se dice, no se filtra. No hay dron. |
| Composición | `Recorrido053` · 1080×1920 · **30 fps** · ≈ 59 s (ver 03-timeline). Clips a 1296×2304 y 30 fps constantes. |
| Formato | 9:16 · `recorrido-luxur` **adaptado a la réplica**: bloques 2 (gancho) · 5 (recorrido con la locución en off) · 6 (CTA a cámara + tarjeta oscura); sin los bloques 1, 3 ni 4 (el original no los tiene) |
| Marca / texto | Luxur, texto **editorial** (abajo, 90 %, cursiva 8 px menor) de TODO lo que suena; **sin sello**; cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com`. La versión con ficha (`ficha-luxur`) va SIN subtítulos y con `APARTAMENTO EN RENTA · El Poblado · Tierra Grata · $ 14,8 M COP / MES` fijo. |
| Destino | Reels · TikTok · Shorts (orgánico) y Meta Ads / feed 1:1 (funnel) |
| Presentadora | Isabella Cadavid (HK05 caminando, sin voz propia; CT05 sentada, con voz) |

## Lo que dice el original, analizado (whisper local sobre su audio, el 2026-10-20)

| s (original) | Quién | Texto | Imagen (identificada por búsqueda de fotogramas, `medidas/`) |
|---|---|---|---|
| 0,1-3,0 | **off** | ¿Pagarías 14 millones al mes por vivir aquí? | HK05 (`Img 9508`) ≈ 5,2-7,8 s: Isabella camina hacia cámara en el balcón |
| 3,0-13,6 | off | Imagina terminar tu día relajándote en tu jacuzzi privado, preparando un trago en tu propio **hogar** y disfrutando de la mejor vista de la ciudad de Medellín. | RC10 (`Img 9509`) 0,4-10,2 s a ×1,4: cielo → torres → **jacuzzi privado** |
| 13,6-24,0 | off | Viene completamente amoblado: dos habitaciones, dos baños, cocina integral totalmente equipada y zona de lavandería con lavadora y secadora. Listo para mudarte. | RC01 (`Img 9461`) 0,2-11,1 s a ×1,45 (cocina → sala con la palma → puerta del balcón) · RC22 (`Img 9538`, el bar) 0,3-2,8 s · RC03 desde 3,1 s |
| 24,0-36,0 | off | Además, puedes disfrutar de excelentes amenidades: piscina, gimnasio, zonas húmedas, coworking, cancha de squash, zona de barbecue, salón social y zonas de bienestar. | RC03 (`Img 9464`) 3,6-13,6 s a ×1: balcón con las camas → torres → cielo · alcoba |
| 36,0-47,4 | off | Y lo mejor es que cuentas con seguridad 24/7, la mejor ubicación en el sector de Las Palmas y la privacidad que buscas en un entorno natural. | alcoba (RC05, la más parecida) · sala con el sofá (RC04 `Img 9469`) |
| 47,4-53,2 | off | Todo en este apartamento está pensado para tu tranquilidad y comodidad. | RC16 (`Img 9525`) 4,1-9,1 s: el carril de nado |
| 53,2-56,3 | Isabella | Si buscas más que un apartamento para vivir, escríbenos. | CT05 (`Img 9501`) 1,5-4,0 s: sentada en la silla de la sala |

(Lo que el reparto decía y se corrige tras mirar los fotogramas: la cocina, la sala con la palma y la puerta del balcón son **RC01**, no RC02; la «sala con el sofá» es RC04; el «cielo» del 10-12 s y el jacuzzi son **RC10**, y el cielo con la ciudad del 28-33 s es el final de **RC03**, no RC10.)

## Dos hechos que cambian cómo se monta

1. **El gancho NO es voz en directo.** HK05 es un clip de 32,5 s. Mirado a fondo (perfil de energía en banda de voz a 0,25 s y whisper a +22 y +25 dB): de 3,25 a 5,5 s el audio es **silencio digital exacto** (−140 dB, un tramo editado) y en 5,75-6,5 s hay **un chasquido de 0,75 s a −33 dB** (whisper lo transcribe «gracias a todos»: es una alucinación sobre un ruido). La frase «¿Pagarías 14 millones al mes por vivir aquí?» (≈ 3 s de voz) no está. Es **locución en off sobre su imagen**, como el original (cuya voz del gancho es la misma de la locución). Va con las demás frases.
2. **La locución larga no existe como archivo.** El SSD no tiene `Audios/` de esta propiedad, y sacarla del MP4 editado no vale (lleva la música vieja debajo). El usuario decide (reparto §3): **(1)** entrega los audios o **(2)** se genera con la voz clonada de Isabella en ElevenLabs (cuesta dinero: 769 caracteres; se confirma antes). **Mientras no haya decisión, `original/off.wav` es una PISTA GUÍA** (voz de sistema `Paulina`, `say`, estirada ×1,085 para igualar el ritmo del original): sirve para calibrar planos, subtítulos y música; **no es la locución final y no se exporta nada con ella**.

## Promesa y CTA

- **Promesa (primeros 3,7 s):** Isabella caminando hacia cámara en el balcón con la vista detrás (**el frame 0 es ella**: excepción declarada a la regla fija 1, porque la réplica abre así) y la pregunta «¿Pagarías 14 millones al mes por vivir aquí?». El subtítulo pinta lo que dice: **«14 millones»** (la ÚNICA cifra en pantalla); el canon exacto, 14,8, va en la ficha de la versión con ficha. Se declara: la cifra del gancho (14) no es el canon (14,8).
- **Acción final:** «Si buscas más que un apartamento para vivir, escríbenos.» (CT05, la misma toma que cierra la 052: declarado). Sin sello ni cuenta; cierra la tarjeta oscura con el logo y la web.
- **Lo que NO se cuenta:** administración, condiciones del contrato, minutos a ningún sitio, la venta de la unidad, valorización ni rentabilidad. «Amoblado» y «cocina totalmente equipada», «lavadora y secadora», «seguridad 24/7» y «cancha de squash» son lo que dice la voz del original (suyos: se repiten).

## Escenas

| # | Tramo (s, guía) | Hero | Idea | Frase |
|---|---|---|---|---|
| 1 | 0,0-3,7 | Isabella | ella llega caminando; la pregunta | «¿Pagarías 14 millones al mes por vivir aquí?» |
| 2 | 3,7-13,5 | la vista | cielo → torres → **jacuzzi privado** | «Imagina terminar tu día relajándote en tu jacuzzi privado, … la mejor vista de la ciudad de Medellín.» |
| 3 | 13,5-20,1 | apartamento | cocina → sala con la palma → puerta del balcón | «Viene completamente amoblado: dos habitaciones, dos baños, cocina integral …» |
| 4 | 20,1-22,9 | apartamento | el bar | «… totalmente equipada y zona de lavandería con lavadora y secadora.» |
| 5 | 22,9-35,9 | el balcón | las camas, las torres, el cielo | «Listo para mudarte. Además, puedes disfrutar de excelentes amenidades: …» |
| 6 | 35,9-43,3 | apartamento | la alcoba y su pared con el televisor | «salón social y zonas de bienestar. Y lo mejor es que cuentas con seguridad 24/7, la mejor ubicación …» |
| 7 | 43,3-48,6 | apartamento | la sala con el sofá gris | «en el sector de Las Palmas y la privacidad que buscas en un entorno natural.» |
| 8 | 48,6-53,5 | la unidad | el carril de nado | «Todo en este apartamento está pensado para tu tranquilidad y comodidad.» |
| 9 | 53,5-56,9 | Isabella | el CTA a cámara | «Si buscas más que un apartamento para vivir, escríbenos.» |
| 10 | 56,9-58,9 | marca | tarjeta oscura: logo y web | — |

## Decisiones tomadas (y las descartadas)

- **Réplica = mismo orden, mismo texto, mismas tomas.** Cada plano del original se identificó contra los clips del material (búsqueda de fotogramas a 54×96 sobre todos los recorridos): RC10, RC01, RC22, RC03, RC04 y RC16 coinciden exactamente (error de ≈ 0); el gancho (HK05) coincide en la escena y el vestuario, no al fotograma (ella se mueve). **La alcoba del original no coincide con ninguno de los 22 clips** (mejor candidato RC05, error 0,3): el editor tuvo otro clip (no copiado al SSD); se usa **RC05, el más parecido**, y se declara.
- **El original acelera RC10 ×1,4 y RC01 ×1,45** (para encajar su locución); aquí van a ×1: `velocidad` solo se admite en el bloque 3 y la locución nuestra dura lo que dura. Los tramos se eligen para encajar con las frases.
- **Todo con disolvencias de 12 f**: *Softly* no tiene pulso ni golpes seguidos donde cortar en seco (R33), y la voz continua de la locución manda los cambios de plano.
- **El rótulo «ah pero los aviones están feos»** del original (≈ 20 s, sobre el bar) es un error de su subtitulado automático: no se replica.
- **«propio hogar» o «propio bar»** (≈ 9,2 s del original): mi transcripción por palabra del audio dice «hogar»; el rótulo automático del original dice «bar». Se usa «hogar» (el reparto y mi whisper) y **se pregunta al usuario antes de la final**.
- **La duración (≈ 59 s) supera los 55 s del formato** y la locución larga rompe el límite de «voz en off solo en el bloque 5»: lo manda la réplica (declarado en la puerta: `TOPE_SEGUNDOS`).
- **Descartado:** abrir con la casa sin voz (regla fija 1: el original abre con Isabella y se replica; declarado), sacar la locución del MP4 editado (lleva la música vieja), y `velocidad` ×1,4 (regla del bloque 5).
