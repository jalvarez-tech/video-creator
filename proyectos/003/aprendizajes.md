# Aprendizajes — Proyecto 003 (avatar a color + fondos planos / ámbar)

Segundo vídeo montado por el **director-video**. Primera vez que el cliente entrega
un **STYLE GUIDE cerrado** (mundo, paleta, tipografía, ley de movimiento) en vez de
un estilo suelto. Cambia el orden de trabajo: **el mundo se construye primero** y
las escenas se diseñan dentro de él.

## Qué funcionó (reusable)

### 1. Continuidad entre tomas SIN textura: mueve la luz, no el fondo
El brief pedía que los cortes se leyeran como *cambios de cámara dentro de un
mismo mundo*. La v1 lo resolvía con un fluido continuo; con fondos planos hay que
resolverlo con luz, y sale **mejor y más barato**:

- El degradado base es SIEMPRE el mismo → es "la sala".
- Cada toma de gráfico enciende su foco ámbar en una posición distinta
  (`TOMAS_GRAFICAS.cx/cy`) → es "el ángulo de cámara".
- El avatar se **desmonta** en las tomas de gráfico (no se ve): menos decodificación.

Aprendizaje general: la continuidad espacial la da la **iluminación**, no la
textura. Un fondo con textura es una forma cara de decir lo mismo.

### 2. La VOZ va en su propio `<Audio>`
Si el avatar se desmonta, se lleva la narración con él. Patrón correcto:
`<OffthreadVideo muted>` montado sólo en las tomas de avatar + `<Audio src={mismo mp4}>`
**siempre** montado. Guardar como regla: **desmontar vídeo ≠ desmontar voz**.

### 3. Metal líquido barato y determinista (sin librerías) — *no usado en la versión final*
*(Se conserva por si vuelve a hacer falta una textura procedural.)*
`feTurbulence type="fractalNoise"` → `feColorMatrix` (canal R → alfa) →
`feComponentTransfer` con `feFuncA type="table"` **discontinua** (`0 0 0 .9 0 0 .55 0 0`).
La tabla en escalones convierte la nube de ruido en **contornos duros** = lectura
de metal, no de humo. Dos detalles que costaron entender:

- `feTurbulence` se evalúa en el **espacio de usuario**: mover el `x/y` del `<rect>`
  **no** desplaza el patrón. Hay que mover un `<g transform>` (o cambiar `seed`).
- Generar el filtro en un `viewBox` de 540×960 y estirarlo al 100 % cuesta **¼**
  de píxeles y no se nota (el resultado es suave por definición). El grano igual,
  en 360×640, rotando `seed` para que se mueva como grano de película.

### 4. Al avatar no se le suma luz — y probablemente tampoco se le grada
La v1 gradaba el avatar al carbón para cumplir *"no other colors anywhere"* y le
ponía el fluido encima en `screen`. El cliente pidió lo contrario: **a color y sin
nada sobreexpuesto**. Dos cosas que quedaron claras:

- **Lo que parecía sobreexposición no era del clip.** Medido: el original tiene
  `YMAX 237/255` y `YAVG 124` — perfectamente expuesto, cero recorte. Lo que
  quemaba eran mis capas en `screen`/`soft-light` encima. → [R13](../../manuales/edicion-video/reglas.md).
- **Gradar una cara es decisión de cliente, no técnica.** El coste es el tono de
  piel y la marca personal de quien habla. Enseñar las dos opciones en un frame
  habría ahorrado la vuelta entera. → contrapeso en [R11](../../manuales/edicion-video/reglas.md).

Consecuencia de quitar la grada: el scrim de la franja superior pasa a aportar
**todo** el contraste del sello (0.94 → 0.97 de opacidad, 560 → 640 px de alto).
Verificado con el luma real de la columna: 23 arriba → 150 en el ventanal.

### 5. "Snaps in hard, never fades" se implementa con `clip-path`, no con opacidad
Barrido `inset(0 X% 0 0)` de `SNAP` frames (0.15 s: 4 @25fps) + una línea ámbar viajando en el
borde. Se lee mecánico y nunca hay un fotograma "medio transparente".

### 6. El fondo bonito es el enemigo del mensaje
Se recorrió la escala entera: sustrato líquido llamativo → líquido empujado atrás
con un velo → **degradado plano**. Cada paso mejoró la lectura. El brief ya lo
decía (*"it never draws attention: it breathes underneath"*) y el destino final
fue el degradado plano. → [R12](../../manuales/edicion-video/reglas.md): el fondo
por defecto es plano y la textura se pide, no se regala.

Test que sigue sirviendo: si al mirar un frame puedes describir el fondo antes que
el titular, el fondo está demasiado alto.

### 7. Los sellos van a la banda de subtítulos, no sobre la cabeza
Primero fueron arriba, siguiendo [R08](../../manuales/edicion-video/reglas.md)
(franja superior, y < 340). El cliente los pidió abajo y **se ve mejor**: la cara
queda entera y limpia, y el ojo ya espera leer ahí en un vertical. R08 sigue
teniendo razón en lo suyo (no tapar cara ni subtítulo) — pero **sin pista de
subtítulos esa banda está libre**, y es su sitio natural.
→ [R14](../../manuales/edicion-video/reglas.md).

Lo que cambia al bajarlos:
- El scrim se **invierte** (`linear-gradient(0deg, …)`, ~830 px de alto). Clave:
  dejarlo algo más suave en el borde inferior para que las manos se lean como
  silueta detrás del texto; a plena opacidad el plano parece amputado.
- La cámara con `y` POSITIVO sigue ayudando, pero por otra razón: al bajar la
  imagen, a la altura del texto queda el torso en vez de las manos.

### 8. `whiteSpace: "nowrap"` en la tipografía clave
"EL EMBUDO NO VENDE" a 74 px partía en dos líneas, y el **cambio duro** a
"DESCARTA" aterrizaba a otra altura — el gesto de "misma posición, cambio
instantáneo" se perdía. Con `nowrap` en el primitivo `Clave` el fallo es imposible
de colar: si no cabe, se ve enseguida y se baja el cuerpo (74 → 62 px). Antes de
ponerlo, comprobar que **todos** los usos caben en los 844 px útiles, o `nowrap`
cambia un salto de línea por un desbordamiento (peor).

### 9. El fps y la duración salen del clip, no del brief
El STYLE GUIDE pedía "45 s, 30 fps" y el clip es 25 fps / 46.12 s. Se montó
primero a 30 fps y se rehízo a 25 fps siguiendo las reglas del sistema
([R01](../../manuales/edicion-video/reglas.md) + director §3a y §5). Lo que se
aprende del ida y vuelta:

- A 25 fps **no hay remuestreo**: cada frame de la comp es un frame del clip y el
  lip-sync es exacto. A 30 fps Remotion repetía 1 de cada 5 frames.
- La duración = los frames del clip **resuelve sola** el problema del cierre: el
  silencio natural del final (0.64 s) le da al CTA su latido, sin inventar nada.
- **Convertir tiempos entre fps se hace desde los SEGUNDOS de la transcripción**
  (`round(s * fps)`), nunca dividiendo frames por 1.2: dividiendo se arrastran
  redondeos y los golpes dejan de caer sobre la palabra.
- Las **duraciones** de los `SoundCue` también se escalan (12 f @30 = 10 f @25),
  o el efecto cambia de largo real.
- `SNAP` pasa de 5 a 4 frames para seguir siendo los 0.15 s del brief.

## Reglas nuevas para `reglas.md`

Ver **R10** (voz en su propio `<Audio>`), **R11** (gradar el avatar solo si el
cliente lo pide), **R12** (fondo plano por defecto), **R13** (nada que sume luz
sobre una persona) y **R14** (sellos en la banda de subtítulos) en
[reglas.md](../../manuales/edicion-video/reglas.md).

## A vigilar / mejorar

- **Desfase de audio del pipeline: −42.7 ms** (2048 muestras @48 kHz = el priming
  clásico de AAC). Medido **idéntico** en el final del proyecto 002, así que es del
  render de Remotion, no de la composición. Está dentro del umbral imperceptible
  (≤45 ms de retardo de audio, ITU-R BT.1359). Si alguna vez hace falta a cero:
  `ffmpeg -i final.mp4 -itsoffset -0.0427 -i final.mp4 -map 0:v -map 1:a -c copy salida.mp4`.
- **`--scale=0.6666667` revienta el render**: 1920 × 0.6666667 = 1280.000064 y
  Remotion exige alto entero. Para la prueba ligera de [R06](../../manuales/edicion-video/reglas.md)
  usa `--scale=0.5` (540×960) con este formato.
- **Medir siempre el texto más largo de cada sello contra los 844 px útiles**
  (1080 − 2×118 de zona segura). `«BUENAS, ¿PRECIO?»` a 78 px partía en dos líneas;
  bajado a 64 px + `nowrap`.
- Sin subtítulos quemados por decisión de dirección de arte (los sellos llevan el
  mensaje). `subtitulos-003.ts` queda listo: se activa con una línea.
