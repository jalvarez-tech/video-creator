#!/usr/bin/env node
/**
 * revisar-audio.mjs — la PUERTA del audio por tramos (voz y música): pasa el
 * validador del motor sobre un plan y mide en disco lo que el validador no
 * puede saber, sin abrir el Studio ni renderizar nada.
 *
 * Uso (desde la raíz del repo):
 *   node manuales/diseno-sonoro/scripts/revisar-audio.mjs remotion/src/proyectos/NNN/audio-NNN.ts
 *   node manuales/diseno-sonoro/scripts/revisar-audio.mjs remotion/src/proyectos/NNN/audio-NNN.ts --fps 30 --duracion 1563
 *
 *   --fps N        el fps de la composición (defecto 30)
 *   --duracion N   sus frames: con ella se comprueba además que ningún tramo acabe fuera
 *
 * QUÉ REVISA. Todos los exports del plan que sean un `TramoAudio[]` (los tramos
 * que recibe `<PistaAudio>`), cada uno con su nombre:
 *
 *   forma   `revisaAudio()` de `remotion/src/motor/sound/tramos.ts`: frames
 *           enteros, arranque dentro de la fuente, fin dentro de la comp,
 *           fundidos que caben, ganancia entre 0 y +6 dB, envolvente con frames
 *           crecientes, ids únicos, `reason`. Es la función del motor, no una
 *           copia: esta puerta no lleva sus propias cuentas.
 *   plan    que ningún id se repita entre DOS listas del archivo: el plan puede
 *           exportar `voces` y `musica` por separado y juntarlas en la
 *           composición, y ahí sus keys chocan.
 *   disco   que cada `src` exista en `remotion/public/` y que el tramo que se le
 *           pide (desde + dur) quepa en lo que el archivo DURA de verdad
 *           (ffprobe). Los de `bucle` no: repetirse es su trabajo.
 *
 * Una lista se toma por tramos con que UNO de sus elementos lo parezca (las
 * claves `src`, `en` y `dur`, sin `zoom`), y lo que dentro de ella esté roto lo
 * dice el validador. Toda otra lista de objetos que el plan exporte se NOMBRA
 * como no revisada, con el motivo: el verde dice siempre qué ha cubierto.
 *
 * POR QUÉ EXISTE. Nada de esto se ve en un fotograma de prueba. Si un tramo
 * pide más archivo del que hay, Remotion no falla: rellena con silencio, y una
 * voz que se corta medio segundo antes se descubre con el vídeo ya publicado.
 * Si el archivo no está, un `still` sale bien igualmente y es el render el que
 * se para con un 404, minutos después y a mitad. Las dos cosas se saben aquí
 * en un segundo. (Comprobado renderizando los dos casos.)
 *
 * LO QUE NO MIRA, y es de la puerta de cada pieza: que dos voces no suenen a la
 * vez, que ninguna palabra caiga dentro de un fundido, que la música quede por
 * debajo de la voz. Un tramo no dice si es voz o música, y aquí no se adivina.
 *
 * El plan tiene que EXPORTAR sus tramos como dato (`export const audioNNN =
 * [...vocesDeCortes(metrajeNNN, { fps: 30 }), ...]`): lo que se construye dentro
 * de una composición no se puede cargar sin React. Se transpila con el esbuild
 * que Remotion ya trae (el patrón de `revisar-plan.mjs`), así que un
 * `vocesDeCortes(...)` o un `envolventeBajoVoz(...)` valen lo que valen en el
 * render.
 *
 * SALE CON 1 SI HAY AVISOS, para que sirva de puerta y no de informe.
 */
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { RAIZ, binario, borrar, carpetaTemporal, ejecutar, flags, relativa } from "../../../herramientas/comun.mjs";

const USO =
  "uso: node manuales/diseno-sonoro/scripts/revisar-audio.mjs <ruta/al/plan.ts> [--fps 30] [--duracion N]";

/** Segundos que un tramo puede pasarse del final de su archivo sin contarlo: redondeos del contenedor, no audio que falte. */
const TOLERANCIA = 0.001;

const remotionDir = path.join(RAIZ, "remotion");
const PUBLICO = path.join(remotionDir, "public");

const f = flags();
// `"help" in f` y no `f.help === true`: en `--help plan.ts`, `flags()` se lleva
// la ruta como valor de --help, y pedir ayuda acababa en error.
const pideAyuda = "help" in f || f._.includes("-h");
const rel = f._[0];
if (!rel || pideAyuda) {
  console.error(USO);
  process.exit(pideAyuda ? 0 : 1);
}

// Un número mal escrito daría FALSO VERDE: toda comparación con NaN es false y
// las cuentas de duración se saltarían en silencio (lo mismo que cuenta
// `revisar-plan.mjs` de su fps).
const fps = Number(f.fps ?? 30);
if (f.fps === true || !Number.isFinite(fps) || fps <= 0) {
  console.error(`✖ --fps inválido: «${f.fps}». Tiene que ser un número > 0 (p. ej. 30).`);
  process.exit(1);
}
const duracion = f.duracion === undefined ? undefined : Number(f.duracion);
if (f.duracion !== undefined && (f.duracion === true || !Number.isInteger(duracion) || duracion <= 0)) {
  console.error(`✖ --duracion inválida: «${f.duracion}». Son los frames de la composición: un entero > 0.`);
  process.exit(1);
}

// La ruta, como la escriba quien llama: absoluta, relativa a donde está, a la
// raíz del repo o a remotion/ (la forma histórica de los otros validadores).
const candidatas = path.isAbsolute(rel)
  ? [rel]
  : [...new Set([path.resolve(process.cwd(), rel), path.join(RAIZ, rel), path.join(remotionDir, rel)])];
const planTs = candidatas.find((c) => fs.existsSync(c));
if (!planTs) {
  console.error(`✖ No existe el plan: ${rel}`);
  console.error("   Probé:");
  for (const c of candidatas) console.error(`     · ${c}`);
  process.exit(1);
}

// Cómo se nombra el plan en los mensajes: relativo a la raíz, salvo que esté fuera del repo.
const nombrePlan = relativa(planTs).startsWith("..") ? planTs : relativa(planTs);

const require = createRequire(path.join(remotionDir, "package.json"));
const esbuild = require("esbuild");

// Punto de entrada sintético: el plan y el validador en el mismo bundle, para
// que el plan no tenga que importar nada que no use.
const tmp = carpetaTemporal("audio-");
let mod;
let noCarga;
try {
  const entrada = path.join(tmp, "entrada.ts");
  const salida = path.join(tmp, "salida.cjs");
  fs.writeFileSync(
    entrada,
    `export * as plan from ${JSON.stringify(planTs)};\n` +
      `export { revisaAudio } from ${JSON.stringify(path.join(remotionDir, "src", "motor", "sound", "tramos.ts"))};\n`
  );
  // `silent`: si el plan no compila, el error se imprime UNA vez, abajo, y no dos.
  await esbuild.build({ entryPoints: [entrada], bundle: true, platform: "node", format: "cjs", outfile: salida, logLevel: "silent" });
  mod = require(salida);
} catch (e) {
  // Aquí cae también lo que el plan lanza al evaluarse: `vocesDeCortes` se niega
  // a montar la voz de un corte con `velocidad` distinta de 1, y lo dice con su id.
  noCarga = e;
} finally {
  // `borrar` reintenta: en Windows el antivirus retiene un instante el .cjs recién creado.
  borrar(tmp);
}
if (noCarga) {
  console.error(`✖ ${nombrePlan} no se puede cargar:`);
  console.error(`   ${String(noCarga.message || noCarga).split("\n").join("\n   ")}`);
  process.exit(1);
}

const esObjeto = (x) => x !== null && typeof x === "object" && !Array.isArray(x);

/**
 * Un `TramoAudio` se reconoce por su forma: las CLAVES `src` + `en` + `dur`. Un
 * `Corte` del montaje también las lleva —y su `metraje-NNN.ts` puede ser este
 * mismo plan—, así que se distingue por el campo que un corte tiene SIEMPRE y
 * un tramo nunca: `zoom`. Sin eso la puerta mediría los MP4 de la imagen como
 * si fueran la voz.
 *
 * Las claves, no sus valores: decidir qué es un tramo mirando si su `src` es un
 * texto sería usar de filtro justo el campo que hay que validar. Una ruta
 * sacada de un mapa por una clave que no existe es `undefined` al ejecutar
 * (y `string` para `tsc`): ese tramo SIGUE siendo un tramo, y el que dice «sin
 * `src`» es el validador.
 */
const pareceTramo = (x) => esObjeto(x) && "src" in x && "en" in x && "dur" in x && !("zoom" in x);

// Una lista es de tramos con que UNO lo parezca, no solo si lo parecen todos:
// con `every`, un único elemento roto (un `null` de un condicional, un objeto a
// medio escribir) hacía que la lista entera dejara de «parecer tramos» y se
// descartara EN SILENCIO; si el plan exportaba además otra lista sana, la
// puerta daba verde sin haber mirado la rota. Lo que no sea un tramo dentro de
// una lista de tramos lo dice `revisaAudio` con su posición.
// Un tramo exportado suelto (`export const musica: TramoAudio = {…}`) se revisa
// como una lista de uno: llegará a `<PistaAudio>` dentro de algún `[...]`.
const listas = [];
const sinRevisar = [];
for (const [nombre, v] of Object.entries(mod.plan)) {
  if (pareceTramo(v)) listas.push([nombre, [v]]);
  else if (Array.isArray(v) && v.some(pareceTramo)) listas.push([nombre, v]);
  else if (Array.isArray(v) && v.some(esObjeto)) {
    // Ningún descarte es mudo: lo que es una lista de objetos y no se toma por
    // tramos se nombra, con el motivo, para que quien lee sepa qué NO cubre el verde.
    const objetos = v.filter(esObjeto);
    const motivo = objetos.every((x) => "zoom" in x)
      ? "son cortes del montaje (llevan `zoom`); su voz se revisa en la lista que sale de `vocesDeCortes`"
      : `no parecen tramos (falta ${["src", "en", "dur"].filter((k) => !objetos.some((x) => k in x)).map((k) => `\`${k}\``).join(", ") || "`src`, `en` o `dur` en todos sus elementos"})`;
    sinRevisar.push(`${nombre} · ${v.length} elemento${v.length === 1 ? "" : "s"} · NO se revisa: ${motivo}`);
  } else if (esObjeto(v)) {
    // Tramos agrupados en un objeto (`export const partes = { off: [...] }`):
    // también llegan a `<PistaAudio>`, así que también se revisan.
    for (const [clave, w] of Object.entries(v)) {
      if (pareceTramo(w)) listas.push([`${nombre}.${clave}`, [w]]);
      else if (Array.isArray(w) && w.some(pareceTramo)) listas.push([`${nombre}.${clave}`, w]);
    }
  }
}

if (listas.length === 0) {
  console.error(`✖ ${nombrePlan} no exporta ningún TramoAudio[] (una lista de objetos con src, en y dur).`);
  console.error(`   Exporta: ${Object.keys(mod.plan).join(", ") || "nada"}.`);
  for (const s of sinRevisar) console.error(`     ·  ${s}`);
  console.error("   Los tramos tienen que ser un export de datos, no algo que se construye dentro de la composición:");
  console.error("     export const audioNNN = [...vocesDeCortes(metrajeNNN, { fps: 30 }), ...musicaNNN];");
  process.exit(1);
}

// ffprobe: primero el de la carpeta de herramientas del usuario (setup.mjs), después el PATH.
const hayFfprobe = binario("ffprobe") !== null;

const duraciones = new Map();
/** Segundos de la primera pista de AUDIO de un archivo de `public/`, o el motivo por el que no se pudo medir. */
function duracionDe(src) {
  if (!duraciones.has(src)) {
    const r = ejecutar("ffprobe", [
      "-v", "error", "-select_streams", "a:0", "-show_entries", "stream=duration:format=duration", "-of", "json", path.join(PUBLICO, src),
    ]);
    let dato;
    if (r.status !== 0) dato = { motivo: `ffprobe no puede leerlo (${(r.stderr || "").trim().split("\n")[0] || `código ${r.status}`})` };
    else {
      const { streams = [], format = {} } = JSON.parse(r.stdout);
      // Hay contenedores que no dan la duración por pista («N/A»): vale la del archivo.
      const porPista = Number(streams[0]?.duration);
      const segundos = Number.isFinite(porPista) ? porPista : Number(format.duration);
      if (streams.length === 0) dato = { motivo: "no tiene pista de audio" };
      else if (!Number.isFinite(segundos)) dato = { motivo: "ffprobe no da su duración" };
      else dato = { segundos };
    }
    duraciones.set(src, dato);
  }
  return duraciones.get(src);
}

/** Lo que solo se sabe mirando el disco. Avisos con el mismo formato `[id] …` que los del motor. */
function revisaDisco(tramos) {
  const avisos = [];
  tramos.forEach((t, i) => {
    // Lo que no es un tramo o no trae un `src` que abrir ya lo dijo `revisaAudio`.
    if (!esObjeto(t) || typeof t.src !== "string" || t.src === "") return;
    const dice = (m) => avisos.push(`[${typeof t.id === "string" && t.id !== "" ? t.id : `#${i}`}] ${m}`);
    if (!fs.existsSync(path.join(PUBLICO, t.src))) {
      return dice(`no existe remotion/public/${t.src}: el render se para con un 404 al llegar a él`);
    }
    if (!hayFfprobe) return;
    const d = duracionDe(t.src);
    if (d.motivo) return dice(`remotion/public/${t.src}: ${d.motivo}`);
    // El arranque, como lo calcula el intérprete: `Math.round(desde · fps)` frames.
    const arranque = Math.round((t.desde ?? 0) * fps) / fps;
    if (!Number.isFinite(arranque) || !Number.isFinite(t.dur)) return; // ya lo dijo `revisaAudio`
    if (t.bucle) {
      // Un bucle puede durar lo que quiera; lo que no puede es arrancar donde ya no queda archivo.
      if (arranque >= d.segundos) dice(`arranca en el ${arranque.toFixed(2)} s de ${t.src}, que dura ${d.segundos.toFixed(2)} s: no queda nada que repetir`);
      return;
    }
    const fin = arranque + t.dur / fps;
    if (fin > d.segundos + TOLERANCIA) {
      const faltan = Math.ceil((fin - d.segundos) * fps - 1e-6);
      dice(
        `lee hasta el ${fin.toFixed(2)} s de ${t.src}, que dura ${d.segundos.toFixed(2)} s: sus últimos ${faltan} f salen en silencio (acorta el tramo o márcalo \`bucle\`)`
      );
    }
  });
  return avisos;
}

console.log(`\n${nombrePlan}`);
console.log(
  `   ${fps} fps · ${duracion === undefined ? "sin --duracion: no se comprueba que los tramos acaben dentro de la composición" : `composición de ${duracion} f (${(duracion / fps).toFixed(2)} s)`}\n`
);

// De mayor a menor: un plan suele exportar sus partes Y la suma (`voces`,
// `musica`, `audio = [...voces, ...musica]`). Revisar las tres repetiría cada
// aviso y el recuento dejaría de decir cuántos problemas hay; una lista cuyos
// tramos ya se han revisado TODOS dentro de otra solo se nombra.
listas.sort((a, b) => b[1].length - a[1].length);
const revisados = new Map();

// Los ids, en TODO el plan y no solo dentro de cada lista. El plan puede
// exportar `voces` y `musica` por separado y juntarlas en la composición
// (`<PistaAudio tramos={[...voces, ...musica]} />`): dos tramos con el mismo id
// en listas distintas pasan cada uno su revisión y acaban como dos `<Sequence>`
// con la misma key. Esta puerta no ve la composición, así que no sabe qué
// listas se juntan: pide ids únicos en el archivo entero. El MISMO objeto en
// dos listas (la parte y la suma) no es una repetición.
const duenos = new Map();
function revisaIdsDelPlan(nombre, tramos) {
  const avisos = [];
  for (const t of tramos) {
    if (!esObjeto(t) || typeof t.id !== "string" || t.id === "") continue;
    const d = duenos.get(t.id);
    if (d === undefined) duenos.set(t.id, { tramo: t, lista: nombre });
    // En la misma lista ya lo dice `revisaAudio`.
    else if (d.tramo !== t && d.lista !== nombre) {
      avisos.push(`[${t.id}] id repetido en el plan: lo lleva otro tramo en «${d.lista}». Juntos en un <PistaAudio> comparten la key de su <Sequence>; los ids tienen que ser únicos en todo el archivo`);
    }
  }
  return avisos;
}

let total = 0;
for (const [nombre, tramos] of listas) {
  const dentroDe = revisados.get(tramos[0]);
  if (dentroDe !== undefined && tramos.every((t) => revisados.get(t) === dentroDe)) {
    console.log(`   ·  ${nombre} · ${tramos.length} tramo${tramos.length === 1 ? "" : "s"} · ya revisado${tramos.length === 1 ? "" : "s"} dentro de «${dentroDe}»`);
    continue;
  }
  for (const t of tramos) if (!revisados.has(t)) revisados.set(t, nombre);
  const avisos = [...mod.revisaAudio(tramos, { fps, duracion }), ...revisaIdsDelPlan(nombre, tramos), ...revisaDisco(tramos)];
  total += avisos.length;
  // El rango, solo con los tramos que tienen frames: uno roto no puede dejar la cabecera en NaN.
  const conFrames = tramos.filter((t) => esObjeto(t) && Number.isFinite(t.en) && Number.isFinite(t.dur));
  const rango = conFrames.length > 0 ? ` · f${Math.min(...conFrames.map((t) => t.en))}–f${Math.max(...conFrames.map((t) => t.en + t.dur))}` : "";
  const cabecera = `${nombre} · ${tramos.length} tramo${tramos.length === 1 ? "" : "s"}${rango}`;
  if (avisos.length === 0) {
    console.log(`   ✅ ${cabecera}`);
    continue;
  }
  console.log(`   ⚠️  ${cabecera} — ${avisos.length} aviso(s):`);
  for (const a of avisos) console.log(`      · ${a}`);
}
for (const s of sinRevisar) console.log(`   ·  ${s}`);

if (!hayFfprobe) {
  // Una puerta que no puede medir no da verde: sin la duración real de cada
  // archivo, «cabe» sería una suposición.
  console.log("\n✖ no encuentro ffprobe: no he podido medir si cada tramo cabe en su archivo.");
  console.log("   node herramientas/setup.mjs\n");
  process.exit(1);
}
if (total === 0) {
  console.log("\n✅ Audio limpio: forma (frames, fundidos, ganancia, envolvente, ids, reason) y disco (archivos y duración real).");
  if (sinRevisar.length > 0) {
    console.log(`   Lo limpio es lo revisado: arriba hay ${sinRevisar.length} lista${sinRevisar.length === 1 ? "" : "s"} del plan que NO se ha${sinRevisar.length === 1 ? "" : "n"} tomado por tramos.`);
  }
  console.log("");
  process.exit(0);
}
console.log(`\n⚠️  ${total} aviso(s).\n`);
process.exit(1);
