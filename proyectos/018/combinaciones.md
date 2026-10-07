# Combinaciones del 018 · Los Patios · apto 501 · V2

> Registro de lo que se montó en la **segunda versión** del reel (con qué toma y con qué música) y de cómo cambiar cada
> pieza para sacar una V3. Se lee junto a [`proyectos/017/combinaciones.md`](../017/combinaciones.md) (la V1, su tablero de
> variantes de hooks, mitades, CTA, recorridos y música alternativa en el §3, y la receta del §4, que sirven igual aquí) y
> `catalogo-material.md` (los códigos HK/MD/CT/RC/DR). Todo lo de esta versión está medido sobre los archivos: el plan está
> en `remotion/src/proyectos/018/` y `node proyectos/018/revisar-018.mjs` lo comprueba.

## 1. Registro de versiones

| Versión | Hook | Mitad | CTA | Recorrido | Dron | Música (`desde`) | Dura | Estado |
|---|---|---|---|---|---|---|---|---|
| **V1 rev. 8** · «La oportunidad» (proyecto 017) | HK02 (`INT-ABIERTO`) | MD09 (`INT-ABIERTO`) | CT07 (`TERRAZA`) | RC25 · RC01 · RC02 · RC07 → RC08 continua → DR163 | DR147 | *Time* — Hans Zimmer, 175,633 s | 46,6 s | **final exportado el 2026-10-03** (CRF 12 + CRF 16 + `.srt`) |
| **V2 rev. 3** · «El espacio y cómo entra el exterior» (proyecto 018) | **HK07** (`PATIO`) | **MD07** (`TERRAZA`) | **CT01** (`BALCON`) | RC11 · RC10 · RC11 → RC06 · RC05 · RC03 · RC25 · RC07 | **DR155** | ***Return to Oasis*** — Aleksey Chistilin, 142,967 s | **44,2 s** | **el subtítulo del CTA dice «diferente *en* un apartamento» (antes «a»: la vocal medida es una [e], ver `artefactos/01-plan.md` «Revisión 3»)**; todo lo demás, igual que la rev. 2; **final exportado el 2026-10-04 por orden del usuario** (`finales/018-recorrido.mp4` CRF 12 + `018-recorrido-crf16.mp4` + `018.srt`) con esa palabra **medida pero sin confirmar al oído** |
| V2 rev. 2 · «El espacio y cómo entra el exterior» (proyecto 018) | **HK07** (`PATIO`) | **MD07** (`TERRAZA`) | **CT01** (`BALCON`) | RC11 · RC10 · RC11 → RC06 · RC05 · RC03 · **RC25** · RC07 | **DR155** | ***Return to Oasis*** — Aleksey Chistilin, 142,967 s | **44,2 s** | **el plano que entra a los 30,6 s es la fachada desde el suelo (RC25 «Exterior edificio4», 0,0-2,7 s) en vez del cielo sobre el valle (RC04)**; todo lo demás, igual que la rev. 1; sustituida por la rev. 3 (su prueba: `pruebas-720p/018-recorrido-720p.mp4`; el CTA decía «a») |
| V2 rev. 1 · «El espacio y cómo entra el exterior» (proyecto 018) | **HK07** (`PATIO`) | **MD07** (`TERRAZA`) | **CT01** (`BALCON`) | RC11 · RC10 · RC11 → RC06 · RC05 · RC03 · RC04 · RC07 | **DR155** | ***Return to Oasis*** — Aleksey Chistilin, 142,967 s | **44,2 s** | sustituida por la rev. 2 (su prueba: `pruebas-720p/018-recorrido-720p-rev1.mp4`) |
| **V3 rev. 1** · «Altura sin torre» (proyecto 019, `proyectos/019/combinaciones.md`) | **HK05** (`BARANDA`) | **MD08** (`TERRAZA`) | **CT05** (`INT-BLOQUES`) | RC25 en el frame 0 · DR152 → RC09 · RC13 · RC16 | **DR152**, tras el hook | ***Flying Into the Sun*** — Aleksey Chistilin, 178,095 s | **39,7 s** | final exportado el 2026-10-04 (CRF 12 + CRF 16 + `.srt`), con dos palabras medidas sin oír. Comparte con la V1 ≈ 0,1 s de RC25 y con la V2 nada |

Las dos versiones comparten: el formato (los seis bloques de `recorrido-luxur`), las reglas fijas del canal (la primera toma sin texto ni voz, nunca el sello, el cierre en una tarjeta oscura con el logo a 440 px y 60 % y `PropiedadesLuxur.com`, nada congelado), los subtítulos editoriales abajo al 90 % con la cursiva 8 px menor, el nivel de la voz (−21 LUFS) y de la música (−15 sola, −16 dB bajo la voz) y la base del color. **Lo que las separa:** las tres tomas de Isabella, la canción, el sentido del paseo (I → II) y casi todo el metraje de recorrido.

## 2. V2 al detalle

### 2.1 El guion: tres frases de Isabella

| Bloque | Toma | Lugar | Dice | Ventana de voz (s del clip) | LUFS |
|---|---|---|---|---|---|
| 2 · hook | **HK07** `1 Hooks/Hook7.MOV` | `PATIO` | «El verdadero lujo puede ser simplemente tener espacio para respirar.» | 0,95 → 5,11 | −18,7 |
| 4 · mitad | **MD07** `2 Mitad/Medio7.MOV` | `TERRAZA` | «La respuesta no siempre está en los metros, a veces está en cómo entra el exterior.» | 0,70 → 5,56 | −19,3 |
| 6 · CTA | **CT01** `5 Cta/CTA1.MOV` | `BALCON` | «Si buscas algo diferente **en** un apartamento convencional, escríbeme y conoce Los Patios.» (rev. 1-2: «a»; ver §4) | 0,95 → 5,36 | −22,1 |

Arco: **valor → argumento → invitación** (ángulos B y E del catálogo, mezclados: el lujo no es el acabado sino la relación con el exterior). **Ninguna cifra** en toda la pieza.

### 2.2 Los trece planos

La tabla completa (clip, tramo en segundos, `en`, `dur`, pulso, entrada y zoom de cada plano) está en [`artefactos/03-timeline.md`](artefactos/03-timeline.md). Resumen por bloque:

| Bloque | Planos (`id` → clip, tramo) | Pulsos de los cortes |
|---|---|---|
| 1 · dron | `c01-dron` → DR155, 4,00-6,27 s | 0 |
| 2 · hook | `c02-hook` → HK07, 0,93-5,83 s (opaca en el pulso 4, su voz un frame después) | 4 |
| 3 · patio y deck | `c03-patio` → RC11, 0,40-2,60 · `c04-giro` → RC10, 4,00-8,37 · `c05-techo` → RC11, 7,00-9,17 | 13 · **17** · **25** |
| 4 · mitad | `c06-mitad` → MD07, 0,63-6,10 s | 29 |
| 5 · del umbral al ventanal | `c07-umbral` → RC06, 0,40-3,67 · `c08-pasillo` → RC05, 3,20-5,93 · `c09-bloques` → RC03, 4,40-7,67 · `c10-fachada` → RC25, 0,00-2,73 (rev. 2; rev. 1: `c10-cielo` → RC04, 0,00-2,73) · `c11-vista` → RC07, 0,00-3,80 | 39 · 45 · 50 · 56 · **61** |
| 6 · CTA | `c12-cta` → CT01, 0,87-5,87 s · `c13-cierre` → la tarjeta oscura (negro liso) | **68** · — |

Hashes (sha256, 8 primeros) de los originales, en `proyectos/018/normalizar.mjs`: HK07 `1075992b` · MD07 `3209fdf5` · CT01 `51d43aa2` · RC10 `1ebd08b6` · RC11 `942426d0` · RC06 `0320c748` · RC05 `4cd13369` · RC03 `606f3374` · RC25 `3d1aa61c` (rev. 1: RC04 `29ba2ea0`) · RC07 `e89d0e21` · DR155 `534d5e74` · música `55bf04c8`.

**Qué comparte con el 017 en metraje:** dos clips. **RC07** (el barrido del ventanal con el skyline): 0,8-4,6 s en la V1 (`c06-ventanal`, a mitad del paseo) y 0,0-3,8 s aquí (`c11-vista`, al final): **≈ 3 s de las dos versiones son el mismo plano.** Es el único plano de esa esquina, la mejor vista del material y el rincón donde habla Isabella en CT01. Y, **desde la rev. 2, RC25** («Exterior edificio4», pedido del usuario): 1,2-3,1 s en la V1 (`c03-fachada`) y 0,0-2,7 s aquí (`c10-fachada`): **≈ 1,5 s en común**. Si se quiere una V2 sin ninguna repetición, la salida es otro final para el paseo (RC09, RC16 sin voz, un dron como DR152 en su segunda mitad) a costa de perder el hilo ventanal → balcón.

### 2.3 La música

**«Return to Oasis» — Aleksey Chistilin** · `Music/Aleksey Chistilin - Return to Oasis.mp3` (copia en `proyectos/018/original/musica-oasis.mp3`) · Re# menor · **110 BPM (0,5454 s por pulso)** · piano, pads y arpegio.

- **Entrada en 142,967 s** (38 ms antes de su golpe más fuerte de la ventana, el pulso 0, en 143,005 s): 37 s de meseta estable (−8,5 LUFS) con golpes fuertes y, **al pulso 68 (180,09 s), una caída de 12 LU a un piano suelto** (−20,5 LUFS) que se queda de lecho: es donde entra el CTA. A diferencia de *Time*, NO vuelve a pegar fuerte después: el piano se apaga bajo la tarjeta del cierre.
- **Por qué esta canción:** es una textura de arpegio con pulso constante (sin frases de 8 pulsos), así que cualquier plano puede caer en un pulso y los grandes caen en los golpes más fuertes; la meseta dura lo que dura el paseo; y la caída a piano resuelve en el instante en que entra el CTA. Medida con `medir-pista.py` (62 golpes ≥ 6 dB en la ventana de 40 s; los fuertes, ≥ 9 dB, a 12 ms de media de la recta del pulso).
- **El sitio de cada cosa en la canción** (tabla completa de pulsos y golpes en `artefactos/03-timeline.md`): golpe de entrada → el dron; el pulso 4 → Isabella opaca; **13 · 17 · 25** → el patio, el giro y el techo; 29 → la mitad (la música baja); **61** → la vista de esquina; **68** → la caída: el CTA.
- **Un tema por pieza, de principio a fin.** La música NO sale de una librería con licencia verificada (§4).

### 2.4 La mezcla (medida sobre la prueba 720p)

| Qué | Nivel |
|---|---|
| Voz de Isabella (hook · mitad · CTA) | −20,9 · −20,7 · −20,3 LUFS (objetivo −21; una ganancia por toma: −2,3 · −1,7 · +1,1 dB) |
| Música sola (recorridos) | −15,3 (bloque 3) · −14,5 (bloque 5) LUFS; el dron de apertura, sin voz: −17,3 |
| Música bajo la voz | hook y mitad: −16 dB (≈ −31 LUFS: **≈ 10 LU bajo ella**), 12 f de bajada ANTES de la primera palabra y 12 f de subida tras la última. **CTA: −4,4 dB sobre un piano que ya es 12 LU más bajo** (−31,4 LUFS: 10,4 LU bajo su voz) |
| Música bajo la tarjeta | el piano se apaga en línea recta del f1265 al f1323; la tarjeta mide −34,7 LUFS |
| Pieza entera | **−16,0 LUFS** integrados · pico real −5,5 dBFS · LRA 8,1 LU |

### 2.5 El texto

- **La primera toma sale siempre sin texto** (regla fija): el primer subtítulo entra en el f69, con Isabella ya opaca (f68).
- Todo lo que dice Isabella, **abajo**, en subtítulos editoriales (Montserrat 45 px y Playfair Display itálica **91 px**, sin sombra), **a 90 % de opacidad**, con el velo de la V1 (alfas 0,62 / 0,34; legibilidad medida igual que la de la V1 aprobada, `artefactos/02-layout.md`). 14 líneas en 6 bloques, 3 acentos: **respirar.**, **el exterior.**, **escríbeme**.
- **Nunca el sello «PROPIEDADES LUXUR».** El cierre es la tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com`.
- Los tiempos de las 14 líneas están llevados a su palabra con la voz SOLA (`herramientas/lineas-vs-onsets.py`: 1,0-2,5 f antes en las 13 que pueden) y comprobados sobre el render (`subs-vs-voz.py`).

### 2.6 Lo que NO se usó (y por qué)

- **HK02, MD09, CT07, DR147 y DR163**: son de la V1. **RC04** («Vista ventana y Sala», las nubes sobre el valle) fue el plano `c10` de la rev. 1 y salió en la rev. 2.
- **El resto del catálogo**: sigue en el SSD (tablero de variantes en `proyectos/017/combinaciones.md` §3).
- Ningún SFX, ninguna `velocidad` ≠ 1, ninguna segunda canción.

## 3. Cómo cambiar cada pieza (para una V3)

| Quiero cambiar… | Dónde | Ojo |
|---|---|---|
| un **hook / mitad / CTA** | `normalizar.mjs` (añadir el original, sha, y ejecutarlo) · `metraje-018.ts` (`src`, `desde`, `voz` con `s0`/`s1`/`lufs`/`dice`) · `voz/*.txt` (guion marcado) · `subtitulos-018.ts` | mide la voz con `manuales/edicion-video/scripts/limites-voz.py` (no con whisper, R29); lleva cada línea a su onset con `lineas-vs-onsets.py` (añade la toma a su tabla) |
| la **canción** | `normalizar.mjs` (`MUSICA`) · `metraje-018.ts` (`T_PULSO`, `GOLPE_DE_ENTRADA`, `INICIO_MUSICA` a un frame, la tabla `N` de pulsos) · `audio-018.ts` (`LUFS_MESETA`) | `medir-pista.py` para los golpes; **comprueba sobre el audio del render que cada corte seco cae en un golpe** (`golpes-render.py`): un pulso de la recta puede no tener golpe |
| el **arranque de un plano** | su `desde` en `metraje-018.ts` (segundos de la fuente, escrito como `fr(n)`) | la disolvencia pide 12 f de clip ANTES de `desde`; la puerta mide el metraje disponible y que ningún tramo se repita |
| el **color de un plano** | su línea `color:` en `metraje-018.ts` | topes de la puerta: `vibrance` ≤ 0,05 · \|`exposure`\| ≤ 0,4 · `saturation` 0,95-1,12 y ≤ 1,06 en Isabella; mídelo con `medir-color.py` (antes/después con el mismo backend de GL) |
| el **final del paseo** (RC07) y la **fachada** (RC25) | `c11-vista` y `c10-fachada` | son lo único que comparte metraje con la V1 (§2.2) |
| **volver a la rev. 1** (el cielo en vez de la fachada) | `c10-fachada` → `id: "c10-cielo"`, `src: v("rc04")`, `color: color({ highlights: -0.3, saturation: 1.12, temperature: 0.05 })`; y en `normalizar.mjs`, RC04 en vez de RC25 (`RC04.MOV`, sha `29ba2ea0`, `4 Recorrido/Vista ventana y Sala.MOV`; el original sigue en `original/`) | los tiempos no cambian: `c10` dura 82 f en las dos |
| la **«a»/«en» del CTA** | el texto del 2.º trozo de `c01` en `subtitulos-018.ts` (y su `desde`: 1141 con «en», 1146 con «a»), `voz/cta.txt` y el `dice` de `c12-cta` | tras cambiarlo: `lineas-vs-onsets.py`, la puerta, el `.srt` (`exportar-srt.mjs`) y re-exportar |
| la **música sí/no** | `HAY_MUSICA` en `audio-018.ts` | `false` = la pieza sale solo con voz, para subirla con el audio de la plataforma |

Receta completa y orden de pasos: `proyectos/017/combinaciones.md` §4 (las rutas son las de este proyecto).

## 4. Por confirmar

- **La «a»/«en» del CTA** («diferente **en** un apartamento convencional»): el catálogo y la gramática pedían «a»; whisper oye «en» (0,75) y **la vocal medida es una [e]** (F1 ≈ 605, F2 ≈ 2.360 Hz; las /a/ de Isabella, F1 ≈ 725-780 y F2 ≈ 1.440-1.600: `herramientas/formantes.py`), seguida de una nasal. Desde la rev. 3 se pinta **«en»**. **Sigue sin confirmarse oyéndola** (hacia los 38,1 s del vídeo): mientras la nota siga en `subtitulos-018.ts` y `voz/cta.txt`, `node proyectos/018/revisar-018.mjs --final` falla (a propósito) y los finales exportados el 2026-10-04 llevan esa palabra sin confirmar. Si suena «a»: el texto de ese trozo (y su frame, 1146 en vez de 1141, para entrar con el «un»), `voz/cta.txt` y el `dice` de `c12-cta`, y se re-exporta (≈ 6 min).
- **Licencia de la música** (*Return to Oasis*, de la biblioteca de Luxur): no verificada. Para publicar, la biblioteca de la plataforma, la licencia confirmada, o `HAY_MUSICA = false`.
- **El canal del CTA:** «escríbeme» no dice dónde (DM o WhatsApp); el cierre lleva el logo y la web.
- **MD07 es la toma más rápida del catálogo** (3,3 palabras por segundo, sobre el tope de 2,5 del formato): se acepta con trozos de 2-4 palabras; si se ve apretada, los subtítulos de `m01`/`m02` se pueden partir en más trozos (la puerta pide 12 f como mínimo por línea).
- **La lectura del encargo:** «otro video de mitad y cta» se leyó como **otra toma de mitad y otra de CTA** (más otra de hook y otra canción). El recorrido y el dron los eligió el montaje; solo RC07 y RC25 (esta, pedida por el usuario en la rev. 2) repiten metraje de la V1.
- **La lectura de «cambia la toma después de 0:30»** (rev. 2): la toma que ENTRA justo después del 0:30 (la de los 30,6 s, `c10`), no la que se está viendo en el 0:30 (`c09-bloques`, hasta los 30,6 s). Ver `artefactos/01-plan.md`, «Revisión 2».
