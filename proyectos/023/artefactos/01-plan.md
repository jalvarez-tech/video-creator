# 01 · Plan narrativo — proyecto 023 · One Living (Envigado), V7 del registro (segundo reel de la propiedad)

> Paso 1 de 3. Se escribió con el análisis ya hecho ([`../analisis-uso.md`](../analisis-uso.md), catálogo en `proyectos/022/catalogo-material.md`) y **antes** del primer render. Siguiente: [02-layout.md](02-layout.md).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Material | Los 26 clips de `Apartamento - One Living - Envigado/Videos/`, copiados a `proyectos/023/original/` con su sha256 (`original/ORIGEN.tsv`, 26/26 coinciden con los de la V6): HEVC 3840×2160 con `rotation=−90`. Tomas de Isabella y `recorrido caminando` en HLG; 15 recorridos en SDR BT.709. Sin dron. |
| Composición | 1080×1920 · **30 fps** · 1189 f (39,6 s). Clips normalizados a 1296×2304 y 30 fps (`normalizar.mjs`, `nb_frames` original = normalizado en RC16, RC01, HK3, MD3 y CT2). |
| Formato | 9:16 vertical · `recorrido-luxur` (seis bloques) |
| Marca / texto | Luxur, texto **editorial** (abajo, 90 %, cursiva 8 px menor); **sin sello**; cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com` |
| Destino | Reels · Shorts · TikTok |
| Objetivo | que quien duda entre vivir o usar el apartamento vea las dos habitaciones, cada una en su extremo, con baño y vestier; la sala en el centro, la cocina y el balcón con vista; y sepa que puede agendar una visita |
| Presentadora | parece Isabella Cadavid (misma camiseta y pantalón): sin confirmar por la cara |

## Promesa y CTA

- **Promesa (primeros 3 s):** la pieza ABRE con el hook, sin plano de la casa delante (excepción declarada, como la V6): Isabella en la sala dice «Si quieres un apartamento para vivir o considerar para renta corta, mira esto.»
- **Acción final:** «Si te gusta esta vista, contáctanos y agendemos una visita» (CT2, en el balcón). No dice por dónde: **el canal del CTA está por decidir.**
- **Lo que NO se cuenta:** precio, cifras de ningún tipo (ni los 76 m²), valorización ni rentabilidad, entrega, cesión de contrato, zonas comunes (el rooftop va con la 2.ª etapa). Lo de la renta corta lo dice ella («considerar»): ni cuánto ni cómo.

## Escenas (los seis bloques)

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | — | La casa | **no hay** (abre con el hook, declarado) | — | — |
| 2 | 0,0-5,5 | Hook | el uso: vivir o rentar | Isabella | HK3, de la hornilla a la sala · «Si quieres un apartamento para vivir o considerar para renta corta, mira esto.» |
| 3 | 5,5-17,4 | Recorrido | el extremo de la alcoba secundaria | casa | RC15 ventanal · RC11 puertas del baño y vestier · RC15 vestier · RC04 baño (solo música) |
| 4 | 17,4-22,9 | Mitad | el centro: dos habitaciones, balcón, City Plaza | Isabella | MD3 en la sala |
| 5 | 22,9-33,2 | Recorrido | el otro extremo, la cocina, el balcón y la vista | casa | RC08 alcoba principal · RC09 cocina · RC14 balcón y cielo · RC12 la vista (la más larga; **repite** el cierre de la V6) |
| 6 | 33,2-39,6 | CTA | la vista, dicha, y agendar | Isabella | CT2 en el balcón → funde a negro → tarjeta con el logo y la web |

## Decisiones tomadas (y las descartadas)

- **Tres tomas de Isabella en DOS sitios** (SALA · SALA · BALCON): sin HK4 ni CT3 el piso no da un tercero; **aceptado por el usuario el 2026-10-06** («SALA · SALA · BALCON, con planos distintos»). Los OK del mismo día: HK3 (el reglamento permite la renta corta), CT2 (Luxur agenda visitas), y la cifra 76 (HK1, que no se usa).
- **HK3 y no HK1**: HK3 no lleva cifra y HK1 gastaría la única que cabe en la pieza; HK1 queda libre. **MD3 y no MD2**: MD3 está confirmada contra la ficha (City Plaza, «contiguo») y MD2 es el mismo rincón de HK3 (la sala mirando a la corredera).
- **Rev. 1 (pedido del usuario): el hook empieza justo antes de que Isabella hable (`desde` 0,5 s) y el golpe de entrada de la canción cae a los 5,5 s, en el paseo (185,390 s; no 6,0 s exactos: al clip del hook le quedan 166 f); la música suena DESDE EL PRINCIPIO, baja bajo su voz (rev. 2).**
- **Canción: «Yeshua (Versión Piano)»** (piano solo; la música suena desde el f0 y su golpe de 424,837 s cae donde empieza el paseo, a los 5,5 s; caída final en 452,9 s bajo el CTA). Es la TERCERA: *Deep Breath* se midió y se descartó (ambient: 18 golpes en 47 s y una caída que no llega a −20 dB) y *La Isla Bonita* (saxofón) se usó en las rev. 0-2 y el usuario la quitó: **«es muy playera»**. Entre todas las canciones libres se buscó, con un script sobre los golpes medidos, cuáles dejan una rejilla de cortes válida para esta estructura (mitad con su pareja de golpes a 160-167 f, la vista el plano más largo, el CTA justo antes de la caída): Yeshua es la única con caída completa a silencio. Medida, **no oída**; licencia sin verificar.
- **Orden de paseo**: la ficha dice que el plano pone «las dos habitaciones en extremos opuestos, con la zona social en el centro». Hook en la sala → un extremo (alcoba secundaria) → la mitad, en la sala → el otro extremo (principal) → cocina → sala → balcón → CTA en el balcón.
- **La vista: RC12, que cierra también la V6.** La regla «la vista es el plano más largo del bloque 5» pide un plano de vista abierta de ≥ 3 s y limpio: RC01 («balcon - paneo») lleva una malla negra en la baranda desde los 3 s (quedan 2,7 s limpios) y RC14 («recorrido caminando», HLG) solo tiene 2,7 s sin Isabella ni cinta en la baranda (13,7-16,5 s); RC14 va como plano anterior (el balcón y el cielo). RC12 (8,2-11,3 s, 3,1 s) comparte 3,1 s con el cierre de la V6: **se repite y se declara**.
- **Los cortes se pagan en planos más cortos**: el bloque 5 va a planos de 2,1-2,6 s porque la vista tiene que ser el más largo y la mitad pide su pareja de golpes a 165 f; con Yeshua es la combinación que cuadra (se quitó el plano de la sala hacia el balcón).
- **No se ve la cocina de la V6** (RC06/RC05): la de aquí es la de RC09 (20,4-23,9 s).

## Lo que comparte con la V6 (declarado)

**RC12, la vista (3,1 s solapados con el cierre de la V6)**; RC15 en otro tramo (V6 0,4-4,97 s; aquí 5,0-8,1 y 14,3-17,4 s). Las demás tomas de recorrido (RC11, RC03, RC08, RC09, RC14) no las usó. Dos baños y dos vestieres distintos. La puerta (sección 7b) lo mide con `VERSIONES_ANTERIORES`.

## Lo que no sé (supuestos y pendientes)

- **Palabras cerradas por MEDIDA, sin oír** (R31): «agendemos» (CT2, 38,7 s del vídeo; vocal tónica [e]: F1 ≈ 605-630, F2 ≈ 2.025-2.370 Hz, no la /a/ de Isabella) y «balcón» (MD3, 20,9 s; 4 de 5 cortes). Para oírlas antes de publicar.
- **La música**: medida, no oída; licencia no verificada (el registro lo dice).
- **El canal del CTA** (CT2 no dice por dónde).
- **Los subtítulos de 4 líneas se llevaron a su palabra con la energía de la voz sola**: el DTW de whisper iba 0,2-0,4 s pronto o tarde en «o considerar», «renta corta,», «y ubicación» y «contáctanos».
- **El fundido final de la canción es gradual**: en los 5 s tras su primer descenso (217,6 s) solo cae 5,3 LUFS; la caída principal (−9,4 LUFS en 5 s y −24,5 en 10) empieza a los 219,0 s.
