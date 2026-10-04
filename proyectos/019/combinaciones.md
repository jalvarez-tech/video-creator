# Combinaciones del 019 · Los Patios · apto 501 · V3

> Registro de lo que se montó en la **tercera versión** del reel (con qué toma y con qué música) y de cómo cambiar cada pieza para sacar una V4.
> Se lee junto a [`proyectos/017/combinaciones.md`](../017/combinaciones.md) (la V1, su tablero de variantes de hooks, mitades, CTA, recorridos y
> música alternativa en el §3 —con el **registro de lo ya elegido** arriba—, y la receta del §4), [`proyectos/018/combinaciones.md`](../018/combinaciones.md) (la V2),
> `catalogo-material.md` (los códigos HK/MD/CT/RC/DR) y [`archivos/musica/registro-de-uso.md`](../../archivos/musica/registro-de-uso.md) (el tablero de coordinación
> entre sesiones). Todo lo de esta versión está medido sobre los archivos: el plan está en `remotion/src/proyectos/019/` y `node proyectos/019/revisar-019.mjs` lo comprueba.

## 1. Registro de versiones

| Versión | Hook | Mitad | CTA | Recorrido | Dron | Música (`desde`) | Dura | Estado |
|---|---|---|---|---|---|---|---|---|
| **V1 rev. 8** · «La oportunidad» (proyecto 017) | HK02 (`INT-ABIERTO`) | MD09 (`INT-ABIERTO`) | CT07 (`TERRAZA`) | RC25 · RC01 · RC02 · RC07 → RC08 continua → DR163 | DR147 | *Time* — Hans Zimmer, 175,633 s | 46,6 s | **final exportado el 2026-10-03** |
| **V2 rev. 3** · «El espacio y cómo entra el exterior» (proyecto 018) | HK07 (`PATIO`) | MD07 (`TERRAZA`) | CT01 (`BALCON`) | RC11 · RC10 · RC11 → RC06 · RC05 · RC03 · RC25 · RC07 | DR155 | *Return to Oasis* — Aleksey Chistilin, 142,967 s | 44,2 s | **final exportado el 2026-10-04** (la «en» del CTA sin oír) |
| **V3 rev. 1** · «Altura sin torre» (proyecto 019) | **HK05** (`BARANDA`) | **MD08** (`TERRAZA`) | **CT05** (`INT-BLOQUES`) | **RC25 en el frame 0** → hook → DR152 → RC09 (partida en dos) · mitad · RC13 · RC16 (partida en dos) | **DR152**, como primer plano del recorrido (no en el frame 0) | ***Flying Into the Sun*** — Aleksey Chistilin, 178,095 s | **39,7 s** | **prueba lista** (`pruebas-720p/019-recorrido-720p.mp4`); espera el OK y oír dos palabras |
| V4 | | | | | | | | |

Las tres versiones comparten: el formato (los seis bloques de `recorrido-luxur`), las reglas fijas del canal (la primera toma sin texto ni voz, nunca el sello, el cierre en una tarjeta oscura con el logo a 440 px y 60 % y `PropiedadesLuxur.com`, nada congelado), los subtítulos editoriales abajo al 90 % con la cursiva 8 px menor, el nivel de la voz (−21 LUFS) y de la música (−15 sola, −16 dB bajo la voz) y la base del color. **Lo que separa a la V3 de las otras:** las tres tomas de Isabella, la canción (la primera SIN pulso: por frases), la apertura (la fachada y no un dron), el dron (tras el hook y no antes), el sentido del paseo (II, como la V2) y casi todo el metraje de recorrido.

### El registro de lo ya elegido (~~tachado~~ = no se vuelve a elegir)

| | V1 · 017 | V2 · 018 | V3 · 019 |
|---|---|---|---|
| Canción | ~~*Time* — Hans Zimmer~~ | ~~*Return to Oasis* — Aleksey Chistilin~~ | ~~*Flying Into the Sun* — Aleksey Chistilin~~ |
| Hook | ~~HK02~~ | ~~HK07~~ | ~~HK05~~ |
| Mitad | ~~MD09~~ | ~~MD07~~ | ~~MD08~~ |
| CTA | ~~CT07~~ | ~~CT01~~ | ~~CT05~~ |
| Dron | ~~DR147~~ · ~~DR163~~ | ~~DR155~~ | ~~DR152~~ |
| Recorridos | RC01 RC02 RC07 RC08 (+ RC25) | RC03 RC04 RC05 RC06 RC07 RC10 RC11 (+ RC25) | RC09 · RC13 · RC16 (+ RC25, solo en la apertura) |

**Libres para una V4:** hooks HK01 · HK01a · HK01b · HK03 · HK04 · HK06 · HK08 · HK09 · HK10; mitades MD01 · MD01a · MD02 · MD03 · MD04 · MD05 · MD06 · MD10 · MD11 · MD12 · MD13 · MD14; CTA CT02 · CT03 · CT04 · CT06 (con el aviso de cada una en el registro: el precio de CT02/CT03, ALH en CT04, «reto» en CT06); drones DR148 · DR149 · DR150 · DR151 · DR153 · DR154 · DR156; canciones *Deep Breath*, *Fortitude (Light Version)*, *In This Together*, *Luxury, Elegance, Refined*, *Heaven on Earth* y el resto del catálogo de música. Recorridos sin usar: RC12 · RC14 · RC15 · RC17-RC24 · RC26 (y RC22, propuesto y descartado en esta versión: `artefactos/01-plan.md`).

## 2. V3 al detalle

### 2.1 El guion: tres frases de Isabella

| Bloque | Toma | Lugar | Dice | Ventana de voz (s del clip) | LUFS |
|---|---|---|---|---|---|
| 2 · hook | **HK05** `1 Hooks/Hook5.MOV` | `BARANDA` | «¿Y si pudieras vivir en altura sin sentir que vives dentro de una torre?» | 0,26 → 3,67 | −20,7 |
| 4 · mitad | **MD08** `2 Mitad/Medio8.MOV` | `TERRAZA` | «La doble altura permite que la luz y ventilación ingresen a la vivienda.» | 0,77 → 4,83 | −17,9 |
| 6 · CTA | **CT05** `5 Cta/CTA5.MOV` | `INT-BLOQUES` | «Si encaja con lo que estás buscando, escríbeme.» | 0,68 → 3,13 | −18,9 |

Arco: **pregunta → cómo → invitación** (ángulo E del catálogo, «altura sin torre»). **Ninguna cifra** en toda la pieza. Es la pieza más corta de las tres: CT05 dura 3,6 s y el reel se queda en 39,7 s (la V1 46,6 s, la V2 44,2 s); el formato pide 45-50 s «como objetivo» y la puerta solo exige el tope de 55 s. Si se quiere más larga, la salida es un CTA más largo (CT04, CT06) o un plano más en el bloque 5.

### 2.2 Los once planos

La tabla completa (clip, tramo en segundos, `en`, `dur`, golpe, entrada y zoom de cada plano) está en [`artefactos/03-timeline.md`](artefactos/03-timeline.md). Resumen por bloque:

| Bloque | Planos (`id` → clip, tramo) | Golpes de los cortes |
|---|---|---|
| 1 · fachada | `c01-fachada` → RC25, 3,00-6,07 s | 0 (apertura) |
| 2 · hook | `c02-hook` → HK05, 0,17-4,07 s (a corte; opaca en f92, su voz en f95) | 92 |
| 3 · dron y patio | `c03-dron` → DR152, 14,00-18,03 · `c04-patio` → RC09, 4,60-7,87 · `c05-plantas` → RC09, 7,87-12,63 (la misma toma) | 209 · 330 · **428** |
| 4 · mitad | `c06-mitad` → MD08, 0,73-5,13 s | 571 |
| 5 · alcoba, bloques y vista | `c07-umbral` → RC13, 2,60-5,70 · `c08-bloques` → RC16, 20,60-23,23 · `c09-vista` → RC16, 23,23-28,77 (la misma toma) | 703 · 796 · **875** |
| 6 · CTA | `c10-cta` → CT05, 0,63-3,60 s · `c11-cierre` → la tarjeta oscura (negro liso) | **1041** · — |

**Qué comparte con la V1 y la V2 en metraje:** un clip. **RC25** («Exterior edificio4»), pedido por el usuario para el frame 0: 3,0-6,07 s aquí; 1,2-3,1 s en la V1 y 0,0-2,7 s en la V2; **comparte ≈ 0,1 s con la V1 y nada con la V2** (la ventana se eligió para eso: la cámara avanza por el camino, en vez del contrapicado que ya salió dos veces). Nada más repite metraje: DR152, RC09, RC13, RC16 y las tres tomas de Isabella son nuevos.

Hashes (sha256, 8 primeros) de los originales, en `proyectos/019/normalizar.mjs`: HK05 `8c2339ca` · MD08 `0fc82ec7` · CT05 `ef4debbb` · RC25 `3d1aa61c` · RC09 `9f2b2e32` · RC13 `37a2f0fd` · RC16 `938b9b3a` · DR152 `91acff0e` · música `ca1f1cbf`.

### 2.3 La música

**«Flying Into the Sun» — Aleksey Chistilin** · `Music/Aleksey Chistilin - Flying Into the Sun.mp3` (copia en `proyectos/019/original/musica-flying.mp3`) · Do menor · 120 (o 60) BPM según el catálogo, pero **sin pulso medible** · *ascenso, libertad, esperanza* · 4:13.

- **Entrada en 178,067 s** (28 ms antes de su golpe de 10,1 dB en 178,095 s, el primero fuerte tras un respiro de 2,5 s). No es el `desde` del catálogo (172,37 s, gancho ★): el escáner de `herramientas/buscar-entrada.py` la eligió porque desde ahí hay una meseta con **crescendo** (−12 → −7,8 LUFS en 30 s), un golpe de frase cada ≈ 2,5 s para cortar y, a los **34,7 s, una caída de ≈ 20 dB en 4 s a un lecho suave** (−23 LUFS) que no vuelve a subir en los 15 s siguientes: justo donde entra el CTA.
- **Va por frases, no por pulso.** `herramientas/rejilla.py` barre periodos de 0,25 a 1,30 s sobre los golpes de la ventana y la mejor recta deja solo el 27 % de los fuertes a ≤ 15 ms (desvío medio de 51 ms); el control, *Return to Oasis*, da el 89 % a 10 ms. Así que no hay una recta que escribir: los **golpes medidos** (`musica/golpes-019.json`) son la rejilla y la puerta comprueba que cada plano entra en uno, a ≤ 1 f de donde SUENA.
- **Por qué esta canción** (tabla de lo medido y de las descartadas en `artefactos/01-plan.md`): *Deep Breath* cae en una bajada lenta de 7 s; *Begin Again* cae a silencio y vuelve con un golpe de 20,7 dB bajo la voz; *Heaven on Earth*, *Luxury, Elegance, Refined* y las planas no tienen caída; *Utopia* es de la misma artista y timbre que la V2.
- **El sitio de cada cosa en la canción** (tabla completa en `artefactos/03-timeline.md`): golpe de entrada → la fachada; 181,08 → Isabella (hook); 184,98 → el dron; 189,02 · 192,28 → el patio y las plantas; 197,06 → la mitad; 201,44 · 204,56 → la alcoba y los bloques; 207,19 → la vista; **212,71 → la caída: el CTA**.
- **Un tema por pieza, de principio a fin.** La música NO sale de una librería con licencia verificada (§4).

### 2.4 La mezcla (medida sobre la prueba)

| Qué | Nivel |
|---|---|
| Voz de Isabella (hook · mitad · CTA) | −20,7 · −20,3 · −20,9 LUFS con la música debajo (objetivo −21; una ganancia por toma: −0,3 · −3,1 · −2,1 dB) |
| Música sola | −18,9 (la apertura) · −16,3 (dron y patio) · −13,7 (alcoba → vista) LUFS: sube con el crescendo de la canción |
| Música bajo la voz | hook y mitad: −16 dB (≈ −31 LUFS: **≈ 10 LU bajo ella**); **CTA: sigue la caída de la canción** (siempre ≈ 10 LU bajo su voz y sin perderse: −30,9 como mucho, −31,5 como poco) |
| Música bajo la tarjeta | el lecho se apaga en línea recta del f1130 al f1188; la tarjeta mide −37,6 LUFS |
| Pieza entera | **−16,1 LUFS** integrados · pico real −5,5 dBFS · LRA 8,5 LU |

### 2.5 El texto

- **La primera toma sale siempre sin texto** (regla fija): el primer subtítulo entra en el f94, con Isabella ya opaca (f92).
- Todo lo que dice Isabella, **abajo**, en subtítulos editoriales (Montserrat 45 px y Playfair Display itálica **91 px**, sin sombra), **a 90 % de opacidad**, con el velo de la V1 y la V2 (alfas 0,62 / 0,34; legibilidad medida igual que la V1 aprobada: 3,2-4,3 : 1 al p90 y 2,1-3,0 al p99, ver `artefactos/03-timeline.md`). 13 líneas en 6 bloques, 3 acentos: **torre?** · **la luz** · **escríbeme.**
- **Nunca el sello «PROPIEDADES LUXUR».** El cierre es la tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com`.
- Los tiempos de las 13 líneas están llevados a su palabra con la voz SOLA (`herramientas/lineas-vs-onsets.py`: entre 0,7 y 2,5 f antes) y comprobados sobre el render (`subs-vs-voz.py`).

### 2.6 Lo que NO se usó (y por qué)

- Lo tachado (arriba) y todos los clips del 017 y el 018 salvo RC25 en la apertura.
- **RC22** (propuesto en el encargo como ejemplo de sin usar): es la entrada a pie del edificio, que no es un tramo del paseo en el sentido II (terraza → ventanal); queda para una V4 que abra por la calle.
- Ningún SFX, ninguna `velocidad` ≠ 1, ninguna segunda canción.

## 3. Cómo cambiar cada pieza (para una V4)

| Quiero cambiar… | Dónde | Ojo |
|---|---|---|
| un **hook / mitad / CTA** | `normalizar.mjs` (añadir el original, sha, y ejecutarlo) · `metraje-019.ts` (`src`, `desde`, `voz` con `s0`/`s1`/`lufs`/`dice`, y `entra`) · `voz/*.txt` · `subtitulos-019.ts` | mide la voz con `limites-voz.py` (no con whisper, R29); lleva cada línea a su onset (`onsets-voz.py`, `palabras-desde.py`, `lineas-vs-onsets.py`: añade la toma a `TOMAS` y las líneas a `LINEAS`). **Una toma con ≥ 0,43 s de aire antes de su primera palabra entra con disolvencia** (`entra: "disolver"`, `desde` = el frame anterior a su primera palabra); sin ese aire (HK05) entra a corte con `desde` = `round(s0·30) − 3`. Una cola < 14 f tras la última palabra obliga a salir a corte |
| la **canción** | `normalizar.mjs` (`MUSICA`) · `metraje-019.ts` (la tabla `GOLPE`, `INICIO_MUSICA` a un frame) · `musica/golpes-019.json` (`medir-pista.py --json`) · `audio-019.ts` (`LUFS_MESETA`, `CAIDA_LUFS` si la canción cae al entrar el CTA) | `buscar-entrada.py` busca la entrada; `rejilla.py` dice si va por pulso o por frases (pulso: se puede volver a una recta como la del 018); **comprueba sobre el audio del render que cada corte seco cae en un golpe que suena** (`golpes-render.py`, y la energía fotograma a fotograma si hay una rampa de la música debajo) |
| el **arranque de un plano** | su `desde` en `metraje-019.ts` (segundos de la fuente, escrito como `fr(n)`) | la disolvencia pide 12 f de clip ANTES de `desde`; la puerta mide el metraje disponible y que ningún tramo se repita. Las dos mitades de una toma partida (RC09, RC16) cambian juntas |
| la **ventana de la apertura** (RC25) | `c01-fachada` → `desde` (hoy `fr(90)` = 3,0 s) | `fr(0)` vuelve al contrapicado de 0-3 s que ya salió en las dos versiones: la 9b lo informará (≈ 2,7 s con la V2) |
| el **color de un plano** | su línea `color:` (o `COLOR_PATIO`, `COLOR_RC16`) en `metraje-019.ts` | topes de la puerta: `vibrance` ≤ 0,05 · \|`exposure`\| ≤ 0,4 · `saturation` 0,95-1,12 y ≤ 1,06 en Isabella; mídelo con `medir-color.py` (antes/después con el mismo backend de GL) |
| el **dron** | `c03-dron` (`src`, `desde`) | la puerta exige UN dron y que sea el primer plano del bloque 3 |
| el **final del paseo / la vista** | `c08-bloques` y `c09-vista` (RC16) | la vista tiene que seguir siendo el plano más largo del bloque 5; acaba a los 28,77 s del clip, antes de que una cortina oscura tape el cuadro (≥ 29,5 s) |
| la **música sí/no** | `HAY_MUSICA` en `audio-019.ts` | `false` = la pieza sale solo con voz, para subirla con el audio de la plataforma |

Receta completa y orden de pasos: `proyectos/017/combinaciones.md` §4 (las rutas son las de este proyecto) y `.claude/skills/recorrido-luxur/montaje.md`.

## 4. Por confirmar

- **Dos palabras sin oír** (medidas, no confirmadas; `node proyectos/019/revisar-019.mjs --final` falla mientras las notas sigan):
  - **«y (la) ventilación»** (MD08, ≈ **21,1 s** del vídeo): se pinta «y ventilación». Whisper omite el segundo «la»; midiendo, entre la «y» y el «ven-» no hay una /a/ (F1 de sus /a/ ≈ 790 Hz; ahí ≤ 540) ni un onset nuevo. Si suena «y la ventilación»: el texto del 2.º trozo de `m02`, `voz/mitad.txt`, el `dice` de `c06-mitad` y el `.srt`.
  - **«escríbeme»** (CT05, ≈ **36,6-37,2 s**): se pinta «escríbeme.». Whisper oye «escribe a mí» (confianza 0,30-0,62); midiendo, tras la [e] de «-be» viene un murmullo nasal de ≈ 130 ms y no una /a/.
  - «¿Y si…?» (HK05) está **cerrada** (whisper la oye desde 0,20-0,30 s y la energía da tres arranques: y · si · pu-).
- **Licencia de la música** (*Flying Into the Sun*, de la biblioteca de Luxur): no verificada. Para publicar, la biblioteca de la plataforma, la licencia confirmada, o `HAY_MUSICA = false`.
- **El canal del CTA:** «escríbeme» no dice dónde (DM o WhatsApp); el cierre lleva el logo y la web.
- **La música, sin oír.** Todo lo de la canción está medido (golpes, caída, niveles) pero ninguna decisión está oída: que el golpe de apertura suene bien como primera nota y que el lecho sea agradable bajo la voz del CTA lo dice el oído.
- **Isabella de espaldas en el bloque 5** (RC16, 4.ª aparición, muda y sin cara): lectura declarada en `artefactos/01-plan.md`. Si se prefiere una vista sin ella, no hay otra vista de ese rincón sin usar.
- **La lectura del encargo:** «la ventana que mejor abra» de RC25 se leyó como «la que abre con movimiento y repite lo mínimo» (3,0-6,07 s), no como «el contrapicado de siempre». Está en `artefactos/01-plan.md`, con la salida si era la otra.
- **Un solo atajo de la puerta:** la puerta de esta pieza no cruza `lineas-vs-onsets.py` ni `medir-color.py` con el plan (como las anteriores): si cambia una línea o un plano, se cambian allí también.
