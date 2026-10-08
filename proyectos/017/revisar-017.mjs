#!/usr/bin/env node
/**
 * PUERTA DEL 017 — «Los Patios · apto 501», recorrido con presentadora.
 *
 *   node proyectos/017/revisar-017.mjs
 *
 * Las comprobaciones del FORMATO salen de `revisar-metraje.mjs` (línea de
 * tiempo, metraje, tramos, encuadre). Encima, lo que el encargo pidió con
 * palabras y ningún frame enseña:
 *
 *   2. la ESTRUCTURA: los seis bloques en orden, el dron en el frame 0 (solo, a
 *      corte), Isabella tres veces (hook, mitad, CTA) y UNA toma por bloque, la
 *      vista como último plano antes del CTA y el total dentro del tope.
 *   2b. las REVISIONES 2 y 3 (el encargo cambió tomas): a los 7 s entra «Exterior
 *      edificio4» (RC25), a los 31 s se ve «Patio y Naturaleza» (RC08) y a los 32 s el
 *      dron DJI_…0163_D (DR163) arranca en el segundo 2 de su clip. Como RC08 ya
 *      salía antes (c08), sus dos mitades son UNA toma continua: la puerta comprueba
 *      que el empalme no repite ni salta un solo fotograma.
 *   2c. la REVISIÓN 4 (pedido del usuario, con «siempre» y «nunca»): la PRIMERA TOMA
 *      SALE SIN TEXTO (ni hook escrito ni subtítulos: ningún bloque entra antes de que
 *      la imagen de Isabella sea opaca, y no hay texto en el frame 0); ni cuenta
 *      `@propiedadesluxur` ni nada arriba; y la pieza NO lleva el sello «PROPIEDADES
 *      LUXUR» (no se importa `SelloCampana`).
 *   2d. la REVISIÓN 6 (el cierre): el logo más pequeño que en la rev. 5 y al 60 % de
 *      opacidad (40 % de transparencia); NADA SE CONGELA (la imagen de Isabella funde a
 *      negro y llega a negro exacto en su último fotograma); y la TARJETA OSCURA con la
 *      web `PropiedadesLuxur.com` (su texto exacto, que cabe, dentro de las zonas seguras
 *      y que se lee entera con holgura).
 *   2e. la REVISIÓN 7 (el color): cada plano de vídeo lleva su `color` (`colorCorrection()`),
 *      dentro de lo que el efecto admite; la tarjeta del cierre no; las dos mitades de la
 *      toma continua de RC08 llevan EL MISMO color (si no, el corte invisible se ve); y los
 *      topes de la pieza, medidos al graduarla: nada de `vibrance` alto (moteado de croma en
 *      el hormigón, nubes rosas), exposiciones moderadas y la piel de Isabella donde estaba.
 *   3. la VOZ de HK02, MD09 y CT07: su WAV TRATADO a −15 LUFS (rev. 9) con el pico real
 *      ≤ −1 dBTP, ninguna palabra dentro de un fundido ni de un desclic, la ganancia por
 *      toma, y la COLA de la pieza (45-90 f desde la última palabra del CTA hasta el
 *      final: la tarjeta con la web).
 *   4. el HOOK: su imagen es opaca ANTES de su primera palabra (no habla sobre el dron).
 *   5. «la música debe estar sincronizada con las tomas»: cada plano entra a
 *      ≤ 1 f de un pulso medido de la canción (la disolvencia ACABA en él), los
 *      cuatro momentos grandes caen en golpes de frase, y la canción se lee dentro
 *      de su archivo.
 *   6. «cuando hable Isabella debe bajar sus decibeles»: la envolvente de la
 *      música está en su nivel bajo durante cada ventana de voz del hook y de la
 *      mitad (y la del CTA queda sin ducking a propósito: la canción ya cae).
 *   7. los SUBTÍTULOS: validador sin avisos con las letras del canal, cada trozo
 *      sobre una palabra dicha, todos abajo, nada encima de Isabella, «abajo con
 *      opacidad al 90 %» (la constante de la composición) y, desde la revisión 5, la
 *      CURSIVA (el acento) 8 px más pequeña que la del motor: 99 → 91 px.
 *
 * Carga los módulos TypeScript DE VERDAD (`abrePuerta` → esbuild): lo que mide
 * es lo que se renderiza. Sale con 1 si algo falla.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ejecutar } from "../../herramientas/comun.mjs";
import { abrePuerta, duracionDe, PUBLICO, RAIZ } from "../../remotion/src/motor/metraje/revisar-metraje.mjs";

const TECHO_ZOOM = 1.2; // clips normalizados a 1296 px = 1080 × 1,2
const TOPE_SEGUNDOS = 55; // el formato apunta a 45-50 s; pasado de aquí ya es otra pieza
const MARGEN_FUNDIDO = 2; // f entre la última palabra y el inicio de la disolvencia del siguiente
const COLA_FINAL = [45, 90]; // f desde la última palabra del CTA hasta el final: la tarjeta con el logo y la web se lee, sin quedarse muerto
const TARJETA_FRAMES = [45, 75]; // f que dura la tarjeta oscura del cierre (1,5-2,5 s)
const VOZ_OBJETIVO = -15; // LUFS de la voz (rev. 9, pedido del usuario: «más decibeles sin saturar»; hasta la rev. 8, −21)
const TECHO_VOZ_DBTP = -1.0; // pico real de la voz en lo que suena, con su ganancia
const HOLGURA_TROZO = 3; // f que un trozo puede adelantarse a su palabra
const TOLERANCIA_PULSO = 1; // f entre el `en` de un plano y el pulso al que cae
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
  proyecto: "017",
  plan: "remotion/src/proyectos/017/metraje-017.ts",
  cortes: "metraje017",
  receta: "node proyectos/017/normalizar.mjs",
  extras: {
    audio: "remotion/src/proyectos/017/audio-017.ts",
    subtitulos: "remotion/src/proyectos/017/subtitulos-017.ts",
    tramos: "remotion/src/motor/sound/tramos.ts",
    editorial: "remotion/src/motor/subtitulos-editoriales.ts",
    marca: "remotion/src/marcas/luxur.ts",
    cierre: "remotion/src/proyectos/017/cierre-017.ts",
  },
}).catch((e) => {
  console.log(`\n❌ el plan del 017 no carga: ${e.message}\n`);
  process.exit(1);
});
const { cortes, fps, fallos, mal, ok, seccion } = puerta;
const M = puerta.plan;
const F = puerta.modulos.formato;
const A = puerta.modulos.audio;
const T = puerta.modulos.tramos;
const E = puerta.modulos.editorial;
const bloques = puerta.modulos.subtitulos.subtitulos017;
const DURACION = M.DURACION_017;
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
  if (primero.audio) mal(`${primero.id}: el primer plano lleva voz: la primera toma sale sin texto y Isabella no habla sobre el dron`);
  if ((primero.entra ?? "corte") !== "corte") mal(`${primero.id}: entra con «${primero.entra}»; el frame 0 es la miniatura y no nace de un fundido`);
  if (!/dr\d+\.mp4$/.test(primero.src)) mal(`${primero.id}: ${primero.src} no es un plano de dron: el encargo abre con el dron`);
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
  const musicas = A.audio017.filter((t) => /musica/.test(t.src));
  if (musicas.length !== 1) mal(`hay ${musicas.length} tramos de música; el encargo es una sola canción de principio a fin`);
  if (DURACION / fps > TOPE_SEGUNDOS) mal(`${(DURACION / fps).toFixed(1)} s: el formato no pasa de ${TOPE_SEGUNDOS} s`);
  if (fallos.length === n) {
    const porBloque = BLOQUES.map((b) => `b${b} ${(cortes.filter((c) => c.bloque === b).reduce((s, c) => s + c.dur, 0) / fps).toFixed(1)} s`);
    ok(`${cortes.length} planos · ${(DURACION / fps).toFixed(1)} s · ${porBloque.join(" · ")} · Isabella 3 veces (hook, mitad, CTA) · el dron en el frame 0 · todos con razón · la vista, el plano más largo de su bloque`);
  }
}

/* 2b · la revisión 2 ────────────────────────────────────────────────────── */
seccion("2b. las revisiones 2 y 3: lo pedido para el min 7, el 31 y el 32");
{
  const n = fallos.length;
  // «En el min 7 cambia la toma por Exterior edificio4»: el plano que entra a los 7,7 s (0:07 en el reproductor).
  const fachada = byId("c03-fachada");
  if (!fachada) mal("falta c03-fachada");
  else {
    if (!/rc25\.mp4$/.test(fachada.src)) mal(`${fachada.id}: ${fachada.src} no es «Exterior edificio4» (rc25)`);
    const seg = fachada.en / fps;
    if (!(seg >= 7 && seg < 8)) mal(`${fachada.id} entra a los ${seg.toFixed(2)} s y el encargo lo pide en el 0:07`);
  }
  // «y en el 31 por Patio y Naturaleza»: lo que se ve a los 31 s.
  const a31 = cortes.find((c) => c.en <= 31 * fps && 31 * fps < c.en + c.dur);
  if (!a31) mal("a los 31 s no hay ningún plano");
  else if (!/rc08\.mp4$/.test(a31.src)) mal(`a los 31 s se ve ${a31.id} (${a31.src}), y el encargo pide «Patio y Naturaleza» (rc08)`);
  // Revisión 3: «en el 0:32 la toma DJI_20261001104246_0163_D.MP4 debe empezar en el seg 0:02».
  const dron = byId("c10-dron");
  if (!dron) mal("falta c10-dron");
  else {
    if (!/dr163\.mp4$/.test(dron.src)) mal(`${dron.id}: ${dron.src} no es DJI_20261001104246_0163_D (dr163)`);
    const seg = dron.en / fps;
    if (!(seg >= 32 && seg < 33)) mal(`${dron.id} entra a los ${seg.toFixed(2)} s y el encargo habla del 0:32`);
    if (Math.abs((dron.desde ?? 0) - 2) > 1e-9) mal(`${dron.id} arranca en el segundo ${(dron.desde ?? 0).toFixed(3)} del clip y el encargo pide el 2`);
  }
  // RC08 sale en DOS planos seguidos (c08 y c09): tienen que ser una toma continua. El último fotograma
  // de c08 que se pinta es desde₀₈·30 + dur₀₈ − 1 (el prerrollo de su disolvencia va ANTES de `desde`), y c09 arranca en su `desde`.
  const c08 = byId("c08-follaje");
  const c09 = byId("c09-patio");
  if (c08 && c09) {
    if (c08.src !== c09.src) mal(`c08 (${c08.src}) y c09 (${c09.src}) no son el mismo clip: la toma continua de «Patio y Naturaleza» se parte en un clip distinto`);
    const ultimoDeC08 = Math.round(c08.desde * fps) + c08.dur - 1;
    const primeroDeC09 = Math.round(c09.desde * fps);
    if (primeroDeC09 !== ultimoDeC08 + 1) {
      mal(`el empalme de «Patio y Naturaleza» no es continuo: c08 acaba en el fotograma ${ultimoDeC08} del clip y c09 arranca en el ${primeroDeC09} (${primeroDeC09 - ultimoDeC08 - 1 > 0 ? `se saltan ${primeroDeC09 - ultimoDeC08 - 1}` : `se repiten ${ultimoDeC08 + 1 - primeroDeC09}`})`);
    } else if (c09.entra !== "corte") mal("c09 tiene que entrar «a corte»: una disolvencia en mitad de una toma continua se vería");
    if (c08.src === c09.src && primeroDeC09 === ultimoDeC08 + 1) {
      const finDelClip = Math.round(F_DURACION(c09.src) * fps);
      const ultimoDeC09 = primeroDeC09 + c09.dur - 1;
      if (ultimoDeC09 >= finDelClip) mal(`c09 pide hasta el fotograma ${ultimoDeC09} y ${c09.src} solo tiene ${finDelClip}`);
    }
  }
  if (fallos.length === n) {
    const enSeg = (c) => (c.en / fps).toFixed(2);
    ok(`el min 7: «Exterior edificio4» (rc25) entra a los ${enSeg(fachada)} s · el 32: el dron (dr163) entra a los ${enSeg(dron)} s y arranca en el segundo ${dron.desde} del clip · el 31: «Patio y Naturaleza» (rc08, ${a31.id}) · c08 y c09 son UNA toma continua (el fotograma ${Math.round(c09.desde * fps)} sigue al ${Math.round(c08.desde * fps) + c08.dur - 1}, sin repetir ni saltar)`);
  }
}

/* 2c · la revisión 4: sin texto en la primera toma, sin sello, con el logo ─── */
seccion("2c. la revisión 4: la primera toma sin texto, ni cuenta ni nada arriba, y nunca el sello");
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
  // Isabella no habla sobre el dron: su imagen es opaca ANTES de su primera palabra (si no, habría voz sobre una toma que sale sin texto, y sus subtítulos).
  const { ini } = vozDe(c02);
  if (ini < c02.en + 1) mal(`el hook empieza a hablar en f${ini} y su imagen no es opaca hasta f${c02.en}`);
  // El sello «PROPIEDADES LUXUR» no se pone NUNCA: ni se importa ni se monta.
  const fuente = readFileSync(join(RAIZ, "remotion", "src", "proyectos", "017", "Recorrido017.tsx"), "utf8");
  const sinComentarios = fuente.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
  if (/SelloCampana/.test(sinComentarios)) mal("la composición usa `SelloCampana`: el sello «PROPIEDADES LUXUR» no se pone NUNCA (pedido del usuario)");
  if (/PROPIEDADES LUXUR/.test(sinComentarios)) mal("la composición escribe «PROPIEDADES LUXUR» a mano: el sello no se pone NUNCA");
  if (fallos.length === n) {
    ok(`la primera toma (${c01.id}, f0-${c02.en}) sale SIN texto: el primer subtítulo entra en f${bloques[0].trozos[0].desde} · nada arriba y ninguna cuenta · sin sello (no se usa \`SelloCampana\`)`);
  }
}

/* 2d · la revisión 6: el cierre, sin congelar ───────────────────────────── */
seccion("2d. la revisión 6: el logo más pequeño y al 60 %, nada se congela, y la tarjeta oscura con la web");
{
  const n = fallos.length;
  const CI = puerta.modulos.cierre;
  const cta = byId("c11-cta");
  const tarjeta = cortes.at(-1);
  const vistaCuadro = { ancho: 1080, alto: 1920 };
  const letraBase = E.letraSubtitulosDe(CANAL).base;
  const fuente = readFileSync(join(RAIZ, "remotion", "src", "proyectos", "017", "Recorrido017.tsx"), "utf8");
  const sinComentarios = fuente.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
  const png = (ruta) => {
    const b = readFileSync(ruta);
    const esPng = b.length > 26 && b.subarray(1, 4).toString() === "PNG";
    return esPng ? { ancho: b.readUInt32BE(16), alto: b.readUInt32BE(20), color: b[25] } : null;
  };

  // «No dejes que el último fotograma se congele»: el CTA llega a su último fotograma y no se repite; sigue la tarjeta.
  if (tarjeta.id !== "c12-cierre") mal(`el último plano es ${tarjeta.id}: tiene que ser c12-cierre, la tarjeta oscura`);
  if (tarjeta.en !== cta.en + cta.dur) mal(`${tarjeta.id} entra en f${tarjeta.en} y la toma del CTA acaba en f${cta.en + cta.dur}: la tarjeta sigue a la toma sin hueco`);
  const congelados = cortes.filter((c) => c !== tarjeta && (c.tipo === "foto" || /-cola\.mp4$/.test(c.src)));
  if (congelados.length) mal(`se congela un fotograma (${congelados.map((c) => c.id).join(", ")}): el usuario pidió que el último fotograma NO se congele`);
  if (tarjeta.tipo !== "foto" || tarjeta.src !== CI.TARJETA) mal(`${tarjeta.id}: tiene que ser la foto ${CI.TARJETA} (un negro liso), no ${tarjeta.tipo} ${tarjeta.src}`);
  if (tarjeta.dur !== CI.DUR_TARJETA) mal(`${tarjeta.id} dura ${tarjeta.dur} f y cierre-017.ts dice ${CI.DUR_TARJETA}`);
  if (tarjeta.dur < TARJETA_FRAMES[0] || tarjeta.dur > TARJETA_FRAMES[1]) mal(`la tarjeta dura ${tarjeta.dur} f (entre ${TARJETA_FRAMES[0]} y ${TARJETA_FRAMES[1]}): la web se lee, sin quedarse muerto`);
  const rutaTarjeta = join(PUBLICO, CI.TARJETA);
  if (!existsSync(rutaTarjeta)) mal(`no existe remotion/public/${CI.TARJETA} (node proyectos/017/normalizar.mjs)`);
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
  const razon = CI.LOGO_ANCHO / CI.LOGO_ANCHO_REV5;
  if (!(razon >= 0.65 && razon <= 0.95)) mal(`el logo mide ${CI.LOGO_ANCHO} px de ancho (${(razon * 100).toFixed(0)} % de los ${CI.LOGO_ANCHO_REV5} de la rev. 5): «un poco más pequeño» es entre el 65 y el 95 %`);
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
    ok(`nada se congela: la imagen funde a negro en ${CI.FUNDIDO_A_OSCURO} f y llega a negro en f${ultimaDeIsabella} · tarjeta oscura de ${(tarjeta.dur / fps).toFixed(1)} s · logo ${CI.LOGO_ANCHO} px (${CI.LOGO_ANCHO_REV5} en la rev. 5) al ${CI.LOGO_OPACIDAD * 100} % de opacidad · «${CI.WEB}» a ${CI.WEB_PX} px, ≈ ${anchoWeb} de ${util} px útiles`);
  }
}

/* 2e · la revisión 7: el color ──────────────────────────────────────────── */
seccion("2e. la revisión 7: el color (vivo, balanceado, cinematográfico) con colorCorrection()");
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
  // RC08 es UNA toma partida en dos planos: el mismo color en los dos, o el corte invisible se ve.
  const [c08, c09] = [byId("c08-follaje"), byId("c09-patio")];
  const claves = (c) => JSON.stringify(Object.entries(c.color ?? {}).sort(([a], [b]) => a.localeCompare(b)));
  if (c08.src !== c09.src) mal("c08 y c09 ya no son una toma continua de RC08: la regla de su color igual ya no aplica; revísala");
  else if (claves(c08) !== claves(c09)) mal(`c08 y c09 son UNA toma continua y llevan colores distintos: el empalme en f${c09.en} dejaría de ser invisible`);
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
    ok(`${videos.length} planos de vídeo con color y la tarjeta sin él · c08 = c09 · vibrance ≤ ${TOPES_COLOR.vibrance} · |exposure| ≤ ${TOPES_COLOR.exposure} · las ${piel.size} tomas de Isabella con saturation ≤ ${TOPES_PIEL.saturationMax}`);
  }
}

/* 3 · la voz de las dos tomas con audio ─────────────────────────────────── */
seccion("3. la voz de HK02, MD09 y CT07");
{
  const n = fallos.length;
  const ganancias = [];
  cortes.forEach((c, i) => {
    if (!c.audio || !c.voz) return;
    if (!existsSync(join(PUBLICO, c.audio))) return mal(`${c.id}: no existe remotion/public/${c.audio} (node proyectos/017/normalizar.mjs)`);
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
  // REV. 9 («necesito que la voz cuando habla Isabella tenga más decibeles sin saturar»): la voz a −15 LUFS (el nivel de la música sola) y, en lo que SUENA
  // —el WAV tratado, en la ventana de su tramo, con su ganancia—, el pico real por debajo de −1 dBTP. Medido, no supuesto: ebur128. Excepción a R29 por encargo.
  if (M.OBJETIVO_LUFS !== VOZ_OBJETIVO) mal(`OBJETIVO_LUFS = ${M.OBJETIVO_LUFS}; el usuario pidió la voz más fuerte: ${VOZ_OBJETIVO} LUFS`);
  const picos = [];
  for (const t of A.vocesTomas) {
    if (!/-voz\.wav$/.test(t.src)) mal(`${t.id}: suena ${t.src}; la voz que suena es la tratada (<toma>-voz.wav), la cruda satura a −15 LUFS`);
    const r = ejecutar("ffmpeg", ["-nostdin", "-hide_banner", "-ss", String(t.desde), "-t", String(t.dur / fps), "-i", join(PUBLICO, t.src), "-af", "ebur128=peak=true:framelog=quiet", "-f", "null", "-"]);
    const tp = Number((/Peak:\s+(-?[\d.]+) dBFS/.exec(r.stderr ?? r.stdout) ?? [])[1]);
    const gt = typeof t.ganancia === "number" ? t.ganancia : 1;
    const pico = tp + 20 * Math.log10(gt);
    if (!Number.isFinite(pico) || pico > TECHO_VOZ_DBTP) mal(`${t.id}: pico real ${Number.isFinite(pico) ? pico.toFixed(1) : "no medible"} dBTP con su ganancia; el techo es ${TECHO_VOZ_DBTP} (más, y satura)`);
    else picos.push(pico.toFixed(1));
  }
  // La cola de la PIEZA: desde la última palabra del CTA hasta el final quedan 45-90 f: lo que la tarjeta del cierre (el logo y la
  // web, sección 2d) necesita para leerse, sin quedarse muerto. Nada se congela.
  const cta = byId("c11-cta");
  const finCta = vozDe(cta).fin;
  const cola = DURACION - finCta;
  if (cola < COLA_FINAL[0] || cola > COLA_FINAL[1]) mal(`${cta.id}: ${cola} f entre la última palabra del CTA y el final de la pieza (entre ${COLA_FINAL[0]} y ${COLA_FINAL[1]})`);
  if (fallos.length === n) ok(`${ganancias.length} tomas con su WAV y su tramo, ninguna palabra en un fundido · a ${M.OBJETIVO_LUFS} LUFS: ${ganancias.join(" · ")} dB · pico real ${picos.join(" · ")} dBTP (techo ${TECHO_VOZ_DBTP}) · ${cola} f desde «juntos» hasta el final (la tarjeta del cierre)`);
}

/* 4 · el hook, con su imagen ───────────────────────────────────────────── */
seccion("4. el hook entra con su imagen");
{
  const n = fallos.length;
  const c01 = cortes[0];
  const c02 = byId("c02-hook");
  // La imagen de Isabella (opaca en c02.en) y su voz cuentan el MISMO segundo de la toma: `vocesDeCortes` lo
  // garantiza (mismo `desde`), y aquí se comprueba contra el tramo de audio que se monta de verdad.
  const tramo = A.audio017.find((t) => t.id === "voz-c02-hook");
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
  const dron = c01.en + c01.dur;
  if (!(c02.en >= dron)) mal(`la imagen de Isabella es opaca en f${c02.en}, antes de que acabe el dron (f${dron})`);
  if (fallos.length === n) ok(`el dron dura ${(c01.dur / fps).toFixed(1)} s sin texto y sin voz · Isabella es opaca en f${c02.en} (el pulso 2) y dice «Este» en f${ini} · acaba en f${fin}, ${c02.en + c02.dur - fin} f antes del final de su plano`);
}

/* 5 · la música, a los pulsos ───────────────────────────────────────────── */
seccion("5. la música y los pulsos");
{
  const n = fallos.length;
  for (const a of T.revisaAudio(A.audio017, { fps, duracion: DURACION })) mal(`revisaAudio: ${a}`);
  for (const t of A.audio017) {
    if (!existsSync(join(PUBLICO, t.src))) {
      mal(`${t.id}: no existe remotion/public/${t.src}`);
      continue;
    }
    const hasta = (Math.round((t.desde ?? 0) * fps) + t.dur) / fps;
    const dura = duracionDe(t.src);
    if (hasta > dura + 1 / fps) mal(`${t.id}: se lee hasta ${hasta.toFixed(2)} s y ${t.src} dura ${dura.toFixed(2)} s`);
  }
  const musica = A.audio017.find((t) => t.id === "musica");
  if (!musica || musica.src !== "recorrido-017/musica-017.wav") mal("no suena «Time» (recorrido-017/musica-017.wav)");
  else {
    if (Math.abs(musica.desde - M.INICIO_MUSICA) > 1e-9) mal(`la música arranca en ${musica.desde} s y INICIO_MUSICA dice ${M.INICIO_MUSICA}`);
    // Una sola canción, del frame 0 hasta FIN_MUSICA_017: «Time» vuelve a pegar en el pulso 48 (f1373) y el piano se apaga ANTES
    // (2 f de margen), desde que acaba la toma del CTA y empieza la tarjeta; el resto de la tarjeta queda en silencio.
    if (musica.en !== 0 || musica.dur !== M.FIN_MUSICA_017) mal(`la música ocupa f${musica.en}-${musica.en + musica.dur} y tiene que ir de 0 a FIN_MUSICA_017 (f${M.FIN_MUSICA_017})`);
    if (M.FIN_MUSICA_017 > Math.floor(M.pulsoExacto(48)) - 2) mal(`la música acaba en f${M.FIN_MUSICA_017} y «Time» vuelve a pegar en f${M.pulsoExacto(48).toFixed(1)}: tiene que apagarse 2 f antes como mínimo`);
    const ctaFin = byId("c11-cta").en + byId("c11-cta").dur;
    const g = Array.isArray(musica.ganancia) ? musica.ganancia : [];
    const ultimoPunto = g.at(-1);
    if (!ultimoPunto || ultimoPunto[0] !== M.FIN_MUSICA_017 || ultimoPunto[1] !== 0) mal(`la envolvente de la música no acaba en silencio en f${M.FIN_MUSICA_017}`);
    const puntoCta = g.find((p) => p[0] === ctaFin);
    if (!puntoCta || !(puntoCta[1] > 0.3)) mal(`el piano tiene que estar a su nivel hasta que acaba la toma del CTA (f${ctaFin}) y apagarse desde ahí`);
  }
  /** El pulso entero al que `en` está más cerca. */
  function nPulsoMasCercano(en) {
    let mejor = 0;
    let dMejor = Infinity;
    for (let k = 0; k <= 56; k++) {
      const d = Math.abs(en - M.pulsoExacto(k));
      if (d < dMejor) {
        dMejor = d;
        mejor = k;
      }
    }
    return mejor;
  }
  // Cada plano, a ≤ 1 f del pulso entero más cercano de la rejilla MEDIDA (la disolvencia acaba en él).
  const lejos = [];
  const pulsos = [];
  for (const c of cortes) {
    if (c.id === "c12-cierre") continue; // la tarjeta empieza donde acaba la toma del CTA, no en un pulso
    const en = c.en;
    const k = en === 0 ? 0 : nPulsoMasCercano(en);
    const d = en - M.pulsoExacto(k);
    pulsos.push(`${c.id} n${k}`);
    if (c.id !== "c01-dron" && Math.abs(d) > TOLERANCIA_PULSO) lejos.push(`${c.id} a ${d.toFixed(1)} f del pulso ${k}`);
  }
  if (lejos.length) mal(`planos fuera de la rejilla: ${lejos.join(" · ")}`);
  // Los momentos grandes en golpes de FRASE (pulsos múltiplos de 8, salvo el patio, que cae dentro de su plano).
  const golpeEn = (k) => M.pulsoExacto(k);
  const fachada = byId("c03-fachada");
  const ventanal = byId("c06-ventanal");
  const cta = byId("c11-cta");
  const patio = byId("c09-patio");
  if (Math.abs(fachada.en - golpeEn(8)) > TOLERANCIA_PULSO) mal(`la fachada entra en f${fachada.en} y el golpe grande suena en f${golpeEn(8).toFixed(1)}`);
  if (Math.abs(ventanal.en - golpeEn(16)) > TOLERANCIA_PULSO) mal(`el ventanal entra en f${ventanal.en} y el golpe de frase suena en f${golpeEn(16).toFixed(1)}`);
  if (Math.abs(cta.en - golpeEn(40)) > TOLERANCIA_PULSO) mal(`el CTA entra en f${cta.en} y la resolución de piano suena en f${golpeEn(40).toFixed(1)}`);
  const f32 = golpeEn(32);
  if (!(f32 > patio.en && f32 < patio.en + patio.dur)) mal(`el golpe de frase del compás 32 suena en f${f32.toFixed(1)}, fuera del plano del patio (f${patio.en}-${patio.en + patio.dur})`);
  if (fallos.length === n) {
    ok(`«Time» desde el ${M.INICIO_MUSICA.toFixed(3)} s, una sola canción · ${cortes.length - 1} planos a ≤${TOLERANCIA_PULSO} f de un pulso (${pulsos.slice(0, 4).join(", ")}…) · el golpe grande entra con la fachada (f${fachada.en}), el de frase el ventanal (f${ventanal.en}), el patio cae en f${f32.toFixed(0)} y la resolución abre el CTA (f${cta.en})`);
  }
}

/* 6 · la música baja cuando habla Isabella ─────────────────────────────── */
seccion("6. la música baja bajo su voz");
{
  const n = fallos.length;
  const musica = A.audio017.find((t) => t.id === "musica");
  const nivel = (f) => T.volumenDe(musica, f - musica.en);
  const arriba = Math.max(...Array.from({ length: DURACION }, (_, f) => nivel(f)));
  const filas = [];
  const ventanaHook = ventanasDeVoz.find((x) => x.id === "c02-hook");
  for (const v of ventanasDeVoz.filter((x) => x.id === "c02-hook" || x.id === "c07-mitad")) {
    // En CADA frame de la ventana de voz la música está en su nivel bajo (≤ 20 % de lo que sube).
    let peor = 0;
    for (let f = v.ini; f <= v.fin; f++) peor = Math.max(peor, nivel(f));
    const db = 20 * Math.log10(peor / arriba);
    if (peor > arriba * 0.2) mal(`${v.id}: durante su voz (f${v.ini}-${v.fin}) la música llega a ${db.toFixed(1)} dB bajo su nivel de recorrido; tiene que estar por debajo de −14 dB`);
    // …y SUBE de nuevo antes del siguiente plano (no se queda enterrada tras callarse ella).
    const despues = nivel(v.fin + 16);
    if (despues < arriba * 0.9) mal(`${v.id}: 16 f después de su última palabra la música sigue en ${(20 * Math.log10(despues / arriba)).toFixed(1)} dB; tiene que haber vuelto arriba`);
    filas.push(`${v.id} ${db.toFixed(1)} dB`);
  }
  // Antes de la primera palabra del hook la música ya está ARRIBA (el golpe de apertura suena entero) y baja antes de ella.
  if (nivel(Math.max(0, ventanaHook.ini - 40)) < arriba * 0.9) mal("el golpe de apertura no suena a su nivel: la música ya está baja antes de la voz del hook");
  if (nivel(ventanaHook.ini) > arriba * 0.2) mal("la música aún no ha bajado cuando entra la primera palabra del hook");
  // La resolución del CTA: queda sin ducking, y por tanto un nivel constante bajo su voz (el piano ya es 16 dB más bajo).
  const cta = byId("c11-cta");
  const { ini, fin } = vozDe(cta);
  const dentro = Array.from({ length: fin - ini }, (_, i) => nivel(ini + i));
  if (Math.max(...dentro) - Math.min(...dentro) > 1e-6 && Math.min(...dentro) < arriba * 0.9) mal("la música baja y sube bajo la voz del CTA: se declaró sin ducking (la canción ya está abajo)");
  if (fallos.length === n) ok(`la música baja a ${filas.join(" · ")} durante su voz (hook y mitad) y vuelve a su nivel antes del plano siguiente; bajo el CTA va sin ducking porque la canción ya cae 16 dB`);
}

/* 7 · subtítulos ────────────────────────────────────────────────────────── */
seccion("7. subtítulos editoriales");
{
  const n = fallos.length;
  if (E.modoTextoDe(CANAL) !== "editorial") mal(`el canal está en modo «${E.modoTextoDe(CANAL)}»: esta pieza monta subtítulos editoriales`);
  const letra = E.letraSubtitulosDe(CANAL);
  const acentoMenos = puerta.modulos.subtitulos.ACENTO_MENOS_017;
  for (const a of E.revisaSubtitulosEditoriales(bloques, { fps, ancho: 1080, alto: 1920, duracion: DURACION, letra, acentoMenos })) mal(`revisaSubtitulosEditoriales: ${a}`);
  // La cursiva, 8 px más pequeña (revisión 5): la constante, que la composición se la pase al componente, y el efecto medido en el motor.
  const vistaCuadro = { ancho: 1080, alto: 1920 };
  if (acentoMenos !== ACENTO_MENOS_PEDIDO) mal(`ACENTO_MENOS_017 = ${acentoMenos} y el encargo pide ${ACENTO_MENOS_PEDIDO} px menos en la cursiva`);
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
  // Todo lo que dice Isabella va ABAJO (el encargo lo pide) y a 90 %. Arriba no hay nada (ver 2c).
  for (const b of bloques) {
    if ((b.posicion ?? "abajo") !== "abajo") mal(`[${b.id}] va ${b.posicion}: los subtítulos de Isabella van abajo`);
  }
  const fuente = readFileSync(join(RAIZ, "remotion", "src", "proyectos", "017", "Recorrido017.tsx"), "utf8");
  const mOp = /export const OPACIDAD_SUBTITULOS\s*=\s*([0-9.]+)/.exec(fuente);
  if (!mOp || Math.abs(Number(mOp[1]) - OPACIDAD_PEDIDA) > 1e-9) mal(`OPACIDAD_SUBTITULOS = ${mOp ? mOp[1] : "?"} y el encargo pide ${OPACIDAD_PEDIDA}`);
  if (!/<SubtitulosEditoriales\b[^>]*\bacentoMenos=\{ACENTO_MENOS_017\}/.test(fuente)) mal("la composición no le pasa `acentoMenos={ACENTO_MENOS_017}` a <SubtitulosEditoriales>: la cursiva saldría a su tamaño de siempre");
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
  // Sin datos grandes: el formato solo admite uno, y solo en el bloque 3 (aquí el dato va dicho, en MD09).
  for (const b of bloques) if (b.trozos.some((t) => t.estilo === "dato")) mal(`[${b.id}] lleva un dato grande: esta pieza no lo lleva (la cifra la dice Isabella en MD09)`);
  const acentos = bloques.reduce((s, b) => s + b.trozos.filter((t) => t.estilo === "acento").length, 0);
  if (fallos.length === n) ok(`${bloques.length} bloques, ${acentos} acentos · validador sin avisos con las letras del canal · todo lo de Isabella abajo, a ${OPACIDAD_PEDIDA * 100} % · la cursiva ${ACENTO_MENOS_PEDIDO} px menor (${cursiva}) · cada trozo sobre una palabra dicha · nada encima de ella`);
}

/* 8-10 · formato ────────────────────────────────────────────────────────── */
seccion("8. metraje disponible");
puerta.metrajeDisponible();
seccion("9. tramos disjuntos");
puerta.tramosDisjuntos();
seccion("10. encuadre");
puerta.encuadre({ techoZoom: TECHO_ZOOM });

/* 11 · nada «por confirmar» en los planos (solo con --final) ───────────────── */
{
  // Una palabra, una cifra o un nombre que el plan lleva marcado «POR CONFIRMAR AL OÍDO» es un pendiente con el
  // usuario, no un detalle: en el 017 «esta línea en específico» (whisper, confianza 0,06) estuvo marcada así desde
  // la rev. 1 y llegó a la final exportada con la palabra equivocada («unidad»). Durante el montaje avisa; con
  // `--final` es un fallo: antes de exportar se cierra cada uno con el usuario.
  const final = process.argv.includes("--final");
  const carpetas = [join(RAIZ, "remotion", "src", "proyectos", "017"), join(RAIZ, "proyectos", "017", "voz")];
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

puerta.cierra(`el 017 pasa la puerta: ${cortes.length} planos, ${bloques.length} bloques de texto, ${A.audio017.length} tramos de audio`);
