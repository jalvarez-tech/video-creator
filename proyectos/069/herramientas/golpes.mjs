#!/usr/bin/env node
/**
 * golpes.mjs — los GOLPES de una canción (dónde suena un ataque), medidos sobre el audio decodificado.
 *
 *   node proyectos/069/herramientas/golpes.mjs remotion/public/botswana-069/musica-we-are.wav [desde s] [hasta s] [mínimo dB]
 *
 * Un golpe es lo que la casa llama «golpe» en las demás piezas: la mayor subida de nivel (dB) en 15 ms a partir de un instante, con 80 ms de refractario entre dos (el sello de tiempo es el del PICO de esa subida, a 5 ms). Se mide
 * sobre la señal filtrada de 120 Hz a 8 kHz (los graves sostenidos y el aire no son ataques) en tramos de 5 ms. Escribe `proyectos/069/musica/golpes-<nombre>.json` con TODOS los
 * de la canción (`[segundo, dB]`) y, si se piden `desde` y `hasta`, imprime los de ese rango. Es la rejilla contra la que se cortan los planos y la que la puerta comprueba.
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { RAIZ } from "../../../herramientas/comun.mjs";

const [, , entrada, desdeArg, hastaArg, minArg] = process.argv;
if (!entrada) {
  console.error("uso: node proyectos/069/herramientas/golpes.mjs <archivo> [desde] [hasta] [mínimo dB]");
  process.exit(1);
}
const archivo = path.isAbsolute(entrada) ? entrada : path.join(RAIZ, entrada);
const r = spawnSync("ffmpeg", ["-nostdin", "-v", "error", "-i", archivo, "-vn", "-ac", "1", "-ar", "48000", "-af", "highpass=f=120:poles=2,lowpass=f=8000:poles=2", "-f", "s16le", "-"], { maxBuffer: 1 << 30 });
if (r.status !== 0) {
  console.error(String(r.stderr));
  process.exit(1);
}
const pcm = new Int16Array(r.stdout.buffer, r.stdout.byteOffset, Math.floor(r.stdout.length / 2));
const FS = 48000;
const PASO = 240; // 5 ms
const n = Math.floor(pcm.length / PASO);
const db = new Float64Array(n);
for (let k = 0; k < n; k++) {
  let s = 0;
  for (let i = k * PASO; i < (k + 1) * PASO; i++) s += (pcm[i] / 32768) ** 2;
  db[k] = 10 * Math.log10(s / PASO + 1e-10);
}
// Subida máxima en los 3 tramos (15 ms) siguientes, contra la media de los 4 anteriores (20 ms): un ataque, no un crescendo.
const fuerza = new Float64Array(n);
for (let k = 4; k < n - 3; k++) {
  const antes = (db[k - 1] + db[k - 2] + db[k - 3] + db[k - 4]) / 4;
  fuerza[k] = Math.max(db[k] - antes, db[k + 1] - antes, db[k + 2] - antes);
}
const golpes = [];
const MIN = Number(process.env.MINIMO_DB ?? 3.5);
// El pico de un ataque es el MÁXIMO de la subida en los 30 ms siguientes al primer tramo que pasa del mínimo, y su sello de tiempo es ese pico: así ni la fuerza ni el segundo dependen de qué
// umbral se haya pedido (con el sello en el primer tramo que pasa del mínimo, un umbral más bajo adelantaba cada golpe y lo hacía parecer más débil).
for (let k = 4; k < n - 9; k++) {
  if (fuerza[k] < MIN) continue;
  let pico = k;
  for (let j = k + 1; j <= k + 6; j++) if (fuerza[j] > fuerza[pico]) pico = j;
  const t = Math.round(((pico * PASO) / FS) * 1000) / 1000;
  const f = Math.round(fuerza[pico] * 10) / 10;
  const antes = golpes[golpes.length - 1];
  if (!antes || t - antes[0] >= 0.08) golpes.push([t, f]);
  else if (f > antes[1]) golpes[golpes.length - 1] = [t, f];
  k += 6;
}
const nombre = path.parse(archivo).name;
const dir = path.join(RAIZ, "proyectos", "069", "musica");
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, `golpes-${nombre}.json`), JSON.stringify({ archivo: path.basename(archivo), minimoDb: MIN, golpes }) + "\n");
console.log(`${golpes.length} golpes ≥ ${MIN} dB en ${(pcm.length / FS).toFixed(1)} s → proyectos/069/musica/golpes-${nombre}.json`);
if (desdeArg !== undefined && hastaArg !== undefined) {
  const [d, h, m] = [Number(desdeArg), Number(hastaArg), Number(minArg ?? 8)];
  const sel = golpes.filter(([t, f]) => t >= d && t <= h && f >= m);
  console.log(`\nde ${d} a ${h} s, ≥ ${m} dB: ${sel.length}`);
  console.log(sel.map(([t, f]) => `${t.toFixed(3)}(${f.toFixed(0)})`).join(" "));
}
