# 03 · Timeline — proyecto 062

> Paso 3 de 3. Anterior: [02-layout.md](02-layout.md). De aquí salen `metraje-062.ts`, `audio-062.ts` y `subtitulos-062.ts` (y no al revés). 30 fps; `en` y `dur` en frames de la composición; `desde` en segundos del clip normalizado.

## Planos (la columna «espacio» leída de arriba abajo es un paseo de la azotea al estudio sin volver atrás, y el balcón con el barrio, el último antes del CTA)

| # | Plano | Bloque | Espacio | Función | Clip | `desde` (s) | `en` | `dur` | Entra | Golpe (s de la canción · dB) |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | c01-azotea | 1 | la azotea: el skyline y las montañas | situar / prometer | ZC29 | 3,45 | 0 | 95 | corte | 6,995 · 21,1 (suena en f3,5) |
| 2 | c02-hook | 2 | la azotea, junto al ascensor | emocionar (el dato de mercado) | HK02 | 0,000 | 95 | 145 (todo el clip) | corte | 10,038 · 13,5 |
| 3 | c03-jacuzzi | 3 | el jacuzzi con el skyline | revelar (lo que el edificio ofrece) | ZC10 | 0,40 | 240 | 63 | disolver | — (el hook dura todo su clip) |
| 4 | c04-pergola | 3 | la pérgola abierta a las montañas | cómo se vive (la azotea entera) | ZC21 | 2,10 | 303 | 91 | corte | 16,994 · 11,9 |
| 5 | c05-juntas | 3 | la sala de juntas (coworking) | valor (la otra amenidad, ya bajo techo) | ZC06 | 1,00 | 394 | 89 | corte | 20,004 · 10,8 |
| 6 | c06-mitad | 4 | la entrada del estudio | emocionar (el barrio, dicho) | MD02 | 0,400 (12 f) | 483 | 155 | disolver | 22,983 · 20,2 |
| 7 | c07-cama | 5 | el estudio: la cama y los listones | revelar (lo que se compra) | RC12 | 0,40 | 638 | 86 | disolver | 28,154 · 9,0 |
| 8 | c08-cocina | 5 | el estudio: el escritorio y la cocina | valor (todo resuelto en 24 m²) | RC04 | 0,40 | 724 | 88 | corte | 31,002 · 8,1 |
| 9 | c09-balcon | 5 | el balcón con el barrio y, al entrar, la tele y la cama | emocionar (el clímax, el plano más largo) | RC18 | 0,00 | 812 | 122 | corte | 33,956 · 8,5 |
| 10 | c10-cta | 6 | el escritorio del estudio | invitar | CT02 | 0,800 (24 f) | 934 | 145 | disolver | 38,003 · 11,3 |
| 11 | c11-cierre | 6 | — | tarjeta oscura (logo y web) | foto | — | 1079 | 60 | corte | — |

Total: **1139 f = 38,0 s**. (Rev. 2: el hook usa TODO su clip —145 f— para que el vídeo siga un momento tras «Latinoamérica»; el jacuzzi entra 12 f más tarde y dura 63 f.) Planos mudos (el sonido va en `audio-062.ts`), salvo las tomas de Isabella (`audio` + `voz`). Los que entran disolviendo se ven 12 f antes de su `en` (el plano anterior dura hasta él).

## La voz (frames de la composición; s0/s1 medidos por energía, 20 ms, banda de voz)

| Toma | Su voz en el clip (s) | Primera palabra | Última palabra | Música: golpe de entrada → fin de la bajada | Música: sube |
|---|---|---|---|---|---|
| c02-hook (HK02) | 0,52 – 4,08 (la voz tratada se apaga de 4,05 a 4,15 s) | f110,6 | f217 | f95 → f105 | f223 → f238 (se queda baja 6 f tras la palabra; la salida del hook disuelve de f228 a f240) |
| c06-mitad (MD02) | 0,86 – 5,00 | f496,8 | f621 | f483 → f493 | f621 → f636 (el estudio disuelve de f626 a f638) |
| c10-cta (CT02) | 1,23 – 5,40 | f946,9 | f1072 | f934 → f944 | f1072 → f1137 **baja** hasta cero (la música se apaga bajo la tarjeta) |

## El texto (subtítulos editoriales; ver `subtitulos-062.ts`; sin cifras y sin rótulos propios: solo la voz de Isabella)

| Bloque | Frames | Texto | Acento |
|---|---|---|---|
| h01 | 110-158 | Medellín, ya es (f110) / el tercer mercado (f134) | — |
| h02 | 160-226 | más grande de (f160) / **renta corta** (f180) / de Latinoamérica. (f195) | renta corta |
| m01 | 496-555 | **Laureles** (f496) / es uno de los (f508) / mejores barrios (f535) | Laureles |
| m02 | 557-626 | con mayor ocupación (f557) / en la ciudad de Medellín. (f587) | — |
| c01 | 946-998 | ¿Y tú qué esperas (f946) / para conocerlo? (f971) | — |
| c02 | 1000-1078 | Haz clic en el enlace (f1000) / **y agendemos** (f1028) / una visita. (f1050) | y agendemos |

## La música

«In This Together» desde los 6,933 s (`INICIO_MUSICA` = 208/30): su golpe de 21,1 dB (6,995 s) abre la pieza en el f3. Sola a −17,2 · −16,4 · −15,0 LUFS por tramos (apertura +6,0 dB, paseo +5,0 dB, estudio −0,9 dB sobre el archivo; la apertura y el paseo, limitados por el pico), −26 LUFS bajo la voz. La canción **no cae sola** en esta sección: tras la última palabra del CTA (f1072) se apaga con curva de coseno hasta el f1137, 2 f antes del final.
