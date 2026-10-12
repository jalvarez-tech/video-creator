#!/usr/bin/env node
/**
 * normalizar.mjs — repone `remotion/public/recorrido-028/` desde el material original.
 *
 *   node proyectos/028/normalizar.mjs            (lee de proyectos/028/original/)
 *   node proyectos/028/normalizar.mjs --forzar   (rehace aunque ya exista la salida)
 *
 * El 028 es el SEXTO reel de One Living (Envigado), V12 del registro de reels, y el primero hecho con UNA SOLA TOMA: `recorrido caminando.MOV`
 * (RC14), entera, acelerada en los tránsitos (pedido del usuario, 2026-10-08). Misma receta que `proyectos/027/normalizar.mjs` (y la del 022, que
 * cuenta el porqué de cada paso), reducida a lo que esta pieza usa: RC14 y la canción.
 *
 * DE DÓNDE SALEN LOS ARCHIVOS (columna «origen» de `original/ORIGEN.tsv`):
 *   · RC14.MOV = `4 recorrido/recorrido caminando.MOV` del SSD del rodaje
 *     (`/Volumes/SSK SSD/Work/Propiedades Luxur/Apartamento - One Living - Envigado/Videos/`), copiado con su código del catálogo
 *     (`proyectos/022/catalogo-material.md`).
 *   · musica-street-level.mp3 = `archivos/musica/Daniel Armand — Street Level Sessions on the Green.mp3` (la biblioteca del repo).
 *
 * LO QUE TRAE RC14, medido con ffprobe (R01, R19, R21): 3840×2160 con `rotation=-90` (pantalla vertical), HLG (`arib-std-b67`, BT.2020),
 * 29,97 fps, 49,84 s, 1494 fotogramas, y el audio del micro de solapa de Isabella (mono). Sin tone-map sale lavado (R21): lo hace VideoToolbox
 * (`scale_vt`) y la rotación también (`transpose_vt`). Esa rama SOLO corre en macOS. Se conforma a 30 fps (29,97 → 30, `-fps_mode cfr`: un
 * fotograma repetido hacia los 33 s, el mismo que en la V10 y la V11) y a 1296×2304 (1080 × 1,2, el techo del punch-in).
 *
 * LA VOZ (el micro de solapa) sale en WAV PCM 48 kHz mono, SIN filtro ni nivel (R29): la ganancia vive en el plan. WAV y no AAC porque el AAC
 * arrastra 1027 muestras de priming que desplazan la voz ~21 ms contra su imagen.
 *
 * LA MÚSICA se decodifica ENTERA a WAV estéreo de 48 kHz y nada más (ni loudnorm): el MP3 arrastra su retardo de códec y el golpe se corta a la
 * muestra sobre el WAV. El nivel es una ganancia del plan, medida sobre el tramo que suena.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { ES_MAC, RAIZ, ejecutar, flags, log, relativa } from "../../herramientas/comun.mjs";

const ORIGEN = path.join(RAIZ, "proyectos", "028", "original");
const DESTINO = path.join(RAIZ, "remotion", "public", "recorrido-028");
const f = flags();

/** archivo en original/ · nombre de salida (sin extensión) · sha256 (8) del original · origen. */
const TOMA = ["RC14.MOV", "rc14", "c44931a1", "4 recorrido/recorrido caminando.MOV"];
const MUSICA = ["musica-street-level.mp3", "musica-028", "e428a369", "archivos/musica/Daniel Armand — Street Level Sessions on the Green.mp3"];

/** La cadena de la voz tratada (ver abajo, en la voz de RC14, por qué y qué mide cada paso). */
const VOZ_TRATADA = [
  "highpass=f=100:poles=2",
  "agate=threshold=0.0056:ratio=2:range=0.25:attack=5:release=200",
  "acompressor=threshold=0.0501:ratio=3:attack=4:release=120:knee=6",
  "volume=16dB",
  "alimiter=limit=0.75:attack=1:release=60:level=disabled",
].join(",");

const sha8 = (archivo) => crypto.createHash("sha256").update(fs.readFileSync(archivo)).digest("hex").slice(0, 8);
const sondea = (archivo, entradas, selector = "v:0") =>
  ejecutar("ffprobe", ["-v", "error", "-select_streams", selector, "-show_entries", entradas, "-of", "default=nw=1:nk=1", archivo], { check: true }).stdout.trim();

if (!fs.existsSync(ORIGEN)) {
  log.error(`no existe ${relativa(ORIGEN)}: copia ahí el material (ver la cabecera de este archivo)`);
  process.exit(1);
}
fs.mkdirSync(DESTINO, { recursive: true });

// Identidad ANTES de gastar minutos de codificación: otro archivo con el mismo nombre montaría un vídeo distinto en silencio.
let malos = 0;
for (const [archivo, , esperado] of [TOMA, MUSICA]) {
  const abs = path.join(ORIGEN, archivo);
  if (!fs.existsSync(abs)) {
    log.error(`falta ${archivo}`);
    malos++;
    continue;
  }
  const real = sha8(abs);
  if (real !== esperado) {
    log.aviso(`${archivo}: sha256 ${real}, se esperaba ${esperado}`);
    malos++;
  }
}
if (malos) {
  log.error("el material no es el del plan: revísalo antes de normalizar");
  process.exit(1);
}

/* ── RC14: el vídeo, mudo ─────────────────────────────────────────────────── */
{
  const [archivo, nombre] = TOMA;
  const entrada = path.join(ORIGEN, archivo);
  const salida = path.join(DESTINO, `${nombre}.mp4`);
  if (fs.existsSync(salida) && !f.forzar) log.info(`${path.basename(salida)} ya está`);
  else {
    const trc = sondea(entrada, "stream=color_transfer");
    const rot = Number(sondea(entrada, "stream_side_data=rotation").split(/\s+/)[0] || 0);
    if (trc !== "arib-std-b67") {
      log.error(`${archivo}: se esperaba HLG (arib-std-b67) y trae ${trc}; la receta es la de una toma HDR del iPhone`);
      process.exit(1);
    }
    if (!ES_MAC) {
      log.error(`${archivo} es HDR y su tone-map va con VideoToolbox: esta rama solo corre en macOS`);
      process.exit(1);
    }
    if (rot !== -90) {
      log.error(`${archivo}: rotación ${rot}; se esperaba −90 (iPhone en vertical)`);
      process.exit(1);
    }
    const dur = ejecutar("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", entrada], { check: true }).stdout.trim();
    ejecutar(
      "ffmpeg",
      [
        "-nostdin", "-y", "-v", "error", "-hwaccel", "videotoolbox", "-hwaccel_output_format", "videotoolbox_vld", "-noautorotate", "-i", entrada,
        "-vf", "scale_vt=color_matrix=bt709:color_primaries=bt709:color_transfer=bt709,transpose_vt=dir=clock,hwdownload,format=p010le,scale=1296:2304:flags=lanczos,format=yuv420p",
        "-an", "-t", dur, "-fps_mode", "cfr", "-r", "30", "-c:v", "libx264", "-preset", "slow", "-crf", "17", "-pix_fmt", "yuv420p",
        "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-movflags", "+faststart", salida,
      ],
      { check: true }
    );
    log.ok(`${path.basename(salida)} (HLG → BT.709 · rotación ${rot} · 30 fps · 1296×2304)`);
  }
  // La voz tal cual: solo se decodifica a PCM.
  const wav = path.join(DESTINO, `${nombre}.wav`);
  if (!fs.existsSync(wav) || f.forzar) {
    ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", entrada, "-map", "0:a:0", "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "1", wav], { check: true });
    log.ok(`${path.basename(wav)} (la voz tal cual, mono 48 kHz)`);
  }
  // LA VOZ TRATADA, la que suena en la pieza (pedido del usuario tras la final, 2026-10-08: «necesito que la voz cuando habla Isabella tenga más
  // decibeles sin saturar»). Es una excepción a R29 (una ganancia por toma y nada más), por encargo: sola, la ganancia no llega. La voz de RC14
  // tiene ~19 dB entre su pico y su nivel medio (−22,4 LUFS con picos de −3,1 dBTP en «Hay apartamentos»): subirla a −15 LUFS, el nivel de la
  // música sola, con ganancia sola la llevaría a +4,3 dBTP. Por eso, en este orden y medido (`proyectos/028/aprendizajes.md` §7):
  //   highpass 100 Hz   los golpes graves del micro de solapa (la cola tras «contáctame», casi toda < 150 Hz) y los pasos; una voz femenina no baja de ahí
  //   agate             puerta SUAVE (−12 dB como mucho, ratio 2, umbral −45 dBFS): el ambiente entre frases no sube con la compresión
  //   acompressor       3:1 desde −26 dBFS, ataque 4 ms, relevo 120 ms, rodilla 6 dB: acerca el pico al nivel medio
  //   volume +16 dB     la ganancia hasta ≈ −15 LUFS
  //   alimiter          techo −2,5 dBFS (sin nivelado automático): lo que el compresor no alcanza; el pico real queda en −2,5 dBTP
  // Resultado medido: hook −15,0 LUFS y CTA −14,3 LUFS, los dos con pico real −2,5 dBTP; los pasos antes del CTA, a −58 LUFS.
  const tratada = path.join(DESTINO, `${nombre}-voz.wav`);
  if (!fs.existsSync(tratada) || f.forzar) {
    ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", wav, "-af", VOZ_TRATADA, "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "1", tratada], { check: true });
    log.ok(`${path.basename(tratada)} (la voz tratada: graves, puerta suave, compresión 3:1, +16 dB y limitador a −2,5 dBFS)`);
  }
}

/* ── La tarjeta del cierre: un negro liso 1296×2304 (el color al que funde la imagen). Nada se congela. ── */
const tarjeta = path.join(DESTINO, "cierre-oscuro.png");
if (!fs.existsSync(tarjeta) || f.forzar) {
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-f", "lavfi", "-i", "color=c=0x000000:s=1296x2304:r=1", "-frames:v", "1", "-pix_fmt", "rgb24", tarjeta], { check: true });
  log.ok(`${path.basename(tarjeta)} (negro liso 1296×2304, la tarjeta del cierre)`);
}

/* ── La canción, entera ───────────────────────────────────────────────────── */
const wavMusica = path.join(DESTINO, `${MUSICA[1]}.wav`);
if (!fs.existsSync(wavMusica) || f.forzar) {
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", path.join(ORIGEN, MUSICA[0]), "-map", "0:a:0", "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "2", wavMusica], { check: true });
  log.ok(`${path.basename(wavMusica)} (la canción entera, decodificada)`);
}
log.ok(`repuesto en ${relativa(DESTINO)}`);
