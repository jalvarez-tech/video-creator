/**
 * EL REEL 055 — Casa en Condominio Los Bravos (La Ceja), los planos como DATOS. V37 del registro, segunda de las tres versiones de esta casa (054 = «privacidad», 056 = «solo 6 casas»).
 *
 * Ángulo: «LAS MAÑANAS». El aire puro del oriente antioqueño: se imagina el día empezando en esta casa. Isabella lo propone en el jardín (hook), el primer recorrido sale por el sendero a la terraza bajo la pérgola
 * y al jardín, ella abre la puerta («no es solo una casa, es una declaración de estilo»), el segundo recorrido va de la cocina con la cafetera, por la escalera y la doble altura y la puerta de la alcoba, a la alcoba
 * con sol y al balcón con el cielo (la vista), y su CTA la deja pidiendo hablar. Estructura del canal: DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA, con TRES frases de Isabella y ni una más.
 *
 *   hook   HK02 `IMG_8822`  «Imagina tus mañanas en este espacio, disfrutando del aire puro del oriente antioqueño.»
 *   mitad  MD03 `IMG_8819`  «No es solo una casa, es una declaración de estilo.»
 *   CTA    CT03 `IMG_8914`  «Si estás pensando en cambiar tu estilo de vida, ¡hablemos!»
 *   (la terna y la canción son las del reparto `proyectos/054/reparto-054-062.md`; la aérea, el ÚLTIMO TERCIO —68-103 s— del dron largo)
 *
 *   bloque 1  c01                  DRON (DJI_…0070_D, tramo 14,0-17,07 s del archivo normalizado = 82,0-85,1 s del original): la casa de lado, con su seto, su piedra y su cubierta de teja; SIN TEXTO NI VOZ
 *   bloque 2  c02                  HOOK (HK02): Isabella camina por el jardín hacia cámara con la pérgola detrás y, al decir «aire puro», la cámara se va al cielo y al césped (a corte en el golpe de 15,2 dB)
 *   bloque 3  c03 c04 c05          RECORRIDO: el sendero lateral con el sol y la llegada a la pérgola y a las sillas (RC22) → el reflejo del sol bajo la pérgola y el jardín (RC23) → la casa blanca al fondo del césped (RC24)
 *   bloque 4  c06                  MITAD (MD03): Isabella en la puerta de entrada, ya dentro del recibidor; la cámara sigue por la sala y su ventanal abierto al jardín
 *   bloque 5  c07 c08 c09 c10      RECORRIDO: la cafetera en la cocina (RC20) → la escalera y la doble altura (RC01) → la puerta de madera que se abre a una alcoba con sol (RC19) → de la alcoba al balcón y al cielo (RC09, la vista)
 *   bloque 6  c11 c12              CTA (CT03) y la tarjeta oscura del cierre
 *
 * LAS REGLAS FIJAS DEL CANAL (`recorrido-luxur` SKILL.md §0): la primera toma sale SIEMPRE sin texto y sin voz (el dron dura hasta el golpe en que Isabella entra a corte, en f92); nunca el sello; el cierre es la tarjeta
 * oscura con el logo y la web y nada se congela. Sin cifras: no hay ni una en lo que dice Isabella ni en pantalla.
 *
 * EL TIEMPO (R29, R33). La canción (*Spring is Coming*, neoclásica en Do menor) tiene golpes de 9-27 dB, algunos de ellos fuertes, pero SIN PULSO fijo (`rejilla.py`: ningún periodo alinea ≥ 25 % de los golpes fuertes):
 * TODOS los cortes son secos y caen sobre un golpe medido (`proyectos/055/musica/golpes-055.json`; la puerta lo comprueba y `golpes-render.py` lo confirma sobre el audio del render). Las TRES tomas de Isabella entran
 * a corte sobre un golpe, con su primera sílaba 8 f después: el golpe suena entero y la música baja con curva en esos 8 f (pedido del usuario: «la música baja antes de la primera palabra de Isabella y sube después de la
 * última»). El CTA entra en el golpe de 27,4 dB —el más fuerte de la canción en sus primeros 45 s—, que abre su sección final. Las voces salen de `limites-voz.py`, `envolvente-voz.py` y los arranques de sílaba
 * (`herramientas/onsets-voz.py`), no de whisper (que pone la primera palabra en 0,00 s).
 *
 * EL COLOR (R32): cada plano de vídeo lleva `color`, la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`. Con `color` el render lleva `--gl=angle` y la prueba se hace a escala 1 reducida.
 *
 * METRAJE COMPARTIDO (declarado en `combinaciones.md`): los recorridos pueden repetirse entre las tres versiones de esta casa; la terna de Isabella y la aérea son exclusivas de esta.
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-055.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-055";

export const FPS_055 = 30;

export type Entrada = "corte" | "disolver";
export type Bloque = 1 | 2 | 3 | 4 | 5 | 6;

/** Dónde habla Isabella en SU clip y a qué nivel. `s0`/`s1`, medidos por energía (perfil de 20-40 ms en la banda de voz) y por arranques de sílaba; `lufs`, con ebur128 sobre el WAV TRATADO que suena. */
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
  /** `foto` solo para la tarjeta oscura del cierre (`c12-cierre`: un negro liso). Nada se congela. */
  tipo: "video" | "foto";
  /** A qué bloque del guion pertenece: la puerta comprueba el orden y el tope de cada uno. */
  bloque: Bloque;
  /** Solo las tomas de Isabella: el WAV de su voz TRATADA (`<toma>-voz.wav`, `normalizar.mjs`). */
  audio?: string;
  voz?: VozDelCorte;
}

/**
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»). Las voces llegan a −21,5 · −24,5 · −26,7 LUFS en su ventana de voz; cada una pasa por la
 * cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` y limitador a −2,5 dBFS) hasta ≈ −15 LUFS con el pico real a
 * −2,5 dBFS, así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * *Spring is Coming* — `archivos/musica/Spring is Coming.mp3` (sha 8 `fe252090`), 2:02, Do menor. Tiene 0,355 s de aire casi mudo (−60 dBFS) y su primera nota sube de golpe en ese instante: se entra
 * 22 ms antes de ella (`INICIO_MUSICA` = 10 f = 0,333 s) para que suene en el frame 2 y el frame 0 no abra con un silencio. Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el
 * instante es el de «empieza a subir»): `proyectos/055/musica/golpes-055.json` (`medir-pista.py --json`). La nota de entrada (0,355 s) se midió directamente sobre la energía a 2 ms: sube de −59 a −17 dBFS en 20 ms
 * (el detector, que mide contra una ventana de silencio digital, la da en 0,000 s con 64 dB).
 */
export const GOLPE = {
  /** La primera nota de la canción: el frame 2 (la apertura, a corte; no nace de negro). */
  apertura: { t: 0.355, db: 42 },
  /** Entra Isabella con el hook: la música baja en los 8 f siguientes y su primera sílaba suena 8,25 f después. */
  hook: { t: 3.336, db: 15.2 },
  /** Acaba el hook (la cámara se fue al césped y al cielo): entra el primer recorrido. */
  paseo: { t: 8.879, db: 12.2 },
  /** Del sendero y la pérgola al reflejo del sol bajo ella y al jardín. */
  jardin: { t: 12.958, db: 10.3 },
  /** Del jardín a la casa blanca al fondo del césped. */
  casa: { t: 15.656, db: 10.2 },
  /** Entra Isabella con la mitad, en la puerta. */
  mitad: { t: 18.345, db: 13.0 },
  /** Acaba la mitad (la cámara ya recorrió la sala hasta la cocina): entra el segundo recorrido. */
  cocina: { t: 23.431, db: 19.0 },
  /** De la cafetera a la escalera y la doble altura. */
  escalera: { t: 26.078, db: 11.1 },
  /** De la escalera a la puerta de la alcoba. */
  puerta: { t: 28.485, db: 12.7 },
  /** De la puerta a la vista: el plano más largo del bloque 5. */
  vista: { t: 31.334, db: 11.2 },
  /** El golpe de 27,4 dB: entra Isabella con el CTA (su primera sílaba, 7,75 f después). */
  cta: { t: 35.095, db: 27.4 },
} as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: 10 f exactos (1/3 s) para que `trimBefore` no lo mueva. Su primera nota (0,355 s de la canción) cae así en el frame 0,65 y, con el retardo del
 * audio del render, SUENA en el frame 2.
 */
export const INICIO_MUSICA = 10 / FPS_055;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_055;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_055;

/** Isabella: un empuje lento hacia ella (camina hacia cámara en el hook; el CTA y la mitad, un respiro). Los recorridos y el dron, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-055/${id}.mp4`;
const a = (id: string): string => `recorrido-055/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE del canal: contraste con cuerpo, negros hundidos, luces recogidas (los cielos y los ventanales son lo primero que se quema), un punto cálido y algo de viveza. Orden del efecto: exposición → balance
 * de blancos → sombras/luces/blancos/negros → contraste → saturación → vibrance. `vibrance` ≤ 0,05 (sobre hormigón gris pinta un moteado de colores y vuelve rosadas las nubes) y las tomas de Isabella,
 * `saturation` ≤ 1,06: la piel se queda donde estaba. El AJUSTE de cada plano se mide (`herramientas/medir-color.py`), no se hereda.
 */
const COLOR_BASE: ColorCine = {
  contrast: 1.1,
  blacks: -0.06,
  shadows: 0.08,
  highlights: -0.2,
  whites: -0.05,
  temperature: 0.03,
  saturation: 1.06,
  vibrance: 0.02,
};

/** El color de un plano: la base más el ajuste de su toma (medido, `medir-color.py`). */
const color = (ajuste: ColorCine = {}): ColorCine => ({ ...COLOR_BASE, ...ajuste });

/**
 * Los frames de cada cambio de plano: todos los cortes son SECOS y caen en el frame en que SUENA su golpe (`golpe()`, que suma el retardo del audio del render). El último, el del CTA, es el del golpe de 27,4 dB.
 */
const P = {
  hook: golpe(GOLPE.hook), //         92 · entra Isabella; su primera sílaba suena 8,25 f después
  paseo: golpe(GOLPE.paseo), //       258 · acaba el hook (su última palabra, en f225,5; la música sube en 24 f y llega arriba 8 f antes del golpe)
  jardin: golpe(GOLPE.jardin), //     380
  casa: golpe(GOLPE.casa), //         461
  mitad: golpe(GOLPE.mitad), //       542 · entra Isabella; su primera sílaba, 7,55 f después
  cocina: golpe(GOLPE.cocina), //     695 · acaba la mitad (su última palabra, en f623,5)
  escalera: golpe(GOLPE.escalera), //  774
  puerta: golpe(GOLPE.puerta), //     846
  vista: golpe(GOLPE.vista), //       932 · la vista, el plano más largo del bloque 5 (112 f)
  cta: golpe(GOLPE.cta), //           1044 · entra Isabella; su primera sílaba, 7,75 f después
} as const;

/**
 * Frames que dura la toma del CTA: su voz acaba en el f1127,5 de la comp (3,0 s del clip; `desde` 5 f) y la toma sigue 13,5 f más (la imagen de Isabella, que se queda mirando a cámara un instante) antes de
 * fundir a negro en los últimos 6. El clip dura 7,24 s: la toma NO se acaba aquí, se corta; nada se congela.
 */
const DUR_CTA = 97;

/**
 * Dónde acaba la música (frame de la comp): se apaga con curva y llega a cero EN la última palabra de Isabella (la tarjeta queda en silencio).
 */
export const FIN_MUSICA_055 = 1128;

export const metraje055: readonly Corte[] = [
  // ── Bloque 1 · la aérea ──
  {
    id: "c01-dron",
    bloque: 1,
    tipo: "video",
    src: v("dr70"),
    // DJI_…0070_D (4K vertical, SDR; último tercio del clip, 68-103 s: el reparto se lo da a esta versión), tramo 14,0-17,07 s del archivo normalizado (= 82,0-85,1 s del original): la casa de lado con su seto en V,
    // sus plantas, su muro de piedra y su cubierta de teja, y el carro bajo el balcón. Movimiento 4,05 (dispersión 0,17: de los tramos con la casa, el más parejo). Entra a corte; la primera nota suena en el f2.
    desde: 14.0,
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.4, shadows: 0.12, highlights: -0.3 }),
    reason:
      "La casa vista desde el aire, de lado: su seto en V, su piedra y su cubierta de teja (la promesa). Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia.",
  },
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk02"),
    audio: a("hk02-voz"),
    voz: { s0: 0.675, s1: 4.85, lufs: -15, dice: "Imagina tus mañanas en este espacio, disfrutando del aire puro del oriente antioqueño." },
    // La voz empieza a los 0,675 s (el arranque de la «I»; valle de −59 dB antes) y acaba a los 4,85 s; el clip dura 9,87 s. `desde` 0,4 s (12 f) entra A CORTE en el golpe del f92 y la primera sílaba suena 8,25 f
    // después: la música baja en esos 8 f. El plano dura 166 f (hasta el golpe de 12,2 dB del f258, 1,0 s tras su última palabra: la música sube en 24 f y el golpe suena entero). Hacia el segundo 4,5 del clip la
    // cámara deja a Isabella y se va al césped y al cielo mientras dice «aire puro»: eso es lo que se ve en los últimos 1,2 s del plano.
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-055.ts`): «antioqueño» (whisper oye «entrequeño») y «oriente».
    desde: fr(12),
    en: P.hook,
    dur: P.paseo - P.hook,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ exposure: 0.1, contrast: 1.04, highlights: -0.4, whites: -0.15, saturation: 1.02, vibrance: 0 }),
    reason:
      "Jardín con la pérgola detrás (el hook): Isabella camina hacia cámara y propone imaginar las mañanas aquí, con el aire puro del oriente antioqueño; al decirlo, la cámara se va al césped y al cielo. Entra a corte en el golpe de 15,2 dB y la música baja antes de su primera palabra.",
  },
  // ── Bloque 3 · el recorrido: el sendero y la pérgola → el sol bajo la pérgola y el jardín → la casa blanca al fondo del césped ──
  {
    id: "c03-sendero",
    bloque: 3,
    tipo: "video",
    src: v("rc22"),
    // RC22, tramo 2,6-6,67 s: el sendero de grava que bordea la casa, con el sol entre los árboles, y la llegada a la pérgola y a las sillas de la terraza. Corta en el golpe de 10,3 dB del f380.
    desde: 2.6,
    en: P.paseo,
    dur: P.jardin - P.paseo,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.3 }),
    reason:
      "Sendero lateral y terraza (RC22): del jardín del hook se entra por el sendero de grava, con el sol entre los árboles, hasta las sillas bajo la pérgola; donde se desayunaría. Corta en el golpe de 10,3 dB.",
  },
  {
    id: "c04-pergola",
    bloque: 3,
    tipo: "video",
    src: v("rc23"),
    // RC23, tramo 3,0-5,7 s: el sol que pega en el piso bajo las láminas de la pérgola y, al girar, el césped con los árboles y las nubes. Corta en el golpe de 10,2 dB del f461.
    desde: 3.0,
    en: P.jardin,
    dur: P.casa - P.jardin,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.4, contrast: 1.02, shadows: 0.35, blacks: 0 }),
    reason:
      "Bajo la pérgola (RC23): la luz del sol entra entre sus láminas y la cámara sale al césped, a los árboles y a las nubes; el aire abierto de las mañanas. Corta en el golpe de 10,2 dB.",
  },
  {
    id: "c05-casa",
    bloque: 3,
    tipo: "video",
    src: v("rc24"),
    // RC24, tramo 1,2-3,9 s: la casa blanca al fondo del césped, con el cielo de nubes y claros, en un giro lento. Corta en el golpe de 13,0 dB del f542, donde entra Isabella con la mitad.
    desde: 1.2,
    en: P.casa,
    dur: P.mitad - P.casa,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.05 }),
    reason:
      "La casa desde el jardín (RC24): ya se vio por dentro de la pérgola y ahora se ve entera, blanca al fondo del césped bajo un cielo abierto; lo que se va a abrir en la puerta. Corta en el golpe de 13,0 dB, donde entra la mitad.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c06-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md03"),
    audio: a("md03-voz"),
    voz: { s0: 1.785, s1: 4.25, lufs: -15, dice: "No es solo una casa, es una declaración de estilo." },
    // La voz va de 1,785 a 4,25 s. `desde` 1,533 s (46 f) entra A CORTE en el golpe del f542 y la primera sílaba suena 7,55 f después. Isabella, en la puerta de entrada ya abierta, dice la frase y entra al recibidor;
    // tras su última palabra (f623,5) la cámara sigue por la sala, con su ventanal abierto al jardín (plano hasta el golpe de 19,0 dB del f695, donde el corte pasa a la cocina).
    desde: fr(46),
    en: P.mitad,
    dur: P.cocina - P.mitad,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ exposure: 0.3, highlights: -0.35, whites: -0.1, saturation: 1.02, vibrance: 0 }),
    reason:
      "Puerta de entrada (MD03): Isabella la abre y entra al recibidor diciendo que no es solo una casa, sino una declaración de estilo; la cámara sigue por la sala y su ventanal abierto al jardín. Entra a corte en el golpe de 13,0 dB.",
  },
  // ── Bloque 5 · el recorrido: la cafetera → la escalera y la doble altura → la puerta de la alcoba → el balcón y el cielo (la vista) ──
  {
    id: "c07-cafetera",
    bloque: 5,
    tipo: "video",
    src: v("rc20"),
    // RC20, tramo 3,03-5,66 s: la cafetera sobre el mesón negro, junto a la ventana, y la nevera. Entra a corte en el golpe de 19,0 dB del f695 (el segundo recorrido abre con el drop de la canción).
    desde: 3.03,
    en: P.cocina,
    dur: P.escalera - P.cocina,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.15 }),
    reason:
      "Cocina (RC20): la cafetera sobre el mesón, a la luz de la ventana; donde empieza la mañana. Tras la sala de la mitad, la cocina: arranca el segundo recorrido, en el golpe de 19,0 dB.",
  },
  {
    id: "c08-escalera",
    bloque: 5,
    tipo: "video",
    src: v("rc01"),
    // RC01, tramo 1,2-3,6 s: el pie de la escalera de acero, con su muro de piedra y la baranda de vidrio del entrepiso, y la cámara que sube hacia las vigas de la doble altura, la cocina y el comedor. Corta en el golpe
    // de 12,7 dB del f846.
    desde: 1.2,
    en: P.escalera,
    dur: P.puerta - P.escalera,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.3 }),
    reason:
      "Escalera y doble altura (RC01): del pie de la escalera de acero, con su muro de piedra y su baranda de vidrio, la cámara sube hacia las vigas; la casa se abre hacia arriba, donde está la alcoba. Corta en el golpe de 12,7 dB.",
  },
  {
    id: "c09-puerta",
    bloque: 5,
    tipo: "video",
    src: v("rc19"),
    // RC19, tramo 1,5-4,37 s: del sofá de la sala de arriba a la puerta de madera de una alcoba, que se abre sobre un piso de madera bañado de sol, con la ventana corrediza al fondo. Corta en el golpe de 11,2 dB del f932.
    desde: 1.5,
    en: P.puerta,
    dur: P.vista - P.puerta,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: -0.3 }),
    reason:
      "Puerta de la alcoba (RC19): arriba, de la sala de estar a la puerta de madera que se abre sobre un piso bañado de sol; el puente entre la casa y la alcoba. Corta en el golpe de 11,2 dB.",
  },
  {
    id: "c10-vista",
    bloque: 5,
    tipo: "video",
    src: v("rc09"),
    // RC09, tramo 4,4-8,13 s: la alcoba con el ventanal corredizo abierto, el paso al balcón y el cielo de nubes y claros sobre las casas, la calle y los árboles. El plano más largo del bloque (112 f). Corta en el golpe
    // de 27,4 dB del f1044, donde entra el CTA.
    desde: 4.4,
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "corte",
    color: color({ exposure: 0.1 }),
    reason:
      "Alcoba y balcón (RC09, la vista): se abre el ventanal corredizo y se sale al balcón, al cielo abierto; el aire de las mañanas, que prometía el hook. El plano más largo del bloque. Corta en el golpe de 27,4 dB, donde entra el CTA.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c11-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct03"),
    audio: a("ct03-voz"),
    voz: { s0: 0.425, s1: 2.95, lufs: -15, dice: "Si estás pensando en cambiar tu estilo de vida, ¡hablemos!" },
    // La voz va de 0,425 a 2,95 s. `desde` 0,167 s (5 f) entra A CORTE en el golpe de 27,4 dB (f1044) y la primera sílaba suena 7,75 f después. Isabella, en la cocina, de cara a cámara. POR CONFIRMAR AL OÍDO:
    // «hablemos» (whisper oye «hablimos»). La imagen funde a negro 13,5 f tras la última palabra y entra la tarjeta.
    desde: fr(5),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ exposure: -0.3, saturation: 1.02, vibrance: 0, highlights: -0.3 }),
    reason:
      "Cocina (CT03): Isabella, de cara a cámara en la cocina, pide una sola acción: hablar. Entra a corte en el golpe de 27,4 dB de la canción y su imagen funde a negro 13,5 f después de la última palabra.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  {
    id: "c12-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-055/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c11
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason: "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web en silencio.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c12). */
export const DURACION_055 = P.cta + DUR_CTA + DUR_TARJETA;
