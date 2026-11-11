import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { LUXUR } from "../../marcas/luxur";
import { alfa } from "../../motor/formato";
import { PistaMetraje } from "../../motor/metraje";
import type { LookMetraje } from "../../motor/metraje";
import { PistaAudio } from "../../motor/sound/PistaAudio";
import { SubtitulosEditoriales } from "../../motor/SubtitulosEditoriales";
import { letraSubtitulosDe } from "../../motor/subtitulos-editoriales";
import { audio086 } from "./audio-086";
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
} from "./cierre-086";
import { DISENO_FICHA as D, FICHA_086, FICHA_ENTRA, FICHA_SALE } from "./ficha-086";
import { metraje086 } from "./metraje-086";
import { ACENTO_MENOS_086, subtitulos086 } from "./subtitulos-086";

/**
 * Proyecto 086 — «Suite Go Living (El Poblado)», Propiedades Luxur. Es la composición del recorrido con presentadora con la estructura «lo vendible antes del segundo 10» (`recorrido-luxur` §3): la toma
 * inicial sin texto ni voz · el hook de Isabella · DOS planos rápidos · la mitad de Isabella · UN recorrido inmersivo con la vista al final · el CTA y la tarjeta oscura del cierre. Los ocho reels 086-087 (V67-V68)
 * son las variantes B de los 071-078: cada una conserva la terna de voz, el exterior y la canción (con la misma entrada) de su original y cambia el ORDEN. Esta composición y la 079 (la primera) son la misma:
 * cambian los datos (`metraje-086.ts`, `audio-086.ts`, `subtitulos-086.ts`, `ficha-086.ts`). Encargo y plan: proyectos/086/artefactos/ · cómo cambiar cada parte: proyectos/086/combinaciones.md.
 *
 * DOS VERSIONES, NUNCA MEZCLADAS (corrección del usuario, 2026-11-10): `Recorrido086` lleva los subtítulos editoriales (todo lo que dice Isabella, abajo y a 90 % de opacidad, en UNA sola fuente) y NO lleva ficha;
 * `Recorrido086Ficha` (prop `ficha`) lleva la ficha (tipo, locación y precio) abajo, dentro del recorte 1:1, desde que la imagen de Isabella es opaca en el hook hasta el CTA, y NO lleva subtítulos.
 *
 * ES UN MONTAJE (director §3i): cada cambio de plano en un golpe medido de la canción. El vídeo va MUDO en `<PistaMetraje>` y todo lo que suena —la voz de las tres tomas y la música, que baja cuando ella habla—
 * va en `<PistaAudio>`, cortado con los mismos números que la imagen.
 *
 * LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO NI VOZ (regla fija del canal): el frame 0 es el exterior. Isabella entra y su primer subtítulo (o la ficha) entra con ella, cuando su imagen ya es opaca.
 *
 * NI SELLO, NUNCA (revisión 4, pedido del usuario): el sello «PROPIEDADES LUXUR» (`SelloCampana`, la píldora de arriba) no se pone en esta pieza ni en ninguna de este formato, y tampoco la cuenta de texto
 * `@propiedadesluxur`.
 *
 * EL CIERRE (revisión 6, pedido del usuario): NADA SE CONGELA. Tras la última palabra de Isabella su imagen funde a negro (`FundidoACierre`, que llega a negro EXACTO en el último fotograma de la toma) y sigue una
 * TARJETA OSCURA (el último plano del plan, un negro liso) con el LOGO —más pequeño y al 60 % de opacidad, o sea 40 % de transparencia— y, debajo, la web `PropiedadesLuxur.com`. Sus números están en
 * `cierre-086.ts`, que lee también la puerta.
 *
 * Z-ORDER (director §3b), de atrás a delante:
 *   1. PistaMetraje           los planos mudos y sus disolvencias (sin velos propios), con la tarjeta al final
 *   2. FundidoACierre         el fundido a negro de la imagen de Isabella (entre su última palabra y la tarjeta)
 *   3. VeloSubtitulos         solo mientras hay subtítulos de Isabella
 *   4. SubtitulosEditoriales  overlay FIJO, dentro de un grupo a 90 % de opacidad
 *   5. FichaPropiedad         solo en la versión de ficha
 *   6. LogoCierre y WebCierre el logo y la web, sobre la tarjeta
 *   7. PistaAudio             voz de las tomas + música, en la RAÍZ
 */

/**
 * EL LOOK: NEUTRO con una viñeta suave. El de la marca (`lookDeMarca`) es el del
 * formato noticias —velo cálido naranja, grano, saturación baja— y sobre una
 * persona suma luz donde no debe (R13). Los planos se igualan con el `color` de cada
 * corte (R32: `colorCorrection()`, medido), no aquí; lo único que la viñeta hace es
 * que espacios distintos se lean como una pieza.
 */
const LOOK_086: LookMetraje = {
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
const CTA = metraje086.find((c) => c.id.endsWith("-cta"));
const CIERRE = metraje086.find((c) => c.id.endsWith("-cierre"));
if (!CTA || !CIERRE) throw new Error("Recorrido086: faltan el plano -cta o el -cierre en metraje-086.ts");
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
const VELO_SUBTITULOS = { alto: 780, borde: 0.72, medio: 0.52, parada: 0.5 } as const;
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
  `linear-gradient(${sentido}, ${alfa(LOOK_086.negro ?? "#000000", v.borde)} 0%, ${alfa(LOOK_086.negro ?? "#000000", v.medio)} ${
    ((v.alto * v.parada) / altoCuadro) * 100
  }%, transparent ${((v.alto / altoCuadro) * 100).toFixed(1)}%)`;

/** Los bloques de texto (todos los que dice Isabella, abajo), como intervalos [primera línea, salida], con los huecos cortos unidos. */
const INTERVALOS_ABAJO: readonly (readonly [number, number])[] = (() => {
  const sueltos = subtitulos086
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
  return <AbsoluteFill style={{ backgroundColor: LOOK_086.negro, opacity: opacidad, pointerEvents: "none" }} />;
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

/**
 * LA FICHA (solo en la versión de ficha, `Recorrido086Ficha`): tipo, locación y precio, abajo a la izquierda y dentro del recorte 1:1, desde que la imagen de Isabella es opaca en el hook hasta el CTA (`ficha-086.ts`). La primera toma sigue saliendo sin texto y la
 * tarjeta del cierre, sin ficha: se va antes de que la imagen funda a negro.
 */
const HOOK = metraje086.find((c) => c.id === "c02-hook");
if (!HOOK) throw new Error("Recorrido086: falta c02-hook en metraje-086.ts");
export const FICHA_DESDE = HOOK.en;
export const FICHA_HASTA = ULTIMA_DE_ISABELLA - FUNDIDO_A_OSCURO;

const FichaPropiedad: React.FC = () => {
  const frame = useCurrentFrame();
  const opacidad = interpolate(frame, [FICHA_DESDE, FICHA_DESDE + FICHA_ENTRA, FICHA_HASTA - FICHA_SALE, FICHA_HASTA], [0, 1, 1, 0], CLAMP);
  if (opacidad <= 0) return null;
  const familia = letraSubtitulosDe(LUXUR).base.familia;
  const linea: React.CSSProperties = { display: "block", textShadow: D.sombra, whiteSpace: "nowrap", fontSynthesis: "none" };
  return (
    <AbsoluteFill style={{ opacity: opacidad, pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: D.veloCaja.x, top: D.arriba + D.veloCaja.dy, width: D.veloCaja.ancho, height: D.veloCaja.alto, background: D.velo }} />
      <div
        style={{
          position: "absolute",
          left: D.izquierda,
          top: D.arriba,
          paddingLeft: D.sangria,
          borderLeft: `${D.filete}px solid ${D.dorado}`,
          color: LUXUR.color.blanco,
          fontFamily: familia,
        }}
      >
        <span style={{ ...linea, fontWeight: D.tipo.peso, fontSize: D.tipo.px, letterSpacing: `${D.tipo.espaciado}em` }}>{FICHA_086.tipo}</span>
        <span style={{ ...linea, fontWeight: D.lugar.peso, fontSize: D.lugar.px, letterSpacing: `${D.lugar.espaciado}em`, lineHeight: 1.15, marginTop: D.lugar.separacion }}>{FICHA_086.lugar}</span>
        <span style={{ ...linea, fontWeight: D.precio.peso, fontSize: D.precio.px, letterSpacing: `${D.precio.espaciado}em`, marginTop: D.precio.separacion }}>
          {FICHA_086.precio}
          <span style={{ fontSize: D.moneda.px, letterSpacing: `${D.moneda.espaciado}em`, marginLeft: "0.45em" }}>{FICHA_086.moneda}</span>
        </span>
      </div>
    </AbsoluteFill>
  );
};

/**
 * `ficha`: la versión CON FICHA. Enciende la ficha y APAGA los subtítulos y su velo; el resto, idéntico. Las dos cosas no salen nunca juntas (corrección del usuario, 2026-11-10): la versión normal lleva
 * subtítulos y no lleva ficha; la de ficha, al revés.
 */
export interface PropsRecorrido086 {
  ficha?: boolean;
}

export const Recorrido086: React.FC<PropsRecorrido086> = ({ ficha = false }) => (
  <AbsoluteFill style={{ backgroundColor: LOOK_086.negro }}>
    <PistaMetraje cortes={metraje086} look={LOOK_086} />
    <FundidoACierre />
    {ficha ? null : <VeloSubtitulos />}
    {/* El 90 %: el grupo entero, que multiplica el fundido de cada línea (5 f) y el del bloque (4 f). */}
    {ficha ? null : (
      <AbsoluteFill style={{ opacity: OPACIDAD_SUBTITULOS, pointerEvents: "none" }}>
        <SubtitulosEditoriales bloques={subtitulos086} marca={LUXUR} acentoMenos={ACENTO_MENOS_086} />
      </AbsoluteFill>
    )}
    {ficha ? <FichaPropiedad /> : null}
    <LogoCierre />
    <WebCierre />
    <PistaAudio tramos={audio086} />
  </AbsoluteFill>
);
