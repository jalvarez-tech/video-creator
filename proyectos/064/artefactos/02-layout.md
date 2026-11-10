# 02 · Layout — proyecto 064 · Lote en San Vicente Ferrer, V46 · REV. 1

> Paso 2 de 3. Anterior: [01-plan.md](01-plan.md). Siguiente: [03-timeline.md](03-timeline.md).

**Composición:** 1080×1920 (9:16) · 30 fps · 1296 f (43,2 s). Clips a 1296×2304 (1080 × 1,2: el techo del punch-in).

## Reparto del espacio

| Zona | Qué hay | Regla |
|---|---|---|
| Todo el cuadro | el metraje: dron (apertura, fondo de la infografía, horizonte y vista) o Isabella a cámara | un solo protagonista a la vez; sin sello |
| Arriba (y < 12,5 %) | **nada, nunca** (ni hook escrito ni cuenta) | regla fija del canal |
| Abajo (borde superior al 74,5 % del alto; 90 % de opacidad) | los subtítulos editoriales de lo que dice Isabella: Montserrat 500 (45 px) y Playfair itálica (91 px: 99 − 8) | hasta 3 líneas, nada por debajo del 88 % |
| Velo de los subtítulos | degradado inferior solo mientras hay subtítulos (`VELO_SUBTITULOS`) | Luxur va sin sombra: el velo es lo único que sostiene el texto |
| **Infografía (y 735-1185, centrada en y 960)** | la fila «De Medellín · 1 hora» (88 px), el filete dorado, el héroe «De la autopista Medellín-Bogotá · 15 minutos» (132 px; el nombre en Playfair itálica 56 px) y el pie «Tiempos aproximados» (28 px) | **centrada en la mitad del fotograma y del cuadrado 1:1 del feed (y 420-1500)** y dentro de y 570-1350; **no coincide con ningún subtítulo** (ella no habla) y la banda de la ficha SALE mientras dura |
| Velo de la infografía | franja central (y 500-1420; 0,68 en el centro, borde suave de 230 px) | el dron se sigue viendo arriba y abajo; se midió contra el plano de fondo |
| Cierre (y ≈ 795-1085) | tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) | nada se congela: la imagen funde a negro en 6 f y llega a negro exacto en el último fotograma de la toma |

No hay `<PistaGraficos>` (modo editorial, R14); la infografía es un componente propio (`Infografia064.tsx`) con su dato (`infografia-064.ts`). No hay dato grande en los subtítulos.

## Z-order (de atrás a delante)

1. `PistaMetraje` (planos mudos, disolvencias, tarjeta) · 2. `FundidoACierre` · **2b. `Infografia064`** · 3. `VeloSubtitulos` · 4. `SubtitulosEditoriales` (grupo a 90 %) · 5. `LogoCierre` y `WebCierre` · 6. `PistaAudio` (voz de las tres tomas + música, en la raíz).

## Encuadre de los clips

- **Tomas de Isabella** (anamórficas, SAR 81:256): escaladas ENTERAS, sin recorte, con un empuje de 1,0 → 1,04; **«Ven, te muestro» entra con un empuje claro de 1,11 → 1,15** (un corte seco sobre su propia imagen sin cambio de escala parece un error).
- **Drones** (DR03 y DR01, verticales con `rotation=90`): rotados con `transpose=cclock` y escalados; zoom 1,0 (el dron ya se mueve).
