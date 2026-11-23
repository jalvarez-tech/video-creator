#!/usr/bin/env node
/**
 * revisar-100.mjs — la puerta del 100 («Lo harás otra vez», Fundación MAS). Sale con 0 o no se renderiza.
 * Copiada de `proyectos/097/revisar-097.mjs` y adaptada a este encargo.
 *
 *   node proyectos/100/revisar-100.mjs            (prueba: lo que falta de MAS es aviso)
 *   node proyectos/100/revisar-100.mjs --final    (final: lo que falta de MAS es error)
 *
 * Encima de la puerta genérica del montaje (`revisar-metraje.mjs`, a 1920×1080), lo que pide ESTE encargo:
 *   1. ningún tramo que suena deja oír el NOMBRE de una niña, la voz del usuario ni el «¡tres!» de quien graba;
 *   2. VT32 y VT19 no entran nunca, ni el núcleo de las otras dos piezas (VT07, VT06, HZ17, HZ05);
 *   3. la MÚSICA va de corrido: una sola fuente, trozos consecutivos y sin hueco de f0 a f1800, ≤ 60 valores de volumen por
 *      trozo, nunca baja a 0 antes del fundido final y acaba en 0;
 *   4. cada corte seco cae a ≤ 2 f de un golpe medido ≥ 9 dB (`musica/golpes-100.json`);
 *   5. la duración es 1 min ± 1 s;
 *   6. la CUENTA, dígito a dígito como la dio el usuario (y como la tiene el 097);
 *   7. «la Nuestra» (se oye y se lee) está por confirmar con MAS: aviso, y error con `--final`.
 */
import fs from "node:fs";
import path from "node:path";
import { RAIZ, ejecutar, log } from "../../herramientas/comun.mjs";
import { cargaTs } from "../../remotion/src/motor/metraje/revisar-metraje.mjs";

const FINAL = process.argv.includes("--final");
const FPS = 30;
let errores = 0;
let avisos = 0;
const mal = (m) => {
  errores++;
  log.error(m);
};
const ojo = (m) => {
  if (FINAL) return mal(m);
  avisos++;
  log.aviso(m);
};

// 0 · la puerta genérica del montaje
const generica = ejecutar("node", ["remotion/src/motor/metraje/revisar-metraje.mjs", "remotion/src/proyectos/100/metraje-100.ts", "--ancho", "1920", "--alto", "1080"], { cwd: RAIZ });
if (generica.status !== 0) {
  console.log(generica.stdout);
  mal("la puerta genérica del montaje no pasa (node remotion/src/motor/metraje/revisar-metraje.mjs remotion/src/proyectos/100/metraje-100.ts --ancho 1920 --alto 1080)");
} else log.ok("puerta genérica del montaje");

const { m, a, tx } = await cargaTs({
  m: "remotion/src/proyectos/100/metraje-100.ts",
  a: "remotion/src/proyectos/100/audio-100.ts",
  tx: "remotion/src/proyectos/100/textos-100.ts",
});

// 1 · nombres, la voz del usuario y el «¡tres!» de quien graba (segundos de la fuente normalizada; analisis-videos.md §7)
const PROHIBIDO_OIR = {
  "mas-097/vt07.wav": [[0.5, 2.9, "el ritual del micro (¿un nombre de niña?)"]],
  "mas-097/vt10.wav": [[0.0, 2.2, "un nombre de niña"]],
  "mas-097/vt11.wav": [[0.6, 4.4, "un nombre de niña"], [4.85, 6.9, "la voz y la pregunta del USUARIO"]],
  "mas-097/hz20.wav": [[0.0, 0.3, "el «¡tres!» de quien graba"]],
  "mas-097/hz32.wav": [[0.2, 0.6, "el «¡tres!» de quien graba"]],
};
/** Clips con nombres dichos que el 100 no tiene medidos: si entran, hay que medir su ventana antes. */
const CON_NOMBRES_SIN_VENTANA = ["hz18", "hz23", "vt04", "vt09", "vt16", "vt18"];
for (const t of a.audio100) {
  const s0 = t.desde ?? 0;
  const s1 = s0 + t.dur / FPS;
  for (const [n0, n1, quien] of PROHIBIDO_OIR[t.src] ?? []) {
    if (s0 < n1 && s1 > n0) mal(`${t.id} deja oír ${quien} (${n0}-${n1} s de la fuente; el tramo suena de ${s0.toFixed(2)} a ${s1.toFixed(2)})`);
  }
  for (const c of CON_NOMBRES_SIN_VENTANA) if (t.src.includes(`/${c}.`)) mal(`${t.id}: ${c.toUpperCase()} dice nombres de niñas y su ventana no está medida en esta puerta`);
}
log.ok("ningún nombre de niña, ni la voz del usuario, ni el «¡tres!» de quien graba");

// 2 · clips prohibidos y el núcleo de las otras dos piezas
const PROHIBIDOS = {
  vt32: "VT32: el pecho de una menor pegado al objetivo",
  vt19: "VT19: datos de familia (solo con el sí de MAS)",
  vt07: "VT07: el testimonio es el núcleo del 098",
  vt06: "VT06: la respuesta del regalo es del 098",
  hz17: "HZ17: «a Cristo en mi vida» es del 099",
  hz05: "HZ05: las cualidades de Dios son del 099",
};
for (const c of m.metraje100) for (const [k, por] of Object.entries(PROHIBIDOS)) if (c.src.includes(`/${k}`)) mal(`${c.id}: ${por}`);
for (const t of a.audio100) for (const [k, por] of Object.entries(PROHIBIDOS)) if (t.src.includes(`/${k}`)) mal(`${t.id}: ${por}`);
log.ok("ni VT32 ni VT19, ni el núcleo del 098 y el 099");

// 3 · la música, de corrido
const D = m.DURACION_100;
const musica = a.musica100;
const { tr } = await cargaTs({ tr: "remotion/src/motor/sound/tramos.ts" });
let maxValores = 0;
const fuentes = new Set(musica.map((t) => t.src));
if (fuentes.size !== 1) mal(`la música sale de ${fuentes.size} fuentes: tiene que ser UNA pista`);
let cursor = 0;
for (const t of musica) {
  if (t.en !== cursor) mal(`${t.id} empieza en f${t.en} y el trozo anterior acaba en f${cursor}: hueco o solape`);
  const esperado = m.INICIO_MUSICA + t.en / FPS;
  if (Math.abs((t.desde ?? 0) - esperado) > 1e-6) mal(`${t.id}: desde ${t.desde} y la muestra que sigue es ${esperado.toFixed(4)}: la música salta`);
  cursor = t.en + t.dur;
  // ≤ 60 valores distintos (a 3 decimales) por trozo, contados como los cuenta Remotion: con la envolvente del trozo
  const valores = new Set();
  for (let f = t.en; f < t.en + t.dur; f++) valores.add(Math.round(tr.volumenDe(t, f - t.en) * 1000));
  if (valores.size > 61) mal(`${t.id}: ${valores.size} valores de volumen (con más de ~80 la mezcla de Remotion se rompe; el plan admite 60)`);
  maxValores = Math.max(maxValores, valores.size);
  // y la envolvente del trozo sigue a la de la pista entera (el troceo no cambia el nivel)
  for (let f = t.en + (t.entra ?? 0); f < t.en + t.dur; f += 5) if (Math.abs(tr.volumenDe(t, f - t.en) - a.nivelMusica(f)) > 0.02) mal(`${t.id}: en f${f} suena a ×${tr.volumenDe(t, f - t.en).toFixed(3)} y la envolvente dice ×${a.nivelMusica(f).toFixed(3)}`);
}
if (cursor !== D) mal(`la música acaba en f${cursor} y la pieza en f${D}`);
let minimo = Infinity;
let fMin = -1;
for (let f = 0; f < D - 60; f++) {
  const v = a.nivelMusica(f);
  if (v < minimo) {
    minimo = v;
    fMin = f;
  }
}
if (minimo < 0.05) mal(`la música baja a ×${minimo.toFixed(3)} en f${fMin} antes del fundido: calla`);
if (a.nivelMusica(D) > 1e-6) mal(`la música no acaba en 0 (×${a.nivelMusica(D)})`);
if (!errores) log.ok(`la música va de corrido: ${musica.length} trozos de una sola pista (≤ ${maxValores} valores de volumen cada uno), de f0 a f${D}, nunca por debajo de ×${minimo.toFixed(3)} (f${fMin}) y con fundido final a 0`);

// 4 · cada corte seco en un golpe
const golpes = JSON.parse(fs.readFileSync(path.join(RAIZ, "proyectos/100/musica/golpes-100.json"), "utf8")).golpes.filter((g) => g.db >= 9);
const cortes = [...m.metraje100.slice(1).filter((c) => (c.entra ?? "corte") === "corte").map((c) => [c.id, c.en]), ["papel", m.EMPIEZA_PAPEL]];
let lejos = 0;
for (const [id, f] of cortes) {
  const g = golpes.reduce((mejor, x) => (Math.abs(x.f - f) < Math.abs(mejor.f - f) ? x : mejor), golpes[0]);
  if (Math.abs(g.f - f) > 2) {
    lejos++;
    mal(`${id} corta en f${f} y el golpe ≥ 9 dB más cercano está en f${g.f} (${g.db} dB)`);
  }
}
if (!lejos) log.ok(`los ${cortes.length} cortes secos caen a ≤ 2 f de un golpe medido ≥ 9 dB`);

// 5 · un minuto
if (Math.abs(D - 1800) > 30) mal(`la pieza dura ${D} f (${(D / FPS).toFixed(1)} s): el encargo es 1 min ± 1 s`);
else log.ok(`dura ${D} f (${(D / FPS).toFixed(1)} s)`);

// 6 · la cuenta
const CUENTA_ESPERADA = { banco: "Bancolombia", tipo: "Cuenta de ahorros", numero: "928 0000 1770", nit: "900 280 179-4", celular: "314 520 56 56" };
const { t97 } = await cargaTs({ t97: "remotion/src/proyectos/097/textos-097.ts" });
let cuentaMal = 0;
for (const [k, v] of Object.entries(CUENTA_ESPERADA)) {
  if (tx.CUENTA?.[k] !== v) {
    cuentaMal++;
    mal(`CUENTA.${k} es «${tx.CUENTA?.[k]}» y el usuario dio «${v}»`);
  }
  if (t97.CUENTA?.[k] !== tx.CUENTA?.[k]) {
    cuentaMal++;
    mal(`CUENTA.${k} del 100 («${tx.CUENTA?.[k]}») no es la del 097 («${t97.CUENTA?.[k]}»)`);
  }
}
const paso3 = tx.PASOS[2]?.linea ?? "";
if (!paso3.includes(CUENTA_ESPERADA.celular)) {
  cuentaMal++;
  mal(`el paso 3 no lleva el celular ${CUENTA_ESPERADA.celular} («${paso3}»)`);
}
const papel = fs.readFileSync(path.join(RAIZ, "remotion/src/proyectos/100/Papel100.tsx"), "utf8");
for (const campo of ["CUENTA.numero", "CUENTA.nit", "CUENTA.banco", "CUENTA.tipo"]) {
  if (!papel.includes(campo)) {
    cuentaMal++;
    mal(`Papel100.tsx no pinta ${campo}: la cuenta en pantalla no sale de CUENTA`);
  }
}
if (!cuentaMal) log.ok(`la cuenta (${CUENTA_ESPERADA.numero}, NIT ${CUENTA_ESPERADA.nit}) y el celular (${CUENTA_ESPERADA.celular}) son los del usuario y los del 097`);

// 7 · lo que falta de MAS
if (tx.TIRAS.some((t) => t.texto.includes("la Nuestra")) || m.metraje100.some((c) => c.audio?.includes("hz20"))) {
  ojo("«la Nuestra» (el nombre de la casa) se oye y se lee en HZ20: por confirmar con MAS");
}
const textos = fs.readFileSync(path.join(RAIZ, "remotion/src/proyectos/100/textos-100.ts"), "utf8");
if (/20 de noviembre/.test(textos)) mal("la fecha «20 de noviembre» está por confirmar con MAS: no sale en el 100");
ojo("sin oír (R31): «Ser policía» (VT13, f257-f280) y el corte del audio de HZ19 en 3,45 s (f775), antes de la 2.ª frase");

console.log("");
if (errores) {
  log.error(`${errores} error(es)${avisos ? ` y ${avisos} aviso(s)` : ""}: no se renderiza`);
  process.exit(1);
}
log.ok(`la puerta del 100 pasa${avisos ? ` con ${avisos} aviso(s) (con --final serían errores)` : ""}`);
