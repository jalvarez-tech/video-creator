#!/usr/bin/env node
/**
 * empaquetar-fuentes.mjs — convierte las fuentes de remotion/public/fuentes/ en
 * módulos de datos (base64) para que el motor registre sus familias SIN pedirlas
 * por red.
 *
 *   node manuales/motion-graphics/scripts/empaquetar-fuentes.mjs           # escribe los módulos
 *   node manuales/motion-graphics/scripts/empaquetar-fuentes.mjs --check   # sale 1 si alguno está desfasado
 *
 * DOS PAQUETES, y son dos a propósito (la lista es `PAQUETES`):
 *   · inter       los nueve OTF de remotion/public/fuentes/inter/
 *                 → remotion/src/motor/fuentes-inter.datos.ts (`INTER_OTF`).
 *                 La tipografía de todo lo que el motor dibuja.
 *   · subtitulos  las letras de los subtítulos editoriales: Quicksand variable y Lato
 *                 en itálica (las del motor por defecto), Montserrat variable y Playfair
 *                 Display itálica variable (las que un canal puede declarar), de
 *                 remotion/public/fuentes/{quicksand,lato,montserrat,playfair}/
 *                 → remotion/src/motor/fuentes-subtitulos.datos.ts (`FUENTES_SUBTITULOS`).
 *                 Las dos voces de la pista de subtítulos editoriales.
 * No se funden en un solo módulo porque el de Inter ya está publicado: su
 * contenido no puede cambiar ni en un byte (es lo que comprueba `--check` en
 * cualquier clon), y un paquete nuevo que lo reescribiera movería el diff de
 * tres megas por nada. Cada paquete tiene su archivo y su forma; una familia
 * nueva es un paquete más en la lista, no un cambio en los que ya están.
 *
 * POR QUÉ DATOS Y NO `staticFile()`. Con la fuente servida por el servidor de
 * archivos de Remotion, un render con muchas pestañas y muchos `<OffthreadVideo>`
 * de clips grandes deja las nueve peticiones de la fuente detrás de cientos de
 * peticiones de vídeo, y el `delayRender` de la fuente muere por timeout aunque
 * el render fuera a salir (medido: dos montajes de dos minutos con la fuente por
 * red fallaban; los mismos con la fuente en el bundle, no). Con los bytes dentro
 * del bundle no hay petición que esperar: `FontFace` recibe el ArrayBuffer.
 *
 * Los archivos originales siguen en remotion/public/fuentes/<familia>/ (los usan
 * generar-avances.mjs, medir-anchos.mjs y medir-letras-subtitulos.mjs para
 * medir, y ahí va la licencia OFL de cada familia). Los módulos se versionan:
 * son grandes (~3,2 MB el de Inter, ~2 MB el de subtítulos) pero
 * deterministas, y así un clon no necesita ejecutar nada para tener la
 * tipografía.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { RAIZ, esMain, flags, log, relativa } from "../../../herramientas/comun.mjs";

const DIR_FUENTES = path.join(RAIZ, "remotion", "public", "fuentes");
const DIR_MOTOR = path.join(RAIZ, "remotion", "src", "motor");
const REGENERAR = "node manuales/motion-graphics/scripts/empaquetar-fuentes.mjs";

/** Bytes, tamaño y sha256 de un archivo de fuente: lo que cada módulo anota junto al base64. */
const leeFuente = (archivo) => {
  const bytes = fs.readFileSync(archivo);
  return { bytes, sha: crypto.createHash("sha256").update(bytes).digest("hex") };
};

/* ══════════════════ INTER ══════════════════════════════════════════════════ */

const ORIGEN_INTER = path.join(DIR_FUENTES, "inter");

/** Los nueve cortes de Inter 3.019 y el peso CSS que declara cada OTF. */
const CORTES = [
  ["Thin", 100],
  ["ExtraLight", 200],
  ["Light", 300],
  ["Regular", 400],
  ["Medium", 500],
  ["SemiBold", 600],
  ["Bold", 700],
  ["ExtraBold", 800],
  ["Black", 900],
];

/**
 * El módulo de Inter. Su texto es el de SIEMPRE, línea a línea: hay un módulo
 * versionado y publicado con esta forma exacta, y `--check` lo compara byte a
 * byte. Si hay que cambiar algo aquí, es que ha cambiado Inter.
 */
function generarInter() {
  const lineas = [
    "// GENERADO por manuales/motion-graphics/scripts/empaquetar-fuentes.mjs: NO EDITAR A MANO.",
    "// Los nueve OTF de Inter 3.019 (remotion/public/fuentes/inter/, licencia SIL OFL 1.1,",
    "// ver OFL.txt ahí) en base64, para que motor/fuentes.ts registre la familia sin",
    "// pedir nada por red. Regenerar: node manuales/motion-graphics/scripts/empaquetar-fuentes.mjs",
    "",
    "/** Peso CSS → OTF en base64 (sha256 del archivo original en el comentario). */",
    "export const INTER_OTF: Record<number, string> = {",
  ];
  for (const [nombre, peso] of CORTES) {
    const { bytes, sha } = leeFuente(path.join(ORIGEN_INTER, `Inter-${nombre}.otf`));
    lineas.push(`  // Inter-${nombre}.otf · ${bytes.length} bytes · sha256 ${sha}`);
    lineas.push(`  ${peso}: "${bytes.toString("base64")}",`);
  }
  lineas.push("};", "");
  return lineas.join("\n");
}

/* ══════════════════ SUBTÍTULOS EDITORIALES ═════════════════════════════════ */

/**
 * Las caras de la pista de subtítulos editoriales, con los descriptores CSS con
 * los que `motor/fuentes.ts` las registra. El ORDEN es el de registro.
 *
 *   · Quicksand es UN archivo variable (eje `wght` 300-700): se declara con el
 *     rango entero y Chrome saca de él cualquier peso intermedio. Se llama
 *     `Quicksand-Variable.ttf` y no `Quicksand[wght].ttf`, que es su nombre en
 *     google/fonts: los corchetes son comodines en PowerShell y el archivo no se
 *     podría ni copiar con un comando portable. El contenido va sin tocar.
 *   · De Lato solo van las dos ITÁLICAS, que es lo único que la pista pinta con
 *     ella (el acento). Con solo itálicas registradas, un texto que pidiera
 *     «Lato» en redonda saldría en itálica: es el comportamiento de CSS cuando
 *     la familia no tiene el estilo pedido, y aquí nadie lo pide.
 *   · Montserrat va entera en UN archivo variable (eje `wght` 100-900), como
 *     Quicksand. De Playfair Display solo la ITÁLICA variable (400-900), por lo
 *     mismo que de Lato: es la letra del acento y no se pinta en redonda.
 */
const CARAS_SUBTITULOS = [
  { carpeta: "quicksand", archivo: "Quicksand-Variable.ttf", familia: "Quicksand", peso: "300 700", estilo: "normal" },
  { carpeta: "lato", archivo: "Lato-Italic.ttf", familia: "Lato", peso: "400", estilo: "italic" },
  { carpeta: "lato", archivo: "Lato-BoldItalic.ttf", familia: "Lato", peso: "700", estilo: "italic" },
  { carpeta: "montserrat", archivo: "Montserrat-Variable.ttf", familia: "Montserrat", peso: "100 900", estilo: "normal" },
  { carpeta: "playfair", archivo: "PlayfairDisplay-Italic-Variable.ttf", familia: "Playfair Display", peso: "400 900", estilo: "italic" },
];

function generarSubtitulos() {
  const lineas = [
    "// GENERADO por manuales/motion-graphics/scripts/empaquetar-fuentes.mjs: NO EDITAR A MANO.",
    "// Las caras de la pista de subtítulos editoriales —Quicksand variable (eje wght 300-700), Lato",
    "// en itálica, regular y negrita, Montserrat variable (100-900) y Playfair Display itálica",
    "// variable (400-900)— en base64, para que motor/fuentes.ts las registre sin pedir nada por red.",
    "// Los TTF, sin modificar, están en remotion/public/fuentes/{quicksand,lato,montserrat,playfair}/",
    "// (licencia SIL OFL 1.1, ver el OFL.txt de cada carpeta).",
    "// Regenerar: node manuales/motion-graphics/scripts/empaquetar-fuentes.mjs",
    "",
    "/** Una cara empaquetada: los descriptores CSS con los que se registra y sus bytes en base64. */",
    'export interface CaraEmpaquetada { familia: string; peso: string; estilo: "normal" | "italic"; base64: string }',
    "",
    "/** Las caras en el orden en que se registran (sha256 del archivo original en el comentario). */",
    "export const FUENTES_SUBTITULOS: readonly CaraEmpaquetada[] = [",
  ];
  for (const cara of CARAS_SUBTITULOS) {
    const { bytes, sha } = leeFuente(path.join(DIR_FUENTES, cara.carpeta, cara.archivo));
    lineas.push(`  // ${cara.archivo} · ${bytes.length} bytes · sha256 ${sha}`);
    lineas.push(`  { familia: "${cara.familia}", peso: "${cara.peso}", estilo: "${cara.estilo}", base64: "${bytes.toString("base64")}" },`);
  }
  lineas.push("];", "");
  return lineas.join("\n");
}

/* ══════════════════ LA LISTA ═══════════════════════════════════════════════ */

/**
 * Un paquete = un módulo de datos. `origen` es solo para los mensajes: qué hay
 * que mirar cuando el módulo no coincide.
 */
export const PAQUETES = [
  {
    id: "inter",
    destino: path.join(DIR_MOTOR, "fuentes-inter.datos.ts"),
    origen: `los OTF de ${relativa(ORIGEN_INTER)}`,
    generar: generarInter,
  },
  {
    id: "subtitulos",
    destino: path.join(DIR_MOTOR, "fuentes-subtitulos.datos.ts"),
    origen: `los TTF de ${["quicksand", "lato", "montserrat", "playfair"].map((c) => relativa(path.join(DIR_FUENTES, c))).join(", ")}`,
    generar: generarSubtitulos,
  },
];

if (esMain(import.meta.url)) {
  const f = flags();
  // Se recorren TODOS los paquetes antes de salir: un `--check` que se para en el
  // primero desfasado obliga a repetirlo para enterarse del segundo.
  let mal = 0;
  for (const paquete of PAQUETES) {
    const destino = relativa(paquete.destino);
    let nuevo;
    try {
      nuevo = paquete.generar();
    } catch (e) {
      // Casi siempre un archivo de fuente que falta (clon o zip incompleto): se
      // dice cuál en vez de soltar la traza, y los demás paquetes siguen.
      log.error(`${destino}: no puedo leer ${paquete.origen} (${e && e.code === "ENOENT" ? `falta ${relativa(e.path)}` : String(e)})`);
      mal++;
      continue;
    }
    const actual = fs.existsSync(paquete.destino) ? fs.readFileSync(paquete.destino, "utf8") : null;
    if (f.check) {
      if (actual === nuevo) log.ok(`${destino} AL DÍA con ${paquete.origen}`);
      else {
        log.error(`${destino} ${actual === null ? "NO EXISTE" : "DESFASADO"}: regenera con ${REGENERAR}`);
        mal++;
      }
      continue;
    }
    if (actual === nuevo) log.info(`${destino} ya estaba al día`);
    else {
      fs.writeFileSync(paquete.destino, nuevo);
      log.ok(`${destino} escrito (${(nuevo.length / 1024 / 1024).toFixed(2)} MB)`);
    }
  }
  process.exit(mal ? 1 : 0);
}
