#!/usr/bin/env node
/**
 * normalizar.mjs — repone `remotion/public/recorrido-017/` desde el material original.
 *
 *   node proyectos/017/normalizar.mjs            (lee de proyectos/017/original/)
 *   node proyectos/017/normalizar.mjs --forzar   (rehace aunque ya exista la salida)
 *
 * POR QUÉ EXISTE. El material es de la propiedad y de la presentadora y no entra
 * en git: en el repo quedan esta receta, el plan y los sha256 de los originales.
 * Con la carpeta delante, un clon repone la pieza entera.
 *
 * DE DÓNDE SALEN LOS ARCHIVOS. Se copiaron del SSD del rodaje (`Apartamento -
 * Los Patios - El Poblado/Videos`, 5 carpetas) a `proyectos/017/original/` con
 * el CÓDIGO del catálogo (`proyectos/017/catalogo-material.md`) como nombre y
 * sin espacios. La columna «origen» de abajo dice qué archivo del SSD es cada uno.
 *
 * LO QUE TRAÍAN, medido con ffprobe (R01, R19, R21):
 *   · los nueve MOV (tomas de Isabella y recorrido): HEVC 10 bit **HLG**
 *     (`arib-std-b67`, BT.2020), 3840×2160 con `rotation=-90` → pantalla
 *     2160×3840 vertical, a 30 o 29,97 fps. Sin tone-map salen lavados (R21):
 *     lo hace VideoToolbox (`scale_vt`), y la rotación también (`transpose_vt`,
 *     porque con frames de GPU el autorrotado no funciona). Esa rama SOLO corre
 *     en macOS y lo dice si no: es la misma excepción declarada del 011-016;
 *   · los dos clips del dron: HEVC 8 bit **SDR** BT.709, 3840×2160 con
 *     `rotation=90`, 29,97 fps, SIN audio. Tone-mapearlos los estropearía: solo
 *     se rota (`transpose=cclock`) y se escala;
 *   · el audio de cada toma de Isabella: micro de solapa mono; sale en WAV PCM
 *     48 kHz mono, SIN filtro ni nivel (la ganancia vive en el plan, R29). WAV y
 *     no AAC: el AAC arrastra 1024 muestras de priming que desplazan la voz
 *     ~21 ms contra su imagen. Ese WAV crudo sigue siendo el que se mide (límites
 *     y onsets de la voz, R29); desde la rev. 9 (2026-10-08) la que SUENA es la voz
 *     TRATADA, `<toma>-voz.wav` (ver `vozTratada`): −15 LUFS sin saturar.
 *
 * LA MÚSICA se decodifica ENTERA a WAV estéreo de 48 kHz y NADA MÁS (ni loudnorm,
 * que le cambiaría la dinámica): el MP3 arrastra su retardo de códec y el corte
 * al golpe se hace a la muestra, sobre el WAV. Su `desde` (segundos) es el de
 * `archivos/musica/catalogo-musica.md`, y el nivel es una ganancia del plan medida sobre
 * el tramo que suena (`audio-017.ts`).
 *
 * LA TARJETA DEL CIERRE: `cierre-oscuro.png`, un negro liso (ver el final de este archivo). Desde la revisión 6 nada se congela.
 *
 * Vídeo a 1296×2304 · 30 fps · SIN audio: 1296 = 1080 × 1,2, el techo del
 * punch-in (criterio del 011).
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { ES_MAC, RAIZ, ejecutar, flags, log, relativa } from "../../herramientas/comun.mjs";

const ORIGEN = path.join(RAIZ, "proyectos", "017", "original");
const DESTINO = path.join(RAIZ, "remotion", "public", "recorrido-017");
const f = flags();

/**
 * clase · archivo en original/ · nombre de salida (sin extensión) · sha256 (8) del original · origen en el SSD.
 *   toma       Isabella a cámara → MP4 mudo + WAV con su voz
 *   recorrido  planos de la casa → MP4 mudo (HLG)
 *   dron       planos del dron → MP4 mudo (SDR, rotación 90)
 */
const MATERIAL = [
  ["toma", "HK02.MOV", "hk02", "640551d1", "1 Hooks/Hook2+IA.MOV"],
  ["toma", "MD09.MOV", "md09", "d6b8d95d", "2 Mitad/Medio9.MOV"],
  ["toma", "CT07.MOV", "ct07", "8b2be01f", "5 Cta/CTA7.MOV"],
  ["recorrido", "RC01.MOV", "rc01", "af31061e", "4 Recorrido/Recorrido Abre puerta.MOV"],
  ["recorrido", "RC02.MOV", "rc02", "6858ee03", "4 Recorrido/Entrada apto y Sala.MOV"],
  ["recorrido", "RC07.MOV", "rc07", "e89d0e21", "4 Recorrido/Vista  Cocina y Comedor.MOV"],
  ["recorrido", "RC08.MOV", "rc08", "c18222ac", "4 Recorrido/Patio y Naturaleza.MOV"],
  ["recorrido", "RC25.MOV", "rc25", "3d1aa61c", "4 Recorrido/Exterior edificio4.MOV"],
  ["dron", "DR147.MP4", "dr147", "0e28fae2", "3 Dron/DJI_20261001103120_0147_D.MP4"],
  ["dron", "DR163.MP4", "dr163", "02555e32", "3 Dron/DJI_20261001104246_0163_D.MP4"],
];
/** archivo en original/ · salida · sha256 (8) · origen (fuera del repo: la biblioteca de música de Luxur). */
const MUSICA = ["musica-time.mp3", "musica-017", "4b659bec", "Music/Hans Zimmer - Time.mp3"];

const sha8 = (archivo) => crypto.createHash("sha256").update(fs.readFileSync(archivo)).digest("hex").slice(0, 8);
const sondea = (archivo, entradas, selector = "v:0") =>
  ejecutar("ffprobe", ["-v", "error", "-select_streams", selector, "-show_entries", entradas, "-of", "default=nw=1:nk=1", archivo], { check: true }).stdout.trim();

if (!fs.existsSync(ORIGEN)) {
  log.error(`no existe ${relativa(ORIGEN)}: copia ahí el material del rodaje (ver la columna «origen» de este archivo)`);
  process.exit(1);
}
fs.mkdirSync(DESTINO, { recursive: true });

// Identidad ANTES de gastar minutos de codificación: otro archivo con el mismo
// nombre montaría un vídeo distinto en silencio.
let malos = 0;
for (const [, archivo, , esperado] of [...MATERIAL, ["", MUSICA[0], "", MUSICA[2]]]) {
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

/** La rotación de PANTALLA del archivo (R19): −90 en un iPhone vertical, 90 en el dron, 0 si ya viene derecho. */
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
  const comunes = [
    "-an", "-fps_mode", "cfr", "-r", "30", "-c:v", "libx264", "-preset", "slow", "-crf", "17", "-pix_fmt", "yuv420p",
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
 * LA CADENA DE LA VOZ TRATADA (`vozTratada`, abajo). Es la de la V9 (`proyectos/025/normalizar.mjs`): highpass → puerta
 * suave → compresor → ganancia → limitador. La ganancia se busca DESPUÉS del compresor, midiendo la ventana de voz de
 * cada toma con ebur128, y por eso es una por toma (`GANANCIA_VOZ_DB`).
 */
const VOZ_TRATADA = (gananciaDb) =>
  [
    "highpass=f=100:poles=2",
    "agate=threshold=0.0056:ratio=2:range=0.25:attack=5:release=200",
    "acompressor=threshold=0.0501:ratio=3:attack=4:release=120:knee=6",
    `volume=${gananciaDb}dB`,
    "alimiter=limit=0.75:attack=1:release=60:level=disabled:latency=1",
  ].join(",");

/** dB tras el compresor que dejan cada voz en −15,0 LUFS en su ventana (`s0`-`s1` de `metraje-017.ts`). */
const GANANCIA_VOZ_DB = { hk02: 15.1, md09: 14.8, ct07: 13.9 };

/**
 * LA VOZ TRATADA, la que suena en la pieza (rev. 9, pedido del usuario sobre la final ya exportada, 2026-10-08: «necesito que la voz cuando habla
 * Isabella tenga más decibeles sin saturar»). Es una excepción a R29 (una ganancia por toma y nada más), por encargo: sola, la ganancia no llega.
 * Las tres tomas miden −21,1 (HK02), −21,7 (MD09) y −18,9 LUFS (CT07) con picos de −3,1, −3,0 y −2,0 dBTP: llevarlas a −15 LUFS con ganancia
 * sola daría picos de +3,0, +3,7 y +1,9 dBTP (saturan). Por eso, en este orden:
 *   highpass 100 Hz   los golpes graves del micro de solapa y los pasos; una voz femenina no baja de ahí
 *   agate             puerta SUAVE (−12 dB como mucho, ratio 2, umbral −45 dBFS): el ambiente entre frases no sube con la compresión
 *   acompressor       3:1 desde −26 dBFS, ataque 4 ms, relevo 120 ms, rodilla 6 dB: acerca el pico al nivel medio
 *   volume            la ganancia de `GANANCIA_VOZ_DB` hasta −15 LUFS
 *   alimiter          techo −2,5 dBFS (sin nivelado automático, `latency=1`: compensa el ms de lookahead y la voz no se desfasa): lo que el compresor no alcanza
 * Resultado medido (ebur128, ventana de voz): HK02, MD09 y CT07 a −15,0 LUFS, los tres con el pico real en −2,5 dBTP. El limitador quita
 * 2,1 · 1,3 · 0,4 dB en los picos (la cadena sin él llegaría a −0,4 · −1,2 · −2,1 dBTP): lejos de los 5 dB en que empieza a oírse.
 */
function vozTratada(salidaNombre) {
  const entrada = path.join(DESTINO, `${salidaNombre}.wav`);
  const salida = path.join(DESTINO, `${salidaNombre}-voz.wav`);
  if (fs.existsSync(salida) && !f.forzar) return;
  const ganancia = GANANCIA_VOZ_DB[salidaNombre];
  if (ganancia === undefined) {
    log.error(`${salidaNombre}: no tiene ganancia de voz en GANANCIA_VOZ_DB`);
    process.exit(1);
  }
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", entrada, "-af", VOZ_TRATADA(ganancia), "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "1", salida], { check: true });
  log.ok(`${path.basename(salida)} (la voz tratada: graves, puerta suave, compresión 3:1, +${ganancia} dB y limitador a −2,5 dBFS)`);
}

for (const [clase, archivo, salida] of MATERIAL) {
  video(clase, archivo, salida);
  if (clase === "toma") {
    voz(archivo, salida);
    vozTratada(salida);
  }
}

// La TARJETA OSCURA del cierre (plano `c12-cierre`): un PNG liso del negro de la marca. Hasta la revisión 5 lo que
// seguía a la última palabra de Isabella era el último fotograma de CT07 congelado (primero en un PNG, luego en un
// MP4); el usuario pidió que NO se congele: la imagen funde a negro y sigue este fondo oscuro con el logo y la web
// (`cierre-017.ts`). Es el mismo color al que funde la imagen (`LUXUR.color.negro`, #000000) y sobre negro puro el
// PNG y el fundido no se distinguen. 1296×2304 como los clips, para que el plano cubra el cuadro con su zoom.
const tarjeta = path.join(DESTINO, "cierre-oscuro.png");
if (!fs.existsSync(tarjeta) || f.forzar) {
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-f", "lavfi", "-i", "color=c=0x000000:s=1296x2304:r=1", "-frames:v", "1", "-pix_fmt", "rgb24", tarjeta], { check: true });
  log.ok(`${path.basename(tarjeta)} (negro liso 1296×2304, la tarjeta del cierre)`);
}

const wav = path.join(DESTINO, `${MUSICA[1]}.wav`);
if (!fs.existsSync(wav) || f.forzar) {
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", path.join(ORIGEN, MUSICA[0]), "-map", "0:a:0", "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "2", wav], { check: true });
  log.ok(`${path.basename(wav)} (la canción entera, decodificada)`);
}
log.ok(`repuesto en ${relativa(DESTINO)}`);
