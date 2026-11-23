#!/usr/bin/env node
/**
 * normalizar.mjs — repone lo que el 099 («A tus pies», Fundación MAS) necesita en `remotion/public/`.
 *
 *   node proyectos/099/normalizar.mjs            (solo lo que falte)
 *   node proyectos/099/normalizar.mjs --forzar   (rehace la música aunque exista)
 *
 * EL METRAJE NO SE COPIA: el 099 lee en solo lectura lo que ya normalizó el 097 en `remotion/public/mas-097/`
 * (receta `proyectos/097/normalizar.mjs`: HLG → BT.709, rotación quemada, 30 fps constantes, DJI con
 * `setpts=PTS*1000/1001`, voz con `-map 0:a:0` porque 37 vídeos traen audio espacial APAC). Si falta alguno,
 * esta receta lo dice y lo repone ESA receta con `--solo`. El material sale menores: no entra en git.
 *
 * LO PROPIO DEL 099: la música, «A Tus Pies» (`archivos/musica/A Tus Pies.mp3`, 5:12, instrumental: piano y
 * colchón, sin voz cantada). Se decodifica ENTERA (el retardo del códec MP3 queda fuera, como en `medir-pista.py`,
 * así que los golpes medidos sobre el MP3 caen en la misma muestra del WAV) a WAV 48 kHz estéreo, SIN normalizar:
 * el nivel lo pone `audio-099.ts`.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { RAIZ, ejecutar, flags, log, relativa } from "../../herramientas/comun.mjs";

const f = flags();
const DESTINO = path.join(RAIZ, "remotion", "public", "mas-099");
const DEL_097 = path.join(RAIZ, "remotion", "public", "mas-097");

/** Lo que el 099 lee del 097 (MP4 + WAV de los que hablan). */
const DEL_097_MP4 = ["hz01", "hz05", "hz06", "hz08", "hz15", "hz17", "hz19", "hz32", "dr04", "dr05", "dr07"];
const DEL_097_WAV = ["hz01", "hz05", "hz06", "hz08", "hz15", "hz17", "hz19", "hz32"];
const DEL_097_OTROS = ["papel.png", "logo-csr-indigo.png", "logo-mas-indigo.png", "logo-bancolombia.svg"];

const MUSICA = { fuente: path.join(RAIZ, "archivos", "musica", "A Tus Pies.mp3"), salida: "musica-a-tus-pies.wav", sha: "0ffedb79" };

const sha8 = (archivo) => crypto.createHash("sha256").update(fs.readFileSync(archivo)).digest("hex").slice(0, 8);

let faltan = 0;
const pide = [...DEL_097_MP4.map((n) => `${n}.mp4`), ...DEL_097_WAV.map((n) => `${n}.wav`), ...DEL_097_OTROS];
for (const a of pide) {
  if (!fs.existsSync(path.join(DEL_097, a))) {
    faltan++;
    log.error(`falta mas-097/${a}: repónlo con node proyectos/097/normalizar.mjs --solo ${a.replace(/\.(mp4|wav|png|svg)$/, "")}`);
  }
}
if (!faltan) log.ok(`el material del 097 está (${pide.length} archivos en ${relativa(DEL_097)})`);

fs.mkdirSync(DESTINO, { recursive: true });
if (!fs.existsSync(MUSICA.fuente)) {
  log.error(`falta la música: ${relativa(MUSICA.fuente)}`);
  process.exit(1);
}
const sha = sha8(MUSICA.fuente);
if (sha !== MUSICA.sha) {
  log.error(`«A Tus Pies» no es la que se midió (sha256 ${sha}, esperado ${MUSICA.sha}): los golpes de metraje-099.ts ya no valen`);
  process.exit(1);
}
const salida = path.join(DESTINO, MUSICA.salida);
if (fs.existsSync(salida) && !f.forzar) log.ok(`${MUSICA.salida} ya existe`);
else {
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", MUSICA.fuente, "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "2", salida], { check: true });
  log.ok(`${MUSICA.salida} («A Tus Pies», 48 kHz estéreo, sin normalizar)`);
}
process.exit(faltan ? 1 : 0);
