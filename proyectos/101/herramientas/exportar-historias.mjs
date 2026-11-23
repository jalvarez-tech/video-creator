#!/usr/bin/env node
/**
 * exportar-historias.mjs — las FINALES 1080×1920 de las historias verticales de MAS (101-105), con UN solo bundle para
 * todas (que se borra al acabar: es el suyo).
 *
 *   node proyectos/101/herramientas/exportar-historias.mjs <101,102,…> [--crf 12] [--preset slower] [--tramo 400] [--lufs -14]
 *
 * Deja en `proyectos/NNN/finales/`:
 *   NNN-<título>-1080.mp4          el máster: vídeo CRF 12 `slower` en BT.709 (VUI y `colr`) + audio masterizado (AAC 320k)
 *   NNN-<título>-1080-ligera.mp4   para compartir (WhatsApp, redes): recodificado del máster a CRF 20, mismo audio
 *   NNN-<título>-1080-mezcla.wav   la mezcla tal cual sale de Remotion, sin masterizar (para rehacer el audio)
 *   NNN-<título>-1080.log          medidas: sonoridad, pico, fotogramas y el color contra fotogramas a escala 1
 *
 * POR QUÉ ASÍ (la receta de `proyectos/097/herramientas/exportar-final.mjs`, con un cambio):
 *   · UN bundle para las cinco y la API del renderer (`frameRange`), no un `npx remotion render` por tramo: cada bundle
 *     deja 2,2-2,5 GB en el tmp (memoria `remotion-bundles-llenan-disco`) y aquí serían una docena.
 *   · Vídeo por TRAMOS de 400 f en PNG, unidos con `concat -c copy`: el Mac va en swap con fotogramas de ≈ 6 MB
 *     (memoria `remotion-final-1080-png-por-tramos`); un tramo que ya está se reutiliza al relanzar. Para si quedan
 *     < 4 GiB libres.
 *   · El audio, aparte en WAV y mezclado con el ffmpeg del sistema (el AAC de Remotion suena 43 ms tarde); masterizado a
 *     −14 LUFS con pico ≤ −1 dBTP y `alimiter latency=1` (sin él, el audio se retrasa 5 ms): lo mismo que las pruebas.
 *   · El COLOR se comprueba: tres fotogramas del máster contra los mismos en PNG a escala 1, del mismo bundle (PSNR).
 */
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { RAIZ, ejecutar, log } from "../../../herramientas/comun.mjs";
import { cargaTs } from "../../../remotion/src/motor/metraje/revisar-metraje.mjs";

const require = createRequire(path.join(RAIZ, "remotion", "package.json"));
const { bundle } = require("@remotion/bundler");
const { renderMedia, renderStill, selectComposition } = require("@remotion/renderer");

const args = process.argv.slice(2);
const lista = args.find((a) => !a.startsWith("--") && /^[\d,]+$/.test(a));
const opcion = (k, def) => {
  const i = args.indexOf(k);
  return i >= 0 ? args[i + 1] : def;
};
const numeros = (lista ?? "").split(",").filter((n) => /^10[1-5]$/.test(n));
if (!numeros.length) {
  console.error("uso: node proyectos/101/herramientas/exportar-historias.mjs <101,102,103,104,105> [--crf 12] [--preset slower] [--tramo 400] [--lufs -14]");
  process.exit(2);
}
const CRF = Number(opcion("--crf", 12));
const PRESET = opcion("--preset", "slower");
const TRAMO = Number(opcion("--tramo", 400));
const LUFS = Number(opcion("--lufs", -14));

const libres = () => {
  const s = fs.statfsSync(RAIZ);
  return (s.bavail * s.bsize) / 2 ** 30;
};
if (libres() < 8) {
  log.error(`quedan ${libres().toFixed(1)} GiB libres: no exporto (el bundle ocupa ≈ 2,5 GB)`);
  process.exit(1);
}
const fotogramas = (f) => {
  const r = ejecutar("ffprobe", ["-v", "error", "-count_packets", "-select_streams", "v:0", "-show_entries", "stream=nb_read_packets", "-of", "csv=p=0", f]);
  return r.status === 0 ? Number(r.stdout.trim()) : -1;
};
const ebur = (f) => {
  const r = ejecutar("ffmpeg", ["-nostdin", "-hide_banner", "-i", f, "-af", "ebur128=peak=true", "-f", "null", "-"]);
  const s = r.stderr.slice(r.stderr.lastIndexOf("Summary:"));
  return { I: Number(s.match(/I:\s+(-?[\d.]+) LUFS/)?.[1]), TP: Number(s.match(/Peak:\s+(-?[\d.]+) dBFS/)?.[1]) };
};
/** «Lo que quiero en Navidad» → «lo-que-quiero-en-navidad». */
const slug = (t) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const sinFallo = (r, que) => {
  if (r.status !== 0) throw new Error(`${que}: ${(r.stderr || r.stdout).trim().slice(-600)}`);
  return r;
};

const t0 = Date.now();
const servido = await bundle({ entryPoint: path.join(RAIZ, "remotion", "src", "index.ts") });
log.info(`bundle en ${((Date.now() - t0) / 1000).toFixed(0)} s`);
let fallo = false;
try {
  for (const n of numeros) {
    const { h } = await cargaTs({ h: `remotion/src/proyectos/${n}/historia-${n}.ts` });
    const H = h[`HISTORIA_${n}`];
    const nombre = `${n}-${slug(H.titulo)}-1080`;
    const FINALES = path.join(RAIZ, "proyectos", n, "finales");
    const TMP = path.join(FINALES, `.tmp-${nombre}`);
    fs.mkdirSync(TMP, { recursive: true });
    const LOG = path.join(FINALES, `${nombre}.log`);
    fs.writeFileSync(LOG, `exportar-historias ${n} «${H.titulo}» · ${new Date().toISOString()} · CRF ${CRF} ${PRESET}, tramos de ${TRAMO} f\n`);
    const anota = (s) => fs.appendFileSync(LOG, `${s}\n`);
    const comp = await selectComposition({ serveUrl: servido, id: H.composicion, inputProps: {}, logLevel: "error" });
    const t1 = Date.now();

    // ── 1. El vídeo, por tramos ──
    const tramos = [];
    for (let a = 0; a < H.duracion; a += TRAMO) tramos.push([a, Math.min(H.duracion, a + TRAMO) - 1]);
    for (const [i, [a, b]] of tramos.entries()) {
      const sal = path.join(TMP, `tramo-${String(i).padStart(2, "0")}.mp4`);
      if (fs.existsSync(sal) && fotogramas(sal) === b - a + 1) continue;
      if (libres() < 4) throw new Error(`quedan ${libres().toFixed(1)} GiB libres antes del tramo ${i + 1} (se retoma al relanzar)`);
      await renderMedia({
        composition: comp, serveUrl: servido, codec: "h264", outputLocation: sal, frameRange: [a, b], muted: true, crf: CRF,
        x264Preset: PRESET, imageFormat: "png", colorSpace: "bt709", concurrency: 3, offthreadVideoCacheSizeInBytes: 300_000_000, logLevel: "warn",
      });
      const k = fotogramas(sal);
      if (k !== b - a + 1) throw new Error(`${n}, tramo ${i + 1}: ${k} fotogramas, esperaba ${b - a + 1}`);
      log.ok(`${n}: tramo ${i + 1}/${tramos.length} (f${a}-f${b}) · ${libres().toFixed(1)} GiB libres`);
    }
    const listaTxt = path.join(TMP, "lista.txt");
    fs.writeFileSync(listaTxt, tramos.map((_, i) => `file 'tramo-${String(i).padStart(2, "0")}.mp4'`).join("\n") + "\n");
    const VIDEO = path.join(TMP, "video.mp4");
    sinFallo(ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", listaTxt, "-c", "copy", VIDEO]), "concat");
    const nv = fotogramas(VIDEO);
    if (nv !== H.duracion) throw new Error(`${n}: el vídeo unido tiene ${nv} fotogramas, esperaba ${H.duracion}`);
    anota(`vídeo: ${nv} fotogramas`);

    // ── 2. El audio: la mezcla en WAV y su masterizado ──
    const MEZCLA = path.join(FINALES, `${nombre}-mezcla.wav`);
    await renderMedia({ composition: comp, serveUrl: servido, codec: "wav", outputLocation: MEZCLA, concurrency: 3, logLevel: "warn" });
    const m0 = ebur(MEZCLA);
    const MASTER_WAV = path.join(TMP, "master.wav");
    let ganancia = LUFS - m0.I;
    let m1;
    for (let intento = 0; intento < 3; intento++) {
      sinFallo(ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", MEZCLA, "-af",
        `volume=${ganancia.toFixed(2)}dB,alimiter=limit=0.8414:attack=5:release=60:level=disabled:latency=1`, "-c:a", "pcm_s24le", MASTER_WAV]), "masterizado");
      m1 = ebur(MASTER_WAV);
      if (Math.abs(m1.I - LUFS) <= 0.3) break;
      ganancia += LUFS - m1.I;
    }
    anota(`mezcla ${m0.I} LUFS (pico ${m0.TP}) → máster ${m1.I} LUFS (pico ${m1.TP} dBTP), +${ganancia.toFixed(2)} dB`);
    if (m1.TP > -1.0) log.aviso(`${n}: el pico verdadero (${m1.TP} dBTP) pasa de −1 dBTP`);

    // ── 3. El máster: vídeo copiado + AAC 320k, BT.709 en las dos capas ──
    const MASTER = path.join(FINALES, `${nombre}.mp4`);
    sinFallo(ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", VIDEO, "-i", MASTER_WAV, "-map", "0:v:0", "-map", "1:a:0", "-c:v", "copy",
      "-bsf:v", "h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1",
      "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709", "-color_range", "tv",
      "-c:a", "aac", "-b:a", "320k", "-ar", "48000", "-shortest", "-movflags", "+write_colr+faststart", MASTER]), "máster");

    // ── 4. La ligera ──
    const LIGERA = path.join(FINALES, `${nombre}-ligera.mp4`);
    sinFallo(ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", MASTER, "-map", "0:v:0", "-map", "0:a:0",
      "-vf", "setparams=color_primaries=bt709:color_trc=bt709:colorspace=bt709:range=tv",
      "-c:v", "libx264", "-crf", "20", "-preset", "slow", "-pix_fmt", "yuv420p",
      "-x264-params", "colorprim=bt709:transfer=bt709:colormatrix=bt709:range=tv",
      "-c:a", "copy", "-movflags", "+write_colr+faststart", LIGERA]), "ligera");

    // ── 5. El color: el máster contra fotogramas PNG a escala 1 del mismo bundle, en BAJA FRECUENCIA (bloques de
    // 32×32 px, `scale … :flags=area`). El PSNR a resolución completa no sirve de alarma: el 4:2:0 emborrona el borde de
    // la letra índigo sobre el papel amarillo y el cierre da ≈ 30 dB con el color idéntico (2026-11-23: Δ medio ≤ 0,5
    // niveles por canal; en bloques, 0,2-0,3).
    const control = [60, Math.round(H.cierre / 2), H.cierre + 90];
    const psnr = [];
    for (const f of control) {
      const png = path.join(TMP, `f${f}.png`);
      await renderStill({ composition: comp, serveUrl: servido, frame: f, output: png, logLevel: "error" });
      const r = ejecutar("ffmpeg", ["-nostdin", "-hide_banner", "-i", MASTER, "-i", png, "-lavfi",
        `[0:v]select=eq(n\\,${f}),scale=in_color_matrix=bt709:in_range=tv:out_range=pc:flags=accurate_rnd+full_chroma_int,format=rgb24,scale=34:60:flags=area[a];` +
          `[1:v]format=rgb24,scale=34:60:flags=area[b];[a][b]psnr`, "-frames:v", "1", "-f", "null", "-"]);
      psnr.push(Number(r.stderr.match(/average:([\d.]+|inf)/)?.[1] ?? NaN));
    }
    anota(`color: PSNR en baja frecuencia (bloques de 32 px) del máster contra PNG a escala 1 en f${control.join(", f")}: ${psnr.join(" · ")} dB`);
    if (psnr.some((p) => !(p >= 40))) log.aviso(`${n}: el color se aparta de los fotogramas a escala 1 (PSNR en baja frecuencia ${psnr.join(" · ")} dB)`);

    fs.rmSync(TMP, { recursive: true, force: true });
    const mb = (f) => (fs.statSync(f).size / 2 ** 20).toFixed(0);
    log.ok(`${path.relative(RAIZ, MASTER)} (${mb(MASTER)} MB; ligera ${mb(LIGERA)} MB) en ${((Date.now() - t1) / 60000).toFixed(1)} min · ${m1.I} LUFS, pico ${m1.TP} dBTP · color ${psnr.join("/")} dB`);
  }
} catch (e) {
  log.error(`la exportación falló: ${e?.message ?? e}`);
  fallo = true;
} finally {
  fs.rmSync(servido, { recursive: true, force: true });
  log.info("bundle borrado");
}
if (fallo) process.exit(1);
