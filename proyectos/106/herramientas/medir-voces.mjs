#!/usr/bin/env node
/**
 * medir-voces.mjs — mide la voz de cada tramo del 106 («En últimas noticias», 16:9), dónde cae cada palabra en la
 * COMPOSICIÓN y la sonoridad del tramo de música. Es el `proyectos/101/herramientas/medir-voces.mjs` de las historias,
 * copiado para este proyecto.
 *
 *   node proyectos/106/herramientas/medir-voces.mjs
 *
 * Para cada `VOCES_PLAN` de `metraje-106.ts`:
 *   1. recorta lo que de verdad suena (de `desde` a `desde + dur/30` de su WAV);
 *   2. `limites-voz.py --margen 12`: dónde empieza y acaba la voz (energía, no whisper: R29) y su sonoridad integrada;
 *   3. `transcribir.mjs --palabras`: cada palabra con su instante, pasado a frame ABSOLUTO de la comp.
 * Y la MÚSICA: LUFS integrados del tramo que suena, para la mezcla (`audio-106.ts`).
 * Escribe `remotion/src/proyectos/106/voces-106.ts` y `proyectos/106/material/palabras-106.json`.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { RAIZ, ejecutar, log } from "../../../herramientas/comun.mjs";
import { cargaTs } from "../../../remotion/src/motor/metraje/revisar-metraje.mjs";

const FPS = 30;
const PUB = path.join(RAIZ, "remotion", "public");
const { m } = await cargaTs({ m: "remotion/src/proyectos/106/metraje-106.ts" });
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "voces-106-"));

const ebur = (f) => {
  const r = ejecutar("ffmpeg", ["-nostdin", "-hide_banner", "-i", f, "-af", "ebur128=peak=true", "-f", "null", "-"]);
  const s = r.stderr.slice(r.stderr.lastIndexOf("Summary:"));
  return { I: Number(s.match(/I:\s+(-?[\d.]+) LUFS/)?.[1]), TP: Number(s.match(/Peak:\s+(-?[\d.]+) dBFS/)?.[1]) };
};

const voces = {};
const palabras = {};
for (const t of m.VOCES_PLAN) {
  const seg = path.join(tmp, `${t.id}.wav`);
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-ss", t.desde.toFixed(3), "-t", (t.dur / FPS).toFixed(3), "-i", path.join(PUB, t.src), "-c:a", "pcm_s16le", seg], { check: true });
  const lv = ejecutar("uv", ["run", "manuales/edicion-video/scripts/limites-voz.py", "--margen", "12", seg], { check: false, cwd: RAIZ }).stdout;
  const mv = lv.match(/voz\s+([\d.]+)\s+→\s+([\d.]+)\s+s/);
  const ml = lv.match(/nivel de la voz[^:]*:\s*(-?[\d.]+)\s*LUFS/);
  const s0 = mv ? Number(mv[1]) : null;
  const s1 = mv ? Number(mv[2]) : null;
  voces[t.id] = {
    s0: s0 === null ? null : +(t.desde + s0).toFixed(2),
    s1: s1 === null ? null : +(t.desde + s1).toFixed(2),
    lufs: ml ? Number(ml[1]) : null,
    f0: s0 === null ? null : t.en + Math.round(s0 * FPS),
    f1: s1 === null ? null : t.en + Math.round(s1 * FPS),
  };
  const json = path.join(tmp, `${t.id}.json`);
  ejecutar("node", ["manuales/edicion-video/scripts/transcribir.mjs", seg, json, "es", "--palabras"], { check: false, cwd: RAIZ });
  const lista = [];
  if (fs.existsSync(json)) {
    for (const p of JSON.parse(fs.readFileSync(json, "utf8")).transcription ?? []) {
      const w = (p.text ?? "").trim();
      if (w) lista.push({ t: w, f: t.en + Math.round((p.offsets.from / 1000) * FPS), hasta: t.en + Math.round((p.offsets.to / 1000) * FPS) });
    }
  }
  palabras[t.id] = lista;
  log.ok(`${t.id.padEnd(18)} voz f${voces[t.id].f0 ?? "—"}-f${voces[t.id].f1 ?? "—"} · ${voces[t.id].lufs ?? "?"} LUFS · ${lista.map((w) => `${w.t}@${w.f}`).join(" ")}`);
}

const mus = path.join(tmp, "musica.wav");
ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-ss", m.INICIO_MUSICA.toFixed(3), "-t", (m.DURACION_106 / FPS).toFixed(3), "-i", path.join(PUB, "mas-106/musica-yeshua.wav"), "-c:a", "pcm_s16le", mus], { check: true });
const mm = ebur(mus);
log.ok(`música «Yeshua» ${m.INICIO_MUSICA}-${(m.INICIO_MUSICA + m.DURACION_106 / FPS).toFixed(2)} s: ${mm.I} LUFS (pico ${mm.TP} dBFS)`);

const ts = `/**
 * GENERADO por \`node proyectos/106/herramientas/medir-voces.mjs\`: no se edita a mano.
 * Dónde habla cada tramo (s0/s1, segundos de la FUENTE; f0/f1, frames de la COMP) y a qué sonoridad (LUFS integrados de
 * su ventana de voz, \`limites-voz.py --margen 12\`). \`audio-106.ts\` iguala con esto.
 */
export type VocesMedidas = Record<string, { s0: number | null; s1: number | null; lufs: number | null; f0: number | null; f1: number | null }>;

/** LUFS integrados del tramo de «Yeshua» que suena (${m.INICIO_MUSICA} s + ${m.DURACION_106} f), tal cual. */
export const MUSICA_LUFS_106 = ${mm.I};

export const VOCES_106: VocesMedidas = ${JSON.stringify(voces, null, 2)};
`;
fs.writeFileSync(path.join(RAIZ, "remotion", "src", "proyectos", "106", "voces-106.ts"), ts);
fs.mkdirSync(path.join(RAIZ, "proyectos", "106", "material"), { recursive: true });
fs.writeFileSync(path.join(RAIZ, "proyectos", "106", "material", "palabras-106.json"), JSON.stringify(palabras, null, 1));
fs.rmSync(tmp, { recursive: true, force: true });
log.ok("voces-106.ts y palabras-106.json escritos");
