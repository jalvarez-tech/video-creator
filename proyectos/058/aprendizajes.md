# Aprendizajes — proyecto 058 (V40 · Apartamento en Palmazera, «60 m² que rinden»)

Lo que funcionó y lo que no al montar este reel (la segunda versión del apartamento, con la composición y la puerta del 056 y el hook a corte del 042). Para la siguiente versión de este apartamento o de otro con material parecido.

## 1. Un hook sin aire entra a corte, y la música tiene que estar abajo ANTES del corte

HK02 empieza a hablar a los 0,10 s (3 f) y HK03, su gemela, también. Con una disolvencia el clip necesitaría 12 f antes de su `desde` y la primera palabra caería dentro del fundido, así que entra **a corte** (`desde` 0, desclic de 2 f, `DESCLIC_HOOK` en `audio-058.ts`) y la regla «la bajada acaba antes de la primera palabra» se cumple bajando la música **durante los 15 f de la apertura** (golpe de 14,6 dB en el f66, bajada f69-f84, corte en el f84, primera sílaba en el f87). Consecuencia declarada: el hook no cae en un golpe. La mitad (voz a 0,42 s) y el CTA (a 0,60 s) pasan lo mismo con la disolvencia: la primera palabra suena a 0,6 f y 1 f del `en`, así que la bajada también ACABA en el `en` y el golpe en que «acabaría» la disolvencia quedaría bajo la voz. La puerta lo comprueba con el **último golpe entero** (`previo*`) en vez de con el golpe de entrada.

## 2. El DTW de whisper va de 3 a 9 f PRONTO a mitad de frase; la voz sola manda

En estas tres tomas (habla a 7,6-8,2 sílabas por segundo) el alineador puso «se siente» 9 f antes de su palabra y «en Palmazera» 8 f. Se resolvió con (a) `onsets-voz.py` (los valles profundos son las oclusivas: /p/, /d/, /k/ marcan el comienzo de palabra) y (b) un detector de núcleos silábicos (`herramientas/silabas.py`) (suavizado de 40 ms, prominencia de 0,6 dB: da ≈ 26 picos en una frase de 27 sílabas), contando sílabas desde una pausa conocida. `palabras-desde.py` (cortar y volver a transcribir) devolvió texto inventado en tramos de < 0,5 s: sirve para saber de qué lado cae una palabra, no para ponerle un segundo.

## 3. El validador de subtítulos pide ≥ 2 s entre acentos

El primer plan llevaba dos acentos en el hook («descansar,» y «al caos.», a 1,5 s): `revisaSubtitulosEditoriales` lo tumbó («con menos de 2 s entre acentos ninguno destaca»). Se dejó el de la promesa (descansar) y «al caos.» pasó a base. Cuenta los acentos de cada toma contra la velocidad de la frase antes de marcarlos.

## 4. Un CTA a contraluz se gradúa con la exposición, no con el contraste

CT01 se rodó con el balcón detrás y ropa y sofá oscuros: luma media 85 y 17 % aplastado. `exposure` +0,36 y `shadows` +0,45 (con `highlights` −0,35 para no quemar el balcón), sin tocar la saturación de la piel (≤ 1,06) ni la temperatura (±0,06): luma 94-122 (el iPhone sube la exposición durante la toma, así que el principio es más oscuro que el final). El tungsteno del primer baño amarillea: `temperature` −0,06 con `saturation` 1,04.

## 5. `golpes-render.py` vuelve a dar un falso desfase (−4,9 f en el f384)

Igual que el −5,0 f del 056: el golpe de 10,6 dB está dentro de un arpegio denso y el detector «retrocede hasta donde la energía deja de bajar». Comparados los perfiles de energía del render y de la fuente (misma resta de 42 ms, `herramientas/perfil-energia.py`), coinciden fotograma a fotograma salvo una constante de ≈ 4 dB (la ganancia): el golpe suena a su sitio. Antes de mover un corte por un desfase de ese tamaño, comparar los perfiles.

## 6. La canción es muy alta y no tiene pulso

*Ivory Skyline Reverie* mide −11 a −12,5 LUFS con picos de +1,4 dBFS **en la fuente**: la ganancia para dejarla a −15 LUFS (−2,6 a −4,2 dB) deja el pico en −1,2 dBFS en el bloque 5, justo en el tope de la puerta. Como no tiene pulso (el mejor periodo alinea el 25 % de los golpes fuertes) pero sí un golpe cada 0,35-0,7 s, se cortó donde el paseo lo pedía y se buscó el golpe más cercano ≥ 10 dB: no hace falta una búsqueda por programación dinámica (`buscar-cortes-lp.py`) cuando hay tantos golpes.

## 7. Normalizar con la máquina cargada tarda ×10

Con tres sesiones normalizando y renderizando a la vez (carga 38-57), los 28 recorridos y los drones tardaron ≈ 20 min (≈ 2 min sin carga); el render de la prueba, ≈ 4 min. Se aprovechó la espera para medir las voces, la canción y la rejilla. Un worktree que se comparte con otras sesiones no tiene límite de CPU: conviene dejar un trabajo largo en segundo plano y no tocar nada de lo que escribe.

## 8. Trampas del shell en este checkout (zsh)

- `set -- $var` y `for x in $var` **no separan** (zsh no parte las variables sin comillas): un bucle `for` con `ffmpeg`/`uv` dentro devolvió el uso del script en lugar de ejecutarlo. Para cada medida, la orden suelta o un script de Python con `subprocess`.
- `echo =====` falla en zsh («===== not found»: `=` expande a una ruta); usar `echo "-----"`.
- Un `cd` dentro de una orden mueve el directorio de trabajo de la sesión: cada orden que mire rutas relativas empieza con `cd` a la raíz del repo.

## 9. Qué se reutilizó y qué no

- Del **056** (la más reciente con DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA y una canción sin pulso): la composición con `sinSubtitulos` y los subtítulos al 90 % con la cursiva 8 px menor, la envolvente de la música (`fundido()` + `trocea()`), la puerta (con la mitad de sus secciones reescritas: 2a, 2f, 4 y 4b) y la receta de normalizar. Del **042**: la idea del hook a corte. La plantilla de `recorrido-luxur` (el andamio de `nuevo-recorrido.mjs`) no trae todavía el hook a corte ni `sinSubtitulos`: se copió del 056.
- Las herramientas de la pieza (`herramientas/`): se heredaron las del 056 y se tocaron `probar-voz.py` (las tres tomas) y `lineas-vs-onsets.py` (las 17 líneas). Se añadieron dos scripts: `silabas.py` (el detector de núcleos silábicos) y `perfil-energia.py` (el comparador de perfiles de energía render/fuente); valdría la pena subirlos al juego común de `recorrido-luxur`.
