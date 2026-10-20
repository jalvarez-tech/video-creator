#!/usr/bin/env node
/**
 * volcar-plan.mjs — el plan de planos del 048 como tabla Markdown (para `artefactos/03-timeline.md`): uno por fila, con su frame, su duración, el tramo de
 * fuente que usa, la velocidad, el golpe en que entra y su color. Uso: node proyectos/048/herramientas/volcar-plan.mjs
 */
import { join } from "node:path";
import { cargaTs, RAIZ } from "../../../remotion/src/motor/metraje/revisar-metraje.mjs";

const m = await cargaTs({ plan: join(RAIZ, "remotion/src/proyectos/048/metraje-048.ts") });
const M = m.plan;
const fps = 30;
const cortes = M.metraje048;
const golpes = Object.entries(M.GOLPE);
const golpeDe = (en) => {
  for (const [k, g] of golpes) if (Math.abs(en - M.golpeExacto(g.t)) <= 1) return `${k} ${g.db} dB`;
  return "";
};
console.log("| id | bloque | clip | en | dur (f) | dur (s) | fuente (s) | vel. | golpe en que entra | entra |");
console.log("|---|---|---|---|---|---|---|---|---|---|");
for (const c of cortes) {
  const v = c.velocidad ?? 1;
  const d0 = c.desde ?? 0;
  const fuente = c.tipo === "foto" ? "—" : `${d0.toFixed(2)}–${(d0 + (c.dur * v) / fps).toFixed(2)}`;
  console.log(`| ${c.id} | ${c.bloque} | ${c.src.replace("recorrido-048/", "")} | ${c.en} | ${c.dur} | ${(c.dur / fps).toFixed(2)} | ${fuente} | ×${v} | ${golpeDe(c.en)} | ${c.entra ?? "corte"} |`);
}
console.log(`\n${cortes.length} cortes · ${M.DURACION_048} f (${(M.DURACION_048 / fps).toFixed(2)} s)`);
