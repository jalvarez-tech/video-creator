#!/usr/bin/env node
/**
 * normalizar.mjs — repone `remotion/public/recorrido-026/` desde el material original.
 *
 *   node proyectos/026/normalizar.mjs            (lee de proyectos/026/original/)
 *   node proyectos/026/normalizar.mjs --forzar   (rehace aunque ya exista la salida)
 *   node proyectos/026/normalizar.mjs --solo RC14,HK1   (solo esos códigos)
 *
 * El 026 es el CUARTO reel de One Living (Envigado), V10 del registro de reels (el primero de otra propiedad fue el 022). Misma receta que
 * `proyectos/022/normalizar.mjs`, que cuenta el porqué de cada paso; el material es el mismo (26 clips) y hay DOS ramas de
 * codificación en el mismo reparto. La música es «ByErik – desolate (Slowed)». Solo se normaliza el material que la V10 puede usar: la mitad MD2, RC14 (su voz es el HOOK y el CTA: va como «toma») y los 16 recorridos.
 *
 * DE DÓNDE SALEN LOS ARCHIVOS. Se copiaron del SSD del rodaje
 * (`/Volumes/SSK SSD/Work/Propiedades Luxur/Apartamento - One Living - Envigado/Videos/`, 4 carpetas: `1 Hooks`,
 * `2 Mitad`, `4 recorrido` —en minúscula—, `5 Cta`; NO hay `3 Dron`) a `proyectos/026/original/` con el CÓDIGO
 * del catálogo (`catalogo-material.md`) y sin espacios. La columna «origen» de abajo dice qué archivo es cada uno
 * (HK1-HK4, MD1-MD3, CT1-CT3 por su número; RC01-RC16 por el orden alfabético del nombre, en locale C).
 *
 * LO QUE TRAÍAN, medido con ffprobe (R01, R19, R21): todos 3840×2160 con `rotation=-90` → pantalla vertical.
 *   · HLG (`arib-std-b67`, ≈ 29,97 fps; hook4 a 30): las 10 tomas de Isabella y `recorrido caminando` (RC14).
 *     Sin tone-map salen lavados (R21): lo hace VideoToolbox (`scale_vt`) y la rotación también (`transpose_vt`).
 *     Esa rama SOLO corre en macOS.
 *   · SDR BT.709 a 30 fps: los OTROS 15 recorridos. Tone-mapearlos los estropearía: solo se rota y se escala.
 * Todo se conforma a 30 fps (29,97 → 30, `-fps_mode cfr`) y a 1296×2304 (1080 × 1,2, el techo del punch-in).
 *
 * LA VOZ de cada toma de Isabella (micro de solapa mono) sale en WAV PCM 48 kHz mono, SIN filtro ni nivel (R29);
 * WAV y no AAC porque el AAC arrastra 1026 muestras de priming que desplazan la voz ~21 ms contra su imagen.
 * Los recorridos no llevan audio en la pieza (traen un ruido de ambiente que no se usa).
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { ES_MAC, RAIZ, ejecutar, flags, log, relativa } from "../../herramientas/comun.mjs";

const ORIGEN = path.join(RAIZ, "proyectos", "026", "original");
const DESTINO = path.join(RAIZ, "remotion", "public", "recorrido-026");
const f = flags();

/**
 * clase · archivo en original/ · nombre de salida (sin extensión) · sha256 (8) del original · origen en el SSD.
 *   toma       Isabella a cámara → MP4 mudo + WAV con su voz
 *   recorrido  planos de la casa → MP4 mudo (HLG o SDR: se mide)
 */
const MATERIAL = [
  ["toma", "MD2.MOV", "md2", "e7d2bd25", "2 Mitad/medio2.MOV"],
  ["recorrido", "RC01.MOV", "rc01", "4968beba", "4 recorrido/balcon - paneo.MOV"],
  ["recorrido", "RC02.MOV", "rc02", "0d7de150", "4 recorrido/bano habitacion principal.MOV"],
  ["recorrido", "RC03.MOV", "rc03", "3f172170", "4 recorrido/bano habitacion secundaria, paneo hacia habitacion.MOV"],
  ["recorrido", "RC04.MOV", "rc04", "3eb30b61", "4 recorrido/bano habitacion secundaria.MOV"],
  ["recorrido", "RC05.MOV", "rc05", "3e909917", "4 recorrido/cocina, paneo a sala y balcon.MOV"],
  ["recorrido", "RC06.MOV", "rc06", "64602ed9", "4 recorrido/cocina, sala, balcon.MOV"],
  ["recorrido", "RC07.MOV", "rc07", "5654291a", "4 recorrido/habitacion principal - entrando.MOV"],
  ["recorrido", "RC08.MOV", "rc08", "8356ef40", "4 recorrido/habitacion principal - paneo 2.MOV"],
  ["recorrido", "RC09.MOV", "rc09", "df509f34", "4 recorrido/habitacion principal - paneo.MOV"], // 63 s: clip largo, se mina por ventanas
  ["recorrido", "RC10.MOV", "rc10", "1805d754", "4 recorrido/habitacion principal.MOV"],
  ["recorrido", "RC11.MOV", "rc11", "49940e3f", "4 recorrido/habitacion secundaria - paneo.MOV"],
  ["recorrido", "RC12.MOV", "rc12", "d26f8e96", "4 recorrido/habitacion secundaria - zoom in ventanal.MOV"],
  ["recorrido", "RC13.MOV", "rc13", "7b340785", "4 recorrido/habitacion secundaria.MOV"],
  ["toma", "RC14.MOV", "rc14", "c44931a1", "4 recorrido/recorrido caminando.MOV"], // 50 s, HLG: lleva a Isabella hablando (hook 1,82-6,31 s y CTA 45,22-49,35 s): va como «toma» para sacar su voz
  ["recorrido", "RC15.MOV", "rc15", "9bf2fc96", "4 recorrido/sala, habitacion secundaria, vestier.MOV"],
  ["recorrido", "RC16.MOV", "rc16", "6eea17c2", "4 recorrido/vestier habitacion principal.MOV"],
];

/** archivo en original/ · salida · sha256 (8) · origen (fuera del repo: la biblioteca de música de Luxur). */
const MUSICA = ["musica-desolate.mp3", "musica-026", "74195082", "Music/ByErik ヵ - desolate (Slowed).mp3"];

/**
 * LA CADENA DE LA VOZ TRATADA (ver `vozTratada`, abajo, por qué y qué mide cada paso). Rev. 1 de la V10, 2026-10-08. Las tres tomas miden −22,3 (hook de RC14), −22,7 (CTA de RC14) y −24,2 LUFS (MD2) crudas, con
 * picos de −3,1, −5,1 y −1,5 dBTP; +16 dB tras el compresor las deja en −15,1 · −14,4 · −14,6 LUFS con el pico real en −2,5 dBTP (la receta de la V12 y la V9: `proyectos/028/normalizar.mjs`, `proyectos/025/normalizar.mjs`).
 */
const VOZ_TRATADA = [
  "highpass=f=100:poles=2",
  "agate=threshold=0.0056:ratio=2:range=0.25:attack=5:release=200",
  "acompressor=threshold=0.0501:ratio=3:attack=4:release=120:knee=6",
  "volume=16dB",
  "alimiter=limit=0.75:attack=1:release=60:level=disabled:latency=1",
].join(",");

/** Dónde se apaga la voz tratada de cada toma: [segundo de la fuente en que empieza el fundido de salida, duración en s]. Justo tras la última palabra (RC14 «contáctame» acaba a 49,35 s; MD2, a 4,34 s); el hook de RC14 no necesita corte (su cola está a −53 dBFS). */
const VOZ_FIN = { rc14: [49.38, 0.05], md2: [4.4, 0.04] };

const sha8 = (archivo) => crypto.createHash("sha256").update(fs.readFileSync(archivo)).digest("hex").slice(0, 8);
const sondea = (archivo, entradas, selector = "v:0") =>
  ejecutar("ffprobe", ["-v", "error", "-select_streams", selector, "-show_entries", entradas, "-of", "default=nw=1:nk=1", archivo], { check: true }).stdout.trim();

if (!fs.existsSync(ORIGEN)) {
  log.error(`no existe ${relativa(ORIGEN)}: copia ahí el material del rodaje (ver la columna «origen» de este archivo)`);
  process.exit(1);
}
fs.mkdirSync(DESTINO, { recursive: true });

const solo = typeof f.solo === "string" ? new Set(f.solo.toLowerCase().split(",")) : null;
const lista = MATERIAL.filter(([, , salida]) => !solo || solo.has(salida));

// Identidad ANTES de gastar minutos de codificación: otro archivo con el mismo nombre montaría un vídeo distinto en silencio.
let malos = 0;
for (const [, archivo, , esperado] of [...lista, ...(solo ? [] : [["", MUSICA[0], "", MUSICA[2]]])]) {
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

/** La rotación de PANTALLA del archivo (R19): −90 en un iPhone vertical. */
const rotacionDe = (abs) => Number(sondea(abs, "stream_side_data=rotation").split(/\s+/)[0] || 0);

function video(clase, archivo, salidaNombre) {
  const entrada = path.join(ORIGEN, archivo);
  const salida = path.join(DESTINO, `${salidaNombre}.mp4`);
  if (fs.existsSync(salida) && !f.forzar) {
    log.info(`${path.basename(salida)} ya está`);
    return;
  }
  const trc = sondea(entrada, "stream=color_transfer");
  const rot = rotacionDe(entrada);
  const hdr = trc === "arib-std-b67" || trc === "smpte2084";
  // La duración del CONTENEDOR manda: RC16 trae 61 fotogramas (2,03 s) pero el stream declara un fps medio de 17,4 y ffmpeg, en cfr,
  // rellenaba hasta 105 fotogramas (3,5 s) repitiendo el último. Con `-t` el clip sale con los fotogramas que tiene.
  const dur = ejecutar("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", entrada], { check: true }).stdout.trim();
  const comunes = [
    "-an", "-t", dur, "-fps_mode", "cfr", "-r", "30", "-c:v", "libx264", "-preset", "slow", "-crf", "17", "-pix_fmt", "yuv420p",
    "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-movflags", "+faststart", salida,
  ];
  let args;
  if (hdr) {
    if (!ES_MAC) {
      log.error(`${archivo} es HDR (${trc}) y su tone-map va con VideoToolbox: esta rama solo corre en macOS`);
      process.exit(1);
    }
    const giro = { [-90]: "transpose_vt=dir=clock", 90: "transpose_vt=dir=cclock", 0: "" }[rot];
    if (giro === undefined) {
      log.error(`${archivo}: rotación no prevista (${rot})`);
      process.exit(1);
    }
    args = [
      "-nostdin", "-y", "-v", "error", "-hwaccel", "videotoolbox", "-hwaccel_output_format", "videotoolbox_vld", "-noautorotate", "-i", entrada,
      "-vf", `scale_vt=color_matrix=bt709:color_primaries=bt709:color_transfer=bt709${giro ? `,${giro}` : ""},hwdownload,format=p010le,scale=1296:2304:flags=lanczos,format=yuv420p`,
      ...comunes,
    ];
  } else {
    const giro = { [-90]: "transpose=clock", 90: "transpose=cclock", 0: "" }[rot];
    if (giro === undefined) {
      log.error(`${archivo}: rotación no prevista (${rot})`);
      process.exit(1);
    }
    args = ["-nostdin", "-y", "-v", "error", "-noautorotate", "-i", entrada, "-vf", `${giro ? `${giro},` : ""}scale=1296:2304:flags=lanczos,format=yuv420p`, ...comunes];
  }
  ejecutar("ffmpeg", args, { check: true });
  log.ok(`${path.basename(salida)} (${clase}${hdr ? " · HLG → BT.709" : " · SDR"} · rotación ${rot})`);
}

function voz(archivo, salidaNombre) {
  const salida = path.join(DESTINO, `${salidaNombre}.wav`);
  if (fs.existsSync(salida) && !f.forzar) return;
  // Sin tocar: solo se decodifica a PCM. Ni filtro ni nivel (la ganancia vive en el plan).
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", path.join(ORIGEN, archivo), "-map", "0:a:0", "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "1", salida], { check: true });
  log.ok(`${path.basename(salida)} (la voz tal cual, mono 48 kHz)`);
}

/**
 * LA VOZ TRATADA, la que suena en la pieza (rev. 1, pedido del usuario tras la final, 2026-10-08: «necesito que la voz cuando habla Isabella tenga más decibeles sin saturar»). Es una excepción a R29 (una ganancia por
 * toma y nada más), por encargo: sola, la ganancia no llega (−22/−24 LUFS a −15 con picos de −1,5 a −5 dBTP daría hasta +7 dBTP). En este orden:
 *   highpass 100 Hz   los golpes graves del micro de solapa y los pasos; una voz femenina no baja de ahí
 *   agate             puerta SUAVE (−12 dB como mucho, ratio 2, umbral −45 dBFS): el ambiente entre frases no sube con la compresión
 *   acompressor       3:1 desde −26 dBFS, ataque 4 ms, relevo 120 ms, rodilla 6 dB: acerca el pico al nivel medio
 *   volume +16 dB     la ganancia hasta ≈ −15 LUFS
 *   alimiter          techo −2,5 dBFS (sin nivelado automático, `latency=1`: compensa el ms de lookahead y la voz no se desfasa): lo que el compresor no alcanza; el pico real queda en −2,5 dBTP
 * El WAV crudo sigue ahí para medir la voz (R29: `limites-voz.py`, `onsets-voz.py`).
 */
function vozTratada(salidaNombre) {
  const entrada = path.join(DESTINO, `${salidaNombre}.wav`);
  const salida = path.join(DESTINO, `${salidaNombre}-voz.wav`);
  if (fs.existsSync(salida) && !f.forzar) return;
  // La compresión y la ganancia suben también lo que hay DESPUÉS de la última palabra: en RC14, tras «contáctame» (voz hasta 49,35 s) el micro de solapa da golpes graves de −22 a −38 dBFS (49,45-49,84 s) que la cadena
  // dejaba a −18/−28 dBFS (+6,8 dB), y en MD2 el ruido tras la frase sube 9 dB. Se corta con un fundido de 50-60 ms justo tras la última palabra (la V12 apagó la voz 3 f después de «contáctame»).
  const fin = VOZ_FIN[salidaNombre];
  const cadena = fin ? `${VOZ_TRATADA},afade=t=out:st=${fin[0]}:d=${fin[1]}` : VOZ_TRATADA;
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", entrada, "-af", cadena, "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "1", salida], { check: true });
  log.ok(`${path.basename(salida)} (la voz tratada: graves, puerta suave, compresión 3:1, +16 dB y limitador a −2,5 dBFS${fin ? `; apagada a los ${fin[0]} s` : ""})`);
}

for (const [clase, archivo, salida] of lista) {
  video(clase, archivo, salida);
  if (clase === "toma") {
    voz(archivo, salida);
    vozTratada(salida);
  }
}
// LA TARJETA DEL CIERRE: un negro liso 1296×2304 (el color al que funde la imagen). Nada se congela.
const tarjeta = path.join(DESTINO, "cierre-oscuro.png");
if (!solo && (!fs.existsSync(tarjeta) || f.forzar)) {
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-f", "lavfi", "-i", "color=c=0x000000:s=1296x2304:r=1", "-frames:v", "1", "-pix_fmt", "rgb24", tarjeta], { check: true });
  log.ok(`${path.basename(tarjeta)} (negro liso 1296×2304, la tarjeta del cierre)`);
}

// LA MÚSICA se decodifica ENTERA a WAV estéreo de 48 kHz y NADA MÁS (ni loudnorm): el MP3 arrastra su retardo de códec y el corte
// al golpe se hace a la muestra sobre el WAV. El nivel es una ganancia del plan, medida sobre el tramo que suena.
const wav = path.join(DESTINO, `${MUSICA[1]}.wav`);
if (!solo && (!fs.existsSync(wav) || f.forzar)) {
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", path.join(ORIGEN, MUSICA[0]), "-map", "0:a:0", "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "2", wav], { check: true });
  log.ok(`${path.basename(wav)} (la canción entera, decodificada)`);
}
log.ok(`repuesto en ${relativa(DESTINO)}`);
