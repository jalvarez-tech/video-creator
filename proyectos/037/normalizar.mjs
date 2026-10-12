#!/usr/bin/env node
/**
 * normalizar.mjs — repone `remotion/public/recorrido-037/` desde el material original.
 *
 *   node proyectos/037/normalizar.mjs            (lee de proyectos/037/original/)
 *   node proyectos/037/normalizar.mjs --forzar   (rehace aunque ya exista la salida)
 *
 * PIEZA 037 · V20 · CASA CAMPESTRE GUARNE (Duglas Yovana), quinto reel de la casa (antes, el 029, el 032, el 033 y, en otra sesión, el 036). Estructura del canal:
 * DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA, con el hilo del ERROR (comprar mal un campestre): DR71 · HK08 (IMG_9418, el hook) · RC01 · RC28 · MD10
 * (IMG_9528) · RC13 · DR82 · CT08 (IMG_9437, el CTA). La receta es la del 033 (la del 029 con el encuadre por Vision y la voz tratada) más tres cosas propias: el tapado
 * de las placas del hook (`TAPAR`), la ganancia fija de la canción (`MUSICA_PRE_DB`) y el borde superior móvil de la ventana del hook (`encuadre.py`, `arriba_min`).
 * El material es de la propiedad y de la presentadora y no entra en el repositorio: aquí quedan la receta y los sha256 de los originales.
 *
 * TODO EL MATERIAL ES 16:9 y 4K (el dron, los recorridos y las tomas de Isabella: 3840×2160 a 30 fps; el dron, a 29,97), SDR BT.709, sin
 * rotación. El reel es 9:16: lo que hace distinto a este `normalizar.mjs` del de las otras piezas es el ENCUADRE.
 *
 * EL ENCUADRE (pedido del usuario: «están en 16:9, necesito encuadrarlos en 9:16»). De cada fotograma apaisado solo cabe una franja del 31,6 %
 * del ancho a altura completa. Sus claves salen de `proyectos/037/encuadre-037.json`, que calcula `herramientas/encuadre.py`:
 *   · en las tomas de Isabella, la ventana la SIGUE (Vision de Apple: `herramientas/seguir-sujeto.swift`, cara y cuerpo a 5 fotogramas por
 *     segundo, local, sin descargas) con zona muerta y tope de velocidad; en el hook (HK08, 4K), donde ella sale pequeña (la cara al 4 % del
 *     alto), la ventana se CIERRA (60 % del alto) y la sigue también en vertical; en la mitad y el CTA, planos medios de ella, va a altura completa;
 *   · en el dron y en los recorridos, que no tienen a quién seguir, la ventana va a mano (`MANUAL` de `encuadre.py`, elegida mirando cuatro
 *     ventanas de prueba por clip).
 * Aquí solo se convierten en la expresión del filtro `crop`. El resultado es un clip VERTICAL de 1296×2304 como los del resto de las piezas, y el
 * plano (`metraje-037.ts`) lo trata igual: zoom, color, disolvencias.
 *   · 4K (3840×2160) a altura completa: la franja mide 1214×2160 y sube un 6,7 % a 1296×2304 (a 1080×1920 de la entrega, baja un 11 %).
 *   · 1080p: la franja mide 606×1080 y sube ×2,13; se compensa con un realce suave (`unsharp`). El zoom del plan en estos clips se queda en ≤ 1,08.
 *
 * UN SOLO FPS. Los clips de 60 y 59,94 fps pasan a 30 quitando un fotograma de cada dos; los de 29,97 y 31,58 (dos recorridos) pasan a 30 CFR.
 *
 * LA VOZ. Cada toma de Isabella sale en DOS WAV (48 kHz mono, PCM; el AAC arrastra 1024 muestras de priming): `<toma>.wav` tal cual y
 * `<toma>-voz.wav` TRATADA (pedido del usuario: «sube la voz sin saturar»). Las voces llegan muy bajas (−27 a −32 LUFS: ella habla a varios
 * metros de un iPhone; en la V20, −26,0 · −29,2 · −26,8 LUFS) y con una cresta de ≈ 17-20 dB; con ganancia sola los picos saldrían a +5 dBFS. La cadena (`VOZ_TRATADA`) es la de la
 * V9/V1/V2 con un compresor más firme (umbral −30 dBFS, 3,5:1) y la ganancia de cada toma se BUSCA después del compresor
 * (`herramientas/probar-voz.py`), hasta −15,0 LUFS en su ventana de voz: el nivel de la música sola. La puerta (`revisar-037.mjs`) vuelve a medirlo.
 *
 * LA MÚSICA: WAV estéreo de 48 kHz decodificado ENTERO, con una ganancia fija de +4 dB (`MUSICA_PRE_DB`: *Familiar* es una pista quieta) y nada más (ni `loudnorm`). La tarjeta del cierre: un negro liso.
 * Vídeo a 1296×2304 (1080 × 1,2: el techo del punch-in) · 30 fps · SIN audio.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { RAIZ, ejecutar, flags, log, relativa } from "../../herramientas/comun.mjs";

const ORIGEN = path.join(RAIZ, "proyectos", "037", "original");
const DESTINO = path.join(RAIZ, "remotion", "public", "recorrido-037");
const ENCUADRES = JSON.parse(fs.readFileSync(path.join(RAIZ, "proyectos", "037", "encuadre-037.json"), "utf8"));
const f = flags();

/**
 * clase · archivo en original/ · nombre de salida (sin extensión) · sha256 (8) del original · origen en el disco del rodaje
 * (`/Volumes/SSK SSD/Work/Propiedades Luxur/Casa Campestre - Duglas Yovana/Videos/`). Los códigos (DR · HK · RC · MD · CT) son los de
 * `archivos/musica/registro-de-uso.md` §5: el orden alfabético de cada carpeta.
 *   dron       un vuelo del DJI → MP4 mudo
 *   recorrido  un plano de la casa sin nadie hablando → MP4 mudo
 *   toma       Isabella a cámara → MP4 mudo + WAV con su voz + WAV con su voz tratada
 */
const MATERIAL = [
  ["dron", "DJI_20260414173037_0071_D.MP4", "dr71", "4006a696", "3 Dron/DJI_20260414173037_0071_D.MP4"],
  ["toma", "IMG_9418.MOV", "hk08", "61987c44", "1 Hooks/IMG_9418.MOV"],
  ["recorrido", "IMG_9430.MOV", "rc01", "29a1ecfb", "4 Recorrido/IMG_9430.MOV"],
  ["recorrido", "IMG_9510.MOV", "rc28", "14d26e07", "4 Recorrido/IMG_9510.MOV"],
  ["toma", "IMG_9528.MOV", "md10", "71e2afc2", "2 Mitad/IMG_9528.MOV"],
  ["recorrido", "IMG_9477.MOV", "rc13", "e8cf3375", "4 Recorrido/IMG_9477.MOV"],
  ["dron", "DJI_20260414173650_0082_D.MP4", "dr82", "34b3be47", "3 Dron/DJI_20260414173650_0082_D.MP4"],
  ["toma", "IMG_9437.MOV", "ct08", "777150f2", "5 Cta/IMG_9437.MOV"],
];
/** La canción: archivo en original/ · salida · sha256 (8) · origen. Es la de `archivos/musica/` (el MISMO archivo que reserva el registro de uso). */
/** Ganancia fija de la canción al decodificarla (dB). Ver el comentario del paso de la música. */
const MUSICA_PRE_DB = 4;
const MUSICA = ["musica-037.mp3", "musica-037", "5ef30490", "archivos/musica/Nils Frahm - Familiar.mp3"];

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

/** La expresión de una coordenada del filtro `crop`: interpolación lineal entre las claves [t, x, y] (`k` = 1 para x, 2 para y). */
function expresion(todas, k) {
  // Se quitan las claves que caen en la recta de sus vecinas: el evaluador de ffmpeg no admite más de ≈ 100 `if` anidados y una ventana fija
  // de 27 s (el DR76) trae 108 claves iguales. La trayectoria resultante es la misma.
  const claves = todas.filter((c, i) => {
    if (i === 0 || i === todas.length - 1) return true;
    const [a, b] = [todas[i - 1], todas[i + 1]];
    const recta = a[k] + ((b[k] - a[k]) * (c[0] - a[0])) / (b[0] - a[0]);
    return Math.abs(c[k] - recta) > 1e-4;
  });
  let e = String(claves[claves.length - 1][k]);
  for (let i = claves.length - 2; i >= 0; i--) {
    const [t0, v0] = [claves[i][0], claves[i][k]];
    const [t1, v1] = [claves[i + 1][0], claves[i + 1][k]];
    e = `if(lt(t,${t1}),${v0}+(${v1}-${v0})*(t-${t0})/${t1 - t0},${e})`;
  }
  return e;
}

/**
 * PLACAS TAPADAS (pedido del usuario: «que no entren placas de carros»). El hook (IMG_9418) se graba frente al garaje y las dos placas amarillas que hay
 * a su lado —la «1GR-336» del Mini y la «NGX-490» de la camioneta— se leen a 4K y la acompañan todo el tramo (el Mini queda a ≈ 0,05 del ancho de ella
 * porque la cámara se desliza al mismo paso que ella): ninguna ventana 9:16 que la siga las deja fuera. Se difuminan con un recuadro que las SIGUE
 * (claves [t, cx, cy] en fracciones del cuadro apaisado, origen arriba a la izquierda, medidas sobre recortes al 100 % con
 * `herramientas/recortes.py`); `ancho` y `alto` son el tamaño del recuadro (una placa mide ≈ 0,017 × 0,016) y `radio` el del desenfoque.
 * Sin esto no hay forma limpia de usar este clip: es la única toma del reel con ese problema y se declara en la entrega.
 */
const TAPAR = {
  IMG_9418: {
    ancho: 0.034,
    alto: 0.040,
    radio: 14,
    sitios: [
      // la placa del Mini
      [[0.0, 0.384, 0.581], [0.5, 0.397, 0.579], [1.4, 0.425, 0.570], [2.3, 0.472, 0.579], [3.0, 0.491, 0.597], [3.6, 0.508, 0.626], [4.2, 0.523, 0.655], [4.4, 0.528, 0.665]],
      // la placa de la camioneta (Ford Ranger)
      [[0.0, 0.262, 0.620], [0.9, 0.285, 0.617], [2.3, 0.352, 0.607], [3.0, 0.385, 0.630], [3.6, 0.392, 0.655], [4.2, 0.415, 0.685], [4.4, 0.421, 0.693]],
    ],
  },
};

/** El tramo de filtro que difumina los recuadros de `TAPAR`; acaba en la etiqueta de la imagen tapada, a la que sigue el resto de la cadena. */
function tapaPlacas(t, ancho, alto) {
  const w = 2 * Math.round((t.ancho * ancho) / 2);
  const h = 2 * Math.round((t.alto * alto) / 2);
  const n = t.sitios.length;
  const partes = [`split=${n + 1}[o0]${t.sitios.map((_, i) => `[b${i}]`).join("")}`];
  t.sitios.forEach((claves, i) => {
    const x = `clip((${expresion(claves, 1)})*iw-${w / 2},0,iw-${w})`;
    const y = `clip((${expresion(claves, 2)})*ih-${h / 2},0,ih-${h})`;
    partes.push(`[b${i}]crop=${w}:${h}:x='${x}':y='${y}',boxblur=${t.radio}:3[p${i}]`);
    // `overlay` no conoce iw/ih: el cuadro de fondo se llama W y H.
    partes.push(`[o${i}][p${i}]overlay=x='${x.replaceAll("iw", "W")}':y='${y.replaceAll("ih", "H")}':eval=frame[o${i + 1}]`);
  });
  return `${partes.join(";")};[o${n}]`;
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
    log.error(`${clip}: sin encuadre en encuadre-037.json (uv run proyectos/037/herramientas/encuadre.py)`);
    process.exit(1);
  }
  // La ventana: 9:16, de la altura que diga el encuadre (1 = completa), con el alto y el ancho pares (yuv420p lo pide).
  const oh = 2 * Math.round((alto * encuadre.alto) / 2);
  const ow = 2 * Math.floor((oh * 9) / 32);
  const x = `clip((${expresion(encuadre.claves, 1)})*iw,0,iw-${ow})`;
  const y = encuadre.alto < 1 ? `clip((${expresion(encuadre.claves, 2)})*ih,0,ih-${oh})` : "0";
  const realce = oh <= 1080 ? ",unsharp=5:5:0.55:5:5:0.0" : "";
  const filtros = [`crop=${ow}:${oh}:x='${x}':y='${y}'`, `scale=1296:2304:flags=lanczos${realce}`, "fps=30"];
  const mascara = TAPAR[clip] ? tapaPlacas(TAPAR[clip], ancho, alto) : "";
  const args = [
    "-nostdin", "-y", "-v", "error", "-noautorotate", "-i", entrada, "-vf", mascara + filtros.join(","),
    "-an", "-fps_mode", "cfr", "-r", "30", "-c:v", "libx264", "-preset", "slow", "-crf", "17", "-pix_fmt", "yuv420p",
    "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-movflags", "+faststart", salida,
  ];
  ejecutar("ffmpeg", args, { check: true });
  log.ok(`${path.basename(salida)} (${clase} · ${ancho}×${alto} → ventana ${ow}×${oh} → 1296×2304)`);
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
const GANANCIA_VOZ_DB = { hk08: 19.7, md10: 20.9, ct08: 19.3 };

/**
 * DÓNDE HABLA Isabella en cada toma, y hasta dónde se USA su voz: [primera sílaba, fin de SU frase], en segundos de la fuente,
 * medidos por energía (`limites-voz.py` y `envolvente-voz.py`; R29). Fuera de esta ventana la voz tratada es SILENCIO: el WAV tratado sube
 * la voz ≈ +20 dB y con ella cualquier respiración, clic o frase que la toma traiga antes o después (en `5 Cta` Isabella sigue, casi sin
 * pausa, con otra frase; en la V17, MD06 lleva un golpe y una respiración entre 0,22 y 0,28 s, antes de su primera sílaba en 0,865, y CT18
 * sigue tras «…su visita» con «Puede ser virtual o presencial», que esta versión RECORTA en la pausa de 5,65-5,84 s), y entre toma y toma el
 * plan deja un hueco que, sin
 * esto, sonaría con ese ruido de sala. La música lo cubre y un hueco con y sin ruido de sala que va y viene se oiría más que la música.
 * El tercer número es lo que se deja sonar ANTES de la primera sílaba (el defecto, `VOZ_ANTES`).
 */
const VENTANA_VOZ = { hk08: [0.83, 3.48], md10: [0.975, 6.27], ct08: [1.79, 5.6] };
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

for (const [clase, archivo, salida] of MATERIAL) {
  video(clase, archivo, salida);
  if (clase === "toma") {
    voz(archivo, salida);
    vozTratada(salida);
  }
}

// La TARJETA OSCURA del cierre: un PNG liso del negro de la marca (`LUXUR.color.negro`, #000000). Nada se congela: la imagen de
// Isabella funde a negro y sigue este fondo con el logo y la web (`cierre-037.ts`). 1296×2304 como los clips.
const tarjeta = path.join(DESTINO, "cierre-oscuro.png");
if (!fs.existsSync(tarjeta) || f.forzar) {
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-f", "lavfi", "-i", "color=c=0x000000:s=1296x2304:r=1", "-frames:v", "1", "-pix_fmt", "rgb24", tarjeta], { check: true });
  log.ok(`${path.basename(tarjeta)} (negro liso 1296×2304, la tarjeta del cierre)`);
}

const wav = path.join(DESTINO, `${MUSICA[1]}.wav`);
if (!fs.existsSync(wav) || f.forzar) {
  // *Familiar* es una pista QUIETA (−20 a −24 LUFS, picos de −7,5 dBFS): para dejarla a −15 LUFS en los recorridos el plan tendría que subirla +6,5…+9 dB y el
  // tope del motor es +6 (`GANANCIA_MAXIMA` de `tramos.ts`: más ya no es igualar, es fabricar nivel). Se le da UNA ganancia fija aquí, declarada, con un limitador
  // que no toca nada (el pico pasa de −7,5 a −3,5 dBFS) y el resto lo hace el plan. Es lo único que se le hace a la canción: ni `loudnorm` ni compresión.
  const filtro = MUSICA_PRE_DB ? ["-af", `volume=${MUSICA_PRE_DB}dB,alimiter=limit=0.95:attack=5:release=50:level=disabled`] : [];
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", path.join(ORIGEN, MUSICA[0]), "-map", "0:a:0", ...filtro, "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "2", wav], { check: true });
  log.ok(`${path.basename(wav)} (la canción entera, decodificada${MUSICA_PRE_DB ? `, +${MUSICA_PRE_DB} dB fijos` : ""})`);
}
log.ok(`repuesto en ${relativa(DESTINO)}`);
