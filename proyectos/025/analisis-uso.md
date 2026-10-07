# 025 · Los Patios (apto 501) — análisis previo a elegir (2026-10-06)

> Primer entregable de la V9. Catálogo del material: `proyectos/017/catalogo-material.md` (no se rehace). Lo medido lo digo; lo que no pude verificar, también.
> **Estado: a la espera de tu decisión sobre el CTA y la canción; NADA reservado, nada commiteado, nada publicado.**

## 0. Dónde estoy (lo leído, 2026-10-06) y en qué difiere del encargo

| El encargo decía | Lo que hay |
|---|---|
| Base: `origin/feat/reel-024-distribucion` (08b7e3a) lleva el registro más avanzado | **Esa rama NO existe en el remoto** (`git ls-remote --heads origin`: solo `main` y ramas de 2026-08/09-14/10-04). Solo está como rama local del worktree `reel-024` (08b7e3a, sin empujar). El registro MÁS avanzado es el de **`origin/main` (489bfbd)**: los PR #13 (registro al día V1-V9), #14 (V4) y #15 (V3 `final`) se fusionaron el 2026-10-07 03:40-03:47 UTC y traen V1-V8 con V8 `final (CRF 16)` y **V9 · 025 libre**. El de `reel-024` solo difiere en que marca V3/V4 «en prueba» (anterior). **Base de mi rama: `origin/main`** (mi worktree ya está ahí). No fusioné nada. |
| «Puede haber otras sesiones montando a la vez» | Ninguna sesión corriendo (`list_sessions`: todas paradas). Registro idéntico en `main`, `reel-020` y en los árboles de trabajo de `reel-021…024` (que solo traen proyectos sin commit): **nadie ha reservado la V9**. |
| Los datos de la ficha que des aquí mandan sobre lo leído | No pegaste ficha nueva: vale la de `catalogo-material.md` §2 (317 m² sin decir si construida o privada · obra gris · 3.550 millones, moneda no dicha, se asume COP · ALH sin nombre completo ni permiso · canal del CTA sin decir). |
| La tabla de recorridos del registro | **Está atrasada** (da por «sin usar» RC02/04/05/09/13/16/22 y no recoge la V3-V5). Usé los `03-timeline.md` de 017-020 y el `combinaciones.md` de 021 (§3). |
| Herramientas de la V8 en `reel-024/proyectos/024/herramientas/` | Copiadas a `proyectos/025/herramientas/` (sin commit). **`buscar-cortes.py` lo reescribí para la estructura de Los Patios** (`buscar-cortes-lp.py`: apertura · hook · 3 de paseo · mitad · 3 del bloque 5 · CTA) y lo **validé contra la V4**: con los rangos de sus planos y su caída (176,986 s) devuelve EXACTAMENTE sus 10 cortes y sus dB (137,645 · 140,067 · … · 173,838 s). Añadí `combinaciones-libres.py` (cuenta las ternas). |
| Disco / entorno | 48 GB libres. `ffmpeg` 8.1.2, `uv`, `node` 25.8. Modelo de whisper clonado (`cp -c`) a `archivos/whisper/` (ignorado por git). **`remotion/node_modules` aún no instalado** (no hace falta hasta montar). SSD del rodaje montado y la música presente. |

## A. Lo que queda

| Bloque | Libre y limpio (sin OK) | Libre pero condicionado | Gastado |
|---|---|---|---|
| Hook (12) | HK01 INT-ABIERTO · HK01a TERRAZA · HK01b PATIO (los tres «ven, te enseño», dudosa) · **HK09** INT-VENTANAL · HK10 TERRAZA (en frío suena raro) | HK04 («317 metros») · HK08 (el PRECIO) | HK02, HK03, HK05, HK06, HK07 |
| Mitad (15) | MD01a · MD02 · MD06 · MD12 · MD13 (TERRAZA) · MD05 BARANDA («luego»/«lujo» dudosa) · MD03 PATIO («piscina»/«cocina») · **MD11** INT-ABIERTO (arranque dudoso) | MD04 TERRAZA (ALH) · MD10 ENTRADA (ALH y 317) | MD01, MD07, MD08, MD09, MD14 |
| **CTA (7)** | **ninguno entero** | CT03 (PATIO, PRECIO) · CT04 (PATIO, ALH) | CT01, CT02 (recortada), CT05, CT06, CT07 |
| Dron (11) | **DR153** (7,9 s, órbita sobre la corona: sin la torre de malla negra) | DR148 · DR149 · DR150 · DR151 (la torre vecina en obra con malla negra, la vi en DR149; hay que reencuadrar o tapar) | DR147, DR152, DR154, DR155, DR156, DR163 |
| Recorridos (26) | **10 clips sin usar**: RC14, RC15, RC17-RC21 (zonas comunes), RC23, RC24, RC26 · y ventanas libres en los usados (§3) | | |
| Canciones (43) | 21 libres tras quitar las 8 usadas, *La Isla Bonita* y las 13 medidas y descartadas | | |

**Ternas hook → mitad → CTA con tres `LUGAR` distintos, sentido de paseo coherente (los lugares avanzan en un solo sentido por la línea de la casa) y una cifra como mucho** (`combinaciones-libres.py`):

| CTA | sin pedir ningún OK | con tus OK (ALH · precio · «317») |
|---|---|---|
| **CT03 recortada** a «escríbeme y ven a conocerlo» (PATIO) | **15** | 33 |
| CT04 (PATIO, nombra a ALH) | 0 (CT04 en sí necesita tu OK sobre ALH) | 33 |
| Repetir uno ya usado (CT01, CT02r, CT05, CT06, CT07) | 55 | 81 |

Las 15 con CT03r: HK01 → {MD01a, MD02, MD05, MD06, MD12, MD13} · HK01a → MD05 · **HK09 → {MD01a, MD02, MD05, MD06, MD11, MD12, MD13}** · HK10 → MD05. Los tres lugares de las que acaban en PATIO nunca pueden llevar HK01b ni MD03 (también PATIO).
**El cuello de botella otra vez es el CTA**: no queda ninguno limpio; lo único que lo evita es recortar o repetir.

## B. Cumplimiento (contra la ficha y las reglas del canal)

| Toma | La toma dice (medido con whisper-small con vocabulario + energía de la voz) | La ficha dice | Qué falta |
|---|---|---|---|
| **HK09** (INT-VENTANAL, voz 0,94-4,10 s) | «Esta propiedad tiene sentido para un comprador muy específico.» | sin dato que contradiga (perfil D de §2 del catálogo: **por confirmar**; `cliente-ideal.md` sigue en borrador) | Limpia. Poca energía (quieta, manos juntas): pide una apertura potente. Ninguna palabra con confianza baja |
| **MD11** (INT-ABIERTO, voz 0,99-5,15 s) | «¿Alguien que valora la arquitectura y prefiere crear sus propios acabados?» | ídem (perfil D) | El arranque: whisper oye «¿Alguien» (conf. 0,31) tras 0,92 s de silencio; el catálogo propone «¿(Eres) alguien…». «prefiere/prefiera» (0,46). **Se miden antes de la final (R31)** |
| **CT03 recortada** (PATIO, voz **3,97-5,68 s = 1,72 s**) | «(Está disponible por 3.550 millones,) escríbeme y ven a conocerlo.» — el precio queda fuera: la voz entra tras una pausa de **0,42 s** (12,6 f) que sigue a «millones» (3,54 s) | «Disponible por 3.550 millones»; nada de «sin precio en el bloque 6» se rompe si no suena, no se lee y no se ve | **Es la MISMA frase que la V5** (CT02, otra toma y otro sitio). Con 12,6 f de aire no cabe una disolvencia (12 f + la palabra): entra a **corte**. Cola 0,32 s. Sin canal dicho (lo cubre la tarjeta con la web) |
| **CT04 entera** (PATIO, voz 0,65-4,85 s) | «Los Patios, arquitectura de ALH, escríbeme para conocer esta unidad.» | «Diseño: ALH»: **sin nombre completo ni permiso para citarlo** | **Tu OK para nombrar a ALH.** «unidad» (conf. 0,06 en el final, como en CT07, donde ya confirmaste «unidad») |
| **CT04 recortada** (nueva, mía) | «(Los Patios, arquitectura de ALH,) escríbeme para conocer esta unidad.» — voz **2,96-4,85 s = 1,89 s**, con solo **0,18 s** de aire tras «ALH» | Sin ALH y sin el nombre del edificio | Entra a corte con la WAV cortada en ≈ 2,88 s (la «H» acaba en 2,78 s). Frase DISTINTA de la V5 |
| HK04 · HK08 · MD04 · MD10 | «317 metros» · «3.550 millones» · «ALH» · «ALH y 317» | las tres cosas por confirmar | Solo con tu OK (hoy no lo hay). **No los necesito**: hay ternas limpias |
| HK01/01a/01b | «…ven, te enseño» — whisper oye «veinte enseño» (conf. 0,07-0,12), se puede medir | — | Sin ninguna otra duda; son los hooks más débiles («curiosidad pura») |
| Valorización / rentabilidad / jurídico | Ninguna de las tomas candidatas promete nada de eso | | — |

Una sola cifra como mucho: **la terna que propongo no lleva ninguna** (HK09, MD11 y el CTA recortado sin precio).

## C. Canciones

Libres: 21 (los 43 menos: *Time, Return to Oasis, Flying Into the Sun, Sax for the Last Customer, Amélie, Some Say, Yeshua, Maison*; *La Isla Bonita* (quitada por «muy playera»); y las 13 medidas y descartadas del encargo). Detector de golpes = el de `medir-pista.py`; caída = LUFS por tramos de 5 s (`lufs-caida.py`, primer `t` con ≥ 9 dB a 5 s y ≥ 20 a 10 s); buscador de cortes validado (§0). **Perfil de la búsqueda** (hook de HK09, mitad de MD11, CTA recortado): apertura 60-105 f · hook 100-120 · paseo 60-150/60-150/60-130 · mitad 130-150 · bloque 5 50-120/50-120/vista 90-150 (la vista es el plano MÁS LARGO) · el CTA entra hasta 4 s antes de la caída · disolvencias que acaban en un golpe ≥ 9 dB, cortes secos ≥ 7,4 dB. Las soluciones son sobre los golpes MEDIDOS; ninguna oída.

| Canción (género del catálogo †: inferido, sin oír) | Cae a (LUFS: antes → +5 s → +10 s) | Soluciones | Golpe más débil (disolv. / seco) | Plano más corto | Notas |
|---|---|---|---|---|---|
| **ByErik – desolate (Slowed)** (lo-fi + reverb; «soledad, melancolía, desolación») | 118,0 s: −11,6 → −20,8 → −31,8 (9,2 / 20,2) | **30.641** | 11,4 / 10,7 dB | 75 f (2,5 s) | entrada 83,408 s; la curva baja y no se recupera (−12 → −44,7 en 13 s); la pista acaba a 126 s. **Ánimo «soledad»: lo que dices que confirmo contigo** |
| **Heaven on Earth** (lounge/chill; «sereno, cálido, celestial») | 209,5 s: −13,8 → −24,1 → silencio (10,3 / 56) | **6.817** | 10,2 / 10,7 dB | 83 f (2,8 s) | entrada 178,043 s; **la música acaba 3,5 s después de caer** (213,0 s); con potencia media «cae» a los 207,5 s: en LUFS son 209,5. Puede sonar «playera» |
| **Aleksey Chistilin – Overcoming the Impossible** (cinematic épico/híbrido orquestal; «determinación, superación») | 212,0 s: −19,5 → −28,8 → −48,2 (9,3 / 28,7) | **75** | 9,2 / **7,8** dB | 83 f (2,8 s) | entrada 172,715 s. Es la 3.ª de Chistilin (V2, V3) y el corte seco más débil (7,5-7,8 dB) **puede medir < 7,4 en el render** (V8: 8,1 → 6,8). Épica, no «hogar» |
| Becoming I (Judah Earl; cinematic orquestal) | 164,5 s (9,0 / 21,7) | **0** (38 con la caída por potencia, plano más corto 53 f) | — | — | descartada |
| Einaudi – Experience (Live) | 378,5 s (15,7 / 52,5) | **0** | — | — | descartada |
| deadmau5 – Strobe (progressive house) · Gary B.B. Coleman – The Sky is Crying (blues, 9 min) | caída completa al final de la pista | 300.000+ / 19.311 (perfil ANCHO, no el de arriba) | 11,3 / 9,5 y 15,6 / 8,8 | 85-98 f | **el género no encaja** con la propiedad (electrónica de club; blues) |
| I Feel It Coming (cover de saxofón) | 261,0 s | 273.956 (perfil ancho) | 11,8 / 16,8 | 77 f | **saxofón pop: lo pediste evitar** |
| Resto (Cornfield Chase, Epic AShamaluev, Fortitude, In This Together, Ivory Skyline, L'Amour Toujours, Light Fills the Room, Luxury Elegance Refined, Nils Frahm – Says, Silver Skies, Softly I, Spring is Coming, Tony Anderson) | o no tienen caída completa (≥ 9 dB a 5 s y ≥ 20 a 10 s) o dejan **0 soluciones** | | | | `buscar-entrada.py --cta 30 38` dice lo mismo para casi todas (parciales de 3-14 dB) |

Extractos para oír el género (**la música está medida, no oída**; tú puedes oírla y yo no): `proyectos/025/musica/1-heaven-on-earth-178s-a-213s.mp3` · `2-desolate-83s-a-126s.mp3` · `3-overcoming-the-impossible-173s-a-220s.mp3` (de la entrada propuesta hasta el final de la pista).

**Material de vista abierta limpia de ≥ 3 s sin usar:** **DR153** (7,9 s, órbita: es el único que cabe) y, mucho más flojo, RC14 0-4,5 s (la puerta-ventana de la alcoba, concreto). El resto de vistas ya salieron: RC04 0-2,2 (V4), RC07 (V1, V2), RC16 20,6-28,8 (V3), DR154/DR155/DR156/DR152/DR163 (V5/V2/V4/V3/V1). La vista del bloque 5 es DR153.

## D. Propuesta (a falta de tus respuestas)

| Pieza | Elección | Por qué |
|---|---|---|
| Apertura | **RC23** «Exterior edificio2» (contrapicado de la jardinera con helechos y ladrillo; **ninguna versión**), ≈ 2,5-3 s, sin texto ni voz | exterior = «llegar»; la fachada llena de verde es el mejor frame 0 libre (el dron DR153 lo reservo para la vista) |
| Hook | **HK09** · INT-VENTANAL · «Esta propiedad tiene sentido para un comprador muy específico.» | sin cifra, sin ALH, sin dudas de palabra; abre el ángulo «filtro» del catálogo con una apertura que le da la energía que a ella le falta |
| Mitad | **MD11** · INT-ABIERTO · «¿Alguien que valora la arquitectura y prefiere crear sus propios acabados?» | la pregunta que selecciona (catálogo: «pareja de HK09»); un lugar nuevo respecto del hook; arranque dudoso → se mide |
| CTA | **(a) CT03 recortada** (PATIO) — o lo que decidas en §E | la única que no necesita OK sobre ALH ni cifras; deja tres lugares ventanal → espacio abierto → patio, sentido I |
| Paseo (sentido I: del ventanal al espacio abierto) | RC02 4,5-9,8 (del pasillo a la sala, tras el tramo de la V4) · RC07 4,6-11,4 (del ventanal al espacio abierto) · RC04 6,0-9,5 (se aleja de la ventana) — a elegir mirando | ventanas que ninguna versión usó; **tomadas del catálogo, no mirados los fotogramas todavía** |
| Bloque 5 | RC13 5,7-10,9 (cruza la puerta de vidrio al espacio de concreto) · RC14 0-4,5 (la alcoba y su puerta-ventana) · **vista: DR153** (órbita, 4-5 s: el plano más largo del bloque) | ventanas libres de RC13; RC14 sin usar; DR153 libre |
| Dron | **DR153** como vista (último plano del bloque 5, antes del CTA) | como el DR156 de la V4: la recompensa; el dron ya no abre |
| Canción | **a decidir oyendo** (§C). Mi voto técnico: *Heaven on Earth* (6.817 soluciones, golpes de 10-15 dB); mi voto de género: *desolate* si «soledad» no te choca, no *Overcoming* | la caída de *Heaven* acaba la pista a los 3,5 s: no deja cola bajo la tarjeta; *desolate* sí |
| Compartido con versiones anteriores | RC02 (otra ventana que V1 y V4), RC07 (otra ventana que V1 y V2), RC04 (otra ventana que V4), RC13 (otra ventana que V3 y V4): **ni un segundo repetido**; solo clips | la puerta (§9b) lo comprobará |

## E. Lo que necesito de ti (una sola pantalla)

| | Opción | La toma dice | La ficha dice | Qué me hace falta saber |
|---|---|---|---|---|
| **a** | **CT03 recortada** (PATIO) | «escríbeme y ven a conocerlo» (1,7 s) | el precio queda fuera: no suena, no se lee, no se ve | ¿te vale **repetir la misma frase que la V5**, otra toma, y 1,7 s de CTA a corte? |
| **b** | **CT04 entera** (PATIO) | «Los Patios, arquitectura de ALH, escríbeme para conocer esta unidad.» (4,2 s) | «diseño: ALH», sin nombre completo ni permiso | **¿Puedo nombrar a ALH?** (y «Los Patios» en voz) |
| **b′** | **CT04 recortada** (mía) | «escríbeme para conocer esta unidad» (1,9 s) | sin ALH ni nombre | ¿Te vale una frase **distinta** de la V5 sin nombre del edificio? |
| **c** | **Repetir un CTA ya usado** (CT05 es el más limpio: «Si encaja con lo que estás buscando, escríbeme.», INT-BLOQUES, V3) | — | — | ¿Repetir uno entero con otro hook y otra mitad? (13 ternas limpias con CT05) |

Además: **¿permites** algún hook o mitad con cifra, precio o ALH (HK04, HK08, MD04, MD10)? **Mi recomendación: no** (no hacen falta). Y **tras oír los tres extractos, ¿qué canción?**

## F. Qué se hizo y qué no

- **Hecho:** lectura del registro en `main`, ramas locales y los 4 worktrees; los análisis de la V5 y la V8; el catálogo; los `combinaciones.md`/timelines; ventanas de voz medidas por energía y whisper (`HK09`, `HK01`, `MD11`, `CT03`, `CT04` y otras 12 tomas); fotogramas de DR153, DR149, RC14, RC15, RC23; escaneo de las 21 canciones libres con el buscador de cortes nuevo (validado contra la V4); `lufs-caida.py` en las cuatro candidatas y `curva.py` en dos.
- **NO hecho:** ninguna reserva, ningún commit, ningún push, ningún cambio fuera de `proyectos/025/` y el modelo de whisper clonado. Artefactos, andamio y `normalizar.mjs` aún no.
- **No oído:** ni una canción (extractos aparte), ni una palabra dudosa.
