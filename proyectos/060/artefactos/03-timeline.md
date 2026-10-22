# 03 · Timeline — proyecto 060 (rev. 2)

> Paso 3 de 3. Anterior: [02-layout.md](02-layout.md). De aquí salen `metraje-060.ts`, `audio-060.ts`, `subtitulos-060.ts` e `infografia-060.ts` (y no al revés). 30 fps; `en` y `dur` en frames de la composición; `desde` en segundos del clip normalizado.
> **Rev. 2 (2026-10-22):** el usuario pidió que la infografía «no pase tan rápido» y que las cifras no se animen. La infografía pasa de 10 s a 14 s (+3,7 s con el panel de la utilidad sobre la vista) y el bloque 5 se rehace: cuatro planos de fondo que se funden bajo el velo y la vista al final; la pieza pasa de 47,4 s a **54,7 s** y el CTA se desplaza +221 f.

## Planos (la columna «espacio» leída de arriba abajo es un paseo sin volver atrás, y la vista, la última antes del CTA)

| # | Plano | Bloque | Espacio | Función | Clip | `desde` (s) | `en` | `dur` | Entra | Golpe (s de la canción · dB) |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | c01-rooftop | 1 | rooftop: el jacuzzi con la ciudad | situar / prometer | ZC07 | 0,30 | 0 | 92 | corte | 154,614 · 16,4 (suena en f3) |
| 2 | c02-hook | 2 | el estudio (de pie, el balcón al fondo) | emocionar (el dinero) | HK03 | 0,400 (12 f) | 92 | 240 | disolver | 157,453 · 15,5 (f88: cruza la disolvencia) |
| 3 | c03-bano | 3 | el baño | situar (lo que se alquila: el estándar de un hotel) | RC16 | 0,30 | 332 | 112 | corte | 165,583 · 20,4 |
| 4 | c04-cocina | 3 | la cocina equipada | cómo se vive (todo está) | RC05 | 1,20 | 444 | 95 | corte | 169,313 · 14,5 |
| 5 | c05-escritorio | 3 | el escritorio con los portátiles | cómo se vive (el huésped que viaja por trabajo) | RC09 | 0,30 | 539 | 80 | corte | 172,492 · 16,0 |
| 6 | c06-mitad | 4 | el estudio (de pie, la cama delante) | emocionar (los números, dichos) | MD05 | 0,900 (27 f) | 619 | 257 | disolver | 175,147 · 13,5 |
| 7 | c07-cama | 5 | la cama con el panel de listones | textura bajo la infografía (dormir bien) | RC13 | 0,50 | 876 | 105 | corte | 183,720 · 17,5 |
| 8 | c08-tele | 5 | el estudio con la tele y la planta | textura bajo la infografía (todo listo) | RC03 | 0,50 | 981 | 105 | disolver | — (frame libre) |
| 9 | c08b-sofa | 5 | la cama y el sofá | textura bajo la infografía | RC15 | 0,50 | 1086 | 105 | disolver | — (frame libre) |
| 10 | c08c-coworking | 5 | el coworking del edificio | valor (el argumento de negocio) | ZC01 | 0,50 | 1191 | 105 | disolver | — (frame libre) |
| 11 | c09-vista | 5 | rooftop: del jacuzzi a la ciudad y las montañas | emocionar (el clímax, el plano más largo) | ZC11 | 2,10 | 1296 | 126 | corte | 197,723 · 10,7 |
| 12 | c10-cta | 6 | el escritorio junto a la cocina (sentada) | invitar | CT03 | 0,533 (16 f) | 1422 | 160 | disolver | — (frame libre: no hay golpes ≥ 10 dB entre los 197,7 y los 204,8 s) |
| 13 | c11-cierre | 6 | — | tarjeta oscura (logo y web) | foto | — | 1582 | 60 | corte | — |

Total: **1642 f = 54,7 s**. Planos mudos (el sonido va en `audio-060.ts`), salvo las tomas de Isabella (`audio` + `voz`). Giro de los planos (flujo óptico): el baño y el escritorio giran a la izquierda y la cocina avanza recta; los de fondo del bloque 5 van bajo un velo negro del 80 % y se funden a un frame libre (la dirección da igual).

## La voz (frames de la composición; s0/s1 medidos por energía, 20 ms, banda de voz)

| Toma | Su voz en el clip (s) | Primera palabra | Última palabra | Música: bajada | Música: sube |
|---|---|---|---|---|---|
| c02-hook (HK03) | 0,64 – 7,97 | f99 | f319 | f88 → f98 | f319 → f330 (golpe del f332) |
| c06-mitad (MD05) | 1,31 – 9,27 | f631 | f870 | f619 → f629 | f870 → f878 (el golpe del f876 suena a −1,4 dB) |
| c10-cta (CT03) | 0,96 – 5,62 | f1435 | f1575 | f1422 → f1432 (sin golpe: frame libre) | f1575 → f1640 **baja** hasta cero (se apaga bajo la tarjeta; la canción empieza a apagarse sola hacia los 205 s) |

## El texto (subtítulos editoriales; ver `subtitulos-060.ts`)

| Bloque | Frames | Texto | Acento |
|---|---|---|---|
| h01 | 99-176 | Tu plata en el banco (f99) / pierde valor (f135) / cada mes. (f153) | — |
| h02 | 182-281 | Este estudio (f182) / de 24 metros cuadrados (f211) / en Laureles (f255) | — |
| h03 | 284-326 | ya está generando (f284) / **dólares.** (f304) | dólares. |
| m01 | 631-749 | La renta tradicional (f631) / deja el 0,5 % (f668) / de rentabilidad mensual. (f692) | — |
| m02 | 761-827 | Esta inversión (f761) / deja más del 1 %. (f795) | — |
| m03 | 830-874 | Ven, (f830) / **te muestro cómo.** (f842) | te muestro cómo. |
| c01 | 1434-1505 | Si deseas que te envíe (f1434) / la rentabilidad mensual, (f1465) | — |
| c02 | 1509-1578 | haz clic en el enlace (f1509) / **y escríbeme** (f1539) / un mensaje. (f1559) | y escríbeme |

## La infografía (`infografia-060.ts` · `Infografia060.tsx`) — rev. 2: sin recuentos, una cifra a la vez, con tiempo

Cada cifra entra **completa** (fundido de 8 f, sin recuento, subida ni latido) en un golpe medido de la canción y se queda hasta que se va su panel. Solo se mueven la barra de la ocupación y el filete dorado.

| Panel | Frames | Qué entra y cuándo (golpe de la canción · dB) | Héroe (se lee entero) |
|---|---|---|---|
| 1 · la cuenta | 876-1094 | velo negro 80 % (rampa de 8 f desde el corte a la cama) · **tarifa neta promedio por noche $190.000** f887 (184,077 s · 25,3) · **ocupación estimada 85 %** + barra dorada f930 (185,525 · 17,4) · **noches promedio ocupadas 25,5** f968 (186,790 · 23,6) · filete · **ingresos mensuales $4.845.000** f1006 (188,051 · 13,3) | ingresos mensuales: 2,5 s |
| 2 · los gastos | 1094-1296 | el panel 1 sale en 6 f · **administración −$500.000** f1094 (190,967 · 13,9) · **servicios públicos −$300.000** f1138 (192,431 · 11,0) · filete · **total gastos contemplados −$800.000** f1201 (194,532 · 18,4) | total de gastos: 2,7 s |
| 3 · la utilidad | 1296-1406 | el velo negro se va con el corte a la vista (f1296, 197,723 · 10,7) y entra el degradado desde abajo · **utilidad mensual estimada $4.045.000** · «COP al mes» f1310 · pie «Cifras estimadas: los ingresos de renta corta varían por temporada.» f1336 | utilidad: 3,2 s (hasta el f1400) |

Una cifra cada 1,3-1,5 s dentro de un panel (la última de cada panel, 2,1-3,2 s después); cada cifra se queda en pantalla ≥ 2 s. La cuenta cuadra: 85 % de 30 noches = 25,5 · $190.000 × 25,5 = $4.845.000 · $500.000 + $300.000 = $800.000 · $4.845.000 − $800.000 = $4.045.000. Se acaba en f1406, 4 f antes de que empiece la disolvencia al CTA (f1410); ningún subtítulo coincide (el último de la mitad acaba en f874 y el primero del CTA entra en f1434).

## La música

«Street Level Sessions on the Green» desde los 154,567 s (`INICIO_MUSICA` = 4637/30): su golpe de 16,4 dB (154,614 s) abre la pieza en el f3. Sola a −15 LUFS por tramos (apertura −3,6 dB, paseo −4,3 dB, bloque 5 −4,2 dB sobre el archivo), −26 LUFS bajo la voz (−14,3 · −16,2 · −10,5 dB sobre el archivo). La rev. 2 no cambia la música hasta el f876; tras la mitad la canción sigue de corrido (sin golpes en los fondos de la infografía) y el CTA entra en un frame libre. Tras la última palabra del CTA (f1575) se apaga con curva de coseno hasta el f1640, 2 f antes del final.
