#!/usr/bin/env node
/**
 * normalizar.mjs — repone `remotion/public/recorrido-062/` desde el material original.
 *
 *   node proyectos/062/normalizar.mjs            (lee de proyectos/062/original/)
 *   node proyectos/062/normalizar.mjs --forzar   (rehace aunque ya exista la salida)
 *   node proyectos/062/normalizar.mjs --solo hk04,dr07   (solo esos nombres de salida; no toca la música ni la tarjeta)
 *
 * PIEZA 062 · V44 · APARTAESTUDIO QUADRATO (LAURELES, MEDELLÍN): el tercer reel de este apartaestudio (reparto 054-062 de la sesión madre, `proyectos/054/reparto-054-062.md`), ángulo «MEDELLÍN, TERCER MERCADO DE RENTA CORTA».
 * Estructura del canal: AZOTEA (en vez de dron) · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA. Tomas de Isabella: HK02 (hook, en la azotea saliendo del ascensor), MD02 (mitad, entrando al estudio) y CT02 (CTA, sentada
 * en el escritorio), exclusivas de esta pieza dentro del apartaestudio. NO hay dron: la apertura aérea es la vista de la azotea (tomas de «TERRAZA Y JACUZZI»). Recorridos del iPhone: zonas comunes (ZC01-ZC29) y estudio
 * (RC01-RC18); los que usa el plan salen de `metraje-062.ts`, el resto son candidatos.
 * La voz va TRATADA a −15 LUFS (cadena de la V18/V22: compresor 3,5:1 desde −30 dBFS). Material de `Apartaestudio - Quadrato - Laureles/Videos/` (`1 Hooks`, `2 Mitad`, `3 Zonas comunes`, `4 Recorrido`, `5 Cta`).
 *
 * POR QUÉ EXISTE. El material es de la propiedad y de la presentadora y no entra en git: en el repo quedan esta receta, el plan y los sha256 de los
 * originales. Con la carpeta delante, un clon repone la pieza entera. Es un script de Node (con `ejecutar()` de `herramientas/comun.mjs`) y no un
 * `.sh` porque el sistema pide recetas que corran igual en macOS y en Windows; la ÚNICA excepción declarada es la rama HDR (HLG → BT.709 con
 * VideoToolbox), que solo corre en macOS y lo dice si no (aquí no corre: este rodaje es SDR).
 *
 * DE DÓNDE SALEN LOS ARCHIVOS. Se copian del disco del rodaje a `proyectos/062/original/` con el CÓDIGO del catálogo como nombre y SIN ESPACIOS (nunca
 * se monta desde Descargas). La columna «origen» de `MATERIAL` dice qué archivo del disco es cada uno. Rellena el sha con `shasum -a 256 ARCHIVO | cut -c1-8`.
 *
 * ANTES DE TOCAR NADA, medido (R01, R19, R21):
 *   · los MOV de ESTE rodaje (Isabella y los recorridos): H.264 **SDR BT.709**, **1080×1920 verticales, SIN rotación**, a 30 o 29,97 fps (`r_frame_rate` 30/1 o 30000/1001), con audio AAC. No son HLG:
 *     la rama HDR de abajo no corre. Se escalan a 1296×2304 y se pasan a 30 fps (`-fps_mode cfr -r 30`); NO se recortan. Los de 29,97 fps que NO son tomas de Isabella llevan `setpts=PTS*1000/1001`
 *     (30 fps exactos, 1 a 1; sin él, `-r 30` repite un fotograma cada ≈ 33 s);
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
 * −2,5 dBFS. Fuera de la ventana de voz el WAV tratado es SILENCIO. La puerta (`revisar-062.mjs`) vuelve a medirlo.
 *
 * LA TARJETA DEL CIERRE: `cierre-oscuro.png`, un negro liso (ver el final de este archivo). Nada se congela.
 *
 * Vídeo a 1296×2304 · 30 fps · SIN audio: 1296 = 1080 × 1,2, el techo del punch-in (criterio del 011).
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { ES_MAC, RAIZ, ejecutar, flags, log, relativa } from "../../herramientas/comun.mjs";

const ORIGEN = path.join(RAIZ, "proyectos", "062", "original");
const DESTINO = path.join(RAIZ, "remotion", "public", "recorrido-062");
const f = flags();
const solo = typeof f.solo === "string" ? new Set(f.solo.toLowerCase().split(",")) : null;

/**
 * clase · archivo en original/ · nombre de salida (sin extensión) · sha256 (8) del original · origen en el disco del rodaje · [solo dron apaisado] recorte.
 * El nombre de salida es el que usa el plan: `v("hk06")` → `recorrido-062/hk06.mp4` y `a("hk06")` → `hk06.wav` / `hk06-voz.wav`.
 *
 * EL RECORTE 9:16 de un dron apaisado: dónde cae la ventana vertical dentro del ancho LIBRE (0 = pegada a la izquierda, 1 = a la derecha; x = (3840 − 1216) × recorte).
 * Se eligió mirando el tramo que usa el plan (principio, mitad y final; `pruebas-720p/recortes.jpg`): lo que importa del plano tiene que quedarse dentro los tres instantes.
 */
const MATERIAL = [
  // Las tres tomas de Isabella (reparto 054-062): el hook HK02 (en la azotea, saliendo del ascensor), la mitad MD02 (entrando al estudio) y el CTA CT02 (sentada en el escritorio). Exclusivas de esta pieza dentro del apartaestudio.
  ["toma", "HK02.MOV", "hk02", "4054f38a", "1 Hooks/HOOK2.MOV"],
  ["toma", "MD02.MOV", "md02", "9b1f3a15", "2 Mitad/MEDIO3.MOV"],
  ["toma", "CT02.MOV", "ct02", "6d64c94f", "5 Cta/CTA2.MOV"],
  // Zonas comunes (iPhone, 1080×1920 verticales, SDR BT.709, 30 o 29,97 fps, sin rotación: se escalan a 1296×2304 y se pasan a 30 fps). Se normalizan los candidatos (el plan usa unos pocos).
  ["recorrido", "ZC04.MOV", "zc04", "a316c424", "3 Zonas comunes/SALA DE JUNTAS (4).MOV"],
  ["recorrido", "ZC06.MOV", "zc06", "75e252c8", "3 Zonas comunes/SALA DE JUNTAS (6).MOV"],
  ["recorrido", "ZC10.MOV", "zc10", "943cc16c", "3 Zonas comunes/TERRAZA Y JACUZZI (12).MOV"],
  ["recorrido", "ZC11.MOV", "zc11", "bfa181c2", "3 Zonas comunes/TERRAZA Y JACUZZI (13).MOV"],
  ["recorrido", "ZC12.MOV", "zc12", "e105898c", "3 Zonas comunes/TERRAZA Y JACUZZI (14).MOV"],
  ["recorrido", "ZC13.MOV", "zc13", "69af2606", "3 Zonas comunes/TERRAZA Y JACUZZI (15).MOV"],
  ["recorrido", "ZC21.MOV", "zc21", "b2fd9e04", "3 Zonas comunes/TERRAZA Y JACUZZI (22).MOV"],
  ["recorrido", "ZC23.MOV", "zc23", "ee077099", "3 Zonas comunes/TERRAZA Y JACUZZI (3).MOV"],
  ["recorrido", "ZC28.MOV", "zc28", "a23a347d", "3 Zonas comunes/TERRAZA Y JACUZZI (8).MOV"],
  ["recorrido", "ZC29.MOV", "zc29", "a80be7ca", "3 Zonas comunes/TERRAZA Y JACUZZI (9).MOV"],
  // El estudio (mismas características).
  ["recorrido", "RC01.MOV", "rc01", "acac7e6d", "4 Recorrido/ESTUDIO (1).MOV"],
  ["recorrido", "RC02.MOV", "rc02", "d54a1615", "4 Recorrido/ESTUDIO (10).MOV"],
  ["recorrido", "RC04.MOV", "rc04", "0e686747", "4 Recorrido/ESTUDIO (12).MOV"],
  ["recorrido", "RC08.MOV", "rc08", "a486cfdd", "4 Recorrido/ESTUDIO (16).MOV"],
  ["recorrido", "RC11.MOV", "rc11", "6f17513b", "4 Recorrido/ESTUDIO (2).MOV"],
  ["recorrido", "RC12.MOV", "rc12", "8e1b828c", "4 Recorrido/ESTUDIO (3).MOV"],
  ["recorrido", "RC14.MOV", "rc14", "6136fbe1", "4 Recorrido/ESTUDIO (5).MOV"],
  ["recorrido", "RC16.MOV", "rc16", "5c149d3c", "4 Recorrido/ESTUDIO (7).MOV"],
  ["recorrido", "RC18.MOV", "rc18", "00234cfb", "4 Recorrido/ESTUDIO (9).MOV"],
];
/**
 * La canción: archivo en original/ · salida · sha256 (8) · origen (la biblioteca de música del repo, el MISMO archivo que reserva el registro de uso).
 * `null` si la pieza sale sin música (`HAY_MUSICA = false` en `audio-062.ts`).
 */
const MUSICA = [
  "musica-in-this-together.mp3",
  "musica-062",
  "bd507fe6",
  "archivos/musica/In This Together.mp3",
]; // «In This Together» (cinematic emocional, Mi menor): intro con pulso de 1 s que crece hasta una meseta a los 25 s; reservada para la V44 (repetida de la V31/049, de otra propiedad, autorizada por el usuario)

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
    args = ["-nostdin", "-y", "-v", "error", "-noautorotate", "-i", entrada, "-vf", `${giro ? `${giro},` : ""}${marco}${pts}scale=1296:2304:flags=lanczos,format=yuv420p`, ...comunes];
  }
  ejecutar("ffmpeg", args, { check: true });
  log.ok(`${path.basename(salida)} (${clase}${hdr ? " · HLG → BT.709" : " · SDR"} · rotación ${rot}${typeof recorte === "number" ? ` · recorte 9:16 en ${recorte}` : ""})`);
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

/** dB tras el compresor que dejan cada voz en −15,0 LUFS en su ventana (`herramientas/probar-voz.py --umbral 0.0316 --razon 3.5`: +18,1 · +18,2 · +19,6 dB; el limitador deja la MD02 y la CT02 a −15,1 y se subieron 0,1 dB). La ventana de cada toma es la de `VENTANA_VOZ`. */
const GANANCIA_VOZ_DB = { hk02: 18.1, md02: 18.3, ct02: 19.7 };

/**
 * DÓNDE HABLA Isabella en cada toma, y hasta dónde se USA su voz: [primera sílaba, fin de SU frase], en segundos de la fuente, medidos por energía
 * (`limites-voz.py --margen 40`: con el margen por defecto el suelo de ruido a −64 dB hace que casi todas «empiecen» en 0,00 s; R29). Fuera de esta
 * ventana la voz tratada es SILENCIO: la compresión y la ganancia suben ≈ +19 dB cualquier ruido de la toma (los chasquidos a −48/−55 dB de los 0,6 s
 * antes de «Si quieres…» en HK06, la cola de CT04 con 1,1 s sin voz), y entre toma y toma el plan deja un hueco que, sin esto, sonaría con ese ruido de sala.
 * (Aquí `limites-voz.py` da 0,54 / 0,00 / 1,02 s: en la MD02 son chasquidos de 0-0,16 s a −28 dB y en la CT02 un soplo a −47 dB; la voz de verdad arranca a 0,52 / 0,86 / 1,23 s —perfil de energía a 20 ms,
 * banda de voz, primera subida a más de −25 dB— y acaba en 4,05 / 4,99 / 5,38 s. En la HK02 hay un golpe suelto a 4,20-4,27 s que NO es voz y queda fuera de la ventana.)
 * El tercer número es lo que se deja sonar ANTES de la primera sílaba (el defecto, `VOZ_ANTES`).
 */
const VENTANA_VOZ = { hk02: [0.52, 4.1], md02: [0.86, 5.0], ct02: [1.23, 5.4] };
/** Segundos de antes de la primera sílaba y de después del fin de la frase que se dejan sonar, y lo que dura cada fundido. */
const VOZ_ANTES = 0.07;
const VOZ_DESPUES = 0.05;
const VOZ_FUNDIDO_ENTRA = 0.03;
const VOZ_FUNDIDO_SALE = 0.05;
/** La HK02 termina en «Latinoamérica» y el usuario la oyó cortada de golpe (rev. 1): su fundido de salida es de 0,1 s (de 4,05 a 4,15 s de la toma; el golpe suelto de 4,20-4,27 s sigue fuera). */
const VOZ_FUNDIDO_SALE_TOMA = { hk02: 0.1 };

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
  const o = VOZ_FUNDIDO_SALE_TOMA[salidaNombre] ?? VOZ_FUNDIDO_SALE;
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
// este fondo oscuro con el logo y la web (`cierre-062.ts`). Es el mismo color al que funde la imagen (`LUXUR.color.negro`, #000000) y sobre negro puro
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
