# 02 · Layout — proyecto 106 (16:9, 1920×1080)

> Paso 2 de 3. El sistema visual es el de los 16:9 de MAS (`proyectos/097/artefactos/02-layout.md`, y como lo aplican
> 098-100). Lo propio del 106:

## Zonas

| Zona | Qué va | Pieza |
|---|---|---|
| Arriba a la izquierda (96, 64) | El kicker: «MAS Estrellitas 2026» en la miniatura (f−10 a f210) y, mientras responden, la pregunta «¿Cuál es la cualidad más bonita de Dios?» (f950-1189) | `Kicker` (papel, Dosis 700, 38 px) |
| Abajo a la izquierda (96, 90 desde abajo) | Lo que dicen, UNA tira a la vez, cuando lo dicen; la de MAS, en piel índigo | `TiraPapel` (Dosis 600, 54 px, un acento en 800 con su trazo) |
| Abajo, centrado | El lema a gritos (HZ09), con el trío del lockup; mientras está, no hay tira | `HeroPapel` + `Subraya` (92 px) |
| Pantalla completa | El CTA en papel (f1446-1755) | `Papel106` (el del 100) |

## Encuadre del material (`proyectos/106/normalizar.mjs`)

- **Horizontales y dron, enteros** a 2304×1296 (techo de acercamiento ×1,2). HZ22 viene girado 180°.
- **Verticales, en su franja 16:9** (todo el ancho, 1216 de alto = el 32 % del alto), empezando en la fracción del alto que
  se eligió con rejilla sobre los tramos del plan:

| Toma | y | Qué queda dentro |
|---|---|---|
| VT21 | 36 % | las dos de la puerta, de la cabeza a las rodillas; también cuando corren hacia cámara |
| VT29 | 10 % | la reportera del micro y las cabezas del corro |
| VT18 | 15 % | las caras (20-40 % del alto) y el micro que va de una a otra |
| VT03 | 30 % | las dos junto al árbol, de la cabeza a la cintura |
| VT23 | 25 % | la del centro y la que habla, en el borde derecho, con el árbol |

- **HZ04**, tres cortes de la misma toma: ×1 (la pregunta y «La palabra de Dios»), ×1,12 («¡Bondadoso!») y ×1,06 («¡Un
  Dios inmortal!»). El acercamiento es centrado: la que pregunta (≈ 44 % del ancho) y la que responde (55-67 %) siguen
  dentro.
