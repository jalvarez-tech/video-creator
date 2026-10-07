# 025 · Los Patios (apto 501) — qué se eligió y cómo cambiarlo

> V9 del registro de reels, sexta versión de Los Patios. Los planos están en `remotion/src/proyectos/025/metraje-025.ts`; la puerta, en `proyectos/025/revisar-025.mjs`. Se lee junto a `proyectos/017/combinaciones.md` (la V1 y su tablero de variantes), `018`, `019`, `020` (en `main`) y `021` (la V5, en el worktree `reel-021`), `catalogo-material.md` (los códigos HK/MD/CT/RC/DR), [`archivos/musica/registro-de-uso.md`](../../archivos/musica/registro-de-uso.md) y [`analisis-uso.md`](analisis-uso.md). **No se editaron los `combinaciones.md` de otros proyectos** (chocarían entre ramas): la fila de la V9 se añade a los de las otras cinco versiones cuando se unan las ramas.

## 1. Registro de versiones (Los Patios)

| Versión | Apertura | Hook | Mitad | CTA | Recorrido | Dron | Música | Dura | Estado |
|---|---|---|---|---|---|---|---|---|---|
| V1 · 017 | dron DR147 | HK02 (`INT-ABIERTO`) | MD09 (`INT-ABIERTO`) | CT07 (`TERRAZA`) | RC25 · RC01 · RC02 · RC07 → RC08 | DR147 · DR163 | *Time* | 46,6 s | final |
| V2 · 018 | dron DR155 | HK07 (`PATIO`) | MD07 (`TERRAZA`) | CT01 (`BALCON`) | RC11 · RC10 · RC11 → RC06 · RC05 · RC03 · RC25 · RC07 | DR155 | *Return to Oasis* | 44,2 s | final |
| V3 · 019 | fachada RC25 | HK05 (`BARANDA`) | MD08 (`TERRAZA`) | CT05 (`INT-BLOQUES`) | RC09 · RC13 · RC16 | DR152 | *Flying Into the Sun* | 39,7 s | final |
| V4 · 020 | calle RC22 | HK03 (`INT-BLOQUES`) | MD14 (`PATIO`) | CT06 (`INT-ABIERTO`) | RC02 · RC05 · RC09 → RC13 · RC04 | DR156 | *Sax for the Last Customer* | 41,8 s | final |
| V5 · 021 | **ninguna** (abre el hook) | HK06 (`TERRAZA`) | MD01 (`BARANDA`) | CT02 recortada (`BALCON`) | RC11 · DR154 · RC10 → RC11 · RC12 | DR154 | *Amélie* | 43,0 s | final |
| **V9 · 025** | **la casa: RC23 (el camino de entrada y los helechos), sin texto ni voz** | **HK09** (`INT-VENTANAL`) | **MD11** (`INT-ABIERTO`) | **CT03 recortada** (`PATIO`) | RC04 · RC02 · RC07 → RC13 · RC10 | **DR153 (la vista)** | ***Heaven on Earth*** | **32,5 s** | **final exportado el 2026-10-06** (CRF 12 + CRF 16 + `.srt`, ver §2b) |

La V9 comparte con las anteriores: el formato (los seis bloques), las reglas fijas del canal (la primera toma sin texto ni voz, nunca el sello, el cierre en la tarjeta oscura con el logo a 440 px y 60 % y `PropiedadesLuxur.com`, nada congelado), los subtítulos editoriales abajo al 90 % con la cursiva 8 px menor, el nivel de la voz (−21 LUFS) y de la música (−15 sola, −16 dB bajo la voz) y la base del color. **Lo que la separa:** el **hook y la mitad** (el filtro: «un comprador muy específico» → «¿alguien que valora la arquitectura…?»), el **CTA recortado** (la 2.ª mitad de CT03: **repite la frase de la V5**), la **apertura** (RC23: la jardinera con helechos, que ninguna versión usó), el **dron como vista** (DR153, último plano del bloque 5), la **canción** (lounge, sin pulso: por golpes) y **ninguna cifra**.

## 2. Lo elegido

| Pieza | Elección |
|---|---|
| Apertura | **RC23** «Exterior edificio2», 0,00-3,50 s: el camino de entrada, la puerta de vidrio y los helechos de la jardinera; sin texto ni voz |
| Hook | **HK09** «Esta propiedad tiene sentido para un comprador muy específico.» (INT-VENTANAL) |
| Mitad | **MD11** «¿Alguien que valora la arquitectura y prefiere crear sus propios acabados?» (INT-ABIERTO) |
| CTA | **CT03 recortada a su 2.ª mitad** «escríbeme y ven a conocerlo.» (PATIO; la 1.ª mitad, «Está disponible por 3.550 millones», no suena ni se ve) |
| Canción | ***Heaven on Earth*** (lounge/chill †): desde 179,533 s, su golpe de 179,584 s (15,8 dB) abre la casa; cae a silencio desde 209,5 s bajo el CTA. Sin pulso: cortes en golpes medidos (`buscar-cortes-lp.py`: 315 soluciones con estos planos) |
| Paseo (bloque 3) | RC04 3,00-5,33 (el ventanal) · RC02 5,50-7,97 (el muro de bloques) · RC07 7,00-11,03 (el espacio abierto) |
| Bloque 5 | RC13 9,00-10,80 (la alcoba y su ventana) · RC10 2,00-3,87 (el deck) · **DR153 3,50-6,93 (el edificio desde el aire: la vista, el plano más largo)** |
| Sitios | INT-VENTANAL · INT-ABIERTO · PATIO (sentido I) |
| Duración | 976 f · 32,5 s |

Decisiones del usuario (2026-10-06): **CTA = opción a (CT03 recortada)** y **canción = *Heaven on Earth*** (entre *Heaven*, *desolate* y *Overcoming the Impossible*, con extractos de audio). El hook y la mitad son la propuesta del análisis, aceptada al contestar.

## 2b. El final (2026-10-06, orden «renderiza el video en buena calidad»)

| Archivo | Qué es |
|---|---|
| `finales/025-recorrido.mp4` | master: CRF 12 `slower`, audio AAC 320 kb/s, 1080×1920 · 30 fps · BT.709 en las dos capas (átomo `colr` `nclx 1/1/1` y VUI 1/1/1) · 135 MB (34,5 Mb/s) |
| `finales/025-recorrido-crf16.mp4` | la versión ligera: CRF 16 `slow`, misma imagen y mismo audio · 73 MB |
| `finales/025.srt` | los 11 cues de los subtítulos (3,9 → 30,5 s) para la pista de captions de la plataforma |

- **Etiquetas de color** arregladas SIN pérdida en cada vídeo por separado (`h264_metadata` + `+write_colr`): el md5 del vídeo decodificado (`3edbc19b…` el master, `dd6b838b…` el CRF 16) y el del PCM (`babddfe3…`, el mismo en los dos) son idénticos antes y después.
- **El color de la final contra stills a escala 1** (`medir-final.py`, 12 fotogramas; `finales/medir-final.txt`): master Δ color medio ≤ 0,51 niveles y PSNR de baja frecuencia ≥ 47,7 dB (bruto medio 44,3 dB, mín 39,1); CRF 16: ≤ 0,98 y ≥ 45,1 dB (bruto 42,2, mín 36,3). Ningún fotograma fuera de los topes.
- **Sonoridad:** −16,2 LUFS integrados · pico −2,9 dBFS · LRA 7,8 LU, igual que la prueba.
- **Dos palabras sin oír** (`revisar-025.mjs --final` falla SOLO por la nota «POR CONFIRMAR AL OÍDO»; se avisó al usuario en la entrega de la prueba y contestó «renderiza»: no se bloqueó la orden): **«prefiere»** (MD11, ≈ 19,1 s del vídeo; whisper oye «prefiera», la vocal final mide una [e]) y el arranque **«¿Alguien…»** (≈ 16,9 s; medido sin «eres» delante). Si suena «prefiera» o «¿Eres alguien…»: el texto del trozo en `subtitulos-025.ts`, `voz/md11.txt`, el `dice` de `c06-mitad` en `metraje-025.ts`, el `.srt` y repetir los dos renders (≈ 5 min).

## 3. Cómo cambiarlo

| Quiero cambiar… | Dónde | Ojo |
|---|---|---|
| el **hook** | `normalizar.mjs` (añadir el original y su sha) · `metraje-025.ts` (`src`, `desde`, `voz` con `s0`/`s1`/`lufs`/`dice`, y `en`/`dur`) · `voz/<toma>.txt` y `.json` · `subtitulos-025.ts` · `herramientas/lineas-vs-onsets.py` (`TOMAS` y `LINEAS`) · `revisar-025.mjs` (`LUGAR` en 2a) | mide la voz con `limites-voz.py` (no con whisper, R29); lleva cada línea a su onset (`onsets-voz.py`, `palabras-desde.py`). **La cola de la toma manda**: HK09 deja 15,6 f tras su última palabra y el plano siguiente corta ahí; un hook con más cola deja más sitio a la subida de la música |
| la **mitad** | ídem | **MD11 deja 3 f (0,10 s) tras su última palabra**: el plano siguiente corta ahí y su golpe suena con la música todavía abajo (declarado). Con una mitad con cola (MD13 tiene 1,0 s, MD02 1,15 s, MD01a 0,96 s) la música sube con fundido antes del golpe y se puede quitar la excepción de la puerta (4b) |
| el **CTA** | ídem | CT03 recortada entra a CORTE (0,40 s de aire = 12 f no dan los 12 de una disolvencia más la palabra) y dura 1,7 s de voz. CT04 recortada («escríbeme para conocer esta unidad», 1,9 s; sin ALH) sería otra frase con 0,18 s de aire |
| la **canción** | `normalizar.mjs` (`MUSICA`) · `metraje-025.ts` (`GOLPE`, `INICIO_MUSICA`, `DECAE`) · `musica/golpes-025.json` (`medir-pista.py --json` con una ventana que empiece ≥ 1 s antes de la entrada) · `audio-025.ts` (`LUFS_MESETA`, `LUFS_CANCION_EN_VOZ`) · `revisar-025.mjs` | `buscar-cortes-lp.py` (con `R`, `TIPOS`, `T_F` = el primer instante en que cae en LUFS por tramos de 5 s: `lufs-caida.py`); comprueba sobre el audio del render que cada corte seco cae en un golpe que suena (`golpes-render.py`, R33). *desolate* (30.641 soluciones) es el plan B; *Overcoming the Impossible* (75) tiene el corte seco más débil a 7,8 dB |
| un **plano** | su `desde`/`dur` en `metraje-025.ts` (el `desde` en frames de la fuente) | la disolvencia pide 12 f de clip ANTES de `desde`; los tres cortes de 8 dB de luma o más (`saltos-luma.py`) entran con disolvencia o se igualan con `color`; la puerta (7b) mide el metraje compartido con las cinco versiones anteriores |
| el **color** de un plano | su línea `color:` | topes de la puerta: `vibrance` ≤ 0,05 · \|`exposure`\| ≤ 0,4 · `saturation` 0,95-1,12 y ≤ 1,06 en Isabella; mídelo con `medir-color.py` (antes/después con el mismo backend de GL) |
| la **música sí/no** | `HAY_MUSICA` en `audio-025.ts` | `false` = la pieza sale solo con voz y se pierde la caída |

Receta completa y orden de pasos: `proyectos/017/combinaciones.md` §4 (con las rutas de este proyecto) y `.claude/skills/recorrido-luxur/montaje.md`.

## 4. Lo que comparte con las versiones anteriores

**Ni un segundo de recorrido ni de dron** (la puerta, sección 7b, lo mide con la V1-V5). Clips que ya habían salido, con otra ventana: RC04 (V4), RC02 (V1, V4), RC07 (V1, V2), RC13 (V3, V4) y RC10 (V2, V5). RC23 y DR153 son nuevos. **La frase del CTA es la de la V5** (otra toma y otro sitio).

## 5. Por confirmar

- **Dos cosas sin oír** (medidas, no confirmadas; `node proyectos/025/revisar-025.mjs --final` falla mientras sigan las notas): **«prefiere»** (MD11, ≈ 19,1 s del vídeo: whisper oye «prefiera»; la vocal final mide F2 ≈ 1.950 Hz, una [e]) y el arranque **«¿Alguien…»** (MD11, ≈ 16,9 s: medido sin «eres» delante).
- **La música**: medida, no oída; el género sale del catálogo; puede sonar «playera»; licencia sin verificar.
- **Que el golpe del corte tras MD11 suene** con la música abajo (R33, sobre el render).
- **El canal del CTA** y si 1,7 s de voz bastan; **repite la frase de la V5**.
- **El perfil D** de cliente (el que valora la arquitectura y prefiere sus acabados) sigue sin confirmar en `cliente-ideal.md`.
