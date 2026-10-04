# Combinaciones del 017 · Los Patios · apto 501

> Registro de lo que se montó, con qué toma y con qué música, y de cómo cambiar cada pieza para
> sacar otras versiones (otro CTA, otro arranque de los planos, otra canción…). Se lee junto a
> `catalogo-material.md` (los códigos HK/MD/CT/RC/DR) y `artefactos/` (el porqué de cada decisión).
> Todo lo de esta versión está medido sobre los archivos: el plan está en
> `remotion/src/proyectos/017/` y `node proyectos/017/revisar-017.mjs` lo comprueba.

## 1. Registro de versiones

Una fila por versión montada. Las siguientes se añaden aquí con sus cambios respecto a V1.

| Versión | Hook | Mitad | CTA | Recorrido I | Recorrido II | Dron | Música (`desde`) | Dura | Estado |
|---|---|---|---|---|---|---|---|---|---|
| **V1 rev. 8** · «La oportunidad» | HK02, con su imagen desde el pulso 2 | MD09 | CT07 | RC25 · RC01 · RC02 · RC07 | RC08 continua · DR163 | DR147 2,0 s sin texto ni voz · DR163 desde 2,0 s | *Time*, 175,633 s (acaba en el f1371) | **46,6 s** | **el subtítulo del CTA dice «esta *unidad* en específico» (antes «línea»)**; todo lo demás, igual que la rev. 7; **final exportado el 2026-10-03** (`finales/017-recorrido.mp4` + `017.srt`) |
| **V1 rev. 7** · «La oportunidad» | HK02, con su imagen desde el pulso 2 | MD09 | CT07 | RC25 · RC01 · RC02 · RC07 | RC08 continua · DR163 | DR147 2,0 s sin texto ni voz · DR163 desde 2,0 s | *Time*, 175,633 s (acaba en el f1371) | **46,6 s** | **el color: cada plano de vídeo con `colorCorrection()` de Remotion 4.0.509, vivo, balanceado y cinematográfico (saturación media 0,301 → 0,354, dispersión de luma entre planos σ 14,2 → 9,2, lo quemado 15,5 % → 3,6 %, la piel de Isabella donde estaba)**; todo lo demás, igual que la rev. 6; sustituida por la rev. 8 (su prueba: `pruebas-720p/017-recorrido-720p-rev7.mp4`; su final se sustituyó) |
| **V1 rev. 6** · «La oportunidad» | HK02, con su imagen desde el pulso 2 | MD09 | CT07 | RC25 · RC01 · RC02 · RC07 | RC08 continua · DR163 | DR147 2,0 s sin texto ni voz · DR163 desde 2,0 s | *Time*, 175,633 s (acaba en el f1371, antes de su siguiente golpe) | **46,6 s** | sustituida por la rev. 7 (su prueba: `pruebas-720p/017-recorrido-720p-rev6.mp4`); cierre: ** nada se congela; la imagen funde a negro y sigue una tarjeta oscura con el logo (440 px, 60 % de opacidad) y `PropiedadesLuxur.com`**; prueba 720p lista; **a la espera del OK** para el final |
| V1 rev. 5 · «La oportunidad» | HK02, con su imagen desde el pulso 2 | MD09 | CT07 + logo | RC25 · RC01 · RC02 · RC07 | RC08 continua · DR163 | DR147 2,0 s sin texto ni voz · DR163 desde 2,0 s | *Time*, 175,633 s | 45,8 s | **la cursiva (acentos) 8 px más pequeña: 99 → 91 px**; prueba 720p lista; **a la espera del OK** para el final |
| V1 rev. 4 · «La oportunidad» | **HK02** (obra gris → oportunidad), **con su imagen** desde el pulso 2 | **MD09** («317 metros») | **CT07** («la recorremos juntos») + **logo** | **RC25** (fachada) · RC01 (puerta) · RC02 · RC07 | **RC08 continua** (follaje y patio) · DR163 | **DR147 solo 2,0 s, sin texto ni voz** · DR163 desde 2,0 s (la vista del skyline) | *Time* — Hans Zimmer, **175,633 s** | 45,8 s | prueba 720p lista; **a la espera del OK** para el final |
| V1 rev. 3 | HK02 (su voz sobre el dron, con hook escrito arriba) | MD09 | CT07 + sello + `@propiedadesluxur` | RC25 · RC01 · RC02 · RC07 | RC08 continua · DR163 | DR147 (4,3 s, con el hook escrito) · DR163 desde 2,0 s | *Time*, 175,633 s | 45,8 s | sustituida por la rev. 4; su prueba: `pruebas-720p/017-recorrido-720p-rev3.mp4` |
| V1 rev. 2 | HK02 | MD09 | CT07 | RC25 · RC01 · RC02 · RC07 | RC08 continua · DR163 **desde 13,3 s** (a ras de suelo hacia la corrediza) | DR147 · DR163 | *Time*, 175,633 s | 45,8 s | sustituida por la rev. 3; su prueba: `pruebas-720p/017-recorrido-720p-rev2.mp4` |
| V1 rev. 1 | HK02 | MD09 | CT07 | RC01 (501) · RC01 (puerta) · RC02 · RC07 | RC08 (2,6-6,4 s) · **RC10** · DR163 | DR147 · DR163 | *Time*, 175,633 s | 45,8 s | sustituida por la rev. 2; su prueba: `pruebas-720p/017-recorrido-720p-rev1.mp4` |
| **V2 rev. 3** · «El espacio y cómo entra el exterior» (**proyecto 018**, `proyectos/018/combinaciones.md`) | **HK07** (`PATIO`) | **MD07** (`TERRAZA`) | **CT01** (`BALCON`) | RC11 · RC10 · RC11 → RC06 · RC05 · RC03 · **RC25** (la fachada, pedida por el usuario) · RC07 (sentido II del paseo) | DR155 2,3 s sin texto ni voz | ***Return to Oasis*** — Aleksey Chistilin, 142,967 s (acaba en el f1323) | **44,2 s** | **final exportado el 2026-10-04** (CRF 12 + CRF 16 + `.srt`), con el CTA «diferente *en* un apartamento» (medido, sin confirmar al oído); comparte con la V1 ≈ 3 s de RC07 y ≈ 1,5 s de RC25 |

**Revisión 2** (2026-10-03, tras ver la prueba: «en el min 7 cambia la toma por *Exterior edificio4* y en el 31 por
*Patio y Naturaleza*»). Cambian dos tomas (y `c08` empieza un segundo antes dentro de su clip); los tiempos de cada plano, la voz, la música y el texto no se mueven:

| Segundo | Rev. 1 | Rev. 2 |
|---|---|---|
| 0:07 (f231, el golpe grande) | `c03` RC01 «Recorrido Abre puerta» 0,4-2,3 s: el «501» sobre el ladrillo | `c03-fachada` **RC25** «Exterior edificio4» 1,2-3,1 s: el contrapicado de la fachada con jardines colgantes, cielo y nubes |
| 0:31 (dentro de `c09`, f831-974) | `c09` RC10 «Patio y Piscina» 3,4-8,2 s | `c09` **RC08** «Patio y Naturaleza» 5,4-10,1 s, continuación de `c08`: **una sola toma de 8,6 s** (de 1,57 s a 10,13 s) |

Para volver a la rev. 1: `c03` → `src: v("rc01")`, `desde: fr(12)`, `id: "c03-501"`; `c08.desde` → `fr(78)`; `c09` → `src: v("rc10")`,
`desde: fr(102)`; y volver a poner RC10 en `normalizar.mjs` (`RC10.MOV`, sha `1ebd08b6`, `4 Recorrido/Patio y Piscina.MOV`; el original ya está en `proyectos/017/original/`). RC01 sigue en la receta: lo usa `c04`.

**Revisión 3** (2026-10-03: «en el 0:32 la toma DJI_20261001104246_0163_D.MP4 debe empezar en el seg 0:02»). Solo cambia de qué segundo del clip sale
`c10-dron` (que entra a los 32,47 s): `desde` pasa de `fr(399)` (13,3 s) a `fr(60)` (2,0 s), con la misma ventana (f974-1145). El dron enseña ahora el borde de la
terraza con el skyline y ya no acaba a ras de suelo frente a la corrediza. Para volver: `desde: fr(399)`.

**Revisión 8** (2026-10-03: «al final el texto debería ser: `Necesitas saber si esta unidad en específico funciona para ti`»). Solo cambia UNA palabra del subtítulo del CTA, «línea» → «**unidad**» (la voz es la de siempre: la
transcripción la oía mal, con confianza 0,06). Tres sitios que tienen que decir lo mismo, y la puerta no compara el texto con `dice`: `subtitulos-017.ts` (lo que se pinta y lo que sale en el `.srt`), `voz/cta.txt` (el guion marcado de
donde salió) y el campo `dice` de `c11-cta` en `metraje-017.ts` (solo para leer el plan). Los tiempos de la línea son los de su primera palabra y no se mueven; la línea nueva mide 642 de 842 px útiles. Para volver: «línea» en los tres sitios y `node manuales/edicion-video/scripts/exportar-srt.mjs …`.
**Archivos de la final** (los dos son esta rev. 8): `finales/017-recorrido.mp4`, el master a CRF 12 `slower` (198,3 MB, 33,7 Mb/s), y `finales/017-recorrido-crf16.mp4`, el de CRF 16 `slow` (109,3 MB); mismo contenido, mismo audio y mismas etiquetas BT.709.

**Revisión 7** (2026-10-03: «ahora puedes mejorar la colorización con https://www.remotion.dev/docs/effects/color-correction para que los colores se vean vivos, balanceados y cinematográficos»). Solo cambia el COLOR de los once planos de vídeo; la tarjeta del cierre no se gradúa y nada más se mueve (planos, cortes, duración, voz, música, subtítulos, logo):

| | Rev. 6 | Rev. 7 |
|---|---|---|
| Pintura de cada plano de vídeo | `<OffthreadVideo>` sin graduar | `<Video>` de `@remotion/media` + `colorCorrection()` (`Corte.color`, `COLOR_BASE` + el ajuste de cada toma en `metraje-017.ts`) |
| Remotion | 4.0.496 | **4.0.509** (el efecto no existe antes) |
| Render | `npx remotion render … --scale=0.5` | `--gl=angle` (sin él, el efecto falla); la **prueba a escala 1 y reducida con ffmpeg**: a `--scale=0.5` sale aliasada |
| Saturación media · σ de luma entre planos · lo quemado | 0,301 · 14,2 · 15,5 % | **0,354 · 9,2 · 3,6 %** |
| La puerta | secciones 1-10 | + **2e** (el color: claves y rangos, todos los planos, c08 = c09, topes de la pieza) |

Para cambiar la graduación de UN plano: su línea `color:` en `metraje-017.ts` (los topes de `revisar-017.mjs`: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `saturation` 0,95-1,12 y ≤ 1,06 en Isabella). c08 y c09 son
UNA toma continua: cualquier cambio a uno, al otro (`COLOR_PATIO`). Para volver a la rev. 6: quitar los once `color:` (y la sección 2e de la puerta); Remotion puede quedarse en la 4.0.509. Detalle, tabla por plano y por qué cada ajuste: `artefactos/01-plan.md` (rev. 7) y `aprendizajes.md` §13.

**Revisión 6** (2026-10-03: «el logo debe ser un poco más pequeño y con 40 % de transparencia, y no dejes que el último fotograma se congele: pasa a un fondo oscuro donde pongas la web: PropiedadesLuxur.com»). Solo cambia el CIERRE:

| | Rev. 5 | Rev. 6 |
|---|---|---|
| Después de la última palabra de Isabella | su último fotograma, congelado 36 f (un MP4, `ct07-cola.mp4`) con el logo arriba, y fundido a negro | su imagen **funde a negro** (6 f, hasta negro exacto en el último fotograma de la toma) y entra una **tarjeta oscura** de 60 f (el plano `c12-cierre`, un negro liso) |
| Logo | 560 px, opacidad 1, con un velo oscuro, arriba (y 245-459) | **440 px**, **opacidad 0,6** (40 % de transparencia), sin velo, centrado en la tarjeta (y 795-963) |
| La web | — | **`PropiedadesLuxur.com`**, Montserrat 500, 54 px, blanco, debajo del logo (y 1019-1085) |
| Música | hasta el final de la pieza (f1375) | acaba en el **f1371** (el piano se apaga desde el f1339): «Time» vuelve a pegar en el pulso 48, f1373, y no tiene que oírse |
| Duración | 1375 f (45,8 s) | **1399 f (46,6 s)**: la tarjeta dura 2,0 s |

Todo en `cierre-017.ts` (números y textos) y `Recorrido017.tsx` (`FundidoACierre`, `LogoCierre`, `WebCierre`). **Lectura declarada:** «40 % de transparencia» = 40 % transparente = opacidad 0,6; si se quería el 40 % de opacidad, `LOGO_TRANSPARENCIA = 0.6`.
Para volver a la rev. 5: el plano `c12-congelado` (un MP4 del último fotograma, `normalizar.mjs` de la rev. 5), `DUR_CONGELADO = 36`, la música de 0 a `DURACION_017` y el logo arriba con su velo; la prueba de la rev. 5 está en `pruebas-720p/017-recorrido-720p-rev5.mp4`.

**Revisión 5** (2026-10-03: «reduce el tamaño de la cursiva 8px»). Solo cambia el cuerpo de la itálica de los acentos (los cinco: «terminado», «la oportunidad.», «317 metros», «el interior.», «escríbeme»):
de 99 a **91 px** en 1080×1920. Es un ajuste de ESTA pieza (`ACENTO_MENOS_017 = 8` en `subtitulos-017.ts`, que la composición le pasa a `<SubtitulosEditoriales acentoMenos>`); el canal y las demás piezas siguen como
estaban. Para volver o cambiar la medida: el mismo número en `ACENTO_MENOS_017` y en `ACENTO_MENOS_PEDIDO` de `revisar-017.mjs` (0 = el cuerpo del motor, 99 px). La prueba de la rev. 4, en
`pruebas-720p/017-recorrido-720p-rev4.mp4`.

**Revisión 4** (2026-10-03: «quita arriba propiedades luxur NUNCA LO PONGAS; en vez de @propiedadesluxur agrega el logo Propiedade-Luxur-Logo.png; remueve el texto
aún sin terminar: la oportunidad; que la primera toma siempre salga sin texto»). Tres cosas, y las dos de «nunca/siempre» son **reglas permanentes** del formato
(skills `recorrido-luxur` y `guion-luxur`):

| | Rev. 3 | Rev. 4 |
|---|---|---|
| Sello «PROPIEDADES LUXUR» | en el cierre | **nunca** (ni en esta pieza ni en ninguna de este formato) |
| Cierre | sello + `@propiedadesluxur` arriba | el **logo** (`remotion/public/marcas/luxur/Propiedade-Luxur-Logo.png`, 560 px, arriba y centrado) desde el f1338 |
| Primera toma | el dron 4,3 s con el hook escrito arriba y la voz del hook sonando sobre él | el dron **2,0 s, sin texto ni voz**; Isabella entra opaca en el pulso 2 (f60) y dice el hook con su imagen |
| `c01` / `c02` | `en` 0 dur 129 · `en` 129 dur 102 (HK02 2,90-6,30 s) | `en` 0 dur **60** · `en` **60** dur **171** (HK02 **0,50-6,20 s**) |
| Texto del hook | `portada` + `h01` 58 · `h02` 130 | sin `portada`; `h01` **61** · `h02` **133** |
| Música bajo el hook | f46→58 · f201→213 | f49→61 · f204→216 |
| Congelado | PNG (`foto`) | MP4 de ese fotograma (`ct07-cola.mp4`): el PNG daba un escalón de 5 niveles de luma en el f1339 (por los fragmentos `cICP`/`cHRM`/`gAMA` que ffmpeg escribe en el PNG, no por «caminos de decodificación»: `aprendizajes.md` §13) |

Más de 2 s de dron antes de Isabella no caben sin rehacer la rejilla: la voz del hook dura 4,8 s y el pulso 2 es el último en que acaba antes de la disolvencia a la fachada (que
ha de acabar en el golpe grande, f231). Con un dron más largo la voz acabaría bajo ese golpe: habría que pasar el recorrido a la frase siguiente de la canción (+7,6 s) o acortar el hook, y
cambian la duración y la rejilla entera. Para volver al hook escrito sobre el dron (rev. 3) no hay un cambio de una línea —cambian `c01`, `c02`, la voz, el texto y la música—, y es justo lo que se pidió quitar.

Para el registro de rendimiento de `guion-luxur` (`registro.mjs`) esta pieza no encaja todavía
(solo admite IDs del banco: `H·T·C·V`); el candidato más cercano del banco es **HK02 ≈ H06**
(creencia rota). No se ha dado de alta nada ahí: la pieza no está publicada.

---

## 2. V1 al detalle

### 2.1 El guion: tres frases de Isabella

| Bloque | Toma | Lugar | Dice | Ventana de voz (s del clip) | LUFS |
|---|---|---|---|---|---|
| 2 · hook | **HK02** `1 Hooks/Hook2+IA.MOV` | `INT-ABIERTO` | «Este apartamento aún no está terminado… y ahí está, precisamente, la oportunidad.» | 0,52 → 5,30 | −21,1 |
| 4 · mitad | **MD09** `2 Mitad/Medio9.MOV` | `INT-ABIERTO` | «Tienes 317 metros para desarrollar completamente el interior.» | 0,57 → 4,68 | −21,7 |
| 6 · CTA | **CT07** `5 Cta/CTA7.MOV` | `TERRAZA` | «Necesitas saber si esta unidad en específico funciona para ti. Si es así, escríbeme y la recorremos juntos.» | 0,65 → 7,00 | −19,0 |

Arco: **paradoja → qué te llevas → invitación**. Ángulo A del catálogo («la oportunidad»), con
un cierre de filtro. Una sola cifra en toda la pieza (317, hablada y subtitulada).

### 2.2 Los doce planos

Tramo = segundos del clip NORMALIZADO (mismos segundos que el original: 30 fps constantes).
`en`/`dur` en frames de la composición (30 fps). Pulso = n de la rejilla de la música (§2.3).

| # | id | Bloque | Código → archivo del SSD (`…/Videos/`) | Tramo (s) | `en` | `dur` | Pulso | Entra | Qué hace ahí |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `c01-dron` | 1 | **DR147** `3 Dron/DJI_20261001103120_0147_D.MP4` | 0,00-2,00 | 0 | 60 | 0 | corte | el edificio de jardines colgantes, la copa de un árbol por delante; **sin texto ni voz**; es la miniatura |
| 2 | `c02-hook` | 2 | **HK02** `1 Hooks/Hook2+IA.MOV` | 0,50-6,20 | 60 | 171 | 2 (opaca) | disolver | Isabella en la obra gris, con su frase entera: «Este apartamento aún no está terminado… y ahí está, precisamente, la oportunidad» |
| 3 | `c03-fachada` | 3 | **RC25** `4 Recorrido/Exterior edificio4.MOV` | 1,20-3,10 | 231 | 57 | **8** | disolver | el golpe grande entra con el contrapicado de la fachada (jardines colgantes, cielo y nubes); la cámara baja hacia el camino |
| 4 | `c04-puerta` | 3 | **RC01** | 8,20-10,10 | 288 | 57 | 10 | corte | la hoja barre el cuadro (cortinilla natural) y se ve el muro de bloques de vidrio |
| 5 | `c05-sala` | 3 | **RC02** `4 Recorrido/Entrada apto y Sala.MOV` | 9,80-13,60 | 345 | 114 | 12 | corte | el giro revela el ventanal y la tubería amarilla |
| 6 | `c06-ventanal` | 3 | **RC07** `4 Recorrido/Vista  Cocina y Comedor.MOV` (dos espacios) | 0,80-4,60 | 459 | 114 | **16** | corte | barrido del ventanal con el skyline; gira hacia el espacio abierto |
| 7 | `c07-mitad` | 4 | **MD09** `2 Mitad/Medio9.MOV` | 0,53-5,30 | 573 | 143 | 20 | disolver | Isabella llega caminando al espacio abierto |
| 8 | `c08-follaje` | 5 | **RC08** `4 Recorrido/Patio y Naturaleza.MOV` | 1,57-5,40 | 716 | 115 | 25 | disolver | del interior gris al verde; la pasarela se abre al patio (1.ª mitad de una toma continua) |
| 9 | `c09-patio` | 5 | **RC08** `4 Recorrido/Patio y Naturaleza.MOV` (sigue a c08) | 5,40-10,13 | 831 | 143 | 29 | corte (no se ve) | 2.ª mitad de la toma continua: la pasarela se abre al patio de techo de madera; el golpe de frase cae en la revelación del patio (f917) |
| 10 | `c10-dron` | 5 | **DR163** `3 Dron/DJI_20261001104246_0163_D.MP4` | **2,00-7,70** | 974 | 171 | 34 | corte | el dron en el borde de la terraza: columna, canto del techo de madera, skyline de Medellín y plantas de la barandilla, deslizándose a la derecha; el plano más largo del bloque |
| 11 | `c11-cta` | 6 | **CT07** `5 Cta/CTA7.MOV` | 0,63-7,10 | 1145 | 194 | **40** | disolver | Isabella sale por esa corrediza; la música resuelve a piano |
| 12 | `c12-cierre` | 6 | la tarjeta oscura (`cierre-oscuro.png`, negro liso) | — | 1339 | 60 | — | corte | nada se congela: la imagen de Isabella funde a negro y esta tarjeta sostiene el logo (440 px, 60 %) y `PropiedadesLuxur.com` mientras el piano se apaga |

Hashes (sha256, 8 primeros) de los originales, en `proyectos/017/normalizar.mjs`: HK02 `640551d1` ·
MD09 `d6b8d95d` · CT07 `8b2be01f` · RC01 `af31061e` · RC02 `6858ee03` · RC07 `e89d0e21` · RC08 `c18222ac`
· RC25 `3d1aa61c` · DR147 `0e28fae2` · DR163 `02555e32` · música `4b659bec`.
**c08 y c09 son una toma continua**: `c08` acaba en el fotograma 161 de RC08 y `c09` arranca en el 162 y llega hasta el 304, el último del clip.
La puerta lo comprueba (sección 2b de `revisar-017.mjs`) y, en el render, la diferencia entre los fotogramas del empalme (14,6) es la de sus vecinos (14,6-14,7): ni salta ni repite.

### 2.3 La música

**«Time» — Hans Zimmer** · `Music/Hans Zimmer - Time.mp3` (copia en `proyectos/017/original/musica-time.mp3`) ·
Sol mayor · 63 BPM (126 por corchea) · órgano, piano y cuerdas · *nostalgia, solemnidad,
trascendencia, emoción contenida* (catálogo) · 4:36 · clímax del catálogo en 3:14.

- **Entrada en 175,633 s.** El catálogo da `desde` 168,00 s para un vídeo de 45 s (el golpe de ese
  punto es el compás 0 del análisis). Aquí entra **8 pulsos después** (una frase): desde ahí la puerta cae
  en el golpe más fuerte de la subida, el patio en la frase más alta y la resolución de piano justo cuando
  entra el CTA; con el `desde` del catálogo la resolución llegaría a los 45,7 s, cuando el vídeo se acaba.
- **Por qué esta canción** (miré ocho candidatas —curva de energía y pulso en su ventana de 50 s—): tiene frases
  de 8 pulsos (7,62 s) con un golpe tras un respiro, una meseta fuerte de 30 s y una resolución de piano que
  deja la voz del CTA a solas; es solemne y de tonalidad mayor (Sol), y el catálogo la lista entre las 14 que mejor
  enganchan en cualquier duración. *Return to Oasis* tiene una forma parecida (§3.6) pero no la medí golpe a golpe.
- **Lo que suena:** 0-7,6 s la frase de subida (−9,4 LUFS: golpe de entrada, el hook por encima);
  7,6-38,1 s la meseta (−7,7 LUFS; el golpe grande en la puerta, el de frase en el ventanal, el de 30,5 s en el
  patio); desde los 38,1 s un piano suelto (−24,2 LUFS) que queda bajo el CTA y, desde que acaba su toma (f1339), se apaga bajo la tarjeta del cierre hasta el f1371.

| n | Canción (s) | Vídeo | Qué pasa en la imagen |
|---|---|---|---|
| 0 | 175,667 | f3 · 0,09 s | golpe de entrada (el dron, sin texto) |
| 2 | 177,570 | f60 · 2,00 s | Isabella ya es opaca y empieza el hook |
| **8** | **183,272** | **f231 · 7,70 s** | **golpe grande: entra la fachada desde el suelo** |
| 12 | 187,079 | f345 · 11,50 s | la sala |
| **16** | **190,886** | **f459 · 15,30 s** | **golpe de frase: el barrido del ventanal** |
| 20 | 194,693 | f573 · 19,10 s | llega Isabella; la música baja |
| **32** | **206,138** | **f917 · 30,56 s** | **la frase más fuerte: la revelación del patio (RC08, 8,3 s del clip)** |
| **40** | **213,746** | **f1145 · 38,17 s** | **resolución de piano: entra Isabella en la corrediza** |
| 48 | 221,359 | f1373 · 45,78 s | «Time» vuelve a pegar: la música ya se ha apagado (acaba en el f1371) |

Cómo se midió (y cómo se mide otra pista): `uv run proyectos/017/herramientas/medir-pista.py <pista>
--desde S --dur 50` da los golpes (con su fuerza) y la sonoridad cada 5 s; los de FRASE se reconocen por
su espaciado regular (aquí, cada 7,6 s). El pulso `n` suena en el frame
`round((golpe(n) + 0,012 − INICIO_MUSICA + 0,042) · 30)` (`pulso(n)` en `metraje-017.ts`; los 0,042 s son el
retardo del audio de Remotion, medido en el 016 y **confirmado aquí: los golpes 8, 16 y 32 suenan a 0,0 f de su
corte en el render**).

### 2.4 La mezcla (medida sobre la prueba 720p)

| Qué | Nivel |
|---|---|
| Voz de Isabella (hook · mitad · CTA) | −20,8 · −20,5 · −20,7 LUFS (objetivo −21, una ganancia por toma: +0,1 · +0,7 · −2,0 dB) |
| Música sola (recorridos) | −14,7 · −14,1 · −14,8 LUFS (el dron de apertura, sin voz: −17,9: la frase de subida es más baja) |
| Música bajo la voz | −16 dB (≈ −31 LUFS: **≈ 10 LU bajo ella**), 12 f de bajada ANTES de la primera palabra y 12 f de subida tras la última |
| Bajo el CTA | sin ducking: la canción ya cae 16,5 dB sola |
| Música bajo la tarjeta | el piano se apaga en 32 f (f1339-f1371: pico −19,9 → −44,4 dBFS) y el golpe del pulso 48 (f1373) queda a −113 dBFS; los últimos 28 f (0,9 s) de la tarjeta, en silencio |
| Pieza entera | **−16,4 LUFS** integrados · pico real −4,6 dBFS · LRA 7,8 LU |

### 2.5 El texto

- **La primera toma sale siempre sin texto** (rev. 4): ni hook escrito ni subtítulos. El primer subtítulo entra en el f61, con Isabella ya opaca.
- Todo lo que dice Isabella, **abajo**, en subtítulos editoriales (Montserrat 45 px y Playfair Display itálica **91 px** —8 menos que los 99 del motor, rev. 5—,
  sin sombra), **a 90 % de opacidad** (`OPACIDAD_SUBTITULOS` en `Recorrido017.tsx`; el grupo entero, además
  del fundido de cada línea). Dos velos propios viven lo que vive el texto (el de abajo) o el logo (el de arriba).
- **Nunca el sello «PROPIEDADES LUXUR».** El cierre (rev. 6) es una **tarjeta oscura** con el **logo** (`Propiedade-Luxur-Logo.png`, 440 px, 60 % de opacidad: 40 % de transparencia)
  y, debajo, la web **`PropiedadesLuxur.com`** (Montserrat 500, 54 px, blanco), centrados; entran a los 2 y 8 f de empezar la tarjeta. Nada se congela.
- Las 17 líneas están llevadas al onset de su palabra y comprobadas sobre el render
  (`herramientas/subs-vs-voz.py`): con música debajo, 16 a −1,6/+2,2 f; sobre la voz SOLA, 15 de 17 a ±0,5 f (ver `aprendizajes.md` §10).

### 2.6 Lo que NO se usó (y por qué)

- **El resto del catálogo.** Sigue en el SSD.
- `Hook2+IA`: se usa el plano real, sin «IA»; la sala vacía de los 9 s en adelante no entra.
- Ningún SFX (el formato no los lleva), ninguna `velocidad` ≠ 1, ninguna segunda canción.

---

## 3. Tablero de variantes

Reglas del formato que acotan lo que se puede cambiar (las voces de TODAS las tomas, medidas, en §3.5):
1. **Isabella, en tres sitios distintos** y el paseo no vuelve atrás: **Sentido I** (entrada → terraza) →
   hook en el interior, mitad en `INT-ABIERTO`, CTA en terraza o patio. Para el **Sentido II** (terraza →
   ventanal, acabando en el balcón: CT01/CT02) se invierten los recorridos: ver `catalogo-material.md` §10.
2. **Una sola cifra**, y nunca en los bloques 5 y 6 (el catálogo trae el precio en HK08, CT02 y CT03).
3. **Cada toma de Isabella necesita aire.** Delante, ≥ 0,43 s para entrar con disolvencia (si no, entra a corte);
   detrás, ≥ 14 f hasta el plano siguiente; y la del CTA, **20-45 f tras su última palabra**, que sale del clip
   o, si no los tiene (CT07), de un fotograma congelado.

### 3.1 Hooks (todos con su ventana de voz del catálogo; HK02 medido)

Desde la rev. 4 el hook de V1 entra **con su imagen** (sin J-cut): la primera toma sale sin texto ni voz, y la
voz del hook traía su subtítulo. Lo que pide una toma de hook es **aire antes de la primera palabra**: ≥ 0,43 s para
disolver (HK02: 0,52 s) y que la frase entera, más 12 f de ducking, quepa entre el pulso en que entra y el principio de la
disolvencia al recorrido. Con HK02 (4,8 s de voz) el último pulso posible es el 2 (f60, 2,0 s de dron). Las pausas internas
de la tabla (§3.5) sirven para un J-cut, que ahora no se usa en el hook.

| Código | Archivo | Lugar | Dice | Voz (s) | Cola | Notas para esta estructura |
|---|---|---|---|---|---|---|
| **HK02** ✔ | `Hook2+IA.MOV` | INT-ABIERTO | «Este apartamento aún no está terminado… y ahí está, precisamente, la oportunidad.» | 0,52-5,30 | — | **usado**. Plano fijo y ancho; ella camina hacia la cámara a los 5,5 s (el plano se enseña de 0,50 a 6,20 s) |
| HK01 | `Hook1.MOV` | INT-ABIERTO | «Lo más especial de este apartamento está adentro y fuera… ven, te enseño.» | 0,9-5,0 | 2,2 | curiosidad pura (control); «ven, te enseño» por confirmar |
| HK01a | `Hook1.1.MOV` | TERRAZA | (igual) | 0,2-4,5 | 0,3 | sin colchón al inicio: entra a corte |
| HK01b | `Hook1.2.MOV` | PATIO | (igual) | 0,6-4,4 | 0,4 | el mejor fondo para miniatura |
| HK03 | `Hook3.MOV` | INT-BLOQUES | «Si estás buscando un apartamento totalmente terminado, este probablemente no es para ti.» | 0,8-6,0 | 0,4 | filtro; con él la pieza es P4 del catálogo |
| HK04 | `Hook4.MOV` | INT-ABIERTO | «Si quieres diseñar 317 metros alrededor de tu forma de vivir, mira esto.» | 0,7-6,0 | **0,0** | corte a seco; **lleva «317»: entonces la mitad no puede ser MD09/MD10** |
| HK05 | `Hook5.MOV` | BARANDA | «¿Y si pudieras vivir en altura sin sentir que vives dentro de una torre?» | 0,3-3,7 | 0,6 | encaja con el dron (ángulo E); sin colchón inicial |
| HK06 | `Hook6.MOV` | TERRAZA | «Mira lo que ocurre cuando arquitectura y naturaleza dejan de estar separadas.» | 0,6-4,8 | 0,7 | cruza el umbral: muy cinematográfico; «Mira»/«Mirá» por confirmar |
| HK07 | `Hook7.MOV` | PATIO | «El verdadero lujo puede ser simplemente tener espacio para respirar.» | 0,9-5,1 | 1,0 | frase de marca; fija y simétrica |
| HK08 | `Hook8.MOV` | ENTRADA | «3.550 millones. Ahora veamos realmente qué estás comprando.» | 1,5-6,4 | 0,2 | **precio**: el CTA no puede repetirlo (CT02/CT03); la puerta negra se abre a contraluz |
| HK09 | `Hook9.MOV` | INT-VENTANAL | «Esta propiedad tiene sentido para un comprador muy específico.» | 0,9-4,1 | 0,5 | poca energía: mejor con el dron delante |
| HK10 | `Hook10.MOV` | TERRAZA | «No necesito convencerte de los patios si llegaste hasta aquí.» | 0,8-4,1 | 1,6 | en frío suena raro (presupone que ya vio algo) |

### 3.2 Mitades

La mitad cae donde acaba el recorrido por dentro (`INT-ABIERTO`). Las de **terraza** chocan con un CTA en
terraza (CT07) —dos Isabella en el mismo decorado—: van con un CTA de patio o de balcón.

| Código | Archivo | Lugar | Dice | Voz (s) | Cola | Notas |
|---|---|---|---|---|---|---|
| **MD09** ✔ | `Medio9.MOV` | INT-ABIERTO | «Tienes 317 metros para desarrollar completamente el interior.» | 0,57-4,68 | 0,65 | **usado**; entra caminando desde el fondo |
| MD11 | `Medio11.MOV` | INT-ABIERTO | «¿Alguien que valora la arquitectura y prefiere crear sus propios acabados?» | 1,0-5,2 | 0,1 | pregunta de filtro (perfil D); arranque por confirmar; sale a corte |
| MD13 | `Medio13.MOV` | TERRAZA | «(Los) materiales se pueden cambiar, pero proporciones, altura y arquitectura, no.» | 0,6-5,7 | 0,9 | la más persuasiva; pausa interna a los 2,3 s |
| MD14 | `Medio14.MOV` | PATIO | «No estás viendo un apartamento sin terminar, estás viendo uno que todavía puedes definir.» | 0,6-5,7 | 0,8 | repite la idea del hook; la cámara retrocede hacia dentro a los 5 s |
| MD02 | `Medio2.MOV` | TERRAZA | «La arquitectura ya está resuelta. El interior puede reflejar completamente tu personalidad.» | 0,3-5,8 | 1,1 | sin colchón inicial |
| MD07 | `Medio7.MOV` | TERRAZA | «La respuesta no siempre está en los metros, a veces está en cómo entra el exterior.» | 0,7-5,5 | 0,6 | 3,3 palabras/s: subtítulos muy rápidos |
| MD12 | `Medio12.MOV` | TERRAZA | «El interior puede llevar completamente tu personalidad.» | 0,7-3,9 | 0,5 | la más corta |
| MD08 | `Medio8.MOV` | TERRAZA | «La doble altura permite que la luz y ventilación ingresen a la vivienda.» | 0,8-4,8 | 0,4 | pareja de un plano de techo de madera |
| MD01 / MD01a | `Medio1.MOV` / `Medio1.1.MOV` | BARANDA / TERRAZA | «Los patios y vacíos hacen desaparecer esa frontera…» | 1,2-7,1 / 1,4-7,0 | 0,8 / 1,0 | tesis de diseño (ángulo B); elegir UNA |
| MD03 / MD04 / MD05 / MD06 / MD10 | | | | | | **MD03** «piscina»/«cocina» por confirmar · **MD04 y MD10** nombran a ALH (sin confirmar que se pueda citar) · **MD05** «luego»→«lujo» por confirmar, sin cola · **MD06** chasquido a 0,2 s, recortar el inicio |

### 3.3 CTAs

El CTA de V1 (CT07) no tiene cola (la voz acaba 3 f antes del final del clip). Desde la rev. 6 **nada se congela**: tras la última palabra la imagen funde a negro y sigue la tarjeta
oscura del cierre, así que la cola ya no hace falta para el logo. Cuanta más tenga la toma, mejor: con ≥ 0,3 s tras la última palabra el fundido de 6 f cabe ENTERO después de que ella calle
(CT07 no: el fundido empieza 4 f antes de que acabe y a 67 % de negro dice la última sílaba). De los otros, traen ≥ 0,3 s: CT01 (0,8), CT04 (0,6), CT05 (0,5), CT06 (0,8), CT02 (0,5), CT03 (0,3).

| Código | Archivo | Lugar | Dice | Voz (s) | Cola | Notas |
|---|---|---|---|---|---|---|
| **CT07** ✔ | `CTA7.MOV` | TERRAZA | «Necesitas saber si esta unidad en específico funciona para ti. Si es así, escríbeme y la recorremos juntos.» | 0,65-7,00 | **0,1** | **usado**; densa (2,8 pal/s); «línea» por confirmar |
| CT01 | `CTA1.MOV` | BALCON | «Si buscas algo diferente **en** un apartamento convencional, escríbeme y conoce Los Patios.» (medido en el 018: era «a» en el catálogo; ver `proyectos/018/`) | 0,6-5,3 | 0,8 | sin cifras; nombra el edificio; sale en el balcón (Sentido II) |
| CT02 | `CTA2.MOV` | BALCON | «317 metros cuadrados en obra gris por 3.550 millones, escríbeme y ven a conocerlo.» | 0,6-7,5 | 0,5 | la mejor «recompensa» (barandilla, valle, montañas); **da el precio**: no con HK08 |
| CT03 | `CTA3.MOV` | PATIO | «Está disponible por 3.550 millones, escríbeme y ven a conocerlo.» | 0,6-5,7 | 0,3 | plano frontal estático; precio |
| CT04 | `CTA4.MOV` | PATIO | «Los Patios, arquitectura de ALH, escríbeme para conocer esta unidad.» | 0,4-4,9 | 0,6 | arranca con un helecho desenfocado (cortinilla natural); ALH sin confirmar |
| CT05 | `CTA5.MOV` | INT-BLOQUES | «Si encaja con lo que estás buscando, escríbeme.» | 0,7-3,1 | 0,5 | el CTA más limpio y corto (3,6 s) |
| CT06 | `CTA6.MOV` | INT-ABIERTO | «Si es el reto, escríbeme y agendamos una visita.» | 0,9-3,7 | 0,8 | cruza el umbral hacia el deck; «reto» por confirmar; pide agendar |

### 3.4 Recorrido y dron: qué hay en cada clip (para cambiar el arranque de un plano)

Las ventanas que V1 (rev. 4) usa están marcadas **así**. Para otro arranque basta cambiar `desde` en `metraje-017.ts`
(la disolvencia pide 12 f de clip ANTES de `desde`; la puerta lo comprueba).

| Clip | Qué se ve, por segundos del clip |
|---|---|
| **RC01** Abre puerta (17,9 s) | **0-1,5 «501» sobre ladrillo** · 2-7,5 la hoja y la manija en primerísimo plano (oscuro) · **8-9 la hoja barre el cuadro** · 9-13,5 el pasillo hacia el muro de bloques · 14-17,9 se abre la sala hasta el ventanal |
| **RC02** Entrada y sala (14,2 s) | 0-7 pasillo de ladrillo hacia los bloques de vidrio · 7-9,5 el giro · **9,8-13,6 aparecen el ventanal y la tubería amarilla** |
| **RC07** Vista, cocina y comedor (11,4 s) | **0-3,2 el barrido del ventanal con el skyline (0,8-4,6 usado)** · 3,5-5,5 gira hacia el espacio abierto · 6-11,4 el espacio abierto con las varillas verde y amarilla |
| **RC08** Patio y naturaleza (10,2 s) | 0-2,5 follaje y barandilla · 3-4,5 la pasarela se abre (columna) · 5-6,5 el patio de techo de madera · 6,5-10 el muro de ladrillo con la corrediza; **1,57-10,13 usado, entero y sin cortes (rev. 2)**: `c08` 1,57-5,40 y `c09` 5,40-10,13 |
| **RC10** Patio y piscina (11,9 s) | 0-3,5 el deck frente al ladrillo · 3,4-8,2 el giro a la derecha (espejo de agua, listones y palma, columna; **usado en la rev. 1**) · 8,5-11,9 cielo, skyline y hojas |
| **RC25** Exterior edificio4 (7,7 s) | **0-2,3 contrapicado extremo de la fachada: el edificio sube hacia el cielo con nubes, los jardines colgantes y el vidrio (1,2-3,1 usado)** · 2,3-4 la cámara baja y aparece el camino de concreto · 4-7,7 avanza por el camino con las palmas a la izquierda y la fachada a la derecha |
| **DR147** dron, el edificio (22,9 s) | **0-6 la copa de un árbol por delante (0-2,0 usado desde la rev. 4; 0-4,3 hasta la rev. 3)** · 6-17 el edificio sube, el rótulo «LOS PATIOS» en la base · 17-22,9 la corona completa |
| **DR163** dron, la terraza (19,1 s) | **0-6 desde el borde de la terraza (columna, techo de madera, skyline; 2,0-7,7 usado desde la rev. 3)** · 6-13 se desliza sobre el deck · 13-15 baja · 13,3-19 a ras de suelo hacia el muro y la corrediza (usado en las rev. 1 y 2) |

Planos buenos que V1 no usó: **RC04** (0-3 s: la vista con las nubes, el mejor cielo del material), RC03, RC05,
**RC09** (patio → acaba entre hojas: cortinilla), **RC11** (piscina → entra por la corrediza al interior: Sentido II),
**RC16** (Isabella caminando hasta la barandilla; su voz 0,4-3,9 s), **RC10** (usado en la rev. 1), RC22 (la entrada con el rótulo «LOS PATIOS») y RC24/RC26 (más fachada desde el suelo),
**DR152** (8-15 s asciende hasta la corona; 15-22 retrocede: el segundo revelado), DR155 (primer plano de los jardines
colgantes), DR154 (vuelo lateral con la calle), DR153 (órbita).

### 3.5 Todas las tomas habladas, medidas

`limites-voz.py` sobre las 34 (energía en 300-3400 Hz, umbral = suelo + 12 dB): dónde empieza y acaba la voz, el aire de antes y de
después, la pausa interna más larga (por donde puede entrar una imagen en un J-cut, como en HK02 hasta la rev. 3) y la sonoridad de esa ventana. La
**ganancia** es la que lleva la toma a −21 LUFS (la mediana del 017); la puerta del proyecto tumba una ganancia de más de ±6 dB, y **⚠** marca
las que se acercan.

| Código | Archivo | Voz (s) | Aire antes | Cola | Pausa interna mayor | LUFS | Ganancia a −21 | Pico (dBTP) |
|---|---|---|---|---|---|---|---|---|
| HK01 | `Hook1.MOV` | 0.91-5.09 | 0.91 s | 2.07 s | 3.79-4.37 (580 ms) | -26.1 | +5.1 dB ⚠ | -7.6 |
| HK01a | `Hook1.1.MOV` | 0.25-4.47 | 0.25 s | 0.30 s | 3.18-3.66 (480 ms) | -23.3 | +2.3 dB | -4.1 |
| HK01b | `Hook1.2.MOV` | 0.55-4.49 | 0.55 s | 0.35 s | 3.24-3.58 (340 ms) | -23.7 | +2.7 dB | -6.0 |
| HK02 | `Hook2+IA.MOV` | 0.52-5.30 | 0.52 s | 7.94 s | 2.72-2.93 (210 ms) | -21.1 | +0.1 dB | -3.1 |
| HK03 | `Hook3.MOV` | 0.81-6.04 | 0.81 s | 0.40 s | 3.34-3.68 (340 ms) | -24.1 | +3.1 dB | -6.0 |
| HK04 | `Hook4.MOV` | 0.16-5.97 | 0.16 s | 0.00 s | 5.37-5.69 (320 ms) | -24.6 | +3.6 dB | -8.8 |
| HK05 | `Hook5.MOV` | 0.26-3.67 | 0.26 s | 0.63 s | — | -21.2 | +0.2 dB | -3.9 |
| HK06 | `Hook6.MOV` | 0.59-5.00 | 0.59 s | 0.54 s | — | -22.4 | +1.4 dB | -3.5 |
| HK07 | `Hook7.MOV` | 0.95-5.11 | 0.95 s | 0.96 s | — | -19.6 | -1.4 dB | -1.2 |
| HK08 | `Hook8.MOV` | 1.51-6.44 | 1.51 s | 0.19 s | 3.39-3.65 (260 ms) | -20.4 | -0.6 dB | -3.1 |
| HK09 | `Hook9.MOV` | 0.95-4.12 | 0.95 s | 0.52 s | — | -19.2 | -1.8 dB | -4.0 |
| HK10 | `Hook10.MOV` | 0.82-5.70 | 0.82 s | 0.01 s | 4.15-5.42 (1270 ms) | -21.6 | +0.6 dB | -2.9 |
| MD01 | `Medio1.MOV` | 1.25-7.15 | 1.25 s | 0.78 s | 5.25-5.70 (450 ms) | -24.9 | +3.9 dB | -4.0 |
| MD01a | `Medio1.1.MOV` | 1.37-7.02 | 1.37 s | 0.95 s | 4.09-4.31 (220 ms) | -22.2 | +1.2 dB | -2.0 |
| MD02 | `Medio2.MOV` | 0.34-5.78 | 0.34 s | 1.15 s | 4.70-4.96 (260 ms) | -21.9 | +0.9 dB | -1.1 |
| MD03 | `Medio3.MOV` | 0.41-4.45 | 0.41 s | 1.03 s | — | -21.9 | +0.9 dB | -3.4 |
| MD04 | `Medio4.MOV` | 0.60-5.97 | 0.60 s | 0.53 s | — | -17.1 | -3.9 dB | -0.9 |
| MD05 | `Medio5.MOV` | 1.15-4.60 | 1.15 s | 0.64 s | 3.78-3.98 (200 ms) | -24.2 | +3.2 dB | -5.9 |
| MD06 | `Medio6.MOV` | 1.31-7.34 | 1.31 s | 0.61 s | — | -20.6 | -0.4 dB | -0.8 |
| MD07 | `Medio7.MOV` | 0.70-5.56 | 0.70 s | 0.54 s | 2.98-3.23 (250 ms) | -19.5 | -1.5 dB | -1.4 |
| MD08 | `Medio8.MOV` | 0.77-4.82 | 0.77 s | 0.42 s | — | -18.1 | -2.9 dB | -0.5 |
| MD09 | `Medio9.MOV` | 0.57-4.68 | 0.57 s | 0.65 s | — | -22.6 | +1.6 dB | -3.0 |
| MD10 | `Medio10.MOV` | 2.08-9.00 | 2.08 s | 0.00 s | — | -19.9 | -1.1 dB | -1.6 |
| MD11 | `Medio11.MOV` | 1.00-5.14 | 1.00 s | 0.12 s | — | -19.2 | -1.8 dB | -1.1 |
| MD12 | `Medio12.MOV` | 0.67-3.88 | 0.67 s | 0.55 s | 2.90-3.06 (160 ms) | -18.4 | -2.6 dB | -2.2 |
| MD13 | `Medio13.MOV` | 0.21-5.67 | 0.21 s | 0.98 s | 2.40-2.75 (350 ms) | -20.0 | -1.0 dB | -1.2 |
| MD14 | `Medio14.MOV` | 0.57-5.76 | 0.57 s | 0.74 s | 2.80-3.11 (310 ms) | -18.5 | -2.5 dB | -3.7 |
| CT01 | `CTA1.MOV` | 0.95-5.36 | 0.95 s | 0.71 s | 3.41-3.66 (250 ms) | -22.6 | +1.6 dB | -4.3 |
| CT02 | `CTA2.MOV` | 0.64-7.49 | 0.64 s | 0.50 s | 3.24-3.60 (360 ms) | -21.2 | +0.2 dB | -1.0 |
| CT03 | `CTA3.MOV` | 0.60-5.67 | 0.60 s | 0.34 s | 3.56-3.96 (400 ms) | -20.2 | -0.8 dB | -2.1 |
| CT04 | `CTA4.MOV` | 0.43-4.86 | 0.43 s | 0.68 s | 2.80-2.96 (160 ms) | -17.8 | -3.2 dB | -0.8 |
| CT05 | `CTA5.MOV` | 0.68-3.13 | 0.68 s | 0.47 s | 2.33-2.51 (180 ms) | -19.1 | -1.9 dB | -1.6 |
| CT06 | `CTA6.MOV` | 0.86-3.70 | 0.86 s | 0.77 s | — | -16.0 | -5.0 dB ⚠ | -0.4 |
| CT07 | `CTA7.MOV` | 0.65-7.02 | 0.65 s | 0.10 s | 4.09-4.56 (470 ms) | -18.8 | -2.2 dB | -2.0 |

⚠️ El LUFS de aquí sale de `loudnorm` y no coincide al décimo con `ebur128` (en MD09: −22,6 contra −21,7 en la ventana exacta de voz). **Antes de
fijar la ganancia de una toma en el plan, vuelve a medir su ventana de voz con `ffmpeg -ss <s0> -t <dur> -i <toma>.wav -af ebur128=peak=true -f null -`**
(el −21,1 de HK02, p. ej., es de su frase, 0,45-5,40 s: con la ventana de `limites-voz` entran los pasos de después y sale −22,0). Dos notas de la
tabla: **MD11** trae un chasquido a 0,06 s que cuenta como voz (la voz real empieza a 1,00 s) y **HK10** un ruido a 5,5 s dentro de su ventana.

### 3.6 Música alternativa

Medidas en la ventana de 50 s desde el `desde` de la columna de 45 s del catálogo (energía RMS por tramos de 5 s; los BPM son los
del catálogo). **Ninguna se ha montado ni escuchado**: la ficha es la del catálogo (sentimiento inferido) más lo medido.

| Pista | Tonalidad · BPM | Sentimiento (catálogo) | `desde` (45 s) | Arco medido | Cómo casaría con V1 |
|---|---|---|---|---|---|
| **Return to Oasis** — Aleksey Chistilin | Re# menor · 110 | reencuentro, serenidad, añoranza luminosa | 140,82 (★★) | crescendo suave de −13 a −8 dB hasta +40 s y resolución a −19 dB | **la forma más parecida a Time** (sube hasta el patio y resuelve bajo el CTA); su gancho es ★★ |
| **Deep Breath** — Aleksey Chistilin | Do# menor · 122 | calma, introspección, alivio | 79,90 (★★★) | meseta de −10 dB hasta +35 s y cae a −25 dB | cae 3 s antes del CTA: hay que entrar ~3 s más tarde o acortar el recorrido |
| **In This Together** | Mi menor · 120 (o 60) | unión, consuelo, esperanza solemne | 92,98 (★★) | meseta de −7 dB hasta +43 s y cae a silencio | la resolución llega demasiado tarde para un CTA a los 38 s |
| **Fortitude (Light Version)** | Sol mayor · 128 (o 64) | fortaleza serena, esperanza | 105,23 (★★) | −15 dB plano, un respiro de silencio en +32,5 s y un «drop» a +33,4 s hacia −12 dB | el drop cae justo en el dron: más empuje, menos calma |
| Luxury, Elegance, Refined | Re menor · 86 | elegante, sofisticada, aspiracional | 82,10 (★★★) | plana (−14 dB) | encaja con la marca pero no da arco: el montaje lo tendría que hacer solo |
| Heaven on Earth | Do menor? · 97 | sereno, cálido, celestial | 107,51 (★★★) | plana | ídem |

⚠️ Derechos: *Time* es una pista comercial (Hans Zimmer · Warner). En Instagram/Facebook, una cuenta de empresa puede ver
el audio silenciado o el vídeo limitado. Para publicar: o se pone el audio desde la biblioteca de la plataforma (en
`audio-017.ts`, `HAY_MUSICA = false` saca la pieza solo con voz), o se cambia por una pista con licencia. No he podido
verificar la licencia de ninguna de las alternativas.

---

## 4. Receta para montar otra versión

Cada versión nueva es **un proyecto nuevo** (018, 019…) copiado de éste, o —si es un cambio pequeño— un
`metraje-017b.ts` con su composición. Orden (el de `director-video`):

1. **Elegir** la combinación en §3 y anotarla en la tabla de §1.
2. **Material nuevo:** copiar del SSD a `proyectos/NNN/original/` con el código como nombre; `shasum -a 256 <archivo> | cut -c1-8`;
   añadirlo a `MATERIAL` en `normalizar.mjs` y ejecutarlo (`node proyectos/017/normalizar.mjs`: HLG → BT.709 con VideoToolbox,
   rotación quemada, 30 fps, sin audio; el WAV de la voz sale aparte).
3. **Medir la voz** de cada toma nueva: `uv run manuales/edicion-video/scripts/limites-voz.py remotion/public/recorrido-017/<toma>.wav`
   (inicio, fin, pausas; no usar whisper para esto, R29), `node manuales/edicion-video/scripts/transcribir.mjs … --palabras`, y la sonoridad de la ventana de voz con
   `ffmpeg -ss <s0> -t <dur> -i <toma>.wav -af ebur128=peak=true -f null -` (**`-ss` DELANTE de `-i`**: detrás mide la toma desde el principio).
4. **Plano:** en `metraje-017.ts`, `src`, `desde` (frame ANTES de la primera palabra si disuelve, ≥ 12 f de clip por delante) y `voz`. Las `dur`
   se desplazan solas: salen de los pulsos `P` (cambia el pulso o la duración de la toma, no un frame suelto). Si la toma no tiene cola,
   congelado (`foto`) como `c12`.
5. **Audio:** `audio-017.ts` recalcula solo el ducking de las ventanas de voz (las tres voces salen de `vocesDeCortes`); el LUFS de la toma nueva va en su `voz` de `metraje-017.ts`.
   La tarjeta del cierre no necesita cola en la toma del CTA: si la nueva tiene más, el fundido a negro (`FUNDIDO_A_OSCURO`) puede empezar después de su última palabra. El pulso 48 de «Time»
   (el siguiente golpe tras la resolución) sigue siendo el tope de la música: `FIN_MUSICA_017`.
6. **Subtítulos:** guion marcado en `proyectos/017/voz/*.txt` → `trozos-editoriales.mjs … --tabla` → **llevar cada línea a su onset** con
   `uv run proyectos/017/herramientas/onsets-voz.py <toma>.wav --cerca <s de cada línea>` (el DTW de whisper puso 5 de 17 líneas
   entre 0,2 y 0,45 s pronto) → `revisar-subtitulos.mjs`. **Nada en la primera toma**: el primer subtítulo entra con la imagen de Isabella ya opaca.
7. **Música distinta:** `medir-pista.py` → elegir el golpe de frase que abre el vídeo y el que cae en la puerta → cambiar `FRASES`,
   `INICIO_MUSICA` (a un frame: `F/30`) y `LUFS_MESETA` en los dos archivos de datos.
8. **Puertas y pruebas:** `node proyectos/017/revisar-017.mjs` · `npm --prefix remotion run lint` · stills · prueba a 720p · sonda del audio del render
   (`herramientas/subs-vs-voz.py`) · hoja de contactos · **OK del usuario** · final (R22).

## 5. Por confirmar

- ~~**«esta línea en específico»** (CT07)~~ **Resuelto en la rev. 8 (2026-10-03):** la palabra es **«unidad»**. Whisper la oía «línea» con confianza 0,06 en su primer trozo (y «noidad» en otro corte), y el
  texto del CTA llevó «línea» desde la rev. 1 hasta la rev. 7; el usuario lo corrigió. Está en `subtitulos-017.ts`, en `voz/cta.txt` y en el campo `dice` de `metraje-017.ts`.
- **El canal del CTA:** «escríbeme» no dice dónde. El cierre lleva el logo y la web `PropiedadesLuxur.com` (no hay cuenta de texto desde la rev. 4). ¿DM o WhatsApp? Si es uno, es una
  línea más en la tarjeta bajo la web, o se dice en la descripción del reel.
- **«317 metros»:** es lo que dice Isabella; no consta si son construidos o privados (catálogo §2). Aparece una vez, hablado y subtitulado.
- **La lectura del encargo:** «después pasa al Cta» (2.ª posición) se leyó como **Hook**. Si de verdad querías un CTA al principio y otro al final,
  es otra pieza (la estructura cambia y no se usaría «un solo video de Hook»).
- **«Opacidad al 90 %»:** se aplicó al TEXTO de los subtítulos. Si se refería a una caja o fondo detrás, son los velos de `Recorrido017.tsx`
  (`VELO_SUBTITULOS`) y se cambia en una línea.
- **La lectura estricta de «la primera toma sin texto»** (rev. 4): se quitó también la voz del dron, porque traía su subtítulo; por eso el dron dura 2,0 s y no 4,3. Si
  lo que se quería era solo quitar el texto y dejar la voz sobre el dron (sin subtítulo), es otra pieza: la voz sonaría sin su subtítulo durante ≈ 2,4 s.
- **Licencia de la música** (arriba).
