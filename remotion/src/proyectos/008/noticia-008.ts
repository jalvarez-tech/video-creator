/**
 * PROYECTO 008 — «La tragedia no termina cuando deja de ser noticia.» (v6 · variante STREET CATS)
 *
 * Campaña de ayuda humanitaria para las familias afectadas por el terremoto
 * en Chocó (Quibdó). V6: el punto de recolección de esta VARIANTE es
 * STREET CATS (Caldas, Antioquia · Cra 48 # 132A sur - 24); el camión (8 t)
 * sigue siendo de la familia de Juan Pablo Rico. La versión Juan Papitas
 * quedó renderizada como v5 (guion-vo y partes respaldados con sufijo v51).
 *
 * V4 — LA VOZ ES DEL CLIENTE (Voz-en-off-choco.wav, 2026-08-13): su lectura
 * ES el guion definitivo y trae cambios que este plan asume:
 *   · dice «familias del Chocó» (no «de Quibdó»),
 *   · MATERIALES va ANTES que SEDES («también si deseas donar cemento o
 *     varillas… tráelo a cualquiera de las dos sedes»), y el flujo mejora:
 *     la petición desemboca en la tarjeta de direcciones,
 *   · nombra las sedes EN VOZ («en Santa Lucía o en el 20 de Julio») justo
 *     cuando la tarjeta las enseña,
 *   · «sería de maravilla» queda como beat propio (m01c),
 *   · y LEE la frase final (sil9v ahora lleva voz).
 * La pista se cortó por tiempos de PALABRA (Whisper -ojf) en 22 partes y se
 * montó con generar-vo.sh --motor propio --pausa 0.
 *
 * V5 (pedido del cliente tras ver la v4): las entradas DISRUPTIVAS se
 * revirtieron — vuelve la ley editorial (muelle en escalera) que le gustaba —
 * y el montaje SIGUE EL RITMO DE LA VOZ SIN PAUSAS: fuera el hold de la
 * tarjeta de direcciones (sil3), fuera el claim (sil6, su contenido ya está
 * en la voz) y la foto de los niños pasó DESPUÉS de la frase final. La voz
 * corre continua (0→68,2 s) y los únicos silencios son el cierre: niños
 * (2 s) + versículo (4 s). 74,21 s = 2226 f.
 * Se mantienen de la v4: las ATMÓSFERAS por sección (Noticia008.tsx) y los
 * DIP de salida en los cortes imagen→imagen.
 *
 * CRITERIO EDITORIAL (01-plan.md): pieza con víctimas — daño por metonimia
 * (más la foto REAL del cliente en el gancho), sin rostros de archivo como
 * damnificados, UN sharp y DOS deep en total, la voz manda.
 *
 * B-ROLL: banco Pexels + 3 fotos del CLIENTE (daño real, playa, niños) —
 * manifiesto con autor/licencia/sha256. Grado por toma = corrección MEDIDA
 * por `bancos.py gradar` + el arco frío→cálido (01-plan.md).
 */
import { capa, dialectoEditorialDe } from "../../motor/noticias/dialecto";
import { CHOCO } from "../../marcas/choco";

const { pon, col, gfx, plan, tras } = capa(dialectoEditorialDe(CHOCO), "noticia");

/** Media a sangre y velo entran quietos (regla `veloProtege`). */
const QUIETA = { como: "ninguna" } as const;

/** El texto sobre metraje cuelga del tercio inferior (banda del velo). */
const CUELGA = { desde: "centro", pct: 0.5, cuelga: 560 / 1920 } as const;

/** SALIDA en fundido corto para los cortes imagen→imagen: el punch del molde
 *  escala imagen+velo hasta 1,015 y al cortar contra otra imagen el borde
 *  del degradado SALTA; 8 f de dip a negro lo leen como corte de cine. */
const DIP = { como: "fundido", dur: 8 } as const;

/** LOS ARCHIVOS. Rutas relativas a remotion/public/. Autor/licencia/sha256:
 *  proyectos/008/broll/manifiesto.json. */
const SRC = {
  /** Foto del CLIENTE: el daño REAL en Quibdó (899×1600, upscale 1,2×). */
  dano: "broll/008/cliente-dano-real.jpg",
  /** Foto del CLIENTE: playa del Pacífico chocoano (1080×1350, ×1,42). */
  playa: "broll/008/cliente-choco-playa.jpg",
  manosBolsas: "broll/008/c01-volunteers-passing-food-donation-bags.mp4",
  camaraTv: "broll/008/c04-television-broadcast-camera-studio.mp4",
  /** Dedo de bebé en mano adulta, sin rostros (William Fortunato). */
  manoNino: "broll/008/c06a-child-holding-parents-hand-walking.mp4",
  alimentos: "broll/008/n01a-canned-food-rice-donation-box.mp4",
  varillas: "broll/008/m02a-steel-rebar-bars-construction-site.mp4",
  cajas: "broll/008/f01-unloading-boxes-from-van.mp4",
  granito: "broll/008/f06-hand-giving-single-grocery-bag-donation.mp4",
  /** La foto del cliente del cierre. */
  ninos: "broll/008/cliente-final-ninos.jpg",
} as const;

export const noticia008 = plan({ ancho: 1080, alto: 1920, fps: 30, duracion: 2215 }, [
  // ══ GANCHO ════════════════════════════════════════════════════════════════
  gfx(
    "g01",
    "cine",
    "gancho",
    [0, 142],
    "hero",
    "«Dejaremos de hablar del terremoto» sobre el daño REAL del cliente, con el titular en la entrada editorial de siempre (v5: el cliente prefirió el muelle a los barridos).",
    [
      pon("media", { src: SRC.dano, sangre: true, grado: { saturacion: 0.88 }, en: 0, entra: QUIETA, sale: DIP }),
      pon("velo", { en: 0, entra: QUIETA, sale: DIP }),
      pon("titular", { rol: "hero", px: 64, color: "blanco", lineas: ["Dejaremos de hablar", "del terremoto."], sale: DIP }),
    ],
    { ancla: CUELGA, sonido: "s-g01" }
  ),
  gfx(
    "g02",
    "cine",
    "gancho",
    [142, 273],
    "hero",
    "«Para las familias del Chocó» —como lo dice la voz— sobre la playa del cliente a pantalla completa; CHOCÓ en blanco.",
    [
      pon("media", { src: SRC.playa, sangre: true, grado: { saturacion: 0.9 }, en: 0, entra: QUIETA, sale: DIP }),
      pon("velo", { en: 0, entra: QUIETA, sale: DIP }),
      pon("kicker", { texto: "CHOCÓ", px: 54, color: "blanco", sale: DIP }),
    ],
    { ancla: CUELGA, sonido: "s-g02" }
  ),

  // ══ CONTEXTO ══════════════════════════════════════════════════════════════
  gfx(
    "c01",
    "cine",
    "contexto",
    [273, 340],
    "hero",
    "«Hoy toda Colombia está ayudando»: manos empacando víveres.",
    [
      pon("media", { src: SRC.manosBolsas, esVideo: true, sangre: true, grado: { exposicion: 0.815, saturacion: 1.077, calido: -0.015 }, en: 0, entra: QUIETA }),
      pon("velo", { en: 0, entra: QUIETA }),
      pon("titular", { rol: "hero", px: 64, color: "blanco", lineas: ["Hoy toda Colombia", "está ayudando."] }),
    ],
    { ancla: CUELGA, sonido: "s-c01" }
  ),
  gfx(
    "c02a",
    "papel",
    "contexto",
    [340, 392],
    "hero",
    "«Las noticias cambian» en papel: el pivote, en seco.",
    [col([pon("titular", { rol: "hero", px: 68, texto: "Las noticias cambian." })], { gap: 20 })],
    { sonido: "s-c02a" }
  ),
  gfx(
    "c02b",
    "cine",
    "contexto",
    [392, 433],
    "hero",
    "«…y las cámaras se van»: la cámara de TV como objeto.",
    [
      pon("media", { src: SRC.camaraTv, esVideo: true, sangre: true, grado: { exposicion: 1.25, saturacion: 1.104, calido: -0.015 }, en: 0, entra: QUIETA }),
      pon("velo", { en: 0, entra: QUIETA }),
      pon("titular", { rol: "hero", px: 62, color: "blanco", texto: "Las cámaras se van." }),
    ],
    { ancla: CUELGA, sonido: "s-c02b" }
  ),
  gfx(
    "c03a",
    "papel",
    "contexto",
    [433, 486],
    "hero",
    "«Cuando la ayuda disminuya…» — la advertencia en papel.",
    [col([pon("titular", { rol: "hero", px: 84, lineas: ["Cuando la ayuda", "disminuya…"] })], { gap: 20 })],
    { sonido: "s-c03a" }
  ),
  gfx(
    "c03b",
    "cine",
    "contexto",
    [486, 593],
    "hero",
    "«…muchas familias seguirán sin poder volver a casa» sobre el dedo del niño en la mano adulta.",
    [
      pon("media", { src: SRC.manoNino, esVideo: true, sangre: true, grado: { exposicion: 0.84, saturacion: 0.85, calido: -0.12 }, en: 0, entra: QUIETA }),
      pon("velo", { en: 0, entra: QUIETA }),
      pon("titular", { rol: "hero", px: 58, color: "blanco", lineas: ["Muchas familias no podrán", "volver a casa."] }),
    ],
    { ancla: CUELGA, sonido: "s-c03b" }
  ),

  // ══ CONFLICTO — la decisión y el camión ═══════════════════════════════════
  gfx(
    "d01",
    "papel",
    "conflicto",
    [593, 721],
    "hero",
    "La decisión de la campaña, rasgada en display grande: llegar después ES la tesis.",
    [col([pon("titular", { rol: "hero", px: 90, lineas: ["Queremos llegar", "después."] })], { gap: 20 })],
    { sonido: "s-d01" }
  ),
  gfx(
    "d02a",
    "cine",
    "conflicto",
    [721, 779],
    "hero",
    "El dato de la campaña con el único golpe metálico: OCHO toneladas. Kicker y etiqueta en snap; la cifra trae su propio golpe.",
    [
      col(
        [
          pon("kicker", { texto: "TENEMOS UN CAMIÓN DE", color: "blanco" }),
          pon("cifra", { id: "c8", rol: "hero", color: "blanco", px: 240, valor: 8, dur: 24, golpe: true }),
          pon("etiqueta", { texto: "toneladas", color: "blanco", en: tras("c8", 4) }),
        ],
        { gap: 14 }
      ),
    ],
    { sonido: "s-d02a" }
  ),
  gfx(
    "d02b",
    "cine",
    "conflicto",
    [779, 820],
    "hero",
    "«Y queremos llenarlo» sobre negro: la misión en cuatro palabras.",
    [col([pon("titular", { rol: "hero", px: 92, color: "blanco", texto: "Y queremos llenarlo." })], { gap: 24 })],
    { sonido: "s-d02b" }
  ),

  // ══ EXPLICACIÓN — qué recolectamos ════════════════════════════════════════
  gfx(
    "n01a",
    "cine",
    "explicacion",
    [820, 948],
    "hero",
    "El inventario arranca con el grano cayendo entre manos; la tarjeta siguiente detalla.",
    [
      pon("media", { src: SRC.alimentos, esVideo: true, sangre: true, grado: { exposicion: 0.8, saturacion: 0.85, calido: -0.094 }, en: 0, entra: QUIETA }),
      pon("velo", { en: 0, entra: QUIETA }),
      pon("titular", { rol: "hero", px: 66, color: "blanco", texto: "Vamos a recolectar…" }),
    ],
    { ancla: CUELGA, sonido: "s-n01a" }
  ),
  gfx(
    "n01b",
    "papel",
    "explicacion",
    [948, 1032],
    "hero",
    "La lista mientras la voz la enumera.",
    [
      col(
        [
          pon("kicker", { texto: "VAMOS A RECOLECTAR" }),
          pon("titular", { id: "t-lista", rol: "hero", px: 64, lineas: ["Alimentos · Agua · Aseo", "Cobijas · Carpas"] }),
          pon("etiqueta", { texto: "Y colchonetas para pasar estos días.", en: tras("t-lista", 5) }),
        ],
        { gap: 20 }
      ),
    ],
    { sonido: "s-n01b" }
  ),

  // ══ DATOS 1 — la donación en especie (ANTES de sedes, como lo lee la voz) ══
  gfx(
    "m01a",
    "cine",
    "datos",
    [1032, 1135],
    "hero",
    "«Si deseas donar cemento o varillas» sobre el acero bajándose en obra.",
    [
      pon("media", { src: SRC.varillas, esVideo: true, sangre: true, grado: { exposicion: 0.852, saturacion: 0.85, calido: -0.04 }, en: 0, entra: QUIETA }),
      pon("velo", { en: 0, entra: QUIETA }),
      pon("titular", { rol: "hero", px: 60, color: "blanco", lineas: ["¿Puedes donar", "cemento o varillas?"] }),
    ],
    { ancla: CUELGA, sonido: "s-m01a" }
  ),
  gfx(
    "m01b",
    "papel",
    "datos",
    [1135, 1264],
    "hero",
    "«Para que las personas puedan reconstruir sus casas»: la tarjeta responde — bienvenidos.",
    [
      col(
        [
          pon("kicker", { texto: "PARA RECONSTRUIR" }),
          pon("titular", { id: "t-mat", rol: "hero", px: 68, lineas: ["Cemento y varillas,", "bienvenidos."] }),
          pon("etiqueta", { texto: "También se reciben en el punto de recolección.", en: tras("t-mat", 5) }),
        ],
        { gap: 20 }
      ),
    ],
    { sonido: "s-m01b" }
  ),
  gfx(
    "m01c",
    "papel",
    "datos",
    [1264, 1308],
    "hero",
    "«Sería de maravilla» — el beat cálido que la lectura del cliente regaló, solo en display.",
    [col([pon("titular", { rol: "hero", px: 84, texto: "Sería de maravilla." })], { gap: 20 })],
    { sonido: "s-m01c" }
  ),

  // ══ DATOS 2 — las sedes (la voz las nombra mientras se leen) ══════════════
  gfx(
    "a01a",
    "papel",
    "datos",
    [1308, 1409],
    "hero",
    "«En Caldas, Antioquia, nuestro punto de recolección será Street Cats» (v6): el aliado de esta variante abre la tarjeta de conversión.",
    [
      col(
        [
          pon("kicker", { texto: "PUNTOS DE RECOLECCIÓN" }),
          pon("titular", { rol: "hero", px: 84, texto: "Street Cats." }),
        ],
        { gap: 20 }
      ),
    ],
    { sonido: "s-a01a" }
  ),
  gfx(
    "a01b",
    "papel",
    "datos",
    [1409, 1520],
    "hero",
    "«…en la carrera 48 con la calle 132A sur»: la dirección aparece exactamente cuando la voz la dice (v6 Street Cats, Caldas — la dirección completa va también en la descripción).",
    [
      col(
        [
          // v6 STREET CATS: un solo punto de recolección, en Caldas (Antioquia).
          pon("titular", { id: "t-s1", px: 52, color: "acento", texto: "🐱 Caldas, Antioquia:", en: 0 }),
          pon("etiqueta", { texto: "Cra 48 # 132A sur - 24", en: 4 }),
        ],
        { gap: 16 }
      ),
    ],
    { sonido: "s-a01b" }
  ),

  // ══ CLÍMAX ════════════════════════════════════════════════════════════════
  gfx(
    "f01a",
    "cine",
    "climax",
    [1520, 1614],
    "hero",
    "«La familia de Juan Pablo Rico ya puso el camión»: las cajas entran y el nombre queda escrito.",
    [
      pon("media", { src: SRC.cajas, esVideo: true, sangre: true, grado: { saturacion: 0.87, calido: -0.011 }, en: 0, entra: QUIETA, sale: DIP }),
      pon("velo", { en: 0, entra: QUIETA, sale: DIP }),
      pon("titular", { rol: "hero", px: 48, color: "blanco", lineas: ["La familia de Juan Pablo Rico", "ya puso el camión."], sale: DIP }),
    ],
    { ancla: CUELGA, sonido: "s-f01a" }
  ),
  gfx(
    "f01b",
    "cine",
    "climax",
    [1614, 1673],
    "hero",
    "«Solo falta llenarlo», seco sobre negro.",
    [col([pon("titular", { rol: "hero", px: 80, color: "blanco", texto: "Solo falta llenarlo." })], { gap: 24 })],
    { sonido: "s-f01b" }
  ),
  gfx(
    "f04",
    "cine",
    "climax",
    [1673, 1779],
    "hero",
    "LA TESIS con el primer golpe grave: una persona, una bolsa — un granito a la vez.",
    [
      pon("media", { src: SRC.granito, esVideo: true, sangre: true, grado: { exposicion: 0.8, saturacion: 1.151, calido: 0.067 }, en: 0, entra: QUIETA }),
      pon("velo", { en: 0, entra: QUIETA }),
      pon("titular", { rol: "hero", px: 72, color: "blanco", texto: "Un granito a la vez." }),
    ],
    { ancla: CUELGA, sonido: "s-f04" }
  ),
  gfx(
    "f07",
    "papel",
    "climax",
    [1779, 1858],
    "hero",
    "El giro a segunda persona — a voz casi sola.",
    [col([pon("titular", { rol: "hero", px: 74, lineas: ["Hoy ese granito", "puede ser el tuyo."] })], { gap: 20 })]
  ),

  // ══ CIERRE — del claim al versículo, ceremonial ═══════════════════════════
  gfx(
    "sil9v",
    "cine",
    "cierre",
    [1858, 2035],
    "hero",
    "La frase final AHORA CON LA VOZ DEL CLIENTE (v4) y el segundo golpe grave; el texto se apaga en fundido antes del versículo. Entrada ceremonial a propósito: aquí no se rasga.",
    [
      col(
        [
          pon("titular", {
            rol: "hero",
            px: 68,
            color: "blanco",
            lineas: ["Que la tragedia", "deje de ser noticia", "no significa que", "haya terminado."],
            sale: { como: "fundido", dur: 12 },
          }),
        ],
        { gap: 24 }
      ),
    ],
    { sonido: "s-sil9" }
  ),
  gfx(
    "sil8",
    "papel",
    "cierre",
    [2035, 2095],
    "apoyo",
    "La foto del cliente DESPUÉS de la frase final (v5): los niños saludando — la esperanza como respuesta a «no significa que haya terminado», en el primer silencio real de la pieza.",
    [
      pon("media", { src: SRC.ninos, ancho: 640, alto: 760, grado: { exposicion: 1.02, calido: 0.02 }, en: 2, entra: QUIETA }),
      pon("titular", { rol: "hero", px: 60, en: 12, texto: "Ellos siguen ahí." }),
    ],
    { gap: 38, sonido: "s-sil8" }
  ),
  gfx(
    "sil10",
    "cine",
    "cierre",
    [2095, 2215],
    "hero",
    "El versículo (Hechos 20:35 NVI) cierra en silencio absoluto — sin SFX, sin atmósfera, sin disrupción.",
    [
      col(
        [
          pon("kicker", { texto: "HECHOS 20:35 · NVI", color: "blanco" }),
          pon("etiqueta", {
            id: "e-verso",
            texto: "Es preciso trabajar duro para ayudar a los necesitados, recordando las palabras del Señor Jesús:",
            color: "blanco",
          }),
          pon("titular", {
            rol: "hero",
            px: 60,
            color: "blanco",
            en: tras("e-verso", 6),
            lineas: ["«Hay más dicha en dar", "que en recibir»."],
          }),
        ],
        { gap: 22 }
      ),
    ]
  ),
]);
