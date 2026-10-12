/**
 * EL RECORRIDO 023 — «One Living · Envigado», SEGUNDO REEL DE ESTA PROPIEDAD (V7 del registro) — los planos, como DATOS.
 *
 * Misma casa que el 022 (V6), mismo material (26 clips, sin dron), otras tres tomas de Isabella y otra canción. El formato es el mismo
 * (`recorrido-luxur`, seis bloques; reglas fijas del canal en su `SKILL.md` §0).
 *
 * LA PIEZA ABRE CON EL HOOK, como la V6 (pedido del usuario en aquella: «como esta propiedad no tiene dron empecemos directamente con el hook»).
 * Rompe a propósito la regla fija «la primera toma sale sin texto ni voz»: la excepción está declarada en la puerta (`ABRE_CON_EL_HOOK`) y en el registro.
 *
 * LA IDEA: «las dos habitaciones, cada una en su extremo, y la sala en el centro». El hook habla del uso («para vivir o considerar para renta
 * corta»); el paseo va a un extremo (la alcoba secundaria, su baño y su vestier); Isabella, en la sala, resume («dos habitaciones independientes,
 * balcón y ubicación junto a City Plaza»); el segundo paseo va al otro extremo (la alcoba principal), cruza la cocina y la sala y sale al balcón; y
 * ella cierra en el balcón: «si te gusta esta vista, contáctanos y agendemos una visita». La ficha dice que el plano de la tipología pone «las dos
 * habitaciones en extremos opuestos, con la zona social en el centro»: de ahí el orden.
 *
 *   hook      HK3   SALA      «Si quieres un apartamento para vivir o considerar para renta corta, mira esto.»
 *   mitad     MD3   SALA      «Cuenta con dos habitaciones independientes, balcón y ubicación junto a City Plaza.»
 *   CTA       CT2   BALCON    «Si te gusta esta vista, contáctanos y agendemos una visita.»
 *
 * DOS sitios, no tres: SALA y BALCON. Sin HK4 ni CT3 (que prometen valorización y rentabilidad) el piso no da un tercero; el usuario lo aceptó
 * el 2026-10-06 («SALA · SALA · BALCON, con planos distintos»). OK del usuario ese día a HK3 (el reglamento permite la renta corta) y a CT2 (Luxur
 * agenda visitas). NINGUNA cifra en la pieza (HK1, la del «76», no se usa).
 *
 *   bloque 2  c02              Isabella en la sala: el hook (HK3), A CORTE EN EL FRAME 0 (empieza en la hornilla y ella camina hacia la cámara)
 *   bloque 3  c03 c04 c05 c06  el paseo al extremo de la alcoba secundaria: su ventanal con las montañas (RC15), las puertas del baño y el vestier
 *                              (RC11), el vestier (RC15) y el baño (RC03)
 *   bloque 4  c07              Isabella en la sala: la mitad (MD3)
 *   bloque 5  c08 c09 c11 c12  el otro extremo y de vuelta al centro: la alcoba principal (RC08), la cocina de isla (RC09), el balcón y el cielo (RC14) y la
 *                              vista (RC12: la más larga). No hay c10: la sala hacia el balcón (RC09) se quitó al cambiar de canción (no se renumeraron los demás)
 *   bloque 6  c13 c14          Isabella en el balcón: el CTA (CT2); y la tarjeta oscura del cierre (nada se congela)
 *
 * COMPARTE CON LA V6 (declarado; la puerta lo mide contra `VERSIONES_ANTERIORES`): UN plano, el de la vista (RC12, de 8,2 a 11,3 s; la V6 usó de 7,87 a 11,3 s: 3,1 s solapados). RC15 se usa en otro
 * tramo (V6 0,4-4,97 s; aquí 5,0-8,1 y 14,3-17,4 s). RC09, RC14, RC03, RC08 y RC11 no los tocó. La cocina de RC09 es otro clip que la de RC06/RC05 de la V6. El baño sec. (RC03)
 * y el de la V6 (RC02, el principal) son dos baños. Sí se parece: el vestier de RC15 (alcoba secundaria) y el RC16 de la V6 (el principal) son dos vestieres.
 *
 * QUIÉN MARCA EL TIEMPO: LA MÚSICA, POR GOLPES. «Yeshua (Versión Piano)» NO tiene pulso: son notas de piano; se corta sobre los GOLPES MEDIDOS (`medir-pista.py`, ≥ 6 dB) y se comprueba sobre el audio del
 * render (`herramientas/golpes-render.py`, R33). Todos los `en` salen de `golpe(...)`: mover la entrada de la música es cambiar `INICIO_MUSICA`.
 * LA CANCIÓN CAMBIÓ DOS VECES. La primera idea, *Deep Breath* (ambient), se midió y se descartó (18 golpes en 47 s y una caída que no llega a −20 dB). La segunda, *La Isla Bonita* (saxofón), se usó en
 * las rev. 0-2 y el usuario la quitó: «es muy playera». *Yeshua (Versión Piano)* es la única libre cuya resolución cae del todo (a silencio) bajo un CTA a ≈ 30 s del paseo y que da una rejilla de cortes con
 * los planos del bloque 5 de 2,1-3,3 s (se buscó con un script sobre los golpes medidos de cada canción libre: la mayoría no deja ninguna).
 *
 * LA RESOLUCIÓN. La canción suena plana (−14,8 LUFS, piano) hasta los 452,5 s y entonces cae: la nota de 452,9 s baja de −16,4 a −30,9 dB y el piano se apaga a silencio hacia los 460 s
 * (`curva.py`). La toma del CTA entra en el último golpe de la meseta (452,528 s) y la caída cae dentro de ella; la cola se apaga bajo la tarjeta.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(28)` = 28/30 s) para que imagen y voz corten en la MISMA muestra;
 * `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS: cada `en` es el fin del anterior.
 *
 * TRANSICIONES. El hook abre la pieza a corte (frame 0). Cortes secos solo donde el salto de luma entre el último fotograma de un plano y el primero del siguiente
 * es pequeño (≤ ±8: solo alcoba → puertas); donde pasa de ±8 (la medida de `medir-color.py`: hasta +42 de la sala al balcón, −28 del baño a la
 * sala de Isabella) el plano ENTRA CON DISOLVENCIA de 12 f que acaba en el golpe, con `desde` ≥ 12 f, y no se gradúa más. La mitad también: su primera palabra (1,09 s del clip)
 * suena a los 17,7 f del golpe aunque `desde` sea 15 f, con la curva de la música ya acabada. Y el CTA entra disolviendo desde la vista. Nada más.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con
 * `herramientas/medir-color.py`. Dos fuentes (Isabella en HLG tone-mapeado, recorridos en SDR). Con `color` el render lleva `--gl=angle` y la prueba se
 * hace a escala 1 reducida con ffmpeg.
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-023.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-023";

export const FPS_023 = 30;

export type Entrada = "corte" | "disolver";
export type Bloque = 1 | 2 | 3 | 4 | 5 | 6;

/** Dónde habla Isabella en SU clip y a qué nivel. Medido con `limites-voz.py` y ebur128, no estimado. */
export interface VozDelCorte {
  /** Segundo de la fuente en que empieza a hablar. */
  s0: number;
  /** Segundo de la fuente en que termina de hablar. */
  s1: number;
  /** Sonoridad integrada de la voz (LUFS) en esa ventana. */
  lufs: number;
  /** Lo que dice, tal como está en el guion. Solo para leer el plan. */
  dice: string;
}

export interface Corte extends CorteDelFormato<Entrada> {
  /** `foto` solo para la tarjeta oscura del cierre (`c14-cierre`: un negro liso). Nada se congela. */
  tipo: "video" | "foto";
  /** A qué bloque del guion pertenece: la puerta comprueba el orden y el tope de cada uno. */
  bloque: Bloque;
  /** Solo las tomas de Isabella cuya voz entra con su imagen: el WAV de su voz, sin tratar. */
  audio?: string;
  voz?: VozDelCorte;
}

/**
 * EL NIVEL DE LA VOZ (revisión 4, pedido del usuario: «necesito que la voz cuando habla Isabella tenga más decibeles sin saturar»). Hasta la revisión 3 cada toma iba a −21 LUFS con UNA ganancia (R29):
 * sonaba 6 dB por debajo de la música sola (−15). Ahora cada toma pasa por la cadena de `normalizar.mjs` (`VOZ_TRATADA`: graves · puerta suave · compresor 3:1 · +15 dB · limitador a −2,5 dBFS) y
 * suena desde `<toma>-voz.wav`; el WAV crudo sigue ahí para medir la voz. Las tres tomas crudas medían −22,0 · −21,6 · −19,7 LUFS; tratadas, −15,3 · −14,9 · −14,9 LUFS (`lufs` de abajo) con el pico real en
 * −2,5 dBFS, y la ganancia que sigue (`vocesDeCortes`) es de +0,3 · +0,1 · +0,1 dB: el nivel objetivo es el de la música sola. EXCEPCIÓN DECLARADA a R29 («una ganancia por toma y nada más»).
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Yeshua (Versión Piano)» — `Music/Yeshua (Versión Piano).mp3` (sha 8 `7bd0eb6f`), piano solo, 7:44. Se usa desde 419,37 s (su paseo empieza en el golpe de 424,837 s, 11,9 dB) y de ahí suena −14,8 LUFS,
 * sin crescendo, hasta su caída final en 452,9 s. Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de «empieza a subir») en que entra cada plano, con su
 * fuerza en dB por 15 ms. `proyectos/023/musica/golpes-023.json`.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el MISMO del paseo (f166): lo que se oye en el hook es la música que lo precede, baja bajo su voz. */
  apertura: { t: 424.837, db: 11.9 },
  /** El paseo empieza (con una disolvencia, tras el hook) y la canción llega a su primer golpe: el ventanal de la alcoba secundaria. Es el último frame del clip del hook (f166). */
  paseo: { t: 424.837, db: 11.9 },
  /** Las puertas del baño y del vestier (RC11). */
  puertas: { t: 428.287, db: 13.6 },
  /** El vestier (RC15). */
  vestier: { t: 431.2, db: 14.8 },
  /** El baño de la alcoba secundaria (RC03). */
  bano: { t: 433.307, db: 21.0 },
  /** Isabella entra (con una disolvencia que acaba aquí) con la mitad. */
  mitad: { t: 436.754, db: 16.8 },
  /** La alcoba principal (RC08): sale la mitad y empieza el bloque 5. */
  principal: { t: 442.239, db: 11.9 },
  /** La cocina de isla (RC09): el golpe más fuerte de la pieza. */
  cocina: { t: 444.836, db: 25.3 },
  /** El balcón y el cielo, sin ella (RC14). */
  balcon: { t: 446.922, db: 22.0 },
  /** La vista (RC12): el zoom al ventanal. El golpe más débil de la pieza (8,8 dB): es el único que deja a la vista como el plano más largo del bloque. Entra con una disolvencia (el corte seco desde el balcón era un salto de luma de −20) y por eso esta pieza baja de 9 a 8,5 dB el mínimo de golpe de una disolvencia (`FUERZA_MIN_DISOLVER` de la puerta). */
  vista: { t: 449.188, db: 8.8 },
  /** Isabella entra (la disolvencia acaba aquí) con el CTA: el último golpe antes de la caída final de la canción, que cae dentro de su toma. */
  cta: { t: 452.528, db: 15.5 },
} as const;

/**
 * LA CAÍDA FINAL de la canción: la meseta de piano (−14,8 LUFS, sin crescendo) acaba hacia los 452,5 s; la nota de 452,9 s baja de −16,4 a −30,9 dB (RMS de 1 s) y el piano se apaga hasta el silencio
 * digital hacia los 460 s (`curva.py`). `t` es el instante de esa nota (453,0 s): ebur128 sobre `musica-023.wav`, tramos de 5 s, da −14,5 antes, −25,2 en los 5 s siguientes
 * (−10,7) y −37,4 en los 5 s tras ellos (−22,9 a los 10 s). Con `t` 452,6 s el primer tramo cae solo 8,5 dB: se declara el instante de la caída y no uno anterior. No es un golpe sino un cambio de
 * nivel: la resolución de esta pieza, como la caída a un lecho del 018 y el 019.
 */
export const DECAE = { t: 453.0, lufsAntes: -14.5, lufs5s: -25.2, lufs10s: -37.4 } as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente. REVISIÓN 1 (pedido del usuario, en dos pasos: «empieza la canción 6 segundos después y el vídeo del hook empiézalo justo antes de que Isabella empiece a hablar»
 * y «no lo dejes mudo al principio: era que lo empezaras 6 segundos después pero corriendo el audio para que suene desde el principio»): el golpe de entrada de la canción (185,390 s) cae donde empieza el paseo,
 * a los 5,5 s (f166: el hook empieza 15 f más tarde en su clip), y la música suena ya desde el f0, baja bajo la voz del hook. El número es el segundo de la fuente que cae en el f0: 5397/30, un frame
 * entero para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 12581 / FPS_023;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y
 * confirmado desde el 017). Se suma aquí y en la puerta para que el corte caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_023;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_023;

/** Isabella: un empuje lento hacia ella. El recorrido, quieto: la cámara ya avanza. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-023/${id}.mp4`;
const a = (id: string): string => `recorrido-023/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE de Luxur, la del 017: contraste con cuerpo, negros hundidos, luces recogidas, un punto cálido y +10 % de saturación. Orden del efecto:
 * exposición → balance de blancos → sombras/luces/blancos/negros → contraste → saturación → vibrance. `vibrance` ≤ 0,05 y las tomas de Isabella,
 * `saturation` ≤ 1,06 (la piel se queda donde estaba). Salió de material HLG tone-mapeado; los recorridos de esta casa son SDR: los ajustes de cada plano
 * parten de los de la V6 y se miden otra vez (`proyectos/023/herramientas/medir-color.py`).
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
 * El frame de cada cambio de plano: el del golpe de la canción en que entra (arriba). Los cortes SECOS y las entradas de Isabella caen en un golpe medido.
 */
const P = {
  paseo: golpe(GOLPE.paseo), //         166 · el ventanal de la alcoba secundaria y la entrada de la canción (el hook ocupa f0-166: lo que queda de su clip desde `desde` 15 f)
  puertas: golpe(GOLPE.puertas), //     259 · las puertas del baño y el vestier
  vestier: golpe(GOLPE.vestier), //     377 · el vestier
  bano: golpe(GOLPE.bano), //           484 · el baño
  mitad: golpe(GOLPE.mitad), //         531 · Isabella en la sala
  principal: golpe(GOLPE.principal), // 694 · la alcoba principal
  cocina: golpe(GOLPE.cocina), //       764 · la cocina
  balcon: golpe(GOLPE.balcon), //       el balcón y el cielo
  vista: golpe(GOLPE.vista), //         975 · la vista
  cta: golpe(GOLPE.cta), //            1067 · Isabella con el CTA (la disolvencia ocupa f1055-1067)
} as const;

/**
 * Frames que dura la toma del CTA (CT2): el clip dura 4,88 s (146 f) y desde `desde` (12 f) le quedan 134 (el WAV de su voz dura 1 f menos que el vídeo: 133).
 * Su voz acaba a los 4,26 s: la última palabra suena en f1246 y esta toma llega a f1263: 17 f (0,57 s) de su cara tras ella, en los que la imagen funde a negro.
 * Nada se congela.
 */
const DUR_CTA = 133;

/**
 * Dónde acaba la música (frame de la comp). El fundido final llega a −35 dB hacia los 225 s (f1368 de la canción... ya fuera de la pieza): la envolvente la
 * lleva a cero 2 f antes del final, bajo la tarjeta.
 */
export const FIN_MUSICA_023 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje023: readonly Corte[] = [
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk3"),
    audio: a("hk3-voz"),
    voz: {
      s0: 0.72,
      s1: 5.19,
      lufs: -15.3,
      dice: "Si quieres un apartamento para vivir o considerar para renta corta, mira esto.",
    },
    // HK3 trae 0,72 s (21,6 f) de aire antes de su primera palabra y dura 6,04 s (181 f). REVISIÓN 1 (pedido del usuario: «el video del hook empiézalo justo antes de que Isabella empiece a hablar»): ENTRA A CORTE en el frame 0 con `desde` 15 f (0,5 s):
    // la primera palabra suena a los 6,6 f (la imagen ya es opaca) y el clip llega hasta el f166, el golpe en que entra la canción (la última palabra suena en f141). Empieza en la hornilla
    // y la campana en primer plano; la cámara avanza de la cocina a la sala y ella, al fondo en el ventanal, camina hacia la cámara.
    desde: fr(15),
    en: 0,
    dur: P.paseo,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ saturation: 1.02 }),
    reason:
      "Sala (el uso): la cocina abierta pasa a la sala, Isabella al fondo ante el ventanal, y dice «si quieres un apartamento para vivir o considerar para renta corta, mira esto»: la casa primero y la persona después. Entra a corte en el frame 0.",
  },
  // ── Bloque 3 · el paseo al extremo de la alcoba secundaria ──
  {
    id: "c03-alcoba",
    bloque: 3,
    tipo: "video",
    src: v("rc15"),
    // RC15 «sala, habitacion secundaria, vestier», de 5,0 a 8,1 s: la alcoba secundaria con su ventanal y las montañas (la V6 usó de 0,4 a 4,97 s: la entrada desde la sala).
    desde: fr(150),
    en: P.paseo,
    dur: P.puertas - P.paseo,
    zoom: QUIETO,
    entra: "disolver",
    color: color(),
    reason:
      "Alcoba secundaria (el extremo): de la sala a un extremo de la casa; el ventanal con las montañas y la ciudad, la luz de la habitación.",
  },
  {
    id: "c04-puertas",
    bloque: 3,
    tipo: "video",
    src: v("rc11"),
    // RC11 «habitacion secundaria - paneo», de 8,3 a 12,2 s: la cámara se acerca a las puertas abiertas del baño y del vestier, con la luz encendida.
    desde: fr(249),
    en: P.puertas,
    dur: P.vestier - P.puertas,
    zoom: QUIETO,
    entra: "corte",
    // Las puertas de madera dan 0,38 de saturación con la base (el resto, 0,2-0,3): se le quita la viveza de la base.
    color: color({ saturation: 1.0 }),
    reason:
      "Baño y vestier (lo que hay dentro): las dos puertas abiertas con la luz encendida; la cámara se acerca despacio.",
  },
  {
    id: "c05-vestier",
    bloque: 3,
    tipo: "video",
    src: v("rc15"),
    // RC15, de 14,3 a 17,4 s: la puerta del baño con el lavamanos y, al final, el vestier de madera con cajones y barra (el clip dura 17,7 s).
    desde: fr(429),
    en: P.vestier,
    dur: P.bano - P.vestier,
    zoom: QUIETO,
    entra: "disolver",
    // La madera del vestier es el plano más saturado de la pieza (0,53 con la base, frente a 0,2-0,3 de los demás; el vestier de la V6 era de 0,34): se baja al mínimo que admite la puerta (0,95: 0,45 medido; la madera de un vestier es así).
    color: color({ saturation: 0.95 }),
    reason:
      "Vestier de la alcoba secundaria (cómo se vive): los cajones y la barra de madera; cuenta lo que se guarda antes de lo que se mira.",
  },
  {
    id: "c06-bano",
    bloque: 3,
    tipo: "video",
    src: v("rc04"),
    // RC04 «bano habitacion secundaria», de 0,4 a 3,8 s (`desde` 12 f: el clip de la disolvencia): el baño con la puerta abierta, el lavamanos de sobreponer sobre mueble de madera, la ducha de vidrio y el sanitario.
    // (RC03, «paneo hacia habitacion», se probó primero: a los 3 s el plano cruza la puerta y sale a la alcoba, y el plano acababa con el marco de la puerta delante.)
    desde: fr(12),
    en: P.bano,
    dur: P.mitad - P.bano,
    zoom: QUIETO,
    entra: "disolver",
    color: color(),
    reason:
      "Baño de la alcoba secundaria (lo privado): la ducha de vidrio y el lavamanos; cada habitación con el suyo, sin Isabella delante.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c07-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md3"),
    audio: a("md3-voz"),
    voz: {
      s0: 1.09,
      s1: 5.38,
      lufs: -14.9,
      dice: "Cuenta con dos habitaciones independientes, balcón y ubicación junto a City Plaza.",
    },
    // La voz empieza a los 1,09 s (32,7 f): `desde` 15 f (0,5 s) entra a CORTE en el golpe del f546 (suena entero: la música baja en los 10 f siguientes) y la primera palabra suena a los 17,7 f
    // del golpe, con la curva ya acabada. La última palabra acaba en f692,4; el bloque 5 entra a corte en el golpe del f709 y deja 14 f para que la música suba con fundido. El clip llega a f713 (15 + 163 = 178 de 182).
    desde: fr(15),
    en: P.mitad,
    dur: P.principal - P.mitad,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ saturation: 1.02 }),
    reason:
      "Sala (lo social, el centro): Isabella en la sala con la corredera del balcón a la derecha, entre las dos habitaciones que acabamos de ver y las que faltan; resume lo que la casa da: dos habitaciones independientes, balcón y City Plaza.",
  },
  // ── Bloque 5 · el otro extremo, la cocina, la sala y la vista ──
  {
    id: "c08-principal",
    bloque: 5,
    tipo: "video",
    src: v("rc08"),
    // RC08 «habitacion principal - paneo 2», de 4,2 s en adelante (los primeros 4 s son el cielo y el marco del ventanal): la alcoba principal con el mueble blanco empotrado, el techo de concreto y las puertas del baño y el vestier al fondo.
    // (RC07, «entrando», se probó primero: su alcoba solo se ve desde los 7 s, tras una puerta y una columna.)
    desde: fr(126),
    en: P.principal,
    dur: P.cocina - P.principal,
    zoom: QUIETO,
    entra: "disolver",
    color: color(),
    reason:
      "Alcoba principal (el otro extremo): la habitación grande con el mueble blanco empotrado y el techo de concreto; es el espacio de descanso del lado opuesto.",
  },
  {
    id: "c09-cocina",
    bloque: 5,
    tipo: "video",
    src: v("rc09"),
    // RC09 «habitacion principal - paneo» (la caminata larga), de 20,4 s: la cocina con la isla, la estufa de cuatro puestos y la campana: la mejor imagen de la cocina del rodaje.
    desde: fr(612),
    en: P.cocina,
    dur: P.balcon - P.cocina,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ shadows: 0.14, blacks: -0.04 }),
    reason:
      "Cocina (la barra): la isla con la estufa y la campana, de camino a la sala; lo que la ficha destaca y que no se ha visto de cerca.",
  },
  {
    id: "c11-balcon",
    bloque: 5,
    tipo: "video",
    src: v("rc14"),
    // RC14 «recorrido caminando» (el clip largo, HLG tone-mapeado), de 13,7 s: el balcón con el cielo, las nubes, la ciudad y los tejados. Tramo limpio: Isabella sale de cuadro hacia los 12 s y vuelve a los 16,5; antes de los 13,5 s la baranda lleva una cinta
    // negra en primer plano. Solo hay 2,7 s así: por eso este plano no es el más largo del bloque (la vista, RC12, lo es). RC01 («balcon - paneo») se probó primero: su malla negra entra en cuadro desde los 3 s.
    desde: fr(410),
    en: P.balcon,
    dur: P.vista - P.balcon,
    zoom: QUIETO,
    entra: "disolver",
    color: color(),
    reason:
      "Balcón (el cielo): las nubes, la ciudad y los tejados desde el balcón, sin Isabella; el aire de fuera después de lo cerrado de las habitaciones.",
  },
  {
    id: "c12-vista",
    bloque: 5,
    tipo: "video",
    src: v("rc12"),
    // RC12 «habitacion secundaria - zoom in ventanal», de 8,0 s hasta el último fotograma (11,3 s): el zoom hacia el ventanal: el marco negro se abre al cielo, las nubes, la ciudad y los tejados rojos. ES EL TRAMO QUE CERRABA LA V6 (7,87-11,3 s) y
    // se REPITE (declarado): es el único plano de vista abierta que dura lo bastante para ser el más largo del bloque (RC14, el balcón, solo tiene 2,7 s limpios y RC01 otros 2,7). Se empieza 0,1 s más tarde que en la V6: el marco negro ya no llena el cuadro.
    desde: fr(239),
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "disolver",
    color: color(),
    reason:
      "Ventanal (la vista): el clímax; el zoom atraviesa el marco negro hacia el cielo y la ciudad, la última imagen de la casa antes del CTA y el plano más largo del bloque. Es el que cerraba la V6.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c13-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct2"),
    audio: a("ct2-voz"),
    voz: {
      s0: 0.95,
      s1: 4.26,
      lufs: -14.9,
      dice: "Si te gusta esta vista, contáctanos y agendemos una visita.",
    },
    // La voz empieza a los 0,95 s (28,5 f; el clic de 70 ms de los 0,03 s queda fuera con `desde` 12 f): la disolvencia (12 f) acaba en el golpe del f1130 (suena entero) y la primera
    // palabra suena a los 16,5 f. La caída final de la canción (la nota de 452,9 s) cae a los 11 f de la entrada, ya dentro de la toma.
    desde: fr(12),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "disolver",
    // Isabella a contraluz en el balcón: su cara mide luma 83 (la de la mitad, 90): se sube la exposición y se abren las sombras sin tocar el cielo.
    color: color({ saturation: 1.02, exposure: 0.1, shadows: 0.18 }),
    reason:
      "Balcón (la vista, dicha): Isabella en el balcón con la ciudad y el cielo detrás, la misma vista que acaba de verse; dice «si te gusta esta vista, contáctanos y agendemos una visita». Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el
  // logo y la web (`cierre-023.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c14-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-023/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c13
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c14). */
export const DURACION_023 = P.cta + DUR_CTA + DUR_TARJETA;
