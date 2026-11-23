#!/usr/bin/env node
/**
 * normalizar.mjs — repone `remotion/public/mas-100/` para el 100 («Lo harás otra vez», Fundación MAS).
 *
 *   node proyectos/100/normalizar.mjs            (lo que falte)
 *   node proyectos/100/normalizar.mjs --forzar   (rehace aunque ya exista)
 *
 * El 100 monta el MISMO material que el 097 y lo lee de `remotion/public/mas-097/` (solo lectura: lo repone
 * `node proyectos/097/normalizar.mjs`). Aquí solo entra lo propio del 100: la MÚSICA, «Lo harás otra vez» (Elevation
 * Worship, pista), a WAV 48 kHz estéreo SIN normalizar (el nivel es del plan: `audio-100.ts`).
 * Antes de tocar nada se comprueba la identidad (sha256, 8): otra pista con el mismo nombre montaría otro vídeo en silencio.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { RAIZ, ejecutar, flags, log, relativa } from "../../herramientas/comun.mjs";

const DESTINO = path.join(RAIZ, "remotion", "public", "mas-100");
const f = flags();
const MUSICA = [path.join(RAIZ, "archivos", "musica", "Lo harás otra vez - Elevation Worship (pista).mp3"), "musica-otra-vez", "d4a80d50"];
/** Lo que el 100 lee del 097: si falta, la receta del 097 lo repone. */
const DEL_097 = ["dr02", "dr04", "dr05", "hz08", "hz10", "hz14", "hz15", "hz16", "hz19", "hz20", "hz28", "hz32", "vt13", "vt36"];

const sha8 = (archivo) => crypto.createHash("sha256").update(fs.readFileSync(archivo)).digest("hex").slice(0, 8);

const faltan = [];
for (const n of DEL_097) {
  if (!fs.existsSync(path.join(RAIZ, "remotion", "public", "mas-097", `${n}.mp4`))) faltan.push(`${n}.mp4`);
  if (!n.startsWith("dr") && n !== "vt36" && !fs.existsSync(path.join(RAIZ, "remotion", "public", "mas-097", `${n}.wav`))) faltan.push(`${n}.wav`);
}
for (const n of ["papel.png", "logo-mas-indigo.png", "logo-csr-indigo.png", "logo-bancolombia.svg"]) {
  if (!fs.existsSync(path.join(RAIZ, "remotion", "public", "mas-097", n))) faltan.push(n);
}
if (faltan.length) {
  log.error(`faltan en remotion/public/mas-097/: ${faltan.join(", ")} → node proyectos/097/normalizar.mjs`);
  process.exit(1);
}
log.ok("el material del 097 está");

if (!fs.existsSync(MUSICA[0])) {
  log.error(`falta ${relativa(MUSICA[0])}`);
  process.exit(1);
}
if (sha8(MUSICA[0]) !== MUSICA[2]) {
  log.error(`${relativa(MUSICA[0])}: sha256 ${sha8(MUSICA[0])}, se esperaba ${MUSICA[2]}`);
  process.exit(1);
}
fs.mkdirSync(DESTINO, { recursive: true });
const salida = path.join(DESTINO, `${MUSICA[1]}.wav`);
if (!fs.existsSync(salida) || f.forzar) {
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", MUSICA[0], "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "2", salida], { check: true });
  log.ok(`${MUSICA[1]}.wav (48 kHz estéreo, sin normalizar)`);
} else log.info(`${MUSICA[1]}.wav ya está`);
log.ok(`listo: ${relativa(DESTINO)}`);
