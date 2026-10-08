#!/usr/bin/env node
/**
 * normalizar.mjs — repone `remotion/public/recorrido-029/` desde el material original.
 *
 *   node proyectos/029/normalizar.mjs            (lee de proyectos/029/original/)
 *   node proyectos/029/normalizar.mjs --forzar   (rehace aunque ya exista la salida)
 *
 * PIEZA 029 · V13 · CASA CAMPESTRE GUARNE (Duglas Yovana). Se monta SOLO con las 19 tomas de `5 Cta`, que son
 * CLIPS 16:9 (1080p a 60/59,94 fps o 4K a 30 fps), SDR BT.709, sin rotación y con la voz de Isabella dentro. El
 * reel es 9:16: lo que hace distinto a este `normalizar.mjs` del de las otras piezas es el ENCUADRE.
 *
 * EL ENCUADRE (pedido del usuario: «están en 16:9, necesito encuadrarlos en 9:16»). De cada fotograma apaisado solo
 * cabe una franja del 31,6 % del ancho a altura completa. La franja SIGUE a Isabella: sus claves (el borde izquierdo
 * de la ventana cada 0,25 s) salen de `proyectos/029/encuadre-029.json`, que calcula `herramientas/encuadre.py` desde
 * las medidas de Vision (`herramientas/seguir-sujeto.swift`: cara y cuerpo, 5 fotogramas por segundo, local). Aquí
 * solo se convierten en la expresión del filtro `crop`. El resultado es un clip VERTICAL de 1296×2304 como los del
 * resto de las piezas, y el plan (`metraje-029.ts`) lo trata igual: zoom, color, disolvencias.
 *   · 4K (3840×2160): la franja mide 1214×2160 y sube un 6,7 % a 1296×2304 (a 1080×1920 de la entrega, baja un 11 %): sobra nitidez.
 *   · 1080p (1920×1080): la franja mide 608×1080 y sube ×2,13. Es lo que da el material; se compensa con un
 *     realce suave (`unsharp`), que sin él el lanczos se ve blando. El zoom del plan en estos clips se queda en ≤ 1,08.
 *
 * UN SOLO FPS. Los clips de 60 fps pasan a 30 quitando un fotograma de cada dos; los de 59,94 igual. Los 4K ya son 30.
 * LA APERTURA es la excepción: se hace a CÁMARA LENTA REAL (×0,5) con los 60 fps de la fuente, sin quitar ninguno ni
 * mezclar fotogramas, así que cada fotograma de la fuente es uno de la salida y se ve el paso de ella en suavidad.
 *
 * LA VOZ. Cada toma sale en DOS WAV (48 kHz mono, PCM, el AAC arrastra 1024 muestras de priming): `<toma>.wav` tal
 * cual y `<toma>-voz.wav` TRATADA (pedido del usuario: «sube la voz sin saturar»). Las voces de `5 Cta` llegan muy bajas
 * (−27 a −31 LUFS: ella habla a varios metros de un iPhone) y con una cresta de ≈ 17-20 dB; con ganancia sola los picos
 * saldrían a +5 dBFS. La cadena (`VOZ_TRATADA`) es la de la V9/V1/V2 con un compresor más firme (umbral −30 dBFS, 3,5:1)
 * y la ganancia de cada toma se BUSCA después del compresor (`herramientas/probar-voz.py`), hasta −15,0 LUFS en su ventana
 * de voz: el nivel de la música sola. Mide cuánto quita el limitador (≤ 1 dB salvo en la alcoba, 3,7) y el pico real
 * (≤ −2,5 dBFS). La puerta (`revisar-029.mjs`) vuelve a medirlo sobre estos archivos.
 *
 * LA MÚSICA: WAV estéreo de 48 kHz decodificado ENTERO y nada más (ni `loudnorm`). La tarjeta del cierre: un negro liso.
 * Vídeo a 1296×2304 (1080 × 1,2: el techo del punch-in) · 30 fps · SIN audio.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { RAIZ, ejecutar, flags, log, relativa } from "../../herramientas/comun.mjs";

const ORIGEN = path.join(RAIZ, "proyectos", "029", "original");
const DESTINO = path.join(RAIZ, "remotion", "public", "recorrido-029");
const ENCUADRES = JSON.parse(fs.readFileSync(path.join(RAIZ, "proyectos", "029", "encuadre-029.json"), "utf8"));
const f = flags();

/**
 * clase · archivo en original/ · nombre de salida (sin extensión) · sha256 (8) del original · origen en el disco del rodaje
 * (`/Volumes/SSK SSD/Work/Propiedades Luxur/Casa Campestre - Duglas Yovana/Videos/`).
 *   apertura   los primeros segundos MUDOS de una toma, a cámara lenta → MP4 mudo (sin voz)
 *   toma       Isabella a cámara → MP4 mudo + WAV con su voz + WAV con su voz tratada
 */
const MATERIAL = [
  ["apertura", "IMG_9426.MOV", "apertura", "2338f1f0", "5 Cta/IMG_9426.MOV"],
  ["toma", "IMG_9516.MOV", "ct14", "06269bc3", "5 Cta/IMG_9516.MOV"],
  ["toma", "IMG_9436.MOV", "ct07", "0d36378c", "5 Cta/IMG_9436.MOV"],
  ["toma", "IMG_9411.MOV", "ct01", "b940ac4a", "5 Cta/IMG_9411.MOV"],
  ["toma", "IMG_9441.MOV", "ct09", "deeefbc2", "5 Cta/IMG_9441.MOV"],
  ["toma", "IMG_9524.MOV", "ct16", "b02b1498", "5 Cta/IMG_9524.MOV"],
  ["toma", "IMG_9531.MOV", "ct18", "0da4c156", "5 Cta/IMG_9531.MOV"],
];
/** La canción: archivo en original/ · salida · sha256 (8) · origen. Es la de `archivos/musica/` (el MISMO archivo que reserva el registro de uso). */
const MUSICA = ["musica-029.mp3", "musica-029", "aed6a3a3", "archivos/musica/Aleksey Chistilin - Pictures from the Past.mp3"];

/** Segundos de la fuente que se codifican de la APERTURA: hasta justo antes de que Isabella empiece a hablar (0,98 s). A ×0,5 son 60 fotogramas. */
const APERTURA_FUENTE_S = 1.0;

const sha8 = (archivo) => crypto.createHash("sha256").update(fs.readFileSync(archivo)).digest("hex").slice(0, 8);
const sondea = (archivo, entradas, selector = "v:0") =>
  ejecutar("ffprobe", ["-v", "error", "-select_streams", selector, "-show_entries", entradas, "-of", "default=nw=1:nk=1", archivo], { check: true }).stdout.trim();

if (!fs.existsSync(ORIGEN)) {
  log.error(`no existe ${relativa(ORIGEN)}: copia ahí el material del rodaje (ver la columna «origen» de este archivo)`);
  process.exit(1);
}
fs.mkdirSync(DESTINO, { recursive: true });

// Identidad ANTES de gastar minutos de codificación: otro archivo con el mismo nombre montaría un vídeo distinto en silencio.
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

/** La expresión de `x` del filtro `crop`: interpolación lineal entre las claves [t, borde izquierdo (fracción del ancho)]. */
function expresionX(claves) {
  let e = String(claves[claves.length - 1][1]);
  for (let i = claves.length - 2; i >= 0; i--) {
    const [t0, x0] = claves[i];
    const [t1, x1] = claves[i + 1];
    e = `if(lt(t,${t1}),${x0}+(${x1}-${x0})*(t-${t0})/${t1 - t0},${e})`;
  }
  return e;
}

function video(clase, archivo, salidaNombre) {
  const entrada = path.join(ORIGEN, archivo);
  const salida = path.join(DESTINO, `${salidaNombre}.mp4`);
  if (fs.existsSync(salida) && !f.forzar) {
    log.info(`${path.basename(salida)} ya está`);
    return;
  }
  const [ancho, alto] = sondea(entrada, "stream=width,height").split(/\s+/).map(Number);
  const rot = Number(sondea(entrada, "stream_side_data=rotation").split(/\s+/)[0] || 0);
  const trc = sondea(entrada, "stream=color_transfer");
  if (rot !== 0 || trc === "arib-std-b67" || trc === "smpte2084" || ancho / alto < 1.7) {
    log.error(`${archivo}: se esperaba un 16:9 sin rotación y en SDR (rotación ${rot}, ${trc}, ${ancho}×${alto}); esta receta no lo trata`);
    process.exit(1);
  }
  const clip = path.basename(archivo, path.extname(archivo));
  const encuadre = ENCUADRES[clip];
  if (!encuadre) {
    log.error(`${clip}: sin encuadre en encuadre-029.json (uv run proyectos/029/herramientas/encuadre.py)`);
    process.exit(1);
  }
  // La ventana: 9:16 a altura COMPLETA (ancho par, que yuv420p lo pide).
  const ow = 2 * Math.floor((alto * 9) / 32);
  const x = `clip((${expresionX(encuadre.claves)})*iw,0,iw-${ow})`;
  const realce = alto <= 1080 ? ",unsharp=5:5:0.55:5:5:0.0" : "";
  const filtros = [`crop=${ow}:${alto}:x='${x}':y=0`, `scale=1296:2304:flags=lanczos${realce}`];
  const entradaArgs = ["-nostdin", "-y", "-v", "error", "-noautorotate"];
  const comunes = [
    "-an", "-fps_mode", "cfr", "-r", "30", "-c:v", "libx264", "-preset", "slow", "-crf", "17", "-pix_fmt", "yuv420p",
    "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-movflags", "+faststart", salida,
  ];
  let args;
  if (clase === "apertura") {
    // Cámara lenta REAL: los fotogramas de la fuente (60 fps) se estiran al doble y salen a 30 fps, uno por uno.
    args = [...entradaArgs, "-t", String(APERTURA_FUENTE_S), "-i", entrada, "-vf", [...filtros, "setpts=2.0*PTS", "fps=30"].join(","), ...comunes];
  } else {
    // Los 60 y 59,94 fps pasan a 30 quitando un fotograma de cada dos; los 4K ya van a 30.
    args = [...entradaArgs, "-i", entrada, "-vf", [...filtros, "fps=30"].join(","), ...comunes];
  }
  ejecutar("ffmpeg", args, { check: true });
  log.ok(`${path.basename(salida)} (${clase} · ${ancho}×${alto} → ventana ${ow}×${alto} que sigue a Isabella → 1296×2304${clase === "apertura" ? " · cámara lenta ×0,5" : ""})`);
}

function voz(archivo, salidaNombre) {
  const salida = path.join(DESTINO, `${salidaNombre}.wav`);
  if (fs.existsSync(salida) && !f.forzar) return;
  // Sin tocar: solo se decodifica a PCM. Ni filtro ni nivel.
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", path.join(ORIGEN, archivo), "-map", "0:a:0", "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "1", salida], { check: true });
  log.ok(`${path.basename(salida)} (la voz tal cual, mono 48 kHz)`);
}

/**
 * LA CADENA DE LA VOZ TRATADA. highpass → puerta suave → compresor → ganancia → limitador (la de la V9/V1/V2 de Los Patios, con el
 * compresor más firme porque estas voces llegan a −27…−31 LUFS):
 *   highpass 100 Hz   los golpes graves y el viento del micro del iPhone; una voz femenina no baja de ahí
 *   agate             puerta SUAVE (−12 dB como mucho, ratio 2, umbral −45 dBFS): el ambiente entre frases no sube con la ganancia
 *   acompressor       3,5:1 desde −30 dBFS, ataque 4 ms, relevo 120 ms, rodilla 6 dB: cierra la cresta (≈ 17-20 dB) antes de subir
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
const GANANCIA_VOZ_DB = { ct14: 19.6, ct07: 20.4, ct01: 20.8, ct09: 19.6, ct16: 21.9, ct18: 21.0 };

/**
 * DÓNDE HABLA Isabella en cada toma, y hasta dónde se USA su voz: [primera sílaba, fin de SU frase], en segundos de la fuente,
 * medidos por energía (`limites-voz.py` y `envolvente-voz.py`; R29). Fuera de esta ventana la voz tratada es SILENCIO: en
 * `5 Cta` Isabella dice la frase y, casi sin pausa, empieza otra que aquí no entra («y se acabará…» tras «la infancia pasa
 * rápido» a 0,3 s; «haz clic en el enlace…» tras cada frase corta), y entre toma y toma el plan deja 0,8 s de hueco que, sin
 * esto, sonarían con esa frase, con una respiración (ct01, a −33 dB a 0,09 s de la primera palabra) o con 20 dB más de ruido de
 * sala que la voz tenía. Se apaga también, a propósito, el aire de antes y de después: la música lo cubre y un hueco con y sin
 * ruido de sala que va y viene se oiría más que la música.
 */
const VENTANA_VOZ = { ct14: [0.94, 2.4], ct07: [0.755, 2.88], ct01: [0.75, 3.3], ct09: [0.67, 2.66], ct16: [0.45, 2.92], ct18: [0.495, 7.39] };
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
    log.error(`${salidaNombre}: sin ganancia o sin ventana de voz en GANANCIA_VOZ_DB / VENTANA_VOZ`);
    process.exit(1);
  }
  const a = Math.max(0, ventana[0] - VOZ_ANTES);
  const b = ventana[1] + VOZ_DESPUES;
  // La ventana se aplica como una ENVOLVENTE por muestra (`aeval`): silencio fuera, fundido de entrada y de salida dentro. El WAV
  // dura lo mismo que el crudo y sus segundos son los de la fuente, así que `desde` y `voz.s0/s1` del plan valen para los dos.
  const e = VOZ_FUNDIDO_ENTRA;
  const o = VOZ_FUNDIDO_SALE;
  const compuerta = `aeval='val(0)*if(lt(t,${a.toFixed(3)}),0,if(lt(t,${(a + e).toFixed(3)}),(t-${a.toFixed(3)})/${e},if(lt(t,${(b - o).toFixed(3)}),1,if(lt(t,${b.toFixed(3)}),(${b.toFixed(3)}-t)/${o},0))))':c=same`;
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", entrada, "-af", `${VOZ_TRATADA(ganancia)},${compuerta}`, "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "1", salida], { check: true });
  log.ok(`${path.basename(salida)} (la voz tratada: graves, puerta suave, compresión 3,5:1, +${ganancia} dB y limitador a −2,5 dBFS; solo suena de ${a.toFixed(2)} a ${b.toFixed(2)} s)`);
}

for (const [clase, archivo, salida] of MATERIAL) {
  video(clase, archivo, salida);
  if (clase === "toma") {
    voz(archivo, salida);
    vozTratada(salida);
  }
}

// La TARJETA OSCURA del cierre: un PNG liso del negro de la marca (`LUXUR.color.negro`, #000000). Nada se congela: la imagen de
// Isabella funde a negro y sigue este fondo con el logo y la web (`cierre-029.ts`). 1296×2304 como los clips.
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
