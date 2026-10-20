#!/usr/bin/env node
/**
 * normalizar.mjs — repone `remotion/public/recorrido-046/` desde el material original.
 *
 *   node proyectos/046/normalizar.mjs            (lee de proyectos/046/original/)
 *   node proyectos/046/normalizar.mjs --forzar   (rehace aunque ya exista la salida)
 *   node proyectos/046/normalizar.mjs --solo hk06,dr211   (solo esos nombres de salida; no toca la música ni la tarjeta)
 *
 * PIEZA 046 · V28 · TIERRA GRATA BOSQUE SANTO (El Poblado), ARRIENDO, «CIUDAD NUEVA»: ABRE CON EL HOOK (excepción por encargo a la regla fija 1, como el 021-024). Tres tomas de Isabella del 17-oct
 * (HK03 el hook, MD02 + MD03 la mitad en dos tomas, CT02 el CTA) y recorridos ANAMÓRFICOS (1920×1080 con SAR 81:256 = DAR 9:16, SDR) de `Videos/4 Recorrido/` que ENTRAN ENTEROS en el 9:16 (no se recortan; la rev. 0 los trató como horizontales y los recortó al centro: error corregido). Material de
 * `Apartamento - Tierra Grata - Las Palmas/Videos/` (`1 Hooks`, `2 Miad`, `4 Recorrido`, `5 Cta`; no hay `3 Dron`: no hay dron). Receta del 043 con otro material.
 *
 * POR QUÉ EXISTE. El material es de la propiedad y de la presentadora y no entra en git: en el repo quedan esta receta, el plan y los sha256 de los
 * originales. Con la carpeta delante, un clon repone la pieza entera. Es un script de Node (con `ejecutar()` de `herramientas/comun.mjs`) y no un
 * `.sh` porque el sistema pide recetas que corran igual en macOS y en Windows; la ÚNICA excepción declarada es la rama HDR (HLG → BT.709 con
 * VideoToolbox), que solo corre en macOS y lo dice si no.
 *
 * DE DÓNDE SALEN LOS ARCHIVOS. Se copian del disco del rodaje a `proyectos/046/original/` con el CÓDIGO del catálogo (`proyectos/044/catalogo-material.md`
 * §3-§6) como nombre y SIN ESPACIOS (nunca se monta desde Descargas). La columna «origen» de `MATERIAL` dice qué archivo del disco es cada uno. Rellena el
 * sha con `shasum -a 256 ARCHIVO | cut -c1-8`.
 *
 * ANTES DE TOCAR NADA, medido (R01, R19, R21; `ffprobe`, 2026-10-19):
 *   · las tomas de Isabella del 17-oct (IMG_42xx): HEVC 10 bit **HLG** (`arib-std-b67`, BT.2020), 3840×2160 con `rotation=-90` → pantalla 2160×3840 vertical. Sin tone-map salen
 *     lavados (R21): lo hace VideoToolbox (`scale_vt`), y la rotación también (`transpose_vt`). **HK03 (IMG_4304) va a 29,97 fps** (`r_frame_rate` 30000/1001, `avg` irregular): `fps=30` se
 *     aplica TRAS el tone-map y los frames se cuentan en el MP4 NORMALIZADO, nunca en el original (la toma dura 6,2 s: ningún fotograma repetido);
 *   · los RECORRIDOS (`Img 9xxx.mp4`): H.264 8 bit **SDR** BT.709, 1920×1080 pero con **SAR 81:256 y DAR 9:16**: son vídeos VERTICALES comprimidos a lo ancho (anamórficos). No hay que tone-mapearlos ni recortarlos: `scale=1296:2304`
 *     con `setsar=1` los lleva a su 9:16 (el 1920 baja a 1296 y el 1080 sube a 2304, ×2,13 en vertical: algo blandos). Lo vio la sesión del 050 (el crop `608:1080` del catálogo §7 daba un zoom ×3,2 del tercio central);
 *   · el audio de cada toma: micro de solapa mono; sale en WAV PCM 48 kHz mono, SIN filtro ni nivel (la ganancia vive en el plan, R29) y en otro WAV con la
 *     voz TRATADA (abajo). WAV y no AAC: el AAC arrastra 1024 muestras de priming que desplazan la voz ~21 ms contra su imagen.
 *
 * CLASES de archivo, y cada una sale distinta:
 *   toma       la presentadora a cámara → MP4 mudo + WAV con su voz + WAV con su voz tratada
 *   recorrido  planos de la propiedad (aquí ANAMÓRFICOS, DAR 9:16) → MP4 mudo, estirado al 9:16 sin recorte
 *   (música)   la canción → WAV estéreo de 48 kHz decodificado ENTERO y NADA MÁS (ni loudnorm): el MP3 arrastra su retardo de códec y el corte al golpe se
 *              hace a la muestra sobre el WAV. Su `desde` sale de la medida de la pista y el nivel es una ganancia del plan.
 *
 * LA VOZ TRATADA. Las voces llegan a −20…−25 LUFS (ella habla a unos metros de un iPhone) y con una cresta de ≈ 17-20 dB: con ganancia sola los picos
 * saldrían a +5 dBFS. La cadena (`VOZ_TRATADA`) es la de la V13/V18/V22: graves fuera, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada DESPUÉS del
 * compresor (`herramientas/probar-voz.py --umbral 0.0316 --razon 3.5`) hasta −15,0 LUFS en su ventana de voz (el nivel de la música sola) y limitador a
 * −2,5 dBFS. Fuera de la ventana de voz el WAV tratado es SILENCIO. La puerta (`revisar-046.mjs`) vuelve a medirlo.
 *
 * LA TARJETA DEL CIERRE: `cierre-oscuro.png`, un negro liso (ver el final de este archivo). Nada se congela.
 *
 * Vídeo a 1296×2304 · 30 fps · SIN audio: 1296 = 1080 × 1,2, el techo del punch-in (criterio del 011).
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { ES_MAC, RAIZ, ejecutar, flags, log, relativa } from "../../herramientas/comun.mjs";

const ORIGEN = path.join(RAIZ, "proyectos", "046", "original");
const DESTINO = path.join(RAIZ, "remotion", "public", "recorrido-046");
const f = flags();
const solo = typeof f.solo === "string" ? new Set(f.solo.toLowerCase().split(",")) : null;

/**
 * clase · archivo en original/ · nombre de salida (sin extensión) · sha256 (8) del original · origen en el disco del rodaje.
 * El nombre de salida es el que usa el plan: `v("hk03")` → `recorrido-046/hk03.mp4` y `a("hk03")` → `hk03.wav` / `hk03-voz.wav`.
 *
 * (Los recorridos ya no llevan columna de recorte: el 1920×1080 con SAR 81:256 es un 9:16 anamórfico y se escala entero.)
 */
const MATERIAL = [
  // Las tomas de Isabella del 17-oct (catálogo §3-§5): el hook (HK03, a 29,97 fps), la mitad EN DOS TOMAS (MD02 + MD03) y el CTA (CT02).
  ["toma", "hk03.mov", "hk03", "75a87dfa", "1 Hooks/IMG_4304.mov"],
  ["toma", "md02.mov", "md02", "b85d5fe5", "2 Miad/IMG_4278.MOV"],
  ["toma", "md03.mov", "md03", "6fdf774f", "2 Miad/IMG_4285.MOV"],
  ["toma", "ct02.mov", "ct02", "f7ed79ff", "5 Cta/IMG_4294.MOV"],
  // Recorridos (HORIZONTALES, 2-sep): la unidad (bloque 3), el apartamento (bloque 5) y el clímax (RC18, terraza al atardecer). Se pueden repetir; el plan dice cuáles entran y en qué segundos.
  ["recorrido", "rc11.mp4", "rc11", "38a59f31", "4 Recorrido/Img 9513.mp4"],
  ["recorrido", "rc12.mp4", "rc12", "7bc5ad03", "4 Recorrido/Img 9514.mp4"],
  ["recorrido", "rc13.mp4", "rc13", "e977e148", "4 Recorrido/Img 9516.mp4"],
  ["recorrido", "rc14.mp4", "rc14", "59647a5b", "4 Recorrido/Img 9517.mp4"],
  ["recorrido", "rc16.mp4", "rc16", "7cdf817e", "4 Recorrido/Img 9525.mp4"],
  ["recorrido", "rc17.mp4", "rc17", "c99bc2f1", "4 Recorrido/Img 9527.mp4"],
  ["recorrido", "rc05.mp4", "rc05", "931b51dd", "4 Recorrido/Img 9477.mp4"],
  ["recorrido", "rc06.mp4", "rc06", "556bee38", "4 Recorrido/Img 9479.mp4"],
  ["recorrido", "rc09.mp4", "rc09", "8b1031a3", "4 Recorrido/Img 9484.mp4"],
  ["recorrido", "rc22.mp4", "rc22", "33ac8ce2", "4 Recorrido/Img 9538.mp4"],
  ["recorrido", "rc18.mp4", "rc18", "4873e6c1", "4 Recorrido/Img 9528.mp4"],
];
/**
 * La canción: archivo en original/ · salida · sha256 (8) · origen (la biblioteca de música del repo, el MISMO archivo que reserva el registro de uso).
 * `null` si la pieza sale sin música (`HAY_MUSICA = false` en `audio-046.ts`).
 */
const MUSICA = [
  "musica-children.mp3",
  "musica-046",
  "80bd8abe",
  "archivos/musica/Armin van Buuren - Children (from 'Piano' album).mp3",
]; // piano sin pulso (versión del clásico del trance); reservada para la V28

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

/** La rotación de PANTALLA del archivo (R19): −90 en un iPhone vertical, 0 si ya viene derecho (los recorridos de esta pieza, apaisados). */
const rotacionDe = (abs) => Number(sondea(abs, "stream_side_data=rotation").split(/\s+/)[0] || 0);

function video(clase, archivo, salidaNombre, recorte) {
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
  let sar = ""; // «setsar=1,» solo en los recorridos anamórficos (rotación 0)
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
    let marco = "";
    if (rot === 0) {
      // LOS RECORRIDOS DEL 2-SEP SON ANAMÓRFICOS, NO HORIZONTALES (avisó la sesión del 050, y `ffprobe` lo confirma): 1920×1080 con SAR 81:256, es decir, DAR 9:16 = verticales comprimidos a lo ancho. NO se
      // recortan: se estiran al 9:16 que ya son (`scale` a 1296×2304 con `setsar=1`: el 1920 baja a 1296 y el 1080 sube a 2304). El crop central de la rev. 0 (608×1080) era un zoom ×3,2 del tercio del medio.
      const dar = sondea(entrada, "stream=display_aspect_ratio");
      if (dar !== "9:16") {
        log.error(`${archivo}: sin rotación y con DAR ${dar}: esta receta solo conoce los recorridos anamórficos (DAR 9:16); un horizontal de verdad pide un recorte`);
        process.exit(1);
      }
      sar = "setsar=1,";
    }
    // Esta pieza no lleva drones (los DJI a 29,97 fps pedirían `setpts=PTS*1000/1001`, ver 043); los recorridos van a 30 fps y la rama queda inerte.
    const retiempo = clase === "dron" && sondea(entrada, "stream=r_frame_rate") === "30000/1001" ? "setpts=PTS*1000/1001,fps=30," : "";
    args = ["-nostdin", "-y", "-v", "error", "-noautorotate", "-i", entrada, "-vf", `${giro ? `${giro},` : ""}${marco}scale=1296:2304:flags=lanczos,${sar}${retiempo}format=yuv420p`, ...comunes];
  }
  ejecutar("ffmpeg", args, { check: true });
  log.ok(`${path.basename(salida)} (${clase}${hdr ? " · HLG → BT.709" : " · SDR"} · rotación ${rot}${sar ? " · anamórfico 9:16, sin recorte" : ""})`);
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
const GANANCIA_VOZ_DB = { hk03: 17.9, md02: 18.0, md03: 17.9, ct02: 17.7 };

/**
 * DÓNDE HABLA Isabella en cada toma, y hasta dónde se USA su voz: [primera sílaba, fin de SU frase], en segundos de la fuente, medidos por energía
 * (`limites-voz.py --margen 40`: con el margen por defecto el suelo de ruido a −64 dB hace que casi todas «empiecen» en 0,00 s; R29). Fuera de esta
 * ventana la voz tratada es SILENCIO: la compresión y la ganancia suben ≈ +19 dB cualquier ruido de la toma (los chasquidos a −48/−55 dB de los 0,6 s
 * antes de «Si quieres…» en HK06, la cola de CT04 con 1,1 s sin voz), y entre toma y toma el plan deja un hueco que, sin esto, sonaría con ese ruido de sala.
 * (En estas tres tomas `limites-voz.py --margen 40` da 0,03 s en HK06 —esos chasquidos superan su umbral, porque el suelo es de −92 dB— y 0,95/0,49 s en las
 * otras; los inicios de abajo son los del perfil de energía a 20 ms, banda de voz: la primera subida a más de −40 dB.)
 * El tercer número es lo que se deja sonar ANTES de la primera sílaba (el defecto, `VOZ_ANTES`).
 */
const VENTANA_VOZ = { hk03: [0.57, 5.62], md02: [0.68, 3.66], md03: [0.68, 6.66], ct02: [0.76, 4.98] };
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

for (const [clase, archivo, salida, , , recorte] of lista) {
  video(clase, archivo, salida, recorte);
  if (clase === "toma") {
    voz(archivo, salida);
    vozTratada(salida);
  }
}

// La TARJETA OSCURA del cierre (plano `c11-cierre`): un PNG liso del negro de la marca. Nada se congela: la imagen de Isabella funde a negro y sigue
// este fondo oscuro con el logo y la web (`cierre-046.ts`). Es el mismo color al que funde la imagen (`LUXUR.color.negro`, #000000) y sobre negro puro
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
