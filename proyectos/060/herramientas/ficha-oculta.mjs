#!/usr/bin/env node
/**
 * ficha-oculta.mjs — la versión con ficha del 060, con la banda FUERA mientras salen las cifras de la infografía.
 *
 * Uso (desde la raíz del repo):
 *   node proyectos/060/herramientas/ficha-oculta.mjs <base-sin-subtitulos.mp4> --audio <final.mp4> [--salida salida.mp4] [--prueba]
 *
 * POR QUÉ NO USA `ficha.mjs video`. Ese script pone UNA ficha con dos fundidos (entra al inicio, se va antes de
 * la tarjeta) y en una pieza con infografía la ficha se pisa con las cifras (el usuario, 2026-10-22: «remueve el
 * texto de la ficha cuando salga las cifras»). Aquí la ficha es el MISMO PNG transparente que pinta `ficha.mjs png`
 * (misma Montserrat, mismo diseño, ya aprobado), pero con DOS tramos de alfa que no se solapan: un fundido de alfa
 * no puede volver a subir después de bajar a cero, así que son dos copias del PNG, cada una con sus fundidos.
 *
 * LOS FRAMES (30 fps; contra `metraje-060.ts` e `infografia-060.ts`):
 *   · cambio de plano a la cama, que abre la infografía ........ f876 (golpe de 17,5 dB)
 *   · primera cifra (tarifa) ................................... f887
 *   · última cifra (utilidad) se va ............................ f1406
 *   · disolvencia al CTA ....................................... f1410 → f1422
 *   · primera palabra de Isabella en el CTA .................... f1435
 *   · la tarjeta oscura (cierre) ............................... f1582 (negro exacto en el f1581)
 *   La ficha SALE en f858 → f870 (12 f = 0,4 s): acaba 6 f ANTES del corte del f876 y 17 f antes de la primera cifra,
 *   así que ni empieza ni acaba en un cambio de plano. VUELVE en f1426 → f1438: 4 f DESPUÉS de que acabe la
 *   disolvencia al CTA (nunca sobre la transición) y a tiempo de estar entera cuando Isabella lleva 3 f hablando.
 *   Al principio entra en 0,5 s y antes de la tarjeta se va (f1569 → f1581), como en `ficha.mjs`.
 *
 * El audio es el del final publicado, copiado tal cual. La salida lleva las etiquetas BT.709 completas: la base de
 * Remotion declara primarios y transferencia «unknown», `ficha.mjs` las heredaba así y las opciones `-color_*` de
 * salida no llegan al VUI con este filtro. Se fijan SIN recodificar con un remux (`h264_metadata` + `+write_colr`,
 * aprendizajes.md §9) y se comprueba que el framemd5 y el audio no cambian.
 *
 * `--prueba`: x264 `ultrafast` y CRF 23 (para comprobar los tiempos con el máster como base, sin esperar).
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const FPS = 30;
const FICHA_JSON = "proyectos/060/ficha.json";
const FICHA_MJS = ".claude/skills/ficha-luxur/scripts/ficha.mjs";

/** Todo en frames: nada de segundos con decimales que redondeen mal. */
const F = {
  entraFin: 15, // entra en 0,5 s desde el frame 0
  sale: { desde: 858, n: 12 },
  vuelve: { desde: 1426, n: 12 },
  seVaAntesDeLaTarjeta: { desde: 1569, n: 12 },
};

function corre(cmd, args, op = {}) {
  const r = spawnSync(cmd, args, { cwd: RAIZ, encoding: "utf8", maxBuffer: 1 << 26, ...op });
  if (r.status !== 0) throw new Error(`${cmd} ${args.slice(0, 4).join(" ")}…: ${(r.stderr || r.stdout || "").slice(-1500)}`);
  return r;
}

function sonda(video) {
  const r = corre("ffprobe", ["-v", "error", "-count_frames", "-show_entries", "stream=codec_type,width,height,r_frame_rate,nb_read_frames", "-of", "json", video]);
  const v = JSON.parse(r.stdout).streams.find((s) => s.codec_type === "video");
  return { ancho: v.width, alto: v.height, fps: v.r_frame_rate, fotogramas: Number(v.nb_read_frames) };
}

function opciones(argv) {
  const pos = [];
  const op = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const sig = argv[i + 1];
      if (sig === undefined || sig.startsWith("--")) op[a.slice(2)] = true;
      else { op[a.slice(2)] = sig; i++; }
    } else pos.push(a);
  }
  return { pos, op };
}

const { pos, op } = opciones(process.argv.slice(2));
const base = pos[0];
const audio = op.audio;
if (!base || !fs.existsSync(base) || typeof audio !== "string" || !fs.existsSync(audio)) {
  console.error("uso: node proyectos/060/herramientas/ficha-oculta.mjs <base.mp4> --audio <final.mp4> [--salida s.mp4] [--prueba]");
  process.exit(1);
}
const salida = typeof op.salida === "string" ? op.salida : "proyectos/060/finales/060-recorrido-ficha.mp4";
if (path.resolve(salida) === path.resolve(base) || path.resolve(salida) === path.resolve(audio)) throw new Error("la salida no puede pisar la entrada");

const b = sonda(base);
const a = sonda(audio);
if (b.ancho !== 1080 || b.alto !== 1920 || b.fps !== `${FPS}/1`) throw new Error(`${base}: ${b.ancho}×${b.alto} a ${b.fps}; la ficha del 060 es 1080×1920 a 30 fps`);
if (b.fotogramas !== a.fotogramas) throw new Error(`${path.basename(audio)} (${a.fotogramas} f) y ${path.basename(base)} (${b.fotogramas} f) no son la misma pieza`);
if (F.seVaAntesDeLaTarjeta.desde + F.seVaAntesDeLaTarjeta.n > b.fotogramas) throw new Error("el fundido de salida cae fuera del vídeo");

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "ficha-oculta-"));
const png = path.join(dir, "ficha.png");
corre("node", [FICHA_MJS, "png", FICHA_JSON, "--salida", png]);

const fade = (tipo, desde, n) => `fade=t=${tipo}:s=${desde}:n=${n}:alpha=1`;
// El PNG pasa a YUV con la matriz BT.709 del vídeo y se mezcla en 4:2:0, como en `ficha.mjs`.
const aYuv = "scale=out_color_matrix=bt709:out_range=tv,format=yuva420p";
const filtro =
  `[1:v]format=rgba,split[r1][r2];` +
  `[r1]${fade("in", 0, F.entraFin)},${fade("out", F.sale.desde, F.sale.n)},${aYuv}[fa];` +
  `[r2]${fade("in", F.vuelve.desde, F.vuelve.n)},${fade("out", F.seVaAntesDeLaTarjeta.desde, F.seVaAntesDeLaTarjeta.n)},${aYuv}[fb];` +
  `[0:v][fa]overlay=0:0:format=yuv420:shortest=1[t];` +
  `[t][fb]overlay=0:0:format=yuv420:shortest=1,format=yuv420p[v]`;

const parcial = salida.replace(/\.mp4$/i, "") + ".parcial.mp4";
fs.mkdirSync(path.dirname(path.resolve(salida)), { recursive: true });
corre("ffmpeg", [
  "-v", "error", "-y",
  "-i", base,
  "-loop", "1", "-framerate", `${FPS}`, "-i", png,
  "-i", audio,
  "-filter_complex", filtro,
  "-map", "[v]", "-map", "2:a",
  "-c:v", "libx264", "-preset", op.prueba ? "ultrafast" : "slow", "-crf", op.prueba ? "23" : "12", "-profile:v", "high", "-pix_fmt", "yuv420p",
  "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709", "-color_range", "tv",
  "-r", `${FPS}`, "-video_track_timescale", "90000",
  "-c:a", "copy",
  "-movflags", "+faststart+write_colr",
  parcial,
]);
const fuera = sonda(parcial);
if (fuera.fotogramas !== b.fotogramas) throw new Error(`${fuera.fotogramas} fotogramas y la base tiene ${b.fotogramas} (queda en ${parcial})`);

// Etiquetas BT.709 completas, sin recodificar: el flujo de vídeo no cambia ni un bit.
const etiquetado = salida.replace(/\.mp4$/i, "") + ".etiquetado.mp4";
corre("ffmpeg", [
  "-v", "error", "-y", "-i", parcial, "-map", "0", "-c", "copy",
  "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709", "-color_range", "tv",
  "-bsf:v", "h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1:video_full_range_flag=0",
  "-movflags", "+faststart+write_colr",
  etiquetado,
]);
const md5Video = (f) => corre("ffmpeg", ["-v", "error", "-i", f, "-map", "0:v:0", "-f", "md5", "-"]).stdout.trim();
const md5Audio = (f) => corre("ffmpeg", ["-v", "error", "-i", f, "-map", "0:a:0", "-f", "md5", "-"]).stdout.trim();
if (md5Video(parcial) !== md5Video(etiquetado) || md5Audio(audio) !== md5Audio(etiquetado)) throw new Error("el remux de etiquetas cambió el vídeo o el audio");
const color = JSON.parse(corre("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=color_space,color_transfer,color_primaries,color_range", "-of", "json", etiquetado]).stdout).streams[0];
if (color.color_space !== "bt709" || color.color_transfer !== "bt709" || color.color_primaries !== "bt709" || color.color_range !== "tv") throw new Error(`etiquetas de color: ${JSON.stringify(color)}`);
fs.rmSync(parcial, { force: true });
fs.renameSync(etiquetado, salida);
fs.rmSync(dir, { recursive: true, force: true });
console.log(`✅ ${salida} — ${fuera.fotogramas} f · ficha: entra 0-${F.entraFin} · sale ${F.sale.desde}-${F.sale.desde + F.sale.n} · vuelve ${F.vuelve.desde}-${F.vuelve.desde + F.vuelve.n} · se va ${F.seVaAntesDeLaTarjeta.desde}-${F.seVaAntesDeLaTarjeta.desde + F.seVaAntesDeLaTarjeta.n}`);
