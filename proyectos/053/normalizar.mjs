#!/usr/bin/env node
/**
 * normalizar.mjs — repone `remotion/public/recorrido-053/` desde el material original.
 *
 *   node proyectos/053/normalizar.mjs            (lee de proyectos/053/original/)
 *   node proyectos/053/normalizar.mjs --forzar   (rehace aunque ya exista la salida)
 *   node proyectos/053/normalizar.mjs --solo ct05   (solo esos nombres de salida; no toca la música ni la tarjeta)
 *
 * PIEZA 053 · V35 · TIERRA GRATA BOSQUE SANTO (El Poblado), ARRIENDO: «¿PAGARÍAS $14.800.000?», la RÉPLICA de `videos editados/03.mp4` (el tercero de los tres vídeos que otro editor hizo el 15-sep con el material del 2-sep):
 * las mismas tomas en el mismo orden, SIN voz en off y con un guion nuevo EN PANTALLA (reparto §5c, cambio de encargo del 2026-10-20). Isabella caminando en el balcón (HK05, mudo, con su rótulo), el recorrido (RC10 · RC01 · RC22 · RC03 ·
 * RC05 · RC04 · RC16) con un rótulo por tramo y su CTA a cámara (CT05) con «Softly». Reparto en `proyectos/044/reparto-051-053.md`; material catalogado en `proyectos/044/catalogo-material.md`, de `Apartamento - Tierra Grata - Las Palmas/Videos/`.
 *
 * POR QUÉ EXISTE. El material es de la propiedad y de la presentadora y no entra en git: en el repo quedan esta receta, el plan y los sha256 de los originales. Con la carpeta delante, un clon repone la pieza entera. Es un
 * script de Node (con `ejecutar()` de `herramientas/comun.mjs`) y no un `.sh` porque el sistema pide recetas que corran igual en macOS y en Windows; la ÚNICA excepción declarada es la rama HDR (HLG → BT.709 con
 * VideoToolbox), que solo corre en macOS y lo dice si no (aquí no se usa: todo el material es SDR).
 *
 * DE DÓNDE SALEN LOS ARCHIVOS. Se copian del disco del rodaje a `proyectos/053/original/` con el CÓDIGO del catálogo como nombre y SIN ESPACIOS (nunca se monta desde Descargas). La columna «origen» de `MATERIAL` dice qué
 * archivo del disco es cada uno. Rellena el sha con `shasum -a 256 ARCHIVO | cut -c1-8`.
 *
 * ANTES DE TOCAR NADA, medido (R01, R19, R21; ffprobe del 2026-10-20):
 *   · **TODO el material (el recorrido, HK05 y CT05) es ANAMÓRFICO, no horizontal**: H.264 1920×1080 SDR BT.709 guardado con `sample_aspect_ratio=81:256` y `display_aspect_ratio=9:16`, es decir, VERTICALES de 608×1080 efectivos
 *     comprimidos a lo ancho; sin rotación, 30 fps (varios con `avg_frame_rate` irregular: `-fps_mode cfr` lo iguala). Se escalan ENTEROS: `scale=1296:2304:flags=lanczos,setsar=1`, SIN recorte (un `crop=608:1080` es un zoom ×3,2 y sale
 *     «pixelado»: lo rechazó el usuario en el 047, 2026-10-19). Salen algo más BLANDOS que Isabella en 4K: 608×1080 efectivos ×2,13;
 *   · el audio de cada toma: micro de solapa mono; sale en WAV PCM 48 kHz mono, SIN filtro ni nivel (la ganancia vive en el plan, R29) y en otro WAV con la voz TRATADA (abajo). WAV y no AAC: el AAC arrastra 1024 muestras de
 *     priming que desplazan la voz ~21 ms contra su imagen. El audio de los recorridos y el de HK05 (un chasquido de 0,75 s a −33 dB, medido) no se usan.
 *
 * CLASES de archivo, y cada una sale distinta:
 *   toma       la presentadora a cámara con voz → MP4 mudo + WAV con su voz + WAV con su voz tratada
 *   recorrido  planos de la propiedad (y los tramos mudos de las tomas de Isabella) → MP4 mudo (anamórficos: escalados enteros, `setsar=1`)
 *   (música)   la canción → WAV estéreo de 48 kHz decodificado ENTERO y NADA MÁS (ni loudnorm): el MP3 arrastra su retardo de códec y el corte al golpe se hace a la muestra sobre el WAV. Su `desde` sale de la medida de la pista y el
 *              nivel es una ganancia del plan.
 *
 * LA VOZ TRATADA (solo CT05). La voz llega a −20…−30 LUFS (ella habla a unos metros de un móvil) y con una cresta de ≈ 17-20 dB: con ganancia sola los picos saldrían a +5 dBFS. La cadena (`VOZ_TRATADA`) es la de la V13/V18/V22/V26: graves fuera,
 * puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada DESPUÉS del compresor (`herramientas/probar-voz.py --umbral 0.0316 --razon 3.5`) hasta −15,0 LUFS en su ventana de voz (el nivel de la música sola) y limitador a
 * −2,5 dBFS. Fuera de la ventana de voz el WAV tratado es SILENCIO. La puerta (`revisar-053.mjs`) vuelve a medirlo.
 *
 * Vídeo a 1296×2304 · 30 fps · SIN audio: 1296 = 1080 × 1,2, el techo del punch-in (criterio del 011).
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { ES_MAC, RAIZ, ejecutar, flags, log, relativa } from "../../herramientas/comun.mjs";

const ORIGEN = path.join(RAIZ, "proyectos", "053", "original");
const DESTINO = path.join(RAIZ, "remotion", "public", "recorrido-053");
const f = flags();
const solo = typeof f.solo === "string" ? new Set(f.solo.toLowerCase().split(",")) : null;

/**
 * clase · archivo en original/ · nombre de salida (sin extensión) · sha256 (8) del original · origen en el disco del rodaje.
 * El nombre de salida es el que usa el plan: `v("hk02")` → `recorrido-053/hk02.mp4` y `a("hk02")` → `hk02.wav` / `hk02-voz.wav`.
 *
 * (Los recorridos no se recortan: se escalan enteros, ver arriba.)
 */
const MATERIAL = [
  // La toma de Isabella con voz: el CTA (CT05, sentada en la silla de la sala, 2-sep; la misma toma cierra la 052). Voz de 1,31 a 4,07 s.
  ["toma", "ct05.mp4", "ct05", "5bc7d1a0", "5 Cta/Img 9501.mp4"],
  // Los planos MUDOS de la réplica, en el orden del original (cada uno identificado por búsqueda de fotogramas contra `03.mp4`, `proyectos/053/medidas/`): HK05 es Isabella caminando hacia cámara en el balcón (tramo mudo de
  // 4,9 a 8,0 s: la voz de 22,5-29,5 s es del hook del 051; en 5-7 s solo hay un chasquido de 0,75 s a −33 dB), y los recorridos, todos ANAMÓRFICOS.
  ["recorrido", "hk05.mp4", "hk05", "3bbed39e", "1 Hooks/Img 9508.mp4"],
  ["recorrido", "rc10.mp4", "rc10", "e7e4ee8b", "4 Recorrido/Img 9509.mp4"],
  ["recorrido", "rc01.mp4", "rc01", "9f23d5be", "4 Recorrido/Img 9461.mp4"],
  ["recorrido", "rc22.mp4", "rc22", "33ac8ce2", "4 Recorrido/Img 9538.mp4"],
  ["recorrido", "rc03.mp4", "rc03", "e5dd0f12", "4 Recorrido/Img 9464.mp4"],
  ["recorrido", "rc05.mp4", "rc05", "931b51dd", "4 Recorrido/Img 9477.mp4"],
  ["recorrido", "rc04.mp4", "rc04", "c6cd691d", "4 Recorrido/Img 9469.mp4"],
  ["recorrido", "rc16.mp4", "rc16", "7cdf817e", "4 Recorrido/Img 9525.mp4"],
];
/**
 * La canción: archivo en original/ · salida · sha256 (8) · origen (la biblioteca de música del repo, el MISMO archivo que reserva el registro de uso).
 * `null` si la pieza sale sin música (`HAY_MUSICA = false` en `audio-053.ts`).
 */
const MUSICA = [
  "musica-softly.mp3",
  "musica-053",
  "87d78dc2",
  "archivos/musica/Softly I Judah Earl & BRANDON BLACK #music #cinematic #orchestralmusic.mp3",
]; // cinematic orquestal, 3:45, Do mayor; reservada para la V35

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
    // Los recorridos (rotación 0) son anamórficos (SAR 81:256, DAR 9:16): `scale` a 1296×2304 + `setsar=1` los deja con su geometría correcta, SIN recorte.
    // Los DJI van a 29,97 fps: con `fps=30` solo, ffmpeg REPITE un fotograma cada 1001 (cada ≈ 33 s) y, si cae en el tramo de un plano, se ve una micro-parada.
    // Se reproducen un 0,1 % más rápido (`setpts=PTS*1000/1001`): cada fotograma de la fuente sale UNA vez; el `desde` del plan va en el tiempo nuevo (`dji()`).
    const retiempo = clase === "dron" && sondea(entrada, "stream=r_frame_rate") === "30000/1001" ? "setpts=PTS*1000/1001,fps=30," : "";
    args = ["-nostdin", "-y", "-v", "error", "-noautorotate", "-i", entrada, "-vf", `${giro ? `${giro},` : ""}scale=1296:2304:flags=lanczos,setsar=1,${retiempo}format=yuv420p`, ...comunes];
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

/** dB tras el compresor que dejan cada voz en −15,0 LUFS en su ventana (`herramientas/probar-voz.py`; la ventana de cada toma es la de `VENTANA_VOZ`). CT05 cruda mide −28,6 LUFS (+20,4 dB; el limitador quita 0,5 dB)(`probar-voz.py --umbral 0.0316 --razon 3.5`). */
const GANANCIA_VOZ_DB = { ct05: 20.4 };

/**
 * DÓNDE HABLA Isabella en cada toma, y hasta dónde se USA su voz: [primera sílaba, fin de SU frase], en segundos de la fuente, medidos por energía
 * (`limites-voz.py --margen 40`; R29). Fuera de esta ventana la voz tratada es SILENCIO: la compresión y la ganancia suben ≈ +17 dB cualquier ruido de la toma, y entre toma y toma el plan deja un hueco que, sin esto, sonaría con ese ruido de sala.
 * CT05: la voz empieza a 1,31 s («Si», una subida de −57 a −25 dB en 0,1 s) y acaba a 4,07 s («escríbenos»); la toma sigue hasta 7,2 s sin voz. El tercer número es lo que se deja sonar ANTES de la primera sílaba (el defecto, `VOZ_ANTES`).
 */
const VENTANA_VOZ = { ct05: [1.31, 4.07] };
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

for (const [clase, archivo, salida] of lista) {
  video(clase, archivo, salida);
  if (clase === "toma") {
    voz(archivo, salida);
    vozTratada(salida);
  }
}

// La TARJETA OSCURA del cierre (plano `c11-cierre`): un PNG liso del negro de la marca. Nada se congela: la imagen de Isabella funde a negro y sigue
// este fondo oscuro con el logo y la web (`cierre-053.ts`). Es el mismo color al que funde la imagen (`LUXUR.color.negro`, #000000) y sobre negro puro
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
