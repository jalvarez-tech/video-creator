#!/usr/bin/env node
/**
 * normalizar.mjs — repone `remotion/public/mas-106/`: el material 16:9 del 106 «En últimas noticias» (la versión 16:9
 * del vídeo vertical 105, Fundación MAS · MAS Estrellitas 2026).
 *
 *   node proyectos/106/normalizar.mjs                 (lee de proyectos/097/original/ y de archivos/musica/)
 *   node proyectos/106/normalizar.mjs --forzar        (rehace aunque ya exista la salida)
 *   node proyectos/106/normalizar.mjs --solo vt18,hz22
 *
 * LA RECETA 16:9 DEL 097 (`proyectos/097/normalizar.mjs`), copiada y no importada: el 097 es de otro vídeo.
 *   · HZ y DR, ENTEROS a 2304×1296 (1920 × 1,2: el techo de un acercamiento sin reescalar hacia arriba). HZ22 viene
 *     girado 180°: se quema (R19). El dron va a 29,97: `setpts=PTS*1000/1001` antes de `-r 30` (en el plan, × 1000/1001).
 *   · VT RECORTADOS a 16:9: la franja de todo el ancho y 1216 de alto (el 32 % del alto) que empieza en la fracción `y`
 *     del alto, elegida mirando fotogramas con rejilla de los tramos que usa el plan (2026-11-23). Sale a 2160×1216.
 *   · HLG → BT.709 con VideoToolbox (R21). La VOZ de cada clip que habla: WAV mono 48 kHz TAL CUAL, con `-map 0:a:0`
 *     (la pista espacial APAC no se decodifica). La MÚSICA (*Yeshua*), ENTERA a WAV 48 kHz estéreo, sin normalizar.
 *   · El papel, los logos y el símbolo de Bancolombia se leen de `mas-097/` (solo lectura), como hace el 100.
 * El material es de la fundación y salen MENORES: no entra en git. En el repo quedan esta receta y los sha256 (8).
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { ES_MAC, RAIZ, ejecutar, flags, log, relativa } from "../../herramientas/comun.mjs";

const ORIGEN = path.join(RAIZ, "proyectos", "097", "original");
const DESTINO = path.join(RAIZ, "remotion", "public", "mas-106");
const f = flags();
const solo = typeof f.solo === "string" ? new Set(f.solo.toLowerCase().split(",")) : null;

/** clase · archivo en original/ · salida · sha256 (8) · ¿voz? · [solo VT] y de la franja (fracción del alto donde EMPIEZA) · por qué. */
const MATERIAL = [
  ["hz", "horizontal/IMG_5550.MOV", "hz22", "80a49d3f", true, null, "la reportera en selfi con la casa detrás: en 16:9 caben las dos"],
  ["vt", "vertical/IMG_5554.MOV", "vt21", "23d06792", true, 0.36, "las dos de la puerta: de la cabeza a las rodillas, y caben cuando corren hacia cámara"],
  ["vt", "vertical/IMG_5569.MOV", "vt29", "4b334544", true, 0.1, "la reportera del micro de botón y las cabezas del corro"],
  ["vt", "vertical/IMG_5544.MOV", "vt18", "762d8f85", true, 0.15, "la entrevista del banco: las caras van del 20 al 40 % del alto, con el micro"],
  ["vt", "vertical/IMG_5482.MOV", "vt03", "ef2d8264", true, 0.3, "las dos junto al árbol de la terraza: de la cabeza a la cintura, con el árbol"],
  ["hz", "horizontal/IMG_5497.MOV", "hz04", "92a2d960", true, null, "la pregunta de la cualidad y sus tres respuestas: la que pregunta y la que responde, en el mismo cuadro"],
  ["hz", "horizontal/IMG_5500.MOV", "hz07", "153cdfee", true, null, "la que pregunta responde a cámara"],
  ["hz", "horizontal/IMG_5507.MOV", "hz09", "ca68fa5e", true, null, "el lema sentadas al pie del tobogán azul"],
  ["vt", "vertical/IMG_5558.MOV", "vt23", "b9feaa82", true, 0.25, "«¡Feliz Navidad para todos!»: la del centro y la que habla, en el borde derecho"],
  ["dron", "dron/DJI_20261120152615_0352_D.MP4", "dr01", "f8d9bcc0", false, null, "el grupo entero se junta en la baranda y saluda al dron (la despedida)"],
];
const MUSICA = ["Yeshua (Versión Piano).mp3", "musica-yeshua", "7bd0eb6f"];

const sha8 = (archivo) => crypto.createHash("sha256").update(fs.readFileSync(archivo)).digest("hex").slice(0, 8);
const quiere = (nombre) => !solo || solo.has(nombre);
const sondea = (abs, entradas) =>
  ejecutar("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", entradas, "-of", "default=nw=1:nk=1", abs]).stdout.trim();

fs.mkdirSync(DESTINO, { recursive: true });
let malos = 0;
const comprobar = (ruta, esperado) => {
  if (!fs.existsSync(ruta)) {
    log.error(`falta ${relativa(ruta)}`);
    malos++;
  } else if (sha8(ruta) !== esperado) {
    log.error(`${relativa(ruta)}: sha256 ${sha8(ruta)}, se esperaba ${esperado}`);
    malos++;
  }
};
for (const [, archivo, nombre, sha] of MATERIAL) if (quiere(nombre)) comprobar(path.join(ORIGEN, archivo), sha);
const MUSICA_ABS = path.join(RAIZ, "archivos", "musica", MUSICA[0]);
if (quiere(MUSICA[1])) comprobar(MUSICA_ABS, MUSICA[2]);
if (malos) {
  log.error("el material no es el del plan: revísalo antes de normalizar");
  process.exit(1);
}

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
  const rot = Number(sondea(entrada, "stream_side_data=rotation").split(/\s+/).filter(Boolean)[0] || 0);
  let vf;
  let hw = [];
  if (clase === "dron") {
    if (rot !== 0) {
      log.error(`${archivo}: rotación no prevista en un dron (${rot})`);
      process.exit(1);
    }
    const ntsc = sondea(entrada, "stream=r_frame_rate") === "30000/1001";
    vf = `${ntsc ? "setpts=PTS*1000/1001," : ""}scale=2304:1296:flags=lanczos,format=yuv420p`;
  } else {
    if (!ES_MAC) {
      log.error(`${archivo} es HLG y su tone-map va con VideoToolbox: esta rama solo corre en macOS`);
      process.exit(1);
    }
    hw = ["-hwaccel", "videotoolbox", "-hwaccel_output_format", "videotoolbox_vld"];
    const tono = "scale_vt=color_matrix=bt709:color_primaries=bt709:color_transfer=bt709";
    if (clase === "hz") {
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
        log.error(`${archivo}: la franja 16:9 necesita su y (0-0,683)`);
        process.exit(1);
      }
      const y0 = Math.round((3840 * y) / 2) * 2;
      vf = `${tono},transpose_vt=dir=clock,hwdownload,format=p010le,crop=2160:1216:0:${y0},format=yuv420p`;
    }
  }
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", ...hw, "-noautorotate", "-i", entrada, "-vf", vf, ...comunes(salida)], { check: true });
  log.ok(`${nombre}.mp4 (${clase}${clase === "dron" ? " · SDR · ×1000/1001" : " · HLG → BT.709"} · rotación ${rot}${typeof y === "number" ? ` · franja 16:9 desde el ${Math.round(y * 100)} %` : " · entero"})`);
}

function voz(archivo, nombre) {
  const salida = path.join(DESTINO, `${nombre}.wav`);
  if (fs.existsSync(salida) && !f.forzar) return;
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", path.join(ORIGEN, archivo), "-map", "0:a:0", "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "1", salida], { check: true });
  log.ok(`${nombre}.wav (la voz tal cual, mono 48 kHz)`);
}

for (const [clase, archivo, nombre, , conVoz, y] of MATERIAL) {
  if (!quiere(nombre)) continue;
  video(clase, archivo, nombre, y);
  if (conVoz) voz(archivo, nombre);
}
if (quiere(MUSICA[1])) {
  const wav = path.join(DESTINO, `${MUSICA[1]}.wav`);
  if (!fs.existsSync(wav) || f.forzar) {
    ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", MUSICA_ABS, "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "2", wav], { check: true });
    log.ok(`${MUSICA[1]}.wav (la pista entera, 48 kHz estéreo, sin normalizar)`);
  } else log.info(`${MUSICA[1]}.wav ya está`);
}
log.ok(`listo: ${relativa(DESTINO)}`);
