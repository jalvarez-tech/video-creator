#!/usr/bin/env node
/**
 * PUERTA DEL 010 — mide lo que no se ve en ningún frame.
 *
 *   node proyectos/010/revisar-010.mjs
 *
 * Cinco comprobaciones, y las cinco existen porque el fallo correspondiente
 * SOBREVIVE a una revisión por frames:
 *
 *   1. la línea de tiempo no tiene huecos ni solapes  → un hueco pinta negro un
 *      instante, y si cae entre dos frames de revisión no lo ves
 *   2. ningún corte pide más metraje del que tiene el archivo  → Remotion
 *      congela el último fotograma en silencio, no falla
 *   3. ningún TRAMO de vídeo se usa dos veces  → la repetición se percibe pero
 *      es dificilísima de localizar mirando
 *   4. los subtítulos no se solapan y caben dentro de la voz
 *   5. la duración del plan coincide con la voz (+ el margen del cierre)
 *
 * Sale con 1 si algo falla. No necesita Remotion: lee los datos, no el JSX.
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const PUBLICO = join(RAIZ, "remotion", "public");
const FPS = 30;
const DUR_VOZ = 72.4595;
const MARGEN_CIERRE = 60; // frames de rótulo limpio más allá de la voz

const fallos = [];
const ok = (m) => console.log(`  ✅ ${m}`);
const mal = (m) => {
  fallos.push(m);
  console.log(`  ❌ ${m}`);
};

/** Lee los literales del plan sin ejecutar TypeScript. */
const leePlan = () => {
  const ts = readFileSync(join(RAIZ, "remotion/src/proyectos/010/metraje-010.ts"), "utf8");
  // Las constantes numéricas del fichero (hoy solo `VEL_NINOS`), para poder
  // resolver `velocidad: VEL_NINOS`. Leer el literal crudo daba `undefined` →
  // velocidad 1 → la puerta medía otro vídeo del que se renderiza, que es peor
  // que no tener puerta.
  const constantes = Object.fromEntries(
    [...ts.matchAll(/^const ([A-Z_0-9]+) = ([0-9.]+);$/gm)].map((m) => [m[1], Number(m[2])])
  );
  const numero = (v, defecto) =>
    v === undefined ? defecto : /^[0-9.]+$/.test(v) ? Number(v) : (constantes[v] ?? NaN);
  const cuerpo = ts.slice(ts.indexOf("export const metraje010"));
  const cortes = [];
  for (const bloque of cuerpo.split(/\n  \{\n/).slice(1)) {
    const campo = (n, re) => {
      const m = bloque.match(new RegExp(`\\b${n}:\\s*(${re})`));
      return m ? m[1] : undefined;
    };
    const src = campo("src", "[A-Z_0-9]+");
    if (!src) continue;
    cortes.push({
      id: campo("id", '"[^"]+"').slice(1, -1),
      tipo: campo("tipo", '"[^"]+"').slice(1, -1),
      srcVar: src,
      desde: numero(campo("desde", "[0-9.]+"), 0),
      en: Number(campo("en", "[0-9]+")),
      dur: Number(campo("dur", "[0-9]+")),
      velocidad: numero(campo("velocidad", "[0-9.]+|[A-Z_0-9]+"), 1),
    });
  }
  const rutas = Object.fromEntries(
    [...ts.matchAll(/^const ([A-Z_0-9]+) = "([^"]+)";$/gm)].map((m) => [m[1], m[2]])
  );
  return { cortes, rutas };
};

const duracionDe = (ruta) =>
  Number(
    execFileSync("ffprobe", [
      "-v", "error", "-show_entries", "format=duration",
      "-of", "default=noprint_wrappers=1:nokey=1", join(PUBLICO, ruta),
      // `stderr: "ignore"`: el MP4 original de `v-gracias` viene con NAL units
      // rotas (compresión de mensajería) y ffprobe escupe cien líneas por
      // lectura. El archivo se decodifica entero igual —se comprobó— y aquí
      // solo se quiere el número.
    ], { stdio: ["ignore", "pipe", "ignore"] }).toString().trim()
  );

const { cortes, rutas } = leePlan();
console.log(`\n010 · ${cortes.length} cortes\n`);
for (const c of cortes) {
  if (!Number.isFinite(c.velocidad)) mal(`${c.id}: no se pudo resolver la velocidad`);
}

/* 1 · línea de tiempo continua ─────────────────────────────────────────────── */
console.log("1. línea de tiempo");
let cursor = 0;
for (const c of cortes) {
  if (c.en !== cursor) mal(`${c.id}: entra en ${c.en} pero el anterior acaba en ${cursor}`);
  cursor = c.en + c.dur;
}
if (!fallos.length) ok(`sin huecos ni solapes · ${cursor} f (${(cursor / FPS).toFixed(2)} s)`);

/* 2 · cada corte cabe en su archivo ────────────────────────────────────────── */
console.log("2. metraje disponible");
const duraciones = {};
for (const c of cortes.filter((x) => x.tipo === "video")) {
  const ruta = rutas[c.srcVar];
  duraciones[ruta] ??= duracionDe(ruta);
  const fin = c.desde + (c.dur / FPS) * c.velocidad;
  if (fin > duraciones[ruta] + 0.01) {
    mal(`${c.id}: pide hasta ${fin.toFixed(2)} s de ${ruta} (dura ${duraciones[ruta].toFixed(2)} s)`);
  }
}
ok("ningún corte pide más metraje del que hay");

/* 3 · ningún tramo de vídeo repetido ───────────────────────────────────────── */
console.log("3. tramos disjuntos");
const porArchivo = {};
for (const c of cortes.filter((x) => x.tipo === "video")) {
  const r = rutas[c.srcVar];
  (porArchivo[r] ??= []).push({ id: c.id, a: c.desde, b: c.desde + (c.dur / FPS) * c.velocidad });
}
for (const [ruta, tramos] of Object.entries(porArchivo)) {
  tramos.sort((x, y) => x.a - y.a);
  for (let i = 1; i < tramos.length; i++) {
    const solape = tramos[i - 1].b - tramos[i].a;
    if (solape > 0.15) {
      mal(`${ruta}: ${tramos[i - 1].id} y ${tramos[i].id} comparten ${solape.toFixed(2)} s`);
    }
  }
}
ok("ningún tramo de vídeo se usa dos veces");

/* 4 · subtítulos ───────────────────────────────────────────────────────────── */
console.log("4. subtítulos");
const subs = readFileSync(join(RAIZ, "remotion/src/proyectos/010/subtitulos-010.ts"), "utf8");
const cues = [...subs.matchAll(/\{ from: ([0-9.]+), to: ([0-9.]+),/g)].map((m) => ({
  from: +m[1],
  to: +m[2],
}));
for (let i = 0; i < cues.length; i++) {
  if (cues[i].to <= cues[i].from) mal(`cue ${i}: to <= from`);
  if (i && cues[i].from < cues[i - 1].to - 0.001) mal(`cue ${i}: solapa con el anterior`);
}
const ultimo = cues.at(-1);
if (ultimo.to > DUR_VOZ + 0.01) mal(`el último subtítulo (${ultimo.to}) pasa del final de la voz`);
ok(`${cues.length} cues en orden y dentro de la voz`);

/* 5 · duración total ───────────────────────────────────────────────────────── */
console.log("5. duración");
const esperado = Math.round(DUR_VOZ * FPS) + MARGEN_CIERRE;
if (cursor !== esperado) mal(`el plan dura ${cursor} f y la voz + margen piden ${esperado} f`);
else ok(`${cursor} f = voz (${Math.round(DUR_VOZ * FPS)} f) + cierre (${MARGEN_CIERRE} f)`);

console.log(fallos.length ? `\n❌ ${fallos.length} fallo(s)\n` : "\n✅ el plan del 010 pasa las cinco puertas\n");
process.exit(fallos.length ? 1 : 0);
