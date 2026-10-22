#!/usr/bin/env node
/**
 * normalizar.mjs — repone `remotion/public/recorrido-055/` desde el material original.
 *
 *   node proyectos/055/normalizar.mjs            (lee de proyectos/055/original/)
 *   node proyectos/055/normalizar.mjs --forzar   (rehace aunque ya exista la salida)
 *   node proyectos/055/normalizar.mjs --solo hk02,dr104   (solo esos nombres de salida; no toca la música ni la tarjeta)
 *
 * PIEZA 055 · V37 · CASA EN CONDOMINIO LOS BRAVOS (La Ceja): la SEGUNDA de las tres versiones de esta casa (054 = «privacidad», 056 = «solo 6 casas»), ángulo «LAS MAÑANAS»
 * (el aire puro del oriente antioqueño). Estructura del canal: DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA. Tomas de Isabella: HK02 (hook), MD03 (mitad) y CT03 (CTA),
 * la terna EXCLUSIVA que fija `proyectos/054/reparto-054-062.md`. Aérea: el ÚLTIMO TERCIO (68-103 s) de `DJI_…0070_D.MP4` (4K vertical, SDR, 29,97 fps, rotation=90). Los recorridos
 * (28 en el catálogo) pueden repetirse entre las tres versiones: aquí solo se normalizan los candidatos de ESTE hilo. La voz va TRATADA a −15 LUFS. Material de
 * `Casa - La Ceja/Videos/` (`1 Hooks`, `2 Mitad`, `3 Dron`, `4 Recorrido`, `5 Cta`).
 *
 * POR QUÉ EXISTE. El material es de la propiedad y de la presentadora y no entra en git: en el repo quedan esta receta, el plan y los sha256 de los
 * originales. Con la carpeta delante, un clon repone la pieza entera. Es un script de Node (con `ejecutar()` de `herramientas/comun.mjs`) y no un
 * `.sh` porque el sistema pide recetas que corran igual en macOS y en Windows; la ÚNICA excepción declarada es la rama HDR (HLG → BT.709 con
 * VideoToolbox), que solo corre en macOS y lo dice si no.
 *
 * DE DÓNDE SALEN LOS ARCHIVOS. Se copian del disco del rodaje a `proyectos/055/original/` con el CÓDIGO del registro (`archivos/musica/registro-de-uso.md`
 * §6) como nombre y SIN ESPACIOS (nunca se monta desde Descargas). La columna «origen» de `MATERIAL` dice qué archivo del disco es cada uno. Rellena el
 * sha con `shasum -a 256 ARCHIVO | cut -c1-8`.
 *
 * ANTES DE TOCAR NADA, medido (R01, R19, R21):
 *   · los MOV de un iPhone (Isabella y los recorridos): aquí son **H.264 SDR BT.709**, 1080×1920 VERTICALES NATIVOS (sin rotación, sin SAR raro), a 59,94/60 fps VARIABLES,
 *     con audio AAC (medido con ffprobe el 2026-10-22). No hay HDR: la rama de VideoToolbox no corre. Se pasan a 30 fps CFR por marca de tiempo (1 de cada 2);
 *   · el DJI (`DJI_…0070_D.MP4`): HEVC 8 bit **SDR** BT.709, 3840×2160 con `rotation=90` (vertical real de 2160×3840 al rotar), 29,97 fps, SIN audio y con una pista MJPEG
 *     de miniatura (por eso se mapea `0:v:0`). Tone-mapearlo lo estropearía: solo se rota (`transpose=cclock`) y se escala. Solo se normaliza el TRAMO que dice su
 *     sexta columna de `MATERIAL` ([desde, duración] en segundos de la fuente): aquí 68-103,27 s, el último tercio que el reparto da a esta versión. Los segundos del
 *     plan (`desde`) son los del ARCHIVO NORMALIZADO, que empieza en la fuente 68,0 s (fuente = 68 + t × 1001/1000).
 *   · el audio de cada toma: micro de solapa mono; sale en WAV PCM 48 kHz mono, SIN filtro ni nivel (la ganancia vive en el plan, R29) y en otro WAV con la
 *     voz TRATADA (abajo). WAV y no AAC: el AAC arrastra 1024 muestras de priming que desplazan la voz ~21 ms contra su imagen.
 *
 * CLASES de archivo, y cada una sale distinta:
 *   toma       la presentadora a cámara → MP4 mudo + WAV con su voz + WAV con su voz tratada
 *   recorrido  planos de la propiedad → MP4 mudo
 *   dron       planos del dron → MP4 mudo
 *   (música)   la canción → WAV estéreo de 48 kHz decodificado ENTERO y NADA MÁS (ni loudnorm): el MP3 arrastra su retardo de códec y el corte al golpe se
 *              hace a la muestra sobre el WAV. Su `desde` sale de la medida de la pista y el nivel es una ganancia del plan.
 *
 * LA VOZ TRATADA. Las voces llegan a −20…−25 LUFS (ella habla a unos metros de un iPhone) y con una cresta de ≈ 17-20 dB: con ganancia sola los picos
 * saldrían a +5 dBFS. La cadena (`VOZ_TRATADA`) es la de la V13/V18: graves fuera, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada DESPUÉS del
 * compresor (`herramientas/probar-voz.py --umbral 0.0316 --razon 3.5`) hasta −15,0 LUFS en su ventana de voz (el nivel de la música sola) y limitador a
 * −2,5 dBFS. Fuera de la ventana de voz el WAV tratado es SILENCIO. La puerta (`revisar-055.mjs`) vuelve a medirlo.
 *
 * LA TARJETA DEL CIERRE: `cierre-oscuro.png`, un negro liso (ver el final de este archivo). Nada se congela.
 *
 * Vídeo a 1296×2304 · 30 fps · SIN audio: 1296 = 1080 × 1,2, el techo del punch-in (criterio del 011).
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { ES_MAC, RAIZ, ejecutar, flags, log, relativa } from "../../herramientas/comun.mjs";

const ORIGEN = path.join(RAIZ, "proyectos", "055", "original");
const DESTINO = path.join(RAIZ, "remotion", "public", "recorrido-055");
const f = flags();
const solo = typeof f.solo === "string" ? new Set(f.solo.toLowerCase().split(",")) : null;

/**
 * clase · archivo en original/ · nombre de salida (sin extensión) · sha256 (8) del original · origen en el disco del rodaje · [solo el dron] tramo [desde, duración] de la fuente.
 * El nombre de salida es el que usa el plan: `v("hk02")` → `recorrido-055/hk02.mp4` y `a("hk02")` → `hk02.wav` / `hk02-voz.wav`.
 *
 * EL TRAMO del dron: el archivo normalizado es SOLO ese trozo de la fuente y su segundo 0 es el `desde` de esta columna. Sin tramo se normaliza el clip entero.
 * Los clips son todos verticales nativos o con rotación de 90° (no hay apaisados: ningún clip se recorta).
 */
const MATERIAL = [
  // Las tres tomas de Isabella (terna EXCLUSIVA del reparto): el hook, la mitad y el CTA.
  ["toma", "HK02.MOV", "hk02", "965526e3", "1 Hooks/IMG_8822.MOV"],
  ["toma", "MD03.MOV", "md03", "1dc37e37", "2 Mitad/IMG_8819.MOV"],
  ["toma", "CT03.MOV", "ct03", "cdeae776", "5 Cta/IMG_8914.MOV"],
  // Recorridos a pie (iPhone, sin gente). Se normalizan los candidatos del hilo «mañanas»; el plan usa los que midan bien (ver `metraje-055.ts`).
  ["recorrido", "RC01.MOV", "rc01", "e11fea99", "4 Recorrido/IMG_8826.MOV"],
  ["recorrido", "RC03.MOV", "rc03", "f2644048", "4 Recorrido/IMG_8833.MOV"],
  ["recorrido", "RC04.MOV", "rc04", "de0d915b", "4 Recorrido/IMG_8834.MOV"],
  ["recorrido", "RC07.MOV", "rc07", "cfaa449d", "4 Recorrido/IMG_8837.MOV"],
  ["recorrido", "RC08.MOV", "rc08", "f8d592fc", "4 Recorrido/IMG_8838.MOV"],
  ["recorrido", "RC09.MOV", "rc09", "83136ef2", "4 Recorrido/IMG_8839.MOV"],
  ["recorrido", "RC10.MOV", "rc10", "34b888ac", "4 Recorrido/IMG_8840.MOV"],
  ["recorrido", "RC14.MOV", "rc14", "9a9f78ef", "4 Recorrido/IMG_8857.MOV"],
  ["recorrido", "RC16.MOV", "rc16", "255ac157", "4 Recorrido/IMG_8859.MOV"],
  ["recorrido", "RC17.MOV", "rc17", "76da917c", "4 Recorrido/IMG_8860.MOV"],
  ["recorrido", "RC19.MOV", "rc19", "c760d5b7", "4 Recorrido/IMG_8862.MOV"],
  ["recorrido", "RC20.MOV", "rc20", "ae311715", "4 Recorrido/IMG_8887.MOV"],
  ["recorrido", "RC22.MOV", "rc22", "ce269797", "4 Recorrido/IMG_8889.MOV"],
  ["recorrido", "RC23.MOV", "rc23", "7a5be3dd", "4 Recorrido/IMG_8891.MOV"],
  ["recorrido", "RC24.MOV", "rc24", "4f2b0bca", "4 Recorrido/IMG_8892.MOV"],
  ["recorrido", "RC25.MOV", "rc25", "aadfe729", "4 Recorrido/IMG_8893.MOV"],
  ["recorrido", "RC26.MOV", "rc26", "18bb8e0c", "4 Recorrido/IMG_8919.MOV"],
  ["recorrido", "RC28.MOV", "rc28", "ad948f07", "4 Recorrido/IMG_8921.MOV"],
  // La aérea: el último tercio (68-103,27 s) de la toma larga del dron. Sexta columna: [desde, duración] de la FUENTE; el plan cuenta desde el principio del tramo.
  ["dron", "DR01.MP4", "dr70", "ff6d970d", "3 Dron/DJI_20260330163940_0070_D.MP4", [68, 35.3]],
];
/**
 * La canción: archivo en original/ · salida · sha256 (8) · origen (la biblioteca de música del repo, el MISMO archivo que reserva el registro de uso).
 * `null` si la pieza sale sin música (`HAY_MUSICA = false` en `audio-055.ts`).
 */
const MUSICA = [
  "musica-spring.mp3",
  "musica-055",
  "fe252090",
  "archivos/musica/Spring is Coming.mp3",
]; // neoclásico / ambient suave en Do menor, 2:02; reservada para la V37 (repetida de otra propiedad: autorizado por el usuario el 2026-10-21)
// piano cinematográfico sereno (La# mayor); reservada para la V25

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

/** La rotación de PANTALLA del archivo (R19): −90 en un iPhone vertical, 90 en el dron vertical, 0 si ya viene derecho. */
const rotacionDe = (abs) => Number(sondea(abs, "stream_side_data=rotation").split(/\s+/)[0] || 0);

function video(clase, archivo, salidaNombre, tramo) {
  const entrada = path.join(ORIGEN, archivo);
  const salida = path.join(DESTINO, `${salidaNombre}.mp4`);
  if (fs.existsSync(salida) && !f.forzar) {
    log.info(`${path.basename(salida)} ya está`);
    return;
  }
  const trc = sondea(entrada, "stream=color_transfer");
  const rot = rotacionDe(entrada);
  const hdr = trc === "arib-std-b67" || trc === "smpte2084";
  // Los DJI (y algunos MOV) son de 29,97 fps (30000/1001): con `-r 30` en CFR repiten UN fotograma cada ≈ 33 s (memoria `dji-2997-fotograma-repetido`). `setpts=PTS*1000/1001`
  // los deja a 30 fps exactos, 1 a 1. Las TOMAS de Isabella no lo llevan: su voz se midió contra ese video y es la misma de las versiones anteriores (MD03, CT04).
  const ntsc = sondea(entrada, "stream=r_frame_rate") === "30000/1001";
  const pts = ntsc && clase !== "toma" ? "setpts=PTS*1000/1001," : "";
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
      "-vf", `scale_vt=color_matrix=bt709:color_primaries=bt709:color_transfer=bt709${giro ? `,${giro}` : ""},hwdownload,format=p010le,${pts}scale=1296:2304:flags=lanczos,format=yuv420p`,
      ...comunes,
    ];
  } else {
    const giro = { [-90]: "transpose=clock", 90: "transpose=cclock", 0: "" }[rot];
    if (giro === undefined) {
      log.error(`${archivo}: rotación no prevista (${rot})`);
      process.exit(1);
    }
    // Aquí no hay apaisados sin rotación: si un clip sin rotación llegara más ancho que alto, la receta se niega (un recorte 9:16 sería una decisión de encuadre que nadie ha tomado).
    if (rot === 0 && Number(sondea(entrada, "stream=width")) > Number(sondea(entrada, "stream=height"))) {
      log.error(`${archivo}: apaisado y sin rotación; esta pieza no recorta (R19): mira el clip antes`);
      process.exit(1);
    }
    const corte = tramo ? ["-ss", String(tramo[0]), "-t", String(tramo[1])] : [];
    args = ["-nostdin", "-y", "-v", "error", "-noautorotate", ...corte, "-i", entrada, "-map", "0:v:0", "-vf", `${giro ? `${giro},` : ""}${pts}scale=1296:2304:flags=lanczos,format=yuv420p`, ...comunes];
  }
  ejecutar("ffmpeg", args, { check: true });
  log.ok(`${path.basename(salida)} (${clase}${hdr ? " · HLG → BT.709" : " · SDR"} · rotación ${rot}${tramo ? ` · tramo ${tramo[0]}+${tramo[1]} s` : ""})`);
}

function voz(archivo, salidaNombre) {
  const salida = path.join(DESTINO, `${salidaNombre}.wav`);
  if (fs.existsSync(salida) && !f.forzar) return;
  // Sin tocar: solo se decodifica a PCM. Ni filtro ni nivel (la ganancia vive en el plan).
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", path.join(ORIGEN, archivo), "-map", "0:a:0", "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "1", salida], { check: true });
  log.ok(`${path.basename(salida)} (la voz tal cual, mono 48 kHz)`);
}

/**
 * LA CADENA DE LA VOZ TRATADA. highpass → puerta suave → compresor → ganancia → limitador (la de la V13, que es la de la V9/V1/V2 con el
 * compresor más firme porque estas voces llegan a −21…−25 LUFS con una cresta de ≈ 19 dB):
 *   highpass 100 Hz   los golpes graves y el viento del micro del iPhone (aquí, un ruido grave de 0,4 s antes de «Si te gusta…»)
 *   agate             puerta SUAVE (−12 dB como mucho, ratio 2, umbral −45 dBFS): el ambiente entre frases no sube con la ganancia
 *   acompressor       3,5:1 desde −30 dBFS, ataque 4 ms, relevo 120 ms, rodilla 6 dB: cierra la cresta antes de subir
 *   volume            la ganancia de `GANANCIA_VOZ_DB`, buscada DESPUÉS del compresor hasta −15,0 LUFS en la ventana de voz
 *   alimiter          techo −2,5 dBFS (`latency=1`: compensa el ms de lookahead y la voz no se desfasa): lo que el compresor no alcanza
 */
const VOZ_TRATADA = (gananciaDb) =>
  [
    "highpass=f=100:poles=2",
    "agate=threshold=0.0056:ratio=2:range=0.25:attack=5:release=200",
    "acompressor=threshold=0.0316:ratio=3.5:attack=4:release=120:knee=6",
    `volume=${gananciaDb}dB`,
    "alimiter=limit=0.75:attack=1:release=60:level=disabled:latency=1",
  ].join(",");

/** dB tras el compresor que dejan cada voz en −15,0 LUFS en su ventana (`herramientas/probar-voz.py`; la ventana de cada toma es la de `VENTANA_VOZ`). */
const GANANCIA_VOZ_DB = { hk02: 18.0, md03: 19.0, ct03: 19.2 };

/**
 * DÓNDE HABLA Isabella en cada toma, y hasta dónde se USA su voz: [primera sílaba, fin de SU frase], en segundos de la fuente, medidos por energía
 * (`limites-voz.py --margen 40`: con el margen por defecto el suelo de ruido a −64 dB hace que casi todas «empiecen» en 0,00 s; R29). Fuera de esta
 * ventana la voz tratada es SILENCIO: la compresión y la ganancia suben ≈ +19 dB cualquier ruido de la toma (los chasquidos a −48/−55 dB de los 0,6 s
 * antes de «Si quieres…» en HK06, la cola de CT04 con 1,1 s sin voz), y entre toma y toma el plan deja un hueco que, sin esto, sonaría con ese ruido de sala.
 * (En estas tres tomas `limites-voz.py --margen 40` da 0,03 s en HK06 —esos chasquidos superan su umbral, porque el suelo es de −92 dB— y 0,95/0,49 s en las
 * otras; los inicios de abajo son los del perfil de energía a 20 ms, banda de voz: la primera subida a más de −40 dB.)
 * El tercer número es lo que se deja sonar ANTES de la primera sílaba (el defecto, `VOZ_ANTES`).
 */
const VENTANA_VOZ = { hk02: [0.675, 4.85], md03: [1.785, 4.25], ct03: [0.425, 2.95] };
/** Segundos de antes de la primera sílaba y de después del fin de la frase que se dejan sonar, y lo que dura cada fundido. */
const VOZ_ANTES = 0.07;
const VOZ_DESPUES = 0.05;
const VOZ_FUNDIDO_ENTRA = 0.03;
const VOZ_FUNDIDO_SALE = 0.05;

function vozTratada(salidaNombre) {
  const entrada = path.join(DESTINO, `${salidaNombre}.wav`);
  const salida = path.join(DESTINO, `${salidaNombre}-voz.wav`);
  if (fs.existsSync(salida) && !f.forzar) return;
  const ganancia = GANANCIA_VOZ_DB[salidaNombre];
  const ventana = VENTANA_VOZ[salidaNombre];
  if (ganancia === undefined || ventana === undefined) {
    // Una candidata que el plan no usa (o que aún no se ha medido) se queda con su voz cruda: la tratada sale cuando tenga su ventana y su ganancia.
    log.aviso(`${salidaNombre}: sin ganancia o sin ventana de voz en GANANCIA_VOZ_DB / VENTANA_VOZ; sin voz tratada`);
    return;
  }
  const a = Math.max(0, ventana[0] - (ventana[2] ?? VOZ_ANTES));
  const b = ventana[1] + VOZ_DESPUES;
  // La ventana se aplica como una ENVOLVENTE por muestra (`aeval`): silencio fuera, fundido de entrada y de salida dentro. El WAV
  // dura lo mismo que el crudo y sus segundos son los de la fuente, así que `desde` y `voz.s0/s1` del plan valen para los dos.
  const e = VOZ_FUNDIDO_ENTRA;
  const o = VOZ_FUNDIDO_SALE;
  const compuerta = `aeval='val(0)*if(lt(t,${a.toFixed(3)}),0,if(lt(t,${(a + e).toFixed(3)}),(t-${a.toFixed(3)})/${e},if(lt(t,${(b - o).toFixed(3)}),1,if(lt(t,${b.toFixed(3)}),(${b.toFixed(3)}-t)/${o},0))))':c=same`;
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", entrada, "-af", `${VOZ_TRATADA(ganancia)},${compuerta}`, "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "1", salida], { check: true });
  log.ok(`${path.basename(salida)} (la voz tratada: graves, puerta suave, compresión 3,5:1, +${ganancia} dB y limitador a −2,5 dBFS; solo suena de ${a.toFixed(2)} a ${b.toFixed(2)} s)`);
}

for (const [clase, archivo, salida, , , tramo] of lista) {
  video(clase, archivo, salida, tramo);
  if (clase === "toma") {
    voz(archivo, salida);
    vozTratada(salida);
  }
}

// La TARJETA OSCURA del cierre (plano `c11-cierre`): un PNG liso del negro de la marca. Nada se congela: la imagen de Isabella funde a negro y sigue
// este fondo oscuro con el logo y la web (`cierre-055.ts`). Es el mismo color al que funde la imagen (`LUXUR.color.negro`, #000000) y sobre negro puro
// el PNG y el fundido no se distinguen. 1296×2304 como los clips, para que el plano cubra el cuadro con su zoom.
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
