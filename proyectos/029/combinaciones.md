# 029 · Casa Campestre Guarne — registro de versiones y «cómo cambiar cada pieza»

Rama `feat/reel-029-casa-campestre` (worktree `.claude/worktrees/reel-029-casa-campestre`). Reservada en `archivos/musica/registro-de-uso.md` como **V13**. Códigos del material (DR · HK · RC · MD · CT): la misma sección 5 del registro.

## Versiones

| Rev. | Fecha | Qué | Estado |
|---|---|---|---|
| 0 | 2026-10-08 | Montaje de las 19 tomas de `5 Cta`: apertura muda a cámara lenta · CT14 · CT07 · CT01 · CT09 · CT16 · CT18 · *Pictures from the Past* desde 57,056 s · 783 f · 26,1 s. Seis frases de Isabella en 26 s | **descartada por el usuario** («tiene muchos diálogos, recuerda la estructura: dron, hook, recorrido, mitad, recorrido y CTA»); prueba en `pruebas-720p/029-recorrido-rev0.mp4`, plan en el commit `1d79608` |
| 1a | 2026-10-08 | Estructura del canal, hilo de la familia: **DR71** · HK04 · RC25 · RC16 · RC15 · MD04 · RC19 · RC03 · RC10 · RC12 · CT15 · *Pictures from the Past* desde 45,30 s · 1137 f · 37,9 s | sustituida: «cambia la toma del dron»; prueba en `pruebas-720p/029-recorrido-rev1a.mp4` |
| **1** | 2026-10-08 | Igual, con **DR72** (el dron se acerca a la casa) en lugar de DR71 (la fachada alejándose), el recorrido 2 en cuatro planos (la terraza acababa dentro de una palmera oscura y el corte al baño saltaba +44 niveles de luma: se acortó y se añadió la ventana RC10), el color equilibrado entre planos (σ de luma 17,4 → 12,2) y la música igualada entre recorridos (−15,2 LUFS en toda la pieza) | **en prueba** (`pruebas-720p/029-recorrido.mp4`, 540×960) — espera el OK del usuario; sin final |

## Qué hay en cada pieza

| Pieza | Elegida | Alternativas ya miradas |
|---|---|---|
| Dron (sin voz ni texto, 3,3 s) | **DR72** `…173106_0072_D`, sus últimos 3,3 s: el dron se acerca y llega a la terraza y al garaje; ventana a mano en 0,60 | DR71 (la fachada de frente, alejándose: la rev. 1a), DR78 (trucking lateral por la fachada: del volumen izquierdo a la terraza), DR79 (la casa en ángulo, desde abajo, con los coches), DR73 (se acerca desde lejos, la casa casi todo el vuelo muy pequeña) |
| Hook | **HK04** «La casa que tu familia va a recordar siempre» (1080p, ella pequeña) | HK02 «Tus hijos merecen crecer con montañas, no con tráfico» · HK08 «El error que cometen las familias…» (4K) · hilo de la diáspora: HK06/HK07 «¿Extrañas Colombia? Esta es la razón para regresar» |
| Recorrido 1 | RC25 sala → RC16 comedor → RC15 cocina | RC18 terraza con palmera, RC22 terraza con sillones, RC23 telescopio al atardecer (cielo naranja) |
| Mitad | **MD04** «Pregúntate algo. ¿Qué recuerdos de infancia les estamos dando?» (4K cerrado al 62 %) | MD03 (misma frase, 0,74 s de silencio al arrancar), MD01 «La abuela también puede disfrutar…», MD05, hilo de la diáspora: MD06 |
| Recorrido 2 | RC19 terraza (jacuzzi) → RC03 baño → RC10 ventana y cortina → RC12 alcoba | RC07 alcoba con tele apagada, RC23 telescopio, RC21 valle |
| CTA | **CT15** «Esta no es solo una casa, es patrimonio. Haz clic en el enlace y agendemos tu visita.» | CT18 «Volver no es una idea, es una dirección. Haz clic…» (jardín al atardecer; encaja con la diáspora) |
| Canción | *Pictures from the Past* desde 45,30 s | `buscar-entrada.py --cta 29 35`: *We Are* (95,248 s), *Utopia* (139,794 s, caída de 20,7 dB), *Silver Skies Cinematic Piano* (46,648 s), *Children* (175,883 s, caída de 17 dB) |

## Cómo cambiar cada pieza

- **El dron** (lo que pidió el usuario el 2026-10-08): copia el DJI a `proyectos/029/original/` y apunta su sha en `MATERIAL` de `normalizar.mjs` (clase `dron`, salida `drNN`); añade su ventana a `MANUAL` de `encuadre.py` (mira el clip con cuatro ventanas de prueba, centros 0,50 · 0,58 · 0,66 · 0,74…) y ejecuta `uv run proyectos/029/herramientas/encuadre.py` y `node proyectos/029/normalizar.mjs`; en `metraje-029.ts`, `src`, `desde` (en frames de la fuente; si es un acercamiento, `duración − 100/30` s para usar sus últimos 3,3 s) y el `color` (se mide). Solo se rehace un vídeo.
- **Otra frase en un plano de Isabella** (hook, mitad, CTA): copia la toma, sha en `MATERIAL`, `VENTANA_VOZ` y `GANANCIA_VOZ_DB` en `normalizar.mjs` (mide con `limites-voz.py` + `envolvente-voz.py` y busca la ganancia con `probar-voz.py`), Vision para su ventana (`seguir-sujeto.swift` sobre fotogramas a 5 f/s → `medidas/`), `desde`/`dur`/`en` de ese plano y de los siguientes, `voz.s0/s1`, su guion marcado (`voz/<toma>.txt`), `trozos-editoriales.mjs` y lleva cada línea a su palabra con `palabras-desde.py` + `lineas-vs-onsets.py`.
- **Un plano de recorrido**: `src`, `desde`, `color` (mirando el último fotograma: que no entre una palmera ni una tele), y su `en`/`dur` con el corte sobre un golpe fuerte de la canción (`proyectos/029/musica/golpes-029.json`; la puerta lo comprueba y `golpes-render.py` lo confirma sobre el render).
- **Otra canción**: `INICIO_MUSICA`, `CAIDA_S`, `LUFS_MESETA` en `audio-029.ts`, `MUSICA` en `normalizar.mjs` y `golpes-029.json` (`medir-pista.py --json`). Con otra canción los cortes secos se mueven a SUS golpes.
- **Sin música** (para poner un audio en tendencia al publicar): `HAY_MUSICA = false`.
- **Más o menos color**: `COLOR_BASE` y el `color()` de cada plano en `metraje-029.ts`; se mide con `stills-multiples.mjs … angle` + `stills-antes.mjs` + `medir-color.py` + `antes-despues.py`.

## Lo que queda por confirmar

1. «solo» (c01 de los subtítulos) al oído — la nota «POR CONFIRMAR AL OÍDO» está en `subtitulos-029.ts` y `--final` falla mientras esté.
2. La canción: medida, no oída; licencia no verificada.
3. La nitidez de los dos planos que salen de un 1080p (el hook y el baño: ×2,13 al cuadro).
