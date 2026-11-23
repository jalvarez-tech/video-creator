#!/usr/bin/env node
/**
 * revisar-106.mjs — la puerta del 106 («En últimas noticias» en 16:9, Fundación MAS). Sale con 0 o no se renderiza.
 * Copiada de `proyectos/100/revisar-100.mjs` (los 16:9 de MAS) con las reglas de las historias verticales
 * (`proyectos/101/revisar-historias.mjs`), porque el 106 es la versión horizontal del 105.
 *
 *   node proyectos/106/revisar-106.mjs            (prueba: lo que falta de oír y de MAS es aviso)
 *   node proyectos/106/revisar-106.mjs --final    (final: lo que falta es error)
 *
 *   0. la puerta genérica del montaje (`revisar-metraje.mjs`, a 1920×1080) y la del audio (`revisar-audio.mjs`);
 *   1. ningún tramo que suena deja oír el NOMBRE de una niña, lo que no se entiende o lo sensible (HZ07 «…en la pobreza»);
 *      ni se ve lo que no puede verse (el adulto al que peinan en VT29, ¿el usuario?);
 *   2. ni VT32 ni VT19, ni VT11, VT26 o VT33 (el usuario, el adulto peinado, «donde yo vivo»); y ninguna toma de 097-104:
 *      el 106 es el 105 en 16:9 y lleva EXACTAMENTE sus cortes (toma, `desde`, `en`, `dur`) y sus tramos de voz;
 *   3. la MÚSICA de corrido: una fuente, trozos consecutivos sin hueco de f0 al final, ≤ 60 valores de volumen por trozo,
 *      nunca calla antes del fundido y acaba en 0;
 *   4. el papel en f1446 (el golpe de 324,99 s), el CTA de 309 f, el último plano 12 f bajo la hoja, ninguna voz bajo ella;
 *   5. las TIRAS: una a la vez, dentro del metraje, un acento como mucho y su trazo dentro; las de una niña («…»), sobre una
 *      voz medida; ninguna mientras grita el lema (hero);
 *   6. la CUENTA, dígito a dígito como la dio el usuario y como la tiene el 097, y pintada desde `CUENTA`;
 *   7. lo que falta: las palabras «POR CONFIRMAR» y la autorización de imagen de MAS (aviso; con `--final`, error).
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

// 0 · las puertas genéricas
const METRAJE = "remotion/src/proyectos/106/metraje-106.ts";
const AUDIO = "remotion/src/proyectos/106/audio-106.ts";
const { m, a, tx, v, h105 } = await cargaTs({
  m: METRAJE,
  a: AUDIO,
  tx: "remotion/src/proyectos/106/textos-106.ts",
  v: "remotion/src/proyectos/106/voces-106.ts",
  h105: "remotion/src/proyectos/105/historia-105.ts",
});
const D = m.DURACION_106;
const generica = ejecutar("node", ["remotion/src/motor/metraje/revisar-metraje.mjs", METRAJE, "metraje106", "--ancho", "1920", "--alto", "1080"], { cwd: RAIZ });
if (generica.status !== 0) {
  console.log(generica.stdout);
  mal("la puerta genérica del montaje no pasa");
} else log.ok("puerta genérica del montaje (1920×1080)");
const au = ejecutar("node", ["manuales/diseno-sonoro/scripts/revisar-audio.mjs", AUDIO, "--fps", String(FPS), "--duracion", String(D)], { cwd: RAIZ });
if (au.status !== 0) {
  console.log(au.stdout);
  mal("la puerta del audio no pasa");
} else log.ok("puerta del audio (forma, ganancias ≤ +6 dB, disco)");

// 1 · lo que no puede oírse ni verse (segundos de la FUENTE; analisis-videos.md §6-§7 y las medidas del 105)
const NO_SUENA = {
  "mas-106/vt18.wav": [[2.6, 4.2, "«…con [nombre]» (un nombre de niña)"], [5.3, 11.9, "risas y gritos saturados"], [32.7, 34.25, "lo que no se entiende antes de «Un conejo»"], [38.9, 44.2, "lo que no se entiende antes de «Un colibrí»"], [53.5, 55.2, "«Suzuki» (una marca)"]],
  "mas-106/hz07.wav": [[2.9, 5.0, "«porque me dio oportunidad en la pobreza» (097 §6-§7: sensible, pide el sí de MAS)"]],
  "mas-106/hz04.wav": [[13.2, 16.3, "lo que no se entiende tras «Un Dios inmortal»"]],
};
const NO_SE_VE = { "mas-106/vt29.mp4": [[10.5, 17.0, "el adulto al que peinan (¿el usuario?)"]] };
for (const t of a.audio106) {
  const s0 = t.desde ?? 0;
  const s1 = s0 + t.dur / FPS;
  for (const [x0, x1, que] of NO_SUENA[t.src] ?? []) if (s0 < x1 && s1 > x0) mal(`${t.id} deja oír ${que} (${x0}-${x1} s; suena de ${s0.toFixed(2)} a ${s1.toFixed(2)})`);
}
for (const c of m.metraje106) {
  const s0 = c.desde ?? 0;
  const s1 = s0 + c.dur / FPS;
  for (const [x0, x1, que] of NO_SE_VE[c.src] ?? []) if (s0 < x1 && s1 > x0) mal(`${c.id} enseña ${que} (${x0}-${x1} s; va de ${s0.toFixed(2)} a ${s1.toFixed(2)})`);
}
log.ok("ni nombres de niñas, ni lo que no se entiende, ni lo sensible; ni el adulto de VT29");

// 2 · tomas: las prohibidas, ninguna de 097-104 y EXACTAMENTE las del 105
const tomaDe = (src) => src.match(/((?:hz|vt|dr|ft)\d{2})[a-z]?\.(?:mp4|jpg|png|wav)$/)?.[1] ?? null;
const PROHIBIDAS = { vt32: "VT32: el pecho de una menor pegado al objetivo", vt19: "VT19: datos de familia", vt11: "VT11: sale el usuario", vt26: "VT26: el adulto al que peinan", vt33: "VT33: «donde yo vivo» (solo en la 104)" };
for (const x of [...m.metraje106, ...a.audio106]) {
  const t = tomaDe(x.src);
  if (t && PROHIBIDAS[t]) mal(`${x.id}: ${PROHIBIDAS[t]}`);
}
const usadas = new Map();
for (const n of ["097", "098", "099", "100", "101", "102", "103", "104"]) {
  const dir = path.join(RAIZ, "remotion", "src", "proyectos", n);
  for (const f of fs.readdirSync(dir).filter((x) => /\.tsx?$/.test(x) && !/^voces-/.test(x))) {
    for (const k of fs.readFileSync(path.join(dir, f), "utf8").matchAll(/"(?:mas-\d+\/)?((?:hz|vt|dr|ft)\d{2})[a-z]?(?:\.\w+)?"/g)) usadas.set(k[1], [...new Set([...(usadas.get(k[1]) ?? []), n])]);
  }
}
const repetidas = [...new Set(m.metraje106.map((c) => tomaDe(c.src)).filter((t) => t && usadas.has(t)))];
for (const t of repetidas) mal(`${t.toUpperCase()} ya sale en ${usadas.get(t).join(", ")} (el 105 y el 106 solo llevan tomas nuevas)`);
const H5 = h105.HISTORIA_105;
const firma = (c) => `${tomaDe(c.src)}@${(c.desde ?? 0).toFixed(3)}/${c.en}+${c.dur}`;
const corte105 = H5.cortes.map(firma);
const corte106 = m.metraje106.map(firma);
if (corte105.join(" ") !== corte106.join(" ")) mal(`los cortes no son los del 105:\n   105: ${corte105.join(" ")}\n   106: ${corte106.join(" ")}`);
const voz105 = H5.voces.map((x) => `${x.id}:${tomaDe(x.src)}@${x.desde}/${x.en}+${x.dur}`);
const voz106 = m.VOCES_PLAN.map((x) => `${x.id}:${tomaDe(x.src)}@${x.desde}/${x.en}+${x.dur}`);
if (voz105.join(" ") !== voz106.join(" ")) mal(`los tramos de voz no son los del 105:\n   105: ${voz105.join(" ")}\n   106: ${voz106.join(" ")}`);
if (H5.cierre !== m.EMPIEZA_PAPEL) mal(`el papel entra en f${m.EMPIEZA_PAPEL} y en el 105 en f${H5.cierre}: el golpe de la música ya no cae en él`);
if (!repetidas.length && corte105.join() === corte106.join()) log.ok(`ninguna toma de 097-104 (${usadas.size} tomas usadas allí); los ${corte106.length} cortes y los ${voz106.length} tramos de voz son los del 105`);

// 3 · la música, de corrido
const { tr } = await cargaTs({ tr: "remotion/src/motor/sound/tramos.ts" });
const musica = a.audio106.filter((t) => t.id.startsWith("musica"));
const nivel = (f) => {
  const t = musica.find((x) => f >= x.en && f < x.en + x.dur) ?? musica[musica.length - 1];
  return tr.volumenDe(t, f - t.en);
};
if (new Set(musica.map((t) => t.src)).size !== 1) mal("la música sale de más de una fuente: tiene que ser UNA pista");
let cursor = 0;
let maxValores = 0;
for (const t of musica) {
  if (t.en !== cursor) mal(`${t.id} empieza en f${t.en} y el trozo anterior acaba en f${cursor}: hueco o solape`);
  const esperado = m.INICIO_MUSICA + t.en / FPS;
  if (Math.abs((t.desde ?? 0) - esperado) > 1e-4) mal(`${t.id}: desde ${t.desde} y la muestra que sigue es ${esperado.toFixed(4)}: la música salta`);
  const valores = new Set();
  for (let f = t.en; f < t.en + t.dur; f++) valores.add(Math.round(tr.volumenDe(t, f - t.en) * 1000));
  if (valores.size > 61) mal(`${t.id}: ${valores.size} valores de volumen (el plan admite 60)`);
  maxValores = Math.max(maxValores, valores.size);
  cursor = t.en + t.dur;
}
if (cursor !== D) mal(`la música acaba en f${cursor} y la pieza en f${D}`);
let minimo = Infinity;
let fMin = -1;
for (let f = 2; f < D - 60; f++) {
  const x = nivel(f);
  if (x < minimo) {
    minimo = x;
    fMin = f;
  }
}
if (minimo < 0.05) mal(`la música baja a ×${minimo.toFixed(3)} en f${fMin} antes del fundido: calla`);
const ultimo = musica[musica.length - 1];
if (tr.volumenDe(ultimo, ultimo.dur) > 1e-3) mal(`la música no acaba en 0 (×${tr.volumenDe(ultimo, ultimo.dur)})`);
if (!errores) log.ok(`la música va de corrido: ${musica.length} trozos de una sola pista (≤ ${maxValores} valores cada uno), nunca por debajo de ×${minimo.toFixed(3)} (f${fMin}) y con fundido a 0`);

// 4 · el papel y el final
if (m.EMPIEZA_PAPEL !== 1446) mal(`el papel entra en f${m.EMPIEZA_PAPEL}: tiene que ser f1446 (el golpe de 324,99 s)`);
if (D - m.EMPIEZA_PAPEL !== 309) mal(`el CTA dura ${D - m.EMPIEZA_PAPEL} f (el del 100: 309)`);
if (tx.PAPEL.hoja !== m.EMPIEZA_PAPEL) mal(`la hoja entra en f${tx.PAPEL.hoja} y el metraje acaba en f${m.EMPIEZA_PAPEL}`);
const finMetraje = Math.max(...m.metraje106.map((c) => c.en + c.dur));
if (finMetraje !== m.EMPIEZA_PAPEL + 12) mal(`el metraje acaba en f${finMetraje}: tiene que seguir 12 f bajo la hoja que entra (f${m.EMPIEZA_PAPEL + 12})`);
for (const t of a.audio106.filter((x) => !x.id.startsWith("musica"))) if (t.en + t.dur > m.EMPIEZA_PAPEL) mal(`${t.id} suena bajo el papel (acaba en f${t.en + t.dur})`);
log.ok(`${(D / FPS).toFixed(1)} s: metraje hasta f${m.EMPIEZA_PAPEL} (+12 bajo la hoja) y el CTA del 100 (309 f)`);

// 5 · las tiras
const tiras = [...tx.TIRAS].sort((x, y) => x.en - y.en);
tiras.forEach((t, i) => {
  if (t.en < -14 || t.sale > m.EMPIEZA_PAPEL || t.sale <= t.en) mal(`${t.id}: f${t.en}-f${t.sale} fuera del metraje`);
  if (i > 0 && t.en < tiras[i - 1].sale) mal(`${t.id} pisa a ${tiras[i - 1].id}: una tira a la vez`);
  const acentos = (t.texto.match(/\*/g) ?? []).length / 2;
  if (acentos > 1) mal(`${t.id}: ${acentos} acentos (uno como mucho)`);
  const limpio = t.texto.replace(/\*/g, "");
  if (limpio.length > 56) mal(`${t.id}: ${limpio.length} caracteres (en 16:9, una línea de la tira son ≈ 56)`);
  for (const k of t.marcas ?? []) if (k && (k.en < t.en || k.en >= t.sale - 6)) mal(`${t.id}: el trazo (f${k.en}) cae fuera de su tira`);
  if (t.piel !== "indigo") {
    const sobreVoz = Object.values(v.VOCES_106).some((x) => x.f0 !== null && x.f1 !== null && x.f0 < t.sale && x.f1 > t.en);
    if (!sobreVoz) mal(`${t.id}: lo dice una niña y no cae sobre ninguna voz medida`);
  }
  if (t.en < tx.MAS_GRITO.sale && t.sale > tx.MAS_GRITO.en) mal(`${t.id}: hay tira mientras gritan el lema (un hero a la vez)`);
});
const ks = [...tx.KICKERS].sort((x, y) => x.en - y.en);
ks.forEach((k, i) => i > 0 && k.en < ks[i - 1].sale && mal(`el kicker ${k.id} pisa a ${ks[i - 1].id}`));
log.ok(`tiras: ${tiras.length}, una a la vez; ${ks.length} kickers; el lema, sin tira encima`);

// 6 · la cuenta
const CUENTA_ESPERADA = { banco: "Bancolombia", tipo: "Cuenta de ahorros", numero: "928 0000 1770", nit: "900 280 179-4", celular: "314 520 56 56" };
const { t97 } = await cargaTs({ t97: "remotion/src/proyectos/097/textos-097.ts" });
let cuentaMal = 0;
for (const [k, x] of Object.entries(CUENTA_ESPERADA)) {
  if (tx.CUENTA?.[k] !== x) {
    cuentaMal++;
    mal(`CUENTA.${k} es «${tx.CUENTA?.[k]}» y el usuario dio «${x}»`);
  }
  if (t97.CUENTA?.[k] !== tx.CUENTA?.[k]) {
    cuentaMal++;
    mal(`CUENTA.${k} del 106 («${tx.CUENTA?.[k]}») no es la del 097 («${t97.CUENTA?.[k]}»)`);
  }
}
if (!(tx.PASOS[2]?.linea ?? "").includes(CUENTA_ESPERADA.celular)) {
  cuentaMal++;
  mal(`el paso 3 no lleva el celular ${CUENTA_ESPERADA.celular}`);
}
const papel = fs.readFileSync(path.join(RAIZ, "remotion/src/proyectos/106/Papel106.tsx"), "utf8");
for (const campo of ["CUENTA.numero", "CUENTA.nit", "CUENTA.banco", "CUENTA.tipo"]) {
  if (!papel.includes(campo)) {
    cuentaMal++;
    mal(`Papel106.tsx no pinta ${campo}: la cuenta en pantalla no sale de CUENTA`);
  }
}
if (!cuentaMal) log.ok(`la cuenta (${CUENTA_ESPERADA.numero}, NIT ${CUENTA_ESPERADA.nit}) y el celular (${CUENTA_ESPERADA.celular}) son los del usuario y los del 097`);

// 7 · lo que falta
const pendientes = [...tx.TIRAS.filter((t) => /POR CONFIRMAR/.test(t.nota ?? "")).map((t) => `${t.id} (${t.nota})`), ...(/POR CONFIRMAR/.test(tx.MAS_GRITO.nota ?? "") ? [`el lema (${tx.MAS_GRITO.nota})`] : [])];
if (pendientes.length) ojo(`sin oír (R31): ${pendientes.join(" · ")}`);
ojo("de MAS: la autorización de imagen de las menores (pendiente desde el 097)");

console.log("");
if (errores) {
  log.error(`${errores} error(es)${avisos ? ` y ${avisos} aviso(s)` : ""}: no se renderiza`);
  process.exit(1);
}
log.ok(`la puerta del 106 pasa${avisos ? ` con ${avisos} aviso(s) (con --final serían errores)` : ""}`);
