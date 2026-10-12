#!/usr/bin/env node
/**
 * normalizar.mjs — repone `remotion/public/recorrido-027/` desde el material original.
 *
 *   node proyectos/027/normalizar.mjs            (lee de proyectos/027/original/)
 *   node proyectos/027/normalizar.mjs --forzar   (rehace aunque ya exista la salida)
 *   node proyectos/027/normalizar.mjs --solo RC14,HK1   (solo esos códigos)
 *
 * El 027 es el QUINTO reel de One Living (Envigado), V11 del registro de reels (el primero de esta propiedad fue el 022). Misma receta que
 * `proyectos/022/normalizar.mjs`, que cuenta el porqué de cada paso; el material es el mismo (26 clips) y hay DOS ramas de
 * codificación en el mismo reparto. La música es «Ivory Skyline Reverie». Solo se normaliza lo que la V11 puede usar: el hook HK2 (V6), la mitad MD3 (V7),
 * RC14 (su voz del final es el CTA, CT4 de la V10, y su tramo sin voz de 17-22,6 s, un plano del paseo: va como «toma») y los recorridos de la zona social
 * y del lado de la alcoba principal (el paseo va del balcón a esa alcoba y no pasa por la secundaria).
 *
 * DE DÓNDE SALEN LOS ARCHIVOS. Se copiaron del SSD del rodaje
 * (`/Volumes/SSK SSD/Work/Propiedades Luxur/Apartamento - One Living - Envigado/Videos/`, 4 carpetas: `1 Hooks`,
 * `2 Mitad`, `4 recorrido` —en minúscula—, `5 Cta`; NO hay `3 Dron`) a `proyectos/027/original/` con el CÓDIGO
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
 * WAV y no AAC porque el AAC arrastra 1027 muestras de priming que desplazan la voz ~21 ms contra su imagen.
 * Los recorridos no llevan audio en la pieza (traen un ruido de ambiente que no se usa).
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { ES_MAC, RAIZ, ejecutar, flags, log, relativa } from "../../herramientas/comun.mjs";

const ORIGEN = path.join(RAIZ, "proyectos", "027", "original");
const DESTINO = path.join(RAIZ, "remotion", "public", "recorrido-027");
const f = flags();

/**
 * clase · archivo en original/ · nombre de salida (sin extensión) · sha256 (8) del original · origen en el SSD.
 *   toma       Isabella a cámara → MP4 mudo + WAV con su voz
 *   recorrido  planos de la casa → MP4 mudo (HLG o SDR: se mide)
 */
const MATERIAL = [
  ["toma", "HK2.MOV", "hk2", "91aff730", "1 Hooks/hook2.MOV"], // el hook (REPETIDO de la V6): BALCON
  ["toma", "MD3.MOV", "md3", "918c89ff", "2 Mitad/medio3.MOV"], // la mitad (REPETIDA de la V7): SALA
  ["toma", "RC14.MOV", "rc14", "c44931a1", "4 recorrido/recorrido caminando.MOV"], // 50 s, HLG: el CTA (CT4 de la V10, voz 45,22-49,35 s) y, sin voz, el paseo de 17-22,6 s: va como «toma» para sacar su voz
  ["recorrido", "RC01.MOV", "rc01", "4968beba", "4 recorrido/balcon - paneo.MOV"],
  ["recorrido", "RC02.MOV", "rc02", "0d7de150", "4 recorrido/bano habitacion principal.MOV"],
  ["recorrido", "RC06.MOV", "rc06", "64602ed9", "4 recorrido/cocina, sala, balcon.MOV"],
  ["recorrido", "RC07.MOV", "rc07", "5654291a", "4 recorrido/habitacion principal - entrando.MOV"],
  ["recorrido", "RC08.MOV", "rc08", "8356ef40", "4 recorrido/habitacion principal - paneo 2.MOV"],
  ["recorrido", "RC09.MOV", "rc09", "df509f34", "4 recorrido/habitacion principal - paneo.MOV"], // 63 s: clip largo, se mina por ventanas
  ["recorrido", "RC10.MOV", "rc10", "1805d754", "4 recorrido/habitacion principal.MOV"],
  ["recorrido", "RC16.MOV", "rc16", "6eea17c2", "4 recorrido/vestier habitacion principal.MOV"],
];

/** archivo en original/ · salida · sha256 (8) · origen (fuera del repo: la biblioteca de música de Luxur). */
const MUSICA = ["musica-ivory.mp3", "musica-027", "80bf4f33", "archivos/musica/Ivory Skyline Reverie.mp3"];

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

for (const [clase, archivo, salida] of lista) {
  video(clase, archivo, salida);
  if (clase === "toma") voz(archivo, salida);
}
/**
 * LA VOZ MÁS ALTA (revisión 1, pedido del usuario 2026-10-08: «necesito que la voz cuando habla Isabella tenga más decibeles sin saturar»).
 * Con solo ganancia no se puede: MD3 tiene un pico de −2,3 dBTP a −21,6 LUFS y no sube más de 0,7 dB sin pasar de −1 dBTP. Así que cada toma sube con UNA ganancia (`VOZ_ALTA.db`, buscada para que su ventana
 * de voz mida `VOZ_ALTA.objetivo` con la misma medida que `limites-voz.py` DESPUÉS del limitador) y pasa por un LIMITADOR de picos con lookahead (`alimiter`: ataque 5 ms, relajación 50 ms, sin nivel automático
 * y CON compensación de latencia: 0 muestras de desfase contra la voz sin tratar, medido) a `VOZ_ALTA.techo` dBFS. Solo toca los picos de las sílabas fuertes: la reducción mediana en la voz es 0 dB, pasa de
 * 1 dB en el 1-8 % de las ventanas de 10 ms y el máximo es 4,5 dB (MD3). Pico real resultante: −2,0 dBTP en las tres. Es la única excepción a «la voz sin tratar» (R29), declarada. Sale a `<toma>-alta.wav`;
 * el WAV sin tratar se queda como estaba.
 */
const VOZ_ALTA = { objetivo: -17, techo: -2.0, db: { hk2: 2.21, md3: 5.59, rc14: 6.5 } };
for (const [nombre, db] of Object.entries(VOZ_ALTA.db)) {
  const cruda = path.join(DESTINO, `${nombre}.wav`);
  const alta = path.join(DESTINO, `${nombre}-alta.wav`);
  if (!fs.existsSync(cruda)) continue;
  if (fs.existsSync(alta) && !f.forzar) continue;
  const limite = 10 ** (VOZ_ALTA.techo / 20);
  ejecutar(
    "ffmpeg",
    ["-nostdin", "-y", "-v", "error", "-i", cruda, "-af", `volume=${db.toFixed(2)}dB,alimiter=limit=${limite.toFixed(4)}:attack=5:release=50:level=0:latency=1`, "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "1", alta],
    { check: true }
  );
  log.ok(`${path.basename(alta)} (+${db.toFixed(2)} dB y limitador a ${VOZ_ALTA.techo} dBFS: ${VOZ_ALTA.objetivo} LUFS en su ventana de voz)`);
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
