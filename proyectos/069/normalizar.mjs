#!/usr/bin/env node
/**
 * normalizar.mjs — repone `remotion/public/botswana-069/` desde el material original.
 *
 *   node proyectos/069/normalizar.mjs                 (lee de proyectos/069/original/)
 *   node proyectos/069/normalizar.mjs --forzar        (rehace aunque ya exista la salida)
 *   node proyectos/069/normalizar.mjs --solo mov1,a03 (solo esos nombres de salida; no toca la tarjeta)
 *   node proyectos/069/normalizar.mjs --voz           (las locuciones de proyectos/069/voz/; ver abajo)
 *
 * PIEZA 069 · VÍDEO DE AYUDA PARA BOTSWANA (Cartagena): el salón de eventos donde John e Isabella se casaron se incendió y su dueño, Nelson, tiene
 * que reconstruirlo. Pieza personal de ellos dos, sin canal ni marca. Material de `~/Downloads/Botswana` (20 MP4 de WhatsApp/Instagram del incendio y
 * del después, 7 fotos y los dos MOV de iPhone de ellos dos hablando) más las tres publicaciones de la boda de @jalvarez.tech (`instagram/`, ver
 * `instagram/FUENTES.md`: dos carruseles de 20 fotos y un vídeo de 52 s). Todo se copió a `proyectos/069/original/` con un nombre con significado;
 * nunca se monta desde Descargas.
 *
 * POR QUÉ EXISTE. El material es de ellos y no entra en git: en el repo quedan esta receta, el plan y los sha256 de los originales.
 *
 * ANTES DE TOCAR NADA, medido (R01, R19, R21):
 *   · los dos MOV (`mov1`, `mov2`): HEVC 10 bit **HLG** (`arib-std-b67`), 3840×2160 almacenados con `rotation=-90` → 2160×3840 en pantalla, 30 fps (el
 *     segundo VFR). Pasan por la rama HDR de la R21 (VideoToolbox: solo corre en macOS; es lo que hay);
 *   · los MP4 del incendio son recompresiones de mensajería: 464×832 (algunos 480×864) a 60/28/30 fps y VFR, y cuatro apaisados (832×464). Son la ÚNICA
 *     imagen que hay de ese día: se ven blandos a pantalla completa y el plan no les pide punch-in (declarado en `01-plan.md`). No se recortan los apaisados
 *     (sería un zoom ×3,9): van enteros sobre un fondo desenfocado de sí mismos;
 *   · las fotos de Instagram son de 1440 px de ancho (4:3 y 3:2 apaisadas): también van enteras sobre su propio fondo desenfocado, salvo las que el
 *     plan marca «recorte», que son composiciones centradas (un beso, una vereda con antorchas) y llenan el cuadro con una ventana 9:16;
 *   · el audio de los MP4 sirve de poco (gritos, viento, música de fiesta en el vídeo de la boda): TODO sale MUDO (R16). Solo suenan los dos MOV.
 *
 * LA VOZ DE LOS MOV (`mov1-voz.wav`, `mov2-voz.wav`): hablan a un iPhone desde varios metros, a −38 LUFS con una cresta de 17 dB. La cadena es la del
 * canal sin la puerta (a −45 dBFS se comería las sílabas finales; el suelo del ruido ya es digital, −64 dBFS): graves fuera, compresor suave 3:1,
 * ganancia buscada DESPUÉS del compresor hasta −15 LUFS (el nivel que el estudio usa para la voz) y limitador a −2 dBFS. Fuera de la ventana de voz el WAV
 * es SILENCIO, con fundidos: antes y después de lo que dicen hay ruidos de la toma (pasos, risas, el «corte») que la ganancia de +30 dB subiría.
 *   mov1  habla de 11,8 a 20,4 s  («En Botswana nos casamos, pero aquí no solo celebramos una boda. Aquí reafirmamos nuestro amor y el sueño de
 *                                   construir juntos como familia.»)
 *   mov2  habla de 6,0 a 14,5 s   («…cuando la vida golpea aquello que amamos, debemos unirnos para volver a construirlo.» Whisper oyó «vía» dos
 *                                   veces, y en `john-en-el-sitio` también: es «vida» casi seguro; se confirma oyéndolo antes de poner subtítulos)
 * Medidos por energía (perfil de 100 ms, 150-4000 Hz), no con whisper: sus tiempos por palabra se reparten dentro de la frase.
 *
 * `--voz`: cuando lleguen las locuciones (John e Isabella las graban aparte), se dejan en `proyectos/069/voz/` con el nombre del hueco
 * (`john-1.wav`, `isabella-1.wav`, `john-2.wav`, `john-3.wav`, `isabella-2.wav`; wav, mp3, m4a o aif), y este modo las pasa a WAV de 48 kHz mono, las
 * lleva a −15 LUFS con limitador a −2 dBFS, las copia a `public/botswana-069/voz/` y escribe `remotion/src/proyectos/069/voces-069.ts` (duración medida de
 * cada una). `audio-069.ts` las pone en el frame de su hueco y la puerta (`revisar-069.mjs`) comprueba que CABEN.
 *
 * Vídeo a 1296×2304 · 30 fps · SIN audio: 1296 = 1080 × 1,2, el techo del punch-in (criterio del 011).
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { ES_MAC, RAIZ, ejecutar, flags, log, relativa } from "../../herramientas/comun.mjs";

const ORIGEN = path.join(RAIZ, "proyectos", "069", "original");
const DESTINO = path.join(RAIZ, "remotion", "public", "botswana-069");
const VOCES_ENTRADA = path.join(RAIZ, "proyectos", "069", "voz");
const VOCES_TS = path.join(RAIZ, "remotion", "src", "proyectos", "069", "voces-069.ts");
const f = flags();
const solo = typeof f.solo === "string" ? new Set(f.solo.toLowerCase().split(",")) : null;

const ANCHO = 1296;
const ALTO = 2304;

/**
 * clase · archivo en original/ · nombre de salida (sin extensión) · sha256 (8) del original · qué es · [opciones]
 *   toma          un MOV de ellos hablando: MP4 mudo (HDR → BT.709) + WAV de la voz tratada
 *   clip          un vídeo vertical → MP4 mudo a 1296×2304
 *   clip-relleno  un vídeo apaisado → MP4 mudo, entero sobre su fondo desenfocado
 *   foto          una foto → JPEG 1296×2304; `modo: "relleno"` (entera sobre su fondo) o `modo: "recorte"` con `fx` (0-1: dónde cae el centro de la ventana 9:16)
 */
const MATERIAL = [
  // `mov1` es un plano abierto en el que ellos son figuras pequeñas y caminan por el LADO IZQUIERDO del cuadro (hacia el 30 % del ancho). El encuadre se cuece en el archivo: ventana 9:16 de la
  // fuente 4K con zoom ×1,6 centrada en (31 % del ancho —pegada al borde izquierdo: es lo máximo que cabe con ese zoom—, 58 % del alto) → 1350×2400 (= 1,25 × el cuadro, SIN reescalar: 2160/1,6 = 1350 px de la fuente). Así quedan casi al centro y el zoom que
  // añade el plano (≤ 1,2) sigue por debajo del 1:1 de la fuente. El motor no tiene pan horizontal: solo `pan` vertical en `Corte`.
  ["toma", "clips/mov1.MOV", "mov1", "bf4afa35", "Isabella y John caminando hacia cámara por el camino: «En Botswana nos casamos…» (escena 2)", { ancho: 1350, alto: 2400, recorte: { z: 1.6, uc: 0.3125, vc: 0.58 } }],
  ["toma", "clips/mov2.MOV", "mov2", "e5bd72df", "Isabella y John de la mano en la calle, cielo de tormenta: «…debemos unirnos para volver a construirlo» (escena 4)"],

  ["clip", "clips/inc01.mp4", "inc01", "ac33079b", "el incendio visto desde una azotea, humo y llamas sobre los tejados (480×864, 28 fps VFR)"],
  ["clip", "clips/inc02.mp4", "inc02", "8c97a4a6", "el incendio desde la misma azotea, las llamas en el árbol (480×864)"],
  ["clip", "clips/inc03.mp4", "inc03", "a36813e4", "el incendio a pie de palapa, llamas sobre el naranjo y un hombre mirando"],
  // El lugar como quedó (revisión 2, pedido de ellos: «que no salgan tantas imágenes de nuestra boda, sino de cómo quedó el lugar»). Todos son recompresiones de mensajería a 464×832, 60 fps (los
  // apaisados, 832×464): blandos a pantalla completa, sin punch-in. En ninguno se ve a nadie de cerca (los de la gente sentada entre los escombros —`gen01`— y el obrero con la pala —`lim01`— siguen fuera).
  ["clip", "clips/lle01.mp4", "lle01", "25716104", "la llegada al sitio con el incendio activo; hacia los 28-31 s el arco «BOTSWANA Cartagena Beach» con el humo y las llamas detrás (464×832, 60 fps)"],
  ["clip", "clips/bom01.mp4", "bom01", "a7b10f92", "los bomberos con las mangueras entre la estructura quemada y todavía humeante (464×832, 60 fps)"],
  ["clip", "clips/des03.mp4", "des03", "976ec806", "recorrido por los escombros del día después: columna negra con varillas, muros ennegrecidos (464×832, 60 fps)"],
  ["clip", "clips/des07.mp4", "des07", "b1e17848", "los restos de la cocina con frascos derretidos y la limpieza con costales (464×832, 60 fps)"],
  ["clip-relleno", "clips/des08.mp4", "des08", "6b846009", "el patio calcinado en plano abierto, con la cinta amarilla y la reja quemada (apaisado 832×464, 60 fps)"],
  ["clip", "instagram/C-boda.mp4", "boda", "5e81814a", "la fiesta de la boda: baile con la novia, el perro, el salón vacío (@diegoskyoficial; 720×1280; su música NO se usa)"],
  ["clip-relleno", "clips/ant02.mp4", "ant02", "5344cc52", "recorrido de Botswana ANTES del incendio: el salón naranja, las cabañas, el sendero con antorchas (apaisado 832×464)"],
  // Rev. 8 (pedido de ellos): la serenata de SU boda en Botswana, edición final de 68 s con su propia música (NO se usa: todo sale mudo). Viene de `/Volumes/SSK SSD/Boda/Videos/Finales/Serenata.mp4` (copia en original/clips/): 1080×1920, 30 fps, H.264 SDR BT.709. El plano usa de 23,0 a 27,9 s: la cámara avanza de noche por el patio con las luces y las palapas.
  ["clip", "clips/serenata.mp4", "serenata", "25360909", "la serenata de su boda en Botswana, de noche (1080×1920, 68 s; el plano usa de 23,0 a 27,9 s)"],

  ["foto", "fotos/antes-cabanas.jpg", "antes-cabanas", "e848ee70", "las dos cabañas con antorchas, ANTES del incendio (3840×2160)", { modo: "recorte", fx: 0.5 }],
  ["foto", "fotos/antes-sala.jpg", "antes-sala", "76468638", "el salón de eventos con su luz naranja, ANTES del incendio (3840×2160)", { modo: "recorte", fx: 0.42 }],
  // Las tres fotos de 12 MP del lugar quemado van RECORTADAS a 9:16 (ventana de 1701×3024 px de la foto, bajada a 1296×2304: nítida) y llenan el cuadro: es el protagonista de la pieza y a banda sobre fondo borroso perdía la mitad de la pantalla.
  ["foto", "fotos/quemado-muro.jpg", "quemado-muro", "1b5bbbaa", "el muro y las vigas calcinadas, DESPUÉS (4032×3024)", { modo: "recorte", fx: 0.42 }],
  ["foto", "fotos/bomberos-a.jpg", "bomberos-a", "b449f167", "un bombero entre los postes quemados y los charcos del patio (4032×3024)", { modo: "recorte", fx: 0.22 }],
  ["foto", "fotos/bomberos-estructura.jpg", "bomberos-estructura", "4a690268", "los bomberos entre la estructura quemada (4032×3024)", { modo: "recorte", fx: 0.62 }],

  // Recepción (carrusel DSwG8mVjfvw): retratos, brindis, familias, baile.
  ["foto", "instagram/A-02.jpg", "a02", "ed0dc6eb", "los novios sentados, retrato", { modo: "relleno" }],
  ["foto", "instagram/A-03.jpg", "a03", "ef01b33c", "el beso con el ramo, letrero LOVE al fondo", { modo: "recorte", fx: 0.46 }],
  ["foto", "instagram/A-06.jpg", "a06", "67266f31", "el abrazo bajo el arco de palma", { modo: "relleno" }],
  ["foto", "instagram/A-07.jpg", "a07", "b02accc6", "los novios muy juntos, sonriendo a cámara", { modo: "relleno" }],
  ["foto", "instagram/A-08.jpg", "a08", "2b0c89f7", "las manos con los anillos, «Better Together» en neón", { modo: "relleno" }],
  ["foto", "instagram/A-09.jpg", "a09", "58b8db8a", "el beso ante el LOVE, los niños tapándose los ojos", { modo: "relleno" }],
  ["foto", "instagram/A-10.jpg", "a10", "708dd97d", "el brindis", { modo: "relleno" }],
  ["foto", "instagram/A-13.jpg", "a13", "17519627", "foto de grupo: las familias reunidas", { modo: "relleno" }],
  ["foto", "instagram/A-14.jpg", "a14", "baf91fe9", "foto de grupo: familias y amigos de blanco", { modo: "relleno" }],
  ["foto", "instagram/A-15.jpg", "a15", "4ed83e08", "foto de grupo: las familias con vestidos de colores", { modo: "relleno" }],
  ["foto", "instagram/A-18.jpg", "a18", "12ccfe9f", "la novia en brazos de su madre y su tía, riendo", { modo: "relleno" }],
  ["foto", "instagram/A-19.jpg", "a19", "8f7ebe39", "el primer baile con chispas frías", { modo: "relleno" }],

  // Ceremonia en la playa (carrusel DS5QM-qDatK): anillos, arena, salida.
  ["foto", "instagram/B-01.jpg", "b01", "eaac1eb6", "la ceremonia en la playa al atardecer, plano general", { modo: "relleno" }],
  ["foto", "instagram/B-07.jpg", "b07", "6b2962b5", "el anillo puesto en la mano", { modo: "relleno" }],
  ["foto", "instagram/B-10.jpg", "b10", "b8a70d27", "la ceremonia de la arena con el niño", { modo: "relleno" }],
  ["foto", "instagram/B-11.jpg", "b11", "1e063714", "la arena de colores vertida en el vaso", { modo: "relleno" }],
  ["foto", "instagram/B-12.jpg", "b12", "a928684b", "los novios salen con los brazos en alto", { modo: "relleno" }],
  ["foto", "instagram/B-13.jpg", "b13", "873db4f4", "los padres con el novio", { modo: "relleno" }],
  ["foto", "instagram/B-17.jpg", "b17", "bbd3c343", "los novios caminan entre las chispas", { modo: "relleno" }],
];

/** La ventana de voz de cada toma (segundos de la fuente) y la ganancia que la deja en −15 LUFS tras el compresor (medida con ebur128 sobre la ventana). */
const VOZ = {
  mov1: { desde: 11.55, hasta: 20.75, gananciaDb: 30.8, entra: 0.05, sale: 0.2 },
  mov2: { desde: 5.95, hasta: 14.65, gananciaDb: 31.0, entra: 0.05, sale: 0.2 },
};

const COLOR_TARJETA = "0x0B0908";
const sha8 = (archivo) => crypto.createHash("sha256").update(fs.readFileSync(archivo)).digest("hex").slice(0, 8);
const sondea = (archivo, entradas, selector = "v:0") =>
  ejecutar("ffprobe", ["-v", "error", "-select_streams", selector, "-show_entries", entradas, "-of", "default=nw=1:nk=1", archivo], { check: true }).stdout.trim();

/** Una cadena de voz con la ganancia que se le dé. Limitador a −2 dBFS (`latency=1`: compensa el ms de lookahead y la voz no se desfasa). */
const CADENA_VOZ = (gananciaDb) =>
  [
    "highpass=f=90:poles=2",
    "acompressor=threshold=0.0063:ratio=3:attack=5:release=150:knee=6",
    `volume=${gananciaDb}dB`,
    "alimiter=limit=0.794:attack=1:release=60:level=disabled:latency=1",
  ].join(",");

/** El fondo desenfocado de un `relleno`: la propia imagen escalada hasta cubrir, muy pequeña y vuelta a ampliar (barato) y oscurecida un poco para que el primer plano destaque. */
const FONDO = `scale=162:288:force_original_aspect_ratio=increase,crop=162:288,gblur=sigma=6:steps=2,scale=${ANCHO}:${ALTO}:flags=bicubic,eq=brightness=-0.12:saturation=1.05`;
const RELLENO = `split[a][b];[a]${FONDO}[bg];[b]scale=${ANCHO}:-2:flags=lanczos[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2`;

if (!fs.existsSync(ORIGEN)) {
  log.error(`no existe ${relativa(ORIGEN)}: copia ahí el material (ver la columna «archivo» de este script y instagram/FUENTES.md)`);
  process.exit(1);
}
fs.mkdirSync(DESTINO, { recursive: true });

/** La rotación de PANTALLA del archivo (R19): −90 en un iPhone vertical, 90 si gira al otro lado, 0 si ya viene derecho. */
const rotacionDe = (abs) => Number(sondea(abs, "stream_side_data=rotation").split(/\s+/)[0] || 0);

const COMUNES_VIDEO = (salida) => [
  "-an", "-fps_mode", "cfr", "-r", "30", "-c:v", "libx264", "-preset", "slow", "-crf", "17", "-pix_fmt", "yuv420p",
  "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-movflags", "+faststart", salida,
];

function video(clase, archivo, nombre, opciones = {}) {
  const W = opciones.ancho ?? ANCHO;
  const H = opciones.alto ?? ALTO;
  const entrada = path.join(ORIGEN, archivo);
  const salida = path.join(DESTINO, `${nombre}.mp4`);
  if (fs.existsSync(salida) && !f.forzar) return log.info(`${path.basename(salida)} ya está`);
  const trc = sondea(entrada, "stream=color_transfer");
  const rot = rotacionDe(entrada);
  const hdr = trc === "arib-std-b67" || trc === "smpte2084";
  // Los de 29,97 fps (30000/1001) repetirían un fotograma cada ≈ 33 s con `-r 30`: `setpts=PTS*1000/1001` los deja a 30 fps exactos, 1 a 1.
  const ntsc = sondea(entrada, "stream=r_frame_rate") === "30000/1001";
  const pts = ntsc ? "setpts=PTS*1000/1001," : "";
  // Ventana 9:16 de la imagen ya girada, con zoom `z` y centro en (`uc`, `vc`) de ancho y alto, sin salirse del cuadro (dimensiones pares).
  const r = opciones.recorte;
  const recorte = r
    ? `crop=w=trunc(iw/${r.z}/2)*2:h=trunc(ih/${r.z}/2)*2:x='max(0,min(iw-ow,iw*${r.uc}-ow/2))':y='max(0,min(ih-oh,ih*${r.vc}-oh/2))',`
    : "";
  let args;
  if (hdr) {
    if (!ES_MAC) {
      log.error(`${archivo} es HDR (${trc}) y su tone-map va con VideoToolbox: esta rama solo corre en macOS (la de CPU está en la R21)`);
      process.exit(1);
    }
    const giro = { [-90]: "transpose_vt=dir=clock", 90: "transpose_vt=dir=cclock", 0: "" }[rot];
    if (giro === undefined) return log.error(`${archivo}: rotación no prevista (${rot})`), process.exit(1);
    args = [
      "-nostdin", "-y", "-v", "error", "-hwaccel", "videotoolbox", "-hwaccel_output_format", "videotoolbox_vld", "-noautorotate", "-i", entrada,
      "-vf", `scale_vt=color_matrix=bt709:color_primaries=bt709:color_transfer=bt709${giro ? `,${giro}` : ""},hwdownload,format=p010le,${pts}${recorte}scale=${W}:${H}:flags=lanczos,format=yuv420p`,
      ...COMUNES_VIDEO(salida),
    ];
  } else {
    const giro = { [-90]: "transpose=clock", 90: "transpose=cclock", 0: "" }[rot];
    if (giro === undefined) return log.error(`${archivo}: rotación no prevista (${rot})`), process.exit(1);
    // `clip` ya es vertical: se escala entero. `clip-relleno` es apaisado: entero sobre su fondo desenfocado (nunca recortado: sería un zoom ×3,9).
    // `scale=out_range=tv` al final: el vídeo de la fiesta (Instagram) llega en RANGO COMPLETO (`yuvj420p`, `color_range=pc`) y sin esto saldría igual, con otros negros y blancos que el
    // resto de los clips (todos en `tv`) en la misma pieza. En los que ya son `tv` no hace nada.
    const cuerpo =
      clase === "clip-relleno"
        ? `${giro ? `${giro},` : ""}${pts}${RELLENO},scale=out_range=tv,format=yuv420p`
        : `${giro ? `${giro},` : ""}${pts}scale=${W}:${H}:flags=lanczos:out_range=tv,format=yuv420p`;
    args = ["-nostdin", "-y", "-v", "error", "-noautorotate", "-i", entrada, "-filter_complex", cuerpo, ...COMUNES_VIDEO(salida)];
    // `-filter_complex` con una sola salida sin etiqueta: ffmpeg la mapea sola.
  }
  ejecutar("ffmpeg", args, { check: true });
  log.ok(`${path.basename(salida)} (${clase}${hdr ? " · HLG → BT.709" : " · SDR"} · rotación ${rot})`);
}

function foto(archivo, nombre, opciones) {
  const entrada = path.join(ORIGEN, archivo);
  const salida = path.join(DESTINO, `${nombre}.jpg`);
  if (fs.existsSync(salida) && !f.forzar) return log.info(`${path.basename(salida)} ya está`);
  const { modo, fx } = opciones;
  let filtro;
  if (modo === "recorte") {
    if (typeof fx !== "number" || fx < 0 || fx > 1) return log.error(`${archivo}: «recorte» necesita fx entre 0 y 1`), process.exit(1);
    // Una ventana 9:16 de alto completo cuyo centro cae en la fracción `fx` del ancho (sin salirse de la foto).
    filtro = `crop=w=trunc(ih*9/16/2)*2:h=ih:x='max(0,min(iw-ow,iw*${fx}-ow/2))':y=0,scale=${ANCHO}:${ALTO}:flags=lanczos,format=yuvj420p`;
  } else if (modo === "relleno") {
    filtro = `${RELLENO},format=yuvj420p`;
  } else {
    return log.error(`${archivo}: modo «${modo}» desconocido`), process.exit(1);
  }
  // ffmpeg aplica la etiqueta EXIF Orientation y escribe sin EXIF (R21: las fotos tienen su propia versión de la trampa).
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", entrada, "-filter_complex", filtro, "-frames:v", "1", "-q:v", "2", salida], { check: true });
  log.ok(`${path.basename(salida)} (${modo}${modo === "recorte" ? ` en ${fx}` : ""})`);
}

function voz(archivo, nombre) {
  const ventana = VOZ[nombre];
  const crudo = path.join(DESTINO, `${nombre}.wav`);
  const tratado = path.join(DESTINO, `${nombre}-voz.wav`);
  if (!fs.existsSync(crudo) || f.forzar) {
    // Sin tocar: solo se decodifica a PCM (WAV y no AAC: el AAC arrastra 1024 muestras de priming que desplazan la voz ~21 ms contra su imagen).
    ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", path.join(ORIGEN, archivo), "-map", "0:a:0", "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "1", crudo], { check: true });
    log.ok(`${path.basename(crudo)} (la voz tal cual, mono 48 kHz)`);
  }
  if (fs.existsSync(tratado) && !f.forzar) return;
  const { desde, hasta, gananciaDb, entra, sale } = ventana;
  // La ventana como ENVOLVENTE por muestra: silencio fuera, fundido de entrada y de salida dentro. El WAV dura lo mismo que el crudo, así que los
  // segundos de la fuente valen para los dos (`desde` del plan = el del plano de imagen).
  const t = (x) => x.toFixed(3);
  const compuerta = `aeval='val(0)*if(lt(t,${t(desde)}),0,if(lt(t,${t(desde + entra)}),(t-${t(desde)})/${entra},if(lt(t,${t(hasta - sale)}),1,if(lt(t,${t(hasta)}),(${t(hasta)}-t)/${sale},0))))':c=same`;
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", crudo, "-af", `${CADENA_VOZ(gananciaDb)},${compuerta}`, "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "1", tratado], { check: true });
  log.ok(`${path.basename(tratado)} (voz tratada: +${gananciaDb} dB tras el compresor, limitador a −2 dBFS; solo suena de ${t(desde)} a ${t(hasta)} s)`);
}

/** Las locuciones que John e Isabella graben aparte: ver la cabecera (`--voz`). */
function locuciones() {
  const HUECOS = ["john-1", "isabella-1", "john-2", "john-3", "isabella-2"];
  fs.mkdirSync(VOCES_ENTRADA, { recursive: true });
  const salidaDir = path.join(DESTINO, "voz");
  fs.mkdirSync(salidaDir, { recursive: true });
  const entregadas = {};
  for (const id of HUECOS) {
    const archivo = fs.readdirSync(VOCES_ENTRADA).find((n) => path.parse(n).name === id && /\.(wav|mp3|m4a|aac|aif|aiff|flac|ogg)$/i.test(n));
    if (!archivo) continue;
    const entrada = path.join(VOCES_ENTRADA, archivo);
    // Primera pasada: sonoridad integrada tal cual llega. La ganancia que la lleva a −15 LUFS se calcula de ahí (con tope: una locución a −45 LUFS no se sube 30 dB sin avisar).
    const medida = ejecutar("ffmpeg", ["-nostdin", "-v", "info", "-i", entrada, "-vn", "-af", "highpass=f=80:poles=2,ebur128=peak=true", "-f", "null", "-"]).stderr;
    const m = /Integrated loudness:\s+I:\s+(-?[\d.]+) LUFS/.exec(medida);
    if (!m) {
      log.aviso(`${archivo}: no pude medir su sonoridad; la dejo sin tocar`);
      continue;
    }
    const lufs = Number(m[1]);
    const gananciaDb = Math.max(-12, Math.min(24, -15 - lufs));
    const salida = path.join(salidaDir, `${id}.wav`);
    ejecutar(
      "ffmpeg",
      ["-nostdin", "-y", "-v", "error", "-i", entrada, "-vn", "-af", `highpass=f=80:poles=2,volume=${gananciaDb.toFixed(2)}dB,alimiter=limit=0.794:attack=1:release=60:level=disabled:latency=1`, "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "1", salida],
      { check: true }
    );
    const dur = Number(sondea(salida, "format=duration", "a:0"));
    entregadas[id] = { src: `botswana-069/voz/${id}.wav`, dur: Math.round(dur * 1000) / 1000, lufsOriginal: lufs, gananciaDb: Math.round(gananciaDb * 100) / 100 };
    log.ok(`${id}: ${dur.toFixed(2)} s · llegó a ${lufs} LUFS → +${gananciaDb.toFixed(1)} dB → −15 LUFS, limitador a −2 dBFS`);
  }
  const cuerpo =
    `/**\n * Las LOCUCIONES entregadas (john-1 … isabella-2), con su duración medida. GENERADO por \`node proyectos/069/normalizar.mjs --voz\`: no se edita a mano.\n` +
    ` * \`audio-069.ts\` pone cada una en el frame de su hueco (\`voz-069.ts\`) y \`revisar-069.mjs\` comprueba que cabe.\n */\n` +
    `export interface VozEntregada {\n  /** Ruta dentro de remotion/public/. */\n  src: string;\n  /** Segundos que dura. */\n  dur: number;\n  /** Sonoridad con la que llegó (LUFS). */\n  lufsOriginal: number;\n  /** Ganancia que se le aplicó para llegar a −15 LUFS. */\n  gananciaDb: number;\n}\n\n` +
    `export const VOCES_ENTREGADAS: Readonly<Record<string, VozEntregada>> = ${JSON.stringify(entregadas, null, 2)};\n`;
  fs.writeFileSync(VOCES_TS, cuerpo);
  log.ok(`${Object.keys(entregadas).length} de ${HUECOS.length} locuciones entregadas → ${relativa(VOCES_TS)}`);
}

if (f.voz) {
  locuciones();
  process.exit(0);
}

// Identidad ANTES de gastar minutos de codificación: otro archivo con el mismo nombre montaría un vídeo distinto en silencio.
let malos = 0;
const lista = MATERIAL.filter(([, , salida]) => !solo || solo.has(salida));
for (const [, archivo, , esperado] of lista) {
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

for (const [clase, archivo, salida, , , opciones] of lista) {
  if (clase === "foto") foto(archivo, salida, opciones);
  else {
    video(clase, archivo, salida, opciones);
    if (clase === "toma") voz(archivo, salida);
  }
}

// La TARJETA OSCURA del cierre (plano `c-tarjeta`): un negro cálido liso, 1296×2304 como los clips para que el plano cubra el cuadro con su zoom. Nada se congela.
const tarjeta = path.join(DESTINO, "tarjeta-oscura.png");
if (!solo && (!fs.existsSync(tarjeta) || f.forzar)) {
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-f", "lavfi", "-i", `color=c=${COLOR_TARJETA}:s=${ANCHO}x${ALTO}:r=1`, "-frames:v", "1", "-pix_fmt", "rgb24", tarjeta], { check: true });
  log.ok(`${path.basename(tarjeta)} (negro cálido liso ${ANCHO}×${ALTO}, la tarjeta del cierre)`);
}
log.ok(`repuesto en ${relativa(DESTINO)}`);
