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
 * DOS FALLOS REALES QUE ESTE TEST CAZÓ el día que se escribió, y que ni el
 * compilador ni la sonda de frames veían:
 *   1. `noticia-006.ts` compilaba con `capa(NOTICIAS, …)` en vez de con
 *      `dialectoEditorialDe(LUXUR)`: el plan estaba SIN CANAL. No movía un
 *      píxel —los colores coinciden por herencia y el watermark lo ponía la
 *      comp— así que la sonda no podía verlo.
 *   2. Un comentario del núcleo afirmaba una identidad que la mudanza de los
 *      perfiles a `src/marcas/` había vuelto falsa.
 *
 * HERMANO DE `revisar-sonda.mjs`, y se complementan: la sonda dice si algo se
 * movió; esto dice si algo dejó de ser cierto. Un refactor puede pasar la sonda
 * con nota y haber desconectado un gancho — eso solo lo caza un invariante.
 *
 * Mismo patrón que `medir-anchos.mjs`: transpila con el esbuild que Remotion ya
 * trae y lo importa. Los dialectos y los planes son datos puros.
 */
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const aqui = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(aqui, "..", "..", ".."); // …/video-creator
const src = path.join(root, "remotion", "src");

const ENTRY = `
export { MARCA_BASE } from ${JSON.stringify(path.join(src, "motor/marca"))};
export { LUXUR } from ${JSON.stringify(path.join(src, "marcas/luxur"))};
export { letraDe } from ${JSON.stringify(path.join(src, "motor/letra"))};
export { PIEZAS_COMUNES } from ${JSON.stringify(path.join(src, "motor/piezas"))};
export { NOTICIAS, PIEZAS_NOTICIA, dialectoEditorialDe, letraEditorialDe, compilaNoticia }
  from ${JSON.stringify(path.join(src, "motor/noticias/dialecto"))};
export { GRAFICOS, PIEZAS, PALETA_MARCA, letraGraficosDe, LETRA_GRAFICOS }
  from ${JSON.stringify(path.join(src, "motor/graficos/coreografia"))};
export { temaNoticiasDe } from ${JSON.stringify(path.join(src, "motor/noticias/theme-noticias"))};
export { zonaSeguraDe } from ${JSON.stringify(path.join(src, "motor/presets"))};
export { EASE, opacidadVentana } from ${JSON.stringify(path.join(src, "motor/motion"))};
export { revisaPlan } from ${JSON.stringify(path.join(src, "motor/plan/nucleo"))};
export { noticia006 } from ${JSON.stringify(path.join(src, "proyectos/006/noticia-006"))};
export { noticia007 } from ${JSON.stringify(path.join(src, "proyectos/007/noticia-007"))};
export { noticia004 } from ${JSON.stringify(path.join(src, "proyectos/004/noticia-004"))};
`;

async function carga() {
  const require = createRequire(path.join(root, "remotion", "package.json"));
  const esbuild = require("esbuild");
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "marca-"));
  const entrada = path.join(tmp, "entry.ts");
  const bundle = path.join(tmp, "out.cjs");
  fs.writeFileSync(entrada, ENTRY);
  await esbuild.build({
    entryPoints: [entrada],
    bundle: true,
    platform: "node",
    format: "cjs",
    outfile: bundle,
    logLevel: "error",
  });
  const mod = require(bundle);
  fs.rmSync(tmp, { recursive: true, force: true });
  return mod;
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

/* Un canal de mentira, idéntico salvo en lo que un canal decide. */
const OTRA = {
  ...M.LUXUR,
  nombre: "Canal de prueba",
  sello: { texto: "CANAL B" },
  color: { ...M.LUXUR.color, acento: "#1E63FF", acentoChip: "#3A7BE8", papel: "#F2F4F8", negro: "#101418" },
  letra: { ...M.LUXUR.letra, display: "Georgia, serif" },
};

seccion("La marca es un parámetro");
t("MARCA_BASE no es un canal (sello null)", M.MARCA_BASE.sello.texto === null);
t("LUXUR sí lo es", M.LUXUR.sello.texto === "PROPIEDADES LUXUR");
t("dos temas coexisten: acento", M.temaNoticiasDe(M.LUXUR).N.naranja !== M.temaNoticiasDe(OTRA).N.naranja);
t("…y papel", M.temaNoticiasDe(OTRA).N.papel === "#F2F4F8");
t("el TAMAÑO no es de la marca", M.temaNoticiasDe(M.LUXUR).T.titular.fontSize === M.temaNoticiasDe(OTRA).T.titular.fontSize);
t("construir otra no contamina la primera", M.LUXUR.color.acento === "#FF5500" && M.NOTICIAS.paleta.acento === "#FF5500");
t("compilaNoticia(…, otra) usa su dialecto", M.compilaNoticia([], { ancho: 1080, alto: 1920, fps: 30, duracion: 10 }, OTRA).dialecto.marca.nombre === OTRA.nombre);

seccion("Identidad de los memos");
t("temaNoticiasDe estable", M.temaNoticiasDe(M.LUXUR) === M.temaNoticiasDe(M.LUXUR));
t("dialectoEditorialDe estable", M.dialectoEditorialDe(M.LUXUR) === M.dialectoEditorialDe(M.LUXUR));
t("dialectoEditorialDe(MARCA_BASE) === NOTICIAS", M.dialectoEditorialDe(M.MARCA_BASE) === M.NOTICIAS);

seccion("Los planes publicados compilan CON canal");
t("006 y 007 comparten dialecto", M.noticia006.dialecto === M.noticia007.dialecto);
t("…y es el de LUXUR", M.noticia006.dialecto === M.dialectoEditorialDe(M.LUXUR));
t("…con su sello (no el suelo)", M.noticia006.dialecto.marca.sello.texto === "PROPIEDADES LUXUR");
for (const [n, p] of [["006", M.noticia006], ["007", M.noticia007]]) {
  const a = M.revisaPlan(p);
  t(`noticia-${n}: revisaPlan sin avisos`, a.length === 0, a.slice(0, 2).join(" | "));
}

seccion("La letra: defecto de capa + override por marca");
t("gráficos usa su defecto (Inter)", M.letraGraficosDe(M.LUXUR).display === M.LETRA_GRAFICOS.display);
t("editorial usa la voz de la marca", M.letraEditorialDe(M.LUXUR).display === M.LUXUR.letra.display);
const CONVOZ = { ...M.LUXUR, letraPorCapa: { graficos: { display: "Courier", texto: "Courier", tablas: M.LUXUR.letra.tablas } } };
t("la marca puede sobrescribir la de gráficos", M.letraGraficosDe(CONVOZ).display === "Courier");
t("…sin tocar la editorial", M.letraEditorialDe(CONVOZ).display === M.LUXUR.letra.display);
t("las 4 tablas llegan RESUELTAS, no como claves", [500, 600, 700, 800].every((w) => typeof M.letraEditorialDe(M.LUXUR).tablas[w] === "object"));

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
const conSale = JSON.parse(JSON.stringify(M.noticia007));
conSale.dialecto = M.noticia007.dialecto;
conSale.tomas[0].hijos[0].sale = { como: "fundido", dur: 999 };
t("revisaPlan avisa del fundido que no cabe", M.revisaPlan(conSale).filter((a) => a.includes("fundido")).length === 1);

console.log(`\n${ok} pasan · ${fallos.length} fallan\n`);
if (fallos.length) {
  console.log("FALLAN: " + fallos.join(", ") + "\n");
  process.exit(1);
}
