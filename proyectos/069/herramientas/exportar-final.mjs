#!/usr/bin/env node
/**
 * exportar-final.mjs — la FINAL del 069 «Unidos por Botswana»: render de Remotion en BT.709 (R22), audio alineado y etiquetas de color en las dos capas.
 *
 *   node proyectos/069/herramientas/exportar-final.mjs              (exige que la puerta pase con --final: las 5 locuciones y los datos de aporte)
 *   node proyectos/069/herramientas/exportar-final.mjs --sin-voces  (exporta lo que hay aunque falten las voces y los datos: sale marcada «SIN-VOCES»)
 *
 * Pasos (los de `manuales/edicion-video/reglas.md` R22 y la memoria `final-remotion-audio-43ms-tarde`):
 *   1. la puerta del plan (`revisar-069.mjs`, con `--final` salvo `--sin-voces`);
 *   2. el MASTER de vídeo: `remotion render … --crf=16 --x264-preset=slow --color-space=bt709 --image-format=png` a 1080×1920, SIN audio y EN TRAMOS de 400 f (se unen sin recodificar): cada fotograma
 *      PNG a 1080×1920 con el grano del look pesa ≈ 2,9 MB y Remotion los guarda todos en el tmp hasta codificar; los 2081 f de una vez son ≈ 6 GB y en un disco casi lleno (el 2026-10-28 había 11 GB libres)
 *      se queda sin sitio. En tramos de 400 f el pico es ≈ 1,2 GB de PNG más el bundle;
 *   3. el AUDIO del mismo plan en WAV (`--codec=wav`): el AAC del render llega ≈ 43 ms (1,3 f) tarde por el relleno del codificador;
 *   4. la MEZCLA sin recodificar el vídeo: el vídeo del master + el audio del WAV con el ffmpeg del sistema (AAC 320k, ya alineado) y las etiquetas BT.709 en el VUI y en el átomo `colr`;
 *   5. la comprobación: etiquetas, duración, sonoridad y pico.
 *
 * POR QUÉ `--concurrency=2` Y LA CACHÉ DE VÍDEO ACOTADA: con la memoria llena (32 GB con OrbStack, mutagen, Chrome…), cinco pestañas de Chrome y la caché de `<OffthreadVideo>` empujan al sistema a usar swap, que
 * vive en el MISMO disco: en un tramo de 80 f con la serenata el disco bajó 2,5 GB (y a los 300 f de otro intento, de 6,8 a 0,6 GB libres) aunque los PNG del tmp pesaban 0,2 GB. Con `--concurrency=2
 * --offthreadvideo-cache-size-in-bytes=300000000` el mismo tramo bajó 0,5 GB. Además el script vigila el disco cada 3 s y PARA el render si quedan menos de 1 GiB libres.
 *
 * Todo sale en `proyectos/069/finales/` (ignorada por git). Se lanza desde la raíz del repo; usa `npx` de `remotion/`.
 */
import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const SIN_VOCES = process.argv.includes("--sin-voces");
const SALIDA = path.join(RAIZ, "proyectos", "069", "finales");
const NOMBRE = SIN_VOCES ? "botswana-069-final-SIN-VOCES" : "botswana-069-final";
const MASTER = path.join(SALIDA, `${NOMBRE}.master.mp4`);
const TRAMO = 400; // fotogramas por tramo del render (ver arriba; con 4,9 GB libres, 600 f dejaban ≈ 1 GB de margen)
const AUDIO = path.join(SALIDA, `${NOMBRE}.audio.wav`);
const FINAL = path.join(SALIDA, `${NOMBRE}.mp4`);
const NPX = process.platform === "win32" ? "npx.cmd" : "npx";
const RENDER_ECONOMICO = ["--concurrency=2", "--offthreadvideo-cache-size-in-bytes=300000000"];
const LIBRE_MINIMO = 1024 ** 3; // se para el render si quedan menos de 1 GiB libres en el disco

/** El espacio libre del disco de la salida. */
const libre = () => {
  const e = fs.statfsSync(SALIDA);
  return e.bavail * e.bsize;
};
/** Lanza un render y vigila el disco: si baja de `LIBRE_MINIMO` lo para antes de que el sistema se quede sin sitio. Devuelve el código de salida. */
function correVigilado(cmd, args, opciones = {}) {
  return new Promise((resolve) => {
    const hijo = spawn(cmd, args, { stdio: "inherit", cwd: RAIZ, ...opciones });
    const vigia = setInterval(() => {
      if (libre() < LIBRE_MINIMO) {
        console.error("\n✖ quedan menos de 1 GiB libres en el disco: se para el render (la memoria llena usa el disco como swap). Libera espacio o cierra programas y repite; los temporales de Remotion están en $TMPDIR.");
        clearInterval(vigia);
        hijo.kill("SIGTERM");
        resolve(75);
      }
    }, 3000);
    hijo.on("exit", (codigo) => {
      clearInterval(vigia);
      resolve(codigo ?? 1);
    });
  });
}
async function renderiza(args) {
  const estado = await correVigilado(NPX, ["remotion", "render", "src/index.ts", "Botswana069", ...args, ...RENDER_ECONOMICO], { cwd: path.join(RAIZ, "remotion") });
  if (estado !== 0) {
    console.error(`✖ falló el render (${estado})`);
    process.exit(estado);
  }
}

const paso = (titulo) => console.log(`\n━━ ${titulo}`);
function corre(cmd, args, opciones = {}) {
  const r = spawnSync(cmd, args, { stdio: "inherit", cwd: RAIZ, ...opciones });
  if (r.status !== 0) {
    console.error(`✖ falló: ${cmd} ${args.join(" ").slice(0, 160)}`);
    process.exit(r.status ?? 1);
  }
}
function captura(cmd, args) {
  const r = spawnSync(cmd, args, { encoding: "utf8", cwd: RAIZ });
  return `${r.stdout ?? ""}${r.stderr ?? ""}`;
}

fs.mkdirSync(SALIDA, { recursive: true });

paso(`1 · la puerta del plan ${SIN_VOCES ? "(sin --final: faltan las voces y los datos de aporte, y lo asumes)" : "(--final)"}`);
const puerta = spawnSync("node", ["proyectos/069/revisar-069.mjs", ...(SIN_VOCES ? [] : ["--final"])], { cwd: RAIZ, encoding: "utf8" });
process.stdout.write(puerta.stdout ?? "");
process.stderr.write(puerta.stderr ?? "");
if (puerta.status !== 0) {
  console.error("✖ la puerta del plan no pasa: no se exporta");
  process.exit(puerta.status ?? 1);
}
const TOTAL = Number(/·\s*(\d+) f \(/.exec(puerta.stdout ?? "")?.[1]);
if (!Number.isInteger(TOTAL) || TOTAL < 1) {
  console.error("✖ no encuentro la duración (frames) en la salida de la puerta");
  process.exit(1);
}

paso(`2 · el master de vídeo (BT.709, CRF 16, preset slow, 1080×1920) en tramos de ${TRAMO} f · ${TOTAL} f en total`);
const tramos = [];
for (let desde = 0, i = 1; desde < TOTAL; desde += TRAMO, i++) {
  const hasta = Math.min(TOTAL - 1, desde + TRAMO - 1);
  const tramo = path.join(SALIDA, `${NOMBRE}.tramo${i}.mp4`);
  console.log(`\n  tramo ${i}: f${desde}-f${hasta}`);
  await renderiza([tramo, `--frames=${desde}-${hasta}`, "--muted", "--crf=16", "--x264-preset=slow", "--color-space=bt709", "--image-format=png"]);
  tramos.push(tramo);
}
const lista = path.join(SALIDA, `${NOMBRE}.tramos.txt`);
fs.writeFileSync(lista, tramos.map((t) => `file '${t.replace(/'/g, "'\\''")}'`).join("\n") + "\n");
corre("ffmpeg", ["-nostdin", "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", lista, "-c", "copy", MASTER]);
for (const t of tramos) fs.rmSync(t, { force: true });
fs.rmSync(lista, { force: true });

paso("3 · el audio del mismo plan, en WAV");
await renderiza([AUDIO, "--codec=wav"]);

paso("4 · la mezcla: el vídeo del master + el audio del WAV, con las etiquetas BT.709 en las dos capas");
corre("ffmpeg", [
  "-nostdin", "-y", "-v", "error", "-i", MASTER, "-i", AUDIO, "-map", "0:v:0", "-map", "1:a:0",
  "-c:v", "copy", "-c:a", "aac", "-b:a", "320k",
  "-bsf:v", "h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1",
  "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709", "-color_range", "tv",
  "-movflags", "+write_colr+faststart", FINAL,
]);
fs.rmSync(MASTER, { force: true });
fs.rmSync(AUDIO, { force: true });

paso("5 · la comprobación");
console.log(captura("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=codec_name,profile,pix_fmt,width,height,r_frame_rate,color_range,color_space,color_primaries,color_transfer:format=duration,size,bit_rate", "-of", "default=nw=1", FINAL]).trim());
console.log(captura("ffprobe", ["-v", "error", "-select_streams", "a:0", "-show_entries", "stream=codec_name,sample_rate,channels,bit_rate", "-of", "default=nw=1", FINAL]).trim());
const lufs = captura("ffmpeg", ["-nostdin", "-v", "info", "-i", FINAL, "-vn", "-af", "ebur128=peak=true", "-f", "null", "-"]).split("\n").slice(-16).join("\n");
console.log(`sonoridad: ${/\n\s+I:\s+(-?[\d.]+) LUFS/.exec(lufs)?.[1] ?? "?"} LUFS · pico ${/\n\s+Peak:\s+(-?[\d.]+) dBFS/.exec(lufs)?.[1] ?? "?"} dBFS`);
console.log(`\n✅ ${path.relative(RAIZ, FINAL)}${SIN_VOCES ? "\n⚠️  SIN las locuciones y con el rótulo «[Información oficial para realizar aportes]»: NO es para publicar." : ""}`);
