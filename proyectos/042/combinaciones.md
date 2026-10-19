# Combinaciones — proyecto 042 · Lote en El Carmen de Viboral (Mia), V25 («Encontré»)

Registro de esta versión y mapa de «cómo cambiar cada pieza». Las versiones anteriores del lote (030, 031, 034, 039) viven en git (`proyectos/NNN/`); lo que usó cada una está también en `archivos/musica/registro-de-uso.md` (§1 y §6), el tablero de coordinación entre sesiones (la V23/040, la V24/041 y la V26/043 son las otras tres de esta tanda, en sus worktrees).

## Versiones de esta propiedad

| V | Proyecto | Estado | Fecha | Qué es |
|---|---|---|---|---|
| V14 | 030 | final | 2026-10-08 | «Seguridad sin encierro»: HK04 · MD02 · CT01 · *Becoming* |
| V15 | 031 | final | 2026-10-09 | «Construir aquí»: HK06 · MD04 · CT04 · *Somewhere inside of me* |
| V18 | 034 | final | 2026-10-09 | «Tu lugar en el campo»: HK03 · MD03 · CT03 recortada · *Chillin'* |
| V22 | 039 | en prueba | 2026-10-09 | «El campo sin desconexión» (disruptivo): HK02 · MD05 · CT02 · *Light Fills the Room* |
| **V25** | **042** | **final** (CRF 12 + CRF 16 + `.srt` + portada; 3 palabras sin oír) | 2026-10-17 | **«Encontré»**: DR206 · **HK01** · DR221 ×3 · **MD03** (repite la V18) · DR206 · DR228 ×2 · **CT04** (repite la V15) · *Silver Skies Cinematic Piano* · 1081 f · 36,0 s · drones del 2026-10-14 al atardecer, ninguna versión los usó · prueba rev. 0: `pruebas-720p/042-recorrido.mp4` (540×960, BT.709) + `hoja.png` |

## Lo que lleva (rev. 0)

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Apertura | DR206 3,00-5,50 s | el lote entero a la hora dorada, lateral y a velocidad constante desde el f0 |
| Hook | HK01 `IMG_1587` (voz 0,075-6,16 s) | el ángulo: «Encontré un lote donde puedes tener privacidad, naturaleza y dos accesos, y está en El Carmen de Viboral»; todo respaldado por la ficha |
| Paseo (bloque 3) | DR221 4,50-7,20 · 12,00-14,70 · 19,50-22,20 s | de las palmas y la cabaña a las terrazas con el cielo rosa, tres ventanas del mismo vuelo sin segundos en común |
| Mitad | MD03 `IMG_1600` (voz 0,52-4,58 s) | «acabas de encontrarlo»; **REPITE la V18** (declarado) |
| Bloque 5 | DR206 7,80-10,30 · DR228 7,50-10,00 · DR228 14,50-18,00 s | la cabaña y el árbol grande · el vuelo bajo sobre las terrazas · la vista (3,5 s, el plano más largo del bloque) |
| CTA | CT04 `IMG_1612` (voz 0,47-3,98 s; el plano usa 0,43-4,43 s) | una acción: «escríbeme»; **REPITE la V15** (declarado) |
| Canción | *Silver Skies Cinematic Piano* (`9c3a3dc3`) desde 46,967 s (`INICIO_MUSICA` = 1409/30) | piano sereno; su respiro cae bajo el hook y su retorno de 17,4 dB abre el paseo; medida, no oída |
| Voz | −15 LUFS tratada (+18,6 · +19,3 · +18,6 dB tras el compresor 3,5:1; limitador −2,5 dBFS) | pedido permanente del canal |
| Música | −15 LUFS sola por tramos (+0,8 · −1,0 · −1,5 dB); ≈ −26 bajo la voz; partida en tramos consecutivos (ffmpeg) | ver `aprendizajes.md` §1 |
| Color | `COLOR_BASE` (contraste 1,10) + el ajuste de cada plano (medido): DR206 y DR221 y DR228 con un color por clip (los trozos de un mismo vuelo van iguales) | ver abajo |

## Lo exportado (2026-10-17, tras el OK a la prueba)

| Archivo | Qué es |
|---|---|
| `finales/042-recorrido.mp4` | máster: CRF 12 `slower`, 1080×1920, 30 fps, 1081 f, 176 MB, BT.709 etiquetado |
| `finales/042-recorrido-crf16.mp4` | versión ligera: CRF 16 `slow`, 95 MB; la misma imagen y el mismo audio |
| `finales/042.srt` | 17 cues, de 2,5 a 33,7 s |
| `finales/042-portada.png` + `portada.json` | portada 9:16: el fotograma de los 27,0 s (la vista al atardecer, el más nítido del tramo), «EL CARMEN DE VIBORAL» (bajada a 64 px para caber) y `VENTA` (la ficha lo dice); contraste del texto 7,0:1 y del isotipo 18,5:1 |
| `caption.md` | descripción de Instagram, versión resumida |

Banderas: `--color-space=bt709 --image-format=png --gl=angle --audio-bitrate=320k`. Etiquetas de color arregladas sin pérdida en las dos (`h264_metadata` + `+write_colr`: VUI 1/1/1 y átomo `colr`), con el `framemd5` decodificado (1081/1081 fotogramas) y el md5 del PCM iguales antes y después. Color contra stills a escala 1 (`medir-final.py`, 10 fotogramas): máster a ≤ 0,42 niveles (baja frecuencia ≥ 50,1 dB), CRF 16 a ≤ 0,49 (≥ 48,1 dB); 0 fotogramas fuera de tolerancia. Audio (ebur128 sobre la final): voces −14,7 · −14,7 · −14,6 LUFS, pieza −15,1 LUFS, pico −3,2 dBFS (`medidas/audio-final.txt`). Render: ≈ 9 min cada uno con el PNG de la final.

**Exportada con TRES palabras sin oír** (la puerta con `--final` falla solo por ellas; la nota se queda): «**Encontré**» (≈ 2,6 s), «y dos accesos» (≈ 6,1 s) y «**acabas** de encontrarlo» (≈ 20,0 s). Si alguna suena distinto: el texto del trozo en `subtitulos-042.ts` (`h01`, `h03`, `m03`), `voz/<toma>.txt`, el `dice` del plan, el `.srt` (`exportar-srt.mjs`) y el caption; el texto va dentro de la imagen, así que se vuelve a renderizar (≈ 9 min cada final) y se repiten las etiquetas de color.

## Lo medido en la prueba (rev. 0)

| Qué | Medida |
|---|---|
| Corte seco del paseo sobre el golpe | f266: el golpe de 17,6 dB empieza a −0,3 f (`golpes-render.py` sobre el AAC de la prueba) |
| Corte del hook | f75, sin golpe (declarado): la música ya está abajo; el golpe de 9,8 dB del f57 suena entero y la música baja con curva de 15 f hasta el corte |
| Voz | −14,7 (hook) · −14,7 (mitad) · −14,6 (CTA) LUFS en sus ventanas del render, con la música debajo; picos −3,2 · −4,2 · −4,1 dBFS |
| Música sola | −15,1 (apertura) · −15,0 (paseo) · −15,0 (bloque 5) LUFS |
| Pieza | −15,1 LUFS integrado, pico −3,2 dBFS: sin saturar |
| Música bajo la voz (puerta, sobre el plan) | hook −26 LUFS en cada tercio (rampa de −9 a 0 dB sobre el respiro del piano) · mitad y CTA −26 LUFS: 11 LU bajo la voz |
| Subtítulos | 17 líneas a +0,1…+2,2 f de su palabra sobre la voz sola (`lineas-vs-onsets.py`; `medidas/lineas-vs-onsets.txt`). Sobre el render, con música, el detector da mediana +2,4 f y valores dispersos en las sílabas suaves (`subs-vs-voz.py`: lo que ya avisa R31) |
| Color (`medir-color.py`, antes → después) | luma entre planos σ 3,8 → 4,8 · quemado máx. 17,3 → 2,0 % · aplastado máx. 2,3 → 4,5 % · saturación media 0,323 → 0,372 · piel: tono 5,6° → 5,6° (HK01), 6,0° → 6,1° (MD03), 7,0° → 7,0° (CT04) · saltos de luma en los dos cortes secos: −5,3 y −8,5 (el contenido: Isabella de día, drones al atardecer) · `medidas/medir-color.txt` |
| Cierre | tarjeta de 2,0 s con el logo y la web; negro exacto en el f1020 (la puerta) |

## Cómo cambiar cada pieza

- **Otro hook / mitad / CTA** (libres que quedan sin repetir: ninguno; con repetición, las que dice el registro §6): añade su fila a `MATERIAL` de `normalizar.mjs` (con su sha) y su ventana a `VENTANA_VOZ` (¡mira el centroide y el valle antes de fiarte de la energía!), la ganancia con `herramientas/probar-voz.py --umbral 0.0316 --razon 3.5` (editar su `TOMAS`) → `GANANCIA_VOZ_DB`. Luego `voz.s0/s1/lufs/dice` del corte, el guion marcado `voz/<toma>.txt`, cada línea llevada a su palabra con `onsets-voz.py` + `palabras-desde.py` (tabla de `lineas-vs-onsets.py`). Un cambio de duración mueve `P` de `metraje-042.ts`, las líneas de `subtitulos-042.ts` y los puntos de `audio-042.ts`.
- **Otra canción:** reservarla en el registro; `buscar-entrada.py --cta 31 35` y `medir-pista.py … --json musica/golpes-042.json`; `INICIO_MUSICA` y los `GOLPE` de `metraje-042.ts`, los niveles de `audio-042.ts` (`LUFS_TRAMO`, `PICO_TRAMO`, `LUFS_CANCION_EN_VOZ`, `LUFS_HOOK_TERCIOS`, `RAMPA_HOOK`; `lufs-rangos.py`) y el `FIN_MUSICA_042` (antes del primer golpe fuerte de la pista tras su caída).
- **Otro plano de dron:** medir su movimiento ANTES (`perfil_mov` = diferencia entre fotogramas por segundo, o `ventana-fina.py <clip> <a> <b> <N>`); mirar la hoja de contactos de las ventanas (`pruebas-720p/hojas/`). Los tres drones de esta pieza son del 2026-10-14 y exclusivos suyos.
- **Otro color:** `color({…})` de cada plano (topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `contrast` ≤ 1,15, `saturation` 0,95-1,12 y ≤ 1,06 en Isabella). Los trozos de un mismo clip, seguidos, llevan el mismo color. Stills antes/después: `stills-multiples.mjs` y `stills-antes.mjs` (con `NODE_OPTIONS=--require …/clonar-al-copiar.cjs`); `medir-color.py`.
- **Sin música** (publicar con un audio de la plataforma): `HAY_MUSICA = false` en `audio-042.ts`; las voces siguen a −15 LUFS.

## Lo por confirmar

- **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto):
  - «**Encontré**» (HK01, f77 = 2,6 s del vídeo): whisper oye «Encontro» en todos los cortes. **Por formantes (`formantes.py`) no cierra**: la vocal final («tré») mide F1 ≈ 565 y F2 ≈ 1.630 Hz en cuatro ventanas seguidas; sus /e/ medidas («te» de «lote», «ner» de «tener») están en F1 600-650 y F2 2.020-2.400 y su /o/ («con») en F1 560-590 y F2 1.450-1.650: numéricamente se parece más a la /o/, pero la /r/ que va delante baja la F2 y la F3 de una /e/ (F3 ≈ 2.330-2.520 en esas ventanas, frente a ≈ 3.100 en «con»). El sentido de la frase (primera persona) y el registro dicen «Encontré». Una medida no es un oído.
  - «y dos accesos» (HK01, f184 = 6,1 s): la «y» suena pegada a «naturaleza».
  - «**acabas** de encontrarlo» (MD03, f600 = 20,0 s): la misma duda de la V18 (en la banda de las /s/ casi no hay fricativa; suena casi «acaba de»).
- La canción (medida, no oída; piano; licencia no verificada).
- Si el corte del hook (f75), que cae sin golpe, se oye bien; si la mitad y el CTA repetidos valen; si solo drones (sin recorridos a pie) vale.
- Por dónde se escribe («escríbeme»: mensaje directo o WhatsApp).
