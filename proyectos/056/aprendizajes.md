# Aprendizajes — proyecto 056 (V38 · Casa en Condominio Los Bravos, «Solo 6 casas»)

Lo que funcionó y lo que no al montar este reel (la tercera versión de la casa, con la estructura y la canción de la V9/025). Para la siguiente versión de esta casa o de otra con material parecido.

## 1. La rejilla de una canción sin pulso: el hook pide aire detrás

`buscar-cortes-lp.py` (V9) da las rejillas de nueve planos sobre los golpes medidos y cuenta cada plano desde el golpe en que entra. Lo que no cuenta: **tras la última palabra de una toma el golpe del plano siguiente tiene que sonar con la música ya arriba** (R33), y la subida con curva pide ≥ 15 f. Con el hook de 107 f (4 f de aire) salió la rejilla «bonita» y el golpe del corte caía con la música a −16 dB. Se rehízo con `R1 = [113, 165]`, `MIND = 9`, `E0 = 175-181` y se eligió la de golpes más fuertes (9,2-15,5 dB): hook de 120 f, 17 f de aire. **Se pide el aire en `R` desde el principio** (última palabra + 15 f + 2).

La mitad no tiene el problema: sale por disolvencia en un golpe y tiene 25 f.

## 2. El material de este rodaje no es el de las otras propiedades

- Los MOV de Isabella y los recorridos son **1080×1920 SDR BT.709 verticales y sin rotación** (no HLG, no `rotation=-90`): `normalizar.mjs` los toma por la rama SDR y NO hay que recortar (la rama «apaisado» de la plantilla recortaba a 9:16 todo lo que no tuviera rotación; aquí se comprueba el alto contra el ancho). Se escalan a 1296×2304 (×1,2).
- Van a **60 / 59,94 fps** (y `avg_frame_rate` 59,97): `-fps_mode cfr -r 30` basta; el truco `setpts=PTS*1000/1001` es solo para el dron (29,97).
- **`limites-voz.py` da cifras absurdas** con estas tomas aunque se le baje el margen (hook «0,96 → 1,41 s» cuando habla de 0,80 a 3,82): el suelo de ruido está a −55 dBFS y la voz queda a −23 LUFS. Lo que vale es el **perfil de energía de 20 ms en la banda de la voz** (`envolvente-voz.py`, y un listado de los valles por debajo de «pico − 35 dB»), como en el 042. Isabella habla **muy rápido** en el hook (23 sílabas en 3,0 s, ≈ 7,7 por segundo); CT01 deja 1,86 s de silencio antes de la primera palabra (con un golpecito del micro a los 0,7 s, fuera de la ventana tratada).
- **Normalizar el dron entero (120 s, 4K) tarda ≈ 10 min y pesa 764 MB**: vale la pena en una sola pasada porque todas las herramientas (`perfil-mov.py`, `ventana-fina.py`) leen el MP4 normalizado.

## 3. El corte de escena del dron cambia de sitio al normalizar

`varias_tomas.MP4` tiene su corte de escena a los 86,05 s de la fuente (29,97 fps). `setpts=PTS*1000/1001` lo lleva al 85,967 s del archivo normalizado (30 fps exactos). La puerta (`2f`) comprueba que ningún plano del dron se vea antes de 85,96 + 0,3 s con esa cuenta, incluida la entrada con disolvencia (lo que se ve empieza 12 f antes del `desde`).

Justo tras el corte el dron va a toda velocidad (movimiento 18 → 4 en 1 s): no sirve. De lo que viene después hay **dos ventanas buenas** (`perfil-mov.py` y `ventana-fina.py`): la pasada cenital uniforme de los 95-104 s (movimiento 8,6, dispersión 0,014) y la **inclinación que frena sola** de los 105,5 a los 109,2 s (movimiento 18 → 0,5), que acaba en un valle quieto. La inclinación como último plano de un bloque funciona como «vista» (el dron levanta la mirada y se posa) y un empuje 1,00 → 1,06 evita que la parte quieta parezca una foto.

## 4. `golpes-render.py` puede dar un falso desfase de cinco frames

En el corte del f764 el detector marcó −5,0 f (otros cuatro cortes, ≤ 0,4 f). Comparado el perfil de energía de la fuente y el del render (misma resta de 42 ms), el golpe de 203,400 s suena a su sitio (+9,7 dB en la fuente, +8,7 en el render): el detector **retrocede hasta donde la energía deja de bajar** y, en el render (AAC), esa subida tiene un suelo previo más largo. La correlación del audio del render contra la canción (`−42,3 ms` en bloques de 1 s de toda la pieza) es la prueba buena. Antes de mover un corte por un desfase de ese tamaño, comparar los perfiles.

## 5. La palabra dudosa

«privacidad» (HK04) la oye whisper como «prioridad». Cómo se midió y por qué no cierra: `sibilantes.py` (resalte de fricativa a los 1,60-1,66 s donde cae la «ci») a favor; la velocidad de la frase (≈ 11 sílabas por segundo en esa palabra) en contra de cualquier medida fina. Se pinta «privacidad» (sentido de la frase y ángulo) y se pregunta antes de la final.

## 6. Trampas del shell en este checkout (zsh)

- `sed -i` en macOS pide un argumento de copia (`-i ''`); un `&&` detrás lo esconde. Para editar, Python o la herramienta de edición.
- `set -- $var` no separa en zsh, y un bucle con variables dentro de `ffmpeg` falló con «grep» vacío (la misma orden suelta funcionó): para cada medida, la orden suelta o un script.

## 7. Qué se reutilizó y qué no

- De la **042** (la más reciente con la estructura DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA): la composición, `cierre`, la receta de normalizar, la puerta y las herramientas. De la **053**: `sinSubtitulos` (la base de la versión con ficha). De la **025**: la música (`buscar-cortes-lp.py`, los golpes ya medidos y el diseño de las rampas: golpe de la entrada entero, bajada de coseno DESPUÉS y antes de la primera palabra).
- La puerta se adaptó en tres sitios (4 y 4b: golpes medidos y rampas; 2a, 2e y 2f: las cifras que ella dice, CT01, el ángulo y el dron tras el corte de escena) y en `7b` ya no falla si el plan de otra sesión no carga (las dos sesiones hermanas escriben su plan en el mismo checkout).
