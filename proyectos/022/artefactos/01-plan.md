# 01 · Plan narrativo — proyecto 022 · One Living (Envigado), V6 del registro

> Paso 1 de 3. Se escribió con el análisis ya hecho ([`../analisis-uso.md`](../analisis-uso.md), [`../catalogo-material.md`](../catalogo-material.md)) y **antes** del primer render. Siguiente: [02-layout.md](02-layout.md).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Material | 26 clips de `Apartamento - One Living - Envigado/Videos/` copiados a `proyectos/022/original/` con su código y sha256 (`original/ORIGEN.tsv`): HEVC 3840×2160 con `rotation=−90`, audio AAC. **10 tomas de Isabella + `recorrido caminando` en HLG (≈ 29,97 fps; hook4 a 30); 15 recorridos en SDR BT.709 a 30 fps.** Sin dron. |
| Composición | 1080×1920 · **30 fps** · 1300 f (43,33 s). Los clips salen a 1296×2304 y 30 fps (`normalizar.mjs`; 29,97 → 30 no mueve nada a esta escala). |
| Formato | 9:16 vertical · el formato `recorrido-luxur` (seis bloques) |
| Marca / texto | Luxur (`LUXUR`), texto **editorial** (abajo, al 90 %, cursiva 8 px menor); **sin sello**; cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com` |
| Destino | Reels · Shorts · TikTok |
| Objetivo | que quien busca un apartamento con balcón vea que este lo tiene, entre al piso (cocina, sala, alcobas con baño y vestier), llegue a la vista y sepa dónde está y que puede escribir |
| Presentadora | parece Isabella Cadavid (misma camiseta y pantalón en las 10 tomas): sin confirmar por la cara |

## Promesa y CTA

- **Promesa (primeros 3 s):** el ventanal con las montañas (1,8 s, sin texto ni voz) y, en el golpe, Isabella en el balcón: «Si para ti un apartamento sin balcón no es opción, mira esto» (pregunta que selecciona).
- **Acción que se pide al final:** «Si quieres más información, contáctame» (CT1). **No dice por dónde**: el canal del CTA está por decidir.
- **Lo que NO se cuenta:** precio, administración, predial, estrato, año de construcción, entrega, cesión de contrato, zonas comunes (el rooftop va con la 2.ª etapa); ninguna cifra (ni los 76 m²); nada de valorización ni de renta corta. Todo eso va, si acaso, en el caption.

## Escenas (los seis bloques)

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | 0,0-1,8 | La casa | el ventanal con las montañas, limpio | casa | RC13 · sin texto ni voz · golpe de apertura de la música en el f3 |
| 2 | 1,8-5,8 | Hook | pregunta que selecciona, dicha desde el balcón | Isabella | HK2 «Si para ti un apartamento sin balcón no es opción, mira esto.» |
| 3 | 5,8-18,9 | Recorrido | del umbral a lo privado, sentido I | casa | RC06 cocina · RC05 sala · RC15 sala → alcoba secundaria (solo música) |
| 4 | 18,9-25,3 | Mitad | cada habitación con su baño y su vestier | Isabella | MD1, frente a las puertas del baño y del vestier |
| 5 | 25,3-36,1 | Recorrido | intimidad → la vista | casa | RC10 alcoba principal · RC16 vestier · RC02 baño · RC12 ventanal (el más largo) |
| 6 | 36,1-43,3 | CTA | dónde está y cómo preguntar | Isabella | CT1 desde la alcoba principal → funde a negro → tarjeta con el logo y la web |

## Decisiones tomadas (y las descartadas)

- **Una toma por bloque, en tres sitios distintos** (BALCON · ALCOBA-SEC · ALCOBA-PPAL), **ninguna cifra**: HK2 + MD1 + CT1 es la combinación 1 de `analisis-uso.md` §D, la única sin ningún OK pendiente de nadie.
- **Canción: «Some Say» (Nea, versión acústica), entrada 139,053 s** (golpe de 28,9 dB en el frame 0; acorde final en +36,4 s bajo el CTA). Segunda opción: *Street Level Sessions on the Green* (Daniel Armand), que sale de ≈ 48 s. Medida, **no oída**; sin pulso: cortes en golpes medidos.
- **Descartado, y por qué (§B):** HK4 («plusvalía segura de 94 millones»: promete valorización y lleva una cifra, y «esperar la Torre 2» choca con la ficha), CT3 («maximizar tu rentabilidad»), HK3 («renta corta»: sin saber qué dice el reglamento de One Living; sin tu OK), HK1 (la cifra «76»: cuadra con la ficha pero choca con el rango de la tipología; sin tu OK), CT2 («agendemos una visita»: depende de que Luxur agende).
- **Apertura:** probé RC01 (el balcón con la vista) y la baranda lleva una **malla negra** que ocupa el primer plano y afea la miniatura; pasó a RC13 (ventanal limpio).
- **Alcoba principal:** probé RC07 («entrando») y sus primeros 4 s son una puerta y una columna; pasó a RC10 (el ventanal con la ciudad).
- **La vista (RC12) es de la alcoba SECUNDARIA**, ya vista en el paseo: se declara. Es el plano de vista más abierto del rodaje.

## Lo que no sé (supuestos y pendientes)

- **La planta**: el orden del piso sale de `recorrido caminando` y de `sala, habitacion secundaria, vestier`; cuál alcoba es la «principal» sigue el nombre de archivo. MD1 dice que cada habitación está «conectada con la zona social y el balcón»: la ficha no lo dice y en el recorrido el balcón se alcanza desde la sala. **Dímelo** o quito esa mitad de la frase (se puede recortar como el CT02 de la V5).
- **Palabras por cerrar al oído** (R31): «habitación» (MD1, ≈ 19,7-20,2 s del vídeo) y «Escobero» (CT1, ≈ 37,1-37,6 s). «Balcón» (HK2, MD1), «vestier» y «Envigado» se cerraron por cortes.
- **La música**: medida, no oída; licencia no verificada.
- **El canal del CTA** y si Luxur puede agendar (CT2).
- **Color**: dos fuentes (HLG tone-mapeado y SDR) y la base salió de HLG (ver 03-timeline).
