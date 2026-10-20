#!/usr/bin/env node
/**
 * anclas-locucion.mjs — en qué frame de la comp cae cada palabra en que CAMBIA un plano, a partir de la transcripción por palabra de la locución.
 *
 * Uso (desde la raíz del repo):
 *   node proyectos/053/herramientas/anclas-locucion.mjs proyectos/053/voz/off.json --en 6 [--desde 0] [--fps 30]
 *
 * `--en` y `--desde` son los del tramo `off-locucion` de `audio-053.ts`. Imprime, por ancla, el segundo de la palabra, su frame y el `en` que se le pone al plano
 * (la palabra + 4 f: el plano es opaco 4 f después de que empiece, su disolvencia de 12 f empieza 8 f antes). Son los números de `P` en `metraje-053.ts`.
 * Los tiempos son del DTW de whisper (a ±0,1 s): se afinan con `onsets-voz.py` y se comprueba en el frame. Es lo que se hizo a mano con la pista guía.
 */
import fs from "node:fs";

const args = process.argv.slice(2);
const ruta = args[0];
const opt = (n, d) => (args.includes(`--${n}`) ? Number(args[args.indexOf(`--${n}`) + 1]) : d);
const EN = opt("en", 6);
const DESDE = opt("desde", 0);
const FPS = opt("fps", 30);
if (!ruta) {
  console.error("uso: node proyectos/053/herramientas/anclas-locucion.mjs <voz/off.json> --en 6 [--desde 0] [--fps 30]");
  process.exit(1);
}
const norm = (t) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9/]/g, "");
const palabras = JSON.parse(fs.readFileSync(ruta, "utf8"))
  .transcription.map((t) => ({ t: norm(t.text), s: t.offsets.from / 1000, e: t.offsets.to / 1000 }))
  .filter((p) => p.t);

// Cada ancla: [nombre del cambio en `P`, secuencia de palabras que la identifica (se busca EN ORDEN, tras la ancla anterior), cuál de ellas es la del cambio]
const ANCLAS = [
  ["cielo", ["imagina"], 0],
  ["cocina", ["viene"], 0],
  ["bar", ["totalmente", "equipada"], 1],
  ["balcon", ["lavadora", "y", "secadora"], 2],
  ["alcoba", ["salon", "social"], 0],
  ["sala", ["ubicacion", "en", "el", "sector"], 1],
  ["piscina", ["todo", "en", "este", "apartamento"], 0],
];
let desde = 0;
console.log("ancla      palabra        s (archivo)  frame de la palabra  `en` sugerido (palabra + 4 f)");
for (const [nombre, seq, cual] of ANCLAS) {
  let hallada = -1;
  for (let i = desde; i <= palabras.length - seq.length; i++) {
    if (seq.every((w, k) => palabras[i + k].t === w || palabras[i + k].t.startsWith(w))) {
      hallada = i;
      break;
    }
  }
  if (hallada < 0) {
    console.log(`${nombre.padEnd(10)} ✘ no encuentro «${seq.join(" ")}» tras la ancla anterior`);
    continue;
  }
  const p = palabras[hallada + cual];
  const f = EN + Math.round((p.s - DESDE) * FPS);
  console.log(`${nombre.padEnd(10)} ${p.t.padEnd(14)} ${p.s.toFixed(2).padStart(8)}     f${String(f).padEnd(6)}         ${f + 4}`);
  desde = hallada + 1;
}
const ult = palabras.at(-1);
console.log(`\núltima palabra: «${ult.t}» ${ult.s.toFixed(2)}-${ult.e.toFixed(2)} s → f${EN + Math.round((ult.e - DESDE) * FPS)} (el CTA empieza ≥ 18 f después)`);
