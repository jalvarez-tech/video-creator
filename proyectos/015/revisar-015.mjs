#!/usr/bin/env node
/**
 * PUERTA DEL 015 — «Lo que aprendí en APEX».
 *
 *   node proyectos/015/revisar-015.mjs
 *
 * Las comprobaciones del FORMATO salen de `revisar-metraje.mjs` (línea de
 * tiempo, metraje, tramos, encuadre, todos los archivos). Encima, lo que pidió
 * el cliente con palabras y ningún frame enseña:
 *
 *   2. «recorta los espacios de silencio»: entre la última palabra de una toma
 *      y la primera de la siguiente hay EXACTAMENTE `HUECO` frames, antes de la
 *      primera palabra de la pieza como mucho 6 y después de la última entre 20
 *      y 30 (lo que se tarda en leer la cuenta).
 *   3. «que las transiciones tengan un fade»: TODAS las tomas menos la primera
 *      entran disolviendo, y ninguna palabra suena con su imagen a medio fundir
 *      (la del saliente termina ≥ 2 f antes de que empiece la disolvencia; la
 *      del entrante, después de que acabe). Ni en el cruce de VOZ.
 *   4. la voz: su WAV existe y tiene el tramo que se lee (cruce incluido), y la
 *      ganancia por toma es sensata (|g| ≤ 6 dB).
 *   5. «agregar textos»: el plan de gráficos pasa `revisaPlan` SIN un aviso
 *      (incluye las aserciones `abs` de cada texto contra su palabra), empieza
 *      en el f0 (miniatura), acaba en el último frame con @propiedadesluxur, y
 *      el velo es continuo (tomas contiguas, todas con `rampa: 0`, R25).
 *   6. «con Fx de sonido»: cada texto que ENTRA tiene su sonido (salvo los
 *      declarados abajo, con su motivo), y cada cue golpea en el frame que el
 *      plan resuelve para su texto.
 *
 * Carga los módulos TypeScript DE VERDAD (`abrePuerta` → esbuild): los frames
 * que mide son los que se renderizan, no los que dice un comentario.
 *
 * Sale con 1 si algo falla.
 */
import { homedir } from "node:os";
import { join } from "node:path";
import { abrePuerta, duracionDe, PUBLICO } from "../../remotion/src/motor/metraje/revisar-metraje.mjs";
import { existsSync } from "node:fs";

const TECHO_ZOOM = 1.2; // clips normalizados a 1296 px = 1080 × 1,2
const MAX_PRIMERA = 6; // f de aire antes de la primera palabra
const COLA_FINAL = [20, 30]; // f tras la última palabra: leer la cuenta, sin quedarse muerto
const MARGEN_FUNDIDO = 2; // f entre la última palabra y el inicio de la disolvencia
const CUENTA = "@propiedadesluxur";

/**
 * Textos que ENTRAN sin sonido propio, y por qué. Una excepción que sobra
 * tumba la puerta, igual que en el formato.
 */
const SIN_SONIDO = {
  "g08-mercado/kicker": "mismo texto y mismo sitio que el kicker de g07: en el relevo no se ve entrar",
  "g12-redes/fila": "los iconos aterrizan 6 f después de la cuenta y suenan con ella (la notificación)",
};

const puerta = await abrePuerta({
  proyecto: "015",
  plan: "remotion/src/proyectos/015/metraje-015.ts",
  cortes: "metraje015",
  receta: "bash proyectos/015/normalizar.sh",
  extras: {
    graficos: "remotion/src/proyectos/015/graficos-015.ts",
    cues: "remotion/src/proyectos/015/cues-015.ts",
    nucleo: "remotion/src/motor/plan/nucleo.ts",
  },
});
const { cortes, fps, fallos, mal, ok, seccion } = puerta;
const M = puerta.plan;
const F = puerta.modulos.formato;
const N = puerta.modulos.nucleo;
const plan = puerta.modulos.graficos.graficos015;
const cues = puerta.modulos.cues.cues015;
const DURACION = M.DURACION_015;

/* 1 · línea de tiempo ───────────────────────────────────────────────────── */
seccion("1. línea de tiempo");
puerta.lineaDeTiempo({ duracion: DURACION });

// La voz de cada corte en frames de la COMP.
const vozDe = (c) => {
  const d0 = Math.round(c.desde * fps);
  return { ini: c.en + Math.round(c.voz.s0 * fps) - d0, fin: c.en + Math.round(c.voz.s1 * fps) - d0, d0 };
};

/* 2 · silencios ─────────────────────────────────────────────────────────── */
seccion("2. silencios recortados");
{
  const n = fallos.length;
  const primera = vozDe(cortes[0]);
  if (primera.ini - cortes[0].en > MAX_PRIMERA) mal(`c01: ${primera.ini - cortes[0].en} f de aire antes de la primera palabra (máx. ${MAX_PRIMERA})`);
  if (primera.ini < cortes[0].en) mal(`c01: la voz empieza antes que la imagen (f${primera.ini})`);
  let aire = primera.ini;
  for (let i = 0; i + 1 < cortes.length; i++) {
    const a = cortes[i];
    const b = cortes[i + 1];
    const hueco = vozDe(b).ini - vozDe(a).fin;
    if (hueco !== M.HUECO) mal(`${a.id} → ${b.id}: ${hueco} f entre frases; el plan fija ${M.HUECO}`);
    aire += hueco;
  }
  const ultimo = cortes.at(-1);
  const cola = ultimo.en + ultimo.dur - vozDe(ultimo).fin;
  if (cola < COLA_FINAL[0] || cola > COLA_FINAL[1]) mal(`${ultimo.id}: ${cola} f tras la última palabra (entre ${COLA_FINAL[0]} y ${COLA_FINAL[1]})`);
  aire += cola;
  const fuente = cortes.reduce((s, c) => s + duracionDe(c.src), 0);
  if (fallos.length === n) {
    ok(
      `${M.HUECO} f entre todas las frases · ${primera.ini - cortes[0].en} f antes de la primera · ${cola} f tras la última · ` +
        `${(DURACION / fps).toFixed(1)} s de ${fuente.toFixed(1)} s de material (aire total ${(aire / fps).toFixed(1)} s)`
    );
  }
}

/* 3 · fundidos ──────────────────────────────────────────────────────────── */
seccion("3. fundidos entre tomas");
{
  const n = fallos.length;
  cortes.forEach((c, i) => {
    if (i === 0) {
      if (c.entra && c.entra !== "corte") mal(`${c.id}: la primera toma entra con «${c.entra}»; su f0 es la miniatura`);
      return;
    }
    if (c.entra !== "disolver") return mal(`${c.id}: entra con «${c.entra ?? "corte"}»; el cliente pidió fundido en todas las transiciones`);
    const prev = cortes[i - 1];
    const ini = c.en - F.DISOLVER;
    const salida = vozDe(prev).fin;
    const entrada = vozDe(c).ini;
    if (salida + MARGEN_FUNDIDO > ini) mal(`${prev.id} → ${c.id}: su última palabra acaba en f${salida} y el fundido empieza en f${ini} (margen ${MARGEN_FUNDIDO})`);
    if (entrada < c.en) mal(`${c.id}: empieza a hablar en f${entrada}, con su imagen a medio fundir (opaca en f${c.en})`);
    const cruce = [c.en - M.CRUCE_VOZ, c.en];
    if (salida > cruce[0] || entrada < cruce[1]) mal(`${prev.id} → ${c.id}: suena una palabra dentro del cruce de voz [f${cruce[0]}, f${cruce[1]})`);
  });
  if (fallos.length === n) ok(`${cortes.length - 1} disolvencias de ${F.DISOLVER} f, todas en el hueco entre dos frases (y el cruce de voz, en sus ${M.CRUCE_VOZ} últimos)`);
}

/* 4 · voz ───────────────────────────────────────────────────────────────── */
seccion("4. la voz de cada toma");
{
  const n = fallos.length;
  const ganancias = [];
  cortes.forEach((c, i) => {
    if (!existsSync(join(PUBLICO, c.audio))) return mal(`${c.id}: no existe remotion/public/${c.audio} (bash proyectos/015/normalizar.sh)`);
    const d0 = Math.round(c.desde * fps);
    const antes = i > 0 && c.entra === "disolver" ? M.CRUCE_VOZ : 0;
    if (d0 - antes < 0) mal(`${c.id}: el cruce de voz pide empezar ${antes - d0} f antes del principio de ${c.audio}`);
    const hasta = (d0 + c.dur) / fps;
    const dura = duracionDe(c.audio);
    if (hasta > dura) mal(`${c.id}: la voz se lee hasta ${hasta.toFixed(2)} s y ${c.audio} dura ${dura.toFixed(2)} s`);
    if (c.voz.s1 > dura) mal(`${c.id}: voz.s1 = ${c.voz.s1} s, fuera del WAV (${dura.toFixed(2)} s)`);
    const g = 20 * Math.log10(M.gananciaVoz(c));
    if (Math.abs(g) > 6) mal(`${c.id}: ganancia de voz ${g.toFixed(1)} dB (|g| > 6: ¿es la misma voz?)`);
    ganancias.push(`${c.id} ${g >= 0 ? "+" : ""}${g.toFixed(1)}`);
  });
  if (fallos.length === n) ok(`nueve WAV con su tramo · a ${M.OBJETIVO_LUFS} LUFS: ${ganancias.join(" · ")} dB`);
}

/* 5 · textos ────────────────────────────────────────────────────────────── */
seccion("5. textos");
{
  const n = fallos.length;
  const avisos = N.revisaPlan(plan);
  for (const a of avisos) mal(`revisaPlan: ${a}`);
  const tomas = plan.tomas;
  if (tomas[0].ventana[0] !== 0) mal(`la primera toma empieza en f${tomas[0].ventana[0]}: el f0 (miniatura) sale sin hook`);
  const fin = tomas.at(-1).ventana[1];
  if (fin !== DURACION) mal(`la última toma acaba en f${fin} y la pieza en f${DURACION}: el final sale sin la cuenta`);
  const todoElTexto = JSON.stringify(tomas.at(-1).hijos);
  if (!todoElTexto.includes(CUENTA)) mal(`la última toma no dice ${CUENTA}`);
  tomas.forEach((t, i) => {
    if (i > 0 && t.ventana[0] !== tomas[i - 1].ventana[1]) mal(`${t.id}: empieza en f${t.ventana[0]} y la anterior acaba en f${tomas[i - 1].ventana[1]}: el velo parpadea`);
    const scrim = t.ambiente?.scrim;
    if (!scrim || scrim.rampa !== 0 || scrim.alto !== 900) mal(`${t.id}: velo ${JSON.stringify(scrim)}; en tomas contiguas va { alto: 900, rampa: 0 } (R25)`);
  });
  const enCorte = new Set(cortes.map((c) => c.en));
  const conLugar = tomas.filter((t) => enCorte.has(t.ventana[0])).map((t) => t.id);
  if (fallos.length === n) {
    ok(`${tomas.length} tomas, f0 → f${fin}, velo continuo · revisaPlan sin avisos (anclas \`abs\` incluidas) · ${conLugar.length} relevan con su lugar`);
  }
}

/* 6 · sonido ────────────────────────────────────────────────────────────── */
seccion("6. un sonido por texto que entra");
{
  const n = fallos.length;
  const anclas = N.anclasDeSonido(plan);
  if (anclas.length !== cues.length) mal(`${anclas.length} textos piden sonido y hay ${cues.length} cues`);
  anclas.forEach((a, i) => {
    const c = cues[i];
    if (!c) return;
    if (c.targetFrame !== a.frame) mal(`${c.id}: golpea en f${c.targetFrame} y su texto entra en f${a.frame}`);
    if (c.startFrame < 0) mal(`${c.id}: empieza en f${c.startFrame}`);
    if (c.startFrame + c.durationInFrames > DURACION + 30) mal(`${c.id}: suena hasta f${c.startFrame + c.durationInFrames}, después del final`);
  });
  // Textos que entran sin sonido: todo nodo con texto fuera del hook.
  const conTexto = new Set(["kicker", "titular", "lista", "chip"]);
  const usadas = new Set();
  for (const t of plan.tomas.slice(1)) {
    const anda = (nodos) =>
      nodos.forEach((nodo) => {
        const clave = `${t.id}/${nodo.eje === "fila" ? "fila" : nodo.pieza ?? nodo.eje}`;
        const hablaSolo = conTexto.has(nodo.pieza) || nodo.eje === "fila";
        if (hablaSolo && !nodo.sonido) {
          if (SIN_SONIDO[clave]) usadas.add(clave);
          else mal(`${clave}: entra sin sonido`);
        }
        if (nodo.hijos && nodo.eje !== "fila") anda(nodo.hijos);
      });
    anda(t.hijos);
  }
  for (const clave of Object.keys(SIN_SONIDO)) if (!usadas.has(clave)) mal(`sobra la excepción «${clave}»: ya no hace falta, quítala`);
  const porGesto = {};
  for (const a of anclas) porGesto[a.variante] = (porGesto[a.variante] ?? 0) + 1;
  if (fallos.length === n) {
    ok(`${cues.length} cues, cada uno en el frame de su texto · ${Object.entries(porGesto).map(([k, v]) => `${v} ${k}`).join(" · ")} · ${Object.keys(SIN_SONIDO).length} sin sonido, declarados`);
  }
}

/* 7-10 · formato ────────────────────────────────────────────────────────── */
seccion("7. metraje disponible");
puerta.metrajeDisponible();
seccion("8. tramos disjuntos");
puerta.tramosDisjuntos();
seccion("9. encuadre");
puerta.encuadre({ techoZoom: TECHO_ZOOM });
seccion("10. todos los clips del encargo");
puerta.todosLosArchivos({ carpeta: "apex-015", origen: join(homedir(), "Downloads", "Videos APEX"), extensiones: /\.mov$/i });

puerta.cierra(`el 015 pasa la puerta: ${cortes.length} tomas, ${plan.tomas.length} textos, ${cues.length} sonidos`);
