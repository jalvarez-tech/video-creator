# 02 · Layout — la serie 101-104 (9:16)

> Paso 2 de 3. Común a las cuatro historias. Anterior: [01-plan.md](01-plan.md) · Siguiente: [03-timeline.md](03-timeline.md).

## 1. Capas (z-order, de atrás a delante) — `src/proyectos/101/HistoriaMAS.tsx`

| # | Capa | Qué | Dónde |
|---|---|---|---|
| 1 | `PistaMetraje` | Los planos, mudos, a pantalla completa, con un acercamiento lento cada uno; look del 097 (viñeta 0,14) | `historia-NNN.ts` → `cortes` |
| 2 | `KickerV` | «★ MAS Estrellitas 2026», tira índigo pequeña, centrada en y = 232 | hasta el cierre |
| 3 | `TiraV` arriba | La pregunta (gancho): papel con «» si la dice una niña, índigo sin comillas si es de MAS. Dosis 700, 64 px | top = 300 |
| 4 | `TiraV` abajo | Lo que dicen, en trozos de dos líneas: Dosis 600, 60 px, acento en 800 con subrayado azul de rotulador | bottom = 560 (el texto acaba hacia y = 1360) |
| 5 | `CierreV` | El papel del final (6 s): sube desde abajo en 12 f, todo escalonado, deriva lenta | `cierre` |
| 6 | `PistaAudio` | Voces (a −23 LUFS, tope +6 dB) y la música de corrido | `audioDeHistoria()` |

## 2. Zonas seguras (1080×1920)

- **Arriba, hasta y = 230:** cabecera de la app (nombre, «Reels», cámara). Nada que se lea.
- **Abajo, desde y ≈ 1500:** pie de foto, música, botones. Nada que se lea (el cierre acaba con los logos en y ≈ 1430).
- **Derecha, x ≥ 960 entre y = 1000 y 1700:** la columna de iconos. Las tiras van centradas y a 880 px de ancho como
  mucho (x 100-980).
- **Las caras:** en contrapicado (la escalera de la 103) y en la respuesta recortada de la 102, la tira de arriba taparía
  la cara: ahí la pregunta sale con su plano (ver cada timeline).

## 3. El material en 9:16 (`proyectos/101/normalizar.mjs`)

- **Verticales (VT):** enteros, HLG → BT.709, a 1296×2304 (1080 × 1,2: el techo del acercamiento).
- **VT11 recortado (`vt11c`):** franja 9:16 del 42 % del ancho que SIGUE a la niña (se desplaza un 10 % entre 7,3 y
  11,3 s): entero sale el adulto que pregunta, que es el usuario. Del adulto solo asoma la mano con el micro.
- **Horizontales (HZ) y dron (DR):** la franja 9:16 de todo el alto del 4K (1216×2160), centrada en la que habla.
- **FT43:** HEIC → JPG sRGB 9:16, sin EXIF (los HEIC llevan el GPS de la casa).

## 4. El texto

- Una palabra acentuada por tira como mucho; la puntuación que la sigue va pegada a ella (`TextoAcentoV`: en la rev. 1
  la coma de «hogar,» saltaba sola de línea).
- Las tiras que entran en f0 están ENTERAS en f0 (la miniatura); las demás se despegan en 8 f y el texto entra en 10.
- Lo que dicen va entre «» y tal cual lo dicen («Es saber a perdonar…», «Gracias a Papito Dios»): no se corrige.
