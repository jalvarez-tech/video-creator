#!/usr/bin/env node
/**
 * comparar-piezas.mjs — compara los planos EXACTOS de las piezas de la tanda 079-087 ANTES de renderizar: ¿abren dos con los mismos dos planos rápidos? ¿qué tramos de vídeo comparten?
 *
 *   node proyectos/080/herramientas/comparar-piezas.mjs [079 080 … 087]
 *
 * Carga cada `metraje-NNN.ts` con la misma ruta que la puerta (esbuild). Imprime (1) el reparto de cada pieza, (2) los pares de planos rápidos que se solapan entre piezas (> 0,3 s del mismo clip) y (3) el
 * metraje que comparten dos piezas en el resto (> 1 s), que informa: repetir el mejor plano de una esquina es legítimo, pero se declara en `combinaciones.md`.
 */
import { cargaTs } from "../../../remotion/src/motor/metraje/revisar-metraje.mjs";
const lista = process.argv.slice(2).length ? process.argv.slice(2) : ["079", "080", "081", "082", "083", "084", "085", "086", "087"];
const piezas = {};
for (const n of lista) {
  const m = await cargaTs({ m: `remotion/src/proyectos/${n}/metraje-${n}.ts` });
  piezas[n] = m.m[`metraje${n}`].filter((c) => c.tipo === "video").map((c) => {
    const f = 30;
    const solape = c.entra === "disolver" ? 12 : 0;
    const ini = (c.desde ?? 0) + solape / f;
    return { id: c.id, bloque: c.bloque, clip: c.src.split("/").pop().replace(".mp4", ""), a: ini, b: ini + (c.dur - solape * 0) / f, en: c.en, dur: c.dur, voz: !!c.audio };
  });
}
const fmt = (p) => `${p.clip} ${p.a.toFixed(2)}-${p.b.toFixed(2)}`;
console.log("── el reparto de cada pieza (exterior · rápidos · recorrido) ──");
for (const [n, ps] of Object.entries(piezas)) {
  const ext = ps.find((p) => p.bloque === 1);
  const rap = ps.filter((p) => p.bloque === 3);
  const rec = ps.filter((p) => p.bloque === 5);
  console.log(`${n}  ext ${fmt(ext)} | rápidos ${rap.map((p) => `${fmt(p)} (${(p.dur / 30).toFixed(1)} s en ${(p.en / 30).toFixed(1)})`).join(" + ")} | recorrido ${rec.map(fmt).join(" → ")}`);
}
const solapa = (x, y) => (x.clip === y.clip ? Math.min(x.b, y.b) - Math.max(x.a, y.a) : 0);
console.log("\n── planos RÁPIDOS que se solapan entre piezas (> 0,3 s del mismo clip) ──");
let hay = false;
const ns = Object.keys(piezas);
for (let i = 0; i < ns.length; i++)
  for (let j = i + 1; j < ns.length; j++) {
    const ra = piezas[ns[i]].filter((p) => p.bloque === 3);
    const rb = piezas[ns[j]].filter((p) => p.bloque === 3);
    const cruces = [];
    for (const x of ra) for (const y of rb) { const s = solapa(x, y); if (s > 0.3) cruces.push(`${fmt(x)} ~ ${fmt(y)} (${s.toFixed(1)} s)`); }
    const pares = ra.map((p) => p.clip).sort().join("+") === rb.map((p) => p.clip).sort().join("+");
    if (cruces.length || pares) { hay = true; console.log(`${ns[i]} · ${ns[j]}${pares ? "  ⚠ MISMO PAR DE CLIPS" : ""}: ${cruces.join(" · ") || "(sin solape de tramos)"}`); }
  }
if (!hay) console.log("ninguno: cada pieza abre con sus dos planos rápidos y ninguno se solapa con los de otra");
console.log("\n── metraje compartido entre dos piezas (cualquier plano de vídeo con voz excluida; > 1 s) ──");
const acum = {};
for (let i = 0; i < ns.length; i++)
  for (let j = i + 1; j < ns.length; j++) {
    let tot = 0; const det = [];
    for (const x of piezas[ns[i]].filter((p) => !p.voz && p.bloque !== 1)) for (const y of piezas[ns[j]].filter((p) => !p.voz && p.bloque !== 1)) { const s = solapa(x, y); if (s > 1) { tot += s; det.push(`${x.clip} ${s.toFixed(1)} s`); } }
    if (tot > 0) console.log(`${ns[i]} · ${ns[j]}: ${tot.toFixed(1)} s (${det.join(", ")})`);
    acum[ns[i]] = (acum[ns[i]] ?? 0) + tot; acum[ns[j]] = (acum[ns[j]] ?? 0) + tot;
  }
