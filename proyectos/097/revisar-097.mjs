#!/usr/bin/env node
/**
 * revisar-097.mjs — la puerta del 097 («Lo más bonito de un regalo», Fundación MAS). Sale con 0 o no se renderiza.
 *
 *   node proyectos/097/revisar-097.mjs            (prueba: lo que falta de MAS es aviso)
 *   node proyectos/097/revisar-097.mjs --final    (final: lo que falta de MAS es error)
 *
 * Encima de la puerta genérica del montaje (`revisar-metraje.mjs`: huecos, metraje disponible, encuadre), lo que
 * pide ESTE encargo (03-timeline §Puertas de control y analisis-videos.md §7):
 *   1. ningún tramo que suena deja oír el NOMBRE de una niña (las ventanas, medidas en los mapas);
 *   2. VT32 no entra nunca (el pecho de una menor pegado al objetivo), ni VT19/VT33 en imagen sin el sí de MAS;
 *   3. la voz en off nunca suena a la vez que una niña;
 *   4. con `--final`: ni un «por confirmar» en pantalla (la página de donación, el QR, la firma provisional) y la voz en off grabada.
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
const generica = ejecutar("node", ["remotion/src/motor/metraje/revisar-metraje.mjs", "remotion/src/proyectos/097/metraje-097.ts"], { cwd: RAIZ });
if (generica.status !== 0) mal("la puerta genérica del montaje no pasa (node remotion/src/motor/metraje/revisar-metraje.mjs remotion/src/proyectos/097/metraje-097.ts)");
else log.ok("puerta genérica del montaje");

const { m, a } = await cargaTs({ m: "remotion/src/proyectos/097/metraje-097.ts", a: "remotion/src/proyectos/097/audio-097.ts" });

/** Dónde se DICE un nombre de niña, en segundos de la fuente normalizada (mapas, §7 de analisis-videos.md). */
const NOMBRES = {
  "mas-097/vt07.wav": [[0.5, 2.9, "el ritual del micro (¿un nombre de niña?)"]],
  // «…por [nombre]» acaba en 2,12 s (energía a 20 ms, rev. 8); silencio hasta 2,40, donde empieza «¿Qué aprendiste…?».
  "mas-097/vt10.wav": [[0.0, 2.2, "un nombre de niña"]],
  "mas-097/vt11.wav": [[0.6, 4.4, "un nombre de niña"]],
};
/** Clips que nunca entran, o solo con el sí de MAS. */
const PROHIBIDOS = { "mas-097/vt32": "VT32: el pecho de una menor pegado al objetivo", "mas-097/vt19": "VT19: datos de familia (solo con el sí de MAS)" };

// 1 · nombres
for (const t of a.audio097) {
  const ventanas = NOMBRES[t.src];
  if (!ventanas) continue;
  const s0 = t.desde ?? 0;
  const s1 = s0 + t.dur / FPS;
  for (const [n0, n1, quien] of ventanas) if (s0 < n1 && s1 > n0) mal(`${t.id} deja oír un nombre: ${quien} (${n0}-${n1} s de la fuente; el tramo suena de ${s0.toFixed(2)} a ${s1.toFixed(2)})`);
}
log.ok("ningún nombre de niña en lo que suena");

// 2 · clips prohibidos
for (const c of m.metraje097) for (const [k, por] of Object.entries(PROHIBIDOS)) if (c.src.startsWith(k)) mal(`${c.id}: ${por}`);
for (const t of a.audio097) if (t.src.includes("vt19")) mal(`${t.id}: VT19 suena sin el sí de MAS`);
log.ok("ni VT32 ni VT19");

// 3 · la voz en off no pisa a una niña
const ninas = a.audio097.filter((t) => t.id.startsWith("voz-") || t.id === "vo-pregunta" || t.id === "vo-gracias");
for (const vo of a.VOZ_EN_OFF) for (const n of ninas) if (vo.en < n.en + n.dur && vo.en + vo.dur > n.en) mal(`${vo.id} suena a la vez que ${n.id} (f${Math.max(vo.en, n.en)}-f${Math.min(vo.en + vo.dur, n.en + n.dur)})`);
if (!a.VOZ_EN_OFF.length) ojo("la voz en off aún no está: sus frases van solo en las tiras índigo (HUECOS_VO en audio-097.ts)");
else log.ok("la voz en off no pisa a ninguna niña");

// 4 · lo que falta de MAS
const papel = fs.readFileSync(path.join(RAIZ, "remotion/src/proyectos/097/Papel097.tsx"), "utf8");
// La página de donación ya no sale en pantalla (rev. 10, pedido del usuario): no hay nada que comprobar de ella.
// La CUENTA para donar mueve dinero: se compara dígito a dígito con lo que dio el usuario (2026-11-22). Si alguien
// la cambia en `textos-097.ts`, esta puerta lo para; si el usuario da otra, se cambia AQUÍ y allí, a la vez.
const CUENTA_ESPERADA = { banco: "Bancolombia", tipo: "Cuenta de ahorros", numero: "928 0000 1770", nit: "900 280 179-4", celular: "314 520 56 56" };
const { tx } = await cargaTs({ tx: "remotion/src/proyectos/097/textos-097.ts" });
for (const [k, v] of Object.entries(CUENTA_ESPERADA)) {
  if (tx.CUENTA?.[k] !== v) mal(`CUENTA.${k} es «${tx.CUENTA?.[k]}» y el usuario dio «${v}»`);
}
const paso3 = tx.PASOS.pasos[2]?.linea ?? "";
if (!paso3.includes(CUENTA_ESPERADA.celular)) mal(`el paso 3 no lleva el celular ${CUENTA_ESPERADA.celular} («${paso3}»)`);
if (!errores) log.ok(`la cuenta (${CUENTA_ESPERADA.numero}, NIT ${CUENTA_ESPERADA.nit}) y el celular (${CUENTA_ESPERADA.celular}) son los que dio el usuario`);
if (/QrPapel|qr-donaciones/.test(papel)) mal("el QR se quitó en la rev. 5 (pedido del usuario) y Papel097.tsx lo sigue usando");
if (papel.includes("firma-provisional.png")) ojo("la firma CSR | MAS es un recorte provisional del cartel: faltan los logos de MAS en buena resolución");
const textos = fs.readFileSync(path.join(RAIZ, "remotion/src/proyectos/097/textos-097.ts"), "utf8");
if (textos.includes("[POR CONFIRMAR CON MAS: si se puede fechar y nombrar la casa]")) ojo("la fecha «20 de noviembre de 2026» y el nombre «la Nuestra» en pantalla están por confirmar con MAS");

console.log("");
if (errores) {
  log.error(`${errores} error(es)${avisos ? ` y ${avisos} aviso(s)` : ""}: no se renderiza`);
  process.exit(1);
}
log.ok(`la puerta del 097 pasa${avisos ? ` con ${avisos} aviso(s) (con --final serían errores)` : ""}`);
