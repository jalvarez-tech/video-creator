#!/usr/bin/env node
/**
 * exportar-final.mjs — la FINAL 1080 del 097 (Estrellitas097, 1920×1080, 30 fps), con la receta de R22.
 *
 *   node proyectos/097/herramientas/exportar-final.mjs <nombre> [--crf 12] [--preset slower] [--tramo 800] [--lufs -14]
 *   node proyectos/097/herramientas/exportar-final.mjs <nombre> --solo-audio      (rehace el audio sobre el vídeo ya exportado)
 *
 * Deja en `proyectos/097/finales/`:
 *   <nombre>.mp4          el máster: vídeo CRF 12 `slower` en BT.709 + audio masterizado (AAC 320k)
 *   <nombre>-ligera.mp4   para compartir (WhatsApp, redes): recodificado del máster a CRF 20, mismo audio
 *   <nombre>-mezcla.wav   la mezcla tal cual sale de Remotion, sin masterizar (para rehacer el audio)
 *
 * POR QUÉ ASÍ:
 *   · Vídeo por TRAMOS (`--frames=a-b --muted`) y unidos con `concat -c copy`: con `--image-format=png` cada
 *     fotograma pesa ≈ 3 MB y el Mac va en swap; un tramo que falla no tira los demás y el script RETOMA los
 *     tramos que ya están (memoria `remotion-final-1080-png-por-tramos`). Para si quedan < 4 GiB libres.
 *   · El audio, aparte (`--codec=wav`) y mezclado con el ffmpeg del sistema: el AAC que escribe Remotion suena
 *     43 ms tarde (memoria `final-remotion-audio-43ms-tarde`).
 *   · Masterizado: solo ganancia + limitador de picos hasta `--lufs` (defecto −14, lo que piden YouTube e Instagram)
 *     con el pico verdadero ≤ −1 dBTP. La mezcla aprobada en las pruebas (−19 LUFS) no se toca: sube entera.
 *   · Etiquetas BT.709 en las DOS capas (VUI y `colr`), como manda R22.
 *   · `--solo-audio`: cuando llegue la voz en off del usuario, cambia solo el audio; el vídeo del máster se copia.
 */
import fs from "node:fs";
import path from "node:path";
import { RAIZ, ejecutar, npx, log } from "../../../herramientas/comun.mjs";
import { cargaTs } from "../../../remotion/src/motor/metraje/revisar-metraje.mjs";

const args = process.argv.slice(2);
const nombre = args.find((a) => !a.startsWith("--") && !/^-?\d/.test(a));
if (!nombre) {
  console.error("uso: node proyectos/097/herramientas/exportar-final.mjs <nombre> [--crf 12] [--preset slower] [--tramo 800] [--lufs -14] [--solo-audio]");
  process.exit(2);
}
const opcion = (k, def) => {
  const i = args.indexOf(k);
  return i >= 0 ? args[i + 1] : def;
};
const CRF = Number(opcion("--crf", 12));
const PRESET = opcion("--preset", "slower");
const TRAMO = Number(opcion("--tramo", 800));
const LUFS = Number(opcion("--lufs", -14));
const SOLO_AUDIO = args.includes("--solo-audio");
const COMP = "Estrellitas097";
const { m } = await cargaTs({ m: "remotion/src/proyectos/097/metraje-097.ts" });
const DURACION = m.DURACION_097;

const REMOTION = path.join(RAIZ, "remotion");
const FINALES = path.join(RAIZ, "proyectos", "097", "finales");
const TMP = path.join(FINALES, `.tmp-${nombre}`);
fs.mkdirSync(TMP, { recursive: true });
const LOG = path.join(TMP, "exportar.log");
const anota = (titulo, r) => fs.appendFileSync(LOG, `\n===== ${titulo}\n${r.comando}\n${r.stdout}\n${r.stderr}\n`);
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
      process.exit(1);
    }
    const t0 = Date.now();
    corre(`tramo ${i}`, () =>
      npx(
        ["remotion", "render", "src/index.ts", COMP, sal, `--frames=${a}-${b}`, "--muted", `--crf=${CRF}`, `--x264-preset=${PRESET}`,
          "--color-space=bt709", "--image-format=png", "--concurrency=2", "--offthreadvideo-cache-size-in-bytes=300000000"],
        { cwd: REMOTION }
      )
    );
    const n = fotogramas(sal);
    if (n !== b - a + 1) {
      log.error(`tramo ${i + 1}: ${n} fotogramas, esperaba ${b - a + 1}`);
      process.exit(1);
    }
    log.ok(`tramo ${i + 1}/${tramos.length} (f${a}-f${b}) en ${((Date.now() - t0) / 60000).toFixed(1)} min · ${libresGiB().toFixed(1)} GiB libres`);
  }
  const lista = path.join(TMP, "lista.txt");
  fs.writeFileSync(lista, tramos.map((_, i) => `file 'tramo-${String(i).padStart(2, "0")}.mp4'`).join("\n") + "\n");
  corre("concat", () => ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", lista, "-c", "copy", VIDEO]));
  const n = fotogramas(VIDEO);
  if (n !== DURACION) {
    log.error(`el vídeo unido tiene ${n} fotogramas, esperaba ${DURACION}`);
    process.exit(1);
  }
  log.ok(`vídeo unido: ${n} fotogramas`);
} else {
  if (!fs.existsSync(MASTER)) {
    log.error(`--solo-audio necesita el máster ya exportado: ${path.relative(RAIZ, MASTER)}`);
    process.exit(1);
  }
  corre("vídeo del máster", () => ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", MASTER, "-map", "0:v:0", "-c", "copy", VIDEO]));
}

// ── 2. El audio: la mezcla de Remotion en WAV y su masterizado ──
const MEZCLA = path.join(FINALES, `${nombre}-mezcla.wav`);
corre("mezcla", () => npx(["remotion", "render", "src/index.ts", COMP, MEZCLA, "--codec=wav"], { cwd: REMOTION }));
const m0 = ebur(MEZCLA);
log.ok(`mezcla: ${m0.I} LUFS · pico ${m0.TP} dBTP`);
// Ganancia hasta el objetivo y limitador a −1,5 dBFS de pico de muestra (deja el verdadero ≤ −1). El limitador quita
// algo de sonoridad: se corrige una vez con lo medido. `latency=1`: sin él, el adelanto del limitador (= attack, 5 ms)
// retrasa TODO el audio 240 muestras respecto a la imagen (medido en la primera exportación, 2026-11-22).
const MASTER_WAV = path.join(TMP, "master.wav");
let ganancia = LUFS - m0.I;
let m1;
for (let intento = 0; intento < 3; intento++) {
  corre("masterizado", () =>
    ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", MEZCLA, "-af",
      `volume=${ganancia.toFixed(2)}dB,alimiter=limit=0.8414:attack=5:release=60:level=disabled:latency=1`, "-c:a", "pcm_s24le", MASTER_WAV])
  );
  m1 = ebur(MASTER_WAV);
  log.ok(`máster (+${ganancia.toFixed(2)} dB): ${m1.I} LUFS · pico ${m1.TP} dBTP`);
  if (Math.abs(m1.I - LUFS) <= 0.3) break;
  ganancia += LUFS - m1.I;
}
if (m1.TP > -1.0) log.aviso(`el pico verdadero (${m1.TP} dBTP) pasa de −1 dBTP`);

// ── 3. El máster: vídeo copiado + audio AAC 320k, BT.709 en las dos capas ──
const SALIDA = SOLO_AUDIO ? path.join(TMP, "master-nuevo.mp4") : MASTER;
corre("máster", () =>
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", VIDEO, "-i", MASTER_WAV, "-map", "0:v:0", "-map", "1:a:0", "-c:v", "copy",
    "-bsf:v", "h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1",
    "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709", "-color_range", "tv",
    "-c:a", "aac", "-b:a", "320k", "-ar", "48000", "-shortest", "-movflags", "+write_colr+faststart", SALIDA])
);
if (SOLO_AUDIO) fs.renameSync(SALIDA, MASTER);
log.ok(`máster: ${path.relative(RAIZ, MASTER)}`);

// ── 4. La ligera, para compartir ──
const LIGERA = path.join(FINALES, `${nombre}-ligera.mp4`);
corre("ligera", () =>
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", MASTER, "-map", "0:v:0", "-map", "0:a:0",
    "-vf", "setparams=color_primaries=bt709:color_trc=bt709:colorspace=bt709:range=tv",
    "-c:v", "libx264", "-crf", "20", "-preset", "slow", "-pix_fmt", "yuv420p",
    "-x264-params", "colorprim=bt709:transfer=bt709:colormatrix=bt709:range=tv",
    "-c:a", "copy", "-movflags", "+write_colr+faststart", LIGERA])
);
log.ok(`ligera: ${path.relative(RAIZ, LIGERA)}`);

// Los tramos y el WAV intermedio sobran: el máster lleva todo (y --solo-audio saca el vídeo de él).
fs.rmSync(TMP, { recursive: true, force: true });
log.ok("listo");
