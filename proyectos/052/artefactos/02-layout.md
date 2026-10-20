# 02 · Layout — proyecto 052 («Pregúntate esto», réplica de `02.mp4`)

> Paso 2 de 3. Dónde vive cada cosa en pantalla. Se escribe con el [01-plan.md](01-plan.md) delante y **sin pensar todavía en frames**. Siguiente: [03-timeline.md](03-timeline.md).

## Reparto del espacio (9:16 · 1080×1920 · 30 fps)

| Banda | y (px) | Quién la ocupa | Regla |
|---|---|---|---|
| Arriba | 0–240 | **nada** | Ni hook escrito ni cuenta ni logo: el formato no pone texto arriba (regla fija del canal) |
| Cuadro | 0–1920 | el vídeo (recorrido anamórfico escalado ENTERO, sin recorte; Isabella en sus dos tomas) | Los clips llegan a 1296×2304 (techo del punch-in ×1,2); los recorridos van sin zoom |
| Subtítulos editoriales | 1430–1640 (borde superior al 74,5 %, hasta el 88 %) | TODO lo que suena (hook, locución, CTA) en trozos de 1-4 palabras, hasta 3 líneas | Montserrat 500 (base 45 px) y Playfair itálica (acento, 91 px con `acentoMenos` 8), blancos, **sin sombra**, a 90 % de opacidad, con el velo de abajo (`VELO_SUBTITULOS`) |
| Cierre | y ≈ 795–1085 | la tarjeta oscura: el logo (440 px, 60 % de opacidad) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) | Dura 2,0 s (60 f); nada se congela |
| Márgenes | 12,5 % arriba y 12 % abajo | zona segura | Nada del cierre por encima del 12,5 % ni por debajo del 88 % |

**No hay sello** («PROPIEDADES LUXUR»: nunca), **ni `<PistaGraficos>`** (con subtítulos editoriales los moldes `sello` y `cta` quedan fuera: R14), **ni cifras** en pantalla.

## Tomas

- **A cámara (Isabella)**: HK04 (hook, sentada en el sofá: abre la pieza en el f0) y CT05 (CTA, sentada en la silla de la sala). Empuje lento (zoom 1,00 → 1,04). Su subtítulo va abajo: no le tapa la cara.
- **Recorrido**: planos mudos del 2-sep, cuadro entero, sin movimiento añadido (la cámara ya se mueve), disueltos entre sí (12 f).
- **Isabella caminando (CT04, sin voz)**: sustituye a «Isabella en la cocina»; su subtítulo cae sobre su cuerpo, no su cara (ella está a media distancia, en el tercio superior).
- **La versión con ficha** (`ficha-luxur`): el mismo vídeo sin subtítulos (`sinSubtitulos`) y la ficha `APARTAMENTO EN RENTA · El Poblado · Tierra Grata · $ 14,8 M COP / MES` en el tercio bajo del cuadrado 1:1 (y ≈ 1220-1420), desde el f0 hasta la tarjeta. El hook de Isabella (planos medios) queda libre arriba: la ficha va abajo.

## Color

`COLOR_BASE` de Luxur (contraste con cuerpo, negros hundidos, luces recogidas, un punto cálido, +10 % de saturación) y el ajuste de cada plano (R32): `vibrance` ≤ 0,05, piel de Isabella con `saturation` ≤ 1,06. Render con `--gl=angle`; la prueba a escala 1 reducida con ffmpeg. Luma por plano (stills a escala 0,5, antes del ajuste de exposición): hook 93-102 · balcón 85 · bar 73 · alcoba 115 · cocina 111 · balcón con camas 100 · sauna 65 · Isabella caminando 112 · piscina 99-100 · gimnasio 87 · Social Kitchen 87 · CTA 115-117: se subió un punto el sauna (+0,12), el bar (+0,05) y el hook (+0,06), y se bajó el CTA (−0,04).
