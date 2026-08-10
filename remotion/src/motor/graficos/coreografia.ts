// ═══════════════════════════════════════════════════════════════════════════
// EL DIALECTO DE GRÁFICOS: overlays sobre un vídeo que ya existe.
// Hermano de motor/noticias/ (tomas que traen su propio mundo).
// Sigue siendo DATOS: ni un import de React ni de Remotion en tiempo de
// ejecución, para que un plan se valide con `node` sin montar el motor.
//
// Sustituye a `coreografia-v1.ts` (congelado, ver su cabecera). El sustrato
// común vive en `../plan/nucleo`; aquí solo está lo que es PROPIO de esta capa:
// qué colores significan qué, cómo entra el movimiento, dónde se puede poner un
// bloque, qué piezas existen y qué se considera un plan mal escrito.
// ═══════════════════════════════════════════════════════════════════════════

import type { Ficha, Ley, Molde, Nodo, Plan, Regla, Rol, TextoRico } from "../plan/nucleo";
import { alturaEstimada, capa, gapEntre, registro, solapan, textoPlano, ventanaAbs } from "../plan/nucleo";
// `import type` de un .tsx: se borra al compilar, así que no entra ni React ni
// JSX en el bundle de datos. Deriva la clave del banco REAL (`Glifos.tsx`) en
// vez de repetir la lista a mano; escrita a mano ya divergía —el diseño incluía
// un "chat" que el banco nunca llegó a dibujar— y un plan con un glifo
// inexistente compilaría hoy para reventar en el intérprete.
import type { ClaveGlifo } from "./Glifos";

export * from "../plan/nucleo";
export type { ClaveGlifo };

/* ── Paleta semántica ─────────────────────────────────────────────────────
 * El plan pide colores por lo que SIGNIFICAN. Los hex los pone el proyecto
 * (`plan.paleta`), porque el 002 descartó `MG` entera y definió los suyos: la
 * dirección de arte es de la pieza, los significados son del sistema. */
export type Tinta = "marca" | "dato" | "perdida" | "logro" | "neutro" | "texto" | "fondo";
export type TextoG = TextoRico<Tinta>;

export const PALETA_MARCA: Record<Tinta, string> = {
  marca: "#0F766E",
  dato: "#f59e0b",
  perdida: "#ef4444",
  logro: "#34d399",
  neutro: "rgba(148,163,184,0.95)",
  texto: "#FFFFFF",
  fondo: "#0E1015",
};

/* ── Leyes de movimiento ────────────────────────────────────────────────── */

/** Reproduce EXACTAMENTE lo que hace hoy `Entrada` en PistaGraficos.tsx: montar
 *  un plan sin `ley` no cambia ni un frame de lo que ya sale. */
export const LEY_BLANDA: Ley = {
  entrada: { como: "muelle", muelle: "entrada", y: -26, rampa: 8, desenfoque: 8 },
  salida: { como: "corte" },
  escalera: [0, 6, 12, 18],
  barraEnHero: false,
};

/** La ley del 003: barrido duro de 4 f, sin easing, sin fade, sin muelle. La
 *  escalera [0,2,3,7,12] ES el stagger real de sus tarjetas: escritas con esta
 *  ley, las tres no llevan ni un solo `en`. */
export const LEY_SECA: Ley = {
  entrada: { como: "barrido", dur: 4, barra: true },
  salida: { como: "corte" },
  escalera: [0, 2, 3, 7, 12],
  prohibe: ["muelle"],
  barraEnHero: true,
};

/* ── Moldes: el sitio se pide por NOMBRE ────────────────────────────────── */

export type MoldeGrafico = "sello" | "cta" | "franja" | "pantalla" | "capa";

export const MOLDES_GRAFICOS: Record<MoldeGrafico, Molde> = {
  sello: {
    cubre: false,
    ancla: { desde: "arriba", pct: 0.698 }, // 1340/1920 = la banda de subtítulos del 003
    alinea: "centro",
    gap: 14,
    scrim: { alto: 830, desde: "abajo" },
    fondo: false,
    vineta: false,
    altoMax: 500, // 1920 − 1340 menos aire: pasarse saca el texto de cuadro
    porque: "toma sobre el avatar: el bloque cuelga de la banda de subtítulos y crece hacia abajo",
  },
  cta: {
    cubre: false,
    ancla: { desde: "arriba", pct: 0.698 },
    alinea: "centro",
    gap: 14,
    // 880 y no 830: con 830 el borde inferior del campo caía fuera del degradado
    // y se veía flotando sobre la ropa del avatar.
    scrim: { alto: 880, desde: "abajo" },
    fondo: false,
    vineta: false,
    altoMax: 500,
    porque: "igual que sello pero con más scrim: el CTA es más alto que un titular",
  },
  franja: {
    cubre: false,
    ancla: { desde: "arriba", pct: 0.061 },
    alinea: "centro",
    gap: 16,
    scrim: false,
    fondo: false,
    vineta: false,
    altoMax: 340, // R08: más y el bloque se come la cara
    porque: "R08: por encima de la cara. Más de 340 px y el gráfico invade al avatar",
  },
  pantalla: {
    cubre: true,
    ancla: { desde: "centro", pct: 0.5 },
    alinea: "centro",
    gap: 40,
    scrim: false,
    fondo: "toma",
    vineta: true,
    altoMax: 1500,
    porque: "toma de gráfico: el avatar se DESMONTA y el gráfico es la escena entera",
  },
  capa: {
    cubre: false,
    ancla: { desde: "centro", pct: 0.5 },
    alinea: "centro",
    gap: 0,
    scrim: false,
    fondo: false,
    vineta: false,
    // Presupuesto CERO, y no `undefined`. `revisaPlan` solo mide el bulto cuando
    // el molde declara `altoMax`, así que dejarlo sin poner convertía a `capa` en
    // el único molde por el que se colaba un bloque de cualquier tamaño encima de
    // la cara sin que nadie chistara (medido: 1.051 px, cero avisos). Cero es el
    // número honesto: `capa` está anclada al CENTRO y no cubre, o sea que
    // cualquier alto cae justo sobre el avatar. Lo que va aquí es ambiente
    // (partículas, resplandor, viñeta), que no ocupa maqueta y mide 0.
    altoMax: 0,
    porque: "atmósfera a pantalla completa: es ambiente, no maqueta — un bloque con alto ya está sobre la cara",
  },
};

/* ── Beats ──────────────────────────────────────────────────────────────── */

export const BEATS_GRAFICOS = ["gancho", "problema", "prueba", "mecanismo", "giro", "remate", "cta"] as const;
export type BeatGrafico = (typeof BEATS_GRAFICOS)[number];

/* ── Tipos de dato de las piezas ────────────────────────────────────────── */

export type Encaje = "libre" | "unaLinea" | "dosLineas";
export type Punto = readonly [number, number];
export type Marca = "check" | "punto" | "numero" | "aspa";
export type ItemDeLista = { texto: TextoG; estado?: "si" | "no" | "neutro" };
export type SerieBarra = { etiqueta: string; valor: number; tinta?: Tinta };
/** SceneFunnel del 001 es 0→200 (45 f) · meseta (55 f) · 200→3 (22 f): cuatro
 *  keyframes que un par `de`/`a` no expresa, y por eso vivían en un if/else. */
export type TramoContador = { a: number; dur: number } | { espera: number };

const f = <P>(
  nombre: string,
  familia: string,
  archivo: string,
  que: string,
  cuando: string,
  extra: Partial<Ficha<P>> = {}
): Ficha<P> => ({ nombre, familia, archivo, que, cuando, ...extra });

const altoTexto = (px: number, lineas = 1): number => Math.round(px * 1.15 * lineas);

/**
 * EL REGISTRO. La unión de claves se DERIVA (`ClaveDe<typeof PIEZAS>`): nadie
 * escribe `type TipoGrafico = "kicker" | …`. Y `Montadores<R>` es un mapeado
 * TOTAL, así que añadir una entrada aquí ROMPE la compilación del intérprete
 * hasta que se escriba su rama: el catálogo no puede volver a mentir.
 *
 * Las 37 fichas de `fichas.ts` NO son 37 tipos de cue — ese fue el error de v1:
 *   20 son PIEZAS (esto) · 8 son ENVOLTURAS (`Envoltura`) · 5 son leyes de
 *   entrada (`Entrada`) · 7 son AMBIENTE (`Ambiente`) · Escena/Ranura/Columna/
 *   Fila son gramática que ya no se declara porque la garantiza el tipo · y
 *   `Trazo` con `d` libre se queda fuera A PROPÓSITO (un path a mano es dibujo,
 *   no dato: entra por una pieza propia del proyecto).
 */
export const PIEZAS = registro({
  // ── Texto ────────────────────────────────────────────────────────────────
  kicker: f<{ texto: TextoG; px?: number }>("Kicker", "texto", "Texto.tsx",
    "Antetítulo en versalitas.", "Contexto o sección. NUNCA lleva el mensaje.",
    { alto: (p) => altoTexto(p.px ?? 32) }),
  titular: f<{ texto?: TextoG; lineas?: readonly TextoG[]; px?: number; encaje?: Encaje }>(
    "Titular", "texto", "Texto.tsx",
    "El mensaje de la toma. `lineas` = saltos EXPLÍCITOS.",
    "Uno por toma. Un trozo con `tinta` colorea una palabra dentro de la frase.",
    {
      alto: (p) => altoTexto(p.px ?? 92, p.lineas ? p.lineas.length : 1),
      // El `\n` del plan del 005 no se honra (T.titular no lleva pre-line) y la
      // intención se pierde en silencio. Aquí el salto es estructura.
      revisa: (p) => {
        const av: string[] = [];
        if (!p.texto && !p.lineas) av.push("titular sin `texto` ni `lineas`");
        if (p.texto && textoPlano(p.texto).indexOf("\n") >= 0)
          av.push('titular con "\\n" literal: el intérprete no lo honra, usa `lineas: [...]`');
        return av;
      },
    }),
  etiqueta: f<{ texto: TextoG; px?: number }>("Etiqueta", "texto", "Texto.tsx",
    "La frase de apoyo que explica el titular o la cifra.",
    "Debajo del hero. Con rol 'apoyo' hereda el color del hero rebajado, no gris.",
    { alto: (p) => altoTexto(p.px ?? 46) }),
  cifra: f<{ texto?: string; valor?: number; px?: number; prefijo?: string; sufijo?: string; decimales?: number; resplandor?: number }>(
    "Cifra", "texto", "Texto.tsx", "El dato como protagonista, con tabular-nums.",
    "Cuando la magnitud ES el argumento y no hace falta verla subir.",
    {
      alto: (p) => altoTexto(p.px ?? 210),
      revisa: (p) => (p.texto === undefined && p.valor === undefined ? ["cifra sin `texto` ni `valor`: no dibuja nada"] : []),
    }),
  chip: f<{ texto: TextoG; px?: number; activo?: boolean }>("Chip", "texto", "Texto.tsx",
    "Píldora de estado: fondo y borde derivados del color.",
    "Etiquetar (activo/inactivo, antes/después). Inalcanzable en v1.",
    { alto: (p) => altoTexto(p.px ?? 30) + 24 }),
  glifo: f<{ nombre: ClaveGlifo; px?: number }>("Glifo", "texto", "Glifos.tsx",
    "SVG inline del banco, por NOMBRE.", "Dentro de una fila con una etiqueta. El plan nunca lleva el `path`.",
    { alto: (p) => p.px ?? 46 }),
  caret: f<{ ancho?: number; alto?: number }>("Caret", "texto", "Texto.tsx",
    "Barra de cursor de un campo de texto.",
    "Con la envoltura `parpadeo`: es tiempo cíclico, no una ventana. Escrito a mano en 001, 002 y 003.",
    { alto: (p) => p.alto ?? 56 }),

  // ── Dato ─────────────────────────────────────────────────────────────────
  contador: f<{ de?: number; a?: number; tramos?: readonly TramoContador[]; dur?: number; decimales?: number; prefijo?: string; sufijo?: string; px?: number; golpe?: boolean }>(
    "Contador", "dato", "Datos.tsx", "Número que SE FORMA, con golpe opcional al aterrizar.",
    "Cuando ver crecer el número es el argumento. `tramos` para fugas (0→200→meseta→3).",
    {
      alto: (p) => altoTexto(p.px ?? 210),
      revisa: (p) => {
        const av: string[] = [];
        if (p.a === undefined && !p.tramos) av.push("contador sin `a` ni `tramos`");
        if ((p.decimales ?? 0) > 2) av.push("más de 2 decimales en pantalla no se leen");
        return av;
      },
    }),
  barra: f<{ valor: number; dur?: number; ancho?: number; alto?: number; pico?: number }>(
    "BarraProgreso", "dato", "Datos.tsx", "Proporción que crece LINEAL, con umbral opcional.",
    "Lineal a propósito: con easing mentiría sobre la velocidad del proceso.",
    { alto: (p) => (p.alto ?? 18) + 40 }),
  regla: f<{ ancho?: number; alto?: number; dur?: number; gira?: number }>(
    "Regla", "dato", "Datos.tsx", "Línea recta que se extiende mecánicamente.",
    "Subrayado MECÁNICO. Con `estira` toma el ancho del bloque y desaparece el número a ojo. `gira` la convierte en tachón.",
    { alto: (p) => p.alto ?? 4 }),
  lista: f<{ items: readonly ItemDeLista[]; marca?: Marca; paso?: number; px?: number }>(
    "ItemLista", "dato", "Datos.tsx", "Lista con marca y stagger por índice.",
    "Tres puntos como mucho. `marca` ya no está fija a ✓: una lista de errores va con ✗.",
    {
      alto: (p) => altoTexto(p.px ?? 46, p.items.length) + Math.max(0, p.items.length - 1) * 22,
      revisa: (p) => (p.items.length === 0 ? ["lista sin items: ocupa tiempo y no dibuja nada"] : []),
    }),
  barras: f<{ datos: readonly SerieBarra[]; max?: number; dur?: number; paso?: number; alto?: number; ancho?: number; hueco?: number }>(
    "Barras", "dato", "Datos.tsx", "Barras que crecen desde la base con stagger.",
    "Comparar 3-6 valores. `max` COMPARTIDO entre tomas o la comparación miente.",
    {
      alto: (p) => (p.alto ?? 420) + 90,
      revisa: (p) => (p.datos.length === 0 ? ["barras sin datos: montará el marco vacío"] : []),
    }),
  serie: f<{ n: number; activo: number; ancho?: number; alto?: number; hueco?: number; tintas?: readonly Tinta[] }>(
    "SerieBarras", "dato", "Datos.tsx", "Indicador de N pasos con el activo saturado y los demás rebajados.",
    "Cuando la pieza promete N cosas: planta la tríada antes y repítela en cada paso. Aparece en 4 de las 11 escenas del 003.",
    {
      alto: (p) => p.alto ?? 6,
      revisa: (p) => (p.activo >= p.n ? ["`activo` cae fuera de la serie: no se marcará ninguno"] : []),
    }),

  // ── Trazo ────────────────────────────────────────────────────────────────
  subrayado: f<{ ancho?: number; dur?: number; semilla?: string; grosor?: number; amplitud?: number }>(
    "Subrayado", "trazo", "Trazo.tsx", "Línea a mano alzada bajo una palabra.",
    "`semilla` distinta = otro trazo con el mismo gesto (en v1 dos subrayados salían IDÉNTICOS).",
    { alto: (p) => (p.grosor ?? 8) + 12 }),
  rodea: f<{ ancho?: number; alto?: number; dur?: number; semilla?: string; vueltas?: number; grosor?: number }>(
    "Rodea", "trazo", "Trazo.tsx", "Óvalo de rotulador con exceso al cerrar.",
    "Señalar UNA cosa. Más de una por pieza y deja de señalar.",
    { alto: (p) => p.alto ?? 180 }),
  flecha: f<{ de: Punto; a: Punto; curvatura?: number; cabeza?: boolean; dur?: number; grosor?: number }>(
    "Flecha", "trazo", "Trazo.tsx", "Arco de A a B con punta orientada por la tangente.",
    "`curvatura` 0 = causa directa; curva = rodeo. Significan distinto.",
    { alto: (p) => Math.abs(p.a[1] - p.de[1]) + (p.grosor ?? 8) }),
  check: f<{ px?: number; dur?: number; grosor?: number }>("Check", "trazo", "Trazo.tsx",
    "Marca de confirmación en dos tiempos naturales.", "Confirmación. Verde por defecto: el color es información.",
    { alto: (p) => p.px ?? 120 }),
  aspa: f<{ px?: number; dur?: number; grosor?: number; retardo?: number }>("Aspa", "trazo", "Trazo.tsx",
    "Dos trazos cruzados EN SECUENCIA.", "Descarte. El `retardo` es lo que la hace gesto y no icono.",
    { alto: (p) => p.px ?? 120 }),

  // ── Diagrama (solo dentro de un grupo `diagrama`) ─────────────────────────
  nodo: f<{ radio: number; relleno?: boolean; grosor?: number }>("Nodo", "dato", "Datos.tsx",
    "Punto de un eje: hueco = «aquí no pasó nada», relleno = «aquí sí».",
    "En la línea de tiempo del 003. Con `ancla: 'centro'` se coloca por su centro.",
    { alto: (p) => p.radio * 2 }),
  enlace: f<{ largo: number; recorre?: number; guion?: readonly [number, number]; dur?: number; alto?: number }>(
    "Enlace", "dato", "Datos.tsx", "Línea punteada que recorre solo una fracción del camino.",
    "0.38 = «no llegó». El recorrido parcial ES el argumento.",
    { alto: (p) => p.alto ?? 8 }),
});

export type PiezasGraficos = typeof PIEZAS;

/* ── Reglas propias de la capa ──────────────────────────────────────────── */

type ReglaG<R extends PiezasGraficos> = Regla<R, BeatGrafico, MoldeGrafico, Tinta>;

/**
 * Varias gráficas de barras sin `max` común: cada una se autoescala a su máximo
 * y la comparación entre tomas MIENTE. No es una regla de diseño, es de
 * honestidad del dato — y en un canal que cita cifras de norma, no es opcional.
 */
const escalaHonesta: ReglaG<PiezasGraficos> = (plan) => {
  const conBarras: { id: string; max: boolean }[] = [];
  for (const t of plan.tomas) {
    let hay = false;
    let conMax = false;
    const anda = (ns: readonly Nodo<PiezasGraficos, Tinta>[]): void => {
      for (const n of ns) {
        if ("pieza" in n) {
          if (n.pieza === "barras") {
            hay = true;
            if ((n.props as { max?: number }).max !== undefined) conMax = true;
          }
          if (n.dentro) anda(n.dentro);
        } else anda(n.hijos);
      }
    };
    anda(t.hijos);
    if (hay) conBarras.push({ id: t.id, max: conMax });
  }
  if (conBarras.length < 2) return [];
  const sinMax = conBarras.filter((x) => !x.max).map((x) => x.id);
  return sinMax.length > 0
    ? [`[${sinMax.join(", ")}] varias gráficas de barras sin \`max\`: cada una se autoescala y la comparación entre tomas miente`]
    : [];
};

/**
 * Hueco de 1 a 4 frames entre dos tomas que cubren: siempre es un off-by-one y
 * se ve como un parpadeo del avatar en negro. Los huecos GRANDES son guion (en
 * el 001, 468→520 son 52 frames en los que manda el avatar).
 */
const huecosSospechosos: ReglaG<PiezasGraficos> = (plan) => {
  const av: string[] = [];
  const cubren = plan.tomas
    .filter((t) => plan.dialecto.moldes[t.molde] && plan.dialecto.moldes[t.molde].cubre)
    .map((t) => ({ id: t.id, v: ventanaAbs(t.ventana, plan.formato.duracion) }))
    .sort((a, b) => a.v[0] - b.v[0]);
  for (let i = 1; i < cubren.length; i++) {
    const h = cubren[i].v[0] - cubren[i - 1].v[1];
    if (h > 0 && h <= 4)
      av.push(`[${cubren[i - 1].id} → ${cubren[i].id}] hueco de ${h} f entre dos tomas a pantalla completa: parpadeo del avatar`);
  }
  return av;
};

/** La atmósfera acompaña, no cuenta: un hero en molde `capa` casi siempre son
 *  partículas ascendidas a protagonista. */
const ambienteNoEsHero: ReglaG<PiezasGraficos> = (plan) =>
  plan.tomas
    .filter((t) => t.molde === "capa" && t.jerarquia === "hero")
    .map((t) => `[${t.id}] una capa de atmósfera no puede ser "hero"`);

/** Un hero largo en un molde que NO cubre y sin scrim es texto sobre la cara. */
const r08Encuadre: ReglaG<PiezasGraficos> = (plan) => {
  const av: string[] = [];
  for (const t of plan.tomas) {
    const mo = plan.dialecto.moldes[t.molde];
    if (!mo || mo.cubre || mo.scrim !== false || t.jerarquia !== "hero") continue;
    const [a, b] = ventanaAbs(t.ventana, plan.formato.duracion);
    if (b - a >= Math.round(plan.formato.fps * 1.5) && t.molde !== "franja")
      av.push(`[${t.id}] hero ${b - a} f sin scrim ni cobertura: o va a "sello"/"franja", o es una toma "pantalla" (R08)`);
  }
  return av;
};

/* ── El dialecto ────────────────────────────────────────────────────────── */

export const GRAFICOS = {
  nombre: "graficos",
  piezas: PIEZAS,
  beats: BEATS_GRAFICOS,
  moldes: MOLDES_GRAFICOS,
  paleta: PALETA_MARCA,
  // Sobre vídeo oscuro el texto nace BLANCO: es lo que ya hacía el intérprete
  // con su `paleta["texto"]` cableado. Ahora lo dice el dialecto, que es quien
  // puede saberlo (el editorial contesta "tinta", y no tiene ningún "texto").
  tintaBase: "texto" as Tinta,
  // Base 1080 de ancho. El intérprete la escala con `escalaPorAncho()`.
  escala: { hero: 104, apoyo: 46, contexto: 32 } as Record<Rol, number>,
  // La escala del 003, repetida a mano en once escenas: apoyo = el MISMO color
  // del hero rebajado (no gris), contexto = neutro.
  alfaRol: { hero: 1, apoyo: 0.88, contexto: 0.82 } as Record<Rol, number>,
  ley: LEY_BLANDA,
  reglas: [escalaHonesta, huecosSospechosos, ambienteNoEsHero, r08Encuadre] as readonly ReglaG<PiezasGraficos>[],
};

export type DialectoGraficos = typeof GRAFICOS;

/**
 * Un proyecto arranca del dialecto del canal y cambia lo suyo: su ley, su
 * paleta y sus piezas propias. Eso es todo lo que separa al 003 (barrido duro,
 * malla y eje de tiempo) del 002 (muelle, mockups de UI).
 */
export function dialectoDe<R extends PiezasGraficos>(cambios: {
  piezas: R;
  ley?: Ley;
  paleta?: Record<Tinta, string>;
  escala?: Record<Rol, number>;
  reglas?: readonly Regla<R, BeatGrafico, MoldeGrafico, Tinta>[];
}) {
  const base = GRAFICOS.reglas as unknown as readonly Regla<R, BeatGrafico, MoldeGrafico, Tinta>[];
  return {
    nombre: GRAFICOS.nombre,
    piezas: cambios.piezas,
    beats: BEATS_GRAFICOS,
    moldes: MOLDES_GRAFICOS,
    paleta: cambios.paleta ?? PALETA_MARCA,
    tintaBase: GRAFICOS.tintaBase,
    escala: cambios.escala ?? GRAFICOS.escala,
    alfaRol: GRAFICOS.alfaRol,
    ley: cambios.ley ?? GRAFICOS.ley,
    // Las reglas del canal siguen valiendo: un proyecto AÑADE, no quita.
    reglas: base.concat(cambios.reglas ?? []),
  };
}

/** Alto estimado del bloque de una toma (¿me cabe en la franja alta?). */
export const altoDeToma = <R extends PiezasGraficos>(
  plan: Plan<R, BeatGrafico, MoldeGrafico, Tinta>,
  id: string
): number => {
  const t = plan.tomas.filter((x) => x.id === id)[0];
  if (!t) return 0;
  const mo = plan.dialecto.moldes[t.molde];
  let total = 0;
  t.hijos.forEach((h, i) => {
    total += alturaEstimada(h, plan.dialecto.piezas, mo.gap) + (h.sep ?? 0);
    if (i < t.hijos.length - 1) total += gapEntre(t.gap, i, mo.gap);
  });
  return total;
};

/** Reexport explícito para que el barril no tenga que adivinar. */
export { capa, solapan };
