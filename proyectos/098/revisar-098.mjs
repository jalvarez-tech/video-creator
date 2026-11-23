#!/usr/bin/env node
/**
 * revisar-098.mjs — la puerta del 098 («Tú estás aquí», Fundación MAS). Sale con 0 o no se renderiza.
 *
 *   node proyectos/098/revisar-098.mjs
 *
 * Copia de `proyectos/097/revisar-097.mjs`, con lo que pide ESTE encargo encima de las puertas genéricas:
 *   0. la puerta del montaje (`revisar-metraje.mjs`, a 1920×1080) y la del audio (`revisar-audio.mjs`), las dos en verde;
 *   1. ningún tramo que suena deja oír el NOMBRE de una niña (ventanas medidas en los mapas, §7 de analisis-videos.md);
 *   2. ni VT32 ni VT19, ni VT11 (un nombre de niña y la voz del usuario), ni VT33 (su hogar); y VT36 no suena (alguien pregunta por la música);
 *   3. la MÚSICA: una sola pista, de corrido (trozos consecutivos del mismo archivo, sin hueco ni solape), dentro del
 *      párrafo 26,55-86,38 s, que NUNCA calla antes del fundido final y con ≤ 60 valores de volumen por trozo;
 *   4. la duración, 1 minuto ± 1 s;
 *   5. cada corte grande cae a ≤ 2 f de su golpe MEDIDO (`GOLPES_098`, comprobado contra `musica/golpes-6db.json`);
 *   6. las voces: no se pisan entre sí (salvo cruces de ≤ 6 f) y quedan parejas (cada una a ±1,5 dB del objetivo);
 *   7. la CUENTA, dígito a dígito con la que dio el usuario, y el celular en el paso 3;
 *   8. las fotos de `mas-098/` sin EXIF ni GPS (los HEIC llevan la posición de la casa);
 *   9. en pantalla, ni la fecha del encuentro ni «la Nuestra» (por confirmar con MAS).
 */
import fs from "node:fs";
import path from "node:path";
import { RAIZ, ejecutar, log } from "../../herramientas/comun.mjs";
import { cargaTs } from "../../remotion/src/motor/metraje/revisar-metraje.mjs";

const FPS = 30;
let errores = 0;
const mal = (m) => {
  errores++;
  log.error(m);
};

// 0 · las puertas genéricas
const generica = ejecutar("node", ["remotion/src/motor/metraje/revisar-metraje.mjs", "remotion/src/proyectos/098/metraje-098.ts", "--ancho", "1920", "--alto", "1080"], { cwd: RAIZ });
if (generica.status !== 0) {
  console.log(generica.stdout);
  mal("la puerta genérica del montaje no pasa");
} else log.ok("puerta genérica del montaje (1920×1080)");

const { m, a, tx, vz } = await cargaTs({
  m: "remotion/src/proyectos/098/metraje-098.ts",
  a: "remotion/src/proyectos/098/audio-098.ts",
  tx: "remotion/src/proyectos/098/textos-098.ts",
  vz: "remotion/src/proyectos/098/voces-098.ts",
});
const D = m.DURACION_098;
const audio = ejecutar("node", ["manuales/diseno-sonoro/scripts/revisar-audio.mjs", "remotion/src/proyectos/098/audio-098.ts", "--fps", String(FPS), "--duracion", String(D)], { cwd: RAIZ });
if (audio.status !== 0) {
  console.log(audio.stdout);
  mal("la puerta del audio no pasa");
} else log.ok("puerta del audio (forma, ganancias ≤ +6 dB, disco)");

// 1 · nombres: dónde se DICE un nombre de niña, en segundos de la fuente.
const NOMBRES = {
  "mas-097/vt07.wav": [[0.5, 2.9, "el ritual del micro (¿un nombre de niña?)"]],
  "mas-097/vt10.wav": [[0.0, 2.2, "un nombre de niña"]],
  "mas-097/vt11.wav": [[0.6, 4.4, "un nombre de niña"]],
  // VT06: el ritual del micro (0,1-2,1 s) acaba con algo flojo hacia 2,0 s que puede ser un nombre (mapa vertical).
  "mas-097/vt06.wav": [[0.0, 2.3, "el ritual del micro (¿un nombre hacia 2,0 s?)"]],
};
for (const t of a.audio098) {
  const s0 = t.desde ?? 0;
  const s1 = s0 + t.dur / FPS;
  for (const [n0, n1, quien] of NOMBRES[t.src] ?? []) if (s0 < n1 && s1 > n0) mal(`${t.id} deja oír un nombre: ${quien} (${n0}-${n1} s; el tramo suena de ${s0.toFixed(2)} a ${s1.toFixed(2)})`);
}
log.ok("ningún nombre de niña en lo que suena");

// 2 · clips que no entran
const PROHIBIDOS = {
  "mas-097/vt32": "VT32: el pecho de una menor pegado al objetivo",
  "mas-097/vt19": "VT19: datos de familia (solo con el sí de MAS)",
  "mas-097/vt11": "VT11: un nombre de niña y la voz del usuario («¿qué aprendiste de Dios este año?», 4,85-6,9 s)",
  "mas-097/vt33": "VT33: «mi hogar, donde yo vivo» (solo con el sí de MAS)",
};
for (const c of m.metraje098) for (const [k, por] of Object.entries(PROHIBIDOS)) if (c.src.startsWith(k)) mal(`${c.id}: ${por}`);
for (const t of a.audio098) {
  for (const [k, por] of Object.entries(PROHIBIDOS)) if (t.src.startsWith(k)) mal(`${t.id}: ${por}`);
  if (t.src.includes("vt36")) mal(`${t.id}: VT36 no suena (alguien pregunta por la música)`);
}
log.ok("ni VT32, ni VT19, ni VT11, ni VT33; VT36 mudo");

// 3 · la música
const musica = a.audio098.filter((t) => t.src === "mas-098/musica-tu-estas-aqui.wav").sort((x, y) => x.en - y.en);
const otras = a.audio098.filter((t) => !t.id.startsWith("voz-") && !musica.includes(t));
if (otras.length) mal(`tramos que no son voz ni la pista: ${otras.map((t) => t.id).join(", ")}`);
if (!musica.length) mal("no hay música");
else {
  if (musica[0].en !== 0) mal(`la música empieza en f${musica[0].en}, no en f0`);
  if (Math.abs(musica[0].desde - m.PISTA_DESDE) > 1e-6) mal(`la música arranca en ${musica[0].desde} s de la pista, no en ${m.PISTA_DESDE}`);
  for (let i = 1; i < musica.length; i++) {
    const p = musica[i - 1];
    const t = musica[i];
    if (t.en !== p.en + p.dur) mal(`${t.id} empieza en f${t.en} y ${p.id} acaba en f${p.en + p.dur}: hueco o solape`);
    const esperado = p.desde + p.dur / FPS;
    if (Math.abs(t.desde - esperado) > 1 / 48000) mal(`${t.id} arranca en ${t.desde} s de la pista y ${p.id} acaba en ${esperado.toFixed(6)}: la pista no sigue de corrido`);
  }
  const ultimo = musica[musica.length - 1];
  if (ultimo.en + ultimo.dur !== D) mal(`la música acaba en f${ultimo.en + ultimo.dur} y la comp en f${D}`);
  const fin = ultimo.desde + ultimo.dur / FPS;
  if (fin > 86.38) mal(`la música llega a ${fin.toFixed(2)} s de la pista: pisa el golpe de 86,40 s, donde entra la parte llena`);
  // Nunca calla: el volumen de la música en cada frame, fuera del fundido final.
  // `volumenDe` del motor (la misma cuenta que hace <PistaAudio>), cargado con el esbuild de Remotion.
  const { tr } = await cargaTs({ tr: "remotion/src/motor/sound/tramos.ts" });
  const vol = (t, f) => tr.volumenDe(t, f);
  let minimo = Infinity;
  let donde = -1;
  for (const t of musica) {
    const valores = new Set();
    for (let f = t.en; f < t.en + t.dur; f++) {
      const v = vol(t, f);
      valores.add(Math.round(v * 1000));
      if (f < D - 54 && f > 2 && v < minimo) {
        minimo = v;
        donde = f;
      }
    }
    if (valores.size > 60) mal(`${t.id}: ${valores.size} valores de volumen (> 60: la mezcla de ffmpeg se rompe)`);
  }
  if (minimo < 0.1) mal(`la música baja a ×${minimo.toFixed(3)} en f${donde}: casi calla`);
  else log.ok(`la música suena de corrido de ${m.PISTA_DESDE} a ${fin.toFixed(2)} s de la pista en ${musica.length} trozo(s), nunca por debajo de ×${minimo.toFixed(2)} (f${donde}) antes del fundido final`);
}

// 4 · un minuto
if (Math.abs(D - 1800) > 30) mal(`dura ${D} f (${(D / FPS).toFixed(1)} s): el encargo es 1 minuto ± 1 s`);
else log.ok(`dura ${D} f (${(D / FPS).toFixed(1)} s)`);

// 5 · los cortes en golpes medidos
const medidos = JSON.parse(fs.readFileSync(path.join(RAIZ, "proyectos/098/musica/golpes-6db.json"), "utf8")).golpes.map((g) => g[0]);
const cortes = new Set([...m.metraje098.map((c) => c.en), m.EMPIEZA_PAPEL]);
for (const [k, g] of Object.entries(m.GOLPES_098)) {
  if (!medidos.some((s) => Math.abs(s - g.pista) <= 0.01)) mal(`GOLPES_098.${k} (${g.pista} s) no está entre los golpes medidos`);
  if (Math.round((g.pista - m.PISTA_DESDE) * FPS) !== g.f) mal(`GOLPES_098.${k}: ${g.pista} s es f${Math.round((g.pista - m.PISTA_DESDE) * FPS)}, no f${g.f}`);
  if (k === "cima" || k === "ultimaFrase") continue; // no son cortes: la estrella y la firma
  if (![...cortes].some((f) => Math.abs(f - g.f) <= 2)) mal(`ningún corte cae a ≤ 2 f del golpe «${k}» (f${g.f})`);
}
const sinGolpe = [...cortes].filter((f) => f > 0 && !Object.values(m.GOLPES_098).some((g) => Math.abs(g.f - f) <= 2));
log.ok(`los cortes grandes caen en golpes medidos${sinGolpe.length ? ` (sin golpe, a propósito: f${sinGolpe.join(", f")} — dentro de una misma toma)` : ""}`);
if (tx.ESTRELLA.aparece !== m.GOLPES_098.cima.f) mal(`la estrella aparece en f${tx.ESTRELLA.aparece} y la cima de la música está en f${m.GOLPES_098.cima.f}`);
if (tx.CTA.firma !== m.GOLPES_098.ultimaFrase.f) mal(`la firma entra en f${tx.CTA.firma} y la última frase en f${m.GOLPES_098.ultimaFrase.f}`);

// 6 · las voces: sin pisarse y parejas
const voces = a.audio098.filter((t) => t.id.startsWith("voz-")).sort((x, y) => x.en - y.en);
for (let i = 1; i < voces.length; i++) {
  const solape = voces[i - 1].en + voces[i - 1].dur - voces[i].en;
  if (solape > 6) mal(`${voces[i - 1].id} y ${voces[i].id} suenan a la vez ${solape} f`);
}
for (const t of voces) {
  const lufs = vz.VOCES_098[t.id]?.lufs;
  if (lufs == null) {
    mal(`${t.id}: sin medir (node proyectos/098/herramientas/medir-voces.mjs)`);
    continue;
  }
  const queda = lufs + 20 * Math.log10(t.ganancia);
  if (Math.abs(queda - a.OBJETIVO_VOZ) > 1.5) mal(`${t.id} queda a ${queda.toFixed(1)} LUFS, a más de 1,5 dB de ${a.OBJETIVO_VOZ}`);
}
log.ok(`las voces no se pisan y quedan a ±1,5 dB de ${a.OBJETIVO_VOZ} LUFS`);

// 7 · la cuenta, dígito a dígito (la dio el usuario el 2026-11-22; si da otra, se cambia AQUÍ y en textos-098.ts a la vez)
const CUENTA_ESPERADA = { banco: "Bancolombia", tipo: "Cuenta de ahorros", numero: "928 0000 1770", nit: "900 280 179-4", celular: "314 520 56 56" };
let cuentaBien = true;
for (const [k, v] of Object.entries(CUENTA_ESPERADA)) {
  if (tx.CUENTA?.[k] !== v) {
    cuentaBien = false;
    mal(`CUENTA.${k} es «${tx.CUENTA?.[k]}» y el usuario dio «${v}»`);
  }
}
const paso3 = tx.CTA.pasos[2]?.linea ?? "";
if (!paso3.includes(CUENTA_ESPERADA.celular)) {
  cuentaBien = false;
  mal(`el paso 3 no lleva el celular ${CUENTA_ESPERADA.celular} («${paso3}»)`);
}
const papel = fs.readFileSync(path.join(RAIZ, "remotion/src/proyectos/098/Papel098.tsx"), "utf8");
for (const k of ["CUENTA.numero", "CUENTA.nit", "CUENTA.banco", "CUENTA.tipo"]) if (!papel.includes(k)) mal(`Papel098.tsx no pinta ${k}: la cuenta no sale de CUENTA`);
if (/\d{3} \d{4} \d{4}|\d{3} \d{3} \d{3}-\d/.test(papel)) mal("Papel098.tsx lleva una cifra de cuenta escrita a mano: tiene que salir de CUENTA");
if (cuentaBien) log.ok(`la cuenta (${CUENTA_ESPERADA.numero}, NIT ${CUENTA_ESPERADA.nit}) y el celular (${CUENTA_ESPERADA.celular}) son los que dio el usuario`);

// 8 · las fotos, sin EXIF ni GPS
for (const archivo of fs.readdirSync(path.join(RAIZ, "remotion/public/mas-098")).filter((x) => /\.(jpe?g|png)$/i.test(x))) {
  const b = fs.readFileSync(path.join(RAIZ, "remotion/public/mas-098", archivo));
  if (b.includes(Buffer.from("Exif\0\0")) || b.includes(Buffer.from("GPS"))) mal(`mas-098/${archivo} lleva EXIF (y puede llevar el GPS de la casa)`);
}
log.ok("las fotos de mas-098/ no llevan EXIF ni GPS");

// 9 · lo que está por confirmar con MAS no sale en pantalla
const pantalla = ["textos-098.ts", "Graficos098.tsx", "Papel098.tsx"].map((x) => fs.readFileSync(path.join(RAIZ, "remotion/src/proyectos/098", x), "utf8")).join("\n");
if (/20 de noviembre de 2026/.test(pantalla)) mal("en pantalla sale «20 de noviembre de 2026» (por confirmar con MAS)");
if (/la Nuestra/i.test(pantalla.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, ""))) mal("en pantalla sale «la Nuestra» (por confirmar con MAS)");
log.ok("ni la fecha del encuentro ni «la Nuestra» en pantalla");

console.log("");
if (errores) {
  log.error(`${errores} error(es): no se renderiza`);
  process.exit(1);
}
log.ok("la puerta del 098 pasa");
