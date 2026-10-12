# 033 · Casa Campestre Guarne (V17) — registro de versiones y «cómo cambiar cada pieza»

Worktree `.claude/worktrees/casa-campestre-reel-4ce1d1`, rama `claude/casa-campestre-reel-4ce1d1`, SIN commit (el usuario pidió no hacer commit ni push sin pedirlo). Reservada en `archivos/musica/registro-de-uso.md` como **V17** (reserva sin publicar; el registro de este worktree se copió del de la V16, el más completo). Códigos del material: la sección 5 del registro (CT20 y CT21 son nuevos: `IMG_9420` e `IMG_9422`, que aparecieron en `5 Cta` después del 2026-10-08). Tercer reel de la casa: la V13 (029) y la V16 (032) no comparten con esta ni un clip (la puerta, 7b, carga sus dos planes y falla si se repite uno).

## Versiones

| Rev. | Fecha | Qué | Estado |
|---|---|---|---|
| **0** | 2026-10-09 | Estructura del canal, hilo de la DIÁSPORA: **DR76** · CT21 (hook) · RC26 · RC20 · RC22 · MD06 · RC07 · RC06 · RC04 · RC21 · CT18 recortada · *Utopia* desde 141,778 s · 1189 f · 39,6 s | **FINAL exportada** el 2026-10-09 («renderiza en buena calidad», con las palabras de abajo SIN OÍR): `finales/033-recorrido.mp4` (máster CRF 12 `slower`, 107 MB) + `033-recorrido-crf16.mp4` (60 MB) + `033.srt` + **`033-portada.png`** (2026-10-11: el sendero del jardín con la casa al fondo, 5,7 s; GUARNE · VENTA; contraste 9,0:1 el texto y 7,0:1 el isotipo; receta en `portada.json`, copia en `Videos Social/Portadas/`). Imagen = render (framemd5), BT.709 en VUI y `colr`, audio del WAV del render (0 muestras de desfase, residuo −46 dB), −15,0 LUFS / −3,2 dBTP, color ≤ 0,35 niveles de los stills (CRF 16: ≤ 0,47) |

## Palabras por confirmar (la final salió con ellas abiertas)

La orden de exportar llegó con estas dudas abiertas: se midieron por formantes (comparadas con vocales conocidas de la MISMA toma) y se exportó diciéndolo; las notas «POR CONFIRMAR» se quedan y `revisar-033.mjs --final` sigue fallando por ellas.
- «trabajaste duro»: la vocal de 3,06-3,10 s es [e] (F1 ≈ 460, F2 ≈ 1.800) y antes hay una /s/ que se corta y una explosión de /t/: «-s-te», no la /s/ continua de «seguro». Se pinta «trabajaste duro».
- «extrañas lo mismo»: la vocal antes de «lo» (5,80-5,96 s) mide como su /e/ (F1 ≈ 550-595, F2 ≈ 1.870-2.060), no como su /a/ (F1 630-685, F2 1.360-1.545): **la medida no confirma «extrañas»**. Se pinta «extrañas lo mismo» porque es lo que escribe el reel editado `EXTRANJEROS 1` y «extrañes» no encaja; si al oírlo es otra cosa, hay que volver a renderizar (el texto va en la imagen).
- «diciembres» y «su visita»: sin cambios (sin /s/ medible; /s/ de 80 ms sin cierre de /t/).


Whisper small, dos pasadas (con vocabulario de la casa y sin él); la confianza es la MENOR de los tokens de la palabra, en la peor de las dos pasadas. El segundo es el arranque medido por energía y comprobado cortando ahí y volviendo a transcribir (`herramientas/palabras-desde.py`). «En el vídeo» es el segundo de esta prueba.

| Toma | Palabra | Segundo del clip | En el vídeo | Confianza | Lo que se pinta y por qué |
|---|---|---|---|---|---|
| CT21 `IMG_9422` (hook) | «Colombia» | 0,43 | 2,5 s | 0,05 (sin vocabulario escribe «Columbia»; con él, 0,81) | «Colombia»: es la grafía, no otra palabra |
| CT21 | «llama» | ≈ 0,82 | 2,9 s | 0,47 | «llama»: las dos pasadas escriben «llama» |
| CT21 | «ya» | 1,41 | 3,5 s | 0,50 | «¿ya tienes»: las dos pasadas |
| CT21 | «dónde» | 1,80-1,82 | 3,9 s | 0,44 | «dónde llegar?»: las dos pasadas |
| MD06 `IMG_9448` (mitad) | «Llevas» | 0,87 | 14,3 s | 0,52 | «Llevas» |
| MD06 | «años» | 1,12 | 14,6 s | 0,26 | «años»: desde 1,13 s whisper oye «años en el exterior» |
| MD06 | **«trabajaste duro»** | 2,52 · 3,04 | 16,0 · 16,5 s | 0,36 (oye «trabajas seguro») | **«trabajaste duro» POR CONFIRMAR**: hay una /t/ y una [e] (el «-te») antes de «du-» y dos sílabas, no tres; el reel editado `EXTRANJEROS 1` lo subtitula así |
| MD06 | «diciembres» | ≈ 4,98 | 18,4 s | 0,49 | «diciembres» POR CONFIRMAR: no hay /s/ final medible (ella aspira las eses); se pinta la forma gramatical |
| MD06 | **«extrañas lo mismo»** | 5,28 · 6,02 | 18,7 · 19,4 s | 0,19 (sin vocabulario oye «extrañes»; cortando desde 5,34 s, «extraño es lo mismo») | **«extrañas lo mismo» POR CONFIRMAR**: entre la /s/ (5,66 s) y «lo» (6,02 s) suena una vocal [e] de 0,2 s (F1 ≈ 560, F2 ≈ 1.900). Puede ser «extrañas… es lo mismo» |
| CT18 `IMG_9531` (CTA) | «Volver» | 0,49 | 32,1 s | 0,51 | «Volver» |
| CT18 | «Haz» | 3,19 | 34,8 s | 0,26 | «Haz clic»: vocal + /s/ débil (3,24-3,28 s) |
| CT18 | **«su»** | 5,00 | 36,6 s | 0,40 | **«su visita» POR CONFIRMAR**: /s/ de 80 ms sin cierre de /t/; el reel editado `EXTRANJEROS 1` escribe «tu» |
| CT18 | «visita» | 5,20 | 36,8 s | 0,29 | «visita»: la /s/ y el cierre de la /t/ medidos |

Las dobles descartadas: HK06 `IMG_9413` («¿Extrañas» ≈ 0,95 s, casi susurrada hasta 1,62; «Colombia» 1,90; «esta» 2,50), HK07 `IMG_9415` («¿Extrañas» ≈ 1,44; «Colombia» 2,06; «esta/esa» 2,62), CT20 `IMG_9420` («llama» 2,34; «¿ya» 3,02; «tienes» 3,16, oída «a quién es») y CT19 `IMG_9532` («dirección» 2,93; «haz» 3,93, oída «asquíquen»; «clic» 4,15; «agendemos» 5,13).

**Propuesta si «trabajaste duro» no se cierra:** quitar «trabajaste duro y ahorraste,» (2,51-4,04 s de MD06) con un corte y un acercamiento sobre ella; queda «Llevas años en el exterior… pero todos los diciembres extrañas lo mismo.» ≈ 2 s más corta (≈ 15 min: el plan, el audio, los subtítulos y los golpes del recorrido 2).

## Qué hay en cada pieza

| Pieza | Elegida | Alternativas ya miradas |
|---|---|---|
| Dron (sin voz ni texto, 2,2 s) | **DR76**, 10,9-13,1 s: el dron gira alrededor del cerro con la casa en el centro; el tramo de movimiento más uniforme del vuelo (dispersión 0,013); ventana a 0,42 | DR73 (se acerca de lejos, la casa pequeña casi todo el vuelo) · DR75 (pasada lateral con la montaña) · DR77 (pasa junto a la casa; al final, un coche blanco en el garaje) · DR79 (coches con placa a la vista) · DR80-82 (el valle, sin casa) |
| Hook | **CT21** «Colombia te llama, ¿ya tienes dónde llegar?» (1080p; sentada en el muro del mirador) | HK06/HK07 (ella caminando junto a la casa con el valle: más cine, pero «Extrañas» no se cierra) · CT20 (la doble, peor dicha) |
| Recorrido 1 | RC26 sendero → RC20 jacuzzi → RC22 sala de la terraza | RC21 (el valle, guardado para la vista) · RC28 (el pasillo: a los 3,2 s hay una persona sentada en la alcoba) · RC17 (tele encendida) |
| Mitad | **MD06** (4K cerrado al 60 %; la tele encendida fuera) | — (es la única de la diáspora) |
| Recorrido 2 | RC07 alcoba → RC06 claraboya → RC04 bañera → RC21 valle (la vista) | RC11 (la alcoba de las pampas: otra alcoba, rompía el paseo) · RC13 (vestier → baño: sale el inodoro) · RC02/RC05 (el lavamanos de cobre, el de la V16) |
| CTA | **CT18** recortada en «…agendemos su visita.» (1080p; atardecer en el jardín) | CT19 (doble, más dudas) |
| Canción | *Utopia* (Aleksey Chistilin) desde 141,778 s | *Begin Again* (rebota bajo el CTA) · *Children* (golpe de entrada flojo, pocos golpes) · *Overcoming the Impossible* · *Deep Breath* · *Chillin'* (la reservó la V18) |

## Caption (propuesta; la ficha va aquí, no en el vídeo)

> Colombia te llama. ¿Ya tienes dónde llegar? 🇨🇴
>
> Para quien lleva años fuera y cada diciembre extraña lo mismo: una casa campestre en Guarne con el valle entero delante, a minutos del aeropuerto.
>
> 🏡 Casa campestre · Guarne, Antioquia · lote de 2.413 m² · 5 alcobas · 6 baños · jacuzzi y terraza con vista · 2 parqueaderos · construida en 2025
> 💰 COP 3.000 millones (o «precio por DM», si se prefiere)
> 📍 A 300 m de la autopista Medellín-Bogotá · 15 km del aeropuerto José María Córdova
>
> Volver no es una idea, es una dirección. Agenda tu visita, virtual o presencial, en el enlace.
>
> #CasaCampestre #Guarne #Antioquia #VolverAColombia #ColombianosEnElExterior #PropiedadesLuxur

(Los datos son los de la ficha web leída el 2026-10-08; «a minutos del aeropuerto» evita la cifra de 10 minutos que dice Isabella en HK10 y que la ficha no confirma: la ficha dice 15 km.)

## Cómo cambiar cada pieza

- **El dron**: copia el DJI a `proyectos/033/original/`, su sha en `MATERIAL` de `normalizar.mjs` (clase `dron`), su ventana en `MANUAL` de `herramientas/encuadre.py` (mira el 16:9 entero con `herramientas/ventanas-prueba.py`) y `uv run proyectos/033/herramientas/encuadre.py` + `node proyectos/033/normalizar.mjs`; el tramo uniforme se mide sobre el clip entero (ver `aprendizajes.md` §3); en `metraje-033.ts`, `src`, `desde` y `color`. Su `dur` (67 f) acaba en el golpe de f66,8: si cambia, cambia el `en` del hook.
- **Otra frase de Isabella**: copia la toma, sha en `MATERIAL`, `VENTANA_VOZ` y `GANANCIA_VOZ_DB` en `normalizar.mjs` (`limites-voz.py` + `onsets-voz.py`; la ganancia con `probar-voz.py --umbral 0.0316 --razon 3.5`), Vision (`seguir-sujeto.swift` sobre fotogramas a 5 f/s → `medidas/`), `desde` (8 f antes de su primera sílaba, a corte sobre un golpe) / `dur` / `en` de ese plano y de los siguientes, `voz.s0/s1`, su guion marcado (`voz/<toma>.txt`), `trozos-editoriales.mjs` y cada línea a su palabra con `palabras-desde.py` + `onsets-voz.py`.
- **Un plano de recorrido**: `src`, `desde`, `color` (mirando su ÚLTIMO fotograma) y su `en`/`dur` con el corte sobre un golpe ≥ 9 dB (`musica/golpes-033.json`; la puerta lo comprueba y `golpes-render.py` lo confirma sobre el WAV del render). Después, `medir-color.py` sobre los empalmes.
- **Otra canción**: `INICIO_MUSICA`, `LUFS_SOLA` y `LUFS_ENTRADA_CTA` en `audio-033.ts`, `MUSICA` en `normalizar.mjs` y `golpes-033.json` (`medir-pista.py --json`). Los cortes secos y las tres entradas de Isabella se mueven a SUS golpes.
- **Sin música** (para poner un audio en tendencia al publicar): `HAY_MUSICA = false`.
- **Una palabra que se oiga distinta**: el texto del trozo en `subtitulos-033.ts`, su `voz/<toma>.txt`, el `dice` del plan y, en la final, el `.srt` (≈ 5 min y un render de prueba).

## Lo que queda por confirmar

1. Las palabras de la tabla de arriba (sobre todo «trabajaste duro», «extrañas lo mismo» y «su visita»).
2. El OK de la prueba.
3. La canción: medida, no oída; licencia no verificada.
4. La nitidez del hook y del CTA (1080p ×2,13) y de la mitad (4K cerrado, ×1,78).
