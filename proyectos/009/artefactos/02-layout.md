# 02 · Layout — proyecto 009 · Street Cats

> Paso 2 de 3. Viene de [01-plan.md](01-plan.md) · sigue en [03-timeline.md](03-timeline.md).

## El lienzo: 1080×1920, y lo que NO se puede usar

Esta pieza se ve dentro de la UI de Instagram Reels, no en un reproductor
limpio. Eso decide el reparto del espacio antes que cualquier criterio estético:

| franja (px) | qué hay | ¿se puede poner texto? |
|---|---|---|
| 0–110 | cabecera del feed | ⛔ |
| **117–457** | **franja alta — el molde `franja`** | ✅ **aquí va TODO el copy de antojo** |
| 457–1400 | el plato, la sartén, las manos | ⛔ es el sujeto |
| 1400–1700 | texto del post, usuario, audio | ⛔ lo tapa la app |
| 1700–1920 | botones, barra de progreso | ⛔ |
| derecha 880–1080 | columna de me gusta / comentar / compartir | ⚠️ evitar |

**La consecuencia que se lleva la decisión:** el molde `sello` —donde va el copy
en TODAS las piezas con avatar de este repo (004-008)— ancla al 69,8 % del alto,
o sea y=1340, justo dentro de la banda que tapa la app. **Aquí no sirve.** El
copy sube a `franja`, que existía para «ir por encima de la cara» y que resulta
ser también la única banda alta segura de un Reel.

Las dos tomas de `pantalla` (revelación y CTA) están **centradas** y por tanto
lejos de las dos zonas de UI: es exactamente donde tiene que estar una dirección
que alguien va a querer capturar en pantalla.

## Medidas comprobadas (`revisar-plan.mjs`)

`anchoMax` del molde = 1080 − 2×118 (margen seguro 11 % del formato 9:16) = **844 px**.
`altoMax` de `franja` = **340 px** (R08). Las once tomas pasan; lo miden las
tablas de Inter de `plan/avances.ts`, no una estimación a ojo.

| toma | pieza más ancha | px | líneas | alto est. | ✓ |
|---|---|---|---|---|---|
| g01 | «a ver esto sin antojarte» | 54 | 1+1 | ~178 | ✓ |
| g02 | «AL CARBÓN» | 92 | 2 | ~212 | ✓ |
| g03 | «AL MOMENTO» | 92 | 2 | ~212 | ✓ |
| g04 | «RECIÉN HECHAS» | 88 | 2 | ~203 | ✓ |
| g05 | «AHOGADAS» | 92 | 2 | ~212 | ✓ |
| g06 | «CRUJIENTES» | 88 | 2 | ~203 | ✓ |
| g07 | «POR DENTRO» | 88 | 2 | ~203 | ✓ |
| g08 | «QUE SÍ LLENAN» | 84 | 2 | ~194 | ✓ |
| g09 | «ANTOJASTE?» | 100 | 2 | ~230 | ✓ |
| g10 | «STREET CATS» | 116 | 1 | ~330 (molde `pantalla`, 1500) | ✓ |
| g11 | «Cra 48 # 132A sur-24» | 72 | 1 | ~470 (molde `pantalla`) | ✓ |

**La línea que decidió su propio cuerpo:** la dirección. Va como `lineas` y no
como `texto` a propósito — con `texto` el validador mide solo la palabra más
larga, porque un texto libre puede bajar de línea, y una dirección que se parte
sola por donde le toque es justo lo que no puede pasar. Con `lineas` se mide la
línea entera (que es lo que se pinta, con `nowrap`), y a 72 px cabe.

## Legibilidad: quién protege al texto

`franja` **no trae scrim** (`scrim: false`). Sin nada debajo, un titular blanco
sobre el humo blanco de las alitas no se lee — y el fallo no aparece hasta que
se renderiza ese plano concreto.

Lo resuelve el **velo** de `<PistaMetraje>` (su capa 3): un degradado de 620 px
desde arriba, del negro de marca al 82 % → 55 % → transparente. Va en la capa de
metraje y no en la de gráficos porque es una propiedad del FORMATO (proteger la
banda alta), no de ninguna toma.

⚠️ **Si se mueve el molde, se mueve el velo.** Son dos números en dos archivos
distintos (`MOLDES_GRAFICOS.franja.ancla` = 0,061 y `VELOS_009.arriba.alto` = 620) y nada los
ata. Es la deuda declarada de esta pieza.

Las dos tomas de `pantalla` se protegen distinto: con `VeloPantalla` al **72 %**,
que sustituye al fondo opaco de fábrica. Se probó al 82 y el frame renderizado
lo desmintió — sumado a la viñeta que el molde ya trae y a la del metraje, eran
tres oscurecimientos y las dos últimas tomas salían en negro plano.

## Contraste (el que sí se calculó)

| tinta | sobre | ratio | uso |
|---|---|---|---|
| `#FFB020` ámbar | negro del velo | **≈11:1** | titulares, chip, arroba |
| `#FFFFFF` | negro del velo | ≈19:1 | titulares |
| `#FFB020` ámbar | **blanco** | **2,04:1** | ⛔ **nunca** — no hay registro claro en este canal |

Es la lección de `acento-luxur-contraste` leída al derecho: allí el naranja daba
2,62:1 porque iba sobre PAPEL. Aquí no hay papel, y por eso el mismo tipo de
color sí puede ser tinta de texto.

## Sin watermark persistente (decisión, no olvido)

`STREETCATS.sello.texto` SÍ trae «STREET CATS», pero la composición no monta
`encima`. Las dos bandas donde cabría un sello están ocupadas: la alta por el
copy durante los 31 s, la baja por la UI de la app. La marca se cobra los
últimos 10 s enteros — nombre a los 21 s, arroba a los 27 s.
