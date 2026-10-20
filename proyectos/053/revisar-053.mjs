#!/usr/bin/env node
/**
 * PUERTA DEL 053 — «¿Pagarías $14.800.000?», la RÉPLICA de `videos editados/03.mp4` (V35 del registro, Tierra Grata, ARRIENDO) SIN voz en off y con un guion nuevo EN PANTALLA (cambio de encargo del 2026-10-20, reparto §5c).
 *
 *   node proyectos/053/revisar-053.mjs            (avisa de lo «por confirmar al oído»)
 *   node proyectos/053/revisar-053.mjs --final    (falla mientras quede algo por confirmar)
 *
 * Las comprobaciones del FORMATO salen de `revisar-metraje.mjs` (línea de tiempo, metraje, tramos, encuadre). Encima, lo que el formato del recorrido promete y ningún frame enseña:
 *
 *   2. la ESTRUCTURA de la réplica: los bloques 2-5-6 (el gancho con Isabella caminando, el recorrido con un rótulo por tramo, el CTA a cámara), LAS MISMAS TOMAS EN EL MISMO ORDEN que el original (`ORDEN_DEL_ORIGINAL`),
 *      Isabella a cámara una vez (el CTA) y el total dentro del tope del formato.
 *   2a. LAS CIFRAS: «$14.800.000» en el gancho (el canon real, no los «14 millones» del original) y «113 m²» en el rótulo 3 (el texto del usuario); ninguna otra.
 *   2b. las REGLAS FIJAS del canal (skill `recorrido-luxur`, SKILL.md §0) y la EXCEPCIÓN DECLARADA: la pieza abre con Isabella (el f0 sale limpio y su rótulo entra unos frames después); no hay texto arriba ni cuenta `@…`, y NUNCA el
 *      sello «PROPIEDADES LUXUR» (`SelloCampana`).
 *   2c. el CIERRE (`cierre-053.ts`): NADA SE CONGELA (la imagen de Isabella funde a negro y llega a negro exacto en su último fotograma), y sigue una TARJETA OSCURA (el último plano, un negro liso) con el LOGO —más pequeño y al
 *      60 % de opacidad: 40 % de transparencia— y la WEB, que caben, caen en las zonas seguras y se leen enteros.
 *   2d. el COLOR de cada plano (R32).
 *   2f. TODAS las entradas son disolvencias (salvo el f0).
 *   3. la VOZ de la toma del CTA: el WAV existe y tiene el tramo que se lee, ninguna palabra suena dentro de un desclic, queda aire tras la última palabra de la pieza.
 *   4. la MÚSICA («Softly»): una curva, y CADA plano y CADA rótulo cae en un golpe MEDIDO (`GOLPES`), la toma del CTA entra en el golpe de 87,3 s y la música baja DESPUÉS, con curva, y se apaga bajo la tarjeta.
 *   4b. la música bajo la voz del CTA: ≥ 9 LU por debajo de ella (−15), con la sonoridad momentánea de la canción promediada en 1 s (`musica/sonoridad-softly.json`); el pico real de la música sola ≤ −2,5 dBFS.
 *   5. los RÓTULOS: su validador sin un aviso, con las letras del canal; el texto de cada uno es el del reparto §5c TAL CUAL; UNO a la vez, cada uno el tiempo que se lee; los del CTA, dentro de su voz.
 *  11. nada «por confirmar» (con `--final` falla).
 *
 * Carga los módulos TypeScript DE VERDAD (`abrePuerta` → esbuild): lo que mide es lo que se renderiza. Sale con 1 si algo falla.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ejecutar } from "../../herramientas/comun.mjs";
import { abrePuerta, cargaTs, duracionDe, PUBLICO, RAIZ } from "../../remotion/src/motor/metraje/revisar-metraje.mjs";

/**
 * EXCEPCIONES POR RÉPLICA (2026-10-20: el usuario pidió replicar `03.mp4` con las mismas tomas): (1) la pieza ABRE con Isabella, sin plano de la casa delante; (2) NO hay voz en off: el texto de cada tramo es un rótulo que no acompaña a
 * ninguna voz (`SIN_VOZ`); (3) el último plano del bloque 5 es el carril de nado (el orden del original) y el más largo, el cielo con el jacuzzi (RC10, que cubre dos rótulos). El resto de reglas fijas (nunca el sello, nada arriba, el cierre
 * en la tarjeta oscura, nada se congela) se siguen comprobando.
 */
const BLOQUES = [2, 5, 6];
/** Los bloques en los que Isabella habla a cámara: solo el CTA (el gancho es un rótulo sobre su imagen, sin voz). */
const DE_ELLA = [6];
/** Las MISMAS TOMAS en el MISMO ORDEN que el original (`03.mp4`, identificadas por búsqueda de fotogramas en `proyectos/053/medidas/`): el clip de cada plano de vídeo, en orden. */
const ORDEN_DEL_ORIGINAL = ["hk05", "rc10", "rc01", "rc22", "rc03", "rc05", "rc04", "rc16", "ct05"];
/** El plano más largo del bloque 5 (cubre DOS rótulos: «Mira lo que incluye:» y «Jacuzzi privado…»); el último del bloque es el carril de nado, como en el original. */
const PLANO_MAS_LARGO = "c02-cielo";

const TECHO_ZOOM = 1.2; // clips normalizados a 1296 px = 1080 × 1,2
const TOPE_SEGUNDOS = 55; // el del formato: sin locución la réplica cabe (≈ 46 s)
const MARGEN_FUNDIDO = 2; // f entre la última palabra y el inicio de la disolvencia del siguiente
const COLA_FINAL = [45, 120]; // f desde la última palabra del CTA hasta el final (lo que le queda de toma + la tarjeta): la web se lee, sin quedarse muerto
const TARJETA_FRAMES = [45, 75]; // f que dura la tarjeta oscura del cierre (1,5-2,5 s)
const HOLGURA_TROZO = 3; // f que un trozo puede adelantarse a su palabra
const TOLERANCIA_GOLPE = 1; // f entre el `en` de un plano y el frame en que suena el golpe de la canción en que entra
const TOLERANCIA_ROTULO = 2; // f entre la primera línea de un rótulo y el frame en que suena su golpe
const FUERZA_MIN_GOLPE = 6.4; // dB por 15 ms: una canción sin pulso no da más; cinco de los diez son de ≥ 9,5 dB (se informa)
const MIN_LU_BAJO_VOZ = 9; // la música bajo la voz queda al menos esto por debajo de ella
const LECTURA = { minF: 75, maxF: 165, maxPalabrasPorSegundo: 3.0 }; // un rótulo se lee entre 2,5 y 5,5 s, a ≤ 3 palabras por segundo

/**
 * LOS RÓTULOS TAL CUAL los dio el usuario (reparto §5c): id del bloque → texto (las líneas unidas con un espacio). Si el plan se aparta, falla.
 */
const ROTULOS = {
  r00: "¿Pagarías $14.800.000 al mes por vivir aquí?",
  r01: "Mira lo que incluye:",
  r02: "Jacuzzi privado con vista a Medellín",
  r03: "113 m² amoblados y equipados",
  r04: "Piscina, gimnasio, spa y coworking",
  r05: "Y lo que no esperabas:",
  r06: "Aseo semanal incluido",
  r07: "Acompañamiento personalizado",
  r08: "Chef privado y conductor a tu medida",
  r09: "Con la mejor asesoría de la ciudad",
};
/** Qué golpe de `GOLPES` abre cada rótulo y cada plano (el cambio cae en él). */
const GOLPE_DE_ROTULO = { r01: "cielo", r02: "jacuzzi", r03: "cocina", r04: "bar", r05: "torres", r06: "alcoba", r07: "acompanamiento", r08: "sala", r09: "piscina" };
const GOLPE_DE_PLANO = { "c02-cielo": "cielo", "c03-cocina": "cocina", "c04-bar": "bar", "c05-balcon": "camas", "c06-alcoba": "alcoba", "c07-sala": "sala", "c08-piscina": "piscina", "c09-cta": "cta" };

/**
 * Bloques de subtítulos que NO acompañan a una palabra dicha, y por qué. Una
 * excepción que sobra (el bloque ya no existe, o todos sus trozos caen sobre
 * voz) tumba la puerta.
 */
/**
 * Las versiones ANTERIORES del mismo reel (otra canción, otro hook…), para la sección 7b: cuánto metraje comparte esta con cada
 * una. `{ nombre, plan, cortes }`: el `metraje-053.ts` de aquella (ruta desde la raíz del repo) y el nombre de su export.
 * Vacío en la primera versión. Ejemplo (el 018 frente al 017):
 *   [{ nombre: "la V1 (017)", plan: "remotion/src/proyectos/017/metraje-017.ts", cortes: "metraje017" }]
 */
const VERSIONES_ANTERIORES = [];

const SIN_VOZ = Object.fromEntries(Object.keys(ROTULOS).map((id) => [id, "rótulo del guion en pantalla (reparto §5c): sin voz en off, sincronizado a los planos y a los golpes de la música"]));

// Un plan que no carga (un corte con voz y velocidad distinta de 1, un import
// roto) no deja una traza: dice qué pasa y sale con 1.
const puerta = await abrePuerta({
  proyecto: "053",
  plan: "remotion/src/proyectos/053/metraje-053.ts",
  cortes: "metraje053",
  receta: "node proyectos/053/normalizar.mjs",
  extras: {
    audio: "remotion/src/proyectos/053/audio-053.ts",
    subtitulos: "remotion/src/proyectos/053/subtitulos-053.ts",
    tramos: "remotion/src/motor/sound/tramos.ts",
    editorial: "remotion/src/motor/subtitulos-editoriales.ts",
    marca: "remotion/src/marcas/luxur.ts",
    cierre: "remotion/src/proyectos/053/cierre-053.ts",
  },
}).catch((e) => {
  console.log(`\n❌ el plan del 053 no carga: ${e.message}\n`);
  process.exit(1);
});
const { cortes, fps, fallos, mal, ok, seccion } = puerta;
const M = puerta.plan;
const F = puerta.modulos.formato;
const A = puerta.modulos.audio;
const T = puerta.modulos.tramos;
const E = puerta.modulos.editorial;
const bloques = puerta.modulos.subtitulos.subtitulos053;
const DURACION = M.DURACION_053;
const byId = (id) => {
  const c = cortes.find((x) => x.id === id);
  if (!c) throw new Error(`falta el plano ${id} en metraje-053.ts`);
  return c;
};
const CANAL = puerta.modulos.marca.LUXUR;

/* 1 · línea de tiempo ───────────────────────────────────────────────────── */
seccion("1. línea de tiempo");
puerta.lineaDeTiempo({ duracion: DURACION });

/** La voz de un corte en frames de la COMP (la misma cuenta que `frameDeFuente`). */
const vozDe = (c) => ({
  ini: T.frameDeFuente(c.en, c.desde, c.voz.s0, fps),
  fin: T.frameDeFuente(c.en, c.desde, c.voz.s1, fps),
});
const conVoz = cortes.filter((c) => c.audio);
/** La tarjeta oscura del cierre (el único plano `foto`): es del bloque 6 pero ella no habla en él. */
const esTarjeta = (c) => c.tipo === "foto";
/** El primer frame en que un plano se ve: si disuelve, antes de su `en`. */
const visibleDesde = (c) => c.en - F.solapeDe(c);

/* 2 · estructura ────────────────────────────────────────────────────────── */
seccion("2. la estructura de la réplica (bloques 2-5-6): Isabella caminando con su rótulo, el recorrido del original con un rótulo por tramo, el CTA a cámara");
{
  const n = fallos.length;
  const primero = cortes[0];
  if (primero.id !== "c01-hook" || primero.bloque !== 2) mal(`${primero.id}: el primer plano es c01-hook, del bloque 2 (la pieza abre con Isabella, como el original)`);
  if (primero.audio) mal(`${primero.id}: el primer plano lleva \`audio\` propio; su voz es la locución en off (audio-053.ts)`);
  if ((primero.entra ?? "corte") !== "corte") mal(`${primero.id}: entra con «${primero.entra}»; el frame 0 no nace de un fundido`);
  cortes.forEach((c, i) => {
    if (!BLOQUES.includes(c.bloque)) mal(`${c.id}: bloque ${c.bloque}; esta pieza lleva los bloques ${BLOQUES.join(", ")}`);
    if (i > 0 && c.bloque < cortes[i - 1].bloque) mal(`${c.id}: bloque ${c.bloque} después del ${cortes[i - 1].bloque}; los bloques van en orden`);
    const deElla = DE_ELLA.includes(c.bloque) && !esTarjeta(c);
    if (deElla && !c.audio) mal(`${c.id}: bloque ${c.bloque} sin \`audio\`; en los bloques ${DE_ELLA.join(", ")} habla Isabella a cámara`);
    if (!deElla && c.audio) mal(`${c.id}: bloque ${c.bloque} con \`audio\`; fuera del CTA la voz es la locución en off y va en audio-053.ts`);
    if (c.audio && !c.voz) mal(`${c.id}: tiene \`audio\` pero no \`voz\` (s0, s1, lufs medidos con limites-voz.py)`);
    if (!c.reason || c.reason.trim().length < 15) mal(`${c.id}: sin \`reason\`; cada plano dice qué hace ahí o sobra (viaje-emocional.md §4)`);
    if ((c.velocidad ?? 1) !== 1) mal(`${c.id}: velocidad ${c.velocidad}; solo se acelera la aproximación (bloque 3) y esta pieza no la lleva`);
  });
  // LAS MISMAS TOMAS EN EL MISMO ORDEN que el original: el clip de cada plano de vídeo, en orden.
  const clips = cortes.filter((c) => c.tipo !== "foto").map((c) => c.src.replace(/^recorrido-053\//, "").replace(/\.mp4$/, ""));
  if (JSON.stringify(clips) !== JSON.stringify(ORDEN_DEL_ORIGINAL)) mal(`las tomas (${clips.join(" · ")}) no son las del original en su orden (${ORDEN_DEL_ORIGINAL.join(" · ")})`);
  // La vista de la réplica es el balcón (el plano más largo del bloque 5); el carril de nado cierra la locución, como en el original.
  const recorrido = cortes.filter((c) => c.bloque === 5);
  const masLargo = recorrido.reduce((a, b) => (b.dur > a.dur ? b : a));
  if (masLargo.id !== PLANO_MAS_LARGO) mal(`el plano más largo del bloque 5 es ${masLargo.id} (${masLargo.dur} f) y tiene que ser ${PLANO_MAS_LARGO}: el cielo con el jacuzzi, que cubre dos rótulos`);
  if (recorrido.at(-1).id !== "c08-piscina") mal(`el último plano del bloque 5 es ${recorrido.at(-1).id}; en el original acaba en el carril de nado (c08-piscina)`);
  for (const b of BLOQUES) if (!cortes.some((c) => c.bloque === b)) mal(`falta el bloque ${b}`);
  const ultimo = cortes.at(-1);
  if (ultimo.bloque !== BLOQUES.at(-1)) mal(`${ultimo.id}: la pieza acaba en el bloque ${ultimo.bloque}; cierra Isabella con el CTA (bloque ${BLOQUES.at(-1)})`);
  const antesDelCta = cortes.filter((c) => c.bloque < BLOQUES.at(-1)).at(-1);
  if (antesDelCta && antesDelCta.bloque !== BLOQUES.at(-2)) mal(`${antesDelCta.id}: el plano anterior al CTA es del bloque ${antesDelCta.bloque}; tiene que ser del recorrido (bloque ${BLOQUES.at(-2)})`);
  // Isabella a cámara, una vez (el CTA).
  const veces = DE_ELLA.filter((b) => BLOQUES.includes(b)).length;
  if (conVoz.length !== veces) mal(`Isabella sale ${conVoz.length} veces a cámara; con los bloques ${BLOQUES.join(", ")} son ${veces}`);
  if (DURACION / fps > TOPE_SEGUNDOS) mal(`${(DURACION / fps).toFixed(1)} s: el formato no pasa de ${TOPE_SEGUNDOS} s`);
  if (fallos.length === n) {
    const porBloque = BLOQUES.map((b) => `b${b} ${(cortes.filter((c) => c.bloque === b).reduce((s, c) => s + c.dur, 0) / fps).toFixed(1)} s`);
    console.log("  ℹ️  EXCEPCIONES DECLARADAS (réplica de 03.mp4): abre con Isabella (no con la casa limpia) · sin voz en off: los rótulos no acompañan a ninguna voz · el último plano del bloque 5 es el carril de nado y el más largo, el cielo con el jacuzzi (dos rótulos)");
    ok(`${cortes.length} planos · ${(DURACION / fps).toFixed(1)} s · ${porBloque.join(" · ")} · las tomas del original en su orden (${ORDEN_DEL_ORIGINAL.length}) · Isabella a cámara ${conVoz.length} vez · todos con razón`);
  }
}

/* 2a · las cifras ───────────────────────────────────────────────────────── */
seccion("2a. las cifras: «$14.800.000» en el gancho (el canon real) y «113 m²» en el rótulo 3 (el texto del usuario); ninguna otra");
{
  const n = fallos.length;
  const conCifra = [];
  for (const b of bloques) for (const t of b.trozos) if (/\d/.test(t.texto)) conCifra.push({ b: b.id, t });
  const hook = byId("c01-hook");
  const cielo = byId("c02-cielo");
  const esperadas = { r00: "$14.800.000", r03: "113 m²" };
  const halladas = Object.fromEntries(conCifra.map((x) => [x.b, x.t.texto]));
  if (JSON.stringify(halladas) !== JSON.stringify(esperadas)) mal(`cifras en pantalla: ${JSON.stringify(halladas)}; tiene que ser exactamente ${JSON.stringify(esperadas)} (el 24/7 y las demás, ni una)`);
  const h = conCifra.find((x) => x.b === "r00");
  if (h) {
    if (h.t.desde < hook.en || h.t.desde >= cielo.en) mal(`[r00] la cifra entra en f${h.t.desde}, fuera del gancho (f${hook.en}-${cielo.en})`);
    if (h.t.estilo === "dato") mal("[r00] la cifra va como dato grande al centro: el dato solo vive en el bloque 3; aquí es un acento");
  }
  for (const c of conVoz) if (/\d/.test(c.voz.dice)) mal(`${c.id}: su \`dice\` lleva cifras en dígitos («${c.voz.dice}»)`);
  if (fallos.length === n) ok("«$14.800.000» (acento del gancho: el canon real de la ficha, no los 14 millones del original) y «113 m²» (el área, en el rótulo 3); ninguna otra en pantalla");
}

/* 2b · las reglas fijas del canal ───────────────────────────────────────── */
seccion("2b. reglas fijas del canal (la primera toma sin texto ni voz: EXCEPCIÓN DECLARADA, abre Isabella con su rótulo), nunca el sello ni la cuenta");
{
  const n = fallos.length;
  const hook = byId("c01-hook");
  if (hook.en !== 0 || (hook.entra ?? "corte") !== "corte") mal(`${hook.id}: tiene que estar en el f0 y entrar a corte (la pieza abre con Isabella)`);
  if (hook.audio) mal(`${hook.id}: lleva voz; el gancho es un rótulo sobre su imagen, sin voz`);
  if (bloques.length === 0) mal("no hay ningún subtítulo");
  else {
    // El f0 (la miniatura) sale limpio; el rótulo del gancho entra entre el f3 y el f12 y es el primer texto de la pieza.
    const primerTexto = Math.min(...bloques.map((b) => b.trozos[0].desde));
    if (primerTexto <= 0) mal(`el primer texto entra en el frame ${primerTexto}: el f0 sale sin texto`);
    if (primerTexto < 3 || primerTexto > 12) mal(`el primer texto entra en f${primerTexto}; el rótulo del gancho entra entre el f3 y el f12 (el f0 limpio, sin hacerla esperar)`);
  }
  const hayArriba = bloques.filter((b) => b.posicion === "arriba");
  if (hayArriba.length) mal(`hay texto arriba (${hayArriba.map((b) => b.id).join(", ")}): ni hook escrito ni cuenta; arriba no hay nada`);
  if (bloques.some((b) => b.trozos.some((t) => /@/.test(t.texto)))) mal("hay una cuenta de texto (@…) en los subtítulos: el cierre lleva el logo y la web, no la cuenta");
  // NUNCA el sello «PROPIEDADES LUXUR»: ni se importa ni se monta ni se escribe a mano.
  const fuente = readFileSync(join(RAIZ, "remotion", "src", "proyectos", "053", "Recorrido053.tsx"), "utf8");
  const sinComentarios = fuente.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
  if (/SelloCampana/.test(sinComentarios)) mal("la composición usa `SelloCampana`: el sello «PROPIEDADES LUXUR» no se pone NUNCA");
  if (/PROPIEDADES LUXUR/.test(sinComentarios)) mal("la composición escribe «PROPIEDADES LUXUR» a mano: el sello no se pone NUNCA");
  if (fallos.length === n) {
    console.log("  ℹ️  EXCEPCIÓN DECLARADA (réplica de 03.mp4): el f0 es Isabella y el rótulo del gancho entra unos frames después; la regla fija «la primera toma sale sin texto ni voz» no se cumple en esta pieza");
    ok(`la pieza ABRE con Isabella (excepción declarada): el f0 sale limpio y su rótulo entra en f${Math.min(...bloques.map((b) => b.trozos[0].desde))} · nada arriba y ninguna cuenta · sin sello (no se usa \`SelloCampana\`)`);
  }
}

/* 2c · el cierre: sin congelar, la tarjeta oscura con el logo y la web ──────── */
seccion("2c. el cierre: nada se congela, y la tarjeta oscura con el logo (pequeño, al 60 %) y la web");
{
  const n = fallos.length;
  const CI = puerta.modulos.cierre;
  const cta = [...cortes].reverse().find((c) => c.audio);
  const tarjeta = cortes.at(-1);
  const vistaCuadro = { ancho: 1080, alto: 1920 };
  const letraBase = E.letraSubtitulosDe(CANAL).base;
  const fuente = readFileSync(join(RAIZ, "remotion", "src", "proyectos", "053", "Recorrido053.tsx"), "utf8");
  const sinComentarios = fuente.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
  const png = (ruta) => {
    const b = readFileSync(ruta);
    const esPng = b.length > 26 && b.subarray(1, 4).toString() === "PNG";
    return esPng ? { ancho: b.readUInt32BE(16), alto: b.readUInt32BE(20), color: b[25] } : null;
  };

  // «No dejes que el último fotograma se congele»: el CTA llega a su último fotograma y no se repite; sigue la tarjeta.
  if (tarjeta.tipo !== "foto" || tarjeta.src !== CI.TARJETA) mal(`el último plano (${tarjeta.id}) tiene que ser la foto ${CI.TARJETA} (un negro liso), no ${tarjeta.tipo} ${tarjeta.src}`);
  if (tarjeta.en !== cta.en + cta.dur) mal(`${tarjeta.id} entra en f${tarjeta.en} y la toma del CTA acaba en f${cta.en + cta.dur}: la tarjeta sigue a la toma sin hueco`);
  const congelados = cortes.filter((c) => c !== tarjeta && (c.tipo === "foto" || /-cola\.mp4$/.test(c.src)));
  if (congelados.length) mal(`se congela un fotograma (${congelados.map((c) => c.id).join(", ")}): el último fotograma NO se congela`);
  if (tarjeta.dur !== CI.DUR_TARJETA) mal(`${tarjeta.id} dura ${tarjeta.dur} f y cierre-053.ts dice ${CI.DUR_TARJETA}`);
  if (tarjeta.dur < TARJETA_FRAMES[0] || tarjeta.dur > TARJETA_FRAMES[1]) mal(`la tarjeta dura ${tarjeta.dur} f (entre ${TARJETA_FRAMES[0]} y ${TARJETA_FRAMES[1]}): la web se lee, sin quedarse muerto`);
  const rutaTarjeta = join(PUBLICO, CI.TARJETA);
  if (!existsSync(rutaTarjeta)) mal(`no existe remotion/public/${CI.TARJETA} (node proyectos/053/normalizar.mjs)`);
  else {
    const t = png(rutaTarjeta);
    if (!t || t.ancho < 1296 || t.alto < 2304) mal(`${CI.TARJETA} mide ${t ? `${t.ancho}×${t.alto}` : "?"}; tiene que cubrir el cuadro como los clips (1296×2304)`);
    // OSCURA: el máximo de luma de toda la imagen, medido, no supuesto.
    const r = ejecutar("ffmpeg", ["-nostdin", "-v", "error", "-i", rutaTarjeta, "-vf", "signalstats,metadata=print:key=lavfi.signalstats.YMAX:file=-", "-f", "null", "-"]);
    const mY = /YMAX=(\d+)/.exec(r.stdout);
    if (!mY || Number(mY[1]) > 24) mal(`la tarjeta no es oscura: luma máxima ${mY ? mY[1] : "no medible"} (negro = 16; el tope son 24)`);
  }
  // El fundido a negro: llega a negro EXACTO en el último fotograma de la toma y empieza cuando ella casi ha acabado.
  const ultimaDeIsabella = cta.en + cta.dur - 1;
  if (!(CI.FUNDIDO_A_OSCURO >= 4 && CI.FUNDIDO_A_OSCURO <= 8)) mal(`FUNDIDO_A_OSCURO = ${CI.FUNDIDO_A_OSCURO} f; entre 4 y 8: más largo se come su última palabra, más corto es un parpadeo`);
  if (ultimaDeIsabella - CI.FUNDIDO_A_OSCURO < vozDe(cta).fin - 6) mal(`el fundido a negro empieza en f${ultimaDeIsabella - CI.FUNDIDO_A_OSCURO}, más de 6 f antes de que ella acabe de hablar (f${vozDe(cta).fin})`);
  if (!/<FundidoACierre\s*\/>/.test(sinComentarios) || !/interpolate\(frame,\s*\[ULTIMA_DE_ISABELLA\s*-\s*FUNDIDO_A_OSCURO,\s*ULTIMA_DE_ISABELLA\]/.test(sinComentarios)) {
    mal("el fundido a negro no está montado, o su rampa no acaba en el último fotograma de Isabella (`<FundidoACierre />`)");
  }
  // El logo: más pequeño que la referencia («un poco»: entre el 65 y el 95 % de lo que era) y al 60 % de opacidad (40 % de transparencia).
  const razon = CI.LOGO_ANCHO / CI.LOGO_ANCHO_REF;
  if (!(razon >= 0.65 && razon <= 0.95)) mal(`el logo mide ${CI.LOGO_ANCHO} px de ancho (${(razon * 100).toFixed(0)} % de los ${CI.LOGO_ANCHO_REF} de referencia): «un poco más pequeño» es entre el 65 y el 95 %`);
  if (Math.abs(CI.LOGO_TRANSPARENCIA - 0.4) > 1e-9 || Math.abs(CI.LOGO_OPACIDAD - 0.6) > 1e-9) mal(`el logo está a ${(CI.LOGO_TRANSPARENCIA * 100).toFixed(0)} % de transparencia (opacidad ${CI.LOGO_OPACIDAD}) y el canal pide 40 % (opacidad 0,6)`);
  if (!/\*\s*LOGO_OPACIDAD/.test(sinComentarios)) mal("la composición no aplica LOGO_OPACIDAD al logo");
  if (!/Propiedade-Luxur-Logo\.png$/.test(CI.LOGO)) mal(`el logo es ${CI.LOGO}: el del canal es Propiedade-Luxur-Logo.png`);
  else if (!existsSync(join(PUBLICO, CI.LOGO))) mal(`no existe remotion/public/${CI.LOGO}`);
  else {
    const l = png(join(PUBLICO, CI.LOGO));
    if (!l || l.ancho !== 1000 || l.alto !== 518 || l.color !== 6) mal(`${CI.LOGO} no es un PNG RGBA de 1000×518 (es ${l ? `${l.ancho}×${l.alto}, tipo de color ${l.color}` : "ilegible"})`);
  }
  if (!/<LogoCierre\s*\/>/.test(sinComentarios) || !/<Img\b[^>]*src=\{staticFile\(LOGO\)\}/.test(sinComentarios)) mal("el logo no está montado: falta <LogoCierre /> o su <Img src={staticFile(LOGO)}>");
  // La web: montada, que cabe a su cuerpo y dentro de las zonas seguras.
  if (CI.WEB !== "PropiedadesLuxur.com") mal(`la web es «${CI.WEB}»: la del canal es «PropiedadesLuxur.com» tal cual (si el canal cambia de web, cambia también esta puerta)`);
  if (!/<WebCierre\s*\/>/.test(sinComentarios) || !/\{WEB\}/.test(sinComentarios)) mal("la web no está montada: falta <WebCierre /> o su {WEB}");
  const anchoWeb = E.anchoLinea(CI.WEB, letraBase, CI.WEB_PX);
  const util = vistaCuadro.ancho - 2 * E.margenDe(vistaCuadro);
  if (anchoWeb === null) mal("la letra de la base no tiene tabla de avances: no se puede comprobar que la web cabe");
  else if (anchoWeb > util) mal(`la web mide ≈ ${anchoWeb} px a ${CI.WEB_PX} px y el ancho útil son ${util}`);
  // Zonas seguras (R14): nada por encima del 12,5 % ni por debajo del 88 %; la web, debajo del logo; ambos centrados.
  const techo = Math.round(vistaCuadro.alto * 0.125);
  const suelo = Math.round(vistaCuadro.alto * 0.88);
  if (CI.LOGO_ENSI.arriba < techo) mal(`el logo empieza en y≈${CI.LOGO_ENSI.arriba.toFixed(0)} px, por encima de ${techo} (lo que tapa la interfaz de las plataformas)`);
  if (CI.WEB_ARRIBA + CI.WEB_ALTO_LINEA > suelo) mal(`la web acaba en y≈${CI.WEB_ARRIBA + CI.WEB_ALTO_LINEA} px, por debajo de ${suelo}`);
  if (!(CI.LOGO_ENSI.abajo < CI.WEB_ARRIBA)) mal(`la web (y≈${CI.WEB_ARRIBA}) tiene que ir debajo del logo (acaba en y≈${CI.LOGO_ENSI.abajo.toFixed(0)})`);
  if (CI.LOGO_ENSI.ancho > util) mal(`el logo mide ≈ ${CI.LOGO_ENSI.ancho.toFixed(0)} px y el ancho útil son ${util}`);
  // Tiempos: nada de esto aparece sobre la imagen de Isabella y todo se lee entero antes del final.
  if (CI.LOGO_RETRASO < 0 || CI.WEB_RETRASO < 0) mal("el logo y la web entran en la tarjeta, no antes");
  if (tarjeta.en + CI.LOGO_RETRASO + CI.LOGO_ENTRA + 20 > DURACION) mal("el logo no llega a estar entero 20 f antes del final");
  if (tarjeta.en + CI.WEB_RETRASO + CI.WEB_ENTRA + 30 > DURACION) mal("la web no llega a estar entera 30 f (1 s) antes del final: no se lee");
  if (bloques.some((b) => b.hasta > tarjeta.en + 4)) mal("hay subtítulos sobre la tarjeta: lo único que lleva es el logo y la web");
  if (fallos.length === n) {
    ok(`nada se congela: la imagen funde a negro en ${CI.FUNDIDO_A_OSCURO} f y llega a negro en f${ultimaDeIsabella} · tarjeta oscura de ${(tarjeta.dur / fps).toFixed(1)} s · logo ${CI.LOGO_ANCHO} px al ${CI.LOGO_OPACIDAD * 100} % de opacidad · «${CI.WEB}» a ${CI.WEB_PX} px, ≈ ${anchoWeb} de ${util} px útiles`);
  }
}

/* 2d · el color de cada plano (R32): solo si el plan lleva `color` ─────────── */
if (cortes.some((c) => c.color !== undefined)) {
  seccion("2d. el color de cada plano (colorCorrection, R32)");
  const n = fallos.length;
  /**
   * Los topes del color de Luxur, los del 017 (revisión 7): salieron de graduar y medir, no del efecto, que admite más.
   * `vibrance` por encima de 0,05 pintó un moteado de colores sobre el hormigón gris y volvió rosadas las nubes; una
   * exposición de más de ±0,4 pasos ya no es un ajuste sino otro clip mal expuesto (se vuelve a medir); la saturación
   * global se queda entre 0,95 y 1,12; y la piel de Isabella (saturación ≤ 1,06, sin tirar de cálido ni de frío) donde estaba.
   */
  const TOPES_COLOR = { vibrance: 0.05, exposure: 0.4, contrast: 1.15, highlightsMin: -0.6, saturation: [0.95, 1.12] };
  const TOPES_PIEL = { saturationMax: 1.06, temperature: 0.06, tint: 0.03 };
  const videos = cortes.filter((c) => c.tipo !== "foto");
  const tarjeta = cortes.at(-1);
  // El formato: solo claves del efecto, números finitos dentro de su rango, y nunca en una foto.
  puerta.colorCine();
  // «Balanceado» es entre planos: TODOS los de vídeo pasan por el efecto (y por el mismo camino de decodificación).
  const sinColor = videos.filter((c) => c.color === undefined);
  if (sinColor.length) mal(`sin \`color\`: ${sinColor.map((c) => c.id).join(", ")}; en una pieza graduada TODOS los planos de vídeo lo llevan (\`color({})\` iguala el camino)`);
  if (tarjeta.tipo === "foto" && tarjeta.color !== undefined) mal(`${tarjeta.id}: la tarjeta oscura no se gradúa (es un negro liso y es una foto)`);
  // Dos planos SEGUIDOS del mismo clip son una toma partida: el mismo color en los dos, o el corte que no debe verse se ve.
  const claves = (c) => JSON.stringify(Object.entries(c.color ?? {}).sort(([x], [y]) => x.localeCompare(y)));
  for (let i = 1; i < videos.length; i++) {
    const [a, b] = [videos[i - 1], videos[i]];
    if (a.src === b.src && claves(a) !== claves(b)) mal(`${a.id} y ${b.id} son seguidos y del mismo clip (una toma partida) y llevan colores distintos: el empalme en f${b.en} dejaría de ser invisible`);
  }
  const piel = new Set(conVoz.map((c) => c.id));
  for (const c of videos) {
    const k = c.color ?? {};
    const v = (clave, defecto) => k[clave] ?? defecto;
    if (v("vibrance", 0) > TOPES_COLOR.vibrance) mal(`${c.id}: vibrance ${v("vibrance", 0)} > ${TOPES_COLOR.vibrance}: amplifica el ruido de croma del hormigón y vuelve rosadas las nubes; la viveza se pide con \`saturation\``);
    if (Math.abs(v("exposure", 0)) > TOPES_COLOR.exposure) mal(`${c.id}: exposure ${v("exposure", 0)} fuera de ±${TOPES_COLOR.exposure}: es otro clip mal expuesto, no un ajuste; vuelve a medirlo`);
    if (v("contrast", 1) > TOPES_COLOR.contrast) mal(`${c.id}: contrast ${v("contrast", 1)} > ${TOPES_COLOR.contrast}`);
    if (v("highlights", 0) < TOPES_COLOR.highlightsMin) mal(`${c.id}: highlights ${v("highlights", 0)} < ${TOPES_COLOR.highlightsMin}: las luces se aplastan`);
    const [sMin, sMax] = TOPES_COLOR.saturation;
    if (v("saturation", 1) < sMin || v("saturation", 1) > sMax) mal(`${c.id}: saturation ${v("saturation", 1)} fuera de [${sMin}, ${sMax}]`);
    if (piel.has(c.id)) {
      if (v("saturation", 1) > TOPES_PIEL.saturationMax) mal(`${c.id}: Isabella con saturation ${v("saturation", 1)} > ${TOPES_PIEL.saturationMax}: la piel se pasa de viva`);
      if (Math.abs(v("temperature", 0)) > TOPES_PIEL.temperature) mal(`${c.id}: Isabella con temperature ${v("temperature", 0)} fuera de ±${TOPES_PIEL.temperature}: la piel vira`);
      if (Math.abs(v("tint", 0)) > TOPES_PIEL.tint) mal(`${c.id}: Isabella con tint ${v("tint", 0)}: la piel vira a verde o a magenta`);
    }
  }
  if (fallos.length === n) {
    ok(`${videos.length} planos de vídeo con color · vibrance ≤ ${TOPES_COLOR.vibrance} · |exposure| ≤ ${TOPES_COLOR.exposure} · las ${piel.size} tomas de Isabella con saturation ≤ ${TOPES_PIEL.saturationMax}`);
  }
}

/* 2f · las entradas ─────────────────────────────────────────────────────── */
seccion("2f. todas las entradas son disolvencias (salvo el f0): «Softly» no tiene golpes seguidos donde cortar en seco");
{
  const n = fallos.length;
  for (const c of cortes.slice(1)) {
    if (c.tipo === "foto") continue;
    if (c.entra !== "disolver") mal(`${c.id}: entra con «${c.entra}»; todas las entradas de esta pieza son disolvencias`);
  }
  if (fallos.length === n) ok("todos los planos de vídeo, salvo el primero, entran con una disolvencia de 12 f (opacos en el golpe de su cambio)");
}

/* 3 · la voz de las tomas ───────────────────────────────────────────────── */
seccion("3. la voz de las tomas a cámara");
{
  const n = fallos.length;
  const ganancias = [];
  cortes.forEach((c, i) => {
    if (!c.audio || !c.voz) return;
    if (!existsSync(join(PUBLICO, c.audio))) return mal(`${c.id}: no existe remotion/public/${c.audio} (node proyectos/053/normalizar.mjs)`);
    const { ini, fin } = vozDe(c);
    const disuelve = c.entra === "disolver";
    const siguiente = cortes[i + 1];
    const d0 = Math.round((c.desde ?? 0) * fps);
    const antes = disuelve ? T.CRUCE_VOZ : 0;
    if (d0 - antes < 0) mal(`${c.id}: el cruce de voz pide empezar ${antes - d0} f antes del principio de ${c.audio}`);
    const dura = duracionDe(c.audio);
    if ((d0 + c.dur) / fps > dura) mal(`${c.id}: la voz se lee hasta ${((d0 + c.dur) / fps).toFixed(2)} s y ${c.audio} dura ${dura.toFixed(2)} s`);
    if (c.voz.s1 > dura) mal(`${c.id}: voz.s1 = ${c.voz.s1} s, fuera del WAV (${dura.toFixed(2)} s)`);
    if (!(c.voz.s1 > c.voz.s0)) mal(`${c.id}: voz.s1 (${c.voz.s1}) no es posterior a voz.s0 (${c.voz.s0})`);
    // Al entrar: con disolvencia, la primera palabra suena cuando su imagen ya es
    // opaca; a corte, después del desclic (la voz sube en esos frames).
    if (disuelve && ini < c.en + 1) mal(`${c.id}: empieza a hablar en f${ini} y su imagen no es opaca hasta f${c.en}: la primera palabra suena a medio fundir`);
    if (!disuelve && ini < c.en + T.DESCLIC_VOZ) mal(`${c.id}: empieza a hablar en f${ini} y el desclic de entrada dura hasta f${c.en + T.DESCLIC_VOZ}: la primera palabra suena a medio subir`);
    // Al salir: o cruza con el siguiente (y calla antes de que empiece su disolvencia) o baja en el desclic.
    if (siguiente) {
      const limite = siguiente.entra === "disolver" ? siguiente.en - F.DISOLVER - MARGEN_FUNDIDO : siguiente.en - T.DESCLIC_VOZ;
      if (fin > limite) mal(`${c.id}: la última palabra acaba en f${fin} y tiene que callar en f${limite} (${siguiente.entra === "disolver" ? "empieza la disolvencia de" : "calla antes del corte a"} ${siguiente.id})`);
    }
    const g = 20 * Math.log10(T.gananciaHasta(c.voz.lufs, M.OBJETIVO_LUFS));
    if (Math.abs(g) > 6) mal(`${c.id}: ganancia de voz ${g.toFixed(1)} dB (|g| > 6: ¿es la misma voz, el mismo micro?)`);
    ganancias.push(`${c.id} ${g >= 0 ? "+" : ""}${g.toFixed(1)}`);
  });
  // La cola de la PIEZA: desde la última palabra de la última toma (el CTA) hasta el final quedan 45-120 f: lo que la tarjeta del
  // cierre (el logo y la web, sección 2c) necesita para leerse, sin quedarse muerto. Nada se congela.
  const ultima = conVoz.at(-1);
  const cola = DURACION - vozDe(ultima).fin;
  if (cola < COLA_FINAL[0] || cola > COLA_FINAL[1]) mal(`${ultima.id}: ${cola} f entre su última palabra y el final de la pieza (entre ${COLA_FINAL[0]} y ${COLA_FINAL[1]})`);
  if (fallos.length === n) ok(`${conVoz.length} tomas con su WAV y su tramo, ninguna palabra en un fundido · a ${M.OBJETIVO_LUFS} LUFS: ${ganancias.join(" · ")} dB · ${cola} f desde la última palabra hasta el final (la tarjeta del cierre)`);
}

/* 4 · la música, a sus golpes ───────────────────────────────────────────── */
seccion("4. la música: «Softly», cada plano y cada rótulo en un golpe medido; el CTA entra en el golpe de 87,3 s y la música baja DESPUÉS, con curva, y se apaga bajo la tarjeta");
const ventanasDeVoz = conVoz.filter((c) => c.voz).map((c) => ({ id: c.id, ...vozDe(c) }));
{
  const n = fallos.length;
  for (const a of T.revisaAudio(A.audio053, { fps, duracion: DURACION })) mal(`revisaAudio: ${a}`);
  for (const t of A.audio053) {
    if (!existsSync(join(PUBLICO, t.src))) {
      mal(`${t.id}: no existe remotion/public/${t.src}`);
      continue;
    }
    if (t.bucle) continue;
    const hasta = (Math.round((t.desde ?? 0) * fps) + t.dur) / fps;
    const dura = duracionDe(t.src);
    if (hasta > dura + 1 / fps) mal(`${t.id}: se lee hasta ${hasta.toFixed(2)} s y ${t.src} dura ${dura.toFixed(2)} s`);
  }
  if (A.audio053.some((t) => /off/.test(t.id))) mal("hay un tramo de voz en off: la pieza no lleva locución (cambio de encargo del 2026-10-20)");
  const musica = A.audio053.find((t) => t.id === "musica");
  const cta = byId("c09-cta");
  if (!musica || musica.src !== "recorrido-053/musica-053.wav") mal("no suena «Softly» (recorrido-053/musica-053.wav)");
  else {
    if (Math.abs(musica.desde - M.INICIO_MUSICA) > 1e-9) mal(`la música arranca en ${musica.desde} s y INICIO_MUSICA dice ${M.INICIO_MUSICA}`);
    // Una sola canción, del frame 0 hasta FIN_MUSICA_053: se apaga con curva tras la última palabra del CTA y llega a cero 2 f antes del final de la pieza (la tarjeta va en silencio).
    if (musica.en !== 0 || musica.dur !== M.FIN_MUSICA_053) mal(`la música ocupa f${musica.en}-${musica.en + musica.dur} y tiene que ir de 0 a FIN_MUSICA_053 (f${M.FIN_MUSICA_053})`);
    if (M.FIN_MUSICA_053 !== DURACION - 2) mal(`la música acaba en f${M.FIN_MUSICA_053} y la pieza en f${DURACION}: tiene que acabar 2 f antes`);
    const g = Array.isArray(musica.ganancia) ? musica.ganancia : [];
    const ultimoPunto = g.at(-1);
    if (!ultimoPunto || ultimoPunto[0] !== M.FIN_MUSICA_053 || ultimoPunto[1] !== 0) mal(`la envolvente de la música no acaba en silencio en f${M.FIN_MUSICA_053}`);
    // Entra EN el f0, con un fundido corto: arranca en mitad de la calma de la canción (una entrada a pelo daría un clic).
    if (T.volumenDe(musica, 0) !== 0) mal(`la música no arranca en silencio en el f0 (×${T.volumenDe(musica, 0).toFixed(3)}): el fundido de entrada evita el clic`);
    if (T.volumenDe(musica, A.FADE_ENTRADA) < A.ALTO * 0.98) mal(`la música no ha llegado a su nivel en el f${A.FADE_ENTRADA}`);
    // LA MÚSICA PESA MÁS: arriba (a ALTO) desde que llega a su nivel hasta el golpe del CTA.
    for (let f = A.FADE_ENTRADA; f <= A.INICIO_BAJADA; f += 5) {
      if (Math.abs(T.volumenDe(musica, f) - A.ALTO) > 0.02 * A.ALTO) mal(`la música no está a su nivel en f${f} (×${T.volumenDe(musica, f).toFixed(3)}, ALTO ×${A.ALTO.toFixed(3)}): esta pieza no la baja salvo bajo la voz del CTA`);
    }
    if (M.INICIO_MUSICA * fps !== Math.round(M.INICIO_MUSICA * fps)) mal(`INICIO_MUSICA (${M.INICIO_MUSICA}) no es un frame exacto de la canción`);
  }
  // CADA cambio cae en un golpe MEDIDO (`musica/golpes-softly-*.json`, de `medir-pista.py --json`): ±4 ms y ±0,5 dB frente a lo medido; cada plano entra a ≤ 1 f de donde SUENA y cada rótulo empieza a ≤ 2 f.
  const medidos = [
    ...JSON.parse(readFileSync(join(RAIZ, "proyectos", "053", "musica", "golpes-softly-0-90.json"), "utf8")).golpes,
    ...JSON.parse(readFileSync(join(RAIZ, "proyectos", "053", "musica", "golpes-softly-90-225.json"), "utf8")).golpes,
  ];
  const golpes = M.GOLPES;
  for (const [clave, gp] of Object.entries(golpes)) {
    const real = medidos.find((x) => Math.abs(x.t - gp.t) <= 0.004);
    if (!real) mal(`el golpe «${clave}» (${gp.t} s de la canción) no está entre los medidos (musica/golpes-softly-*.json)`);
    else if (Math.abs(real.db - gp.db) > 0.5) mal(`el golpe «${clave}» mide ${real.db} dB y metraje-053.ts dice ${gp.db}`);
    if (gp.db < FUERZA_MIN_GOLPE) mal(`el golpe «${clave}» mide ${gp.db} dB: el mínimo de esta pieza es ${FUERZA_MIN_GOLPE}`);
  }
  const filas = [];
  for (const [id, clave] of Object.entries(GOLPE_DE_PLANO)) {
    const c = byId(id);
    const gp = golpes[clave];
    const d = c.en - M.golpeExacto(gp.t);
    if (Math.abs(d) > TOLERANCIA_GOLPE) mal(`${id} entra en f${c.en} y el golpe «${clave}» suena en f${M.golpeExacto(gp.t).toFixed(1)} (${d >= 0 ? "+" : ""}${d.toFixed(1)} f)`);
    filas.push(`${id.replace(/^c\d+-/, "")} ${gp.db}`);
  }
  const frasesRotulo = [];
  for (const [id, clave] of Object.entries(GOLPE_DE_ROTULO)) {
    const b = bloques.find((x) => x.id === id);
    if (!b) { mal(`falta el rótulo ${id}`); continue; }
    const gp = golpes[clave];
    const d = b.trozos[0].desde - M.golpeExacto(gp.t);
    if (Math.abs(d) > TOLERANCIA_ROTULO) mal(`el rótulo ${id} empieza en f${b.trozos[0].desde} y el golpe «${clave}» suena en f${M.golpeExacto(gp.t).toFixed(1)} (${d >= 0 ? "+" : ""}${d.toFixed(1)} f)`);
    frasesRotulo.push(`${id} ${gp.db}`);
  }
  // El golpe del tramo fuerte (50,93 s: tras el respiro) cae en el cambio del gancho al cielo; el del CTA (87,3 s) lo abre.
  const fuertes = Object.values(golpes).filter((x) => x.db >= 9.5).length;
  // El plano del CTA entra en su golpe y la música baja DESPUÉS: el golpe suena entero y la bajada acaba ≥ 4 f antes de la primera palabra.
  if (musica) {
    const gF = M.golpeExacto(golpes.cta.t);
    const vcta = vozDe(cta);
    if (T.volumenDe(musica, Math.round(gF) - 1) < A.ALTO * 0.98 || T.volumenDe(musica, Math.round(gF) + 2) < A.ALTO * 0.98) mal(`la música ya baja antes de que suene el golpe del CTA (f${gF.toFixed(1)}): tiene que sonar entero y bajar DESPUÉS`);
    if (A.INICIO_BAJADA < Math.round(gF) + A.DESPUES_DEL_GOLPE) mal(`la bajada empieza en f${A.INICIO_BAJADA}, menos de ${A.DESPUES_DEL_GOLPE} f después del golpe (f${gF.toFixed(1)})`);
    if (vcta.ini - A.INICIO_BAJADA < 8) mal(`entre el inicio de la bajada (f${A.INICIO_BAJADA}) y la primera palabra del CTA (f${vcta.ini}) no caben 8 f de curva`);
    if (T.volumenDe(musica, vcta.ini - A.ANTES_DE_HABLAR) > A.BAJO * 1.02) mal(`la bajada no ha acabado ${A.ANTES_DE_HABLAR} f antes de la primera palabra (f${vcta.ini - A.ANTES_DE_HABLAR}): ×${T.volumenDe(musica, vcta.ini - A.ANTES_DE_HABLAR).toFixed(3)} frente a ×${A.BAJO.toFixed(3)}`);
    const ultimaPalabra = vcta.fin;
    const nivelFin = T.volumenDe(musica, DURACION - 1 - musica.en);
    const nivelUltima = T.volumenDe(musica, ultimaPalabra - musica.en);
    if (!(nivelUltima > 0 && nivelFin < nivelUltima * 0.05)) mal(`la música no se apaga tras la última palabra del CTA (f${ultimaPalabra}): ×${nivelUltima.toFixed(3)} → ×${nivelFin.toFixed(3)} al final`);
  }
  if (fallos.length === n) {
    console.log(`  ℹ️  ${fuertes} de los ${Object.keys(golpes).length} golpes son de ≥ 9,5 dB; los demás miden ${Math.min(...Object.values(golpes).map((x) => x.db))}-${Math.max(...Object.values(golpes).filter((x) => x.db < 9.5).map((x) => x.db))} dB (una canción sin pulso no da una rejilla más densa: declarado en metraje-053.ts)`);
    ok(`${A.audio053.length} tramos (${A.voces053.length} de toma, ${A.musica053.length} de música, 0 en off) · «Softly» desde el ${M.INICIO_MUSICA.toFixed(3)} s, entra en el f0 · ${Object.keys(GOLPE_DE_PLANO).length} planos en un golpe (${filas.join(" · ")} dB) y ${Object.keys(GOLPE_DE_ROTULO).length} rótulos en el suyo · el CTA entra en el golpe y la música baja después, con curva · se apaga bajo la tarjeta`);
  }
}

/* 4b · la música bajo la voz del CTA ────────────────────────────────────── */
seccion(`4b. la música bajo la voz del CTA: ≥ ${MIN_LU_BAJO_VOZ} LU por debajo de ella (−15) y el pico real de la música sola ≤ −2,5 dBFS`);
{
  const n = fallos.length;
  const musica = A.audio053.find((t) => t.id === "musica");
  const cta = ventanasDeVoz.find((v) => v.id === "c09-cta");
  if (musica && cta) {
    const tabla = JSON.parse(readFileSync(join(RAIZ, "proyectos", "053", "musica", "sonoridad-softly.json"), "utf8")).datos; // [t, M (400 ms), S (3 s)] cada 0,25 s
    // La sonoridad de la canción en un instante: la MOMENTÁNEA (400 ms) promediada en 1 s (±0,5 s), como hizo el 047 con «Dreamlife».
    const lufsCancion = (t) => {
      const cerca = tabla.filter(([x]) => Math.abs(x - t) <= 0.5);
      if (!cerca.length) return -90;
      return cerca.reduce((s, [, m]) => s + m, 0) / cerca.length;
    };
    const enCancion = (f) => M.INICIO_MUSICA + f / fps - M.RETARDO_AUDIO;
    let peor = -Infinity;
    for (let f = cta.ini; f <= cta.fin; f++) {
      const g = T.volumenDe(musica, f - musica.en);
      if (g <= 0) continue;
      peor = Math.max(peor, lufsCancion(enCancion(f)) + 20 * Math.log10(g));
    }
    const bajoVoz = M.OBJETIVO_LUFS - peor;
    if (bajoVoz < MIN_LU_BAJO_VOZ) mal(`bajo la voz del CTA la música llega a ${peor.toFixed(1)} LUFS, ${bajoVoz.toFixed(1)} LU bajo ella (${M.OBJETIVO_LUFS}); tiene que ser ≥ ${MIN_LU_BAJO_VOZ} LU`);
    // El pico real de la música sola: la canción llega a −0,4 dBFS en su tramo fuerte; con ALTO no pasa de −2,5 dBFS.
    const picoSola = -0.4 + 20 * Math.log10(A.ALTO);
    if (picoSola > -2.49) mal(`el pico de la música sola llega a ${picoSola.toFixed(1)} dBFS (> −2,5)`);
    // En el tramo del golpe: la sonoridad de la música sola queda cerca de −15 LUFS (−16,5 con el pico como tope).
    const sola = M.LUFS_FUERTE_REF ?? A.LUFS_FUERTE;
    const lufsSola = sola + 20 * Math.log10(A.ALTO);
    if (lufsSola < -17.5 || lufsSola > -14.5) mal(`la música sola queda a ${lufsSola.toFixed(1)} LUFS en su tramo fuerte: tiene que estar entre −17,5 y −14,5 (objetivo −15)`);
    if (fallos.length === n) ok(`bajo la voz del CTA la música llega a ${peor.toFixed(1)} LUFS como mucho (${bajoVoz.toFixed(1)} LU bajo ella, f${cta.ini}-${cta.fin}) · sola, a ${lufsSola.toFixed(1)} LUFS en su tramo fuerte con el pico real en ${picoSola.toFixed(1)} dBFS`);
  }
}

/* 5 · los rótulos ──────────────────────────────────────────────────────── */
seccion("5. rótulos editoriales: el texto del reparto §5c tal cual, uno a la vez, cada uno el tiempo que se lee; los del CTA, dentro de su voz");
{
  const n = fallos.length;
  if (E.modoTextoDe(CANAL) !== "editorial") mal(`el canal está en modo «${E.modoTextoDe(CANAL)}»: esta pieza monta rótulos editoriales`);
  const letra = E.letraSubtitulosDe(CANAL);
  for (const a of E.revisaSubtitulosEditoriales(bloques, { fps, ancho: 1080, alto: 1920, duracion: DURACION, letra })) mal(`revisaSubtitulosEditoriales: ${a}`);
  // El TEXTO de cada rótulo es el del reparto, tal cual (las líneas unidas con un espacio).
  const textoDe = (b) => b.trozos.map((t) => t.texto).join(" ");
  for (const [id, esperado] of Object.entries(ROTULOS)) {
    const b = bloques.find((x) => x.id === id);
    if (!b) mal(`falta el rótulo ${id} («${esperado}»)`);
    else if (textoDe(b) !== esperado) mal(`el rótulo ${id} dice «${textoDe(b)}» y el reparto §5c dice «${esperado}»`);
  }
  const extra = bloques.filter((b) => !ROTULOS[b.id] && !/^z\d+$/.test(b.id));
  if (extra.length) mal(`bloques sin sitio en el reparto: ${extra.map((b) => b.id).join(", ")}`);
  // UNO a la vez: cada bloque acaba (`hasta`) antes de que empiece el siguiente (±2 f de solape de los fundidos), y el que más dura se lee.
  for (let i = 1; i < bloques.length; i++) {
    const [x, y] = [bloques[i - 1], bloques[i]];
    if (y.trozos[0].desde < x.hasta - 2) mal(`[${x.id}] y [${y.id}] se pisan: ${x.id} acaba en f${x.hasta} y ${y.id} empieza en f${y.trozos[0].desde}: un rótulo cada vez`);
  }
  // Cada rótulo se lee: de 2,5 a 5,5 s en pantalla y ≤ 3 palabras por segundo.
  const lectura = [];
  for (const b of bloques) {
    if (!ROTULOS[b.id]) continue;
    const dur = b.hasta - b.trozos[0].desde;
    const palabras = textoDe(b).split(/\s+/).length;
    if (dur < LECTURA.minF || dur > LECTURA.maxF) mal(`[${b.id}] está ${dur} f (${(dur / fps).toFixed(1)} s) en pantalla; un rótulo se lee entre ${LECTURA.minF} y ${LECTURA.maxF} f`);
    if (palabras / (dur / fps) > LECTURA.maxPalabrasPorSegundo) mal(`[${b.id}] lleva ${palabras} palabras en ${(dur / fps).toFixed(1)} s (${(palabras / (dur / fps)).toFixed(1)} por segundo; máximo ${LECTURA.maxPalabrasPorSegundo})`);
    lectura.push(`${b.id} ${(dur / fps).toFixed(1)} s`);
  }
  const enVoz = (t) => ventanasDeVoz.some((v) => t.desde >= v.ini - HOLGURA_TROZO && t.desde <= v.fin);
  const usadas = new Set();
  for (const b of bloques) {
    const ini = b.trozos[0].desde;
    // Nada encima de Isabella: arriba o al centro le tapa la cara.
    if ((b.posicion ?? "abajo") !== "abajo") {
      for (const c of conVoz) {
        const seVe = c.en - F.solapeDe(c) / 2;
        if (ini < c.en + c.dur && b.hasta > seVe) mal(`[${b.id}] va ${b.posicion} y sale en f${b.hasta}; Isabella (${c.id}) ya se ve desde f${seVe}`);
      }
    }
    if (SIN_VOZ[b.id]) {
      usadas.add(b.id);
      if (b.trozos.every(enVoz)) mal(`sobra la excepción «${b.id}» de SIN_VOZ: todos sus trozos caen sobre voz, quítala`);
      continue;
    }
    for (const t of b.trozos) if (!enVoz(t)) mal(`[${b.id}] «${t.texto}» entra en f${t.desde}, donde nadie habla`);
  }
  for (const id of Object.keys(SIN_VOZ)) if (!usadas.has(id)) mal(`sobra la excepción «${id}» de SIN_VOZ: ese bloque ya no existe, quítala`);
  // Esta pieza no lleva dato grande: el dato solo vive en el bloque 3, que aquí no existe.
  for (const b of bloques) if (b.trozos.some((t) => t.estilo === "dato")) mal(`[${b.id}] lleva un dato grande: el dato solo vive en el bloque 3 y esta pieza no lo lleva`);
  // Los rótulos van sobre los planos de recorrido y el gancho; los del CTA, sobre Isabella.
  const hasta = Math.max(...bloques.map((b) => b.hasta));
  const tarjeta = cortes.at(-1);
  if (hasta > tarjeta.en + 4) mal(`hay texto sobre la tarjeta (hasta f${hasta}): lo único que lleva es el logo y la web`);
  const acentos = bloques.reduce((s, b) => s + b.trozos.filter((t) => t.estilo === "acento").length, 0);
  if (fallos.length === n) ok(`${bloques.length} bloques (${Object.keys(ROTULOS).length} rótulos tal cual el reparto + el CTA), ${acentos} acentos · validador sin avisos con las letras del canal · uno a la vez · se leen (${lectura.join(" · ")}) · ${usadas.size} sin voz, declarados`);
}

/* 6-8 · formato ─────────────────────────────────────────────────────────── */
seccion("6. metraje disponible");
puerta.metrajeDisponible();
seccion("7. tramos disjuntos");
puerta.tramosDisjuntos();

/* 7b · metraje que comparte con versiones anteriores (informa; no falla) ─────── */
if (VERSIONES_ANTERIORES.length) {
  // `tramosDisjuntos` solo mira DENTRO del proyecto. Si una versión nueva elige un plano sin saber que ya está en otra, el reel
  // repite metraje y nadie lo avisa. Se cuenta, por clip (el mismo archivo normalizado en cada proyecto), cuánto del tramo OPACO
  // de cada plano se solapa con uno de la otra versión. No falla: repetir el mejor plano de una esquina es legítimo, pero se
  // declara (`artefactos/01-plan.md`, `combinaciones.md`); esta línea es la que lo recuerda.
  seccion("7b. metraje que comparte con las versiones anteriores (informa; repetirlo es una decisión)");
  const tramosOpacos = (lista) => {
    const porClip = new Map();
    for (const c of lista) {
      if (c.tipo === "foto") continue;
      const velocidad = c.velocidad ?? 1;
      const solape = F.solapeDe(c);
      const inicio = Math.max(0, F.arranqueEnFuente(c, solape, fps)) + solape * velocidad;
      const clip = c.src.split("/").pop();
      if (!porClip.has(clip)) porClip.set(clip, []);
      porClip.get(clip).push({ id: c.id, a: inicio / fps, b: (inicio + c.dur * velocidad) / fps });
    }
    return porClip;
  };
  const mios = tramosOpacos(cortes);
  for (const v of VERSIONES_ANTERIORES) {
    if (!existsSync(join(RAIZ, v.plan))) {
      console.log(`  ℹ️  no hay ${v.plan}: nada que comparar con ${v.nombre}`);
      continue;
    }
    const otra = await cargaTs({ v: join(RAIZ, v.plan) });
    const suyos = tramosOpacos(otra.v[v.cortes]);
    const comparten = [];
    for (const [clip, lista] of mios) {
      for (const x of lista) {
        for (const y of suyos.get(clip) ?? []) {
          const seg = Math.min(x.b, y.b) - Math.max(x.a, y.a);
          if (seg > 0.05) comparten.push(`${clip}: ${x.id} (${x.a.toFixed(1)}-${x.b.toFixed(1)} s) y el ${y.id} de ${v.nombre} (${y.a.toFixed(1)}-${y.b.toFixed(1)} s) comparten ${seg.toFixed(1)} s`);
        }
      }
    }
    if (!comparten.length) ok(`ni un segundo de metraje en común con ${v.nombre}`);
    else for (const t of comparten) console.log(`  ℹ️  ${t}`);
  }
}
seccion("8. encuadre");
puerta.encuadre({ techoZoom: TECHO_ZOOM });

/* 11 · nada «por confirmar» en los planos (solo con --final) ───────────────── */
{
  // Una palabra, una cifra o un nombre que el plan lleva marcado «POR CONFIRMAR AL OÍDO» es un pendiente con el
  // usuario, no un detalle: en el 017 «esta línea en específico» (whisper, confianza 0,06) estuvo marcada así desde
  // la rev. 1 y llegó a la final exportada con la palabra equivocada («unidad»). Durante el montaje avisa; con
  // `--final` es un fallo: antes de exportar se cierra cada uno con el usuario.
  const final = process.argv.includes("--final");
  const carpetas = [join(RAIZ, "remotion", "src", "proyectos", "053"), join(RAIZ, "proyectos", "053", "voz")];
  const marcador = /por confirmar|confirmar al o[ií]do/i;
  const pendientes = [];
  for (const carpeta of carpetas) {
    if (!existsSync(carpeta)) continue;
    for (const nombre of readdirSync(carpeta)) {
      if (!/\.(ts|tsx|txt)$/.test(nombre)) continue;
      readFileSync(join(carpeta, nombre), "utf8")
        .split("\n")
        .forEach((linea, i) => {
          if (marcador.test(linea)) pendientes.push(`${nombre}:${i + 1}: ${linea.trim().slice(0, 140)}`);
        });
    }
  }
  seccion(`11. nada por confirmar en los planos${final ? " (--final)" : " (avisa; con --final falla)"}`);
  if (!pendientes.length) ok("ni un «por confirmar» en los planos ni en los guiones de voz");
  else if (final) for (const p of pendientes) mal(`pendiente con el usuario: ${p}`);
  else for (const p of pendientes) console.log(`  ⚠️  por confirmar: ${p}`);
}

puerta.cierra(`el 053 pasa la puerta: ${cortes.length} planos, ${bloques.length} bloques de texto, ${A.audio053.length} tramos de audio`);
