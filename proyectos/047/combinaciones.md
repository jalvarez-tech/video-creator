# Combinaciones — proyecto 047 · Tierra Grata Bosque Santo (ARRIENDO), V29 «Lo que incluye»

Registro de esta versión y mapa de «cómo cambiar cada pieza». Es una de las SEIS del lote de arriendo (V27-V32, proyectos 045-050; reparto en `proyectos/044/reparto-045-050.md`, catálogo en `proyectos/044/catalogo-material.md`). Lo que usó cada una está también en `archivos/musica/registro-de-uso.md` (§1, §2 y §7).

## Versiones de esta propiedad

| V | Proyecto | Estado | Fecha | Qué es |
|---|---|---|---|---|
| V27 | 045 | sesión hermana | 2026-10-19 | «El tiempo»: RC01 · HK01 · MD01 · CT01 · RC21 · *Fortitude* |
| V28 | 046 | sesión hermana | 2026-10-19 | «Ciudad nueva»: hook · HK03 · MD02+MD03 · CT02 · RC18 · *Children (Piano)* |
| **V29** | **047** | **en prueba (rev. 1)** | 2026-10-19 | **«Lo que incluye»**, SIN RECORRIDOS: **HK02** · **MD04 + MD05** · **CT03** · *Dreamlife* · 702 f · 23,4 s. (La rev. 0, de 47,0 s, llevaba seis recorridos horizontales —RC20 · RC16 · RC11 · RC05 · RC09 · RC03— y se descartó por pixelada: `pruebas-720p/047-recorrido-rev0.mp4`) |
| V30 | 048 | sesión hermana | 2026-10-19 | «Chef y experiencias»: hook · HK01 · MD03 · CT03 · RC10 · *Einaudi Fly* |
| V31 | 049 | sesión hermana | 2026-10-19 | «Amenidades»: RC04 · HK03 · MD05 · CT01 · RC19 · *In This Together* |
| V32 | 050 | sesión hermana | 2026-10-19 | «14,8»: hook · HK02 · MD04 · CT02 · RC02 (final) · *Spring is Coming* |

Cada versión viene en DOS formatos: el **orgánico** (`047-recorrido.mp4`, con subtítulos editoriales) y el **funnel** (`047-recorrido-ficha.mp4`, sin subtítulos y con `APARTAMENTO EN RENTA · El Poblado · Tierra Grata · $ 14,8 M COP / MES` fijo en el tercio bajo del 1:1).

## Lo que lleva (rev. 1 = la vigente; la rev. 0 llevaba además seis recorridos)

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Apertura | **el hook, a corte en el f0** (excepción declarada, como el 021 y el 022) | sin recorrido no hay otra primera toma; los 13 primeros fotogramas salen sin texto ni voz |
| Hook | HK02 `IMG_4272` (voz 0,44-6,52 s), entero | asignada: sentada en el sillón de la terraza común. **Repetida en la 050** |
| Mitad | MD04 (0,54-4,12 s) + MD05 (0,585-3,54 s), **dos tomas** | asignadas, seguidas. MD04 lleva la ÚNICA cifra (`$14.800.000`). MD04 la repite la 050 y MD05, la 049 |
| CTA | CT03 `IMG_4298` ENTERA (voz 0,60-6,04 s) | asignada. **Repetida en la 048**. No es una acción: la tarjeta cierra |
| Canción | *Dreamlife* (`5e7dcd27`), entrada en 202,1 s | reservada. Un LECHO a −26 LUFS debajo de las cuatro voces; la caída de 217,3 s cae donde entra el CTA (f457 / f459) |
| Voz | −15 LUFS tratada (+17,3 · +18,4 · +18,4 · +17,4 dB tras el compresor 3,5:1; limitador −2,5 dBFS) | pedido permanente: «a −15 LUFS sin saturar» |
| Color | `COLOR_BASE` + el ajuste de cada toma (Isabella: `saturation` ≤ 1,06) | ver el timeline |
| Transiciones | **todas disolvencias** (12 f), salvo el frame 0 | la canción no tiene golpes de ≥ 12 dB donde cortar en seco (R33) |
| **Descartado** | los seis recorridos de la rev. 0: RC20 (apertura) · RC16 · RC11 · RC05 · RC09 · RC03 (clímax, con el jacuzzi) | horizontales 1080p recortados ×1,78: pixelados. «No pongas recorridos horizontales» (2026-10-19) |

## Lo medido

| Qué | Medida |
|---|---|
| Voz | −15,0 LUFS y pico −2,5 dBFS en cada WAV tratado (`probar-voz.py`); silencio fuera de su ventana |
| Música (fuente, ebur128) | meseta de 202,1 a 217,3 s: −10,3 LUFS (pico −0,4 dBFS); caída: rms −12 → −18 dBFS entre 217,2 y 217,9 s |
| Subtítulos | 19 líneas a −0,4…+2,4 f de su palabra sobre la voz sola (`lineas-vs-onsets.py`) |
| Pausas entre frases | 21 · 23 · 24 f (0,7-0,8 s) |
| Luma por plano (stills a escala 1) | hook 94-104 · MD04 85-89 · MD05 93-96 · CTA 91-93 |
| Prueba (540×960) | ver abajo: se rellena con la mezcla de la rev. 1 |

## Cómo cambiar cada pieza

- **Volver a poner imagen de la propiedad** (solo si hay material VERTICAL o dron nuevo, o el usuario cambia de idea): un plano más en `metraje-047.ts` (bloque 1/3/5), su fila de `MATERIAL` en `normalizar.mjs`, y mover los `en` siguientes, `INICIO_MUSICA` (la caída tiene que caer en `P.cta`) y los subtítulos. La rev. 0 (`git show 0c7cf3c`) tiene todo eso hecho para seis recorridos horizontales.
- **Quitar un aseo / cambiar el hook:** `voz` del corte `c01-hook` (`dice`, `s0`, `s1`), `voz/hk02.txt` y los trozos `h01`/`h02` de `subtitulos-047.ts`; si «aseo» no es «aseo», también `caption.md`.
- **Otra cifra o sin cifra:** el trozo `m01` de `subtitulos-047.ts` (y su `{catorce millones ochocientos}` en `voz/md04.txt`); la puerta (2a) pide UNA cifra, en MD04.
- **Solo una mitad:** quitar `c03-mitad-amenidades` (o `c02`) y subir los `en` siguientes; `INICIO_MUSICA` (la caída tiene que caer en `P.cta`) y los subtítulos de ese bloque.
- **Otra canción** (la alternativa reservada es *Softly*): reservarla en el registro; `medir-pista.py --json`; `INICIO_MUSICA`, `CAIDA_CANCION`, `LUFS_CANCION_EN_VOZ`, `DB_LECHO` y la tabla `CAIDA` de `audio-047.ts`/`metraje-047.ts`; la puerta (sección 4) comprueba que la caída cae donde entra el CTA y la 4b, que la música queda ≥ 9 LU bajo la voz.
- **Otro color:** `color({…})` de cada plano (topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `contrast` ≤ 1,22, `saturation` 0,95-1,12 y ≤ 1,06 en Isabella).
- **Sin música** (publicar con un audio de la plataforma): `HAY_MUSICA = false` en `audio-047.ts`; las voces siguen a −15 LUFS.
- **La versión con ficha:** `npx remotion render … --props={"sinSubtitulos":true} --muted …` + `ficha.mjs video tierra-grata` (ver `ficha-luxur` §3).

## Lo por confirmar

- **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto): «**un aseo semanal**» (HK02, «aseo» hacia el f178 = 5,9 s del vídeo; el subtítulo «un aseo semanal» entra en el f169 = 5,6 s): whisper oye «as-e-o» con la «e» a p 0,24 y, en otras pasadas, «asesor».
- Mirar con el usuario: que la pieza abre con el hook (excepción declarada) y dura 23,4 s, que la mitad son dos tomas, que hook y CTA se repiten en otra pieza, que ya no sale ninguna imagen de la propiedad sin Isabella (ni el jacuzzi), y la canción (medida, no oída; un lecho bajo la voz; licencia sin verificar).
