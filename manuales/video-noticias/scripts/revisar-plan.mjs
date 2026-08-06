#!/usr/bin/env node
/**
 * revisar-plan.mjs — pasa `revisaNoticia()` sobre un plan de noticia y muestra
 * los avisos, sin abrir el Studio ni renderizar nada.
 *
 * Uso (desde cualquier sitio):
 *   node manuales/video-noticias/scripts/revisar-plan.mjs                       # el plan de demo
 *   node manuales/video-noticias/scripts/revisar-plan.mjs src/plantillas/noticia-004.ts
 *   node manuales/video-noticias/scripts/revisar-plan.mjs src/plantillas/noticia-004.ts 25   # otro fps
 *
 * Por qué existe: el validador vive en el motor, pero se necesita en el momento
 * de ESCRIBIR el plan — antes de que exista una composición que renderizar.
 * Esperar al Studio para descubrir que dos tomas se solapan cuesta un ciclo
 * entero de render.
 *
 * Cómo lee TypeScript sin dependencias nuevas: transpila con el esbuild que
 * Remotion ya trae (mismo truco que generar-catalogo.mjs). El plan es datos
 * puros —importa solo `noticias/plan`, nunca los componentes—, así que el
 * bundle no arrastra React.
 */
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const aqui = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(aqui, "..", "..", ".."); // …/video-creator
const remotionDir = path.join(root, "remotion");

const rel = process.argv[2] ?? "src/plantillas/noticia-demo.ts";
const fps = Number(process.argv[3] ?? 30);
const planTs = path.isAbsolute(rel) ? rel : path.join(remotionDir, rel);

if (!fs.existsSync(planTs)) {
  console.error(`✖ No existe el plan: ${planTs}`);
  process.exit(1);
}

const require = createRequire(path.join(remotionDir, "package.json"));
const esbuild = require("esbuild");

// Punto de entrada sintético: reexporta el plan Y el validador, para que el
// bundle resuelva ambos sin que el archivo del plan tenga que importar nada más.
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "noticia-"));
const entry = path.join(tmp, "entry.ts");
const planUrl = JSON.stringify(planTs);
const validadorUrl = JSON.stringify(path.join(remotionDir, "src", "plantillas", "noticias", "plan.ts"));
fs.writeFileSync(
  entry,
  `export * as plan from ${planUrl};\nexport { revisaNoticia, duracionPlan } from ${validadorUrl};\n`
);

const bundle = path.join(tmp, "out.cjs");
await esbuild.build({
  entryPoints: [entry],
  bundle: true,
  platform: "node",
  format: "cjs",
  outfile: bundle,
  logLevel: "error",
});

const mod = require(bundle);
fs.rmSync(tmp, { recursive: true, force: true });

// El plan puede exportarse con cualquier nombre (noticiaDemo, noticia004…):
// cogemos el primer export que sea un array de tomas.
const tomas = Object.values(mod.plan).find((v) => Array.isArray(v) && v.length && v[0]?.tipo && v[0]?.beat);

if (!tomas) {
  console.error(`✖ ${rel} no exporta ningún TomaNoticia[]`);
  process.exit(1);
}

const avisos = mod.revisaNoticia(tomas, fps);
const dur = mod.duracionPlan(tomas);

console.log(`\n📰 ${rel}`);
console.log(`   ${tomas.length} tomas · ${dur} f · ${(dur / fps).toFixed(2)} s @ ${fps} fps\n`);

if (avisos.length === 0) {
  console.log("✅ Plan limpio: sin huecos, solapes, tomas cortas ni reason vacíos.\n");
  process.exit(0);
}

console.log(`⚠️  ${avisos.length} aviso(s):\n`);
for (const a of avisos) console.log(`   · ${a}`);
console.log("");
process.exit(1);
