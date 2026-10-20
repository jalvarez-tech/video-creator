#!/usr/bin/env node
/**
 * normalizar.mjs — repone `remotion/public/recorrido-049/` desde el material original.
 *
 *   node proyectos/049/normalizar.mjs            (lee de proyectos/049/original/)
 *   node proyectos/049/normalizar.mjs --forzar   (rehace aunque ya exista la salida)
 *   node proyectos/049/normalizar.mjs --solo hk03,rc04   (solo esos nombres de salida; no toca la música ni la tarjeta)
 *
 * PIEZA 049 · V31 · «AMENIDADES» · TIERRA GRATA BOSQUE SANTO (El Poblado), ARRIENDO de un apartamento amoblado de 113 m²: la QUINTA pieza del encargo de seis reels de arriendo (045-050) con
 * el material del 17-oct (Isabella en las zonas comunes de la unidad) y del 31-ago / 2-sep (el apartamento y la unidad, SIN Isabella). Abre con el APARTAMENTO (RC04, sin texto ni voz) y
 * lleva HK03 · MD05 · CT01 + RC19 de clímax. NO HAY DRON. Reparto fijado en `proyectos/044/reparto-045-050.md`; catálogo del material en `proyectos/044/catalogo-material.md`.
 * Material de `Apartamento - Tierra Grata - Las Palmas/Videos/` (`1 Hooks`, `2 Miad`, `4 Recorrido`, `5 Cta`).
 *
 * POR QUÉ EXISTE. El material es de la propiedad y de la presentadora y no entra en git: en el repo quedan esta receta, el plan y los sha256 de los
 * originales. Con la carpeta delante, un clon repone la pieza entera. Es un script de Node (con `ejecutar()` de `herramientas/comun.mjs`) y no un
 * `.sh` porque el sistema pide recetas que corran igual en macOS y en Windows; la ÚNICA excepción declarada es la rama HDR (HLG → BT.709 con
 * VideoToolbox), que solo corre en macOS y lo dice si no.
 *
 * DE DÓNDE SALEN LOS ARCHIVOS. Se copian del disco del rodaje a `proyectos/049/original/` con el CÓDIGO del catálogo (`proyectos/044/catalogo-material.md`)
 * como nombre y SIN ESPACIOS (nunca se monta desde Descargas). La columna «origen» de `MATERIAL` dice qué archivo del disco es cada uno. Rellena el
 * sha con `shasum -a 256 ARCHIVO | cut -c1-8`.
 *
 * ANTES DE TOCAR NADA, medido (R01, R19, R21; ffprobe del 2026-10-19):
 *   · las TRES TOMAS de Isabella (17-oct): HEVC 10 bit **HLG** (`arib-std-b67`, BT.2020), 3840×2160 con `rotation=-90` → pantalla 2160×3840 vertical, a 30 fps
 *     (HK03 a 29,97 con `avg_frame_rate` irregular: `-r 30` tras el tone-map y el plan cuenta los frames del MP4 normalizado, no los del original). Sin tone-map
 *     salen lavados (R21): lo hace VideoToolbox (`scale_vt`), y la rotación también (`transpose_vt`);
 *   · los RECORRIDOS (31-ago / 2-sep): H.264 8 bit **SDR** BT.709, 1920×1080 **ANAMÓRFICOS**, sin rotación, 30 fps (RC19 y RC01 con `avg_frame_rate` irregular). OJO: NO son horizontales: llevan
 *     `sample_aspect_ratio 81:256` y `display_aspect_ratio 9:16` (`ffprobe -show_entries stream=sample_aspect_ratio,display_aspect_ratio`): son vídeo VERTICAL comprimido a lo ancho (la sesión de la V32
 *     lo vio el 2026-10-19 y avisó). El catálogo (§7) los daba por apaisados y proponía `crop=608:1080` al centro: eso es un zoom ×3,2 de su tercio central. Aquí NO se recorta: se escala el cuadro
 *     entero (`scale=1296:2304`, que deshace la compresión) y `setsar=1`. Quedan algo más blandos que Isabella en 4K (1080 px de alto → 2304: ×2,13 en vertical; 1920 → 1296 en horizontal) y se dice;
 *   · el audio de cada toma: micro de solapa mono; sale en WAV PCM 48 kHz mono, SIN filtro ni nivel (la ganancia vive en el plan, R29) y en otro WAV con la
 *     voz TRATADA (abajo). WAV y no AAC: el AAC arrastra 1024 muestras de priming que desplazan la voz ~21 ms contra su imagen.
 *
 * CLASES de archivo, y cada una sale distinta:
 *   toma       la presentadora a cámara → MP4 mudo + WAV con su voz + WAV con su voz tratada
 *   recorrido  planos de la propiedad → MP4 mudo (SDR apaisado: recortado a 9:16 con su X)
 *   (música)   la canción → WAV estéreo de 48 kHz decodificado ENTERO y NADA MÁS (ni loudnorm): el MP3 arrastra su retardo de códec y el corte al golpe se
 *              hace a la muestra sobre el WAV. Su `desde` sale de la medida de la pista y el nivel es una ganancia del plan.
 *
 * LA VOZ TRATADA. Las voces llegan a −20…−25 LUFS (ella habla a unos metros de un iPhone) y con una cresta de ≈ 17-20 dB: con ganancia sola los picos
 * saldrían a +5 dBFS. La cadena (`VOZ_TRATADA`) es la de la V13/V18/V22/V26: graves fuera, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada DESPUÉS del
 * compresor (`herramientas/probar-voz.py --umbral 0.0316 --razon 3.5`) hasta −15,0 LUFS en su ventana de voz (el nivel de la música sola) y limitador a
 * −2,5 dBFS. Fuera de la ventana de voz el WAV tratado es SILENCIO. La puerta (`revisar-049.mjs`) vuelve a medirlo.
 *
 * LA TARJETA DEL CIERRE: `cierre-oscuro.png`, un negro liso (ver el final de este archivo). Nada se congela.
 *
 * Vídeo a 1296×2304 · 30 fps · SIN audio: 1296 = 1080 × 1,2, el techo del punch-in (criterio del 011).
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { ES_MAC, RAIZ, ejecutar, flags, log, relativa } from "../../herramientas/comun.mjs";

const ORIGEN = path.join(RAIZ, "proyectos", "049", "original");
const DESTINO = path.join(RAIZ, "remotion", "public", "recorrido-049");
const f = flags();
const solo = typeof f.solo === "string" ? new Set(f.solo.toLowerCase().split(",")) : null;

/**
 * clase · archivo en original/ · nombre de salida (sin extensión) · sha256 (8) del original · origen en el disco del rodaje.
 * El nombre de salida es el que usa el plan: `v("hk03")` → `recorrido-049/hk03.mp4` y `a("hk03")` → `hk03.wav` / `hk03-voz.wav`.
 *
 * LOS RECORRIDOS NO SE RECORTAN (ver arriba): son 9:16 anamórficos y `scale` + `setsar=1` los deja bien.
 */
const MATERIAL = [
  // Las tres tomas de Isabella (17-oct, 4K HLG vertical): el hook (HK03, 29,97 fps, REPETIDA de la V28), la mitad (MD05, REPETIDA de la V29) y el CTA (CT01, REPETIDA de la V27).
  ["toma", "HK03.mov", "hk03", "75a87dfa", "1 Hooks/IMG_4304.mov"],
  ["toma", "MD05.mov", "md05", "1d92690e", "2 Miad/IMG_4297.MOV"],
  ["toma", "CT01.mov", "ct01", "cc19421e", "5 Cta/IMG_4277.MOV"],
  // Recorridos (31-ago / 2-sep, 1920×1080 ANAMÓRFICOS SDR —DAR 9:16—, sin Isabella). Cuadro entero, sin recorte; el plan dice qué tramo entra.
  ["recorrido", "RC04.mp4", "rc04", "c6cd691d", "4 Recorrido/Img 9469.mp4"], // APTO: la sala (APERTURA de esta pieza)
  ["recorrido", "RC01.mp4", "rc01", "9f23d5be", "4 Recorrido/Img 9461.mp4"], // APTO: de la isla de la cocina y el comedor hacia la sala (pedida por el usuario; es la apertura de la V27)
  ["recorrido", "RC08.mp4", "rc08", "34119359", "4 Recorrido/Img 9481.mp4"], // APTO: alcoba principal → el televisor
  ["recorrido", "RC09.mp4", "rc09", "8b1031a3", "4 Recorrido/Img 9484.mp4"], // APTO: baño principal
  ["recorrido", "RC12.mp4", "rc12", "7bc5ad03", "4 Recorrido/Img 9514.mp4"], // UNIDAD: Social Kitchen, otro lado
  ["recorrido", "RC13.mp4", "rc13", "e977e148", "4 Recorrido/Img 9516.mp4"], // UNIDAD: gimnasio
  ["recorrido", "RC14.mp4", "rc14", "59647a5b", "4 Recorrido/Img 9517.mp4"], // UNIDAD: gimnasio, pared de rayas
  ["recorrido", "RC17.mp4", "rc17", "c99bc2f1", "4 Recorrido/Img 9527.mp4"], // UNIDAD: el carril de nado, otro extremo
  ["recorrido", "RC19.mp4", "rc19", "86ddbfbd", "4 Recorrido/Img 9529.mp4"], // UNIDAD: el deck con el jacuzzi comunal (CLÍMAX de esta pieza)
];
/**
 * La canción: archivo en original/ · salida · sha256 (8) · origen (la biblioteca de música del repo, el MISMO archivo que reserva el registro de uso).
 * `null` si la pieza sale sin música (`HAY_MUSICA = false` en `audio-049.ts`).
 */
const MUSICA = [
  "musica-together.mp3",
  "musica-049",
  "bd507fe6",
  "archivos/musica/In This Together.mp3",
]; // reservada para la V31 (registro de uso §1); alternativa, solo si no sirve: Aleksey Chistilin - Deep Breath (`abceb83c`)

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

/** La rotación de PANTALLA del archivo (R19): −90 en un iPhone vertical, 0 si ya viene derecho (los recorridos apaisados). */
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
    // Los DJI van a 29,97 fps: con `fps=30` solo, ffmpeg REPITE un fotograma cada 1001 (cada ≈ 33 s) y, si cae en el tramo de un plano, se ve una micro-parada.
    // Se reproducen un 0,1 % más rápido (`setpts=PTS*1000/1001`): cada fotograma de la fuente sale UNA vez; el `desde` del plan va en el tiempo nuevo (`dji()`).
    const retiempo = clase === "dron" && sondea(entrada, "stream=r_frame_rate") === "30000/1001" ? "setpts=PTS*1000/1001,fps=30," : "";
    args = ["-nostdin", "-y", "-v", "error", "-noautorotate", "-i", entrada, "-vf", `${giro ? `${giro},` : ""}scale=1296:2304:flags=lanczos,setsar=1,${retiempo}format=yuv420p`, ...comunes];
  }
  ejecutar("ffmpeg", args, { check: true });
  log.ok(`${path.basename(salida)} (${clase}${hdr ? " · HLG → BT.709" : " · SDR"} · rotación ${rot}${rot === 0 && sondea(entrada, "stream=sample_aspect_ratio") !== "N/A" ? ` · anamórfico ${sondea(entrada, "stream=sample_aspect_ratio")} → cuadro entero` : ""})`);
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
const GANANCIA_VOZ_DB = { hk03: 17.9, md05: 18.4, ct01: 17.8 };

/**
 * DÓNDE HABLA Isabella en cada toma, y hasta dónde se USA su voz: [primera sílaba, fin de SU frase], en segundos de la fuente, medidos por energía
 * (`limites-voz.py --margen 40`: con el margen por defecto el suelo de ruido a −64 dB hace que casi todas «empiecen» en 0,00 s; R29). Fuera de esta
 * ventana la voz tratada es SILENCIO: la compresión y la ganancia suben ≈ +19 dB cualquier ruido de la toma (los chasquidos a −48/−55 dB de los 0,6 s
 * antes de «Si quieres…» en HK06, la cola de CT04 con 1,1 s sin voz), y entre toma y toma el plan deja un hueco que, sin esto, sonaría con ese ruido de sala.
 * (En estas tres tomas `limites-voz.py --margen 40` da 0,03 s en HK06 —esos chasquidos superan su umbral, porque el suelo es de −92 dB— y 0,95/0,49 s en las
 * otras; los inicios de abajo son los del perfil de energía a 20 ms, banda de voz: la primera subida a más de −40 dB.)
 * El tercer número es lo que se deja sonar ANTES de la primera sílaba (el defecto, `VOZ_ANTES`).
 */
const VENTANA_VOZ = { hk03: [0.58, 5.62], md05: [0.6, 3.55], ct01: [0.6, 4.53] };
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
// este fondo oscuro con el logo y la web (`cierre-049.ts`). Es el mismo color al que funde la imagen (`LUXUR.color.negro`, #000000) y sobre negro puro
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
