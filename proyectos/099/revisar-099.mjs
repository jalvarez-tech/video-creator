#!/usr/bin/env node
/**
 * revisar-099.mjs — la puerta del 099 («A tus pies», Fundación MAS). Sale con 0 o no se renderiza. Copia adaptada de
 * `proyectos/097/revisar-097.mjs`.
 *
 *   node proyectos/099/revisar-099.mjs            (prueba: lo que falta oír es aviso)
 *   node proyectos/099/revisar-099.mjs --final    (final: lo que falta oír es error)
 *
 * Encima de la puerta genérica del montaje (`revisar-metraje.mjs`) y de la de audio (`revisar-audio.mjs`), lo que pide
 * ESTE encargo:
 *   1. ningún tramo que suena deja oír el NOMBRE de una niña ni sale de una toma con nombres sin ventana medida;
 *   2. ni VT32 ni VT19, y la voz y la pregunta del adulto de gorra blanca (VT11 4,85-6,9 s) no suenan; el «¡Tres!» de la
 *      cuenta atrás de HZ32 (0,2-0,5 s, un adulto) tampoco;
 *   3. un minuto (±1 s) y cada corte en un golpe MEDIDO de la canción (≤ 2 f); los de acto, en su golpe fuerte;
 *   4. la música suena de corrido: trozos consecutivos de la misma fuente, sin hueco ni solape, y nunca calla antes del
 *      fundido final;
 *   5. la cuenta para donar, dígito a dígito, y el celular en el paso 3;
 *   6. ni la fecha «20 de noviembre» ni el nombre de la casa en pantalla (por confirmar con MAS);
 *   7. con `--final`: lo que falta oír (R31) es error.
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
const generica = ejecutar("node", ["remotion/src/motor/metraje/revisar-metraje.mjs", "remotion/src/proyectos/099/metraje-099.ts"], { cwd: RAIZ });
if (generica.status !== 0) mal("la puerta genérica del montaje no pasa (node remotion/src/motor/metraje/revisar-metraje.mjs remotion/src/proyectos/099/metraje-099.ts)");
else log.ok("puerta genérica del montaje");

const { m, a } = await cargaTs({ m: "remotion/src/proyectos/099/metraje-099.ts", a: "remotion/src/proyectos/099/audio-099.ts" });
const DUR = m.DURACION_099;
const audio = ejecutar("node", ["manuales/diseno-sonoro/scripts/revisar-audio.mjs", "remotion/src/proyectos/099/audio-099.ts", "--fps", String(FPS), "--duracion", String(DUR)], { cwd: RAIZ });
if (audio.status !== 0) mal("la puerta de audio no pasa (revisar-audio.mjs)");
else log.ok("puerta de audio");

// 1 · nombres
/** Dónde se DICE un nombre de niña, en segundos de la fuente normalizada (analisis-videos.md §7 y la puerta del 097). */
const NOMBRES = {
  "mas-097/vt07.wav": [[0.5, 2.9, "el ritual del micro (¿un nombre de niña?)"]],
  "mas-097/vt10.wav": [[0.0, 2.2, "un nombre de niña"]],
  "mas-097/vt11.wav": [[0.6, 4.4, "un nombre de niña"]],
};
/** Tomas con un nombre dicho cuya ventana NO está medida: no suenan, sin más. */
const CON_NOMBRE_SIN_MEDIR = ["hz18", "hz23", "vt04", "vt09", "vt16", "vt18", "vt19"];
for (const t of a.audio099) {
  const ventanas = NOMBRES[t.src] ?? [];
  const s0 = t.desde ?? 0;
  const s1 = s0 + t.dur / FPS;
  for (const [n0, n1, quien] of ventanas) if (s0 < n1 && s1 > n0) mal(`${t.id} deja oír un nombre: ${quien} (${n0}-${n1} s de la fuente; el tramo suena de ${s0.toFixed(2)} a ${s1.toFixed(2)})`);
  for (const c of CON_NOMBRE_SIN_MEDIR) if (t.src.includes(`/${c}.`)) mal(`${t.id} suena de ${c.toUpperCase()}, que dice el nombre de una niña sin ventana medida`);
}
log.ok("ningún nombre de niña en lo que suena");

// 2 · clips prohibidos, la voz del adulto y el «¡Tres!»
const PROHIBIDOS = { "mas-097/vt32": "VT32: el pecho de una menor pegado al objetivo", "mas-097/vt19": "VT19: datos de familia (solo con el sí de MAS)" };
for (const c of m.metraje099) for (const [k, por] of Object.entries(PROHIBIDOS)) if (c.src.startsWith(k)) mal(`${c.id}: ${por}`);
for (const t of a.audio099) {
  if (t.src.includes("vt19") || t.src.includes("vt32")) mal(`${t.id}: suena VT19 o VT32`);
  const s0 = t.desde ?? 0;
  const s1 = s0 + t.dur / FPS;
  if (t.src.endsWith("/vt11.wav") && s0 < 6.9 && s1 > 4.85) mal(`${t.id}: deja oír la pregunta del adulto de gorra blanca (VT11 4,85-6,9 s)`);
  if (t.src.endsWith("/hz32.wav") && s0 < 0.55) mal(`${t.id}: deja oír el «¡Tres!» de la cuenta atrás de HZ32 (0,2-0,5 s; el tramo arranca en ${s0.toFixed(2)} s)`);
}
log.ok("ni VT32 ni VT19, ni la voz del adulto ni el «¡Tres!»");

// 3 · la duración y los golpes
if (Math.abs(DUR - 1800) > 30) mal(`la pieza dura ${DUR} f (${(DUR / FPS).toFixed(2)} s): el encargo es 1 minuto ±1 s`);
else log.ok(`dura ${(DUR / FPS).toFixed(2)} s (1 minuto ±1 s)`);
const golpes = JSON.parse(fs.readFileSync(path.join(RAIZ, "proyectos/099/musica/golpes-099.json"), "utf8")).golpes.map((g) => ({ f: (g.t - m.INICIO_MUSICA) * FPS, db: g.db }));
/** Los cortes que NO son de imagen: el segundo trozo de un mismo plano (mismo `src`, `desde` contiguo), partido solo por su ganancia. */
const esTrozo = (c, prev) => prev && prev.src === c.src && Math.abs((prev.desde ?? 0) + prev.dur / FPS - (c.desde ?? 0)) < 1 / FPS;
let lejos = 0;
m.metraje099.forEach((c, i) => {
  if (c.en === 0 || esTrozo(c, m.metraje099[i - 1])) return;
  const cerca = golpes.reduce((best, g) => (Math.abs(g.f - c.en) < Math.abs(best.f - c.en) ? g : best), golpes[0]);
  const d = c.en - cerca.f;
  if (Math.abs(d) > 2) {
    lejos++;
    mal(`${c.id} corta en f${c.en} y el golpe más cercano de la canción cae en f${cerca.f.toFixed(1)} (${d > 0 ? "+" : ""}${d.toFixed(1)} f)`);
  }
});
const finMetraje = m.metraje099.at(-1).en + m.metraje099.at(-1).dur;
for (const [k, g] of Object.entries(m.GOLPES_099)) {
  const f = (g.pieza - m.INICIO_MUSICA) * FPS;
  const corta = m.metraje099.some((c) => c.en === g.f) || (g.f === m.EMPIEZA_PAPEL && finMetraje === g.f);
  if (!corta) mal(`GOLPES_099.${k}: no hay corte en f${g.f}`);
  if (Math.abs(f - g.f) > 2) mal(`GOLPES_099.${k}: el golpe (${g.pieza} s) cae en f${f.toFixed(1)} y el corte en f${g.f}`);
}
if (finMetraje !== m.EMPIEZA_PAPEL) mal(`el metraje acaba en f${finMetraje} y el papel empieza en f${m.EMPIEZA_PAPEL}`);
if (!lejos) log.ok("cada corte cae a ≤ 2 f de un golpe medido de la canción; los de acto, en su golpe fuerte");

// 4 · la música de corrido
const trozos = a.audio099.filter((t) => t.src === "mas-099/musica-a-tus-pies.wav").sort((x, y) => x.en - y.en);
if (!trozos.length) mal("no suena «A Tus Pies»");
else {
  if (trozos[0].en !== 0) mal(`la música empieza en f${trozos[0].en}, no en f0`);
  if (trozos.at(-1).en + trozos.at(-1).dur !== DUR) mal(`la música acaba en f${trozos.at(-1).en + trozos.at(-1).dur} y la pieza en f${DUR}`);
  trozos.forEach((t, i) => {
    const esperado = m.INICIO_MUSICA + t.en / FPS;
    if (Math.abs((t.desde ?? 0) - esperado) > 1e-6) mal(`${t.id}: desde ${t.desde} y le toca ${esperado} (la pista dejaría de ir de corrido)`);
    if (i > 0 && trozos[i - 1].en + trozos[i - 1].dur !== t.en) mal(`${trozos[i - 1].id} → ${t.id}: hueco o solape en f${t.en}`);
  });
  // Nunca calla antes del fundido final: el nivel más bajo de cada trozo (con sus fundidos, `volumenDe` del motor), fuera de los últimos 50 f.
  const { tr } = await cargaTs({ tr: "remotion/src/motor/sound/tramos.ts" });
  let minimo = Infinity;
  let donde = -1;
  for (const t of trozos) {
    for (let f = t.en; f < t.en + t.dur && f < DUR - 50; f++) {
      const x = tr.volumenDe(t, f - t.en);
      if (x < minimo) {
        minimo = x;
        donde = f;
      }
    }
  }
  if (minimo < 0.25) mal(`la música casi calla en f${donde} (ganancia ${minimo.toFixed(3)})`);
  else log.ok(`la música suena de corrido en ${trozos.length} trozo(s) consecutivos de la misma fuente; su nivel más bajo antes del fundido es ×${minimo.toFixed(2)} (f${donde})`);
}

// 5 · la cuenta, dígito a dígito (mueve dinero: si el usuario da otra, se cambia AQUÍ y en textos-099.ts a la vez)
const CUENTA_ESPERADA = { banco: "Bancolombia", tipo: "Cuenta de ahorros", numero: "928 0000 1770", nit: "900 280 179-4", celular: "314 520 56 56" };
const { tx } = await cargaTs({ tx: "remotion/src/proyectos/099/textos-099.ts" });
let cuentaBien = true;
for (const [k, v] of Object.entries(CUENTA_ESPERADA)) {
  if (tx.CUENTA?.[k] !== v) {
    cuentaBien = false;
    mal(`CUENTA.${k} es «${tx.CUENTA?.[k]}» y el usuario dio «${v}»`);
  }
}
const paso3 = tx.PASOS.pasos[2]?.linea ?? "";
if (!paso3.includes(CUENTA_ESPERADA.celular)) {
  cuentaBien = false;
  mal(`el paso 3 no lleva el celular ${CUENTA_ESPERADA.celular} («${paso3}»)`);
}
const papel = fs.readFileSync(path.join(RAIZ, "remotion/src/proyectos/099/Papel099.tsx"), "utf8");
for (const k of ["numero", "nit", "banco", "tipo"]) if (!papel.includes(`CUENTA.${k}`)) mal(`Papel099.tsx no pinta CUENTA.${k}: la cuenta en pantalla no saldría de los datos comprobados`);
if (cuentaBien) log.ok(`la cuenta (${CUENTA_ESPERADA.numero}, NIT ${CUENTA_ESPERADA.nit}) y el celular (${CUENTA_ESPERADA.celular}) son los que dio el usuario`);

// 6 · lo que está por confirmar con MAS no sale en pantalla
const pantalla = ["textos-099.ts", "Graficos099.tsx", "Papel099.tsx"].map((n) => [n, fs.readFileSync(path.join(RAIZ, "remotion/src/proyectos/099", n), "utf8")]);
let porConfirmar = 0;
for (const [n, src] of pantalla) {
  // Solo lo que se PINTA: las líneas de comentario se saltan.
  const codigo = src
    .split("\n")
    .filter((l) => !/^\s*(\*|\/\/|\/\*)/.test(l))
    .join("\n");
  if (/20 de noviembre/i.test(codigo)) {
    porConfirmar++;
    mal(`${n}: la fecha «20 de noviembre» está por confirmar con MAS y no sale`);
  }
  if (/la nuestra/i.test(codigo)) {
    porConfirmar++;
    mal(`${n}: el nombre de la casa («la Nuestra») está por confirmar con MAS y no sale`);
  }
}
if (!porConfirmar) log.ok("ni la fecha ni el nombre de la casa en pantalla");

// 7 · lo que falta oír (R31)
ojo("HZ19 suena entero: su 2.ª frase está sin oír («¡Aleluya!» o «¡A la lucha!», 3,6-5,5 s); no lleva tira");
ojo("«¡Compasivo!» de HZ05 15,0-15,5 s (la adolescente) lo oye whisper en el trozo aislado; el mapa lo daba por dudoso: confirmar de oído (sale en la columna)");

console.log("");
if (errores) {
  log.error(`${errores} error(es)${avisos ? ` y ${avisos} aviso(s)` : ""}: no se renderiza`);
  process.exit(1);
}
log.ok(`la puerta del 099 pasa${avisos ? ` con ${avisos} aviso(s) (con --final serían errores)` : ""}`);
