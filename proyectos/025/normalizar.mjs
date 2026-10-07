#!/usr/bin/env node
/**
 * normalizar.mjs — repone `remotion/public/recorrido-025/` desde el material original.
 *
 *   node proyectos/025/normalizar.mjs            (lee de proyectos/025/original/)
 *   node proyectos/025/normalizar.mjs --forzar   (rehace aunque ya exista la salida)
 *   node proyectos/025/normalizar.mjs --solo rc14,hk09   (solo esos nombres de salida; no toca la música ni la tarjeta)
 *
 * El 025 es la V9 del registro de reels y la SEXTA versión de Los Patios (apto 501): «Para un comprador muy específico». Misma receta
 * que `proyectos/021/normalizar.mjs` (Los Patios, con dron) y `proyectos/024/normalizar.mjs` (el `--solo`). Material de
 * `Apartamento - Los Patios - El Poblado/Videos/` (`1 Hooks`, `2 Mitad`, `3 Dron`, `4 Recorrido`, `5 Cta`). Música: «Heaven on Earth».
 * Los clips de `MATERIAL` son los candidatos de la pieza (los del plan y unos pocos de reserva, para elegir mirando); lo que el plan
 * no use se quita de aquí al cerrar.
 *
 * POR QUÉ EXISTE. El material es de la propiedad y de la presentadora y no entra en git: en el repo
 * quedan esta receta, el plan y los sha256 de los originales. Con la carpeta delante, un clon repone
 * la pieza entera. Es un script de Node (con `ejecutar()` de `herramientas/comun.mjs`) y no un `.sh`
 * porque el sistema pide recetas que corran igual en macOS y en Windows; la ÚNICA excepción declarada
 * es la rama HDR (HLG → BT.709 con VideoToolbox), que solo corre en macOS y lo dice si no.
 *
 * DE DÓNDE SALEN LOS ARCHIVOS. Se copian del disco del rodaje a `proyectos/025/original/` con el CÓDIGO
 * del catálogo como nombre y SIN ESPACIOS (nunca se monta desde Descargas). La columna «origen» de
 * `MATERIAL` dice qué archivo del disco es cada uno. Rellena el sha con `shasum -a 256 ARCHIVO | cut -c1-8`.
 *
 * ANTES DE TOCAR NADA, mide cada archivo (R01, R19, R21):
 *   ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate,color_transfer:stream_side_data=rotation -of default=nw=1 ARCHIVO
 * Lo habitual:
 *   · los MOV de un iPhone (tomas de la presentadora y recorrido): HEVC 10 bit **HLG** (`arib-std-b67`,
 *     BT.2020), 3840×2160 con `rotation=-90` → pantalla 2160×3840 vertical, a 30 o 29,97 fps. Sin tone-map
 *     salen lavados (R21): lo hace VideoToolbox (`scale_vt`), y la rotación también (`transpose_vt`);
 *   · el clip de un dron: HEVC 8 bit **SDR** BT.709, 3840×2160 con `rotation=90`, 29,97 fps, SIN audio.
 *     Tone-mapearlo lo estropearía: solo se rota (`transpose=cclock`) y se escala;
 *   · el audio de cada toma: micro de solapa mono; sale en WAV PCM 48 kHz mono, SIN filtro ni nivel (la
 *     ganancia vive en el plan, R29). WAV y no AAC: el AAC arrastra 1024 muestras de priming que
 *     desplazan la voz ~21 ms contra su imagen.
 *
 * CINCO CLASES de archivo, y cada una sale distinta:
 *   toma       la presentadora a cámara → MP4 mudo + WAV con su voz
 *   recorrido  planos de la casa → MP4 mudo
 *   dron       planos del dron → MP4 mudo
 *   audio      una voz en off → solo el WAV, mono y sin tratar
 *   (música)   la canción → WAV estéreo de 48 kHz decodificado ENTERO y NADA MÁS (ni loudnorm): el MP3
 *              arrastra su retardo de códec y el corte al golpe se hace a la muestra sobre el WAV. Su
 *              `desde` sale de la medida de la pista y el nivel es una ganancia del plan.
 *
 * LA TARJETA DEL CIERRE: `cierre-oscuro.png`, un negro liso (ver el final de este archivo). Nada se congela.
 *
 * Vídeo a 1296×2304 · 30 fps · SIN audio: 1296 = 1080 × 1,2, el techo del punch-in (criterio del 011).
 * Los datos de ejemplo de abajo NO existen: sustitúyelos por los de tu material (la identidad se comprueba
 * ANTES de gastar minutos de codificación y el script se niega a seguir si un archivo falta o no es el del plan).
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { ES_MAC, RAIZ, ejecutar, flags, log, relativa } from "../../herramientas/comun.mjs";

const ORIGEN = path.join(RAIZ, "proyectos", "025", "original");
const DESTINO = path.join(RAIZ, "remotion", "public", "recorrido-025");
const f = flags();
const solo = typeof f.solo === "string" ? new Set(f.solo.toLowerCase().split(",")) : null;

/**
 * clase · archivo en original/ · nombre de salida (sin extensión) · sha256 (8) del original · origen en el disco.
 * El nombre de salida es el que usa el plan: `v("hk01")` → `recorrido-025/hk01.mp4` y `a("hk01")` → `hk01.wav`.
 *   toma       la presentadora a cámara → MP4 mudo + WAV con su voz
 *   recorrido  planos de la casa → MP4 mudo (HLG o SDR: lo mira el script)
 *   dron       planos del dron → MP4 mudo (SDR, rotación 90)
 *   audio      una voz en off → WAV mono sin tratar
 */
const MATERIAL = [
  ["toma", "HK09.MOV", "hk09", "8f30cbdb", "1 Hooks/Hook9.MOV"],
  ["toma", "MD11.MOV", "md11", "c1275abf", "2 Mitad/Medio11.MOV"],
  ["toma", "CT03.MOV", "ct03", "a26fce64", "5 Cta/CTA3.MOV"],
  ["recorrido", "RC23.MOV", "rc23", "a60125a6", "4 Recorrido/Exterior edificio2.MOV"],
  ["recorrido", "RC02.MOV", "rc02", "6858ee03", "4 Recorrido/Entrada apto y Sala.MOV"],
  ["recorrido", "RC07.MOV", "rc07", "e89d0e21", "4 Recorrido/Vista  Cocina y Comedor.MOV"],
  ["recorrido", "RC04.MOV", "rc04", "29ba2ea0", "4 Recorrido/Vista ventana y Sala.MOV"],
  ["recorrido", "RC13.MOV", "rc13", "37a2f0fd", "4 Recorrido/Habitacion Principal 2.MOV"],
  ["recorrido", "RC14.MOV", "rc14", "456f37e9", "4 Recorrido/Habitacion Secundaria.MOV"],
  ["recorrido", "RC03.MOV", "rc03", "606f3374", "4 Recorrido/Sala.MOV"],
  ["recorrido", "RC05.MOV", "rc05", "4cd13369", "4 Recorrido/Cocina.MOV"],
  ["recorrido", "RC01.MOV", "rc01", "af31061e", "4 Recorrido/Recorrido Abre puerta.MOV"],
  ["recorrido", "RC24.MOV", "rc24", "83dce217", "4 Recorrido/Exterior edidficio3.MOV"],
  ["recorrido", "RC26.MOV", "rc26", "7e493b8c", "4 Recorrido/Exterior edificio5.MOV"],
  ["recorrido", "RC10.MOV", "rc10", "1ebd08b6", "4 Recorrido/Patio y Piscina.MOV"],
  ["recorrido", "RC15.MOV", "rc15", "bd74ad18", "4 Recorrido/Estudio y Baño.MOV"],
  ["dron", "DR153.MP4", "dr153", "57f26d8a", "3 Dron/DJI_20261001103446_0153_D.MP4"],
  // ["audio", "OF01.WAV", "of01", "00000000", "6 Off/Off1.WAV"],   // solo si la pieza lleva voz en off
];
/**
 * La canción: archivo en original/ · salida · sha256 (8) · origen (fuera del repo: la biblioteca de música del estudio).
 * `null` si la pieza sale sin música (`HAY_MUSICA = false` en `audio-025.ts`).
 */
const MUSICA = ["musica-heaven.mp3", "musica-025", "acd99178", "Music/Heaven on Earth.mp3"]; // lounge / chill †; libre de uso en el registro hasta la V9

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
const lista = MATERIAL.filter(([, , salida]) => !solo || solo.has(salida));
for (const [, archivo, , esperado] of [...lista, ...(MUSICA && !solo ? [["", MUSICA[0], "", MUSICA[2]]] : [])]) {
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

for (const [clase, archivo, salida] of lista) {
  if (clase === "audio") {
    voz(archivo, salida);
    continue;
  }
  video(clase, archivo, salida);
  if (clase === "toma") voz(archivo, salida);
}

// La TARJETA OSCURA del cierre (plano `c12-cierre`): un PNG liso del negro de la marca. Hasta la revisión 5 lo que
// seguía a la última palabra de Isabella era el último fotograma de CT07 congelado (primero en un PNG, luego en un
// MP4); el usuario pidió que NO se congele: la imagen funde a negro y sigue este fondo oscuro con el logo y la web
// (`cierre-025.ts`). Es el mismo color al que funde la imagen (`LUXUR.color.negro`, #000000) y sobre negro puro el
// PNG y el fundido no se distinguen. 1296×2304 como los clips, para que el plano cubra el cuadro con su zoom.
const tarjeta = path.join(DESTINO, "cierre-oscuro.png");
if (!solo && (!fs.existsSync(tarjeta) || f.forzar)) {
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-f", "lavfi", "-i", "color=c=0x000000:s=1296x2304:r=1", "-frames:v", "1", "-pix_fmt", "rgb24", tarjeta], { check: true });
  log.ok(`${path.basename(tarjeta)} (negro liso 1296×2304, la tarjeta del cierre)`);
}

const wav = MUSICA ? path.join(DESTINO, `${MUSICA[1]}.wav`) : null;
if (!solo && wav && (!fs.existsSync(wav) || f.forzar)) {
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", path.join(ORIGEN, MUSICA[0]), "-map", "0:a:0", "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "2", wav], { check: true });
  log.ok(`${path.basename(wav)} (la canción entera, decodificada)`);
}
log.ok(`repuesto en ${relativa(DESTINO)}`);
