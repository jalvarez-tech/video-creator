/**
 * EL RECORRIDO 024 — «One Living · Envigado», TERCER REEL DE ESTA PROPIEDAD (V8 del registro) — los planos, como DATOS.
 *
 * Misma casa que el 022 (V6) y el 023 (V7), mismo material (26 clips, sin dron), las únicas tomas de Isabella que quedaban y otra canción. El formato es
 * el mismo (`recorrido-luxur`, seis bloques; reglas fijas del canal en su `SKILL.md` §0).
 *
 * LA PIEZA ABRE CON EL HOOK, como la V6 y la V7 (pedido del usuario en la V6: «como esta propiedad no tiene dron empecemos directamente con el hook»).
 * Rompe a propósito la regla fija «la primera toma sale sin texto ni voz»: la excepción está declarada en la puerta (`ABRE_CON_EL_HOOK`) y en el registro.
 *
 * LA IDEA: «76 metros bien distribuidos». El hook (HK1) lo dice con la cifra, y Isabella cruza la sala hacia la cámara, que está en la puerta del balcón; el paseo
 * va en el sentido de la entrada al fondo —la cocina, la cocina que se abre a la sala, la sala hacia la corredera y el balcón—; Isabella, en el balcón (MD2: es el contraplano
 * de HK1: ella en el balcón y la cámara en la sala), dice que «el balcón se convierte en una extensión de la zona social»; el segundo paseo sigue al fondo —el pasillo hacia
 * el baño, el vestier, la alcoba principal— y acaba en la vista desde su ventanal, y ella cierra en esa misma alcoba: «si quieres más información, contáctame».
 *
 *   hook      HK1   SALA          «76 metros pueden sentirse muy diferentes cuando están bien distribuidos.»
 *   mitad     MD2   BALCON        «Aquí el balcón se convierte en una extensión de la zona social.»
 *   CTA       CT1   ALCOBA-PPAL   «Estamos en la Loma del Escobero, en Envigado. Si quieres más información, contáctame.» → SOLO LA 2.ª FRASE
 *
 * TRES sitios, SALA · BALCON · ALCOBA-PPAL. No quedaba ningún CTA limpio (CT1 es de la V6, CT2 de la V7, CT3 promete rentabilidad) y, de hooks y mitades, solo HK1 y MD2: DECISIÓN DEL USUARIO
 * (2026-10-06) repetir CT1 RECORTADA a su 2.ª frase. Razones: da el tercer sitio y no dice «Escobero», que la V6 llevó sin cerrar. Cuesta una entrada a corte con 0,38 s de aire (11 f: no cabe una
 * disolvencia, que pide 12 más la palabra) y 1,85 s de voz. UNA cifra en la pieza (los «76» de HK1, permitidos por el usuario el 2026-10-06) y ninguna en los bloques 5 y 6.
 *
 *   bloque 2  c02              Isabella en la sala: el hook (HK1), A CORTE EN EL FRAME 0 (ella al fondo de la sala, la cámara en la puerta del balcón; camina hacia la cámara)
 *   bloque 3  c03 c04 c05 c06  el paseo cocina → sala → balcón: la isla y la estufa (RC09), de la cocina a la sala (RC06), la sala hacia la corredera (RC09) y el balcón (RC01)
 *   bloque 4  c07              Isabella en el balcón: la mitad (MD2)
 *   bloque 5  c08 c09 c10 c11  el fondo: el pasillo hacia el baño (RC09), el vestier (RC09), la alcoba principal (RC10) y la vista desde su ventanal (RC08: la más larga)
 *   bloque 6  c12 c13          Isabella en la alcoba principal: el CTA (CT1, 2.ª frase); y la tarjeta oscura del cierre (nada se congela)
 *
 * COMPARTE CON LA V6 y LA V7 (declarado; la puerta lo mide contra `VERSIONES_ANTERIORES`): el CLIP de CT1 (la V6 dice las dos frases; aquí solo suena la segunda) y NADA de recorrido
 * en el mismo tramo: RC09 (V7: 20,4-22,5 s; aquí 22,5-25,2, 6,0-8,1, 12,0-15,0 y 28,0-30,0 s), RC06 (V6: 0-5,1 s; aquí 12,5-14,5 s), RC10 (V6: 0-2,8 s; aquí 2,8-4,8 s), RC08 (V7: 4,2-6,8 s;
 * aquí 0,4-4,1 s) y RC01 (nadie). RC12, la vista que cerró la V6 y la V7, NO se usa: la vista de esta pieza es RC08.
 *
 * QUIÉN MARCA EL TIEMPO: LA MÚSICA, POR GOLPES. «Maison» NO tiene pulso: son notas de piano; se corta sobre los GOLPES MEDIDOS (`medir-pista.py`, ≥ 6 dB) y se comprueba sobre el audio del
 * render (`herramientas/golpes-render.py`, R33). Todos los `en` salen de `golpe(...)`: mover la entrada de la música es cambiar `INICIO_MUSICA`.
 * LA CANCIÓN. Elegida por el usuario (2026-10-06) entre *Maison*, *desolate* y *Heaven on Earth*, las tres libres que dejaban una rejilla de cortes válida para esta estructura (`rejilla-cortes.py`
 * reescrito como búsqueda exhaustiva: *Maison* da 54-66 soluciones con la mitad de MD2 y la vista de ≥ 3 s). Es piano neoclásico (†: género inferido del catálogo, sin oír).
 *
 * LA RESOLUCIÓN. La canción suena en una meseta de −17,5 LUFS (sin crescendo) hasta ≈ 168 s y entonces su última nota decae a silencio (−21,6 → −31,6 → −39,3 → −59 dB de RMS de 1 s en 168-171 s; silencio digital
 * desde ≈ 171,7 s: `curva.py`). La toma del CTA entra en el último golpe de la meseta (167,269 s) y la caída cae dentro de ella; la cola se apaga bajo la tarjeta.
 *
 * UNIDADES. `desde` va en SEGUNDOS de la fuente, escrito como frame exacto (`fr(28)` = 28/30 s) para que imagen y voz corten en la MISMA muestra;
 * `en` y `dur`, en frames de la composición. Los planos son CONTIGUOS: cada `en` es el fin del anterior.
 *
 * TRANSICIONES. El hook abre la pieza a corte (frame 0). Cortes secos solo donde el salto de luma entre el último fotograma de un plano y el primero del siguiente
 * es pequeño (≤ ±8, medido por `medir-color.py`); donde pasa de ±8 el plano ENTRA CON DISOLVENCIA de 12 f que acaba en el golpe, con `desde` ≥ 12 f, y no se gradúa más. La toma del CTA entra a CORTE (declarado
 * arriba): su aire antes de la primera palabra son 0,38 s y una disolvencia pide 12 f de clip anteriores a ella.
 *
 * EL COLOR (R32): cada plano de vídeo lleva su `color` (`colorCorrection()`): la base del canal más el ajuste de su toma, medido con
 * `herramientas/medir-color.py`. Dos fuentes (Isabella en HLG tone-mapeado, recorridos en SDR). Con `color` el render lleva `--gl=angle` y la prueba se
 * hace a escala 1 reducida con ffmpeg.
 *
 * Datos puros: solo `import type` y los números del cierre (`cierre-024.ts`). La puerta lo carga con node.
 */
import type { ColorCine, Corte as CorteDelFormato } from "../../motor/metraje";
import { DUR_TARJETA } from "./cierre-024";

export const FPS_024 = 30;

export type Entrada = "corte" | "disolver";
export type Bloque = 1 | 2 | 3 | 4 | 5 | 6;

/** Dónde habla Isabella en SU clip y a qué nivel. `s0`/`s1` medidos con `limites-voz.py` sobre el WAV crudo; `lufs`, con ebur128 sobre el WAV TRATADO que suena (ver `OBJETIVO_LUFS`). */
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
  /** `foto` solo para la tarjeta oscura del cierre (`c13-cierre`: un negro liso). Nada se congela. */
  tipo: "video" | "foto";
  /** A qué bloque del guion pertenece: la puerta comprueba el orden y el tope de cada uno. */
  bloque: Bloque;
  /** Solo las tomas de Isabella cuya voz entra con su imagen: el WAV de su voz, TRATADO (`<toma>-voz.wav`: ver `OBJETIVO_LUFS`). */
  audio?: string;
  voz?: VozDelCorte;
}

/**
 * EL NIVEL DE LA VOZ (REV. 1, pedido del usuario el 2026-10-08: «necesito que la voz cuando habla Isabella tenga más decibeles sin saturar»). Hasta la rev. 0 la voz iba a −21 LUFS, una ganancia por toma y nada más (R29), y sonaba
 * 6 dB por debajo de la música sola (−15). Las tres tomas miden −24,1 (HK1), −24,0 (MD2) y −22,5 LUFS (la 2.ª frase de CT1) en su ventana de voz, con picos de −8,8, −1,5 y −5,6 dBTP: llevarlas a −15 con ganancia sola daría
 * picos de +0,3 a +16 dBTP. Suena la voz TRATADA (`<toma>-voz.wav`, `proyectos/024/normalizar.mjs`: graves fuera, puerta suave, compresión 3:1, ganancia de +15,2 a +15,6 dB buscada DESPUÉS del compresor y limitador a
 * −2,5 dBFS), que mide −15,00 LUFS en su ventana de voz con el pico real en −2,5 dBTP; por eso `voz.lufs` de cada toma es −15,0 y la ganancia que el plan le suma es 0. Es una excepción a R29, por encargo,
 * declarada aquí y en la puerta (sección 3: pico real ≤ −1 dBTP con su ganancia). Lo que miden `limites-voz.py` (R29), `s0` y `s1`, sale del WAV crudo.
 */
export const OBJETIVO_LUFS = -15;

/* ── Los golpes de la música ────────────────────────────────────────────────
 *
 * «Emilio Piano ft. Lucie – Maison» — `Music/Emilio Piano ft. Lucie - Maison.mp3` (sha 8 `df2be878`), piano neoclásico, 2:55. Se usa desde 137,97 s (su paseo empieza en el golpe de 142,95 s, 12,3 dB) y de ahí
 * suena −17,5 LUFS, sin crescendo, hasta su caída final en 168,5 s. Los golpes de abajo son los MEDIDOS (banda 80-3000 Hz, subida de ≥ 6 dB en 15 ms; el instante es el de «empieza a subir») en que entra cada plano,
 * con su fuerza en dB por 15 ms. `proyectos/024/musica/golpes-024.json`. Salen de `rejilla-cortes.py` (cortes en 142,95 · 145,693 · 147,678 · 149,649 · 152,03 · 156,588 · 158,646 · 161,644 · 163,609 · 167,269 s).
 */
export const GOLPE = {
  /** El golpe de entrada de la canción: el MISMO del paseo (f151): lo que se oye en el hook es la música que lo precede, baja bajo su voz. */
  apertura: { t: 142.95, db: 12.3 },
  /** El paseo empieza (con una disolvencia, tras el hook) y la canción llega a su primer golpe: la isla y la estufa. Es el último frame del clip del hook (f151). */
  paseo: { t: 142.95, db: 12.3 },
  /** De la cocina a la sala (RC06). */
  sala: { t: 145.693, db: 11.7 },
  /** La sala hacia la corredera (RC09). */
  corredera: { t: 147.678, db: 11.8 },
  /** El balcón (RC01): el destino del paseo. */
  balcon: { t: 149.649, db: 13.5 },
  /** Isabella entra (con una disolvencia que acaba aquí) con la mitad. */
  mitad: { t: 152.03, db: 11.8 },
  /** El pasillo hacia el baño (RC09): sale la mitad y empieza el bloque 5. */
  pasillo: { t: 156.588, db: 11.6 },
  /** El vestier (RC09). */
  vestier: { t: 158.646, db: 13.1 },
  /** La alcoba principal (RC10). */
  alcoba: { t: 161.644, db: 11.4 },
  /** La vista (RC08): el cielo y la ciudad desde el ventanal. El golpe más débil de la pieza (8,1 dB): es el único que deja a la vista como el plano más largo del bloque. Entra con una DISOLVENCIA que acaba aquí: como corte seco no valía (en el render este golpe mide 6,8 dB y R33 pide ≥ 7,4 dB) y por eso esta pieza baja a 8,0 dB el mínimo de golpe de una disolvencia (`FUERZA_MIN_DISOLVER` de la puerta), declarado. */
  vista: { t: 163.609, db: 8.1 },
  /** Isabella entra (a CORTE) con el CTA: el último golpe antes de la caída final de la canción, que cae dentro de su toma. */
  cta: { t: 167.269, db: 10.3 },
} as const;

/**
 * LA CAÍDA FINAL de la canción: la meseta de piano (−17,5 LUFS, sin crescendo) acaba hacia los 168 s; la última nota baja (−21,6 → −31,6 → −39,3 → −59 dB de RMS de 1 s en 168-171 s) y la pista queda en
 * silencio digital desde ≈ 171,7 s (`curva.py`). `t` es el instante en que cae: ebur128 sobre `musica-024.wav`, tramos de 5 s, da −17,6 antes y −30,1 en los 5 s siguientes (−12,5); los 5 s tras ellos
 * son silencio digital (el archivo acaba a 175,0 s). Con `t` 168,0 s el primer tramo cae solo 8,0 dB: se declara el instante de la caída y no uno anterior (como en la V7). No es un golpe sino
 * un cambio de nivel: la resolución de esta pieza.
 */
export const DECAE = { t: 168.5, lufsAntes: -17.6, lufs5s: -30.1, lufs10s: -70 } as const;

/**
 * Dónde empieza a sonar la canción, en segundos de la fuente: el golpe de entrada (142,95 s) cae donde empieza el paseo, a los 5,0 s (f151: el clip del hook, HK1, solo dura 5,30 s; la V7 lo puso a los
 * 5,5 s con HK3), y la música suena ya desde el f0, baja bajo la voz del hook (pedidos del usuario en la V7, heredados). El número es el segundo de la fuente que cae en el f0: 4139/30, un frame entero para que
 * `trimBefore` no lo mueva. Empieza DESPUÉS del descenso de nivel de 137 s: la música del hook es la de la meseta (−17,0 LUFS), no la del arranque de la sección (−12,6).
 */
export const INICIO_MUSICA = 4139 / FPS_024;

/**
 * Lo que el audio del render llega TARDE respecto de su fuente: 42 ms, medido en el 016 por correlación entre la prueba 720p y el WAV (y
 * confirmado desde el 017). Se suma aquí y en la puerta para que el corte caiga en el frame en que el golpe SUENA.
 */
export const RETARDO_AUDIO = 0.042;

/** Lo que el oído coloca el golpe después de que su energía EMPIEZA a subir (s). */
const ATAQUE = 0.012;

/** El frame del vídeo en que SUENA un golpe de la canción (sin redondear). */
export const golpeExacto = (tCancion: number): number => (tCancion + ATAQUE - INICIO_MUSICA + RETARDO_AUDIO) * FPS_024;

/** El frame entero del vídeo en que suena un golpe de la canción. */
export const golpe = (g: { readonly t: number }): number => Math.round(golpeExacto(g.t));

/** Un frame del clip fuente, en segundos (la unidad de `desde`). */
const fr = (n: number): number => n / FPS_024;

/** Isabella: un empuje lento hacia ella. El recorrido, quieto: la cámara ya avanza. */
const EMPUJE: readonly [number, number] = [1.0, 1.04];
const QUIETO: readonly [number, number] = [1.0, 1.0];

const v = (id: string): string => `recorrido-024/${id}.mp4`;
const a = (id: string): string => `recorrido-024/${id}.wav`;

/* ── El color (R32) ─────────────────────────────────────────────────────────
 *
 * LA BASE de Luxur, la del 017: contraste con cuerpo, negros hundidos, luces recogidas, un punto cálido y +10 % de saturación. Orden del efecto:
 * exposición → balance de blancos → sombras/luces/blancos/negros → contraste → saturación → vibrance. `vibrance` ≤ 0,05 y las tomas de Isabella,
 * `saturation` ≤ 1,06 (la piel se queda donde estaba). Salió de material HLG tone-mapeado; los recorridos de esta casa son SDR: los ajustes de cada plano
 * parten de los de la V6 y la V7 y se miden otra vez (`proyectos/024/herramientas/medir-color.py`).
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
  paseo: golpe(GOLPE.paseo), //         151 · la isla y la estufa y la entrada de la canción (el hook ocupa f0-151: lo que queda de su clip desde `desde` 4 f)
  sala: golpe(GOLPE.sala), //           233 · de la cocina a la sala
  corredera: golpe(GOLPE.corredera), // 293 · la sala hacia la corredera
  balcon: golpe(GOLPE.balcon), //       352 · el balcón
  mitad: golpe(GOLPE.mitad), //         424 · Isabella en el balcón
  pasillo: golpe(GOLPE.pasillo), //     560 · el pasillo hacia el baño
  vestier: golpe(GOLPE.vestier), //     622 · el vestier
  alcoba: golpe(GOLPE.alcoba), //       712 · la alcoba principal
  vista: golpe(GOLPE.vista), //         771 · la vista
  cta: golpe(GOLPE.cta), //            881 · Isabella con el CTA (a corte)
} as const;

/**
 * Frames que dura la toma del CTA (CT1, 2.ª frase): el clip dura 5,83 s (175 f) y desde `desde` (97 f = 3,23 s: la voz de la 1.ª frase acaba a los 3,12 s) le quedan 78. Su voz acaba a los 5,37 s
 * (f945 de la comp): 13,9 f (0,46 s) de su cara tras la última palabra, en los que la imagen funde a negro (los últimos 6). Nada se congela.
 */
const DUR_CTA = 78;

/**
 * Dónde acaba la música (frame de la comp). La canción ya está en silencio digital desde ≈ 171,7 s (f1005 de la comp... ya dentro de la tarjeta): la envolvente la lleva a cero 2 f antes del final, bajo la tarjeta.
 */
export const FIN_MUSICA_024 = P.cta + DUR_CTA + DUR_TARJETA - 2;

export const metraje024: readonly Corte[] = [
  // ── Bloque 2 · el hook ──
  {
    id: "c02-hook",
    bloque: 2,
    tipo: "video",
    src: v("hk1"),
    audio: a("hk1-voz"),
    voz: {
      s0: 0.36,
      s1: 4.55,
      lufs: -15.0,
      dice: "76 metros pueden sentirse muy diferentes cuando están bien distribuidos.",
    },
    // HK1 trae 0,36 s (10,8 f) de aire antes de su primera palabra y dura 5,30 s (159 f). Heredado del pedido del usuario en la V7 («el video del hook empiézalo justo antes de que Isabella empiece a hablar»): ENTRA A CORTE
    // en el frame 0 con `desde` 4 f: la primera palabra suena a los 6,8 f (la imagen ya es opaca) y el clip llega hasta el f151, el golpe en que entra la canción (la última palabra suena en f132,5). Ella
    // está al fondo de la sala, la cámara en la puerta del balcón, y camina hacia la cámara.
    desde: fr(4),
    en: 0,
    dur: P.paseo,
    zoom: EMPUJE,
    entra: "corte",
    color: color({ saturation: 1.02 }),
    reason:
      "Sala (los metros): Isabella cruza la sala hacia la cámara, desde la cocina hasta la puerta del balcón, y dice «76 metros pueden sentirse muy diferentes cuando están bien distribuidos»: la casa primero y la persona después. Entra a corte en el frame 0.",
  },
  // ── Bloque 3 · el paseo: cocina → sala → balcón ──
  {
    id: "c03-cocina",
    bloque: 3,
    tipo: "video",
    src: v("rc09"),
    // RC09 «habitacion principal - paneo» (la caminata larga), de 22,5 a 25,2 s: la cocina con la isla, la estufa de cuatro puestos y la campana, de cerca (la V7 usó 20,4-22,5 s: ni un fotograma opaco en común).
    desde: fr(675),
    en: P.paseo,
    dur: P.sala - P.paseo,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ shadows: 0.14, blacks: -0.04 }),
    reason:
      "Cocina (la barra): la isla con la estufa y la campana de cerca, lo primero que se ve al entrar; la ficha la destaca y el hook ya habló de cómo se distribuye.",
  },
  {
    id: "c04-sala",
    bloque: 3,
    tipo: "video",
    src: v("rc06"),
    // RC06 «cocina, sala, balcon», de 12,5 a 14,5 s: la cocina abierta con su campana pasa a la sala (el techo de concreto, el mesón blanco): el espacio se abre (la V6 usó 0-5,1 s).
    desde: fr(375),
    en: P.sala,
    dur: P.corredera - P.sala,
    zoom: QUIETO,
    entra: "disolver",
    color: color(),
    reason:
      "Cocina → sala (se abre el espacio): la cocina y la sala son un solo espacio; el techo de concreto y el mesón blanco las unen. Es la distribución de la que habla el hook.",
  },
  {
    id: "c05-corredera",
    bloque: 3,
    tipo: "video",
    src: v("rc09"),
    // RC09, de 28,0 a 30,0 s: la sala hacia la corredera del balcón, con el ladrillo y las montañas al fondo (la V7 dejó este plano libre).
    desde: fr(840),
    en: P.corredera,
    dur: P.balcon - P.corredera,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ shadows: 0.14, blacks: -0.04 }),
    reason:
      "Sala (hacia el balcón): el paseo avanza por la sala hacia la corredera de vidrio y el balcón con el ladrillo; la zona social, en el centro.",
  },
  {
    id: "c06-balcon",
    bloque: 3,
    tipo: "video",
    src: v("rc01"),
    // RC01 «balcon - paneo», de 6,0 a 8,4 s: el balcón visto desde fuera, con la corredera y el piso de gres (la malla negra de la baranda solo entra en cuadro de los 3 a los 5 s; nadie usó este clip). Entra A CORTE: el salto de luma desde la corredera es de −3,1.
    desde: fr(180),
    en: P.balcon,
    dur: P.mitad - P.balcon,
    zoom: QUIETO,
    entra: "corte",
    // El gres, el ladrillo y la madera del fondo dan 0,32 de saturación con la base (el resto, 0,2-0,28): se le quita la viveza de la base.
    color: color({ saturation: 1.0 }),
    reason:
      "Balcón (el destino): el balcón, estrecho y largo, con su corredera; el sitio donde ella nos espera.",
  },
  // ── Bloque 4 · la mitad ──
  {
    id: "c07-mitad",
    bloque: 4,
    tipo: "video",
    src: v("md2"),
    audio: a("md2-voz"),
    voz: {
      s0: 0.65,
      s1: 4.34,
      lufs: -15.0,
      dice: "Aquí el balcón se convierte en una extensión de la zona social.",
    },
    // La voz empieza a los 0,65 s (19,5 f): `desde` 12 f (0,4 s) entra con DISOLVENCIA que acaba en el golpe del f424 (suena entero: la música baja en los 7 f siguientes) y la primera palabra suena a los
    // 7,5 f del golpe, con la curva ya acabada. La última palabra acaba en f542,2; el bloque 5 entra con su disolvencia en el golpe del f560 y deja 17,8 f para que la música suba con fundido. El clip llega a f560 (12 + 136 = 148 de 157).
    desde: fr(12),
    en: P.mitad,
    dur: P.pasillo - P.mitad,
    zoom: EMPUJE,
    entra: "disolver",
    // La madera del piso y el ladrillo dan 0,39 de saturación con la base (la piel de Isabella, 0,40 frente a 0,37 sin graduar): se baja a 0,98 y la piel vuelve a donde estaba.
    color: color({ saturation: 0.98 }),
    reason:
      "Balcón (lo social, la extensión): Isabella en el balcón, con la cámara en la sala, el contraplano del hook; dice que el balcón se convierte en una extensión de la zona social, y el paseo que acabamos de hacer termina aquí.",
  },
  // ── Bloque 5 · el fondo: pasillo, vestier, alcoba y la vista ──
  {
    id: "c08-pasillo",
    bloque: 5,
    tipo: "video",
    src: v("rc09"),
    // RC09, de 6,0 a 8,1 s: el pasillo con la puerta de madera, hacia el baño con su luz encendida. (El pasillo y el vestier, c08 y c09, son dos tramos seguidos del mismo clip y llevan el MISMO color.)
    desde: fr(180),
    en: P.pasillo,
    dur: P.vestier - P.pasillo,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ saturation: 0.95, shadows: 0.14, blacks: -0.04 }),
    reason:
      "Pasillo (hacia lo privado): sale del centro social hacia el fondo por el pasillo, con la luz del baño al final.",
  },
  {
    id: "c09-vestier",
    bloque: 5,
    tipo: "video",
    src: v("rc09"),
    // RC09, de 12,0 a 15,0 s: el vestier de madera con la barra y los cajones, el plano más rico de ese clip. La madera de un vestier es el plano más saturado de la pieza (0,45-0,53 con la base): se baja al mínimo que admite la puerta.
    desde: fr(360),
    en: P.vestier,
    dur: P.alcoba - P.vestier,
    zoom: QUIETO,
    entra: "disolver",
    color: color({ saturation: 0.95, shadows: 0.14, blacks: -0.04 }),
    reason:
      "Vestier (cómo se vive): los cajones y la barra de madera; cuenta lo que se guarda antes de lo que se mira.",
  },
  {
    id: "c10-alcoba",
    bloque: 5,
    tipo: "video",
    src: v("rc10"),
    // RC10 «habitacion principal», de 2,8 a 4,8 s: la alcoba principal con su mueble blanco empotrado en la esquina y el ventanal con la ciudad al fondo (la V6 usó de 0 a 2,8 s).
    desde: fr(84),
    en: P.alcoba,
    dur: P.vista - P.alcoba,
    zoom: QUIETO,
    entra: "disolver",
    color: color(),
    reason:
      "Alcoba principal (el descanso): el techo de concreto, el mueble blanco empotrado y el ventanal; es el fondo de la casa y el sitio donde acabará el CTA.",
  },
  {
    id: "c11-vista",
    bloque: 5,
    tipo: "video",
    src: v("rc08"),
    // RC08 «habitacion principal - paneo 2», de 0,4 a 4,1 s: el cielo, las nubes y la ciudad desde el ventanal, y la cámara entra a la alcoba. ES LA VISTA DE ESTA PIEZA (la V7 usó 4,2-6,8 s de este clip: otros fotogramas) y NO se usa RC12, la que cerró la V6 y la V7.
    // Dura 110 f (3,7 s): el plano más largo del bloque. Entra con una DISOLVENCIA que acaba en un golpe de 8,1 dB: como corte seco no valía (en el render el golpe mide 6,8 dB y R33 pide ≥ 7,4); la disolvencia no se mide sobre el audio, y esta pieza baja a 8,0 dB el mínimo de golpe de una disolvencia (`FUERZA_MIN_DISOLVER` de la puerta), declarado, como hizo la V7 con un golpe de 8,8.
    desde: fr(12),
    en: P.vista,
    dur: P.cta - P.vista,
    zoom: QUIETO,
    entra: "disolver",
    // El marco negro del ventanal cruza el cuadro: con la base aplasta el 12,9 % (3,3 % sin graduar). Se abren las sombras y se sube el negro; sigue siendo el marco, no detalle.
    color: color({ shadows: 0.26, blacks: 0.02, contrast: 1.04 }),
    reason:
      "Ventanal (la vista): el clímax; el cielo, las nubes y la ciudad desde la alcoba principal, la última imagen de la casa antes del CTA y el plano más largo del bloque. Y es la ventana en la que ella estará.",
  },
  // ── Bloque 6 · el CTA ──
  {
    id: "c12-cta",
    bloque: 6,
    tipo: "video",
    src: v("ct1"),
    audio: a("ct1-voz"),
    voz: {
      s0: 3.52,
      s1: 5.37,
      lufs: -15.0,
      dice: "Si quieres más información, contáctame.",
    },
    // CT1 RECORTADA a su 2.ª frase (decisión del usuario, 2026-10-06): la 1.ª, «Estamos en la Loma del Escobero, en Envigado», acaba a los 3,12 s y la 2.ª empieza a los 3,52 s (0,38 s de silencio real). `desde` 97 f
    // (3,23 s): entra A CORTE en el golpe del f881 (suena entero: la música baja en los 7 f siguientes) y la primera palabra suena a los 8,6 f del golpe, con la curva ya acabada. Con 11,6 f de aire no cabe una disolvencia
    // (12 f de clip antes de la palabra, más la palabra). La caída final de la canción (168,5 s) cae a los 36 f de la entrada (f917), ya dentro de la toma.
    desde: fr(97),
    en: P.cta,
    dur: DUR_CTA,
    zoom: EMPUJE,
    entra: "corte",
    // Entra a CORTE desde la vista (la luma baja de 136,9 a 127,9: −9,0 sin graduar, −10,3 con la base): una exposición de +0,06 y las sombras abiertas lo dejan dentro de ±8 sin tocar la piel.
    color: color({ saturation: 1.02, exposure: 0.06, shadows: 0.16 }),
    reason:
      "Alcoba principal (la invitación): Isabella en el fondo de la casa, ante el ventanal con la ciudad que acaba de verse; dice «si quieres más información, contáctame». Tras su última palabra funde a negro y entra la tarjeta del cierre.",
  },
  // ── El cierre: la tarjeta oscura (nada se congela) ──
  // La imagen de Isabella funde a negro en la composición (`FundidoACierre`, hasta negro exacto en el último fotograma de su toma) y sigue este plano: un negro liso (`foto`) que sostiene el
  // logo y la web (`cierre-024.ts`). Entra a corte donde acaba la toma. El PNG lo genera `normalizar.mjs`.
  {
    id: "c13-cierre",
    bloque: 6,
    tipo: "foto",
    src: "recorrido-024/cierre-oscuro.png",
    en: P.cta + DUR_CTA, // = el `en` + `dur` de c12
    dur: DUR_TARJETA,
    zoom: [1.0, 1.0],
    entra: "corte",
    reason:
      "Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web mientras la música se apaga.",
  },
];

/** Frames de la composición: el fin de la tarjeta del cierre (`en` + `dur` de c13). */
export const DURACION_024 = P.cta + DUR_CTA + DUR_TARJETA;
