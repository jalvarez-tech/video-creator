#!/usr/bin/env node
/**
 * normalizar.mjs — repone `remotion/public/mas-097/` desde el material original del 097.
 *
 *   node proyectos/097/normalizar.mjs            (lee de proyectos/097/original/)
 *   node proyectos/097/normalizar.mjs --forzar   (rehace aunque ya exista la salida)
 *   node proyectos/097/normalizar.mjs --solo hz17,vt07   (solo esos nombres de salida)
 *
 * PIEZA 097 · «Lo más bonito de un regalo» · MAS Estrellitas 2026 (Fundación MAS). Plan y timeline:
 * proyectos/097/artefactos/. Mapas del material: proyectos/097/material/analisis-videos.md.
 * El material es de la fundación y sale MENORES: no entra en git. En el repo quedan esta receta y los sha256 (8) de los originales.
 *
 * MEDIDO ANTES DE TOCAR NADA (R01, R19, R21; `material/medidas-*.json`):
 *   · horizontales (HZ) y verticales (VT): iPhone, HEVC 10 bit HLG (`arib-std-b67`), 30 o 29,97 fps, AAC (+ una pista de audio
 *     ESPACIAL APAC que ffmpeg no decodifica: el audio se saca SIEMPRE con `-map 0:a:0`). Rotación: HZ 0 o −180 (HZ20 y HZ28), VT −90.
 *   · dron (DR): DJI Mini 4 Pro, BT.709 SDR, 29,97 fps (30000/1001), sin audio.
 *   · FT35: el JPG de Lightroom de la foto de grupo (sin GPS: los HEIC lo llevan y NUNCA se publican).
 *
 * SALIDA, todo a 30 fps constantes, H.264 BT.709, sin audio en el vídeo:
 *   · HZ y DR a 2304×1296 (1920 × 1,2: el techo de un acercamiento sin reescalar hacia arriba).
 *   · VT RECORTADOS a 16:9 (02-layout §3): la franja de todo el ancho y 1216 de alto (el 32 % del alto) que empieza en la
 *     fracción `y` del alto que dice MATERIAL, elegida mirando el principio, la mitad y el final del tramo que usa el plan
 *     (de la cabeza a la cintura). Sale a 2160×1216, sin reescalar. Un mismo clip con dos franjas da dos salidas (vt06a, vt06b).
 *   · la VOZ de cada clip que habla: WAV mono 48 kHz, TAL CUAL (la ganancia es del plan: `vocesDeCortes` con el LUFS medido).
 *   · la MÚSICA («Yeshua (Versión Piano)», elegida por el usuario el 2026-11-22): WAV 48 kHz estéreo, SIN normalizar.
 *   · FT35 a 2400 px de ancho, JPG sRGB, sin EXIF.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { ES_MAC, RAIZ, ejecutar, flags, log, relativa } from "../../herramientas/comun.mjs";

const ORIGEN = path.join(RAIZ, "proyectos", "097", "original");
const DESTINO = path.join(RAIZ, "remotion", "public", "mas-097");
const f = flags();
const solo = typeof f.solo === "string" ? new Set(f.solo.toLowerCase().split(",")) : null;

/**
 * clase · archivo en original/ · salida · sha256 (8) · ¿voz? · [solo VT] y de la franja (fracción del alto en que EMPIEZA).
 * Los códigos HZ/VT/DR son los de los mapas.
 */
const MATERIAL = [
  // DR02 y DR03 (rev. 4, montaje sobre la pista entera): el grupo que saluda al dron y el pasillo de niñas, antes del vuelo de DR04.
  ["dron", "dron/DJI_20261120152640_0353_D.MP4", "dr02", "97512262", false],
  ["dron", "dron/DJI_20261120152811_0354_D.MP4", "dr03", "2208c3d5", false],
  ["dron", "dron/DJI_20261120152852_0356_D.MP4", "dr04", "127d8f07", false],
  ["dron", "dron/DJI_20261120152914_0357_D.MP4", "dr05", "a43e2664", false],
  ["dron", "dron/DJI_20261120153110_0360_D.MP4", "dr07", "c67a77dc", false],
  ["hz", "horizontal/IMG_5494.MOV", "hz01", "c38b5040", true],
  ["hz", "horizontal/IMG_5498.MOV", "hz05", "72c29471", true],
  ["hz", "horizontal/IMG_5499.MOV", "hz06", "ac74b46d", true],
  ["hz", "horizontal/IMG_5506.MOV", "hz08", "695ead74", true],
  ["hz", "horizontal/IMG_5509.MOV", "hz10", "a82ce80a", true],
  ["hz", "horizontal/IMG_5513.MOV", "hz14", "8e405a15", true],
  ["hz", "horizontal/IMG_5514.MOV", "hz15", "3b1c7c55", true],
  ["hz", "horizontal/IMG_5515.MOV", "hz16", "d95363db", true],
  ["hz", "horizontal/IMG_5516.MOV", "hz17", "d34e8d11", true],
  ["hz", "horizontal/IMG_5518.MOV", "hz19", "bfcc1a42", true],
  ["hz", "horizontal/IMG_5523.MOV", "hz20", "38de1086", true],
  ["hz", "horizontal/IMG_5562.MOV", "hz28", "d3afa406", true],
  ["hz", "horizontal/IMG_5588.MOV", "hz32", "f398774d", true],
  // VT06: P25 la del recogido (cabeza al 28-40 %) y P26 la de trenzas (32-48 %), dos franjas.
  ["vt", "vertical/IMG_5485.MOV", "vt06a", "64c922a0", true, 0.22],
  ["vt", "vertical/IMG_5485.MOV", "vt06b", "64c922a0", false, 0.28],
  ["vt", "vertical/IMG_5486.MOV", "vt07", "ceba8067", true, 0.27],
  ["vt", "vertical/IMG_5489.MOV", "vt10", "b6af2740", true, 0.22],
  ["vt", "vertical/IMG_5490.MOV", "vt11", "c5dbcf8b", true, 0.3],
  ["vt", "vertical/IMG_5492.MOV", "vt13", "3db70c70", true, 0.3],
  ["vt", "vertical/IMG_5602.MOV", "vt36", "2137b227", false, 0.34],
  // VT33 solo da su voz («Gracias por acompañarme en este viaje.»): su imagen no entra.
  ["audio", "vertical/IMG_5589.MOV", "vt33", "72b4f64c", true],
];
const FOTO = ["fotos/IMG_5586.JPG", "ft35", "bc7c34ec"];
const MUSICA = [path.join(RAIZ, "archivos", "musica", "Yeshua (Versión Piano).mp3"), "musica-yeshua", "7bd0eb6f"];

const sha8 = (archivo) => crypto.createHash("sha256").update(fs.readFileSync(archivo)).digest("hex").slice(0, 8);
const sondea = (archivo, entradas, selector = "v:0") =>
  ejecutar("ffprobe", ["-v", "error", "-select_streams", selector, "-show_entries", entradas, "-of", "default=nw=1:nk=1", archivo], { check: true }).stdout.trim();

if (!fs.existsSync(ORIGEN)) {
  log.error(`no existe ${relativa(ORIGEN)}: copia ahí el material (Downloads/MAS/Videos y Fotos; ver material/analisis-videos.md §8)`);
  process.exit(1);
}
fs.mkdirSync(DESTINO, { recursive: true });

// Identidad ANTES de gastar minutos de codificación: otro archivo con el mismo nombre montaría otro vídeo en silencio.
const lista = MATERIAL.filter(([, , salida]) => !solo || solo.has(salida));
let malos = 0;
const vistos = new Set();
for (const [ruta, esperado] of [
  ...lista.map((m) => [path.join(ORIGEN, m[1]), m[3]]),
  ...(!solo || solo.has(FOTO[1]) ? [[path.join(ORIGEN, FOTO[0]), FOTO[2]]] : []),
  ...(!solo || solo.has(MUSICA[1]) ? [[MUSICA[0], MUSICA[2]]] : []),
]) {
  if (vistos.has(ruta)) continue;
  vistos.add(ruta);
  if (!fs.existsSync(ruta)) {
    log.error(`falta ${relativa(ruta)}`);
    malos++;
    continue;
  }
  const real = sha8(ruta);
  if (real !== esperado) {
    log.aviso(`${relativa(ruta)}: sha256 ${real}, se esperaba ${esperado}`);
    malos++;
  }
}
if (malos) {
  log.error("el material no es el del plan: revísalo antes de normalizar");
  process.exit(1);
}

const rotacionDe = (abs) => Number(sondea(abs, "stream_side_data=rotation").split(/\s+/).filter(Boolean)[0] || 0);
const comunes = (salida) => [
  "-an", "-fps_mode", "cfr", "-r", "30", "-c:v", "libx264", "-preset", "medium", "-crf", "16", "-pix_fmt", "yuv420p",
  "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-movflags", "+faststart", salida,
];

function video(clase, archivo, nombre, y) {
  const entrada = path.join(ORIGEN, archivo);
  const salida = path.join(DESTINO, `${nombre}.mp4`);
  if (fs.existsSync(salida) && !f.forzar) {
    log.info(`${nombre}.mp4 ya está`);
    return;
  }
  const rot = rotacionDe(entrada);
  // Los DJI van a 29,97: con `-r 30` a secas se repite UN fotograma cada ≈ 33 s (memoria `dji-2997-fotograma-repetido`). `setpts=PTS*1000/1001` los deja a 30 exactos, 1 a 1, y en el plan el `desde` va × 1000/1001.
  const ntsc = clase === "dron" && sondea(entrada, "stream=r_frame_rate") === "30000/1001";
  const pts = ntsc ? "setpts=PTS*1000/1001," : "";
  let vf;
  let hw = [];
  if (clase === "dron") {
    if (rot !== 0) {
      log.error(`${archivo}: rotación no prevista en un dron (${rot})`);
      process.exit(1);
    }
    vf = `${pts}scale=2304:1296:flags=lanczos,format=yuv420p`;
  } else {
    if (!ES_MAC) {
      log.error(`${archivo} es HLG y su tone-map va con VideoToolbox: esta rama solo corre en macOS`);
      process.exit(1);
    }
    hw = ["-hwaccel", "videotoolbox", "-hwaccel_output_format", "videotoolbox_vld"];
    const tono = "scale_vt=color_matrix=bt709:color_primaries=bt709:color_transfer=bt709";
    if (clase === "hz") {
      // R19: la rotación se QUEMA. −180 (HZ20, HZ28) se da la vuelta en software tras bajar de la GPU.
      const giro = { 0: "", [-180]: ",hflip,vflip", 180: ",hflip,vflip" }[rot];
      if (giro === undefined) {
        log.error(`${archivo}: rotación no prevista (${rot})`);
        process.exit(1);
      }
      vf = `${tono},hwdownload,format=p010le${giro},scale=2304:1296:flags=lanczos,format=yuv420p`;
    } else {
      if (rot !== -90) {
        log.error(`${archivo}: un VT del iPhone debería venir a −90 (${rot})`);
        process.exit(1);
      }
      if (typeof y !== "number" || y < 0 || y > 1 - 1216 / 3840) {
        log.error(`${archivo}: la franja 16:9 necesita su y (0-0,683) en MATERIAL`);
        process.exit(1);
      }
      const y0 = Math.round((3840 * y) / 2) * 2;
      vf = `${tono},transpose_vt=dir=clock,hwdownload,format=p010le,crop=2160:1216:0:${y0},format=yuv420p`;
    }
  }
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", ...hw, "-noautorotate", "-i", entrada, "-vf", vf, ...comunes(salida)], { check: true });
  log.ok(`${nombre}.mp4 (${clase}${clase === "dron" ? " · SDR · ×1000/1001" : " · HLG → BT.709"} · rotación ${rot}${typeof y === "number" ? ` · franja 16:9 desde el ${Math.round(y * 100)} %` : ""})`);
}

function voz(archivo, nombre) {
  const salida = path.join(DESTINO, `${nombre}.wav`);
  if (fs.existsSync(salida) && !f.forzar) return;
  // `-map 0:a:0`: la pista AAC. La espacial (APAC) no se decodifica y, si ffmpeg la elige, falla.
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", path.join(ORIGEN, archivo), "-map", "0:a:0", "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "1", salida], { check: true });
  log.ok(`${nombre}.wav (la voz tal cual, mono 48 kHz)`);
}

for (const [clase, archivo, nombre, , conVoz, y] of lista) {
  if (clase !== "audio") video(clase, archivo, nombre, y);
  if (conVoz) voz(archivo, nombre.replace(/[ab]$/, ""));
}

if (!solo || solo.has(FOTO[1])) {
  const salida = path.join(DESTINO, `${FOTO[1]}.jpg`);
  if (!fs.existsSync(salida) || f.forzar) {
    // Sin EXIF (`-map_metadata -1`): ninguna foto de la casa sale con metadatos.
    ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", path.join(ORIGEN, FOTO[0]), "-map_metadata", "-1", "-vf", "scale=2400:-2:flags=lanczos", "-q:v", "2", salida], { check: true });
    log.ok(`${FOTO[1]}.jpg (la foto de grupo, 2400 px, sin EXIF)`);
  }
}

// El QR de la página de donación (lo dio el usuario el 2026-11-22; descodificado: https://www.fundamas.org/donaciones/).
// Vive versionado en material/referencias/ y se copia tal cual: un QR no se reescala ni se recomprime.
const QR = [path.join(RAIZ, "proyectos", "097", "material", "referencias", "qr-donaciones.png"), "qr-donaciones", "bbd5d994"];
if (!solo || solo.has(QR[1])) {
  const salida = path.join(DESTINO, `${QR[1]}.png`);
  if (sha8(QR[0]) !== QR[2]) {
    log.error(`${relativa(QR[0])}: no es el QR del plan (sha256 ${sha8(QR[0])}, se esperaba ${QR[2]})`);
    process.exit(1);
  }
  fs.copyFileSync(QR[0], salida);
  log.ok(`${QR[1]}.png (el QR de fundamas.org/donaciones, tal cual)`);
}

// Los logos de MAS y Casa Sobre la Roca (los dio el usuario el 2026-11-22), en índigo liso como en el cartel:
// sobre el papel amarillo, el blanco de CSR y los círculos verde-lima de MAS no se ven (`herramientas/logos.py`).
const LOGOS = [
  [path.join(RAIZ, "proyectos", "097", "material", "referencias", "logo-mas.webp"), "dfe73985"],
  [path.join(RAIZ, "proyectos", "097", "material", "referencias", "logo-csr.png"), "a8645faa"],
];
if (!solo || solo.has("logos")) {
  for (const [ruta, esperado] of LOGOS) {
    if (sha8(ruta) !== esperado) {
      log.error(`${relativa(ruta)}: no es el logo del plan (sha256 ${sha8(ruta)}, se esperaba ${esperado})`);
      process.exit(1);
    }
  }
  ejecutar("uv", ["run", "--with", "pillow", "--with", "numpy", "proyectos/097/herramientas/logos.py", LOGOS[0][0], LOGOS[1][0], DESTINO], { check: true, cwd: RAIZ });
  log.ok("logo-mas-indigo.png y logo-csr-indigo.png (índigo liso, la forma del original)");
}

// El símbolo de Bancolombia para la cuenta del paso 2 (lo dio el usuario el 2026-11-22): un SVG, tal cual.
const BANCO = [path.join(RAIZ, "proyectos", "097", "material", "referencias", "logo-bancolombia.svg"), "logo-bancolombia", "8e4511ae"];
if (!solo || solo.has(BANCO[1])) {
  if (sha8(BANCO[0]) !== BANCO[2]) {
    log.error(`${relativa(BANCO[0])}: no es el logo del plan (sha256 ${sha8(BANCO[0])}, se esperaba ${BANCO[2]})`);
    process.exit(1);
  }
  fs.copyFileSync(BANCO[0], path.join(DESTINO, `${BANCO[1]}.svg`));
  log.ok(`${BANCO[1]}.svg (el símbolo de Bancolombia, tal cual)`);
}

if (!solo || solo.has(MUSICA[1])) {
  const salida = path.join(DESTINO, `${MUSICA[1]}.wav`);
  if (!fs.existsSync(salida) || f.forzar) {
    ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", MUSICA[0], "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "2", salida], { check: true });
    log.ok(`${MUSICA[1]}.wav (Yeshua, piano, 48 kHz estéreo, sin normalizar)`);
  }
}
log.ok(`listo: ${relativa(DESTINO)}`);
