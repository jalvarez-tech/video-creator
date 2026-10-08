# 029 · Casa Campestre Guarne — registro de versiones y «cómo cambiar cada pieza»

Rama `feat/reel-029-casa-campestre` (worktree `.claude/worktrees/reel-029-casa-campestre`). Reservada en `archivos/musica/registro-de-uso.md` como **V13**.

## Versiones

| Rev. | Fecha | Qué | Estado |
|---|---|---|---|
| 0 | 2026-10-08 | Primera prueba: apertura muda a cámara lenta · CT14 · CT07 · CT01 · CT09 · CT16 · CT18 · *Pictures from the Past* · 783 f · 26,1 s · −15,6 LUFS | **en prueba** (`pruebas-720p/029-recorrido.mp4`, 540×960) — espera el OK del usuario; sin final |

## Qué hay en cada pieza

| Pieza | Elegida | Alternativas ya medidas |
|---|---|---|
| Apertura (muda, ×0,5) | CT05 `IMG_9426` 0-1 s (ella llega por el camino; habla desde 0,98 s) | CT06 `IMG_9427` (empieza a hablar en 0,17 s: no sirve muda) |
| Hook | CT14 «La infancia pasa rápido» | — (es la única toma con esa frase) |
| Promesa | CT07 «Tu familia merece respirar distinto» | — |
| Lo que lo hace posible | CT01 «Diseño moderno, naturaleza y privacidad» | CT02 «Agenda tu visita y trae a tu familia» (un CTA) |
| Cómo se vive | CT09 «Una casa donde todos caben cómodos» (sala de la tele) | CT17 `IMG_9525` (alcoba, sillón junto al ventanal; empieza a hablar en 0,0 s), CT13 (comedor, ella lejos) |
| Lo que vale | CT16 «Esta no es solo una casa, es patrimonio» | CT15 `IMG_9523` (mismo sitio y frase; whisper oye «solo» aquí) |
| CTA | CT18 `IMG_9531` («Volver no es una idea, es una dirección. Haz clic… Puede ser virtual o presencial») | CT19 `IMG_9532` (misma toma, otro intento; whisper oye «asquíquen el enlace») |
| Canción | *Pictures from the Past* desde 57,026 s | `buscar-entrada.py --cta 17 23` sobre 12 libres: *We Are* (105,112 s, caída de 13,6 dB), *Utopia* (150,784 s), *Silver Skies Cinematic Piano* (56,868 s), *Einaudi Fly* (244,548 s), *Children* (189,284 s, caída de 22 dB) |

## Cómo cambiar cada pieza

- **Otra frase en un plano**: copia la toma a `proyectos/029/original/` (con su sha en `MATERIAL` de `normalizar.mjs`), `uv run proyectos/029/herramientas/encuadre.py` tras medirla con Vision (`seguir-sujeto.swift` sobre fotogramas a 5 fps), mide `limites-voz.py` + `envolvente-voz.py`, añade su ganancia (`probar-voz.py`) y su ventana (`VENTANA_VOZ`) y recalcula `desde`, `dur` y los `en` de los planos siguientes (hueco fijo de 24 f). Los subtítulos de esa toma se rehacen con `trozos-editoriales.mjs` y se llevan a su palabra con `palabras-desde.py` + `lineas-vs-onsets.py`.
- **Otra canción**: `INICIO_MUSICA`, `CAIDA_CANCION_S`, `LUFS_MESETA` en `audio-029.ts`, `MUSICA` en `normalizar.mjs` y `proyectos/029/musica/golpes-029.json` (`medir-pista.py --json`). La puerta (sección 4) comprueba que cae el golpe en el frame 0-2 y que ningún golpe fuerte suena tras la última palabra.
- **Sin música** (para poner un audio en tendencia al publicar): `HAY_MUSICA = false`.
- **Más o menos color**: `COLOR_BASE` y el `color()` de cada plano en `metraje-029.ts`; se mide con `stills-multiples.mjs … angle` + `stills-antes.mjs` + `medir-color.py` + `antes-despues.py`.
- **Voz más o menos fuerte**: `GANANCIA_VOZ_DB` en `normalizar.mjs` (cada una se busca con `probar-voz.py` hasta −15,0 LUFS); la puerta exige −15 ± 0,6 LUFS y pico ≤ −1 dBTP.

## Lo que queda por confirmar

1. «solo» (e01) al oído — la nota «POR CONFIRMAR AL OÍDO» está en `subtitulos-029.ts` y `--final` falla mientras esté.
2. La canción: medida, no oída; licencia no verificada.
3. La calidad de los tres planos que salen de un 1080p (apertura, CT01, CT18): suben ×2,13 al cuadro.
