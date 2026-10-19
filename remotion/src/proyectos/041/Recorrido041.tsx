import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { LUXUR } from "../../marcas/luxur";
import { alfa } from "../../motor/formato";
import { PistaMetraje } from "../../motor/metraje";
import type { LookMetraje } from "../../motor/metraje";
import { PistaAudio } from "../../motor/sound/PistaAudio";
import { SubtitulosEditoriales } from "../../motor/SubtitulosEditoriales";
import { letraSubtitulosDe } from "../../motor/subtitulos-editoriales";
import { audio041 } from "./audio-041";
import {
  FUNDIDO_A_OSCURO,
  LOGO,
  LOGO_ALTO,
  LOGO_ANCHO,
  LOGO_ARRIBA,
  LOGO_ENTRA,
  LOGO_OPACIDAD,
  LOGO_RETRASO,
  WEB,
  WEB_ALTO_LINEA,
  WEB_ARRIBA,
  WEB_ENTRA,
  WEB_PX,
  WEB_RETRASO,
} from "./cierre-041";
import { metraje041 } from "./metraje-041";
import { ACENTO_MENOS_041, subtitulos041 } from "./subtitulos-041";

/**
 * Proyecto 041 — «Lote en El Carmen de Viboral (Mia)», Propiedades Luxur: V24 del registro de reels y QUINTO reel de esta propiedad (antes, el 030, el 031, el 034 y el 039).
 *
 * Reel de venta con Isabella Cadavid, con la estructura del canal que rompe el scroll (dron · hook · recorrido · mitad · recorrido · CTA) y el ángulo «todo lo que estás comprando»: el lote entero visto desde
 * arriba (sin texto ni voz), Isabella subiendo la loma («3.428 metros cuadrados por 800 millones. Vente, te muestro todo lo que estás comprando»), el paseo —la cabaña, la vista alta con la cancha redonda, las
 * terrazas con la luz dorada—, ella junto al talud de tierra roja («dos accesos para un mismo lote, una por la parcelación y otra por la vía veredal»), el portón de la vereda, la vía desde arriba y la vista del
 * atardecer, y su CTA con los cipreses y el valle («escríbeme lote»). Una toma suya por bloque (HK07, MD01, CT01) y «Epic Inspirational» de principio a fin. Encargo, decisiones y por qué cada plano:
 * proyectos/041/artefactos/. Cómo cambiar el hook, la mitad, el CTA, los planos o la música: proyectos/041/combinaciones.md.
 *
 * ES UN MONTAJE (director §3i): once planos que se cortan o se funden en los golpes de la canción (la canción es una pared de percusión: por golpes medidos). El vídeo va
 * MUDO en `<PistaMetraje>` y todo lo que suena —la voz de las tres tomas y la música, que baja cuando ella
 * habla— va en `<PistaAudio>`, cortado con los mismos números que la imagen.
 *
 * TEXTO EN MODO EDITORIAL, que es el del canal (`LUXUR.texto.modo`): solo lo que
 * dice Isabella, abajo y a 90 % de opacidad (pedido del encargo). Por eso no hay
 * `<PistaGraficos>`: la banda inferior y los subtítulos editoriales viven en el
 * mismo sitio (R14).
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal): el frame 0 es el lote limpio, visto desde arriba (DR233). Isabella entra A CORTE en un golpe de la música
 * y su primer subtítulo entra con su voz (7 f después). Esta pieza NO rompe la regla.
 *
 * NI SELLO, NUNCA (revisión 4, pedido del usuario): el sello «PROPIEDADES LUXUR»
 * (`SelloCampana`, la píldora de arriba) no se pone en esta pieza ni en ninguna de
 * este formato, y tampoco la cuenta de texto `@propiedadesluxur`.
 *
 * EL CIERRE (revisión 6, pedido del usuario): NADA SE CONGELA. Tras la última palabra de
 * Isabella su imagen funde a negro (`FundidoACierre`, que llega a negro EXACTO en el último
 * fotograma de la toma) y sigue una TARJETA OSCURA (el plano `c11-cierre`, un negro liso) con
 * el LOGO —más pequeño y al 60 % de opacidad, o sea 40 % de transparencia— y, debajo, la web
 * `PropiedadesLuxur.com`. Sus números están en `cierre-041.ts`, que lee también la puerta.
 *
 * Z-ORDER (director §3b), de atrás a delante:
 *   1. PistaMetraje           los planos mudos y sus disolvencias (sin velos propios), con la tarjeta al final
 *   2. FundidoACierre         el fundido a negro de la imagen de Isabella (entre su última palabra y la tarjeta)
 *   3. VeloSubtitulos         solo mientras hay subtítulos de Isabella
 *   4. SubtitulosEditoriales  overlay FIJO, dentro de un grupo a 90 % de opacidad y con la
 *                             cursiva 8 px más pequeña (`ACENTO_MENOS_041`)
 *   5. LogoCierre y WebCierre el logo y la web, sobre la tarjeta
 *   6. PistaAudio             voz de las tomas + música, en la RAÍZ
 */

/**
 * EL LOOK: NEUTRO con una viñeta suave. El de la marca (`lookDeMarca`) es el del
 * formato noticias —velo cálido naranja, grano, saturación baja— y sobre una
 * persona suma luz donde no debe (R13). Los planos se igualan con el `color` de cada
 * corte (R32: `colorCorrection()`, medido), no aquí; lo único que la viñeta hace es
 * que espacios distintos se lean como una pieza.
 */
const LOOK_041: LookMetraje = {
  saturacion: 1,
  contraste: 1,
  calido: 0,
  colorCalido: "#000000",
  grano: 0,
  vineta: 0.16,
  vinetaDesde: 60,
  negro: LUXUR.color.negro,
};

/** La opacidad de los subtítulos (pedido del encargo: 90 %). Una constante: un solo sitio que cambiar. */
export const OPACIDAD_SUBTITULOS = 0.9;

/**
 * La TOMA del CTA y la TARJETA del cierre, tal como las deja el plan. La imagen de Isabella
 * acaba en el último fotograma de la toma (`ULTIMA_DE_ISABELLA`); la tarjeta empieza justo después.
 */
const CTA = metraje041.find((c) => c.id === "c10-cta");
const CIERRE = metraje041.find((c) => c.id === "c11-cierre");
if (!CTA || !CIERRE) throw new Error("Recorrido041: faltan c10-cta o c11-cierre en metraje-041.ts");
const ULTIMA_DE_ISABELLA = CTA.en + CTA.dur - 1;

/**
 * EL VELO. Luxur pinta el texto en blanco SIN sombra ni borde, así que lo
 * único que lo sostiene sobre un ventanal, un cielo o una pared clara es un
 * degradado. El de `<PistaMetraje velos>` es de la pista entera y oscurecería
 * doce planos cuyo texto solo aparece en un tercio de la pieza; este solo vive
 * lo que vive el texto y funde con él. Alfas de PARTIDA: se miden contra el
 * plano en el frame exacto (R25) y se bajan todo lo que el contraste aguante.
 * (El logo ya no lleva velo: va sobre la tarjeta oscura.)
 */
const VELO_SUBTITULOS = { alto: 780, borde: 0.62, medio: 0.34, parada: 0.5 } as const;
/** Frames que tarda un velo en subir antes del primer subtítulo y en bajar después del último. */
const RAMPA_VELO = 8;
/** Entre dos bloques con menos de este hueco el velo NO se apaga: un velo que bombea se ve más que el texto. */
const HUECO_QUE_NO_APAGA = 30;

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Un velo como degradado desde su borde (`180deg` baja desde arriba, `0deg` sube desde abajo). */
const degradado = (
  v: { alto: number; borde: number; medio: number; parada: number },
  sentido: "180deg" | "0deg",
  altoCuadro: number
): string =>
  `linear-gradient(${sentido}, ${alfa(LOOK_041.negro ?? "#000000", v.borde)} 0%, ${alfa(LOOK_041.negro ?? "#000000", v.medio)} ${
    ((v.alto * v.parada) / altoCuadro) * 100
  }%, transparent ${((v.alto / altoCuadro) * 100).toFixed(1)}%)`;

/** Los bloques de texto (todos los que dice Isabella, abajo), como intervalos [primera línea, salida], con los huecos cortos unidos. */
const INTERVALOS_ABAJO: readonly (readonly [number, number])[] = (() => {
  const sueltos = subtitulos041
    .filter((b) => (b.posicion ?? "abajo") === "abajo")
    .map((b) => [b.trozos[0].desde, b.hasta] as [number, number])
    .sort((a, b) => a[0] - b[0]);
  const unidos: [number, number][] = [];
  for (const [a, b] of sueltos) {
    const ultimo = unidos[unidos.length - 1];
    if (ultimo && a - ultimo[1] < HUECO_QUE_NO_APAGA) ultimo[1] = Math.max(ultimo[1], b);
    else unidos.push([a, b]);
  }
  return unidos;
})();

const VeloSubtitulos: React.FC = () => {
  const frame = useCurrentFrame();
  const { height } = useVideoConfig();
  let opacidad = 0;
  for (const [a, b] of INTERVALOS_ABAJO) {
    opacidad = Math.max(opacidad, interpolate(frame, [a - RAMPA_VELO, a, b, b + RAMPA_VELO], [0, 1, 1, 0], CLAMP));
  }
  if (opacidad <= 0) return null;
  return <AbsoluteFill style={{ background: degradado(VELO_SUBTITULOS, "0deg", height), opacity: opacidad, pointerEvents: "none" }} />;
};

/**
 * NADA SE CONGELA: la imagen de Isabella funde a negro y el fundido llega a negro EXACTO en el último
 * fotograma de su toma (no antes ni un fotograma de menos: el motor no llega al negro completo en el
 * último frame de un plano, y el salto a la tarjeta se vería). Va sobre el metraje y bajo los
 * subtítulos, que se apagan por su cuenta.
 */
const FundidoACierre: React.FC = () => {
  const frame = useCurrentFrame();
  const opacidad = interpolate(frame, [ULTIMA_DE_ISABELLA - FUNDIDO_A_OSCURO, ULTIMA_DE_ISABELLA], [0, 1], CLAMP);
  if (opacidad <= 0) return null;
  return <AbsoluteFill style={{ backgroundColor: LOOK_041.negro, opacity: opacidad, pointerEvents: "none" }} />;
};

/**
 * El logo, sobre la tarjeta oscura, más pequeño y a 60 % de opacidad (40 % de transparencia: el `opacity` del
 * PNG, que ya tiene su propio alfa). Entra con un fundido corto cuando empieza la tarjeta.
 */
const LogoCierre: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const desde = CIERRE.en + LOGO_RETRASO;
  const opacidad = interpolate(frame, [desde, desde + LOGO_ENTRA], [0, 1], CLAMP) * LOGO_OPACIDAD;
  if (opacidad <= 0) return null;
  return (
    <Img
      src={staticFile(LOGO)}
      style={{
        position: "absolute",
        top: LOGO_ARRIBA,
        left: Math.round((width - LOGO_ANCHO) / 2),
        width: LOGO_ANCHO,
        height: LOGO_ALTO,
        opacity: opacidad,
        pointerEvents: "none",
      }}
    />
  );
};

/**
 * La web, debajo del logo, en la base de los subtítulos del canal (Montserrat 500, blanco, sin sombra: sobre
 * negro no hace falta) y a su opacidad plena: es lo que hay que leer. Entra un poco después que el logo.
 */
const WebCierre: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const desde = CIERRE.en + WEB_RETRASO;
  const opacidad = interpolate(frame, [desde, desde + WEB_ENTRA], [0, 1], CLAMP);
  if (opacidad <= 0) return null;
  const letra = letraSubtitulosDe(LUXUR).base;
  return (
    <div
      style={{
        position: "absolute",
        top: WEB_ARRIBA,
        left: 0,
        width,
        height: WEB_ALTO_LINEA,
        lineHeight: `${WEB_ALTO_LINEA}px`,
        display: "flex",
        justifyContent: "center",
        fontFamily: letra.familia,
        fontWeight: letra.peso,
        fontStyle: "normal",
        fontSynthesis: "none",
        fontSize: WEB_PX,
        letterSpacing: 0,
        whiteSpace: "nowrap",
        color: LUXUR.color.blanco,
        opacity: opacidad,
        pointerEvents: "none",
      }}
    >
      {WEB}
    </div>
  );
};

export const Recorrido041: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: LOOK_041.negro }}>
    <PistaMetraje cortes={metraje041} look={LOOK_041} />
    <FundidoACierre />
    <VeloSubtitulos />
    {/* El 90 %: el grupo entero, que multiplica el fundido de cada línea (5 f) y el del bloque (4 f). */}
    <AbsoluteFill style={{ opacity: OPACIDAD_SUBTITULOS, pointerEvents: "none" }}>
      <SubtitulosEditoriales bloques={subtitulos041} marca={LUXUR} acentoMenos={ACENTO_MENOS_041} />
    </AbsoluteFill>
    <LogoCierre />
    <WebCierre />
    <PistaAudio tramos={audio041} />
  </AbsoluteFill>
);
