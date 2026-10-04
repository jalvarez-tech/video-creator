# Aprendizajes del 020 (V4 del reel de Los Patios, con una canción de jazz)

Lo que costó o sorprendió montando esta versión y no estaba escrito. Los números son de esta pieza; las skills (`recorrido-luxur`, `director-video`) y `reglas.md` se actualizan cuando el usuario lo pida.

## 1. Antes de montar: el análisis y la reserva se hacen contra un estado que se mueve

- **Las referencias remotas (`origin/<rama>`) se comparten entre todos los worktrees del repo.** Mientras analizaba, otra sesión (el checkout del estudio) hizo `git fetch` y publicó `13ef389` («la V3 queda reservada»): al crear mi worktree desde `origin/feat/recorridos-…` me encontré con un commit que no había leído. La lectura del §1 del encargo no se hace una vez: se **repite justo antes de reservar** (`git fetch` y releer el registro de cada rama), y otra vez tras el push, por si otra rama reservó lo mismo antes (gana el commit más antiguo). Aquí no pasó, pero el protocolo ya lo dice con razón.
- **El proyecto 019 no estaba en git** (el usuario pidió no commitearlo): el motor de comparación de metraje (sección 9b de la puerta) no podía cargar su plan. Se dejó una **instantánea de sus tramos opacos** dentro de `revisar-020.mjs` (clip → segundos), copiada de `combinaciones.md` §2.2 de aquel, en vez de apuntar a una ruta del estudio (que es una ruta absoluta de alguien: AGENTS.md §7). Cuando el 019 entre en git, se sustituye por su `metraje-019.ts` como las otras dos versiones.
- **No reemplaces `019` por `020` con un `perl` sobre toda la carpeta del proyecto nuevo**: me cambió el contenido de mi propio `analisis-uso.md` (las referencias legítimas a la V3 pasaron a decir 020) y hubo que restaurarlo por líneas. Se copian los archivos de código y se renumera solo en ellos, y los documentos (análisis, artefactos, combinaciones, aprendizajes) se escriben aparte.

## 2. La canción de jazz no tiene lo que busca el escáner

- **`buscar-entrada.py` busca «un golpe fuerte y una caída sostenida donde entra el CTA»** (pensado para un piano que cae a un lecho). *Sax for the Last Customer* es plana (−12 a −13 LUFS de principio a fin, ±1 dB) y no cae: el escáner la puntuó con una caída de 5,5 dB, floja. Lo que sí tiene es un **final natural**: un acorde de 20,9 dB en 176,986 s con 0,3 s de sostenido y una cola de 2 s que muere hacia los 179,1 s (la energía de 1 s a 177,5 s ya está a −48 dB). Mirando la forma entera de la pista (`medir-pista.py --png` sobre los últimos 60 s y la energía por segundo) se ve que **la resolución es el propio final de la canción**, y la entrada sale de contar hacia atrás: la pieza dura lo que lo que queda de canción menos lo que tarda el CTA. La regla útil para una pista plana: `INICIO_MUSICA = (acorde final) − (frame de la última palabra del CTA + 6 f) / 30`, y se elige un golpe de entrada cerca de ese punto (aquí el de 33,7 dB tras un descenso a ≈ −45 dB, 137,645 s, cae justo a los 39,44 s).
- **Una pista plana y densa pide medir el ducking, no solo calcularlo**: −16 dB bajo la voz son −30,9 LUFS, 9,9 LU por debajo de ella (lo comprueba la puerta). Lo que no se mide es si un saxo continuo compite con la voz más que un piano: esa decisión es del oído y queda declarada.
- **Sin pulso (46 % a 80 ms)** → se aplicó la rejilla por golpes medidos de la V3 (tabla `GOLPE` + `musica/golpes-020.json` + sección 5 de la puerta). Cada golpe es una nota de saxo: hay uno cada 0,35-0,55 s, así que cada plano encuentra el suyo a ≤ 0,5 f; el criterio útil ya no es «hay un golpe cerca» sino «el golpe que se elige es de ≥ 14 dB y no cae dentro de un respiro de la canción».
- **Hay un respiro a −27 dB** hacia los 158,5-160,5 s de la canción (f630-676): cae bajo la voz de la mitad y no se oye; en otra pieza, con la mitad en otro sitio, habría quedado a la vista.

## 3. Disolver al entrar Isabella: el golpe tiene que sonar antes de su voz

La V3 entró a corte porque HK05 no tenía aire; aquí las tres tomas lo tienen (0,81 · 0,57 · 0,86 s) y entran con disolvencia que **acaba en un golpe**. Con `desde` = «el frame anterior a su primera palabra» la voz suena 1 f después del golpe y la música (que baja 16 dB para la voz) tapa ese golpe. **Se deja de 2 a 3 f de aire a propósito** (`desde` = `round(s0·30) − 3` en el hook y el CTA y −2 en la mitad: con −3 su última palabra acabaría en f724, justo el límite que deja la disolvencia a la alcoba, y con −2 acaba en f723) y la envolvente de la música sube a su nivel «solo» hasta el golpe y baja en esos 2-3 f. La puerta lo comprueba (`el golpe de cada disolvencia suena entero y la música baja después`), y sobre el render los cuatro golpes suenan a ≤ 0,4 f.

## 4. R31 otra vez: el DTW fue de 3 a 11 f pronto o tarde

`trozos-editoriales.mjs` puso «y agendamos una visita.» 11 f TARDE (su «y» arranca en 2,01 s y el DTW la ponía en 2,38), «sin terminar,» 8 f PRONTO y «definir.» 5 f tarde. Con `onsets-voz.py` + `palabras-desde.py` se llevan a su palabra y `lineas-vs-onsets.py` da 0,8-2,5 f de adelanto en las 15 líneas. Dos cosas nuevas: (1) **un «un» pegado a «viendo» o a «buscando» no tiene onset propio**; se mide con `palabras-desde.py` cortando cada 0,04 s hasta que desaparece de lo que oye whisper; (2) **«puedes definir» deja dos onsets en 5,085 y 5,345 s**: el primero es el «-des» de «puedes» y el segundo el «de-» de «definir» (la prueba: whisper oye «de finis» desde los dos).

## 5. Dos palabras dudosas que el registro no resolvía: se miden, no se eligen

- **«reto»/«resto» (CT06).** Whisper-small da 0,96 de confianza a «resto» (y 0,16 a «el»): es el prior del modelo, no evidencia acústica. Para una /s/ se mide la envolvente de **alta frecuencia** (banda 4,5-9,5 kHz, `HF − LF` en ventanas de 10 ms): una fricativa sale como un tramo de ruido de +27 / −3 dB, y entre «el» y la pausa (donde caería la /s/ de «resto») sale −40 dB. Dos /s/ antes de la pausa («Si» y «es»), no tres. Una medida, no un oído: la nota «POR CONFIRMAR AL OÍDO» se queda y `--final` falla.
- **«terminado»/«determinado» (HK03), que el registro NO anotaba** (el catálogo sí). Cortando la toma desde 2,05 y 2,20 s (dentro de «totalmente») whisper oye «totalmente terminado», y «determinado» aparece solo si el corte incluye el «-te» de «totalmente»; la palabra dura 0,78 s (4 sílabas a 0,17-0,19 s). Lo que sirve de prueba es **cortar por dentro de la palabra anterior**: el «de-» fantasma es el «-te» de «totalmente».

## 6. Un acento largo no cabe y la puerta lo dice con un número raro

El catálogo marcaba «**totalmente terminado,**» como un acento de dos palabras. En la puerta salió «83 px y se esperaban 75: solo la cursiva baja 8 px»: el motor encoge una línea de acento que no cabe a 99 px y la resta de 8 px de esta pieza ya no es la que se espera. No es un error de la resta: **la línea es demasiado ancha.** Se partió: base «un apartamento totalmente» + acento «**terminado,**» (una palabra, que además es la que carga el significado). Moraleja: en el guion marcado, un acento de 2 palabras largas se parte antes de pasar la puerta.

## 7. El plano que acaba mal empalma mal (y el color lo midió)

Con el cielo de RC04 a 3,0 s, `medir-color.py` dio **+31,7 de luma** en el empalme con el dron: a partir de los 2,5 s la cámara baja por el marco negro de la ventana. Se cortó a 2,2 s (en el golpe siguiente) y la alcoba se alargó hasta el último fotograma del clip (10,93-15,37 s). **Mirar dónde acaba cada ventana** (la hoja a 0,5 s por fotograma) antes de fijar su `dur`, no solo dónde empieza. Y la mitad (MD14), con la misma exposición que las demás tomas de Isabella, salía 20 niveles de luma más oscura que el patio (RC09) que acaba de verse; se subió `exposure` a +0,15 (σ de luma entre planos 7,5 → 6,7, saturación media +11 %, piel ≤ 1°).

## 8. La puerta es de la versión, no del formato

El `revisar-019.mjs` llevaba reglas de la V3 como si fueran del formato: «RC25 en el frame 0 y UNA vez», «el dron como primer plano del bloque 3», «sentido II», «la caída de ≈ 20 dB cae al entrar el CTA». Hubo que cambiarlas: **la apertura, la posición del dron, el sentido del paseo y la resolución de la música son decisiones de cada versión** y sus comprobaciones también. En el 020: RC22 en el frame 0; el dron como ÚLTIMO plano del bloque 5; sentido I; y el acorde final de la canción después de la última palabra del CTA y antes de la tarjeta (≤ 14 f). Lo que sí es del formato y se mantuvo igual: los seis bloques, las tres tomas de Isabella una por bloque, sin cifras, la primera toma sin texto, el cierre, el color y el 9b. **Para la V5 convendría separar la puerta común (lo del formato) de la tabla de decisiones de la versión**; hoy se copia entera cada vez.

## 9. Herramientas

- **`zsh` no separa palabras en `set -- $var`** (a diferencia de bash): tres veces el mismo error al lanzar tandas (`for spec in "a b c"; do set -- $spec …`). Dentro de `bash -c '…'` va bien.
- **`ffmpeg` con `cp -c` entre volúmenes falla** (`clonefile failed: Cross-device link`): el SSD del rodaje y el disco del proyecto no son el mismo volumen; el `cp` normal basta (los MOV de las tomas pesan 14-21 MB).
- El render a escala 1 con `--color-space=bt709 --image-format=png --gl=angle` tardó ≈ 3 min (234,9 MB) y la reducción con las etiquetas BT.709, segundos.
