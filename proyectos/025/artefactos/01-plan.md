# 01 · Plan narrativo — proyecto 025 · Los Patios (apto 501), V9 del registro (sexta versión de la propiedad)

> Paso 1 de 3. Se escribió con el análisis ya hecho ([`../analisis-uso.md`](../analisis-uso.md), catálogo en `proyectos/017/catalogo-material.md`) y las dos decisiones del usuario (CTA y canción) y **antes** del primer render. Siguiente: [02-layout.md](02-layout.md).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Material | `Apartamento - Los Patios - El Poblado/Videos/` (`1 Hooks`, `2 Mitad`, `3 Dron`, `4 Recorrido`, `5 Cta`), copiado a `proyectos/025/original/` con el CÓDIGO del catálogo por nombre; sha256 en `normalizar.mjs` (RC13 `37a2f0fd`, RC14 `456f37e9`, RC15 `bd74ad18`, RC10 `1ebd08b6` coinciden con los de las versiones anteriores). HEVC 3840×2160 con rotación −90 (dron: 90). Tomas de Isabella y recorridos en HLG (tone-map a BT.709 con VideoToolbox); dron en SDR. |
| Composición | 1080×1920 · **30 fps** · 976 f (32,5 s). Clips normalizados a 1296×2304 y 30 fps (`nb_frames` original = normalizado: HK09 139, MD11 158, CT03 180, RC23 308…). |
| Formato | 9:16 vertical · `recorrido-luxur` (seis bloques) |
| Marca / texto | Luxur, texto **editorial** (abajo, 90 %, cursiva 8 px menor); **sin sello**; cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com` |
| Destino | Reels · Shorts · TikTok |
| Objetivo | el ángulo D «filtro» del catálogo: decir quién es el comprador (alguien que valora la arquitectura y prefiere crear sus propios acabados) y dejar la invitación a conocerlo |
| Presentadora | parece Isabella Cadavid (misma blusa y pantalón): sin confirmar por la cara |

## Promesa y CTA

- **Promesa (primeros 3,5 s):** la casa limpia —el edificio visto desde el camino de entrada, con los helechos y la fachada de ladrillo, **sin texto ni voz** (regla fija)—; Isabella entra en un golpe de la música y dice «Esta propiedad tiene sentido para un comprador muy específico.»
- **Acción final:** «escríbeme y ven a conocerlo» (CT03 RECORTADA a su 2.ª mitad, en el patio). No dice por dónde: **el canal del CTA está por decidir.**
- **Lo que NO se cuenta:** precio (no suena, no se lee, no se ve), el «317», ALH, cualquier cifra, valorización ni rentabilidad. **Ninguna cifra en la pieza.**

## Escenas (los seis bloques)

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | 0,0-3,5 | La casa | llegar: el edificio entre helechos | casa | RC23 (contrapicado de la jardinera y el camino de entrada) · solo música, con su golpe de entrada en el f3 |
| 2 | 3,5-7,7 | Hook | el filtro: «un comprador muy específico» | Isabella | HK09 junto al ventanal · «Esta propiedad tiene sentido para un comprador muy específico.» |
| 3 | 7,7-16,5 | Recorrido | del ventanal al espacio abierto (sentido I) | casa | RC04 el ventanal · RC02 el muro de bloques de vidrio · RC07 el espacio abierto (solo música) |
| 4 | 16,5-21,1 | Mitad | la pregunta que selecciona | Isabella | MD11 en el espacio abierto · «¿Alguien que valora la arquitectura y prefiere crear sus propios acabados?» |
| 5 | 21,1-28,2 | Recorrido | lo privado, el deck y el edificio entero (la vista) | casa | RC13 la ventana con plantas · RC10 el deck y la corrediza · DR153 el edificio desde el aire (el plano más largo) |
| 6 | 28,2-32,5 | CTA | invitar | Isabella | CT03 (2.ª mitad) en el patio → funde a negro → tarjeta con el logo y la web |

## Decisiones tomadas (y las descartadas)

- **CTA = CT03 recortada** (decisión del usuario, 2026-10-06: «Opción a»). Sobre la tabla de CT03 recortada / CT04 / CT04 recortada / repetir uno: elegida la primera. Cuesta una entrada a corte (0,40 s de silencio tras «millones» —12 f: no cabe una disolvencia de 12 f más la palabra—) y 1,72 s de voz; **repite la frase de la V5** (otra toma y otro sitio, PATIO).
- **Canción = *Heaven on Earth*** (decisión del usuario, 2026-10-06, entre *Heaven*, *desolate* y *Overcoming the Impossible*: se le mandaron extractos). Lounge/chill (†: género del catálogo, sin oír; puede sonar «playera»), 97 BPM, **sin pulso → por golpes medidos** (73 golpes ≥ 7,4 dB en 52 s). Se entra en el golpe de **179,584 s** (15,8 dB, el más fuerte que deja una rejilla de cortes válida) y la caída cumple a **209,5 s** (LUFS por tramos de 5 s: −13,8 → −24,1 → silencio; 10,3 / 56 dB).
- **Hook HK09 · mitad MD11** (propuesta mía del análisis, aceptada al contestar «opción a»): las dos sin cifra, sin ALH, y MD11 es la pregunta a la que contesta el CTA.
- **Los tres sitios:** INT-VENTANAL (HK09) · INT-ABIERTO (MD11) · PATIO (CT03): distintos, sentido I (ventanal → espacio abierto → patio). Ninguna cifra, ni precio.
- **La vista = DR153** (órbita sobre la corona del edificio, SDR, sin la torre de malla negra; 103 f = 3,4 s, el plano más largo del bloque 5). Ninguna otra vista limpia de ≥ 3 s sin usar.
- **La rejilla de cortes** sale de `herramientas/buscar-cortes-lp.py` (la de la V8 reescrita para la estructura de Los Patios y validada contra la V4: devuelve exactamente sus cortes). Con los rangos de los planos y las ventanas de voz de HK09 y MD11: **315 soluciones** (golpe más débil de una disolvencia 9,2 dB, de un corte seco 10,2 dB). Elegida la que entra en el golpe más fuerte.
- **Lo que le cuesta a la música (declarado):** MD11 deja **0,10 s (3 f)** de aire tras su última palabra y HK09 **0,52 s (15,6 f)**: el plano siguiente a MD11 entra a corte 3 f después de que ella calle y su golpe suena con la música todavía abajo (sube justo después, con fundido de 24 f); la subida tras el hook dura 13 f (no 24). Las dos son propiedades del material, no de la mezcla. Alternativas si no gustan: otra mitad con cola (MD13 tiene 1,0 s).
- **Descartadas:** *desolate* (lo-fi, «soledad, melancolía»), *Overcoming the Impossible* (3.ª de Chistilin; el corte seco más débil, 7,8 dB, puede bajar de 7,4 en el render), CT04 (ALH sin OK), HK04/HK08/MD04/MD10 (cifra, precio, ALH).

## Lo que comparte con las versiones anteriores de Los Patios (declarado)

**Ni un segundo de recorrido** (la puerta, sección 7b, lo mide con la V1-V5): RC04 (V4: 0-2,23 s; aquí 3,0-5,33), RC02 (V1: 9,8-13,6; V4: 0-4,47; aquí 5,5-7,97), RC07 (V1: 0,8-4,6; V2: 0-3,8; aquí 7,0-11,03), RC13 (V3: 2,6-5,7; V4: 10,93-15,37; aquí 9,0-10,8), RC10 (V2: 4,0-8,37; V5: 8,4-11,83; aquí 2,0-3,87). RC23 y DR153 no habían salido. **Comparte la FRASE del CTA con la V5 (otra toma).**

## Lo que no sé (supuestos y pendientes)

- **Palabras por cerrar por MEDIDA, sin oír** (R31): el arranque de MD11 («¿Alguien…» o «¿Eres alguien…», conf. 0,31 tras 0,92 s de silencio), «prefiere/prefiera» (0,46), «específico» (HK09, final de frase) y «escríbeme»/«conocerlo» (CT03).
- **La música**: medida, no oída; el género sale del catálogo; licencia sin verificar.
- **El canal del CTA** y si 1,7 s de voz bastan como CTA (en la V5 y la V8 fueron 1,7-1,85 s).
- **Que el golpe del corte tras MD11 suene** con la música abajo (se mide sobre el render: `golpes-render.py`, R33).
