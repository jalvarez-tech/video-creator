#!/usr/bin/env node
/**
 * palabras-tramo.mjs — transcribe por palabra un TRAMO corto de una voz y devuelve, en segundos de la fuente, el instante (t_dtw) en que ACABA cada token.
 *
 * Uso (desde la raíz del repo):
 *   node proyectos/065/herramientas/palabras-tramo.mjs remotion/public/recorrido-065/hk04.wav 5.2 7.3
 *
 * POR QUÉ EXISTE. El DTW de whisper sobre una toma entera se va hasta 0,5 s a mitad de frase (R31: en HK04 puso «barato» 0,5 s antes de su sílaba). Sobre un tramo corto (1-2 s) la alineación es mucho más
 * fiel, y cada token acaba donde dice. Una palabra empieza donde ACABA el token anterior (o en el onset que le sigue a una pausa: `onsets-voz.py`). Cortar justo en una palabra la deforma: se da margen.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const [wav, desde, hasta] = process.argv.slice(2);
if (!wav || !desde || !hasta) {
  console.error("uso: node proyectos/065/herramientas/palabras-tramo.mjs <wav> <desde_s> <hasta_s>");
  process.exit(1);
}
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "palabras-tramo-"));
const corte = path.join(tmp, "corte.wav");
const salida = path.join(tmp, "corte.json");
execFileSync("ffmpeg", ["-nostdin", "-y", "-v", "error", "-ss", String(desde), "-to", String(hasta), "-i", wav, "-c:a", "pcm_s16le", corte]);
execFileSync("node", ["manuales/edicion-video/scripts/transcribir.mjs", corte, salida, "es", "--palabras"], { stdio: ["ignore", "ignore", "inherit"] });
const j = JSON.parse(fs.readFileSync(salida, "utf8"));
const t0 = Number(desde);
for (const seg of j.transcription) {
  const tokens = (seg.tokens ?? []).filter((x) => x.text && !x.text.startsWith("[_"));
  if (!tokens.length) continue;
  console.log(tokens.map((x) => `${x.text.trim()}@${(t0 + x.t_dtw / 100).toFixed(2)}`).join("  "));
}
fs.rmSync(tmp, { recursive: true, force: true });
