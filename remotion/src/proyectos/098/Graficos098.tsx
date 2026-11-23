/**
 * LA CAPA DE GRÁFICOS DEL 098 sobre el metraje (P01-P11): el kicker del frame 0, las tiras de lo que dicen ellas y la
 * estrella que baja al centro del círculo. Overlay FIJO (no se mueve con el plano). Los números salen de `textos-098.ts`.
 * Íntimo: no hay heroes de papel sobre el metraje; manda la que habla, y la tira es su única compañía.
 */
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { EASE } from "../../motor/motion";
import { C, DOSIS, EstrellaSvg, TextoAcento, TiraPapel, bordeRasgado, fondoPapel, rampa } from "./piezas-098";
import { ESTRELLA, KICKER, TIRAS } from "./textos-098";

const Tiras: React.FC = () => (
  <>
    {TIRAS.map((t) => (
      <TiraPapel key={t.id} en={t.en} sale={t.sale} semilla={t.id}>
        <TextoAcento texto={t.texto} marcas={t.marcas ?? []} />
      </TiraPapel>
    ))}
  </>
);

/** Kicker: etiqueta de papel arriba a la izquierda. En f0 ya está entera: es la miniatura. */
const Kicker: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < KICKER.en || frame >= KICKER.sale) return null;
  const op = rampa(frame, KICKER.sale - 8, KICKER.sale, 1, 0);
  return (
    <div style={{ position: "absolute", left: 96, top: 64, opacity: op }}>
      <div style={{ transform: "rotate(-1.5deg)" }}>
        <div style={{ ...fondoPapel(), clipPath: bordeRasgado("kicker-098", 14, 4), padding: "10px 24px 12px" }}>
          <span style={{ ...DOSIS, fontWeight: 700, fontSize: 40, color: C.tinta, letterSpacing: 0.5 }}>{KICKER.texto}</span>
        </div>
      </div>
    </div>
  );
};

/** El centro vacío del círculo de DR07 (el mismo punto que en el 097: el dron sube y gira sobre él). */
export const CENTRO_CIRCULO = { x: 960, y: 530 } as const;

/**
 * La estrella: aparece arriba, pequeña, en la cima de la música, y baja despacio al centro del círculo. Al aterrizar
 * suelta un anillo blanco. Se queda ahí, respirando, hasta que entra el papel (`Papel098` la recoge).
 */
const EstrellaDelCirculo: React.FC = () => {
  const frame = useCurrentFrame();
  // Desde que entra el papel, la que se ve es la de `Papel098`, que sale del mismo sitio y del mismo tamaño.
  if (frame < ESTRELLA.aparece || frame >= ESTRELLA.sale) return null;
  const aparece = rampa(frame, ESTRELLA.aparece, ESTRELLA.aparece + 10);
  const baja = rampa(frame, ESTRELLA.aparece, ESTRELLA.aterriza, 0, 1, EASE.inOutCubic);
  const y = interpolate(baja, [0, 1], [-40, CENTRO_CIRCULO.y]);
  const tam = interpolate(baja, [0, 1], [70, 150]) * (frame > ESTRELLA.aterriza ? 1 + Math.sin((frame - ESTRELLA.aterriza) / 9) * 0.02 : 1);
  const giro = interpolate(baja, [0, 1], [-40, 0]);
  return (
    <div style={{ position: "absolute", left: CENTRO_CIRCULO.x - tam / 2, top: y - tam / 2, width: tam, height: tam, opacity: aparece }}>
      <EstrellaSvg tam={tam} giro={giro} />
      {frame >= ESTRELLA.aterriza ? <Anillo en={ESTRELLA.aterriza} tam={tam} /> : null}
    </div>
  );
};

const Anillo: React.FC<{ en: number; tam: number }> = ({ en, tam }) => {
  const frame = useCurrentFrame();
  const p = rampa(frame, en, en + 20);
  if (p >= 1) return null;
  const r = tam * (0.6 + p);
  return (
    <div
      style={{
        position: "absolute",
        left: tam / 2 - r,
        top: tam / 2 - r,
        width: r * 2,
        height: r * 2,
        borderRadius: "50%",
        border: `6px solid ${C.blanco}`,
        opacity: 1 - p,
      }}
    />
  );
};

export const Graficos098: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <Kicker />
    <Tiras />
    <EstrellaDelCirculo />
  </AbsoluteFill>
);
