#!/usr/bin/env node
/**
 * exportar-final.mjs — la FINAL del 065 (V47, «15 minutos: la decisión»): máster CRF 12, versión CRF 16, la base sin subtítulos de la versión con ficha y el audio en WAV.
 *
 *   node proyectos/065/herramientas/exportar-final.mjs                        (todo: audio, master, crf16 y base)
 *   node proyectos/065/herramientas/exportar-final.mjs --solo audio,master   (solo esas etapas; lo ya hecho en `finales-trabajo/` se reutiliza)
 *
 * Es la receta del 069 (`exportar-final.mjs` de ese proyecto: tramos, `--concurrency=2`, caché de vídeo acotada, vigilancia del disco; memoria `remotion-final-1080-png-por-tramos`) y los pasos de
 * `montaje.md` §12 (R22), con UNA diferencia: en vez de lanzar `npx remotion render` por tramo —cada invocación del CLI empaqueta el proyecto y deja en el tmp un bundle de ≈ 2,4 GB (el `public/` del
 * checkout lleva el material de 063, 064 y 065)— se empaqueta UNA vez con la API, se renderizan los tramos con ese bundle y se borra SOLO ese. Se hace así porque el checkout lo comparten tres sesiones que
 * exportan a la vez y un `rm $TMPDIR/remotion-webpack-bundle-*` borraría también el bundle del render de otra. Las banderas son las del CLI de siempre (los valores por defecto de `renderMedia` coinciden):
 *   master  : crf 12 · x264 slower · BT.709 · PNG · gl angle · sin audio                       (`--crf=12 --x264-preset=slower --color-space=bt709 --image-format=png --gl=angle --muted`)
 *   crf16   : crf 16 · x264 slow   · BT.709 · PNG · gl angle · sin audio
 *   base    : crf 6  · x264 fast   · BT.709 · PNG · gl angle · sin audio · `sinSubtitulos`      (la base de `ficha-luxur`: `ficha-oculta.mjs` le pone la banda; ver `proyectos/065/herramientas/ficha-oculta.mjs`)
 *   audio   : WAV del mismo plan (el AAC del render llega ≈ 43 ms tarde por el relleno del codificador; con el WAV mezclado por el ffmpeg del sistema queda a 0).
 * Los tramos (403 f: 1209 = 3 × 403) se unen sin recodificar (`concat -c copy`; misma GOP cerrada, mismos parámetros) y el máster y el CRF 16 se mezclan con el WAV (AAC 320k) y las etiquetas BT.709 en el
 * VUI y en el átomo `colr`, en una sola pasada y sin recodificar el vídeo.
 *
 * Salidas: los intermedios, en `proyectos/065/finales-trabajo/` (ignorada por git; se borra al acabar con `--limpiar`); lo entregable, en `proyectos/065/finales/`:
 *   065-recorrido.mp4 (master) · 065-recorrido-crf16.mp4. La base va a `finales-trabajo/065-limpio.mp4` y de ella sale la versión con ficha.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const require = createRequire(path.join(RAIZ, "remotion", "package.json"));
const { bundle } = require("@remotion/bundler");
const { renderMedia, selectComposition, makeCancelSignal } = require("@remotion/renderer");

const ID = "Recorrido065";
const ENTRADA = path.join(RAIZ, "remotion", "src", "proyectos", "065", "entrada-065.tsx");
const TRABAJO = path.join(RAIZ, "proyectos", "065", "finales-trabajo");
const FINALES = path.join(RAIZ, "proyectos", "065", "finales");
const TRAMO = 403; // 1209 f = 3 × 403
const LIBRE_MINIMO = 8 * 1024 ** 3; // el disco lo comparten tres sesiones: se para el render si quedan < 8 GiB (había 52)
const ETAPAS = ["audio", "master", "crf16", "base"];

const argv = process.argv.slice(2);
const iSolo = argv.indexOf("--solo");
const solo = iSolo >= 0 ? argv[iSolo + 1].split(",") : ETAPAS;
for (const e of solo) if (!ETAPAS.includes(e)) throw new Error(`etapa desconocida: ${e} (${ETAPAS.join(", ")})`);
const LIMPIAR = argv.includes("--limpiar");

const paso = (t) => console.log(`\n━━ ${t}`);
const libre = () => {
  const e = fs.statfsSync(TRABAJO);
  return e.bavail * e.bsize;
};
const gib = (b) => (b / 1024 ** 3).toFixed(1);
function corre(cmd, args) {
  const r = spawnSync(cmd, args, { stdio: "inherit", cwd: RAIZ });
  if (r.status !== 0) {
    console.error(`✖ falló: ${cmd} ${args.join(" ").slice(0, 200)}`);
    process.exit(r.status ?? 1);
  }
}
function captura(cmd, args) {
  const r = spawnSync(cmd, args, { encoding: "utf8", cwd: RAIZ, maxBuffer: 1 << 26 });
  return `${r.stdout ?? ""}${r.stderr ?? ""}`;
}

fs.mkdirSync(TRABAJO, { recursive: true });
fs.mkdirSync(FINALES, { recursive: true });

paso("1 · la puerta del plan (--final)");
const puerta = spawnSync("node", ["proyectos/065/revisar-065.mjs", "--final"], { cwd: RAIZ, encoding: "utf8" });
process.stdout.write((puerta.stdout ?? "").split("\n").slice(-4).join("\n"));
process.stderr.write(puerta.stderr ?? "");
if (puerta.status !== 0) {
  console.error("✖ la puerta con --final no pasa: no se exporta");
  process.exit(puerta.status ?? 1);
}
const TOTAL = Number(/·\s*(\d+) f \(/.exec(puerta.stdout ?? "")?.[1]) || 1209;

paso(`2 · el bundle propio (uno solo; libres ${gib(libre())} GiB)`);
const t0 = Date.now();
const servido = await bundle({ entryPoint: ENTRADA });
console.log(`bundle en ${servido} (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
// Se borra SOLO este bundle, pase lo que pase (también con Ctrl-C o si un render falla).
let limpio = false;
const borraBundle = () => {
  if (limpio) return;
  limpio = true;
  fs.rmSync(servido, { recursive: true, force: true });
  console.log("bundle propio borrado");
};
process.on("exit", borraBundle);
for (const s of ["SIGINT", "SIGTERM"]) process.on(s, () => process.exit(130));

/** Un render de la API con las banderas de siempre y el disco vigilado. */
async function renderiza({ salida, props, frames, extra }) {
  const comp = await selectComposition({ serveUrl: servido, id: ID, inputProps: props, logLevel: "error", chromiumOptions: { gl: "angle" } });
  if (comp.durationInFrames !== TOTAL) throw new Error(`la composición dura ${comp.durationInFrames} f y la puerta dice ${TOTAL}`);
  const { cancelSignal, cancel } = makeCancelSignal();
  let parado = false;
  const vigia = setInterval(() => {
    if (libre() < LIBRE_MINIMO) {
      parado = true;
      console.error(`\n✖ quedan menos de ${gib(LIBRE_MINIMO)} GiB libres: se para el render (la memoria llena usa el disco como swap)`);
      cancel();
    }
  }, 3000);
  let ultimo = -1;
  try {
    await renderMedia({
      composition: comp,
      serveUrl: servido,
      inputProps: props,
      outputLocation: salida,
      frameRange: frames,
      overwrite: true,
      concurrency: 2,
      offthreadVideoCacheSizeInBytes: 300000000,
      chromiumOptions: { gl: "angle" },
      cancelSignal,
      logLevel: "warn",
      onProgress: ({ progress }) => {
        const d = Math.floor(progress * 10);
        if (d !== ultimo) {
          ultimo = d;
          process.stdout.write(`    ${d * 10} % · libres ${gib(libre())} GiB\n`);
        }
      },
      ...extra,
    });
  } catch (e) {
    if (parado) process.exit(75);
    throw e;
  } finally {
    clearInterval(vigia);
  }
}

/** Los tramos de un render mudo de vídeo y su unión sin recodificar. */
async function videoPorTramos(nombre, props, calidad) {
  const unido = path.join(TRABAJO, `${nombre}.mp4`);
  if (fs.existsSync(unido)) {
    console.log(`  ${path.relative(RAIZ, unido)} ya existe: se reutiliza`);
    return unido;
  }
  const tramos = [];
  for (let desde = 0, i = 1; desde < TOTAL; desde += TRAMO, i++) {
    const hasta = Math.min(TOTAL - 1, desde + TRAMO - 1);
    const t = path.join(TRABAJO, `${nombre}.tramo${i}.mp4`);
    console.log(`  tramo ${i}: f${desde}-f${hasta}`);
    await renderiza({
      salida: t,
      props,
      frames: [desde, hasta],
      extra: { codec: "h264", muted: true, imageFormat: "png", colorSpace: "bt709", crf: calidad.crf, x264Preset: calidad.preset },
    });
    tramos.push(t);
  }
  const lista = path.join(TRABAJO, `${nombre}.tramos.txt`);
  fs.writeFileSync(lista, tramos.map((t) => `file '${t.replace(/'/g, "'\\''")}'`).join("\n") + "\n");
  corre("ffmpeg", ["-nostdin", "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", lista, "-c", "copy", unido]);
  for (const t of tramos) fs.rmSync(t, { force: true });
  fs.rmSync(lista, { force: true });
  return unido;
}

const WAV = path.join(TRABAJO, "065-audio.wav");
if (solo.includes("audio")) {
  paso("3 · el audio del plan, en WAV");
  if (fs.existsSync(WAV)) console.log("  ya existe: se reutiliza");
  else await renderiza({ salida: WAV, props: { sinSubtitulos: false }, extra: { codec: "wav" } });
}

/** Vídeo del render + audio del WAV con el ffmpeg del sistema; etiquetas BT.709 en el VUI y en `colr`, sin recodificar el vídeo. */
function mezcla(video, salida) {
  corre("ffmpeg", [
    "-nostdin", "-y", "-v", "error", "-i", video, "-i", WAV, "-map", "0:v:0", "-map", "1:a:0",
    "-c:v", "copy", "-c:a", "aac", "-b:a", "320k",
    "-bsf:v", "h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1",
    "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709", "-color_range", "tv",
    "-movflags", "+write_colr+faststart", salida,
  ]);
}

if (solo.includes("master")) {
  paso("4 · el máster (CRF 12, x264 slower) en tramos");
  const v = await videoPorTramos("065-master", { sinSubtitulos: false }, { crf: 12, preset: "slower" });
  mezcla(v, path.join(FINALES, "065-recorrido.mp4"));
  console.log("  ✓ finales/065-recorrido.mp4");
}
if (solo.includes("crf16")) {
  paso("5 · la versión ligera (CRF 16, x264 slow) en tramos");
  const v = await videoPorTramos("065-crf16", { sinSubtitulos: false }, { crf: 16, preset: "slow" });
  mezcla(v, path.join(FINALES, "065-recorrido-crf16.mp4"));
  console.log("  ✓ finales/065-recorrido-crf16.mp4");
}
if (solo.includes("base")) {
  paso("6 · la base SIN subtítulos de la versión con ficha (CRF 6, x264 fast)");
  const v = await videoPorTramos("065-limpio", { sinSubtitulos: true }, { crf: 6, preset: "fast" });
  console.log(`  ✓ ${path.relative(RAIZ, v)}`);
}

paso("7 · comprobación");
for (const f of ["065-recorrido.mp4", "065-recorrido-crf16.mp4"]) {
  const p = path.join(FINALES, f);
  if (!fs.existsSync(p)) continue;
  console.log(`\n${f} (${(fs.statSync(p).size / 1e6).toFixed(1)} MB)`);
  console.log(captura("ffprobe", ["-v", "error", "-count_frames", "-select_streams", "v:0", "-show_entries", "stream=codec_name,profile,pix_fmt,width,height,r_frame_rate,nb_read_frames,color_range,color_space,color_primaries,color_transfer", "-of", "default=nw=1", p]).trim());
  console.log(captura("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1", p]).trim());
  const l = captura("ffmpeg", ["-nostdin", "-v", "info", "-i", p, "-vn", "-af", "ebur128=peak=true", "-f", "null", "-"]).split("\n").slice(-16).join("\n");
  console.log(`sonoridad: ${/\n\s+I:\s+(-?[\d.]+) LUFS/.exec(l)?.[1] ?? "?"} LUFS · pico ${/\n\s+Peak:\s+(-?[\d.]+) dBFS/.exec(l)?.[1] ?? "?"} dBFS`);
}
if (LIMPIAR) {
  fs.rmSync(WAV, { force: true });
  for (const n of ["065-master", "065-crf16"]) fs.rmSync(path.join(TRABAJO, `${n}.mp4`), { force: true });
  console.log("\nintermedios del máster y del CRF 16 borrados (la base y el WAV si se pidió, no)");
}
console.log("\n✅ hecho");
