/**
 * PROYECTO 069 — «Unidos por Botswana».
 *
 * 1080×1920 · 30 fps · 2099 f (70,0 s) · estilo CINEMATOGRÁFICO sobrio · sin avatar. Vídeo de ayuda para reconstruir el salón de eventos donde John e Isabella se casaron.
 * Revisión 1 (2026-10-28): con música («We Are», de Aleksey Chistilin) y TODO cortado sobre sus golpes; los dos planos en que hablan, recortados de su primera a su última sílaba.
 * Artefactos: proyectos/069/artefactos/{01-plan,02-layout,03-timeline}.md
 *
 * ES UN MONTAJE (director §3i): 31 planos —fotos de la boda, el incendio, ellos dos hablando— y una tarjeta final, cada uno en el golpe de la canción que le toca (`metraje-069.ts`). El vídeo va MUDO en
 * `<PistaMetraje>` y todo lo que suena va en `<PistaAudio>` (`audio-069.ts`): la canción, la voz de ellos en los dos MOV y, cuando lleguen, las cinco locuciones de la voz en off (`voz-069.ts`).
 *
 * §marca — PIEZA PERSONAL, SIN CANAL: ni sello, ni marca de agua, ni `@cuenta`. Es una decisión, no un olvido (director §5b): pasa `look` en vez de `marca` y no hay `SelloCampana`. La tarjeta final
 * usa los colores de `cierre-069.ts` (blanco que dice, rojo que ama, ámbar que pide) y UNA sola fuente, Montserrat (rev. 7).
 *
 * §texto — LA PIEZA NO LLEVA SUBTÍTULOS TODAVÍA, y es a propósito: la mitad de lo que se oye (la voz en off) no está grabada. Cuando lo esté se transcribe con `--palabras` y se monta UNA sola pista de
 * texto editorial para todo (R30), con las voces de los MOV incluidas; poner ahora los de los MOV y luego los de la locución daría dos estilos de pantalla en la misma pieza. El único texto de ahora es el
 * final que pide el guion. En una pieza que se ve sin sonido, esto es lo primero que hay que añadir.
 *
 * Z-ORDER (director §3b), de atrás a delante:
 *   1. PistaMetraje      los planos, mudos, con sus disolvencias y la viñeta del look
 *   2. TarjetaFinal      los textos de la tarjeta (overlay FIJO, solo de `INICIO_TARJETA` en adelante)
 *   3. PistaAudio        la canción, la voz de los MOV y las locuciones, en la RAÍZ
 */
import React from "react";
import { AbsoluteFill, Easing, Sequence, interpolate, useCurrentFrame } from "remotion";
import { PistaMetraje, type LookMetraje } from "../../motor/metraje";
import { PistaAudio } from "../../motor/sound/PistaAudio";
import { audio069 } from "./audio-069";
import {
  APORTES,
  COLORES_069 as C,
  CORAZON,
  DUR_TARJETA,
  ENTRADA_BLOQUE,
  FIRMA,
  FRASE_AMOR,
  FRASE_FUEGO,
  PARRAFO,
  POSICION,
} from "./cierre-069";
import { INICIO_TARJETA, metraje069 } from "./metraje-069";

/**
 * EL LOOK: NEUTRO con una viñeta suave y un grano mínimo. El del formato noticias (velo cálido, saturación baja) tiñe de naranja un incendio que ya es naranja y apaga la piel de las fotos de boda
 * (R13: nada que SUME luz o tinte sobre una persona). Lo único que hace es que fotos de dos fotógrafos, vídeo de mensajería y dos MOV de iPhone se lean como una sola pieza. El negro es el de la tarjeta.
 */
const LOOK_069: LookMetraje = {
  saturacion: 1,
  contraste: 1.02,
  calido: 0,
  colorCalido: "#000000",
  grano: 0.025,
  vineta: 0.2,
  vinetaDesde: 58,
  negro: C.fondo,
};

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Un bloque de la tarjeta: entra a su frame (contado desde el inicio de la tarjeta) con un fundido y una subida corta. Nada sale. */
const Bloque: React.FC<{ entra: number; y?: number; abajo?: number; children: React.ReactNode }> = ({ entra, y, abajo, children }) => {
  const f = useCurrentFrame();
  const t = interpolate(f, [entra, entra + ENTRADA_BLOQUE.frames], [0, 1], { ...CLAMP, easing: Easing.out(Easing.cubic) });
  if (t <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        width: 1080,
        ...(y !== undefined ? { top: y } : { bottom: abajo }),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: t,
        transform: `translateY(${(1 - t) * ENTRADA_BLOQUE.sube}px)`,
        pointerEvents: "none",
      }}
    >
      {children}
    </div>
  );
};

const LINEA = { whiteSpace: "nowrap", textAlign: "center", fontSynthesis: "none" } as const;

/** El corazón del guion (❤️) dibujado, no escrito: un emoji depende de la fuente de cada máquina y el render saldría distinto en otra. Aparece con un latido. */
const Corazon: React.FC = () => {
  const f = useCurrentFrame();
  const escala = interpolate(f, [CORAZON.entra, CORAZON.entra + 14, CORAZON.entra + 30], [0.6, 1.14, 1], { ...CLAMP, easing: Easing.out(Easing.cubic) });
  const t = interpolate(f, [CORAZON.entra, CORAZON.entra + 10], [0, 1], CLAMP);
  if (t <= 0) return null;
  return (
    <div style={{ position: "absolute", left: 0, width: 1080, top: POSICION.corazon, display: "flex", justifyContent: "center", opacity: t, pointerEvents: "none" }}>
      <svg width={CORAZON.px} height={CORAZON.px} viewBox="0 0 24 24" style={{ transform: `scale(${escala})` }} aria-hidden>
        <path
          fill={C.rojo}
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
    </div>
  );
};

/** La INFORMACIÓN OFICIAL PARA REALIZAR APORTES: un marco ámbar anclado por ABAJO (a 280 px del borde, fuera de la interfaz de las apps), así crece hacia arriba si trae más líneas. */
const Aportes: React.FC = () => {
  const pendiente = APORTES.lineas.length === 0;
  return (
    <Bloque entra={APORTES.entra} abajo={POSICION.aportesAbajo}>
      <div
        style={{
          width: 840,
          boxSizing: "border-box",
          border: `3px solid ${C.ambar}`,
          borderRadius: 22,
          padding: pendiente ? "34px 40px" : "28px 40px 30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        {pendiente ? (
          <div style={{ ...LINEA, fontFamily: "Montserrat", fontWeight: 500, fontSize: 33, color: C.ambar, letterSpacing: 0.3 }}>[{APORTES.titulo}]</div>
        ) : (
          <>
            <div style={{ ...LINEA, fontFamily: "Montserrat", fontWeight: 700, fontSize: 28, color: C.ambar, letterSpacing: 2.2, textTransform: "uppercase", marginBottom: 6 }}>{APORTES.titulo}</div>
            {APORTES.lineas.map((l) => (
              <div key={l} style={{ ...LINEA, fontFamily: "Montserrat", fontWeight: 600, fontSize: 38, lineHeight: "50px", color: C.blanco }}>
                {l}
              </div>
            ))}
          </>
        )}
      </div>
    </Bloque>
  );
};

const TarjetaFinal: React.FC = () => (
  <>
    <Bloque entra={FRASE_FUEGO.entra} y={POSICION.fuego}>
      {FRASE_FUEGO.lineas.map((l) => (
        <div key={l} style={{ ...LINEA, fontFamily: "Montserrat", fontWeight: 700, fontSize: 58, lineHeight: "70px", letterSpacing: 4, color: C.blanco }}>
          {l}
        </div>
      ))}
    </Bloque>
    <Bloque entra={FRASE_AMOR.entra} y={POSICION.amor}>
      {FRASE_AMOR.lineas.map((l) => (
        <div key={l} style={{ ...LINEA, fontFamily: "Montserrat", fontWeight: 800, fontSize: 58, lineHeight: "70px", letterSpacing: 4, color: C.blanco }}>
          {l.split(FRASE_AMOR.acento).map((trozo, i, partes) => (
            <React.Fragment key={i}>
              {trozo}
              {i < partes.length - 1 ? <span style={{ color: C.rojo }}>{FRASE_AMOR.acento}</span> : null}
            </React.Fragment>
          ))}
        </div>
      ))}
    </Bloque>
    <Corazon />
    <Bloque entra={FIRMA.entra} y={POSICION.filete}>
      <div style={{ width: 140, height: 3, borderRadius: 2, backgroundColor: C.gris, opacity: 0.4 }} />
    </Bloque>
    <Bloque entra={FIRMA.entra} y={POSICION.firma}>
      {FIRMA.lineas.map((l) => (
        <div key={l} style={{ ...LINEA, fontFamily: "Montserrat", fontWeight: 700, fontSize: 58, lineHeight: "72px", color: C.blanco }}>
          {l}
        </div>
      ))}
    </Bloque>
    <Bloque entra={PARRAFO.entra} y={POSICION.parrafo}>
      <div style={{ ...LINEA, fontFamily: "Montserrat", fontWeight: 800, fontSize: 66, lineHeight: "84px", letterSpacing: 2, color: C.ambar }}>{PARRAFO.orden}</div>
      <div style={{ ...LINEA, fontFamily: "Montserrat", fontWeight: 500, fontSize: 38, lineHeight: "54px", color: C.gris }}>{PARRAFO.porque}</div>
    </Bloque>
    <Aportes />
  </>
);

export const Botswana069: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: LOOK_069.negro }}>
    <PistaMetraje cortes={metraje069} look={LOOK_069} />
    <Sequence from={INICIO_TARJETA} durationInFrames={DUR_TARJETA} layout="none">
      <TarjetaFinal />
    </Sequence>
    <PistaAudio tramos={audio069} />
  </AbsoluteFill>
);
