# 02 · Layout — proyecto 016

> Paso 2 de 3. Anterior: [01-plan.md](01-plan.md). Siguiente: [03-timeline.md](03-timeline.md).

## Reparto del cuadro (1080×1920)

| Banda | px | Qué va |
|---|---|---|
| Superior | 0-600 | cielo (y el plano, a partir del f114) |
| Centro | 600-1400 | el titular (bloque `centro`, en torno al 960) sobre el cielo que queda justo encima de las nubes; debajo, mar y palmeras |
| Inferior | 1400-1920 | libre: no hay voz, no hay subtítulos corridos |

## El texto

Un solo bloque editorial, `posicion: "centro"`, `escala: 1,15`, ya puesto en el
frame 0 (es la miniatura, R23), en las letras del canal y SIN sombra ni borde:
una sola línea, base (Montserrat 500, 52 px): «República Dominicana 2027».

*Primera prueba:* el bloque iba arriba y llevaba debajo «¡Todo incluido!» en
acento (Playfair Display itálica). El cliente pidió dejar solo la primera línea
y centrada.

Centrado, con el plano tal cual, «2027» caía encima de las palmeras del
islote. El plano c01 baja 115 px (`pan: -6`), lo que pide empezar el empuje en
1,13 (`|pan| ≤ 50·(z−1)`): el texto queda sobre cielo liso y las palmeras por
debajo durante los 114 frames (mirado en el f0 y el f110).

Sale con el corte al segundo plano (frame 114), antes de que cambie el fondo.

## Legibilidad

Blanco sin caja ni sombra (la marca la quita: `texto.sombra: null`) sobre el
cielo claro de encima de las nubes (luma 137-165: ~3:1 sin nada detrás). Lo que
lo sostiene es un **velo de banda propio de la pieza**: negro al 32 % en ±70 px
del centro, que se desvanece a 300 px arriba y abajo (luma ~95-115 tras el
texto, más de 4,5:1). Sobre cielo liso se lee como el degradado del cielo, no
como una caja. Solo vive mientras vive el titular y funde con él. No va en `<PistaMetraje velos>` porque ahí sería de la
pieza entera y oscurecería el cielo de los diez planos.

## Z-order

```
<PistaMetraje cortes={metraje016} look={LOOK_016} />   los planos, mudos
<VeloTitular />                                        la banda tras el titular, solo 0-113
<SubtitulosEditoriales bloques={subtitulos016} marca={LUXUR} />
<PistaAudio tramos={audio016} />                       la música, en la raíz
```
