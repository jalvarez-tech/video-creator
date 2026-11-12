#!/usr/bin/env node
/**
 * normalizar.mjs — repone `remotion/public/recorrido-074/` desde el material original.
 *
 *   node proyectos/074/normalizar.mjs            (lee de proyectos/074/original/)
 *   node proyectos/074/normalizar.mjs --forzar   (rehace aunque ya exista la salida)
 *   node proyectos/074/normalizar.mjs --solo hk09,zs01   (solo esos nombres de salida; no toca la música ni la tarjeta)
 *
 * PIEZA 074 · V55 · SUITE GO LIVING (EL POBLADO): el quinto reel de esta suite hotelera en venta (reparto 070-075, `proyectos/070/reparto-070-075.md`), ángulo «LAS ZONAS SOCIALES» (la carpeta `6 Zonas Sociales`).
 * Estructura del canal: EXTERIOR (aquí el muro vegetal con el «GO» visto desde el suelo, no hay dron) · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA. Tomas de Isabella: HK09 (hook, en la terraza), MD09 (mitad, en el gimnasio) y CT12 (CTA, en el lounge),
 * exclusivas de esta pieza. Material de `Suite Go Living/Videos/` (`1 Hooks`, `2 Mitad`, `3 Dron`, `4 Recorrido`, `5 Cta`; el catálogo con los códigos está en `proyectos/070/catalogo/`).
 *
 * POR QUÉ EXISTE. El material es de la propiedad y de la presentadora y no entra en git: en el repo quedan esta receta, el plan y los sha256 de los
 * originales. Con la carpeta delante, un clon repone la pieza entera. Es un script de Node (con `ejecutar()` de `herramientas/comun.mjs`) y no un
 * `.sh` porque el sistema pide recetas que corran igual en macOS y en Windows; la ÚNICA excepción declarada es la rama HDR (HLG → BT.709 con
 * VideoToolbox), que solo corre en macOS y lo dice si no. **Aquí SÍ corre**: este rodaje es HLG.
 *
 * DE DÓNDE SALEN LOS ARCHIVOS. Se copian del disco del rodaje a `proyectos/074/original/` con el CÓDIGO del catálogo como nombre y SIN ESPACIOS (nunca
 * se monta desde Descargas). La columna «origen» de `MATERIAL` dice qué archivo del disco es cada uno. El sha es `shasum -a 256 ARCHIVO | cut -c1-8`.
 *
 * ANTES DE TOCAR NADA, medido (R01, R19, R21):
 *   · TODOS los MOV de ESTE rodaje (Isabella, los recorridos y el exterior del edificio): iPhone, HEVC 10 bit **HLG** (`arib-std-b67`, BT.2020), 3840×2160 con `rotation=-90` → pantalla 2160×3840 vertical,
 *     a 30 o 29,97 fps (`r_frame_rate`), con audio AAC. Sin tone-map salen lavados (R21): lo hace VideoToolbox (`scale_vt`) y la rotación también (`transpose_vt`). Se escalan a 1296×2304 y se pasan a 30 fps
 *     (`-fps_mode cfr -r 30`); NO se recortan. Los de 29,97 llevan `setpts=PTS*1000/1001` (sin él, `-r 30` repite un fotograma cada ≈ 33 s). Las TOMAS de Isabella no lo llevan: su voz se mide contra ese vídeo;
 *   · «3 Dron» NO es dron: es el iPhone desde el suelo mirando hacia arriba (misma receta que los demás);
 *   · el audio de cada toma: micro del iPhone (no hay solapa); sale en WAV PCM 48 kHz mono, SIN filtro ni nivel (la ganancia vive en el plan, R29) y en otro WAV con la
 *     voz TRATADA (abajo). WAV y no AAC: el AAC arrastra 1024 muestras de priming que desplazan la voz ~21 ms contra su imagen.
 *
 * CLASES de archivo, y cada una sale distinta:
 *   toma       la presentadora a cámara → MP4 mudo + WAV con su voz + WAV con su voz tratada
 *   recorrido  planos de la propiedad → MP4 mudo
 *   dron       planos del exterior → MP4 mudo (aquí, HLG como todo: se tone-mapea)
 *   (música)   la canción → WAV estéreo de 48 kHz decodificado ENTERO y NADA MÁS (ni loudnorm): el MP3 arrastra su retardo de códec y el corte al golpe se
 *              hace a la muestra sobre el WAV. Su `desde` sale de la medida de la pista y el nivel es una ganancia del plan.
 *
 * LA VOZ TRATADA. −15 LUFS en su ventana de voz (el nivel de la música sola; pedido permanente del canal): graves fuera, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada DESPUÉS del
 * compresor (`herramientas/probar-voz.py --umbral 0.0316 --razon 3.5`) y limitador a −2,5 dBFS. Fuera de la ventana de voz el WAV tratado es SILENCIO. La puerta (`revisar-074.mjs`) vuelve a medirlo.
 *
 * LA TARJETA DEL CIERRE: `cierre-oscuro.png`, un negro liso (ver el final de este archivo). Nada se congela.
 *
 * Vídeo a 1296×2304 · 30 fps · SIN audio: 1296 = 1080 × 1,2, el techo del punch-in (criterio del 011).
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { ES_MAC, RAIZ, ejecutar, flags, log, relativa } from "../../herramientas/comun.mjs";

const ORIGEN = path.join(RAIZ, "proyectos", "074", "original");
const DESTINO = path.join(RAIZ, "remotion", "public", "recorrido-074");
const f = flags();
const solo = typeof f.solo === "string" ? new Set(f.solo.toLowerCase().split(",")) : null;

/**
 * clase · archivo en original/ · nombre de salida (sin extensión) · sha256 (8) del original · origen en el disco del rodaje · [solo dron apaisado] recorte.
 * El nombre de salida es el que usa el plan: `v("hk06")` → `recorrido-074/hk06.mp4` y `a("hk06")` → `hk06.wav` / `hk06-voz.wav`.
 *
 * EL RECORTE 9:16 de un dron apaisado: dónde cae la ventana vertical dentro del ancho LIBRE (0 = pegada a la izquierda, 1 = a la derecha; x = (3840 − 1216) × recorte).
 * Se eligió mirando el tramo que usa el plan (principio, mitad y final; `pruebas-720p/recortes.jpg`): lo que importa del plano tiene que quedarse dentro los tres instantes.
 */
const MATERIAL = [
  // Las tres tomas de Isabella (reparto 070-075): el hook HK09 (en la terraza del edificio, caminando por el pasillo de jardineras), la mitad MD09 (en el gimnasio, caminando hacia cámara) y el CTA CT12 (sentada
  // en las gradas del lounge). Exclusivas de esta pieza.
  ["toma", "HK09.MOV", "hk09", "fcae1f46", "1 Hooks/IMG_5006 2.mov"],
  ["toma", "MD09.MOV", "md09", "b27eb46a", "2 Mitad/IMG_5038 2.mov"],
  ["toma", "CT12.MOV", "ct12", "18fcb3e8", "5 Cta/IMG_5040 2.mov"],
  // El exterior del edificio (iPhone desde el suelo, HLG, rotación −90): DR06 abre la pieza (el muro vegetal con el logotipo «GO» del edificio); DR01, DR03, DR04 y DR07 son los candidatos del bloque 5.
  ["dron", "DR06.MOV", "dr06", "27847c1f", "3 Dron/IMG_5050 2.MOV"],
  ["dron", "DR01.MOV", "dr01", "3504313c", "3 Dron/IMG_5013 2.MOV"],
  ["dron", "DR03.MOV", "dr03", "da5e05c4", "3 Dron/IMG_5018 2.MOV"],
  ["dron", "DR04.MOV", "dr04", "50e1a02b", "3 Dron/IMG_5019 2.MOV"],
  ["dron", "DR07.MOV", "dr07", "eaa09d04", "3 Dron/IMG_5055 2.MOV"],
  // Las zonas sociales sin voz: el gimnasio (ZS01-ZS03; su pista de audio no tiene códec o está vacía, son clase recorrido y salen mudas; ZS04 y ZS05 son la tienda WEGO y NO se normalizan) y, de la suite, la vista del ventanal.
  ["recorrido", "ZS01.MOV", "zs01", "1b41b770", "6 Zonas Sociales/IMG_5044 2.mov"],
  ["recorrido", "ZS02.MOV", "zs02", "dab33323", "6 Zonas Sociales/IMG_5045 2.mov"],
  ["recorrido", "ZS03.MOV", "zs03", "1eb8beb3", "6 Zonas Sociales/IMG_5046 2.mov"],
  ["recorrido", "RC07.MOV", "rc07", "02c55997", "4 Recorrido/IMG_4989 2.MOV"],
  ["recorrido", "RC10.MOV", "rc10", "afaca747", "4 Recorrido/IMG_4992 2.MOV"],
];
/**
 * La canción: archivo en original/ · salida · sha256 (8) · origen (la biblioteca de música del repo, el MISMO archivo que reserva el registro de uso).
 * `null` si la pieza sale sin música (`HAY_MUSICA = false` en `audio-074.ts`).
 */
const MUSICA = [
  "musica-some-say.mp3",
  "musica-074",
  "b652ab54",
  "archivos/musica/Some Say - Acoustic Sunsets (Nea Cover).mp3",
]; // «Some Say» (Nea Cover; pop acústico, Do# mayor, ≈ 105 BPM): repetida de la V6/022 (One Living, otra propiedad, declarada); la V74 entra en su golpe de ≈ 140,7 s y la canción CAE hacia los 175,75 s, bajo el CTA

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
const GANANCIA_VOZ_DB = { hk09: 19.3, md09: 19.2, ct12: 18.3 };

/**
 * DÓNDE HABLA Isabella en cada toma, y hasta dónde se USA su voz: [primera sílaba, fin de SU frase], en segundos de la fuente, medidos por energía
 * (`limites-voz.py --margen 40`: con el margen por defecto el suelo de ruido a −64 dB hace que casi todas «empiecen» en 0,00 s; R29). Fuera de esta
 * ventana la voz tratada es SILENCIO: la compresión y la ganancia suben ≈ +19 dB cualquier ruido de la toma (los chasquidos a −48/−55 dB de los 0,6 s
 * antes de «Si quieres…» en HK06, la cola de CT04 con 1,1 s sin voz), y entre toma y toma el plan deja un hueco que, sin esto, sonaría con ese ruido de sala.
 * (Aquí `limites-voz.py` da 0,54 / 0,00 / 1,02 s: en la MD02 son chasquidos de 0-0,16 s a −28 dB y en la CT02 un soplo a −47 dB; la voz de verdad arranca a 0,52 / 0,86 / 1,23 s —perfil de energía a 20 ms,
 * banda de voz, primera subida a más de −25 dB— y acaba en 4,05 / 4,99 / 5,38 s. En la HK02 hay un golpe suelto a 4,20-4,27 s que NO es voz y queda fuera de la ventana.)
 * El tercer número es lo que se deja sonar ANTES de la primera sílaba (el defecto, `VOZ_ANTES`).
 */
const VENTANA_VOZ = { hk09: [1.04, 4.03], md09: [0.6, 5.48], ct12: [0.68, 3.16] };
/** Segundos de antes de la primera sílaba y de después del fin de la frase que se dejan sonar, y lo que dura cada fundido. */
const VOZ_ANTES = 0.07;
const VOZ_DESPUES = 0.05;
const VOZ_FUNDIDO_ENTRA = 0.03;
const VOZ_FUNDIDO_SALE = 0.05;
/** La HK02 termina en «Latinoamérica» y el usuario la oyó cortada de golpe (rev. 1): su fundido de salida es de 0,1 s (de 4,05 a 4,15 s de la toma; el golpe suelto de 4,20-4,27 s sigue fuera). */
const VOZ_FUNDIDO_SALE_TOMA = {};

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
// este fondo oscuro con el logo y la web (`cierre-074.ts`). Es el mismo color al que funde la imagen (`LUXUR.color.negro`, #000000) y sobre negro puro
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
