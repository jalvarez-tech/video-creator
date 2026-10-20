#!/usr/bin/env node
/**
 * PUERTA DEL 047 — recorrido con presentadora, «LO QUE INCLUYE» (V29, Tierra Grata Bosque Santo, ARRIENDO), SIN RECORRIDOS (rev. 1).
 *
 *   node proyectos/047/revisar-047.mjs            (avisa de lo «por confirmar»)
 *   node proyectos/047/revisar-047.mjs --final    (lo «por confirmar» FALLA)
 *
 * Las comprobaciones del FORMATO salen de `revisar-metraje.mjs` (línea de tiempo, metraje, tramos, encuadre). Encima, lo que esta pieza promete y ningún frame enseña. La pieza son SOLO las cuatro tomas de
 * Isabella (el usuario pidió no poner recorridos horizontales: recortados salían pixelados): los bloques 2 (hook) · 4 (mitad, DOS tomas) · 6 (CTA y cierre).
 *
 *   2. la ESTRUCTURA: los bloques 2-4-6 en orden, la pieza ABRE con el hook (a corte, en el f0: declarado), Isabella cuatro veces, ningún recorrido, la tarjeta al final y el total dentro del tope.
 *   2a. Isabella en cuatro fondos distintos y UNA SOLA cifra en pantalla (`$14.800.000`, en MD04).
 *   2b. las REGLAS FIJAS del canal: sin texto arriba ni cuenta `@…`, nunca el sello; la excepción de abrir con el hook (los primeros fotogramas sin texto ni voz).
 *   2c. el CIERRE (`cierre-047.ts`): nada se congela, tarjeta oscura con el logo (440 px, 60 %) y la web.
 *   2d. el COLOR de cada plano (R32): los topes del canal.
 *   2e. el CTA: CT03 ENTERA, sin acción hablada (cierra la tarjeta), sin precio ni cifra.
 *   2f. el RITMO y los ACENTOS: todas las entradas son disolvencias, todo a ×1, 21-24 f entre una frase y la siguiente y cada acento cae en lo que se incluye.
 *   3. la VOZ de las cuatro tomas: su WAV tratado a −15 LUFS en su frase, pico real ≤ −1 dBTP, silencio fuera de ella, ninguna palabra en un fundido.
 *   4. el AUDIO entero (`revisaAudio`) y la MÚSICA («Dreamlife», sin golpes: lecho y caída): arranca en el f0, la caída cae donde entra el CTA y se apaga bajo la tarjeta.
 *   4b. la música va ≥ 9 LU bajo la voz en todo su recorrido, también bajo el CTA (sigue la caída de la canción).
 *   5. los SUBTÍTULOS: su validador sin un aviso, con las letras del canal; cada trozo dentro de una ventana de voz.
 *   7b. el METRAJE que comparte con las piezas hermanas del lote (informa).
 *
 * Carga los módulos TypeScript DE VERDAD (`abrePuerta` → esbuild): lo que mide es lo que se renderiza. Sale con 1 si algo falla.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ejecutar } from "../../herramientas/comun.mjs";
import { abrePuerta, cargaTs, duracionDe, PUBLICO, RAIZ } from "../../remotion/src/motor/metraje/revisar-metraje.mjs";

/**
 * Los bloques de ESTA pieza: 2 (hook) · 4 (mitad, DOS tomas) · 6 (CTA y cierre). SIN RECORRIDOS (bloques 3 y 5) NI APERTURA CON LA CASA (bloque 1): el usuario pidió no poner recorridos horizontales y no hay recorrido
 * vertical ni dron. La pieza ABRE con el hook, a corte, en el f0 (excepción declarada, como el 021 y el 022: la regla fija 1 de `recorrido-luxur` §0 pide una primera toma de la casa sin texto ni voz).
 */
const ABRE_CON_EL_HOOK = true;
const BLOQUES = [2, 4, 6];
/** Los bloques en los que Isabella habla a cámara: todos los de esta pieza. */
const DE_ELLA = [2, 4, 6];

const TECHO_ZOOM = 1.2; // clips normalizados a 1296 px = 1080 × 1,2
const TOPE_SEGUNDOS = 55; // el formato apunta a 45-50 s; pasado de aquí ya es otra pieza
const MARGEN_FUNDIDO = 2; // f entre la última palabra y el inicio de la disolvencia del siguiente
const COLA_FINAL = [45, 120]; // f desde la última palabra del CTA hasta el final (lo que le queda de toma + la tarjeta): la web se lee, sin quedarse muerto
const TARJETA_FRAMES = [45, 75]; // f que dura la tarjeta oscura del cierre (1,5-2,5 s)
const HOLGURA_TROZO = 3; // f que un trozo puede adelantarse a su palabra
const ACENTO_MENOS_PEDIDO = 8; // px que se le restan a la cursiva (el 017 lo pidió así y las versiones del canal lo comparten)
const OPACIDAD_PEDIDA = 0.9;
const PASEO_DUR = [90, 150]; // f (3,0-5,0 s): los planos del bloque 3 se miran, sin ritmo de cortos

/**
 * Las piezas HERMANAS del mismo lote (045-050, las seis sesiones de Tierra Grata), para la sección 7b: cuánto metraje comparte esta con cada una. `{ nombre, plan, cortes }`: el `metraje-NNN.ts` de aquella
 * (ruta desde la raíz del repo) y el nombre de su export. Viven en worktrees hermanos mientras se montan (`.claude/worktrees/*`): si no están, no hay nada que comparar. Los códigos de clip chocan entre propiedades
 * (`rc01.mp4` de una no es `rc01.mp4` de la otra): solo se compara con la misma propiedad.
 */
const VERSIONES_ANTERIORES = [
  { nombre: "el 045 (V27)", plan: "remotion/src/proyectos/045/metraje-045.ts", cortes: "metraje045" },
  { nombre: "el 046 (V28)", plan: "remotion/src/proyectos/046/metraje-046.ts", cortes: "metraje046" },
  { nombre: "el 048 (V30)", plan: "remotion/src/proyectos/048/metraje-048.ts", cortes: "metraje048" },
  { nombre: "el 049 (V31)", plan: "remotion/src/proyectos/049/metraje-049.ts", cortes: "metraje049" },
  { nombre: "el 050 (V32)", plan: "remotion/src/proyectos/050/metraje-050.ts", cortes: "metraje050" },
];

/**
 * Bloques de subtítulos que NO acompañan a una palabra dicha, y por qué. Una excepción que sobra (el bloque ya no existe, o todos sus trozos caen sobre voz) tumba la puerta.
 */
const SIN_VOZ = {};

// Un plan que no carga (un corte con voz y velocidad distinta de 1, un import
// roto) no deja una traza: dice qué pasa y sale con 1.
const puerta = await abrePuerta({
  proyecto: "047",
  plan: "remotion/src/proyectos/047/metraje-047.ts",
  cortes: "metraje047",
  receta: "node proyectos/047/normalizar.mjs",
  extras: {
    audio: "remotion/src/proyectos/047/audio-047.ts",
    subtitulos: "remotion/src/proyectos/047/subtitulos-047.ts",
    tramos: "remotion/src/motor/sound/tramos.ts",
    editorial: "remotion/src/motor/subtitulos-editoriales.ts",
    marca: "remotion/src/marcas/luxur.ts",
    cierre: "remotion/src/proyectos/047/cierre-047.ts",
  },
}).catch((e) => {
  console.log(`\n❌ el plan del 047 no carga: ${e.message}\n`);
  process.exit(1);
});
const { cortes, fps, fallos, mal, ok, seccion } = puerta;
const M = puerta.plan;
const F = puerta.modulos.formato;
const A = puerta.modulos.audio;
const T = puerta.modulos.tramos;
const E = puerta.modulos.editorial;
const bloques = puerta.modulos.subtitulos.subtitulos047;
const DURACION = M.DURACION_047;
const byId = (id) => {
  const c = cortes.find((x) => x.id === id);
  if (!c) throw new Error(`falta el plano ${id} en metraje-047.ts`);
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
seccion("2. la estructura: hook · mitad (dos tomas) · CTA y cierre, sin recorridos");
{
  const n = fallos.length;
  const primero = cortes[0];
  if (primero.id !== "c01-hook") mal(`${primero.id}: la pieza abre con el hook (c01-hook)`);
  if (primero.en !== 0 || (primero.entra ?? "corte") !== "corte") mal(`${primero.id}: tiene que entrar a corte en el f0`);
  if (cortes.some((c) => [1, 3, 5].includes(c.bloque))) mal(`hay planos de los bloques 1, 3 o 5: esta pieza no lleva recorridos (el usuario pidió no poner recorridos horizontales)`);
  if (cortes.some((c) => c.tipo === "video" && !c.audio)) mal(`hay un plano de vídeo mudo (${cortes.filter((c) => c.tipo === "video" && !c.audio).map((c) => c.id).join(", ")}): esta pieza son solo las tomas de Isabella`);
  cortes.forEach((c, i) => {
    if (!BLOQUES.includes(c.bloque)) mal(`${c.id}: bloque ${c.bloque}; esta pieza lleva los bloques ${BLOQUES.join(", ")}`);
    if (i > 0 && c.bloque < cortes[i - 1].bloque) mal(`${c.id}: bloque ${c.bloque} después del ${cortes[i - 1].bloque}; los bloques van en orden`);
    const deElla = DE_ELLA.includes(c.bloque) && !esTarjeta(c);
    if (deElla && !c.audio) mal(`${c.id}: bloque ${c.bloque} sin \`audio\`; en los bloques ${DE_ELLA.join(", ")} habla Isabella a cámara`);
    if (!deElla && c.audio) mal(`${c.id}: con \`audio\` y sin ser una toma de Isabella`);
    if (c.audio && !c.voz) mal(`${c.id}: tiene \`audio\` pero no \`voz\` (s0, s1, lufs medidos con el perfil de energía)`);
    if (!c.reason || c.reason.trim().length < 15) mal(`${c.id}: sin \`reason\`; cada plano dice qué hace ahí o sobra (viaje-emocional.md §4)`);
    if ((c.velocidad ?? 1) !== 1) mal(`${c.id}: velocidad ${c.velocidad}; esta pieza va a velocidad normal`);
  });
  for (const b of BLOQUES) if (!cortes.some((c) => c.bloque === b)) mal(`falta el bloque ${b}`);
  const ultimo = cortes.at(-1);
  if (ultimo.bloque !== BLOQUES.at(-1)) mal(`${ultimo.id}: la pieza acaba en el bloque ${ultimo.bloque}; cierra Isabella con el CTA (bloque ${BLOQUES.at(-1)})`);
  // Isabella: el hook, MD04, MD05 y el CTA (la mitad son DOS tomas unidas con una disolvencia: se declara).
  if (conVoz.length !== 4) mal(`Isabella sale ${conVoz.length} veces a cámara; son cuatro (hook, MD04, MD05 y CTA)`);
  if (DURACION / fps > TOPE_SEGUNDOS) mal(`${(DURACION / fps).toFixed(1)} s: el formato no pasa de ${TOPE_SEGUNDOS} s`);
  if (fallos.length === n) {
    const porBloque = BLOQUES.map((b) => {
      const suyos = cortes.filter((c) => c.bloque === b);
      return `b${b} ${(suyos.reduce((s, c) => s + c.dur, 0) / fps).toFixed(1)} s`;
    });
    ok(`${cortes.length} planos · ${(DURACION / fps).toFixed(1)} s · ${porBloque.join(" · ")} · Isabella ${conVoz.length} veces · abre con el hook a corte · sin recorridos · todos con razón`);
  }
}

/* 2a · los cuatro fondos de Isabella y UNA sola cifra ───────────────────────────── */
seccion("2a. Isabella en cuatro fondos distintos de la unidad y una sola cifra en pantalla ($14.800.000, en MD04)");
{
  const n = fallos.length;
  // El `LUGAR` de cada toma: el hook SENTADA en el sillón de la terraza común, MD04 en la Social Kitchen, MD05 en el gimnasio tras el vidrio y la CTA en las escaleras con césped y el edificio.
  const LUGAR = { "c01-hook": "TERRAZA-SILLON", "c02-mitad-precio": "SOCIAL-KITCHEN", "c03-mitad-amenidades": "GIMNASIO", "c04-cta": "ESCALERAS" };
  const tomas = conVoz.map((c) => ({ id: c.id, lugar: LUGAR[c.id] }));
  for (const t of tomas) if (!t.lugar) mal(`${t.id}: sin LUGAR en la puerta (revisar-047.mjs): dice dónde está ella`);
  const nombres = tomas.map((t) => t.lugar);
  if (new Set(nombres).size !== tomas.length) mal(`Isabella repite fondo: ${nombres.join(" · ")}; son cuatro tomas con cuatro fondos distintos`);
  // UNA sola cifra en pantalla: «$14.800.000», en el subtítulo de MD04 (es el canon de la ficha: 14.800.000 COP al mes) y en ningún otro. Las demás tomas no dicen cifra, precio ni área.
  const trozosConCifra = bloques.flatMap((b) => b.trozos.filter((t) => /\d/.test(t.texto)).map((t) => ({ b, t })));
  if (trozosConCifra.length !== 1) mal(`hay ${trozosConCifra.length} trozos con cifra en los subtítulos (${trozosConCifra.map((x) => `${x.b.id} «${x.t.texto}»`).join(", ")}): la pieza lleva UNA, «$14.800.000», en MD04`);
  else {
    const { b, t } = trozosConCifra[0];
    const md04 = byId("c02-mitad-precio");
    if (t.texto !== "$14.800.000") mal(`la cifra de la pieza es «${t.texto}»; tiene que ser «$14.800.000» (el canon de la ficha de la web)`);
    if (t.desde < md04.en || t.desde > md04.en + md04.dur) mal(`${b.id}: la cifra entra en f${t.desde} y MD04 va de f${md04.en} a f${md04.en + md04.dur}: la cifra va en el subtítulo de MD04`);
  }
  for (const c of conVoz) {
    if (c.id === "c02-mitad-precio") {
      if (!/catorce millones ochocientos/i.test(c.voz.dice)) mal(`${c.id}: dice «${c.voz.dice}»; es «catorce millones ochocientos que incluyen experiencias pensadas para ti»`);
      continue;
    }
    if (/\d|millones|metros|m²|precio|cuesta|euros|pesos/i.test(c.voz.dice)) mal(`${c.id}: lo que dice Isabella lleva una cifra, un área o un precio: «${c.voz.dice}»; el precio solo suena en MD04`);
  }
  if (fallos.length === n) ok(`${nombres.join(" → ")}: cuatro fondos distintos · una sola cifra en pantalla, «${trozosConCifra[0]?.t.texto}», con la voz de MD04`);
}

/* 2b · las reglas fijas del canal ───────────────────────────────────────── */
seccion("2b. reglas fijas del canal: la pieza abre con el hook (excepción declarada), nunca el sello ni la cuenta");
{
  const n = fallos.length;
  const primera = cortes[0];
  // La primera toma se ve hasta que la imagen de Isabella es opaca (su `en`): hasta entonces, ni texto ni voz.
  const hook = conVoz[0];
  if (!hook) mal("ninguna toma lleva voz: no hay hook de Isabella");
  else if (bloques.length === 0) mal("no hay ningún subtítulo");
  else {
    // La pieza ABRE con el hook, a corte, en el f0 (excepción declarada: no hay otra primera toma). Se respeta lo que se puede: los primeros fotogramas salen sin texto ni voz y el primer texto entra con su primera sílaba.
    if (hook.en !== 0 || (hook.entra ?? "corte") !== "corte") mal(`${hook.id}: la pieza abre con el hook, a corte, en el f0`);
    if (vozDe(hook).ini < hook.en + T.DESCLIC_VOZ) mal(`${hook.id} entra a corte en f${hook.en} y su primera palabra suena en f${vozDe(hook).ini}: tiene que ser ≥ f${hook.en + T.DESCLIC_VOZ}`);
    const primerTexto = Math.min(...bloques.map((b) => b.trozos[0].desde));
    if (primerTexto <= 0) mal(`el primer bloque de texto entra en el frame ${primerTexto}: los primeros fotogramas salen sin texto`);
    if (primerTexto < vozDe(hook).ini - 1) mal(`el primer texto entra en f${primerTexto}, antes de la primera sílaba de Isabella (f${vozDe(hook).ini}): nada de texto antes de que hable`);
  }
  const hayArriba = bloques.filter((b) => b.posicion === "arriba");
  if (hayArriba.length) mal(`hay texto arriba (${hayArriba.map((b) => b.id).join(", ")}): ni hook escrito ni cuenta; arriba no hay nada`);
  if (bloques.some((b) => b.trozos.some((t) => /@/.test(t.texto)))) mal("hay una cuenta de texto (@…) en los subtítulos: el cierre lleva el logo y la web, no la cuenta");
  // NUNCA el sello «PROPIEDADES LUXUR»: ni se importa ni se monta ni se escribe a mano.
  const fuente = readFileSync(join(RAIZ, "remotion", "src", "proyectos", "047", "Recorrido047.tsx"), "utf8");
  const sinComentarios = fuente.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
  if (/SelloCampana/.test(sinComentarios)) mal("la composición usa `SelloCampana`: el sello «PROPIEDADES LUXUR» no se pone NUNCA");
  if (/PROPIEDADES LUXUR/.test(sinComentarios)) mal("la composición escribe «PROPIEDADES LUXUR» a mano: el sello no se pone NUNCA");
  if (fallos.length === n) {
    ok(`la pieza ABRE con el hook (excepción declarada: sin recorrido no hay otra primera toma): los ${bloques[0].trozos[0].desde} primeros fotogramas salen sin texto ni voz y el primer subtítulo entra con su primera sílaba · nada arriba y ninguna cuenta · sin sello (no se usa \`SelloCampana\`)`);
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
  const fuente = readFileSync(join(RAIZ, "remotion", "src", "proyectos", "047", "Recorrido047.tsx"), "utf8");
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
  if (tarjeta.dur !== CI.DUR_TARJETA) mal(`${tarjeta.id} dura ${tarjeta.dur} f y cierre-047.ts dice ${CI.DUR_TARJETA}`);
  if (tarjeta.dur < TARJETA_FRAMES[0] || tarjeta.dur > TARJETA_FRAMES[1]) mal(`la tarjeta dura ${tarjeta.dur} f (entre ${TARJETA_FRAMES[0]} y ${TARJETA_FRAMES[1]}): la web se lee, sin quedarse muerto`);
  const rutaTarjeta = join(PUBLICO, CI.TARJETA);
  if (!existsSync(rutaTarjeta)) mal(`no existe remotion/public/${CI.TARJETA} (node proyectos/047/normalizar.mjs)`);
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

/* 2e · el CTA: CT03 entera, sin acción hablada ──────────────────────────────── */
seccion("2e. el CTA: CT03 ENTERA («cuando llegas a una ciudad que no es la tuya… una plusvalía que vale la pena conocer»), sin acción hablada, sin precio ni cifra");
{
  const n = fallos.length;
  const cta = byId("c04-cta");
  if (cta.src !== "recorrido-047/ct03.mp4") mal(`${cta.id}: el CTA de esta pieza es CT03; es ${cta.src}`);
  if (!/cuando llegas a una ciudad que no es la tuya.*acompa[ñn]amiento personalizado.*plusval[ií]a.*vale la pena conocer/i.test(cta.voz.dice)) mal(`${cta.id}: dice «${cta.voz.dice}»; el CTA es la toma ENTERA «cuando llegas a una ciudad que no es la tuya, el acompañamiento personalizado es una plusvalía que vale la pena conocer»`);
  // La toma entera: su voz empieza donde empieza «Cuando» (≤ 1 s) y no se recorta.
  if (cta.voz.s0 > 1.0) mal(`${cta.id}: la voz empieza en ${cta.voz.s0} s: la toma va entera, desde «Cuando»`);
  // No es una acción: no dice «escríbeme», «llama», «agenda» ni «visita», ni precio ni cifra. El CTA lo cierra la tarjeta (el logo y la web).
  const textoSubs = bloques.filter((b) => b.trozos[0].desde >= cta.en).flatMap((b) => b.trozos.map((t) => t.texto)).join(" ");
  if (/escr[ií]beme|llam|whatsapp|agend|visita|cont[aá]ct|millones|precio|\d/i.test(textoSubs)) mal("hay un subtítulo del CTA con una acción, con el precio o con una cifra: CT03 no es una acción y el precio va solo en MD04");
  // El clip no debe pedir más metraje del que tiene (llegar a su último fotograma está bien; pasarse congelaría el último).
  const dura = duracionDe(cta.src);
  if ((cta.desde ?? 0) + cta.dur / fps > dura + 1 / fps) mal(`${cta.id}: pide ${(((cta.desde ?? 0) + cta.dur / fps)).toFixed(2)} s de un clip de ${dura.toFixed(2)} s: se congelaría el último fotograma`);
  if (fallos.length === n) ok(`CT03 entera (voz ${cta.voz.s0}-${cta.voz.s1} s): sin acción hablada (la tarjeta con el logo y la web cierra) · sin precio ni cifra · el plano usa ${(cta.desde ?? 0).toFixed(2)}-${((cta.desde ?? 0) + cta.dur / fps).toFixed(2)} de ${dura.toFixed(2)} s del clip y nada se congela`);
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
  const TOPES_COLOR = { vibrance: 0.05, exposure: 0.4, contrast: 1.22, highlightsMin: -0.6, saturation: [0.95, 1.12] }; // contrast 1,22: el encargo pide MÁS contraste que el reel cinematográfico (1,15)
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

/* 2f · el ritmo, las disolvencias y los acentos ─────────────────────────────── */
seccion("2f. todas las entradas disolvencias, todo a ×1, 0,5-1 s entre una frase y la siguiente, y los acentos (lo que se incluye)");
{
  const n = fallos.length;
  // La canción no da golpes donde cortar en seco (R33): todo plano, salvo el primero (el frame 0, a corte) y la tarjeta (empieza donde acaba la toma del CTA), ENTRA con una disolvencia.
  for (const c of cortes) {
    if (c === cortes[0] || c.tipo === "foto") continue;
    if (c.entra !== "disolver") mal(`${c.id}: entra a «${c.entra}»; «Dreamlife» no tiene golpes de ≥ 12 dB donde cortar en seco: todo plano entra con una disolvencia`);
  }
  // Entre la última palabra de una toma y la primera de la siguiente: 15-30 f (0,5-1 s): una pausa de respiración, ni atropellada ni muerta.
  const huecos = [];
  for (let i = 1; i < conVoz.length; i++) {
    const hueco = vozDe(conVoz[i]).ini - vozDe(conVoz[i - 1]).fin;
    huecos.push(hueco);
    if (hueco < 15 || hueco > 30) mal(`entre ${conVoz[i - 1].id} y ${conVoz[i].id} hay ${hueco} f (${(hueco / fps).toFixed(2)} s): entre 15 y 30`);
  }
  // Los acentos caen en lo que se incluye (decisión de esta pieza, en `subtitulos-047.ts`).
  const acentos = bloques.flatMap((b) => b.trozos.filter((t) => t.estilo === "acento").map((t) => t.texto.toLowerCase()));
  const ESPERADOS = [/m[aá]s valioso/, /\$14\.800\.000/, /pensadas para ti/, /amenidades/, /personalizado/, /conocer/];
  ESPERADOS.forEach((re) => {
    if (!acentos.some((a) => re.test(a))) mal(`falta el acento ${re}: los acentos son ${acentos.join(" · ")}`);
  });
  if (fallos.length === n) ok(`todas las entradas con disolvencia · todo a ×1 · pausas de ${huecos.join(" · ")} f entre una frase y la siguiente · acentos: ${acentos.join(" · ")}`);
}

/* 3 · la voz de las tomas ───────────────────────────────────────────────── */
seccion("3. la voz de las tomas a cámara");
{
  const n = fallos.length;
  const ganancias = [];
  cortes.forEach((c, i) => {
    if (!c.audio || !c.voz) return;
    if (!existsSync(join(PUBLICO, c.audio))) return mal(`${c.id}: no existe remotion/public/${c.audio} (node proyectos/047/normalizar.mjs)`);
    // La voz que suena es la TRATADA (−15 LUFS sin saturar, pedido del usuario): apuntar al WAV crudo (`hk04.wav`) la dejaba a −22 LUFS en el render y esta puerta no lo veía.
    if (!/-voz\.wav$/.test(c.audio)) return mal(`${c.id}: \`audio\` es ${c.audio}; tiene que ser el WAV TRATADO (<toma>-voz.wav): el crudo suena a −22 LUFS y no a −15`);
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

/* 4 · la música, sin golpes: lecho y caída ─────────────────────────────── */
seccion("4. la música: «Dreamlife», lecho y caída: arranca en el f0, la caída cae donde entra el CTA y se apaga bajo la tarjeta");
const ventanasDeVoz = conVoz.filter((c) => c.voz).map((c) => ({ id: c.id, ...vozDe(c) }));
{
  const n = fallos.length;
  for (const a of T.revisaAudio(A.audio047, { fps, duracion: DURACION })) mal(`revisaAudio: ${a}`);
  for (const t of A.audio047) {
    if (!existsSync(join(PUBLICO, t.src))) {
      mal(`${t.id}: no existe remotion/public/${t.src}`);
      continue;
    }
    const hasta = (Math.round((t.desde ?? 0) * fps) + t.dur) / fps;
    const dura = duracionDe(t.src);
    if (hasta > dura + 1 / fps) mal(`${t.id}: se lee hasta ${hasta.toFixed(2)} s y ${t.src} dura ${dura.toFixed(2)} s`);
  }
  const musica = A.audio047.find((t) => t.id === "musica");
  const cta = byId("c04-cta");
  if (!musica || musica.src !== "recorrido-047/musica-047.wav") mal("no suena «Dreamlife» (recorrido-047/musica-047.wav)");
  else {
    if (Math.abs(musica.desde - M.INICIO_MUSICA) > 1e-9) mal(`la música arranca en ${musica.desde} s y INICIO_MUSICA dice ${M.INICIO_MUSICA}`);
    // Una sola canción, del frame 0 hasta FIN_MUSICA_047: se apaga con curva tras la última palabra del CTA y llega a cero 2 f antes del final de la pieza (la tarjeta va en silencio).
    if (musica.en !== 0 || musica.dur !== M.FIN_MUSICA_047) mal(`la música ocupa f${musica.en}-${musica.en + musica.dur} y tiene que ir de 0 a FIN_MUSICA_047 (f${M.FIN_MUSICA_047})`);
    if (M.FIN_MUSICA_047 !== DURACION - 2) mal(`la música acaba en f${M.FIN_MUSICA_047} y la pieza en f${DURACION}: tiene que acabar 2 f antes`);
    const g = Array.isArray(musica.ganancia) ? musica.ganancia : [];
    const ultimoPunto = g.at(-1);
    if (!ultimoPunto || ultimoPunto[0] !== M.FIN_MUSICA_047 || ultimoPunto[1] !== 0) mal(`la envolvente de la música no acaba en silencio en f${M.FIN_MUSICA_047}`);
    // Entra EN el f0, con un fundido corto (no hay golpe donde entrar: un arranque a pelo en mitad de un lecho de cuerdas daría un clic).
    if (T.volumenDe(musica, 0) !== 0) mal(`la música no arranca en silencio en el f0 (×${T.volumenDe(musica, 0).toFixed(3)}): el fundido de entrada evita el clic`);
    const lecho = Math.pow(10, A.DB_LECHO / 20);
    if (T.volumenDe(musica, A.FADE_ENTRADA) < lecho * 0.98) mal(`la música no ha llegado a su nivel en el f${A.FADE_ENTRADA}`);
    // LA CAÍDA de la canción (217,3 s) cae donde entra el CTA (±4 f): la voz de Isabella queda a solas sobre ella.
    const caidaF = M.frameDeCancion(M.CAIDA_CANCION);
    if (Math.abs(caidaF - cta.en) > 4) mal(`la caída de la canción suena en f${caidaF.toFixed(1)} y el CTA entra en f${cta.en}: la voz de Isabella tiene que quedar a solas sobre la caída (±4 f)`);
    const ultimaPalabra = vozDe(cta).fin;
    const nivelFin = T.volumenDe(musica, DURACION - 1 - musica.en);
    const nivelUltima = T.volumenDe(musica, ultimaPalabra - musica.en);
    if (!(nivelUltima > 0 && nivelFin < nivelUltima * 0.05)) mal(`la música no se apaga tras la última palabra del CTA (f${ultimaPalabra}): ×${nivelUltima.toFixed(3)} → ×${nivelFin.toFixed(3)} al final`);
  }
  if (fallos.length === n) {
    ok(`«Dreamlife» desde el ${M.INICIO_MUSICA.toFixed(3)} s, una sola canción · entra en el f0 con un fundido de ${A.FADE_ENTRADA} f · la caída (217,3 s → f${M.frameDeCancion(M.CAIDA_CANCION).toFixed(1)}) cae donde entra el CTA (f${byId("c04-cta").en}) · se apaga bajo la tarjeta`);
  }
}

/* 4b · la música va bajo la voz ─────────────────────────────────────────── */
seccion("4b. la música va ≥ 9 LU bajo la voz en todo su recorrido, y bajo el CTA sigue la caída");
{
  const n = fallos.length;
  const musica = A.audio047.find((t) => t.id === "musica");
  const nivel = (f) => T.volumenDe(musica, f - musica.en);
  // La sonoridad MOMENTÁNEA de la canción (ebur128 a 1 s sobre la fuente, `lufs-rangos.py`/`lufs-caida.py`) × la ganancia de cada frame tiene que quedar ≥ 9 LU bajo la voz (−15 LUFS) en CADA frame de voz.
  const MOMENTANEA = [[0, -11.5], [202.0, -11.5], [202.3, -10.1], [217.0, -10.1], [217.4, -12], [218, -14.5], [219, -16.6], [220, -18.1], [221, -21.2], [222, -22.8], [223, -25.0], [224, -28.2], [225, -30.2], [226, -35.1], [240, -90]];
  const enCancion = (f) => M.INICIO_MUSICA + f / fps - M.RETARDO_AUDIO;
  const lufsCancion = (t) => {
    for (let i = 1; i < MOMENTANEA.length; i++) if (t <= MOMENTANEA[i][0]) { const [t0, l0] = MOMENTANEA[i - 1]; const [t1, l1] = MOMENTANEA[i]; return l0 + ((l1 - l0) * (t - t0)) / (t1 - t0); }
    return -90;
  };
  let techo = -Infinity;
  let dondeTecho = 0;
  for (const v of ventanasDeVoz) {
    for (let f = v.ini; f <= v.fin; f++) {
      const g = nivel(f);
      if (g <= 0) continue;
      const l = lufsCancion(enCancion(f)) + 20 * Math.log10(g);
      if (l > techo) { techo = l; dondeTecho = f; }
    }
  }
  const bajoVoz = M.OBJETIVO_LUFS - techo;
  if (bajoVoz < 9) mal(`bajo la voz la música llega a ${techo.toFixed(1)} LUFS (f${dondeTecho}), ${bajoVoz.toFixed(1)} LU bajo ella (${M.OBJETIVO_LUFS}); tiene que ser ≥ 9 LU en TODO su recorrido`);
  // Los puntos de la caída, uno a uno: la ganancia sube conforme la canción baja y nunca deja la música a menos de 9 LU de la voz (ya medido arriba), ni por encima del archivo (×1).
  for (const [f, gdb] of A.CAIDA.map(([t, db]) => [Math.round(M.frameDeCancion(t)), db])) {
    if (gdb > 0) mal(`la caída sube la música por encima del archivo (${gdb} dB en f${f})`);
  }
  if (fallos.length === n) ok(`la música va como lecho a ${A.DB_LECHO} dB sobre el archivo (≈ ${A.LUFS_MUSICA_BAJO_VOZ} LUFS) y bajo el CTA sigue la caída: ${techo.toFixed(1)} LUFS como mucho (f${dondeTecho}), ${bajoVoz.toFixed(1)} LU bajo la voz en todo su recorrido`);
}

/* 5 · subtítulos ────────────────────────────────────────────────────────── */
seccion("5. subtítulos editoriales");
{
  const n = fallos.length;
  if (E.modoTextoDe(CANAL) !== "editorial") mal(`el canal está en modo «${E.modoTextoDe(CANAL)}»: esta pieza monta subtítulos editoriales`);
  const letra = E.letraSubtitulosDe(CANAL);
  const acentoMenos = puerta.modulos.subtitulos.ACENTO_MENOS_047;
  for (const a of E.revisaSubtitulosEditoriales(bloques, { fps, ancho: 1080, alto: 1920, duracion: DURACION, letra, acentoMenos })) mal(`revisaSubtitulosEditoriales: ${a}`);
  // La cursiva, 8 px más pequeña (como en las versiones de Los Patios): la constante, que la composición se la pase al componente, y el efecto medido en el motor.
  const vistaCuadro = { ancho: 1080, alto: 1920 };
  if (acentoMenos !== ACENTO_MENOS_PEDIDO) mal(`ACENTO_MENOS_047 = ${acentoMenos} y el canal pide ${ACENTO_MENOS_PEDIDO} px menos en la cursiva`);
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
  const fuenteComp = readFileSync(join(RAIZ, "remotion", "src", "proyectos", "047", "Recorrido047.tsx"), "utf8");
  const mOp = /export const OPACIDAD_SUBTITULOS\s*=\s*([0-9.]+)/.exec(fuenteComp);
  if (!mOp || Math.abs(Number(mOp[1]) - OPACIDAD_PEDIDA) > 1e-9) mal(`OPACIDAD_SUBTITULOS = ${mOp ? mOp[1] : "?"} y el canal pide ${OPACIDAD_PEDIDA}`);
  if (!/<SubtitulosEditoriales\b[^>]*\bacentoMenos=\{ACENTO_MENOS_047\}/.test(fuenteComp)) mal("la composición no le pasa `acentoMenos={ACENTO_MENOS_047}` a <SubtitulosEditoriales>: la cursiva saldría a su tamaño de siempre");
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
  // La única cifra de la pieza («$14.800.000») va como ACENTO en el bloque 4 (sección 2a): ningún dato grande al centro.
  for (const b of bloques) if (b.trozos.some((t) => t.estilo === "dato")) mal(`[${b.id}] lleva un dato grande: la cifra de esta pieza va como acento y con la voz de MD04`);
  const b3 = cortes.filter((c) => c.bloque === 3);
  const ini3 = b3.length ? b3[0].en : 0;
  const fin3 = b3.length ? b3.at(-1).en + b3.at(-1).dur : 0;
  for (const b of bloques) {
    if (!b.trozos.some((t) => t.estilo === "dato")) continue;
    const ini = b.trozos[0].desde;
    if (ini < ini3 || b.hasta > fin3) mal(`[${b.id}] lleva un dato y va de f${ini} a f${b.hasta}; el bloque 3 va de f${ini3} a f${fin3} y el dato solo va ahí (viaje-emocional.md §9)`);
  }
  const acentos = bloques.reduce((s, b) => s + b.trozos.filter((t) => t.estilo === "acento").length, 0);
  if (fallos.length === n) ok(`${bloques.length} bloques, ${acentos} acentos · validador sin avisos con las letras del canal · todo lo de Isabella abajo, a ${OPACIDAD_PEDIDA * 100} % · la cursiva ${ACENTO_MENOS_PEDIDO} px menor (${cursiva}) · una sola cifra (como acento) y ningún dato grande`);
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
  // Un plan de otra versión puede vivir SIN commit en otro worktree del estudio (el 030): se busca en esta raíz, en los worktrees hermanos (`.claude/worktrees/*`) y en el checkout principal.
  const buscaPlan = (rel) => {
    const candidatos = [join(RAIZ, rel)];
    const hermanos = join(RAIZ, "..");
    if (existsSync(hermanos)) for (const d of readdirSync(hermanos)) candidatos.push(join(hermanos, d, rel));
    candidatos.push(join(RAIZ, "..", "..", "..", rel));
    return candidatos.find((r) => existsSync(r)) ?? null;
  };
  for (const v of VERSIONES_ANTERIORES) {
    const ruta = buscaPlan(v.plan);
    if (!ruta) {
      console.log(`  ℹ️  no hay ${v.plan} (ni aquí ni en los worktrees hermanos): nada que comparar con ${v.nombre}`);
      continue;
    }
    if (ruta !== join(RAIZ, v.plan)) console.log(`  ℹ️  ${v.nombre}: su plan está en ${ruta.replace(join(RAIZ, ".."), "…")}`);
    let suyos;
    try {
      const otra = await cargaTs({ v: ruta });
      suyos = tramosOpacos(otra.v[v.cortes]);
    } catch (e) {
      console.log(`  ℹ️  el plan de ${v.nombre} aún no carga (${String(e.message).split("\n")[0].slice(0, 80)}): nada que comparar`);
      continue;
    }
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
  const carpetas = [join(RAIZ, "remotion", "src", "proyectos", "047"), join(RAIZ, "proyectos", "047", "voz")];
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

puerta.cierra(`el 047 pasa la puerta: ${cortes.length} planos, ${bloques.length} bloques de texto, ${A.audio047.length} tramos de audio`);
