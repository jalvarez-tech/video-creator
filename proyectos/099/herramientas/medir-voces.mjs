#!/usr/bin/env node
/**
 * medir-voces.mjs — mide la voz de cada plano del 099 (copia adaptada de `proyectos/097/herramientas/medir-voces.mjs`).
 *
 *   node proyectos/099/herramientas/medir-voces.mjs              (energía y sonoridad)
 *   node proyectos/099/herramientas/medir-voces.mjs --palabras   (además, cada palabra con whisper)
 *
 * Para cada corte con `audio` en `metraje-099.ts`:
 *   1. recorta del WAV lo que DE VERDAD suena en la comp (de `desde` a `desde + dur/30`, con los `antes`/`hasta` de
 *      `audio-099.ts`): un trozo que no se oye no cuenta en la sonoridad;
 *   2. `limites-voz.py --margen 12`: dónde empieza y acaba la voz (energía en la banda de voz, no whisper: R29) y la
 *      sonoridad integrada de esa ventana;
 *   3. con `--palabras`, `transcribir.mjs --palabras`: cada palabra, en frame ABSOLUTO de la comp.
 *
 * Escribe `remotion/src/proyectos/099/voces-099.ts` (s0, s1, LUFS y pico por corte: de ahí salen las ganancias de
 * `audio-099.ts`) y, con `--palabras`, `proyectos/099/material/palabras-099.json`.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { RAIZ, ejecutar, flags, log } from "../../../herramientas/comun.mjs";
import { cargaTs } from "../../../remotion/src/motor/metraje/revisar-metraje.mjs";

const FPS = 30;
const PALABRAS = Boolean(flags().palabras);
const PUB = path.join(RAIZ, "remotion", "public");
const { m, au } = await cargaTs({ m: "remotion/src/proyectos/099/metraje-099.ts", au: "remotion/src/proyectos/099/audio-099.ts" });
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "voces-099-"));

/** Lo que suena: [id, wav, segundo de la fuente en que arranca, frame de la comp en que arranca, frames]. */
const tramos = [];
for (const c of m.metraje099) {
  if (!c.audio) continue;
  const aj = au.AJUSTE?.[c.id] ?? {};
  const retraso = Math.max(0, -(aj.antes ?? 0));
  const desde = (c.desde ?? 0) + retraso / FPS;
  const dur = aj.hasta !== undefined ? Math.min(c.dur - retraso, Math.round((aj.hasta - desde) * FPS)) : c.dur - retraso;
  tramos.push([c.id, c.audio, desde, c.en + retraso, dur]);
}

const voces = {};
const palabras = {};
for (const [id, wav, desde, en, dur] of tramos) {
  const seg = path.join(tmp, `${id}.wav`);
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-ss", desde.toFixed(3), "-t", (dur / FPS).toFixed(3), "-i", path.join(PUB, wav), "-c:a", "pcm_s16le", seg], { check: true });
  const lv = ejecutar("uv", ["run", "manuales/edicion-video/scripts/limites-voz.py", "--margen", "12", seg], { check: false, cwd: RAIZ }).stdout;
  const mv = lv.match(/voz\s+([\d.]+)\s+→\s+([\d.]+)\s+s/);
  const ml = lv.match(/nivel de la voz[^:]*:\s*(-?[\d.]+)\s*LUFS\s*·\s*(-?[\d.]+)\s*dBTP/);
  const s0 = mv ? Number(mv[1]) : null;
  const s1 = mv ? Number(mv[2]) : null;
  voces[id] = {
    s0: s0 === null ? null : +(desde + s0).toFixed(2),
    s1: s1 === null ? null : +(desde + s1).toFixed(2),
    lufs: ml ? Number(ml[1]) : null,
    pico: ml ? Number(ml[2]) : null,
    f0: s0 === null ? null : en + Math.round(s0 * FPS),
    f1: s1 === null ? null : en + Math.round(s1 * FPS),
  };
  let dice = "";
  if (PALABRAS) {
    const json = path.join(tmp, `${id}.json`);
    ejecutar("node", ["manuales/edicion-video/scripts/transcribir.mjs", seg, json, "es", "--palabras"], { check: false, cwd: RAIZ });
    const lista = [];
    if (fs.existsSync(json)) {
      for (const p of JSON.parse(fs.readFileSync(json, "utf8")).transcription ?? []) {
        const t = (p.text ?? "").trim();
        if (t) lista.push({ t, f: en + Math.round((p.offsets.from / 1000) * FPS), hasta: en + Math.round((p.offsets.to / 1000) * FPS) });
      }
    }
    palabras[id] = lista;
    dice = lista.map((w) => `${w.t}@${w.f}`).join(" ");
  }
  const v = voces[id];
  log.ok(`${id.padEnd(12)} voz f${v.f0 ?? "—"}-f${v.f1 ?? "—"} · ${v.lufs ?? "?"} LUFS · pico ${v.pico ?? "?"} dBTP ${dice}`);
}

const ts = `/**
 * GENERADO por \`proyectos/099/herramientas/medir-voces.mjs\`: no se edita a mano.
 * Dónde habla cada plano (s0/s1, segundos de la FUENTE; f0/f1, frames de la COMP), a qué sonoridad (LUFS integrados de su
 * ventana de voz, \`limites-voz.py --margen 12\`) y con qué pico verdadero (dBTP, tal cual). \`audio-099.ts\` iguala con esto.
 */
export const VOCES_099: Record<string, { s0: number | null; s1: number | null; lufs: number | null; pico: number | null; f0: number | null; f1: number | null }> = ${JSON.stringify(voces, null, 2)};
`;
fs.writeFileSync(path.join(RAIZ, "remotion", "src", "proyectos", "099", "voces-099.ts"), ts);
if (PALABRAS) {
  fs.mkdirSync(path.join(RAIZ, "proyectos", "099", "material"), { recursive: true });
  fs.writeFileSync(path.join(RAIZ, "proyectos", "099", "material", "palabras-099.json"), JSON.stringify(palabras, null, 1));
}
fs.rmSync(tmp, { recursive: true, force: true });
log.ok("voces-099.ts escrito");
