# 01 · Plan narrativo — proyecto 024 · One Living (Envigado), V8 del registro (tercer reel de la propiedad)

> Paso 1 de 3. Se escribió con el análisis ya hecho ([`../analisis-uso.md`](../analisis-uso.md), catálogo en `proyectos/022/catalogo-material.md`) y las dos decisiones del usuario (CTA y canción) y **antes** del primer render. Siguiente: [02-layout.md](02-layout.md).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Material | Los 26 clips de `Apartamento - One Living - Envigado/Videos/`, copiados con `cp -c` a `proyectos/024/original/` desde `proyectos/023/original/` (sha256 comprobado contra `ORIGEN.tsv`: 26/26): HEVC 3840×2160 con `rotation=−90`. Tomas de Isabella y `recorrido caminando` en HLG; 15 recorridos en SDR BT.709. Sin dron. |
| Composición | 1080×1920 · **30 fps** · 1019 f (34,0 s). Clips normalizados a 1296×2304 y 30 fps (`normalizar.mjs`; `nb_frames` original = normalizado en HK1 159, MD2 157 y CT1 175). |
| Formato | 9:16 vertical · `recorrido-luxur` (seis bloques) |
| Marca / texto | Luxur, texto **editorial** (abajo, 90 %, cursiva 8 px menor); **sin sello**; cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com` |
| Destino | Reels · Shorts · TikTok |
| Objetivo | que quien mira un apartamento pequeño vea que 76 metros bien distribuidos alcanzan: la cocina y la sala abiertas, el balcón como extensión de la zona social y las alcobas con su baño y su vestier |
| Presentadora | parece Isabella Cadavid (misma camiseta y pantalón): sin confirmar por la cara |

## Promesa y CTA

- **Promesa (primeros 3 s):** la pieza ABRE con el hook, sin plano de la casa delante (excepción declarada, como la V6 y la V7): Isabella cruza la sala hacia la cámara y dice «76 metros pueden sentirse muy diferentes cuando están bien distribuidos.»
- **Acción final:** «Si quieres más información, contáctame» (CT1 RECORTADA a su 2.ª frase, en la alcoba principal). No dice por dónde: **el canal del CTA está por decidir.**
- **Lo que NO se cuenta:** precio, cualquier otra cifra (los «76» del hook son la única), valorización ni rentabilidad, entrega, cesión de contrato, zonas comunes (el rooftop va con la 2.ª etapa), la ubicación (la frase de CT1 que la daba se corta).

## Escenas (los seis bloques)

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | — | La casa | **no hay** (abre con el hook, declarado) | — | — |
| 2 | 0,0-5,0 | Hook | los metros bien distribuidos | Isabella | HK1: cruza la sala hacia el balcón · «76 metros pueden sentirse muy diferentes cuando están bien distribuidos.» |
| 3 | 5,0-14,1 | Recorrido | cocina → sala → balcón (sentido I) | casa | RC09 la isla y la estufa · RC06 de la cocina a la sala · RC09 la sala hacia la corredera · RC01 el balcón (solo música) |
| 4 | 14,1-18,7 | Mitad | el balcón, extensión de la zona social | Isabella | MD2: ella en el balcón, la cámara en la sala |
| 5 | 18,7-29,4 | Recorrido | el fondo: pasillo y baño, vestier, alcoba principal y la vista | casa | RC09 el pasillo · RC09 el vestier · RC10 la alcoba · RC08 la vista (la más larga) |
| 6 | 29,4-34,0 | CTA | agendar la conversación | Isabella | CT1 (2.ª frase) en la alcoba principal → funde a negro → tarjeta con el logo y la web |

## Decisiones tomadas (y las descartadas)

- **HK1 · MD2 · CT1 recortada.** No quedaba ningún CTA limpio (CT1 la usó la V6, CT2 la V7, CT3 promete rentabilidad) y de hooks y mitades solo quedaban HK1 y MD2. **Decisión del usuario (2026-10-06): repetir CT1 recortada a su 2.ª frase «Si quieres más información, contáctame».** Razones: da TRES sitios distintos de Isabella (SALA · BALCON · ALCOBA-PPAL; HK1 y MD2 son contraplanos del mismo rincón) y no dice «Escobero», que la V6 llevó sin cerrar. Cuesta: 1,85 s de voz y una entrada a corte con 0,38 s de aire (sin sitio para una disolvencia). Se declara en la puerta y en el registro.
- **La cifra:** los «76» (HK1) son la única; el usuario la permitió el 2026-10-06 (la ficha dice 76 m² para esta unidad; la tipología publica 71-75 y «confirma en el contrato el área»).
- **Canción: «Emilio Piano ft. Lucie – Maison»** (piano neoclásico; elegida por el usuario entre *Maison*, *desolate* y *Heaven on Earth*: se le mandaron extractos). Suena desde el f0 (se usa desde 137,97 s, `INICIO_MUSICA` 4139/30), su golpe de 142,95 s abre el paseo a los 5,0 s y cae a silencio desde 168,5 s bajo el CTA (LUFS por tramos de 5 s: −17,6 → −30,1 → silencio digital). Sin pulso: se corta sobre los golpes medidos, con una rejilla de cortes calculada para esta estructura (54-66 soluciones; la elegida tiene el golpe más débil de disolvencia en 11,4 dB y el de la vista en 8,1). Medida, **no oída**; el género, tampoco; licencia sin verificar.
- **El hook dura 0,7 s menos que HK3** (el clip HK1 es de 5,30 s): el golpe del paseo cae a los 5,0 s, no a los 5,5 que pidió el usuario para la V7. Hereda lo demás: el hook empieza 4 f antes de que ella hable (su primera palabra, a ≈ 6,8 f), la música suena desde el f0 y baja bajo su voz, y la bajada de la música acaba ANTES de la primera palabra de la mitad y del CTA.
- **Orden de paseo:** sentido I (entrada → fondo): HK1 en la sala → cocina → sala → balcón → MD2 (ella en el balcón) → pasillo y baño → vestier → alcoba principal → la vista desde su ventanal → CT1 en esa alcoba. La ficha dice que el plano pone «las dos habitaciones en extremos opuestos, con la zona social en el centro»: este reel va del centro a UNA alcoba (la principal).
- **La vista, el plano más largo del bloque 5, sin repetir RC12:** RC08 (0-4 s: el cielo, la ciudad y el ventanal de la alcoba principal) dura 110 f (3,7 s). RC12, que cerró la V6 y la V7, no se usa. (Alternativas medidas: RC13 0-3 s y RC09 28-32 s.)
- **Descartadas:** *desolate* (lo-fi, ánimo de «soledad, melancolía»; 418-2.533 soluciones: el plan B) y *Heaven on Earth* (lounge: puede sonar «playera»; la pista acaba 3,5 s después de caer); CT2 repetida (solo dos sitios y V7 y V8 acabarían idénticas); CT1 entera («Escobero» sin cerrar).

## Lo que comparte con la V6 y la V7 (declarado)

**El clip de CT1 (V6):** la 2.ª frase de la toma del CTA de la V6 (el mismo clip y la misma voz; la V6 la decía entera). **Metraje de recorrido: ni un segundo solapado** (la puerta, sección 7b, lo mide con las dos versiones): RC09 (V7: 20,4-22,5 s; aquí 22,4-25,1, 6,0-8,1, 12,0-15,0 y 28,0-30,0 s), RC06 (V6: 0-5,1 s; aquí 12,5-14,5 s), RC10 (V6: 0-2,8 s; aquí 2,8-4,8 s), RC08 (V7: 4,2-6,8 s; aquí 0,4-4,1 s), RC01 (nadie). Dos baños y dos vestieres distintos de los de la V6 y la V7 (aquí, el de la alcoba principal vía RC09).

## Lo que no sé (supuestos y pendientes)

- **Palabras por cerrar por MEDIDA, sin oír** (R31): «pueden» (HK1, conf. 0,46), «balcón» (MD2, conf. 0,43) y la última sílaba de «contáctame» (CT1, «me»/«mi»: conf. 0,05-0,57).
- **La música**: medida, no oída; el género (piano neoclásico) sale del catálogo (†: inferido, sin identificar); licencia sin verificar.
- **El canal del CTA** (CT1 no dice por dónde) y si 1,85 s de voz bastan como CTA (en la V5 de Los Patios fueron 1,7 s).
- **«conectada»/«extensión»**: MD2 dice «Aquí el balcón se convierte en una extensión de la zona social»: es una opinión de diseño, no un hecho de la ficha; el balcón mide 1,40 × 3,30 m.
