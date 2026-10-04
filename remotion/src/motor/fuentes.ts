/**
 * LAS FUENTES EMPAQUETADAS — Inter, la tipografía que el producto GARANTIZA, y
 * las dos familias de la pista de subtítulos editoriales (más abajo).
 *
 * Todo lo que el motor dibuja con la pila `PILA_INTER` (`motor/marca.ts`) pide
 * la familia "Inter" y, hasta hoy, la encontraba solo si estaba INSTALADA en la
 * máquina que renderiza. Sin ella Chrome cae a la siguiente de la pila —San
 * Francisco en un Mac, Segoe UI en Windows— y las tablas `inter*` de R09 dejan
 * de corresponder con lo que se pinta: la validación estima con una fuente y el
 * render maqueta con otra. Una Inter instalada de OTRA versión (4.x) tampoco
 * vale: tiene otras métricas.
 *
 * Aquí se registra la familia "Inter" con los nueve OTF de Inter 3.019 (licencia
 * SIL OFL 1.1; los archivos y su `OFL.txt` están en `remotion/public/fuentes/inter/`,
 * y `fuentes-inter.datos.ts` es su copia en base64, generada por
 * `manuales/motion-graphics/scripts/empaquetar-fuentes.mjs`). Una familia web
 * con ese nombre TAPA por completo a cualquier Inter local, sea la versión que
 * sea, así que todas las máquinas pintan los mismos bytes. Los nueve pesos y no
 * solo los que se usan: si falta uno, CSS elige el más cercano de los cargados y
 * una pieza que pida 900 saldría en 800.
 *
 * DOS FAMILIAS MÁS: «Quicksand» Y «Lato», PARA LOS SUBTÍTULOS EDITORIALES. La
 * pista de subtítulos editoriales habla con dos voces que Inter no tiene: una
 * geométrica redonda para lo dicho (Quicksand) y una itálica humanista para el
 * acento (Lato). Las dos se empaquetan por lo mismo que Inter: la pista calcula
 * si una línea cabe con una tabla de avances medida sobre ESTOS bytes
 * (`subtitulos-editoriales.avances.ts`), y con la Quicksand o la Lato que
 * tuviera instalada cada máquina —o sin ninguna, que es lo normal— la tabla
 * mediría una letra y el render pintaría otra. Son tres caras de las cinco de
 * `fuentes-subtitulos.datos.ts` (generado por el mismo script): Quicksand es UN
 * archivo variable y se declara con su rango entero (`weight: "300 700"`), así
 * que cualquier peso intermedio sale de él; de Lato van solo las dos itálicas
 * (400 y 700), que es lo único que la pista pinta con ella. Licencia SIL OFL
 * 1.1, con su `OFL.txt` en `remotion/public/fuentes/quicksand/` y
 * `remotion/public/fuentes/lato/`.
 *
 * Y DOS MÁS, «Montserrat» Y «Playfair Display», para los canales que declaran
 * otra voz en esa pista (`Marca.texto.letra`): Montserrat entera en un archivo
 * variable (100-900) y de Playfair Display solo la itálica variable (400-900),
 * que es la del acento. Mismo trato, mismas razones, y tampoco las pedía nadie.
 *
 * POR QUÉ NO MUEVEN NADA DE LO PUBLICADO. Registrar una cara solo cambia un
 * píxel si algún texto PIDE su familia: una familia web tapa a la local del
 * mismo nombre y a nadie más. Comprobado antes de añadirlas: ninguna pila de
 * `remotion/src` nombraba «Quicksand», «Lato», «Montserrat» ni «Playfair
 * Display» (las únicas que lo hacen son las cuatro `PILA_*` nuevas de
 * `marca.ts`, que usa solo la pista editorial). Y la familia
 * «Inter» queda como estaba, cara a cara: los mismos nueve descriptores, creados
 * en el mismo orden y ANTES que las nuevas. No es exceso de celo: una pieza
 * publicada ya se movió 31 píxeles por una cara de más en una familia que sí
 * pedía. Por eso las caras nuevas llevan OTRO nombre de familia y no se cuelgan
 * de «Inter», y por eso `cargarInter` no se toca.
 *
 * POR QUÉ LOS BYTES VAN EN EL BUNDLE Y NO POR `staticFile()`. Con la fuente
 * servida por el servidor de archivos de Remotion, un render con varias
 * pestañas y decenas de `<OffthreadVideo>` de clips grandes deja las nueve
 * peticiones de la fuente detrás de las de vídeo, y el `delayRender` de la
 * fuente muere por timeout aunque el render fuera a salir: dos montajes de dos
 * minutos fallaban con 238 s de plazo y la fuente por red, y salen con los bytes
 * en el bundle. `FontFace` acepta un ArrayBuffer: no hay petición que esperar.
 *
 * SOLO RUNTIME. `FontFace` no existe en node. Por eso este módulo lo importa
 * ÚNICAMENTE `Root.tsx` (`import "./motor/fuentes"`) y nunca un archivo de
 * datos: `theme.ts`, `marca.ts`, `estilos.ts`, `coreografia.ts` o `dialecto.ts`
 * los empaquetan con esbuild los scripts de `node` (`medir-anchos`,
 * `revisar-marca`, `generar-catalogo`) y con esto dentro (5 MB de fuentes)
 * dejarían de arrancar o pesarían de más.
 *
 * SIN `delayRender`. Remotion espera `document.fonts.ready` antes de capturar
 * cada frame (`@remotion/renderer`, seek-to-frame), y una cara añadida con
 * `document.fonts.add()` y en carga forma parte de esa espera: la fuente está
 * lista antes del primer píxel sin que haga falta retener el render. Con
 * `delayRender` la cuenta empezaba al abrir la pestaña y, en montajes largos
 * con decenas de clips, la pestaña tardaba más que el plazo del render en llegar
 * a ejecutar la continuación: el render moría «por las fuentes» cuando lo lento
 * era el vídeo (medido con dos montajes de dos minutos, 238 s de plazo).
 *
 * SI UNA CARA FALLA (bytes corruptos, un navegador sin `FontFace`), se AVISA en
 * consola y se sigue con la fuente de respaldo de la pila: un render que sale
 * con un aviso se puede repetir; uno que no sale, no. Cada familia avisa con su
 * propio mensaje, porque lo que se pierde es distinto: sin Inter, la tipografía
 * del producto entero; sin una de las otras cuatro, solo la letra de la pista
 * de subtítulos editoriales, que cae a la siguiente de su pila (Inter).
 *
 * UNA SOLA VEZ. La promesa se guarda a nivel de módulo para que un segundo
 * import (o un hot reload del Studio) no vuelva a registrar nada.
 */
import { INTER_OTF } from "./fuentes-inter.datos";
import { FUENTES_SUBTITULOS } from "./fuentes-subtitulos.datos";
import type { CaraEmpaquetada } from "./fuentes-subtitulos.datos";

let carga: Promise<void> | null = null;
let cargaSubtitulos: Promise<void> | null = null;

/** base64 → bytes, sin `Buffer` (esto corre en el navegador). */
const bytesDe = (b64: string): ArrayBuffer => {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out.buffer;
};

const cargarPeso = async (peso: number, b64: string): Promise<void> => {
  try {
    const cara = new FontFace("Inter", bytesDe(b64), {
      weight: String(peso),
      style: "normal",
      // `block`: mientras carga no se pinta con la fuente de respaldo.
      display: "block",
    });
    // Primero en el conjunto y luego a cargar: así `document.fonts.ready`, que
    // Remotion espera antes de cada captura, incluye esta cara.
    document.fonts.add(cara);
    await cara.load();
  } catch (e) {
    console.warn(
      `[fuentes] Inter ${peso} no se pudo registrar (${String(e)}): se pinta con la siguiente fuente de la pila. ` +
        "Si esta máquina tiene Inter 3.019 instalada el resultado es el mismo; si no, la tipografía NO es la del producto."
    );
  }
};

/**
 * Registra la familia "Inter" (los nueve pesos) una sola vez y devuelve la
 * promesa de que están registradas (o de que se avisó de cuáles no).
 */
export const cargarInter = (): Promise<void> => {
  if (!carga) {
    if (typeof FontFace === "undefined" || typeof document === "undefined") {
      carga = Promise.resolve(); // node, o un entorno sin fuentes: no hay nada que registrar
    } else {
      carga = Promise.all(Object.entries(INTER_OTF).map(([peso, b64]) => cargarPeso(Number(peso), b64))).then(() => undefined);
    }
  }
  return carga;
};

/**
 * Una cara de los subtítulos editoriales. Mismo patrón que `cargarPeso`, con los
 * descriptores que trae la propia cara: el rango `"300 700"` de la variable y el
 * `italic` de las de Lato no caben en la firma de Inter (un peso, siempre redonda).
 */
const cargarCara = async (datos: CaraEmpaquetada): Promise<void> => {
  try {
    const cara = new FontFace(datos.familia, bytesDe(datos.base64), {
      weight: datos.peso,
      style: datos.estilo,
      display: "block",
    });
    // Igual que Inter: al conjunto ANTES de cargar, para que `document.fonts.ready` la espere.
    document.fonts.add(cara);
    await cara.load();
  } catch (e) {
    console.warn(
      `[fuentes] ${datos.familia} ${datos.peso} ${datos.estilo} no se pudo registrar (${String(e)}): los subtítulos editoriales ` +
        `se pintan con la ${datos.familia} que tenga instalada esta máquina o, si no la tiene, con la siguiente fuente de su ` +
        "pila (Inter). El vídeo sale, pero sus líneas ya NO miden lo que dice la tabla de avances con la que se " +
        "validaron: revisa los frames antes de publicar."
    );
  }
};

/**
 * Registra las caras de la pista de subtítulos editoriales («Quicksand»,
 * «Lato», «Montserrat» y «Playfair Display») una sola vez. Va aparte de `cargarInter` para que el registro de
 * Inter siga siendo, línea a línea, el que pintó todo lo publicado.
 */
export const cargarFuentesSubtitulos = (): Promise<void> => {
  if (!cargaSubtitulos) {
    if (typeof FontFace === "undefined" || typeof document === "undefined") {
      cargaSubtitulos = Promise.resolve(); // node, o un entorno sin fuentes: no hay nada que registrar
    } else {
      cargaSubtitulos = Promise.all(FUENTES_SUBTITULOS.map(cargarCara)).then(() => undefined);
    }
  }
  return cargaSubtitulos;
};

/**
 * Las fuentes del producto, ya en marcha. Se resuelve cuando están Inter Y las
 * de los subtítulos editoriales. El orden de la lista es el de creación de las
 * caras: primero las nueve de Inter, después las nuevas.
 */
export const fuentesListas: Promise<void> = Promise.all([cargarInter(), cargarFuentesSubtitulos()]).then(() => undefined);
