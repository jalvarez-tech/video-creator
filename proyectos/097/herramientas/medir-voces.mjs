#!/usr/bin/env node
/**
 * medir-voces.mjs — mide la voz de cada plano del 097 y dónde cae cada palabra en la COMPOSICIÓN.
 *
 *   node proyectos/097/herramientas/medir-voces.mjs
 *
 * Para cada corte con `audio` en `metraje-097.ts`:
 *   1. recorta su tramo del WAV (lo que de verdad suena en la comp: de `desde` a `desde + dur/30`;
 *      P17 empieza 6 f tarde por el corte en L);
 *   2. `limites-voz.py --margen 12`: dónde empieza y acaba la voz (energía en la banda de voz, no
 *      whisper, R29) y su sonoridad integrada;
 *   3. `transcribir.mjs --palabras`: cada palabra con su instante, pasado a frame ABSOLUTO de la comp.
 *
 * Escribe `remotion/src/proyectos/097/voces-097.ts` (s0, s1 y LUFS por corte: de ahí salen las
 * ganancias de `audio-097.ts`) y `proyectos/097/material/palabras-097.json` (las palabras, para fijar
 * los instantes «≈» de los textos). Los tramos sueltos (la pregunta del hook sobre el dron y la voz de
 * VT33 en el cierre) se miden igual.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { RAIZ, ejecutar, log } from "../../../herramientas/comun.mjs";
import { cargaTs } from "../../../remotion/src/motor/metraje/revisar-metraje.mjs";

const FPS = 30;
const PUB = path.join(RAIZ, "remotion", "public");
const { m } = await cargaTs({ m: "remotion/src/proyectos/097/metraje-097.ts" });
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "voces-097-"));

const { au } = await cargaTs({ au: "remotion/src/proyectos/097/audio-097.ts" });
/** Lo que suena: [id, wav, segundo de la fuente en que arranca, frame de la comp en que arranca, frames]. */
const tramos = [];
for (const c of m.metraje097) {
  if (!c.audio) continue;
  // Se mide SOLO lo que se oye: un `antes` negativo de `audio-097.ts` arranca el audio después que el plano y `hasta`
  // lo corta en un segundo de la fuente. La puerta (HZ20) dura más que su voz desde la rev. 9: medida entera, el grito
  // del final (que no suena) contaba en su sonoridad.
  const aj = au.AJUSTE?.[c.id] ?? {};
  const retraso = Math.max((c.audioDesdeFrame ?? c.en) - c.en, -(aj.antes ?? 0));
  const desde = (c.desde ?? 0) + retraso / FPS;
  const dur = aj.hasta !== undefined ? Math.min(c.dur - retraso, Math.round((aj.hasta - desde) * FPS)) : c.dur - retraso;
  tramos.push([c.id, c.audio, desde, c.en + retraso, dur]);
}
// Los tramos sueltos, con su `en` y su `dur` de `audio-097.ts` (la voz de VT33 en el cierre).
for (const id of ["vo-pregunta", "vo-gracias"]) {
  const t = au.audio097.find((x) => x.id === id);
  if (t) tramos.push([id, t.src, t.desde ?? 0, t.en, t.dur]);
}

const voces = {};
const palabras = {};
for (const [id, wav, desde, en, dur] of tramos) {
  const seg = path.join(tmp, `${id}.wav`);
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-ss", desde.toFixed(3), "-t", (dur / FPS).toFixed(3), "-i", path.join(PUB, wav), "-c:a", "pcm_s16le", seg], { check: true });
  const lv = ejecutar("uv", ["run", "manuales/edicion-video/scripts/limites-voz.py", "--margen", "12", seg], { check: false, cwd: RAIZ }).stdout;
  const mv = lv.match(/voz\s+([\d.]+)\s+→\s+([\d.]+)\s+s/);
  const ml = lv.match(/nivel de la voz[^:]*:\s*(-?[\d.]+)\s*LUFS/);
  const s0 = mv ? Number(mv[1]) : null;
  const s1 = mv ? Number(mv[2]) : null;
  const lufs = ml ? Number(ml[1]) : null;
  voces[id] = { s0: s0 === null ? null : +(desde + s0).toFixed(2), s1: s1 === null ? null : +(desde + s1).toFixed(2), lufs, f0: s0 === null ? null : en + Math.round(s0 * FPS), f1: s1 === null ? null : en + Math.round(s1 * FPS) };
  // Palabras: whisper sobre el tramo solo (así no se confunde con lo que dice el clip fuera del plano).
  const json = path.join(tmp, `${id}.json`);
  ejecutar("node", ["manuales/edicion-video/scripts/transcribir.mjs", seg, json, "es", "--palabras"], { check: false, cwd: RAIZ });
  const lista = [];
  if (fs.existsSync(json)) {
    for (const p of JSON.parse(fs.readFileSync(json, "utf8")).transcription ?? []) {
      const t = (p.text ?? "").trim();
      if (!t) continue;
      // El inicio de la palabra: el fin DTW del token anterior es más fiable que `offsets` (ver transcribir.mjs); aquí basta `offsets.from` para colocar un texto.
      lista.push({ t, f: en + Math.round((p.offsets.from / 1000) * FPS), hasta: en + Math.round((p.offsets.to / 1000) * FPS) });
    }
  }
  palabras[id] = lista;
  log.ok(`${id.padEnd(12)} voz ${voces[id].f0 ?? "—"}-${voces[id].f1 ?? "—"} f · ${lufs ?? "?"} LUFS · ${lista.map((w) => `${w.t}@${w.f}`).join(" ")}`);
}

const ts = `/**
 * GENERADO por \`proyectos/097/herramientas/medir-voces.mjs\`: no se edita a mano.
 * Dónde habla cada plano (s0/s1, segundos de la FUENTE; f0/f1, frames de la COMP) y a qué sonoridad
 * (LUFS integrados de su ventana de voz, \`limites-voz.py --margen 12\`). \`audio-097.ts\` iguala con esto.
 */
export const VOCES_097: Record<string, { s0: number | null; s1: number | null; lufs: number | null; f0: number | null; f1: number | null }> = ${JSON.stringify(voces, null, 2)};
`;
fs.writeFileSync(path.join(RAIZ, "remotion", "src", "proyectos", "097", "voces-097.ts"), ts);
fs.writeFileSync(path.join(RAIZ, "proyectos", "097", "material", "palabras-097.json"), JSON.stringify(palabras, null, 1));
fs.rmSync(tmp, { recursive: true, force: true });
log.ok("voces-097.ts y palabras-097.json escritos");
