# 013 · Layout — dónde cae cada cosa en 1080 × 1920

## Los tres carriles

```
 y=0     ┌──────────────────────────┐
         │                          │
 y=84    │   ●  PROPIEDADES LUXUR   │  ← SelloCampana, los 383 frames
         │                          │     (fuera de todo; no respira)
         │                          │
         │        la escena         │  ← el clip a sangre, sin reencuadre
         │      (tres personas)     │
         │                          │
 y=1020  │- - - - - - - - - - - - - │  ← arranca el scrim (900 px desde abajo)
         │        · velo ·          │     cola suave 0,58 → 0 en el 20 % alto
 y=1340  │  ANCLA DEL BLOQUE 69,8 % │  ← aquí nace el texto y crece hacia abajo
         │      kicker              │
         │      TITULAR             │
         │      chip                │
 y=1690  │  (el más bajo, 88 %)     │  ← zona segura inferior
 y=1920  └──────────────────────────┘
```

**Ancho útil: 844 px** (1080 − 2 × 118, margen seguro del 11 %). Es lo que mide
`revisaPlan` con R09, y el plan sale limpio.

## Por qué el texto está ABAJO y el sello ARRIBA

R14: sin pista de subtítulos el tercio bajo queda libre, y es donde el ojo ya
espera leer en un vertical. Aquí hay además una segunda razón que no admite
discusión: **la franja alta está ocupada** por el watermark del canal, que va en
todos los frames. Los dos no caben.

Y hay una tercera, del material: el fondo real de la toma tiene **texto grande**
—el logotipo «APEX · El Wall Street Inmobiliario» del photocall, a media
altura—. Poner rótulos arriba habría sido texto sobre texto.

## El velo, fila a fila (medido en el render, R13)

El scrim del molde `sello` sube de 830 a **900 px** y entra con `rampa: 0`.
Fondo medido como la MEDIANA de cada fila del ancho útil (la mediana y no la
media: el texto blanco ocupa menos de la mitad del ancho, así que devuelve el
fondo):

| fila | f0 · antes | f0 · después | f146 | f330 | verde `#34D399` |
|---|---|---|---|---|---|
| 1340 | 141 | **38** | 38 | 38 | 7,87:1 |
| 1450 | 126 | 27 | 24 | 29 | 8,77-9,24:1 |
| 1680 | 107 | 22 | 23 | 23 | 9,33:1 |
| 1750 | 122 | 23 | 23 | 22 | 9,33-9,41:1 |

La columna «antes» es el fallo que encontró esta pieza y que arregla R25: el
texto estaba puesto en el f0 y el velo no.

## Los cuatro bloques

| toma | molde | ancla | elementos (de arriba a abajo) | cuerpo |
|---|---|---|---|---|
| `g01-hook` | `sello` | 69,8 % | titular 2 líneas | 58 px |
| `g02-quien` | `sello` | 69,8 % | kicker · titular · chip | 64 px |
| `g03-evento` | `sello` | 69,8 % | kicker · titular · chip | 124 px |
| `g04-remate` | `cta` | 69,8 % | kicker · titular 1 línea | 68 px |

Los cuatro anclan ARRIBA y crecen hacia abajo, así que un hijo que entra tarde
**no desplaza a nadie**: por eso esta pieza NO necesita `ley.reserva` (R24), que
es para los moldes que centran. Y le vendría mal: la reserva estropea justo
`entra: "escalon"`, que es lo que hace los dos relevos.

## Los saltos de línea, a mano (R18)

Sólo el hook los necesita, y se escriben con `lineas: [...]`:

```
Lo que pasa aquí
no sale en los portales
```

Dejado al maquetador, «portales» se queda sola en la última línea. Una viuda en
el hook es lo primero que se ve, y el hook es la miniatura.
