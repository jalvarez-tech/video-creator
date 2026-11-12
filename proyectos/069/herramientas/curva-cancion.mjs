#!/usr/bin/env node
/**
 * curva-cancion.mjs — la sonoridad de una canción segundo a segundo (ebur128, momentánea de 0,4 s), para ELEGIR de dónde empezar.
 *
 *   node proyectos/069/herramientas/curva-cancion.mjs "archivos/musica/Cornfield Chase.mp3" [más canciones…]
 *
 * Escribe `proyectos/069/musica/curvas/<nombre>.json` con `{ duracion, db: [LUFS momentáneos, uno por segundo] }` (el segundo i = media de potencia de los 10 valores
 * de ese segundo; −70 = silencio). No oye nada: da la forma (cuándo sube, cuándo cae), que es lo que decide dónde cae el crescendo contra el montaje.
 */
import fs from "node:fs";
import path from "node:path";
import { RAIZ, ejecutar, log } from "../../../herramientas/comun.mjs";

const DESTINO = path.join(RAIZ, "proyectos", "069", "musica", "curvas");
fs.mkdirSync(DESTINO, { recursive: true });

for (const arg of process.argv.slice(2)) {
  const archivo = path.isAbsolute(arg) ? arg : path.join(RAIZ, arg);
  const nombre = path.parse(archivo).name.replace(/[^\w.-]+/g, "_");
  const r = ejecutar("ffmpeg", ["-nostdin", "-v", "info", "-i", archivo, "-vn", "-af", "ebur128=peak=true", "-f", "null", "-"]);
  const momentaneas = [];
  for (const l of r.stderr.split("\n")) {
    const m = /t:\s+([\d.]+)\s+TARGET:-23 LUFS\s+M:\s*(-?[\d.]+|-inf)/.exec(l);
    if (m) momentaneas.push([Number(m[1]), m[2] === "-inf" ? -70 : Math.max(-70, Number(m[2]))]);
  }
  if (!momentaneas.length) {
    log.aviso(`${nombre}: no pude leer la curva`);
    continue;
  }
  const duracion = Math.ceil(momentaneas[momentaneas.length - 1][0]);
  const cubos = Array.from({ length: duracion }, () => []);
  for (const [t, db] of momentaneas) {
    const i = Math.min(duracion - 1, Math.floor(t - 1e-6));
    cubos[Math.max(0, i)].push(db);
  }
  const db = cubos.map((c) => (c.length ? Math.round(10 * Math.log10(c.reduce((s, x) => s + 10 ** (x / 10), 0) / c.length) * 10) / 10 : -70));
  fs.writeFileSync(path.join(DESTINO, `${nombre}.json`), JSON.stringify({ archivo: path.basename(archivo), duracion, db }) + "\n");
  log.ok(`${nombre}: ${duracion} s · de ${Math.min(...db.filter((x) => x > -70)).toFixed(1)} a ${Math.max(...db).toFixed(1)} LUFS`);
}
