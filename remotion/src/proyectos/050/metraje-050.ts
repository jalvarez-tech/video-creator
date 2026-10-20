/**
 * EL RECORRIDO 050 — «Tierra Grata Bosque Santo (El Poblado), ARRIENDO», V32 del registro y SEXTO de los seis reels de arriendo (045-050), «14,8» — los planos, como DATOS.
 *
 * Encargo (2026-10-19, seis sesiones a la vez, repartidas por `proyectos/044/reparto-045-050.md`): promocionar el ARRIENDO de un apartamento amoblado de 113 m² con jacuzzi privado a pocos metros de la
 * Avenida Las Palmas (COP 14,8 millones al mes). Este reel es el de la única cifra de la serie: «catorce millones ochocientos que incluyen experiencias pensadas para ti» (el precio sale en la mitad, subtítulo
 * `$14.800.000`). Estructura del canal sin dron (no lo hay): HOOK · RECORRIDO DE LA UNIDAD · MITAD · RECORRIDO DEL APARTAMENTO (con su clímax) · CTA, tres frases de Isabella.
 *
 *   hook   HK02  «El tiempo es el activo más valioso de los seres humanos. Te ayudamos a optimizarlo, incluyéndote un aseo semanal.»   (sentada en el sillón de la terraza común; REPETIDA de la V29)
 *   mitad  MD04  «Catorce millones ochocientos que incluyen experiencias pensadas para ti.»                                           (Social Kitchen; REPETIDA de la V29; lleva el PRECIO)
 *   CTA    CT02  «Si quieres un apartamento amoblado que tenga acompañamiento personalizado, escríbeme.»                                (el jardín; REPETIDA de la V28)
 *
 * LA PIEZA ABRE CON EL HOOK (excepción por encargo del usuario, como el 021 y el 023; se declara en `01-plan.md` y en la puerta, `ABRE_CON_EL_HOOK`): el frame 0 es Isabella, sentada en el sillón; su primera palabra
 * suena 5 f después y la música ya suena, baja, bajo su voz. Rompe a propósito la regla fija «la primera toma sale sin texto ni voz»; el resto de reglas fijas (nunca el sello, nada arriba, el cierre en la tarjeta
 * oscura con el logo y la web, nada se congela) se siguen comprobando.
 *
 * LA IDEA EN UNA LÍNEA. Esta pieza es PARA QUIEN LLEGA A UNA CIUDAD QUE NO ES LA SUYA Y NO QUIERE PERDER SU TIEMPO: el hook le promete lo que más vale (su tiempo, con un aseo semanal incluido); el paseo por la unidad le
 * enseña dónde pasará ese tiempo (la piscina, el gimnasio, la Social Kitchen); la mitad le da la cifra y lo que incluye; el apartamento (la alcoba, el baño y, al fondo, el balcón) le enseña el sitio; y el CTA le pide
 * una acción («escríbeme»). Ninguna otra cifra, ni administración, ni contrato, ni qué se paga aparte: la ficha no lo dice.
 *
 *   bloque 2  c01                  Isabella sentada en el sillón de la terraza común: el hook (HK02), A CORTE EN EL FRAME 0
 *   bloque 3  c02 c03 c04          el paseo por LA UNIDAD: la piscina (RC17) → el gimnasio (RC14) → la Social Kitchen (RC12), donde espera Isabella
 *   bloque 4  c05                  Isabella en la Social Kitchen: la mitad (MD04) con el precio, A CORTE EN UN GOLPE
 *   bloque 5  c06 c07 c08          el paseo por EL APARTAMENTO: la alcoba principal (RC06) → el baño principal (RC09) → el balcón con las camas, la palma y la ciudad al fondo (RC02, su tramo FINAL: el clímax)
 *   bloque 6  c09 c10              Isabella en el jardín: el CTA (CT02); y la tarjeta oscura del cierre (nada se congela)
 *
 * QUIÉN MARCA EL TIEMPO: LA MÚSICA, POR GOLPES. «Spring is Coming» (neoclásico / ambient suave, plana, biblioteca del repo) tiene un pulso suave (≈ 128 BPM) con golpes de ≥ 6 dB cada 0,46 s y ninguna caída: no resuelve
 * sola, y la curva bajo la voz la hace el ducking con coseno de `audio-050.ts`. Los ocho cortes de la pieza caen cada uno en un golpe MEDIDO de ≥ 11,7 dB (`musica/golpes-050.json`, `herramientas/rejilla-050.py`
 * y `buscar-cortes-043.py`): el paseo entra en un «drop» de 16,5 dB. La música suena DESDE EL FRAME 0, baja bajo la voz del hook (la canción entra en su segundo 34,1, 6,8 s antes de ese golpe).
 *
 * LOS RECORRIDOS SON HORIZONTALES (1920×1080, SDR, 2-sep): se recortan al centro a 608×1080 y se escalan ×2,13 (`normalizar.mjs`): salen más blandos que Isabella en 4K. Se dice en la prueba y no se compensa con filtros.
 * Los seis tramos son disjuntos entre sí y los usa solo esta pieza de apertura/clímax: RC02 solo su tramo final; RC01, RC04 y RC20 (aperturas) y RC03, RC10, RC18, RC19 y RC21 (clímax de otras piezas) NO entran.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(9)` = 9/30 s) donde el corte es en la muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`. Con `color` el render lleva `--gl=angle` y la prueba se
 * hace a escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-050.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-050";

export const FPS_050 = 30;

export type Entrada = "corte" | "disolver";
export type Bloque = 1 | 2 | 3 | 4 | 5 | 6;

/** Dónde habla Isabella en SU clip y a qué nivel. `s0`/`s1`, medidos por energía (perfil de 20 ms en la banda de voz) y por arranques de sílaba (`onsets-voz.py`); `lufs`, con ebur128 sobre el WAV TRATADO que suena. */
export interface VozDelCorte {
  /** Segundo de la fuente en que empieza a hablar. */
  s0: number;
  /** Segundo de la fuente en que termina SU frase (la toma puede seguir: se corta aquí). */
  s1: number;
  /** Sonoridad integrada de la voz TRATADA en esa ventana (LUFS). */
  lufs: number;
  /** Lo que dice, tal como está en el guion. Solo para leer el plan. */
  dice: string;
}

export interface Corte extends CorteDelFormato<Entrada> {
  /** `foto` solo para la tarjeta oscura del cierre (`c10-cierre`: un negro liso). Nada se congela. */
  tipo: "video" | "foto";
  /** A qué bloque del guion pertenece: la puerta comprueba el orden y el tope de cada uno. */
  bloque: Bloque;
  /** Solo las tomas de Isabella: el WAV de su voz TRATADA (`<toma>-voz.wav`, `normalizar.mjs`). */
  audio?: string;
  voz?: VozDelCorte;
}

/**
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido del usuario desde la V9: «mientras habla Isabella sube los decibeles sin saturar»). Las voces crudas llegan a −19,4 · −23,3 · −20,5 LUFS en su ventana de voz; cada
 * una pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` y limitador a −2,5 dBFS) hasta −15,0 LUFS con el pico
 * real a −2,5 dBFS, así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Spring is Coming» — `archivos/musica/Spring is Coming.mp3` (sha 8 `fe252090`), neoclásico / ambient suave, 2:02, plana (−15,1 LUFS de media: sin crescendo ni caída hasta su fundido final de 118 s). Se usa desde su segundo 34,1
 * y de ahí suena a −15 LUFS (±1) durante los 35 s de la pieza. Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de «empieza a subir») en que entra cada plano, con su
 * fuerza en dB por 15 ms: `proyectos/050/musica/golpes-050.json` (`medir-pista.py --json`). Salen de `herramientas/rejilla-050.py` (la rejilla de cortes con la mitad de ≥ 128 f).
 */
export const GOLPE = {
  /** El «drop» donde entra el paseo, tras el hook: el golpe más fuerte de la rejilla tras el de 27 dB del segundo 35 (bajo la voz del hook). */
  paseo: { t: 40.857, db: 16.5 },
  /** El gimnasio. */
  gimnasio: { t: 43.345, db: 13.2 },
  /** La Social Kitchen, donde espera Isabella. */
  cocina: { t: 45.932, db: 16.7 },
  /** Isabella entra A CORTE con la mitad; su primera sílaba suena 11 f después. */
  mitad: { t: 48.767, db: 13.9 },
  /** La alcoba principal (entra el apartamento). */
  alcoba: { t: 53.056, db: 12.3 },
  /** El baño principal. */
  bano: { t: 55.696, db: 15.0 },
  /** EL CLÍMAX: el balcón (RC02, tramo final). */
  balcon: { t: 58.821, db: 12.9 },
  /** Isabella entra A CORTE con el CTA; su primera sílaba suena 14 f después. */
  cta: { t: 62.165, db: 11.7 },
} as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el segundo 34,1, redondeado a un frame (1023/30) para que `trimBefore` no lo mueva. La música suena desde el frame 0 (el hook abre la pieza) y el «drop»
 * del paseo (40,857 s) cae en el f204, cuando acaba el plano del hook.
 */
export const INICIO_MUSICA = 1023 / FPS_050;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_050;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_050;

/** Isabella habla a cámara: un empuje lento la acompaña. Los recorridos, quietos (la cámara ya se mueve). */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-050/${id}.mp4`;
const a = (id: string): string => `recorrido-050/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE del canal (la del 017): contraste con cuerpo, negros hundidos, luces recogidas, un punto cálido y +10 % de saturación. Orden del efecto: exposición → balance de blancos → sombras/luces/blancos/negros → contraste →
 * saturación → vibrance. `vibrance` ≤ 0,05 (sobre hormigón gris pinta un moteado de colores y vuelve rosadas las nubes) y las tomas de Isabella, `saturation` ≤ 1,06: la piel se queda donde estaba. El AJUSTE de cada plano se
 * mide (`herramientas/medir-color.py`), no se hereda.
 */
const COLOR_BASE: ColorCine = {
  contrast: 1.1,
  blacks: -0.06,
  shadows: 0.08,
  highlights: -0.2,
  whites: -0.05,
  temperature: 0.03,
  saturation: 1.1,
  vibrance: 0,
};

/** El color de un plano: la base más el ajuste de su toma (medido, `medir-color.py`). */
const color = (ajuste: ColorCine = {}): ColorCine => ({ ...COLOR_BASE, ...ajuste });

/**
 * El frame de cada cambio de plano: el del golpe de la canción en que entra (arriba). TODOS los cortes son secos y caen en un golpe medido.
 */
const P = {
  paseo: golpe(GOLPE.paseo), //       204 · acaba el hook; entra el paseo (el «drop»)
  gimnasio: golpe(GOLPE.gimnasio), // 279
  cocina: golpe(GOLPE.cocina), //     357
  mitad: golpe(GOLPE.mitad), //       442 · Isabella entra a corte con la mitad; su primera palabra, 11 f después
  alcoba: golpe(GOLPE.alcoba), //     570 · el apartamento
  bano: golpe(GOLPE.bano), //         650
  balcon: golpe(GOLPE.balcon), //     743 · el clímax (101 f, el plano más largo del bloque 5)
  cta: golpe(GOLPE.cta), //           844 · Isabella entra a corte con el CTA; su primera palabra, 14 f después
} as const;

/**
 * Frames que dura la toma del CTA: el clip dura 5,57 s (167 f) y desde `desde` (9 f) le quedan 158. Su voz va de 0,78 a 4,99 s (f858-985 de la comp): 17 f (0,6 s) de su cara tras la última palabra, en los que la
 * imagen funde a negro (los últimos 6). Nada se congela: el plano acaba en el último fotograma del clip.
 */
const DUR_CTA = 158;

/**
 * Dónde acaba la música (frame de la comp): se apaga en línea recta bajo la tarjeta y llega a cero 2 f antes del final de la pieza.
 */
export const FIN_MUSICA_050 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje050: readonly Corte[] = [
  // ── Bloque 2 · el hook: la pieza abre con Isabella ──
  {
    id: "c01-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk02"),
    audio: a("hk02-voz"),
    voz: {
      s0: 0.465,
      s1: 6.52,
      lufs: -15.0,
      dice: "El tiempo es el activo más valioso de los seres humanos. Te ayudamos a optimizarlo, incluyéndote un aseo semanal.",
    },
    // HK02 (IMG_4272, 7,23 s = 217 f): sentada en el sillón bajo la pérgola de la terraza común. La voz empieza a los 0,465 s («El», subida de 42,9 dB; `onsets-voz.py` y `palabras-desde.py`: «El tiempo es el activo» desde 0,45 s)
    // y acaba a los 6,52 s («semanal.», −21 → −54 dB en 0,05 s). `limites-voz.py` daba 0,67 s: es «tiempo», la primera sílaba fuerte; «El» es más suave. `desde` 9 f (0,3 s) entra A CORTE en el f0: la primera palabra suena 5 f después
    // y la última, en el f187; el plano dura 204 f (hasta el golpe del paseo) y usa el clip hasta el f213 de 217. Antes de «El» hay 0,07 s de respiración a −65 dB (fuera de la ventana de voz tratada).
    // «aseo» (whisper: p 0,68 · 0,24 · 0,98) e «incluyéndote» (p 0,72 · 0,62: ¿«incluyendo»?) POR CONFIRMAR AL OÍDO (ver `subtitulos-050.ts`).
    desde: fr(9),
    en: 0,
    dur: P.paseo,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.06, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "La terraza común (la promesa): Isabella sentada en el sillón bajo la pérgola dice «el tiempo es el activo más valioso… te ayudamos a optimizarlo, incluyéndote un aseo semanal». La pieza abre con ella, a corte, con la música ya baja bajo su voz.",
  },
  // ── Bloque 3 · el paseo por la unidad: la piscina, el gimnasio y la Social Kitchen ──
  {
    id: "c02-piscina",
    bloque: 3,
    tipo: "video",
    src: v("rc17"),
    // RC17 (Img 9527, 2-sep, 7,7 s): el carril de nado desde el otro extremo, con los árboles y el cielo del atardecer; la cámara avanza y gira a la derecha. Recorte central (x=656). Del 3,2 al 5,7 s: el agua azul con el escalón y el
    // segundo carril bajo los pinos (sin gente cerca; antes de los 3 s se ven dos nadadores diminutos en el borde izquierdo). Se eligió RC17 y no RC16 (el carril visto desde el otro lado) porque las V27, V28 y V30 ya usan RC16 (7b de la puerta): así esta pieza no repite el plano de la piscina.
    desde: 3.2,
    en: P.paseo,
    dur: P.gimnasio - P.paseo,
    zoom: QUIETO,
    entra: "corte",
    color: color({ contrast: 1.02, exposure: 0.3, shadows: 0.5, blacks: 0.04, highlights: -0.3, saturation: 1.08 }),
    reason:
      "La piscina (la unidad: dónde pasará su tiempo): tras «te ayudamos a optimizarlo», el carril de nado bajo los pinos: lo primero que enseña la unidad. Entra a corte en el «drop».",
  },
  {
    id: "c03-gimnasio",
    bloque: 3,
    tipo: "video",
    src: v("rc14"),
    // RC14 (Img 9517, 2-sep, 7,0 s): el gimnasio, la pared a rayas rojas, las estanterías y las máquinas; la cámara avanza a la derecha. Del 0,0 al 2,6 s: el tramo sin gente (desde los 2,5 s aparece, pequeño y al fondo, un socio entrenando en un banco; a partir de los 2,8 s está cerca y se evita). Se probó RC13 (el rótulo «GIMNASIO», para no repetir el plano de las V27, V30 y V31, 7b de la puerta) y se descartó: enseña a dos socios del gimnasio de cerca.
    // Comparte 2,3 s con la V27 (045) y la V31 (049): declarado.
    desde: 0.0,
    en: P.gimnasio,
    dur: P.cocina - P.gimnasio,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.4, shadows: 0.35, blacks: 0 }),
    reason:
      "El gimnasio (la unidad: cuidarse): de la piscina a las máquinas y la pared a rayas rojas; sigue el mismo movimiento hacia la derecha.",
  },
  {
    id: "c04-social-kitchen",
    bloque: 3,
    tipo: "video",
    src: v("rc12"),
    // RC12 (Img 9514, 2-sep, 7,4 s): la Social Kitchen / coworking desde el otro lado, con el mural, las lámparas verdes, la mesa y una silla de madera en primer plano; la cámara gira a la derecha hacia el ventanal.
    // Del 0,0 al 2,83 s. Es el espacio donde está Isabella en la mitad (MD04): el paseo llega a donde ella espera.
    desde: 0.0,
    en: P.cocina,
    dur: P.mitad - P.cocina,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.05 }),
    reason:
      "La Social Kitchen (la unidad: reunirse y trabajar): el paseo llega al espacio donde espera Isabella; el mural y las lámparas verdes preparan la cifra.",
  },
  // ── Bloque 4 · la mitad: el precio ──
  {
    id: "c05-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md04"),
    audio: a("md04-voz"),
    voz: {
      s0: 0.555,
      s1: 4.17,
      lufs: -15.0,
      dice: "Catorce millones ochocientos que incluyen experiencias pensadas para ti.",
    },
    // MD04 (IMG_4296, 4,87 s = 146 f): Isabella en la Social Kitchen (lámparas verdes, mural). La voz empieza a los 0,555 s (onset «Ca», subida de 32,9 dB sobre un suelo de −55 dB) y acaba a los 4,17 s («ti.», el pico de
    // −21 dB a 4,10 s; detrás, el ruido de sala a −40 dB, que la ventana de voz tratada apaga). La voz de esta toma es la más baja de las tres (−23,3 LUFS crudos). `desde` 6 f entra A CORTE en el golpe de 13,9 dB del f442 (suena entero:
    // la música baja con curva DESPUÉS) y la primera sílaba suena a los 11 f del golpe. El plano dura 128 f (hasta el golpe del f570): 9 f tras la última palabra (el clip da 134 f desde `desde`).
    // Whisper (con contexto) oyó «catorce millones DE ochocientos»; sin contexto, «14 millones 800». «de» es un error de contexto y el catálogo dice «catorce millones ochocientos»: POR CONFIRMAR AL OÍDO. La cifra en pantalla sale
    // del catálogo (COP 14.800.000 al mes), no de whisper.
    desde: fr(6),
    en: P.mitad,
    dur: P.alcoba - P.mitad,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.06, exposure: 0.2, shadows: 0.25, blacks: 0, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "La Social Kitchen (el precio): Isabella dice «catorce millones ochocientos que incluyen experiencias pensadas para ti»: la única cifra de la pieza, dicha donde se reúne la unidad. Entra a corte en un golpe.",
  },
  // ── Bloque 5 · el apartamento: la alcoba, el baño y el balcón ──
  {
    id: "c06-alcoba",
    bloque: 5,
    tipo: "video",
    src: v("rc06"),
    // RC06 (Img 9479, 2-sep, 8,6 s): la alcoba principal desde el otro lado, la cama con sus cojines y la lámpara colgante; la cámara gira a la derecha. Del 0,0 al 2,63 s: la cama y los cojines, la ventana y la lámpara que entra. Se eligió RC06 y no
    // RC05 (la cama de frente) porque las V27, V28, V29 y V30 ya usan RC05 (7b de la puerta). Se probó el tramo 3,4-6,0 s (la cama y la puerta del baño) y se descartó: enseña una cruz de pared (adorno de la alcoba) durante todo el plano.
    desde: 0.0,
    en: P.alcoba,
    dur: P.bano - P.alcoba,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.4, highlights: -0.4, whites: -0.3 }),
    reason:
      "La alcoba principal (el apartamento: descanso): tras la cifra, por fin dentro del apartamento; la cama hecha, la luz baja de la lámpara; es lo que se alquila amoblado.",
  },
  {
    id: "c07-bano",
    bloque: 5,
    tipo: "video",
    src: v("rc09"),
    // RC09 (Img 9484, 2-sep, 8,2 s): el baño principal, el mueble de madera con el lavamanos de vasija, el espejo y, al fondo, la mampara de la ducha; la cámara avanza a la derecha. Del 1,5 al 4,63 s.
    desde: 1.5,
    en: P.bano,
    dur: P.balcon - P.bano,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.4, highlights: -0.4, whites: -0.2 }),
    reason:
      "El baño principal (el apartamento: cuidado): de la alcoba al baño, el paso natural del paseo; el mueble de madera, el espejo y la mampara.",
  },
  {
    id: "c08-balcon",
    bloque: 5,
    tipo: "video",
    src: v("rc02"),
    // RC02 (Img 9463, 2-sep, 29,4 s = 881 f normalizados; `avg_frame_rate` irregular): se usa SOLO su tramo final, del 26,0 s al último fotograma (29,37 s). El clip empieza en la sala (esa parte queda libre para otra pieza),
    // sube al cielo y SALE AL BALCÓN; de 21 a 26 s la cámara baja al suelo, hay un dedo en el objetivo (21,0 s) y gira mucho: se evita. De 26,0 a 27,3 s un paneo de la pared y la palma a las camas blancas con el cristal
    // al fondo (la ciudad y las montañas reflejadas) y de 27,3 a 29,37 s casi quieto: las camas blancas sobre la baldosa negra. Recorte en x=500 y no al centro (656): en el último fotograma deja las dos camas enteras y el cristal con las montañas y la ciudad. NO es el jacuzzi privado (que está en RC21, de la V27): aquí no aparece.
    desde: fr(780),
    en: P.balcon,
    dur: P.cta - P.balcon,
    zoom: [1.0, 1.04], // un empuje mínimo: el final es casi un plano fijo y la cámara a mano se queda inerte
    entra: "corte",
    color: color({ exposure: 0.05, shadows: 0.2, highlights: -0.25 }),
    reason:
      "El balcón (el clímax): del baño al exterior del apartamento, las camas blancas sobre la baldosa negra y la palma, con la ciudad en el cristal: lo que se ve al salir. El plano más largo del bloque 5. Entra a corte en un golpe.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c09-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct02"),
    audio: a("ct02-voz"),
    voz: {
      s0: 0.78,
      s1: 4.99,
      lufs: -15.0,
      dice: "Si quieres un apartamento amoblado que tenga acompañamiento personalizado, escríbeme.",
    },
    // CT02 (IMG_4294, 5,57 s = 167 f): Isabella en el jardín con árboles y plantas. La voz empieza a los 0,78 s («Si», subida de 41 dB; hay un chasquido a −62 dB a los 0,08 s y una respiración a los 0,425 s que la ventana de voz
    // tratada no deja sonar) y acaba a los 4,99 s («escríbeme.»). `desde` 9 f entra A CORTE en el golpe de 11,7 dB del f844 y la primera sílaba suena a los 14 f. El plano dura 158 f (hasta el último fotograma del clip): 17 f tras
    // la última palabra, en los que la imagen funde a negro (los últimos 6).
    // «amoblado» (whisper: «movilado», «movelado», «moblado»; p 0,27 en la primera sílaba) POR CONFIRMAR AL OÍDO (ver `subtitulos-050.ts`).
    desde: fr(9),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ contrast: 1.06, exposure: 0.1, highlights: -0.3, whites: -0.15, saturation: 1.04 }),
    reason:
      "El jardín (la invitación): Isabella dice «si quieres un apartamento amoblado que tenga acompañamiento personalizado, escríbeme»: una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-050.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c10-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-050/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c09
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c10). */
export const DURACION_050 = P.cta + DUR_CTA + DUR_TARJETA;
