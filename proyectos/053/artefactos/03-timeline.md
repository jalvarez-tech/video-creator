# 03 · Timeline — proyecto 053 (V35 «¿Pagarías 14 millones?», réplica de `03.mp4`)

> Paso 3 de 3. La línea de tiempo con lo medido. Anterior: [02-layout.md](02-layout.md). De aquí salen `metraje-053.ts`, `audio-053.ts` y `subtitulos-053.ts`, no al revés.
> **⚠️ Los tiempos de la LOCUCIÓN son los de la PISTA GUÍA** (`original/off.wav`: voz de sistema `Paulina` estirada ×1,085 para igualar el ritmo del original, 52,7 s). Con la locución real (los audios que entregue el usuario o la voz clonada de Isabella en ElevenLabs) se repiten: `limites-voz.py` sobre el WAV, `transcribir.mjs --palabras`, `trozos-editoriales.mjs` y los `en` de `P` en `metraje-053.ts` (cada cambio de plano cae en la palabra de abajo). 1766 f a 30 fps (58,87 s).

## Los planos (`metraje-053.ts`)

`desde` = segundo de la fuente NORMALIZADA (anamórfica 81:256 escalada entera a 1296×2304, sin recorte). `en`/`dur` en frames de la composición. Todos los planos, salvo c01, entran con una **disolvencia de 12 f** (el plano empieza 12 f antes de su `en` y es opaco en él). El original (`03.mp4`) se identificó plano a plano (`medidas/busqueda-fotogramas.txt`).

| # | Plano | Bloque | Espacio | Función | Clip y tramo | `desde` (s) | `en` | `dur` | Cae en la palabra | Original (s) |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | c01-hook | 2 | Balcón (Isabella) | la promesa: la pregunta | HK05 `Img 9508` 4,3-8,0 s | 4,27 | 0 | 112 | — (voz desde f7) | 0,0-3,3 |
| 2 | c02-cielo | 5 | Balcón: cielo, torres, jacuzzi privado | imaginar el día aquí | RC10 `Img 9509` 0,5-10,3 s | 0,5 | 112 | 294 | «Imagina» | 3,3-12,0 (×1,4) |
| 3 | c03-cocina | 5 | Cocina → sala con la palma → puerta del balcón | lo amoblado, la cocina integral | RC01 `Img 9461` 0,6-7,1 s | 0,6 | 406 | 196 | «Viene» | 12,0-19,0 (×1,45) |
| 4 | c04-bar | 5 | Bar | listo para vivir | RC22 `Img 9538` 0,4-3,1 s | 0,4 | 602 | 84 | «equipada» | 19,0-22,9 |
| 5 | c05-balcon | 5 | Balcón: camas, torres, cielo | la vista, las amenidades | RC03 `Img 9464` 2,0-15,1 s | 2,0 | 686 | 392 | «secadora» | 22,9-33,0 |
| 6 | c06-alcoba | 5 | Alcoba principal | lo privado, lo seguro | RC05 `Img 9477` 0,4-7,7 s (el más parecido) | 0,4 | 1078 | 220 | «salón social» | 33,0-41,7 |
| 7 | c07-sala | 5 | Sala (sofá gris, listones) | el entorno, la privacidad | RC04 `Img 9469` 0,5-5,8 s | 0,5 | 1298 | 159 | «en el sector» | 41,7-47,4 |
| 8 | c08-piscina | 5 | Carril de nado | tranquilidad y comodidad | RC16 `Img 9525` 4,2-9,1 s | 4,2 | 1457 | 146 | «Todo» | 47,4-53,3 |
| 9 | c09-cta | 6 | Sala (silla) | la invitación | CT05 `Img 9501` 1,27-4,7 s | 1,2667 (38 f) | 1603 | 103 | f1604-1687 | 53,3-56,4 |
| 10 | c10-cierre | 6 | Tarjeta oscura | la marca (logo y web) | `cierre-oscuro.png` | — | 1706 | 60 | — | — |

Paseo (de arriba abajo): **balcón (Isabella)** → cielo y jacuzzi → cocina → bar → balcón y torres → alcoba → sala → piscina → **sala (Isabella)**. Es el del original: no sigue el orden físico de la casa (`viaje-emocional.md` §2: el original abre por el balcón, vuelve a él y acaba en la piscina), y la réplica manda.

## La locución (pista guía: `voz/off.json`, `proyectos/053/voz/off-marcado.txt`)

| Frase | Texto | Voz (s del archivo) | En la comp (en = 6 f) |
|---|---|---|---|
| gancho | ¿Pagarías catorce millones al mes por vivir aquí? | 0,04 → 3,06 | f7-98 |
| f1 | Imagina terminar tu día relajándote en tu jacuzzi privado, preparando un trago en tu propio hogar y disfrutando de la mejor vista de la ciudad de Medellín. | 3,43 → 12,89 | f109-393 |
| f2 | Viene completamente amoblado: dos habitaciones, dos baños, cocina integral totalmente equipada y zona de lavandería con lavadora y secadora. Listo para mudarte. | 13,25 → 24,72 | f404-748 |
| f3 | Además, puedes disfrutar de excelentes amenidades: piscina, gimnasio, zonas húmedas, coworking, cancha de squash, zona de barbecue, salón social y zonas de bienestar. | 25,08 → 37,97 | f758-1145 |
| f4 | Y lo mejor es que cuentas con seguridad veinticuatro siete, la mejor ubicación en el sector de Las Palmas y la privacidad que buscas en un entorno natural. | 38,32 → 47,82 | f1156-1441 |
| f5 | Todo en este apartamento está pensado para tu tranquilidad y comodidad. | 48,23 → 52,67 | f1453-1586 |
| CTA (CT05, voz de Isabella) | Si buscas más que un apartamento para vivir, escríbenos. | 1,31 → 4,07 | f1604-1687 |

Pausas entre frases: 0,35-0,41 s (≈ 10-12 f) y 18 f entre la locución y el CTA. **La música, por eso, es un lecho** (no hay hueco para subir y bajar). Voz tratada a −15,0 LUFS (CT05 +20,4 dB tras el compresor 3,5:1, el limitador quita 0,5 dB; pico −2,5 dBFS).

## La música (*Softly*, `musica/`, medida con `medir-pista.py` y ebur128)

| Tramo de la canción | LUFS | Aquí |
|---|---|---|
| 143,2-146 s | −19 → −15 (subida) | el gancho y el inicio del cielo |
| 147,33 s | golpe de 10,6 dB | f126: dentro del plano del cielo y el jacuzzi |
| 147,5-195,5 s | −11,5 (meseta, pico −0,2) | el recorrido entero |
| 196,2 s | caída: −10,7 → −23 en 4 s | f1592: entre la última palabra de la locución (f1586) y la primera del CTA (f1604) |

Entra a los 143,167 s (frame 4295 de la canción). Ganancia: lecho de −14,5 dB (la meseta queda a −26 LUFS, 11 LU bajo la voz; picos de 1 s a −24,1, 9,1 LU), **sigue la caída bajo el CTA** (de −12 a −4 dB conforme la canción baja) y se apaga con curva de coseno bajo la tarjeta, a cero 2 f antes del final.

## Lo que queda por decidir con el usuario

1. **La locución** (reparto §3): ¿entrega los audios o se genera con la voz clonada de Isabella en ElevenLabs (769 caracteres, de pago)?
2. **«en tu propio hogar» o «en tu propio bar»** (≈ 9,2 s del original): mi whisper por palabra dice «hogar»; el rótulo automático del original, «bar».
3. **«24/7» con letras** en pantalla («seguridad veinticuatro siete») porque la única cifra es la del gancho: ¿o en dígitos?
