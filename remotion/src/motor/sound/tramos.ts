/**
 * EL AUDIO POR TRAMOS, COMO DATOS — la voz y la música, que no son un SFX.
 *
 *   audio-NNN.ts  (TramoAudio[])  →  <PistaAudio>
 *
 * EL HUECO QUE TAPA. `<PistaMetraje>` pinta el vídeo SIEMPRE mudo («si una pieza
 * necesita el sonido de un clip, va en su propia capa de audio y con su
 * volumen») y `<PistaSonido>` solo sabe de efectos: los busca en `public/sfx/`
 * y los ancla a un golpe. Entre los dos no había sitio para la voz de una toma,
 * una locución o una música, y cada pieza se lo escribió a mano: el 009 su cama
 * de ambiente, el 010 y el 011 la envolvente de su música dentro de la
 * composición, el 015 una capa de voz por corte. Con una segunda pieza que
 * necesita esto último —presentadora a cámara, planos mudos, voz en off y
 * música— ya se sabe qué es del FORMATO, y un proyecto no puede importar de
 * otro: sube aquí, generalizado.
 *
 * QUÉ SE GENERALIZA. La capa del 015 derivaba la voz de cada corte, y por eso no
 * sabía sonar donde no hubiera un plano suyo. Aquí el dato es el TRAMO: un
 * archivo, el frame en que empieza a sonar, cuánto dura, desde qué segundo de
 * la fuente, con qué nivel y con qué fundidos. Una locución, una música y la
 * voz de una toma son la misma cosa con números distintos, y lo que ANTES era
 * la capa entera es ahora una función que fabrica tramos a partir del montaje
 * (`vocesDeCortes`). Lo que sigue siendo de cada pieza —el hueco entre frases,
 * el nivel objetivo, cuánto baja la música— entra por parámetro.
 *
 * Datos puros, y sin React ni Remotion en ejecución (solo importa de
 * `metraje/corte`, que tampoco los lleva): la puerta
 * (`manuales/diseno-sonoro/scripts/revisar-audio.mjs`) carga este archivo con
 * `node` y revisa con LAS MISMAS cuentas con las que suena el intérprete. Por
 * eso los fundidos no usan el `interpolate` de Remotion sino su misma
 * aritmética escrita aquí (`rampa`): el orden de las operaciones es el suyo, y
 * el volumen sale idéntico bit a bit al de una capa escrita con `interpolate`
 * (comprobado renderizando el 015 con su capa y con ésta: mismo PCM).
 */
import { solapeDe, type Corte } from "../metraje/corte";

/**
 * La forma de un fundido.
 *
 *   lineal    la de un desclic o un fundido contra el silencio.
 *   potencia  seno al entrar, coseno al salir: es la de un CRUCE entre dos
 *             fuentes. Dos rampas lineales cruzadas pierden 3 dB en el centro
 *             (0,5 + 0,5 en amplitud, pero las dos señales no están
 *             correlacionadas y lo que se suma es la potencia); con seno y
 *             coseno, sin² + cos² = 1 y el nivel no se hunde a mitad del cruce.
 */
export type Curva = "lineal" | "potencia";

export interface TramoAudio {
  /** Único en su lista: es la `key` de su `<Sequence>` y lo que nombra cada aviso. */
  id: string;
  /**
   * Ruta dentro de `remotion/public/`. WAV siempre que tenga que casar con una
   * imagen: un AAC arrastra 1024 muestras de priming (21 ms a 48 kHz, más de
   * medio frame) y la voz llega tarde a su boca.
   */
  src: string;
  /** Frame ABSOLUTO de la composición en que empieza a sonar. */
  en: number;
  /** Frames que suena. */
  dur: number;
  /**
   * SEGUNDO de la fuente en que arranca (defecto 0), como `Corte.desde` y por lo
   * mismo: describe el material, y el material no depende del fps de la comp.
   * El intérprete lo pasa a `trimBefore` con `Math.round(desde · fps)`, la misma
   * cuenta que `<PistaMetraje>` hace con la imagen, así que un tramo y un plano
   * con el mismo `desde` cortan en la misma muestra.
   */
  desde?: number;
  /**
   * Ganancia lineal (1 = tal cual; puede pasar de 1, Remotion la aplica al
   * renderizar), o una ENVOLVENTE de puntos `[frame ABSOLUTO de la comp,
   * ganancia]` que se interpola en línea recta y se sostiene fuera de sus
   * extremos. En frames absolutos y no locales al tramo porque una envolvente
   * de música se escribe mirando la línea de tiempo: «baja cuando entra la voz».
   */
  ganancia?: number | readonly (readonly [number, number])[];
  /** Frames de fundido de entrada (defecto 0: entra a pelo). */
  entra?: number;
  /** Frames de fundido de salida (defecto 0). */
  sale?: number;
  /** Defecto `lineal`. */
  curvaEntra?: Curva;
  /** Defecto `lineal`. */
  curvaSale?: Curva;
  /**
   * La fuente es más corta que el tramo y se repite (una textura, una música en
   * bucle). Los fundidos y la envolvente siguen contando sobre el tramo entero,
   * no sobre cada vuelta.
   */
  bucle?: boolean;
  /** Por qué suena esto, aquí y así. Obligatorio, como en todo plan de la casa. */
  reason: string;
}

/** Ganancia lineal que lleva una sonoridad medida (LUFS) hasta un objetivo: `10^((objetivo − lufs) / 20)`. */
export const gananciaHasta = (lufs: number, objetivo: number): number => Math.pow(10, (objetivo - lufs) / 20);

/**
 * En qué frame de la COMPOSICIÓN cae un instante de la FUENTE (`segundo`), dado
 * el `en` y el `desde` de lo que la reproduce —un tramo o un corte, que llevan
 * los dos campos con el mismo significado—. Es la cuenta con la que se colocan
 * un subtítulo, un texto o un SFX sobre una palabra medida en el clip: los dos
 * redondeos van por separado, como en el intérprete, o el resultado baila un
 * frame según el `desde`.
 */
export const frameDeFuente = (en: number, desde: number | undefined, segundo: number, fps: number): number =>
  en + Math.round(segundo * fps) - Math.round((desde ?? 0) * fps);

/**
 * Un tramo de recta entre (x0, y0) y (x1, y1), sostenido fuera de [x0, x1].
 *
 * Es la aritmética de `interpolate(x, [x0, x1], [y0, y1])` de Remotion con
 * `clamp` a los dos lados, en su mismo orden (recortar, normalizar, escalar).
 * Lo que NO copia es que lance con un rango que no crece: aquí un rango
 * degenerado es un escalón en `x1`, porque un fundido de 0 frames o un tramo
 * más corto que su fundido son datos discutibles, no un render que revienta.
 */
const rampa = (x: number, x0: number, x1: number, y0: number, y1: number): number => {
  if (!(x1 > x0)) return x < x1 ? y0 : y1;
  let r = x;
  if (r < x0) r = x0;
  if (r > x1) r = x1;
  if (y0 === y1) return y0;
  return ((r - x0) / (x1 - x0)) * (y1 - y0) + y0;
};

/** El valor de una envolvente de puntos `[frame, valor]` en un frame. Sin puntos, 1: no toca el nivel. */
const nivelEn = (puntos: readonly (readonly [number, number])[], frame: number): number => {
  if (puntos.length === 0) return 1;
  if (puntos.length === 1) return puntos[0][1];
  // El tramo de recta que toca es el primero cuyo extremo derecho no queda a la izquierda del frame.
  let i = 1;
  while (i < puntos.length - 1 && puntos[i][0] < frame) i++;
  return rampa(frame, puntos[i - 1][0], puntos[i][0], puntos[i - 1][1], puntos[i][1]);
};

/** De 0 a 1 en los `n` primeros frames. Sin fundido (`n` ≤ 0), 1. */
const subida = (f: number, n: number, curva: Curva | undefined): number => {
  if (!(n > 0)) return 1;
  const p = rampa(f, 0, n, 0, 1);
  return curva === "potencia" ? Math.sin((Math.PI / 2) * p) : p;
};

/** De 1 a 0 en los `n` últimos frames de un tramo de `dur`. Sin fundido, 1. */
const bajada = (f: number, dur: number, n: number, curva: Curva | undefined): number => {
  if (!(n > 0)) return 1;
  return curva === "potencia" ? Math.cos((Math.PI / 2) * rampa(f, dur - n, dur, 0, 1)) : rampa(f, dur - n, dur, 1, 0);
};

/**
 * El volumen de un tramo en su frame LOCAL `f` (0 = el primero en que suena):
 * ganancia × entrada × salida. Es lo que recibe `<Audio volume>`.
 *
 * Los dos fundidos se MULTIPLICAN en vez de interpolarse en cuatro puntos: así
 * cada uno solo existe si se pidió, y un tramo más corto que sus fundidos da
 * dos rampas que se pisan —discutible, y la puerta lo avisa—, no una excepción.
 *
 * El recorte a 0 es por limpieza, no lo que protege el render: con `volume`
 * como función Remotion ya recorta él un negativo. Lo que SÍ para el render es
 * un volumen NaN o infinito, y aquí sale uno en cuanto los datos lo traen (una
 * ganancia o un LUFS que no son un número, un fundido infinito). Eso no se
 * arregla en cada frame: lo caza `revisaAudio` antes de renderizar.
 */
export const volumenDe = (t: TramoAudio, f: number): number => {
  const g = t.ganancia;
  const nivel = g === undefined ? 1 : typeof g === "number" ? g : nivelEn(g, f + t.en);
  return Math.max(0, nivel * subida(f, t.entra ?? 0, t.curvaEntra) * bajada(f, t.dur, t.sale ?? 0, t.curvaSale));
};

// ── La voz de un montaje ───────────────────────────────────────────────────────

/**
 * Lo que `vocesDeCortes` lee de un plano del montaje. No es otro tipo de corte:
 * es el mínimo común, para que el `Corte` que cada pieza extiende en su
 * `metraje-NNN.ts` (con `audio` y `voz`) entre tal cual, sin que el motor tenga
 * que conocer esa extensión.
 */
export interface CorteConVoz {
  id: string;
  en: number;
  dur: number;
  desde?: number;
  entra?: string;
  velocidad?: number;
  /** El WAV con el sonido de este plano. Sin él, el plano es mudo y no da tramo. */
  audio?: string;
  /**
   * Dónde habla en SU clip (segundos de la fuente) y a qué sonoridad, medido con
   * `limites-voz.py` y no con whisper. Aquí solo se usa `lufs`; `s0` y `s1` los
   * leen la puerta y los textos de la pieza (`frameDeFuente`).
   */
  voz?: { s0: number; s1: number; lufs: number; dice?: string };
}

export interface OpcionesVoces {
  fps: number;
  /** Si se da, cada corte con `voz` se iguala a esta sonoridad con UNA ganancia (el fader del clip, y nada más). */
  objetivoLufs?: number;
  /** Frames del cruce de voz entre dos planos que se disuelven. Defecto `CRUCE_VOZ`. */
  cruce?: number;
  /**
   * Frames del fundido de una voz contra un CORTE SECO: al entrar, si su plano
   * no disuelve, y al salir, si el plano que la sigue tampoco. Defecto `DESCLIC_VOZ`.
   */
  desclic?: number;
  /**
   * Frames de salida de la voz del ÚLTIMO plano de la lista: el final de la
   * pieza, y solo él. Defecto `FUNDIDO_FINAL_VOZ`. Ese plano tiene que acabar
   * al menos estos frames después de su última palabra, o el fundido se la come:
   * el motor no sabe dónde acaba una palabra y eso lo mide la puerta de la pieza.
   */
  fundidoFinal?: number;
}

/**
 * Frames del cruce de la VOZ entre dos tomas: los 6 últimos de una disolvencia
 * de 12, y en potencia constante. No es la disolvencia entera a propósito: con
 * la última palabra de una toma a 14 f del `en` de la siguiente, fundir los 12
 * empezaría 2 f después de esa palabra y se comería la cola de las «s» finales,
 * que un detector de voz corta antes de tiempo. En los 6 del cruce solo se
 * relevan dos aires.
 */
export const CRUCE_VOZ = 6;
/** Frames del fundido de una voz contra un corte seco: lo justo para que ese frame no haga clic. */
export const DESCLIC_VOZ = 3;
/** Frames de salida de la última voz de la pieza: el aire de después de la última palabra. */
export const FUNDIDO_FINAL_VOZ = 12;

/**
 * `solapeDe` solo mira `entra`, pero su firma pide el `Corte` entero (zoom,
 * reason…). Se usa igualmente, y no un `=== "disolver"` de aquí, para que la
 * voz y la imagen decidan con LA MISMA función qué plano disuelve.
 */
const disuelve = (c: CorteConVoz): boolean => solapeDe(c as unknown as Corte<string>) > 0;

/**
 * Los tramos de voz de un montaje: uno por cada corte que trae `audio`, leído
 * con el mismo arranque que su imagen —boca y voz caen en la misma muestra—.
 *
 * Se le pasa la lista COMPLETA de planos, mudos incluidos: que una voz cruce al
 * salir depende de si disuelve el PLANO que la sigue, tenga voz o no. Filtrar
 * antes los cortes con voz cambia quién es «el siguiente» y el cruce se calcula
 * contra el plano equivocado.
 *
 *   entra   si su plano disuelve, `cruce` frames ANTES de su `en` y en potencia
 *           (la fuente retrocede lo mismo); si no, `desclic` frames en lineal.
 *   sale    si el plano siguiente disuelve, en potencia en sus últimos `cruce`
 *           frames; si entra a corte (o de negro), `desclic` frames en lineal;
 *           si no hay plano siguiente, `fundidoFinal` frames en lineal.
 *   nivel   con `objetivoLufs` y `voz.lufs`, la ganancia que la lleva hasta ahí.
 *
 * La salida la decide CÓMO ENTRA EL PLANO SIGUIENTE, igual que la entrada la
 * decide cómo entra el propio: el sonido hace lo que hace la imagen. El fundido
 * largo es solo el del final de la pieza. En la capa de la que sale esto lo
 * llevaba toda voz a la que no siguiera una disolvencia, y allí daba igual
 * —entre tomas siempre se disolvía y solo le tocaba a la última—; pero en un
 * montaje con planos a corte, 12 f de fundido dejan la voz a −6 dB seis frames
 * antes de un corte que la imagen da en seco, y si el plano acaba pegado a su
 * última palabra, se la comen.
 *
 * LANZA si un corte con `audio` lleva `velocidad` distinta de 1. La imagen se
 * puede frenar o acelerar; la voz, no sin cambiarle el tono o estirarla, y eso
 * no se decide a escondidas: o el plano va a velocidad 1, o va sin `audio` y
 * su sonido se monta como un tramo propio.
 */
export function vocesDeCortes(cortes: readonly CorteConVoz[], o: OpcionesVoces): TramoAudio[] {
  const cruce = o.cruce ?? CRUCE_VOZ;
  const desclic = o.desclic ?? DESCLIC_VOZ;
  const fundidoFinal = o.fundidoFinal ?? FUNDIDO_FINAL_VOZ;
  const tramos: TramoAudio[] = [];
  for (let i = 0; i < cortes.length; i++) {
    const c = cortes[i];
    if (!c.audio) continue;
    if ((c.velocidad ?? 1) !== 1) {
      throw new Error(
        `[${c.id}] lleva audio y velocidad ${c.velocidad}: la voz de un plano no se acelera ni se frena con su imagen. Déjalo a velocidad 1, o quítale \`audio\` y monta su sonido como un tramo propio.`
      );
    }
    const siguiente = cortes[i + 1];
    const cruzaAlEntrar = disuelve(c);
    const cruzaAlSalir = siguiente !== undefined && disuelve(siguiente);
    const antes = cruzaAlEntrar ? cruce : 0;
    const sale = cruzaAlSalir ? cruce : siguiente !== undefined ? desclic : fundidoFinal;
    tramos.push({
      id: `voz-${c.id}`,
      src: c.audio,
      en: c.en - antes,
      dur: c.dur + antes,
      // El arranque de la imagen en FRAMES, menos los del cruce, y de vuelta a
      // segundos: el intérprete lo redondea otra vez y sale ese mismo entero.
      desde: (Math.round((c.desde ?? 0) * o.fps) - antes) / o.fps,
      ganancia: c.voz !== undefined && o.objetivoLufs !== undefined ? gananciaHasta(c.voz.lufs, o.objetivoLufs) : 1,
      entra: cruzaAlEntrar ? cruce : desclic,
      curvaEntra: cruzaAlEntrar ? "potencia" : "lineal",
      sale,
      curvaSale: cruzaAlSalir ? "potencia" : "lineal",
      reason:
        `La voz del plano ${c.id}${c.voz !== undefined && c.voz.dice ? ` («${c.voz.dice}»)` : ""}, con el arranque de su imagen: ` +
        (cruzaAlEntrar
          ? `entra ${cruce} f antes que él, ` + (i > 0 && cortes[i - 1].audio ? "cruzando con la voz del plano anterior" : "en fundido: el plano anterior es mudo")
          : `entra con ${desclic} f de desclic`) +
        (cruzaAlSalir
          ? siguiente !== undefined && siguiente.audio
            ? ` y sale cruzando ${cruce} f con la voz del plano que la sigue.`
            : ` y sale fundiendo ${cruce} f: el plano que la sigue es mudo.`
          : siguiente !== undefined
            ? ` y sale con ${desclic} f de desclic, a corte como el plano que la sigue.`
            : ` y sale con ${fundidoFinal} f de fundido: es el final de la pieza.`),
    });
  }
  return tramos;
}

// ── La música bajo la voz ──────────────────────────────────────────────────────

export interface OpcionesMusica {
  /** Ganancia de la música cuando suena sola. */
  alto: number;
  /** Ganancia de la música mientras hay voz. */
  bajo: number;
  /** Frames que tarda en bajar (antes de la voz) y en volver a subir (después). Mínimo 1. */
  rampa: number;
  /** Frames de la composición: la envolvente va de 0 a aquí. */
  duracion: number;
  /** Frames de fundido desde el silencio al principio. Sin él, la música arranca puesta. */
  entrada?: number;
  /** Frames de fundido al silencio al final. */
  cola?: number;
}

/**
 * La envolvente de la MÚSICA a partir de dónde hay voz: los puntos que van en
 * la `ganancia` de su tramo. Se calcula desde los tramos de voz del plan y no
 * se escribe a mano, porque con frames literales mover un corte desincroniza
 * la música sin que nada falle.
 *
 *   · está en `alto`; BAJA a `bajo` en los `rampa` frames de ANTES de cada voz
 *     (la bajada termina en el frame en que la voz empieza: la primera sílaba
 *     ya la encuentra abajo) y vuelve a `alto` en los `rampa` de después;
 *   · dos voces con menos de 2·`rampa` de hueco son una sola bajada: subir para
 *     volver a bajar sin llegar arriba es un bombeo, y se oye más que la música;
 *   · una rampa que se sale de la composición (la voz empieza en el frame 0 o
 *     llega hasta el final) se recorta y conserva su pendiente;
 *   · con `entrada` y `cola`, los extremos funden desde y hasta el silencio, y
 *     dentro de esos frames manda el fundido: va en línea recta hasta el nivel
 *     que la envolvente tiene donde acaba (o desde el que tiene donde empieza).
 *
 * `voces` son intervalos `{ en, dur }` en frames de la comp: valen los tramos de
 * `vocesDeCortes` tal cual, o las ventanas de voz medidas si se quiere que la
 * música vuelva en cuanto se calla y no cuando termina el plano. El orden da
 * igual. Los frames de los puntos salen estrictamente crecientes.
 */
export function envolventeBajoVoz(voces: readonly { en: number; dur: number }[], o: OpcionesMusica): [number, number][] {
  const pendiente = Math.max(1, o.rampa);

  // 1. Las voces, en orden y fundidas cuando el hueco no da para subir y bajar.
  const intervalos: [number, number][] = [];
  for (const v of voces) if (v.dur > 0) intervalos.push([v.en, v.en + v.dur]);
  intervalos.sort((a, b) => a[0] - b[0]);
  const grupos: [number, number][] = [];
  for (const [ini, fin] of intervalos) {
    const ultimo = grupos.length > 0 ? grupos[grupos.length - 1] : undefined;
    if (ultimo !== undefined && ini - ultimo[1] < 2 * pendiente) ultimo[1] = Math.max(ultimo[1], fin);
    else grupos.push([ini, fin]);
  }

  // 2. La curva de la bajada, todavía sin recortar a la composición.
  const curva: [number, number][] = [];
  const pon = (frame: number, valor: number): void => {
    // Con el hueco justo de 2·rampa la subida acaba donde empieza la bajada: un punto, no dos.
    if (curva.length === 0 || frame > curva[curva.length - 1][0]) curva.push([frame, valor]);
  };
  for (const [ini, fin] of grupos) {
    pon(ini - pendiente, o.alto);
    pon(ini, o.bajo);
    pon(fin, o.bajo);
    pon(fin + pendiente, o.alto);
  }
  const nivel = (frame: number): number => {
    // Sobre un punto de la curva, SU valor y no el interpolado: la recta llega a
    // él con el error del último bit (0,09999999999999998 por 0,1), que no se oye
    // pero ensucia un plan que alguien va a leer.
    for (const p of curva) if (p[0] === frame) return p[1];
    return curva.length > 0 ? nivelEn(curva, frame) : o.alto;
  };

  // 3. De 0 a `duracion`, con sus dos fundidos. Si entre los dos no caben, la cola cede.
  const entrada = Math.min(Math.max(0, o.entrada ?? 0), o.duracion);
  const cola = Math.min(Math.max(0, o.cola ?? 0), o.duracion - entrada);
  const finDelCuerpo = o.duracion - cola;
  const puntos: [number, number][] = [];
  if (entrada > 0) puntos.push([0, 0]);
  puntos.push([entrada, nivel(entrada)]);
  for (const p of curva) if (p[0] > entrada && p[0] < finDelCuerpo) puntos.push(p);
  if (finDelCuerpo > entrada) puntos.push([finDelCuerpo, nivel(finDelCuerpo)]);
  if (cola > 0) puntos.push([o.duracion, 0]);
  return puntos;
}

// ── La puerta ──────────────────────────────────────────────────────────────────

/**
 * Techo de ganancia: +6 dB. Subir más una toma ya no es igualarla con sus
 * vecinas, es fabricar un nivel que no se grabó, y con él sube su suelo de
 * ruido. Si una voz lo necesita, el arreglo está en el material.
 */
const GANANCIA_MAXIMA = 2;

const enDb = (g: number): string => {
  const db = 20 * Math.log10(g);
  return `${db >= 0 ? "+" : ""}${db.toFixed(1)} dB`;
};

/** Un número de verdad: ni NaN, ni infinito, ni otra cosa que el plan traiga con los tipos ya tirados. */
const esNumero = (x: unknown): x is number => typeof x === "number" && Number.isFinite(x);

/**
 * Lo que se puede saber de un plan de audio SIN abrir sus archivos. Devuelve
 * avisos `[id] …` y nunca lanza: es una puerta, no un render. Lo que necesita
 * el disco (que el archivo exista y tenga el tramo que se le pide) lo mide
 * `revisar-audio.mjs`, que llama a esta función y añade lo suyo.
 *
 * «Nunca lanza» incluye lo que los tipos prohíben. La puerta carga el plan con
 * esbuild, que los tira: lo que llega aquí es JavaScript suelto, y una ruta
 * sacada de un mapa por una clave que no existe es `string` para `tsc` y
 * `undefined` al ejecutar. Por eso cada campo se mira antes de usarlo, y lo que
 * no es un tramo, una ganancia o un punto se DICE en vez de reventar.
 *
 * Cada aviso es un fallo que NO se ve: o Remotion lo traga en silencio (un
 * tramo que pasa del final de la comp pierde su fundido de salida y acaba en un
 * clic) o revienta a mitad de render (un `trimBefore` negativo).
 *
 * Lo que NO mira: que dos voces suenen a la vez. Un tramo no dice si es voz,
 * música o ambiente, y dos tramos solapados son lo normal (la música bajo la
 * locución, el cruce de dos tomas). Eso lo sabe la puerta de cada pieza.
 */
export function revisaAudio(tramos: readonly TramoAudio[], o: { fps: number; duracion?: number }): string[] {
  const avisos: string[] = [];
  // Las opciones, como todo lo demás aquí, pueden llegar sin tipos.
  const opciones: { fps?: number; duracion?: number } = (o as { fps?: number; duracion?: number } | null | undefined) ?? {};
  const fps = opciones.fps;
  const duracion = opciones.duracion;
  if (!esNumero(fps) || !(fps > 0)) {
    avisos.push(`fps ${fps}: tiene que ser un número mayor que 0; sin él no se puede revisar ningún tramo`);
    return avisos;
  }
  if (!Array.isArray(tramos)) {
    avisos.push("lo que se revisa no es una lista de tramos");
    return avisos;
  }
  // Sin prototipo: con `{}`, un tramo que se llamara «constructor» ya estaría «visto».
  const vistos: { [id: string]: true | undefined } = Object.create(null);
  tramos.forEach((crudo: unknown, i) => {
    if (crudo === null || typeof crudo !== "object" || Array.isArray(crudo)) {
      avisos.push(`[#${i}] no es un tramo (${crudo === null ? "null" : Array.isArray(crudo) ? "una lista" : typeof crudo}): <PistaAudio> revienta al llegar a él`);
      return;
    }
    const t = crudo as TramoAudio;
    const conId = typeof t.id === "string" && t.id !== "";
    const dice = (m: string): void => {
      avisos.push(`[${conId ? t.id : `#${i}`}] ${m}`);
    };
    if (!conId) dice("sin `id`: es la key de su <Sequence> y lo que nombra sus avisos");
    else if (vistos[t.id]) dice("id repetido (es la key de su <Sequence>)");
    else vistos[t.id] = true;

    if (typeof t.src !== "string" || t.src === "") dice("sin `src`: no hay archivo que sonar");

    const enteros = Number.isInteger(t.en) && Number.isInteger(t.dur) && t.dur > 0;
    if (!enteros) dice(`en=${t.en} dur=${t.dur}: tienen que ser frames enteros y dur > 0`);
    else {
      if (t.en < 0) {
        dice(
          `empieza en el frame ${t.en}: lo de antes del frame 0 no suena, y con ello se pierde su fundido de entrada` +
            // El intérprete monta ese bucle desde el frame 0 (ver `<PistaAudio>`): la fuente no llega «ya empezada».
            (t.bucle ? `; y al ser un bucle, su primera vuelta arranca en el frame 0 por el principio, no ${-t.en} f dentro de la fuente` : "")
        );
      }
      if (duracion !== undefined && t.en + t.dur > duracion) {
        dice(`acaba en el frame ${t.en + t.dur} y la composición dura ${duracion}: lo que sobra no suena, y con ello se pierde su fundido de salida`);
      }
    }

    const arranque = Math.round((t.desde ?? 0) * fps);
    if (!(arranque >= 0)) {
      dice(
        `desde=${t.desde} s: arranca ${Number.isFinite(arranque) ? `${-arranque} f antes del principio de la fuente` : "en un instante que no es un número"}; Remotion rechaza un trimBefore negativo y el render se para`
      );
    }

    const entra: unknown = t.entra ?? 0;
    const sale: unknown = t.sale ?? 0;
    if (!esNumero(entra) || !esNumero(sale) || entra < 0 || sale < 0) {
      // Un fundido infinito no es solo un dato raro: su rampa divide entre infinito y el volumen sale NaN.
      dice(`entra=${t.entra} sale=${t.sale}: los fundidos se cuentan en frames, un número finito de 0 en adelante`);
    } else if (enteros && entra + sale > t.dur) {
      dice(`sus fundidos (${entra} f de entrada + ${sale} f de salida) no caben en sus ${t.dur} f: se pisan y el tramo no llega nunca a su nivel`);
    }

    const g: unknown = t.ganancia;
    // Un solo aviso por envolvente y por motivo: la de una música trae decenas de puntos.
    let minimo = Infinity;
    let maximo = -Infinity;
    let finita = true;
    if (typeof g === "number") {
      finita = Number.isFinite(g);
      minimo = maximo = g;
    } else if (Array.isArray(g)) {
      if (g.length === 0) dice("envolvente de ganancia vacía: no dice ningún nivel (para «tal cual», quita `ganancia`)");
      let creciente = true;
      let pares = true;
      let anterior: number | undefined;
      for (let k = 0; k < g.length; k++) {
        const punto: unknown = g[k];
        if (!Array.isArray(punto) || typeof punto[0] !== "number" || typeof punto[1] !== "number") {
          if (pares) dice(`envolvente: el punto ${k} no es un par [frame, ganancia]; el volumen no se puede calcular y el render se para`);
          pares = false;
          continue;
        }
        const frame: number = punto[0];
        const valor: number = punto[1];
        if (!Number.isFinite(frame) || !Number.isFinite(valor)) finita = false;
        else {
          if (valor < minimo) minimo = valor;
          if (valor > maximo) maximo = valor;
        }
        if (creciente && anterior !== undefined && !(frame > anterior)) {
          creciente = false;
          dice(`envolvente: el punto ${k} (f${frame}) no va después del anterior (f${anterior}); los frames de los puntos tienen que crecer`);
        }
        anterior = frame;
      }
    } else if (g !== undefined) {
      // `null`, un texto, un objeto: `volumenDe` lo tomaría por una envolvente y reventaría en el primer frame.
      dice(`ganancia ${g === null ? "null" : `de tipo ${typeof g}`}: tiene que ser un número o una lista de puntos [frame, ganancia]; el render se para en su primer frame`);
    }
    if (!finita) dice("ganancia que no es un número: Remotion rechaza un volumen NaN o infinito y el render se para");
    if (minimo < 0) dice(`ganancia ${minimo}: no puede ser negativa (para invertir la fase no es aquí; para silenciar, 0)`);
    if (maximo > GANANCIA_MAXIMA && maximo !== Infinity) {
      dice(`ganancia ${Number(maximo.toFixed(3))} (${enDb(maximo)}): pasa de ${GANANCIA_MAXIMA} (${enDb(GANANCIA_MAXIMA)}); eso ya no es igualar un nivel, es fabricarlo, y sube el ruido con él`);
    }

    if (typeof t.reason !== "string" || t.reason.trim() === "") dice("`reason` vacío: si no se puede justificar, no suena");
  });
  return avisos;
}
