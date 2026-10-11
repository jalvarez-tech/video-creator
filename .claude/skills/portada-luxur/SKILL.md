---
name: portada-luxur
description: >-
  La PORTADA 9:16 (la imagen de cover) de cada reel de propiedad de Propiedades
  Luxur: el mejor fotograma de la propiedad sacado de la final, oscurecido, con
  la LOCACIÓN en Safira March, una línea de su mismo ancho y el TIPO DE NEGOCIO
  (Venta, Renta o Venta & Renta) en Montserrat, centrados en la mitad, y el
  isotipo «PL» abajo. Se genera SIEMPRE junto a la final de un recorrido
  (`recorrido-luxur`, al exportar) y también suelta, para reels ya exportados.
  Úsalo cuando se pida «la portada», «la miniatura», «el cover», «la imagen del
  reel» o «la imagen para subir con el vídeo», y al exportar la final de
  cualquier vídeo de una propiedad de Luxur. No es el frame 0 del vídeo (eso es
  R23 de `recorrido-luxur`): es una imagen aparte que se sube como portada.
---

# portada-luxur — la portada del reel de una propiedad

Skill del ESTUDIO (marca Propiedades Luxur): vive en `.claude/skills/` y no viaja
al producto. A diferencia de `recorrido-luxur` y `guion-luxur`, esta SÍ está en
git (excepción en el bloque de estudio de `.gitignore`), con su letra: ver §5.

Una pieza, una portada: cuando se exporta la final de un recorrido se genera su
portada en el mismo paso, y se entregan juntas. El reel se sigue abriendo con la
casa limpia en el frame 0 (regla fija 1 de `recorrido-luxur`); la portada es otra
imagen, la que se sube como «cover» y la que se ve en la cuadrícula del perfil.

## 1. El diseño (aprobado el 2026-10-11 sobre el 017, en cinco revisiones)

No se renegocia pieza a pieza: si el usuario cambia algo, se cambia la constante
en `scripts/portada.py` y esta tabla, y se regeneran las que haga falta.

| Elemento | Cómo |
|---|---|
| Lienzo | 1080 × 1920 (9:16), PNG |
| Fondo | Un fotograma de la FINAL (con su color), oscurecido: velo parejo del 38 %, una franja más oscura en la mitad (el texto), algo más de peso abajo (el isotipo) y viñeta suave |
| Locación | Safira March Medium, 84 px, mayúsculas, interletrado 0,10 em, blanco |
| Línea | 2 px, blanca, **del mismo ancho que la locación** (de la tinta de la primera letra a la de la última), a 44 px de la versal de arriba y de la de abajo |
| Tipo de negocio | Montserrat 500, 56 px, mayúsculas, interletrado 0,30 em, blanco: `VENTA`, `RENTA` o `VENTA & RENTA` |
| Posición del texto | Los tres (locación, línea, negocio) como un bloque, **centrado en la mitad vertical** (su centro en y = 960) y en X por la tinta |
| Isotipo | `PL` blanco y OPACO, 150 px de ancho, centrado, con su borde inferior en y = 1640 |
| Zona segura | Todo dentro del recorte 3:4 de la cuadrícula del perfil (y 240-1680): en 9:16 se ve entero al abrir el reel y en el perfil no se corta nada |
| Sombra | Muy suave bajo el texto (desenfoque de 10 px al 45 %): el velo hace el trabajo |

Si una locación es tan larga que no cabe en 840 px de tinta, el script baja la
letra de 2 en 2 hasta que cabe (y lo dice). La línea la sigue, porque mide lo que
mide la locación.

Lo que el usuario fue corrigiendo, para no volver ahí: el isotipo empezó en el
centro y a 260 px («más pequeño», «pégalo al texto»), pasó por el 60 % de opacidad
(«quítale la opacidad») y acabó abajo y solo; el negocio empezó a 30 px («más
grande»); la línea empezó corta, de 120 px («del ancho de la locación»).

## 2. Los dos datos: locación y tipo de negocio

Salen de la ficha de la propiedad (la de `guion-luxur`) o del usuario. **El tipo de
negocio no se supone nunca**: «Venta» en una propiedad que se renta es un dato
falso en la pieza que más se ve. Si la ficha no lo dice, se pregunta.

- **Locación**: el barrio o sector tal y como lo dice el usuario, en mayúsculas
  (Los Patios → `EL POBLADO`). Con tildes si las lleva (`SAN NICOLÁS`): la Safira
  las tiene y se alinean por la versal, así que no descuadran la línea.
- **Negocio**: `--negocio venta`, `renta` o `ambos` (= `VENTA & RENTA`).

## 3. El mejor fotograma de la propiedad

Lo elige el agente mirando, no el script. En este orden:

1. **Solo la propiedad**: ni Isabella, ni subtítulos, ni la tarjeta de cierre, ni
   un fotograma a mitad de disolvencia (se deja ≥ 0,3 s de margen con el corte).
2. **Lo que la identifica**: la fachada o el dron del edificio primero; si no hay,
   el clímax del recorrido (la vista, la terraza, la piscina, el jardín); y si no,
   el mejor interior con luz.
3. **Que el texto se lea**: en la franja de la mitad (y ≈ 860-1060) y abajo, donde
   va el isotipo, nada de cielo quemado ni ventanal blanco. Lo dice el contraste
   que imprime el script (§4); si no llega, se cambia de plano o de tramo, no se
   sube el velo.
4. **El más nítido del tramo**: un dron que se acerca pierde detalle según avanza.
5. **Variedad en el perfil**: los reels de una misma propiedad se ven en fila en la
   cuadrícula. Cada uno, otro plano (fachada, terraza, jardines, dron…), siempre
   que siga siendo de lo mejor de ese vídeo.

```
uv run .claude/skills/portada-luxur/scripts/portada.py hoja proyectos/NNN/finales/NNN-recorrido.mp4 --paso 1
uv run .claude/skills/portada-luxur/scripts/portada.py hoja proyectos/NNN/finales/NNN-recorrido.mp4 --desde 12 --hasta 17 --paso 0.5
uv run .claude/skills/portada-luxur/scripts/portada.py nitidez proyectos/NNN/finales/NNN-recorrido.mp4 13.8 15.0 --paso 0.3
```

`hoja` deja una hoja de contactos con el segundo de cada miniatura (por defecto
junto al vídeo, `…-hoja.jpg`; con `--salida`, donde se diga); `nitidez` marca el
fotograma más nítido del tramo.

## 4. Generarla

Con el proyecto (lo normal, al exportar la final):

```
uv run .claude/skills/portada-luxur/scripts/portada.py portada --proyecto NNN --t 13.8 --locacion "EL POBLADO" --negocio venta
```

- Lee `proyectos/NNN/finales/NNN-recorrido.mp4` (el master; `--video` para otro).
- Escribe `proyectos/NNN/finales/NNN-portada.png` (`--salida` para otra ruta).
- Guarda la receta en `proyectos/NNN/portada.json` (vídeo, segundo, locación,
  negocio, fecha). Esa sí se versiona: repetir la portada es
  `portada --proyecto NNN` a secas, y cambiar un dato es pasar solo ese.

Suelta (un reel que no está en `proyectos/`): `--video <mp4> --salida <png>` con
`--t`, `--locacion` y `--negocio`.

El script imprime el **contraste** del blanco contra el fondo ya oscurecido
(percentil 90, WCAG) del texto y del isotipo, y avisa por debajo de 4,5:1 en el
texto y de 3:1 en el isotipo. Las seis de Los Patios dieron 6,1-8,8:1 de texto y
4,2-8,1:1 de isotipo.

Antes de entregar, se mira la imagen entera (Read del PNG) y se le enseña al
usuario. Si es la primera portada de una propiedad nueva, se espera su sí antes de
hacer las demás.

## 5. Las letras y el isotipo

| Pieza | Dónde | En git |
|---|---|---|
| Isotipo `PL` | `remotion/public/marcas/luxur/Propiedades-Luxur-Isotipo.png` (224 × 235, blanco sobre transparente) | Sí, como el logo |
| Montserrat | `remotion/public/fuentes/montserrat/Montserrat-Variable.ttf` (OFL, la del motor) | Sí |
| Safira March Medium | `.claude/skills/portada-luxur/fuentes/Safira-March-Medium.otf` | Sí, con la licencia del dueño (`fuentes/README.md`) |

Safira March es comercial (Din Studio, «Commercial use font»). Entró en git el
2026-10-11 porque el usuario tiene licencia y lo pidió. Vive con la skill y no en
`remotion/public/fuentes/`, porque esa carpeta viaja al producto y esta no
(`.claude/skills/` es zona de estudio). No se copia a otro sitio del repo ni se
pasa a ninguna pieza que vaya al producto.

El isotipo original mide 224 px: a 150 px se REDUCE y sale nítido. Si algún día
se quiere más grande que 224, hace falta un SVG o un PNG mayor; ampliarlo lo
ablanda.

## 6. La entrega

Con la final: `finales/NNN-recorrido.mp4` + `finales/NNN-portada.png`. Si el
usuario lleva los reels a una carpeta de publicación (p. ej. «Videos Social Media»
de la propiedad), la portada va a su subcarpeta `Portadas/`, con el mismo nombre.
En el mensaje: el segundo elegido y por qué, y el contraste.

## 7. Las que ya están hechas

Los Patios (El Poblado, venta), 2026-10-11, en
`…/Apartamento - Los Patios - El Poblado/Videos Social Media/Portadas/` y con su
receta en `proyectos/NNN/portada.json`:

| Pieza | Segundo | Plano |
|---|---|---|
| 017 | 0,0 | fachada frontal con los balcones verdes (el frame 0) |
| 018 | 13,8 | terraza bajo el techo de madera, vista a la ciudad |
| 019 | 7,5 | dron de la torre con el cielo |
| 020 | 32,1 | jardines colgantes de la fachada |
| 021 | 11,8 | fachada y calle desde arriba |
| 025 | 25,3 | dron de la fachada con los edificios vecinos |
