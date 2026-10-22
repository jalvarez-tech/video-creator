# Aprendizajes — proyecto 057 (V39 · Apartamento en Palmazera, «Que se respire paz»)

Lo que funcionó y lo que no al montar este reel (el primero del apartamento; la estructura de la 056 con la canción de la 042). Para la siguiente versión de este apartamento o de otra con material parecido.

## 1. Con piano, la rejilla se simplifica: solo los cortes SECOS piden golpe

`buscar-cortes-lp.py` (V9) resuelve nueve planos con **diez** cortes en un golpe medido, y con *Silver Skies* (golpes de 6-9 dB cada 0,4-1 s salvo cuatro) no daba holgura: la canción tiene un respiro de 4 s bajo el hook y un lecho débil bajo el CTA. Se hizo a mano, con la regla de la 037: **las disolvencias van libres** y solo los tres cortes secos caen en un golpe medido (17,4 dB el acorde que vuelve tras el respiro, 8,2 y 8,0 dB los otros dos). El resultado, comprobado sobre el audio del render, cae a −0,2 / −0,3 / −0,4 f. La puerta (`revisar-057.mjs`, secciones 4 y 4b) se reescribió para eso: `FUERZA_MIN_CORTE_SECO = 8,0`, y las disolvencias de la mitad y de la alcoba, que acaban en un golpe por limpieza, `≥ 7,0`.

**La entrada de la canción se elige por lo que cae bajo el hook**, no por el golpe más fuerte: entrar en el golpe de 48,816 s (9,8 dB, no el de 46,648) hace que el respiro de la canción caiga bajo la voz del hook (3,3 s) y el acorde de 17,4 dB abra el paseo 4,6 s después del hook. Y la caída natural (79,5 s) cae sobre el CTA, 18 f después de su primera palabra. Hay otro acorde de 19,5 dB a los 82,727 s (f1020) que tiene que quedar fuera: la música se apaga antes, y esa condición decide cuánto puede durar el CTA.

## 2. La música bajo la voz SIGUE la curva de la canción

Con una ganancia fija bajo el hook, el respiro de la canción (de −20 a −29 LUFS en 3 s) hubiera quedado a −31: inaudible. Y bajo el CTA, la caída (de −16,9 a −27,2 LUFS) hubiera dejado la música a −37. Se midió la sonoridad momentánea de 400 ms (`ebur128=metadata=1,ametadata=print:key=lavfi.r128.M`) y la ganancia es `−26 − M` en cada momento con tope de 0 dB (`MOMENTANEA` y `bajoDe()` en `audio-057.ts`); la puerta estima el nivel bajo cada voz con la misma tabla y exige ≥ 9 LU bajo ella (sale 10,2). **Cuidado**: la subida de ganancia bajo el CTA (de −9,7 a 0 dB) tiene que ir DETRÁS de la caída de la canción (empezó 3 f antes y quedaba a 8,9 LU; con 22 f de retraso y 24 de curva, a 10,2).

## 3. Whisper small se come las palabras de relleno y se confunde con las vocales pegadas

- «¿Cuándo fue la última vez que llegaste a casa y sentiste que **de** verdad descansaste?» → whisper: «…sentiste que verdad descansaste» (el «de» desaparece).
- «Agenda tu visita y **vive** la experiencia…» → whisper: «y **ve** la experiencia» (dos transcripciones, desde el principio y desde ese punto).
- Y, como siempre, pone la primera palabra de cada toma en 0,00 s (R29) y su DTW va 0,1-0,5 s pronto: tres líneas salían 5-7 f antes de su palabra. La tabla de `lineas-vs-onsets.py` (el segundo de cada palabra, comprobado con `onsets-voz.py` y `palabras-desde.py`) las llevó a 0,0-2,4 f.
- **Ninguna de las dos dudosas se cierra con medidas** (envolvente a 10 ms y formantes a 20 ms): en «de verdad» la /e/ de «de» y la de «ve-» son la misma vocal; en «vive» los dos fotogramas de /i/ y los dos picos de energía apuntan a lecturas distintas. Se pintan como las da el encargo y se dicen con el segundo exacto. Un modelo más grande (medium) o un oído lo cierran en segundos.

## 4. El material de este rodaje no es el de las otras propiedades (y es igual que el de la casa de La Ceja)

- MOV de Isabella y recorridos: **1080×1920 SDR BT.709, verticales, sin rotación**, VFR a 60/59,94 fps: `-fps_mode cfr -r 30` basta; el truco `setpts=PTS*1000/1001` es solo para los drones (29,97 fps, 4K, `rotation=90`).
- **Isabella entra al encuadre hablando** en las tres tomas: HK01 camina a su sitio (su voz empieza a los 0,92 s con ella ya en cuadro); en MD06 la cámara empieza en el ventanal y **ella entra por la derecha a sentarse mientras dice las primeras palabras** (su cara no se ve hasta ≈ f485, 15 f después de la primera sílaba); en CT02 la cámara empieza en una planta y ella entra por la derecha. No se puede evitar sin cambiar la toma (las tres están en el reparto) y se declara.
- Las tomas tienen 0,7-0,9 s de silencio delante, así que la disolvencia de entrada cabe (`desde` 12-15 f) y la primera palabra suena a 10-13 f de su `en`: la bajada de la música tiene que ser de 8-10 f para acabar 2 f antes; el golpe de una disolvencia que acaba justo ahí (la mitad) suena entero porque la bajada empieza en él.

## 5. Elegir planos por su movimiento: un reel de paz con planos lentos

`perfil-mov.py` (diferencia media entre fotogramas, por 0,5 s) dio el criterio: RC11 (pasillo) 1,4-4,5, RC04 (cama) 2-6, RC02 (alcoba) 2-6 hasta los 5,5 s, DR01 y DR03 (drones) 1,3-4 frente a 15-30 de RC16 y 8-22 de RC08. **Menos planos y más largos** (dos de 3,7 y 4,6 s en el paseo, tres de 3,3-3,5 s en el bloque 5; 10 planos en 36 s) dan la sensación de paz que el hook promete; cortar a cada golpe la rompería.

## 6. El color: un cielo saturado «quema» canales aunque su luma sea buena

El cielo de DR03 pasó de 2,6 % a **13,0 %** de píxeles con algún canal ≥ 250 con los ajustes de partida (`highlights −0,3`, `whites −0,15`, `saturation 1,04`): el azul satura el canal B. Con `exposure −0,1 · highlights −0,45 · whites −0,3 · saturation 1,0` bajó a **0,0 %** (`medir-color.py`, ≥ 250). Las tomas de Isabella en sombra (ella sentada contra un ventanal) subieron de luma con `exposure +0,15…+0,2` y `shadows +0,2…+0,25`, sin tocar `saturation` (≤ 1,04) ni el tono de la piel (±2°).

## 7. Cómo trabajan tres sesiones sobre el mismo checkout (y no se pisan)

- La carpeta de notas de la sesión (`side-session-notes/<id>/NNN-tramos-de-recorrido.md`) fue el canal: cada sesión escribió **antes** de elegir qué clips reclamaba, leyó las de las demás y lo acordaron por escrito (la 058 recibió la cocina y los baños; la 059 liberó RC11, RC17, RC25, RC26 y RC27). Resultado: **ni un segundo de metraje en común** de esta pieza con las otras dos (la sección 7b de la puerta lo comprueba contra sus planes).
- `stills-antes.mjs` **reescribe el plan** (`metraje-NNN.ts`, sin sus líneas `color:`) mientras renderiza y lo restaura byte a byte: no se puede lanzar la puerta ni un `lint` a la vez desde otra terminal.
- `nuevo-recorrido.mjs` deja las plantillas genéricas; en esta tanda era más corto **clonar el proyecto de la sesión hermana más reciente** (la 056, con la misma estructura) con el número cambiado (`(?<!\d)056(?!\d)` → `057`) y reescribir plan, audio, subtítulos y puerta: la puerta de la 056 estaba atada a su dron (el corte de escena), su canción (golpes en cada cambio) y su CTA (`escríbeme`).

## 8. Trampas del shell en este checkout (zsh)

- `echo =====` falla (zsh lo toma como un comando): usa un `printf` o nada.
- `sleep 30 && …` está bloqueado por el arnés: para esperar un render, `run_in_background` y la notificación; mientras, se escribe.
- El `cd` de una llamada persiste: `(cd remotion && npm run lint)` en un subshell, o rutas absolutas.
