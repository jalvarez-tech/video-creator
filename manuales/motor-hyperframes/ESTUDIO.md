# 📓 motor-hyperframes — cuaderno del estudio (no va al producto)

> Lo que la skill decía de esta máquina y de los proyectos del dueño y ya no dice, porque el producto se escribe neutro. Ninguna nota cambia una regla: son el **precedente**. Este archivo está en `.gitignore` (`**/ESTUDIO*.md`).

## Verificación original

- Verificado ejecutando el CLI **v0.7.107** en este Mac el 2026-08-13: composición 9:16 propia → MP4 **1080×1920, 25 fps, 200 frames, 8,0 s**, con `data-fps` respetado sin pasar `--fps`, GSAP vendorizado (sin CDN) y **dos SFX del banco de `sonido/`** mezclados a AAC 48 kHz estéreo. Las cinco pasadas de `hyperframes check` en verde: lint, runtime, **9 muestras de layout** y **21/21 de contraste**. Sin API key y sin tocar servidores de HeyGen.
- Este Mac cumplía `hyperframes doctor` con Node 25, FFmpeg 8.1.2, Chrome y whisper-cpp; Kokoro y MusicGen en ✗.
- «6 workers a la vez» es lo medido aquí durante el render.
- Desde 2026-09-22 `render-hf.mjs` fija `hyperframes@0.8.47` (con `HYPERFRAMES_NO_UPDATE_CHECK=1` y `HYPERFRAMES_NO_AUTO_INSTALL=1`); los comandos de las skills citan esa versión. La verificación de arriba es de la 0.7.107: si `check` cambia de resultado con la 0.8.47, este es el motivo.
- Los ejemplos de la skill usaban el **008** (`nuevo-hf.mjs 008 --canal luxur`, `proyectos/008/hf/`, `p008`); en el producto son `001 --canal ejemplo` y `p001`. `nuevo-hf.mjs` tenía `luxur` como canal por defecto.

## El acento de marca y el contraste (decisión pendiente)

- `marca-a-css.mjs --acento-texto` nació porque la puerta de contraste midió el acento de **Propiedades Luxur** (`#FF5500`) sobre su papel (`#ECE8DF`) en **2.62:1**, por debajo del 3:1 de WCAG para texto grande. El script deriva `#eb4e00` para el segundo motor.
- **En Remotion sigue sin corregir a propósito**: cambiar `luxur.ts` movería el look de las piezas 004-007 ya renderizadas y publicadas (el acento es tinta de texto en las tomas `cifra` y en la primera barra de datos). Es una decisión de dirección del canal, no un olvido. Ver también la memoria `acento-luxur-contraste`.
- Con la marca de ejemplo del producto (`ejemplo.ts`, acento `#0E7C86`) el acento pasa el 3:1 sobre el mismo papel sin oscurecer.

## Lo que no se portó

- Las piezas 006 y 007 (planes nativos de noticias) siguen en Remotion: `/remotion-to-hyperframes` sería un porte manual y de una sola dirección.
- El emisor doble se estimó en ~4.900 líneas nuevas sin paridad de píxel (el 61 % del pipeline declarativo es dato puro).
- `render-hf.sh` (bash, 75 líneas, `export HYPERFRAMES_NO_TELEMETRY=1`) fue sustituido por `render-hf.mjs`.
