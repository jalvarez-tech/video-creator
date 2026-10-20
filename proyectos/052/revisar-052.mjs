#!/usr/bin/env node
/**
 * PUERTA DEL 052 — «Pregúntate esto», la RÉPLICA de `videos editados/02.mp4` (V34, Tierra Grata, ARRIENDO): recorrido con presentadora que ABRE CON EL HOOK (réplica: el original abre con Isabella) y lleva una
 * LOCUCIÓN EN OFF de 67 s sobre el recorrido.
 *
 *   node proyectos/052/revisar-052.mjs            (avisa de lo «por confirmar al oído» y de que la locución no existe)
 *   node proyectos/052/revisar-052.mjs --final    (falla mientras quede una palabra por confirmar o la locución sea un pendiente)
 *
 * Las comprobaciones del FORMATO salen de `revisar-metraje.mjs` (línea de tiempo, metraje, tramos, encuadre). Encima, lo que el formato del recorrido promete y ningún frame enseña:
 *
 *   2. la ESTRUCTURA: hook (bloque 2), recorrido con la locución (5) y CTA (6), en el ORDEN del original (`ORDEN_DEL_ORIGINAL`), con Isabella dos veces a cámara, todos los planos disueltos entre sí (la
 *      canción no tiene golpes donde cortar en seco) y el total dentro del tope DECLARADO de la réplica (no pasa de 86 s: el formato pide 55 y el original dura 77,6).
 *   2b. las REGLAS FIJAS del canal (skill `recorrido-luxur`, SKILL.md §0) y la EXCEPCIÓN DECLARADA: la pieza abre con el hook (el f0 es Isabella, su primera palabra suena ≥ 3 f después y lleva su
 *      subtítulo); no hay texto arriba ni cuenta `@…`, y NUNCA el sello «PROPIEDADES LUXUR» (`SelloCampana`). La regla «sin cifras en pantalla» se comprueba aquí también.
 *   2c. el CIERRE (`cierre-052.ts`): NADA SE CONGELA (la imagen de Isabella funde a negro y llega a negro exacto en su último fotograma), y sigue una TARJETA OSCURA (el último plano, un negro liso)
 *      con el LOGO —más pequeño y al 60 % de opacidad: 40 % de transparencia— y la WEB, que caben, caen en las zonas seguras y se leen enteros.
 *   2d. el COLOR de cada plano (R32).
 *   3. la VOZ de sus tomas: el WAV existe y tiene el tramo que se lee, ninguna palabra suena dentro de un desclic, queda aire tras la última palabra de la pieza y la ganancia por toma es sensata.
 *   4. el AUDIO: la LOCUCIÓN (o su pendiente, dicho en voz alta), la música («Here For You», piano sin golpes: sin cortes secos que medir) apagada bajo la tarjeta, y el audio entero (`revisaAudio`).
 *   4b. la música BAJA bajo la voz (curva de coseno que acaba antes de la primera palabra) y sube después.
 *   5. los SUBTÍTULOS: su validador sin un aviso, con las letras del canal; cada trozo dentro de una ventana de voz (la de la locución, mientras no existe, es la PROVISIONAL del original); nada encima de Isabella.
 *
 * Carga los módulos TypeScript DE VERDAD (`abrePuerta` → esbuild): lo que mide es lo que se renderiza. Sale con 1 si algo falla.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ejecutar } from "../../herramientas/comun.mjs";
import { abrePuerta, cargaTs, duracionDe, PUBLICO, RAIZ } from "../../remotion/src/motor/metraje/revisar-metraje.mjs";

/**
 * EXCEPCIÓN DECLARADA (réplica de `02.mp4`, que abre con Isabella; el reparto `proyectos/044/reparto-051-053.md` fija «frame 0 = Isabella» en las tres réplicas): la pieza ABRE con Isabella, sin plano de la casa
 * delante. Rompe a propósito la regla fija «la primera toma sale sin texto ni voz» (como la 046, la 048 y la 050). Con `ABRE_CON_EL_HOOK = false` la puerta vuelve a exigir un primer plano limpio. El resto de
 * reglas fijas (nunca el sello, nada arriba, el cierre en la tarjeta oscura, nada se congela) se siguen comprobando.
 */
const ABRE_CON_EL_HOOK = true;
/** Los bloques de ESTA pieza: el hook (2), el recorrido con la locución (5) y el CTA (6). No hay «casa», objeciones ni segundo recorrido: es la estructura del original. */
const BLOQUES = [2, 5, 6];
/** Los bloques en los que Isabella habla a cámara. */
const DE_ELLA = [2, 6];
/**
 * El ORDEN del original (`02.mp4`, lectura por fotogramas): el clip de cada plano, uno tras otro. `rc21r` = RC21 al revés; `ct04` sustituye a «Isabella en la cocina» y `rc17` al «bosque con hierba» (declarado).
 * Si alguien reordena o quita un plano, la puerta lo dice: una réplica son LAS MISMAS TOMAS EN EL MISMO ORDEN.
 */
const ORDEN_DEL_ORIGINAL = ["hk04", "rc21r", "rc22", "rc06", "rc01", "rc03", "rc15", "ct04", "rc16", "rc17", "rc13", "rc12", "ct05", "cierre-oscuro"];

const TECHO_ZOOM = 1.2; // clips normalizados a 1296 px = 1080 × 1,2
const TOPE_SEGUNDOS = 86; // DECLARADO: la réplica dura lo que dura el original (77,6 s) más lo que alarga el hook entero (+2,3 s), la voz generada (≈ 5 % más lenta) y la tarjeta; el formato apunta a 45-50 s
const MARGEN_FUNDIDO = 2; // f entre la última palabra y el inicio de la disolvencia del siguiente
const COLA_FINAL = [45, 120]; // f desde la última palabra del CTA hasta el final (lo que le queda de toma + la tarjeta): la web se lee, sin quedarse muerto
const TARJETA_FRAMES = [45, 75]; // f que dura la tarjeta oscura del cierre (1,5-2,5 s)
const HOLGURA_TROZO = 3; // f que un trozo puede adelantarse a su palabra
const ACENTO_MENOS_PEDIDO = 8; // px que se le restan a la cursiva (el 017 lo pidió así y todas las versiones del canal lo comparten)
const OPACIDAD_PEDIDA = 0.9; // la opacidad de los subtítulos (el canal)
const BAJO_VOZ_MIN = 9; // LU que la música tiene que quedar por debajo de la voz

/**
 * Las versiones ANTERIORES de ARRIENDO de Tierra Grata, para la sección 7b: cuánto metraje comparte esta con cada una. Las 045-050 ya están en este árbol (el PR #24/#25); las 051 y 053 se montan A LA VEZ en worktrees
 * hermanos, sin commit: se buscan por nombre y, si no están, esa línea calla. Los códigos de clip son los de `proyectos/044/catalogo-material.md` y valen entre ellas.
 */
const hermanos = existsSync(join(RAIZ, "..")) ? readdirSync(join(RAIZ, "..")) : [];
const hermano = (n) => hermanos.find((d) => d.startsWith(`reel-0${n}-`));
const VERSIONES_ANTERIORES = [
  ...[45, 46, 47, 48, 49, 50].map((n) => ({ nombre: `la V${n - 18} (0${n})`, plan: `remotion/src/proyectos/0${n}/metraje-0${n}.ts`, cortes: `metraje0${n}` })),
  ...[51, 53]
    .filter((n) => hermano(n))
    .map((n) => ({ nombre: `la V${n - 18} (0${n}, sin fusionar)`, plan: `../${hermano(n)}/remotion/src/proyectos/0${n}/metraje-0${n}.ts`, cortes: `metraje0${n}` })),
];

const SIN_VOZ = {};

// Un plan que no carga (un corte con voz y velocidad distinta de 1, un import
// roto) no deja una traza: dice qué pasa y sale con 1.
const puerta = await abrePuerta({
  proyecto: "052",
  plan: "remotion/src/proyectos/052/metraje-052.ts",
  cortes: "metraje052",
  receta: "node proyectos/052/normalizar.mjs",
  extras: {
    audio: "remotion/src/proyectos/052/audio-052.ts",
    subtitulos: "remotion/src/proyectos/052/subtitulos-052.ts",
    tramos: "remotion/src/motor/sound/tramos.ts",
    editorial: "remotion/src/motor/subtitulos-editoriales.ts",
    marca: "remotion/src/marcas/luxur.ts",
    cierre: "remotion/src/proyectos/052/cierre-052.ts",
  },
}).catch((e) => {
  console.log(`\n❌ el plan del 052 no carga: ${e.message}\n`);
  process.exit(1);
});
const { cortes, fps, fallos, mal, ok, seccion } = puerta;
const M = puerta.plan;
const F = puerta.modulos.formato;
const A = puerta.modulos.audio;
const T = puerta.modulos.tramos;
const E = puerta.modulos.editorial;
const bloques = puerta.modulos.subtitulos.subtitulos052;
const DURACION = M.DURACION_052;
const byId = (id) => {
  const c = cortes.find((x) => x.id === id);
  if (!c) throw new Error(`falta el plano ${id} en metraje-052.ts`);
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
seccion("2. la estructura de la réplica: hook · recorrido con la locución · CTA, en el orden del original");
{
  const n = fallos.length;
  const primero = cortes[0];
  if (ABRE_CON_EL_HOOK) {
    if (primero.id !== "c01-hook") mal(`${primero.id}: con ABRE_CON_EL_HOOK el primer plano es c01-hook`);
    if (cortes.some((c) => c.bloque === 1)) mal("hay un plano del bloque 1: con ABRE_CON_EL_HOOK la pieza no lleva «casa» al principio");
  } else {
    if (primero.bloque !== 1) mal(`${primero.id}: el primer plano es del bloque ${primero.bloque}; la pieza abre con la casa (bloque 1)`);
    if (primero.audio) mal(`${primero.id}: el primer plano lleva voz; la casa abre sola y ella entra después`);
  }
  if ((primero.entra ?? "corte") !== "corte") mal(`${primero.id}: entra con «${primero.entra}»; el frame 0 no nace de un fundido`);
  cortes.forEach((c, i) => {
    if (!BLOQUES.includes(c.bloque)) mal(`${c.id}: bloque ${c.bloque}; esta pieza lleva los bloques ${BLOQUES.join(", ")}`);
    if (i > 0 && c.bloque < cortes[i - 1].bloque) mal(`${c.id}: bloque ${c.bloque} después del ${cortes[i - 1].bloque}; los bloques van en orden`);
    const deElla = DE_ELLA.includes(c.bloque) && !esTarjeta(c);
    if (deElla && !c.audio) mal(`${c.id}: bloque ${c.bloque} sin \`audio\`; en los bloques ${DE_ELLA.join(", ")} habla Isabella a cámara`);
    if (!deElla && c.audio) mal(`${c.id}: bloque ${c.bloque} con \`audio\`; en los recorridos la voz es en off y va en audio-052.ts`);
    if (c.audio && !c.voz) mal(`${c.id}: tiene \`audio\` pero no \`voz\` (s0, s1, lufs medidos)`);
    if (!c.reason || c.reason.trim().length < 15) mal(`${c.id}: sin \`reason\`; cada plano dice qué hace ahí o sobra (viaje-emocional.md §4)`);
    // Ni uno solo acelerado: en esta pieza el recorrido es del bloque 5 y «en el 5 los planos se miran a su tiempo» (el original acelera RC21, RC01 y RC03: se declara).
    if ((c.velocidad ?? 1) !== 1) mal(`${c.id}: velocidad ${c.velocidad} en el bloque ${c.bloque}; solo se acelera la aproximación (bloque 3), nunca el recorrido con voz (viaje-emocional.md §6)`);
    // Disolvencias en todos los planos salvo el primero y la tarjeta (a corte, donde acaba la toma): la canción es un piano sin golpes y un corte seco no tendría dónde caer (R33).
    if (i > 0 && !esTarjeta(c) && c.entra !== "disolver") mal(`${c.id}: entra a «${c.entra}»; con un piano sin golpes el único cambio de plano es la disolvencia`);
  });
  // La réplica: LAS MISMAS TOMAS EN EL MISMO ORDEN.
  const orden = cortes.map((c) => c.src.split("/").pop().replace(/\.(mp4|png)$/, ""));
  if (JSON.stringify(orden) !== JSON.stringify(ORDEN_DEL_ORIGINAL)) mal(`el orden de los planos es ${orden.join(" · ")} y el original (02.mp4) es ${ORDEN_DEL_ORIGINAL.join(" · ")}`);
  for (const b of BLOQUES) if (!cortes.some((c) => c.bloque === b)) mal(`falta el bloque ${b}`);
  const ultimo = cortes.at(-1);
  if (ultimo.bloque !== BLOQUES.at(-1)) mal(`${ultimo.id}: la pieza acaba en el bloque ${ultimo.bloque}; cierra Isabella con el CTA (bloque ${BLOQUES.at(-1)})`);
  const antesDelCta = cortes.filter((c) => c.bloque < BLOQUES.at(-1)).at(-1);
  if (antesDelCta && antesDelCta.bloque !== BLOQUES.at(-2)) mal(`${antesDelCta.id}: el plano anterior al CTA es del bloque ${antesDelCta.bloque}; tiene que ser el último recorrido (bloque ${BLOQUES.at(-2)})`);
  const veces = DE_ELLA.filter((b) => BLOQUES.includes(b)).length;
  if (conVoz.length !== veces) mal(`Isabella sale ${conVoz.length} veces a cámara; con los bloques ${BLOQUES.join(", ")} son ${veces}`);
  if (DURACION / fps > TOPE_SEGUNDOS) mal(`${(DURACION / fps).toFixed(1)} s: la réplica no pasa de ${TOPE_SEGUNDOS} s`);
  if (fallos.length === n) {
    const porBloque = BLOQUES.map((b) => `b${b} ${(cortes.filter((c) => c.bloque === b).reduce((s, c) => s + c.dur, 0) / fps).toFixed(1)} s`);
    console.log(`  ℹ️  DECLARADO: ${(DURACION / fps).toFixed(1)} s (el formato pide ≤ 55 s: aquí manda la réplica, que dura 77,6 s) · la última imagen de la casa es la Social Kitchen, como en el original (no hay «vista» como clímax) · el recorrido repite metraje de las otras piezas`);
    ok(`${cortes.length} planos en el orden del original · ${(DURACION / fps).toFixed(1)} s · ${porBloque.join(" · ")} · Isabella ${conVoz.length} veces · todos con razón · todos disueltos entre sí`);
  }
}

/* 2b · las reglas fijas del canal ───────────────────────────────────────── */
seccion("2b. reglas fijas del canal (la primera toma sin texto: EXCEPCIÓN DECLARADA, abre el hook), nunca el sello ni la cuenta, ninguna cifra");
{
  const n = fallos.length;
  const primera = cortes[0];
  const hook = conVoz[0];
  if (!hook) mal("ninguna toma lleva voz: no hay hook de Isabella");
  else if (bloques.length === 0) mal("no hay ningún subtítulo");
  else if (ABRE_CON_EL_HOOK) {
    // El hook ES el frame 0, a corte, con su primera palabra ≥ DESCLIC_VOZ f después y su primer subtítulo con ella. La música ya suena, BAJA, desde el f0 (4b).
    if (hook.en !== 0 || (hook.entra ?? "corte") !== "corte") mal(`${hook.id}: con ABRE_CON_EL_HOOK entra a corte en el f0`);
    if (vozDe(hook).ini < hook.en + T.DESCLIC_VOZ) mal(`${hook.id} entra a corte en f${hook.en} y su primera palabra suena en f${vozDe(hook).ini}: tiene que ser ≥ f${hook.en + T.DESCLIC_VOZ}`);
    // El primer subtítulo acompaña a su primera palabra: entra en [ini − 3, ini + 1] (el hook abre la pieza, así que lleva texto desde el principio).
    const primerTexto = Math.min(...bloques.map((b) => b.trozos[0].desde));
    if (primerTexto > vozDe(hook).ini + 1 || primerTexto < vozDe(hook).ini - HOLGURA_TROZO) mal(`el primer texto entra en f${primerTexto} y la primera palabra suena en f${vozDe(hook).ini}: tiene que ir con ella (−${HOLGURA_TROZO}…+1 f)`);
  } else {
    const primerTexto = Math.min(...bloques.map((b) => b.trozos[0].desde));
    if (primerTexto <= 0) mal(`el primer bloque de texto entra en el frame ${primerTexto}: la miniatura (frame 0) tiene que salir sin texto`);
    if (primerTexto < hook.en) mal(`el primer texto entra en f${primerTexto}, antes de que acabe la primera toma (la imagen de Isabella es opaca en f${hook.en}): la primera toma sale SIEMPRE sin texto`);
    if (vozDe(hook).ini < hook.en + 1) mal(`${hook.id} empieza a hablar en f${vozDe(hook).ini} y su imagen no es opaca hasta f${hook.en}: la primera toma sale sin voz`);
  }
  const hayArriba = bloques.filter((b) => b.posicion === "arriba");
  if (hayArriba.length) mal(`hay texto arriba (${hayArriba.map((b) => b.id).join(", ")}): ni hook escrito ni cuenta; arriba no hay nada`);
  if (bloques.some((b) => b.trozos.some((t) => /@/.test(t.texto)))) mal("hay una cuenta de texto (@…) en los subtítulos: el cierre lleva el logo y la web, no la cuenta");
  // SIN CIFRAS en pantalla (el reparto: la réplica del 02 no dice ninguna) ni en lo que dicen las tomas.
  const conCifra = [];
  for (const b of bloques) for (const t of b.trozos) if (/\d/.test(t.texto)) conCifra.push(`[${b.id}] «${t.texto}»`);
  if (conCifra.length) mal(`hay cifras en pantalla (${conCifra.join(" · ")}): esta réplica no lleva ninguna`);
  for (const c of conVoz) if (/\d/.test(c.voz.dice)) mal(`${c.id}: su \`dice\` lleva cifras en dígitos («${c.voz.dice}»)`);
  // NUNCA el sello «PROPIEDADES LUXUR»: ni se importa ni se monta ni se escribe a mano.
  const fuente = readFileSync(join(RAIZ, "remotion", "src", "proyectos", "052", "Recorrido052.tsx"), "utf8");
  const sinComentarios = fuente.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
  if (/SelloCampana/.test(sinComentarios)) mal("la composición usa `SelloCampana`: el sello «PROPIEDADES LUXUR» no se pone NUNCA");
  if (/PROPIEDADES LUXUR/.test(sinComentarios)) mal("la composición escribe «PROPIEDADES LUXUR» a mano: el sello no se pone NUNCA");
  if (fallos.length === n) {
    if (ABRE_CON_EL_HOOK) console.log("  ℹ️  EXCEPCIÓN DECLARADA (réplica de 02.mp4, 2026-10-20): la primera toma lleva voz y texto desde el f0; la regla fija «la primera toma sale sin texto ni voz» no se cumple en esta pieza");
    ok(`${ABRE_CON_EL_HOOK ? `la pieza ABRE con el hook (excepción declarada): su primer subtítulo entra en f${bloques[0].trozos[0].desde}, con su voz` : `la primera toma (${primera.id}) sale SIN texto ni voz`} · nada arriba y ninguna cuenta · ninguna cifra · sin sello (no se usa \`SelloCampana\`)`);
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
  const fuente = readFileSync(join(RAIZ, "remotion", "src", "proyectos", "052", "Recorrido052.tsx"), "utf8");
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
  if (tarjeta.dur !== CI.DUR_TARJETA) mal(`${tarjeta.id} dura ${tarjeta.dur} f y cierre-052.ts dice ${CI.DUR_TARJETA}`);
  if (tarjeta.dur < TARJETA_FRAMES[0] || tarjeta.dur > TARJETA_FRAMES[1]) mal(`la tarjeta dura ${tarjeta.dur} f (entre ${TARJETA_FRAMES[0]} y ${TARJETA_FRAMES[1]}): la web se lee, sin quedarse muerto`);
  const rutaTarjeta = join(PUBLICO, CI.TARJETA);
  if (!existsSync(rutaTarjeta)) mal(`no existe remotion/public/${CI.TARJETA} (node proyectos/052/normalizar.mjs)`);
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

/* 3 · la voz de las tomas ───────────────────────────────────────────────── */
seccion("3. la voz de las tomas a cámara");
{
  const n = fallos.length;
  const ganancias = [];
  cortes.forEach((c, i) => {
    if (!c.audio || !c.voz) return;
    if (!existsSync(join(PUBLICO, c.audio))) return mal(`${c.id}: no existe remotion/public/${c.audio} (node proyectos/052/normalizar.mjs)`);
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

/* 4 · el audio: la locución y la música ────────────────────────────────── */
seccion("4. el audio: la locución (¿existe?), la música «Here For You» y el audio entero");
/** Todas las voces en frames de la comp: Isabella en sus dos tomas y la locución (la real o, mientras no existe, la PROVISIONAL del original). */
const ventanasDeVoz = conVoz.filter((c) => c.voz).map((c) => ({ id: c.id, ...vozDe(c) }));
{
  const n = fallos.length;
  for (const a of T.revisaAudio(A.audio052, { fps, duracion: DURACION })) mal(`revisaAudio: ${a}`);
  for (const t of A.audio052) {
    if (!existsSync(join(PUBLICO, t.src))) {
      mal(`${t.id}: no existe remotion/public/${t.src}`);
      continue;
    }
    if (t.bucle) continue;
    const hasta = (Math.round((t.desde ?? 0) * fps) + t.dur) / fps;
    const dura = duracionDe(t.src);
    if (hasta > dura + 1 / fps) mal(`${t.id}: se lee hasta ${hasta.toFixed(2)} s y ${t.src} dura ${dura.toFixed(2)} s`);
  }
  // LA LOCUCIÓN. NO EXISTE como archivo (solo está mezclada con la música vieja dentro de `02.mp4`): mientras `OFF_PENDIENTE`, la puerta lo dice y la ventana de voz es la PROVISIONAL del original.
  if (A.OFF_PENDIENTE) {
    if (A.off052.length) mal("OFF_PENDIENTE = true pero hay tramos de off: sobra uno de los dos");
    console.log(`  ⚠️  LA LOCUCIÓN NO EXISTE (OFF_PENDIENTE): no hay tramo de off en el audio; los planos y los subtítulos van contra el reloj del propio 02.mp4 (f${A.VENTANA_OFF.ini}-${A.VENTANA_OFF.fin}) y la música sube sola por debajo. Hay que decidir con el usuario: o entrega los audios, o se genera con la voz clonada de Isabella (proyectos/044/reparto-051-053.md §3). \`--final\` falla mientras tanto.`);
    ventanasDeVoz.push({ id: "off (provisional)", ini: A.VENTANA_OFF.ini, fin: A.VENTANA_OFF.fin });
  } else {
    if (!A.off052.length) mal("OFF_PENDIENTE = false y no hay ningún tramo de off");
    for (const o of A.off052) {
      const g = typeof o.ganancia === "number" ? 20 * Math.log10(o.ganancia) : 0;
      if (Math.abs(g) > 6) mal(`${o.id}: ganancia ${g.toFixed(1)} dB (|g| > 6)`);
      if (!o.voz || !(o.voz.s1 > o.voz.s0)) {
        mal(`${o.id}: sin \`voz\` medida (s0, s1): sin ella no se sabe dónde habla dentro del tramo`);
        continue;
      }
      // El off se mide como una toma: por su ventana de voz, no por el tramo entero.
      const ini = T.frameDeFuente(o.en, o.desde, o.voz.s0, fps);
      const fin = T.frameDeFuente(o.en, o.desde, o.voz.s1, fps);
      if (ini < o.en + (o.entra ?? 0)) mal(`${o.id}: empieza a hablar en f${ini}, dentro de su fundido de entrada (acaba en f${o.en + (o.entra ?? 0)})`);
      if (fin > o.en + o.dur - (o.sale ?? 0)) mal(`${o.id}: la última palabra acaba en f${fin}, dentro de su fundido de salida (empieza en f${o.en + o.dur - (o.sale ?? 0)})`);
      for (const v of ventanasDeVoz) if (ini < v.fin && fin > v.ini) mal(`${o.id}: el off habla (f${ini}-${fin}) mientras Isabella habla en ${v.id} (f${v.ini}-${v.fin})`);
      // Entra después del hook (sin pisar su disolvencia de salida) y calla antes de que empiece a verse la toma del CTA.
      const hook = conVoz[0];
      if (ini < vozDe(hook).fin + MARGEN_FUNDIDO) mal(`${o.id}: empieza a hablar en f${ini} y el hook acaba en f${vozDe(hook).fin}: tiene que dejar ≥ ${MARGEN_FUNDIDO} f`);
      const cta = conVoz.at(-1);
      if (fin > visibleDesde(cta) - MARGEN_FUNDIDO) mal(`${o.id}: la última palabra del off acaba en f${fin} y ${cta.id} empieza a verse en f${visibleDesde(cta)}: tiene que callar ${MARGEN_FUNDIDO} f antes`);
      ventanasDeVoz.push({ id: o.id, ini, fin });
    }
  }
  // La música: una sola canción, del f0 hasta FIN_MUSICA_052 (2 f antes del final), y apagada bajo la tarjeta.
  const musica = A.audio052.find((t) => t.id === "musica");
  const cta = byId("c13-cta");
  if (!musica || musica.src !== "recorrido-052/musica-052.wav") mal("no suena «Here For You» (recorrido-052/musica-052.wav)");
  else {
    if (Math.abs(musica.desde - M.INICIO_MUSICA) > 1e-9) mal(`la música arranca en ${musica.desde} s y INICIO_MUSICA dice ${M.INICIO_MUSICA}`);
    if (musica.en !== 0 || musica.dur !== M.FIN_MUSICA_052) mal(`la música ocupa f${musica.en}-${musica.en + musica.dur} y tiene que ir de 0 a FIN_MUSICA_052 (f${M.FIN_MUSICA_052})`);
    if (M.FIN_MUSICA_052 !== DURACION - 2) mal(`la música acaba en f${M.FIN_MUSICA_052} y la pieza en f${DURACION}: tiene que acabar 2 f antes`);
    const ctaFin = cta.en + cta.dur;
    const g = Array.isArray(musica.ganancia) ? musica.ganancia : [];
    const ultimoPunto = g.at(-1);
    if (!ultimoPunto || ultimoPunto[0] !== M.FIN_MUSICA_052 || ultimoPunto[1] !== 0) mal(`la envolvente de la música no acaba en silencio en f${M.FIN_MUSICA_052}`);
    const puntoCta = g.find((p) => p[0] === ctaFin);
    if (!puntoCta || !(puntoCta[1] > 0.2)) mal(`la música tiene que estar a su nivel «solo» hasta que acaba la toma (f${ctaFin}) y apagarse desde ahí, bajo la tarjeta`);
    // La canción empieza en un frame entero (1/30 s): `trimBefore` no la mueve.
    if (Math.abs(musica.desde * fps - Math.round(musica.desde * fps)) > 1e-6) mal(`INICIO_MUSICA = ${musica.desde} s no es un frame entero a ${fps} fps`);
    // El piano no tiene pulso: no hay corte seco que medir. (Una disolvencia no pide golpe, R33.)
    if (cortes.some((c, i) => i > 0 && !esTarjeta(c) && c.entra === "corte")) mal("hay un corte seco y la canción no tiene golpes donde caer (R33)");
  }
  if (fallos.length === n) {
    ok(`${A.audio052.length} tramos (${A.voces052.length} de toma, ${A.off052.length} en off${A.OFF_PENDIENTE ? " — la locución NO EXISTE" : ""}, ${A.musica052.length} de música) · «Here For You» desde el ${M.INICIO_MUSICA.toFixed(3)} s, una sola canción · se apaga en línea recta bajo la tarjeta del cierre · sin cortes secos`);
  }
}

/* 4b · la música baja cuando habla alguien ─────────────────────────────── */
seccion("4b. la música baja bajo la voz (hook, locución y CTA)");
{
  const n = fallos.length;
  const musica = A.audio052.find((t) => t.id === "musica");
  const nivel = (f) => T.volumenDe(musica, f - musica.en);
  const arriba = Math.max(...Array.from({ length: DURACION }, (_, f) => nivel(f)));
  // En CADA frame de la ventana de voz de Isabella (hook y CTA) —y de la locución cuando existe— la música está en su nivel bajo y ≥ BAJO_VOZ_MIN LU bajo la voz.
  const reales = ventanasDeVoz.filter((v) => !/provisional/.test(v.id));
  let techoLufs = -Infinity;
  const filas = [];
  for (const v of reales) {
    let peor = 0;
    for (let f = v.ini; f <= v.fin; f++) peor = Math.max(peor, nivel(f));
    const db = 20 * Math.log10(peor / arriba);
    if (peor > arriba * 0.25) mal(`${v.id}: durante su voz (f${v.ini}-${v.fin}) la música llega a ${db.toFixed(1)} dB bajo su nivel de recorrido; tiene que estar por debajo de −12 dB`);
    techoLufs = Math.max(techoLufs, A.LUFS_MESETA + 20 * Math.log10(peor));
    filas.push(`${v.id.replace(/^c\d+-/, "")} ${db.toFixed(1)} dB`);
  }
  const bajoVoz = M.OBJETIVO_LUFS - techoLufs;
  if (bajoVoz < BAJO_VOZ_MIN) mal(`bajo la voz la música llega a ${techoLufs.toFixed(1)} LUFS, ${bajoVoz.toFixed(1)} LU bajo ella (${M.OBJETIVO_LUFS}); tiene que ser ≥ ${BAJO_VOZ_MIN} LU en TODO su recorrido`);
  // La música ENTRA YA BAJA bajo el hook (suena desde el f0, con 3 f de entrada) y la curva de cada voz ACABA antes de su primera palabra.
  if (nivel(0) > arriba * 0.25 || nivel(3) < arriba * 0.1) mal(`la música tiene que sonar baja desde el f0 (3 f de entrada): f0 = ${(nivel(0) / arriba).toFixed(2)}, f3 = ${(nivel(3) / arriba).toFixed(2)} de su nivel «solo»`);
  for (const v of reales) if (nivel(v.ini) > arriba * 0.25) mal(`${v.id}: la música aún no ha bajado cuando entra su primera palabra (f${v.ini}): la curva tiene que acabar ANTES de que hable`);
  // …y sube de nuevo tras el CTA (no se queda enterrada hasta la tarjeta) y tras el hook cuando no hay locución.
  const cta = byId("c13-cta");
  const ctaV = vozDe(cta);
  if (nivel(Math.min(ctaV.fin + 14, cta.en + cta.dur)) < arriba * 0.9) mal("12 f después de la última palabra del CTA la música no ha subido a su nivel «solo»");
  if (fallos.length === n) {
    ok(`la música baja a ${filas.join(" · ")} durante su voz, a ${techoLufs.toFixed(1)} LUFS como mucho: ${bajoVoz.toFixed(1)} LU bajo ella · entra baja desde el f0 y cada curva acaba antes de la primera palabra${A.OFF_PENDIENTE ? " · (sin locución la música no baja entre el hook y el CTA)" : ""}`);
  }
}

/* 5 · subtítulos ────────────────────────────────────────────────────────── */
seccion("5. subtítulos editoriales");
{
  const n = fallos.length;
  if (E.modoTextoDe(CANAL) !== "editorial") mal(`el canal está en modo «${E.modoTextoDe(CANAL)}»: esta pieza monta subtítulos editoriales`);
  const letra = E.letraSubtitulosDe(CANAL);
  const acentoMenos = puerta.modulos.subtitulos.ACENTO_MENOS_052;
  for (const a of E.revisaSubtitulosEditoriales(bloques, { fps, ancho: 1080, alto: 1920, duracion: DURACION, letra, acentoMenos })) mal(`revisaSubtitulosEditoriales: ${a}`);
  // La cursiva, 8 px más pequeña (como en las versiones de Los Patios): la constante, que la composición se la pase al componente, y el efecto medido en el motor.
  const vistaCuadro = { ancho: 1080, alto: 1920 };
  if (acentoMenos !== ACENTO_MENOS_PEDIDO) mal(`ACENTO_MENOS_052 = ${acentoMenos} y el canal pide ${ACENTO_MENOS_PEDIDO} px menos en la cursiva`);
  let cursiva = "";
  const bloqueConAcento = bloques.find((b) => b.trozos.some((t) => t.estilo === "acento"));
  if (!bloqueConAcento) mal("no hay ningún acento: no hay cursiva que reducir");
  else {
    const sin = E.resuelveBloque(bloqueConAcento, vistaCuadro, letra).lineas;
    const con = E.resuelveBloque(bloqueConAcento, vistaCuadro, letra, { acentoMenos }).lineas;
    sin.forEach((l, i) => {
      const esperado = l.estilo === "acento" ? l.px - ACENTO_MENOS_PEDIDO : l.px;
      if (con[i].px !== esperado) mal(`[${bloqueConAcento.id}] línea «${l.texto}» (${l.estilo}): ${con[i].px} px y se esperaban ${esperado}: solo la cursiva baja ${ACENTO_MENOS_PEDIDO} px`);
      if (l.estilo === "acento") cursiva = `${l.px} → ${con[i].px} px`;
    });
  }
  // Todo lo que dice Isabella va ABAJO (el canal lo pide) y a 90 %. Arriba no hay nada (ver 2b y 2c).
  for (const b of bloques) {
    if ((b.posicion ?? "abajo") !== "abajo") mal(`[${b.id}] va ${b.posicion}: los subtítulos de Isabella van abajo`);
  }
  const fuenteComp = readFileSync(join(RAIZ, "remotion", "src", "proyectos", "052", "Recorrido052.tsx"), "utf8");
  const mOp = /export const OPACIDAD_SUBTITULOS\s*=\s*([0-9.]+)/.exec(fuenteComp);
  if (!mOp || Math.abs(Number(mOp[1]) - OPACIDAD_PEDIDA) > 1e-9) mal(`OPACIDAD_SUBTITULOS = ${mOp ? mOp[1] : "?"} y el canal pide ${OPACIDAD_PEDIDA}`);
  if (!/<SubtitulosEditoriales\b[^>]*\bacentoMenos=\{ACENTO_MENOS_052\}/.test(fuenteComp)) mal("la composición no le pasa `acentoMenos={ACENTO_MENOS_052}` a <SubtitulosEditoriales>: la cursiva saldría a su tamaño de siempre");
  if (!/opacity:\s*OPACIDAD_SUBTITULOS[^}]*\}\}>\s*\n\s*<SubtitulosEditoriales/.test(fuenteComp)) mal("los <SubtitulosEditoriales> no están dentro del grupo con `opacity: OPACIDAD_SUBTITULOS`");
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
  // Esta pieza no lleva ninguna cifra (sección 2b del análisis): ni dato grande.
  for (const b of bloques) if (b.trozos.some((t) => t.estilo === "dato")) mal(`[${b.id}] lleva un dato grande: esta pieza no lleva ninguna cifra`);
  const b3 = cortes.filter((c) => c.bloque === 3);
  const ini3 = b3.length ? b3[0].en : 0;
  const fin3 = b3.length ? b3.at(-1).en + b3.at(-1).dur : 0;
  for (const b of bloques) {
    if (!b.trozos.some((t) => t.estilo === "dato")) continue;
    const ini = b.trozos[0].desde;
    if (ini < ini3 || b.hasta > fin3) mal(`[${b.id}] lleva un dato y va de f${ini} a f${b.hasta}; el bloque 3 va de f${ini3} a f${fin3} y el dato solo va ahí (viaje-emocional.md §9)`);
  }
  const acentos = bloques.reduce((s, b) => s + b.trozos.filter((t) => t.estilo === "acento").length, 0);
  if (fallos.length === n) ok(`${bloques.length} bloques, ${acentos} acentos · validador sin avisos con las letras del canal · todo lo de Isabella abajo, a ${OPACIDAD_PEDIDA * 100} % · la cursiva ${ACENTO_MENOS_PEDIDO} px menor (${cursiva}) · sin datos grandes ni cifras`);
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
  const carpetas = [join(RAIZ, "remotion", "src", "proyectos", "052"), join(RAIZ, "proyectos", "052", "voz")];
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
  if (A.OFF_PENDIENTE) {
    if (final) mal("la locución NO EXISTE (OFF_PENDIENTE = true en audio-052.ts): hay que decidir con el usuario si entrega los audios o se genera con la voz clonada de Isabella, y retimar planos y subtítulos con ella");
    else console.log("  ⚠️  la locución NO EXISTE (OFF_PENDIENTE): con `--final` esto falla");
  }
  if (!pendientes.length) ok("ni un «por confirmar» en los planos ni en los guiones de voz");
  else if (final) for (const p of pendientes) mal(`pendiente con el usuario: ${p}`);
  else for (const p of pendientes) console.log(`  ⚠️  por confirmar: ${p}`);
}

puerta.cierra(`el 052 pasa la puerta: ${cortes.length} planos, ${bloques.length} bloques de texto, ${A.audio052.length} tramos de audio`);
