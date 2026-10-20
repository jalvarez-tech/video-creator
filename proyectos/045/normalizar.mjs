#!/usr/bin/env node
/**
 * normalizar.mjs — repone `remotion/public/recorrido-045/` desde el material original.
 *
 *   node proyectos/045/normalizar.mjs            (lee de proyectos/045/original/)
 *   node proyectos/045/normalizar.mjs --forzar   (rehace aunque ya exista la salida)
 *   node proyectos/045/normalizar.mjs --solo hk01,rc21   (solo esos nombres de salida; no toca la música ni la tarjeta)
 *
 * PIEZA 045 · V27 · TIERRA GRATA BOSQUE SANTO (El Poblado), ARRIENDO · «EL TIEMPO»: abre con el APARTAMENTO (RC01, sin texto ni voz), luego HK01 («el tiempo es el activo más valioso…
 * aseo semanal»), el recorrido por la unidad, MD01 («todo ordenado… aprovecharás el tiempo»), el apartamento (alcoba, baño) y, de clímax, RC21 (el balcón al atardecer con el JACUZZI PRIVADO),
 * y CT01 («si quieres un acompañamiento personalizado… contáctanos»). Reparto fijo en `proyectos/044/reparto-045-050.md`; material catalogado en `proyectos/044/catalogo-material.md`.
 * Material de `…/Apartamento - Tierra Grata - Las Palmas/Videos/` (`1 Hooks`, `2 Miad`, `4 Recorrido`, `5 Cta`; NO hay `3 Dron`).
 *
 * POR QUÉ EXISTE. El material es de la propiedad y de la presentadora y no entra en git: en el repo quedan esta receta, el plan y los sha256 de los originales. Con la carpeta delante, un clon
 * repone la pieza entera. Es un script de Node (con `ejecutar()` de `herramientas/comun.mjs`) y no un `.sh` porque el sistema pide recetas que corran igual en macOS y en Windows; la ÚNICA
 * excepción declarada es la rama HDR (HLG → BT.709 con VideoToolbox), que solo corre en macOS y lo dice si no.
 *
 * DE DÓNDE SALEN LOS ARCHIVOS. Se copian del disco del rodaje a `proyectos/045/original/` con el CÓDIGO del catálogo (`proyectos/044/catalogo-material.md`) como nombre y SIN ESPACIOS (nunca se
 * monta desde Descargas; los de Apple traen espacios: `Img 9461.mp4` → `rc01.mp4`). La columna «origen» de `MATERIAL` dice qué archivo del disco es cada uno. sha: `shasum -a 256 ARCHIVO | cut -c1-8`.
 *
 * ANTES DE TOCAR NADA, medido (R01, R19, R21; `ffprobe`, 2026-10-19):
 *   · las tres tomas de Isabella (17-oct, iPhone): HEVC 10 bit **HLG** (`arib-std-b67`, BT.2020), 3840×2160 con `rotation=-90` → pantalla 2160×3840 vertical, 30 fps. Sin tone-map salen lavadas (R21): lo hace
 *     VideoToolbox (`scale_vt`), y la rotación también (`transpose_vt`);
 *   · los RECORRIDOS (31-ago / 2-sep): H.264 **SDR** BT.709, **1920×1080 HORIZONTAL**, sin rotación, 30 fps (RC01 con `avg_frame_rate` irregular: se cuentan los fotogramas tras normalizar). Para el 9:16 se
 *     RECORTAN a una ventana vertical de 608×1080 (`crop=608:1080:X:0`, X en la sexta columna de `MATERIAL`) y se escalan a 1296×2304 (×2,13): salen MÁS BLANDOS que Isabella en 4K, y se dice al usuario
 *     (catálogo §7). Sin el `crop`, `scale=1296:2304` deformaría la imagen. X = 656 centra; RC21 va más a la derecha para que el jacuzzi privado del final del clip caiga dentro del recorte;
 *   · el audio de cada toma: micro de solapa mono; sale en WAV PCM 48 kHz mono, SIN filtro ni nivel (la ganancia vive en el plan, R29) y en otro WAV con la voz TRATADA (abajo). WAV y no AAC: el AAC
 *     arrastra 1024 muestras de priming que desplazan la voz ~21 ms contra su imagen.
 *
 * CLASES de archivo, y cada una sale distinta:
 *   toma       la presentadora a cámara → MP4 mudo + WAV con su voz + WAV con su voz tratada
 *   recorrido  planos de la propiedad → MP4 mudo (HLG o SDR; si es SDR apaisado, con su recorte 9:16)
 *   (música)   la canción → WAV estéreo de 48 kHz decodificado ENTERO y NADA MÁS (ni loudnorm): el MP3 arrastra su retardo de códec y el corte al golpe se hace a la muestra sobre el WAV. Su `desde` sale de la
 *              medida de la pista y el nivel es una ganancia del plan.
 *
 * LA VOZ TRATADA. Las voces llegan a −20…−25 LUFS (ella habla a unos metros de un iPhone) y con una cresta de ≈ 17-20 dB: con ganancia sola los picos saldrían a +5 dBFS. La cadena (`VOZ_TRATADA`) es la
 * de la V13/V18/V22/V26: graves fuera, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada DESPUÉS del compresor (`herramientas/probar-voz.py --umbral 0.0316 --razon 3.5`) hasta −15,0 LUFS en su
 * ventana de voz (el nivel de la música sola) y limitador a −2,5 dBFS. Fuera de la ventana de voz el WAV tratado es SILENCIO. La puerta (`revisar-045.mjs`) vuelve a medirlo.
 *
 * LA TARJETA DEL CIERRE: `cierre-oscuro.png`, un negro liso (ver el final de este archivo). Nada se congela.
 *
 * Vídeo a 1296×2304 · 30 fps · SIN audio: 1296 = 1080 × 1,2, el techo del punch-in (criterio del 011).
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { ES_MAC, RAIZ, ejecutar, flags, log, relativa } from "../../herramientas/comun.mjs";

const ORIGEN = path.join(RAIZ, "proyectos", "045", "original");
const DESTINO = path.join(RAIZ, "remotion", "public", "recorrido-045");
const f = flags();
const solo = typeof f.solo === "string" ? new Set(f.solo.toLowerCase().split(",")) : null;

/**
 * clase · archivo en original/ · nombre de salida (sin extensión) · sha256 (8) del original · origen en el disco del rodaje · [solo recorrido apaisado] X del recorte 9:16, en px del 1920.
 * El nombre de salida es el que usa el plan: `v("hk01")` → `recorrido-045/hk01.mp4` y `a("hk01")` → `hk01.wav` / `hk01-voz.wav`.
 *
 * EL RECORTE 9:16 de un recorrido apaisado (1920×1080): una ventana vertical de 608×1080 cuya esquina izquierda está en la X de la sexta columna (656 = centrada; el máximo es 1920 − 608 = 1312).
 * Se eligió mirando los fotogramas del tramo que usa el plan: lo que importa del plano tiene que quedarse dentro de la ventana. RC21 pide X = 950 para que el jacuzzi privado (que ocupa x ≈ 810-1520 a
 * los 10,5 s) quede casi entero al final de la panorámica; RC13 pide X = 1312 (el borde derecho) para que la estantería con la pared naranja llene el cuadro y la gente que entrena al fondo (centro del 1920) quede fuera o pequeña; los demás van centrados.
 */
const X_CENTRO = 656;
const MATERIAL = [
  // Las tres tomas de Isabella (17-oct, vertical 4K HLG): el hook (HK01), la mitad (MD01) y el CTA (CT01). HK01 y CT01 las repiten otras piezas del lote (reparto de 045-050).
  ["toma", "hk01.mov", "hk01", "6222883e", "1 Hooks/IMG_4269.MOV"],
  ["toma", "md01.mov", "md01", "8bd49f96", "2 Miad/IMG_4274.MOV"],
  ["toma", "ct01.mov", "ct01", "cc19421e", "5 Cta/IMG_4277.MOV"],
  // Recorridos (1920×1080 SDR, sin gente que importe). El plan dice qué tramo entra de cada uno.
  ["recorrido", "rc01.mp4", "rc01", "9f23d5be", "4 Recorrido/Img 9461.mp4", X_CENTRO], //       APTO: cocina → sala con la vista (la apertura)
  ["recorrido", "rc11.mp4", "rc11", "38a59f31", "4 Recorrido/Img 9513.mp4", X_CENTRO], //       UNIDAD: Social Kitchen / coworking
  ["recorrido", "rc13.mp4", "rc13", "e977e148", "4 Recorrido/Img 9516.mp4", 1312], //       UNIDAD: gimnasio, con la ventana pegada a la DERECHA (x = 1312): la estantería y la pared de rayas naranjas, y la gente del fondo sale pequeña (RC14 se descartó: panea a la izquierda y de los 2,6 s en adelante dos hombres entrenando salen grandes y de cara)
  ["recorrido", "rc16.mp4", "rc16", "7cdf817e", "4 Recorrido/Img 9525.mp4", X_CENTRO], //       UNIDAD: el carril de nado
  ["recorrido", "rc05.mp4", "rc05", "931b51dd", "4 Recorrido/Img 9477.mp4", X_CENTRO], //       APTO: alcoba principal
  ["recorrido", "rc09.mp4", "rc09", "8b1031a3", "4 Recorrido/Img 9484.mp4", X_CENTRO], //       APTO: baño principal
  ["recorrido", "rc21.mp4", "rc21", "7ca598cd", "4 Recorrido/Img 9537 (1).mp4", 950], //       APTO: balcón al atardecer con el JACUZZI PRIVADO (el clímax)
];
/**
 * La canción: archivo en original/ · salida · sha256 (8) · origen (la biblioteca de música del repo, el MISMO archivo que reserva el registro de uso).
 * `null` si la pieza sale sin música (`HAY_MUSICA = false` en `audio-045.ts`).
 */
const MUSICA = [
  "musica-fortitude.mp3",
  "musica-045",
  "493eeec6",
  "archivos/musica/Fortitude (Light Version).mp3",
]; // reservada para la V27 (alternativa: Cornfield Chase, e28cd1ab)

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
      // EL RECORTE 9:16 (los recorridos apaisados de 1920×1080): una ventana vertical de 608×1080 en la X que dice `MATERIAL`, ANTES de escalar (sin el `crop`, `scale=1296:2304` deformaría el plano).
      // 1080 px de alto salen a 2304 (×2,13): más blando que Isabella en 4K. Es el material (catálogo §7): no se filtra ni se inventa nitidez (R22).
      if (typeof recorte !== "number" || recorte < 0 || recorte > 1312) {
        log.error(`${archivo}: un clip apaisado sin rotación necesita su X de recorte (0-1312) en la sexta columna de MATERIAL`);
        process.exit(1);
      }
      marco = `crop=608:1080:${recorte}:0,`;
    }
    // Sin dron en esta pieza: todo va a 30 fps (RC01 declara un `avg_frame_rate` irregular: `-fps_mode cfr -r 30` lo regulariza y el plan cuenta los fotogramas del MP4 normalizado).
    const retiempo = "";
    args = ["-nostdin", "-y", "-v", "error", "-noautorotate", "-i", entrada, "-vf", `${giro ? `${giro},` : ""}${marco}scale=1296:2304:flags=lanczos,${retiempo}format=yuv420p`, ...comunes];
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

/** dB tras el compresor que dejan cada voz en −15,0 LUFS en su ventana (`herramientas/probar-voz.py`; la ventana de cada toma es la de `VENTANA_VOZ`). */
const GANANCIA_VOZ_DB = { hk01: 18.0, md01: 18.0, ct01: 17.8 };

/**
 * DÓNDE HABLA Isabella en cada toma, y hasta dónde se USA su voz: [primera sílaba, fin de SU frase, (segundos de antes que se dejan sonar)], en segundos de la fuente, medidos por energía
 * (perfil de 20 ms en la banda de voz 300-3400 Hz, `perfil-voz.py` a 25 ms de paso, y `onsets-voz.py`). Fuera de esta ventana la voz tratada es SILENCIO: la compresión y la ganancia suben ≈ +18 dB
 * cualquier ruido de la toma, y entre toma y toma el plan deja un hueco que, sin esto, sonaría con ese ruido de sala.
 * OJO: whisper pone la primera palabra de cada toma en 0,00 s (R29) y el catálogo (`catalogo-material.md`) decía de HK01 «la voz empieza casi en el f0»: es el DTW. La energía dice que
 * HK01 no habla hasta los 0,82 s: hay 0,76 s de silencio (−66 dB), un resoplido a −46 dB (0,75-0,81 s), el «El» a −21 dB (0,83-0,95 s), 30 ms de pausa (−61 dB) y «tiempo» a −8 dB (1,00 s).
 *   · HK01: «El» sube a los 0,825 s (−36 → −21 dB); el resoplido de antes (0,75-0,81 s, −46 dB) se deja FUERA (a = 0,80 s). Acaba en «semanal» a los 6,62 s (−40 dB a 6,60; −55 a 6,65); a 6,95-7,10 s hay un ruido de boca a −47 dB.
 *   · MD01: un chasquido de labios a 0,55 s (−37 dB, 30 ms) y «De» a los 0,62 s (−47 → −21 → −12 dB). Acaba en «mejor» a los 4,73 s (−49 dB a 4,75).
 *   · CT01: un chasquido a 0,63 s (−31 dB, 40 ms) y «Si» a los 0,70 s (−32 → −17 dB). Acaba en «contáctanos» a los 4,52 s (−34 dB a 4,50; −60 a 4,55).
 * El tercer número es lo que se deja sonar ANTES de la primera sílaba (el defecto, `VOZ_ANTES`): aquí 0,02 · 0,01 · 0,01 s para que los chasquidos queden fuera.
 */
const VENTANA_VOZ = { hk01: [0.82, 6.62, 0.02], md01: [0.62, 4.73, 0.01], ct01: [0.7, 4.52, 0.01] };
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
// este fondo oscuro con el logo y la web (`cierre-045.ts`). Es el mismo color al que funde la imagen (`LUXUR.color.negro`, #000000) y sobre negro puro
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
