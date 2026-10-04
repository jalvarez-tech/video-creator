# Aprendizajes del 016

Primera pieza montada con las piezas nuevas del motor: `<SubtitulosEditoriales>`
para el titular y `<PistaAudio>` para la música.

## 1. El audio del render llega 42 ms tarde

En la primera prueba 720p, el plano del drop entraba 2,4 frames antes de que
sonara el bombo, con la puerta en verde. Dos causas sumadas:

- la rejilla medida sobre el bombo filtrado a 100 Hz marca el cuerpo del golpe,
  que llega hasta 70 ms después del chasquido; el oído engancha el chasquido
  (banda alta, a 8 ms de la rejilla). La rejilla sirve;
- el audio del MP4 que sale de Remotion va 42,2 ms por detrás de su fuente
  (correlación entre la prueba y el WAV, 4 s alrededor del drop).

Arreglo: `RETARDO_AUDIO = 0.042` en `metraje-016.ts`, sumado en `golpe()` y en
la puerta. Segunda prueba: el chasquido suena en el frame 226,6 y el plano entra
en el 226. Si el retardo sale igual en otra pieza, es del motor (o del
codificador de audio) y habría que medirlo en la sonda de audio, no pieza a pieza.

## 2. Una canción masterizada para discoteca

«Contact» suena a −8,2 LUFS con picos a +0,2 dBFS. Se deja en −14 LUFS con una
ganancia (−5,8 dB) y nada más; el render mide −14,1 LUFS y −5,5 dBFS de pico.

## 3. El velo solo mientras hay texto

`<PistaMetraje velos>` oscurece la pieza entera. Con texto solo en el primer
plano, el velo va aparte (`VeloTitular` en `RD016.tsx`) y sale con el titular.

## 4. Sin sombra, un texto centrado se coloca, no solo se escribe

Tras la primera prueba, el cliente cambió las letras del canal (Montserrat +
Playfair Display itálica, sin sombra ni borde) y pidió dejar solo «República
Dominicana 2027» y centrado. Al centro, con el plano tal cual, «2027» caía sobre
las palmeras del islote y el resto sobre nubes (luma 160-200: blanco sin sombra
no llega a 2:1). Dos arreglos, los dos de la pieza:

- el plano c01 baja 115 px (`pan: -6`, y por eso el empuje empieza en 1,13:
  `|pan| ≤ 50·(z−1)`) y el texto queda sobre cielo liso, con las palmeras debajo
  durante los 114 frames;
- el velo pasa de franja superior a banda centrada (32 % en ±70 px, a cero en
  ±300 px): sobre cielo liso se lee como el degradado del propio cielo.

## 5. La etiqueta `colr` no se escribe sola con `-c copy`

El render salió con la matriz BT.709 pero con primarios y curva «unknown» en
las DOS capas (VUI y `colr`). `h264_metadata` arregla el VUI, pero `-movflags
+write_colr` con `-c copy` copia al `colr` lo que traía la entrada, «unknown»,
hasta que se le dan también `-color_primaries bt709 -color_trc bt709
-colorspace bt709 -color_range tv`. Con eso: las dos capas en 1/1/1, frames
idénticos (`framemd5`) y audio idéntico (`md5`) al render de Remotion. Anotado
en R22.

## Entregables

| archivo | qué es |
|---|---|
| `finales/016-rd.mp4` | **máster** · 1080×1920 · 30 fps · 677 f · crf 16 · BT.709 en VUI y `colr` · −14,1 LUFS / −5,5 dBFS de pico |
| `finales/016-rd-compartir.mp4` | para subir · crf 20 · AAC 192k |
| `pruebas-720p/016-rd-720p.mp4` · `titular-f0.png` | la última prueba y la miniatura |

Color comprobado en el frame 300 contra un still PNG del mismo frame,
decodificando con `accurate_rnd`: PSNR 40,0 dB y color medio a ±0,2 niveles.

**Para publicar:** la canción es comercial (ver `01-plan.md`, Derechos).
