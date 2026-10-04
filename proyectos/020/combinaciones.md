# Combinaciones del 020 · Los Patios · apto 501 · V4

> Registro de lo que se montó en la **cuarta versión** del reel (con qué toma y con qué música) y de cómo cambiar cada pieza para sacar una V5.
> Se lee junto a [`proyectos/017/combinaciones.md`](../017/combinaciones.md) (la V1, su tablero de variantes de hooks, mitades, CTA, recorridos y música alternativa en el §3 y la receta del §4),
> [`proyectos/018/combinaciones.md`](../018/combinaciones.md) (la V2), `proyectos/019/combinaciones.md` (la V3, que en el momento de montar esta no estaba en git), `catalogo-material.md` (los códigos HK/MD/CT/RC/DR),
> [`archivos/musica/registro-de-uso.md`](../../archivos/musica/registro-de-uso.md) (el tablero de coordinación entre sesiones) y [`analisis-uso.md`](analisis-uso.md) (lo que se leyó antes de elegir).
> Todo lo de esta versión está medido sobre los archivos: el plan está en `remotion/src/proyectos/020/` y `node proyectos/020/revisar-020.mjs` lo comprueba.
> **No se editaron los `combinaciones.md` de otros proyectos** (chocarían entre ramas): la fila de la V4 se añade a los de la V1, la V2 y la V3 cuando estas ramas se unan.

## 1. Registro de versiones

| Versión | Apertura | Hook | Mitad | CTA | Recorrido | Dron | Música (`desde`) | Dura | Estado |
|---|---|---|---|---|---|---|---|---|---|
| **V1 rev. 8** · «La oportunidad» (017) | dron DR147 (2,0 s) | HK02 (`INT-ABIERTO`) | MD09 (`INT-ABIERTO`) | CT07 (`TERRAZA`) | RC25 · RC01 · RC02 · RC07 → RC08 continua → DR163 | DR147 · DR163 | *Time* — Hans Zimmer, 175,633 s | 46,6 s | **final exportado el 2026-10-03** |
| **V2 rev. 3** · «El espacio y cómo entra el exterior» (018) | dron DR155 (2,3 s) | HK07 (`PATIO`) | MD07 (`TERRAZA`) | CT01 (`BALCON`) | RC11 · RC10 · RC11 → RC06 · RC05 · RC03 · RC25 · RC07 | DR155 | *Return to Oasis* — Aleksey Chistilin, 142,967 s | 44,2 s | **final exportado el 2026-10-04** |
| **V3 rev. 1** · «Altura sin torre» (019) | fachada RC25 (3,07 s) | HK05 (`BARANDA`) | MD08 (`TERRAZA`) | CT05 (`INT-BLOQUES`) | RC09 · RC13 · RC16 | DR152 (tras el hook) | *Flying Into the Sun* — Aleksey Chistilin, 178,095 s | 39,7 s | prueba lista; sin commit |
| **V4 rev. 1** · «Lo que todavía puedes definir» (020) | **la calle RC22 (2,53 s)** | **HK03** (`INT-BLOQUES`) | **MD14** (`PATIO`) | **CT06** (`INT-ABIERTO`) | RC02 · RC05 · RC09 → MD14 → RC13 · RC04 | **DR156**, el último plano del bloque 5 | ***Sax for the Last Customer*** (jazz) — 137,615 s | **41,8 s** | **prueba lista** (`pruebas-720p/020-recorrido-720p.mp4`); espera el OK y oír dos palabras |
| V5 | | | | | | | | | |

Las cuatro versiones comparten: el formato (los seis bloques de `recorrido-luxur`), las reglas fijas del canal (la primera toma sin texto ni voz, nunca el sello, el cierre en una tarjeta oscura con el logo a 440 px y 60 % y `PropiedadesLuxur.com`, nada congelado), los subtítulos editoriales abajo al 90 % con la cursiva 8 px menor, el nivel de la voz (−21 LUFS) y de la música (−15 sola, −16 dB bajo la voz) y la base del color. **Lo que separa a la V4 de las otras:** las tres tomas de Isabella, la canción (la **única de jazz**, sin pulso y con un final en seco como resolución), la apertura (la calle y no un dron ni la fachada), la posición del dron (al final y no al principio ni tras el hook), el sentido del paseo (I, como la V1) y **todo el metraje de recorrido** (ni un segundo en común con ninguna versión).

### El registro de lo ya elegido (~~tachado~~ = no se vuelve a elegir)

| | V1 · 017 | V2 · 018 | V3 · 019 | V4 · 020 |
|---|---|---|---|---|
| Canción | ~~*Time*~~ | ~~*Return to Oasis*~~ | ~~*Flying Into the Sun*~~ | ~~*Sax for the Last Customer*~~ |
| Hook | ~~HK02~~ | ~~HK07~~ | ~~HK05~~ | ~~HK03~~ |
| Mitad | ~~MD09~~ | ~~MD07~~ | ~~MD08~~ | ~~MD14~~ |
| CTA | ~~CT07~~ | ~~CT01~~ | ~~CT05~~ | ~~CT06~~ |
| Dron | ~~DR147~~ · ~~DR163~~ | ~~DR155~~ | ~~DR152~~ | ~~DR156~~ |
| Recorridos | RC01 RC02 RC07 RC08 (+ RC25) | RC03 RC04 RC05 RC06 RC07 RC10 RC11 (+ RC25) | RC09 · RC13 · RC16 (+ RC25) | RC22 · RC02 · RC05 · RC09 · RC13 · RC04 (ventanas sin tocar) |

**Libres para una V5:** hooks HK01 · HK01a · HK01b (con «ven, te enseño» dudosa) · HK04 (lleva «317») · HK06 · HK08 (lleva el precio) · HK09 · HK10; mitades MD01 · MD01a · MD02 · MD03 · MD04 · MD05 · MD06 · MD10 · MD11 · MD12 · MD13 (con el aviso de cada una en el registro); CTA **CT04** (nombra a ALH sin confirmar que se pueda), y CT02 y CT03 solo si se relaja la regla del precio (el formato lo prohíbe en el bloque 6); drones DR148 · DR149 · DR150 · DR151 (la torre vecina con malla negra) · DR153 · DR154; canciones: el resto del catálogo, **ninguna más de jazz** (las lounge/sax medidas están en `01-plan.md`: *Daniel Armand* es la segunda opción técnica si se quiere otro color). Recorridos sin usar: RC12 · RC14 · RC15 · RC17-RC21 · RC23 · RC24 · RC26; y ventanas libres de RC10 (0-4,0 s y 8,4-11,9 s), RC01, RC03, RC06, RC07 (5-11,4 s), RC08, RC11 y RC16 (0-20,6 s: lleva a Isabella).

**⚠ El cuello de botella son los CTA:** tras esta versión solo queda un CTA usable (CT04). **La V5 es la última con un CTA no repetido**; en la V6 habrá que repetir uno (el menos reciente es CT07, V1) o decidir si el precio puede ir en el CTA.

## 2. V4 al detalle

### 2.1 El guion: tres frases de Isabella

| Bloque | Toma | Lugar | Dice | Ventana de voz (s del clip) | LUFS |
|---|---|---|---|---|---|
| 2 · hook | **HK03** `1 Hooks/Hook3.MOV` | `INT-BLOQUES` | «Si estás buscando un apartamento totalmente terminado, este probablemente no es para ti.» | 0,81 → 6,04 | −24,15 |
| 4 · mitad | **MD14** `2 Mitad/Medio14.MOV` | `PATIO` | «No estás viendo un apartamento sin terminar, estás viendo uno que todavía puedes definir.» | 0,57 → 5,77 | −18,51 |
| 6 · CTA | **CT06** `5 Cta/CTA6.MOV` | `INT-ABIERTO` | «Si es el reto, escríbeme y agendamos una visita.» | 0,86 → 3,70 | −16,03 |

Arco: **filtro → reencuadre → invitación**. **Ninguna cifra** en toda la pieza.

### 2.2 Los once planos

La tabla completa (clip, tramo en segundos, `en`, `dur`, golpe, entrada y encuadre de cada plano) está en [`artefactos/03-timeline.md`](artefactos/03-timeline.md). Resumen por bloque:

| Bloque | Planos (`id` → clip, tramo) | Golpes de los cortes |
|---|---|---|
| 1 · calle | `c01-calle` → RC22, 3,90-6,43 s | 3 (apertura) |
| 2 · hook | `c02-hook` → HK03, 0,70-6,23 s (disolvencia f64-76, opaca en f76; voz desde f79) | 76 |
| 3 · el paseo | `c03-pasillo` → RC02, 0,00-4,47 · `c04-abierto` → RC05, 0,00-2,77 · `c05-patio` → RC09, 0,00-3,53 | 242 · 376 · 459 |
| 4 · mitad | `c06-mitad` → MD14, 0,50-6,27 s (disolvencia f553-565; voz desde f567) | 565 |
| 5 · alcoba, cielo y dron | `c07-alcoba` → RC13, 10,93-15,37 (disolvencia f726-738) · `c08-cielo` → RC04, 0,00-2,23 · `c09-dron` → DR156, 0,50-5,53 (el plano más largo) | 738 · 871 · 938 |
| 6 · CTA | `c10-cta` → CT06, 0,77-4,23 s (disolvencia f1077-1089; voz desde f1092) · `c11-cierre` → la tarjeta oscura | 1089 · — (el acorde final, en f1183) |

**Qué comparte con la V1, la V2 y la V3 en metraje:** nada. Cuatro clips ya habían salido, con otra ventana: RC02 (la V1: 9,8-13,6 s; aquí 0,0-4,5 s), RC05 (la V2: 3,2-5,9 s; aquí 0,0-2,8 s), RC09 (la V3: 4,6-12,6 s; aquí 0,0-3,5 s) y RC13 (la V3: 2,6-5,7 s; aquí 10,9-15,4 s).

Hashes (sha256, 8 primeros) de los originales, en `proyectos/020/normalizar.mjs`: HK03 `d7d1566c` · MD14 `b31142d4` · CT06 `136ae549` · RC22 `624fa272` · RC02 `6858ee03` · RC05 `4cd13369` · RC09 `9f2b2e32` · RC13 `37a2f0fd` · RC04 `29ba2ea0` · DR156 `07cbeeef` · música `7a1c2932`.  RC10 (`1ebd08b6`) y RC12 (`fe277de5`) se copiaron para probar y se quitaron de la receta: no están en el plan.

### 2.3 La música

***Sax for the Last Customer*** · `Music/Sax for the Last Customer.mp3` (copia en `proyectos/020/original/musica-sax.mp3`) · La menor · ~81 BPM · jazz / smooth jazz con saxofón (género **inferido** por el catálogo, no oído) · 3:00.

- **Entrada en 137,615 s** (`INICIO_MUSICA = 4128/30` = 137,6 s; 45 ms antes de su golpe de 33,7 dB en 137,645 s, el más fuerte de la pista, tras un descenso a ≈ −45 dB). `buscar-entrada.py` propuso 124,303 s (golpe de 19,4 dB y una «caída» de solo 5,5 dB); se eligió 137,6 s por su **final natural**: el acorde de 176,986 s cae a los 39,44 s.
- **Va por golpes, no por pulso** (`rejilla.py`: 46 % de los golpes fuertes a ≤ 15 ms de la mejor recta de 0,371 s, desvío de 79,7 ms). Los **golpes medidos** (`musica/golpes-020.json`) son la rejilla y la puerta comprueba que cada plano entra en el suyo, a ≤ 1 f de donde SUENA.
- **Resolución = el acorde final** (f1183,2, 20,9 dB): la última palabra del CTA acaba en f1177 y la música sube de su nivel bajo al «solo» en esos 5 f; la cola de 2 s se apaga bajo la tarjeta. Un respiro a ≈ −27 dB en 158,5-160,5 s de la canción (f630-676) cae bajo la voz de la mitad.
- **El sitio de cada cosa en la canción:** 137,645 → la calle · 140,067 → Isabella (hook) · 145,629 → el pasillo · 150,087 → el espacio abierto · 152,859 → el patio · 156,384 → Isabella (mitad) · 162,142 → la alcoba · 166,587 → el cielo · 168,822 → el dron · 173,838 → Isabella (CTA) · **176,986 → el acorde final**.
- **Un tema por pieza, de principio a fin.** La música NO sale de una librería con licencia verificada (§4).

### 2.4 La mezcla (medida sobre la prueba)

| Qué | Nivel |
|---|---|
| Voz de Isabella (hook · mitad · CTA) | −20,0 · −20,9 · −20,3 LUFS con la música debajo (objetivo −21; una ganancia por toma: +3,1 · −2,5 · −5,0 dB) |
| Música sola | −15,1 · −14,8 · −15,0 LUFS (plana, como la canción) |
| Música bajo la voz | −16 dB (≈ −30,9 LUFS: 9,9 LU bajo ella) |
| Pieza entera | **−16,0 LUFS** integrados · pico real −3,6 dBFS · LRA 6,8 LU |

### 2.5 El texto

- **La primera toma sale siempre sin texto** (regla fija): el primer subtítulo entra en el f78, con Isabella ya opaca (f76). En ella se lee el rótulo «PATIOS» **del edificio** (pintado en el ladrillo), no texto de la pieza.
- Todo lo que dice Isabella, **abajo**, en subtítulos editoriales (Montserrat 45 px y Playfair Display itálica **91 px**, sin sombra), **a 90 % de opacidad**, con el velo de las versiones anteriores (alfas 0,62 / 0,34; legibilidad medida: 3,2-4,0 : 1 al p90 y 2,5-3,3 al p99). 15 líneas en 6 bloques, 4 acentos: **terminado,** · **para ti.** · **definir.** · **escríbeme**.
- **Nunca el sello «PROPIEDADES LUXUR».** El cierre es la tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com`.
- Los tiempos de las 15 líneas están llevados a su palabra con la voz SOLA (`herramientas/lineas-vs-onsets.py`: entre 0,8 y 2,5 f antes). El DTW de whisper iba de 3 a 11 f pronto o tarde.

### 2.6 Lo que NO se usó (y por qué)

Ver `artefactos/01-plan.md` («Material que NO entra»): lo tachado, RC10 y RC12 (alternativas descartadas), RC16 (Isabella de espaldas, ya salió), los drones con la torre de malla negra, ningún SFX, ninguna `velocidad` ≠ 1, ninguna segunda canción.

## 3. Cómo cambiar cada pieza (para una V5)

| Quiero cambiar… | Dónde | Ojo |
|---|---|---|
| un **hook / mitad / CTA** | `normalizar.mjs` (añadir el original, sha, y ejecutarlo) · `metraje-020.ts` (`src`, `desde`, `voz` con `s0`/`s1`/`lufs`/`dice`, y `entra`) · `voz/*.txt` · `subtitulos-020.ts` · `herramientas/lineas-vs-onsets.py` (`TOMAS` y `LINEAS`) · `revisar-020.mjs` (`LUGAR` en 2b y la tabla `ANTES`) | mide la voz con `limites-voz.py` (no con whisper, R29); lleva cada línea a su onset (`onsets-voz.py`, `palabras-desde.py`, `lineas-vs-onsets.py`). **Una toma con ≥ 0,43 s de aire antes de su primera palabra entra con disolvencia** (`entra: "disolver"`, `desde` = **2-3 f antes** de su primera palabra para que el golpe en que acaba la disolvencia suene antes de la voz); sin ese aire entra a corte con `desde` = `round(s0·30) − 3`. Una cola < 14 f tras la última palabra obliga a salir a corte. Un acento de **una sola palabra**: dos largas las encoge el motor |
| la **canción** | `normalizar.mjs` (`MUSICA`) · `metraje-020.ts` (la tabla `GOLPE`, `INICIO_MUSICA` a un frame) · `musica/golpes-020.json` (`medir-pista.py --json`) · `audio-020.ts` (`LUFS_MESETA`, y la envolvente de la resolución) · `revisar-020.mjs` (la sección 5) | `buscar-entrada.py` busca la entrada **y una caída**; **una pista plana que acaba en seco no la tiene**: mira su final (`medir-pista.py --desde N --dur 8`) y entra de modo que su acorde final caiga justo tras la última palabra del CTA (`INICIO_MUSICA = acorde − (frame de la última palabra + 6 f)/30`). `rejilla.py` dice si va por pulso o por golpes; **comprueba sobre el audio del render que cada corte seco cae en un golpe que suena** (`golpes-render.py`) |
| el **arranque de un plano** | su `desde` en `metraje-020.ts` (segundos de la fuente, escrito como `fr(n)`) | la disolvencia pide 12 f de clip ANTES de `desde`; la puerta mide el metraje disponible y que ningún tramo se repita. **Mira dónde acaba el plano**: el cielo (RC04) bajaba por el marco negro de la ventana a los 2,5 s y daba un salto de +32 de luma al empalmar con el dron |
| la **apertura** (RC22) | `c01-calle` → `desde` (hoy `fr(117)` = 3,9 s) | la puerta exige RC22 en el frame 0, solo y una vez, y a corte; si la apertura cambia, cambian `rc22` en la sección 2 y el nombre del clip en `normalizar.mjs` |
| el **color de un plano** | su línea `color:` en `metraje-020.ts` | topes de la puerta: `vibrance` ≤ 0,05 · \|`exposure`\| ≤ 0,4 · `saturation` 0,95-1,12 y ≤ 1,06 en Isabella; mídelo con `medir-color.py` (antes/después con el mismo backend de GL) |
| el **dron** | `c09-dron` (`src`, `desde`) | la puerta exige UN dron y que sea el último plano del bloque 5 (y el más largo de su bloque) |
| la **música sí/no** | `HAY_MUSICA` en `audio-020.ts` | `false` = la pieza sale solo con voz y se pierde el acorde final |

Receta completa y orden de pasos: `proyectos/017/combinaciones.md` §4 (las rutas son las de este proyecto) y `.claude/skills/recorrido-luxur/montaje.md`.

## 4. Por confirmar

- **Dos palabras sin oír** (medidas, no confirmadas; `node proyectos/020/revisar-020.mjs --final` falla mientras las notas sigan):
  - **«terminado»** (HK03, ≈ **4,3-5,2 s** del vídeo): se pinta «terminado». Whisper-small, sin vocabulario, oye «determinado»; cortando la toma desde 2,05 y 2,20 s oye «totalmente terminado» y desde 2,50 s «terminado»; la palabra dura 0,78 s (4 sílabas a 0,17-0,19 s). Si suena «determinado»: el texto del trozo de `h01`, `voz/hook.txt` y el `dice` de `c02-hook`.
  - **«reto»** (CT06, ≈ **36,9-37,1 s**): se pinta «reto». Whisper-small oye «resto» (conf. de «el» 0,16); midiendo, hay /s/ en «Si» y en «es» y ninguna entre «el» y la pausa (HF − LF ≈ −40 dB). Si suena «resto»: el texto de `c01`, `voz/cta.txt` y el `dice` de `c10-cta`.
  - «agendamos» (whisper 0,04 en «ag») no se marca: se oye entera con cortes desde 1,70 s («hagendamos») y 2,615 s.
- **Licencia de la música** (*Sax for the Last Customer*, de la biblioteca de Luxur): no verificada. Para publicar, la biblioteca de la plataforma, la licencia confirmada, o `HAY_MUSICA = false`.
- **La canción, sin oír.** Todo lo que se decidió de ella (género «jazz», el golpe de apertura como primera nota, que un saxo continuo bajo la voz no compita, que el acorde final suene bien) está **medido, no oído**.
- **El canal del CTA** (DM o WhatsApp) y **si Luxur puede agendar una visita** (CT06 la pide: «agendamos una visita»).
- **El retroceso patio → espacio abierto** (la mitad en el patio y el CTA en el espacio abierto): ver `artefactos/01-plan.md`.
- **Un solo atajo de la puerta:** no cruza `lineas-vs-onsets.py` ni `medir-color.py` con el plan (como las anteriores): si cambia una línea o un plano, se cambian allí también.
