# 02 · Layout — proyecto 099 · «A tus pies»

> Paso 2 de 3. El sistema es el del 097 ([02-layout del 097](../../097/artefactos/02-layout.md)), copiado y no importado.
> Siguiente: [03-timeline.md](03-timeline.md).

## Reparto del espacio (16:9 · 1920×1080)

| Banda | y (px) | Quién | Regla |
|---|---|---|---|
| Superior | 54–330 | kicker (arriba a la izquierda) y la **columna de cualidades** (a la derecha, x ≤ 1824) | sobre el cielo y la cortina de la terraza, nunca sobre una cara |
| Centro | 330–830 | las caras; solo los heroes de papel (HZ17, HZ08, HZ32, DR07), en el hueco | un hero a la vez |
| Inferior | 850–1000 | la tira de las citas (x = 96, abajo 90) | una o dos líneas |

## Tomas

- **Metraje** (f0-f1482): el plano a pantalla completa, como mucho una tira abajo y un hero o la palabra grande.
- **Papel** (f1482-f1815): el amarillo a pantalla completa con su deriva lenta. Una sola hoja que se va llenando:

| Zona | Qué | Dónde |
|---|---|---|
| Izquierda arriba | «Este año, más de **3.000 +1** regalos» (Montserrat 800 azul para la cifra) | x 96, y 150 |
| Izquierda centro | «Miles de corazones / unidos por amor.» (Dosis 800, 56 px) | x 96, y 430 |
| Izquierda abajo | firma CSR \| MAS (índigo, con filete) | x 96, y 640 |
| Derecha | los tres pasos con su estrella numerada y el camino punteado; bajo el paso 2, la tarjeta blanca de la cuenta (Bancolombia) | estrellas en x 860, y 165 · 405 · 740 |
| Abajo | «Del 15 de noviembre al 20 de diciembre» (Montserrat 700) | x 96, y 900 |

Lo esencial (pasos, cuenta, celular) cae dentro del 4:5 central salvo la columna izquierda, que es contexto.

## Z-order de la composición

1. `PistaMetraje` — los planos, mudos (look neutro del 097, viñeta 0,14).
2. `Graficos099` — overlay fijo: tiras, kicker, cualidades, Cristo, el grito, corazones, gracias, el puente.
3. `Papel099` — el CTA a pantalla completa desde f1482.
4. `PistaSonido` — SFX orgánicos (papel, trazo, destello), bajo las voces.
5. `PistaAudio` — las voces de las niñas y «A Tus Pies», en la raíz.

## Gráficos por escena

| Escena | Pieza | Posición |
|---|---|---|
| 1 | tira de la pregunta (ya puesta en f0) · kicker «Ellas mismas hacían las preguntas.» · tira «En amarnos.» con subrayado | abajo / arriba izq. |
| 2 | **cualidades**: cada palabra entra grande junto a la niña y, al llegar la siguiente, sube a la columna de la derecha; ocho en columna | grande (1300, 760) → columna x 1824 |
| 3 | tira «…es un *conejito*.» · tira «Yo lo que quiero en Navidad es…» · hero «a *Cristo* en mi vida / y una Biblia muy *grande*» con óvalo y estrellita | abajo / hero arriba centrado |
| 5 | hero del lema con los tres subrayados del lockup · tira «¡Dios es bueno!» · tres corazones junto a las manos | abajo / abajo / arriba der. |
| 6 | hero «¡Gracias a Dios por la Navidad!» y la estrella que sube con los brazos | arriba centrado |
| 7 | hero «Esta Navidad, dales otra razón para dar gracias.» y la estrella que baja al centro del círculo | abajo centrado / centro |
| 8 | la hoja del CTA (arriba) | — |

## Encuadre por escena

Sin cámara virtual: cada plano lleva su `zoom` lento (1 → 1,03) y en DR un vuelo propio. HZ05 a 39,8-41,0 s («Amable») lleva una nuca desenfocada en el borde izquierdo: se deja (el `pan` del formato es solo vertical y un zoom centrado no la saca); es una toma en mano entre niñas y se lee así.
