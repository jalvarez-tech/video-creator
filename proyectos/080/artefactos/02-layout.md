# 02 · Layout — proyecto 080

Lienzo 1080 × 1920. Dos composiciones con el mismo metraje y el mismo audio; ficha y subtítulos NUNCA juntos.

| Capa | Dónde | Normal (`Recorrido080`) | Con ficha (`Recorrido080Ficha`) |
|---|---|---|---|
| `PistaMetraje` + `FundidoACierre` | cuadro entero | sí | sí |
| Velo + subtítulos (90 %, UNA sola fuente: Montserrat) | abajo, y ≈ 1440-1600, centrados | mientras habla Isabella | no |
| Ficha (`ficha-080.ts`) | abajo a la izquierda: filete dorado en x 96, texto en x 130, y 1220-1420; velo radial | no | f86 (entra en 15 f) → f883 (sale en 12 f) |
| Logo y web | centrados, y ≈ 940 | tarjeta del cierre | tarjeta del cierre |

- La ficha cabe ENTERA en el recorte 1:1 de Facebook y del feed (y 420-1500), con 80 px de aire por debajo: es el diseño aprobado de `ficha-luxur`, sin mover.
- Frame 0: el exterior limpio en las dos versiones (regla fija del canal). La ficha entra con el hook, no en el fotograma 0.
