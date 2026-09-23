# 📓 camara-avatar — cuaderno del estudio (no va al producto)

> Lo que la skill decía de los proyectos del dueño y ya no dice, porque el producto se escribe neutro. Ninguna nota cambia una regla: son el **precedente**. Este archivo está en `.gitignore` (`**/ESTUDIO*.md`).
> Guarda lo que `SKILL.md` citaba del proyecto 001 antes de que la skill pasara a
> apuntar a la demo del producto (`DemoCamara` sobre `remotion/public/avatar.mp4`).

## El plan y la demo del 001

- Plan real: `remotion/src/proyectos/001/camara-001.ts` (avatar 9:16 · 1080×1920
  · 25 fps · 1091 f). Demo viva: comp `CamaraDemo`
  (`remotion/src/proyectos/001/CamaraDemo.tsx`) sobre
  `remotion/public/avatar-9x16.mp4`, con `MotionGraphicsFull` y
  `subtitulos001` como overlays fuera de la cámara. Las dos siguen en el
  estudio tal cual; no son plantillas (hardcodean lo del 001).
- Ventanas: `MotionGraphicsFull` oculta al avatar en 200–468 y 520–905; el
  avatar solo se ve en 0–200, 468–520 y 905–1091 (ahí `SceneFollow` es un
  overlay de franja superior). El plan **no** pone cues bajo los gráficos full.
- Los cues de `camara001`: `cam-hook` 0–18 (close, s 1.0→1.16, y −6) ·
  `cam-settle` 55–82 (medium) · `cam-question` 120–138 (close 1.06→1.14) ·
  `cam-preseccion` 178–196 (medium →1.03) · `cam-reentry` 476–496 (close
  1.03→1.18, x −22: reencuadre lateral al reaparecer) · `cam-settle2` 500–516 ·
  `cam-cta` 965–992 (close 1.05→1.18, **y +16**: baja el avatar para abrir
  headroom al botón «Seguir» del CTA, que era un overlay en la franja alta).
- El «botón Seguir» del 001 es el caso original de «hacer espacio» = bajar el
  avatar + zoom suave (SKILL §3). Con los moldes `sello`/`cta` del plan de
  gráficos, que cuelgan de la banda de subtítulos, el gesto es el contrario
  (subir un poco): es lo que hace el `planCamara` de ejemplo del SKILL.

## Estado verificado del motor (2026-07-24)

- `camara.ts` + `CamaraVirtual.tsx` + `camara-001.ts` + comp `CamaraDemo` →
  `npm run lint` (eslint + `tsc`) en verde.
- Stills renderizados de `CamaraDemo` (`remotion/out/cam-*.png`): hook (zoom in,
  subtítulo fijo), reentrada (reencuadre lateral con cara encuadrada), CTA (baja
  el avatar y abre headroom para el overlay «Seguir»). Reposo correcto bajo los
  gráficos a pantalla completa.
- La comp `Avatar9x16` (verificada) quedó intacta; la cámara es una capa
  opcional y por proyecto.
