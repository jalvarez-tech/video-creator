# 📓 diseno-sonoro — cuaderno del estudio (no va al producto)

> Lo que la skill decía de los proyectos del dueño y ya no dice, porque el producto se escribe neutro. Ninguna nota cambia una regla: son el **precedente**. Este archivo está en `.gitignore` (`**/ESTUDIO*.md`).
> Guarda lo que `SKILL.md` y el recetario decían del banco privado `sonido/` y de
> los proyectos del dueño. El producto trae un set SINTETIZADO con los mismos
> nombres (`manuales/diseno-sonoro/sfx-base/`); el estudio sigue sonando con los
> archivos del banco, que no se redistribuyen.

## El banco `sonido/`

- 1.231 archivos (Mixkit, Pixabay, memes…), no redistribuibles. Índice:
  `sonido/MAPA-SONIDOS.md`. Procedencia de los 55 del set: `sonido/ORIGEN-SFX.md`
  (antes en `remotion/public/sfx/README.md`).
- Carpetas por familia que citaban las skills: 01-AGUA, 03-ANIMACION LOGO,
  05-BOOM, 06-CAÍDAS Y GOLPES (madera → golpe seco apagado), 07-CAMARA,
  09-CINEMATICA RISER, 10-CLICK, 12-DATA, 13-DINERO, 14-DING, 15-ELECTRICO,
  16-ERROR, 19-EXTRAS (wind, UI, glitter, spring, «Disco rayado» para el record
  scratch), 21-FUNNY, 22-GLITCH, 24-LIQUIDO, 26-METAL SLICE, 27-MONEDA, 28-PAPEL,
  29-POP, 31-RISER, 32-SWOSH, 33/34 (suspenso), 36-WHOOSH, 37-OTROS. Foley:
  28-PAPEL, 26-METAL SLICE, 24-LIQUIDO, 07-CAMARA, 10-CLICK (teclado), 19/37
  (teclado, cristal). Ambientes: 01-AGUA, 19-EXTRAS (wind), 33/34.
- Decenas por familia para ampliar pools: 84 whooshes, 68 glitches, 63 metal
  slices, 17 pops.
- La columna `cat` del mapa `SFX` en `cues.ts` nombra la carpeta del banco de
  cada variante.
- Cómo se llenaba `remotion/public/sfx/`: `manuales/diseno-sonoro/copiar-sfx.sh`
  (bash, 55 líneas `copiar "<ruta en sonido/>" "<nombre estándar>"`, y al final
  medía el pico con ffmpeg y sugería el `vol`). Ahora: `sonido/mapa-sfx.json`
  (55 entradas con `origen`, `destino`, `sha256`) +
  `node manuales/diseno-sonoro/scripts/sfx.mjs desde-banco sonido/mapa-sfx.json`,
  que deja `remotion/public/sfx/.origen.json` con `modo: "banco"` para que
  `sintetizar` no pise los archivos del banco.

## Golpes medidos en los archivos del banco (R26)

- Medido en el 014 con `medir-sfx.py` (30 fps): `pop.mp3` golpe en f17 (0,57 s),
  `chime-02.mp3` f25, `click-mouse-02/03.mp3` f31, `whoosh-light-02.wav` f34.
  Un `pop` de 8 frames reproducía SILENCIO y se cortaba antes del golpe; `pop`
  nunca sonó en 001-013 (medido 2026-09-17).
- Tabla `PICO` completa (frame del golpe, fin audible, RMS de 33 ms) en
  `remotion/src/proyectos/014/cues-014.ts`: whoosh-light 14/22 · whoosh-light-02
  34/46 · whoosh-light-03 3/4 · swoosh 17/30 · swoosh-02 18/24 · swoosh-03 12/15
  · pop 17/20 · pop-02 4/6 · pop-03 4/4 · chime 10/29 · chime-02 25/41 ·
  click-mouse 2/5 · click-mouse-02 31/34 · click-mouse-03 31/34 · ui 2/3.
- En milisegundos (2026-09-17): `impact-deep` audible a 1158 ms y pico a 2184 ms
  · `metal` 1199-1288 ms · `notification` 1125 ms · `click-pen` 609 ms ·
  `click-camera` 607 ms · `boing` 1780 ms · `chime-03` 2809 ms.
- El patrón del 014 (`cues-014.ts`): tabla `PICO` + builder `sfx()` sobre
  `cue()` que escribe `startFrame = target − pico` y `durationInFrames ≥ fin +
  COLA` con `fadeOutFrames`; nivel por RMS medido relativo a la voz de la pieza;
  verificación rindiendo la pista de SFX sola a WAV (`--codec=wav`).
- Pendiente del motor: guardar `pico` y RMS de los archivos en `SFX`/`POOL` para
  que `startFromTarget` los use. Mueve el audio de todas las piezas publicadas:
  se decide oyendo, no por defecto.

## Ejemplos que eran del 001

- Los `reason` del ejemplo de `SKILL.md` §11: «Se pulsa el botón Seguir» y
  «Confirmación «Siguiendo ✓»» (el CTA del 001).
- El cue track de `referencia.md` §17.1 de motion-graphics (13 cues sobre
  `MotionGraphicsFull`, 25 fps) está guardado en
  `manuales/motion-graphics/ESTUDIO.md`.
