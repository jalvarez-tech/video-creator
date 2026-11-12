#!/usr/bin/env node
/**
 * curva-a-ts.mjs — pasa un trozo de la curva de sonoridad de una canción (la que deja `curva-cancion.mjs`) a un módulo de DATOS de TypeScript.
 *
 *   node proyectos/069/herramientas/curva-a-ts.mjs <curva.json> <desde s> <hasta s> <salida.ts>
 *
 * Es lo que `audio-069.ts` lee para saber cuántos dB hay que bajar la música bajo una voz (objetivo: −26 LUFS): la canción no suena igual de fuerte en todos sus tramos.
 */
import fs from "node:fs";
import path from "node:path";
import { RAIZ } from "../../../herramientas/comun.mjs";

const [, , curva, d, h, salida] = process.argv;
if (!curva || !salida) {
  console.error("uso: node proyectos/069/herramientas/curva-a-ts.mjs <curva.json> <desde> <hasta> <salida.ts>");
  process.exit(1);
}
const j = JSON.parse(fs.readFileSync(path.resolve(RAIZ, curva), "utf8"));
const [desde, hasta] = [Number(d), Number(h)];
const valores = j.db.slice(desde, hasta + 1);
const cuerpo = `/**
 * LA SONORIDAD DE LA CANCIÓN, segundo a segundo (LUFS momentáneos de 0,4 s, ebur128), de ${desde} a ${hasta} s de «${j.archivo.replace(/\.mp3$/, "")}». GENERADO por
 * \`node proyectos/069/herramientas/curva-cancion.mjs\` + \`curva-a-ts.mjs\`: no se edita a mano. El valor \`i\` es la media de potencia del segundo \`CURVA_DESDE + i\`.
 */
export const CURVA_DESDE = ${desde};
export const CURVA_LUFS: readonly number[] = ${JSON.stringify(valores)};

/** La sonoridad de la canción (LUFS) en el segundo \`t\` de la pista, por interpolación lineal entre los centros de cada segundo. */
export const lufsDeLaCancion = (t: number): number => {
  const x = Math.min(CURVA_LUFS.length - 1, Math.max(0, t - CURVA_DESDE - 0.5));
  const i = Math.floor(x);
  const k = x - i;
  return CURVA_LUFS[i] * (1 - k) + CURVA_LUFS[Math.min(CURVA_LUFS.length - 1, i + 1)] * k;
};
`;
fs.writeFileSync(path.resolve(RAIZ, salida), cuerpo);
console.log(`${valores.length} valores → ${salida}`);
