/**
 * LA TOMA COMO DATOS — el sustrato de las capas declarativas del motor.
 *
 * El sistema tenía dos capas GEMELAS y una estaba muerta:
 *   gráficos → GraficoCue[]  → <PistaGraficos>   (0 usos en proyectos/)
 *   noticia  → TomaNoticia[] → <PistaNoticia>    (004 y 005: las mejores piezas)
 *
 * El diagnóstico no fue «a GraficoCue le faltan campos», fue «el cue es más
 * pequeño que la unidad real de trabajo». En las piezas de verdad no existe
 * «un gráfico»: existe una TOMA de 3-5 elementos coreografiados entre sí. Por
 * eso `TomaNoticia` sale bien maquetada sola (trae composición dentro) y
 * `graficos-demo.ts` necesitaba `dy: 310` con dos líneas de comentario.
 *
 * Aquí la unidad es `Toma`: un MOLDE + un ÁRBOL de hijos. Reglas de la casa que
 * este archivo hace cumplir por construcción:
 *   · `reason` va ANTES que `hijos` en la firma de `gfx()`: el compilador no te
 *     deja escribir el cuerpo de una toma sin haber escrito para qué existe.
 *   · No hay `dy`, ni `zona`, ni `top`, ni `estilo`. La única coordenada del
 *     sistema es `xy` dentro de un grupo `diagrama`.
 *   · El ORDEN del array ES el z-order. No hay zIndex en ningún sitio.
 *   · Determinismo: ni Date.now, ni Math.random sin sembrar, ni timers.
 *   · ES2015 A MANO, PORQUE EL COMPILADOR NO LO COMPRUEBA. El tsconfig dice
 *     `lib: ["es2015"]`, pero `@types/node` entra solo (no hay `"types"`) y su
 *     `/// <reference lib="es2020" />` reabre es2016-es2020: hoy `includes`,
 *     `flat`, `Object.entries` y `padStart` COMPILAN aquí (`plan.ts:221` y dos
 *     `padStart` en `Prueba.tsx`/`MotionGraphicsFull.tsx` ya los usan). Así que
 *     esto es disciplina, no red: `indexOf(x) >= 0`, `Object.keys`, y `Set`/`Map`
 *     que sí son es2015. Si algún día se quiere que muerda de verdad, es
 *     `"types": ["web", "react"]` en el tsconfig y arreglar esos tres usos.
 *
 * DATOS PUROS: ni un import en tiempo de ejecución (solo tipos, que desaparecen
 * al compilar), para que un plan se valide con `node` sin montar React ni
 * Remotion. Si te hace falta un color o un easing aquí, te has equivocado de
 * archivo: eso vive en el dialecto.
 *
 * FRAMES. `ventana` va en frames ABSOLUTOS (sale de la transcripción y no se
 * puede recalcular). Todo lo de dentro es LOCAL. Y hay una asimetría
 * deliberada, marcada en los nombres:
 *   `en: number` → relativo a SU PADRE (es un desfase de coreografía)
 *   `en: {tras}` → LOCAL A LA TOMA: «después de A» no depende de dónde cuelgue
 *                  quien lo pide, así que el frame del padre NO se suma
 *   `muere`     → relativo a LA TOMA  (es un beat de la voz)
 *   `conmutaEn` → relativo a LA TOMA  (idem: el giro cae sobre una palabra)
 * El validador comprueba los tres YA RESUELTOS, no los números declarados.
 */

/* ══════════════════════ 1 · TIEMPO ═══════════════════════════════════════ */

/** Ventana en frames ABSOLUTOS. `"fin"` = hasta el final de la composición. */
export type Ventana = readonly [number, number | "fin"];

/**
 * Momento local. La forma `{tras}` existe por un fallo concreto del 003: la
 * etiqueta «Hoy» baja de alfa .95 a .6 en el frame 910 porque es cuando entra
 * el tachón, y ese 910 estaba copiado en dos sitios. `cuando` distingue el
 * ARRANQUE del otro nodo de su aterrizaje: sin eso había que restar a mano la
 * duración de la entrada, que es justo el número que `tras` viene a borrar.
 */
export type Momento = number | { tras: string; mas?: number; cuando?: "empieza" | "acaba" };

export const tras = (id: string, mas = 0, cuando: "empieza" | "acaba" = "acaba"): Momento => ({
  tras: id,
  mas,
  cuando,
});

/* ══════════════════════ 2 · JERARQUÍA Y ROL ══════════════════════════════ */

/** Jerarquía de la TOMA frente a otras tomas. El validador: un solo hero. */
export type Jerarquia = "hero" | "apoyo" | "ambiente";

/**
 * Rol del ELEMENTO dentro de su toma. Deriva tamaño, alfa del color y barra
 * viajera. Va separado de `Jerarquia` a propósito: en el tipo viejo
 * `Contador.punch = jerarquia === "hero"` convertía una etiqueta de VALIDACIÓN
 * en una decisión estética, y no se podía tener un hero sin golpe.
 */
export type Rol = "hero" | "apoyo" | "contexto";

/* ══════════════════════ 3 · LEY DE MOVIMIENTO ════════════════════════════ */

/** Muelles de motion.ts, por NOMBRE de intención. Nunca `damping: 14`. */
export type NombreMuelle =
  | "entrada" | "contador" | "tarjeta" | "cta" | "golpe" | "flip" | "pulso" | "punch" | "tap";

/**
 * Unión DISCRIMINADA y no un enum plano: cada ley tiene sus ajustes, y
 * mezclarlos en un objeto plano fue lo que dejó `dur` significando cinco cosas
 * distintas (dibujado del trazo, count-up, ancho del barrido y paso del stagger
 * de la lista, todo en el mismo campo).
 */
export type Entrada =
  | { como: "ninguna" }
  | { como: "escalon" }
  | { como: "barrido"; dur?: number; barra?: boolean }
  | { como: "extiende"; dur?: number }
  | {
      como: "muelle";
      muelle?: NombreMuelle;
      y?: number;
      x?: number;
      escala?: number;
      desenfoque?: number;
      rampa?: number;
    };

export type NombreLey = Entrada["como"];

/** `Escena.fundido` existía y el intérprete no lo pasaba nunca: todo salía por corte. */
export type Salida = { como: "corte" } | { como: "fundido"; dur?: number };

/**
 * La ley de la PIEZA, declarada una vez. El 003 entra SIEMPRE con barrido duro
 * de 4 f y barra viajera; eso vivía repetido en once componentes y bastaba un
 * descuido para que una escena entrara con spring y la pieza perdiera firma.
 *
 * `escalera` es el stagger POR POSICIÓN: al hijo i sin `en` propio se le da
 * `escalera[i]`. Es el `at={t.kicker ? 4 : 0}` de PistaNoticia generalizado, y
 * por eso borrar una línea del plan RECOMPONE la coreografía sola.
 */
export interface Ley {
  entrada: Entrada;
  salida: Salida;
  escalera: readonly number[];
  /** Entradas vetadas por la pieza. `revisaPlan` las hace cumplir. */
  prohibe?: readonly NombreLey[];
  /** Solo el hero lleva barra viajera: es un canal de jerarquía, no un adorno. */
  barraEnHero?: boolean;
  /**
   * RESERVA DE MAQUETA. Con `true`, un hijo que entra tarde ocupa su sitio desde
   * el arranque de su padre, CONGELADO en su primer frame, en vez de no existir.
   *
   * Sin esto, un bloque centrado se recoloca cada vez que entra un elemento: el
   * titular de una toma editorial con kicker (0), titular (4) y etiqueta (10)
   * daba tres maquetas distintas en los primeros diez frames, y el salto se lee
   * como error de render, no como animación. Es la misma decisión que <Barrido>
   * ya documenta ("el bloque RESERVA su sitio"), subida al intérprete.
   *
   * Va en la LEY y no en el nodo porque es una decisión de FORMATO: el editorial
   * maqueta primero y anima después; los overlays sobre avatar entran y salen
   * uno a uno y ahí reservar sitio para algo que aún no se ve sería mentir sobre
   * la composición. Por defecto, false (lo que hacía el intérprete hasta ahora).
   *
   * OJO: un nodo con `entra: {como:"ninguna"|"escalon"}` no tiene animación que
   * lo esconda, así que bajo `reserva` se ve QUIETO desde el principio. Es
   * correcto para las piezas que se animan por dentro (RecortePrensa, ChipIcono,
   * Medidor, TarjetaFoto: todas nacen a opacidad 0) y es justo lo que NO se
   * quiere para un corte duro.
   */
  reserva?: boolean;
}

const DUR_ENTRADA: Record<NombreLey, number> = {
  ninguna: 0,
  escalon: 1,
  barrido: 4,
  extiende: 6,
  muelle: 8,
};

/**
 * Enumeración EN TIEMPO DE EJECUCIÓN de las leyes de entrada.
 *
 * Sale de `DUR_ENTRADA` y no de una lista escrita a mano: ese `Record<NombreLey,
 * number>` es TOTAL por construcción —una variante nueva de `Entrada` sin su
 * duración no compila—, así que esta lista no puede quedarse corta. La consume
 * el catálogo (`graficos/fichas.ts`), que necesita recorrer las entradas y no
 * solo tipar contra ellas: un tipo no se puede iterar.
 */
export const NOMBRES_ENTRADA = Object.keys(DUR_ENTRADA) as readonly NombreLey[];

export const duracionEntrada = (e: Entrada | undefined, ley: Ley): number => {
  const u = e ?? ley.entrada;
  if (u.como === "barrido") return Math.max(1, Math.round(u.dur ?? DUR_ENTRADA.barrido));
  if (u.como === "extiende") return Math.max(1, Math.round(u.dur ?? DUR_ENTRADA.extiende));
  if (u.como === "muelle") return Math.max(1, Math.round(u.rampa ?? DUR_ENTRADA.muelle));
  return DUR_ENTRADA[u.como];
};

/* ══════════════════════ 4 · ENVOLTURAS ═══════════════════════════════════ */

/**
 * Decoradores aplicables a CUALQUIER nodo. Ocho fichas del catálogo toman
 * `children` y no son contenido sino operadores sobre contenido; antes solo una
 * (glitch) estaba cableada y con el hijo FIJADO a <Titular>.
 *
 * `parpadeo`, `pulso` y `temblor` son tiempo cíclico o acotado, no una ventana:
 * el caret del CTA (9 f on / 9 f off) como cue serían diez cues de nueve frames.
 * `atenua` es el cambio de opacidad DISPARADO por otro nodo (la etiqueta «Hoy»).
 */
export type Envoltura<C extends string> =
  | { env: "latido"; amplitud?: number; periodo?: number }
  | { env: "halo"; tinta?: C; radio?: number; intensidad?: number }
  | { env: "glitch"; en?: number; dur?: number; intensidad?: number }
  | { env: "aberracion"; separacion?: number }
  | { env: "parpadeo"; ciclo: number; a?: number; desde?: "toma" | "nodo" }
  | { env: "pulso"; entre: readonly [number, number]; amplitud?: number }
  | { env: "temblor"; entre: readonly [number, number]; amplitud?: number }
  | { env: "atenua"; a: number; en: Momento };

/** El discriminante, DERIVADO de la unión: el catálogo no reescribe la lista. */
export type ClaveEnvoltura = Envoltura<string>["env"];

/* ══════════════════════ 5 · TEXTO CON PARTES ═════════════════════════════ */

/**
 * Un trozo con estilo propio: la palabra «calificados» del 002 en otro color y
 * el `resaltar` de noticias, que hoy se busca con `indexOf` sobre el titular y
 * falla EN SILENCIO si una tilde no coincide. Aquí la relación es estructural:
 * el fallo deja de poder existir (y con él, su regla del validador).
 */
export interface Trozo<C extends string> {
  t: string;
  tinta?: C;
  /** Rotulador/resalte. El CUÁNDO lo pone la pieza contenedora, no el texto. */
  rotulador?: boolean;
  tachado?: boolean;
  enfasis?: boolean;
}

export type TextoRico<C extends string> = string | readonly (string | Trozo<C>)[];

/** Línea de un titular. Con `en` propio: el remate del 003 entra en 964 y 968. */
export type Linea<C extends string> = TextoRico<C> | { texto: TextoRico<C>; en: number };

export const textoPlano = <C extends string>(t: TextoRico<C>): string =>
  typeof t === "string" ? t : t.map((x) => (typeof x === "string" ? x : x.t)).join("");

/**
 * Los `Trozo` escondidos en las props de una pieza, vengan donde vengan
 * (`texto`, `lineas`, `items[].texto`…).
 *
 * El núcleo NO sabe qué props de qué pieza llevan texto rico: las props son
 * `never` aquí y el registro es del dialecto. Así que se busca por FORMA, y la
 * forma de un trozo es inconfundible en este sustrato: un objeto con un campo
 * `t` de tipo string. Ninguna otra estructura de props lo tiene (`SerieBarra`
 * lleva `etiqueta`/`valor`/`tinta`, `TramoContador` lleva `a`/`dur`/`espera`,
 * `Hito` lleva sus propios nombres), y el que sí lleva `tinta` sin `t` —una
 * barra de una serie— es un color de RELLENO y no de texto, que es justo lo que
 * esta búsqueda no debe tocar.
 *
 * Tope de hondura por seguridad: props → `lineas` → línea → trozo son cuatro
 * niveles, y un plan no anida texto más que eso.
 */
export function recorreTrozos(valor: unknown, fn: (t: Trozo<string>) => void, hondura = 0): void {
  if (hondura > 5 || valor === null || typeof valor !== "object") return;
  if (Array.isArray(valor)) {
    for (const x of valor) recorreTrozos(x, fn, hondura + 1);
    return;
  }
  const o = valor as Record<string, unknown>;
  if (typeof o.t === "string") {
    fn(o as unknown as Trozo<string>);
    return;
  }
  for (const k of Object.keys(o)) recorreTrozos(o[k], fn, hondura + 1);
}

/* ══════════════════════ 6 · REGISTRO DE PIEZAS ═══════════════════════════ */

/**
 * La ficha de una pieza: metadatos del catálogo + lo que necesita el VALIDADOR.
 * Datos puros, sin React. El montador (el JSX) vive en `Montadores<R>`, que es
 * un mapeado TOTAL: una ficha sin su rama NO COMPILA. Esa es la vacuna contra
 * el fallo de v1 —37 anunciadas, 16 servidas, 21 mintiendo en silencio—.
 */
export interface Ficha<P> {
  nombre: string;
  familia: string;
  archivo: string;
  /** Qué es, en una frase (lo que se ve en el contact sheet del Studio). */
  que: string;
  /** Cuándo usarlo — y, cuando importa, cuándo NO. */
  cuando: string;
  /** Variante sugerida de sound/cues.ts. La decisión sonora sigue siendo del skill. */
  sonido?: string;
  /** true = capa de atmósfera: no compite por la maqueta ni cuenta para R08. */
  capa?: boolean;
  /** Alto APROXIMADO en px base 1080. Alarma de humo para R08, no cinta métrica. */
  alto?: (props: P) => number;
  /**
   * Ancho APROXIMADO en px base 1080 de lo MÁS ANCHO QUE NO PUEDE PARTIRSE
   * (R09). Hermana de `alto`, y con la misma convención: sin `ancho` la pieza
   * mide 0 y no dispara nada.
   *
   * «Que no puede partirse» es la parte importante y es lo que la distingue de
   * `alto`. Un párrafo que no cabe a lo ancho NO se corta: baja de línea, y eso
   * es un problema de ALTO que ya vigila R08. Lo que sí se corta es lo que el
   * navegador no puede romper: una línea de un titular con `lineas` (el
   * intérprete le pone `white-space: nowrap` para que el salto declarado
   * signifique algo), una palabra más ancha que su caja, una fila de chips, una
   * caja de ancho fijo. Así que aquí se declara ESO y no el texto entero: medir
   * el párrafo completo llenaría el plan de avisos por algo que se ve bien.
   *
   * Es una ESTIMACIÓN por caracteres y no una medida —medir texto renderizado
   * exige DOM y rompería el determinismo entre renders—, así que cada dialecto
   * la calcula con la tipografía que él mismo monta. Ver `anchoTexto` en
   * `noticias/dialecto.ts` para el margen de error medido.
   */
  ancho?: (props: P) => number;
  /**
   * Coherencia entre campos de la MISMA pieza — la generalización del mejor
   * hallazgo de noticias. Vive AL LADO de la pieza y no en un switch central,
   * para que añadir una primitiva no obligue a tocar el validador.
   */
  revisa?: (props: P) => string[];
  /** Aridad de un contenedor: una tarjeta con una sola cara sale con el dorso en blanco. */
  hijos?: { min?: number; max?: number; porque: string };
}

export type RegistroPiezas = Record<string, Ficha<never>>;

/** Conserva los tipos por clave (un `Record` a secas los aplanaría a `Ficha<never>`). */
export const registro = <R extends Record<string, Ficha<never>>>(r: R): R => r;

export type PropsDe<R extends RegistroPiezas, K extends keyof R> = R[K] extends Ficha<infer P> ? P : never;

/** La «unión de 37» que nadie escribe a mano: se DERIVA del objeto. */
export type ClaveDe<R extends RegistroPiezas> = Extract<keyof R, string>;

/** Contexto que recibe una pieza. No lee el plan: recibe props y contexto. */
export interface CtxPieza<C extends string> {
  /** Frame LOCAL a la pieza (0 = su primer frame). */
  f: number;
  len: number;
  fps: number;
  ancho: number;
  alto: number;
  /** Color semántico ya resuelto contra la paleta de la pieza. */
  tinta: (c: C, a?: number) => string;
  /** El color del nodo, ya resuelto y con el alfa del rol aplicado. */
  color: string;
  rol: Rol;
  /** Tamaño por defecto del rol, ya escalado al formato. */
  px: number;
  escala: number;
  /** El nodo pidió estirarse al ancho del bloque (`alignSelf: stretch`). */
  estira: boolean;
  ley: Ley;
}

export type Montador<P, C extends string, N> = (props: P, ctx: CtxPieza<C>) => N;

export type Montadores<R extends RegistroPiezas, C extends string, N> = {
  [K in ClaveDe<R>]: Montador<PropsDe<R, K>, C, N>;
};

/* ══════════════════════ 7 · EL ÁRBOL ═════════════════════════════════════ */

export type Alineacion = "centro" | "inicio" | "fin" | "base";

/** Contenedor con caja propia: el campo de WhatsApp del CTA, el sello, el panel. */
export interface Piel<C extends string> {
  caja: "sello" | "campo" | "panel";
  tinta?: C;
  ancho?: number | "seguro";
  alto?: number;
  gap?: number;
}

/** Las cajas que sabe montar una piel, derivadas del propio tipo. */
export type CajaPiel = Piel<string>["caja"];

/** Lo que TODO nodo puede declarar, sea hoja o grupo. */
export interface Comun<C extends string> {
  /** Solo hace falta si otro nodo lo referencia (`tras`, `atenua`). */
  id?: string;
  /** Desfase en frames LOCALES respecto de SU PADRE. */
  en?: Momento;
  /** Frame en el que muere, LOCAL A LA TOMA (es un beat de la voz, no un desfase). */
  muere?: Momento;
  /**
   * ASERCIÓN: el frame ABSOLUTO que dice la transcripción. No cambia el render;
   * si el `en` resuelto no cae aquí, `revisaPlan` avisa. Es la red para el error
   * más probable y hoy invisible de toda migración: un `en` anidado que se
   * calcula sobre el padre equivocado y sale dos frames tarde.
   */
  abs?: number;
  entra?: Entrada;
  sale?: Salida;
  envolturas?: readonly Envoltura<C>[];
  rol?: Rol;
  color?: C;
  /**
   * Multiplica al alfa que deriva el `rol`. El 003 usa DIEZ alfas distintas
   * (.95 .9 .85 .82 .72 .6 .5 .38 .3 .13) y tres roles no las cubren. Mismo
   * estatuto que `px`: un ajuste puntual, no una vía para inventar la paleta.
   */
  alfa?: number;
  /** Espacio EXTRA antes de este nodo (el `marginBottom: 22` de la tríada del 003). */
  sep?: number;
  /**
   * Se estira al ancho del BLOQUE que lo contiene (`alignSelf: stretch`). Mata
   * el `ancho: 520` medido a ojo. Para colgar la regla del VERBO y no del
   * bloque entero, mete verbo y regla en su propia columna: el ancho de una
   * columna auto es el de su hijo más ancho.
   */
  estira?: boolean;
  /** Ancla del gesto. `anclasDeSonido()` la emite con el frame ABSOLUTO resuelto. */
  sonido?: { variante: string; reason: string };
}

/** Claves reservadas: en `pon()` van al nodo, no a las props de la pieza. */
const CLAVES_COMUN: Record<string, true> = {
  id: true, en: true, muere: true, abs: true, entra: true, sale: true,
  envolturas: true, rol: true, color: true, alfa: true, sep: true,
  estira: true, sonido: true, dentro: true, xy: true, ancla: true, anclaY: true,
};

export const esClaveComun = (k: string): boolean => CLAVES_COMUN[k] === true;

/**
 * Una pieza del registro con SUS props tipadas. El tipo mapeado indexado genera
 * `{pieza: K, props: PropsDe<K>}` para cada clave y luego los une: escribir
 * `pieza: "contador"` obliga a pasar las props del contador y solo esas.
 */
export type Hoja<R extends RegistroPiezas, C extends string> = {
  [K in ClaveDe<R>]: Comun<C> & {
    pieza: K;
    props: PropsDe<R, K>;
    /** Contenido de un CONTENEDOR con piel (el campo del CTA, las caras 3D). */
    dentro?: readonly Nodo<R, C>[];
  };
}[ClaveDe<R>];

/**
 * Grupos. `pila` superpone en el mismo hueco (el tachón sobre SU texto);
 * `ranura` es el mismo sitio con estados que se turnan —la sustitución dura del
 * 003 (f924, f1037)— y con `conmuta: "volteo"` ES Tarjeta3D: la misma idea de
 * composición con otra ley de transición.
 */
export type Grupo<R extends RegistroPiezas, C extends string> = Comun<C> &
  (
    | {
        eje: "columna" | "fila" | "pila" | "capas";
        /** Un número, o uno por hueco: la S6 del 003 pide 160/420/250. */
        gap?: number | readonly number[];
        alinea?: Alineacion;
        /** Stagger por índice DENTRO del grupo. SUSTITUYE a la escalera, no se suma. */
        paso?: number;
        piel?: Piel<C>;
        hijos: readonly Nodo<R, C>[];
      }
    | {
        eje: "ranura";
        /** Frames LOCALES A LA TOMA (beats de la voz). N estados → N-1 valores. */
        conmutaEn: readonly Momento[];
        conmuta?: "corte" | "volteo";
        piel?: Piel<C>;
        hijos: readonly Nodo<R, C>[];
      }
    | {
        /** El ÚNICO sitio donde existe una coordenada. Solo en moldes que cubren. */
        eje: "diagrama";
        ancho: number;
        alto: number;
        hijos: readonly NodoUbicado<R, C>[];
      }
  );

export type Nodo<R extends RegistroPiezas, C extends string> = Hoja<R, C> | Grupo<R, C>;

/** Los ejes de composición que existen, derivados del propio `Grupo`. */
export type EjeGrupo = Grupo<RegistroPiezas, string>["eje"];

/**
 * Nodo con coordenada. `ancla` evita las seis restas a mano de la S6 del 003
 * (830-20, 1080-20, 250-26…): un círculo se ancla por su CENTRO.
 */
export type NodoUbicado<R extends RegistroPiezas, C extends string> = Nodo<R, C> & {
  xy: readonly [number, number];
  ancla?: "izq" | "centro" | "der";
  anclaY?: "arriba" | "centro" | "abajo";
  /** Caja de ancho fijo centrada en `xy` (las etiquetas de 380 px del eje). */
  ancho?: number;
};

export const esGrupo = <R extends RegistroPiezas, C extends string>(n: Nodo<R, C>): n is Grupo<R, C> =>
  !("pieza" in n);

/** Gap entre el hijo i y el i+1 (soporta el gap por hueco). */
export const gapEntre = (gap: number | readonly number[] | undefined, i: number, porDefecto: number): number => {
  if (gap === undefined) return porDefecto;
  if (typeof gap === "number") return gap;
  return gap.length === 0 ? porDefecto : gap[Math.min(i, gap.length - 1)];
};

/* ══════════════════════ 8 · MOLDES Y AMBIENTE ════════════════════════════ */

/** Fracción del alto REAL de la comp, no px: el mismo plan sirve en 9:16 y 16:9. */
export interface Ancla {
  desde: "arriba" | "abajo" | "centro";
  pct: number;
}

/**
 * Genérico en la tinta (`C`) SOLO por `tinta`, con `string` por defecto para que
 * quien únicamente lee un molde (el intérprete, `scrimDe`) no tenga que arrastrar
 * el parámetro.
 */
export interface Molde<C extends string = string> {
  /** ¿Tapa el vídeo? De aquí salen `tomasQueCubren()` y el desmontaje del avatar. */
  cubre: boolean;
  ancla: Ancla;
  alinea: Alineacion;
  gap: number;
  /** Scrim ACOPLADO: nace con la toma y muere con el texto. Nadie puede olvidarlo. */
  scrim: false | { alto: number; desde: "abajo" | "arriba" };
  /** Nombre de fondo del dialecto ("papel", "cine", "toma"…). El JSX vive en el intérprete. */
  fondo: string | false;
  /**
   * LA TINTA DEL MOLDE: el color de un nodo de este molde que no pide ninguno.
   *
   * OBLIGATORIA, y esa es toda la regla. El molde ya traía el FONDO y no la
   * tinta que se lee sobre él, así que en una toma de fondo negro el plan tenía
   * que escribir `color: "blanco"` en CADA pieza de texto; al olvidarlo, el nodo
   * caía a `dialecto.tintaBase` —que es la tinta del fondo dominante, carbón
   * sobre papel— y el texto salía negro sobre negro. Invisible, y sin un solo
   * aviso: el color resolvía a un hex perfectamente válido. En el 006 no llegó a
   * verse porque su autor lo escribió las once veces que hacían falta y anotó la
   * trampa en el propio fichero de datos; ésa es exactamente la clase de defecto
   * que se paga con memoria hasta el día que falla.
   *
   * Requerida y no opcional a propósito: un molde nuevo NO COMPILA hasta decir
   * sobre qué se lee. Un defecto silencioso es exactamente el fallo que esto
   * viene a cerrar, así que no puede arreglarse con otro defecto silencioso.
   */
  tinta: C;
  vineta: boolean;
  /** Presupuesto de alto en px base 1080 (R08). TODOS los moldes deben tenerlo. */
  altoMax?: number;
  /**
   * Presupuesto de ANCHO en px base 1080 (R09): el ancho ÚTIL de la caja del
   * molde, o sea el de la composición menos los dos márgenes de zona segura
   * (`margenSeguro`, 11 % → 1080 − 2×118 = 844).
   *
   * Hermano de `altoMax` y hasta ahora inexistente: `revisaPlan` medía el bulto
   * vertical contra el presupuesto del molde y NADIE miraba el horizontal, así
   * que un titular a la escala hero se salía del lienzo por los dos lados con el
   * plan diciendo LIMPIO. Es el fallo que destapó el 006 (`n01-sismo`).
   */
  anchoMax?: number;
  /** Punch-in de toma (1 → 1+punch). Es una decisión de FORMATO, no del plan. */
  punch?: number;
  /** Se lee en el aviso cuando algo no cabe. */
  porque: string;
}

export type ModoParticulas = "estallido" | "ambiente" | "lluvia";

/**
 * Ambiente de la toma. Lo pone el MOLDE por defecto; aquí solo se declara lo
 * que se aparta. Declararlo CON la toma es lo que mata la duplicación del 003,
 * donde las ventanas 198-313 / 433-495 / … estaban escritas dos veces.
 */
export interface Ambiente<C extends string> {
  scrim?: false | { alto?: number; desde?: "abajo" | "arriba"; opacidad?: number };
  vineta?: boolean | { intensidad?: number };
  trama?: { tipo: "rejilla" | "puntos"; paso?: number; opacidad?: number; tinta?: C };
  foco?: {
    cx: number;
    cy: number;
    tinta: C;
    fuerza?: number;
    radio?: number;
    pulso?: number;
    /** Cambio duro de color (el ámbar→rojo del frame 258 del 003). Local a la toma. */
    cambiaEn?: { f: number; tinta: C };
  };
  particulas?: {
    modo: ModoParticulas;
    n: number;
    /** Varias tintas: el cue viejo solo daba UNA y salía confeti monocromo. */
    tintas?: readonly C[];
    origen?: readonly [number, number];
    forma?: "circulo" | "cinta";
    en?: number;
    dur?: number;
  };
}

/** Las capas de atmósfera que existen, derivadas del propio `Ambiente`. */
export type ClaveAmbiente = keyof Ambiente<string>;

/* ══════════════════════ 9 · DIALECTO, TOMA Y PLAN ════════════════════════ */

export type Regla<R extends RegistroPiezas, B extends string, M extends string, C extends string> = (
  plan: Plan<R, B, M, C>
) => string[];

/** El vocabulario de una capa sobre el sustrato común. */
export interface Dialecto<R extends RegistroPiezas, B extends string, M extends string, C extends string> {
  nombre: string;
  piezas: R;
  /** Eje narrativo. El vocabulario lo pone el DIALECTO: forzar los siete beats
   *  del short informativo sobre una pieza de avatar solo consigue que el autor
   *  mienta para pasar el validador. */
  beats: readonly B[];
  moldes: Record<M, Molde<C>>;
  paleta: Record<C, string>;
  /**
   * Tintas que MARCAN sobre el texto pero no lo colorean: el amarillo de
   * rotulador del formato editorial es una banda detrás de la palabra, y usado
   * como color de letra sobre papel beige da el peor contraste de la paleta.
   *
   * Estaba escrito en el comentario de la paleta («marca sobre la prueba, no
   * colorea texto») y un comentario no es una regla: en el 006 la frase más
   * crítica de seguridad —«pueden fallar súbitamente sin dar previo aviso»—
   * acabó en amarillo sobre beige, es decir la línea menos legible del cuadro
   * siendo la más importante. Declarado aquí, `revisaPlan` lo hace cumplir en
   * `color` de nodo y en `tinta` de trozo.
   *
   * POR QUÉ AQUÍ Y NO EN EL TIPO. Prohibirlo por construcción exigiría partir
   * `C` en dos parámetros (tintas de texto y tintas de marca) y arrastrarlos por
   * `Comun`, `Trozo`, `Nodo`, `Grupo`, `Toma`, `Plan`, `Dialecto`, `Molde`,
   * `CtxPieza`, `Montadores`, el intérprete y los dos dialectos: cinco genéricos
   * en cada firma del sustrato para vetar un valor en una capa. Y aun así no
   * cubriría el caso real sin duplicar el corte también en `Trozo`, que es
   * justo donde ocurrió. La regla se queda como DATO del dialecto —que es lo que
   * es: una decisión de la paleta editorial, no del sustrato— y el que la hace
   * cumplir es el validador.
   */
  tintasDeMarca?: readonly C[];
  /**
   * La tinta de un nodo que no pide color. El intérprete la necesita porque no
   * puede inventarse un nombre: tenía cableado `paleta["texto"]`, que existe en
   * el dialecto de gráficos y NO en el editorial (tinta/suave/blanco/acento/
   * resalte/papel), así que una capa nueva resolvía a `undefined` y pintaba
   * `color: undefined` — que en CSS es "hereda" y sobre negro es invisible.
   */
  tintaBase: C;
  /** La escala VIAJA en el dialecto: editorial 96/44/28, gráficos 104/46/32. */
  escala: Record<Rol, number>;
  alfaRol: Record<Rol, number>;
  ley: Ley;
  reglas: readonly Regla<R, B, M, C>[];
}

export interface Toma<R extends RegistroPiezas, B extends string, M extends string, C extends string> {
  id: string;
  molde: M;
  beat: B;
  ventana: Ventana;
  jerarquia: Jerarquia;
  /** OBLIGATORIO. Y va antes que `hijos` en el builder. */
  reason: string;
  hijos: readonly Nodo<R, C>[];
  ley?: Partial<Ley>;
  /** Pisa el ancla del molde (hay escenas reales que no están centradas). */
  ancla?: Ancla;
  gap?: number | readonly number[];
  alinea?: Alineacion;
  ambiente?: Ambiente<C>;
  /** Referencia a un SoundCue de cues-NNN.ts. La LEE `revisaMontaje`. */
  sonido?: string;
}

export interface Plan<R extends RegistroPiezas, B extends string, M extends string, C extends string> {
  /** Nombre de la capa en los avisos y en el name de la <Sequence>. */
  capa: string;
  dialecto: Dialecto<R, B, M, C>;
  formato: { ancho: number; alto: number; fps: number; duracion: number };
  /** Override de paleta del proyecto (el 002 descartó MG entera; es legítimo). */
  paleta?: Partial<Record<C, string>>;
  tomas: readonly Toma<R, B, M, C>[];
}

export const ventanaAbs = (v: Ventana, duracion: number): [number, number] => [
  v[0],
  v[1] === "fin" ? duracion : v[1],
];

/* ══════════════════════ 10 · RECORRIDO Y TIEMPOS ═════════════════════════ */

export interface Visita<R extends RegistroPiezas, C extends string> {
  nodo: Nodo<R, C>;
  padre?: Nodo<R, C>;
  indice: number;
  ruta: string;
  hondura: number;
}

/** Recorre el árbol en orden de declaración (= orden de z). */
export function recorre<R extends RegistroPiezas, C extends string>(
  nodos: readonly Nodo<R, C>[],
  ruta: string,
  fn: (v: Visita<R, C>) => void,
  padre?: Nodo<R, C>,
  hondura = 0
): void {
  nodos.forEach((nodo, indice) => {
    const r = `${ruta}/${indice}`;
    fn({ nodo, padre, indice, ruta: r, hondura });
    if (esGrupo(nodo)) recorre(nodo.hijos, r, fn, nodo, hondura + 1);
    else if (nodo.dentro) recorre(nodo.dentro, r, fn, nodo, hondura + 1);
  });
}

export interface Momentos<R extends RegistroPiezas, C extends string> {
  /** Frame LOCAL A LA TOMA en que entra cada nodo. */
  porNodo: Map<Nodo<R, C>, number>;
  /** Frame LOCAL A LA TOMA en que muere (o el fin de la toma). */
  finPorNodo: Map<Nodo<R, C>, number>;
  porId: Map<string, number>;
  entradoPorId: Map<string, number>;
  sinResolver: string[];
  avisos: string[];
}

/**
 * Convierte el árbol en frames locales. Tres reglas y ninguna más:
 *   `en: number`   → desfase sobre el frame de su contenedor
 *   `en: {tras}`   → cuando el otro entra («empieza») o aterriza («acaba»)
 *   sin `en`       → `paso` del grupo si lo hay; si no, `escalera[posición]`
 *
 * OJO: `paso` SUSTITUYE a la escalera, no se suma. Sumándolos, los dos chips
 * del 005 salían en +8/+18 donde `PistaNoticia` los pone en +8/+14, y nadie lo
 * vería hasta comparar renders.
 *
 * Iterativo con tope de pasadas: un ciclo de `{tras}` da un AVISO, no cuelga el
 * render. La comparten validador e intérprete A PROPÓSITO: cuando la ventana de
 * una toma estaba escrita en dos sitios, la pieza se desincronizó sola.
 */
export function resuelveMomentos<R extends RegistroPiezas, B extends string, M extends string, C extends string>(
  toma: Toma<R, B, M, C>,
  ley: Ley,
  len: number
): Momentos<R, C> {
  const escalera = ley.escalera.length > 0 ? ley.escalera : [0];
  const visitas: Visita<R, C>[] = [];
  recorre(toma.hijos, toma.id, (v) => visitas.push(v));

  const porNodo = new Map<Nodo<R, C>, number>();
  const finPorNodo = new Map<Nodo<R, C>, number>();
  const porId = new Map<string, number>();
  const entradoPorId = new Map<string, number>();
  const avisos: string[] = [];

  const resuelve = (m: Momento, base: number): number | null => {
    if (typeof m === "number") return base + m;
    const cuando = m.cuando ?? "acaba";
    const ref = cuando === "acaba" ? entradoPorId.get(m.tras) : porId.get(m.tras);
    if (ref === undefined) return null;
    return ref + (m.mas ?? 0);
  };

  const paso = (v: Visita<R, C>): boolean => {
    if (porNodo.has(v.nodo)) return false;
    const base = v.padre ? porNodo.get(v.padre) : 0;
    if (base === undefined) return false;

    const padreRanura = v.padre && esGrupo(v.padre) && v.padre.eje === "ranura" ? v.padre : undefined;
    let en: number;
    if (padreRanura && v.indice > 0) {
      const m = padreRanura.conmutaEn[v.indice - 1];
      if (m === undefined) return false;
      // conmutaEn es LOCAL A LA TOMA (base 0): el giro cae sobre una palabra de
      // la voz, no sobre el arranque del grupo. En el diseño anterior se sumaba
      // al `en` del grupo y el giro del 003 salía 64 frames tarde.
      const r = resuelve(m, 0);
      if (r === null) return false;
      en = r;
    } else if (v.nodo.en !== undefined) {
      const r = resuelve(v.nodo.en, base);
      if (r === null) return false;
      en = r;
    } else if (v.padre && esGrupo(v.padre) && v.padre.eje !== "ranura" && v.padre.eje !== "diagrama" && v.padre.paso !== undefined) {
      en = base + v.indice * v.padre.paso;
    } else {
      en = base + escalera[Math.min(v.indice, escalera.length - 1)];
    }

    porNodo.set(v.nodo, en);
    const dur = duracionEntrada(v.nodo.entra, ley);
    if (v.nodo.id) {
      if (porId.has(v.nodo.id)) avisos.push(`id de nodo repetido: "${v.nodo.id}"`);
      porId.set(v.nodo.id, en);
      entradoPorId.set(v.nodo.id, en + dur);
    }
    return true;
  };

  for (let vuelta = 0; vuelta <= visitas.length; vuelta++) {
    let progreso = false;
    for (const v of visitas) if (paso(v)) progreso = true;
    if (!progreso) break;
  }

  // `porNodo` tiene clave por IDENTIDAD de objeto: un `const sep = pon(...)`
  // reutilizado en dos huecos del árbol resuelve UNA vez y el segundo hereda el
  // frame del primero (con `paso: 30`, el segundo entra 60 f antes de lo escrito
  // y nada lo delata). Se comprueba una sola vez, fuera del punto fijo.
  const rutaPorNodo = new Map<Nodo<R, C>, string>();
  for (const v of visitas) {
    const previa = rutaPorNodo.get(v.nodo);
    if (previa === undefined) rutaPorNodo.set(v.nodo, v.ruta);
    else avisos.push(`${v.ruta} es el MISMO objeto que ${previa}: clónalo o se coreografían como uno solo`);
  }

  for (const v of visitas) {
    const en = porNodo.get(v.nodo);
    if (en === undefined) continue;
    // `muere` es LOCAL A LA TOMA. Sin `muere`, el nodo vive hasta el final.
    const m = v.nodo.muere !== undefined ? resuelve(v.nodo.muere, 0) : null;
    // La MISMA errata en `en` grita ("tras no resuelve") y aquí callaba: un
    // `muere: tras("titutlo")` degradaba a `len` y el elemento se quedaba en
    // pantalla hasta el final de la toma con el validador diciendo LIMPIO.
    if (v.nodo.muere !== undefined && m === null)
      avisos.push(`el "muere" de ${v.ruta} no resuelve: id inexistente o ciclo`);
    finPorNodo.set(v.nodo, m === null ? len : m);
  }

  const sinResolver = visitas.filter((v) => !porNodo.has(v.nodo)).map((v) => v.ruta);
  return { porNodo, finPorNodo, porId, entradoPorId, sinResolver, avisos };
}

/* ══════════════════════ 11 · ALTURA (R08) ════════════════════════════════ */

/**
 * Alto que IMPONE una piel, pase lo que pase con su contenido. Son los mismos
 * números que dibuja `cajaPiel` en el intérprete, y por eso están anotados: si
 * allí cambian, aquí también.
 *
 * Sin esto, un grupo con `piel: {caja:"campo"}` medía lo que midiera su interior
 * —una etiqueta, 53 px— cuando la caja que se dibuja son 108 px fijos. R08 daba
 * un número tranquilizador para un bloque que no cabía, que es peor que no
 * medirlo: el CTA con campo (lo que cierra el 002 y el 003) se salía del cuadro
 * con el plan LIMPIO.
 */
const altoDePiel = <C extends string>(p: Piel<C>, interior: number, hijos: number): number => {
  // `piel.gap` es aire EXTRA sobre la separación que ya monta el grupo, y es lo
  // ÚNICO que la piel añade entre hermanos: `cajaPiel` no emite el `gap` del
  // token (ver su comentario — sumarlo al margen de cada hijo separaba de más).
  // Como es un `gap` CSS de un flex en columna, ocupa (hijos − 1) veces.
  const aire = p.gap ? p.gap * Math.max(0, hijos - 1) : 0;
  if (p.caja === "campo") return Math.max(interior + aire, p.alto ?? 108); // height fija
  if (p.caja === "panel") return Math.max(interior + aire, p.alto ?? 460) + 80; // minHeight + padding 40×2
  return interior + aire + 48; // sello: padding "24px 40px"
};

/** Caja FIJA de <Tarjeta3D>, que es lo que monta el intérprete para una ranura
 *  con `conmuta:"volteo"`. La ranura se estimaba como `max(hijos)` —una línea de
 *  texto, 58 px— y el bloque real son 460. */
const ALTO_VOLTEO = 460;

/**
 * Alto aproximado en px base 1080. Es DELIBERADAMENTE tosco: no mide texto
 * renderizado (eso solo se sabe con DOM). Sirve para una cosa: avisar de que un
 * bloque no cabe en su molde ANTES de invadir la cara, no después de exportar.
 *
 * Tosco no es lo mismo que ciego: lo que el INTÉRPRETE impone (la caja de una
 * piel, la tarjeta de un volteo) no es "texto renderizado" y sí se sabe aquí.
 */
export function alturaEstimada<R extends RegistroPiezas, C extends string>(
  n: Nodo<R, C>,
  piezas: R,
  gapPorDefecto: number
): number {
  if (esGrupo(n)) {
    if (n.eje === "diagrama") return n.alto;
    const conPiel = (x: number): number =>
      "piel" in n && n.piel ? altoDePiel(n.piel, x, n.hijos.length) : x;
    if (n.eje === "ranura" || n.eje === "pila" || n.eje === "capas" || n.eje === "fila") {
      const mayor = n.hijos.reduce((m, h) => Math.max(m, alturaEstimada(h, piezas, gapPorDefecto)), 0);
      return conPiel(n.eje === "ranura" && n.conmuta === "volteo" ? Math.max(mayor, ALTO_VOLTEO) : mayor);
    }
    let total = 0;
    n.hijos.forEach((h, i) => {
      total += alturaEstimada(h, piezas, gapPorDefecto) + (h.sep ?? 0);
      if (i < n.hijos.length - 1) total += gapEntre(n.gap, i, gapPorDefecto);
    });
    return conPiel(total);
  }
  const ficha = piezas[n.pieza] as Ficha<never> | undefined;
  if (!ficha || ficha.capa) return 0;
  const propio = ficha.alto ? ficha.alto(n.props as never) : 0;
  // Una HOJA con `dentro` es un contenedor (el campo del CTA, las caras 3D) y
  // antes medía solo su propia ficha: envolver siete chips en un `campo` sin
  // `alto` los hacía medir 0 px y apagaba R08 en silencio — justo la alarma que
  // protege la cara del avatar. Los grupos no sufrían esto; el agujero era de
  // `Hoja.dentro`.
  const dentro = n.dentro;
  if (!dentro || dentro.length === 0) return propio;
  let interior = 0;
  dentro.forEach((h, i) => {
    interior += alturaEstimada(h, piezas, gapPorDefecto) + (h.sep ?? 0);
    if (i < dentro.length - 1) interior += gapPorDefecto;
  });
  return Math.max(propio, interior);
}

/* ══════════════════════ 11b · ANCHURA (R09) ══════════════════════════════ */

/**
 * ANCHO DE UN TEXTO, ESTIMADO POR CARACTERES. La pieza que le faltaba al
 * validador: sin esto no había forma de saber que un titular se sale del cuadro.
 *
 * POR QUÉ ES UNA ESTIMACIÓN Y NO UNA MEDIDA. Medir texto renderizado exige DOM
 * (`getBoundingClientRect`), y el validador corre también con `node` pelado,
 * dentro de un `useMemo` en cada re-render y sobre un plan que tiene que dar el
 * MISMO resultado en cualquier máquina. Una medida real ataría el aviso a la
 * fuente que tenga instalada quien valide, que es justo lo que `theme-noticias`
 * ya documenta como frágil (`-apple-system` resuelve a San Francisco en macOS y
 * a otra cosa en Linux). Estimar es lo correcto aquí, no lo barato.
 *
 * CÓMO. Cinco cubos de anchura por clase de carácter, en fracción del cuerpo
 * (em), más el `tracking` (que en CSS es px ABSOLUTOS y no escala con el cuerpo,
 * así que se suma por carácter y no se multiplica).
 *
 * DE DÓNDE SALEN LOS NÚMEROS. De medir los avances reales de la geométrica del
 * sistema (San Francisco, la voz del canal) a pesos 500/600/700, y quedarse con
 * el peso 700 —el más ancho de los tres— redondeando hacia arriba dentro de cada
 * cubo. O sea: sesgada a lo ancho por diseño.
 *
 * MARGEN DE ERROR, MEDIDO. Contra 17 líneas reales de las piezas 004, 005 y 006
 * (titulares, cierres, kickers en versalitas y etiquetas) la estimación cae entre
 * el +3 % y el +24 % sobre el ancho real, con la mayoría en torno al +10 %. NUNCA
 * se quedó corta, y ése es el único sesgo aceptable: un aviso de más se ignora,
 * uno de menos publica un titular cortado. El +24 % es el caso de los dígitos
 * («123»), que son más estrechos de lo que este modelo supone; si algún día
 * molesta, el arreglo es un cubo propio para dígitos, no bajar el resto.
 *
 * Lo que NO modela, y hay que saberlo al leer un aviso: kerning entre pares
 * («Ta», «Vo»), ligaduras, y que un `fontWeight` menor aprieta ~5 %. Todo eso
 * juega a favor —el texto real sale más estrecho que la estimación— salvo el
 * kerning positivo, que no existe en esta familia.
 */
const EM_FINA = ".,;:·'ijlíIÍ!¡";
const EM_FINA2 = "/tfr()-\"";
const EM_ANCHA = "wmMW%—";
const EM_ALTA = "ABCDEFGHIJKLMNOPQRSTUVWXYZÁÉÍÓÚÑ0123456789$€«»?¿";

const emDe = (c: string): number => {
  if (c === " ") return 0.2;
  if (EM_FINA.indexOf(c) >= 0) return 0.32;
  if (EM_FINA2.indexOf(c) >= 0) return 0.46;
  if (EM_ANCHA.indexOf(c) >= 0) return 0.9;
  if (EM_ALTA.indexOf(c) >= 0) return 0.7;
  return 0.58;
};

export const anchoTexto = (
  texto: string,
  px: number,
  /** `letterSpacing` en px ABSOLUTOS, tal cual lo declara el theme. */
  tracking = 0,
  /** La pieza monta `text-transform: uppercase` (el kicker): mide la MAYÚSCULA. */
  versalitas = false
): number => {
  const t = versalitas ? texto.toUpperCase() : texto;
  let w = 0;
  for (let i = 0; i < t.length; i++) w += emDe(t.charAt(i)) * px + tracking;
  return Math.max(0, Math.round(w));
};

/**
 * La PALABRA más ancha de un texto que sí puede partirse por sus espacios. Es lo
 * que de verdad no cabe cuando el navegador puede maquetar libre: una frase
 * larga baja de línea (problema de ALTO, R08), pero una palabra más ancha que la
 * caja se sale sí o sí, porque `overflow-wrap` por defecto no la rompe.
 */
export const anchoPalabraMasLarga = (texto: string, px: number, tracking = 0, versalitas = false): number => {
  let max = 0;
  for (const p of texto.split(/\s+/)) max = Math.max(max, anchoTexto(p, px, tracking, versalitas));
  return max;
};

/**
 * Ancho que IMPONE una piel. Mismos números que `cajaPiel` en el intérprete que
 * `altoDePiel`, y por el mismo motivo anotados: si allí cambian, aquí también.
 * `campo` y `sello` son cajas que se ajustan al contenido más su padding
 * horizontal (28×2 y 40×2); `panel` tiene ancho FIJO de 820 si no se declara.
 *
 * `huecos` es (hijos − 1) SOLO cuando la piel viste una fila —en una columna el
 * `gap` no ocupa ancho—, y multiplica al `piel.gap` por lo mismo que en
 * `altoDePiel`: es el único aire que la piel añade entre hermanos.
 */
const anchoDePiel = <C extends string>(p: Piel<C>, interior: number, huecos: number): number => {
  // `"seguro"` es `width: 100%`: se estira al bloque y por definición cabe.
  const pedido = typeof p.ancho === "number" ? p.ancho : 0;
  const aire = p.gap ? p.gap * huecos : 0;
  if (p.caja === "campo") return Math.max(pedido, interior + aire + 56);
  if (p.caja === "panel") return Math.max(pedido || 820, interior + aire + 80);
  return Math.max(pedido, interior + aire + 80); // sello: padding "24px 40px"
};

/**
 * Ancho aproximado en px base 1080 de lo que NO PUEDE PARTIRSE dentro del nodo.
 * Hermana de `alturaEstimada` y con su misma naturaleza: tosca a propósito, y no
 * ciega — lo que impone el INTÉRPRETE (una fila y sus gaps, la caja de una piel,
 * un diagrama) se sabe exactamente aquí.
 *
 * La diferencia con el alto está en cómo se combinan los hijos, y es al revés:
 *   · una FILA suma (sus hijos van uno al lado del otro, con sus gaps y `sep`)
 *   · todo lo demás toma el MÁXIMO (columnas, pilas, capas, ranuras)
 * En un `alto` la fila toma el máximo y la columna suma; por eso no se puede
 * reutilizar la misma función con un parámetro y son dos.
 *
 * Lo que mide cada hoja lo decide su ficha (`Ficha.ancho`), porque el ancho de un
 * texto depende de la tipografía que monta el DIALECTO. Sin `ancho`, mide 0:
 * misma convención que `alto`, para que una pieza nueva no rompa nada mientras
 * no se le calcule.
 */
export function anchuraEstimada<R extends RegistroPiezas, C extends string>(
  n: Nodo<R, C>,
  piezas: R,
  gapPorDefecto: number
): number {
  if (esGrupo(n)) {
    if (n.eje === "diagrama") return n.ancho;
    // En una FILA el `gap` de la piel abre (hijos − 1) huecos horizontales; en
    // cualquier otro eje los hijos se superponen o se apilan y no ocupa ancho.
    const conPiel = (x: number): number =>
      "piel" in n && n.piel
        ? anchoDePiel(n.piel, x, n.eje === "fila" ? Math.max(0, n.hijos.length - 1) : 0)
        : x;
    if (n.eje === "fila") {
      let total = 0;
      n.hijos.forEach((h, i) => {
        // En una fila el `sep` del plan se monta como `marginLeft`, así que
        // ocupa ancho. En una columna es `marginTop` y no ocupa nada.
        total += anchuraEstimada(h, piezas, gapPorDefecto) + (i === 0 ? 0 : h.sep ?? 0);
        if (i < n.hijos.length - 1) total += gapEntre(n.gap, i, gapPorDefecto);
      });
      return conPiel(total);
    }
    return conPiel(n.hijos.reduce((m, h) => Math.max(m, anchuraEstimada(h, piezas, gapPorDefecto)), 0));
  }
  const ficha = piezas[n.pieza] as Ficha<never> | undefined;
  if (!ficha || ficha.capa) return 0;
  const propio = ficha.ancho ? ficha.ancho(n.props as never) : 0;
  const dentro = n.dentro;
  if (!dentro || dentro.length === 0) return propio;
  // `RenderHoja` monta la pieza y su `dentro` en una FILA con gap 18: el
  // contenedor mide la suma, no el máximo (que es lo que sí hace el alto).
  let total = propio;
  for (const h of dentro) total += anchuraEstimada(h, piezas, gapPorDefecto) + 18;
  return total;
}

/* ══════════════════════ 12 · VALIDADOR ═══════════════════════════════════ */

export const solapan = (a1: number, a2: number, b1: number, b2: number): boolean => a1 < b2 && b1 < a2;

/**
 * Revisa un plan. Todo son AVISOS, nunca errores: un plan a medias tiene que
 * poder verse mientras se trabaja en él.
 *
 * Cada regla de aquí es un fallo que YA pasó en una pieza real. Si añades una,
 * escribe cuál en el comentario.
 */
export function revisaPlan<R extends RegistroPiezas, B extends string, M extends string, C extends string>(
  plan: Plan<R, B, M, C>
): string[] {
  const avisos: string[] = [];
  const { dialecto, formato, tomas } = plan;
  const fps = formato.fps;
  const vistos: Record<string, boolean> = {};
  let conPropia = 0;

  // Tintas que marcan y no colorean (`Dialecto.tintasDeMarca`), en forma de
  // consulta. `indexOf` sobre un array de seis daría igual; el mapa es para que
  // la regla no se note en un plan de 40 tomas × 200 nodos.
  const soloMarca: Record<string, true> = {};
  for (const c of dialecto.tintasDeMarca ?? []) soloMarca[c] = true;
  // Un molde no puede DECLARAR como tinta por defecto la que no colorea texto:
  // sería pintar la toma entera con el peor contraste de la paleta.
  for (const k of Object.keys(dialecto.moldes))
    if (soloMarca[(dialecto.moldes as Record<string, Molde<C>>)[k].tinta])
      avisos.push(`[molde ${k}] su tinta por defecto es una tinta de marca: marca sobre el texto, no lo colorea`);

  for (const t of tomas) {
    const [ini, fin] = ventanaAbs(t.ventana, formato.duracion);
    const len = fin - ini;
    const ley: Ley = { ...dialecto.ley, ...t.ley };
    const molde = dialecto.moldes[t.molde];

    if (vistos[t.id]) avisos.push(`[${t.id}] id de toma repetido`);
    vistos[t.id] = true;
    if (!t.reason || t.reason.trim().length < 8)
      avisos.push(`[${t.id}] sin reason: si no puedes justificar la toma, no la pongas`);
    if (len <= 0) avisos.push(`[${t.id}] la ventana termina antes de empezar`);
    else if (len < Math.round(fps * 0.5)) avisos.push(`[${t.id}] dura ${len} f (< 0.5 s): no da tiempo a leerlo`);
    if (fin > formato.duracion)
      avisos.push(`[${t.id}] termina en ${fin} y la comp dura ${formato.duracion}: la toma se corta`);
    if (dialecto.beats.indexOf(t.beat) < 0)
      avisos.push(`[${t.id}] beat "${t.beat}" no existe en el dialecto ${dialecto.nombre}`);
    if (!molde) {
      avisos.push(`[${t.id}] molde "${t.molde}" no existe en el dialecto ${dialecto.nombre}`);
      continue;
    }
    // Sin hijos Y sin ambiente. Una toma de atmósfera (molde "capa": partículas,
    // resplandor, viñeta) no lleva maqueta a propósito y sí dibuja: avisarla
    // obligaba a elegir entre un falso positivo aquí o meterle un hijo que no
    // necesita, que es peor.
    if (t.hijos.length === 0 && !t.ambiente)
      avisos.push(`[${t.id}] toma sin hijos ni ambiente: ocupa tiempo y no dibuja nada`);

    const m = resuelveMomentos(t, ley, len);
    for (const a of m.avisos) avisos.push(`[${t.id}] ${a}`);
    for (const ruta of m.sinResolver)
      avisos.push(`[${ruta}] "tras" no resuelve: id inexistente, referencia adelantada o ciclo`);

    let usaPropia = false;
    recorre(t.hijos, t.id, (v) => {
      const n = v.nodo;
      const en = m.porNodo.get(n);
      const muere = m.finPorNodo.get(n);

      // El validador comprueba lo RESUELTO, no lo declarado. El fallo concreto:
      // una ranura con `conmutaEn: [150]` dentro de un grupo en `en: 64` daba un
      // estado B en el frame local 214 de una toma de 176 y pasaba como limpio.
      if (en !== undefined && en >= len)
        avisos.push(`[${v.ruta}] entra en el frame local ${Math.round(en)} y la toma dura ${len}: no se ve nunca`);
      // `mas` negativo es idiomático ("dos frames antes de que aterrice el
      // titular") y pasarse es fácil: un `from` negativo lo recorta Remotion
      // contra el padre, así que la entrada ya ha terminado cuando la toma se ve
      // y el nodo aparece de golpe, sin animación.
      if (en !== undefined && en < 0)
        avisos.push(`[${v.ruta}] entra en el frame local ${Math.round(en)}: antes del arranque de su toma`);
      if (en !== undefined && muere !== undefined && muere <= en)
        avisos.push(`[${v.ruta}] muere (${muere}) antes de entrar (${Math.round(en)})`);
      // `ventana` va en ABSOLUTOS y `muere` en LOCALES: pegar aquí el frame del
      // guion es el error más previsible del sistema. `en` tiene `abs` como red
      // y `muere` no tenía ninguna. `muere === len` no dispara: es la forma
      // legítima de decir «vive hasta el final».
      if (n.muere !== undefined && muere !== undefined && muere > len)
        avisos.push(
          `[${v.ruta}] muere en el frame local ${Math.round(muere)} y la toma dura ${len}: ¿has pegado un frame absoluto?`
        );
      if (en !== undefined && n.abs !== undefined && Math.abs(ini + en - n.abs) > 0.5)
        avisos.push(
          `[${v.ruta}] declara abs:${n.abs} y el plan lo resuelve en ${Math.round(ini + en)}: revisa el \`en\` de su padre`
        );
      if (n.entra && ley.prohibe && ley.prohibe.indexOf(n.entra.como) >= 0)
        avisos.push(`[${v.ruta}] entrada "${n.entra.como}" prohibida por la ley de la pieza: rompe la firma de movimiento`);
      if (n.estira && v.hondura === 0)
        avisos.push(`[${v.ruta}] estira:true en la raíz de la toma: no hay bloque del que colgar`);
      // El amarillo de rotulador como color de letra. Ver `tintasDeMarca`.
      if (n.color !== undefined && soloMarca[n.color])
        avisos.push(
          `[${v.ruta}] color "${n.color}" marca sobre el texto, no lo colorea: usa \`rotulador: true\` en el trozo, o la tinta de máximo contraste`
        );

      // `xy` fuera de un diagrama: el píxel a ojo entrando por la puerta grande.
      const conXY = n as { xy?: readonly [number, number] };
      const padreDiagrama = v.padre && esGrupo(v.padre) && v.padre.eje === "diagrama";
      if (conXY.xy !== undefined && !padreDiagrama)
        avisos.push(`[${v.ruta}] lleva xy y su padre no es un "diagrama": aquí no se posiciona en píxeles`);

      if (esGrupo(n)) {
        if (n.hijos.length === 0) avisos.push(`[${v.ruta}] grupo vacío`);
        if (n.eje === "diagrama" && !molde.cubre)
          avisos.push(`[${v.ruta}] un diagrama con coordenadas propias solo cabe en un molde que cubra (aquí: "${t.molde}")`);
        if (n.eje === "ranura") {
          if (n.conmutaEn.length !== n.hijos.length - 1)
            avisos.push(
              `[${v.ruta}] ranura con ${n.hijos.length} estados necesita ${n.hijos.length - 1} conmutaciones (hay ${n.conmutaEn.length})`
            );
          if (n.conmuta === "volteo" && n.hijos.length !== 2)
            avisos.push(`[${v.ruta}] un volteo tiene frente y dorso: con otro número de estados no significa nada`);
          // Se validaba la CANTIDAD de conmutaciones pero no su DIRECCIÓN: un
          // `conmutaEn: [150, 100]` hace que el estado 2 entre 50 f antes que el
          // 1, así que la ranura retrocede y el último estado pisa al anterior
          // toda la toma. Con `Momento` en forma `{tras}` el orden ni se lee a
          // ojo: hay que comprobarlo sobre lo RESUELTO.
          let previo = -1;
          let iEstado = 0;
          for (const h of n.hijos) {
            const e = m.porNodo.get(h);
            if (e !== undefined) {
              if (iEstado > 0 && e < previo)
                avisos.push(`[${v.ruta}] el estado ${iEstado} entra en ${e} y el anterior en ${previo}: la ranura retrocede`);
              previo = e;
            }
            iEstado++;
          }
        }
        return;
      }

      const ficha = dialecto.piezas[n.pieza] as Ficha<never> | undefined;
      if (!ficha) {
        avisos.push(`[${v.ruta}] pieza "${String(n.pieza)}" no está en el registro`);
        return;
      }
      if (ficha.familia === "propia") usaPropia = true;
      if (ficha.revisa) for (const a of ficha.revisa(n.props as never)) avisos.push(`[${v.ruta}] ${a}`);
      // La misma regla de la tinta de marca, un nivel más adentro: el 006 no la
      // puso en `color` del nodo sino en `tinta` de un TROZO, que es donde de
      // verdad se escribe «esta frase en amarillo».
      if (dialecto.tintasDeMarca)
        recorreTrozos(n.props, (x) => {
          if (x.tinta !== undefined && soloMarca[x.tinta])
            avisos.push(
              `[${v.ruta}] el trozo "${x.t}" pide tinta "${x.tinta}", que marca sobre el texto y no lo colorea: usa \`rotulador: true\``
            );
        });
      const nHijos = n.dentro ? n.dentro.length : 0;
      if (ficha.hijos) {
        if (nHijos < (ficha.hijos.min ?? 0))
          avisos.push(`[${v.ruta}] "${String(n.pieza)}" necesita ${ficha.hijos.min} nodo(s) dentro y tiene ${nHijos}: ${ficha.hijos.porque}`);
        if (ficha.hijos.max !== undefined && nHijos > ficha.hijos.max)
          avisos.push(`[${v.ruta}] "${String(n.pieza)}" admite ${ficha.hijos.max} nodo(s) dentro y tiene ${nHijos}`);
      } else if (nHijos > 0) {
        avisos.push(`[${v.ruta}] "${String(n.pieza)}" no es un contenedor: lo de "dentro" no se montará`);
      }
    });
    if (usaPropia) conPropia++;

    // R08 por BULTO. Todos los moldes llevan `altoMax`: en el diseño anterior
    // solo lo tenía "franja", que no la usa ni una escena del repo, así que la
    // validación insignia era código muerto.
    if (molde.altoMax !== undefined) {
      let bulto = 0;
      t.hijos.forEach((h, i) => {
        bulto += alturaEstimada(h, dialecto.piezas, molde.gap) + (h.sep ?? 0);
        if (i < t.hijos.length - 1) bulto += gapEntre(t.gap, i, molde.gap);
      });
      if (bulto > molde.altoMax)
        avisos.push(
          `[${t.id}] el bloque mide ~${Math.round(bulto)} px y el molde "${t.molde}" presupuesta ${molde.altoMax} (${molde.porque})`
        );
    }

    // R09 por ANCHO. La hermana que faltaba: R08 medía el bulto vertical y nada
    // miraba el horizontal, así que un titular a la escala hero se comía el
    // margen de zona segura por los dos lados —y en un 9:16 el recorte de la
    // plataforma es impredecible— mientras el plan salía limpio (006,
    // `n01-sismo`).
    //
    // QUÉ MIDE Y QUÉ NO. `anchuraEstimada` es una ESTIMACIÓN por caracteres, y
    // sesgada ALTO a propósito: contra 17 líneas reales de 004/005/006 cae entre
    // +3 % y +24 % sobre el ancho medido en Chrome, y nunca por debajo. Por eso
    // el aviso dice «estimados» y habla de MARGEN SEGURO, no de recorte: en el
    // caso vivo del 006 (`n11-sin-formula`) la estimación da 961 px y la tinta
    // real ocupa 882, que se pasa de los 844 útiles por ~19 px por lado pero
    // sigue a 100 px del borde del lienzo. Prometer «texto cortado» y que el
    // autor lo abra en Chrome y vea que no se corta es cómo se aprende a
    // descontar un validador. El umbral no cambia; solo deja de prometer lo que
    // no sabe.
    //
    // EL PUNCH DEL MOLDE NO SE DESCUENTA, y se probó al revés primero. El
    // intérprete escala el contenido hasta 1+punch al final de la toma, así que
    // la tentación es medir contra `anchoMax / (1 + punch)`. Con eso, los 840 px
    // de `RecortePrensa` —que caben de sobra en los 844 y están PUBLICADOS en el
    // 005— avisaban por 8 px, y con ellos cuatro tomas más. Un 1,5 % muerde el
    // margen de zona segura, no el cuadro: 852 px siguen a 114 px del borde
    // real. Avisar de eso es avisar del margen, y un validador que avisa de lo
    // que está bien es un validador que se apaga.
    if (molde.anchoMax !== undefined) {
      const util = molde.anchoMax;
      // Se culpa al nodo MÁS PEQUEÑO que no cabe: si el aviso lo diera cada
      // ancestro, un titular largo sacaría un aviso por su columna, otro por la
      // toma y otro por sí mismo, y tres mensajes del mismo fallo enseñan a
      // ignorar los tres. Se recorre a mano (y no con `recorre`) porque hay que
      // mirar a los hijos ANTES de decidir si el padre habla.
      const culpa = (n: Nodo<R, C>, ruta: string): void => {
        const w = anchuraEstimada(n, dialecto.piezas, molde.gap);
        if (w <= util) return;
        // Un `diagrama` declara su propio ancho y coloca a sus hijos por `xy`:
        // el culpable es él, y bajar dentro señalaría a un hijo que está donde
        // el plan quiere. Mismo trato que le da R08, que tampoco lo recorre.
        const esDiagrama = esGrupo(n) && n.eje === "diagrama";
        const hijos: readonly Nodo<R, C>[] = esDiagrama ? [] : esGrupo(n) ? n.hijos : n.dentro ?? [];
        let algunHijoCulpable = false;
        hijos.forEach((h, i) => {
          if (anchuraEstimada(h, dialecto.piezas, molde.gap) > util) {
            algunHijoCulpable = true;
            culpa(h, `${ruta}/${i}`);
          }
        });
        if (!algunHijoCulpable)
          avisos.push(
            `[${ruta}] mide ~${Math.round(w)} px ESTIMADOS de ancho (la estimación sesga alto, hasta +24 %) y el molde "${t.molde}" da ${util} útiles: se sale del margen seguro por los dos lados (${molde.porque})`
          );
      };
      t.hijos.forEach((h, i) => culpa(h, `${t.id}/${i}`));
    }

    for (const p of t.ambiente && t.ambiente.particulas ? [t.ambiente.particulas] : [])
      if (t.jerarquia !== "ambiente" && (p.dur ?? len) > fps * 3)
        avisos.push(`[${t.id}] partículas más de 3 s en una toma que no es ambiente: continuo cansa, úsalas en ráfaga`);
  }

  // Un solo hero a la vez: la regla maestra del sistema.
  const heroes = tomas.filter((t) => t.jerarquia === "hero");
  for (let i = 0; i < heroes.length; i++)
    for (let j = i + 1; j < heroes.length; j++) {
      const a = ventanaAbs(heroes[i].ventana, formato.duracion);
      const b = ventanaAbs(heroes[j].ventana, formato.duracion);
      if (solapan(a[0], a[1], b[0], b[1]))
        avisos.push(`[${heroes[i].id} × ${heroes[j].id}] dos hero solapados: un solo protagonista a la vez`);
    }

  // Dos tomas que cubren a la vez = dos fondos opacos y el avatar desmontado dos
  // veces. El corte AL FRAME (433/433, 819/819) es legal y no avisa.
  const cubren = tomas.filter((t) => {
    const mo = dialecto.moldes[t.molde];
    return mo ? mo.cubre : false;
  });
  for (let i = 0; i < cubren.length; i++)
    for (let j = i + 1; j < cubren.length; j++) {
      const a = ventanaAbs(cubren[i].ventana, formato.duracion);
      const b = ventanaAbs(cubren[j].ventana, formato.duracion);
      if (solapan(a[0], a[1], b[0], b[1]))
        avisos.push(`[${cubren[i].id} × ${cubren[j].id}] dos tomas a pantalla completa solapadas`);
    }

  // Dos moldes con SCRIM solapados: el degradado se suma y el tercio inferior se
  // va a negro. Solo aparece cuando el scrim deja el plan y pasa al molde.
  const conScrim = tomas.filter((t) => {
    const mo = dialecto.moldes[t.molde];
    return mo ? mo.scrim !== false && t.ambiente?.scrim !== false : false;
  });
  for (let i = 0; i < conScrim.length; i++)
    for (let j = i + 1; j < conScrim.length; j++) {
      const a = ventanaAbs(conScrim[i].ventana, formato.duracion);
      const b = ventanaAbs(conScrim[j].ventana, formato.duracion);
      if (solapan(a[0], a[1], b[0], b[1]))
        avisos.push(`[${conScrim[i].id} × ${conScrim[j].id}] dos moldes con scrim solapados: el tercio inferior se va a negro`);
    }

  if (tomas.length > 0 && conPropia > tomas.length * 0.5)
    avisos.push(
      `${conPropia} de ${tomas.length} tomas usan piezas propias: sube a la biblioteca las que sirvan para más de una pieza`
    );

  for (const regla of dialecto.reglas) for (const a of regla(plan)) avisos.push(a);
  return avisos;
}

/* ══════════════════════ 13 · DERIVADOS Y VALIDADOR CRUZADO ═══════════════ */

/** La proyección mínima en la que las CUATRO capas se pueden comparar. */
export interface CuePlano {
  capa: string;
  id: string;
  ventana: readonly [number, number];
  jerarquia: Jerarquia;
  beat: string;
  molde: string;
  cubre: boolean;
  sonido?: string;
}

export function aplana<R extends RegistroPiezas, B extends string, M extends string, C extends string>(
  plan: Plan<R, B, M, C>
): CuePlano[] {
  return plan.tomas.map((t) => {
    const mo = plan.dialecto.moldes[t.molde];
    return {
      capa: plan.capa,
      id: t.id,
      ventana: ventanaAbs(t.ventana, plan.formato.duracion),
      jerarquia: t.jerarquia,
      beat: t.beat,
      molde: t.molde,
      cubre: mo ? mo.cubre : false,
      sonido: t.sonido,
    };
  });
}

/**
 * Tramos en que la pantalla está cubierta, con los contiguos FUNDIDOS. Lo
 * consume el ensamblaje para desmontar el avatar. En el 002 esta lista estaba
 * escrita a mano APARTE del plan y su propio comentario documenta que la
 * duplicación dejó al avatar bajo un hueco negro.
 */
export function tomasQueCubren(cues: readonly CuePlano[]): [number, number][] {
  const vs = cues
    .filter((c) => c.cubre)
    .map((c) => [c.ventana[0], c.ventana[1]] as [number, number])
    .sort((a, b) => a[0] - b[0]);
  const out: [number, number][] = [];
  for (const v of vs) {
    const u = out[out.length - 1];
    if (u && v[0] <= u[1]) u[1] = Math.max(u[1], v[1]);
    else out.push([v[0], v[1]]);
  }
  return out;
}

export interface AnclaSonora {
  id: string;
  variante: string;
  frame: number;
  reason: string;
}

/**
 * Anclas de sonido EMITIDAS por el plan gráfico, con el frame ABSOLUTO ya
 * resuelto. `soundCueId` era un campo muerto (el 005 lo rellena en 14 de 16
 * tomas y nadie lo leía). Aquí la dirección se invierte: el frame exacto del
 * gesto lo sabe ESTE plan, y `cues-NNN.ts` lo consume con `cue()`.
 */
export function anclasDeSonido<R extends RegistroPiezas, B extends string, M extends string, C extends string>(
  plan: Plan<R, B, M, C>
): AnclaSonora[] {
  const out: AnclaSonora[] = [];
  for (const t of plan.tomas) {
    const [ini, fin] = ventanaAbs(t.ventana, plan.formato.duracion);
    const ley: Ley = { ...plan.dialecto.ley, ...t.ley };
    const m = resuelveMomentos(t, ley, fin - ini);
    recorre(t.hijos, t.id, ({ nodo, ruta }) => {
      if (!nodo.sonido) return;
      const local = m.porNodo.get(nodo);
      if (local === undefined) return;
      out.push({
        id: nodo.id ?? ruta,
        variante: nodo.sonido.variante,
        frame: Math.round(ini + local),
        reason: nodo.sonido.reason,
      });
    });
  }
  return out.sort((a, b) => a.frame - b.frame);
}

/**
 * Espejo de `CameraPurpose` de motor/camara.ts. NO se importa: el núcleo es
 * datos puros. Si allí se añade un propósito, aquí falla la compilación de
 * `COMPATIBLES` (que es un registro TOTAL) y del adaptador, y hay que decidir si
 * compite o no. Antes era `string` y esa decisión se tomaba sola y en silencio:
 * así fue como `explanation` acabó fuera de la lista blanca disparando en falso.
 */
export type Proposito =
  | "hook"
  | "emphasis"
  | "question"
  | "explanation"
  | "make-space"
  | "transition"
  | "reveal"
  | "cta";

export interface MovimientoPlano {
  id: string;
  startFrame: number;
  endFrame: number;
  purpose: Proposito;
  /** El whoosh del empuje. La cámara era la única capa cuyo enlace de sonido
   *  nadie cruzaba, así que renombrar un cue la dejaba muda en silencio. */
  sonido?: string;
  /** `easing: "spring"` (camara.ts §CameraCue): el muelle IGNORA `endFrame`. */
  muelle?: boolean;
}

/**
 * EL VALIDADOR CRUZADO DEL DIRECTOR — lo que no existía y por eso las capas se
 * contradecían en silencio. Funciona sobre `CuePlano`, así que sirve para
 * gráficos, noticia, y para cualquier capa que se proyecte aquí.
 */
export function revisaMontaje(
  capas: readonly (readonly CuePlano[])[],
  sonidos: readonly { id: string; targetFrame: number }[],
  camara: readonly MovimientoPlano[]
): string[] {
  const avisos: string[] = [];
  const todos: CuePlano[] = [];
  for (const c of capas) for (const x of c) todos.push(x);
  const enFrame = new Map<string, number>();
  for (const s of sonidos) enFrame.set(s.id, s.targetFrame);

  for (const c of todos) {
    if (!c.sonido) continue;
    const f = enFrame.get(c.sonido);
    if (f === undefined) {
      avisos.push(`[${c.capa}:${c.id}] sonido "${c.sonido}" no existe en el plan de sonido`);
      continue;
    }
    // El id correcto con el frame FUERA de la toma es el fallo del
    // recronometrado: cues-NNN.ts documenta que sus targetFrame se mueven a mano
    // con la voz. La regla del id inexistente lleva 38 referencias reales sin
    // disparar una vez; ésta es la que sí puede fallar.
    if (f < c.ventana[0] || f >= c.ventana[1])
      avisos.push(`[${c.capa}:${c.id}] "${c.sonido}" dispara en ${f}, fuera de [${c.ventana[0]},${c.ventana[1]})`);
  }

  for (const mv of camara)
    if (mv.sonido && enFrame.get(mv.sonido) === undefined)
      avisos.push(`[cam:${mv.id}] sonido "${mv.sonido}" no existe en el plan de sonido`);

  const heroes = todos.filter((c) => c.jerarquia === "hero");
  for (let i = 0; i < heroes.length; i++)
    for (let j = i + 1; j < heroes.length; j++) {
      const a = heroes[i];
      const b = heroes[j];
      if (a.capa !== b.capa && solapan(a.ventana[0], a.ventana[1], b.ventana[0], b.ventana[1]))
        avisos.push(`[${a.capa}:${a.id} × ${b.capa}:${b.id}] dos hero de capas distintas a la vez`);
    }

  // Propósitos que NO compiten con un gráfico hero: o hacen sitio, o aterrizan
  // SOBRE él a propósito. Registro TOTAL sobre `Proposito` para que añadir un
  // propósito en camara.ts obligue a pronunciarse aquí. `explanation` y `hook`
  // estaban fuera y disparaban 2 de 2 en falso sobre los dos empujes largos del
  // 003, que camara-003.ts documenta como escritos PARA caer con el sello.
  const COMPATIBLES: Record<Proposito, boolean> = {
    "make-space": true,
    cta: true,
    emphasis: true,
    reveal: true,
    explanation: true,
    hook: true,
    question: false,
    // `@remotion/non-pure-animation` lee cualquier clave llamada `transition`
    // como la propiedad CSS y avisa de parpadeo. Aquí es un propósito de cámara
    // dentro de un objeto de datos: no hay estilo ni animación que valga.
    // eslint-disable-next-line @remotion/non-pure-animation
    transition: false,
  };
  for (const mv of camara) {
    // El muelle ignora endFrame (camara.ts §CameraCue): una ventana nominal de
    // 1 f puede renderizarse durante 30. No se adivina, se dice.
    if (mv.muelle)
      avisos.push(`[cam:${mv.id}] easing "spring": endFrame no marca el final real, este cue no se puede cruzar del todo`);
    if (mv.endFrame <= mv.startFrame) continue;
    for (const c of todos) {
      if (!solapan(c.ventana[0], c.ventana[1], mv.startFrame, mv.endFrame)) continue;
      if (c.cubre)
        avisos.push(`[cam:${mv.id} × ${c.capa}:${c.id}] la cámara se mueve bajo una toma que cubre: no se verá`);
      else if (c.jerarquia === "hero" && !COMPATIBLES[mv.purpose])
        avisos.push(`[cam:${mv.id} × ${c.capa}:${c.id}] movimiento "${mv.purpose}" durante un gráfico hero: compite`);
    }
  }
  return avisos;
}

export const duracionPlan = <R extends RegistroPiezas, B extends string, M extends string, C extends string>(
  plan: Plan<R, B, M, C>
): number => plan.formato.duracion;

/** Tomas activas en un frame (para depurar sin abrir el Studio). */
export const tomasEn = <R extends RegistroPiezas, B extends string, M extends string, C extends string>(
  plan: Plan<R, B, M, C>,
  frame: number
): Toma<R, B, M, C>[] =>
  plan.tomas.filter((t) => {
    const [a, b] = ventanaAbs(t.ventana, plan.formato.duracion);
    return frame >= a && frame < b;
  });

/* ══════════════════════ 14 · BUILDER ═════════════════════════════════════ */

/** Sin parámetro `R`: un grupo no lleva `dentro`, así que no hay nada que colgar
 *  del registro. Declararlo por simetría lo dejaba sin usar y `eslint` lo marca
 *  como ERROR (`noUnusedLocals` NO cubre parámetros de tipo, así que `tsc` decía
 *  verde y `npm run lint` —`eslint src && tsc`— abortaba antes de llegar a él). */
export type OpsGrupo<C extends string> = Comun<C> & {
  gap?: number | readonly number[];
  alinea?: Alineacion;
  paso?: number;
  piel?: Piel<C>;
};

/**
 * Abre una capa: devuelve los builders ya atados a un dialecto. Los cuatro
 * genéricos se pagan UNA vez aquí; el archivo de plan no vuelve a ver ninguno.
 *
 *   const { gfx, pon, col, fila, ranura, plan } = capa(DIALECTO_003, "gfx");
 */
export function capa<R extends RegistroPiezas, B extends string, M extends string, C extends string>(
  dialecto: Dialecto<R, B, M, C>,
  nombre = "gfx"
) {
  /**
   * UNA SOLA BOLSA: props de la pieza y campos comunes juntos. `en` es el número
   * que más se toca al afinar una escena y no puede vivir en un segundo
   * argumento. Precio declarado: los nombres de `CLAVES_COMUN` quedan
   * reservados y una pieza no puede llamar `color` a una prop suya.
   */
  const pon = <K extends ClaveDe<R>>(
    pieza: K,
    todo: PropsDe<R, K> & Comun<C> & { dentro?: readonly Nodo<R, C>[] }
  ): Nodo<R, C> => {
    const props: Record<string, unknown> = {};
    const comun: Record<string, unknown> = {};
    const bolsa = todo as unknown as Record<string, unknown>;
    for (const k of Object.keys(bolsa)) {
      if (esClaveComun(k)) comun[k] = bolsa[k];
      else props[k] = bolsa[k];
    }
    // El ÚNICO cast de la biblioteca: la forma es exacta, pero TS no sabe probar
    // la pertenencia de K a la unión mapeada sin resolverla. Nunca en el plan.
    return { ...comun, pieza, props } as unknown as Nodo<R, C>;
  };

  const col = (hijos: readonly Nodo<R, C>[], o: OpsGrupo<C> = {}): Nodo<R, C> => ({ ...o, eje: "columna", hijos });
  const fila = (hijos: readonly Nodo<R, C>[], o: OpsGrupo<C> = {}): Nodo<R, C> => ({ ...o, eje: "fila", hijos });
  const pila = (hijos: readonly Nodo<R, C>[], o: OpsGrupo<C> = {}): Nodo<R, C> => ({ ...o, eje: "pila", hijos });
  const capas = (hijos: readonly Nodo<R, C>[], o: OpsGrupo<C> = {}): Nodo<R, C> => ({ ...o, eje: "capas", hijos });

  const ranura = (
    conmutaEn: readonly Momento[],
    hijos: readonly Nodo<R, C>[],
    o: Comun<C> & { conmuta?: "corte" | "volteo"; piel?: Piel<C> } = {}
  ): Nodo<R, C> => ({ ...o, eje: "ranura", conmutaEn, hijos });

  const diagrama = (
    medidas: { ancho: number; alto: number },
    hijos: readonly NodoUbicado<R, C>[],
    o: Comun<C> = {}
  ): Nodo<R, C> => ({ ...o, eje: "diagrama", ancho: medidas.ancho, alto: medidas.alto, hijos });

  const ubica = (
    nodo: Nodo<R, C>,
    xy: readonly [number, number],
    o: { ancla?: "izq" | "centro" | "der"; anclaY?: "arriba" | "centro" | "abajo"; ancho?: number } = {}
  ): NodoUbicado<R, C> => ({ ...nodo, xy, ...o });

  /**
   * Una toma. `reason` va ANTES que `hijos`: literalmente no se puede escribir
   * el cuerpo de la escena sin haber escrito para qué existe. Era una nota en un
   * comentario y se saltaba sola; ahora lo fuerza el compilador.
   */
  const gfx = (
    id: string,
    molde: M,
    beat: B,
    ventana: Ventana,
    jerarquia: Jerarquia,
    reason: string,
    hijos: readonly Nodo<R, C>[],
    extra: Omit<Toma<R, B, M, C>, "id" | "molde" | "beat" | "ventana" | "jerarquia" | "reason" | "hijos"> = {}
  ): Toma<R, B, M, C> => ({ id, molde, beat, ventana, jerarquia, reason, hijos, ...extra });

  const plan = (
    formato: { ancho: number; alto: number; fps: number; duracion: number },
    tomas: readonly Toma<R, B, M, C>[],
    paleta?: Partial<Record<C, string>>
  ): Plan<R, B, M, C> => ({ capa: nombre, dialecto, formato, tomas, paleta });

  return { pon, col, fila, pila, capas, ranura, diagrama, ubica, gfx, plan, tras };
}
