#!/usr/bin/env node
/**
 * clonar-pieza.mjs — levanta el andamio de una pieza NNN de la suite Go Living a partir de la 070.
 *
 *   node proyectos/070/herramientas/clonar-pieza.mjs 071
 *
 * Copia (sin pisar nada que exista) los archivos de la 070 cambiando «070» por el número nuevo: la receta `normalizar.mjs`, la puerta `revisar-NNN.mjs`, los seis archivos de
 * `remotion/src/proyectos/NNN/` y el juego de `herramientas/` (texto). Deja las carpetas del proyecto (`original`, `voz`, `musica`, `medidas`, `pruebas-720p`).
 * Se respetan las referencias al reparto (`070-075`) y al catálogo (`proyectos/070/catalogo`, `proyectos/070/reparto…`), que son de TODA la suite y viven en la 070.
 *
 * LO QUE NO HACE: los DATOS de la pieza (material, planos, voz, canción, subtítulos, secciones 2a/2e/2f y la tabla `DE` de la puerta) siguen siendo los de la 070 y hay que reescribirlos:
 * `proyectos/070/aprendizajes.md` dice qué se aprendió y `proyectos/070/combinaciones.md`, cómo cambiar cada parte.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const nnn = process.argv[2];
if (!/^\d{3}$/.test(nnn) || nnn === "070") {
  console.error("uso: node proyectos/070/herramientas/clonar-pieza.mjs NNN   (tres dígitos, distinto de 070)");
  process.exit(1);
}

const cambia = (texto) =>
  texto
    .replace(/070-075/g, "@@REPARTO@@")
    .replace(/proyectos\/070\/(catalogo|reparto)/g, "proyectos/@@SUITE@@/$1")
    .replace(/070/g, nnn)
    .replace(/@@REPARTO@@/g, "070-075")
    .replace(/@@SUITE@@/g, "070");

let hechos = 0;
let saltados = 0;
function copia(origen, destino) {
  if (fs.existsSync(destino)) {
    saltados++;
    console.log(`  · ya existe ${path.relative(RAIZ, destino)}`);
    return;
  }
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  fs.writeFileSync(destino, cambia(fs.readFileSync(origen, "utf8")));
  hechos++;
}

const P070 = path.join(RAIZ, "proyectos", "070");
const PNNN = path.join(RAIZ, "proyectos", nnn);
const R070 = path.join(RAIZ, "remotion", "src", "proyectos", "070");
const RNNN = path.join(RAIZ, "remotion", "src", "proyectos", nnn);

copia(path.join(P070, "normalizar.mjs"), path.join(PNNN, "normalizar.mjs"));
copia(path.join(P070, "revisar-070.mjs"), path.join(PNNN, `revisar-${nnn}.mjs`));
for (const f of fs.readdirSync(R070)) copia(path.join(R070, f), path.join(RNNN, f.replace(/070/g, nnn)));
const H070 = path.join(P070, "herramientas");
for (const f of fs.readdirSync(H070)) {
  if (f === "clonar-pieza.mjs" || f === "render-prueba.sh" || !/\.(py|mjs|cjs|swift|sh)$/.test(f)) continue;
  copia(path.join(H070, f), path.join(PNNN, "herramientas", f));
}
for (const d of ["original", "voz", "musica", "medidas", "pruebas-720p"]) fs.mkdirSync(path.join(PNNN, d), { recursive: true });

console.log(`✅ pieza ${nnn}: ${hechos} archivo(s) creados, ${saltados} ya existían. Siguiente: reescribe los datos (ver el docstring).`);
