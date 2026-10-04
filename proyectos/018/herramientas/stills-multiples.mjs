#!/usr/bin/env node
/**
 * stills-multiples.mjs — varios fotogramas de una composición con UN solo bundle.
 *
 * Uso (desde la raíz del repo):
 *   node proyectos/018/herramientas/stills-multiples.mjs Recorrido018 1 proyectos/018/pruebas-720p/stills6 0,60,231,1338,1339
 *
 *   argumentos: <Composición> <escala> <carpeta de salida> <frames separados por comas> [gl]
 *   escala 1 = 1080×1920; 0.5 = 540×960.
 *   gl: el backend de WebGL de Chrome; defecto `swangle`. Los planos con `color` (el efecto
 *   `colorCorrection()`) necesitan WebGL2 y el render los pide con `--gl=angle`: para que el
 *   fotograma sea el del render, pásale `angle` aquí también (el 017, desde la revisión 7).
 *
 * POR QUÉ. Cada `npx remotion still` empaqueta el proyecto entero y deja un bundle de 2,2-2,5 GB en el
 * tmp del sistema que no borra (memoria `remotion-bundles-llenan-disco`: llenó el disco el 2026-09-30).
 * Aquí se empaqueta UNA vez (≈ 6 s), cada fotograma tarda ≈ 4 s y el bundle se borra al final, también
 * si un still falla. Los PNG salen sin códec de por medio: sirven para medir color y luma de verdad.
 *
 * Desde remotion/ (donde viven los módulos), no hace falta instalar nada.
 */
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const require = createRequire(path.join(RAIZ, "remotion", "package.json"));
const { bundle } = require("@remotion/bundler");
const { renderStill, selectComposition } = require("@remotion/renderer");

const [id, escala, salida, lista, gl = "swangle"] = process.argv.slice(2);
if (!id || !escala || !salida || !lista) {
  console.error("uso: node proyectos/018/herramientas/stills-multiples.mjs <Composición> <escala> <carpeta> <f1,f2,…> [gl]");
  process.exit(1);
}
if (!["angle", "swangle", "swiftshader", "egl", "vulkan", "angle-egl"].includes(gl)) {
  console.error(`gl no válido: ${gl} (angle, swangle, swiftshader, egl, vulkan o angle-egl)`);
  process.exit(1);
}
const frames = lista.split(",").map(Number);
if (frames.some((f) => !Number.isInteger(f) || f < 0)) {
  console.error(`frames no válidos: ${lista}`);
  process.exit(1);
}
fs.mkdirSync(salida, { recursive: true });

const t0 = Date.now();
const servido = await bundle({ entryPoint: path.join(RAIZ, "remotion", "src", "index.ts") });
try {
  console.log(`bundle ${((Date.now() - t0) / 1000).toFixed(0)} s`);
  const comp = await selectComposition({ serveUrl: servido, id, logLevel: "error" });
  console.log(`${id}: ${comp.durationInFrames} f · ${comp.fps} fps · ${comp.width}×${comp.height} · gl ${gl}`);
  for (const f of frames) {
    const out = path.join(salida, `${id}-f${String(f).padStart(5, "0")}.png`);
    await renderStill({ composition: comp, serveUrl: servido, output: out, frame: f, scale: Number(escala), imageFormat: "png", chromiumOptions: { gl } });
    console.log(`  ✓ f${f}`);
  }
} finally {
  fs.rmSync(servido, { recursive: true, force: true });
  console.log("bundle borrado");
}
