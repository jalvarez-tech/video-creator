#!/usr/bin/env node
/**
 * revisar-marca.mjs — LA RED DE LA PARAMETRIZACIÓN DE MARCA.
 *
 * Uso (desde cualquier sitio):
 *   node manuales/motion-graphics/scripts/revisar-marca.mjs
 *
 * Sale 0 si todo pasa, 1 si algo falla. Encadenable con el resto:
 *   npm run lint && node …/revisar-catalogo.mjs && node …/revisar-marca.mjs
 *
 * QUÉ PROTEGE, y por qué hace falta un test y no basta el compilador. La
 * refactorización que sacó la marca del motor dejó cinco invariantes que `tsc`
 * NO puede ver porque son de IDENTIDAD y de VALOR, no de tipo:
 *
 *   · dos marcas COEXISTEN — el mismo repo monta dos canales sin editar nada
 *     entre renders. Antes era imposible: la marca era un `export const` que
 *     diecinueve archivos importaban.
 *   · el TAMAÑO no es de la marca — un canal cambia colores y letra, no la
 *     escala tipográfica. Si un perfil pudiera mover el cuerpo del titular, dos
 *     piezas del mismo formato dejarían de parecerse.
 *   · los MEMOS devuelven el MISMO objeto — `dialectoEditorialDe(m)` y
 *     `temaNoticiasDe(m)` se llaman por nodo y por frame, y los planes ligan el
 *     dialecto a nivel de módulo. Si la fábrica devolviera copias, dos planes
 *     del mismo canal tendrían dialectos distintos por identidad y cualquier
 *     `useMemo` con el dialecto en las dependencias se rompería EN SILENCIO.
 *   · el REGISTRO COMPARTIDO es una sola verdad — las seis piezas de
 *     `motor/piezas/` tienen que ser el MISMO objeto en los dos dialectos, no
 *     dos fichas equivalentes que puedan divergir.
 *   · el ORDEN de `PIEZAS` no se mueve — `Object.keys(PIEZAS)` es el orden del
 *     catálogo y de la comp `Catalogo`. Reordenarlo mueve todos sus frames.
 *
 * Y desde que la letra se empaqueta, una sexta: la LETRA de cada marca es la
 * que dice ser. `MARCA_BASE` sigue con la letra de sistema (sus valores no se
 * tocan: hay piezas publicadas que dependen de ellos) y la marca de ejemplo del
 * producto declara `LETRA_INTER`, la empaquetada, que pinta igual en cualquier
 * máquina.
 *
 * Y una séptima desde que existen los subtítulos editoriales: el TEXTO EN
 * PANTALLA de una marca (`Marca.texto`) es opcional, el suelo no lo declara y
 * quien no lo declara sigue en modo banda con la letra del motor. Si el suelo
 * lo declarase, todas las marcas lo heredarían por spread.
 *
 * DOS FALLOS REALES QUE ESTE TEST CAZÓ el día que se escribió, y que ni el
 * compilador ni la sonda de frames veían:
 *   1. Un plan publicado compilaba con `capa(NOTICIAS, …)` en vez de con
 *      `dialectoEditorialDe(<la marca del canal>)`: el plan estaba SIN CANAL. No
 *      movía un píxel —los colores coinciden por herencia y el sello lo ponía
 *      la comp— así que la sonda no podía verlo.
 *   2. Un comentario del núcleo afirmaba una identidad que la mudanza de los
 *      perfiles a `src/marcas/` había vuelto falsa.
 *
 * DOS PARTES. El NÚCLEO corre siempre: usa `MARCA_BASE`, la marca de ejemplo
 * (`marcas/ejemplo.ts`, si existe) y el plan de demo como fixture. La parte del
 * ESTUDIO —los planes publicados 006 y 007, que viven fuera del producto— solo
 * corre si esos archivos están en disco; si no, se salta con un aviso y no
 * cuenta como fallo. Así el dueño sigue corriendo todas sus comprobaciones y un
 * clon limpio del producto también pasa.
 *
 * HERMANO DE `revisar-sonda.mjs`, y se complementan: la sonda dice si algo se
 * movió; esto dice si algo dejó de ser cierto. Un refactor puede pasar la sonda
 * con nota y haber desconectado un gancho — eso solo lo caza un invariante.
 *
 * Mismo patrón que `medir-anchos.mjs`: transpila con el esbuild que Remotion ya
 * trae y lo importa. Los dialectos y los planes son datos puros.
 */
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { RAIZ, borrar, carpetaTemporal, log } from "../../../herramientas/comun.mjs";

const root = RAIZ;
const src = path.join(root, "remotion", "src");
const en = (...p) => JSON.stringify(path.join(src, ...p));
const hay = (...p) => fs.existsSync(path.join(src, ...p));

/* ── Qué hay en disco: el producto siempre, el estudio si está ─────────── */
const HAY_EJEMPLO = hay("marcas", "ejemplo.ts");
// Planes publicados del ESTUDIO: no viajan en el producto, y ahí este bloque se
// salta con un aviso. No son un ejemplo que copiar (para eso está plan-demo.ts):
// son la fixture con la que se escribió el test.
const PLANES_ESTUDIO = [
  ["noticia006", "proyectos/006/noticia-006"],
  ["noticia007", "proyectos/007/noticia-007"],
];
const HAY_ESTUDIO = PLANES_ESTUDIO.every(([, ruta]) => hay(`${ruta}.ts`));

let ENTRY = `
export { MARCA_BASE, LETRA_INTER, LETRA_SF_SISTEMA, LETRA_SUBTITULOS, PILA_INTER } from ${en("motor/marca")};
export { letraSubtitulosDe, modoTextoDe, revisaSubtitulosEditoriales, resuelveBloque, segmentosDe, sombraSubtitulosDe, SUB }
  from ${en("motor/subtitulos-editoriales")};
export { AVANCES_SUBTITULOS } from ${en("motor/subtitulos-editoriales.avances")};
export { subtitulosDemo, DURACION_SUBTITULOS_DEMO, FPS_SUBTITULOS_DEMO } from ${en("motor/demos/subtitulos-demo")};
export { letraDe } from ${en("motor/letra")};
export { PIEZAS_COMUNES } from ${en("motor/piezas")};
export { NOTICIAS, PIEZAS_NOTICIA, dialectoEditorialDe, letraEditorialDe, compilaNoticia }
  from ${en("motor/noticias/dialecto")};
export { GRAFICOS, PIEZAS, PALETA_MARCA, letraGraficosDe, LETRA_GRAFICOS }
  from ${en("motor/graficos/coreografia")};
export { temaNoticiasDe } from ${en("motor/noticias/theme-noticias")};
export { duracionPlan } from ${en("motor/noticias/plan")};
export { FONT } from ${en("motor/graficos/estilos")};
export { zonaSeguraDe } from ${en("motor/presets")};
export { EASE, opacidadVentana } from ${en("motor/motion")};
export { revisaPlan } from ${en("motor/plan/nucleo")};
export { noticiaDemo } from ${en("motor/demos/noticia-demo")};
`;
if (HAY_EJEMPLO) ENTRY += `export { EJEMPLO } from ${en("marcas/ejemplo")};\n`;
if (HAY_ESTUDIO) for (const [nombre, ruta] of PLANES_ESTUDIO) ENTRY += `export { ${nombre} } from ${en(ruta)};\n`;

async function carga() {
  const require = createRequire(path.join(root, "remotion", "package.json"));
  const esbuild = require("esbuild");
  const tmp = carpetaTemporal("marca-");
  const entrada = path.join(tmp, "entry.ts");
  const bundle = path.join(tmp, "out.cjs");
  fs.writeFileSync(entrada, ENTRY);
  try {
    await esbuild.build({
      entryPoints: [entrada],
      bundle: true,
      platform: "node",
      format: "cjs",
      outfile: bundle,
      logLevel: "error",
    });
    return require(bundle);
  } finally {
    borrar(tmp);
  }
}

const M = await carga();

let ok = 0;
const fallos = [];
const t = (nombre, cond, detalle = "") => {
  if (cond) {
    ok++;
    console.log("  ✓ " + nombre);
  } else {
    fallos.push(nombre);
    console.log("  ✗ " + nombre + (detalle ? "  → " + detalle : ""));
  }
};
const seccion = (s) => console.log("\n── " + s + " ──");

/* El canal con el que se prueba: la marca de ejemplo del producto. Si todavía
 * no existe, uno sintético con sello, para que el núcleo pruebe lo mismo. */
if (!HAY_EJEMPLO) log.aviso("no existe remotion/src/marcas/ejemplo.ts: sus invariantes se saltan y el núcleo usa un canal sintético");
const CANAL = M.EJEMPLO ?? { ...M.MARCA_BASE, nombre: "Canal sintético", sello: { texto: "CANAL A" } };
const acentoCanal = CANAL.color.acento;

/* Un canal de mentira, idéntico salvo en lo que un canal decide. */
const OTRA = {
  ...CANAL,
  nombre: "Canal de prueba",
  sello: { texto: "CANAL B" },
  color: { ...CANAL.color, acento: "#1E63FF", acentoChip: "#3A7BE8", papel: "#F2F4F8", negro: "#101418" },
  letra: { ...CANAL.letra, display: "Georgia, serif" },
};

seccion("La marca es un parámetro");
t("MARCA_BASE no es un canal (sello null)", M.MARCA_BASE.sello.texto === null);
if (HAY_EJEMPLO) {
  t("EJEMPLO sí lo es (lleva sello)", typeof M.EJEMPLO.sello.texto === "string" && M.EJEMPLO.sello.texto.trim() !== "");
  t("EJEMPLO no es el suelo: tiene su propio acento", M.EJEMPLO.color.acento !== M.MARCA_BASE.color.acento);
}
t("dos temas coexisten: acento", M.temaNoticiasDe(CANAL).N.naranja !== M.temaNoticiasDe(OTRA).N.naranja);
t("…y papel", M.temaNoticiasDe(OTRA).N.papel === "#F2F4F8");
t("el TAMAÑO no es de la marca", M.temaNoticiasDe(CANAL).T.titular.fontSize === M.temaNoticiasDe(OTRA).T.titular.fontSize);
t(
  "construir otra no contamina la primera",
  CANAL.color.acento === acentoCanal && M.NOTICIAS.paleta.acento === M.MARCA_BASE.color.acento
);
t(
  "compilaNoticia(…, otra) usa su dialecto",
  M.compilaNoticia([], { ancho: 1080, alto: 1920, fps: 30, duracion: 10 }, OTRA).dialecto.marca.nombre === OTRA.nombre
);

seccion("Identidad de los memos");
t("temaNoticiasDe estable", M.temaNoticiasDe(CANAL) === M.temaNoticiasDe(CANAL));
t("dialectoEditorialDe estable", M.dialectoEditorialDe(CANAL) === M.dialectoEditorialDe(CANAL));
t("dialectoEditorialDe(MARCA_BASE) === NOTICIAS", M.dialectoEditorialDe(M.MARCA_BASE) === M.NOTICIAS);

seccion("La letra: defecto de capa + override por marca");
// Las dos letras del motor son las que dicen ser. El suelo conserva la de
// sistema porque hay piezas publicadas medidas con ella; la empaquetada es la
// de toda marca nueva.
t("MARCA_BASE.letra === LETRA_SF_SISTEMA (los píxeles publicados no se mueven)", M.MARCA_BASE.letra === M.LETRA_SF_SISTEMA);
t("LETRA_INTER es la pila de la capa de gráficos (FONT de estilos.ts)", M.LETRA_INTER.texto === M.FONT && M.LETRA_INTER.display === M.PILA_INTER);
t(
  "LETRA_INTER resuelve sus 4 tablas medidas",
  [500, 600, 700, 800].every((w) => typeof M.letraEditorialDe({ ...M.MARCA_BASE, letra: M.LETRA_INTER }).tablas[w] === "object")
);
if (HAY_EJEMPLO) t("EJEMPLO.letra === LETRA_INTER (la empaquetada)", M.EJEMPLO.letra === M.LETRA_INTER);
t("gráficos usa su defecto (Inter) aunque la marca hable en letra de sistema", M.letraGraficosDe(M.MARCA_BASE).display === M.LETRA_GRAFICOS.display);
t("editorial usa la voz de la marca", M.letraEditorialDe(CANAL).display === CANAL.letra.display);
const CONVOZ = { ...CANAL, letraPorCapa: { graficos: { display: "Courier", texto: "Courier", tablas: CANAL.letra.tablas } } };
t("la marca puede sobrescribir la de gráficos", M.letraGraficosDe(CONVOZ).display === "Courier");
t("…sin tocar la editorial", M.letraEditorialDe(CONVOZ).display === CANAL.letra.display);
t("las 4 tablas llegan RESUELTAS, no como claves", [500, 600, 700, 800].every((w) => typeof M.letraEditorialDe(CANAL).tablas[w] === "object"));

seccion("El texto en pantalla: un campo OPCIONAL de la marca");
// El campo es nuevo y las piezas publicadas no: lo que aquí se fija es que quien
// no lo declara sigue exactamente donde estaba, y que declararlo no se cuela en
// ninguna otra marca.
t("MARCA_BASE no lo declara (las marcas heredan por spread)", M.MARCA_BASE.texto === undefined);
t("sin declararlo, el modo es banda", M.modoTextoDe(M.MARCA_BASE) === "banda" && M.modoTextoDe({ ...CANAL, texto: undefined }) === "banda");
t("…y la letra es la del motor, el MISMO objeto", M.letraSubtitulosDe(M.MARCA_BASE) === M.LETRA_SUBTITULOS);
const CONTEXTO = { ...CANAL, texto: { modo: "editorial", letra: { acento: { familia: "Georgia, serif", peso: 400, italica: true } } } };
t("una marca puede pedir editorial", M.modoTextoDe(CONTEXTO) === "editorial");
t("…con su acento y el resto del motor", M.letraSubtitulosDe(CONTEXTO).acento.familia === "Georgia, serif" && M.letraSubtitulosDe(CONTEXTO).base === M.LETRA_SUBTITULOS.base);
t("…sin tocar a las demás", M.modoTextoDe(CANAL) === (CANAL.texto ? CANAL.texto.modo : "banda") && M.MARCA_BASE.texto === undefined);
t(
  "las tres letras del motor tienen tabla medida",
  ["base", "acento", "dato"].every((e) => typeof M.AVANCES_SUBTITULOS[M.LETRA_SUBTITULOS[e].tabla] === "object")
);
t(
  "…de su familia, peso y estilo (una tabla prestada mediría mal en silencio)",
  ["base", "acento", "dato"].every((e) => {
    const l = M.LETRA_SUBTITULOS[e];
    const tabla = M.AVANCES_SUBTITULOS[l.tabla];
    return l.familia.indexOf(tabla.familia) === 0 && tabla.peso === l.peso && tabla.italica === l.italica;
  })
);
const opcionesDemo = { fps: M.FPS_SUBTITULOS_DEMO, ancho: 1080, alto: 1920, duracion: M.DURACION_SUBTITULOS_DEMO };
const avisosDemo = M.revisaSubtitulosEditoriales(M.subtitulosDemo, opcionesDemo);
t("el plan de demo pasa su validador", avisosDemo.length === 0, avisosDemo.slice(0, 2).join(" | "));
const dosAcentos = M.subtitulosDemo.map((b) => (b.id === "b03" ? { ...b, trozos: b.trozos.map((x) => ({ ...x, estilo: "acento" })) } : b));
t("dos acentos en un bloque: avisa", M.revisaSubtitulosEditoriales(dosAcentos, opcionesDemo).some((a) => a.includes("[b03]") && a.includes("acentos")));
const largo = [{ id: "x", hasta: 60, trozos: [{ desde: 10, texto: "una línea de acento que de ninguna manera cabe", estilo: "acento" }] }];
const resuelto = M.resuelveBloque(largo[0], { ancho: 1080, alto: 1920 }, M.LETRA_SUBTITULOS);
t("una línea que no cabe se ENCOGE hasta caber, no se sale", resuelto.lineas[0].encoge < 1 && resuelto.lineas[0].ancho <= resuelto.anchoUtil);
t("…y el validador lo dice", M.revisaSubtitulosEditoriales(largo, opcionesDemo).some((a) => a.includes("se encoge")));
t("sin tabla no se ajusta a ciegas: se avisa", M.revisaSubtitulosEditoriales(M.subtitulosDemo, { ...opcionesDemo, letra: M.letraSubtitulosDe(CONTEXTO) }).some((a) => a.includes("no tiene tabla")));
t("sin declararla, la sombra es la de la marca", M.sombraSubtitulosDe(M.MARCA_BASE) === M.MARCA_BASE.sombra.textoCine + ", " + M.MARCA_BASE.sombra.texto);
t("…y `sombra: null` la quita", M.sombraSubtitulosDe({ ...CANAL, texto: { modo: "editorial", sombra: null } }) === "none");
const roto = [{ id: "r", hasta: 60, trozos: [{ desde: 10, texto: "hola", estilo: "énfasis" }, { desde: 20 }] }];
let avisosRoto = null;
try {
  avisosRoto = M.revisaSubtitulosEditoriales(roto, opcionesDemo);
  M.resuelveBloque(roto[0], { ancho: 1080, alto: 1920 }, M.LETRA_SUBTITULOS);
  M.segmentosDe(roto, 30);
} catch (e) {
  avisosRoto = null;
}
t(
  "un plan roto (estilo desconocido, texto ausente) se AVISA, no revienta",
  Array.isArray(avisosRoto) && avisosRoto.some((a) => a.includes("desconocido")) && avisosRoto.some((a) => a.includes("sin texto"))
);
const srt = M.segmentosDe(M.subtitulosDemo, M.FPS_SUBTITULOS_DEMO);
t(
  "el .srt no pierde las líneas que entran en el mismo frame (un bloque ya puesto)",
  srt[0].from === 0 && srt[0].text === "¿Y si tu próximo vídeo" && srt.every((x, i) => x.to > x.from && (i === 0 || x.from >= srt[i - 1].to))
);
// `acentoMenos`: lo que una PIEZA le resta a la itálica. Sin él, el motor da lo de siempre (las piezas publicadas no se mueven).
{
  const vista = { ancho: 1080, alto: 1920 };
  const conAcento = M.subtitulosDemo.find((b) => b.id === "b03");
  const sin = M.resuelveBloque(conAcento, vista, M.LETRA_SUBTITULOS);
  const igual = M.resuelveBloque(conAcento, vista, M.LETRA_SUBTITULOS, {});
  const con = M.resuelveBloque(conAcento, vista, M.LETRA_SUBTITULOS, { acentoMenos: 8 });
  t("acentoMenos: sin ajuste (o vacío) el cuerpo del acento es el de siempre", JSON.stringify(sin) === JSON.stringify(igual) && sin.lineas.some((l) => l.estilo === "acento" && l.px === 99));
  t(
    "…con 8 baja la cursiva 8 px (99 → 91) y NADA más: la base no se toca",
    con.lineas.every((l, i) => (l.estilo === "acento" ? l.px === sin.lineas[i].px - 8 : l.px === sin.lineas[i].px && l.alto === sin.lineas[i].alto))
  );
  t("…la línea sigue a su cuerpo (el bloque encoge, no baila) y el borde de arriba se queda", con.lineas.find((l) => l.estilo === "acento").alto < sin.lineas.find((l) => l.estilo === "acento").alto && con.top === sin.top);
  t("un ajuste que no es un número se ignora (no revienta)", JSON.stringify(M.resuelveBloque(conAcento, vista, M.LETRA_SUBTITULOS, { acentoMenos: Number.NaN })) === JSON.stringify(sin));
  t(
    "el validador mide con el cuerpo con que se va a pintar",
    M.revisaSubtitulosEditoriales([largo[0]], { ...opcionesDemo, acentoMenos: 8 }).length <= M.revisaSubtitulosEditoriales([largo[0]], opcionesDemo).length
  );
}
t(
  "ningún bloque de la demo pasa del suelo del 88 %",
  M.subtitulosDemo.every((b) => {
    const r = M.resuelveBloque(b, { ancho: 1080, alto: 1920 }, M.LETRA_SUBTITULOS);
    return r.top >= 0 && r.top + r.alto <= Math.round(1920 * M.SUB.suelo);
  })
);

seccion("El registro compartido");
const comunes = Object.keys(M.PIEZAS_COMUNES);
t("son 6", comunes.length === 6, comunes.join(","));
t("están en GRÁFICOS", comunes.every((k) => k in M.PIEZAS));
t("están en EDITORIAL", comunes.every((k) => k in M.PIEZAS_NOTICIA));
t("y son EL MISMO objeto (una sola verdad)", comunes.every((k) => M.PIEZAS[k] === M.PIEZAS_COMUNES[k] && M.PIEZAS_NOTICIA[k] === M.PIEZAS_COMUNES[k]));
t("gráficos conserva 20 piezas", Object.keys(M.PIEZAS).length === 20, String(Object.keys(M.PIEZAS).length));
t("editorial tiene 17", Object.keys(M.PIEZAS_NOTICIA).length === 17, String(Object.keys(M.PIEZAS_NOTICIA).length));
const ORDEN = ["kicker","titular","etiqueta","cifra","chip","glifo","caret","contador","barra","regla","lista","barras","serie","subrayado","rodea","flecha","check","aspa","nodo","enlace"];
t("el ORDEN de PIEZAS no se movió (= el del catálogo)", JSON.stringify(Object.keys(M.PIEZAS)) === JSON.stringify(ORDEN));
const tg = Object.keys(M.PALETA_MARCA);
const tn = Object.keys(M.NOTICIAS.paleta);
t("las tintas siguen DISJUNTAS (por eso el contrato es ctx.color)", tg.filter((x) => tn.includes(x)).length === 0);

seccion("Formato y movimiento");
t("zona segura 16:9 → 5 %", M.zonaSeguraDe(1920, 1080) === 5);
t("zona segura 9:16 → 11 %", M.zonaSeguraDe(1080, 1920) === 11);
t("zona segura 1:1 → 8 %", M.zonaSeguraDe(1080, 1080) === 8);
t("…por PROPORCIÓN, no por píxeles", M.zonaSeguraDe(720, 1280) === 11);
t("lienzo sin preset → el 11 % de la casa", M.zonaSeguraDe(2560, 1080) === 11);
const ys = [...Array(1001).keys()].map((i) => M.EASE.frenoLargo(i / 1000));
t("frenoLargo: f(0)=0, f(1)=1", ys[0] === 0 && ys[1000] === 1);
t("frenoLargo: monótona y acotada", ys.every((v, i) => v >= 0 && v <= 1 && (i === 0 || v >= ys[i - 1] - 1e-12)));
t("frenoLargo: frena en el último 30 %", M.EASE.frenoLargo(0.7) > 0.9 && M.EASE.frenoLargo(0.7) < 0.96);

seccion("Comun.sale");
t("el fundido de salida existe", M.opacidadVentana(100, 100, 1, 20) < 0.05 && M.opacidadVentana(50, 100, 1, 20) === 1);
t("…y degrada a 1 si no cabe, en vez de reventar", M.opacidadVentana(1, 2, 1, 20) === 1);
// El fixture es el plan de DEMO del producto, compilado para el canal de prueba:
// lo mismo que monta `<PistaNoticia>`. Se clona para pinchar un `sale` sin tocar
// el original; el dialecto (con funciones) se vuelve a colgar tal cual.
const demo = M.compilaNoticia(
  M.noticiaDemo.slice(),
  { ancho: 1080, alto: 1920, fps: 30, duracion: M.duracionPlan(M.noticiaDemo) },
  CANAL
);
t("el plan de demo compila con el canal", demo.dialecto === M.dialectoEditorialDe(CANAL));
const conSale = JSON.parse(JSON.stringify(demo));
conSale.dialecto = demo.dialecto;
conSale.tomas[0].hijos[0].sale = { como: "fundido", dur: 999 };
t("revisaPlan avisa del fundido que no cabe", M.revisaPlan(conSale).filter((a) => a.includes("fundido")).length === 1);

/* ── El estudio: solo si sus planes están en disco ─────────────────────── */
if (HAY_ESTUDIO) {
  seccion("Los planes publicados compilan CON canal (estudio)");
  // La marca no se nombra: se lee del propio plan. Lo que se comprueba es que
  // los dos planes ligan el MISMO dialecto, que ese dialecto es el memo de su
  // marca y que la marca no es el suelo del motor.
  const MARCA = M.noticia006.dialecto.marca;
  t("006 y 007 comparten dialecto", M.noticia006.dialecto === M.noticia007.dialecto);
  t("…y es el memo de su marca", M.noticia006.dialecto === M.dialectoEditorialDe(MARCA));
  t("…que no es el suelo del motor", MARCA !== M.MARCA_BASE && M.noticia006.dialecto !== M.NOTICIAS);
  t("…con su sello (no el suelo)", typeof MARCA.sello.texto === "string" && MARCA.sello.texto.trim() !== "");
  // Las piezas 004-007 se midieron con la letra de sistema: si la marca del
  // canal cambiara de letra, cambiarían sus píxeles y los avisos de R09.
  t("su letra sigue siendo la de sistema (píxeles publicados)", MARCA.letra === M.LETRA_SF_SISTEMA);
  for (const [nombre] of PLANES_ESTUDIO) {
    const a = M.revisaPlan(M[nombre]);
    t(`${nombre}: revisaPlan sin avisos`, a.length === 0, a.slice(0, 2).join(" | "));
  }
} else {
  console.log("");
  log.aviso("sin los planes 006/007 del estudio en remotion/src/proyectos/: sus invariantes se saltan (solo existen en el estudio)");
}

console.log(`\n${ok} pasan · ${fallos.length} fallan\n`);
if (fallos.length) {
  console.log("FALLAN: " + fallos.join(", ") + "\n");
  process.exit(1);
}
