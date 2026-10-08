#!/usr/bin/env node
/**
 * normalizar.mjs — repone `remotion/public/recorrido-019/` desde el material original.
 *
 *   node proyectos/019/normalizar.mjs            (lee de proyectos/019/original/)
 *   node proyectos/019/normalizar.mjs --forzar   (rehace aunque ya exista la salida)
 *
 * El 019 es la TERCERA versión del reel del apto 501 de Los Patios (el 017 fue la primera y el 018 la
 * segunda): otro hook (HK05), otra mitad (MD08), otro CTA (CT05), otro dron (DR152, tras el hook), otra
 * apertura (RC25, la fachada desde el suelo) y otra canción («Flying Into the Sun»). Misma receta que
 * `proyectos/017/normalizar.mjs`, que es la que cuenta el porqué de cada paso; aquí solo cambia el material.
 *
 * POR QUÉ EXISTE. El material es de la propiedad y de la presentadora y no entra en git: en el repo
 * quedan esta receta, el plan y los sha256 de los originales. Con la carpeta delante, un clon
 * repone la pieza entera.
 *
 * DE DÓNDE SALEN LOS ARCHIVOS. Se copiaron del SSD del rodaje (`Apartamento - Los Patios - El
 * Poblado/Videos`, 5 carpetas) a `proyectos/019/original/` con el CÓDIGO del catálogo
 * (`proyectos/017/catalogo-material.md`) como nombre y sin espacios. La columna «origen» de abajo dice
 * qué archivo del SSD es cada uno.
 *
 * LO QUE TRAÍAN, medido con ffprobe (R01, R19, R21), igual que en el 017:
 *   · los MOV (tomas de Isabella y recorrido): HEVC 10 bit **HLG** (`arib-std-b67`, BT.2020),
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
 * (`metraje-019.ts`), y el nivel es una ganancia del plan medida sobre el tramo que suena.
 *
 * LA TARJETA DEL CIERRE: `cierre-oscuro.png`, un negro liso (ver el final de este archivo). Nada se congela.
 *
 * Vídeo a 1296×2304 · 30 fps · SIN audio: 1296 = 1080 × 1,2, el techo del punch-in (criterio del 011).
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { ES_MAC, RAIZ, ejecutar, flags, log, relativa } from "../../herramientas/comun.mjs";

const ORIGEN = path.join(RAIZ, "proyectos", "019", "original");
const DESTINO = path.join(RAIZ, "remotion", "public", "recorrido-019");
const f = flags();

/**
 * clase · archivo en original/ · nombre de salida (sin extensión) · sha256 (8) del original · origen en el SSD.
 *   toma       Isabella a cámara → MP4 mudo + WAV con su voz
 *   recorrido  planos de la casa → MP4 mudo (HLG)
 *   dron       planos del dron → MP4 mudo (SDR, rotación 90)
 */
const MATERIAL = [
  ["toma", "HK05.MOV", "hk05", "8c2339ca", "1 Hooks/Hook5.MOV"],
  ["toma", "MD08.MOV", "md08", "0fc82ec7", "2 Mitad/Medio8.MOV"],
  ["toma", "CT05.MOV", "ct05", "ef4debbb", "5 Cta/CTA5.MOV"],
  ["recorrido", "RC25.MOV", "rc25", "3d1aa61c", "4 Recorrido/Exterior edificio4.MOV"], // la apertura limpia (ya salió en la V1 y en la V2: se declara)
  ["recorrido", "RC09.MOV", "rc09", "9f2b2e32", "4 Recorrido/Patio y Naturaleza 2.MOV"],
  ["recorrido", "RC13.MOV", "rc13", "37a2f0fd", "4 Recorrido/Habitacion Principal 2.MOV"],
  ["recorrido", "RC16.MOV", "rc16", "938b9b3a", "4 Recorrido/Recorrido Caminando.MOV"], // con Isabella de espaldas; su voz (0,4-3,9 s) no se usa: el plano va mudo
  ["dron", "DR152.MP4", "dr152", "91acff0e", "3 Dron/DJI_20261001103352_0152_D.MP4"],
];
/**
 * LA CADENA DE LA VOZ TRATADA (REV. 1, 2026-10-08, pedido del usuario tras la final: «necesito que la voz cuando habla Isabella tenga más decibeles sin saturar»).
 * Es la de la V12 (`proyectos/028/normalizar.mjs`) y la V9 (`proyectos/025/normalizar.mjs`): sola, la ganancia no llega (las tres tomas crudas miden
 * −20,7 · −17,9 · −18,9 LUFS con picos de −3,9 · −0,5 · −1,7 dBTP; llevarlas a −15 con ganancia sola daría +1,3 · +2,4 · +0,2 dBTP, que satura). Ver `vozTratada`.
 * La ganancia es POR TOMA —+14 · +13 · +14 dB, tras el compresor— y se buscó midiendo cada ventana de voz (ebur128): −15,0 · −15,1 · −15,2 LUFS con el pico real en −2,5 dBFS.
 */
const GANANCIA_VOZ = { hk05: 14, md08: 13, ct05: 14 };
const vozTratadaCadena = (db) =>
  [
    "highpass=f=100:poles=2",
    "agate=threshold=0.0056:ratio=2:range=0.25:attack=5:release=200",
    "acompressor=threshold=0.0501:ratio=3:attack=4:release=120:knee=6",
    `volume=${db}dB`,
    "alimiter=limit=0.75:attack=1:release=60:level=disabled:latency=1",
  ].join(",");

/** archivo en original/ · salida · sha256 (8) · origen (fuera del repo: la biblioteca de música de Luxur). */
const MUSICA = ["musica-flying.mp3", "musica-019", "ca1f1cbf", "Music/Aleksey Chistilin - Flying Into the Sun.mp3"];

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
 * LA VOZ TRATADA, la que suena en la pieza (`<toma>-voz.wav`). Excepción a R29 («una ganancia por toma y nada más»), por encargo: sola, la ganancia no llega a −15 LUFS sin pasar de 0 dBTP.
 * En este orden:
 *   highpass 100 Hz   los golpes graves del micro de solapa y los pasos; una voz femenina no baja de ahí
 *   agate             puerta SUAVE (−12 dB como mucho, ratio 2, umbral −45 dBFS): el ambiente entre frases no sube con la compresión
 *   acompressor       3:1 desde −26 dBFS, ataque 4 ms, relevo 120 ms, rodilla 6 dB: acerca el pico al nivel medio
 *   volume +13/+14 dB la ganancia hasta ≈ −15 LUFS (`GANANCIA_VOZ`)
 *   alimiter          techo −2,5 dBFS (sin nivelado automático, `latency=1`: compensa el ms de lookahead y la voz no se desfasa): lo que el compresor no alcanza
 * Medido sobre el WAV: desfase de 2-4 muestras (0,04-0,08 ms) y la cola tras la última palabra sube de −57/−60 a −48/−54 dBFS de RMS (inaudible bajo la música). El WAV crudo sigue
 * ahí para medir la voz (R29: `limites-voz.py`, `onsets-voz.py`, `palabras-desde.py`, `formantes.py`).
 */
function vozTratada(salidaNombre) {
  const entrada = path.join(DESTINO, `${salidaNombre}.wav`);
  const salida = path.join(DESTINO, `${salidaNombre}-voz.wav`);
  if (fs.existsSync(salida) && !f.forzar) return;
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", entrada, "-af", vozTratadaCadena(GANANCIA_VOZ[salidaNombre]), "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "1", salida], { check: true });
  log.ok(`${path.basename(salida)} (la voz tratada: graves, puerta suave, compresión 3:1, +${GANANCIA_VOZ[salidaNombre]} dB y limitador a −2,5 dBFS)`);
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
// (`cierre-019.ts`). Es el mismo color al que funde la imagen (`LUXUR.color.negro`, #000000) y sobre negro puro el
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
