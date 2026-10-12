# 037 · Casa Campestre Guarne (V20) — registro de versiones y «cómo cambiar cada pieza»

Worktree `.claude/worktrees/reel-037-el-error`, rama `worktree-reel-037-el-error`, SIN commit (el usuario pidió no hacer commit ni push sin pedirlo). Reservada en `archivos/musica/registro-de-uso.md` como **V20** (reserva sin publicar; el registro de este worktree parte del último de la V19, el más completo, con mis filas añadidas; la V19 escribió además sus cambios DR73/DR79 en mi copia, que quedan como ella los dejó). Códigos del material: la sección 5 del registro. Quinto reel de la casa: la V13 (029), la V16 (032) y la V17 (033) no comparten con esta ni un clip (la puerta, 7b, carga sus tres planes y falla si se repite uno); la V19 (036, otra sesión) tampoco, comprobado contra su plan real y contra lo que tiene reservado (7c); la V21 (038) tampoco (sus clips: DR73, DR77, HK03, MD05, CT06 y recorridos de la V13/V16/V17 no usados aquí).

## Versiones

| Rev. | Fecha | Qué | Estado |
|---|---|---|---|
| **0** | 2026-10-09 | Estructura del canal, hilo del ERROR: **DR71** · HK08 (hook) · RC01 · RC28 · MD10 (mitad) · RC13 · DR82 · CT08 (CTA) · *Familiar* desde 142,129 s · 1004 f · 33,5 s | prueba `pruebas-720p/037-recorrido.mp4` (540×960) entregada el 2026-10-09 |
| **final** | 2026-10-11 | **El mismo plan, sin cambios, exportado por orden del usuario («renderiza el final») con 8 palabras aún POR CONFIRMAR** (se midieron por formantes, ver abajo, y se dejaron las notas: `revisar-037.mjs --final` falla a propósito). `finales/037-recorrido.mp4` (**master**, CRF 12 `slower`, 104,7 MB) · `finales/037-recorrido-crf16.mp4` (ligera, CRF 16 `slow`, 59,3 MB) · `finales/037.srt` (16 líneas) · `finales/037-portada.png` (GUARNE · VENTA, el dron a los 3,3 s; contraste 8,4:1 el texto y 9,6:1 el isotipo; receta en `portada.json`). Etiquetas BT.709 arregladas sin pérdida en las dos capas (imagen y audio idénticos: `framemd5` y `md5` del PCM); color medido contra stills a escala 1: Δ color medio ≤ 0,36 niveles, PSNR de baja frecuencia ≥ 49 dB (master) y ≥ 47,9 dB (ligera); pieza a −15,1 LUFS, pico −2,0 dBFS, silencio tras la última palabra | **final exportada**; sin commit |

## Palabras por confirmar (antes de publicar)

Whisper small, dos pasadas por toma (con vocabulario de la casa y sin él; `herramientas/dos-pasadas.py`); la confianza es la MENOR de los tokens de la palabra, en la peor de las dos pasadas. El segundo es el arranque medido por energía (`onsets-voz.py`) y comprobado cortando ahí y volviendo a transcribir (`palabras-desde.py`). «En el vídeo» es el segundo de la final. **Son todas las palabras bajo 0,55** de las tres tomas elegidas. «Medido por formantes» = `herramientas/formantes.py` sobre la voz sola de la toma (2026-10-11, al exportar con la duda abierta, regla 7c de `recorrido-luxur`).

| Toma | Palabra | Segundo del clip | En el vídeo | Confianza (sin vocabulario / con él) | Lo que se pinta y por qué |
|---|---|---|---|---|---|
| HK08 `IMG_9418` (hook) | «El» | 0,83 | 4,2 s | 0,24 / 0,61 | «El»: es la primera sílaba, casi sin energía (la voz sube a 0,83 s); las dos pasadas escriben «el». **Medido por formantes:** la vocal de 0,855-0,975 s es una [e] (F1 ≈ 500-530, F2 ≈ 1.950-2.300 Hz), compatible con «El»; solo se confirma al oído |
| MD10 `IMG_9528` (mitad) | «Compran» | 0,975 | 14,6 s | 0,12 / 0,29 | «Compran»: arranque de 40 dB tras 0,3 s de silencio; whisper la oye, la confianza baja por el soplido que la precede (0,04 y 0,47 s) |
| MD10 | **«cansan»** | 2,205 (el «se», desde ≈ 1,90) | 15,8 s | 0,22 / 0,22 | **«cansan» POR CONFIRMAR**: whisper oye «acasan» y «alcanzan»; cortando desde 2,205 s oye «cansan del viaje»; el reel editado `REDES/FAMILIA/fam 1.mp4` lo subtitula «se cansan del viaje». **El encargo y el registro decían «se aburren»**. **Medido por formantes al exportar (2026-10-11): NO se cierra.** A favor de «cansan»: tras el «se» (una [e], F1 ≈ 500-550 y F2 ≈ 1.900-2.050 Hz en 2,045-2,105 s) hay 90 ms de casi silencio (−49 dB, 2,135-2,19 s) y un estallido en 2,195 s como el de una /k/ sorda; sigue una [a] (F1 ≈ 660-740, F2 ≈ 1.830-1.910 en 2,225-2,255 s) y un murmullo nasal (2,285-2,315 s). En contra: la vocal siguiente (2,345-2,465 s) mide F1 ≈ 355-593 (media ≈ 480) y F2 ≈ 1.580-1.750, una vocal MEDIA y no su /a/ (F1 ≈ 770-810 en «viaje», 660-730 en «pagar»), y el murmullo de 2,285-2,315 s (F1 ≈ 290-380, F2 ≈ 590-660) también cuadraría con una [u]: el patrón [a]-[u]-[e] de «a-bu-rren». **Corrijo lo que dije al entregar la prueba**: la cuenta de «dos arranques de sílaba» no distingue «can-san» de «a-bu-rren» (la [u] no da arranque). Se pinta «cansan» (lo que decía la prueba, whisper cortando desde 2,205 s y el reel editado) y se deja POR CONFIRMAR: es la palabra que hay que oír |
| MD10 | segunda «compran» | 3,315 | 16,9 s | 0,39 / 0,46 | «compran»: tras 0,2 s de silencio; desde 3,315 s whisper oye «compran viejo y tienen» |
| MD10 | «tienen» | 4,38 | 18,0 s | 0,46 / 0,52 | «tienen»: desde 4,38 s oye «tienen que pagar»; desde 4,15-4,26 «y tiene que» |
| CT08 `IMG_9437` (CTA) | «No» | 1,80 | 27,1 s | 0,22 / 0,18 | «No»: la primera sílaba de la toma, tras 1,4 s de silencio |
| CT08 | «cometas» | 1,995 | 27,3 s | 0,43 / 0,44 | «cometas»: sin vocabulario escribe «cometos» |
| CT08 | **«error»** | ≈ 2,70 | 28,0 s | 0,42 / 0,33 | **«error» POR CONFIRMAR**: sin vocabulario «error», con vocabulario «horror» y desde 2,33 s «radar»; su primera sílaba, «e-», es débil. **Medido por formantes al exportar:** descarta «radar» (sus vocales son medias, F1 ≈ 520-620 Hz; su /a/ de «haz» mide 760-890) pero NO separa «error» de «horror»: la vocal inicial (2,79-3,04 s) tiene F2 ≈ 1.400-1.610, entre su [e] de «el» (1.800-2.000) y su [o] de «mismo» (≈ 1.260-1.370), y la segunda, una [o] con F2 ≈ 825 en 3,025 s, encaja con las dos. El reel editado subtitula esa frase «no cometas…»; es la palabra que más conviene oír |

**Lo que se cerró y cómo.** (1) La palabra clave del hook, «error», sale con 0,97-0,99 en las dos pasadas (no es una de las dudosas). (2) «Compran lejos… compran viejo… dos veces en remodelación» coincide palabra por palabra con el subtitulado del reel editado `fam 1.mp4`, salvo «aburren»/«cansan», que el reel y whisper dan como «cansan» y que el encargo daba como «aburren». (3) «buscar campestre»: ella dice «campestre» (whisper, tres pasadas); el reel editado escribe «casa campestre»; se pinta lo que ella dice. Nada de esto sustituye al oído del usuario.

**Las dobles descartadas.** CT03 `IMG_9419` (el CTA «No cometas el mismo error. Haz clic en el enlace y ven a conocerla.» en el sendero, 1080p, ella pequeña): «No» 0,28-0,34 (0,67 s) · «error» **0,05-0,08** (con vocabulario escribe «robo», 1,88-2,5 s) · «Haz» 0,50 (con vocabulario). Más 1080p ampliado ×2,1 y ella sin cara a esa distancia.

**Propuesta si «cansan» no se cierra:** quitar «se cansan del viaje,» (1,90-2,9 s de MD10, ≈ 1,1 s) con un corte y un empuje sobre ella; queda «Compran lejos, compran viejo y tienen que pagar dos veces en remodelación.» y el resto del plan se mueve ≈ 1 s (≈ 15 min: el plan, el audio, los subtítulos y los golpes, porque el CTA ya no cae en el golpe de 14,5 dB). **Si lo que se oye es «aburren»** sin más: basta cambiar el texto del trozo (`subtitulos-037.ts`, `voz/md10.txt`, la `dice` del plan y el `.srt`; ≈ 6 min y un render por versión de la final). **Si es «error» la que no cuadra:** quedarse con «Haz clic en el enlace y ven a conocerla.» (3,42-5,60 s de CT08) y dejar «No cometas el mismo error.» sin voz ni texto.

## Qué hay en cada pieza

| Pieza | Elegida | Alternativas ya miradas |
|---|---|---|
| Dron (sin voz ni texto, 3,9 s) | **DR71**, 3,0-6,9 s: la casa en su ladera, el dron se aleja; mov 1,6 (el más rápido sin tirones del clip), dispersión 0,082, y un zoom hacia fuera de 1,08 a 1,0 | DR71 6,5-10,4 s (dispersión 0,052, el más uniforme, pero mov 1,3: apenas se mueve) · DR74 (plano alto fijo, mov 0,6) · DR77 (mov 4,2 pero desde los 10,5 s entra el coche con su placa) · DR79 (placas; la V19 lo tomó) · DR80 (el valle sin casa, mov 0,5) |
| Hook | **HK08** | — (la única del hilo) |
| Recorrido 1 | RC01 la llegada por la sala (disuelve del hook) → RC28 el pasillo y la alcoba | RC02 (el lavamanos de cobre y la bañera: se deja a la V21) · RC05, RC11, RC17 (la V19) |
| Mitad | **MD10** | — (la única del hilo) |
| Recorrido 2 | RC13 el vestier y el baño (2,1 s) → DR82 el valle y la carretera (la vista, 4,3 s) | DR73/DR75/DR81 (la V19) · DR74 (fijo) · DR80 (sin casa) |
| CTA | **CT08** | CT03 (1080p, «error» 0,05) |
| Canción | *Familiar* (Nils Frahm) desde 142,129 s, +4 dB fijos | *Children*, *Experience*, *Silver Skies*: 0 soluciones con esta estructura (`rejilla-037.py`) · *Begin Again* (la tomó la V19) |
| Portada | el dron DR71 a los 3,3 s (la casa en su ladera, sin Isabella ni texto) | DR82 (la vista, 24-25 s: el cielo ocupa la mitad de arriba) |

## Caption (propuesta; la ficha va aquí, no en el vídeo)

> El error que cometen las familias al buscar campestre: comprar lejos, comprar viejo y pagar dos veces. 🏡
>
> Una casa campestre en Guarne, con el valle entero delante y a 300 m de la autopista Medellín-Bogotá.
>
> 🏡 Casa campestre · Guarne, Antioquia · lote de 2.413 m² · 5 alcobas · 6 baños · 2 parqueaderos · construida en 2025
> 💰 COP 3.000 millones (o «precio por DM», si se prefiere)
> 📍 A 300 m de la autopista Medellín-Bogotá · 15 km del aeropuerto José María Córdova
>
> No cometas el mismo error. Haz clic en el enlace y ven a conocerla.
>
> #CasaCampestre #Guarne #Antioquia #FincasEnVenta #PropiedadesLuxur

(Los datos son los de la ficha web leída el 2026-10-08 para la V13; no se ha vuelto a consultar. «Construida en 2025» sale de la ficha: la pieza no afirma nada más de la casa. Ninguna cifra está en el vídeo.)

## Cómo cambiar cada pieza

- **El dron**: copia el DJI a `proyectos/037/original/`, su sha en `MATERIAL` de `normalizar.mjs` (clase `dron`), su ventana en `MANUAL` de `herramientas/encuadre.py` (mira el 16:9 entero con `herramientas/ventanas-prueba.py`) y `uv run proyectos/037/herramientas/encuadre.py` + `node proyectos/037/normalizar.mjs`; el tramo se mide sobre el clip entero (`uniformes-dron.py`, `perfil-mov.py`; ver `aprendizajes.md` §3); en `metraje-037.ts`, `src`, `desde`, `zoom` y `color`. Su `dur` (117 f) acaba en el golpe de f116,7: si cambia, cambia el `en` del hook.
- **Otra frase de Isabella**: copia la toma, sha en `MATERIAL`, `VENTANA_VOZ` y `GANANCIA_VOZ_DB` en `normalizar.mjs` (`limites-voz.py` + `onsets-voz.py`; la ganancia con `probar-voz.py --umbral 0.0316 --razon 3.5`), Vision (`seguir-sujeto.swift` sobre fotogramas a 5 f/s → `medidas/`; `dos-pasadas.py` para whisper), `desde` (8 f antes de su primera sílaba, a corte sobre un golpe) / `dur` / `en` de ese plano y de los siguientes, `voz.s0/s1`, su guion marcado (`voz/<toma>.txt`), `trozos-editoriales.mjs` y cada línea a su palabra con `palabras-desde.py` + `onsets-voz.py` + `lineas-vs-onsets.py`.
- **Las placas del hook**: `TAPAR` de `normalizar.mjs` (dos sitios con claves `[t, cx, cy]` medidas con `herramientas/recortes.py`) y `herramientas/placas-amarillas.py` sobre el clip normalizado (0 fotogramas con amarillo de placa). Cambiar la ventana de `encuadre.py` no exige cambiar el recuadro (va en fracciones del cuadro apaisado), pero sí repetirlo si se cambia el tramo del clip.
- **Un plano de recorrido**: `src`, `desde`, `color` (mirando su ÚLTIMO fotograma) y su `en`/`dur` con el corte sobre un golpe ≥ 9 dB (`musica/golpes-037.json`; la puerta lo comprueba y `golpes-render.py` lo confirma sobre el audio del render). Después, `medir-color.py` sobre los empalmes.
- **Otra canción**: `INICIO_MUSICA`, `LUFS_SOLA` y `LUFS_ENTRADA_CTA` en `audio-037.ts`, `MUSICA` y `MUSICA_PRE_DB` en `normalizar.mjs` y `golpes-037.json` (`medir-pista.py --json`, desde justo antes del golpe de entrada). Los cortes secos y las tres entradas de Isabella se mueven a SUS golpes (`rejilla-037.py` dice si hay rejilla).
- **Sin música** (para poner un audio en tendencia al publicar): `HAY_MUSICA = false`.
- **Una palabra que se oiga distinta**: el texto del trozo en `subtitulos-037.ts`, su `voz/<toma>.txt`, el `dice` del plan y, en la final, el `.srt` (`exportar-srt.mjs`); ≈ 6 min más un render por cada versión de la final (CRF 12 y CRF 16).
- **La portada**: `uv run .claude/skills/portada-luxur/scripts/portada.py portada --proyecto 037` repite la de `portada.json`; otro segundo con `--t`.

## Lo que queda por confirmar

1. Las palabras de la tabla de arriba (sobre todo **«cansan»**, que el encargo daba como «aburren» y que los formantes no cierran, y **«error»** del CTA). **Mientras no se oigan, no se publica**: `revisar-037.mjs --final` falla por ellas a propósito.
2. La canción: medida, no oída; licencia no verificada.
3. El recuadro sobre las placas del hook: se ve como un borrón gris sobre el Mini y no se lee ninguna placa; si no gusta, el hook no tiene otra forma limpia (la única alternativa es otro hook).
4. La nitidez del hook (4K cerrado al 60 % del alto, ×1,48 sobre la fuente) frente a las demás tomas (×0,89).
