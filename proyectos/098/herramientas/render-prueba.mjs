#!/usr/bin/env node
/**
 * render-prueba.mjs — la PRUEBA 720p del 098 con UN solo bundle (que se borra al acabar: es el suyo).
 *
 *   node proyectos/098/herramientas/render-prueba.mjs <nombre>        (desde la raíz)
 *
 * Deja en `proyectos/098/pruebas-720p/`:
 *   <nombre>.mp4          1280×720, H.264 CRF 18, BT.709 en las dos capas; audio AAC 256k masterizado como la final
 *                         (ganancia hasta −14 LUFS y limitador a pico ≤ −1 dBTP, la receta de `exportar-final.mjs`)
 *   <nombre>-mezcla.wav   la mezcla tal cual sale de Remotion, sin masterizar (lo que miden las comprobaciones)
 *   <nombre>.log          el log entero (nunca `| tail`)
 *
 * POR QUÉ ASÍ:
 *   · `--scale=0.75` (1440×810) y reducir con ffmpeg a 1280×720: a 0,666… el alto sale 720,000000036 y el render muere
 *     al coser (memoria `remotion-escala-no-entera`).
 *   · El vídeo mudo y el audio aparte, en WAV, mezclado con el ffmpeg del sistema: el AAC de Remotion suena 43 ms tarde.
 *   · Un bundle propio, borrado al final: cada `npx remotion render` deja 2,2-2,5 GB en el tmp, y en este Mac renderizan
 *     tres sesiones a la vez (los bundles de las otras NO se tocan).
 *   · `concurrency: 2`, por las otras dos sesiones.
 */
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { RAIZ, ejecutar, log } from "../../../herramientas/comun.mjs";

const require = createRequire(path.join(RAIZ, "remotion", "package.json"));
const { bundle } = require("@remotion/bundler");
const { renderMedia, selectComposition } = require("@remotion/renderer");

const nombre = process.argv[2];
if (!nombre) {
  console.error("uso: node proyectos/098/herramientas/render-prueba.mjs <nombre>");
  process.exit(2);
}
const COMP = "TuEstasAqui098";
const DIR = path.join(RAIZ, "proyectos", "098", "pruebas-720p");
fs.mkdirSync(DIR, { recursive: true });
const LOG = path.join(DIR, `${nombre}.log`);
fs.writeFileSync(LOG, `render-prueba ${nombre} · ${new Date().toISOString()}\n`);
const anota = (s) => fs.appendFileSync(LOG, s + "\n");
const corre = (titulo, cmd, args) => {
  const r = ejecutar(cmd, args);
  anota(`\n===== ${titulo}\n${r.comando ?? cmd}\n${r.stdout}\n${r.stderr}`);
  if (r.status !== 0) {
    log.error(`${titulo}: falló (código ${r.status}); el log está en ${path.relative(RAIZ, LOG)}`);
    process.exit(1);
  }
  return r;
};
const ebur = (f) => {
  const r = ejecutar("ffmpeg", ["-nostdin", "-hide_banner", "-i", f, "-af", "ebur128=peak=true", "-f", "null", "-"]);
  const s = r.stderr.slice(r.stderr.lastIndexOf("Summary:"));
  return { I: Number(s.match(/I:\s+(-?[\d.]+) LUFS/)?.[1]), TP: Number(s.match(/Peak:\s+(-?[\d.]+) dBFS/)?.[1]) };
};

const libres = () => {
  const s = fs.statfsSync(DIR);
  return (s.bavail * s.bsize) / 2 ** 30;
};
if (libres() < 8) {
  log.error(`quedan ${libres().toFixed(1)} GiB libres: no renderizo (el bundle ocupa ≈ 2,5 GB)`);
  process.exit(1);
}

const VIDEO = path.join(DIR, `.${nombre}-1440.mp4`);
const MEZCLA = path.join(DIR, `${nombre}-mezcla.wav`);
const t0 = Date.now();
const servido = await bundle({ entryPoint: path.join(RAIZ, "remotion", "src", "index.ts") });
anota(`bundle: ${servido} (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
try {
  const comp = await selectComposition({ serveUrl: servido, id: COMP, inputProps: {}, logLevel: "error" });
  log.info(`${COMP}: ${comp.durationInFrames} f · ${comp.fps} fps · escala 0,75`);
  let ultimo = -1;
  await renderMedia({
    composition: comp,
    serveUrl: servido,
    codec: "h264",
    outputLocation: VIDEO,
    scale: 0.75,
    crf: 16,
    muted: true,
    colorSpace: "bt709",
    concurrency: 2,
    logLevel: "warn",
    onProgress: ({ progress }) => {
      const p = Math.floor(progress * 10);
      if (p !== ultimo) {
        ultimo = p;
        anota(`vídeo ${p * 10} %`);
      }
    },
  });
  log.ok(`vídeo 1440×810 en ${((Date.now() - t0) / 60000).toFixed(1)} min`);
  await renderMedia({ composition: comp, serveUrl: servido, codec: "wav", outputLocation: MEZCLA, concurrency: 2, logLevel: "warn" });
  log.ok("mezcla WAV");
} catch (e) {
  anota(String(e?.stack ?? e));
  log.error(`el render falló: ${e?.message ?? e} (log: ${path.relative(RAIZ, LOG)})`);
  process.exitCode = 1;
} finally {
  fs.rmSync(servido, { recursive: true, force: true });
  anota("bundle borrado");
}
if (process.exitCode) process.exit(1);

// El masterizado de la final (exportar-final.mjs): ganancia hasta −14 LUFS + limitador a −1,5 dBFS de pico de muestra,
// con `latency=1` (sin él el limitador retrasa todo 5 ms).
const m0 = ebur(MEZCLA);
anota(`mezcla: ${m0.I} LUFS · pico ${m0.TP} dBTP`);
const MASTER = path.join(DIR, `.${nombre}-master.wav`);
let ganancia = -14 - m0.I;
let m1;
for (let i = 0; i < 3; i++) {
  corre("masterizado", "ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", MEZCLA, "-af", `volume=${ganancia.toFixed(2)}dB,alimiter=limit=0.8414:attack=5:release=60:level=disabled:latency=1`, "-c:a", "pcm_s24le", MASTER]);
  m1 = ebur(MASTER);
  anota(`máster (+${ganancia.toFixed(2)} dB): ${m1.I} LUFS · pico ${m1.TP} dBTP`);
  if (Math.abs(m1.I + 14) <= 0.3) break;
  ganancia += -14 - m1.I;
}
const SALIDA = path.join(DIR, `${nombre}.mp4`);
corre("720p", "ffmpeg", [
  "-nostdin", "-y", "-v", "error", "-i", VIDEO, "-i", MASTER, "-map", "0:v:0", "-map", "1:a:0",
  "-vf", "scale=1280:720:flags=lanczos,setparams=color_primaries=bt709:color_trc=bt709:colorspace=bt709:range=tv",
  "-c:v", "libx264", "-crf", "18", "-preset", "slow", "-pix_fmt", "yuv420p", "-x264-params", "colorprim=bt709:transfer=bt709:colormatrix=bt709:range=tv",
  "-c:a", "aac", "-b:a", "256k", "-ar", "48000", "-shortest", "-movflags", "+write_colr+faststart", SALIDA,
]);
fs.rmSync(VIDEO, { force: true });
fs.rmSync(MASTER, { force: true });
log.ok(`${path.relative(RAIZ, SALIDA)} · mezcla ${m0.I} LUFS (pico ${m0.TP}) → máster ${m1.I} LUFS (pico ${m1.TP} dBTP)`);
