#!/usr/bin/env node
/**
 * normalizar.mjs — repone `remotion/public/recorrido-021/` desde el material original.
 *
 *   node proyectos/021/normalizar.mjs            (lee de proyectos/021/original/)
 *   node proyectos/021/normalizar.mjs --forzar   (rehace aunque ya exista la salida)
 *
 * El 021 es la QUINTA versión del reel del apto 501 de Los Patios (el 017 fue la primera, el 018 la segunda, el
 * 019 la tercera y el 020 la cuarta): otro hook (HK06), otra mitad (MD01), otro CTA (CT02, recortado a su segunda mitad), otro
 * dron (DR154), otra apertura (RC10, el deck) y otra canción, de PIANO («Amélie», de Andrea Vanzo). Misma receta que
 * `proyectos/017/normalizar.mjs`, que es la que cuenta el porqué de cada paso; aquí solo cambia el material.
 *
 * POR QUÉ EXISTE. El material es de la propiedad y de la presentadora y no entra en git: en el repo
 * quedan esta receta, el plan y los sha256 de los originales. Con la carpeta delante, un clon
 * repone la pieza entera.
 *
 * DE DÓNDE SALEN LOS ARCHIVOS. Se copiaron del SSD del rodaje (`Apartamento - Los Patios - El
 * Poblado/Videos`, 5 carpetas) a `proyectos/021/original/` con el CÓDIGO del catálogo
 * (`proyectos/017/catalogo-material.md`) como nombre y sin espacios. La columna «origen» de abajo dice
 * qué archivo del SSD es cada uno.
 *
 * LO QUE TRAÍAN, medido con ffprobe (R01, R19, R21), igual que en el 017:
 *   · los MOV (tomas de Isabella y recorrido): HEVC 10 bit **HLG** (`arib-std-b67`, BT.2021),
 *     3840×2160 con `rotation=-90` → pantalla 2160×3840 vertical, a 30 o 29,97 fps. Sin tone-map
 *     salen lavados (R21): lo hace VideoToolbox (`scale_vt`), y la rotación también
 *     (`transpose_vt`). Esa rama SOLO corre en macOS y lo dice si no;
 *   · el clip del dron: HEVC 8 bit **SDR** BT.709, 3840×2160 con `rotation=90`, 29,97 fps, SIN
 *     audio. Tone-mapearlo lo estropearía: solo se rota (`transpose=cclock`) y se escala;
 *   · el audio de cada toma de Isabella: micro de solapa mono; sale en WAV PCM 48 kHz mono, SIN
 *     filtro ni nivel (la ganancia vive en el plan, R29). WAV y no AAC: el AAC arrastra 1024
 *     muestras de priming que desplazan la voz ~21 ms contra su imagen.
 *
 * LA MÚSICA se decodifica ENTERA a WAV estéreo de 48 kHz y NADA MÁS (ni loudnorm): el MP3 arrastra
 * su retardo de códec y el corte al golpe se hace a la muestra, sobre el WAV. Su `desde`
 * (segundos) sale de `archivos/musica/catalogo-musica.md` y de la medida propia de `medir-pista.py`
 * (`metraje-021.ts`), y el nivel es una ganancia del plan medida sobre el tramo que suena.
 *
 * LA TARJETA DEL CIERRE: `cierre-oscuro.png`, un negro liso (ver el final de este archivo). Nada se congela.
 *
 * Vídeo a 1296×2304 · 30 fps · SIN audio: 1296 = 1080 × 1,2, el techo del punch-in (criterio del 011).
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { ES_MAC, RAIZ, ejecutar, flags, log, relativa } from "../../herramientas/comun.mjs";

const ORIGEN = path.join(RAIZ, "proyectos", "021", "original");
const DESTINO = path.join(RAIZ, "remotion", "public", "recorrido-021");
const f = flags();

/**
 * clase · archivo en original/ · nombre de salida (sin extensión) · sha256 (8) del original · origen en el SSD.
 *   toma       Isabella a cámara → MP4 mudo + WAV con su voz
 *   recorrido  planos de la casa → MP4 mudo (HLG)
 *   dron       planos del dron → MP4 mudo (SDR, rotación 90)
 */
const MATERIAL = [
  ["toma", "HK06.MOV", "hk06", "127d2fc3", "1 Hooks/Hook6.MOV"],
  ["toma", "MD01.MOV", "md01", "bdf81b78", "2 Mitad/Medio1.MOV"],
  ["toma", "CT02.MOV", "ct02", "ccd91d47", "5 Cta/CTA2.MOV"], // solo su 2.ª mitad, «escríbeme y ven a conocerlo» (el precio y el «317» no suenan)
  ["recorrido", "RC10.MOV", "rc10", "1ebd08b6", "4 Recorrido/Patio y Piscina.MOV"], // la barandilla (8,4-11,83 s); la V2 usó 4,0-8,4 s (la rev. 1 abría también con 0-2,67 s de este clip)
  ["recorrido", "RC11.MOV", "rc11", "942426d0", "4 Recorrido/Piscina y Patio.MOV"], // la piscina (3,0-6,83 s) y la corredera (9,67-13,23 s); la V2 usó 0,4-2,6 y 7,0-9,2 s
  ["recorrido", "RC12.MOV", "rc12", "fe277de5", "4 Recorrido/Habitacion Principal.MOV"], // la alcoba, de la puerta de vidrio al ventanal (ninguna versión la usó)
  ["dron", "DR154.MP4", "dr154", "ffcdb93e", "3 Dron/DJI_20261001103456_0154_D.MP4"], // el edificio visto desde arriba, sin la torre vecina con malla negra
];
/** archivo en original/ · salida · sha256 (8) · origen (fuera del repo: la biblioteca de música de Luxur). */
const MUSICA = ["musica-amelie.mp3", "musica-021", "8a845ebc", "Music/Andrea Vanzo - Amélie - Comptine d’un autre été, l’après-midi (reimagined).mp3"];

/**
 * LA CADENA DE LA VOZ TRATADA (ver `vozTratada`, abajo, qué mide cada paso): la de la V12 (`proyectos/028/normalizar.mjs`) y la V9 (`proyectos/025/normalizar.mjs`).
 * La ganancia (`volume`) es POR TOMA porque las tres miden distinto en bruto (−22,3 · −24,9 · −22,0 LUFS en su ventana de voz, picos de −3,5 · −4,0 · −5,9 dBFS) y se busca
 * DESPUÉS del limitador: la que deja cada ventana en ≈ −15 LUFS con el pico real en −2,5 dBFS.
 */
const GANANCIA_VOZ_DB = { hk06: 15.6, md01: 16.2, ct02: 14.8 };
const vozTratadaCadena = (db) =>
  [
    "highpass=f=100:poles=2",
    "agate=threshold=0.0056:ratio=2:range=0.25:attack=5:release=200",
    "acompressor=threshold=0.0501:ratio=3:attack=4:release=120:knee=6",
    `volume=${db}dB`,
    "alimiter=limit=0.75:attack=1:release=60:level=disabled:latency=1",
  ].join(",");

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
 * LA VOZ TRATADA, la que suena en la pieza (REV. 3 de la final, 2026-10-08, pedido del usuario: «necesito que la voz cuando habla Isabella tenga más decibeles sin saturar»). Es una
 * excepción a R29 («una ganancia por toma y nada más»), por encargo: con ganancia sola no llega (llevar HK06, MD01 y CT02 de −22/−25 a −15 LUFS daría picos de +4, +5 y +1 dBTP).
 *   highpass 100 Hz   los golpes graves del micro de solapa y los pasos; una voz femenina no baja de ahí
 *   agate             puerta SUAVE (−12 dB como mucho, ratio 2, umbral −45 dBFS): el ambiente entre frases no sube con la compresión
 *   acompressor       3:1 desde −26 dBFS, ataque 4 ms, relevo 120 ms, rodilla 6 dB: acerca el pico al nivel medio
 *   volume            la ganancia de la toma (`GANANCIA_VOZ_DB`), antes del limitador
 *   alimiter          techo −2,5 dBFS (sin nivelado automático, `latency=1`: compensa el ms de lookahead y la voz no se desfasa)
 * El WAV crudo sigue ahí para medir la voz (R29: `limites-voz.py`, `onsets-voz.py`): el tratado no se desfasa. La compresión sube los ruidos del micro tras la última palabra.
 */
function vozTratada(salidaNombre) {
  const entrada = path.join(DESTINO, `${salidaNombre}.wav`);
  const salida = path.join(DESTINO, `${salidaNombre}-voz.wav`);
  if (fs.existsSync(salida) && !f.forzar) return;
  const db = GANANCIA_VOZ_DB[salidaNombre];
  if (db === undefined) throw new Error(`falta la ganancia de ${salidaNombre} en GANANCIA_VOZ_DB`);
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", entrada, "-af", vozTratadaCadena(db), "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "1", salida], { check: true });
  log.ok(`${path.basename(salida)} (la voz tratada: graves, puerta suave, compresión 3:1, +${db} dB y limitador a −2,5 dBFS)`);
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
// (`cierre-021.ts`). Es el mismo color al que funde la imagen (`LUXUR.color.negro`, #000000) y sobre negro puro el
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
