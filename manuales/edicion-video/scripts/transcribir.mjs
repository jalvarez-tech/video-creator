#!/usr/bin/env node
/**
 * transcribir.mjs — transcribe un vídeo/audio a JSON con tiempos usando whisper.cpp.
 *
 * Uso:
 *   node manuales/edicion-video/scripts/transcribir.mjs <entrada> [salida.json] [idioma] [modelo.bin] [--palabras]
 * Ejemplo:
 *   node manuales/edicion-video/scripts/transcribir.mjs proyectos/001/original.mp4 proyectos/001/transcripcion.json es
 *   node manuales/edicion-video/scripts/transcribir.mjs proyectos/001/voz/vo.wav proyectos/001/voz/palabras.json es --palabras
 *
 * Requisitos: `whisper-cli` (lo instala `node herramientas/setup.mjs --whisper`)
 * y el modelo en archivos/whisper/ggml-small.bin (mismo instalador).
 *
 * QUÉ TRAE EL JSON. Es el de whisper-cli tal cual, sin formato propio:
 *
 *   · Sin `--palabras` (`-oj`): `transcription[]` con una entrada por FRASE:
 *     `text` y `offsets.from/to` en milisegundos. Es lo que leen los subtítulos
 *     de frase y el corte de silencios.
 *
 *   · Con `--palabras` (`-ojf -ml 1 -sow` y, si se puede, `-dtw`):
 *     `transcription[]` con una entrada por PALABRA (`text` lleva el espacio de
 *     delante y la puntuación pegada: « Medellín,»; hay entradas vacías al
 *     empezar cada ventana de 30 s) y, dentro de cada una, `tokens[]` con los
 *     trozos BPE: `text`, `offsets`, `p` (probabilidad) y `t_dtw`. Es lo que lee
 *     `trozos-editoriales.mjs` para saber en qué frame entra cada trozo.
 *
 * DE DÓNDE SALE EL TIEMPO DE UNA PALABRA, que el JSON trae dos y no valen lo
 * mismo (medido sobre una locución de 40 s contra su envolvente, banda a banda):
 *
 *   · `offsets` es un REPARTO: whisper solo sabe dónde empieza y acaba la frase,
 *     y el resto lo prorratea. La primera palabra de cada frase queda clavada al
 *     final de la anterior (dentro del silencio) y las últimas se van hasta
 *     0,35 s tarde (10 frames a 30 fps). Sirve para una frase, no para un trozo.
 *   · `t_dtw` (centésimas de segundo) es la ALINEACIÓN de verdad, sacada de la
 *     atención del modelo. OJO con lo que marca: el instante en que el token
 *     ACABA, no en el que empieza (whisper.cpp 1.9.1). Una palabra empieza
 *     donde acaba el token anterior, y el DTW lo da por acabado un poco antes de
 *     que deje de sonar: a mitad de frase el inicio sale de 1 a 3 frames pronto,
 *     y se han medido 5. Vale -1 si no hubo DTW.
 *
 * Por eso `--palabras` pide DTW siempre que puede. Hacen falta dos cosas: que el
 * modelo sea uno de los que whisper.cpp tiene medidos (se deduce del nombre del
 * archivo: ggml-small.bin → `small`) y apagar la «flash attention» (`-nfa`), que
 * en las versiones nuevas viene encendida y anula el DTW SIN AVISAR (el JSON
 * sale igual, con todos los `t_dtw` a -1). Si no se puede, el script lo dice y
 * deja el JSON con los tiempos de reparto.
 *
 * Lo que NINGUNO de los dos ve es el silencio. Tras una pausa, la palabra
 * siguiente «empieza» donde acaba el token anterior: si whisper escribió una
 * coma o un punto, en algún sitio de la pausa (hasta 5 frames antes de que
 * suene); si no puntuó —y la misma locución sale con comas en una pasada y sin
 * ellas en otra—, al principio del silencio: la pausa entera, y se han medido
 * 23 frames. Eso se mide por energía (`limites-voz.py`, o
 * `trozos-editoriales.mjs --audio`).
 *
 * Sustituye a transcribir.sh con dos arreglos que el .sh no tenía:
 *   · Crea la carpeta de salida antes de llamar a whisper-cli. Si no existía,
 *     whisper-cli no escribía nada PERO salía con 0, y el .sh daba por hecha
 *     la transcripción.
 *   · Comprueba que el JSON existe antes de darla por lista y, si un hijo falla,
 *     enseña su stderr en vez de morir en silencio con su código.
 *
 * El idioma se pasa a `-l` de whisper («auto» también vale). No se toca LANG:
 * es la variable de locale de la shell y pisarla afecta a todo lo que herede el
 * entorno.
 */
import fs from "node:fs";
import path from "node:path";
import {
  ES_WINDOWS,
  RAIZ,
  binario,
  borrar,
  carpetaTemporal,
  dirBinUsuario,
  ejecutar,
  esMain,
  flags,
  posix,
} from "../../../herramientas/comun.mjs";

const USO = "Uso: node manuales/edicion-video/scripts/transcribir.mjs <entrada> [salida.json] [idioma] [modelo.bin] [--palabras]";

/**
 * Los modelos para los que whisper.cpp trae medidas las cabezas de atención que
 * alinean (lo que acepta `-dtw`). Con otro nombre no hay DTW: pasarle el preset
 * de un modelo distinto alinea con las cabezas equivocadas y da tiempos que
 * parecen buenos y no lo son.
 */
const PRESETS_DTW = [
  "tiny", "tiny.en", "base", "base.en", "small", "small.en", "medium", "medium.en",
  "large.v1", "large.v2", "large.v3", "large.v3.turbo",
];

/** `ggml-small.bin` → `small` · `ggml-large-v3-turbo-q5_0.bin` → `large.v3.turbo` · otro nombre → null. */
export function presetDtw(modelo) {
  const nombre = path
    .basename(modelo)
    .toLowerCase()
    .replace(/^ggml-/, "")
    .replace(/\.bin$/, "")
    .replace(/-q\d+(_\d+)?$/, "") // las variantes cuantizadas comparten cabezas con su modelo
    .replace(/^large-(v\d)/, "large.$1")
    .replace(/-turbo$/, ".turbo");
  return PRESETS_DTW.includes(nombre) ? nombre : null;
}

/**
 * Argumentos de whisper-cli para `--palabras`, y si llevan DTW.
 *
 * Se le pregunta al propio binario qué entiende (su `--help`) en vez de fiarse
 * de la versión: macOS lleva el whisper-cli de Homebrew y Windows el zip que
 * fija setup.mjs, que no tienen por qué ser el mismo, y `-nfa` no existe en los
 * anteriores a la flash attention. Pasarlo a ciegas no se puede: whisper-cli,
 * ante un argumento que no conoce, imprime la ayuda y sale con 0 sin transcribir.
 */
function argumentosPalabras(whisper, modelo) {
  // -ml 1 -sow: corta cada segmento en palabras enteras (sin -sow corta por token: «hog» | «ar»).
  const args = ["-ojf", "-ml", "1", "-sow"];
  const ayuda = ejecutar(whisper, ["--help"]);
  const entiende = (opcion) => new RegExp(`(^|[\\s,])${opcion}([\\s,]|$)`, "m").test(ayuda.stdout + ayuda.stderr);
  const preset = presetDtw(modelo);
  if (!entiende("--dtw")) return { args, dtw: false, motivo: "este whisper-cli no tiene --dtw" };
  if (!preset) return { args, dtw: false, motivo: `whisper.cpp no tiene medido el modelo ${path.basename(modelo)}` };
  args.push("-dtw", preset);
  // Con flash attention el DTW se desactiva en silencio; donde no existe -nfa, tampoco existe el problema.
  if (entiende("-nfa")) args.push("-nfa");
  return { args, dtw: true };
}

/** Dónde conseguir whisper-cli en esta plataforma. */
function pistaWhisper() {
  const carpeta = posix(dirBinUsuario());
  const origen = ES_WINDOWS
    ? "el zip de releases de whisper.cpp (whisper-cli.exe)"
    : "el paquete whisper-cpp de tu gestor de paquetes";
  return `Instálalo con: node herramientas/setup.mjs --whisper\n   (o deja ${origen} en ${carpeta})`;
}

/** ¿Archivo regular? Un directorio o una ruta rota no valen como entrada. */
function esArchivo(p) {
  try {
    return fs.statSync(p).isFile();
  } catch {
    return false;
  }
}

function main() {
  // `--palabras` se saca ANTES de flags(): es un interruptor, y flags() le daría
  // por valor lo que venga detrás («--palabras voz.wav» se comería la entrada).
  const argv = process.argv.slice(2);
  const palabras = argv.includes("--palabras");
  const args = flags(argv.filter((a) => a !== "--palabras"));
  if (args.help) {
    console.log(
      `${USO}\n\n` +
        "  salida.json  por defecto transcripcion.json (relativo a donde estés)\n" +
        "  idioma       por defecto es («auto» deja que whisper lo detecte)\n" +
        "  modelo.bin   por defecto archivos/whisper/ggml-small.bin\n" +
        "  --palabras   tiempos por PALABRA en vez de por frase (para trozos-editoriales.mjs)\n\n" +
        "El JSON es el de whisper-cli, tal cual:\n" +
        "  sin --palabras  transcription[] = una entrada por frase: text + offsets.from/to (ms)\n" +
        "  con --palabras  transcription[] = una entrada por palabra, con sus tokens[] dentro:\n" +
        "                  offsets (ms) es un reparto de whisper, fiable a ~0,3 s;\n" +
        "                  t_dtw (centésimas de s) es la alineación real y marca dónde ACABA el token\n" +
        "                  (una palabra empieza donde acaba el token anterior); -1 si no hubo DTW"
    );
    return;
  }
  const [entrada, salida = "transcripcion.json", idioma = "es", modeloArg] = args._;
  if (!entrada) {
    console.error(USO);
    process.exit(1);
  }
  const modelo = modeloArg ? path.resolve(modeloArg) : path.join(RAIZ, "archivos", "whisper", "ggml-small.bin");

  // Mismo orden de comprobaciones que el .sh, y a stdout como él.
  const whisper = binario("whisper-cli");
  if (!whisper) {
    console.log(`❌ whisper-cli no está. ${pistaWhisper()}`);
    process.exit(1);
  }
  if (!binario("ffmpeg")) {
    console.log("❌ ffmpeg no está. Instálalo con: node herramientas/setup.mjs");
    process.exit(1);
  }
  if (!esArchivo(entrada)) {
    console.log(`❌ No existe la entrada: ${posix(entrada)}`);
    process.exit(1);
  }
  if (!esArchivo(modelo)) {
    console.log(`❌ No existe el modelo: ${posix(modelo)}\n   Descárgalo con: node herramientas/setup.mjs --whisper`);
    process.exit(1);
  }

  // whisper-cli añade «.json» él mismo: se le pasa la ruta SIN ese sufijo.
  // Solo se quita el sufijo exacto en minúsculas, como hacía `${OUT%.json}`.
  const sinSufijo = salida.endsWith(".json") ? salida.slice(0, -".json".length) : salida;
  const base = path.resolve(sinSufijo);
  const json = `${base}.json`;

  const tmp = carpetaTemporal("transcribir-");
  const wav = path.join(tmp, "audio.wav");
  try {
    console.log("🎧 Preparando audio 16 kHz mono…");
    const a = ejecutar("ffmpeg", ["-nostdin", "-v", "error", "-y", "-i", entrada, "-ar", "16000", "-ac", "1", "-c:a", "pcm_s16le", wav]);
    if (a.status !== 0) {
      console.error(`❌ ffmpeg no pudo extraer el audio de ${posix(entrada)} (código ${a.status})\n${a.stderr.trim()}`);
      process.exit(a.status || 1);
    }

    // La carpeta de salida se crea AQUÍ: whisper-cli no la crea y no avisa.
    fs.mkdirSync(path.dirname(base), { recursive: true });

    // -oj = JSON con segmentos y tiempos: lo de siempre. Con --palabras, -ojf y lo demás (ver cabecera).
    const modo = palabras ? argumentosPalabras(whisper, modelo) : { args: ["-oj"] };
    console.log(`📝 Transcribiendo (${idioma}) con ${path.basename(modelo)}${palabras ? ", por palabra" : ""}…`);
    const w = ejecutar(whisper, ["-m", modelo, "-f", wav, "-l", idioma, ...modo.args, "-of", base]);
    if (w.status !== 0) {
      console.error(`❌ whisper-cli falló (código ${w.status})\n${(w.stderr || w.stdout).trim().slice(-2000)}`);
      process.exit(w.status || 1);
    }
    if (!esArchivo(json)) {
      console.error(`❌ whisper-cli terminó sin escribir ${posix(json)}\n${(w.stderr || w.stdout).trim().slice(-2000)}`);
      process.exit(1);
    }
    if (palabras) resumenPalabras(json, modo);
  } finally {
    borrar(tmp);
  }

  console.log(`✅ Transcripción lista: ${posix(sinSufijo)}.json`);
}

/**
 * Cuenta lo que ha salido y dice si los tiempos son los buenos. Se mira el JSON
 * y no lo que se pidió: el DTW puede no haber corrido aunque se pidiera (un
 * whisper-cli que lo anula por su cuenta), y eso no da error ni cambia la forma
 * del archivo: solo deja todos los `t_dtw` a -1.
 */
function resumenPalabras(json, modo) {
  let entradas;
  try {
    entradas = JSON.parse(fs.readFileSync(json, "utf8")).transcription;
  } catch (e) {
    console.error(`❌ whisper-cli escribió un JSON que no se puede leer: ${posix(json)} (${e.message})`);
    process.exit(1);
  }
  const conTexto = (entradas || []).filter((e) => e.text && e.text.trim());
  const alineadas = conTexto.filter((e) => (e.tokens || []).some((t) => t.t_dtw >= 0));
  console.log(`   ${conTexto.length} palabras · ${alineadas.length} con alineación DTW`);
  if (alineadas.length === 0) {
    const motivo = modo.dtw ? "whisper-cli lo ha desactivado (mira su salida con el mismo audio)" : modo.motivo;
    console.log(`⚠️  Sin DTW: ${motivo}.\n   Los tiempos por palabra son el reparto de whisper (\`offsets\`), con errores de hasta ~0,3 s a mitad de frase.`);
  }
}

if (esMain(import.meta.url)) main();
