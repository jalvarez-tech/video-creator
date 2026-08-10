/**
 * EL PLAN DE UNA NOTICIA COMO DATOS — la cuarta capa declarativa del sistema.
 * Guía: manuales/video-noticias/SKILL.md
 *
 * El sistema ya declara tres capas en datos y las ejecuta con un intérprete:
 *   cámara   → CameraCue[]   (camara-NNN.ts)   → <CamaraVirtual>
 *   gráficos → GraficoCue[]  (graficos-NNN.ts) → <PistaGraficos>
 *   sonido   → SoundCue[]    (cues-NNN.ts)     → <PistaSonido>
 * Esta es la cuarta:
 *   noticia  → TomaNoticia[] (noticia-NNN.ts)  → <PistaNoticia>
 *
 * Por qué una capa propia y no `GraficoCue`: en el formato noticias el gráfico
 * NO es un overlay sobre un avatar — es la escena entera, y trae consigo su
 * fondo. `GraficoCue` asume una `zona` dentro de un vídeo que ya existe; aquí
 * lo que se declara es la sucesión de TOMAS que forman la pieza completa,
 * incluido de qué color es el mundo en cada una.
 *
 * `reason` es OBLIGATORIO, igual que en las otras tres capas: si no puedes
 * escribir qué hace esa toma por la noticia, la respuesta es quitarla.
 */

/**
 * Los siete beats del formato. El orden importa: es la estructura que retiene.
 *
 *   gancho      Los 3 primeros segundos. Una afirmación que contradice lo que
 *               el espectador cree saber. Sin gancho no hay vídeo.
 *   contexto    Qué está pasando y por qué debería importarle.
 *   conflicto   Las dos fuerzas que chocan. Aquí entra la cronología.
 *   explicacion El mecanismo: cómo funciona realmente la cosa. Es el bloque que
 *               justifica que el vídeo exista y no sea un titular.
 *   datos       Las cifras que sostienen la explicación.
 *   climax      Qué está en juego ahora / qué se rompe.
 *   cierre      Remate + gancho a la siguiente parte (o CTA).
 */
export type BeatNoticia =
  | "gancho"
  | "contexto"
  | "conflicto"
  | "explicacion"
  | "datos"
  | "climax"
  | "cierre";

/**
 * Las nueve tomas del formato. Cada una trae su registro de fondo decidido:
 * las de papel explican, las de cine muestran. No las mezcles en una toma.
 *
 *   PAPEL (explica)                    CINE (muestra)
 *   titular     el mensaje en serif    escenario  metraje/retrato a sangre
 *   prensa      la prueba periodística cierre     negro + una palabra
 *   comparador  A vs B en chips
 *   cronologia  el viaje entre fechas
 *   cifra       el dato como argumento
 *   medidor     lo que sube o baja
 *   retrato     foto enmarcada
 */
export type TipoToma =
  | "titular"
  | "prensa"
  | "comparador"
  | "cronologia"
  | "cifra"
  | "medidor"
  | "retrato"
  | "escenario"
  | "cierre";

/** Registro visual de la toma. Lo deriva `PistaNoticia` del tipo, salvo override. */
export type Registro = "papel" | "cine";

/** Un ítem de comparación (chip con glifo + label). */
export type ItemComparador = {
  label: string;
  /** Clave de `GLIFO` en graficos/Glifos.tsx. */
  glifo: "manos" | "caja" | "balanza" | "rayo" | "casa" | "edificio" | "avion" | "hoja" | "moneda";
  /** false = opción descartada (se apaga a gris). */
  activo?: boolean;
};

/** Un hito de la cronología. El ORDEN del array es la dirección del viaje. */
export type Hito = { año: string; texto: string };

/** Un medidor (slider). `de`→`a` es el recorrido, y el recorrido es el argumento. */
export type Medida = {
  label: string;
  de: number;
  a: number;
  /** Símbolo antepuesto al número: "$", "" … */
  prefijo?: string;
  /** Símbolo pospuesto: "%", "M", "" … */
  sufijo?: string;
  max?: number;
  /**
   * Decimales del número. Por defecto 0 (redondea). Ponlo a 1 cuando el decimal
   * ES el dato: un 11,6 % redondeado a 12 % ya no es la cifra de la fuente.
   */
  decimales?: number;
};

export type TomaNoticia = {
  id: string;
  tipo: TipoToma;
  beat: BeatNoticia;
  startFrame: number;
  endFrame: number;
  /** Override del registro. Por defecto lo decide el tipo. */
  registro?: Registro;

  // ── Contenido textual ──
  /** Antetítulo / sección / medio. Nunca lleva el mensaje. */
  kicker?: string;
  /** El mensaje de la toma. Uno por toma. */
  titular?: string;
  /** La frase de apoyo que explica el titular o la cifra. */
  etiqueta?: string;
  /** Fragmento del titular a resaltar con rotulador (toma `prensa`). */
  resaltar?: string;

  // ── Datos ──
  /** Toma `cifra`: valor final del contador. */
  valor?: number;
  /** Toma `cifra`: valor inicial (por defecto 0). */
  de?: number;
  prefijo?: string;
  sufijo?: string;

  // ── Estructuras ──
  items?: ItemComparador[];
  hitos?: Hito[];
  medidas?: Medida[];

  // ── Media ──
  /**
   * Ruta en `remotion/public/` del clip o imagen (tomas `retrato` y `escenario`).
   * Se resuelve con staticFile(). Sin media, la toma monta su marco vacío — útil
   * para maquetar antes de que el b-roll esté generado.
   */
  media?: string;
  /** El media es vídeo (usa OffthreadVideo) en vez de imagen. */
  esVideo?: boolean;

  // ── Forma ──
  color?: string;
  /** Frames de la animación de entrada / dibujado. */
  dur?: number;
  /** Enlaza con un SoundCue de cues-NNN.ts (el sonido se declara allí). */
  soundCueId?: string;
  /** OBLIGATORIO: qué hace esta toma por la noticia. */
  reason: string;
};

/**
 * Builder breve, hermano de `cam()`, `gfx()` y `cue()`.
 *
 *   toma("t-hook", "titular", "gancho", [0, 90],
 *        { titular: "No es quien crees", kicker: "OpenAI" },
 *        "Contradice la creencia por defecto en los 3 primeros segundos")
 */
export function toma(
  id: string,
  tipo: TipoToma,
  beat: BeatNoticia,
  ventana: [number, number],
  props: Partial<Omit<TomaNoticia, "id" | "tipo" | "beat" | "startFrame" | "endFrame" | "reason">>,
  reason: string
): TomaNoticia {
  return { id, tipo, beat, startFrame: ventana[0], endFrame: ventana[1], reason, ...props };
}

/** Registro por defecto de cada tipo de toma. */
export const REGISTRO_POR_TIPO: Record<TipoToma, Registro> = {
  titular: "papel",
  prensa: "papel",
  comparador: "papel",
  cronologia: "papel",
  cifra: "papel",
  medidor: "papel",
  retrato: "papel",
  escenario: "cine",
  cierre: "cine",
};

/**
 * Revisa un plan y devuelve los avisos. Lo llama `<PistaNoticia>` (que los vuelca
 * por consola con `avisaDelPlan`) y `revisar-plan.mjs` desde la CLI; su valor real
 * está al ESCRIBIR el plan, que es cuando aún se puede decidir otra cosa.
 *
 * Comprueba lo que un humano con prisa se salta en este formato concreto:
 *   · toma < 0.8 s              → a este ritmo nadie lee un titular
 *   · toma > 6 s                → en un short, 6 s sin cambio pierde al 30 %
 *   · huecos o solapes          → el formato es una sucesión, no capas
 *   · `reason` vacío            → si no se justifica, no va
 *   · ids repetidos
 *   · sin beat `gancho` al inicio → el vídeo empieza sin gancho
 *   · más de 3 tomas `cine` seguidas → se pierde el registro editorial
 */
export function revisaNoticia(tomas: TomaNoticia[], fps = 30): string[] {
  const avisos: string[] = [];
  const vistos: Record<string, boolean> = {};
  const orden = [...tomas].sort((a, b) => a.startFrame - b.startFrame);

  for (const t of orden) {
    if (vistos[t.id]) avisos.push(`[${t.id}] id repetido`);
    vistos[t.id] = true;
    if (!t.reason || t.reason.trim().length < 8)
      avisos.push(`[${t.id}] sin reason: si no puedes justificar la toma, quítala`);
    const len = t.endFrame - t.startFrame;
    if (len <= 0) avisos.push(`[${t.id}] endFrame <= startFrame`);
    else if (len < Math.round(fps * 0.8))
      avisos.push(`[${t.id}] dura ${len} f (< 0.8 s): no da tiempo a leer el titular`);
    else if (len > Math.round(fps * 6))
      avisos.push(`[${t.id}] dura ${len} f (> 6 s): en un short, demasiado sin cambio visual`);
    if ((t.tipo === "retrato" || t.tipo === "escenario") && !t.media)
      avisos.push(`[${t.id}] toma ${t.tipo} sin media: montará el marco vacío`);
    // AQUÍ HABÍA una regla sobre `resaltar`: avisaba de que el fragmento no
    // aparecía LITERAL en el titular, porque el rotulador se posicionaba con un
    // `indexOf` que devolvía −1 y no dibujaba nada, en silencio. Se borra porque
    // el fallo ya no puede existir: `compilaNoticia` convierte el `resaltar` en
    // un TROZO dentro del propio titular (`{t: "…", rotulador: true}`) y el
    // texto que se le pasa a `RecortePrensa` sale de ese mismo trozo. La
    // relación pasó de ser una búsqueda a ser estructural, y una regla que
    // vigila un fallo imposible solo enseña a ignorar el validador.
  }

  for (let i = 1; i < orden.length; i++) {
    const prev = orden[i - 1];
    const cur = orden[i];
    if (cur.startFrame > prev.endFrame)
      avisos.push(`[${prev.id} → ${cur.id}] hueco de ${cur.startFrame - prev.endFrame} f: el formato no tiene huecos`);
    if (cur.startFrame < prev.endFrame)
      avisos.push(`[${prev.id} × ${cur.id}] solape de ${prev.endFrame - cur.startFrame} f: las tomas se suceden, no se apilan`);
  }

  if (orden.length && orden[0].beat !== "gancho")
    avisos.push(`[${orden[0].id}] la primera toma no es beat "gancho": el vídeo empieza sin gancho`);

  let seguidasCine = 0;
  for (const t of orden) {
    const reg = t.registro ?? REGISTRO_POR_TIPO[t.tipo];
    seguidasCine = reg === "cine" ? seguidasCine + 1 : 0;
    if (seguidasCine === 4)
      avisos.push(`[${t.id}] 4 tomas "cine" seguidas: se pierde el registro editorial, intercala papel`);
  }

  return avisos;
}

/** Duración total del plan en frames (para `durationInFrames` de la Composition). */
export const duracionPlan = (tomas: TomaNoticia[]): number =>
  tomas.reduce((max, t) => Math.max(max, t.endFrame), 0);

/** Toma activa en un frame (para depurar un plan sin abrir el Studio). */
export const tomaEn = (tomas: TomaNoticia[], frame: number): TomaNoticia | undefined =>
  tomas.find((t) => frame >= t.startFrame && frame < t.endFrame);
