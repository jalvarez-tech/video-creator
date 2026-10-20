#!/usr/bin/env node
/**
 * PUERTA DEL 048 — «Chef y experiencias» (V30, Tierra Grata, ARRIENDO): recorrido con presentadora que ABRE CON EL HOOK.
 *
 *   node proyectos/048/revisar-048.mjs            (con `--final` falla si queda una palabra «POR CONFIRMAR AL OÍDO»)
 *
 * Las comprobaciones del FORMATO salen de `revisar-metraje.mjs` (línea de
 * tiempo, metraje, tramos, encuadre). Encima, lo que el formato del recorrido
 * promete y ningún frame enseña:
 *
 *   2. la ESTRUCTURA: los bloques en orden, el HOOK abriendo la pieza (frame 0, a corte, con su voz: EXCEPCIÓN
 *      DECLARADA por encargo del usuario, `ABRE_CON_EL_HOOK`), Isabella una vez por cada bloque suyo, el clímax
 *      (RC10) como último plano antes del CTA y el total dentro del tope.
 *   2a. los SITIOS de Isabella (el hook y la mitad repiten la terraza común: declarado) y que ni una cifra, dicha o
 *      escrita, sale en la pieza; y el REPARTO de las seis piezas: ningún recorrido que sea apertura o clímax de otra.
 *   2b. las REGLAS FIJAS del canal que SÍ se cumplen (el usuario las pidió con «siempre» y «nunca»; skill
 *      `recorrido-luxur`, SKILL.md §0): no hay texto arriba ni cuenta `@…`, y NUNCA el sello «PROPIEDADES LUXUR»
 *      (`SelloCampana`). La de «la primera toma sin texto ni voz» NO: esta pieza la rompe a propósito, y la puerta lo dice.
 *   2c. el CIERRE (`cierre-048.ts`): NADA SE CONGELA (la imagen de Isabella funde a negro y
 *      llega a negro exacto en su último fotograma), y sigue una TARJETA OSCURA (el último
 *      plano, un negro liso) con el LOGO —más pequeño y al 60 % de opacidad: 40 % de
 *      transparencia— y la WEB, que caben, caen en las zonas seguras y se leen enteros.
 *   2d. el COLOR de cada plano (`colorCorrection`, R32).
 *   3. la VOZ de sus tomas: el WAV existe y tiene el tramo que se lee, ninguna
 *      palabra suena dentro de una disolvencia, de un cruce ni de un desclic,
 *      queda aire tras la última palabra de la pieza y la ganancia por toma es
 *      sensata.
 *   4. la MÚSICA («L' Amour Toujours on SAXOPHONE», sax a 126 BPM): una sola canción, cada corte SECO en un golpe MEDIDO (de ≥ 8 dB), la
 *      nota de apertura en los primeros f y apagada bajo la tarjeta.
 *   4b. la música BAJA bajo su voz, con curva, ANTES de la primera palabra.
 *   5. los SUBTÍTULOS: su validador sin un aviso, con las letras del canal; cada
 *      trozo dentro de una ventana de voz; y ningún bloque `centro` encima de Isabella.
 *
 * Carga los módulos TypeScript DE VERDAD (`abrePuerta` → esbuild): lo que mide
 * es lo que se renderiza. Sale con 1 si algo falla.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ejecutar } from "../../herramientas/comun.mjs";
import { abrePuerta, cargaTs, duracionDe, PUBLICO, RAIZ } from "../../remotion/src/motor/metraje/revisar-metraje.mjs";

/**
 * EXCEPCIÓN DECLARADA (por encargo del usuario, como el 021): la pieza ABRE CON EL HOOK. La regla fija «la primera toma sale sin texto ni voz» no se cumple y no hay bloque 1 (la casa). Con `false` la puerta
 * volvería a exigir una casa limpia en el frame 0.
 */
const ABRE_CON_EL_HOOK = true;
/** Los bloques de ESTA pieza: sin el 1 (la casa). */
const BLOQUES = ABRE_CON_EL_HOOK ? [2, 3, 4, 5, 6] : [1, 2, 3, 4, 5, 6];
/** Los bloques en los que Isabella habla a cámara. */
const DE_ELLA = [2, 4, 6];

const TECHO_ZOOM = 1.2; // clips normalizados a 1296 px = 1080 × 1,2
const TOPE_SEGUNDOS = 55; // el formato apunta a 45-50 s; pasado de aquí ya es otra pieza
const MARGEN_FUNDIDO = 2; // f entre la última palabra y el inicio de la disolvencia del siguiente
const COLA_FINAL = [45, 120]; // f desde la última palabra del CTA hasta el final (lo que le queda de toma + la tarjeta): la web se lee, sin quedarse muerto
const TARJETA_FRAMES = [45, 75]; // f que dura la tarjeta oscura del cierre (1,5-2,5 s)
const HOLGURA_TROZO = 3; // f que un trozo puede adelantarse a su palabra
const TOLERANCIA_GOLPE = 1; // f entre el `en` de un plano y el frame en que suena el golpe de la canción en que entra
const FUERZA_MIN_CORTE_SECO = 8; // dB por 15 ms: el canal exigía 7,4 con piano (sin pulso) y 12 con las canciones de golpe claro; aquí el más débil es el de la piscina, 8,2
const FUERZA_MIN_APERTURA = 10; // dB: la nota que abre la pieza (suena entera antes de que hable Isabella)
const FADE_OUT_MUSICA = [18, 6, 6]; // f que tarda la música en bajar: en el hook (desde el f10), y en la mitad y el CTA (desde el golpe en que entra Isabella): fundido de coseno, no corte
/** Los recorridos que son APERTURA o CLÍMAX de otra pieza de las seis (reparto FIJO, `proyectos/044/reparto-045-050.md`): esta pieza no los usa. RC02 solo en su tramo final (clímax de la V32); aquí no entra. */
const DE_OTRAS = { rc01: "apertura V27", rc04: "apertura V31", rc20: "apertura V29", rc02: "clímax V32 (su tramo final)", rc03: "clímax V29", rc18: "clímax V28", rc19: "clímax V31", rc21: "clímax V27" };

/**
 * Bloques de subtítulos que NO acompañan a una palabra dicha, y por qué. Una
 * excepción que sobra (el bloque ya no existe, o todos sus trozos caen sobre
 * voz) tumba la puerta.
 */
/**
 * Las versiones ANTERIORES del mismo reel (otra canción, otro hook…), para la sección 7b: cuánto metraje comparte esta con cada
 * una. `{ nombre, plan, cortes }`: el `metraje-048.ts` de aquella (ruta desde la raíz del repo) y el nombre de su export.
 * Vacío en la primera versión. Ejemplo (el 018 frente al 017):
 *   [{ nombre: "la V1 (017)", plan: "remotion/src/proyectos/017/metraje-017.ts", cortes: "metraje017" }]
 */
const VERSIONES_ANTERIORES = [];

const SIN_VOZ = {};

// Un plan que no carga (un corte con voz y velocidad distinta de 1, un import
// roto) no deja una traza: dice qué pasa y sale con 1.
const puerta = await abrePuerta({
  proyecto: "048",
  plan: "remotion/src/proyectos/048/metraje-048.ts",
  cortes: "metraje048",
  receta: "node proyectos/048/normalizar.mjs",
  extras: {
    audio: "remotion/src/proyectos/048/audio-048.ts",
    subtitulos: "remotion/src/proyectos/048/subtitulos-048.ts",
    tramos: "remotion/src/motor/sound/tramos.ts",
    editorial: "remotion/src/motor/subtitulos-editoriales.ts",
    marca: "remotion/src/marcas/luxur.ts",
    cierre: "remotion/src/proyectos/048/cierre-048.ts",
  },
}).catch((e) => {
  console.log(`\n❌ el plan del 048 no carga: ${e.message}\n`);
  process.exit(1);
});
const { cortes, fps, fallos, mal, ok, seccion } = puerta;
const M = puerta.plan;
const F = puerta.modulos.formato;
const A = puerta.modulos.audio;
const T = puerta.modulos.tramos;
const E = puerta.modulos.editorial;
const bloques = puerta.modulos.subtitulos.subtitulos048;
const DURACION = M.DURACION_048;
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
const byId = (id) => {
  const c = cortes.find((x) => x.id === id);
  if (!c) throw new Error(`falta el plano ${id} en metraje-048.ts`);
  return c;
};
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
    // EXCEPCIÓN DECLARADA: abre Isabella. El primer plano es el hook, del bloque 2, a corte (no hay nada de lo que fundir), con su voz.
    if (primero.id !== "c01-hook") mal(`${primero.id}: con ABRE_CON_EL_HOOK el primer plano es c01-hook`);
    if (primero.bloque !== 2) mal(`${primero.id}: el primer plano es del bloque ${primero.bloque}; abre el hook (bloque 2)`);
    if (!primero.audio) mal(`${primero.id}: el primer plano es el hook y trae su voz (\`audio\`)`);
    if ((primero.entra ?? "corte") !== "corte") mal(`${primero.id}: entra con «${primero.entra}»; el frame 0 no nace de un fundido`);
    if (primero.en !== 0) mal(`${primero.id}: empieza en f${primero.en}; el hook es el frame 0`);
    if (cortes.some((c) => c.bloque === 1)) mal("hay un plano del bloque 1: con ABRE_CON_EL_HOOK la pieza no lleva «casa» al principio");
  } else {
    if (primero.bloque !== 1) mal(`${primero.id}: el primer plano es del bloque ${primero.bloque}; la pieza abre con la casa (bloque 1)`);
    if (primero.audio) mal(`${primero.id}: el primer plano lleva voz; la casa abre sola y ella entra después`);
    if ((primero.entra ?? "corte") !== "corte") mal(`${primero.id}: entra con «${primero.entra}»; el frame 0 es la miniatura y no nace de un fundido`);
  }
  cortes.forEach((c, i) => {
    if (!BLOQUES.includes(c.bloque)) mal(`${c.id}: bloque ${c.bloque}; esta pieza lleva los bloques ${BLOQUES.join(", ")}`);
    if (i > 0 && c.bloque < cortes[i - 1].bloque) mal(`${c.id}: bloque ${c.bloque} después del ${cortes[i - 1].bloque}; los bloques van en orden`);
    const deElla = DE_ELLA.includes(c.bloque) && !esTarjeta(c);
    if (deElla && !c.audio) mal(`${c.id}: bloque ${c.bloque} sin \`audio\`; en los bloques ${DE_ELLA.join(", ")} habla Isabella a cámara`);
    if (!deElla && c.audio) mal(`${c.id}: bloque ${c.bloque} con \`audio\`; en los recorridos la voz es en off y va en audio-048.ts`);
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

/* 2a · los sitios de Isabella, ni una cifra y el reparto de las seis piezas ───── */
seccion("2a. Isabella en dos sitios, ninguna cifra y ningún recorrido que sea apertura o clímax de otra pieza");
{
  const n = fallos.length;
  /** Dónde se grabó cada toma (la etiqueta del catálogo, `proyectos/044/catalogo-material.md` §3-§5). El rodaje del 17-oct no tiene más sitios que estos para Isabella: el hook y la mitad repiten la terraza común (declarado). */
  const LUGAR = { hk01: "TERRAZA COMÚN", md03: "TERRAZA COMÚN", ct03: "ESCALERAS" };
  const lugares = conVoz.map((c) => {
    const codigo = /recorrido-048\/([a-z0-9]+)(?:-voz)?\.wav$/.exec(c.audio)?.[1];
    return { id: c.id, codigo, lugar: LUGAR[codigo] };
  });
  for (const l of lugares) if (!l.lugar) mal(`${l.id}: la toma «${l.codigo}» no está en la tabla de lugares de esta puerta (LUGAR)`);
  const [lHook, lMitad, lCta] = lugares.map((l) => l.lugar);
  if (lCta === lMitad) mal(`el CTA está en ${lCta} y la mitad también: dos tomas del mismo decorado seguidas son un salto de decorado`);
  if (lHook === lMitad) console.log(`  ℹ️  el hook y la mitad están en ${lHook}: el rodaje del 17-oct no tiene otro sitio para ellas; declarado en el plan y en \`combinaciones.md\``);
  // «Una sola cifra, y nunca en los bloques 5 y 6»: esta pieza no lleva ninguna, ni dicha ni escrita (la cifra $14.800.000 es de la V29 y la V32).
  for (const c of conVoz) if (/\d/.test(c.voz.dice)) mal(`${c.id}: «${c.voz.dice}» lleva una cifra; esta pieza no cuenta números`);
  for (const b of bloques) for (const t of b.trozos) if (/\d/.test(t.texto)) mal(`[${b.id}] «${t.texto}» lleva una cifra`);
  // El reparto fijo: ni la apertura ni el clímax de otra pieza.
  for (const c of cortes) {
    const cod = /recorrido-048\/(rc\d+)\.mp4$/.exec(c.src)?.[1];
    if (cod && DE_OTRAS[cod]) mal(`${c.id} usa ${cod.toUpperCase()}, que es la ${DE_OTRAS[cod]}: el reparto de las seis piezas es FIJO (proyectos/044/reparto-045-050.md)`);
  }
  // El clímax asignado a esta pieza: RC10, el último plano del bloque 5 y el más largo (la sección 2 lo comprueba).
  const ultimoDelCinco = cortes.filter((c) => c.bloque === 5).at(-1);
  if (!/recorrido-048\/rc10\.mp4$/.test(ultimoDelCinco?.src ?? "")) mal(`el clímax de esta pieza es RC10 (el balcón, del cielo al jacuzzi privado) y el último plano del bloque 5 es ${ultimoDelCinco?.src}`);
  // La canción y las tres tomas son las del reparto.
  const esperadas = { hook: /hk01/, mitad: /md03/, cta: /ct03/ };
  const [h, m, t] = conVoz;
  if (!esperadas.hook.test(h?.src ?? "") || !esperadas.mitad.test(m?.src ?? "") || !esperadas.cta.test(t?.src ?? "")) mal("las tres tomas de Isabella tienen que ser HK01, MD03 y CT03 (reparto fijo)");
  if (fallos.length === n) ok(`${lugares.map((l) => `${l.id.replace(/^c\d+-/, "")} en ${l.lugar}`).join(" · ")} · ni una cifra, dicha o escrita · ningún recorrido de otra pieza · el clímax es RC10`);
}

/* 2b · las reglas fijas del canal que se cumplen ───────────────────────────── */
seccion("2b. reglas fijas del canal: nada arriba, ni cuenta, nunca el sello (y la primera toma, EXCEPCIÓN DECLARADA)");
{
  const n = fallos.length;
  const hook = conVoz[0];
  if (!hook) mal("ninguna toma lleva voz: no hay hook de Isabella");
  else if (bloques.length === 0) mal("no hay ningún subtítulo");
  else if (ABRE_CON_EL_HOOK) {
    // «Que la primer toma siempre salga sin texto»: el usuario pidió abrir con el hook, así que la primera toma ES Isabella hablando y esta regla (la ÚNICA que se rompe) se sustituye por: el texto entra con su
    // palabra (la sección 5 comprueba que cada trozo cae sobre voz).
    const primero = Math.min(...bloques.map((b) => b.trozos[0].desde));
    const { ini } = vozDe(hook);
    if (primero > ini) mal(`el primer texto entra en f${primero}, después de la primera palabra (f${ini}): el hook abre la pieza y su texto sale con su voz`);
    if (primero < ini - HOLGURA_TROZO) mal(`el primer texto entra en f${primero} y su primera palabra suena en f${ini}: el texto no se adelanta más de ${HOLGURA_TROZO} f`);
    console.log(`  ℹ️  EXCEPCIÓN DECLARADA (por encargo del usuario): la primera toma lleva voz (f${ini}) y texto (f${primero}); la regla fija «la primera toma sale sin texto ni voz» no se cumple en esta pieza`);
  } else {
    const primerTexto = Math.min(...bloques.map((b) => b.trozos[0].desde));
    if (primerTexto <= 0) mal(`el primer bloque de texto entra en el frame ${primerTexto}: la miniatura (frame 0) tiene que salir sin texto`);
    if (primerTexto < hook.en) mal(`el primer texto entra en f${primerTexto}, antes de que acabe la primera toma (la imagen de Isabella es opaca en f${hook.en}): la primera toma sale SIEMPRE sin texto`);
    if (vozDe(hook).ini < hook.en + 1) mal(`${hook.id} empieza a hablar en f${vozDe(hook).ini} y su imagen no es opaca hasta f${hook.en}: la primera toma sale sin voz`);
  }
  const hayArriba = bloques.filter((b) => (b.posicion ?? "abajo") !== "abajo");
  if (hayArriba.length) mal(`hay texto arriba o al centro (${hayArriba.map((b) => b.id).join(", ")}): ni hook escrito ni cuenta; solo los subtítulos de Isabella, abajo`);
  if (bloques.some((b) => b.trozos.some((t) => /@/.test(t.texto)))) mal("hay una cuenta de texto (@…) en los subtítulos: el cierre lleva el logo y la web, no la cuenta");
  // NUNCA el sello «PROPIEDADES LUXUR»: ni se importa ni se monta ni se escribe a mano.
  const fuente = readFileSync(join(RAIZ, "remotion", "src", "proyectos", "048", "Recorrido048.tsx"), "utf8");
  const sinComentarios = fuente.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
  if (/SelloCampana/.test(sinComentarios)) mal("la composición usa `SelloCampana`: el sello «PROPIEDADES LUXUR» no se pone NUNCA");
  if (/PROPIEDADES LUXUR/.test(sinComentarios)) mal("la composición escribe «PROPIEDADES LUXUR» a mano: el sello no se pone NUNCA");
  if (!/sinSubtitulos/.test(sinComentarios)) mal("la composición no acepta `sinSubtitulos`: es la base de la versión con ficha (`ficha-luxur`)");
  if (fallos.length === n) {
    ok(`la pieza ABRE con el hook (excepción declarada): su primer subtítulo entra en f${Math.min(...bloques.map((b) => b.trozos[0].desde))}, con su voz · nada arriba y ninguna cuenta · sin sello (no se usa \`SelloCampana\`) · acepta \`sinSubtitulos\``);
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
  const fuente = readFileSync(join(RAIZ, "remotion", "src", "proyectos", "048", "Recorrido048.tsx"), "utf8");
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
  if (tarjeta.dur !== CI.DUR_TARJETA) mal(`${tarjeta.id} dura ${tarjeta.dur} f y cierre-048.ts dice ${CI.DUR_TARJETA}`);
  if (tarjeta.dur < TARJETA_FRAMES[0] || tarjeta.dur > TARJETA_FRAMES[1]) mal(`la tarjeta dura ${tarjeta.dur} f (entre ${TARJETA_FRAMES[0]} y ${TARJETA_FRAMES[1]}): la web se lee, sin quedarse muerto`);
  const rutaTarjeta = join(PUBLICO, CI.TARJETA);
  if (!existsSync(rutaTarjeta)) mal(`no existe remotion/public/${CI.TARJETA} (node proyectos/048/normalizar.mjs)`);
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
    if (!existsSync(join(PUBLICO, c.audio))) return mal(`${c.id}: no existe remotion/public/${c.audio} (node proyectos/048/normalizar.mjs)`);
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

/* 4 · la música ────────────────────────────────────────────────────────── */
seccion("4. la música: «L' Amour Toujours on SAXOPHONE», cada corte seco en un golpe medido y apagada bajo la tarjeta");
const ventanasDeVoz = conVoz.filter((c) => c.voz).map((c) => ({ id: c.id, ...vozDe(c) }));
{
  const n = fallos.length;
  for (const a of T.revisaAudio(A.audio048, { fps, duracion: DURACION })) mal(`revisaAudio: ${a}`);
  for (const t of A.audio048) {
    if (!existsSync(join(PUBLICO, t.src))) {
      mal(`${t.id}: no existe remotion/public/${t.src}`);
      continue;
    }
    if (t.bucle) continue;
    const hasta = (Math.round((t.desde ?? 0) * fps) + t.dur) / fps;
    const dura = duracionDe(t.src);
    if (hasta > dura + 1 / fps) mal(`${t.id}: se lee hasta ${hasta.toFixed(2)} s y ${t.src} dura ${dura.toFixed(2)} s`);
  }
  if (A.off048.length) mal("esta pieza no lleva voz en off: `off048` tiene que ir vacío");
  const musica = A.audio048.find((t) => t.id === "musica");
  const cta = byId("c09-cta");
  if (!musica || musica.src !== "recorrido-048/musica-048.wav") mal("no suena «L' Amour Toujours on SAXOPHONE» (recorrido-048/musica-048.wav)");
  else {
    if (Math.abs(musica.desde - M.INICIO_MUSICA) > 1e-9) mal(`la música arranca en ${musica.desde} s y INICIO_MUSICA dice ${M.INICIO_MUSICA}`);
    // Una sola canción, del frame 0 hasta FIN_MUSICA_048: se apaga con curva tras la última palabra del CTA y llega a cero 2 f antes del final de la pieza (la tarjeta va en silencio).
    if (A.audio048.filter((t) => /musica/.test(t.src)).length !== 1) mal("hay más de un tramo de música: el encargo es una sola canción de principio a fin");
    if (musica.en !== 0 || musica.dur !== M.FIN_MUSICA_048) mal(`la música ocupa f${musica.en}-${musica.en + musica.dur} y tiene que ir de 0 a FIN_MUSICA_048 (f${M.FIN_MUSICA_048})`);
    if (M.FIN_MUSICA_048 !== DURACION - 2) mal(`la música acaba en f${M.FIN_MUSICA_048} y la pieza en f${DURACION}: tiene que acabar 2 f antes`);
    const g = Array.isArray(musica.ganancia) ? musica.ganancia : [];
    const ultimoPunto = g.at(-1);
    if (!ultimoPunto || ultimoPunto[0] !== M.FIN_MUSICA_048 || ultimoPunto[1] !== 0) mal(`la envolvente de la música no acaba en silencio en f${M.FIN_MUSICA_048}`);
    // Ninguna ganancia que suba: la canción sobra de nivel en toda la pieza (−9,4 a −10,7 LUFS) y se BAJA a −15; el pico real queda por debajo de −0,5 dBFS en cada tramo.
    for (const [clave, alto] of Object.entries(A.ALTOS)) if (alto > 1.0) mal(`el tramo «${clave}» de la música SUBE (×${alto.toFixed(3)}): la canción ya está por encima de −15 LUFS`);
    const ultimaPalabra = vozDe(cta).fin;
    const nivelFin = T.volumenDe(musica, DURACION - 1 - musica.en);
    const nivelUltima = T.volumenDe(musica, ultimaPalabra - musica.en);
    if (!(nivelUltima > 0 && nivelFin < nivelUltima * 0.05)) mal(`la música no se apaga tras la última palabra del CTA (f${ultimaPalabra}): ×${nivelUltima.toFixed(3)} → ×${nivelFin.toFixed(3)} al final`);
  }
  // La canción NO tiene pulso fijo que cuente: la rejilla son los GOLPES MEDIDOS (`musica/golpes-048.json`, de `medir-pista.py --json`). Cada GOLPE de metraje-048.ts tiene que estar ahí (±4 ms y ±0,5 dB) y cada corte
  // SECO (y cada entrada de Isabella a corte) tiene que entrar en el suyo, a ≤ 1 f de donde SUENA. Las disolvencias van libres (`recorrido-luxur`: 037).
  const medidos = JSON.parse(readFileSync(join(RAIZ, "proyectos", "048", "musica", "golpes-048.json"), "utf8")).golpes;
  const DE = {
    "c03-gimnasio": "gimnasio",
    "c04-piscina": "piscina",
    "c05-mitad": "mitad",
    "c07-bano": "bano",
    "c09-cta": "cta",
  };
  const enMedidos = (clave) => {
    const gp = M.GOLPE[clave];
    const real = medidos.find((x) => Math.abs(x.t - gp.t) <= 0.004);
    if (!real) mal(`el golpe «${clave}» (${gp.t} s de la canción) no está entre los medidos (musica/golpes-048.json)`);
    else if (Math.abs(real.db - gp.db) > 0.5) mal(`el golpe «${clave}» mide ${real.db} dB y metraje-048.ts dice ${gp.db}`);
    return gp;
  };
  const filas = [];
  let debil = Infinity;
  for (const c of cortes) {
    if (c.tipo === "foto" || (c.entra ?? "corte") === "disolver" || c.en === 0) continue;
    const clave = DE[c.id];
    if (!clave) {
      mal(`${c.id}: entra a corte y no tiene golpe en la tabla de esta puerta (DE): cada corte seco entra en un golpe medido de la canción`);
      continue;
    }
    const gp = enMedidos(clave);
    const d = c.en - M.golpeExacto(gp.t);
    if (Math.abs(d) > TOLERANCIA_GOLPE) mal(`${c.id} entra en f${c.en} y el golpe «${clave}» suena en f${M.golpeExacto(gp.t).toFixed(1)} (${d >= 0 ? "+" : ""}${d.toFixed(1)} f)`);
    if (gp.db < FUERZA_MIN_CORTE_SECO) mal(`${c.id}: entra a corte en un golpe de ${gp.db} dB y el mínimo es ${FUERZA_MIN_CORTE_SECO}`);
    debil = Math.min(debil, gp.db);
    filas.push(`${clave} ${gp.db}`);
  }
  for (const c of cortes) if (c.tipo !== "foto" && (c.entra ?? "corte") === "disolver" && DE[c.id]) mal(`${c.id} entra con disolvencia y está en la tabla de golpes: sobra (las disolvencias van libres)`);
  // La nota de apertura suena en los primeros 4 f (el audio del render llega 42 ms tarde: no puede sonar en el 0 exacto) y es de las más fuertes que da la entrada.
  enMedidos("apertura");
  const apertura = M.golpeExacto(M.GOLPE.apertura.t);
  if (apertura < 0 || apertura > 4) mal(`la nota de entrada de la canción suena en f${apertura.toFixed(1)}: el frame 0 abre con ella, en los primeros 4 f`);
  if (M.GOLPE.apertura.db < FUERZA_MIN_APERTURA) mal(`la nota de entrada mide ${M.GOLPE.apertura.db} dB: el mínimo son ${FUERZA_MIN_APERTURA}`);
  if (fallos.length === n) {
    ok(`«L' Amour Toujours» desde el ${M.INICIO_MUSICA.toFixed(3)} s, una sola canción · nota de apertura en f${apertura.toFixed(1)} (${M.GOLPE.apertura.db} dB) · ${filas.length} cortes secos en golpes MEDIDOS a ≤ ${TOLERANCIA_GOLPE} f, el más débil de ${debil} dB (${filas.join(" · ")}) · las disolvencias van libres · se apaga bajo la tarjeta y ningún tramo sube`);
  }
}

/* 4b · la música baja cuando habla Isabella ─────────────────────────────── */
seccion("4b. la música baja bajo su voz, con curva y antes de que hable");
{
  const n = fallos.length;
  const musica = A.audio048.find((t) => t.id === "musica");
  const nivel = (f) => T.volumenDe(musica, f - musica.en);
  // La canción cambia de nivel a lo largo de la pieza y cada tramo SIN voz lleva su ganancia (`ALTOS`: la apertura, el paseo y el bloque 5); bajo la voz, la de cada ventana (`BAJOS`, −26 LUFS).
  const ALTO_ANTES = { "c01-hook": A.ALTOS.apertura, "c05-mitad": A.ALTOS.paseo, "c09-cta": A.ALTOS.bloque5 }; // el nivel «solo» del tramo anterior a la toma
  const ALTO_DESPUES = { "c01-hook": A.ALTOS.paseo, "c05-mitad": A.ALTOS.bloque5 }; // el nivel «solo» al que sube tras ella
  const SIGUIENTE_CORTE = { "c01-hook": "c03-gimnasio", "c05-mitad": "c07-bano" }; // el primer corte SECO tras ella: ahí la música ya tiene que estar arriba
  const filas = [];
  let techoLufs = -Infinity;
  for (const v of ventanasDeVoz) {
    // En CADA frame de la ventana de voz la música está en su nivel bajo (la ganancia absoluta de su ventana).
    let peor = 0;
    for (let f = v.ini; f <= v.fin; f++) peor = Math.max(peor, nivel(f));
    const bajo = A.BAJOS[v.id];
    if (peor > bajo * 1.02) mal(`${v.id}: durante su voz (f${v.ini}-${v.fin}) la música llega a ×${peor.toFixed(3)} y su nivel bajo es ×${bajo.toFixed(3)}: la curva tiene que haber acabado antes de que hable`);
    techoLufs = Math.max(techoLufs, A.LUFS_CANCION_EN_VOZ[v.id] + 20 * Math.log10(peor)); // la canción medida EN esa ventana (la parte plana: el fundido final cae tras la última palabra)
    // …y SUBE de nuevo con fundido: tiene que estar arriba en el primer corte seco que sigue.
    const destino = SIGUIENTE_CORTE[v.id];
    if (destino) {
      const sig = byId(destino);
      if (nivel(sig.en) < ALTO_DESPUES[v.id] * 0.9) mal(`${v.id}: en el corte siguiente (${sig.id}, f${sig.en}) la música está a ×${nivel(sig.en).toFixed(3)} y su nivel «solo» es ×${ALTO_DESPUES[v.id].toFixed(3)}; tiene que haber vuelto arriba`);
    }
    filas.push(`${v.id.replace(/^c\d+-/, "")} ${(20 * Math.log10(peor)).toFixed(1)} dB sobre el archivo`);
  }
  // En absoluto: la música bajo la voz queda ≥ 9 LU por debajo de ella (−15 LUFS) en TODO su recorrido.
  const bajoVoz = M.OBJETIVO_LUFS - techoLufs;
  if (bajoVoz < 9) mal(`bajo la voz la música llega a ${techoLufs.toFixed(1)} LUFS, ${bajoVoz.toFixed(1)} LU bajo ella (${M.OBJETIVO_LUFS}); tiene que ser ≥ 9 LU en TODO su recorrido`);
  // La nota de apertura suena a su nivel «solo»; el golpe de cada entrada de Isabella a corte (mitad y CTA) suena entero y la música baja DESPUÉS, antes de su primera palabra.
  const aperturaF = Math.round(M.golpeExacto(M.GOLPE.apertura.t));
  if (nivel(aperturaF) < A.ALTOS.apertura * 0.9 || nivel(aperturaF + 1) < A.ALTOS.apertura * 0.9) mal(`la nota de apertura (f${aperturaF}) no suena a su nivel: la música ya está baja o aún no ha subido`);
  for (const id of ["c05-mitad", "c09-cta"]) {
    const c = byId(id);
    if (nivel(c.en) < ALTO_ANTES[id] * 0.9) mal(`${id}: la música ya está baja en el golpe de su entrada (f${c.en}): el golpe tiene que sonar entero y la música bajar DESPUÉS`);
    if (nivel(c.en + 4) > nivel(c.en)) mal(`${id}: la música SUBE tras el golpe de su entrada`);
  }
  // La curva de cada bajada acaba ANTES de la primera palabra (con ≥ 1 f de margen) y dura lo que dice `A.FADE_OUT`. El hook baja desde `HOOK_BAJADA_DESDE` (la nota del f3 suena entera); la mitad y el CTA, desde el golpe.
  const hook = byId("c01-hook");
  const vh = ventanasDeVoz.find((x) => x.id === "c01-hook");
  if (nivel(hook.en + 1) < A.ALTOS.apertura * 0.9 || nivel(A.HOOK_BAJADA_DESDE) < A.ALTOS.apertura * 0.9) mal("c01-hook: la música ya está baja cuando suena la nota de apertura");
  if (A.HOOK_BAJADA_DESDE + A.FADE_OUT.hook > vh.ini - 1 + 1e-9) mal(`c01-hook: la bajada de la música acaba en f${A.HOOK_BAJADA_DESDE + A.FADE_OUT.hook} y su primera palabra suena en f${vh.ini}: tiene que acabar ≥ 1 f antes`);
  for (const [id, clave] of [["c05-mitad", "mitad"], ["c09-cta", "cta"]]) {
    const c = byId(id);
    const v = ventanasDeVoz.find((x) => x.id === id);
    const fin = c.en + A.FADE_OUT[clave];
    if (fin > v.ini - 1 + 1e-9) mal(`${id}: la bajada de la música acaba en f${fin} y su primera palabra suena en f${v.ini}: tiene que acabar ≥ 1 f antes`);
    if (nivel(v.ini) > A.BAJOS[id] * 1.02) mal(`${id}: la música aún no ha bajado cuando entra su primera palabra (f${v.ini}): la curva tiene que acabar ANTES de que hable`);
  }
  if (fallos.length === n) ok(`la música baja a ${filas.join(" · ")} durante su voz, a ${techoLufs.toFixed(1)} LUFS como mucho: ${bajoVoz.toFixed(1)} LU bajo ella · la nota de apertura suena entera y baja con fundido de ${FADE_OUT_MUSICA[0]} f antes de la primera palabra; el golpe de la mitad y el del CTA suenan enteros y la música baja con fundido de ${FADE_OUT_MUSICA[1]} · ${FADE_OUT_MUSICA[2]} f (sube con fundido tras su última palabra)`);
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
  const acentos = bloques.reduce((s, b) => s + b.trozos.filter((t) => t.estilo === "acento").length, 0);
  if (fallos.length === n) ok(`${bloques.length} bloques, ${acentos} acentos · validador sin avisos con las letras del canal · nada encima de Isabella · el dato solo en el bloque 3 · ${usadas.size} sin voz, declarados`);
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
  const carpetas = [join(RAIZ, "remotion", "src", "proyectos", "048"), join(RAIZ, "proyectos", "048", "voz")];
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

puerta.cierra(`el 048 pasa la puerta: ${cortes.length} planos, ${bloques.length} bloques de texto, ${A.audio048.length} tramos de audio`);
