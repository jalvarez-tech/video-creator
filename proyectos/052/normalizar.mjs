#!/usr/bin/env node
/**
 * normalizar.mjs — repone `remotion/public/recorrido-052/` desde el material original.
 *
 *   node proyectos/052/normalizar.mjs            (lee de proyectos/052/original/)
 *   node proyectos/052/normalizar.mjs --forzar   (rehace aunque ya exista la salida)
 *   node proyectos/052/normalizar.mjs --solo hk02,rc20   (solo esos nombres de salida; no toca la música ni la tarjeta)
 *
 * PIEZA 052 · V34 · TIERRA GRATA BOSQUE SANTO (El Poblado), ARRIENDO: «PREGÚNTATE ESTO», la RÉPLICA de `videos editados/02.mp4` (15-sep-2026, 77,6 s) con las mismas tomas y el mismo texto, en el formato
 * del canal. Abre con el hook a cámara (HK04, el sofá), sigue el recorrido en el orden del original SIN voz en off (nueve rótulos en pantalla, cambio de encargo del 2026-10-20) y cierra con CT05. *Armin van Buuren - Here For You (Piano)*. Reparto en
 * `proyectos/044/reparto-051-053.md`; el material, catalogado en `proyectos/044/catalogo-material.md`, es de `Apartamento - Tierra Grata - Las Palmas/Videos/` (`1 Hooks`, `4 Recorrido`, `5 Cta`).
 *
 * POR QUÉ EXISTE. El material es de la propiedad y de la presentadora y no entra en git: en el repo quedan esta receta, el plan y los sha256 de los
 * originales. Con la carpeta delante, un clon repone la pieza entera. Es un script de Node (con `ejecutar()` de `herramientas/comun.mjs`) y no un
 * `.sh` porque el sistema pide recetas que corran igual en macOS y en Windows; la ÚNICA excepción declarada es la rama HDR (HLG → BT.709 con
 * VideoToolbox), que solo corre en macOS y lo dice si no.
 *
 * DE DÓNDE SALEN LOS ARCHIVOS. Se copian del disco del rodaje a `proyectos/052/original/` con el CÓDIGO del catálogo como nombre y SIN ESPACIOS (nunca se monta desde Descargas).
 * La columna «origen» de `MATERIAL` dice qué archivo del disco es cada uno. Rellena el sha con `shasum -a 256 ARCHIVO | cut -c1-8`.
 *
 * ANTES DE TOCAR NADA, medido (R01, R19, R21; ffprobe del 2026-10-19):
 *   · las dos tomas de Isabella de esta pieza (HK04 y CT05) son del 2-sep: H.264 SDR BT.709, 1920×1080 con SAR 81:256 (anamórficas, como los recorridos) y audio AAC mono; `Img 9496` (HK04) declara
 *     un `avg_frame_rate` de 29,995 sobre 51,7 s: la salida va a 30 fps constantes (`-fps_mode cfr`) y el plan cuenta los frames del MP4 NORMALIZADO, nunca los del original. (La rama HLG de
 *     abajo, con VideoToolbox, no corre en esta pieza: la dejan las recetas de las piezas con Isabella del 17-oct.);
 *   · **los RECORRIDOS (22 clips, aquí 10, y las tomas HK04 / CT05 / CT04) son ANAMÓRFICOS, no horizontales**: H.264 1920×1080 SDR BT.709 guardados con `sample_aspect_ratio=81:256` y `display_aspect_ratio=9:16`, es decir, VERTICALES de
 *     608×1080 efectivos comprimidos a lo ancho; sin rotación, 30 fps (varios con `avg_frame_rate` irregular: `-fps_mode cfr` lo iguala). Se escalan ENTEROS: `scale=1296:2304:flags=lanczos,setsar=1`, SIN recorte.
 *     (El catálogo de la mañana del 2026-10-19 mandaba `crop=608:1080:656:0`: un zoom ×3,2 del tercio central que salía «pixelado» —lo vio el usuario en la 047—. Se ve con el SAR:
 *     `ffprobe -show_entries stream=sample_aspect_ratio,display_aspect_ratio`.) Salen algo más BLANDOS que Isabella en 4K: 608×1080 efectivos ×2,13;
 *   · el audio de cada toma: micro de solapa mono; sale en WAV PCM 48 kHz mono, SIN filtro ni nivel (la ganancia vive en el plan, R29) y en otro WAV con la
 *     voz TRATADA (abajo). WAV y no AAC: el AAC arrastra 1024 muestras de priming que desplazan la voz ~21 ms contra su imagen. El audio de los recorridos (ambiente estéreo) no se usa.
 *
 * CLASES de archivo, y cada una sale distinta:
 *   toma       la presentadora a cámara → MP4 mudo + WAV con su voz + WAV con su voz tratada
 *   recorrido  planos de la propiedad → MP4 mudo (anamórficos 81:256: escalados enteros, `setsar=1`). Un nombre de salida de `INVERTIDOS` sale AL REVÉS (`reverse`): el original de 02.mp4 pasa
 *              el balcón del atardecer (RC21) hacia atrás, del jacuzzi a la ciudad (`rc21r`)
 *   audio      una voz en off → solo el WAV, mono y sin tratar, y su voz tratada (esta pieza no lleva ninguna: sin locución)
 *   (música)   la canción → WAV estéreo de 48 kHz decodificado ENTERO y NADA MÁS (ni loudnorm): el MP3 arrastra su retardo de códec y el corte al golpe se
 *              hace a la muestra sobre el WAV. Su `desde` sale de la medida de la pista y el nivel es una ganancia del plan.
 *
 * LA VOZ TRATADA. Las voces llegan a −20…−25 LUFS (ella habla a unos metros de un iPhone) y con una cresta de ≈ 17-20 dB: con ganancia sola los picos
 * saldrían a +5 dBFS. La cadena (`VOZ_TRATADA`) es la de la V13/V18/V22/V26: graves fuera, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada DESPUÉS del
 * compresor (`herramientas/probar-voz.py --umbral 0.0316 --razon 3.5`) hasta −15,0 LUFS en su ventana de voz (el nivel de la música sola) y limitador a
 * −2,5 dBFS. Fuera de la ventana de voz el WAV tratado es SILENCIO. La puerta (`revisar-052.mjs`) vuelve a medirlo.
 *
 * LA TARJETA DEL CIERRE: `cierre-oscuro.png`, un negro liso (ver el final de este archivo). Nada se congela.
 *
 * Vídeo a 1296×2304 · 30 fps · SIN audio: 1296 = 1080 × 1,2, el techo del punch-in (criterio del 011).
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { ES_MAC, RAIZ, ejecutar, flags, log, relativa } from "../../herramientas/comun.mjs";

const ORIGEN = path.join(RAIZ, "proyectos", "052", "original");
const DESTINO = path.join(RAIZ, "remotion", "public", "recorrido-052");
const f = flags();
const solo = typeof f.solo === "string" ? new Set(f.solo.toLowerCase().split(",")) : null;

/**
 * clase · archivo en original/ · nombre de salida (sin extensión) · sha256 (8) del original · origen en el disco del rodaje.
 * El nombre de salida es el que usa el plan: `v("hk02")` → `recorrido-052/hk02.mp4` y `a("hk02")` → `hk02.wav` / `hk02-voz.wav`.
 *
 * (Los recorridos no se recortan: se escalan enteros, ver arriba.)
 */
const MATERIAL = [
  // Las dos tomas de Isabella del 2-sep (chaqueta de flores; anamórficas): el hook (HK04, sentada en el sofá: «Antes de arrendar amoblado, pregúntate esto») y el CTA (CT05, sentada en la silla de la sala; la misma
  // toma cierra la 053: declarado).
  ["toma", "hk04.mp4", "hk04", "1e5a0db5", "1 Hooks/Img 9496.mp4"],
  ["toma", "ct05.mp4", "ct05", "5bc7d1a0", "5 Cta/Img 9501.mp4"],
  // Los recorridos en el ORDEN del original (`02.mp4`, lectura por fotogramas, 2026-10-20): el balcón del atardecer (RC21, AL REVÉS: el original lo pasa del jacuzzi a la ciudad) → el bar de noche (RC22) → la alcoba
  // (RC06) → la cocina, la sala con la palma y el ventanal (RC01) → el balcón con las camas y las torres (RC03) → el sauna (RC15) → «Isabella en la cocina» (NO está en el material: CT04, ella caminando en la sala,
  // sin voz) → la piscina (RC16) → «el bosque con hierba» (NO está en el material y no se sustituye) → el gimnasio (RC13) → la Social Kitchen (RC12).
  ["recorrido", "rc21.mp4", "rc21r", "7ca598cd", "4 Recorrido/Img 9537 (1).mp4"],
  ["recorrido", "rc22.mp4", "rc22", "33ac8ce2", "4 Recorrido/Img 9538.mp4"],
  ["recorrido", "rc06.mp4", "rc06", "556bee38", "4 Recorrido/Img 9479.mp4"],
  ["recorrido", "rc01.mp4", "rc01", "9f23d5be", "4 Recorrido/Img 9461.mp4"],
  ["recorrido", "rc03.mp4", "rc03", "e5dd0f12", "4 Recorrido/Img 9464.mp4"],
  ["recorrido", "rc15.mp4", "rc15", "14db00b3", "4 Recorrido/Img 9524.mp4"],
  ["recorrido", "ct04.mp4", "ct04", "6765b9fd", "5 Cta/Img 9492.mp4"],
  ["recorrido", "rc16.mp4", "rc16", "7cdf817e", "4 Recorrido/Img 9525.mp4"],
  ["recorrido", "rc13.mp4", "rc13", "e977e148", "4 Recorrido/Img 9516.mp4"],
  ["recorrido", "rc12.mp4", "rc12", "7bc5ad03", "4 Recorrido/Img 9514.mp4"],
  // (No hay locución: el encargo cambió el 2026-10-20 a un guion nuevo EN PANTALLA. Se generó una con ElevenLabs —voz de stock «Bella», 1.101 caracteres— antes del cambio y NO se usa: la clase `audio` sigue disponible.)
];
/** Los recorridos que salen AL REVÉS (`reverse`): el nombre de salida es el que usa el plan. */
const INVERTIDOS = new Set(["rc21r"]);
/**
 * La canción: archivo en original/ · salida · sha256 (8) · origen (la biblioteca de música del repo, el MISMO archivo que reserva el registro de uso).
 * `null` si la pieza sale sin música (`HAY_MUSICA = false` en `audio-052.ts`).
 */
const MUSICA = [
  "musica-here-for-you.mp3",
  "musica-052",
  "6fbbe88d",
  "archivos/musica/Armin van Buuren - Here For You (from 'Piano' album).mp3",
]; // piano, 3:55, sin caída; reservada para la V34

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
    // Los recorridos (rotación 0) son anamórficos (SAR 81:256, DAR 9:16): `scale` a 1296×2304 + `setsar=1` los deja con su geometría correcta, SIN recorte.
    // Los DJI van a 29,97 fps: con `fps=30` solo, ffmpeg REPITE un fotograma cada 1001 (cada ≈ 33 s) y, si cae en el tramo de un plano, se ve una micro-parada.
    // Se reproducen un 0,1 % más rápido (`setpts=PTS*1000/1001`): cada fotograma de la fuente sale UNA vez; el `desde` del plan va en el tiempo nuevo (`dji()`).
    const retiempo = clase === "dron" && sondea(entrada, "stream=r_frame_rate") === "30000/1001" ? "setpts=PTS*1000/1001,fps=30," : "";
    // `reverse` guarda TODO el clip en memoria (RC21: 11 s a 1920×1080 ≈ 1 GB): se hace antes de escalar, que sale más barato.
    const alReves = INVERTIDOS.has(salidaNombre) ? "reverse," : "";
    args = ["-nostdin", "-y", "-v", "error", "-noautorotate", "-i", entrada, "-vf", `${giro ? `${giro},` : ""}${alReves}scale=1296:2304:flags=lanczos,setsar=1,${retiempo}format=yuv420p`, ...comunes];
  }
  ejecutar("ffmpeg", args, { check: true });
  log.ok(`${path.basename(salida)} (${clase}${hdr ? " · HLG → BT.709" : " · SDR"} · rotación ${rot}${INVERTIDOS.has(salidaNombre) ? " · AL REVÉS" : ""})`);
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
const VOZ_TRATADA = (gananciaDb, [ataque, relevo] = [4, 120]) =>
  [
    "highpass=f=100:poles=2",
    "agate=threshold=0.0056:ratio=2:range=0.25:attack=5:release=200",
    `acompressor=threshold=0.0316:ratio=3.5:attack=${ataque}:release=${relevo}:knee=6`,
    `volume=${gananciaDb}dB`,
    "alimiter=limit=0.75:attack=1:release=60:level=disabled:latency=1",
  ].join(",");

/** dB tras el compresor que dejan cada voz en −15,0 LUFS en su ventana (`herramientas/probar-voz.py`; la ventana de cada toma es la de `VENTANA_VOZ`). */
const GANANCIA_VOZ_DB = { hk04: 19.4, ct05: 20.4 };

/**
 * DÓNDE HABLA Isabella en cada toma, y hasta dónde se USA su voz: [primera sílaba, fin de SU frase], en segundos de la fuente, medidos por energía
 * (`limites-voz.py --margen 40`: con el margen por defecto el suelo de ruido a −64 dB hace que casi todas «empiecen» en 0,00 s; R29). Fuera de esta
 * ventana la voz tratada es SILENCIO: la compresión y la ganancia suben ≈ +19 dB cualquier ruido de la toma (los chasquidos a −48/−55 dB de los 0,6 s
 * antes de «Si quieres…» en HK06, la cola de CT04 con 1,1 s sin voz), y entre toma y toma el plan deja un hueco que, sin esto, sonaría con ese ruido de sala.
 * (En estas tres tomas `limites-voz.py --margen 40` da 0,03 s en HK06 —esos chasquidos superan su umbral, porque el suelo es de −92 dB— y 0,95/0,49 s en las
 * otras; los inicios de abajo son los del perfil de energía a 20 ms, banda de voz: la primera subida a más de −40 dB.)
 * El tercer número es lo que se deja sonar ANTES de la primera sílaba (el defecto, `VOZ_ANTES`).
 */
const VENTANA_VOZ = { hk04: [2.9, 7.17], ct05: [1.3, 4.08] };
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
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", entrada, "-af", `${VOZ_TRATADA(ganancia, undefined)},${compuerta}`, "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "1", salida], { check: true });
  log.ok(`${path.basename(salida)} (la voz tratada: graves, puerta suave, compresión 3,5:1, +${ganancia} dB y limitador a −2,5 dBFS; solo suena de ${a.toFixed(2)} a ${b.toFixed(2)} s)`);
}

for (const [clase, archivo, salida] of lista) {
  if (clase === "audio") {
    // La locución en off: solo el WAV (mono, sin tratar) y su voz tratada con la ventana y la ganancia de abajo.
    voz(archivo, salida);
    vozTratada(salida);
    continue;
  }
  video(clase, archivo, salida);
  if (clase === "toma") {
    voz(archivo, salida);
    vozTratada(salida);
  }
}

// La TARJETA OSCURA del cierre (plano `c11-cierre`): un PNG liso del negro de la marca. Nada se congela: la imagen de Isabella funde a negro y sigue
// este fondo oscuro con el logo y la web (`cierre-052.ts`). Es el mismo color al que funde la imagen (`LUXUR.color.negro`, #000000) y sobre negro puro
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
