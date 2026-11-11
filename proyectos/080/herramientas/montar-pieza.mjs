#!/usr/bin/env node
/**
 * montar-pieza.mjs — levanta (y vuelve a levantar) una pieza de la tanda 080-087 de la suite Go Living: las variantes B de las piezas 071-078 con la estructura «lo vendible antes del segundo 10».
 *
 *   node proyectos/080/herramientas/montar-pieza.mjs 081            escribe los planos, el audio, los subtítulos, la composición y la puerta de la 081
 *   node proyectos/080/herramientas/montar-pieza.mjs 081 --medir    además mide la música en las ventanas nuevas (ebur128) y la deja en `proyectos/081/medidas/ventanas-musica.json`
 *   node proyectos/080/herramientas/montar-pieza.mjs 081 --solo-plan   solo imprime el reparto de golpes y planos, sin escribir nada
 *
 * LEE `proyectos/NNN/pieza.json` (lo que se decide: dónde cae cada corte y qué plano va) y `proyectos/NNN/origen.json` (los datos de la pieza original, 071-078: sus tomas de voz, su exterior, su canción y sus subtítulos).
 * LO QUE ES DE LA PIEZA y se REESCRIBE cada vez: `metraje-NNN.ts`, `audio-NNN.ts`, `subtitulos-NNN.ts`, `revisar-NNN.mjs` (la plantilla de la 080 con el bloque CONFIG de la pieza) y los artefactos.
 * LO QUE ES LA PLANTILLA (copia de la 080 con el número cambiado): `Recorrido080.tsx`, `ficha-080.ts`, `cierre-080.ts`, `composiciones.tsx`.
 *
 * POR QUÉ UN GENERADOR. Son ocho piezas con la misma estructura y los mismos números por dentro (golpes, voces, niveles de la música); a mano, ocho `metraje` de 400 líneas se desalinean. Aquí cada pieza es un
 * `pieza.json` de unas 60 líneas y la lógica del reparto —que cada cambio de plano caiga en un golpe MEDIDO de su canción— está escrita una sola vez.
 *
 * EL REPARTO DE LOS CORTES. Los cuatro anclajes los fija `pieza.json` (T1 acaba el hook · T2 parte los dos planos rápidos · T3 entra la mitad · B acaba la mitad); el CTA entra donde entraba en la original. Los planos del
 * recorrido (entre B y el CTA) los reparte el generador sobre los golpes medidos: cada uno entre su mínimo y su máximo (lo que queda de su clip), el último —la vista— el más largo.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const NNN = process.argv[2];
const MEDIR = process.argv.includes("--medir");
const SOLO_PLAN = process.argv.includes("--solo-plan");
if (!/^08[0-7]$/.test(NNN ?? "")) {
  console.error("uso: node proyectos/080/herramientas/montar-pieza.mjs NNN [--medir] [--solo-plan]   (NNN: 080-087)");
  process.exit(1);
}
const FPS = 30;
const lee = (rel) => fs.readFileSync(path.join(RAIZ, rel), "utf8");
const escribe = (rel, texto) => {
  if (SOLO_PLAN) return;
  fs.mkdirSync(path.dirname(path.join(RAIZ, rel)), { recursive: true });
  fs.writeFileSync(path.join(RAIZ, rel), texto);
};
const spec = JSON.parse(lee(`proyectos/${NNN}/pieza.json`));
const O = JSON.parse(lee(`proyectos/${NNN}/origen.json`));
const ORIG = spec.origen;
const PUB = `remotion/public/recorrido-${NNN}`;

/* ── Los golpes medidos de la canción ────────────────────────────────────── */

const INICIO = O.INICIO_MUSICA; // s de la fuente en que arranca la canción (múltiplo de 1/30)
const INICIO_F = Math.round(INICIO * FPS);
const golpesCancion = JSON.parse(lee(`proyectos/${NNN}/musica/golpes-cancion-entera.json`)).golpes;
/** El frame entero de la pieza en que SUENA un golpe (la misma cuenta que `golpe()` de `metraje-NNN.ts`). */
const frameDe = (t) => Math.round((t + 0.012 - INICIO + 0.042) * FPS);
const BEATS = golpesCancion.map((g) => ({ f: frameDe(g.t), t: g.t, db: g.db })).filter((g) => g.f > 0);
/** El golpe (el más fuerte) que cae en el frame `f`, o undefined. */
const golpeEn = (f) => BEATS.filter((b) => b.f === f).sort((a, b) => b.db - a.db)[0];

/* ── El material: se clona (APFS, sin coste) del normalizado de la pieza original y de sus hermanas ───── */

const worktrees = path.join(RAIZ, "..");
const bancos = [
  ...fs.readdirSync(worktrees).map((d) => path.join(worktrees, d, "remotion", "public")),
  path.join(RAIZ, "..", "..", "..", "remotion", "public"),
].filter((p) => fs.existsSync(p));
const buscaMaterial = (archivo) => {
  for (const banco of bancos) {
    for (const d of fs.readdirSync(banco).filter((x) => /^recorrido-0\d\d$/.test(x))) {
      const ruta = path.join(banco, d, archivo);
      if (fs.existsSync(ruta)) return ruta;
    }
  }
  return null;
};
/** Copia (clon) un archivo de material a `remotion/public/recorrido-NNN/` si falta. */
const traeMaterial = (archivoOrigen, archivoDestino = archivoOrigen) => {
  const destino = path.join(RAIZ, PUB, archivoDestino);
  if (fs.existsSync(destino)) return destino;
  const origen = buscaMaterial(archivoOrigen);
  if (!origen) throw new Error(`no encuentro ${archivoOrigen} en ningún banco de material (${bancos.length} carpetas)`);
  if (SOLO_PLAN) return origen;
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  execFileSync("cp", ["-c", origen, destino]);
  return destino;
};
const nFrames = (ruta) => Number(execFileSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=nb_frames", "-of", "default=nw=1:nk=1", ruta]).toString().trim());
const clipFrames = (clip) => nFrames(traeMaterial(`${clip}.mp4`));

/* ── Los planos ──────────────────────────────────────────────────────────── */

const orig = (id) => O.cortes.find((c) => c.id === id);
const oExterior = O.cortes.find((c) => c.bloque === 1);
const oHook = O.cortes.find((c) => c.bloque === 2);
const oMitad = O.cortes.find((c) => c.bloque === 4);
const oCta = O.cortes.find((c) => c.bloque === 6 && c.voz);
const oCierre = O.cortes.at(-1);
const clipDe = (c) => c.src.split("/").pop().replace(/\.(mp4|png)$/, "");
const BASE = { contrast: 1.1, blacks: -0.06, shadows: 0.08, highlights: -0.2, whites: -0.05, temperature: 0.03, saturation: 1.1, vibrance: 0 };
/** El ajuste de color (lo que difiere de la base del canal) de un plano de la pieza original. */
const ajusteDe = (color) => Object.fromEntries(Object.entries(color ?? {}).filter(([k, v]) => BASE[k] !== v));
/** El ajuste medido de un clip: el del plano de la pieza original que lo usa o, si no lo usa, el de cualquier pieza hermana (el clip es el mismo archivo normalizado). */
const ajusteDeClip = (clip) => {
  const propio = O.cortes.find((c) => clipDe(c) === clip && c.tipo === "video" && !c.audio);
  if (propio) return ajusteDe(propio.color);
  for (const n of ["070", "071", "072", "073", "074", "075", "076", "077", "078"]) {
    const ruta = path.join(RAIZ, "..", "suite-hotelera-videos-e02d0b", "proyectos", n, "origen.json");
    void ruta;
  }
  return AJUSTES_CLIP[clip] ?? {};
};
/** Ajustes de color por clip sacados de las piezas originales (`ajustes-color-clips.json`, generado una vez de los planes 070-078). */
const AJUSTES_CLIP = JSON.parse(lee("proyectos/080/herramientas/ajustes-color-clips.json"));

const pideColor = (aj) => (Object.keys(aj).length ? `color(${JSON.stringify(aj).replace(/"([a-zA-Z]+)":/g, "$1: ").replace(/,/g, ", ").replace(/^\{/, "{ ").replace(/\}$/, " }")})` : "color()");
const num = (x) => {
  const c = Math.round(x * 100);
  if (Math.abs(x * 100 - c) < 1e-6) return String(c / 100);
  return `fr(${Math.round(x * FPS)})`;
};
const seg = (f) => (f / FPS).toFixed(1).replace(".", ",");

const T1 = spec.T1;
const T2 = spec.T2;
const T3 = spec.T3;
const B = spec.B;
const CTA_EN = oCta.en;
const HOOK_EN = oHook.en;

/** El `desde` (en f) de la mitad: el de la original salvo que `pieza.json` lo cambie (hace caber la frase entre dos golpes). */
const mitadDesdeF = spec.mitad?.desdeF ?? Math.round((oMitad.desde ?? 0) * FPS);

/* El reparto del recorrido: entre B y el CTA, uno por plano, sobre los golpes medidos. */
function repartoRecorrido() {
  const rec = spec.recorrido;
  const k = rec.length;
  const cortes = BEATS.filter((b) => b.f > B + 30 && b.f < CTA_EN - 30 && b.db >= (spec.dbMinRecorrido ?? 9)).sort((a, b) => a.f - b.f);
  const largo = rec.map((p) => clipFrames(p.clip) - Math.round(p.desde * FPS));
  const objetivo = (CTA_EN - B) / k;
  let mejor = null;
  const elegidos = [];
  const visita = (i, desdeF, puntuacion) => {
    if (i === k - 1) {
      const dur = CTA_EN - desdeF;
      const p = rec[i];
      if (dur < (p.min ?? 60) || dur > Math.min(p.max ?? 200, largo[i])) return;
      const durs = [...elegidos.map((e, j) => (j === 0 ? e - B : e - elegidos[j - 1])), dur];
      // la última (la vista) es el plano más largo de su bloque
      if (durs.slice(0, -1).some((d) => d > dur)) return;
      const total = puntuacion + ((dur - (p.objetivo ?? objetivo)) / FPS) ** 2;
      if (!mejor || total < mejor.total) mejor = { total, cortes: [...elegidos], durs };
      return;
    }
    const p = rec[i];
    const tope = Math.min(p.max ?? 110, largo[i]);
    for (const b of cortes) {
      const dur = b.f - desdeF;
      if (dur < (p.min ?? 45)) continue;
      if (dur > tope) break;
      elegidos.push(b.f);
      visita(i + 1, b.f, puntuacion + ((dur - (p.objetivo ?? objetivo)) / FPS) ** 2 - 0.02 * b.db);
      elegidos.pop();
    }
  };
  if (spec.cortesRecorrido) {
    // el reparto lo fija la pieza (frames de cada plano tras el primero)
    const cs = spec.cortesRecorrido;
    return { cortes: cs, durs: [...cs, CTA_EN].map((f, j) => f - (j === 0 ? B : cs[j - 1])) };
  }
  visita(0, B, 0);
  if (!mejor) throw new Error(`${NNN}: no hay reparto del recorrido entre f${B} y f${CTA_EN} con ${k} planos (¿faltan golpes ≥ ${spec.dbMinRecorrido ?? 9} dB o clip?)`);
  return mejor;
}
const reparto = repartoRecorrido();
const recorridoEn = [B, ...reparto.cortes];

/* Los nombres de los golpes y su frame. */
const rec = spec.recorrido;
const idCta = `c${String(6 + rec.length).padStart(2, "0")}-cta`;
const idCierre = `c${String(7 + rec.length).padStart(2, "0")}-cierre`;
const idHook = oHook.id;
const idMitad = "c05-mitad";
const idExterior = oExterior.id;
const idRapido1 = spec.rapidos[0].id;
const idRapido2 = spec.rapidos[1].id;
const idsRec = rec.map((p) => p.id);
const golpes = [
  { clave: "e0", f: null, t: O.GOLPE.e0.t, db: O.GOLPE.e0.db },
  { clave: "hook", f: HOOK_EN, ...(O.GOLPE.hook ?? golpeEn(HOOK_EN)) },
];
const sinGolpeT1 = spec.T1SinGolpe === true;
const pon = (clave, f, quien) => {
  const g = golpeEn(f);
  if (!g) throw new Error(`${NNN}: ${quien} entra en f${f} y ahí no hay un golpe medido de la canción`);
  golpes.push({ clave, f, t: g.t, db: g.db });
};
if (!sinGolpeT1) pon("rapido1", T1, idRapido1);
pon("rapido2", T2, idRapido2);
pon("mitad", T3, idMitad);
recorridoEn.forEach((f, i) => pon(i === rec.length - 1 ? "vista" : `r${i + 1}`, f, idsRec[i]));
pon("cta", CTA_EN, idCta);
const claveDe = (i) => (i === rec.length - 1 ? "vista" : `r${i + 1}`);

if (SOLO_PLAN || process.argv.includes("--plan")) {
  console.log(`\n=== ${NNN} (origen ${ORIG}) · INICIO_MUSICA ${INICIO} s · CTA f${CTA_EN}`);
  const filas = [
    [idExterior, 0, HOOK_EN],
    [idHook, HOOK_EN, T1],
    [idRapido1, T1, T2],
    [idRapido2, T2, T3],
    [idMitad, T3, B],
    ...rec.map((p, i) => [p.id, recorridoEn[i], i === rec.length - 1 ? CTA_EN : reparto.cortes[i]]),
    [idCta, CTA_EN, CTA_EN + oCta.dur],
  ];
  for (const [id, a, b] of filas) {
    const g = golpeEn(a);
    console.log(`${id.padEnd(26)} f${String(a).padStart(4)}-${String(b).padStart(4)} (${String(b - a).padStart(3)} f = ${((b - a) / FPS).toFixed(2)} s)  en ${seg(a)} s  ${g ? `golpe ${g.db.toFixed(1)} dB` : "—"}`);
  }
  console.log(`mitad en ${seg(T3)} s (tope 11 s) · el segundo plano rápido empieza en ${seg(T2)} s (tope 10 s)`);
}

/* ── Los planos del metraje ──────────────────────────────────────────────── */

const planos = [];
const empuje = (c) => (c.zoom && c.zoom[1] > 1 ? "EMPUJE" : "QUIETO");
const dureza = (a, b) => b - a;

// 1 · el exterior (el de la original)
planos.push({
  id: idExterior,
  bloque: 1,
  src: oExterior.src,
  desde: oExterior.desde,
  en: "0",
  dur: "P.hook",
  zoom: "QUIETO",
  entra: "corte",
  ajuste: ajusteDe(oExterior.color),
  comentario: `${clipDe(oExterior).toUpperCase()} (iPhone desde el suelo, 4K HLG → BT.709), del ${oExterior.desde.toFixed(2).replace(".", ",")} al ${(oExterior.desde + HOOK_EN / FPS).toFixed(2).replace(".", ",")} s: el mismo exterior de la ${ORIG}. Entra a corte con el golpe de ${golpes[0].db} dB del f3.`,
  reason: oExterior.reason,
});
// 2 · el hook (el de la original; entra en el mismo frame y su plano dura hasta T1)
planos.push({
  id: idHook,
  bloque: 2,
  src: oHook.src,
  audio: oHook.audio.replace(`recorrido-${ORIG}/`, `recorrido-${NNN}/`),
  voz: oHook.voz,
  desde: oHook.desde,
  en: "P.hook",
  dur: "P.rapido1 - P.hook",
  zoom: empuje(oHook),
  entra: oHook.entra,
  ajuste: ajusteDe(oHook.color),
  comentario: `La voz empieza a los ${oHook.voz.s0} s y acaba a los ${oHook.voz.s1} s (la misma toma que la ${ORIG}, entra en el mismo frame). El plano dura hasta el golpe del f${T1}: ${T1 - (HOOK_EN + Math.round(oHook.voz.s1 * FPS) - Math.round(oHook.desde * FPS))} f tras la última palabra, en los que la música sube.`,
  reason: oHook.reason,
});
// 3 · los DOS planos rápidos
spec.rapidos.forEach((p, i) => {
  const en = i === 0 ? T1 : T2;
  const dur = i === 0 ? T2 - T1 : T3 - T2;
  planos.push({
    id: p.id,
    bloque: 3,
    src: `recorrido-${NNN}/${p.clip}.mp4`,
    desde: p.desde,
    en: i === 0 ? "P.rapido1" : "P.rapido2",
    dur: i === 0 ? "P.rapido2 - P.rapido1" : "P.mitad - P.rapido2",
    zoom: "QUIETO",
    entra: "corte",
    ajuste: { ...ajusteDeClip(p.clip), ...(p.ajuste ?? {}) },
    comentario: `${p.clip.toUpperCase()} (iPhone, 4K HLG), del ${p.desde.toFixed(2).replace(".", ",")} al ${(p.desde + dur / FPS).toFixed(2).replace(".", ",")} s: ${p.que}. A CORTE en el golpe de ${(golpeEn(en)?.db ?? 0).toFixed(1)} dB (f${en}${sinGolpeT1 && i === 0 ? ", SIN golpe: el plano del hook no puede durar más" : ""}).`,
    reason: p.porque,
  });
});
// 4 · la mitad (la de la original, ahora tras los dos planos rápidos)
planos.push({
  id: idMitad,
  bloque: 4,
  src: oMitad.src,
  audio: oMitad.audio.replace(`recorrido-${ORIG}/`, `recorrido-${NNN}/`),
  voz: oMitad.voz,
  desde: mitadDesdeF / FPS,
  en: "P.mitad",
  dur: `P.${rec.length ? "r1" : ""} - P.mitad`,
  zoom: empuje(oMitad),
  entra: oMitad.entra,
  ajuste: ajusteDe(oMitad.color),
  comentario: `La voz empieza a los ${oMitad.voz.s0} s y acaba a los ${oMitad.voz.s1} s (la misma toma que la ${ORIG}); entra en el golpe del f${T3} (${seg(T3)} s, antes de los 11 s)${mitadDesdeF ? ` con \`desde\` ${mitadDesdeF} f para que la frase quepa entre este golpe y el del f${B}` : ""}. El plano dura hasta el golpe del f${B}.`,
  reason: oMitad.reason,
});
// 5 · el recorrido inmersivo
rec.forEach((p, i) => {
  const en = recorridoEn[i];
  const fin = i === rec.length - 1 ? CTA_EN : reparto.cortes[i];
  planos.push({
    id: p.id,
    bloque: 5,
    src: `recorrido-${NNN}/${p.clip}.mp4`,
    desde: p.desde,
    en: `P.${claveDe(i) === "vista" ? "vista" : "r" + (i + 1)}`,
    dur: i === rec.length - 1 ? "P.cta - P.vista" : `P.${i + 1 === rec.length - 1 ? "vista" : "r" + (i + 2)} - P.r${i + 1}`,
    zoom: "QUIETO",
    entra: "corte",
    ajuste: { ...ajusteDeClip(p.clip), ...(p.ajuste ?? {}) },
    comentario: `${p.clip.toUpperCase()} (iPhone, 4K HLG), del ${p.desde.toFixed(2).replace(".", ",")} al ${(p.desde + (fin - en) / FPS).toFixed(2).replace(".", ",")} s: ${p.que}. A CORTE en el golpe de ${(golpeEn(en)?.db ?? 0).toFixed(1)} dB (f${en}).${i === rec.length - 1 ? ` Es el plano más largo del recorrido (${fin - en} f): el clímax.` : ""}`,
    reason: p.porque,
  });
});
// 6 · el CTA (el de la original, en el mismo golpe) y la tarjeta
planos.push({
  id: idCta,
  bloque: 6,
  src: oCta.src,
  audio: oCta.audio.replace(`recorrido-${ORIG}/`, `recorrido-${NNN}/`),
  voz: oCta.voz,
  desde: oCta.desde,
  en: "P.cta",
  dur: "DUR_CTA",
  zoom: empuje(oCta),
  entra: oCta.entra,
  ajuste: ajusteDe(oCta.color),
  comentario: `La voz empieza a los ${oCta.voz.s0} s y acaba a los ${oCta.voz.s1} s (la misma toma, en el mismo golpe que la ${ORIG}: f${CTA_EN}). El plano dura ${oCta.dur} f; tras su última palabra la imagen funde a negro y entra la tarjeta.`,
  reason: oCta.reason,
});

/* ── metraje-NNN.ts ──────────────────────────────────────────────────────── */

const tablaPlanos = [
  [idExterior, 0, HOOK_EN, 1],
  [idHook, HOOK_EN, T1, 2],
  [idRapido1, T1, T2, 3],
  [idRapido2, T2, T3, 3],
  [idMitad, T3, B, 4],
  ...rec.map((p, i) => [p.id, recorridoEn[i], i === rec.length - 1 ? CTA_EN : reparto.cortes[i], 5]),
  [idCta, CTA_EN, CTA_EN + oCta.dur, 6],
]
  .map(([id, a, b, bl]) => ` *   ${String(bl)}  ${id.padEnd(26)} f${String(a).padStart(4)}-${String(b).padStart(4)}  ${seg(a).padStart(5)}-${seg(b).padStart(5)} s  ${((b - a) / FPS).toFixed(1).replace(".", ",")} s`)
  .join("\n");

const tsPlano = (p) => {
  const lineas = [];
  lineas.push("  {");
  lineas.push(`    id: "${p.id}",`);
  lineas.push(`    bloque: ${p.bloque},`);
  lineas.push('    tipo: "video",');
  lineas.push(`    src: v("${p.src.split("/").pop().replace(".mp4", "")}"),`);
  if (p.audio) {
    lineas.push(`    audio: a("${p.audio.split("/").pop().replace(".wav", "")}"),`);
    lineas.push("    voz: {");
    lineas.push(`      s0: ${p.voz.s0},`);
    lineas.push(`      s1: ${p.voz.s1},`);
    lineas.push(`      lufs: ${p.voz.lufs},`);
    lineas.push(`      dice: ${JSON.stringify(p.voz.dice)},`);
    lineas.push("    },");
  }
  lineas.push(`    // ${p.comentario}`);
  lineas.push(`    desde: ${typeof p.desde === "number" ? num(p.desde) : p.desde},`);
  lineas.push(`    en: ${p.en},`);
  lineas.push(`    dur: ${p.dur},`);
  lineas.push(`    zoom: ${p.zoom},`);
  lineas.push(`    entra: "${p.entra ?? "corte"}",`);
  lineas.push(`    color: ${pideColor(p.ajuste)},`);
  lineas.push(`    reason:\n      ${JSON.stringify(p.reason)},`);
  lineas.push("  },");
  return lineas.join("\n");
};

const golpeTs = (g, comentario) => `  /** ${comentario} */\n  ${g.clave}: { t: ${g.t}, db: ${g.db} },`;
const comentGolpe = {
  e0: "El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro).",
  hook: "El hook entra aquí: Isabella ya es opaca y su primera palabra suena unos frames después; la música baja con curva tras el golpe.",
  rapido1: `El primer plano rápido, a corte (f${T1}, ${seg(T1)} s).`,
  rapido2: `El segundo plano rápido, a corte (f${T2}, ${seg(T2)} s: antes del segundo 10).`,
  mitad: `La mitad entra A CORTE aquí (f${T3}, ${seg(T3)} s: antes de los 11 s): suena entero y la música baja después.`,
  cta: "El CTA entra A CORTE en este golpe, el mismo de la original.",
};
const golpesTs = golpes
  .filter((g) => g.clave !== "hook" || true)
  .map((g) => golpeTs(g, comentGolpe[g.clave] ?? `El recorrido inmersivo: el plano «${g.clave === "vista" ? "la vista, el clímax" : g.clave}» entra a corte.`))
  .join("\n");
const pTs = [
  ["hook", HOOK_EN, "Isabella ya es opaca; entra la ficha (versión con ficha); su primera palabra suena unos frames después"],
  ...(sinGolpeT1 ? [["rapido1", T1, "primer plano rápido: SIN golpe (el plano del hook no puede durar más; la música sube sobre el corte)"]] : [["rapido1", T1, "primer plano rápido (a corte)"]]),
  ["rapido2", T2, "segundo plano rápido (a corte)"],
  ["mitad", T3, "Isabella con la mitad (a corte)"],
  ...rec.map((p, i) => [claveDe(i), recorridoEn[i], i === rec.length - 1 ? "LA VISTA (a corte)" : `${p.id.replace(/^c\d+-/, "")} (a corte)`]),
  ["cta", CTA_EN, "Isabella con el CTA (a corte)"],
]
  .map(([k, f, c]) => (sinGolpeT1 && k === "rapido1" ? `  ${k}: ${f}, // ${f} · ${c}` : `  ${k}: golpe(GOLPE.${k}), // ${String(f).padStart(4)} · ${c}`))
  .join("\n");

const metraje = `/**
 * EL RECORRIDO ${NNN} — «Suite Go Living (El Poblado)», ${spec.v} del registro: la variante B de la ${ORIG} con la estructura «lo vendible antes del segundo 10» (\`recorrido-luxur\` §3, fijada el 2026-11-10; la primera pieza
 * así es la 079).
 *
 * ÁNGULO: ${spec.angulo}. Conserva la terna de voz de la ${ORIG} (${clipDe(oHook).toUpperCase()} · ${clipDe(oMitad).toUpperCase()} · ${clipDe(oCta).toUpperCase()}), su exterior (${clipDe(oExterior).toUpperCase()}) y su canción, «${spec.cancion}», con la MISMA entrada
 * (${INICIO.toFixed(3)} s): no es una versión nueva de la propiedad sino su variante B, y por eso repite canción (declarado en \`combinaciones.md\` y en \`archivos/musica/registro-de-uso.md\`).
 *
 *   bloque 1  ${idExterior.padEnd(24)} el exterior de la ${ORIG}: f0-f${HOOK_EN}, SIN TEXTO NI VOZ
 *   bloque 2  ${idHook.padEnd(24)} el hook de la ${ORIG}, en el mismo frame; en la versión con ficha la ficha entra con él
 *   bloque 3  ${idRapido1} · ${idRapido2}   DOS planos rápidos, lo más vistoso, de ≤ 2,5 s cada uno y a corte: el segundo empieza en ${seg(T2)} s (antes del 10)
 *   bloque 4  ${idMitad.padEnd(24)} la mitad de la ${ORIG}, a corte en el golpe del f${T3} (${seg(T3)} s: antes de los 11)
 *   bloque 5  ${idsRec[0]} … ${idsRec.at(-1)}   UN solo recorrido inmersivo, sin voz, de ${rec.length} planos; la vista (${rec.at(-1).clip.toUpperCase()}) es el último y el más largo
 *   bloque 6  ${idCta} y la tarjeta   el CTA de la ${ORIG} en su mismo golpe y la tarjeta oscura con el logo y la web
 *
 * LOS PLANOS (frames de la composición, 30 fps):
${tablaPlanos}
 *
 * QUIÉN MARCA EL TIEMPO. «${spec.cancion}», entrando en el mismo golpe que la ${ORIG} (${O.GOLPE.e0.t} s en el f3); la rejilla son los golpes MEDIDOS (\`proyectos/${NNN}/musica/golpes-cancion-entera.json\`) y cada cambio de plano
 * cae en uno (cortes secos ≥ 8 dB).${sinGolpeT1 ? ` EXCEPCIÓN DECLARADA: la salida del hook (f${T1}) no tiene golpe, como en la ${ORIG}: el clip del hook no da para más y la música sube sobre el corte.` : ""}
 *
 * UNIDADES. \`desde\`, en SEGUNDOS de la fuente; \`en\` y \`dur\`, en frames de la composición. Planos CONTIGUOS. El que entra disolviendo empieza a verse 12 f ANTES de su \`en\`.
 *
 * EL COLOR (R32): cada plano lleva su \`color\`; con \`color\` el render lleva \`--gl=angle\` y la prueba se hace a escala 1 reducida con ffmpeg.
 *
 * Datos puros: solo \`import type\` y los números del cierre (\`cierre-${NNN}.ts\`). La puerta lo carga con node. LO ESCRIBE \`proyectos/080/herramientas/montar-pieza.mjs\` desde \`proyectos/${NNN}/pieza.json\`.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-${NNN}";

export const FPS_${NNN} = 30;

export type Entrada = "corte" | "disolver";
export type Bloque = 1 | 2 | 3 | 4 | 5 | 6;

/** Dónde habla Isabella en SU clip y a qué nivel. \`s0\`/\`s1\`, medidos por energía (perfil de 20 ms en la banda de voz) y por arranques de sílaba; \`lufs\`, con ebur128 sobre el WAV TRATADO que suena. */
export interface VozDelCorte {
  /** Segundo de la fuente en que empieza a hablar. */
  s0: number;
  /** Segundo de la fuente en que termina SU frase (la toma puede seguir: se corta aquí). */
  s1: number;
  /** Sonoridad integrada de la voz TRATADA en esa ventana (LUFS). */
  lufs: number;
  /** Lo que dice, tal como está en el guion. Solo para leer el plan. */
  dice: string;
}

export interface Corte extends CorteDelFormato<Entrada> {
  /** \`foto\` solo para la tarjeta oscura del cierre (un negro liso). Nada se congela. */
  tipo: "video" | "foto";
  /** A qué bloque del guion pertenece: la puerta comprueba el orden y el tope de cada uno. */
  bloque: Bloque;
  /** Solo las tomas de Isabella: el WAV de su voz TRATADA (\`<toma>-voz.wav\`, \`normalizar.mjs\`). */
  audio?: string;
  voz?: VozDelCorte;
}

/**
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»). Cada toma pasa por la cadena de \`normalizar.mjs\` (graves, puerta suave, compresor 3,5:1,
 * ganancia buscada tras el compresor y limitador a −2,5 dBFS) hasta −15,0 LUFS con el pico real a −2,5 dBFS, así que el plan no añade ganancia (\`lufs\` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «${spec.cancion}» (\`${O.cancionArchivo ?? "archivos/musica/…"}\`). Se entra en su golpe de ${O.GOLPE.e0.t} s (${O.GOLPE.e0.db} dB). Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el
 * de «empieza a subir»): \`proyectos/${NNN}/musica/golpes-cancion-entera.json\` (\`medir-pista.py --json\`). El reparto de los cortes lo hace \`montar-pieza.mjs\` sobre ellos.
 */
export const GOLPE = {
${golpesTs}
} as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el golpe de entrada (${O.GOLPE.e0.t} s) cae en el frame 3 de la pieza; redondeado a un frame (${INICIO_F}/30) para que \`trimBefore\` no lo mueva.
 */
export const INICIO_MUSICA = ${INICIO_F} / FPS_${NNN};

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_${NNN};

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de \`desde\`). */
const fr = (n: number): number => n / FPS_${NNN};

/** Isabella: un empuje lento hacia ella. Los recorridos y el exterior, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => \`recorrido-${NNN}/\${id}.mp4\`;
const a = (id: string): string => \`recorrido-${NNN}/\${id}.wav\`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE del canal: contraste con cuerpo, negros hundidos, luces recogidas (los cielos son lo primero que se quema), un punto cálido y +10 % de saturación. \`vibrance\` ≤ 0,05 y las tomas de Isabella,
 * \`saturation\` ≤ 1,06: la piel se queda donde estaba. El AJUSTE de cada plano es el medido en la pieza original (\`herramientas/medir-color.py\`), no se hereda a ciegas.
 */
const COLOR_BASE: ColorCine = {
  contrast: 1.1,
  blacks: -0.06,
  shadows: 0.08,
  highlights: -0.2,
  whites: -0.05,
  temperature: 0.03,
  saturation: 1.1,
  vibrance: 0,
};

/** El color de un plano: la base más el ajuste de su toma. */
const color = (ajuste: ColorCine = {}): ColorCine => ({ ...COLOR_BASE, ...ajuste });

/**
 * Los frames de cada cambio de plano: todos salen de \`golpe(...)\`, así que mover la entrada de la música es cambiar \`INICIO_MUSICA\`. El que entra disolviendo tiene aquí el \`en\` de la disolvencia YA TERMINADA: el plano
 * anterior dura hasta él y el siguiente empieza a verse 12 f ANTES.
 */
const P = {
${pTs}
} as const;

/** Frames que dura la toma del CTA (la de la ${ORIG}, en su mismo golpe): tras su última palabra la imagen funde a negro (los últimos 6) y sigue la tarjeta. Nada se congela. */
const DUR_CTA = ${oCta.dur};

/** Dónde acaba la música (frame de la comp): tras la última palabra del CTA se APAGA con curva hasta cero aquí, 2 f antes del final de la pieza (la tarjeta va en silencio). */
export const FIN_MUSICA_${NNN} = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje${NNN}: readonly Corte[] = [
${planos.map((p) => tsPlano(p)).join("\n")}
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  {
    id: "${idCierre}",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-${NNN}/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el \`en\` + \`dur\` del CTA
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre. */
export const DURACION_${NNN} = P.cta + DUR_CTA + DUR_TARJETA;
`;
escribe(`remotion/src/proyectos/${NNN}/metraje-${NNN}.ts`, metraje);

/* ── Material (clips, voces, música, tarjeta) ───────────────────────────── */

for (const c of [...spec.rapidos, ...spec.recorrido]) traeMaterial(`${c.clip}.mp4`);
for (const c of [oExterior, oHook, oMitad, oCta]) traeMaterial(`${clipDe(c)}.mp4`);
for (const c of [oHook, oMitad, oCta]) traeMaterial(`${clipDe(c)}-voz.wav`);
traeMaterial(`musica-${ORIG}.wav`, `musica-${NNN}.wav`);
traeMaterial("cierre-oscuro.png");

/* Lo que ya no se usa (un plano que se cambió en `pieza.json`) se quita del material de la pieza: es un clon, no cuesta disco, pero ensucia `recorrido-NNN/`. */
if (!SOLO_PLAN) {
  const usados = new Set([...spec.rapidos, ...spec.recorrido].map((c) => `${c.clip}.mp4`).concat([oExterior, oHook, oMitad, oCta].map((c) => `${clipDe(c)}.mp4`)));
  for (const f of fs.readdirSync(path.join(RAIZ, PUB))) if (/^[a-z]{2}\d{2}\.mp4$/.test(f) && !usados.has(f)) fs.rmSync(path.join(RAIZ, PUB, f));
}

/* ── Subtítulos: los de la original, a una sola fuente y en el frame de la toma ──────────────────────────────── */

const deltaMitad = T3 - oMitad.en + (Math.round((oMitad.desde ?? 0) * FPS) - mitadDesdeF);
const deltaCta = CTA_EN - oCta.en;
const delta = (b) => {
  const f = b.trozos[0].desde;
  if (f >= oCta.en - 1) return deltaCta;
  if (f >= oMitad.en - 1) return deltaMitad;
  return 0;
};
const bloquesSubs = O.subs.map((b) => {
  const d = delta(b);
  return { id: b.id, hasta: b.hasta + d, trozos: b.trozos.map((t) => ({ desde: t.desde + d, texto: t.texto })), parte: d === 0 ? "hook" : d === deltaMitad && b.trozos[0].desde < oCta.en - 1 ? "mitad" : "cta" };
});
const textoSubs = bloquesSubs
  .map((b, i) => {
    const antes = i > 0 && bloquesSubs[i - 1].parte !== b.parte;
    const cab = i === 0 || antes ? `  // ── ${b.parte === "hook" ? "Bloque 2 · el hook DICHO" : b.parte === "mitad" ? `Bloque 4 · la mitad DICHA: entra en el f${T3}` : `Bloque 6 · el CTA DICHO: entra en el f${CTA_EN}`} ──\n` : "";
    const trozos = b.trozos.map((t) => `      { desde: ${t.desde}, texto: ${JSON.stringify(t.texto)} },`).join("\n");
    return `${cab}  {\n    id: "${b.id}",\n    hasta: ${b.hasta},\n    trozos: [\n${trozos}\n    ],\n  },`;
  })
  .join("\n");
const frameFuente = (c, s) => c.en + Math.round(s * FPS) - Math.round((c.desde ?? 0) * FPS);
const horaDe = (toma, s) => {
  const f = toma === "hook" ? frameFuente({ en: HOOK_EN, desde: oHook.desde }, s) : toma === "mitad" ? frameFuente({ en: T3, desde: mitadDesdeF / FPS }, s) : frameFuente({ en: CTA_EN, desde: oCta.desde }, s);
  return `f${f} = ${(f / FPS).toFixed(1).replace(".", ",")} s del vídeo`;
};
const notasConfirmar = (spec.porConfirmar ?? []).map((n) => ` *   · ${n.texto.replace("{hora}", n.s !== undefined ? horaDe(n.toma, n.s) : "")}`).join("\n");
const subtitulos = `/**
 * UNA SOLA FUENTE (pedido del usuario, 2026-11-10: «los subtítulos que tengan una sola fuente»): todo va en la Montserrat de base; NINGÚN trozo lleva \`estilo: "acento"\` (la Playfair itálica). La puerta (2f) falla si vuelve a
 * aparecer uno.
 *
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO ${NNN} — \`BloqueEditorial[]\`. Solo en la versión normal: la de ficha no lleva subtítulos.
 *
 * Son los de la ${ORIG} (\`proyectos/${NNN}/voz/*.txt\`: el texto es lo que se OYE; los tiempos, el arranque MEDIDO de cada palabra sobre la voz sola, \`onsets-voz.py\` + \`palabras-desde.py\`, no el DTW de whisper, R31) llevados al
 * frame de cada toma en ESTA pieza: el hook, idéntico (entra en el mismo frame); la mitad, ${deltaMitad >= 0 ? "+" : ""}${deltaMitad} f (entra en el f${T3}, no en el f${oMitad.en}); el CTA, ${deltaCta >= 0 ? "+" : ""}${deltaCta} f. Cada línea entra 0-3 f ANTES de su palabra.
 * NO HAY \`portada\` NI \`cuenta\` (reglas fijas del canal, \`SKILL.md\` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ: el primer subtítulo entra con la imagen de Isabella, opaca desde el f${HOOK_EN}. El cierre lleva el LOGO, que es una
 * imagen (\`LogoCierre\` en \`Recorrido${NNN}.tsx\`) y no un bloque de texto. NO HAY CIFRAS EN PANTALLA: Isabella no dice ninguna (los 28,5 m², el piso 9 y el precio van en la ficha y en el caption).
 *
 * POR CONFIRMAR AL OÍDO (R31; la orden de exportar, si llega con estas sin oír, no se bloquea: se mide, se dice con el segundo y la nota se queda; la puerta con \`--final\` falla SOLO por ellas):
${notasConfirmar || " *   · (ninguna)"}
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_${NNN} } from "./metraje-${NNN}";

/**
 * LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las versiones anteriores: los px de la composición (1080×1920) que se le restan a las líneas de acento. Aquí no hay acentos (una sola fuente) y la constante se queda: la composición
 * y la puerta la leen.
 */
export const ACENTO_MENOS_${NNN} = 8;

export const subtitulos${NNN}: readonly BloqueEditorial[] = [
${textoSubs}
];

/** El mismo plan en segundos, para \`exportar-srt.mjs\`: la pista de captions de la plataforma (R14). */
export const subtitulos${NNN}Srt = segmentosDe(subtitulos${NNN}, FPS_${NNN});
`;
escribe(`remotion/src/proyectos/${NNN}/subtitulos-${NNN}.ts`, subtitulos);

/* ── audio-NNN.ts ────────────────────────────────────────────────────────── */

const ventanasFile = path.join(RAIZ, "proyectos", NNN, "medidas", "ventanas-musica.json");
const vent = fs.existsSync(ventanasFile) ? JSON.parse(fs.readFileSync(ventanasFile, "utf8")) : null;
const okVent = vent ? "medidas con ebur128 sobre la canción, en las ventanas de ESTA pieza" : "HEREDADAS de la original: faltan por medir (`montar-pieza.mjs --medir`)";
const LUFS_TRAMO = vent?.LUFS_TRAMO ?? O.audio.LUFS_TRAMO;
const PICO_TRAMO = vent?.PICO_TRAMO ?? O.audio.PICO_TRAMO;
const enVoz = vent?.LUFS_CANCION_EN_VOZ ?? { [idHook]: Object.values(O.audio.LUFS_CANCION_EN_VOZ)[0], [idMitad]: Object.values(O.audio.LUFS_CANCION_EN_VOZ)[1], [idCta]: Object.values(O.audio.LUFS_CANCION_EN_VOZ)[2] };
const RETRASO = spec.retrasoSubidaHook ?? O.audio.RETRASO ?? 6;
const FADE_OUT = { hook: O.audio.FADE_OUT.hook, mitad: spec.fadeOutMitad ?? O.audio.FADE_OUT.mitad, cta: O.audio.FADE_OUT.cta };
const FADE_IN = O.audio.FADE_IN ?? { hook: 15, mitad: 22 };
/** El objetivo de la música sola en un tramo: −15 LUFS si la canción lo aguanta; si no (el pico con la ganancia pasaría de −1 dBFS o la ganancia de +6 dB), lo que aguante, y se declara. */
const objetivoDe = (lufs, pico) => Math.min(-15, Math.floor((lufs + Math.min(6, -1 - pico - 0.02)) * 10) / 10);
const objMusica = vent ? { apertura: objetivoDe(LUFS_TRAMO.apertura, PICO_TRAMO.apertura), paseo: objetivoDe(LUFS_TRAMO.paseo, PICO_TRAMO.paseo), bloque5: objetivoDe(LUFS_TRAMO.bloque5, PICO_TRAMO.bloque5) } : O.audio.OBJETIVO_MUSICA;
const audio = `/**
 * EL SONIDO DEL ${NNN} — todo lo que suena, como DATOS (\`TramoAudio[]\`). Es el de la ${ORIG} con la mitad, los dos planos rápidos y el recorrido en su sitio NUEVO: las sonoridades de la canción por tramos están ${okVent}.
 *
 * \`<PistaMetraje>\` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por \`<PistaAudio>\`:
 *
 *   vocesTomas   la voz de Isabella en ${clipDe(oHook).toUpperCase()}, ${clipDe(oMitad).toUpperCase()} y ${clipDe(oCta).toUpperCase()}, derivada de los cortes que traen \`audio\` (\`vocesDeCortes\`): mismo arranque que su imagen, desclic de 3 f en las que entran a corte, cruce de 6 f en las
 *                que entran disolviendo y, como el WAV es el TRATADO de \`normalizar.mjs\` (\`<toma>-voz.wav\`: graves fuera, puerta suave, compresor 3,5:1, ganancia y limitador, ya a −15,0 LUFS en su ventana), UNA ganancia de ±0,0 dB.
 *   musica       «${spec.cancion}», con una envolvente que BAJA mientras habla Isabella y sube en los recorridos: el golpe de entrada de cada toma suena ENTERO, la música baja con curva de coseno DESPUÉS y acaba ANTES de la
 *                primera palabra (regla del canal desde el 022).
 *
 * LA MEZCLA, en LUFS (ebur128 sobre cada fuente):
 *   voz de Isabella      −15 (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»)
 *   música SOLA          −15 en los tres tramos (la apertura, LOS DOS PLANOS RÁPIDOS —clave \`paseo\`— y EL RECORRIDO INMERSIVO —clave \`bloque5\`—) salvo donde la canción no lo aguanta: ${objMusica.apertura} · ${objMusica.paseo} · ${objMusica.bloque5} LUFS (la ganancia no pasa de +6 dB y el pico, de −1 dBFS: lo comprueba la puerta)
 *   música BAJO LA VOZ   −26 en cada ventana de voz: 11 LU por debajo de ella. Una ganancia fija en cada toma.
 * Una sola ganancia por tramo, sin \`loudnorm\` (le cambiaría la dinámica).
 *
 * LAS RAMPAS DE LA MÚSICA: la apertura suena sola con el golpe de entrada en el f3 y su nivel hasta el f${HOOK_EN}, donde entra el hook; tras su última palabra la música sube con curva antes del golpe del f${T1}; la MITAD entra en el
 * golpe del f${T3}, baja en ${FADE_OUT.mitad} f y sube tras su última palabra antes del golpe del f${B}; el CTA entra en el golpe del f${CTA_EN}, la música baja en 10 f y, al acabar su última palabra, se APAGA con curva de coseno hasta
 * cero 2 f antes del final de la pieza, bajo la tarjeta del cierre.
 *
 * Datos puros: la puerta lo carga con node. LO ESCRIBE \`proyectos/080/herramientas/montar-pieza.mjs\`.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes, volumenDe } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_${NNN}, FPS_${NNN}, INICIO_MUSICA, OBJETIVO_LUFS, metraje${NNN} } from "./metraje-${NNN}";

/** La voz de las tres tomas a cámara (${clipDe(oHook).toUpperCase()}, ${clipDe(oMitad).toUpperCase()} y ${clipDe(oCta).toUpperCase()}), derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje${NNN}, { fps: FPS_${NNN}, objetivoLufs: OBJETIVO_LUFS });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre; la música sigue apagándose bajo ella. */
const CTA = metraje${NNN}.find((c) => c.id === "${idCta}");
if (!CTA) throw new Error("audio-${NNN}: falta ${idCta} en metraje-${NNN}.ts");
export const FIN_CTA_${NNN} = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number; ini: number } => {
  const c = metraje${NNN}.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(\`audio-${NNN}: \${id} no existe o no trae voz\`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_${NNN});
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_${NNN});
  return { en: ini, dur: fin - ini, fin, ini };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/** ¿La música va en el render? \`false\` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. La canción es de la biblioteca de Luxur y no se ha verificado su licencia. */
export const HAY_MUSICA = true;

/** Sonoridad de la canción en cada tramo SIN voz (ebur128 sobre la fuente): la apertura, los dos planos rápidos y el recorrido. */
export const LUFS_TRAMO = { apertura: ${LUFS_TRAMO.apertura}, paseo: ${LUFS_TRAMO.paseo}, bloque5: ${LUFS_TRAMO.bloque5} } as const;
/** La sonoridad de la canción en cada ventana de VOZ (ebur128 sobre la fuente, el tramo de la canción que suena mientras ella habla): lo que mide la puerta en lugar de suponer una meseta. */
export const LUFS_CANCION_EN_VOZ = { "${idHook}": ${enVoz[idHook]}, "${idMitad}": ${enVoz[idMitad]}, "${idCta}": ${enVoz[idCta]} } as const;
/** El pico real de la canción en cada tramo sin voz (ebur128 sobre la fuente, dBFS): con la ganancia de cada tramo ninguno pasa de −1 dBFS (lo comprueba la puerta). */
export const PICO_TRAMO = { apertura: ${PICO_TRAMO.apertura}, paseo: ${PICO_TRAMO.paseo}, bloque5: ${PICO_TRAMO.bloque5} } as const;
/** La música SOLA por tramos: −15 LUFS, el nivel de la voz. */
export const OBJETIVO_MUSICA = { apertura: ${objMusica.apertura}, paseo: ${objMusica.paseo}, bloque5: ${objMusica.bloque5} } as const;
/** Ganancia lineal de la música sola en cada tramo. */
export const ALTOS = {
  apertura: gananciaHasta(LUFS_TRAMO.apertura, OBJETIVO_MUSICA.apertura),
  paseo: gananciaHasta(LUFS_TRAMO.paseo, OBJETIVO_MUSICA.paseo),
  bloque5: gananciaHasta(LUFS_TRAMO.bloque5, OBJETIVO_MUSICA.bloque5),
} as const;
/** Mientras habla Isabella: la música baja hasta −26 LUFS EN CADA VENTANA (11 LU bajo su voz de −15). */
export const LUFS_MUSICA_BAJO_VOZ = -26;
export const BAJOS = {
  "${idHook}": gananciaHasta(LUFS_CANCION_EN_VOZ["${idHook}"], LUFS_MUSICA_BAJO_VOZ),
  "${idMitad}": gananciaHasta(LUFS_CANCION_EN_VOZ["${idMitad}"], LUFS_MUSICA_BAJO_VOZ),
  "${idCta}": gananciaHasta(LUFS_CANCION_EN_VOZ["${idCta}"], LUFS_MUSICA_BAJO_VOZ),
} as const;
/**
 * LOS FUNDIDOS (pedido del usuario en la V6, ya regla del canal): FADE-OUT de FADE_OUT f desde el golpe en que entra su toma (el golpe suena entero y la música baja DESPUÉS, con curva de coseno): la curva ACABA antes de su primera
 * palabra. FADE-IN de FADE_IN f tras su última palabra (con curva suave), o los que quepan hasta 2 f antes del golpe del plano siguiente.
 */
export const FADE_OUT = { hook: ${FADE_OUT.hook}, mitad: ${FADE_OUT.mitad}, cta: ${FADE_OUT.cta} } as const;
export const FADE_IN = { hook: ${FADE_IN.hook}, mitad: ${FADE_IN.mitad} } as const;
/** Frames que la música se queda BAJA tras la última palabra del hook antes de subir. */
export const RETRASO_SUBIDA_HOOK = ${RETRASO};
/** Hasta dónde se apaga la música tras la última palabra del CTA: 2 f antes del final de la pieza (la tarjeta va en silencio). */
const APAGADO_CTA_HASTA = FIN_MUSICA_${NNN};

/** Un fundido con curva suave (coseno): de \`de\` a \`a\` en \`n\` frames desde \`f0\`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

/** La envolvente: la casa sola, el hook, la mitad y el CTA con su fundido, y el apagado final bajo la tarjeta. */
const envolvente = (): [number, number][] => {
  const hook = ventanaDe("${idHook}");
  const mitad = ventanaDe("${idMitad}");
  const cta = ventanaDe("${idCta}");
  const hookPlano = metraje${NNN}.find((c) => c.id === "${idHook}");
  const paseoPlano = metraje${NNN}.find((c) => c.id === "${idRapido1}");
  const mitadPlano = metraje${NNN}.find((c) => c.id === "${idMitad}");
  const alcobaPlano = metraje${NNN}.find((c) => c.id === "${idsRec[0]}");
  const ctaPlano = metraje${NNN}.find((c) => c.id === "${idCta}");
  if (!hookPlano || !paseoPlano || !mitadPlano || !alcobaPlano || !ctaPlano) throw new Error("audio-${NNN}: faltan planos en metraje-${NNN}.ts");

  const p: [number, number][] = [
    // LA APERTURA: la música sola desde el frame 0 (1 f de entrada para no meter un clic: el golpe de entrada suena en el f3).
    [0, 0],
    [1, ALTOS.apertura],
    // HOOK: el golpe suena entero y la música baja con fundido DESPUÉS; sube con fundido (los f que quepan) hasta el primer plano rápido.
    [hookPlano.en, ALTOS.apertura],
    ...fundido(hookPlano.en, FADE_OUT.hook, ALTOS.apertura, BAJOS["${idHook}"]),
    [hook.fin, BAJOS["${idHook}"]],
    [hook.fin + RETRASO_SUBIDA_HOOK, BAJOS["${idHook}"]],
    ${spec.subidaPorEncima?.includes("hook") ? "// El clip del hook acaba pocos frames tras su última palabra y el corte al primer plano rápido no tiene golpe: la música sube con su curva entera (`FADE_IN.hook`) por encima del corte (declarado).\n    ...fundido(hook.fin + RETRASO_SUBIDA_HOOK, FADE_IN.hook, BAJOS[\"" + idHook + "\"], ALTOS.paseo)," : "...fundido(hook.fin + RETRASO_SUBIDA_HOOK, Math.min(FADE_IN.hook, paseoPlano.en - (hook.fin + RETRASO_SUBIDA_HOOK) - 2), BAJOS[\"" + idHook + "\"], ALTOS.paseo),"}
    // MITAD (entra en el golpe): igual. Tras ella caben unos frames hasta el recorrido: la música sube en los que quepan.
    [mitadPlano.en, ALTOS.paseo],
    ...fundido(mitadPlano.en, FADE_OUT.mitad, ALTOS.paseo, BAJOS["${idMitad}"]),
    [mitad.fin, BAJOS["${idMitad}"]],
    ...fundido(mitad.fin, Math.min(FADE_IN.mitad, alcobaPlano.en - mitad.fin - 2), BAJOS["${idMitad}"], ALTOS.bloque5),
    // CTA (entra en el golpe): la bajada igual...
    [ctaPlano.en, ALTOS.bloque5],
    ...fundido(ctaPlano.en, FADE_OUT.cta, ALTOS.bloque5, BAJOS["${idCta}"]),
    [cta.fin, BAJOS["${idCta}"]],
    // ...y al acabar la voz la música se APAGA con curva de coseno hasta cero, 2 f antes del final de la pieza (la tarjeta va en silencio).
    ...fundido(cta.fin, APAGADO_CTA_HASTA - cta.fin, BAJOS["${idCta}"], 0),
  ];
  // Los puntos tienen que ir en orden estricto (las rampas cortas pueden repetir frame).
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

/**
 * Remotion le pasa el volumen a ffmpeg como UNA expresión \`if(between(t,…),valor,if(…))\` con un \`if\` por cada valor distinto de la ganancia (a 3 decimales), y ffmpeg no admite más de ≈ 80 \`if\` anidados. Una
 * envolvente con rampas largas se PARTE en tramos de la misma canción, consecutivos y sin solape (cada uno empieza en el frame de fuente en que acabó el anterior: es la misma muestra), cada uno con ≤ \`MAX_VALORES\`.
 */
const MAX_VALORES = 60;

/** La envolvente \`puntos\` (frames absolutos de la comp) partida en tramos consecutivos de la canción, cada uno con su trozo de envolvente. */
const trocea = (puntos: [number, number][], fin: number): TramoAudio[] => {
  const entero: TramoAudio = { id: "musica", src: "recorrido-${NNN}/musica-${NNN}.wav", en: 0, dur: fin, desde: INICIO_MUSICA, ganancia: puntos, reason: "" };
  const v = (f: number): number => volumenDe(entero, f);
  const redondea = (x: number): number => Math.round(x * 1000) / 1000;
  // Los cortes: donde se juntan MAX_VALORES cambios de valor desde el corte anterior.
  const cortes = [0];
  let cambios = 0;
  let ultimo = redondea(v(0));
  for (let f = 1; f < fin; f++) {
    const x = redondea(v(f));
    if (x !== ultimo) {
      cambios++;
      ultimo = x;
    }
    if (cambios >= MAX_VALORES) {
      cortes.push(f);
      cambios = 0;
    }
  }
  cortes.push(fin);
  return cortes.slice(0, -1).map((a, i) => {
    const b = cortes[i + 1];
    const interior = puntos.filter(([f]) => f > a && f < b);
    const ganancia: [number, number][] = [[a, v(a)], ...interior, [b, v(b)]];
    return {
      id: \`musica-\${i + 1}\`,
      src: "recorrido-${NNN}/musica-${NNN}.wav",
      en: a,
      dur: b - a,
      // El frame de fuente en que arranca este trozo: el de la canción en \`a\` (INICIO_MUSICA es un número entero de frames).
      desde: INICIO_MUSICA + a / FPS_${NNN},
      ganancia,
      reason:
        i === 0
          ? "«${spec.cancion}»: el golpe del f3 abre la pieza; la música baja con curva tras el golpe de cada entrada de Isabella (hook, mitad y CTA) y sube tras las dos primeras; cada corte cae en un golpe medido; la canción se apaga con curva bajo la tarjeta tras el CTA. Partida en tramos consecutivos de la misma canción: ffmpeg no admite una expresión de volumen con más de ≈ 80 valores distintos."
          : \`«${spec.cancion}», trozo \${i + 1} de \${cortes.length - 1}: sigue donde acabó el anterior (f\${a}), la misma muestra de la canción.\`,
    };
  });
};

export const musica${NNN}: readonly TramoAudio[] = HAY_MUSICA ? trocea(envolvente(), FIN_MUSICA_${NNN}) : [];

/** Lo que monta \`<PistaAudio>\`. */
export const audio${NNN}: readonly TramoAudio[] = [...vocesTomas, ...musica${NNN}];
`;
escribe(`remotion/src/proyectos/${NNN}/audio-${NNN}.ts`, audio);

/* ── La plantilla: Recorrido, ficha, cierre y composiciones (copia de la 080 con el número cambiado) ───────── */

for (const f of ["Recorrido080.tsx", "ficha-080.ts", "cierre-080.ts", "composiciones.tsx"]) {
  if (NNN === "080") break;
  // Solo el número del proyecto, no el «080» de «1080» (el ancho del cuadro): un 1081 de ancho tira el lint de dimensiones pares.
  let t = lee(`remotion/src/proyectos/080/${f}`).replace(/(?<![0-9])080(?![0-9])/g, NNN).replace(/V61/g, spec.v);
  escribe(`remotion/src/proyectos/${NNN}/${f.replace("080", NNN)}`, t);
}

/* ── Las ventanas de la canción (con --medir) ───────────────────────────── */

if (MEDIR) {
  const wav = path.join(RAIZ, PUB, `musica-${NNN}.wav`);
  const t = (f) => INICIO + f / FPS;
  const voz = (c, en, desde) => ({ a: t(frameFuente({ en, desde }, c.voz.s0)), b: t(frameFuente({ en, desde }, c.voz.s1)) });
  const ventanas = {
    apertura: { a: t(0) + 0.1, b: t(HOOK_EN) },
    paseo: { a: t(T1) + 0.1, b: t(T3) - 0.1 },
    bloque5: { a: t(B) + 0.05, b: t(CTA_EN) - 0.05 },
    hook: voz(oHook, HOOK_EN, oHook.desde),
    mitad: voz(oMitad, T3, mitadDesdeF / FPS),
    cta: voz(oCta, CTA_EN, oCta.desde),
  };
  const mide = (a, b) => {
    const r = execFileSync("ffmpeg", ["-nostdin", "-hide_banner", "-i", wav, "-af", `atrim=start=${a.toFixed(3)}:end=${b.toFixed(3)},ebur128=peak=true:framelog=quiet`, "-f", "null", "-"], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    void r;
    return null;
  };
  void mide;
  const medida = (a, b) => {
    const p = execFileSync("sh", ["-c", `ffmpeg -nostdin -hide_banner -i "${wav}" -af "atrim=start=${a.toFixed(3)}:end=${b.toFixed(3)},ebur128=peak=true:framelog=quiet" -f null - 2>&1`], { encoding: "utf8" });
    const l = [...p.matchAll(/I:\s+(-?[\d.]+) LUFS/g)].at(-1);
    const pk = [...p.matchAll(/Peak:\s+(-?[\d.]+) dBFS/g)].at(-1);
    return { lufs: l ? Number(l[1]) : null, pico: pk ? Number(pk[1]) : null };
  };
  /* El PICO se mide en una ventana MÁS ANCHA que la de la sonoridad: la música suena a su nivel «solo» también en los golpes de los dos bordes (el que abre el tramo y el que abre el siguiente: el golpe de la mitad
   * o del CTA suena entero con la ganancia del tramo anterior). Con la ventana de la sonoridad el pico de esos golpes no se veía y la 082 llegó a 0,0 dBFS en su mezcla. */
  const anchas = { apertura: { a: INICIO, b: t(HOOK_EN) + 0.15 }, paseo: { a: t(T1) - 0.05, b: t(T3) + 0.15 }, bloque5: { a: t(B) - 0.05, b: t(CTA_EN) + 0.15 } };
  const r = Object.fromEntries(Object.entries(ventanas).map(([k, w]) => [k, { ...w, ...medida(w.a, w.b), ...(anchas[k] ? { picoAncho: medida(anchas[k].a, anchas[k].b).pico, ventanaPico: anchas[k] } : {}) }]));
  const salida = {
    LUFS_TRAMO: { apertura: r.apertura.lufs, paseo: r.paseo.lufs, bloque5: r.bloque5.lufs },
    PICO_TRAMO: { apertura: Math.max(r.apertura.pico, r.apertura.picoAncho), paseo: Math.max(r.paseo.pico, r.paseo.picoAncho), bloque5: Math.max(r.bloque5.pico, r.bloque5.picoAncho) },
    OBJETIVO_MUSICA: { apertura: -15, paseo: -15, bloque5: -15 },
    LUFS_CANCION_EN_VOZ: { [idHook]: r.hook.lufs, [idMitad]: r.mitad.lufs, [idCta]: r.cta.lufs },
    ventanas: r,
  };
  escribe(`proyectos/${NNN}/medidas/ventanas-musica.json`, JSON.stringify(salida, null, 1));
  console.log(JSON.stringify(salida, null, 1));
}

/* ── La puerta: la plantilla de la 080 con el CONFIG de la pieza ─────────── */

const CONFIG = {
  n: NNN,
  origen: ORIG,
  v: spec.v,
  cancion: spec.cancion,
  idExterior,
  idHook,
  idMitad,
  idCta,
  idCierre,
  rapidos: spec.rapidos.map((p) => ({ id: p.id, clip: p.clip })),
  recorrido: spec.recorrido.map((p) => ({ id: p.id, clip: p.clip })),
  exterior: clipDe(oExterior),
  terna: { [idHook]: clipDe(oHook), [idMitad]: clipDe(oMitad), [idCta]: clipDe(oCta) },
  lugares: { [idHook]: spec.lugares.hook, [idMitad]: spec.lugares.mitad, [idCta]: spec.lugares.cta },
  cta: { clip: clipDe(oCta), regex: spec.cta.regex, accion: spec.cta.accion },
  prohibido: spec.prohibido ?? "cumple|a salvo|permitid|legal|licencia|autoriz|normativ|sin riesgo|garantiz",
  claves: Object.fromEntries([
    [idHook, "hook"],
    ...(sinGolpeT1 ? [] : [[idRapido1, "rapido1"]]),
    [idRapido2, "rapido2"],
    [idMitad, "mitad"],
    ...idsRec.map((id, i) => [id, claveDe(i)]),
    [idCta, "cta"],
  ]),
  sinGolpe: sinGolpeT1 ? [idRapido1] : [],
  minSubida: spec.minSubida ?? {},
  versionesAnteriores: ["070", "071", "072", "073", "074", "075", "076", "077", "078", "079", "080", "081", "082", "083", "084", "085", "086", "087"].filter((n) => n !== NNN),
  fuerzaMinEntrada: spec.fuerzaMinEntrada,
  subidaPorEncima: (spec.subidaPorEncima ?? []).map((k) => ({ hook: idHook, mitad: idMitad })[k]),
  permiteIngresos: spec.permiteIngresos === true,
  entradas: {
    secos: planos.slice(1).filter((p) => (p.entra ?? "corte") === "corte").map((p) => p.id),
    disuelven: planos.filter((p) => p.entra === "disolver").map((p) => p.id),
  },
};
if (NNN !== "080" || fs.existsSync(path.join(RAIZ, "proyectos/080/plantilla-puerta.mjs"))) {
  const plantilla = lee("proyectos/080/plantilla-puerta.mjs");
  const bloque = `/*CONFIG*/ ${JSON.stringify(CONFIG, null, 2)} /*FIN-CONFIG*/`;
  let puerta = plantilla.replace(/\/\*CONFIG\*\/[\s\S]*?\/\*FIN-CONFIG\*\//, bloque).replace(/__N__/g, NNN);
  escribe(`proyectos/${NNN}/revisar-${NNN}.mjs`, puerta);
}

console.log(`✅ ${NNN}: metraje, audio, subtítulos${NNN === "080" ? "" : ", plantilla"} y puerta escritos${SOLO_PLAN ? " (¡solo plan: no se ha escrito nada!)" : ""}. Duración: ${CTA_EN + oCta.dur + 60} f (${((CTA_EN + oCta.dur + 60) / FPS).toFixed(1)} s)`);
