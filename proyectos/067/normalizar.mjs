#!/usr/bin/env node
/**
 * normalizar.mjs — repone `remotion/public/recorrido-067/` desde el material original.
 *
 *   node proyectos/067/normalizar.mjs            (lee de proyectos/067/original/)
 *   node proyectos/067/normalizar.mjs --forzar   (rehace aunque ya exista la salida)
 *   node proyectos/067/normalizar.mjs --solo hk02,dr03   (solo esos nombres de salida; no toca la música ni la tarjeta)
 *
 * PIEZA 067 · V49 · LOTE EN VENTA EN SAN CRISTÓBAL (EOLIA Condominio, vereda La Ilusión, Medellín): el segundo reel de este lote (reparto 066-068, `proyectos/066/reparto-066-068.md`), ángulo «ESTE NO ES PARA TI»
 * (el filtro del comprador serio). Estructura del canal: DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA. Tomas de Isabella: HK02 (hook), MD01 (mitad) y CT05 (CTA), exclusivas de esta pieza dentro del lote.
 * Aéreo: DR03 entero, DR06 0-60 s y DR04 60-98,5 s (rangos del clip; DR01-DR02 y los otros rangos son de la 066 y la 068). Paneos del prado con el iPhone: RC02 y RC03 (los otros cinco son de la 066 y la 068).
 * La voz va TRATADA a −15 LUFS (cadena de la V18/V22: compresor 3,5:1 desde −30 dBFS). Material de `Lote - San Cristobal/Videos/videos/` (`1 Hooks`, `2 Mitad`, `3 Dron`, `4 Recorrido`, `5 Cta`).
 *
 * POR QUÉ EXISTE. El material es de la propiedad y de la presentadora y no entra en git: en el repo quedan esta receta, el plan y los sha256 de los
 * originales. Con la carpeta delante, un clon repone la pieza entera. Es un script de Node (con `ejecutar()` de `herramientas/comun.mjs`) y no un
 * `.sh` porque el sistema pide recetas que corran igual en macOS y en Windows; la ÚNICA excepción declarada es la rama HDR (HLG → BT.709 con
 * VideoToolbox), que solo corre en macOS y lo dice si no (aquí no corre: este rodaje es SDR).
 *
 * DE DÓNDE SALEN LOS ARCHIVOS. Se copian del disco del rodaje a `proyectos/067/original/` con el CÓDIGO del catálogo (`proyectos/066/catalogo/catalogo-material.md`) como nombre y SIN ESPACIOS (nunca se
 * monta desde el disco). La columna «origen» de `MATERIAL` dice qué archivo del disco es cada uno. Rellena el sha con `shasum -a 256 ARCHIVO | cut -c1-8`.
 *
 * ANTES DE TOCAR NADA, medido (R01, R19, R21):
 *   · los MOV de ESTE rodaje (Isabella y los paneos): H.264 **SDR BT.709**, **1080×1920 verticales de verdad, SIN rotación y SIN SAR anamórfico**, a 30 o 29,97 fps (`r_frame_rate` 30/1 o 30000/1001), con audio AAC.
 *     No son HLG: la rama HDR de abajo no corre. Se escalan a 1296×2304 y se pasan a 30 fps (`-fps_mode cfr -r 30`); NO se recortan. Los de 29,97 fps que NO son tomas de Isabella llevan
 *     `setpts=PTS*1000/1001` (30 fps exactos, 1 a 1; sin él, `-r 30` repite un fotograma cada ≈ 33 s); las TOMAS no lo llevan (su voz se mide contra ese vídeo; MD01 dura 7,7 s: no llega a repetir ninguno);
 *   · los drones `DJI_…0089/0090/0092`: HEVC 8 bit **SDR** BT.709, 3840×2160 con `rotation=90` (verticales al rotar), 29,97 fps, SIN audio. Tone-mapearlos lo estropearía: solo se rotan (`transpose=cclock`) y se
 *     escalan, con `setpts=PTS*1000/1001`. DR06 y DR04 duran 119 y 98 s y la pieza usa unos segundos: se normaliza SOLO el rango de la séptima columna de `MATERIAL` (`[ss, t]`), así que el MP4 resultante
 *     EMPIEZA en `ss` del archivo original (`dr06.mp4` t = original t; `dr04.mp4` t = original t − 60). Los números del plan van siempre sobre el MP4 normalizado.
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
 * LA VOZ TRATADA. Las voces llegan a −25…−27 LUFS (ella habla a unos metros de un iPhone, con viento) y con una cresta de ≈ 17-20 dB: con ganancia sola los picos
 * saldrían a +5 dBFS. La cadena (`VOZ_TRATADA`) es la de la V13/V18: graves fuera, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada DESPUÉS del
 * compresor (`herramientas/probar-voz.py --umbral 0.0316 --razon 3.5`) hasta −15,0 LUFS en su ventana de voz (el nivel de la música sola) y limitador a
 * −2,5 dBFS. Fuera de la ventana de voz el WAV tratado es SILENCIO. La puerta (`revisar-067.mjs`) vuelve a medirlo.
 *
 * LA TARJETA DEL CIERRE: `cierre-oscuro.png`, un negro liso (ver el final de este archivo). Nada se congela.
 *
 * Vídeo a 1296×2304 · 30 fps · SIN audio: 1296 = 1080 × 1,2, el techo del punch-in (criterio del 011).
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { ES_MAC, RAIZ, ejecutar, flags, log, relativa } from "../../herramientas/comun.mjs";

const ORIGEN = path.join(RAIZ, "proyectos", "067", "original");
const DESTINO = path.join(RAIZ, "remotion", "public", "recorrido-067");
const f = flags();
const solo = typeof f.solo === "string" ? new Set(f.solo.toLowerCase().split(",")) : null;

/**
 * clase · archivo en original/ · nombre de salida (sin extensión) · sha256 (8) del original · origen en el disco del rodaje · [solo dron apaisado] recorte · [opcional] rango `[ss, t]` en s del original.
 * El nombre de salida es el que usa el plan: `v("hk02")` → `recorrido-067/hk02.mp4` y `a("hk02")` → `hk02.wav` / `hk02-voz.wav`.
 *
 * EL RECORTE 9:16 de un dron apaisado: no hay ninguno (los apaisados del lote no se usan), pero la rama sigue por si se añade uno.
 */
const MATERIAL = [
  // Las tres tomas de Isabella (reparto 066-068): el hook HK02 (`IMG_0951`), la mitad MD01 (`IMG_0944`, 29,97 fps) y el CTA CT05 (`IMG_0986`). Exclusivas de esta pieza dentro del lote.
  ["toma", "HK02.MOV", "hk02", "0f074f09", "1 Hooks/IMG_0951.MOV"],
  ["toma", "MD01.MOV", "md01", "8ee2ceec", "2 Mitad/IMG_0944.MOV"],
  ["toma", "CT05.MOV", "ct05", "61b8136b", "5 Cta/IMG_0986.MOV"],
  // Los dos paneos del prado (iPhone, 1080×1920 verticales, SDR BT.709, sin rotación): RC02 (`IMG_0954`, 29,97 fps) y RC03 (`IMG_0955`).
  ["recorrido", "RC02.MOV", "rc02", "21d5e56d", "4 Recorrido/IMG_0954.MOV"],
  ["recorrido", "RC03.MOV", "rc03", "9e6af023", "4 Recorrido/IMG_0955.MOV"],
  // Los drones (4K VERTICAL, SDR, 29,97 fps, rotation=90, sin audio): solo se rotan. DR03 entero; DR06 y DR04, solo su rango (el MP4 empieza en `ss`).
  ["dron", "DR03.MP4", "dr03", "d1609f61", "3 Dron/DJI_20260718170329_0089_D.MP4"],
  ["dron", "DR06.MP4", "dr06", "5f504500", "3 Dron/DJI_20260718171109_0092_D.MP4", undefined, [0, 60]],
  ["dron", "DR04.MP4", "dr04", "5a265456", "3 Dron/DJI_20260718170459_0090_D.MP4", undefined, [60, 38.6]],
];
/**
 * La canción: archivo en original/ · salida · sha256 (8) · origen (la biblioteca de música del repo, el MISMO archivo que reserva el registro de uso).
 * `null` si la pieza sale sin música (`HAY_MUSICA = false` en `audio-067.ts`).
 */
const MUSICA = [
  "musica-oasis.mp3",
  "musica-067",
  "55bf04c8",
  "archivos/musica/Aleksey Chistilin - Return to Oasis.mp3",
]; // «Return to Oasis» (Aleksey Chistilin, cinematic ambient melódico, Re# menor, 110 BPM de pulso constante, meseta de 37 s y caída a un piano); reservada para la V49 (repetida de la V2/018, otra propiedad: `musica-repetir-entre-propiedades`)

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

function video(clase, archivo, salidaNombre, recorte, rango) {
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
    let marco = "";
    // Un MOV que ya viene vertical y sin rotación (los 1080×1920 de este rodaje) no se recorta; solo un apaisado de dron.
    const [anchoPx, altoPx] = sondea(entrada, "stream=width,height").split(/\s+/).map(Number);
    if (rot === 0 && anchoPx > altoPx) {
      // EL RECORTE 9:16 (los DJI apaisados): una ventana vertical de alto completo, en la x que dice `MATERIAL`, y la misma escala que los demás.
      if (typeof recorte !== "number" || recorte < 0 || recorte > 1) {
        log.error(`${archivo}: un clip apaisado sin rotación necesita su recorte (0-1) en la sexta columna de MATERIAL`);
        process.exit(1);
      }
      marco = `crop=trunc(ih*9/16/2)*2:ih:trunc((iw-trunc(ih*9/16/2)*2)*${recorte}/2)*2:0,`;
    }
    // Un rango `[ss, t]` normaliza SOLO esos segundos del original (el MP4 empieza en `ss`); `-ss` antes de `-i` con recodificación es exacto al fotograma.
    const trozo = Array.isArray(rango) ? ["-ss", String(rango[0]), "-t", String(rango[1])] : [];
    args = ["-nostdin", "-y", "-v", "error", ...trozo, "-noautorotate", "-i", entrada, "-vf", `${giro ? `${giro},` : ""}${marco}${pts}scale=1296:2304:flags=lanczos,format=yuv420p`, ...comunes];
  }
  ejecutar("ffmpeg", args, { check: true });
  log.ok(`${path.basename(salida)} (${clase}${hdr ? " · HLG → BT.709" : " · SDR"} · rotación ${rot}${typeof recorte === "number" ? ` · recorte 9:16 en ${recorte}` : ""}${Array.isArray(rango) ? ` · solo ${rango[0]}-${(rango[0] + rango[1]).toFixed(1)} s del original` : ""})`);
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

/** dB tras el compresor que dejan cada voz en −15,0 LUFS en su ventana (`herramientas/probar-voz.py --umbral 0.0316 --razon 3.5`; la ventana de cada toma es la de `VENTANA_VOZ`): crudas a −25,1 · −27,2 · −27,3 LUFS, pico real −2,5 dBFS las tres; el limitador quita 1,2 · 3,6 · 3,1 dB (picos sueltos de consonante; la MD01 y la CT05 llevan viento). Se suma 0,1 dB a lo que da el script porque el limitador deja −15,1. */
const GANANCIA_VOZ_DB = { hk02: 19.9, md01: 20.3, ct05: 19.9 };

/**
 * DÓNDE HABLA Isabella en cada toma, y hasta dónde se USA su voz: [primera sílaba, fin de SU frase], en segundos de la fuente, medidos por energía
 * (`limites-voz.py --margen 40`: con el margen por defecto el suelo de ruido a −64 dB hace que casi todas «empiecen» en 0,00 s; R29). Fuera de esta
 * ventana la voz tratada es SILENCIO: la compresión y la ganancia suben ≈ +19 dB cualquier ruido de la toma (los chasquidos a −48/−55 dB de los 0,6 s
 * antes de «Si quieres…» en HK06, la cola de CT04 con 1,1 s sin voz), y entre toma y toma el plan deja un hueco que, sin esto, sonaría con ese ruido de sala.
 * (En estas tres tomas `limites-voz.py --margen 40` da 0,03 s en HK06 —esos chasquidos superan su umbral, porque el suelo es de −92 dB— y 0,95/0,49 s en las
 * otras; los inicios de abajo son los del perfil de energía a 20 ms, banda de voz: la primera subida a más de −40 dB.)
 * El tercer número es lo que se deja sonar ANTES de la primera sílaba (el defecto, `VOZ_ANTES`).
 */
const VENTANA_VOZ = { hk02: [0.5, 4.46], md01: [0.51, 6.9], ct05: [0.47, 4.66] };
// Medidos con el perfil de energía de 20 ms en la banda de voz (`herramientas/envolvente-voz.py`): la voz de las tres tomas arranca de golpe tras 0,45-0,5 s de respiración o viento (a −40…−60 dB del pico) y acaba
// en una caída de ≈ 100 ms; `limites-voz.py` con el margen por defecto da 0,00 s en la MD01 y el final de «este no es para ti» (HK02) cae a −37 dB del pico, por debajo de su umbral.
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

for (const [clase, archivo, salida, , , recorte, rango] of lista) {
  video(clase, archivo, salida, recorte, rango);
  if (clase === "toma") {
    voz(archivo, salida);
    vozTratada(salida);
  }
}

// La TARJETA OSCURA del cierre (plano `c11-cierre`): un PNG liso del negro de la marca. Nada se congela: la imagen de Isabella funde a negro y sigue
// este fondo oscuro con el logo y la web (`cierre-067.ts`). Es el mismo color al que funde la imagen (`LUXUR.color.negro`, #000000) y sobre negro puro
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
