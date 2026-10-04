/**
 * SUBTÍTULOS EDITORIALES — el contrato (DATOS) y su validador.
 *
 * No es el subtítulo de accesibilidad (`SubtitulosSync`, un `Segmento[]` en
 * segundos que pinta la frase entera) ni el karaoke: es TIPOGRAFÍA QUE ACOMPAÑA
 * A LA VOZ. Trozos de una a cuatro palabras que entran a tiempo con lo dicho, y
 * tres letras con tres trabajos:
 *
 *   base    la sans fina, pequeña: todo lo que se dice.
 *   acento  la itálica grande, pegada debajo: la palabra que se queda.
 *   dato    la sans negra enorme, sola y al centro: una cifra.
 *
 * Las líneas de un bloque se ACUMULAN (máximo tres) y el bloque sale entero.
 * Sin caja ni contorno: blanco con la sombra de la marca.
 *
 * OJO CON EL NOMBRE. «Editorial» es también el dialecto de noticias
 * (`motor/noticias/`, `dialectoEditorialDe`, `letraEditorialDe`). No tienen nada
 * que ver: aquello es el papel beige de un explicador; esto es una pista de
 * texto encima de metraje. Por eso aquí todo se llama «subtítulos…» y la letra
 * se pide con `letraSubtitulosDe`, no con `letraEditorialDe`.
 *
 * POR QUÉ FRAMES Y NO SEGUNDOS, cuando `Segmento` va en segundos «para servir a
 * cualquier fps». Un `Segmento` dura una frase; un trozo, medio segundo. A esa
 * escala el redondeo a frame decide si la línea entra antes o después de la
 * palabra, y tiene que decidirlo quien escribe el plan, contra la voz medida,
 * no un `Math.round` dentro del intérprete. El plan queda atado al fps de su
 * composición (30 en montaje), como `en`/`dur` de un `Corte`. Para el `.srt`
 * que R14 manda conservar está `segmentosDe()`.
 *
 * POR QUÉ LA GEOMETRÍA SE CALCULA AQUÍ Y NO EN EL COMPONENTE. El validador
 * corre con `node` pelado y tiene que saber lo mismo que el intérprete: qué
 * cuerpo lleva cada línea, cuánto mide y dónde acaba el bloque. Con la cuenta
 * en un solo sitio (`resuelveBloque`) no pueden discrepar. Por eso este módulo
 * es datos puros: ni React ni Remotion en ejecución.
 *
 * EL TEXTO NUNCA SE SALE. Si una línea no cabe en el ancho útil, se ENCOGE lo
 * justo (la cuenta sale de la tabla medida de su letra) y el validador avisa
 * cuando el encogido ya se nota. Cortar o desbordar no son opciones: el primero
 * no se ve hasta el render y el segundo se publica.
 */
import { LETRA_SUBTITULOS } from "./marca";
import type { LetraSubtitulos, LetraTrozo, Marca, ModoTexto } from "./marca";
import { zonaSeguraDe } from "./presets";
import type { Segmento } from "./segmentos";
import { AVANCES_SUBTITULOS } from "./subtitulos-editoriales.avances";
import type { TablaLetra } from "./subtitulos-editoriales.avances";

export type EstiloTrozo = "base" | "acento" | "dato";
export type PosicionBloque = "abajo" | "arriba" | "centro";

/** Una LÍNEA del bloque. */
export interface TrozoEditorial {
  /** Frame ABSOLUTO de la composición en que entra: el de su primera palabra. */
  desde: number;
  texto: string;
  /** Por defecto, `base`. */
  estilo?: EstiloTrozo;
}

export interface BloqueEditorial {
  /** Para los avisos del validador: «b07», no «el séptimo». */
  id: string;
  /** Frame ABSOLUTO en que el bloque entero ya no está. */
  hasta: number;
  /** Por defecto, `abajo`. */
  posicion?: PosicionBloque;
  /** De una a tres líneas; se acumulan en este orden, de arriba abajo. */
  trozos: readonly TrozoEditorial[];
  /** Multiplica el cuerpo de todo el bloque: el hook va más grande. Por defecto 1. */
  escala?: number;
  /**
   * Frames del fundido de entrada de cada línea. 0 = entra ya puesta, que es lo
   * que necesita un bloque que empieza en el frame 0: ese frame es la miniatura
   * y con fundido saldría vacía.
   */
  entrada?: number;
}

/* ── Geometría ─────────────────────────────────────────────────────────────
 *
 * Medida sobre la referencia (un reel 9:16 de inmobiliaria, 29 trozos en 33 s)
 * y ajustada a las dos letras empaquetadas. Todo son proporciones: los px salen
 * de la composición, no de aquí. */
export const SUB = {
  /**
   * Cuerpo de la línea base, como fracción del LADO CORTO del cuadro: 45 px en
   * 1080×1920 y también en 1920×1080. Del lado corto y no del alto porque en
   * apaisado un 2,3 % del alto son 25 px, y eso no se lee.
   */
  cuerpo: 0.0417,
  /** Cuerpo del acento y del dato, en veces el de la base. */
  acento: 2.2,
  dato: 3,
  /** Alto de línea, en veces su cuerpo. El acento por debajo de 1: va montado sobre la base. */
  interlinea: { base: 1.25, acento: 0.96, dato: 1.02 },
  /** Borde SUPERIOR del bloque, como fracción del alto. `centro` se centra solo. */
  ancla: { arriba: 0.125, abajo: 0.745 },
  /** Nada baja de aquí (R14): por debajo está la interfaz de las plataformas. */
  suelo: 0.88,
  /** Frames del fundido de entrada de una línea y de salida del bloque. */
  entrada: 5,
  salida: 4,
  /** Lo que sube una línea al entrar, como fracción de su cuerpo. */
  sube: 0.18,
  maxTrozos: 3,
  /** Frames mínimos que una línea está en pantalla, y mínimos entre dos líneas. */
  minTrozo: 12,
  minEntreTrozos: 3,
  /** Segundos mínimos entre dos acentos, y máximos que dura un bloque. */
  minEntreAcentos: 2,
  maxBloque: 5,
  /** Palabras por línea. */
  maxPalabras: { base: 5, acento: 3, dato: 3 },
  /** Por debajo de este encogido la línea ya no parece de su estilo: se avisa. */
  encogeAviso: 0.8,
  /** Holgura sobre la suma de avances: el kerning y el redondeo de Chrome. */
  margenAncho: 1.02,
} as const;

/* ── Letra y modo ─────────────────────────────────────────────────────────── */

/**
 * La letra de los subtítulos de un canal: la que declare en `marca.texto.letra`
 * y, para lo que no declare, la del motor (`LETRA_SUBTITULOS`).
 */
export const letraSubtitulosDe = (m: Marca): LetraSubtitulos => {
  const suya = m.texto && m.texto.letra;
  if (!suya) return LETRA_SUBTITULOS;
  return {
    base: suya.base || LETRA_SUBTITULOS.base,
    acento: suya.acento || LETRA_SUBTITULOS.acento,
    dato: suya.dato || LETRA_SUBTITULOS.dato,
  };
};

/**
 * La sombra de los subtítulos de un canal, como `text-shadow`: la que declare
 * en `marca.texto.sombra` (`null` = ninguna) o, si no declara nada, las dos de
 * la marca apiladas: la de cine da el halo y la de texto sujeta el trazo fino.
 */
export const sombraSubtitulosDe = (m: Marca): string => {
  const suya = m.texto ? m.texto.sombra : undefined;
  if (suya === null) return "none";
  if (typeof suya === "string") return suya;
  return m.sombra.textoCine + ", " + m.sombra.texto;
};

/**
 * El modo de texto por defecto de las piezas con voz de un canal. Es una
 * decisión de DIRECCIÓN, no de render: la lee quien planifica la pieza (la
 * skill, el director) para saber qué escribir. Ningún componente monta nada
 * por su cuenta según este valor: los subtítulos van donde la composición los
 * ponga, y las piezas ya publicadas de un canal no cambian porque el canal
 * cambie de costumbre.
 */
export const modoTextoDe = (m: Marca): ModoTexto => (m.texto ? m.texto.modo : "banda");

/* ── Medida ───────────────────────────────────────────────────────────────── */

const TABLAS: { readonly [clave: string]: TablaLetra | undefined } = AVANCES_SUBTITULOS;

/**
 * Ancho estimado de una línea, en px, o `null` si su letra no tiene tabla
 * medida (una marca que declara otra familia sin medirla): entonces no se
 * encoge ni se comprueba, y el validador lo dice.
 */
export const anchoLinea = (texto: string, letra: LetraTrozo, px: number): number | null => {
  const tabla = letra.tabla ? TABLAS[letra.tabla] : undefined;
  if (!tabla) return null;
  let em = 0;
  for (let i = 0; i < texto.length; i++) {
    const avance = tabla.glifos[texto.charAt(i)];
    em += avance === undefined ? tabla.respaldo : avance;
  }
  return Math.ceil(em * px * SUB.margenAncho);
};

export interface Vista {
  ancho: number;
  alto: number;
}

/**
 * Ajustes de UNA pieza sobre la geometría del motor. Todo es opcional y, sin
 * ellos, el resultado es el de siempre: las composiciones ya publicadas no se
 * mueven.
 */
export interface AjusteSubtitulos {
  /**
   * Píxeles de la composición que se RESTAN al cuerpo de las líneas de `acento`
   * (la itálica), y solo a ellas: la base, el dato y la letra de la marca no se
   * tocan. Es lo que pide una pieza cuando la itálica pesa más de la cuenta sin
   * que haya que cambiar el canal entero (un número negativo la agranda). La
   * altura de la línea sigue a su cuerpo, así que el bloque encoge con ella.
   */
  acentoMenos?: number;
}

export interface LineaResuelta {
  texto: string;
  estilo: EstiloTrozo;
  desde: number;
  letra: LetraTrozo;
  /** Cuerpo final, ya encogido si hizo falta. */
  px: number;
  /** Alto de la caja de la línea, en px. No se encoge: el bloque no baila. */
  alto: number;
  /** Ancho estimado con el cuerpo final, o `null` sin tabla. */
  ancho: number | null;
  /** 1 = cabe tal cual; menos = lo que se ha reducido el cuerpo para que quepa. */
  encoge: number;
}

export interface BloqueResuelto {
  posicion: PosicionBloque;
  lineas: LineaResuelta[];
  /** Borde superior del bloque, en px. */
  top: number;
  /** Alto total del bloque con TODAS sus líneas: el sitio se reserva desde el principio. */
  alto: number;
  /** Margen lateral y ancho útil, en px. */
  margen: number;
  anchoUtil: number;
}

/** El margen lateral de la casa para ese cuadro (11 % en 9:16, 5 % en 16:9, 8 % en 1:1). */
export const margenDe = (vista: Vista): number =>
  Math.round((vista.ancho * zonaSeguraDe(vista.ancho, vista.alto)) / 100);

/**
 * La geometría de un bloque: qué cuerpo lleva cada línea y dónde cae. La usan
 * el intérprete (para pintar) y el validador (para avisar), y es la misma.
 */
export function resuelveBloque(
  b: BloqueEditorial,
  vista: Vista,
  letra: LetraSubtitulos,
  ajuste: AjusteSubtitulos = {}
): BloqueResuelto {
  const menosAcento = typeof ajuste.acentoMenos === "number" && isFinite(ajuste.acentoMenos) ? ajuste.acentoMenos : 0;
  const posicion: PosicionBloque = b.posicion === "arriba" || b.posicion === "centro" ? b.posicion : "abajo";
  const escala = typeof b.escala === "number" && b.escala > 0 ? b.escala : 1;
  const base = SUB.cuerpo * Math.min(vista.ancho, vista.alto) * escala;
  const margen = margenDe(vista);
  const anchoUtil = vista.ancho - 2 * margen;

  const lineas: LineaResuelta[] = [];
  let alto = 0;
  for (let i = 0; i < b.trozos.length; i++) {
    const t = b.trozos[i];
    // Un plan llega aquí sin pasar por el compilador (la puerta y el bundler no
    // comprueban tipos): un estilo que no existe se pinta como base y un texto
    // que falta, vacío. El validador lo avisa; aquí solo se evita que reviente.
    const estilo: EstiloTrozo = t.estilo === "acento" || t.estilo === "dato" ? t.estilo : "base";
    const texto = typeof t.texto === "string" ? t.texto : "";
    const suya = letra[estilo];
    const veces = estilo === "acento" ? SUB.acento : estilo === "dato" ? SUB.dato : 1;
    const pleno = Math.max(1, Math.round(base * veces) - (estilo === "acento" ? menosAcento : 0));
    const anchoPleno = anchoLinea(texto, suya, pleno);
    const encoge = anchoPleno !== null && anchoPleno > anchoUtil ? anchoUtil / anchoPleno : 1;
    // Hacia abajo: redondear hacia arriba devolvería el píxel que sobraba.
    const px = encoge < 1 ? Math.floor(pleno * encoge) : pleno;
    const altoLinea = Math.round(pleno * SUB.interlinea[estilo]);
    lineas.push({
      texto,
      estilo,
      desde: t.desde,
      letra: suya,
      px,
      alto: altoLinea,
      ancho: anchoLinea(texto, suya, px),
      encoge,
    });
    alto += altoLinea;
  }

  const suelo = Math.round(vista.alto * SUB.suelo);
  let top: number;
  if (posicion === "centro") top = Math.round((vista.alto - alto) / 2);
  else if (posicion === "arriba") top = Math.round(vista.alto * SUB.ancla.arriba);
  // Un bloque de tres líneas con el hook agrandado puede pasar del suelo: sube
  // entero lo que haga falta. Mejor un bloque más alto que uno bajo la interfaz.
  else top = Math.min(Math.round(vista.alto * SUB.ancla.abajo), suelo - alto);

  return { posicion, lineas, top, alto, margen, anchoUtil };
}

/* ── Validador ────────────────────────────────────────────────────────────── */

export interface OpcionesRevisa {
  /** fps de la composición. Por defecto 30 (montaje). */
  fps?: number;
  ancho?: number;
  alto?: number;
  /** Frames de la composición: ningún bloque acaba después. */
  duracion?: number;
  /** La letra con la que se va a pintar (`letraSubtitulosDe(marca)`). Por defecto, la del motor. */
  letra?: LetraSubtitulos;
  /** Datos grandes que admite la pieza. Por defecto uno: dos cifras gigantes compiten. */
  maxDatos?: number;
  /** Lo que la pieza le resta a la itálica (`AjusteSubtitulos.acentoMenos`): se mide con el cuerpo con que se va a pintar. */
  acentoMenos?: number;
}

const esEntero = (n: number): boolean => typeof n === "number" && isFinite(n) && Math.floor(n) === n;

const palabrasDe = (texto: string): string[] => {
  const out: string[] = [];
  const partes = texto.split(/\s+/);
  for (let i = 0; i < partes.length; i++) if (partes[i] !== "") out.push(partes[i]);
  return out;
};

/**
 * Los avisos de un plan de subtítulos editoriales. Devuelve `[]` si está limpio.
 * No lanza: un plan roto tiene que poder leerse entero, no fallar en el primer
 * error. Cada regla viene de algo que en pantalla se ve mal o tumba el render.
 */
export function revisaSubtitulosEditoriales(
  bloques: readonly BloqueEditorial[],
  opciones: OpcionesRevisa = {}
): string[] {
  const fps = opciones.fps !== undefined ? opciones.fps : 30;
  const vista: Vista = {
    ancho: opciones.ancho !== undefined ? opciones.ancho : 1080,
    alto: opciones.alto !== undefined ? opciones.alto : 1920,
  };
  const letra = opciones.letra || LETRA_SUBTITULOS;
  const maxDatos = opciones.maxDatos !== undefined ? opciones.maxDatos : 1;
  const avisos: string[] = [];
  const vistos: { [id: string]: boolean } = {};
  const sinTabla: { [estilo: string]: boolean } = {};
  let finAnterior = -1;
  let idAnterior = "";
  let primeroAnterior = -1;
  let idPrimeroAnterior = "";
  let ultimoAcento = -1;
  let idUltimoAcento = "";
  let datos = 0;

  for (let i = 0; i < bloques.length; i++) {
    const b = bloques[i];
    const id = b.id || "bloque " + (i + 1);
    const aviso = (texto: string): void => {
      avisos.push("[" + id + "] " + texto);
    };

    if (!b.id) aviso("sin `id`: los avisos de este bloque no se pueden localizar.");
    else if (vistos[b.id]) aviso("`id` repetido.");
    if (b.id) vistos[b.id] = true;

    if (!b.trozos || b.trozos.length === 0) {
      aviso("sin trozos: un bloque vacío no pinta nada.");
      continue;
    }
    if (b.trozos.length > SUB.maxTrozos) {
      aviso(b.trozos.length + " líneas: el máximo es " + SUB.maxTrozos + ". Parte el bloque en dos.");
    }

    // ── Línea de tiempo ──
    const primero = b.trozos[0].desde;
    const ultimo = b.trozos[b.trozos.length - 1].desde;
    if (!esEntero(b.hasta)) aviso("`hasta` (" + b.hasta + ") no es un frame entero.");
    let tiemposBien = esEntero(b.hasta);
    // Un bloque que entra «ya puesto» (`entrada: 0`) puede traer todas sus líneas
    // en el mismo frame: es un rótulo entero desde el principio, no una frase que
    // se va diciendo. En los demás, dos líneas en el mismo frame son una sola.
    const minEntre = b.entrada === 0 ? 0 : SUB.minEntreTrozos;
    for (let j = 0; j < b.trozos.length; j++) {
      const t = b.trozos[j];
      if (!esEntero(t.desde) || t.desde < 0) {
        aviso("línea " + (j + 1) + ": `desde` (" + t.desde + ") no es un frame entero ≥ 0.");
        tiemposBien = false;
      } else if (j > 0 && t.desde < b.trozos[j - 1].desde) {
        aviso("línea " + (j + 1) + " entra en " + t.desde + ", ANTES que la anterior: las líneas van en el orden en que entran.");
      } else if (j > 0 && t.desde - b.trozos[j - 1].desde < minEntre) {
        aviso(
          "línea " + (j + 1) + " entra en " + t.desde + ", a " + (t.desde - b.trozos[j - 1].desde) +
            " f de la anterior: las líneas se acumulan en orden y con " + SUB.minEntreTrozos + " f o más entre una y otra."
        );
      }
    }
    if (tiemposBien) {
      if (b.hasta - ultimo < SUB.minTrozo) {
        aviso(
          "la última línea entra en " + ultimo + " y el bloque sale en " + b.hasta + ": " + (b.hasta - ultimo) +
            " f en pantalla, y hacen falta " + SUB.minTrozo + " para leerla."
        );
      } else {
        // Las dos rampas se solapan: la línea sube mientras el bloque ya baja y
        // no llega a verse entera. Con los defectos (5 + 4 en 12) no pasa.
        const fundido = b.entrada !== undefined ? b.entrada : SUB.entrada;
        if (esEntero(fundido) && fundido + SUB.salida > b.hasta - ultimo) {
          aviso(
            "el fundido de entrada (" + fundido + " f) no termina antes de la salida del bloque (" + SUB.salida +
              " f): la última línea no llega a verse entera. Baja `entrada` o alarga el bloque."
          );
        }
      }
      if (primero < primeroAnterior) {
        aviso(
          "entra en " + primero + ", ANTES que [" + idPrimeroAnterior + "] (" + primeroAnterior +
            "): los bloques van en el orden en que entran."
        );
      } else if (primero < finAnterior) {
        aviso("entra en " + primero + " y [" + idAnterior + "] no sale hasta " + finAnterior + ": dos bloques a la vez se pisan.");
      }
      primeroAnterior = primero;
      idPrimeroAnterior = id;
      if ((b.hasta - primero) / fps > SUB.maxBloque) {
        aviso(
          "está " + ((b.hasta - primero) / fps).toFixed(1) + " s en pantalla: pasado de " + SUB.maxBloque +
            " s deja de acompañar a la voz. Parte el bloque."
        );
      }
      if (opciones.duracion !== undefined && b.hasta > opciones.duracion) {
        aviso("sale en " + b.hasta + " y la composición acaba en " + opciones.duracion + ".");
      }
      const entrada = b.entrada !== undefined ? b.entrada : SUB.entrada;
      if (primero === 0 && entrada > 0) {
        aviso(
          "empieza en el frame 0 con fundido: el frame 0 es la miniatura y saldría sin texto. " +
            "Pon `entrada: 0` o empieza el bloque más tarde."
        );
      }
      if (b.hasta > finAnterior) {
        finAnterior = b.hasta;
        idAnterior = id;
      }
    }
    if (b.entrada !== undefined && (!esEntero(b.entrada) || b.entrada < 0 || b.entrada > 15)) {
      aviso("`entrada` (" + b.entrada + ") tiene que ser un entero de 0 a 15 frames.");
    }
    if (b.posicion !== undefined && b.posicion !== "abajo" && b.posicion !== "arriba" && b.posicion !== "centro") {
      aviso("posicion «" + String(b.posicion) + "» desconocida (abajo, arriba o centro): se pintaría abajo.");
    }
    if (b.escala !== undefined && (!(b.escala >= 0.7) || !(b.escala <= 1.8))) {
      aviso("`escala` (" + b.escala + ") fuera de 0,7-1,8: a partir de ahí ya no es el mismo sistema.");
    }

    // ── Estilos ──
    let acentos = 0;
    let datosAqui = 0;
    for (let j = 0; j < b.trozos.length; j++) {
      const t = b.trozos[j];
      const estilo: EstiloTrozo = t.estilo || "base";
      const n = j + 1;
      if (estilo !== "base" && estilo !== "acento" && estilo !== "dato") {
        aviso("línea " + n + ": estilo «" + String(t.estilo) + "» desconocido (base, acento o dato).");
        continue;
      }
      if (typeof t.texto !== "string" || t.texto.trim() === "") {
        aviso("línea " + n + " sin texto.");
        continue;
      }
      if (t.texto !== t.texto.trim() || t.texto.indexOf("  ") >= 0) {
        aviso("línea " + n + " «" + t.texto + "»: espacios de más.");
      }
      const recortado = t.texto.trim();
      const barraSuelta = recortado.charAt(0) === "/" || recortado.charAt(recortado.length - 1) === "/";
      if (t.texto.indexOf("**") >= 0 || t.texto.indexOf(" / ") >= 0 || t.texto.indexOf("==") >= 0 || barraSuelta) {
        aviso("línea " + n + " «" + t.texto + "»: quedan marcas del guion (`**`, `/`, `==`) dentro del texto.");
      }
      const palabras = palabrasDe(t.texto).length;
      if (palabras > SUB.maxPalabras[estilo]) {
        aviso(
          "línea " + n + " «" + t.texto + "»: " + palabras + " palabras en " + estilo + ", y el máximo es " +
            SUB.maxPalabras[estilo] + ". El trozo se corta por la respiración de la frase."
        );
      }
      if (estilo === "acento") {
        acentos++;
        if (esEntero(t.desde)) {
          if (ultimoAcento >= 0 && (t.desde - ultimoAcento) / fps < SUB.minEntreAcentos && idUltimoAcento !== id) {
            aviso(
              "acento «" + t.texto + "» a " + ((t.desde - ultimoAcento) / fps).toFixed(1) + " s del de [" + idUltimoAcento +
                "]: con menos de " + SUB.minEntreAcentos + " s entre acentos ninguno destaca."
            );
          }
          ultimoAcento = t.desde;
          idUltimoAcento = id;
        }
      }
      if (estilo === "dato") {
        datos++;
        datosAqui++;
      }
    }
    if (acentos > 1) aviso(acentos + " acentos en el mismo bloque: uno, o no acentúa ninguno.");
    if (datosAqui > 0 && b.trozos.length > 1) {
      aviso("un dato va SOLO en su bloque: la cifra enorme con más líneas encima es un cartel, no un dato.");
    }
    if (datosAqui > 0 && b.posicion !== "centro") {
      aviso("el dato va en `posicion: \"centro\"`: a su tamaño, arriba o abajo tapa lo que acompaña.");
    }

    // ── Geometría ──
    const r = resuelveBloque(b, vista, letra, { acentoMenos: opciones.acentoMenos });
    for (let j = 0; j < r.lineas.length; j++) {
      const l = r.lineas[j];
      if (l.ancho === null) {
        sinTabla[l.estilo] = true;
      } else if (l.encoge < SUB.encogeAviso) {
        aviso(
          "línea " + (j + 1) + " «" + l.texto + "» no cabe en " + r.anchoUtil + " px a su cuerpo y se encoge al " +
            Math.round(l.encoge * 100) + " %: ya no se lee como " + l.estilo + ". Acorta o parte el texto."
        );
      }
    }
    if (r.top < 0 || r.top + r.alto > Math.round(vista.alto * SUB.suelo)) {
      aviso(
        "ocupa de " + r.top + " a " + (r.top + r.alto) + " px y el cuadro útil va de 0 a " + Math.round(vista.alto * SUB.suelo) +
          ": quita una línea o baja `escala`."
      );
    }
  }

  if (datos > maxDatos) {
    avisos.push("[plan] " + datos + " datos grandes y el máximo es " + maxDatos + ": con más de una cifra gigante ninguna se recuerda.");
  }
  const estilos = Object.keys(sinTabla);
  for (let i = 0; i < estilos.length; i++) {
    avisos.push(
      "[plan] la letra de «" + estilos[i] + "» no tiene tabla de avances medida: el ancho de esas líneas NO se comprueba ni se " +
        "ajusta. Mide la familia con medir-letras-subtitulos.mjs y declara su `tabla`."
    );
  }
  return avisos;
}

/* ── Hacia el .srt ────────────────────────────────────────────────────────── */

/**
 * El mismo plan como `Segmento[]` en segundos, una entrada por línea: es lo que
 * lee `exportar-srt.mjs`. El archivo del proyecto lo exporta junto al plan
 * (`export const srtNNN = segmentosDe(subtitulosNNN, 30)`) y así R14 se sigue
 * cumpliendo: la pista de captions de la plataforma sale del mismo dato.
 */
export function segmentosDe(bloques: readonly BloqueEditorial[], fps: number): Segmento[] {
  const out: Segmento[] = [];
  for (let i = 0; i < bloques.length; i++) {
    const b = bloques[i];
    let j = 0;
    while (j < b.trozos.length) {
      // Las líneas que entran en el MISMO frame (un bloque que llega ya puesto)
      // son un solo cue: por separado, la primera duraría cero y se perdería.
      let k = j;
      const textos: string[] = [];
      while (k < b.trozos.length && b.trozos[k].desde === b.trozos[j].desde) {
        const tx = b.trozos[k].texto;
        if (typeof tx === "string" && tx.trim() !== "") textos.push(tx.trim());
        k++;
      }
      const fin = k < b.trozos.length ? b.trozos[k].desde : b.hasta;
      if (fin > b.trozos[j].desde && textos.length > 0) {
        out.push({ from: b.trozos[j].desde / fps, to: fin / fps, text: textos.join(" ") });
      }
      j = k;
    }
  }
  return out;
}
