#!/usr/bin/env node
/**
 * stills-antes.mjs — los mismos fotogramas SIN GRADUAR (el plan sin sus `color:`), para medir el color «antes».
 *
 * Uso (desde la raíz del repo; mismos argumentos que `stills-multiples.mjs`, sin la composición):
 *   node proyectos/018/herramientas/stills-antes.mjs 0.5 proyectos/018/pruebas-720p/stills-antes 34,141,248,…
 *
 * Con la carpeta de «después» (`stills-multiples.mjs Recorrido018 0.5 <carpeta> <frames> angle`) y esta, `medir-color.py` y
 * `antes-despues.py` dicen qué hizo la graduación plano a plano. Las dos tandas tienen que salir del MISMO código salvo
 * el color y con el mismo backend de GL (`angle`), o la comparación mide el backend.
 *
 * POR QUÉ UN SCRIPT PARA ESTO. Quitar las líneas `color:` a mano y ponerlas después es exactamente cómo se pierde una
 * graduación (en el 017 un script con ruta relativa no restauró el plan, las nueve variantes salieron iguales y las once
 * líneas se recuperaron de la sesión). Aquí: el plan se lee entero a memoria, se escribe sin las líneas de color, se
 * renderiza y se RESTAURA en un `finally` (y ante Ctrl+C), comprobando byte a byte que quedó como estaba; y si quitar
 * las líneas no cambia nada (el plan ya venía sin color) aborta, porque «antes» y «después» saldrían iguales.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const PLAN = path.join(RAIZ, "remotion", "src", "proyectos", "018", "metraje-018.ts");
const [escala, salida, frames] = process.argv.slice(2);
if (!escala || !salida || !frames) {
  console.error("uso: node proyectos/018/herramientas/stills-antes.mjs <escala> <carpeta> <f1,f2,…>");
  process.exit(1);
}

const original = fs.readFileSync(PLAN);
let restaurado = false;
function restaura() {
  if (restaurado) return;
  restaurado = true;
  fs.writeFileSync(PLAN, original);
  if (!fs.readFileSync(PLAN).equals(original)) {
    console.error(`❌ NO se pudo restaurar ${PLAN}: recupéralo con git o con la copia de la sesión`);
    process.exit(2);
  }
}
for (const senal of ["SIGINT", "SIGTERM"]) {
  process.on(senal, () => {
    restaura();
    process.exit(130);
  });
}

try {
  const sinColor = original
    .toString("utf8")
    .split("\n")
    .filter((l) => !l.startsWith("    color: "))
    .join("\n");
  if (sinColor === original.toString("utf8")) {
    console.error("el plan no tiene líneas `color:`: «antes» y «después» saldrían iguales");
    process.exitCode = 1;
  } else {
    fs.writeFileSync(PLAN, sinColor);
    const r = spawnSync(
      process.execPath,
      [path.join(RAIZ, "proyectos", "018", "herramientas", "stills-multiples.mjs"), "Recorrido018", escala, salida, frames, "angle"],
      { stdio: "inherit", cwd: RAIZ }
    );
    process.exitCode = r.status ?? 1;
  }
} finally {
  restaura();
  console.log("plan restaurado (byte a byte)");
}
