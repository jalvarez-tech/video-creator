#!/usr/bin/env node
/**
 * ventanas-dr.mjs — qué ventanas (segundos de la fuente) de cada clip de EXTERIOR (DR) usa cada pieza de la suite (070-078), para no repetir apertura.
 *   node proyectos/076/herramientas/ventanas-dr.mjs
 * Cuenta el tramo OPACO de cada plano (como la sección 7b de la puerta). Una pieza que no carga se dice y se sigue.
 */
import { join } from "node:path";
import { cargaTs, RAIZ } from "../../../remotion/src/motor/metraje/revisar-metraje.mjs";
const FPS = 30;
const filas = {};
for (const n of ["070", "071", "072", "073", "074", "075", "076", "077", "078"]) {
  const ruta = join(RAIZ, "remotion", "src", "proyectos", n, `metraje-${n}.ts`);
  let m;
  try {
    m = await cargaTs({ v: ruta });
  } catch (e) {
    console.log(`  ℹ️  ${n}: no carga (${String(e.message).split("\n")[0].slice(0, 90)})`);
    continue;
  }
  const cortes = m.v[`metraje${n}`];
  for (const c of cortes) {
    if (c.tipo === "foto") continue;
    const clip = c.src.split("/").pop().replace(".mp4", "");
    if (!/^dr\d+$/.test(clip)) continue;
    const a = c.desde ?? 0;
    (filas[clip] ??= []).push(`${n}:${a.toFixed(2)}-${(a + (c.dur * (c.velocidad ?? 1)) / FPS).toFixed(2)} (${c.id})`);
  }
}
for (const clip of Object.keys(filas).sort()) console.log(clip.toUpperCase().padEnd(5), filas[clip].join(" · "));
