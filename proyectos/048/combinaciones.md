# Combinaciones — proyecto 048 · Tierra Grata Bosque Santo (El Poblado, ARRIENDO), V30 «Chef y experiencias»

Registro de esta versión y mapa de «cómo cambiar cada pieza». Las otras cinco piezas del arriendo (V27/045, V28/046, V29/047, V31/049, V32/050) son de sesiones hermanas, cada una en su worktree; el reparto fijo está en `proyectos/044/reparto-045-050.md` y lo usado, en `archivos/musica/registro-de-uso.md` (§1, §2 y §7).

## Versiones de esta pieza

| Rev. | Estado | Fecha | Qué es |
|---|---|---|---|
| 0 | prueba (guardada como `pruebas-720p/048-recorrido-rev0-einaudi-fly.mp4`) | 2026-10-19 | Con *Einaudi Fly* (la del reparto), 1387 f (46,2 s). El usuario la vio y pidió «una canción más alegre». |
| **1** | **final (CRF 12 + CRF 16 + `.srt` + portada + versión con ficha; «aseo» sin oír)** | 2026-10-19 | **«Chef y experiencias»**: HOOK (HK01) · RC11 · RC14 · RC16 · **MD03** · RC05 · RC09 · **RC10** (el jacuzzi privado) · **CT03** · ***L' Amour Toujours on SAXOPHONE*** · 1364 f · 45,5 s |

## Lo que lleva (rev. 1 = la final exportada el 2026-10-19)

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Apertura | **el hook** (HK01 desde el f0) | reparto fijo; **excepción por encargo** a la regla «la primera toma sin texto ni voz» (como el 021): el frame 0 es Isabella; su voz empieza en el f30 (1,00 s) |
| Hook | HK01 `IMG_4269` (voz 1,00-6,60 s) | asignada. Whisper la ponía en 0,0 s. **Repetida de la V27.** «aseo» POR CONFIRMAR AL OÍDO |
| Mitad | MD03 `IMG_4285` (voz 0,68-6,65 s) | asignada. **Repetida de la V28.** En la misma terraza común que el hook (no hay otro sitio para ella) |
| CTA | CT03 `IMG_4298` (voz 0,62-6,04 s; 29,97 fps) | asignada. **Repetida de la V29.** No es una acción: cierra la tarjeta (logo + web) |
| Clímax | RC10 `Img 9509`, 5,33-10,60 s, recorte X=1100 | asignado. **Es el JACUZZI PRIVADO del balcón** (el catálogo lo leía como «deck de la terraza común») |
| La unidad (b3) | RC11 2,40-5,43 s · RC14 0,00-2,60 s · RC16 0,90-5,43 s | el orden en que se rodó (cocina → gimnasio → carril) y el que desemboca en la terraza de la mitad. RC14 sin usuarios a tamaño reconocible |
| El apartamento (b5) | RC05 0,60-4,53 s · RC09 2,00-6,03 s · RC10 | alcoba → baño → balcón; sin sala (techo en el recorte; las aperturas RC01/RC04/RC20 son de otras) |
| Canción | ***L' Amour Toujours on SAXOPHONE*** (`951c5de2`) | la pidió el usuario «más alegre» tras la rev. 0; la única libre apta (sax, 126 BPM, pulso real) |
| Entrada de la canción | 164,967 s (`INICIO_MUSICA` = 4949/30) | nota de 10,5 dB en el 165,017 s = el f3 |
| Voz | −15 LUFS tratada (+18,0 · +17,9 · +17,4 dB tras el compresor 3,5:1; limitador −2,5 dBFS) | pedido permanente: «a −15 LUFS sin saturar» |
| Música sola | −15 LUFS por tramos (−4,3 · −5,5 · −5,3 dB); −26 LUFS bajo la voz (−16,6 · −16,4 · −16,5 dB) | la canción es plana y muy alta (−9,5 LUFS, picos hasta +0,1 dBFS) |
| Color | `COLOR_BASE` (la del 017) + el ajuste de cada plano (medido) | interiores oscuros a exposición +0,3-0,4; el baño, −0,3 |

## Lo medido en la prueba y en la final (rev. 1)

| Qué | Medida |
|---|---|
| Cortes secos sobre golpes | 303 (10,2 dB) · 381 (8,2) · 839 (10,4): +0,2 · +0,2 · 0,0 f sobre el audio del render (`golpes-render.py`; el corte de la mitad y el del CTA no se miden: entra la voz). Todos a ≤ 1 f del pulso de 126 BPM (`rejilla.py`: periodo 0,4762 s) |
| Voz | −14,7 · −14,7 · −14,7 LUFS en sus ventanas del render (música a −26 debajo), picos −4,5 · −4,3 · −4,7 dBFS; el WAV tratado, −15,1 · −15,1 · −15,0 LUFS a −2,5 dBFS y silencio fuera de su ventana |
| Música sola | −15,1 (paseo) · −15,0 (bloque 5) LUFS en el render; la apertura (nota + bajada), −16,1 |
| Pieza | −15,0 LUFS integrado, pico −4,3 dBFS, LRA 1,1 LU: sin saturar |
| Subtítulos | 22 líneas a +0,5…+1,6 f de su palabra sobre la voz sola (`lineas-vs-onsets.py`) |
| Legibilidad (texto blanco sin sombra) | p90 3,6-7,0 : 1 y p99 2,0-5,2 : 1 (017: 2,9-3,7 / 2,6-3,0; 018: 2,8-4,1 / 2,3-3,5); el mínimo, en el CTA sobre las escaleras claras; el velo sube de 0,62/0,34 a 0,68/0,38 |
| Color (luma a mitad de plano) | 84-155; Isabella 100-132 (σ alta: los interiores del 31-ago son oscuros y el baño y el balcón, claros; es el material) |
| Cierre | tarjeta de 2,0 s con el logo y la web; negro exacto en el f1303 (la puerta) |
| **Final (CRF 12 `slower`)** | `finales/048-recorrido.mp4`: 103,3 MB, 1080×1920, 1364 f, H.264 17,9 Mbps + AAC 317 kbps. Etiquetas BT.709 arregladas sin pérdida (R22: VUI y átomo `colr`); `framemd5` DECODIFICADO (1364 fotogramas) y PCM del audio, idénticos antes y después. Color contra stills a escala 1 (`medir-final.py`, 10 fotogramas): color medio ≤ 0,21 niveles, PSNR de baja frecuencia 50,5-55,4 dB (medio 53,0), bruto 42,1-48,5 dB |
| **Final (CRF 16 `slow`)** | `finales/048-recorrido-crf16.mp4`: 55,8 MB; misma imagen y PCM idéntico al del master; `framemd5` idéntico antes/después de las etiquetas; color medio ≤ 0,45 niveles, PSNR de baja frecuencia 48,6-51,9 dB (5 fotogramas) |
| `.srt` | `finales/048.srt`: 22 cues, 0,97-43,17 s (`exportar-srt.mjs`) |
| Portada | `finales/048-portada.png` (receta en `portada.json`): fotograma de 36,0 s (el jacuzzi privado), `EL POBLADO` · `RENTA`; contraste 10,2:1 el texto y 16,5:1 el isotipo |
| **Con ficha** | `finales/048-recorrido-ficha.mp4`: 113,2 MB; la base limpia (`sinSubtitulos`, mudo, CRF 6) contra el final: PSNR de la mitad de arriba 51,9 dB de media (mín. 44,4); audio = PCM del master; la ficha `APARTAMENTO EN RENTA · El Poblado · Tierra Grata · $ 14,8 M COP / MES` entra en el f0 y se va entre los 43,03 y los 43,43 s |
| SSD | `…/Apartamento - Tierra Grata - Las Palmas/Videos Social Media/`: `048-recorrido.mp4` (CRF 12), `048-recorrido-ficha.mp4`, `048-portada.png`, `048-caption.md` y `048.srt` (sha256 idéntico) |

## Cómo cambiar cada pieza

- **Otra canción:** reservarla en el registro; `buscar-entrada.py` y `rejilla.py`; `medir-pista.py --desde <entrada-0,5> --dur 48 --json proyectos/048/musica/golpes-048.json`; en `metraje-048.ts`: `GOLPE`, `INICIO_MUSICA` y los cortes (`P`: cada uno en un golpe ≥ 8 dB; `FIN_MITAD = P.mitad + 204`, `ENTRA_BALCON`); en `audio-048.ts`: `LUFS_TRAMO`, `PICO_TRAMO`, `LUFS_CANCION_EN_VOZ` (ebur128 por ventana: `ffmpeg -ss <desde> -t <dur> -i musica-048.wav -af ebur128=peak=true -f null -`); los fotogramas de `subtitulos-048.ts` se desplazan con `P.mitad` y `P.cta` (ahora literales: −34 y −23 f al pasar de Einaudi a *L' Amour Toujours*) y la tabla de `lineas-vs-onsets.py`; `normalizar.mjs` (`MUSICA`). Un cambio así tardó ≈ 1 h con la prueba incluida. Sin música: `HAY_MUSICA = false` en `audio-048.ts`; las voces siguen a −15 LUFS.
- **Cerrar «aseo» (HK01, 5,9 s):** si no es «aseo», cambia el texto del trozo (`subtitulos-048.ts`, línea del acento de `h03`), `voz/hk01.txt`, el `.srt` (`exportar-srt.mjs`) y el caption; hay que RENDERIZAR de nuevo las dos finales (≈ 15 min) y mezclar las etiquetas; la versión con ficha no cambia (no lleva subtítulos) y se copia otra vez al SSD con el caption.
- **Otro hook / mitad / CTA:** añade su fila a `MATERIAL` de `normalizar.mjs` (con su sha) y su ventana a `VENTANA_VOZ`; la ganancia con `herramientas/probar-voz.py --umbral 0.0316 --razon 3.5` (editar su `TOMAS`) → `GANANCIA_VOZ_DB`; luego `voz.s0/s1/lufs/dice` del corte, el guion marcado `voz/<toma>.txt`, cada línea llevada a su palabra con `onsets-voz.py` + `palabras-desde.py` (tabla de `lineas-vs-onsets.py`). Si cambia la duración del plano, cambia la rejilla de cortes.
- **Otro recorte de un recorrido:** la sexta columna de `MATERIAL` en `normalizar.mjs` (X en píxeles, 0-1312; el centro es 656) y `node proyectos/048/normalizar.mjs --forzar --solo <código>`; RC10 va a 1100 para que el jacuzzi quede dentro.
- **Otro color:** `color({…})` de cada plano (topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `contrast` ≤ 1,15, `saturation` 0,95-1,12 y ≤ 1,06 en Isabella).
- **Otra ficha** (precio, lugar): `.claude/skills/ficha-luxur/propiedades/tierra-grata.json` y `ficha.mjs video tierra-grata <limpio> --audio <final> --salida …` con el limpio de `Recorrido048 --props={"sinSubtitulos":true} --muted`.

## Lo por confirmar

- **Oír «aseo» (HK01, f177 = 5,9 s del vídeo):** whisper la oye de cuatro maneras según dónde se corte («un asedio semanal», «un aseo semanal», «hace dos semanas», «el deseo semanal»; en la HK02, la doble de esta toma, «asesor semanal»). Se pinta «aseo semanal» (lo que dice el catálogo y la ficha: aseo semanal incluido). La puerta con `--final` falla SOLO por esta nota (3 líneas: el plan, el guion de subtítulos y su cabecera), y la final se exportó con ella abierta por orden del usuario (`recorrido-luxur` §7c); la nota SE QUEDA.
- **La canción** (medida, no oída; licencia sin verificar).
- Que el hook, la mitad y el CTA se repiten en otras piezas del arriendo (declarado) y que el hook y la mitad comparten terraza.
- **El recorte horizontal es más blando que Isabella** (material de 1080p escalado ×2,13): lo dice la prueba, no se filtra.
