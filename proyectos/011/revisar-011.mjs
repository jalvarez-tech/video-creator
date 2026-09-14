#!/usr/bin/env node
/**
 * PUERTA DEL 011 — mide lo que no se ve en ningún frame.
 *
 *   node proyectos/011/revisar-011.mjs [carpeta-origen]
 *
 * Siete comprobaciones. Las tres primeras son las del 010 (R20); las otras
 * cuatro son de este encargo:
 *
 *   1. la línea de tiempo no tiene huecos ni solapes, el CAPITULO (glorieta →
 *      salón) cae en un corte y los ANCLAJES de contenido caen en su frame
 *      (el beso en el f1002, el cuchillo del pastel en el RELEVO)
 *   2. ningún corte pide más metraje del que tiene el archivo, CONTANDO el
 *      prerrollo y la cola de las disolvencias  → Remotion congela en silencio
 *   3. ningún tramo de vídeo se usa dos veces
 *   4. TODOS los archivos de la carpeta Boda salen al menos una vez (el encargo)
 *   5. cada corte cae en un golpe MEDIDO de SU canción (±2 f): Turning Page
 *      antes del RELEVO, El Preso después
 *   6. los dos stems de música existen y cubren su tramo entero
 *   7. ningún punch-in pasa del techo de 1,12 (normalización a 1296 px)
 *
 * Sale con 1 si algo falla. No necesita Remotion: lee los datos, no el JSX.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, parse } from "node:path";
import { homedir } from "node:os";

const AQUI = dirname(fileURLToPath(import.meta.url));
const RAIZ = join(AQUI, "..", "..");
const PUBLICO = join(RAIZ, "remotion", "public");
const ORIGEN = process.argv[2] ?? join(homedir(), "Downloads", "Boda");
const FPS = 30;
const DISOLVER = 12; // debe coincidir con PistaMetraje.tsx
const TECHO_ZOOM = 1.12;
const TOLERANCIA_GOLPE = 2; // frames

const fallos = [];
const ok = (m) => console.log(`  ✅ ${m}`);
const mal = (m) => {
  fallos.push(m);
  console.log(`  ❌ ${m}`);
};

const ts = readFileSync(join(RAIZ, "remotion/src/proyectos/011/metraje-011.ts"), "utf8");
// Las fronteras se LEEN del plan: una puerta con sus propias copias dejaría de
// medir el vídeo que se renderiza en cuanto alguien moviera el relevo (ya pasó:
// el relevo se movió del 1:00 al 1:18 a petición del cliente).
const constante = (n) => Number(ts.match(new RegExp(`export const ${n} = ([0-9]+);`))?.[1]);
const CAPITULO = constante("CAPITULO");
const RELEVO = constante("RELEVO");
const DURACION = constante("DURACION_011");
/** Momentos de CONTENIDO que tienen que caer en un frame concreto (03-timeline). */
const ANCLAJES = [
  { id: "c11", fuente: 36.0, frame: 1002, que: "empieza el beso sobre la subida de Turning Page" },
  { id: "r06", fuente: 6.5, frame: RELEVO, que: "la novia levanta el cuchillo en el primer golpe de El Preso" },
];
const rutas = Object.fromEntries([...ts.matchAll(/^const ([A-Z_0-9]+) = "([^"]+)";$/gm)].map((m) => [m[1], m[2]]));
const cortes = [];
for (const bloque of ts.slice(ts.indexOf("export const metraje011")).split(/\n  \{\n/).slice(1)) {
  const campo = (n, re) => bloque.match(new RegExp(`\\b${n}:\\s*(${re})`))?.[1];
  const zoom = bloque.match(/\bzoom:\s*\[([0-9.]+),\s*([0-9.]+)\]/);
  cortes.push({
    id: campo("id", '"[^"]+"').slice(1, -1),
    tipo: campo("tipo", '"[^"]+"').slice(1, -1),
    ruta: rutas[campo("src", "[A-Z_0-9]+")],
    desde: Number(campo("desde", "[0-9.]+") ?? 0),
    en: Number(campo("en", "[0-9]+")),
    dur: Number(campo("dur", "[0-9]+")),
    entra: campo("entra", '"[^"]+"')?.slice(1, -1) ?? "corte",
    zoom: zoom ? [Number(zoom[1]), Number(zoom[2])] : [NaN, NaN],
  });
}

const duracionDe = (ruta) =>
  Number(
    execFileSync(
      "ffprobe",
      ["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", join(PUBLICO, ruta)],
      { stdio: ["ignore", "pipe", "ignore"] }
    )
      .toString()
      .trim()
  );

console.log(`\n011 · ${cortes.length} cortes\n`);

/* 1 · línea de tiempo ───────────────────────────────────────────────────────── */
console.log("1. línea de tiempo");
if (![CAPITULO, RELEVO, DURACION].every(Number.isFinite)) mal("no se pudieron leer CAPITULO / RELEVO / DURACION_011 del plan");
let cursor = 0;
for (const c of cortes) {
  if (c.en !== cursor) mal(`${c.id}: entra en ${c.en} pero el anterior acaba en ${cursor}`);
  cursor = c.en + c.dur;
}
if (cursor !== DURACION) mal(`el plan acaba en ${cursor} f y la comp dura ${DURACION}`);
if (!cortes.some((c) => c.en === CAPITULO)) mal(`ningún corte empieza en el CAPITULO (f${CAPITULO})`);
for (const a of ANCLAJES) {
  const c = cortes.find((x) => x.id === a.id);
  const f = c ? c.en + (a.fuente - c.desde) * FPS : NaN;
  if (!c || !(f >= c.en && f < c.en + c.dur)) mal(`anclaje ${a.id}: el segundo ${a.fuente} del clip no está dentro del plano`);
  else if (Math.abs(f - a.frame) > 1) mal(`anclaje ${a.id} (${a.que}) cae en el f${f.toFixed(1)} y tiene que caer en el f${a.frame}`);
}
if (!fallos.length) ok(`sin huecos ni solapes · ${cursor} f · capítulo en f${CAPITULO} · anclajes: ${ANCLAJES.map((a) => `${a.id}@f${a.frame}`).join(", ")}`);

/* 2 · metraje disponible (con disolvencias) ────────────────────────────────── */
console.log("2. metraje disponible");
const n2 = fallos.length;
const duraciones = {};
cortes.forEach((c, i) => {
  if (!existsSync(join(PUBLICO, c.ruta))) return mal(`${c.id}: no existe ${c.ruta} (¿normalizar.sh?)`);
  if (c.tipo !== "video") return;
  duraciones[c.ruta] ??= duracionDe(c.ruta);
  const solape = c.entra === "disolver" ? DISOLVER : 0;
  const cola = cortes[i + 1]?.entra === "disolver" ? DISOLVER : 0;
  const a = c.desde - solape / FPS;
  const b = c.desde + (c.dur + cola) / FPS;
  if (a < 0) mal(`${c.id}: la disolvencia pide empezar en ${a.toFixed(2)} s de ${c.ruta}`);
  if (b > duraciones[c.ruta] - 1 / FPS + 1e-6) {
    mal(`${c.id}: pide hasta ${b.toFixed(2)} s de ${c.ruta} (dura ${duraciones[c.ruta].toFixed(2)} s)`);
  }
});
if (fallos.length === n2) ok("ningún corte pide más metraje del que hay (prerrollo y cola incluidos)");

/* 3 · tramos disjuntos ─────────────────────────────────────────────────────── */
console.log("3. tramos disjuntos");
const n3 = fallos.length;
const porArchivo = {};
for (const c of cortes.filter((x) => x.tipo === "video")) {
  (porArchivo[c.ruta] ??= []).push({ id: c.id, a: c.desde, b: c.desde + c.dur / FPS });
}
for (const [ruta, tramos] of Object.entries(porArchivo)) {
  tramos.sort((x, y) => x.a - y.a);
  for (let i = 1; i < tramos.length; i++) {
    const solape = tramos[i - 1].b - tramos[i].a;
    if (solape > 0.15) mal(`${ruta}: ${tramos[i - 1].id} y ${tramos[i].id} comparten ${solape.toFixed(2)} s`);
  }
}
if (fallos.length === n3) ok("ningún tramo de vídeo se usa dos veces");

/* 4 · todos los archivos ───────────────────────────────────────────────────── */
console.log("4. todos los archivos de la carpeta");
const n4 = fallos.length;
const usados = new Set(cortes.map((c) => parse(c.ruta).name));
const materiales = existsSync(ORIGEN)
  ? readdirSync(ORIGEN).filter((f) => /\.(mov|mp4|heic|jpe?g)$/i.test(f))
  : readdirSync(join(PUBLICO, "boda-011")).filter((f) => /\.(mp4|jpe?g)$/i.test(f));
for (const f of materiales) if (!usados.has(parse(f).name)) mal(`${f} no sale en el vídeo`);
if (fallos.length === n4) {
  ok(`${materiales.length}/${materiales.length} archivos en pantalla${existsSync(ORIGEN) ? "" : " (sin la carpeta original: contra public/)"}`);
}

/* 5 · cortes sobre golpes medidos ──────────────────────────────────────────── */
console.log("5. cortes sobre golpes");
const n5 = fallos.length;
const golpes = JSON.parse(readFileSync(join(AQUI, "musica", "golpes-011.json"), "utf8"));
for (const c of cortes) {
  // El f0 lo fija `desde_s`, y el CAPITULO está anclado a un RESPIRO de la canción, no a un golpe.
  if (c.en === 0 || c.en === CAPITULO) continue;
  const tramo = c.en < RELEVO ? golpes.boda : golpes.rumba;
  const cerca = tramo.golpes.map(([t]) => Math.abs(t * FPS - c.en)).reduce((m, d) => Math.min(m, d), Infinity);
  if (cerca > TOLERANCIA_GOLPE) mal(`${c.id}: entra en el f${c.en}, a ${cerca.toFixed(1)} f del golpe medido más cercano`);
}
if (fallos.length === n5) ok(`los ${cortes.length - 2} cortes internos caen a ≤${TOLERANCIA_GOLPE} f de un golpe medido de su canción`);

/* 6 · música ───────────────────────────────────────────────────────────────── */
console.log("6. música");
const n6 = fallos.length;
for (const [wav, frames] of [
  ["boda-011/011-boda-turning-page.wav", RELEVO],
  ["boda-011/011-rumba-el-preso.wav", DURACION - RELEVO],
]) {
  if (!existsSync(join(PUBLICO, wav))) {
    mal(`falta ${wav} (receta en proyectos/011/musica/README.md)`);
    continue;
  }
  const d = duracionDe(wav);
  if (d * FPS < frames - 0.5) mal(`${wav} dura ${d.toFixed(2)} s y tiene que cubrir ${(frames / FPS).toFixed(2)} s`);
}
if (fallos.length === n6) ok(`los dos stems existen y cubren su tramo (${(RELEVO / FPS).toFixed(0)} s + ${((DURACION - RELEVO) / FPS).toFixed(0)} s)`);

/* 7 · techo de zoom ────────────────────────────────────────────────────────── */
console.log("7. punch-in");
const n7 = fallos.length;
for (const c of cortes) {
  if (!(Math.max(...c.zoom) <= TECHO_ZOOM) || Math.min(...c.zoom) < 1) mal(`${c.id}: zoom ${c.zoom} fuera de [1, ${TECHO_ZOOM}]`);
}
if (fallos.length === n7) ok(`todos los zoom dentro de [1, ${TECHO_ZOOM}]`);

console.log(fallos.length ? `\n❌ ${fallos.length} fallo(s)\n` : "\n✅ el plan del 011 pasa las siete puertas\n");
process.exit(fallos.length ? 1 : 0);
