# Combinaciones — proyecto 041 · Lote en El Carmen de Viboral (Mia), V24

Registro de esta versión y mapa de «cómo cambiar cada pieza». Las V14 (030), V15 (031), V18 (034) y V22 (039) están en git (`proyectos/030|031|034|039/`); lo que usó cada una está también en `archivos/musica/registro-de-uso.md` (§1 y §6). Esta versión se rodó el mismo día que la V23/040 («La vista»), la V25/042 («Encontré») y la V26/043 («Todo resuelto»), cada una en su worktree.

## Versiones de esta propiedad

| V | Proyecto | Estado | Fecha | Qué es |
|---|---|---|---|---|
| V14 | 030 | final | 2026-10-08 | «Seguridad sin encierro»: DR97 · HK04 · MD02 · CT01 · *Becoming* |
| V15 | 031 | final | 2026-10-09 | «Construir aquí»: DR107 · HK06 · MD04 · CT04 · *Somewhere inside of me* |
| V18 | 034 | final | 2026-10-09 | «Tu lugar en el campo»: DR98 · HK03 · MD03 · CT03 recortado · *Chillin'* |
| V22 | 039 | en prueba | 2026-10-09 | «El campo sin desconexión» (disruptivo): DR104 · HK02 · MD05 · CT02 · *Light Fills the Room* |
| **V24** | **041** | **final** (CRF 12 + CRF 16 + .srt + portada; 3 palabras sin oír) | 2026-10-17 | **«Todo lo que estás comprando»**: DR233 · **HK07** · DR96 · DR210 · DR201 · **MD01** · RC04 · DR233 · DR201 (la vista) · **CT01** (repetida de la V14) · *Epic Inspirational* · 1166 f · 38,9 s |

## Lo que lleva (rev. 0)

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Hook | HK07 `IMG_1606` (voz 0,415-5,99 s) | asignada; lleva el área y el precio |
| Mitad | MD01 `IMG_1596` (voz 0,41-5,17 s) | asignada; nombra los dos accesos y dice «una… otra» (el texto sigue a lo que se oye) |
| CTA | CT01 `IMG_1602` (voz 0,675-4,0 s) | asignada; REPETIDA de la V14 a la fuerza |
| Canción | *Epic Inspirational and Cinematic Motivational* (`38c75296`) | la única del grupo con rejilla útil para los 9 planos; entrada 47,147 s (golpe de 9,1 dB en el f3) |
| Apertura | DR233 7,30-11,13 s | cenital sobre el lote entero, a velocidad constante desde el f0 |
| Paseo | DR96 15,60-17,47 · DR210 6,10-8,43 · DR201 2,00-4,87 | la cabaña · la vista alta con la cancha redonda · las terrazas con la luz dorada |
| Bloque 5 | RC04 0,90-4,10 · DR233 14,20-16,37 · DR201 18,40-23,00 | el portón de la vereda · la vía vista desde arriba · la vista del atardecer (4,6 s, el plano más largo) |
| Voz | −15 LUFS tratada (+19,4 · +18,0 · +17,6 dB tras el compresor 3,5:1; limitador −2,5 dBFS) | pedido del canal: «a −15 LUFS sin saturar» |
| Música sola | −15 LUFS por tramos (apertura −2,7 dB, paseo −3,7, bloque 5 −4,2); −26 bajo la voz | la canción es alta: ningún tramo sube |
| Color | `COLOR_BASE` + el ajuste de cada plano (medido) | ver abajo |

## Lo medido en la prueba y en la final (rev. 0)

| Qué | Medida |
|---|---|
| Cortes secos sobre golpes | los 8 cortes (más el de la apertura, desde el silencio) a −0,5…+0,5 f en el AAC de la prueba (`golpes-render.py`), de 8,2 a 10,3 dB; el del CTA (f986) no se puede medir con esta herramienta: la voz de Isabella entra 8 f después y el detector la ve |
| Voz | −14,7 · −14,7 · −14,7 LUFS en sus ventanas del render (música a −26 debajo), picos −4,4 · −4,3 · −5,1 dBFS |
| Música sola | −15,1 (apertura) · −15,1 (paseo) · −15,0 (bloque 5) LUFS |
| Pieza | −15,0 LUFS integrado, pico −2,8 dBFS, LRA 2,2 LU: sin saturar |
| Subtítulos | 14 líneas a +1,0…+2,4 f de su palabra sobre la voz sola (`lineas-vs-onsets.py`) |
| Color (`medir-color.py`, antes → después) | σ de luma entre planos 10,3 → 7,7 · quemado máx. 4,3 → 0,1 % · aplastado máx. 1,8 → 3,8 % (la vista) · saturación media 0,280 → 0,321 (σ 0,072 → 0,065); `medidas/medir-color-1.txt` |
| Cierre | tarjeta de 2,0 s con el logo y la web; negro exacto en el f1105 (la puerta) |
| **Final** (2026-10-17) | `finales/041-recorrido.mp4` = CRF 12 `slower` (197,9 MB) y `041-recorrido-crf16.mp4` = CRF 16 `slow` (108,4 MB), `--color-space=bt709 --image-format=png --gl=angle`; etiquetas R22 arregladas SIN pérdida en las dos capas (`framemd5` decodificado y md5 del PCM idénticos antes y después; los dos con el mismo audio, md5 `0a21ca5d`); `medir-final.py` contra stills a escala 1: CRF 12 color medio ≤ 0,41 niveles, PSNR 42,2 dB (mín 40,2), baja frecuencia 51,2; CRF 16 40,1 dB (mín 37,3), baja frecuencia 49,3; 0 fotogramas fuera. Final: −15,0 LUFS, pico −2,8 dBFS, LRA 2,2 LU; cortes a −0,5…+0,5 f. `041.srt` (14 cues) |
| Portada | `finales/041-portada.png` (receta en `portada.json`): el cenital DR233 a 1,0 s (el más nítido de 0-3,4 s), «EL CARMEN DE VIBORAL» (64 px: no cabe a 84) y `VENTA` (la ficha), contraste 9,1:1 texto y 5,9:1 isotipo; descartado el atardecer (28,6 s, 7,5:1 y 17,2:1): oscurecido por el velo se apaga y se parece a la vista de otros reels |
| Caption | `proyectos/041/caption.md` (versión resumida) |
| Entrega | copiado a `Lote - El Carmen - Mia/Videos Social/` (`041-recorrido.mp4`, `041-recorrido-crf16.mp4`, `041-portada.png`, `041.srt`, `041-caption.md`), sha256 iguales |

## Cómo cambiar cada pieza

- **Otro hook / mitad / CTA** (ya no queda ninguno libre sin repetir): añade su fila a `MATERIAL` de `normalizar.mjs` (con su sha) y su ventana a `VENTANA_VOZ` (¡mira el centroide antes de fiarte de la energía!), la ganancia con `herramientas/probar-voz.py --umbral 0.0316 --razon 3.5` (editar su `TOMAS`) → `GANANCIA_VOZ_DB`. Luego `voz.s0/s1/lufs/dice` del corte, el guion marcado `voz/<toma>.txt`, cada línea llevada a su palabra con `onsets-voz.py` + `palabras-desde.py` (tabla de `lineas-vs-onsets.py`). Cambia la duración del plano y con ella la rejilla: `buscar-cortes-039.py` con `R='[[90,130],[186,194],[55,90],[55,90],[55,90],[163,170],[60,100],[60,92],[100,150]]' FIN=todas MINC=8 DROP=8 W=3.5 ORDEN=golpe`.
- **Otra canción:** reservarla en el registro; `buscar-cortes-039.py`; `medir-pista.py … --json musica/golpes-041.json`; los `GOLPE` de `metraje-041.ts`, `INICIO_MUSICA` y los niveles de `audio-041.ts` (`LUFS_TRAMO`, `LUFS_CANCION_EN_VOZ`; `lufs-rangos.py`).
- **Otro plano de dron:** medir su movimiento ANTES (`ventana-fina.py`, `perfil-mov.py`; para una bajada o subida al cielo, `flujo.py`). Cada dron nuevo entra en `MATERIAL` de `normalizar.mjs`.
- **Solo UNA cifra escrita:** quita el trozo de `h01` de `subtitulos-041.ts` (f122 «3.428 metros cuadrados» o f177 «por 800 millones.»); la puerta (2a) lo permite si queda una sola cifra del hook; la voz sigue diciendo las dos.
- **Otro color:** `color({…})` de cada plano (topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `contrast` ≤ 1,15, `saturation` 0,95-1,12 y ≤ 1,06 en Isabella). Stills antes/después: `stills-multiples.mjs` y `stills-antes.mjs` (con `NODE_OPTIONS=--require …/clonar-al-copiar.cjs`); `medir-color.py`.
- **Sin música** (publicar con un audio de la plataforma): `HAY_MUSICA = false` en `audio-041.ts`; las voces siguen a −15 LUFS.

## Lo por confirmar

- **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto):
  - «Vente, **te** muestro» (HK07, f236-253 = 7,9-8,4 s del vídeo). `formantes.py` **no cierra**: entre 4,22 y 4,65 s hay una [e] de «ven», una pausa de 20 ms (la /t/), una [e] (4,41-4,47), otra de F1 más abierta (4,50-4,53) y «mues-tro»; caben 4 sílabas («vente, muestro») o 5 («vente, te muestro»). Whisper da «vente muestro» / «20 muestros» y, por cortes, «Te muestro». Se pinta «te muestro» (lo que dice el registro del SSD y como en las V15/V18/V22).
  - «la **vía veredal**» (MD01, f647-672 = 21,6-22,4 s). `formantes.py` midió la secuencia de vocales [a][i][a][e][e][a]: seis sílabas, la de «la vía veredal»; «vida verdad» daría cinco. Se pinta «vía veredal».
  - «escríbeme **lote**» (CT01, f1025-1049 = 34,2-35,0 s). `formantes.py` midió [i][e][e][o][e] entre «crí» y «te»: sin una «e» de más entre «me» y «lo» (whisper oye «elote»). Se pinta «escríbeme lote».
- **La cifra:** las dos escritas, como una sola afirmación (ver `01-plan.md`), o solo una.
- La canción (medida, no oída; pared de percusión; licencia sin verificar) y que repite el CTA de la V14 y el portón de la V14/V22.
