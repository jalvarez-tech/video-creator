# 02 · Layout — proyecto 100

> Paso 2 de 3. Anterior: [01-plan.md](01-plan.md). Siguiente: [03-timeline.md](03-timeline.md).

Es el sistema del 097 (`proyectos/097/artefactos/02-layout.md`), COPIADO a `remotion/src/proyectos/100/piezas-100.tsx` para que
un cambio posterior del 097 no mueva esta pieza.

## 1. Zonas (1920×1080)

| Zona | Qué va | Dónde |
|---|---|---|
| arriba a la izquierda | kicker «MAS Estrellitas 2026» (f0–197) y las pegatinas de los deseos | `left 96, top 64` |
| abajo | la tira de la frase de cada niña (papel amarillo rasgado, índigo, entre «») · la tira índigo de MAS | `left 96, bottom 90` |
| arriba al centro / abajo al centro | los heroes de papel: el grito (abajo) y el clímax (arriba) | centrados |
| pantalla entera | el papel del CTA (f1491–1800) | — |

Un hero a la vez: cuando hay hero de papel no hay tira.

## 2. Identidad

Papel `#FFE400` con `mas-097/papel.png` · tinta índigo `#382A74` · azul `#419AFF` solo en display grande · Dosis con `ss03`
(`useDosis()`: FontFace + delayRender) · cifras en Montserrat · trío verde/lavanda/rojo solo en los subrayados del lema.

## 3. El papel compacto (f1491–1800)

| Columna izquierda (x 96) | Columna derecha (x 860) |
|---|---|
| «Este año, más de» · **3.000 +1** (Montserrat 800, azul) · «regalos» | estrella 1 · «Toma una estrellita del árbol» / «en la entrada de la iglesia» |
| «Uno puede ser *el tuyo*.» | estrella 2 · «Haz tu donación» / «en efectivo con los sobres y transferencia» + la tarjeta de la cuenta (Bancolombia) |
| «Del 15 de noviembre al 20 de diciembre» | estrella 3 · «Envía el comprobante» / «Cel: 314 520 56 56» |
| logos Casa Sobre la Roca \| MAS (índigo) | |

Todo entra en 5 s (f1497–1640) y se queda 5,3 s quieto para leer la cuenta (con la deriva del papel: nada congelado).
