#!/usr/bin/env node
/**
 * exportar-final.mjs — la FINAL 1080 del 098 (TuEstasAqui098, 1920×1080, 30 fps), con la receta de R22. Copia de
 * `proyectos/097/herramientas/exportar-final.mjs` con UN cambio: un solo bundle propio para todos los tramos y la mezcla
 * (el del 097 lanzaba un `npx remotion render` por tramo, y cada uno deja 2,2-2,5 GB en el tmp; con tres sesiones
 * renderizando en el mismo Mac, y sin poder borrar los bundles de las otras, eso es lo que se queda sin disco).
 *
 *   node proyectos/098/herramientas/exportar-final.mjs <nombre> [--crf 12] [--preset slower] [--tramo 600] [--lufs -14]
 *   node proyectos/098/herramientas/exportar-final.mjs <nombre> --solo-audio      (rehace el audio sobre el vídeo ya exportado)
 *
 * Deja en `proyectos/098/finales/`:
 *   <nombre>.mp4          el máster: vídeo CRF 12 `slower` en BT.709 + audio masterizado (AAC 320k)
 *   <nombre>-ligera.mp4   para compartir (WhatsApp, redes): recodificado del máster a CRF 20, mismo audio
 *   <nombre>-mezcla.wav   la mezcla tal cual sale de Remotion, sin masterizar (para rehacer el audio)
 *
 * POR QUÉ ASÍ (lo del 097):
 *   · Vídeo por TRAMOS (`frameRange`, mudos, PNG) unidos con `concat -c copy`: con PNG cada fotograma pesa ≈ 3 MB; un
 *     tramo que falla no tira los demás y el script RETOMA los que ya están. Para si quedan < 4 GiB libres.
 *   · El audio, aparte (WAV) y mezclado con el ffmpeg del sistema: el AAC de Remotion suena 43 ms tarde.
 *   · Masterizado: ganancia + limitador hasta `--lufs` (defecto −14) con pico verdadero ≤ −1 dBTP; `latency=1`.
 *   · Etiquetas BT.709 en las DOS capas (VUI y `colr`), como manda R22.
 */
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { RAIZ, ejecutar, log } from "../../../herramientas/comun.mjs";
import { cargaTs } from "../../../remotion/src/motor/metraje/revisar-metraje.mjs";

const require = createRequire(path.join(RAIZ, "remotion", "package.json"));
const { bundle } = require("@remotion/bundler");
const { renderMedia, selectComposition } = require("@remotion/renderer");

const args = process.argv.slice(2);
const nombre = args.find((a) => !a.startsWith("--") && !/^-?\d/.test(a));
if (!nombre) {
  console.error("uso: node proyectos/098/herramientas/exportar-final.mjs <nombre> [--crf 12] [--preset slower] [--tramo 600] [--lufs -14] [--solo-audio]");
  process.exit(2);
}
const opcion = (k, def) => {
  const i = args.indexOf(k);
  return i >= 0 ? args[i + 1] : def;
};
const CRF = Number(opcion("--crf", 12));
const PRESET = opcion("--preset", "slower");
const TRAMO = Number(opcion("--tramo", 600));
const LUFS = Number(opcion("--lufs", -14));
const SOLO_AUDIO = args.includes("--solo-audio");
const COMP = "TuEstasAqui098";
const { m } = await cargaTs({ m: "remotion/src/proyectos/098/metraje-098.ts" });
const DURACION = m.DURACION_098;

// La puerta, antes de gastar una hora de render.
const puerta = ejecutar("node", ["proyectos/098/revisar-098.mjs"], { cwd: RAIZ });
if (puerta.status !== 0) {
  console.log(puerta.stdout);
  log.error("la puerta del 098 no pasa: no se exporta");
  process.exit(1);
}

const FINALES = path.join(RAIZ, "proyectos", "098", "finales");
const TMP = path.join(FINALES, `.tmp-${nombre}`);
fs.mkdirSync(TMP, { recursive: true });
const LOG = path.join(TMP, "exportar.log");
const anota = (titulo, r) => fs.appendFileSync(LOG, `\n===== ${titulo}\n${r.comando ?? ""}\n${r.stdout ?? ""}\n${r.stderr ?? ""}\n`);
const corre = (titulo, fn) => {
  const r = fn();
  anota(titulo, r);
  if (r.status !== 0) {
    log.error(`${titulo}: falló (código ${r.status}); el log entero está en ${path.relative(RAIZ, LOG)}`);
    console.error((r.stderr || r.stdout).trim().slice(-1500));
    process.exit(1);
  }
  return r;
};
const libresGiB = () => {
  const s = fs.statfsSync(FINALES);
  return (s.bavail * s.bsize) / 2 ** 30;
};
const fotogramas = (f) => {
  const r = ejecutar("ffprobe", ["-v", "error", "-count_packets", "-select_streams", "v:0", "-show_entries", "stream=nb_read_packets", "-of", "csv=p=0", f]);
  return r.status === 0 ? Number(r.stdout.trim()) : -1;
};
const ebur = (f) => {
  const r = ejecutar("ffmpeg", ["-nostdin", "-hide_banner", "-i", f, "-af", "ebur128=peak=true", "-f", "null", "-"]);
  const s = r.stderr.slice(r.stderr.lastIndexOf("Summary:"));
  return { I: Number(s.match(/I:\s+(-?[\d.]+) LUFS/)?.[1]), TP: Number(s.match(/Peak:\s+(-?[\d.]+) dBFS/)?.[1]) };
};

const MASTER = path.join(FINALES, `${nombre}.mp4`);
const VIDEO = path.join(TMP, "video.mp4");
const MEZCLA = path.join(FINALES, `${nombre}-mezcla.wav`);

const servido = await bundle({ entryPoint: path.join(RAIZ, "remotion", "src", "index.ts") });
fs.appendFileSync(LOG, `\nbundle: ${servido}\n`);
try {
  const comp = await selectComposition({ serveUrl: servido, id: COMP, inputProps: {}, logLevel: "error" });
  // ── 1. El vídeo, por tramos ──
  if (!SOLO_AUDIO) {
    const tramos = [];
    for (let a = 0; a < DURACION; a += TRAMO) tramos.push([a, Math.min(DURACION, a + TRAMO) - 1]);
    for (const [i, [a, b]] of tramos.entries()) {
      const sal = path.join(TMP, `tramo-${String(i).padStart(2, "0")}.mp4`);
      if (fs.existsSync(sal) && fotogramas(sal) === b - a + 1) {
        log.ok(`tramo ${i + 1}/${tramos.length} (f${a}-f${b}) ya estaba`);
        continue;
      }
      if (libresGiB() < 4) {
        log.error(`quedan ${libresGiB().toFixed(1)} GiB libres: paro antes del tramo ${i + 1} (se retoma al relanzar)`);
        process.exitCode = 1;
        break;
      }
      const t0 = Date.now();
      await renderMedia({
        composition: comp,
        serveUrl: servido,
        codec: "h264",
        outputLocation: sal,
        frameRange: [a, b],
        muted: true,
        crf: CRF,
        x264Preset: PRESET,
        colorSpace: "bt709",
        imageFormat: "png",
        concurrency: 2,
        offthreadVideoCacheSizeInBytes: 300000000,
        logLevel: "warn",
      });
      const n = fotogramas(sal);
      if (n !== b - a + 1) {
        log.error(`tramo ${i + 1}: ${n} fotogramas, esperaba ${b - a + 1}`);
        process.exitCode = 1;
        break;
      }
      log.ok(`tramo ${i + 1}/${tramos.length} (f${a}-f${b}) en ${((Date.now() - t0) / 60000).toFixed(1)} min · ${libresGiB().toFixed(1)} GiB libres`);
    }
    if (!process.exitCode) {
      const lista = path.join(TMP, "lista.txt");
      fs.writeFileSync(lista, tramos.map((_, i) => `file 'tramo-${String(i).padStart(2, "0")}.mp4'`).join("\n") + "\n");
      corre("concat", () => ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", lista, "-c", "copy", VIDEO]));
      const n = fotogramas(VIDEO);
      if (n !== DURACION) {
        log.error(`el vídeo unido tiene ${n} fotogramas, esperaba ${DURACION}`);
        process.exitCode = 1;
      } else log.ok(`vídeo unido: ${n} fotogramas`);
    }
  } else {
    if (!fs.existsSync(MASTER)) {
      log.error(`--solo-audio necesita el máster ya exportado: ${path.relative(RAIZ, MASTER)}`);
      process.exitCode = 1;
    } else corre("vídeo del máster", () => ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", MASTER, "-map", "0:v:0", "-c", "copy", VIDEO]));
  }
  // ── 2. La mezcla de Remotion en WAV ──
  if (!process.exitCode) await renderMedia({ composition: comp, serveUrl: servido, codec: "wav", outputLocation: MEZCLA, concurrency: 2, logLevel: "warn" });
} finally {
  fs.rmSync(servido, { recursive: true, force: true });
  fs.appendFileSync(LOG, "bundle borrado\n");
}
if (process.exitCode) process.exit(1);

// ── 3. El masterizado ──
const m0 = ebur(MEZCLA);
log.ok(`mezcla: ${m0.I} LUFS · pico ${m0.TP} dBTP`);
const MASTER_WAV = path.join(TMP, "master.wav");
let ganancia = LUFS - m0.I;
let m1;
for (let intento = 0; intento < 3; intento++) {
  corre("masterizado", () =>
    ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", MEZCLA, "-af", `volume=${ganancia.toFixed(2)}dB,alimiter=limit=0.8414:attack=5:release=60:level=disabled:latency=1`, "-c:a", "pcm_s24le", MASTER_WAV])
  );
  m1 = ebur(MASTER_WAV);
  log.ok(`máster (+${ganancia.toFixed(2)} dB): ${m1.I} LUFS · pico ${m1.TP} dBTP`);
  if (Math.abs(m1.I - LUFS) <= 0.3) break;
  ganancia += LUFS - m1.I;
}
if (m1.TP > -1.0) log.aviso(`el pico verdadero (${m1.TP} dBTP) pasa de −1 dBTP`);

// ── 4. El máster: vídeo copiado + audio AAC 320k, BT.709 en las dos capas ──
const SALIDA = SOLO_AUDIO ? path.join(TMP, "master-nuevo.mp4") : MASTER;
corre("máster", () =>
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", VIDEO, "-i", MASTER_WAV, "-map", "0:v:0", "-map", "1:a:0", "-c:v", "copy",
    "-bsf:v", "h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1",
    "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709", "-color_range", "tv",
    "-c:a", "aac", "-b:a", "320k", "-ar", "48000", "-shortest", "-movflags", "+write_colr+faststart", SALIDA])
);
if (SOLO_AUDIO) fs.renameSync(SALIDA, MASTER);
log.ok(`máster: ${path.relative(RAIZ, MASTER)}`);

// ── 5. La ligera, para compartir ──
const LIGERA = path.join(FINALES, `${nombre}-ligera.mp4`);
corre("ligera", () =>
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", MASTER, "-map", "0:v:0", "-map", "0:a:0",
    "-vf", "setparams=color_primaries=bt709:color_trc=bt709:colorspace=bt709:range=tv",
    "-c:v", "libx264", "-crf", "20", "-preset", "slow", "-pix_fmt", "yuv420p",
    "-x264-params", "colorprim=bt709:transfer=bt709:colormatrix=bt709:range=tv",
    "-c:a", "copy", "-movflags", "+write_colr+faststart", LIGERA])
);
log.ok(`ligera: ${path.relative(RAIZ, LIGERA)}`);
fs.rmSync(TMP, { recursive: true, force: true });
log.ok("listo");
