# 03 · Timeline — proyecto 009 · Street Cats

> Paso 3 de 3. Viene de [02-layout.md](02-layout.md). De aquí sale el código:
> `metraje-009.ts` · `graficos-009.ts` · `cues-009.ts` · `Reel009.tsx`.

**1080×1920 · 30 fps · 942 f (31,44 s medidos en el render).**
Todos los frames son ABSOLUTOS a 30 fps. Los `desde` son SEGUNDOS del clip
fuente, porque los cinco vienen a tres fps distintos (23,976 · 25 · 29,97).

## La tabla

| f | s | narrativa | plano (desde) | zoom · pan | gráfico | sonido |
|---|---|---|---|---|---|---|
| 0 | 0,0 | **gancho** | papas-vuelan (0,9) | 1,16→1,02 | — | **impact deep** ← el golpe de apertura |
| 4 | 0,1 | | | | «TE RETO» | whoosh swoosh-hero |
| 22 | 0,7 | | | | +«a ver esto sin antojarte» | click ui |
| 84 | 2,8 | demostración | alitas (0,5) | 1,34→1,42 · 9 | «ALITAS **AL CARBÓN**» | whoosh whip |
| 156 | 5,2 | demostración | grill (1,2) | **1,60→1,72 · 28** | «HECHAS AL MOMENTO» | whoosh light |
| 222 | 7,4 | mecanismo | emplatado (0,5) | 1,08→1,18 | «**PAPAS** RECIÉN HECHAS» | whoosh whip |
| 288 | 9,6 | mecanismo | salsa (0,3) | 1,16→1,04 | «AHOGADAS EN SALSA» | whoosh light + **salsa** (diegético) |
| 354 | 11,8 | explicación | alitas (4,8) | 1,42→1,34 · 9 | «CRUJIENTES POR FUERA» | whoosh light |
| 414 | 13,8 | explicación | grill (4,2) | **1,78→1,66 · 32** | «JUGOSAS POR DENTRO» | whoosh light |
| 474 | 15,8 | explicación | emplatado (4,4) | 1,06→1,16 · 4 | «PORCIONES **QUE SÍ LLENAN**» | whoosh light |
| 510 | 17,0 | | | | | **riser low-rumble** (termina en 534) |
| 534 | 17,8 | **clímax** | salsa (2,6) · *flash* | 1,02→1,14 | «¿YA TE **ANTOJASTE?**» | **impact sharp** + salsa + **crujido** (f560) |
| 630 | 21,0 | **revelación** | grill (7,2) · *flash* | 1,60→1,48 · 22 | **pantalla**: STREET CATS | **impact deep** ← el último |
| 726 | 24,2 | **cta** | salsa (0,6) | 1,02→1,16 | **pantalla**: dirección | whoosh swoosh |
| 778 | 25,9 | | | | +chip «TAMBIÉN A DOMICILIO» | impact pop |
| 816 | 27,2 | | | | +«@streetcats.food» | click ui |
| 858–942 | 28,6–31,4 | | | | *(la tarjeta, quieta)* | **silencio** |

## Las tres reglas de ritmo que ordenan la tabla

1. **El corte acelera y luego frena.** 84 · 72 · 66 · 66 · 66 · 60 · 60 · 60 f
   (de 2,8 s a 2,0 s) y después 96 · 96 · 216. La acelerada es la que produce el
   antojo; el frenazo es lo que deja leer la dirección.
2. **Tres impactos y ni uno más** — apertura (f0), clímax (f534), nombre (f630).
   Con un cuarto, ninguno significaría nada. Los once cortes NO llevan un sonido
   cada uno: los intermedios llevan whoosh de tránsito con la variante rotada
   del POOL para que seis cortes seguidos no suenen al mismo archivo.
3. **Un sonido solo entra si algo en pantalla lo produce.** Es la regla que
   gobierna la capa diegética entera (ver abajo): la salsa suena porque se ve
   caer, el crujido suena una vez y solo una. Nada de ambiente decorativo.

## La segunda capa de audio: la CAMA DE SABOR

Añadida después del primer montaje. Son dos capas con trabajos opuestos:

| capa | archivo | qué dice | ejemplo |
|---|---|---|---|
| estructural | `cues-009.ts` | «aquí hay un corte» | impact, whoosh, riser |
| **diegética** | `sabor-009.ts` | «esto está chisporroteando» | fritura, brasa, salsa, crujido |

**El antojo lo produce la segunda.** Seis efectos generados con ElevenLabs
(`sound-generation`), normalizados por `proyectos/009/sabor/normalizar.py`.

Arquitectura: **una cama continua + acentos**, no un ambiente por corte. El
suelo es una freidora que no para (f0-f660, se apaga durante la revelación) y
encima entran la brasa cuando hay alitas y la plancha cuando hay plancha. Los
9,4 s del CTA van **sin cama**: una dirección se lee mejor en silencio.

| f | golpe diegético |
|---|---|
| 4 | las papas caen de la canastilla (sostiene el hook) |
| 224 · 476 | la espátula suelta las papas en la bandeja |
| 290 · 536 | la salsa cayendo — sustituye la textura `liquid` de catálogo |
| 560 | **el único mordisco del vídeo**, dentro de «¿YA TE ANTOJASTE?» |

## Mezcla — medida, no estimada

| | antes de la cama | **entregado** |
|---|---|---|
| sonoridad integrada | −22,4 LUFS | **−19,98 LUFS** |
| pico real | **+0,44 dBTP** ⚠️ clipeaba | **−3,66 dBTP** |
| media RMS | −40,1 dB | −30 dB |

Deja ~6 dB bajo el estándar social (−14 LUFS): es el hueco para el audio de
tendencia que el cliente pone al publicar.

### Tres errores de mezcla que solo aparecieron midiendo

1. **La mezcla clipeaba a +1,0 dBTP.** Puse `ganancia: 1.5` a la salsa para
   compensar que se había quedado 4 dB por debajo de su objetivo de LUFS. Error
   de razonamiento: su LRA es 18,9, o sea que su media es baja **porque** sus
   picos son altos y aislados. Un déficit de sonoridad media no se arregla
   subiendo el pico.
2. **Las camas no admitían ganancia.** Normalizadas como los golpes (−27 LUFS,
   lineal), un chisporroteo llega a −3 dBTP de pico: no aguantaba ni 3 dB más y
   la mezcla se quedaba clavada en −23 LUFS. Se re-normalizaron en modo
   **dinámico** (limitador), que en una cama continua no se oye — y en los
   golpes se mantuvo lineal, porque comprimir el crujido le quita el ataque.
3. **Tres cues estaban MUDOS.** Ver abajo: es el hallazgo grande.

## ⚠️ El silencio de cabeza — un fallo del motor, no del proyecto

`startFromTarget()` (motor/sound/cues.ts) da por hecho que el sonido empieza en
el frame 0 de su archivo. Los archivos del banco **no cumplen eso**:

| archivo | silencio antes del ataque |
|---|---|
| `impact-deep.mp3` | 1,73 s = **52 f** |
| `whoosh-swoosh-07.wav` | 1,06 s = 32 f |
| `whoosh-light-02.wav` | 0,90 s = 27 f |
| `riser-low.mp3` | 0,65 s = 20 f |
| `pop.mp3` | 0,59 s = 18 f |

**Consecuencia en este reel:** un cue de `deep` con 18 frames de duración
reproducía 18 frames de un archivo cuyo golpe está en el 52 — o sea SILENCIO. Y
eran el golpe de apertura (f0) y la revelación de la marca (f630), los dos
sonidos más importantes de la pieza. El `pop` del CTA hacía lo mismo. **Ninguno
daba error**: el cue existía, el volumen era correcto, el archivo sonaba solo.

Medido antes y después, en RMS del segundo que los contiene:

| cue | antes | después |
|---|---|---|
| `s-golpe` (f0) | −32,0 dB | **−23,4 dB** |
| `s-marca` (f630) | −42,6 dB | **−25,3 dB** |
| `s-domi` (f778) | **−99 dB (silencio digital)** | **−32,4 dB** |

Lo corrige `cueReal()` en `cues-009.ts`, indexando el ataque **por archivo** y
no por variante: con `variantIndex` una misma variante resuelve a archivos
distintos del POOL, y las tres alternas de `light` van de 3 a 27 frames.

**No se arregló en el motor a propósito:** tocar `startFromTarget` movería el
audio de 001-008, que ya están publicados. Es una decisión de dirección que se
toma escuchando esas piezas.

## Lo que se corrigió MIRANDO frames (R05), no planificando

Tres cosas que el plan daba por buenas y el render desmintió. Quedan escritas
porque son el argumento de por qué existe la puerta de frames:

1. **El plano del grill era una pierna.** En su encuadre original la comida
   ocupa una banda al 76 % del alto y los dos tercios de arriba son un pantalón
   vaquero desenfocado; con el punch-in suave que tenía (1,02) el plano MÁS
   REPETIDO del vídeo (3 de 11 cortes) se leía azul y vacío. Se rescató con
   zoom 1,60-1,78 y `pan` 22-32 — y eso obligó a rehacer el archivo a 4K, porque
   a 1440 px de ancho ese punch era un reescalado de 1,27×.
2. **El velo de `pantalla` al 82 % mataba las dos últimas tomas.** Sumaba tres
   oscurecimientos con la viñeta del molde y la del metraje. Bajado a 72 %.
3. **El flash ámbar a 0,5 de alfa parecía un error de codificación.** Bajado a
   0,38 en 4 f.

## Grok pendiente (cuando haya crédito en xAI)

El encargo pedía escenas generadas y la API está sin créditos (01-plan §Grok).
Si se activa, estos son los huecos donde entrarían **sin tocar el resto**: son
un elemento nuevo en `metraje009` y correr los `en` siguientes.

| dónde | qué plano | por qué ahí |
|---|---|---|
| tras `c05` (f354) | macro de sal o especia cayendo a cámara lenta sobre la papa | textura pura entre dos planos de acción; no afirma ningún hecho |
| tras `c08` (f534) | papa girando en ingravidez sobre negro | plano IMPOSIBLE — el caso donde lo generativo es la herramienta correcta y el banco no llega |
| bajo `c10` (f630) | humo/brasa abstracta como cama del nombre | hoy lo hace el grill; un plano de brasa dedicado lo haría mejor |

⛔ **Lo que NO se generaría aunque hubiera crédito:** ninguna fachada, ningún
local, ningún empleado. Un plano generado de «la entrada de Street Cats» sería
fabricar un lugar que no existe — la frontera del 01-plan §Honestidad.
