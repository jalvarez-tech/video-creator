// ═══════════════════════════════════════════════════════════════════════════
// EL DIALECTO DE NOTICIAS: tomas que traen su propio mundo.
// Hermano de motor/graficos/coreografia.ts (overlays sobre un vídeo que ya
// existe). El sustrato común vive en `../plan/nucleo`; aquí solo está lo que es
// PROPIO del formato editorial: qué colores significan qué, cómo entra el
// movimiento, en qué dos registros puede estar una toma, qué piezas existen y
// qué se considera una noticia mal escrita.
//
// Sigue siendo DATOS: ni un import de React ni de Remotion en tiempo de
// ejecución, para que un plan se valide con `node` sin montar el motor.
//
// QUÉ NO HACE ESTE ARCHIVO (todavía): no monta JSX (eso será
// `montadores.tsx`) y no traduce `TomaNoticia` (eso será `compilaNoticia`).
// Esto es solo el VOCABULARIO.
//
// Y una diferencia deliberada con `coreografia.ts`: aquí NO hay
// `export * from "../plan/nucleo"`. Este directorio tiene barril propio
// (`index.ts`) y `plan.ts` ya exporta por él nombres que el núcleo también
// tiene (`duracionPlan`, `Toma`/`toma`): reexportar el núcleo desde los dos
// sitios da TS2308 y deja los nombres FUERA del barril. Quien quiera el núcleo
// lo pide donde vive.
// ═══════════════════════════════════════════════════════════════════════════

import type {
  Dialecto,
  Entrada,
  Ficha,
  Ley,
  Molde,
  Plan,
  Regla,
  Rol,
  TextoRico,
  Toma,
} from "../plan/nucleo";
import { capa, registro, textoPlano, ventanaAbs } from "../plan/nucleo";
// `import type` de un .tsx: se borra al compilar, así que no entra ni React ni
// JSX en el bundle de datos. La clave del glifo se DERIVA del banco real
// (`Glifos.tsx`) en vez de repetirla a mano como hace `plan.ts` — esa lista
// escrita a mano es exactamente la que puede divergir del banco sin que nada
// avise.
import type { ClaveGlifo } from "../graficos/Glifos";
// El tipo del beat y la forma del hito los sigue OWNING `plan.ts`: son el
// vocabulario que ya usan `noticia-004.ts` y `noticia-005.ts`, y duplicarlos
// aquí sería crear dos verdades sobre lo mismo el mismo día que se promete una.
import type { BeatNoticia, Hito, TomaNoticia } from "./plan";
import { REGISTRO_POR_TIPO } from "./plan";
import { MARCA, N } from "./theme-noticias";

/* ── Paleta semántica ─────────────────────────────────────────────────────
 * Seis tintas y ni una más. Los hex NO se inventan aquí: salen de
 * `theme-noticias.ts`, que es donde está decidido el look del canal. Este
 * archivo solo les pone NOMBRE SEMÁNTICO para que el plan pida "acento" y no
 * "#FF5500" — que es lo que permite cambiar la marca en un sitio.
 *
 * Por qué estas seis: son las que el formato usa para DECIDIR algo. `hueso`,
 * `linea` o las sombras siguen viviendo en el theme porque son forma de la
 * pieza, no significado del plan: nadie escribe una toma para decir "esto va
 * en el beige de las tarjetas". */
export type TintaNoticia = "tinta" | "suave" | "blanco" | "acento" | "resalte" | "papel";

/** Texto rico del formato: `["El notario ", {t:"no", rotulador:true}, " inscribe"]`. */
export type TextoN = TextoRico<TintaNoticia>;

export const PALETA_NOTICIA: Record<TintaNoticia, string> = {
  /** Texto principal sobre papel. Carbón, nunca #000 (vibra sobre beige). */
  tinta: N.tinta,
  /** Texto de apoyo sobre papel: gris CÁLIDO, no azulado. */
  suave: N.tintaSuave,
  /** Texto sobre negro (registro cine). */
  blanco: N.blanco,
  /** El único color vivo de la pieza. Bordes, chips, subrayados, cifras. */
  acento: MARCA.acento,
  /** Amarillo de rotulador: marca sobre la prueba, no colorea texto. */
  resalte: N.resalte,
  /** El fondo hecho tinta: sirve para calar (un punto de papel sobre naranja). */
  papel: N.papel,
};

/* ── Ley de movimiento ──────────────────────────────────────────────────── */

/**
 * Reproduce EXACTAMENTE lo que hace hoy `<Entra>` en `PistaNoticia.tsx`
 * (muelle `SPRING.contador`, y = 46, rampa de opacidad de 9 f, salida por
 * corte): compilar una noticia sin `ley` no puede mover un frame de lo que ya
 * está publicado, que es el criterio de aceptación del paso 9.
 *
 * OJO AL SIGNO: aquí `y` es POSITIVO y en `LEY_BLANDA` (gráficos) es −26. No es
 * un descuido: en el formato editorial el bloque SUBE y asienta —el gesto de
 * poner algo sobre la mesa—, y en los overlays sobre avatar baja desde arriba.
 * La `y` es la dirección del gesto, y las dos capas gesticulan al revés.
 *
 * La escalera [0, 4, 10, 16] es el stagger real del intérprete actual: el
 * kicker entra en 0, el titular en 4 (`at={t.kicker ? 4 : 0}`) y la etiqueta en
 * 10. Escrita aquí, borrar el kicker de una toma RECOMPONE la coreografía sola
 * en vez de dejar el titular entrando 4 f tarde sin nadie delante.
 */
export const LEY_EDITORIAL: Ley = {
  entrada: { como: "muelle", muelle: "contador", y: 46, rampa: 9 },
  salida: { como: "corte" },
  escalera: [0, 4, 10, 16],
  // El formato no tiene barra viajera: su canal de jerarquía es el TAMAÑO y el
  // registro (papel/cine), no un adorno que se mueve.
  barraEnHero: false,
  // El bloque se maqueta ENTERO en el frame 0 y luego entran sus partes. Es lo
  // que hacía `<Entra at={10}>` sin decirlo (el div existía a opacidad 0 desde
  // el principio) y es lo que impide que el titular de una toma se descuelgue
  // solo mientras el kicker y la etiqueta van llegando. Ver `Ley.reserva`.
  reserva: true,
};

/* ── Moldes: los DOS registros del formato ──────────────────────────────── */

/**
 * Papel = "esto significa". Cine = "esto pasó". La alternancia no es
 * decorativa: es la gramática del formato (theme-noticias.ts). Y son solo dos
 * porque en una noticia el sitio no se negocia: el bloque va centrado y a
 * pantalla completa SIEMPRE. Lo que cambia entre tomas es de qué color es el
 * mundo, no dónde cae el texto.
 */
export type MoldeNoticia = "papel" | "cine";

export const MOLDES_NOTICIA: Record<MoldeNoticia, Molde> = {
  papel: {
    // Los DOS moldes cubren. Es la diferencia de fondo con la capa de gráficos:
    // allí `cubre` es la excepción (el avatar manda) y aquí es la regla (no hay
    // avatar que tapar, la toma ES la escena). De aquí sale `tomasQueCubren()`,
    // que en una noticia devuelve la pieza entera — y eso es correcto.
    cubre: true,
    ancla: { desde: "centro", pct: 0.5 },
    alinea: "centro",
    gap: 34, // el gap por defecto de `Centro` en PistaNoticia.tsx
    scrim: false, // sobre papel claro el texto es tinta: un degradado lo ensuciaría
    fondo: "papel",
    // FondoPapel YA trae su viñeta cálida dentro (radial al 58 %). Pedir otra
    // desde el molde la sumaría y hundiría las esquinas el doble.
    vineta: false,
    // El bloque va CENTRADO en 960 y el carril de subtítulos empieza en 1500
    // (LAYOUT.subtituloY): con más de 1080 px de bulto, la mitad de abajo se
    // mete debajo de los subtítulos y la de arriba se sale por el techo.
    altoMax: 1080,
    // El punch-in vive AQUÍ y no en el intérprete. Estaba cableado en
    // `PistaNoticia.tsx` sin ninguna vía para apagarlo: una toma con un vídeo
    // dentro no puede escalar el vídeo otro 1,5 % encima del suyo, y hoy no
    // había forma de decirlo. Es una decisión de FORMATO (impide que la toma se
    // lea como diapositiva congelada), así que la toma el molde, no el plan.
    punch: 0.015,
    porque: "toma de papel: el gráfico ES la escena, centrada entre el techo y el carril de subtítulos",
  },
  cine: {
    cubre: true,
    ancla: { desde: "centro", pct: 0.5 },
    alinea: "centro",
    gap: 24, // el del `cierre`: sobre negro el bloque respira menos
    // El degradado inferior del `escenario`: sin él, un titular blanco
    // desaparece sobre metraje claro. 1190 = el 62 % de 1920 en el que el
    // gradiente del intérprete viejo llega a transparente.
    //
    // ⚠️ DECLARADO Y HOY APAGADO POR `compilaNoticia`, y las dos mitades de esa
    // frase importan. Se declara porque es lo que el FORMATO quiere. Se apaga
    // porque acoplarlo al molde no funciona en esta capa: el ambiente se pinta
    // SIEMPRE por debajo de los hijos —correcto cuando lo que hay que oscurecer
    // está en otra capa (el avatar), falso cuando el metraje a sangre es un hijo
    // más— y sobre el negro del `cierre` no es invisible como se creyó al
    // escribir esto: `FondoCine` es un foco cenital que llega al 63 % del alto y
    // el degradado se le comería el tercio de abajo. Queda aquí para que el día
    // que exista una pieza `velo` (un scrim colocable en el z-order) o un
    // `ambiente.media`, el molde ya diga qué se busca.
    scrim: { alto: 1190, desde: "abajo" },
    fondo: "cine",
    // FondoCine es un foco cenital sobre negro: la caída a los bordes ya está.
    vineta: false,
    // Sobre negro el texto compite con la imagen, no con el margen: si el
    // bloque pasa de 900 px ya no remata el metraje, lo tapa.
    altoMax: 900,
    punch: 0.015,
    porque: "toma de cine: metraje o remate sobre negro, el texto cuelga del tercio inferior",
  },
};

/* ── Beats ──────────────────────────────────────────────────────────────── */

/**
 * Los siete beats del formato, en ORDEN narrativo (gancho → cierre).
 *
 * El tipo lo sigue owning `plan.ts` y la lista se deriva de un `Record`
 * EXHAUSTIVO: si algún día aparece un octavo beat allí, este archivo deja de
 * compilar hasta que se decida dónde va. Escribir el array a mano habría dejado
 * la puerta abierta a un dialecto que no conoce un beat que el plan sí usa —
 * y el aviso ("beat X no existe en el dialecto") habría culpado al autor.
 * `Object.keys` conserva el orden de inserción para claves de texto.
 */
const TODOS_LOS_BEATS: Record<BeatNoticia, true> = {
  gancho: true,
  contexto: true,
  conflicto: true,
  explicacion: true,
  datos: true,
  climax: true,
  cierre: true,
};

export const BEATS_NOTICIA = Object.keys(TODOS_LOS_BEATS) as readonly BeatNoticia[];

/* ── Registro de piezas ─────────────────────────────────────────────────── */

const f = <P>(
  nombre: string,
  familia: string,
  archivo: string,
  que: string,
  cuando: string,
  extra: Partial<Ficha<P>> = {}
): Ficha<P> => ({ nombre, familia, archivo, que, cuando, ...extra });

const altoTexto = (px: number, lineas = 1): number => Math.round(px * 1.15 * lineas);

/** ¿El número tiene parte decimal que el formateo se va a comer? */
const seRedondea = (v: number | undefined, decimales: number | undefined): boolean =>
  v !== undefined && (decimales ?? 0) === 0 && Math.round(v) !== v;

/**
 * EL REGISTRO EDITORIAL. Nueve piezas, ni una más: es el vocabulario que las
 * dos piezas publicadas (004 y 005) ya usan, escrito como datos.
 *
 * La unión de claves se DERIVA (`ClaveDe<typeof PIEZAS_NOTICIA>`) y
 * `Montadores<R>` es un mapeado TOTAL, así que añadir una entrada aquí ROMPE la
 * compilación de `montadores.tsx` hasta que se escriba su rama. El catálogo no
 * puede volver a anunciar lo que no sirve.
 *
 * Las nueve NO son los nueve `TipoToma` de `plan.ts`, aunque el número
 * coincida: allí un "tipo" es una MAQUETA entera (kicker + recorte + etiqueta)
 * y aquí una pieza es UN elemento. `titular`, `prensa` y `cifra` compartían el
 * mismo kicker y la misma etiqueta copiados tres veces en el switch del
 * intérprete; aquí son la misma pieza puesta en tres composiciones.
 */
export const PIEZAS_NOTICIA = registro({
  // ── Texto ────────────────────────────────────────────────────────────────
  kicker: f<{ texto: TextoN; px?: number }>(
    "Kicker",
    "texto",
    "Editorial.tsx",
    "Antetítulo en versalitas con tracking abierto.",
    "Sección, medio o contexto. NUNCA lleva el mensaje: si se puede leer solo, es un titular.",
    { alto: (p) => altoTexto(p.px ?? 28) }
  ),
  titular: f<{ texto?: TextoN; lineas?: readonly TextoN[]; px?: number }>(
    "Titular",
    "texto",
    "Editorial.tsx",
    "El mensaje de la toma, en display. `lineas` = saltos EXPLÍCITOS.",
    "Uno por toma. Un trozo con `rotulador` lo marca en amarillo; con `tinta`, lo colorea.",
    {
      alto: (p) => altoTexto(p.px ?? 96, p.lineas ? p.lineas.length : 1),
      revisa: (p) => {
        const av: string[] = [];
        if (!p.texto && !p.lineas) av.push("titular sin `texto` ni `lineas`: la toma no dice nada");
        // El bug vivo del 005 (`n16-cierre`): el `\n` del plan no se honraba y
        // la decisión de maqueta se perdía EN SILENCIO. `theme-noticias.ts` ya
        // lo arregló con `pre-line`, pero un salto dentro de un string sigue
        // siendo invisible para `alturaEstimada` —cuenta una línea donde hay
        // dos— y para `pxCierre`. Como estructura, se ve.
        if (p.texto && textoPlano(p.texto).indexOf("\n") >= 0)
          av.push('titular con "\\n" literal: usa `lineas: [...]` o el alto estimado miente');
        return av;
      },
    }
  ),
  etiqueta: f<{ texto: TextoN; px?: number }>(
    "Etiqueta",
    "texto",
    "Editorial.tsx",
    "La frase de apoyo que explica el titular o la cifra.",
    "Debajo del hero. Sobre papel va en `suave`; sobre cine, en `blanco` rebajado.",
    { alto: (p) => altoTexto(p.px ?? 44) }
  ),

  // ── Prueba periodística ──────────────────────────────────────────────────
  recorte: f<{ titular: TextoN; fuente?: string; ancho?: number; rotacion?: number }>(
    "RecortePrensa",
    "prensa",
    "Editorial.tsx",
    "Tarjeta blanca con el titular real del medio y el rotulador que lo marca.",
    "El gesto de veracidad probatoria. `fuente` es quien sostiene la credibilidad: sin ella es una cita anónima.",
    {
      // Padding (34+40) + el bloque de fuente (24 px + 14 de margen) + las
      // líneas del titular a 52 px con lineHeight 1.18. Las líneas se ESTIMAN a
      // ~22 caracteres, que es lo que entra a 52 px en los 840 px de la
      // tarjeta. Estimación, no medida (ver «riesgos» del diseño).
      alto: (p) =>
        74 +
        (p.fuente ? 42 : 0) +
        Math.max(1, Math.ceil(textoPlano(p.titular).length / 22)) * 61,
      revisa: (p) =>
        textoPlano(p.titular).trim().length === 0
          ? ["recorte sin titular: montará una tarjeta en blanco"]
          : [],
    }
  ),

  // ── Comparación ──────────────────────────────────────────────────────────
  chip: f<{ texto: string; glifo: ClaveGlifo; activo?: boolean; tam?: number }>(
    "ChipIcono",
    "comparador",
    "Editorial.tsx",
    "Cuadrado glossy naranja con un glifo y su label debajo.",
    "SIEMPRE en pareja o trío: un chip solo no compara nada y entonces lo que querías era una etiqueta. `activo:false` lo apaga a gris.",
    {
      alto: (p) => (p.tam ?? 150) + 18 + Math.round((p.tam ?? 150) * 0.19 * 1.15),
      revisa: (p) => {
        const av: string[] = [];
        if (p.texto.trim().length === 0) av.push("chip sin texto: un icono suelto no etiqueta nada");
        // El label va DEBAJO de un cuadrado de 150 px, en una fila con 90 px de
        // gap entre chips. Con más de dos palabras el texto es más ancho que su
        // propio chip: o parte en dos líneas y descuadra la fila, o empuja a los
        // vecinos. Un chip es una ETIQUETA, no una frase.
        if (p.texto.trim().split(/\s+/).length > 2)
          av.push(`chip "${p.texto}" con más de dos palabras: el label es más ancho que su chip y descuadra la fila`);
        return av;
      },
    }
  ),

  // ── Dato ─────────────────────────────────────────────────────────────────
  cifra: f<{
    valor: number;
    de?: number;
    prefijo?: string;
    sufijo?: string;
    decimales?: number;
    dur?: number;
    px?: number;
    golpe?: boolean;
  }>(
    "CifraContada",
    "dato",
    "Editorial.tsx",
    "El dato como protagonista: el número SE FORMA de `de` a `valor`.",
    "Cuando el RECORRIDO es el argumento. Si solo importa la magnitud, `de` y `valor` iguales.",
    {
      // T.cifra tiene lineHeight 1: el alto es el cuerpo, sin interlínea.
      alto: (p) => p.px ?? 220,
      revisa: (p) => {
        const av: string[] = [];
        // El fallo REAL del 004: `n09-suelo` declara `valor: 6.7` y el
        // intérprete lo pinta con `decimales` a 0, así que en pantalla sale un
        // 7. La cifra de la fuente era 6,7 y el vídeo publicado dice otra cosa.
        // No era negligencia del autor: `TomaNoticia` ni siquiera tiene campo
        // para pedirlo. Aquí lo tiene, y olvidarlo avisa.
        if (seRedondea(p.valor, p.decimales))
          av.push(`cifra ${p.valor} con \`decimales\` a 0: en pantalla sale ${Math.round(p.valor)} y deja de ser la cifra de la fuente`);
        if ((p.decimales ?? 0) > 2) av.push("más de 2 decimales en pantalla no se leen");
        return av;
      },
    }
  ),
  medidor: f<{
    label: string;
    de: number;
    a: number;
    max?: number;
    prefijo?: string;
    sufijo?: string;
    decimales?: number;
    dur?: number;
  }>(
    "Medidor",
    "dato",
    "Editorial.tsx",
    "Slider con el número fluctuando: el gesto de «mira lo que te queda».",
    "En pareja para comparar dos recorridos. `max` COMPARTIDO entre los dos medidores o la comparación miente.",
    {
      // Fila label/valor (70 px de cifra) + 16 de margen + el raíl con el puño
      // de 40 px centrado encima.
      alto: () => 70 + 16 + 40,
      revisa: (p) => {
        const av: string[] = [];
        // `Medidor` clampa la proporción a 1: con `a` por encima de `max`, la
        // barra se queda clavada al tope mientras el número sigue subiendo, y
        // lo que el ojo mide (el recorrido) deja de corresponderse con lo que
        // lee. Es el fallo más silencioso de la pieza: se ve "bien".
        if (p.max !== undefined && p.a > p.max)
          av.push(`\`a\` (${p.a}) supera \`max\` (${p.max}): la barra se clava en el tope mientras el número sigue subiendo`);
        if (p.max !== undefined && p.de > p.max)
          av.push(`\`de\` (${p.de}) supera \`max\` (${p.max}): el medidor arranca ya fuera de la barra`);
        // Un 11,6 % redondeado a 12 % ya no es la cifra de la fuente, y en un
        // canal que cita normas eso no es un detalle de maqueta.
        if (seRedondea(p.a, p.decimales) || seRedondea(p.de, p.decimales))
          av.push("recorrido con decimales y `decimales` a 0: el número se redondea y deja de ser la cifra de la fuente");
        return av;
      },
    }
  ),
  cronologia: f<{ hitos: readonly Hito[]; dur?: number; alto?: number }>(
    "Cronologia",
    "dato",
    "Editorial.tsx",
    "Raíl vertical entre fechas: la cabeza viaja del primer hito al último.",
    "El ORDEN del array es la dirección del viaje (arriba = de donde sales). Dos o tres hitos; con cinco no se lee ninguno.",
    {
      alto: (p) => p.alto ?? 560,
      revisa: (p) => {
        const av: string[] = [];
        if (p.hitos.length === 0) av.push("cronología sin hitos: dibuja un raíl vacío");
        // Con un solo hito `enPos` es 0 para todos y el raíl no recorre nada:
        // no es una cronología, es una fecha. Eso es un kicker.
        else if (p.hitos.length === 1)
          av.push("cronología con un solo hito: no hay viaje que contar, usa un kicker");
        return av;
      },
    }
  ),

  // ── Media ────────────────────────────────────────────────────────────────
  media: f<{ src?: string; esVideo?: boolean; sangre?: boolean; ancho?: number; alto?: number; deriva?: number }>(
    "TarjetaFoto / Media",
    "media",
    "Editorial.tsx",
    "Foto o clip. Enmarcado con borde naranja sobre papel, o a sangre sobre negro.",
    "La regla del formato: sobre papel el metraje va SIEMPRE enmarcado (es una prueba dentro del artículo). A sangre solo en registro cine.",
    {
      // A sangre no ocupa maqueta: es el fondo de la toma, no un bloque que
      // compita por el alto. Contarlo en R08 dispararía el aviso en todas las
      // tomas de escenario, que es como se aprende a ignorar un validador.
      alto: (p) => (p.sangre ? 0 : p.alto ?? 820),
      revisa: (p) => {
        const av: string[] = [];
        // Portada de `revisaNoticia`: una toma de retrato o escenario sin media
        // monta el marco con la palabra "pendiente". Es ÚTIL mientras maquetas
        // y es un fallo si llega al render final, así que avisa y no rompe.
        if (!p.src) av.push("media sin `src`: montará el marco vacío (\"pendiente\")");
        if (p.esVideo && !p.src) av.push("`esVideo` sin `src`: no hay clip que reproducir");
        return av;
      },
    }
  ),
});

export type PiezasNoticia = typeof PIEZAS_NOTICIA;

/** Los cuatro parámetros ya resueltos, para no repetirlos en cada firma. */
export type PlanNoticia = Plan<PiezasNoticia, BeatNoticia, MoldeNoticia, TintaNoticia>;
export type TomaEditorial = Toma<PiezasNoticia, BeatNoticia, MoldeNoticia, TintaNoticia>;

/* ── Reglas propias de la capa ──────────────────────────────────────────── */

type ReglaN<R extends PiezasNoticia> = Regla<R, BeatNoticia, MoldeNoticia, TintaNoticia>;

/**
 * LA LEY DEL FORMATO: es una SUCESIÓN, no capas.
 *
 * Es la regla exactamente opuesta a la de gráficos (allí las tomas conviven y
 * lo que se vigila es que haya un solo hero), y es la razón por la que las dos
 * capas comparten sustrato pero no tipo.
 *
 * El hueco se parte en dos avisos porque son dos fallos distintos:
 *   1-4 f  → un off-by-one al copiar el frame de la transcripción. Se ve como
 *            un parpadeo a negro entre dos tomas, y nadie lo escribe a propósito.
 *   >4 f   → alguien se ha dejado una toma sin escribir.
 *
 * El solape lo caza también `revisaPlan` por la vía de «dos tomas a pantalla
 * completa solapadas» (aquí los DOS moldes cubren). Se porta igual, y a
 * sabiendas del aviso doble, porque aquella regla depende de `cubre`: el día
 * que alguien añada un molde que no cubra, la ley del formato tiene que seguir
 * en pie por su cuenta.
 */
const sucesion: ReglaN<PiezasNoticia> = (plan) => {
  const av: string[] = [];
  const orden = plan.tomas.slice().sort((a, b) => a.ventana[0] - b.ventana[0]);
  for (let i = 1; i < orden.length; i++) {
    const prev = ventanaAbs(orden[i - 1].ventana, plan.formato.duracion);
    const cur = ventanaAbs(orden[i].ventana, plan.formato.duracion);
    const hueco = cur[0] - prev[1];
    const par = `[${orden[i - 1].id} → ${orden[i].id}]`;
    if (hueco > 0 && hueco <= 4)
      av.push(`${par} hueco de ${hueco} f: es un parpadeo a negro, no un silencio: casi siempre un off-by-one`);
    else if (hueco > 4) av.push(`${par} hueco de ${hueco} f: el formato es una sucesión y no tiene huecos`);
    else if (hueco < 0)
      av.push(`[${orden[i - 1].id} × ${orden[i].id}] solape de ${-hueco} f: las tomas se suceden, no se apilan`);
  }
  return av;
};

/**
 * El ritmo del short. Los dos números salen de `revisaNoticia` y son del
 * FORMATO, no del sustrato: el núcleo avisa por debajo de 0,5 s («no da tiempo
 * a leerlo») y aquí el suelo es 0,8 s porque lo que hay que leer es un titular
 * entero, no un rótulo.
 *
 * Por eso el aviso arranca EN 0,5 s: por debajo ya avisó el núcleo y dos
 * mensajes para el mismo fallo enseñan a ignorar los dos.
 */
const ritmo: ReglaN<PiezasNoticia> = (plan) => {
  const av: string[] = [];
  const fps = plan.formato.fps;
  for (const t of plan.tomas) {
    const [a, b] = ventanaAbs(t.ventana, plan.formato.duracion);
    const len = b - a;
    if (len >= Math.round(fps * 0.5) && len < Math.round(fps * 0.8))
      av.push(`[${t.id}] dura ${len} f (< 0,8 s): no da tiempo a leer el titular`);
    else if (len > Math.round(fps * 6))
      av.push(`[${t.id}] dura ${len} f (> 6 s): en un short, demasiado tiempo sin cambio visual`);
  }
  return av;
};

/**
 * Sin gancho no hay vídeo: los tres primeros segundos deciden si hay vídeo o
 * no, y el gancho es el único beat que no se puede recolocar.
 */
const arrancaConGancho: ReglaN<PiezasNoticia> = (plan) => {
  if (plan.tomas.length === 0) return [];
  const primera = plan.tomas.slice().sort((a, b) => a.ventana[0] - b.ventana[0])[0];
  return primera.beat === "gancho"
    ? []
    : [`[${primera.id}] la primera toma no es beat "gancho": el vídeo empieza sin gancho`];
};

/**
 * Cuatro tomas de cine seguidas y la pieza deja de ser editorial: se convierte
 * en un montaje de metraje con rótulos, que es exactamente el formato del que
 * este se distingue. El papel es lo que EXPLICA; sin papel no hay tesis.
 */
const noCuatroCineSeguidas: ReglaN<PiezasNoticia> = (plan) => {
  const av: string[] = [];
  const orden = plan.tomas.slice().sort((a, b) => a.ventana[0] - b.ventana[0]);
  let seguidas = 0;
  for (const t of orden) {
    seguidas = t.molde === "cine" ? seguidas + 1 : 0;
    // Solo en la CUARTA: si no, una racha de seis saca tres avisos del mismo
    // fallo y el autor deja de leerlos.
    if (seguidas === 4)
      av.push(`[${t.id}] 4 tomas "cine" seguidas: se pierde el registro editorial, intercala papel`);
  }
  return av;
};

/* ── El dialecto ────────────────────────────────────────────────────────── */

export const NOTICIAS: Dialecto<PiezasNoticia, BeatNoticia, MoldeNoticia, TintaNoticia> = {
  nombre: "noticias",
  piezas: PIEZAS_NOTICIA,
  beats: BEATS_NOTICIA,
  moldes: MOLDES_NOTICIA,
  paleta: PALETA_NOTICIA,
  // Un nodo que no pide color se pinta en tinta: es el negro editorial sobre el
  // papel, que es el fondo de siete de las nueve tomas. Sobre `cine` el titular
  // pide `blanco` explícitamente — y lo pide `compilaNoticia`, no el autor.
  tintaBase: "tinta",
  // La escala EDITORIAL, distinta de la de gráficos (104/46/32) y sacada de
  // `T` en theme-noticias.ts: titular 96, etiqueta 44, kicker 28. Un short
  // editorial se lee de un vistazo pero no grita: el hero es 8 px más pequeño
  // que en la capa de overlays y el contexto, 4 px.
  escala: { hero: 96, apoyo: 44, contexto: 28 } as Record<Rol, number>,
  // TODO a alfa 1, y es una decisión, no un descuido: sobre papel beige el
  // apoyo se distingue por COLOR (`suave`, gris cálido), no por transparencia.
  // Un texto al 88 % sobre papel se lee como impresión gastada, no como
  // jerarquía — que es justo el efecto que la capa de gráficos busca sobre
  // negro y que aquí sería suciedad.
  alfaRol: { hero: 1, apoyo: 1, contexto: 1 } as Record<Rol, number>,
  ley: LEY_EDITORIAL,
  reglas: [sucesion, ritmo, arrancaConGancho, noCuatroCineSeguidas],
};

export type DialectoNoticias = typeof NOTICIAS;

/* ── EL COMPILADOR: `TomaNoticia[]` → `Plan` ──────────────────────────────────
 *
 * Aquí se juntan las capas gemelas. `TomaNoticia` SOBREVIVE como DSL de autor
 * —el 004 y el 005 demuestran que funciona— pero deja de tener intérprete
 * propio: se traduce al sustrato y lo monta <PistaGraficos>, igual que un plan
 * de gráficos. `noticia-004.ts` y `noticia-005.ts` no cambian ni una línea.
 *
 * Lo que hace este archivo, en una frase: convierte los nueve TIPOS DE TOMA
 * (que son MAQUETAS: kicker + recorte + etiqueta) en molde + árbol de piezas
 * con sus tiempos. Los desfases NO son inventados: cada `en` de aquí abajo es
 * un `at` que estaba escrito en el switch de `PistaNoticia.tsx`. Ésa es la
 * unidad de trabajo del paso 9 (comparación frame a frame), así que cualquier
 * número que no coincida con el intérprete viejo es un frame que se mueve.
 *
 * Por qué `en` explícito en TODOS los nodos y no la `escalera` de la ley: la
 * escalera es por POSICIÓN [0,4,10,16] y solo describe la toma `titular` con
 * kicker. Un titular sin kicker tendría que dar 0/10 y la escalera daría 0/4;
 * la prensa pide 2/26 y el comparador 8/22. La escalera se queda como el valor
 * por defecto del dialecto (lo que hereda un plan escrito a mano), no como el
 * mecanismo por el que se compila una maqueta que ya existía.
 */

/**
 * Cuerpo del titular de `cierre`, derivado de la LÍNEA MÁS LARGA.
 *
 * El cierre se diseñó para un remate de una o dos palabras («¿Alcanza?», 004) y
 * 104 px es justo lo que le da el puñetazo. Pero desde que `T.titular` honra el
 * `\n` (theme-noticias.ts), un cierre de dos líneas escritas a propósito revienta
 * el encuadre: el n16 del 005 pide «Si tu escritura no está ahí, / no has vendido
 * nada.» y a 104 px cada línea se vuelve a partir, así que salen cuatro líneas
 * irregulares y la decisión de maqueta del autor se pierde igual que cuando el
 * `\n` no se honraba — solo que ahora encima queda feo.
 *
 * Bajarlo a 76 px en plano habría encogido «¿Alcanza?» un 27 % sin motivo. Se
 * deriva del contenido: mientras la línea más larga quepa, se queda en 104.
 *
 * El umbral es una ESTIMACIÓN por número de caracteres, no una medición: en el
 * display a 104 px con `letterSpacing: -2.6` entran ~20 caracteres en los 844 px
 * útiles (1080 − 2×118 de margen). Estimar es lo correcto aquí: medir el texto
 * renderizado exigiría DOM y rompería el determinismo entre renders.
 *
 * Vive en el dialecto y ya no en el intérprete porque es el COMPILADOR quien lo
 * necesita: `props.px` de la pieza `titular` se emite aquí.
 */
export const pxCierre = (titular?: string): number => {
  const lineas = (titular ?? "").split("\n");
  let masLarga = 0;
  for (let i = 0; i < lineas.length; i++) masLarga = Math.max(masLarga, lineas[i].trim().length);
  if (masLarga <= 20) return 104;
  if (masLarga <= 30) return 76;
  return 62;
};

const { pon, col, fila, gfx, plan } = capa(NOTICIAS, "noticia");

/** La entrada editorial con su desplazamiento propio: cada `y` de aquí sale de
 *  un `<Entra y={…}>` del intérprete viejo. Muelle y rampa son los de la ley. */
const sube = (y: number): Entrada => ({ como: "muelle", muelle: "contador", y, rampa: 9 });

/**
 * «Esta pieza se anima sola»: `RecortePrensa`, `ChipIcono`, `Medidor` y
 * `TarjetaFoto` traen su propio muelle y su propia rampa de opacidad dentro del
 * componente. Encadenarles además la entrada de la ley daría un doble salto que
 * ni el 004 ni el 005 tienen. (`ENTRA_SOLA`, en montadores.tsx, es la misma
 * tabla vista desde el lado del JSX.)
 */
const QUIETA: Entrada = { como: "ninguna" };

/**
 * El color de una toma llega como HEX (`TomaNoticia.color` es un `string`: el
 * 004 escribe `"#111111"`) y el plan pide TINTAS. Se busca al revés en la
 * paleta, que es la única traducción honesta: un hex que no esté en las seis
 * tintas del formato no se puede representar y cae al color por defecto de la
 * pieza. Es la limitación conocida del puente, y solo la tocaría un proyecto que
 * quisiera un color fuera de la paleta — que es justo lo que el dialecto existe
 * para impedir.
 */
const TINTAS: readonly TintaNoticia[] = ["tinta", "suave", "blanco", "acento", "resalte", "papel"];

const TINTA_POR_HEX: Record<string, TintaNoticia> = (() => {
  const m: Record<string, TintaNoticia> = {};
  for (const t of TINTAS) m[PALETA_NOTICIA[t].toUpperCase()] = t;
  return m;
})();

const tintaDeHex = (c: string | undefined, porDefecto: TintaNoticia): TintaNoticia =>
  c ? TINTA_POR_HEX[c.toUpperCase()] ?? porDefecto : porDefecto;

/**
 * El `resaltar` de una toma `prensa` deja de ser un string suelto al lado del
 * titular y pasa a ser un TROZO dentro del propio titular. La relación deja de
 * ser una búsqueda (con su `indexOf` que devolvía −1 en silencio) y pasa a ser
 * estructural. Se localiza IGUAL que lo hace `RecortePrensa` por dentro
 * (`toLowerCase().indexOf`) para que el texto plano que se le vuelve a pasar
 * caiga en el mismo sitio: el puente no puede cambiar dónde marca el rotulador.
 */
const conRotulador = (titular: string, resaltar?: string): TextoN => {
  if (!resaltar) return titular;
  const i = titular.toLowerCase().indexOf(resaltar.toLowerCase());
  if (i < 0) return titular;
  const trozos: (string | { t: string; rotulador: true })[] = [];
  if (i > 0) trozos.push(titular.slice(0, i));
  trozos.push({ t: titular.slice(i, i + resaltar.length), rotulador: true });
  const fin = titular.slice(i + resaltar.length);
  if (fin.length > 0) trozos.push(fin);
  return trozos;
};

/** Una toma del DSL de autor → una toma del sustrato. */
const compilaToma = (t: TomaNoticia): TomaEditorial => {
  // Los dos moldes del formato se llaman igual que los dos registros del DSL, y
  // no por casualidad: el registro SIEMPRE fue un molde (fondo + gramática) con
  // otro nombre.
  const molde: MoldeNoticia = t.registro ?? REGISTRO_POR_TIPO[t.tipo];
  const cine = molde === "cine";
  // El titular sobre cine va en blanco y sobre papel en tinta; el kicker NO se
  // invierte (el intérprete viejo lo pinta con `T.kicker` a secas, o sea gris
  // cálido, también sobre negro). Se conserva porque es lo publicado.
  const tintaTitular: TintaNoticia = cine ? "blanco" : "tinta";
  const acento = tintaDeHex(t.color, "acento");
  const hijos: TomaEditorial["hijos"][number][] = [];
  let gap = 34; // el `gap` por defecto de `Centro` en PistaNoticia.tsx

  switch (t.tipo) {
    // El mensaje. La toma más frecuente del formato: kicker (0), titular (4 si
    // hay kicker, 0 si no) y etiqueta (10).
    case "titular":
      if (t.kicker)
        hijos.push(pon("kicker", { texto: t.kicker, en: 0, rol: "contexto", color: "suave", entra: sube(22) }));
      hijos.push(
        pon("titular", {
          texto: t.titular ?? "",
          en: t.kicker ? 4 : 0,
          rol: "hero",
          color: tintaTitular,
          entra: sube(46),
        })
      );
      if (t.etiqueta)
        hijos.push(
          pon("etiqueta", {
            texto: t.etiqueta,
            en: 10,
            rol: "apoyo",
            // Sobre cine, blanco al 75 %: es el `rgba(255,255,255,0.75)` del
            // intérprete viejo, dicho como tinta + alfa en vez de como literal.
            color: cine ? "blanco" : "suave",
            alfa: cine ? 0.75 : undefined,
            entra: sube(26),
          })
        );
      break;

    // La prueba periodística. El recorte entra en 2 y se anima solo.
    case "prensa":
      gap = 40;
      hijos.push(
        pon("recorte", {
          titular: conRotulador(t.titular ?? "", t.resaltar),
          fuente: t.kicker,
          en: 2,
          entra: QUIETA,
          rol: "hero",
          color: "tinta",
        })
      );
      if (t.etiqueta)
        hijos.push(pon("etiqueta", { texto: t.etiqueta, en: 26, rol: "apoyo", color: "suave", entra: sube(22) }));
      break;

    // A vs B. Los chips son hermanos de una FILA y su stagger (+6 por chip) es
    // el `en` de cada uno; la fila no se anima (entra QUIETA) porque en el
    // intérprete viejo el contenedor era un div pelado.
    case "comparador":
      gap = 56;
      if (t.titular)
        hijos.push(
          pon("titular", { texto: t.titular, px: 68, en: 0, rol: "hero", color: tintaTitular, entra: sube(24) })
        );
      hijos.push(
        fila(
          (t.items ?? []).map((it, i) =>
            pon("chip", {
              texto: it.label,
              glifo: it.glifo,
              activo: it.activo,
              en: (t.titular ? 8 : 2) + i * 6,
              entra: QUIETA,
            })
          ),
          // `inicio` = `alignItems: flex-start`: un label de dos líneas no puede
          // descolgar a su vecino de una línea.
          { gap: 90, alinea: "inicio", en: 0, entra: QUIETA }
        )
      );
      if (t.etiqueta)
        hijos.push(pon("etiqueta", { texto: t.etiqueta, en: 22, rol: "apoyo", color: "suave", entra: sube(22) }));
      break;

    // El viaje entre fechas. Dibuja su raíl pero no "entra": el intérprete viejo
    // la monta sin `<Entra>` alrededor, solo con su `at={4}`.
    case "cronologia":
      gap = 44;
      if (t.kicker)
        hijos.push(pon("kicker", { texto: t.kicker, en: 0, rol: "contexto", color: "suave", entra: sube(20) }));
      hijos.push(pon("cronologia", { hitos: t.hitos ?? [], dur: t.dur, en: 4, entra: QUIETA, color: "tinta" }));
      break;

    // El dato como argumento. El único sitio del formato con DOS relojes: el
    // bloque entra en el frame 3 de la toma (`<Entra at={3} y={30}>`) y el
    // conteo arranca en el 4 (`<CifraContada at={4}>`). Los dos `at` del
    // intérprete viejo son de la TOMA y no se suman: `<Entra>` es un div, no una
    // <Sequence>, así que no desplazaba el reloj de su hijo. Aquí sí anida, y
    // por eso el desfase de la cifra dentro de su grupo es 1 y no 4 (3 + 1 = 4).
    // Va en una columna propia porque un solo nodo no puede tener dos relojes: o
    // la entrada llega tarde o el número arranca antes, y el 004 tiene siete
    // tomas de cifra.
    case "cifra":
      gap = 18;
      if (t.kicker)
        hijos.push(pon("kicker", { texto: t.kicker, en: 0, rol: "contexto", color: "suave", entra: sube(20) }));
      hijos.push(
        col(
          [
            pon("cifra", {
              valor: t.valor ?? 0,
              de: t.de,
              prefijo: t.prefijo,
              sufijo: t.sufijo,
              dur: t.dur,
              en: 1,
              entra: QUIETA,
              rol: "hero",
              color: acento,
            }),
          ],
          { en: 3, entra: sube(30) }
        )
      );
      if (t.etiqueta)
        hijos.push(pon("etiqueta", { texto: t.etiqueta, en: 12, rol: "apoyo", color: "suave", entra: sube(24) }));
      break;

    // Lo que sube o baja. El primero lleva el acento y el resto va en tinta: es
    // el canal que dice cuál de los dos recorridos es el argumento.
    case "medidor":
      gap = 64;
      if (t.titular)
        hijos.push(
          pon("titular", { texto: t.titular, px: 64, en: 0, rol: "hero", color: tintaTitular, entra: sube(24) })
        );
      hijos.push(
        col(
          (t.medidas ?? []).map((m, i) =>
            pon("medidor", {
              label: m.label,
              de: m.de,
              a: m.a,
              max: m.max,
              prefijo: m.prefijo,
              sufijo: m.sufijo,
              decimales: m.decimales,
              dur: t.dur,
              en: (t.titular ? 8 : 2) + i * 8,
              entra: QUIETA,
              color: i === 0 ? acento : "tinta",
            })
          ),
          { gap: 60, en: 0, entra: QUIETA }
        )
      );
      break;

    // Foto enmarcada sobre papel: metraje real DENTRO del artículo.
    case "retrato":
      gap = 38;
      hijos.push(
        pon("media", { src: t.media, esVideo: t.esVideo, ancho: 640, alto: 820, en: 2, entra: QUIETA })
      );
      if (t.titular)
        hijos.push(pon("titular", { texto: t.titular, px: 62, en: 12, rol: "hero", color: "tinta", entra: sube(24) }));
      break;

    // Metraje a sangre sobre negro. El `sangre: true` se sale de la maqueta
    // (position absolute sobre el centro del cuadro) y por eso no descuelga al
    // titular.
    //
    // ⚠️ DOS COSAS QUE ESTA TOMA PIERDE EN LA MIGRACIÓN, Y NO SE TAPAN AQUÍ:
    //
    //  1. EL DEGRADADO PROTECTOR. El intérprete viejo pintaba el scrim ENTRE el
    //     metraje y el titular. El scrim acoplado al molde (`MOLDES_NOTICIA.cine`)
    //     no puede hacer eso: el ambiente va SIEMPRE por debajo de los hijos, que
    //     es lo correcto cuando lo que hay que oscurecer está en otra capa (el
    //     avatar, en la capa de gráficos) y no lo es cuando el metraje a sangre
    //     ES un hijo. El degradado se dibujaría debajo del vídeo, o sea nunca, y
    //     por eso se apaga (abajo) en vez de fingir que está.
    //  2. EL ANCLAJE AL TERCIO INFERIOR. El titular colgaba de `paddingBottom:
    //     560`; aquí queda centrado, porque el molde tiene que anclar en el
    //     CENTRO para que la caja a sangre coincida con el cuadro.
    //
    // NINGUNA pieza publicada usa `escenario` (ni el 004 ni el 005), así que
    // esto no mueve un frame de lo que existe — pero hay que resolverlo antes de
    // que una pieza con b-roll lo use. La salida es de diseño y no de parche:
    // una pieza `velo` en el registro (un scrim COLOCABLE en el z-order del
    // plan, entre el metraje y el texto) o un `ambiente.media` que baje el
    // metraje a sangre a la capa de fondo, que es donde de verdad vive.
    case "escenario":
      hijos.push(pon("media", { src: t.media, esVideo: t.esVideo, sangre: true, en: 0, entra: QUIETA }));
      if (t.titular)
        hijos.push(pon("titular", { texto: t.titular, px: 74, en: 4, rol: "hero", color: "blanco", entra: sube(30) }));
      break;

    // El remate: negro y una sola palabra. `pxCierre` deriva el cuerpo de la
    // línea más larga; sin eso, el cierre de dos líneas del 005 se parte otra vez.
    case "cierre":
      gap = 24;
      hijos.push(
        pon("titular", {
          texto: t.titular ?? "",
          px: pxCierre(t.titular),
          en: 0,
          rol: "hero",
          color: "blanco",
          entra: sube(34),
        })
      );
      if (t.etiqueta)
        hijos.push(
          pon("etiqueta", {
            texto: t.etiqueta,
            en: 10,
            rol: "apoyo",
            color: "blanco",
            alfa: 0.72,
            entra: sube(22),
          })
        );
      break;

    default:
      break;
  }

  return gfx(t.id, molde, t.beat, [t.startFrame, t.endFrame], "hero", t.reason, hijos, {
    gap,
    // EL SCRIM DEL MOLDE `cine`, APAGADO EN TODAS LAS TOMAS. Dos razones
    // distintas y las dos ciertas:
    //   · en `cierre` y en un `titular` de registro cine no hay metraje que
    //     proteger y sí algo que ensuciar — `FondoCine` es un foco cenital que
    //     llega al 63 % del alto, así que el degradado le comería el tercio de
    //     abajo. El intérprete viejo no lo pinta ahí, y eso es lo publicado.
    //   · en `escenario` sí hay metraje, pero el ambiente va por debajo de los
    //     hijos y el metraje a sangre ES un hijo: el degradado quedaría debajo
    //     del vídeo. Un scrim que no se ve es peor que ninguno, porque hace
    //     creer que el texto está protegido. Ver el comentario del `case`.
    ambiente: cine ? { scrim: false } : undefined,
    sonido: t.soundCueId,
  });
};

/**
 * El plan editorial completo. `formato` es opcional para que un plan se pueda
 * validar con `node` sin montar Remotion; el intérprete pasa el de verdad
 * (`useVideoConfig`), que es lo que hace que el aviso «la toma se corta» mida
 * contra la duración REAL de la composición y no contra una supuesta.
 */
export function compilaNoticia(
  tomas: TomaNoticia[],
  formato: { ancho: number; alto: number; fps: number; duracion: number } = {
    ancho: 1080,
    alto: 1920,
    fps: 30,
    duracion: tomas.reduce((max, t) => Math.max(max, t.endFrame), 0),
  }
): PlanNoticia {
  return plan(formato, tomas.map(compilaToma));
}
