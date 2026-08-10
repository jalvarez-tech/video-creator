/**
 * @deprecated CAPA V1 — CONGELADA. No escribas planes nuevos contra esto.
 *
 * QUÉ LO SUSTITUYE
 *   `motor/plan/nucleo.ts` (el sustrato: Toma, Nodo, Molde, Ley, validador) más
 *   el dialecto de gráficos que ahora ocupa `graficos/coreografia.ts`. La unidad
 *   dejó de ser «un gráfico» (`GraficoCue`) y pasó a ser la TOMA: un molde con
 *   un árbol de hijos coreografiados entre sí. Ahí desaparecen los tres parches
 *   que este archivo hizo inevitables — `dy` para descolgar un cue debajo de
 *   otro, `zona` como banda compartida donde dos cues se pisan, y una `Jerarquia`
 *   que hacía de etiqueta de validación y de decisión estética a la vez.
 *
 * POR QUÉ SIGUE AQUÍ
 *   Le queda UN consumidor: `motor/demos/graficos-demo.ts`, que alimenta la
 *   composición `GraficosDemo` del Studio a través de `<PistaGraficos>`. Ese demo
 *   es red de seguridad mientras se monta el camino nuevo: si lo migrásemos a la
 *   vez que escribimos el intérprete, perderíamos la única referencia renderizada
 *   contra la que comparar píxeles. Se migra en el PASO 11.
 *
 * CUÁNDO SE BORRA
 *   En cuanto `graficos-demo.ts` esté escrito con el dialecto nuevo (PASO 11), se
 *   borran de un tirón este archivo, `PistaGraficos.tsx` y las tres exportaciones
 *   nominales `gfxV1` / `revisaPlanV1` / `GraficoCue` del barril. Si estás leyendo
 *   esto y `graficos-demo.ts` ya no importa de aquí, el borrado está pendiente:
 *   hazlo.
 *
 * Mientras tanto: NI UNA LÍNEA de este archivo se toca. Es la base de comparación.
 */

import { Barra } from "./Datos";

/**
 * COREOGRAFÍA DE GRÁFICOS COMO DATOS — el tercer plan de la pieza.
 * Guía: manuales/motion-graphics/SKILL.md · manuales/director-video/SKILL.md.
 *
 * El sistema ya declara dos capas en datos y las ejecuta con un intérprete:
 *   cámara → `CameraCue[]` (camara-003.ts) → <CamaraVirtual>
 *   sonido → `SoundCue[]`  (cues-003.ts)   → <PistaSonido>
 * Faltaba la tercera: los GRÁFICOS. Hasta ahora vivían como JSX con frames
 * absolutos incrustados (Motion003.tsx, 781 líneas), donde retrasar una escena
 * 8 frames obliga a tocar decenas de números.
 *
 * Con `GraficoCue[]` el plan es una lista legible que se puede leer, revisar,
 * reordenar y VALIDAR sin abrir un solo componente:
 *   graficos-004.ts  →  <PistaGraficos cues={graficos004} />
 *
 * `reason` es OBLIGATORIO, igual que en cámara y sonido: si no puedes escribir
 * para qué está ese gráfico, la respuesta es no ponerlo (SKILL: "ante la duda,
 * simplifica").
 *
 * CUÁNDO NO USAR ESTO: una escena con una idea visual propia (el mundo líquido
 * del 003, un diagrama a medida) se sigue escribiendo a mano. Esta pista cubre
 * el 80 % que es repetitivo — títulos, cifras, listas, subrayados, remates — y
 * deja el JSX libre para lo que de verdad es único.
 */

/** Gráficos que el intérprete sabe montar (uno por primitiva de la biblioteca). */
export type TipoGrafico =
  | "kicker"
  | "titular"
  | "cifra"
  | "contador"
  | "sello"
  | "lista"
  | "barras"
  | "barra"
  | "subrayado"
  | "rodea"
  | "flecha"
  | "check"
  | "aspa"
  | "particulas"
  | "glitch"
  | "panel";

/**
 * Dónde vive el gráfico. Es una decisión de ENCUADRE, no de estética:
 *   superior → banda alta, por encima de la cara (R08)
 *   inferior → banda de subtítulos; exige scrim para leerse sobre el avatar
 *   centro   → solo cuando el avatar no manda (toma de gráfico) o está reencuadrado
 *   pantalla → capa a pantalla completa (partículas, glitch, atmósfera)
 */
export type ZonaGrafico = "superior" | "inferior" | "centro" | "pantalla";

/**
 * Jerarquía de movimiento (SKILL §jerarquía). El validador la usa para hacer
 * cumplir la regla maestra del sistema: UN SOLO hero a la vez.
 */
export type Jerarquia = "hero" | "apoyo" | "ambiente";

/** Cómo entra. `corte` = sin transición (una decisión válida, no un olvido). */
export type EntradaGrafico = "muelle" | "barrido" | "corte";

export type GraficoCue = {
  id: string;
  tipo: TipoGrafico;
  startFrame: number;
  endFrame: number;
  zona: ZonaGrafico;
  jerarquia: Jerarquia;
  entrada?: EntradaGrafico;
  /** Contenido: texto principal / secundario / lista de líneas. */
  texto?: string;
  texto2?: string;
  lineas?: string[];
  /** Datos: valor final, valor inicial (contador) y series (barras). */
  valor?: number;
  de?: number;
  sufijo?: string;
  prefijo?: string;
  datos?: Barra[];
  /** Forma: color simbólico, tamaño en px y geometría de los trazos. */
  color?: string;
  px?: number;
  ancho?: number;
  alto?: number;
  desde?: [number, number];
  hasta?: [number, number];
  /** Ritmo: frames de la animación de entrada/dibujado. */
  dur?: number;
  /**
   * Ajuste vertical dentro de la zona, en px. Dos cues en la misma zona se
   * superponen (la zona es una banda, no una columna): `dy` es lo que permite
   * colgar un subrayado bajo una cifra sin inventar una zona nueva.
   */
  dy?: number;
  /** Partículas: modo del sistema (`valor` hace de número de partículas). */
  modo?: "estallido" | "ambiente" | "lluvia";
  /**
   * Zona inferior: scrim de legibilidad. Por defecto SÍ — sobre el avatar, un
   * texto sin scrim se pierde en cuanto la ropa o la mano son claras. Ponlo a
   * false solo si el fondo ya es oscuro y plano.
   */
  scrim?: boolean;
  /** Enlaza con un SoundCue de cues.ts (el sonido se sigue declarando allí). */
  soundCueId?: string;
  /** OBLIGATORIO: función narrativa. Sin esto, no va. */
  reason: string;
};

/**
 * Builder breve, como `cam()` y `cue()`.
 *   gfx("g-hook", "titular", [12, 96], { texto: "Tu embudo no vende", zona: "superior" },
 *       "hero", "Fija la promesa mientras el avatar la enuncia")
 */
export function gfx(
  id: string,
  tipo: TipoGrafico,
  ventana: [number, number],
  props: Partial<Omit<GraficoCue, "id" | "tipo" | "startFrame" | "endFrame" | "reason" | "jerarquia">> & {
    zona?: ZonaGrafico;
  },
  jerarquia: Jerarquia,
  reason: string
): GraficoCue {
  return {
    id,
    tipo,
    startFrame: ventana[0],
    endFrame: ventana[1],
    zona: props.zona ?? "superior",
    jerarquia,
    reason,
    ...props,
  };
}

/**
 * Revisa un plan y devuelve los avisos. Lo llama `<PistaGraficos>` (que los
 * vuelca por consola con `avisaDelPlan`), pero su valor real está al ESCRIBIR el
 * plan: por eso también se puede invocar a mano o desde un script.
 *
 * Comprueba las reglas del sistema que un humano se salta cuando va con prisa:
 *   · dos `hero` solapados         → SKILL: un solo protagonista a la vez
 *   · ventana < 12 frames          → medio segundo: nadie lo lee
 *   · `reason` vacío               → si no se justifica, no va
 *   · ids repetidos                → dos cues que se pisan sin darte cuenta
 *   · zona "centro" con hero largo → suele significar gráfico sobre la cara (R08)
 */
export function revisaPlan(cues: GraficoCue[], fps = 25): string[] {
  const avisos: string[] = [];
  const vistos: Record<string, boolean> = {};

  for (const c of cues) {
    if (vistos[c.id]) avisos.push(`[${c.id}] id repetido`);
    vistos[c.id] = true;
    if (!c.reason || c.reason.trim().length < 8) avisos.push(`[${c.id}] sin reason: si no puedes justificarlo, no lo pongas`);
    if (c.endFrame - c.startFrame < Math.round(fps * 0.5))
      avisos.push(`[${c.id}] dura ${c.endFrame - c.startFrame} f (< 0.5 s): no da tiempo a leerlo`);
    if (c.endFrame <= c.startFrame) avisos.push(`[${c.id}] endFrame <= startFrame`);
  }

  const heroes = cues.filter((c) => c.jerarquia === "hero");
  for (let i = 0; i < heroes.length; i++) {
    for (let j = i + 1; j < heroes.length; j++) {
      const a = heroes[i];
      const b = heroes[j];
      if (a.startFrame < b.endFrame && b.startFrame < a.endFrame)
        avisos.push(`[${a.id} × ${b.id}] dos hero solapados (f${b.startFrame}-${Math.min(a.endFrame, b.endFrame)}): un solo protagonista a la vez`);
    }
  }
  return avisos;
}

/** Cues activos en un frame (útil para depurar un plan sin abrir el Studio). */
export const activosEn = (cues: GraficoCue[], frame: number): GraficoCue[] =>
  cues.filter((c) => frame >= c.startFrame && frame < c.endFrame);
