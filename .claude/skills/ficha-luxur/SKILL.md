---
name: ficha-luxur
description: >-
  La versión «con ficha» de los reels de propiedad de Propiedades Luxur: el reel
  SIN subtítulos y con la ficha fija de la propiedad durante todo el vídeo —arriba
  el tipo y el negocio («APARTAMENTO EN VENTA»), debajo el lugar («El Poblado · Ed.
  Los Patios») y el precio («$ 3.550 M COP»)—, en Montserrat, alineada a la
  izquierda con un filete dorado y dentro del cuadrado 1:1, hasta la tarjeta oscura
  del cierre. Deja `NNN-recorrido-ficha.mp4` junto a cada final, sin tocarlo, con el
  audio del final copiado tal cual. Úsalo cuando se pida «ponle la ficha», «el
  precio y la ubicación en el vídeo», «el tipo, la locación y el precio todo el
  vídeo», «versión para anuncios» o «que se lea en 1:1», para una pieza o para
  todos los reels de una propiedad.
---

# ficha-luxur — la ficha de la propiedad, todo el vídeo

Skill del ESTUDIO (marca Propiedades Luxur): vive en `.claude/skills/` y no viaja al
producto. Como `portada-luxur`, sí está en git (excepción `ficha-*` del bloque de
estudio de `.gitignore`).

Una versión más de cada reel, no un reemplazo. El final publicado sigue siendo el de
`recorrido-luxur` (primera toma sin texto, subtítulos editoriales). La versión con
ficha, por encargo del 2026-10-17, **no lleva subtítulos** («que no salgan los
subtítulos») y lleva texto desde el fotograma 0: es para anuncios y para el feed, donde
el vídeo se ve recortado a 1:1 y sin la ficha nadie sabe qué se vende ni a qué precio.

## 1. El diseño (aprobado el 2026-10-17)

No se renegocia pieza a pieza: si el usuario cambia algo, se cambia la constante `D` de
`scripts/ficha.mjs` y esta tabla, y se rehacen las que haga falta (`--rehacer`).

| Elemento | Cómo |
|---|---|
| Lienzo | El del vídeo (9:16). Medidas en píxeles de 1080 × 1920; con otro tamaño se pinta a escala |
| Tipo + negocio | Montserrat 500, 36 px, mayúsculas, interletrado 0,28 em: `APARTAMENTO EN VENTA` (empezó a 28 px: «un poco más grande») |
| Lugar | Montserrat 400, 54 px, a 20 px: `El Poblado · Ed. Los Patios` (sector · edificio; sin edificio, el municipio) |
| Precio | Montserrat 500, 50 px, a 14 px: `$ 3.550 M` + `COP` a 24 px con interletrado 0,30 em |
| Filete | Vertical, 2 px, dorado `#c6a878` (el de la línea de la portada), del alto del bloque, en x = 96; el texto a 34 px |
| Posición | Alineada a la izquierda, **en el tercio de abajo del cuadrado 1:1**: el bloque va de y ≈ 1220 a 1420 (el cuadrado es y 420-1500) |
| Ancho | Cada línea cabe en 840 px (a esa altura, a la derecha, van los iconos de Instagram); si no, baja de 2 en 2 y el script lo avisa |
| Velo | Radial, solo detrás del texto y sin caja (60 % en el centro) |
| Tiempo | Entra con un fundido de 0,5 s desde el fotograma 0 y se va en 0,4 s justo cuando empieza la tarjeta oscura (logo y web) |

Por qué abajo: la propuesta aprobada iba arriba del cuadrado (y = 500), y ahí le caía
a Isabella sobre la frente y los ojos en sus planos medios (medido con detección de
caras: en los 23 reels, de 2 a 15 s por pieza). Sin subtítulos, el tercio de abajo
queda libre y su cara también.

## 2. Los datos: `propiedades/<propiedad>.json`

Uno por propiedad, con el tipo, el negocio, el lugar, el precio (en MILLONES de COP, como
número) y de dónde salió cada dato:

```json
{
  "propiedad": "Apartamento de 317 m² en Los Patios, El Poblado (Medellín)",
  "web": "https://propiedadesluxur.com/es/propiedades/…",
  "tipo": "Apartamento",
  "negocio": "venta",
  "lugar": "El Poblado · Ed. Los Patios",
  "precio": 3550,
  "fuente": "Precio de la web (JSON-LD price 3550000000 COP), leído el 2026-10-17."
}
```

- **El precio sale de la ficha de la web**: el `price` del JSON-LD de la página, no el
  texto, porque la página lista también propiedades similares con otros precios. Si el
  usuario dice otro, manda el suyo y se anota en `fuente`. Un precio en pantalla es un
  dato que se publica: ante la duda, se pregunta antes de exportar.
- **El negocio no se supone nunca** (`venta`, `renta` o `ambos`), como en la portada.
- **El tipo** es el de la web en minúscula de frase (`Casa campestre`, `Lote campestre`).
  «Apartamento nuevo» se queda en `Apartamento`: con «NUEVO» la línea no cabe.

| Propiedad | JSON | Texto |
|---|---|---|
| Los Patios (El Poblado) | `los-patios` | APARTAMENTO EN VENTA · El Poblado · Ed. Los Patios · $ 3.550 M COP |
| One Living (Envigado) | `one-living` | APARTAMENTO EN VENTA · Loma del Escobero · One Living · $ 843 M COP (lugar a 52 px) |
| Casa campestre (Guarne) | `casa-campestre-guarne` | CASA CAMPESTRE EN VENTA · Guarne · Antioquia · $ 3.000 M COP |
| Lote campestre (El Carmen) | `lote-el-carmen` | LOTE CAMPESTRE EN VENTA · El Carmen de Viboral · $ 800 M COP |
| Tierra Grata (El Poblado), ARRIENDO | `tierra-grata` | APARTAMENTO EN RENTA · El Poblado · Tierra Grata · $ 14,8 M COP / MES (desde el 2026-10-19: en renta el precio es el canon mensual y lleva decimales: `miles()` pinta «14,8» y la moneda dice «COP / MES») |

## 3. Hacerla

**a. La base sin subtítulos.** Cada `RecorridoNNN` (017-038 en la rama; la plantilla de
`recorrido-luxur` para los nuevos) acepta `sinSubtitulos`, que apaga los subtítulos y su
velo y no toca nada más. Se renderiza MUDA y casi sin pérdida, con el material de la pieza
en `remotion/public/recorrido-NNN/` (si no está, se repone con `proyectos/NNN/normalizar.mjs`
y los originales del SSD que dice su receta):

```
cd remotion
npx remotion render src/index.ts RecorridoNNN <tmp>/NNN-limpio.mp4 --props={"sinSubtitulos":true} --muted --crf=6 --x264-preset=fast --color-space=bt709 --image-format=png --gl=angle
```

Se comprueba contra el final publicado: los mismos fotogramas y la mitad de arriba (donde
nunca hubo subtítulos) casi idéntica (PSNR > 30 dB). Si no, el código ya no es el de esa
final y no se sigue.

**b. La ficha y el audio del final:**

```
node .claude/skills/ficha-luxur/scripts/ficha.mjs video los-patios <tmp>/017-limpio.mp4 --audio "<carpeta>/017-recorrido.mp4" --salida "<carpeta>/017-recorrido-ficha.mp4"
```

Chrome (el de Remotion, con la Montserrat del motor) pinta la ficha en un PNG
transparente; ffmpeg la superpone con sus fundidos de alfa (en BT.709, para que el dorado
no vire), recodifica a CRF 12 y COPIA el audio del final (`-c:a copy`): suena exactamente
lo publicado, sin el desfase de ≈ 43 ms del AAC del render de Remotion. El script
comprueba que la salida tiene los mismos fotogramas que la entrada y que el audio dura lo
mismo. La tarjeta oscura se detecta sola (la cola con luma media < 32).

`lote <propiedad> --carpeta <reels> --limpios <dir>` hace (b) para todos los
`*-recorrido.mp4` de la carpeta (los `-crf16` no) con sus `NNN-limpio.mp4`.

**c. Lo intermedio se borra** (encargo: «elimina después los archivos para optimizar
espacio»): el `NNN-limpio.mp4`, el material repuesto en `remotion/public/recorrido-NNN/`,
los enlaces de `proyectos/NNN/original/` y el bundle de cada render en el tmp
(2-2,5 GB cada uno). En la carpeta de la propiedad solo queda, junto a cada final, su
`NNN-recorrido-ficha.mp4`.

## 4. Revisar antes de entregar

`ficha.mjs hoja <vídeo>` deja 12 fotogramas: el principio (la ficha entra), seis del
cuerpo, la salida y la tarjeta (ya sin ficha). Se mira cada hoja (Read del JPG): que no
quede ningún subtítulo, que la ficha no choque con nada y que se vaya antes del logo.

## 5. Cuando falta material

El material normalizado de 020-038 se borró con la limpieza de worktrees del 2026-10-12;
se repone enlazando los originales del SSD que lista cada receta (`<propiedad>/Videos/…`;
los nombres con tilde pueden venir en NFD: se comparan normalizados) y corriendo su
`normalizar.mjs` en el worktree donde se renderiza.

Si un original ya no existe, la pieza no se puede renderizar entera. Pasó con los drones
del 2026-08-26 de El Carmen (030, 031, 034), sustituidos en el SSD por los del 14-10. Se
hizo así: render con un relleno negro donde iba el dron, y en los fotogramas donde se veía
(PSNR por fotograma < 30 dB contra el final, mitad de arriba) se ponen los del final
publicado. Solo vale si en esos fotogramas no hay subtítulos: se mide antes contra
`subtitulos-NNN.ts` y se miran los bordes. Luego se exige que el resultado se parezca al
final en todos los fotogramas (mínimo > 30 dB).

## 6. Lo que ya está hecho (2026-10-17)

23 versiones, `NNN-recorrido-ficha.mp4` junto a cada final, comprobadas una a una: los
mismos fotogramas que el final y el audio idéntico (md5 del flujo).

| Propiedad | Reels |
|---|---|
| Los Patios | 017, 018, 019, 020, 021, 025 |
| One Living | 022, 024, 026, 027, 028 |
| Casa campestre de Guarne | 029, 032, 033, 036, 038 |
| Lote El Carmen (solo los `-recorrido.mp4`) | 030*, 031*, 034*, 040, 041, 042, 043 |

\* Con los drones del final (§5).

No estaban en las carpetas, y por eso no tienen versión con ficha: el 023 (One Living) y
el 037 (casa campestre).
