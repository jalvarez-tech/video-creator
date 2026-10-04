#!/usr/bin/env node
/**
 * revisar-subtitulos.mjs — pasa el validador de los subtítulos editoriales
 * sobre un plan, sin abrir el Studio ni renderizar nada.
 *
 * Uso (desde la raíz del repo):
 *   node manuales/edicion-video/scripts/revisar-subtitulos.mjs                                            # el plan de demo
 *   node manuales/edicion-video/scripts/revisar-subtitulos.mjs remotion/src/proyectos/NNN/subtitulos-NNN.ts
 *   node manuales/edicion-video/scripts/revisar-subtitulos.mjs <plan.ts> --fps 30 --ancho 1080 --alto 1920 --duracion 1500
 *   node manuales/edicion-video/scripts/revisar-subtitulos.mjs <plan.ts> --marca remotion/src/marcas/ejemplo.ts
 *   node manuales/edicion-video/scripts/revisar-subtitulos.mjs <plan.ts> --tabla      # además, enseña cada bloque resuelto
 *
 * Por qué existe: el validador vive en el motor (`revisaSubtitulosEditoriales`,
 * en `remotion/src/motor/subtitulos-editoriales.ts`) y el intérprete lo imprime
 * al renderizar, pero se necesita ANTES, en el momento de escribir el plan. Un
 * trozo que entra 8 frames antes de que salga el bloque no se ve en un still:
 * se ve en la prueba, después de un render entero.
 *
 * QUÉ MIRA: la línea de tiempo (frames enteros, líneas en orden, bloques que no
 * se pisan, el mínimo en pantalla, el frame 0), los estilos (un acento por
 * bloque, los acentos separados, el dato solo y al centro, las palabras por
 * línea, marcas del guion que se quedaron dentro) y la geometría (la línea que
 * no cabe y se encoge de más, el bloque que pasa del suelo del 88 %).
 *
 * QUÉ NO MIRA, porque no está en el plan: si el trozo cae sobre su palabra (eso
 * lo comprueba la puerta del proyecto contra la voz medida), si el texto tapa
 * una cara y si se lee sobre el plano que tiene debajo. Eso se juzga en el
 * frame renderizado.
 *
 * `--marca` hace que se mida con las letras de ESE canal (`marca.texto.letra`),
 * que es con las que se va a pintar. Sin él se usan las del motor.
 *
 * SALE CON 1 SI HAY AVISOS, para que sirva de puerta y no de informe.
 *
 * Cómo lee TypeScript sin dependencias nuevas: transpila con el esbuild que
 * Remotion ya trae (mismo truco que revisar-plan.mjs). El plan y el validador
 * son datos puros, así que el bundle no arrastra React.
 */
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { RAIZ, borrar, carpetaTemporal, flags, posix, relativa } from "../../../herramientas/comun.mjs";

const remotionDir = path.join(RAIZ, "remotion");
const f = flags();

// Una opción mal escrita se perdía en silencio y la comprobación que pedía no
// se hacía; `--marca` sin ruta medía con las letras del motor sin decirlo.
const OPCIONES = ["_", "fps", "ancho", "alto", "duracion", "marca", "tabla"];
const raras = Object.keys(f).filter((k) => !OPCIONES.includes(k));
if (raras.length) {
  console.error(`✖ Opción desconocida: ${raras.map((k) => `--${k}`).join(", ")}. Valen --fps, --ancho, --alto, --duracion, --marca y --tabla.`);
  process.exit(1);
}
if (f.marca === true) {
  console.error("✖ --marca necesita la ruta del archivo de la marca (p. ej. remotion/src/marcas/ejemplo.ts).");
  process.exit(1);
}

/** Una ruta para ENSEÑAR: relativa a la raíz si cae dentro, absoluta con «/» si no. */
const muestra = (p) => {
  const r = relativa(p);
  return r.startsWith("..") ? posix(path.resolve(p)) : r;
};

/** Acepta la ruta tal cual, bajo la raíz o bajo remotion/ (como revisar-plan.mjs). */
const resuelve = (rel) => {
  const candidatas = path.isAbsolute(rel)
    ? [rel]
    : [...new Set([path.resolve(process.cwd(), rel), path.join(RAIZ, rel), path.join(remotionDir, rel)])];
  const hallada = candidatas.find((c) => fs.existsSync(c));
  if (!hallada) {
    console.error(`✖ No existe: ${rel}`);
    console.error("   Probé:");
    for (const c of candidatas) console.error(`     · ${muestra(c)}`);
    process.exit(1);
  }
  return hallada;
};

// Un número que no lo es daba FALSO VERDE en revisar-plan.mjs (NaN no es mayor
// ni menor que nada): aquí se rechaza antes de medir.
const numero = (nombre, porDefecto) => {
  if (f[nombre] === undefined) return porDefecto;
  const n = Number(f[nombre]);
  if (f[nombre] === true || !Number.isFinite(n) || n <= 0) {
    console.error(`✖ --${nombre} inválido: "${f[nombre]}". Tiene que ser un número > 0.`);
    process.exit(1);
  }
  return n;
};

// `flags()` toma como valor de una opción el argumento que la sigue: en
// `--tabla plan.ts` la ruta acaba en `f.tabla`. Se recoge de ahí en vez de
// revisar la demo en silencio, que es un verde sobre el archivo equivocado.
const posicional = f._[0] ?? (typeof f.tabla === "string" ? f.tabla : undefined);
const planTs = resuelve(posicional ?? "remotion/src/motor/demos/subtitulos-demo.ts");
const marcaTs = typeof f.marca === "string" ? resuelve(f.marca) : null;
const fps = numero("fps", 30);
const ancho = numero("ancho", 1080);
const alto = numero("alto", 1920);
const duracion = numero("duracion", undefined);

const require = createRequire(path.join(remotionDir, "package.json"));
const esbuild = require("esbuild");
const tmp = carpetaTemporal("subtitulos-");
const entry = path.join(tmp, "entry.ts");
const motor = path.join(remotionDir, "src", "motor", "subtitulos-editoriales.ts");
fs.writeFileSync(
  entry,
  `export * as plan from ${JSON.stringify(planTs)};\n` +
    `export { revisaSubtitulosEditoriales, resuelveBloque, letraSubtitulosDe, modoTextoDe } from ${JSON.stringify(motor)};\n` +
    `export { LETRA_SUBTITULOS } from ${JSON.stringify(path.join(remotionDir, "src", "motor", "marca.ts"))};\n` +
    (marcaTs ? `export * as marca from ${JSON.stringify(marcaTs)};\n` : "")
);
const bundle = path.join(tmp, "out.cjs");
let mod;
try {
  await esbuild.build({ entryPoints: [entry], bundle: true, platform: "node", format: "cjs", outfile: bundle, logLevel: "error" });
  mod = require(bundle);
} finally {
  // `borrar` reintenta: en Windows el antivirus retiene un instante el .cjs recién creado.
  borrar(tmp);
}

// El plan puede exportarse con cualquier nombre: se reconoce por su forma.
const esPlan = (v) => Array.isArray(v) && v.length > 0 && v.every((b) => b && typeof b === "object" && Array.isArray(b.trozos) && "hasta" in b);
const planes = Object.entries(mod.plan).filter(([, v]) => esPlan(v));
// Una lista que PARECE un plan y tiene un bloque malformado no se descarta en
// silencio: si el archivo exporta además un plan sano, la puerta daría verde
// sin haber mirado el roto.
const parecePlan = (v) => Array.isArray(v) && v.length > 0 && v.some((b) => b && typeof b === "object" && ("trozos" in b || "hasta" in b));
const rotos = Object.entries(mod.plan).filter(([, v]) => parecePlan(v) && !esPlan(v));
if (rotos.length) {
  for (const [nombre, lista] of rotos) {
    const i = lista.findIndex((b) => !(b && typeof b === "object" && Array.isArray(b.trozos) && "hasta" in b));
    const id = lista[i] && typeof lista[i] === "object" && lista[i].id ? ` («${lista[i].id}»)` : "";
    console.error(`✖ ${muestra(planTs)} · ${nombre}: el bloque ${i + 1}${id} no tiene \`hasta\` o su \`trozos\` no es una lista`);
  }
  process.exit(1);
}
if (planes.length === 0) {
  console.error(`✖ ${muestra(planTs)} no exporta ningún BloqueEditorial[] ({ id, hasta, trozos: [{ desde, texto }] })`);
  process.exit(1);
}

// La marca también se reconoce por su forma: el archivo de un canal exporta un
// objeto con nombre, color y letra, se llame como se llame.
let letra = mod.LETRA_SUBTITULOS;
let deQuien = "las del motor";
if (marcaTs) {
  const canal = Object.values(mod.marca).find((v) => v && typeof v === "object" && v.color && v.letra && typeof v.nombre === "string");
  if (!canal) {
    console.error(`✖ ${muestra(marcaTs)} no exporta ninguna marca ({ nombre, color, letra… })`);
    process.exit(1);
  }
  letra = mod.letraSubtitulosDe(canal);
  deQuien = `las de «${canal.nombre}» (modo de texto por defecto del canal: ${mod.modoTextoDe(canal)})`;
}

let total = 0;
for (const [nombre, bloques] of planes) {
  const avisos = mod.revisaSubtitulosEditoriales(bloques, { fps, ancho, alto, duracion, letra });
  const lineas = bloques.reduce((n, b) => n + b.trozos.length, 0);
  const acentos = bloques.reduce((n, b) => n + b.trozos.filter((t) => t.estilo === "acento").length, 0);
  const fin = bloques.reduce((m, b) => Math.max(m, Number(b.hasta) || 0), 0);
  console.log(`\n💬 ${muestra(planTs)} · ${nombre}`);
  console.log(
    `   ${bloques.length} bloques · ${lineas} líneas · ${acentos} acentos · hasta el frame ${fin} (${(fin / fps).toFixed(2)} s @ ${fps} fps) · ${ancho}×${alto}`
  );
  console.log(`   letras: ${deQuien}\n`);

  if (f.tabla) {
    for (const b of bloques) {
      const r = mod.resuelveBloque(b, { ancho, alto }, letra);
      console.log(`   ${String(b.id).padEnd(6)} ${r.posicion.padEnd(6)} y ${r.top}-${r.top + r.alto}`);
      for (const l of r.lineas) {
        const ajuste = l.encoge < 1 ? ` · encogida al ${Math.round(l.encoge * 100)} %` : "";
        const mide = l.ancho === null ? "sin tabla" : `${l.ancho}/${r.anchoUtil} px`;
        console.log(`          f${String(l.desde).padStart(5)} ${l.estilo.padEnd(6)} ${String(l.px).padStart(3)} px · ${mide}${ajuste} · «${l.texto}»`);
      }
    }
    console.log("");
  }

  if (avisos.length === 0) console.log("✅ Plan limpio: línea de tiempo, estilos y geometría.\n");
  else {
    console.log(`⚠️  ${avisos.length} aviso(s):\n`);
    for (const a of avisos) console.log(`   · ${a}`);
    console.log("");
  }
  total += avisos.length;
}
process.exit(total === 0 ? 0 : 1);
