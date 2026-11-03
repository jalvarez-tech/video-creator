# 02 · Layout — proyecto 068

> Paso 2 de 3. Siguiente: [03-timeline.md](03-timeline.md).

| | |
|---|---|
| Lienzo | 1080×1920 (9:16), 30 fps, 1113 f (37,1 s). Clips normalizados a 1296×2304 (techo del punch-in: 1,2). |
| Zonas seguras (R14) | nada por encima del 12,5 % ni por debajo del 88 % del alto. **Arriba no hay texto en ningún momento.** |
| Subtítulos editoriales | abajo, borde superior al 74,5 % del alto, 90 % de opacidad, Montserrat en la línea base y Playfair Display itálica (8 px menor) en el acento, blanco SIN sombra; velo de abajo (`VELO_SUBTITULOS`) como único sostén. Contraste medido sobre los fotogramas reales: p90 4,5-6,0 : 1 (la 017 daba 2,9-3,7). |
| Dato grande | ninguno. La única cifra («20 minutos») va en el subtítulo, dicha por ella. |
| Sello | **ninguno** (regla fija); tampoco `@propiedadesluxur`. |
| Cierre | fundido de la imagen de Isabella a negro (6 f, negro exacto en su último fotograma) y **tarjeta oscura** de 2,0 s (60 f): logo `Propiedade-Luxur-Logo.png` a 440 px y 60 % de opacidad, y debajo `PropiedadesLuxur.com` (Montserrat 500, 54 px, blanco), centrados en y≈940. |
| Color | `colorCorrection()` por plano (`Corte.color`): la base del canal + el ajuste medido de cada toma (`proyectos/068/medidas/medir-color-final.txt`). Render con `--gl=angle`. |
| Audio | voz de Isabella tratada (graves fuera, puerta suave, compresor 3,5:1, ganancia y limitador a −2,5 dBFS) a **−15 LUFS**; música «Heaven on Earth» a −15 LUFS sola y ≈ −26 LUFS bajo la voz, con curvas de coseno que acaban antes de la primera palabra. |
