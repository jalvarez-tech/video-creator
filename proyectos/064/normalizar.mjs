#!/usr/bin/env node
/**
 * normalizar.mjs — repone `remotion/public/recorrido-064/` desde el material original.
 *
 *   node proyectos/064/normalizar.mjs            (lee de proyectos/064/original/)
 *   node proyectos/064/normalizar.mjs --forzar   (rehace aunque ya exista la salida)
 *   node proyectos/064/normalizar.mjs --solo hk02,dr01   (solo esos nombres de salida; no toca la música ni la tarjeta)
 *
 * PIEZA 064 · V46 · LOTE EN SAN VICENTE FERRER (VEREDA LA PORQUERA), REV. 1 (2026-10-22): el segundo de los tres reels de este lote (reparto 063-065 rev. 2 de la sesión madre, `proyectos/063/reparto-063-065.md`),
 * ángulo «NO HACE FALTA IRSE LEJOS: 3.244 M² CERCA DE MEDELLÍN». El usuario cambió el planteamiento: en un LOTE no hay recorrido a pie (el metraje de la propiedad es el DRON) y de mitad solo queda una toma, así que
 * el hook de `Hook2` se parte en dos («la afirmación» y «Ven, te muestro», a corte), tras «te muestro» entra una INFOGRAFÍA de distancias sobre el dron y la mitad es `Hook5` (el antiguo `medio2`, ahora en `1 Hooks`).
 * Tres fuentes de voz de Isabella: HK02 (`Hook2`), HK05 (`Hook5`, solo su primera frase) y CT03 (`cta3`), exclusivas de esta pieza. Dos drones: DR03 entero y DR01 en su tramo 24-48 s (el resto de DR01 es de la 063 y la 065).
 * Material de `Lote San Vicente Ferrer/Videos/` (`1 Hooks`, `3 Dron`, `5 Cta`). La voz va TRATADA a −15 LUFS (cadena de la V13/V18: compresor 3,5:1 desde −30 dBFS).
 *
 * POR QUÉ EXISTE. El material es de la propiedad y de la presentadora y no entra en git: en el repo quedan esta receta, el plan y los sha256 de los
 * originales. Con la carpeta delante, un clon repone la pieza entera. Es un script de Node (con `ejecutar()` de `herramientas/comun.mjs`) y no un
 * `.sh` porque el sistema pide recetas que corran igual en macOS y en Windows; la ÚNICA excepción declarada es la rama HDR (HLG → BT.709 con
 * VideoToolbox), que solo corre en macOS y lo dice si no (aquí no corre: este rodaje es SDR).
 *
 * DE DÓNDE SALEN LOS ARCHIVOS. Se copian del disco del rodaje a `proyectos/064/original/` con el CÓDIGO del catálogo como nombre y SIN ESPACIOS (nunca
 * se monta desde Descargas). La columna «origen» de `MATERIAL` dice qué archivo del disco es cada uno. Rellena el sha con `shasum -a 256 ARCHIVO | cut -c1-8`.
 *
 * ANTES DE TOCAR NADA, medido (R01, R19, R21):
 *   · las TOMAS de Isabella (HK02, HK05, CT03) son H.264 **SDR BT.709**, `1920×1080` ALMACENADOS con `sample_aspect_ratio=81:256` y `display_aspect_ratio=9:16`: son VERTICALES comprimidos a lo ancho
 *     (607,5×1080 efectivos), sin rotación, a 30 fps (CT03 a 29,97), con audio AAC mono. Se escalan ENTERAS a 1296×2304 con `setsar=1` y NUNCA se recortan: un `crop` sobre ellas es un zoom ×3,2 y sale
 *     pixelado (047 y 050, `recorridos-anamorficos-sar`). La receta se niega a seguir si una toma sin rotación no es SAR 81:256 / DAR 9:16;
 *   · los DRONES son HEVC 8 bit **SDR BT.709**, 3840×2160, 29,97 fps, SIN audio. DR03 y DR01 son VERTICALES (`rotation=90`: se rotan con `transpose=cclock`); ya no hay ningún apaisado (el usuario los quitó:
 *     el código de recorte 9:16 de abajo se conserva por si vuelve alguno). Los tres llevan `setpts=PTS*1000/1001` (30 fps exactos, 1 a 1; sin él, `-r 30` repite un fotograma cada ≈ 33 s);
 *   · el audio de cada toma: micro de solapa mono; sale en WAV PCM 48 kHz mono, SIN filtro ni nivel (la ganancia vive en el plan, R29) y en otro WAV con la
 *     voz TRATADA (abajo). WAV y no AAC: el AAC arrastra 1024 muestras de priming que desplazan la voz ~21 ms contra su imagen.
 *
 * CLASES de archivo, y cada una sale distinta:
 *   toma       la presentadora a cámara → MP4 mudo + WAV con su voz + WAV con su voz tratada
 *   dron       planos del dron → MP4 mudo
 *   (música)   la canción → WAV estéreo de 48 kHz decodificado ENTERO y NADA MÁS (ni loudnorm): el MP3 arrastra su retardo de códec y el corte al golpe se
 *              hace a la muestra sobre el WAV. Su `desde` sale de la medida de la pista y el nivel es una ganancia del plan.
 *
 * LA VOZ TRATADA. Las voces llegan a −20…−25 LUFS (ella habla a unos metros de un iPhone) y con una cresta de ≈ 17-20 dB: con ganancia sola los picos
 * saldrían a +5 dBFS. La cadena (`VOZ_TRATADA`) es la de la V13/V18: graves fuera, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada DESPUÉS del
 * compresor (`herramientas/probar-voz.py --umbral 0.0316 --razon 3.5`) hasta −15,0 LUFS en su ventana de voz (el nivel de la música sola) y limitador a
 * −2,5 dBFS. Fuera de la ventana de voz el WAV tratado es SILENCIO. La puerta (`revisar-064.mjs`) vuelve a medirlo.
 *
 * LA TARJETA DEL CIERRE: `cierre-oscuro.png`, un negro liso (ver el final de este archivo). Nada se congela.
 *
 * Vídeo a 1296×2304 · 30 fps · SIN audio: 1296 = 1080 × 1,2, el techo del punch-in (criterio del 011).
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { ES_MAC, RAIZ, ejecutar, flags, log, relativa } from "../../herramientas/comun.mjs";

const ORIGEN = path.join(RAIZ, "proyectos", "064", "original");
const DESTINO = path.join(RAIZ, "remotion", "public", "recorrido-064");
const f = flags();
const solo = typeof f.solo === "string" ? new Set(f.solo.toLowerCase().split(",")) : null;

/**
 * clase · archivo en original/ · nombre de salida (sin extensión) · sha256 (8) del original · origen en el disco del rodaje · [solo dron apaisado] recorte.
 * El nombre de salida es el que usa el plan: `v("hk02")` → `recorrido-064/hk02.mp4` y `a("hk02")` → `hk02.wav` / `hk02-voz.wav`.
 *
 * EL RECORTE 9:16 de un dron apaisado: dónde cae la ventana vertical dentro del ancho LIBRE (0 = pegada a la izquierda, 1 = a la derecha; x = (3840 − 1216) × recorte).
 * (Un mismo original puede salir varias veces con recortes distintos si el plan lo pide: cada tramo usa la ventana que deja dentro lo que importa de ese tramo. Hoy no hay ningún apaisado.)
 */
const MATERIAL = [
  // Las TRES fuentes de voz de Isabella (reparto 063-065 rev. 2): `Hook2` (la afirmación y, aparte, «Ven, te muestro»), `Hook5` (el antiguo `medio2`, ahora en `1 Hooks`: solo su primera frase) y el CTA `cta3`.
  // Exclusivas de esta pieza. Anamórficas (SAR 81:256): se escalan enteras.
  ["toma", "HK02.mp4", "hk02", "a62ba436", "1 Hooks/Hook2.mp4"],
  ["toma", "HK05.mp4", "hk05", "23a38af8", "1 Hooks/Hook5.mp4"],
  ["toma", "CT03.mp4", "ct03", "ea5cd78e", "5 Cta/cta3.mp4"],
  // Los dos drones de esta pieza (3 Dron/): DR03 entero (la apertura y el fondo de la infografía) y DR01 en el tramo 24-48 s. Los dos VERTICALES (rotation=90).
  ["dron", "DR03.MP4", "dr03", "3ffeb500", "3 Dron/DJI_20260911153402_0125_D.MP4"],
  ["dron", "DR01.MP4", "dr01", "8d2f7656", "3 Dron/DJI_20260911152828_0114_D.MP4"],
];
/**
 * La canción: archivo en original/ · salida · sha256 (8) · origen (la biblioteca de música del repo, el MISMO archivo que reserva el registro de uso).
 * `null` si la pieza sale sin música (`HAY_MUSICA = false` en `audio-064.ts`).
 */
const MUSICA = [
  "musica-cornfield-chase.mp3",
  "musica-064",
  "e28cd1ab",
  "archivos/musica/Cornfield Chase.mp3",
]; // «Cornfield Chase» (banda sonora minimalista, órgano y arpegios, Mi menor): 42 s de intro casi muda y crescendo hasta el final de la pista (2:07); reservada para la V46

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
    let despues = ""; // lo que va DESPUÉS del `scale` (el `setsar=1` de las tomas anamórficas: antes, `scale` recalcularía el SAR de salida)
    // LAS TOMAS DE ISABELLA SON ANAMÓRFICAS (descubierto en el 047/050): 1920×1080 ALMACENADOS con SAR 81:256 y DAR 9:16, es decir VERTICALES de 607,5×1080 efectivos comprimidos a lo ancho.
    // Se escalan ENTERAS a 1296×2304 (1920 → 1296 y 1080 → 2304) y se declara el píxel cuadrado (`setsar=1`); un `crop` sobre ellas es un zoom ×3,2 y sale pixelado.
    const [anchoPx, altoPx] = sondea(entrada, "stream=width,height").split(/\s+/).map(Number);
    if (clase === "toma") {
      const sar = sondea(entrada, "stream=sample_aspect_ratio");
      const dar = sondea(entrada, "stream=display_aspect_ratio");
      if (rot !== 0 || sar !== "81:256" || dar !== "9:16") {
        log.error(`${archivo}: una toma de Isabella de este lote tiene que ser el anamórfico (sin rotación, SAR 81:256, DAR 9:16) y es rotación ${rot}, SAR ${sar}, DAR ${dar}: revísalo antes de normalizar`);
        process.exit(1);
      }
      despues = "setsar=1,";
    } else if (rot === 0 && anchoPx > altoPx) {
      // EL RECORTE 9:16 (los DJI apaisados): una ventana vertical de alto completo, en la x que dice `MATERIAL`, y la misma escala que los demás.
      if (typeof recorte !== "number" || recorte < 0 || recorte > 1) {
        log.error(`${archivo}: un clip apaisado sin rotación necesita su recorte (0-1) en la sexta columna de MATERIAL`);
        process.exit(1);
      }
      marco = `crop=trunc(ih*9/16/2)*2:ih:trunc((iw-trunc(ih*9/16/2)*2)*${recorte}/2)*2:0,`;
    }
    args = ["-nostdin", "-y", "-v", "error", "-noautorotate", "-i", entrada, "-vf", `${giro ? `${giro},` : ""}${marco}${pts}scale=1296:2304:flags=lanczos,${despues}format=yuv420p`, ...comunes];
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

/** dB tras el compresor que dejan cada voz en −15,0 LUFS en su ventana (`herramientas/probar-voz.py --umbral 0.0316 --razon 3.5`: +19,2 · +18,5 · +19,2 dB sobre la ventana A+B de la HK02; medida solo la afirmación (A), la HK02 sale a −14,7 con +19,3 y se bajó a +19,0 para dejarla a −15,0). La ventana de cada toma es la de `VENTANA_VOZ`. */
const GANANCIA_VOZ_DB = { hk02: 19.0, hk05: 18.5, ct03: 19.3 };

/**
 * DÓNDE HABLA Isabella en cada toma, y hasta dónde se USA su voz: [primera sílaba, fin de SU frase], en segundos de la fuente, medidos por energía
 * (banda de voz 300-3400 Hz, ventanas de 5 ms: `herramientas/envolvente-voz.py` y el perfil fino de los bordes). `limites-voz.py` NO sirve aquí: las tres tomas llevan tramos de silencio DIGITAL
 * (−120 dB: el suelo se va a −167 dB) y su umbral sale disparatado; y los tiempos por palabra de whisper (DTW) ponen «Un lote cerca de Medellín» en 0,0 s cuando la voz empieza a los 6,97 s (R29).
 * Las tres tomas son LARGAS (16,8 · 17,7 · 15,8 s) porque Isabella deja ≈ 7 s de silencio al principio. HK02 habla de 6,97 a 13,38 s («…metros cuadrados.») y, tras una pausa de 0,54 s (y un soplo de −50…−40 dB), de 13,92 a 14,55 s
 * («Ven, te muestro.»): son DOS ventanas, y el plan las usa en dos planos (la segunda, a corte y con un empuje). HK05 habla de 7,28 a 12,45 s («No necesitas… 3.244 metros cuadrados.»; se USA solo esa primera frase: la
 * parte B, «Ven, te muestro», 13,10-13,77 s, se descarta porque la 064 ya usa la de HK02, y lo que sigue —«este es un pre-», una pausa de 1,8 s y otro bloque de voz de 16,5 a 17,7 s que whisper no lee— no es una frase limpia).
 * CT03 habla de 6,57 a 12,86 s. Antes hay ruido de sala a −45…−60 dB (y, en HK02, un hueco de silencio digital de 1,8 a 3,0 s). `limites-voz.py` NO sirve aquí (el silencio digital deja el suelo en −120 dB) y los tiempos por
 * palabra de whisper (DTW) ponen las primeras palabras en 0,0 s: los límites salen de la energía a 5-10 ms en la banda de voz (R29). Fuera de las ventanas la voz tratada es SILENCIO: la compresión y la ganancia suben ≈ +19 dB
 * cualquier ruido de la toma.
 * El tercer número, si lo hay, es lo que se deja sonar ANTES de la primera sílaba (el defecto, `VOZ_ANTES`).
 */
const VENTANA_VOZ = { hk02: [[6.97, 13.38], [13.92, 14.55, 0.03]], hk05: [[7.28, 12.45]], ct03: [[6.57, 12.86]] };
/** Segundos de antes de la primera sílaba y de después del fin de la frase que se dejan sonar, y lo que dura cada fundido. */
const VOZ_ANTES = 0.07;
const VOZ_DESPUES = 0.05;
const VOZ_FUNDIDO_ENTRA = 0.03;
const VOZ_FUNDIDO_SALE = 0.05;
/** Las tres frases acaban en una vocal átona («muestro», «lote»…) y el usuario ya oyó cortada de golpe una voz así (062, rev. 1): su fundido de salida es de 0,1 s en las tres. */
const VOZ_FUNDIDO_SALE_TOMA = { hk02: 0.1, hk05: 0.1, ct03: 0.1 };

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
  // La ventana (o las ventanas) se aplica como una ENVOLVENTE por muestra (`aeval`): silencio fuera, fundido de entrada y de salida dentro de cada una; con varias, el máximo de sus envolventes. El WAV
  // dura lo mismo que el crudo y sus segundos son los de la fuente, así que `desde` y `voz.s0/s1` del plan valen para los dos.
  const e = VOZ_FUNDIDO_ENTRA;
  const o = VOZ_FUNDIDO_SALE_TOMA[salidaNombre] ?? VOZ_FUNDIDO_SALE;
  const envolventes = ventana.map((w) => {
    const a = Math.max(0, w[0] - (w[2] ?? VOZ_ANTES));
    const b = w[1] + VOZ_DESPUES;
    return { a, b, expr: `if(lt(t,${a.toFixed(3)}),0,if(lt(t,${(a + e).toFixed(3)}),(t-${a.toFixed(3)})/${e},if(lt(t,${(b - o).toFixed(3)}),1,if(lt(t,${b.toFixed(3)}),(${b.toFixed(3)}-t)/${o},0))))` };
  });
  const maximo = envolventes.map((x) => x.expr).reduce((acc, x) => (acc === null ? x : `max(${acc},${x})`), null);
  const compuerta = `aeval='val(0)*${maximo}':c=same`;
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", entrada, "-af", `${VOZ_TRATADA(ganancia)},${compuerta}`, "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "1", salida], { check: true });
  log.ok(`${path.basename(salida)} (la voz tratada: graves, puerta suave, compresión 3,5:1, +${ganancia} dB y limitador a −2,5 dBFS; solo suena de ${envolventes.map((x) => `${x.a.toFixed(2)} a ${x.b.toFixed(2)} s`).join(" y de ")})`);
}

for (const [clase, archivo, salida, , , recorte] of lista) {
  video(clase, archivo, salida, recorte);
  if (clase === "toma") {
    voz(archivo, salida);
    vozTratada(salida);
  }
}

// La TARJETA OSCURA del cierre (plano `c11-cierre`): un PNG liso del negro de la marca. Nada se congela: la imagen de Isabella funde a negro y sigue
// este fondo oscuro con el logo y la web (`cierre-064.ts`). Es el mismo color al que funde la imagen (`LUXUR.color.negro`, #000000) y sobre negro puro
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
