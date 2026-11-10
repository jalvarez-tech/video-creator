/**
 * EL RECORRIDO 063 — «Lote en San Vicente Ferrer (vereda La Porquera)», V45 del registro, primer reel de este lote (reparto 063-065 rev. 2, `proyectos/063/reparto-063-065.md`) — los planos, como DATOS.
 *
 * REV. 1 (2026-10-22, encargo del usuario, que cambió el material y el planteamiento): «Como el lote no tiene tomas de recorrido, solo de dron, y de mitad solo hay un vídeo, necesito que seas bastante creativo… cuando
 * empieces con la toma del dron, pases al hook, vuelves al dron. O si dice "ven, te muestro cómo", puedes crear unos infográficos y resaltar las amenidades». El usuario dejó solo CUATRO drones, todos verticales: los
 * de esta pieza son DR02 (entero) y el tramo 0-24 s de DR01. El hook sigue entero (la afirmación y su invitación son UNA toma continua); lo que se rehace es lo que viene después de él.
 *
 * Ángulo: «EL ERROR: comprar un lote barato sin los papeles», y su hilo, la CONFIANZA. El aéreo enseña las cercas vivas en «V» (sin texto ni voz) → Isabella plantea el error y su invitación («Ven, te enseño cómo evitar
 * esto») → **vuelve el dron con la INFOGRAFÍA «Lo que sí tiene»** (derecho de acueducto · escrituras al 100 % · 3.244 m², lo que ESTÁ en la ficha de la web) → la mitad, entera, nombra las tres cosas y **los rótulos
 * UBICACIÓN · AGUA · ESCRITURAS aparecen según las dice** → el vuelo sigue hacia lo que rodea el lote y acaba en su vista más abierta → el CTA («¿se ajusta a tu presupuesto? Escríbeme»).
 * Estructura del canal: DRON · HOOK · DRON (+ INFOGRAFÍA) · MITAD · DRON · CTA, con TRES frases de Isabella. ES UN LOTE: no hay recorrido a pie y los bloques de recorrido son tramos de dron.
 *
 *   hook   HK01  `Hook1.mp4`   «El error no es comprar un lote barato, es comprarlo sin todas las acometidas legales. Ven, te enseño cómo evitar esto.»   (la afirmación 0,03-7,74 s y su invitación 7,74-9,60 s, UNA toma)
 *   mitad  MD01  `Medio3.mp4`  «Antes de enamorarte de un lote, empieza con tres cosas: ubicación, agua y escrituras. Y este lote empieza con todas esas cosas sobre la mesa.»   (entera)
 *   CTA    CT02  `cta2.mp4`    «¿Quieres saber si este lote se ajusta a tu presupuesto? Escríbeme y te envío toda la información.»
 *   dron   DR02 (31,2 s, cenital sobre el pasto y las cercas vivas en «V») entero · DR01 (73,5 s) SOLO el tramo 0-24 s: los de la 064 (24-48 s) y la 065 (48-73,5 s) quedan para ellas
 *
 * LAS TOMAS DE ISABELLA SON ANAMÓRFICAS (1920×1080 con SAR 81:256 = verticales 9:16 comprimidas): `normalizar.mjs` las escala ENTERAS a 1296×2304 con `setsar=1` y NO las recorta (un `crop` sería un zoom ×3,2).
 * Ella aparece de cuerpo entero a unos metros de la cámara, así que su imagen es más blanda que la de un iPhone recién grabado (607,5×1080 reales ampliados ×2,13): se declara y no se le añade punch-in.
 *
 * LO QUE LA WEB NO DICE, NO SE DICE. No hay dato de energía, de uso del suelo ni de tipo de vía, y la propia ficha dice que el uso depende de la normativa aplicable: ningún rótulo, ninguna voz y ningún plano lo afirman.
 * La infografía lleva SOLO datos de la ficha (derecho de acueducto incluido, escrituras al 100 %, 3.244 m²) y los rótulos de la mitad son las tres palabras que dice Isabella. El precio (COP 350 M) NO va en el reel:
 * va al caption y a la versión con ficha. «Cifra dicha = cifra escrita»: Isabella no dice ninguna en estas tres frases; la infografía escribe dos (3.244 m² y 100 %), de la ficha, y es un encargo del usuario.
 *
 *   bloque 1  c01                  el lote desde el aire: DR02 16,5 s, el cenital sobre las cercas vivas en «V» que empieza a enseñar la franja amarilla del cultivo vecino; SIN TEXTO NI VOZ
 *   bloque 2  c02                  Isabella en el prado: el hook y su invitación, entera (entra disolviendo; su primera palabra suena a los 12 f del golpe)
 *   bloque 3  c03                  EL DRON VUELVE y con él la INFOGRAFÍA «Lo que sí tiene»: DR02 0,0-7,7 s (el cenital casi quieto, el fondo más tranquilo para leer), a corte desde Isabella; cada ✔ entra en un golpe
 *   bloque 4  c04                  Isabella caminando hacia la cámara: la mitad entera, con los rótulos UBICACIÓN · AGUA · ESCRITURAS a la palabra
 *   bloque 5  c05 c06 c07          el vuelo hacia lo que rodea: DR02 22,0 s (se levanta y enseña la franja amarilla y la tierra) → DR01 14,0 s (el árbol y la cerca viva con el horizonte) → LA VISTA: DR01 20,2 s (la «V» con el
 *                                  horizonte y las lomas; el plano más largo del bloque)
 *   bloque 6  c08 c09              Isabella en el prado: el CTA; y la tarjeta oscura del cierre (nada se congela)
 *
 * QUIÉN MARCA EL TIEMPO. La canción es «Oceans (Where Feet May Fail)» (pop-rock instrumental, PULSO de 132 BPM = 0,4545 s, medido con `rejilla.py`: 98 % de sus golpes fuertes de 154,4 a 182,3 s a ≤ 15 ms de la
 * recta): la rejilla son los golpes MEDIDOS (`musica/golpes-063.json`; `buscar-cortes-063.py`, estructura de 7 planos y 8 cortes) y cada cambio de plano cae en uno (≥ 9,4 dB). La canción CAE de golpe a un lecho
 * suave a los 182,3 s (de −12 a −19 LUFS): el CTA entra en el último golpe fuerte antes de esa caída (181,856 s, 11,7 dB), así que la voz de Isabella queda sobre el lecho y no sobre la meseta.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(75)` = 75/30 s) donde el corte es en la muestra; `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS. Un plano que entra
 * disolviendo (`disolver`) empieza a verse 12 f ANTES de su `en` (`solapeDe`): su clip tiene que tener esos 12 f antes de `desde`, y el plano anterior dura hasta ese `en`.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal). Isabella no habla hasta el f103, 3,4 s después de empezar la pieza.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con `herramientas/medir-color.py`. Con `color` el render lleva `--gl=angle` y la
 * prueba se hace a escala 1 reducida con ffmpeg (`recorrido-luxur/montaje.md` §12).
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-063.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-063";

export const FPS_063 = 30;

export type Entrada = "corte" | "disolver";
export type Bloque = 1 | 2 | 3 | 4 | 5 | 6;

/** Dónde habla Isabella en SU clip y a qué nivel. `s0`/`s1`, medidos por energía (perfil de 20 ms en la banda de voz) y por arranques de sílaba; `lufs`, con ebur128 sobre el WAV TRATADO que suena. */
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
  /** `foto` solo para la tarjeta oscura del cierre (`c09-cierre`: un negro liso). Nada se congela. */
  tipo: "video" | "foto";
  /** A qué bloque del guion pertenece: la puerta comprueba el orden y el tope de cada uno. */
  bloque: Bloque;
  /** Solo las tomas de Isabella: el WAV de su voz TRATADA (`<toma>-voz.wav`, `normalizar.mjs`). */
  audio?: string;
  voz?: VozDelCorte;
}

/**
 * EL NIVEL DE LA VOZ: −15 LUFS, el de la música sola (pedido permanente del canal: «la voz de Isabella a −15 LUFS sin saturar»). Las voces llegan a −21,8 · −23,7 · −20,9 LUFS en su ventana de voz (habla a unos metros
 * de un iPhone); cada una pasa por la cadena de `normalizar.mjs` (graves, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia buscada con `probar-voz.py --umbral 0.0316 --razon 3.5` y limitador a −2,5 dBFS)
 * hasta −15,0 LUFS con el pico real a −2,5 dBFS, así que el plan no añade ganancia (`lufs` = lo medido). Es una excepción declarada a R29, por encargo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Oceans (Where Feet May Fail)» — `archivos/musica/Oceans (Where Feet May Fail).mp3` (sha 8 `f6cebfbd`), 7:46. Es una canción de PULSO de 132 BPM (periodo 0,4545 s, fase 0,3777 s) que suena a −11…−13 LUFS (picos de
 * 0 dBFS: bajarla ≈ 3-4 dB para dejarla a −15) hasta los 182,3 s, donde CAE a un lecho suave (−17 LUFS en la ventana del CTA, −19 después) con golpes aislados de 20-25 dB cada 3,6 s. Se entra en su golpe de 144,698 s
 * (12,3 dB). Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de «empieza a subir»): `proyectos/063/musica/golpes-063.json` (`medir-pista.py --json`). La rejilla la dio
 * `buscar-cortes-063.py` con estos planos: ver `musica/rejilla-063.txt`. Los golpes en que entra cada elemento de la infografía están en `infografia-063.ts`.
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el frame 3 (la apertura, a corte; no nace de negro). */
  e0: { t: 144.698, db: 12.3 },
  /** La disolvencia al hook ACABA aquí (la imagen de Isabella ya es opaca): el golpe suena entero y la música baja con curva después. */
  hook: { t: 147.65, db: 11.9 },
  /** El corte seco de Isabella al dron: abre la infografía. */
  info: { t: 155.378, db: 13.0 },
  /** La disolvencia a la mitad ACABA aquí. */
  mitad: { t: 163.105, db: 12.7 },
  /** La disolvencia al primer plano del bloque 5 ACABA aquí. */
  dron1: { t: 172.196, db: 9.4 },
  dron2: { t: 175.378, db: 11.4 },
  vista: { t: 178.107, db: 14.9 },
  /** La disolvencia al CTA ACABA aquí; la canción cae sola a su lecho 0,45 s después. */
  cta: { t: 181.856, db: 11.7 },
} as const;

/** Dónde cae la canción (s): de la meseta (−11,9 LUFS) a un lecho suave (−17,3 en la ventana del CTA, −19,2 después). */
export const DECAE = { t: 182.3, lufsAntes: -11.9, lufsCta: -17.3, lufsLecho: -19.2 } as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el golpe de entrada (144,698 s) cae en el frame 3 de la pieza; redondeado a un frame (4340/30) para que `trimBefore` no lo mueva.
 */
export const INICIO_MUSICA = 4340 / FPS_063;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y confirmado desde el 017). Se suma aquí y en la puerta para que el corte
 * caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_063;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_063;

/** Isabella: un empuje lento (3 %), sin más: su imagen es una vertical comprimida ampliada ×2,13 y no aguanta más. Los drones, quietos: la cámara ya se mueve. */
const EMPUJE: readonly [number, number] = [1.0, 1.03];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-063/${id}.mp4`;
const a = (id: string): string => `recorrido-063/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE del canal: contraste con cuerpo, negros hundidos, luces recogidas (los cielos son lo primero que se quema), un punto cálido y +10 % de saturación. Orden del efecto: exposición → balance de blancos →
 * sombras/luces/blancos/negros → contraste → saturación → vibrance. `vibrance` ≤ 0,05 (sobre hormigón gris pinta un moteado de colores y vuelve rosadas las nubes) y las tomas de Isabella, `saturation` ≤ 1,06:
 * la piel se queda donde estaba. El AJUSTE de cada plano se mide (`herramientas/medir-color.py`), no se hereda.
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

/** DR02 es un cenital sobre pasto muy verde (saturación medida 0,69 con la base): se queda en 1,0. Los tres planos de DR02 (la apertura, el fondo de la infografía y el primero del bloque 5) llevan el mismo color. */
const COLOR_DR02: ColorCine = color({ highlights: -0.25, saturation: 1.0 });

/** Los dos últimos planos del bloque 5 son seguidos y del MISMO vuelo de DR01 (14 y 20 s): el mismo color en los dos, como pide la puerta para las tomas partidas. */
const COLOR_DR01: ColorCine = color({ exposure: 0.08, highlights: -0.28, saturation: 1.05 });

/**
 * Los frames de cada cambio de plano: todos salen de `golpe(...)`, así que mover la entrada de la música es cambiar `INICIO_MUSICA`. Los que entran disolviendo (hook, mitad, primer plano del bloque 5, CTA) tienen aquí
 * el `en` de la disolvencia YA TERMINADA: el plano anterior dura hasta él y el siguiente empieza a verse 12 f antes.
 */
const P = {
  hook: golpe(GOLPE.hook), //     91 · Isabella ya es opaca; su primera palabra suena 12 f después
  info: golpe(GOLPE.info), //    323 · acaba el hook; el golpe abre el dron y la infografía (a corte)
  mitad: golpe(GOLPE.mitad), //  555 · Isabella con la mitad (disuelve)
  dron1: golpe(GOLPE.dron1), //  828 · el primer plano del bloque 5 (disuelve)
  dron2: golpe(GOLPE.dron2), //  923 · el árbol y la cerca viva (a corte)
  vista: golpe(GOLPE.vista), // 1005 · la vista (a corte)
  cta: golpe(GOLPE.cta), //     1117 · Isabella con el CTA (disuelve)
} as const;

/** Frames en que Isabella empieza a hablar en el hook (para los rótulos y la puerta): la mitad y el CTA salen de sus cortes. */
export const EN_MITAD_063 = P.mitad;

/**
 * Frames que dura la toma del CTA: el clip dura 11,17 s (335 f) y desde `desde` (109 f) hasta el f279 del clip hay 170. Su voz va de 4,03 a 8,82 s (f1129 a f1273 de la comp): 14 f (0,47 s) de su cara tras la última
 * palabra, en los que la imagen funde a negro (los últimos 6). Nada se congela: el plano acaba antes del final del clip, que sigue 56 f más.
 */
const DUR_CTA = 170;

/**
 * Dónde acaba la música (frame de la comp): tras la última palabra del CTA se APAGA con curva hasta cero aquí. La canción tiene, en su lecho, un golpe de 23,6 dB a los 189,465 s (el f1346, el último fotograma de la
 * pieza): la música llega a cero en el f1320, 26 f antes, y la tarjeta acaba en silencio.
 */
export const FIN_MUSICA_063 = 1320;

export const metraje063: readonly Corte[] = [
  // ── Bloque 1 · el lote desde el aire ──
  {
    id: "c01-apertura",
    bloque: 1,
    tipo: "video",
    src: v("dr02"),
    // DR02 (4K vertical, SDR, cenital), del 16,50 al 19,53 s del archivo normalizado: sobre el pasto y las cercas vivas en «V» sube despacio y, al final, enseña la franja amarilla del cultivo vecino. Movimiento ≈ 4
    // (`perfil-mov.py`: de 3,5 a 5,3 entre los 15 y los 19 s). Entra a corte con el golpe de 12,3 dB del f3.
    desde: fr(495),
    en: 0,
    dur: P.hook,
    zoom: QUIETO,
    entra: "corte",
    color: COLOR_DR02,
    reason:
      "El lote visto desde arriba (la promesa): el cenital sobre el pasto y las cercas vivas en «V». Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia y el hook habla de papeles.",
  },
  // ── Bloque 2 · el hook y su invitación, UNA toma ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk01"),
    audio: a("hk01-voz"),
    voz: {
      s0: 2.89,
      s1: 9.58,
      lufs: -15,
      dice: "El error no es comprar un lote barato, es comprarlo sin todas las acometidas legales. Ven, te enseño cómo evitar esto.",
    },
    // La voz empieza a los 2,89 s (86,7 f) y acaba a los 9,58 s (287,4 f: «esto» entero, con la /t/ y la /o/ finales que la prueba rev. 1 cortaba a los 9,32 s); el clip dura 12,63 s (379 f) y la toma es ANAMÓRFICA (escalada entera). La afirmación acaba a los 7,17 s («legales»), tras una pausa de 0,6 s
    // empieza la invitación («Ven, te enseño cómo evitar esto», 7,75-9,32 s): son UNA toma continua y se dejan seguidas, sin cortar la imagen (cortar la pausa sería un salto de imagen sin motivo). `desde` 75 f (2,5 s)
    // entra DISOLVIENDO (el clip tiene 63 f antes de la disolvencia) y la primera palabra suena a los 11,7 f del `en`: la música baja con curva sobre ellos (10 f). El plano dura 232 f (hasta el golpe del f323): 20 f
    // tras la última palabra, en los que la música sube y la infografía está a punto de entrar sobre el dron («encadenada» a «cómo evitar esto»).
    // POR CONFIRMAR AL OÍDO (ver `subtitulos-063.ts`): «evitar esto» (whisper oye «hitareza» y «ditarés»; el catálogo y la toma gemela, «evitar esto») y «lote barato» (whisper oye «lote de barato» en 1 de 3 cortes).
    // Isabella de cuerpo entero en el prado, con la cerca viva y el cielo detrás; está quieta mirando a cámara antes de empezar.
    desde: fr(75),
    en: P.hook,
    dur: P.info - P.hook,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, exposure: 0.02, highlights: -0.25, whites: -0.12, saturation: 1.04 }),
    reason:
      "Prado con la cerca viva y el cielo (el error): Isabella, de pie y quieta, dice «el error no es comprar un lote barato, es comprarlo sin todas las acometidas legales. Ven, te enseño cómo evitar esto». Entra disolviendo desde el aéreo; la música ya está abajo.",
  },
  // ── Bloque 3 · el dron vuelve, con la infografía ──
  {
    id: "c03-info",
    bloque: 3,
    tipo: "video",
    src: v("dr02"),
    // DR02, del 0,00 al 7,73 s: el cenital casi quieto (movimiento ≈ 1,2) sobre el pasto verde y la «V» de la cerca viva con los surcos del vecino arriba a la izquierda: el fondo más tranquilo del clip para LEER encima
    // (el vuelo de DR02 de los 16 s en adelante es rápido y está en la apertura y en el bloque 5). Entra A CORTE en el golpe de 13,0 dB (f323) y dura todo lo que la infografía necesita. Un velo negro del 50 % (`infografia-063.ts`)
    // lo oscurece lo justo para que el blanco se lea sin esconderlo: «dron + infografía».
    desde: fr(0),
    en: P.info,
    dur: P.mitad - P.info,
    zoom: QUIETO,
    entra: "corte",
    color: COLOR_DR02,
    reason:
      "El dron vuelve (lo que sí tiene): el cenital quieto sobre el pasto y la «V» de la cerca viva, de fondo de la infografía «Lo que sí tiene» (acueducto · escrituras · 3.244 m²); el golpe del corte la abre.",
  },
  // ── Bloque 4 · la mitad, entera ──
  {
    id: "c04-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md01"),
    audio: a("md01-voz"),
    voz: {
      s0: 3.61,
      s1: 11.52,
      lufs: -15,
      dice: "Antes de enamorarte de un lote, empieza con tres cosas: ubicación, agua y escrituras. Y este lote empieza con todas esas cosas sobre la mesa.",
    },
    // La voz empieza a los 3,61 s (108,3 f) y acaba a los 11,52 s (345,6 f: «mesa» entera, con la /s/ y la /a/ finales que la prueba rev. 1 cortaba a los 11,34 s); el clip dura 13,73 s (412 f). `desde` 96 f (3,2 s) entra DISOLVIENDO (el clip tiene 84 f antes de la disolvencia) y la primera palabra suena
    // a los 12,3 f del `en`: la música baja con curva en 10 f. El plano dura 273 f: 23 f tras la última palabra, en los que la música sube (21 f) antes del golpe del f828. Los rótulos UBICACIÓN · AGUA · ESCRITURAS
    // aparecen a la palabra (`infografia-063.ts`, `Infografia063.tsx`).
    // POR CONFIRMAR AL OÍDO: «empieza con tres cosas» (el reparto suponía «fíjate en tres cosas»; MEDIDO que es «empieza con»: nasal /m/, cierre de la /p/, /s/ de «-za» y 5 arranques de sílaba en «em-pie-za con tres»;
    // whisper lo oye igual en 3 cortes distintos y es la misma construcción que la segunda frase, «este lote empieza con todas esas cosas»).
    // Isabella camina despacio hacia la cámara por el prado, con la ladera de tierra y la cerca viva detrás.
    desde: fr(96),
    en: P.mitad,
    dur: P.dron1 - P.mitad,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, exposure: 0.02, highlights: -0.25, whites: -0.12, saturation: 1.04 }),
    reason:
      "Prado con la ladera de tierra (las tres cosas): Isabella camina hacia la cámara y dice «empieza con tres cosas: ubicación, agua y escrituras», con los tres rótulos a la palabra. Entra disolviendo desde la infografía; la música ya está abajo.",
  },
  // ── Bloque 5 · el vuelo hacia lo que rodea, y la vista ──
  {
    id: "c05-rodea",
    bloque: 5,
    tipo: "video",
    src: v("dr02"),
    // DR02, del 22,00 al 25,17 s: el dron se levanta del pasto y enseña la franja amarilla del cultivo vecino, la tierra descubierta y, al fondo, una construcción blanca: lo que rodea el lote (el vuelo más rápido del clip,
    // movimiento ≈ 5,5). Entra DISOLVIENDO desde Isabella (el clip tiene 22 s antes).
    desde: fr(660),
    en: P.dron1,
    dur: P.dron2 - P.dron1,
    zoom: QUIETO,
    entra: "disolver",
    color: COLOR_DR02,
    reason:
      "Lo que rodea el lote (el vuelo se abre): el dron se levanta del pasto y enseña el cultivo vecino con su franja amarilla y la tierra descubierta; de la mitad, dicha, al entorno.",
  },
  {
    id: "c06-arbol",
    bloque: 5,
    tipo: "video",
    src: v("dr01"),
    // DR01, del 14,00 al 16,73 s: el dron avanza sobre la ladera con el árbol solitario, la cerca viva que la cruza y, al fondo, las lomas y el cielo: el lote visto desde dentro, con el horizonte. Movimiento ≈ 1,5.
    desde: fr(420),
    en: P.dron2,
    dur: P.vista - P.dron2,
    zoom: QUIETO,
    entra: "corte",
    color: COLOR_DR01,
    reason:
      "La ladera con su árbol (el lote por dentro): el dron avanza sobre el pasto con la cerca viva y el horizonte al fondo; baja el ritmo hacia la vista.",
  },
  {
    id: "c07-vista",
    bloque: 5,
    tipo: "video",
    src: v("dr01"),
    // DR01, del 20,20 al 23,93 s (el tramo de esta pieza acaba a los 24 s): el dron sube sobre la ladera y deja ver la «V» de la cerca viva con los surcos, el horizonte, las casas y las lomas al fondo: la vista más abierta
    // que tiene el tramo (movimiento ≈ 2,0). Entra A CORTE en el golpe de 14,9 dB (f1005) y es el plano más largo del bloque 5 (112 f): el clímax. Un empuje lento mantiene la vida cuando casi se posa.
    desde: fr(606),
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: [1.0, 1.04],
    entra: "corte",
    color: COLOR_DR01,
    reason:
      "La vista más abierta del tramo (el clímax): el dron sube y deja ver la «V» de la cerca viva, el horizonte y las lomas; lo que rodea el lote. El plano más largo del bloque.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c08-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct02"),
    audio: a("ct02-voz"),
    voz: {
      s0: 4.03,
      s1: 8.82,
      lufs: -15,
      dice: "¿Quieres saber si este lote se ajusta a tu presupuesto? Escríbeme y te envío toda la información.",
    },
    // La voz empieza a los 4,03 s (120,9 f) y acaba a los 8,82 s (264,6 f); el clip dura 11,17 s (335 f). `desde` 109 f entra DISOLVIENDO (el clip tiene 109 f antes) y la primera palabra suena a los 11,9 f del `en`. El
    // plano dura 170 f (acaba en el f279 del clip, 56 f antes de su final): 14 f tras la última palabra, en los que la imagen funde a negro (los últimos 6).
    // Isabella de pie en el prado, con la loma de tierra y la cerca viva detrás, quieta mirando a cámara.
    desde: fr(109),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "disolver",
    color: color({ contrast: 1.04, exposure: 0.02, highlights: -0.25, whites: -0.12, saturation: 1.04 }),
    reason:
      "Prado con la loma (la invitación): Isabella, de pie, pregunta «¿quieres saber si este lote se ajusta a tu presupuesto?» y pide «escríbeme»: una sola acción. Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el logo y la web
  // (`cierre-063.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c09-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-063/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c08
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c09). */
export const DURACION_063 = P.cta + DUR_CTA + DUR_TARJETA;
