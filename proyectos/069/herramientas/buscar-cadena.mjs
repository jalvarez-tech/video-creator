#!/usr/bin/env node
/**
 * buscar-cadena.mjs — la cadena de subidas de la canción (MOV 1 → lugar → MOV 2) que cabe con la duración exacta de cada voz.
 *
 *   node proyectos/069/herramientas/buscar-cadena.mjs [fuerza mínima dB, defecto 4] [mínimo de la escena 3 en s, defecto 18.2] [fuerza del golpe de la meseta, defecto 5.5]
 *
 * Lee los golpes y la curva de «Softly» (los del 069 rev. 3) y escribe, ordenadas por lo bajo que suena la música bajo el MOV 2, las combinaciones t1 → t2 (MOV 1, 8,7-9,55 s),
 * t2 → t3 (escena 3, ≥ el mínimo) y t3 → t4 (MOV 2, 8,5-9,5 s, acabando en un golpe fuerte). Fue lo que fijó los cortes de la rev. 3.
 */
import fs from "node:fs";
const [, , MIN = "4", ESC3 = "18.2", FUERTE = "5.5"] = process.argv;
const g = JSON.parse(fs.readFileSync("proyectos/069/musica/golpes-musica-softly.json", "utf8")).golpes;
const c = JSON.parse(fs.readFileSync("proyectos/069/musica/curvas/Softly_I_Judah_Earl_BRANDON_BLACK_music_cinematic_orchestralmusic.json", "utf8")).db;
const H = (a, b, m) => g.filter(([t, d]) => t >= a && t <= b && d >= m);
const lufs = (a, b) => { let s = 0, k = 0; for (let t = a; t < b; t += 0.5) { s += 10 ** (c[Math.floor(t)] / 10); k++; } return 10 * Math.log10(s / k); };
const out = [];
for (const [t1, d1] of H(108, 117, +MIN))
  for (const [t2, d2] of H(t1 + 8.7, t1 + 9.55, +MIN))
    for (const [t3, d3] of H(t2 + +ESC3, t2 + 40, +MIN))
      for (const [t4, d4] of H(t3 + 8.5, t3 + 9.5, +FUERTE)) {
        if (t4 < 140 || t4 > 160) continue;
        out.push({ t1, d1, t2, d2, t3, d3, t4, d4, fuego: +(t1 - 105.41).toFixed(2), escena3: +(t3 - t2).toFixed(2), nivelMov2: +lufs(t3, t4).toFixed(1) });
      }
out.sort((a, b) => a.nivelMov2 - b.nivelMov2);
console.log(out.length);
for (const o of out.slice(0, 20)) console.log(JSON.stringify(o));
