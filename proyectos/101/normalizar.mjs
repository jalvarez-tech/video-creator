#!/usr/bin/env node
/**
 * normalizar.mjs — repone `remotion/public/mas-101/`: el material 9:16 de las historias verticales de MAS
 * (101 «Un proceso», 102 «Con cariño y amor», 103 «Lo que quiero en Navidad», 104 «Mi hogar») y del vídeo vertical
 * largo (105 «En últimas noticias»; su rev. 1 era «Preguntas a las niñas»).
 *
 *   node proyectos/101/normalizar.mjs                 (lee de proyectos/097/original/ y de archivos/musica/)
 *   node proyectos/101/normalizar.mjs --forzar        (rehace aunque ya exista la salida)
 *   node proyectos/101/normalizar.mjs --solo vt07,hz17
 *
 * POR QUÉ UNA RECETA APARTE de la del 097: allí los verticales se recortaron a una franja 16:9 (2160×1216) y los
 * horizontales se bajaron a 2304×1296; en 9:16 hacen falta los verticales ENTEROS y una franja vertical del 4K de los
 * horizontales. Se parte siempre del original (4K HLG), nunca de lo ya recortado.
 *   · VT: HLG → BT.709 con VideoToolbox (como el 097), rotación −90 quemada (R19), a 1296×2304 (1080 × 1,2: el techo
 *     de un acercamiento sin reescalar hacia arriba).
 *   · HZ y DR: la franja 9:16 de todo el alto (1216×2160, sin reescalar) centrada en la fracción `x` del ancho, elegida
 *     mirando las hojas de `proyectos/097/vistas-previas/` (dónde está la que habla). HZ28 viene girado 180°.
 *     El dron va a 29,97: `setpts=PTS*1000/1001` antes de `-r 30` (memoria `dji-2997-fotograma-repetido`); en el plan su
 *     `desde` va × 1000/1001.
 *   · FT43 (HEIC con el GPS de la casa) → JPG sRGB 9:16 SIN EXIF (`herramientas/fotos-9x16.py`).
 *   · La VOZ de cada clip que habla: WAV mono 48 kHz TAL CUAL, con `-map 0:a:0` (la pista espacial APAC no se decodifica).
 *   · La MÚSICA de cada historia, ENTERA a WAV 48 kHz estéreo sin normalizar: el tramo lo eligen los planes.
 * El material es de la fundación y salen MENORES: no entra en git. En el repo quedan esta receta y los sha256 (8).
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { ES_MAC, RAIZ, ejecutar, flags, log, relativa } from "../../herramientas/comun.mjs";

const ORIGEN = path.join(RAIZ, "proyectos", "097", "original");
const DESTINO = path.join(RAIZ, "remotion", "public", "mas-101");
const MUSICA_DIR = path.join(RAIZ, "archivos", "musica");
const f = flags();
const solo = typeof f.solo === "string" ? new Set(f.solo.toLowerCase().split(",")) : null;

/** clase · archivo en original/ · salida · sha256 (8) · ¿voz? · x de la franja 9:16 (solo HZ y DR) · por qué. */
const MATERIAL = [
  ["vt", "vertical/IMG_5485.MOV", "vt06", "64c922a0", true, null, "102: «¿Qué es lo más bonito de recibir un regalo?» → «…con mucho cariño y amor»"],
  ["vt", "vertical/IMG_5486.MOV", "vt07", "ceba8067", true, null, "101: «¿Cómo va tu relación con Cristo?» y el testimonio"],
  ["vt", "vertical/IMG_5489.MOV", "vt10", "b6af2740", true, null, "102: «¿Qué aprendiste de Dios este año?» → «perdonar»"],
  ["vt", "vertical/IMG_5490.MOV", "vt11", "c5dbcf8b", true, null, "102: la voz de «Aprendí a respetar a las personas…» (SOLO la respuesta: la pregunta es del usuario)"],
  // La imagen de VT11, RECORTADA a la niña: entero sale el adulto que pregunta, que es el usuario (097, rev. 8). Franja de
  // 42 % del ancho (ella está en 0,12-0,35; él empieza hacia 0,45) desde el 27 % del alto, para que su cara quede hacia el
  // 30 % del cuadro, y que la SIGUE: la cámara deriva y ella se va un 10 % a la derecha entre 7,3 y 11,3 s. Sube ×1,19.
  ["vt", "vertical/IMG_5490.MOV", "vt11c", "c5dbcf8b", false, [0, 0.27, 0.42, 0.1, 7.3, 11.3], "102: la imagen de VT11, solo la niña (sin el adulto)"],
  ["vt", "vertical/IMG_5557.MOV", "vt22", "d46e390a", false, null, "104: el árbol del salón con los regalos y el ventanal (12,0-14,5 s)"],
  ["vt", "vertical/IMG_5589.MOV", "vt33", "72b4f64c", true, null, "104: el recorrido narrado por la niña («Bienvenidos a la Nuestra… Gracias por acompañarme en este viaje»)"],
  ["hz", "horizontal/IMG_5513.MOV", "hz14", "8e405a15", true, 0.47, "103: «Yo quiero de Navidad una radio» (la del centro, con el perro)"],
  ["hz", "horizontal/IMG_5514.MOV", "hz15", "3b1c7c55", true, 0.57, "103: «…es un conejito» (la de pelo rizado)"],
  ["hz", "horizontal/IMG_5515.MOV", "hz16", "d95363db", true, 0.6, "103: «¡Yo quiero un bafle!» (la de la derecha)"],
  ["hz", "horizontal/IMG_5516.MOV", "hz17", "d34e8d11", true, 0.5, "103: «…a Cristo en mi vida… y una Biblia muy grande» (la del centro)"],
  ["hz", "horizontal/IMG_5517.MOV", "hz18", "64e45e01", true, 0.5, "103: «…una pista de carreras y a Dios en mi vida» (la del centro; su nombre, antes de 4,9 s, NO se usa)"],
  ["hz", "horizontal/IMG_5518.MOV", "hz19", "bfcc1a42", true, 0.42, "103: «¡Dios es bueno!» (el centro de la fila)"],
  ["hz", "horizontal/IMG_5562.MOV", "hz28", "d3afa406", false, 0.45, "104: las tres niñas levantan sus regalos junto al árbol"],
  ["dron", "dron/DJI_20261120152954_0358_D.MP4", "dr06", "ed1b48bf", false, 0.45, "104: la finca entera en órbita, sin caras (la casa abajo, al centro)"],
  // ── 105 rev. 1 «Preguntas a las niñas» (rev. 2 de la serie; ya no las usa el 105): la franja de cada plano va donde está la que HABLA en ese
  // instante (cuadros con rejilla del 10 %, 2026-11-23). Un mismo clip con dos hablantes da dos salidas (a, b, c).
  ["hz", "horizontal/IMG_5494.MOV", "hz01a", "c38b5040", true, 0.27, "105: «¿Cuál es la cualidad más bonita de Dios?» (la de moño alto, a la izquierda)"],
  ["hz", "horizontal/IMG_5494.MOV", "hz01b", "c38b5040", false, 0.62, "105: «En amarnos» (la de pelo largo, a la derecha, con el micro delante)"],
  ["hz", "horizontal/IMG_5498.MOV", "hz05a", "72c29471", true, 0.6, "105: «Amoroso» (27,0 s)"],
  ["hz", "horizontal/IMG_5498.MOV", "hz05b", "72c29471", false, 0.75, "105: «Bondadoso» (12,2 s)"],
  ["hz", "horizontal/IMG_5498.MOV", "hz05c", "72c29471", false, 0.55, "105: «Misericordioso» (18,0 s)"],
  ["hz", "horizontal/IMG_5499.MOV", "hz06", "ac74b46d", true, 0.55, "105: «Paciente» (0,5 s) y «¡Fiel!» (20,5 s): las dos al centro"],
  ["vt", "vertical/IMG_5492.MOV", "vt13", "3db70c70", true, null, "105: «¿Cuáles son tus sueños?» → «Ser policía»"],
  ["dron", "dron/DJI_20261120152914_0357_D.MP4", "dr05", "a43e2664", false, 0.72, "105: las caras que miran al dron y saludan, y el dron que sube (franja en el 72 %: el grupo de la derecha; en el 45 % salía la tarima y la mano con el mando del dron)"],
  ["hz", "horizontal/IMG_5506.MOV", "hz08", "695ead74", true, 0.5, "105: «¡Misericordia, Amor y Servicio!» por el tobogán"],
  ["hz", "horizontal/IMG_5588.MOV", "hz32", "f398774d", true, 0.5, "105: «¡Gracias a Dios por la Navidad!», el centro del grupo al atardecer"],
  // ── 105 rev. 2 «En últimas noticias» (pedido del 2026-11-23: «en el último utiliza tomas que no había en los
  // anteriores»): SOLO tomas que no salen en 097-104. Franjas con la misma regla: donde está la que habla.
  ["hz", "horizontal/IMG_5550.MOV", "hz22", "80a49d3f", true, [0.55, 0.37, 0.95, 1.2], "105: la reportera en selfi, «Hola, en últimas noticias: un lugar maravilloso» (girada 180°); la franja la SIGUE: su cara pasa del 55 % al 37 % del ancho entre 0,95 y 1,2 s"],
  ["vt", "vertical/IMG_5554.MOV", "vt21", "23d06792", true, null, "105: las dos de la puerta posan y salen corriendo, «¡Bienvenidos…!»"],
  ["vt", "vertical/IMG_5569.MOV", "vt29", "4b334544", true, null, "105: «aquí es el club de hablar y de resolver problemas» (31,4-37,3 s; de 10,5 a 17 sale un adulto al que peinan: no se usa)"],
  ["vt", "vertical/IMG_5544.MOV", "vt18", "762d8f85", true, null, "105: la entrevista del banco, «¿qué mascota tendrías?» → «Un conejo», «¿y un ave?» → «Un colibrí» (el nombre, a 2,7-4,1 s, no se usa)"],
  ["vt", "vertical/IMG_5482.MOV", "vt03", "ef2d8264", true, null, "105: «¿Qué es lo más bonito de recibir un regalo?» → «La Navidad»"],
  ["hz", "horizontal/IMG_5497.MOV", "hz04a", "92a2d960", true, 0.47, "105: la pregunta de la cualidad y «La palabra de Dios» (las dos caben en la franja)"],
  ["hz", "horizontal/IMG_5497.MOV", "hz04b", "92a2d960", false, 0.56, "105: «¡Bondadoso!» (la de pelo rizado, junto a la que pregunta)"],
  ["hz", "horizontal/IMG_5497.MOV", "hz04c", "92a2d960", false, 0.5, "105: «¡Un Dios inmortal!» (la pequeña de dos coletas)"],
  ["hz", "horizontal/IMG_5500.MOV", "hz07", "153cdfee", true, 0.6, "105: la que pregunta da su respuesta a cámara, «un Dios de oportunidades»"],
  ["hz", "horizontal/IMG_5507.MOV", "hz09", "ca68fa5e", true, 0.52, "105: el lema sentadas al pie del tobogán azul"],
  ["vt", "vertical/IMG_5558.MOV", "vt23", "b9feaa82", true, null, "105: «¡Feliz Navidad para todos!» ante el árbol del salón"],
  ["dron", "dron/DJI_20261120152615_0352_D.MP4", "dr01", "f8d9bcc0", false, 0.55, "105: el grupo entero se junta en la baranda y saluda al dron (la despedida)"],
];
/** archivo · salida · sha256 (8) · x de la franja · sombras · por qué. */
const FOTOS = [["IMG_5597.HEIC", "ft43", "e10d883c", 0.5, 0.2, "104: de espaldas, señala el cielo sobre las montañas (sin cara)"]];
/** archivo · salida · sha256 (8) · historia. */
const MUSICA = [
  ["Armin van Buuren - Here For You (from 'Piano' album).mp3", "musica-here-for-you", "6fbbe88d", "101"],
  // Rev. 2 (2026-11-23, pedido del usuario): 102-104 y el 105 suenan con las cuatro pistas de los vídeos 16:9 (097-100).
  ["Samy Galí - (Piano + Letra) Tu Estás Aquí [Jesús Adrián Romero & Marcela Gándara].mp3", "musica-tu-estas-aqui", "acf54a08", "102"],
  ["Lo harás otra vez - Elevation Worship (pista).mp3", "musica-otra-vez", "d4a80d50", "103"],
  ["A Tus Pies.mp3", "musica-a-tus-pies", "0ffedb79", "104"],
  ["Yeshua (Versión Piano).mp3", "musica-yeshua", "7bd0eb6f", "105"],
  ["Silver Skies Cinematic Piano.mp3", "musica-silver-skies", "9c3a3dc3", "102"],
  ["Andrea Vanzo - Amélie - Comptine d’un autre été, l’après-midi (reimagined).mp3", "musica-amelie", "8a845ebc", "103"],
  ["Emilio Piano ft. Lucie - Maison.mp3", "musica-maison", "df2be878", "104"],
];

const sha8 = (archivo) => crypto.createHash("sha256").update(fs.readFileSync(archivo)).digest("hex").slice(0, 8);
const quiere = (nombre) => !solo || solo.has(nombre);
const sondea = (abs, entradas) =>
  ejecutar("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", entradas, "-of", "default=nw=1:nk=1", abs]).stdout.trim();

fs.mkdirSync(DESTINO, { recursive: true });
let malos = 0;
const comprobar = (ruta, esperado) => {
  if (!fs.existsSync(ruta)) {
    log.error(`falta ${relativa(ruta)}`);
    malos++;
  } else if (sha8(ruta) !== esperado) {
    log.error(`${relativa(ruta)}: sha256 ${sha8(ruta)}, se esperaba ${esperado}`);
    malos++;
  }
};
for (const [, archivo, nombre, sha] of MATERIAL) if (quiere(nombre)) comprobar(path.join(ORIGEN, archivo), sha);
for (const [archivo, nombre, sha] of FOTOS) if (quiere(nombre)) comprobar(path.join(ORIGEN, "fotos", archivo), sha);
for (const [archivo, nombre, sha] of MUSICA) if (quiere(nombre)) comprobar(path.join(MUSICA_DIR, archivo), sha);
if (malos) {
  log.error("el material no es el del plan: revísalo antes de normalizar");
  process.exit(1);
}

const comunes = (salida) => [
  "-an", "-fps_mode", "cfr", "-r", "30", "-c:v", "libx264", "-preset", "medium", "-crf", "16", "-pix_fmt", "yuv420p",
  "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-movflags", "+faststart", salida,
];

function video(clase, archivo, nombre, x) {
  const entrada = path.join(ORIGEN, archivo);
  const salida = path.join(DESTINO, `${nombre}.mp4`);
  if (fs.existsSync(salida) && !f.forzar) {
    log.info(`${nombre}.mp4 ya está`);
    return;
  }
  const rot = Number(sondea(entrada, "stream_side_data=rotation").split(/\s+/).filter(Boolean)[0] || 0);
  let vf;
  let hw = [];
  const franja = () => {
    const x0De = (v) => Math.min(3840 - 1216, Math.max(0, Math.round((3840 * v - 608) / 2) * 2));
    // [xa, xb, t0, t1]: la franja va de xa a xb entre los segundos t0 y t1 de la fuente (sigue a quien habla).
    if (Array.isArray(x) && x.length === 4 && x.every((v) => typeof v === "number")) {
      const [a, b] = [x0De(x[0]), x0De(x[1])];
      return `crop=1216:2160:'${a}+(${b - a})*min(1,max(0,(t-${x[2]})/${x[3] - x[2]}))':0`;
    }
    if (typeof x !== "number" || x < 0 || x > 1) {
      log.error(`${archivo}: la franja 9:16 necesita su x (0-1) o [xa, xb, t0, t1]`);
      process.exit(1);
    }
    return `crop=1216:2160:${x0De(x)}:0`;
  };
  if (clase === "dron") {
    if (rot !== 0) {
      log.error(`${archivo}: rotación no prevista en un dron (${rot})`);
      process.exit(1);
    }
    const ntsc = sondea(entrada, "stream=r_frame_rate") === "30000/1001";
    vf = `${ntsc ? "setpts=PTS*1000/1001," : ""}${franja()},format=yuv420p`;
  } else {
    if (!ES_MAC) {
      log.error(`${archivo} es HLG y su tone-map va con VideoToolbox: esta rama solo corre en macOS`);
      process.exit(1);
    }
    hw = ["-hwaccel", "videotoolbox", "-hwaccel_output_format", "videotoolbox_vld"];
    const tono = "scale_vt=color_matrix=bt709:color_primaries=bt709:color_transfer=bt709";
    if (clase === "hz") {
      const giro = { 0: "", [-180]: ",hflip,vflip", 180: ",hflip,vflip" }[rot];
      if (giro === undefined) {
        log.error(`${archivo}: rotación no prevista (${rot})`);
        process.exit(1);
      }
      vf = `${tono},hwdownload,format=p010le${giro},${franja()},format=yuv420p`;
    } else {
      if (rot !== -90) {
        log.error(`${archivo}: un VT del iPhone debería venir a −90 (${rot})`);
        process.exit(1);
      }
      // Un VT entero, o (x) una franja 9:16 [x0, y0, ancho] en fracciones del cuadro ya girado (2160×3840).
      let recorte = "";
      if (Array.isArray(x)) {
        const w = Math.round((2160 * x[2]) / 2) * 2;
        const h = Math.round((w * 16) / 9 / 2) * 2;
        const x0 = Math.round((2160 * x[0]) / 2) * 2;
        const y0 = Math.round((3840 * x[1]) / 2) * 2;
        if (x0 + w > 2160 || y0 + h > 3840) {
          log.error(`${archivo}: la franja ${x} se sale del cuadro`);
          process.exit(1);
        }
        // [x0, y0, ancho, x1, t0, t1]: la franja va de x0 a x1 entre los segundos t0 y t1 de la fuente (sigue al sujeto).
        let xs = String(x0);
        if (x.length === 6) {
          const x1 = Math.round((2160 * x[3]) / 2) * 2;
          xs = `'${x0}+(${x1 - x0})*min(1,max(0,(t-${x[4]})/${x[5] - x[4]}))'`;
          if (x1 + w > 2160) {
            log.error(`${archivo}: la franja móvil se sale del cuadro`);
            process.exit(1);
          }
        }
        recorte = `crop=${w}:${h}:${xs}:${y0},`;
      }
      vf = `${tono},transpose_vt=dir=clock,hwdownload,format=p010le,${recorte}scale=1296:2304:flags=lanczos,format=yuv420p`;
    }
  }
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", ...hw, "-noautorotate", "-i", entrada, "-vf", vf, ...comunes(salida)], { check: true });
  const franjaTxt = typeof x === "number" ? ` · franja 9:16 en el ${Math.round(x * 100)} %` : Array.isArray(x) ? ` · franja móvil ${x.join("/")}` : " · entero";
  log.ok(`${nombre}.mp4 (${clase}${clase === "dron" ? " · SDR · ×1000/1001" : " · HLG → BT.709"} · rotación ${rot}${franjaTxt})`);
}

function voz(archivo, nombre) {
  const salida = path.join(DESTINO, `${nombre}.wav`);
  if (fs.existsSync(salida) && !f.forzar) return;
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", path.join(ORIGEN, archivo), "-map", "0:a:0", "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "1", salida], { check: true });
  log.ok(`${nombre}.wav (la voz tal cual, mono 48 kHz)`);
}

for (const [clase, archivo, nombre, , conVoz, x] of MATERIAL) {
  if (!quiere(nombre)) continue;
  video(clase, archivo, nombre, x);
  // La voz va con el nombre del clip, sin la letra de la franja (hz05a → hz05.wav; vt11c no la lleva: es de vt11).
  if (conVoz) voz(archivo, nombre.replace(/[a-c]$/, ""));
}

for (const [archivo, nombre, , x, sombras, por] of FOTOS) {
  if (!quiere(nombre)) continue;
  const salida = path.join(DESTINO, `${nombre}.jpg`);
  if (fs.existsSync(salida) && !f.forzar) {
    log.info(`${nombre}.jpg ya está`);
    continue;
  }
  ejecutar(
    "uv",
    ["run", "--with", "pillow", "--with", "pillow-heif", "proyectos/101/herramientas/fotos-9x16.py", path.join(ORIGEN, "fotos", archivo), salida, String(x), "--sombras", String(sombras)],
    { check: true, cwd: RAIZ }
  );
  log.ok(`${nombre}.jpg · ${por}`);
}

for (const [archivo, nombre, , historia] of MUSICA) {
  if (!quiere(nombre)) continue;
  const wav = path.join(DESTINO, `${nombre}.wav`);
  if (fs.existsSync(wav) && !f.forzar) {
    log.info(`${nombre}.wav ya está`);
    continue;
  }
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", path.join(MUSICA_DIR, archivo), "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "2", wav], { check: true });
  log.ok(`${nombre}.wav (${historia}: la pista entera, 48 kHz estéreo, sin normalizar)`);
}
log.ok(`listo: ${relativa(DESTINO)}`);
