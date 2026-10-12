# 038 · Casa Campestre Guarne (V21) — registro de versiones y «cómo cambiar cada pieza»

Worktree `.claude/worktrees/reel-038-escapar-del-ruido`, rama `worktree-reel-038-escapar-del-ruido`, SIN commit (el usuario pidió no hacer commit ni push sin pedirlo). Reservada en `archivos/musica/registro-de-uso.md` como **V21** (reserva sin publicar; el registro de este worktree se copió del de la V20, el más completo). Códigos del material: la sección 5 del registro. Sexto reel de la casa: V13 = 029, V16 = 032, V17 = 033, V19 = 036 y V20 = 037. La puerta (7b) carga el plan de cada una (el de la V19, que al empezar solo existía como reserva en el registro, ya lo lee de su `metraje-036.ts`) y comprueba que ningún dron, hook, mitad ni CTA se repite y que ningún tramo de recorrido comparte un fotograma.

## Versiones

| Rev. | Fecha | Qué | Estado |
|---|---|---|---|
| **0** | 2026-10-09 | Estructura del canal, hilo **«TODOS CABEN»**: **DR73** · HK03 (hook) · RC27 · RC24 · RC22 · RC18 · MD05 (mitad) · RC15 · RC12 · RC10 · **DR77** · CT06 (CTA) · *I Feel It Coming* desde 223,196 s · 1113 f · 37,1 s | **en prueba**: `pruebas-720p/038-recorrido.mp4` (540×960, con el color de la final); espera el OK y que se oigan las palabras de abajo |
| **final** | 2026-10-11 | La misma pieza de la rev. 0, exportada tras la orden «Renderiza en buena calidad» (con las palabras de abajo SIN oír: medidas por formantes y sibilantes, sin poder cerrarlas todas): `finales/038-recorrido.mp4` (master, CRF 12 `slower`, 107 MB) · `finales/038-recorrido-crf16.mp4` (CRF 16 `slow`, 60 MB) · `finales/038.srt` (18 cues, 3,5-34,7 s) · `finales/038-portada.png` (portada, `portada-luxur`, GUARNE · VENTA, t = 0,6 s) | **exportada**; `revisar-038.mjs --final` FALLA a propósito con las 4 notas «POR CONFIRMAR AL OÍDO» (subtitulos-038.ts:30, hk03.txt, md05.txt, ct06.txt) hasta que se oigan |

## Cómo se llegó al hilo (y qué descartó el encargo)

El encargo pedía «ESCAPAR DEL RUIDO» con HK11/HK12, MD08/MD09 y CT05/CT06 («que ninguna versión ha usado»). Dos pasadas de whisper y la mirada a los registros de los worktrees mostraron que la V19/036 había reservado antes (08:40-08:50) HK11, MD08 y CT07 con ese mismo hilo, y que de los 28 recorridos solo quedaba libre RC02 (la V19 y la V20 se llevaron RC05/11/17 y RC01/13/28 más sus drones). Se paró antes de montar y se le preguntó al usuario: eligió el hilo **«Todos caben»** (todo libre, sin frases de otra versión), repetir clips de recorrido solo en tramos que no se solapen, y *I Feel It Coming* para la música.

Para que no se pierda, lo medido del hilo del ruido (dos pasadas: con y sin vocabulario; confianza = la menor de los tokens de la palabra, en la peor):

| Toma | Palabras < 0,55 | Veredicto |
|---|---|---|
| HK11 `IMG_9433` (4K, la de la V19) | «afán» 0,32/0,40 · «cambia» 0,23/0,29 · «ven, te muestro» 0,06-0,37 · «qué» 0,44 | la mejor de las dos; la tiene la V19 |
| HK12 `IMG_9434` (4K, la doble) | «afán» 0,28 · «a tu hogar»→«tocar(lo)» 0,17 · «cambia» 0,32 · «ven, te muestro» 0,08-0,40 | su centro no se entiende; repetiría la frase de la V19 |
| MD08 `IMG_9514` / MD09 `IMG_9515` (1080p) | «jacuzzi» 0,08-0,39; sin vocabulario «asado» sale «ha dado» con confianza alta | MD09, la más limpia (una sola palabra); MD08, la de la V19 |
| CT05 `IMG_9426` / CT06 `IMG_9427` (1080p) | CT05 pierde «enlace» («el nazi», «INNACI»); CT06: «disponibles» 0,35-0,45 · «tuyo» 0,40-0,46 · «Recorridos» 0,50 | CT06 |

## La final (2026-10-11)

Renderizada tal cual la prueba (sin tocar un plano ni un fotograma de texto): imagen muda en PNG bt709 con `--gl=angle` (CRF 12 `slower` y CRF 16 `slow`), audio aparte en WAV del mismo render y mezcla con el ffmpeg del sistema (`-c:v copy`, AAC 320k, `h264_metadata` BT.709 limitado + `+write_colr`: el AAC de Remotion llega 1,3 f tarde).

| Comprobación | Resultado |
|---|---|
| Imagen de la final = imagen del render (`framemd5`, 1113 f) | igual en las dos |
| Audio contra el WAV del render | retraso 0 muestras; residuo −37,5 dB (ruido del AAC) |
| Etiquetas | `colr` nclx 1-1-1 + VUI bt709, rango limitado, 1080×1920 a 30 fps |
| Sonoridad | −15,0 LUFS, pico real −3,6 dBTP (ventanas: dron −15,1 · hook −14,8 · recorrido 1 −14,8 · mitad −14,8 · recorrido 2 −14,8 · CTA −14,8) |
| Color de la final contra el de la prueba | ≤ 0,32 niveles; PSNR de baja frecuencia mínimo 48,65 dB (master) / 46,59 dB (CRF 16); 0 fotogramas fuera |
| Cortes sobre golpe (WAV de la final) | f98 · f272 · f330 · f369 · f427 · f465 · f640 · f678 · f737 · f833 · f930 a ≤ 0,7 f; el de f640, 8,8 dB (el más débil, declarado) |
| `revisar-038.mjs` | sin `--final`, verde; con `--final`, 4 fallos = las 4 notas POR CONFIRMAR |

### Las palabras, medidas al exportar (la orden llegó con la duda abierta)

Una medida no es un oído: las notas «POR CONFIRMAR AL OÍDO» se quedan y la puerta con `--final` sigue fallando hasta que se confirmen.

- **«incómodo»** (HK03, ≈ 8,3 s del vídeo): 4 sílabas (in-có-mo-do); la tónica «có» es una [o] (F1 ≈ 440-520, F2 ≈ 760-1.020), pero la primera vocal sale más abierta de lo que pide una /i/ (F1 ≈ 600-700, F2 ≈ 2.030-2.120): la medida NO distingue «in-» de «en-». Es la única palabra que cabe en ese hueco.
- **«Hijos»** (MD05, ≈ 15,8 s): hay una /s/ final (1,06-1,12 s; razón /s/-voz −6,8 dB, contra −2,5 dB en la /s/ de «reserva»): plural, «Hijos».
- **«tuyo»** (CT06, ≈ 33,7 s): antes de la palabra hay un cierre de 40 ms y una explosión, y la banda de las /s/ queda a −63 dB (la de «reserva» llega a −54 dB): una /t/, no una /s/; es «tuyo» y no «suyo».
- **«visita»** (≈ 17,7 s), **«comodidad»** (≈ 19,8 s), **«Recorridos»** (≈ 31,3 s) y **«disponibles»** (≈ 32,5 s): sin medida posible; siguen sin oír.

Si alguna se oye distinta, el arreglo es solo el texto (el trozo en `subtitulos-038.ts`, `voz/<toma>.txt`, el `dice` del plan y el `.srt`) y volver a renderizar la imagen: la voz y los tiempos no se tocan.

### La portada

`portada-luxur`, fotograma de la final en t = 0,6 s (el dron DR73: la casa baja en su loma bajo el cielo abierto; el más nítido del tramo), locación `GUARNE`, `VENTA` (la ficha web dice «en-venta»; el tipo de negocio no se supone nunca), contraste del texto 17,4:1 y del isotipo 17,3:1. Receta en `portada.json`. Es otra imagen: el reel sigue abriendo con la casa limpia en el f0.

## Palabras por confirmar (antes de la final)

Whisper small, dos pasadas (con vocabulario de la casa y sin él); la confianza es la MENOR de los tokens de la palabra, en la peor de las dos pasadas. El segundo es el arranque medido por energía (`herramientas/onsets-voz.py`, voz sola) y, donde se pudo, comprobado cortando ahí y volviendo a transcribir (`herramientas/palabras-desde.py`). «En el vídeo» es el segundo de esta prueba.

| Toma | Palabra | Segundo del clip | En el vídeo | Confianza | Lo que se pinta y por qué |
|---|---|---|---|---|---|
| HK03 `IMG_9406` (hook) | «Domingo» | 0,77 | 3,5 s | 0,34 sin vocabulario · 0,46 con él (primera palabra de la toma) | «Domingo»: cortando desde 0,77 s whisper escribe «Domingo en familia, abuelos» |
| HK03 | «primos» | 3,70 | 6,5 s | 0,40 · 0,61 | «primos»: cortando desde 3,70 s, «Primos, ¿cuántas veces alguien» |
| HK03 | **«incómodo»** | 5,56 (acaba 6,18) | 8,3 s (acaba 8,9 s) | 0,39 · 0,54 | **«incómodo?» POR CONFIRMAR AL OÍDO**: la palabra suena apagada, casi cuchicheada (la «in» a 5,56 s y «cómodo» a −28 dB del pico); cortando desde 5,5 s whisper oye «encomoro» y desde 5,82 s «como» |
| MD05 `IMG_9445` (mitad) | «Hijos» | 0,67 | 15,8 s | 0,21 con vocabulario · 0,60 sin él (primera palabra) | «Hijos»; la energía empieza a 0,67 s y hay una pausa a 1,06-1,20 s antes de «abuelos» |
| MD05 | «visita» | ≈ 2,66 (acaba 3,4) | 17,7 s | 0,54 · 0,43 | «visita»: cortando desde 2,66 s, «de visita. Todos pueden» |
| MD05 | «comodidad» | ≈ 4,66-5,30 | 19,8-20,4 s | 0,69 · 0,48 | «total comodidad.»: la 2.ª pasada acorta «comodidad» (cortando desde 4,5 s oye «total como ella») |
| CT06 `IMG_9427` (CTA) | «Recorridos» | 1,13 | 31,3 s | 0,74 con vocabulario · 0,50 sin él (primera palabra) | «Recorridos»: las dos pasadas la escriben igual |
| CT06 | «disponibles» | 2,335 | 32,5 s | 0,45 · 0,35 | «disponibles,»: cortando desde 2,15 s, «disponibles, reserva el tuyo» |
| CT06 | «tuyo» | ≈ 3,57 | 33,7 s | 0,40 · 0,46 | «el tuyo»: ambas pasadas lo escriben así; en un corte corto sale «¡Tú de la nena!» (poco audio) |

No se pudo comprobar nada con los reels ya editados del disco (`VIDEOS EDITADOS/`): los de este hilo (p. ej. `REDES/familia 1.mp4`) llevan la voz de otras tomas y sin subtítulos quemados en esa frase.

**Si «incómodo» se oye distinto:** solo cambia el texto del acento (≈ 5 min: el trozo en `subtitulos-038.ts`, `voz/hk03.txt`, el `dice` del plan y, en la final, el `.srt`) y se re-renderiza la imagen; la voz y los tiempos no se tocan.

## Qué hay en cada pieza

| Pieza | Elegida | Alternativas ya miradas |
|---|---|---|
| Dron (sin voz ni texto, 3,3 s) | **DR73**, 9,6-12,87 s: la casa baja en su loma con el cielo; movimiento uniforme (dispersión 0,030); ventana a 0,50 | DR74 (plano alto casi fijo, dispersión 0,18: no uniforme) · DR77 (se usa como la vista) · DR80 (el valle, casi quieto: movimiento 0,44) · DR79 (placas legibles; la V19 lo usa) |
| Hook | **HK03** `IMG_9406`, «Domingo en familia…» (1080p; camina hacia la cámara por el jardín de papiros) | HK01 «La ciudad cansa, esta casa te cura» (audio ininteligible) · HK05 «Diseño moderno, naturaleza y privacidad» (descriptivo) |
| Recorrido 1 | RC27 patio → RC24 comedor → RC22 terraza → RC18 palmera y terraza | RC17 con la tele encendida (la V19) · RC19 jacuzzi (a 5,5 s la tele) |
| Mitad | **MD05** `IMG_9445` (4K cerrado al 60 %; la tele encendida fuera) | MD07 «Sin escaleras, sin …, todas con baño privado» (palabras sin entender) · MD03 (doble de la de la V13) |
| Recorrido 2 | RC15 cocina → RC12 alcoba con escritorio → RC10 alcoba blanca → DR77 valle | RC13 vestier→baño (el inodoro) · RC28 pasillo (una persona sentada) · RC02 lavamanos de cobre |
| CTA | **CT06** `IMG_9427` (1080p; camina hacia la cámara bajo el cielo) | CT13 `IMG_9513` (ella diminuta al fondo de la cocina, 1080p) · CT09/CT17 (tele encendida o seis palabras dudosas) |
| Canción | *I Feel It Coming* (sax) desde 223,196 s | *The Sky is Crying* (blues de 9 min, se corta en seco a +42 s) · *L' Amour Toujours* (caída de 3,9 dB) |

## Clips que repite esta pieza con OTRO tramo (decisión del usuario, 2026-10-09)

| Clip | Mi tramo | El de la otra versión |
|---|---|---|
| RC15 | 4,5-5,77 s | V13: 0,5-3,73 s |
| RC12 | 3,9-5,87 s | V13: 0,5-3,8 s |
| RC10 | 4,4-7,6 s | V13: 0,5-2,83 s |
| RC27 | 0,0-1,93 s | V16: 2,5-6,03 s |
| RC24 | 3,67-4,97 s | V16: 0,3-3,63 s |
| RC18 | 1,7-2,97 s | V16: 3,0-6,63 s |
| RC22 | 0,1-2,03 s | V17: 2,4-5,23 s |

## Color

Primero la exposición entre planos, medida con los empalmes delante (`herramientas/medir-color.py`, `luma-bordes.py` y `luma-clip.py`), después la base del canal. Cada plano de vídeo lleva `color`; las tres tomas de Isabella, saturación 1,0 y vibrance 0. Resultado sobre fotogramas a escala 0,5 con el MISMO GL que el render (`angle`), antes → después:

- luma media entre planos σ 11,1 → **7,2** · saturación media 0,266 → 0,316 · quemado máx. 3,0 % → **2,5 %** · aplastado máx. 8,2 % → 9,6 % (el CTA, 9,6 %: el seto y el camino en sombra; el dron, 4,1 %)
- saltos de luma en los 11 cortes: de −23/+25/−27/−31 a **≤ 8,5** (el mayor, terraza → palmera −8,5 y alcoba → valle −8,1)
- piel de Isabella (tono, saturación): HK03 358,2° → 358,6°, 0,35 → 0,36 · MD05 14,0° → 14,1°, 0,47 → 0,51 · CT06 358,2° → 357,1°, 0,27 → 0,31: no se mueve
- lo que hubo que decidir: RC18 (palmera) empieza oscuro (luma 73-85 de 0,0 a 1,2 s frente a ≈ 135 de los vecinos): se usa solo su final (desde 1,7 s) y RC10 (alcoba) su tramo luminoso (desde 4,4 s; de 2,8 a 4,0 s son 109-118). RC15 (cocina) empieza oscuro (luma 112 en el tramo usado; a 3,8 s era 104) y sube a 131 en 1,3 s: exposición +0,4 (el tope) con sombras +0,3; RC12 (hijos), la más clara (155-162), −0,4
- sin disolvencias: todos los cortes son secos, así que no hay fotograma central que mirar; el último fotograma de cada recorrido no entra en algo oscuro (el de la cocina lleva un armario gris en la esquina superior izquierda)

## Qué hay que saber del audio

- Voz tratada (cadena de `normalizar.mjs`: graves 100 Hz, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada tras el compresor, limitador a −2,5 dBFS): en su frase **−15,1 / −15,1 / −15,0 LUFS** y pico real **−2,5 / −2,5 / −3,0 dBTP**; ganancias +19,4 / +21,4 / +20,2 dB; el limitador quita 2,0 / 3,2 / 0,0 dB (en MD05 el crudo llega a −12,9 dBFS con la media a −30,9 LUFS: unas pocas sílabas fuertes, probablemente «abuelos», topan con el limitador; es lo que más quita el limitador en la pieza, dentro de lo que ya pasó en la V13: 4 dB en una alcoba).
- Render (WAV, `herramientas/lufs-render.py`): dron −15,0 · hook −14,9 · recorrido 1 −14,8 · mitad −14,8 · recorrido 2 −14,8 · CTA −14,8 · **pieza −15,0 LUFS, pico −3,8 dBFS**. La música sola queda a −15 LUFS; bajo la voz, 11 LU por debajo.
- Los 11 cortes caen a ≤ 0,7 f de su golpe sobre el WAV del render; el de f640 mide 8,8 dB (el más débil) y el de f272 suena con la música abajo (declarados en la puerta).
- No se pudo OÍR nada: la música y la voz están medidas, no oídas.

## Cómo cambiar cada pieza

- **El dron**: copia el DJI a `proyectos/038/original/` (se recuperan del SSD: `python3 …/copiar-material.py` o a mano), su sha en `MATERIAL` de `normalizar.mjs` (clase `dron`), su ventana en `MANUAL` de `encuadre.py` (mira el 16:9 entero con `herramientas/ventanas-prueba.py` y el recorte con `herramientas/ver-plano.py`) y `uv run proyectos/038/herramientas/encuadre.py` + `node proyectos/038/normalizar.mjs`; el tramo uniforme se mide con `herramientas/mov-dron.py` sobre el clip entero. Su `dur` (98 f) acaba en el golpe de f98: si cambia, cambia el `en` del hook. Los DJI van a 29,97 fps y `fps=30` repite un fotograma a los 16,7 s: los dos tramos de este plan caen antes.
- **Otra frase de Isabella**: copia la toma, sha en `MATERIAL`, `VENTANA_VOZ` y `GANANCIA_VOZ_DB` en `normalizar.mjs` (`limites-voz.py` + `envolvente-voz.py` + `onsets-voz.py`; la ganancia con `probar-voz.py --umbral 0.0316 --razon 3.5`), Vision (`herramientas/medir-sujeto.py` → `medidas/`), `desde` (8 f antes de su primera sílaba, a corte sobre un golpe) / `dur` / `en` de ese plano y de los siguientes, `voz.s0/s1`, su guion marcado (`voz/<toma>.txt`), `trozos-editoriales.mjs` y cada línea a su palabra con `palabras-desde.py` + `onsets-voz.py`.
- **Un plano de recorrido**: `src`, `desde`, `color` (mirando sus DOS lados: `luma-bordes.py`) y su `en`/`dur` con el corte sobre un golpe ≥ 9 dB (`musica/golpes-038.json`; la puerta lo comprueba y `golpes-render.py` lo confirma sobre el WAV del render). La puerta 7b falla si el tramo se solapa con el de otra versión.
- **Otra canción**: `INICIO_MUSICA`, `LUFS_SOLA` y `LUFS_ENTRADA_CTA` en `audio-038.ts`, `MUSICA` en `normalizar.mjs` y `golpes-038.json` (`medir-pista.py --json`). Los cortes secos y las tres entradas de Isabella se mueven a SUS golpes.
- **Sin música** (para poner un audio en tendencia al publicar): `HAY_MUSICA = false`.
- **Una palabra que se oiga distinta**: el texto del trozo en `subtitulos-038.ts`, su `voz/<toma>.txt`, el `dice` del plan y, en la final, el `.srt`.

## Caption (propuesta; la ficha va aquí, no en el vídeo)

> Domingo en familia: abuelos, tíos, primos… ¿cuántas veces alguien queda incómodo? 🏡
>
> Una casa campestre en Guarne con sitio para todos: patio, comedor con la mesa puesta, terraza con jacuzzi y alcobas para cada generación, abiertas al valle.
>
> 🏡 Casa campestre · Guarne, Antioquia · lote de 2.413 m² · 5 alcobas · 6 baños · jacuzzi y terraza con vista · 2 parqueaderos · construida en 2025
> 💰 COP 3.000 millones (o «precio por DM», si se prefiere)
> 📍 A 300 m de la autopista Medellín-Bogotá
>
> Recorridos privados disponibles: reserva el tuyo en el enlace.
>
> #CasaCampestre #Guarne #Antioquia #FincaFamiliar #PropiedadesLuxur

(Los datos son los de la ficha web leída el 2026-10-08.)

## Lo que queda por confirmar (tras exportar)

1. Las palabras de la tabla de arriba (sobre todo **«incómodo»**).
2. El OK de la prueba.
3. La canción: medida, no oída; licencia no verificada.
4. La nitidez del hook y del CTA (1080p ×2,13) y de la mitad (4K cerrado, ×1,78).
5. El golpe de f640 (8,8 dB en el render) y el de f272 con la música abajo.
