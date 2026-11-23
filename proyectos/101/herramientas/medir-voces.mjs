#!/usr/bin/env node
/**
 * medir-voces.mjs — mide la voz de cada tramo de una historia vertical de MAS (101-104), dónde cae cada palabra en la
 * COMPOSICIÓN y la sonoridad del tramo de música. Es el `medir-voces.mjs` del 098 para el molde de las historias.
 *
 *   node proyectos/101/herramientas/medir-voces.mjs <101|102|103|104|105>
 *
 * Para cada `voces[]` de `HISTORIA_NNN`:
 *   1. recorta lo que de verdad suena (de `desde` a `desde + dur/30` de su WAV);
 *   2. `limites-voz.py --margen 12`: dónde empieza y acaba la voz (energía, no whisper: R29) y su sonoridad integrada;
 *   3. `transcribir.mjs --palabras`: cada palabra con su instante, pasado a frame ABSOLUTO de la comp.
 * Y la MÚSICA: LUFS integrados del tramo que suena (`desde` … `desde + duracion/30`), para fijar `musica.lufs`.
 * Escribe `remotion/src/proyectos/NNN/voces-NNN.ts` y `proyectos/NNN/material/palabras-NNN.json`.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { RAIZ, ejecutar, log } from "../../../herramientas/comun.mjs";
import { cargaTs } from "../../../remotion/src/motor/metraje/revisar-metraje.mjs";

const n = process.argv[2];
if (!/^10[1-5]$/.test(n ?? "")) {
  console.error("uso: node proyectos/101/herramientas/medir-voces.mjs <101|102|103|104|105>");
  process.exit(2);
}
const FPS = 30;
const PUB = path.join(RAIZ, "remotion", "public");
const { h } = await cargaTs({ h: `remotion/src/proyectos/${n}/historia-${n}.ts` });
const H = h[`HISTORIA_${n}`];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), `voces-${n}-`));

const ebur = (f) => {
  const r = ejecutar("ffmpeg", ["-nostdin", "-hide_banner", "-i", f, "-af", "ebur128=peak=true", "-f", "null", "-"]);
  const s = r.stderr.slice(r.stderr.lastIndexOf("Summary:"));
  return { I: Number(s.match(/I:\s+(-?[\d.]+) LUFS/)?.[1]), TP: Number(s.match(/Peak:\s+(-?[\d.]+) dBFS/)?.[1]) };
};

const voces = {};
const palabras = {};
for (const t of H.voces) {
  const seg = path.join(tmp, `${t.id}.wav`);
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-ss", t.desde.toFixed(3), "-t", (t.dur / FPS).toFixed(3), "-i", path.join(PUB, t.src), "-c:a", "pcm_s16le", seg], { check: true });
  const lv = ejecutar("uv", ["run", "manuales/edicion-video/scripts/limites-voz.py", "--margen", "12", seg], { check: false, cwd: RAIZ }).stdout;
  const mv = lv.match(/voz\s+([\d.]+)\s+→\s+([\d.]+)\s+s/);
  const ml = lv.match(/nivel de la voz[^:]*:\s*(-?[\d.]+)\s*LUFS/);
  const s0 = mv ? Number(mv[1]) : null;
  const s1 = mv ? Number(mv[2]) : null;
  const lufs = ml ? Number(ml[1]) : null;
  voces[t.id] = {
    s0: s0 === null ? null : +(t.desde + s0).toFixed(2),
    s1: s1 === null ? null : +(t.desde + s1).toFixed(2),
    lufs,
    f0: s0 === null ? null : t.en + Math.round(s0 * FPS),
    f1: s1 === null ? null : t.en + Math.round(s1 * FPS),
  };
  const json = path.join(tmp, `${t.id}.json`);
  ejecutar("node", ["manuales/edicion-video/scripts/transcribir.mjs", seg, json, "es", "--palabras"], { check: false, cwd: RAIZ });
  const lista = [];
  if (fs.existsSync(json)) {
    for (const p of JSON.parse(fs.readFileSync(json, "utf8")).transcription ?? []) {
      const w = (p.text ?? "").trim();
      if (!w) continue;
      lista.push({ t: w, f: t.en + Math.round((p.offsets.from / 1000) * FPS), hasta: t.en + Math.round((p.offsets.to / 1000) * FPS) });
    }
  }
  palabras[t.id] = lista;
  log.ok(`${t.id.padEnd(18)} voz f${voces[t.id].f0 ?? "—"}-f${voces[t.id].f1 ?? "—"} · ${lufs ?? "?"} LUFS · ${lista.map((w) => `${w.t}@${w.f}`).join(" ")}`);
}

const mus = path.join(tmp, "musica.wav");
ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-ss", H.musica.desde.toFixed(3), "-t", (H.duracion / FPS).toFixed(3), "-i", path.join(PUB, H.musica.src), "-c:a", "pcm_s16le", mus], { check: true });
const m = ebur(mus);
log.ok(`música «${H.musica.titulo}» ${H.musica.desde}-${(H.musica.desde + H.duracion / FPS).toFixed(2)} s: ${m.I} LUFS (pico ${m.TP} dBFS) · en el plan: ${H.musica.lufs}`);

const ts = `/**
 * GENERADO por \`proyectos/101/herramientas/medir-voces.mjs ${n}\`: no se edita a mano.
 * Dónde habla cada tramo (s0/s1, segundos de la FUENTE; f0/f1, frames de la COMP) y a qué sonoridad
 * (LUFS integrados de su ventana de voz, \`limites-voz.py --margen 12\`). \`historia.ts\` iguala con esto.
 * Música medida: ${m.I} LUFS.
 */
import type { VocesMedidas } from "../101/historia";

export const VOCES_${n}: VocesMedidas = ${JSON.stringify(voces, null, 2)};
`;
fs.writeFileSync(path.join(RAIZ, "remotion", "src", "proyectos", n, `voces-${n}.ts`), ts);
fs.mkdirSync(path.join(RAIZ, "proyectos", n, "material"), { recursive: true });
fs.writeFileSync(path.join(RAIZ, "proyectos", n, "material", `palabras-${n}.json`), JSON.stringify(palabras, null, 1));
fs.rmSync(tmp, { recursive: true, force: true });
log.ok(`voces-${n}.ts y palabras-${n}.json escritos`);
