import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { LUXUR } from "../../marcas/luxur";
import { alfa } from "../../motor/formato";
import { PistaMetraje } from "../../motor/metraje";
import type { LookMetraje } from "../../motor/metraje";
import { PistaAudio } from "../../motor/sound/PistaAudio";
import { SUB } from "../../motor/subtitulos-editoriales";
import { SubtitulosEditoriales } from "../../motor/SubtitulosEditoriales";
import { audio016 } from "./audio-016";
import { metraje016 } from "./metraje-016";
import { subtitulos016 } from "./subtitulos-016";

/**
 * Proyecto 016 — «República Dominicana 2027».
 *
 * Un ejemplo de montaje sobre música con las piezas nuevas del motor: diez
 * planos a corte seco en el golpe (`<PistaMetraje>`), el titular del encargo en
 * subtítulos editoriales (`<SubtitulosEditoriales>`) y la canción como un tramo
 * de `<PistaAudio>`. Encargo y decisiones: proyectos/016/artefactos/01-plan.md.
 *
 * LAS LETRAS SON LAS DEL CANAL (Montserrat y Playfair Display itálica, sin
 * sombra: `LUXUR.texto`),
 * pero la pieza NO lleva el sello: es un ejemplo de viaje, no una pieza de la
 * inmobiliaria. Es una decisión, no un olvido; se pone con un `<SelloCampana>`.
 *
 * Z-ORDER (director §3b), de atrás a delante:
 *   1. PistaMetraje           los diez planos, mudos, con un look neutro
 *   2. VeloTitular            una banda oscura tras el titular, solo mientras vive
 *   3. SubtitulosEditoriales  el titular
 *   4. PistaAudio             la canción
 */

/**
 * EL LOOK: NEUTRO. Son clips de banco de autores distintos, pero ya casan (luma
 * media de 107 a 146, medida con `signalstats`); el de la marca (`lookDeMarca`)
 * es el del formato noticias, con velo cálido y saturación baja, y apagaría el
 * turquesa, que es lo que se vende. Solo una viñeta suave.
 */
const LOOK_016: LookMetraje = {
  saturacion: 1,
  contraste: 1,
  calido: 0,
  colorCalido: "#000000",
  grano: 0,
  vineta: 0.14,
  vinetaDesde: 60,
  negro: LUXUR.color.negro,
};

/**
 * El velo del titular: una banda horizontal centrada en el texto. El titular va
 * al centro, sobre el cielo que queda justo encima de las nubes una vez bajado
 * el plano (`pan` de c01): luma 137-165, y la marca lo pinta sin sombra, así
 * que blanco sobre ese azul claro se queda en ~3:1. Al 32 % en el centro la
 * franja baja a luma ~95-115 (más de 4,5:1) y se desvanece a 300 px arriba y
 * abajo: sobre un cielo liso se lee como el degradado del propio cielo, no
 * como una caja.
 *
 * No va en `<PistaMetraje velos>` porque esos velos son de la pista entera y
 * oscurecerían los diez planos: este solo existe mientras el titular está en
 * pantalla y sale con él, en los mismos frames.
 */
const VeloTitular: React.FC = () => {
  const frame = useCurrentFrame();
  const { height } = useVideoConfig();
  const hasta = subtitulos016[0].hasta;
  const medio = height / 2;
  if (frame >= hasta) return null;
  const opacidad = interpolate(frame, [hasta - SUB.salida, hasta], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${alfa(LUXUR.color.negro, 0)} ${medio - 300}px, ${alfa(LUXUR.color.negro, 0.32)} ${medio - 70}px, ${alfa(LUXUR.color.negro, 0.32)} ${medio + 70}px, ${alfa(LUXUR.color.negro, 0)} ${medio + 300}px)`,
        opacity: opacidad,
        pointerEvents: "none",
      }}
    />
  );
};

export const RD016: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: LOOK_016.negro }}>
    <PistaMetraje cortes={metraje016} look={LOOK_016} />
    <VeloTitular />
    <SubtitulosEditoriales bloques={subtitulos016} marca={LUXUR} />
    <PistaAudio tramos={audio016} />
  </AbsoluteFill>
);
