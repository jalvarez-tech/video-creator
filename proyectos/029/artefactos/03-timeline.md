# 03 · Timeline — proyecto 029

> Paso 3 de 3. Anterior: [02-layout.md](02-layout.md). De aquí salen `metraje-029.ts`, `audio-029.ts` y `subtitulos-029.ts`.

783 f · 30 fps · 26,1 s. Cada toma entra con su imagen opaca UN frame antes de su primera sílaba (`desde` = ese frame de la fuente) y entre la última palabra de una y la primera de la siguiente hay un HUECO fijo de 24 f (0,8 s) con la disolvencia (12 f) dentro (R29). Las voces salen de `limites-voz.py` y de la envolvente de la voz (`herramientas/envolvente-voz.py`).

| Plano | Sitio | Función | Clip (`desde` en f de la fuente) | `en` | `dur` | Voz en la comp (primera → última sílaba) | Entra | Zoom |
|---|---|---|---|---|---|---|---|---|
| c01-apertura | camino de la finca | situar (la finca y ella llegando; cámara lenta ×0,5) | `apertura` (0) | 0 | 60 | — | corte | 1,00→1,06 |
| c02-infancia | terraza de la sala | emocionar (el hook) | `ct14` (27) | 60 | 68 | f61 → f105 | disolver | 1,00→1,10 |
| c03-familia | sala abierta con vidrio | prometer | `ct07` (22) | 128 | 87 | f129 → f192 | disolver | 1,00→1,10 |
| c04-diseno | jardín | revelar (lo que lo hace posible) | `ct01` (22) | 215 | 100 | f216 → f292 | disolver | 1,00→1,06 |
| c05-comodos | sala de la tele | cómo se vive | `ct09` (19) | 315 | 84 | f316 → f376 | disolver | 1,00→1,10 |
| c06-patrimonio | alcoba principal | valor | `ct16` (13) | 399 | 98 | f400 → f474 | disolver | 1,00→1,10 |
| c07-cta | jardín al atardecer | recompensa + acción | `ct18` (14) | 497 | 220 | f498 → f705 | disolver | 1,00→1,06 |
| c08-cierre | tarjeta oscura | cerrar (nada se congela) | negro liso (foto) | 717 | 66 | — | corte | 1,00 |

## Sonido

| Qué | Cómo |
|---|---|
| Voz | el WAV TRATADO de cada toma (`<toma>-voz.wav`: highpass 100 Hz → puerta suave → compresor 3,5:1 desde −30 dBFS → ganancia → limitador a −2,5 dBFS), **a −15,0 LUFS en su frase** (±0,4), pico real ≤ −2,5 dBTP (las crudas llegaban a −27/−31 LUFS). Fuera de su frase, silencio: lo que sigue en cada clip («y se acabará…», «haz clic…») no suena en el hueco |
| Música | *Pictures from the Past* desde 57,026 s (`INICIO_MUSICA`): golpe de 13,3 dB en f1; a −15 LUFS en la apertura; baja con curva de coseno y acaba de bajar en la primera palabra (f61) a ≈ −11 dB; se compensa la caída natural de la canción (f539, +6 dB en 2 s) y se apaga en 22 f desde la última palabra (f705), antes del siguiente golpe de la canción (f731); la tarjeta, en silencio |
| Pieza entera (ebur128 del render) | −15,6 LUFS · pico −3,8 dBFS · LRA 2,1 LU |

## Texto (frame en que entra cada línea)

| Bloque | Líneas |
|---|---|
| a01 | f61 «La infancia» · f79 **«pasa rápido.»** |
| b01 | f129 «Tu familia merece» · f159 **«respirar distinto.»** |
| c01 | f215 «Diseño moderno,» · f246 «naturaleza» · f258 **«y privacidad.»** |
| d01 | f315 «Una casa donde» · f346 «todos caben» · f361 **«cómodos.»** |
| e01 | f399 «Esta no es solo» · f426 «una casa,» · f449 **«es patrimonio.»** (⚠ «solo»: por confirmar al oído) |
| f01 | f497 «Volver no es una idea,» · f545 **«es una dirección.»** |
| f02 | f577 «Haz clic en el enlace» · f605 «y agendemos» · f627 **«su visita.»** |
| f03 | f654 «Puede ser virtual» · f673 «o presencial.» |

## Cierre

La imagen de Isabella funde a negro entre f710 y f716 (6 f, negro exacto en su último fotograma); la tarjeta (f717-783, 2,2 s) lleva el logo a 440 px y 60 % de opacidad y `PropiedadesLuxur.com`.
