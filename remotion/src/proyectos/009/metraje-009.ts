/**
 * PLAN DE METRAJE — proyecto 009 · Reel de Street Cats (30 fps · 942 f).
 * Artefactos: proyectos/009/artefactos/01-plan.md · 03-timeline.md.
 *
 * QUÉ ES ESTA CAPA Y POR QUÉ EXISTE. En una pieza con avatar, el movimiento lo
 * pone `camara-NNN.ts` sobre un clip único. Aquí no hay avatar: hay CINCO clips
 * y el movimiento es el MONTAJE — qué plano entra, desde qué segundo, cuánto
 * dura y cómo se mueve dentro de su propio encuadre. Así que esta es la hermana
 * de `camara-NNN.ts` para piezas de b-roll, y se lee igual: datos puros, sin
 * JSX, con `reason` obligatorio en cada corte.
 *
 * TRES FPS DISTINTOS EN UNA COMP DE 30. Los clips llegan a 23,976 · 25 · 29,97.
 * El fps de la comp NO se toca (SKILL §3a·3): `desde` va en SEGUNDOS del clip
 * fuente —que es lo que no depende del fps de nadie— y el intérprete lo pasa a
 * `trimBefore` con el fps de la comp. Contar frames del clip fuente aquí sería
 * el error clásico: 84 frames no son lo mismo en 23,976 que en 30.
 *
 * EL GRADO ESTÁ MEDIDO, NO IMAGINADO. `ffmpeg signalstats` sobre 2 s de cada
 * plano en su punto de entrada real:
 *
 *     papas-vuelan  luma  67,0   sat 12,4
 *     alitas        luma 117,4   sat  9,2   ← el outlier: es el único al aire libre
 *     grill         luma  65,5   sat 10,2
 *     emplatado     luma  76,1   sat  8,8
 *     salsa         luma 105,5   sat 12,4
 *
 * `exposicion` lleva cada uno hacia ~85 de luma, que es el punto medio honesto
 * entre el grupo oscuro (65-76) y el claro (105-117). No se fuerza la igualdad
 * completa a propósito: empujar el de 117 hasta 67 lo dejaría gris y sucio.
 * Primero se corrige el clip (esto), después el look de marca (`METRAJE` de
 * `streetcats.ts`) igual para todos — ese orden es el del oficio y no es
 * intercambiable (motor/noticias/montadores.tsx).
 *
 * NINGÚN SEGMENTO SE REPITE salvo uno, y está declarado: `c11-cta` vuelve al
 * plano de la salsa que ya se vio en `c05` y `c09`. Debajo de la tarjeta de
 * dirección el metraje va al 45 % de luz y fuera de foco de atención, así que
 * la repetición no se lee como repetición sino como cierre del mismo gesto que
 * abrió el clímax. Es la única concesión: los otros diez cortes toman tramos
 * disjuntos de sus clips.
 */

/** Corrección POR CLIP para que los cinco partan del mismo sitio. */
export interface Grado {
  /** Multiplicador de brillo. Medido con `signalstats`, no a ojo. */
  exposicion?: number;
  saturacion?: number;
  contraste?: number;
  /** Velo cálido extra. Positivo calienta; negativo enfría. */
  calido?: number;
}

/** Cómo ENTRA un plano. El corte seco es el defecto: en un reel de comida el
 *  ritmo lo llevan los cortes, y una transición en cada uno los anula todos. */
export type Entrada = "corte" | "whip" | "flash";

export interface Corte {
  id: string;
  /** Ruta dentro de `remotion/public/`. */
  src: string;
  /** SEGUNDO de entrada en el clip FUENTE (no frame: los fps no coinciden). */
  desde: number;
  /** Frame ABSOLUTO de la comp en el que entra. */
  en: number;
  /** Frames que dura EN LA COMP (a 30 fps). */
  dur: number;
  reason: string;
  /** Punch-in: escala al entrar → escala al salir. Nada se queda quieto. */
  zoom: readonly [number, number];
  /**
   * % del alto que se SUBE el plano. Positivo enseña la parte de abajo.
   *
   * §pan — DE DÓNDE SALEN ESTOS NÚMEROS, porque a ojo se ponen mal y el fallo
   * (una franja negra en un borde) puede no caer en el frame que revisas.
   *
   * El intérprete pinta `translateY(-pan%) scale(z)`, y en CSS eso es T·S: se
   * escala primero y se desplaza después, así que el `pan` NO lo multiplica la
   * escala. Con el sujeto a la fracción `u` del alto del plano:
   *
   *     para llevarlo a la fracción `d` de la pantalla   pan = 100·(z·(u−0,5) − (d−0,5))
   *     para que el plano SIGA CUBRIENDO el cuadro       pan ≤ 50·(z−1)
   *
   * La segunda es la que muerde: pedir un `pan` grande obliga a un `zoom`
   * grande, no al revés. En el plano del grill el sujeto está en u ≈ 0,76 y se
   * quiere en d ≈ 0,62; las dos ecuaciones juntas dan z ≥ 1,58, y de ahí el
   * 1,60 de `c03` — no de que 1,60 se viera bien.
   *
   * Y esa escala es la que decide la RESOLUCIÓN del archivo: 2160 / 1,78 = 1213
   * px de fuente para 1080 en pantalla, o sea sin subir nada. Por eso el grill
   * es el único de los cinco que se queda en 4K (§ cabecera del 01-plan).
   */
  pan?: number;
  entra?: Entrada;
  grado?: Grado;
}

const PAPAS = "broll/009/009-papas-vuelan.mp4";
const ALITAS = "broll/009/p04-alitas-alitas-de-pollo-con-salsa.mp4";
const GRILL = "broll/009/009-grill.mp4";
const PLATO = "broll/009/009-emplatado.mp4";
const SALSA = "broll/009/009-salsa.mp4";

/* Los cinco grados medidos, cada uno escrito UNA vez. Un plano que vuelve
 * vuelve con su misma corrección: si `c02` y `c06` se corrigieran distinto, el
 * mismo clip cambiaría de color a mitad de vídeo. */
const G_PAPAS: Grado = { exposicion: 1.12 };
const G_ALITAS: Grado = { exposicion: 0.78, saturacion: 1.14, calido: 0.1 };
// `calido` no salía de la medida de luma sino de MIRAR el frame: es el único
// plano de interior frío (el fondo y el pantalón son azules) y sin este empujón
// se lee como de otro local que los otros cuatro.
const G_GRILL: Grado = { exposicion: 1.14, saturacion: 1.08, calido: 0.1 };
const G_PLATO: Grado = { exposicion: 1.06, saturacion: 1.14 };
const G_SALSA: Grado = { exposicion: 0.86 };

export const metraje009: readonly Corte[] = [
  {
    id: "c01-reto",
    src: PAPAS,
    desde: 0.9,
    en: 0,
    dur: 84,
    reason:
      "El plano más violento del lote abre el vídeo: papas en el AIRE. Un reel de comida se gana o se pierde en el primer segundo y este es el único plano con algo volando",
    // Empieza cerrado y ABRE: el gesto acompaña a la papa que cae.
    zoom: [1.16, 1.02],
    grado: G_PAPAS,
  },
  {
    id: "c02-alitas",
    src: ALITAS,
    desde: 0.5,
    en: 84,
    dur: 72,
    reason:
      "La marca es «alitas y papas» y el hook fue todo papas: la segunda cosa que se ve tiene que ser la otra mitad de la promesa",
    // 1,34 no es estética: recorta el cielo quemado del plano al aire libre.
    zoom: [1.34, 1.42],
    pan: 9,
    entra: "whip",
    grado: G_ALITAS,
  },
  {
    id: "c03-brasa",
    src: GRILL,
    desde: 1.2,
    en: 156,
    dur: 66,
    reason:
      "Manos y pinzas: es el plano que dice «alguien lo está haciendo AHORA», que es lo que sostiene el texto «hechas al momento»",
    // EL PUNCH-IN DE ESTE PLANO NO ES ESTILO, ES RESCATE. En el encuadre
    // original la comida ocupa una banda estrecha al 76 % del alto y los dos
    // tercios de arriba son un pantalón vaquero desenfocado. A 1,02 (lo que
    // había) el plano se leía como una pierna azul, y era el más repetido del
    // vídeo. Ver §pan para de dónde salen el 1,60 y el 28.
    zoom: [1.6, 1.72],
    pan: 28,
    grado: G_GRILL,
  },
  {
    id: "c04-papas",
    src: PLATO,
    desde: 0.5,
    en: 222,
    dur: 66,
    reason: "Vuelve la papa, ya servida: cierra el par alitas→papas antes de que entre la salsa",
    zoom: [1.08, 1.18],
    entra: "whip",
    grado: G_PLATO,
  },
  {
    id: "c05-salsa",
    src: SALSA,
    desde: 0.3,
    en: 288,
    dur: 66,
    reason: "Primer contacto con la salsa: se planta el gesto que luego se cobrará en el clímax",
    zoom: [1.16, 1.04],
    grado: G_SALSA,
  },
  {
    id: "c06-crujiente",
    src: ALITAS,
    desde: 4.8,
    en: 354,
    dur: 60,
    reason: "Segundo tramo del plano de alitas, ya con más humo: sostiene «crujientes por fuera»",
    zoom: [1.42, 1.34],
    pan: 9,
    grado: G_ALITAS,
  },
  {
    id: "c07-jugoso",
    src: GRILL,
    desde: 4.2,
    en: 414,
    dur: 60,
    reason: "El par de texturas se cierra sobre el pollo en la plancha, que es donde se ve el jugo",
    // Más cerrado que `c03` (1,78 contra 1,60) y por eso NO se lee como el mismo
    // plano repetido, aunque el clip sea el mismo: a esta distancia solo hay
    // pinzas y pollo, y aquel todavía enseña la plancha.
    zoom: [1.78, 1.66],
    pan: 32,
    grado: G_GRILL,
  },
  {
    id: "c08-porciones",
    src: PLATO,
    desde: 4.4,
    en: 474,
    dur: 60,
    reason:
      "La bandeja ya llena es el único plano que argumenta CANTIDAD, que es el último argumento antes del clímax",
    zoom: [1.06, 1.16],
    // Baja la mirada a la bandeja: lo que importa está en el tercio inferior.
    pan: 4,
    grado: G_PLATO,
  },
  {
    id: "c09-antojo",
    src: SALSA,
    desde: 2.6,
    en: 534,
    dur: 96,
    reason:
      "EL CLÍMAX. El plano más goloso del lote (queso + salsa cayendo) y el más largo hasta aquí: aquí se cobra el reto del segundo 0",
    // El único que se acerca lentamente en vez de golpear: se mira, no se corta.
    zoom: [1.02, 1.14],
    entra: "flash",
    grado: G_SALSA,
  },
  {
    id: "c10-marca",
    src: GRILL,
    desde: 7.2,
    en: 630,
    dur: 96,
    reason:
      "Tramo final del grill, el más oscuro de los tres: es la cama del nombre. Debajo de la revelación el metraje tiene que CALLARSE, no competir",
    // El más ABIERTO de los tres tramos de grill, al revés que en c03/c07: aquí
    // el plano no tiene que enseñar comida, tiene que ser una cama con movimiento
    // debajo del nombre. Aun así lleva pan: sin él, lo que queda bajo el velo es
    // el pantalón.
    zoom: [1.6, 1.48],
    pan: 22,
    entra: "flash",
    grado: G_GRILL,
  },
  {
    id: "c11-cta",
    src: SALSA,
    desde: 0.6,
    en: 726,
    dur: 216,
    reason:
      "La única repetición del vídeo, y va aquí a propósito: bajo la tarjeta de dirección el metraje está al 45 % y nadie lo está mirando. Cierra con el mismo gesto que abrió el clímax",
    zoom: [1.02, 1.16],
    grado: G_SALSA,
  },
];

/** Frames totales de la pieza: lo que dure el último corte. Nadie los cuenta a
 *  mano — si se alarga un corte, la `<Composition>` se entera sola. */
export const DURACION_009 = metraje009.reduce((max, c) => Math.max(max, c.en + c.dur), 0);
