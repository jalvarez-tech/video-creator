#!/usr/bin/env node
/**
 * normalizar.mjs — repone `remotion/public/rd-016/` desde el material original.
 *
 *   node proyectos/016/normalizar.mjs            (lee de proyectos/016/original/)
 *   node proyectos/016/normalizar.mjs --forzar   (rehace aunque ya exista la salida)
 *
 * POR QUÉ EXISTE. El material (diez clips de banco y una canción) no entra en
 * git: en el repo quedan esta receta y los sha256 de los originales. Con la
 * carpeta delante, un clon repone la pieza entera.
 *
 * LO QUE TRAÍAN, medido con ffprobe (R01):
 *   · ocho verticales 1080×1920 y dos 2160×3840, UNO apaisado 1920×1080
 *     (19109877, el catamarán): se escala a 2304 de alto y se recorta al centro;
 *   · fps de todo tipo: 24, 29,97, 30, 59,94 y 60 → todos a 30 exactos (la
 *     comp manda, §3a);
 *   · ninguno con matriz de rotación (R19);
 *   · UNO en HLG (13235242, los quads al atardecer, `arib-std-b67`): sin tone-map
 *     sale lavado (R21). Lo hace VideoToolbox (`scale_vt`), como en el 011-015;
 *     esa rama solo corre en macOS y lo dice si no;
 *   · 16111565 trae audio (el paseo entre palmeras): fuera, como todos.
 *
 * LA MÚSICA no se toca aquí más que para decodificarla a WAV (el MP3 arrastra
 * su propio retardo de códec, y el corte al golpe se hace a la muestra): el
 * nivel es una ganancia en el plan (`audio-016.ts`), medida sobre el tramo que
 * suena, no un loudnorm que le cambiaría la dinámica.
 *
 * Vídeo a 1296×2304 · 30 fps · sin audio: 1296 = 1080 × 1,2, el techo del
 * punch-in (criterio del 011).
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { ES_MAC, RAIZ, ejecutar, flags, log, relativa } from "../../herramientas/comun.mjs";

const ORIGEN = path.join(RAIZ, "proyectos", "016", "original");
const DESTINO = path.join(RAIZ, "remotion", "public", "rd-016");
const f = flags();

/** archivo · sha256 (8) del original. El encuadre sale de su proporción: vertical entero, apaisado recortado al centro. */
const CLIPS = [
  ["12324911_1080_1920_60fps.mp4", "700eeab7"],
  ["12498515_2160_3840_30fps.mp4", "987977e9"],
  ["12992103_1080_1920_30fps.mp4", "e9646475"],
  ["13007144_2160_3840_60fps.mp4", "e9a5e6ee"],
  ["13235242_1080_1920_60fps.mp4", "ae8d2cfe"],
  ["14770266_1080_1920_30fps.mp4", "5c7307ae"],
  ["15308557_1080_1920_24fps.mp4", "c0e3ee94"],
  ["16111565-hd_1080_1920_30fps.mp4", "0f8da742"],
  ["16837285_1080_1920_30fps.mp4", "a36f3bd1"],
  ["19109877-hd_1920_1080_30fps.mp4", "f25dba4b"],
];
const MUSICA = ["Glenn Morrison - Contact.mp3", "musica-016", "8c9ee553"];

const sha8 = (archivo) => crypto.createHash("sha256").update(fs.readFileSync(archivo)).digest("hex").slice(0, 8);
const sondea = (archivo, entradas) =>
  ejecutar("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", entradas, "-of", "default=nw=1:nk=1", archivo], { check: true }).stdout.trim();

if (!fs.existsSync(ORIGEN)) {
  log.error(`no existe ${relativa(ORIGEN)}: copia ahí el material del encargo`);
  process.exit(1);
}
fs.mkdirSync(DESTINO, { recursive: true });

// Identidad ANTES de gastar minutos de codificación: otro archivo con el mismo
// nombre montaría un vídeo distinto en silencio.
let malos = 0;
for (const [nombre, esperado] of [...CLIPS, [MUSICA[0], MUSICA[2]]]) {
  const abs = path.join(ORIGEN, nombre);
  if (!fs.existsSync(abs)) {
    log.error(`falta ${nombre}`);
    malos++;
    continue;
  }
  const real = sha8(abs);
  if (real !== esperado) {
    log.aviso(`${nombre}: sha256 ${real}, se esperaba ${esperado}`);
    malos++;
  }
}
if (malos) {
  log.error("el material no es el del plan: revísalo antes de normalizar");
  process.exit(1);
}

for (const [nombre] of CLIPS) {
  const entrada = path.join(ORIGEN, nombre);
  const salida = path.join(DESTINO, nombre.replace(/\.[^.]+$/, ".mp4"));
  if (fs.existsSync(salida) && !f.forzar) {
    log.info(`${path.basename(salida)} ya está`);
    continue;
  }
  const [ancho, alto] = sondea(entrada, "stream=width,height").split(/\s+/).map(Number);
  const trc = sondea(entrada, "stream=color_transfer");
  const apaisado = ancho > alto;
  // Vertical: a 1296×2304. Apaisado: a 2304 de alto y recorte centrado.
  const encuadre = apaisado ? "scale=-2:2304:flags=lanczos,crop=1296:2304" : "scale=1296:2304:flags=lanczos";
  const comunes = ["-an", "-fps_mode", "cfr", "-r", "30", "-c:v", "libx264", "-preset", "slow", "-crf", "17", "-pix_fmt", "yuv420p",
    "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-movflags", "+faststart", salida];
  let args;
  if (trc === "arib-std-b67" || trc === "smpte2084") {
    if (!ES_MAC) {
      log.error(`${nombre} es HDR (${trc}) y su tone-map va con VideoToolbox: esta rama solo corre en macOS`);
      process.exit(1);
    }
    args = ["-nostdin", "-y", "-v", "error", "-hwaccel", "videotoolbox", "-hwaccel_output_format", "videotoolbox_vld", "-i", entrada,
      "-vf", `scale_vt=color_matrix=bt709:color_primaries=bt709:color_transfer=bt709,hwdownload,format=nv12,${encuadre},format=yuv420p`, ...comunes];
  } else {
    args = ["-nostdin", "-y", "-v", "error", "-i", entrada, "-vf", `${encuadre},format=yuv420p`, ...comunes];
  }
  ejecutar("ffmpeg", args, { check: true });
  log.ok(`${path.basename(salida)}${apaisado ? " (apaisado → recorte centrado)" : ""}${trc === "arib-std-b67" ? " (HLG → BT.709)" : ""}`);
}

const wav = path.join(DESTINO, `${MUSICA[1]}.wav`);
if (!fs.existsSync(wav) || f.forzar) {
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", path.join(ORIGEN, MUSICA[0]), "-map", "0:a:0", "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "2", wav], { check: true });
  log.ok(`${path.basename(wav)} (la canción entera, decodificada)`);
}
log.ok(`repuesto en ${relativa(DESTINO)}`);
