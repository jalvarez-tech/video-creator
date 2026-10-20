# Combinaciones — proyecto 049 · Tierra Grata Bosque Santo (El Poblado, ARRIENDO), V31 «Amenidades»

Registro de esta versión y mapa de «cómo cambiar cada pieza». Las seis piezas de arriendo (V27-V32, proyectos 045-050) salen del mismo reparto (`proyectos/044/reparto-045-050.md`) y del mismo catálogo (`proyectos/044/catalogo-material.md`); cada una vive en su worktree. Lo que usó cada una está también en `archivos/musica/registro-de-uso.md` (§1, §2 y §7), el tablero de coordinación entre sesiones.

## Versiones de esta propiedad

| V | Proyecto | Estado | Fecha | Qué es |
|---|---|---|---|---|
| V27 | 045 | sesión hermana | 2026-10-19 | «El tiempo»: RC01 · HK01 · MD01 · CT01 · RC21 · *Fortitude* |
| V28 | 046 | sesión hermana | 2026-10-19 | «Ciudad nueva»: hook · HK03 · MD02+MD03 · CT02 · RC18 · *Children (Piano)* |
| V29 | 047 | sesión hermana | 2026-10-19 | «Lo que incluye»: RC20 · HK02 · MD04+MD05 · CT03 · RC03 · *Dreamlife* |
| V30 | 048 | sesión hermana | 2026-10-19 | «Chef y experiencias»: hook · HK01 · MD03 · CT03 · RC10 · *Einaudi Fly* |
| **V31** | **049** | **en prueba** (la final espera el OK del usuario y oír 5 palabras) | 2026-10-19 | **«Amenidades»**: RC04 · **HK03** · RC17 · RC12 · RC14 · RC13 · **MD05** · RC06 · RC08 · RC09 · **RC19 (clímax)** · **CT01** · *In This Together* · 1401 f · 46,7 s · sin dron ni cifras |
| V32 | 050 | sesión hermana | 2026-10-19 | «14,8»: hook · HK02 · MD04 · CT02 · RC02 final · *Spring is Coming* |

## Lo que lleva (rev. 0 = la prueba del 2026-10-19)

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Apertura | RC04 `Img 9469` 1,00-3,37 s (X=656) | asignada: la sala (sofá gris, listones con luz, la mesa con el sol); sin la vista. **Exclusiva de la V31** |
| Hook | HK03 `IMG_4304` (voz 0,58-5,62 s) | asignada: escaleras exteriores, «cuando llegas a una ciudad que no es la tuya…». **Repetida de la V28** (declarado) |
| Unidad | RC17 1,00-4,10 · RC12 3,20-6,70 · RC14 0,30-3,40 · RC13 0,20-3,87 | la piscina, la Social Kitchen y el gimnasio ×2: la unidad pesa más en esta pieza; todo gira a la derecha. Tramos elegidos por no coincidir con lo que más usan las hermanas |
| Mitad | MD05 `IMG_4297` (voz 0,60-3,55 s) | asignada: empieza por «Además»; va tras el recorrido de la unidad. **Repetida de la V29** (declarado) |
| Apartamento | RC06 0,10-3,60 · RC08 1,70-5,03 · RC09 5,20-7,97 | la alcoba, la puerta del baño con su luz y el último tramo del baño |
| Clímax | RC19 `Img 9529` 0,30-4,50 s (X=450) | asignado: el deck con el jacuzzi **comunal** (no el privado: ese no sale en ningún clip). **Exclusivo de la V31** |
| CTA | CT01 `IMG_4277` ENTERA (voz 0,60-4,53 s) | asignada: junto al jacuzzi comunal. **Repetida de la V27** (declarado) |
| Canción | *In This Together* (`bd507fe6`) | la reservada. Medida: muy fuerte (≈ −10 LUFS), sin pulso, golpes de 7,5-12,7 dB en su segunda mitad y caída natural bajo el CTA |
| Entrada de la canción | 161,6 s (`INICIO_MUSICA` = 4848/30) | golpe de 11,2 dB en el f3 |
| Voz | −15 LUFS tratada (+17,9 · +18,4 · +17,8 dB tras el compresor 3,5:1; limitador −2,5 dBFS) | pedido permanente: «a −15 LUFS sin saturar» |
| Música sola | −15 LUFS por tramos (apertura −5,4 dB, paseo −5,0, bloque 5 −3,2); −26 bajo la voz | la canción llega a ≈ −10 |
| Color | `COLOR_BASE` (la del 017) + el ajuste de cada plano (medido por luma) | ver abajo |

## Lo medido en la prueba (rev. 0)

| Qué | Medida |
|---|---|
| Cortes secos sobre golpes | los 11 cortes en golpes MEDIDOS de la canción (7,5-12,7 dB: el canal exige 7,4). Sobre el AAC del render (`golpes-render.py`): 7 a −0,3…+0,5 f; f449 (7,5 dB), f983 (8,5) y f1066 (9,3) a +4,0 · +5,7 · −2,3 f y f883 (12,7 dB) a −4,6 f aunque su traza SÍ muestra el salto de +9 dB en f883,05. **Textura densa de pads: los golpes de 7,5-8,5 dB no tienen subida aislada; se juzgan al oído** |
| Voz | −14,6 · −14,6 · −14,7 LUFS en sus ventanas del render (música a −26 debajo); el WAV tratado, −15,0 LUFS y −2,5 dBFS, silencio fuera de la frase |
| Música sola | −15,1 (apertura) · −15,0 (paseo) · −15,0 (bloque 5) LUFS |
| Pieza | −15,0 LUFS integrado, pico −4,3 dBFS, LRA 1,6 LU: sin saturar |
| Subtítulos | 8 bloques, 4 acentos, validador sin avisos; 14 líneas contra el render (`subs-vs-voz.py`): mediana +2,2 f, rango −2,6…+3,7 f antes de ajustar dos líneas (f107→102 y f1252→1251) |
| Color (`luma.py`, 3 fotogramas por plano) | luma 83-96 apertura · 98-104 hook · 90-95 piscina · 108-125 Social Kitchen · 70-90 gimnasio · 99-113 mitad · 117-141 alcoba · 109-147 puerta/baño · 96-118 vista · 104-112 CTA. **Los interiores del apartamento (alcoba y baño, de ropa blanca y encimeras claras) quedan ≈ 30 niveles por encima del resto con la exposición ya en su tope (−0,4)**; sin píxeles quemados (≤ 1,1 %) |
| Cierre | tarjeta de 2,0 s con el logo y la web; negro exacto en el f1340 (la puerta) |

## Cómo cambiar cada pieza

- **Otra apertura:** `c01-apertura` de `metraje-049.ts` (clip, `desde`, color); si es otro clip, su fila en `MATERIAL` de `normalizar.mjs` con su sha y su X. La primera toma sale sin texto ni voz (regla fija).
- **Otro hook / mitad / CTA:** su fila en `MATERIAL` (con sha) y su ventana en `VENTANA_VOZ` (¡`perfil.py` y `limites-voz.py --margen 20`, no el 40!), la ganancia con `herramientas/probar-voz.py --umbral 0.0316 --razon 3.5` (editar su `TOMAS`) → `GANANCIA_VOZ_DB`. Luego `voz.s0/s1/lufs/dice` del corte, el guion marcado `voz/<toma>.txt`, cada línea llevada a su palabra con `onsets-voz.py` + `palabras-desde.py` y comprobada con `subs-vs-voz.py`. Si cambia la duración del plano cambia la rejilla (abajo).
- **Otro tramo de un recorrido:** `desde` (segundos del MP4 normalizado) y `reason` del plano; la duración la fija el golpe siguiente. Mirar quién sale (un tramo de RC13 enseña a un hombre reconocible) y el adorno de la alcoba (RC08).
- **Otra canción:** reservarla en el registro; `medir-pista.py … --json musica/golpes-049.json`; `rejilla-049.py` (editar los rangos y el rango del CTA); la tabla `GOLPE`, `INICIO_MUSICA` y los niveles de `audio-049.ts` (`LUFS_TRAMO`, `LUFS_CANCION_EN_VOZ`; `lufs-rangos.py`). La alternativa asignada, *Aleksey Chistilin - Deep Breath* (ambient, `abceb83c`): medida en la V7 y la V11: sin pulso, sirve de fondo y no de rejilla.
- **La versión de ≈ 40 s:** la otra familia de la rejilla (entrada 167,452 s): planos de 2,0-2,5 s y apertura de 1,55 s (`rejilla-049.py`).
- **Otro color:** `color({…})` de cada plano (topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `contrast` ≤ 1,22, `saturation` 0,95-1,12 y ≤ 1,06 en Isabella). Stills antes/después: `stills-multiples.mjs`; `luma.py` (scratchpad de la sesión; `medir-color.py` es el de la pieza anterior).
- **Sin música** (publicar con un audio de la plataforma): `HAY_MUSICA = false` en `audio-049.ts`; las voces siguen a −15 LUFS.
- **Versión con ficha (anuncios):** `npx remotion render … Recorrido049 … --props={"sinSubtitulos":true} --muted …` y `ficha.mjs video tierra-grata` (skill `ficha-luxur` §3).

## Lo por confirmar

- **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto): «**la**» de «que no es la tuya» (HK03, f114 = 3,8 s) · «**esta**» de «esta unidad» (MD05, f677 = 22,6 s) · «**durante**» (CT01, f1253 = 41,8 s) · «**tu**» de «toda tu estancia» (CT01, f1283 = 42,8 s) · «**contáctanos**» (CT01, f1302 = 43,4 s; ¿«-anos» o «-enos»?).
- **«Plusvalía»** (HK03): palabra de Isabella; en el mundo inmobiliario suele ser valorización. Si se prefiere, se corta la frase (no se puede sin recortar la toma).
- **La canción**: medida, no oída; licencia sin verificar; los tres cortes sobre golpes de 7,5-8,5 dB (f344, f449, f983) y el de f1066.
- **El clímax es el jacuzzi comunal**, no el privado del balcón (la foto `3-Jacuzzi.png`): no sale en ningún clip del material revisado.
- **El adorno oscuro de la pared de la alcoba** (RC08, 29,5-30,4 s) y las personas a lo lejos (Social Kitchen, gimnasio).
