# 028 · combinaciones — V12 de One Living («todo con el recorrido caminando»)

## Versiones de esta pieza

| Rev. | Fecha | Qué | Estado |
|---|---|---|---|
| 0 | 2026-10-08 | RC14 entero (0,50-49,80 s) en 14 mesetas de velocidad (×1 a ×4) · *Street Level Sessions on the Green* desde 174,833 s · voz del hook y del CTA de la propia toma · 1056 f (35,2 s) | prueba (`pruebas-720p/028-recorrido.mp4`, reducida de `remotion/out/028-1080.mp4`) |
| final rev. 0 | 2026-10-08 | la rev. 0 tal cual, tras «renderiza la final» | exportada; guardada como `finales/028-recorrido-rev0.mp4` |
| **final rev. 1** | 2026-10-08 | «necesito que la voz cuando habla Isabella tenga más decibeles sin saturar»: la voz de −21 a **−15 LUFS** (tratada: graves, puerta suave, compresión 3:1, +16 dB, limitador a −2,5 dBFS; pico real −2,5 dBTP) y apagada 3 f tras «contáctame»; la imagen y la música, iguales | **exportada**: `finales/028-recorrido-crf16.mp4` (la ligera, CRF 16) + `finales/028.srt` |
| **master rev. 1** | 2026-10-08 | la rev. 1 a CRF 12 `slower` («exporta también el master CRF 12») | **exportado**: `finales/028-recorrido.mp4` (108 MB) |

## Cómo cambiar cada pieza

- **Una velocidad** (más rápido, más lento un tramo): su línea en `MESETAS` de `remotion/src/proyectos/028/metraje-028.ts` (`v`). Todo lo que viene detrás se mueve; vuelve a cuadrar las fronteras con `python3 proyectos/028/herramientas/plan-rampas.py --cuadra 174.780 --ts` (copia sus `a`/`b` a la vez en `PLAN` del script y en `MESETAS`), y pasa la puerta: los golpes de la sección 3 te dicen qué arranque se ha salido.
- **Dónde empieza o acaba un tramo:** su `a`/`b` en `MESETAS` (frames de RC14 a 30 fps) y el margen de esa frontera en `PLAN` de `plan-rampas.py`. Las hojas `contactos/rc14-cada-1s.png` (y `herramientas/movimiento.py`) dicen qué se ve en cada segundo.
- **La rampa:** `PASO_RAMPA` (2 f por escalón) y `SALTO_RAMPA` (0,5) para todas; `PASO_BAJA` para frenar más despacio al final de una meseta concreta (hoy, la llegada al CTA: 4 f).
- **Sin la voz de Isabella** (un recorrido mudo): en `cortesDeMesetas`, no pasar `audio`/`voz` a los dos trozos a ×1, vaciar `subtitulos028`, y en `audio-028.ts` dejar la música arriba toda la pieza (sin las dos bajadas). La puerta (secciones 2, 5 y 6) pide hoy dos tomas con voz: se cambia con ellas.
- **Otra canción:** `GOLPE`, `INICIO_MUSICA` y `FIN_PISTA` en `metraje-028.ts`, `musica/golpes-028.json` (`golpes-json.py`), la receta (`normalizar.mjs`: archivo y sha), las sonoridades de `audio-028.ts` (`LUFS_MESETA`, `LUFS_CANCION_EN_VOZ`) y cuadrar las fronteras otra vez. Y el registro.
- **El nivel de la voz:** `OBJETIVO_LUFS` en `metraje-028.ts` (hoy −15) y, si se sube más, la cadena `VOZ_TRATADA` de `normalizar.mjs` (el `volume` antes del limitador): la puerta exige el pico real de la voz ≤ −1 dBTP medido sobre lo que suena. Volver a la voz cruda: `a("rc14")` en `cortesDeMesetas`, `OBJETIVO_LUFS = -21` y los `lufs` crudos (−22,3 / −22,7).
- **Sin música** (por licencia): `HAY_MUSICA = false` en `audio-028.ts`.
- **El color:** `COLOR_RC14` en `metraje-028.ts` (uno solo para los 49 trozos).

## Qué comparte con las versiones anteriores

Todo es RC14 (el encargo). Ya publicado: el hook (1,6-7,2 s, V10), el CTA (44,8-49,8 s, V10 y V11), el balcón (13,7-15,9 s, V7) y el paseo hacia la isla (18,5-22,6 s, V11). Nuevo: la puerta, la sala, la vista entera, el baño y el vestier de la alcoba secundaria, la alcoba secundaria con ella y la vuelta por la cocina.

## La final (2026-10-08)

`proyectos/028/finales/028-recorrido.mp4`: CRF 16 `slow`, `--color-space=bt709 --image-format=png --gl=angle` (R22), 1080×1920, 1056 f · 35,2 s, 60 MB (13,3 Mb/s de vídeo, AAC 320 kb/s), **−15,8 LUFS** en toda la pieza, pico real −3,6 dBFS, LRA 9,2 LU. Y `028.srt` (12 cues, para la pista de captions).

- **Etiquetas de color:** el master de Remotion salió con el VUI en 2/2/1 (primarios y curva sin especificar) y SIN átomo `colr`, como dice R22. Se arreglaron las dos capas sin recodificar (`h264_metadata` + `-color_primaries/-color_trc/-colorspace bt709 -color_range tv` + `+write_colr+faststart`): VUI 1/1/1 y `colr` nclx 1/1/1, rango limitado. md5 del vídeo decodificado (`ec0a3fdc…`) y del PCM (`7fce6e53…`) idénticos antes y después.
- **Color contra stills a escala 1** (`finales/medir-final.txt`, 12 fotogramas): Δ color medio ≤ 0,24 niveles, PSNR de baja frecuencia ≥ 49,4 dB (medio 50,3), bruto medio 43,1 dB: 0 fuera de tolerancia.
- **Golpes sobre el audio de la final** (`finales/golpes-final.txt`): los 11 cambios de velocidad a ≤ 1,8 f de su golpe.
- **Exportada con CUATRO palabras sin oír** (cerradas por medida en la V10; la nota «POR CONFIRMAR AL OÍDO» sigue en `subtitulos-028.ts` y `--final` falla solo por ella): «posibilidades» (≈ 3,8 s), «te muestro» (≈ 4,9 s), «gustó» (≈ 29,1 s) y la última sílaba de «contáctame» (≈ 32,3 s). Para cambiar una: el trozo en `subtitulos-028.ts`, `voz/hk5.txt` o `voz/ct4.txt`, `VOZ_HOOK.dice` o `VOZ_CTA.dice` en `metraje-028.ts`, el `.srt` (`exportar-srt.mjs`) y volver a renderizar (≈ 2 min + el arreglo de etiquetas).

## El master CRF 12 (2026-10-08)

Por la convención de las versiones anteriores (V4, V5, V9), `finales/028-recorrido.mp4` es ahora el MASTER (CRF 12 `slower`, 108 MB, 24,3 Mb/s de vídeo) y la ligera pasó a `finales/028-recorrido-crf16.mp4` (60 MB). Mismas banderas de color (R22) y el mismo arreglo de etiquetas (VUI 1/1/1 y `colr` nclx 1/1/1). Audio idéntico al de la CRF 16 (md5 del PCM `f12e153f…`). Color contra los stills a escala 1 (`finales/medir-final-crf12.txt`): Δ color medio ≤ 0,18 niveles, PSNR bruto medio 45,0 dB (la CRF 16: 43,1) y de baja frecuencia 52,4 dB (50,3): 0 fuera de tolerancia. Entre las dos codificaciones, 1052 fotogramas a ≥ 41,5 dB (medio 48,8; los 4 restantes, idénticos: la tarjeta negra). `medir-final-crf16.txt` es la medida de la CRF 16 (misma imagen en la rev. 0 y la rev. 1).
