#!/usr/bin/env node
/**
 * PUERTA DEL 014 — los insertos de b-roll (3.ª pasada).
 *
 *   node proyectos/014/revisar-014.mjs
 *
 * Las comprobaciones del FORMATO salen de `revisar-metraje.mjs` (metraje
 * disponible, tramos, encuadre). La línea de tiempo NO: esto no es una pieza de
 * montaje, son insertos sobre un avatar, y entre ellos lo que hay es él. Lo de
 * este encargo, que ningún frame enseña:
 *
 *   1. los insertos van en orden, sin solaparse, dentro de la pieza, y ninguno
 *      toca el hook (f0-f158: el f0 es la miniatura y el hook es su cara)
 *   2. cada corte —entrada y salida— cae en un ANCLA declarada, y cada ancla de
 *      texto sigue cayendo donde el plan de gráficos pone ese texto (si alguien
 *      mueve un ✓, el corte se queda solo y esto lo dice)
 *   3. cada inserto cae ENTERO dentro de una toma de la banda: el velo del texto
 *      está debajo en todos sus frames
 *   4. cada clip está en el manifiesto con autor, licencia y porqué, su sha256
 *      es el del archivo servido, y MIDE de verdad 1080×1920 o más — el banco
 *      declaró 1080×2048 dos veces para archivos de 720×1366 (R16)
 *   5-7. metraje disponible · tramos disjuntos · encuadre (formato)
 *
 * Sale con 1 si algo falla.
 */
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { abrePuerta, PUBLICO, RAIZ } from "../../remotion/src/motor/metraje/revisar-metraje.mjs";

const DURACION = 1471;
const HOOK = 159;
const TECHO_ZOOM = 1.25;

const puerta = await abrePuerta({
  proyecto: "014",
  plan: "remotion/src/proyectos/014/metraje-014.ts",
  cortes: "insertos014",
  receta: "python3 manuales/edicion-video/scripts/bancos.py reponer --proyecto 014",
  extras: { graficos: "remotion/src/proyectos/014/graficos-014.ts" },
});
const { cortes, fps, fallos, mal, ok, seccion } = puerta;
const { ANCLAS_014: ANCLAS } = puerta.plan;
const plan = puerta.modulos.graficos.graficos014;

/* 1 · orden ─────────────────────────────────────────────────────────────── */
seccion("1. insertos");
{
  const n = fallos.length;
  let fin = 0;
  for (const c of cortes) {
    if (!Number.isInteger(c.en) || !Number.isInteger(c.dur) || c.dur <= 0) mal(`${c.id}: en=${c.en} dur=${c.dur}`);
    if (c.en < fin) mal(`${c.id}: entra en ${c.en} y el anterior acaba en ${fin}`);
    if (c.en < HOOK) mal(`${c.id}: entra en ${c.en}, dentro del hook (f0-f${HOOK - 1}); el hook es su cara`);
    if (c.en + c.dur > DURACION) mal(`${c.id}: acaba en ${c.en + c.dur} y la pieza dura ${DURACION}`);
    if (c.entra && c.entra !== "corte") mal(`${c.id}: entra con «${c.entra}»; en esta pieza todos los cortes son secos`);
    fin = c.en + c.dur;
  }
  const total = cortes.reduce((s, c) => s + c.dur, 0);
  if (fallos.length === n) ok(`${cortes.length} insertos en orden · ${total} f de b-roll (${((100 * total) / DURACION).toFixed(0)} % de la pieza) · el hook, limpio`);
}

/* 2 · anclas ────────────────────────────────────────────────────────────── */
seccion("2. cada corte cae en un ancla");
{
  const n = fallos.length;
  // Frames ABSOLUTOS de los textos del plan, resueltos como el intérprete: un
  // `en` numérico se suma al frame del padre; sin él, la escalera de la ley.
  const escalera = plan.dialecto.ley.escalera;
  const textoDe = (nodo) => {
    const p = nodo.props ?? {};
    const plano = (t) => (typeof t === "string" ? t : (t ?? []).map((x) => (typeof x === "string" ? x : x.t)).join(""));
    if (nodo.pieza === "lista") return plano(p.items?.[0]?.texto);
    if (nodo.pieza === "titular") return p.lineas ? plano(p.lineas[0]) : plano(p.texto);
    if (nodo.pieza === "chip" || nodo.pieza === "kicker") return plano(p.texto);
    return null;
  };
  const textos = new Map();
  const anda = (nodos, base) =>
    nodos.forEach((nodo, i) => {
      const f = typeof nodo.en === "number" ? base + nodo.en : base + escalera[Math.min(i, escalera.length - 1)];
      const t = textoDe(nodo);
      if (t) textos.set(t.trim(), f);
      if (nodo.hijos) anda(nodo.hijos, f);
    });
  for (const toma of plan.tomas) anda(toma.hijos, toma.ventana[0]);

  const porFrame = new Map(ANCLAS.map((a) => [a.frame, a]));
  for (const a of ANCLAS) {
    if (!a.texto) continue;
    const f = textos.get(a.texto);
    if (f === undefined) mal(`ancla f${a.frame}: el plan de gráficos ya no tiene el texto «${a.texto}»`);
    else if (f !== a.frame) mal(`ancla f${a.frame}: «${a.texto}» aterriza en f${f} según el plan; el corte se quedó solo`);
  }
  for (const c of cortes) {
    for (const f of [c.en, c.en + c.dur]) if (!porFrame.has(f)) mal(`${c.id}: corta en f${f}, que no es ningún ancla declarada`);
  }
  if (fallos.length === n) ok(`${cortes.length * 2} cortes en ${ANCLAS.length} anclas · los textos siguen cayendo donde dice el plan`);
}

/* 3 · velo ──────────────────────────────────────────────────────────────── */
seccion("3. el velo de la banda está debajo");
{
  const n = fallos.length;
  for (const c of cortes) {
    const toma = plan.tomas.find((t) => t.ventana[0] <= c.en && c.en + c.dur <= t.ventana[1]);
    if (!toma) mal(`${c.id}: [${c.en}, ${c.en + c.dur}) no cae entero dentro de ninguna toma: habría frames de b-roll sin velo bajo la banda`);
  }
  if (fallos.length === n) ok("cada inserto cae entero dentro de una toma con velo");
}

/* 4 · manifiesto y medida ───────────────────────────────────────────────── */
seccion("4. crédito, huella y medida real");
{
  const n = fallos.length;
  const manifiesto = JSON.parse(readFileSync(join(RAIZ, "proyectos/014/broll/manifiesto.json"), "utf8"));
  const porServido = new Map(Object.entries(manifiesto.assets).map(([toma, a]) => [a.servido, { toma, ...a }]));
  for (const c of cortes) {
    const a = porServido.get(c.src);
    if (!a) {
      mal(`${c.id}: ${c.src} no está en el manifiesto — sin crédito no se publica (R16)`);
      continue;
    }
    for (const campo of ["autor", "licencia", "origen_url", "porque"]) if (!a[campo]) mal(`${c.id}: el manifiesto no tiene «${campo}» de ${a.toma}`);
    const ruta = join(PUBLICO, c.src);
    if (!existsSync(ruta)) continue; // ya lo dice «metraje disponible»
    const sha = createHash("sha256").update(readFileSync(ruta)).digest("hex");
    if (sha !== a.sha256) mal(`${c.id}: el archivo servido NO es el que se eligió (sha ${sha.slice(0, 10)}… vs ${a.sha256.slice(0, 10)}…)`);
    const [w, h] = execFileSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "csv=p=0", ruta])
      .toString()
      .trim()
      .split(",")
      .map(Number);
    if (w < 1080 || h < 1920) mal(`${c.id}: mide ${w}×${h} y va a sangre en 1080×1920 — el banco declaró ${a.ancho}×${a.alto}`);
  }
  if (fallos.length === n) ok("los clips tienen crédito, son los elegidos y llegan a 1080×1920");
}

/* 5-7 · formato ─────────────────────────────────────────────────────────── */
seccion("5. metraje disponible");
puerta.metrajeDisponible();
seccion("6. tramos disjuntos");
puerta.tramosDisjuntos();
seccion("7. encuadre");
puerta.encuadre({ techoZoom: TECHO_ZOOM });

puerta.cierra(`los ${cortes.length} insertos del 014 pasan la puerta`);
