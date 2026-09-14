# 02 · Layout — proyecto 008 · pieza GRACIAS

Base 1080×1920. Lo que decide el reparto no es una preferencia estética: es
dónde hay contraste en ESTE clip y dónde está su cara.

## Lo que dicen los stills del fuente

Tira de referencia: `proyectos/008/gracias/vistas-previas/tira-1.png` y `tira-2.png`
(14 frames del clip ya transcodificado, sin overlays).

| Zona | Qué hay | Qué se puede poner |
|---|---|---|
| 0 – 340 px (franja alta, molde `franja`) | **cielo de atardecer**, claro y sin textura | **nada de texto.** El molde `franja` no lleva scrim y el cielo lo borraría. Solo el watermark, que trae su propia píldora oscura |
| 340 – 1340 px | su cara (ocupa ≈20 – 72 % del alto, con deriva: es un selfie a pulso) | nada: es el hero real de la pieza |
| 1340 px → abajo (`sello` / `cta`, ancla 69,8 %) | hombros, camiseta negra y el scrim carbón del molde | **todo el texto.** Es la zona de lectura del patrón R14 |

## El límite de la cámara sale de aquí, no del gusto

Avatar008 llegaba a **1.18** de escala. Este clip **no aguanta lo mismo** y el
número no es opinable: aquel estaba grabado de cerca en interior; éste es un
selfie a distancia de brazo, con la cara más pequeña y más alta en cuadro. A
1.16, la barbilla baja hasta la primera línea de las tarjetas y se cruza con el
texto. **Máximo 1.12** (`camara-008-gracias.ts`), y `x`/`y` a 0: la cara ya está
centrada y desplazar sin más zoom la sacaría del encuadre (R09).

## Anchos: lo que R09 no caza y sí cazó el frame

`revisaPlan` mide el **ancho** de las piezas, y con eso basta para lo que se
CORTA (un titular con `lineas` va en `nowrap`). Pero un `kicker` **puede bajar de
línea**, así que su regla mide la palabra más larga y da verde a un texto que en
pantalla parte en dos. Dos correcciones salieron de mirar el render, no el
validador (R17: el contenido se juzga en el encuadre final):

| Toma | Estaba | Qué pasaba | Quedó |
|---|---|---|---|
| g08 | «cualquier ayuda, por menor que sea» | partía en dos líneas y dejaba **«SEA» sola** | «por menor que sea» — y el bloque se lee de un golpe: *POR MENOR QUE SEA / TODO SUMA* |
| g07 | «nos pidieron medicinas puntuales» | llegaba **borde a borde** del ancho seguro | «medicinas que nos pidieron» |

## Estructura de un bloque

Siempre columna, siempre en la banda inferior, siempre en este orden de lectura:

```
[ kicker / chip ]      contexto o etiqueta de campaña (ámbar si es de la campaña)
[ titular / lista ]    el hero de la toma
[ etiqueta ]           el apoyo que lo explica
```

La única excepción es **g05**, que no es una columna sino una `ranura`: dos
titulares que se turnan en el mismo hueco (la pregunta se sustituye por la
respuesta en f582). Es la misma maqueta, cambiando de contenido.

## Watermark

`SelloCampana`, **importado de `Avatar008.tsx`, no copiado**: píldora traslúcida
oscura + punto ámbar + «AYUDEMOS A CHOCÓ», a 84 px del borde superior y FUERA de
`<CamaraVirtual>` (un sello que respira delata el zoom). Sobre el cielo claro
lee perfecto — es el mismo motivo por el que en la pieza anterior leía sobre el
techo blanco.
