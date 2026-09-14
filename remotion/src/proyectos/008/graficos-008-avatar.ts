// Solo el dialecto: un plan es una lista de decisiones, sin JSX (ver graficos-demo).
import { capa, dialectoDe, PIEZAS } from "../../motor/graficos/coreografia";
import { CHOCO } from "../../marcas/choco";

/**
 * PLAN DE GRÁFICOS — proyecto 008 · pieza AVATAR («ya hay 3 puntos»).
 * Artefactos: proyectos/008/artefactos/01-plan-avatar.md · 03-timeline-avatar.md.
 *
 * Clip real de 30 fps · 1314 f. Las ventanas salen de la transcripción por
 * PALABRA (transcripcion-palabras.json), no del guion: cada tarjeta entra
 * cuando la voz llega a su idea (f = s×30, medido).
 *
 * TODO el texto vive en la banda inferior (moldes `sello`/`cta`): el techo del
 * clip es blanco y la franja alta no tiene scrim — arriba solo está el
 * watermark de la campaña, que trae su propia píldora (02-layout-avatar.md).
 *
 * Un color = una cosa (R15): el ámbar de CHOCO marca lo operativo de la
 * campaña (ciudades, el 8, la fecha, el CTA). No entra ningún otro color:
 * `dato`/`logro`/`perdida` quedan sin usar a propósito.
 */
const { pon, col, gfx, plan, tras } = capa(dialectoDe({ piezas: PIEZAS, marca: CHOCO }), "gfx-008a");

export const graficos008a = plan(
  { ancho: 1080, alto: 1920, fps: 30, duracion: 1314 },
  [
    gfx(
      "g01-anuncio",
      "sello",
      "gancho",
      [63, 165],
      "hero",
      "El anuncio del vídeo fijado en pantalla mientras lo enuncia: quien mira sin sonido entiende a qué viene",
      [
        col([
          pon("kicker", { rol: "contexto", texto: "buenas noticias" }),
          // `en: 50` = f113, el frame exacto de «tres puntos».
          pon("titular", {
            rol: "hero",
            px: 76,
            lineas: [[{ t: "3", tinta: "marca" }, " puntos"], ["de recolección"]],
            en: 50,
          }),
        ]),
      ]
    ),

    gfx(
      "g02-medellin",
      "sello",
      "mecanismo",
      [171, 302],
      "hero",
      "Las direcciones son el dato operativo y van en pantalla, no en la voz: cada sede aterriza cuando él la nombra",
      [
        col([
          pon("chip", { rol: "apoyo", px: 34, color: "marca", texto: "MEDELLÍN" }),
          pon("etiqueta", { rol: "contexto", texto: "Las 3 sedes de Juan Papitas" }),
          // Orden de la VOZ (Calasanz → Santa Lucía → 20 de Julio), no del brief.
          // en 46 + paso 26 → ítems en f217/243/269 = las tres menciones medidas.
          pon("lista", {
            rol: "hero",
            px: 42,
            marca: "punto",
            en: 46,
            paso: 26,
            items: [
              { texto: [{ t: "Calasanz", enfasis: true }, " · Calle 50A # 86-52"] },
              { texto: [{ t: "Santa Lucía", enfasis: true }, " · Calle 47B # 89-24"] },
              { texto: [{ t: "20 de Julio", enfasis: true }, " · Calle 38A # 109-11"] },
            ],
          }),
        ]),
      ]
    ),

    gfx(
      "g03-caldas",
      "sello",
      "mecanismo",
      [308, 470],
      "hero",
      "Segundo punto: la ciudad entra con él y la dirección espera a que diga el nombre del negocio (f422)",
      [
        col([
          pon("chip", { rol: "apoyo", px: 34, color: "marca", texto: "CALDAS · ANTIOQUIA" }),
          pon("etiqueta", { rol: "contexto", texto: "El negocio de mi hermana", en: 56 }),
          pon("lista", {
            rol: "hero",
            px: 42,
            marca: "punto",
            en: 114,
            items: [{ texto: [{ t: "Street Cats", enfasis: true }, " · Cra 48 # 132A sur-24"] }],
          }),
        ]),
      ]
    ),

    gfx(
      "g04-carmen",
      "sello",
      "mecanismo",
      [477, 633],
      "hero",
      "Tercer punto: su casa. El cierre de la toma recoge «el Oriente antioqueño», que amplía el alcance sin otra tarjeta",
      [
        col([
          pon("chip", { rol: "apoyo", px: 34, color: "marca", texto: "EL CARMEN DE VIBORAL" }),
          // f525 = «mi casa».
          pon("lista", {
            rol: "hero",
            px: 42,
            marca: "punto",
            en: 48,
            items: [{ texto: [{ t: "Mi casa", enfasis: true }, " · Calle 23A # 22-03"] }],
          }),
          // f597 = «Oriente antioqueño»: entra debajo, como eco de lo que dice.
          pon("etiqueta", { rol: "contexto", texto: "recogiendo por todo el Oriente antioqueño", en: 120 }),
        ]),
      ]
    ),

    // ── 638–800: la súplica. SIN gráficos a propósito: el avatar hace el punto
    //    y la cámara (punch-in) es la única capa que lo acompaña. ──

    gfx(
      "g05-camion",
      "sello",
      "prueba",
      [806, 955],
      "hero",
      "La magnitud es el argumento: ver formarse el 8 mientras lo dice pesa más que oírlo; la fecha entra con «fin de mes»",
      [
        col([
          // en 12 + dur 20 → aterriza en f838, dentro de «toneladas» (831–844).
          pon("contador", {
            id: "t8",
            rol: "hero",
            color: "marca",
            de: 0,
            a: 8,
            dur: 20,
            px: 150,
            golpe: true,
            en: 12,
          }),
          pon("etiqueta", { rol: "apoyo", texto: "toneladas de ayuda para el Chocó", en: tras("t8", 2) }),
          // f880 = «a fin de mes» — la fecha que faltaba, dicha por él mismo.
          pon("chip", { rol: "apoyo", px: 34, color: "marca", texto: "EL CAMIÓN SALE A FIN DE MES", en: 74 }),
        ]),
      ]
    ),

    gfx(
      "g06-comparte",
      "cta",
      "cta",
      [1018, 1170],
      "hero",
      "La única acción que pide a todo el mundo: compartir. Caja de sello ámbar porque es el paso operativo de la campaña",
      [
        col(
          [
            pon("kicker", { rol: "contexto", color: "marca", texto: "si quieres ayudar" }),
            // f1054 = «compartir».
            pon("etiqueta", { rol: "hero", px: 54, texto: "COMPARTE ESTE VIDEO", en: 36 }),
          ],
          { piel: { caja: "sello", tinta: "marca" } }
        ),
      ]
    ),

    gfx(
      "g07-granito",
      "sello",
      "remate",
      [1200, 1314],
      "hero",
      "El lema de la campaña cierra la pieza con sus propias palabras, hasta el último frame",
      [
        col([
          // f1214 ≈ «granito a granito» (1216).
          pon("titular", { id: "gran", rol: "hero", px: 86, texto: [{ t: "Granito a granito", tinta: "marca" }], en: 14 }),
          pon("etiqueta", { rol: "apoyo", texto: "vamos llenando el bulto", en: tras("gran", 8) }),
        ]),
      ]
    ),
  ],
  // El acento del canal en registro oscuro (#D97706): las tarjetas van sobre
  // vídeo + scrim carbón, donde el ámbar de papel (#B45309) se apagaría.
  { marca: CHOCO.color.acentoOscuro }
);
