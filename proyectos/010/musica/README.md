# 010 · Música

## ⚠ Lo primero: la procedencia no está resuelta

La cama sale de un archivo del disco del cliente:

```
~/Downloads/1 HORA MUSICA CRISTIANA -  INSTRUMENTAL PARA ORAR Y MEDITAR - A TUS PIES.mp3
```

Es una recopilación de una hora con nombre de subida de YouTube, y **no hay
constancia de licencia**. Instagram, TikTok y Facebook identifican música por
huella acústica, así que lo que puede pasar al publicar es: silenciado del audio
en algunos territorios, reparto de ingresos al titular, o retirada. Los tres
afectan a una pieza cuyo argumento es que la vean.

No es una razón para no usarla —eso lo decide el cliente, y aquí ya lo ha
decidido— pero sí es la clase de cosa que conviene saber ANTES de publicar y no
después. **Si aparece un reclamo, no hay que rehacer nada**: se sustituye el MP3
por otro con la misma duración y se re-renderiza; la envolvente no se toca.

Alternativas si se prefiere ir sobre seguro: la biblioteca de audio de la propia
Meta/TikTok (licenciada por la plataforma para uso orgánico), o una pista de
banco con licencia comercial. El único requisito técnico es que dure ≥ 74,47 s.

**No la he podido escuchar.** El título dice «INSTRUMENTAL» y la medición no
encuentra silencios ni cortes en el tramo, pero si lleva voz cantada en algún
punto, chocaría con la locución y eso solo se detecta oyéndolo.

## Cómo se hizo el stem

```bash
# 1 · extraer SIN resamplear, en PCM (entrada 1229 s = 20:29, ver abajo)
ffmpeg -ss 1229 -t 74.466667 -i "<origen>.mp3" -c:a pcm_s24le /tmp/m44.wav
# 2 · UN solo resample 44,1 → 48 k, con filtro largo
ffmpeg -i /tmp/m44.wav -af "aresample=48000:resampler=swr:filter_size=64:phase_shift=12" \
       -c:a pcm_s24le /tmp/m48.wav
# 3 · loudnorm de DOS pasadas a −15 LUFS → WAV, NO mp3
ffmpeg -i /tmp/m48.wav -af "loudnorm=I=-15:TP=-2:LRA=11:measured_*=…:linear=true,<resample>" \
       -ar 48000 -c:a pcm_s16le proyectos/010/musica/010-musica.wav
cp proyectos/010/musica/010-musica.wav remotion/public/choco-010/
```

Resultado: **74,466667 s** (exactamente los 2234 f de la comp) · **−14,95 LUFS** ·
true peak **−2,00 dBTP** · LRA 4,3.

### Por qué WAV y no MP3

Porque el origen **ya es** MP3. La primera versión de este stem hacía
`MP3 44,1 k → resample → MP3 192 k → AAC de Remotion → AAC de salida`: **tres
generaciones con pérdida** sobre una pista de piano y pads sostenidos, que es
justo el material donde el MP3 introduce pre-eco y difumina las colas. El
resultado suena difuso y «raro» sin que se pueda señalar qué falla.

Guardar el recorte en WAV quita una generación entera y no cuesta nada
—14 MB en una carpeta que ya está fuera de git—. Las que quedan (el origen, que
no se puede deshacer, y el AAC final) son inevitables.

> Este `ffmpeg` no trae `libsoxr`, así que el resample usa `swr` con
> `filter_size=64:phase_shift=12` en vez del filtro corto por defecto. Si algún
> día hay soxr, mejor `resampler=soxr:precision=28`.

### Comprobado: la cama NO va a otra velocidad

Se midió porque se sospechó de ello. Correlación de la envolvente de energía
(ventanas de 0,25 s) entre el stem y el mismo tramo del origen: **0,99 con
desplazamiento CERO**. Y sobre el vídeo ya renderizado, aislando los 2,2 s
finales en que la voz ha terminado y solo suena la cama: **0,92**, con 40 ms de
desfase que son granularidad de `seek` de MP3, no cambio de velocidad. Si el
stem fuera 44,1 k leído como 48 k iría un 8,8 % rápido y a los 74 s habría
**6 segundos** de deriva; no hay ninguna.

### Por qué 1229 y no 1230

El cliente pidió el minuto 20:30. Midiendo segundo a segundo entre 20:25 y
20:35, el punto **más tranquilo** es 1229 s (−23,8 dB de media, contra −17,5 en
1230): es un respiro entre frases musicales. Entrar ahí da una entrada natural
en vez de cortar a mitad de compás — y no quita nada de lo que el cliente
señaló, solo añade un segundo de aire antes.

```
1227 −20,7   1228 −22,5   1229 −23,8 ←   1230 −17,5   1231 −17,4
```

### Por qué −15 LUFS y no «que suene bien»

Porque así los números de la envolvente (`volumenMusica` en `Documental010.tsx`)
significan algo comprobable. Con la voz a −14 LUFS:

| ganancia | dB | música resultante | bajo la voz |
|---|---|---|---|
| 0,13 | −17,7 | ≈ −33 LUFS | 19 LU |
| 0,18 | −14,9 | ≈ −30 LUFS | 16 LU |
| 0,26 | −11,7 | ≈ −27 LUFS | 13 LU |

Si se cambia el MP3, **hay que normalizarlo al mismo −15 LUFS** o la envolvente
deja de querer decir esto.

## La cola: la pista tiene un valle y hay que acompañarlo

Medido sobre el stem: **−15,6 dB a los 60 s, −24 dB entre los 70 y los 72,
recupera a −16 a los 73**. Ese valle cae justo sobre los 2,4 s en que la voz ya
ha terminado y el rótulo de cierre se mantiene solo. Con la envolvente plana el
resultado era **−43 dB**: no se leía como final, se leía como que el vídeo se
había roto.

La envolvente sube a 0,33-0,35 ahí. **No es subir la música: es mantenerla en el
mismo sitio mientras la pista se hunde** — un fader acompañado en vez de plano.

La alternativa era mover la entrada a **21:09**, donde la cola de la pista viene
a −15,4 dB y no haría falta compensar nada. No se hizo porque el cliente eligió
el 20:30, y un valle se arregla con el fader. Si algún día se prefiere el otro
tramo, se cambia `ENTRADA` en la receta y se aplanan los tres puntos de la cola.

## La mezcla final, medida

| tramo | LUFS |
|---|---|
| voz + cama (2-5 s) | −15,8 |
| niños, la cama sube (20-24 s) | −13,4 |
| suelo «reconstruyendo» (46-49 s) | −13,4 |
| crescendo (62-65 s) | −14,1 |
| última frase (69,5-71,9 s) | −14,9 |
| **solo el rótulo, sin voz (72,4-74 s)** | **−26,3** |

Los 12 LU de diferencia del último tramo son la comprobación de que la música
está y no manda: durante la locución no mueve el medidor, y cuando la voz calla
aparece sola sin llegar a ser protagonista.

Pieza completa: **−14,1 LUFS · −1,1 dBTP** en el master y en la versión de
publicación.

> ⚠ Ojo al medir esto con `volumedetect`: da −37,7 dB para ese último tramo y
> engaña. A esos niveles el suelo del códec domina la media. Los LUFS por tramo
> (`loudnorm ... print_format=json` sobre un recorte) son lo que hay que mirar.

## El arco lo pone la envolvente, no la composición

El encargo pedía piano al principio, calidez en los niños y crescendo en el
pueblo unido. Un recorte de 74 s de una pista de una hora no hace eso solo; lo
hace `volumenMusica` subiendo y bajando sobre los mismos beats de la voz (entra
desde el silencio · sube en los niños · **suelo en «reconstruyendo sus hogares»**
· crescendo en «vamos a salir adelante» · a cero antes del último plano).

Conviene saber que es menos de lo que daría una composición a medida: aquí la
música **acompaña** la emoción, no la conduce. Si algún día la clave de
ElevenLabs recupera `music_generation`, el plan por secciones del 008
(`proyectos/008/musica/plan-composicion.json`) es el punto de partida.
