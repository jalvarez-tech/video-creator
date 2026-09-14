/**
 * EL INTÉRPRETE DE LA CAMA DIEGÉTICA — `Sabor[]` → `<Audio>`.
 * Hermano de `<PistaSonido>`, y deliberadamente MÁS TONTO que él.
 *
 * `PistaSonido` sabe de sincronización: un `whoosh` coloca su pico en el
 * `targetFrame`, un `riser` termina en él, un `impact` empieza ahí. Eso existe
 * porque un efecto estructural tiene que caer clavado sobre un corte.
 *
 * Aquí no hay nada de eso y no es una carencia: un chisporroteo no tiene
 * «momento reconocible» que alinear. Empieza cuando entra el plano y se acaba
 * cuando se va. Toda la complejidad de esta capa son los FUNDIDOS, que es lo
 * único que de verdad se nota si falta — una cama que entra a pelo chasca, y el
 * chasquido se oye más que la cama.
 */
import React from "react";
import { Audio, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import type { Sabor } from "./sabor-009";

const Pieza: React.FC<{ s: Sabor }> = ({ s }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entra = s.entra ?? 0;
  const sale = s.sale ?? 0;

  // DOS rampas independientes multiplicadas, y no una interpolación de cuatro
  // puntos. El primer intento fue lo segundo y reventaba el render en cuanto un
  // sabor no declaraba fundidos: `interpolate` exige el rango de entrada
  // ESTRICTAMENTE creciente, y con `entra: 0` y `sale: 0` los cuatro puntos
  // salen [0, 0, dur, dur] — repetidos, no crecientes. Así cada rampa solo
  // existe si su fundido existe, y el caso «sin fundidos» es sencillamente 1×1.
  const gEntra =
    entra > 0 ? interpolate(f, [0, entra], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1;
  const gSale =
    sale > 0
      ? interpolate(f, [s.dur - sale, s.dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
      : 1;
  const rampa = gEntra * gSale;

  return (
    <Audio
      src={staticFile(s.src)}
      volume={Math.max(0, s.ganancia * rampa)}
      loop={s.bucle}
      // `trimBefore` cuenta en frames de la COMP; `desde` está en segundos del
      // archivo, igual que en `metraje-009.ts` y por el mismo motivo.
      trimBefore={s.desde ? Math.round(s.desde * fps) : undefined}
    />
  );
};

export const PistaSabor: React.FC<{ sabores: readonly Sabor[] }> = ({ sabores }) => (
  <>
    {sabores.map((s) => (
      <Sequence key={s.id} from={s.en} durationInFrames={s.dur} name={`sabor:${s.id}`}>
        <Pieza s={s} />
      </Sequence>
    ))}
  </>
);
