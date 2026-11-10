# 03 · Timeline — proyecto 064 · Lote en San Vicente Ferrer, V46 · REV. 1

> Paso 3 de 3. Anterior: [02-layout.md](02-layout.md). De aquí salen `metraje-064.ts`, `audio-064.ts`, `subtitulos-064.ts` e `infografia-064.ts` (y no al revés). 30 fps; `en` y `dur` en frames de la composición; `desde` en segundos del MP4 normalizado.

## Planos (el viaje: el lote desde el aire → Isabella y las dos cifras → «ven, te muestro» → las distancias sobre el dron → Isabella y «no necesitas irte a tres horas» → el horizonte y la vista → «escríbeme»)

| # | Plano | Bloque | Espacio | Función | Clip | `desde` (s) | `en` | `dur` | Entra | Golpe (s de la canción · dB) |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | c01-apertura | 1 | la ladera con cultivo y cerca viva | situar / prometer | DR03 | 0,30 | 0 | 117 | corte | 86,583 · 9,9 (suena en f3,1) |
| 2 | c02a-hook | 2 | Isabella camina por la ladera | emocionar (las dos cifras) | HK02 | 6,533 (196 f) | 117 | 210 | disolver | — (nota larga) |
| 3 | c02b-invita | 2 | la misma toma, con empuje | invitar («Ven, te muestro») | HK02 | 13,767 (413 f) | 327 | 51 | **corte** | 97,387 · 8,8 |
| 4 | c03a-plano | 3 | la parte plana en cenital | revelar (el fondo de las distancias) | DR03 | 18,00 | 378 | 102 | disolver | 99,079 · 7,9 |
| 5 | c03b-cerca | 3 | la cerca viva con las flores | mover (el borde) | DR03 | 33,00 | 480 | 93 | disolver | — |
| 6 | c04-mitad | 4 | la ladera con las casas al fondo | emocionar (la distancia) | HK05 | 6,833 (205 f) | 573 | 192 | disolver | 105,585 · 6,7 |
| 7 | c05a-horizonte | 5 | el horizonte: terrazas, tejados rojos, cordillera | mover (lo que rodea) | DR01 | 24,50 | 765 | 104 | disolver | — |
| 8 | c05b-vista | 5 | la tierra roja con el cultivo y la cordillera | emocionar (el clímax, el plano más largo) | DR01 | 43,00 | 869 | 138 | disolver | 115,454 · 7,0 |
| 9 | c06-cta | 6 | Isabella en el campo, el cielo detrás | invitar | CT03 | 6,133 (184 f) | 1007 | 229 | disolver | — (donde empieza a caer la canción: 120,07 s) |
| 10 | c07-cierre | 6 | — | tarjeta oscura (logo y web) | foto | — | 1236 | 60 | corte | — |

Total: **1296 f = 43,2 s**. Planos mudos (el sonido va en `audio-064.ts`). Todos los planos de vídeo llevan `color` (R32).

## La infografía (f378-f557; `infografia-064.ts`)

| Elemento | Entra (f) | Golpe | Se lee entero (s) |
|---|---|---|---|
| velo (franja central, 0,68) | 378-386 (con el primer plano de dron) | — | — |
| fila «De Medellín · **1 hora**» | 390 | 99,484 s · 6,3 dB | 5,1 |
| filete dorado | 424-434 | — | — |
| héroe «De la autopista Medellín-Bogotá · **15 minutos**» | 434 | 100,934 s · 7,9 dB | 3,6 |
| pie «Tiempos aproximados» | 450 | — | — |
| fin (fundido de 6 f) | 557 (4 f antes de que empiece la disolvencia a Isabella) | — | — |

**Ni «1», ni «15», ni «tres horas» los dice la voz en este tramo** (ella dice 350, 3.244 y «tres horas» en la mitad: la pantalla AÑADE). La ficha de la versión 1:1 sale de f354 a f366 y vuelve de f577 a f589 (`herramientas/ficha-oculta.mjs`).

## La voz (frames de la composición; s0/s1 medidos por energía a 5-10 ms, banda de voz)

| Plano | Su voz en el clip (s) | Primera palabra | Última palabra | Música: bajada (curva de coseno, 11 f) | Música: sube |
|---|---|---|---|---|---|
| c02a-hook (HK02) | 6,97 – 13,38 (la voz tratada se apaga de 13,38 a 13,48 s) | f130,1 | f322 | f117 → f128 | — (se queda baja: sigue «Ven, te muestro») |
| c02b-invita (HK02, parte B) | 13,925 – 14,55 | f332 | f351 | — | f357 → f372 (6 f tras la palabra; el dron es opaco en el f378) |
| c04-mitad (HK05, primera frase) | 7,28 – 12,45 | f586,4 | f741 | f573 → f584 | f741 → f763 |
| c06-cta (CT03) | 6,57 – 12,86 | f1020,1 | f1209 | f1007 → f1018 **sube** de −5,4 a +0,8 dB (la canción cae sola 17 dB en ese segundo) | se apaga sola; la envolvente llega a cero en f1207 |

## Los subtítulos (todos abajo; el acento en la distancia)

Ver `remotion/src/proyectos/064/subtitulos-064.ts` y los guiones marcados `proyectos/064/voz/*.txt`: 9 bloques, 3 acentos (f140 «cerca de Medellín» · f612 «a tres horas» · f1088 «escríbeme»). Cifra dicha = cifra escrita: «350 millones» (f168) y «3.244 metros» (f256 y f654). **Ninguno coincide con la infografía.**
