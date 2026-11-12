#!/usr/bin/env node
/**
 * montar-retiro.mjs — levanta (y vuelve a levantar) el plan de planos y el audio de una pieza de «Casa El Retiro · Senderos de Compostela» (088 · 089 · 090).
 *
 *   node proyectos/088/herramientas/montar-retiro.mjs 088 --solo-plan   imprime dónde cae cada corte (sobre los golpes medidos) sin escribir nada
 *   node proyectos/088/herramientas/montar-retiro.mjs 088               escribe `metraje-088.ts` y `audio-088.ts`
 *   node proyectos/088/herramientas/montar-retiro.mjs 088 --medir       además mide la música (ebur128) en las ventanas nuevas y deja `proyectos/088/medidas/ventanas-musica.json`
 *
 * LEE `proyectos/NNN/pieza.json` (lo que se DECIDE: qué clip va en cada plano, desde qué segundo, qué dura como mucho y como poco, qué dice Isabella en cada toma) y
 * `proyectos/NNN/musica/golpes-cancion-entera.json` (los golpes MEDIDOS de la pista, de `medir-pista.py --json`).
 *
 * POR QUÉ UN GENERADOR. Son tres piezas con la misma estructura (`recorrido-luxur` §3: lo vendible antes del segundo 10) y los mismos números por dentro (golpes, voces, niveles de la música).
 * Escribir a mano tres `metraje` de 400 líneas desalinea los frames; aquí la lógica del reparto —que cada cambio de plano caiga en un golpe MEDIDO de su canción— está escrita una sola vez
 * y cada pieza es un `pieza.json` de unas 80 líneas. (Igual que `proyectos/080/herramientas/montar-pieza.mjs` en la rama de la suite Go Living, pero sin su `origen.json`: aquí no hay pieza original.)
 *
 * EL REPARTO DE LOS CORTES. Por programación dinámica sobre los golpes de la pista: cada entrada de plano (el hook, los dos planos rápidos, la mitad, el recorrido, el CTA) es un golpe medido de
 * al menos `umbrales.seco` dB; cada plano dura entre su `min` y su `max` (lo que le queda de clip, o lo que pide la voz de su toma) y se acerca a su `objetivo`; las `entradaMax` de los planos rápidos
 * y de la mitad cumplen «lo vendible antes del segundo 10»; el último plano del recorrido (la vista) es el más largo de su bloque.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const N = process.argv[2];
const SOLO_PLAN = process.argv.includes("--solo-plan");
const MEDIR = process.argv.includes("--medir");
if (!/^\d{3}$/.test(N ?? "")) {
  console.error("uso: node proyectos/088/herramientas/montar-retiro.mjs NNN [--solo-plan] [--medir]");
  process.exit(1);
}
const FPS = 30;
const lee = (rel) => fs.readFileSync(path.join(RAIZ, rel), "utf8");
const escribe = (rel, texto) => {
  if (SOLO_PLAN) return;
  fs.mkdirSync(path.dirname(path.join(RAIZ, rel)), { recursive: true });
  fs.writeFileSync(path.join(RAIZ, rel), texto);
};
const P = JSON.parse(lee(`proyectos/${N}/pieza.json`));
const GOLPES = JSON.parse(lee(`proyectos/${N}/musica/golpes-cancion-entera.json`)).golpes;
const PUB = path.join(RAIZ, "remotion", "public", `recorrido-${N}`);
const ARG_SECO = process.argv.includes("--seco") ? Number(process.argv[process.argv.indexOf("--seco") + 1]) : undefined;
const BAJO_VOZ = P.musicaBajoVoz ?? -30;
const UMB = { seco: 8, entrada: 12, ...(P.umbrales ?? {}), ...(ARG_SECO !== undefined ? { seco: ARG_SECO } : {}) };

/* ── La entrada de la canción ─────────────────────────────────────────────── */
// El golpe de entrada cae en el frame 3 (no nace de negro: a corte). INICIO_MUSICA es un número ENTERO de frames, para que `trimBefore` no lo mueva.
const ARG_ENTRADA = process.argv.includes("--entrada") ? Number(process.argv[process.argv.indexOf("--entrada") + 1]) : P.golpeEntrada;
const E0 = GOLPES.find((g) => Math.abs(g.t - ARG_ENTRADA) < 0.004);
if (!E0) throw new Error(`pieza.json: no hay un golpe medido en ${P.golpeEntrada} s (golpeEntrada)`);
const INICIO_F = Math.round((E0.t - 0.046) * FPS);
const INICIO = INICIO_F / FPS;
/** El frame entero de la pieza en que SUENA un golpe (la misma cuenta que `golpe()` de `metraje-NNN.ts`: ataque 12 ms, retardo del render 42 ms). */
const frameExacto = (t) => (t + 0.012 - INICIO + 0.042) * FPS;
const frameDe = (t) => Math.round(frameExacto(t));
const BEATS = [];
for (const g of GOLPES) {
  const f = frameDe(g.t);
  if (f < 0) continue;
  const previo = BEATS.find((b) => b.f === f);
  if (previo) {
    if (g.db > previo.db) Object.assign(previo, { t: g.t, db: g.db });
  } else BEATS.push({ f, t: g.t, db: g.db });
}
BEATS.sort((a, b) => a.f - b.f);
// «Dominante»: ningún otro golpe a ≤ 6 f (0,2 s) es más fuerte que él en más de 0,5 dB. Sobre el audio del render, `golpes-render.py` busca LA subida más fuerte en ±0,2 s de cada corte (R33): un corte en un golpe flojo con otro
// más fuerte al lado sale desfasado en esa medida (en la primera prueba, 7 de 30 cortes a 2-5 f). El reparto lo evita con una multa; con música sin percusión (adagios) casi no hay dominantes y la multa solo desempata.
for (const b of BEATS) b.dom = !BEATS.some((o) => o !== b && Math.abs(o.f - b.f) <= 6 && o.db > b.db + 0.5);
const MULTA_NO_DOMINANTE = P.multaNoDominante ?? 0.5;

/* ── El material ──────────────────────────────────────────────────────────── */
const nFrames = (clip) => {
  const ruta = path.join(PUB, `${clip}.mp4`);
  if (!fs.existsSync(ruta)) throw new Error(`falta ${path.relative(RAIZ, ruta)} (node proyectos/${N}/normalizar.mjs)`);
  return Number(execFileSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=nb_frames", "-of", "default=nw=1:nk=1", ruta]).toString().trim());
};
const fr = (s) => Math.round(s * FPS);

/* ── Los planos, en orden de entrada ──────────────────────────────────────── */
/** Un plano con voz entra a corte con `desdeF` frames de aire antes de su primera palabra y dura hasta su última palabra + `cola` f (en que la música sube / la imagen funde). */
const conVoz = (t) => {
  const s0f = t.voz.s0 * FPS;
  const s1f = t.voz.s1 * FPS;
  const desdeF = t.desdeF ?? Math.max(0, Math.round(s0f) - 12);
  const disponible = nFrames(t.clip) - desdeF;
  const dice = Math.ceil(s1f - desdeF);
  return { desdeF, disponible, dice, s0f, s1f };
};
const H = conVoz(P.hook);
const M = conVoz(P.mitad);
const C = conVoz(P.cta);

const planos = [
  { id: P.hook.id ?? "c02-hook", clave: "hook", min: Math.max(H.dice + P.hook.colaMin, 0), max: Math.min(H.disponible, P.hook.max ?? 999), obj: P.hook.objetivo ?? H.dice + 24, w: 1 },
  ...P.rapidos.map((r, i) => ({ id: r.id, clave: `rapido${i + 1}`, min: r.min ?? 45, max: Math.min(r.max ?? 75, nFrames(r.clip) - fr(r.desde)), obj: r.objetivo ?? 60, w: 1, entradaMax: r.entradaMax, entradaMin: r.entradaMin })),
  { id: P.mitad.id ?? "c05-mitad", clave: "mitad", min: Math.max(M.dice + P.mitad.colaMin, 0), max: Math.min(M.disponible, P.mitad.max ?? 999), obj: P.mitad.objetivo ?? M.dice + 26, w: 1, entradaMax: P.mitad.entradaMax },
  ...P.recorrido.map((r, i) => ({
    id: r.id,
    clave: i === P.recorrido.length - 1 ? "vista" : `r${i + 1}`,
    min: r.min ?? 60,
    max: Math.min(r.max ?? 130, nFrames(r.clip) - fr(r.desde)),
    obj: r.objetivo ?? 95,
    w: 1,
  })),
];
for (const p of planos) if (p.min > p.max) throw new Error(`${p.id}: min ${p.min} > max ${p.max} (el clip no da para tanto)`);

/** Entradas candidatas de cada plano: golpes medidos de al menos `seco` dB (la del hook, además, en la ventana de la apertura). */
const fuerte = BEATS.filter((b) => b.db >= UMB.seco);
const ventanaHook = P.apertura.ventana ?? [76, 100];
const candidatos = planos.map((p, i) =>
  fuerte.filter((b) => {
    if (i === 0 && (b.f < ventanaHook[0] || b.f > ventanaHook[1])) return false;
    if (p.entradaMax !== undefined && b.f > p.entradaMax) return false;
    if (p.entradaMin !== undefined && b.f < p.entradaMin) return false;
    return true;
  })
);
// La entrada del CTA: un golpe fuerte tras el recorrido (el último plano del recorrido manda su duración).
const ctaDesde = P.cta.entradaMin ?? 0;
candidatos.push(fuerte.filter((b) => b.f >= ctaDesde && (P.cta.entradaMax === undefined || b.f <= P.cta.entradaMax)));

// Programación dinámica: costo[i][j] = mejor costo de llegar a que el plano i entre en candidatos[i][j].
const n = planos.length;
const INF = 1e18;
const costo = candidatos.map((c) => c.map(() => INF));
const previo = candidatos.map((c) => c.map(() => -1));
candidatos[0].forEach((b, j) => {
  costo[0][j] = -0.02 * b.db + (b.dom ? 0 : MULTA_NO_DOMINANTE);
});
for (let i = 1; i <= n; i++) {
  const p = planos[i - 1];
  candidatos[i].forEach((b, j) => {
    for (let k = 0; k < candidatos[i - 1].length; k++) {
      if (costo[i - 1][k] >= INF) continue;
      const dur = b.f - candidatos[i - 1][k].f;
      if (dur < p.min || dur > p.max) continue;
      // «la vista es el plano más largo de su bloque»: los demás del recorrido tienen su `max` por debajo de la `min` de la vista (lo declara pieza.json)
      const c = costo[i - 1][k] + p.w * ((dur - p.obj) / FPS) ** 2 - 0.02 * b.db + (b.dom ? 0 : MULTA_NO_DOMINANTE);
      if (c < costo[i][j]) {
        costo[i][j] = c;
        previo[i][j] = k;
      }
    }
  });
}
// La CTA entra en el mejor final.
let jFin = -1;
candidatos[n].forEach((b, j) => {
  if (costo[n][j] < INF && (jFin < 0 || costo[n][j] < costo[n][jFin])) jFin = j;
});
if (jFin < 0) {
  planos.forEach((p, i) => console.error(`  ${p.id.padEnd(16)} [${p.min}–${p.max}] entradas alcanzables: ${costo[i].filter((c) => c < INF).length} de ${candidatos[i].length}`));
  console.error("❌ no hay reparto de cortes sobre los golpes medidos con esos mínimos y máximos: ensancha `min`/`max`, baja `umbrales.seco` o cambia `golpeEntrada`.");
  process.exit(1);
}
const entradas = new Array(n + 1);
for (let i = n, j = jFin; i >= 0; i--) {
  entradas[i] = candidatos[i][j];
  j = previo[i][j];
}
const ENTRADA_CTA = entradas[n];

/* ── Lo que sale ──────────────────────────────────────────────────────────── */
const sec = (f) => (f / FPS).toFixed(1).replace(".", ",");
console.log(`\ncosto del reparto: ${costo[n][jFin].toFixed(3)}`);
console.log(`\nPieza ${N} · ${P.cancion} · entra en el segundo ${INICIO.toFixed(4)} de su corte (golpe de ${E0.db} dB en el f${frameDe(E0.t)}) · ${BEATS.length} golpes medidos (${fuerte.length} de ≥ ${UMB.seco} dB)\n`);
console.log("plano                 entra   dur   (s)    golpe      (* = hay otro más fuerte a ≤ 0,2 s)");
planos.forEach((p, i) => {
  const e = entradas[i];
  const dur = entradas[i + 1].f - e.f;
  console.log(`${p.id.padEnd(22)}f${String(e.f).padEnd(5)} ${String(dur).padEnd(5)} ${sec(dur).padEnd(6)} ${e.db.toFixed(1)} dB${e.dom ? " " : "*"}  [${p.min}–${p.max}]`);
});
console.log(`${"c11-cta".padEnd(22)}f${String(ENTRADA_CTA.f).padEnd(5)}                  ${ENTRADA_CTA.db.toFixed(1)} dB`);
const ctaDur = Math.min(C.disponible, Math.ceil(C.s1f - C.desdeF) + (P.cta.cola ?? 16));
const DURACION = ENTRADA_CTA.f + ctaDur + (P.tarjeta ?? 60);
console.log(`\nCTA: ${ctaDur} f (acaba en el f${ENTRADA_CTA.f + ctaDur}) · tarjeta ${P.tarjeta ?? 60} f · total ${DURACION} f = ${sec(DURACION)} s\n`);
// «Lo vendible antes del segundo 10»
const e_r1 = entradas[1].f;
const e_mitad = entradas[1 + P.rapidos.length].f;
console.log(`rápidos desde el f${e_r1} (${sec(e_r1)} s) · la mitad entra en el f${e_mitad} (${sec(e_mitad)} s) · el hook ocupa f${entradas[0].f}-${entradas[1].f}\n`);
if (SOLO_PLAN) process.exit(0);

/* ── Medidas de la música (ebur128) ───────────────────────────────────────── */
const MEDIDAS_RUTA = `proyectos/${N}/medidas/ventanas-musica.json`;
const ventanas = (() => {
  const t = (f) => INICIO + f / FPS; // segundo de la canción en que suena el frame f
  const voz = (plano, v) => [t(plano.en + (v.s0f - v.desdeF) + 0), t(plano.en + (v.s1f - v.desdeF))];
  const hookEn = entradas[0].f;
  const mitadEn = entradas[1 + P.rapidos.length].f;
  const r1En = entradas[2 + P.rapidos.length].f;
  const hookVoz = voz({ en: hookEn }, H);
  const mitadVoz = voz({ en: mitadEn }, M);
  const ctaVoz = voz({ en: ENTRADA_CTA.f }, C);
  return {
    apertura: [t(3), t(hookEn)],
    paseo: [t(entradas[1].f + 2), t(mitadEn - 2)],
    bloque5: [t(r1En + 2), t(ENTRADA_CTA.f - 2)],
    "c02-hook": hookVoz,
    "c05-mitad": mitadVoz,
    "c11-cta": ctaVoz,
  };
})();
const medirVentana = (a, b) => {
  const wav = path.join(RAIZ, "proyectos", N, "original", P.musicaOriginal);
  const salida = execFileSync("ffmpeg", ["-nostdin", "-hide_banner", "-ss", String(a.toFixed(3)), "-t", String((b - a).toFixed(3)), "-i", wav, "-af", "ebur128=peak=true", "-f", "null", "-"], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  void salida;
};
const medirEbur = (a, b) => {
  const wav = path.join(RAIZ, "proyectos", N, "original", P.musicaOriginal);
  const r = execFileSync("sh", ["-c", `ffmpeg -nostdin -hide_banner -ss ${a.toFixed(3)} -t ${(b - a).toFixed(3)} -i "${wav}" -af ebur128=peak=true -f null - 2>&1 | tail -16`], { encoding: "utf8" });
  const I = Number(/I:\s+(-?[\d.]+) LUFS/.exec(r)?.[1]);
  const pico = Number(/Peak:\s+(-?[\d.]+) dBFS/.exec(r)?.[1]);
  return { lufs: I, pico };
};
void medirVentana;
let medidas = null;
const rutaMed = path.join(RAIZ, MEDIDAS_RUTA);
if (MEDIR || !fs.existsSync(rutaMed)) {
  medidas = { inicio: INICIO, fuente: P.musicaOriginal };
  for (const [k, [a, b]] of Object.entries(ventanas)) medidas[k] = { desde: +a.toFixed(3), hasta: +b.toFixed(3), ...medirEbur(a, b) };
  fs.mkdirSync(path.dirname(rutaMed), { recursive: true });
  fs.writeFileSync(rutaMed, JSON.stringify(medidas, null, 2) + "\n");
  console.log(`medidas de la música → ${MEDIDAS_RUTA}`);
} else {
  medidas = JSON.parse(fs.readFileSync(rutaMed, "utf8"));
  if (Math.abs(medidas.inicio - INICIO) > 1e-6) console.warn(`⚠️  ${MEDIDAS_RUTA} es de otra entrada (${medidas.inicio}): repite con --medir`);
}
for (const [k, v] of Object.entries(medidas)) if (typeof v === "object") console.log(`  ${k.padEnd(10)} ${v.lufs} LUFS · pico ${v.pico} dBFS`);

/* ── metraje-NNN.ts ───────────────────────────────────────────────────────── */
const js = (o) => JSON.stringify(o).replace(/"([a-zA-Z]+)":/g, "$1: ").replace(/,/g, ", ").replace(/^\{/, "{ ").replace(/\}$/, " }");
const colorTs = (c, esToma) => {
  // la piel de Isabella se queda donde estaba: saturation ≤ 1,06 (la puerta lo comprueba)
  const final = esToma ? { contrast: 1.04, saturation: 1.04, ...(c ?? {}) } : (c ?? {});
  return Object.keys(final).length ? `color(${js(final)})` : "color()";
};
const desdeTs = (s) => (Math.abs(s * FPS - Math.round(s * FPS)) < 1e-6 && Math.round(s * FPS) % 3 === 0 && Math.round(s * 100) / 100 === s ? String(s) : `fr(${Math.round(s * FPS)})`);
const escTs = (s) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
const ctaPlano = { id: "c11-cta", en: ENTRADA_CTA.f, dur: ctaDur };

const claves = ["hook", ...P.rapidos.map((_, i) => `rapido${i + 1}`), "mitad", ...P.recorrido.map((_, i) => (i === P.recorrido.length - 1 ? "vista" : `r${i + 1}`)), "cta"];
const golpeLinea = (clave, b, nota) => `  ${clave}: { t: ${b.t}, db: ${b.db} },${nota ? ` // ${nota}` : ""}`;
const golpesTs = [
  `  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */`,
  `  e0: { t: ${E0.t}, db: ${E0.db} },`,
  ...claves.map((c, i) => golpeLinea(c, i < claves.length - 1 ? entradas[i] : ENTRADA_CTA, `f${(i < claves.length - 1 ? entradas[i] : ENTRADA_CTA).f}`)),
].join("\n");
const pTs = claves.map((c) => `  ${c}: golpe(GOLPE.${c}),`).join("\n");

const tomaTs = (id, bloque, src, t, V, desdeF, enExpr, durExpr, reason) => `  {
    id: "${id}",
    bloque: ${bloque},
    tipo: "video",
    src: v("${src}"),
    audio: a("${src}-voz"),
    voz: {
      s0: ${t.voz.s0},
      s1: ${t.voz.s1},
      lufs: -15,
      dice: "${escTs(t.voz.dice)}",
    },
    // ${t.nota ?? ""}
    desde: ${desdeF === 0 ? "0" : `fr(${desdeF})`},
    en: ${enExpr},
    dur: ${durExpr},
    zoom: ${t.zoom ?? "EMPUJE"},
    entra: "corte",
    color: ${colorTs(t.color, true)},
    reason:
      "${escTs(reason)}",
  },`;

const planoTs = (r, bloque, enExpr, durExpr) => `  {
    id: "${r.id}",
    bloque: ${bloque},
    tipo: "video",
    src: v("${r.clip}"),
    // ${r.nota ?? r.clip.toUpperCase()}
    desde: ${desdeTs(r.desde)},
    en: ${enExpr},
    dur: ${durExpr},
    zoom: ${r.zoom ?? "QUIETO"},
    entra: "corte",
    color: ${colorTs(r.color, false)},
    reason:
      "${escTs(r.reason)}",
  },`;

const nR = P.rapidos.length;
const nRec = P.recorrido.length;
const clave = (i) => claves[i];
const bloquesTs = [];
bloquesTs.push(`  // ── Bloque 1 · ${P.apertura.titulo ?? "la toma inicial"} ──
  {
    id: "c01-exterior",
    bloque: 1,
    tipo: "video",
    src: v("${P.apertura.clip}"),
    // ${P.apertura.nota ?? P.apertura.clip.toUpperCase()}
    desde: ${desdeTs(P.apertura.desde)},
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: ${colorTs(P.apertura.color, false)},
    reason:
      "${escTs(P.apertura.reason)}",
  },`);
bloquesTs.push(`  // ── Bloque 2 · el hook (con él entra la ficha en la versión de ficha) ──`);
bloquesTs.push(tomaTs("c02-hook", 2, P.hook.clip, P.hook, H, H.desdeF, "P.hook", `P.${clave(1)} - P.hook`, P.hook.reason));
bloquesTs.push(`  // ── Bloque 3 · DOS planos rápidos: lo más vistoso, antes del segundo 10 ──`);
P.rapidos.forEach((r, i) => bloquesTs.push(planoTs(r, 3, `P.${clave(1 + i)}`, `P.${clave(2 + i)} - P.${clave(1 + i)}`)));
bloquesTs.push(`  // ── Bloque 4 · la mitad ──`);
bloquesTs.push(tomaTs("c05-mitad", 4, P.mitad.clip, P.mitad, M, M.desdeF, "P.mitad", `P.${clave(2 + nR)} - P.mitad`, P.mitad.reason));
bloquesTs.push(`  // ── Bloque 5 · el recorrido inmersivo ──`);
P.recorrido.forEach((r, i) => {
  const sig = i === nRec - 1 ? "cta" : clave(3 + nR + i);
  bloquesTs.push(planoTs(r, 5, `P.${clave(2 + nR + i)}`, `P.${sig} - P.${clave(2 + nR + i)}`));
});
bloquesTs.push(`  // ── Bloque 6 · el CTA ──`);
bloquesTs.push(tomaTs("c11-cta", 6, P.cta.clip, P.cta, C, C.desdeF, "P.cta", "DUR_CTA", P.cta.reason));

const metraje = `/**
 * EL RECORRIDO ${N} — «Casa El Retiro · Senderos de Compostela» (Propiedades Luxur), ${P.v} del registro. ${P.titulo}
 *
 * Es de la ESTRUCTURA «lo vendible antes del segundo 10» (\`recorrido-luxur\` §3, pedido del 2026-11-10; la primera pieza hecha así es la 079):
 *   1 la toma inicial (${P.apertura.clip.toUpperCase()}, sin texto ni voz) · 2 el hook de Isabella (${P.hook.clip.toUpperCase()}) · 3 DOS planos rápidos (${P.rapidos.map((r) => r.clip.toUpperCase()).join(" y ")}) ·
 *   4 la mitad (${P.mitad.clip.toUpperCase()}) · 5 UN recorrido inmersivo (${P.recorrido.map((r) => r.clip.toUpperCase()).join(" → ")}; la vista, el plano más largo) · 6 el CTA (${P.cta.clip.toUpperCase()}) y la tarjeta oscura del cierre.
 * El guion es el ${P.guion} del rodaje del 2026-11-11 (${P.hook.clip.toUpperCase()} · ${P.mitad.clip.toUpperCase()} · ${P.cta.clip.toUpperCase()}: Isabella Cadavid, blazer vino tinto) y la canción es «${P.cancion}» (${P.estilo}).
 *
 * GENERADO por \`proyectos/088/herramientas/montar-retiro.mjs ${N}\` desde \`proyectos/${N}/pieza.json\`: los números de abajo (cada corte, en un golpe MEDIDO de la canción) se rehacen con él; lo que se escribe a mano es \`pieza.json\`.
 *
 * QUIÉN MARCA EL TIEMPO. La canción, entrando en el segundo ${INICIO.toFixed(3)} de su corte (el golpe de ${E0.db} dB, f3); la rejilla son los golpes MEDIDOS (\`proyectos/${N}/musica/golpes-cancion-entera.json\`, ${BEATS.length} en total)
 * y cada cambio de plano cae en uno de al menos ${UMB.seco} dB. ${P.notaMusica ?? ""}
 *
 * UNIDADES. \`desde\`, en SEGUNDOS de la fuente; \`en\` y \`dur\`, en frames de la composición. Planos CONTIGUOS. Las tres tomas de Isabella entran A CORTE en su golpe, con \`desde\` = su primera palabra − 12 f:
 * el golpe suena entero, la música baja con curva de coseno DESPUÉS y su bajada acaba 2 f antes de la primera palabra (regla del canal desde el 022).
 *
 * EL COLOR (R32): cada plano lleva su \`color\`; con \`color\` el render lleva \`--gl=angle\` y la prueba se hace a escala 1 reducida con ffmpeg.
 *
 * Datos puros: solo \`import type\` y los números del cierre (\`cierre-${N}.ts\`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-${N}";

export const FPS_${N} = 30;

export type Entrada = "corte" | "disolver";
export type Bloque = 1 | 2 | 3 | 4 | 5 | 6;

/** Dónde habla Isabella en SU clip y a qué nivel. \`s0\`/\`s1\`, medidos por energía (\`limites-voz.py --margen 40\`); \`lufs\`, con ebur128 sobre el WAV TRATADO que suena. */
export interface VozDelCorte {
  /** Segundo de la fuente en que empieza a hablar. */
  s0: number;
  /** Segundo de la fuente en que termina SU frase (la toma puede seguir: se corta aquí). */
  s1: number;
  /** Sonoridad integrada de la voz TRATADA en esa ventana (LUFS). */
  lufs: number;
  /** Lo que dice, tal como está en el guion. Solo para leer el plan. */
  dice: string;
}

export interface Corte extends CorteDelFormato<Entrada> {
  /** \`foto\` solo para la tarjeta oscura del cierre (\`c12-cierre\`: un negro liso). Nada se congela. */
  tipo: "video" | "foto";
  /** A qué bloque del guion pertenece: la puerta comprueba el orden y el tope de cada uno. */
  bloque: Bloque;
  /** Solo las tomas de Isabella: el WAV de su voz TRATADA (\`<toma>-voz.wav\`, \`normalizar.mjs\`). */
  audio?: string;
  voz?: VozDelCorte;
}

/** EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido permanente del canal). Cada voz pasa por la cadena de \`normalizar.mjs\` hasta −15,0 LUFS en su ventana; el plan no añade ganancia. */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «${P.cancion}» — ${P.fuenteMusica}. Se entra en el segundo ${INICIO.toFixed(3)} del corte (\`proyectos/${N}/original/${P.musicaOriginal}\`). Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms;
 * el instante es el de «empieza a subir»): \`proyectos/${N}/musica/golpes-cancion-entera.json\` (\`medir-pista.py --json\`). El reparto lo hizo \`montar-retiro.mjs\` (programación dinámica sobre esos golpes).
 */
export const GOLPE = {
${golpesTs}
} as const;

/**
 * Dónde empieza a sonar la canción, en segundos de su corte: el golpe de entrada (${E0.t} s) cae en el frame 3 de la pieza; redondeado a un frame (${INICIO_F}/30) para que \`trimBefore\` no lo mueva.
 */
export const INICIO_MUSICA = ${INICIO_F} / FPS_${N};

/** Lo que el audio del render llega TARDE respecto de su fuente: 42 ms (medido en el 016 y confirmado desde el 017). Se suma aquí y en la puerta para que el corte caiga en el frame en que el golpe SUENA. */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_${N};

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de \`desde\`). */
const fr = (n: number): number => n / FPS_${N};

/** Isabella: un empuje lento hacia ella. Los recorridos y los exteriores, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => \`recorrido-${N}/\${id}.mp4\`;
const a = (id: string): string => \`recorrido-${N}/\${id}.wav\`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE del canal: contraste con cuerpo, negros hundidos, luces recogidas, un punto cálido y +10 % de saturación. \`vibrance\` ≤ 0,05 y, en las tomas de Isabella, \`saturation\` ≤ 1,06 (la piel se queda donde estaba).
 * El AJUSTE de cada plano se mide (\`herramientas/medir-color.py\`), no se hereda.
 */
const COLOR_BASE: ColorCine = {
  contrast: 1.1,
  blacks: -0.06,
  shadows: 0.08,
  highlights: -0.2,
  whites: -0.05,
  temperature: 0.03,
  saturation: 1.1,
  vibrance: 0,
};

/** El color de un plano: la base más el ajuste de su toma. */
const color = (ajuste: ColorCine = {}): ColorCine => ({ ...COLOR_BASE, ...ajuste });

/** Los frames de cada cambio de plano: todos salen de \`golpe(...)\`, así que mover la entrada de la música es cambiar \`INICIO_MUSICA\`. */
const P = {
${pTs}
} as const;

/** Frames que dura la toma del CTA: voz de ${P.cta.voz.s0} a ${P.cta.voz.s1} s (clip de ${nFrames(P.cta.clip)} f, \`desde\` ${C.desdeF} f); ${P.cta.cola ?? 16} f de su cara tras la última palabra, en los que la imagen funde a negro (los últimos 6). Nada se congela. */
const DUR_CTA = ${ctaDur};

/** Dónde acaba la música (frame de la comp): tras la última palabra del CTA se APAGA con curva hasta cero aquí, 2 f antes del final de la pieza (la tarjeta va en silencio). */
export const FIN_MUSICA_${N} = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje${N}: readonly Corte[] = [
${bloquesTs.join("\n")}
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  {
    id: "c12-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-${N}/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el \`en\` + \`dur\` de c11
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (\`en\` + \`dur\` de c12). */
export const DURACION_${N} = P.cta + DUR_CTA + DUR_TARJETA;
`;
escribe(`remotion/src/proyectos/${N}/metraje-${N}.ts`, metraje);

/* ── audio-NNN.ts ─────────────────────────────────────────────────────────── */
const md = (k) => medidas[k];
const idR1 = P.rapidos[0].id;
const idRec1 = P.recorrido[0].id;
const audio = `/**
 * EL SONIDO DEL ${N} — todo lo que suena, como DATOS (\`TramoAudio[]\`). GENERADO por \`montar-retiro.mjs\` junto con \`metraje-${N}.ts\`; medidas de la música en \`proyectos/${N}/medidas/ventanas-musica.json\`.
 *
 * \`<PistaMetraje>\` pinta los planos MUDOS. Lo que se oye son dos cosas, y las dos pasan por \`<PistaAudio>\`:
 *
 *   vocesTomas   la voz de Isabella en ${P.hook.clip.toUpperCase()}, ${P.mitad.clip.toUpperCase()} y ${P.cta.clip.toUpperCase()}, derivada de los cortes que traen \`audio\` (\`vocesDeCortes\`): mismo arranque que su imagen, desclic de 3 f (las tres entran a corte)
 *                y, como el WAV es el TRATADO de \`normalizar.mjs\` (\`<toma>-voz.wav\`: graves fuera, puerta suave, compresor 3,5:1, ganancia y limitador, ya a −15,0 LUFS en su ventana), UNA ganancia de ±0,0 dB.
 *   musica       «${P.cancion}», con una envolvente que BAJA mientras habla Isabella y sube en los recorridos. No es la de \`envolventeBajoVoz\`: aquí el golpe de entrada de cada toma tiene que sonar ENTERO,
 *                la música baja con curva de coseno DESPUÉS y acaba ANTES de la primera palabra (regla del canal desde el 022).
 *
 * LA MEZCLA, en LUFS (medidos con ebur128 sobre cada ventana de la canción): voz de Isabella −15 · música SOLA −15 en los tres tramos (apertura · paseo · bloque 5) · música BAJO LA VOZ −${BAJO_VOZ} en cada ventana de voz (≈ 15 LU bajo ella, la regla del encargo; la 079 y las variantes B de la suite iban a −26: 11 LU).
 * Una sola ganancia por tramo, sin \`loudnorm\` (le cambiaría la dinámica).
 *
 * Datos puros: la puerta lo carga con node.
 */
import { frameDeFuente, gananciaHasta, vocesDeCortes, volumenDe } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { FIN_MUSICA_${N}, FPS_${N}, INICIO_MUSICA, OBJETIVO_LUFS, metraje${N} } from "./metraje-${N}";

/** La voz de las tres tomas a cámara, derivada del plan de planos. */
export const vocesTomas: readonly TramoAudio[] = vocesDeCortes(metraje${N}, { fps: FPS_${N}, objetivoLufs: OBJETIVO_LUFS });

/** El fin de la toma del CTA: ahí empieza la tarjeta del cierre; la música sigue apagándose bajo ella. */
const CTA = metraje${N}.find((c) => c.id === "c11-cta");
if (!CTA) throw new Error("audio-${N}: falta c11-cta en metraje-${N}.ts");
export const FIN_CTA_${N} = CTA.en + CTA.dur;

/** La ventana de voz de un corte, en frames de la comp (la misma cuenta que usa la puerta). */
const ventanaDe = (id: string): { en: number; dur: number; fin: number; ini: number } => {
  const c = metraje${N}.find((x) => x.id === id);
  if (!c || !c.voz) throw new Error(\`audio-${N}: \${id} no existe o no trae voz\`);
  const ini = frameDeFuente(c.en, c.desde, c.voz.s0, FPS_${N});
  const fin = frameDeFuente(c.en, c.desde, c.voz.s1, FPS_${N});
  return { en: ini, dur: fin - ini, fin, ini };
};

/* ── La música ────────────────────────────────────────────────────────────── */

/** ¿La música va en el render? \`false\` = la pieza sale solo con voz y se publica con un audio de la plataforma encima. */
export const HAY_MUSICA = true;

/** Sonoridad de la canción en cada tramo SIN voz (ebur128 sobre el corte): la apertura, los dos planos rápidos y el recorrido. */
export const LUFS_TRAMO = { apertura: ${md("apertura").lufs}, paseo: ${md("paseo").lufs}, bloque5: ${md("bloque5").lufs} } as const;
/** Sonoridad de la canción en cada ventana de VOZ (ebur128, el tramo de la canción que suena mientras ella habla). */
export const LUFS_CANCION_EN_VOZ = { "c02-hook": ${md("c02-hook").lufs}, "c05-mitad": ${md("c05-mitad").lufs}, "c11-cta": ${md("c11-cta").lufs} } as const;
/** El pico real de la canción en cada tramo sin voz (dBFS): con la ganancia de cada tramo ninguno pasa de −1 dBFS (lo comprueba la puerta). */
export const PICO_TRAMO = { apertura: ${md("apertura").pico}, paseo: ${md("paseo").pico}, bloque5: ${md("bloque5").pico} } as const;
/** La música SOLA por tramos: −15 LUFS, el nivel de la voz. */
export const OBJETIVO_MUSICA = { apertura: -15, paseo: -15, bloque5: -15 } as const;
/** Ganancia lineal de la música sola en cada tramo. */
export const ALTOS = {
  apertura: gananciaHasta(LUFS_TRAMO.apertura, OBJETIVO_MUSICA.apertura),
  paseo: gananciaHasta(LUFS_TRAMO.paseo, OBJETIVO_MUSICA.paseo),
  bloque5: gananciaHasta(LUFS_TRAMO.bloque5, OBJETIVO_MUSICA.bloque5),
} as const;
/** Mientras habla Isabella: la música baja hasta −${BAJO_VOZ} LUFS EN CADA VENTANA (${-15 - BAJO_VOZ} LU bajo su voz de −15). */
export const LUFS_MUSICA_BAJO_VOZ = ${BAJO_VOZ};
export const BAJOS = {
  "c02-hook": gananciaHasta(LUFS_CANCION_EN_VOZ["c02-hook"], LUFS_MUSICA_BAJO_VOZ),
  "c05-mitad": gananciaHasta(LUFS_CANCION_EN_VOZ["c05-mitad"], LUFS_MUSICA_BAJO_VOZ),
  "c11-cta": gananciaHasta(LUFS_CANCION_EN_VOZ["c11-cta"], LUFS_MUSICA_BAJO_VOZ),
} as const;
/**
 * LOS FUNDIDOS (regla del canal: «el sonido cuando cambia a hablar Isabella debe hacer un fade-out / fade-in … para que no se escuche tan cortado»):
 *   · FADE-OUT de FADE_OUT f desde el golpe en que entra su toma (el golpe suena entero y la música baja DESPUÉS, con curva de coseno): la curva ACABA ≥ 2 f antes de su primera palabra.
 *   · FADE-IN de FADE_IN f tras su última palabra (con curva suave), o los que quepan hasta 2 f antes del golpe del plano siguiente.
 */
export const FADE_OUT = { hook: 10, mitad: 10, cta: 10 } as const;
export const FADE_IN = { hook: ${P.fadeIn?.hook ?? 15}, mitad: ${P.fadeIn?.mitad ?? 22} } as const;
/** Frames que la música se queda BAJA tras la última palabra del hook antes de subir. */
export const RETRASO_SUBIDA_HOOK = ${P.retrasoSubidaHook ?? 6};
/** Hasta dónde se apaga la música tras la última palabra del CTA: 2 f antes del final de la pieza (la tarjeta va en silencio). */
const APAGADO_CTA_HASTA = FIN_MUSICA_${N};

/** Un fundido con curva suave (coseno): de \`de\` a \`a\` en \`n\` frames desde \`f0\`, en 5 puntos. */
const fundido = (f0: number, n: number, de: number, a: number): [number, number][] =>
  [0, 0.25, 0.5, 0.75, 1].map((u) => [Math.round(f0 + u * n), de + ((a - de) * (1 - Math.cos(Math.PI * u))) / 2] as [number, number]);

/** La envolvente: la casa sola, el hook, la mitad y el CTA con su fundido, y el apagado final bajo la tarjeta. */
const envolvente = (): [number, number][] => {
  const hook = ventanaDe("c02-hook");
  const mitad = ventanaDe("c05-mitad");
  const cta = ventanaDe("c11-cta");
  const hookPlano = metraje${N}.find((c) => c.id === "c02-hook");
  const paseoPlano = metraje${N}.find((c) => c.id === "${idR1}");
  const mitadPlano = metraje${N}.find((c) => c.id === "c05-mitad");
  const recorridoPlano = metraje${N}.find((c) => c.id === "${idRec1}");
  const ctaPlano = metraje${N}.find((c) => c.id === "c11-cta");
  if (!hookPlano || !paseoPlano || !mitadPlano || !recorridoPlano || !ctaPlano) throw new Error("audio-${N}: faltan planos en metraje-${N}.ts");

  const p: [number, number][] = [
    // LA APERTURA: la música sola desde el frame 0 (1 f de entrada para no meter un clic: el golpe de entrada suena en el f3).
    [0, 0],
    [1, ALTOS.apertura],
    // HOOK (entra a corte en un golpe): el golpe suena entero y la música baja con fundido DESPUÉS; sube con fundido (los f que quepan) hasta el plano siguiente.
    [hookPlano.en, ALTOS.apertura],
    ...fundido(hookPlano.en, FADE_OUT.hook, ALTOS.apertura, BAJOS["c02-hook"]),
    [hook.fin, BAJOS["c02-hook"]],
    [hook.fin + RETRASO_SUBIDA_HOOK, BAJOS["c02-hook"]],
    ...fundido(hook.fin + RETRASO_SUBIDA_HOOK, Math.min(FADE_IN.hook, paseoPlano.en - (hook.fin + RETRASO_SUBIDA_HOOK) - 2), BAJOS["c02-hook"], ALTOS.paseo),
    // MITAD (entra a corte en el golpe): igual; tras ella la música sube en los f que quepan hasta el primer plano del recorrido.
    [mitadPlano.en, ALTOS.paseo],
    ...fundido(mitadPlano.en, FADE_OUT.mitad, ALTOS.paseo, BAJOS["c05-mitad"]),
    [mitad.fin, BAJOS["c05-mitad"]],
    ...fundido(mitad.fin, Math.min(FADE_IN.mitad, recorridoPlano.en - mitad.fin - 2), BAJOS["c05-mitad"], ALTOS.bloque5),
    // CTA (entra a corte en el golpe): la bajada igual...
    [ctaPlano.en, ALTOS.bloque5],
    ...fundido(ctaPlano.en, FADE_OUT.cta, ALTOS.bloque5, BAJOS["c11-cta"]),
    [cta.fin, BAJOS["c11-cta"]],
    // ...y al acabar la voz la música se APAGA con curva de coseno hasta cero, 2 f antes del final de la pieza (la tarjeta va en silencio).
    ...fundido(cta.fin, APAGADO_CTA_HASTA - cta.fin, BAJOS["c11-cta"], 0),
  ];
  // Los puntos tienen que ir en orden estricto (las rampas cortas pueden repetir frame).
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1;
  return p;
};

/**
 * Remotion le pasa el volumen a ffmpeg como UNA expresión \`if(between(t,…),valor,if(…))\` con un \`if\` por cada valor distinto de la ganancia (a 3 decimales), y ffmpeg no admite más de ≈ 80 \`if\`
 * anidados. Una envolvente con rampas largas se PARTE en tramos de la misma canción, consecutivos y sin solape (cada uno empieza en el frame de fuente en que acabó el anterior: es la misma muestra).
 */
const MAX_VALORES = 60;

/** La envolvente \`puntos\` (frames absolutos de la comp) partida en tramos consecutivos de la canción, cada uno con su trozo de envolvente. */
const trocea = (puntos: [number, number][], fin: number): TramoAudio[] => {
  const entero: TramoAudio = { id: "musica", src: "recorrido-${N}/musica-${N}.wav", en: 0, dur: fin, desde: INICIO_MUSICA, ganancia: puntos, reason: "" };
  const v = (f: number): number => volumenDe(entero, f);
  const redondea = (x: number): number => Math.round(x * 1000) / 1000;
  const cortes = [0];
  let cambios = 0;
  let ultimo = redondea(v(0));
  for (let f = 1; f < fin; f++) {
    const x = redondea(v(f));
    if (x !== ultimo) {
      cambios++;
      ultimo = x;
    }
    if (cambios >= MAX_VALORES) {
      cortes.push(f);
      cambios = 0;
    }
  }
  cortes.push(fin);
  return cortes.slice(0, -1).map((a, i) => {
    const b = cortes[i + 1];
    const interior = puntos.filter(([f]) => f > a && f < b);
    const ganancia: [number, number][] = [[a, v(a)], ...interior, [b, v(b)]];
    return {
      id: \`musica-\${i + 1}\`,
      src: "recorrido-${N}/musica-${N}.wav",
      en: a,
      dur: b - a,
      // El frame de fuente en que arranca este trozo: el de la canción en \`a\` (INICIO_MUSICA es un número entero de frames).
      desde: INICIO_MUSICA + a / FPS_${N},
      ganancia,
      reason:
        i === 0
          ? "«${escTs(P.cancion)}»: el golpe del f3 abre la pieza; la música baja con curva tras el golpe de cada entrada de Isabella (hook, mitad y CTA) y sube tras las dos primeras; cada corte cae en un golpe medido; la canción se apaga con curva bajo la tarjeta. Partida en tramos consecutivos de la misma canción: ffmpeg no admite una expresión de volumen con más de ≈ 80 valores distintos."
          : \`«${escTs(P.cancion)}», trozo \${i + 1} de \${cortes.length - 1}: sigue donde acabó el anterior (f\${a}), la misma muestra de la canción.\`,
    };
  });
};

export const musica${N}: readonly TramoAudio[] = HAY_MUSICA ? trocea(envolvente(), FIN_MUSICA_${N}) : [];

/** Lo que monta \`<PistaAudio>\`. */
export const audio${N}: readonly TramoAudio[] = [...vocesTomas, ...musica${N}];
`;
escribe(`remotion/src/proyectos/${N}/audio-${N}.ts`, audio);

/* ── cifras para la puerta y el resumen ───────────────────────────────────── */
const resumen = {
  n: N,
  inicioMusica: INICIO,
  golpeEntrada: E0,
  duracion: DURACION,
  planos: planos.map((p, i) => ({ id: p.id, en: entradas[i].f, dur: entradas[i + 1].f - entradas[i].f, db: entradas[i].db })),
  cta: { en: ENTRADA_CTA.f, dur: ctaDur, db: ENTRADA_CTA.db },
  claves: Object.fromEntries([...planos.map((p) => [p.id, p.clave]), ["c11-cta", "cta"]]),
};
escribe(`proyectos/${N}/medidas/reparto.json`, JSON.stringify(resumen, null, 2) + "\n");
console.log(`\n✅ remotion/src/proyectos/${N}/metraje-${N}.ts y audio-${N}.ts escritos · ${DURACION} f = ${sec(DURACION)} s`);
