# 02 · Layout — proyecto 098 · «Tú estás aquí»

> Paso 2 de 3. Es el layout del 097 ([02-layout del 097](../../097/artefactos/02-layout.md)) en pequeño. Siguiente:
> [03-timeline.md](03-timeline.md).

## Reparto del espacio (16:9 · 1920×1080)

| Banda | y (px) | Quién | Regla |
|---|---|---|---|
| Superior | 54–330 | el kicker del frame 0 («MAS Estrellitas 2026», x = 96, y = 64) | sobre el cielo de VT36 |
| Centro | 330–830 | las caras; la estrella que baja al centro del círculo de DR07 (960, 530) | nada tapa una cara |
| Inferior | 850–1000 | **la tira de papel** de cada frase (x = 96, base ≈ 990) | una o dos líneas, `TiraPapel` del 097 |
| Márgenes | 96 px a los lados | zona segura 5 % | |

## Dos tipos de toma

- **Metraje:** el plano a pantalla completa, con como mucho una tira abajo. Los VT van recortados a 16:9 (las franjas
  del 097); las tres fotos, recortadas a 16:9 al normalizar (FT30 franja 22-64 %, FT32 50-92 %, FT43 20-62 %), con un
  acercamiento lento: nada quieto.
- **Papel (f1478-f1794):** el amarillo del cartel a pantalla completa. Columna izquierda (x 96-820): «Este año, más de
  3.000 +1 regalos», «Miles de corazones unidos por amor.» y, abajo, la firma CSR | MAS. Columna derecha (x 900-1840):
  los tres pasos con su estrella numerada, unidos por el camino punteado, y bajo el paso 2 la tarjeta de la cuenta
  (EXACTA, `CUENTA` de `textos-098.ts`). Abajo a la derecha, las fechas «Del 15 de noviembre al 20 de diciembre».

## Z-order de la composición

1. `PistaMetraje` — los planos, mudos (sin velos: la tira es su propia caja)
2. `Graficos098` — kicker, tiras, la estrella del círculo (overlay fijo)
3. `Papel098` — el CTA a pantalla completa
4. `PistaSonido` — cinco SFX orgánicos, ninguno bajo las voces
5. `PistaAudio` — las voces de las niñas y la música, en la raíz

## Tipografía y color

Lo del 097: Dosis con `ss03` (cargada con `FontFace` + `delayRender`), cifras en Montserrat; tinta índigo `#382A74`
sobre papel `#FFE400`; azul `#419AFF` solo en display grande (la estrella, «3.000 +1»); trazos de rotulador azules.
