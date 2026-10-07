#!/usr/bin/env node
/**
 * PUERTA DEL 020 — «Los Patios · apto 501», CUARTA versión, recorrido con presentadora.
 *
 *   node proyectos/020/revisar-020.mjs            (durante el montaje)
 *   node proyectos/020/revisar-020.mjs --final    (antes de exportar: un «POR CONFIRMAR» en los planos es un fallo)
 *
 * Las comprobaciones del FORMATO salen de `revisar-metraje.mjs` (línea de tiempo, metraje, tramos, encuadre, color).
 * Encima, lo propio de esta pieza y de las reglas fijas del canal, que ningún frame enseña:
 *
 *   2.  la ESTRUCTURA: los seis bloques en orden, la CALLE (RC22) como primer plano (frame 0, sola, a corte, sin voz y UNA vez), el DRON como
 *      ÚLTIMO plano del bloque 5 (la recompensa antes del CTA, y solo uno), Isabella tres veces (hook, mitad, CTA) y UNA toma por bloque, la
 *      vista como último plano antes del CTA y el total dentro del tope.
 *   2b. las TRES TOMAS: en tres sitios distintos (la sala de bloques, el patio y el espacio abierto: el paseo va en el sentido I, entrada →
 *      terraza) y SIN cifras (el formato admite una sola, y nunca en los bloques 5 y 6). Informa de qué sitio repite el de otra versión en el mismo bloque.
 *   2c. la PRIMERA TOMA SALE SIN TEXTO (regla fija del canal: ni hook escrito ni subtítulos, y por tanto sin voz:
 *      ningún bloque entra antes de que la imagen de Isabella sea opaca); ni cuenta `@propiedadesluxur` ni nada
 *      arriba; y la pieza NO lleva el sello «PROPIEDADES LUXUR» (no se importa `SelloCampana`).
 *   2d. el CIERRE: el logo a 440 px y 60 % de opacidad (40 % de transparencia); NADA SE CONGELA (la imagen de
 *      Isabella funde a negro y llega a negro exacto en su último fotograma); y la TARJETA OSCURA con la web
 *      `PropiedadesLuxur.com` (su texto exacto, que cabe, dentro de las zonas seguras y que se lee entera).
 *   2e. el COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`), dentro de lo que el efecto admite
 *      y de los topes de la pieza (nada de `vibrance` alto, exposiciones moderadas, la piel de Isabella donde estaba);
 *      la tarjeta del cierre no; y dos planos seguidos del mismo clip llevan el mismo color.
 *   3.  la VOZ de HK03, MD14 y CT06: su WAV, ninguna palabra dentro de un fundido ni de un desclic, la ganancia por
 *      toma, y la COLA de la pieza (45-90 f desde la última palabra del CTA hasta el final).
 *   4.  el HOOK: su imagen es opaca ANTES de su primera palabra (no habla sobre la calle) y el golpe en que acaba su disolvencia suena antes de su voz.
 *   5.  la MÚSICA y los GOLPES: «Sax for the Last Customer» (jazz) NO tiene pulso (va por golpes de nota), así que no hay recta: cada plano entra en un GOLPE
 *      MEDIDO de la canción (`musica/golpes-020.json`, de `medir-pista.py --json`) a ≤ 1 f; los cortes secos, en golpes de ≥ 7,4 dB; y su ACORDE FINAL (la resolución,
 *      20,9 dB en 176,986 s) cae después de la última palabra del CTA y antes de la tarjeta, con la música a su nivel «solo».
 *   6.  la música BAJA bajo la voz: en el hook, la mitad y el CTA (−16 dB: siempre ≥ 9 LU bajo ella), y sube antes del golpe siguiente y del acorde final.
 *   7.  los SUBTÍTULOS: validador sin avisos con las letras del canal, cada trozo sobre una palabra dicha, todos
 *      abajo, nada encima de Isabella, a 90 % de opacidad y la cursiva 8 px más pequeña, como en el 017, el 018 y el 019.
 *   8-10. el formato: metraje disponible, tramos disjuntos, encuadre.
 *   9b. INFORMA (no falla) de qué metraje comparte con la V1 (017), la V2 (018) y la V3 (019): repetir un plano entre versiones es una decisión,
 *      y aquí se ve; en el 020 no se espera ninguno.
 *   11. NADA «POR CONFIRMAR» en los planos ni en los guiones de voz: avisa durante el montaje y FALLA con `--final`.
 *
 * Carga los módulos TypeScript DE VERDAD (`abrePuerta` → esbuild): lo que mide es lo que se renderiza. Sale con 1 si algo falla.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ejecutar } from "../../herramientas/comun.mjs";
import { abrePuerta, cargaTs, duracionDe, PUBLICO, RAIZ } from "../../remotion/src/motor/metraje/revisar-metraje.mjs";

const TECHO_ZOOM = 1.2; // clips normalizados a 1296 px = 1080 × 1,2
const TOPE_SEGUNDOS = 55; // el formato apunta a 45-50 s; pasado de aquí ya es otra pieza
const MARGEN_FUNDIDO = 2; // f entre la última palabra y el inicio de la disolvencia del siguiente
const COLA_FINAL = [45, 90]; // f desde la última palabra del CTA hasta el final: la tarjeta con el logo y la web se lee, sin quedarse muerto
const TARJETA_FRAMES = [45, 75]; // f que dura la tarjeta oscura del cierre (1,5-2,5 s)
const HOLGURA_TROZO = 3; // f que un trozo puede adelantarse a su palabra
const TOLERANCIA_GOLPE = 1; // f entre el `en` de un plano y el frame en que suena el golpe de la canción en que entra
const FUERZA_MIN_CORTE_SECO = 7.4; // dB por 15 ms: un corte seco cae en un golpe de al menos esto (el más flojo del 018 fue de 7,5)
const FUERZA_MIN_DISOLVER = 9; // dB: la disolvencia ACABA en un golpe; que sea de los fuertes
const CAIDA_MIN_DB = 12; // dB que cae la canción en ≤ 40 f desde que entra el CTA
const OPACIDAD_PEDIDA = 0.9; // «subtítulos… con opacidad al 90 %»
const ACENTO_MENOS_PEDIDO = 8; // revisión 5: «reduce el tamaño de la cursiva 8px» (px de la composición)
const BLOQUES = [1, 2, 3, 4, 5, 6];
/**
 * Los topes del color de ESTA pieza (revisión 7), salidos de graduarla y medirla, no del efecto: el
 * efecto admite más, pero pasado de aquí el fallo solo se ve en planos concretos. `vibrance` por encima
 * de 0,05 pintó un moteado de colores sobre el hormigón gris y volvió rosadas las nubes; una exposición
 * de más de ±0,4 pasos ya no es un ajuste sino otro clip mal expuesto (se vuelve a medir); la saturación
 * global se queda entre 0,95 y 1,12 (la viveza que se ve es +10 %, no +40 %).
 */
const TOPES_COLOR = { vibrance: 0.05, exposure: 0.4, contrast: 1.15, highlightsMin: -0.6, saturation: [0.95, 1.12] };
/** Las tomas de Isabella: la piel se queda donde estaba (saturación apenas sobre 1, balance sin tirar de cálido ni de frío). */
const TOPES_PIEL = { saturationMax: 1.06, temperature: 0.06 };

/**
 * Bloques de subtítulos que NO acompañan a una palabra dicha, y por qué. Una
 * excepción que sobra tumba la puerta. Ninguno: desde la revisión 4 todo el texto
 * de la pieza es lo que dice Isabella (el hook escrito y la cuenta de texto se quitaron).
 */
const SIN_VOZ = {};

const puerta = await abrePuerta({
  proyecto: "020",
  plan: "remotion/src/proyectos/020/metraje-020.ts",
  cortes: "metraje020",
  receta: "node proyectos/020/normalizar.mjs",
  extras: {
    audio: "remotion/src/proyectos/020/audio-020.ts",
    subtitulos: "remotion/src/proyectos/020/subtitulos-020.ts",
    tramos: "remotion/src/motor/sound/tramos.ts",
    editorial: "remotion/src/motor/subtitulos-editoriales.ts",
    marca: "remotion/src/marcas/luxur.ts",
    cierre: "remotion/src/proyectos/020/cierre-020.ts",
  },
}).catch((e) => {
  console.log(`\n❌ el plan del 020 no carga: ${e.message}\n`);
  process.exit(1);
});
const { cortes, fps, fallos, mal, ok, seccion } = puerta;
const M = puerta.plan;
const F = puerta.modulos.formato;
const A = puerta.modulos.audio;
const T = puerta.modulos.tramos;
const E = puerta.modulos.editorial;
const bloques = puerta.modulos.subtitulos.subtitulos020;
const DURACION = M.DURACION_020;
const CANAL = puerta.modulos.marca.LUXUR;
const byId = (id) => cortes.find((c) => c.id === id);
const F_DURACION = (src) => duracionDe(src);

/* 1 · línea de tiempo ───────────────────────────────────────────────────── */
seccion("1. línea de tiempo");
puerta.lineaDeTiempo({ duracion: DURACION });

/** La voz de un corte en frames de la COMP (la misma cuenta que `frameDeFuente`). */
const vozDe = (c) => ({
  ini: T.frameDeFuente(c.en, c.desde, c.voz.s0, fps),
  fin: T.frameDeFuente(c.en, c.desde, c.voz.s1, fps),
});
const conVoz = cortes.filter((c) => c.audio);
/** Todas las ventanas de voz de Isabella: las de las tres tomas que traen `audio` (hook, mitad y CTA). */
const ventanasDeVoz = conVoz.map((c) => ({ id: c.id, ...vozDe(c) }));

/* 2 · estructura ────────────────────────────────────────────────────────── */
seccion("2. la estructura del recorrido");
{
  const n = fallos.length;
  const primero = cortes[0];
  if (primero.bloque !== 1) mal(`${primero.id}: el primer plano es del bloque ${primero.bloque}; la pieza abre con la casa (bloque 1)`);
  if (primero.audio) mal(`${primero.id}: el primer plano lleva voz: la primera toma sale sin texto y Isabella no habla sobre la calle`);
  if ((primero.entra ?? "corte") !== "corte") mal(`${primero.id}: entra con «${primero.entra}»; el frame 0 es la miniatura y no nace de un fundido`);
  if (!/rc22\.mp4$/.test(primero.src)) mal(`${primero.id}: ${primero.src} no es RC22 «Exterior edificio»: esta versión abre por la calle (la V3 abrió con RC25 y la V1 y la V2 con un dron)`);
  if (cortes.slice(1).some((c) => /rc22\.mp4$/.test(c.src))) mal("RC22 sale en la apertura y no se repite en el recorrido");
  // El dron: UNO, como ÚLTIMO plano del bloque 5 (la recompensa antes del CTA) y después del hook: ni en el frame 0 (V1, V2) ni tras el hook (V3).
  const drones = cortes.filter((c) => /dr\d+\.mp4$/.test(c.src));
  const ultimoDeLaRecompensa = cortes.filter((c) => c.bloque === 5).at(-1);
  if (drones.length !== 1) mal(`hay ${drones.length} planos de dron; esta versión lleva UNO, el último del bloque 5`);
  else if (drones[0] !== ultimoDeLaRecompensa) mal(`el dron (${drones[0].id}) tiene que ser el ÚLTIMO plano del bloque 5 (que cierra ${ultimoDeLaRecompensa?.id}): la recompensa antes del CTA`);
  else if (cortes.indexOf(drones[0]) < cortes.findIndex((c) => c.bloque === 2)) mal("el dron va antes que el hook");
  cortes.forEach((c, i) => {
    if (!BLOQUES.includes(c.bloque)) mal(`${c.id}: bloque ${c.bloque}; esta pieza lleva los bloques ${BLOQUES.join(", ")}`);
    if (i > 0 && c.bloque < cortes[i - 1].bloque) mal(`${c.id}: bloque ${c.bloque} después del ${cortes[i - 1].bloque}; los bloques van en orden`);
    if (c.audio && !c.voz) mal(`${c.id}: tiene \`audio\` pero no \`voz\` (s0, s1, lufs medidos con limites-voz.py)`);
    if (!c.reason || c.reason.trim().length < 15) mal(`${c.id}: sin \`reason\`; cada plano dice qué hace ahí (situar, revelar, mover, emocionar…) o sobra (viaje-emocional.md §4)`);
    if ((c.velocidad ?? 1) !== 1 && c.bloque !== 3) mal(`${c.id}: velocidad ${c.velocidad} en el bloque ${c.bloque}; solo se acelera la aproximación (bloque 3)`);
  });
  for (const b of BLOQUES) if (!cortes.some((c) => c.bloque === b)) mal(`falta el bloque ${b}`);
  // Isabella, tres veces y en tres bloques distintos: hook (2), mitad (4) y CTA (6), UNA toma cada vez.
  const bloquesConVoz = conVoz.map((c) => c.bloque).sort();
  if (JSON.stringify(bloquesConVoz) !== JSON.stringify([2, 4, 6])) mal(`las tomas con \`audio\` tienen que ser UNA en cada uno de los bloques 2, 4 y 6; son ${bloquesConVoz.join(", ")}`);
  for (const c of conVoz) if (cortes.filter((x) => x.bloque === c.bloque).length !== 1 && c.bloque !== 6) mal(`el bloque ${c.bloque} tiene ${cortes.filter((x) => x.bloque === c.bloque).length} planos; es UNA toma de Isabella`);
  // La recompensa se mira: la vista (el último plano del último recorrido) es el más largo de su bloque.
  const recorrido5 = cortes.filter((c) => c.bloque === 5);
  const vista = recorrido5.at(-1);
  const masLargo = vista && recorrido5.find((c) => c.dur > vista.dur);
  if (masLargo) mal(`${vista.id} (${vista.dur} f) es el clímax y ${masLargo.id} dura más (${masLargo.dur} f); la vista es el plano más largo de su bloque`);
  const antesDelCta = cortes.filter((c) => c.bloque < 6).at(-1);
  if (antesDelCta && antesDelCta.bloque !== 5) mal(`${antesDelCta.id}: el plano anterior al CTA es del bloque ${antesDelCta.bloque}; tiene que ser el último recorrido (bloque 5)`);
  if (cortes.at(-1).bloque !== 6) mal(`${cortes.at(-1).id}: la pieza acaba en el bloque ${cortes.at(-1).bloque}; cierra Isabella con el CTA (bloque 6)`);
  // Una sola canción de principio a fin y ninguna otra capa de música.
  const musicas = A.audio020.filter((t) => /musica/.test(t.src));
  if (musicas.length !== 1) mal(`hay ${musicas.length} tramos de música; el encargo es una sola canción de principio a fin`);
  if (DURACION / fps > TOPE_SEGUNDOS) mal(`${(DURACION / fps).toFixed(1)} s: el formato no pasa de ${TOPE_SEGUNDOS} s`);
  if (fallos.length === n) {
    const porBloque = BLOQUES.map((b) => `b${b} ${(cortes.filter((c) => c.bloque === b).reduce((s, c) => s + c.dur, 0) / fps).toFixed(1)} s`);
    ok(`${cortes.length} planos · ${(DURACION / fps).toFixed(1)} s · ${porBloque.join(" · ")} · Isabella 3 veces (hook, mitad, CTA) · la calle (RC22) en el frame 0, sola y una vez · el dron como último plano del bloque 5 · todos con razón · la vista, el plano más largo de su bloque`);
  }
}

/* 2b · las tres tomas: tres sitios distintos y ninguna cifra ─────────────── */
seccion("2b. las tres tomas de Isabella: tres sitios distintos y ninguna cifra");
{
  const n = fallos.length;
  /**
   * Dónde se grabó cada toma (la etiqueta de lugar del catálogo, `catalogo-material.md` §10.1). El paseo de esta pieza va en el SENTIDO I
   * (entrada → terraza): el hook, en la sala del muro de bloques (la promesa, en el extremo de la entrada); la mitad, en el patio, donde acaba el paseo
   * público del bloque 3; y el CTA, en el espacio abierto, que cruza el umbral hacia el deck (`CTA6` termina en la terraza).
   */
  const LUGAR = { hk03: "INT-BLOQUES", md14: "PATIO", ct06: "INT-ABIERTO" };
  const lugares = conVoz.map((c) => {
    const codigo = /recorrido-020\/([a-z0-9]+)\.wav$/.exec(c.audio)?.[1];
    return { id: c.id, codigo, lugar: LUGAR[codigo] };
  });
  for (const l of lugares) if (!l.lugar) mal(`${l.id}: la toma «${l.codigo}» no está en la tabla de lugares de esta puerta (LUGAR)`);
  const distintos = new Set(lugares.map((l) => l.lugar));
  if (distintos.size !== lugares.length) mal(`Isabella sale dos veces en el mismo sitio (${lugares.map((l) => `${l.id}: ${l.lugar}`).join(", ")}): dos tomas del mismo decorado seguidas son un salto de decorado`);
  // Sentido I: el hook, en el extremo de la entrada (la sala de bloques); el CTA, en el espacio abierto o en el deck, por donde acaba el paseo; la mitad, en el patio o la terraza.
  const [lHook, lMitad, lCta] = lugares.map((l) => l.lugar);
  if (!["INT-BLOQUES", "ENTRADA", "INT-VENTANAL", "INT-ABIERTO"].includes(lHook)) mal(`el hook está en ${lHook}: en el sentido I (entrada → terraza) la promesa va en el interior`);
  if (!["PATIO", "TERRAZA", "BARANDA"].includes(lMitad)) mal(`la mitad está en ${lMitad}: en el sentido I el paseo público acaba en el deck (PATIO, TERRAZA o BARANDA)`);
  if (!["INT-ABIERTO", "TERRAZA", "PATIO", "BALCON", "INT-BLOQUES"].includes(lCta)) mal(`el CTA está en ${lCta}: no es un sitio previsto del paseo`);
  // «Una sola cifra, y nunca en los bloques 5 y 6»: esta pieza no lleva ninguna, ni dicha ni escrita.
  for (const c of conVoz) if (/\d/.test(c.voz.dice)) mal(`${c.id}: «${c.voz.dice}» lleva una cifra; esta versión no cuenta números (el precio y los 317 m² no entran)`);
  for (const b of bloques) for (const t of b.trozos) if (/\d/.test(t.texto)) mal(`[${b.id}] «${t.texto}» lleva una cifra`);
  // INFORMA (no falla): qué sitio repite el de otra versión en el MISMO bloque. Repetirlo es una decisión que se declara (`analisis-uso.md`, `combinaciones.md`).
  const ANTES = {
    hook: { "V1 (017)": "INT-ABIERTO", "V2 (018)": "PATIO", "V3 (019)": "BARANDA" },
    mitad: { "V1 (017)": "INT-ABIERTO", "V2 (018)": "TERRAZA", "V3 (019)": "TERRAZA" },
    cta: { "V1 (017)": "TERRAZA", "V2 (018)": "BALCON", "V3 (019)": "INT-BLOQUES" },
  };
  for (const [bloque, lugar] of [["hook", lHook], ["mitad", lMitad], ["cta", lCta]]) {
    for (const [version, lugarAntes] of Object.entries(ANTES[bloque])) {
      if (lugarAntes === lugar) console.log(`  ℹ️  ${bloque}: ${lugar} es también el sitio de la ${version} en ese bloque`);
    }
  }
  if (fallos.length === n) ok(`${lugares.map((l) => `${l.id.replace(/^c\d+-/, "")} en ${l.lugar}`).join(" · ")} · tres sitios distintos, el paseo en el sentido I · ni una cifra, dicha o escrita`);
}

/* 2c · las reglas fijas del canal: sin texto en la primera toma, sin sello ─────── */
seccion("2c. reglas fijas del canal: la primera toma sin texto, ni cuenta ni nada arriba, y nunca el sello");
{
  const n = fallos.length;
  const c01 = cortes[0];
  const c02 = byId("c02-hook");
  // «Que la primer toma siempre salga sin texto»: ningún bloque de texto entra mientras se ve la primera toma.
  // La primera toma se ve hasta que la imagen siguiente es opaca (su `en`); el texto de Isabella entra cuando ella ya habla.
  if (bloques.length === 0) mal("no hay ningún subtítulo");
  else {
    const primero = bloques[0].trozos[0].desde;
    if (primero <= 0) mal(`el primer bloque de texto entra en el frame ${primero}: la miniatura (frame 0) tiene que salir sin texto`);
    if (primero < c02.en) mal(`el primer texto entra en f${primero}, antes de que acabe la primera toma (la imagen de Isabella es opaca en f${c02.en}): la primera toma sale SIN texto`);
  }
  const hayArriba = bloques.filter((b) => (b.posicion ?? "abajo") !== "abajo");
  if (hayArriba.length) mal(`hay texto arriba o al centro (${hayArriba.map((b) => b.id).join(", ")}): el hook escrito y la cuenta se quitaron; solo quedan los subtítulos de Isabella, abajo`);
  const hayCuenta = bloques.some((b) => b.trozos.some((t) => /@/.test(t.texto)));
  if (hayCuenta) mal("hay una cuenta de texto (@…) en los subtítulos: el cierre lleva el logo y la web, no la cuenta");
  // Isabella no habla sobre la fachada: su imagen es opaca ANTES de su primera palabra (si no, habría voz sobre una toma que sale sin texto, y sus subtítulos).
  const { ini } = vozDe(c02);
  if (ini < c02.en + 1) mal(`el hook empieza a hablar en f${ini} y su imagen no es opaca hasta f${c02.en}`);
  // El sello «PROPIEDADES LUXUR» no se pone NUNCA: ni se importa ni se monta.
  const fuente = readFileSync(join(RAIZ, "remotion", "src", "proyectos", "020", "Recorrido020.tsx"), "utf8");
  const sinComentarios = fuente.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
  if (/SelloCampana/.test(sinComentarios)) mal("la composición usa `SelloCampana`: el sello «PROPIEDADES LUXUR» no se pone NUNCA (regla fija del canal)");
  if (/PROPIEDADES LUXUR/.test(sinComentarios)) mal("la composición escribe «PROPIEDADES LUXUR» a mano: el sello no se pone NUNCA");
  if (fallos.length === n) {
    ok(`la primera toma (${c01.id}, f0-${c02.en}) sale SIN texto: el primer subtítulo entra en f${bloques[0].trozos[0].desde} · nada arriba y ninguna cuenta · sin sello (no se usa \`SelloCampana\`)`);
  }
}

/* 2d · la revisión 6: el cierre, sin congelar ───────────────────────────── */
seccion("2d. el cierre: el logo pequeño y al 60 %, nada se congela, y la tarjeta oscura con la web");
{
  const n = fallos.length;
  const CI = puerta.modulos.cierre;
  const cta = byId("c10-cta");
  const tarjeta = cortes.at(-1);
  const vistaCuadro = { ancho: 1080, alto: 1920 };
  const letraBase = E.letraSubtitulosDe(CANAL).base;
  const fuente = readFileSync(join(RAIZ, "remotion", "src", "proyectos", "020", "Recorrido020.tsx"), "utf8");
  const sinComentarios = fuente.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
  const png = (ruta) => {
    const b = readFileSync(ruta);
    const esPng = b.length > 26 && b.subarray(1, 4).toString() === "PNG";
    return esPng ? { ancho: b.readUInt32BE(16), alto: b.readUInt32BE(20), color: b[25] } : null;
  };

  // «No dejes que el último fotograma se congele»: el CTA llega a su último fotograma y no se repite; sigue la tarjeta.
  if (tarjeta.id !== "c11-cierre") mal(`el último plano es ${tarjeta.id}: tiene que ser c11-cierre, la tarjeta oscura`);
  if (tarjeta.en !== cta.en + cta.dur) mal(`${tarjeta.id} entra en f${tarjeta.en} y la toma del CTA acaba en f${cta.en + cta.dur}: la tarjeta sigue a la toma sin hueco`);
  const congelados = cortes.filter((c) => c !== tarjeta && (c.tipo === "foto" || /-cola\.mp4$/.test(c.src)));
  if (congelados.length) mal(`se congela un fotograma (${congelados.map((c) => c.id).join(", ")}): el usuario pidió que el último fotograma NO se congele`);
  if (tarjeta.tipo !== "foto" || tarjeta.src !== CI.TARJETA) mal(`${tarjeta.id}: tiene que ser la foto ${CI.TARJETA} (un negro liso), no ${tarjeta.tipo} ${tarjeta.src}`);
  if (tarjeta.dur !== CI.DUR_TARJETA) mal(`${tarjeta.id} dura ${tarjeta.dur} f y cierre-020.ts dice ${CI.DUR_TARJETA}`);
  if (tarjeta.dur < TARJETA_FRAMES[0] || tarjeta.dur > TARJETA_FRAMES[1]) mal(`la tarjeta dura ${tarjeta.dur} f (entre ${TARJETA_FRAMES[0]} y ${TARJETA_FRAMES[1]}): la web se lee, sin quedarse muerto`);
  const rutaTarjeta = join(PUBLICO, CI.TARJETA);
  if (!existsSync(rutaTarjeta)) mal(`no existe remotion/public/${CI.TARJETA} (node proyectos/020/normalizar.mjs)`);
  else {
    const t = png(rutaTarjeta);
    if (!t || t.ancho < 1296 || t.alto < 2304) mal(`${CI.TARJETA} mide ${t ? `${t.ancho}×${t.alto}` : "?"}; tiene que cubrir el cuadro como los clips (1296×2304)`);
    // OSCURA: el máximo de luma de toda la imagen, medido, no supuesto.
    const r = ejecutar("ffmpeg", ["-nostdin", "-v", "error", "-i", rutaTarjeta, "-vf", "signalstats,metadata=print:key=lavfi.signalstats.YMAX:file=-", "-f", "null", "-"]);
    const mY = /YMAX=(\d+)/.exec(r.stdout);
    if (!mY || Number(mY[1]) > 24) mal(`la tarjeta no es oscura: luma máxima ${mY ? mY[1] : "no medible"} (negro = 16; el tope son 24)`);
  }
  // El fundido a negro de la imagen de Isabella: llega a negro EXACTO en el último fotograma de su toma, y empieza cuando ella casi ha acabado.
  const ultimaDeIsabella = cta.en + cta.dur - 1;
  if (!(CI.FUNDIDO_A_OSCURO >= 4 && CI.FUNDIDO_A_OSCURO <= 8)) mal(`FUNDIDO_A_OSCURO = ${CI.FUNDIDO_A_OSCURO} f; entre 4 y 8: más largo se come su última palabra, más corto es un parpadeo`);
  if (ultimaDeIsabella - CI.FUNDIDO_A_OSCURO < vozDe(cta).fin - 6) mal(`el fundido a negro empieza en f${ultimaDeIsabella - CI.FUNDIDO_A_OSCURO}, más de 6 f antes de que ella acabe de hablar (f${vozDe(cta).fin})`);
  if (!/<FundidoACierre\s*\/>/.test(sinComentarios) || !/interpolate\(frame,\s*\[ULTIMA_DE_ISABELLA\s*-\s*FUNDIDO_A_OSCURO,\s*ULTIMA_DE_ISABELLA\]/.test(sinComentarios)) {
    mal("el fundido a negro no está montado, o su rampa no acaba en el último fotograma de Isabella (`<FundidoACierre />`)");
  }
  // El logo: más pequeño que en la rev. 5 («un poco»: entre el 65 y el 95 % de lo que era) y al 60 % de opacidad (40 % de transparencia).
  const razon = CI.LOGO_ANCHO / CI.LOGO_ANCHO_REF;
  if (!(razon >= 0.65 && razon <= 0.95)) mal(`el logo mide ${CI.LOGO_ANCHO} px de ancho (${(razon * 100).toFixed(0)} % de los ${CI.LOGO_ANCHO_REF} de la rev. 5): «un poco más pequeño» es entre el 65 y el 95 %`);
  if (Math.abs(CI.LOGO_TRANSPARENCIA - 0.4) > 1e-9 || Math.abs(CI.LOGO_OPACIDAD - 0.6) > 1e-9) mal(`el logo está a ${(CI.LOGO_TRANSPARENCIA * 100).toFixed(0)} % de transparencia (opacidad ${CI.LOGO_OPACIDAD}) y el encargo pide 40 % (opacidad 0,6)`);
  if (!/\*\s*LOGO_OPACIDAD/.test(sinComentarios)) mal("la composición no aplica LOGO_OPACIDAD al logo");
  if (!/Propiedade-Luxur-Logo\.png$/.test(CI.LOGO)) mal(`el logo es ${CI.LOGO}: el del canal es Propiedade-Luxur-Logo.png`);
  else if (!existsSync(join(PUBLICO, CI.LOGO))) mal(`no existe remotion/public/${CI.LOGO}`);
  else {
    const l = png(join(PUBLICO, CI.LOGO));
    if (!l || l.ancho !== 1000 || l.alto !== 518 || l.color !== 6) mal(`${CI.LOGO} no es un PNG RGBA de 1000×518 (es ${l ? `${l.ancho}×${l.alto}, tipo de color ${l.color}` : "ilegible"})`);
  }
  if (!/<LogoCierre\s*\/>/.test(sinComentarios) || !/<Img\b[^>]*src=\{staticFile\(LOGO\)\}/.test(sinComentarios)) mal("el logo no está montado: falta <LogoCierre /> o su <Img src={staticFile(LOGO)}>");
  // La web: el texto EXACTO que escribió el usuario, montada, que cabe a su cuerpo y dentro de las zonas seguras.
  if (CI.WEB !== "PropiedadesLuxur.com") mal(`la web es «${CI.WEB}» y el encargo pide «PropiedadesLuxur.com» tal cual`);
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
    ok(`nada se congela: la imagen funde a negro en ${CI.FUNDIDO_A_OSCURO} f y llega a negro en f${ultimaDeIsabella} · tarjeta oscura de ${(tarjeta.dur / fps).toFixed(1)} s · logo ${CI.LOGO_ANCHO} px (${CI.LOGO_ANCHO_REF} el PNG de referencia) al ${CI.LOGO_OPACIDAD * 100} % de opacidad · «${CI.WEB}» a ${CI.WEB_PX} px, ≈ ${anchoWeb} de ${util} px útiles`);
  }
}

/* 2e · el color (R32) ───────────────────────────────────────────────────── */
seccion("2e. el color (vivo, balanceado, cinematográfico) con colorCorrection(), R32");
{
  const n = fallos.length;
  const videos = cortes.filter((c) => c.tipo !== "foto");
  const tarjeta = cortes.at(-1);
  // El formato: solo claves del efecto, números finitos dentro de su rango, y nunca en una foto.
  puerta.colorCine();
  // «Balanceado» es entre planos: todos los de vídeo pasan por el efecto (y por el mismo camino de
  // decodificación); la tarjeta del cierre, un negro liso, no se gradúa.
  const sinColor = videos.filter((c) => c.color === undefined);
  if (sinColor.length) mal(`sin \`color\`: ${sinColor.map((c) => c.id).join(", ")}; en una pieza graduada TODOS los planos de vídeo lo llevan (si no, un plano sin graduar rompe el equilibrio y cambia el camino de decodificación)`);
  if (tarjeta.color !== undefined) mal(`${tarjeta.id}: la tarjeta oscura no se gradúa (es un negro liso y es una foto)`);
  // Dos planos SEGUIDOS del mismo clip son una toma partida: el mismo color en los dos, o el corte que no debe verse se ve.
  const claves = (c) => JSON.stringify(Object.entries(c.color ?? {}).sort(([x], [y]) => x.localeCompare(y)));
  for (let i = 1; i < videos.length; i++) {
    const [p, q] = [videos[i - 1], videos[i]];
    if (p.src === q.src && claves(p) !== claves(q)) mal(`${p.id} y ${q.id} son seguidos y del mismo clip (una toma partida) y llevan colores distintos: el empalme en f${q.en} dejaría de ser invisible`);
  }
  // Los topes de la pieza.
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
      if (Math.abs(v("tint", 0)) > 0.03) mal(`${c.id}: Isabella con tint ${v("tint", 0)}: la piel vira a verde o a magenta`);
    }
  }
  if (fallos.length === n) {
    ok(`${videos.length} planos de vídeo con color y la tarjeta sin él · vibrance ≤ ${TOPES_COLOR.vibrance} · |exposure| ≤ ${TOPES_COLOR.exposure} · las ${piel.size} tomas de Isabella con saturation ≤ ${TOPES_PIEL.saturationMax}`);
  }
}

/* 3 · la voz de las dos tomas con audio ─────────────────────────────────── */
seccion("3. la voz de HK03, MD14 y CT06");
{
  const n = fallos.length;
  const ganancias = [];
  cortes.forEach((c, i) => {
    if (!c.audio || !c.voz) return;
    if (!existsSync(join(PUBLICO, c.audio))) return mal(`${c.id}: no existe remotion/public/${c.audio} (node proyectos/020/normalizar.mjs)`);
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
    if (disuelve && ini < c.en + 1) mal(`${c.id}: empieza a hablar en f${ini} y su imagen no es opaca hasta f${c.en}: la primera palabra suena a medio fundir`);
    if (!disuelve && ini < c.en + T.DESCLIC_VOZ) mal(`${c.id}: empieza a hablar en f${ini} y el desclic de entrada dura hasta f${c.en + T.DESCLIC_VOZ}: la primera palabra suena a medio subir`);
    if (siguiente) {
      const limite = siguiente.entra === "disolver" ? siguiente.en - F.DISOLVER - MARGEN_FUNDIDO : siguiente.en - T.DESCLIC_VOZ;
      if (fin > limite) mal(`${c.id}: la última palabra acaba en f${fin} y tiene que callar en f${limite} (${siguiente.entra === "disolver" ? "empieza la disolvencia de" : "calla antes del corte a"} ${siguiente.id})`);
    }
    const g = 20 * Math.log10(T.gananciaHasta(c.voz.lufs, M.OBJETIVO_LUFS));
    if (Math.abs(g) > 6) mal(`${c.id}: ganancia de voz ${g.toFixed(1)} dB (|g| > 6: ¿es la misma voz, el mismo micro?)`);
    ganancias.push(`${c.id} ${g >= 0 ? "+" : ""}${g.toFixed(1)}`);
  });
  // La cola de la PIEZA: desde la última palabra del CTA hasta el final quedan 45-90 f: lo que la tarjeta del cierre (el logo y la
  // web, sección 2d) necesita para leerse, sin quedarse muerto. Nada se congela.
  const cta = byId("c10-cta");
  const finCta = vozDe(cta).fin;
  const cola = DURACION - finCta;
  if (cola < COLA_FINAL[0] || cola > COLA_FINAL[1]) mal(`${cta.id}: ${cola} f entre la última palabra del CTA y el final de la pieza (entre ${COLA_FINAL[0]} y ${COLA_FINAL[1]})`);
  if (fallos.length === n) ok(`${ganancias.length} tomas con su WAV y su tramo, ninguna palabra en un fundido · a ${M.OBJETIVO_LUFS} LUFS: ${ganancias.join(" · ")} dB · ${cola} f desde «visita» hasta el final (la tarjeta del cierre)`);
}

/* 4 · el hook, con su imagen ───────────────────────────────────────────── */
seccion("4. el hook entra con su imagen");
{
  const n = fallos.length;
  const c01 = cortes[0];
  const c02 = byId("c02-hook");
  // La imagen de Isabella (opaca en c02.en) y su voz cuentan el MISMO segundo de la toma: `vocesDeCortes` lo
  // garantiza (mismo `desde`), y aquí se comprueba contra el tramo de audio que se monta de verdad.
  const tramo = A.audio020.find((t) => t.id === "voz-c02-hook");
  if (!tramo) mal("no hay tramo de voz para c02-hook: el hook es una toma con `audio` como las otras");
  else {
    const segImagen = (f) => (c02.desde ?? 0) + (f - c02.en) / fps;
    const segVoz = (f) => (tramo.desde ?? 0) + (f - tramo.en) / fps;
    // Con la disolvencia el tramo de voz entra CRUCE_VOZ f antes: los dos cuentan lo mismo en cualquier frame de la toma.
    for (const f of [c02.en, c02.en + 30, c02.en + c02.dur - 1]) {
      if (Math.abs(Math.round(segImagen(f) * fps) - Math.round(segVoz(f) * fps)) > 0) mal(`la voz del hook va desfasada de su imagen: en f${f} la imagen enseña el ${segImagen(f).toFixed(3)} s de la toma y suena el ${segVoz(f).toFixed(3)} s`);
    }
  }
  const { ini, fin } = vozDe(c02);
  const calle = c01.en + c01.dur;
  if (!(c02.en >= calle)) mal(`la imagen de Isabella es opaca en f${c02.en}, antes de que acabe la calle (f${calle})`);
  // Entra con disolvencia (su toma tiene aire): su primera palabra suena DESPUÉS de que su imagen sea opaca, y con aire para que el golpe en que acaba la disolvencia suene
  // entero antes de que la música baje (la voz de las tres tomas entra 2-3 f después de su golpe: `desde` deja ese aire a propósito).
  if (c02.entra === "disolver" && ini < c02.en + 2) mal(`el hook es opaco en f${c02.en} y su primera palabra suena en f${ini}: tiene que haber ≥ 2 f de aire para que el golpe suene entero`);
  // Si entrara a corte (su toma no tiene los 12 f de aire de una disolvencia): su voz empieza ≥ DESCLIC_VOZ f después de que su imagen sea opaca.
  if (c02.entra === "corte" && ini < c02.en + T.DESCLIC_VOZ) mal(`el hook entra a corte en f${c02.en} y su primera palabra suena en f${ini}: tiene que ser ≥ f${c02.en + T.DESCLIC_VOZ}`);
  if (fallos.length === n) ok(`la calle dura ${(c01.dur / fps).toFixed(1)} s sin texto y sin voz · Isabella es opaca en f${c02.en} (una disolvencia que acaba en un golpe de la canción) y dice «Si» en f${ini} (${ini - c02.en} f después) · acaba en f${fin}, ${c02.en + c02.dur - fin} f antes del final de su plano`);
}

/* 5 · la música, a sus golpes ───────────────────────────────────────────── */
seccion("5. la música, sus golpes y su acorde final (sin pulso: por golpes)");
{
  const n = fallos.length;
  for (const a of T.revisaAudio(A.audio020, { fps, duracion: DURACION })) mal(`revisaAudio: ${a}`);
  for (const t of A.audio020) {
    if (!existsSync(join(PUBLICO, t.src))) {
      mal(`${t.id}: no existe remotion/public/${t.src}`);
      continue;
    }
    const hasta = (Math.round((t.desde ?? 0) * fps) + t.dur) / fps;
    const dura = duracionDe(t.src);
    if (hasta > dura + 1 / fps) mal(`${t.id}: se lee hasta ${hasta.toFixed(2)} s y ${t.src} dura ${dura.toFixed(2)} s`);
  }
  const musica = A.audio020.find((t) => t.id === "musica");
  const cta = byId("c10-cta");
  if (!musica || musica.src !== "recorrido-020/musica-020.wav") mal("no suena «Sax for the Last Customer» (recorrido-020/musica-020.wav)");
  else {
    if (Math.abs(musica.desde - M.INICIO_MUSICA) > 1e-9) mal(`la música arranca en ${musica.desde} s y INICIO_MUSICA dice ${M.INICIO_MUSICA}`);
    // Una sola canción, del frame 0 hasta FIN_MUSICA_020. Esta NO cae a un lecho: suena a su nivel hasta su acorde final y la cola se apaga bajo la tarjeta, 2 f antes del final de la pieza.
    if (musica.en !== 0 || musica.dur !== M.FIN_MUSICA_020) mal(`la música ocupa f${musica.en}-${musica.en + musica.dur} y tiene que ir de 0 a FIN_MUSICA_020 (f${M.FIN_MUSICA_020})`);
    if (M.FIN_MUSICA_020 !== DURACION - 2) mal(`la música acaba en f${M.FIN_MUSICA_020} y la pieza en f${DURACION}: tiene que acabar 2 f antes`);
    const ctaFin = cta.en + cta.dur;
    const g = Array.isArray(musica.ganancia) ? musica.ganancia : [];
    const ultimoPunto = g.at(-1);
    if (!ultimoPunto || ultimoPunto[0] !== M.FIN_MUSICA_020 || ultimoPunto[1] !== 0) mal(`la envolvente de la música no acaba en silencio en f${M.FIN_MUSICA_020}`);
    const puntoCta = g.find((p) => p[0] === ctaFin);
    if (!puntoCta || !(puntoCta[1] > 0.2)) mal(`la música tiene que estar a su nivel «solo» (el acorde y su cola) hasta que acaba la toma (f${ctaFin}) y apagarse desde ahí`);
  }
  // La canción NO tiene pulso: la rejilla son los GOLPES MEDIDOS (`musica/golpes-020.json`, de `medir-pista.py --json`). Cada GOLPE de
  // metraje-020.ts tiene que estar ahí (±4 ms y ±0,5 dB) y cada plano tiene que entrar en el suyo, a ≤ 1 f de donde SUENA.
  const medidos = JSON.parse(readFileSync(join(RAIZ, "proyectos", "020", "musica", "golpes-020.json"), "utf8")).golpes;
  const DE = {
    "c02-hook": "hook",
    "c03-pasillo": "pasillo",
    "c04-abierto": "abierto",
    "c05-patio": "patio",
    "c06-mitad": "mitad",
    "c07-alcoba": "alcoba",
    "c08-cielo": "cielo",
    "c09-dron": "dron",
    "c10-cta": "cta",
  };
  const enMedidos = (clave) => {
    const gp = M.GOLPE[clave];
    const real = medidos.find((x) => Math.abs(x.t - gp.t) <= 0.004);
    if (!real) mal(`el golpe «${clave}» (${gp.t} s de la canción) no está entre los medidos (musica/golpes-020.json)`);
    else if (Math.abs(real.db - gp.db) > 0.5) mal(`el golpe «${clave}» mide ${real.db} dB y metraje-020.ts dice ${gp.db}`);
    return gp;
  };
  const filas = [];
  for (const c of cortes) {
    if (c.id === "c01-calle" || c.id === "c11-cierre") continue; // el frame 0 es el golpe de apertura (abajo); la tarjeta empieza donde acaba la toma del CTA, no en un golpe
    const clave = DE[c.id];
    if (!clave) {
      mal(`${c.id}: no tiene golpe en la tabla de esta puerta (DE): cada plano entra en un golpe medido de la canción`);
      continue;
    }
    const gp = enMedidos(clave);
    const d = c.en - M.golpeExacto(gp.t);
    if (Math.abs(d) > TOLERANCIA_GOLPE) mal(`${c.id} entra en f${c.en} y el golpe «${clave}» suena en f${M.golpeExacto(gp.t).toFixed(1)} (${d >= 0 ? "+" : ""}${d.toFixed(1)} f)`);
    const minimo = c.entra === "disolver" ? FUERZA_MIN_DISOLVER : FUERZA_MIN_CORTE_SECO;
    if (gp.db < minimo) mal(`${c.id}: entra ${c.entra === "disolver" ? "con una disolvencia que acaba" : "a corte"} en un golpe de ${gp.db} dB y el mínimo es ${minimo}`);
    filas.push(`${c.id.replace(/^c\d+-/, "")} ${gp.db} dB`);
  }
  // El golpe de apertura suena en los primeros 4 f (el audio del render llega 42 ms tarde: no puede sonar en el 0 exacto).
  enMedidos("apertura");
  const apertura = M.golpeExacto(M.GOLPE.apertura.t);
  if (!(apertura >= 0 && apertura <= 4)) mal(`el golpe de apertura suena en f${apertura.toFixed(1)}; tiene que ser el frame 0 (≤ f4 con el retardo del audio)`);
  // LA RESOLUCIÓN: el acorde final de la canción (golpe medido) suena DESPUÉS de la última palabra del CTA (no la pisa) y ANTES de la tarjeta, con la música a su nivel «solo»
  // (≥ 90 % de lo que sube) en ese frame y mientras la imagen todavía se ve.
  enMedidos("acorde");
  const acorde = M.golpeExacto(M.GOLPE.acorde.t);
  const ultimaPalabra = vozDe(cta).fin;
  const finToma = cta.en + cta.dur;
  if (!(acorde >= ultimaPalabra + 2)) mal(`el acorde final suena en f${acorde.toFixed(1)} y la última palabra del CTA acaba en f${ultimaPalabra}: tiene que sonar después, sin pisarla`);
  if (!(acorde <= finToma - 2)) mal(`el acorde final suena en f${acorde.toFixed(1)} y la toma del CTA acaba en f${finToma}: tiene que sonar mientras todavía se ve a Isabella`);
  if (acorde - ultimaPalabra > 14) mal(`el acorde final suena ${(acorde - ultimaPalabra).toFixed(0)} f después de la última palabra: tiene que contestarle, no quedarse lejos (≤ 14 f)`);
  if (musica) {
    const nivelAcorde = T.volumenDe(musica, Math.round(acorde) - musica.en);
    const arribaMax = Math.max(...Array.from({ length: DURACION }, (_, f) => T.volumenDe(musica, f)));
    if (nivelAcorde < arribaMax * 0.9) mal(`el acorde final suena con la música a ${(20 * Math.log10(nivelAcorde / arribaMax)).toFixed(1)} dB bajo su nivel «solo»; tiene que sonar entero`);
  }
  if (fallos.length === n) {
    ok(`«Sax for the Last Customer» desde el ${M.INICIO_MUSICA.toFixed(3)} s, una sola canción · golpe de apertura en f${apertura.toFixed(1)} · ${filas.length} planos en golpes MEDIDOS a ≤ ${TOLERANCIA_GOLPE} f (${filas.join(" · ")}) · el acorde final (${M.GOLPE.acorde.db} dB) suena en f${acorde.toFixed(1)}, ${(acorde - ultimaPalabra).toFixed(0)} f después de la última palabra del CTA y ${(finToma - acorde).toFixed(0)} f antes de la tarjeta`);
  }
}

/* 6 · la música baja cuando habla Isabella ─────────────────────────────── */
seccion("6. la música baja bajo su voz");
{
  const n = fallos.length;
  const musica = A.audio020.find((t) => t.id === "musica");
  const nivel = (f) => T.volumenDe(musica, f - musica.en);
  const arriba = Math.max(...Array.from({ length: DURACION }, (_, f) => nivel(f)));
  const filas = [];
  const ventanaHook = ventanasDeVoz.find((x) => x.id === "c02-hook");
  // En CADA frame de la ventana de voz de las tres tomas la música está en su nivel bajo (≤ 20 % de lo que sube) y ≥ 9 LU bajo la voz, y SUBE de nuevo antes del siguiente golpe.
  let techoLufs = -Infinity;
  for (const v of ventanasDeVoz) {
    let peor = 0;
    for (let f = v.ini; f <= v.fin; f++) peor = Math.max(peor, nivel(f));
    const db = 20 * Math.log10(peor / arriba);
    if (peor > arriba * 0.2) mal(`${v.id}: durante su voz (f${v.ini}-${v.fin}) la música llega a ${db.toFixed(1)} dB bajo su nivel de recorrido; tiene que estar por debajo de −14 dB`);
    techoLufs = Math.max(techoLufs, A.LUFS_MESETA + 20 * Math.log10(peor));
    // …y SUBE de nuevo antes del siguiente plano (no se queda enterrada tras callarse ella).
    const despues = nivel(v.fin + 16);
    if (despues < arriba * 0.9) mal(`${v.id}: 16 f después de su última palabra la música sigue en ${(20 * Math.log10(despues / arriba)).toFixed(1)} dB; tiene que haber vuelto arriba`);
    filas.push(`${v.id.replace(/^c\d+-/, "")} ${db.toFixed(1)} dB`);
  }
  // En absoluto: la música bajo la voz queda ≥ 9 LU por debajo de ella (−21 LUFS) en TODO su recorrido (la canción es plana: −13,9 LUFS + la envolvente).
  const bajoVoz = M.OBJETIVO_LUFS - techoLufs;
  if (bajoVoz < 9) mal(`bajo la voz la música llega a ${techoLufs.toFixed(1)} LUFS, ${bajoVoz.toFixed(1)} LU bajo ella (${M.OBJETIVO_LUFS}); tiene que ser ≥ 9 LU en TODO su recorrido`);
  // Antes de la primera palabra del hook la música ya está ARRIBA (el golpe de apertura y el de la disolvencia suenan enteros) y baja DESPUÉS del golpe, no antes.
  const hookPlano = byId("c02-hook");
  if (nivel(Math.max(0, ventanaHook.ini - 40)) < arriba * 0.9) mal("el golpe de apertura no suena a su nivel: la música ya está baja antes de la voz del hook");
  for (const id of ["c02-hook", "c06-mitad", "c10-cta"]) {
    const c = byId(id);
    if (nivel(c.en) < arriba * 0.9) mal(`${id}: la música ya está baja en el golpe en que acaba su disolvencia (f${c.en}): el golpe tiene que sonar entero y la música bajar DESPUÉS`);
    const v = ventanasDeVoz.find((x) => x.id === id);
    if (nivel(v.ini) > arriba * 0.2) mal(`${id}: la música aún no ha bajado cuando entra su primera palabra (f${v.ini})`);
  }
  if (fallos.length === n) ok(`la música baja a ${filas.join(" · ")} durante su voz (hook, mitad y CTA), a ${techoLufs.toFixed(1)} LUFS como mucho: ${bajoVoz.toFixed(1)} LU bajo ella · el golpe de cada disolvencia suena entero y la música baja después · y sube de nuevo antes del plano siguiente y del acorde final`);
}

/* 7 · subtítulos ────────────────────────────────────────────────────────── */
seccion("7. subtítulos editoriales");
{
  const n = fallos.length;
  if (E.modoTextoDe(CANAL) !== "editorial") mal(`el canal está en modo «${E.modoTextoDe(CANAL)}»: esta pieza monta subtítulos editoriales`);
  const letra = E.letraSubtitulosDe(CANAL);
  const acentoMenos = puerta.modulos.subtitulos.ACENTO_MENOS_020;
  for (const a of E.revisaSubtitulosEditoriales(bloques, { fps, ancho: 1080, alto: 1920, duracion: DURACION, letra, acentoMenos })) mal(`revisaSubtitulosEditoriales: ${a}`);
  // La cursiva, 8 px más pequeña (como en el 017): la constante, que la composición se la pase al componente, y el efecto medido en el motor.
  const vistaCuadro = { ancho: 1080, alto: 1920 };
  if (acentoMenos !== ACENTO_MENOS_PEDIDO) mal(`ACENTO_MENOS_020 = ${acentoMenos} y el 017 y esta versión piden ${ACENTO_MENOS_PEDIDO} px menos en la cursiva`);
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
  // Todo lo que dice Isabella va ABAJO (el canal lo pide) y a 90 %. Arriba no hay nada (ver 2c).
  for (const b of bloques) {
    if ((b.posicion ?? "abajo") !== "abajo") mal(`[${b.id}] va ${b.posicion}: los subtítulos de Isabella van abajo`);
  }
  const fuente = readFileSync(join(RAIZ, "remotion", "src", "proyectos", "020", "Recorrido020.tsx"), "utf8");
  const mOp = /export const OPACIDAD_SUBTITULOS\s*=\s*([0-9.]+)/.exec(fuente);
  if (!mOp || Math.abs(Number(mOp[1]) - OPACIDAD_PEDIDA) > 1e-9) mal(`OPACIDAD_SUBTITULOS = ${mOp ? mOp[1] : "?"} y el canal pide ${OPACIDAD_PEDIDA}`);
  if (!/<SubtitulosEditoriales\b[^>]*\bacentoMenos=\{ACENTO_MENOS_020\}/.test(fuente)) mal("la composición no le pasa `acentoMenos={ACENTO_MENOS_020}` a <SubtitulosEditoriales>: la cursiva saldría a su tamaño de siempre");
  if (!/opacity:\s*OPACIDAD_SUBTITULOS[^}]*\}\}>\s*\n\s*<SubtitulosEditoriales/.test(fuente)) mal("los <SubtitulosEditoriales> no están dentro del grupo con `opacity: OPACIDAD_SUBTITULOS`");
  const enVoz = (t) => ventanasDeVoz.some((v) => t.desde >= v.ini - HOLGURA_TROZO && t.desde <= v.fin);
  const usadas = new Set();
  for (const b of bloques) {
    if (SIN_VOZ[b.id]) {
      usadas.add(b.id);
      if (b.trozos.every(enVoz)) mal(`sobra la excepción «${b.id}» de SIN_VOZ: todos sus trozos caen sobre voz, quítala`);
      continue;
    }
    for (const t of b.trozos) if (!enVoz(t)) mal(`[${b.id}] «${t.texto}» entra en f${t.desde}, donde nadie habla`);
  }
  for (const id of Object.keys(SIN_VOZ)) if (!usadas.has(id)) mal(`sobra la excepción «${id}» de SIN_VOZ: ese bloque ya no existe, quítala`);
  // Sin datos grandes: el formato solo admite uno, y solo en el bloque 3; esta pieza no lleva cifras (sección 2b).
  for (const b of bloques) if (b.trozos.some((t) => t.estilo === "dato")) mal(`[${b.id}] lleva un dato grande: esta pieza no lo lleva (ninguna cifra)`);
  const acentos = bloques.reduce((s, b) => s + b.trozos.filter((t) => t.estilo === "acento").length, 0);
  if (fallos.length === n) ok(`${bloques.length} bloques, ${acentos} acentos · validador sin avisos con las letras del canal · todo lo de Isabella abajo, a ${OPACIDAD_PEDIDA * 100} % · la cursiva ${ACENTO_MENOS_PEDIDO} px menor (${cursiva}) · cada trozo sobre una palabra dicha · nada encima de ella`);
}

/* 8-10 · formato ────────────────────────────────────────────────────────── */
seccion("8. metraje disponible");
puerta.metrajeDisponible();
seccion("9. tramos disjuntos");
puerta.tramosDisjuntos();

/* 9b · metraje que comparte con la V1, la V2 y la V3 (informa; no falla) ───────── */
{
  // `tramosDisjuntos` solo mira DENTRO del proyecto. Esta pieza es la cuarta versión de un reel: si elige un plano sin saber que ya está
  // en otra, el reel repite metraje y nadie lo avisa. Aquí se cuenta, por clip (el mismo archivo normalizado en cada proyecto: `rc09.mp4`),
  // cuánto del tramo OPACO de cada plano se solapa con un plano de cada versión anterior. No es un fallo: usar el mejor plano de una esquina
  // otra vez es legítimo, pero se declara (`artefactos/01-plan.md`, `combinaciones.md`) y esta línea es la que lo recuerda.
  seccion("9b. metraje que comparte con la V1, la V2 y la V3 (informa; repetirlo es una decisión)");
  const VERSIONES = [
    { nombre: "V1 (017)", ruta: "remotion/src/proyectos/017/metraje-017.ts", exporta: "metraje017" },
    { nombre: "V2 (018)", ruta: "remotion/src/proyectos/018/metraje-018.ts", exporta: "metraje018" },
  ].filter((v) => existsSync(join(RAIZ, v.ruta)));
  /**
   * LA V3 (019) no está en git (el usuario pidió no commitear el proyecto): su plan vive solo en el árbol de trabajo del estudio. Para que esta puerta compare con ella
   * sin depender de esa carpeta, aquí queda una INSTANTÁNEA de los tramos opacos que usa (segundos del clip normalizado), copiada de `proyectos/019/combinaciones.md` §2.2 y
   * de `remotion/src/proyectos/019/metraje-019.ts` el 2026-10-04. Cuando la V3 entre en git, esta tabla se sustituye por su `VERSIONES` como las otras dos.
   */
  const V3 = {
    nombre: "V3 (019, instantánea)",
    tramos: new Map([
      ["rc25.mp4", [{ id: "c01-fachada", a: 3.0, b: 6.07 }]],
      ["dr152.mp4", [{ id: "c03-dron", a: 14.0, b: 18.03 }]],
      ["rc09.mp4", [{ id: "c04-patio", a: 4.6, b: 7.87 }, { id: "c05-plantas", a: 7.87, b: 12.63 }]],
      ["rc13.mp4", [{ id: "c07-umbral", a: 2.6, b: 5.7 }]],
      ["rc16.mp4", [{ id: "c08-bloques", a: 20.6, b: 23.23 }, { id: "c09-vista", a: 23.23, b: 28.77 }]],
    ]),
  };
  const otras = VERSIONES.length ? await cargaTs(Object.fromEntries(VERSIONES.map((v, i) => [`v${i}`, join(RAIZ, v.ruta)]))) : {};
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
  const anteriores = [...VERSIONES.map((V, i) => ({ nombre: V.nombre, suyos: tramosOpacos(otras[`v${i}`][V.exporta]) })), { nombre: V3.nombre, suyos: V3.tramos }];
  let hubo = false;
  for (const { nombre, suyos } of anteriores) {
    for (const [clip, lista] of mios) {
      for (const x of lista) {
        for (const y of suyos.get(clip) ?? []) {
          const seg = Math.min(x.b, y.b) - Math.max(x.a, y.a);
          if (seg > 0.05) {
            hubo = true;
            console.log(`  ℹ️  ${clip}: ${x.id} (${x.a.toFixed(1)}-${x.b.toFixed(1)} s) y el ${y.id} de la ${nombre} (${y.a.toFixed(1)}-${y.b.toFixed(1)} s) comparten ${seg.toFixed(1)} s`);
          }
        }
      }
    }
  }
  if (!hubo) ok(`ni un segundo de metraje en común con ${anteriores.map((v) => v.nombre).join(" ni con ")}`);
  // Y qué CLIPS reutiliza aunque sean tramos distintos (informa): sirve para declarar «mismo clip, otra ventana».
  const clipsMios = [...mios.keys()].filter((c) => !/^(hk|md|ct)\d+\.mp4$/.test(c));
  const compartidos = clipsMios.filter((c) => anteriores.some((a) => a.suyos.has(c)));
  if (compartidos.length) console.log(`  ℹ️  clips que ya salieron en otra versión, con OTRA ventana: ${compartidos.join(", ")}`);
}
seccion("10. encuadre");
puerta.encuadre({ techoZoom: TECHO_ZOOM });

/* 11 · nada «por confirmar» en los planos (solo con --final) ───────────────── */
{
  // Una palabra, una cifra o un nombre que el plan lleva marcado «POR CONFIRMAR AL OÍDO» es un pendiente con el
  // usuario, no un detalle: en el 017 «esta línea en específico» (whisper, confianza 0,06) estuvo marcada así desde
  // la rev. 1 y llegó a la final exportada con la palabra equivocada («unidad»). Durante el montaje avisa; con
  // `--final` es un fallo: antes de exportar se cierra cada uno con el usuario.
  const final = process.argv.includes("--final");
  const carpetas = [join(RAIZ, "remotion", "src", "proyectos", "020"), join(RAIZ, "proyectos", "020", "voz")];
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

puerta.cierra(`el 020 pasa la puerta: ${cortes.length} planos, ${bloques.length} bloques de texto, ${A.audio020.length} tramos de audio`);
