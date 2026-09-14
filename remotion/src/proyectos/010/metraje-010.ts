/**
 * PLAN DE MONTAJE — proyecto 010 · «Gracias, Chocó» (30 fps · 2234 f · 74,47 s).
 * Artefactos: proyectos/010/artefactos/{01-plan,03-timeline}.md
 *
 * HERMANO DEL `metraje-009.ts`, con tres cosas que aquel no necesitaba:
 * FOTOS, VELOCIDAD y DISOLVENCIA. Las tres entran porque el material lo obliga,
 * no porque quedaran bonitas:
 *
 *   · `tipo: "foto"` — ocho de los treinta cortes son fotografías, y no son el
 *     relleno: a 1600² son el material MÁS NÍTIDO de la pieza (los vídeos vienen
 *     de 576 px de ancho). Por eso ocupan los momentos que hay que sostener —la
 *     apertura, la reconstrucción y el cierre— y no los de movimiento.
 *   · `velocidad` — `v-ninos` dura 5,3 s y tiene que cubrir 7,8 s del beat más
 *     importante. Es el ÚNICO clip que la usa.
 *   · `entra: "disolver"` — tres veces en toda la pieza. El encargo pide cortes
 *     secos y prohíbe glitches, zooms y flashes; la disolvencia solo aparece
 *     donde el corte seco mentiría sobre el tono (§entra).
 *
 * LA UNIDAD DE `desde` ES EL SEGUNDO DEL CLIP FUENTE, igual que en el 009 y por
 * la misma razón, aunque aquí los cinco vídeos ya estén normalizados a 30 fps:
 * `desde` describe el MATERIAL, y el material no debe depender de a qué fps se
 * montó esta pieza concreta.
 *
 * NINGÚN TRAMO DE VÍDEO SE REPITE. Se comprobó rango a rango (`revisar-010.mjs`
 * lo verifica en cada arranque). La única repetición de la pieza es deliberada
 * y es una FOTO: `f-bote` abre en `c01` y cierra en `c30`. Volver al mismo plano
 * con otra frase encima es lo que convierte «esto se acabó» en «esto sigue».
 */

import type { Corte as CorteDelFormato, Grado } from "../../motor/metraje";

/**
 * §entra — cómo entra un plano.
 *
 * `corte` es el defecto y es casi siempre lo correcto: el encargo pide cortes
 * secos, match cuts y movimiento de cámara, y prohíbe explícitamente glitches,
 * zoom transitions, spins y flashes. `disolver` existe para los TRES sitios en
 * que el corte seco diría algo falso:
 *
 *   c10 (600)  entrar a los niños      — el corte seco marcaría continuidad de
 *                                        ritmo justo donde el ritmo se frena
 *   c20 (1297) entrar a «no termina»   — el giro de tono de la pieza: del
 *                                        bullicio del agradecimiento al silencio
 *   c30 (2100) entrar a la imagen final — se vuelve a la primera foto; la
 *                                        disolvencia dice «vuelve», el corte no
 */
export type Entrada = "corte" | "disolver";

/**
 * El `Corte` del formato (`motor/metraje/corte.ts`) con lo que esta pieza fija:
 * `tipo` explícito en los treinta —ocho son fotos— y solo las entradas de §entra.
 *
 * §techo — POR QUÉ NINGÚN `zoom` PASA DE 1,20. Los vídeos se normalizaron a
 * 1296 px de ancho, que es 1080 × 1,2: a 1,20 el plano todavía muestrea ≥1080 px
 * del archivo y el navegador REDUCE. Pedir 1,4 obligaría a ampliar dos veces
 * (576 → 1296 en ffmpeg, 1296 → 1512 en el navegador) sobre un origen que ya era
 * el eslabón débil. Las fotos aguantan más (1600²) pero se les aplica el mismo
 * techo para que el gesto de la pieza sea uno solo. Lo mide `revisar-010.mjs`.
 */
export interface Corte extends CorteDelFormato<Entrada> {
  tipo: "video" | "foto";
}

/* ── FUENTES ──────────────────────────────────────────────────────────────── */
const LANCHA = "choco-010/v-lancha.mp4";
const CAMION = "choco-010/v-camion.mp4";
const MERCADOS = "choco-010/v-mercados.mp4";
const NINOS = "choco-010/v-ninos.mp4";
const PUEBLO = "choco-010/v-gracias.mp4";
const F_BOTE = "choco-010/f-bote.jpg";
const F_CASA1 = "choco-010/f-casa1.jpg";
const F_CASA2 = "choco-010/f-casa2.jpg";
const F_CASA3 = "choco-010/f-casa3.jpg";
const F_APIE = "choco-010/f-apie.jpg";
const F_ENT1 = "choco-010/f-entrega1.jpg";
const F_ENT2 = "choco-010/f-entrega2.jpg";
const F_ENT3 = "choco-010/f-entrega3.jpg";

/**
 * LA VELOCIDAD DEL BEAT DE LOS NIÑOS, y no es un número elegido a gusto: es el
 * único que existe.
 *
 *   material útil de `v-ninos`   5,267 − 0,05 =  5,217 s
 *   hueco que hay que cubrir     235 f / 30    =  7,833 s
 *   velocidad                    5,217 / 7,833 =  0,666
 *
 * UNA sola velocidad para los tres cortes, no tres. Se escribió primero con
 * 0,80 / 0,70 / 0,68 —repartidas «a oído», más lento en el plano de la mano— y
 * la puerta (`revisar-010.mjs`) lo tumbó: sumadas pedían 5,75 s de un clip de
 * 5,27 s. Remotion no habría fallado, habría CONGELADO el último fotograma
 * medio segundo, y eso no sale en ningún frame que se revise a mano.
 *
 * Que sea uniforme además se ve mejor: tres velocidades distintas en 7,8 s se
 * leen como tres efectos; una sola se lee como que aquí el mundo va más
 * despacio, que es lo que se quería decir. 0,666 es ×1,5 — dentro del «slow
 * motion muy ligero» del encargo, y el único sitio de la pieza donde aparece.
 */
const VEL_NINOS = 0.666;

/* ── GRADOS ───────────────────────────────────────────────────────────────────
 * Por TRAMO, medidos con `ffmpeg signalstats` y con objetivo ~118 de luma.
 *
 * `v-lancha` es UN plano de 32 s que recorre 120 → 98 de luma (río a pleno día
 * → interior del camión). Graduarlo por archivo dejaría el interior gris o el
 * río quemado, así que se gradúa por TRAMO. La regla del 009 se conserva donde
 * importa: cada tramo tiene una corrección y la mantiene en todas sus entradas.
 *
 * El interior del camión se sube a 1,12 y no a 1,18 (lo que pedía la medida):
 * es un interior y tiene que seguir pareciéndolo. Igualar del todo lo dejaría
 * lavado, que es el error contrario y se nota más.
 */
const G_L_RIO: Grado = { exposicion: 0.98 };
const G_L_ORILLA: Grado = { exposicion: 1.04 };
const G_L_CAMION: Grado = { exposicion: 1.12, saturacion: 0.95 };
const G_C_CABINA: Grado = { exposicion: 1.06 };
const G_C_CALLE: Grado = { exposicion: 0.88, saturacion: 1.12 };
const G_MERCADOS: Grado = { exposicion: 0.86, saturacion: 1.06 };
/** Los niños son el pico de esperanza: única subida de cálido junto al pueblo. */
const G_NINOS: Grado = { exposicion: 0.92, saturacion: 1.06, calido: 0.05 };
const G_PUEBLO: Grado = { exposicion: 1.05, saturacion: 1.02, calido: 0.05 };
const G_BOTE: Grado = { exposicion: 0.78, saturacion: 1.08 };
/** Las casas ENFRÍAN. El encargo pide evitar imágenes felices en este beat. */
const G_CASA: Grado = { exposicion: 0.95, saturacion: 0.96, calido: -0.02 };
const G_APIE: Grado = { exposicion: 0.97, saturacion: 1.04 };
const G_ENT1: Grado = { exposicion: 1.09, saturacion: 1.04 };
const G_ENT2: Grado = { exposicion: 1.06, saturacion: 1.04 };
const G_ENT3: Grado = { exposicion: 1.2, saturacion: 1.04 };

export const metraje010: readonly Corte[] = [
  /* ── HOOK · 0–176 (0,00–5,86 s) ── «Llegamos donde solo se podía llegar por
   *    río, pero esta historia todavía no termina.»
   *    Tres cortes rápidos. Sin logo y sin pantalla de título: el encargo lo
   *    prohíbe y el feed lo castiga. */
  {
    id: "c01-rio",
    tipo: "foto",
    src: F_BOTE,
    en: 0,
    dur: 75,
    reason:
      "La imagen más fuerte del lote abre la pieza: DENTRO de la chalupa, las cajas de ayuda en el suelo y el río marrón. Dice «por río» sin que haga falta el rótulo, y es la única foto vertical nativa (900×1600) — la más nítida que hay",
    zoom: [1.02, 1.1],
    grado: G_BOTE,
  },
  {
    id: "c02-carga",
    tipo: "video",
    src: LANCHA,
    desde: 0.6,
    en: 75,
    dur: 55,
    reason: "Prueba de que la chalupa iba cargada: los bultos entrando en la embarcación",
    zoom: [1.12, 1.02],
    grado: G_L_RIO,
  },
  {
    id: "c03-orilla",
    tipo: "foto",
    src: F_APIE,
    en: 130,
    dur: 46,
    reason:
      "«pero esta historia todavía no termina» cae sobre gente SUBIENDO del río con las ayudas: movimiento hacia arriba y hacia dentro del territorio, no un punto final",
    zoom: [1.08, 1.16],
    grado: G_APIE,
  },

  /* ── LA AYUDA LLEGÓ · 176–446 (5,86–14,88 s) ── */
  {
    id: "c04-llegaron",
    tipo: "video",
    src: LANCHA,
    desde: 9.4,
    en: 176,
    dur: 70,
    reason: "«Las ayudas llegaron a comunidades apartadas del Chocó»: la orilla con las chalupas varadas",
    zoom: [1.04, 1.12],
    grado: G_L_ORILLA,
  },
  {
    id: "c05-chalupas",
    tipo: "video",
    src: LANCHA,
    desde: 3.6,
    en: 246,
    dur: 58,
    reason: "«Varias chalupas vinieron a recoger…»: la palabra chalupa necesita la chalupa en el agua",
    zoom: [1.1, 1.02],
    grado: G_L_RIO,
  },
  {
    id: "c06-mercados",
    tipo: "video",
    src: LANCHA,
    desde: 12.2,
    en: 304,
    dur: 72,
    reason: "«mercados»: cajas bajando por la rampa hacia el agua, de mano en mano",
    zoom: [1.02, 1.12],
    grado: G_L_ORILLA,
  },
  {
    id: "c07-esenciales",
    tipo: "video",
    src: LANCHA,
    desde: 16.6,
    en: 376,
    dur: 70,
    reason:
      "«medicina y elementos esenciales»: el interior del camión, que es donde se ve la CANTIDAD — es el único plano que enseña el volumen entero de lo recogido",
    zoom: [1.14, 1.04],
    grado: G_L_CAMION,
  },

  /* ── EL VIAJE · 446–600 (14,88–19,99 s) ── respiración visual: dos planos
   *    largos, uno de trayecto y uno de llegada. */
  {
    id: "c08-trayecto",
    tipo: "video",
    src: CAMION,
    desde: 9.4,
    en: 446,
    dur: 78,
    reason:
      "«para llevarlo hasta las familias»: POV desde el parabrisas por las calles del Chocó. El viaje se cuenta desde dentro del viaje",
    zoom: [1.02, 1.1],
    grado: G_C_CALLE,
  },
  {
    id: "c09-familias",
    tipo: "video",
    src: MERCADOS,
    desde: 5.2,
    en: 524,
    dur: 76,
    reason:
      "«que difícilmente les llega ayuda»: la bolsa pasando de una mano a otra. La frase habla de escasez y el plano enseña el gesto exacto que la rompe",
    zoom: [1.1, 1.02],
    grado: G_MERCADOS,
  },

  /* ── LOS NIÑOS · 600–835 (19,99–27,84 s) ── EL PICO.
   *    5,3 s de material para 7,8 s de beat: velocidad 0,80 / 0,70 / 0,68.
   *    El ritmo baja aquí y solo aquí. */
  {
    id: "c10-nina",
    tipo: "video",
    src: NINOS,
    desde: 0.05,
    en: 600,
    dur: 78,
    velocidad: VEL_NINOS,
    entra: "disolver",
    reason:
      "«También entregamos juguetes a los niños»: la niña con la muñeca rosa, mirando a cámara. Se entra disolviendo porque aquí el vídeo cambia de marcha",
    zoom: [1.12, 1.03],
    grado: G_NINOS,
  },
  {
    id: "c11-mano",
    tipo: "video",
    src: NINOS,
    desde: 1.782,
    en: 678,
    dur: 90,
    velocidad: VEL_NINOS,
    reason:
      "«y verlos sonreír, aunque fuera por un momento»: la mano que se extiende hacia la cámara. Es EL gesto de la pieza, y por eso es el corte más largo del beat (90 f): a 0,666 son tres segundos de pantalla para dos de material",
    zoom: [1.03, 1.14],
    grado: G_NINOS,
  },
  {
    id: "c12-calle",
    tipo: "video",
    src: NINOS,
    desde: 3.78,
    en: 768,
    dur: 67,
    velocidad: VEL_NINOS,
    reason:
      "«Nos recordó que valió la pena cada esfuerzo»: se ABRE del primer plano a los tres niños en la calle. La cámara se aleja justo cuando la voz saca la conclusión — del niño concreto al sentido de todo. Consume los 1,49 s que quedaban del clip: no sobra ni un fotograma",
    zoom: [1.18, 1.1],
    grado: G_NINOS,
  },

  /* ── GRACIAS · 835–1297 (27,84–43,22 s) ── montaje dinámico de gente
   *    trabajando. Siete cortes de ~2,1 s: es el tramo más rápido después del
   *    gancho, y es lo que pide una lista de nombres. */
  {
    id: "c13-dono",
    tipo: "video",
    src: LANCHA,
    desde: 19.0,
    en: 835,
    dur: 66,
    reason: "«Gracias a cada persona que donó»: manos pasando bultos dentro del camión",
    zoom: [1.06, 1.14],
    grado: G_L_CAMION,
  },
  {
    id: "c14-voluntario",
    tipo: "video",
    src: LANCHA,
    desde: 21.3,
    en: 901,
    dur: 66,
    reason:
      "«a cada voluntario»: el jersey JUAN PAPITAS 96 de espaldas, cargando. El nombre de quien organiza aparece en la ropa de alguien trabajando, no en un rótulo",
    zoom: [1.14, 1.06],
    grado: G_L_CAMION,
  },
  {
    id: "c15-negocios",
    tipo: "foto",
    src: F_ENT3,
    en: 967,
    dur: 63,
    reason:
      "Sobre los nombres de los negocios va el RESULTADO —las bolsas ya puestas junto a la casa—, no más metraje de camión: lo que se les agradece es esto",
    zoom: [1.04, 1.12],
    grado: G_ENT3,
  },
  {
    id: "c16-comunal",
    tipo: "foto",
    src: F_ENT1,
    en: 1030,
    dur: 66,
    reason: "«la acción comunal de Santa Lucía»: la entrega bajo el cobertizo, en la comunidad y no en el muelle",
    zoom: [1.12, 1.04],
    grado: G_ENT1,
  },
  {
    id: "c17-amigos",
    tipo: "video",
    src: LANCHA,
    desde: 23.6,
    en: 1096,
    dur: 66,
    reason: "«amigos en México, Costa Rica, Estados Unidos»: vuelve el trabajo colectivo, la descarga en cadena",
    zoom: [1.04, 1.12],
    grado: G_L_CAMION,
  },
  {
    id: "c18-personas",
    tipo: "video",
    src: CAMION,
    desde: 2.4,
    en: 1162,
    dur: 60,
    reason:
      "Sobre los nombres propios (Paloma, Morgan, Donovan) va quien conduce, no un primer plano de nadie: poner una cara desconocida bajo un nombre concreto sería atribuirle a alguien lo que hizo otro, y la de él ya está establecida en toda la pieza. Se probó primero el detalle de las manos en la consola (`desde: 0.1`) y el frame renderizado lo desmintió: a 1,16 de zoom la consola es un amasijo oscuro sin punto de lectura — el plano más flojo de los treinta. Este tramo tiene calle por la ventanilla y luz",
    // 1,08→1,02 y no 1,16→1,08: aquí el encuadre ya funciona y no hay nada que
    // rescatar con el punch-in, que era lo único que justificaba cerrarlo tanto.
    zoom: [1.08, 1.02],
    grado: G_C_CABINA,
  },
  {
    id: "c19-nuestras",
    tipo: "video",
    src: MERCADOS,
    desde: 10.3,
    en: 1222,
    dur: 75,
    reason:
      "«y especialmente a nuestras familias»: la fila larga de familias con sus bolsas. El plano más ancho del bloque cierra la lista abriendo el plano",
    zoom: [1.1, 1.02],
    grado: G_MERCADOS,
  },

  /* ── NO TERMINA · 1297–1606 (43,22–53,54 s) ── el giro. Se frena, se enfría
   *    y entran las fotos: tres casas y una espera. Nada alegre, por encargo. */
  {
    id: "c20-aqui",
    tipo: "foto",
    src: F_CASA1,
    en: 1297,
    dur: 78,
    entra: "disolver",
    reason:
      "«Pero esto no termina aquí»: del bullicio a una casa de madera quieta. La disolvencia es el giro de tono de la pieza entera — un corte seco aquí sonaría a otro plano más del montaje",
    zoom: [1.02, 1.09],
    grado: G_CASA,
  },
  {
    id: "c21-rutina",
    tipo: "foto",
    src: F_CASA2,
    en: 1375,
    dur: 78,
    reason: "«mientras muchos ya vivimos nuestra rutina»: los palafitos siguen ahí, sin nadie, sin música y sin épica",
    zoom: [1.09, 1.02],
    grado: G_CASA,
  },
  {
    id: "c22-reconstruyendo",
    tipo: "foto",
    src: F_CASA3,
    en: 1453,
    dur: 78,
    reason:
      "«están reconstruyendo sus hogares»: la casa con los enseres todavía fuera. Es la única imagen del lote que muestra una vivienda a medio rehacer, y va exactamente en su frase",
    zoom: [1.02, 1.09],
    grado: G_CASA,
  },
  {
    id: "c23-esperando",
    tipo: "video",
    src: MERCADOS,
    desde: 0.2,
    en: 1531,
    dur: 75,
    reason:
      "«y esperando soluciones. No podemos olvidarlos»: gente ESPERANDO de pie. Después de tres fotos sin nadie, el beat tenía que volver a una cara antes de la frase que pide no olvidar",
    zoom: [1.08, 1.02],
    grado: G_MERCADOS,
  },

  /* ── PUEBLO UNIDO · 1606–1929 (53,54–64,30 s) ── la cola de `v-gracias`:
   *    once segundos en que no habla nadie y saluda todo el mundo. */
  {
    id: "c24-diferencias",
    tipo: "video",
    src: PUEBLO,
    desde: 28.5,
    en: 1606,
    dur: 80,
    reason: "«Si apartamos nuestras diferencias»: la calle llena, gente de todas las edades junta",
    zoom: [1.06, 1.13],
    grado: G_PUEBLO,
  },
  {
    id: "c25-pueblo",
    tipo: "video",
    src: PUEBLO,
    desde: 31.2,
    en: 1686,
    dur: 80,
    reason: "«podemos ser un pueblo unido»: empiezan los saludos, las primeras manos en alto",
    zoom: [1.13, 1.05],
    grado: G_PUEBLO,
  },
  {
    id: "c26-nacion",
    tipo: "video",
    src: PUEBLO,
    desde: 33.9,
    en: 1766,
    dur: 84,
    reason:
      "«una nación que respire solidaridad, amor y esperanza»: TODOS saludando a la vez, brazos arriba. Es el plano que literalmente enseña la frase, y por eso es el más largo del beat",
    zoom: [1.04, 1.12],
    grado: G_PUEBLO,
  },
  {
    id: "c27-dios",
    tipo: "video",
    src: PUEBLO,
    desde: 36.55,
    en: 1850,
    dur: 79,
    reason: "«y bajo la guía de Dios vamos a salir adelante»: siguen las sonrisas, ya sin manos en alto — se serena",
    zoom: [1.12, 1.04],
    grado: G_PUEBLO,
  },

  /* ── CIERRE · 1929–2234 (64,30–74,47 s) ── se desacelera del todo y se vuelve
   *    al principio. Los últimos 60 f van más allá de la voz: son los ~2 s de
   *    rótulo limpio que pide el encargo. */
  {
    id: "c28-noticia",
    tipo: "video",
    src: LANCHA,
    desde: 6.6,
    en: 1929,
    dur: 81,
    reason: "«Que la ayuda no termine cuando termina la noticia»: la chalupa y el río, sin nadie trabajando ya",
    zoom: [1.08, 1.02],
    grado: G_L_RIO,
  },
  {
    id: "c29-granito",
    tipo: "foto",
    src: F_ENT2,
    en: 2010,
    dur: 90,
    reason:
      "«sigamos siendo ese granito de arena»: la comunidad reunida bajo el cobertizo con las ayudas repartidas. Gente, no paisaje: el granito de arena son ellos",
    zoom: [1.02, 1.08],
    grado: G_ENT2,
  },
  {
    id: "c30-adelante",
    tipo: "foto",
    src: F_BOTE,
    en: 2100,
    dur: 134,
    entra: "disolver",
    reason:
      "VUELVE `c01`. El río desde dentro de la chalupa, ahora con «poco a poco salgamos adelante» y el rótulo de cierre. Es la única repetición de la pieza y es la tesis: se acaba donde empezó, pero el viaje sigue. Se entra disolviendo — el corte seco diría «plano nuevo», y este no lo es",
    zoom: [1.1, 1.02],
    grado: G_BOTE,
  },
];

/** La duración sale del PLAN, no de una constante suelta que se olvida de actualizar. */
export const DURACION_010 = metraje010.reduce((f, c) => Math.max(f, c.en + c.dur), 0);
