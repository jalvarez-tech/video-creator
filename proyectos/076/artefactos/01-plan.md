# 01 · Plan narrativo — proyecto 076 · Suite Go Living (El Poblado, Medellín), V57 del registro («Una buena inversión empieza por la tranquilidad»)

> Paso 1 de 3. Escrito con el catálogo del rodaje (`proyectos/070/catalogo/catalogo-material.md`), el reparto 070-075 (`proyectos/070/reparto-070-075.md`) y lo aprendido en la 070 y la 075 (`proyectos/070/aprendizajes.md`, `proyectos/075/aprendizajes.md`). Es la primera pieza del lote 076-078, pedido por el usuario el 2026-11-08: «crea otros 3 incluyendo también videos de las zonas sociales», con el material de `Suite Go Living/Videos/6 Zonas Sociales` (el usuario escribió «Videos/Zonas Sociales»; en el disco la carpeta se llama así).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Pedido | «Crea otros 3 incluyendo también videos de las zonas sociales» y «exporta el video de alta calidad». Esta es la **V57 / 076**. |
| La propiedad | Suite hotelera en **venta** en Go Living Suites, El Poblado: 28,5 m², piso 9 con vista al oriente, se vende a puerta cerrada, matrícula independiente, operación hotelera activa, vigilancia 24/7. **El precio no consta** (no va en el reel; hace falta para la ficha y el caption). |
| Material | `Suite Go Living/Videos/` del SSD, copiado a `proyectos/076/original/` con el CÓDIGO del catálogo como nombre: HK02 `fe939a40`, MD04 `b312f0ae`, CT06 `e3db3d0b`, DR10 `252aecc0`, ZS01 `1b41b770`, ZS02 `dab33323`, ZS05 `81b98a5d`, RC11 `18ddf74c`, RC08 `332f7333`, RC07 `02c55997` (y los candidatos que no se usan, en `normalizar.mjs`). |
| Composición | `Recorrido076` · 1080×1920 · **30 fps** · 958 f (**31,9 s**). Clips normalizados a 1296×2304 y 30 fps. |
| Formato | 9:16 vertical · `recorrido-luxur` (EXTERIOR · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA) |
| Marca / texto | Luxur, texto **editorial** (abajo, 90 %, cursiva 8 px menor); **sin sello**; cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com` |
| Presentadora | Isabella Cadavid |

## El ángulo: «Una buena inversión empieza por la tranquilidad»

**La idea en una línea:** quien invierte en una suite quiere dormir tranquilo; el edificio pone a su alrededor el gimnasio, la tienda y la operación hotelera, y la suite es un lugar sereno con la ciudad al fondo. El hook lo dice («una buena inversión empieza por la tranquilidad»), el paseo lo enseña con las **zonas sociales del edificio** (el gimnasio, la tienda, otra vez el gimnasio), la mitad lo concreta («invierte en una suite con vocación turística y ubicación estratégica») y el CTA invita («agenda una visita y descubre su potencial de inversión»).

**Lo que NO se dice ni se escribe, y la puerta lo comprueba:** valorización, rentabilidad, ganancia, «crecer», cifras (28,5 m², piso 9, precio), ni nada del POT ni «seguro / a salvo / cumple». «Tranquilidad» es el ángulo del anuncio (matrícula independiente, a puerta cerrada, operación activa, vigilancia 24/7) y «potencial de inversión» es la frase aceptada de CT06 en el catálogo («no promete cifra»).

## Escenas (los seis bloques)

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | 0,0-2,9 | El edificio | la calma | la torre y su entrada entre plantas | DR10 4,07-6,97 s: la torre desde la acera, con la entrada de vidrio, el jardín vertical y las plantas en primer plano · solo música: golpe de 18,5 dB en el f3 |
| 2 | 2,9-6,3 | Hook | la promesa | Isabella | HK02: viene del fondo del pasillo de la suite · «Una buena inversión empieza por la tranquilidad.» (disuelve desde el exterior, acaba en un golpe de 18,8 dB) |
| 3 | 6,3-13,0 | Recorrido | lo que rodea la suite | las zonas sociales | el gimnasio (ZS01 3,50-5,70 s) → la tienda del edificio (ZS05 4,30-6,40 s) → el gimnasio con las bicicletas (ZS02 5,50-7,97 s) · solo música, tres cortes secos en golpes de 17,8 · 13,2 · 13,4 dB |
| 4 | 13,0-17,8 | Mitad | el porqué | Isabella | MD04: junto al ventanal, se acerca · «Invierte en una suite con vocación turística y ubicación estratégica.» (a corte en un golpe de 16,0 dB) |
| 5 | 17,8-26,0 | Recorrido | la suite y su vista | la vista | la cama hacia la consola del televisor (RC11 0,20-2,77 s) → la repisa con la planta y la cortina (RC08 4,30-6,50 s) → de la cama al ventanal con la ciudad y las montañas (RC07 2,70-6,23 s, el plano más largo: 3,5 s) |
| 6 | 26,0-31,9 | CTA | invitar | Isabella | CT06: primer plano · «Agenda una visita y descubre su potencial de inversión.» → funde a negro → tarjeta con el logo y la web |

## Decisiones tomadas (y las descartadas)

- **El exterior es DR10 4,07-6,97 s, no DR04.** La rev. 0 abría con DR04 (1,00-3,90 s) y la 077 abre también con DR04 (2,20-5,20 s): dos reels de la suite no pueden empezar con el mismo plano. `herramientas/ventanas-dr.mjs` lista las ventanas de DR que usa cada pieza (070-078); el tramo de DR10 posterior a la apertura de la 075 (0,30-3,73 s) es el único de ≈ 2,9 s que está libre y no es la continuación de otra apertura (DR08 3,37+ es el mismo cuadro que la 071; DR06 3,4+ enseña el «GO» de la 074). La inclinación se frena (≈ 8 → ≈ 4 en los 75 f opacos): no es velocidad constante estricta, y se declara. Color: exposición −0,08 (luma 112 en el f0 y 122 en el f60 frente a 96-122 en el resto; luces quemadas 0 %).
- **Las zonas sociales van en el bloque 3, TRES planos** (pedido del usuario para el lote): el gimnasio con las elípticas (ZS01), la tienda del edificio (ZS05) y el gimnasio con las bicicletas (ZS02). Todos son tramos que la 074 NO usó (ella: ZS01 0,30-3,43 · ZS02 2,00-5,40 · ZS03 0,30-3,20), así que la 076 y la 074 no comparten ni un segundo.
- **La tienda (ZS05) se usa SOLO desde los 4,3 s**: hasta los 2,5 s el clip enseña el toldo con el nombre de una marca de terceros (WEGO) y hasta ≈ 4,2 s, un cartel con el logotipo de la tienda y su horario en el cristal (visto en la primera prueba, a 3,0-4,0 s); después, el interior (mostrador con luz cálida, estantes, muro verde) solo lleva los rótulos genéricos de los estantes («Milk & beverages»). La puerta lo exige (`desde ≥ 4,2 s`).
- **La interjección inicial de HK02 se RECORTA.** La toma abre con un sonido fuerte de 1,22 a 1,53 s (whisper: «Hoy,»); tras un hueco de −60 dB empieza «una buena inversión empieza por la tranquilidad» (1,62 s). El catálogo da la frase sin «Hoy,»: la voz tratada empieza en 1,55 s. Queda como pendiente de oído.
- **Disuelve el hook y nada más.** HK02 habla a los 1,62 s, así que cabe una disolvencia (el clip tiene 36 f antes de `desde`); MD04 (0,58 s) y CT06 (0,45 s) entran a corte, y la cama también (la mitad solo deja 13,6 f tras su última sílaba: una disolvencia taparía el «-ca» de «estratégica»).
- **La vista repite RC07** (2,70-6,23 s) como las demás piezas de la suite que la usan (070, 072, 073, 075): es el único clip con una ciudad de ≥ 3,5 s. Declarado (la puerta, 7b).
- **Canción: «Luxury, Elegance, Refined»** (lounge / smooth chill, Re menor, ~86 BPM; repetida de la V26/043 y la V36/054, de otras propiedades; elegida en el reparto del lote). Es una meseta PLANA de −14 a −16 LUFS sin caída propia hasta su cola (fundido final desde los 180 s): no hay una caída que caiga bajo el CTA, así que la pieza la APAGA con curva bajo la tarjeta (como en todas). Entrada en 147,778 s (golpe de 18,5 dB); la rejilla de 10 golpes de 9,6 a 23,4 dB sale de `buscar-cortes-lp.py` con `T_F=176` y `TIPOS=ddcccccccc`; la música sola se lleva a −15,2 · −15,9 · −16,1 LUFS por tramo para que el pico quede en ≤ −1 dBFS (la canción llega a −0,1 dBFS en el paseo).

## Lo que queda por confirmar al oído (R31)

1. **La interjección recortada de HK02** (1,22-1,53 s de la toma): whisper «Hoy,». No suena en la pieza.
2. **«ubicación» y «estratégica»** (MD04, ≈ 16,2-16,8 s del vídeo): whisper «ubicaciones estratégicas» / «educación estratégica».
3. **«Agenda» y «una»** (CT06, ≈ 26,5-26,8 s del vídeo): la «A» es muy suave; whisper «Ag» (0,36) y «una» (0,56).
