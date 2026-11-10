# 079 — combinaciones y cómo cambiar cada parte

**V60 · variante B de la V51 (070).** Misma terna (HK01 · MD02 · CT01), mismo exterior (DR02), misma canción y misma entrada. Cambia el ORDEN (estructura del 2026-11-10: `artefactos/01-plan.md`) y entra la ficha en pantalla.

| Qué | Dónde |
|---|---|
| El orden y la duración de los planos | `remotion/src/proyectos/079/metraje-079.ts`: `GOLPE` (el golpe de cada corte) y el array `metraje079` |
| Los dos planos rápidos | `c03-ventanal` (RC05) y `c04-sofa` (RC04): cambiar `src` y `desde`; si cambian de golpe, `GOLPE.plano1/plano2` y la tabla `DE` de la puerta |
| El texto de la ficha | `ficha-079.ts` (`FICHA_079`) Y `.claude/skills/ficha-luxur/propiedades/suite-go-living.json`: la puerta (2g) exige que coincidan |
| Las dos versiones | `composiciones.tsx`: `Recorrido079` (normal: subtítulos en una fuente, sin ficha) y `Recorrido079Ficha` (prop `ficha`: ficha abajo, sin subtítulos). Nunca juntas |
| La posición de la ficha | `ficha-079.ts`: `DISENO_FICHA.arriba` (1220, la de `ficha-luxur`: entera en el recorte 1:1) |
| Cuánto dura la ficha | `Recorrido079.tsx`: `FICHA_DESDE` (el `en` del hook) y `FICHA_HASTA`. Para que salga al acabar el hook: `FICHA_HASTA = <en de c03-ventanal>` |
| La música bajo la voz | `audio-079.ts` (niveles medidos el 2026-11-10 sobre las ventanas nuevas) |

**Metraje compartido:** todo es de la 070 salvo RC05 (0,50-2,60 s), que la 070 no usa; la 073 usa RC05 desde 3,6 s y RC04 desde 3,8 s (sin solape con estos tramos).

**Para comprobar:** `node proyectos/079/revisar-079.mjs` · prueba: `bash proyectos/079/herramientas/render-prueba.sh 079` (la normal; la de ficha, el mismo render con `Recorrido079Ficha`).

**Por confirmar al oído** (heredado de la 070): «en el Airbnb», «POT», «Go Living».

**El material** (`remotion/public/recorrido-079/`) es un clon del de la 070; `normalizar.mjs` es la receta de la 070 con el número cambiado y no se ha vuelto a ejecutar.
