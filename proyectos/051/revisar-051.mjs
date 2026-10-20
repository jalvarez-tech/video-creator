#!/usr/bin/env node
/**
 * PUERTA DEL 051 — recorrido con presentadora.
 *
 *   node proyectos/051/revisar-051.mjs
 *
 * Las comprobaciones del FORMATO salen de `revisar-metraje.mjs` (línea de
 * tiempo, metraje, tramos, encuadre). Encima, lo que el formato del recorrido
 * promete y ningún frame enseña:
 *
 *   2. la ESTRUCTURA de una RÉPLICA SIN LOCUCIÓN (reparto 051-053 §5): bloques 2 (el hook, Isabella a cámara en el frame 0, a corte: DOS planos del mismo clip), 3 (el recorrido, con un rótulo
 *      encima de cada tramo) y 6 (el CTA: Isabella, muda, con su rótulo, y la tarjeta); el total dentro de los 55 s del formato.
 *   2b. las REGLAS FIJAS del canal (el usuario las pidió con «siempre» y «nunca»; skill
 *      `recorrido-luxur`, SKILL.md §0): la primera toma sale sin texto NI VOZ → AQUÍ ES UNA EXCEPCIÓN DECLARADA (`ABRE_CON_EL_HOOK`: el original abre con Isabella); no hay
 *      texto arriba ni cuenta `@…`, y NUNCA el sello «PROPIEDADES LUXUR» (`SelloCampana`).
 *   2c. el CIERRE (`cierre-051.ts`): NADA SE CONGELA (la imagen de Isabella funde a negro y
 *      llega a negro exacto en su último fotograma), y sigue una TARJETA OSCURA (el último
 *      plano, un negro liso) con el LOGO —más pequeño y al 60 % de opacidad: 40 % de
 *      transparencia— y la WEB, que caben, caen en las zonas seguras y se leen enteros.
 *   3. la VOZ de sus tomas: el WAV existe y tiene el tramo que se lee, ninguna
 *      palabra suena dentro de una disolvencia, de un cruce ni de un desclic,
 *      queda aire tras la última palabra de la pieza y la ganancia por toma es
 *      sensata.
 *   4. el AUDIO entero (`revisaAudio`) y la MÚSICA: baja bajo el hook, sube tras él y cae sola bajo la tarjeta (4b); y CADA CAMBIO cae en un golpe medido de la canción (4c).
 *   5. los SUBTÍTULOS: su validador sin un aviso, con las letras del canal; cada trozo del hook dentro de su ventana de voz; los RÓTULOS (`SIN_VOZ`: no acompañan a una voz): uno a la vez,
 *      de 2,4 a 4,4 s, dentro del recorrido; y ningún bloque `centro` encima de Isabella.
 *
 * Carga los módulos TypeScript DE VERDAD (`abrePuerta` → esbuild): lo que mide
 * es lo que se renderiza. Sale con 1 si algo falla.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ejecutar } from "../../herramientas/comun.mjs";
import { abrePuerta, cargaTs, duracionDe, PUBLICO, RAIZ } from "../../remotion/src/motor/metraje/revisar-metraje.mjs";

/**
 * Los bloques de ESTA pieza. La versión estándar son los seis; la corta (SKILL
 * §3) es `[1, 2, 3, 6]`, con la objeción dicha en off dentro del bloque 3.
 */
/**
 * EXCEPCIONES DE UNA RÉPLICA (reparto 051-053; el usuario pidió replicar `videos editados/01.mp4` «con las mismas tomas y el mismo texto, en el formato del canal»):
 *   · la pieza ABRE con Isabella hablando (como el original), sin plano de la casa delante: rompe a propósito la regla fija «la primera toma sale sin texto ni voz» (como el 021, el 023 y los 046/048/050);
 *   · no hay los seis bloques: 2 (el hook, a cámara) · 3 (el recorrido, con la LOCUCIÓN en off encima) · 6 (el CTA, también en off, sobre la imagen muda de Isabella, y la tarjeta);
 *   · dura más de 55 s (el original, 64 s) y la locución cubre todo el recorrido (el formato la limita al bloque 5).
 * El resto de reglas fijas (nunca el sello, nada arriba, el cierre en la tarjeta oscura con el logo y la web, nada se congela) se siguen comprobando.
 */
const ABRE_CON_EL_HOOK = true;
const BLOQUES = [2, 3, 6];
/** Los bloques en los que Isabella habla a cámara (el 6 la enseña, muda: la voz es la locución). */
const DE_ELLA = [2];
/** El hook son DOS planos del mismo clip (HK05): «¿Deseas» | «arrendar amoblado en Medellín? Ven, te muestro» (el original quitó la pausa de 1,1 s entre las dos). */
const PLANOS_DEL_HOOK = 2;

const TECHO_ZOOM = 1.2; // clips normalizados a 1296 px = 1080 × 1,2
const TOPE_SEGUNDOS = 55; // el formato apunta a 45-50 s y no pasa de 55 (la réplica, sin locución, recorta los planos del original de 64 s a ≈ 49 s)
const MARGEN_FUNDIDO = 2; // f entre la última palabra y el inicio de la disolvencia del siguiente
const COLA_FINAL = [45, 120]; // f desde la última palabra del CTA hasta el final (lo que le queda de toma + la tarjeta): la web se lee, sin quedarse muerto
const TARJETA_FRAMES = [45, 75]; // f que dura la tarjeta oscura del cierre (1,5-2,5 s)
const HOLGURA_TROZO = 3; // f que un trozo puede adelantarse a su palabra

/**
 * Bloques de subtítulos que NO acompañan a una palabra dicha, y por qué. Una
 * excepción que sobra (el bloque ya no existe, o todos sus trozos caen sobre
 * voz) tumba la puerta.
 */
/**
 * Las versiones ANTERIORES del mismo reel (otra canción, otro hook…), para la sección 7b: cuánto metraje comparte esta con cada
 * una. `{ nombre, plan, cortes }`: el `metraje-051.ts` de aquella (ruta desde la raíz del repo) y el nombre de su export.
 * Vacío en la primera versión. Ejemplo (el 018 frente al 017):
 *   [{ nombre: "la V1 (017)", plan: "remotion/src/proyectos/017/metraje-017.ts", cortes: "metraje017" }]
 */
// Las otras versiones de ARRIENDO de Tierra Grata (045-050, en main): los códigos de clip son los de `proyectos/044/catalogo-material.md` y valen entre ellas (`rc16.mp4` es el mismo archivo en las siete).
// NO se compara con las versiones de otras propiedades: sus `rc16.mp4` son otros clips.
const VERSIONES_ANTERIORES = ["045 V27", "046 V28", "047 V29", "048 V30", "049 V31", "050 V32"].map((t) => {
  const [n, v] = t.split(" ");
  return { nombre: `la ${v} (${n})`, plan: `remotion/src/proyectos/${n}/metraje-${n}.ts`, cortes: `metraje${n}` };
});

const SIN_VOZ = Object.fromEntries(
  ["r01", "r02", "r03", "r04", "r05", "r06", "r07", "r08", "r09", "r10"].map((id) => [
    id,
    "rótulo del guion en pantalla (cambio de encargo del usuario, 2026-10-20: la réplica va SIN locución; reparto 051-053 §5a): no acompaña a una voz, acompaña a un tramo del recorrido y a un golpe de la música",
  ])
);
/** Los rótulos: uno a la vez, de 2,4 a 4,4 s (el reparto pide 2,5-3,5 s por rótulo; con la primera línea y la salida caben 3-4 s), dentro del recorrido. */
const ROTULO_FRAMES = [72, 132];
/** Los rótulos que entran SIN golpe, y por qué: la canción no suena ni uno entre los 251,9 y los 258,6 s (los f1186-f1386 de la pieza). */
const ROTULO_SIN_GOLPE = { r10: "la canción no suena ningún golpe entre los 251,9 y los 258,6 s (f1186-f1386): la imagen de Isabella entra con una disolvencia libre" };
/** Un cambio cae en un golpe si está a ≤ 1 f del frame en que SUENA (el del instante medido + ataque + retardo del render) y mide ≥ FUERZA_MIN dB por 15 ms. */
const TOLERANCIA_GOLPE = 1;
const FUERZA_MIN = 6.0;

// Un plan que no carga (un corte con voz y velocidad distinta de 1, un import
// roto) no deja una traza: dice qué pasa y sale con 1.
const puerta = await abrePuerta({
  proyecto: "051",
  plan: "remotion/src/proyectos/051/metraje-051.ts",
  cortes: "metraje051",
  receta: "node proyectos/051/normalizar.mjs",
  extras: {
    audio: "remotion/src/proyectos/051/audio-051.ts",
    subtitulos: "remotion/src/proyectos/051/subtitulos-051.ts",
    tramos: "remotion/src/motor/sound/tramos.ts",
    editorial: "remotion/src/motor/subtitulos-editoriales.ts",
    marca: "remotion/src/marcas/luxur.ts",
    cierre: "remotion/src/proyectos/051/cierre-051.ts",
  },
}).catch((e) => {
  console.log(`\n❌ el plan del 051 no carga: ${e.message}\n`);
  process.exit(1);
});
const { cortes, fps, fallos, mal, ok, seccion } = puerta;
const M = puerta.plan;
const F = puerta.modulos.formato;
const A = puerta.modulos.audio;
const T = puerta.modulos.tramos;
const E = puerta.modulos.editorial;
const bloques = puerta.modulos.subtitulos.subtitulos051;
const DURACION = M.DURACION_051;
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
seccion("2. la estructura del recorrido");
{
  const n = fallos.length;
  const primero = cortes[0];
  if (ABRE_CON_EL_HOOK) {
    if (primero.id !== "c01-hook-deseas") mal(`${primero.id}: con ABRE_CON_EL_HOOK el primer plano es c01-hook-deseas`);
    if (cortes.some((c) => c.bloque === 1)) mal("hay un plano del bloque 1: la réplica abre con Isabella, sin «casa» delante");
  } else {
    if (primero.bloque !== 1) mal(`${primero.id}: el primer plano es del bloque ${primero.bloque}; la pieza abre con la casa (bloque 1)`);
    if (primero.audio) mal(`${primero.id}: el primer plano lleva voz; la casa abre sola y ella entra después`);
  }
  if ((primero.entra ?? "corte") !== "corte") mal(`${primero.id}: entra con «${primero.entra}»; el frame 0 es la miniatura y no nace de un fundido`);
  cortes.forEach((c, i) => {
    if (!BLOQUES.includes(c.bloque)) mal(`${c.id}: bloque ${c.bloque}; esta pieza lleva los bloques ${BLOQUES.join(", ")}`);
    if (i > 0 && c.bloque < cortes[i - 1].bloque) mal(`${c.id}: bloque ${c.bloque} después del ${cortes[i - 1].bloque}; los bloques van en orden`);
    const deElla = DE_ELLA.includes(c.bloque) && !esTarjeta(c);
    if (deElla && !c.audio) mal(`${c.id}: bloque ${c.bloque} sin \`audio\`; en los bloques ${DE_ELLA.join(", ")} habla Isabella a cámara`);
    if (!deElla && c.audio) mal(`${c.id}: bloque ${c.bloque} con \`audio\`; en los recorridos y en el CTA la voz es la locución en off y va en audio-051.ts`);
    if (c.audio && !c.voz) mal(`${c.id}: tiene \`audio\` pero no \`voz\` (s0, s1, lufs medidos con limites-voz.py)`);
    // El viaje emocional (viaje-emocional.md) casi no se puede medir; esto es lo
    // poco que sí: un plano sin razón sobra, y solo se acelera la aproximación.
    if (!c.reason || c.reason.trim().length < 15) mal(`${c.id}: sin \`reason\`; cada plano dice qué hace ahí (situar, revelar, mover, emocionar…) o sobra (viaje-emocional.md §4)`);
    if ((c.velocidad ?? 1) !== 1 && c.bloque !== 3) mal(`${c.id}: velocidad ${c.velocidad} en el bloque ${c.bloque}; solo se acelera la aproximación (bloque 3), nunca la intimidad ni la recompensa (viaje-emocional.md §6)`);
  });
  // Una réplica sigue el orden del original: no hay «vista» que cierre el recorrido (el último plano de la unidad es la Social Kitchen) y el plano más largo es el cielo del balcón (RC10). Lo que se comprueba es que
  // ningún plano del recorrido pasa de 11 s (el original más largo, RC10, dura 10,8) y que el CTA no es más corto que 3 s (la imagen sostiene la frase final de la locución).
  for (const c of cortes.filter((x) => x.bloque === 3)) if (c.dur > 11 * fps) mal(`${c.id} dura ${(c.dur / fps).toFixed(1)} s: ningún plano del recorrido pasa de 11 s (el del original más largo dura 10,8)`);
  for (const b of BLOQUES) if (!cortes.some((c) => c.bloque === b)) mal(`falta el bloque ${b}`);
  const ultimo = cortes.at(-1);
  if (ultimo.bloque !== BLOQUES.at(-1)) mal(`${ultimo.id}: la pieza acaba en el bloque ${ultimo.bloque}; cierra Isabella con el CTA (bloque ${BLOQUES.at(-1)})`);
  const antesDelCta = cortes.filter((c) => c.bloque < BLOQUES.at(-1)).at(-1);
  if (antesDelCta && antesDelCta.bloque !== BLOQUES.at(-2)) {
    mal(`${antesDelCta.id}: el plano anterior al CTA es del bloque ${antesDelCta.bloque}; tiene que ser el último recorrido (bloque ${BLOQUES.at(-2)}: la vista)`);
  }
  // Isabella, una vez por bloque suyo y cada vez en un sitio: si el guion pide
  // dos tomas en un bloque (una objeción por toma), se sube este número a sabiendas.
  if (conVoz.length !== PLANOS_DEL_HOOK) mal(`Isabella habla en ${conVoz.length} planos; el hook son ${PLANOS_DEL_HOOK} (dos tomas de HK05) y el CTA es muda`);
  if (DURACION / fps > TOPE_SEGUNDOS) mal(`${(DURACION / fps).toFixed(1)} s: el formato no pasa de ${TOPE_SEGUNDOS} s`);
  if (fallos.length === n) {
    const porBloque = BLOQUES.map((b) => {
      const suyos = cortes.filter((c) => c.bloque === b);
      return `b${b} ${(suyos.reduce((s, c) => s + c.dur, 0) / fps).toFixed(1)} s`;
    });
    ok(`${cortes.length} planos · ${(DURACION / fps).toFixed(1)} s · ${porBloque.join(" · ")} · el hook en ${conVoz.length} planos · todos con razón · dentro de los ${TOPE_SEGUNDOS} s del formato`);
  }
}

/* 2b · las reglas fijas del canal ───────────────────────────────────────── */
seccion("2b. reglas fijas del canal (la primera toma sin texto ni voz: EXCEPCIÓN DECLARADA, abre el hook), nunca el sello ni la cuenta");
{
  const n = fallos.length;
  const hook = conVoz[0];
  if (!hook) mal("ninguna toma lleva voz: no hay hook de Isabella");
  else if (bloques.length === 0) mal("no hay ningún subtítulo");
  else if (ABRE_CON_EL_HOOK) {
    // El hook ES el frame 0, a corte, con su primera palabra ≥ DESCLIC_VOZ f después y su primer subtítulo con ella (−3…+1 f). La música ya suena, BAJA, desde el f0 (4b).
    if (hook.en !== 0 || (hook.entra ?? "corte") !== "corte") mal(`${hook.id}: con ABRE_CON_EL_HOOK entra a corte en el f0`);
    if (vozDe(hook).ini < hook.en + T.DESCLIC_VOZ) mal(`${hook.id} entra a corte en f${hook.en} y su primera palabra suena en f${vozDe(hook).ini}: tiene que ser ≥ f${hook.en + T.DESCLIC_VOZ}`);
    const primerTexto = Math.min(...bloques.map((b) => b.trozos[0].desde));
    if (primerTexto > vozDe(hook).ini + 1 || primerTexto < vozDe(hook).ini - HOLGURA_TROZO) mal(`el primer texto entra en f${primerTexto} y la primera palabra suena en f${vozDe(hook).ini}: tiene que ir con ella (−${HOLGURA_TROZO}…+1 f)`);
    // El segundo plano del hook (la tercera «frase» del original) no puede volver a poner la misma palabra: los dos son del mismo clip y sus tramos no se solapan (sección 7).
  }
  const hayArriba = bloques.filter((b) => b.posicion === "arriba");
  if (hayArriba.length) mal(`hay texto arriba (${hayArriba.map((b) => b.id).join(", ")}): ni hook escrito ni cuenta; arriba no hay nada`);
  if (bloques.some((b) => b.trozos.some((t) => /@/.test(t.texto)))) mal("hay una cuenta de texto (@…) en los subtítulos: el cierre lleva el logo y la web, no la cuenta");
  // UNA SOLA CIFRA en pantalla (reparto 051-053 §5a): «113 m²», en el primer rótulo; ninguna más (ni en los rótulos ni en el hook).
  const conCifra = bloques.flatMap((b) => b.trozos.filter((t) => /\d/.test(t.texto)).map((t) => ({ b: b.id, texto: t.texto })));
  if (conCifra.length !== 1 || conCifra[0].b !== "r01" || conCifra[0].texto !== "113 m²") {
    mal(`la pieza lleva UNA cifra, «113 m²» en el rótulo r01; hay ${conCifra.length}: ${conCifra.map((x) => `[${x.b}] «${x.texto}»`).join(" · ") || "ninguna"}`);
  }
  for (const c of conVoz) if (/\d/.test(c.voz.dice)) mal(`${c.id}: su \`dice\` lleva cifras en dígitos («${c.voz.dice}»)`);
  // NUNCA el sello «PROPIEDADES LUXUR»: ni se importa ni se monta ni se escribe a mano.
  const fuente = readFileSync(join(RAIZ, "remotion", "src", "proyectos", "051", "Recorrido051.tsx"), "utf8");
  const sinComentarios = fuente.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
  if (/SelloCampana/.test(sinComentarios)) mal("la composición usa `SelloCampana`: el sello «PROPIEDADES LUXUR» no se pone NUNCA");
  if (/PROPIEDADES LUXUR/.test(sinComentarios)) mal("la composición escribe «PROPIEDADES LUXUR» a mano: el sello no se pone NUNCA");
  if (fallos.length === n) {
    console.log("  ℹ️  EXCEPCIÓN DECLARADA (réplica de `videos editados/01.mp4`, que abre con Isabella): la primera toma lleva voz y texto desde el f0; la regla fija «la primera toma sale sin texto ni voz» no se cumple en esta pieza");
    ok(`la pieza ABRE con el hook (excepción declarada, réplica): su primer subtítulo entra en f${bloques[0].trozos[0].desde}, con su voz · una sola cifra en pantalla («113 m²») · nada arriba y ninguna cuenta · sin sello (no se usa \`SelloCampana\`)`);
  }
}

/* 2c · el cierre: sin congelar, la tarjeta oscura con el logo y la web ──────── */
seccion("2c. el cierre: nada se congela, y la tarjeta oscura con el logo (pequeño, al 60 %) y la web");
{
  const n = fallos.length;
  const CI = puerta.modulos.cierre;
  // El CTA es la IMAGEN muda de Isabella (el plano anterior a la tarjeta); su voz es la última frase de la locución.
  const tarjeta = cortes.at(-1);
  const cta = cortes.at(-2);
  // El último rótulo (el CTA) tiene que acabar cuando empieza el fundido a negro: no se queda texto sobre la imagen que se apaga.
  const ultimoRotulo = bloques.at(-1);
  const vistaCuadro = { ancho: 1080, alto: 1920 };
  const letraBase = E.letraSubtitulosDe(CANAL).base;
  const fuente = readFileSync(join(RAIZ, "remotion", "src", "proyectos", "051", "Recorrido051.tsx"), "utf8");
  const sinComentarios = fuente.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
  const png = (ruta) => {
    const b = readFileSync(ruta);
    const esPng = b.length > 26 && b.subarray(1, 4).toString() === "PNG";
    return esPng ? { ancho: b.readUInt32BE(16), alto: b.readUInt32BE(20), color: b[25] } : null;
  };

  // «No dejes que el último fotograma se congele»: el CTA llega a su último fotograma y no se repite; sigue la tarjeta.
  if (tarjeta.tipo !== "foto" || tarjeta.src !== CI.TARJETA) mal(`el último plano (${tarjeta.id}) tiene que ser la foto ${CI.TARJETA} (un negro liso), no ${tarjeta.tipo} ${tarjeta.src}`);
  if (!cta || cta.tipo === "foto" || cta.bloque !== 6) mal(`el plano anterior a la tarjeta (${cta?.id}) tiene que ser la imagen de Isabella del bloque 6`);
  if (tarjeta.en !== cta.en + cta.dur) mal(`${tarjeta.id} entra en f${tarjeta.en} y la toma del CTA acaba en f${cta.en + cta.dur}: la tarjeta sigue a la toma sin hueco`);
  const congelados = cortes.filter((c) => c !== tarjeta && (c.tipo === "foto" || /-cola\.mp4$/.test(c.src)));
  if (congelados.length) mal(`se congela un fotograma (${congelados.map((c) => c.id).join(", ")}): el último fotograma NO se congela`);
  if (tarjeta.dur !== CI.DUR_TARJETA) mal(`${tarjeta.id} dura ${tarjeta.dur} f y cierre-051.ts dice ${CI.DUR_TARJETA}`);
  if (tarjeta.dur < TARJETA_FRAMES[0] || tarjeta.dur > TARJETA_FRAMES[1]) mal(`la tarjeta dura ${tarjeta.dur} f (entre ${TARJETA_FRAMES[0]} y ${TARJETA_FRAMES[1]}): la web se lee, sin quedarse muerto`);
  const rutaTarjeta = join(PUBLICO, CI.TARJETA);
  if (!existsSync(rutaTarjeta)) mal(`no existe remotion/public/${CI.TARJETA} (node proyectos/051/normalizar.mjs)`);
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
  if (ultimoRotulo.hasta > ultimaDeIsabella - CI.FUNDIDO_A_OSCURO + 6) mal(`el último rótulo (${ultimoRotulo.id}) sale en f${ultimoRotulo.hasta} y el fundido a negro de la imagen empieza en f${ultimaDeIsabella - CI.FUNDIDO_A_OSCURO}: tiene que salir con él (≤ 6 f después)`);
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
  const piel = new Set([...conVoz.map((c) => c.id), cortes.at(-2).id]);
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

/* 3 · la voz de las tomas ───────────────────────────────────────────────── */
seccion("3. la voz de las tomas a cámara");
{
  const n = fallos.length;
  const ganancias = [];
  cortes.forEach((c, i) => {
    if (!c.audio || !c.voz) return;
    if (!existsSync(join(PUBLICO, c.audio))) return mal(`${c.id}: no existe remotion/public/${c.audio} (node proyectos/051/normalizar.mjs)`);
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
  // La cola de la PIEZA: desde que sale el último rótulo (el CTA) hasta el final quedan 45-120 f: lo que la tarjeta del
  // cierre (el logo y la web, sección 2c) necesita para leerse, sin quedarse muerto. Nada se congela.
  const cola = DURACION - bloques.at(-1).hasta;
  if (cola < COLA_FINAL[0] || cola > COLA_FINAL[1]) mal(`el último rótulo: ${cola} f entre su salida y el final de la pieza (entre ${COLA_FINAL[0]} y ${COLA_FINAL[1]})`);
  if (fallos.length === n) ok(`${conVoz.length} tomas con su WAV y su tramo, ninguna palabra en un fundido · a ${M.OBJETIVO_LUFS} LUFS: ${ganancias.join(" · ")} dB · ${cola} f desde que sale el último rótulo hasta el final (la tarjeta del cierre)`);
}

/* 4 · el audio entero ───────────────────────────────────────────────────── */
seccion("4. la voz del hook y la música");
const ventanasDeVoz = conVoz.filter((c) => c.voz).map((c) => ({ id: c.id, ...vozDe(c) }));
{
  const n = fallos.length;
  for (const a of T.revisaAudio(A.audio051, { fps, duracion: DURACION })) mal(`revisaAudio: ${a}`);
  for (const t of A.audio051) {
    if (!existsSync(join(PUBLICO, t.src))) {
      mal(`${t.id}: no existe remotion/public/${t.src}`);
      continue;
    }
    if (t.bucle) continue;
    const hasta = (Math.round((t.desde ?? 0) * fps) + t.dur) / fps;
    const dura = duracionDe(t.src);
    if (hasta > dura + 1 / fps) mal(`${t.id}: se lee hasta ${hasta.toFixed(2)} s y ${t.src} dura ${dura.toFixed(2)} s`);
  }
  // Sin locución: lo único hablado es el hook, y NO hay ningún tramo de voz en off (el encargo cambió: reparto 051-053 §5).
  if (A.off051 !== undefined) mal("audio-051.ts exporta `off051`: la réplica va SIN locución en off");
  if (fallos.length === n) {
    ok(`${A.audio051.length} tramos (${A.voces051.length} de voz en directo —el hook, en dos planos— y ${A.musica051.length} de música) · ${A.HAY_MUSICA ? "con música en el render" : "SIN música en el render: se publica con audio en tendencia"} · sin locución`);
  }
}

/* 4b · la música bajo el hook ──────────────────────────────────────────────── */
seccion("4b. la música: baja ≥ 12 dB bajo el hook ANTES de su primera palabra, sube tras él y cae sola bajo la tarjeta");
{
  const n = fallos.length;
  const musica = A.musica051[0];
  if (!musica) console.log("  ℹ️  sin música en el render");
  else {
    const g = musica.ganancia;
    // Una envolvente larga rompe el mezclado del render (`remotion-volumen-limite-ffmpeg`): ≤ 80 valores por tramo.
    if (!Array.isArray(g)) mal("la ganancia de la música no es una envolvente");
    else {
      if (g.length > 80) mal(`la envolvente de la música tiene ${g.length} puntos; el mezclador de Remotion se rompe por encima de ≈ 80: parte la música en tramos consecutivos`);
      for (let i = 1; i < g.length; i++) if (g[i][0] <= g[i - 1][0]) mal(`la envolvente de la música no crece en el punto ${i} (f${g[i - 1][0]} → f${g[i][0]})`);
      /** La ganancia (lineal) de la música en el frame `f` de la composición: la recta entre los puntos que la rodean (la misma que `interpolate`). */
      const gananciaEn = (f) => {
        if (f <= g[0][0]) return g[0][1];
        for (let i = 1; i < g.length; i++) if (f <= g[i][0]) return g[i - 1][1] + ((g[i][1] - g[i - 1][1]) * (f - g[i - 1][0])) / (g[i][0] - g[i - 1][0]);
        return g.at(-1)[1];
      };
      const dB = (f) => 20 * Math.log10(gananciaEn(f) / A.ALTO);
      for (const [ini, fin] of A.HABLADO) {
        if (dB(ini) > -12) mal(`el hook (f${ini}-${fin}): en su primera palabra la música está a ${dB(ini).toFixed(1)} dB de su nivel «solo»; tiene que estar ≤ −12 (la bajada acaba ANTES de que hable)`);
        if (dB(fin) > -12) mal(`el hook (f${ini}-${fin}): en su última palabra la música está a ${dB(fin).toFixed(1)} dB de su nivel «solo»`);
      }
      // Tras el hook sube a su nivel «solo» ANTES del primer golpe del recorrido (el plano que entra a corte).
      const recorrido = cortes.find((c) => c.bloque === 3);
      if (dB(recorrido.en) < -0.5) mal(`en f${recorrido.en} (entra ${recorrido.id}, el primer golpe del recorrido) la música está a ${dB(recorrido.en).toFixed(1)} dB de su nivel «solo»: el golpe tiene que sonar entero`);
      // El nivel «solo»: −15 LUFS con la ganancia de −2,0 dB sobre la meseta medida (−13,0 LUFS) y el pico real (−0,6 dBFS) ≤ −2,5 dBFS.
      const lufsSola = A.LUFS_MESETA + 20 * Math.log10(A.ALTO);
      if (Math.abs(lufsSola - M.OBJETIVO_LUFS) > 0.3) mal(`la música sola queda a ${lufsSola.toFixed(1)} LUFS y el canal pide ${M.OBJETIVO_LUFS}`);
      if (-0.6 + 20 * Math.log10(A.ALTO) > -2.5) mal(`el pico de la música sola (−0,6 dBFS de la fuente) queda a ${(-0.6 + 20 * Math.log10(A.ALTO)).toFixed(1)} dBFS; tiene que ser ≤ −2,5`);
      // Cae sola bajo la tarjeta: al llegar la tarjeta suena a su nivel; llega a cero al final.
      const tarjeta = cortes.at(-1);
      if (dB(tarjeta.en) < -0.5) mal(`al empezar la tarjeta (f${tarjeta.en}) la música está a ${dB(tarjeta.en).toFixed(1)} dB de su nivel «solo»`);
      if (gananciaEn(DURACION) !== 0) mal("la música no llega a cero al final de la pieza");
      // La caída natural de «Einaudi Fly» (261,06 s de la canción) cae dentro de la tarjeta.
      const caida = Math.round((261.06 + 0.012 - A.INICIO_MUSICA + 0.042) * fps);
      if (caida < tarjeta.en || caida > DURACION) mal(`la caída natural de la canción cae en f${caida}, fuera de la tarjeta (f${tarjeta.en}-${DURACION})`);
      if (fallos.length === n) ok(`${g.length} puntos de ganancia (≤ 80) · el hook con la música a ${dB(A.HABLADO[0][0]).toFixed(1)} dB · a su nivel «solo» (−15 LUFS, pico ≤ −2,5 dBFS) en el primer golpe (f${recorrido.en}) · la caída natural (f${caida}) cae sobre la tarjeta · llega a cero al final`);
    }
  }
}

/* 4c · cada cambio cae en un golpe de la canción ─────────────────────────────── */
seccion("4c. cada cambio de plano y de rótulo cae en un golpe MEDIDO de la canción (R33; las excepciones, declaradas)");
{
  const n = fallos.length;
  const golpesRuta = join(RAIZ, "proyectos", "051", "musica", "golpes-051.json");
  if (!existsSync(golpesRuta)) mal("falta proyectos/051/musica/golpes-051.json (medir-pista.py)");
  else {
    const golpes = JSON.parse(readFileSync(golpesRuta, "utf8")); // [[segundo de la canción, fuerza dB por 15 ms], …]
    /** El frame (sin redondear) en que SUENA un golpe: su instante + 12 ms de ataque − dónde empieza la canción + 42 ms de retardo del render. */
    const frameDe = (t) => (t + 0.012 - A.INICIO_MUSICA + 0.042) * fps;
    const mejor = (f) => golpes.map(([t, db]) => ({ t, db, d: Math.abs(frameDe(t) - f) })).sort((x, y) => x.d - y.d)[0];
    const filas = [];
    const sinGolpe = [];
    // Los cambios de plano: el `en` de cada plano del recorrido y la tarjeta (el primero, el del hook, es el frame 0).
    for (const c of cortes.filter((x) => x.bloque !== 2)) {
      const m = mejor(c.en);
      const declarado = c.id === "c13-cta";
      if (declarado) {
        sinGolpe.push(`${c.id} (f${c.en}: el golpe más cercano está a ${m.d.toFixed(0)} f; la canción no suena ninguno entre los 251,9 y los 258,6 s)`);
        continue;
      }
      if (m.d > TOLERANCIA_GOLPE + 0.5 || m.db < FUERZA_MIN) mal(`${c.id} entra en f${c.en} y el golpe más cercano (${m.t.toFixed(2)} s, ${m.db} dB) suena en f${frameDe(m.t).toFixed(1)}: tiene que caer a ≤ ${TOLERANCIA_GOLPE} f de un golpe de ≥ ${FUERZA_MIN} dB`);
      filas.push(m.db);
    }
    // Los rótulos: la primera línea de cada uno.
    for (const b of bloques) {
      if (!SIN_VOZ[b.id]) continue;
      const f = b.trozos[0].desde;
      const m = mejor(f);
      if (ROTULO_SIN_GOLPE[b.id]) {
        sinGolpe.push(`${b.id} (f${f}: ${ROTULO_SIN_GOLPE[b.id]})`);
        continue;
      }
      if (m.d > TOLERANCIA_GOLPE + 0.5 || m.db < FUERZA_MIN) mal(`[${b.id}] entra en f${f} y el golpe más cercano (${m.t.toFixed(2)} s, ${m.db} dB) suena en f${frameDe(m.t).toFixed(1)}: la primera línea de un rótulo cae a ≤ ${TOLERANCIA_GOLPE} f de un golpe de ≥ ${FUERZA_MIN} dB`);
      filas.push(m.db);
    }
    for (const t of sinGolpe) console.log(`  ℹ️  SIN golpe, declarado: ${t}`);
    if (fallos.length === n) ok(`${filas.length} cambios (planos y primeras líneas de rótulo) a ≤ ${TOLERANCIA_GOLPE} f de un golpe medido de ${Math.min(...filas)}-${Math.max(...filas)} dB · ${sinGolpe.length} sin golpe, declarados`);
  }
}

/* 5 · subtítulos ────────────────────────────────────────────────────────── */
seccion("5. subtítulos editoriales");
{
  const n = fallos.length;
  if (E.modoTextoDe(CANAL) !== "editorial") mal(`el canal está en modo «${E.modoTextoDe(CANAL)}»: esta pieza monta subtítulos editoriales`);
  const letra = E.letraSubtitulosDe(CANAL);
  for (const a of E.revisaSubtitulosEditoriales(bloques, { fps, ancho: 1080, alto: 1920, duracion: DURACION, letra })) mal(`revisaSubtitulosEditoriales: ${a}`);
  // La miniatura (frame 0) es la casa LIMPIA y nada va arriba: se comprueba en la sección 2b.
  const enVoz = (t) => ventanasDeVoz.some((v) => t.desde >= v.ini - HOLGURA_TROZO && t.desde <= v.fin);
  const usadas = new Set();
  for (const b of bloques) {
    const ini = b.trozos[0].desde;
    // Nada encima de Isabella: arriba o al centro le tapa la cara. Una toma que
    // disuelve ya se ve antes de su `en`: el texto sale, como tarde, a mitad de
    // esa disolvencia, cuando ella aún es una sombra.
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
  // Los datos no interrumpen el clímax: una cifra grande solo en el recorrido
  // inmersivo (bloque 3); en los bloques 5 y 6 la recompensa se mira.
  const b3 = cortes.filter((c) => c.bloque === 3);
  const ini3 = b3.length ? b3[0].en : 0;
  const fin3 = b3.length ? b3.at(-1).en + b3.at(-1).dur : 0;
  for (const b of bloques) {
    if (!b.trozos.some((t) => t.estilo === "dato")) continue;
    const ini = b.trozos[0].desde;
    if (ini < ini3 || b.hasta > fin3) mal(`[${b.id}] lleva un dato y va de f${ini} a f${b.hasta}; el bloque 3 va de f${ini3} a f${fin3} y el dato solo va ahí (viaje-emocional.md §9)`);
  }
  // LOS RÓTULOS (SIN_VOZ): uno a la vez, de 2,4 a 4,4 s, dentro del recorrido (nunca sobre el hook ni la tarjeta) y con su texto tal cual.
  const rotulos = bloques.filter((b) => SIN_VOZ[b.id]);
  const primerPlano = cortes.find((c) => c.bloque === 3);
  const tarjetaCierre = cortes.at(-1);
  rotulos.forEach((b, i) => {
    const ini = b.trozos[0].desde;
    const dur = b.hasta - ini;
    if (dur < ROTULO_FRAMES[0] || dur > ROTULO_FRAMES[1]) mal(`[${b.id}] dura ${(dur / fps).toFixed(1)} s (f${ini}-${b.hasta}): un rótulo se lee en ${ROTULO_FRAMES[0] / fps}-${ROTULO_FRAMES[1] / fps} s`);
    if (ini < primerPlano.en) mal(`[${b.id}] entra en f${ini}, antes del primer plano del recorrido (f${primerPlano.en}): el hook lleva su voz y su texto, y los rótulos empiezan después`);
    if (b.hasta > tarjetaCierre.en) mal(`[${b.id}] sale en f${b.hasta}, sobre la tarjeta (f${tarjetaCierre.en}): lo único que lleva es el logo y la web`);
    const anterior = rotulos[i - 1];
    if (anterior && ini < anterior.hasta) mal(`[${b.id}] entra en f${ini} y [${anterior.id}] sale en f${anterior.hasta}: un rótulo cada vez, nunca dos a la vez`);
    if (b.trozos.length < 1 || b.trozos.length > 3) mal(`[${b.id}] lleva ${b.trozos.length} líneas (de 1 a 3)`);
    if (b.trozos.filter((t) => t.estilo === "acento").length > 1) mal(`[${b.id}] lleva más de un acento`);
  });
  // El guion de los rótulos es el del usuario, tal cual (reparto 051-053 §5a): lo pintado, sin las líneas partidas, es EXACTAMENTE este texto.
  const GUION = [
    "113 m² amoblados, listos para ti",
    "En Las Palmas, con la ciudad a tus pies",
    "Tu jacuzzi privado en el balcón",
    "Y lo que viene con él:",
    "Aseo semanal incluido",
    "Acompañamiento personalizado desde el día uno",
    "Chef privado cuando quieras",
    "Conductor y transporte a tu medida",
    "La mejor asesoría de la ciudad",
    "Escríbeme y agenda tu visita",
  ];
  const pintado = rotulos.map((b) => b.trozos.map((t) => t.texto).join(" "));
  if (pintado.length !== GUION.length) mal(`hay ${pintado.length} rótulos y el guion del usuario son ${GUION.length}`);
  GUION.forEach((g, i) => {
    if (pintado[i] !== g) mal(`el rótulo ${i + 1} dice «${pintado[i]}» y el guion del usuario dice «${g}»`);
  });
  const acentos = bloques.reduce((s, b) => s + b.trozos.filter((t) => t.estilo === "acento").length, 0);
  if (fallos.length === n) ok(`${bloques.length} bloques, ${acentos} acentos · validador sin avisos con las letras del canal · nada encima de Isabella · ${rotulos.length} rótulos (uno a la vez, de 3-4 s, con el texto del usuario tal cual) · ${usadas.size} sin voz, declarados`);
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
  const carpetas = [join(RAIZ, "remotion", "src", "proyectos", "051"), join(RAIZ, "proyectos", "051", "voz")];
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

puerta.cierra(`el 051 pasa la puerta: ${cortes.length} planos, ${bloques.length} bloques de texto, ${A.audio051.length} tramos de audio`);
