# 01 · Plan narrativo — proyecto 100 «Lo harás otra vez»

> Paso 1 de 3. Siguiente: [02-layout.md](02-layout.md). Escrito el 2026-11-22 (sesión hija de la del 097).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Material | el del 097 (Fundación MAS · Casa Sobre la Roca, tarde de Navidad del 2026-11-20), ya normalizado en `remotion/public/mas-097/` (solo lectura) |
| Música | «Lo harás otra vez» (Elevation Worship, **pista**): `archivos/musica/Lo harás otra vez - Elevation Worship (pista).mp3`, sha256 `d4a80d50`, 410,0 s, 87 BPM |
| Composición | `OtraVez100` · 1920×1080 · **30 fps** · **1800 f (60,0 s)** |
| Formato | 16:9 horizontal (montaje, sin avatar) |
| Estilo | redes con alma: cortes en golpes, entradas cortas; el papel rasgado del 097 |
| Texto | tiras de papel con lo que dicen las niñas entre «» · SIN voz en off |
| Destino | iglesias y redes de MAS (como el 097) |
| Objetivo | que quien lo vea sienta la ALEGRÍA de esa tarde y la esperanza que trae un regalo, y sepa cómo dar uno |

## Ángulo: alegría y esperanza

La canción no lleva voz cantada (whisper sobre 10 tramos de 30 s: solo «[Música]» / «upbeat music»; sin oír). Se usa su ÚLTIMO
clímax, de corrido: **318,641 → 378,641 s** de la pista. Sus partes mandan el orden de las escenas:

| Parte de la canción | Pista (s) | Frames | Sonoridad cruda | Qué pasa |
|---|---|---|---|---|
| ruptura (casi a solas, suave) | 318,6–327,4 | 0–262 | −26,6 LUFS | la bienvenida y el sueño: se oye cada palabra |
| subida (redoble) | 327,4–336,6 | 262–538 | −15,7 | los deseos, que se pegan en golpes; los regalos |
| pleno | 336,6–361,7 | 538–1292 | −10,4 | la alegría: tobogán, lema, «¡Dios es bueno!», los drones que suben y el clímax |
| bajada | 361,7–368,3 | 1292–1491 | −15,4 | el atardecer: el respiro |
| outro | 368,3–378,6 | 1491–1800 | −23,0 | el papel: cómo ayudar |

**Lo que NO se cuenta** (es de las otras dos piezas): el testimonio de VT07 y la respuesta de VT06 (098, «Tu Estás Aquí»), HZ17
«a Cristo en mi vida» y las cualidades de HZ05 (099, «A Tus Pies»). Aquí no hay pregunta del hook ni voz en off.

## Escenas

| # | Frames | Narrativa | Idea | Hero |
|---|---|---|---|---|
| 1 | 0–287 | hook | te abren la puerta de su casa y una niña cuenta su sueño | la tira |
| 2 | 287–538 | contexto | lo que piden de Navidad, pegado en golpes… y los regalos en alto | las pegatinas |
| 3 | 538–789 | explicación | la alegría: «¡Feliz Navidad para todos!», el lema de MAS, «¡Dios es bueno!» | la tira / el grito |
| 4 | 789–1124 | revelación | el dron sube sobre la comunidad que saluda | la imagen |
| 5 | 1124–1292 | clímax | «¡Gracias a Dios por la Navidad!» con los brazos arriba | el hero de papel + la estrellita |
| 6 | 1292–1491 | conclusión | el atardecer: «Ellas reciben su regalo gracias a MAS Estrellitas.» | la tira índigo |
| 7 | 1491–1800 | cta | el papel compacto: la meta, los tres pasos, la cuenta y los logos MAS · CSR | el papel |

## Reglas del encargo (van a la puerta `revisar-100.mjs`)

- Ningún nombre de niña audible; nunca VT32 ni VT19; nunca la voz del usuario ni el «¡tres!» de quien graba (HZ20 0,0–0,3 · HZ32 0,2–0,6).
- La música entera y de corrido: un solo `desde` continuo de f0 a f1800, nunca calla, fundido coseno al final.
- Cada corte seco a ≤ 2 f de un golpe medido ≥ 9 dB.
- La cuenta, dígito a dígito como `CUENTA` del 097.
- «la Nuestra» se oye y se lee (HZ20): **POR CONFIRMAR CON MAS** (aviso; error con `--final`). La fecha del 20 de noviembre NO sale.
