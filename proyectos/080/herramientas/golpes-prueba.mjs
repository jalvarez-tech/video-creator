#!/usr/bin/env node
/**
 * golpes-prueba.mjs NNN [ficha] — R33 sobre la prueba de una pieza: ¿cae cada corte en un golpe que SUENA en el audio del render? Saca los frames de entrada de los planos del plan REAL (`metraje-NNN.ts`) y
 * se los pasa a `golpes-render.py` junto con la prueba de `proyectos/NNN/pruebas-720p/`. Bien = 0,0 ± 1 f. La canción tiene golpes cada pocos frames (hi-hats): si el detector (la subida más fuerte a ±0,2 s)
 * se va a otro, sale una diferencia grande aunque el corte esté bien; el plan ya está comprobado contra los golpes MEDIDOS de la canción en la sección 4 de la puerta.
 */
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { cargaTs } from "../../../remotion/src/motor/metraje/revisar-metraje.mjs";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const n = process.argv[2];
const sufijo = process.argv[3] === "ficha" ? "-ficha" : "";
const m = await cargaTs({ m: `remotion/src/proyectos/${n}/metraje-${n}.ts` });
const plan = m.m[`metraje${n}`];
const frames = plan.filter((c, i) => i > 0 && c.tipo !== "foto").map((c) => c.en);
const salida = execFileSync("uv", ["run", path.join(RAIZ, "proyectos/080/herramientas/golpes-render.py"), path.join(RAIZ, `proyectos/${n}/pruebas-720p/${n}-recorrido${sufijo}.mp4`), ...frames.map(String)], { encoding: "utf8" });
console.log(`${n}${sufijo}: cortes en f${frames.join(", f")}`);
console.log(salida.trim().split("\n").slice(1).join("\n"));
