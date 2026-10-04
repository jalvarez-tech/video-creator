#!/usr/bin/env node
/**
 * medir-letras-subtitulos.mjs — LA TABLA DE AVANCES de los subtítulos editoriales.
 *
 * Uso (desde cualquier sitio):
 *   node manuales/motion-graphics/scripts/medir-letras-subtitulos.mjs           # mide y reescribe la tabla
 *   node manuales/motion-graphics/scripts/medir-letras-subtitulos.mjs --check   # ¿sigue al día? sale 1 si no
 *
 * QUÉ GENERA: `remotion/src/motor/subtitulos-editoriales.avances.ts`, el avance
 * en EM de cada carácter para las cinco combinaciones de familia, peso y estilo
 * que la pista de subtítulos editoriales puede pintar (Quicksand 400/500/700 y
 * Lato itálica 400/700). Con esa tabla el motor sabe cuánto mide una línea
 * ANTES de pintarla —para encogerla si no cabe y para que el validador avise—
 * sin montar un DOM: corre con `node` pelado y da el mismo número en cualquier
 * máquina.
 *
 * POR QUÉ NO SE AÑADEN A `generar-avances.mjs`. Aquella tabla (`plan/avances.ts`)
 * es la de R09 y sus bloques están publicados: mide a cuatro anclas porque San
 * Francisco tiene eje óptico, guarda kerning par a par y solo se reescribe en
 * macOS. Nada de eso hace falta aquí —estas dos familias van empaquetadas y no
 * tienen eje óptico—, y meterlas allí obligaría a regenerar un archivo del que
 * dependen los avisos de todas las piezas publicadas. Tabla aparte, script
 * aparte, y aquél no se toca.
 *
 * CON QUÉ CHROME. Con el que abre `@remotion/renderer` (`openBrowser`), o sea
 * EXACTAMENTE el binario que renderiza los vídeos, y con las MISMAS caras que
 * registra `motor/fuentes.ts`: los TTF de `remotion/public/fuentes/quicksand/` y
 * `remotion/public/fuentes/lato/`, inyectados con los mismos descriptores (la
 * variable con `weight: "300 700"`; las de Lato con `style: italic`). Una
 * familia web tapa a la local del mismo nombre, así que da igual que la máquina
 * tenga o no una Quicksand o una Lato instaladas.
 *
 * CÓMO SE MIDE, y por qué así:
 *   · En el DOM (un <span>, `white-space: pre`, `letter-spacing: 0`), no en
 *     canvas: es lo que de verdad maqueta el intérprete. El tracking, si lo
 *     hay, lo suma quien consulta la tabla.
 *   · A UN SOLO CUERPO, 200 px. Un em basta cuando el avance escala con el
 *     cuerpo, y eso solo falla con un eje óptico (`opsz`). Ninguna de las dos
 *     lo tiene: la Quicksand variable trae un único eje (`wght`) y las Lato
 *     son estáticas. Aun así no se supone: se vuelve a medir a los cuerpos de
 *     `CUERPOS_CONTROL` y el script ABORTA si algún em se mueve más de
 *     `TOLERANCIA_PLANA`. A 200 px la rejilla de maquetación de Chrome (1/64 de
 *     px) queda por debajo del cuarto decimal del em.
 *   · COMPROBANDO QUE LA FAMILIA RESUELVE. Si una cara no carga, Chrome pinta
 *     con la siguiente de la pila y el script mediría, tan tranquilo, otra
 *     letra. Tres sondas, y cualquiera aborta: (1) el ancho de una frase con
 *     la familia delante tiene que diferir del genérico solo; (2) cada
 *     carácter tiene que medir lo mismo con dos genéricos distintos detrás
 *     (si cambia, ese glifo NO es de la familia: lo está pintando el
 *     respaldo); (3) los pesos de la variable tienen que dar anchos
 *     distintos (si no, el eje `wght` no se está aplicando).
 *
 * EL KERNING NO VA EN LA TABLA, pero se mide para poder decir cuánto pesa: los
 * pares que ENSANCHAN y un juego de frases de control, y el resultado se
 * escribe en la cabecera del archivo generado. Quien consulta la tabla cubre
 * ese residuo con su propio margen; aquí queda el número con el que decidirlo.
 */
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import path from "node:path";
import { RAIZ, abortar, esMain, flags, leerTexto, relativa } from "../../../herramientas/comun.mjs";

const DIR_FUENTES = path.join(RAIZ, "remotion", "public", "fuentes");
const DESTINO = path.join(RAIZ, "remotion", "src", "motor", "subtitulos-editoriales.avances.ts");

/** El cuerpo al que se mide la tabla. */
const CUERPO = 200;

/**
 * Cuerpos a los que se REPITE la medida solo para comprobar que el em no
 * depende del tamaño. 48 y 99 son los extremos de lo que la pista pinta: una
 * línea encogida al mínimo y un acento a su cuerpo entero.
 */
const CUERPOS_CONTROL = [48, 99];

/**
 * Cuánto puede variar un em entre cuerpos sin que eso sea un eje óptico: medio
 * por ciento, el mismo umbral que `generar-avances.mjs` y por lo mismo (por
 * debajo lo que se mide es la rejilla de 1/64 de px, no la fuente).
 */
const TOLERANCIA_PLANA = 0.005;

/** Por debajo de esto un delta de kerning es rejilla, no kerning. Mismo umbral que R09. */
const UMBRAL_KERNING = 0.002;

/* ══════════════════ 1 · LAS CARAS Y LAS COMBINACIONES ══════════════════════ */

/**
 * Las tres caras, con los descriptores con los que `motor/fuentes.ts` las
 * registra (es la tabla «Familias CSS registradas» del contrato). Si aquí se
 * declarara otra cosa, la tabla mediría una letra que el render no pinta.
 */
const CARAS = [
  { familia: "Quicksand", peso: "300 700", estilo: "normal", archivo: "quicksand/Quicksand-Variable.ttf" },
  { familia: "Lato", peso: "400", estilo: "italic", archivo: "lato/Lato-Italic.ttf" },
  { familia: "Lato", peso: "700", estilo: "italic", archivo: "lato/Lato-BoldItalic.ttf" },
  { familia: "Montserrat", peso: "100 900", estilo: "normal", archivo: "montserrat/Montserrat-Variable.ttf" },
  { familia: "Playfair Display", peso: "400 900", estilo: "italic", archivo: "playfair/PlayfairDisplay-Italic-Variable.ttf" },
];

/**
 * Las combinaciones que se miden. La clave es la que referencia una letra de
 * marca (`tabla: "quicksand500"`): no se renombra sin tocar a quien la usa.
 */
const COMBOS = [
  { clave: "quicksand400", familia: "Quicksand", peso: 400, italica: false, usos: "la redonda fina, para un canal que declare lo dicho sin peso" },
  { clave: "quicksand500", familia: "Quicksand", peso: 500, italica: false, usos: "lo dicho: el estilo «base» de la letra por defecto del motor" },
  { clave: "quicksand700", familia: "Quicksand", peso: 700, italica: false, usos: "el estilo «dato» de la letra por defecto: el peso más alto de la variable" },
  { clave: "lato400i", familia: "Lato", peso: 400, italica: true, usos: "la itálica fina, para un canal que declare el acento sin negrita" },
  { clave: "lato700i", familia: "Lato", peso: 700, italica: true, usos: "el estilo «acento» de la letra por defecto del motor" },
  { clave: "montserrat400", familia: "Montserrat", peso: 400, italica: false, usos: "la redonda fina de Montserrat, para lo dicho sin peso" },
  { clave: "montserrat500", familia: "Montserrat", peso: 500, italica: false, usos: "lo dicho, en un canal que declare Montserrat" },
  { clave: "montserrat700", familia: "Montserrat", peso: 700, italica: false, usos: "el dato, en un canal que declare Montserrat" },
  { clave: "playfair500i", familia: "Playfair Display", peso: 500, italica: true, usos: "el acento fino en serif" },
  { clave: "playfair600i", familia: "Playfair Display", peso: 600, italica: true, usos: "el acento en serif, en un canal que declare Playfair Display" },
  { clave: "playfair700i", familia: "Playfair Display", peso: 700, italica: true, usos: "el acento en serif, negrita" },
];

/* ══════════════════ 2 · QUÉ CARACTERES ═════════════════════════════════════ */

/**
 * El alfabeto: lo que un subtítulo en español puede llevar. Es más corto que el
 * de R09 a propósito —un subtítulo es lo que alguien DICE, no un rótulo con
 * flechas y marcas de lista—, y lo que quede fuera no vale 0: vale `respaldo`,
 * el glifo más ancho, que sobreestima y por tanto falla del lado seguro.
 */
const LETRAS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const CIFRAS = "0123456789";
const ESPANOL = "áéíóúüñÁÉÍÓÚÜÑçÇàèìòùâêîôûïãõ";
const PUNTUACION = " \u00a0¿?¡!.,;:…—–-()«»“”‘’\"'%$€@#&/+*=°ºª²³·";

const ALFABETO = (() => {
  const visto = {};
  const out = [];
  for (const c of LETRAS + CIFRAS + ESPANOL + PUNTUACION) {
    if (visto[c]) continue;
    visto[c] = true;
    out.push(c);
  }
  return out;
})();

/**
 * Frases de control: texto como el que de verdad lleva una línea (minúsculas
 * con tildes, una cifra, versalitas, signos de apertura). Se maquetan enteras y
 * se comparan con la suma de avances de la tabla: la diferencia es lo que NO
 * modela la tabla (kerning y ligaduras), con su signo.
 */
const FRASES = [
  "más privilegiadas",
  "¿Cuánto cuesta vivir aquí?",
  "El 72 % de los compradores",
  "sin cuota inicial",
  "a cuatro puertas del parque",
  "Todo lo que importa, en un minuto.",
  "AVENIDA DEL RÍO",
  "$ 350 millones",
  "¡Y eso no es todo!",
  "vivir cerca, llegar antes",
];

/* ══════════════════ 3 · LA MEDIDA ══════════════════════════════════════════ */

/** Las caras en base64, para pasarlas a la página. Aborta si falta un archivo: sin él no hay nada que medir. */
function carasEmpaquetadas() {
  return CARAS.map((c) => {
    const ruta = path.join(DIR_FUENTES, ...c.archivo.split("/"));
    if (!fs.existsSync(ruta)) abortar(`falta ${relativa(ruta)}: sin ese archivo no se puede medir su letra (vuelve a clonar o descomprimir el repo entero)`);
    return { familia: c.familia, peso: c.peso, estilo: c.estilo, archivo: c.archivo, base64: fs.readFileSync(ruta).toString("base64") };
  });
}

async function mide() {
  const caras = carasEmpaquetadas();
  const require = createRequire(path.join(RAIZ, "remotion", "package.json"));
  const { openBrowser } = require("@remotion/renderer");
  const browser = await openBrowser("chrome", { logLevel: "error" });
  try {
    const page = await browser.newPage({
      context: null,
      logLevel: "error",
      indent: false,
      pageIndex: 0,
      onBrowserLog: null,
      onLog: () => {},
    });
    await page.goto({ url: "about:blank", timeout: 30000, options: {} });

    // Una llamada por cara, como `inyectaFuentes` en generar-avances.mjs: cada
    // Lato es casi 1 MB de base64 y las tres juntas en un solo mensaje del
    // protocolo de Chrome son demasiado. Si una no carga, `load()` rechaza y el
    // script muere aquí, que es lo que tiene que pasar.
    for (const cara of caras) {
      await page.evaluate(async (arg) => {
        const bin = Uint8Array.from(atob(arg.base64), (c) => c.charCodeAt(0));
        const f = new FontFace(arg.familia, bin.buffer, { weight: arg.peso, style: arg.estilo });
        await f.load();
        document.fonts.add(f);
      }, cara);
    }
    await page.evaluate(async () => {
      await document.fonts.ready;
    });

    return await page.evaluate(
      (arg) => {
        const { combos, alfabeto, frases, cuerpo, cuerposControl, umbralKerning } = arg;

        const span = document.createElement("span");
        span.style.position = "absolute";
        span.style.left = "0";
        span.style.top = "0";
        span.style.whiteSpace = "pre";
        span.style.letterSpacing = "0px";
        document.body.appendChild(span);

        const ancho = (texto) => {
          span.textContent = texto;
          return span.getBoundingClientRect().width;
        };

        const salida = [];
        for (const combo of combos) {
          span.style.fontWeight = String(combo.peso);
          span.style.fontStyle = combo.italica ? "italic" : "normal";

          // SONDA 1 · ¿resuelve la familia, o estamos midiendo el genérico? Se
          // compara contra `monospace`, el genérico más distinto de estas dos.
          span.style.fontSize = "100px";
          span.style.fontFamily = "monospace";
          const generico = ancho("Handgloves 123");
          span.style.fontFamily = `"${combo.familia}", monospace`;
          const conFamilia = ancho("Handgloves 123");
          const resuelve = Math.abs(conFamilia - generico) > 0.01;

          // SONDA 2 · carácter a carácter, con DOS genéricos distintos detrás.
          // Un glifo que la familia tiene mide lo mismo con cualquier respaldo;
          // uno que no tiene lo pinta el respaldo, y entonces cambia.
          span.style.fontSize = `${cuerpo}px`;
          const em = {};
          const ajenos = [];
          span.style.fontFamily = `"${combo.familia}", serif`;
          const conSerif = {};
          for (const c of alfabeto) conSerif[c] = ancho(c);
          span.style.fontFamily = `"${combo.familia}", monospace`;
          const uno = {};
          for (const c of alfabeto) {
            uno[c] = ancho(c);
            em[c] = uno[c] / cuerpo;
            if (Math.abs(uno[c] - conSerif[c]) > 0.01) ajenos.push(c);
          }

          // EL EM NO DEPENDE DEL CUERPO: se comprueba, no se supone.
          let deriva = 0;
          let derivaChar = "";
          for (const px of cuerposControl) {
            span.style.fontSize = `${px}px`;
            for (const c of alfabeto) {
              const e = ancho(c) / px;
              const d = em[c] > 0 ? Math.abs(e / em[c] - 1) : e > 0 ? 1 : 0;
              if (d > deriva) {
                deriva = d;
                derivaChar = c;
              }
            }
          }
          span.style.fontSize = `${cuerpo}px`;

          // KERNING, solo para INFORMAR: cuántos pares ensanchan y cuál es el peor.
          let pares = 0;
          let peor = 0;
          let peorPar = "";
          for (const a of alfabeto)
            for (const b of alfabeto) {
              const d = (ancho(a + b) - uno[a] - uno[b]) / cuerpo;
              if (d < umbralKerning) continue;
              pares++;
              if (d > peor) {
                peor = d;
                peorPar = a + b;
              }
            }

          // FRASES DE CONTROL: lo que Chrome maqueta contra la suma de avances
          // YA REDONDEADOS, que es lo que sumará quien lea la tabla.
          const control = frases.map((f) => {
            let suma = 0;
            for (const c of f) suma += Math.round(em[c] * 10000) / 10000;
            return { frase: f, real: ancho(f) / cuerpo, suma };
          });

          salida.push({
            clave: combo.clave,
            resuelve,
            sonda: { generico: Math.round(generico * 100) / 100, familia: Math.round(conFamilia * 100) / 100 },
            ajenos,
            em,
            deriva,
            derivaChar,
            kerning: { pares, peor, peorPar },
            control,
          });
        }

        document.body.removeChild(span);
        return { combos: salida, ua: navigator.userAgent };
      },
      { combos: COMBOS, alfabeto: ALFABETO, frases: FRASES, cuerpo: CUERPO, cuerposControl: CUERPOS_CONTROL, umbralKerning: UMBRAL_KERNING }
    );
  } finally {
    await browser.close({ silent: true });
  }
}

/**
 * Las tres sondas de «¿se ha medido la letra que se cree?». Devuelve la lista
 * de motivos para NO fiarse; vacía si todo cuadra.
 */
function motivosDeAborto(medida) {
  const porClave = {};
  for (const c of medida.combos) porClave[c.clave] = c;
  const motivos = [];
  for (const combo of COMBOS) {
    const m = porClave[combo.clave];
    if (!m.resuelve) {
      motivos.push(`${combo.clave}: la familia «${combo.familia}» NO RESUELVE (mide ${m.sonda.familia} px, lo mismo que el genérico): se habría medido otra letra`);
      continue;
    }
    if (m.ajenos.length) motivos.push(`${combo.clave}: «${combo.familia}» no tiene ${m.ajenos.map((c) => JSON.stringify(c)).join(" ")} (los pinta la fuente de respaldo): quítalos del alfabeto o no valen como medida`);
    if (m.deriva > TOLERANCIA_PLANA)
      motivos.push(`${combo.clave}: el em de ${JSON.stringify(m.derivaChar)} cambia un ${pc(m.deriva)} % entre ${[...CUERPOS_CONTROL, CUERPO].join(", ")} px: la familia tiene eje óptico y una tabla de un solo cuerpo no vale`);
  }
  // SONDA 3 · el eje `wght` de la variable. Si los pesos midieran lo mismo, la
  // cara se habría registrado sin su rango y los tres bloques serían uno solo.
  const frase = (clave) => porClave[clave].control.reduce((s, c) => s + c.real, 0);
  // Por familia y estilo, en orden de peso: cada peso más ancho que el anterior.
  const familias = {};
  for (const c of COMBOS) (familias[`${c.familia}·${c.italica}`] = familias[`${c.familia}·${c.italica}`] || []).push(c);
  for (const lista of Object.values(familias)) {
    const variables = lista.sort((a, b) => a.peso - b.peso).map((c) => c.clave);
    for (let i = 1; i < variables.length; i++)
      if (!(frase(variables[i]) > frase(variables[i - 1]) * 1.001))
        motivos.push(`${variables[i]} no sale más ancha que ${variables[i - 1]}: el eje wght de la variable no se está aplicando`);
  }
  return motivos;
}

/* ══════════════════ 4 · EL ARCHIVO ═════════════════════════════════════════ */

/** 4 decimales en em = 0,4 px a un cuerpo de 96. Por debajo del subpíxel. */
const redondea = (x) => Math.round(x * 10000) / 10000;
const num = (x) => redondea(x).toFixed(4);
/** Un porcentaje para prosa en español: coma decimal, no punto. */
const pc = (x) => (x * 100).toFixed(2).replace(".", ",");
const conSigno = (x) => (x >= 0 ? "+" : "−") + pc(Math.abs(x));

/** Un carácter como clave de objeto TS. El espacio va entre comillas a la vista; el resto, como lo escape JSON. */
const clave = (c) => (c === " " ? '" "' : JSON.stringify(c));

const bloqueGlifos = (em, sangria) => {
  const lineas = [];
  let linea = "";
  for (const c of ALFABETO) {
    const trozo = `${clave(c)}: ${num(em[c])}, `;
    if (linea.length > 0 && linea.length + trozo.length > 108) {
      lineas.push(sangria + linea.trimEnd());
      linea = "";
    }
    linea += trozo;
  }
  if (linea) lineas.push(sangria + linea.trimEnd());
  return lineas.join("\n");
};

function componeArchivo(medida, fecha) {
  const porClave = {};
  for (const c of medida.combos) porClave[c.clave] = c;

  const resumen = [];
  const notasKerning = [];
  const cuerpos = COMBOS.map((combo) => {
    const m = porClave[combo.clave];

    let max = 0;
    let maxChar = "";
    for (const c of ALFABETO)
      if (m.em[c] > max) {
        max = m.em[c];
        maxChar = c;
      }

    // Desviación de las frases de control: (lo que maqueta Chrome − la suma de la tabla) / la suma.
    let desvMin = Infinity;
    let desvMax = -Infinity;
    for (const c of m.control) {
      const d = c.real / c.suma - 1;
      desvMin = Math.min(desvMin, d);
      desvMax = Math.max(desvMax, d);
    }

    const estilo = combo.italica ? " itálica" : "";
    resumen.push(
      `  ${combo.clave.padEnd(13)} respaldo ${num(max)} (${clave(maxChar)}) · deriva entre cuerpos ${pc(m.deriva)} % · kerning + ${m.kerning.pares} pares (peor ${m.kerning.pares ? `${clave(m.kerning.peorPar[0])}+${clave(m.kerning.peorPar[1])} ${num(m.kerning.peor)} em` : "ninguno"}) · frases ${conSigno(desvMin)} % a ${conSigno(desvMax)} %`
    );
    notasKerning.push(
      ` *       ${combo.clave.padEnd(13)}${String(m.kerning.pares).padStart(4)} pares que ensanchan` +
        (m.kerning.pares ? ` (peor ${clave(m.kerning.peorPar[0])}+${clave(m.kerning.peorPar[1])}: ${num(m.kerning.peor)} em)` : "") +
        ` · frases de control: de ${conSigno(desvMin)} % a ${conSigno(desvMax)} %`
    );

    return [
      `  /** ${combo.familia} ${combo.peso}${estilo} — ${combo.usos}. */`,
      `  ${combo.clave}: {`,
      `    familia: "${combo.familia}",`,
      `    peso: ${combo.peso},`,
      `    italica: ${combo.italica},`,
      `    /** RESPALDO: el glifo más ancho medido (${clave(maxChar)}). Un carácter desconocido nunca vale 0. */`,
      `    respaldo: ${num(max)},`,
      `    glifos: {`,
      bloqueGlifos(m.em, "      "),
      `    },`,
      `  },`,
    ].join("\n");
  });

  let derivaMax = 0;
  for (const c of medida.combos) derivaMax = Math.max(derivaMax, c.deriva);

  const texto = `/**
 * AVANCES DE LOS SUBTÍTULOS EDITORIALES — la tabla con la que el motor sabe cuánto
 * mide una línea de subtítulo antes de pintarla.
 * GENERADO por manuales/motion-graphics/scripts/medir-letras-subtitulos.mjs: NO EDITAR A MANO.
 *
 *   Fecha         ${fecha}
 *   Navegador     ${medida.ua}
 *   Fuentes       ${CARAS.map((c) => c.archivo.split("/").pop()).join(", ")}, inyectadas desde
 *                 remotion/public/fuentes/ (las mismas caras que registra motor/fuentes.ts)
 *   Alfabeto      ${ALFABETO.length} caracteres × ${COMBOS.length} combinaciones de familia, peso y estilo
 *   Cuerpo        ${CUERPO} px, con \`letter-spacing: 0\`, en el DOM del mismo Chrome que renderiza
 *
 * POR QUÉ ES UN ARCHIVO DE DATOS Y NO UNA MEDIDA. Medir texto exige DOM, y quien
 * valida un plan de subtítulos corre con \`node\` pelado: tiene que dar el MISMO
 * número en cualquier máquina. Por eso este archivo no tiene NI UN import. Se
 * mide una vez, se versiona, y se regenera el día que cambien las fuentes.
 *
 * ═══ CÓMO SE LEE ═══
 *   ancho = Σ avance(carácter) × cuerpo  (+ tracking × nº de caracteres, si lo hay)
 *
 * Un CARÁCTER que no está en \`glifos\` vale \`respaldo\`, el glifo más ancho que se
 * ha medido en esa combinación. Nunca 0: un carácter que no suma deja pasar una
 * línea que se sale de la pantalla. Un emoji, que ocupa dos unidades UTF-16, se
 * cobra dos veces — sobra, y bien.
 *
 * ═══ POR QUÉ UN SOLO CUERPO BASTA ═══
 * Un em por carácter vale para cualquier tamaño mientras el avance escale con el
 * cuerpo, y eso solo lo rompe un eje óptico (\`opsz\`). Ninguna de las dos familias
 * lo tiene: la Quicksand variable trae un único eje (\`wght\`, 300-700) y las Lato
 * son estáticas. Y está MEDIDO, no supuesto: repetido a ${CUERPOS_CONTROL.join(" y ")} px, el em del
 * carácter que más se mueve cambia un ${pc(derivaMax)} % respecto del de ${CUERPO} px, o sea la
 * rejilla de maquetación de Chrome (1/64 de px). El script aborta si pasa del
 * ${pc(TOLERANCIA_PLANA)} %.
 *
 * ═══ LO QUE ESTA TABLA NO MODELA ═══
 *   · EL KERNING, en ninguno de los dos sentidos. El que APRIETA hace el texto más
 *     corto que la suma (sobra: dirección segura). El que ENSANCHA la deja corta,
 *     y por eso se cuenta aquí, par a par sobre el alfabeto entero (umbral
 *     ${num(UMBRAL_KERNING)} em), junto a ${FRASES.length} frases de control maquetadas enteras y comparadas
 *     con la suma de avances (signo −: Chrome la pinta MÁS CORTA que la suma, que
 *     es el lado seguro; signo +: más ancha):
${notasKerning.join("\n")}
 *     Quien sume avances tiene que cubrir el lado + con su propio margen: un par
 *     que ensancha cuenta una vez por cada aparición.
 *   · LIGADURAS y sustituciones contextuales: acortan, mismo caso que el kerning
 *     que aprieta.
 *   · Lo que NO está en el alfabeto: vale \`respaldo\`. Sobra para cualquier letra
 *     latina que falte; un símbolo que el sistema pinte a 1 em entero (una flecha,
 *     un ideograma) quedaría unas centésimas de em corto por carácter. Si la pista
 *     empieza a llevarlos, se añaden al alfabeto y se vuelve a medir.
 *   · \`font-variant-numeric\`, versalitas sintéticas o cualquier \`font-feature\`
 *     que cambie el glifo: la pista no las usa; si un día las usa, se mide.
 */

/** Una combinación de familia, peso y estilo. Las claves son las de \`AVANCES_SUBTITULOS\`. */
export interface TablaLetra {
  readonly familia: string; // "Quicksand" | "Lato" | "Montserrat" | "Playfair Display"
  readonly peso: number;
  readonly italica: boolean;
  /** Em del glifo más ancho medido: lo que vale un carácter que no está en \`glifos\`. */
  readonly respaldo: number;
  /** Avance por carácter, en em. */
  readonly glifos: { readonly [caracter: string]: number | undefined };
}

export const AVANCES_SUBTITULOS = {
${cuerpos.join("\n")}
} as const satisfies { readonly [clave: string]: TablaLetra };

export type ClaveAvancesSubtitulos = keyof typeof AVANCES_SUBTITULOS;
`;
  return { texto, resumen };
}

/* ══════════════════ 5 · MAIN ═══════════════════════════════════════════════ */

/**
 * Los BLOQUES de `AVANCES_SUBTITULOS`, uno por clave, tal como los escribe
 * `componeArchivo`. `--check` compara ESTO y no el archivo entero, igual que
 * `generar-avances.mjs` con su tabla: la cabecera lleva la fecha, la línea
 * `Navegador` y las cifras de kerning, que cambian con la máquina o con la
 * versión de Chrome y no con los avances.
 */
export const bloquesDe = (texto) => {
  const out = {};
  const re = /^  \/\*\* [^\n]*\n  (\w+): \{\n[\s\S]*?\n  \},$/gm;
  let m;
  while ((m = re.exec(texto)) !== null) out[m[1]] = m[0];
  return out;
};

if (esMain(import.meta.url)) {
  const f = flags();
  const comprueba = f.check === true;

  const medida = await mide();
  const motivos = motivosDeAborto(medida);
  if (motivos.length) abortar(`la medida NO es de fiar y no escribo nada:\n   · ${motivos.join("\n   · ")}`);

  const fecha = new Date().toISOString().slice(0, 10);
  const { texto, resumen } = componeArchivo(medida, fecha);
  const cabecera = `${COMBOS.length} combinaciones × ${ALFABETO.length} caracteres a ${CUERPO} px (control a ${CUERPOS_CONTROL.join(" y ")} px)`;

  if (comprueba) {
    // El archivo se lee con `leerTexto` para que un clon con CRLF no dé DESFASADA por nada.
    const actual = fs.existsSync(DESTINO) ? leerTexto(DESTINO) : "";
    const viejo = bloquesDe(actual);
    const nuevo = bloquesDe(texto);
    const claves = COMBOS.map((c) => c.clave);
    const distintas = claves.filter((k) => viejo[k] !== nuevo[k]).map((k) => `${k} ${viejo[k] === undefined ? "falta" : "difiere"}`);
    const sobran = Object.keys(viejo).filter((k) => claves.indexOf(k) < 0).map((k) => `${k} sobra`);
    const igual = distintas.length === 0 && sobran.length === 0;
    process.stdout.write(
      [
        cabecera,
        ...resumen,
        igual
          ? `AL DÍA · ${relativa(DESTINO)} coincide con lo medido ahora`
          : `DESFASADA · ${relativa(DESTINO)} NO coincide con lo medido ahora: ${[...distintas, ...sobran].join(", ")}.\n` +
            `  Regenera con: node ${relativa(fileURLToPath(import.meta.url))}\n` +
            `  y revisa el diff: lo que cambie aquí cambia cuánto se encoge cada línea de subtítulo.`,
        "",
      ].join("\n")
    );
    process.exit(igual ? 0 : 1);
  }

  fs.writeFileSync(DESTINO, texto);
  process.stdout.write([cabecera, ...resumen, `escrito → ${relativa(DESTINO)}`, ""].join("\n"));
}
