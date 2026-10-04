# 📓 motion-graphics — cuaderno del estudio (no va al producto)

> Lo que la skill decía de los proyectos del dueño y ya no dice, porque el producto se escribe neutro. Ninguna nota cambia una regla: son el **precedente**. Este archivo está en `.gitignore` (`**/ESTUDIO*.md`).
> Guarda las anécdotas que antes vivían en `SKILL.md`,
> `referencia.md`, `cruce-remotion-scenes.md` y en los textos del catálogo
> (`fichas.ts` / `coreografia.ts`), para que cada regla conserve el caso que la
> justificó sin que el producto arrastre datos de nadie. Los IDs de las reglas
> (R01-R29) no cambian: aquí está «el caso del estudio» de cada una.

## Ejemplos escritos a mano (001 y 002)

- Los «ejemplos reales trabajados» que citaba la cabecera del SKILL eran
  `remotion/src/proyectos/001/MotionGraphicsFull.tsx` (avatar 9:16 · 25 fps ·
  1091 f; escenas a pantalla completa con el patrón `Scene`) y
  `remotion/src/proyectos/002/MotionApple002.tsx` (patrón `Statement`, muelle y
  mockups de UI). Hoy la referencia del producto son `GraficosDemo`, `PlanDemo`
  y `Catalogo`; el 001 y el 002 se quedan como están.
- `SPRING.flip` nació para el giro 3D «TUYO / DE OTRO» del 001, y `SPRING.golpe`
  para el aspa roja del mismo. Los contadores del 001 fueron los primeros con
  `tabular-nums`.
- El 002 descartó la paleta `MG` entera y definió la suya: de ahí que
  `plan.paleta` sea del proyecto (comentario de `coreografia.ts`, paleta semántica).
- Ventanas de las escenas a pantalla completa del 001 (por si se reabre):
  SceneFunnel 200–330 · ScenePhone 330–395 · SceneZero 395–468 · SceneWhats
  520–660 · SceneTimer 660–800 · SceneCompetencia 800–905 · SceneFollow 965+.
  El hueco 468→520 (52 f) es guion: manda el avatar (regla `huecosSospechosos`).
- `TramoContador` nació de SceneFunnel del 001: 0→200 (45 f) · meseta (55 f) ·
  200→3 (22 f), cuatro keyframes que un `de`/`a` no expresa.
- El cue track original de `referencia.md` §17.1 era del 001 (25 fps):

  ```tsx
  const cuesMG = [
    cue("hero-in",    "whoosh",  "light",        14,   16, "Entra el contador-héroe (corte al gráfico)"),
    cue("count-200",  "texture", "data",         16,   56, "El contador sube 0→200 (conteo)", { fadeOutFrames: 8 }),
    cue("drop-3",     "impact",  "sharp",        286,  20, "Caída 200→3: la fuga (llegada dura)", { priority: "high" }),
    cue("drop-0",     "impact",  "error",        420,  22, "3→0 visitas: resultado negativo", { priority: "high" }),
    cue("chat-in",    "click",   "notification", 515,  12, "Llega el mensaje del lead"),
    cue("seen",       "click",   "tick",         560,  8,  "✓✓ se pone gris: visto sin respuesta"),
    cue("timer-tick", "texture", "tick",         676,  96, "Tic-tac del timer 5:00→0:00", { fadeInFrames: 6, fadeOutFrames: 6 }),
    cue("timer-0",    "impact",  "deep",         772,  30, "El timer llega a 0:00 (clímax)", { priority: "high" }),
    cue("flip",       "impact",  "metal",        770,  14, "Flip TUYO→DE OTRO"),
    cue("comp-count", "texture", "data",         812,  58, "La competencia capta 0→200", { fadeOutFrames: 8 }),
    cue("comp-money", "impact",  "money",        870,  20, "200 leads para la competencia (dinero)"),
    cue("tap",        "click",   "pop",          1010, 12, "Se pulsa el botón Seguir"),
    cue("followed",   "impact",  "chime",        1016, 18, "Seguir→Siguiendo ✓ (confirmación)"),
  ];
  ```

## R09 y la tabla de avances

- Lo que destapó el sesgo de los cubos de `anchoTexto` fue `n11-sin-formula`
  del 006 (cinco falsos positivos, cuatro publicados).
- Los once kickers del 006 se estimaban a 28 px y se dibujaban a 44: por eso el
  cuerpo lo pone el ROL y no la ficha.
- `medir-anchos.mjs` recorre, además de los demos, `noticia-004`, `noticia-005`
  y `noticia-006` (`remotion/src/proyectos/00N/`). En el producto esos planes no
  existen: el corpus tiene que descubrirlos solo si están.
- Un `\n` dentro de `texto` no se honraba: se vio en el plan del 005.
- Las tablas `sf500…sf800` se midieron con la San Francisco de macOS del Mac del
  estudio. Las marcas `luxur`, `choco` y `streetcats` la conservan
  (`LETRA_SF_SISTEMA`) y por eso las 27 composiciones publicadas no mueven un
  píxel; una marca nueva declara `LETRA_INTER`.

## Textos del catálogo que eran del 003 (y uno del 001-002)

Lo que decían las fichas antes de neutralizarlas (solo cambia la comp `Catalogo`,
que no está publicada):

- `entra: barrido` — «la ley del 003 (`LEY_SECA`)».
- `envolturas: atenua` — «la etiqueta «Hoy» del 003».
- `ambiente: foco` — «el ámbar→rojo del f258 del 003».
- `eje: ranura` — «la sustitución dura (f924 y f1037 del 003)».
- `pieza: caret` — «escrito a mano en 001, 002 y 003».
- `pieza: serie` — «aparece en 4 de las 11 escenas del 003».
- `pieza: nodo` — «en la línea de tiempo del 003».
- Comentarios de `coreografia.ts`: la ley seca era «la ley del 003»; `tinta` es
  obligatoria en `Molde` desde que un fondo sin su tinta dejó texto invisible en
  el 006; el ancla 1340/1920 del molde `sello` es la banda de subtítulos del 003;
  `alfaRol` es «la escala del 003, repetida a mano en once escenas»; y
  `dialectoDe` separa «al 003 (barrido duro, malla y eje de tiempo) del 002
  (muelle, mockups de UI)».

## Cruce con remotion-scenes (2026-08-13)

- `theme-noticias.ts` advertía «⚠️ esto cambia también el 004 si se vuelve a
  renderizar».
- El acento naranja `#E8863A` y el teal cableados eran los del primer canal
  (Propiedades Luxur). El plan proponía `marcas/luxur/marca.ts`; se hizo
  `remotion/src/marcas/luxur.ts` (2026-08-13), y después `choco.ts` y
  `streetcats.ts`.
- «inmobiliaria (el caso actual)» en la tabla de familias = Propiedades Luxur.
- Referencias `archivo:línea` caducadas que ya no se corrigen en el documento:
  `PistaGraficos` (`:1122`) hoy exporta en `:1188`; los seis
  `paleta={PALETA_MARCA}` literales ya se retiraron (`PistaGraficos.tsx:160`).
- La escena `ThemeLuxury` del lote se cita en el cruce como «`Theme` de lujo»
  porque el guard de cadenas del producto (`luxur`) la confundiría con el canal.
