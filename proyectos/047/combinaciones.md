# Combinaciones — proyecto 047 · Tierra Grata Bosque Santo (ARRIENDO), V29 «Lo que incluye»

Registro de esta versión y mapa de «cómo cambiar cada pieza». Es una de las SEIS del lote de arriendo (V27-V32, proyectos 045-050; reparto en `proyectos/044/reparto-045-050.md`, catálogo en `proyectos/044/catalogo-material.md`). Lo que usó cada una está también en `archivos/musica/registro-de-uso.md` (§1, §2 y §7).

## Versiones de esta propiedad

| V | Proyecto | Estado | Fecha | Qué es |
|---|---|---|---|---|
| V27 | 045 | sesión hermana | 2026-10-19 | «El tiempo»: RC01 · HK01 · MD01 · CT01 · RC21 · *Fortitude* |
| V28 | 046 | sesión hermana | 2026-10-19 | «Ciudad nueva»: hook · HK03 · MD02+MD03 · CT02 · RC18 · *Children (Piano)* |
| **V29** | **047** | **en prueba** | 2026-10-19 | **«Lo que incluye»**: **RC20** (apartamento, hora azul) · **HK02** · RC16 · RC11 · **MD04 + MD05** · RC05 · RC09 · **RC03** (balcón con el jacuzzi privado, torres y ciudad) · **CT03** · *Dreamlife* · 1411 f · 47,0 s |
| V30 | 048 | sesión hermana | 2026-10-19 | «Chef y experiencias»: hook · HK01 · MD03 · CT03 · RC10 · *Einaudi Fly* |
| V31 | 049 | sesión hermana | 2026-10-19 | «Amenidades»: RC04 · HK03 · MD05 · CT01 · RC19 · *In This Together* |
| V32 | 050 | sesión hermana | 2026-10-19 | «14,8»: hook · HK02 · MD04 · CT02 · RC02 (final) · *Spring is Coming* |

Cada versión viene en DOS formatos: el **orgánico** (`047-recorrido.mp4`, con subtítulos editoriales) y el **funnel** (`047-recorrido-ficha.mp4`, sin subtítulos y con `APARTAMENTO EN RENTA · El Poblado · Tierra Grata · $ 14,8 M COP / MES` fijo en el tercio bajo del 1:1).

## Lo que lleva (rev. 0)

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Apertura | RC20 `Img 9536` 2,6-5,6 s | asignada: la sala a la hora azul; el panel curvo se aparta y deja ver el sofá con las luces y el ventanal. **Exclusiva de esta pieza** |
| Hook | HK02 `IMG_4272` (voz 0,44-6,52 s) | asignada: sentada en el sillón de la terraza común. **Repetida en la 050** |
| Paseo por la unidad | RC16 0,4-5,4 s · RC11 0,8-4,0 s | la piscina y la Social Kitchen, donde espera Isabella |
| Mitad | MD04 (0,54-4,12 s) + MD05 (0,585-3,54 s), **dos tomas** | asignadas, seguidas. MD04 lleva la ÚNICA cifra (`$14.800.000`). MD04 la repite la 050 y MD05, la 049 |
| Paseo por el apartamento | RC05 2,0-6,0 s · RC09 3,6-7,2 s | la alcoba y el baño |
| Clímax | RC03 `Img 9464` 4,3-10,3 s | asignado: el balcón con las camas, **el jacuzzi privado al fondo (5,8-6,9 s)** y el paneo a las torres y la ciudad. **Exclusivo de esta pieza** |
| CTA | CT03 `IMG_4298` ENTERA (voz 0,60-6,04 s) | asignada. **Repetida en la 048**. No es una acción: la tarjeta cierra |
| Canción | *Dreamlife* (`5e7dcd27`) | reservada. Entrada en 178,467 s (f5354 de la canción): la meseta (202,2 s) cubre el apartamento y la caída (217,3 s) cae donde entra el CTA |
| Voz | −15 LUFS tratada (+17,3 · +18,4 · +18,4 · +17,4 dB tras el compresor 3,5:1; limitador −2,5 dBFS) | pedido permanente: «a −15 LUFS sin saturar» |
| Música sola | −16 → −15 → −14 LUFS por tramos; −26 bajo la voz; sigue la caída bajo el CTA | la canción CRECE de −16 a −10 y se recoge a +2 dB de subida total |
| Color | `COLOR_BASE` + el ajuste de cada plano (alcoba y baño, `exposure` −0,35/−0,4) | ver abajo |
| Transiciones | **todas disolvencias** (12 f), salvo el frame 0 | la canción no tiene golpes de ≥ 12 dB donde cortar en seco (R33) |

## Lo medido

| Qué | Medida |
|---|---|
| Voz | −15,0 LUFS y pico −2,5 dBFS en cada WAV tratado (`probar-voz.py`); silencio fuera de su ventana |
| Música (fuente, ebur128) | apertura −15,9 · paseo −12,8 · meseta del apartamento −10,1 · en las ventanas de voz: hook −15,0, mitad −11,5 · caída: rms −12 → −18 dBFS entre 217,2 y 217,9 s |
| Subtítulos | 19 líneas a −0,5…+2,5 f de su palabra sobre la voz sola (`lineas-vs-onsets.py`) |
| Luma por plano (stills a escala 1) | hora azul 110 · hook 97 · piscina 90 · Social Kitchen 91 · MD04 87 · MD05 94 · alcoba 150 · baño 150 · balcón 116 · CTA 90 |

## Cómo cambiar cada pieza

- **Otra apertura** (RC02, 0-4 s, la sala con la mesa redonda, si «la hora azul choca»): `src`/`desde` de `c01-apertura`; el reparto la permite y lleva RC20 al bloque 5 (entre el baño y el balcón no cabe: habría que quitar RC09).
- **Quitar un aseo / cambiar el hook:** `voz` del corte `c02-hook` (`dice`, `s0`, `s1`), `voz/hk02.txt` y los trozos `h01`/`h02` de `subtitulos-047.ts`; si «aseo» no es «aseo», también `caption.md`.
- **Otra cifra o sin cifra:** el trozo `m01` de `subtitulos-047.ts` (y su `{catorce millones ochocientos}` en `voz/md04.txt`); la puerta (2a) pide UNA cifra, en MD04.
- **Solo una mitad:** quitar `c06-mitad-amenidades` (o `c05`) y repartir sus frames entre el bloque 5; mover `P.alcoba` y los `en` siguientes, `INICIO_MUSICA` (la caída tiene que caer en `P.cta`) y la ventana «mitad» de `audio-047.ts` (`BAJOS["c05-mitad-precio"]`).
- **Otra canción** (la alternativa reservada es *Softly*): reservarla en el registro; `medir-pista.py --json`; `INICIO_MUSICA`, `CAIDA_CANCION`, los `LUFS_TRAMO`/`PICO_TRAMO` y la tabla `CAIDA` de `audio-047.ts`/`metraje-047.ts`; la puerta (sección 4) comprueba que la meseta cubre el bloque 5 y la caída cae donde entra el CTA.
- **Otro plano de recorrido:** el `src` y el `desde` del corte; si el clip es nuevo, su fila de `MATERIAL` en `normalizar.mjs` (con su sha y la X del recorte). La puerta (7b) informa de cuánto comparte con las piezas hermanas.
- **Otro color:** `color({…})` de cada plano (topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `contrast` ≤ 1,22, `saturation` 0,95-1,12 y ≤ 1,06 en Isabella).
- **Sin música** (publicar con un audio de la plataforma): `HAY_MUSICA = false` en `audio-047.ts`; las voces siguen a −15 LUFS.
- **La versión con ficha:** `npx remotion render … --props={"sinSubtitulos":true} --muted …` + `ficha.mjs video tierra-grata` (ver `ficha-luxur` §3).

## Lo por confirmar

- **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto): «**un aseo semanal**» (HK02, «aseo» hacia el f256 = 8,5 s del vídeo; el subtítulo «un aseo semanal» entra en el f247 = 8,2 s): whisper oye «as-e-o» con la «e» a p 0,24 y, en otras pasadas, «asesor».
- Mirar con el usuario: la imagen blanda del recorrido (1080p recortado ×1,78), que la mitad son dos tomas, que hook y CTA se repiten en otra pieza, que el balcón enseña el jacuzzi pequeño y lejano, y la canción (medida, no oída; plana de apertura; licencia sin verificar).
