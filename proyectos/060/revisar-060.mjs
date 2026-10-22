#!/usr/bin/env node
/**
 * PUERTA DEL 060 — recorrido con presentadora, «TU PLATA EN EL BANCO PIERDE VALOR» (V42, Apartaestudio Quadrato, Laureles, Medellín).
 *
 *   node proyectos/060/revisar-060.mjs            (avisa de lo «por confirmar»)
 *   node proyectos/060/revisar-060.mjs --final    (lo «por confirmar» FALLA)
 *
 * Las comprobaciones del FORMATO salen de `revisar-metraje.mjs` (línea de tiempo, metraje, tramos, encuadre). Encima, lo que el recorrido de seis bloques
 * promete y ningún frame enseña (aquí sin voz en off: los dos recorridos van mudos, solo con la música):
 *
 *   2. la ESTRUCTURA: los bloques en orden (1 rooftop · 2 hook · 3 recorrido · 4 mitad · 5 recorrido · 6 CTA y cierre), el rooftop en el frame 0 (solo, a corte, sin voz), Isabella tres veces, la vista
 *      antes del CTA y el total dentro del tope.
 *   2a. Isabella en tres tomas distintas (misma habitación —es un estudio de 24 m²—, tres poses y tres fondos) y las CIFRAS en pantalla = las que ella dice (24, 0,5 %, 1 %): ni una más.
 *   2b. las REGLAS FIJAS del canal: la primera toma sin texto ni voz, sin texto arriba ni cuenta `@…`, nunca el sello.
 *   2c. el CIERRE (`cierre-060.ts`): nada se congela, tarjeta oscura con el logo (440 px, 60 %) y la web.
 *   2d. el COLOR de cada plano (R32), con los topes del canal.
 *   2e. el CTA: CT03, «escríbeme» con el acento, sin precio ni cifras que ella no diga.
 *   2f. EL ÁNGULO: el acento de cada bloque cae en «dólares», «te muestro cómo» y «escríbeme»; los porcentajes que dice Isabella (0,5 % y 1 %) solo viven en los subtítulos de la mitad (la transcriben, sin acento);
 *       la rentabilidad ESCRITA es solo la infografía (2g); ningún plano a otra velocidad; las entradas son las del plan (3 disolvencias y 6 cortes secos, todos en golpes medidos); el rooftop abre y cierra el recorrido.
 *   2g. la INFOGRAFÍA de la rentabilidad estimada (encargo del usuario, 2026-10-22): las cifras y los nombres son los suyos, la cuenta cuadra, cada elemento cae en un golpe medido, nada sale de la zona
 *       segura (y 570-1350, cada panel centrado en y 960), ningún texto se desborda, un solo héroe a la vez y empieza tras la última palabra de la mitad y acaba antes de la disolvencia al CTA.
 *   3. la VOZ de las tres tomas: su WAV tratado a −15 LUFS en su frase, pico real ≤ −1 dBTP, silencio fuera de ella, ninguna palabra en un fundido.
 *   4. el AUDIO entero (`revisaAudio`) y la MÚSICA: cada plano entra en un golpe MEDIDO de «Street Level Sessions on the Green» (≥ 13 dB) a ≤ 1 f, golpe en el frame 0-4, la canción apagada con curva bajo la tarjeta.
 *   4b. la música BAJA antes de la primera palabra de cada toma (con curva, tras el golpe de su entrada) y SUBE tras la última (en la mitad, 6 f de aire: el golpe suena a ≥ 80 % de su nivel).
 *   5. los SUBTÍTULOS: su validador sin un aviso, con las letras del canal; cada trozo dentro de una ventana de voz.
 *   7b. el METRAJE que comparte con las demás versiones del apartaestudio (061, 062; informa).
 *
 * Carga los módulos TypeScript DE VERDAD (`abrePuerta` → esbuild): lo que mide es lo que se renderiza. Sale con 1 si algo falla.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ejecutar } from "../../herramientas/comun.mjs";
import { abrePuerta, cargaTs, duracionDe, PUBLICO, RAIZ } from "../../remotion/src/motor/metraje/revisar-metraje.mjs";

/**
 * Los bloques de ESTA pieza: los seis (aérea · hook · recorrido · mitad · recorrido · CTA).
 * La pieza ABRE con el rooftop con el jacuzzi y la ciudad (ZC07, sin texto ni voz; no hay dron en este rodaje) e Isabella entra DISOLVIENDO en un golpe de la música, como manda la regla fija del canal (SKILL.md §0.1): esta pieza NO rompe esa regla.
 */
const ABRE_CON_EL_HOOK = false;
const BLOQUES = ABRE_CON_EL_HOOK ? [2, 3, 4, 5, 6] : [1, 2, 3, 4, 5, 6];
/** Los bloques en los que Isabella habla a cámara. */
const DE_ELLA = [2, 4, 6];

const TECHO_ZOOM = 1.2; // clips normalizados a 1296 px = 1080 × 1,2
const TOPE_SEGUNDOS = 55; // el formato apunta a 45-50 s; pasado de aquí ya es otra pieza (rev. 2: 54,7 s con la infografía de 14 s)
const MARGEN_FUNDIDO = 2; // f entre la última palabra y el inicio de la disolvencia del siguiente
const COLA_FINAL = [45, 120]; // f desde la última palabra del CTA hasta el final (lo que le queda de toma + la tarjeta): la web se lee, sin quedarse muerto
const TARJETA_FRAMES = [45, 75]; // f que dura la tarjeta oscura del cierre (1,5-2,5 s)
const HOLGURA_TROZO = 3; // f que un trozo puede adelantarse a su palabra
const TOLERANCIA_GOLPE = 1; // f entre el `en` de un plano y el frame en que suena el golpe de la canción en que entra
/** El `en` del hook cae 4 f DESPUÉS de su golpe (la disolvencia lo cruza al 67 %): la primera sílaba de HK03 suena a los 7,2 f del `en` y la bajada de la música (10 f) tiene que acabar antes. Declarado en `metraje-060.ts`. */
const DESFASE_GOLPE = { "c02-hook": 4 };
/** El corte a la vista cae en un golpe de 10,7 dB: es el más fuerte que tiene la canción entre los 195 y los 205 s con la infografía de 14 s (los otros, de 12,8 y 13,4 dB, la alargarían a 15,3-15,9 s y la pieza pasaría de 55 s). Declarado en `metraje-060.ts`. */
const MINIMO_DECLARADO = { "c09-vista": 10.5 };
const FUERZA_MIN_CORTE_SECO = 13; // dB por 15 ms: un corte seco cae en un golpe de al menos esto (la canción es un lo-fi sin pulso estable, con golpes de 11-25 dB: el plan usa 14,5-23,6)
const FUERZA_MIN_DISOLVER = 13; // dB: la disolvencia ACABA (o cruza) un golpe; que sea de los fuertes (el del hook mide 15,5, el de la mitad 13,5 y el del CTA 18,4)
const ACENTO_MENOS_PEDIDO = 8; // px que se le restan a la cursiva (el 017 lo pidió así y las versiones del canal lo comparten)
const OPACIDAD_PEDIDA = 0.9;
const PICO_MAX_MUSICA = -1; // dBFS: el pico de la canción, con la ganancia de cada tramo, no pasa de aquí

/**
 * Las OTRAS versiones de la misma casa (otra canción, otro hook…), para la sección 7b: cuánto metraje comparte esta con cada
 * una. `{ nombre, plan, cortes }`: el `metraje-NNN.ts` de aquella (ruta desde la raíz del repo) y el nombre de su export.
 * La 061 y la 062 son las otras dos sesiones de ESTE apartaestudio (reparto 054-062): comparten el checkout y sus planos pueden estar a medias; si no cargan, la puerta lo dice y sigue. (Ojo: se compara SOLO con la
 * misma propiedad. Los códigos de clip chocan entre propiedades —`rc01.mp4` de una no es `rc01.mp4` de la otra— y daría falsos «metraje compartido».)
 */
const VERSIONES_ANTERIORES = [
  // Las otras dos sesiones de ESTE apartaestudio (reparto 054-062): sus planos viven en este mismo checkout y pueden estar a medias; la puerta lo cuenta pero no falla por ellos.
  { nombre: "la V43 (061)", plan: "remotion/src/proyectos/061/metraje-061.ts", cortes: "metraje061" },
  { nombre: "la V44 (062)", plan: "remotion/src/proyectos/062/metraje-062.ts", cortes: "metraje062" },
];

/**
 * Bloques de subtítulos que NO acompañan a una palabra dicha, y por qué. Una excepción que sobra (el bloque ya no existe, o todos sus trozos caen sobre voz) tumba la puerta.
 */
const SIN_VOZ = {};

// Un plan que no carga (un corte con voz y velocidad distinta de 1, un import
// roto) no deja una traza: dice qué pasa y sale con 1.
const puerta = await abrePuerta({
  proyecto: "060",
  plan: "remotion/src/proyectos/060/metraje-060.ts",
  cortes: "metraje060",
  receta: "node proyectos/060/normalizar.mjs",
  extras: {
    audio: "remotion/src/proyectos/060/audio-060.ts",
    subtitulos: "remotion/src/proyectos/060/subtitulos-060.ts",
    tramos: "remotion/src/motor/sound/tramos.ts",
    editorial: "remotion/src/motor/subtitulos-editoriales.ts",
    marca: "remotion/src/marcas/luxur.ts",
    cierre: "remotion/src/proyectos/060/cierre-060.ts",
    infografia: "remotion/src/proyectos/060/infografia-060.ts",
  },
}).catch((e) => {
  console.log(`\n❌ el plan del 060 no carga: ${e.message}\n`);
  process.exit(1);
});
const { cortes, fps, fallos, mal, ok, seccion } = puerta;
const M = puerta.plan;
const F = puerta.modulos.formato;
const A = puerta.modulos.audio;
const T = puerta.modulos.tramos;
const E = puerta.modulos.editorial;
const bloques = puerta.modulos.subtitulos.subtitulos060;
const DURACION = M.DURACION_060;
const byId = (id) => {
  const c = cortes.find((x) => x.id === id);
  if (!c) throw new Error(`falta el plano ${id} en metraje-060.ts`);
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
seccion("2. la estructura del recorrido");
{
  const n = fallos.length;
  const primero = cortes[0];
  if (ABRE_CON_EL_HOOK) {
    if (primero.id !== "c02-hook") mal(`${primero.id}: con ABRE_CON_EL_HOOK el primer plano es c02-hook`);
    if (cortes.some((c) => c.bloque === 1)) mal("hay un plano del bloque 1: con ABRE_CON_EL_HOOK la pieza no lleva «casa» al principio");
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
    if (!deElla && c.audio) mal(`${c.id}: bloque ${c.bloque} con \`audio\`; en los recorridos la voz es en off y va en audio-060.ts`);
    if (c.audio && !c.voz) mal(`${c.id}: tiene \`audio\` pero no \`voz\` (s0, s1, lufs medidos con limites-voz.py)`);
    // El viaje emocional (viaje-emocional.md) casi no se puede medir; esto es lo
    // poco que sí: un plano sin razón sobra, y solo se acelera la aproximación.
    if (!c.reason || c.reason.trim().length < 15) mal(`${c.id}: sin \`reason\`; cada plano dice qué hace ahí (situar, revelar, mover, emocionar…) o sobra (viaje-emocional.md §4)`);
    if ((c.velocidad ?? 1) !== 1 && c.bloque !== 3) mal(`${c.id}: velocidad ${c.velocidad} en el bloque ${c.bloque}; solo se acelera la aproximación (bloque 3), nunca la intimidad ni la recompensa (viaje-emocional.md §6)`);
  });
  // La recompensa se mira: la vista (el último plano del último recorrido) no
  // dura menos que los planos de intimidad que la preceden en su bloque.
  const ultimoRecorrido = cortes.filter((c) => c.bloque === BLOQUES.at(-2));
  const vista = ultimoRecorrido.at(-1);
  const masLargo = vista && ultimoRecorrido.find((c) => c.dur > vista.dur);
  if (masLargo) mal(`${vista.id} (${vista.dur} f) es el clímax y ${masLargo.id} dura más (${masLargo.dur} f); la vista es el plano más largo de su bloque (viaje-emocional.md §1)`);
  for (const b of BLOQUES) if (!cortes.some((c) => c.bloque === b)) mal(`falta el bloque ${b}`);
  const ultimo = cortes.at(-1);
  if (ultimo.bloque !== BLOQUES.at(-1)) mal(`${ultimo.id}: la pieza acaba en el bloque ${ultimo.bloque}; cierra Isabella con el CTA (bloque ${BLOQUES.at(-1)})`);
  const antesDelCta = cortes.filter((c) => c.bloque < BLOQUES.at(-1)).at(-1);
  if (antesDelCta && antesDelCta.bloque !== BLOQUES.at(-2)) {
    mal(`${antesDelCta.id}: el plano anterior al CTA es del bloque ${antesDelCta.bloque}; tiene que ser el último recorrido (bloque ${BLOQUES.at(-2)}: la vista)`);
  }
  // Isabella, una vez por bloque suyo y cada vez en un sitio: si el guion pide
  // dos tomas en un bloque (una objeción por toma), se sube este número a sabiendas.
  const veces = DE_ELLA.filter((b) => BLOQUES.includes(b)).length;
  if (conVoz.length !== veces) mal(`Isabella sale ${conVoz.length} veces a cámara; con los bloques ${BLOQUES.join(", ")} son ${veces}`);
  if (DURACION / fps > TOPE_SEGUNDOS) mal(`${(DURACION / fps).toFixed(1)} s: el formato no pasa de ${TOPE_SEGUNDOS} s`);
  if (fallos.length === n) {
    const porBloque = BLOQUES.map((b) => {
      const suyos = cortes.filter((c) => c.bloque === b);
      return `b${b} ${(suyos.reduce((s, c) => s + c.dur, 0) / fps).toFixed(1)} s`;
    });
    ok(`${cortes.length} planos · ${(DURACION / fps).toFixed(1)} s · ${porBloque.join(" · ")} · Isabella ${conVoz.length} veces · todos con razón · la vista, el plano más largo de su bloque`);
  }
}

/* 2a · las tres tomas de Isabella y las cifras en pantalla ──────────────────── */
seccion("2a. las tres tomas de Isabella (el mismo estudio, tres poses y tres fondos) y las cifras en pantalla: solo las que ella dice");
{
  const n = fallos.length;
  // El `LUGAR` de cada toma. Es un ESTUDIO de 24 m²: las tres tomas están en la misma habitación, así que lo que las distingue es la pose y el fondo. El hook, DE PIE con el balcón y la mesa de madera al fondo; la mitad, DE PIE
  // entre la estantería blanca y la cocina con la cama de primer término, caminando hacia la cámara; el CTA, SENTADA en la silla de madera junto al escritorio con la cocina detrás. Se declara en `combinaciones.md`.
  const LUGAR = {
    "c02-hook": { pose: "DE-PIE", fondo: "BALCON-Y-MESA-DE-MADERA" },
    "c06-mitad": { pose: "DE-PIE-CAMINANDO", fondo: "ESTANTERIA-Y-COCINA-CON-LA-CAMA-DELANTE" },
    "c10-cta": { pose: "SENTADA", fondo: "ESCRITORIO-Y-COCINA" },
  };
  const tomas = conVoz.map((c) => ({ id: c.id, ...(LUGAR[c.id] ?? {}) }));
  for (const x of tomas) if (!x.pose) mal(`${x.id}: sin LUGAR en la puerta (revisar-060.mjs): dice dónde está ella`);
  const nombres = tomas.map((x) => `${x.pose}/${x.fondo}`);
  if (new Set(nombres).size !== tomas.length) mal(`Isabella repite fondo Y pose: ${nombres.join(" · ")}`);
  if (new Set(tomas.map((x) => x.fondo)).size !== tomas.length) mal(`dos tomas de Isabella con el mismo fondo: ${nombres.join(" · ")}`);
  if (new Set(tomas.map((x) => x.pose)).size < 2) mal(`las tres tomas con la misma pose (${tomas.map((x) => x.pose).join(" · ")}): el hook, la mitad y el CTA no pueden ser la misma imagen`);
  // «Cifra dicha = cifra escrita» (reparto 054-062): las cifras de la pantalla son las que ELLA dice (24 · 0,5 · 1) y ninguna más (ni la ficha —24 m², 1 alcoba— ni el precio van en el reel).
  const dicen = conVoz.map((c) => c.voz.dice).join(" ");
  const enPantalla = bloques.flatMap((b) => b.trozos.flatMap((t) => (t.texto.match(/\d+(?:,\d+)?/g) ?? []).map((d) => ({ d, donde: `${b.id} «${t.texto}»` }))));
  const dichas = new Set(dicen.match(/\d+(?:,\d+)?/g) ?? []);
  for (const x of enPantalla) if (!dichas.has(x.d)) mal(`hay una cifra en pantalla que ella no dice: ${x.donde} (lo que dice lleva ${[...dichas].join(", ")})`);
  for (const d of dichas) if (!enPantalla.some((x) => x.d === d)) mal(`ella dice la cifra ${d} y no está escrita: cifra dicha = cifra escrita (R33)`);
  if (/millones|\bm²|precio|cuesta|\bvale\b|COP|\$/i.test(bloques.flatMap((b) => b.trozos.map((t) => t.texto)).join(" "))) mal("hay un precio o un área en los subtítulos: el precio va a la versión con ficha y al caption");
  if (fallos.length === n) ok(`${nombres.join(" → ")}: el mismo estudio, tres poses y tres fondos · en pantalla solo las cifras que ella dice (${[...dichas].join(" · ")}) · ni ficha ni precio en el reel`);
}

/* 2b · las reglas fijas del canal ───────────────────────────────────────── */
seccion("2b. reglas fijas del canal: la primera toma sin texto, nunca el sello ni la cuenta");
{
  const n = fallos.length;
  const primera = cortes[0];
  // La primera toma se ve hasta que la imagen de Isabella es opaca (su `en`): hasta entonces, ni texto ni voz.
  const hook = conVoz[0];
  if (!hook) mal("ninguna toma lleva voz: no hay hook de Isabella");
  else if (bloques.length === 0) mal("no hay ningún subtítulo");
  else if (ABRE_CON_EL_HOOK) {
    // El hook ES el frame 0, a corte: su primera palabra suena DESPUÉS del golpe de apertura de la música (que tiene que sonar entero) y ≥ DESCLIC_VOZ f tras el corte.
    const apertura = M.golpeExacto(M.GOLPE.apertura.t);
    if (hook.en !== 0 || (hook.entra ?? "corte") !== "corte") mal(`${hook.id}: con ABRE_CON_EL_HOOK entra a corte en el f0`);
    if (vozDe(hook).ini < hook.en + T.DESCLIC_VOZ) mal(`${hook.id} entra a corte en f${hook.en} y su primera palabra suena en f${vozDe(hook).ini}: tiene que ser ≥ f${hook.en + T.DESCLIC_VOZ}`);
    // REVISIÓN 1 (pedido: «que empiece 6 s después pero corriendo el audio para que suene desde el principio»): el golpe de entrada de la canción cae donde empieza el paseo; entre la última palabra del hook y ese golpe tiene que haber ≥ 12 f para que la música suba.
    if (apertura - vozDe(hook).fin < 12) mal(`la canción entra en f${apertura.toFixed(1)} y la última palabra del hook acaba en f${vozDe(hook).fin}: tiene que haber ≥ 12 f de aire`);
  } else {
    const primerTexto = Math.min(...bloques.map((b) => b.trozos[0].desde));
    if (primerTexto <= 0) mal(`el primer bloque de texto entra en el frame ${primerTexto}: la miniatura (frame 0) tiene que salir sin texto`);
    if (primerTexto < hook.en) mal(`el primer texto entra en f${primerTexto}, antes de que acabe la primera toma (la imagen de Isabella es opaca en f${hook.en}): la primera toma sale SIEMPRE sin texto`);
    if (vozDe(hook).ini < hook.en + 1) mal(`${hook.id} empieza a hablar en f${vozDe(hook).ini} y su imagen no es opaca hasta f${hook.en}: la primera toma sale sin voz`);
  }
  const hayArriba = bloques.filter((b) => b.posicion === "arriba");
  if (hayArriba.length) mal(`hay texto arriba (${hayArriba.map((b) => b.id).join(", ")}): ni hook escrito ni cuenta; arriba no hay nada`);
  if (bloques.some((b) => b.trozos.some((t) => /@/.test(t.texto)))) mal("hay una cuenta de texto (@…) en los subtítulos: el cierre lleva el logo y la web, no la cuenta");
  // NUNCA el sello «PROPIEDADES LUXUR»: ni se importa ni se monta ni se escribe a mano.
  const fuente = readFileSync(join(RAIZ, "remotion", "src", "proyectos", "060", "Recorrido060.tsx"), "utf8");
  const sinComentarios = fuente.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
  if (/SelloCampana/.test(sinComentarios)) mal("la composición usa `SelloCampana`: el sello «PROPIEDADES LUXUR» no se pone NUNCA");
  if (/PROPIEDADES LUXUR/.test(sinComentarios)) mal("la composición escribe «PROPIEDADES LUXUR» a mano: el sello no se pone NUNCA");
  if (fallos.length === n) {
    ok(ABRE_CON_EL_HOOK ? `la pieza ABRE con el hook (excepción declarada, pedido del usuario): su primer subtítulo entra en f${bloques[0].trozos[0].desde}, con su voz · nada arriba y ninguna cuenta · sin sello (no se usa \`SelloCampana\`)` : `la primera toma (${primera.id}, f0-${hook ? hook.en : "?"}) sale SIN texto ni voz · nada arriba y ninguna cuenta · sin sello (no se usa \`SelloCampana\`)`);
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
  const fuente = readFileSync(join(RAIZ, "remotion", "src", "proyectos", "060", "Recorrido060.tsx"), "utf8");
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
  if (tarjeta.dur !== CI.DUR_TARJETA) mal(`${tarjeta.id} dura ${tarjeta.dur} f y cierre-060.ts dice ${CI.DUR_TARJETA}`);
  if (tarjeta.dur < TARJETA_FRAMES[0] || tarjeta.dur > TARJETA_FRAMES[1]) mal(`la tarjeta dura ${tarjeta.dur} f (entre ${TARJETA_FRAMES[0]} y ${TARJETA_FRAMES[1]}): la web se lee, sin quedarse muerto`);
  const rutaTarjeta = join(PUBLICO, CI.TARJETA);
  if (!existsSync(rutaTarjeta)) mal(`no existe remotion/public/${CI.TARJETA} (node proyectos/060/normalizar.mjs)`);
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

/* 2e · el CTA: CT03, «escríbeme» con el acento ───────────────────────────────── */
seccion("2e. el CTA: CT03, «escríbeme» con el acento, sin precio ni cifras que ella no diga");
{
  const n = fallos.length;
  const cta = byId("c10-cta");
  if (cta.src !== "recorrido-060/ct03.mp4") mal(`${cta.id}: el CTA de esta pieza es CT03; es ${cta.src}`);
  if (!/escr[ií]beme/i.test(cta.voz.dice)) mal(`${cta.id}: dice «${cta.voz.dice}»; el CTA pide «escríbeme»`);
  // Los subtítulos del CTA transcriben lo que ella dice («haz clic en el enlace y escríbeme un mensaje»: el enlace es la web de la tarjeta). Ni precio, ni «agendemos», ni cuenta.
  const textoSubs = bloques.flatMap((b) => b.trozos.map((t) => t.texto)).join(" ");
  if (/agend|llam|whatsapp|disponible por|millones|precio|@/i.test(textoSubs)) mal("hay un subtítulo con otra acción, con «WhatsApp», con una cuenta o con el precio: el CTA es «escríbeme» y la ficha va al caption");
  if (!bloques.some((b) => b.trozos.some((t) => t.estilo === "acento" && /escr[ií]beme/i.test(t.texto)))) mal("la acción («escríbeme») no lleva el acento del CTA");
  // El clip no debe pedir más metraje del que tiene (llegar a su último fotograma está bien; pasarse congelaría el último).
  const dura = duracionDe(cta.src);
  if ((cta.desde ?? 0) + cta.dur / fps > dura + 1 / fps) mal(`${cta.id}: pide ${(((cta.desde ?? 0) + cta.dur / fps)).toFixed(2)} s de un clip de ${dura.toFixed(2)} s: se congelaría el último fotograma`);
  if (fallos.length === n) ok(`CT03 (voz ${cta.voz.s0}-${cta.voz.s1} s): «escríbeme» con su acento · sin precio ni cuenta · el plano usa ${(cta.desde ?? 0).toFixed(2)}-${((cta.desde ?? 0) + cta.dur / fps).toFixed(2)} de ${dura.toFixed(2)} s del clip y nada se congela`);
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
  const TOPES_COLOR = { vibrance: 0.05, exposure: 0.4, contrast: 1.15, highlightsMin: -0.6, saturation: [0.95, 1.12] }; // contrast 1,15: el tope del canal
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

/* 2f · el ángulo: la inversión · la rentabilidad solo en la voz · las entradas del plan · el rooftop abre y cierra ────────────── */
seccion("2f. el ángulo «Tu plata en el banco pierde valor»: el acento en «dólares», «te muestro cómo» y «escríbeme» · los porcentajes dichos solo en la mitad · 5 cortes secos y 6 disolvencias · todo a velocidad 1");
{
  const n = fallos.length;
  // El acento de cada bloque: lo que el estudio ya hace («dólares»), la invitación de la mitad («te muestro cómo») y la acción («escríbeme»). El 0,5 % y el 1 % NO llevan acento: son una afirmación de rentabilidad
  // que dice SU voz y los subtítulos solo la transcriben (en la línea base). La infografía (2g, encargo del usuario) enseña después cómo sale la rentabilidad con SUS cifras estimadas.
  const acentos = bloques.flatMap((b) => b.trozos.filter((t) => t.estilo === "acento").map((t) => t.texto.toLowerCase()));
  const ESPERADOS = [/^d[oó]lares\.?$/, /^te muestro c[oó]mo\.?$/, /^(y )?escr[ií]beme\.?$/];
  ESPERADOS.forEach((re) => {
    if (!acentos.some((a) => re.test(a))) mal(`falta el acento ${re}: los acentos son ${acentos.join(" · ")}`);
  });
  if (acentos.length !== ESPERADOS.length) mal(`hay ${acentos.length} acentos (${acentos.join(" · ")}) y esta pieza lleva ${ESPERADOS.length}: uno por toma de Isabella`);
  for (const a of acentos) if (/%|rentabilidad|\d/.test(a)) mal(`el acento «${a}» lleva la cifra o la palabra de la rentabilidad: la afirmación de rentabilidad la dice SU voz y no se convierte en titular`);
  // Los porcentajes dichos por Isabella (0,5 % y 1 %) solo en los bloques de SUBTÍTULOS de la MITAD (m*): ningún otro subtítulo los repite. (La infografía lleva la ocupación, 85 %, que es otra cifra: sección 2g.)
  for (const b of bloques) {
    const lleva = b.trozos.some((t) => /%/.test(t.texto));
    if (lleva && !/^m\d+$/.test(b.id)) mal(`[${b.id}] lleva un porcentaje fuera de la mitad: los porcentajes solo los transcribe la mitad (cifra dicha = cifra escrita) y no se repiten`);
  }
  if (!bloques.some((b) => /^m\d+$/.test(b.id) && b.trozos.some((t) => /0,5 %/.test(t.texto))) || !bloques.some((b) => b.trozos.some((t) => /1 %/.test(t.texto)))) mal("la mitad no transcribe el 0,5 % y el 1 % que ella dice: cifra dicha = cifra escrita");
  // Ningún plano a otra velocidad.
  for (const c of cortes) if ((c.velocidad ?? 1) !== 1) mal(`${c.id}: velocidad ${c.velocidad}; esta pieza va a velocidad 1`);
  // Las entradas (rev. 2): 6 disolvencias (el hook, la mitad, los tres planos de fondo de la infografía —se funden a un frame libre— y el CTA) y 5 cortes secos (el paseo, la cama y la vista, en un golpe medido). La tarjeta no cuenta.
  const secos = cortes.filter((c, i) => i > 0 && !esTarjeta(c) && (c.entra ?? "corte") === "corte").map((c) => c.id);
  const disuelven = cortes.filter((c) => c.entra === "disolver").map((c) => c.id);
  const SECOS = ["c03-bano", "c04-cocina", "c05-escritorio", "c07-cama", "c09-vista"];
  const DISUELVEN = ["c02-hook", "c06-mitad", "c08-tele", "c08b-sofa", "c08c-coworking", "c10-cta"];
  if (secos.join() !== SECOS.join()) mal(`los cortes secos son ${secos.join(", ")} y esta pieza lleva ${SECOS.join(", ")}`);
  if (disuelven.join() !== DISUELVEN.join()) mal(`las disolvencias son ${disuelven.join(", ")} y esta pieza lleva ${DISUELVEN.join(", ")}`);
  // NO HAY DRON en este rodaje: la apertura es el rooftop (ZC07-ZC29, `3 Zonas comunes/TERRAZA Y JACUZZI`) y la vista del bloque 5 también; que NO sean el mismo plano ni el mismo clip.
  const rooftop = (c) => /\/zc(0[7-9]|[12]\d)\.mp4$/.test(c.src);
  const abre = cortes[0];
  const vista = cortes.filter((c) => c.bloque === 5).at(-1);
  if (!rooftop(abre)) mal(`${abre.id}: la pieza abre con el rooftop (ZC07-ZC29) y es ${abre.src}`);
  if (!rooftop(vista)) mal(`${vista.id}: la vista del bloque 5 es el rooftop (ZC07-ZC29) y es ${vista.src}`);
  if (abre.src === vista.src) mal(`la apertura y la vista son el mismo clip (${abre.src}): tienen que ser planos distintos`);
  // El reparto: la apertura es «jacuzzi + ciudad» (la 061 abre con la pérgola y la 062 con la vista abierta de ZC29).
  if (!/zc07\.mp4$/.test(abre.src)) mal(`la apertura es ${abre.src}; la reclamada en la nota de coordinación es ZC07 (jacuzzi + ciudad)`);
  // El hilo de los recorridos, «lo que se alquila»: la cocina, el baño, el escritorio, la cama, el coworking.
  const hilo = { cocina: /rc05\.mp4$/, bano: /rc16\.mp4$/, escritorio: /rc09\.mp4$/, cama: /rc13\.mp4$/, coworking: /zc0[1-6]\.mp4$/ };
  for (const [nombre, re] of Object.entries(hilo)) if (!cortes.some((c) => re.test(c.src))) mal(`falta «${nombre}» en el hilo de lo que se alquila (${re})`);
  if (fallos.length === n) ok(`acentos: ${acentos.join(" · ")} · los porcentajes dichos solo en la mitad, en la línea base · disolvencias: ${disuelven.join(", ")} · cortes secos: ${secos.join(", ")} · el rooftop abre (${abre.src.split("/").pop()}) y cierra (${vista.src.split("/").pop()}) · ningún plano a otra velocidad`);
}

/* 2g · la infografía de la rentabilidad (encargo del usuario) ─────────────────── */
seccion("2g. la infografía de la rentabilidad estimada (encargo del usuario): cifras exactas, la cuenta cuadra, sin recuentos, una cifra cada ≥ 1,2 s, cada elemento en un golpe, dentro de la zona segura");
{
  const n = fallos.length;
  const I = puerta.modulos.infografia;
  // 1 · las cifras y los nombres del usuario, tal cual (la tabla que mandó el 2026-10-22).
  const CIFRAS = { tarifa: 190000, ocupacion: 85, noches: 25.5, ingresos: 4845000, administracion: 500000, servicios: 300000, gastos: 800000, utilidad: 4045000 };
  for (const [k, v] of Object.entries(CIFRAS)) if (I.CIFRAS[k] !== v) mal(`la cifra «${k}» es ${I.CIFRAS[k]} y el usuario dio ${v}`);
  const NOMBRES = {
    tarifa: "Tarifa neta promedio por noche",
    ocupacion: "Ocupación estimada",
    noches: "Noches promedio ocupadas",
    ingresos: "Ingresos mensuales",
    administracion: "Administración",
    servicios: "Servicios públicos",
    gastos: "Total gastos contemplados",
    utilidad: "Utilidad mensual estimada",
  };
  for (const [k, v] of Object.entries(NOMBRES)) if (I.ETIQUETAS[k] !== v) mal(`el nombre «${k}» es «${I.ETIQUETAS[k]}» y el usuario escribió «${v}»`);
  // 2 · la cuenta cuadra (30 noches al mes).
  const c = I.CIFRAS;
  if (Math.abs(c.noches - (c.ocupacion / 100) * 30) > 1e-9) mal(`las noches (${c.noches}) no son el ${c.ocupacion} % de 30`);
  if (Math.round(c.tarifa * c.noches) !== c.ingresos) mal(`${c.tarifa} × ${c.noches} = ${Math.round(c.tarifa * c.noches)} y los ingresos dicen ${c.ingresos}`);
  if (c.administracion + c.servicios !== c.gastos) mal(`${c.administracion} + ${c.servicios} = ${c.administracion + c.servicios} y el total de gastos dice ${c.gastos}`);
  if (c.ingresos - c.gastos !== c.utilidad) mal(`${c.ingresos} − ${c.gastos} = ${c.ingresos - c.gastos} y la utilidad dice ${c.utilidad}`);
  // 3 · el tiempo: empieza con el corte a la cama, DESPUÉS de la última palabra de la mitad; acaba antes de la disolvencia al CTA; no pisa ningún subtítulo.
  const mitad = byId("c06-mitad");
  const cama = byId("c07-cama");
  const vista = byId("c09-vista");
  const ctaP = byId("c10-cta");
  const F2 = I.F;
  if (F2.inicio !== cama.en) mal(`la infografía empieza en f${F2.inicio} y la cama (el primer plano del bloque 5) en f${cama.en}`);
  if (F2.inicio <= vozDe(mitad).fin) mal(`la infografía empieza en f${F2.inicio}, antes de que acabe de hablar Isabella (f${vozDe(mitad).fin}): tiene que ir DESPUÉS de «ven, te muestro cómo»`);
  if (F2.panel3 !== vista.en) mal(`el panel 3 (la utilidad) entra en f${F2.panel3} y la vista en f${vista.en}: el velo se va con el corte a la vista`);
  if (F2.fin > ctaP.en - F.solapeDe(ctaP) - 4) mal(`la infografía acaba en f${F2.fin} y la disolvencia al CTA empieza en f${ctaP.en - F.solapeDe(ctaP)}: tiene que acabar ≥ 4 f antes`);
  const orden = ["inicio", "tarifa", "ocupacion", "noches", "ingresos", "panel2", "servicios", "gastosTotal", "panel3", "unidad", "nota", "fin"];
  orden.forEach((k, i) => {
    if (i > 0 && !(F2[k] > F2[orden[i - 1]])) mal(`los tiempos de la infografía no van en orden: ${orden[i - 1]} f${F2[orden[i - 1]]} · ${k} f${F2[k]}`);
  });
  for (const b of bloques) {
    const ini = b.trozos[0].desde;
    if (ini <= F2.fin && b.hasta >= F2.inicio) mal(`el subtítulo [${b.id}] (f${ini}-${b.hasta}) coincide con la infografía (f${F2.inicio}-${F2.fin}): ella no habla ahí`);
  }
  // 4 · SIN animar las cifras (pedido del usuario en la rev. 2: «no hagas animación en los números»): el módulo no declara recuentos y el componente no usa `recuento`, `spring` ni `latido`.
  if ("recuento" in I.DUR || "recuentoUtilidad" in I.DUR) mal("`infografia-060.ts` declara un recuento: las cifras entran completas, sin contar");
  const fuenteI = readFileSync(join(RAIZ, "remotion", "src", "proyectos", "060", "Infografia060.tsx"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
  if (/recuento|spring\(|latido/.test(fuenteI)) mal("`Infografia060.tsx` anima las cifras (recuento, spring o latido): entran completas, con un fundido y nada más");
  if (/translate|scale\(/.test(fuenteI.replace(/translateY\(0/g, ""))) mal("`Infografia060.tsx` mueve una caja (translate o scale): las cifras entran con un fundido y se quedan quietas");
  // 5 · una cifra cada ≥ 36 f (1,2 s) y cada héroe sostenido ≥ 60 f (2 s) con su cifra entera antes de que lo releve el siguiente panel; cada cifra se queda en pantalla ≥ 2 s.
  const ENTRADAS = ["tarifa", "ocupacion", "noches", "ingresos", "panel2", "servicios", "gastosTotal", "panel3"];
  const huecos = [];
  for (let i = 1; i < ENTRADAS.length; i++) {
    const h = F2[ENTRADAS[i]] - F2[ENTRADAS[i - 1]];
    if (ENTRADAS[i] !== "panel2" && ENTRADAS[i] !== "panel3" && h < 36) mal(`«${ENTRADAS[i - 1]}» → «${ENTRADAS[i]}»: ${h} f (${(h / fps).toFixed(1)} s) entre dos cifras de un panel; hacen falta ≥ 36 (1,2 s)`);
    huecos.push(h);
  }
  const lectura = [
    ["ingresos", F2.ingresos + I.DUR.entrada, F2.panel2 - I.DUR.salida],
    ["total de gastos", F2.gastosTotal + I.DUR.entrada, F2.panel3 - I.DUR.salida],
    ["utilidad", F2.panel3 + I.DUR.entrada, F2.fin - I.DUR.salida],
  ];
  for (const [nombre, entera, sale] of lectura) if (sale - entera < 60) mal(`el héroe «${nombre}» se lee entero solo ${sale - entera} f (${entera}-${sale}): hacen falta ≥ 60 (2 s)`);
  for (const [nombre, k, sale] of [["la tarifa", "tarifa", F2.panel2], ["la ocupación", "ocupacion", F2.panel2], ["las noches", "noches", F2.panel2], ["la administración", "panel2", F2.panel3], ["los servicios", "servicios", F2.panel3]]) {
    if (sale - I.DUR.salida - F2[k] < 60) mal(`${nombre} se queda ${sale - I.DUR.salida - F2[k]} f en pantalla; hacen falta ≥ 60`);
  }
  const utilEntera = lectura[2][2] - lectura[2][1];
  // 6 · cada elemento ENTRA en un golpe MEDIDO de la canción (±4 ms, ±0,5 dB), de ≥ 10,5 dB, y el frame coincide con el del golpe.
  const medidos2 = JSON.parse(readFileSync(join(RAIZ, "proyectos", "060", "musica", "golpes-cancion-entera.json"), "utf8")).golpes;
  const sobreGolpe = [];
  for (const [k, gp] of Object.entries(I.GOLPES_INFO)) {
    const real = medidos2.find((x) => Math.abs(x.t - gp.t) <= 0.004);
    if (!real) mal(`el golpe «${k}» de la infografía (${gp.t} s de la canción) no está entre los medidos`);
    else if (Math.abs(real.db - gp.db) > 0.5) mal(`el golpe «${k}» de la infografía mide ${real.db} dB y el plan dice ${gp.db}`);
    if (gp.db < 10.5) mal(`el golpe «${k}» de la infografía mide ${gp.db} dB: el mínimo son 10,5`);
    const f = M.golpe(gp);
    const claveF = { gastos1: "panel2", utilidad: "panel3" }[k] ?? k;
    if (F2[claveF] !== f) mal(`«${k}» entra en f${F2[claveF]} y su golpe suena en f${f}`);
    sobreGolpe.push(`${gp.db}`);
  }
  // 7 · la zona segura (y 570-1350) y el centrado: ningún elemento se sale ni se pisa con otro de su panel, y cada panel está centrado en vertical sobre y 960 (la mitad del fotograma y del cuadrado 1:1).
  for (const [panel, cajas] of Object.entries(I.LAYOUT)) {
    const orden2 = [...cajas].sort((a, b) => a.arriba - b.arriba);
    const centro = (Math.min(...cajas.map((x) => x.arriba)) + Math.max(...cajas.map((x) => x.arriba + x.alto))) / 2;
    if (Math.abs(centro - I.CENTRO_Y) > 12) mal(`[${panel}] está centrado en y${centro} y debería estarlo en y${I.CENTRO_Y} (±12 px): en el cuadrado 1:1 se recorta por arriba o por abajo`);
    orden2.forEach((x, i) => {
      if (x.arriba < I.ZONA.arriba) mal(`[${panel}] «${x.id}» empieza en y${x.arriba}, por encima de la zona (y${I.ZONA.arriba})`);
      if (x.arriba + x.alto > I.ZONA.abajo) mal(`[${panel}] «${x.id}» acaba en y${x.arriba + x.alto}, por debajo de la zona (y${I.ZONA.abajo}): ahí está la interfaz de las plataformas y el borde del cuadrado 1:1`);
      if (i > 0 && x.arriba < orden2[i - 1].arriba + orden2[i - 1].alto) mal(`[${panel}] «${x.id}» (y${x.arriba}) pisa a «${orden2[i - 1].id}» (acaba en y${orden2[i - 1].arriba + orden2[i - 1].alto})`);
    });
  }
  // 8 · ningún texto se desborda: ancho medido con las tablas de la letra del canal (versalitas y tracking incluidos); el pie puede caer en 2 líneas.
  const letras = E.letraSubtitulosDe(CANAL);
  let peor = { id: "", ancho: 0 };
  for (const x of I.TEXTOS) {
    const texto = x.versalitas ? x.texto.toUpperCase() : x.texto;
    const ancho = E.anchoLinea(texto, letras[x.estilo], x.px);
    if (ancho === null) {
      mal(`«${x.id}»: la letra ${x.estilo} no tiene tabla de avances: no se puede comprobar que cabe`);
      continue;
    }
    const total = ancho + (x.versalitas ? Math.ceil(texto.length * I.TRACKING_ETIQUETA * x.px) : 0);
    const lineas = x.id === "pie" ? 2 : 1;
    if (total > I.COLUMNA.ancho * lineas) mal(`«${x.id}» mide ≈ ${total} px (${x.texto}) y caben ${I.COLUMNA.ancho * lineas}`);
    if (total > peor.ancho) peor = { id: x.id, ancho: total };
  }
  // 9 · legibilidad (peor caso, velo mezclado en sRGB como lo hace el navegador; lo que se ve se mide con stills: `medidas/legibilidad-infografia.txt`): blanco y oro a ≥ 4,5 : 1 sobre blanco puro bajo el velo del 80 %.
  const luz = (hex) => {
    const ch = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
  };
  const fondoPeor = 1 - I.VELO.panel; // blanco puro bajo el velo
  const Lfondo = fondoPeor <= 0.03928 ? fondoPeor / 12.92 : ((fondoPeor + 0.055) / 1.055) ** 2.4;
  const contraste = (hex) => (luz(hex) + 0.05) / (Lfondo + 0.05);
  if (contraste("#ffffff") < 4.5) mal(`el blanco sobre el velo de ${I.VELO.panel} da ${contraste("#ffffff").toFixed(1)} : 1 en el peor caso (blanco puro debajo)`);
  if (contraste(I.ORO) < 4.5) mal(`el oro ${I.ORO} sobre el velo de ${I.VELO.panel} da ${contraste(I.ORO).toFixed(1)} : 1 en el peor caso`);
  // 10 · montada en la composición, tras el fundido de cierre y sin `<PistaGraficos>` (el modo de texto es editorial: R14).
  const fuenteC = readFileSync(join(RAIZ, "remotion", "src", "proyectos", "060", "Recorrido060.tsx"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
  if (!/<Infografia060\s*\/>/.test(fuenteC)) mal("la composición no monta <Infografia060 />");
  if (/PistaGraficos/.test(fuenteC)) mal("la composición usa <PistaGraficos>: el modo editorial no lo monta (R14)");
  if (fuenteC.indexOf("<FundidoACierre />") > fuenteC.indexOf("<Infografia060 />")) mal("<Infografia060 /> tiene que ir DESPUÉS de <FundidoACierre /> (sobre los planos)");
  if (fallos.length === n) {
    ok(`8 cifras y 8 nombres exactos a los del usuario · la cuenta cuadra (${c.ocupacion} % de 30 = ${c.noches} noches · ${c.tarifa} × ${c.noches} = ${c.ingresos} · ${c.administracion} + ${c.servicios} = ${c.gastos} · ${c.ingresos} − ${c.gastos} = ${c.utilidad}) · SIN recuentos: cada cifra entra completa con un fundido de ${I.DUR.entrada} f · de f${F2.inicio} a f${F2.fin} (${((F2.fin - F2.inicio) / fps).toFixed(1)} s), tras la última palabra de la mitad y antes del CTA, sin pisar ningún subtítulo · una cifra cada ${(Math.min(...huecos.filter((h, i) => ![3, 6].includes(i))) / fps).toFixed(1)}-${(Math.max(...huecos) / fps).toFixed(1)} s · héroes de ${(lectura[0][2] - lectura[0][1]) / fps >= 2 ? ((lectura[0][2] - lectura[0][1]) / fps).toFixed(1) : "?"} · ${((lectura[1][2] - lectura[1][1]) / fps).toFixed(1)} · ${(utilEntera / fps).toFixed(1)} s enteros · cada elemento en un golpe medido (${sobreGolpe.join(" · ")} dB) · todo dentro de y${I.ZONA.arriba}-${I.ZONA.abajo} · el texto más ancho («${peor.id}») mide ≈ ${peor.ancho} de ${I.COLUMNA.ancho} px`);
  }
}

/* 3 · la voz de las tomas ───────────────────────────────────────────────── */
seccion("3. la voz de las tomas a cámara");
{
  const n = fallos.length;
  const ganancias = [];
  cortes.forEach((c, i) => {
    if (!c.audio || !c.voz) return;
    if (!existsSync(join(PUBLICO, c.audio))) return mal(`${c.id}: no existe remotion/public/${c.audio} (node proyectos/060/normalizar.mjs)`);
    // La voz que suena es la TRATADA (−15 LUFS sin saturar, pedido del usuario): apuntar al WAV crudo (`hk03.wav`) la dejaba a −22 LUFS en el render y esta puerta no lo veía.
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
    if (!disuelve && ini < c.en + (A.DESCLIC_HOOK ?? T.DESCLIC_VOZ)) mal(`${c.id}: empieza a hablar en f${ini} y el desclic de entrada dura hasta f${c.en + (A.DESCLIC_HOOK ?? T.DESCLIC_VOZ)}: la primera palabra suena a medio subir`);
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

/** El volumen de la música en un frame de la comp: el del trozo que lo cubre (la música va partida en tramos consecutivos). */
const nivelMusica = (f) => {
  const t = A.audio060.filter((x) => /^musica(-\d+)?$/.test(x.id)).find((x) => f >= x.en && f < x.en + x.dur);
  return t ? T.volumenDe(t, f - t.en) : 0;
};

/* 4 · la música, a sus golpes ──────────────────────────────────────────── */
seccion("4. la música: «Street Level Sessions on the Green», cada corte en un golpe medido (≥ 13 dB; la vista, 10,7), el CTA en un frame libre y apagada con curva bajo la tarjeta");
const ventanasDeVoz = conVoz.filter((c) => c.voz).map((c) => ({ id: c.id, ...vozDe(c) }));
{
  const n = fallos.length;
  for (const a of T.revisaAudio(A.audio060, { fps, duracion: DURACION })) mal(`revisaAudio: ${a}`);
  for (const t of A.audio060) {
    if (!existsSync(join(PUBLICO, t.src))) {
      mal(`${t.id}: no existe remotion/public/${t.src}`);
      continue;
    }
    const hasta = (Math.round((t.desde ?? 0) * fps) + t.dur) / fps;
    const dura = duracionDe(t.src);
    if (hasta > dura + 1 / fps) mal(`${t.id}: se lee hasta ${hasta.toFixed(2)} s y ${t.src} dura ${dura.toFixed(2)} s`);
  }
  const cta = byId("c10-cta");
  // La música va PARTIDA en tramos consecutivos de la misma canción (ffmpeg no admite una expresión de volumen con ≈ 80 valores distintos: `audio-060.ts`, `trocea`).
  const trozos = A.audio060.filter((t) => /^musica(-\d+)?$/.test(t.id)).sort((x, y) => x.en - y.en);
  const musica = trozos[0];
  if (!musica || trozos.some((t) => t.src !== "recorrido-060/musica-060.wav")) mal("no suena «Street Level Sessions on the Green» (recorrido-060/musica-060.wav)");
  else {
    // Sin huecos ni solapes, la fuente continúa donde acabó el trozo anterior (la misma muestra) y ninguno trae más de 80 valores de volumen distintos (el límite de ffmpeg).
    trozos.forEach((t, i) => {
      if (Math.abs(t.desde - (M.INICIO_MUSICA + t.en / fps)) > 1e-9) mal(`${t.id}: arranca en la fuente ${t.desde} s y tendría que ser ${M.INICIO_MUSICA + t.en / fps} (la canción desde su INICIO_MUSICA más ${t.en} f)`);
      if (i > 0 && t.en !== trozos[i - 1].en + trozos[i - 1].dur) mal(`${t.id} empieza en f${t.en} y ${trozos[i - 1].id} acaba en f${trozos[i - 1].en + trozos[i - 1].dur}: la música se parte sin huecos ni solapes`);
      const valores = new Set();
      for (let f = 0; f < t.dur; f++) valores.add(Math.round(T.volumenDe(t, f) * 1000) / 1000);
      if (valores.size > 80) mal(`${t.id}: ${valores.size} valores de volumen distintos; ffmpeg no admite una expresión con más de ≈ 80 (parte el tramo)`);
    });
    if (Math.abs(musica.desde - M.INICIO_MUSICA) > 1e-9) mal(`la música arranca en ${musica.desde} s y INICIO_MUSICA dice ${M.INICIO_MUSICA}`);
    // Una sola canción, del frame 0 hasta FIN_MUSICA_060: baja bajo la voz del CTA y, tras su última palabra, se APAGA con curva de coseno bajo la tarjeta, 2 f antes del final de la pieza (la canción no resuelve sola ahí).
    const finMusica = trozos.at(-1).en + trozos.at(-1).dur;
    if (musica.en !== 0 || finMusica !== M.FIN_MUSICA_060) mal(`la música ocupa f${musica.en}-${finMusica} y tiene que ir de 0 a FIN_MUSICA_060 (f${M.FIN_MUSICA_060})`);
    if (M.FIN_MUSICA_060 > DURACION - 2) mal(`la música acaba en f${M.FIN_MUSICA_060} y la pieza en f${DURACION}: tiene que acabar ≥ 2 f antes (la tarjeta va en silencio)`);
    const g = Array.isArray(trozos.at(-1).ganancia) ? trozos.at(-1).ganancia : [];
    const ultimoPunto = g.at(-1);
    if (!ultimoPunto || ultimoPunto[0] !== M.FIN_MUSICA_060 || ultimoPunto[1] !== 0) mal(`la envolvente de la música no acaba en silencio en f${M.FIN_MUSICA_060}`);
    // Tras la última palabra del CTA la música solo BAJA (curva de coseno hasta cero): nunca vuelve a subir bajo la tarjeta ni deja un escalón.
    const ultimaPalabraCta = vozDe(cta).fin;
    let previo = nivelMusica(ultimaPalabraCta);
    for (let f = ultimaPalabraCta + 1; f <= M.FIN_MUSICA_060; f++) {
      const x = nivelMusica(f);
      if (x > previo + 1e-9) {
        mal(`la música SUBE en f${f} (×${x.toFixed(4)} tras ×${previo.toFixed(4)}) después de la última palabra del CTA: tiene que apagarse sin subir`);
        break;
      }
      previo = x;
    }
    // Ningún pico por encima de PICO_MAX_MUSICA con la ganancia de cada tramo.
    for (const [clave, alto] of Object.entries(A.ALTOS)) {
      const pico = A.PICO_TRAMO[clave] + 20 * Math.log10(alto);
      if (pico > PICO_MAX_MUSICA) mal(`el tramo «${clave}» de la música llega a ${pico.toFixed(1)} dBFS (pico ${A.PICO_TRAMO[clave]} + ganancia): el tope son ${PICO_MAX_MUSICA}`);
    }
  }
  // La rejilla son los GOLPES MEDIDOS (`musica/golpes-cancion-entera.json`, de `medir-pista.py --json` sobre la canción entera). Cada GOLPE de metraje-060.ts tiene que estar ahí (±4 ms y ±0,5 dB) y cada plano tiene que
  // entrar en el suyo, a ≤ 1 f de donde SUENA.
  const medidos = JSON.parse(readFileSync(join(RAIZ, "proyectos", "060", "musica", "golpes-cancion-entera.json"), "utf8")).golpes;
  const DE = {
    "c02-hook": "hook",
    "c03-bano": "paseo1",
    "c04-cocina": "paseo2",
    "c05-escritorio": "paseo3",
    "c06-mitad": "mitad",
    "c07-cama": "cama",
    "c09-vista": "vista",
  };
  // El primer plano (su golpe es el de entrada de la canción, abajo) y la tarjeta (empieza donde acaba la toma del CTA, no en un golpe).
  // El primer plano (golpe de entrada), la tarjeta, los tres planos de fondo de la infografía (se funden bajo un velo negro: no hace falta un golpe) y el CTA (entra disolviendo a un frame LIBRE: la canción no tiene ningún golpe ≥ 10 dB entre los 197,7 y los 204,8 s; la música baja con curva igual, sección 4b).
  const SIN_GOLPE = new Set(["c01-rooftop", "c11-cierre", "c08-tele", "c08b-sofa", "c08c-coworking", "c10-cta"]);
  const enMedidos = (clave) => {
    const gp = M.GOLPE[clave];
    const real = medidos.find((x) => Math.abs(x.t - gp.t) <= 0.004);
    if (!real) mal(`el golpe «${clave}» (${gp.t} s de la canción) no está entre los medidos (musica/golpes-cancion-entera.json)`);
    else if (Math.abs(real.db - gp.db) > 0.5) mal(`el golpe «${clave}» mide ${real.db} dB y metraje-060.ts dice ${gp.db}`);
    return gp;
  };
  const filas = [];
  for (const c of cortes) {
    if (SIN_GOLPE.has(c.id)) continue;
    const clave = DE[c.id];
    if (!clave) {
      mal(`${c.id}: no tiene golpe en la tabla de esta puerta (DE): cada plano entra en un golpe medido de la canción`);
      continue;
    }
    const gp = enMedidos(clave);
    const desfase = DESFASE_GOLPE[c.id] ?? 0;
    const d = c.en - desfase - M.golpeExacto(gp.t);
    if (Math.abs(d) > TOLERANCIA_GOLPE) mal(`${c.id} entra en f${c.en}${desfase ? ` (con el desfase declarado de ${desfase} f)` : ""} y el golpe «${clave}» suena en f${M.golpeExacto(gp.t).toFixed(1)} (${d >= 0 ? "+" : ""}${d.toFixed(1)} f)`);
    const minimo = MINIMO_DECLARADO[c.id] ?? (c.entra === "disolver" ? FUERZA_MIN_DISOLVER : FUERZA_MIN_CORTE_SECO);
    if (gp.db < minimo) mal(`${c.id}: entra ${c.entra === "disolver" ? "con una disolvencia que acaba" : "a corte"} en un golpe de ${gp.db} dB y el mínimo es ${minimo}`);
    filas.push(`${c.id.replace(/^c\d+-/, "")} ${gp.db} dB`);
  }
  // El golpe de apertura suena en los primeros 4 f (el audio del render llega 42 ms tarde: no puede sonar en el 0 exacto).
  enMedidos("e0");
  const apertura = M.golpeExacto(M.GOLPE.e0.t);
  if (apertura < 0 || apertura > 4) mal(`el golpe de entrada de la canción suena en f${apertura.toFixed(1)}: el rooftop (frame 0) abre con él, en los primeros 4 f`);
  if (M.GOLPE.e0.db < FUERZA_MIN_DISOLVER) mal(`el golpe de entrada mide ${M.GOLPE.e0.db} dB: el mínimo son ${FUERZA_MIN_DISOLVER}`);
  if (fallos.length === n) {
    ok(`«Street Level Sessions on the Green» desde el ${M.INICIO_MUSICA.toFixed(3)} s, una sola canción · golpe de entrada en f${apertura.toFixed(1)} (${M.GOLPE.e0.db} dB) · ${filas.length} planos en golpes MEDIDOS a ≤ ${TOLERANCIA_GOLPE} f (${filas.join(" · ")}) · tras el CTA se apaga con curva y llega a cero en f${M.FIN_MUSICA_060} (la tarjeta va en silencio)`);
  }
}

/* 4b · la música baja cuando habla Isabella ─────────────────────────────── */
seccion("4b. la música baja bajo su voz, con curva y antes de la primera palabra, y sube antes del golpe siguiente");
{
  const n = fallos.length;
  const nivel = nivelMusica;
  const cta = byId("c10-cta");
  const db = (x) => 20 * Math.log10(x);
  const filas = [];
  let techoLufs = -Infinity;
  // Por toma: el nivel de ARRIBA con que suena el golpe de su entrada, el de ARRIBA al que vuelve tras su última palabra y el plano siguiente (cuyo golpe tiene que sonar con la música ya arriba).
  const TOMAS = {
    "c02-hook": { fade: "hook", entra: A.ALTOS.apertura, sale: A.ALTOS.paseo, sig: "c03-bano", alGolpe: 0.98, aire: 8 },
    // La mitad: el clip MEDIO7 solo deja 0,3 s tras «cómo» (6 f hasta el golpe del plano siguiente): la música empieza a subir al acabar ella y el golpe suena a ≥ 80 % de su nivel (declarado en `audio-060.ts`).
    "c06-mitad": { fade: "mitad", entra: A.ALTOS.paseo, sale: A.ALTOS.bloque5, sig: "c07-cama", alGolpe: 0.8, aire: 5 },
    "c10-cta": { fade: "cta", entra: A.ALTOS.bloque5, sale: A.ALTOS.bloque5, sig: null, alGolpe: 0.98, aire: 0 },
  };
  for (const v of ventanasDeVoz) {
    const t = TOMAS[v.id];
    if (!t) {
      mal(`${v.id}: sin entrada en TOMAS de la puerta (revisar-060.mjs)`);
      continue;
    }
    const c = byId(v.id);
    const bajo = A.BAJOS[v.id];
    // El golpe de la entrada (la disolvencia lo ACABA —o lo cruza, en el hook: `DESFASE_GOLPE`—) suena ENTERO y la música baja DESPUÉS.
    const fGolpe = c.en - (DESFASE_GOLPE[c.id] ?? 0);
    if (nivel(fGolpe) < t.entra * 0.98) mal(`${v.id}: la música ya está baja en el golpe de su entrada (f${fGolpe}: ×${nivel(fGolpe).toFixed(3)} y su nivel de arriba es ×${t.entra.toFixed(3)}): el golpe tiene que sonar entero y la música bajar DESPUÉS`);
    if (nivel(fGolpe + 4) > nivel(fGolpe)) mal(`${v.id}: la música SUBE tras el golpe de su entrada`);
    // La curva ACABA antes de la primera palabra, y es una curva: a mitad de la bajada está entre el nivel de arriba y el de abajo.
    if (nivel(v.ini - 1) > bajo * 1.02) mal(`${v.id}: la música aún no ha bajado 1 f antes de su primera palabra (f${v.ini}): la curva tiene que acabar ANTES de que hable`);
    const medio = Math.round(fGolpe + A.FADE_OUT[t.fade] / 2);
    if (!(nivel(medio) < t.entra * 0.95 && nivel(medio) > bajo * 1.05)) mal(`${v.id}: a mitad de la bajada (f${medio}) la música está a ×${nivel(medio).toFixed(3)}: tiene que ir entre ×${bajo.toFixed(3)} y ×${t.entra.toFixed(3)} (una curva, no un corte)`);
    // Durante TODA su voz, la música a su nivel bajo (−26 LUFS: 11 LU bajo ella).
    let peor = 0;
    for (let f = v.ini; f <= v.fin; f++) peor = Math.max(peor, nivel(f));
    if (peor > bajo * 1.02) mal(`${v.id}: durante su voz (f${v.ini}-${v.fin}) la música llega a ×${peor.toFixed(3)} y su nivel bajo es ×${bajo.toFixed(3)}`);
    techoLufs = Math.max(techoLufs, A.LUFS_CANCION_EN_VOZ[v.id] + db(peor));
    // …y SUBE con curva tras su última palabra: está arriba en el golpe del plano siguiente (a ≥ 2 f de él) o, en el CTA, 12 f después (la caída de la canción ya la baja sola).
    if (t.sig) {
      const sig = byId(t.sig);
      if (nivel(sig.en) < t.sale * t.alGolpe) mal(`${v.id}: en el golpe del plano siguiente (${sig.id}, f${sig.en}) la música está a ×${nivel(sig.en).toFixed(3)} y su nivel de arriba es ×${t.sale.toFixed(3)} (mínimo ${(t.alGolpe * 100).toFixed(0)} %): tiene que haber vuelto arriba`);
      if (sig.en - v.fin < t.aire) mal(`${v.id}: solo ${sig.en - v.fin} f entre su última palabra y el golpe del plano siguiente (mínimo ${t.aire}): la música no puede subir`);
    }
    // (el CTA no tiene plano siguiente con golpe: la música se apaga bajo la tarjeta; su apagado se comprueba en la sección 4)
    filas.push(`${v.id.replace(/^c\d+-/, "")} ${db(peor).toFixed(1)} dB sobre el archivo`);
  }
  // En absoluto: la música bajo la voz queda ≥ 9 LU por debajo de ella (−15 LUFS) en TODO su recorrido.
  const bajoVoz = M.OBJETIVO_LUFS - techoLufs;
  if (bajoVoz < 9) mal(`bajo la voz la música llega a ${techoLufs.toFixed(1)} LUFS, ${bajoVoz.toFixed(1)} LU bajo ella (${M.OBJETIVO_LUFS}); tiene que ser ≥ 9 LU en TODO su recorrido`);
  // El golpe de apertura suena a su nivel «solo».
  const aperturaF = Math.round(M.golpeExacto(M.GOLPE.e0.t));
  if (nivel(aperturaF) < A.ALTOS.apertura * 0.9 || nivel(aperturaF + 1) < A.ALTOS.apertura * 0.9) mal(`el golpe de apertura (f${aperturaF}) no suena a su nivel: la música ya está baja o aún no ha subido`);
  if (fallos.length === n) {
    ok(`la música baja a ${filas.join(" · ")} durante su voz, a ${techoLufs.toFixed(1)} LUFS como mucho: ${bajoVoz.toFixed(1)} LU bajo ella · el golpe de cada entrada suena entero y la bajada (curva de ${A.FADE_OUT.hook}-${A.FADE_OUT.cta} f) acaba antes de la primera palabra · sube con curva tras la última del hook y de la mitad (${A.FADE_IN.hook} y ${A.FADE_IN.mitad} f; en la mitad el golpe suena a ≥ 80 %) y está arriba en el golpe siguiente`);
  }
}

/* 5 · subtítulos ────────────────────────────────────────────────────────── */
seccion("5. subtítulos editoriales");
{
  const n = fallos.length;
  if (E.modoTextoDe(CANAL) !== "editorial") mal(`el canal está en modo «${E.modoTextoDe(CANAL)}»: esta pieza monta subtítulos editoriales`);
  const letra = E.letraSubtitulosDe(CANAL);
  const acentoMenos = puerta.modulos.subtitulos.ACENTO_MENOS_060;
  for (const a of E.revisaSubtitulosEditoriales(bloques, { fps, ancho: 1080, alto: 1920, duracion: DURACION, letra, acentoMenos })) mal(`revisaSubtitulosEditoriales: ${a}`);
  // La cursiva, 8 px más pequeña (como en las versiones de Los Patios): la constante, que la composición se la pase al componente, y el efecto medido en el motor.
  const vistaCuadro = { ancho: 1080, alto: 1920 };
  if (acentoMenos !== ACENTO_MENOS_PEDIDO) mal(`ACENTO_MENOS_060 = ${acentoMenos} y el canal pide ${ACENTO_MENOS_PEDIDO} px menos en la cursiva`);
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
  const fuenteComp = readFileSync(join(RAIZ, "remotion", "src", "proyectos", "060", "Recorrido060.tsx"), "utf8");
  const mOp = /export const OPACIDAD_SUBTITULOS\s*=\s*([0-9.]+)/.exec(fuenteComp);
  if (!mOp || Math.abs(Number(mOp[1]) - OPACIDAD_PEDIDA) > 1e-9) mal(`OPACIDAD_SUBTITULOS = ${mOp ? mOp[1] : "?"} y el canal pide ${OPACIDAD_PEDIDA}`);
  if (!/<SubtitulosEditoriales\b[^>]*\bacentoMenos=\{ACENTO_MENOS_060\}/.test(fuenteComp)) mal("la composición no le pasa `acentoMenos={ACENTO_MENOS_060}` a <SubtitulosEditoriales>: la cursiva saldría a su tamaño de siempre");
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
  // Esta pieza no lleva ningún dato grande (las cifras que ella dice van en los subtítulos, 2a).
  for (const b of bloques) if (b.trozos.some((t) => t.estilo === "dato")) mal(`[${b.id}] lleva un dato grande: esta pieza no lleva ningún dato grande`);
  const b3 = cortes.filter((c) => c.bloque === 3);
  const ini3 = b3.length ? b3[0].en : 0;
  const fin3 = b3.length ? b3.at(-1).en + b3.at(-1).dur : 0;
  for (const b of bloques) {
    if (!b.trozos.some((t) => t.estilo === "dato")) continue;
    const ini = b.trozos[0].desde;
    if (ini < ini3 || b.hasta > fin3) mal(`[${b.id}] lleva un dato y va de f${ini} a f${b.hasta}; el bloque 3 va de f${ini3} a f${fin3} y el dato solo va ahí (viaje-emocional.md §9)`);
  }
  const acentos = bloques.reduce((s, b) => s + b.trozos.filter((t) => t.estilo === "acento").length, 0);
  if (fallos.length === n) ok(`${bloques.length} bloques, ${acentos} acentos · validador sin avisos con las letras del canal · todo lo de Isabella abajo, a ${OPACIDAD_PEDIDA * 100} % · la cursiva ${ACENTO_MENOS_PEDIDO} px menor (${cursiva}) · sin datos grandes`);
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
      console.log(`  ℹ️  ${v.nombre}: su plan no carga ahora (${String(e.message).split("\n")[0].slice(0, 120)}): nada que comparar`);
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
  const carpetas = [join(RAIZ, "remotion", "src", "proyectos", "060"), join(RAIZ, "proyectos", "060", "voz")];
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

puerta.cierra(`el 060 pasa la puerta: ${cortes.length} planos, ${bloques.length} bloques de texto, ${A.audio060.length} tramos de audio`);
