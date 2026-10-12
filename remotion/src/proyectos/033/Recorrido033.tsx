import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { LUXUR } from "../../marcas/luxur";
import { alfa } from "../../motor/formato";
import { PistaMetraje } from "../../motor/metraje";
import type { LookMetraje } from "../../motor/metraje";
import { PistaAudio } from "../../motor/sound/PistaAudio";
import { SubtitulosEditoriales } from "../../motor/SubtitulosEditoriales";
import { letraSubtitulosDe } from "../../motor/subtitulos-editoriales";
import { audio033 } from "./audio-033";
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
} from "./cierre-033";
import { metraje033 } from "./metraje-033";
import { subtitulos033 } from "./subtitulos-033";

/**
 * Proyecto 033 — Casa Campestre en Guarne (Duglas Yovana), V17 del canal de Propiedades Luxur (tercer reel de la casa; antes, el 029 y el 032).
 *
 * La idea en una línea (`proyectos/033/artefactos/01-plan.md`): esta casa es para quien vive fuera y quiere volver a Colombia teniendo a dónde
 * llegar: Colombia llama (hook), lo que se extraña cada diciembre (mitad) y volver como una dirección, no una idea (CTA). Estructura del canal: DRON · HOOK ·
 * RECORRIDO · MITAD · RECORRIDO · CTA, con tres frases de Isabella; el material es 16:9 encuadrado a 9:16 en `normalizar.mjs`.
 *
 * ES UN MONTAJE (director §3i). El vídeo va MUDO en `<PistaMetraje>` y todo lo que suena —la voz de Isabella en sus tomas y la música— va en
 * `<PistaAudio>`, cortado con los mismos números que la imagen.
 *
 * TEXTO EN MODO EDITORIAL, que es el del canal (`LUXUR.texto.modo`): todo lo
 * dicho va en `<SubtitulosEditoriales>`. Por eso no hay `<PistaGraficos>`: la
 * banda inferior y los subtítulos editoriales viven en el mismo sitio (R14).
 *
 * REGLAS FIJAS DEL CANAL (las pidió el usuario con «siempre» y «nunca»; skill
 * `recorrido-luxur`, `SKILL.md` §0). La puerta de este proyecto las comprueba:
 *   · LA PRIMERA TOMA SALE SIEMPRE SIN TEXTO: ni hook escrito ni subtítulos, y por
 *     tanto sin voz. Isabella entra con su imagen (opaca) en un pulso de la música.
 *   · NUNCA EL SELLO «PROPIEDADES LUXUR» (`SelloCampana`, la píldora de arriba).
 *   · EL CIERRE ES UNA TARJETA OSCURA con el LOGO (`Propiedade-Luxur-Logo.png`) y la WEB, no la
 *     cuenta de texto `@propiedadesluxur`, y NADA SE CONGELA: tras la última palabra de Isabella su
 *     imagen funde a negro (`FundidoACierre`, hasta negro exacto en el último fotograma de la toma)
 *     y sigue el último plano del plan, un negro liso. Los números, en `cierre-033.ts`.
 *
 * Z-ORDER (director §3b), de atrás a delante:
 *   1. PistaMetraje           los planos mudos y sus disolvencias (sin velos propios), con la tarjeta al final
 *   2. FundidoACierre         el fundido a negro de la imagen de Isabella, entre su última palabra y la tarjeta
 *   3. VeloSubtitulos         solo mientras hay subtítulos de Isabella
 *   4. SubtitulosEditoriales  overlay FIJO
 *   5. LogoCierre y WebCierre el logo (pequeño, a 60 % de opacidad) y la web, sobre la tarjeta
 *   6. PistaAudio             voz de las tomas + voz en off + música, en la RAÍZ
 *
 * Si el encargo pide una opacidad para los subtítulos (el 017: 90 %), se envuelven
 * en un `<AbsoluteFill style={{ opacity }}>`: no hace falta tocar el motor
 * (ver `Recorrido017.tsx`).
 */

/**
 * EL LOOK: NEUTRO. El de la marca (`lookDeMarca`) es el del formato noticias
 * —velo cálido naranja, grano, saturación baja— y sobre una persona suma luz
 * donde no debe (R13). Aquí solo una viñeta suave, que resta en las esquinas y
 * ayuda a que espacios distintos se lean como una pieza. Si los planos vienen
 * de cámaras o lentes distintas, se igualan con el `color` de cada corte (R32: `colorCorrection()`; el render
 * lleva `--gl=angle`), no aquí.
 */
const LOOK_033: LookMetraje = {
  saturacion: 1,
  contraste: 1,
  calido: 0,
  colorCalido: "#000000",
  grano: 0,
  vineta: 0.2,
  vinetaDesde: 58,
  negro: LUXUR.color.negro,
};

/**
 * La TOMA del CTA (la última con voz) y la TARJETA del cierre (el último plano del plan). La imagen de
 * Isabella acaba en el último fotograma de la toma (`ULTIMA_DE_ISABELLA`); la tarjeta empieza justo después.
 */
const CTA = [...metraje033].reverse().find((c) => c.voz !== undefined);
const CIERRE = metraje033[metraje033.length - 1];
if (!CTA || CTA.voz === undefined) throw new Error("Recorrido033: ninguna toma lleva `voz`; el CTA es la última");
if (CIERRE.tipo !== "foto") throw new Error("Recorrido033: el último plano de metraje-033.ts es la tarjeta del cierre (`foto`)");
const ULTIMA_DE_ISABELLA = CTA.en + CTA.dur - 1;

/**
 * EL VELO. Luxur pinta el texto en blanco SIN sombra ni borde, así que lo único que lo
 * sostiene sobre un ventanal, un cielo o una pared clara es un degradado. El de
 * `<PistaMetraje velos>` es de la pista entera y oscurecería todos los planos para un
 * texto que solo vive en una parte; este vive lo que vive el texto y funde con él. Alfas
 * de PARTIDA: se miden contra el plano en el frame exacto (R25) y se bajan todo lo que el
 * contraste aguante. (El logo no lleva velo: va sobre la tarjeta oscura.)
 */
// V17: el centro sube de 0,36 (la V16) a 0,42: el texto cae sobre el pantalón blanco de Isabella en las tres tomas y al p99 del fondo
// quedaba a 2,3-2,5 : 1; así, 2,6-3,3 (`herramientas/legibilidad.py`, igual o mejor que la V1 aprobada).
const VELO_SUBTITULOS = { alto: 780, borde: 0.66, medio: 0.42, parada: 0.5 } as const;
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
  `linear-gradient(${sentido}, ${alfa(LOOK_033.negro ?? "#000000", v.borde)} 0%, ${alfa(LOOK_033.negro ?? "#000000", v.medio)} ${
    ((v.alto * v.parada) / altoCuadro) * 100
  }%, transparent ${((v.alto / altoCuadro) * 100).toFixed(1)}%)`;

/** Los bloques de texto de abajo (todos los que dice Isabella), como intervalos [primera línea, salida], con los huecos cortos unidos. */
const INTERVALOS_ABAJO: readonly (readonly [number, number])[] = (() => {
  const sueltos = subtitulos033
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
 * fotograma de su toma (el motor no llega al negro completo en el último frame de un plano: su `salidaNegro`
 * se queda en (N−1)/N y el salto a la tarjeta se vería). Va sobre el metraje y bajo los subtítulos.
 */
const FundidoACierre: React.FC = () => {
  const frame = useCurrentFrame();
  const opacidad = interpolate(frame, [ULTIMA_DE_ISABELLA - FUNDIDO_A_OSCURO, ULTIMA_DE_ISABELLA], [0, 1], CLAMP);
  if (opacidad <= 0) return null;
  return <AbsoluteFill style={{ backgroundColor: LOOK_033.negro, opacity: opacidad, pointerEvents: "none" }} />;
};

/**
 * El logo, sobre la tarjeta oscura, pequeño y a 60 % de opacidad (40 % de transparencia: el `opacity` del PNG,
 * que ya tiene su propio alfa). Entra con un fundido corto cuando empieza la tarjeta.
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
 * La web, debajo del logo, en la base de los subtítulos del canal (blanco, sin sombra: sobre negro no hace falta)
 * y a su opacidad plena: es lo que hay que leer. Entra un poco después que el logo.
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

export const Recorrido033: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: LOOK_033.negro }}>
    <PistaMetraje cortes={metraje033} look={LOOK_033} />
    <FundidoACierre />
    <VeloSubtitulos />
    <SubtitulosEditoriales bloques={subtitulos033} marca={LUXUR} />
    <LogoCierre />
    <WebCierre />
    <PistaAudio tramos={audio033} />
  </AbsoluteFill>
);
