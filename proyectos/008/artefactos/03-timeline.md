# 03 · Timeline — proyecto 008

> ⚠️ **V3 VIGENTE (2026-08-13, pedido del cliente): 1920 f · 63,97 s, lectura
> FLUIDA.** La voz pasó a `eleven_multilingual_v2` CON request stitching
> (junturas continuas), sin elipsis en el texto y pausa de 0,15 s — medido:
> entre frases quedan respiraciones de ~0,5 s y el único silencio largo es la
> tarjeta de direcciones (2,3 s, diseñado). 23 tomas: se añadió `sil10`
> (Hechos 20:35 NVI) como pantallazo final, en silencio tras la cola del
> último golpe. Lo demás de la v2 se mantiene: direcciones reales, donación
> en especie (sin cuenta), SFX en casi toda transición. Ventanas vigentes en
> `noticia-008.ts` (tabla generar-vo.sh v3). Respaldos: v1 en
> guion-vo-v1.txt / vo/partes-v1 · v2 en guion-vo-v2.txt / vo/partes-v2.

**fps 30 · 3983 f · 132,76 s.** Ventanas = tabla REAL de `generar-vo.sh`
(2026-08-13, voz clonada `eleven_v3`). Tres líneas superan el techo de 6 s y se
parten por junturas de frase (proporcional a caracteres, patrón del 007):
`c06` → 855 · `n01` → 1490 · `m02` → 2540.

## Mapa maestro (una fila = una toma del plan)

| id | molde | ventana | dur | media (sangre salvo «enm.») | texto | sonido |
|---|---|---|---|---|---|---|
| g00 | cine | 0–60 | 2,0 | — (negro + velo pleno) | — | ambiente viento (texture, arranca f0) |
| g01 | cine | 60–201 | 4,7 | grieta (banco) | — | whoosh light @64 |
| g02 | papel | 201–313 | 3,7 | Quibdó enm. (banco) | kicker QUIBDÓ — CHOCÓ | texture paper @205 |
| c01 | cine | 313–408 | 3,2 | manos-bolsas (banco) | — | whoosh light v1 @317 |
| c02 | papel | 408–487 | 2,6 | — | «Sabemos cómo funciona el tiempo.» | — |
| c03 | cine | 487–539 | 1,7 | scroll noticias (banco) | «Las noticias cambian.» | click ui @491 |
| c04 | cine | 539–594 | 1,8 | cámara TV (banco) | «Las cámaras se van.» | click camera @543 |
| c05 | papel | 594–668 | 2,5 | — | «La ayuda comienza a disminuir…» | — |
| sil1 | papel | 668–728 | 2,0 | colchoneta enm. (banco) | — | — (respiro) |
| c06a | cine | 728–855 | 4,2 | mano niño-adulto (banco) | — | — |
| c06b | papel | 855–936 | 2,7 | — | «Frente a una casa que ya no pueden habitar.» | — |
| d01 | cine | 936–1029 | 3,1 | camión vacío (banco) | — | whoosh light v2 @940 |
| d02 | papel | 1029–1146 | 3,9 | — | «Cuando ya no ocupe titulares…» | — |
| d03 | papel | 1146–1220 | 2,5 | — | «…la necesidad seguirá ahí.» | — |
| sil2 | cine | 1220–1280 | 2,0 | — | kicker TENEMOS UN CAMIÓN DE + **cifra 8** + «toneladas» | impact sharp @1224 (único sharp) |
| sil2b | cine | 1280–1340 | 2,0 | — | «Y queremos llenarlo.» | whoosh light @1284 |
| n01a | cine | 1340–1490 | 5,0 | alimentos (banco) | — | whoosh light v1 @1344 |
| n01b | papel | 1490–1666 | 5,9 | — | kicker VAMOS A RECOLECTAR + lista condensada | texture paper @1494 |
| n03 | papel | 1666–1769 | 3,4 | — | «Y también, lo que viene después…» | — |
| n04 | cine | 1769–1821 | 1,7 | cemento (banco) | «Volver a construir.» | click pop @1773 |
| a01 | papel | 1821–1948 | 4,2 | — | kicker PUNTOS DE RECOLECCIÓN + «Las dos sedes de Juan Papita.» | click ui v? @1825 |
| a02 | cine | 1948–2101 | 5,1 | manos-bolsas 2 (banco) | — | — |
| a03 | papel | 2101–2139 | 1,3 | — | «Lo que puedas.» | click pop v1 @2105 |
| sil3 | papel | 2139–2259 | 4,0 | — | tarjeta SEDE 1 / SEDE 2 · direcciones POR CONFIRMAR | texture paper @2143 |
| m01 | cine | 2259–2388 | 4,3 | transferencia móvil (banco) | — | click ui @2263 |
| m02a | cine | 2388–2540 | 5,1 | varillas (banco) | — | — |
| m02b | papel | 2540–2697 | 5,2 | — | «Cemento y varillas: lo más costoso.» | click pop v2 @2544 |
| sil4 | papel | 2697–2817 | 4,0 | — | tarjeta CUENTA · POR CONFIRMAR + destino | texture paper @2701 |
| f01 | cine | 2817–2912 | 3,2 | cajas al camión (banco) | — | whoosh light v2 @2821 |
| f02 | papel | 2912–3005 | 3,1 | Chocó 2 enm. (banco) | «El contacto en Chocó ya existe.» | texture paper @2916 |
| f03 | cine | 3005–3069 | 2,1 | camión (banco, reuso d01) | «Solo falta llenarlo.» | click pop @3009 |
| f04 | papel | 3069–3203 | 4,5 | — | «En ocho toneladas no cabe todo lo que necesitan…» | — |
| sil5 | cine | 3203–3263 | 2,0 | — (negro, foco cenital) | — | — (SILENCIO a propósito) |
| f05 | cine | 3263–3346 | 2,8 | carretera (banco) | — | riser low-rumble termina @3346 |
| f06 | cine | 3346–3420 | 2,5 | bolsa única (banco) | «Un granito a la vez.» | **impact deep 1/2** @3350 |
| f07 | papel | 3420–3503 | 2,8 | — | «Hoy ese granito puede ser el tuyo.» | — |
| sil6 | cine | 3503–3623 | 4,0 | — | «Cuando la ayuda disminuya, queremos seguir ahí.» | — |
| sil7 | papel | 3623–3743 | 4,0 | — | tarjeta CÓMO AYUDAR (sedes · cuenta · salida POR CONFIRMAR) | texture paper @3627 |
| sil8 | papel | 3743–3863 | 4,0 | **foto del cliente** enm. + «Ayudemos a Chocó.» | — | texture paper @3747 |
| sil9 | cine | 3863–3983 | 4,0 | — | frase final en 4 líneas | **impact deep 2/2** @3867, luego nada |

Sucesión sin huecos ✓ · tomas 1,3–5,9 s ✓ · máx. 3 «cine» seguidas (sil2→n01a y sil5→f06) ✓.

## Música (pista aparte, envolvente manual en la comp)

| tramo | nivel | qué |
|---|---|---|
| 0–668 | −26 dB | piano solo, casi imperceptible |
| 668–1340 | −24 dB | entra colchón de cuerdas |
| 1340–3203 | −22 dB | cuerdas cálidas sostenidas (sube leve en tarjetas sil3/sil4) |
| 3203–3263 | **duck a −34 dB** | el silencio de sil5 se respeta |
| 3263–3743 | −18 dB | el swell de esperanza |
| 3743–3983 | −14 → −40 dB | frente en la foto y muere con la frase final |

## Nota de mezcla (medido sobre la prueba 720p, 2026-08-13)

`impact-deep.mp3` lleva el boom en el **segundo 1–2 del archivo** (máx −4,3 dB
ahí; −23 el primer segundo): con la ventana por defecto del cue (<1 s desde el
target) el golpe se cortaba antes de sonar. Los dos `deep` (f06 y sil9) llevan
`startFrame` adelantado 36 f (el swell anuncia, el boom cae EXACTO en el
target) y ventanas de 120/150 f para la cola. Verificado: boom sil9 a −37 dB
bajo la voz (picos de voz −4 dB), cola muriendo a −52 → −91 dB.

## Puertas de control

- [x] revisar-plan ✅ (40 tomas limpio) · revisar-broll ✅ (14 medidos y acreditados) · revisar-velo ✅ · revisar-marca ✅ 39/39 · tsc ✅
- [x] Frames clave (R05 + R17): 19 stills revisados; 4 reemplazos de b-roll cazados en frames (ver 01-plan §ajustes)
- [x] Prueba 720p verificada por niveles (voz −21 dB dominante, silencios reales −76 dB, sharp/riser/ambiente presentes, deep corregido y re-verificado en render parcial)
- [x] Final exportado + créditos del banco (`bancos.py creditos --proyecto 008`)
