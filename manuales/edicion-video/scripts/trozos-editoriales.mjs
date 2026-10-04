#!/usr/bin/env node
/**
 * trozos-editoriales.mjs — de un GUION MARCADO y la voz medida por palabra, el
 * plan de los subtítulos editoriales (`BloqueEditorial[]`) con el frame en que
 * entra cada línea.
 *
 * Uso (desde la raíz del repo):
 *   node manuales/edicion-video/scripts/transcribir.mjs proyectos/NNN/voz/vo.wav proyectos/NNN/voz/palabras.json es --palabras
 *   node manuales/edicion-video/scripts/trozos-editoriales.mjs proyectos/NNN/guion-marcado.txt proyectos/NNN/voz/palabras.json --audio proyectos/NNN/voz/vo.wav --salida remotion/src/proyectos/NNN/subtitulos-NNN.ts
 *   node manuales/edicion-video/scripts/revisar-subtitulos.mjs remotion/src/proyectos/NNN/subtitulos-NNN.ts
 *
 * POR QUÉ EXISTE. Los subtítulos editoriales son trozos de una a cuatro
 * palabras que entran A TIEMPO con lo dicho: cada línea, en el frame de su
 * primera palabra. Hacen falta dos cosas y ninguna fuente da las dos:
 *
 *   · El TEXTO sale del guion. whisper-small oye «es subir» donde se dijo
 *     «estuviera» y «Esudio» por «estudio», y no sabe dónde va el acento ni qué
 *     se parte en dos líneas: eso lo decide quien escribe.
 *   · Los TIEMPOS salen de la voz: `transcribir.mjs --palabras`.
 *
 * Este script casa lo uno con lo otro, palabra a palabra, y escribe el plan. Lo
 * que sale es un PUNTO DE PARTIDA medido, no un artefacto: se mira en el frame,
 * se ajusta a mano y se pasa por `revisar-subtitulos.mjs`.
 *
 * EL GUION MARCADO. Texto plano, un BLOQUE por línea del archivo:
 *
 *   # esto es un comentario (y las líneas vacías tampoco cuentan)
 *   [arriba x1.5 puesto] ¿Y si tu próximo / **vídeo**
 *   se montara
 *   con la voz / **como guion** / y nada más?
 *   [centro] ==30 fps=={a treinta fotogramas por segundo}
 *
 *   ` / `            separa las LÍNEAS del bloque (máximo 3): se acumulan en orden.
 *                    Una barra suelta al principio o al final es un error de
 *                    marcado, no texto; pegada a las letras («24/7») sí es texto,
 *                    y con espacio a un solo lado («/comando», «zonas /más»)
 *                    también se pinta, pero se avisa: suele ser un separador
 *                    mal tecleado.
 *   **texto**        la línea entera en estilo `acento`.
 *   ==texto==        la línea entera en estilo `dato`.
 *   {lo que se dice} pegado detrás de una línea: lo que SUENA cuando no coincide
 *                    con lo que se pinta. Se alinea con lo de las llaves y se
 *                    pinta lo de fuera. Las cifras, en dígitos o en letra, da
 *                    igual (`{con 198 metros}` o `{con ciento noventa y ocho
 *                    metros}`): se comparan por su valor, hasta 999.999. De un
 *                    millón para arriba, como las escriba whisper («2 millones»).
 *   [opciones]       delante del bloque, separadas por espacios:
 *                      arriba | abajo | centro   posición (por defecto, abajo)
 *                      xN                        escala del cuerpo (x1.5)
 *                      puesto                    el bloque está ENTERO desde su primer
 *                                                frame: `entrada: 0` y todas sus líneas en
 *                                                el frame de su primera palabra. Si además
 *                                                abre la fuente (es el primer bloque y antes
 *                                                no se dice nada), entra con ella, en `--en`:
 *                                                el frame 0 de una pieza es la miniatura, y
 *                                                la voz empieza unos frames después.
 *
 * DE DÓNDE SALE CADA TIEMPO. Del `t_dtw` de los tokens, que es la alineación de
 * verdad (una palabra empieza donde ACABA el token anterior), y no de `offsets`,
 * que es un reparto de whisper con errores de hasta 10 frames a mitad de frase
 * (está medido en la cabecera de transcribir.mjs). Hay dos sitios donde el DTW
 * no sabe y se usa otra cosa, y uno donde no hay otra cosa que usar:
 *
 *   · La primera palabra del audio y la primera de cada ventana de 30 s no
 *     tienen token anterior: se toma su `offsets`, que whisper clava al principio
 *     aunque se hable medio segundo después. Para eso están `--s0` y `--audio`.
 *   · Tras una PAUSA. Si whisper escribió una coma o un punto, el token anterior
 *     es ese signo y el DTW lo acaba en cualquier sitio del silencio, o ya dentro
 *     de la palabra: la línea entra hasta 5 frames pronto o 4 tarde. Si NO puntuó
 *     (pasa: la misma locución sale con comas en una pasada y sin ellas en otra),
 *     la palabra «empieza» donde acaba la anterior y la línea entra al PRINCIPIO
 *     del silencio: la pausa entera, y se han medido 23 frames. `--audio` mide
 *     la energía de la voz (el método de limites-voz.py) y lleva la palabra al
 *     arranque de la voz en los tres casos (ver `anclaALaVoz`). SIN `--audio`
 *     nada de eso se corrige: el script lo dice y señala las líneas cuya primera
 *     palabra dura de más, que es la huella de la pausa. Pásalo siempre que
 *     tengas la voz sola; con música debajo el silencio no se ve y corrige menos.
 *   · A MITAD DE FRASE no hay silencio que medir y el tiempo es el del DTW, que
 *     da por acabado el token anterior antes de que termine de sonar: la línea
 *     entra de 1 a 3 frames PRONTO, y se han medido hasta 5 («se sienta /
 *     diferente», «vale la pena / conocerla»). No se corrige: el mínimo de
 *     energía más cercano al corte es tantas veces la oclusiva de la palabra
 *     anterior («sien-ta», «pe-na») como la frontera entre las dos (probado
 *     sobre las cinco líneas que se midieron fuera de ±3: llevarlas a ese
 *     mínimo acerca dos y aleja tres). Y lo mismo vale para la pausa que
 *     `--audio` no ve: la de menos de 0,12 s de silencio (8 frames pronto en
 *     «… cuadrados, / este apartamento» cuando whisper no puso la coma) y la
 *     que tapa una respiración («diferente. / Si estás buscando», 5 frames). La
 *     primera se avisa en su línea cuando el GUION lleva ahí la coma o el punto,
 *     que es lo único que la delata; la segunda no hay con qué señalarla.
 *     ±3 frames es, pues, lo normal y no una garantía: el plan se mira en el
 *     frame.
 *
 * LA ALINEACIÓN es secuencial y tolerante: minúsculas, sin tildes ni
 * puntuación; aguanta palabras de más o de menos en la transcripción, erratas
 * («esudio»), prefijos («conocer» + «la» por «conocerla») y cifras («3» por
 * «tres», «198» por «ciento noventa y ocho»). Cada línea entra con su primera
 * palabra. Lo que no casa se AVISA, con el segundo, para ir a mirarlo; si más
 * de un 25 % del guion no casa (`--tope`), lo normal es que ese guion no sea de
 * ese audio y el script sale con 1.
 *
 * Si el audio dice la frase MÁS DE UNA VEZ (dos tomas en el mismo archivo), a
 * igual parecido se queda con la primera y avisa de dónde está la otra: la que
 * vale se elige acotando la fuente con `--desde` y `--hasta`.
 *
 * Opciones:
 *   --fps 30         fps de la composición.
 *   --en 0           frame de la composición donde cae el segundo `--desde` de la fuente.
 *   --desde 0        segundo de la fuente que cae en `--en`. El frame de un instante t es
 *                    en + round(t·fps) − round(desde·fps). Lo dicho antes no entra.
 *   --hasta S        segundo de la fuente en que acaba lo que se usa: las palabras que
 *                    empiezan después no entran. Con `--desde`, elige UNA toma de un
 *                    archivo que trae varias.
 *   --s0 S           segundo REAL en que empieza la primera palabra (limites-voz.py):
 *                    ninguna palabra empieza antes.
 *   --audio ARCHIVO  el mismo audio que se transcribió: ancla al arranque de la voz las
 *                    palabras que siguen a una pausa, la primera incluida (hace de
 *                    `--s0`; si se dan los dos, `--s0` sigue siendo el suelo).
 *   --tope 25        % del guion que puede quedar sin casar antes de salir con 1. Se
 *                    sube cuando el guion SÍ es de ese audio y whisper lo oye mal.
 *   --prefijo b      ids b01, b02…   --inicio 1   número del primero.
 *   --cola 9         frames que un bloque aguanta tras su última palabra si el siguiente tarda.
 *   --nombre subtitulosNNN --salida ruta.ts   escribe el módulo entero: los dos imports,
 *                    `export const <nombre>` y `export const <nombre>Srt` (para el .srt).
 *                    Si la salida se llama subtitulos-NNN.ts, el nombre se deduce. No pisa
 *                    un archivo que ya exista sin --forzar: puede llevar ajustes a mano.
 *   --tabla          enseña, línea a línea, el frame, el segundo y la palabra oída.
 *
 * Sin `--salida` imprime por la salida estándar SOLO los bloques, para pegarlos:
 * una pieza con varias fuentes de voz (una toma por frase) es una invocación por
 * toma, cada una con su `--en`, su `--inicio` y su audio. Los avisos van entonces
 * por la salida de error.
 *
 * Sale con 1 si el guion está mal marcado, si el JSON no trae palabras o si el
 * guion no casa con ese audio. Con avisos sale con 0: son para quien revisa.
 *
 * Solo genera texto: no importa nada del motor, así que sirve aunque el plan
 * vaya a otro sitio. Las tres cifras que comparte con él (3 líneas, 12 frames en
 * pantalla, 3 entre líneas) son las de `SUB` en `subtitulos-editoriales.ts`.
 */
import fs from "node:fs";
import path from "node:path";
import {
  borrar,
  carpetaTemporal,
  ejecutar,
  esMain,
  escribirAtomico,
  flags,
  leerJSON,
  leerTexto,
  posix,
  relativa,
} from "../../../herramientas/comun.mjs";

/** % del guion que puede quedar sin casar (`--tope`). Por encima, lo normal es que el guion no sea de este audio. */
const TOPE_SIN_CASAR = 25;

const USO =
  "Uso: node manuales/edicion-video/scripts/trozos-editoriales.mjs <guion-marcado.txt> <palabras.json> " +
  "[--fps 30] [--en 0] [--desde 0] [--hasta S] [--s0 S] [--audio voz.wav] [--tope 25] [--prefijo b] [--inicio 1] " +
  "[--cola 9] [--nombre subtitulosNNN --salida ruta.ts [--forzar]] [--tabla]";

const AYUDA = `${USO}

Del guion marcado y del JSON de \`transcribir.mjs --palabras\`, el plan de subtítulos editoriales
(BloqueEditorial[]): el TEXTO sale del guion y el frame de cada línea, de la voz.

El guion, un bloque por línea del archivo (las vacías y las que empiezan por # no cuentan):
  [arriba x1.5 puesto] ¿Y si tu próximo / **vídeo**
  con la voz / **como guion** / y nada más?
  [centro] ==30 fps=={a treinta fotogramas por segundo}

  " / "            separa las líneas del bloque (máximo 3); suelta al principio o al final es un error,
                   y con espacio a un solo lado («zonas /más») se pinta y se avisa
  **texto**        la línea entera en acento        ==texto==   la línea entera en dato
  {lo que se dice} pegado detrás: lo que suena cuando no es lo que se pinta. Las cifras, en dígitos
                   o en letra (hasta 999.999); de un millón para arriba, como las escriba whisper
  [opciones]       arriba | abajo | centro · xN (escala) · puesto (entero desde su primer frame:
                   entrada: 0 y todas sus líneas a la vez; si abre la fuente, en --en: la miniatura)

Opciones:
  --fps 30         fps de la composición
  --en 0           frame de la composición donde cae el segundo --desde de la fuente
  --desde 0        segundo de la fuente que cae en --en: frame(t) = en + round(t·fps) − round(desde·fps)
  --hasta S        segundo de la fuente en que acaba lo que se usa (con --desde, UNA toma de varias)
  --s0 S           segundo real en que empieza la primera palabra (limites-voz.py)
  --audio ARCHIVO  el audio transcrito (la voz sola): ancla al arranque de la voz las palabras que
                   siguen a una pausa. Sin él esas líneas entran pronto: hasta la pausa entera
  --tope ${TOPE_SIN_CASAR}        % del guion que puede quedar sin casar antes de salir con 1
  --prefijo b      ids b01, b02…          --inicio 1   número del primero
  --cola 9         frames que un bloque aguanta tras su última palabra si el siguiente tarda
  --nombre subtitulosNNN --salida ruta.ts   escribe el módulo entero (no pisa uno que exista sin --forzar)
  --tabla          línea a línea: frame, segundo de la fuente, de dónde sale y lo oído

Sin --salida imprime solo los bloques (para pegarlos: una invocación por toma) y los avisos van por
la salida de error. Sale con 1 si el guion está mal marcado, si el JSON no trae palabras o si más de
un ${TOPE_SIN_CASAR} % del guion no casa con lo oído.

Precisión: tras una pausa y con --audio, la línea va al arranque de la voz. A mitad de frase el
tiempo es el del DTW, que suele ir de 1 a 3 frames pronto y puede llegar a 5: se mira en el frame.
El porqué de cada cosa, en la cabecera de este archivo.`;

// Las mismas que `SUB.maxTrozos`, `SUB.minTrozo` y `SUB.minEntreTrozos` del motor.
const MAX_LINEAS = 3;
const MIN_EN_PANTALLA = 12;
const MIN_ENTRE_LINEAS = 3;
/** Ancho al que un bloque deja de ir en una sola línea del `.ts`. */
const ANCHO_TS = 120;

const POSICIONES = ["abajo", "arriba", "centro"];
const INTERRUPTORES = ["--tabla", "--forzar", "--help"];
const CON_VALOR = ["fps", "en", "desde", "hasta", "s0", "audio", "tope", "prefijo", "inicio", "cola", "nombre", "salida"];

/**
 * Lo que no puede llamarse una constante de un módulo: `export const class = …`
 * pasa el patrón de un identificador y no compila.
 */
const RESERVADAS = (
  "await break case catch class const continue debugger default delete do else enum export extends false finally for " +
  "function if implements import in instanceof interface let new null package private protected public return static " +
  "super switch this throw true try typeof var void while with yield"
).split(" ");

/** Un error de uso o de datos: se enseña y se sale con 1, sin traza. */
class Fallo extends Error {}

/**
 * ¿Cae fuera de la raíz esta ruta «relativa»? Lo normal es que empiece por
 * `..`; pero en Windows, entre dos unidades no hay camino relativo y
 * `path.relative` devuelve la ruta ABSOLUTA del destino (`D:/carpeta/…`, o
 * `//servidor/…` en red), que no empieza por `..`.
 */
export const esDeFuera = (r) => r.startsWith("..") || path.isAbsolute(r) || /^[A-Za-z]:/.test(r) || r.startsWith("//");

/** Una ruta para ENSEÑAR: relativa a la raíz si cae dentro; si no, solo el nombre (nunca la carpeta de nadie). */
const muestra = (p) => {
  const r = relativa(p);
  return esDeFuera(r) ? path.basename(p) : r;
};

/* ── El guion ─────────────────────────────────────────────────────────────── */

/** Minúsculas, sin tildes ni puntuación. Las cifras, tal cual. */
export const normaliza = (s) =>
  String(s)
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}+/gu, "")
    .replace(/[^\p{L}\p{N}]+/gu, "");

/** Un guion o una raya entre dos palabras las separa igual que un espacio: «más-privilegiadas» se oye como dos. */
const GUIONES = /[-‐‑‒–—]+/;

/**
 * Las palabras de un texto, ya normalizadas; lo que se queda en nada (un «¿»,
 * una raya) no cuenta, y una cifra escrita en varias palabras es UNA (ver
 * `juntaCifras`).
 */
const palabrasDe = (texto) =>
  juntaCifras(
    texto
      .split(/\s+/)
      .flatMap((p) => p.split(GUIONES))
      .map(normaliza)
      .filter((p) => p !== "")
  ).map((c) => c.norma);

/**
 * Parte por ` / ` sin tocar lo que va entre llaves (lo dicho puede llevar una
 * barra). El principio y el final del texto cuentan como espacio: una barra
 * suelta en un extremo parte igual y deja una línea VACÍA, que `leeGuion` da por
 * error. Sin eso se quedaba dentro del texto y salía pintada.
 *
 * `cojas` son las barras con espacio a UN solo lado («zonas /más», «//»). No
 * parten: «/comando» es un texto legítimo y no hay otra forma de escribirlo.
 * Pero lo normal es que sean un separador mal tecleado, y se avisa.
 */
function partePorBarras(texto) {
  const partes = [];
  const cojas = [];
  let actual = "";
  let hondo = 0;
  const blanco = (c) => c === undefined || /\s/.test(c);
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (c === "{") hondo++;
    else if (c === "}") hondo = Math.max(0, hondo - 1);
    const lados = c === "/" && hondo === 0 ? Number(blanco(texto[i - 1])) + Number(blanco(texto[i + 1])) : 0;
    if (lados === 2) {
      partes.push(actual);
      actual = "";
    } else {
      if (lados === 1) cojas.push(i);
      actual += c;
    }
  }
  partes.push(actual);
  return { partes: partes.map((p) => p.trim()), cojas: cojas.length };
}

/** Lo que en un texto marca una pausa al hablar. */
const SIGNO_DE_PAUSA = /[.,;:!?…]/;
/** ¿Acaba el texto en uno de esos signos? (detrás puede cerrar una comilla o un paréntesis). */
const acabaEnPausa = (texto) => /[.,;:!?…]["'»”’)\]]*\s*$/.test(texto);

/**
 * Lee el guion marcado. Devuelve los bloques y los errores de marcado, todos a
 * la vez y con su número de línea: un guion de cuarenta bloques no se arregla
 * de error en error. Los `avisos` no paran nada: son lo que se pinta tal cual y
 * tiene pinta de errata.
 */
export function leeGuion(texto) {
  const bloques = [];
  const errores = [];
  const avisos = [];
  const renglones = texto.split("\n");
  for (let n = 0; n < renglones.length; n++) {
    let resto = renglones[n].trim();
    if (resto === "" || resto.startsWith("#")) continue;
    const error = (m) => errores.push(`línea ${n + 1}: ${m}`);
    const bloque = { renglon: n + 1, posicion: "abajo", escala: 1, puesto: false, lineas: [] };

    const conOpciones = /^\[([^\]]*)\]\s*(.*)$/.exec(resto);
    if (conOpciones) {
      resto = conOpciones[2];
      let posiciones = 0;
      for (const o of conOpciones[1].split(/\s+/).filter(Boolean)) {
        const escala = /^x(\d+(?:[.,]\d+)?)$/i.exec(o);
        if (POSICIONES.includes(o)) {
          bloque.posicion = o;
          if (++posiciones > 1) error("dos posiciones en el mismo bloque.");
        } else if (escala && Number(escala[1].replace(",", ".")) > 0) bloque.escala = Number(escala[1].replace(",", "."));
        else if (o === "puesto") bloque.puesto = true;
        else error(`opción «${o}» desconocida (valen: arriba, abajo, centro, xN, puesto).`);
      }
    }

    const { partes, cojas } = partePorBarras(resto);
    // Una barra en un extremo, o dos seguidas, deja una parte vacía: se dice una vez y con su nombre.
    if (partes.length > 1 && partes.some((p) => p === "")) {
      error(`«${resto}»: hay una barra suelta, sin línea a uno de sus lados (al principio, al final o dos seguidas). Quítala o escribe la línea que falta.`);
      continue;
    }
    if (cojas) {
      avisos.push(
        `línea ${n + 1}: «${resto}» lleva una barra con espacio a un solo lado: no separa líneas y se PINTA. ` +
          "Si querías partir ahí, espacio a los dos lados (` / `)."
      );
    }
    if (partes.length > MAX_LINEAS) error(`${partes.length} líneas en un bloque: el máximo es ${MAX_LINEAS}. Pártelo en dos.`);
    for (const parte of partes) {
      const conDicho = /^(.*?)\s*\{([^{}]*)\}$/.exec(parte);
      let pintado = (conDicho ? conDicho[1] : parte).trim();
      let estilo = "base";
      const acento = /^\*\*(.+)\*\*$/.exec(pintado);
      const dato = /^==(.+)==$/.exec(pintado);
      if (acento) [estilo, pintado] = ["acento", acento[1]];
      else if (dato) [estilo, pintado] = ["dato", dato[1]];
      pintado = pintado.trim().replace(/\s+/g, " ");
      if (pintado === "") {
        error(`una línea sin texto en «${parte || resto}».`);
        continue;
      }
      if (/\*\*|==|[{}]/.test(pintado)) {
        error(`«${parte}»: las marcas envuelven la LÍNEA ENTERA (**así** o ==así==) y las llaves van pegadas detrás. Una línea, un estilo.`);
        continue;
      }
      // `pausa`: quien escribió el guion puso aquí una coma o un punto. Es lo único que dice
      // dónde hay una pausa cuando whisper no la puntúa y la energía no la ve (ver `planifica`).
      const dicho = conDicho ? conDicho[2] : pintado;
      bloque.lineas.push({ texto: pintado, estilo, dicho: palabrasDe(dicho), pausa: acabaEnPausa(dicho) });
    }
    if (bloque.lineas.length) bloques.push(bloque);
  }
  if (bloques.length === 0 && errores.length === 0) errores.push("el guion no tiene ningún bloque.");
  return { bloques, errores, avisos };
}

/* ── La voz ───────────────────────────────────────────────────────────────── */

/** `[_BEG_]`, `[_TT_240]`…: marcas de whisper, no texto. */
const esMarca = (t) => /^\[_[A-Z]+_?\d*\]$/.test(t);

/**
 * Las palabras de un JSON de `transcribir.mjs --palabras`, con el segundo en que
 * empiezan y acaban. Acepta también un `-ojf` sin partir (tokens dentro de cada
 * frase) y un `-oj -ml 1 -sow` (una entrada por palabra, sin tokens): la forma
 * manda, no con qué se generó.
 */
export function palabrasDeTranscripcion(json) {
  const entradas = json && json.transcription;
  if (!Array.isArray(entradas)) throw new Fallo("el JSON no es de whisper-cli: no tiene `transcription`.");
  const palabras = [];
  const conTokens = entradas.some((e) => Array.isArray(e.tokens) && e.tokens.length);

  if (!conTokens) {
    if (entradas.some((e) => /\S\s+\S/.test(e.text || ""))) {
      throw new Fallo("el JSON trae frases enteras, no palabras. Repite la transcripción con `transcribir.mjs … --palabras`.");
    }
    for (const e of entradas) {
      const norma = normaliza(e.text || "");
      if (norma) palabras.push({ oido: e.text.trim(), norma, ini: e.offsets.from / 1000, fin: e.offsets.to / 1000, origen: "reparto" });
    }
    return { palabras: remata(palabras), dtw: false };
  }

  let actual = null;
  // Dónde acabó, según el DTW, el último token de texto. `null` al empezar y
  // tras cada `[_BEG_]`: una ventana nueva de 30 s se alinea aparte y su primera
  // palabra no empieza donde acabó la ventana anterior.
  let finAnterior = null;
  let algunDtw = false;
  for (const e of entradas) {
    for (const t of e.tokens || []) {
      if (esMarca(t.text)) {
        if (t.text === "[_BEG_]") finAnterior = null;
        continue;
      }
      const dtw = typeof t.t_dtw === "number" && t.t_dtw >= 0 ? t.t_dtw / 100 : null;
      if (dtw !== null) algunDtw = true;
      if (actual === null || /^\s/.test(t.text)) {
        actual = {
          oido: "",
          ini: finAnterior !== null ? finAnterior : t.offsets.from / 1000,
          fin: null,
          origen: finAnterior !== null ? "dtw" : "reparto",
        };
        palabras.push(actual);
      }
      actual.oido += t.text;
      // El fin es el del último token que SUENA: la coma pegada detrás se alarga por el silencio.
      if (normaliza(t.text) !== "" || actual.fin === null) actual.fin = dtw !== null ? dtw : t.offsets.to / 1000;
      finAnterior = dtw;
    }
  }
  const utiles = [];
  for (const p of palabras) {
    p.oido = p.oido.trim();
    p.norma = normaliza(p.oido);
    if (p.norma) utiles.push(p);
  }
  return { palabras: remata(utiles), dtw: algunDtw };
}

/**
 * Lo que las dos formas del JSON comparten con el guion marcado: la palabra con
 * guion se parte («ex-alumno» son dos, y sus partes comparten el tiempo de la
 * palabra entera, que no hay otro) y la cifra dicha en varias palabras se junta
 * en una, del inicio de la primera al fin de la última.
 */
function remata(palabras) {
  const partidas = [];
  for (const p of palabras) {
    const partes = p.oido.split(GUIONES).filter((t) => normaliza(t) !== "");
    if (partes.length > 1) for (const t of partes) partidas.push({ ...p, oido: t, norma: normaliza(t) });
    else partidas.push(p);
  }
  return juntaCifras(partidas.map((p) => p.norma)).map((g) => {
    if (g.hasta - g.desde === 1) return partidas[g.desde];
    const suyas = partidas.slice(g.desde, g.hasta);
    return { ...suyas[0], oido: suyas.map((p) => p.oido).join(" "), norma: g.norma, fin: suyas[suyas.length - 1].fin };
  });
}

const FRECUENCIA = 16000;
const VENTANA = FRECUENCIA / 100; // 10 ms

/**
 * Los tramos `[inicio, fin]` (en segundos) en que hay voz. Es el método de
 * limites-voz.py con sus mismas cifras (ventanas de 10 ms, umbral = percentil
 * 8 + 12 dB, huecos de menos de 120 ms rellenos e islas de menos de 60 ms
 * fuera) y UNA diferencia: aquí no se corta por arriba en 3400 Hz. Aquel mide
 * dónde recortar una toma de evento y el corte le quita el siseo de la sala;
 * este busca dónde ARRANCA una palabra, y «sin», «fachada» o «chimenea»
 * arrancan por encima de 3400: con el corte, «sin perder» entraba 4 frames
 * tarde, en la vocal. Por eso el arranque de aquí puede ir unas centésimas por
 * delante del que da limites-voz.py para la misma toma.
 */
export function tramosDeVoz(audio) {
  const tmp = carpetaTemporal("trozos-");
  const crudo = path.join(tmp, "voz.raw");
  let pcm;
  try {
    const r = ejecutar("ffmpeg", [
      "-nostdin", "-v", "error", "-y", "-i", audio, "-map", "0:a:0", "-ac", "1", "-ar", String(FRECUENCIA),
      "-af", "highpass=f=300:p=2,highpass=f=300:p=2", "-f", "s16le", crudo,
    ]);
    if (r.status !== 0) throw new Fallo(`ffmpeg no pudo leer el audio ${muestra(audio)}\n${r.stderr.trim()}`);
    pcm = fs.readFileSync(crudo);
  } finally {
    borrar(tmp);
  }
  const db = [];
  for (let i = 0; i + VENTANA * 2 <= pcm.length; i += VENTANA * 2) {
    let suma = 0;
    for (let k = 0; k < VENTANA; k++) {
      const v = pcm.readInt16LE(i + k * 2);
      suma += v * v;
    }
    const rms = Math.sqrt(suma / VENTANA) / 32768;
    db.push(rms > 1e-9 ? 20 * Math.log10(rms) : -120);
  }
  if (db.length === 0) return [];
  const orden = [...db].sort((a, b) => a - b);
  const umbral = orden[Math.floor(0.08 * (orden.length - 1))] + 12;
  const tramos = [];
  for (let i = 0; i < db.length; ) {
    if (db[i] <= umbral) {
      i++;
      continue;
    }
    let j = i;
    while (j < db.length && db[j] > umbral) j++;
    const ultimo = tramos[tramos.length - 1];
    if (ultimo && i - ultimo[1] < 12) ultimo[1] = j;
    else tramos.push([i, j]);
    i = j;
  }
  return tramos.filter(([a, b]) => b - a >= 6).map(([a, b]) => [a / 100, b / 100]);
}

/** Lo más que el DTW adelanta el fin de un token: se han medido 5 frames a 30 fps (0,17 s) contra la envolvente. */
const COLA_DTW = 0.18;
/** Un silencio más corto puede ser la oclusiva de una palabra («sien-ta», 0,13 s) y no una pausa. */
const PAUSA_CLARA = 0.2;
/**
 * Lo más que el DTW mete una coma dentro de la palabra siguiente (se han medido
 * 0,12 s). Si la voz lleva más tiempo sonando, lo que suena no es esta palabra
 * sino una que whisper se ha saltado, y no se toca.
 */
const COMA_TARDIA = 0.2;

/**
 * Lleva al arranque de la voz las palabras que siguen a una pausa (y la primera
 * de la toma). Una palabra vive en el tramo de voz donde ACABA: si ese tramo
 * arranca después de donde whisper la hace empezar, o entre ella y la palabra
 * anterior, empieza con él. Son tres casos, los tres medidos:
 *
 *   · EMPIEZA EN SILENCIO y un tramo arranca dentro de ella (o pegado a su
 *     final, a 0,15 s). whisper puntuó y el DTW acabó la coma en mitad de la
 *     pausa. Es también la primera palabra de la toma.
 *   · EMPIEZA EN VOZ, en la cola de la palabra anterior, y un tramo arranca
 *     dentro de ella. whisper NO puntuó, y la palabra «empieza» donde acaba la
 *     anterior: sin esto la línea entraba al principio del silencio, 23 frames
 *     antes en «Y su ubicación». Solo si esa cola es corta (`COLA_DTW`): si es
 *     larga, lo que suena antes del hueco es la propia palabra, y el hueco, una
 *     oclusiva suya («habita-ciones», «sien-ta»; están en la misma locución).
 *   · EMPIEZA EN VOZ y su tramo arrancó DESPUÉS de acabar la palabra anterior,
 *     hace poco (`COMA_TARDIA`): el DTW acabó la coma con la palabra ya sonando
 *     («la vista», 4 frames tarde).
 *
 * Si dentro de la palabra arrancan varios tramos manda el último (lo de antes
 * es una respiración o un chasquido), salvo que solo los separe un hueco corto:
 * entonces son la misma palabra y manda el primero.
 *
 * La que cae entera en «silencio» y lejos de la voz es otra cosa —una palabra
 * dicha muy bajo, por debajo del umbral— y moverla la montaría encima de la
 * siguiente. A la que mueve en el caso dudoso (cola corta Y hueco corto: puede
 * ser una pausa breve o una oclusiva) le deja `hueco`, para que `planifica` lo
 * avise. Devuelve cuántas ha movido.
 */
export function anclaALaVoz(palabras, tramos) {
  const tramoDe = (t) => tramos.find(([a, b]) => t >= a && t < b) || null;
  let movidas = 0;
  let finAnterior = null;
  for (const p of palabras) {
    const suyo = tramoDe(p.ini);
    let k = -1;
    for (let i = 0; i < tramos.length; i++) if (tramos[i][0] > p.ini && tramos[i][0] <= p.fin) k = i;
    if (k < 0 && !suyo) {
      const i = tramos.findIndex(([a]) => a > p.ini);
      if (i >= 0 && tramos[i][0] <= p.fin + 0.15) k = i;
    }
    let destino = null;
    if (k >= 0) {
      while (k > 0 && tramos[k - 1][0] > p.ini && tramos[k][0] - tramos[k - 1][1] < PAUSA_CLARA) k--;
      if (!suyo) destino = tramos[k][0];
      else if (suyo[1] - p.ini <= COLA_DTW) {
        destino = tramos[k][0];
        const silencio = destino - tramos[k - 1][1];
        if (silencio < PAUSA_CLARA) p.hueco = { dtw: p.ini, cola: suyo[1] - p.ini, silencio };
      }
    } else if (suyo && finAnterior !== null && suyo[0] > finAnterior && suyo[0] < p.ini && p.ini - suyo[0] <= COMA_TARDIA) {
      destino = suyo[0];
    }
    if (destino !== null) {
      if (Math.abs(destino - p.ini) >= 0.005) movidas++;
      p.ini = destino;
      p.origen = "voz";
    }
    // El final, igual: una palabra no sigue sonando dentro de la pausa.
    if (!tramoDe(p.fin)) {
      let anterior = null;
      for (const tr of tramos) if (tr[1] <= p.fin) anterior = tr;
      if (anterior && anterior[1] > p.ini) p.fin = anterior[1];
    }
    if (p.fin < p.ini) p.fin = p.ini;
    finAnterior = p.fin;
  }
  return movidas;
}

/* ── La alineación ────────────────────────────────────────────────────────── */

/*
 * Las cifras. whisper las escribe casi siempre con números («198») y el guion,
 * entre llaves, como se dicen («ciento noventa y ocho»): cuatro palabras contra
 * una. En un guion corto eso solo ya pasaba del tope y el script decía que el
 * guion no era de ese audio. Por eso una cifra dicha en varias palabras se
 * junta en UNA, con su valor en dígitos, a los dos lados (whisper también las
 * escribe en letra a veces: «tres habitaciones» en una pasada, «3» en otra).
 * Llega a 999.999; «millones» se queda como palabra, que es como lo escribe
 * whisper («2 millones»).
 */
const mapa = (o) => new Map(Object.keys(o).map((k) => [k, o[k]])); // un Map y no el objeto: «constructor» también es una palabra
const UNIDADES = mapa({ uno: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6, siete: 7, ocho: 8, nueve: 9 });
const HASTA_29 = mapa({
  diez: 10, once: 11, doce: 12, trece: 13, catorce: 14, quince: 15, dieciseis: 16, diecisiete: 17, dieciocho: 18,
  diecinueve: 19, veinte: 20, veintiuno: 21, veintiun: 21, veintidos: 22, veintitres: 23, veinticuatro: 24,
  veinticinco: 25, veintiseis: 26, veintisiete: 27, veintiocho: 28, veintinueve: 29,
});
const DECENAS = mapa({ treinta: 30, cuarenta: 40, cincuenta: 50, sesenta: 60, setenta: 70, ochenta: 80, noventa: 90 });
const CENTENAS = mapa({
  cien: 100, ciento: 100, doscientos: 200, trescientos: 300, cuatrocientos: 400, quinientos: 500, seiscientos: 600,
  setecientos: 700, ochocientos: 800, novecientos: 900, doscientas: 200, trescientas: 300, cuatrocientas: 400,
  quinientas: 500, seiscientas: 600, setecientas: 700, ochocientas: 800, novecientas: 900,
});

/** La cifra de menos de mil que empieza en `p[i]`: `[valor, índice siguiente]`, o `null`. */
function menosDeMil(p, i) {
  let v = 0;
  let k = i;
  if (CENTENAS.has(p[k])) v += CENTENAS.get(p[k++]);
  if (HASTA_29.has(p[k])) v += HASTA_29.get(p[k++]);
  else if (DECENAS.has(p[k])) {
    v += DECENAS.get(p[k++]);
    // «un» y «una» solo cuentan aquí, detrás de «treinta y»: sueltos son un artículo.
    if (p[k] === "y" && (UNIDADES.has(p[k + 1]) || p[k + 1] === "un" || p[k + 1] === "una")) {
      v += UNIDADES.get(p[k + 1]) || 1;
      k += 2;
    }
  } else if (UNIDADES.has(p[k])) v += UNIDADES.get(p[k++]);
  return k > i ? [v, k] : null;
}

/** La cifra que empieza en `p[i]`, con sus miles: `[valor, índice siguiente]`, o `null`. */
function cifraEn(p, i) {
  let miles = menosDeMil(p, i);
  // «5 mil»: whisper escribe a veces la cifra y deja el «mil» en letra.
  const enDigitos = !miles && /^\d{1,3}$/.test(p[i] || "") && p[i + 1] === "mil";
  if (enDigitos) miles = [Number(p[i]), i + 1];
  const k = miles ? miles[1] : i;
  if (p[k] !== "mil") return miles;
  const resto = menosDeMil(p, k + 1);
  return [(miles ? miles[0] : 1) * 1000 + (resto ? resto[0] : 0), resto ? resto[1] : k + 1];
}

/** El valor, en dígitos, de una palabra que ella sola es una cifra («tres», «doscientos», «mil»); si no lo es, `null`. */
function cifraDe(palabra) {
  if (!CIFRA_DE.has(palabra)) {
    const c = palabra === "cero" ? [0] : cifraEn([palabra], 0);
    CIFRA_DE.set(palabra, c ? String(c[0]) : null);
  }
  return CIFRA_DE.get(palabra);
}
const CIFRA_DE = new Map(); // se pregunta por cada pareja de la alineación: miles de veces la misma palabra

/**
 * Agrupa una fila de palabras normalizadas: cada cifra dicha en DOS o más
 * palabras pasa a ser un solo elemento con su valor en dígitos. Devuelve
 * `{ norma, desde, hasta }` (índices de la fila, `hasta` sin incluir). La cifra
 * de una sola palabra se queda como está: la casa `seParecen`, y así un aviso
 * sigue enseñando «tres» y no «3».
 */
export function juntaCifras(palabras) {
  const grupos = [];
  for (let i = 0; i < palabras.length; ) {
    const c = cifraEn(palabras, i);
    if (c && c[1] - i >= 2) {
      grupos.push({ norma: String(c[0]), desde: i, hasta: c[1] });
      i = c[1];
    } else {
      grupos.push({ norma: palabras[i], desde: i, hasta: i + 1 });
      i++;
    }
  }
  return grupos;
}

function distancia(a, b) {
  let fila = [];
  for (let j = 0; j <= b.length; j++) fila.push(j);
  for (let i = 1; i <= a.length; i++) {
    const nueva = [i];
    for (let j = 1; j <= b.length; j++) {
      nueva.push(Math.min(fila[j] + 1, nueva[j - 1] + 1, fila[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)));
    }
    fila = nueva;
  }
  return fila[b.length];
}

/** ¿Son la misma palabra mal oída? Una errata, un prefijo («conocer» + «la») o una cifra. Las cortas no: «la» y «lo» son dos palabras. */
function seParecen(a, b) {
  if (cifraDe(a) === b || cifraDe(b) === a) return true;
  const corta = Math.min(a.length, b.length);
  if (corta < 4) return false;
  if (a.startsWith(b) || b.startsWith(a)) return true;
  if (Math.abs(a.length - b.length) > 2) return false; // no cabe en dos erratas: no hace falta medirlo
  const d = distancia(a, b);
  return (d <= 1 && corta >= 4) || (d <= 2 && corta >= 7);
}

/**
 * Lo que cuesta cada paso de la alineación (gana el camino más barato). Casar
 * PREMIA, y no solo «no cuesta»: con los extremos gratis, un camino que soltara
 * las primeras palabras del guion en vez de casarlas saldría igual de barato.
 * Una pareja que no se parece cuesta MÁS que dejar la palabra sin pareja, para
 * que en los extremos no se case con lo primero que suene; y MENOS que dejarla
 * sin pareja y además soltar la oída, para que dentro de la frase sí se case.
 */
const COSTE = { igual: -1, parecida: -0.7, distinta: 0.6, hueco: 0.5 };

/** En cuántas palabras oídas puede salir partida una mal oída («estuviera» → «es» + «subir»). */
const MAX_PARTIDA = 2;

/**
 * Casa las palabras del guion con las oídas, en orden. Por cada palabra del
 * guion devuelve `{ j, grado }`: el índice de su pareja y si es `igual`,
 * `parecida` o `distinta`, o `{ j: null, grado: "falta" }` si no tiene.
 *
 * Dentro del guion, una palabra mal oída se queda con la que ocupa su sitio,
 * que es la que trae su tiempo. En los EXTREMOS, lo oído de más no cuesta nada:
 * una toma trae cosas antes y después de la frase («¿ya?», «corta»), y la
 * locución de una pieza puede seguir cuando este guion ya ha acabado. Sin eso,
 * la última palabra del guion se casaba con lo primero que sonara detrás.
 *
 * Si lo oído trae la frase dos veces y las dos casan igual de bien, devuelve la
 * PRIMERA (una que case mejor gana, esté donde esté). Que hay otra lo avisa
 * `planifica`.
 */
export function alinea(guion, oidas) {
  const n = guion.length;
  const m = oidas.length;
  const ancho = m + 1;
  const coste = new Float64Array((n + 1) * ancho); // la fila 0 se queda a cero: lo oído antes del guion es gratis
  const grados = new Array(n * m);
  // Lo oído después del guion (última fila) también es gratis.
  const deMas = (i) => (i === n ? 0 : COSTE.hueco);
  for (let i = 1; i <= n; i++) {
    coste[i * ancho] = i * COSTE.hueco;
    for (let j = 1; j <= m; j++) {
      const g = guion[i - 1] === oidas[j - 1] ? "igual" : seParecen(guion[i - 1], oidas[j - 1]) ? "parecida" : "distinta";
      grados[(i - 1) * m + (j - 1)] = g;
      coste[i * ancho + j] = Math.min(
        coste[(i - 1) * ancho + (j - 1)] + COSTE[g],
        coste[(i - 1) * ancho + j] + COSTE.hueco,
        coste[i * ancho + (j - 1)] + deMas(i)
      );
    }
  }
  const pares = new Array(n);
  let i = n;
  let j = m;
  const casi = (a, b) => Math.abs(a - b) < 1e-9;
  while (i > 0) {
    const aqui = coste[i * ancho + j];
    const g = j > 0 ? grados[(i - 1) * m + (j - 1)] : null;
    const casa = j > 0 && casi(aqui, coste[(i - 1) * ancho + (j - 1)] + COSTE[g]);
    const sobra = j > 0 && casi(aqui, coste[i * ancho + (j - 1)] + deMas(i));
    // A igual coste: primero la pareja buena; después, soltar lo oído de más (así
    // una mal oída se queda con la PRIMERA de las que ocupan su sitio, que es
    // donde empieza); y solo al final la pareja que no se parece.
    //
    // Menos al final del guion, donde lo oído de más es gratis y se suelta ANTES
    // de casar: si el audio dice la frase dos veces, las dos cuestan lo mismo y
    // casando primero se iba a la última, con todo casado y sin una queja.
    // Soltando primero se queda con la PRIMERA vez que casa así de bien.
    if (i === n && sobra) j--;
    else if (casa && g !== "distinta") pares[--i] = { j: --j, grado: g };
    else if (sobra) j--;
    else if (casa) pares[--i] = { j: --j, grado: g };
    else pares[--i] = { j: null, grado: "falta" };
  }
  return pares;
}

/* ── El plan ──────────────────────────────────────────────────────────────── */

const seg = (t) => t.toFixed(2).replace(".", ",") + " s";

/** «1 aviso», «2 avisos». */
const tantos = (n, uno, varios = uno + "s") => `${n} ${n === 1 ? uno : varios}`;

/** Por qué `--audio` no ha anclado una palabra que, por lo demás, parece ir detrás de una pausa. */
const SIN_SILENCIO = "--audio no ve ahí un silencio (dura menos de 0,12 s, o hay música debajo): compruébalo en el frame.";

/**
 * ¿Dura la palabra más de lo que cabe decir de corrido (0,30 s más 0,06 s por
 * letra)? Es la huella de una pausa que whisper no ha separado: la palabra
 * «empieza» donde acaba la anterior y se lleva el silencio dentro («con», 0,72 s).
 * Las cifras no cuentan: «198» son tres caracteres y cuatro palabras dichas.
 */
const duraDeMas = (w) => !/\d/.test(w.norma) && w.fin - w.ini > 0.3 + 0.06 * w.norma.length;

/**
 * De los bloques del guion y las palabras oídas, los bloques con sus frames.
 * Devuelve `{ bloques, avisos, sinCasar, total }`; lanza un `Fallo` si el guion
 * no casa con ese audio.
 */
export function planifica(guion, oidas, o) {
  const avisos = [];
  const tope = o.tope !== undefined ? o.tope : TOPE_SIN_CASAR;
  const frameDe = (t) => Math.max(o.en, o.en + Math.round(t * o.fps) - Math.round(o.desde * o.fps));
  const id = (k) => o.prefijo + String(o.inicio + k).padStart(2, "0");

  // Todas las palabras del guion en fila, recordando de qué línea son.
  const fila = [];
  guion.forEach((b, k) => b.lineas.forEach((l, i) => l.dicho.forEach((p) => fila.push({ p, k, i }))));
  const pares = alinea(fila.map((f) => f.p), oidas.map((w) => w.norma));
  const casadas = new Set(pares.filter((p) => p.j !== null).map((p) => p.j));

  const sinCasar = [];
  pares.forEach((par, x) => {
    if (par.grado === "falta" || par.grado === "distinta") sinCasar.push({ ...fila[x], oido: par.j !== null ? oidas[par.j].oido : null });
  });
  if (fila.length > 0 && (100 * sinCasar.length) / fila.length > tope) {
    const lista = sinCasar
      .slice(0, 40)
      .map((s) => `   · [${id(s.k)}] «${s.p}»${s.oido ? ` (se oye «${s.oido}»)` : ""}`)
      .join("\n");
    throw new Fallo(
      `${sinCasar.length} de las ${fila.length} palabras del guion no casan con la transcripción ` +
        `(${Math.round((100 * sinCasar.length) / fila.length)} %, y el tope es ${tope} %).\n` +
        lista + (sinCasar.length > 40 ? `\n   · … y ${sinCasar.length - 40} más` : "") +
        "\n   Lo normal es que este guion no sea de este audio. Si lo es, whisper lo oye de otra manera: escribe entre llaves " +
        "lo que él oye, detrás de la línea (`**estuviera**{es subir}`), o sube el listón con --tope."
    );
  }

  // ¿Dice el audio la frase más de una vez? Se prueba el guion contra lo oído
  // ANTES y DESPUÉS de donde ha casado: si ahí también casan tres de cada cuatro
  // palabras (el listón de siempre, no el de --tope, que subido vería tomas en
  // cualquier frase), hay dos tomas en el archivo, y cuál vale no se sabe desde aquí.
  const buenas = (ps) => ps.filter((p) => p.grado === "igual" || p.grado === "parecida");
  const mias = buenas(pares);
  if (mias.length) {
    const [j0, j1] = [mias[0].j, mias[mias.length - 1].j];
    for (const [a, b] of [[0, j0], [j1 + 1, oidas.length]]) {
      const otras = buenas(alinea(fila.map((f) => f.p), oidas.slice(a, b).map((w) => w.norma)));
      if (otras.length === 0 || (100 * (fila.length - otras.length)) / fila.length > TOPE_SIN_CASAR) continue;
      avisos.push(
        `[plan] el guion casa también con lo dicho de ${seg(oidas[a + otras[0].j].ini)} a ${seg(oidas[a + otras[otras.length - 1].j].fin)} ` +
          `(${otras.length} de sus ${fila.length} palabras): el audio trae la frase más de una vez. Me quedo con la de ` +
          `${seg(oidas[j0].ini)} a ${seg(oidas[j1].fin)}, ${a === 0 ? "que casa mejor" : "que es la primera"}. ` +
          "Si la que vale es la otra, acota la fuente con --desde y --hasta."
      );
    }
  }

  // Tiempos por línea. Una palabra mal oída suele salir partida («estuviera» →
  // «es» + «subir») o no casar con nada: su tiempo está en lo oído que quedó
  // suelto justo delante de la primera palabra casada de la línea. Se toma como
  // mucho tanto como falta, para no tragarse una frase entera que no es suya.
  const sueltasTras = (j) => {
    let z = j;
    for (let cabe = MAX_PARTIDA; cabe > 0 && z + 1 < oidas.length && !casadas.has(z + 1); cabe--) z++;
    return z;
  };
  let x = 0;
  // ¿Acaba en coma o en punto, en el guion, la línea anterior a la que se está mirando?
  let pausaAntes = false;
  const bloques = guion.map((b, k) => ({
    id: id(k),
    posicion: b.posicion,
    escala: b.escala,
    puesto: b.puesto,
    lineas: b.lineas.map((l, i) => {
      const suyos = pares.slice(x, x + l.dicho.length);
      const suyas = fila.slice(x, x + l.dicho.length);
      x += l.dicho.length;
      const trasPausa = pausaAntes;
      pausaAntes = Boolean(l.pausa);
      const linea = { texto: l.texto, estilo: l.estilo, t: null, fin: null, origen: "interpolada", oido: "", abre: false };
      const primera = suyos.findIndex((p) => p.j !== null);
      if (primera < 0) return linea;
      let ultima = primera;
      suyos.forEach((p, y) => {
        if (p.j !== null) ultima = y;
      });
      const dudosa = suyos[primera].grado === "distinta";
      let j0 = suyos[primera].j;
      for (let cabe = primera + (dudosa ? MAX_PARTIDA : 0); cabe > 0 && j0 > 0 && !casadas.has(j0 - 1); cabe--) j0--;
      const j1 = suyos[ultima].grado === "distinta" ? sueltasTras(suyos[ultima].j) : suyos[ultima].j;

      linea.t = oidas[j0].ini;
      linea.origen = oidas[j0].origen;
      linea.abre = j0 === 0; // antes de esta línea no se ha dicho nada
      linea.fin = Math.max(linea.t, oidas[j1].fin);
      linea.oido = oidas.slice(j0, j1 + 1).map((w) => w.oido).join(" ");
      if (primera > 0 || dudosa) {
        const escritas = suyas.slice(0, primera + (dudosa ? 1 : 0)).map((s) => `«${s.p}»`).join(" ");
        const oido = oidas.slice(j0, dudosa ? sueltasTras(suyos[primera].j) + 1 : suyos[primera].j).map((w) => w.oido).join(" ");
        avisos.push(
          oido
            ? `[${id(k)}] «${l.texto}»: donde va ${escritas} se oye «${oido}». El tiempo (${seg(linea.t)}) sale de su sitio en la frase: compruébalo.`
            : `[${id(k)}] «${l.texto}»: ${escritas} no está en la transcripción. La línea entra con «${suyas[primera].p}» ` +
                `(${seg(linea.t)}), más tarde de lo que suena: adelántala a mano.`
        );
      } else if (b.puesto && i > 0) {
        // Su tiempo no se usa: en un bloque `puesto` todas las líneas entran con la primera.
      } else if (o.dtw && linea.origen === "reparto" && !(b.puesto && k === 0 && linea.abre)) {
        avisos.push(
          `[${id(k)}] «${l.texto}»: el tiempo de «${oidas[j0].oido}» (${seg(linea.t)}) no es del DTW sino del reparto de whisper ` +
            "(primera palabra del audio o de una ventana de 30 s), que la clava antes de que suene. " +
            (o.audio
              ? "--audio no ve silencio delante (la voz ya suena ahí, o hay música debajo): compruébalo en el frame."
              : "Mídelo: --audio, --s0 o limites-voz.py.")
        );
      } else if (oidas[j0].hueco) {
        const h = oidas[j0].hueco;
        avisos.push(
          `[${id(k)}] «${l.texto}»: según el DTW «${oidas[j0].oido}» empieza en ${seg(h.dtw)}, pero ${seg(h.cola)} después la voz calla ` +
            `${seg(h.silencio)}. Lo tomo por una pausa y la línea entra cuando vuelve la voz (${seg(linea.t)}); si es una oclusiva ` +
            `de la propia palabra, entra ${Math.round((linea.t - h.dtw) * o.fps)} f tarde: compruébalo en el frame.`
        );
      } else if (o.dtw && duraDeMas(oidas[j0])) {
        avisos.push(
          `[${id(k)}] «${l.texto}»: «${oidas[j0].oido}» dura ${seg(oidas[j0].fin - oidas[j0].ini)} según el DTW, demasiado para ` +
            `${tantos(oidas[j0].norma.length, "letra")}: lo normal es que lleve delante una pausa y la línea entre al principio del silencio, antes de que suene. ` +
            (o.audio ? SIN_SILENCIO : "Pasa --audio para anclarla a la voz.")
        );
      } else if (
        o.dtw && linea.origen === "dtw" && trasPausa && !(b.puesto && i > 0) &&
        j0 > 0 && casadas.has(j0 - 1) && !SIGNO_DE_PAUSA.test(oidas[j0 - 1].oido)
      ) {
        // La pausa que nadie ve: whisper no la puntuó, la palabra no dura de más y
        // la energía no la separa. Solo la delata la coma del guion. No cuenta si
        // lo oído justo antes no es del guion (la pausa iría delante de ESO, no de
        // esta línea) ni, en un bloque `puesto`, más que su primera línea, que es
        // la única cuyo tiempo se usa.
        avisos.push(
          `[${id(k)}] «${l.texto}»: en el guion va detrás de una coma o de un punto, y whisper no ha puntuado ahí: para él «${oidas[j0].oido}» ` +
            `empieza donde acaba «${oidas[j0 - 1].oido}» (${seg(linea.t)}). Si esa pausa se hace al hablar, la línea entra al principio ` +
            "del silencio, antes de que suene (se han medido 8 f). " +
            (o.audio ? SIN_SILENCIO : "Pasa --audio para anclarla a la voz.")
        );
      }
      return linea;
    }),
  }));

  // Frames. Las líneas sin ninguna palabra casada se reparten entre sus vecinas.
  const todas = [];
  bloques.forEach((b) => b.lineas.forEach((l) => todas.push({ b, l })));
  for (const { l } of todas) if (l.t !== null) l.frame = frameDe(l.t);
  const finVoz = oidas.length ? frameDe(oidas[oidas.length - 1].fin) : o.en;
  for (let a = 0; a < todas.length; a++) {
    if (todas[a].l.frame !== undefined) continue;
    let z = a;
    while (z < todas.length && todas[z].l.frame === undefined) z++;
    const antes = a > 0 ? todas[a - 1].l.frame : o.en;
    const despues = z < todas.length ? todas[z].l.frame : Math.max(finVoz, antes);
    for (let y = a; y < z; y++) {
      // Si no hay línea anterior, la primera cae en el arranque mismo de la fuente.
      const paso = a > 0 ? y - a + 1 : y - a;
      const tramos = a > 0 ? z - a + 1 : z - a;
      todas[y].l.frame = Math.round(antes + ((despues - antes) * paso) / tramos);
      avisos.push(
        `[${todas[y].b.id}] «${todas[y].l.texto}»: ninguna de sus palabras casa con la transcripción. ` +
          "Su frame es un REPARTO entre las líneas vecinas, no una medida: ponla a mano."
      );
    }
    a = z - 1;
  }

  // Orden y mínimos. Lo que se mueve se dice: a partir de aquí una línea ya no
  // cae sobre su palabra, y eso tiene que saberlo quien revisa.
  let suelo = -Infinity;
  bloques.forEach((b, k) => {
    const medido = b.lineas.map((l) => l.frame);
    if (b.puesto) {
      // Entero desde su primer frame; y si abre la fuente, desde el de la fuente.
      const f = Math.max(k === 0 && b.lineas[0].abre ? o.en : medido[0], suelo);
      if (f > medido[0]) {
        avisos.push(
          `[${b.id}] «${b.lineas[0].texto}» suena en el frame ${medido[0]} y el bloque entra en el ${f}, ${f - medido[0]} f tarde: ` +
            `[${bloques[k - 1].id}] necesita ${MIN_EN_PANTALLA} f en pantalla. Junta los dos bloques o acorta el anterior.`
        );
      }
      b.lineas.forEach((l) => (l.frame = f));
    } else {
      b.lineas.forEach((l, i) => {
        const minimo = i === 0 ? suelo : b.lineas[i - 1].frame + MIN_ENTRE_LINEAS;
        if (l.frame < minimo) {
          avisos.push(
            `[${b.id}] «${l.texto}» ${l.t !== null ? "suena en" : "caía por reparto en"} el frame ${medido[i]} y entra en el ${minimo}, ${minimo - medido[i]} f tarde: ` +
              (i === 0
                ? `[${bloques[k - 1].id}] necesita ${MIN_EN_PANTALLA} f en pantalla. Junta los dos bloques o acorta el anterior.`
                : `las líneas de un bloque entran con ${MIN_ENTRE_LINEAS} f o más entre una y otra.`)
          );
          l.frame = minimo;
        }
      });
    }
    suelo = b.lineas[b.lineas.length - 1].frame + MIN_EN_PANTALLA;
  });

  // Salida de cada bloque: cuando entra el siguiente o, si tarda, `cola` frames
  // después de su última palabra. Nunca antes de que su última línea se lea.
  bloques.forEach((b, k) => {
    const ultima = b.lineas[b.lineas.length - 1];
    const fines = b.lineas.filter((l) => l.fin !== null).map((l) => l.fin);
    const trasLaVoz = fines.length ? frameDe(Math.max(...fines)) + o.cola : null;
    const siguiente = k + 1 < bloques.length ? bloques[k + 1].lineas[0].frame : null;
    let hasta;
    if (siguiente !== null && trasLaVoz !== null) hasta = Math.min(siguiente, trasLaVoz);
    else if (siguiente !== null) hasta = siguiente;
    else hasta = trasLaVoz !== null ? trasLaVoz : ultima.frame + MIN_EN_PANTALLA + o.cola;
    b.hasta = Math.max(hasta, ultima.frame + MIN_EN_PANTALLA);
  });

  return { bloques, avisos, sinCasar, total: fila.length };
}

/* ── El texto del plan ────────────────────────────────────────────────────── */

/** Un bloque como literal de TypeScript: en una línea si cabe, abierto si no. Solo lleva lo que no es el valor por defecto. */
export function escribeBloque(b) {
  const cabeza = [`id: ${JSON.stringify(b.id)}`];
  if (b.posicion !== "abajo") cabeza.push(`posicion: ${JSON.stringify(b.posicion)}`);
  if (b.escala !== 1) cabeza.push(`escala: ${b.escala}`);
  if (b.puesto) cabeza.push("entrada: 0");
  cabeza.push(`hasta: ${b.hasta}`);
  const trozos = b.lineas.map(
    (l) => `{ desde: ${l.frame}, texto: ${JSON.stringify(l.texto)}${l.estilo !== "base" ? `, estilo: ${JSON.stringify(l.estilo)}` : ""} }`
  );
  const corta = `  { ${cabeza.join(", ")}, trozos: [${trozos.join(", ")}] },`;
  if (corta.length <= ANCHO_TS) return corta;
  return ["  {", ...cabeza.map((c) => `    ${c},`), "    trozos: [", ...trozos.map((t) => `      ${t},`), "    ],", "  },"].join("\n");
}

function escribeModulo(bloques, o) {
  const origen = o.desde > 0 || o.en > 0 ? `; el segundo ${seg(o.desde)} de la fuente cae en el frame ${o.en}` : "";
  return [
    "/**",
    " * SUBTÍTULOS EDITORIALES — plan generado por trozos-editoriales.mjs.",
    " *",
    ` * El TEXTO sale del guion marcado (${muestra(o.guion)}) y los FRAMES, de la voz`,
    ` * medida por palabra (${muestra(o.json)}), a ${o.fps} fps${origen}.`,
    " *",
    " * Es un punto de partida, no un artefacto: se ajusta a mano mirando el frame,",
    " * y volver a generarlo pisa esos ajustes. Puerta: revisar-subtitulos.mjs.",
    " */",
    'import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";',
    'import { segmentosDe } from "../../motor/subtitulos-editoriales";',
    "",
    `export const ${o.nombre}: readonly BloqueEditorial[] = [`,
    ...bloques.map(escribeBloque),
    "];",
    "",
    `export const ${o.nombre}Srt = segmentosDe(${o.nombre}, ${o.fps});`,
    "",
  ].join("\n");
}

function tabla(bloques, o) {
  const filas = [];
  for (const b of bloques) {
    const opciones = [b.posicion !== "abajo" ? b.posicion : "", b.escala !== 1 ? `x${b.escala}` : "", b.puesto ? "puesto" : ""].filter(Boolean);
    filas.push(`${b.id}${opciones.length ? "  [" + opciones.join(" ") + "]" : ""}  sale en ${b.hasta}`);
    for (const l of b.lineas) {
      const medido = l.t !== null ? `${seg(l.t).padStart(8)}  ${l.origen.padEnd(7)}` : `${"".padStart(8)}  ${l.origen}`;
      filas.push(`   ${String(l.frame).padStart(5)}  ${medido}  «${l.texto}»${l.oido ? `  ← ${l.oido}` : ""}`);
    }
  }
  return filas.join("\n") + `\n   (frame · segundo de la fuente · de dónde sale: dtw, reparto de whisper, voz medida o s0 · texto ← lo oído; ${o.fps} fps)`;
}

/* ── Entrada ──────────────────────────────────────────────────────────────── */

function numero(f, clave, porDefecto, { entero = false, minimo = 0 } = {}) {
  if (f[clave] === undefined) return porDefecto;
  const v = Number(String(f[clave]).replace(",", "."));
  if (f[clave] === true || !isFinite(v) || v < minimo || (entero && Math.floor(v) !== v)) {
    throw new Fallo(`--${clave} tiene que ser un ${entero ? "entero" : "número"} ≥ ${minimo}, no «${f[clave]}».`);
  }
  return v;
}

function main() {
  // Los interruptores se sacan ANTES de flags(): le daría por valor lo que venga
  // detrás («--tabla guion.txt» se comería el guion).
  const argv = process.argv.slice(2);
  const f = flags(argv.filter((a) => !INTERRUPTORES.includes(a)));
  if (argv.includes("--help")) {
    console.log(AYUDA);
    return;
  }
  for (const clave of Object.keys(f)) {
    if (clave !== "_" && !CON_VALOR.includes(clave)) throw new Fallo(`opción --${clave} desconocida.\n${USO}`);
    if (clave !== "_" && f[clave] === true) throw new Fallo(`a --${clave} le falta su valor.`);
  }
  const [rutaGuion, rutaJson] = f._;
  if (!rutaGuion || !rutaJson || f._.length > 2) throw new Fallo(USO);
  for (const r of [rutaGuion, rutaJson, f.audio].filter(Boolean)) {
    if (!fs.existsSync(r) || !fs.statSync(r).isFile()) throw new Fallo(`no existe: ${posix(r)}`);
  }

  const o = {
    guion: rutaGuion,
    json: rutaJson,
    fps: numero(f, "fps", 30, { minimo: 1 }),
    en: numero(f, "en", 0, { entero: true }),
    desde: numero(f, "desde", 0),
    hasta: f.hasta !== undefined ? numero(f, "hasta", 0) : null,
    tope: numero(f, "tope", TOPE_SIN_CASAR),
    cola: numero(f, "cola", 9, { entero: true }),
    inicio: numero(f, "inicio", 1, { entero: true }),
    prefijo: f.prefijo !== undefined ? String(f.prefijo) : "b",
    nombre: f.nombre,
  };
  if (o.tope > 100) throw new Fallo(`--tope es un porcentaje, de 0 a 100, no «${f.tope}».`);
  if (o.hasta !== null && o.hasta <= o.desde) throw new Fallo(`--hasta (${seg(o.hasta)}) tiene que ser mayor que --desde (${seg(o.desde)}).`);
  const s0 = f.s0 !== undefined ? numero(f, "s0", 0) : null;
  const salida = f.salida ? path.resolve(f.salida) : null;
  if (salida) {
    // `subtitulos-012.ts` ya dice cómo se llama lo que exporta.
    const porNombre = /^subtitulos-(\d{3})\.ts$/.exec(path.basename(salida));
    if (!o.nombre && porNombre) o.nombre = `subtitulos${porNombre[1]}`;
    if (!o.nombre) throw new Fallo("con --salida hace falta --nombre (el de la constante que exporta: subtitulosNNN).");
    if (!/^[A-Za-z_$][\w$]*$/.test(o.nombre) || RESERVADAS.includes(o.nombre)) {
      throw new Fallo(`--nombre «${o.nombre}» no vale como nombre de constante${RESERVADAS.includes(o.nombre) ? " (es una palabra reservada)" : ""}: subtitulosNNN.`);
    }
    if (fs.existsSync(salida) && !argv.includes("--forzar")) {
      throw new Fallo(`${muestra(salida)} ya existe y puede llevar ajustes a mano: no lo piso. Repite con --forzar o escribe en otra ruta.`);
    }
  }
  // Sin --salida la salida estándar es el plan y nada más: todo lo demás, por la de error.
  const di = salida ? console.log : console.error;

  const textoGuion = leerTexto(rutaGuion);
  // Con los dos argumentos al revés, el JSON se leía como guion y salía un error
  // de marcado por cada línea con llaves, sin la pista que de verdad hace falta.
  if (/^\s*\{/.test(textoGuion) && textoGuion.indexOf('"transcription"') >= 0) {
    throw new Fallo(`${muestra(rutaGuion)} es un JSON de whisper, no un guion. El orden es: guion, después el JSON de palabras.`);
  }
  const guion = leeGuion(textoGuion);
  if (guion.errores.length) {
    throw new Fallo(`el guion ${muestra(rutaGuion)} está mal marcado:\n` + guion.errores.map((e) => `   · ${e}`).join("\n"));
  }
  let json;
  try {
    json = leerJSON(rutaJson);
  } catch (e) {
    throw new Fallo(`${muestra(rutaJson)} no es un JSON (${e.message.split("\n")[0]}). El orden es: guion, después el JSON de palabras.`);
  }
  let { palabras, dtw } = palabrasDeTranscripcion(json);
  if (palabras.length === 0) throw new Fallo(`${muestra(rutaJson)} no trae ninguna palabra.`);

  const notas = [];
  if (!dtw) {
    notas.push(
      "el JSON no trae alineación DTW (`t_dtw`): los tiempos son el reparto de whisper, con errores de hasta ~0,3 s a mitad de frase. " +
        "Repite con `transcribir.mjs … --palabras` y mira qué dice."
    );
  }
  if (f.audio) {
    const tramos = tramosDeVoz(f.audio);
    if (tramos.length === 0) notas.push(`no encuentro voz en ${muestra(f.audio)}: no ancla nada.`);
    else {
      const movidas = anclaALaVoz(palabras, tramos);
      di(`· voz de ${seg(tramos[0][0])} a ${seg(tramos[tramos.length - 1][1])} en ${tantos(tramos.length, "tramo")} · ${tantos(movidas, "palabra anclada", "palabras ancladas")} al arranque de la voz`);
    }
  }
  // Lo que hay detrás de una pausa depende de si whisper puntuó, y no siempre
  // lo hace: la misma locución sale con comas en una pasada y sin ellas en otra.
  // Con --audio no hace falta decirlo aquí: la pausa que la energía no ve tiene
  // su aviso en la línea a la que le toca (`planifica`, por la coma del guion).
  if (!f.audio) {
    notas.push(
      "sin --audio, las líneas que siguen a una pausa no están ancladas a la voz: " +
        (!dtw
          ? "entran donde las pone el reparto de whisper"
          : palabras.some((p) => SIGNO_DE_PAUSA.test(p.oido))
          ? "entran donde el DTW acaba la coma o el punto anterior, que es hasta 5 f pronto o 4 tarde"
          : "whisper no ha puntuado esta transcripción y entran donde acaba la palabra anterior, al principio del silencio (la pausa entera: se han medido 23 f)") +
        ". Pasa --audio con la voz sola."
    );
  }
  if (s0 !== null) {
    for (const p of palabras) {
      if (p.ini < s0) [p.ini, p.origen] = [s0, "s0"];
      if (p.fin < p.ini) p.fin = p.ini;
    }
  }
  // Una palabra no empieza antes que la anterior: el DTW y el ancla pueden cruzarse por una centésima.
  for (let i = 1; i < palabras.length; i++) {
    if (palabras[i].ini < palabras[i - 1].ini) palabras[i].ini = palabras[i - 1].ini;
    if (palabras[i].fin < palabras[i].ini) palabras[i].fin = palabras[i].ini;
  }
  if (o.desde > 0) {
    const antes = palabras.length;
    palabras = palabras.filter((p) => p.fin > o.desde);
    if (palabras.length < antes) di(`· ${tantos(antes - palabras.length, "palabra dicha", "palabras dichas")} antes del segundo ${seg(o.desde)}: no entran en la composición`);
    if (palabras.length === 0) throw new Fallo(`no queda ninguna palabra después del segundo ${seg(o.desde)}.`);
  }
  if (o.hasta !== null) {
    const antes = palabras.length;
    palabras = palabras.filter((p) => p.ini < o.hasta);
    if (palabras.length < antes) di(`· ${tantos(antes - palabras.length, "palabra dicha", "palabras dichas")} después del segundo ${seg(o.hasta)}: no entran en la composición`);
    if (palabras.length === 0) throw new Fallo(`no queda ninguna palabra entre el segundo ${seg(o.desde)} y el ${seg(o.hasta)}.`);
  }

  const plan = planifica(guion.bloques, palabras, { ...o, dtw, audio: Boolean(f.audio) });
  const texto = salida ? escribeModulo(plan.bloques, o) : plan.bloques.map(escribeBloque).join("\n") + "\n";
  if (salida) escribirAtomico(salida, texto);
  else process.stdout.write(texto);

  if (argv.includes("--tabla")) di(tabla(plan.bloques, o));
  if (plan.sinCasar.length) {
    // No es un aviso de tiempos (lo que mueve una línea tiene el suyo): es la lista
    // de lo que el guion PINTA y la voz no dice, o dice de otra manera.
    const porBloque = new Map();
    for (const c of plan.sinCasar) {
      const id = plan.bloques[c.k].id;
      porBloque.set(id, [...(porBloque.get(id) || []), `«${c.p}»`]);
    }
    di(`· del guion y sin pareja en lo oído: ${[...porBloque].map(([id, ps]) => `[${id}] ${ps.join(" ")}`).join(" · ")}`);
  }
  const lineas = plan.bloques.reduce((n, b) => n + b.lineas.length, 0);
  const avisos = [...guion.avisos.map((a) => `[guion] ${a}`), ...notas.map((n) => `[plan] ${n}`), ...plan.avisos];
  for (const a of avisos) di(`⚠️  ${a}`);
  // No es un aviso, porque no hay nada que arreglar: es lo que da de sí la medida.
  if (dtw) {
    di(
      `· precisión: ${f.audio ? "tras una pausa la línea va al arranque de la voz; " : ""}a mitad de frase el tiempo es el del DTW, ` +
        "que suele ir de 1 a 3 f pronto y puede llegar a 5. El plan se mira en el frame."
    );
  }
  di(
    `${avisos.length ? "·" : "✅"} ${tantos(plan.bloques.length, "bloque")} (${plan.bloques[0].id}-${plan.bloques[plan.bloques.length - 1].id}), ${tantos(lineas, "línea")} · ` +
      `frames ${plan.bloques[0].lineas[0].frame}-${plan.bloques[plan.bloques.length - 1].hasta} a ${o.fps} fps · ` +
      `${plan.total - plan.sinCasar.length}/${plan.total} palabras del guion casadas` +
      (avisos.length ? ` · ${tantos(avisos.length, "aviso")}` : "") +
      (salida ? ` → ${muestra(salida)}` : "")
  );
}

if (esMain(import.meta.url)) {
  try {
    main();
  } catch (e) {
    if (!(e instanceof Fallo)) throw e;
    console.error(`❌ ${e.message}`);
    process.exit(1);
  }
}
