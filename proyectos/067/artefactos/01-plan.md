# 01 · Plan narrativo — proyecto 067 · Lote en venta en San Cristóbal (EOLIA Condominio), V49 del registro (segundo reel del lote: «Este no es para ti»)

> Paso 1 de 3. Escrito con el reparto fijo (`proyectos/066/reparto-066-068.md`, que manda), el catálogo del rodaje (`proyectos/066/catalogo/catalogo-material.md`), la ficha de la web (leída el 2026-10-24), lo aprendido en el 057 (la estructura, la puerta y la música con fundidos) y en la 018 (la misma canción, *Return to Oasis*, y su rejilla). Siguiente: [02-layout.md](02-layout.md).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Pedido | Encargo del 2026-10-24: «Haz 3 videos» del [lote en venta en San Cristóbal](https://propiedadesluxur.com/es/propiedades/medellin/san-cristobal/lote-en-venta-en-san-cristobal-medellin-de-5170-m2) con el material de `Lote - San Cristobal/Videos/videos` (tres sesiones: 066, 067 y 068; esta es la **067 · V49**, ángulo **«Este no es para ti»**). Más las reglas fijas del canal (estructura DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA con tres frases de Isabella, primera toma sin texto ni voz, nunca el sello, cierre en tarjeta oscura con el logo y la web, subtítulos editoriales, voz a −15 LUFS, música con curva, color por plano medido). |
| La propiedad y la ficha | Lote campestre en **venta**, **COP 797 M**, **5.170 m²** (1 piso), **EOLIA Condominio**, vereda **La Ilusión**, corregimiento **San Cristóbal**, Medellín. Lotes con **matrícula independiente y financiación directa**; **acueducto veredal** (el único servicio que menciona); vistas abiertas hacia Medellín y el Valle de Aburrá; potreros con cercas vivas, bosque nativo y pinos; construcciones tradicionales que respetan el paisaje. **No se afirma** nada que la ficha no dé: ni energía, ni uso del suelo, ni vías, ni distancias (la web dice «a pocos minutos de Medellín»), ni «apto para construir», ni valorización. |
| Material | `Lote - San Cristobal/Videos/videos/` del SSD, copiado a `proyectos/067/original/` con el CÓDIGO del catálogo por nombre (sha256 en `normalizar.mjs`): HK02 `0f074f09`, MD01 `8ee2ceec`, CT05 `61b8136b`, RC02 `21d5e56d`, RC03 `9e6af023`, DR03 `d1609f61`, DR06 `5f504500`, DR04 `5a265456`, música *Return to Oasis* `55bf04c8`. |
| Composición | `Recorrido067` · 1080×1920 · **30 fps** · 1148 f (**38,3 s**). Clips normalizados a 1296×2304 y 30 fps: los MOV de este rodaje son **1080×1920 SDR BT.709 verticales de verdad** (sin rotación ni SAR anamórfico; no son HLG); los drones son 4K vertical SDR con `rotation=90` y 29,97 fps (`setpts=PTS*1000/1001` antes de `-r 30`); de DR06 y DR04 solo se normaliza el rango que reparte la pieza. |
| Formato | 9:16 vertical · `recorrido-luxur` (DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA) |
| Marca / texto | Luxur, texto **editorial** (abajo, 90 %, cursiva 8 px menor); **sin sello**; cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com` |
| Destino | Reels · Shorts · TikTok · y la versión con ficha para anuncios (1:1), tras el OK a la prueba |
| Presentadora | Isabella Cadavid |

## El ángulo: «Este no es para ti» (y en qué se distingue de las otras dos versiones del lote)

**La idea en una línea:** este lote es para quien **sabe lo que quiere dejar de sentir** y no busca lo más barato de la zona. No se vende una superficie sino un criterio: el hook **selecciona** («con todo respeto, este no es para ti»), la mitad le pone cara al comprador al que SÍ le habla y el CTA le da la acción.

| | **V49 (067)** | V48 (066) | V50 (068) |
|---|---|---|---|
| Ángulo | **este no es para ti: el filtro del comprador serio** | con esta vista, muy pocos: la escasez | el verdadero estatus es la privacidad |
| Hook | **HK02** «Si estás buscando lo más barato de la zona, con todo respeto, este no es para ti.» | HK05 | HK04 |
| Mitad | **MD01** «Aprendí a reconocer al comprador serio desde la primera fase. No habla de metros, habla de lo que quiere dejar de sentir.» | MD03 | MD02 |
| CTA | **CT05** «5.000 metros, infinitas posibilidades. Haz clic en el enlace y hablemos.» | CT04 | CT01 |
| Paneos | **RC02 · RC03** | RC01 · RC04 | RC05 · RC06 · RC07 |
| Aéreo | **DR06 0-60 s · DR04 60-98,5 s · DR03 entero** | DR01 · DR02 · DR05 0-60 s | DR04 0-60 s · DR05 60-121 s · DR06 60-119 s |
| Canción | ***Return to Oasis*** | *Flying Into the Sun* | *Heaven on Earth* |

### Lo que NO cambia respecto de las demás piezas del canal (y se dice)

- La estructura del 057 y de la 018 (DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA), la puerta y la composición (con `sinSubtitulos` para la versión con ficha).
- La canción es de la biblioteca del canal y **repite la de la V2/018 (Los Patios)**: otra propiedad, otra mezcla; el registro (`archivos/musica/registro-de-uso.md`, fila V49) la reservó para este reel y una canción ya usada SÍ se repite en OTRA propiedad si se declara (memoria `musica-repetir-entre-propiedades`). Con ella la rejilla es la de la 018: pulso constante de 110 BPM y caída a un piano que cae justo donde entra el CTA.

## Promesa y CTA

- **Promesa (primeros 3,2 s):** el camino de tierra rodeando los cipreses, desde el aire, **sin texto ni voz** (regla fija), con el golpe de la canción en el f3. Isabella entra disolviendo y es opaca en el f96; su primera palabra suena en el f99.
- **Acción final:** «haz clic en el enlace y hablemos»: UNA acción (el acento del CTA va en ella: «y hablemos.»). En el caption se pasa a mensaje directo / WhatsApp.
- **Lo que NO se cuenta en pantalla:** precio, superficie ni la ficha (van al caption y a la versión con ficha). **La única cifra en pantalla es la que ella dice: «5.000 metros» (CTA), tal cual**; la ficha dice 5.170 m² (se avisa al usuario).
- **El hilo de las palabras acentuadas:** «lo más barato» y «para ti.» (el hook: de quién NO es) · «comprador serio» y «dejar de sentir.» (la mitad: a quién sí le habla) · «infinitas posibilidades.» y «y hablemos.» (el CTA: la promesa y la acción).

## Escenas (los seis bloques)

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | 0,0-3,2 | El aéreo | la promesa | el lote | DR06 3,0-6,2 s: el dron se aleja del grupo de cipreses y abre el camino de tierra que lo rodea · solo música: golpe de 9,9 dB en el f3 |
| 2 | 3,2-7,8 | Hook | la selección | Isabella | HK02: baja por el prado hacia la cámara, con pinos y el valle detrás · «Si estás buscando lo más barato de la zona, con todo respeto, este no es para ti.» · **«lo más barato»** y **«para ti.»** |
| 3 | 7,8-15,4 | Recorrido | el terreno | el prado | el paneo del prado bajo las nubes (RC02) → el cielo y la cordillera sobre la loma (RC03) → el lote visto desde arriba, con su camino y su coche (DR04) · solo música: tres cortes secos en golpes de 9,2 · 9,1 · 9,6 dB |
| 4 | 15,4-22,5 | Mitad | el comprador serio | Isabella | MD01: en una loma de pasto seco · «Aprendí a reconocer al comprador serio desde la primera fase. No habla de metros, habla de lo que quiere dejar de sentir.» · **«comprador serio»** y **«dejar de sentir.»** |
| 5 | 22,5-31,7 | Recorrido | lo que rodea | el valle | los cipreses con la ciudad detrás (DR06) → el vuelo sobre los pinos (DR06) → LA VISTA: el valle y Medellín al horizonte (DR03, el plano más largo) · tres cortes secos en golpes de 9,7 · 8,2 · 11,8 dB |
| 6 | 31,7-38,3 | CTA | invitar | Isabella | CT05: en la loma, con las nubes y las montañas detrás · «5.000 metros, infinitas posibilidades. Haz clic en el enlace y hablemos.» · **«infinitas posibilidades.»** y **«y hablemos.»** → funde a negro → tarjeta con el logo y la web |

## Decisiones tomadas (y las descartadas)

- **Terna del reparto, sin tocarla** (HK02 · MD01 · CT05): exclusiva de esta pieza dentro del lote. Sobran HK01, HK03, HK04, HK05, HK06-HK09 (las otras dos piezas usan HK04 y HK05), MD02-MD05, CT01-CT04 (idem).
- **Voces medidas por energía** (20 ms, banda de voz), no por whisper ni por `limites-voz.py` con su margen por defecto: las tres tomas arrancan **de golpe** tras 0,45-0,5 s de respiración o viento (HK02 a los 0,50 s, MD01 a los 0,51 s y CT05 a los 0,47 s) y el final de «…para ti.» (HK02) cae a −37 dB del pico. Hook 0,50-4,46 s, mitad 0,51-6,90 s, CTA 0,47-4,66 s. Whisper small pone la primera palabra de cada toma en 0,00 s.
- **Dos palabras POR CONFIRMAR AL OÍDO**, que yo no puedo cerrar: **«fase»** (MD01: la expresión corriente sería «primera frase», pero whisper oye «fa» con confianza 0,98 en la toma entera y en 4 trozos aislados —una vez hasta «fácil»— y la envolvente no muestra la /r/ vibrante: se pinta «fase», lo medido, `medidas/segmentos-md01.txt`) y **«comprador»** (MD01: «compreador» en la toma entera, confianza 0,27; un trozo aislado de 1,3-2,4 s oye «comprador serio»: se pinta «comprador»). Se dicen en la entrega con el segundo exacto.
- **El aéreo.** DR06 abre (3,0-6,2 s: el dron se aleja del grupo de cipreses y abre el camino que lo rodea), DR06 vuelve en el bloque 5 (41,5-44,2 s: los cipreses con Medellín al fondo; 51,0-53,7 s: el vuelo sobre las copas) y DR03 es **la vista** (5,3-9,07 s: se levanta del prado hasta el valle). DR04 (63,0-65,2 s del original) es el lote visto en picado, con el camino y un coche blanco. Todo dentro de los rangos del reparto (comprobado en el TIEMPO DEL ORIGINAL por la puerta, 2f).
- **Paneos del prado:** RC02 solo en su primera mitad (0,6-3,3 s: el clip se oscurece de luma 138 a 96 hacia los pinos y el resto saltaría contra los vecinos) y RC03 (0,3-3,03 s: la loma con las nubes y la cordillera).
- **El orden del paseo** va de lo bajo a lo alto sin volver atrás: [aéreo del camino] → prado (hook) → prado y cielo a ras de suelo → [el lote desde arriba] → loma (mitad) → [el dron sube: cipreses y ciudad, pinos, el valle] → loma (CTA). La vista es la última imagen antes de que Isabella vuelva a hablar.
- **Canción = *Return to Oasis*** (`55bf04c8`, 110 BPM de pulso constante, meseta de −8,7 LUFS): se entra en su golpe de 148,470 s (9,9 dB, el pulso 10 de la rejilla de la 018); **su caída a un piano cae sobre el CTA** (desde los 180,09 s, f950: de −7,2 a −19,6 LUFS en 2 s) y hay un golpe de 10,0 dB a los 184,492 s (f1083) que se deja fuera: la música se apaga antes. Todos los cortes secos caen en un golpe medido (`musica/golpes-067.json`). **Medida, no oída; licencia sin verificar.**
- **El color:** `COLOR_BASE` del canal + el ajuste de cada plano, medido (`medir-color.py`): σ de luma entre planos 14,0 → 11,0; el hook, a la sombra de los pinos, sube de luma 85 a 93; los dos cortes secos que cambian de la sombra a un prado abierto (+24 el del hook al paneo, +17 el del paneo al cielo) quedan declarados.
- **Lo que se ve y conviene saber:** (1) Isabella baja por el prado hacia la cámara en el hook y empieza a hablar cuando ya está en cuadro; (2) en la mitad está en una loma de pasto seco, con la línea de pinos y el cielo gris detrás; (3) en el CTA sube una loma verde con las nubes y la cordillera detrás.
- **El disco:** el material normalizado de la pieza ocupa ≈ 750 MB (los dos drones recortados, 240 y 370 MB).

## Lo que comparte con las otras versiones del lote (declarado)

| Clip | Otra versión | V49 |
|---|---|---|
| DR06 60-119 s · DR04 0-60 s · DR05 · DR01 · DR02 | V48 (066) y V50 (068) | **no se usan** (esta pieza: DR06 0-60 s, DR04 60-98,5 s y DR03) |
| RC01, RC04 | V48 (066) | **no se usan** |
| RC05, RC06, RC07 | V50 (068) | **no se usan** |
| HK02 · MD01 · CT05 · *Return to Oasis* | exclusivas de esta pieza dentro del lote | — |

La disjunción es la del reparto (rangos del clip en el tiempo del original); la puerta (2f) la comprueba y no compara por nombre de archivo (cada proyecto normaliza sus rangos con otro origen de tiempo).

## Pendiente con el usuario

1. **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto): «**fase**» (MD01, f525 = 17,5 s del vídeo; ¿«frase»?) y «**comprador**» (MD01, f497 = 16,6 s).
2. **«5.000 metros»** (la voz de Isabella, también en pantalla) frente a **5.170 m²** (la ficha): si se deja tal cual, si se corta la frase o si ella la regraba.
3. La canción (medida, no oída; repetida de la V2; licencia sin verificar).
4. Por dónde se escribe («haz clic en el enlace»: en el caption pasa a mensaje directo, WhatsApp o el enlace de la biografía) y si el caption lleva el número de WhatsApp.
