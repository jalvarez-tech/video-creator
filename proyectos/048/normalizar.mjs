#!/usr/bin/env node
/**
 * normalizar.mjs — repone `remotion/public/recorrido-048/` desde el material original.
 *
 *   node proyectos/048/normalizar.mjs            (lee de proyectos/048/original/)
 *   node proyectos/048/normalizar.mjs --forzar   (rehace aunque ya exista la salida)
 *   node proyectos/048/normalizar.mjs --solo hk01,rc10   (solo esos nombres de salida; no toca la música ni la tarjeta)
 *
 * PIEZA 048 · V30 · TIERRA GRATA BOSQUE SANTO (El Poblado, ARRIENDO): «Chef y experiencias». Es una de las seis piezas del arriendo (045-050; reparto en
 * `proyectos/044/reparto-045-050.md`) y la que ABRE CON EL HOOK (Isabella, desde el f0). Material de `Apartamento - Tierra Grata - Las Palmas/Videos/`
 * (`1 Hooks`, `2 Miad`, `4 Recorrido`, `5 Cta`; no hay `3 Dron`: no hay dron).
 *
 * POR QUÉ EXISTE. El material es de la propiedad y de la presentadora y no entra en git: en el repo quedan esta receta, el plan y los sha256 de los
 * originales. Con la carpeta delante, un clon repone la pieza entera. Es un script de Node (con `ejecutar()` de `herramientas/comun.mjs`) y no un
 * `.sh` porque el sistema pide recetas que corran igual en macOS y en Windows; la ÚNICA excepción declarada es la rama HDR (HLG → BT.709 con
 * VideoToolbox), que solo corre en macOS y lo dice si no.
 *
 * DE DÓNDE SALEN LOS ARCHIVOS. Se copian del disco del rodaje a `proyectos/048/original/` con el CÓDIGO del catálogo (`proyectos/044/catalogo-material.md`)
 * como nombre y SIN ESPACIOS (nunca se monta desde Descargas). La columna «origen» de `MATERIAL` dice qué archivo del disco es cada uno. El sha es
 * `shasum -a 256 ARCHIVO | cut -c1-8`.
 *
 * ANTES DE TOCAR NADA, medido (R01, R19, R21; ffprobe del 2026-10-19):
 *   · las TRES tomas de Isabella (17-oct, `IMG_42xx.MOV`): HEVC 10 bit **HLG** (`arib-std-b67`, BT.2020), 3840×2160 con `rotation=-90` → pantalla 2160×3840
 *     vertical, a 30 fps (HK01, MD03) o a **29,97 fps** (CT03, `avg_frame_rate` 120000/4003). Sin tone-map salen lavadas (R21): lo hace VideoToolbox
 *     (`scale_vt`), y la rotación también (`transpose_vt`). `fps=30` va DESPUÉS del tone-map (`-r 30` de la salida) y los fotogramas que cuentan son los del MP4
 *     normalizado, nunca los del original;
 *   · los RECORRIDOS (31-ago/2-sep, `Img 9xxx.mp4`): H.264 SDR BT.709 de **1920×1080 píxeles ANAMÓRFICOS** (SAR 81:256, DAR **9:16**: son vídeos VERTICALES comprimidos a lo ancho, sin rotación), a 30 fps (varios con
 *     `avg_frame_rate` irregular). NO son horizontales: lo avisó la sesión del 050 tras mirar `ffprobe stream=sample_aspect_ratio,display_aspect_ratio`. El catálogo (§0 y §7) y la rev. 0-1 de esta pieza los trataron como 16:9 y los
 *     recortaron al centro (`crop=608:1080:X:0`): un zoom ×3,2 sobre un tercio del cuadro. El camino correcto es SIN recorte: `scale=1296:2304` (los 1920 px de ancho se bajan a 1296 y los 1080 de alto se suben ×2,13: más blandos
 *     que Isabella en 4K en vertical) y `setsar=1`, que es el DAR de 9:16 hecho píxel;
 *   · el audio de cada toma: micro de solapa mono; sale en WAV PCM 48 kHz mono, SIN filtro ni nivel (la ganancia vive en el plan, R29) y en otro WAV con la
 *     voz TRATADA (abajo). WAV y no AAC: el AAC arrastra 1024 muestras de priming que desplazan la voz ~21 ms contra su imagen.
 *
 * CLASES de archivo, y cada una sale distinta:
 *   toma       la presentadora a cámara → MP4 mudo + WAV con su voz + WAV con su voz tratada
 *   recorrido  planos de la propiedad → MP4 mudo (anamórfico 9:16: se estira a 1296×2304, sin recorte)
 *   (música)   la canción → WAV estéreo de 48 kHz decodificado ENTERO y NADA MÁS (ni loudnorm): el MP3 arrastra su retardo de códec y el corte al golpe se
 *              hace a la muestra sobre el WAV. Su `desde` sale de la medida de la pista y el nivel es una ganancia del plan.
 *
 * LA VOZ TRATADA. La cadena (`VOZ_TRATADA`) es la de la V13/V18/V22/V26: graves fuera, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada DESPUÉS
 * del compresor (`herramientas/probar-voz.py --umbral 0.0316 --razon 3.5`) hasta −15,0 LUFS en su ventana de voz (el nivel de la música sola) y limitador a
 * −2,5 dBFS. Fuera de la ventana de voz el WAV tratado es SILENCIO. La puerta (`revisar-048.mjs`) vuelve a medirlo.
 *
 * LA TARJETA DEL CIERRE: `cierre-oscuro.png`, un negro liso (ver el final de este archivo). Nada se congela.
 *
 * Vídeo a 1296×2304 · 30 fps · SIN audio: 1296 = 1080 × 1,2, el techo del punch-in (criterio del 011).
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { ES_MAC, RAIZ, ejecutar, flags, log, relativa } from "../../herramientas/comun.mjs";

const ORIGEN = path.join(RAIZ, "proyectos", "048", "original");
const DESTINO = path.join(RAIZ, "remotion", "public", "recorrido-048");
const f = flags();
const solo = typeof f.solo === "string" ? new Set(f.solo.toLowerCase().split(",")) : null;

/**
 * clase · archivo en original/ · nombre de salida (sin extensión) · sha256 (8) del original · origen en el disco del rodaje.
 * El nombre de salida es el que usa el plan: `v("hk01")` → `recorrido-048/hk01.mp4` y `a("hk01")` → `hk01.wav` / `hk01-voz.wav`.
 */
const MATERIAL = [
  // Las tres tomas de Isabella: el hook (HK01, repetida de la V27), la mitad (MD03, repetida de la V28) y el CTA (CT03, repetida de la V29).
  ["toma", "hk01.mov", "hk01", "6222883e", "1 Hooks/IMG_4269.MOV"],
  ["toma", "md03.mov", "md03", "6fdf774f", "2 Miad/IMG_4285.MOV"],
  ["toma", "ct03.mov", "ct03", "a978434e", "5 Cta/IMG_4298.MOV"],
  // Recorridos (HORIZONTALES, SDR). El plan dice cuáles entran y en qué segundos.
  ["recorrido", "rc11.mp4", "rc11", "38a59f31", "4 Recorrido/Img 9513.mp4"], // UNIDAD: Social Kitchen
  ["recorrido", "rc14.mp4", "rc14", "59647a5b", "4 Recorrido/Img 9517.mp4"], // UNIDAD: gimnasio
  ["recorrido", "rc16.mp4", "rc16", "7cdf817e", "4 Recorrido/Img 9525.mp4"], // UNIDAD: el carril de nado
  ["recorrido", "rc05.mp4", "rc05", "931b51dd", "4 Recorrido/Img 9477.mp4"], // APTO: alcoba principal
  ["recorrido", "rc09.mp4", "rc09", "8b1031a3", "4 Recorrido/Img 9484.mp4"], // APTO: baño principal
  ["recorrido", "rc22.mp4", "rc22", "33ac8ce2", "4 Recorrido/Img 9538.mp4"], // APTO: el bar
  ["recorrido", "rc10.mp4", "rc10", "e7e4ee8b", "4 Recorrido/Img 9509.mp4"], // APTO: el balcón, del cielo al jacuzzi privado (CLÍMAX)
];
/**
 * La canción: archivo en original/ · salida · sha256 (8) · origen (la biblioteca de música del repo, el MISMO archivo que reserva el registro de uso).
 * `null` si la pieza sale sin música (`HAY_MUSICA = false` en `audio-048.ts`).
 */
const MUSICA = [
  "musica-amour-toujours.mp3",
  "musica-048",
  "951c5de2",
  "archivos/musica/L' Amour Toujours on SAXOPHONE.mp3",
]; // sax, 126 BPM; la pidió el usuario más alegre que «Einaudi Fly» (la reservada del reparto); reservada para la V30

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

/** La rotación de PANTALLA del archivo (R19): −90 en un iPhone vertical, 0 si ya viene derecho (los recorridos horizontales). */
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
    let anamorfico = false;
    if (rot === 0) {
      // LOS RECORRIDOS ANAMÓRFICOS: 1920×1080 píxeles con SAR 81:256 = DAR 9:16 (vídeos verticales comprimidos a lo ancho). Sin recorte: se estiran al 9:16 que son (`scale=1296:2304` + `setsar=1`). Si un recorrido
      // trajera otro SAR (un 16:9 de verdad), la receta se niega: tocaría decidir su encuadre.
      const sar = sondea(entrada, "stream=sample_aspect_ratio");
      const dar = sondea(entrada, "stream=display_aspect_ratio");
      const ancho = Number(sondea(entrada, "stream=width"));
      const alto = Number(sondea(entrada, "stream=height"));
      if (ancho !== 1920 || alto !== 1080 || dar !== "9:16" || sar !== "81:256") {
        log.error(`${archivo}: se esperaba un recorrido anamórfico 1920×1080 con SAR 81:256 y DAR 9:16 y mide ${ancho}×${alto}, SAR ${sar}, DAR ${dar}`);
        process.exit(1);
      }
      anamorfico = true;
    }
    args = ["-nostdin", "-y", "-v", "error", "-noautorotate", "-i", entrada, "-vf", `${giro ? `${giro},` : ""}scale=1296:2304:flags=lanczos,${anamorfico ? "setsar=1," : ""}format=yuv420p`, ...comunes];
  }
  ejecutar("ffmpeg", args, { check: true });
  log.ok(`${path.basename(salida)} (${clase}${hdr ? " · HLG → BT.709" : " · SDR"} · rotación ${rot}${clase === "recorrido" ? " · anamórfico 9:16 → 1296×2304, sin recorte" : ""})`);
}

function voz(archivo, salidaNombre) {
  const salida = path.join(DESTINO, `${salidaNombre}.wav`);
  if (fs.existsSync(salida) && !f.forzar) return;
  // Sin tocar: solo se decodifica a PCM. Ni filtro ni nivel (la ganancia vive en el plan).
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", path.join(ORIGEN, archivo), "-map", "0:a:0", "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "1", salida], { check: true });
  log.ok(`${path.basename(salida)} (la voz tal cual, mono 48 kHz)`);
}

/**
 * LA CADENA DE LA VOZ TRATADA. highpass → puerta suave → compresor → ganancia → limitador (la de la V13/V26):
 *   highpass 100 Hz   los golpes graves y el viento del micro del iPhone
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
const GANANCIA_VOZ_DB = { hk01: 18.0, md03: 17.9, ct03: 17.4 };

/**
 * DÓNDE HABLA Isabella en cada toma, y hasta dónde se USA su voz: [primera sílaba, fin de SU frase, (opcional) segundos de antes], en segundos de la fuente, medidos por
 * energía (`limites-voz.py --margen 40` y `onsets-voz.py`; R29). Fuera de esta ventana la voz tratada es SILENCIO: la compresión y la ganancia suben ≈ +19 dB cualquier ruido
 * de la toma, y entre toma y toma el plan deja un hueco que, sin esto, sonaría con ese ruido de sala.
 */
const VENTANA_VOZ = { hk01: [1.0, 6.6], md03: [0.68, 6.65], ct03: [0.62, 6.04] };
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

// La TARJETA OSCURA del cierre (plano `cNN-cierre`): un PNG liso del negro de la marca. Nada se congela: la imagen de Isabella funde a negro y sigue
// este fondo oscuro con el logo y la web (`cierre-048.ts`). Es el mismo color al que funde la imagen (`LUXUR.color.negro`, #000000) y sobre negro puro
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
