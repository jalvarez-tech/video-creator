#!/usr/bin/env node
/**
 * PUERTA DEL 011 — mide lo que no se ve en ningún frame.
 *
 *   node proyectos/011/revisar-011.mjs [carpeta-origen]
 *
 * Siete comprobaciones. Las del FORMATO salen de
 * `remotion/src/motor/metraje/revisar-metraje.mjs`, que nació de esta puerta y
 * de la del 010 (R20); las demás son de este encargo:
 *
 *   1. la línea de tiempo no tiene huecos ni solapes (formato), el CAPITULO
 *      (glorieta → salón) cae en un corte y los ANCLAJES de contenido caen en
 *      su frame (el beso en el f1002, el cuchillo del pastel en el RELEVO)
 *   2. ningún corte pide más metraje del que tiene el archivo, CONTANDO el
 *      prerrollo y la cola de las disolvencias (formato)  → Remotion congela en
 *      silencio
 *   3. ningún tramo de vídeo se usa dos veces (formato)
 *   4. TODOS los archivos de la carpeta Boda salen al menos una vez (el encargo)
 *   5. cada corte cae en un golpe MEDIDO de SU canción (±2 f): Turning Page
 *      antes del RELEVO, El Preso después
 *   6. los dos stems de música existen y cubren su tramo entero
 *   7. el plano cubre el cuadro y ningún punch-in pasa del techo de 1,12
 *      (normalización a 1296 px) (formato)
 *
 * Sale con 1 si algo falla. No necesita Remotion: ejecuta los datos, no el JSX.
 */
import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { abrePuerta, PUBLICO } from "../../remotion/src/motor/metraje/revisar-metraje.mjs";

const AQUI = dirname(fileURLToPath(import.meta.url));
const ORIGEN = process.argv[2] ?? join(homedir(), "Downloads", "Boda");
const TECHO_ZOOM = 1.12;
const TOLERANCIA_GOLPE = 2; // frames

const puerta = await abrePuerta({
  proyecto: "011",
  plan: "remotion/src/proyectos/011/metraje-011.ts",
  cortes: "metraje011",
  receta: "bash proyectos/011/normalizar.sh",
});
const { cortes, fps, fallos, mal, ok, seccion } = puerta;

// Las fronteras se LEEN del plan: una puerta con sus propias copias dejaría de
// medir el vídeo que se renderiza en cuanto alguien moviera el relevo (ya pasó:
// el relevo se movió del 1:00 al 1:18 a petición del cliente).
const { CAPITULO, RELEVO, DURACION_011: DURACION, FPS_011 } = puerta.plan;
/** Momentos de CONTENIDO que tienen que caer en un frame concreto (03-timeline). */
const ANCLAJES = [
  { id: "c11", fuente: 36.0, frame: 1002, que: "empieza el beso sobre la subida de Turning Page" },
  { id: "r06", fuente: 6.5, frame: RELEVO, que: "la novia levanta el cuchillo en el primer golpe de El Preso" },
];

/* 1 · línea de tiempo ───────────────────────────────────────────────────────── */
seccion("1. línea de tiempo");
if (![CAPITULO, RELEVO, DURACION].every(Number.isFinite)) mal("no se pudieron leer CAPITULO / RELEVO / DURACION_011 del plan");
if (FPS_011 !== fps) mal(`el plan declara FPS_011 = ${FPS_011} y la puerta mide a ${fps} fps`);
puerta.lineaDeTiempo({ duracion: DURACION });
const n1 = fallos.length;
if (!cortes.some((c) => c.en === CAPITULO)) mal(`ningún corte empieza en el CAPITULO (f${CAPITULO})`);
for (const a of ANCLAJES) {
  const c = cortes.find((x) => x.id === a.id);
  const f = c ? c.en + (a.fuente - (c.desde ?? 0)) * fps : NaN;
  if (!c || !(f >= c.en && f < c.en + c.dur)) mal(`anclaje ${a.id}: el segundo ${a.fuente} del clip no está dentro del plano`);
  else if (Math.abs(f - a.frame) > 1) mal(`anclaje ${a.id} (${a.que}) cae en el f${f.toFixed(1)} y tiene que caer en el f${a.frame}`);
}
if (fallos.length === n1) ok(`capítulo en f${CAPITULO} · anclajes: ${ANCLAJES.map((a) => `${a.id}@f${a.frame}`).join(", ")}`);

/* 2 · metraje disponible (con disolvencias) ────────────────────────────────── */
seccion("2. metraje disponible");
puerta.metrajeDisponible();

/* 3 · tramos disjuntos ─────────────────────────────────────────────────────── */
seccion("3. tramos disjuntos");
puerta.tramosDisjuntos();

/* 4 · todos los archivos ───────────────────────────────────────────────────── */
seccion("4. todos los archivos de la carpeta");
puerta.todosLosArchivos({ carpeta: "boda-011", origen: ORIGEN });

/* 5 · cortes sobre golpes medidos ──────────────────────────────────────────── */
seccion("5. cortes sobre golpes");
const n5 = fallos.length;
const golpes = JSON.parse(readFileSync(join(AQUI, "musica", "golpes-011.json"), "utf8"));
for (const c of cortes) {
  // El f0 lo fija `desde_s`, y el CAPITULO está anclado a un RESPIRO de la canción, no a un golpe.
  if (c.en === 0 || c.en === CAPITULO) continue;
  const tramo = c.en < RELEVO ? golpes.boda : golpes.rumba;
  const cerca = tramo.golpes.map(([t]) => Math.abs(t * fps - c.en)).reduce((m, d) => Math.min(m, d), Infinity);
  if (cerca > TOLERANCIA_GOLPE) mal(`${c.id}: entra en el f${c.en}, a ${cerca.toFixed(1)} f del golpe medido más cercano`);
}
if (fallos.length === n5) ok(`los ${cortes.length - 2} cortes internos caen a ≤${TOLERANCIA_GOLPE} f de un golpe medido de su canción`);

/* 6 · música ───────────────────────────────────────────────────────────────── */
seccion("6. música");
const n6 = fallos.length;
for (const [wav, frames] of [
  ["boda-011/011-boda-turning-page.wav", RELEVO],
  ["boda-011/011-rumba-el-preso.wav", DURACION - RELEVO],
]) {
  if (!existsSync(join(PUBLICO, wav))) {
    mal(`falta ${wav} (receta en proyectos/011/musica/README.md)`);
    continue;
  }
  const d = puerta.duracionDe(wav);
  if (d * fps < frames - 0.5) mal(`${wav} dura ${d.toFixed(2)} s y tiene que cubrir ${(frames / fps).toFixed(2)} s`);
}
if (fallos.length === n6) ok(`los dos stems existen y cubren su tramo (${(RELEVO / fps).toFixed(0)} s + ${((DURACION - RELEVO) / fps).toFixed(0)} s)`);

/* 7 · encuadre y techo de punch-in ─────────────────────────────────────────── */
seccion("7. encuadre");
puerta.encuadre({ techoZoom: TECHO_ZOOM });

puerta.cierra("el plan del 011 pasa las siete puertas");
