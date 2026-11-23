#!/usr/bin/env node
/**
 * revisar-historias.mjs — la puerta de las historias verticales de MAS (101-104). Sale con 0 o no se renderiza.
 *
 *   node proyectos/101/revisar-historias.mjs <101|102|103|104|todas> [--final]
 *
 * Encima de las puertas genéricas, lo que pide ESTE encargo (y lo que ya se aprendió en 097-100):
 *   0. la puerta del montaje (`revisar-metraje.mjs`, a 1080×1920) y la del audio (`revisar-audio.mjs`), en verde;
 *   1. ningún tramo que suena deja oír el NOMBRE de una niña, ni la VOZ del usuario (el adulto de VT11);
 *   2. ni VT32 ni VT19; de VT11, solo la imagen RECORTADA (`vt11c`: entero sale el usuario); VT33 solo en la 104; ni
 *      el adulto de VT29; y el 105 (rev. 2), ninguna toma que ya salga en 097-104;
 *   3. la MÚSICA: una pista, de corrido (trozos consecutivos del mismo archivo), ≤ 60 valores de volumen por trozo;
 *   4. la duración (los cortos, 15-35 s; el largo, 105, 40-90 s) y el cierre en papel de 6 s;
 *   5. las TIRAS: dentro del vídeo, sin pisarse en su zona, de dos líneas como mucho, con un acento y su trazo dentro;
 *      cada tira de abajo cae sobre una voz medida;
 *   6. la CUENTA, dígito a dígito con la que dio el usuario;
 *   7. las fotos de `mas-101/` sin EXIF ni GPS (los HEIC llevan la posición de la casa);
 *   8. con `--final`: nada «POR CONFIRMAR» (palabras sin oír) y, en la 104, el sí de MAS a «la Nuestra» y a
 *      «donde yo vivo» (097 §7). Falla A PROPÓSITO hasta que estén.
 */
import fs from "node:fs";
import path from "node:path";
import { RAIZ, ejecutar, log } from "../../herramientas/comun.mjs";
import { cargaTs } from "../../remotion/src/motor/metraje/revisar-metraje.mjs";

const args = process.argv.slice(2);
const FINAL = args.includes("--final");
const cual = args.find((x) => !x.startsWith("--"));
const NUMEROS = cual === "todas" ? ["101", "102", "103", "104", "105"] : /^10[1-5]$/.test(cual ?? "") ? [cual] : null;
if (!NUMEROS) {
  console.error("uso: node proyectos/101/revisar-historias.mjs <101|102|103|104|105|todas> [--final]");
  process.exit(2);
}
const FPS = 30;
const PUB = path.join(RAIZ, "remotion", "public");

/** Dónde se DICE un nombre de niña, o habla el usuario, en segundos de la fuente (mapas y §7 de analisis-videos.md). */
const NO_SUENA = {
  "mas-101/vt07.wav": [[0.5, 2.9, "el ritual del micro (¿un nombre de niña?)"], [18.9, 21.7, "«Bueno, aquí está mi… ¡chao!» (satura)"]],
  "mas-101/vt10.wav": [[0.0, 2.2, "un nombre de niña"]],
  "mas-101/vt11.wav": [[0.0, 4.4, "un nombre de niña (lo dice el usuario)"], [4.8, 6.95, "la pregunta del USUARIO"], [12.4, 23.7, "el USUARIO otra vez"]],
  "mas-101/vt06.wav": [[0.0, 2.3, "el ritual del micro (¿un nombre hacia 2,0 s?)"]],
  "mas-101/hz18.wav": [[0.9, 4.0, "un nombre de niña"], [7.92, 9.0, "«¡Chao!»"]],
  "mas-101/hz19.wav": [[3.34, 5.8, "la segunda frase (¿«Aleluya»? ¿«A la lucha»?), sin oír"]],
  "mas-101/vt33.wav": [[4.44, 5.7, "«donde ya [¿curamos?]» (sin entender)"]],
  "mas-101/hz32.wav": [[0.0, 0.6, "el «¡Tres!» de la cuenta atrás (un adulto)"]],
  "mas-101/vt13.wav": [[3.75, 5.4, "«¡Ah, bueno, gracias!» y el «¡Chao!» (lo más fuerte de la toma)"]],
  "mas-101/vt18.wav": [[2.6, 4.2, "«…con [nombre]» (un nombre de niña)"], [5.3, 11.9, "risas y gritos saturados"], [32.7, 34.25, "lo que no se entiende antes de «Un conejo»"], [38.9, 44.2, "lo que no se entiende antes de «Un colibrí»"], [53.5, 55.2, "«Suzuki» (una marca)"]],
  "mas-101/hz07.wav": [[2.9, 5.0, "«porque me dio oportunidad en la pobreza» (097 §6-§7: sensible, pide el sí de MAS)"]],
  "mas-101/hz04.wav": [[13.2, 16.3, "lo que no se entiende tras «Un Dios inmortal» (whisper inventa «¿Quién es tu mamá?»)"]],
};
/** Dónde se VE lo que no puede salir, en segundos de la fuente. */
const NO_SE_VE = {
  "mas-101/vt29.mp4": [[10.5, 17.0, "el adulto al que peinan (¿el usuario?)"]],
};
/** El 105 (rev. 2) no repite tomas: pedido del usuario del 2026-11-23, «en el último utiliza tomas que no había en los
 * anteriores». Toma = el clip de origen, sin la letra de su franja (hz05a → hz05, vt06b → vt06, vt11c → vt11). */
const SIN_REPETIR = { "105": ["097", "098", "099", "100", "101", "102", "103", "104"] };
const tomaDe = (src) => src.match(/((?:hz|vt|dr|ft)\d{2})[a-z]?\.(?:mp4|jpg|png)$/)?.[1] ?? null;
const tomasDe = (n) => {
  const dir = path.join(RAIZ, "remotion", "src", "proyectos", n);
  const tomas = new Set();
  for (const f of fs.readdirSync(dir).filter((x) => /\.tsx?$/.test(x) && !/^voces-/.test(x))) {
    // Solo lo que va ENTRE COMILLAS y en minúsculas (src y `v("hz05")`): los comentarios citan tomas en mayúsculas.
    for (const m of fs.readFileSync(path.join(dir, f), "utf8").matchAll(/"(?:mas-\d+\/)?((?:hz|vt|dr|ft)\d{2})[a-z]?(?:\.\w+)?"/g)) tomas.add(m[1]);
  }
  return tomas;
};
const CUENTA_ESPERADA = { banco: "Bancolombia", tipo: "Cuenta de ahorros", numero: "928 0000 1770", nit: "900 280 179-4", celular: "314 520 56 56" };

let errores = 0;
for (const n of NUMEROS) {
  console.log(`\n── ${n} ──`);
  const mal = (m) => {
    errores++;
    log.error(`${n}: ${m}`);
  };
  const plan = `remotion/src/proyectos/${n}/historia-${n}.ts`;

  // 0 · las puertas genéricas
  const g = ejecutar("node", ["remotion/src/motor/metraje/revisar-metraje.mjs", plan, `metraje${n}`, "--ancho", "1080", "--alto", "1920"], { cwd: RAIZ });
  if (g.status !== 0) {
    console.log(g.stdout);
    mal("la puerta genérica del montaje no pasa");
  } else log.ok("puerta genérica del montaje (1080×1920)");
  const { h, tx } = await cargaTs({ h: plan, tx: "remotion/src/proyectos/097/textos-097.ts" });
  const H = h[`HISTORIA_${n}`];
  const audio = h[`audio${n}`];
  const au = ejecutar("node", ["manuales/diseno-sonoro/scripts/revisar-audio.mjs", plan, "--fps", String(FPS), "--duracion", String(H.duracion)], { cwd: RAIZ });
  if (au.status !== 0) {
    console.log(au.stdout);
    mal("la puerta del audio no pasa");
  } else log.ok("puerta del audio (forma, ganancias ≤ +6 dB, disco)");

  // 1 · nombres y la voz del usuario
  for (const t of audio) {
    const s0 = t.desde ?? 0;
    const s1 = s0 + t.dur / FPS;
    for (const [a, b, que] of NO_SUENA[t.src] ?? []) if (s0 < b && s1 > a) mal(`${t.id} deja oír ${que} (${a}-${b} s; suena de ${s0.toFixed(2)} a ${s1.toFixed(2)})`);
  }
  log.ok("ni nombres de niñas, ni la voz del usuario, ni lo que no se entiende");

  // 2 · clips que no entran
  for (const c of H.cortes) {
    if (/vt32|vt19/.test(c.src)) mal(`${c.id}: VT32 y VT19 no se usan`);
    if (/\/vt11\.mp4$/.test(c.src)) mal(`${c.id}: VT11 entero enseña al usuario; va la franja recortada (vt11c)`);
    if (/vt33/.test(c.src) && n !== "104") mal(`${c.id}: VT33 («mi hogar, donde yo vivo») solo en la 104`);
    const s0 = c.desde ?? 0;
    const s1 = s0 + c.dur / FPS;
    for (const [a, b, que] of NO_SE_VE[c.src] ?? []) if (s0 < b && s1 > a) mal(`${c.id} enseña ${que} (${a}-${b} s; va de ${s0.toFixed(2)} a ${s1.toFixed(2)})`);
  }
  log.ok("ni VT32 ni VT19; VT11 solo recortada; VT33 solo en la 104; nada de lo que no puede verse");
  if (SIN_REPETIR[n]) {
    const usadas = new Map();
    for (const otro of SIN_REPETIR[n]) for (const t of tomasDe(otro)) usadas.set(t, [...(usadas.get(t) ?? []), otro]);
    const repetidas = [...new Set(H.cortes.map((c) => tomaDe(c.src)).filter((t) => t && usadas.has(t)))];
    for (const t of repetidas) mal(`${t.toUpperCase()} ya sale en ${usadas.get(t).join(", ")} (el ${n} solo lleva tomas nuevas)`);
    if (!repetidas.length) log.ok(`ninguna toma repetida de ${SIN_REPETIR[n][0]}-${SIN_REPETIR[n].at(-1)} (${usadas.size} tomas usadas allí)`);
  }

  // 3 · la música
  const mus = audio.filter((t) => t.id.startsWith("musica"));
  let fin = 0;
  for (const t of mus) {
    if (t.src !== H.musica.src) mal(`${t.id}: otra pista (${t.src})`);
    if (t.en !== fin) mal(`${t.id}: empieza en f${t.en}, el anterior acaba en f${fin} (hueco o solape)`);
    const esperado = +(H.musica.desde + t.en / FPS).toFixed(6);
    if (Math.abs((t.desde ?? 0) - esperado) > 1e-4) mal(`${t.id}: desde ${t.desde}, debería seguir en ${esperado}`);
    const valores = new Set();
    for (let f = t.en; f < t.en + t.dur; f++) valores.add(Math.round(nivel(t, f) * 1000));
    if (valores.size > 60) mal(`${t.id}: ${valores.size} valores de volumen (> 60: ffmpeg revienta)`);
    fin = t.en + t.dur;
  }
  if (fin !== H.duracion) mal(`la música acaba en f${fin}, el vídeo en f${H.duracion}`);
  else log.ok(`música de corrido («${H.musica.titulo}», ${mus.length} trozos consecutivos)`);

  // 4 · duración y cierre
  const seg = H.duracion / FPS;
  // 101-104 son clips cortos; 105 es el vídeo vertical LARGO de la serie (pedido del 2026-11-23).
  const [minimo, maximo] = n === "105" ? [40, 90] : [15, 35];
  if (seg < minimo || seg > maximo) mal(`dura ${seg.toFixed(1)} s (${n === "105" ? "el largo" : "un clip corto"}: ${minimo}-${maximo} s)`);
  if (H.duracion - H.cierre !== 180) mal(`el cierre dura ${H.duracion - H.cierre} f (6 s = 180 f)`);
  // El último plano sigue COLA_CIERRE frames bajo el papel que sube (sin él, en la subida se ve el fondo liso).
  const ultimoCorte = Math.max(...H.cortes.map((c) => c.en + c.dur));
  if (ultimoCorte !== H.cierre + 12) mal(`el metraje acaba en f${ultimoCorte}: tiene que seguir 12 f bajo el papel (f${H.cierre + 12})`);
  for (const v of H.voces) if (v.en + v.dur > H.cierre) mal(`${v.id} suena bajo el papel (acaba en f${v.en + v.dur})`);
  log.ok(`${seg.toFixed(1)} s, el papel en f${H.cierre}`);

  // 5 · las tiras
  const medidas = (await cargaTs({ v: `remotion/src/proyectos/${n}/voces-${n}.ts` })).v[`VOCES_${n}`];
  for (const zona of ["arriba", "abajo"]) {
    const ts = [...H[zona]].sort((a, b) => a.en - b.en);
    ts.forEach((t, i) => {
      if (t.en < 0 || t.sale > H.cierre || t.sale <= t.en) mal(`${t.id}: f${t.en}-f${t.sale} fuera del metraje`);
      if (i > 0 && t.en < ts[i - 1].sale) mal(`${t.id} pisa a ${ts[i - 1].id} (${zona})`);
      const limpio = t.texto.replace(/\*/g, "");
      if (limpio.length > (zona === "arriba" ? 46 : 62)) mal(`${t.id}: ${limpio.length} caracteres (más de dos líneas)`);
      const acentos = (t.texto.match(/\*/g) ?? []).length / 2;
      if (acentos > 1) mal(`${t.id}: ${acentos} acentos (uno como mucho)`);
      for (const m of t.marcas ?? []) if (m && (m.en < t.en || m.en >= t.sale - 6)) mal(`${t.id}: el trazo (f${m.en}) cae fuera de su tira`);
      if (zona === "abajo") {
        const sobreVoz = Object.values(medidas).some((v) => v.f0 !== null && v.f1 !== null && v.f0 < t.sale && v.f1 > t.en);
        if (!sobreVoz) mal(`${t.id}: no cae sobre ninguna voz medida`);
      }
    });
  }
  log.ok(`tiras: ${H.arriba.length} arriba, ${H.abajo.length} abajo`);

  // 6 · la cuenta
  for (const [k, v] of Object.entries(CUENTA_ESPERADA)) if (tx.CUENTA[k] !== v) mal(`CUENTA.${k} = «${tx.CUENTA[k]}», debería ser «${v}»`);
  log.ok(`la cuenta, dígito a dígito (${tx.CUENTA.numero} · NIT ${tx.CUENTA.nit} · ${tx.CUENTA.celular})`);

  // 7 · fotos sin EXIF
  for (const c of H.cortes.filter((c) => c.tipo === "foto")) {
    const buf = fs.readFileSync(path.join(PUB, c.src));
    if (buf.includes(Buffer.from("Exif\0\0")) || buf.includes(Buffer.from("GPS"))) mal(`${c.src} lleva EXIF (¿el GPS de la casa?)`);
  }
  log.ok("fotos sin EXIF");

  // 8 · lo que falta para la final
  const pendientes = [...H.arriba, ...H.abajo, ...H.cortes, ...H.voces].filter((x) => /POR CONFIRMAR/.test(x.reason)).map((x) => x.id);
  const deMas = [];
  if (n === "104") deMas.push("VT33: «la Nuestra» y «donde yo vivo» (097 §7)");
  if ([...H.arriba, ...H.abajo].some((t) => /la Nuestra/i.test(t.texto)) && n !== "104") deMas.push("«la Nuestra» en pantalla");
  const aviso = [pendientes.length ? `sin oír: ${pendientes.join(", ")}` : null, deMas.length ? `de MAS: ${deMas.join("; ")}` : null].filter(Boolean).join(" · ");
  if (aviso) (FINAL ? mal : log.aviso)(`para la final falta ${aviso}`);
}

/** El volumen de un tramo en un frame (lo que pinta Remotion): ganancia fija o envolvente lineal. */
function nivel(t, f) {
  const g = t.ganancia;
  if (!Array.isArray(g)) return g ?? 1;
  if (f <= g[0][0]) return g[0][1];
  for (let i = 1; i < g.length; i++) if (f <= g[i][0]) return g[i - 1][1] + ((g[i][1] - g[i - 1][1]) * (f - g[i - 1][0])) / (g[i][0] - g[i - 1][0]);
  return g[g.length - 1][1];
}

if (errores) {
  log.error(`${errores} fallo(s)`);
  process.exit(1);
}
log.ok(FINAL ? "lista para la final" : "lista para la prueba");
