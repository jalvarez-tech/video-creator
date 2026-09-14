# 011 · Música

Dos canciones **elegidas por el cliente**, con el relevo en el **1:18** (f2340):

| tramo | canción | archivo de origen |
|---|---|---|
| 0:00–1:18 · la boda y el salón | «Turning Page» | `~/Downloads/Turning Page.mp3` (256 s, MP3 192 k) |
| 1:18–2:00 · la rumba | «El Preso» — Fruko y sus Tesos | `~/Downloads/El Preso - Fruko y Sus Tesos  (Video Oficial )  Discos Fuentes.mp3` (291 s, MP3 192 k) |

> **v2.** La primera prueba cambiaba de canción en el 1:00 (un minuto cada una).
> El cliente pidió el cambio en el **1:18**: los stems pasaron a 78 s + 42 s. La
> entrada de Turning Page (1,40 s) **no se tocó**, y no por pereza: pone un
> respiro de la canción justo en el 1:18 (ver abajo).

> El primer minuto iba a llevar «Mariage d'Amour» (Paul de Senneville) y se
> cambió por «Turning Page» antes de tocar la música. Si se quisiera volver a
> ella, la receta es la misma pero **hay que volver a medir** el punto de
> entrada: el 1,40 s de abajo solo vale para «Turning Page».

## ⚠ Lo primero: derechos

Las dos son grabaciones comerciales con titular. Para ver el vídeo en familia
(o mandarlo por WhatsApp) no hay nada que resolver. **Si se publica**, Instagram,
TikTok, Facebook y YouTube identifican la música por huella acústica: puede
silenciarse en algunos países, mostrar anuncios del titular o bloquearse. Si
llega un reclamo no hay que rehacer el montaje: se sustituyen los dos WAV por
otros de la misma duración (78 s y 42 s) y se vuelven a medir los golpes (`golpes-011.json`), porque los
cortes están sobre los de estas canciones.

## Cómo se hicieron los stems

```bash
# 1 · recorte exacto (atrim decodificando, precisión de muestra) + UN resample a 48 k, en PCM
ffmpeg -i "Turning Page.mp3" \
  -af "atrim=start=1.40:duration=78,asetpts=PTS-STARTPTS,aresample=48000:resampler=swr:filter_size=64:phase_shift=12" \
  -c:a pcm_s24le tp48.wav
ffmpeg -i "El Preso - Fruko y Sus Tesos  (Video Oficial )  Discos Fuentes.mp3" \
  -af "atrim=start=0.25:duration=42,asetpts=PTS-STARTPTS,aresample=48000:resampler=swr:filter_size=64:phase_shift=12" \
  -c:a pcm_s24le ep48.wav
# 2 · ganancia lineal (medida con loudnorm print_format=json) → WAV 16 bit
ffmpeg -i tp48.wav -af "volume=-0.77dB" -c:a pcm_s16le 011-boda-turning-page.wav
ffmpeg -i ep48.wav -af "volume=-4.51dB" -c:a pcm_s16le 011-rumba-el-preso.wav
cp 011-*.wav ../../remotion/public/boda-011/
```

WAV y no MP3 por lo mismo que en el 010: el origen **ya es** MP3, y recomprimir
sería otra generación con pérdida antes del AAC final.

## Por qué 1,40 s (Turning Page)

La canción abre con una nota de piano cada ~1,05 s. Entrando en 1,40 s caen en
su sitio TRES momentos medidos de la canción:

| momento de la canción | frame | para qué |
|---|---|---|
| **subida fuerte en 34,7 s** (de −23 a −11 dB) | f1002 | ahí empieza el beso (`c11`) |
| **respiro en 61,4 s** (−30 dB entre dos notas) | f1800 · 1:00 | el paso por negro de la glorieta al salón |
| **respiro en 79,25–79,55 s** (−22 a −25 dB) | f2340 · 1:18 | el relevo a El Preso |

```
RMS cada 0,05 s alrededor del respiro del relevo (tiempo de la canción):
79,15 −11   79,20 −19   79,25 −18   79,30 −22   79,35 −24   79,40 −23 ←   79,45 −22   79,50 −25   (79,6: nota)
```

Que el segundo respiro caiga también en su sitio es suerte medida, no diseño:
cuando el cliente movió el relevo del 1:00 al 1:18 se buscó primero un punto de
entrada nuevo (lo había: empezando con 0,6 s de silencio delante de la canción,
el 1:18 caía justo antes de la entrada fuerte de 77,45 s y El Preso habría
sustituido esa entrada), pero habría obligado a recalcular el beso y los 19
cortes de la glorieta. Con la entrada de siempre, la balada ya está casi en silencio en el
1:18.

**v3 — el fundido.** En la v2 el fader apagaba solo 6 frames de cola dentro del
respiro, y al cliente el cambio le sonó a corte. Ahora Turning Page se funde en
**2,8 s** (f2250 → f2334, curva de coseno) y deja **0,2 s de silencio** antes del
primer golpe de El Preso. Ese silencio coincide con «Y ahora…» en pantalla: la
pausa es la del rótulo, y hace que la entrada de la salsa se oiga más grande. No
se hizo fundido cruzado (las dos canciones sonando a la vez): tonalidad y tempo
distintos se ensucian entre sí.

Lo que cuesta: la primera nota (0,45 s). Es una nota del mismo ostinato que
suena cada segundo; el oído no la echa de menos.

## Por qué 0,25 s (El Preso)

La canción es silencio digital hasta 0,25 s y el primer golpe entra en ~0,27 s.
Entrando justo antes, **el golpe abre la rumba** sin rampa de volumen (una rampa
se comería el ataque), y coincide con la novia levantando el cuchillo del pastel. No se buscó «el mejor minuto» porque no se puede medir:
la energía es **plana** toda la canción (entre −8 y −12,5 dB por segundo, master muy
comprimido), y el arranque es la parte que la gente reconoce. El final del MP3
no es un cierre musical (cae de −10 a −76 dB en un segundo: es el fade del
vídeo subido), así que tampoco había un final natural que aprovechar: la pieza
cierra con un fader de 3 s.

## Sonoridad

| stem | origen | ganancia | resultado |
|---|---|---|---|
| Turning Page (78 s) | −15,72 LUFS · −0,73 dBTP | −0,77 dB | **−16,49 LUFS · −1,50 dBTP** |
| El Preso (42 s) | −9,49 LUFS · **+0,43 dBTP** | −4,51 dB | **−14,00 LUFS · −4,08 dBTP** |

La balada no se sube a −14: el techo de pico lo impide sin comprimir un piano,
y un loudnorm dinámico sobre un piano bombea. Los ~2,5 LU de diferencia hacen que
la entrada de la rumba **suene** a que empieza la fiesta, que es lo que tiene
que pasar en el f2340.

## Los golpes (`golpes-011.json`)

Subida de energía por bandas (`astats` cada 10 ms: completa + <1200 Hz para el
piano; <160 Hz + >3000 Hz para la salsa), contra el máximo de los 30 ms previos.
Tiempos **ya en segundos de vídeo** con los `desde` de arriba. El tempo de El
Preso se ajustó por tramos de 20 s (104,1 · 105,0 · 104,5 BPM): una rejilla fija
se desplaza más de 0,1 s en 20 s, y por eso los cortes van a golpes medidos.
