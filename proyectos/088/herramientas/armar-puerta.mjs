#!/usr/bin/env node
/**
 * armar-puerta.mjs NNN — escribe `proyectos/NNN/revisar-NNN.mjs` desde `proyectos/088/herramientas/plantilla-puerta.mjs` y el bloque CONFIG que sale de `proyectos/NNN/pieza.json` (clave `puerta`) y de los ids del plan.
 *
 *   node proyectos/088/herramientas/armar-puerta.mjs 089
 *
 * La plantilla es la puerta de la 079 hecha genérica (la de las variantes B de la suite Go Living, 080-087); aquí solo cambia lo de la casa: quién es el CTA, dónde está Isabella en cada toma y qué no puede afirmarse.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const N = process.argv[2];
const P = JSON.parse(fs.readFileSync(path.join(RAIZ, "proyectos", N, "pieza.json"), "utf8"));
const Q = P.puerta;
const R = JSON.parse(fs.readFileSync(path.join(RAIZ, "proyectos", N, "medidas", "reparto.json"), "utf8"));
const claves = R.claves;
const todos = [P.hook.id ?? "c02-hook", ...P.rapidos.map((r) => r.id), P.mitad.id ?? "c05-mitad", ...P.recorrido.map((r) => r.id), "c11-cta"];
const CONFIG = {
  n: N,
  origen: "",
  v: P.v,
  cancion: P.cancion,
  idExterior: "c01-exterior",
  idHook: "c02-hook",
  idMitad: "c05-mitad",
  idCta: "c11-cta",
  idCierre: "c12-cierre",
  rapidos: P.rapidos.map((r) => ({ id: r.id, clip: r.clip })),
  recorrido: P.recorrido.map((r) => ({ id: r.id, clip: r.clip })),
  exterior: P.apertura.clip,
  terna: { "c02-hook": P.hook.clip, "c05-mitad": P.mitad.clip, "c11-cta": P.cta.clip },
  lugares: Q.lugares,
  cta: { clip: P.cta.clip, regex: Q.ctaRegex, accion: Q.ctaAccion },
  prohibido: Q.prohibido ?? "valoriz|rentabilidad|ganancia|ingresos|garantiz|sin riesgo|inversi[oó]n|seguridad",
  claves,
  sinGolpe: Q.sinGolpe ?? [],
  minSubida: Q.minSubida ?? {},
  versionesAnteriores: Q.versionesAnteriores ?? [],
  subidaPorEncima: Q.subidaPorEncima ?? [],
  permiteIngresos: false,
  fuerzaMinEntrada: Q.fuerzaMinEntrada,
  fuerzaMinSeco: Q.fuerzaMinSeco,
  entradas: { secos: todos, disuelven: [] },
};
if (CONFIG.fuerzaMinEntrada === undefined) delete CONFIG.fuerzaMinEntrada;
if (CONFIG.fuerzaMinSeco === undefined) delete CONFIG.fuerzaMinSeco;
let t = fs.readFileSync(path.join(RAIZ, "proyectos", "088", "herramientas", "plantilla-puerta.mjs"), "utf8");
t = t.replace("/*CONFIG*/ {} /*FIN-CONFIG*/", `/*CONFIG*/ ${JSON.stringify(CONFIG, null, 2)} /*FIN-CONFIG*/`).replaceAll("__N__", N);
fs.writeFileSync(path.join(RAIZ, "proyectos", N, `revisar-${N}.mjs`), t);
console.log(`proyectos/${N}/revisar-${N}.mjs escrito`);
