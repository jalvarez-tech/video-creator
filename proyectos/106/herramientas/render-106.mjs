#!/usr/bin/env node
/**
 * render-106.mjs — fotogramas y PRUEBA del 106 («En últimas noticias», 16:9) con UN solo bundle (que se borra al acabar).
 * Copia de `proyectos/101/herramientas/render-historias.mjs` para 16:9.
 *
 *   node proyectos/106/herramientas/render-106.mjs stills [rev]
 *       → proyectos/106/pruebas-720p/stills-<rev>/fNNNN.png (escala 1) en los frames de control
 *   node proyectos/106/herramientas/render-106.mjs prueba <rev>
 *       → proyectos/106/pruebas-720p/106-<rev>.mp4 (1280×720) + 106-<rev>-mezcla.wav + 106-<rev>.log
 *
 * POR QUÉ ASÍ: `--scale=0.75` (1440×810) y reducir con ffmpeg a 1280×720 (a 0,666… el alto sale con decimales y el render
 * muere al coser: memoria `remotion-escala-no-entera`); el audio aparte en WAV y mezclado con el ffmpeg del sistema (el AAC
 * de Remotion suena 43 ms tarde), masterizado como la final (−14 LUFS, pico ≤ −1 dBTP, `alimiter latency=1`).
 */
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { RAIZ, ejecutar, log } from "../../../herramientas/comun.mjs";
import { cargaTs } from "../../../remotion/src/motor/metraje/revisar-metraje.mjs";

const require = createRequire(path.join(RAIZ, "remotion", "package.json"));
const { bundle } = require("@remotion/bundler");
const { renderMedia, renderStill, selectComposition } = require("@remotion/renderer");

const [modo, rev = "rev1"] = process.argv.slice(2);
if (!["stills", "prueba"].includes(modo)) {
  console.error("uso: node proyectos/106/herramientas/render-106.mjs <stills|prueba> [rev]");
  process.exit(2);
}
const numeros = ["106"];

const libres = () => {
  const s = fs.statfsSync(RAIZ);
  return (s.bavail * s.bsize) / 2 ** 30;
};
if (libres() < 8) {
  log.error(`quedan ${libres().toFixed(1)} GiB libres: no renderizo (el bundle ocupa ≈ 2,5 GB)`);
  process.exit(1);
}
const ebur = (f) => {
  const r = ejecutar("ffmpeg", ["-nostdin", "-hide_banner", "-i", f, "-af", "ebur128=peak=true", "-f", "null", "-"]);
  const s = r.stderr.slice(r.stderr.lastIndexOf("Summary:"));
  return { I: Number(s.match(/I:\s+(-?[\d.]+) LUFS/)?.[1]), TP: Number(s.match(/Peak:\s+(-?[\d.]+) dBFS/)?.[1]) };
};

/** Los frames de control: f0 (miniatura), el centro de cada tira, cada corte, el lema y el CTA entero. */
const framesDe = (H) => {
  const fs_ = new Set([0, H.cierre + 6, H.cierre + 140, H.duracion - 1, H.lema]);
  for (const t of H.tiras) fs_.add(Math.round((Math.max(0, t.en) + t.sale) / 2));
  for (const c of H.cortes) fs_.add(c.en + 2);
  return [...fs_].filter((f) => f >= 0 && f < H.duracion).sort((a, b) => a - b);
};

const t0 = Date.now();
const servido = await bundle({ entryPoint: path.join(RAIZ, "remotion", "src", "index.ts") });
log.info(`bundle en ${((Date.now() - t0) / 1000).toFixed(0)} s`);
let fallo = false;
try {
  for (const n of numeros) {
    const { m, tx } = await cargaTs({ m: "remotion/src/proyectos/106/metraje-106.ts", tx: "remotion/src/proyectos/106/textos-106.ts" });
    const H = { composicion: "EnUltimasNoticias106", duracion: m.DURACION_106, cierre: m.EMPIEZA_PAPEL, cortes: m.metraje106, tiras: tx.TIRAS, lema: tx.MAS_GRITO.amor + 8 };
    const DIR = path.join(RAIZ, "proyectos", n, "pruebas-720p");
    fs.mkdirSync(DIR, { recursive: true });
    const comp = await selectComposition({ serveUrl: servido, id: H.composicion, inputProps: {}, logLevel: "error" });
    if (modo === "stills") {
      const sd = path.join(DIR, `stills-${rev}`);
      fs.mkdirSync(sd, { recursive: true });
      for (const f of framesDe(H)) {
        await renderStill({ composition: comp, serveUrl: servido, frame: f, output: path.join(sd, `f${String(f).padStart(4, "0")}.png`), logLevel: "error" });
      }
      log.ok(`${n}: ${framesDe(H).length} fotogramas en ${path.relative(RAIZ, sd)}`);
      continue;
    }
    const LOG = path.join(DIR, `${n}-${rev}.log`);
    fs.writeFileSync(LOG, `render-106 ${rev} · ${new Date().toISOString()}\n`);
    const VIDEO = path.join(DIR, `.${n}-${rev}-1440.mp4`);
    const MEZCLA = path.join(DIR, `${n}-${rev}-mezcla.wav`);
    const t1 = Date.now();
    await renderMedia({ composition: comp, serveUrl: servido, codec: "h264", outputLocation: VIDEO, scale: 0.75, crf: 16, muted: true, colorSpace: "bt709", concurrency: 3, logLevel: "warn" });
    await renderMedia({ composition: comp, serveUrl: servido, codec: "wav", outputLocation: MEZCLA, concurrency: 3, logLevel: "warn" });
    const m0 = ebur(MEZCLA);
    const MASTER = path.join(DIR, `.${n}-${rev}-master.wav`);
    let ganancia = -14 - m0.I;
    let m1;
    for (let i = 0; i < 3; i++) {
      ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", MEZCLA, "-af", `volume=${ganancia.toFixed(2)}dB,alimiter=limit=0.8414:attack=5:release=60:level=disabled:latency=1`, "-c:a", "pcm_s24le", MASTER], { check: true });
      m1 = ebur(MASTER);
      if (Math.abs(m1.I + 14) <= 0.3) break;
      ganancia += -14 - m1.I;
    }
    const SALIDA = path.join(DIR, `${n}-${rev}.mp4`);
    const r = ejecutar("ffmpeg", [
      "-nostdin", "-y", "-v", "error", "-i", VIDEO, "-i", MASTER, "-map", "0:v:0", "-map", "1:a:0",
      "-vf", "scale=1280:720:flags=lanczos,setparams=color_primaries=bt709:color_trc=bt709:colorspace=bt709:range=tv",
      "-c:v", "libx264", "-crf", "18", "-preset", "slow", "-pix_fmt", "yuv420p", "-x264-params", "colorprim=bt709:transfer=bt709:colormatrix=bt709:range=tv",
      "-c:a", "aac", "-b:a", "256k", "-ar", "48000", "-shortest", "-movflags", "+write_colr+faststart", SALIDA,
    ]);
    fs.appendFileSync(LOG, `mezcla ${m0.I} LUFS (pico ${m0.TP}) → máster ${m1.I} LUFS (pico ${m1.TP} dBTP), +${ganancia.toFixed(2)} dB\n${r.stderr}\n`);
    fs.rmSync(VIDEO, { force: true });
    fs.rmSync(MASTER, { force: true });
    if (r.status !== 0) throw new Error(`ffmpeg 720p de ${n}: ${r.stderr.slice(-400)}`);
    log.ok(`${path.relative(RAIZ, SALIDA)} en ${((Date.now() - t1) / 60000).toFixed(1)} min · mezcla ${m0.I} LUFS → máster ${m1.I} LUFS (pico ${m1.TP} dBTP)`);
  }
} catch (e) {
  log.error(`el render falló: ${e?.message ?? e}`);
  fallo = true;
} finally {
  fs.rmSync(servido, { recursive: true, force: true });
  log.info("bundle borrado");
}
if (fallo) process.exit(1);
