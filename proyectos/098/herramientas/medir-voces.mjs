#!/usr/bin/env node
/**
 * medir-voces.mjs — mide la voz de cada tramo del 098 y dónde cae cada palabra en la COMPOSICIÓN. Copia de
 * `proyectos/097/herramientas/medir-voces.mjs`, adaptada a que aquí los tramos de voz se escriben en `audio-098.ts`
 * (cortes en J y en L: el audio no siempre arranca con su imagen).
 *
 *   node proyectos/098/herramientas/medir-voces.mjs
 *
 * Para cada tramo `voz-*` de `audio098`:
 *   1. recorta lo que de verdad suena (de `desde` a `desde + dur/30` de su WAV);
 *   2. `limites-voz.py --margen 12`: dónde empieza y acaba la voz (energía, no whisper: R29) y su sonoridad integrada;
 *   3. `transcribir.mjs --palabras`: cada palabra con su instante, pasado a frame ABSOLUTO de la comp.
 * Escribe `remotion/src/proyectos/098/voces-098.ts` (de ahí salen las ganancias de `audio-098.ts`) y
 * `proyectos/098/material/palabras-098.json` (para comprobar los instantes de las tiras).
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { RAIZ, ejecutar, log } from "../../../herramientas/comun.mjs";
import { cargaTs } from "../../../remotion/src/motor/metraje/revisar-metraje.mjs";

const FPS = 30;
const PUB = path.join(RAIZ, "remotion", "public");
const { au } = await cargaTs({ au: "remotion/src/proyectos/098/audio-098.ts" });
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "voces-098-"));

const voces = {};
const palabras = {};
for (const t of au.audio098.filter((x) => x.id.startsWith("voz-"))) {
  const desde = t.desde ?? 0;
  const seg = path.join(tmp, `${t.id}.wav`);
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-ss", desde.toFixed(3), "-t", (t.dur / FPS).toFixed(3), "-i", path.join(PUB, t.src), "-c:a", "pcm_s16le", seg], { check: true });
  const lv = ejecutar("uv", ["run", "manuales/edicion-video/scripts/limites-voz.py", "--margen", "12", seg], { check: false, cwd: RAIZ }).stdout;
  const mv = lv.match(/voz\s+([\d.]+)\s+→\s+([\d.]+)\s+s/);
  const ml = lv.match(/nivel de la voz[^:]*:\s*(-?[\d.]+)\s*LUFS/);
  const s0 = mv ? Number(mv[1]) : null;
  const s1 = mv ? Number(mv[2]) : null;
  const lufs = ml ? Number(ml[1]) : null;
  voces[t.id] = {
    s0: s0 === null ? null : +(desde + s0).toFixed(2),
    s1: s1 === null ? null : +(desde + s1).toFixed(2),
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
  log.ok(`${t.id.padEnd(14)} voz f${voces[t.id].f0 ?? "—"}-f${voces[t.id].f1 ?? "—"} · ${lufs ?? "?"} LUFS · ${lista.map((w) => `${w.t}@${w.f}`).join(" ")}`);
}

const ts = `/**
 * GENERADO por \`proyectos/098/herramientas/medir-voces.mjs\`: no se edita a mano.
 * Dónde habla cada tramo (s0/s1, segundos de la FUENTE; f0/f1, frames de la COMP) y a qué sonoridad
 * (LUFS integrados de su ventana de voz, \`limites-voz.py --margen 12\`). \`audio-098.ts\` iguala con esto.
 */
export const VOCES_098: Record<string, { s0: number | null; s1: number | null; lufs: number | null; f0: number | null; f1: number | null }> = ${JSON.stringify(voces, null, 2)};
`;
fs.writeFileSync(path.join(RAIZ, "remotion", "src", "proyectos", "098", "voces-098.ts"), ts);
fs.mkdirSync(path.join(RAIZ, "proyectos", "098", "material"), { recursive: true });
fs.writeFileSync(path.join(RAIZ, "proyectos", "098", "material", "palabras-098.json"), JSON.stringify(palabras, null, 1));
fs.rmSync(tmp, { recursive: true, force: true });
log.ok("voces-098.ts y palabras-098.json escritos");
