# Combinaciones — proyecto 043 · Lote en El Carmen de Viboral (Mia), V26

Registro de esta versión y mapa de «cómo cambiar cada pieza». Las V14 (030), V15 (031), V18 (034) y V22 (039) están en git (`proyectos/030|031|034|039/` y `remotion/src/proyectos/…`); las V23-V25 (040-042) son de sesiones hermanas, en sus worktrees. Lo que usó cada versión está también en `archivos/musica/registro-de-uso.md` (§1 y §6), el tablero de coordinación entre sesiones.

## Versiones de esta propiedad

| V | Proyecto | Estado | Fecha | Qué es |
|---|---|---|---|---|
| V14 | 030 | final | 2026-10-08 | «Seguridad sin encierro»: DR97 · HK04 · MD02 · CT01 · *Becoming* |
| V15 | 031 | final | 2026-10-09 | «Construir aquí»: DR107 · HK06 · MD04 · CT04 · *Somewhere inside of me* |
| V18 | 034 | final | 2026-10-09 | «Tu lugar en el campo»: DR98 · HK03 · MD03 · CT03 recortado · *Chillin'* |
| V22 | 039 | en prueba | 2026-10-09 | «El campo sin desconexión» (disruptivo): HK02 · MD05 · CT02 · *Light Fills the Room* |
| V23-V25 | 040-042 | sesiones hermanas | 2026-10-17 | «La vista», «Todo lo que estás comprando», «Encontré» |
| **V26** | **043** | **final (CRF 12 y CRF 16; 7 palabras sin oír)** | 2026-10-17 | **«Todo resuelto»**: DR203 · **HK06** · DR211 · DR207 · DR203 · **MD06** · RC04 · DR211 · DR207 (la vista) · **CT03 entera** · *Luxury, Elegance, Refined* · 1108 f · 36,9 s · drones NUEVOS del 2026-10-14 (atardecer) |

## Lo que lleva (rev. 0 = la final exportada el 2026-10-17)

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Hook | HK06 `IMG_1605` (voz 0,65-5,45 s) | asignada: agua y energía, lo práctico primero. **Repetida de la V15** (declarado) |
| Mitad | MD06 `IMG_1611` (voz 0,54-4,78 s) | asignada: dos entradas. Libre; la doble de MD05. Empezaba «a los 0,02 s» según el registro: es un chasquido, la primera sílaba sube a los 0,54 s |
| CTA | CT03 `IMG_1604` **ENTERA** (voz 0,73-3,12 s) | «Haz clic en el botón y agendemos una visita». **Repetida de la V18**, que la recortó a la segunda frase. **Pendiente: qué botón es** |
| Canción | *Luxury, Elegance, Refined* (`4d36ea48`) | la única lounge de las 4 de su grupo con rejilla de cortes en golpes ≥ 12,7 dB |
| Entrada de la canción | 16,164 s (`INICIO_MUSICA` = 484/30) | golpe de 18,6 dB en el f3 |
| Apertura | DR203 1,80-5,13 s | lateral lento sobre terrazas, árbol y cabaña; ≈ 1 px/f constante; dispersión 0,040 |
| Paseo | DR211 3,50-5,83 · DR207 20,50-23,77 · DR203 5,20-7,90 | vegetación y tejado rojo → terrazas con el árbol → árbol y cabaña |
| Bloque 5 | RC04 0,60-2,47 · DR211 18,20-20,53 · DR207 30,80-35,43 | el portón de la vereda · las terrazas bajo el sol · la vista (4,6 s, el plano más largo) |
| Voz | −15 LUFS tratada (+18,3 · +18,6 · +18,5 dB tras el compresor 3,5:1; limitador −2,5 dBFS) | pedido permanente: «a −15 LUFS sin saturar» |
| Música sola | −15 LUFS por tramos (apertura −0,3 dB, paseo +0,1, bloque 5 0,0); −26 bajo la voz | la canción ya está a ≈ −15 |
| Color | `COLOR_BASE` (la del 017) + el ajuste de cada plano (medido) | ver abajo |

## Lo medido en la prueba y en la final (rev. 0)

| Qué | Medida |
|---|---|
| Cortes secos sobre golpes | los 9 cortes a −0,5…+0,5 f en el AAC de la prueba (`golpes-render.py`), de 12,7 a 25,1 dB; sobre el WAV del render (`remotion render … audio.wav`) la subida del golpe aparece 0,8-1,8 f ANTES del corte (el AAC de Remotion llega ≈ 1,3 f tarde y `RETARDO_AUDIO` lo compensa: ver `final-remotion-audio-43ms-tarde`) |
| Voz | −14,7 · −14,7 · −14,7 LUFS en sus ventanas del render (música a −26 debajo), picos −4,4 · −4,5 · −4,9 dBFS; el WAV tratado, −15,0 LUFS y −2,5 dBFS, silencio (−70 LUFS) en su cola |
| Música sola | −14,9 (apertura) · −14,9 (paseo) · −14,9 (bloque 5) LUFS |
| Pieza | −15,0 LUFS integrado, pico −2,9 dBFS, LRA 1,6 LU: sin saturar |
| Subtítulos | 15 líneas a +0,2…+1,7 f de su palabra sobre la voz sola (`lineas-vs-onsets.py`) |
| Legibilidad (texto blanco sin sombra) | contraste 3,6-7,7 : 1 al p90 y 2,9-5,9 al p99 (017: 2,9-3,7 / 2,6-3,0; 018: 2,8-4,1 / 2,3-3,5) |
| Color (`medir-color.py`, antes → después) | σ de luma entre planos 7,3 → 4,1 · quemado máx. 14,2 → 5,3 % (el portón, cielo azul; los drones ≤ 0,8 %) · aplastado máx. 1,9 → 3,1 % · saturación media 0,297 → 0,351 · piel (CT03): tono 8,0° → 7,7° · saltos de luma en los cortes: el mayor, −22 (mitad → portón: un portón de madera oscura tras un fondo de cielo cubierto); `medidas/medir-color-3.txt` |
| Cierre | tarjeta de 2,0 s con el logo y la web; negro exacto en el f1047 (la puerta) |
| **Final (CRF 12 `slower`)** | `finales/043-recorrido.mp4`: 149,7 MB, 1080×1920, 1108 f, H.264 + AAC 320 kbps (317 kbps), −15,0 LUFS, pico −2,9 dBFS. Etiquetas BT.709 arregladas sin pérdida (R22: VUI y átomo `colr`); `framemd5` DECODIFICADO (1108 fotogramas) y PCM del audio, idénticos antes y después. Color contra stills a escala 1 (`medir-final.py`, 10 fotogramas): color medio ≤ 0,38 niveles, PSNR de baja frecuencia 50,3-53,7 dB (medio 52,5), bruto 41,8-45,3 dB |
| **Final (CRF 16 `slow`)** | `finales/043-recorrido-crf16.mp4`: 78,0 MB, misma imagen y mismo audio (PCM idéntico al del master); `framemd5` idéntico antes/después de las etiquetas; color medio ≤ 0,83 niveles, PSNR de baja frecuencia 47,3-52,2 dB (5 fotogramas) |
| `.srt` | `finales/043.srt`: 15 cues, 3,67-34,13 s (`exportar-srt.mjs`) |
| Portada | `finales/043-portada.png` (receta en `portada.json`): fotograma de 27,8 s (el más nítido de la vista), `EL CARMEN DE VIBORAL` (la letra baja a 64 px para caber) · `VENTA` (según la ficha); contraste 6,8:1 el texto y 15,7:1 el isotipo |

## Cómo cambiar cada pieza

- **Otra CTA / recortar CT03** (si «el botón» no es el que dice la frase): `desde` y `voz.s0` del corte `c10-cta` (recortada a «y agendemos una visita»: `desde` ≈ 1,67 s como en la V18, `s0` 1,94 s), `VENTANA_VOZ.ct03` de `normalizar.mjs` (1,94-3,12), el guion `voz/ct03.txt`, los trozos de `subtitulos-043.ts`, `dice` del plan y el `.srt`. La puerta (§2e) pide la toma entera: se cambia a la vez. Cambia la duración del plano y con ella `DUR_CTA` (la rejilla del resto no se toca: el CTA va el último).
- **Otro hook / mitad:** añade su fila a `MATERIAL` de `normalizar.mjs` (con su sha) y su ventana a `VENTANA_VOZ` (¡mira el centroide antes de fiarte de la energía!), la ganancia con `herramientas/probar-voz.py --umbral 0.0316 --razon 3.5` (editar su `TOMAS`) → `GANANCIA_VOZ_DB`. Luego `voz.s0/s1/lufs/dice` del corte, el guion marcado `voz/<toma>.txt`, cada línea llevada a su palabra con `onsets-voz.py` + `palabras-desde.py` (tabla de `lineas-vs-onsets.py`). Si cambia la duración del plano cambia la rejilla: `buscar-cortes-043.py` con `R='[[60,100],[160,175],[56,110],[56,110],[56,110],[152,165],[36,80],[60,110],[100,165]]' FIN=todas MINC=12 START_MIN=12 DROP=12 ORDEN=golpe` (con esos rangos solo sale la rejilla de 16,164 s).
- **Otra canción:** reservarla en el registro; `buscar-cortes-043.py`; `medir-pista.py … --json musica/golpes-043.json`; los `GOLPE` de `metraje-043.ts`, `INICIO_MUSICA` y los niveles de `audio-043.ts` (`LUFS_TRAMO`, `PICO_APERTURA`, `LUFS_CANCION_EN_VOZ`; `lufs-rangos.py`). Alternativas medidas de mi grupo: *L'Amour Toujours on Saxophone* (cortes ≥ 13,8 dB; eurodance), *Here For You* (cortes ≥ 8,8 dB), *The Sky is Crying* (blues; 14,2 dB).
- **Otro plano de dron:** medir su movimiento ANTES (`flujo.py` a `FW=540 FH=960` para un paneo; `ventana-fina.py <clip> <desde> <hasta> <N f>` para la uniformidad). El `desde` va en el tiempo del MP4 normalizado.
- **Otro color:** `color({…})` de cada plano (topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `contrast` ≤ 1,22, `saturation` 0,95-1,12 y ≤ 1,06 en Isabella). Stills antes/después: `stills-multiples.mjs` y `stills-antes.mjs` (con `NODE_OPTIONS=--require …/clonar-al-copiar.cjs`); `medir-color.py`.
- **Sin música** (publicar con un audio de la plataforma): `HAY_MUSICA = false` en `audio-043.ts`; las voces siguen a −15 LUFS.

## Lo por confirmar

- **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto —6 notas en el plan y los guiones—, y la final se exportó con ellas abiertas por orden del usuario, §7c de `recorrido-luxur`; las notas SE QUEDAN): «**de la**» (HK06, f144 = 4,8 s), «**pero con**» (f171 = 5,7 s), la «**y**» de «agua y energía» (f182 = 6,1 s), «vente, **te** muestro» (f238 = 7,9 s), «**por completo**» (MD06, f590 = 19,7 s), «**lote**» (MD06, f650 = 21,7 s) y «**agendemos**» (CT03, f985 = 32,9 s). Los formantes de «y a-gen-» (CT03, 1,95-2,10 s) y de «lo-te» (MD06, 4,43-4,70 s) salen no concluyentes (consonantes nasales y laterales pegadas); las de HK06 las midió la V15.
- **¿Qué botón es el de «haz clic en el botón»?** Si no hay un botón que diga eso, se vuelve a la versión recortada (ver arriba).
- Si el hook repetido de la V15 y la CT03 de la V18 valen (no queda otro libre para este ángulo).
- La canción (medida, no oída; plana; licencia sin verificar).
