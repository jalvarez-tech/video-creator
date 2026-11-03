#!/usr/bin/env node
/**
 * elegir-cancion.mjs — de dónde empezar cada canción para que su CRESCENDO caiga donde el montaje lo pide.
 *
 *   node proyectos/069/herramientas/elegir-cancion.mjs [duración en s, defecto 67]
 *
 * Lee las curvas de `proyectos/069/musica/curvas/` (las deja `curva-cancion.mjs`) y, para cada canción y cada segundo de arranque posible, compara la forma de su sonoridad
 * con la que pide la pieza. La pieza abierta (SIN voz encima) es: las fotos felices (0-4,5 s), el incendio (4,5-8), el antes y después (17-23,5), el amor y las familias
 * (23,5-36), el mensaje final (45-57,5) y la tarjeta (57,5-fin). Donde hablan ellos (8-17 y 36-45 s) la música va por debajo y su forma da igual.
 *
 * `OBJETIVO` es la sonoridad deseada (dB relativos, 0 = el pico de la pieza) en esos tramos abiertos. Se puntúa con la CORRELACIÓN (la forma, no el nivel absoluto: el nivel
 * lo pone la ganancia) y se exige que la ventana tenga rango dinámico real (≥ 6 dB entre lo más bajo y el pico) y que la canción no se acabe antes. NO oye la canción: dice
 * dónde cae su subida, y la elección final la confirma el catálogo (género y sentimiento) y la prueba que oye el usuario.
 */
import fs from "node:fs";
import path from "node:path";
import { RAIZ } from "../../../herramientas/comun.mjs";

const DUR = Number(process.argv[2] ?? 72);
/** [desde s, hasta s, dB al empezar, dB al acabar]: lo que la pieza pide de la música cuando NO hay voz encima. */
const OBJETIVO = [
  [0, 6.9, -6, -9], // las fotos felices: cálida, y se va apagando antes del fuego
  [6.9, 11.5, -11, -12], // el incendio: cae y se queda en el vacío
  [20.4, 25, -12, -10], // entra el lugar quemado: contenida
  [25, 41.2, -10, -4], // el lugar, el amor, las familias: sube sin pausa
  [49.8, 62.2, -4, 0], // el mensaje final: el clímax
  [62.2, DUR, 0, -7], // la tarjeta: se aquieta
];
const objetivoEn = (t) => {
  for (const [a, b, x, y] of OBJETIVO) if (t >= a && t < b) return x + ((y - x) * (t - a)) / (b - a);
  return null;
};

const dir = path.join(RAIZ, "proyectos", "069", "musica", "curvas");
const filas = [];
for (const f of fs.readdirSync(dir).filter((n) => n.endsWith(".json"))) {
  const { archivo, duracion, db } = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
  // Suaviza 3 s (la sonoridad momentánea tiembla con cada nota).
  const suave = db.map((_, i) => {
    const v = db.slice(Math.max(0, i - 1), i + 2);
    return 10 * Math.log10(v.reduce((s, x) => s + 10 ** (x / 10), 0) / v.length);
  });
  for (let s0 = 0; s0 + DUR <= duracion; s0++) {
    const xs = [];
    const ys = [];
    for (let t = 0; t < DUR; t++) {
      const o = objetivoEn(t + 0.5);
      if (o === null) continue;
      xs.push(o);
      ys.push(suave[s0 + t]);
    }
    const mx = xs.reduce((a, b) => a + b, 0) / xs.length;
    const my = ys.reduce((a, b) => a + b, 0) / ys.length;
    let sxy = 0, sxx = 0, syy = 0;
    xs.forEach((x, i) => {
      sxy += (x - mx) * (ys[i] - my);
      sxx += (x - mx) ** 2;
      syy += (ys[i] - my) ** 2;
    });
    const r = sxy / Math.sqrt(sxx * syy || 1);
    const ventana = suave.slice(s0, s0 + DUR);
    const alto = Math.max(...ventana);
    const bajo = Math.min(...ventana.slice(2, -2));
    // El suelo de «silencio» (−60 o menos en los primeros segundos de una pista) no cuenta como rango: es la intro vacía.
    const rango = alto - bajo;
    const pico = ventana.indexOf(alto);
    // El arranque: en el segundo 0 ya tiene que sonar (la miniatura es una foto y la música abre con ella).
    const arranque = ventana[0];
    filas.push({ cancion: archivo.replace(/\.mp3$/, "").slice(0, 52), s0, r, rango, pico, arranque, alto });
  }
}
const validas = filas.filter((x) => x.rango >= 6 && x.arranque > -40);
const mejorPorCancion = new Map();
for (const f of validas) if (!mejorPorCancion.has(f.cancion) || f.r > mejorPorCancion.get(f.cancion).r) mejorPorCancion.set(f.cancion, f);
const orden = [...mejorPorCancion.values()].sort((a, b) => b.r - a.r);
console.log(`Ventana de ${DUR} s · correlación con la forma pedida (1 = idéntica)\n`);
console.log("canción".padEnd(54), "desde".padStart(6), "     r", "rango", " pico en", "  inicio dB");
for (const f of orden.slice(0, 40)) {
  const m = Math.floor(f.s0 / 60), s = String(f.s0 % 60).padStart(2, "0");
  console.log(f.cancion.padEnd(54), `${m}:${s}`.padStart(6), f.r.toFixed(2).padStart(6), `${f.rango.toFixed(0)} dB`.padStart(5), `${f.pico} s`.padStart(8), f.arranque.toFixed(1).padStart(10));
}
