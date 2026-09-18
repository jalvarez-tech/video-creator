# 014 · Layout — reparto del cuadro 1080 × 1920

## Los carriles

```
 y=0     ┌──────────────────────────┐
         │      techo de la nave    │  ← luminarias blancas (YMAX 236-253)
         │                          │
         │        su cara           │  ← el clip a sangre, sin reencuadre
         │      (selfie de mano)    │
         │                          │
 y=1020  │- - - - - - - - - - - - - │  ← arranca el velo (900 px desde abajo)
         │   · americana BLANCA ·   │     luma 108-121 sin velo → 11-39 con él
 y=1340  │  ANCLA DEL BLOQUE 69,8 % │  ← aquí nace el texto y crece hacia abajo
         │      kicker              │
         │      TITULAR / ✓ ✓ ✓     │
         │      chip / 2.ª línea    │
 y=1690  │  (el más bajo, 88 %)     │  ← zona segura inferior
 y=1920  └──────────────────────────┘
```

**Ancho útil: 844 px** (1080 − 2 × 118, margen seguro del 11 %). Es lo que mide
`revisaPlan` con R09, y el plan sale limpio.

## Por qué todo el texto está ABAJO

R14: sin pista de subtítulos el tercio bajo queda libre, y es donde el ojo ya
espera leer en un vertical. Es además la preferencia declarada del cliente en
sus piezas de avatar (012, 013). Y hay una razón del material: arriba está el
techo de la nave, blanco y con luminarias a YMAX 250 — texto sobre eso pediría
un velo en la cara.

**No hay franja alta ocupada**: la pieza va sin sello (decisión declarada en
`look-014.ts`). La franja queda libre a propósito, para su cara y el techo.

## El velo, fila a fila (medido en el render, R13 · R25)

El fondo de la banda es su AMERICANA BLANCA: el más claro de las tres piezas de
avatar. El scrim del molde `sello` sube de 830 a **900 px** (013: en la fila
1340, donde ancla el bloque, el degradado de 830 todavía se está abriendo) a
opacidad 1, y entra con `rampa: 0` en el hook y en los cinco relevos.

Medido con `manuales/motion-graphics/scripts/medir-velo.py` sobre los stills a
escala 1: MEDIANA de cada fila del ancho útil (la mediana y no la media: el
texto blanco ocupa menos de la mitad del ancho y devuelve el fondo):

| fila | f0 (hook) | f159 | f455 | f648 (velo naciendo, +3 f) | f958 | f1200 | f1318 | f1470 |
|---|---|---|---|---|---|---|---|---|
| 1340 | 39 | 26 | 37 | 39 | 19 | 17 | 34 | 19 |
| 1450 | 21 | 22 | 22 | 22 | 17 | 21 | 21 | 22 |
| 1560 | 20 | 21 | 21 | 21 | 11 | 17 | 20 | 21 |
| 1680 | 12 | 20 | 20 | 19 | 11 | 18 | 15 | 13 |
| 1750 | 11 | 16 | 15 | 17 | 10 | 18 | 13 | 11 |

Contraste que resulta, **peor fila de todos los frames medidos** (la 1340):

| tinta | dónde | peor caso | umbral |
|---|---|---|---|
| blanco `#FFFFFF` | titulares, ítems, kickers | **14,9 : 1** | AA normal 4,5 |
| verde `#34D399` | «en minutos», «inteligencia artificial», «todo», «importante», los ✓ | **7,8 : 1** | AA normal 4,5 |
| rojo `#ef4444` | sólo los tres glifos ✗ (40 px) | **3,97 : 1** | AA texto grande 3 |

Con la americana sin velo (luma 108-121) el blanco habría quedado en ~2,5 : 1.
El velo aporta TODO el contraste, que es lo que R13 pide cuando el avatar va
sin gradar. Y el f0 —la miniatura— está a 7,8 : 1 con el velo ya puesto:
`rampa: 0` (R25) hace su trabajo.

(En f200 la fila 1450 da 148: es el TITULAR blanco de dos líneas, que ahí
ocupa más de la mitad del ancho y gana la mediana. Es texto, no fondo.)

## Los siete bloques

| toma | molde | ancla | elementos (de arriba a abajo) | cuerpo |
|---|---|---|---|---|
| `g01-hook` | `sello` | 69,8 % | kicker · titular 2 líneas | 56 px |
| `g02-problema` | `sello` | 69,8 % | kicker · titular 2 líneas · chip | 64 px |
| `g03-agente` | `sello` | 69,8 % | kicker · titular 2 líneas | 56 px |
| `g04-hace` | `sello` | 69,8 % | kicker · columna izq. de 3 ✓ | 44 px |
| `g05-sin` | `sello` | 69,8 % | kicker · columna izq. de 3 ✗ | 44 px |
| `g06-todo` | `sello` | 69,8 % | titular 1 línea · 2.ª línea apoyo | 66 px |
| `g07-remate` | `sello` | 69,8 % | kicker · titular 2 líneas | 62 px |

Los siete anclan ARRIBA y crecen hacia abajo, así que un hijo que entra tarde
**no desplaza a nadie**: esta pieza NO necesita `ley.reserva` (R24), que es
para los moldes que centran. Y le vendría mal: la reserva estropea
`entra: "escalon"`, que es lo que hace los cinco relevos.

**El bloque más alto** es `g05-sin` (kicker + 3 ítems de 44 px con gap 22):
unos 290 px desde 1340 → termina en ~1630, por debajo del 88 % (1690).
Comprobado en el frame f1120.

## Las dos listas: una columna propia, alineada a la izquierda

Cada lista son TRES nodos `lista` de un ítem (para que cada ✓/✗ aterrice sobre
su palabra: `lista` sólo sabe escalonar a intervalo fijo). Con el molde
(`alinea: "centro"`) cada nodo se centraba por su cuenta y las tres marcas
salían en tres columnas distintas — se vio en el primer render. Van dentro de
una `col` interior con `alinea: "inicio"` y `gap: 22` (el gap interno de
`<ItemLista>`): la columna se centra como bloque y los ítems se alinean entre
sí, que es lo que hace que se lean como UNA lista.

## Los saltos de línea, a mano (R18)

Todos los titulares de dos líneas llevan `lineas: [...]`:

```
Publica en minutos,          El cuello de botella       Un agente de
sin pasar horas editando     de crear contenido         inteligencia artificial

Lo más importante
LA VIDA
```

Y un kicker se ACORTÓ al ver el frame: «subes el vídeo y automáticamente»
medía 811 de los 844 px útiles y tocaba los dos márgenes con el plan en verde
(R09 mide la palabra más larga de un kicker, no la línea). Queda
«automáticamente», que es la palabra que importa.

## B-roll a sangre (3.ª pasada): el sujeto, por encima de la banda

Los insertos van **a sangre** (1080×1920) y **debajo** de los gráficos: el
velo y el texto de la banda siguen encima del b-roll igual que encima de su
cara. Por eso el sujeto de cada plano tiene que caer **por encima de y ≈ 1020**,
donde arranca el velo. Se midió en el fotograma de cada tramo antes de montar,
y fue lo que descartó dos planos buenos de contenido (la chica editando y la
familia en la playa: su sujeto estaba en el 62-85 % del alto).

| plano | fuente | sujeto (alto) | zoom | pan | queda en |
|---|---|---|---|---|---|
| i1-grabar | 1080×2048 | móvil 20-73 %, botón rojo 62 % | 1,11 → 1,16 | 5 | botón ~57 % |
| i2-marketing | 1080×2048 | planificador 53-90 % | 1,17 → 1,21 | 8 | cabecera ~45 %, mano ~62 % |
| i3-imagenes | 1440×2732 | móvil 30-66 % | 1,09 → 1,14 | 4 | encima del kicker |
| i4-editar | 1080×2048 | pantallas 30-53 % | 1,00 → 1,04 | — | tal cual |
| i5-voz | 1080×2048 | pantalla 30-48 % | 1,00 → 1,05 | — | tal cual |
| i6-vida | 1080×2048 | cabezas 35 %, manos 60 % | 1,00 → 1,06 | — | el remate cae sobre las piernas |

`|pan| ≤ 50·(zoom − 1)` con el zoom MÍNIMO (§encuadre de `corte.ts`): lo
comprueba la puerta (`revisar-014.mjs`, sección 7). Ningún zoom pasa de 1,21, y
el único plano de más de 1080 de ancho (i3, 1440) es el que más sube.

**El velo aguanta sobre el b-roll**, medido con `medir-velo.py` sobre los
stills (mediana por fila del ancho útil): las filas de FONDO quedan en luma
**14-40** en los seis planos (f270, 325, 780, 1033, 1080, 1420, 1470), así que
el blanco va a ≥ 14,7 : 1 y el verde a ≥ 7,7 : 1, igual que sobre su cara. La
fila 1450 de la toma del problema da 146-148: es el propio titular, que ahí
ocupa más de medio ancho (pasa lo mismo sobre su cara en f239).
