# 032 · Casa Campestre Guarne (V16) — registro de versiones y «cómo cambiar cada pieza»

Worktree `.claude/worktrees/luxury-property-cinematic-reel-49ba5c`, rama `claude/luxury-property-cinematic-reel-49ba5c`, SIN commit (el usuario pidió no hacer commit ni push sin pedirlo). Reservada en `archivos/musica/registro-de-uso.md` como **V16** (reserva sin publicar: el registro de este worktree se copió del de la V15, que es el más reciente). Códigos del material (DR · HK · RC · MD · CT): la sección 5 del registro. La V13 (029) es el primer reel de esta casa: no comparten ni un segundo de metraje (la puerta, 7b).

## Versiones

| Rev. | Fecha | Qué | Estado |
|---|---|---|---|
| **0** | 2026-10-08 | Estructura del canal, hilo de la familia de tres generaciones: **DR78** · HK02 · RC27 · RC24 · RC18 · MD01 · RC08 · RC09 · RC14 · RC23 · CT04 · *We Are* desde 95,218 s · 1140 f · 38,0 s | **final exportada el 2026-10-11** («renderiza el final en buena calidad») — prueba en `pruebas-720p/032-recorrido.mp4` |

## La final (2026-10-11, por orden del usuario: «renderiza el final en buena calidad»)

| Archivo | Qué | Tamaño |
|---|---|---|
| `finales/032-recorrido.mp4` | máster: CRF 12 `slower`, 1080×1920, 30 fps, BT.709 limitado, AAC 320 kbps | 125 MB |
| `finales/032-recorrido-crf16.mp4` | versión ligera: CRF 16 `slow`, el mismo plan y el mismo audio | 72 MB |
| `finales/032.srt` | los captions de la plataforma (9 líneas, 3,7-35,5 s) | |
| `finales/032-portada.png` | la portada 9:16 (`portada-luxur`): el dron sobre la fachada a 0,7 s (el fotograma más nítido del tramo), «GUARNE · VENTA»; contraste 7,4:1 el texto y 12,5:1 el isotipo; receta en `portada.json` | |
| `finales/audio-032.wav` | el audio del plan renderizado (la mezcla de las dos finales sale de aquí) | 7 MB |

Entregada el 2026-10-11 en la carpeta de publicación de la casa: `…/Casa Campestre - Duglas Yovana/Videos Social/032-recorrido.mp4` (el máster) y `Videos Social/Portadas/032-portada.png`, comprobadas byte a byte. Su portada (la fachada de cerca) no repite el plano de las de la 036 y la 038 (la casa en su cerro, de lejos).

Cómo se hizo: UN paquete (`npx remotion bundle`, 359 MB, borrado al acabar: el disco estaba al 99 %) y desde él dos renders de imagen sin audio (`--color-space=bt709 --image-format=png --gl=angle --muted`) y uno de audio (`--codec=wav`); el WAV se mezcla con cada imagen SIN recodificarla (`-c:v copy`), con `h264_metadata` + `+write_colr`. Comprobado: imagen decodificada idéntica al render (framemd5 de los 1140 fotogramas), átomo `colr` nclx 1/1/1 y VUI 1/1/1, audio a 0 muestras del WAV (residuo −45,5 dB, el del AAC), el mismo PCM en las dos finales, −15,2 LUFS y −4,0 dBTP, color medio ≤ 0,44 niveles del still a escala 1 en el máster (≤ 0,62 en el CRF 16; baja frecuencia 52,0 y 49,9 dB de media). El dron (DJI, 29,97 fps) repite un fotograma en 16,67 s del clip: fuera del tramo usado (7,8-11,4 s), que no tiene ninguna parada. La puerta `--final` pasa (ningún «por confirmar»).

## Qué hay en cada pieza

| Pieza | Elegida | Alternativas ya miradas |
|---|---|---|
| Dron (sin voz ni texto, 3,6 s) | **DR78** `…173436_0078_D`, 7,8-11,4 s: el dron pasa en lateral por la fachada, del muro de piedra con los papiros a la terraza; ventana a mano en 0,62; movimiento uniforme (dispersión 0,05) | DR78 12,5-16,2 s (la terraza con el jacuzzi y el garaje, más vistoso, pero con las placas de la camioneta y del Mini a la vista) · DR79 (la casa en ángulo desde abajo, con los coches) · DR71/DR72 (los de la V13) |
| Hook | **HK02** «Tus hijos merecen crecer con montañas, no con tráfico.» (1080p; Isabella pequeña, de cuerpo entero; un destello del sol a su izquierda) | HK08 «El error que cometen las familias…» (4K, pasa el 0,55, pero su hilo no: MD10 y los CTA de «el error» fallan) · HK06/HK07 «¿Extrañas Colombia?…» (diáspora: «Extrañas» 0,08-0,21) · `IMG_9420`/`9422` «Colombia te llama…» (nuevas en `5 Cta`, sin código: «llama» 0,48-0,50) |
| Recorrido 1 | RC27 jardín → RC24 comedor → RC18 terraza con el valle | RC01 (Isabella entra caminando en la sala por la puerta de vidrio: sería una cuarta aparición suya, se descartó), RC22 (otra vista de la terraza), RC17 (la sala con la tele encendida) |
| Mitad | **MD01** «La abuela también puede disfrutar de esta casa.» (4K cerrado al 64 %) | MD05 «Hijos, abuelos, amigos…» («Hijos» 0,35), MD08/MD09 «Jacuzzi, asado…» (whisper oye «ha dado» con confianza alta: la palabra que se pintaría no es la que oye) |
| Recorrido 2 | RC08 sillón junto al ventanal → RC09 cama → RC14 lavamanos de cobre → RC23 mirador con el telescopio (la vista, 4,2 s) | RC21 (el valle desde la terraza, sin objetos), RC13 (vestier → baño), RC06 (claraboya y vestier) |
| CTA | **CT04** «Solicita tu recorrido virtual o presencial.» (1080p; parqueadero: el Mini queda fuera de la ventana) | CT18/CT19 «Volver no es una idea, es una dirección…» («Haz» 0,54 y «agendemos» 0,49; el CTA de la diáspora) · CT09/CT13/CT17 «Una casa donde todos caben cómodos…» («cómodos» 0,45-0,51, «agendemos» 0,05-0,31) · CT02 «Agenda tu visita y trae a tu familia» («Agenda» 0,47) |
| Canción | *We Are* (Aleksey Chistilin) desde 95,218 s | `buscar-entrada.py --cta 29 35`: *Begin Again* (144,743 s), *Softly* (69,644 s; poco golpe para cortar), *Tony Anderson – Dreamlife* (52,737 s), *Children* (184,329 s) |

## Cómo cambiar cada pieza

- **El dron**: copia el DJI a `proyectos/032/original/`, su sha en `MATERIAL` de `normalizar.mjs` (clase `dron`), su ventana en `MANUAL` de `herramientas/encuadre.py` (mira el 16:9 entero con `ventanas` de prueba) y `uv run proyectos/032/herramientas/encuadre.py` + `node proyectos/032/normalizar.mjs`; elige un tramo de movimiento uniforme con `herramientas/ventanas-uniformes.py 110 drNN`; en `metraje-032.ts`, `src`, `desde` (segundos) y `color`.
- **Otra frase de Isabella**: copia la toma, sha en `MATERIAL`, `VENTANA_VOZ` y `GANANCIA_VOZ_DB` en `normalizar.mjs` (`limites-voz.py` + `envolvente-voz.py`; la ganancia con `probar-voz.py --umbral 0.0316 --razon 3.5`), Vision (`seguir-sujeto.swift` sobre fotogramas a 5 f/s → `medidas/`), `desde`/`dur`/`en` de ese plano y de los siguientes, `voz.s0/s1`, su guion marcado (`voz/<toma>.txt`), `trozos-editoriales.mjs` y cada línea a su palabra con `palabras-desde.py` + `onsets-voz.py`.
- **Un plano de recorrido**: `src`, `desde`, `color` (mirando su ÚLTIMO fotograma) y su `en`/`dur` con el corte sobre un golpe fuerte (`musica/golpes-032.json`; la puerta lo comprueba y `golpes-render.py` lo confirma sobre el render). Después, `medir-color.py` sobre los empalmes.
- **Otra canción**: `INICIO_MUSICA`, `LUFS_MESETA`, `LUFS_LECHO` y `ALTOS` en `audio-032.ts`, `MUSICA` en `normalizar.mjs` y `golpes-032.json` (`medir-pista.py --json`). Los cortes secos se mueven a SUS golpes.
- **Sin música** (para poner un audio en tendencia al publicar): `HAY_MUSICA = false`.
- **Más o menos color**: `COLOR_BASE` y el `color()` de cada plano en `metraje-032.ts`; se mide con `stills-multiples.mjs … angle` + `stills-antes.mjs` + `medir-color.py` + `antes-despues.py`.

## Lo que queda por confirmar

1. La canción: medida, no oída; licencia no verificada.
2. Las palabras, medidas y no oídas (todas ≥ 0,55; la más justa, «con tráfico», 0,56-0,58).
3. La nitidez del hook y del CTA (1080p, ×2,13).
